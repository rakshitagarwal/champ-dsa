export type CheatsheetCategory =
  | "pattern-recognition"
  | "interview-checklist"
  | "sorting"
  | "searching"
  | "arrays-strings"
  | "linked-lists"
  | "stacks-queues"
  | "trees"
  | "graphs"
  | "heap"
  | "hashing"
  | "dynamic-programming"
  | "greedy"
  | "bit-manipulation";

export type CheatsheetEntry = {
  name: string;
  time: string;
  space: string;
  notes?: string;
};

export type CheatsheetSection = {
  id: CheatsheetCategory;
  title: string;
  description: string;
  entries: CheatsheetEntry[];
};

export const CHEATSHEET_SECTIONS: CheatsheetSection[] = [
  {
    id: "pattern-recognition",
    title: "Pattern recognition",
    description:
      "Problem signals → which technique to try first (quick reference).",
    entries: [
      {
        name: "Sorted array + pair / triplet",
        time: "Two Pointers",
        space: "O(n)",
        notes: "Opposite ends or same direction",
      },
      {
        name: "Subarray max/min with constraint",
        time: "Sliding Window",
        space: "O(n)",
      },
      {
        name: "Range sum / count subarrays sum = k",
        time: "Prefix Sum",
        space: "O(n)",
      },
      {
        name: "Maximum subarray sum",
        time: "Kadane's",
        space: "O(1)",
      },
      {
        name: "Pair / frequency / grouping",
        time: "Hashing",
        space: "O(n)",
      },
      {
        name: "Sorted lookup O(log n)",
        time: "Binary Search",
        space: "O(1)",
      },
      {
        name: "Rotated sorted / min in range / feasibility",
        time: "Modified Binary Search",
        space: "O(log n)",
      },
      {
        name: "Values in 1..n, missing / duplicate",
        time: "Cyclic Sort",
        space: "O(1)",
      },
      {
        name: "Linked list cycle / middle",
        time: "Fast & Slow Pointers",
        space: "O(1)",
      },
      {
        name: "Overlapping intervals / scheduling",
        time: "Merge Intervals",
        space: "O(n log n)",
      },
      {
        name: "Always need min or max while scanning",
        time: "Heap",
        space: "O(n)",
      },
      {
        name: "Top K largest / smallest / frequent",
        time: "Top K Heap",
        space: "O(k)",
      },
      {
        name: "Running median of stream",
        time: "Two Heaps",
        space: "O(n)",
      },
      {
        name: "Matching brackets / next greater",
        time: "Stack / Monotonic Stack",
        space: "O(n)",
      },
      {
        name: "Tree level-by-level / unweighted shortest",
        time: "Tree BFS",
        space: "O(n)",
      },
      {
        name: "Path sum / depth / validate tree",
        time: "Tree DFS",
        space: "O(h)",
      },
      {
        name: "Prefix search / autocomplete",
        time: "Trie",
        space: "O(m)",
      },
      {
        name: "All subsets / permutations / combinations",
        time: "Backtracking",
        space: "O(2^n)–O(n!)",
      },
      {
        name: "Single number / XOR tricks",
        time: "Bitwise XOR",
        space: "O(1)",
      },
      {
        name: "Unweighted graph shortest path",
        time: "Graph BFS",
        space: "O(V+E)",
      },
      {
        name: "Components / undirected cycle",
        time: "Graph DFS / Union-Find",
        space: "O(V+E)",
      },
      {
        name: "Task ordering with dependencies",
        time: "Topological Sort",
        space: "O(V+E)",
      },
      {
        name: "Weighted shortest path (non-negative)",
        time: "Dijkstra's",
        space: "O(V)",
        notes: "Min-heap + distance array",
      },
      {
        name: "Local choice → global optimum (proved)",
        time: "Greedy",
        space: "Varies",
      },
      {
        name: "Overlapping subproblems + optimal substructure",
        time: "Dynamic Programming",
        space: "O(n)–O(n·m)",
      },
    ],
  },
  {
    id: "interview-checklist",
    title: "Interview checklist",
    description: "Edge cases and DP anchors to scan before you submit.",
    entries: [
      {
        name: "Arrays",
        time: "—",
        space: "—",
        notes: "[], single element, all same, sorted, reversed",
      },
      {
        name: "Strings",
        time: "—",
        space: "—",
        notes: 'empty "", single char, all same, palindrome',
      },
      {
        name: "Linked list",
        time: "—",
        space: "—",
        notes: "null head, single node, cycle",
      },
      {
        name: "Tree",
        time: "—",
        space: "—",
        notes: "null root, single node, skewed, perfect",
      },
      {
        name: "Graph",
        time: "—",
        space: "—",
        notes: "disconnected, self-loops, no edges",
      },
      {
        name: "DP",
        time: "—",
        space: "—",
        notes: "n = 0/1, amount = 0, define dp[i] before coding",
      },
      {
        name: "Binary search",
        time: "—",
        space: "—",
        notes: "lo > hi exit; mid = lo + ((hi-lo)>>1)",
      },
      {
        name: "Numbers",
        time: "—",
        space: "—",
        notes: "0, negatives, INT bounds, multiply overflow",
      },
      {
        name: "DP decision",
        time: "—",
        space: "—",
        notes:
          "Min/max/count + overlapping subproblems → DP; 1 index = 1D, (i,j) = 2D",
      },
      {
        name: "Backtracking",
        time: "—",
        space: "—",
        notes: "choose → recurse → undo; sort + skip duplicates",
      },
    ],
  },
  {
    id: "sorting",
    title: "Sorting",
    description: "Classic comparison and non-comparison sorts.",
    entries: [
      {
        name: "Bubble Sort",
        time: "O(n²) best / avg / worst",
        space: "O(1)",
        notes: "Stable; in-place",
      },
      {
        name: "Selection Sort",
        time: "O(n²) best / avg / worst",
        space: "O(1)",
        notes: "Unstable; minimal swaps",
      },
      {
        name: "Insertion Sort",
        time: "O(n) best, O(n²) avg / worst",
        space: "O(1)",
        notes: "Stable; great for nearly sorted",
      },
      {
        name: "Merge Sort",
        time: "O(n log n) best / avg / worst",
        space: "O(n)",
        notes: "Stable; predictable",
      },
      {
        name: "Quick Sort",
        time: "O(n log n) avg, O(n²) worst",
        space: "O(log n) stack",
        notes: "Unstable; fast in practice",
      },
      {
        name: "Heap Sort",
        time: "O(n log n) best / avg / worst",
        space: "O(1)",
        notes: "Unstable; in-place",
      },
      {
        name: "Counting Sort",
        time: "O(n + k)",
        space: "O(k)",
        notes: "Stable; k = value range",
      },
      {
        name: "Radix Sort",
        time: "O(d · (n + b))",
        space: "O(n + b)",
        notes: "Stable; d = digits, b = base",
      },
      {
        name: "Tim Sort (Python/Java default)",
        time: "O(n log n) worst",
        space: "O(n)",
        notes: "Stable; hybrid merge + insertion",
      },
    ],
  },
  {
    id: "searching",
    title: "Searching",
    description: "Find elements in sorted and unsorted structures.",
    entries: [
      {
        name: "Linear Search",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Binary Search",
        time: "O(log n)",
        space: "O(1) iterative, O(log n) recursive",
        notes: "Requires sorted array",
      },
      {
        name: "Binary Search (first / last occurrence)",
        time: "O(log n)",
        space: "O(1)",
        notes: "Lower / upper bound variants",
      },
      {
        name: "Ternary Search (unimodal)",
        time: "O(log n)",
        space: "O(1)",
        notes: "Single-peak functions",
      },
      {
        name: "Search in rotated sorted array",
        time: "O(log n)",
        space: "O(1)",
      },
      {
        name: "Search in 2D matrix (sorted rows/cols)",
        time: "O(m + n)",
        space: "O(1)",
        notes: "Staircase from top-right or bottom-left",
      },
      {
        name: "Quick select (kth element)",
        time: "O(n) avg, O(n²) worst",
        space: "O(1)",
      },
    ],
  },
  {
    id: "arrays-strings",
    title: "Arrays & Strings",
    description: "Common patterns and window techniques.",
    entries: [
      {
        name: "Two pointers",
        time: "O(n)",
        space: "O(1)",
        notes: "Opposite ends or same direction",
      },
      {
        name: "Sliding window (fixed size)",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Sliding window (variable size)",
        time: "O(n)",
        space: "O(1)–O(k)",
        notes: "k = charset / distinct count",
      },
      {
        name: "Prefix sum (range query)",
        time: "O(n) build, O(1) query",
        space: "O(n)",
      },
      {
        name: "Kadane's (max subarray)",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Dutch national flag (3-way partition)",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Cyclic sort (values 1..n)",
        time: "O(n)",
        space: "O(1)",
        notes: "Swap each value to index value-1",
      },
    ],
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Pointer manipulation classics.",
    entries: [
      {
        name: "Traverse / search",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Fast & slow pointers (cycle, middle)",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Reverse linked list",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Merge two sorted lists",
        time: "O(n + m)",
        space: "O(1)",
      },
      {
        name: "Reorder / remove nth from end",
        time: "O(n)",
        space: "O(1)",
      },
    ],
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    description: "LIFO/FIFO and monotonic structures.",
    entries: [
      {
        name: "Stack push / pop / peek",
        time: "O(1)",
        space: "O(n)",
      },
      {
        name: "Queue enqueue / dequeue",
        time: "O(1) amortized",
        space: "O(n)",
      },
      {
        name: "Monotonic stack",
        time: "O(n)",
        space: "O(n)",
        notes: "Next greater element, histogram",
      },
      {
        name: "Monotonic deque (sliding max/min)",
        time: "O(n)",
        space: "O(k)",
      },
      {
        name: "Valid parentheses",
        time: "O(n)",
        space: "O(n)",
      },
    ],
  },
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BST, and traversals.",
    entries: [
      {
        name: "DFS (pre / in / post order)",
        time: "O(n)",
        space: "O(h)",
        notes: "h = height",
      },
      {
        name: "BFS / level order",
        time: "O(n)",
        space: "O(w)",
        notes: "w = max width",
      },
      {
        name: "BST search / insert / delete",
        time: "O(h) avg, O(n) worst",
        space: "O(1) iterative",
      },
      {
        name: "Validate BST",
        time: "O(n)",
        space: "O(h)",
      },
      {
        name: "Lowest common ancestor (BST)",
        time: "O(h)",
        space: "O(1)",
      },
      {
        name: "Lowest common ancestor (binary tree)",
        time: "O(n)",
        space: "O(h)",
      },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Traversal, shortest paths, and connectivity.",
    entries: [
      {
        name: "BFS (unweighted shortest path)",
        time: "O(V + E)",
        space: "O(V)",
      },
      {
        name: "DFS",
        time: "O(V + E)",
        space: "O(V)",
      },
      {
        name: "Topological sort (Kahn / DFS)",
        time: "O(V + E)",
        space: "O(V)",
      },
      {
        name: "Dijkstra (non-negative weights)",
        time: "O((V + E) log V) with heap",
        space: "O(V)",
      },
      {
        name: "Bellman–Ford",
        time: "O(V · E)",
        space: "O(V)",
        notes: "Handles negative edges",
      },
      {
        name: "Floyd–Warshall (all pairs)",
        time: "O(V³)",
        space: "O(V²)",
      },
      {
        name: "Union–Find (connectivity)",
        time: "O(α(n)) per op",
        space: "O(n)",
        notes: "α = inverse Ackermann",
      },
      {
        name: "Kruskal MST",
        time: "O(E log E)",
        space: "O(V)",
      },
      {
        name: "Prim MST",
        time: "O((V + E) log V)",
        space: "O(V)",
      },
    ],
  },
  {
    id: "heap",
    title: "Heap / Priority Queue",
    description: "Top-K and scheduling problems.",
    entries: [
      {
        name: "Insert / extract-min (binary heap)",
        time: "O(log n)",
        space: "O(n)",
      },
      {
        name: "Build heap",
        time: "O(n)",
        space: "O(n)",
      },
      {
        name: "Top K elements",
        time: "O(n log k)",
        space: "O(k)",
        notes: "Min-heap of size k",
      },
      {
        name: "Merge K sorted lists",
        time: "O(N log k)",
        space: "O(k)",
        notes: "N = total elements",
      },
      {
        name: "Median from data stream",
        time: "O(log n) per add",
        space: "O(n)",
        notes: "Two heaps",
      },
    ],
  },
  {
    id: "hashing",
    title: "Hashing",
    description: "Maps, sets, and frequency counts.",
    entries: [
      {
        name: "Hash map get / put / delete",
        time: "O(1) avg, O(n) worst",
        space: "O(n)",
      },
      {
        name: "Two sum (complement lookup)",
        time: "O(n)",
        space: "O(n)",
      },
      {
        name: "Group anagrams",
        time: "O(n · k log k)",
        space: "O(n)",
        notes: "k = key length",
      },
      {
        name: "Subarray sum equals K (prefix + map)",
        time: "O(n)",
        space: "O(n)",
      },
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Common state transitions to memorize.",
    entries: [
      {
        name: "Fibonacci (memo / tab)",
        time: "O(n)",
        space: "O(n) or O(1)",
      },
      {
        name: "Climbing stairs",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "House robber (no adjacent)",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Coin change (min coins)",
        time: "O(amount · n)",
        space: "O(amount)",
      },
      {
        name: "0/1 Knapsack",
        time: "O(n · W)",
        space: "O(W)",
        notes: "W = capacity",
      },
      {
        name: "LCS (two strings)",
        time: "O(m · n)",
        space: "O(m · n) or O(min(m,n))",
      },
      {
        name: "LIS",
        time: "O(n log n)",
        space: "O(n)",
        notes: "Patience sorting + tails",
      },
      {
        name: "Edit distance",
        time: "O(m · n)",
        space: "O(m · n) or O(n)",
      },
      {
        name: "Grid unique paths",
        time: "O(m · n)",
        space: "O(n)",
      },
    ],
  },
  {
    id: "greedy",
    title: "Greedy",
    description: "Locally optimal choices that often work.",
    entries: [
      {
        name: "Activity selection / intervals",
        time: "O(n log n)",
        space: "O(1)",
        notes: "Sort by end time",
      },
      {
        name: "Jump game",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Gas station circuit",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Huffman coding",
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    description: "Useful tricks for interviews.",
    entries: [
      {
        name: "Check power of two",
        time: "O(1)",
        space: "O(1)",
        notes: "n > 0 && (n & (n-1)) === 0",
      },
      {
        name: "Count set bits",
        time: "O(log n)",
        space: "O(1)",
      },
      {
        name: "Single number (XOR all)",
        time: "O(n)",
        space: "O(1)",
      },
      {
        name: "Subset generation (bitmask)",
        time: "O(2^n · n)",
        space: "O(1) extra",
      },
    ],
  },
];

export const CHEATSHEET_CATEGORY_LABELS: Record<CheatsheetCategory, string> = {
  "pattern-recognition": "Pattern recognition",
  "interview-checklist": "Interview checklist",
  sorting: "Sorting",
  searching: "Searching",
  "arrays-strings": "Arrays & Strings",
  "linked-lists": "Linked Lists",
  "stacks-queues": "Stacks & Queues",
  trees: "Trees",
  graphs: "Graphs",
  heap: "Heap",
  hashing: "Hashing",
  "dynamic-programming": "Dynamic Programming",
  greedy: "Greedy",
  "bit-manipulation": "Bit Manipulation",
};
