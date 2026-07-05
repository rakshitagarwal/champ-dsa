# Tree DFS

Depth-first search (DFS) on a tree explores each branch as far as possible before backtracking. There are three canonical orders—**preorder** (root → left → right), **inorder** (left → root → right), and **postorder** (left → right → root)—each serving a different purpose. DFS can be implemented recursively (simpler, uses the call stack) or iteratively with an explicit stack (avoids stack overflow on deep trees).

DFS is the go-to pattern when the problem requires visiting every node in the tree, especially when decisions depend on information passed from parent to child (top-down) or collected from children to parent (bottom-up). Inorder traversal of a Binary Search Tree visits nodes in sorted ascending order, which is a classic property used in BST validation and range queries.

## When to use

- Need to visit every node of a tree in a specific order
- Problems involving root-to-leaf paths (Path Sum, Binary Tree Paths)
- Validating or searching in a Binary Search Tree (inorder gives sorted order)
- Computing subtree properties: height, diameter, LCA, max path sum
- Serializing / deserializing a tree (preorder is most common)
- Problems requiring a "divide and conquer" approach: solve left subtree, solve right subtree, combine results

## How it works

### Core concept

In DFS, you commit to a direction and go deep until you hit a leaf or a null child, then backtrack. The three orders differ by when you process the root relative to its children:

- **Preorder:** Process root → recurse left → recurse right. Useful when you need to make a decision or copy the node before seeing its children (e.g., building a mirrored tree).
- **Inorder:** Recurse left → process root → recurse right. For BSTs, this yields values in sorted order. For general trees, it's used to flatten a tree into a sorted array.
- **Postorder:** Recurse left → recurse right → process root. Used when you need information from both children before deciding about the root (e.g., computing height, diameter, max path sum). Most "bottom-up" problems use postorder.

The recursive form naturally uses the call stack to backtrack. The iterative form manually manages a stack of nodes (and optionally a visited flag or a second stack for postorder).

### Step-by-step approach

1. **Recursive:** Define a helper function `dfs(node)` that takes the current node.
   - Base case: if node is null, return (or return 0, or return null, depending on the problem).
   - **Preorder:** process node.val first.
   - Recurse on `dfs(node.left)`.
   - **Inorder:** process node.val between left and right calls.
   - Recurse on `dfs(node.right)`.
   - **Postorder:** process node.val after both calls.

2. **Iterative (inorder example):** Use a stack to simulate the call stack.
   - Set `curr = root`, initialize empty stack.
   - While `curr !== null` or stack is not empty:
     - Push all left descendants: while `curr`, push `curr`, then `curr = curr.left`.
     - Pop from stack → process it.
     - Move to right child: `curr = popped.right`.
   - This pattern guarantees left-first processing without recursion.

For postorder iteratively, use two stacks or a visited flag on each node to know whether children have been processed.

### Complexity

- **Time:** O(n) — each node is visited exactly once.
- **Space:** O(h) where h is the height of the tree. Recursive uses the call stack; iterative uses an explicit stack. In the worst case (skewed tree), h = n, so O(n). In a balanced tree, h = log n.

```js
function inorderTraversal(root) {
  const result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return result;
}
```

## Variations

- **Preorder (NLR):** Used for tree serialization, copying a tree, or computing prefix expression trees.
- **Inorder (LNR):** Used for BST validation, sorted order traversal, and finding kth smallest element in BST.
- **Postorder (LRN):** Used for tree deletion, computing height/diameter, postfix expressions, and bottom-up DP.
- **Morris Traversal:** Threads the tree by temporarily linking right pointers to in-order successors, achieving O(1) space (no stack) at the cost of modifying the tree temporarily.
- **Iterative with explicit stack:** Useful when recursion depth may exceed the call stack limit (e.g., very deep or skewed trees in JS/Python).

## Edge cases

- **Empty tree (root === null):** Return an empty result or a base value (0 for leaf count, true for validation, etc.).
- **Single node:** All three orders produce the same single-element result: `[root.val]`.
- **Skewed tree (a chain):** Recursion depth equals n; may overflow the call stack for large n. Use iterative DFS or Morris traversal.
- **Tree with only left children or only right children:** Inorder of a left-skewed tree visits nodes in reverse depth order; preorder visits them in depth order.
- **Tree with duplicate values:** DFS handles duplicates fine if the problem allows them; BST problems may need to treat them carefully.

## Practice problems

- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) — Classic postorder DFS that computes height from children
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) — Inorder DFS to verify the BST property (sorted order)
- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) — Fundamental inorder DFS (recursive and iterative)
- [Path Sum](https://leetcode.com/problems/path-sum/) — Preorder DFS that passes a running sum from root to leaf
- [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) — Postorder DFS combining left and right heights
- [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) — Inorder DFS stops early after k elements
