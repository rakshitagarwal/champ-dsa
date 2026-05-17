"use client";

import { useEffect, useState } from "react";
import { Lock, Lightbulb } from "lucide-react";
import type { ProgressiveHint } from "@/types/question";
import {
  getProgress,
  recordHintUnlock,
  recordHintView,
  LEARNING_UPDATED_EVENT,
} from "@/lib/storage/learning-store";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { Button } from "@/components/ui/button";

const LEVELS = [
  { key: "observation" as const, label: "Observation" },
  { key: "direction" as const, label: "Direction" },
  { key: "pattern" as const, label: "Pattern" },
  { key: "pseudocode" as const, label: "Pseudocode" },
  { key: "solution" as const, label: "Full solution" },
];

type Props = {
  questionId: string;
  hints: ProgressiveHint;
};

export function ProgressiveHints({ questionId, hints }: Props) {
  const trace = useVisualizerStore((s) => s.trace);
  const [unlocked, setUnlocked] = useState(0);
  const [openedAt] = useState(() => Date.now());

  useEffect(() => {
    const refresh = () =>
      setUnlocked(getProgress(questionId).hintsUnlocked);
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
  }, [questionId]);

  useEffect(() => {
    const elapsed = Date.now() - openedAt;
    if ((trace || elapsed > 120_000) && unlocked < 1) {
      recordHintUnlock(questionId, 1);
    }
  }, [trace, openedAt, questionId, unlocked]);

  const canUnlock = (level: number) => unlocked >= level - 1;

  const unlockNext = (level: number) => {
    if (!canUnlock(level)) return;
    recordHintUnlock(questionId, level);
    recordHintView(questionId, level);
    if (level === 5) {
      window.dispatchEvent(
        new CustomEvent("champdsa-hint-solution-ready", {
          detail: { questionId },
        }),
      );
    }
  };

  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Lightbulb className="h-3.5 w-3.5" />
        Progressive hints ({unlocked}/5 unlocked)
      </p>
      {LEVELS.map((lvl, i) => {
        const level = i + 1;
        const isUnlocked = unlocked >= level;
        const text = hints[lvl.key];
        return (
          <div
            key={lvl.key}
            className="rounded-md border border-border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium">
                {level}. {lvl.label}
              </span>
              {!isUnlocked && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  disabled={!canUnlock(level)}
                  onClick={() => unlockNext(level)}
                >
                  {canUnlock(level) ? (
                    "Unlock"
                  ) : (
                    <>
                      <Lock className="h-3 w-3" />
                      Locked
                    </>
                  )}
                </Button>
              )}
            </div>
            {isUnlocked && (
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">
                {text}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

