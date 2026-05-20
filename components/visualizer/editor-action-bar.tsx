"use client";

import { AlignLeft, BarChart3, Loader2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

type Props = {
  onOpenVisualize?: () => void;
};

/** Run / Visualize / AI Explain / Format — above the Monaco editor. */
export function EditorActionBar({ onOpenVisualize }: Props) {
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const run = useVisualizerStore((s) => s.run);
  const formatCode = useVisualizerStore((s) => s.formatCode);
  const trace = useVisualizerStore((s) => s.trace);
  const allExamplesPass = useVisualizerStore((s) => s.allExamplesPass);
  const hasTwoExamples = useVisualizerStore((s) => s.hasTwoExamples);
  const aiExplainLoading = useVisualizerStore((s) => s.aiExplainLoading);
  const fetchAiExplain = useVisualizerStore((s) => s.fetchAiExplain);

  const exampleResults = useVisualizerStore((s) => s.exampleResults);
  const showAiExplain = !!trace && hasTwoExamples && allExamplesPass;
  const hasTrace = !!trace;
  const canVisualize =
    hasTrace &&
    (exampleResults == null || exampleResults.length === 0 || allExamplesPass);
  const visualizeBlocked =
    hasTrace && exampleResults != null && exampleResults.length > 0 && !allExamplesPass;

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-panel px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Your solution
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          onClick={() => run()}
          disabled={isRunning || aiExplainLoading}
          className="gap-1.5"
        >
          <Zap className="h-3.5 w-3.5" />
          {isRunning ? "Running…" : "Run"}
        </Button>
        {hasTrace ? (
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenVisualize}
            disabled={isRunning || aiExplainLoading || !canVisualize}
            title={
              visualizeBlocked
                ? "Pass all required examples to open Visualize"
                : "Step through your solution with animation"
            }
            className="gap-1.5"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Visualize
          </Button>
        ) : null}
        {showAiExplain ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => fetchAiExplain()}
            disabled={aiExplainLoading}
            className="gap-1.5"
          >
            {aiExplainLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {aiExplainLoading ? "Explaining…" : "AI Explain"}
          </Button>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          onClick={() => formatCode()}
          disabled={isRunning || aiExplainLoading}
          className="gap-1.5"
        >
          <AlignLeft className="h-3.5 w-3.5" />
          Format
        </Button>
      </div>
    </div>
  );
}
