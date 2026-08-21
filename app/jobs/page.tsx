"use client";

import { useCallback, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { CvAnalyzerHeader } from "@/components/jobs/cv-analyzer-header";
import { AnalysisProgress } from "@/components/jobs/analysis-progress";
import { ExperienceSelect } from "@/components/jobs/experience-select";
import { ResumeUploadZone } from "@/components/jobs/resume-upload-zone";
import { ResumeScorePanel } from "@/components/jobs/resume-score-panel";
import { ResumeHandoffActions } from "@/components/jobs/resume-handoff-actions";
import { Button } from "@/components/ui/button";
import {
  getFixedSinceLastReview,
  getScoreDelta,
  loadResumeAttempts,
  saveResumeAttempt,
} from "@/lib/jobs/job-search-storage";
import type { ExperienceLevel } from "@/types/job-search";
import type { ResumeReviewResult } from "@/types/resume-review";

export default function CvAnalyzerPage() {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("3–6 years");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeReviewResult | null>(null);
  const [attempts, setAttempts] = useState(loadResumeAttempts);

  const review = useCallback(async () => {
    if (!resumeText || resumeText.length < 200) {
      setError("Upload a resume with at least 200 characters of text.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

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
      const reviewResult = data as ResumeReviewResult;
      setResult(reviewResult);
      setAttempts(saveResumeAttempt(reviewResult));
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, [resumeText, jobTitle, experienceLevel]);

  const scoreDelta = getScoreDelta(attempts);
  const fixedSinceLastReview = getFixedSinceLastReview(attempts);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <CvAnalyzerHeader />

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="space-y-4">
            <ResumeUploadZone
              onTextExtracted={(text) => {
                setResumeText(text);
                setError(null);
                setResult(null);
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
                  placeholder="e.g. Senior Full Stack Engineer"
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

        {loading ? <AnalysisProgress active={loading} /> : null}

        {!loading && result ? (
          <div className="space-y-6">
            <ResumeScorePanel
              result={result}
              jobTitle={jobTitle.trim() || undefined}
              attempts={attempts}
              scoreDelta={scoreDelta}
              fixedSinceLastReview={fixedSinceLastReview}
            />
            <ResumeHandoffActions result={result} jobTitle={jobTitle} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
