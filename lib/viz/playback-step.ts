import type { VizScene } from "@/types/viz-scene";

/** One precomputed visualizer frame — playback only reads this array. */
export type PlaybackStep = {
  /** 1-indexed line in solution code */
  line: number;
  description: string;
  scene: VizScene;
  eventIndex?: number;
};
