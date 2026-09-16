"use client";

import { useEffect, useMemo } from "react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { diffScenes } from "@/lib/viz/scene/step-diff";
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

  const step = playbackSteps[traceStepIndex];

  const pedagogyKinds = useMemo(() => {
    if (!step?.scene) return new Set<string>();
    return new Set(step.scene.structures.map((s) => s.kind));
  }, [step]);

  const stepDiff = useMemo(() => {
    if (!step) return null;
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
  }, [playbackSteps, traceStepIndex, step, trace]);

  useEffect(() => {
    if (!open || !isTracePlaying) return;
    const interval = setInterval(() => traceStepNext(), 1000 / traceSpeed);
    return () => clearInterval(interval);
  }, [open, isTracePlaying, traceSpeed, traceStepNext]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pauseTrace();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange, pauseTrace]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) pauseTrace();
  }, [open, pauseTrace]);

  if (!open) return null;

  const displayCode = traceCode || "";
  const showTracePanel = playbackSteps.length > 0 && !!step;
  const showTraceEmpty = playbackSteps.length === 0;

  const handleClose = () => {
    pauseTrace();
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
            Step through the reference solution — code and animation stay in sync
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="text-xl leading-none text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <VizCaseBanner variant="dark" />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex w-1/2 flex-col overflow-hidden border-r border-gray-800">
          {displayCode ? (
            <CodePanel
              code={displayCode}
              highlightedLine={step?.line}
              description={step?.description ?? ""}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-gray-500">
              Fill Solution first to visualize.
            </div>
          )}
        </div>

        <div className="relative flex w-1/2 flex-col overflow-hidden">
          {showWhatToWatch && patternHints?.length ? (
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
            {showTracePanel ? (
              <VizStage scene={step.scene} stepDiff={stepDiff} darkStage />
            ) : showTraceEmpty ? (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-gray-500">
                Fill Solution to build the step-by-step animation.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showTracePanel ? <TraceControlBar /> : null}
    </div>
  );
}
