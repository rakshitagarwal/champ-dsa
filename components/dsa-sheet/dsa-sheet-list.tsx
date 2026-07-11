"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Search } from "lucide-react";
import type { StriverQuestion, StriverSectionMeta } from "@/types/dsa-sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DSA_SHEET_UPDATED_EVENT,
  getCompletedCount,
  isStriverQuestionDone,
  toggleStriverQuestionDone,
} from "@/lib/storage/dsa-sheet-store";

type Props = {
  questions: StriverQuestion[];
  sections: StriverSectionMeta[];
};

function difficultyVariant(d?: string): "secondary" | "outline" | "warning" {
  if (d === "easy") return "secondary";
  if (d === "hard") return "warning";
  return "outline";
}

export function DsaSheetList({ questions, sections }: Props) {
  const searchParams = useSearchParams();
  const sectionFilter = searchParams.get("section");
  const [query, setQuery] = useState("");
  const [, tick] = useState(0);

  useEffect(() => {
    const refresh = () => tick((n) => n + 1);
    window.addEventListener(DSA_SHEET_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(DSA_SHEET_UPDATED_EVENT, refresh);
  }, []);

  const activeSection = sections.find((s) => s.id === sectionFilter);

  const filtered = useMemo(() => {
    let list = questions;
    if (sectionFilter && sectionFilter !== "all") {
      const ids = new Set(
        sections.find((s) => s.id === sectionFilter)?.questionIds ?? [],
      );
      list = list.filter((q) => ids.has(q.id));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.leetcodeSlug.includes(q),
      );
    }
    return list;
  }, [questions, sections, sectionFilter, query]);

  const completedInView = getCompletedCount(filtered.map((q) => q.id));

  return (
    <div className="w-full min-w-0 px-4 py-8 sm:px-5 lg:px-6">
      <header className="mb-6 space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight">DSA Sheet</h1>
        <p className="text-muted-foreground">
          Striver A2Z DSA Sheet — LeetCode problems only. Filter by topic on the
          left, solve on LeetCode, mark done here to track progress.{" "}
          <a
            href="https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            View on takeUforward
          </a>
        </p>
        <p className="text-sm font-medium text-primary">
          {completedInView} / {filtered.length} done
          {activeSection ? ` in ${activeSection.title}` : ""}
        </p>
      </header>

      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or slug…"
          className="h-9 w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No problems match your filter.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-10 px-3 py-3 text-xs font-medium text-muted-foreground">
                  Done
                </th>
                <th className="w-12 px-3 py-3 text-xs font-medium text-muted-foreground">
                  #
                </th>
                <th className="px-3 py-3 text-xs font-medium text-muted-foreground">
                  Problem
                </th>
                <th className="w-24 px-3 py-3 text-xs font-medium text-muted-foreground">
                  Difficulty
                </th>
                <th className="w-40 px-3 py-3 text-xs font-medium text-muted-foreground">
                  Links
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => {
                const done = isStriverQuestionDone(q.id);
                return (
                  <tr
                    key={q.id}
                    className={cn(
                      "border-b border-border/60 transition-colors last:border-0",
                      done && "bg-primary/5",
                    )}
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleStriverQuestionDone(q.id)}
                        className="size-4 rounded border-border"
                        aria-label={`Mark ${q.title} as done`}
                      />
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {q.sheetNumber}
                    </td>
                    <td className="px-3 py-3 font-medium">{q.title}</td>
                    <td className="px-3 py-3">
                      {q.difficulty ? (
                        <Badge
                          variant={difficultyVariant(q.difficulty)}
                          className="text-xs capitalize"
                        >
                          {q.difficulty}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={q.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          LeetCode
                          <ExternalLink className="size-3" />
                        </a>
                        {q.practiceId ? (
                          <Link
                            href={`/practice/${q.practiceId}`}
                            className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary hover:bg-primary/20"
                          >
                            Study here
                          </Link>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
