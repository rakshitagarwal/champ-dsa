"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { layoutStructure } from "@/lib/viz/layout";
import type { PointerBinding, SceneHighlight, VizStructure } from "@/types/viz-scene";
import { EdgeLayer } from "./edge-layer";

type Props = {
  structure: Extract<VizStructure, { kind: "linkedList" }>;
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
};

export function LinkedListView({ structure, pointers, highlights }: Props) {
  const layout = layoutStructure(structure);
  const ptrsHere = pointers.filter((p) => p.structureId === structure.id);
  const activeNodes = new Set(
    highlights
      .filter((h) => h.type === "node" && h.structureId === structure.id)
      .map((h) => (h as { nodeId: string }).nodeId),
  );

  return (
    <div className="py-4">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-primary">
        {structure.label}
      </p>
      <div
        className="relative mx-auto"
        style={{ width: layout.bounds.width, height: layout.bounds.height, minHeight: 100 }}
      >
        <EdgeLayer layout={layout} className="pointer-events-none absolute inset-0 text-primary/60" />
        {structure.nodes.map((node) => {
          const pos = layout.nodes.get(node.id);
          if (!pos) return null;
          const pointerHere = ptrsHere.filter((p) => p.nodeId === node.id);
          const isActive = activeNodes.has(node.id) || pointerHere.length > 0;

          return (
            <div
              key={node.id}
              className="absolute flex flex-col items-center"
              style={{
                left: pos.x - 24,
                top: pos.y - 24,
                width: 48,
              }}
            >
              <div className="mb-1 flex min-h-[22px] justify-center gap-0.5">
                <AnimatePresence mode="popLayout">
                  {pointerHere.map((p) => (
                    <motion.span
                      key={p.name}
                      layoutId={`ptr-${structure.id}-${p.name}`}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-full bg-teal-500 px-1.5 py-px text-[9px] font-bold text-teal-950"
                    >
                      {p.name}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <motion.div
                layout
                layoutId={`node-${structure.id}-${node.id}`}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-sm font-bold",
                  isActive
                    ? "border-teal-400 bg-teal-500/25 text-foreground shadow-lg shadow-teal-500/40"
                    : "border-primary/40 bg-primary/10 text-foreground",
                )}
              >
                {node.val}
              </motion.div>
            </div>
          );
        })}
        <span
          className="absolute font-mono text-xs text-muted-foreground"
          style={{
            left: layout.bounds.width - 40,
            top: (layout.nodes.values().next().value?.y ?? 40) - 8,
          }}
        >
          → null
        </span>
      </div>
    </div>
  );
}
