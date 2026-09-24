/**
 * Enhance DS + Algorithms notes:
 * - Keep instructor card structure
 * - Add JS TEMPLATE + TOP 5 LEETCODE after each topic's keywords
 *
 * Run: node scripts/enhance-ds-algo-notes.mjs
 */
import fs from "fs";

const DS_EXTRAS = {
  "1. Array": {
    js: `let arr = [1, 2, 3];
arr.push(4);       // O(1)
arr.pop();         // O(1)
arr.unshift(0);    // O(n)
arr.shift();       // O(n)
arr.splice(1, 1);  // O(n)

// in-place filter (read/write)
let w = 0;
for (let r = 0; r < arr.length; r++) {
  if (keep(arr[r])) arr[w++] = arr[r];
}`,
    links: [
      ["Two Sum", "two-sum"],
      ["Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock"],
      ["Product of Array Except Self", "product-of-array-except-self"],
      ["Maximum Subarray", "maximum-subarray"],
      ["Rotate Array", "rotate-array"],
    ],
  },
  "2. Stack": {
    js: `class Stack {
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}`,
    links: [
      ["Valid Parentheses", "valid-parentheses"],
      ["Min Stack", "min-stack"],
      ["Daily Temperatures", "daily-temperatures"],
      ["Decode String", "decode-string"],
      ["Evaluate Reverse Polish Notation", "evaluate-reverse-polish-notation"],
    ],
  },
  "3. Linked List": {
    js: `function reverse(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    links: [
      ["Reverse Linked List", "reverse-linked-list"],
      ["Linked List Cycle", "linked-list-cycle"],
      ["Merge Two Sorted Lists", "merge-two-sorted-lists"],
      ["Middle of the Linked List", "middle-of-the-linked-list"],
      ["Remove Nth Node From End of List", "remove-nth-node-from-end-of-list"],
    ],
  },
  "4. Queue": {
    js: `class Queue {
  constructor() { this.items = []; }
  enqueue(x) { this.items.push(x); }
  dequeue() { return this.items.shift(); } // O(n) on array — demo only
  front() { return this.items[0]; }
}`,
    links: [
      ["Binary Tree Level Order Traversal", "binary-tree-level-order-traversal"],
      ["Number of Islands", "number-of-islands"],
      ["Rotting Oranges", "rotting-oranges"],
      ["Open the Lock", "open-the-lock"],
      ["Sliding Window Maximum", "sliding-window-maximum"],
    ],
  },
  "5. Hash Map": {
    js: `function hasDuplicate(arr) {
  const seen = new Set();
  for (const n of arr) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
    links: [
      ["Two Sum", "two-sum"],
      ["Contains Duplicate", "contains-duplicate"],
      ["Group Anagrams", "group-anagrams"],
      ["Longest Consecutive Sequence", "longest-consecutive-sequence"],
      ["LRU Cache", "lru-cache"],
    ],
  },
  "6. Tree / BST": {
    js: `function search(node, target) {
  if (!node || node.value === target) return node;
  return target < node.value
    ? search(node.left, target)
    : search(node.right, target);
}`,
    links: [
      ["Maximum Depth of Binary Tree", "maximum-depth-of-binary-tree"],
      ["Invert Binary Tree", "invert-binary-tree"],
      ["Validate Binary Search Tree", "validate-binary-search-tree"],
      ["Lowest Common Ancestor of a Binary Tree", "lowest-common-ancestor-of-a-binary-tree"],
      ["Binary Tree Level Order Traversal", "binary-tree-level-order-traversal"],
    ],
  },
  "7. Heap": {
    js: `class MinHeap {
  constructor() { this.data = []; }
  peek() { return this.data[0]; }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
}`,
    links: [
      ["Kth Largest Element in an Array", "kth-largest-element-in-an-array"],
      ["Top K Frequent Elements", "top-k-frequent-elements"],
      ["Find Median from Data Stream", "find-median-from-data-stream"],
      ["Merge k Sorted Lists", "merge-k-sorted-lists"],
      ["Task Scheduler", "task-scheduler"],
    ],
  },
  "8. Graph": {
    js: `function dfs(g, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const n of g[node] || []) dfs(g, n, visited);
}

function bfs(g, start) {
  const visited = new Set([start]);
  const q = [start];
  while (q.length) {
    const node = q.shift();
    for (const n of g[node] || []) {
      if (!visited.has(n)) { visited.add(n); q.push(n); }
    }
  }
}`,
    links: [
      ["Number of Islands", "number-of-islands"],
      ["Clone Graph", "clone-graph"],
      ["Course Schedule", "course-schedule"],
      ["Pacific Atlantic Water Flow", "pacific-atlantic-water-flow"],
      ["Network Delay Time", "network-delay-time"],
    ],
  },
  "9. Trie": {
    js: `class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }
}`,
    links: [
      ["Implement Trie (Prefix Tree)", "implement-trie-prefix-tree"],
      ["Design Add and Search Words Data Structure", "design-add-and-search-words-data-structure"],
      ["Word Search II", "word-search-ii"],
      ["Replace Words", "replace-words"],
      ["Maximum XOR of Two Numbers in an Array", "maximum-xor-of-two-numbers-in-an-array"],
    ],
  },
};

const ALGO_EXTRAS = {
  "1. Binary Search": {
    js: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (l = mid + 1) : (r = mid - 1);
  }
  return -1;
}`,
    links: [
      ["Binary Search", "binary-search"],
      ["Search in Rotated Sorted Array", "search-in-rotated-sorted-array"],
      ["Find First and Last Position", "find-first-and-last-position-of-element-in-sorted-array"],
      ["Koko Eating Bananas", "koko-eating-bananas"],
      ["Median of Two Sorted Arrays", "median-of-two-sorted-arrays"],
    ],
  },
  "2. Two Pointers": {
    js: `function twoSumSorted(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (sum === target) return [l, r];
    sum < target ? l++ : r--;
  }
  return [-1, -1];
}`,
    links: [
      ["Two Sum II", "two-sum-ii-input-array-is-sorted"],
      ["3Sum", "3sum"],
      ["Container With Most Water", "container-with-most-water"],
      ["Valid Palindrome", "valid-palindrome"],
      ["Trapping Rain Water", "trapping-rain-water"],
    ],
  },
  "3. Sliding Window": {
    js: `function maxSumK(arr, k) {
  let sum = 0, max = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k - 1) {
      max = Math.max(max, sum);
      sum -= arr[i - k + 1];
    }
  }
  return max;
}`,
    links: [
      ["Longest Substring Without Repeating Characters", "longest-substring-without-repeating-characters"],
      ["Minimum Window Substring", "minimum-window-substring"],
      ["Longest Repeating Character Replacement", "longest-repeating-character-replacement"],
      ["Permutation in String", "permutation-in-string"],
      ["Max Consecutive Ones III", "max-consecutive-ones-iii"],
    ],
  },
  "4. Sorting": {
    js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
function merge(L, R) {
  const out = [];
  let i = 0, j = 0;
  while (i < L.length && j < R.length) {
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  }
  return [...out, ...L.slice(i), ...R.slice(j)];
}`,
    links: [
      ["Sort Colors", "sort-colors"],
      ["Merge Intervals", "merge-intervals"],
      ["Kth Largest Element in an Array", "kth-largest-element-in-an-array"],
      ["Sort List", "sort-list"],
      ["Largest Number", "largest-number"],
    ],
  },
  "5. Recursion & Backtracking": {
    js: `function subsets(nums) {
  const result = [];
  function bt(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);   // choose
      bt(i + 1, path);      // recurse
      path.pop();           // un-choose
    }
  }
  bt(0, []);
  return result;
}`,
    links: [
      ["Subsets", "subsets"],
      ["Permutations", "permutations"],
      ["Combination Sum", "combination-sum"],
      ["Generate Parentheses", "generate-parentheses"],
      ["N-Queens", "n-queens"],
    ],
  },
  "6. BFS / DFS": {
    js: `function bfs(g, start) {
  const visited = new Set([start]);
  const q = [start], order = [];
  while (q.length) {
    const node = q.shift();
    order.push(node);
    for (const n of g[node] || []) {
      if (!visited.has(n)) { visited.add(n); q.push(n); }
    }
  }
  return order;
}

function dfs(g, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  for (const n of g[start] || []) {
    if (!visited.has(n)) dfs(g, n, visited, order);
  }
  return order;
}`,
    links: [
      ["Number of Islands", "number-of-islands"],
      ["Clone Graph", "clone-graph"],
      ["Course Schedule", "course-schedule"],
      ["Rotting Oranges", "rotting-oranges"],
      ["Word Ladder", "word-ladder"],
    ],
  },
  "7. Dynamic Programming": {
    js: `function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
    links: [
      ["Climbing Stairs", "climbing-stairs"],
      ["House Robber", "house-robber"],
      ["Coin Change", "coin-change"],
      ["Longest Increasing Subsequence", "longest-increasing-subsequence"],
      ["Word Break", "word-break"],
    ],
  },
  "8. Tree Traversals": {
    js: `function inorder(node, res = []) {
  if (!node) return res;
  inorder(node.left, res);
  res.push(node.value);
  inorder(node.right, res);
  return res;
}
// pre: visit, left, right | post: left, right, visit`,
    links: [
      ["Binary Tree Inorder Traversal", "binary-tree-inorder-traversal"],
      ["Binary Tree Level Order Traversal", "binary-tree-level-order-traversal"],
      ["Binary Tree Zigzag Level Order Traversal", "binary-tree-zigzag-level-order-traversal"],
      ["Construct Binary Tree from Preorder and Inorder", "construct-binary-tree-from-preorder-and-inorder-traversal"],
      ["Serialize and Deserialize Binary Tree", "serialize-and-deserialize-binary-tree"],
    ],
  },
  "9. Lowest Common Ancestor": {
    js: `function lowestCommonAncestor(root, p, q) {
  if (!root || root.value === p || root.value === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
    links: [
      ["LCA of a Binary Tree", "lowest-common-ancestor-of-a-binary-tree"],
      ["LCA of a BST", "lowest-common-ancestor-of-a-binary-search-tree"],
      ["LCA of Deepest Leaves", "lowest-common-ancestor-of-deepest-leaves"],
      ["Diameter of Binary Tree", "diameter-of-binary-tree"],
      ["Path Sum III", "path-sum-iii"],
    ],
  },
  "10. Dijkstra": {
    js: `function dijkstra(graph, start) {
  // graph: { A: [[B, 2], [C, 5]], ... }
  const dist = {};
  for (const n in graph) dist[n] = Infinity;
  dist[start] = 0;
  const visited = new Set();
  const pq = [[0, start]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    for (const [nei, w] of graph[node] || []) {
      if (d + w < dist[nei]) {
        dist[nei] = d + w;
        pq.push([dist[nei], nei]);
      }
    }
  }
  return dist;
}`,
    links: [
      ["Network Delay Time", "network-delay-time"],
      ["Cheapest Flights Within K Stops", "cheapest-flights-within-k-stops"],
      ["Path With Minimum Effort", "path-with-minimum-effort"],
      ["Swim in Rising Water", "swim-in-rising-water"],
      ["Shortest Path in Binary Matrix", "shortest-path-in-binary-matrix"],
    ],
  },
  "11. Minimum Spanning Tree": {
    js: `function find(parent, i) {
  if (parent[i] !== i) parent[i] = find(parent, parent[i]);
  return parent[i];
}
function kruskalMST(n, edges) {
  edges.sort((a, b) => a[0] - b[0]);
  const parent = Array.from({ length: n }, (_, i) => i);
  let total = 0, count = 0;
  for (const [w, u, v] of edges) {
    const pu = find(parent, u), pv = find(parent, v);
    if (pu !== pv) {
      parent[pu] = pv;
      total += w;
      if (++count === n - 1) break;
    }
  }
  return total;
}`,
    links: [
      ["Min Cost to Connect All Points", "min-cost-to-connect-all-points"],
      ["Redundant Connection", "redundant-connection"],
      ["Accounts Merge", "accounts-merge"],
      ["Number of Provinces", "number-of-provinces"],
      ["Graph Valid Tree", "graph-valid-tree"],
    ],
  },
  "12. 1-D Dynamic Programming": {
    js: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
    links: [
      ["Climbing Stairs", "climbing-stairs"],
      ["House Robber", "house-robber"],
      ["House Robber II", "house-robber-ii"],
      ["Decode Ways", "decode-ways"],
      ["Min Cost Climbing Stairs", "min-cost-climbing-stairs"],
    ],
  },
  "13. 2-D / Grid DP": {
    js: `function uniquePaths(rows, cols) {
  const dp = Array.from({ length: rows }, () => Array(cols).fill(1));
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[rows - 1][cols - 1];
}`,
    links: [
      ["Unique Paths", "unique-paths"],
      ["Unique Paths II", "unique-paths-ii"],
      ["Minimum Path Sum", "minimum-path-sum"],
      ["Maximal Square", "maximal-square"],
      ["Dungeon Game", "dungeon-game"],
    ],
  },
  "14. Knapsack DP": {
    js: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w];
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      }
    }
  }
  return dp[n][capacity];
}`,
    links: [
      ["Partition Equal Subset Sum", "partition-equal-subset-sum"],
      ["Coin Change", "coin-change"],
      ["Coin Change II", "coin-change-ii"],
      ["Target Sum", "target-sum"],
      ["Ones and Zeroes", "ones-and-zeroes"],
    ],
  },
  "15. Prefix Sum & Difference": {
    js: `function buildPrefix(arr) {
  const p = [arr[0]];
  for (let i = 1; i < arr.length; i++) p.push(p[i - 1] + arr[i]);
  return p;
}
function rangeSum(p, l, r) {
  return l === 0 ? p[r] : p[r] - p[l - 1];
}`,
    links: [
      ["Subarray Sum Equals K", "subarray-sum-equals-k"],
      ["Range Sum Query - Immutable", "range-sum-query-immutable"],
      ["Find Pivot Index", "find-pivot-index"],
      ["Product of Array Except Self", "product-of-array-except-self"],
      ["Contiguous Array", "contiguous-array"],
    ],
  },
  "16. Monotonic Stack / Queue": {
    js: `function nextGreater(arr) {
  const res = Array(arr.length).fill(-1);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[stack.at(-1)] < arr[i]) {
      res[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return res;
}`,
    links: [
      ["Next Greater Element I", "next-greater-element-i"],
      ["Daily Temperatures", "daily-temperatures"],
      ["Largest Rectangle in Histogram", "largest-rectangle-in-histogram"],
      ["Online Stock Span", "online-stock-span"],
      ["Asteroid Collision", "asteroid-collision"],
    ],
  },
  "17. KMP Pattern Matching": {
    js: `function buildLPS(pat) {
  const lps = Array(pat.length).fill(0);
  let len = 0, i = 1;
  while (i < pat.length) {
    if (pat[i] === pat[len]) lps[i++] = ++len;
    else if (len > 0) len = lps[len - 1];
    else lps[i++] = 0;
  }
  return lps;
}`,
    links: [
      ["Find the Index of the First Occurrence", "find-the-index-of-the-first-occurrence-in-a-string"],
      ["Repeated Substring Pattern", "repeated-substring-pattern"],
      ["Shortest Palindrome", "shortest-palindrome"],
      ["Longest Happy Prefix", "longest-happy-prefix"],
      ["Repeated String Match", "repeated-string-match"],
    ],
  },
  "18. Rabin-Karp": {
    js: `function rabinKarp(text, pattern) {
  const n = text.length, m = pattern.length;
  const base = 256, mod = 101;
  let pHash = 0, wHash = 0, h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * base) % mod;
  for (let i = 0; i < m; i++) {
    pHash = (base * pHash + pattern.charCodeAt(i)) % mod;
    wHash = (base * wHash + text.charCodeAt(i)) % mod;
  }
  for (let i = 0; i <= n - m; i++) {
    if (pHash === wHash && text.slice(i, i + m) === pattern) return i;
    if (i < n - m) {
      wHash = (base * (wHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % mod;
      if (wHash < 0) wHash += mod;
    }
  }
  return -1;
}`,
    links: [
      ["Find the Index of the First Occurrence", "find-the-index-of-the-first-occurrence-in-a-string"],
      ["Repeated DNA Sequences", "repeated-dna-sequences"],
      ["Longest Duplicate Substring", "longest-duplicate-substring"],
      ["Distinct Echo Substrings", "distinct-echo-substrings"],
      ["Shortest Palindrome", "shortest-palindrome"],
    ],
  },
  "19. Bit Manipulation": {
    js: `function singleNumber(nums) {
  let x = 0;
  for (const n of nums) x ^= n;
  return x;
}
const isOdd = (n) => (n & 1) === 1;
const dropLowest = (n) => n & (n - 1);`,
    links: [
      ["Single Number", "single-number"],
      ["Number of 1 Bits", "number-of-1-bits"],
      ["Counting Bits", "counting-bits"],
      ["Missing Number", "missing-number"],
      ["Power of Two", "power-of-two"],
    ],
  },
  "20. Number Theory": {
    js: `function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
function sieve(n) {
  const ok = Array(n + 1).fill(true);
  ok[0] = ok[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (ok[i]) for (let j = i * i; j <= n; j += i) ok[j] = false;
  }
  return ok.map((v, i) => (v ? i : -1)).filter((x) => x > 0);
}`,
    links: [
      ["Count Primes", "count-primes"],
      ["Pow(x, n)", "powx-n"],
      ["Ugly Number", "ugly-number"],
      ["Super Ugly Number", "super-ugly-number"],
      ["Perfect Squares", "perfect-squares"],
    ],
  },
  "21. Segment Tree": {
    js: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = Array(2 * this.n).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
    }
  }
  update(i, val) {
    i += this.n;
    this.tree[i] = val;
    while (i > 1) {
      i = Math.floor(i / 2);
      this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
    }
  }
  query(l, r) {
    let res = 0;
    for (l += this.n, r += this.n; l < r; l >>= 1, r >>= 1) {
      if (l & 1) res += this.tree[l++];
      if (r & 1) res += this.tree[--r];
    }
    return res;
  }
}`,
    links: [
      ["Range Sum Query - Mutable", "range-sum-query-mutable"],
      ["Count of Smaller Numbers After Self", "count-of-smaller-numbers-after-self"],
      ["The Skyline Problem", "the-skyline-problem"],
      ["Reverse Pairs", "reverse-pairs"],
      ["Count of Range Sum", "count-of-range-sum"],
    ],
  },
  "22. Matrix & Simulation": {
    js: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
}`,
    links: [
      ["Rotate Image", "rotate-image"],
      ["Spiral Matrix", "spiral-matrix"],
      ["Set Matrix Zeroes", "set-matrix-zeroes"],
      ["Game of Life", "game-of-life"],
      ["Search a 2D Matrix", "search-a-2d-matrix"],
    ],
  },
};

function formatExtras(extra) {
  const links = extra.links
    .map(
      ([title, slug], i) =>
        `${i + 1}. [${title}](https://leetcode.com/problems/${slug}/)`,
    )
    .join("\n");
  return `
**JS TEMPLATE:**

\`\`\`js
${extra.js}
\`\`\`

**TOP 5 LEETCODE:**

${links}
`;
}

function enhance(path, extras, intro, bigOLabel) {
  let md = fs.readFileSync(path, "utf8");
  md = md
    .replace(/\*\*What it is:\*\*/g, "**WHAT IT IS:**")
    .replace(/\*\*How it works:\*\*/g, "**HOW IT WORKS:**")
    .replace(/\*\*Structure:\*\*/g, "**STRUCTURE:**")
    .replace(/\*\*Big-O:\*\*/g, `**${bigOLabel}:**`)
    .replace(/\*\*Catch:\*\*/g, "**THE CATCH:**")
    .replace(/\*\*Interview keywords:\*\*/g, "**INTERVIEW KEYWORDS:**");

  const firstH2 = md.indexOf("\n## ");
  if (firstH2 > 0) {
    const titleLine = md.slice(0, md.indexOf("\n"));
    md = titleLine + "\n\n" + intro + md.slice(firstH2);
  }

  for (const [heading, extra] of Object.entries(extras)) {
    const re = new RegExp(
      `(## ${heading.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}[\\s\\S]*?\\*\\*INTERVIEW KEYWORDS:\\*\\*[^\\n]*\\n)`,
    );
    if (!re.test(md)) {
      console.warn("missing section:", heading);
      continue;
    }
    md = md.replace(re, `$1${formatExtras(extra)}\n`);
  }

  fs.writeFileSync(path, md);
  console.log("enhanced", path);
}

enhance(
  "content/dsa/data-structures.md",
  DS_EXTRAS,
  `**DATA STRUCTURES CHEATSHEET** — 9 structures. Same card layout as the video notes: **WHAT IT IS → STRUCTURE → BIG-O → THE CATCH → KEYWORDS**, plus **JS TEMPLATE** and **TOP 5 LEETCODE** for revision.

**How to use:** Memorize the catch + keywords. Re-type the JS skeleton cold. Drill one top-5 problem.
`,
  "WHAT IT DOES — BIG-O",
);

enhance(
  "content/dsa/algorithms.md",
  ALGO_EXTRAS,
  `**ALGORITHMS CHEATSHEET** — 22 patterns. Same card layout as the video notes: **WHAT IT IS → HOW IT WORKS → BIG-O → THE CATCH → KEYWORDS**, plus **JS TEMPLATE** and **TOP 5 LEETCODE** for revision.

**How to use:** Cover the catch, rebuild the template from memory, then open a top-5 link.
`,
  "WHAT IT COSTS — BIG-O",
);
