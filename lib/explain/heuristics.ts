import type { ExecutionEvent } from "@/types/execution";

export function explainStep(
  prev: ExecutionEvent | null,
  curr: ExecutionEvent,
  patternName?: string | null,
): string {
  if (curr.type === "enter") {
    const frame = curr.callStack[curr.callStack.length - 1];
    return `Starting ${frame?.name ?? "solve"}(). Press Next to run the first line.`;
  }
  if (curr.type === "exit" || curr.type === "return") {
    return `Leaving function — stack frame popped; control returns to the caller.`;
  }
  if (curr.type === "throw") {
    return `Runtime error: ${curr.variables.error ?? "execution failed"}.`;
  }

  const parts: string[] = [];
  const prevVars = prev?.variables ?? {};

  for (const key of Object.keys(curr.variables)) {
    const before = prevVars[key];
    const after = curr.variables[key];
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      if (key === "i" || key === "j" || key === "left" || key === "right") {
        parts.push(`${key} moved to ${JSON.stringify(after)}.`);
      } else if (key === "sum") {
        parts.push(`Running sum updated to ${JSON.stringify(after)}.`);
      } else {
        parts.push(`${key} changed from ${JSON.stringify(before)} → ${JSON.stringify(after)}.`);
      }
    }
  }

  if (patternName?.toLowerCase().includes("sliding") && parts.length === 0) {
    parts.push("Window or pointers may be adjusting to satisfy the constraint.");
  }

  if (parts.length === 0) {
    return `Line ${curr.line} executes as part of the control flow (loop, branch, or setup). Use AI Explain after passing both examples for a full teaching walkthrough.`;
  }

  return `Because line ${curr.line} ran: ${parts.join(" ")}`;
}
