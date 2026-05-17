"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { recognitionDrills } from "@/data/recognition-drills";
import { recordTrainerAnswer } from "@/lib/storage/learning-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Mode = "practice" | "timed";

export function RecognitionQuiz({ mode }: { mode: Mode }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const drills = useMemo(() => {
    return [...recognitionDrills].sort(
      (a, b) =>
        ({ easy: 0, medium: 1, hard: 2 }[a.difficulty] ?? 0) -
        ({ easy: 0, medium: 1, hard: 2 }[b.difficulty] ?? 0),
    );
  }, []);

  const drill = drills[index % drills.length];

  const next = useCallback(() => {
    setSelected(null);
    setRevealed(false);
    setIndex((i) => (i + 1) % drills.length);
    if (mode === "timed") setTimeLeft(60);
  }, [drills.length, mode]);

  useEffect(() => {
    if (mode !== "timed" || revealed) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          next();
          return 60;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [mode, revealed, next]);

  const submit = () => {
    if (!selected || revealed) return;
    const correct = selected === drill.correctPatternSlug;
    recordTrainerAnswer(drill.id, drill.correctPatternSlug, correct);
    setStreak((s) => (correct ? s + 1 : 0));
    setRevealed(true);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{drill.difficulty}</Badge>
        {mode === "timed" && (
          <span className="text-sm tabular-nums text-muted-foreground">
            {timeLeft}s left
          </span>
        )}
        <span className="text-sm text-muted-foreground">
          Streak: <strong className="text-foreground">{streak}</strong>
        </span>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Which pattern fits?
        </h2>
        <p className="mt-3 text-base leading-relaxed">{drill.statement}</p>

        <div className="mt-6 grid gap-2">
          {drill.options.map((opt) => (
            <button
              key={opt.slug}
              type="button"
              disabled={revealed}
              onClick={() => setSelected(opt.slug)}
              className={cn(
                "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                selected === opt.slug
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-muted/50",
                revealed &&
                  opt.slug === drill.correctPatternSlug &&
                  "border-emerald-500 bg-emerald-500/10",
                revealed &&
                  selected === opt.slug &&
                  opt.slug !== drill.correctPatternSlug &&
                  "border-destructive bg-destructive/10",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {!revealed ? (
          <Button className="mt-4" disabled={!selected} onClick={submit}>
            Check answer
          </Button>
        ) : (
          <div className="mt-6 space-y-4 border-t border-border pt-4">
            <p className="text-sm">
              <strong>Why this works:</strong> {drill.whyCorrect}
            </p>
            {selected && selected !== drill.correctPatternSlug && (
              <p className="text-sm text-destructive">
                <strong>Your choice:</strong>{" "}
                {drill.whyWrong[selected] ?? "Not the best fit for this problem."}
              </p>
            )}
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Recognition signals
              </p>
              <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                {drill.signals.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <Button onClick={next}>Next drill</Button>
          </div>
        )}
      </div>
    </div>
  );
}
