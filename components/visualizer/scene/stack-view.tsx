"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { VizStructure } from "@/types/viz-scene";

type Props = {
  structure: Extract<VizStructure, { kind: "stack" }>;
};

export function StackView({ structure }: Props) {
  const values = structure.values;

  return (
    <div className="flex flex-col items-center py-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
        {structure.label}
      </p>
      <div className="relative rounded-lg border-2 border-dashed border-primary/30 bg-muted/10 px-6 pb-4 pt-8">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-card px-2 text-[10px] font-medium text-muted-foreground">
          stack
        </span>
        <div className="flex min-h-[140px] w-[140px] flex-col-reverse items-stretch gap-1.5">
          <AnimatePresence mode="popLayout">
            {values.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                empty
              </motion.p>
            ) : (
              values.map((val, idx) => (
                <motion.div
                  key={`${idx}-${String(val)}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className={cn(
                    "rounded-md border-2 px-3 py-2.5 text-center font-mono text-sm",
                    idx === values.length - 1
                      ? "border-teal-400 bg-teal-500/20 font-semibold shadow-md shadow-teal-500/20"
                      : "border-border bg-card",
                  )}
                >
                  {String(val)}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
