"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";

export function TraceControlBar() {
  const {
    playbackSteps,
    traceStepIndex,
    isTracePlaying,
    traceSpeed,
    setTraceStep,
    traceStepPrev,
    traceStepNext,
    traceTogglePlay,
    setTraceSpeed,
  } = useVisualizerStore();

  const isLast = traceStepIndex >= playbackSteps.length - 1;

  return (
    <div className="flex h-14 items-center gap-4 border-t border-gray-800 bg-[#0d1117] px-6">
      <button
        type="button"
        onClick={traceStepPrev}
        disabled={traceStepIndex === 0}
        className="px-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
      >
        ◀ Prev
      </button>
      <button
        type="button"
        onClick={traceTogglePlay}
        className="min-w-[80px] rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
      >
        {isTracePlaying ? "⏸ Pause" : isLast ? "↺ Restart" : "▶ Play"}
      </button>
      <button
        type="button"
        onClick={traceStepNext}
        disabled={isLast}
        className="px-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
      >
        Next ▶
      </button>
      <input
        type="range"
        min={0}
        max={Math.max(0, playbackSteps.length - 1)}
        value={traceStepIndex}
        onChange={(e) => setTraceStep(Number(e.target.value))}
        className="flex-1 accent-blue-500"
      />
      <span className="min-w-[90px] text-right text-sm text-gray-400">
        {isLast ? (
          <span className="text-green-400">Complete ✓</span>
        ) : (
          `Step ${traceStepIndex + 1} / ${playbackSteps.length}`
        )}
      </span>
      <select
        value={traceSpeed}
        onChange={(e) => setTraceSpeed(Number(e.target.value))}
        className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-gray-300"
      >
        <option value={0.5}>0.5×</option>
        <option value={1}>1×</option>
        <option value={2}>2×</option>
      </select>
    </div>
  );
}
