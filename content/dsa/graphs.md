# Graphs (DFS/BFS)

Mark visited. DFS walks a component. BFS walks by distance (unweighted shortest path). Grid = graph with 4 neighbors.

```js
// Graph DFS skeleton (grid)
function dfs(r, c) {
  if (outOfBounds || seen) return;
  seen.add(key);
  for (const [nr, nc] of neighbors(r, c)) dfs(nr, nc);
}

// Graph BFS skeleton
const queue = [start], visited = new Set([start]);
while (queue.length) {
  const node = queue.shift();
  for (const nxt of graph[node]) {
    if (visited.has(nxt)) continue;
    visited.add(nxt);
    queue.push(nxt);
  }
}
```

## DFS — Number of Islands

Each unvisited land starts one DFS — [Number of Islands](https://leetcode.com/problems/number-of-islands/).

```js
// Graph DFS — flood fill a component
// LC: https://leetcode.com/problems/number-of-islands/
function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (grid[r][c] !== "1") return;
    grid[r][c] = "0"; // mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}
```

## BFS — Rotting Oranges

Multi-source BFS, minutes = levels — [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/).

```js
// Graph BFS — multi-source, one level = 1 minute
// LC: https://leetcode.com/problems/rotting-oranges/
function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]); // all rotters start together
      if (grid[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length && fresh) {
    const n = queue.length; // one minute
    for (let i = 0; i < n; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        if (grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc]);
      }
    }
    minutes++;
  }
  return fresh ? -1 : minutes;
}
```

## Topo — Course Schedule

Kahn BFS on in-degree — [Course Schedule](https://leetcode.com/problems/course-schedule/).

```js
// Graph BFS — Kahn topological sort
// LC: https://leetcode.com/problems/course-schedule/
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a);
    indeg[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let taken = 0;
  while (queue.length) {
    const u = queue.shift();
    taken++;
    for (const v of graph[u]) {
      indeg[v]--;
      if (indeg[v] === 0) queue.push(v);
    }
  }
  return taken === numCourses; // cycle if someone never reached 0
}
```

**More:** [Clone Graph](https://leetcode.com/problems/clone-graph/), [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/), [Word Ladder](https://leetcode.com/problems/word-ladder/), [01 Matrix](https://leetcode.com/problems/01-matrix/).
