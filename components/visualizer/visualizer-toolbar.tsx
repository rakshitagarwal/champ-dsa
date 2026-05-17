"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

type Props = {
  mode?: "free" | "practice";
};

export function VisualizerToolbar({ mode = "free" }: Props) {
  const [confirmSolution, setConfirmSolution] = useState(false);
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const isPlaying = useVisualizerStore((s) => s.isPlaying);
  const speedMs = useVisualizerStore((s) => s.speedMs);
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const questionContext = useVisualizerStore((s) => s.questionContext);
  const code = useVisualizerStore((s) => s.code);
  const stdin = useVisualizerStore((s) => s.stdin);
  const stepNext = useVisualizerStore((s) => s.stepNext);
  const stepPrev = useVisualizerStore((s) => s.stepPrev);
  const play = useVisualizerStore((s) => s.play);
  const pause = useVisualizerStore((s) => s.pause);
  const restart = useVisualizerStore((s) => s.restart);
  const setSpeed = useVisualizerStore((s) => s.setSpeed);
  const run = useVisualizerStore((s) => s.run);
  const formatCode = useVisualizerStore((s) => s.formatCode);
  const resetToStarter = useVisualizerStore((s) => s.resetToStarter);
  const revealSolution = useVisualizerStore((s) => s.revealSolution);

  const total = trace?.events.length ?? 0;
  const hasTrace = total > 0;
  const isPractice = mode === "practice" && questionContext;

  const onSolutionClick = () => {
    if (questionContext?.solutionRevealed) return;
    if (!confirmSolution) {
      setConfirmSolution(true);
      return;
    }
    revealSolution();
    setConfirmSolution(false);
  };

  const copyToVisualizer = () => {
    sessionStorage.setItem(
      "champdsa-viz-import",
      JSON.stringify({ code, stdin }),
    );
    window.open("/visualizer", "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-panel px-3 py-2">
      {isPractice && (
        <>
          <Button variant="outline" size="sm" onClick={resetToStarter}>
            Reset code
          </Button>
          <Button
            variant={confirmSolution ? "default" : "outline"}
            size="sm"
            onClick={onSolutionClick}
            disabled={questionContext?.solutionRevealed}
            className="gap-1.5"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {questionContext?.solutionRevealed
              ? "Solution shown"
              : confirmSolution
                ? "Confirm show solution"
                : "Solution"}
          </Button>
          {confirmSolution && (
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setConfirmSolution(false)}
            >
              Cancel
            </button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToVisualizer}
            className="gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Copy to Visualizer
          </Button>
          <div className="mx-1 h-6 w-px bg-border" />
        </>
      )}

      <Button
        size="sm"
        onClick={() => run()}
        disabled={isRunning}
        className="gap-1.5"
      >
        <Zap className="h-3.5 w-3.5" />
        {isRunning ? "Running…" : "Run"}
      </Button>
      <Button variant="outline" size="sm" onClick={() => formatCode()} className="gap-1.5">
        <AlignLeft className="h-3.5 w-3.5" />
        Format
      </Button>

      <div className="mx-1 h-6 w-px bg-border" />

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={stepPrev}
        disabled={!hasTrace || stepIndex === 0}
        aria-label="Previous step"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
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
        className="h-8 w-8"
        onClick={stepNext}
        disabled={!hasTrace || stepIndex >= total - 1}
        aria-label="Next step"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={restart}
        disabled={!hasTrace}
        aria-label="Restart playback"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      <span className="text-xs text-muted-foreground">
        Step {hasTrace ? stepIndex + 1 : 0}/{total}
      </span>

      {isPractice && questionContext && (
        <Link
          href={`/practice/${questionContext.questionId}/notes`}
          className="ml-2 text-xs text-primary hover:underline"
        >
          Notes
        </Link>
      )}

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
