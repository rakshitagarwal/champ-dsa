"use client";

import { motion } from "framer-motion";
import type { LayoutResult } from "@/types/viz-scene";

type Props = {
  layout: LayoutResult;
  className?: string;
};

export function EdgeLayer({ layout, className }: Props) {
  if (layout.edges.length === 0) return null;

  return (
    <svg
      className={className}
      width={layout.bounds.width}
      height={layout.bounds.height}
      style={{ overflow: "visible" }}
    >
      {layout.edges.map((e) => (
        <motion.line
          key={`${e.from}-${e.to}`}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="currentColor"
          strokeWidth={2}
          className="text-primary/50"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
        />
      ))}
    </svg>
  );
}
