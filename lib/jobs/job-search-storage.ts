import type { ResumeAttempt, ResumeReviewResult } from "@/types/resume-review";

const ATTEMPTS_KEY = "champdsa-resume-attempts";
const MAX_ATTEMPTS = 5;

export type StoredResumeAttempt = {
  attemptNumber: number;
  result: ResumeReviewResult;
  reviewedAt: string;
};

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadResumeAttempts(): ResumeAttempt[] {
  const stored = readJson<StoredResumeAttempt[]>(ATTEMPTS_KEY);
  if (!Array.isArray(stored)) return [];
  return stored.map((a) => ({
    attemptNumber: a.attemptNumber,
    result: a.result,
    reviewedAt: new Date(a.reviewedAt),
  }));
}

export function saveResumeAttempt(result: ResumeReviewResult): ResumeAttempt[] {
  const existing = loadResumeAttempts();
  const next: StoredResumeAttempt = {
    attemptNumber: existing.length + 1,
    result,
    reviewedAt: new Date().toISOString(),
  };
  const updated = [
    ...existing.map((a) => ({
      attemptNumber: a.attemptNumber,
      result: a.result,
      reviewedAt: a.reviewedAt.toISOString(),
    })),
    next,
  ].slice(-MAX_ATTEMPTS);
  writeJson(ATTEMPTS_KEY, updated);
  return loadResumeAttempts();
}

export function getScoreDelta(
  attempts: ResumeAttempt[],
): { delta: number; previousScore: number } | null {
  if (attempts.length < 2) return null;
  const prev = attempts[attempts.length - 2];
  const curr = attempts[attempts.length - 1];
  return {
    delta: curr.result.overallScore - prev.result.overallScore,
    previousScore: prev.result.overallScore,
  };
}

export function getFixedSinceLastReview(attempts: ResumeAttempt[]): string[] {
  if (attempts.length < 2) return [];
  const prev = attempts[attempts.length - 2].result;
  const curr = attempts[attempts.length - 1].result;

  const prevIssues = new Set([
    ...prev.topFixes,
    ...prev.lineFixes.map((f) => f.originalLine),
  ]);

  const fixed: string[] = [];
  for (const fix of prev.topFixes) {
    if (!curr.topFixes.includes(fix)) fixed.push(fix);
  }
  for (const fix of prev.lineFixes) {
    const stillPresent = curr.lineFixes.some(
      (f) => f.originalLine === fix.originalLine,
    );
    if (!stillPresent && prevIssues.has(fix.originalLine)) {
      fixed.push(fix.originalLine);
    }
  }
  return fixed;
}
