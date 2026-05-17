"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import type { CallFrame } from "@/types/execution";
import { cn } from "@/lib/utils";

type Props = {
  frames: CallFrame[];
  activeFrameId: number | null;
};

export function StackPanel({ frames, activeFrameId }: Props) {
  if (frames.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Call stack appears when functions are entered.
      </p>
    );
  }

  return (
    <motion.div layout className="flex flex-col-reverse gap-2">
      <AnimatePresence mode="popLayout" initial={false}>
        {frames.map((frame) => {
          const isActive = frame.id === activeFrameId;
          const isReturned = frame.status === "returned";
          return (
            <motion.div
              key={frame.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={cn(
                "rounded-md border px-3 py-2 font-mono text-sm",
                isActive
                  ? "border-primary bg-primary/15 shadow-sm"
                  : isReturned
                    ? "border-border bg-muted/30 opacity-80"
                    : "border-border bg-muted/40",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-primary">{frame.name}</span>
                <span className="text-xs text-muted-foreground">L{frame.line}</span>
                {isReturned && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                )}
              </div>
              {frame.args && Object.keys(frame.args).length > 0 ? (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {Object.entries(frame.args).map(([k, v]) => (
                    <span
                      key={k}
                      className="rounded bg-background/80 px-1.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {k}={formatVal(v)}
                    </span>
                  ))}
                </div>
              ) : null}
              {frame.returnValue !== undefined && isReturned ? (
                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
                  {"→ return "}
                  {formatVal(frame.returnValue)}
                </p>
              ) : null}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

function formatVal(v: unknown): string {
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "object" && v !== null) {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}
