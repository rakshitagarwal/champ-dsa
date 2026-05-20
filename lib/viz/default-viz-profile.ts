import type { ExecutionTrace } from "@/types/execution";
import type {
  PointerKind,
  StructureKind,
  TraceSummary,
  VizProfile,
} from "@/types/viz-profile";

const POINTER_NAMES = [
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
  "prev",
  "cur",
  "node",
  "curr",
  "head",
  "tail",
  "dummy",
  "p",
  "q",
  "front",
  "rear",
];

const LIST_NODE_NAMES = new Set([
  "head",
  "tail",
  "dummy",
  "slow",
  "fast",
  "prev",
  "cur",
  "curr",
  "node",
  "l1",
  "l2",
  "list1",
  "list2",
]);

function inferStructureKind(
  name: string,
  value: unknown,
  patternName?: string | null,
): StructureKind | null {
  const lower = name.toLowerCase();
  const p = patternName?.toLowerCase() ?? "";

  if (value && typeof value === "object" && "__list" in (value as object)) {
    return "linkedList";
  }
  if (value && typeof value === "object" && "__tree" in (value as object)) {
    return "tree";
  }

  if (typeof value === "string" && value.length > 0 && value.length < 200) {
    if (lower === "s" || lower === "str" || /string/i.test(name)) return null;
  }

  if (Array.isArray(value)) {
    if (lower === "heap" || /heap/i.test(name)) return "heap";
    if (lower === "stack" || lower === "st" || /stack/i.test(name)) return "stack";
    if (
      lower === "graph" ||
      lower === "adjlist" ||
      lower === "adjacency" ||
      lower === "grid" ||
      /graph/i.test(name)
    ) {
      return "graph";
    }
    if (
      lower === "head" ||
      lower === "list1" ||
      lower === "list2" ||
      lower === "l1" ||
      lower === "l2" ||
      p.includes("linked")
    ) {
      return "linkedList";
    }
    if (p.includes("tree") || p.includes("bst")) return "tree";
    return "array";
  }

  return null;
}

function inferPointerKind(
  name: string,
  vars: Record<string, unknown>,
  structures: VizProfile["structures"],
): PointerKind {
  const attach = structures.find(
    (s) => s.variable === name || s.kind === "linkedList",
  );
  if (LIST_NODE_NAMES.has(name)) {
    const listStruct = structures.find((s) => s.kind === "linkedList");
    if (listStruct) return "listNode";
  }
  const v = vars[name];
  if (v && typeof v === "object" && ("__list" in v || "__tree" in v)) {
    if ("__list" in v) return "listNode";
    if ("__tree" in v) return "treeNode";
  }
  if (attach?.kind === "graph") return "graphNode";
  if (attach?.kind === "tree") return "treeNode";
  return "arrayIndex";
}

export function buildTraceSummary(trace: ExecutionTrace): TraceSummary {
  const names = new Set<string>();
  const fnNames = new Set<string>();
  for (const ev of trace.events) {
    for (const k of Object.keys(ev.variables)) {
      if (!k.startsWith("__") && k !== "input") names.add(k);
    }
    for (const f of ev.callStack) fnNames.add(f.name);
  }

  const indices = [0, Math.floor(trace.events.length / 2), trace.events.length - 1]
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter((i) => i >= 0 && i < trace.events.length);

  const sampleSteps = indices.map((stepIndex) => {
    const ev = trace.events[stepIndex]!;
    return {
      stepIndex,
      line: ev.line,
      type: ev.type,
      variableKeys: Object.keys(ev.variables).filter(
        (k) => !k.startsWith("__") && k !== "input",
      ),
      viz: ev.viz,
    };
  });

  return {
    variableNames: [...names],
    functionNames: [...fnNames],
    sampleSteps,
    totalSteps: trace.events.length,
  };
}

export function buildDefaultVizProfile(
  trace: ExecutionTrace,
  patternName?: string | null,
): VizProfile {
  const summary = buildTraceSummary(trace);
  const last =
    trace.events[trace.events.length - 1] ?? trace.events[0];
  const vars = last?.variables ?? {};

  const structures: VizProfile["structures"] = [];
  let priority = 0;

  for (const name of summary.variableNames) {
    const kind = inferStructureKind(name, vars[name], patternName);
    if (!kind) continue;
    structures.push({
      variable: name,
      kind,
      label: name,
      priority: priority++,
    });
  }

  structures.sort((a, b) => a.priority - b.priority);

  if (structures.length === 0) {
    for (const [name, val] of Object.entries(vars)) {
      if (Array.isArray(val)) {
        structures.push({
          variable: name,
          kind: "array",
          label: name,
          priority: priority++,
        });
      }
    }
  }

  const pointers: VizProfile["pointers"] = [];
  const arrayStruct =
    structures.find((s) => s.kind === "array") ?? structures[0];

  for (const name of POINTER_NAMES) {
    if (!(name in vars)) continue;
    const val = vars[name];
    if (typeof val !== "number" && typeof val !== "object") continue;
    pointers.push({
      variable: name,
      kind: inferPointerKind(name, vars, structures),
      attachesTo:
        LIST_NODE_NAMES.has(name)
          ? structures.find((s) => s.kind === "linkedList")?.variable
          : arrayStruct?.variable,
    });
  }

  const highlights: VizProfile["highlights"] = [];
  const scalarNames = [
    "sum",
    "distance",
    "count",
    "ans",
    "result",
    "target",
    "best",
    "res",
    "num",
    "sign",
    "cur",
    "curMax",
    "curMin",
    "maxK",
    "minK",
    "total",
    "answer",
  ];
  for (const name of scalarNames) {
    if (name in vars && typeof vars[name] !== "object") {
      highlights.push({ variable: name, style: "scalar" });
    }
  }

  const p = patternName?.toLowerCase() ?? "";
  const showCallStack =
    p.includes("tree") ||
    p.includes("recursion") ||
    p.includes("dfs") ||
    trace.events.some((e) => e.callStack.length > 1);

  const hasStack = structures.some((s) => s.kind === "stack");
  if (hasStack) {
    for (const name of ["s", "str", "chars"]) {
      const v = vars[name];
      if (typeof v === "string" && v.length > 0) {
        if (!structures.some((s) => s.variable === name)) {
          /* string rendered via stringWalk, not as structure */
        }
        for (const idxName of ["i", "j", "idx", "index"]) {
          if (typeof vars[idxName] === "number" && !pointers.some((p) => p.variable === idxName)) {
            pointers.push({
              variable: idxName,
              kind: "arrayIndex",
              attachesTo: structures.find((s) => s.kind === "stack")?.variable,
            });
          }
        }
        break;
      }
    }
  }

  return {
    version: 1,
    structures,
    pointers,
    highlights: highlights.length ? highlights : undefined,
    showCallStack,
    compaction: "aggressive",
  };
}

export function sanitizeVizProfile(
  profile: VizProfile,
  allowedNames: Set<string>,
): VizProfile {
  return {
    ...profile,
    version: 1,
    structures: profile.structures
      .filter((s) => allowedNames.has(s.variable))
      .map((s, i) => ({ ...s, priority: i })),
    pointers: profile.pointers.filter((p) => allowedNames.has(p.variable)),
    highlights: profile.highlights?.filter((h) =>
      allowedNames.has(h.variable),
    ),
  };
}
