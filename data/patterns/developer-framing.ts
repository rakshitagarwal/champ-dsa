/** Extra copy for engineers strong in coding but newer to DSA. */
export type DeveloperPatternFraming = {
  summary?: string;
  hook: string;
  recognize: string;
};

export const developerPatternFraming: Record<string, DeveloperPatternFraming> = {
  "two-pointers": {
    summary:
      "Two indices walking a list — like merging sorted logs or checking a palindrome without nested loops.",
    hook:
      "You already use indexes in loops; this pattern just runs two of them with a clear rule for when each moves. It turns many O(n²) brute-force scans into a single pass.",
    recognize:
      "Sorted array + pair/triplet, palindrome check, in-place partition, or “find two values that meet a condition” on a line.",
  },
  "sliding-window": {
    summary:
      "A moving slice of an array or string — expand the right edge, shrink the left when the window breaks a rule.",
    hook:
      "Same idea as buffering the last N requests or keeping a running total in a dashboard — fixed or flexible window, one pass.",
    recognize:
      "Longest/shortest substring, subarray sum at most K, max in window of size K, “contiguous” in the problem statement.",
  },
  "prefix-sum": {
    summary:
      "Precompute running totals so any range sum is one subtraction — like cumulative metrics in analytics.",
    hook:
      "If you find yourself summing ranges repeatedly, prefix sums (often plus a hash map) replace nested loops with one scan.",
    recognize:
      "Range sum queries, count subarrays with sum K, 2D grid region sums, “how many segments sum to X”.",
  },
  kadane: {
    summary:
      "Track the best sum ending at each index — the standard fix for “maximum subarray sum”.",
    hook:
      "At each step you only decide: extend the current run or start fresh. No need to try every subarray.",
    recognize:
      "Maximum subarray sum, best contiguous segment, sometimes wrapped/circular variants.",
  },
  hashing: {
    summary:
      "Use a Map or Set for O(1) “have we seen this?” — the same trick as indexing records by id in an app.",
    hook:
      "Nested loops often mean “look up something about the past.” A hash table stores that past so each step is constant time.",
    recognize:
      "Two sum (unsorted), anagrams, frequency counts, duplicate detection, subarray sum with complements.",
  },
  "binary-search": {
    summary:
      "Cut the search space in half each step — works on sorted data or any yes/no predicate that flips once.",
    hook:
      "Like git bisect: if the answer is monotonic (all false then all true), binary search finds the boundary in log time.",
    recognize:
      "Sorted array lookup, first/last position, “minimum X such that … works”, capacity/speed problems on answer.",
  },
  "fast-slow-pointers": {
    summary:
      "Two pointers at different speeds on a linked structure — detects cycles and finds the middle.",
    hook:
      "If a linked list might loop (bad next pointer), fast/slow meets inside the cycle — same idea as two runners on a track.",
    recognize:
      "Cycle in linked list, middle node, happy number, implicit sequence with repetition.",
  },
  "merge-intervals": {
    summary:
      "Sort by start, then merge overlapping ranges — scheduling and calendar problems.",
    hook:
      "After sorting, you only compare each interval to the last merged one — like coalescing overlapping meetings on a timeline.",
    recognize:
      "Meeting rooms, insert interval, overlapping time ranges, employee availability.",
  },
  "cyclic-sort": {
    summary:
      "Put values 1..n into index value-1 by swapping — in-place when the domain is known.",
    hook:
      "When numbers are a permutation of 1..n, each swap fixes at least one position — no extra array needed.",
    recognize:
      "Missing number, duplicate in 1..n, first missing positive, array where values map to indices.",
  },
  "top-k-heap": {
    summary:
      "Keep only the K best items in a small heap while streaming — like a “top 10” leaderboard.",
    hook:
      "You do not need to sort the whole array — a heap of size K tracks the winners as you scan once.",
    recognize:
      "K largest/smallest, K closest points, top K frequent elements, streaming data.",
  },
  "monotonic-stack": {
    summary:
      "Stack that stays sorted so each element finds its “next greater” or boundary in one pass.",
    hook:
      "Like waiting in a line until someone taller arrives — the stack holds people still waiting for an answer.",
    recognize:
      "Next greater element, daily temperatures, histogram area, stock span problems.",
  },
  "tree-bfs": {
    summary:
      "Level-by-level traversal with a queue — explore the tree layer by layer.",
    hook:
      "Same as BFS on a graph: queue holds the frontier; process an entire level before going deeper.",
    recognize:
      "Level order, zigzag levels, minimum depth, nodes at distance K, shortest path in unweighted tree.",
  },
  "tree-dfs": {
    summary:
      "Go deep first with recursion — natural for paths, depth, and subtree questions.",
    hook:
      "Each call handles one subtree; you combine left/right results. Familiar if you have written recursive file-tree walks.",
    recognize:
      "Path sum, max depth, diameter, validate BST, invert tree, count nodes in range.",
  },
  "subsets-backtracking": {
    summary:
      "Try include/skip choices, undo, repeat — enumerate combinations without missing cases.",
    hook:
      "Like exploring a decision tree: pick an element or not, recurse, then undo (backtrack) so the next branch is clean.",
    recognize:
      "All subsets, combinations, permutations with constraints, combination sum, letter combinations.",
  },
  "modified-binary-search": {
    summary:
      "Binary search when the array is rotated or when you search the answer space instead of indices.",
    hook:
      "One half is always sorted — figure out which half, then decide if the target lives there. Same bisect mindset as production debugging.",
    recognize:
      "Rotated sorted array, find min in rotated array, binary search on capacity/time/speed answer.",
  },
  "bitwise-xor": {
    summary:
      "XOR cancels duplicates — find the odd-one-out or missing value with bit tricks.",
    hook:
      "a ^ a = 0 and a ^ 0 = a — so XOR-ing everything leaves the single number that appears once.",
    recognize:
      "Single number, missing number XOR variant, swap without temp, parity checks.",
  },
  "two-heaps": {
    summary:
      "Max-heap for lower half, min-heap for upper half — maintain median as stream grows.",
    hook:
      "Split the data into two balanced heaps so the middle is always at the tops — useful for running medians in metrics.",
    recognize:
      "Find median from data stream, sliding window median, balance two multisets.",
  },
  "topological-sort": {
    summary:
      "Order tasks with dependencies — only possible on DAGs (no cycles).",
    hook:
      "Like build pipelines: run steps whose prerequisites are done; BFS (Kahn) or DFS post-order both work.",
    recognize:
      "Course schedule, task order, alien dictionary, build order with dependencies.",
  },
  greedy: {
    summary:
      "Make the locally best choice each step — works when local optimum leads to global optimum.",
    hook:
      "Not every problem allows greediness; when it does, you skip trying all combinations. Think interval scheduling or coin change with canonical coins.",
    recognize:
      "Activity selection, jump game, assign cookies, minimize arrows, Huffman-style merging when proved greedy.",
  },
  math: {
    summary:
      "Number theory and arithmetic shortcuts — GCD, primes, modulo, digit tricks.",
    hook:
      "Some problems are pure math, not data structures. Recognize modulo for overflow, sieve for primes, Euclidean algorithm for GCD.",
    recognize:
      "Divisors, prime counting, pow(x,n), reverse digits, happy number math form.",
  },
  "dp-1d": {
    summary:
      "Build answers from smaller subproblems in one dimension — often a 1D table or rolling variables.",
    hook:
      "Same spirit as caching API responses: store sub-results so you never recompute. Start with brute recursion, then memoize or tabulate.",
    recognize:
      "Fibonacci-style, climb stairs, house robber, coin change min coins, longest increasing subsequence.",
  },
  recursion: {
    summary:
      "Function calls itself on smaller input — base case stops the chain.",
    hook:
      "You use recursion daily in tree walks and nested JSON. DSA adds discipline: clear base case, trust the recursive call, combine results.",
    recognize:
      "Tree/graph DFS, divide and conquer, backtracking, problems stated as “all ways” or “explore”.",
  },
  "graph-bfs": {
    summary:
      "Explore graph layer by layer — shortest path in unweighted graphs.",
    hook:
      "Queue + visited set — same as tree BFS but watch for cycles and multiple edges.",
    recognize:
      "Shortest path in grid, word ladder, islands (multi-source BFS), level-by-level in graph.",
  },
  "graph-dfs": {
    summary:
      "Go deep in a graph — count components, detect cycles, path finding with backtracking.",
    hook:
      "Recursive or iterative stack; mark visited to avoid infinite loops. Good for “explore all connected nodes”.",
    recognize:
      "Number of islands, clone graph, path exists, cycle detection, flood fill.",
  },
  trie: {
    summary:
      "Tree of characters for fast prefix lookup — autocomplete and word search.",
    hook:
      "Like a nested object keyed by letters — share prefixes instead of storing whole strings repeatedly.",
    recognize:
      "Implement autocomplete, word search II, prefix matching, dictionary of words.",
  },
};

export function getDeveloperFraming(
  slug: string,
): DeveloperPatternFraming | undefined {
  return developerPatternFraming[slug];
}
