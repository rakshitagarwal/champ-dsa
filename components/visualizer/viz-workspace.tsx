"use client";

import { useEffect, useCallback, useState } from "react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { EditorVizSplit } from "./editor-viz-split";
import { VizFullscreenModal } from "./viz-fullscreen-modal";
import { VisualizerToolbar } from "./visualizer-toolbar";
import { HintModal } from "@/components/practice/hint-modal";
import { ProblemPanel } from "./problem-panel";
import type { ProgressiveHint } from "@/types/question";

type Props = {
  hints?: string[];
  progressiveHints?: ProgressiveHint;
  questionId?: string;
  fillParent?: boolean;
  onMarkSolved?: () => void;
};

/** LeetCode-style solve workspace: 40% problem | 60% code + visualization. */
export function VizWorkspace({
  hints,
  progressiveHints,
  questionId,
  fillParent,
  onMarkSolved,
}: Props) {
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [vizFullscreenOpen, setVizFullscreenOpen] = useState(false);

  const isPlaying = useVisualizerStore((s) => s.isPlaying);
  const speedMs = useVisualizerStore((s) => s.speedMs);
  const trace = useVisualizerStore((s) => s.trace);
  const stepNext = useVisualizerStore((s) => s.stepNext);
  const pause = useVisualizerStore((s) => s.pause);

  const problemTitle = useVisualizerStore((s) => s.problemTitle);
  const problemStatement = useVisualizerStore((s) => s.problemStatement);
  const patternName = useVisualizerStore((s) => s.patternName);
  const problemDifficulty = useVisualizerStore((s) => s.problemDifficulty);
  const problemHumanInput = useVisualizerStore((s) => s.problemHumanInput);
  const problemSampleOutput = useVisualizerStore((s) => s.problemSampleOutput);
  const problemDescription = useVisualizerStore((s) => s.problemDescription);
  const problemExamples = useVisualizerStore((s) => s.problemExamples);
  const problemConstraints = useVisualizerStore((s) => s.problemConstraints);
  const problemLeetcodeUrl = useVisualizerStore((s) => s.problemLeetcodeUrl);

  useEffect(() => {
    if (!isPlaying || !trace) return;
    const id = setInterval(() => {
      const { stepIndex: idx, trace: t } = useVisualizerStore.getState();
      if (!t || idx >= t.events.length - 1) {
        pause();
        return;
      }
      stepNext();
    }, speedMs);
    return () => clearInterval(id);
  }, [isPlaying, speedMs, trace, stepNext, pause]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "F10") {
      e.preventDefault();
      if (e.shiftKey) useVisualizerStore.getState().stepPrev();
      else useVisualizerStore.getState().stepNext();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  if (!problemTitle || !problemStatement) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        <p>Pick a problem from Practice to start solving.</p>
      </div>
    );
  }

  return (
    <div
      className={
        fillParent
          ? "flex h-full min-h-0 flex-col overflow-hidden"
          : "flex h-[calc(100vh-3.25rem)] min-h-[640px] flex-col overflow-hidden"
      }
    >
      <VisualizerToolbar
        hasHints={
          !!questionId &&
          (!!progressiveHints || !!(hints && hints.length > 0))
        }
        progressiveHints={!!progressiveHints}
        onOpenHints={() => setHintModalOpen(true)}
        onMarkSolved={onMarkSolved}
        onOpenFullscreen={() => setVizFullscreenOpen(true)}
      />

      <VizFullscreenModal
        open={vizFullscreenOpen}
        onOpenChange={setVizFullscreenOpen}
      />

      {questionId && (progressiveHints || (hints && hints.length > 0)) ? (
        <HintModal
          open={hintModalOpen}
          onOpenChange={setHintModalOpen}
          questionId={questionId}
          progressiveHints={progressiveHints}
          patternHints={!progressiveHints ? hints : undefined}
        />
      ) : null}

      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="min-h-0 min-w-0 overflow-hidden border-r border-border">
          <ProblemPanel
            title={problemTitle}
            patternName={patternName ?? ""}
            difficulty={problemDifficulty ?? undefined}
            statement={problemStatement}
            description={problemDescription ?? undefined}
            examples={problemExamples ?? undefined}
            constraints={problemConstraints ?? undefined}
            leetcodeUrl={problemLeetcodeUrl ?? undefined}
            humanInput={problemHumanInput ?? ""}
            sampleOutput={problemSampleOutput ?? undefined}
          />
        </div>

        <EditorVizSplit expectedOutput={problemSampleOutput ?? undefined} />
      </div>
    </div>
  );
}
