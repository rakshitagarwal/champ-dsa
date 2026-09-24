# Algorithms Cheatsheet

**ALGORITHMS CHEATSHEET** — 22 patterns. Same card layout as the video notes: **WHAT IT IS → HOW IT WORKS → BIG-O → THE CATCH → KEYWORDS**, plus **JS TEMPLATE** and **TOP 5 LEETCODE** for revision.

**How to use:** Cover the catch, rebuild the template from memory, then open a top-5 link.

## 1. Binary Search

*Halve the search space — the cheapest win in interviews.* — [Binary Search detail page](/patterns/binary-search)

**WHAT IT IS:** Repeatedly cut a SORTED range in half. Compare the middle to your target, then throw away the half that cannot contain it. Also works on any monotonic answer space, not just arrays.

**HOW IT WORKS:** Sorted input required. Check the `mid` element: `target < mid` discards the entire right half. Each step halves `n`, so the search finishes in `log2(n)` steps.

```
sorted: | 1 | 3 | 5 |[7]| 9 | 11 | 13 |
                       mid
target < mid -> discard the entire right half
each step halves n -> log2(n) steps
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search | `O(log n)` | Halves the range each step |
| Space | `O(1)` | Just two index variables |
| If unsorted first | `O(n log n)` | Sorting dominates the cost |

**THE CATCH:** Only works on SORTED data. If the array isn't sorted, sorting first costs `O(n log n)` — which can cost more than a plain linear scan for a single lookup. Classic bug: the mid calculation causing an infinite loop.

**INTERVIEW KEYWORDS:** sorted array, log n time, find target, rotated array, find peak, first/last position.

**JS TEMPLATE:**

```js
function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (l = mid + 1) : (r = mid - 1);
  }
  return -1;
}
```

**TOP 5 LEETCODE:**

1. [Binary Search](https://leetcode.com/problems/binary-search/)
2. [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
3. [Find First and Last Position](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
4. [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
5. [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)


## 2. Two Pointers

*Two indices, one pass — collapse the nested loop.* — [Two Pointers detail page](/patterns/two-pointers)

**WHAT IT IS:** Walk two indices through the data instead of nesting two loops. They can start at both ends and close inward, or both start left and move at different speeds (fast / slow).

**HOW IT WORKS:** On sorted input, compare against the target: sum too big moves `R` left, sum too small moves `L` right. Each pointer crosses once — one pass, no extra space.

```
L →                         ← R
| 2 |  4 |  6 |  9 | 12 | 15 |
sum too big -> move R left
sum too small -> move L right
one pass, no extra space -> O(n)
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Scan | `O(n)` | Each pointer crosses once |
| Space | `O(1)` | No extra data structure |

**THE CATCH:** The two-ends version needs SORTED input — on unsorted data, use a hash map instead. Know both flavors: two ends closing in (for pair sums) vs fast/slow (for cycles).

**INTERVIEW KEYWORDS:** pair sum, palindrome, container water, 3sum, remove duplicates, merge sorted.

**JS TEMPLATE:**

```js
function twoSumSorted(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (sum === target) return [l, r];
    sum < target ? l++ : r--;
  }
  return [-1, -1];
}
```

**TOP 5 LEETCODE:**

1. [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
2. [3Sum](https://leetcode.com/problems/3sum/)
3. [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
4. [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
5. [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)


## 3. Sliding Window

*Contiguous subarrays without recomputing from scratch.* — [Sliding Window detail page](/patterns/sliding-window)

**WHAT IT IS:** Keep a moving range over the data. Expand the right edge to include more, shrink the left edge when the window breaks a constraint. Reuse the previous window's work instead of rebuilding it.

**HOW IT WORKS:** The window is the current candidate. Expand right until invalid, then shrink from the left. Each index enters and leaves once.

```
array:  | a |[b | c | b]| d | a |
             window = current candidate
expand right until invalid -> shrink from left
each index enters and leaves once -> O(n)
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(n)` | Each index enters/leaves once |
| Space | `O(k)` | Only the window is stored |

**THE CATCH:** Only works when the subarray must be CONTIGUOUS. The trick is to reuse the last window's work instead of recomputing — that's what turns an `O(n^2)` brute force into `O(n)`.

**INTERVIEW KEYWORDS:** longest substring, contiguous subarray, at most k distinct, fixed window, min/max window.

**JS TEMPLATE:**

```js
function maxSumK(arr, k) {
  let sum = 0, max = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k - 1) {
      max = Math.max(max, sum);
      sum -= arr[i - k + 1];
    }
  }
  return max;
}
```

**TOP 5 LEETCODE:**

1. [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
2. [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
3. [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
4. [Permutation in String](https://leetcode.com/problems/permutation-in-string/)
5. [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)


## 4. Sorting

*The O(n log n) floor that unlocks everything else.* — [Sorting detail page](/patterns/sorting-techniques)

**WHAT IT IS:** Reorder elements so comparisons become meaningful. Merge sort divides then combines; quicksort partitions around a pivot. Any comparison-based sort has a hard `O(n log n)` lower bound.

**HOW IT WORKS:** Merge sort splits in half (`log n` levels) and merges each level in `O(n)` — `log n` levels × `O(n)` merge gives `O(n log n)`.

```
merge sort - divide then combine
| 8 | 3 | 5 | 1 |  →  | 8 | 3 |  | 5 | 1 |  →  | 1 | 3 | 5 | 8 | (merged)
log n levels x O(n) merge -> O(n log n)
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Merge sort | `O(n log n)` | Splits in half: log n levels |
| Quicksort avg | `O(n log n)` | Balanced partitions |
| Quicksort worst | `O(n^2)` | Bad pivot on sorted input |
| Space | `O(n)` / `O(1)` | Merge copies; quick in-place |

**THE CATCH:** Quicksort degrades to `O(n^2)` on already-sorted input with a naive pivot — randomize the pivot to avoid it. Merge sort is stable but needs `O(n)` extra space; quicksort is in-place but NOT stable. Interviewers probe exactly this trade-off.

**INTERVIEW KEYWORDS:** sort first, sort by key, kth largest, merge sorted, quickselect pivot, stable sort.

**JS TEMPLATE:**

```js
function mergeSort(arr) {
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
}
```

**TOP 5 LEETCODE:**

1. [Sort Colors](https://leetcode.com/problems/sort-colors/)
2. [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
3. [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
4. [Sort List](https://leetcode.com/problems/sort-list/)
5. [Largest Number](https://leetcode.com/problems/largest-number/)


## 5. Recursion & Backtracking

*Explore every branch — then undo and try the next.* — [Recursion](/patterns/recursion) + [Backtracking](/patterns/backtracking)

**WHAT IT IS:** Build a candidate one choice at a time. When a choice leads nowhere, undo it and try the next option. The call stack tracks where you are; the undo step is what makes it backtracking rather than plain recursion.

**HOW IT WORKS:** At every node: choose → explore → un-choose. All subsets of `{a, b, c}` branch from `[]` to `[a]`, `[b]`, `[c]`, then `[a,b]`, `[a,c]`… — 8 results total.

```
all subsets of {a, b, c}:  [] → [a] [b] [c] → [a,b] [a,c] ...
choose -> explore -> un-choose, at every node
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Subsets | `O(2^n)` | Include/exclude each element |
| Permutations | `O(n!)` | n choices, then n-1, then n-2… |
| Space | `O(n)` | Recursion goes n levels deep |

**THE CATCH:** Forgetting to UNDO your choice after recursing is the #1 bug — it corrupts every later branch. The pattern is always: choose, recurse, un-choose. Exponential by nature, so expect it only on small input sizes.

**INTERVIEW KEYWORDS:** all combinations, all permutations, all subsets, generate all, N-Queens, sudoku solver.

**JS TEMPLATE:**

```js
function subsets(nums) {
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
}
```

**TOP 5 LEETCODE:**

1. [Subsets](https://leetcode.com/problems/subsets/)
2. [Permutations](https://leetcode.com/problems/permutations/)
3. [Combination Sum](https://leetcode.com/problems/combination-sum/)
4. [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
5. [N-Queens](https://leetcode.com/problems/n-queens/)


## 6. BFS / DFS

*Traverse any graph — the only question is queue or stack.* — [Graphs detail page](/patterns/graphs)

**WHAT IT IS:** BFS uses a QUEUE and expands level by level, so it finds the fewest-edges path first. DFS uses a STACK (or recursion) and dives deep before backing up. Both need a visited set to survive cycles.

**HOW IT WORKS:** Start at A, visit every node once. Same graph, two orders: BFS (queue) visits `A B C D E`; DFS (stack) visits `A B D E C`.

```
      A
    /   \
   B     C
  / \
 D   E
BFS (queue): A B C D E     DFS (stack): A B D E C
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(V+E)` | Visit every node and edge once |
| Space | `O(V)` | Holds up to V nodes |

**THE CATCH:** Forgetting the visited set means infinite looping on a cycle. Remember: BFS finds the shortest path in an UNWEIGHTED graph (fewest edges); DFS does not — it just explores.

**INTERVIEW KEYWORDS:** traverse grid, islands, shortest steps, connected components, clone graph, flood fill.

**JS TEMPLATE:**

```js
function bfs(g, start) {
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
}
```

**TOP 5 LEETCODE:**

1. [Number of Islands](https://leetcode.com/problems/number-of-islands/)
2. [Clone Graph](https://leetcode.com/problems/clone-graph/)
3. [Course Schedule](https://leetcode.com/problems/course-schedule/)
4. [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
5. [Word Ladder](https://leetcode.com/problems/word-ladder/)


## 7. Dynamic Programming

*Solve each subproblem once — and know when greedy is enough.* — [DP hub](/patterns/dp)

**WHAT IT IS:** When subproblems repeat, solve each once and store the result (memoization). Build up from smaller answers to bigger ones. GREEDY is the cousin: take the locally best choice and never look back. Faster, but only correct when local best = global best.

**HOW IT WORKS:** `fib(5)` repeats `f(3)` twice in a naive tree. Memoize: solve each once, reuse the answer — cost drops from `O(2^n)` to `O(n)`, and `fib(5) = 5`.

```
f(5) → f(4), f(3); f(4) → f(3), f(2)   (f(3) done twice)
memoize: solve each once, reuse the answer
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| With memo | `O(states)` | Each subproblem solved once |
| Without memo | `O(2^n)` | Same subproblems recomputed |
| Greedy | `O(n log n)` | Usually a sort, then one pass |

**THE CATCH:** The STATE is the set of variables that define one subproblem (e.g. 'index i with budget w left'). Get it wrong and the whole solution breaks. For greedy: it fails SILENTLY on problems where local best isn't global best — always sanity-check with a small counterexample.

**INTERVIEW KEYWORDS:** max/min value, count ways, optimal choice, memoize, subsequence, knapsack, edit distance.

**JS TEMPLATE:**

```js
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

**TOP 5 LEETCODE:**

1. [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
2. [House Robber](https://leetcode.com/problems/house-robber/)
3. [Coin Change](https://leetcode.com/problems/coin-change/)
4. [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
5. [Word Break](https://leetcode.com/problems/word-break/)


## 8. Tree Traversals

*Four orders, one recursion — know which one the problem wants.* — [Trees detail page](/patterns/trees)

**WHAT IT IS:** Visit every node in a defined order. Pre-order roots first, in-order gives a BST in sorted order, post-order handles children before parents. Level-order uses a queue instead of recursion.

**HOW IT WORKS:** On tree `1 → (2 → (4, 5), 3)`: pre = `1 2 4 5 3`, in = `4 2 5 1 3`, post = `4 5 2 3 1`, level = `1 2 3 4 5`.

```
        1
      /   \
     2     3
    / \
   4   5
pre: 1 2 4 5 3    in: 4 2 5 1 3
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Any traversal | `O(n)` | Visit every node once |
| Space | `O(h)` | Recursion depth = tree height |

**THE CATCH:** Recursion depth is the tree's HEIGHT, not the node count — a skewed tree (basically a linked list) can hit `O(n)` depth and overflow the stack. Remember: in-order on a BST gives sorted output.

**INTERVIEW KEYWORDS:** inorder, preorder, postorder, level order, validate BST, serialize tree, tree depth.

**JS TEMPLATE:**

```js
function inorder(node, res = []) {
  if (!node) return res;
  inorder(node.left, res);
  res.push(node.value);
  inorder(node.right, res);
  return res;
}
// pre: visit, left, right | post: left, right, visit
```

**TOP 5 LEETCODE:**

1. [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
2. [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
3. [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
4. [Construct Binary Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
5. [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)


## 9. Lowest Common Ancestor

*The deepest node that is an ancestor of both targets.* — [Trees detail page](/patterns/trees)

**WHAT IT IS:** Find the deepest node that has both targets in its subtree. On a BST you can walk down by value comparison. On a general tree, recurse and return the node where the left and right searches both succeed.

**HOW IT WORKS:** Trace paths from D and E up to the root — they meet at B, so `LCA(D, E) = B`.

```
        A
      /   \
     B     C
    / \
   D   E
meet at B -> LCA(D, E) = B
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| General tree | `O(n)` | May scan all nodes to find both |
| BST | `O(h)` | Compare values, one path down |
| Space | `O(h)` | Recursion depth = tree height |

**THE CATCH:** On a BST you can walk down fast using value comparisons (go left/right until the targets split). On a plain binary tree there's no ordering, so you must recurse through nodes. Edge case: one target is the ancestor of the other.

**INTERVIEW KEYWORDS:** lowest common ancestor, BST ancestor, path to node, distance between nodes, kth ancestor.

**JS TEMPLATE:**

```js
function lowestCommonAncestor(root, p, q) {
  if (!root || root.value === p || root.value === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}
```

**TOP 5 LEETCODE:**

1. [LCA of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
2. [LCA of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
3. [LCA of Deepest Leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/)
4. [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
5. [Path Sum III](https://leetcode.com/problems/path-sum-iii/)


## 10. Dijkstra

*Shortest path when edges have weights — greedy plus a heap.* — [Shortest Path detail page](/patterns/shortest-path)

**WHAT IT IS:** Find the shortest distance from a start node to all others, when edges have costs. Keep a best-known distance to every node. Repeatedly pick the nearest unfinalized node, lock in its distance, and update its neighbors if going through it is cheaper. A min-heap gives you the nearest node fast.

**HOW IT WORKS:** Shortest distance from A to every node. `A->C` direct is 5, but `A->B->C` is `2+1 = 3` — so the shorter path wins. Finalized nodes are locked: always take nearest next.

```
A --2--> B --4--> D
|         |       ^
5      dist=2     |2
|         v       |
+-------> C -----+
        dist=3 → D dist=5
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| With min-heap | `O((V+E) log V)` | Nearest node in log V each step |
| Space | `O(V)` | One distance per node |

**THE CATCH:** Breaks on NEGATIVE edge weights. Dijkstra locks in a node's distance the moment it's picked — but a later negative edge could have made it shorter. It won't error, just return a wrong answer.

**INTERVIEW KEYWORDS:** shortest path, weighted edges, min cost path, cheapest route, network delay, priority queue.

**JS TEMPLATE:**

```js
function dijkstra(graph, start) {
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
}
```

**TOP 5 LEETCODE:**

1. [Network Delay Time](https://leetcode.com/problems/network-delay-time/)
2. [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)
3. [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)
4. [Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/)
5. [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)


## 11. Minimum Spanning Tree

*Connect every node at the lowest total edge weight.* — [MST detail page](/patterns/mst)

**WHAT IT IS:** Choose a subset of edges connecting all nodes with minimum total weight and no cycles. Kruskal sorts edges and adds any that do not close a cycle (using DSU). Prim grows one tree outward with a heap.

**HOW IT WORKS:** Keep the cheapest edges, skip any that form a cycle (the 6-edge is skipped). Total = `1 + 2 + 3 + 1 = 7`.

```
A --2--> B        A-B(2), A-C(1), C-D(3), D-E(1) kept
|         | 6     B-D(6) skipped (cycle)
C --3--> D --1--> E
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Kruskal | `O(E log E)` | Sort edges, then add cheapest |
| Prim | `O(E log V)` | Grow the tree with a min-heap |
| Space | `O(V+E)` | Edges + bookkeeping |

**THE CATCH:** An MST minimizes TOTAL weight — it does NOT give the shortest path between two nodes (that's Dijkstra). This is the most common mix-up. An MST always has exactly V-1 edges.

**INTERVIEW KEYWORDS:** connect all, min cost, Kruskal, Prim, network wiring, V-1 edges.

**JS TEMPLATE:**

```js
function find(parent, i) {
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
}
```

**TOP 5 LEETCODE:**

1. [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)
2. [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
3. [Accounts Merge](https://leetcode.com/problems/accounts-merge/)
4. [Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
5. [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)


## 12. 1-D Dynamic Programming

*One array, one pass — the DP you will meet first.* — [1D DP detail page](/patterns/dp-linear)

**WHAT IT IS:** State depends only on a fixed number of previous positions. Build `dp[0..n]` left to right, each entry from a small window behind it. Often collapses to two variables once you see the dependency is bounded.

**HOW IT WORKS:** Climbing stairs: `dp[i] = dp[i-1] + dp[i-2]` → `1, 1, 2, 3, 5, 8`. Each state depends on a fixed window behind it — keep 2 vars instead of the array for `O(1)` space.

```
dp: | 1 | 1 | 2 | 3 |[5]|[8]|
idx:  [0] [1] [2] [3] [4] [5]
each state depends on a fixed window behind it
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Fill table | `O(n)` | One pass, each state is O(1) |
| Space | `O(n)` / `O(1)` | Often need last 1-2 values |

**THE CATCH:** Getting the BASE CASE wrong poisons the whole table. Many 1-D problems (like Fibonacci) only need the last one or two values, so you can drop from an `O(n)` array to `O(1)` variables.

**INTERVIEW KEYWORDS:** climbing stairs, house robber, coin change, decode ways, fibonacci, jump game.

**JS TEMPLATE:**

```js
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

**TOP 5 LEETCODE:**

1. [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
2. [House Robber](https://leetcode.com/problems/house-robber/)
3. [House Robber II](https://leetcode.com/problems/house-robber-ii/)
4. [Decode Ways](https://leetcode.com/problems/decode-ways/)
5. [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)


## 13. 2-D / Grid DP

*Two indices, a table — grids and string pairs.* — [2D DP detail page](/patterns/dp-2d)

**WHAT IT IS:** State is `dp[i][j]`: a position in a grid, or a pair of prefixes from two strings. Fill row by row so every dependency is already computed. The answer usually sits in the bottom-right cell.

**HOW IT WORKS:** Unique paths: `dp[i][j] = up + left`. Fill row by row; the answer sits in the last cell (10 for the 3×4 example).

```
| 1 | 1 | 1 | 1 |
| 1 | 2 | 3 | 4 |
| 1 | 3 | 6 | 10|  ← answer
fill row by row; answer sits in the last cell
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Fill table | `O(n*m)` | Every cell computed once |
| Space | `O(n*m)` | The full grid of subproblems |

**THE CATCH:** Off-by-one errors on the first row/column cause most bugs — decide up front whether your table is 0- or 1-indexed. The answer usually ends up in the bottom-right cell.

**INTERVIEW KEYWORDS:** grid paths, unique paths, edit distance, longest common subseq, two strings, min path sum.

**JS TEMPLATE:**

```js
function uniquePaths(rows, cols) {
  const dp = Array.from({ length: rows }, () => Array(cols).fill(1));
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[rows - 1][cols - 1];
}
```

**TOP 5 LEETCODE:**

1. [Unique Paths](https://leetcode.com/problems/unique-paths/)
2. [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)
3. [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)
4. [Maximal Square](https://leetcode.com/problems/maximal-square/)
5. [Dungeon Game](https://leetcode.com/problems/dungeon-game/)


## 14. Knapsack DP

*Fill a limited bag with the most valuable items.* — [Knapsack DP detail page](/patterns/dp-knapsack)

**WHAT IT IS:** You have a bag with a weight limit and a set of items, each with a weight and a value. Pick items to maximize total value without going over the limit. For each item you face one choice: take it (and use up its weight) or skip it. Try both, keep the better result.

**HOW IT WORKS:** Bag holds weight 5 — take this item or not? TAKE it: value 4 + best of remaining weight 2. SKIP it: best value using full weight 5. Keep whichever gives more value. Answer each (item, weight) pair once, store it.

```
item: weight 3, value 4  (bag capacity 5)
TAKE it: value 4 + best of remaining weight 2
SKIP it: best value using full weight 5
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| 0/1 knapsack | `O(n*W)` | n items × W capacity states |
| Space | `O(W)` | Can reduce the 2-D table to 1-D |

**THE CATCH:** The key question for every item is simply: is it worth more to take it or skip it? Compare both and keep the larger. Know the two types: 0/1 means each item can be used once; unbounded means you can reuse items.

**INTERVIEW KEYWORDS:** 0/1 knapsack, subset sum, partition equal, coin change, target sum.

**JS TEMPLATE:**

```js
function knapsack(weights, values, capacity) {
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
}
```

**TOP 5 LEETCODE:**

1. [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
2. [Coin Change](https://leetcode.com/problems/coin-change/)
3. [Coin Change II](https://leetcode.com/problems/coin-change-ii/)
4. [Target Sum](https://leetcode.com/problems/target-sum/)
5. [Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/)


## 15. Prefix Sum & Difference

*Precompute once — then every range query is O(1).* — [Prefix Sum detail page](/patterns/prefix-sum)

**WHAT IT IS:** Store cumulative totals so any range sum is one subtraction. The difference array is the inverse: mark deltas at the boundaries and a single prefix pass applies many range updates at once.

**HOW IT WORKS:** Array `[3, 1, 4, 1, 5]` → prefix `[3, 4, 8, 9, 14]`. Then `sum(2..4) = pre[4] - pre[1] = 14 - 4 = 10`. Any range sum in `O(1)` after `O(n)` prep.

```
array:  | 3 | 1 | 4 | 1 | 5 |
prefix: | 3 | 4 | 8 | 9 |14 |
sum(2..4) = pre[4] - pre[1] = 14 - 4 = 10
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Build | `O(n)` | One cumulative pass |
| Range query | `O(1)` | Answer = one subtraction |
| Space | `O(n)` | Store the prefix array |

**THE CATCH:** Only works when the data is STATIC. If a single value can change, the prefix sums are stale and need a full `O(n)` rebuild — that's when you'd reach for a different structure.

**INTERVIEW KEYWORDS:** range sum query, subarray sum K, equilibrium index, difference array, range update.

**JS TEMPLATE:**

```js
function buildPrefix(arr) {
  const p = [arr[0]];
  for (let i = 1; i < arr.length; i++) p.push(p[i - 1] + arr[i]);
  return p;
}
function rangeSum(p, l, r) {
  return l === 0 ? p[r] : p[r] - p[l - 1];
}
```

**TOP 5 LEETCODE:**

1. [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
2. [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)
3. [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)
4. [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
5. [Contiguous Array](https://leetcode.com/problems/contiguous-array/)


## 16. Monotonic Stack / Queue

*Keep the stack sorted — answer 'next greater' in one pass.* — [Monotonic Stack detail page](/patterns/monotonic-stack)

**WHAT IT IS:** Maintain a stack whose values are always increasing or decreasing. When a new element breaks the order, pop — and each pop resolves that element's answer. The monotonic deque does the same for sliding-window extremes.

**HOW IT WORKS:** Next greater element on `[2, 1, 5, 3]`. The stack keeps decreasing values — pop while smaller. Each element is pushed and popped once, so the whole scan is `O(n)`.

```
input: | 2 | 1 | 5 | 3 |
stack keeps decreasing values; pop while smaller
each element pushed and popped once -> O(n)
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(n)` | Each item pushed/popped once |
| Space | `O(n)` | Worst case: all on the stack |

**THE CATCH:** The classic use is 'next greater element'. The stack stays sorted, so each item is pushed and popped at most once — that's why it's `O(n)` instead of the `O(n^2)` brute force.

**INTERVIEW KEYWORDS:** next greater element, next smaller element, histogram area, daily temperatures, window maximum.

**JS TEMPLATE:**

```js
function nextGreater(arr) {
  const res = Array(arr.length).fill(-1);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[stack.at(-1)] < arr[i]) {
      res[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return res;
}
```

**TOP 5 LEETCODE:**

1. [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)
2. [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
3. [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
4. [Online Stock Span](https://leetcode.com/problems/online-stock-span/)
5. [Asteroid Collision](https://leetcode.com/problems/asteroid-collision/)


## 17. KMP Pattern Matching

*Never re-read the text — the prefix table does the skipping.* — [Strings detail page](/patterns/strings)

**WHAT IT IS:** Find a pattern inside a longer text. The trick: when a mismatch happens, KMP uses a precomputed table to slide the pattern forward smartly — so it never re-reads any part of the text it already checked. That's what beats the brute-force approach.

**HOW IT WORKS:** Text `a b a b a c a`, pattern `"abac"`. On a mismatch, slide the PATTERN forward using a prefix table — the text is never re-read. Found at index 2 in `O(n+m)`, not `O(n*m)`.

```
text:    | a | b | a | b | a | c | a |
pattern:         | a | b | a | c |
on mismatch, slide PATTERN forward (prefix table)
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search | `O(n+m)` | Text never rescanned |
| Build table | `O(m)` | Preprocess the pattern once |

**THE CATCH:** The whole point: on a mismatch, KMP jumps the PATTERN forward using a prefix table instead of restarting the text — that's what beats the `O(n*m)` brute force. The prefix table is the tricky part to build.

**INTERVIEW KEYWORDS:** pattern matching, strStr, repeated substring, prefix function, LPS table.

**JS TEMPLATE:**

```js
function buildLPS(pat) {
  const lps = Array(pat.length).fill(0);
  let len = 0, i = 1;
  while (i < pat.length) {
    if (pat[i] === pat[len]) lps[i++] = ++len;
    else if (len > 0) len = lps[len - 1];
    else lps[i++] = 0;
  }
  return lps;
}
```

**TOP 5 LEETCODE:**

1. [Find the Index of the First Occurrence](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)
2. [Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)
3. [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)
4. [Longest Happy Prefix](https://leetcode.com/problems/longest-happy-prefix/)
5. [Repeated String Match](https://leetcode.com/problems/repeated-string-match/)


## 18. Rabin-Karp

*Hash the window, roll it forward — compare numbers, not characters.* — [Strings detail page](/patterns/strings)

**WHAT IT IS:** Find a pattern inside a longer text. Instead of comparing letters, compare a number (hash) of each window against the pattern's hash. The window's hash updates in `O(1)` as it slides — drop one char, add the next. Only verify letters when hashes match.

**HOW IT WORKS:** Find `"cd"`: `hash("cd") = 317`, window hash = 317 — hashes match, so verify letters for a real match. Sliding is `O(1)`: drop the left char, add the right char. Found at index 2.

```
text: | a | b |[c | d]| e |
hash("cd") = 317, window hash = 317 -> verify letters
slide in O(1): drop left char, add right char
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Average | `O(n+m)` | One rolling hash per position |
| Worst case | `O(n*m)` | Every hash collides, must verify |

**THE CATCH:** A hash match does NOT prove a string match — two different strings can share a hash (collision), so you must verify the actual characters. Otherwise you'll report false matches.

**INTERVIEW KEYWORDS:** multiple patterns, string matching, rolling hash, duplicate substring, plagiarism check.

**JS TEMPLATE:**

```js
function rabinKarp(text, pattern) {
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
}
```

**TOP 5 LEETCODE:**

1. [Find the Index of the First Occurrence](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)
2. [Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/)
3. [Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring/)
4. [Distinct Echo Substrings](https://leetcode.com/problems/distinct-echo-substrings/)
5. [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)


## 19. Bit Manipulation

*Operate on the binary directly — constant time, zero space.* — [Bits detail page](/patterns/bits)

**WHAT IT IS:** Treat integers as bit vectors. AND, OR, XOR and shifts let you test, set, clear and count bits in constant time. XOR is the star: it cancels pairs, which solves a whole family of 'find the single one' problems.

**HOW IT WORKS:** 4-bit view on 6 (`0110`) and 3 (`0011`): `6 & 3 = 2`, `6 | 3 = 7`, `6 ^ 3 = 5`, `6 << 1 = 12` (shift left = mul 2), `6 >> 1 = 3` (shift right = div 2). Idioms: `n & 1` tests odd (`5 & 1 = 1`); `n & (n-1)` drops the lowest 1 (`12 & 11 = 8`); `n & (-n)` keeps the lowest 1 (`12 & -12 = 4`).

```
6 & 3   0110 & 0011  = 0010 (2)   AND: 1 only if both
6 | 3   0110 | 0011  = 0111 (7)   OR: 1 if either
6 ^ 3   0110 ^ 0011  = 0101 (5)   XOR: 1 if different
6 << 1  shift left = mul 2 (12)   6 >> 1  shift right = div 2 (3)
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Any bit op | `O(1)` | Single CPU instruction |
| Count bits | `O(bits)` | Iterate the set bits |

**THE CATCH:** XOR is the key trick: `a ^ a = 0`, so pairs cancel — that's how you find the one unpaired number. Watch operator precedence: `&` and `|` are LOWER than `==`, so parenthesize.

**INTERVIEW KEYWORDS:** XOR trick, bitmask, single number, power of two, count set bits, subsets via bits, toggle bit.

**JS TEMPLATE:**

```js
function singleNumber(nums) {
  let x = 0;
  for (const n of nums) x ^= n;
  return x;
}
const isOdd = (n) => (n & 1) === 1;
const dropLowest = (n) => n & (n - 1);
```

**TOP 5 LEETCODE:**

1. [Single Number](https://leetcode.com/problems/single-number/)
2. [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
3. [Counting Bits](https://leetcode.com/problems/counting-bits/)
4. [Missing Number](https://leetcode.com/problems/missing-number/)
5. [Power of Two](https://leetcode.com/problems/power-of-two/)


## 20. Number Theory

*GCD, primes, and modular arithmetic.* — see [Bits](/patterns/bits) for bit-level number tricks

**WHAT IT IS:** Two building blocks that show up inside bigger problems. GCD (greatest common divisor): the largest number dividing both. Euclid's trick — keep replacing the bigger with (bigger % smaller) until one becomes 0. SIEVE: to find all primes up to n, cross out every multiple of 2, 3, 5…; what's left is prime.

**HOW IT WORKS:** GCD by Euclid: `gcd(48, 18)` → `48 % 18 = 12` → `gcd(18, 12)` → `18 % 12 = 6` → `gcd(12, 6)` → `12 % 6 = 0` → answer 6. Modular arithmetic keeps numbers small: `(a+b)%m = ((a%m)+(b%m))%m`, `(a-b)%m = ((a%m)-(b%m)+m)%m`, `(a*b)%m = ((a%m)*(b%m))%m`.

```
gcd(48, 18) -> 48 % 18 = 12
gcd(18, 12) -> 18 % 12 = 6
gcd(12, 6)  -> 12 % 6 = 0   => gcd = 6
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| GCD (Euclid) | `O(log n)` | Numbers shrink fast each step |
| Sieve of primes | `O(n log log n)` | Cross out each multiple once |

**THE CATCH:** `+`, `-` and `*` work under a modulus. Division does NOT: `(a / b) % m` is not `(a%m) / (b%m)`. Example: `(10 / 2) % 7 = 5`, but `(10%7) / (2%7) = 3 / 2`. Different.

**INTERVIEW KEYWORDS:** GCD, primes, sieve, modulo, powmod, LCM.

**JS TEMPLATE:**

```js
function gcd(a, b) {
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
}
```

**TOP 5 LEETCODE:**

1. [Count Primes](https://leetcode.com/problems/count-primes/)
2. [Pow(x, n)](https://leetcode.com/problems/powx-n/)
3. [Ugly Number](https://leetcode.com/problems/ugly-number/)
4. [Super Ugly Number](https://leetcode.com/problems/super-ugly-number/)
5. [Perfect Squares](https://leetcode.com/problems/perfect-squares/)


## 21. Segment Tree

*Any associative range query — with updates, in log time.* — [Range Queries detail page](/patterns/range-queries)

**WHAT IT IS:** A binary tree over array ranges: each node stores the answer for its span, built from its two children. Queries decompose a range into `O(log n)` covering nodes. Lazy propagation defers range updates until they are needed.

**HOW IT WORKS:** Array `[1, 3, 4, 2]` → root `[0..3] sum=10`, children `[0..1]=4` and `[2..3]=6`. Query `sum[2..3]`? Read one node: 6. No need to add each element one by one.

```
        [0..3] sum=10
        /          \
  [0..1] 4      [2..3] 6
  /   \          /   \
 1    3         4    2
query sum[2..3]? read one node = 6
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Range query | `O(log n)` | Merges O(log n) nodes |
| Point update | `O(log n)` | Update the node's ancestors |
| Space | `O(n)` | Tree over the array |

**THE CATCH:** Use this when you need BOTH range queries AND updates (prefix sums can't handle updates). If the operation is just sum, a simpler structure works — reach for a segment tree when it's min, max, or something you can't subtract.

**INTERVIEW KEYWORDS:** range min query, range max query, range query + update, lazy propagation, interval query.

**JS TEMPLATE:**

```js
class SegmentTree {
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
}
```

**TOP 5 LEETCODE:**

1. [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/)
2. [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)
3. [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/)
4. [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/)
5. [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/)


## 22. Matrix & Simulation

*No trick to find — just careful, correct execution.* — [Matrix detail page](/patterns/matrix)

**WHAT IT IS:** Problems where the algorithm IS the stated process: rotate a matrix, walk a spiral, run a game of life step. The difficulty is index discipline and boundary handling, not algorithmic insight.

**HOW IT WORKS:** Spiral traversal shrinks the bounds: top → right, right → bottom, bottom → left, left → top, repeat. Track four bounds; shrink after each pass.

```
| 1 | 2 | 3 |   top -> right -> bottom -> left -> top, repeat
| 4 | 5 | 6 |   track four bounds; shrink after each pass
| 7 | 8 | 9 |
```

**WHAT IT COSTS — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(n*m)` | Visit each cell once |
| Space | `O(1)` | Modify in place, no copy |

**THE CATCH:** These problems have no clever trick — the whole challenge is careful index and boundary handling. Rotate = transpose then reverse each row. Do it in place to hit `O(1)` space.

**INTERVIEW KEYWORDS:** spiral order, rotate image, set zeroes, game of life, word search.

**JS TEMPLATE:**

```js
function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
}
```

**TOP 5 LEETCODE:**

1. [Rotate Image](https://leetcode.com/problems/rotate-image/)
2. [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
3. [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
4. [Game of Life](https://leetcode.com/problems/game-of-life/)
5. [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)


## Keep in mind

- Name the pattern before coding — "sliding window with a freq map" scores immediately.
- Every catch is an interview follow-up: "when does this break?" — answer with the catch block.
- Big-O rows assume the standard setup (sorted input for binary search, balanced tree, static array for prefix sums).
- Structures + algorithms pair up: two pointers on arrays, BFS with queues, Dijkstra with heaps, DP over grids.
