"use client";

import { ExternalLink } from "lucide-react";
import type { ResumeReviewResult } from "@/types/resume-review";
import { AtsKeywordPanel } from "@/components/jobs/ats-keyword-panel";
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
  jobTitle?: string;
};

export function ResumeScorePanel({ result, attemptLabel, jobTitle }: Props) {
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
          <h3 className="text-sm font-semibold">Lines to improve</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Specific lines from your resume that hurt your score — with exact rewrites.
          </p>
          <ul className="mt-3 space-y-4">
            {result.lineFixes.map((fix, i) => (
              <li key={i} className="rounded-lg border border-border p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[11px] font-medium text-destructive">
                    {fix.section}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Original:</p>
                <p className="mt-0.5 rounded bg-muted/50 px-2 py-1 text-sm italic">
                  &ldquo;{fix.originalLine}&rdquo;
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Improved:</p>
                <p className="mt-0.5 rounded bg-primary/5 px-2 py-1 text-sm">
                  {fix.suggestedLine}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {fix.reason}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {result.sections.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold">Section scores</h3>
          <ul className="mt-3 space-y-3">
            {result.sections.map((section) => (
              <li
                key={section.name}
                className="rounded-lg border border-border p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{section.name}</span>
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      scoreBand(section.score),
                    )}
                  >
                    {section.score}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {section.summary}
                </p>
                {section.exampleFix ? (
                  <p className="mt-2 rounded-md bg-muted/50 px-2 py-1.5 text-xs">
                    <span className="font-medium">Example fix: </span>
                    {section.exampleFix}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

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

      <section className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">Want a professional template?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Build your resume with Overleaf LaTeX templates — clean, ATS-friendly, and widely used by software engineers.
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
