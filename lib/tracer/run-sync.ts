import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";
import { MAX_STEPS } from "./safety";
import { instrumentCode } from "./instrument";
import { parseStdin, buildRunnerTail } from "./parse-stdin";

/** Synchronous runner for Vitest (no Web Worker). */
export function runCodeSync(
  code: string,
  stdin: string,
): { ok: true; trace: ExecutionTrace } | { ok: false; error: string } {
  const inst = instrumentCode(code);
  if (!inst.ok) return { ok: false, error: inst.error };

  const input = parseStdin(stdin);
  const tail = buildRunnerTail(input);

  const wrapped = `${inst.code}\n${tail}`;
  const events: ExecutionEvent[] = [];
  let stdout = "";

  try {
    const fn = new Function(
      "console",
      `
      var __events = [];
      var __step = 0;
      var __callStack = [];
      function __safeClone(v) {
        if (v === null || v === undefined) return v;
        if (typeof v === "number" || typeof v === "boolean" || typeof v === "string") return v;
        try { return JSON.parse(JSON.stringify(v)); } catch (e) { return String(v); }
      }
      var __safe = { clone: __safeClone };
      function __detectHighlights(vars) {
        var pointerNames = ["i","j","left","right","low","high","mid"];
        for (var key in vars) {
          if (!Object.prototype.hasOwnProperty.call(vars, key)) continue;
          if (!Array.isArray(vars[key])) continue;
          var indices = [];
          for (var pi = 0; pi < pointerNames.length; pi++) {
            var p = pointerNames[pi];
            if (typeof vars[p] === "number") indices.push(vars[p]);
          }
          return { array: key, indices: indices };
        }
        return undefined;
      }
      function __trace(evt) {
        if (__step >= ${MAX_STEPS}) throw new Error("Max steps exceeded");
        var vars = {};
        for (var k in evt.variables) {
          if (Object.prototype.hasOwnProperty.call(evt.variables, k)) {
            vars[k] = evt.variables[k];
          }
        }
        var hi = __detectHighlights(vars);
        __events.push({
          step: __step++,
          line: evt.line,
          type: evt.type,
          variables: vars,
          callStack: __callStack.slice(),
          highlights: hi
        });
        if (evt.type === "enter") {
          __callStack.push({ name: evt.name || "fn", line: evt.line });
        } else if (evt.type === "exit" || evt.type === "return") {
          if (__callStack.length) __callStack.pop();
        }
      }
      ${wrapped}
      return { events: __events, stdout: "" };
      `,
    );

    const result = fn({
      log: (...args: unknown[]) => {
        stdout += args.map(String).join(" ") + "\n";
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
