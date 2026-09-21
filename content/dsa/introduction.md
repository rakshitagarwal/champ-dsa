# Introduction

**Definition:** This section is the home for DSA patterns. Instead of solving problems at random, learn to recognize patterns — interviews recycle roughly these ~20 families. Each pattern page has theory, JS templates, and grouped questions. Below: a roadmap plus a **time / space complexity** cheatsheet.

**Start with the [Data Structures](/patterns/data-structures) theory hub** — 9 cards (what, structure, big-O, catch, keywords) — then work the revision list below. Algorithms get their own hub next.

## Your revision list (cover these)

1. **Arrays & Hashing** — Arrays page + Hashing page (methods cheatsheet on both)
2. **Two Pointers**
3. **Sliding Window**
4. **Binary Search**
5. **Stack / Monotonic Stack** — Stack page + Monotonic Stack page
6. **Queue / Deque** — Queue page (deque notes included)
7. **Linked List**
8. **Trees / BST** — Trees page + BST page
9. **Heap / Priority Queue**
10. **Backtracking**
11. **Graphs** (+ **BFS / DFS** comparison on that page) → then **Topological Sort** → **Union Find** → **Shortest Path** → **MST**
12. **Topological Sort**
13. **Union Find**
14. **Shortest Path** / **MST** (after Graphs family)
15. **Greedy**
16. **Intervals**
17. **Dynamic Programming** (hub) → [1D / Linear](/patterns/dp-linear) → [Knapsack](/patterns/dp-knapsack) → [2D](/patterns/dp-2d)
18. **Tries**
19. **Bit Manipulation**
20. **Prefix Sum**
21. **Recursion**

On every page: read **Definition / When / How** first, then **Study notes**, then templates, then questions.

## Roadmap (Phase-wise)

**Phase 1 — Foundation:** Arrays + Hashing + Strings methods. In-place array tricks, Map/Set/Object, string scan. Aim for 2–3 easy problems a day.

**Phase 2 — Array techniques:** Prefix Sum → Two Pointers → Sliding Window → Intervals → Stack → Monotonic Stack → Queue/Deque → Linked List → Binary Search. Recognition cues: "sorted?" "contiguous range?" "next greater?"

**Phase 3 — Recursion track:** Recursion → Backtracking → Trees → BST → Heap. Without recursion fluency, trees and backtracking feel stuck.

**Phase 4 — Graphs:** [Graphs](/patterns/graphs) (BFS/DFS) → [Topological Sort](/patterns/topological-sort) → [Union Find](/patterns/union-find) → [Shortest Path](/patterns/shortest-path) → [MST](/patterns/mst). Decision: unweighted steps? BFS. Weights? Dijkstra/BF. Order/prereqs? Topo. Merge groups? UF. Connect all cheap? MST.

**Phase 5 — Advanced:** [Dynamic Programming](/patterns/dp) hub → [1D Linear](/patterns/dp-linear) → [Knapsack](/patterns/dp-knapsack) → [2D](/patterns/dp-2d) → Greedy → Trie → Bits. DP types live on separate pages — start with the decision table.

## Time & space complexity (must know)

After every solution in an interview, state: **time `O(...)`, space `O(...)`**. Space usually means **extra** memory (beyond the input); recursion stack / call depth counts as space too.

### Big-O ladder (fast → slow)

| Class | Feel | Examples |
| --- | --- | --- |
| `O(1)` | constant | hash get/set avg, array index |
| `O(log n)` | halves each step | binary search, balanced BST, heap push/pop |
| `O(n)` | one (or few) passes | scan, two pointers, sliding window, BFS/DFS on V+E as `O(V+E)` |
| `O(n log n)` | sort + linear | merge/quick/heap sort, many interval / greedy |
| `O(n²)` | nested loops | brute pairs, insertion/bubble, naive DP sometimes |
| `O(2ⁿ)` / `O(n!)` | explode | subsets/perms without prune, naive recursion |

### Pattern → typical complexity

| Pattern | Time (typical) | Extra space (typical) |
| --- | --- | --- |
| Array in-place / Kadane | `O(n)` | `O(1)` |
| Hashing (Map/Set) | `O(n)` avg | `O(n)` |
| Prefix sum build + query | build `O(n)`, query `O(1)` | `O(n)` |
| Two pointers | `O(n)` (if you sort first: `O(n log n)`) | `O(1)` |
| Sliding window | `O(n)` | `O(k)` / alphabet |
| Binary search | `O(log n)` | `O(1)` |
| Stack / mono stack | `O(n)` | `O(n)` |
| Queue BFS | `O(V+E)` | `O(V)` |
| Linked list tricks | `O(n)` | `O(1)` |
| Tree DFS/BFS | `O(n)` | `O(h)` / `O(w)` |
| Heap top-K | `O(n log K)` | `O(K)` |
| Backtracking | often `O(kⁿ)` / `O(n!)` | `O(n)` depth |
| Graph DFS/BFS | `O(V+E)` | `O(V)` |
| Topo (Kahn/DFS) | `O(V+E)` | `O(V)` |
| Dijkstra (heap) | `O((V+E) log V)` | `O(V)` |
| Bellman-Ford | `O(V·E)` | `O(V)` |
| Floyd-Warshall | `O(V³)` | `O(V²)` |
| Kruskal MST | `O(E log E)` | `O(V)` |
| Union-Find | ~`O(α(n))` per op | `O(n)` |
| Greedy + sort | `O(n log n)` | `O(1)`–`O(n)` |
| Intervals merge | `O(n log n)` | `O(n)` |
| DP 1D | `O(n)`–`O(n·W)` | `O(n)` (sometimes `O(1)`) |
| DP 2D (LCS/grid) | `O(n·m)` | `O(n·m)` (optimize `O(min)`) |
| Trie ops | `O(L)` per word | `O(total chars)` |
| Bit tricks | `O(1)`–`O(n)` | `O(1)` |
| Comparison sort | `O(n log n)` | merge `O(n)`, quick `O(log n)` avg |

### Space tips

- **In-place** = mutate input, extra `O(1)` (sort/reverse pointers).
- **Output space** sometimes is not counted (only algo extra) — clarify in the interview.
- **Recursion depth** = space: balanced tree `O(log n)`, skewed / deep BT `O(n)`.
- **Hash map** almost always `O(n)` space traded for speed.

### Common mistakes

- Calling it binary search on a sorted array, then writing an `O(n)` linear scan.
- BFS with `shift()` in JS is `O(n)` per dequeue — fine to mention in complexity talk; usually OK on LC.
- Forgetting DP table size (`n+1`, `amount+1`).
- “Average `O(1)` hash” vs adversarial worst `O(n)` — on LC, assume average.

## Active revision

- Name the ~5 phases and what each unlocks (foundation → array techniques → recursion → graphs → advanced).
- For any pattern you just practiced: state typical time and extra space without looking.
- Pick one graph decision: unweighted / weighted / order / groups / cheap connect — which algorithm?
