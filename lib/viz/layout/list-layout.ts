import type { LayoutResult } from "@/types/viz-scene";
import type { ListNodeSnap, VizEdge } from "@/types/viz-scene";

export function layoutLinkedList(
  nodes: ListNodeSnap[],
  edges: VizEdge[],
  nodeW: number,
  gap: number,
): LayoutResult {
  const positions = new Map<string, { x: number; y: number }>();
  const order = topologicalOrder(nodes, edges);
  const y = 40;
  order.forEach((id, i) => {
    positions.set(id, { x: 24 + i * (nodeW + gap), y });
  });

  const edgeLines = edges
    .map((e) => {
      const from = positions.get(e.from);
      const to = positions.get(e.to);
      if (!from || !to) return null;
      return {
        from: e.from,
        to: e.to,
        x1: from.x + nodeW / 2,
        y1: from.y,
        x2: to.x - nodeW / 2,
        y2: to.y,
      };
    })
    .filter(Boolean) as LayoutResult["edges"];

  const maxX =
    order.length > 0
      ? 24 + (order.length - 1) * (nodeW + gap) + nodeW + 48
      : 200;

  return {
    nodes: positions,
    edges: edgeLines,
    bounds: { width: maxX, height: y + nodeW + 40 },
  };
}

function topologicalOrder(
  nodes: ListNodeSnap[],
  edges: VizEdge[],
): string[] {
  const idSet = new Set(nodes.map((n) => n.id));
  const nextMap = new Map<string, string>();
  for (const e of edges) nextMap.set(e.from, e.to);
  const targets = new Set(edges.map((e) => e.to));
  const heads = nodes.filter((n) => !targets.has(n.id)).map((n) => n.id);
  const start = heads[0] ?? nodes[0]?.id;
  if (!start) return nodes.map((n) => n.id);

  const order: string[] = [];
  let cur: string | null = start;
  const seen = new Set<string>();
  while (cur && idSet.has(cur) && !seen.has(cur)) {
    seen.add(cur);
    order.push(cur);
    cur = nextMap.get(cur) ?? null;
  }
  for (const n of nodes) {
    if (!seen.has(n.id)) order.push(n.id);
  }
  return order;
}
