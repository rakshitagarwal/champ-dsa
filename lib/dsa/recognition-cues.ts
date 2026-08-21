/** Recognition cues surfaced at the top of each DSA pattern page. Plain-language “if I read this, I reach for…” */

export const DSA_RECOGNITION_CUES: Record<string, string[]> = {
  hashing: [
    "I need to know if I already saw this value, this pair, or this group",
    "Brute force would be two loops over the same list",
    "Anagrams, frequency, complements, longest streak of numbers that exist",
  ],
  "arrays-strings": [
    "In-place rewrite: reverse, move zeroes, rotate",
    "Best contiguous sum (Kadane) — one pass, running total that can restart",
    "No extra data structure, just indices",
  ],
  "prefix-sum": [
    "Range sum / product of everything except me",
    "Count subarrays whose sum is k (negatives allowed) — map of running totals",
    "I would otherwise re-sum the same slice again and again",
  ],
  sorting: [
    "A list of intervals — overlap, insert, merge",
    "If I sort by start or by end, the rest is one linear pass",
    "Sweep left to right and only care about the last kept interval",
  ],
  "two-pointers": [
    "Sorted array, pair or water-between-lines, expand around a center",
    "Two indices that only move forward — never rewind",
    "Trapping water, palindrome from the middle, opposite ends",
  ],
  "sliding-window": [
    "Longest / shortest contiguous substring or subarray with a rule",
    "Fixed size k, or grow until invalid then shrink",
    "Sliding window maximum — deque of useful indices",
  ],
  "stack-queue": [
    "Brackets, nesting, undo, min-so-far while pushing/popping",
    "Last in first out feels like the call stack",
    "Not next-greater (that is monotonic stack)",
  ],
  "monotonic-stack": [
    "For each day/bar, when is the next bigger or next smaller?",
    "Histogram area, daily temperatures, next greater element",
    "Stack of indices that stays increasing or decreasing",
  ],
  "linked-list": [
    "Nodes with .next, maybe .random",
    "Reverse, merge, nth from end, cycle entrance, copy",
    "Dummy node if the head might disappear",
  ],
  "binary-search": [
    "Sorted array, or the answer itself is a number I can binary search (speed, capacity)",
    "Rotated sorted array — still two sorted halves",
    "Pow(x, n) by halving n",
  ],
  trees: [
    "Binary tree: depth, diameter, path sum, LCA, serialize, BST validate",
    "DFS: left and right, then combine",
    "BFS: queue, one level = queue.length",
  ],
  heap: [
    "Top K, k-way merge, running median",
    "I keep throwing away everything worse than the kth",
    "Two heaps: small half vs big half",
  ],
  graphs: [
    "Grid or nodes+edges: islands, clone, rotting, word ladder, topo",
    "Unweighted shortest steps → BFS; weighted delay → Dijkstra",
    "Courses with prereqs → in-degree queue",
  ],
  "union-find": [
    "Keep merging sets, ask if two things are already connected",
    "Extra edge that makes a cycle, MST with Kruskal",
    "Same parent = same group",
  ],
  backtracking: [
    "All subsets, perms, combinations, N-queens, word on a grid",
    "Choose, recurse, pop — that is the whole move",
    "Prune when the path is already illegal",
  ],
  dp: [
    "Min / max / number of ways, and the same state shows up twice",
    "House robber, coins, grid paths, LCS, LIS, edit distance, word break, burst balloons",
    "Write dp[i] in English first, then the loop",
  ],
  greedy: [
    "Jump as far as I can, gas station tank, partition labels, task cooldown",
    "Sort then take the one that finishes first / jumps farthest",
    "If I cannot explain why the local choice is safe, it is probably DP",
  ],
  bits: [
    "XOR, count bits, power of two, missing number in 0..n",
    "Pairs cancel with XOR; n & (n-1) drops the lowest 1-bit",
    "I do not need an extra array if bits already store the answer",
  ],
  trie: [
    "Prefix of words, autocomplete, search many words in a grid",
    "Each character is an edge; share the start of the word",
    "Word Search II — trie + DFS so I do not restart every word",
  ],
  "range-queries": [
    "Update one index, then ask sum of a range, many times",
    "Fenwick / BIT, or merge sort if I am counting smaller on the right",
    "Prefix array is not enough because values keep changing",
  ],
};

export function getRecognitionCues(slug: string): string[] {
  return DSA_RECOGNITION_CUES[slug] ?? [];
}
