import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";

/** Keep prompts small for free-tier token limits. */
const MAX_EVENTS = 50;
const MAX_VAR_LEN = 80;

function trimVar(v: unknown): unknown {
  if (typeof v === "string" && v.length > MAX_VAR_LEN) {
    return `${v.slice(0, MAX_VAR_LEN)}…`;
  }
  if (Array.isArray(v) && v.length > 24) {
    return [...v.slice(0, 24), `…+${v.length - 24} more`];
  }
  return v;
}

function trimVars(vars: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(vars)) {
    out[k] = trimVar(v);
  }
  return out;
}

export type TraceStepPayload = {
  stepIndex: number;
  line: number;
  type: string;
  frameName?: string;
  variables: Record<string, unknown>;
  returnValue?: unknown;
};

export function buildTracePayload(
  trace: ExecutionTrace,
  code: string,
): { steps: TraceStepPayload[]; stdout: string; lineSnippets: Record<number, string> } {
  const lines = code.split("\n");
  const lineSnippets: Record<number, string> = {};
  const events =
    trace.events.length > MAX_EVENTS
      ? trace.events.slice(0, MAX_EVENTS)
      : trace.events;

  const steps: TraceStepPayload[] = events.map((e: ExecutionEvent, stepIndex) => {
    if (e.line >= 1 && e.line <= lines.length) {
      lineSnippets[e.line] = lines[e.line - 1]?.trim() ?? "";
    }
    return {
      stepIndex,
      line: e.line,
      type: e.type,
      frameName: e.frameName,
      variables: trimVars(e.variables),
      returnValue:
        e.returnValue !== undefined ? trimVar(e.returnValue) : undefined,
    };
  });

  return { steps, stdout: trace.stdout.trim(), lineSnippets };
}
