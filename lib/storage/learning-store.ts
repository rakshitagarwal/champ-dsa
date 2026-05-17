import type {
  ConfidenceLevel,
  LearningProfile,
  LearningStoreData,
  LastVisited,
  RevisionStage,
  UserQuestionProgress,
} from "@/types/learning";

const STORAGE_KEY = "champdsa-learning-v1";
const LEGACY_PATTERN_KEY = "champdsa-patterns-done";
const LEGACY_PROGRESS_KEY = "champdsa-progress";
export const LEARNING_UPDATED_EVENT = "champdsa-learning-updated";

const REVISION_DAYS: Record<RevisionStage, number> = {
  0: 3,
  1: 7,
  2: 30,
  3: 30,
};

const CONFIDENCE_DAYS: Record<ConfidenceLevel, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

function defaultQuestionProgress(): UserQuestionProgress {
  const now = new Date().toISOString();
  return {
    notes: "",
    revisionStage: 0,
    nextReviewAt: now,
    forgotCount: 0,
    lastOpenedAt: now,
    status: "unsolved",
    attempts: 0,
    timeSpentMs: 0,
    hintsUnlocked: 0,
    hintsUsed: 0,
  };
}

function defaultProfile(): LearningProfile {
  return {
    streakDays: 0,
    lastActiveDate: "",
    dailyGoal: 2,
    dailyCompleted: {},
    trainer: {
      streak: 0,
      weakPatternSlugs: [],
      sessions: [],
      patternAccuracy: {},
    },
    lastVisited: null,
  };
}

function defaultStore(): LearningStoreData {
  return {
    version: 1,
    patterns: {},
    questions: {},
    profile: defaultProfile(),
  };
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LEARNING_UPDATED_EVENT));
}

function migrateLegacy(store: LearningStoreData): LearningStoreData {
  if (typeof window === "undefined") return store;

  try {
    const rawPatterns = localStorage.getItem(LEGACY_PATTERN_KEY);
    if (rawPatterns) {
      const slugs = JSON.parse(rawPatterns) as string[];
      for (const slug of slugs) {
        store.patterns[slug] = { conceptDone: true };
      }
      localStorage.removeItem(LEGACY_PATTERN_KEY);
    }
  } catch {
    /* ignore */
  }

  try {
    const rawProgress = localStorage.getItem(LEGACY_PROGRESS_KEY);
    if (rawProgress) {
      const legacy = JSON.parse(rawProgress) as Record<
        string,
        Partial<UserQuestionProgress>
      >;
      for (const [id, p] of Object.entries(legacy)) {
        const base = defaultQuestionProgress();
        store.questions[id] = {
          ...base,
          ...p,
          status: p.status ?? base.status,
          attempts: p.attempts ?? base.attempts,
          timeSpentMs: p.timeSpentMs ?? base.timeSpentMs,
          hintsUnlocked: p.hintsUnlocked ?? base.hintsUnlocked,
          hintsUsed: p.hintsUsed ?? base.hintsUsed,
        };
      }
      localStorage.removeItem(LEGACY_PROGRESS_KEY);
    }
  } catch {
    /* ignore */
  }

  return store;
}

function loadStore(): LearningStoreData {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const migrated = migrateLegacy(defaultStore());
      saveStore(migrated);
      return migrated;
    }
    const parsed = JSON.parse(raw) as LearningStoreData;
    const store: LearningStoreData = {
      ...defaultStore(),
      ...parsed,
      patterns: parsed.patterns ?? {},
      questions: parsed.questions ?? {},
      profile: { ...defaultProfile(), ...parsed.profile },
    };
    return migrateLegacy(store);
  } catch {
    return defaultStore();
  }
}

function saveStore(data: LearningStoreData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  notify();
}

function touchActivity(store: LearningStoreData) {
  const today = todayKey();
  const profile = store.profile;
  if (profile.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  if (profile.lastActiveDate === yKey) {
    profile.streakDays += 1;
  } else if (profile.lastActiveDate !== today) {
    profile.streakDays = profile.lastActiveDate ? 1 : 1;
  }
  profile.lastActiveDate = today;
}

export function getStore(): LearningStoreData {
  return loadStore();
}

export function hasLearningActivity(): boolean {
  const store = loadStore();
  if (store.profile.lastVisited) return true;
  if (Object.keys(store.questions).some((id) => store.questions[id].status !== "unsolved" || store.questions[id].attempts > 0)) {
    return true;
  }
  if (Object.values(store.patterns).some((p) => p.conceptDone)) return true;
  if (store.profile.trainer.sessions.length > 0) return true;
  return false;
}

export function setLastVisited(visited: LastVisited) {
  const store = loadStore();
  store.profile.lastVisited = visited;
  touchActivity(store);
  saveStore(store);
}

export function isPatternDone(slug: string): boolean {
  return loadStore().patterns[slug]?.conceptDone ?? false;
}

export function markPatternDone(slug: string) {
  const store = loadStore();
  store.patterns[slug] = { conceptDone: true };
  touchActivity(store);
  saveStore(store);
}

export function unmarkPatternDone(slug: string) {
  const store = loadStore();
  delete store.patterns[slug];
  saveStore(store);
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
  const store = loadStore();
  const doneSlugs = Object.entries(store.patterns)
    .filter(([, p]) => p.conceptDone)
    .map(([slug]) => slug);
  return {
    completed: doneSlugs.length,
    total: totalPatterns,
    doneSlugs,
  };
}

export function getProgress(questionId: string): UserQuestionProgress {
  const store = loadStore();
  return store.questions[questionId] ?? defaultQuestionProgress();
}

export function saveNotes(questionId: string, notes: string) {
  const store = loadStore();
  const current = getProgress(questionId);
  store.questions[questionId] = {
    ...current,
    notes,
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function touchQuestion(questionId: string) {
  const store = loadStore();
  const current = getProgress(questionId);
  store.questions[questionId] = {
    ...current,
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function markForgot(questionId: string) {
  const store = loadStore();
  const current = getProgress(questionId);
  const nextStage = Math.min(3, current.revisionStage + 1) as RevisionStage;
  const days = REVISION_DAYS[nextStage];
  const next = new Date();
  next.setDate(next.getDate() + days);
  store.questions[questionId] = {
    ...current,
    revisionStage: nextStage,
    forgotCount: current.forgotCount + 1,
    nextReviewAt: next.toISOString(),
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function markRemembered(questionId: string) {
  const store = loadStore();
  const current = getProgress(questionId);
  store.questions[questionId] = {
    ...current,
    revisionStage: 0,
    nextReviewAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function isDue(progress: UserQuestionProgress): boolean {
  return new Date(progress.nextReviewAt) <= new Date();
}

export function recordQuestionAttempt(questionId: string, durationMs = 0) {
  const store = loadStore();
  const current = getProgress(questionId);
  const now = new Date().toISOString();
  store.questions[questionId] = {
    ...current,
    status: current.status === "solved" ? "solved" : "attempted",
    attempts: current.attempts + 1,
    timeSpentMs: current.timeSpentMs + durationMs,
    lastAttemptAt: now,
    lastOpenedAt: now,
  };
  touchActivity(store);
  saveStore(store);
}

export function recordHintUnlock(questionId: string, level: number) {
  const store = loadStore();
  const current = getProgress(questionId);
  const unlocked = Math.max(current.hintsUnlocked, Math.min(5, level));
  const used = Math.max(current.hintsUsed, level > 0 ? current.hintsUsed + (level > current.hintsUnlocked ? 1 : 0) : current.hintsUsed);
  store.questions[questionId] = {
    ...current,
    hintsUnlocked: unlocked,
    hintsUsed: used,
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function recordHintView(questionId: string, level: number) {
  const store = loadStore();
  const current = getProgress(questionId);
  store.questions[questionId] = {
    ...current,
    hintsUnlocked: Math.max(current.hintsUnlocked, level),
    hintsUsed: current.hintsUsed + (level <= current.hintsUnlocked ? 0 : 1),
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function markQuestionSolved(
  questionId: string,
  opts?: { firstAttempt?: boolean; independent?: boolean; gaveUp?: boolean },
) {
  const store = loadStore();
  const current = getProgress(questionId);
  const now = new Date().toISOString();
  const firstAttempt = opts?.firstAttempt ?? current.attempts <= 1;
  store.questions[questionId] = {
    ...current,
    status: "solved",
    solvedAt: now,
    firstAttemptSuccess: firstAttempt && !opts?.gaveUp,
    independentSolve: opts?.independent ?? current.hintsUsed <= 2,
    gaveUp: opts?.gaveUp ?? current.gaveUp,
    lastOpenedAt: now,
  };

  const today = todayKey();
  store.profile.dailyCompleted[today] =
    (store.profile.dailyCompleted[today] ?? 0) + 1;
  touchActivity(store);
  saveStore(store);
}

export function setConfidence(questionId: string, confidence: ConfidenceLevel) {
  const store = loadStore();
  const current = getProgress(questionId);
  const days = CONFIDENCE_DAYS[confidence];
  const next = new Date();
  next.setDate(next.getDate() + days);
  store.questions[questionId] = {
    ...current,
    confidence,
    nextReviewAt: next.toISOString(),
    revisionStage: confidence <= 2 ? 1 : confidence === 3 ? 0 : 0,
    lastOpenedAt: new Date().toISOString(),
  };
  touchActivity(store);
  saveStore(store);
}

export function getPatternMastery(
  patternSlug: string,
  questionIdsForPattern: string[],
): number {
  const store = loadStore();
  const concept = store.patterns[patternSlug]?.conceptDone ? 40 : 0;
  if (questionIdsForPattern.length === 0) return concept;
  const solved = questionIdsForPattern.filter(
    (id) => store.questions[id]?.status === "solved",
  ).length;
  const practicePct = (solved / questionIdsForPattern.length) * 60;
  return Math.round(concept + practicePct);
}

export function getOverallProgress(
  patternSlugs: string[],
  questionsByPattern: Record<string, string[]>,
): number {
  if (patternSlugs.length === 0) return 0;
  const sum = patternSlugs.reduce(
    (acc, slug) => acc + getPatternMastery(slug, questionsByPattern[slug] ?? []),
    0,
  );
  return Math.round(sum / patternSlugs.length);
}

export function getWeakPatterns(
  questionPatternMap: Record<string, string>,
): { pattern: string; count: number }[] {
  const store = loadStore();
  const counts: Record<string, number> = {};
  for (const [qid, p] of Object.entries(store.questions)) {
    const pattern = questionPatternMap[qid];
    if (!pattern) continue;
    if (p.forgotCount > 0) counts[pattern] = (counts[pattern] ?? 0) + p.forgotCount;
    if (p.confidence !== undefined && p.confidence <= 2) {
      counts[pattern] = (counts[pattern] ?? 0) + 2;
    }
  }
  const trainerWeak = store.profile.trainer.weakPatternSlugs;
  for (const slug of trainerWeak) {
    counts[slug] = (counts[slug] ?? 0) + 3;
  }
  return Object.entries(counts)
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function getDueRevision(questionIds: string[]): string[] {
  const store = loadStore();
  return questionIds.filter((id) => {
    const p = store.questions[id];
    if (!p) return false;
    return isDue(p) && (p.status === "solved" || p.forgotCount > 0);
  });
}

export function recordTrainerAnswer(
  drillId: string,
  patternSlug: string,
  correct: boolean,
) {
  const store = loadStore();
  const trainer = store.profile.trainer;
  trainer.sessions.push({
    drillId,
    patternSlug,
    correct,
    at: new Date().toISOString(),
  });
  if (trainer.sessions.length > 200) {
    trainer.sessions = trainer.sessions.slice(-200);
  }
  const acc = trainer.patternAccuracy[patternSlug] ?? {
    correct: 0,
    total: 0,
  };
  acc.total += 1;
  if (correct) acc.correct += 1;
  trainer.patternAccuracy[patternSlug] = acc;

  if (correct) trainer.streak += 1;
  else trainer.streak = 0;

  trainer.weakPatternSlugs = Object.entries(trainer.patternAccuracy)
    .filter(([, v]) => v.total >= 3)
    .map(([slug, v]) => ({
      slug,
      rate: v.correct / v.total,
    }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 3)
    .map((x) => x.slug);

  touchActivity(store);
  saveStore(store);
}

export function getRecommendedNextPattern(
  roadmapSlugs: string[],
  prerequisites: Record<string, string[]>,
  questionsByPattern: Record<string, string[]>,
): string | null {
  for (const slug of roadmapSlugs) {
    const prereqs = prerequisites[slug] ?? [];
    const prereqsMet = prereqs.every((p) => isPatternDone(p));
    if (!prereqsMet) continue;
    const mastery = getPatternMastery(slug, questionsByPattern[slug] ?? []);
    if (mastery < 80) return slug;
  }
  return roadmapSlugs.find((s) => !isPatternDone(s)) ?? null;
}

export function getDailyProgress(): { completed: number; goal: number } {
  const store = loadStore();
  const today = todayKey();
  return {
    completed: store.profile.dailyCompleted[today] ?? 0,
    goal: store.profile.dailyGoal,
  };
}

export function getStreak(): number {
  return loadStore().profile.streakDays;
}

export type { UserQuestionProgress, RevisionStage, ConfidenceLevel };
