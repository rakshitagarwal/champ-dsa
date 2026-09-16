# MST

**Definition:** Minimum Spanning Tree saare points ko sabse kam total edge weight me jodta hai, bina loop ke. "Minimum cost to connect all" dikhe to samjho MST.

**When to use:** Connect all points/nodes with minimum cost, network design, clustering. Edges sorted mil rahe hon to Kruskal, dense graph ho to Prim.

**How it works:** Kruskal — edges chhote se bade sort karo, loop na bane to lo (DSU se check), `n-1` edges pe ruko. Prim — ek node se start, hamesha sabse sasta next edge jodo (min-heap). Time Kruskal `O(E log E)`, Prim `O((V+E) log V)`.

```js
// DSU skeleton — find with path compression + union
// DSU: same root ⇒ same component
const parent = Array.from({ length: n }, (_, i) => i);
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
function union(a, b) { parent[find(a)] = find(b); }

// Kruskal skeleton — sort edges; union if endpoints in different sets
// Kruskal: sort edges; skip cycle; stop at n−1 edges
edges.sort((a, b) => a[0] - b[0]);
let cost = 0, used = 0;
for (const [w, u, v] of edges) {
  if (find(u) !== find(v)) { union(u, v); cost += w; if (++used === n - 1) break; }
}
```
## Min Cost to Connect All Points (Kruskal + DSU)

Har pair ka Manhattan edge banao, sort karo, DSU se loop check karke jodo. `n-1` edges milte hi answer.

[Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

```js
// Kruskal MST on complete graph (Manhattan edges)
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
  edges.sort((a, b) => a[0] - b[0]); // cheapest edge first
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let cost = 0, used = 0;
  for (const [w, u, v] of edges) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { // connects two components, no cycle
      parent[ru] = rv;
      cost += w;
      if (++used === n - 1) break; // MST has n-1 edges
    }
  }
  return cost;
}
```
