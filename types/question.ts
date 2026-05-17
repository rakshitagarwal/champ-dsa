export type Difficulty = "easy" | "medium" | "hard";

export type MiniVizFrame = {
  label: string;
  indices: number[];
  values: number[];
};

export type MiniVizPreview = {
  type: "array";
  frames: MiniVizFrame[];
};

export type Question = {
  id: string;
  title: string;
  patternSlug: string;
  patternName: string;
  difficulty: Difficulty;
  statement: string;
  patternHints: string[];
  starterCode: string;
  /** Full solution shown in visualizer when opened from practice. */
  solutionCode: string;
  sampleInput: string;
  /** Human-readable input for the console (e.g. `nums = [1,2,3]`). */
  humanInput: string;
  sheetNumber?: number;
  sheetSectionId?: string;
  sheetSubsectionId?: string;
  source?: "sheet" | "champdsa";
  miniVizPreview?: MiniVizPreview;
};

export type PatternGroup = {
  slug: string;
  name: string;
  description: string;
  questions: Question[];
};
