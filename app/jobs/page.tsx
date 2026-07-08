"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import {
  CvAnalyzerHeader,
  type AnalyzerStep,
} from "@/components/jobs/cv-analyzer-header";
import { AnalysisProgress } from "@/components/jobs/analysis-progress";
import { ExperienceSelect } from "@/components/jobs/experience-select";
import { ResumeUploadZone } from "@/components/jobs/resume-upload-zone";
import { ResumeScorePanel } from "@/components/jobs/resume-score-panel";
import { ResumeHandoffActions } from "@/components/jobs/resume-handoff-actions";
import { JobSearchPanel } from "@/components/jobs/job-search-panel";
import { Button } from "@/components/ui/button";
import {
  consumeJobsHandoff,
  getFixedSinceLastReview,
  getScoreDelta,
  loadResumeAttempts,
  saveResumeAttempt,
} from "@/lib/jobs/job-search-storage";
import type { ExperienceLevel } from "@/types/job-search";
import type { ResumeReviewResult } from "@/types/resume-review";

function parseStep(raw: string | null): AnalyzerStep {
  if (raw === "analyzing" || raw === "report" || raw === "jobs") return raw;
  return "upload";
}

export default function AtsScorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");

  const [step, setStep] = useState<AnalyzerStep>(() => parseStep(stepParam));
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("3–6 years");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeReviewResult | null>(null);
  const [attempts, setAttempts] = useState(loadResumeAttempts());
  const [handoffKeywords, setHandoffKeywords] = useState<string[]>([]);
  const [handoffTitles, setHandoffTitles] = useState<string[]>([]);

  const navigateStep = useCallback(
    (next: AnalyzerStep) => {
      setStep(next);
      router.replace(`/jobs?step=${next}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    const parsed = parseStep(stepParam);
    setStep(parsed);
  }, [stepParam]);

  useEffect(() => {
    const handoff = consumeJobsHandoff();
    if (!handoff?.fromReview) return;

    if (handoff.resumeText) setResumeText(handoff.resumeText);
    if (handoff.jobTitle) setJobTitle(handoff.jobTitle);
    if (handoff.experienceLevel) setExperienceLevel(handoff.experienceLevel);
    if (handoff.missingKeywords) setHandoffKeywords(handoff.missingKeywords);
    if (handoff.suggestedTitles) setHandoffTitles(handoff.suggestedTitles);
    if (handoff.primaryKeywords) {
      setHandoffKeywords((prev) =>
        prev.length > 0 ? prev : handoff.primaryKeywords!.split(" "),
      );
    }
  }, []);

  const review = useCallback(async () => {
    if (!resumeText || resumeText.length < 200) {
      setError("Upload a resume with at least 200 characters of text.");
      return;
    }
    setLoading(true);
    setError(null);
    navigateStep("analyzing");

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
        navigateStep("upload");
        return;
      }
      const reviewResult = data as ResumeReviewResult;
      setResult(reviewResult);
      const updatedAttempts = saveResumeAttempt(reviewResult);
      setAttempts(updatedAttempts);
      navigateStep("report");
    } catch {
      setError("Network error. Try again.");
      navigateStep("upload");
    } finally {
      setLoading(false);
    }
  }, [resumeText, jobTitle, experienceLevel, navigateStep]);

  const scoreDelta = getScoreDelta(attempts);
  const fixedSinceLastReview = getFixedSinceLastReview(attempts);
  const hasReport = Boolean(result);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <CvAnalyzerHeader
          activeStep={step}
          hasReport={hasReport}
          onStepClick={navigateStep}
        />

        {step === "upload" ? (
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
      ) : null}

      {step === "analyzing" && loading ? (
        <AnalysisProgress active={loading} />
      ) : null}

      {step === "report" && result ? (
        <div className="min-h-0 space-y-6 overflow-y-auto overscroll-contain">
          <ResumeScorePanel
            result={result}
            jobTitle={jobTitle.trim() || undefined}
            attempts={attempts}
            scoreDelta={scoreDelta}
            fixedSinceLastReview={fixedSinceLastReview}
          />
          {resumeText ? (
            <ResumeHandoffActions
              result={result}
              resumeText={resumeText}
              jobTitle={jobTitle}
              experienceLevel={experienceLevel}
            />
          ) : null}
        </div>
      ) : null}

      {step === "jobs" ? (
        <JobSearchPanel
          resumeText={resumeText ?? ""}
          initialJobTitle={jobTitle}
          initialExperience={experienceLevel}
          initialKeywords={handoffKeywords}
          initialSuggestedTitles={handoffTitles}
        />
      ) : null}
      </div>
    </div>
  );
}
