export type DsaNoteMeta = {
  slug: string;
  title: string;
  description?: string;
};

export const DSA_CATALOG: DsaNoteMeta[] = [
  { slug: "two-pointers", title: "Two Pointers", description: "Two pointers scanning an array from opposite ends or different speeds." },
  { slug: "sliding-window", title: "Sliding Window", description: "Maintain a contiguous window that expands and contracts." },
  { slug: "prefix-sum", title: "Prefix Sum", description: "Precompute cumulative sums for range queries." },
  { slug: "kadane", title: "Kadane's Algorithm", description: "Maximum subarray sum in linear time." },
  { slug: "hashing", title: "Hashing", description: "Use hash maps/sets for O(1) lookups." },
  { slug: "binary-search", title: "Binary Search", description: "Divide the search space in half each iteration." },
  { slug: "fast-slow-pointers", title: "Fast & Slow Pointers", description: "Detect cycles and find middle of linked lists." },
  { slug: "merge-intervals", title: "Merge Intervals", description: "Overlap detection and interval merging." },
  { slug: "cyclic-sort", title: "Cyclic Sort", description: "Place each element at its correct index." },
  { slug: "top-k-heap", title: "Top K Elements (Heap)", description: "Find top/smallest K elements using a heap." },
  { slug: "monotonic-stack", title: "Monotonic Stack", description: "Find next greater/smaller elements in arrays." },
  { slug: "tree-bfs", title: "Tree BFS", description: "Level-order traversal of trees." },
  { slug: "tree-dfs", title: "Tree DFS", description: "Preorder, inorder, postorder tree traversals." },
  { slug: "subsets-backtracking", title: "Subsets & Backtracking", description: "Generate all subsets/permutations/combinations." },
  { slug: "modified-binary-search", title: "Modified Binary Search", description: "Binary search on rotated arrays and unknown bounds." },
  { slug: "bitwise-xor", title: "Bitwise XOR", description: "XOR tricks for finding missing/duplicate numbers." },
  { slug: "two-heaps", title: "Two Heaps", description: "Maintain two heaps for median/sliding median." },
  { slug: "topological-sort", title: "Topological Sort", description: "Order nodes in a DAG based on dependencies." },
  { slug: "greedy", title: "Greedy", description: "Make locally optimal choices leading to global optimum." },
  { slug: "math", title: "Math", description: "Number theory, prime factors, GCD, and combinatorics." },
  { slug: "dp-1d", title: "1D Dynamic Programming", description: "Solve problems by combining subproblem results." },
  { slug: "recursion", title: "Recursion", description: "Solve a problem by solving smaller instances of itself." },
  { slug: "graph-bfs", title: "Graph BFS", description: "Shortest path and level-order in graphs." },
  { slug: "graph-dfs", title: "Graph DFS", description: "Depth-first exploration of graphs." },
  { slug: "trie", title: "Trie (Prefix Tree)", description: "Efficient prefix search and autocomplete." },
];
