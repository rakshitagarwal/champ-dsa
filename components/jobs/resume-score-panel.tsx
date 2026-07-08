"use client";

import { Check, ExternalLink, X } from "lucide-react";
import type { ResumeReviewResult } from "@/types/resume-review";
import { AtsKeywordPanel } from "@/components/jobs/ats-keyword-panel";
import { ScoreComparison } from "@/components/jobs/score-comparison";
import { cn } from "@/lib/utils";
import type { ResumeAttempt } from "@/types/resume-review";

function scoreBand(score: number): string {
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 55) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function scoreLabel(score: number): string {
  if (score >= 75) return "Strong";
  if (score >= 60) return "Average";
  if (score >= 55) return "Good — room to improve";
  return "Needs work";
}

function scoreBadgeClass(score: number): string {
  if (score >= 75) return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (score >= 60) return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  return "bg-red-500/10 text-red-700 dark:text-red-400";
}

const BAR_COLORS = [
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
];

type SummaryBar = {
  name: string;
  score: number;
  max: number;
};

function buildSummaryBars(result: ResumeReviewResult): SummaryBar[] {
  const cats = result.categories;
  if (cats.length >= 5) {
    return cats.slice(0, 5).map((c) => ({
      name: c.name.split(" ")[0] ?? c.name,
      score: c.score,
      max: 100,
    }));
  }

  const sections = result.sections;
  const combined: SummaryBar[] = cats.map((c) => ({
    name: c.name,
    score: c.score,
    max: 100,
  }));

  for (const sec of sections) {
    if (combined.length >= 5) break;
    combined.push({ name: sec.name, score: sec.score, max: 100 });
  }

  return combined.slice(0, 5);
}

type Props = {
  result: ResumeReviewResult;
  attemptLabel?: string;
  jobTitle?: string;
  attempts?: ResumeAttempt[];
  scoreDelta?: { delta: number; previousScore: number } | null;
  fixedSinceLastReview?: string[];
};

export function ResumeScorePanel({
  result,
  attemptLabel,
  jobTitle,
  attempts = [],
  scoreDelta,
  fixedSinceLastReview = [],
}: Props) {
  const summaryBars = buildSummaryBars(result);
  const issues = [
    ...result.lineFixes.map((f) => ({
      text: f.originalLine,
      detail: f.reason,
      isNew: true,
    })),
    ...result.topFixes
      .filter(
        (fix) =>
          !result.lineFixes.some((lf) => lf.originalLine.includes(fix.slice(0, 20))),
      )
      .map((fix) => ({ text: fix, detail: undefined, isNew: true })),
  ].slice(0, 8);

  return (
    <div className="space-y-6">
      {attemptLabel ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {attemptLabel}
        </p>
      ) : null}

      {attempts.length >= 2 ? <ScoreComparison attempts={attempts} /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold">ATS Score</h3>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-muted"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={
                    2 * Math.PI * 48 * (1 - result.overallScore / 100)
                  }
                  className={cn(
                    result.overallScore >= 75
                      ? "text-emerald-500"
                      : result.overallScore >= 60
                        ? "text-amber-500"
                        : "text-red-500",
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={cn(
                    "text-3xl font-bold tabular-nums",
                    scoreBand(result.overallScore),
                  )}
                >
                  {result.overallScore}
                </span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
            <span
              className={cn(
                "mt-3 rounded-full px-3 py-0.5 text-xs font-medium",
                scoreBadgeClass(result.overallScore),
              )}
            >
              {scoreLabel(result.overallScore)}
            </span>
            {scoreDelta ? (
              <p
                className={cn(
                  "mt-2 text-xs font-medium",
                  scoreDelta.delta > 0
                    ? "text-emerald-600"
                    : scoreDelta.delta < 0
                      ? "text-red-600"
                      : "text-muted-foreground",
                )}
              >
                {scoreDelta.delta > 0 ? "+" : ""}
                {scoreDelta.delta} pts vs last scan (was {scoreDelta.previousScore})
              </p>
            ) : null}
            {result.oneLineVerdict ? (
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {result.oneLineVerdict}
              </p>
            ) : null}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold">CV Summary</h3>
          <ul className="mt-4 space-y-4">
            {summaryBars.map((bar, i) => (
              <li key={bar.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{bar.name}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {bar.score}/{bar.max}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", BAR_COLORS[i % BAR_COLORS.length])}
                    style={{ width: `${bar.score}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Issues Found</h3>
          {issues.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <div>
                    {issue.isNew ? (
                      <span className="mr-1.5 rounded bg-destructive/10 px-1 py-0.5 text-[10px] font-medium text-destructive">
                        New
                      </span>
                    ) : null}
                    <span className="text-foreground">{issue.text}</span>
                    {issue.detail ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {issue.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No major issues detected.
            </p>
          )}

          {fixedSinceLastReview.length > 0 ? (
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fixed since last review
              </p>
              <ul className="mt-2 space-y-1.5">
                {fixedSinceLastReview.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="line-through">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Suggestions</h3>
          {result.topFixes.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {result.topFixes.map((fix, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{fix}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Your resume looks solid — keep refining metrics and keywords.
            </p>
          )}
        </section>
      </div>

      {result.scoreExplanation ? (
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Why this score</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {result.scoreExplanation}
          </p>
        </section>
      ) : null}

      <AtsKeywordPanel keywords={result.missingKeywords} jobTitle={jobTitle} />

      {result.lineFixes.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold">Line-level rewrites</h3>
          <ul className="mt-3 space-y-4">
            {result.lineFixes.map((fix, i) => (
              <li key={i} className="rounded-lg border border-border p-4">
                <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[11px] font-medium text-destructive">
                  {fix.section}
                </span>
                <p className="mt-2 text-xs text-muted-foreground">Original:</p>
                <p className="mt-0.5 rounded bg-muted/50 px-2 py-1 text-sm italic">
                  &ldquo;{fix.originalLine}&rdquo;
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Improved:</p>
                <p className="mt-0.5 rounded bg-primary/5 px-2 py-1 text-sm">
                  {fix.suggestedLine}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {result.strongPoints.length > 0 ? (
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Keep these strengths</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {result.strongPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">Want a professional template?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Build your resume with Overleaf LaTeX templates — clean, ATS-friendly,
              and widely used by software engineers.
            </p>
          </div>
          <a
            href="https://www.overleaf.com/latex/templates/tagged/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse templates
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
