"use client";

import { AlignLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

/** Run / Format toolbar — sits above the Monaco editor. */
export function EditorActionBar() {
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const run = useVisualizerStore((s) => s.run);
  const formatCode = useVisualizerStore((s) => s.formatCode);

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-panel px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Your solution
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          onClick={() => run()}
          disabled={isRunning}
          className="gap-1.5"
        >
          <Zap className="h-3.5 w-3.5" />
          {isRunning ? "Running…" : "Run"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatCode()}
          className="gap-1.5"
        >
          <AlignLeft className="h-3.5 w-3.5" />
          Format
        </Button>
      </div>
    </div>
  );
}
