"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { MiniVizPreview } from "@/types/question";
import { cn } from "@/lib/utils";

export function MiniVizPreview({ preview }: { preview: MiniVizPreview }) {
  const [frame, setFrame] = useState(0);
  const current = preview.frames[frame];

  return (
    <div className="rounded-lg border border-border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        Mini visualization — {current.label}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={frame}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex flex-wrap gap-2"
        >
          {current.values.map((v, i) => (
            <div
              key={i}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded border font-mono text-sm",
                current.indices.includes(i)
                  ? "border-primary bg-primary/20"
                  : "border-border",
              )}
            >
              {v}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 flex gap-2">
        {preview.frames.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setFrame(i)}
            className={cn(
              "h-2 w-2 rounded-full",
              i === frame ? "bg-primary" : "bg-muted-foreground/40",
            )}
            aria-label={`Frame ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
