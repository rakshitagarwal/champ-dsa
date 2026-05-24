"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles } from "lucide-react";
import { ExperienceSelect } from "@/components/jobs/experience-select";
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
  const [attempts, setAttempts] = useState<ResumeAttempt[]>([]);
  const [latest, setLatest] = useState<ResumeReviewResult | null>(null);

  const review = useCallback(async () => {
    if (!resumeText || resumeText.length < 200) {
      setError("Upload a resume with at least 200 characters of text.");
      return;
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
    <div className="space-y-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Resume review</h1>
        <p className="mt-3 text-muted-foreground">
          Upload your resume for a Groq-powered score and actionable fixes.
          Re-upload after editing to compare scores — nothing is stored on our
          servers.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <aside className="space-y-5 rounded-xl border border-border bg-card p-5">
          <ResumeUploadZone
            onTextExtracted={(text) => {
              setResumeText(text);
              setError(null);
            }}
            onClear={() => setResumeText(null)}
            disabled={loading}
          />

          <div>
            <label htmlFor="target-title" className="text-sm font-medium">
              Target job title (optional)
            </label>
            <input
              id="target-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label htmlFor="exp-resume" className="text-sm font-medium">
              Experience level
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
            className="w-full"
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

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <p className="text-xs text-muted-foreground">
            AI feedback is guidance only. Remove sensitive data if concerned.
            Ready to search?{" "}
            <Link href="/jobs" className="text-primary hover:underline">
              Find jobs
            </Link>
            .
          </p>
        </aside>

        <section className="min-h-[320px]">
          {loading && !latest ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Analyzing your resume with Groq…</p>
            </div>
          ) : latest ? (
            <div className="space-y-6">
              <ScoreComparison attempts={attempts} />
              <ResumeScorePanel
                result={latest}
                attemptLabel={
                  attempts.length > 1
                    ? `Attempt ${attempts.length} (latest)`
                    : undefined
                }
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              <Sparkles className="mb-3 h-10 w-10 opacity-40" />
              <p>Upload a resume and click Review to see your score.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
