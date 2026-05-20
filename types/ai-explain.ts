/** AI commentary (Groq) — paragraphs only (no per-step trace replay). */
export type AiExplainCommentary = {
  summary: string;
  whyItWorks: string;
  howExamplesAreSatisfied: string;
  keyIdeas: string[];
};

export type ExampleRunResult = {
  index: number;
  label: string;
  input: string;
  expected: string;
  actual: string;
  pass: boolean;
  error?: string;
};
