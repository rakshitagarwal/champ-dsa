# Topological Sort

**Definition:** DAG (Directed Acyclic Graph) me nodes ka aisa order jahan har edge `u → v` ke liye `u` pehle aaye. "Pehle ye, phir wo" — courses, build order, task dependencies. Cycle hui to order impossible hai.

**When to use:** Course schedule, build order, Alien Dictionary, ya koi "dependency pehle" wala sawal. Sirf directed acyclic graph pe kaam karta hai.

**How it works:** Do tareeke — Kahn (BFS): in-degree gino, 0 wale queue me, nikal ke neighbors unlock karo. DFS: visit ke baad stack me push, reverse karo. Cycle check: Kahn me `taken != n`, DFS me grey-node revisit (back-edge). Time `O(V+E)`.

```js
// Topological skeleton (Kahn)
// Hinglish: jiska indegree 0, queue me daalo
const q = nodes.filter(n => indeg[n] === 0);
while (q.length) { const u = q.shift(); for (const v of graph[u]) if (--indeg[v] === 0) q.push(v); }

// DFS topo skeleton — 3 colors
// Hinglish: 0=white, 1=grey (visiting), 2=black (done)
const state = Array(n).fill(0), stack = [];
// grey pe wapas aana = back-edge = cycle
```
## Course Schedule

Edge `b → a` means b before a. Count in-degree. Queue everyone at 0. Each taken course unlocks neighbors. If I took all, no cycle.

[Course Schedule](https://leetcode.com/problems/course-schedule/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph BFS — Kahn topo
// LC: https://leetcode.com/problems/course-schedule/
function canFinish(numCourses, prerequisites) {
  // Hinglish: step 1 — base case check karo
  const graph = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  let taken = 0;
  while (q.length) {
    const u = q.shift();
    taken++;
    for (const v of graph[u]) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return taken === numCourses;
}
```

## Course Schedule II (Order Return)

Topo order wapas bhi karna hai, sirf possible/impossible nahi. Kahn me nikalte time order array me push karo.

[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// LC: https://leetcode.com/problems/course-schedule-ii/
// Kahn — indegree queue se order
function findOrder(numCourses, prerequisites) {
  // Hinglish: graph + indegree banao
  const g = Array.from({length:numCourses}, ()=>[]);
  const indeg = Array(numCourses).fill(0);
  for (const [a,b] of prerequisites) { g[b].push(a); indeg[a]++; } // Hinglish: b -> a
  const q = []; for(let i=0;i<numCourses;i++) if(indeg[i]===0) q.push(i); // Hinglish: zero wale start
  const order = [];
  while(q.length){
    const u = q.shift();
    order.push(u); // Hinglish: order me daalo
    for(const v of g[u]){ indeg[v]--; if(indeg[v]===0) q.push(v); } // Hinglish: neighbor unlock
  }
  return order.length===numCourses ? order : []; // Hinglish: cycle to []
}
```

## Detect Cycle in Directed Graph (DFS 3-Color)

Grey node pe wapas aana = back-edge = cycle. White/grey/black colors se ek DFS me cycle pakdo.

```js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Detect cycle DFS — 3 colors
function hasCycleDFS(n, edges){
  // Hinglish: 0=white, 1=grey, 2=black
  const g = Array.from({length:n}, ()=>[]);
  for(const [u,v] of edges) g[u].push(v);
  const color = Array(n).fill(0);
  let hasCycle = false;
  const dfs = (u)=>{
    color[u]=1; // Hinglish: visiting
    for(const v of g[u]){
      if(color[v]===1) hasCycle=true; // Hinglish: back edge
      else if(color[v]===0) dfs(v);
    }
    color[u]=2; // Hinglish: done
  };
  for(let i=0;i<n;i++) if(color[i]===0) dfs(i);
  return hasCycle;
}
```
