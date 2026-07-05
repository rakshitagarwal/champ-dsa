# Graph BFS

Breadth-First Search (BFS) traverses a graph level by level, exploring all nodes at the current distance before moving to nodes at the next distance. It uses a **queue** (FIFO) to process nodes and a **visited set** to avoid cycles. In unweighted graphs, BFS guarantees the shortest path in terms of number of edges — the first time a target node is reached, it is via the shortest route.

BFS is the go-to algorithm for problems involving shortest distances, connected components, level-order processing, and multi-source propagation. It models real-world scenarios like finding the shortest route on a map, determining how fast a rumor spreads, or computing the minimum number of moves in a puzzle. The algorithm runs in O(V + E) time, visiting each vertex and edge exactly once.

## When to use

- Shortest path in an unweighted graph or grid (minimum number of edges/steps)
- Finding connected components or counting islands in a grid
- Multi-source propagation where multiple starting points spread simultaneously (rotting oranges, infection, fire)
- Level-order traversal of trees or printing nodes by distance from root
- Topological ordering in a DAG (Kahn's algorithm uses BFS with in-degree tracking)
- Minimal moves in puzzles (sliding tile, word ladder, knight moves on a chessboard)

## How it works

### Core concept

BFS explores outward from the source(s) like a wavefront. A queue holds nodes to visit; initially it contains all source nodes marked visited. While the queue is not empty, dequeue a node, process it, and enqueue all its unvisited neighbors (marking them visited immediately upon enqueue to prevent re-enqueuing). The level (distance) can be tracked by processing the queue in batches — record the queue size before each level loop.

The invariant is: when you process a node, you have already visited all nodes closer to the source. This ensures the shortest-path property. For multi-source BFS, all sources start at distance 0 — the first time any of them reaches a target gives the global minimum distance from the nearest source.

### Step-by-step approach

1. **Initialize the queue and visited set:** Enqueue all source nodes and mark them visited. For distance tracking, either store `[node, dist]` in the queue or use a level-by-level pattern.
2. **Loop while queue is not empty:** Dequeue the front node. If it's the target and you only need existence, return immediately (shortest path found).
3. **Process neighbors:** For each unvisited neighbor, mark visited and enqueue it. In grid problems, neighbors are adjacent cells (4-directional or 8-directional). For abstract graphs, generate neighbors via transformations (word ladder, state transitions).
4. **Track level/distance (optional):** Before the inner loop, capture `queue.length` and iterate that many times — each batch is one level.
5. **Return the result:** Distance to target, count of components, the level matrix, or `-1` if unreachable.

### Complexity

- **Time:** O(V + E) — each vertex and edge is processed once
- **Space:** O(V) — queue and visited set hold at most all vertices

```js
// Number of Islands — BFS on grid
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        const queue = [[r, c]];
        grid[r][c] = '0';
        while (queue.length) {
          const [cr, cc] = queue.shift();
          for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
              grid[nr][nc] = '0';
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return count;
}
```

## Variations

- **Multi-source BFS:** Initialize queue with all sources at once — yields distance to nearest source (Rotting Oranges, 01 Matrix)
- **0-1 BFS (Dijkstra on unweighted edges):** Deque for edges with weight 0 (push front) or 1 (push back) — O(V + E) shortest path on graphs with 0-1 weights
- **BFS on implicit graph:** No explicit adjacency list — generate neighbors on the fly (Word Ladder, sliding puzzle)
- **Bidirectional BFS:** Run BFS from source and target simultaneously, alternating levels — cuts search space from b^d to 2*b^(d/2)
- **Topological sort (Kahn's):** Track in-degrees, enqueue nodes with in-degree 0, decrement on removal — produces valid ordering for DAGs

## Edge cases

- **Disconnected graph:** BFS from one source won't reach all nodes — either loop over all nodes or explicitly handle unreachable targets (return -1).
- **Empty graph:** No nodes — return 0 or `[]` depending on problem. Guard `!grid.length` or `!graph.size`.
- **Single node:** No neighbors to process — BFS immediately returns or just processes the start node.
- **Cycles:** Without visited tracking, BFS loops infinitely. Mark visited **at enqueue time**, not dequeue, to prevent duplicates in queue.
- **Grid boundaries:** Always check row/col bounds before accessing neighbor cells. Off-by-one errors are common — index from 0 to rows-1 / cols-1.
- **Large graphs:** Using `queue.shift()` in JS is O(n) per operation — use a proper queue implementation (linked list, index pointer) for performance with >10^4 nodes.

## Practice problems

- [Number of Islands](https://leetcode.com/problems/number-of-islands/) — BFS from each unvisited land cell to count components
- [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) — Multi-source BFS with time elapsed per level
- [Word Ladder](https://leetcode.com/problems/word-ladder/) — BFS over word transformations with one-letter edits
- [01 Matrix](https://leetcode.com/problems/01-matrix/) — Multi-source BFS from all zero cells to compute distances
- [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) — BFS on 8-directional grid with obstacle avoidance
- [Bus Routes](https://leetcode.com/problems/bus-routes/) — BFS on route-graph with multi-source start, stop-level tracking
