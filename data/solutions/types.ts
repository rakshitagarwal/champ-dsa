export type SolutionEntry = {
  id: number;
  lcSlug: string;
  title: string;
  diff: "Easy" | "Medium" | "Hard";
  premium?: boolean;
  solutionUrl?: string;
  body: string;
};

export type SolutionGroup = {
  id: string;
  title: string;
  subs: SolutionSub[];
};

export type SolutionSub = {
  title: string;
  topics: SolutionEntry[];
};
