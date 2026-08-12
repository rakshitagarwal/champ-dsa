import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DsaSheetShell } from "@/components/dsa-sheet/dsa-sheet-shell";
import { DsaSheetPhaseView } from "@/components/dsa-sheet/dsa-sheet-phase-view";
import {
  getRoadmapPhase,
  getRoadmapPhases,
} from "@/lib/dsa-sheet/loader";
import { getPracticeByLeafForPhase } from "@/lib/dsa-sheet/practice-for-phase";

type Props = {
  params: Promise<{ phaseId: string }>;
};

export function generateStaticParams() {
  return getRoadmapPhases().map((p) => ({ phaseId: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { phaseId } = await params;
  const phase = getRoadmapPhase(phaseId);
  if (!phase) return { title: "DSA Sheet" };
  return {
    title: `Phase ${phase.phase}: ${phase.title} · DSA Sheet`,
    description: phase.description,
  };
}

export default async function DsaSheetPhasePage({ params }: Props) {
  const { phaseId } = await params;
  const phase = getRoadmapPhase(phaseId);
  if (!phase) notFound();

  const phases = getRoadmapPhases();
  const practiceByLeaf = getPracticeByLeafForPhase(phase);

  return (
    <DsaSheetShell phases={phases}>
      <Suspense fallback={<p className="p-8 text-muted-foreground">Loading…</p>}>
        <DsaSheetPhaseView
          phase={phase}
          phases={phases}
          practiceByLeaf={practiceByLeaf}
        />
      </Suspense>
    </DsaSheetShell>
  );
}
