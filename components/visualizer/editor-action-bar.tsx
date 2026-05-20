"use client";

import { AlignLeft, BarChart3, FileCode2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { AiHintButton } from "./ai-hint-button";

type Props = {
  onOpenVisualize?: () => void;
};

/** Run / Fill Solution / Visualize / AI Hint / Format — above the Monaco editor. */
export function EditorActionBar({ onOpenVisualize }: Props) {
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const run = useVisualizerStore((s) => s.run);
  const fillSolution = useVisualizerStore((s) => s.fillSolution);
  const formatCode = useVisualizerStore((s) => s.formatCode);
  const questionContext = useVisualizerStore((s) => s.questionContext);
  const solutionFilled = useVisualizerStore((s) => s.solutionFilled);
  const canOpenVisualize = useVisualizerStore((s) => s.canOpenVisualize);

  const canVisualize = canOpenVisualize();
  const showFill = !!questionContext?.solutionCode;

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-panel px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Your solution
      </p>
      <div className="flex flex-wrap items-center gap-2">
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
        {canVisualize ? (
          <Button
            size="sm"
            variant="default"
            onClick={onOpenVisualize}
            disabled={isRunning}
            title="Step through the reference solution with animation"
            className="gap-1.5"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Visualize
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
