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
};
