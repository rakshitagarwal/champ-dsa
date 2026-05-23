"use client";

import { useEffect, useMemo } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { diffScenes } from "@/lib/viz/scene/step-diff";
import { AiAnimationControlBar } from "../ai-animation-control-bar";
import { AiAnimationPanel } from "../ai-animation-panel";
import { CodePanel } from "./CodePanel";
import { TraceControlBar } from "./ControlBar";
import { VizCaseBanner } from "../viz-case-banner";
import { VizStage } from "../scene/viz-stage";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TraceVisualizerModal({ open, onOpenChange }: Props) {
  const playbackSteps = useVisualizerStore((s) => s.playbackSteps);
  const traceStepIndex = useVisualizerStore((s) => s.traceStepIndex);
  const traceCode = useVisualizerStore((s) => s.traceCode);
  const isTracePlaying = useVisualizerStore((s) => s.isTracePlaying);
  const traceSpeed = useVisualizerStore((s) => s.traceSpeed);
  const trace = useVisualizerStore((s) => s.trace);
  const traceStepNext = useVisualizerStore((s) => s.traceStepNext);
  const pauseTrace = useVisualizerStore((s) => s.pauseTrace);
  const patternName = useVisualizerStore((s) => s.patternName);
  const patternHints = useVisualizerStore((s) => s.patternHints);

  const aiAnimation = useVisualizerStore((s) => s.aiAnimation);
  const aiAnimationLoading = useVisualizerStore((s) => s.aiAnimationLoading);
  const aiAnimationError = useVisualizerStore((s) => s.aiAnimationError);
  const aiAnimationMode = useVisualizerStore((s) => s.aiAnimationMode);
  const aiAnimStepIndex = useVisualizerStore((s) => s.aiAnimStepIndex);
  const isAiAnimPlaying = useVisualizerStore((s) => s.isAiAnimPlaying);
  const aiAnimStepNext = useVisualizerStore((s) => s.aiAnimStepNext);
  const fetchAiAnimation = useVisualizerStore((s) => s.fetchAiAnimation);
  const fetchAnimationCaptions = useVisualizerStore(
    (s) => s.fetchAnimationCaptions,
  );
  const animationCaptionsLoading = useVisualizerStore(
    (s) => s.animationCaptionsLoading,
  );
  const clearAiAnimation = useVisualizerStore((s) => s.clearAiAnimation);
  const pauseAiAnim = useVisualizerStore((s) => s.pauseAiAnim);
  const aiAnimStepCount = useVisualizerStore((s) => s.aiAnimStepCount);

  const isAiMode = aiAnimationMode === "ai" && !!aiAnimation;
  const step = playbackSteps[traceStepIndex];
  const aiStepCount = aiAnimStepCount();
  const aiStep =
    isAiMode && aiAnimation
      ? aiAnimation.steps[
          Math.min(aiAnimStepIndex, aiAnimation.steps.length - 1)
        ]
      : null;

  const pedagogyKinds = useMemo(() => {
    if (!step?.scene) return new Set<string>();
    return new Set(step.scene.structures.map((s) => s.kind));
  }, [step]);

  const stepDiff = useMemo(() => {
    if (!step || isAiMode) return null;
    const prev = playbackSteps[traceStepIndex - 1];
    const prevEvent =
      prev?.eventIndex !== undefined && trace
        ? trace.events[prev.eventIndex]
        : null;
    const currEvent =
      step.eventIndex !== undefined && trace
        ? trace.events[step.eventIndex]
        : null;
    return diffScenes(
      prev?.scene ?? null,
      step.scene,
      prevEvent ?? null,
      currEvent ?? null,
    );
  }, [playbackSteps, traceStepIndex, step, trace, isAiMode]);

  useEffect(() => {
    if (!open || !isTracePlaying || isAiMode) return;
    const interval = setInterval(() => traceStepNext(), 1000 / traceSpeed);
    return () => clearInterval(interval);
  }, [open, isTracePlaying, traceSpeed, traceStepNext, isAiMode]);

  useEffect(() => {
    if (!open || !isAiAnimPlaying || !isAiMode) return;
    const interval = setInterval(() => aiAnimStepNext(), 800);
    return () => clearInterval(interval);
  }, [open, isAiAnimPlaying, isAiMode, aiAnimStepNext]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !aiAnimationLoading && !animationCaptionsLoading) {
        pauseTrace();
        pauseAiAnim();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    open,
    onOpenChange,
    pauseTrace,
    pauseAiAnim,
    aiAnimationLoading,
    animationCaptionsLoading,
  ]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      clearAiAnimation();
      pauseTrace();
      pauseAiAnim();
    }
  }, [open, clearAiAnimation, pauseTrace, pauseAiAnim]);

  if (!open) return null;

  const displayCode = traceCode || "";
  const showTracePanel =
    !isAiMode && playbackSteps.length > 0 && !!step;
  const showTraceEmpty = !isAiMode && playbackSteps.length === 0;
  const codeDescription = isAiMode
    ? (aiStep?.label ?? "")
    : (step?.description ?? "");

  const handleClose = () => {
    if (aiAnimationLoading || animationCaptionsLoading) return;
    pauseTrace();
    pauseAiAnim();
    onOpenChange(false);
  };

  const showWhatToWatch =
    pedagogyKinds.has("linkedList") ||
    pedagogyKinds.has("tree") ||
    pedagogyKinds.has("graph");

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-white">Visualize</h2>
            {patternName ? (
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-300">
                {patternName}
              </span>
            ) : null}
          </div>
          <p className="text-xs text-gray-500">
            {isAiMode
              ? `${aiAnimation?.title ?? "Algorithm"} — AI SVG (optional)`
              : "Step through the reference solution — code and animation stay in sync"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!isAiMode && playbackSteps.length > 0 ? (
            <button
              type="button"
              onClick={() => void fetchAnimationCaptions()}
              disabled={animationCaptionsLoading || aiAnimationLoading}
              className="flex items-center gap-1 rounded border border-gray-700 px-2 py-1 text-xs text-gray-300 hover:border-gray-500 hover:text-white disabled:opacity-40"
            >
              {animationCaptionsLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              Enhance captions
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void fetchAiAnimation()}
            disabled={aiAnimationLoading || animationCaptionsLoading}
            className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-400 hover:text-white disabled:opacity-40"
            title="Experimental: AI-generated SVG (uses more API tokens)"
          >
            AI SVG
          </button>
          <button
            type="button"
            onClick={handleClose}
            disabled={aiAnimationLoading || animationCaptionsLoading}
            className="text-xl leading-none text-gray-400 hover:text-white disabled:opacity-40"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <VizCaseBanner variant="dark" />

      {aiAnimationError && !isAiMode ? (
        <div className="border-b border-amber-900/50 bg-amber-950/40 px-6 py-2 text-xs text-amber-200">
          {aiAnimationError}
        </div>
      ) : null}

      <div className="relative flex flex-1 overflow-hidden">
        {(aiAnimationLoading || animationCaptionsLoading) && !isAiMode ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0d1117]/90">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            <p className="text-sm text-gray-300">
              {animationCaptionsLoading
                ? "Enhancing step captions…"
                : "Generating AI SVG…"}
            </p>
          </div>
        ) : null}

        <div className="flex w-1/2 flex-col overflow-hidden border-r border-gray-800">
          {displayCode ? (
            <CodePanel
              code={displayCode}
              highlightedLine={isAiMode ? undefined : step?.line}
              description={codeDescription}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-gray-500">
              Fill Solution first to visualize.
            </div>
          )}
        </div>

        <div className="relative flex w-1/2 flex-col overflow-hidden">
          {showWhatToWatch && !isAiMode && patternHints?.length ? (
            <div className="shrink-0 border-b border-gray-800 bg-[#161b22]/80 px-4 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                What to watch
              </p>
              <ul className="mt-1 list-inside list-disc text-xs text-gray-400">
                {patternHints.slice(0, 2).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-gray-600">
                slow = blue · fast = green · active nodes highlighted
              </p>
            </div>
          ) : null}

          <div className="relative min-h-0 flex-1 overflow-auto">
            {isAiMode && aiAnimation && aiStep ? (
              <AiAnimationPanel title={aiAnimation.title} step={aiStep} />
            ) : showTracePanel ? (
              <VizStage scene={step.scene} stepDiff={stepDiff} darkStage />
            ) : showTraceEmpty ? (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-gray-500">
                Fill Solution to build the step-by-step animation.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isAiMode && aiStepCount > 0 ? (
        <AiAnimationControlBar />
      ) : showTracePanel ? (
        <TraceControlBar />
      ) : null}
    </div>
  );
}
