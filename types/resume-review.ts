import type { ExperienceLevel } from "@/types/job-search";

export type ResumeCategoryScore = {
  name: string;
  score: number;
  summary: string;
};

export type ResumeSectionScore = {
  name: string;
  score: number;
  summary: string;
  exampleFix: string;
};

export type ResumeLineFix = {
  section: string;
  originalLine: string;
  suggestedLine: string;
  reason: string;
};

export type ResumeReviewResult = {
  overallScore: number;
  categories: ResumeCategoryScore[];
  sections: ResumeSectionScore[];
  topFixes: string[];
  missingKeywords: string[];
  strongPoints: string[];
  oneLineVerdict: string;
  scoreExplanation: string;
  lineFixes: ResumeLineFix[];
};

export type ResumeReviewRequest = {
  resumeText: string;
  jobTitle?: string;
  experienceLevel?: ExperienceLevel;
};

export type ResumeAttempt = {
  attemptNumber: number;
  result: ResumeReviewResult;
  reviewedAt: Date;
};
