# Graphs

**Definition:** Graph nodes (vertices) + edges (neighbors) ka jod hai. Representation adjacency list, matrix, ya implicit grid (har cell ke 4 neighbors). Traversal DFS (stack/recursion — gehra jao, components paint karna) aur BFS (queue — sabse kam steps wala shortest path). `visited` mark karna zaroori warna loop.

**When to use:** "Pahuch sakte hain kya?", "kitne islands/components?", "steps me shortest path" (BFS), ya "courses ka order" (in-degree queue se topological sort). Grid bhi graph hai — har cell 4 taraf connected.

**How it works:** `graph[node] = [neighbors]` banao. DFS unvisited neighbor par recurse; BFS `[start]` se level by level; Kahn me in-degree 0 wale queue me. Time `O(V+E)`, space `O(V)`.

```js
// Graph skeleton — DFS (paint / components)
// Hinglish: dekha to mark karo, fir neighbors pe jao
const seen = new Set();
function dfs(u) {
  if (seen.has(u)) return;
  seen.add(u); // visit mark
  for (const v of graph[u]) dfs(v);
}

// Graph skeleton — BFS (shortest steps, unweighted)
// Hinglish: level by level, pehle queue ka size lo
const queue = [start], visited = new Set([start]);
let steps = 0;
while (queue.length) {
  const n = queue.length; // ek level
  for (let i = 0; i < n; i++) {
    const node = queue.shift();
    for (const nxt of graph[node]) if (!visited.has(nxt)) { visited.add(nxt); queue.push(nxt); }
  }
  steps++;
}

// Topological skeleton (Kahn)
// Hinglish: jiska indegree 0, queue me daalo
const q = nodes.filter(n => indeg[n] === 0);
while (q.length) { const u = q.shift(); for (const v of graph[u]) if (--indeg[v] === 0) q.push(v); }
```
## Number of Islands

Each unvisited `"1"` is a new island. DFS (or BFS) paints the whole blob to `"0"`.

[Number of Islands](https://leetcode.com/problems/number-of-islands/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph DFS — flood fill
// LC: https://leetcode.com/problems/number-of-islands/
function numIslands(grid) {
  // Hinglish: step 1 — base case check karo
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        n++;
        dfs(r, c);
      }
    }
  }
  return n;
}
```

## Clone Graph

Map old node → new node. DFS: if I already cloned it, return that. Else create, then clone neighbors.

[Clone Graph](https://leetcode.com/problems/clone-graph/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph DFS — clone with a map
// LC: https://leetcode.com/problems/clone-graph/
function cloneGraph(node) {
  // Hinglish: step 1 — base case check karo
  if (!node) return null;
  const map = new Map();
  const walk = (n) => {
    if (map.has(n)) return map.get(n);
    const copy = { val: n.val, neighbors: [] };
    map.set(n, copy);
    for (const nei of n.neighbors) copy.neighbors.push(walk(nei));
    return copy;
  };
  return walk(node);
}
```

## Course Schedule

Edge `b → a` means b before a. Count in-degree. Queue everyone at 0. Each taken course unlocks neighbors. If I took all, no cycle.

[Course Schedule](https://leetcode.com/problems/course-schedule/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph BFS — Kahn topo
// LC: https://leetcode.com/problems/course-schedule/
function canFinish(numCourses, prerequisites) {
  // Hinglish: step 1 — base case check karo
  const graph = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  let taken = 0;
  while (q.length) {
    const u = q.shift();
    taken++;
    for (const v of graph[u]) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return taken === numCourses;
}
```

## Rotting Oranges

All rotten oranges start in the queue together. Each level of BFS is one minute. If a fresh orange never rots, `-1`.

[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph BFS — multi-source
// LC: https://leetcode.com/problems/rotting-oranges/
function orangesRotting(grid) {
  // Hinglish: step 1 — base case check karo
  const rows = grid.length, cols = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length && fresh) {
    const n = q.length;
    for (let i = 0; i < n; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        q.push([nr, nc]);
      }
    }
    minutes++;
  }
  return fresh ? -1 : minutes;
}
```

## Word Ladder

Each word is a node. Neighbors = same length, one letter off. BFS from beginWord. First time I hit endWord, that distance is the answer. (Build a map of `*ot` patterns so I do not compare every pair.)

[Word Ladder](https://leetcode.com/problems/word-ladder/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph BFS — one letter at a time
// LC: https://leetcode.com/problems/word-ladder/
function ladderLength(beginWord, endWord, wordList) {
  const set = new Set(wordList);
  if (!set.has(endWord)) return 0;
  const q = [[beginWord, 1]];
  const seen = new Set([beginWord]);
  while (q.length) {
    const [word, d] = q.shift();
    if (word === endWord) return d;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (!set.has(next) || seen.has(next)) continue;
        seen.add(next); // Hinglish: visit mark
        q.push([next, d + 1]);
      }
    }
  }
  return 0;
}
```

## Pacific Atlantic Water Flow

Water flows down or flat. I BFS/DFS uphill from the Pacific edge and from the Atlantic edge. Cells in both sets are the answer.

[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph DFS — from oceans inland
// LC: https://leetcode.com/problems/pacific-atlantic-water-flow/
function pacificAtlantic(heights) {
  // Hinglish: step 1 — base case check karo
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => Array(cols).fill(false));
  const dfs = (r, c, seen, prev) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c]) return;
    if (heights[r][c] < prev) return;
    seen[r][c] = true;
    dfs(r + 1, c, seen, heights[r][c]);
    dfs(r - 1, c, seen, heights[r][c]);
    dfs(r, c + 1, seen, heights[r][c]);
    dfs(r, c - 1, seen, heights[r][c]);
  };
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, 0);
    dfs(r, cols - 1, atl, 0);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, 0);
    dfs(rows - 1, c, atl, 0);
  }
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pac[r][c] && atl[r][c]) out.push([r, c]);
    }
  }
  return out;
}
```

## Network Delay Time

Dijkstra: always pick the unvisited node with smallest time. Relax its edges. Answer is the max time among nodes I reached, or -1 if someone is unreachable.

[Network Delay Time](https://leetcode.com/problems/network-delay-time/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph — Dijkstra (scan min, n is small)
// LC: https://leetcode.com/problems/network-delay-time/
function networkDelayTime(times, n, k) {
  // Hinglish: step 1 — base case check karo
  const g = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) g[u].push([v, w]);
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const used = Array(n + 1).fill(false);
  for (let step = 0; step < n; step++) {
    let u = -1;
    for (let i = 1; i <= n; i++) {
      if (!used[i] && (u < 0 || dist[i] < dist[u])) u = i;
    }
    if (u < 0 || dist[u] === Infinity) break;
    used[u] = true;
    for (const [v, w] of g[u]) dist[v] = Math.min(dist[v], dist[u] + w);
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    ans = Math.max(ans, dist[i]);
  }
  return ans;
}
```

## Cheapest Flights Within K Stops

At most K stops = at most K+1 edges. Bellman-Ford: copy dist, relax every flight, K+1 rounds. Do not reuse the same array in one round (that would be unlimited hops).

[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph — Bellman-Ford K+1 rounds
// LC: https://leetcode.com/problems/cheapest-flights-within-k-stops/
function findCheapestPrice(n, flights, src, dst, k) {
  // Hinglish: step 1 — base case check karo
  let dist = Array(n).fill(Infinity);
  dist[src] = 0;
  for (let hop = 0; hop <= k; hop++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] === Infinity) continue;
      next[v] = Math.min(next[v], dist[u] + w);
    }
    dist = next;
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}
```
