# Union Find

**Definition:** Union-Find (Disjoint Set Union, DSU) nodes ko disjoint sets me rakhta hai, `find` (path compression) aur `union` (rank/size se) lagbhag `O(α(n))` me. Har node parent ko point karta hai; root hi representative ("boss").

**When to use:** "Ye connected hain kya?", groups merge, undirected graph me cycle detect, components ginna, ya MST (Kruskal — sabse sasta edge jodo agar already connected nahi).

**How it works:** `find(x)` root tak jata hai aur rasta flat karta hai (`p[x]=p[p[x]]`). `union(a,b)` chhote rank wale root ko bade ke neeche lagata hai. Agar `find(a)===find(b)` to pehle se connected → cycle. Time `O(α(n))` amortized, space `O(n)`.

```js
// Union-Find skeleton — path compression + union by rank
// Hinglish: boss dhoondo, rasta chhota karo, rank se jodo
function find(p, x) {
  while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; } // path half
  return x;
}
function union(p, rank, a, b) {
  a = find(p, a); b = find(p, b);
  if (a === b) return false; // pehle se juda / cycle
  if (rank[a] < rank[b]) [a, b] = [b, a];
  p[b] = a;
  if (rank[a] === rank[b]) rank[a]++;
  return true;
}
const p = Array.from({length: n}, (_, i) => i);
const rank = Array(n).fill(0);
```
## Redundant Connection

Add edges one by one. The first edge whose ends are already connected is the extra one. Return that edge.

[Redundant Connection](https://leetcode.com/problems/redundant-connection/)

```js
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
```

## Min Cost to Connect All Points

Manhattan edges between every pair. Sort cheap → expensive. Kruskal: union if they are not already connected. Sum those costs. That is MST.

[Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

```js
// Hinglish: find-union — ek-ek step comment dekho
// Union-find — Kruskal MST
// LC: https://leetcode.com/problems/min-cost-to-connect-all-points/
function minCostConnectPoints(points) {
  // Hinglish: step 1 — base case check karo
  const n = points.length;
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const w = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      edges.push([w, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);
  const p = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);
  let cost = 0, used = 0;
  for (const [w, a, b] of edges) {
    if (union(p, rank, a, b)) {
      cost += w;
      used++;
      if (used === n - 1) break;
    }
  }
  return cost;
}
```
