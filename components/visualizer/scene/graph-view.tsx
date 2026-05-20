"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { layoutStructure } from "@/lib/viz/layout";
import type { PointerBinding, SceneHighlight, VizStructure } from "@/types/viz-scene";
import { EdgeLayer } from "./edge-layer";

type Props = {
  structure: Extract<VizStructure, { kind: "graph" }>;
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
};

export function GraphView({ structure, pointers, highlights }: Props) {
  const layout = layoutStructure(structure);
  const visited = new Set(
    highlights
      .filter((h) => h.type === "visited" && h.structureId === structure.id)
      .flatMap((h) => (h as { nodeIds: string[] }).nodeIds),
  );
  const activeNodes = new Set(
    highlights
      .filter((h) => h.type === "node" && h.structureId === structure.id)
      .map((h) => (h as { nodeId: string }).nodeId),
  );
  const ptrsHere = pointers.filter((p) => p.structureId === structure.id);

  return (
    <div className="py-4">
      <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-primary">
        {structure.label}
      </p>
      <div
        className="relative mx-auto"
        style={{ width: layout.bounds.width, height: layout.bounds.height, minHeight: 100 }}
      >
        <EdgeLayer layout={layout} className="pointer-events-none absolute inset-0 text-primary/40" />
        {structure.nodes.map((node) => {
          const pos = layout.nodes.get(node.id);
          if (!pos) return null;
          const isVisited = visited.has(node.id);
          const isActive =
            activeNodes.has(node.id) ||
            ptrsHere.some((p) => p.nodeId === node.id);

          return (
            <motion.div
              key={node.id}
              layout
              className={cn(
                "absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 font-mono text-xs font-bold",
                isActive && "border-teal-400 bg-teal-500/30 shadow-lg shadow-teal-500/30",
                !isActive && isVisited && "border-primary/50 bg-primary/20",
                !isActive && !isVisited && "border-border bg-card/80",
              )}
              style={{ left: pos.x, top: pos.y }}
            >
              {node.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
