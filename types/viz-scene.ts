import type { CallFrame } from "@/types/execution";

export type VizEdge = {
  from: string;
  to: string;
};

export type ListNodeSnap = {
  id: string;
  val: number | string;
  nextId: string | null;
};

export type TreeNodeSnap = {
  id: string;
  val: number | string;
  leftId: string | null;
  rightId: string | null;
};

export type GraphNodeSnap = {
  id: string;
  label: string;
  val?: number | string;
};

export type HeapNodeSnap = {
  id: string;
  val: number | string;
  index: number;
  leftId: string | null;
  rightId: string | null;
};

export type VizStructure =
  | {
      kind: "array";
      id: string;
      variable: string;
      label: string;
      values: unknown[];
    }
  | {
      kind: "linkedList";
      id: string;
      variable: string;
      label: string;
      nodes: ListNodeSnap[];
      edges: VizEdge[];
      rootId: string | null;
    }
  | {
      kind: "stack";
      id: string;
      variable: string;
      label: string;
      values: unknown[];
    }
  | {
      kind: "tree";
      id: string;
      variable: string;
      label: string;
      nodes: TreeNodeSnap[];
      edges: VizEdge[];
      rootId: string | null;
    }
  | {
      kind: "heap";
      id: string;
      variable: string;
      label: string;
      nodes: HeapNodeSnap[];
      edges: VizEdge[];
      arrayValues?: unknown[];
    }
  | {
      kind: "graph";
      id: string;
      variable: string;
      label: string;
      nodes: GraphNodeSnap[];
      edges: VizEdge[];
    };

export type PointerBinding = {
  name: string;
  kind: "arrayIndex" | "listNode" | "treeNode" | "graphNode";
  structureId: string;
  nodeId?: string;
  index?: number;
};

export type SceneHighlight =
  | { type: "cell"; structureId: string; index: number }
  | { type: "node"; structureId: string; nodeId: string }
  | { type: "visited"; structureId: string; nodeIds: string[] }
  | { type: "window"; structureId: string; left: number; right: number }
  | { type: "activeFrame"; frameId: number };

export type StringWalkState = {
  variable: string;
  chars: string[];
  index: number;
};

export type VizScene = {
  stepIndex: number;
  line: number;
  structures: VizStructure[];
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
  scalars?: Record<string, string>;
  stringWalk?: StringWalkState;
  callStack?: CallFrame[];
  showCallStack: boolean;
  caption?: string;
};

export type LayoutPosition = { x: number; y: number };

export type LayoutResult = {
  nodes: Map<string, LayoutPosition>;
  edges: { from: string; to: string; x1: number; y1: number; x2: number; y2: number }[];
  bounds: { width: number; height: number };
};
