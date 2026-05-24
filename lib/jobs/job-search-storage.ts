import type { ExperienceLevel, JobLocation } from "@/types/job-search";

const PREFS_KEY = "champdsa-job-search-prefs";
const FAVORITES_KEY = "champdsa-portal-favorites";
const HANDOFF_KEY = "champdsa-jobs-handoff";
const MAX_FAVORITES = 3;

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

export function loadJobSearchPrefs(): JobSearchPrefs | null {
  return readJson<JobSearchPrefs>(PREFS_KEY);
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
