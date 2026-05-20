/// <reference lib="webworker" />

import type { ExecutionEvent } from "@/types/execution";
import { MAX_STEPS, RUN_TIMEOUT_MS } from "./safety";
import { parseStdin, buildRunnerTail } from "./parse-stdin";
import { buildRunnerSandbox } from "./runner-runtime";

type WorkerIn = {
  instrumented: string;
  stdin: string;
  entryName: string;
};

type WorkerOut =
  | { ok: true; events: ExecutionEvent[]; stdout: string }
  | { ok: false; error: string };

self.onmessage = (e: MessageEvent<WorkerIn>) => {
  const { instrumented, stdin, entryName } = e.data;
  const input = parseStdin(stdin);
  const tail = buildRunnerTail(input, entryName);
  const sandbox = buildRunnerSandbox(MAX_STEPS);
  const wrapped = `${sandbox}\n${instrumented}\n${tail}`;

  const events: ExecutionEvent[] = [];
  let stdout = "";

  const timeout = setTimeout(() => {
    self.postMessage({
      ok: false,
      error: `Execution timed out after ${RUN_TIMEOUT_MS}ms`,
    } satisfies WorkerOut);
  }, RUN_TIMEOUT_MS);

  try {
    const fn = new Function(
      "console",
      `
      ${wrapped}
      return { events: __events };
      `,
    );

    const consoleShim = {
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
    };

    const result = fn(consoleShim) as {
      events: ExecutionEvent[];
      stdout: string;
    };
    clearTimeout(timeout);
    self.postMessage({
      ok: true,
      events: result.events,
      stdout: result.stdout || stdout,
    } satisfies WorkerOut);
  } catch (err) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : String(err);
    if (events.length === 0) {
      events.push({
        step: 0,
        line: 1,
        type: "throw",
        variables: { error: message },
        callStack: [],
      });
    }
    self.postMessage({
      ok: false,
      error: message,
    } satisfies WorkerOut);
  }
};
