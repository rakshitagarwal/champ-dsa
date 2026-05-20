"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PointerBinding, SceneHighlight, VizStructure } from "@/types/viz-scene";

const PTR_COLORS: Record<string, string> = {
  front: "#34d399",
  rear: "#fb923c",
  head: "#34d399",
  tail: "#fb923c",
  i: "#60a5fa",
  j: "#f472b6",
};

type Props = {
  structure: Extract<VizStructure, { kind: "array" }>;
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
  changedIndices?: Set<number>;
};

/** BFS / deque style queue rendered left-to-right (front at index 0). */
export function QueueView({
  structure,
  pointers,
  highlights,
  changedIndices,
}: Props) {
  const ptrsHere = pointers.filter((p) => p.structureId === structure.id);

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {structure.label} (queue)
      </p>
      <div className="flex flex-wrap justify-center gap-1">
        {structure.values.map((val, idx) => {
          const isHighlight = highlights.some(
            (h) =>
              h.type === "cell" &&
              h.structureId === structure.id &&
              h.index === idx,
          );
          const isWindow = highlights.some(
            (h) =>
              h.type === "window" &&
              h.structureId === structure.id &&
              idx >= h.left &&
              idx <= h.right,
          );
          const ptrAt = ptrsHere.filter((p) => p.index === idx);
          const changed = changedIndices?.has(idx);

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className="flex min-h-[18px] flex-col items-center gap-0.5">
                {ptrAt.map((p) => (
                  <motion.span
                    key={p.name}
                    layout
                    className="text-[10px] font-bold"
                    style={{ color: PTR_COLORS[p.name] ?? "#60a5fa" }}
                  >
                    ▲{p.name}
                  </motion.span>
                ))}
              </div>
              <motion.div
                layout
                animate={{ scale: changed || isHighlight ? 1.08 : 1 }}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded border-2 font-mono text-sm font-semibold",
                  idx === 0
                    ? "border-emerald-400/80 bg-emerald-500/25"
                    : "border-border bg-card/80",
                  isHighlight && "border-teal-400 bg-teal-500/30",
                  isWindow && "border-amber-400/60",
                  changed && "ring-2 ring-amber-400/70",
                )}
              >
                {val === null || val === undefined ? "·" : String(val)}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{idx}</span>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground">front → rear</p>
    </div>
  );
}

export function isQueueVariable(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower === "queue" ||
    lower === "q" ||
    lower === "deque" ||
    /queue$/.test(lower) ||
    lower === "bfs"
  );
}
