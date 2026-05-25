"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { DsaPattern } from "@/types/pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDeveloperFraming } from "@/data/patterns/developer-framing";
import {
  getPatternEnrichment,
  mergePatternLists,
} from "@/data/patterns/pattern-enrichment";
import {
  isPatternDone,
  togglePatternDone,
} from "@/lib/storage/pattern-progress";
import { setLastVisited } from "@/lib/storage/learning-store";
import { cn } from "@/lib/utils";
import { highlightCode } from "@/lib/notes/highlight-code";
import { PatternAiExplain } from "@/components/bank/pattern-ai-explain";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "ai-notes", label: "AI deep dive" },
  { id: "when", label: "When to use" },
  { id: "approach", label: "Approach" },
  { id: "complexity", label: "Complexity" },
  { id: "example", label: "Example" },
  { id: "pitfalls", label: "Pitfalls" },
] as const;

export function PatternConceptView({ pattern }: { pattern: DsaPattern }) {
  const [done, setDone] = useState(false);
  const f = pattern.fundamentals;
  const enrich = getPatternEnrichment(pattern.slug);
  const whenToUse = mergePatternLists(f.whenToUse, enrich?.whenToUse);
  const approach = mergePatternLists(f.approach, enrich?.approach);
  const pitfalls = mergePatternLists(f.pitfalls, enrich?.pitfalls);
  const dev = getDeveloperFraming(pattern.slug);
  const summary = dev?.summary ?? pattern.summary;

  useEffect(() => {
    setDone(isPatternDone(pattern.slug));
    setLastVisited({ type: "pattern", slugOrId: pattern.slug });
  }, [pattern.slug]);

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-8 lg:px-8 xl:px-10">
      <nav
        aria-label="On this page"
        className="sticky top-20 hidden h-fit w-44 shrink-0 lg:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ul className="mt-3 space-y-1 border-l border-border pl-3">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="min-w-0 flex-1 space-y-10">
        <header className="space-y-4 border-b border-border pb-8">
          <Link
            href="/patterns"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← All patterns
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-normal">
              Pattern lesson
            </Badge>
            <Badge variant="secondary">{pattern.category}</Badge>
            {pattern.difficulty ? (
              <Badge variant="outline">{pattern.difficulty}</Badge>
            ) : null}
            {done ? <Badge>Understood</Badge> : null}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {pattern.name}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </header>

        <div id="ai-notes" className="scroll-mt-24">
          <PatternAiExplain slug={pattern.slug} patternName={pattern.name} />
        </div>

        {dev ? (
          <div className="grid gap-4 md:grid-cols-2">
            <InsightCard title="Why this matters in real code" variant="primary">
              {dev.hook}
            </InsightCard>
            <InsightCard title="How to recognize it in a prompt">
              {dev.recognize}
            </InsightCard>
          </div>
        ) : null}

        <section id="overview" className="scroll-mt-24 space-y-6">
          <SectionHeading
            title="Overview"
            subtitle="What this pattern is and the mental model to keep while coding."
          />
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base leading-[1.75] text-foreground/90">
              {f.overview}
            </p>
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary/5 px-6 py-5">
            <h3 className="text-sm font-semibold text-primary">Core intuition</h3>
            <p className="mt-2 text-base leading-[1.75] text-foreground/90">
              {f.intuition}
            </p>
          </div>
          <KeyTakeaways items={[f.overview, f.intuition]} />
        </section>

        <section id="when" className="scroll-mt-24">
          <SectionHeading
            title="When should you reach for it?"
            subtitle="If the problem sounds like one of these, this pattern is likely the right tool."
          />
          <ul className="mt-4 space-y-2">
            {whenToUse.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-border/60 bg-card px-4 py-3.5 text-sm leading-relaxed"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
                  aria-hidden
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="approach" className="scroll-mt-24">
          <SectionHeading
            title="How to implement it"
            subtitle="Follow these steps in order — each step shrinks the problem or maintains an invariant."
          />
          <ol className="mt-4 space-y-3">
            {approach.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl border border-border bg-card px-5 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-foreground/90">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="complexity" className="scroll-mt-24">
          <SectionHeading title="Speed & memory" />
          <p className="mt-3 text-base leading-relaxed">{f.complexity}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            In interviews, state time and space clearly. In production, the same
            bounds tell you whether this approach scales with your input size.
          </p>
        </section>

        <section id="example" className="scroll-mt-24">
          <SectionHeading
            title="Reference implementation"
            subtitle="Study the skeleton, then solve related problems on the practice sheet."
          />
          <pre className="pattern-code-block">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightCode(f.exampleCode, "javascript"),
              }}
            />
          </pre>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/bank/patterns/${pattern.slug}/practice`}
              className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Practice this pattern
            </Link>
            <Link
              href="/practice"
              className="inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-medium hover:bg-accent"
            >
              DSA practice sheet
            </Link>
          </div>
        </section>

        <section id="pitfalls" className="scroll-mt-24">
          <SectionHeading title="Common mistakes" />
          <ul className="mt-4 space-y-2">
            {pitfalls.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-border pt-8">
          <Button
            size="lg"
            onClick={() => {
              const next = togglePatternDone(pattern.slug);
              setDone(next);
            }}
          >
            {done ? "Mark as not done" : "I understand this pattern"}
          </Button>
        </div>
      </article>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function InsightCard({
  title,
  children,
  variant,
}: {
  title: string;
  children: ReactNode;
  variant?: "primary";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-5 py-4",
        variant === "primary"
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-muted/30",
      )}
    >
      <h2
        className={cn(
          "text-sm font-semibold",
          variant === "primary" ? "text-primary" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
        {children}
      </p>
    </div>
  );
}

function KeyTakeaways({ items }: { items: string[] }) {
  const unique = [...new Set(items.filter(Boolean))].slice(0, 2);
  if (unique.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">Key takeaways</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
        {unique.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
