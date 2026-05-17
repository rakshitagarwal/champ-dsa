export type Flashcard = {
  id: string;
  front: string;
  back: string;
  tag: string;
};

export const flashcards: Flashcard[] = [
  {
    id: "mono-stack",
    front: "When should a monotonic stack be used?",
    back: "When you need the next greater/smaller element, or to maintain increasing/decreasing order while scanning.",
    tag: "Stacks",
  },
  {
    id: "bfs-dfs",
    front: "Difference between BFS and DFS?",
    back: "BFS uses a queue and explores level-by-level (shortest path in unweighted graphs). DFS uses a stack/recursion and goes deep first.",
    tag: "Graphs",
  },
  {
    id: "sliding-window",
    front: "When is sliding window useful?",
    back: "Contiguous subarray/substring problems where you can expand/shrink a window instead of nested loops.",
    tag: "Arrays",
  },
  {
    id: "two-pointers",
    front: "When use two pointers?",
    back: "Sorted arrays, pair sums, palindromes, or in-place partition problems with left/right convergence.",
    tag: "Arrays",
  },
  {
    id: "prefix-sum",
    front: "What does prefix sum optimize?",
    back: "Range sum queries in O(1) after O(n) preprocessing — subarray sum equals prefix[r] - prefix[l-1].",
    tag: "Arrays",
  },
  {
    id: "dp-opt",
    front: "DP vs greedy?",
    back: "Use DP when optimal substructure needs exploring multiple choices; greedy works when local optimal is globally optimal.",
    tag: "DP",
  },
  {
    id: "tree-dfs",
    front: "Tree DFS base cases?",
    back: "Null node returns; otherwise process node, recurse left, recurse right (or post-order variants).",
    tag: "Trees",
  },
  {
    id: "recursion",
    front: "How to debug recursion?",
    back: "Trace call stack, verify base case, ensure arguments move toward base case, draw recursion tree.",
    tag: "Recursion",
  },
  {
    id: "hash-map",
    front: "When use hash map in arrays?",
    back: "Need O(1) complement lookup (two sum), frequency counts, or deduplication.",
    tag: "Arrays",
  },
  {
    id: "binary-search",
    front: "Binary search precondition?",
    back: "Monotonic predicate on index — often sorted array or answer space with feasible/infeasible halves.",
    tag: "Search",
  },
];
