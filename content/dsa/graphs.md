# Graphs

**Definition:** Graph nodes (vertices) + edges (neighbors) ka jod hai. Representation adjacency list, matrix, ya implicit grid (har cell ke 4 neighbors). Traversal DFS (stack/recursion — gehra jao, components paint karna) aur BFS (queue — sabse kam steps wala shortest path). `visited` mark karna zaroori warna loop.

**When to use:** "Pahuch sakte hain kya?", "kitne islands/components?", "steps me shortest path" (BFS), ya multi-source spread (Rotting Oranges). Grid bhi graph hai — har cell 4 taraf connected.

**How it works:** `graph[node] = [neighbors]` banao. DFS unvisited neighbor par recurse; BFS `[start]` se level by level. Multi-source me saare sources ek saath queue me daalo. Time `O(V+E)`, space `O(V)`.

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

## Surrounded Regions

Border se connected `O` safe hai. Baaki `O` ko `X` banao. DFS border se.

[Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/surrounded-regions/
function solve(board) {
  // Hinglish: border O ko mark karo
  const R=board.length, C=board[0].length;
  const dfs=(r,c)=>{
    if(r<0||c<0||r>=R||c>=C||board[r][c]!=='O') return;
    board[r][c]='S'; // Hinglish: safe mark
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  for(let r=0;r<R;r++){ dfs(r,0); dfs(r,C-1); }
  for(let c=0;c<C;c++){ dfs(0,c); dfs(R-1,c); }
  for(let r=0;r<R;r++) for(let c=0;c<C;c++){
    if(board[r][c]==='O') board[r][c]='X'; // Hinglish: surrounded to X
    else if(board[r][c]==='S') board[r][c]='O'; // Hinglish: safe wapas O
  }
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

## Number of Provinces

Adjacency matrix → graph. Kitne connected components? DFS/Union-Find.

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-provinces/
function findCircleNum(isConnected) {
  // Hinglish: visited + DFS
  const n=isConnected.length, seen=Array(n).fill(false);
  let provinces=0;
  const dfs=(u)=>{
    seen[u]=true;
    for(let v=0; v<n; v++) if(isConnected[u][v] && !seen[v]) dfs(v); // Hinglish: juda hai to jao
  };
  for(let i=0;i<n;i++) if(!seen[i]){ dfs(i); provinces++; } // Hinglish: naya component
  return provinces;
}
```

## Rotting Oranges (Multi-Source BFS)

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

## Word Ladder (BFS Shortest Steps)

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
