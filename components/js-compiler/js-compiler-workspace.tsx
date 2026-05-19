"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { editor } from "monaco-editor";
import { AlignLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runSimpleJavaScript } from "@/lib/compiler/run-simple";
import { cn } from "@/lib/utils";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const DEFAULT_CODE = `console.log("Hello, World!");`;

export function JsCompilerWorkspace() {
  const { theme } = useTheme();
  const [code, setCode] = useState(DEFAULT_CODE);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<string | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const run = useCallback(() => {
    setIsRunning(true);
    setError(null);
    const result = runSimpleJavaScript(code, stdin);
    setIsRunning(false);
    if (result.ok) {
      setOutput(result.stdout || "(no output)");
      setStats(`${result.durationMs.toFixed(0)} ms`);
    } else {
      setOutput("");
      setError(result.error);
      setStats(`${result.durationMs.toFixed(0)} ms`);
    }
  }, [code, stdin]);

  const formatCode = useCallback(() => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }, []);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-panel px-4 py-2.5">
        <div className="min-w-0">
          <h1 className="text-sm font-semibold">JS Compiler</h1>
          <p className="text-xs text-muted-foreground">
            Run JavaScript with console output — separate from Solve visualization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={run}
            disabled={isRunning}
            className="gap-1.5"
          >
            <Play className="h-3.5 w-3.5" />
            {isRunning ? "Running…" : "Run"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={formatCode}
            className="gap-1.5"
          >
            <AlignLeft className="h-3.5 w-3.5" />
            Format
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_minmax(280px,38%)]">
        <div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-1.5">
            <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs">
              index.js
            </span>
          </div>
          <div className="min-h-[280px] flex-1 lg:min-h-0">
            <Monaco
              height="100%"
              defaultLanguage="javascript"
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
                tabSize: 2,
              }}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-b border-border">
            <label className="border-b border-border bg-muted/20 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              STDIN
            </label>
            <Textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Input for the program (optional). Available as input / inputLines in your script."
              className="min-h-[120px] flex-1 resize-none rounded-none border-0 font-mono text-sm shadow-none focus-visible:ring-0"
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
