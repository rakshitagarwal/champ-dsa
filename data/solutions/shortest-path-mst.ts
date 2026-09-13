import type { SolutionGroup } from "./types";

export const SHORTEST_PATH_MST_SOLUTIONS: SolutionGroup = {
  id: "shortest-path-mst",
  title: "Shortest Path / MST",
  subs: [
    {
      title: "Dijkstra / Bellman-Ford / MST",
      topics: [
    {
      id: 743,
      lcSlug: "network-delay-time",
      title: "Network Delay Time",
      diff: "Medium",
      body: `Dijkstra: always pick the unvisited node with smallest time. Relax its edges. Answer is the max time among nodes I reached, or -1 if someone is unreachable.

[Network Delay Time](https://leetcode.com/problems/network-delay-time/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 787,
      lcSlug: "cheapest-flights-within-k-stops",
      title: "Cheapest Flights Within K Stops",
      diff: "Medium",
      body: `At most K stops = at most K+1 edges. Bellman-Ford: copy dist, relax every flight, K+1 rounds. Do not reuse the same array in one round (that would be unlimited hops).

[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 1514,
      lcSlug: "path-with-maximum-probability",
      title: "Path with Maximum Probability",
      diff: "Medium",
      body: `Dijkstra ulta — max probability wala nikalo (max-heap), relax karo guna karke.

[Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/)

\`\`\`js
// Hinglish: max nikalo guna karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/path-with-maximum-probability/
function maxProbability(n, edges, succProb, start, end) {
  // Hinglish: step 1 — graph banao
  const g = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    g[u].push([v, succProb[i]]);
    g[v].push([u, succProb[i]]);
  }
  const best = Array(n).fill(0);
  best[start] = 1;
  const h = [[1, start]]; // Hinglish: max-heap jaisa
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i][0] <= h[p][0]) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && h[l][0] > h[m][0]) m = l;
      if (r < h.length && h[r][0] > h[m][0]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  while (h.length) {
    const [p, u] = pop();
    if (u === end) return p; // Hinglish: mil gaya
    if (p < best[u]) continue;
    for (const [v, w] of g[u]) {
      if (best[v] < p * w) { best[v] = p * w; push([best[v], v]); } // Hinglish: behtar mila
    }
  }
  return 0;
}
\`\`\``,
    },
    {
      id: 1631,
      lcSlug: "path-with-minimum-effort",
      title: "Path With Minimum Effort",
      diff: "Medium",
      body: `Dijkstra min-max pe — rasta ka effort uska sabse bada jump hai, use minimize karo.

[Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)

\`\`\`js
// Hinglish: max jump minimize karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/path-with-minimum-effort/
function minimumEffortPath(heights) {
  // Hinglish: step 1 — rows/cols lo
  const rows = heights.length, cols = heights[0].length;
  const best = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  best[0][0] = 0;
  const h = [[0, 0, 0]];
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i][0] >= h[p][0]) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && h[l][0] < h[m][0]) m = l;
      if (r < h.length && h[r][0] < h[m][0]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (h.length) {
    const [e, r, c] = pop();
    if (r === rows - 1 && c === cols - 1) return e; // Hinglish: pahuch gaye
    if (e > best[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c])); // Hinglish: sabse bada jump
      if (ne < best[nr][nc]) { best[nr][nc] = ne; push([ne, nr, nc]); }
    }
  }
  return 0;
}
\`\`\``,
    },
    {
      id: 1584,
      lcSlug: "min-cost-to-connect-all-points",
      title: "Min Cost to Connect All Points",
      diff: "Medium",
      body: `Har pair ka Manhattan edge banao, sort karo, DSU se loop check karke jodo. \`n-1\` edges milte hi answer.

[Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

\`\`\`js
// Hinglish: DSU + Kruskal — ek-ek step comment dekho
// Graph — Kruskal + DSU
// LC: https://leetcode.com/problems/min-cost-to-connect-all-points/
function minCostConnectPoints(points) {
  // Hinglish: step 1 — saare edges banao (Manhattan)
  const n = points.length;
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const w = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      edges.push([w, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]); // Hinglish: chhota pehle
  // Hinglish: DSU — parent + path compression
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let cost = 0, used = 0;
  for (const [w, u, v] of edges) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { // Hinglish: loop nahi banega
      parent[ru] = rv;
      cost += w;
      if (++used === n - 1) break; // Hinglish: n-1 edges kaafi
    }
  }
  return cost;
}
\`\`\``,
    },
    {
      id: 1489,
      lcSlug: "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree",
      title: "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
      diff: "Hard",
      body: `MST weight nikalo, phir har edge hata ke aur force karke dekho — badle to critical, same rahe to pseudo.

[Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/)

\`\`\`js
// Hinglish: hata ke dekho force karke dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/
function findCriticalAndPseudoCriticalEdges(n, edges) {
  // Hinglish: step 1 — index jod ke sort karo
  const es = edges.map((e, i) => [e[2], e[0], e[1], i]).sort((a, b) => a[0] - b[0]);
  const mst = (skip, force) => {
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    let cost = 0, used = 0;
    if (force >= 0) {
      const [w, u, v] = es[force];
      const a = find(u), b = find(v);
      parent[a] = b; cost += w; used++;
    }
    for (let i = 0; i < es.length; i++) {
      if (i === skip || i === force) continue;
      const [w, u, v] = es[i];
      const a = find(u), b = find(v);
      if (a !== b) { parent[a] = b; cost += w; used++; }
    }
    return used === n - 1 ? cost : Infinity; // Hinglish: juda nahi to fail
  };
  const base = mst(-1, -1);
  const critical = [], pseudo = [];
  for (let i = 0; i < es.length; i++) {
    if (mst(i, -1) > base) critical.push(es[i][3]); // Hinglish: hatane se badha
    else if (mst(-1, i) === base) pseudo.push(es[i][3]); // Hinglish: force pe same
  }
  return [critical, pseudo];
}
\`\`\``,
    },
    {
      id: 778,
      lcSlug: "swim-in-rising-water",
      title: "Swim in Rising Water",
      diff: "Hard",
      body: `Time badhao, utni height tak tairna seekho — min-heap se sabse neecha nikalo (Dijkstra jaisa).

[Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/)

\`\`\`js
// Hinglish: neecha pehle tairo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/swim-in-rising-water/
function swimInWater(grid) {
  // Hinglish: step 1 — rows lo
  const n = grid.length;
  const seen = Array.from({ length: n }, () => Array(n).fill(false));
  const h = [[grid[0][0], 0, 0]];
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i][0] >= h[p][0]) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && h[l][0] < h[m][0]) m = l;
      if (r < h.length && h[r][0] < h[m][0]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  seen[0][0] = true;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let ans = 0;
  while (h.length) {
    const [t, r, c] = pop();
    if (t > ans) ans = t; // Hinglish: time badhao
    if (r === n - 1 && c === n - 1) return ans; // Hinglish: pahuch gaye
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= n || nc >= n || seen[nr][nc]) continue;
      seen[nr][nc] = true;
      push([grid[nr][nc], nr, nc]);
    }
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 1334,
      lcSlug: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
      title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
      diff: "Medium",
      body: `Har \`k\` ko intermediate banao: \`dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])\`. \`O(V^3)\`, \`V <= 400\` tak theek. Transitively closure bhi same.

[Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

\`\`\`js
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
\`\`\``,
    },
      ],
    },
  ],
};
