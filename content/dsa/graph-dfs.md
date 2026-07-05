# Graph DFS

Explore a graph by going as deep as possible along each branch before backtracking, using recursion or an explicit stack.

## When to use
- Detect cycles or find connected components
- Topological sorting / dependency resolution
- Path existence between two nodes
- Explore all nodes in a graph or grid

## How it works

Start at a source node, mark it visited, and recursively visit each unvisited neighbor. When no more neighbors exist, backtrack to the previous node. For graphs (not trees), a visited set is required to prevent infinite loops. DFS can also be implemented iteratively with a stack.

```js
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}
```

## Practice problems
- [Clone Graph](https://leetcode.com/problems/clone-graph/) — DFS to deep-copy each node and its neighbors
- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) — DFS from both oceans, track reachable cells
- [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) — DFS on adjacency matrix to count connected components
- [Course Schedule](https://leetcode.com/problems/course-schedule/) — DFS to detect cycle in prerequisite graph
