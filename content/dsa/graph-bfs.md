# Graph BFS

Traverse a graph level by level using a queue, guaranteeing shortest path in unweighted graphs.

## When to use
- Shortest path in an unweighted graph or grid
- Find connected components / islands
- Multi-source propagation (rotting oranges, infection spread)
- Level-order traversal of trees or graphs

## How it works

Start from one or more source nodes, push them into a queue, and mark visited. While the queue is not empty, pop a node, process it, and enqueue all unvisited neighbors. BFS visits nodes in order of their distance from the source, so the first time a target is reached it is via the shortest path.

```js
function bfs(graph, start) {
  const queue = [start], visited = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

## Practice problems
- [Number of Islands](https://leetcode.com/problems/number-of-islands/) — BFS from each unvisited land cell to count components
- [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) — Multi-source BFS with time elapsed per level
- [Word Ladder](https://leetcode.com/problems/word-ladder/) — BFS over word transformations with one-letter edits
- [01 Matrix](https://leetcode.com/problems/01-matrix/) — Multi-source BFS from all zero cells to compute distances
