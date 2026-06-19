"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

type Props = {
  hasHints?: boolean;
  progressiveHints?: boolean;
  onOpenHints?: () => void;
  onMarkSolved?: () => void;
};

export function VisualizerToolbar({
  onMarkSolved,
}: Props) {
  const questionContext = useVisualizerStore((s) => s.questionContext);
  const resetToStarter = useVisualizerStore((s) => s.resetToStarter);

  return (
    <div className="shrink-0 border-b border-border bg-panel">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={resetToStarter}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
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
    </div>
  );
}
