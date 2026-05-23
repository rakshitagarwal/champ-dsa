import type { SimpleRunResult } from "@/lib/compiler/run-simple";

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyodideRuntime = {
  setStdout: (opts: { batched: (msg: string) => void }) => void;
  setStderr: (opts: { batched: (msg: string) => void }) => void;
  runPythonAsync: (code: string) => Promise<unknown>;
};

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL?: string }) => Promise<PyodideRuntime>;
  }
}

let pyodideReady: Promise<PyodideRuntime> | null = null;

async function loadPyodideRuntime(): Promise<PyodideRuntime> {
  if (typeof window === "undefined") {
    throw new Error("Python runs in the browser only.");
  }

  if (!pyodideReady) {
    pyodideReady = (async () => {
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `${PYODIDE_BASE}pyodide.js`;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Failed to load Python runtime (Pyodide)."));
          document.head.appendChild(script);
        });
      }

      if (!window.loadPyodide) {
        throw new Error("Python runtime failed to initialize.");
      }

      return window.loadPyodide({ indexURL: PYODIDE_BASE });
    })();
  }

  return pyodideReady;
}

function buildPythonPrelude(stdin: string): string {
  if (!stdin.trim()) {
    return "input_lines = []\n";
  }
  const escaped = JSON.stringify(stdin);
  return `import sys
from io import StringIO
_input_data = ${escaped}
sys.stdin = StringIO(_input_data)
input_lines = _input_data.splitlines()
`;
}

/** Run plain Python in the browser via Pyodide (no server Python required). */
export async function runSimplePython(
  code: string,
  stdin: string,
): Promise<SimpleRunResult> {
  const started =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  try {
    const pyodide = await loadPyodideRuntime();
    let stdout = "";
    let stderr = "";

    pyodide.setStdout({ batched: (msg) => { stdout += msg; } });
    pyodide.setStderr({ batched: (msg) => { stderr += msg; } });

    await pyodide.runPythonAsync(buildPythonPrelude(stdin) + code);

    const combined = (stdout + (stderr ? (stdout ? "\n" : "") + stderr : "")).trimEnd();
    const durationMs =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      started;

    return { ok: true, stdout: combined, durationMs };
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
