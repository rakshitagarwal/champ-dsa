const PATTERN_DONE_KEY = "champdsa-patterns-done";

function loadDone(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PATTERN_DONE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveDone(slugs: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PATTERN_DONE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event("champdsa-pattern-done"));
}

export function isPatternDone(slug: string): boolean {
  return loadDone().includes(slug);
}

export function markPatternDone(slug: string) {
  const done = loadDone();
  if (!done.includes(slug)) {
    saveDone([...done, slug]);
  }
}

export function unmarkPatternDone(slug: string) {
  saveDone(loadDone().filter((s) => s !== slug));
}

export function togglePatternDone(slug: string): boolean {
  if (isPatternDone(slug)) {
    unmarkPatternDone(slug);
    return false;
  }
  markPatternDone(slug);
  return true;
}

export function getPatternCompletionStats(totalPatterns: number) {
  const done = loadDone();
  return {
    completed: done.length,
    total: totalPatterns,
    doneSlugs: done,
  };
}
