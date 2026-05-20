import type { ExecutionTrace } from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import type { VizScene, VizStructure } from "@/types/viz-scene";
import { hasManualTracer } from "@/lib/tracer/manual/registry";

const UNSUPPORTED_KINDS = new Set([
  "linkedList",
  "tree",
  "graph",
  "heap",
]);

export function sceneUsesUnsupportedStructures(scene: VizScene): boolean {
  return scene.structures.some((s) => UNSUPPORTED_KINDS.has(s.kind));
}

export function traceUsesUnsupportedStructures(
  scenes: VizScene[],
): boolean {
  return scenes.some(sceneUsesUnsupportedStructures);
}

export function canUseTracePlayer(opts: {
  questionId?: string | null;
  trace: ExecutionTrace | null;
  scenes: VizScene[];
  profile: VizProfile | null;
}): boolean {
  if (opts.questionId && hasManualTracer(opts.questionId)) return true;
  if (!opts.trace || opts.trace.events.length === 0) return false;
  if (traceUsesUnsupportedStructures(opts.scenes)) return false;
  const hasRenderable =
    opts.scenes.some(
      (s) =>
        s.structures.some(
          (st) =>
            st.kind === "array" || st.kind === "stack",
        ) || (s.scalars && Object.keys(s.scalars).length > 0),
    ) || opts.scenes.length > 0;
  return hasRenderable;
}

export function isTraceVizEnabled(): boolean {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_TRACE_VIZ === "0") {
    return false;
  }
  return true;
}
