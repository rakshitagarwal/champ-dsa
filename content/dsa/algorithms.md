# Algorithms Cheatsheet

**Definition:** 22 essential algorithm patterns for coding interviews. Each card below has the same five blocks: **what it is**, **how it works**, **big-O**, **the catch**, and **interview keywords**. Pair with the [Data Structures](/patterns/data-structures) hub — structures hold data, algorithms move through it.

**How to use:** Read a card, then open its detail page for JS templates and problems.

## 1. Binary Search

*Halve the search space — the cheapest win in interviews.* — [Binary Search detail page](/patterns/binary-search)

**What it is:** Repeatedly cut a SORTED range in half. Compare the middle to your target, then throw away the half that cannot contain it. Also works on any monotonic answer space, not just arrays.

**How it works:** Sorted input required. Check the `mid` element: `target < mid` discards the entire right half. Each step halves `n`, so the search finishes in `log2(n)` steps.

```
sorted: | 1 | 3 | 5 |[7]| 9 | 11 | 13 |
                       mid
target < mid -> discard the entire right half
each step halves n -> log2(n) steps
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search | `O(log n)` | Halves the range each step |
| Space | `O(1)` | Just two index variables |
| If unsorted first | `O(n log n)` | Sorting dominates the cost |

**Catch:** Only works on SORTED data. If the array isn't sorted, sorting first costs `O(n log n)` — which can cost more than a plain linear scan for a single lookup. Classic bug: the mid calculation causing an infinite loop.

**Interview keywords:** sorted array, log n time, find target, rotated array, find peak, first/last position.

## 2. Two Pointers

*Two indices, one pass — collapse the nested loop.* — [Two Pointers detail page](/patterns/two-pointers)

**What it is:** Walk two indices through the data instead of nesting two loops. They can start at both ends and close inward, or both start left and move at different speeds (fast / slow).

**How it works:** On sorted input, compare against the target: sum too big moves `R` left, sum too small moves `L` right. Each pointer crosses once — one pass, no extra space.

```
L →                         ← R
| 2 |  4 |  6 |  9 | 12 | 15 |
sum too big -> move R left
sum too small -> move L right
one pass, no extra space -> O(n)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Scan | `O(n)` | Each pointer crosses once |
| Space | `O(1)` | No extra data structure |

**Catch:** The two-ends version needs SORTED input — on unsorted data, use a hash map instead. Know both flavors: two ends closing in (for pair sums) vs fast/slow (for cycles).

**Interview keywords:** pair sum, palindrome, container water, 3sum, remove duplicates, merge sorted.

## 3. Sliding Window

*Contiguous subarrays without recomputing from scratch.* — [Sliding Window detail page](/patterns/sliding-window)

**What it is:** Keep a moving range over the data. Expand the right edge to include more, shrink the left edge when the window breaks a constraint. Reuse the previous window's work instead of rebuilding it.

**How it works:** The window is the current candidate. Expand right until invalid, then shrink from the left. Each index enters and leaves once.

```
array:  | a |[b | c | b]| d | a |
             window = current candidate
expand right until invalid -> shrink from left
each index enters and leaves once -> O(n)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(n)` | Each index enters/leaves once |
| Space | `O(k)` | Only the window is stored |

**Catch:** Only works when the subarray must be CONTIGUOUS. The trick is to reuse the last window's work instead of recomputing — that's what turns an `O(n^2)` brute force into `O(n)`.

**Interview keywords:** longest substring, contiguous subarray, at most k distinct, fixed window, min/max window.

## 4. Sorting

*The O(n log n) floor that unlocks everything else.* — [Sorting detail page](/patterns/sorting-techniques)

**What it is:** Reorder elements so comparisons become meaningful. Merge sort divides then combines; quicksort partitions around a pivot. Any comparison-based sort has a hard `O(n log n)` lower bound.

**How it works:** Merge sort splits in half (`log n` levels) and merges each level in `O(n)` — `log n` levels × `O(n)` merge gives `O(n log n)`.

```
merge sort - divide then combine
| 8 | 3 | 5 | 1 |  →  | 8 | 3 |  | 5 | 1 |  →  | 1 | 3 | 5 | 8 | (merged)
log n levels x O(n) merge -> O(n log n)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Merge sort | `O(n log n)` | Splits in half: log n levels |
| Quicksort avg | `O(n log n)` | Balanced partitions |
| Quicksort worst | `O(n^2)` | Bad pivot on sorted input |
| Space | `O(n)` / `O(1)` | Merge copies; quick in-place |

**Catch:** Quicksort degrades to `O(n^2)` on already-sorted input with a naive pivot — randomize the pivot to avoid it. Merge sort is stable but needs `O(n)` extra space; quicksort is in-place but NOT stable. Interviewers probe exactly this trade-off.

**Interview keywords:** sort first, sort by key, kth largest, merge sorted, quickselect pivot, stable sort.

## 5. Recursion & Backtracking

*Explore every branch — then undo and try the next.* — [Recursion](/patterns/recursion) + [Backtracking](/patterns/backtracking)

**What it is:** Build a candidate one choice at a time. When a choice leads nowhere, undo it and try the next option. The call stack tracks where you are; the undo step is what makes it backtracking rather than plain recursion.

**How it works:** At every node: choose → explore → un-choose. All subsets of `{a, b, c}` branch from `[]` to `[a]`, `[b]`, `[c]`, then `[a,b]`, `[a,c]`… — 8 results total.

```
all subsets of {a, b, c}:  [] → [a] [b] [c] → [a,b] [a,c] ...
choose -> explore -> un-choose, at every node
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Subsets | `O(2^n)` | Include/exclude each element |
| Permutations | `O(n!)` | n choices, then n-1, then n-2… |
| Space | `O(n)` | Recursion goes n levels deep |

**Catch:** Forgetting to UNDO your choice after recursing is the #1 bug — it corrupts every later branch. The pattern is always: choose, recurse, un-choose. Exponential by nature, so expect it only on small input sizes.

**Interview keywords:** all combinations, all permutations, all subsets, generate all, N-Queens, sudoku solver.

## 6. BFS / DFS

*Traverse any graph — the only question is queue or stack.* — [Graphs detail page](/patterns/graphs)

**What it is:** BFS uses a QUEUE and expands level by level, so it finds the fewest-edges path first. DFS uses a STACK (or recursion) and dives deep before backing up. Both need a visited set to survive cycles.

**How it works:** Start at A, visit every node once. Same graph, two orders: BFS (queue) visits `A B C D E`; DFS (stack) visits `A B D E C`.

```
      A
    /   \
   B     C
  / \
 D   E
BFS (queue): A B C D E     DFS (stack): A B D E C
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(V+E)` | Visit every node and edge once |
| Space | `O(V)` | Holds up to V nodes |

**Catch:** Forgetting the visited set means infinite looping on a cycle. Remember: BFS finds the shortest path in an UNWEIGHTED graph (fewest edges); DFS does not — it just explores.

**Interview keywords:** traverse grid, islands, shortest steps, connected components, clone graph, flood fill.

## 7. Dynamic Programming

*Solve each subproblem once — and know when greedy is enough.* — [DP hub](/patterns/dp)

**What it is:** When subproblems repeat, solve each once and store the result (memoization). Build up from smaller answers to bigger ones. GREEDY is the cousin: take the locally best choice and never look back. Faster, but only correct when local best = global best.

**How it works:** `fib(5)` repeats `f(3)` twice in a naive tree. Memoize: solve each once, reuse the answer — cost drops from `O(2^n)` to `O(n)`, and `fib(5) = 5`.

```
f(5) → f(4), f(3); f(4) → f(3), f(2)   (f(3) done twice)
memoize: solve each once, reuse the answer
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| With memo | `O(states)` | Each subproblem solved once |
| Without memo | `O(2^n)` | Same subproblems recomputed |
| Greedy | `O(n log n)` | Usually a sort, then one pass |

**Catch:** The STATE is the set of variables that define one subproblem (e.g. 'index i with budget w left'). Get it wrong and the whole solution breaks. For greedy: it fails SILENTLY on problems where local best isn't global best — always sanity-check with a small counterexample.

**Interview keywords:** max/min value, count ways, optimal choice, memoize, subsequence, knapsack, edit distance.

## 8. Tree Traversals

*Four orders, one recursion — know which one the problem wants.* — [Trees detail page](/patterns/trees)

**What it is:** Visit every node in a defined order. Pre-order roots first, in-order gives a BST in sorted order, post-order handles children before parents. Level-order uses a queue instead of recursion.

**How it works:** On tree `1 → (2 → (4, 5), 3)`: pre = `1 2 4 5 3`, in = `4 2 5 1 3`, post = `4 5 2 3 1`, level = `1 2 3 4 5`.

```
        1
      /   \
     2     3
    / \
   4   5
pre: 1 2 4 5 3    in: 4 2 5 1 3
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Any traversal | `O(n)` | Visit every node once |
| Space | `O(h)` | Recursion depth = tree height |

**Catch:** Recursion depth is the tree's HEIGHT, not the node count — a skewed tree (basically a linked list) can hit `O(n)` depth and overflow the stack. Remember: in-order on a BST gives sorted output.

**Interview keywords:** inorder, preorder, postorder, level order, validate BST, serialize tree, tree depth.

## 9. Lowest Common Ancestor

*The deepest node that is an ancestor of both targets.* — [Trees detail page](/patterns/trees)

**What it is:** Find the deepest node that has both targets in its subtree. On a BST you can walk down by value comparison. On a general tree, recurse and return the node where the left and right searches both succeed.

**How it works:** Trace paths from D and E up to the root — they meet at B, so `LCA(D, E) = B`.

```
        A
      /   \
     B     C
    / \
   D   E
meet at B -> LCA(D, E) = B
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| General tree | `O(n)` | May scan all nodes to find both |
| BST | `O(h)` | Compare values, one path down |
| Space | `O(h)` | Recursion depth = tree height |

**Catch:** On a BST you can walk down fast using value comparisons (go left/right until the targets split). On a plain binary tree there's no ordering, so you must recurse through nodes. Edge case: one target is the ancestor of the other.

**Interview keywords:** lowest common ancestor, BST ancestor, path to node, distance between nodes, kth ancestor.

## 10. Dijkstra

*Shortest path when edges have weights — greedy plus a heap.* — [Shortest Path detail page](/patterns/shortest-path)

**What it is:** Find the shortest distance from a start node to all others, when edges have costs. Keep a best-known distance to every node. Repeatedly pick the nearest unfinalized node, lock in its distance, and update its neighbors if going through it is cheaper. A min-heap gives you the nearest node fast.

**How it works:** Shortest distance from A to every node. `A->C` direct is 5, but `A->B->C` is `2+1 = 3` — so the shorter path wins. Finalized nodes are locked: always take nearest next.

```
A --2--> B --4--> D
|         |       ^
5      dist=2     |2
|         v       |
+-------> C -----+
        dist=3 → D dist=5
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| With min-heap | `O((V+E) log V)` | Nearest node in log V each step |
| Space | `O(V)` | One distance per node |

**Catch:** Breaks on NEGATIVE edge weights. Dijkstra locks in a node's distance the moment it's picked — but a later negative edge could have made it shorter. It won't error, just return a wrong answer.

**Interview keywords:** shortest path, weighted edges, min cost path, cheapest route, network delay, priority queue.

## 11. Minimum Spanning Tree

*Connect every node at the lowest total edge weight.* — [MST detail page](/patterns/mst)

**What it is:** Choose a subset of edges connecting all nodes with minimum total weight and no cycles. Kruskal sorts edges and adds any that do not close a cycle (using DSU). Prim grows one tree outward with a heap.

**How it works:** Keep the cheapest edges, skip any that form a cycle (the 6-edge is skipped). Total = `1 + 2 + 3 + 1 = 7`.

```
A --2--> B        A-B(2), A-C(1), C-D(3), D-E(1) kept
|         | 6     B-D(6) skipped (cycle)
C --3--> D --1--> E
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Kruskal | `O(E log E)` | Sort edges, then add cheapest |
| Prim | `O(E log V)` | Grow the tree with a min-heap |
| Space | `O(V+E)` | Edges + bookkeeping |

**Catch:** An MST minimizes TOTAL weight — it does NOT give the shortest path between two nodes (that's Dijkstra). This is the most common mix-up. An MST always has exactly V-1 edges.

**Interview keywords:** connect all, min cost, Kruskal, Prim, network wiring, V-1 edges.

## 12. 1-D Dynamic Programming

*One array, one pass — the DP you will meet first.* — [1D DP detail page](/patterns/dp-linear)

**What it is:** State depends only on a fixed number of previous positions. Build `dp[0..n]` left to right, each entry from a small window behind it. Often collapses to two variables once you see the dependency is bounded.

**How it works:** Climbing stairs: `dp[i] = dp[i-1] + dp[i-2]` → `1, 1, 2, 3, 5, 8`. Each state depends on a fixed window behind it — keep 2 vars instead of the array for `O(1)` space.

```
dp: | 1 | 1 | 2 | 3 |[5]|[8]|
idx:  [0] [1] [2] [3] [4] [5]
each state depends on a fixed window behind it
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Fill table | `O(n)` | One pass, each state is O(1) |
| Space | `O(n)` / `O(1)` | Often need last 1-2 values |

**Catch:** Getting the BASE CASE wrong poisons the whole table. Many 1-D problems (like Fibonacci) only need the last one or two values, so you can drop from an `O(n)` array to `O(1)` variables.

**Interview keywords:** climbing stairs, house robber, coin change, decode ways, fibonacci, jump game.

## 13. 2-D / Grid DP

*Two indices, a table — grids and string pairs.* — [2D DP detail page](/patterns/dp-2d)

**What it is:** State is `dp[i][j]`: a position in a grid, or a pair of prefixes from two strings. Fill row by row so every dependency is already computed. The answer usually sits in the bottom-right cell.

**How it works:** Unique paths: `dp[i][j] = up + left`. Fill row by row; the answer sits in the last cell (10 for the 3×4 example).

```
| 1 | 1 | 1 | 1 |
| 1 | 2 | 3 | 4 |
| 1 | 3 | 6 | 10|  ← answer
fill row by row; answer sits in the last cell
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Fill table | `O(n*m)` | Every cell computed once |
| Space | `O(n*m)` | The full grid of subproblems |

**Catch:** Off-by-one errors on the first row/column cause most bugs — decide up front whether your table is 0- or 1-indexed. The answer usually ends up in the bottom-right cell.

**Interview keywords:** grid paths, unique paths, edit distance, longest common subseq, two strings, min path sum.

## 14. Knapsack DP

*Fill a limited bag with the most valuable items.* — [Knapsack DP detail page](/patterns/dp-knapsack)

**What it is:** You have a bag with a weight limit and a set of items, each with a weight and a value. Pick items to maximize total value without going over the limit. For each item you face one choice: take it (and use up its weight) or skip it. Try both, keep the better result.

**How it works:** Bag holds weight 5 — take this item or not? TAKE it: value 4 + best of remaining weight 2. SKIP it: best value using full weight 5. Keep whichever gives more value. Answer each (item, weight) pair once, store it.

```
item: weight 3, value 4  (bag capacity 5)
TAKE it: value 4 + best of remaining weight 2
SKIP it: best value using full weight 5
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| 0/1 knapsack | `O(n*W)` | n items × W capacity states |
| Space | `O(W)` | Can reduce the 2-D table to 1-D |

**Catch:** The key question for every item is simply: is it worth more to take it or skip it? Compare both and keep the larger. Know the two types: 0/1 means each item can be used once; unbounded means you can reuse items.

**Interview keywords:** 0/1 knapsack, subset sum, partition equal, coin change, target sum.

## 15. Prefix Sum & Difference

*Precompute once — then every range query is O(1).* — [Prefix Sum detail page](/patterns/prefix-sum)

**What it is:** Store cumulative totals so any range sum is one subtraction. The difference array is the inverse: mark deltas at the boundaries and a single prefix pass applies many range updates at once.

**How it works:** Array `[3, 1, 4, 1, 5]` → prefix `[3, 4, 8, 9, 14]`. Then `sum(2..4) = pre[4] - pre[1] = 14 - 4 = 10`. Any range sum in `O(1)` after `O(n)` prep.

```
array:  | 3 | 1 | 4 | 1 | 5 |
prefix: | 3 | 4 | 8 | 9 |14 |
sum(2..4) = pre[4] - pre[1] = 14 - 4 = 10
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Build | `O(n)` | One cumulative pass |
| Range query | `O(1)` | Answer = one subtraction |
| Space | `O(n)` | Store the prefix array |

**Catch:** Only works when the data is STATIC. If a single value can change, the prefix sums are stale and need a full `O(n)` rebuild — that's when you'd reach for a different structure.

**Interview keywords:** range sum query, subarray sum K, equilibrium index, difference array, range update.

## 16. Monotonic Stack / Queue

*Keep the stack sorted — answer 'next greater' in one pass.* — [Monotonic Stack detail page](/patterns/monotonic-stack)

**What it is:** Maintain a stack whose values are always increasing or decreasing. When a new element breaks the order, pop — and each pop resolves that element's answer. The monotonic deque does the same for sliding-window extremes.

**How it works:** Next greater element on `[2, 1, 5, 3]`. The stack keeps decreasing values — pop while smaller. Each element is pushed and popped once, so the whole scan is `O(n)`.

```
input: | 2 | 1 | 5 | 3 |
stack keeps decreasing values; pop while smaller
each element pushed and popped once -> O(n)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(n)` | Each item pushed/popped once |
| Space | `O(n)` | Worst case: all on the stack |

**Catch:** The classic use is 'next greater element'. The stack stays sorted, so each item is pushed and popped at most once — that's why it's `O(n)` instead of the `O(n^2)` brute force.

**Interview keywords:** next greater element, next smaller element, histogram area, daily temperatures, window maximum.

## 17. KMP Pattern Matching

*Never re-read the text — the prefix table does the skipping.* — [Strings detail page](/patterns/strings)

**What it is:** Find a pattern inside a longer text. The trick: when a mismatch happens, KMP uses a precomputed table to slide the pattern forward smartly — so it never re-reads any part of the text it already checked. That's what beats the brute-force approach.

**How it works:** Text `a b a b a c a`, pattern `"abac"`. On a mismatch, slide the PATTERN forward using a prefix table — the text is never re-read. Found at index 2 in `O(n+m)`, not `O(n*m)`.

```
text:    | a | b | a | b | a | c | a |
pattern:         | a | b | a | c |
on mismatch, slide PATTERN forward (prefix table)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search | `O(n+m)` | Text never rescanned |
| Build table | `O(m)` | Preprocess the pattern once |

**Catch:** The whole point: on a mismatch, KMP jumps the PATTERN forward using a prefix table instead of restarting the text — that's what beats the `O(n*m)` brute force. The prefix table is the tricky part to build.

**Interview keywords:** pattern matching, strStr, repeated substring, prefix function, LPS table.

## 18. Rabin-Karp

*Hash the window, roll it forward — compare numbers, not characters.* — [Strings detail page](/patterns/strings)

**What it is:** Find a pattern inside a longer text. Instead of comparing letters, compare a number (hash) of each window against the pattern's hash. The window's hash updates in `O(1)` as it slides — drop one char, add the next. Only verify letters when hashes match.

**How it works:** Find `"cd"`: `hash("cd") = 317`, window hash = 317 — hashes match, so verify letters for a real match. Sliding is `O(1)`: drop the left char, add the right char. Found at index 2.

```
text: | a | b |[c | d]| e |
hash("cd") = 317, window hash = 317 -> verify letters
slide in O(1): drop left char, add right char
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Average | `O(n+m)` | One rolling hash per position |
| Worst case | `O(n*m)` | Every hash collides, must verify |

**Catch:** A hash match does NOT prove a string match — two different strings can share a hash (collision), so you must verify the actual characters. Otherwise you'll report false matches.

**Interview keywords:** multiple patterns, string matching, rolling hash, duplicate substring, plagiarism check.

## 19. Bit Manipulation

*Operate on the binary directly — constant time, zero space.* — [Bits detail page](/patterns/bits)

**What it is:** Treat integers as bit vectors. AND, OR, XOR and shifts let you test, set, clear and count bits in constant time. XOR is the star: it cancels pairs, which solves a whole family of 'find the single one' problems.

**How it works:** 4-bit view on 6 (`0110`) and 3 (`0011`): `6 & 3 = 2`, `6 | 3 = 7`, `6 ^ 3 = 5`, `6 << 1 = 12` (shift left = mul 2), `6 >> 1 = 3` (shift right = div 2). Idioms: `n & 1` tests odd (`5 & 1 = 1`); `n & (n-1)` drops the lowest 1 (`12 & 11 = 8`); `n & (-n)` keeps the lowest 1 (`12 & -12 = 4`).

```
6 & 3   0110 & 0011  = 0010 (2)   AND: 1 only if both
6 | 3   0110 | 0011  = 0111 (7)   OR: 1 if either
6 ^ 3   0110 ^ 0011  = 0101 (5)   XOR: 1 if different
6 << 1  shift left = mul 2 (12)   6 >> 1  shift right = div 2 (3)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Any bit op | `O(1)` | Single CPU instruction |
| Count bits | `O(bits)` | Iterate the set bits |

**Catch:** XOR is the key trick: `a ^ a = 0`, so pairs cancel — that's how you find the one unpaired number. Watch operator precedence: `&` and `|` are LOWER than `==`, so parenthesize.

**Interview keywords:** XOR trick, bitmask, single number, power of two, count set bits, subsets via bits, toggle bit.

## 20. Number Theory

*GCD, primes, and modular arithmetic.* — see [Bits](/patterns/bits) for bit-level number tricks

**What it is:** Two building blocks that show up inside bigger problems. GCD (greatest common divisor): the largest number dividing both. Euclid's trick — keep replacing the bigger with (bigger % smaller) until one becomes 0. SIEVE: to find all primes up to n, cross out every multiple of 2, 3, 5…; what's left is prime.

**How it works:** GCD by Euclid: `gcd(48, 18)` → `48 % 18 = 12` → `gcd(18, 12)` → `18 % 12 = 6` → `gcd(12, 6)` → `12 % 6 = 0` → answer 6. Modular arithmetic keeps numbers small: `(a+b)%m = ((a%m)+(b%m))%m`, `(a-b)%m = ((a%m)-(b%m)+m)%m`, `(a*b)%m = ((a%m)*(b%m))%m`.

```
gcd(48, 18) -> 48 % 18 = 12
gcd(18, 12) -> 18 % 12 = 6
gcd(12, 6)  -> 12 % 6 = 0   => gcd = 6
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| GCD (Euclid) | `O(log n)` | Numbers shrink fast each step |
| Sieve of primes | `O(n log log n)` | Cross out each multiple once |

**Catch:** `+`, `-` and `*` work under a modulus. Division does NOT: `(a / b) % m` is not `(a%m) / (b%m)`. Example: `(10 / 2) % 7 = 5`, but `(10%7) / (2%7) = 3 / 2`. Different.

**Interview keywords:** GCD, primes, sieve, modulo, powmod, LCM.

## 21. Segment Tree

*Any associative range query — with updates, in log time.* — [Range Queries detail page](/patterns/range-queries)

**What it is:** A binary tree over array ranges: each node stores the answer for its span, built from its two children. Queries decompose a range into `O(log n)` covering nodes. Lazy propagation defers range updates until they are needed.

**How it works:** Array `[1, 3, 4, 2]` → root `[0..3] sum=10`, children `[0..1]=4` and `[2..3]=6`. Query `sum[2..3]`? Read one node: 6. No need to add each element one by one.

```
        [0..3] sum=10
        /          \
  [0..1] 4      [2..3] 6
  /   \          /   \
 1    3         4    2
query sum[2..3]? read one node = 6
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Range query | `O(log n)` | Merges O(log n) nodes |
| Point update | `O(log n)` | Update the node's ancestors |
| Space | `O(n)` | Tree over the array |

**Catch:** Use this when you need BOTH range queries AND updates (prefix sums can't handle updates). If the operation is just sum, a simpler structure works — reach for a segment tree when it's min, max, or something you can't subtract.

**Interview keywords:** range min query, range max query, range query + update, lazy propagation, interval query.

## 22. Matrix & Simulation

*No trick to find — just careful, correct execution.* — [Matrix detail page](/patterns/matrix)

**What it is:** Problems where the algorithm IS the stated process: rotate a matrix, walk a spiral, run a game of life step. The difficulty is index discipline and boundary handling, not algorithmic insight.

**How it works:** Spiral traversal shrinks the bounds: top → right, right → bottom, bottom → left, left → top, repeat. Track four bounds; shrink after each pass.

```
| 1 | 2 | 3 |   top -> right -> bottom -> left -> top, repeat
| 4 | 5 | 6 |   track four bounds; shrink after each pass
| 7 | 8 | 9 |
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Traverse | `O(n*m)` | Visit each cell once |
| Space | `O(1)` | Modify in place, no copy |

**Catch:** These problems have no clever trick — the whole challenge is careful index and boundary handling. Rotate = transpose then reverse each row. Do it in place to hit `O(1)` space.

**Interview keywords:** spiral order, rotate image, set zeroes, game of life, word search.

## Keep in mind

- Name the pattern before coding — "sliding window with a freq map" scores immediately.
- Every catch is an interview follow-up: "when does this break?" — answer with the catch block.
- Big-O rows assume the standard setup (sorted input for binary search, balanced tree, static array for prefix sums).
- Structures + algorithms pair up: two pointers on arrays, BFS with queues, Dijkstra with heaps, DP over grids.
