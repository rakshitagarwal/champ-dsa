import type { CallFrame, ExecutionEvent } from "@/types/execution";

export type RecursionTreeNode = {
  frameId: number;
  name: string;
  line: number;
  args?: Record<string, unknown>;
  returnValue?: unknown;
  status: CallFrame["status"];
  children: RecursionTreeNode[];
};

export type ReturnPropagation = {
  fromFrameId: number;
  toFrameId: number;
  value: unknown;
};

export type RecursionState = {
  stackFrames: CallFrame[];
  treeRoot: RecursionTreeNode;
  activeFrameId: number | null;
  returnPropagations: ReturnPropagation[];
  maxDepth: number;
};

const EMPTY_ROOT: RecursionTreeNode = {
  frameId: 0,
  name: "program",
  line: 0,
  status: "active",
  children: [],
};

export function buildRecursionState(
  events: ExecutionEvent[],
  stepIndex: number,
): RecursionState {
  const slice = events.slice(0, stepIndex + 1);
  const root: RecursionTreeNode = {
    frameId: 0,
    name: "program",
    line: 0,
    status: "active",
    children: [],
  };
  const nodeStack: RecursionTreeNode[] = [root];
  const returnPropagations: ReturnPropagation[] = [];
  let activeFrameId: number | null = null;
  let maxDepth = 0;

  for (const evt of slice) {
    if (evt.type === "enter" && evt.frameId != null) {
      const node: RecursionTreeNode = {
        frameId: evt.frameId,
        name: evt.frameName ?? evt.callStack[evt.callStack.length - 1]?.name ?? "fn",
        line: evt.line,
        args: evt.callStack[evt.callStack.length - 1]?.args,
        status: "active",
        children: [],
      };
      nodeStack[nodeStack.length - 1].children.push(node);
      nodeStack.push(node);
      activeFrameId = evt.frameId;
      maxDepth = Math.max(maxDepth, nodeStack.length - 1);
    } else if (evt.type === "return" && evt.frameId != null) {
      const node = nodeStack[nodeStack.length - 1];
      if (node && node.frameId === evt.frameId) {
        node.returnValue = evt.returnValue;
        node.status = "returned";
        if (nodeStack.length > 1) {
          const parent = nodeStack[nodeStack.length - 2];
          returnPropagations.push({
            fromFrameId: node.frameId,
            toFrameId: parent.frameId,
            value: evt.returnValue,
          });
        }
      }
      activeFrameId = evt.frameId;
    } else if (evt.type === "exit" || evt.type === "return") {
      if (nodeStack.length > 1) nodeStack.pop();
      activeFrameId =
        nodeStack.length > 1
          ? nodeStack[nodeStack.length - 1].frameId
          : null;
    } else if (evt.callStack.length > 0) {
      const top = evt.callStack[evt.callStack.length - 1];
      activeFrameId = top?.id ?? null;
    }
  }

  const last = slice[slice.length - 1];
  const stackFrames = last?.callStack ?? [];

  if (last?.type === "enter" && last.frameId != null) {
    activeFrameId = last.frameId;
  } else if (stackFrames.length > 0) {
    const active = [...stackFrames].reverse().find((f) => f.status === "active");
    activeFrameId = active?.id ?? stackFrames[stackFrames.length - 1]?.id ?? null;
  }

  return {
    stackFrames,
    treeRoot: root.children.length > 0 ? root : { ...root, children: root.children },
    activeFrameId,
    returnPropagations,
    maxDepth,
  };
}

export function hasRecursionActivity(state: RecursionState): boolean {
  return (
    state.stackFrames.length > 0 ||
    state.treeRoot.children.length > 0 ||
    state.maxDepth > 0
  );
}
