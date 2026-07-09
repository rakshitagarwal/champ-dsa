/** Recognition cues surfaced at the top of each DSA pattern page. */

export const DSA_RECOGNITION_CUES: Record<string, string[]> = {
  "arrays-strings": [
    "If the problem is a basic scan, reverse, rotate, or in-place filter on an array or string",
    "If you need character frequency counting with a fixed alphabet (26 letters)",
    "Skim this if you already know two pointers, sliding window, and prefix sum",
  ],
  hashing: [
    "If you need O(1) existence checks, duplicate detection, or complement lookup (Two Sum)",
    "If you group elements by a computed key (anagrams, frequency signature)",
    "If brute force would use nested loops over the same array",
  ],
  "two-pointers": [
    "If the input is sorted and you need a pair or triplet with a target sum",
    "If you reverse, partition, or remove duplicates in-place with O(1) space",
    "If opposite ends or slow/fast pointers can eliminate candidates each step",
  ],
  "sliding-window": [
    "If the answer is a contiguous subarray or substring with a sum/length constraint",
    "If fixed window size k — add right element, remove left in O(1)",
    "If you expand right and shrink left while a validity condition holds",
  ],
  "prefix-sum": [
    "If you count subarrays with sum exactly k (negatives allowed)",
    "If range-sum queries repeat on the same static array",
    "If you track running totals and look up (currentSum - k) in a map",
  ],
  "binary-search": [
    "If the input is sorted and you need O(log n) search or insertion position",
    "If the answer space is monotonic (first true / last true boundary)",
    "If you can binary search on the answer (capacity, speed, minimum days)",
  ],
  sorting: [
    "If ordering unlocks a greedy or two-pointer approach (intervals, pair sums)",
    "If you need to find duplicates, kth largest, or merge sorted streams",
    "If O(n log n) is acceptable and simplifies the invariant",
  ],
  "linked-list": [
    "If nodes have .next pointers and you reverse, merge, or detect cycles",
    "If slow/fast pointers find the middle or cycle entrance",
    "If in-place pointer rewiring beats array indexing",
  ],
  "stack-queue": [
    "If you need LIFO (matching brackets, undo) or FIFO (BFS level order)",
    "If you process elements in arrival order with deferred handling",
    "If a monotonic stack variant does not apply yet",
  ],
  "monotonic-stack": [
    "If each index needs the next greater or smaller element to the right",
    "If you maintain a decreasing/increasing stack of indices while scanning",
    "If histogram area or daily temperatures style problems appear",
  ],
  heap: [
    "If you need the top K or smallest K elements in a stream",
    "If you merge K sorted lists or run Dijkstra with a priority queue",
    "If a full sort is overkill but you need repeated min/max extraction",
  ],
  trees: [
    "If the input is a binary tree and you need depth, path sum, or traversal order",
    "If DFS recursion or iterative BFS level-order fits naturally",
    "If subtrees share structure — recurse on left and right children",
  ],
  graphs: [
    "If nodes and edges form a network — connectivity, cycles, or shortest path",
    "If BFS finds shortest steps in an unweighted grid or graph",
    "If DFS explores components, topological order, or island counting",
  ],
  "union-find": [
    "If edges are added incrementally and you query connectivity",
    "If Kruskal MST or redundant connection detection is required",
    "If merging groups by equivalence is cheaper than full graph rebuild",
  ],
  backtracking: [
    "If you enumerate all subsets, permutations, or combinations",
    "If you try a choice, recurse, then undo (choose / explore / unchoose)",
    "If pruning invalid branches early reduces the search tree",
  ],
  greedy: [
    "If a local optimal choice leads to global optimum (interval scheduling)",
    "If sorting by end time or ratio unlocks a one-pass greedy proof",
    "Skip if coin systems or knapsack need DP instead",
  ],
  dp: [
    "If the problem asks for min/max/count ways with overlapping subproblems",
    "If a recurrence relates dp[i] to dp[i-1], dp[i-2], or dp[i - coin]",
    "If brute-force recursion revisits the same states repeatedly",
  ],
};

export function getRecognitionCues(slug: string): string[] {
  return DSA_RECOGNITION_CUES[slug] ?? [];
}
