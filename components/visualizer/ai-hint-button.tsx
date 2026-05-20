"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

export function AiHintButton() {
  const [open, setOpen] = useState(false);
  const questionContext = useVisualizerStore((s) => s.questionContext);
  const patternName = useVisualizerStore((s) => s.patternName);
  const patternHints = useVisualizerStore((s) => s.patternHints);
  const progressiveHints = useVisualizerStore((s) => s.progressiveHints);
  const aiHintLevel = useVisualizerStore((s) => s.aiHintLevel);
  const advanceAiHint = useVisualizerStore((s) => s.advanceAiHint);
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const solutionFilled = useVisualizerStore((s) => s.solutionFilled);

  if (!questionContext) return null;

  const buttonLabel =
    aiHintLevel === 0
      ? "AI Hint"
      : aiHintLevel === 3
        ? solutionFilled
          ? "Solution loaded"
          : "Solution"
        : `AI Hint (${aiHintLevel}/3)`;

  const handleClick = () => {
    if (aiHintLevel < 3) advanceAiHint();
    setOpen(true);
  };

  const content = getHintContent(
    aiHintLevel,
    patternName,
    patternHints,
    progressiveHints,
    solutionFilled,
  );

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        onClick={handleClick}
        disabled={isRunning}
        className="gap-1.5"
      >
        <Lightbulb className="h-3.5 w-3.5" />
        {buttonLabel}
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={content.title}
        className="max-w-md"
      >
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {content.body}
        </p>
        {aiHintLevel > 0 && aiHintLevel < 3 ? (
          <Button
            size="sm"
            className="mt-4 w-full"
            onClick={() => advanceAiHint()}
          >
            Next hint ({aiHintLevel + 1}/3)
          </Button>
        ) : null}
        {aiHintLevel >= 3 && solutionFilled ? (
          <p className="mt-4 text-center text-sm font-medium text-teal-600 dark:text-teal-400">
            Open Visualize to watch the curated animation.
          </p>
        ) : null}
      </Dialog>
    </>
  );
}

function getHintContent(
  level: 0 | 1 | 2 | 3,
  patternName: string | null,
  patternHints: string[] | null,
  progressiveHints: {
    pattern: string;
    direction: string;
    observation: string;
  } | null,
  solutionFilled: boolean,
): { title: string; body: string } {
  if (level === 0) {
    return {
      title: "AI Hint",
      body: "Click Next hint for the pattern, then a directional hint, then the full solution.",
    };
  }
  if (level === 1) {
    const hint =
      progressiveHints?.pattern ??
      patternHints?.[0] ??
      "Think about which algorithm family fits this problem.";
    return {
      title: `Pattern: ${patternName ?? "DSA"}`,
      body: hint,
    };
  }
  if (level === 2) {
    const hint =
      progressiveHints?.direction ??
      patternHints?.[1] ??
      progressiveHints?.observation ??
      patternHints?.[2] ??
      "Consider the invariant you maintain while scanning the input.";
    return {
      title: "Hint",
      body: hint,
    };
  }
  return {
    title: "Solution",
    body: solutionFilled
      ? "Reference solution is in the editor. Use Visualize for the step-by-step animation."
      : "Loading solution into the editor…",
  };
}
