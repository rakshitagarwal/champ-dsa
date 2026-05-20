"use client";

import { useEffect } from "react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { CodePanel } from "./CodePanel";
import { AnimationPanel } from "./AnimationPanel";
import { TraceControlBar } from "./ControlBar";
import { VizCaseBanner } from "../viz-case-banner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TraceVisualizerModal({ open, onOpenChange }: Props) {
  const {
    traceSteps,
    traceStepIndex,
    traceCode,
    isTracePlaying,
    traceSpeed,
    traceStepNext,
    pauseTrace,
  } = useVisualizerStore();

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

  if (!open || traceSteps.length === 0) return null;

  const step = traceSteps[traceStepIndex];
  if (!step) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Visualize</h2>
          <p className="text-xs text-gray-500">
            Reference solution — code and animation stay in sync
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            pauseTrace();
            onOpenChange(false);
          }}
          className="text-xl leading-none text-gray-400 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <VizCaseBanner variant="dark" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-hidden border-r border-gray-800">
          <CodePanel
            code={traceCode}
            highlightedLine={step.line}
            description={step.description}
          />
        </div>
        <div className="w-1/2 overflow-auto">
          <AnimationPanel snapshot={step.ds} />
        </div>
      </div>
      <TraceControlBar />
    </div>
  );
}
