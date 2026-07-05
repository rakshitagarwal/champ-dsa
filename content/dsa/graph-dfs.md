# Graph DFS

Depth-First Search (DFS) is a graph traversal algorithm that explores as deep as possible along each branch before backtracking. It uses a stack (either explicitly or via the call stack through recursion) to remember where to go next. DFS is one of the two fundamental graph traversal methods alongside BFS, and it is especially useful for problems involving connectivity, cycle detection, and topological ordering.

The core idea is to start at a source node, mark it visited, and recursively visit each unvisited neighbor. When a node has no more unvisited neighbors (a dead end), the algorithm backtracks to the previous node and continues exploring its remaining neighbors. This depth-first behavior means DFS will go down a single path to its end before trying alternate paths, making it memory-efficient for deep graphs but potentially slow for wide graphs with many branches.

DFS's stack-based nature gives it a natural affinity with recursion — each recursive call pushes a new frame onto the call stack. For very deep graphs, this can lead to stack overflow, which is why an iterative version using an explicit stack is often preferable in production code. The iterative version gives you more control and avoids recursion depth limits, though it may require careful ordering of neighbor pushes to maintain the same traversal order.

## When to use

- **Detecting cycles in a graph** — DFS can detect back edges (edges pointing to an ancestor in the recursion tree), which indicate a cycle. This is fundamental for dependency resolution and deadlock detection.
- **Finding connected components** — Run DFS from every unvisited node; each DFS call marks one connected component. This works for both undirected graphs (connected components) and directed graphs (weakly connected components).
- **Topological sorting** — A post-order DFS (process after visiting all children) produces a reverse topological order. This is the basis for Kahn's algorithm alternative.
- **Path existence between two nodes** — DFS can quickly determine if a path exists, especially when the target is expected to be deep in the graph.
- **Solving puzzles and mazes** — DFS naturally models exploration: go as far as possible, then backtrack when stuck. This is the basis for many backtracking algorithms.
- **Tree traversals (preorder, inorder, postorder)** — Many tree problems reduce to DFS traversals with different visitation orders.
- **Bipartite graph checking** — DFS can assign alternating colors to nodes; if a neighbor has the same color, the graph is not bipartite.
- **Articulation points and bridges** — A DFS-based algorithm (Tarjan's) finds critical nodes and edges whose removal disconnects the graph.

## How it works

### Core concept

DFS uses a last-in-first-out (LIFO) policy: the most recently discovered node is explored first. This contrasts with BFS, which uses a first-in-first-out (FIFO) queue. The LIFO behavior means DFS prioritizes depth over breadth — it commits to a single path and exhausts it before trying alternatives.

Three common visitation orders exist for trees and DAGs:
- **Preorder:** Process the current node before its children. Useful for copying a tree or serializing structure.
- **Inorder:** Process left child, then current node, then right child. Only meaningful for binary trees; produces sorted order for BSTs.
- **Postorder:** Process children before the current node. Used for topological sorting, deleting trees, and computing subtree properties.

For general graphs with cycles, a visited set is essential. Without it, DFS would loop infinitely. The visited set is typically checked before recursing on a neighbor. For directed graphs, you often need three states: unvisited, visiting (in the current recursion stack), and visited (completely processed). This color-coding detects cycles: if you encounter a node in the "visiting" state, a back edge (cycle) exists.

### Step-by-step approach

1. **Choose a starting node.** For connectivity problems, iterate through all nodes and start DFS from each unvisited node. For path-finding, start from the source node.

2. **Mark the current node as visited.** Use a Set (for O(1) lookup) or an array of booleans if nodes are numbered 0 to n-1. For cycle detection, also track whether the node is currently in the recursion stack.

3. **Recurse on each unvisited neighbor.** For each neighbor of the current node, if the neighbor hasn't been visited, recursively call DFS on it. In directed graphs, only follow outgoing edges.

4. **Backtrack when no neighbors remain.** After all neighbors have been explored (or are already visited), the recursion returns to the previous node. This backtracking is automatic in the recursive version.

5. **Post-process if needed.** For topological sort, add the current node to a result list after all children are processed (postorder). For component counting, increment a counter after each top-level DFS call returns.

### Iterative version (explicit stack)

```js
function dfsIterative(graph, start, visited) {
  const stack = [start];
  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
```

Note that the iterative version differs subtly from the recursive version in traversal order because of the LIFO nature of the explicit stack. To match recursive order exactly, push neighbors in reverse order.

### Complexity

- **Time:** O(V + E) — each vertex is visited once, and each edge is examined once (twice for undirected graphs). This is optimal for graph traversal.
- **Space:** O(V) — the visited set and the recursion stack (or explicit stack) can both grow up to the number of vertices in the worst case (a single deep path).

## Variations

- **DFS with colors (cycle detection):** Use three states: 0 = unvisited, 1 = visiting (in current stack), 2 = visited (done). If you encounter a node in state 1, a back edge exists.
- **DFS on grid (island problems):** Treat each cell as a node with up to 4 neighbors (up, down, left, right). DFS from each unvisited land cell to mark an entire connected component.
- **DFS with path reconstruction:** Maintain a parent map (`parent[neighbor] = current`) during DFS. After the target is found, trace parent pointers back to reconstruct the path.
- **DFS for topological sort:** Perform a post-order DFS — add each node to the result list after all its descendants are processed. Reverse the result for a valid topological order.
- **DFS for bipartite check:** Assign alternating colors (0 and 1) during DFS. If a neighbor has the same color as the current node, the graph is not bipartite.

## Edge cases

- **Disconnected graph:** Running DFS from a single source only visits one component. To process the entire graph, loop through all nodes and start a new DFS from each unvisited node.
- **Empty graph (no nodes):** No traversal is needed; return an empty result for connectivity or component queries.
- **Single node with self-loop:** A self-loop is a cycle. The color-based cycle detection should catch this: the neighbor is the same as the current node, which is in the "visiting" state.
- **Directed vs. undirected:** In an undirected graph, each edge appears twice in the adjacency list. The visited set prevents double-counting. In a directed graph, you only follow outgoing edges.
- **Very deep graph (recursion limit):** If the graph is a single path of 100,000 nodes, recursion will overflow the call stack. Use the iterative version with an explicit stack instead.
- **Dense graph (complete graph):** DFS on a complete graph of n nodes will explore all (n-1) neighbors at each step — O(V²) edge examinations. BFS would have the same complexity.

## Practice problems

- [Number of Islands](https://leetcode.com/problems/number-of-islands/) — Classic grid DFS: traverse each connected component of land cells in a 2D matrix
- [Clone Graph](https://leetcode.com/problems/clone-graph/) — DFS to deep-copy each node and its neighbors, using a hash map to track already-cloned nodes
- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) — DFS from both oceans, tracking which cells are reachable from each ocean
- [Course Schedule](https://leetcode.com/problems/course-schedule/) — DFS with colors to detect cycles in a prerequisite graph (directed)
- [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) — Extends the above: return a valid topological order using post-order DFS
- [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) — DFS on adjacency matrix to count connected components in an undirected graph
- [Flood Fill](https://leetcode.com/problems/flood-fill/) — Simple grid DFS/BFS to replace a connected region's color
- [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) — DFS to compute the area of each island, track the maximum
- [Word Search](https://leetcode.com/problems/word-search/) — DFS with backtracking on a 2D grid to find a word path
- [Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) — DFS + memoization on a grid; each cell's longest path depends on its neighbors with larger values
