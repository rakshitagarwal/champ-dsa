"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import type { ProgressiveHint } from "@/types/question";
import { Dialog } from "@/components/ui/dialog";
import {
  getProgress,
  recordHintUnlock,
  recordHintView,
  LEARNING_UPDATED_EVENT,
} from "@/lib/storage/learning-store";

export const HINT_LEVELS = [
  { key: "observation" as const, label: "Observation" },
  { key: "direction" as const, label: "Direction" },
  { key: "pattern" as const, label: "Pattern" },
  { key: "pseudocode" as const, label: "Pseudocode" },
  { key: "solution" as const, label: "Full solution" },
] as const;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionId: string;
  progressiveHints?: ProgressiveHint;
  patternHints?: string[];
};

export function HintModal({
  open,
  onOpenChange,
  questionId,
  progressiveHints,
  patternHints,
}: Props) {
  const [unlocked, setUnlocked] = useState(0);
  const [pendingLevel, setPendingLevel] = useState(1);

  useEffect(() => {
    const refresh = () =>
      setUnlocked(getProgress(questionId).hintsUnlocked);
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
  }, [questionId]);

  useEffect(() => {
    if (!open) return;
    if (progressiveHints) {
      setPendingLevel(Math.min(5, unlocked + 1));
    }
  }, [open, unlocked, progressiveHints]);

  const consumeHintOnDismiss = () => {
    if (progressiveHints && pendingLevel <= 5 && unlocked < pendingLevel) {
      recordHintUnlock(questionId, pendingLevel);
      recordHintView(questionId, pendingLevel);
      if (pendingLevel === 5) {
        window.dispatchEvent(
          new CustomEvent("champdsa-hint-solution-ready", {
            detail: { questionId },
          }),
        );
      }
    } else if (patternHints?.length && unlocked < patternHints.length) {
      const next = Math.min(patternHints.length, unlocked + 1);
      recordHintUnlock(questionId, next);
      recordHintView(questionId, next);
    }
    onOpenChange(false);
  };

  const allProgressiveUnlocked = progressiveHints && unlocked >= 5;
  const levelMeta =
    progressiveHints && !allProgressiveUnlocked
      ? HINT_LEVELS[pendingLevel - 1]
      : null;
  const progressiveBody =
    progressiveHints && levelMeta ? progressiveHints[levelMeta.key] : null;

  const title = progressiveHints
    ? allProgressiveUnlocked
      ? "No more hints"
      : `Hint ${pendingLevel} of 5 — ${levelMeta?.label ?? ""}`
    : "Pattern hint";

  const description = progressiveHints
    ? allProgressiveUnlocked
      ? "You have used all 5 hints. Use the Solution button when you are ready."
      : "Read this hint only. Close with ✕ when you are done — that counts as using this hint."
    : "Read the hint below. Close with ✕ when you are done.";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) consumeHintOnDismiss();
      }}
      title={title}
      description={description}
      closeOnEscape={false}
      closeOnOverlayClick={false}
      className="max-w-lg"
    >
      <div className="space-y-4">
        {progressiveHints ? (
          allProgressiveUnlocked ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              All progressive hints are already unlocked for this problem.
            </p>
          ) : (
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <Lightbulb className="h-4 w-4" />
                {levelMeta?.label}
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">
                {progressiveBody}
              </p>
            </div>
          )
        ) : patternHints?.length ? (
          <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm leading-relaxed">
            → {patternHints[Math.min(unlocked, patternHints.length - 1)]}
          </p>
        ) : null}

        <p className="text-xs text-muted-foreground">
          Use the ✕ button above to close. Clicking outside will not close this dialog.
        </p>
      </div>
    </Dialog>
  );
}
