# Data Structures

**Definition:** The 9 data structures interviews recycle. Each card below has the same five blocks: **what it is**, **structure**, **big-O**, **the catch**, and **interview keywords**. Memorize the catch + keywords per structure — that is what separates "I know arrays" from "I reach for the right tool".

**How to use:** Read a card, then open its detail page for JS methods, skeletons, and problems. Algorithms get their own topic later — this page is structures only.

## 1. Array

*The default starting point for every problem.* — [Arrays detail page](/patterns/arrays-strings)

**What it is:** A collection of elements stored in contiguous (side-by-side) memory. Every element has a numbered index starting at 0. Think of it as a row of numbered boxes — you can jump directly to any box in one step because you know exactly where it lives in memory.

**Structure:** Numbered boxes in one row. Index `[2]` jumps straight to the value — `O(1)` direct access.

```
index:  [0]  [1]  [2]  [3]  [4]
value:  | 4 |  9 |  7 |  2 |  5 |
                    ^
              O(1) direct access
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Read by index | `O(1)` | Direct memory jump |
| Search (unsorted) | `O(n)` | Must scan all |
| Insert at end | `O(1)` | Append to tail |
| Insert at middle | `O(n)` | Shifts elements after |
| Delete | `O(n)` | Shifts to fill gap |

**Catch:** Inserting or deleting anywhere except the end forces every element after it to shift — that's `O(n)`. It has no built-in concept of "what came last" or "what arrived first". You're always thinking in positions, not patterns.

**Interview keywords:** index, in-place, two pointers, subarray, running sum, Kadane, rotate, reverse, majority.

## 2. Stack

*When order matters — and "last" is what you need.* — [Stack detail page](/patterns/stack)

**What it is:** A LIFO (Last-In, First-Out) container. You can only push (add) and pop (remove) at one end — the top. Think of a stack of plates: you always take the top one. Perfect for tracking "what just happened" and unwinding it later.

**Structure:** Plates piled up. Both operations happen at the `top` — `O(1)` each.

```
  push O(1) ↙       ↖ pop O(1)
            +-------+
    top →   |   D   |
            |   C   |
            |   B   |
            |   A   |  ← bottom
            +-------+
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Push | `O(1)` | Add to top |
| Pop | `O(1)` | Remove top |
| Peek / Top | `O(1)` | Look at top |
| Search | `O(n)` | Scan from top |
| Size | `O(1)` | Track count |

**Catch:** You can ONLY touch the top. No random access. No way to peek at the third element without popping the two above. You must respect the order — that constraint is exactly what makes it useful.

**Interview keywords:** undo, balanced, brackets, reverse, backtrack, DFS, call stack, monotonic, next greater.

## 3. Linked List

*When you need dynamic size + cheap rewiring.* — [Linked List detail page](/patterns/linked-list)

**What it is:** A chain of nodes where each node holds `[value | pointer to next]`. Nodes live anywhere in memory — the pointer connects them. Insert and delete are `O(1)` if you already hold the node's reference — you just rewire pointers.

**Structure:** Each node is `[ value | next → ]`. `head` points at the first node; the last points at `null`.

```
head
 ↓
+---+---+    +---+---+    +---+---+    +---+---+
| A | *-+--->| B | *-+--->| C | *-+--->| D | *-+---> null
+---+---+    +---+---+    +---+---+    +---+---+
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Access by index | `O(n)` | Walk the chain |
| Search | `O(n)` | Scan node by node |
| Insert (with ref) | `O(1)` | Rewire two pointers |
| Delete (with ref) | `O(1)` | Rewire prev.next |
| Prepend / Append* | `O(1)` | *if tail known |

**Catch:** No random access. `arr[7]` is instant; `ll.get(7)` walks 7 nodes. Every node also carries an extra pointer, so memory overhead is real. Cache-unfriendly compared to arrays — nodes scatter across RAM.

**Interview keywords:** reverse, cycle, fast slow, two pointers, middle, merge, dummy head.

## 4. Queue

*FIFO — order in is order out.* — [Queue / Deque detail page](/patterns/queue)

**What it is:** A First-In, First-Out container. Enqueue at the back, dequeue at the front. Like a line at a coffee shop — first person in gets served first. The backbone of level-by-level processing and breadth-first search across every graph algorithm.

**Structure:** A line with two ends. Items leave from the `front`, arrive at the `back`.

```
          front                        back
dequeue ← +---+---+---+---+---+ ← enqueue
          | A | B | C | D | E |
          +---+---+---+---+---+
          first in, first out (FIFO)
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Enqueue (back) | `O(1)` | Add to tail |
| Dequeue (front) | `O(1)` | Remove head |
| Peek front | `O(1)` | Look at head |
| Search | `O(n)` | Scan all |
| Size | `O(1)` | Track count |

**Catch:** No random access — only front and back are reachable. If array-backed, you either shift on dequeue (`O(n)`) or use a circular buffer with fixed capacity. That's why real implementations use deques or linked lists.

**Interview keywords:** BFS, level order, shortest path, by level, schedule, sliding window.

## 5. Hash Map

*Instant key → value lookup — the interview MVP.* — [Hashing detail page](/patterns/hashing)

**What it is:** Store data by KEY instead of by position. A hash function converts each key into a bucket index — so lookup, insert, and delete are `O(1)` on average. This is the tool that turns "nested loop `O(n^2)`" into "one pass `O(n)`".

**Structure:** `hash(key)` picks a bucket; each key maps to its value.

```
        hash(key) → bucket
     "name"  →  "Alice"
     "age"   →  29
     "city"  →  "NYC"
     "role"  →  "Engineer"
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Insert (put) | `O(1)` | Hash to bucket |
| Lookup (get) | `O(1)` | Hash to bucket |
| Delete | `O(1)` | Hash to bucket |
| Contains key | `O(1)` | Hash to bucket |
| Worst case | `O(n)` | All collide |

**Catch:** No ordering — you cannot iterate keys in sorted or insertion order without extra work. Hash collisions can degrade to `O(n)` worst case. Uses extra memory for the bucket array. Keys must be hashable.

**Interview keywords:** frequency, count, seen, visited, memoize, cache, group by, anagram.

## 6. Tree / BST

*When hierarchy — or sorted-with-fast-search — is the shape.* — [Trees detail page](/patterns/trees) + [BST detail page](/patterns/bst)

**What it is:** A hierarchical structure of nodes with parent-child relationships. In a Binary Search Tree, every node satisfies: left subtree < node < right subtree. That property makes search, insert, and delete all `O(log n)` when balanced.

**Structure:** Parent on top, children below. BST property: left < parent < right.

```
              50
            /    \
          30      70
         /  \    /  \
       20   40 60   80
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search (BST) | `O(log n)` | Halve each step |
| Insert | `O(log n)` | Walk + attach |
| Delete | `O(log n)` | Complex cases |
| Inorder walk | `O(n)` | Visit every node |
| Height | `O(n)` | Worst (skewed) |

**Catch:** A plain BST degrades to `O(n)` if inserts arrive in sorted order (becomes a linked list). Balanced variants (AVL, Red-Black) fix this — but add rotation logic. Tree nodes scatter in memory, so cache locality suffers.

**Interview keywords:** hierarchy, parent, depth, recursion, DFS, inorder, preorder, postorder.

## 7. Heap

*Instant access to min OR max — the priority machine.* — [Heap detail page](/patterns/heap)

**What it is:** A complete binary tree with a partial ordering: in a min-heap, every parent <= its children — so the minimum is always at the root, `O(1)` to peek. Insert and extract are `O(log n)` via bubble-up / sift-down. Stored as an array.

**Structure:** Min at the root; peek reads the root in `O(1)`. Rule: parent ≤ children.

```
              1   ← peek → 1, O(1)
            /   \
           3     5
          / \   / \
         7  8  9  10
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Peek (min/max) | `O(1)` | Root of heap |
| Insert | `O(log n)` | Bubble up |
| Extract (pop) | `O(log n)` | Sift down |
| Heapify | `O(n)` | Build from array |
| Search arbitrary | `O(n)` | Not sorted! |

**Catch:** Only the root is guaranteed to be the min (or max). You CANNOT search for an arbitrary element quickly — a heap is not fully sorted. You can't swap between min-heap and max-heap on the fly — pick one at creation.

**Interview keywords:** top K, kth largest, kth smallest, priority, median, stream, merge k.

## 8. Graph

*Nodes + edges — when connections are the whole point.* — [Graphs detail page](/patterns/graphs)

**What it is:** A set of vertices (V) connected by edges (E). Any topology: directed or undirected, weighted or not, cyclic or acyclic. Trees are special cases. Social networks, road maps, prerequisites, web pages — all become graphs.

**Structure:** Vertices joined by edges. `V` = vertices, `E` = edges.

```
          A
        /   \
       B     C
       |     |
       D --- E
         \ /
          F
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| BFS traversal | `O(V+E)` | Level by level |
| DFS traversal | `O(V+E)` | Deep first |
| Dijkstra | `O(E log V)` | Weighted |
| Cycle detection | `O(V+E)` | DFS + colors |
| Topological sort | `O(V+E)` | DAG only |

**Catch:** Graphs can be cyclic, disconnected, weighted, negatively weighted, directed, or all of the above. You always need a visited set to avoid infinite loops. Weighted paths need Dijkstra; negatives need Bellman-Ford.

**Interview keywords:** network, connection, path, route, islands, components, cycle, dependencies.

## 9. Trie

*Prefix tree — the specialist for strings.* — [Trie detail page](/patterns/trie)

**What it is:** A tree where each edge represents a character. Walking from root to a marked node spells a word. Any node in the middle represents a shared prefix. Insert and search in `O(m)` where `m` = word length — independent of dictionary size.

**Structure:** Root `*`, edges are letters. CAT | CAR | CAN | DO live here — filled nodes are word ends.

```
            *
          /   \
         C     D
         |     |
         A     O   ← DO
       / | \
      T  R  N          ← CAT, CAR, CAN
```

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Insert word | `O(m)` | Walk / create m nodes |
| Search word | `O(m)` | Walk m nodes |
| Prefix exists? | `O(m)` | Walk m nodes |
| List by prefix | `O(p+k)` | p walk + k results |
| Delete | `O(m)` | Walk + unmark |

**Catch:** High memory: every character can spawn its own node — one branch per possible letter. Naive tries waste huge space on sparse alphabets. More complex than a hash map, and for one-shot lookups a hash map is usually faster.

**Interview keywords:** prefix, autocomplete, suggest, starts with, dictionary, word, longest prefix, word break, XOR.

## Keep in mind

- Reach for the structure the keywords point at — then open its detail page for methods and templates.
- Every catch is an interview follow-up: "when does this break?" — answer with the catch block.
- Big-O tables assume the standard implementation (balanced BST, proper deque, load-factored hash map).
