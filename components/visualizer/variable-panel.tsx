"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { cn } from "@/lib/utils";

export function VariablePanel() {
  const current = useVisualizerStore((s) => s.currentEvent());
  const previous = useVisualizerStore((s) => s.previousEvent());

  if (!current) {
    return (
      <p className="text-sm text-muted-foreground">
        Run code to see variable state at each step.
      </p>
    );
  }

  const keys = Object.keys(current.variables).sort();

  return (
    <div className="space-y-2">
      {keys.map((key) => {
        const val = current.variables[key];
        const prevVal = previous?.variables[key];
        const changed =
          previous &&
          JSON.stringify(prevVal) !== JSON.stringify(val);
        return (
          <div
            key={key}
            className={cn(
              "rounded-md border border-border px-3 py-2 font-mono text-sm",
              changed && "border-accent bg-accent/10",
            )}
          >
            <span className="text-muted-foreground">{key}</span>
            <span className="mx-2">=</span>
            <span>{formatValue(val)}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatValue(v: unknown): string {
  if (typeof v === "object" && v !== null) {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}
