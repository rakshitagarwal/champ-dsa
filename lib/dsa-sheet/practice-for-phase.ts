import type { PracticeQuestion, RoadmapNode, RoadmapPhase } from "@/types/dsa-sheet";
import { getPracticeQuestions } from "@/lib/dsa-sheet/loader";

function walkLeaves(node: RoadmapNode, ids: string[]) {
  if (!node.children?.length) {
    ids.push(node.id);
    return;
  }
  for (const child of node.children) walkLeaves(child, ids);
}

/** Build leafId → questions map for one phase (empty for notes-only / missing). */
export function getPracticeByLeafForPhase(
  phase: RoadmapPhase,
): Record<string, PracticeQuestion[]> {
  const leafIds: string[] = [];
  for (const topic of phase.topics) walkLeaves(topic, leafIds);

  const map: Record<string, PracticeQuestion[]> = {};
  for (const id of leafIds) {
    const questions = getPracticeQuestions(id);
    if (questions.length) map[id] = questions;
  }
  return map;
}
