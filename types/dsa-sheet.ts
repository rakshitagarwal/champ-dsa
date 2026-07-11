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
