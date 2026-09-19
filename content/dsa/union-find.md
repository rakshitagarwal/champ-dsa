# Union Find

**Definition:** Union-Find (Disjoint Set Union, DSU) nodes ko disjoint sets me rakhta hai, `find` (path compression) aur `union` (rank/size se) lagbhag `O(α(n))` me. Har node parent ko point karta hai; root hi representative ("boss").

**When to use:** "Ye connected hain kya?", groups merge, undirected graph me cycle detect, components ginna, ya MST (Kruskal — sabse sasta edge jodo agar already connected nahi).

**How it works:** `find(x)` root tak jata hai aur rasta flat karta hai (`p[x]=p[p[x]]`). `union(a,b)` chhote rank wale root ko bade ke neeche lagata hai. Agar `find(a)===find(b)` to pehle se connected → cycle. Time `O(α(n))` amortized, space `O(n)`.

## Study notes

- **APIs:** `find(x)`, `union(a,b)` → bool (false if already same = cycle for undirected).
- **Optimizations:** path compression + union by rank/size — almost `O(1)`.
- **Use cases:** connected components, redundant edge, Kruskal MST, accounts merge.
- **Init:** `parent[i]=i`, `rank[i]=0`.
- **Traps:** forget path compression; union without find roots; 0- vs 1-index nodes.
- **Vs BFS components:** DSU better when many merge queries / edge stream.

```js
// Union-Find skeleton — path compression + union by rank
// boss dhoondo, rasta smaller do, rank from append
function find(p, x) {
  while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; } // path half
  return x;
}
function union(p, rank, a, b) {
  a = find(p, a); b = find(p, b);
  if (a === b) return false; // already same set — union would create cycle
  if (rank[a] < rank[b]) [a, b] = [b, a];
  p[b] = a;
  if (rank[a] === rank[b]) rank[a]++;
  return true;
}
const p = Array.from({length: n}, (_, i) => i);
const rank = Array(n).fill(0);
```
## Redundant Connection

Add edges one by one. The first edge whose ends are already connected is the extra one. Return that edge.

[Redundant Connection](https://leetcode.com/problems/redundant-connection/)

```js
// Time: O(n) · Space: O(n)
// First edge connecting already-connected nodes is redundant
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
// Time: O(n) · Space: O(n)
// Kruskal MST on complete graph (Manhattan edges)
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

## Number of Provinces (Union-Find)

Union-Find se bhi provinces gin sakte hain. Connected cities ko union karo.

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

```js
// Time: O(n²) · Space: O(n)
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    
    let adj = {};
    
    for(let i = 0; i < isConnected.length; i++){
        for(let j = 0; j < isConnected[0].length; j++){
            
            let val = isConnected[i][j];
            
            if(val === 1){
                if(!adj[i]){
                    adj[i] = [j];
                } else {
                    adj[i].push(j);
                }
            }
            
        }
    }
    
    let visited = new Set();
    let count = 0;
    
    for(let key in adj){
        let keyNum = parseInt(key);
        count += dfs(keyNum);
    }
    
    function dfs(currNode){
        if(visited.has(currNode)) return 0;
        visited.add(currNode);
        
        let neighbours = adj[currNode];
        
        for(let n of neighbours){
            dfs(n);
        }
        
        return 1;
    }
    
    return count;
    
};
```

## Accounts Merge

Same email wale accounts merge karo. Email ko node, account ke emails ko union karo.

[Accounts Merge](https://leetcode.com/problems/accounts-merge/)

```js
// Time: O(n) · Space: O(n)
// Union emails within same account; merge DSU components
function accountsMerge(accounts) {
  const id=new Map(); let eid=0;
  for(const acc of accounts) for(let i=1;i<acc.length;i++) if(!id.has(acc[i])) id.set(acc[i], eid++);
  const p=Array.from({length:eid},(_,i)=>i), rank=Array(eid).fill(0);
  const find=(x)=>{ while(p[x]!==x){ p[x]=p[p[x]]; x=p[x]; } return x; };
  const union=(a,b)=>{ a=find(a); b=find(b); if(a===b) return; if(rank[a]<rank[b]) [a,b]=[b,a]; p[b]=a; if(rank[a]===rank[b]) rank[a]++; };
  for(const acc of accounts) for(let i=2;i<acc.length;i++) union(id.get(acc[1]), id.get(acc[i]));
  const groups=new Map();
  for(const [email,i] of id) { const r=find(i); if(!groups.has(r)) groups.set(r, []); groups.get(r).push(email); }
  const ans=[];
  for(const emails of groups.values()){ emails.sort();
    let name="";
    for(const acc of accounts) if(acc.includes(emails[0])){ name=acc[0]; break; }
    ans.push([name, ...emails]);
  }
  return ans;
}
```
