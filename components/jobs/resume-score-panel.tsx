"use client";

import type { ResumeReviewResult } from "@/types/resume-review";
import { cn } from "@/lib/utils";

function scoreBand(score: number): string {
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 55) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function scoreLabel(score: number): string {
  if (score >= 75) return "Strong";
  if (score >= 55) return "Good — room to improve";
  return "Needs work";
}

type Props = {
  result: ResumeReviewResult;
  attemptLabel?: string;
};

export function ResumeScorePanel({ result, attemptLabel }: Props) {
  return (
    <div className="space-y-6">
      {attemptLabel ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {attemptLabel}
        </p>
      ) : null}

      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p
          className={cn(
            "text-5xl font-bold tabular-nums",
            scoreBand(result.overallScore),
          )}
        >
          {result.overallScore}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Overall score / 100</p>
        <p className="mt-2 text-sm font-medium">{scoreLabel(result.overallScore)}</p>
        {result.oneLineVerdict ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {result.oneLineVerdict}
          </p>
        ) : null}
      </div>

      <section>
        <h3 className="text-sm font-semibold">Category scores</h3>
        <ul className="mt-3 space-y-3">
          {result.categories.map((cat) => (
            <li key={cat.name} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{cat.name}</span>
                <span
                  className={cn(
                    "text-sm font-bold tabular-nums",
                    scoreBand(cat.score),
                  )}
                >
                  {cat.score}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{cat.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      {result.topFixes.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold">Top fixes</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            {result.topFixes.map((fix, i) => (
              <li key={i}>{fix}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {result.missingKeywords.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold">Missing keywords</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.missingKeywords.map((kw) => (
              <span
                key={kw}
                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {result.strongPoints.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold">Keep these strengths</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {result.strongPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
