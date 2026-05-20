export type ExecutionEventType =
  | "statement"
  | "enter"
  | "exit"
  | "return"
  | "throw"
  | "loop"
  | "condition"
  | "branch";

export type CallFrameStatus = "active" | "returned";

export type CallFrame = {
  id: number;
  name: string;
  line: number;
  args?: Record<string, unknown>;
  returnValue?: unknown;
  status: CallFrameStatus;
};

export type ArrayHighlight = {
  array: string;
  indices: number[];
};

export type ListNodeViz = {
  nodes: { id: string; val: number; nextId: string | null }[];
};

export type TreeNodeViz = {
  nodes: { id: string; val: number; leftId: string | null; rightId: string | null }[];
  rootId: string | null;
};

export type GraphViz = {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
};

export type StepViz = {
  linkedLists?: Record<string, number[]>;
  structuredLists?: Record<string, ListNodeViz>;
  stacks?: Record<string, unknown[]>;
  trees?: Record<string, (number | null)[]>;
  structuredTrees?: Record<string, TreeNodeViz>;
  graphs?: Record<string, GraphViz>;
  heaps?: Record<string, unknown[]>;
};

export type ExecutionEvent = {
  step: number;
  line: number;
  type: ExecutionEventType;
  variables: Record<string, unknown>;
  callStack: CallFrame[];
  stdout?: string;
  explanation?: string;
  highlights?: ArrayHighlight;
  viz?: StepViz;
  frameName?: string;
  frameId?: number;
  returnValue?: unknown;
};

export type ExecutionTrace = {
  events: ExecutionEvent[];
  stdout: string;
  error?: string;
  lineMap: Record<number, number>;
};

export type RunRequest = {
  code: string;
  stdin: string;
};

export type RunResult =
  | { ok: true; trace: ExecutionTrace }
  | { ok: false; error: string };
