import {
  PERSONAL_SOLUTION_COUNT,
  PERSONAL_SOLUTION_GROUPS,
} from "@/data/personal-solutions/topics";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";

export const metadata = {
  title: "Solutions",
  description:
    "Personal DSA sheet — ~150 LeetCode problems across 20 topics, grouped Foundation / Medium / Advanced, with JavaScript solutions.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-0 flex-1">
      <SolutionsExplorer
        groups={PERSONAL_SOLUTION_GROUPS}
        total={PERSONAL_SOLUTION_COUNT}
        brandLabel="ChampDSA · Personal Sheet"
        sidebarTitle="Solutions"
        introTitle="Personal DSA Sheet"
        introBlurb={`${PERSONAL_SOLUTION_COUNT} high-value LeetCode problems across 20 topics — Core patterns first, then next-level topics. Each topic is split into Foundation, Medium, and Advanced. Repeated problems are solved for that topic's pattern. Every question links to LeetCode with a JavaScript solution.`}
      />
    </div>
  );
}
