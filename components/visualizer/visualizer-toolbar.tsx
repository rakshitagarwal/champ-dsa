"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
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
  const questionContext = useVisualizerStore((s) => s.questionContext);
  const resetToStarter = useVisualizerStore((s) => s.resetToStarter);
  const revealSolution = useVisualizerStore((s) => s.revealSolution);

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
    </div>
  );
}
