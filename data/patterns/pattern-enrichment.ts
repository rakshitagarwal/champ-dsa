/** Extra copy merged into pattern lessons (sourced from interview-notes bundle). */

export type PatternEnrichment = {
  whenToUse?: string[];
  approach?: string[];
  pitfalls?: string[];
};

export const patternEnrichment: Record<string, PatternEnrichment> = {
  "two-pointers": {
    whenToUse: [
      "Same-direction pointers for in-place duplicate removal",
      "3Sum / k-sum after sorting (fix one index, two-pointer the rest)",
    ],
    approach: [
      "For pair sum on sorted data: move the pointer that fixes the inequality (smaller sum → left++, larger → right--).",
    ],
    pitfalls: [
      "Using opposite pointers on unsorted data without a clear monotonic rule",
    ],
  },
  "sliding-window": {
    whenToUse: [
      "Fixed window size k (max/min sum in window of size k)",
      "Variable window with at-most / at-least K distinct characters",
    ],
    approach: [
      "Fixed k: add nums[i], subtract nums[i-k] when i ≥ k.",
      "Variable: expand right; while invalid, shrink left and update answer when valid.",
    ],
  },
  "prefix-sum": {
    whenToUse: ["Count subarrays with sum exactly k (prefix + frequency map)"],
    approach: [
      "Initialize map with {0:1} for empty prefix.",
      "At each step add count of (currentSum - k) before updating current prefix count.",
    ],
  },
  kadane: {
    pitfalls: [
      "Initializing best to 0 when every element is negative (use -Infinity or first element)",
    ],
  },
  hashing: {
    whenToUse: ["Longest consecutive sequence (store values in a Set)"],
  },
  "binary-search": {
    approach: [
      "Use mid = lo + ((hi - lo) >> 1) to avoid overflow.",
      "For boundaries: lowerBound finds first true; upperBound uses (hi - lo + 1) >> 1 in mid.",
    ],
    pitfalls: ["Off-by-one on lo <= hi vs lo < hi depending on template"],
  },
  "modified-binary-search": {
    whenToUse: [
      "Binary search on answer (capacity, speed, minimum days) when feasibility is monotonic",
    ],
    approach: [
      "In rotated array: one half is always sorted — compare target with that half to pick side.",
    ],
  },
  "fast-slow-pointers": {
    whenToUse: ["Happy number, implicit sequence with cycle"],
    approach: [
      "Cycle: if slow meets fast, cycle exists; to find start, reset one pointer to head and advance both one step.",
    ],
  },
  "merge-intervals": {
    whenToUse: ["Insert interval, employee free time, meeting rooms II"],
    approach: ["Sort by start; merge if current.start <= last.end else push new interval."],
  },
  "cyclic-sort": {
    whenToUse: ["Find all missing / duplicate numbers in range 1..n"],
    approach: [
      "Place value v at index v-1 by swapping; only swap when nums[i] is in range and not already placed.",
    ],
  },
  "top-k-heap": {
    whenToUse: ["K closest points, K frequent words, merge K sorted lists"],
    approach: [
      "K largest: min-heap of size k. K smallest: max-heap of size k.",
    ],
  },
  "monotonic-stack": {
    whenToUse: [
      "Largest rectangle in histogram",
      "Trapping rain water (stack variant)",
    ],
    approach: [
      "Pop when current violates monotonic order; each popped index gets its 'next greater' answer.",
    ],
  },
  "tree-bfs": {
    whenToUse: ["Zigzag level order", "Nodes at distance K from target"],
    approach: [
      "Process level size = queue.length before dequeuing children for that level.",
    ],
  },
  "tree-dfs": {
    whenToUse: ["Serialize/deserialize tree", "Path from root to leaf"],
    approach: [
      "Inorder on BST gives sorted order; use min/max bounds when validating BST.",
    ],
  },
  "subsets-backtracking": {
    approach: [
      "Every backtrack path: choose → recurse → undo (pop / unmark).",
      "Duplicates: sort first; skip when i > start && nums[i] === nums[i-1].",
      "Combination sum with reuse: recurse from i (not i+1) after picking candidates[i].",
    ],
    pitfalls: ["Forgetting to copy current array when pushing to results"],
  },
  "bitwise-xor": {
    whenToUse: ["Swap two numbers without temp", "Find two single numbers (XOR then separate by bit)"],
    approach: ["a ^ a = 0, a ^ 0 = a — XOR all elements for single-occurrence value."],
  },
  "two-heaps": {
    approach: [
      "Keep max-heap (low half) and min-heap (high half) balanced; median is top of either heap.",
    ],
  },
  "topological-sort": {
    approach: [
      "Kahn: in-degree 0 queue, reduce neighbors; if processed count < n → cycle.",
      "DFS: post-order push to stack, reverse for topological order.",
    ],
    pitfalls: ["Forgetting to detect cycle when order length < numCourses"],
  },
  greedy: {
    whenToUse: ["Jump game I/II", "Partition labels", "Gas station circuit"],
    pitfalls: [
      "Applying greedy without proving local-optimal → global-optimal (verify or counterexample)",
    ],
  },
  math: {
    approach: [
      "Modulo for overflow; sieve for primes; Euclidean algorithm for GCD.",
      "Integer ceil(a/b) can use Math.floor((a + b - 1) / b).",
    ],
  },
  "dp-1d": {
    whenToUse: [
      "State dp[i] = best for first i elements; rolling array when only dp[i-1] needed",
    ],
    approach: [
      "If min/max/count with overlapping subproblems → try DP before brute force.",
      "Define state in words before coding (what does dp[i] mean?).",
    ],
  },
  recursion: {
    approach: [
      "Divide & conquer: split, solve halves, merge (merge sort, quick sort).",
    ],
  },
  "graph-bfs": {
    whenToUse: ["Word ladder", "Multi-source BFS (rotting oranges)"],
    approach: ["Mark visited when enqueueing, not when dequeuing."],
  },
  "graph-dfs": {
    whenToUse: [
      "Union-Find for undirected connectivity / Kruskal MST (path compression + rank)",
    ],
    approach: [
      "Grid graphs: encode cell as node id = r * cols + c.",
      "Union-Find: union returns false if already connected (cycle in undirected graph).",
    ],
  },
  trie: {
    approach: [
      "Each node holds children map + optional word flag; share prefixes along the path.",
    ],
  },
};

export function getPatternEnrichment(slug: string): PatternEnrichment | undefined {
  return patternEnrichment[slug];
}

export function mergePatternLists(
  base: string[],
  extra?: string[],
): string[] {
  if (!extra?.length) return base;
  const seen = new Set(base);
  return [...base, ...extra.filter((item) => !seen.has(item))];
}
