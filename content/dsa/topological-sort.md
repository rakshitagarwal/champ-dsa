# Topological Sort

**Definition:** DAG (Directed Acyclic Graph) me nodes ka aisa order jahan har edge `u → v` ke liye `u` pehle aaye. "Pehle ye, phir wo" — courses, build order, task dependencies. Cycle hui to order impossible hai.

**When to use:** Course schedule, build order, Alien Dictionary, ya koi "dependency pehle" wala sawal. Sirf directed acyclic graph pe kaam karta hai.

**How it works:** Do tareeke — Kahn (BFS): in-degree gino, 0 wale queue me, nikal ke neighbors unlock karo. DFS: visit ke baad stack me push, reverse karo. Cycle check: Kahn me `taken != n`, DFS me grey-node revisit (back-edge). Time `O(V+E)`.

```js
// Topological skeleton (Kahn)
// Kahn: enqueue all indegree-zero nodes
const q = nodes.filter(n => indeg[n] === 0);
while (q.length) { const u = q.shift(); for (const v of graph[u]) if (--indeg[v] === 0) q.push(v); }

// DFS topo skeleton — 3 colors
// DFS colors: unvisited / on stack / finished
const state = Array(n).fill(0), stack = [];
// revisiting a grey node means back-edge — cycle detected
```
## Course Schedule

Edge `b → a` means b before a. Count in-degree. Queue everyone at 0. Each taken course unlocks neighbors. If I took all, no cycle.

[Course Schedule](https://leetcode.com/problems/course-schedule/)

```js
// LC: https://leetcode.com/problems/course-schedule/
// cycle in prereq graph ⇒ false
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    
    let adjList = {};
    let visited = new Set();
    
    for(let [a,b] of prerequisites){
        if(!adjList[a]){
            adjList[a] = [b];
        } else {
            adjList[a].push(b);
        }
    }
    
    function dfs(curr){
        
        if(visited.has(curr)) return false;
        
        if(adjList[curr] === []) return true;
        
        visited.add(curr);
        
        if(adjList[curr]){
            for(let neigh of adjList[curr]){
                if(!dfs(neigh)){
                    return false;
                }
            }
        }
        
        visited.delete(curr);
        adjList[curr] = [];
        return true;
        
    }
    
    for(let key in adjList){
        
        if(!dfs(key)){
            return false;
        }
    }
    
    return true;
};
```

## Course Schedule II (Order Return)

Topo order wapas bhi karna hai, sirf possible/impossible nahi. Kahn me nikalte time order array me push karo.

[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

```js
// Kahn topological sort returns one valid order
// LC: https://leetcode.com/problems/course-schedule-ii/
function findOrder(numCourses, prerequisites) {
  const g = Array.from({length:numCourses}, ()=>[]);
  const indeg = Array(numCourses).fill(0);
  for (const [a,b] of prerequisites) { g[b].push(a); indeg[a]++; }
  const q = []; for(let i=0;i<numCourses;i++) if(indeg[i]===0) q.push(i);
  const order = [];
  while(q.length){
    const u = q.shift();
    order.push(u);
    for(const v of g[u]){ indeg[v]--; if(indeg[v]===0) q.push(v); }
  }
  return order.length===numCourses ? order : []; // empty if cycle
}
```

## Detect Cycle in Directed Graph (DFS 3-Color)

Grey node pe wapas aana = back-edge = cycle. White/grey/black colors se ek DFS me cycle pakdo.

```js
// Detect cycle DFS — 3 colors
function hasCycleDFS(n, edges){
  // three-color DFS for cycle detection
  const g = Array.from({length:n}, ()=>[]);
  for(const [u,v] of edges) g[u].push(v);
  const color = Array(n).fill(0);
  let hasCycle = false;
  const dfs = (u)=>{
    color[u]=1; // mark node as on current DFS path
    for(const v of g[u]){
      if(color[v]===1) hasCycle=true; // edge to grey node ⇒ cycle
      else if(color[v]===0) dfs(v);
    }
    color[u]=2; // mark node finished (black)
  };
  for(let i=0;i<n;i++) if(color[i]===0) dfs(i);
  return hasCycle;
}
```
