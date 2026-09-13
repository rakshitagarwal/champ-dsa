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
\`\`\``,
    },
    {
      id: 695,
      lcSlug: "max-area-of-island",
      title: "Max Area of Island",
      diff: "Medium",
      body: `Islands wali DFS — area gin ke lao, sabse bada yaad rakho.

[Max Area of Island](https://leetcode.com/problems/max-area-of-island/)

\`\`\`js
// Hinglish: area gin ke lao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/max-area-of-island/
function maxAreaOfIsland(grid) {
  // Hinglish: step 1 — rows/cols lo
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return 0;
    grid[r][c] = 0; // Hinglish: dekha mark karo
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let best = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        const a = dfs(r, c);
        if (a > best) best = a; // Hinglish: bada mila
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
      body: `Start cell ka rang badlo — same rang wale padosi pakad ke bharo. Purana-naya same ho to wapas lao.

[Flood Fill](https://leetcode.com/problems/flood-fill/)

\`\`\`js
// Hinglish: rang bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/flood-fill/
function floodFill(image, sr, sc, color) {
  // Hinglish: step 1 — purana rang lo
  const old = image[sr][sc];
  if (old === color) return image; // Hinglish: same hai to kuch nahi
  const rows = image.length, cols = image[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r][c] !== old) return;
    image[r][c] = color; // Hinglish: rang badlo
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
      body: `Border se connected \`O\` safe hai. Baaki \`O\` ko \`X\` banao. DFS border se.

[Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 542,
      lcSlug: "01-matrix",
      title: "01 Matrix",
      diff: "Medium",
      body: `Saare zero queue me daalo, BFS chalao — pehli baar pahuche wahi nearest distance hai.

[01 Matrix](https://leetcode.com/problems/01-matrix/)

\`\`\`js
// Hinglish: zero se failao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/01-matrix/
function updateMatrix(mat) {
  // Hinglish: step 1 — zero queue me daalo
  const rows = mat.length, cols = mat[0].length;
  const q = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) q.push([r, c]);
      else mat[r][c] = -1; // Hinglish: abhi pata nahi
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || mat[nr][nc] !== -1) continue;
      mat[nr][nc] = mat[r][c] + 1; // Hinglish: ek kadam aage
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
      body: `8 directions BFS — steps ke saath queue me chalao, end mile to wapas lao.

[Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

\`\`\`js
// Hinglish: 8 disha BFS — ek-ek step comment dekho
// LC: https://leetcode.com/problems/shortest-path-in-binary-matrix/
function shortestPathBinaryMatrix(grid) {
  // Hinglish: step 1 — start/end check karo
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const q = [[0, 0, 1]];
  grid[0][0] = 1; // Hinglish: dekha mark karo
  while (q.length) {
    const [r, c, d] = q.shift();
    if (r === n - 1 && c === n - 1) return d; // Hinglish: pahuch gaye
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
      body: `Pehla island DFS se paint karo, phir usse BFS failao — doosra island mile to steps wapas lao.

[Shortest Bridge](https://leetcode.com/problems/shortest-bridge/)

\`\`\`js
// Hinglish: paint karke failao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/shortest-bridge/
function shortestBridge(grid) {
  // Hinglish: step 1 — pehla island paint karo
  const n = grid.length;
  const q = [];
  let found = false;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= n || grid[r][c] !== 1) return;
    grid[r][c] = 2; // Hinglish: apna nishan
    q.push([r, c, 0]);
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
      if (grid[nr][nc] === 1) return d; // Hinglish: doosra island mila
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
      body: `Border se judi zameen safe hai — border DFS se mitao, bachi gino.

[Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/)

\`\`\`js
// Hinglish: border mitao bachi gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-enclaves/
function numEnclaves(grid) {
  // Hinglish: step 1 — rows/cols lo
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return;
    grid[r][c] = 0; // Hinglish: border wali mitao
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  for (let r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols - 1); }
  for (let c = 0; c < cols; c++) { dfs(0, c); dfs(rows - 1, c); }
  let ans = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (grid[r][c] === 1) ans++; // Hinglish: bachi gino
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
\`\`\``,
    },
    {
      id: 752,
      lcSlug: "open-the-lock",
      title: "Open the Lock",
      diff: "Medium",
      body: `0000 se BFS chalao — har wheel aage-peeche ghumao, deadends skip karo, target mile to steps lao.

[Open the Lock](https://leetcode.com/problems/open-the-lock/)

\`\`\`js
// Hinglish: wheel ghumao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/open-the-lock/
function openLock(deadends, target) {
  // Hinglish: step 1 — dead set lo
  const dead = new Set(deadends);
  if (dead.has("0000")) return -1;
  const q = [["0000", 0]];
  const seen = new Set(["0000"]);
  while (q.length) {
    const [cur, d] = q.shift();
    if (cur === target) return d; // Hinglish: khul gaya
    for (let i = 0; i < 4; i++) {
      for (const move of [1, -1]) {
        const arr = [...cur];
        arr[i] = String((Number(arr[i]) + move + 10) % 10); // Hinglish: wheel ghumao
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
      body: `Stop se bus, bus se stop — BFS me dono badlo. Bus dobara mat pakdo (visited bus rakho).

[Bus Routes](https://leetcode.com/problems/bus-routes/)

\`\`\`js
// Hinglish: stop-bus-stop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/bus-routes/
function numBusesToDestination(routes, source, target) {
  // Hinglish: step 1 — stop se bus map banao
  if (source === target) return 0;
  const stopToBus = new Map();
  for (let b = 0; b < routes.length; b++) {
    for (const s of routes[b]) {
      if (!stopToBus.has(s)) stopToBus.set(s, []);
      stopToBus.get(s).push(b);
    }
  }
  const q = [[source, 0]];
  const seenStop = new Set([source]), seenBus = new Set();
  while (q.length) {
    const [stop, buses] = q.shift();
    for (const b of stopToBus.get(stop) || []) {
      if (seenBus.has(b)) continue;
      seenBus.add(b); // Hinglish: bus dobara mat pakdo
      for (const s of routes[b]) {
        if (s === target) return buses + 1; // Hinglish: pahuch gaye
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
      body: `0 se DFS chalao — mili key se naya kamra kholo. Sab khule to true.

[Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)

\`\`\`js
// Hinglish: chaabi se kamra — ek-ek step comment dekho
// LC: https://leetcode.com/problems/keys-and-rooms/
function canVisitAllRooms(rooms) {
  // Hinglish: step 1 — dekhe hue yaad rakho
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const r = stack.pop();
    for (const k of rooms[r]) {
      if (!seen.has(k)) { seen.add(k); stack.push(k); } // Hinglish: nayi chaabi naya kamra
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
      body: `Har rasta destination pe khatm hona chahiye — DFS me cycle ya dead-end mile to false. Memo se tez karo.

[All Paths From Source Lead to Destination](https://leetcode.com/problems/all-paths-from-source-lead-to-destination/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: sab raste check karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/all-paths-from-source-lead-to-destination/ (Premium)
function leadsToDestination(n, edges, source, destination) {
  // Hinglish: step 1 — graph banao
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) g[u].push(v);
  const state = Array(n).fill(0); // Hinglish: 0=unseen, 1=visiting, 2=safe
  const dfs = (u) => {
    if (state[u] === 1) return false; // Hinglish: cycle mili
    if (state[u] === 2) return true;
    if (g[u].length === 0) return u === destination; // Hinglish: dead-end to destination hona chahiye
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
      body: `Lexical order me DFS karo (Hierholzer) — aage rasta na ho to ticket jodo. Aakhir me ulta karo.

[Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/)

\`\`\`js
// Hinglish: lexical DFS — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reconstruct-itinerary/
function findItinerary(tickets) {
  // Hinglish: step 1 — sort karke map banao
  const g = new Map();
  tickets.sort();
  for (const [u, v] of tickets) {
    if (!g.has(u)) g.set(u, []);
    g.get(u).push(v);
  }
  for (const v of g.values()) v.reverse(); // Hinglish: pop se chhota mile
  const out = [];
  const dfs = (u) => {
    const dests = g.get(u) || [];
    while (dests.length) dfs(dests.pop()); // Hinglish: aage jao
    out.push(u); // Hinglish: rasta khatm to jodo
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
      body: `Equation ko weighted graph banao — query BFS/DFS se nikalo, weight guna karte jao.

[Evaluate Division](https://leetcode.com/problems/evaluate-division/)

\`\`\`js
// Hinglish: graph bana ke chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/evaluate-division/
function calcEquation(equations, values, queries) {
  // Hinglish: step 1 — weighted graph banao
  const g = new Map();
  const add = (u, v, w) => {
    if (!g.has(u)) g.set(u, []);
    if (!g.has(v)) g.set(v, []);
    g.get(u).push([v, w]);
    g.get(v).push([u, 1 / w]);
  };
  for (let i = 0; i < equations.length; i++) add(equations[i][0], equations[i][1], values[i]);
  const out = [];
  for (const [s, t] of queries) {
    if (!g.has(s) || !g.has(t)) { out.push(-1); continue; } // Hinglish: naam hi nahi
    const seen = new Set([s]);
    const q = [[s, 1]];
    let ans = -1;
    while (q.length) {
      const [u, w] = q.shift();
      if (u === t) { ans = w; break; } // Hinglish: mil gaya
      for (const [v, x] of g.get(u)) {
        if (!seen.has(v)) { seen.add(v); q.push([v, w * x]); } // Hinglish: weight guna karo
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
\`\`\``,
    },
    {
      id: 210,
      lcSlug: "course-schedule-ii",
      title: "Course Schedule II",
      diff: "Medium",
      body: `Topo order wapas bhi karna hai, sirf possible/impossible nahi. Kahn me nikalte time order array me push karo.

[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 802,
      lcSlug: "find-eventual-safe-states",
      title: "Find Eventual Safe States",
      diff: "Medium",
      body: `Terminal tak sab raste safe hon to node safe hai — 3-color DFS se cycle wale kaato.

[Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/)

\`\`\`js
// Hinglish: safe nodes dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-eventual-safe-states/
function eventualSafeNodes(graph) {
  // Hinglish: step 1 — 3 colors lo
  const n = graph.length, color = Array(n).fill(0);
  const safe = (u) => {
    if (color[u] !== 0) return color[u] === 2;
    color[u] = 1; // Hinglish: visiting
    for (const v of graph[u]) {
      if (!safe(v)) return false; // Hinglish: ek bhi unsafe to unsafe
    }
    color[u] = 2;
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
      body: `Patte kaat-te jao (topological jaisa) — aakhir me bache 1-2 node hi roots hain.

[Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/)

\`\`\`js
// Hinglish: patte kaato — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-height-trees/
function findMinHeightTrees(n, edges) {
  // Hinglish: step 1 — degree nikalo
  if (n === 1) return [0];
  const g = Array.from({ length: n }, () => new Set());
  for (const [u, v] of edges) { g[u].add(v); g[v].add(u); }
  let leaves = [];
  for (let i = 0; i < n; i++) if (g[i].size === 1) leaves.push(i); // Hinglish: patte pakdo
  let left = n;
  while (left > 2) {
    left -= leaves.length;
    const next = [];
    for (const u of leaves) {
      for (const v of g[u]) {
        g[v].delete(u); // Hinglish: patta kaato
        if (g[v].size === 1) next.push(v);
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
      body: `Padosi words se order nikalo (pehla alag char), phir Kahn topo sort. Galat prefix order mile to invalid.

[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: order graph + topo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/alien-dictionary/ (Premium)
function alienOrder(words) {
  // Hinglish: step 1 — har char ka node banao
  const graph = new Map(), indeg = new Map();
  for (const w of words) for (const ch of w) {
    if (!graph.has(ch)) { graph.set(ch, new Set()); indeg.set(ch, 0); }
  }
  for (let i = 0; i + 1 < words.length; i++) {
    const a = words[i], b = words[i + 1];
    let j = 0;
    const m = Math.min(a.length, b.length);
    while (j < m && a[j] === b[j]) j++; // Hinglish: pehla alag char
    if (j === m && a.length > b.length) return ""; // Hinglish: galat prefix order
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
  return order.length === indeg.size ? order : ""; // Hinglish: cycle to khaali
}
\`\`\``,
    },
    {
      id: 2115,
      lcSlug: "find-all-possible-recipes-from-given-supplies",
      title: "Find All Possible Recipes from Given Supplies",
      diff: "Medium",
      body: `Recipe ingredients pe nirbhar hai — topo sort jaisa: supplies se shuru karo, jiske saare mile use banao.

[Find All Possible Recipes from Given Supplies](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)

\`\`\`js
// Hinglish: supplies se banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/
function findAllRecipes(recipes, ingredients, supplies) {
  // Hinglish: step 1 — supply set lo
  const have = new Set(supplies);
  const need = new Map();
  for (let i = 0; i < recipes.length; i++) need.set(recipes[i], ingredients[i].length);
  const byIng = new Map();
  for (let i = 0; i < recipes.length; i++) {
    for (const ing of ingredients[i]) {
      if (!byIng.has(ing)) byIng.set(ing, []);
      byIng.get(ing).push(recipes[i]); // Hinglish: ye ingredient kahan lagta hai
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
      if (need.get(r) === 0) { made.add(r); out.push(r); q.push(r); } // Hinglish: ban gayi
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
      body: `Union-Find se bhi provinces gin sakte hain. Connected cities ko union karo.

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

\`\`\`js
// Hinglish: find-union — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-provinces/
function findCircleNumUF(isConnected) {
  // Hinglish: DSU
  const n=isConnected.length, p=Array.from({length:n},(_,i)=>i), rank=Array(n).fill(0);
  const find=(x)=>{ while(p[x]!==x){ p[x]=p[p[x]]; x=p[x]; } return x; };
  const union=(a,b)=>{
    a=find(a); b=find(b); if(a===b) return;
    if(rank[a]<rank[b]) [a,b]=[b,a];
    p[b]=a; if(rank[a]===rank[b]) rank[a]++;
  };
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(isConnected[i][j]) union(i,j); // Hinglish: juda to union
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
// Hinglish: find-union — ek-ek step comment dekho
// Union-find — extra edge
// LC: https://leetcode.com/problems/redundant-connection/
function findRedundantConnection(edges) {
  // Hinglish: step 1 — base case check karo
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
      body: `Same email wale accounts merge karo. Email ko node, account ke emails ko union karo.

[Accounts Merge](https://leetcode.com/problems/accounts-merge/)

\`\`\`js
// Hinglish: find-union — ek-ek step comment dekho
// LC: https://leetcode.com/problems/accounts-merge/
function accountsMerge(accounts) {
  // Hinglish: email -> id
  const id=new Map(); let eid=0;
  for(const acc of accounts) for(let i=1;i<acc.length;i++) if(!id.has(acc[i])) id.set(acc[i], eid++);
  const p=Array.from({length:eid},(_,i)=>i), rank=Array(eid).fill(0);
  const find=(x)=>{ while(p[x]!==x){ p[x]=p[p[x]]; x=p[x]; } return x; };
  const union=(a,b)=>{ a=find(a); b=find(b); if(a===b) return; if(rank[a]<rank[b]) [a,b]=[b,a]; p[b]=a; if(rank[a]===rank[b]) rank[a]++; };
  for(const acc of accounts) for(let i=2;i<acc.length;i++) union(id.get(acc[1]), id.get(acc[i])); // Hinglish: ek account ke emails union
  const groups=new Map();
  for(const [email,i] of id) { const r=find(i); if(!groups.has(r)) groups.set(r, []); groups.get(r).push(email); }
  const ans=[];
  for(const emails of groups.values()){ emails.sort(); // Hinglish: sort
    // naam dhoondo
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
      body: `Components gino (DSU), extra edges gino — extra kam se kam components-1 hone chahiye.

[Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)

\`\`\`js
// Hinglish: jodo aur gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-operations-to-make-network-connected/
function makeConnected(n, connections) {
  // Hinglish: step 1 — cable gino
  if (connections.length < n - 1) return -1; // Hinglish: cable hi kam hai
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let comps = n;
  for (const [u, v] of connections) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { parent[ru] = rv; comps--; } // Hinglish: jude
  }
  return comps - 1; // Hinglish: itne cable lagenge
}
\`\`\``,
    },
    {
      id: 990,
      lcSlug: "satisfiability-of-equality-equations",
      title: "Satisfiability of Equality Equations",
      diff: "Medium",
      body: `Pehle == wale jodo (DSU), phir != wale check karo — same group me mile to false.

[Satisfiability of Equality Equations](https://leetcode.com/problems/satisfiability-of-equality-equations/)

\`\`\`js
// Hinglish: pehle jodo phir todo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/satisfiability-of-equality-equations/
function equationsPossible(equations) {
  // Hinglish: step 1 — DSU lo
  const parent = Array.from({ length: 26 }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const idx = (ch) => ch.charCodeAt(0) - 97;
  for (const e of equations) {
    if (e[1] === "=") {
      const a = find(idx(e[0])), b = find(idx(e[3]));
      parent[a] = b; // Hinglish: barabar wale jodo
    }
  }
  for (const e of equations) {
    if (e[1] === "!") {
      if (find(idx(e[0])) === find(idx(e[3]))) return false; // Hinglish: judne ke baad alag kaise
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
      body: `Do swap me barabar hon to same group — O(n²) compare karke DSU se jodo.

[Similar String Groups](https://leetcode.com/problems/similar-string-groups/)

\`\`\`js
// Hinglish: similar jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/similar-string-groups/
function numSimilarGroups(strs) {
  // Hinglish: step 1 — DSU lo
  const n = strs.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const similar = (a, b) => {
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++diff > 2) return false;
    return true; // Hinglish: 0 ya 2 farak to similar
  };
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (similar(strs[i], strs[j])) {
        const a = find(i), b = find(j);
        if (a !== b) parent[a] = b; // Hinglish: jodo
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
      body: `Har island ko id do aur size yaad rakho — 0 ko 1 banao, padosi ids jodo, max rakho.

[Making A Large Island](https://leetcode.com/problems/making-a-large-island/)

\`\`\`js
// Hinglish: id do jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/making-a-large-island/
function largestIsland(grid) {
  // Hinglish: step 1 — island id lagao
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
      let total = 1; // Hinglish: khud 1 banega
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] < 2) continue;
        seen.add(grid[nr][nc]);
      }
      for (const k of seen) total += size.get(k); // Hinglish: padosi jodo
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
      body: `Type 3 pehle jodo (dono ke kaam), phir type 1 aur 2 alag — teeno judne chahiye warna -1.

[Remove Max Number of Edges to Keep Graph Fully Traversable](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/)

\`\`\`js
// Hinglish: type 3 pehle — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/
function maxNumEdgesToRemove(n, edges) {
  // Hinglish: step 1 — do DSU lo
  const A = Array.from({ length: n + 1 }, (_, i) => i);
  const B = [...A];
  const find = (p, x) => (p[x] === x ? x : (p[x] = find(p, x)));
  let ca = n, cb = n, used = 0;
  const sorted = [...edges].sort((a, b) => b[0] - a[0]); // Hinglish: type 3 pehle
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
  if (ca !== 1 || cb !== 1) return -1; // Hinglish: dono jude hone chahiye
  return edges.length - used; // Hinglish: bekaar hatao
}
\`\`\``,
    },
      ],
    },
  ],
};
