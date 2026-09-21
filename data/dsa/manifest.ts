export type DsaPatternTier = "foundation" | "core" | "optional";

export type DsaNoteMeta = {
  slug: string;
  title: string;
  description?: string;
  tier: DsaPatternTier;
};

export const DSA_CATALOG: DsaNoteMeta[] = [
  // Roadmap order: Introduction -> Arrays -> DP (revision flow)
  {
    slug: "introduction",
    title: "Introduction",
    description: "Roadmap to follow to get better at DSA.",
    tier: "foundation",
  },
  {
    slug: "data-structures",
    title: "Data Structures",
    description:
      "Theory hub: 9 core data structures — what, structure, big-O, catch, keywords.",
    tier: "foundation",
  },
  {
    slug: "arrays-strings",
    title: "Arrays",
    description: "In-place scans + JS array methods. Pair with Hashing for Arrays & Hashing.",
    tier: "foundation",
  },
  {
    slug: "strings",
    title: "Strings",
    description: "Scan, count, palindrome — plus JS string methods cheatsheet.",
    tier: "foundation",
  },
  {
    slug: "sorting-techniques",
    title: "Sorting",
    description: "Bubble → heap + complexity table, stability, when to pick which.",
    tier: "foundation",
  },
  {
    slug: "hashing",
    title: "Hashing",
    description: "Map / Set / Object methods + seen / frequency / group-by-key.",
    tier: "core",
  },
  {
    slug: "prefix-sum",
    title: "Prefix Sum",
    description: "Running totals so a range is two lookups.",
    tier: "core",
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
    slug: "sorting",
    title: "Intervals",
    description: "Sort by start or end, then merge or insert.",
    tier: "foundation",
  },
  {
    slug: "stack",
    title: "Stack",
    description: "LIFO — brackets, nesting, undo. See Monotonic Stack for next-greater.",
    tier: "optional",
  },
  {
    slug: "queue",
    title: "Queue / Deque",
    description: "FIFO for BFS; deque for sliding-window max.",
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
    slug: "recursion",
    title: "Recursion",
    description: "Base case first, trust the recursion — foundation for BT/trees.",
    tier: "core",
  },
  {
    slug: "backtracking",
    title: "Backtracking",
    description: "Try it, recurse, undo. That is the whole trick.",
    tier: "optional",
  },
  {
    slug: "trees",
    title: "Trees",
    description: "DFS/BFS on binary trees — depth, path, levels.",
    tier: "core",
  },
  {
    slug: "bst",
    title: "BST",
    description: "Left small, right big. Validate, kth, LCA.",
    tier: "core",
  },
  {
    slug: "heap",
    title: "Heap / Priority Queue",
    description: "Always grab the current smallest or largest. Top K.",
    tier: "optional",
  },
  {
    slug: "graphs",
    title: "Graphs (BFS / DFS)",
    description: "BFS for steps, DFS for components. Grid as graph.",
    tier: "core",
  },
  {
    slug: "topological-sort",
    title: "Topological Sort",
    description: "Kahn vs DFS. Order with dependencies, detect cycle.",
    tier: "core",
  },
  {
    slug: "shortest-path",
    title: "Shortest Path",
    description: "Dijkstra, Bellman-Ford, Floyd — pick by weights.",
    tier: "core",
  },
  {
    slug: "mst",
    title: "MST",
    description: "Connect all with minimum cost. Kruskal + DSU.",
    tier: "core",
  },
  {
    slug: "union-find",
    title: "Union Find",
    description: "Merge groups. Same root means connected.",
    tier: "optional",
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
    title: "Tries",
    description: "A tree of prefixes. Share the start of words.",
    tier: "optional",
  },
  {
    slug: "matrix",
    title: "Matrix",
    description: "2D arrays. Spiral, rotate, zeroes, search.",
    tier: "optional",
  },
  {
    slug: "range-queries",
    title: "Range Queries",
    description: "Point updates + range sums. Fenwick / merge-sort count.",
    tier: "optional",
  },
  {
    slug: "dp",
    title: "Dynamic Programming",
    description: "Hub: state in English, memo vs tabulation, which DP type.",
    tier: "core",
  },
  {
    slug: "dp-linear",
    title: "1D / Linear DP",
    description: "Stairs, robber, decode, word break — last 1–2 states.",
    tier: "core",
  },
  {
    slug: "dp-knapsack",
    title: "Knapsack DP",
    description: "Coins, subset, partition — 0/1 vs unbounded loops.",
    tier: "core",
  },
  {
    slug: "dp-2d",
    title: "2D DP",
    description: "LCS/edit, grid paths, LIS, interval (burst balloons).",
    tier: "core",
  },
];

export const TIER_LABELS: Record<DsaPatternTier, string> = {
  foundation: "Foundation",
  core: "Core",
  optional: "Optional",
};
