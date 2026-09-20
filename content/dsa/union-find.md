# Union Find

**Definition:** Union-Find (Disjoint Set Union, DSU) keeps nodes in disjoint sets. With `find` (path compression) and `union` (by rank/size), operations are nearly `O(α(n))` — practically `O(1)`. Each node points to a parent; the **root** is the set representative.

**When to use:** “Are these connected?”, merge groups, undirected cycle (redundant edge), count components, Kruskal MST ([MST](/patterns/mst)). Better than BFS when you have an edge stream / many merge queries.

**How it works:** `find(x)` walks to the root and flattens the path. `union(a,b)` links roots (lower rank under higher). If `find(a)===find(b)` already, same set → undirected cycle / redundant. Space `O(n)`.

**See also:** Kruskal uses this → [MST](/patterns/mst). Components via DFS → [Graphs](/patterns/graphs).

## Active revision

1. Write `find` + `union` from memory (path compression + rank).
2. Redundant Connection in one sentence: "first edge whose ends already share a root."
3. Provinces: union `i-j` when matrix 1; count unique roots.

**Blank checklist:** undirected merges? need count of components? detecting cycle while adding edges?

## Study notes

- **APIs:** `find(x)`, `union(a,b)` → bool (`false` if already same = cycle for undirected).
- **Optimizations:** path compression + union by rank/size → almost `O(1)`.
- **Use cases:** connected components, redundant edge, Kruskal, accounts merge.
- **Init:** `parent[i]=i`, `rank[i]=0` (0- or 1-index carefully).
- **Traps:** union without finding roots first; recursive find without compression; using DSU on directed "prereq" graphs (use [Topo](/patterns/topological-sort)).
- **Vs BFS components:** DSU better when many online merges / edge list; BFS/DFS fine for one-shot grid/matrix.

### Decision table

| Need | Tool |
|------|------|
| Online merges / redundant edge | Union-Find |
| One-shot grid/matrix components | DFS/BFS on [Graphs](/patterns/graphs) |
| Min cost connect all | Kruskal + DSU → [MST](/patterns/mst) |
| Directed dependencies | [Topological Sort](/patterns/topological-sort), not UF |

```js
// Union-Find skeleton — path compression + union by rank
function find(p, x) {
  while (p[x] !== x) {
    p[x] = p[p[x]]; // path halving
    x = p[x];
  }
  return x;
}
function union(p, rank, a, b) {
  a = find(p, a);
  b = find(p, b);
  if (a === b) return false; // already same — would create cycle
  if (rank[a] < rank[b]) [a, b] = [b, a];
  p[b] = a;
  if (rank[a] === rank[b]) rank[a]++;
  return true;
}
const p = Array.from({ length: n }, (_, i) => i);
const rank = Array(n).fill(0);
```

## Redundant Connection

Add edges one by one. First edge whose ends are already connected is the extra one.

[Redundant Connection](https://leetcode.com/problems/redundant-connection/)

```js
// Time: O(n · α(n)) · Space: O(n)
function findRedundantConnection(edges) {
  const n = edges.length;
  const p = Array.from({ length: n + 1 }, (_, i) => i);
  const rank = Array(n + 1).fill(0);
  for (const [a, b] of edges) {
    if (!union(p, rank, a, b)) return [a, b];
  }
}
```

## Number of Provinces (Union-Find)

When `isConnected[i][j]===1`, union(i, j). Unique roots = provinces. (DFS version → [Graphs](/patterns/graphs).)

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

```js
// Time: O(n² · α(n)) · Space: O(n)
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const p = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);

  function find(x) {
    while (p[x] !== x) {
      p[x] = p[p[x]];
      x = p[x];
    }
    return x;
  }
  function union(a, b) {
    a = find(a);
    b = find(b);
    if (a === b) return;
    if (rank[a] < rank[b]) [a, b] = [b, a];
    p[b] = a;
    if (rank[a] === rank[b]) rank[a]++;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1) union(i, j);
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) if (find(i) === i) count++;
  return count;
};
```

## Min Cost to Connect All Points

Kruskal = sort Manhattan edges + DSU. Full walkthrough → [MST](/patterns/mst).

[Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

```js
// Time: O(n² log n) · Space: O(n²)
// Kruskal MST — DSU decides which edges join the tree
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

## Accounts Merge

Same email ⇒ same person. Treat emails as nodes; union emails in one account. Then sort emails per root and attach the name.

[Accounts Merge](https://leetcode.com/problems/accounts-merge/)

```js
// Time: O(A · E log E) · Space: O(E)  — A accounts, E emails
function accountsMerge(accounts) {
  const id = new Map();
  let eid = 0;
  for (const acc of accounts) {
    for (let i = 1; i < acc.length; i++) {
      if (!id.has(acc[i])) id.set(acc[i], eid++);
    }
  }
  const p = Array.from({ length: eid }, (_, i) => i);
  const rank = Array(eid).fill(0);
  const find = (x) => {
    while (p[x] !== x) {
      p[x] = p[p[x]];
      x = p[x];
    }
    return x;
  };
  const union = (a, b) => {
    a = find(a);
    b = find(b);
    if (a === b) return;
    if (rank[a] < rank[b]) [a, b] = [b, a];
    p[b] = a;
    if (rank[a] === rank[b]) rank[a]++;
  };
  for (const acc of accounts) {
    for (let i = 2; i < acc.length; i++) {
      union(id.get(acc[1]), id.get(acc[i]));
    }
  }
  const groups = new Map();
  for (const [email, i] of id) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(email);
  }
  const ans = [];
  for (const emails of groups.values()) {
    emails.sort();
    let name = "";
    for (const acc of accounts) {
      if (acc.includes(emails[0])) {
        name = acc[0];
        break;
      }
    }
    ans.push([name, ...emails]);
  }
  return ans;
}
```

**Remember:** Same root = same group. Union false = already connected. Kruskal = sort + DSU. Directed deps = topo, not UF.
