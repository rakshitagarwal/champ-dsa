"use client";

import { explainStep } from "@/lib/explain/heuristics";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

export function ExplanationPanel() {
  const current = useVisualizerStore((s) => s.currentEvent());
  const previous = useVisualizerStore((s) => s.previousEvent());
  const patternName = useVisualizerStore((s) => s.patternName);

  if (!current) return null;

  const text = explainStep(previous, current, patternName);

  return (
    <div className="rounded-md border border-border bg-accent/5 px-3 py-2 text-sm leading-relaxed">
      <p className="mb-1 text-xs font-medium text-muted-foreground">Why this step</p>
      <p>{text}</p>
    </div>
  );
}
