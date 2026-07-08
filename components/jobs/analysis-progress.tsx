"use client";

import { useEffect, useState } from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Scanning your CV structure",
  "Checking ATS compatibility",
  "Matching against job requirements",
  "Preparing your report",
] as const;

type Props = {
  active: boolean;
};

export function AnalysisProgress({ active }: Props) {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setCompletedSteps(0);
      return;
    }

    const start = Date.now();
    const duration = 55_000;

    const tick = () => {
      const elapsed = Date.now() - start;
      const ratio = Math.min(elapsed / duration, 0.92);
      const eased = 1 - Math.pow(1 - ratio, 2);
      const pct = Math.round(eased * 100);
      setProgress(pct);

      if (pct >= 15) setCompletedSteps(1);
      if (pct >= 40) setCompletedSteps(2);
      if (pct >= 70) setCompletedSteps(3);
      if (pct >= 90) setCompletedSteps(4);

      if (ratio < 0.92) {
        requestAnimationFrame(tick);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    if (!active && progress > 0) {
      setProgress(100);
      setCompletedSteps(4);
    }
  }, [active, progress]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-12">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-primary transition-[stroke-dashoffset] duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold tabular-nums text-primary">
            {progress}%
          </span>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Analyzing your CV…</h2>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        Your CV is being checked. For the best results, this takes about a
        minute — please don&apos;t close this tab.
      </p>

      <ul className="mt-8 w-full max-w-sm space-y-3">
        {STEPS.map((label, i) => {
          const done = i < completedSteps;
          const current = i === completedSteps && active;
          return (
            <li key={label} className="flex items-center gap-3 text-sm">
              {done ? (
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <Circle
                  className={cn(
                    "h-4 w-4 shrink-0",
                    current ? "fill-primary text-primary" : "text-muted-foreground",
                  )}
                />
              )}
              <span
                className={cn(
                  done
                    ? "text-foreground"
                    : current
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
