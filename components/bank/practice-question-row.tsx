"use client";

import Link from "next/link";
import type { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";

export function PracticeQuestionRow({ question }: { question: Question }) {
  return (
    <article className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {question.sheetNumber != null && (
              <span className="font-mono text-sm text-muted-foreground">
                #{question.sheetNumber}
              </span>
            )}
            <h2 className="text-xl font-semibold">{question.title}</h2>
            <Badge variant="outline">{question.difficulty}</Badge>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/90">
            {question.statement}
          </p>
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">
              How to recognize this problem
            </p>
            <ul className="grid gap-2 lg:grid-cols-2">
              {question.patternHints.map((hint) => (
                <li
                  key={hint}
                  className="flex gap-2 rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="font-bold text-primary">→</span>
                  {hint}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Open the visualizer to run code step-by-step and watch the animation
            for each line.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-48">
          <Link
            href={`/visualizer?q=${question.id}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open in Visualizer
          </Link>
          <Link
            href={`/bank/${question.patternSlug}/${question.id}`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-border text-sm hover:bg-accent"
          >
            Notes & revision
          </Link>
        </div>
      </div>
    </article>
  );
}
