# Shortest Path

**Definition:** The cheapest / fastest route between points. Pick the algorithm by **weight type** — no weights → plain BFS ([Graphs](/patterns/graphs)); otherwise use the map below.

**When to use:** Network delay, cheapest flights with stops, all-pairs distances, or negative weights. If you see “minimum cost” plus edge weights, this page.

**How it works:** Dijkstra (non-negative, heap pops min, relax), Bellman-Ford (relax all edges each round; K stops = K+1 rounds + copy), Floyd-Warshall (try each intermediate `k`, all pairs). Start `dist` at `Infinity`; unreachable → `-1`.

**See also:** Unweighted steps → [Graphs BFS](/patterns/graphs). Min cost connect all → [MST](/patterns/mst) (different problem!).

## Active revision

Close the page and fill:

| Situation | Algorithm |
|-----------|-----------|
| No weights / unit weights | BFS |
| Non-negative weights, one source | Dijkstra |
| At most K edges / hops | Bellman-Ford (K+1 rounds) |
| Negative edges, no neg cycle needed | Bellman-Ford |
| Detect negative cycle | Bellman-Ford + Nth round |
| All pairs, V ≤ ~400 | Floyd-Warshall |

**Blank checklist:** weights? negative? hop limit? one source or all pairs? unreachable handling?

## Study notes

- **Relax:** `dist[v] = min(dist[v], dist[u] + w)` — only if `u` reachable.
- **Dijkstra:** never push negative weights; skip stale heap entries (`d !== dist[u]`).
- **Bellman-Ford + K:** use `next = dist.slice()` so one round = one hop (no chaining).
- **Floyd:** init `dist[i][i]=0`, undirected → both directions; `O(V³)`.
- **Traps:** using BFS on weighted edges; mutating dist in-place during K-hop BF; forgetting unreachable.
- **Complexity cheat:** Dijkstra heap `O((V+E) log V)`; BF `O(V·E)` or `O(K·E)`; Floyd `O(V³)`.

```js
// Dijkstra skeleton — min-heap, non-negative
// pop min dist; skip stale; relax edges → push new dist

// Bellman-Ford skeleton — K rounds (or V-1)
// for hop in 0..k: next = dist.slice(); relax all edges into next; dist = next

// Floyd skeleton
// for k, for i, for j: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```

## Network Delay Time (Dijkstra)

Dijkstra: always pick the unvisited node with smallest time. Relax its edges. Answer is the max time among nodes reached, or -1 if someone unreachable.

[Network Delay Time](https://leetcode.com/problems/network-delay-time/)

```js
// Time: O(n²) · Space: O(n+E)  — scan-min version
// Single-source shortest paths from node k
function networkDelayTime(times, n, k) {
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
```

## Network Delay Time — Heap Version

Same Dijkstra with a min-heap for `O((V+E) log V)`. Skip stale heap entries (`d !== dist[u]`).

```js
// Time: O((V+E) log V) · Space: O(V+E)
function networkDelayTimeHeap(times, n, k) {
  const g = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) g[u].push([v, w]);
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap = [[0, k]];
  const heapPush = (h, x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p][0] <= h[i][0]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  };
  const heapPop = (h) => {
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
  while (heap.length) {
    const [d, u] = heapPop(heap);
    if (d !== dist[u]) continue; // stale
    for (const [v, w] of g[u]) {
      if (dist[v] > d + w) {
        dist[v] = d + w;
        heapPush(heap, [dist[v], v]);
      }
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    ans = Math.max(ans, dist[i]);
  }
  return ans;
}
```

## Cheapest Flights Within K Stops (Bellman-Ford)

At most K stops = at most K+1 edges. Copy dist each round so you do not chain unlimited hops in one pass.

[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

```js
// Time: O(K·E) · Space: O(n)
function findCheapestPrice(n, flights, src, dst, k) {
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
```

## Negative Cycle Check (Bellman-Ford Extra Round)

N-1 rounds are normal; an update on the Nth round ⇒ negative cycle. Super-source trick: start all `dist` at 0 so disconnected components are covered too.

```js
// Time: O(V·E) · Space: O(V)
function hasNegativeCycle(n, edges) {
  const dist = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[v] > dist[u] + w) {
        dist[v] = dist[u] + w;
        updated = true;
        if (i === n - 1) return true;
      }
    }
    if (!updated) break;
  }
  return false;
}
```

## Find the City (Floyd-Warshall, All Pairs)

For each intermediate `k`: `dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])`. `O(V³)`, fine for `V ≤ ~400`.

[Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

```js
// Time: O(n³) · Space: O(n²)
function findTheCity(n, edges, distanceThreshold) {
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w;
  }
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] === Infinity || dist[k][j] === Infinity) continue;
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  let bestCity = -1, bestCnt = n;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) if (dist[i][j] <= distanceThreshold) cnt++;
    if (cnt <= bestCnt) {
      bestCnt = cnt;
      bestCity = i; // tie: larger index wins
    }
  }
  return bestCity;
}
```

**Remember:** No weight → BFS. Non-neg → Dijkstra. Hop limit / neg → Bellman. All pairs small V → Floyd. Connect-all min cost → MST, not shortest path.
