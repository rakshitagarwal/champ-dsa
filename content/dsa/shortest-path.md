# Shortest Path

**Definition:** Do points ke beech sabse tez/sasta rasta. Algorithm weight type se chuno — bina weight ho to seedha BFS, warna neeche wala map dekho.

**When to use:** Network delay, cheapest flights with stops, all-pairs distances, ya negative weights. "Sabse kam cost" + weights dikhe to ye page kholo.

**How it works:** Dijkstra (non-negative, heap se min nikalo, relax karo), Bellman-Ford (har round saare edges relax, K stops = K+1 rounds, copy rakho), Floyd-Warshall (har `k` beech me daalo, all pairs). `dist` `Infinity` se start karo, unreachable ka `-1` handle karo.

```js
// Shortest path skeleton — Dijkstra (min-heap, non-negative)
// Hinglish: sabse chhota dist wala nikalo, relax karo
// dist[v] = min(dist[v], dist[u] + w)

// Shortest path skeleton — Bellman-Ford (K rounds)
// Hinglish: har round copy pe relax, same round ka reuse nahi
// for hop in 0..k: next = dist.slice(); relax all edges into next
```
## Network Delay Time (Dijkstra)

Dijkstra: always pick the unvisited node with smallest time. Relax its edges. Answer is the max time among nodes I reached, or -1 if someone is unreachable.

[Network Delay Time](https://leetcode.com/problems/network-delay-time/)

```js
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
```

## Network Delay Time — Heap Version

Same Dijkstra, min-heap se `O((V+E) log V)`. Purani heap entry dikhe to skip karo (`d !== dist[u]`).

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/network-delay-time/ (heap wala fast)
// Dijkstra with heap — O((V+E) log V)
function networkDelayTimeHeap(times, n, k){
  // Hinglish: graph banao
  const g = Array.from({length:n+1}, ()=>[]);
  for(const [u,v,w] of times) g[u].push([v,w]);
  const dist = Array(n+1).fill(Infinity);
  dist[k]=0;
  // Hinglish: min-heap [dist, node]
  const heap = [[0,k]];
  const heapPush = (h, x)=>{ h.push(x); let i=h.length-1; while(i>0){ const p=(i-1)>>1; if(h[p][0]<=h[i][0]) break; [h[p],h[i]]=[h[i],h[p]]; i=p; } };
  const heapPop = (h)=>{ const top=h[0], last=h.pop(); if(h.length){ h[0]=last; let i=0; while(true){ let s=i,l=2*i+1,r=l+1; if(l<h.length && h[l][0]<h[s][0]) s=l; if(r<h.length && h[r][0]<h[s][0]) s=r; if(s===i) break; [h[i],h[s]]=[h[s],h[i]]; i=s; } } return top; };
  while(heap.length){
    const [d,u] = heapPop(heap);
    if(d!==dist[u]) continue; // Hinglish: purana entry skip
    for(const [v,w] of g[u]){
      if(dist[v] > d+w){ dist[v]=d+w; heapPush(heap, [dist[v], v]); } // Hinglish: relax
    }
  }
  let ans = 0;
  for(let i=1;i<=n;i++){ if(dist[i]===Infinity) return -1; ans=Math.max(ans, dist[i]); } // Hinglish: unreachable to -1
  return ans;
}
```

## Cheapest Flights Within K Stops (Bellman-Ford)

At most K stops = at most K+1 edges. Bellman-Ford: copy dist, relax every flight, K+1 rounds. Do not reuse the same array in one round (that would be unlimited hops).

[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

```js
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
```

## Negative Cycle Check (Bellman-Ford Extra Round)

N-1 rounds normal chalao, Nth round me bhi update hua to negative cycle hai. Super source trick: sab `dist` 0 se start karo taaki disconnected components bhi check hon.

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Negative cycle check (agar puche)
function hasNegativeCycle(n, edges){
  // Hinglish: n-1 rounds normal, nth me update = cycle
  const dist=Array(n).fill(0); // Hinglish: sab 0 se start (super source)
  for(let i=0;i<n;i++){
    let updated=false;
    for(const [u,v,w] of edges) if(dist[v] > dist[u]+w){ dist[v]=dist[u]+w; updated=true; if(i===n-1) return true; } // Hinglish: nth round update = cycle
    if(!updated) break;
  }
  return false;
}
```

## Find the City (Floyd-Warshall, All Pairs)

Har `k` ko intermediate banao: `dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])`. `O(V^3)`, `V <= 400` tak theek. Transitively closure bhi same.

[Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

```js
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
```
