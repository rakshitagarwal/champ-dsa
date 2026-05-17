export type PatternFundamentals = {
  overview: string;
  intuition: string;
  whenToUse: string[];
  approach: string[];
  complexity: string;
  exampleCode: string;
  exampleInput: string;
  pitfalls: string[];
};

export type DsaPattern = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  fundamentals: PatternFundamentals;
};
