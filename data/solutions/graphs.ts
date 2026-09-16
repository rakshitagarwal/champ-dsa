import type { SolutionGroup } from "./types";

export const GRAPHS_SOLUTIONS: SolutionGroup = {
  id: "graphs",
  title: "Graphs",
  subs: [
    {
      title: "Traversal / Grid",
      topics: [
    {
      id: 200,
      lcSlug: "number-of-islands",
      title: "Number of Islands",
      diff: "Medium",
      body: `Each unvisited \`"1"\` is a new island. DFS (or BFS) paints the whole blob to \`"0"\`.

[Number of Islands](https://leetcode.com/problems/number-of-islands/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 695,
      lcSlug: "max-area-of-island",
      title: "Max Area of Island",
      diff: "Medium",
      body: `DFS each island and count area — track the maximum area seen.

[Max Area of Island](https://leetcode.com/problems/max-area-of-island/)

\`\`\`js
// DFS returns size of current island; track global max
// LC: https://leetcode.com/problems/max-area-of-island/
function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return 0;
    grid[r][c] = 0; // sink cell so it is not counted twice
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let best = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        const a = dfs(r, c);
        if (a > best) best = a;
      }
    }
  }
  return best;
}
\`\`\``,
    },
    {
      id: 733,
      lcSlug: "flood-fill",
      title: "Flood Fill",
      diff: "Easy",
      body: `Pick new color, DFS flood-fill matching neighbors — restore original color when done if needed.

[Flood Fill](https://leetcode.com/problems/flood-fill/)

\`\`\`js
// Recolor connected component matching old color at (sr, sc)
// LC: https://leetcode.com/problems/flood-fill/
function floodFill(image, sr, sc, color) {
  const old = image[sr][sc];
  if (old === color) return image; // nothing to change
  const rows = image.length, cols = image[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r][c] !== old) return;
    image[r][c] = color;
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  dfs(sr, sc);
  return image;
}
\`\`\``,
    },
    {
      id: 130,
      lcSlug: "surrounded-regions",
      title: "Surrounded Regions",
      diff: "Medium",
      body: `Os connected to the border stay — DFS mark those, then flip all other Os to X.

[Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 994,
      lcSlug: "rotting-oranges",
      title: "Rotting Oranges",
      diff: "Medium",
      body: `All rotten oranges start in the queue together. Each level of BFS is one minute. If a fresh orange never rots, \`-1\`.

[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 417,
      lcSlug: "pacific-atlantic-water-flow",
      title: "Pacific Atlantic Water Flow",
      diff: "Medium",
      body: `Water flows down or flat. I BFS/DFS uphill from the Pacific edge and from the Atlantic edge. Cells in both sets are the answer.

[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 542,
      lcSlug: "01-matrix",
      title: "01 Matrix",
      diff: "Medium",
      body: `Multi-source BFS from all 0s — first visit to each 1 gives its nearest 0 distance.

[01 Matrix](https://leetcode.com/problems/01-matrix/)

\`\`\`js
// Multi-source BFS from all zeros; -1 marks unvisited 1-cells
// LC: https://leetcode.com/problems/01-matrix/
function updateMatrix(mat) {
  const rows = mat.length, cols = mat[0].length;
  const q = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) q.push([r, c]);
      else mat[r][c] = -1; // distance unknown until BFS reaches
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || mat[nr][nc] !== -1) continue;
      mat[nr][nc] = mat[r][c] + 1; // one step farther from nearest zero
      q.push([nr, nc]);
    }
  }
  return mat;
}
\`\`\``,
    },
    {
      id: 1091,
      lcSlug: "shortest-path-in-binary-matrix",
      title: "Shortest Path in Binary Matrix",
      diff: "Medium",
      body: `BFS in 8 directions with step count — return steps when the destination cell is first dequeued.

[Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

\`\`\`js
// 8-direction BFS; path length includes both endpoints
// LC: https://leetcode.com/problems/shortest-path-in-binary-matrix/
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const q = [[0, 0, 1]];
  grid[0][0] = 1; // block revisiting start
  while (q.length) {
    const [r, c, d] = q.shift();
    if (r === n - 1 && c === n - 1) return d;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] !== 0) continue;
      grid[nr][nc] = 1;
      q.push([nr, nc, d + 1]);
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 934,
      lcSlug: "shortest-bridge",
      title: "Shortest Bridge",
      diff: "Medium",
      body: `DFS mark first island, BFS from it — return distance when the second island is reached.

[Shortest Bridge](https://leetcode.com/problems/shortest-bridge/)

\`\`\`js
// DFS labels island 1 as 2; BFS from its border finds second island
// LC: https://leetcode.com/problems/shortest-bridge/
function shortestBridge(grid) {
  const n = grid.length;
  const q = [];
  let found = false;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= n || grid[r][c] !== 1) return;
    grid[r][c] = 2; // mark first island
    q.push([r, c, 0]); // multi-source BFS frontier
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  for (let r = 0; r < n && !found; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) { dfs(r, c); found = true; break; }
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [r, c, d] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] === 2) continue;
      if (grid[nr][nc] === 1) return d; // reached other island across water
      grid[nr][nc] = 2;
      q.push([nr, nc, d + 1]);
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 1020,
      lcSlug: "number-of-enclaves",
      title: "Number of Enclaves",
      diff: "Medium",
      body: `Land connected to border cannot be closed — DFS remove border-connected land, count remaining cells.

[Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/)

\`\`\`js
// Remove land connected to border; count remaining 1s (enclaves)
// LC: https://leetcode.com/problems/number-of-enclaves/
function numEnclaves(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return;
    grid[r][c] = 0; // flood border-attached land
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  for (let r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols - 1); }
  for (let c = 0; c < cols; c++) { dfs(0, c); dfs(rows - 1, c); }
  let ans = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (grid[r][c] === 1) ans++;
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
    {
      title: "BFS / DFS Graph",
      topics: [
    {
      id: 133,
      lcSlug: "clone-graph",
      title: "Clone Graph",
      diff: "Medium",
      body: `Map old node → new node. DFS: if I already cloned it, return that. Else create, then clone neighbors.

[Clone Graph](https://leetcode.com/problems/clone-graph/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 127,
      lcSlug: "word-ladder",
      title: "Word Ladder",
      diff: "Hard",
      body: `Each word is a node. Neighbors = same length, one letter off. BFS from beginWord. First time I hit endWord, that distance is the answer. (Build a map of \`*ot\` patterns so I do not compare every pair.)

[Word Ladder](https://leetcode.com/problems/word-ladder/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 752,
      lcSlug: "open-the-lock",
      title: "Open the Lock",
      diff: "Medium",
      body: `BFS from 0000 — rotate each wheel up/down, skip deadends, return depth when target is reached.

[Open the Lock](https://leetcode.com/problems/open-the-lock/)

\`\`\`js
// BFS from 0000; each edge rotates one wheel +1 or -1 mod 10
// LC: https://leetcode.com/problems/open-the-lock/
function openLock(deadends, target) {
  const dead = new Set(deadends);
  if (dead.has("0000")) return -1;
  const q = [["0000", 0]];
  const seen = new Set(["0000"]);
  while (q.length) {
    const [cur, d] = q.shift();
    if (cur === target) return d;
    for (let i = 0; i < 4; i++) {
      for (const move of [1, -1]) {
        const arr = [...cur];
        arr[i] = String((Number(arr[i]) + move + 10) % 10);
        const next = arr.join("");
        if (!dead.has(next) && !seen.has(next)) { seen.add(next); q.push([next, d + 1]); }
      }
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 815,
      lcSlug: "bus-routes",
      title: "Bus Routes",
      diff: "Hard",
      body: `BFS alternates walking to a bus stop and riding a route — mark visited buses so you never reuse the same route.

[Bus Routes](https://leetcode.com/problems/bus-routes/)

\`\`\`js
// BFS on stops; taking a bus costs 1, visit each bus route at most once
// LC: https://leetcode.com/problems/bus-routes/
function numBusesToDestination(routes, source, target) {
  if (source === target) return 0;
  const stopToBus = new Map();
  for (let b = 0; b < routes.length; b++) {
    for (const s of routes[b]) {
      if (!stopToBus.has(s)) stopToBus.set(s, []);
      stopToBus.get(s).push(b);
    }
  }
  const q = [[source, 0]]; // [stop, buses taken so far]
  const seenStop = new Set([source]), seenBus = new Set();
  while (q.length) {
    const [stop, buses] = q.shift();
    for (const b of stopToBus.get(stop) || []) {
      if (seenBus.has(b)) continue;
      seenBus.add(b);
      for (const s of routes[b]) {
        if (s === target) return buses + 1;
        if (!seenStop.has(s)) { seenStop.add(s); q.push([s, buses + 1]); }
      }
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 841,
      lcSlug: "keys-and-rooms",
      title: "Keys and Rooms",
      diff: "Medium",
      body: `DFS from room 0: each key opens new rooms; succeed if every room is visited.

[Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)

\`\`\`js
// DFS/stack from room 0; keys unlock more rooms
// LC: https://leetcode.com/problems/keys-and-rooms/
function canVisitAllRooms(rooms) {
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const r = stack.pop();
    for (const k of rooms[r]) {
      if (!seen.has(k)) { seen.add(k); stack.push(k); }
    }
  }
  return seen.size === rooms.length;
}
\`\`\``,
    },
    {
      id: 797,
      lcSlug: "all-paths-from-source-lead-to-destination",
      title: "All Paths From Source Lead to Destination",
      diff: "Medium",
    premium: true,
      body: `Every path must end at destination — DFS detect cycles/dead ends; memoize states for speed.

[All Paths From Source Lead to Destination](https://leetcode.com/problems/all-paths-from-source-lead-to-destination/)

*Premium — requires LeetCode Premium.*

\`\`\`js
// 3-color DFS: every path from source must end at destination, no cycles
// LC: https://leetcode.com/problems/all-paths-from-source-lead-to-destination/ (Premium)
function leadsToDestination(n, edges, source, destination) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) g[u].push(v);
  const state = Array(n).fill(0); // 0=unseen, 1=on stack, 2=memo safe
  const dfs = (u) => {
    if (state[u] === 1) return false; // cycle: not all paths lead to destination
    if (state[u] === 2) return true;
    if (g[u].length === 0) return u === destination; // leaf must be destination
    state[u] = 1;
    for (const v of g[u]) if (!dfs(v)) return false;
    state[u] = 2;
    return true;
  };
  return dfs(source);
}
\`\`\``,
    },
    {
      id: 332,
      lcSlug: "reconstruct-itinerary",
      title: "Reconstruct Itinerary",
      diff: "Hard",
      body: `Hierholzer DFS in lexical order — append edge when stuck, reverse postorder stack for itinerary.

[Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/)

\`\`\`js
// Hierholzer: postorder stack gives Eulerian path in lex order
// LC: https://leetcode.com/problems/reconstruct-itinerary/
function findItinerary(tickets) {
  const g = new Map();
  tickets.sort();
  for (const [u, v] of tickets) {
    if (!g.has(u)) g.set(u, []);
    g.get(u).push(v);
  }
  for (const v of g.values()) v.reverse(); // pop() then picks smallest neighbor
  const out = [];
  const dfs = (u) => {
    const dests = g.get(u) || [];
    while (dests.length) dfs(dests.pop());
    out.push(u); // append airport when no outgoing tickets left
  };
  dfs("JFK");
  return out.reverse();
}
\`\`\``,
    },
    {
      id: 399,
      lcSlug: "evaluate-division",
      title: "Evaluate Division",
      diff: "Medium",
      body: `Build weighted graph from equations — for each query multiply edge weights along a found path.

[Evaluate Division](https://leetcode.com/problems/evaluate-division/)

\`\`\`js
// Build bidirectional weighted graph; BFS each query multiplying ratios
// LC: https://leetcode.com/problems/evaluate-division/
function calcEquation(equations, values, queries) {
  const g = new Map();
  const add = (u, v, w) => {
    if (!g.has(u)) g.set(u, []);
    if (!g.has(v)) g.set(v, []);
    g.get(u).push([v, w]);
    g.get(v).push([u, 1 / w]); // reverse edge is reciprocal
  };
  for (let i = 0; i < equations.length; i++) add(equations[i][0], equations[i][1], values[i]);
  const out = [];
  for (const [s, t] of queries) {
    if (!g.has(s) || !g.has(t)) { out.push(-1); continue; }
    const seen = new Set([s]);
    const q = [[s, 1]]; // [node, product of weights from s]
    let ans = -1;
    while (q.length) {
      const [u, w] = q.shift();
      if (u === t) { ans = w; break; }
      for (const [v, x] of g.get(u)) {
        if (!seen.has(v)) { seen.add(v); q.push([v, w * x]); }
      }
    }
    out.push(ans);
  }
  return out;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Topological Sort",
      topics: [
    {
      id: 207,
      lcSlug: "course-schedule",
      title: "Course Schedule",
      diff: "Medium",
      body: `Edge \`b → a\` means b before a. Count in-degree. Queue everyone at 0. Each taken course unlocks neighbors. If I took all, no cycle.

[Course Schedule](https://leetcode.com/problems/course-schedule/)

\`\`\`js
// Kahn topo: cycle exists iff not all courses get indegree 0
// LC: https://leetcode.com/problems/course-schedule/
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a); // b must be taken before a
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
\`\`\``,
    },
    {
      id: 210,
      lcSlug: "course-schedule-ii",
      title: "Course Schedule II",
      diff: "Medium",
      body: `Return actual topological order — Kahn’s algorithm appends each dequeued node to the result list.

[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

\`\`\`js
// Kahn topological sort returns one valid order
// LC: https://leetcode.com/problems/course-schedule-ii/
function findOrder(numCourses, prerequisites) {
  const g = Array.from({length:numCourses}, ()=>[]);
  const indeg = Array(numCourses).fill(0);
  for (const [a,b] of prerequisites) { g[b].push(a); indeg[a]++; }
  const q = []; for(let i=0;i<numCourses;i++) if(indeg[i]===0) q.push(i);
  const order = [];
  while(q.length){
    const u = q.shift();
    order.push(u);
    for(const v of g[u]){ indeg[v]--; if(indeg[v]===0) q.push(v); }
  }
  return order.length===numCourses ? order : []; // empty if cycle
}
\`\`\``,
    },
    {
      id: 802,
      lcSlug: "find-eventual-safe-states",
      title: "Find Eventual Safe States",
      diff: "Medium",
      body: `Node is safe if all paths reach a terminal: three-color DFS to detect cycles and mark unsafe.

[Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/)

\`\`\`js
// Node safe if all DFS paths reach terminal; cycle nodes are unsafe
// LC: https://leetcode.com/problems/find-eventual-safe-states/
function eventualSafeNodes(graph) {
  const n = graph.length, color = Array(n).fill(0);
  const safe = (u) => {
    if (color[u] !== 0) return color[u] === 2;
    color[u] = 1; // gray: on recursion stack
    for (const v of graph[u]) {
      if (!safe(v)) return false;
    }
    color[u] = 2; // black: confirmed safe
    return true;
  };
  const out = [];
  for (let i = 0; i < n; i++) if (safe(i)) out.push(i);
  return out;
}
\`\`\``,
    },
    {
      id: 310,
      lcSlug: "minimum-height-trees",
      title: "Minimum Height Trees",
      diff: "Medium",
      body: `Repeatedly remove leaves (in-degree 1) like topo peeling — remaining 1–2 nodes are tree roots.

[Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/)

\`\`\`js
// Peel leaves layer by layer; 1-2 centers remain (tree diameter midpoints)
// LC: https://leetcode.com/problems/minimum-height-trees/
function findMinHeightTrees(n, edges) {
  if (n === 1) return [0];
  const g = Array.from({ length: n }, () => new Set());
  for (const [u, v] of edges) { g[u].add(v); g[v].add(u); }
  let leaves = [];
  for (let i = 0; i < n; i++) if (g[i].size === 1) leaves.push(i);
  let left = n;
  while (left > 2) {
    left -= leaves.length;
    const next = [];
    for (const u of leaves) {
      for (const v of g[u]) {
        g[v].delete(u);
        if (g[v].size === 1) next.push(v); // new leaf after removing u
      }
    }
    leaves = next;
  }
  return leaves;
}
\`\`\``,
    },
    {
      id: 269,
      lcSlug: "alien-dictionary",
      title: "Alien Dictionary",
      diff: "Hard",
    premium: true,
      body: `Derive character order from adjacent word pairs, then Kahn topo sort — cycle or bad prefix means invalid.

[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)

*Premium — requires LeetCode Premium.*

\`\`\`js
// Derive char edges from adjacent words; Kahn topo or invalid prefix
// LC: https://leetcode.com/problems/alien-dictionary/ (Premium)
function alienOrder(words) {
  const graph = new Map(), indeg = new Map();
  for (const w of words) for (const ch of w) {
    if (!graph.has(ch)) { graph.set(ch, new Set()); indeg.set(ch, 0); }
  }
  for (let i = 0; i + 1 < words.length; i++) {
    const a = words[i], b = words[i + 1];
    let j = 0;
    const m = Math.min(a.length, b.length);
    while (j < m && a[j] === b[j]) j++;
    if (j === m && a.length > b.length) return ""; // prefix violates sorted order
    if (j < m && !graph.get(a[j]).has(b[j])) {
      graph.get(a[j]).add(b[j]);
      indeg.set(b[j], indeg.get(b[j]) + 1);
    }
  }
  const q = [...indeg.keys()].filter((ch) => indeg.get(ch) === 0);
  let order = "";
  while (q.length) {
    const u = q.shift();
    order += u;
    for (const v of graph.get(u)) {
      indeg.set(v, indeg.get(v) - 1);
      if (indeg.get(v) === 0) q.push(v);
    }
  }
  return order.length === indeg.size ? order : ""; // cycle in char graph
}
\`\`\``,
    },
    {
      id: 2115,
      lcSlug: "find-all-possible-recipes-from-given-supplies",
      title: "Find All Possible Recipes from Given Supplies",
      diff: "Medium",
      body: `Dependency graph on recipes — start from supplies, topo/Kahn style unlock recipes when ingredients are available.

[Find All Possible Recipes from Given Supplies](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)

\`\`\`js
// Topo-like: when an ingredient is available, decrement recipe dependency count
// LC: https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/
function findAllRecipes(recipes, ingredients, supplies) {
  const have = new Set(supplies);
  const need = new Map();
  for (let i = 0; i < recipes.length; i++) need.set(recipes[i], ingredients[i].length);
  const byIng = new Map();
  for (let i = 0; i < recipes.length; i++) {
    for (const ing of ingredients[i]) {
      if (!byIng.has(ing)) byIng.set(ing, []);
      byIng.get(ing).push(recipes[i]);
    }
  }
  const q = [...have];
  const out = [];
  const made = new Set();
  while (q.length) {
    const item = q.shift();
    for (const r of byIng.get(item) || []) {
      if (made.has(r)) continue;
      need.set(r, need.get(r) - 1);
      if (need.get(r) === 0) { made.add(r); out.push(r); q.push(r); } // crafted item becomes supply
    }
  }
  return out;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Union Find / Connectivity",
      topics: [
    {
      id: 547,
      lcSlug: "number-of-provinces",
      title: "Number of Provinces",
      diff: "Medium",
      body: `Count connected components — union adjacent cities in DSU; number of roots is province count.

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

\`\`\`js
// Union-Find: each connected component is one province
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
\`\`\``,
    },
    {
      id: 684,
      lcSlug: "redundant-connection",
      title: "Redundant Connection",
      diff: "Medium",
      body: `Add edges one by one. The first edge whose ends are already connected is the extra one. Return that edge.

[Redundant Connection](https://leetcode.com/problems/redundant-connection/)

\`\`\`js
// First edge connecting already-connected nodes is redundant
// LC: https://leetcode.com/problems/redundant-connection/
function findRedundantConnection(edges) {
  const n = edges.length;
  const p = Array.from({ length: n + 1 }, (_, i) => i);
  const rank = Array(n + 1).fill(0);
  for (const [a, b] of edges) {
    if (!union(p, rank, a, b)) return [a, b];
  }
}
\`\`\``,
    },
    {
      id: 721,
      lcSlug: "accounts-merge",
      title: "Accounts Merge",
      diff: "Medium",
      body: `Union emails within each account, then group accounts sharing any email via DSU.

[Accounts Merge](https://leetcode.com/problems/accounts-merge/)

\`\`\`js
// Union emails within same account; merge DSU components
// LC: https://leetcode.com/problems/accounts-merge/
function accountsMerge(accounts) {
  const id=new Map(); let eid=0;
  for(const acc of accounts) for(let i=1;i<acc.length;i++) if(!id.has(acc[i])) id.set(acc[i], eid++);
  const p=Array.from({length:eid},(_,i)=>i), rank=Array(eid).fill(0);
  const find=(x)=>{ while(p[x]!==x){ p[x]=p[p[x]]; x=p[x]; } return x; };
  const union=(a,b)=>{ a=find(a); b=find(b); if(a===b) return; if(rank[a]<rank[b]) [a,b]=[b,a]; p[b]=a; if(rank[a]===rank[b]) rank[a]++; };
  for(const acc of accounts) for(let i=2;i<acc.length;i++) union(id.get(acc[1]), id.get(acc[i]));
  const groups=new Map();
  for(const [email,i] of id) { const r=find(i); if(!groups.has(r)) groups.set(r, []); groups.get(r).push(email); }
  const ans=[];
  for(const emails of groups.values()){ emails.sort();
    let name="";
    for(const acc of accounts) if(acc.includes(emails[0])){ name=acc[0]; break; }
    ans.push([name, ...emails]);
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 1319,
      lcSlug: "number-of-operations-to-make-network-connected",
      title: "Number of Operations to Make Network Connected",
      diff: "Medium",
      body: `If edges ≥ n−1, check one component via DSU — answer is max(0, edges − (n − components)).

[Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)

\`\`\`js
// Need at least n-1 edges; answer = extra edges after merging components
// LC: https://leetcode.com/problems/number-of-operations-to-make-network-connected/
function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let comps = n;
  for (const [u, v] of connections) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { parent[ru] = rv; comps--; }
  }
  return comps - 1; // cables needed to connect comps-1 gaps
}
\`\`\``,
    },
    {
      id: 990,
      lcSlug: "satisfiability-of-equality-equations",
      title: "Satisfiability of Equality Equations",
      diff: "Medium",
      body: `Union all equal pairs first, then verify unequal pairs are not in the same set.

[Satisfiability of Equality Equations](https://leetcode.com/problems/satisfiability-of-equality-equations/)

\`\`\`js
// Union all == first; then != must join different DSU sets
// LC: https://leetcode.com/problems/satisfiability-of-equality-equations/
function equationsPossible(equations) {
  const parent = Array.from({ length: 26 }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const idx = (ch) => ch.charCodeAt(0) - 97;
  for (const e of equations) {
    if (e[1] === "=") {
      const a = find(idx(e[0])), b = find(idx(e[3]));
      parent[a] = b;
    }
  }
  for (const e of equations) {
    if (e[1] === "!") {
      if (find(idx(e[0])) === find(idx(e[3]))) return false;
    }
  }
  return true;
}
\`\`\``,
    },
    {
      id: 839,
      lcSlug: "similar-string-groups",
      title: "Similar String Groups",
      diff: "Hard",
      body: `Strings equal after at most two swaps belong together — compare pairs O(n²) and union in DSU.

[Similar String Groups](https://leetcode.com/problems/similar-string-groups/)

\`\`\`js
// Similar = same length and at most 2 mismatches (swap-able)
// LC: https://leetcode.com/problems/similar-string-groups/
function numSimilarGroups(strs) {
  const n = strs.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const similar = (a, b) => {
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++diff > 2) return false;
    return true;
  };
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (similar(strs[i], strs[j])) {
        const a = find(i), b = find(j);
        if (a !== b) parent[a] = b;
      }
    }
  }
  const groups = new Set();
  for (let i = 0; i < n; i++) groups.add(find(i));
  return groups.size;
}
\`\`\``,
    },
    {
      id: 827,
      lcSlug: "making-a-large-island",
      title: "Making A Large Island",
      diff: "Hard",
      body: `DSU with size — flip 0→1 and union 4-neighbors; track largest component size.

[Making A Large Island](https://leetcode.com/problems/making-a-large-island/)

\`\`\`js
// Label each island with id and size; try flipping one 0 to merge neighbors
// LC: https://leetcode.com/problems/making-a-large-island/
function largestIsland(grid) {
  const n = grid.length;
  const size = new Map();
  let id = 2;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= n || grid[r][c] !== 1) return 0;
    grid[r][c] = id;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let best = 0, hasZero = false;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) { size.set(id, dfs(r, c)); id++; }
      if (grid[r][c] === 0) hasZero = true;
    }
  }
  if (!hasZero) return n * n;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== 0) continue;
      const seen = new Set();
      let total = 1; // cell we flip to land
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] < 2) continue;
        seen.add(grid[nr][nc]); // distinct neighboring island ids
      }
      for (const k of seen) total += size.get(k);
      if (total > best) best = total;
    }
  }
  return best;
}
\`\`\``,
    },
    {
      id: 1579,
      lcSlug: "remove-max-number-of-edges-to-keep-graph-fully-traversable",
      title: "Remove Max Number of Edges to Keep Graph Fully Traversable",
      diff: "Hard",
      body: `Union type-3 nodes with both endpoints first, then check type-1 and type-2 constraints share a component — else -1.

[Remove Max Number of Edges to Keep Graph Fully Traversable](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/)

\`\`\`js
// Two DSU: Alice type1, Bob type2; type3 helps both — greedily use type3 first
// LC: https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/
function maxNumEdgesToRemove(n, edges) {
  const A = Array.from({ length: n + 1 }, (_, i) => i);
  const B = [...A];
  const find = (p, x) => (p[x] === x ? x : (p[x] = find(p, x)));
  let ca = n, cb = n, used = 0;
  const sorted = [...edges].sort((a, b) => b[0] - a[0]);
  for (const [t, u, v] of sorted) {
    if (t === 3) {
      const a = find(A, u), b = find(A, v);
      if (a !== b) {
        A[a] = b; ca--;
        const c = find(B, u), d = find(B, v);
        B[c] = d; cb--;
        used++;
      }
    } else if (t === 1) {
      const a = find(A, u), b = find(A, v);
      if (a !== b) { A[a] = b; ca--; used++; }
    } else {
      const c = find(B, u), d = find(B, v);
      if (c !== d) { B[c] = d; cb--; used++; }
    }
  }
  if (ca !== 1 || cb !== 1) return -1;
  return edges.length - used;
}
\`\`\``,
    },
      ],
    },
  ],
};
