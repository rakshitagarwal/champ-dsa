"use client";

import { AnimationCanvas } from "./animation-canvas";
import { useStepAnalysis } from "@/lib/viz/use-step-analysis";

/** Full animation view (legacy / previews). Prefer AnimationCanvas in fullscreen modal. */
export function AnimationStage() {
  const { current, explanation, stepIndex, totalSteps } = useStepAnalysis();

  if (!current) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
        <p className="text-lg font-medium text-foreground">Step-by-step walkthrough</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Run your solution to see the visualization.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/15 to-background">
      <div className="shrink-0 border-b border-border/80 bg-muted/30 px-4 py-2.5">
        <p className="text-sm leading-snug text-foreground/95">{explanation}</p>
        <span className="mt-1 block text-[11px] text-muted-foreground">
          Step {stepIndex + 1} / {totalSteps}
        </span>
      </div>
      <div className="min-h-0 flex-1">
        <AnimationCanvas />
      </div>
    </div>
  );
}
