"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import {
  getProgress,
  recordHintUnlock,
  LEARNING_UPDATED_EVENT,
} from "@/lib/storage/learning-store";

type Props = {
  hasHints?: boolean;
  progressiveHints?: boolean;
  onOpenHints?: () => void;
  onMarkSolved?: () => void;
};

export function VisualizerToolbar({
  hasHints = false,
  progressiveHints = false,
  onOpenHints,
  onMarkSolved,
}: Props) {
  const [confirmSolution, setConfirmSolution] = useState(false);
  const [confirmGiveUp, setConfirmGiveUp] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const isPlaying = useVisualizerStore((s) => s.isPlaying);
  const speedMs = useVisualizerStore((s) => s.speedMs);
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const questionContext = useVisualizerStore((s) => s.questionContext);
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
  const canShowSolution = hintsUnlocked >= 5;

  useEffect(() => {
    if (!questionContext) return;
    const refresh = () =>
      setHintsUnlocked(getProgress(questionContext.questionId).hintsUnlocked);
    refresh();
    const onReady = (e: Event) => {
      const detail = (e as CustomEvent<{ questionId: string }>).detail;
      if (detail?.questionId === questionContext.questionId) refresh();
    };
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    window.addEventListener("champdsa-hint-solution-ready", onReady);
    return () => {
      window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
      window.removeEventListener("champdsa-hint-solution-ready", onReady);
    };
  }, [questionContext]);

  const onSolutionClick = () => {
    if (questionContext?.solutionRevealed) return;
    if (!canShowSolution) return;
    if (!confirmSolution) {
      setConfirmSolution(true);
      return;
    }
    if (questionContext) recordHintUnlock(questionContext.questionId, 5);
    revealSolution();
    setConfirmSolution(false);
  };

  const onGiveUp = () => {
    if (!questionContext) return;
    if (!confirmGiveUp) {
      setConfirmGiveUp(true);
      return;
    }
    recordHintUnlock(questionContext.questionId, 5);
    revealSolution();
    setConfirmGiveUp(false);
  };

  return (
    <div className="shrink-0 border-b border-border bg-panel">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2">
      <Button
        size="sm"
        onClick={() => run()}
        disabled={isRunning}
        className="gap-1.5"
      >
        <Zap className="h-3.5 w-3.5" />
        {isRunning ? "Running…" : "Run"}
      </Button>

      {hasHints && onOpenHints && (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenHints}
          disabled={progressiveHints && hintsUnlocked >= 5}
          className="gap-1.5"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {progressiveHints
            ? hintsUnlocked >= 5
              ? "Hints (5/5)"
              : `Hint (${hintsUnlocked}/5)`
            : "Hint"}
        </Button>
      )}

      <Button variant="outline" size="sm" onClick={resetToStarter}>
        Reset code
      </Button>

      <Button
        variant={confirmSolution ? "default" : "outline"}
        size="sm"
        onClick={onSolutionClick}
        disabled={questionContext?.solutionRevealed || !canShowSolution}
        className="gap-1.5"
        title={
          canShowSolution ? undefined : "Unlock all 5 progressive hints first"
        }
      >
        <Lightbulb className="h-3.5 w-3.5" />
        {questionContext?.solutionRevealed
          ? "Solution shown"
          : confirmSolution
            ? "Confirm show solution"
            : canShowSolution
              ? "Solution"
              : `Solution (${hintsUnlocked}/5 hints)`}
      </Button>

      {!canShowSolution && !questionContext?.solutionRevealed && (
        <>
          <Button
            variant={confirmGiveUp ? "destructive" : "ghost"}
            size="sm"
            onClick={onGiveUp}
          >
            {confirmGiveUp ? "Confirm give up" : "I give up"}
          </Button>
          {confirmGiveUp && (
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setConfirmGiveUp(false)}
            >
              Cancel
            </button>
          )}
        </>
      )}

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
        variant="outline"
        size="sm"
        onClick={() => formatCode()}
        className="gap-1.5"
      >
        <AlignLeft className="h-3.5 w-3.5" />
        Format
      </Button>

      {onMarkSolved && (
        <Button size="sm" variant="secondary" onClick={onMarkSolved}>
          Mark as solved
        </Button>
      )}

      {questionContext && (
        <Link
          href={`/practice/${questionContext.questionId}/notes`}
          className="ml-auto text-xs text-primary hover:underline"
        >
          Notes
        </Link>
      )}
      </div>

      {hasTrace && (
      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 bg-muted/15 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Walkthrough
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={stepPrev}
          disabled={!hasTrace || stepIndex === 0}
          aria-label="Previous step"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={isPlaying ? pause : play}
          disabled={!hasTrace}
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
          disabled={!hasTrace || stepIndex >= total - 1}
          aria-label="Next step"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={restart}
          disabled={!hasTrace}
          aria-label="Restart playback"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs text-muted-foreground">
          {hasTrace ? `Step ${stepIndex + 1}/${total}` : "Run to visualize"}
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
      )}
    </div>
  );
}
