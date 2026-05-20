"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StringWalkState, VizStructure } from "@/types/viz-scene";
import { StackView } from "./stack-view";

type Props = {
  stringWalk: StringWalkState;
  stack: Extract<VizStructure, { kind: "stack" }>;
  caption?: string;
};

/** Valid-parentheses style: input string + vertical stack side by side. */
export function StringStackView({ stringWalk, stack, caption }: Props) {
  const { chars, index, variable } = stringWalk;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-4">
      <div className="flex w-full max-w-3xl flex-wrap items-start justify-center gap-10">
        <StackView structure={stack} />

        <div className="flex min-w-[200px] flex-1 flex-col items-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {variable}
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {chars.map((ch, i) => (
              <motion.span
                key={i}
                layout
                className={cn(
                  "flex h-11 w-9 items-center justify-center rounded-md border-2 font-mono text-lg font-semibold",
                  i === index
                    ? "border-teal-400 bg-teal-500/25 text-foreground shadow-lg shadow-teal-500/30 underline decoration-teal-400 decoration-2 underline-offset-4"
                    : i < index
                      ? "border-border/50 bg-muted/30 text-muted-foreground"
                      : "border-border bg-card/80 text-foreground",
                )}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {caption ? (
        <motion.p
          key={caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-mono text-sm text-teal-400/90"
        >
          {caption}
        </motion.p>
      ) : null}
    </div>
  );
}
