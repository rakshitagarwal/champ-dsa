import type { ExecutionTrace, RunResult } from "@/types/execution";
import { instrumentCode } from "./instrument";
import { detectEntryFunction } from "./detect-entry";
import { getEntryFunctionParams } from "./parse-entry-params";

let worker: Worker | null = null;

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL("./runner.worker.ts", import.meta.url));
  }
  return worker;
}

export async function runCode(
  code: string,
  stdin: string,
  options?: { leetcodeFunctionName?: string },
): Promise<RunResult> {
  const inst = instrumentCode(code);
  if (!inst.ok) {
    return { ok: false, error: inst.error };
  }

  const entryName = detectEntryFunction(code, options?.leetcodeFunctionName);
  const paramNames = getEntryFunctionParams(code, entryName);

  return new Promise((resolve) => {
    const w = getWorker();
    const handler = (e: MessageEvent) => {
      w.removeEventListener("message", handler);
      const data = e.data as
        | { ok: true; events: ExecutionTrace["events"]; stdout: string }
        | { ok: false; error: string };

      if (!data.ok) {
        resolve({ ok: false, error: data.error });
        return;
      }

      resolve({
        ok: true,
        trace: {
          events: data.events,
          stdout: data.stdout,
          lineMap: inst.lineMap,
        },
      });
    };
    w.addEventListener("message", handler);
    w.postMessage({ instrumented: inst.code, stdin, entryName, paramNames });
  });
}
