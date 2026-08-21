"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileCheck,
  FileText,
  Flame,
  PenLine,
  Target,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { getAllPatterns, getPatternBySlug } from "@/data/patterns";
import { getQuestionById } from "@/data/questions";
import {
  getDailyProgress,
  getOverallProgress,
  getStreak,
  getStore,
  LEARNING_UPDATED_EVENT,
} from "@/lib/storage/learning-store";
import { getQuestionsByPattern } from "@/lib/learning/pattern-questions";
import { OnboardingChecklist } from "./onboarding-checklist";

export function LearningHub() {
  const [overall, setOverall] = useState(0);
  const [streak, setStreak] = useState(0);
  const [daily, setDaily] = useState({ completed: 0, goal: 2 });
  const [lastLabel, setLastLabel] = useState<string | null>(null);

  const refresh = () => {
    const byPattern = getQuestionsByPattern();
    setOverall(
      getOverallProgress(
        getAllPatterns().map((p) => p.slug),
        byPattern,
      ),
    );
    setStreak(getStreak());
    setDaily(getDailyProgress());
    const last = getStore().profile.lastVisited;
    if (!last) {
      setLastLabel(null);
      return;
    }
    if (last.type === "pattern") {
      setLastLabel(getPatternBySlug(last.slugOrId)?.name ?? last.slugOrId);
    } else if (last.type === "question") {
      setLastLabel(getQuestionById(last.slugOrId)?.title ?? last.slugOrId);
    } else {
      setLastLabel("Tips & Tricks");
    }
  };

  useEffect(() => {
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Continue your DSA path or recap fundamentals when you need them.
        </p>
      </header>

      <OnboardingChecklist />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Target className="h-5 w-5 text-primary" />}
          label="Overall progress"
          value={`${overall}%`}
        />
        <StatCard
          icon={<Flame className="h-5 w-5 text-orange-500" />}
          label="Learning streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
        />
        <StatCard
          icon={<PenLine className="h-5 w-5 text-primary" />}
          label="Daily goal"
          value={`${daily.completed}/${daily.goal}`}
        />
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold">Continue learning DSA</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Study patterns, solve problems, and review explanations.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {lastLabel && (
            <Link
              href={
                getStore().profile.lastVisited?.type === "question"
                  ? "/practice"
                  : getStore().profile.lastVisited?.type === "pattern"
                    ? `/patterns/${getStore().profile.lastVisited?.slugOrId}`
                    : "/tips"
              }
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Resume: {lastLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" />
            DSA patterns
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted/50"
          >
            <PenLine className="h-4 w-4" />
            Practice sheet
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold">CV Analyzer</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload your resume for an ATS score, keyword gaps, and line-level rewrites.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <FileCheck className="h-4 w-4" />
            Score my resume
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-dashed border-border bg-muted/20 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick recap
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Not learning new material — just refreshing what you already know.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <BookOpen className="h-4 w-4" />
            DSA pattern recap
          </Link>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <FileText className="h-4 w-4" />
            Notes
          </Link>
          <Link
            href="/tips"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <Lightbulb className="h-4 w-4" />
            Tips & Tricks
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
