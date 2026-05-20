import type { ExecutionEvent, StepViz } from "@/types/execution";

export type VizMode = "array" | "linkedList" | "stack" | "tree" | "none";

export function pickVizMode(
  event: ExecutionEvent | null,
  patternName?: string | null,
): VizMode {
  if (!event) return "none";

  const viz = event.viz;
  if (viz?.linkedLists && Object.keys(viz.linkedLists).length > 0) {
    return "linkedList";
  }
  if (viz?.stacks && Object.keys(viz.stacks).length > 0) {
    return "stack";
  }
  if (viz?.trees && Object.keys(viz.trees).length > 0) {
    return "tree";
  }

  const p = patternName?.toLowerCase() ?? "";
  if (p.includes("linked")) return "linkedList";
  if (p.includes("tree") || p.includes("bst")) return "tree";
  if (p.includes("stack")) return "stack";

  for (const val of Object.values(event.variables)) {
    if (Array.isArray(val)) return "array";
  }

  return "none";
}

export function getPrimaryLinkedLists(
  viz?: StepViz,
): { name: string; values: number[] }[] {
  if (!viz?.linkedLists) return [];
  return Object.entries(viz.linkedLists).map(([name, values]) => ({
    name,
    values,
  }));
}

export function getPrimaryStack(
  viz?: StepViz,
): { name: string; values: unknown[] } | null {
  if (!viz?.stacks) return null;
  const entries = Object.entries(viz.stacks);
  if (entries.length === 0) return null;
  const [name, values] = entries[0]!;
  return { name, values };
}

export function getPrimaryTree(
  viz?: StepViz,
): { name: string; values: (number | null)[] } | null {
  if (!viz?.trees) return null;
  const entries = Object.entries(viz.trees);
  if (entries.length === 0) return null;
  const [name, values] = entries[0]!;
  return { name, values };
}
