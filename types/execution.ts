export type ExecutionEventType =
  | "statement"
  | "enter"
  | "exit"
  | "return"
  | "throw";

export type CallFrame = {
  name: string;
  line: number;
};

export type ArrayHighlight = {
  array: string;
  indices: number[];
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
