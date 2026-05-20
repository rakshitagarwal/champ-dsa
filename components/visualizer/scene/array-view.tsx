"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { layoutArrayWidth, NODE_W } from "@/lib/viz/layout";
import type { PointerBinding, SceneHighlight, VizStructure } from "@/types/viz-scene";

const CELL_GAP = 8;

type Props = {
  structure: Extract<VizStructure, { kind: "array" }>;
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
  changedIndices?: Set<number>;
};

export function ArrayView({
  structure,
  pointers,
  highlights,
  changedIndices = new Set(),
}: Props) {
  const values = structure.values.slice(0, 40);
  const ptrsHere = pointers.filter((p) => p.structureId === structure.id);
  const windowHl = highlights.find(
    (h) => h.type === "window" && h.structureId === structure.id,
  );
  const cellHighlights = new Set(
    highlights
      .filter((h) => h.type === "cell" && h.structureId === structure.id)
      .map((h) => (h as { index: number }).index),
  );

  const width = layoutArrayWidth(values.length);

  return (
    <div className="w-full overflow-x-auto py-2">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-primary">
        {structure.label}
      </p>
      {windowHl && windowHl.type === "window" && (
        <WindowBracket left={windowHl.left} right={windowHl.right} length={values.length} width={width} />
      )}
      <div
        className="relative mx-auto flex items-end justify-center"
        style={{ gap: CELL_GAP, minWidth: width }}
      >
        {values.map((cell, idx) => {
          const pointerHere = ptrsHere.filter((p) => p.index === idx);
          const isChanged = changedIndices.has(idx);
          const isHighlighted = cellHighlights.has(idx);
          const inWindow =
            windowHl &&
            windowHl.type === "window" &&
            idx >= windowHl.left &&
            idx <= windowHl.right;

          return (
            <div
              key={idx}
              className="relative flex flex-col items-center"
              style={{ width: NODE_W }}
            >
              <div className="mb-1 flex min-h-[24px] flex-wrap justify-center gap-0.5">
                <AnimatePresence mode="popLayout">
                  {pointerHere.map((p) => (
                    <motion.span
                      key={`${p.name}@${p.index ?? p.nodeId ?? ""}`}
                      layoutId={`ptr-${structure.id}-${p.name}-${p.index ?? p.nodeId ?? ""}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-full bg-teal-500 px-2 py-0.5 text-[10px] font-bold text-teal-950 shadow-sm shadow-teal-500/40"
                    >
                      {p.name}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <motion.div
                layout
                animate={isChanged ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "flex h-12 w-full items-center justify-center rounded-lg border-2 font-mono text-sm font-semibold",
                  isChanged && "border-amber-400 bg-amber-500/20 shadow-md shadow-amber-500/20",
                  !isChanged && (isHighlighted || pointerHere.length) &&
                    "border-teal-400 bg-teal-500/15 shadow-lg shadow-teal-500/25",
                  !isChanged && inWindow && "border-primary/40 bg-primary/10",
                  !isChanged && !isHighlighted && !pointerHere.length && !inWindow &&
                    "border-border/80 bg-card/80",
                )}
              >
                {formatCell(cell)}
              </motion.div>
              <span className="mt-1 font-mono text-[9px] text-muted-foreground">{idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatCell(cell: unknown): string {
  if (cell === null || cell === undefined) return "∅";
  if (typeof cell === "object") return "·";
  return String(cell);
}

function WindowBracket({
  left,
  right,
  length,
  width,
}: {
  left: number;
  right: number;
  length: number;
  width: number;
}) {
  const startX = left * (NODE_W + CELL_GAP) + NODE_W / 2;
  const endX = right * (NODE_W + CELL_GAP) + NODE_W / 2;
  const bracketWidth = endX - startX + NODE_W;

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.5 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className="relative mx-auto mb-2 h-5"
      style={{ width, maxWidth: "100%" }}
    >
      <div
        className="absolute top-1 h-2.5 rounded-t border-2 border-b-0 border-teal-500/70"
        style={{ left: startX, width: bracketWidth }}
      />
    </motion.div>
  );
}
