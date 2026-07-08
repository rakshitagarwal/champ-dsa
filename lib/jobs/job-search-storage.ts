import {
  JOB_LOCATIONS,
  type ExperienceLevel,
  type JobLocation,
} from "@/types/job-search";
import type { ResumeAttempt, ResumeReviewResult } from "@/types/resume-review";

const PREFS_KEY = "champdsa-job-search-prefs";
const FAVORITES_KEY = "champdsa-portal-favorites";
const HANDOFF_KEY = "champdsa-jobs-handoff";
const ATTEMPTS_KEY = "champdsa-resume-attempts";
const MAX_FAVORITES = 3;
const MAX_ATTEMPTS = 5;

export type JobSearchPrefs = {
  jobTitle: string;
  experienceLevel: ExperienceLevel;
  locations: JobLocation[];
};

export type JobsHandoff = {
  fromReview?: boolean;
  resumeText?: string;
  jobTitle?: string;
  experienceLevel?: ExperienceLevel;
  missingKeywords?: string[];
  suggestedTitles?: string[];
  primaryKeywords?: string;
};

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

const LEGACY_LOCATION_MAP: Record<string, JobLocation> = {
  "Delhi NCR": "Delhi",
};

export function sanitizeJobLocations(
  locations: string[] | JobLocation[],
): JobLocation[] {
  const allowed = new Set<string>(JOB_LOCATIONS);
  const out: JobLocation[] = [];
  for (const raw of locations) {
    const mapped = LEGACY_LOCATION_MAP[raw] ?? raw;
    if (allowed.has(mapped) && !out.includes(mapped as JobLocation)) {
      out.push(mapped as JobLocation);
    }
  }
  return out;
}

export function loadJobSearchPrefs(): JobSearchPrefs | null {
  const prefs = readJson<JobSearchPrefs>(PREFS_KEY);
  if (!prefs) return null;
  const locations = sanitizeJobLocations(prefs.locations);
  if (locations.length === 0) return null;
  return { ...prefs, locations };
}

export function saveJobSearchPrefs(prefs: JobSearchPrefs) {
  writeJson(PREFS_KEY, prefs);
}

export function loadPortalFavorites(): string[] {
  const raw = readJson<string[]>(FAVORITES_KEY);
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, MAX_FAVORITES);
}

export function savePortalFavorites(ids: string[]) {
  writeJson(FAVORITES_KEY, ids.slice(0, MAX_FAVORITES));
}

export function togglePortalFavorite(id: string): string[] {
  const current = loadPortalFavorites();
  const next = current.includes(id)
    ? current.filter((f) => f !== id)
    : current.length >= MAX_FAVORITES
      ? [...current.slice(1), id]
      : [...current, id];
  savePortalFavorites(next);
  return next;
}

export function saveJobsHandoff(handoff: JobsHandoff) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff));
}

export function consumeJobsHandoff(): JobsHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(HANDOFF_KEY);
    return JSON.parse(raw) as JobsHandoff;
  } catch {
    return null;
  }
}

export function peekJobsHandoff(): JobsHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JobsHandoff;
  } catch {
    return null;
  }
}

export function sortPortalsByFavorites<T extends { id: string }>(
  portals: T[],
  favorites: string[],
): T[] {
  if (favorites.length === 0) return portals;
  const order = new Map(favorites.map((id, i) => [id, i]));
  return [...portals].sort((a, b) => {
    const aRank = order.has(a.id) ? order.get(a.id)! : favorites.length;
    const bRank = order.has(b.id) ? order.get(b.id)! : favorites.length;
    return aRank - bRank;
  });
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
  const updated = [...existing.map((a) => ({
    attemptNumber: a.attemptNumber,
    result: a.result,
    reviewedAt: a.reviewedAt.toISOString(),
  })), next].slice(-MAX_ATTEMPTS);
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

export function getFixedSinceLastReview(
  attempts: ResumeAttempt[],
): string[] {
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
