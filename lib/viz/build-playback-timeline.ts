import type { ExecutionTrace } from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import type {
  VizScene,
  VizStructure,
  PointerBinding,
  SceneHighlight,
  VizEdge,
  ListNodeSnap,
  TreeNodeSnap,
} from "@/types/viz-scene";
import type { TraceStep } from "@/lib/tracer/types";
import type { PlaybackStep } from "@/lib/viz/playback-step";
import { compactTimeline } from "@/lib/viz/scene/compact-steps";
import { getManualTracerMeta } from "@/lib/tracer/manual/registry";

function describeStep(scene: VizScene, index: number): string {
  return (
    scene.caption ??
    (scene.line > 0 ? `line ${scene.line}` : `step ${index + 1}`)
  );
}

function levelOrderToTreeNodes(
  variable: string,
  levelOrder: (number | null)[],
): { nodes: TreeNodeSnap[]; edges: VizEdge[]; rootId: string | null } {
  const nodes: TreeNodeSnap[] = [];
  let i = 0;
  let width = 1;
  while (i < levelOrder.length) {
    for (let j = 0; j < width && i < levelOrder.length; j++, i++) {
      const val = levelOrder[i];
      if (val === null) continue;
      const id = `${variable}-t${i}`;
      const leftIdx = 2 * i + 1;
      const rightIdx = 2 * i + 2;
      nodes.push({
        id,
        val,
        leftId:
          leftIdx < levelOrder.length && levelOrder[leftIdx] !== null
            ? `${variable}-t${leftIdx}`
            : null,
        rightId:
          rightIdx < levelOrder.length && levelOrder[rightIdx] !== null
            ? `${variable}-t${rightIdx}`
            : null,
      });
    }
    width *= 2;
  }
  const edges: VizEdge[] = [];
  for (const n of nodes) {
    if (n.leftId) edges.push({ from: n.id, to: n.leftId });
    if (n.rightId) edges.push({ from: n.id, to: n.rightId });
  }
  return { nodes, edges, rootId: nodes[0]?.id ?? null };
}

function valuesToLinkedList(
  id: string,
  label: string,
  values: (number | string)[],
): Extract<VizStructure, { kind: "linkedList" }> {
  const nodes: ListNodeSnap[] = values.map((val, i) => ({
    id: `${id}-n${i}`,
    val,
    nextId: i < values.length - 1 ? `${id}-n${i + 1}` : null,
  }));
  const edges: VizEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({ from: nodes[i]!.id, to: nodes[i + 1]!.id });
  }
  return {
    kind: "linkedList",
    id,
    variable: label,
    label,
    nodes,
    edges,
    rootId: nodes[0]?.id ?? null,
  };
}

export function traceStepToScene(step: TraceStep, stepIndex: number): VizScene {
  const structures: VizStructure[] = [];
  const pointers: PointerBinding[] = [];
  const highlights: SceneHighlight[] = [];

  for (const list of step.ds.linkedLists ?? []) {
    const structure = valuesToLinkedList(list.id, list.label, list.values);
    structures.push(structure);
    for (const idx of list.highlightedNodeIndices ?? []) {
      const nodeId = `${list.id}-n${idx}`;
      highlights.push({
        type: "node",
        structureId: list.id,
        nodeId,
      });
    }
    for (const ptr of step.ds.listPointers ?? []) {
      if (ptr.listId === list.id) {
        pointers.push({
          name: ptr.name,
          kind: "listNode",
          structureId: list.id,
          nodeId: `${list.id}-n${ptr.nodeIndex}`,
        });
      }
    }
  }

  for (const tree of step.ds.trees ?? []) {
    const built = levelOrderToTreeNodes(tree.id, tree.levelOrder);
    structures.push({
      kind: "tree",
      id: tree.id,
      variable: tree.label,
      label: tree.label,
      nodes: built.nodes,
      edges: built.edges,
      rootId: built.rootId,
    });
    for (const nodeId of tree.highlightedNodeIds ?? []) {
      highlights.push({
        type: "node",
        structureId: tree.id,
        nodeId,
      });
    }
    for (const ptr of step.ds.treePointers ?? []) {
      if (ptr.treeId === tree.id) {
        pointers.push({
          name: ptr.name,
          kind: "treeNode",
          structureId: tree.id,
          nodeId: ptr.nodeId,
        });
      }
    }
  }

  for (const graph of step.ds.graphs ?? []) {
    structures.push({
      kind: "graph",
      id: graph.id,
      variable: graph.label,
      label: graph.label,
      nodes: graph.nodes.map((n) => ({
        id: n.id,
        label: n.label,
        val: n.val ?? n.label,
      })),
      edges: graph.edges.map((e) => ({ from: e.from, to: e.to })),
    });
    if (graph.visitedNodeIds?.length) {
      highlights.push({
        type: "visited",
        structureId: graph.id,
        nodeIds: graph.visitedNodeIds,
      });
    }
    if (graph.activeNodeId) {
      highlights.push({
        type: "node",
        structureId: graph.id,
        nodeId: graph.activeNodeId,
      });
    }
  }

  for (const arr of step.ds.arrays ?? []) {
    structures.push({
      kind: "array",
      id: arr.id,
      variable: arr.label,
      label: arr.label,
      values: arr.values,
    });
    for (const [idx, kind] of Object.entries(arr.highlights)) {
      if (kind) {
        highlights.push({
          type: "cell",
          structureId: arr.id,
          index: Number(idx),
        });
      }
    }
    for (const ptr of step.ds.pointers ?? []) {
      if (ptr.arrayId === arr.id) {
        pointers.push({
          name: ptr.name,
          kind: "arrayIndex",
          structureId: arr.id,
          index: ptr.index,
        });
      }
    }
  }

  for (const stk of step.ds.stacks ?? []) {
    structures.push({
      kind: "stack",
      id: stk.id,
      variable: stk.label,
      label: stk.label,
      values: stk.items,
    });
  }

  const scalars: Record<string, string> = {};
  for (const hm of step.ds.hashmaps ?? []) {
    for (const e of hm.entries) {
      scalars[e.key] = String(e.value);
    }
  }
  for (const [k, v] of Object.entries(step.vars)) {
    if (typeof v === "number" || typeof v === "string") {
      scalars[k] = String(v);
    }
  }

  return {
    stepIndex,
    line: step.line,
    structures,
    pointers,
    highlights,
    scalars: Object.keys(scalars).length ? scalars : undefined,
    showCallStack: false,
    caption: step.description,
  };
}

export function buildPlaybackTimeline(opts: {
  trace: ExecutionTrace | null;
  profile: VizProfile | null;
  curated?: boolean;
  questionId?: string | null;
  patternSlug?: string | null;
  sampleRaw?: string | null;
  manualSteps?: TraceStep[];
}): PlaybackStep[] {
  if (opts.manualSteps && opts.manualSteps.length > 0) {
    return opts.manualSteps.map((step, i) => ({
      line: step.line,
      description: step.description,
      scene: traceStepToScene(step, i),
    }));
  }

  const manual =
    opts.questionId || opts.patternSlug
      ? getManualTracerMeta(opts.questionId ?? "", opts.patternSlug)
      : null;
  if (manual && opts.sampleRaw !== undefined) {
    const input = manual.parseInput(opts.sampleRaw);
    const steps = manual.tracer(input);
    if (steps.length > 0) {
      return steps.map((step, i) => ({
        line: step.line,
        description: step.description,
        scene: traceStepToScene(step, i),
      }));
    }
  }

  if (!opts.trace || !opts.profile || opts.trace.events.length === 0) {
    return [];
  }

  const { scenes, eventIndices } = compactTimeline(
    opts.trace.events,
    opts.profile,
    { curated: opts.curated ?? true, maxSteps: 200 },
  );

  return scenes.map((scene, i) => ({
    line: Math.max(1, scene.line),
    description: describeStep(scene, i),
    scene: { ...scene, stepIndex: i },
    eventIndex: eventIndices[i],
  }));
}

export function playbackStepsToCompat(
  steps: PlaybackStep[],
): {
  compactedScenes: VizScene[];
  compactedEventIndices: number[];
} {
  return {
    compactedScenes: steps.map((s) => s.scene),
    compactedEventIndices: steps.map((s, i) => s.eventIndex ?? i),
  };
}
