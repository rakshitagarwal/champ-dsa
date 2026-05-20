"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { VizStage, useSceneChangedIndices } from "./scene/viz-stage";

/** Routes to VizStage driven by Groq profile + compacted trace timeline. */
export function AnimationCanvas() {
  const scene = useVisualizerStore((s) => s.currentScene());
  const changedIndices = useSceneChangedIndices(scene);

  return <VizStage scene={scene} changedIndices={changedIndices} />;
}
