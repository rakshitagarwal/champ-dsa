"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ExternalLink, Search } from "lucide-react";
import {
  PRACTICE_SHEET,
  getAllPracticeProblems,
  leetcodeUrl,
  type LcDifficulty,
  type LcProblem,
} from "@/data/practice/leetcode-sheet";
import {
  loadPracticeExpandedSub,
  savePracticeExpandedSub,
  scrollPracticeSubsectionIntoView,
} from "@/lib/storage/practice-list-state";
import { markPracticeVisited } from "@/lib/onboarding/checklist";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DIFFICULTY_CLASS: Record<LcDifficulty, string> = {
  easy: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  medium: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  hard: "border-rose-500/30 bg-rose-500/15 text-rose-400",
};

function ProblemRow({ problem }: { problem: LcProblem }) {
  return (
    <a
      href={leetcodeUrl(problem.slug)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <span className="font-medium">{problem.title}</span>
      <span className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <ExternalLink className="h-3 w-3" />
          LeetCode
        </span>
        <Badge
          variant="outline"
          className={cn("shrink-0 capitalize", DIFFICULTY_CLASS[problem.difficulty])}
        >
          {problem.difficulty}
        </Badge>
      </span>
    </a>
  );
}

export function SheetAccordion() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [expandedSubId, setExpandedSubId] = useState<string | null>(() =>
    loadPracticeExpandedSub(),
  );

  useEffect(() => {
    markPracticeVisited();
    if (pathname !== "/practice") return;
    const saved = loadPracticeExpandedSub();
    if (!saved) return;
    setExpandedSubId(saved);
    const frame = requestAnimationFrame(() => {
      scrollPracticeSubsectionIntoView(saved);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return getAllPracticeProblems().filter((problem) =>
      problem.title.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex max-w-md flex-col gap-1.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by problem name…"
            className="h-9 w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
            aria-label="Search problems by name"
          />
        </div>
        {searchResults ? (
          <p className="text-xs text-muted-foreground">
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "match" : "matches"}
          </p>
        ) : null}
      </div>

      {!searchResults ? (
        <nav className="flex flex-wrap gap-2" aria-label="Jump to topic">
          {PRACTICE_SHEET.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {group.title}
            </a>
          ))}
        </nav>
      ) : null}

      {searchResults ? (
        searchResults.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No problems match &ldquo;{query.trim()}&rdquo;. Try another name.
          </p>
        ) : (
          <ul className="space-y-2">
            {searchResults.map((problem) => (
              <li key={problem.slug}>
                <ProblemRow problem={problem} />
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="space-y-10">
          {PRACTICE_SHEET.map((group) => {
            const n = group.subsections.reduce(
              (sum, sub) => sum + sub.problems.length,
              0,
            );
            const openInThisGroup =
              expandedSubId &&
              group.subsections.some((sub) => sub.id === expandedSubId)
                ? expandedSubId
                : null;
            return (
              <section key={group.id} id={group.id} className="scroll-mt-20 space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{n}</Badge>
                    {group.patternSlug ? (
                      <Link
                        href={`/patterns/${group.patternSlug}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <BookOpen className="h-3 w-3" />
                        Pattern notes
                      </Link>
                    ) : null}
                  </div>
                </div>
                <Accordion
                  open={openInThisGroup}
                  onOpenChange={(id) => {
                    if (id) {
                      savePracticeExpandedSub(id);
                      setExpandedSubId(id);
                    } else if (openInThisGroup) {
                      setExpandedSubId(null);
                    }
                  }}
                >
                  {group.subsections.map((sub) => (
                    <AccordionItem key={sub.id} id={sub.id}>
                      <AccordionTrigger id={sub.id}>
                        <div className="flex flex-1 items-center justify-between gap-2 pr-2">
                          <span className="font-medium">{sub.title}</span>
                          <Badge variant="outline">{sub.problems.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent id={sub.id}>
                        <ul className="space-y-2">
                          {sub.problems.map((problem) => (
                            <li key={`${sub.id}-${problem.slug}`}>
                              <ProblemRow problem={problem} />
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
