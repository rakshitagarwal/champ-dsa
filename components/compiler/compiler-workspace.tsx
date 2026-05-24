"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { editor } from "monaco-editor";
import { AlignLeft, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { consumeCompilerPrefill } from "@/lib/compiler/prefill";
import { runSimpleJavaScript } from "@/lib/compiler/run-simple";
import { runSimplePython } from "@/lib/compiler/run-python";
import { cn } from "@/lib/utils";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export type CompilerLanguage = "javascript" | "python";

const DEFAULT_JS = `console.log("Hello, World!");`;
const DEFAULT_PY = `print("Hello, World!")`;

const LANGUAGE_META: Record<
  CompilerLanguage,
  { label: string; fileName: string; monacoLanguage: string; hint: string }
> = {
  javascript: {
    label: "JavaScript",
    fileName: "index.js",
    monacoLanguage: "javascript",
    hint: "Run JavaScript with console output — separate from Solve visualization",
  },
  python: {
    label: "Python",
    fileName: "main.py",
    monacoLanguage: "python",
    hint: "Run Python 3 in the browser (Pyodide) — first run loads the runtime",
  },
};

export function CompilerWorkspace() {
  const { theme } = useTheme();
  const [language, setLanguage] = useState<CompilerLanguage>("javascript");
  const [jsCode, setJsCode] = useState(DEFAULT_JS);
  const [pyCode, setPyCode] = useState(DEFAULT_PY);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<string | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const prefill = consumeCompilerPrefill();
    if (!prefill) return;
    if (prefill.language === "python") {
      setLanguage("python");
      setPyCode(prefill.code);
    } else {
      setLanguage("javascript");
      setJsCode(prefill.code);
    }
  }, []);

  const meta = LANGUAGE_META[language];
  const code = language === "javascript" ? jsCode : pyCode;
  const setCode = language === "javascript" ? setJsCode : setPyCode;

  const run = useCallback(async () => {
    setIsRunning(true);
    setError(null);

    try {
      const result =
        language === "javascript"
          ? await runSimpleJavaScript(jsCode, stdin)
          : await runSimplePython(pyCode, stdin);

      if (result.ok) {
        setOutput(result.stdout || "(no output)");
        setStats(`${result.durationMs.toFixed(0)} ms`);
      } else {
        setOutput("");
        setError(result.error);
        setStats(`${result.durationMs.toFixed(0)} ms`);
      }
    } catch (err) {
      setOutput("");
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsRunning(false);
    }
  }, [language, jsCode, pyCode, stdin]);

  const formatCode = useCallback(() => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }, []);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border bg-panel px-4 py-2.5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-sm font-semibold">Compiler</h1>
            <div className="relative">
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as CompilerLanguage)
                }
                className={cn(
                  "appearance-none rounded-md border border-border bg-background",
                  "py-1 pl-2 pr-7 text-xs font-medium text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                )}
                aria-label="Compiler language"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{meta.hint}</p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_minmax(280px,38%)]">
        <div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-3 py-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs">
                {meta.fileName}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {meta.label}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {language === "javascript" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={formatCode}
                  className="h-7 gap-1.5 px-2.5 text-xs"
                >
                  <AlignLeft className="h-3.5 w-3.5" />
                  Format
                </Button>
              ) : null}
              <Button
                size="sm"
                onClick={() => void run()}
                disabled={isRunning}
                className="h-7 gap-1.5 px-3 text-xs"
              >
                <Play className="h-3.5 w-3.5" />
                {isRunning ? "Running…" : "Run"}
              </Button>
            </div>
          </div>
          <div className="min-h-[280px] flex-1 lg:min-h-0">
            <Monaco
              key={language}
              height="100%"
              language={meta.monacoLanguage}
              theme={theme === "light" ? "light" : "vs-dark"}
              value={code}
              onChange={(v) => setCode(v ?? "")}
              onMount={(ed) => {
                editorRef.current = ed;
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-geist-mono), monospace",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12 },
                tabSize: language === "python" ? 4 : 2,
              }}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="shrink-0 border-b border-border">
            <label className="block border-b border-border bg-muted/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              STDIN
            </label>
            <Textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder={
                language === "python"
                  ? "Optional input (input_lines / sys.stdin)"
                  : "Optional input (input / inputLines)"
              }
              rows={3}
              className="h-20 resize-none rounded-none border-0 font-mono text-sm shadow-none focus-visible:ring-0"
              spellCheck={false}
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-border bg-muted/20 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Output
              </span>
              {stats ? (
                <span className="font-mono text-[10px] text-muted-foreground">
                  {stats}
                </span>
              ) : null}
            </div>
            <pre
              className={cn(
                "min-h-[120px] flex-1 overflow-auto p-3 font-mono text-sm leading-relaxed",
                error ? "text-destructive" : "text-foreground",
              )}
            >
              {error ?? (output || "Run to see output here")}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
