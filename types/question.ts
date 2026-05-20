export type Difficulty = "easy" | "medium" | "hard";

export type ProgressiveHint = {
  observation: string;
  direction: string;
  pattern: string;
  pseudocode: string;
  solution: string;
};

export type MiniVizFrame = {
  label: string;
  indices: number[];
  values: number[];
};

export type MiniVizPreview = {
  type: "array";
  frames: MiniVizFrame[];
};

export type QuestionExample = {
  input: string;
  output: string;
  explanation?: string;
};

export type Question = {
  id: string;
  title: string;
  patternSlug: string;
  patternName: string;
  difficulty: Difficulty;
  statement: string;
  patternHints: string[];
  progressiveHints?: ProgressiveHint;
  starterCode: string;
  /** LeetCode-style entry function name (e.g. twoSum, mergeTwoLists). */
  entryFunction?: string;
  /** Full solution shown in visualizer when opened from practice. */
  solutionCode: string;
  sampleInput: string;
  /** Human-readable input for the console (e.g. `nums = [1,2,3]`). */
  humanInput: string;
  /** Expected return value for the sample input (LeetCode-style example output). */
  sampleOutput?: string;
  leetcodeSlug?: string;
  leetcodeUrl?: string;
  /** Full problem description (HTML from LeetCode). */
  description?: string;
  examples?: QuestionExample[];
  constraints?: string[];
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
