"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import type { RoadmapPhase } from "@/types/dsa-sheet";
import {
  countPhaseSubtopics,
  countPhaseTopics,
} from "@/lib/dsa-sheet/roadmap-utils";
import { cn } from "@/lib/utils";

const PHASE_ACCENTS = [
  "from-emerald-500/25 via-emerald-500/5 to-transparent",
  "from-teal-500/25 via-teal-500/5 to-transparent",
  "from-cyan-500/25 via-cyan-500/5 to-transparent",
  "from-sky-500/25 via-sky-500/5 to-transparent",
  "from-blue-500/25 via-blue-500/5 to-transparent",
  "from-indigo-500/25 via-indigo-500/5 to-transparent",
  "from-violet-500/20 via-violet-500/5 to-transparent",
  "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
  "from-rose-500/20 via-rose-500/5 to-transparent",
  "from-orange-500/25 via-orange-500/5 to-transparent",
  "from-amber-500/25 via-amber-500/5 to-transparent",
  "from-lime-500/25 via-lime-500/5 to-transparent",
  "from-green-500/25 via-green-500/5 to-transparent",
  "from-stone-500/25 via-stone-500/5 to-transparent",
] as const;

type Props = {
  phases: RoadmapPhase[];
  stats: { phases: number; topics: number; subtopics: number };
};

export function DsaSheetOverview({ phases, stats }: Props) {
  return (
    <div className="w-full min-w-0 px-4 py-8 sm:px-5 lg:px-8">
      <header className="mb-8 max-w-3xl space-y-3 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          ChampDSA roadmap
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          DSA Sheet
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A structured path from fundamentals to advanced DP — {stats.phases}{" "}
          phases, {stats.topics} topics, {stats.subtopics} subtopics. Open a
          phase to expand topics and drill into each idea.
        </p>
        <div className="flex flex-wrap gap-4 pt-1 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Layers className="size-3.5 text-primary" />
            {stats.phases} phases
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="size-3.5 text-primary" />
            {stats.topics} topics
          </span>
        </div>
      </header>

      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {phases.map((phase) => {
          const topicCount = countPhaseTopics(phase);
          const subCount = countPhaseSubtopics(phase);
          const accent = PHASE_ACCENTS[phase.phase % PHASE_ACCENTS.length];
          return (
            <li key={phase.id}>
              <Link
                href={`/dsa-sheet/${phase.id}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all",
                  "hover:border-primary/40 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.12)]",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
                    accent,
                  )}
                  aria-hidden
                />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-medium text-primary">
                      Phase {phase.phase}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight">
                    {phase.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {topicCount} topics · {subCount} subtopics
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
