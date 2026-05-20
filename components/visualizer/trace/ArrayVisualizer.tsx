"use client";

import { motion } from "framer-motion";
import type { ArraySnapshot, PointerSnapshot } from "@/lib/tracer/types";

const HIGHLIGHT_STYLES: Record<string, string> = {
  active: "bg-blue-500/40 border-blue-400 text-blue-200",
  comparing: "bg-yellow-500/40 border-yellow-400 text-yellow-200",
  result: "bg-green-500/40 border-green-400 text-green-200",
  min: "bg-purple-500/40 border-purple-400 text-purple-200",
  max: "bg-orange-500/40 border-orange-400 text-orange-200",
  visited: "bg-gray-500/40 border-gray-500 text-gray-400",
  swap: "bg-red-500/40 border-red-400 text-red-200",
  default: "bg-gray-700/60 border-gray-600 text-gray-300",
};

type Props = {
  snapshot: ArraySnapshot;
  pointers: PointerSnapshot[];
};

export function ArrayVisualizer({ snapshot, pointers }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-blue-400">
        {snapshot.label}
      </p>
      <div className="relative flex gap-1">
        {snapshot.values.map((val, idx) => {
          const hlType = snapshot.highlights[idx] ?? "default";
          const style = HIGHLIGHT_STYLES[hlType] ?? HIGHLIGHT_STYLES.default;
          return (
            <motion.div
              key={idx}
              layout
              animate={{ scale: hlType !== "default" ? 1.08 : 1 }}
              transition={{ duration: 0.2 }}
              className={`flex h-12 w-12 items-center justify-center rounded border text-sm font-mono font-semibold ${style}`}
            >
              {val ?? "·"}
            </motion.div>
          );
        })}
      </div>
      <div className="flex gap-1">
        {snapshot.values.map((_, idx) => (
          <div key={idx} className="w-12 text-center text-xs text-gray-600">
            {idx}
          </div>
        ))}
      </div>
      {pointers.length > 0 ? (
        <div className="relative mt-1 flex gap-1">
          {snapshot.values.map((_, idx) => {
            const atIdx = pointers.filter((p) => p.index === idx);
            return (
              <div key={idx} className="flex w-12 flex-col items-center gap-0.5">
                {atIdx.map((ptr) => (
                  <motion.span
                    key={ptr.name}
                    layout
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-[10px] font-bold leading-tight"
                    style={{ color: ptr.color }}
                  >
                    ▲{ptr.name}
                  </motion.span>
                ))}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
