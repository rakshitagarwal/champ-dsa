"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Circle } from "lucide-react";
import { getAllPatterns } from "@/data/patterns";
import { isPatternDone } from "@/lib/storage/pattern-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PatternAccordionList() {
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
        <section key={category} className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {category}
          </h2>
          <Accordion>
            {items.map((pattern) => {
              const done = doneSet.has(pattern.slug);
              return (
                <AccordionItem key={pattern.slug} id={pattern.slug}>
                  <AccordionTrigger id={pattern.slug}>
                    <div className="flex flex-1 items-center gap-3 pr-2">
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                      )}
                      <div className="min-w-0 text-left">
                        <p className="font-medium">{pattern.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {pattern.summary}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent id={pattern.slug}>
                    <Link
                      href={`/patterns/${pattern.slug}`}
                        className={cn(
                          "group flex gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors",
                          "hover:border-primary/40 hover:bg-primary/5",
                        )}
                      >
                        <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium group-hover:text-primary">
                            Open lesson
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Intuition, when to use, JS example, and pitfalls
                          </p>
                        </div>
                      </Link>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>
      ))}
    </div>
  );
}
