import { describe, expect, it } from "vitest";
import type { ExecutionEvent } from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import { compactTimeline } from "./compact-steps";
import { compileScene } from "./compile-scene";

const profile: VizProfile = {
  version: 1,
  structures: [
    { variable: "nums", kind: "array", priority: 0 },
  ],
  pointers: [
    { variable: "left", kind: "arrayIndex", attachesTo: "nums" },
    { variable: "right", kind: "arrayIndex", attachesTo: "nums" },
  ],
  compaction: "aggressive",
};

function ev(
  step: number,
  vars: Record<string, unknown>,
): ExecutionEvent {
  return {
    step,
    line: step + 1,
    type: "statement",
    variables: vars,
    callStack: [],
  };
}

const listProfile: VizProfile = {
  version: 1,
  structures: [{ variable: "head", kind: "linkedList", priority: 0 }],
  pointers: [
    { variable: "slow", kind: "listNode", attachesTo: "head" },
    { variable: "fast", kind: "listNode", attachesTo: "head" },
  ],
  compaction: "aggressive",
};

describe("compileScene", () => {
  it("renders array with pointer bindings", () => {
    const scene = compileScene(
      ev(0, { nums: [1, 2, 3], left: 0, right: 2 }),
      profile,
      0,
    );
    expect(scene.structures).toHaveLength(1);
    expect(scene.structures[0]?.kind).toBe("array");
    expect(scene.pointers.map((p) => p.name).sort()).toEqual(["left", "right"]);
  });

  it("renders head array as linkedList chain", () => {
    const scene = compileScene(
      ev(0, { head: [1, 2, 3, 4, 5], slow: 0, fast: 0 }),
      listProfile,
      0,
    );
    const list = scene.structures.find((s) => s.kind === "linkedList");
    expect(list).toBeDefined();
    if (list?.kind === "linkedList") {
      expect(list.nodes).toHaveLength(5);
      expect(list.edges).toHaveLength(4);
    }
  });
});

describe("compactTimeline", () => {
  it("reduces duplicate steps", () => {
    const events = [
      ev(0, { nums: [1, 2], left: 0, right: 1 }),
      ev(1, { nums: [1, 2], left: 0, right: 1 }),
      ev(2, { nums: [1, 2], left: 1, right: 1 }),
    ];
    const { scenes, eventIndices } = compactTimeline(events, profile);
    expect(scenes.length).toBeLessThan(events.length);
    expect(eventIndices.length).toBe(scenes.length);
  });
});
