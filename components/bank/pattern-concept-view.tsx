"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DsaPattern } from "@/types/pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  isPatternDone,
  togglePatternDone,
} from "@/lib/storage/pattern-progress";
import { setLastVisited } from "@/lib/storage/learning-store";

export function PatternConceptView({ pattern }: { pattern: DsaPattern }) {
  const [done, setDone] = useState(false);
  const f = pattern.fundamentals;

  useEffect(() => {
    setDone(isPatternDone(pattern.slug));
    setLastVisited({ type: "pattern", slugOrId: pattern.slug });
  }, [pattern.slug]);

  return (
    <article className="w-full space-y-10 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
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
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {pattern.summary}
        </p>
      </header>

      <SimpleCallout title="In simple English, what is this?">
        {f.overview} Think of it this way: {f.intuition}
      </SimpleCallout>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="When should you use it?">
          <p className="mb-3 text-sm text-muted-foreground">
            If the problem sounds like any of these, this pattern is probably the
            right tool:
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

        <Section title="How to solve it (step by step)">
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
          This tells you how fast your solution runs and how much extra memory it
          needs as input size grows.
        </p>
      </Section>

      <Section title="JavaScript example (try in visualizer)">
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Read the code below, then open the visualizer. Press Run and click Next
          repeatedly — you will see each line animate on the canvas while the
          highlighted line in the editor shows what just ran.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-border bg-editor p-5 font-mono text-sm leading-relaxed">
          {f.exampleCode}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/visualizer?demo=${pattern.slug}`}
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try example in Visualizer
          </Link>
          <Link
            href="/practice"
            className="inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-medium hover:bg-accent"
          >
            DSA practice sheet
          </Link>
        </div>
      </Section>

      <Section title="Common mistakes beginners make">
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
