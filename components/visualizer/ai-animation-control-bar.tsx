"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";

export function AiAnimationControlBar() {
  const {
    aiAnimStepIndex,
    isAiAnimPlaying,
    aiAnimStepCount,
    setAiAnimStep,
    aiAnimStepPrev,
    aiAnimStepNext,
    aiAnimTogglePlay,
  } = useVisualizerStore();

  const count = aiAnimStepCount();
  const isLast = count > 0 && aiAnimStepIndex >= count - 1;

  if (count === 0) return null;

  return (
    <div className="flex h-14 items-center gap-4 border-t border-gray-800 bg-[#0d1117] px-6">
      <button
        type="button"
        onClick={aiAnimStepPrev}
        disabled={aiAnimStepIndex === 0}
        className="px-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
      >
        ◀ Prev
      </button>
      <button
        type="button"
        onClick={aiAnimTogglePlay}
        className="min-w-[80px] rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
      >
        {isAiAnimPlaying ? "⏸ Pause" : isLast ? "↺ Restart" : "▶ Play"}
      </button>
      <button
        type="button"
        onClick={aiAnimStepNext}
        disabled={isLast}
        className="px-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
      >
        Next ▶
      </button>
      <input
        type="range"
        min={0}
        max={Math.max(0, count - 1)}
        value={aiAnimStepIndex}
        onChange={(e) => setAiAnimStep(Number(e.target.value))}
        className="flex-1 accent-blue-500"
      />
      <span className="min-w-[90px] text-right text-sm text-gray-400">
        {isLast ? (
          <span className="text-green-400">Complete ✓</span>
        ) : (
          `Step ${aiAnimStepIndex + 1} / ${count}`
        )}
      </span>
    </div>
  );
}
