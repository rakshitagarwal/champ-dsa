"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { layoutStructure } from "@/lib/viz/layout";
import type { PointerBinding, SceneHighlight, VizStructure } from "@/types/viz-scene";
import { EdgeLayer } from "./edge-layer";

type Props = {
  structure: Extract<VizStructure, { kind: "tree" }>;
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
};

export function TreeView({ structure, pointers, highlights }: Props) {
  const layout = layoutStructure(structure);
  const ptrsHere = pointers.filter((p) => p.structureId === structure.id);
  const activeNodes = new Set(
    highlights
      .filter((h) => h.type === "node" && h.structureId === structure.id)
      .map((h) => (h as { nodeId: string }).nodeId),
  );

  return (
    <div className="py-4">
      <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-primary">
        {structure.label}
      </p>
      <div
        className="relative mx-auto overflow-visible"
        style={{ width: layout.bounds.width, height: layout.bounds.height, minHeight: 120 }}
      >
        <EdgeLayer layout={layout} className="pointer-events-none absolute inset-0 text-emerald-500/50" />
        {structure.nodes.map((node) => {
          const pos = layout.nodes.get(node.id);
          if (!pos) return null;
          const pointerHere = ptrsHere.filter((p) => p.nodeId === node.id);
          const isActive = activeNodes.has(node.id) || pointerHere.length > 0;

          return (
            <motion.div
              key={node.id}
              layout
              layoutId={`tree-${structure.id}-${node.id}`}
              className={cn(
                "absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-sm font-bold",
                isActive
                  ? "border-teal-400 bg-teal-500/30 shadow-lg shadow-teal-500/50 ring-2 ring-teal-400/30"
                  : "border-emerald-500/40 bg-emerald-500/15",
              )}
              style={{ left: pos.x, top: pos.y }}
            >
              {node.val}
              {pointerHere.map((p) => (
                <span
                  key={p.name}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-500 px-1.5 py-px text-[9px] font-bold text-teal-950"
                >
                  {p.name}
                </span>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
