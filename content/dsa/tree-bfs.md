# Tree BFS

Breadth-first search (BFS) on a tree processes nodes level by level, starting at the root and moving outward to all nodes at depth 1, then depth 2, and so on. It uses a first-in-first-out (FIFO) queue to guarantee that nodes are visited in order of increasing distance from the root. This is also called **level-order traversal**.

The fundamental advantage of BFS over DFS is that it finds the shortest path in an unweighted graph or tree: the first time BFS reaches a node, it has done so along the shortest possible path (fewest edges). For trees specifically, BFS is the natural choice whenever the problem asks about properties tied to depth levels—such as the rightmost node on each level, the average value per level, or connecting siblings at the same depth.

## When to use

- Need to traverse or process tree nodes grouped by level / depth
- Finding the shortest path between two nodes in an unweighted tree
- Problems like binary tree right side view, level averages, or level-order serialization
- Calculating minimum depth of a tree (first leaf encountered in BFS is the shallowest)
- Connecting nodes at the same level (populating next-right pointers)
- Zigzag or spiral order traversal where traversal direction alternates per level

## How it works

### Core concept

BFS uses a queue. Initially, push the root node. Then, while the queue is not empty, capture the number of nodes currently in the queue—this is exactly the number of nodes at the current level. Dequeue that many nodes one by one, process them, and enqueue their children. By processing exactly `queue.length` nodes before moving on, you draw clear level boundaries.

The queue's FIFO nature is critical: because children are always appended to the end, nodes from the current level (at the front) are exhausted before any nodes from the next level are dequeued. This guarantees that a level is fully processed before the next level begins.

### Step-by-step approach

1. If the root is null, return an empty result (edge case).
2. Initialize an empty queue and push the root node into it.
3. While the queue is not empty:
   - Record `levelSize = queue.length` (the number of nodes at the current level).
   - Optionally create a `currentLevel` array to hold values from this level.
   - Loop from i = 0 to levelSize - 1:
     - Dequeue the front node (`queue.shift()`).
     - Process the node (e.g., push its value to `currentLevel`).
     - If the node has a left child, enqueue it.
     - If the node has a right child, enqueue it.
   - Append `currentLevel` to the result (or process the level's aggregate).
4. Return the result after the queue is empty.

For variants like zigzag traversal, use a flag that toggles each level and reverse the level array on odd levels.

### Complexity

- **Time:** O(n) — each node is enqueued and dequeued exactly once.
- **Space:** O(w) where w is the maximum width of the tree. In the worst case (a perfect binary tree), the queue holds up to n/2 nodes at the leaf level, so O(n).

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

## Variations

- **Zigzag Level Order:** Toggle a boolean each level; when true, push values normally; when false, unshift (prepend) to reverse the order.
- **Average of Levels:** Instead of collecting individual values, sum them and compute the average at the end of each level.
- **Right Side View:** At each level, only record the last node's value (when i === levelSize - 1).
- **Populating Next Right Pointers:** While dequeuing, link the current node to the next node still in the queue (or null if it's the last at that level).
- **Minimum Depth:** Return as soon as you encounter a leaf node (a node with no left and no right child).

## Edge cases

- **Empty tree (root === null):** Return an empty array immediately.
- **Single node (root with no children):** One level processed, result contains one sub-array with one value.
- **Skewed tree (all left children or all right children):** Each level contains exactly one node; queue size stays 1 throughout.
- **Tree with only left or only right subtrees at various depths:** BFS still processes level by level; null children are simply not enqueued.
- **Very wide tree (e.g., perfect binary tree):** Queue may need to hold many nodes; ensure the implementation uses efficient dequeue (shift is O(n) in JS arrays; for competition use a proper queue or index pointer for O(1)).

## Practice problems

- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) — Canonical level-order traversal, the foundation of all BFS problems
- [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) — Level-order traversal with alternating direction per level
- [Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/) — Compute the average value of nodes on each level
- [Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) — Connect each node to its immediate right neighbor at the same level
- [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) — Return the last node's value at each level
- [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) — Use BFS to find the shallowest leaf quickly
