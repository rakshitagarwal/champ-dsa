import type { SolutionGroup } from "./types";

export const GRAPHS_SOLUTIONS: SolutionGroup = {
  id: "graphs",
  title: "Graphs",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "toeplitz-matrix",
      title: "Toeplitz Matrix",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=8fwKTxlBDsE&ab_channel=AlgoJS",
      body: `Har diagonal ek jaisi honi chahiye — har cell apne upar-left se milao.

[Toeplitz Matrix](https://leetcode.com/problems/toeplitz-matrix/)

\`\`\`js
// Hinglish: upar-left se milao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/toeplitz-matrix/
function isToeplitzMatrix(matrix) {
  // Hinglish: step 1 — pehli row/col chhodo
  for (let r = 1; r < matrix.length; r++) {
    for (let c = 1; c < matrix[0].length; c++) {
      if (matrix[r][c] !== matrix[r - 1][c - 1]) return false; // Hinglish: diagonal tooti
    }
  }
  return true;
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "clone-graph",
      title: "Clone Graph",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=RhyF7kGcHbw&ab_channel=AlgoJS",
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
      id: 2,
      lcSlug: "course-schedule",
      title: "Course Schedule",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=FN9Q9DmVH_Y&t=230s&ab_channel=AlgoJS",
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
      id: 3,
      lcSlug: "longest-consecutive-sequence",
      title: "Longest Consecutive Sequence",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=W61fIEQ9KhE&ab_channel=AlgoJS",
      body: `Put everything in a set. Only start counting at a number that has no \`n - 1\`. Then walk \`n + 1\`, \`n + 2\`, … That way each number is touched about twice, not n².

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

\`\`\`js
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// Hashing — only start a streak at the left edge
// LC: https://leetcode.com/problems/longest-consecutive-sequence/
function longestConsecutive(nums) {
  // Hinglish: step 1 — base case check karo
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue;
    let len = 1;
    while (set.has(n + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "find-if-path-exists-in-graph",
      title: "Find If Path Exists in Graph",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=qhmdBndZnk0&t=3s&ab_channel=AlgoJS",
      body: `Graph banao, source se DFS/BFS chalao — destination mile to true.

[Find If Path Exists in Graph](https://leetcode.com/problems/find-if-path-exists-in-graph/)

\`\`\`js
// Hinglish: chal ke dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-if-path-exists-in-graph/
function validPath(n, edges, source, destination) {
  // Hinglish: step 1 — graph banao
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { g[u].push(v); g[v].push(u); }
  const seen = new Set([source]);
  const stack = [source];
  while (stack.length) {
    const u = stack.pop();
    if (u === destination) return true; // Hinglish: pahuch gaye
    for (const v of g[u]) {
      if (!seen.has(v)) { seen.add(v); stack.push(v); }
    }
  }
  return false;
}
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "number-of-connected-components-in-an-undirected-graph",
      title: "Number of Connected Components in an Undirected Graph",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=DRwgXbE1ZSk&ab_channel=AlgoJS",
      body: `DSU se jodo, groups gino. Har successful union ek component kam karta hai.

[Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: union-find gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/ (Premium)
function countComponents(n, edges) {
  // Hinglish: step 1 — har node apna parent
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let comps = n;
  for (const [u, v] of edges) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { parent[ru] = rv; comps--; } // Hinglish: jude to ek kam
  }
  return comps;
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "all-paths-from-source-to-target",
      title: "All Paths From Source To Target",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=UBtG3KQJ-zk&ab_channel=AlgoJS",
      body: `DAG me saare raste nikalo — path saath le jao, target pe copy rakho, wapas aao.

[All Paths From Source To Target](https://leetcode.com/problems/all-paths-from-source-to-target/)

\`\`\`js
// Hinglish: path saath le jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/all-paths-from-source-to-target/ (Premium)
function allPathsSourceTarget(graph) {
  // Hinglish: step 1 — answer lo
  const out = [];
  const target = graph.length - 1;
  const dfs = (u, path) => {
    path.push(u);
    if (u === target) out.push([...path]); // Hinglish: rasta mil gaya
    else for (const v of graph[u]) dfs(v, path);
    path.pop(); // Hinglish: wapas aao
  };
  dfs(0, []);
  return out;
}
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "number-of-provinces",
      title: "Number of Provinces",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=LMxTM4QaCgM&ab_channel=AlgoJS",
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
      id: 8,
      lcSlug: "graph-valid-tree",
      title: "Graph Valid Tree",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=o53e36VSBSo&t=358s&ab_channel=AlgoJS",
      body: `Tree ke do niyam — edges exactly n-1 hon, aur sab connected hon. Pehle gino, phir DFS se check karo.

[Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: gino phir jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/graph-valid-tree/ (Premium)
function validTree(n, edges) {
  // Hinglish: step 1 — edges gino
  if (edges.length !== n - 1) return false; // Hinglish: tree me n-1 hi hote
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { g[u].push(v); g[v].push(u); }
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const u = stack.pop();
    for (const v of g[u]) if (!seen.has(v)) { seen.add(v); stack.push(v); }
  }
  return seen.size === n; // Hinglish: sab pahuche to tree
}
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "open-the-lock",
      title: "Open The Lock",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=0YNzXi_bnl4&ab_channel=AlgoJS",
      body: `0000 se BFS chalao — har wheel aage-peeche ghumao, deadends skip karo, target mile to steps lao.

[Open The Lock](https://leetcode.com/problems/open-the-lock/)

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
      id: 10,
      lcSlug: "alien-dictionary",
      title: "Alien Dictionary",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=Dwxu9fA7NJ0",
      body: `Padosi words se order nikalo (pehla alag char), phir Kahn topo sort. Galat prefix order mile to invalid.

[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)

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
      ],
    },
  ],
};
