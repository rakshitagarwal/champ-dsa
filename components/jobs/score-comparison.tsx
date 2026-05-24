"use client";

import type { ResumeAttempt } from "@/types/resume-review";
import { cn } from "@/lib/utils";

type Props = {
  attempts: ResumeAttempt[];
};

export function ScoreComparison({ attempts }: Props) {
  if (attempts.length < 2) return null;

  const [first, second] = attempts;
  const delta = second.result.overallScore - first.result.overallScore;

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <h3 className="text-sm font-semibold">Score comparison</h3>
      <div className="mt-3 grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p className="text-muted-foreground">Attempt 1</p>
          <p className="text-2xl font-bold tabular-nums">
            {first.result.overallScore}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-muted-foreground">Change</p>
          <p
            className={cn(
              "text-2xl font-bold tabular-nums",
              delta > 0 && "text-emerald-600",
              delta < 0 && "text-red-600",
              delta === 0 && "text-muted-foreground",
            )}
          >
            {delta > 0 ? "+" : ""}
            {delta}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Attempt 2</p>
          <p className="text-2xl font-bold tabular-nums">
            {second.result.overallScore}
          </p>
        </div>
      </div>
    </div>
  );
}
