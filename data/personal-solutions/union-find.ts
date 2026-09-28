import type { SolutionGroup } from "@/data/solutions/types";

export const UNION_FIND_SOLUTIONS: SolutionGroup = {
  id: "union-find",
  title: "Union Find / DSU",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 547,
      lcSlug: "number-of-provinces",
      title: "Number of Provinces",
      diff: "Medium",
      body: "Union-Find se bhi provinces gin sakte hain. Connected cities ko union karo.\n\n[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)\n\n```js\n// Time: O(n²) · Space: O(n)\n/**\n * @param {number[][]} isConnected\n * @return {number}\n */\nvar findCircleNum = function(isConnected) {\n    \n    let adj = {};\n    \n    for(let i = 0; i < isConnected.length; i++){\n        for(let j = 0; j < isConnected[0].length; j++){\n            \n            let val = isConnected[i][j];\n            \n            if(val === 1){\n                if(!adj[i]){\n                    adj[i] = [j];\n                } else {\n                    adj[i].push(j);\n                }\n            }\n            \n        }\n    }\n    \n    let visited = new Set();\n    let count = 0;\n    \n    for(let key in adj){\n        let keyNum = parseInt(key);\n        count += dfs(keyNum);\n    }\n    \n    function dfs(currNode){\n        if(visited.has(currNode)) return 0;\n        visited.add(currNode);\n        \n        let neighbours = adj[currNode];\n        \n        for(let n of neighbours){\n            dfs(n);\n        }\n        \n        return 1;\n    }\n    \n    return count;\n    \n};\n```",
    },
    {
      id: 684,
      lcSlug: "redundant-connection",
      title: "Redundant Connection",
      diff: "Medium",
      body: "Union-Find — pehla edge jo already same parent me jode = redundant.\n\n[Redundant Connection](https://leetcode.com/problems/redundant-connection/)\n\n```js\n// Time: O(n) · Space: O(n)\nvar findRedundantConnection = function(edges) {\n  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [u, v] of edges) {\n    const pu = find(u), pv = find(v);\n    if (pu === pv) return [u, v];\n    parent[pu] = pv;\n  }\n  return [];\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 721,
      lcSlug: "accounts-merge",
      title: "Accounts Merge",
      diff: "Medium",
      body: "Union emails via DSU, phir account name + sorted emails.\n\n[Accounts Merge](https://leetcode.com/problems/accounts-merge/)\n\n```js\n// Time: O(n·α(n) + n log n) · Space: O(n)\nvar accountsMerge = function(accounts) {\n  const parent = new Map();\n  const emailToName = new Map();\n  const find = (x) => {\n    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));\n    return parent.get(x);\n  };\n  const union = (a, b) => {\n    const pa = find(a), pb = find(b);\n    if (pa !== pb) parent.set(pa, pb);\n  };\n\n  for (const acc of accounts) {\n    const name = acc[0];\n    for (let i = 1; i < acc.length; i++) {\n      const email = acc[i];\n      if (!parent.has(email)) parent.set(email, email);\n      emailToName.set(email, name);\n      union(acc[1], email);\n    }\n  }\n\n  const groups = new Map();\n  for (const email of parent.keys()) {\n    const root = find(email);\n    if (!groups.has(root)) groups.set(root, []);\n    groups.get(root).push(email);\n  }\n\n  const res = [];\n  for (const [, emails] of groups) {\n    emails.sort();\n    res.push([emailToName.get(emails[0]), ...emails]);\n  }\n  return res;\n};\n```",
    },
    {
      id: 947,
      lcSlug: "most-stones-removed-with-same-row-or-column",
      title: "Most Stones Removed with Same Row or Column",
      diff: "Medium",
      body: "DSU on row/col — stones - components = removable.\n\n[Most Stones Removed with Same Row or Column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/)\n\n```js\n// Time: O(n) · Space: O(n)\nvar removeStones = function(stones) {\n  const parent = new Map();\n  const find = (x) => {\n    if (!parent.has(x)) parent.set(x, x);\n    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));\n    return parent.get(x);\n  };\n  const union = (a, b) => {\n    const pa = find(a), pb = find(b);\n    if (pa !== pb) parent.set(pa, pb);\n  };\n  for (const [r, c] of stones) union(r, ~c);\n  const roots = new Set();\n  for (const [r, c] of stones) roots.add(find(r));\n  return stones.length - roots.size;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 323,
      lcSlug: "number-of-connected-components-in-an-undirected-graph",
      title: "Number of Connected Components in an Undirected Graph",
      diff: "Medium",
      premium: true,
      body: "DSU se jodo, groups gino. Har successful union ek component kam karta hai.\n\n[Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)\n\n*Premium question — kholne ke liye LeetCode premium chahiye.*\n\n```js\n// Time: O(v+e) · Space: O(v)\n/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {number}\n */\nvar countComponents = function(n, edges) {\n    let count = 0;\n    let graph = {};\n    \n    for(let i = 0; i < n; i++){\n        graph[i] = [];\n    }\n    \n    for(let [u, v] of edges){\n        graph[u].push(v);\n        graph[v].push(u);\n    }\n    \n    let visited = new Set();\n    \n    function dfs(node){\n        if(visited.has(node)) return 0;\n        visited.add(node);\n        \n        for(let n of graph[node]){\n            dfs(n);\n        }\n        \n        return 1;\n    }\n    \n    for(let key in graph){\n        key = parseInt(key);\n        count += dfs(key);\n    }\n    \n    return count;\n};\n```",
    },
    {
      id: 1584,
      lcSlug: "min-cost-to-connect-all-points",
      title: "Min Cost to Connect All Points",
      diff: "Medium",
      body: "Kruskal + DSU on Manhattan edges, ya Prim.\n\n[Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)\n\n```js\n// Time: O(n² log n) · Space: O(n²)\nvar minCostConnectPoints = function(points) {\n  const n = points.length;\n  const edges = [];\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      const d =\n        Math.abs(points[i][0] - points[j][0]) +\n        Math.abs(points[i][1] - points[j][1]);\n      edges.push([d, i, j]);\n    }\n  }\n  edges.sort((a, b) => a[0] - b[0]);\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  let cost = 0, used = 0;\n  for (const [d, u, v] of edges) {\n    const pu = find(u), pv = find(v);\n    if (pu === pv) continue;\n    parent[pu] = pv;\n    cost += d;\n    if (++used === n - 1) break;\n  }\n  return cost;\n};\n```",
    },
      ],
    },
  ],
};
