import type { VizScene } from "@/types/viz-scene";

export function hashScene(scene: VizScene): string {
  const payload = {
    structures: scene.structures.map((s) => {
      if (s.kind === "array") return { k: s.kind, id: s.id, v: s.values };
      if (s.kind === "stack") return { k: s.kind, id: s.id, v: s.values };
      if (s.kind === "linkedList")
        return { k: s.kind, id: s.id, n: s.nodes, r: s.rootId };
      if (s.kind === "tree" || s.kind === "heap")
        return { k: s.kind, id: s.id, n: s.nodes };
      if (s.kind === "graph")
        return { k: s.kind, id: s.id, n: s.nodes, e: s.edges };
      return { k: "unknown" as const, id: (s as { id: string }).id };
    }),
    pointers: scene.pointers.map((p) => ({
      n: p.name,
      s: p.structureId,
      i: p.index,
      node: p.nodeId,
    })),
    highlights: scene.highlights,
    scalars: scene.scalars,
    stringWalk: scene.stringWalk
      ? { v: scene.stringWalk.variable, i: scene.stringWalk.index }
      : null,
    showCallStack: scene.showCallStack,
    callDepth: scene.callStack?.length ?? 0,
  };
  return JSON.stringify(payload);
}
