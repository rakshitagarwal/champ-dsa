import { DsaSheetShell } from "@/components/dsa-sheet/dsa-sheet-shell";
import { DsaSheetOverview } from "@/components/dsa-sheet/dsa-sheet-overview";
import { getRoadmapPhases, getRoadmapStats } from "@/lib/dsa-sheet/loader";

export const metadata = {
  title: "DSA Sheet",
  description:
    "ChampDSA interview roadmap — 14 phases from fundamentals to advanced DP, with expandable topics and subtopics.",
};

export default function DsaSheetPage() {
  const phases = getRoadmapPhases();
  const stats = getRoadmapStats();

  return (
    <DsaSheetShell phases={phases}>
      <DsaSheetOverview phases={phases} stats={stats} />
    </DsaSheetShell>
  );
}
