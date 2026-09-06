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

## Topological Sort — Kahn vs DFS

DAG me order nikalna jahan `u -> v` matlab `u` pehle. Kahn: indegree 0 ko queue me daalo, nikal ke neighbors ka indegree ghatao. DFS: visit ke baad stack me push, reverse karo. Cycle hai to order nahi — Kahn me `taken != n`, DFS me back-edge.

**Topo se hi hota:** Course Schedule, Course Schedule II (order return), Alien Dictionary, Build order.

[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/course-schedule-ii/
// Kahn — indegree queue se order
function findOrder(numCourses, prerequisites) {
  // Hinglish: graph + indegree banao
  const g = Array.from({length:numCourses}, ()=>[]);
  const indeg = Array(numCourses).fill(0);
  for (const [a,b] of prerequisites) { g[b].push(a); indeg[a]++; } // Hinglish: b -> a
  const q = []; for(let i=0;i<numCourses;i++) if(indeg[i]===0) q.push(i); // Hinglish: zero wale start
  const order = [];
  while(q.length){
    const u = q.shift();
    order.push(u); // Hinglish: order me daalo
    for(const v of g[u]){ indeg[v]--; if(indeg[v]===0) q.push(v); } // Hinglish: neighbor unlock
  }
  return order.length===numCourses ? order : []; // Hinglish: cycle to []
}

// DFS topo — recursion + stack
function topoDFS(n, edges){
  // Hinglish: 0=unvisited, 1=visiting, 2=done (cycle detect)
  const g = Array.from({length:n}, ()=>[]);
  for(const [u,v] of edges) g[u].push(v);
  const state = Array(n).fill(0), stack=[];
  let hasCycle=false;
  const dfs = (u)=>{
    state[u]=1; // Hinglish: visiting
    for(const v of g[u]){
      if(state[v]===1) { hasCycle=true; return; } // Hinglish: back edge = cycle
      if(state[v]===0) dfs(v);
    }
    state[u]=2; stack.push(u); // Hinglish: done to stack
  };
  for(let i=0;i<n;i++) if(state[i]===0) dfs(i);
  return hasCycle ? [] : stack.reverse(); // Hinglish: reverse = topo
}
```

## Dijkstra — Shortest Path with Heap (Non-negative weights)

Har baar sabse chhota `dist` wala node pick karo (min-heap), uske edges relax karo: `dist[v] = min(dist[v], dist[u]+w)`. Negative weight nahi chalega.

[Network Delay Time — Heap Version](https://leetcode.com/problems/network-delay-time/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/network-delay-time/ (heap wala fast)
// Dijkstra with heap — O((V+E) log V)
function networkDelayTimeHeap(times, n, k){
  // Hinglish: graph banao
  const g = Array.from({length:n+1}, ()=>[]);
  for(const [u,v,w] of times) g[u].push([v,w]);
  const dist = Array(n+1).fill(Infinity);
  dist[k]=0;
  // Hinglish: min-heap [dist, node]
  const heap = [[0,k]];
  const heapPush = (h, x)=>{ h.push(x); let i=h.length-1; while(i>0){ const p=(i-1)>>1; if(h[p][0]<=h[i][0]) break; [h[p],h[i]]=[h[i],h[p]]; i=p; } };
  const heapPop = (h)=>{ const top=h[0], last=h.pop(); if(h.length){ h[0]=last; let i=0; while(true){ let s=i,l=2*i+1,r=l+1; if(l<h.length && h[l][0]<h[s][0]) s=l; if(r<h.length && h[r][0]<h[s][0]) s=r; if(s===i) break; [h[i],h[s]]=[h[s],h[i]]; i=s; } } return top; };
  while(heap.length){
    const [d,u] = heapPop(heap);
    if(d!==dist[u]) continue; // Hinglish: purana entry skip
    for(const [v,w] of g[u]){
      if(dist[v] > d+w){ dist[v]=d+w; heapPush(heap, [dist[v], v]); } // Hinglish: relax
    }
  }
  let ans = 0;
  for(let i=1;i<=n;i++){ if(dist[i]===Infinity) return -1; ans=Math.max(ans, dist[i]); } // Hinglish: unreachable to -1
  return ans;
}
```

## Bellman-Ford — K Stops + Negative weights

Har round me saare edges relax karo. `K` stops = `K+1` edges, to `K+1` rounds. Negative cycle detect: `N`th round me bhi update hua to cycle.

[Cheapest Flights Within K Stops — Bellman-Ford samjho](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Bellman-Ford — K+1 rounds, same round me updated value use nahi karna
function findCheapestPriceBellman(n, flights, src, dst, k){
  // Hinglish: dist copy rakhna zaruri
  let dist = Array(n).fill(Infinity); dist[src]=0;
  for(let hop=0; hop<=k; hop++){
    const nxt = dist.slice(); // Hinglish: is round ka copy
    for(const [u,v,w] of flights){
      if(dist[u]===Infinity) continue;
      if(nxt[v] > dist[u]+w) nxt[v]=dist[u]+w; // Hinglish: relax
    }
    dist=nxt;
  }
  return dist[dst]===Infinity ? -1 : dist[dst];
}

// Negative cycle check (agar puche)
function hasNegativeCycle(n, edges){
  // Hinglish: n-1 rounds normal, nth me update = cycle
  const dist=Array(n).fill(0); // Hinglish: sab 0 se start (super source)
  for(let i=0;i<n;i++){
    let updated=false;
    for(const [u,v,w] of edges) if(dist[v] > dist[u]+w){ dist[v]=dist[u]+w; updated=true; if(i===n-1) return true; } // Hinglish: nth round update = cycle
    if(!updated) break;
  }
  return false;
}
```

## Floyd Warshall — All Pairs Shortest Path

Har `k` ko intermediate banao: `dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])`. `O(V^3)`, `V <= 400` tak theek. Transitively closure bhi same.

[Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
// Floyd — k beech me daalo
function findTheCity(n, edges, distanceThreshold){
  // Hinglish: dist matrix banao
  const dist = Array.from({length:n}, ()=>Array(n).fill(Infinity));
  for(let i=0;i<n;i++) dist[i][i]=0;
  for(const [u,v,w] of edges){ dist[u][v]=w; dist[v][u]=w; } // Hinglish: undirected
  for(let k=0;k<n;k++){
    for(let i=0;i<n;i++){
      for(let j=0;j<n;j++){
        if(dist[i][k]===Infinity || dist[k][j]===Infinity) continue;
        if(dist[i][j] > dist[i][k]+dist[k][j]) dist[i][j]=dist[i][k]+dist[k][j]; // Hinglish: k se hoke behtar?
      }
    }
  }
  let bestCity=-1, bestCnt=n;
  for(let i=0;i<n;i++){
    let cnt=0;
    for(let j=0;j<n;j++) if(dist[i][j]<=distanceThreshold) cnt++; // Hinglish: kitne reachable
    if(cnt<=bestCnt){ bestCnt=cnt; bestCity=i; } // Hinglish: chhota cnt, tie me bada index
  }
  return bestCity;
}
```

## Detect Cycle in Directed Graph + BFS 0-1 / Multi-source

DAG cycle = topo fail ya DFS back-edge. BFS 0-1 ke liye deque, multi-source BFS jaise Rotting Oranges me sab sources ek saath queue me.

[Course Schedule — Detect Cycle (DFS)](https://leetcode.com/problems/course-schedule/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Detect cycle DFS — 3 colors
function canFinishDFS(numCourses, prerequisites){
  // Hinglish: 0=white, 1=grey, 2=black
  const g=Array.from({length:numCourses}, ()=>[]);
  for(const [a,b] of prerequisites) g[b].push(a);
  const color=Array(numCourses).fill(0);
  let hasCycle=false;
  const dfs=(u)=>{
    color[u]=1; // Hinglish: visiting
    for(const v of g[u]){
      if(color[v]===1) hasCycle=true; // Hinglish: back edge
      else if(color[v]===0) dfs(v);
    }
    color[u]=2; // Hinglish: done
  };
  for(let i=0;i<numCourses;i++) if(color[i]===0) dfs(i);
  return !hasCycle;
}
```

