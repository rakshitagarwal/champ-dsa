"use client";

import { useCallback, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { ExperienceSelect } from "@/components/jobs/experience-select";
import { ResumeUploadZone } from "@/components/jobs/resume-upload-zone";
import { ResumeScorePanel } from "@/components/jobs/resume-score-panel";
import { Button } from "@/components/ui/button";
import type { ExperienceLevel } from "@/types/job-search";
import type { ResumeReviewResult } from "@/types/resume-review";

export default function AtsScorePage() {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("3–6 years");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeReviewResult | null>(null);

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
      setResult(data as ResumeReviewResult);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, [resumeText, jobTitle, experienceLevel]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">ATS Score</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload your resume as PDF or DOCX and get an ATS compatibility score
          with actionable feedback to improve your chances.
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="space-y-4">
          <ResumeUploadZone
            onTextExtracted={(text) => {
              setResumeText(text);
              setError(null);
            }}
            onClear={() => {
              setResumeText(null);
              setResult(null);
            }}
            disabled={loading}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="target-title" className="text-sm font-medium">
                Target job title{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
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
              <label htmlFor="exp" className="text-sm font-medium">
                Experience
              </label>
              <ExperienceSelect
                id="exp"
                value={experienceLevel}
                onChange={setExperienceLevel}
                className="mt-1.5"
              />
            </div>
          </div>

          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={loading || !resumeText}
            onClick={() => void review()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Score my resume
          </Button>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[280px] items-center justify-center gap-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Analyzing your resume…</p>
        </div>
      ) : result ? (
        <ResumeScorePanel
          result={result}
          jobTitle={jobTitle.trim() || undefined}
        />
      ) : null}
    </div>
  );
}
