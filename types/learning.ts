export type RevisionStage = 0 | 1 | 2 | 3;

export type QuestionStatus = "unsolved" | "attempted" | "solved";

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export type UserQuestionProgress = {
  notes: string;
  revisionStage: RevisionStage;
  nextReviewAt: string;
  forgotCount: number;
  lastOpenedAt: string;
  status: QuestionStatus;
  firstAttemptSuccess?: boolean;
  attempts: number;
  timeSpentMs: number;
  hintsUnlocked: number;
  hintsUsed: number;
  confidence?: ConfidenceLevel;
  solvedAt?: string;
  lastAttemptAt?: string;
  independentSolve?: boolean;
  gaveUp?: boolean;
};

export type PatternProgress = {
  conceptDone: boolean;
};

export type TrainerSession = {
  drillId: string;
  correct: boolean;
  patternSlug: string;
  at: string;
};

export type TrainerStats = {
  streak: number;
  weakPatternSlugs: string[];
  sessions: TrainerSession[];
  patternAccuracy: Record<string, { correct: number; total: number }>;
};

export type LastVisited =
  | { type: "pattern"; slugOrId: string }
  | { type: "question"; slugOrId: string }
  | { type: "train"; slugOrId: string };

export type LearningProfile = {
  streakDays: number;
  lastActiveDate: string;
  dailyGoal: number;
  dailyCompleted: Record<string, number>;
  trainer: TrainerStats;
  lastVisited: LastVisited | null;
};

export type LearningStoreData = {
  version: number;
  patterns: Record<string, PatternProgress>;
  questions: Record<string, UserQuestionProgress>;
  profile: LearningProfile;
};
