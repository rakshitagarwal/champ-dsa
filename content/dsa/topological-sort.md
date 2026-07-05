# Topological Sort

Topological sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge `u → v`, vertex `u` appears before vertex `v`. This ordering is fundamental to any problem involving dependencies: course prerequisites, build systems, task scheduling, package managers, and symbol resolution in compilers. A DAG must be acyclic — if a cycle exists, no valid topological ordering exists because the circular dependency can never be satisfied.

Two standard algorithms produce a topological ordering: Kahn's algorithm (BFS-based, using in-degree counting) and DFS-based post-order traversal. Kahn's algorithm is often preferred in interview settings because it naturally doubles as a cycle detector: if the output list does not contain all nodes, a cycle is present. Topological sort is also the core routine behind many graph problems on LeetCode that appear disguised as ordering or dependency-resolution tasks.

## When to use

- Course schedule and prerequisite ordering
- Task scheduling with dependencies (build pipelines, CI/CD stages)
- Detecting cycles in a directed graph
- Solving problems where relative order must respect constraints (e.g., Alien Dictionary)
- Topologically peeling layers of a graph (e.g., Minimum Height Trees)
- Computing the longest path in a DAG (critical path)

## How it works

### Core concept

Kahn's algorithm relies on **in-degree** — the number of incoming edges to a vertex. In a DAG, a vertex with in-degree 0 has no prerequisites and can be placed next in the order. After placing it, we remove its outgoing edges, which reduces the in-degree of its neighbours. Any neighbour whose in-degree reaches 0 is now ready to be placed. This process continues until all vertices are placed or no vertex with in-degree 0 remains (indicating a cycle).

The DFS approach performs a post-order traversal: recursively visit all neighbours of a node, then push the node onto a stack once all its neighbours are processed. Reversing the stack gives a valid topological order. DFS also detects cycles by tracking nodes in the current recursion stack — if we encounter a node already on the stack, a cycle exists.

### Step-by-step approach (Kahn's algorithm)

1. Build an adjacency list (`graph[u] = [v, ...]`) and compute the in-degree count for every vertex (`inDeg[v]++` for each edge `u → v`).
2. Initialize a queue with all vertices whose in-degree is 0. These have no dependencies and can be processed first.
3. While the queue is not empty:
   - Dequeue a vertex `u` and append it to the result order.
   - For each neighbour `v` of `u`, decrement `inDeg[v]`. If `inDeg[v]` reaches 0, enqueue `v`.
4. After the loop, check if `order.length === numNodes`. If not, a cycle exists and no valid topological ordering is possible — return an empty array or throw.

### Complexity

- **Time:** O(V + E) — each vertex and edge is processed exactly once
- **Space:** O(V + E) — adjacency list and in-degree array

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
    for (const v of graph[u]) {
      inDeg[v]--;
      if (inDeg[v] === 0) q.push(v);
    }
  }
  return order.length === numNodes ? order : [];
}

// DFS-based approach for comparison
function topoSortDFS(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  for (const [u, v] of edges) graph[u].push(v);
  const visited = Array(numNodes).fill(0); // 0=unvisited, 1=visiting, 2=done
  const order = [];
  function dfs(u) {
    if (visited[u] === 1) return false; // cycle
    if (visited[u] === 2) return true;
    visited[u] = 1;
    for (const v of graph[u]) if (!dfs(v)) return false;
    visited[u] = 2;
    order.push(u);
    return true;
  }
  for (let i = 0; i < numNodes; i++) if (visited[i] === 0 && !dfs(i)) return [];
  return order.reverse();
}
```

## Variations

- **All topological orders (backtracking):** When multiple valid orderings exist, use DFS with in-degree tracking and backtracking to enumerate every possible order. The branching factor is the number of current zero-in-degree nodes.
- **Lexicographically smallest order:** Replace the queue with a min-heap (or sorted insertion). Always pick the smallest-indexed zero-in-degree node next.
- **Alien Dictionary:** Extract pairwise edge constraints from the sorted words, build a DAG of characters, and run topological sort. A cycle means the dictionary is invalid.
- **Minimum Height Trees (peel leaves):** Repeatedly remove leaf nodes (in-degree ≤ 1) in topological fashion. The last 1–2 nodes remaining are the roots of the minimum-height trees.
- **Longest path in DAG:** Topologically sort the graph, then process vertices in order, relaxing the longest distance to each neighbour (`dist[v] = max(dist[v], dist[u] + weight(u,v))`).

## Edge cases

- **Empty graph (0 nodes):** Return an empty array. The algorithm trivially succeeds.
- **Single node (no edges):** Return `[0]`. In-degree is 0, the queue processes it immediately.
- **Disconnected DAG:** All nodes still have a valid topological ordering relative to their own subgraphs. The algorithm handles this naturally since each component has its own zero-in-degree start nodes.
- **Self-loop:** A node with `u → u` means `inDeg[u] ≥ 1` always, so the node is never enqueued. The algorithm correctly detects a cycle.
- **Large graph with many edges:** Both Kahn and DFS scale to O(V + E). Choose Kahn if you only need one valid ordering; choose DFS if you need to also detect cycles via recursion stack.
- **Duplicate edges:** Increment `inDeg` twice for duplicate edges. Handle by deduplicating edges or tracking processed neighbours in a set.

## Practice problems

- [Course Schedule](https://leetcode.com/problems/course-schedule/) — Detect cycle in a prerequisite graph (return boolean)
- [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) — Return one valid topological order
- [Course Schedule IV](https://leetcode.com/problems/course-schedule-iv/) — Floyd-Warshall or DFS with memoization on a DAG
- [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) — Build a DAG from sorted words and topologically sort characters
- [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) — Topological peel from leaves inward until 1–2 roots remain
- [Parallel Courses](https://leetcode.com/problems/parallel-courses/) — Minimum semesters via level-order topological sort
