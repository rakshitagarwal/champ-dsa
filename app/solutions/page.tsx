import { SOLUTION_COUNT, SOLUTION_GROUPS } from "@/data/solutions/topics";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";

export const metadata = {
  title: "Solutions",
  description:
    "383 LeetCode solutions in JavaScript with Hinglish comments, grouped by pattern.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-0 flex-1">
      <SolutionsExplorer groups={SOLUTION_GROUPS} total={SOLUTION_COUNT} />
    </div>
  );
}
