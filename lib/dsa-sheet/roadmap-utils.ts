import type { RoadmapNode, RoadmapPhase } from "@/types/dsa-sheet";

export function countLeaves(node: RoadmapNode): number {
  if (!node.children?.length) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}

export function countPhaseTopics(phase: RoadmapPhase): number {
  return phase.topics.length;
}

export function countPhaseSubtopics(phase: RoadmapPhase): number {
  return phase.topics.reduce((sum, topic) => sum + countLeaves(topic), 0);
}
