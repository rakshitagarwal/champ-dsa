"use client";

import { AlignLeft, FileCode2, RotateCcw, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { AiHintButton } from "./ai-hint-button";

/** Run / Fill Solution / Explain / AI Hint / Format — above the Monaco editor. */
export function EditorActionBar() {
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const run = useVisualizerStore((s) => s.run);
  const fillSolution = useVisualizerStore((s) => s.fillSolution);
  const resetToStarter = useVisualizerStore((s) => s.resetToStarter);
  const formatCode = useVisualizerStore((s) => s.formatCode);
  const questionContext = useVisualizerStore((s) => s.questionContext);
  const solutionFilled = useVisualizerStore((s) => s.solutionFilled);
  const canOpenExplain = useVisualizerStore((s) => s.canOpenExplain);
  const showSolutionExplanation = useVisualizerStore(
    (s) => s.showSolutionExplanation,
  );

  const showFill = !!questionContext?.solutionCode && !solutionFilled;
  const showReset = !!questionContext;

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-panel px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Your solution
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {showReset ? (
          <Button
            variant="outline"
            size="sm"
            onClick={resetToStarter}
            disabled={isRunning}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        ) : null}
        <Button
          size="sm"
          onClick={() => run()}
          disabled={isRunning}
          variant="outline"
          className="gap-1.5"
        >
          <Zap className="h-3.5 w-3.5" />
          {isRunning ? "Running…" : "Run"}
        </Button>
        {showFill ? (
          <Button
            size="sm"
            onClick={() => void fillSolution()}
            disabled={isRunning}
            className="gap-1.5"
          >
            <FileCode2 className="h-3.5 w-3.5" />
            {isRunning ? "Loading…" : "Fill Solution"}
          </Button>
        ) : null}
        {canOpenExplain() ? (
          <Button
            size="sm"
            variant="default"
            onClick={() => showSolutionExplanation()}
            disabled={isRunning}
            title="Open explanation for the reference solution"
            className="gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Explain
          </Button>
        ) : null}
        <AiHintButton />
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatCode()}
          disabled={isRunning}
          className="gap-1.5"
        >
          <AlignLeft className="h-3.5 w-3.5" />
          Format
        </Button>
      </div>
    </div>
  );
}
