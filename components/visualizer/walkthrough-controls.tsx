"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { cn } from "@/lib/utils";

type Props = {
  onOpenFullscreen?: () => void;
  className?: string;
};

/** Playback controls — lives directly under the code editor during walkthrough. */
export function WalkthroughControls({ onOpenFullscreen, className }: Props) {
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const isPlaying = useVisualizerStore((s) => s.isPlaying);
  const speedMs = useVisualizerStore((s) => s.speedMs);
  const stepNext = useVisualizerStore((s) => s.stepNext);
  const stepPrev = useVisualizerStore((s) => s.stepPrev);
  const play = useVisualizerStore((s) => s.play);
  const pause = useVisualizerStore((s) => s.pause);
  const restart = useVisualizerStore((s) => s.restart);
  const setSpeed = useVisualizerStore((s) => s.setSpeed);

  const total = trace?.events.length ?? 0;
  const hasTrace = total > 0;

  if (!hasTrace) return null;

  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-muted/20 px-3 py-2",
        className,
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Walkthrough
      </span>

      <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
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
        <span className="text-xs tabular-nums text-muted-foreground">
          Step {stepIndex + 1}/{total}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={restart}
          aria-label="Restart playback"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={stepPrev}
          disabled={stepIndex === 0}
          aria-label="Previous step"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={isPlaying ? pause : play}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={stepNext}
          disabled={stepIndex >= total - 1}
          aria-label="Next step"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
        {onOpenFullscreen ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs"
            onClick={onOpenFullscreen}
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Fullscreen viz
          </Button>
        ) : null}
      </div>
    </div>
  );
}
