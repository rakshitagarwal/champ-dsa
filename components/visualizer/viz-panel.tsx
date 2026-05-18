"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { AnimationStage } from "./animation-stage";
import { cn } from "@/lib/utils";
import { formatSampleOutput } from "@/lib/questions/problem-display";

function normalizeOutput(s: string): string {
  return s.trim().replace(/\s+/g, "");
}

type Props = {
  expectedOutput?: string;
};

export function VizPanel({ expectedOutput }: Props) {
  const trace = useVisualizerStore((s) => s.trace);
  const error = useVisualizerStore((s) => s.error);
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const stdout = trace?.stdout?.trim() ?? "";
  const hasTrace = !!trace;
  const hasError = !!error;

  let matchesExpected: boolean | null = null;
  if (hasTrace && expectedOutput && stdout) {
    matchesExpected =
      normalizeOutput(stdout) === normalizeOutput(expectedOutput);
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-card">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Visualization
        </p>
        {hasTrace && !isRunning && (
          <span className="text-xs text-muted-foreground">
            Step through your run
          </span>
        )}
      </div>

      {hasTrace && (
        <div
          className={cn(
            "shrink-0 border-b border-border px-3 py-2 text-xs",
            matchesExpected === true &&
              "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
            matchesExpected === false &&
              "bg-amber-500/10 text-amber-900 dark:text-amber-100",
            matchesExpected === null && "bg-muted/30 text-muted-foreground",
          )}
        >
          <div className="flex items-start gap-2">
            {matchesExpected === true ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : matchesExpected === false ? (
              <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="font-medium">
                {matchesExpected === true
                  ? "Output matches the example"
                  : matchesExpected === false
                    ? "Output differs from expected — keep debugging"
                    : "Your output"}
              </p>
              <pre className="mt-1 overflow-x-auto whitespace-nowrap font-mono text-sm leading-normal opacity-90">
                {stdout ? formatSampleOutput(stdout) : "(empty)"}
              </pre>
            </div>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4">
            <p className="text-sm font-semibold text-destructive">
              Fix the error below, then run again
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Visualization starts only after your code runs without errors.
            </p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-destructive">
              {error}
            </pre>
          </div>
        </div>
      ) : hasTrace ? (
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          <AnimationStage />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center p-6 text-center">
          <p className="max-w-xs text-sm text-muted-foreground">
            Click <strong className="text-foreground">Run</strong> on your
            solution to see a step-by-step walkthrough on the example input.
          </p>
        </div>
      )}
    </div>
  );
}
