import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";
import { MAX_STEPS } from "./safety";
import { instrumentCode } from "./instrument";
import { parseStdin, buildRunnerTail } from "./parse-stdin";
import { detectEntryFunction } from "./detect-entry";
import { buildRunnerSandbox } from "./runner-runtime";

/** Synchronous runner for Vitest (no Web Worker). */
export function runCodeSync(
  code: string,
  stdin: string,
  options?: { entryName?: string },
): { ok: true; trace: ExecutionTrace } | { ok: false; error: string } {
  const inst = instrumentCode(code);
  if (!inst.ok) return { ok: false, error: inst.error };

  const input = parseStdin(stdin);
  const entryName = options?.entryName ?? detectEntryFunction(code);
  const tail = buildRunnerTail(input, entryName);
  const sandbox = buildRunnerSandbox(MAX_STEPS);
  const wrapped = `${sandbox}\n${inst.code}\n${tail}`;
  let stdout = "";

  try {
    const fn = new Function(
      "console",
      `
      ${wrapped}
      return { events: __events, stdout: "" };
      `,
    );

    const result = fn({
      log: (...args: unknown[]) => {
        stdout +=
          args
            .map((a) =>
              typeof a === "object" && a !== null
                ? JSON.stringify(a)
                : String(a),
            )
            .join(" ") + "\n";
      },
    }) as { events: ExecutionEvent[] };

    return {
      ok: true,
      trace: {
        events: result.events,
        stdout,
        lineMap: inst.lineMap,
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
