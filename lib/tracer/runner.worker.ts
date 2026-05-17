/// <reference lib="webworker" />

import type { ExecutionEvent } from "@/types/execution";
import { MAX_STEPS, RUN_TIMEOUT_MS } from "./safety";
import { parseStdin, buildRunnerTail } from "./parse-stdin";

type WorkerIn = {
  instrumented: string;
  stdin: string;
};

type WorkerOut =
  | { ok: true; events: ExecutionEvent[]; stdout: string }
  | { ok: false; error: string };

self.onmessage = (e: MessageEvent<WorkerIn>) => {
  const { instrumented, stdin } = e.data;
  const input = parseStdin(stdin);
  const tail = buildRunnerTail(input);

  const wrapped = `
${instrumented}
${tail}
`;

  const events: ExecutionEvent[] = [];
  let stdout = "";
  let step = 0;

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
      var __events = [];
      var __step = 0;
      var __callStack = [];
      var __frameSeq = 0;
      var __stdout = "";
      function __safeClone(v) {
        if (v === null || v === undefined) return v;
        if (typeof v === "number" || typeof v === "boolean" || typeof v === "string") return v;
        try { return JSON.parse(JSON.stringify(v)); } catch (e) { return String(v); }
      }
      var __safe = { clone: __safeClone };
      function __detectHighlights(vars) {
        var pointerNames = ["i","j","left","right","low","high","mid","start","end"];
        for (var key in vars) {
          if (!Object.prototype.hasOwnProperty.call(vars, key)) continue;
          var val = vars[key];
          if (!Array.isArray(val)) continue;
          var indices = [];
          for (var pi = 0; pi < pointerNames.length; pi++) {
            var p = pointerNames[pi];
            if (typeof vars[p] === "number") indices.push(vars[p]);
          }
          if (indices.length) return { array: key, indices: indices };
          return { array: key, indices: [] };
        }
        return undefined;
      }
      function __cloneArgs(a) {
        if (!a || typeof a !== "object") return a;
        var out = {};
        for (var k in a) {
          if (Object.prototype.hasOwnProperty.call(a, k)) {
            out[k] = __safeClone(a[k]);
          }
        }
        return out;
      }
      function __snapshotStack() {
        return __callStack.map(function (f) {
          return {
            id: f.id,
            name: f.name,
            line: f.line,
            args: f.args,
            returnValue: f.returnValue,
            status: f.status
          };
        });
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
        var frameId;
        if (evt.type === "enter") {
          frameId = ++__frameSeq;
          __callStack.push({
            id: frameId,
            name: evt.name || "fn",
            line: evt.line,
            args: __cloneArgs(evt.args),
            status: "active"
          });
        }
        if (evt.type === "return" && __callStack.length) {
          var top = __callStack[__callStack.length - 1];
          top.returnValue = __safeClone(evt.returnValue);
          top.status = "returned";
        }
        var stackSnap = __snapshotStack();
        __events.push({
          step: __step++,
          line: evt.line,
          type: evt.type,
          variables: vars,
          callStack: stackSnap,
          highlights: hi,
          frameName: evt.name,
          frameId: frameId,
          returnValue: evt.type === "return" ? __safeClone(evt.returnValue) : undefined
        });
        if (evt.type === "exit" || evt.type === "return") {
          if (__callStack.length) __callStack.pop();
        }
      }
      ${wrapped}
      return { events: __events, stdout: __stdout };
      `,
    );

    const consoleShim = {
      log: (...args: unknown[]) => {
        stdout += args.map(String).join(" ") + "\n";
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
