"use client";

import { useMemo, useState } from "react";
import type { SolutionEntry, SolutionGroup } from "@/data/solutions/types";
import { NoteDocumentBody } from "@/components/notes/note-document-body";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";
import { cn } from "@/lib/utils";

type Props = {
  groups: SolutionGroup[];
  total: number;
};

const DIFF_CLASS: Record<string, string> = {
  Easy: "text-emerald-500",
  Medium: "text-amber-500",
  Hard: "text-rose-500",
};

function SolutionCard({ entry }: { entry: SolutionEntry }) {
  const segments = useMemo(
    () => parseNoteSegments(entry.body, { enableRunnable: false }),
    [entry.body],
  );
  return (
    <article id={entry.lcSlug} className="scroll-mt-20 border-t border-border pt-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-sm tabular-nums text-muted-foreground">
          #{entry.id}
        </span>
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">
          {entry.title}
        </h3>
        <span className={cn("text-xs font-bold", DIFF_CLASS[entry.diff])}>
          {entry.diff}
        </span>
        {entry.premium ? (
          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
            Premium
          </span>
        ) : null}
      </div>
      <div className="note-document mt-3">
        <NoteDocumentBody segments={segments} />
      </div>
    </article>
  );
}

function IntroPanel({
  total,
  easy,
  medium,
  hard,
  premium,
}: {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  premium: number;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
        ChampDSA · Solutions
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">Introduction</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        {total} high-value LeetCode problems grouped by the pattern to
        recognize — not just by LeetCode&apos;s tags. Every question has its
        name, a link to open it on LeetCode, and a JavaScript solution with
        Hinglish comments.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card/90 px-3 py-4 text-center">
          <p className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">
            {total}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Problems</p>
        </div>
        <div className="rounded-xl border border-border bg-card/90 px-3 py-4 text-center">
          <p className="text-2xl font-bold tabular-nums text-emerald-500 sm:text-3xl">
            {easy}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Easy</p>
        </div>
        <div className="rounded-xl border border-border bg-card/90 px-3 py-4 text-center">
          <p className="text-2xl font-bold tabular-nums text-amber-500 sm:text-3xl">
            {medium}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Medium</p>
        </div>
        <div className="rounded-xl border border-border bg-card/90 px-3 py-4 text-center">
          <p className="text-2xl font-bold tabular-nums text-rose-500 sm:text-3xl">
            {hard}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Hard</p>
        </div>
      </div>
      <h3 className="mt-8 text-lg font-semibold">How to use this page</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          Pick a topic on the left to filter — each group matches one problem
          family (arrays, graphs, DP, and so on).
        </li>
        <li>
          Use search for a problem name, slug, or number, and the difficulty
          dropdown to narrow further.
        </li>
        <li>
          Don&apos;t memorize solutions — learn the trigger, the invariant,
          and the template behind each pattern.
        </li>
        <li>
          {premium} questions need LeetCode premium to open — their solutions
          are still included here.
        </li>
      </ul>
    </div>
  );
}

export function SolutionsExplorer({ groups, total }: Props) {
  const [topicId, setTopicId] = useState<string>("intro");
  const [query, setQuery] = useState("");
  const [diff, setDiff] = useState("");

  const stats = useMemo(() => {
    let easy = 0,
      medium = 0,
      hard = 0,
      premium = 0;
    for (const g of groups) {
      for (const s of g.subs) {
        for (const t of s.topics) {
          if (t.diff === "Easy") easy++;
          else if (t.diff === "Medium") medium++;
          else hard++;
          if (t.premium) premium++;
        }
      }
    }
    return { easy, medium, hard, premium };
  }, [groups]);

  const visible = useMemo(() => {
    if (topicId === "intro") return [];
    const q = query.toLowerCase().trim();
    return groups
      .filter((g) => topicId === "all" || g.id === topicId)
      .map((g) => ({
        ...g,
        subs: g.subs
          .map((s) => ({
            ...s,
            topics: s.topics.filter(
              (t) =>
                (!q ||
                  t.title.toLowerCase().includes(q) ||
                  t.lcSlug.includes(q) ||
                  String(t.id) === q) &&
                (!diff || t.diff === diff),
            ),
          }))
          .filter((s) => s.topics.length > 0),
      }))
      .filter((g) => g.subs.length > 0);
  }, [groups, topicId, query, diff]);

  const visibleCount = visible.reduce(
    (n, g) => n + g.subs.reduce((m, s) => m + s.topics.length, 0),
    0,
  );

  const showingIntro = topicId === "intro";

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <aside className="absolute bottom-0 left-0 top-0 z-10 hidden w-60 flex-col overflow-hidden border-r border-border bg-panel/50 lg:flex">
        <div className="border-b border-border px-4 py-4">
          <p className="text-sm font-semibold text-foreground">Solutions</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Filter by topic to revise
          </p>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 scrollbar-hide">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Start here
          </p>
          <button
            onClick={() => setTopicId("intro")}
            className={cn(
              "mb-4 block w-full truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors",
              showingIntro
                ? "bg-primary/15 font-medium text-primary"
                : "text-foreground hover:bg-accent/50",
            )}
          >
            Introduction
          </button>
          <button
            onClick={() => setTopicId("all")}
            className={cn(
              "mb-2 block w-full truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors",
              topicId === "all"
                ? "bg-primary/15 font-medium text-primary"
                : "text-foreground hover:bg-accent/50",
            )}
          >
            All topics ({total})
          </button>
          {groups.map((g, gi) => {
            const count = g.subs.reduce((n, s) => n + s.topics.length, 0);
            const active = topicId === g.id;
            const num = String(gi + 1).padStart(2, "0");
            return (
              <div key={g.id} className="relative mb-1 ml-2 border-l border-border/80 pl-3">
                <span
                  className={cn(
                    "absolute -left-[7px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-background font-mono text-[9px] tabular-nums",
                    active
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground/70",
                  )}
                  aria-hidden
                >
                  {num}
                </span>
                <button
                  onClick={() => setTopicId(g.id)}
                  title={g.title}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                    active
                      ? "bg-primary/15 font-medium text-primary"
                      : "text-foreground hover:bg-accent/50",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{g.title}</span>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                    {count}
                  </span>
                </button>
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-60">
        <div className="shrink-0 border-b border-border px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problem, slug, or number…"
              className="min-h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <select
              value={diff}
              onChange={(e) => setDiff(e.target.value)}
              className="min-h-9 rounded-md border border-border bg-background px-2 text-sm outline-none focus:border-primary"
            >
              <option value="">All difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            <button
              onClick={() => setTopicId("intro")}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                showingIntro
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              Intro
            </button>
            <button
              onClick={() => setTopicId("all")}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                topicId === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              All ({total})
            </button>
            {groups.map((g) => {
              const count = g.subs.reduce((n, s) => n + s.topics.length, 0);
              const active = topicId === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setTopicId(g.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {g.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
            {showingIntro ? (
              <IntroPanel
                total={total}
                easy={stats.easy}
                medium={stats.medium}
                hard={stats.hard}
                premium={stats.premium}
              />
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  Showing {visibleCount} of {total} problems
                </p>
                {visible.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No matching problems.
                  </p>
                ) : null}
                <div className="space-y-12">
                  {visible.map((g) => (
                    <section key={g.id}>
                      <h2 className="border-b border-border pb-3 text-2xl font-bold tracking-tight">
                        {g.title}
                      </h2>
                      {g.subs.map((s) => (
                        <div key={s.title} className="mt-6">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            {s.title}
                          </h3>
                          <div className="mt-2 space-y-8">
                            {s.topics.map((t) => (
                              <SolutionCard key={t.lcSlug} entry={t} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </section>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
