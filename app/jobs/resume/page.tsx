"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles } from "lucide-react";
import { ExperienceSelect } from "@/components/jobs/experience-select";
import { ResumeHandoffActions } from "@/components/jobs/resume-handoff-actions";
import { ResumeUploadZone } from "@/components/jobs/resume-upload-zone";
import { ResumeScorePanel } from "@/components/jobs/resume-score-panel";
import { ScoreComparison } from "@/components/jobs/score-comparison";
import { Button } from "@/components/ui/button";
import type { ExperienceLevel } from "@/types/job-search";
import type { ResumeAttempt, ResumeReviewResult } from "@/types/resume-review";

export default function ResumeReviewPage() {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("3–6 years");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleHint, setTitleHint] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<ResumeAttempt[]>([]);
  const [latest, setLatest] = useState<ResumeReviewResult | null>(null);

  const review = useCallback(async () => {
    if (!resumeText || resumeText.length < 200) {
      setError("Upload a resume with at least 200 characters of text.");
      return;
    }

    if (!jobTitle.trim()) {
      setTitleHint(
        "Adding a target job title gives more accurate keyword and skills feedback.",
      );
    } else {
      setTitleHint(null);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/resume-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobTitle: jobTitle.trim() || undefined,
          experienceLevel,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Review failed.");
        return;
      }

      const result = data as ResumeReviewResult;
      setLatest(result);
      setAttempts((prev) => [
        ...prev,
        {
          attemptNumber: prev.length + 1,
          result,
          reviewedAt: new Date(),
        },
      ]);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, [resumeText, jobTitle, experienceLevel]);

  return (
    <div className="space-y-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Resume review</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Get a score, ATS keyword gaps, and section-level fixes. Re-upload
          after edits to compare — your file stays in the browser only.
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card p-4 lg:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(9rem,0.7fr)_auto] lg:items-end">
          <div className="min-w-0">
            <label className="text-sm font-medium">Resume file</label>
            <ResumeUploadZone
              className="mt-1.5"
              variant="compact"
              onTextExtracted={(text) => {
                setResumeText(text);
                setError(null);
              }}
              onClear={() => setResumeText(null)}
              disabled={loading}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="target-title" className="text-sm font-medium">
              Target job title{" "}
              <span className="font-normal text-muted-foreground">
                (recommended)
              </span>
            </label>
            <input
              id="target-title"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                if (e.target.value.trim()) setTitleHint(null);
              }}
              placeholder="e.g. Full Stack Developer"
              className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="exp-resume" className="text-sm font-medium">
              Experience
            </label>
            <ExperienceSelect
              id="exp-resume"
              value={experienceLevel}
              onChange={setExperienceLevel}
              className="mt-1.5"
            />
          </div>

          <Button
            type="button"
            className="h-10 w-full shrink-0 lg:w-auto"
            disabled={loading || !resumeText}
            onClick={() => void review()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Review resume
          </Button>
        </div>

        {titleHint ? (
          <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
            {titleHint}
          </p>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Tailors ATS keywords and skills match to your goal role. AI feedback
            is guidance only — remove sensitive data if concerned.
          </p>
        )}

        {error ? (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        ) : null}
      </div>

      <section className="w-full min-h-[320px]">
        {loading && !latest ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Analyzing your resume…</p>
          </div>
        ) : latest && resumeText ? (
          <div className="space-y-6">
            <ResumeHandoffActions
              result={latest}
              resumeText={resumeText}
              jobTitle={jobTitle}
              experienceLevel={experienceLevel}
            />
            <ScoreComparison attempts={attempts} />
            <ResumeScorePanel
              result={latest}
              jobTitle={jobTitle.trim() || undefined}
              attemptLabel={
                attempts.length > 1
                  ? `Attempt ${attempts.length} (latest)`
                  : undefined
              }
            />
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            <Sparkles className="mb-3 h-10 w-10 opacity-40" />
            <p>Upload a resume and click Review to see your score.</p>
            <p className="mt-2">
              Then{" "}
              <Link href="/jobs" className="text-primary hover:underline">
                search jobs
              </Link>{" "}
              with AI-matched keywords.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
