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

  const vizParts = explainFromViz(prev, curr);
  if (vizParts.length > 0) {
    return `Line ${curr.line}: ${vizParts.join(" ")}`;
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
      } else if (key === "tail" || key === "dummy" || key === "head") {
        parts.push(`Pointer ${key} updated.`);
      } else {
        parts.push(`${key} changed.`);
      }
    }
  }

  if (patternName?.toLowerCase().includes("sliding") && parts.length === 0) {
    parts.push("Window or pointers may be adjusting to satisfy the constraint.");
  }

  if (parts.length === 0) {
    return `Line ${curr.line} executes as part of the control flow (loop, branch, or setup). Use Explain step for more detail.`;
  }

  return `Because line ${curr.line} ran: ${parts.join(" ")}`;
}

function explainFromViz(
  prev: ExecutionEvent | null,
  curr: ExecutionEvent,
): string[] {
  const parts: string[] = [];
  const viz = curr.viz;
  if (!viz) return parts;

  const prevViz = prev?.viz;

  if (viz.linkedLists) {
    for (const [name, arr] of Object.entries(viz.linkedLists)) {
      const prevArr = prevViz?.linkedLists?.[name];
      if (JSON.stringify(prevArr) !== JSON.stringify(arr)) {
        parts.push(
          `Linked list ${name} is now [${arr.join(",")}]${arr.length === 0 ? " (empty)" : ""}.`,
        );
      }
    }
  }

  if (viz.stacks) {
    for (const [name, arr] of Object.entries(viz.stacks)) {
      const prevArr = prevViz?.stacks?.[name] as unknown[] | undefined;
      const prevLen = prevArr?.length ?? 0;
      if (arr.length > prevLen) {
        parts.push(`Push onto ${name} — top is ${String(arr[arr.length - 1])}.`);
      } else if (arr.length < prevLen) {
        parts.push(`Pop from ${name} — size is now ${arr.length}.`);
      }
    }
  }

  if (viz.trees) {
    for (const [name, arr] of Object.entries(viz.trees)) {
      parts.push(`Tree ${name} snapshot (level-order): [${arr.map((n) => (n === null ? "·" : n)).join(",")}].`);
    }
  }

  return parts;
}
