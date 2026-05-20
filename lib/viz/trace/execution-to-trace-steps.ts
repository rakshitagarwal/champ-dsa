import type { TraceStep, ArrayHighlightKind, PointerSnapshot } from "@/lib/tracer/types";
import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import type { VizScene, VizStructure } from "@/types/viz-scene";
import { compactTimeline } from "@/lib/viz/scene/compact-steps";
import { traceUsesUnsupportedStructures } from "./can-use-trace-player";

const POINTER_COLORS: Record<string, string> = {
  ch: "#60a5fa",
  i: "#60a5fa",
  j: "#f472b6",
  left: "#34d399",
  right: "#fb923c",
  slow: "#a78bfa",
  fast: "#fbbf24",
  lo: "#34d399",
  hi: "#fb923c",
  start: "#34d399",
  end: "#fb923c",
};

function highlightKindForCell(
  scene: VizScene,
  structureId: string,
  index: number,
): ArrayHighlightKind | undefined {
  for (const h of scene.highlights) {
    if (h.type === "cell" && h.structureId === structureId && h.index === index) {
      return "active";
    }
    if (
      h.type === "window" &&
      h.structureId === structureId &&
      index >= h.left &&
      index <= h.right
    ) {
      return index === h.left || index === h.right ? "comparing" : "visited";
    }
  }
  const ptr = scene.pointers.find(
    (p) => p.kind === "arrayIndex" && p.structureId === structureId && p.index === index,
  );
  if (ptr) return "active";
  return undefined;
}

function structureToArrays(scene: VizScene): TraceStep["ds"]["arrays"] {
  const arrays: NonNullable<TraceStep["ds"]["arrays"]> = [];
  for (const s of scene.structures) {
    if (s.kind !== "array") continue;
    const highlights: Partial<Record<number, ArrayHighlightKind>> = {};
    for (let i = 0; i < s.values.length; i++) {
      const hl = highlightKindForCell(scene, s.id, i);
      if (hl) highlights[i] = hl;
    }
    arrays.push({
      id: s.id,
      label: s.label || s.variable,
      values: s.values.map((v) =>
        v === null || v === undefined
          ? null
          : typeof v === "object"
            ? JSON.stringify(v)
            : (v as number | string),
      ),
      highlights,
    });
  }
  return arrays.length ? arrays : undefined;
}

function structureToStacks(scene: VizScene): TraceStep["ds"]["stacks"] {
  const stacks: NonNullable<TraceStep["ds"]["stacks"]> = [];
  for (const s of scene.structures) {
    if (s.kind !== "stack") continue;
    stacks.push({
      id: s.id,
      label: s.label || s.variable,
      items: s.values.map((v) =>
        typeof v === "object" ? JSON.stringify(v) : String(v),
      ),
    });
  }
  return stacks.length ? stacks : undefined;
}

function pointersFromScene(scene: VizScene): PointerSnapshot[] {
  const out: PointerSnapshot[] = [];
  for (const p of scene.pointers) {
    if (p.kind !== "arrayIndex" || p.index === undefined) continue;
    const arr = scene.structures.find(
      (s) => s.kind === "array" && s.id === p.structureId,
    );
    if (!arr || arr.kind !== "array") continue;
    out.push({
      arrayId: arr.id,
      name: p.name,
      index: p.index,
      color: POINTER_COLORS[p.name] ?? "#60a5fa",
    });
  }
  return out;
}

function stringWalkToDs(scene: VizScene): Partial<TraceStep["ds"]> {
  const walk = scene.stringWalk;
  if (!walk) return {};

  const arrayId = `string:${walk.variable}`;
  const pointers: PointerSnapshot[] = [
    {
      arrayId,
      name: "ch",
      index: walk.index,
      color: POINTER_COLORS.ch ?? "#60a5fa",
    },
  ];

  return {
    arrays: [
      {
        id: arrayId,
        label: walk.variable,
        values: walk.chars,
        highlights: { [walk.index]: "active" },
      },
    ],
    pointers,
  };
}

function sceneToTraceStep(
  scene: VizScene,
  event: ExecutionEvent | undefined,
  stepIndex: number,
): TraceStep {
  const description =
    scene.caption ??
    event?.explanation ??
    (event?.type === "loop"
      ? "loop iteration"
      : event?.type === "condition"
        ? "evaluate condition"
        : event?.type === "branch"
          ? "branch"
          : `step ${stepIndex + 1}`);

  const stringDs = stringWalkToDs(scene);

  return {
    line: Math.max(1, scene.line),
    description,
    vars: event?.variables ? { ...event.variables } : {},
    ds: {
      arrays: [...(stringDs.arrays ?? []), ...(structureToArrays(scene) ?? [])],
      stacks: structureToStacks(scene),
      pointers: [
        ...(stringDs.pointers ?? []),
        ...pointersFromScene(scene),
      ],
    },
  };
}

export function executionToTraceSteps(
  trace: ExecutionTrace,
  profile: VizProfile,
  curated = true,
): TraceStep[] | null {
  const { scenes, eventIndices } = compactTimeline(trace.events, profile, {
    curated,
  });
  if (scenes.length === 0) return null;
  if (traceUsesUnsupportedStructures(scenes)) return null;

  return scenes.map((scene, i) => {
    const eventIdx = eventIndices[i];
    const event =
      eventIdx !== undefined ? trace.events[eventIdx] : undefined;
    return sceneToTraceStep(scene, event, i);
  });
}

export function hasOnlyTraceSupportedStructures(
  structures: VizStructure[],
): boolean {
  return !structures.some((s) =>
    ["linkedList", "tree", "graph", "heap"].includes(s.kind),
  );
}
