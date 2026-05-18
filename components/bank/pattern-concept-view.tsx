"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DsaPattern } from "@/types/pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDeveloperFraming } from "@/data/patterns/developer-framing";
import {
  isPatternDone,
  togglePatternDone,
} from "@/lib/storage/pattern-progress";
import { setLastVisited } from "@/lib/storage/learning-store";

export function PatternConceptView({ pattern }: { pattern: DsaPattern }) {
  const [done, setDone] = useState(false);
  const f = pattern.fundamentals;
  const dev = getDeveloperFraming(pattern.slug);
  const summary = dev?.summary ?? pattern.summary;

  useEffect(() => {
    setDone(isPatternDone(pattern.slug));
    setLastVisited({ type: "pattern", slugOrId: pattern.slug });
  }, [pattern.slug]);

  return (
    <article className="w-full space-y-8 px-4 py-8 lg:px-10 xl:px-12">
      <header>
        <Link
          href="/patterns"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← All patterns
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{pattern.category}</Badge>
          {done && <Badge>Understood</Badge>}
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {pattern.name}
        </h1>
        <p className="mt-3 max-w-4xl text-lg leading-relaxed text-muted-foreground">
          {summary}
        </p>
      </header>

      {dev ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-primary/30 bg-primary/5 px-5 py-4">
            <h2 className="text-sm font-semibold text-primary">
              Why this matters if you ship code
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {dev.hook}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 px-5 py-4">
            <h2 className="text-sm font-semibold">Problem wording that hints at this</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {dev.recognize}
            </p>
          </div>
        </div>
      ) : null}

      <SimpleCallout title="What is this pattern?">
        {f.overview} In everyday terms: {f.intuition}
      </SimpleCallout>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="When should you reach for it?">
          <p className="mb-3 text-sm text-muted-foreground">
            You are probably in the right place if the prompt mentions:
          </p>
          <ul className="space-y-2">
            {f.whenToUse.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg bg-muted/40 px-4 py-3 text-sm leading-relaxed"
              >
                <span className="mt-0.5 text-primary">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="How to implement it (step by step)">
          <ol className="space-y-3">
            {f.approach.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 rounded-lg border border-border/60 px-4 py-3 text-sm leading-relaxed"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section title="Speed & memory">
        <p className="text-base leading-relaxed">{f.complexity}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          In interviews, state time and space clearly. In production, the same
          bounds tell you whether this approach scales with your input size.
        </p>
      </Section>

      <Section title="JavaScript example">
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Study the pattern below, then solve related problems on the practice
          sheet. Run your solution to see each line execute on the sample input.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-border bg-editor p-5 font-mono text-sm leading-relaxed">
          {f.exampleCode}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
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
      </Section>

      <Section title="Mistakes even experienced devs make here">
        <ul className="space-y-2">
          {f.pitfalls.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

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
  );
}

function SimpleCallout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-base leading-relaxed text-foreground/90">
        {children}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 lg:p-8">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
