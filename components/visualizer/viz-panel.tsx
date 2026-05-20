"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { AnimationCanvas } from "./animation-canvas";
import { WalkthroughControls } from "./walkthrough-controls";
import { cn } from "@/lib/utils";

type Props = {
  layout?: "document" | "viewport";
};

export function VizPanel({ layout = "viewport" }: Props) {
  const isDocument = layout === "document";
  const trace = useVisualizerStore((s) => s.trace);
  const error = useVisualizerStore((s) => s.error);
  const exampleResults = useVisualizerStore((s) => s.exampleResults);
  const solutionFilled = useVisualizerStore((s) => s.solutionFilled);
  const hasTrace = !!trace;
  const hasError = !!error;

  return (
    <div
      className={cn(
        "flex flex-col bg-card",
        isDocument ? "w-full" : "h-full min-h-0 overflow-hidden",
      )}
    >
      <WalkthroughControls
        className={
          isDocument
            ? "sticky top-14 z-20 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90"
            : undefined
        }
      />

      {hasTrace && exampleResults && exampleResults.length > 0 ? (
        <div className="shrink-0 space-y-2 border-b border-border px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Test results
          </p>
          {exampleResults.map((r) => (
            <div
              key={r.index}
              className={cn(
                "rounded-md border px-2.5 py-2 text-xs",
                r.pass
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100",
              )}
            >
              <div className="flex items-start gap-2">
                {r.pass ? (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                ) : (
                  <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{r.label}</p>
                  <p className="mt-1 font-mono text-[11px] opacity-90">
                    Expected: {r.expected} · Got: {r.actual || "(error)"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {hasError ? (
        <div className="p-3">
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4">
            <p className="text-sm font-semibold text-destructive">
              Fix the error below, then run again
            </p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-destructive">
              {error}
            </pre>
          </div>
        </div>
      ) : solutionFilled && hasTrace ? (
        <div className="min-h-[180px] flex-1 border-t border-border">
          <AnimationCanvas />
        </div>
      ) : (
        <div className="border-t border-border p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Visualization
          </p>
          <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
            Click <strong className="text-foreground">Fill Solution</strong>, then{" "}
            <strong className="text-foreground">Visualize</strong> for the full
            walkthrough animation.
          </p>
        </div>
      )}
    </div>
  );
}
