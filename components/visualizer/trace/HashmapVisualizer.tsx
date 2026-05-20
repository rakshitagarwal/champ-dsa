"use client";

import { motion } from "framer-motion";
import type { HashmapSnapshot } from "@/lib/tracer/types";

type Props = {
  snapshot: HashmapSnapshot;
};

export function HashmapVisualizer({ snapshot }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono text-xs uppercase tracking-widest text-blue-400">
        {snapshot.label}
      </p>
      <div className="flex max-w-xs flex-wrap justify-center gap-2">
        {snapshot.entries.map((entry) => (
          <motion.div
            key={entry.key}
            layout
            animate={{ scale: entry.highlight ? 1.05 : 1 }}
            className={`flex items-center gap-1 rounded border px-3 py-1.5 font-mono text-xs ${
              entry.highlight
                ? "border-blue-400 bg-blue-500/30 text-blue-200"
                : "border-gray-600 bg-gray-700/60 text-gray-300"
            }`}
          >
            <span className="text-gray-500">{entry.key}:</span>
            <span className="font-semibold text-white">
              {JSON.stringify(entry.value)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
