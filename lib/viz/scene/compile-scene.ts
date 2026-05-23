import { analyzeStepDiff } from "@/lib/viz/analyze-step";
import type {
  ExecutionEvent,
  GraphViz,
  ListNodeViz,
  StepViz,
  TreeNodeViz,
} from "@/types/execution";
import type { VizProfile } from "@/types/viz-profile";
import type {
  PointerBinding,
  SceneHighlight,
  VizEdge,
  VizScene,
  VizStructure,
} from "@/types/viz-scene";

function structId(variable: string): string {
  return `struct:${variable}`;
}

function resolveVarValue(
  vars: Record<string, unknown>,
  name: string,
): unknown {
  const v = vars[name];
  if (v && typeof v === "object") {
    if ("__list" in v) return v;
    if ("__tree" in v) return v;
    if ("__listStructured" in v) return v;
    if ("__treeStructured" in v) return v;
  }
  return v;
}

function buildListStructure(
  variable: string,
  label: string,
  data: ListNodeViz | number[] | undefined,
  flat?: number[],
): VizStructure | null {
  if (data && "nodes" in data && Array.isArray(data.nodes)) {
    const edges: VizEdge[] = [];
    for (const n of data.nodes) {
      if (n.nextId) edges.push({ from: n.id, to: n.nextId });
    }
    return {
      kind: "linkedList",
      id: structId(variable),
      variable,
      label,
      nodes: data.nodes.map((n) => ({
        id: n.id,
        val: n.val,
        nextId: n.nextId,
      })),
      edges,
      rootId: data.nodes[0]?.id ?? null,
    };
  }
  if (flat && flat.length >= 0) {
    const nodes = flat.map((val, i) => ({
      id: `${variable}-n${i}`,
      val,
      nextId: i < flat.length - 1 ? `${variable}-n${i + 1}` : null,
    }));
    const edges: VizEdge[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({ from: nodes[i]!.id, to: nodes[i + 1]!.id });
    }
    return {
      kind: "linkedList",
      id: structId(variable),
      variable,
      label,
      nodes,
      edges,
      rootId: nodes[0]?.id ?? null,
    };
  }
  return null;
}

function buildTreeStructure(
  variable: string,
  label: string,
  structured: TreeNodeViz | undefined,
  level?: (number | null)[],
): VizStructure | null {
  if (structured?.nodes?.length) {
    const edges: VizEdge[] = [];
    for (const n of structured.nodes) {
      if (n.leftId) edges.push({ from: n.id, to: n.leftId });
      if (n.rightId) edges.push({ from: n.id, to: n.rightId });
    }
    return {
      kind: "tree",
      id: structId(variable),
      variable,
      label,
      nodes: structured.nodes.map((n) => ({
        id: n.id,
        val: n.val,
        leftId: n.leftId,
        rightId: n.rightId,
      })),
      edges,
      rootId: structured.rootId,
    };
  }
  if (level?.length) {
    const nodes: TreeNodeViz["nodes"] = [];
    let i = 0;
    let width = 1;
    const ids: (string | null)[][] = [];
    while (i < level.length) {
      const row: (string | null)[] = [];
      for (let j = 0; j < width && i < level.length; j++, i++) {
        const val = level[i];
        if (val === null) row.push(null);
        else row.push(`${variable}-t${i}`);
      }
      ids.push(row);
      width *= 2;
    }
    i = 0;
    width = 1;
    while (i < level.length) {
      for (let j = 0; j < width && i < level.length; j++, i++) {
        const val = level[i];
        if (val === null) continue;
        const id = `${variable}-t${i}`;
        const leftIdx = 2 * i + 1;
        const rightIdx = 2 * i + 2;
        nodes.push({
          id,
          val: val as number,
          leftId:
            leftIdx < level.length && level[leftIdx] !== null
              ? `${variable}-t${leftIdx}`
              : null,
          rightId:
            rightIdx < level.length && level[rightIdx] !== null
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
    return {
      kind: "tree",
      id: structId(variable),
      variable,
      label,
      nodes,
      edges,
      rootId: nodes[0]?.id ?? null,
    };
  }
  return null;
}

function buildHeapStructure(
  variable: string,
  label: string,
  values: unknown[],
): VizStructure {
  const nodes = values.map((val, index) => {
    const id = `${variable}-h${index}`;
    const leftIdx = 2 * index + 1;
    const rightIdx = 2 * index + 2;
    return {
      id,
      val: val as number | string,
      index,
      leftId: leftIdx < values.length ? `${variable}-h${leftIdx}` : null,
      rightId: rightIdx < values.length ? `${variable}-h${rightIdx}` : null,
    };
  });
  const edges: VizEdge[] = [];
  for (const n of nodes) {
    if (n.leftId) edges.push({ from: n.id, to: n.leftId });
    if (n.rightId) edges.push({ from: n.id, to: n.rightId });
  }
  return {
    kind: "heap",
    id: structId(variable),
    variable,
    label,
    nodes,
    edges,
    arrayValues: values,
  };
}

function buildGraphStructure(
  variable: string,
  label: string,
  g: GraphViz,
): VizStructure {
  return {
    kind: "graph",
    id: structId(variable),
    variable,
    label,
    nodes: g.nodes.map((n) => ({ id: n.id, label: n.label, val: n.label })),
    edges: g.edges.map((e) => ({ from: e.from, to: e.to })),
  };
}

function findListNodeIdForRef(
  vars: Record<string, unknown>,
  refName: string,
  structures: VizStructure[],
): string | null {
  const ref = resolveVarValue(vars, refName);
  if (!ref || typeof ref !== "object") return null;

  const structured = ref as {
    __listStructured?: ListNodeViz;
  };
  if (structured.__listStructured?.nodes?.[0]) {
    return structured.__listStructured.nodes[0].id;
  }

  for (const s of structures) {
    if (s.kind === "linkedList" && s.nodes.length) {
      return s.rootId ?? s.nodes[0]!.id;
    }
  }
  return null;
}

function findTreeNodeIdForRef(
  vars: Record<string, unknown>,
  refName: string,
  structures: VizStructure[],
): string | null {
  const ref = resolveVarValue(vars, refName);
  if (!ref || typeof ref !== "object") return null;
  const structured = ref as { __treeStructured?: TreeNodeViz };
  if (structured.__treeStructured?.rootId) {
    return structured.__treeStructured.rootId;
  }
  for (const s of structures) {
    if (s.kind === "tree" && s.rootId) return s.rootId;
    if (s.kind === "heap" && s.nodes[0]) return s.nodes[0].id;
  }
  return null;
}

function buildStructures(
  event: ExecutionEvent,
  profile: VizProfile,
): VizStructure[] {
  const viz = event.viz;
  const vars = event.variables;
  const sorted = [...profile.structures].sort(
    (a, b) => a.priority - b.priority,
  );
  const out: VizStructure[] = [];

  for (const spec of sorted) {
    const label = spec.label ?? spec.variable;
    const v = resolveVarValue(vars, spec.variable);

    switch (spec.kind) {
      case "array": {
        if (Array.isArray(v)) {
          const lower = spec.variable.toLowerCase();
          if (lower === "head" || lower === "list1" || lower === "list2") {
            const list = buildListStructure(spec.variable, label, undefined, v);
            if (list) {
              out.push(list);
              break;
            }
          }
          out.push({
            kind: "array",
            id: structId(spec.variable),
            variable: spec.variable,
            label,
            values: v,
          });
        } else if (v && typeof v === "object" && "__list" in v) {
          const arr = (v as { __list: number[] }).__list;
          out.push({
            kind: "array",
            id: structId(spec.variable),
            variable: spec.variable,
            label,
            values: arr,
          });
        }
        break;
      }
      case "linkedList": {
        const structured = viz?.structuredLists?.[spec.variable];
        const flat = viz?.linkedLists?.[spec.variable];
        const fromVar =
          v && typeof v === "object" && "__listStructured" in v
            ? (v as { __listStructured: ListNodeViz }).__listStructured
            : undefined;
        const list = buildListStructure(
          spec.variable,
          label,
          structured ?? fromVar,
          flat ?? (Array.isArray(v) ? v : undefined),
        );
        if (list) out.push(list);
        break;
      }
      case "tree": {
        const structured = viz?.structuredTrees?.[spec.variable];
        const level = viz?.trees?.[spec.variable];
        const fromVar =
          v && typeof v === "object" && "__treeStructured" in v
            ? (v as { __treeStructured: TreeNodeViz }).__treeStructured
            : undefined;
        const tree = buildTreeStructure(
          spec.variable,
          label,
          structured ?? fromVar,
          level,
        );
        if (tree) out.push(tree);
        break;
      }
      case "heap": {
        const heapVals =
          viz?.heaps?.[spec.variable] ??
          (Array.isArray(v) ? v : undefined);
        if (heapVals) out.push(buildHeapStructure(spec.variable, label, heapVals));
        break;
      }
      case "stack": {
        const stackVals =
          viz?.stacks?.[spec.variable] ??
          (Array.isArray(v) ? v : undefined);
        if (stackVals) {
          out.push({
            kind: "stack",
            id: structId(spec.variable),
            variable: spec.variable,
            label,
            values: stackVals,
          });
        }
        break;
      }
      case "graph": {
        const g = viz?.graphs?.[spec.variable];
        if (g) out.push(buildGraphStructure(spec.variable, label, g));
        break;
      }
    }
  }

  if (out.length === 0) {
    for (const [name, val] of Object.entries(vars)) {
      if (name.startsWith("__") || name === "input") continue;
      if (Array.isArray(val)) {
        out.push({
          kind: "array",
          id: structId(name),
          variable: name,
          label: name,
          values: val,
        });
        break;
      }
    }
  }

  return out;
}

function buildPointers(
  event: ExecutionEvent,
  profile: VizProfile,
  structures: VizStructure[],
): PointerBinding[] {
  const vars = event.variables;
  const bindings: PointerBinding[] = [];

  for (const ptr of profile.pointers) {
    const val = vars[ptr.variable];
    const attachVar = ptr.attachesTo ?? profile.structures[0]?.variable;
    const structure = structures.find(
      (s) => s.variable === attachVar || s.id === structId(attachVar ?? ""),
    );
    if (!structure) continue;

    if (ptr.kind === "arrayIndex" && typeof val === "number") {
      bindings.push({
        name: ptr.variable,
        kind: "arrayIndex",
        structureId: structure.id,
        index: val,
      });
    } else if (ptr.kind === "listNode") {
      let nodeId: string | null = null;
      if (val && typeof val === "object") {
        const structured = val as { __listStructured?: ListNodeViz };
        if (structured.__listStructured?.nodes?.[0]) {
          nodeId = structured.__listStructured.nodes[0].id;
        }
      }
      if (!nodeId) {
        nodeId = findListNodeIdForRef(vars, ptr.variable, structures);
      }
      if (nodeId) {
        bindings.push({
          name: ptr.variable,
          kind: "listNode",
          structureId: structure.id,
          nodeId,
        });
      }
    } else if (ptr.kind === "treeNode") {
      const nodeId = findTreeNodeIdForRef(vars, ptr.variable, structures);
      if (nodeId) {
        bindings.push({
          name: ptr.variable,
          kind: "treeNode",
          structureId: structure.id,
          nodeId,
        });
      }
    } else if (ptr.kind === "graphNode" && typeof val === "number") {
      bindings.push({
        name: ptr.variable,
        kind: "graphNode",
        structureId: structure.id,
        nodeId: `g${val}`,
      });
    }
  }

  if (bindings.length === 0 && event.highlights?.indices?.length) {
    const arrName = event.highlights.array;
    const structure = structures.find((s) => s.variable === arrName);
    if (structure) {
      const seenIdx = new Set<number>();
      for (const idx of event.highlights.indices) {
        if (seenIdx.has(idx)) continue;
        seenIdx.add(idx);
        bindings.push({
          name: `idx${idx}`,
          kind: "arrayIndex",
          structureId: structure.id,
          index: idx,
        });
      }
    }
  }

  const unique = new Map<string, PointerBinding>();
  for (const b of bindings) {
    const key =
      b.kind === "arrayIndex" && b.index !== undefined
        ? `${b.structureId}:${b.index}:${b.name}`
        : `${b.structureId}:${b.name}:${b.nodeId ?? ""}`;
    if (!unique.has(key)) unique.set(key, b);
  }
  return [...unique.values()];
}

function buildHighlights(
  event: ExecutionEvent,
  structures: VizStructure[],
  pointers: PointerBinding[],
): SceneHighlight[] {
  const highlights: SceneHighlight[] = [];

  for (const p of pointers) {
    if (p.kind === "arrayIndex" && p.index !== undefined) {
      highlights.push({
        type: "cell",
        structureId: p.structureId,
        index: p.index,
      });
    } else if (p.nodeId) {
      highlights.push({
        type: "node",
        structureId: p.structureId,
        nodeId: p.nodeId,
      });
    }
  }

  if (event.frameId) {
    highlights.push({ type: "activeFrame", frameId: event.frameId });
  }

  const vars = event.variables;
  for (const name of ["visited", "seen"]) {
    const v = vars[name];
    if (Array.isArray(v)) {
      const g = structures.find((s) => s.kind === "graph");
      if (g) {
        highlights.push({
          type: "visited",
          structureId: g.id,
          nodeIds: v.map((_, i) => `g${i}`),
        });
      }
    }
  }

  const left = vars.left ?? vars.start ?? vars.l ?? vars.i;
  const right = vars.right ?? vars.end ?? vars.r ?? vars.j;
  const arr = structures.find((s) => s.kind === "array");
  if (arr && typeof left === "number" && typeof right === "number" && left <= right) {
    highlights.push({
      type: "window",
      structureId: arr.id,
      left,
      right,
    });
  }

  return highlights;
}

function buildScalars(
  event: ExecutionEvent,
  profile: VizProfile,
): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  for (const h of profile.highlights ?? []) {
    if (h.style !== "scalar") continue;
    const v = event.variables[h.variable];
    if (v !== undefined && typeof v !== "object") {
      out[h.variable] = String(v);
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function buildStringWalk(
  event: ExecutionEvent,
  structures: VizStructure[],
): VizScene["stringWalk"] {
  const hasStack = structures.some((s) => s.kind === "stack");
  if (!hasStack) return undefined;

  const vars = event.variables;
  for (const name of ["s", "str", "chars"]) {
    const v = vars[name];
    if (typeof v !== "string" || v.length === 0) continue;
    const loopSuffix =
      name === "s" && typeof vars.ch === "string" ? "+" : "";
    const chars = [...(v + loopSuffix)];
    let index = 0;
    for (const idxName of ["i", "j", "idx", "index", "k"]) {
      if (typeof vars[idxName] === "number") {
        index = vars[idxName] as number;
        break;
      }
    }
    if (typeof vars.ch === "string") {
      const ch = vars.ch as string;
      const found = chars.indexOf(ch, index);
      index = found >= 0 ? found : index;
    }
    index = Math.max(0, Math.min(index, chars.length - 1));
    return { variable: name, chars, index };
  }
  return undefined;
}

function buildCaption(
  prev: ExecutionEvent | null,
  event: ExecutionEvent,
  structures: VizStructure[],
): string | undefined {
  if (!prev) return undefined;
  const diff = analyzeStepDiff(prev, event);
  const moves = diff.pointerMoves;
  if (moves.length === 1) {
    const m = moves[0]!;
    return `${m.name} → ${m.to}`;
  }
  if (moves.length > 1) {
    return moves.map((m) => `${m.name}→${m.to}`).join(", ");
  }
  if (diff.cellChanges.length === 1) {
    const c = diff.cellChanges[0]!;
    return `${c.arrayName}[${c.index}] = ${c.after}`;
  }

  const stack = structures.find((s) => s.kind === "stack");
  if (stack && stack.kind === "stack") {
    const prevStack = Object.entries(prev.variables).find(
      ([k]) => k === stack.variable || /stack/i.test(k),
    );
    const prevArr = Array.isArray(prevStack?.[1])
      ? (prevStack![1] as unknown[])
      : prev.viz?.stacks?.[stack.variable];
    const curLen = stack.values.length;
    const prevLen = Array.isArray(prevArr) ? prevArr.length : curLen;
    if (curLen > prevLen) return "push to stack";
    if (curLen < prevLen) return "pop from stack";
  }

  return undefined;
}

export function compileScene(
  event: ExecutionEvent,
  profile: VizProfile,
  stepIndex: number,
  previous?: ExecutionEvent | null,
): VizScene {
  const structures = buildStructures(event, profile);
  const pointers = buildPointers(event, profile, structures);
  const highlights = buildHighlights(event, structures, pointers);
  const stringWalk = buildStringWalk(event, structures);

  return {
    stepIndex,
    line: event.line,
    structures,
    pointers,
    highlights,
    scalars: buildScalars(event, profile),
    stringWalk,
    callStack: event.callStack,
    showCallStack:
      profile.showCallStack ??
      event.callStack.length > 1,
    caption: buildCaption(previous ?? null, event, structures),
  };
}

export function compileAllScenes(
  events: ExecutionEvent[],
  profile: VizProfile,
): VizScene[] {
  return events.map((ev, i) =>
    compileScene(ev, profile, i, i > 0 ? events[i - 1]! : null),
  );
}
