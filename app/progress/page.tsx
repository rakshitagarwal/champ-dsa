"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllQuestions } from "@/data/questions";
import { getAllPatterns } from "@/data/patterns";
import {
  getProgress,
  getWeakPatterns,
  getDueRevision,
  getPatternMastery,
  getStore,
  LEARNING_UPDATED_EVENT,
} from "@/lib/storage/learning-store";
import {
  getQuestionsByPattern,
  getQuestionPatternMap,
} from "@/lib/learning/pattern-questions";
import { QuestionCard } from "@/components/bank/question-card";

export default function ProgressPage() {
  const [weak, setWeak] = useState<{ pattern: string; count: number }[]>([]);
  const [dueIds, setDueIds] = useState<string[]>([]);
  const questions = getAllQuestions();
  const patterns = getAllPatterns();
  const byPattern = getQuestionsByPattern();

  useEffect(() => {
    const refresh = () => {
      setWeak(getWeakPatterns(getQuestionPatternMap()));
      setDueIds(
        getDueRevision(getAllQuestions().map((q) => q.id)).slice(0, 12),
      );
    };
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
  }, []);

  const solvedCount = questions.filter(
    (q) => getProgress(q.id).status === "solved",
  ).length;

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekActivity = weekDays.map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return getStore().profile.dailyCompleted[key] ?? 0;
  });
  const maxWeek = Math.max(1, ...weekActivity);

  return (
    <div className="w-full space-y-10 px-4 py-8 lg:px-10">
      <header>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Your progress</h1>
        <p className="mt-2 text-muted-foreground">
          {solvedCount} of {questions.length} questions solved
        </p>
      </header>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground">
          This week
        </h2>
        <div className="mt-3 flex items-end gap-2 h-32">
          {weekDays.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-primary/80"
                style={{
                  height: `${(weekActivity[i] / maxWeek) * 100}%`,
                  minHeight: weekActivity[i] ? 8 : 4,
                }}
              />
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold">Pattern mastery</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {patterns.map((p) => {
            const pct = getPatternMastery(p.slug, byPattern[p.slug] ?? []);
            return (
              <div
                key={p.slug}
                className="rounded-lg border border-border p-2 text-center"
                title={p.name}
              >
                <div
                  className="mx-auto mb-1 h-8 w-8 rounded-md"
                  style={{
                    background: `color-mix(in oklch, var(--primary) ${pct}%, var(--muted))`,
                  }}
                />
                <p className="truncate text-[10px] font-medium">{p.name}</p>
                <p className="text-[10px] text-muted-foreground">{pct}%</p>
              </div>
            );
          })}
        </div>
      </section>

      {weak.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold">Weak patterns</h2>
          <ul className="flex flex-wrap gap-2">
            {weak.map((w) => (
              <li
                key={w.pattern}
                className="rounded-full border border-border px-3 py-1 text-sm"
              >
                {patterns.find((p) => p.slug === w.pattern)?.name ?? w.pattern}
                <span className="ml-1 text-muted-foreground">({w.count})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {dueIds.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold">Due for revision</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {dueIds.map((id) => {
              const q = questions.find((x) => x.id === id);
              if (!q) return null;
              return <QuestionCard key={id} question={q} />;
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 font-semibold">Question stats</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-3 py-2">Question</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Attempts</th>
                <th className="px-3 py-2">Hints</th>
                <th className="px-3 py-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {questions
                .filter((q) => getProgress(q.id).attempts > 0 || getProgress(q.id).status === "solved")
                .slice(0, 30)
                .map((q) => {
                  const p = getProgress(q.id);
                  return (
                    <tr key={q.id} className="border-b border-border/50">
                      <td className="px-3 py-2">
                        <Link
                          href={`/practice/${q.id}`}
                          className="hover:text-primary"
                        >
                          {q.title}
                        </Link>
                      </td>
                      <td className="px-3 py-2 capitalize">{p.status}</td>
                      <td className="px-3 py-2 tabular-nums">{p.attempts}</td>
                      <td className="px-3 py-2 tabular-nums">{p.hintsUsed}</td>
                      <td className="px-3 py-2 tabular-nums">
                        {p.confidence ?? "—"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
