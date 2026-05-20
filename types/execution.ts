export type ExecutionEventType =
  | "statement"
  | "enter"
  | "exit"
  | "return"
  | "throw";

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

export type StepViz = {
  linkedLists?: Record<string, number[]>;
  stacks?: Record<string, unknown[]>;
  trees?: Record<string, (number | null)[]>;
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
