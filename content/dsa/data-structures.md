# Data Structures

**DATA STRUCTURES CHEATSHEET** — 9 structures. Same card layout as the video notes: **WHAT IT IS → STRUCTURE → BIG-O → THE CATCH → KEYWORDS**, plus **JS TEMPLATE** and **TOP 5 LEETCODE** for revision.

**How to use:** Memorize the catch + keywords. Re-type the JS skeleton cold. Drill one top-5 problem.

## 1. Array

*The default starting point for every problem.* — [Arrays detail page](/patterns/arrays-strings)

**WHAT IT IS:** A collection of elements stored in contiguous (side-by-side) memory. Every element has a numbered index starting at 0. Think of it as a row of numbered boxes — you can jump directly to any box in one step because you know exactly where it lives in memory.

**STRUCTURE:** Numbered boxes in one row. Index `[2]` jumps straight to the value — `O(1)` direct access.

```
index:  [0]  [1]  [2]  [3]  [4]
value:  | 4 |  9 |  7 |  2 |  5 |
                    ^
              O(1) direct access
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Read by index | `O(1)` | Direct memory jump |
| Search (unsorted) | `O(n)` | Must scan all |
| Insert at end | `O(1)` | Append to tail |
| Insert at middle | `O(n)` | Shifts elements after |
| Delete | `O(n)` | Shifts to fill gap |

**THE CATCH:** Inserting or deleting anywhere except the end forces every element after it to shift — that's `O(n)`. It has no built-in concept of "what came last" or "what arrived first". You're always thinking in positions, not patterns.

**INTERVIEW KEYWORDS:** index, in-place, two pointers, subarray, running sum, Kadane, rotate, reverse, majority.

**JS TEMPLATE:**

```js
let arr = [1, 2, 3];
arr.push(4);       // O(1)
arr.pop();         // O(1)
arr.unshift(0);    // O(n)
arr.shift();       // O(n)
arr.splice(1, 1);  // O(n)

// in-place filter (read/write)
let w = 0;
for (let r = 0; r < arr.length; r++) {
  if (keep(arr[r])) arr[w++] = arr[r];
}
```

**TOP 5 LEETCODE:**

1. [Two Sum](https://leetcode.com/problems/two-sum/)
2. [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
3. [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
4. [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
5. [Rotate Array](https://leetcode.com/problems/rotate-array/)


## 2. Stack

*When order matters — and "last" is what you need.* — [Stack detail page](/patterns/stack)

**WHAT IT IS:** A LIFO (Last-In, First-Out) container. You can only push (add) and pop (remove) at one end — the top. Think of a stack of plates: you always take the top one. Perfect for tracking "what just happened" and unwinding it later.

**STRUCTURE:** Plates piled up. Both operations happen at the `top` — `O(1)` each.

```
  push O(1) ↙       ↖ pop O(1)
            +-------+
    top →   |   D   |
            |   C   |
            |   B   |
            |   A   |  ← bottom
            +-------+
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Push | `O(1)` | Add to top |
| Pop | `O(1)` | Remove top |
| Peek / Top | `O(1)` | Look at top |
| Search | `O(n)` | Scan from top |
| Size | `O(1)` | Track count |

**THE CATCH:** You can ONLY touch the top. No random access. No way to peek at the third element without popping the two above. You must respect the order — that constraint is exactly what makes it useful.

**INTERVIEW KEYWORDS:** undo, balanced, brackets, reverse, backtrack, DFS, call stack, monotonic, next greater.

**JS TEMPLATE:**

```js
class Stack {
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}
```

**TOP 5 LEETCODE:**

1. [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
2. [Min Stack](https://leetcode.com/problems/min-stack/)
3. [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
4. [Decode String](https://leetcode.com/problems/decode-string/)
5. [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)


## 3. Linked List

*When you need dynamic size + cheap rewiring.* — [Linked List detail page](/patterns/linked-list)

**WHAT IT IS:** A chain of nodes where each node holds `[value | pointer to next]`. Nodes live anywhere in memory — the pointer connects them. Insert and delete are `O(1)` if you already hold the node's reference — you just rewire pointers.

**STRUCTURE:** Each node is `[ value | next → ]`. `head` points at the first node; the last points at `null`.

```
head
 ↓
+---+---+    +---+---+    +---+---+    +---+---+
| A | *-+--->| B | *-+--->| C | *-+--->| D | *-+---> null
+---+---+    +---+---+    +---+---+    +---+---+
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Access by index | `O(n)` | Walk the chain |
| Search | `O(n)` | Scan node by node |
| Insert (with ref) | `O(1)` | Rewire two pointers |
| Delete (with ref) | `O(1)` | Rewire prev.next |
| Prepend / Append* | `O(1)` | *if tail known |

**THE CATCH:** No random access. `arr[7]` is instant; `ll.get(7)` walks 7 nodes. Every node also carries an extra pointer, so memory overhead is real. Cache-unfriendly compared to arrays — nodes scatter across RAM.

**INTERVIEW KEYWORDS:** reverse, cycle, fast slow, two pointers, middle, merge, dummy head.

**JS TEMPLATE:**

```js
function reverse(head) {
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
}
```

**TOP 5 LEETCODE:**

1. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
2. [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
3. [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
4. [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
5. [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)


## 4. Queue

*FIFO — order in is order out.* — [Queue / Deque detail page](/patterns/queue)

**WHAT IT IS:** A First-In, First-Out container. Enqueue at the back, dequeue at the front. Like a line at a coffee shop — first person in gets served first. The backbone of level-by-level processing and breadth-first search across every graph algorithm.

**STRUCTURE:** A line with two ends. Items leave from the `front`, arrive at the `back`.

```
          front                        back
dequeue ← +---+---+---+---+---+ ← enqueue
          | A | B | C | D | E |
          +---+---+---+---+---+
          first in, first out (FIFO)
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Enqueue (back) | `O(1)` | Add to tail |
| Dequeue (front) | `O(1)` | Remove head |
| Peek front | `O(1)` | Look at head |
| Search | `O(n)` | Scan all |
| Size | `O(1)` | Track count |

**THE CATCH:** No random access — only front and back are reachable. If array-backed, you either shift on dequeue (`O(n)`) or use a circular buffer with fixed capacity. That's why real implementations use deques or linked lists.

**INTERVIEW KEYWORDS:** BFS, level order, shortest path, by level, schedule, sliding window.

**JS TEMPLATE:**

```js
class Queue {
  constructor() { this.items = []; }
  enqueue(x) { this.items.push(x); }
  dequeue() { return this.items.shift(); } // O(n) on array — demo only
  front() { return this.items[0]; }
}
```

**TOP 5 LEETCODE:**

1. [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
2. [Number of Islands](https://leetcode.com/problems/number-of-islands/)
3. [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
4. [Open the Lock](https://leetcode.com/problems/open-the-lock/)
5. [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)


## 5. Hash Map

*Instant key → value lookup — the interview MVP.* — [Hashing detail page](/patterns/hashing)

**WHAT IT IS:** Store data by KEY instead of by position. A hash function converts each key into a bucket index — so lookup, insert, and delete are `O(1)` on average. This is the tool that turns "nested loop `O(n^2)`" into "one pass `O(n)`".

**STRUCTURE:** `hash(key)` picks a bucket; each key maps to its value.

```
        hash(key) → bucket
     "name"  →  "Alice"
     "age"   →  29
     "city"  →  "NYC"
     "role"  →  "Engineer"
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Insert (put) | `O(1)` | Hash to bucket |
| Lookup (get) | `O(1)` | Hash to bucket |
| Delete | `O(1)` | Hash to bucket |
| Contains key | `O(1)` | Hash to bucket |
| Worst case | `O(n)` | All collide |

**THE CATCH:** No ordering — you cannot iterate keys in sorted or insertion order without extra work. Hash collisions can degrade to `O(n)` worst case. Uses extra memory for the bucket array. Keys must be hashable.

**INTERVIEW KEYWORDS:** frequency, count, seen, visited, memoize, cache, group by, anagram.

**JS TEMPLATE:**

```js
function hasDuplicate(arr) {
  const seen = new Set();
  for (const n of arr) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}
```

**TOP 5 LEETCODE:**

1. [Two Sum](https://leetcode.com/problems/two-sum/)
2. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
3. [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
4. [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
5. [LRU Cache](https://leetcode.com/problems/lru-cache/)


## 6. Tree / BST

*When hierarchy — or sorted-with-fast-search — is the shape.* — [Trees detail page](/patterns/trees) + [BST detail page](/patterns/bst)

**WHAT IT IS:** A hierarchical structure of nodes with parent-child relationships. In a Binary Search Tree, every node satisfies: left subtree < node < right subtree. That property makes search, insert, and delete all `O(log n)` when balanced.

**STRUCTURE:** Parent on top, children below. BST property: left < parent < right.

```
              50
            /    \
          30      70
         /  \    /  \
       20   40 60   80
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search (BST) | `O(log n)` | Halve each step |
| Insert | `O(log n)` | Walk + attach |
| Delete | `O(log n)` | Complex cases |
| Inorder walk | `O(n)` | Visit every node |
| Height | `O(n)` | Worst (skewed) |

**THE CATCH:** A plain BST degrades to `O(n)` if inserts arrive in sorted order (becomes a linked list). Balanced variants (AVL, Red-Black) fix this — but add rotation logic. Tree nodes scatter in memory, so cache locality suffers.

**INTERVIEW KEYWORDS:** hierarchy, parent, depth, recursion, DFS, inorder, preorder, postorder.

**JS TEMPLATE:**

```js
function search(node, target) {
  if (!node || node.value === target) return node;
  return target < node.value
    ? search(node.left, target)
    : search(node.right, target);
}
```

**TOP 5 LEETCODE:**

1. [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
2. [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
3. [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
4. [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
5. [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)


## 7. Heap

*Instant access to min OR max — the priority machine.* — [Heap detail page](/patterns/heap)

**WHAT IT IS:** A complete binary tree with a partial ordering: in a min-heap, every parent <= its children — so the minimum is always at the root, `O(1)` to peek. Insert and extract are `O(log n)` via bubble-up / sift-down. Stored as an array.

**STRUCTURE:** Min at the root; peek reads the root in `O(1)`. Rule: parent ≤ children.

```
              1   ← peek → 1, O(1)
            /   \
           3     5
          / \   / \
         7  8  9  10
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Peek (min/max) | `O(1)` | Root of heap |
| Insert | `O(log n)` | Bubble up |
| Extract (pop) | `O(log n)` | Sift down |
| Heapify | `O(n)` | Build from array |
| Search arbitrary | `O(n)` | Not sorted! |

**THE CATCH:** Only the root is guaranteed to be the min (or max). You CANNOT search for an arbitrary element quickly — a heap is not fully sorted. You can't swap between min-heap and max-heap on the fly — pick one at creation.

**INTERVIEW KEYWORDS:** top K, kth largest, kth smallest, priority, median, stream, merge k.

**JS TEMPLATE:**

```js
class MinHeap {
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
}
```

**TOP 5 LEETCODE:**

1. [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
2. [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
3. [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
4. [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
5. [Task Scheduler](https://leetcode.com/problems/task-scheduler/)


## 8. Graph

*Nodes + edges — when connections are the whole point.* — [Graphs detail page](/patterns/graphs)

**WHAT IT IS:** A set of vertices (V) connected by edges (E). Any topology: directed or undirected, weighted or not, cyclic or acyclic. Trees are special cases. Social networks, road maps, prerequisites, web pages — all become graphs.

**STRUCTURE:** Vertices joined by edges. `V` = vertices, `E` = edges.

```
          A
        /   \
       B     C
       |     |
       D --- E
         \ /
          F
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| BFS traversal | `O(V+E)` | Level by level |
| DFS traversal | `O(V+E)` | Deep first |
| Dijkstra | `O(E log V)` | Weighted |
| Cycle detection | `O(V+E)` | DFS + colors |
| Topological sort | `O(V+E)` | DAG only |

**THE CATCH:** Graphs can be cyclic, disconnected, weighted, negatively weighted, directed, or all of the above. You always need a visited set to avoid infinite loops. Weighted paths need Dijkstra; negatives need Bellman-Ford.

**INTERVIEW KEYWORDS:** network, connection, path, route, islands, components, cycle, dependencies.

**JS TEMPLATE:**

```js
function dfs(g, node, visited = new Set()) {
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
}
```

**TOP 5 LEETCODE:**

1. [Number of Islands](https://leetcode.com/problems/number-of-islands/)
2. [Clone Graph](https://leetcode.com/problems/clone-graph/)
3. [Course Schedule](https://leetcode.com/problems/course-schedule/)
4. [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)
5. [Network Delay Time](https://leetcode.com/problems/network-delay-time/)


## 9. Trie

*Prefix tree — the specialist for strings.* — [Trie detail page](/patterns/trie)

**WHAT IT IS:** A tree where each edge represents a character. Walking from root to a marked node spells a word. Any node in the middle represents a shared prefix. Insert and search in `O(m)` where `m` = word length — independent of dictionary size.

**STRUCTURE:** Root `*`, edges are letters. CAT | CAR | CAN | DO live here — filled nodes are word ends.

```
            *
          /   \
         C     D
         |     |
         A     O   ← DO
       / | \
      T  R  N          ← CAT, CAR, CAN
```

**WHAT IT DOES — BIG-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Insert word | `O(m)` | Walk / create m nodes |
| Search word | `O(m)` | Walk m nodes |
| Prefix exists? | `O(m)` | Walk m nodes |
| List by prefix | `O(p+k)` | p walk + k results |
| Delete | `O(m)` | Walk + unmark |

**THE CATCH:** High memory: every character can spawn its own node — one branch per possible letter. Naive tries waste huge space on sparse alphabets. More complex than a hash map, and for one-shot lookups a hash map is usually faster.

**INTERVIEW KEYWORDS:** prefix, autocomplete, suggest, starts with, dictionary, word, longest prefix, word break, XOR.

**JS TEMPLATE:**

```js
class TrieNode {
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
}
```

**TOP 5 LEETCODE:**

1. [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
2. [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
3. [Word Search II](https://leetcode.com/problems/word-search-ii/)
4. [Replace Words](https://leetcode.com/problems/replace-words/)
5. [Maximum XOR of Two Numbers in an Array](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/)


## Keep in mind

- Reach for the structure the keywords point at — then open its detail page for methods and templates.
- Every catch is an interview follow-up: "when does this break?" — answer with the catch block.
- Big-O tables assume the standard implementation (balanced BST, proper deque, load-factored hash map).
