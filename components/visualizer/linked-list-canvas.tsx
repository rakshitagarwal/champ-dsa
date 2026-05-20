"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ListData = { name: string; values: number[] };

type Props = {
  lists: ListData[];
  highlightVars?: string[];
};

export function LinkedListCanvas({ lists, highlightVars = [] }: Props) {
  if (lists.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No linked list variables in this step.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-auto px-2 py-4">
      {lists.map((list) => (
        <div key={list.name}>
          <p
            className={cn(
              "mb-3 text-center text-xs font-semibold uppercase tracking-wider",
              highlightVars.includes(list.name)
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {list.name}
          </p>
          <div className="flex items-center justify-center gap-1">
            {list.values.length === 0 ? (
              <span className="rounded-md border border-dashed border-border px-4 py-2 font-mono text-sm text-muted-foreground">
                null
              </span>
            ) : (
              list.values.map((val, idx) => (
                <div key={idx} className="flex items-center">
                  <motion.div
                    layout
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/60 bg-primary/15 font-mono text-sm font-semibold text-foreground"
                  >
                    {val}
                  </motion.div>
                  {idx < list.values.length - 1 ? (
                    <span className="mx-1 text-lg text-primary">→</span>
                  ) : null}
                </div>
              ))
            )}
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              → null
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
