"use client";

import { useEffect, useState } from "react";
import { getAllPatterns } from "@/data/patterns";
import { getPatternCompletionStats } from "@/lib/storage/pattern-progress";
import { LEARNING_UPDATED_EVENT } from "@/lib/storage/learning-store";

export function PatternStats() {
  const total = getAllPatterns().length;
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const refresh = () =>
      setCompleted(getPatternCompletionStats(total).completed);
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
  }, [total]);

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">
            Pattern mastery
          </h2>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {completed}{" "}
            <span className="text-lg font-normal text-muted-foreground">
              / {total} patterns understood
            </span>
          </p>
        </div>
        <div className="min-w-[140px] flex-1 sm:max-w-xs">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
