# Introduction

**Definition:** Ye section DSA patterns ka ghar hai — random problems hal karne ke bajaye patterns pehchano, kyunki interviews me wahi ~20 patterns ghoom-phir ke aate hain. Har pattern page pe theory, JS templates aur grouped questions hain. Neeche roadmap + **time / space complexity** cheatsheet hai.

## Your revision list (cover these)

1. **Arrays & Hashing** — Arrays page + Hashing page (methods cheatsheet dono pe)
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

Har page pe pehle **Definition / When / How**, phir **Study notes**, phir templates, phir questions.

## Roadmap (Phase-wise)

**Phase 1 — Foundation:** Arrays + Hashing + Strings methods. In-place array tricks, Map/Set/Object, string scan. Har roz 2–3 easy.

**Phase 2 — Array techniques:** Prefix Sum → Two Pointers → Sliding Window → Intervals → Stack → Monotonic Stack → Queue/Deque → Linked List → Binary Search. Pattern pehchan: "sorted?" "contiguous range?" "next greater?"

**Phase 3 — Recursion track:** Recursion → Backtracking → Trees → BST → Heap. Recursion ke bina trees/backtracking me atakoge.

**Phase 4 — Graphs:** [Graphs](/patterns/graphs) (BFS/DFS) → [Topological Sort](/patterns/topological-sort) → [Union Find](/patterns/union-find) → [Shortest Path](/patterns/shortest-path) → [MST](/patterns/mst). Decision: unweighted steps? BFS. Weights? Dijkstra/BF. Order/prereqs? Topo. Merge groups? UF. Connect all cheap? MST.

**Phase 5 — Advanced:** [Dynamic Programming](/patterns/dp) hub → [1D Linear](/patterns/dp-linear) → [Knapsack](/patterns/dp-knapsack) → [2D](/patterns/dp-2d) → Greedy → Trie → Bits. DP types alag pages pe — pehle decision table.

## Time & space complexity (must know)

Interview me har solution ke baad bolna: **time `O(...)`, space `O(...)`**. Space me usually **extra** memory (input ke alawa); recursion stack / call depth bhi space hai.

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
| Two pointers | `O(n)` (sort pehle to `O(n log n)`) | `O(1)` |
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
| DP 1D | `O(n)`–`O(n·W)` | `O(n)` (kabhi `O(1)`) |
| DP 2D (LCS/grid) | `O(n·m)` | `O(n·m)` (optimize `O(min)`) |
| Trie ops | `O(L)` per word | `O(total chars)` |
| Bit tricks | `O(1)`–`O(n)` | `O(1)` |
| Comparison sort | `O(n log n)` | merge `O(n)`, quick `O(log n)` avg |

### Space tips

- **In-place** = mutate input, extra `O(1)` (sort/reverse pointers).
- **Output space** sometimes count nahi hota (sirf algo extra) — interview me clarify.
- **Recursion depth** = space: balanced tree `O(log n)`, skewed / deep BT `O(n)`.
- **Hash map** almost always `O(n)` space trade for speed.

### Common mistakes

- Sorted array pe binary search bol ke phir `O(n)` linear likh dena.
- BFS me `shift()` JS me `O(n)` hai — complexity discuss me bol sakte ho; LC pe often OK.
- DP table size bhoolna (`n+1`, `amount+1`).
- “Average `O(1)` hash” vs adversarial worst `O(n)` — LC me avg assume.
