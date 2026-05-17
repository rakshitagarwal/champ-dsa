import type { PatternDifficulty } from "@/types/pattern";

export type RoadmapNode = {
  slug: string;
  difficulty: PatternDifficulty;
  prerequisites: string[];
  estimatedMinutes: number;
  order: number;
};

export const roadmapNodes: RoadmapNode[] = [
  {
    slug: "two-pointers",
    difficulty: "beginner",
    prerequisites: [],
    estimatedMinutes: 60,
    order: 1,
  },
  {
    slug: "sliding-window",
    difficulty: "beginner",
    prerequisites: ["two-pointers"],
    estimatedMinutes: 75,
    order: 2,
  },
  {
    slug: "prefix-sum",
    difficulty: "intermediate",
    prerequisites: ["sliding-window"],
    estimatedMinutes: 60,
    order: 3,
  },
  {
    slug: "binary-search",
    difficulty: "intermediate",
    prerequisites: ["two-pointers"],
    estimatedMinutes: 90,
    order: 4,
  },
  {
    slug: "hashing",
    difficulty: "beginner",
    prerequisites: ["two-pointers"],
    estimatedMinutes: 45,
    order: 5,
  },
  {
    slug: "recursion",
    difficulty: "beginner",
    prerequisites: ["two-pointers"],
    estimatedMinutes: 90,
    order: 6,
  },
  {
    slug: "tree-dfs",
    difficulty: "intermediate",
    prerequisites: ["recursion"],
    estimatedMinutes: 90,
    order: 7,
  },
  {
    slug: "tree-bfs",
    difficulty: "intermediate",
    prerequisites: ["tree-dfs"],
    estimatedMinutes: 75,
    order: 8,
  },
  {
    slug: "monotonic-stack",
    difficulty: "intermediate",
    prerequisites: ["sliding-window"],
    estimatedMinutes: 60,
    order: 9,
  },
  {
    slug: "dp-1d",
    difficulty: "advanced",
    prerequisites: ["recursion", "prefix-sum"],
    estimatedMinutes: 120,
    order: 10,
  },
  {
    slug: "subsets-backtracking",
    difficulty: "advanced",
    prerequisites: ["recursion"],
    estimatedMinutes: 120,
    order: 11,
  },
  {
    slug: "graph-bfs",
    difficulty: "advanced",
    prerequisites: ["tree-bfs"],
    estimatedMinutes: 120,
    order: 12,
  },
];

export const roadmapOrder = [...roadmapNodes].sort((a, b) => a.order - b.order);

export function getRoadmapPrerequisites(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const n of roadmapNodes) {
    map[n.slug] = n.prerequisites;
  }
  return map;
}
