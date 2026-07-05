export type DsaNoteMeta = {
  slug: string;
  title: string;
  description?: string;
};

export const DSA_CATALOG: DsaNoteMeta[] = [
  { slug: "arrays-strings", title: "Arrays & Strings", description: "Techniques for array and string manipulation." },
  { slug: "hashing", title: "Hashing", description: "Use hash maps/sets for O(1) lookups." },
  { slug: "two-pointers", title: "Two Pointers", description: "Two pointers scanning from opposite ends or different speeds." },
  { slug: "sliding-window", title: "Sliding Window", description: "Maintain a contiguous window that expands and contracts." },
  { slug: "prefix-sum", title: "Prefix Sum", description: "Precompute cumulative sums for range queries." },
  { slug: "binary-search", title: "Binary Search", description: "Divide the search space in half each iteration." },
  { slug: "linked-list", title: "Linked List", description: "Pointer manipulation and list reversal techniques." },
  { slug: "stack-queue", title: "Stack & Queue", description: "LIFO and FIFO data structures for ordering." },
  { slug: "monotonic-stack", title: "Monotonic Stack", description: "Find next greater/smaller elements in arrays." },
  { slug: "heap", title: "Heap (Priority Queue)", description: "Efficiently find top/smallest K elements." },
  { slug: "trees", title: "Trees (DFS/BFS)", description: "Tree traversals and level-order operations." },
  { slug: "graphs", title: "Graphs (DFS/BFS)", description: "Graph exploration, cycles, and topological sort." },
  { slug: "union-find", title: "Union Find (DSU)", description: "Disjoint set union for connectivity problems." },
  { slug: "backtracking", title: "Backtracking", description: "Generate all subsets/permutations/combinations." },
  { slug: "greedy", title: "Greedy", description: "Make locally optimal choices leading to global optimum." },
  { slug: "dp", title: "Dynamic Programming", description: "Solve problems by combining subproblem results." },
];
