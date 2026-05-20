import type { ExecutionEvent } from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import type { VizScene } from "@/types/viz-scene";
import { compileScene } from "./compile-scene";
import { hashScene } from "./hash-scene";

export type CompactedTimeline = {
  scenes: VizScene[];
  /** Maps playback index → raw trace event index */
  eventIndices: number[];
};

export type CompactOptions = {
  /** Curated solution run — keep pointer/stack/list pedagogical steps */
  curated?: boolean;
};

const ALWAYS_KEEP_TYPES = new Set([
  "enter",
  "return",
  "throw",
  "loop",
  "condition",
  "branch",
]);

function pointerKey(scene: VizScene): string {
  return scene.pointers
    .map((p) => `${p.name}@${p.index ?? p.nodeId ?? ""}`)
    .sort()
    .join("|");
}

function stackSignature(scene: VizScene): string {
  const stack = scene.structures.find((s) => s.kind === "stack");
  if (!stack || stack.kind !== "stack") return "";
  return `stack:${stack.values.length}`;
}

function variablesSignature(vars: Record<string, unknown>): string {
  const entries = Object.entries(vars)
    .filter(([k]) => !k.startsWith("__"))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${JSON.stringify(v)}`);
  return entries.join("|");
}

function hasPedagogicalChange(
  prev: VizScene,
  next: VizScene,
  prevVars: Record<string, unknown>,
  nextVars: Record<string, unknown>,
): boolean {
  if (variablesSignature(prevVars) !== variablesSignature(nextVars)) return true;
  if (pointerKey(prev) !== pointerKey(next)) return true;
  if (stackSignature(prev) !== stackSignature(next)) return true;

  const prevCells = new Set(
    prev.highlights
      .filter((h) => h.type === "cell")
      .map((h) => `${(h as { index: number }).index}`),
  );
  const nextCells = new Set(
    next.highlights
      .filter((h) => h.type === "cell")
      .map((h) => `${(h as { index: number }).index}`),
  );
  if (prevCells.size !== nextCells.size) return true;
  for (const c of nextCells) if (!prevCells.has(c)) return true;

  const prevNodes = new Set(
    prev.highlights
      .filter((h) => h.type === "node")
      .map((h) => (h as { nodeId: string }).nodeId),
  );
  const nextNodes = new Set(
    next.highlights
      .filter((h) => h.type === "node")
      .map((h) => (h as { nodeId: string }).nodeId),
  );
  if (prevNodes.size !== nextNodes.size) return true;
  for (const n of nextNodes) if (!prevNodes.has(n)) return true;

  return false;
}

export function compactTimeline(
  events: ExecutionEvent[],
  profile: VizProfile,
  options?: CompactOptions,
): CompactedTimeline {
  const aggressive = profile.compaction !== "normal";
  const curated = options?.curated ?? false;
  const scenes: VizScene[] = [];
  const eventIndices: number[] = [];
  let prevHash = "";
  let prevScene: VizScene | null = null;

  for (let i = 0; i < events.length; i++) {
    const ev = events[i]!;
    const prevEv = i > 0 ? events[i - 1]! : null;
    const scene = compileScene(ev, profile, i, prevEv);
    const h = hashScene(scene);
    const prevVars = i > 0 ? events[i - 1]!.variables : {};
    const pedagogical =
      curated && prevScene
        ? hasPedagogicalChange(prevScene, scene, prevVars, ev.variables)
        : false;

    const keep =
      !aggressive ||
      ALWAYS_KEEP_TYPES.has(ev.type) ||
      h !== prevHash ||
      pedagogical ||
      i === 0 ||
      i === events.length - 1;

    if (keep) {
      scenes.push(scene);
      eventIndices.push(i);
      prevHash = h;
      prevScene = scene;
    }
  }

  if (scenes.length === 0 && events.length > 0) {
    const last = events.length - 1;
    scenes.push(compileScene(events[last]!, profile, last));
    eventIndices.push(last);
  }

  return { scenes, eventIndices };
}
