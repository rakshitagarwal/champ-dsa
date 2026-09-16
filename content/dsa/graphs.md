# Graphs

**Definition:** Graph nodes (vertices) + edges (neighbors) ka jod hai. Representation adjacency list, matrix, ya implicit grid (har cell ke 4 neighbors). Traversal DFS (stack/recursion — gehra jao, components paint karna) aur BFS (queue — sabse kam steps wala shortest path). `visited` mark karna zaroori warna loop.

**When to use:** "Pahuch sakte hain kya?", "kitne islands/components?", "steps me shortest path" (BFS), ya multi-source spread (Rotting Oranges). Grid bhi graph hai — har cell 4 taraf connected.

**How it works:** `graph[node] = [neighbors]` banao. DFS unvisited neighbor par recurse; BFS `[start]` se level by level. Multi-source me saare sources ek saath queue me daalo. Time `O(V+E)`, space `O(V)`.

```js
// Graph skeleton — DFS (paint / components)
// DFS: mark visited, recurse on neighbors
const seen = new Set();
function dfs(u) {
  if (seen.has(u)) return;
  seen.add(u); // visit mark
  for (const v of graph[u]) dfs(v);
}

// Graph skeleton — BFS (shortest steps, unweighted)
// BFS: process entire level before advancing
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
// Each DFS from land sinks the whole connected component
// LC: https://leetcode.com/problems/number-of-islands/
function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0"; // mark visited by turning land to water
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        n++; // new island component
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
// Map original node -> clone before recursing into neighbors
// LC: https://leetcode.com/problems/clone-graph/
function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  const walk = (n) => {
    if (map.has(n)) return map.get(n); // already cloned subgraph
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
// O cells touching border cannot be captured; mark them safe first
// LC: https://leetcode.com/problems/surrounded-regions/
function solve(board) {
  const R=board.length, C=board[0].length;
  const dfs=(r,c)=>{
    if(r<0||c<0||r>=R||c>=C||board[r][c]!=='O') return;
    board[r][c]='S'; // temporary safe tag
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  for(let r=0;r<R;r++){ dfs(r,0); dfs(r,C-1); } // flood from left/right border
  for(let c=0;c<C;c++){ dfs(0,c); dfs(R-1,c); } // flood from top/bottom border
  for(let r=0;r<R;r++) for(let c=0;c<C;c++){
    if(board[r][c]==='O') board[r][c]='X'; // interior O becomes X
    else if(board[r][c]==='S') board[r][c]='O'; // restore border-connected O
  }
}
```

## Pacific Atlantic Water Flow

Water flows down or flat. I BFS/DFS uphill from the Pacific edge and from the Atlantic edge. Cells in both sets are the answer.

[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)

```js
// DFS uphill from each ocean; cell must reach both Pacific and Atlantic
// LC: https://leetcode.com/problems/pacific-atlantic-water-flow/
function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => Array(cols).fill(false));
  const dfs = (r, c, seen, prev) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c]) return;
    if (heights[r][c] < prev) return; // water flows from higher to lower
    seen[r][c] = true;
    dfs(r + 1, c, seen, heights[r][c]);
    dfs(r - 1, c, seen, heights[r][c]);
    dfs(r, c + 1, seen, heights[r][c]);
    dfs(r, c - 1, seen, heights[r][c]);
  };
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, 0); // Pacific left edge
    dfs(r, cols - 1, atl, 0); // Atlantic right edge
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, 0); // Pacific top edge
    dfs(rows - 1, c, atl, 0); // Atlantic bottom edge
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
// LC: https://leetcode.com/problems/number-of-provinces/
function findCircleNumUF(isConnected) {
  const n=isConnected.length, p=Array.from({length:n},(_,i)=>i), rank=Array(n).fill(0);
  const find=(x)=>{ while(p[x]!==x){ p[x]=p[p[x]]; x=p[x]; } return x; };
  const union=(a,b)=>{
    a=find(a); b=find(b); if(a===b) return;
    if(rank[a]<rank[b]) [a,b]=[b,a];
    p[b]=a; if(rank[a]===rank[b]) rank[a]++;
  };
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(isConnected[i][j]) union(i,j);
  const roots=new Set(); for(let i=0;i<n;i++) roots.add(find(i));
  return roots.size;
}
```

## Rotting Oranges (Multi-Source BFS)

All rotten oranges start in the queue together. Each level of BFS is one minute. If a fresh orange never rots, `-1`.

[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)

```js
// Multi-source BFS: all rotten oranges spread one layer per minute
// LC: https://leetcode.com/problems/rotting-oranges/
function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) q.push([r, c]); // initial rotten cells
      if (grid[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length && fresh) {
    const n = q.length; // process one BFS level
    for (let i = 0; i < n; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2; // fresh becomes rotten
        fresh--;
        q.push([nr, nc]);
      }
    }
    minutes++;
  }
  return fresh ? -1 : minutes; // unreachable fresh means impossible
}
```

## Word Ladder (BFS Shortest Steps)

Each word is a node. Neighbors = same length, one letter off. BFS from beginWord. First time I hit endWord, that distance is the answer. (Build a map of `*ot` patterns so I do not compare every pair.)

[Word Ladder](https://leetcode.com/problems/word-ladder/)

```js
// BFS on implicit graph: edges = one-letter mutations in wordList
// LC: https://leetcode.com/problems/word-ladder/
function ladderLength(beginWord, endWord, wordList) {
  const set = new Set(wordList);
  if (!set.has(endWord)) return 0; // target not reachable in dictionary
  const q = [[beginWord, 1]];
  const seen = new Set([beginWord]);
  while (q.length) {
    const [word, d] = q.shift();
    if (word === endWord) return d; // shortest path in unweighted graph
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (!set.has(next) || seen.has(next)) continue;
        seen.add(next);
        q.push([next, d + 1]);
      }
    }
  }
  return 0;
}
```
