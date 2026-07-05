# Trees (DFS/BFS)

Trees are hierarchical data structures consisting of nodes connected by edges, with a single root node and no cycles. A **binary tree** allows each node at most two children (left and right), while a **binary search tree (BST)** maintains the invariant that for every node, all values in the left subtree are smaller and all values in the right subtree are larger. Tree traversal is the foundation of nearly every tree problem, and there are four canonical traversal orders: **preorder** (root → left → right), **inorder** (left → root → right), **postorder** (left → right → root), and **level-order** (breadth-first, level by level). Each order reveals different structural properties — for instance, inorder traversal of a BST yields sorted output, preorder encodes the tree for serialization, and postorder is used when children must be processed before their parent (e.g., computing subtree heights).

Depth-first search (DFS) explores as far as possible along each branch before backtracking, consuming O(h) stack space where h is tree height. Breadth-first search (BFS) explores all nodes at the current depth before moving deeper, using O(w) queue space where w is the maximum width. Understanding when to use each is critical: DFS is typically simpler to implement recursively and works well for path-based problems (root-to-leaf sums, subtree checks), while BFS is the natural choice for shortest-path, level-order, and problems requiring minimal distance from the root.

## When to use

- Computing tree properties like maximum depth, diameter, or balanced-height checks
- Finding paths from root to leaf that satisfy a target sum or property
- Determining the lowest common ancestor (LCA) of two nodes in a binary tree
- Validating whether a binary tree satisfies BST properties
- Constructing a tree from traversal arrays (preorder + inorder, level-order, etc.)
- Performing level-order traversal or printing nodes in a zigzag/spiral pattern
- Serializing and deserializing a binary tree to/from a string representation
- Counting complete tree nodes or finding the kth smallest/largest element in a BST
- Inverting or mirroring a binary tree and checking tree symmetry
- Finding right-side view, left-side view, or top/bottom view of a binary tree

## How it works

### Core concept

**Recursive DFS** is the most natural way to traverse a tree. The function calls itself on the left child, then the right child, with the order of processing (visit) determining preorder, inorder, or postorder. The recursive approach is concise and closely mirrors the mathematical definition of a tree, but it uses the call stack, which can overflow on very deep (skewed) trees — the worst-case stack depth is O(n) for a degenerate tree. For balanced trees the height is O(log n), so recursion is usually safe.

**Iterative DFS** uses an explicit stack to simulate the recursion. This approach avoids stack overflow and gives finer control over the traversal order. For inorder traversal, you push all left descendants onto the stack, then pop and process the node before moving to its right subtree. For preorder, you process the node on first visit and push children in reverse order. For postorder, two stacks or a visited flag are often needed. Iterative traversal is slightly more code but is the production-safe choice when the tree depth is unbounded.

**BFS with a queue** processes nodes level by level. You start with the root in the queue, then repeatedly dequeue a node, process it, and enqueue its children. BFS is optimal for shortest-path queries in unweighted trees (e.g., minimum depth, burning tree, time to infect all nodes). It also naturally produces level-order output. The queue size can grow up to the maximum width of the tree, which for a perfect binary tree is roughly n/2 — so space can be O(n) in the worst case.

### Step-by-step approach

1. **Identify traversal order.** Determine whether the problem requires DFS (preorder/inorder/postorder) or BFS (level-order). Preorder is for cloning/serialization, inorder for sorted BST output, postorder for bottom-up computation, BFS for shortest path or level grouping.
2. **Choose recursive or iterative.** Use recursion when the tree is expected to be balanced or the depth is known to be small. Use an explicit stack/queue when the tree could be skewed or when iterative traversal is explicitly required.
3. **Initialize the stack/queue.** For DFS recursion, the call stack is implicit. For iterative DFS, push the root onto an explicit stack. For BFS, enqueue the root into a queue.
4. **Loop until empty.** For DFS, while the stack is not empty, pop a node and push its children (in appropriate order). For BFS, while the queue is not empty, dequeue a node and enqueue its children.
5. **Process the node at the correct point.** In recursive DFS, process before left call (preorder), between calls (inorder), or after both calls (postorder). In iterative DFS with stack, the order of pushing determines the traversal order. In BFS, each level is typically processed together in a `for` loop over the current queue size.
6. **Aggregate or return result.** Track a running value (depth, sum, boolean) and update it as each node is processed. Return the aggregated answer once traversal completes.

### Complexity

- **Time:** O(n) — every node is visited exactly once in any traversal. For each node, a constant amount of work is done (push/pop or enqueue/dequeue plus value comparison).
- **Space:** O(h) for DFS (recursive call stack or explicit stack) where h is tree height (O(log n) for balanced, O(n) for skewed). O(w) for BFS (queue) where w is maximum tree width (up to n/2 for a perfect binary tree).

```js
// Recursive inorder traversal
function inorderRecursive(root, result = []) {
  if (!root) return result;
  inorderRecursive(root.left, result);
  result.push(root.val);
  return inorderRecursive(root.right, result);
}

// Iterative inorder traversal with explicit stack
function inorderIterative(root) {
  const result = [], stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}

// Level-order BFS traversal
function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

## Variations

- **BST-specific operations:** Insert, delete, search, find floor/ceil, find kth smallest (inorder), and range queries leverage BST sortedness for O(log n) average time.
- **Morris traversal (threaded binary tree):** Uses leaf node right pointers to temporarily link back to ancestors, achieving O(1) extra space for inorder/preorder traversal without recursion or stack.
- **N-ary trees:** Trees where each node can have more than two children. Traversal follows the same DFS/BFS patterns but iterates over an array of children instead of `left`/`right` pointers.
- **Segment trees and Fenwick trees (BIT):** Array-based tree structures for range queries and point updates in O(log n). Not traversed like binary trees but share the hierarchical divide-and-conquer concept.
- **Trie (prefix tree):** An N-ary tree optimized for string prefix operations. Each node stores character links and an end-of-word flag. Used in autocomplete, spell check, and IP routing.
- **Binary tree reconstruction:** Given two traversal sequences (e.g., preorder + inorder), reconstruct the original tree. This relies on the property that each traversal order uniquely defines the tree when paired with a complementary order.

## Edge cases

- **Empty tree (root is null):** All traversals and operations must return a sensible base value (empty array, -1, Infinity, null) without crashing.
- **Single node (root with no children):** Depth is 1, traversals produce one element, and properties like height and diameter hinge on the base case returning 0 for null children.
- **Skewed tree (every node has only one child, effectively a linked list):** DFS recursion depth equals n, risking stack overflow. Iterative approaches or tail-recursion optimization considerations become important.
- **Duplicate values in BST (if the problem defines BST with ≤/≥ for duplicates):** Decide whether equal values go to the left or right child consistently. Standard BST implementations usually forbid duplicates or place them on the left.
- **Unbalanced tree (one subtree much deeper than the other):** BFS queue may be more memory-efficient than DFS recursion, which could blow the stack on the deep side.
- **Very deep tree causing recursion stack overflow:** In JavaScript, the max call stack size is roughly 10 000–15 000 frames. For production, always prefer iterative stacks for depth-unbounded trees, or use languages/environments with tail-call optimization.
- **Tree with negative values or zero:** Path-sum and max-path-sum problems must account for negative contributions — a path sum may be improved by dropping negative subtrees.

## Practice problems

- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) — Canonical DFS recursion: depth = 1 + max(depth(left), depth(right)).
- [Same Tree](https://leetcode.com/problems/same-tree/) — Check structural identity and value equality using simultaneous DFS on both trees.
- [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) — Swap left and right children recursively; demonstrates preorder traversal.
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) — BFS with a queue, processing each level separately using the current queue size.
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) — Inorder traversal must be strictly increasing; alternatively pass min/max bounds down recursively.
- [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) — Inorder traversal of a BST yields sorted order; stop at the kth visited node.
- [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) — DFS returns the node when a target is found in either subtree; the LCA is the first node where both targets appear in different branches.
- [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) — Use preorder DFS with a sentinel (e.g., "null") to encode the tree as a string, then rebuild using a queue of tokens.
- [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) — Postorder DFS returns the maximum gain from a subtree; a global max tracks the best path through any node as the root of that path segment.
- [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) — Postorder DFS computes left and right depths; the diameter at a node is leftDepth + rightDepth; the global maximum across all nodes is the answer.
