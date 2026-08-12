/** Hierarchical node in the ChampDSA roadmap (topic or leaf subtopic). */
export type RoadmapNode = {
  id: string;
  title: string;
  children?: RoadmapNode[];
};

export type RoadmapPhase = {
  id: string;
  phase: number;
  title: string;
  shortTitle: string;
  description: string;
  topics: RoadmapNode[];
};

/** Practice link shown as Q1 / Q2 / Q3 on a category row. */
export type PracticeQuestion = {
  title: string;
  url: string;
  source: "LeetCode" | "GFG" | string;
  hint?: string;
};

export type PracticeNotesEntry = {
  kind: "notes";
  notes: string;
};

export type PracticeQuestionsEntry = {
  kind: "questions";
  questions: PracticeQuestion[];
};

export type PracticeEntry = PracticeNotesEntry | PracticeQuestionsEntry;

/** @deprecated Kept for Striver JSON / overlap helpers if still needed. */
export type StriverDifficulty = "easy" | "medium" | "hard";

export type StriverQuestion = {
  id: string;
  sheetNumber: number;
  title: string;
  leetcodeSlug: string;
  leetcodeUrl: string;
  difficulty?: StriverDifficulty;
  sectionId: string;
  sectionTitle: string;
  practiceId?: string;
};

export type StriverSectionMeta = {
  id: string;
  title: string;
  questionIds: string[];
  questions: { label: string; url: string }[];
};
