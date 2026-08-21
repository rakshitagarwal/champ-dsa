# Union Find

Each node points at a parent. `find` walks to the boss (and flattens the path). `union` hangs one boss under the other. If two nodes already share a boss, this edge would make a cycle.

```js
function find(p, x) {
  while (p[x] !== x) {
    p[x] = p[p[x]];
    x = p[x];
  }
  return x;
}
function union(p, rank, a, b) {
  a = find(p, a);
  b = find(p, b);
  if (a === b) return false;
  if (rank[a] < rank[b]) [a, b] = [b, a];
  p[b] = a;
  if (rank[a] === rank[b]) rank[a]++;
  return true;
}
```

## Redundant Connection

Add edges one by one. The first edge whose ends are already connected is the extra one. Return that edge.

[Redundant Connection](https://leetcode.com/problems/redundant-connection/)

```js
// Union-find — extra edge
// LC: https://leetcode.com/problems/redundant-connection/
function findRedundantConnection(edges) {
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
// Union-find — Kruskal MST
// LC: https://leetcode.com/problems/min-cost-to-connect-all-points/
function minCostConnectPoints(points) {
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
