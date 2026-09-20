# MST

**Definition:** Minimum Spanning Tree saare nodes ko **sabse kam total edge weight** se jodta hai, **bina cycle** ke. Tree me exactly `n-1` edges. "Minimum cost to connect all" dikhe to MST — ye **shortest path nahi** hai ([Shortest Path](/patterns/shortest-path) alag).

**When to use:** Connect all points/nodes with minimum cost, network wiring, clustering. Edges mil rahe / complete graph → Kruskal + DSU. Dense + grow from one node → Prim + heap.

**How it works:** **Kruskal** — edges chhote → bade sort; DSU se loop check; alag components ho to lo; `n-1` edges pe ruko. **Prim** — ek node se start; min-heap se sabse sasta next edge into tree. Time Kruskal `O(E log E)`, Prim heap `O((V+E) log V)`.

**See also:** DSU details → [Union Find](/patterns/union-find). Graph basics → [Graphs](/patterns/graphs).

## Active revision

1. Kruskal steps from memory (sort → find → union → stop at n-1).
2. Prim: "always add cheapest edge that touches the tree."
3. Say when NOT MST: "shortest from A to B" → Dijkstra/BFS.

**Blank checklist:** connect ALL nodes? undirected? weights non-neg (usual)? need tree or path?

## Study notes

- **MST ≠ shortest path.** Path A→B can use edges outside MST.
- **Cut property:** cheapest edge across a cut is safe for some MST.
- **Kruskal needs DSU** so you skip edges that close a cycle.
- **Prim** = Dijkstra-shaped growth but tracks edge into tree, not path dist (same heap pattern often).
- **Traps:** forgetting `used === n-1` early stop; directed edges (MST is undirected); calling Dijkstra for "connect all."
- **Complexity:** n points complete graph → `E = n(n-1)/2` so Kruskal `O(n² log n)`.

```js
// DSU skeleton — find with path compression + union
const parent = Array.from({ length: n }, (_, i) => i);
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
function union(a, b) {
  parent[find(a)] = find(b);
}

// Kruskal skeleton — sort edges; union if different sets
edges.sort((a, b) => a[0] - b[0]); // [w, u, v]
let cost = 0, used = 0;
for (const [w, u, v] of edges) {
  if (find(u) !== find(v)) {
    union(u, v);
    cost += w;
    if (++used === n - 1) break;
  }
}

// Prim skeleton (heap) — grow tree from node 0
// heap entries [w, node]; skip if already in tree; add neighbors
```

## Min Cost to Connect All Points (Kruskal + DSU)

Har pair ka Manhattan edge banao, sort karo, DSU se loop check karke jodo. `n-1` edges milte hi answer.

[Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

```js
// Time: O(n² log n) · Space: O(n²)
// Kruskal MST on complete graph (Manhattan edges)
function minCostConnectPoints(points) {
  const n = points.length;
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const w =
        Math.abs(points[i][0] - points[j][0]) +
        Math.abs(points[i][1] - points[j][1]);
      edges.push([w, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let cost = 0, used = 0;
  for (const [w, u, v] of edges) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      cost += w;
      if (++used === n - 1) break;
    }
  }
  return cost;
}
```

## Prim (Heap) — Same Problem Shape

Start at 0; hamesha tree ke bahar ka sabse sasta edge lo. `inMST` mark; stale heap skip.

```js
// Time: O(n² log n) worst with dense edges · Space: O(n²)
function minCostConnectPointsPrim(points) {
  const n = points.length;
  const inMST = Array(n).fill(false);
  const heap = [[0, 0]]; // [cost, node]
  let cost = 0, taken = 0;

  const push = (h, x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p][0] <= h[i][0]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  };
  const pop = (h) => {
    const top = h[0], last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      while (true) {
        let s = i, l = 2 * i + 1, r = l + 1;
        if (l < h.length && h[l][0] < h[s][0]) s = l;
        if (r < h.length && h[r][0] < h[s][0]) s = r;
        if (s === i) break;
        [h[i], h[s]] = [h[s], h[i]];
        i = s;
      }
    }
    return top;
  };

  while (heap.length && taken < n) {
    const [w, u] = pop(heap);
    if (inMST[u]) continue;
    inMST[u] = true;
    cost += w;
    taken++;
    for (let v = 0; v < n; v++) {
      if (inMST[v]) continue;
      const dw =
        Math.abs(points[u][0] - points[v][0]) +
        Math.abs(points[u][1] - points[v][1]);
      push(heap, [dw, v]);
    }
  }
  return cost;
}
```

**Yaad rakho:** Connect all + min total weight + no cycle = MST. Kruskal = sort + DSU. Prim = grow with heap. A→B cheapest = Shortest Path, not MST.
