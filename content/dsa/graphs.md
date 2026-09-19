# Graphs

**Definition:** Graph **nodes (vertices) + edges (neighbors)** ka jod hai. Representation: adjacency list, matrix, ya implicit grid (har cell ke 4 neighbors). Do core traversals: **DFS** (gehra jao — components, paths, cycles) aur **BFS** (level by level — unweighted shortest steps). `visited` bina loop.

**When to use:** "Pahuch sakte hain?", "kitne islands/components?", "kitne steps shortest?" (BFS), multi-source spread (Rotting Oranges), course order (→ Topological Sort page). Grid bhi graph hai.

**How it works:** `graph[node] = [neighbors]` banao. DFS unvisited pe recurse/stack; BFS queue se level-by-level. Multi-source: saare sources ek saath queue me. Time `O(V+E)`, space `O(V)`.

## Study notes — BFS vs DFS (must know)

| | **BFS** | **DFS** |
| --- | --- | --- |
| Structure | Queue | Recursion / explicit stack |
| Order | Level by level | Go deep, backtrack |
| Best for | Unweighted **shortest path** (steps), multi-source | Components, path exist, cycle detect, topo DFS, grid flood |
| Space | Queue can be wide (`O(V)`) | Stack depth (`O(V)` worst) |
| Grid tip | Same 4-dir neighbors | Same; mark visited/`0` |

**BFS jab:** "minimum steps / distance" without weights.  
**DFS jab:** "explore whole blob", "any path", "connected components", recursion natural.  
**Weighted shortest:** BFS mat — Dijkstra (Shortest Path page).

### Build adj list (undirected)
```js
const g = Array.from({ length: n }, () => []);
for (const [u, v] of edges) {
  g[u].push(v);
  g[v].push(u);
}
```

### Cycle detection (undirected): parent skip. Directed: 3-color / recursion stack.

### Traps
- Forget visited.
- Directed vs undirected edges.
- BFS me `steps++` level ke baahar vs andar confuse.
- Grid bounds `r<0 || c<0 || r>=m || c>=n`.

```js
// Graph skeleton — DFS (paint / components)
const seen = new Set();
function dfs(u) {
  if (seen.has(u)) return;
  seen.add(u);
  for (const v of graph[u]) dfs(v);
}

// Graph skeleton — BFS (shortest steps, unweighted)
const queue = [start], visited = new Set([start]);
let steps = 0;
while (queue.length) {
  const n = queue.length; // one level
  for (let i = 0; i < n; i++) {
    const node = queue.shift();
    for (const nxt of graph[node]) {
      if (!visited.has(nxt)) {
        visited.add(nxt);
        queue.push(nxt);
      }
    }
  }
  steps++;
}
```
## Number of Islands

Each unvisited `"1"` is a new island. DFS (or BFS) paints the whole blob to `"0"`.

[Number of Islands](https://leetcode.com/problems/number-of-islands/)

```js
// Time: O(m·n) · Space: O(m·n)
// flood-fill each unvisited land
// Graph DFS — flood fill
var numIslands = function(grid) {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1") {
        count = count + dfs(grid, i, j);
      }
    }
  }

  function dfs(grid, row, col) {
    // base cases
    if (
      row < 0 ||
      row > grid.length - 1 ||
      col < 0 ||
      col > grid[row].length - 1 ||
      grid[row][col] === "0"
    ) {
      return;
    }

    grid[row][col] = "0";

    dfs(grid, row + 1, col);
    dfs(grid, row - 1, col);
    dfs(grid, row, col + 1);
    dfs(grid, row, col - 1);

    return 1;
  }

  return count;
};
```

## Clone Graph

Map old node → new node. DFS: if I already cloned it, return that. Else create, then clone neighbors.

[Clone Graph](https://leetcode.com/problems/clone-graph/)

```js
// Time: O(n+e) · Space: O(n)
// BFS/DFS + map old node → clone
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    let visited = {};
    
    function dfs(node){
        //base cases
        if(!node) return node;
        if(!!visited[node.val]) return visited[node.val];
        
        let root = new Node(node.val);
        visited[node.val] = root;
        
        //recurrence relation
        for(let neighbor of node.neighbors){
            root.neighbors.push(dfs(neighbor))
        }
        
        return root;
    }
    
    return dfs(node);
};
```

## Surrounded Regions

Border se connected `O` safe hai. Baaki `O` ko `X` banao. DFS border se.

[Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)

```js
// Time: O(n) · Space: O(n)
// O cells touching border cannot be captured; mark them safe first
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
// Time: O(m·n) · Space: O(m·n)
// Graph DFS — from oceans inland
var pacificAtlantic = function(heights) {
  let m = heights.length;
  let n = heights[0].length;

  let pacificQueue = [];
  let atlanticQueue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        pacificQueue.push([i, j]);
      }
      if (i === m - 1 || j === n - 1) {
        atlanticQueue.push([i, j]);
      }
    }
  }

  function bfs(queue) {
    const isValid = (x, y) => x >= 0 && y >= 0 && x < m && y < n;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const visited = Array.from(Array(m), () => new Array(n).fill(false));

    while (queue.length) {
      const [x, y] = queue.shift();
      visited[x][y] = true;

      for (let dir of directions) {
        let nextX = x + dir[0];
        let nextY = y + dir[1];
        if (!isValid(nextX, nextY) || visited[nextX][nextY]) continue;
        if (heights[nextX][nextY] >= heights[x][y]) {
          queue.push([nextX, nextY]);
        }
      }
    }

    return visited;
  }

  const pacific = bfs(pacificQueue);
  const atlantic = bfs(atlanticQueue);

  const result = [];

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (pacific[x][y] && atlantic[x][y]) {
        result.push([x, y]);
      }
    }
  }

  return result;
};
```

## Number of Provinces

Adjacency matrix → graph. Kitne connected components? DFS/Union-Find.

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

```js
// Time: O(n²) · Space: O(n)
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    
    let adj = {};
    
    for(let i = 0; i < isConnected.length; i++){
        for(let j = 0; j < isConnected[0].length; j++){
            
            let val = isConnected[i][j];
            
            if(val === 1){
                if(!adj[i]){
                    adj[i] = [j];
                } else {
                    adj[i].push(j);
                }
            }
            
        }
    }
    
    let visited = new Set();
    let count = 0;
    
    for(let key in adj){
        let keyNum = parseInt(key);
        count += dfs(keyNum);
    }
    
    function dfs(currNode){
        if(visited.has(currNode)) return 0;
        visited.add(currNode);
        
        let neighbours = adj[currNode];
        
        for(let n of neighbours){
            dfs(n);
        }
        
        return 1;
    }
    
    return count;
    
};
```

## Rotting Oranges (Multi-Source BFS)

All rotten oranges start in the queue together. Each level of BFS is one minute. If a fresh orange never rots, `-1`.

[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)

```js
// Time: O(n) · Space: O(n)
// Multi-source BFS: all rotten oranges spread one layer per minute
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
// Time: O(n·L²) · Space: O(n·L)
// Graph BFS — one letter at a time
var ladderLength = function(beginWord, endWord, wordList) {
  let set = new Set(wordList);
  let queue = [[beginWord, 1]];

  while (queue.length) {
    let [currWord, count] = queue.shift();

    if (currWord === endWord) {
      return count;
    }

    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < currWord.length; j++) {
        let letter = String.fromCharCode(97 + i);
        let newWord = currWord.slice(0, j) + letter + currWord.slice(j + 1);

        if (set.has(newWord)) {
          queue.push([newWord, count + 1]);
          set.delete(newWord);
        }
      }
    }
  }

  return 0;
};
```
