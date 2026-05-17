"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { getAllPatterns } from "@/data/patterns";
import { isPatternDone } from "@/lib/storage/pattern-progress";
import { cn } from "@/lib/utils";

export function PatternList() {
  const patterns = getAllPatterns();
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const refresh = () =>
      setDoneSet(
        new Set(
          patterns.filter((p) => isPatternDone(p.slug)).map((p) => p.slug),
        ),
      );
    refresh();
    window.addEventListener("champdsa-pattern-done", refresh);
    return () => window.removeEventListener("champdsa-pattern-done", refresh);
  }, [patterns]);

  const byCategory = patterns.reduce<Record<string, typeof patterns>>(
    (acc, pat) => {
      (acc[pat.category] ??= []).push(pat);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-8">
      {Object.entries(byCategory).map(([category, items]) => (
        <section key={category} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {category}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {items.map((pattern) => {
              const done = doneSet.has(pattern.slug);
              return (
                <li key={pattern.slug}>
                  <Link
                    href={`/patterns/${pattern.slug}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors",
                      "hover:border-primary/40 hover:bg-primary/5",
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium group-hover:text-primary">
                        {pattern.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {pattern.summary}
                      </p>
                    </div>
                    <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
