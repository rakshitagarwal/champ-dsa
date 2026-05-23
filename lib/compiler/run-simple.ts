function formatLogArg(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export type SimpleRunResult =
  | { ok: true; stdout: string; durationMs: number }
  | { ok: false; error: string; durationMs: number };

const ASYNC_SETTLE_MS = 5000;

async function settleEventLoop(
  pendingTimers: () => number,
  deadlineMs: number,
): Promise<void> {
  const deadline = Date.now() + deadlineMs;
  let quietRounds = 0;

  while (Date.now() < deadline && quietRounds < 4) {
    await Promise.resolve();

    if (pendingTimers() > 0) {
      quietRounds = 0;
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      continue;
    }

    quietRounds++;
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
}

/** Run plain JavaScript (no tracing / instrumentation). Waits for the async event loop so Promise and setTimeout output is captured. */
export async function runSimpleJavaScript(
  code: string,
  stdin: string,
): Promise<SimpleRunResult> {
  const started =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  let stdout = "";
  let pendingTimers = 0;
  const trackedTimeouts = new Set<ReturnType<typeof setTimeout>>();

  const prelude = stdin.trim()
    ? `const inputLines = ${JSON.stringify(stdin.split(/\r?\n/))};\nconst input = inputLines.join("\\n");\n`
    : "";

  const realSetTimeout = globalThis.setTimeout.bind(globalThis);
  const realClearTimeout = globalThis.clearTimeout.bind(globalThis);
  const realSetInterval = globalThis.setInterval.bind(globalThis);
  const realClearInterval = globalThis.clearInterval.bind(globalThis);

  const wrappedSetTimeout: typeof setTimeout = (handler, delay, ...args) => {
    pendingTimers++;
    const id = realSetTimeout(() => {
      pendingTimers = Math.max(0, pendingTimers - 1);
      trackedTimeouts.delete(id);
      if (typeof handler === "function") {
        handler(...args);
      }
    }, delay ?? 0);
    trackedTimeouts.add(id);
    return id;
  };

  const wrappedClearTimeout: typeof clearTimeout = (id) => {
    if (id !== undefined && trackedTimeouts.delete(id as ReturnType<typeof setTimeout>)) {
      pendingTimers = Math.max(0, pendingTimers - 1);
    }
    realClearTimeout(id);
  };

  try {
    const fn = new Function(
      "console",
      "setTimeout",
      "clearTimeout",
      "setInterval",
      "clearInterval",
      `"use strict";\n${prelude}${code}`,
    ) as (
      console: Console,
      setTimeout: typeof setTimeout,
      clearTimeout: typeof clearTimeout,
      setInterval: typeof setInterval,
      clearInterval: typeof clearInterval,
    ) => void;

    fn(
      {
        log: (...args: unknown[]) => {
          stdout += args.map((a) => formatLogArg(a)).join(" ") + "\n";
        },
        warn: (...args: unknown[]) => {
          stdout += args.map((a) => formatLogArg(a)).join(" ") + "\n";
        },
        error: (...args: unknown[]) => {
          stdout += args.map((a) => formatLogArg(a)).join(" ") + "\n";
        },
        info: (...args: unknown[]) => {
          stdout += args.map((a) => formatLogArg(a)).join(" ") + "\n";
        },
      } as Console,
      wrappedSetTimeout,
      wrappedClearTimeout,
      realSetInterval,
      realClearInterval,
    );

    await settleEventLoop(() => pendingTimers, ASYNC_SETTLE_MS);

    const durationMs =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      started;
    return { ok: true, stdout: stdout.trimEnd(), durationMs };
  } catch (err) {
    const durationMs =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      started;
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      durationMs,
    };
  }
}
