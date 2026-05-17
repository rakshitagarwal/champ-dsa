"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";

export function StackPanel() {
  const current = useVisualizerStore((s) => s.currentEvent());

  if (!current || current.callStack.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Call stack appears when functions are entered.
      </p>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-2">
      {current.callStack.map((frame, i) => (
        <div
          key={`${frame.name}-${frame.line}-${i}`}
          className="rounded-md border border-border bg-muted/40 px-3 py-2 font-mono text-sm"
        >
          <span className="text-primary">{frame.name}</span>
          <span className="text-muted-foreground"> @ line {frame.line}</span>
        </div>
      ))}
    </div>
  );
}
