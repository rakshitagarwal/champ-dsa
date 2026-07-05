# Tree DFS

Depth-first traversal of a tree (preorder, inorder, postorder) using recursion or an explicit stack to explore branches fully before backtracking.

## When to use
- Need to visit every node in a specific order
- Problems involving root-to-leaf paths, subtree properties, or BST validation
- Recursive tree problems where you combine left/right results

## How it works

Choose an order: preorder (root → left → right), inorder (left → root → right), or postorder (left → right → root). Recursively visit nodes or use an explicit stack. Inorder traversal of a BST yields sorted values.

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

## Practice problems
- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) — DFS to find the deepest node
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) — Inorder DFS checks BST property
- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) — Classic inorder DFS
- [Path Sum](https://leetcode.com/problems/path-sum/) — DFS root-to-leaf path checking
