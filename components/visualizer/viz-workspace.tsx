"use client";

import { useEffect, useCallback, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { CodeEditor } from "./code-editor";
import { VisualizerToolbar } from "./visualizer-toolbar";
import { ConsolePanel } from "./console-panel";
import { AnimationStage } from "./animation-stage";
import { ProgressiveHints } from "@/components/practice/progressive-hints";
import type { ProgressiveHint } from "@/types/question";

type Props = {
  mode: "free" | "practice";
  hints?: string[];
  progressiveHints?: ProgressiveHint;
  questionId?: string;
  fillParent?: boolean;
};

export function VizWorkspace({
  mode,
  hints,
  progressiveHints,
  questionId,
  fillParent,
}: Props) {
  const [problemOpen, setProblemOpen] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);

  const isPlaying = useVisualizerStore((s) => s.isPlaying);
  const speedMs = useVisualizerStore((s) => s.speedMs);
  const trace = useVisualizerStore((s) => s.trace);
  const stepNext = useVisualizerStore((s) => s.stepNext);
  const pause = useVisualizerStore((s) => s.pause);

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

  const problemTitle = useVisualizerStore((s) => s.problemTitle);
  const problemStatement = useVisualizerStore((s) => s.problemStatement);
  const patternName = useVisualizerStore((s) => s.patternName);
  const showProblemBar = mode === "practice" && problemTitle;

  return (
    <div
      className={
        fillParent
          ? "flex h-full min-h-0 flex-col"
          : "flex h-[calc(100vh-3.25rem)] min-h-[640px] flex-col"
      }
    >
      {showProblemBar ? (
        <div className="shrink-0 border-b border-border bg-panel">
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium"
            onClick={() => setProblemOpen((o) => !o)}
          >
            <span>
              {problemTitle} —{" "}
              <span className="text-muted-foreground">{patternName}</span>
            </span>
            {problemOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {problemOpen && (
            <div className="border-t border-border px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {problemStatement}
              </p>
              {progressiveHints && questionId ? (
                <div className="mt-3">
                  <ProgressiveHints
                    questionId={questionId}
                    hints={progressiveHints}
                  />
                </div>
              ) : null}
              {!progressiveHints && hints && hints.length > 0 && (
                <div className="mt-3">
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() => setHintsOpen((o) => !o)}
                  >
                    {hintsOpen ? "Hide" : "Show"} pattern hints
                  </button>
                  {hintsOpen && (
                    <ul className="mt-2 space-y-1.5">
                      {hints.map((h) => (
                        <li
                          key={h}
                          className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground"
                        >
                          → {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : mode === "free" ? (
        <div className="shrink-0 border-b border-border bg-panel px-4 py-2">
          <p className="text-sm font-medium">Code Visualizer</p>
          <p className="text-xs text-muted-foreground">
            Write your own JavaScript. Use{" "}
            <code className="rounded bg-muted px-1">function solve(...)</code> and
            human-readable input below.
          </p>
        </div>
      ) : null}

      <VisualizerToolbar mode={mode} />

      <Group orientation="horizontal" className="min-h-0 flex-1">
        <Panel defaultSize={42} minSize={30}>
          <div className="flex h-full min-h-0 flex-col gap-1 p-2">
            <p className="shrink-0 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Code
            </p>
            <div className="min-h-0 flex-1">
              <CodeEditor />
            </div>
          </div>
        </Panel>
        <Separator className="w-1 bg-border hover:bg-primary/50" />
        <Panel defaultSize={58} minSize={38}>
          <div className="flex h-full min-h-0 flex-col gap-1 p-2">
            <p className="shrink-0 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Step walkthrough
            </p>
            <div className="min-h-0 flex-1 overflow-hidden">
              <AnimationStage />
            </div>
          </div>
        </Panel>
      </Group>

      <div className="h-24 shrink-0 border-t border-border">
        <ConsolePanel />
      </div>
    </div>
  );
}
