export type SolutionEntry = {
  id: number;
  lcSlug: string;
  title: string;
  diff: "Easy" | "Medium" | "Hard";
  premium?: boolean;
  body: string;
};

export type SolutionSub = {
  title: string;
  topics: SolutionEntry[];
};

export type SolutionGroup = {
  id: string;
  title: string;
  subs: SolutionSub[];
};
