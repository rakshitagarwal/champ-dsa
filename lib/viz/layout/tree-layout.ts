import type { LayoutResult } from "@/types/viz-scene";
import type { VizEdge } from "@/types/viz-scene";

type TreeNode = {
  id: string;
  leftId: string | null;
  rightId: string | null;
};

export function layoutTree(
  nodes: TreeNode[],
  edges: VizEdge[],
  nodeW: number,
  gap: number,
): LayoutResult {
  const positions = new Map<string, { x: number; y: number }>();
  if (nodes.length === 0) {
    return { nodes: positions, edges: [], bounds: { width: 200, height: 120 } };
  }

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const targets = new Set<string>();
  for (const n of nodes) {
    if (n.leftId) targets.add(n.leftId);
    if (n.rightId) targets.add(n.rightId);
  }
  const root = nodes.find((n) => !targets.has(n.id)) ?? nodes[0]!;

  const levels: string[][] = [];
  const queue: { id: string; depth: number }[] = [{ id: root.id, depth: 0 }];
  const seen = new Set<string>();

  while (queue.length) {
    const { id, depth } = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    if (!levels[depth]) levels[depth] = [];
    levels[depth]!.push(id);
    const node = byId.get(id);
    if (!node) continue;
    if (node.leftId && !seen.has(node.leftId)) {
      queue.push({ id: node.leftId, depth: depth + 1 });
    }
    if (node.rightId && !seen.has(node.rightId)) {
      queue.push({ id: node.rightId, depth: depth + 1 });
    }
  }

  const levelHeight = nodeW + gap;
  let maxWidth = 0;

  levels.forEach((row, depth) => {
    const rowWidth = row.length * (nodeW + gap);
    maxWidth = Math.max(maxWidth, rowWidth);
    const startX = (maxWidth - rowWidth) / 2 + nodeW / 2;
    row.forEach((id, i) => {
      positions.set(id, {
        x: startX + i * (nodeW + gap),
        y: 24 + depth * levelHeight,
      });
    });
  });

  const edgeLines = edges
    .map((e) => {
      const from = positions.get(e.from);
      const to = positions.get(e.to);
      if (!from || !to) return null;
      return {
        from: e.from,
        to: e.to,
        x1: from.x,
        y1: from.y + nodeW / 2,
        x2: to.x,
        y2: to.y - nodeW / 2,
      };
    })
    .filter(Boolean) as LayoutResult["edges"];

  const height = 24 + levels.length * levelHeight + nodeW;
  return {
    nodes: positions,
    edges: edgeLines,
    bounds: { width: Math.max(maxWidth + 48, 200), height },
  };
}
