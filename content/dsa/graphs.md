# Graphs (DFS/BFS)

Graphs model pairwise relationships between objects using **vertices** (nodes) and **edges** (connections). The two primary representations are the **adjacency list** (an array of neighbor lists, O(V+E) space) and the **adjacency matrix** (a V×V boolean/weight matrix, O(V²) space). Adjacency lists are preferred for sparse graphs; matrices excel when edge lookups must be O(1) or the graph is dense. The core traversal paradigms — DFS and BFS — each expose different properties of a graph and are chosen based on the problem's structure.

DFS (Depth-First Search) uses a stack (recursive or explicit) to explore one branch to completion before backtracking. It is memory-efficient for deep graphs but can overflow the call stack on long paths. BFS (Breadth-First Search) uses a queue to explore level by level, guaranteeing the shortest path in unweighted graphs at the cost of larger memory for wide graphs. Both run in **O(V + E)** time and require a **visited set** to avoid infinite loops in cyclic graphs. For directed graphs, **three-color marking** (unvisited → visiting → visited) detects back edges that indicate cycles.

![Graph types and representations](/images/dsa/graph-types-representations.svg)

![Cycle detection with three-color DFS](/images/dsa/graph-cycle-detection.svg)

## When to use

- **Finding connected components or counting islands** — Run DFS/BFS from each unvisited node; each traversal marks one component
- **Shortest path in an unweighted graph** — BFS guarantees the minimum number of edges because it processes nodes in order of distance from the source
- **Cycle detection** — DFS with three-color states detects back edges; BFS can also detect cycles via parent-vertex tracking
- **Topological sorting** — Post-order DFS produces a reverse topological order; Kahn's algorithm (BFS with in-degree tracking) produces a forward order
- **Bipartite graph checking** — BFS or DFS alternates node colors (0/1); a conflict means the graph is not bipartite
- **Detecting deadlocks or dependency resolution** — Cycle detection in directed graphs models circular dependencies
- **Path existence between two nodes** — DFS can find a path quickly if the target is deep; BFS finds the shortest path
- **Multi-source propagation (rotting oranges, fire spread)** — BFS initialized with multiple sources computes distance to the nearest source
- **Maze solving and backtracking** — DFS naturally models exhaustive search with backtracking when a path reaches a dead end
- **Strongly connected components (SCC)** — Kosaraju's or Tarjan's algorithm uses DFS to find SCCs in directed graphs

## How it works

### Core concept

DFS relies on a **stack** discipline — the most recently discovered node is explored first. In the recursive version, the call stack itself acts as the stack, making the code concise. Each recursive call visits a node, marks it visited, and recurses on each unvisited neighbor. When no neighbors remain, the call returns (backtracks). For very deep graphs, an **iterative version** with an explicit `Array` stack avoids stack overflow but may differ subtly in traversal order unless neighbors are pushed in reverse.

BFS relies on a **queue** discipline — nodes are processed first-in-first-out. It enqueues all unvisited neighbors of the current node, then moves to the next node in the queue. The **level** (distance from source) can be tracked by processing the queue in batches: capture the queue size before the inner loop, and each batch corresponds to one level. This level-by-level processing is what guarantees shortest-path correctness in unweighted graphs.

A **visited set** (boolean array, hash set, or in-place grid mutation) prevents revisiting nodes. For cycle detection in directed graphs, three-color state is used: `0` (unvisited), `1` (visiting — currently on the recursion stack), `2` (visited — all descendants processed). If DFS encounters a node in state `1`, a back edge (cycle) exists. This three-color approach works for both DFS and can be adapted to BFS using parent tracking.

### Step-by-step approach

**BFS shortest path (unweighted):**
1. Initialize a queue with the source node and a distance map (or level counter). Mark source visited.
2. While the queue is not empty, dequeue a node. If it is the target, return its distance.
3. For each unvisited neighbor, mark it visited, set its distance = current distance + 1, and enqueue it.
4. If the queue empties without finding the target, return -1 (unreachable).

**DFS cycle detection (directed graph):**
1. Initialize a `color` array of length V with all values set to `0` (unvisited).
2. For each node with `color[i] === 0`, run DFS from it.
3. In DFS: set `color[node] = 1` (visiting). For each neighbor, if `color[neighbor] === 1`, a cycle is found. If `color[neighbor] === 0`, recurse.
4. After processing all neighbors, set `color[node] = 2` (visited). Return.
5. If any DFS call finds a back edge, return true (cycle exists).

### Complexity

- **Time:** O(V + E) — each vertex is visited once, and each edge is examined once (twice for undirected graphs)
- **Space:** O(V) — visited set plus queue (BFS) or recursion/explicit stack (DFS). The queue can hold O(V) nodes in the worst case; the recursion stack can also reach O(V) for a linear chain.

```js
// BFS shortest path in unweighted graph (adjacency list)
function shortestPath(graph, start, target) {
  const visited = new Set([start]);
  const queue = [[start, 0]];
  while (queue.length) {
    const [node, dist] = queue.shift();
    if (node === target) return dist;
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}
```

## Variations

- **Topological sort via post-order DFS:** Run DFS from each unvisited node; append node to a result list after exploring all neighbors. Reverse the result to obtain a valid topological order.
- **Kahn's algorithm (BFS):** Compute in-degree for all nodes. Enqueue nodes with in-degree 0. While the queue is not empty, dequeue, add to result, decrement neighbor in-degrees; enqueue any neighbor whose in-degree becomes 0. If the result size < V, a cycle exists.
- **Bipartite check with BFS coloring:** Assign color 0 to a start node, BFS to neighbors assigning alternating colors (1 - current). If a neighbor already has the same color, the graph is not bipartite.
- **Strongly connected components (Kosaraju):** First DFS on original graph records finish times; second DFS on reversed graph processes nodes in decreasing finish time — each pass discovers one SCC.
- **Strongly connected components (Tarjan):** Single DFS that tracks discovery times and low-link values to identify SCCs at the point of backtracking.
- **Union-Find (Disjoint Set Union) as an alternative for connectivity:** Offers near-constant time per operation for dynamic connectivity queries but cannot detect cycles in directed graphs or find shortest paths.

## Edge cases

- **Empty graph (no vertices):** No traversal is needed; return 0 for component count or an empty array for paths.
- **Single node:** No neighbors to process — the node itself is trivially reachable. Check for self-loops if cycle detection is required.
- **Disconnected graph:** A single DFS/BFS only visits one component. Loop over all vertices to ensure every component is processed.
- **Directed vs. undirected graphs:** In undirected graphs, each edge appears in both adjacency lists; the visited set prevents double-counting. In directed graphs, only follow outgoing edges.
- **Self-loops:** A node connected to itself creates a cycle. In three-color DFS, the neighbor is the current node (state 1), so it is immediately detected.
- **Very deep graph (recursion limit):** A single path of 100K+ nodes causes stack overflow in recursive DFS — use an explicit stack (iterative DFS) or switch to BFS.
- **Dense graph (complete graph):** With O(V²) edges, both BFS and DFS examine all edges, making O(V²) unavoidable. Consider whether an adjacency matrix is more appropriate.

## Practice problems

- [Number of Islands](https://leetcode.com/problems/number-of-islands/) — Count connected components in a 2D grid using DFS or BFS
- [Clone Graph](https://leetcode.com/problems/clone-graph/) — DFS with a hash map to deep-copy each node and its neighbors
- [Course Schedule](https://leetcode.com/problems/course-schedule/) — DFS with three-color cycle detection or Kahn's algorithm on a prerequisite graph
- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) — DFS from both oceans to find cells reachable by both
- [Word Ladder](https://leetcode.com/problems/word-ladder/) — BFS over word transformations with one-letter edits, shortest path in implicit graph
- [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) — DFS or BFS on an adjacency matrix to count friend circles
- [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) — Return a valid topological order using DFS post-order or Kahn's algorithm
- [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) — Multi-source BFS tracking elapsed time per level
