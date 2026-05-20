"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  values: unknown[];
};

export function StackCanvas({ name, values }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-end px-4 py-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {name} (top ↑)
      </p>
      <div className="flex min-h-[120px] w-full max-w-[200px] flex-col-reverse items-stretch gap-1.5">
        <AnimatePresence mode="popLayout">
          {values.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-md border border-dashed border-border py-6 text-center text-sm text-muted-foreground"
            >
              empty
            </motion.p>
          ) : (
            values.map((val, idx) => (
              <motion.div
                key={`${idx}-${String(val)}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={cn(
                  "rounded-md border px-3 py-2 text-center font-mono text-sm",
                  idx === values.length - 1
                    ? "border-primary bg-primary/20 font-semibold"
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
  );
}
