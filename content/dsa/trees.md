# Trees (DFS/BFS)

DFS = recurse (or stack) on left/right. BFS = queue, drain one level at a time using `queue.length`.

```js
// DFS skeleton
function dfs(node) {
  if (!node) return base;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return combine(node, left, right);
}

// BFS skeleton
const queue = [root];
while (queue.length) {
  const n = queue.length; // one level
  for (let i = 0; i < n; i++) {
    const node = queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

## DFS — Max Depth

Recurse, depth is 1 + max of children — [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/).

```js
// Tree DFS — postorder combine
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  if (!root) return 0; // base
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return 1 + Math.max(left, right); // combine
}
```

## BFS — Level Order

Queue + level size — [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/).

```js
// Tree BFS — process by level
// LC: https://leetcode.com/problems/binary-tree-level-order-traversal/
function levelOrder(root) {
  if (!root) return [];
  const out = [], queue = [root];
  while (queue.length) {
    const level = [];
    const n = queue.length; // snapshot this level
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    out.push(level);
  }
  return out;
}
```

## DFS — Invert Tree

Swap children, then recurse — [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/).

```js
// Tree DFS — rewrite then go down (preorder)
// LC: https://leetcode.com/problems/invert-binary-tree/
function invertTree(root) {
  if (!root) return null;
  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
```

**More:** [Same Tree](https://leetcode.com/problems/same-tree/), [Validate BST](https://leetcode.com/problems/validate-binary-search-tree/), [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/), [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/).
