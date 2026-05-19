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

/** Run plain JavaScript (no tracing / instrumentation). */
export function runSimpleJavaScript(
  code: string,
  stdin: string,
): SimpleRunResult {
  const started =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  let stdout = "";

  const prelude = stdin.trim()
    ? `const inputLines = ${JSON.stringify(stdin.split(/\r?\n/))};\nconst input = inputLines.join("\\n");\n`
    : "";

  try {
    const fn = new Function(
      "console",
      `"use strict";\n${prelude}${code}`,
    ) as (console: Console) => void;

    fn({
      log: (...args: unknown[]) => {
        stdout +=
          args.map((a) => formatLogArg(a)).join(" ") + "\n";
      },
      warn: (...args: unknown[]) => {
        stdout +=
          args.map((a) => formatLogArg(a)).join(" ") + "\n";
      },
      error: (...args: unknown[]) => {
        stdout +=
          args.map((a) => formatLogArg(a)).join(" ") + "\n";
      },
      info: (...args: unknown[]) => {
        stdout +=
          args.map((a) => formatLogArg(a)).join(" ") + "\n";
      },
    } as Console);

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
