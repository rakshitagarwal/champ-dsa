import { describe, expect, it } from "vitest";
import type { ExecutionEvent } from "@/types/execution";
import { buildRecursionState } from "./recursion-state";

function fibEvents(): ExecutionEvent[] {
  const events: ExecutionEvent[] = [];
  let frameSeq = 0;
  const stack: ExecutionEvent["callStack"] = [];

  function pushEnter(name: string, line: number, args: Record<string, unknown>) {
    const id = ++frameSeq;
    const frame = {
      id,
      name,
      line,
      args,
      status: "active" as const,
    };
    stack.push(frame);
    events.push({
      step: events.length,
      line,
      type: "enter",
      variables: { ...args },
      callStack: stack.map((f) => ({ ...f })),
      frameName: name,
      frameId: id,
    });
  }

  function pushReturn(line: number, value: unknown) {
    const top = stack[stack.length - 1];
    if (top) {
      top.returnValue = value;
      top.status = "returned";
    }
    events.push({
      step: events.length,
      line,
      type: "return",
      variables: {},
      callStack: stack.map((f) => ({ ...f })),
      frameId: top?.id,
      returnValue: value,
    });
    stack.pop();
  }

  pushEnter("fib", 1, { n: 4 });
  pushEnter("fib", 1, { n: 3 });
  pushEnter("fib", 1, { n: 2 });
  pushReturn(2, 1);
  pushReturn(2, 1);
  pushReturn(2, 2);

  return events;
}

describe("buildRecursionState", () => {
  it("builds tree with nested enters", () => {
    const events = fibEvents();
    const mid = buildRecursionState(events, 2);
    expect(mid.treeRoot.children.length).toBeGreaterThan(0);
    expect(mid.maxDepth).toBeGreaterThanOrEqual(2);
  });

  it("tracks active frame on enter", () => {
    const events = fibEvents();
    const state = buildRecursionState(events, 2);
    expect(state.activeFrameId).toBe(3);
  });

  it("records return propagations", () => {
    const events = fibEvents();
    const state = buildRecursionState(events, events.length - 1);
    expect(state.returnPropagations.length).toBeGreaterThan(0);
  });

  it("stack matches last event callStack", () => {
    const events = fibEvents();
    const state = buildRecursionState(events, events.length - 1);
    expect(state.stackFrames.length).toBe(
      events[events.length - 1].callStack.length,
    );
  });
});
