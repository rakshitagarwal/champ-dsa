# Union Find (DSU)

Each node points at a parent. `find` walks to the root (with compression). `union` merges two roots. Connectivity queries become `find(a) === find(b)`.

```js
function find(p, x) {
  while (p[x] !== x) {
    p[x] = p[p[x]]; // path compression
    x = p[x];
  }
  return x;
}
function union(p, rank, a, b) {
  a = find(p, a);
  b = find(p, b);
  if (a === b) return false; // already connected
  if (rank[a] < rank[b]) [a, b] = [b, a];
  p[b] = a;
  if (rank[a] === rank[b]) rank[a]++;
  return true;
}
```

## Number of Provinces

Union each edge, count roots — [Number of Provinces](https://leetcode.com/problems/number-of-provinces/).

```js
// Union-find — components
// LC: https://leetcode.com/problems/number-of-provinces/
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const p = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);
  let parts = n;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (!isConnected[i][j]) continue;
      if (union(p, rank, i, j)) parts--;
    }
  }
  return parts;
}
```

## Redundant Connection

First edge that does not merge is the extra — [Redundant Connection](https://leetcode.com/problems/redundant-connection/).

```js
// Union-find — extra edge closes a cycle
// LC: https://leetcode.com/problems/redundant-connection/
function findRedundantConnection(edges) {
  const n = edges.length;
  const p = Array.from({ length: n + 1 }, (_, i) => i);
  const rank = Array(n + 1).fill(0);
  for (const [a, b] of edges) {
    if (!union(p, rank, a, b)) return [a, b]; // already same root
  }
}
```

## Accounts Merge

Union emails that share an account — [Accounts Merge](https://leetcode.com/problems/accounts-merge/).

```js
// Union-find — merge groups, then collect
// LC: https://leetcode.com/problems/accounts-merge/
function accountsMerge(accounts) {
  const p = [], rank = [];
  const id = new Map();
  const owner = new Map();
  const add = (email) => {
    if (id.has(email)) return;
    const i = p.length;
    id.set(email, i);
    p.push(i);
    rank.push(0);
  };
  for (const [name, ...emails] of accounts) {
    for (const e of emails) {
      add(e);
      owner.set(e, name);
    }
    for (let i = 1; i < emails.length; i++) union(p, rank, id.get(emails[0]), id.get(emails[i]));
  }
  const buckets = new Map();
  for (const [email, i] of id) {
    const r = find(p, i);
    if (!buckets.has(r)) buckets.set(r, []);
    buckets.get(r).push(email);
  }
  return [...buckets.values()].map((list) => {
    list.sort();
    return [owner.get(list[0]), ...list];
  });
}
```

**More:** [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/), [Number of Connected Components](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/), [Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps/).
