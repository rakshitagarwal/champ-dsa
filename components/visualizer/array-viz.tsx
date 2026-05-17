"use client";

import { motion } from "framer-motion";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { cn } from "@/lib/utils";

export function ArrayViz() {
  const current = useVisualizerStore((s) => s.currentEvent());

  const arrayEntry = current
    ? Object.entries(current.variables).find(([, v]) => Array.isArray(v))
    : null;

  if (!arrayEntry) {
    return (
      <p className="text-sm text-muted-foreground">
        No array in scope — use a nums array to see visualization.
      </p>
    );
  }

  const [name, value] = arrayEntry;
  const arr = value as unknown[];
  const highlight = current?.highlights;
  const highlightSet = new Set(
    highlight?.array === name ? highlight.indices : [],
  );

  const pointerLabels = ["i", "j", "left", "right", "low", "high", "mid"];
  const pointers: { label: string; index: number }[] = [];
  if (current) {
    for (const p of pointerLabels) {
      const v = current.variables[p];
      if (typeof v === "number" && v >= 0 && v < arr.length) {
        pointers.push({ label: p, index: v });
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-muted-foreground">{name}[]</p>
      <div className="flex flex-wrap items-end gap-2">
        {arr.slice(0, 24).map((cell, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <motion.div className="flex min-h-4 gap-0.5">
              {pointers
                .filter((p) => p.index === idx)
                .map((p) => (
                  <span
                    key={p.label}
                    className="rounded bg-primary px-1 text-[10px] text-primary-foreground"
                  >
                    {p.label}
                  </span>
                ))}
            </motion.div>
            <motion.div
              layout
              className={cn(
                "flex h-12 min-w-10 items-center justify-center rounded-md border font-mono text-sm",
                highlightSet.has(idx)
                  ? "border-primary bg-primary/20"
                  : "border-border bg-muted/50",
              )}
            >
              {String(cell)}
            </motion.div>
            <span className="text-[10px] text-muted-foreground">{idx}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
