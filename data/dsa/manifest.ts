export type DsaPatternTier = "foundation" | "core" | "optional";

export type DsaNoteMeta = {
  slug: string;
  title: string;
  description?: string;
  tier: DsaPatternTier;
};

export const DSA_CATALOG: DsaNoteMeta[] = [
  {
    slug: "hashing",
    title: "Hashing",
    description: "Remember what you already walked past.",
    tier: "core",
  },
  {
    slug: "arrays-strings",
    title: "Arrays",
    description: "In-place scans, reverse, rotate, Kadane.",
    tier: "foundation",
  },
  {
    slug: "prefix-sum",
    title: "Prefix Sum",
    description: "Running totals so a range is two lookups.",
    tier: "core",
  },
  {
    slug: "sorting",
    title: "Intervals",
    description: "Sort by start or end, then merge or insert.",
    tier: "foundation",
  },
  {
    slug: "two-pointers",
    title: "Two Pointers",
    description: "Two indices that eat the array from the ends or the middle.",
    tier: "core",
  },
  {
    slug: "sliding-window",
    title: "Sliding Window",
    description: "A moving range. Grow right, shrink left.",
    tier: "core",
  },
  {
    slug: "stack-queue",
    title: "Stack & Queue",
    description: "Match, undo, nest. Last-in or first-in.",
    tier: "optional",
  },
  {
    slug: "monotonic-stack",
    title: "Monotonic Stack",
    description: "Next greater / next smaller while you scan once.",
    tier: "optional",
  },
  {
    slug: "linked-list",
    title: "Linked List",
    description: "Rewire next pointers. Dummy node when the head can change.",
    tier: "optional",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    description: "If the answer is monotonic, cut the range in half.",
    tier: "core",
  },
  {
    slug: "trees",
    title: "Trees (DFS/BFS)",
    description: "Recurse on kids, or queue one level at a time.",
    tier: "core",
  },
  {
    slug: "heap",
    title: "Heap",
    description: "Always grab the current smallest or largest.",
    tier: "optional",
  },
  {
    slug: "graphs",
    title: "Graphs",
    description: "Visit neighbors. BFS for steps, DFS for components.",
    tier: "core",
  },
  {
    slug: "union-find",
    title: "Union Find",
    description: "Merge groups. Same root means connected.",
    tier: "optional",
  },
  {
    slug: "backtracking",
    title: "Backtracking",
    description: "Try it, recurse, undo. That is the whole trick.",
    tier: "optional",
  },
  {
    slug: "dp",
    title: "Dynamic Programming",
    description: "Same subproblem twice? Save the answer.",
    tier: "core",
  },
  {
    slug: "greedy",
    title: "Greedy",
    description: "Take the locally safe choice, then prove you can.",
    tier: "optional",
  },
  {
    slug: "bits",
    title: "Bit Manipulation",
    description: "XOR cancels pairs. Bits are just tiny flags.",
    tier: "optional",
  },
  {
    slug: "trie",
    title: "Trie",
    description: "A tree of prefixes. Share the start of words.",
    tier: "optional",
  },
  {
    slug: "range-queries",
    title: "Range Queries",
    description: "Point updates + range sums. Fenwick / merge-sort count.",
    tier: "optional",
  },
];

export const TIER_LABELS: Record<DsaPatternTier, string> = {
  foundation: "Foundation",
  core: "Core",
  optional: "Optional",
};
