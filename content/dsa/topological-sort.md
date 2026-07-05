# Topological Sort

Order the vertices of a Directed Acyclic Graph (DAG) so that for every directed edge `u → v`, `u` comes before `v`. Kahn's algorithm (BFS) and DFS are the two common approaches.

## When to use
- Task scheduling or course prerequisites
- Detecting cycles in a directed graph
- Building dependency order for compilation, builds, or package resolution

## How it works

Compute in-degree for every node. Start with nodes that have in-degree 0 and process them one by one, reducing the in-degree of their neighbours. When a neighbour's in-degree reaches 0, enqueue it. If not all nodes are processed, a cycle exists.

```js
function topoSort(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  const inDeg = Array(numNodes).fill(0);
  for (const [u, v] of edges) {
    graph[u].push(v);
    inDeg[v]++;
  }
  const q = [];
  for (let i = 0; i < numNodes; i++) if (inDeg[i] === 0) q.push(i);
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of graph[u]) if (--inDeg[v] === 0) q.push(v);
  }
  return order.length === numNodes ? order : [];
}
```

## Practice problems
- [Course Schedule](https://leetcode.com/problems/course-schedule/) — Detect cycle in prerequisite graph
- [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) — Return one valid ordering
- [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) — Derive letter order from sorted words
- [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) — Topological peel from leaves inward
