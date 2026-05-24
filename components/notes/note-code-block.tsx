"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Loader2, Play } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { saveCompilerPrefill } from "@/lib/compiler/prefill";
import { runSimpleJavaScript } from "@/lib/compiler/run-simple";
import { highlightCode } from "@/lib/notes/highlight-code";
import { cn } from "@/lib/utils";

type Props = {
  code: string;
};

export function NoteCodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  const highlighted = useMemo(
    () => highlightCode(code, "javascript"),
    [code],
  );

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    setRunError(null);
    const result = await runSimpleJavaScript(code, "");
    setRunning(false);
    if (result.ok) {
      setOutput(result.stdout || "(no output)");
    } else {
      setRunError(result.error);
    }
  };

  return (
    <div className="note-runnable-code my-5">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl border border-b-0 border-border bg-muted/40 px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">JavaScript</span>
        <div className="flex flex-wrap items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs"
            onClick={() => void copyCode()}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs"
            disabled={running}
            onClick={() => void runCode()}
          >
            {running ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            Run
          </Button>
          <Link
            href="/compiler"
            onClick={() => saveCompilerPrefill(code, "javascript")}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-7 gap-1.5 px-2 text-xs",
            )}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Compiler
          </Link>
        </div>
      </div>
      <pre className="note-code-block rounded-t-none border-t-0">
        <code
          className="note-code select-text"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
      {output !== null || runError ? (
        <div
          className={cn(
            "rounded-b-xl border border-t-0 border-border px-3 py-2.5 font-mono text-xs",
            runError
              ? "bg-destructive/10 text-destructive"
              : "bg-muted/30 text-foreground",
          )}
        >
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Output
          </p>
          <pre className="whitespace-pre-wrap">{runError ?? output}</pre>
        </div>
      ) : null}
    </div>
  );
}
