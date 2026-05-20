export type StructureKind =
  | "array"
  | "linkedList"
  | "tree"
  | "stack"
  | "graph"
  | "heap";

export type PointerKind =
  | "arrayIndex"
  | "listNode"
  | "treeNode"
  | "graphNode";

export type HighlightStyle = "scalar" | "window" | "visitedSet";

export type VizProfile = {
  version: 1;
  structures: {
    variable: string;
    kind: StructureKind;
    label?: string;
    priority: number;
  }[];
  pointers: {
    variable: string;
    kind: PointerKind;
    attachesTo?: string;
  }[];
  highlights?: {
    variable: string;
    style: HighlightStyle;
  }[];
  showCallStack?: boolean;
  compaction?: "aggressive" | "normal";
};

export type VizSetupRequest = {
  code: string;
  problemTitle?: string;
  patternName?: string;
  stdin?: string;
  traceSummary: TraceSummary;
};

export type TraceSummary = {
  variableNames: string[];
  functionNames: string[];
  sampleSteps: {
    stepIndex: number;
    line: number;
    type: string;
    variableKeys: string[];
    viz?: unknown;
  }[];
  totalSteps: number;
};
