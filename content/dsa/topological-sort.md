# Topological Sort

**Definition:** On a DAG (Directed Acyclic Graph), a topological order lists nodes so that for every edge `u → v`, `u` appears before `v`. Think “do this first, then that” — courses, build order, task dependencies. If there is a cycle, no valid order exists.

**When to use:** Course schedule, build order, Alien Dictionary, or any “dependency first” question. Only on **directed** graphs; for undirected components use [Graphs](/patterns/graphs) / [Union Find](/patterns/union-find).

**How it works:** Two methods — **Kahn (BFS):** count in-degrees, enqueue zeros, unlock neighbors as you go. **DFS:** push onto a stack after visiting, then reverse. Cycle check: Kahn if `taken != n`; DFS if you revisit a grey node (back-edge). Time `O(V+E)`.

**See also:** Base BFS/DFS → [Graphs](/patterns/graphs).

## Active revision

1. Draw Kahn: indegree → queue zeros → unlock neighbors.
2. Draw 3-color DFS: white / grey / black; grey revisit = cycle.
3. Say aloud: edge direction `prereq → course` or `course needs prereq` — stick to one.

**Blank checklist:** directed? need order or only possible? how detect cycle? multiple valid orders OK?

## Study notes

- **Only on DAG.** Cycle ⇒ no topo order (return false / empty).
- **Kahn (BFS):** `indeg[]`; queue zeros; process; `--indeg[v]===0` enqueue; if processed count `< n` → cycle.
- **DFS:** 3 colors (0 white / 1 grey / 2 black); grey revisit = cycle; push on finish; reverse stack = order.
- **Alien Dictionary:** edges from consecutive word diffs, then topo; invalid prefix (`abc` before `ab`) is a separate check.
- **Traps:** wrong edge direction; `adjList[curr] === []` never true in JS (use length / delete); forgetting nodes with no edges.
- **Checklist:** directed? any valid order vs detect cycle only?

### Decision table

| Need | Method |
|------|--------|
| Valid order list | Kahn (or DFS finish-stack reversed) |
| Possible or not (cycle) | Kahn count / 3-color DFS |
| Undirected cycle | Not topo — UF or parent-DFS on [Graphs](/patterns/graphs) |

```js
// Topological skeleton (Kahn) — O(V+E)
const g = Array.from({ length: n }, () => []);
const indeg = Array(n).fill(0);
for (const [a, b] of edges) {
  // example: b before a  →  edge b → a
  g[b].push(a);
  indeg[a]++;
}
const q = [];
for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
const order = [];
while (q.length) {
  const u = q.shift();
  order.push(u);
  for (const v of g[u]) if (--indeg[v] === 0) q.push(v);
}
// cycle if order.length !== n

// DFS topo skeleton — 3 colors
const state = Array(n).fill(0); // 0 white, 1 grey, 2 black
const stack = [];
let cycle = false;
function dfs(u) {
  if (state[u] === 1) { cycle = true; return; } // back-edge
  if (state[u] === 2) return;
  state[u] = 1;
  for (const v of g[u]) dfs(v);
  state[u] = 2;
  stack.push(u); // finished
}
for (let i = 0; i < n; i++) if (state[i] === 0) dfs(i);
const topo = stack.reverse(); // only valid if !cycle
```

## Course Schedule

Edge `b → a` means b before a (a depends on b). DFS with path-set: revisit on current path ⇒ cycle. Or Kahn: take all courses?

[Course Schedule](https://leetcode.com/problems/course-schedule/)

```js
// Time: O(V+E) · Space: O(V+E)
// cycle in prereq graph ⇒ false
var canFinish = function(numCourses, prerequisites) {
  let adjList = {};
  let visited = new Set();

  for (let [a, b] of prerequisites) {
    if (!adjList[a]) {
      adjList[a] = [b];
    } else {
      adjList[a].push(b);
    }
  }

  function dfs(curr) {
    if (visited.has(curr)) return false;

    visited.add(curr);

    if (adjList[curr]) {
      for (let neigh of adjList[curr]) {
        if (!dfs(neigh)) {
          return false;
        }
      }
    }

    visited.delete(curr);
    adjList[curr] = []; // memo: no cycle from here
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return false;
    }
  }

  return true;
};
```

## Course Schedule II (Order Return)

Return a topo order, not only possible/impossible. With Kahn, push into an order array as you dequeue.

[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

```js
// Time: O(V+E) · Space: O(V+E)
// Kahn topological sort returns one valid order
function findOrder(numCourses, prerequisites) {
  const g = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    g[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of g[u]) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return order.length === numCourses ? order : []; // empty if cycle
}
```

## Detect Cycle in Directed Graph (DFS 3-Color)

Returning to a grey node = back-edge = cycle. White/grey/black colors catch a cycle in one DFS.

```js
// Time: O(V+E) · Space: O(V+E)
// Detect cycle DFS — 3 colors
function hasCycleDFS(n, edges) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) g[u].push(v);
  const color = Array(n).fill(0);
  let hasCycle = false;
  const dfs = (u) => {
    color[u] = 1; // grey — on current DFS path
    for (const v of g[u]) {
      if (color[v] === 1) hasCycle = true; // back-edge
      else if (color[v] === 0) dfs(v);
    }
    color[u] = 2; // black — finished
  };
  for (let i = 0; i < n; i++) if (color[i] === 0) dfs(i);
  return hasCycle;
}
```

**Remember:** Dependencies + directed = topo. Kahn for order; 3-color DFS for cycle. Undirected cycle → UF or parent-DFS on [Graphs](/patterns/graphs).
