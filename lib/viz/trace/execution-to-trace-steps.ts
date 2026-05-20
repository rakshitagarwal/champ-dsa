import type {
  TraceStep,
  ArrayHighlightKind,
  PointerSnapshot,
  HashmapSnapshot,
} from "@/lib/tracer/types";
import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import type { VizScene, VizStructure } from "@/types/viz-scene";
import { compactTimeline } from "@/lib/viz/scene/compact-steps";
import { traceUsesUnsupportedStructures } from "./can-use-trace-player";

const POINTER_COLORS: Record<string, string> = {
  ch: "#22d3ee",
  i: "#60a5fa",
  j: "#f472b6",
  k: "#a78bfa",
  l: "#34d399",
  r: "#fb923c",
  left: "#34d399",
  right: "#fb923c",
  slow: "#a78bfa",
  fast: "#fbbf24",
  lo: "#34d399",
  hi: "#fb923c",
  start: "#34d399",
  end: "#fb923c",
  low: "#34d399",
  high: "#fb923c",
  mid: "#c084fc",
};

const TRACE_POINTER_NAMES = [
  "i",
  "j",
  "k",
  "l",
  "r",
  "left",
  "right",
  "low",
  "high",
  "mid",
  "start",
  "end",
  "slow",
  "fast",
  "lo",
  "hi",
  "p",
  "q",
];

const WATCH_SCALAR_NAMES = [
  "best",
  "res",
  "result",
  "ans",
  "answer",
  "num",
  "sign",
  "sum",
  "total",
  "count",
  "target",
  "cur",
  "curMax",
  "curMin",
  "maxK",
  "minK",
  "l",
  "r",
  "i",
  "j",
  "distance",
];

const SKIP_VAR_NAMES = new Set([
  "input",
  "calculate",
  "height",
  "nums",
  "s",
  "str",
  "ch",
]);

function isWatchableScalar(key: string, value: unknown): boolean {
  if (key.startsWith("__") || SKIP_VAR_NAMES.has(key)) return false;
  if (value === null || value === undefined) return false;
  const t = typeof value;
  if (t === "function" || t === "object" || t === "symbol") return false;
  if (t === "string") {
    const s = value as string;
    if (s.includes("__trace") || s.includes("__safe")) return false;
    if (s.length > 40) return false;
  }
  return true;
}

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

function applyWindowHighlights(
  arrays: NonNullable<TraceStep["ds"]["arrays"]>,
  event: ExecutionEvent | undefined,
  structures: VizStructure[],
): void {
  if (!event) return;
  const vars = event.variables;
  const left = vars.left ?? vars.start ?? vars.l ?? vars.i;
  const right = vars.right ?? vars.end ?? vars.r ?? vars.j;
  if (typeof left !== "number" || typeof right !== "number" || left > right) {
    return;
  }

  const primary =
    arrays.find((a) => a.id.includes("height") || a.label === "height") ??
    arrays[0];
  if (!primary) return;

  const struct = structures.find((s) => s.kind === "array" && s.id === primary.id);
  if (!struct || struct.kind !== "array") return;

  for (let i = left; i <= right; i++) {
    if (i < 0 || i >= primary.values.length) continue;
    primary.highlights[i] =
      i === left || i === right ? "comparing" : "visited";
  }
}

function structureToArrays(
  scene: VizScene,
  event: ExecutionEvent | undefined,
): TraceStep["ds"]["arrays"] {
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
  applyWindowHighlights(arrays, event, scene.structures);
  return arrays.length ? arrays : undefined;
}

function structureToStacks(
  scene: VizScene,
  event: ExecutionEvent | undefined,
): TraceStep["ds"]["stacks"] {
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

  if (stacks.length === 0 && event) {
    for (const name of ["st", "stack"]) {
      const v = event.variables[name];
      if (!Array.isArray(v)) continue;
      stacks.push({
        id: `stack:${name}`,
        label: name,
        items: v.map((item) =>
          typeof item === "object" ? JSON.stringify(item) : String(item),
        ),
      });
      break;
    }
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

function inferPointersFromVariables(
  scene: VizScene,
  event: ExecutionEvent | undefined,
): PointerSnapshot[] {
  if (!event) return [];
  const arrays = scene.structures.filter((s) => s.kind === "array");
  if (arrays.length === 0) return [];

  const primary =
    arrays.find((a) => a.variable === "height" || a.variable === "nums") ??
    arrays[0]!;
  const out: PointerSnapshot[] = [];

  for (const name of TRACE_POINTER_NAMES) {
    const val = event.variables[name];
    if (typeof val !== "number") continue;
    const idx = val;
    if (idx < 0 || idx >= (primary as { values: unknown[] }).values.length) {
      continue;
    }
    out.push({
      arrayId: primary.id,
      name,
      index: idx,
      color: POINTER_COLORS[name] ?? "#60a5fa",
    });
  }

  return out;
}

function mergePointers(
  ...groups: PointerSnapshot[][]
): PointerSnapshot[] {
  const map = new Map<string, PointerSnapshot>();
  for (const group of groups) {
    for (const p of group) {
      map.set(`${p.arrayId}:${p.name}`, p);
    }
  }
  return [...map.values()];
}

type StringWalkState = { index: number; prevCh?: string };

function stringWalkToDs(
  scene: VizScene,
  event: ExecutionEvent | undefined,
  state: StringWalkState,
): { ds: Partial<TraceStep["ds"]>; state: StringWalkState } {
  const walk = scene.stringWalk;
  if (!walk && event) {
    const vars = event.variables;
    for (const name of ["s", "str"]) {
      const v = vars[name];
      if (typeof v !== "string" || v.length === 0) continue;
      const loopSuffix =
        name === "s" && typeof vars.ch === "string" ? "+" : "";
      const chars = [...(v + loopSuffix)];
      let index = state.index;
      if (typeof vars.ch === "string") {
        const ch = vars.ch as string;
        if (state.prevCh !== undefined && state.prevCh !== ch) {
          index = Math.min(index + 1, chars.length - 1);
        }
        const found = chars.indexOf(ch, index);
        if (found >= 0) index = found;
      }
      index = Math.max(0, Math.min(index, chars.length - 1));
      const nextState: StringWalkState = {
        index,
        prevCh: typeof vars.ch === "string" ? (vars.ch as string) : state.prevCh,
      };
      return {
        state: nextState,
        ds: {
          arrays: [
            {
              id: `string:${name}`,
              label: name,
              values: chars,
              highlights: { [index]: "active" },
            },
          ],
          pointers: [
            {
              arrayId: `string:${name}`,
              name: "ch",
              index,
              color: POINTER_COLORS.ch ?? "#22d3ee",
            },
          ],
        },
      };
    }
  }

  if (!walk) return { ds: {}, state };

  const arrayId = `string:${walk.variable}`;
  return {
    state: {
      index: walk.index,
      prevCh:
        typeof event?.variables.ch === "string"
          ? (event.variables.ch as string)
          : undefined,
    },
    ds: {
      arrays: [
        {
          id: arrayId,
          label: walk.variable,
          values: walk.chars,
          highlights: { [walk.index]: "active" },
        },
      ],
      pointers: [
        {
          arrayId,
          name: "ch",
          index: walk.index,
          color: POINTER_COLORS.ch ?? "#22d3ee",
        },
      ],
    },
  };
}

function buildWatchVariables(
  scene: VizScene,
  event: ExecutionEvent | undefined,
  prev: ExecutionEvent | undefined,
): HashmapSnapshot | undefined {
  const entries: HashmapSnapshot["entries"] = [];
  const seen = new Set<string>();

  const add = (key: string, value: unknown, highlight?: boolean) => {
    if (!isWatchableScalar(key, value) || seen.has(key)) return;
    seen.add(key);
    entries.push({ key, value, highlight });
  };

  if (scene.scalars) {
    for (const [key, value] of Object.entries(scene.scalars)) {
      add(key, value, true);
    }
  }

  if (event) {
    const prevVars = prev?.variables ?? {};
    for (const name of WATCH_SCALAR_NAMES) {
      if (name in event.variables) {
        const v = event.variables[name];
        const changed =
          JSON.stringify(prevVars[name]) !== JSON.stringify(v);
        add(name, v, changed);
      }
    }
    for (const [key, value] of Object.entries(event.variables)) {
      if (WATCH_SCALAR_NAMES.includes(key)) continue;
      const changed =
        JSON.stringify(prevVars[key]) !== JSON.stringify(value);
      if (changed) add(key, value, true);
    }
  }

  if (entries.length === 0) return undefined;
  return { id: "watch", label: "State", entries };
}

function sceneToTraceStep(
  scene: VizScene,
  event: ExecutionEvent | undefined,
  prev: ExecutionEvent | undefined,
  stepIndex: number,
  stringState: StringWalkState,
): { step: TraceStep; stringState: StringWalkState } {
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

  const { ds: stringDs, state: nextStringState } = stringWalkToDs(
    scene,
    event,
    stringState,
  );

  const arrays = [
    ...(stringDs.arrays ?? []),
    ...(structureToArrays(scene, event) ?? []),
  ];

  const pointers = mergePointers(
    stringDs.pointers ?? [],
    pointersFromScene(scene),
    inferPointersFromVariables(scene, event),
  );

  const watch = buildWatchVariables(scene, event, prev);

  return {
    stringState: nextStringState,
    step: {
      line: Math.max(1, scene.line),
      description,
      vars: event?.variables ? { ...event.variables } : {},
      ds: {
        arrays: arrays.length ? arrays : undefined,
        stacks: structureToStacks(scene, event),
        hashmaps: watch ? [watch] : undefined,
        pointers,
      },
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

  let stringState: StringWalkState = { index: 0 };

  return scenes.map((scene, i) => {
    const eventIdx = eventIndices[i];
    const event =
      eventIdx !== undefined ? trace.events[eventIdx] : undefined;
    const prevIdx = i > 0 ? eventIndices[i - 1] : undefined;
    const prev =
      prevIdx !== undefined ? trace.events[prevIdx] : undefined;
    const { step, stringState: next } = sceneToTraceStep(
      scene,
      event,
      prev,
      i,
      stringState,
    );
    stringState = next;
    return step;
  });
}

export function hasOnlyTraceSupportedStructures(
  structures: VizStructure[],
): boolean {
  return !structures.some((s) =>
    ["linkedList", "tree", "graph", "heap"].includes(s.kind),
  );
}
