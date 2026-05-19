"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
};

const SPEED_OPTIONS = [
  { label: "0.5×", ms: 1200 },
  { label: "1×", ms: 600 },
  { label: "2×", ms: 300 },
  { label: "5×", ms: 120 },
] as const;

export function WalkthroughPlaybackBar({ className, compact }: Props) {
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
  const setStepIndex = useVisualizerStore((s) => s.setStepIndex);

  const total = trace?.events.length ?? 0;
  const maxIndex = Math.max(0, total - 1);
  const hasTrace = total > 0;

  if (!hasTrace) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border-t border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground",
          className,
        )}
      >
        Run your code to enable playback
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-2 border-t border-border bg-muted/25 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className={cn("h-8 w-8", compact && "h-7 w-7")}
          onClick={isPlaying ? pause : play}
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
          className={cn("h-8 w-8", compact && "h-7 w-7")}
          onClick={stepPrev}
          disabled={stepIndex === 0}
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn("h-8 w-8", compact && "h-7 w-7")}
          onClick={stepNext}
          disabled={stepIndex >= maxIndex}
          aria-label="Next step"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", compact && "h-7 w-7")}
          onClick={restart}
          aria-label="Restart"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="relative min-w-0 flex-1 px-1">
        <div
          className="pointer-events-none absolute inset-x-1 top-1/2 flex h-2 -translate-y-1/2 items-center"
          aria-hidden
        >
          {trace!.events.map((_, i) => (
            <span
              key={i}
              className={cn(
                "mx-px h-2 w-px shrink-0 rounded-full bg-border",
                i === stepIndex && "bg-primary h-2.5 w-0.5",
                i < stepIndex && "bg-muted-foreground/40",
              )}
              style={{ flex: i === total - 1 ? "0 0 auto" : "1 1 0" }}
            />
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={maxIndex}
          step={1}
          value={stepIndex}
          onChange={(e) => setStepIndex(Number(e.target.value))}
          className={cn(
            "relative z-[1] w-full cursor-pointer appearance-none bg-transparent",
            "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-border/80",
            "[&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm",
            "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-border/80",
            "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background",
          )}
          aria-label="Execution step"
          aria-valuemin={0}
          aria-valuemax={maxIndex}
          aria-valuenow={stepIndex}
        />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {stepIndex} / {maxIndex}
        </span>
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <select
            className="rounded border border-border bg-background px-2 py-1 text-xs font-medium text-foreground"
            value={speedMs}
            onChange={(e) => setSpeed(Number(e.target.value))}
            aria-label="Playback speed"
          >
            {SPEED_OPTIONS.map((o) => (
              <option key={o.ms} value={o.ms}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
