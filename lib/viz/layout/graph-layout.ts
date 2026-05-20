import type { GraphNodeSnap, LayoutResult, VizEdge } from "@/types/viz-scene";

export function layoutGraph(
  nodes: GraphNodeSnap[],
  edges: VizEdge[],
  nodeW: number,
  gap: number,
): LayoutResult {
  const positions = new Map<string, { x: number; y: number }>();

  const isGrid = nodes.every((n) => n.id.includes("_"));
  if (isGrid && nodes.length > 0) {
    const coords = nodes.map((n) => {
      const parts = n.id.replace(/^g/, "").split("_");
      return { id: n.id, r: parseInt(parts[0] ?? "0", 10), c: parseInt(parts[1] ?? "0", 10) };
    });
    const maxR = Math.max(...coords.map((c) => c.r));
    const maxC = Math.max(...coords.map((c) => c.c));
    for (const { id, r, c } of coords) {
      positions.set(id, {
        x: 32 + c * (nodeW + gap),
        y: 32 + r * (nodeW + gap),
      });
    }
    const edgeLines = buildEdgeLines(edges, positions, nodeW);
    return {
      nodes: positions,
      edges: edgeLines,
      bounds: {
        width: 48 + (maxC + 1) * (nodeW + gap),
        height: 48 + (maxR + 1) * (nodeW + gap),
      },
    };
  }

  const adj = new Map<string, string[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push(e.to);
  }

  const layers: string[][] = [];
  const start = nodes[0]?.id;
  if (start) {
    const visited = new Set<string>();
    let frontier = [start];
    while (frontier.length) {
      layers.push(frontier);
      const next: string[] = [];
      for (const id of frontier) {
        visited.add(id);
        for (const nb of adj.get(id) ?? []) {
          if (!visited.has(nb)) next.push(nb);
        }
      }
      frontier = [...new Set(next)];
    }
  }

  if (layers.length === 0) {
    nodes.forEach((n, i) => {
      positions.set(n.id, { x: 32 + i * (nodeW + gap), y: 48 });
    });
  } else {
    layers.forEach((row, depth) => {
      const rowW = row.length * (nodeW + gap);
      const startX = 24 + (nodes.length > 5 ? 0 : 40);
      row.forEach((id, i) => {
        positions.set(id, {
          x: startX + i * (nodeW + gap),
          y: 32 + depth * (nodeW + gap),
        });
      });
    });
  }

  const edgeLines = buildEdgeLines(edges, positions, nodeW);
  const xs = [...positions.values()].map((p) => p.x);
  const ys = [...positions.values()].map((p) => p.y);

  return {
    nodes: positions,
    edges: edgeLines,
    bounds: {
      width: (xs.length ? Math.max(...xs) : 200) + nodeW + 48,
      height: (ys.length ? Math.max(...ys) : 120) + nodeW + 48,
    },
  };
}

function buildEdgeLines(
  edges: VizEdge[],
  positions: Map<string, { x: number; y: number }>,
  nodeW: number,
): LayoutResult["edges"] {
  return edges
    .map((e) => {
      const from = positions.get(e.from);
      const to = positions.get(e.to);
      if (!from || !to) return null;
      return {
        from: e.from,
        to: e.to,
        x1: from.x + nodeW / 2,
        y1: from.y + nodeW / 2,
        x2: to.x + nodeW / 2,
        y2: to.y + nodeW / 2,
      };
    })
    .filter(Boolean) as LayoutResult["edges"];
}
