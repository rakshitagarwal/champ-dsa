import type { Difficulty } from "@/types/question";

export type RecognitionDrill = {
  id: string;
  difficulty: Difficulty;
  statement: string;
  correctPatternSlug: string;
  options: { slug: string; label: string }[];
  whyCorrect: string;
  whyWrong: Record<string, string>;
  signals: string[];
};

export const recognitionDrills: RecognitionDrill[] = [
  {
    id: "drill-1",
    difficulty: "easy",
    statement:
      "Given a sorted array, find two numbers that add up to a target. Return their indices.",
    correctPatternSlug: "two-pointers",
    options: [
      { slug: "two-pointers", label: "Two Pointers" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "binary-search", label: "Binary Search" },
      { slug: "dp-1d", label: "Dynamic Programming" },
    ],
    whyCorrect:
      "On a sorted array, moving left/right based on whether the sum is too small or large eliminates half the search space each step.",
    whyWrong: {
      "sliding-window":
        "Sliding window optimizes contiguous subarrays with expanding/shrinking bounds, not pair search on a full sorted array.",
      "binary-search":
        "Binary search finds one position; pair sum needs two coordinated pointers.",
      "dp-1d":
        "No overlapping subproblems — greedy pointer movement suffices.",
    },
    signals: ["sorted array", "pair with target sum", "O(n) scan"],
  },
  {
    id: "drill-2",
    difficulty: "easy",
    statement:
      "Find the maximum sum of any contiguous subarray of fixed size k.",
    correctPatternSlug: "sliding-window",
    options: [
      { slug: "prefix-sum", label: "Prefix Sum" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "two-pointers", label: "Two Pointers" },
      { slug: "kadane", label: "Kadane" },
    ],
    whyCorrect:
      "A fixed-size window slides one index at a time; add the new right element and remove the left in O(1).",
    whyWrong: {
      "prefix-sum":
        "Prefix sum helps variable ranges, but fixed k is simpler with a sliding window.",
      "two-pointers":
        "Two pointers often move toward each other; here the window slides in one direction.",
      kadane:
        "Kadane handles variable-length subarrays, not fixed k.",
    },
    signals: ["contiguous subarray", "fixed window size k", "optimize nested loops"],
  },
  {
    id: "drill-3",
    difficulty: "medium",
    statement:
      "Return the length of the longest substring with at most k distinct characters.",
    correctPatternSlug: "sliding-window",
    options: [
      { slug: "hashing", label: "Hash Map" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "two-pointers", label: "Two Pointers" },
      { slug: "tree-dfs", label: "Tree DFS" },
    ],
    whyCorrect:
      "Expand right to include characters; shrink left while distinct count exceeds k.",
    whyWrong: {
      hashing:
        "A hash map tracks frequency inside the window, but the pattern is the sliding window invariant.",
      "two-pointers":
        "Not typically converging pointers — window expands and contracts from the left.",
      "tree-dfs":
        "String substring problems are array/string window problems, not trees.",
    },
    signals: ["substring", "at most k distinct", "expand/shrink window"],
  },
  {
    id: "drill-4",
    difficulty: "medium",
    statement:
      "You are given a sorted array and a target. Find the index where target would be inserted.",
    correctPatternSlug: "binary-search",
    options: [
      { slug: "binary-search", label: "Binary Search" },
      { slug: "two-pointers", label: "Two Pointers" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "modified-binary-search", label: "Modified Binary Search" },
    ],
    whyCorrect:
      "Classic monotonic search space — halve the range by comparing mid to target.",
    whyWrong: {
      "two-pointers":
        "Two pointers solve pair problems; insertion position is a single index search.",
      "sliding-window":
        "No subarray window — need O(log n) position search.",
      "modified-binary-search":
        "Could apply, but standard binary search on sorted data is the core pattern.",
    },
    signals: ["sorted array", "find position", "O(log n)"],
  },
  {
    id: "drill-5",
    difficulty: "easy",
    statement: "Compute nth Fibonacci number using a recursive definition.",
    correctPatternSlug: "recursion",
    options: [
      { slug: "recursion", label: "Recursion" },
      { slug: "dp-1d", label: "1D DP" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "two-pointers", label: "Two Pointers" },
    ],
    whyCorrect:
      "Problem is defined recursively: fib(n) = fib(n-1) + fib(n-2) with base cases.",
    whyWrong: {
      "dp-1d":
        "DP optimizes overlapping subcalls, but the natural first model is recursion.",
      "sliding-window":
        "No contiguous subarray structure.",
      "two-pointers":
        "Not a two-ended scan problem.",
    },
    signals: ["recursive definition", "base case", "repeated subcalls"],
  },
  {
    id: "drill-6",
    difficulty: "medium",
    statement:
      "Count the number of subarrays whose sum equals k (array may contain negatives).",
    correctPatternSlug: "prefix-sum",
    options: [
      { slug: "prefix-sum", label: "Prefix Sum" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "two-pointers", label: "Two Pointers" },
      { slug: "hashing", label: "Hash Map + Prefix" },
    ],
    whyCorrect:
      "Prefix sums turn range sums into O(1); combine with a hash map counting prior prefixes.",
    whyWrong: {
      "sliding-window":
        "Sliding window needs nonnegative values for monotonic shrink; negatives break that.",
      "two-pointers":
        "Sorted order is not guaranteed with negatives.",
      hashing:
        "Hashing is the mechanism inside the prefix-sum pattern here.",
    },
    signals: ["subarray sum", "negatives allowed", "count pairs of prefixes"],
  },
  {
    id: "drill-7",
    difficulty: "medium",
    statement:
      "Given the root of a binary tree, return its maximum depth.",
    correctPatternSlug: "tree-dfs",
    options: [
      { slug: "tree-bfs", label: "Tree BFS" },
      { slug: "tree-dfs", label: "Tree DFS" },
      { slug: "graph-bfs", label: "Graph BFS" },
      { slug: "recursion", label: "Recursion" },
    ],
    whyCorrect:
      "DFS recursively computes 1 + max(left depth, right depth).",
    whyWrong: {
      "tree-bfs":
        "BFS can track level count, but depth is naturally expressed with DFS recursion.",
      "graph-bfs":
        "A tree is not a general graph with cycles for this entry pattern.",
      recursion:
        "Recursion is the technique; tree-dfs is the pattern category.",
    },
    signals: ["binary tree", "depth/height", "recursive structure"],
  },
  {
    id: "drill-8",
    difficulty: "hard",
    statement:
      "Find the shortest path from source to target in an unweighted grid with obstacles.",
    correctPatternSlug: "graph-bfs",
    options: [
      { slug: "graph-dfs", label: "Graph DFS" },
      { slug: "graph-bfs", label: "Graph BFS" },
      { slug: "greedy", label: "Greedy" },
      { slug: "tree-bfs", label: "Tree BFS" },
    ],
    whyCorrect:
      "BFS explores layer by layer and finds shortest steps in unweighted graphs.",
    whyWrong: {
      "graph-dfs":
        "DFS does not guarantee shortest path in unweighted grids.",
      greedy:
        "Greedy does not guarantee shortest path on grids with obstacles.",
      "tree-bfs":
        "Grid with obstacles is a graph, not a simple tree.",
    },
    signals: ["shortest path", "unweighted", "grid neighbors"],
  },
  {
    id: "drill-9",
    difficulty: "medium",
    statement:
      "Given coins of different denominations, find the minimum coins needed to make amount n.",
    correctPatternSlug: "dp-1d",
    options: [
      { slug: "greedy", label: "Greedy" },
      { slug: "dp-1d", label: "1D DP" },
      { slug: "recursion", label: "Recursion" },
      { slug: "subsets-backtracking", label: "Backtracking" },
    ],
    whyCorrect:
      "Optimal substructure: dp[i] = min(dp[i - coin] + 1) over coins.",
    whyWrong: {
      greedy:
        "Greedy fails for arbitrary coin systems (e.g. coins 1, 3, 4).",
      recursion:
        "Recursion alone is exponential without memoization/DP table.",
      "subsets-backtracking":
        "Backtracking enumerates all combinations; DP avoids recomputation.",
    },
    signals: ["minimum ways", "overlapping subproblems", "coin choices"],
  },
  {
    id: "drill-10",
    difficulty: "medium",
    statement:
      "Find the next greater element for each index in an array.",
    correctPatternSlug: "monotonic-stack",
    options: [
      { slug: "monotonic-stack", label: "Monotonic Stack" },
      { slug: "two-pointers", label: "Two Pointers" },
      { slug: "sliding-window", label: "Sliding Window" },
      { slug: "binary-search", label: "Binary Search" },
    ],
    whyCorrect:
      "Maintain a decreasing stack of indices; pop when a greater element arrives.",
    whyWrong: {
      "two-pointers":
        "No sorted two-ended convergence — need next greater to the right.",
      "sliding-window":
        "Not a contiguous window optimization problem.",
      "binary-search":
        "Each element needs scan to the right, not a sorted search on whole array.",
    },
    signals: ["next greater", "scan with stack", "O(n) amortized"],
  },
];

export function getDrillById(id: string): RecognitionDrill | undefined {
  return recognitionDrills.find((d) => d.id === id);
}
