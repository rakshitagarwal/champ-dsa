import { SOLUTION_COUNT, SOLUTION_GROUPS } from "@/data/solutions/topics";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";

export const metadata = {
  title: "AlgoJS Solutions",
  description:
    "LeetCode solutions in JavaScript from the AlgoJS YouTube channel, grouped by pattern.",
};

export default function AlgoJsPage() {
  return (
    <div className="min-h-0 flex-1">
      <SolutionsExplorer
        groups={SOLUTION_GROUPS}
        total={SOLUTION_COUNT}
        brandLabel="ChampDSA · AlgoJS"
        sidebarTitle="AlgoJS"
        introTitle="AlgoJS Solutions"
        introBlurb={`${SOLUTION_COUNT} LeetCode problems with JavaScript solutions aligned to the AlgoJS YouTube channel — grouped by pattern, with Hinglish comments and a video link when available.`}
      />
    </div>
  );
}
