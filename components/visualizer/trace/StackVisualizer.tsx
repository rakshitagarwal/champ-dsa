"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { StackSnapshot } from "@/lib/tracer/types";

type Props = {
  snapshot: StackSnapshot;
};

export function StackVisualizer({ snapshot }: Props) {
  const displayed = [...snapshot.items].reverse();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs uppercase tracking-widest text-blue-400">
        {snapshot.label}
      </p>
      <p className="text-xs text-gray-600">top ↓</p>
      <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {displayed.map((item, idx) => (
            <motion.div
              key={`${item}-${idx}`}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className={`flex h-10 w-24 items-center justify-center rounded border text-sm font-mono font-semibold ${
                idx === 0
                  ? "border-blue-400 bg-blue-500/40 text-blue-200"
                  : "border-gray-600 bg-gray-700/60 text-gray-300"
              }`}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
        {displayed.length === 0 ? (
          <div className="flex h-10 w-24 items-center justify-center rounded border border-dashed border-gray-700 text-xs text-gray-600">
            empty
          </div>
        ) : null}
      </div>
    </div>
  );
}
