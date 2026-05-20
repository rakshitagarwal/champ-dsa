import type { LayoutResult } from "@/types/viz-scene";
import type { VizStructure } from "@/types/viz-scene";
import { layoutGraph } from "./graph-layout";
import { layoutLinkedList } from "./list-layout";
import { layoutTree } from "./tree-layout";

const NODE_W = 48;
const NODE_H = 48;
const GAP = 56;

export function layoutStructure(s: VizStructure): LayoutResult {
  switch (s.kind) {
    case "linkedList":
      return layoutLinkedList(s.nodes, s.edges, NODE_W, GAP);
    case "tree":
    case "heap":
      return layoutTree(
        s.nodes.map((n) => ({
          id: n.id,
          leftId: "leftId" in n ? n.leftId : null,
          rightId: "rightId" in n ? n.rightId : null,
        })),
        s.edges,
        NODE_W,
        GAP,
      );
    case "graph":
      return layoutGraph(s.nodes, s.edges, NODE_W, GAP);
    default:
      return {
        nodes: new Map(),
        edges: [],
        bounds: { width: 200, height: 80 },
      };
  }
}

export function layoutArrayWidth(length: number): number {
  return Math.max(120, length * (NODE_W + 8) - 8);
}

export { NODE_W, NODE_H, GAP };
