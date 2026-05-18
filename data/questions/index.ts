import type { PatternGroup, Question } from "@/types/question";
import { stdinToHuman } from "@/lib/io/human-input";
import { progressiveHintsByQuestionId } from "@/lib/questions/progressive-hints-map";
import { sheetQuestions } from "./sheet-questions";

function enrich(
  q: Omit<Question, "solutionCode" | "humanInput"> & { sampleOutput?: string },
): Question {
  return {
    ...q,
    solutionCode: q.starterCode,
    humanInput: stdinToHuman(q.sampleInput),
    sampleOutput: q.sampleOutput,
    progressiveHints: progressiveHintsByQuestionId[q.id],
  };
}

const seedQuestions: Question[] = ([
  {
    id: "two-sum",
    title: "Two Sum (sorted intuition)",
    patternSlug: "two-pointers",
    patternName: "Two Pointers",
    difficulty: "easy",
    statement:
      "Given nums and target, find two indices such that nums[i] + nums[j] = target. Practice the two-pointer walk on a sorted array.",
    patternHints: [
      "Sort or use hash map for unsorted",
      "Left/right converge when sum is too large/small",
    ],
    starterCode: `function solve(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}`,
    sampleInput: JSON.stringify({ nums: [1, 2, 3, 4, 6], target: 6 }),
    miniVizPreview: {
      type: "array",
      frames: [
        { label: "left,right", indices: [0, 4], values: [1, 2, 3, 4, 6] },
        { label: "sum=7>6", indices: [0, 3], values: [1, 2, 3, 4, 6] },
      ],
    },
  },
  {
    id: "max-subarray-k",
    title: "Max Sum Subarray of Size K",
    patternSlug: "sliding-window",
    patternName: "Sliding Window",
    difficulty: "easy",
    statement:
      "Find maximum sum of any contiguous subarray of size k.",
    patternHints: [
      "Fixed window size k",
      "Slide by adding right, removing left",
    ],
    starterCode: `function solve(nums, k) {
  let sum = 0;
  let maxSum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (i >= k) sum -= nums[i - k];
    if (i >= k - 1) maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}`,
    sampleInput: JSON.stringify({ nums: [2, 1, 5, 1, 3, 2], target: 3 }),
    miniVizPreview: {
      type: "array",
      frames: [
        { label: "window", indices: [0, 1, 2], values: [2, 1, 5, 1, 3, 2] },
        { label: "slide", indices: [1, 2, 3], values: [2, 1, 5, 1, 3, 2] },
      ],
    },
  },
  {
    id: "longest-subarray-sum",
    title: "Longest Subarray with Sum ≤ Target",
    patternSlug: "sliding-window",
    patternName: "Sliding Window",
    difficulty: "medium",
    statement:
      "Variable-size window: expand right, shrink left while sum exceeds target.",
    patternHints: [
      "Contiguous subarray",
      "While loop shrinks invalid window",
    ],
    starterCode: `function solve(nums, target) {
  let left = 0;
  let sum = 0;
  let best = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum > target && left <= right) {
      sum -= nums[left];
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    sampleInput: JSON.stringify({ nums: [2, 1, 5, 1, 3, 2], target: 8 }),
  },
  {
    id: "prefix-range-sum",
    title: "Range Sum with Prefix Array",
    patternSlug: "prefix-sum",
    patternName: "Prefix Sum",
    difficulty: "easy",
    statement: "Build prefix sums and answer range sum queries.",
    patternHints: [
      "prefix[i] = sum of nums[0..i-1]",
      "range(l,r) = prefix[r+1] - prefix[l]",
    ],
    starterCode: `function solve(nums) {
  const prefix = [0];
  for (let i = 0; i < nums.length; i++) {
    prefix.push(prefix[prefix.length - 1] + nums[i]);
  }
  const l = 1, r = 3;
  return prefix[r + 1] - prefix[l];
}`,
    sampleInput: JSON.stringify({ nums: [1, 2, 3, 4, 5] }),
  },
  {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K (count)",
    patternSlug: "prefix-sum",
    patternName: "Prefix Sum",
    difficulty: "medium",
    statement:
      "Count subarrays with sum k using prefix sum + hash map frequency.",
    patternHints: [
      "prefix[j] - prefix[i] = k",
      "Store frequency of prefix sums",
    ],
    starterCode: `function solve(nums, k) {
  const freq = { 0: 1 };
  let prefix = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    const need = prefix - k;
    if (freq[need]) count += freq[need];
    freq[prefix] = (freq[prefix] || 0) + 1;
  }
  return count;
}`,
    sampleInput: JSON.stringify({ nums: [1, 1, 1], target: 2 }),
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates In-Place",
    patternSlug: "two-pointers",
    patternName: "Two Pointers",
    difficulty: "easy",
    statement:
      "Sorted array: use slow/fast pointers to overwrite duplicates.",
    patternHints: ["Fast scans", "Slow marks valid position"],
    starterCode: `function solve(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}`,
    sampleInput: JSON.stringify({ nums: [1, 1, 2, 2, 3] }),
  },
  {
    id: "container-water",
    title: "Container With Most Water",
    patternSlug: "two-pointers",
    patternName: "Two Pointers",
    difficulty: "medium",
    statement:
      "Max area between lines using left/right pointers on heights array.",
    patternHints: [
      "Move shorter line inward",
      "Area = width * min(height[left], height[right])",
    ],
    starterCode: `function solve(nums) {
  let left = 0;
  let right = nums.length - 1;
  let best = 0;
  while (left < right) {
    const h = Math.min(nums[left], nums[right]);
    best = Math.max(best, h * (right - left));
    if (nums[left] < nums[right]) left++;
    else right--;
  }
  return best;
}`,
    sampleInput: JSON.stringify({ nums: [1, 8, 6, 2, 5, 4, 8, 3, 7] }),
  },
  {
    id: "binary-search",
    title: "Binary Search",
    patternSlug: "binary-search",
    patternName: "Binary Search",
    difficulty: "easy",
    statement: "Find target index in sorted nums or return -1.",
    patternHints: [
      "mid = floor((low+high)/2)",
      "Shrink left or right half",
    ],
    starterCode: `function solve(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    sampleInput: JSON.stringify({ nums: [1, 3, 5, 7, 9, 11], target: 7 }),
  },
  {
    id: "tree-inorder",
    title: "Binary Tree Inorder Traversal",
    patternSlug: "tree-dfs",
    patternName: "Tree DFS",
    difficulty: "easy",
    statement:
      "Traverse tree inorder using recursion (left, node, right). Tree passed as nested arrays [val, left, right].",
    patternHints: ["Base: null node", "Recurse left, visit, recurse right"],
    starterCode: `function solve(tree) {
  const out = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    out.push(node.val);
    dfs(node.right);
  }
  dfs(tree);
  return out;
}`,
    sampleInput: JSON.stringify({
      tree: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
    }),
  },
  {
    id: "tree-max-depth",
    title: "Maximum Depth of Binary Tree",
    patternSlug: "tree-dfs",
    patternName: "Tree DFS",
    difficulty: "easy",
    statement: "Return max depth using recursive DFS.",
    patternHints: ["depth = 1 + max(left, right)", "null depth 0"],
    starterCode: `function solve(tree) {
  function depth(node) {
    if (!node) return 0;
    return 1 + Math.max(depth(node.left), depth(node.right));
  }
  return depth(tree);
}`,
    sampleInput: JSON.stringify({
      tree: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
    }),
  },
  {
    id: "bfs-level-order",
    title: "Level Order (BFS sketch)",
    patternSlug: "tree-bfs",
    patternName: "Tree BFS",
    difficulty: "medium",
    statement:
      "Simulate BFS with array queue on adjacency list (graph BFS pattern).",
    patternHints: ["Queue: shift enqueue neighbors", "Track visited"],
    starterCode: `function solve(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const nei of graph[node] || []) {
      if (!visited.has(nei)) {
        visited.add(nei);
        queue.push(nei);
      }
    }
  }
  return order;
}`,
    sampleInput: JSON.stringify({
      graph: { 0: [1, 2], 1: [3], 2: [3], 3: [] },
      start: 0,
    }),
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    patternSlug: "dp-1d",
    patternName: "1D DP",
    difficulty: "easy",
    statement: "Count ways to climb n stairs taking 1 or 2 steps.",
    patternHints: ["dp[i] = dp[i-1] + dp[i-2]", "Fibonacci pattern"],
    starterCode: `function solve(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    sampleInput: JSON.stringify({ n: 5 }),
  },
  {
    id: "coin-change",
    title: "Coin Change (min coins)",
    patternSlug: "dp-1d",
    patternName: "1D DP",
    difficulty: "medium",
    statement:
      "Minimum coins to make amount using unlimited coins of each denomination.",
    patternHints: [
      "dp[amount] = min coins",
      "Try each coin and relax dp",
    ],
    starterCode: `function solve(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    sampleInput: JSON.stringify({ coins: [1, 2, 5], amount: 11 }),
  },
  {
    id: "fibonacci",
    title: "Fibonacci (recursion)",
    patternSlug: "recursion",
    patternName: "Recursion",
    difficulty: "easy",
    statement:
      "Classic recursive fib — use the visualizer to see the recursion tree and stack.",
    patternHints: [
      "Base case n <= 1",
      "Each call spawns two children until base",
    ],
    starterCode: `function solve(n) {
  if (n <= 1) return n;
  return solve(n - 1) + solve(n - 2);
}`,
    sampleInput: JSON.stringify({ n: 4 }),
  },
  {
    id: "factorial",
    title: "Factorial",
    patternSlug: "recursion",
    patternName: "Recursion",
    difficulty: "easy",
    statement: "Recursive factorial with clear base case.",
    patternHints: ["n===0 returns 1", "n * solve(n-1)"],
    starterCode: `function solve(n) {
  if (n <= 1) return 1;
  return n * solve(n - 1);
}`,
    sampleInput: JSON.stringify({ n: 5 }),
  },
  {
    id: "reverse-array",
    title: "Reverse Array In-Place",
    patternSlug: "two-pointers",
    patternName: "Two Pointers",
    difficulty: "easy",
    statement: "Swap elements from both ends moving inward.",
    patternHints: ["left++, right--", "Swap when left < right"],
    starterCode: `function solve(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const t = nums[left];
    nums[left] = nums[right];
    nums[right] = t;
    left++;
    right--;
  }
  return nums;
}`,
    sampleInput: JSON.stringify({ nums: [1, 2, 3, 4, 5] }),
  },
  {
    id: "kadane",
    title: "Maximum Subarray (Kadane)",
    patternSlug: "prefix-sum",
    patternName: "Prefix Sum / Kadane",
    difficulty: "medium",
    statement: "Find contiguous subarray with largest sum.",
    patternHints: [
      "curr = max(nums[i], curr+nums[i])",
      "Track global best",
    ],
    starterCode: `function solve(nums) {
  let curr = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}`,
    sampleInput: JSON.stringify({ nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }),
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    patternSlug: "two-pointers",
    patternName: "Two Pointers",
    difficulty: "easy",
    statement: "Check palindrome ignoring non-alphanumeric (simplified: array of chars).",
    patternHints: ["Skip invalid chars", "Compare s[l] and s[r]"],
    starterCode: `function solve(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    sampleInput: JSON.stringify({ nums: ["r", "a", "c", "e", "c", "a", "r"] }),
  },
] as Omit<Question, "solutionCode" | "humanInput">[]).map(enrich);

const questions: Question[] = [...seedQuestions, ...sheetQuestions];

const patternMeta: Record<string, { name: string; description: string }> = {
  "two-pointers": {
    name: "Two Pointers",
    description: "Converging or fast/slow pointers on sequences.",
  },
  "sliding-window": {
    name: "Sliding Window",
    description: "Contiguous subarray optimization with expand/shrink.",
  },
  "prefix-sum": {
    name: "Prefix Sum",
    description: "Precomputed cumulative sums for range queries.",
  },
  "binary-search": {
    name: "Binary Search",
    description: "Halve search space on sorted or monotonic predicates.",
  },
  "tree-dfs": {
    name: "Tree DFS",
    description: "Depth-first traversal and recursion on trees.",
  },
  "tree-bfs": {
    name: "Tree BFS",
    description: "Level-order and shortest-path layering.",
  },
  "dp-1d": {
    name: "1D DP",
    description: "Optimal substructure with 1D state transitions.",
  },
  recursion: {
    name: "Recursion",
    description: "Self-calls with base cases and stack frames.",
  },
  kadane: {
    name: "Kadane's Algorithm",
    description: "Maximum subarray sum in one linear pass.",
  },
  hashing: {
    name: "Hashing",
    description: "Hash maps and sets for O(1) lookups.",
  },
  greedy: {
    name: "Greedy",
    description: "Locally optimal choices for interval and scheduling problems.",
  },
  math: {
    name: "Math",
    description: "Number theory and combinatorics for DSA.",
  },
  "fast-slow-pointers": {
    name: "Linked Lists",
    description: "Fast and slow pointers on linked structures.",
  },
  "monotonic-stack": {
    name: "Stack & Queue",
    description: "Stacks and queues for parsing and monotonic patterns.",
  },
  "top-k-heap": {
    name: "Heap / Sorting",
    description: "Heaps and sorting for top-K and order statistics.",
  },
  "subsets-backtracking": {
    name: "Backtracking",
    description: "Explore choices with include/exclude and undo.",
  },
  trie: {
    name: "Trees II",
    description: "Trie, union-find, and advanced tree structures.",
  },
  "graph-bfs": {
    name: "Graphs",
    description: "BFS, DFS, shortest paths, and MST on graphs.",
  },
};

export function getAllQuestions(): Question[] {
  return questions;
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getPatternGroups(): PatternGroup[] {
  const bySlug = new Map<string, Question[]>();
  for (const q of questions) {
    const list = bySlug.get(q.patternSlug) ?? [];
    list.push(q);
    bySlug.set(q.patternSlug, list);
  }
  return [...bySlug.entries()].map(([slug, qs]) => ({
    slug,
    name: patternMeta[slug]?.name ?? qs[0].patternName,
    description: patternMeta[slug]?.description ?? "",
    questions: qs,
  }));
}

export function getQuestionsByPatternSlug(slug: string): Question[] {
  return questions
    .filter((q) => q.patternSlug === slug)
    .sort((a, b) => {
      const sa = a.sheetNumber ?? 9999;
      const sb = b.sheetNumber ?? 9999;
      if (sa !== sb) return sa - sb;
      return a.title.localeCompare(b.title);
    });
}

export function getSheetQuestions(): Question[] {
  return sheetQuestions.slice().sort((a, b) => (a.sheetNumber ?? 0) - (b.sheetNumber ?? 0));
}

export function getSheetQuestionById(id: string): Question | undefined {
  return sheetQuestions.find((q) => q.id === id);
}


export function getQuestionPatternMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const q of questions) {
    map[q.id] = q.patternName;
  }
  return map;
}
