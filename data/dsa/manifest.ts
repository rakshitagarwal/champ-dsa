export type DsaPatternTier = "foundation" | "core" | "optional";

export type DsaNoteMeta = {
  slug: string;
  title: string;
  description?: string;
  tier: DsaPatternTier;
};

export const DSA_CATALOG: DsaNoteMeta[] = [
  {
    slug: "arrays-strings",
    title: "Arrays & Strings",
    description: "Foundation — skim if revising. Basic traversal, in-place mutation, and frequency tricks.",
    tier: "foundation",
  },
  {
    slug: "hashing",
    title: "Hashing",
    description: "Use hash maps/sets for O(1) lookups.",
    tier: "core",
  },
  {
    slug: "two-pointers",
    title: "Two Pointers",
    description: "Two pointers scanning from opposite ends or different speeds.",
    tier: "core",
  },
  {
    slug: "sliding-window",
    title: "Sliding Window",
    description: "Maintain a contiguous window that expands and contracts.",
    tier: "core",
  },
  {
    slug: "prefix-sum",
    title: "Prefix Sum",
    description: "Precompute cumulative sums for range queries.",
    tier: "core",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    description: "Divide the search space in half each iteration.",
    tier: "core",
  },
  {
    slug: "sorting",
    title: "Sorting",
    description: "When to sort first — merge sort, quicksort, and interview trade-offs.",
    tier: "foundation",
  },
  {
    slug: "linked-list",
    title: "Linked List",
    description: "Pointer manipulation and list reversal techniques.",
    tier: "optional",
  },
  {
    slug: "stack-queue",
    title: "Stack & Queue",
    description: "LIFO and FIFO data structures for ordering.",
    tier: "optional",
  },
  {
    slug: "monotonic-stack",
    title: "Monotonic Stack",
    description: "Find next greater/smaller elements in arrays.",
    tier: "optional",
  },
  {
    slug: "heap",
    title: "Heap (Priority Queue)",
    description: "Efficiently find top/smallest K elements.",
    tier: "optional",
  },
  {
    slug: "trees",
    title: "Trees (DFS/BFS)",
    description: "Tree traversals and level-order operations.",
    tier: "core",
  },
  {
    slug: "graphs",
    title: "Graphs (DFS/BFS)",
    description: "Graph exploration, cycles, and topological sort.",
    tier: "core",
  },
  {
    slug: "union-find",
    title: "Union Find (DSU)",
    description: "Disjoint set union for connectivity problems.",
    tier: "optional",
  },
  {
    slug: "backtracking",
    title: "Backtracking",
    description: "Generate all subsets/permutations/combinations.",
    tier: "optional",
  },
  {
    slug: "greedy",
    title: "Greedy",
    description: "Make locally optimal choices leading to global optimum.",
    tier: "optional",
  },
  {
    slug: "dp",
    title: "DP (1D)",
    description: "Linear dynamic programming — Kadane, coin change, house robber.",
    tier: "core",
  },
];

export const TIER_LABELS: Record<DsaPatternTier, string> = {
  foundation: "Foundation",
  core: "Core",
  optional: "Optional",
};
