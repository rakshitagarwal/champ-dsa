# Tree BFS

Level-order traversal of a tree using a queue, processing nodes level by level from root to leaves.

## When to use
- Need to process tree nodes by their depth/level
- Finding shortest path in an unweighted tree or graph
- Problems involving level-based relationships (right view, averages, etc.)

## How it works

Push the root into a queue. While the queue is not empty, capture its current size (nodes at current level), pop them one by one, process each, and push their children. The size snapshot ensures you process one full level at a time.

```js
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}
```

## Practice problems
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) — Canonical level-order traversal
- [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) — Level-order with alternating direction
- [Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/) — Compute average of each level
- [Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) — Connect nodes at the same level
