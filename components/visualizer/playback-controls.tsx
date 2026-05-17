"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

export function PlaybackControls() {
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const isPlaying = useVisualizerStore((s) => s.isPlaying);
  const speedMs = useVisualizerStore((s) => s.speedMs);
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const stepNext = useVisualizerStore((s) => s.stepNext);
  const stepPrev = useVisualizerStore((s) => s.stepPrev);
  const play = useVisualizerStore((s) => s.play);
  const pause = useVisualizerStore((s) => s.pause);
  const restart = useVisualizerStore((s) => s.restart);
  const setSpeed = useVisualizerStore((s) => s.setSpeed);
  const run = useVisualizerStore((s) => s.run);

  const total = trace?.events.length ?? 0;
  const hasTrace = total > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-border bg-panel px-3 py-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => run()}
        disabled={isRunning}
      >
        <Zap className="h-3.5 w-3.5" />
        {isRunning ? "Running…" : "Run"}
      </Button>
      <div className="mx-1 h-6 w-px bg-border" />
      <Button
        variant="outline"
        size="icon"
        onClick={stepPrev}
        disabled={!hasTrace || stepIndex === 0}
        aria-label="Previous step"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={isPlaying ? pause : play}
        disabled={!hasTrace}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={stepNext}
        disabled={!hasTrace || stepIndex >= total - 1}
        aria-label="Next step"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={restart}
        disabled={!hasTrace}
        aria-label="Restart"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <span className="ml-2 text-xs text-muted-foreground">
        Step {hasTrace ? stepIndex + 1 : 0} / {total}
      </span>
      <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
        Speed
        <select
          className="rounded border border-border bg-background px-2 py-1 text-xs"
          value={speedMs}
          onChange={(e) => setSpeed(Number(e.target.value))}
        >
          <option value={1200}>0.5×</option>
          <option value={600}>1×</option>
          <option value={300}>2×</option>
          <option value={120}>5×</option>
        </select>
      </label>
    </div>
  );
}
