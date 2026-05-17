export type RevisionStage = 0 | 1 | 2 | 3;

export type UserQuestionProgress = {
  notes: string;
  revisionStage: RevisionStage;
  nextReviewAt: string;
  forgotCount: number;
  lastOpenedAt: string;
};

const STORAGE_KEY = "champdsa-progress";

const REVISION_DAYS: Record<RevisionStage, number> = {
  0: 3,
  1: 7,
  2: 30,
  3: 30,
};

function loadAll(): Record<string, UserQuestionProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, UserQuestionProgress>) : {};
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, UserQuestionProgress>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProgress(questionId: string): UserQuestionProgress {
  const all = loadAll();
  return (
    all[questionId] ?? {
      notes: "",
      revisionStage: 0,
      nextReviewAt: new Date().toISOString(),
      forgotCount: 0,
      lastOpenedAt: new Date().toISOString(),
    }
  );
}

export function saveNotes(questionId: string, notes: string) {
  const all = loadAll();
  const current = getProgress(questionId);
  all[questionId] = {
    ...current,
    notes,
    lastOpenedAt: new Date().toISOString(),
  };
  saveAll(all);
}

export function markForgot(questionId: string) {
  const all = loadAll();
  const current = getProgress(questionId);
  const nextStage = Math.min(3, current.revisionStage + 1) as RevisionStage;
  const days = REVISION_DAYS[nextStage];
  const next = new Date();
  next.setDate(next.getDate() + days);
  all[questionId] = {
    ...current,
    revisionStage: nextStage,
    forgotCount: current.forgotCount + 1,
    nextReviewAt: next.toISOString(),
    lastOpenedAt: new Date().toISOString(),
  };
  saveAll(all);
}

export function markRemembered(questionId: string) {
  const all = loadAll();
  const current = getProgress(questionId);
  all[questionId] = {
    ...current,
    revisionStage: 0,
    nextReviewAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    lastOpenedAt: new Date().toISOString(),
  };
  saveAll(all);
}

export function touchQuestion(questionId: string) {
  const all = loadAll();
  const current = getProgress(questionId);
  all[questionId] = {
    ...current,
    lastOpenedAt: new Date().toISOString(),
  };
  saveAll(all);
}

export function isDue(progress: UserQuestionProgress): boolean {
  return new Date(progress.nextReviewAt) <= new Date();
}

export function getWeakPatterns(
  questionPatternMap: Record<string, string>,
): { pattern: string; count: number }[] {
  const all = loadAll();
  const counts: Record<string, number> = {};
  for (const [qid, p] of Object.entries(all)) {
    const pattern = questionPatternMap[qid];
    if (!pattern || p.forgotCount === 0) continue;
    counts[pattern] = (counts[pattern] ?? 0) + p.forgotCount;
  }
  return Object.entries(counts)
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
