import type { VizScene, VizStructure } from "@/types/viz-scene";
import { analyzeStepDiff } from "@/lib/viz/analyze-step";
import type { ExecutionEvent } from "@/types/execution";

export type SceneStepDiff = {
  changedArrayCells: Map<string, Set<number>>;
  changedListNodeIds: Set<string>;
  changedTreeNodeIds: Set<string>;
  changedGraphNodeIds: Set<string>;
  stackAction: "push" | "pop" | null;
  changedScalarKeys: Set<string>;
  pointerMoves: { name: string; from: number | null; to: number }[];
};

function structureValuesKey(s: VizStructure): string {
  switch (s.kind) {
    case "array":
    case "stack":
      return JSON.stringify(s.values);
    case "linkedList":
      return JSON.stringify(s.nodes.map((n) => [n.id, n.val, n.nextId]));
    case "tree":
    case "heap":
    case "graph":
      return JSON.stringify(s.nodes);
    default:
      return "";
  }
}

export function diffScenes(
  prev: VizScene | null,
  next: VizScene | null,
  prevEvent?: ExecutionEvent | null,
  nextEvent?: ExecutionEvent | null,
): SceneStepDiff {
  const empty: SceneStepDiff = {
    changedArrayCells: new Map(),
    changedListNodeIds: new Set(),
    changedTreeNodeIds: new Set(),
    changedGraphNodeIds: new Set(),
    stackAction: null,
    changedScalarKeys: new Set(),
    pointerMoves: [],
  };

  if (!next) return empty;

  if (prevEvent && nextEvent) {
    const d = analyzeStepDiff(prevEvent, nextEvent);
    empty.pointerMoves = d.pointerMoves;
    for (const c of d.cellChanges) {
      const struct = next.structures.find(
        (s) => s.kind === "array" && s.variable === c.arrayName,
      );
      if (struct) {
        let set = empty.changedArrayCells.get(struct.id);
        if (!set) {
          set = new Set();
          empty.changedArrayCells.set(struct.id, set);
        }
        set.add(c.index);
      }
    }
    for (const v of d.changedVars) {
      empty.changedScalarKeys.add(v.key);
    }
  }

  if (!prev) return empty;

  const prevStacks = prev.structures.filter((s) => s.kind === "stack");
  const nextStacks = next.structures.filter((s) => s.kind === "stack");
  if (prevStacks[0]?.kind === "stack" && nextStacks[0]?.kind === "stack") {
    const pl = prevStacks[0].values.length;
    const nl = nextStacks[0].values.length;
    if (nl > pl) empty.stackAction = "push";
    else if (nl < pl) empty.stackAction = "pop";
  }

  for (const ns of next.structures) {
    const ps = prev.structures.find((s) => s.id === ns.id);
    if (!ps || ps.kind !== ns.kind) continue;
    if (structureValuesKey(ps) === structureValuesKey(ns)) continue;

    if (ns.kind === "array") {
      const set = new Set<number>();
      const max = Math.max(ps.values.length, ns.values.length);
      for (let i = 0; i < max; i++) {
        if (JSON.stringify(ps.values[i]) !== JSON.stringify(ns.values[i])) {
          set.add(i);
        }
      }
      if (set.size) empty.changedArrayCells.set(ns.id, set);
    }

    if (ns.kind === "linkedList") {
      const prevMap = new Map(ps.nodes.map((n) => [n.id, n.val]));
      for (const n of ns.nodes) {
        if (prevMap.get(n.id) !== n.val) empty.changedListNodeIds.add(n.id);
        if (!prevMap.has(n.id)) empty.changedListNodeIds.add(n.id);
      }
      for (const n of ps.nodes) {
        if (!ns.nodes.some((x) => x.id === n.id)) empty.changedListNodeIds.add(n.id);
      }
    }

    if (ns.kind === "tree" || ns.kind === "heap") {
      const prevMap = new Map(ps.nodes.map((n) => [n.id, n.val]));
      for (const n of ns.nodes) {
        if (prevMap.get(n.id) !== n.val) {
          if (ns.kind === "tree") empty.changedTreeNodeIds.add(n.id);
          else empty.changedTreeNodeIds.add(n.id);
        }
      }
    }

    if (ns.kind === "graph") {
      const prevMap = new Map(ps.nodes.map((n) => [n.id, n.label]));
      for (const n of ns.nodes) {
        if (prevMap.get(n.id) !== n.label) empty.changedGraphNodeIds.add(n.id);
      }
    }
  }

  if (prev.pointers.length !== next.pointers.length) {
    for (const p of next.pointers) {
      if (p.nodeId) {
        if (p.kind === "listNode") empty.changedListNodeIds.add(p.nodeId);
        if (p.kind === "treeNode") empty.changedTreeNodeIds.add(p.nodeId);
        if (p.kind === "graphNode") empty.changedGraphNodeIds.add(p.nodeId);
      }
    }
  }

  return empty;
}
