import type { SolutionGroup } from "@/data/solutions/types";

export const GRAPHS_SOLUTIONS: SolutionGroup = {
  id: "graphs",
  title: "Graphs",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 200,
      lcSlug: "number-of-islands",
      title: "Number of Islands",
      diff: "Medium",
      body: "Graph view: har cell node, 4-neighbors edges — connected components = islands (DFS).\n\n[Number of Islands](https://leetcode.com/problems/number-of-islands/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\nvar numIslands = function(grid) {\n  const rows = grid.length, cols = grid[0].length;\n  let islands = 0;\n\n  const dfs = (r, c) => {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== \"1\") return;\n    grid[r][c] = \"0\";\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  };\n\n  for (let r = 0; r < rows; r++)\n    for (let c = 0; c < cols; c++)\n      if (grid[r][c] === \"1\") { islands++; dfs(r, c); }\n\n  return islands;\n};\n```",
    },
    {
      id: 133,
      lcSlug: "clone-graph",
      title: "Clone Graph",
      diff: "Medium",
      body: "Map old node → new node. DFS: if I already cloned it, return that. Else create, then clone neighbors.\n\n[Clone Graph](https://leetcode.com/problems/clone-graph/)\n\n```js\n// Time: O(n+e) · Space: O(n)\n/**\n * // Definition for a Node.\n * function Node(val, neighbors) {\n *    this.val = val === undefined ? 0 : val;\n *    this.neighbors = neighbors === undefined ? [] : neighbors;\n * };\n */\n\n/**\n * @param {Node} node\n * @return {Node}\n */\nvar cloneGraph = function(node) {\n    let visited = {};\n    \n    function dfs(node){\n        //base cases\n        if(!node) return node;\n        if(!!visited[node.val]) return visited[node.val];\n        \n        let root = new Node(node.val);\n        visited[node.val] = root;\n        \n        //recurrence relation\n        for(let neighbor of node.neighbors){\n            root.neighbors.push(dfs(neighbor))\n        }\n        \n        return root;\n    }\n    \n    return dfs(node);\n};\n```",
    },
    {
      id: 733,
      lcSlug: "flood-fill",
      title: "Flood Fill",
      diff: "Easy",
      body: "Start cell ka rang badlo — same rang wale padosi pakad ke bharo. Purana-naya same ho to wapas lao.\n\n[Flood Fill](https://leetcode.com/problems/flood-fill/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\nvar floodFill = function(image, sr, sc, color) {\n  const original = image[sr][sc];\n\n  function recurse(image, sr, sc) {\n    // check boundaries\n    if (\n      sr < 0 ||\n      sr > image.length - 1 ||\n      sc < 0 ||\n      sc > image[0].length - 1 ||\n      image[sr][sc] !== original ||\n      image[sr][sc] === color\n    )\n      return image;\n\n    image[sr][sc] = color;\n\n    recurse(image, sr + 1, sc);\n    recurse(image, sr - 1, sc);\n    recurse(image, sr, sc + 1);\n    recurse(image, sr, sc - 1);\n\n    return image;\n  }\n  return recurse(image, sr, sc);\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 207,
      lcSlug: "course-schedule",
      title: "Course Schedule",
      diff: "Medium",
      body: "Edge `b → a` means b before a. Count in-degree. Queue everyone at 0. Each taken course unlocks neighbors. If I took all, no cycle.\n\n[Course Schedule](https://leetcode.com/problems/course-schedule/)\n\n```js\n// Time: O(v+e) · Space: O(v+e)\n/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nvar canFinish = function(numCourses, prerequisites) {\n    \n    let adjList = {};\n    let visited = new Set();\n    \n    for(let [a,b] of prerequisites){\n        if(!adjList[a]){\n            adjList[a] = [b];\n        } else {\n            adjList[a].push(b);\n        }\n    }\n    \n    function dfs(curr){\n        \n        if(visited.has(curr)) return false;\n        \n        if(adjList[curr] === []) return true;\n        \n        visited.add(curr);\n        \n        if(adjList[curr]){\n            for(let neigh of adjList[curr]){\n                if(!dfs(neigh)){\n                    return false;\n                }\n            }\n        }\n        \n        visited.delete(curr);\n        adjList[curr] = [];\n        return true;\n        \n    }\n    \n    for(let key in adjList){\n        \n        if(!dfs(key)){\n            return false;\n        }\n    }\n    \n    return true;\n};\n```",
    },
    {
      id: 210,
      lcSlug: "course-schedule-ii",
      title: "Course Schedule II",
      diff: "Medium",
      body: "Topological sort (Kahn BFS) — indegree 0 queue, order build.\n\n[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)\n\n```js\n// Time: O(V+E) · Space: O(V+E)\nvar findOrder = function(numCourses, prerequisites) {\n  const adj = Array.from({ length: numCourses }, () => []);\n  const indeg = new Array(numCourses).fill(0);\n  for (const [a, b] of prerequisites) {\n    adj[b].push(a);\n    indeg[a]++;\n  }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);\n  const order = [];\n  while (q.length) {\n    const u = q.shift();\n    order.push(u);\n    for (const v of adj[u]) {\n      if (--indeg[v] === 0) q.push(v);\n    }\n  }\n  return order.length === numCourses ? order : [];\n};\n```",
    },
    {
      id: 417,
      lcSlug: "pacific-atlantic-water-flow",
      title: "Pacific Atlantic Water Flow",
      diff: "Medium",
      body: "Water flows down or flat. I BFS/DFS uphill from the Pacific edge and from the Atlantic edge. Cells in both sets are the answer.\n\n[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\n// Graph DFS — from oceans inland\nvar pacificAtlantic = function(heights) {\n  let m = heights.length;\n  let n = heights[0].length;\n\n  let pacificQueue = [];\n  let atlanticQueue = [];\n\n  for (let i = 0; i < m; i++) {\n    for (let j = 0; j < n; j++) {\n      if (i === 0 || j === 0) {\n        pacificQueue.push([i, j]);\n      }\n      if (i === m - 1 || j === n - 1) {\n        atlanticQueue.push([i, j]);\n      }\n    }\n  }\n\n  function bfs(queue) {\n    const isValid = (x, y) => x >= 0 && y >= 0 && x < m && y < n;\n    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];\n    const visited = Array.from(Array(m), () => new Array(n).fill(false));\n\n    while (queue.length) {\n      const [x, y] = queue.shift();\n      visited[x][y] = true;\n\n      for (let dir of directions) {\n        let nextX = x + dir[0];\n        let nextY = y + dir[1];\n        if (!isValid(nextX, nextY) || visited[nextX][nextY]) continue;\n        if (heights[nextX][nextY] >= heights[x][y]) {\n          queue.push([nextX, nextY]);\n        }\n      }\n    }\n\n    return visited;\n  }\n\n  const pacific = bfs(pacificQueue);\n  const atlantic = bfs(atlanticQueue);\n\n  const result = [];\n\n  for (let x = 0; x < m; x++) {\n    for (let y = 0; y < n; y++) {\n      if (pacific[x][y] && atlantic[x][y]) {\n        result.push([x, y]);\n      }\n    }\n  }\n\n  return result;\n};\n```",
    },
    {
      id: 994,
      lcSlug: "rotting-oranges",
      title: "Rotting Oranges",
      diff: "Medium",
      body: "Multi-source BFS — saare rotten se start, minutes = levels.\n\n[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\nvar orangesRotting = function(grid) {\n  const rows = grid.length, cols = grid[0].length;\n  const q = [];\n  let fresh = 0;\n  for (let r = 0; r < rows; r++)\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === 2) q.push([r, c]);\n      if (grid[r][c] === 1) fresh++;\n    }\n  if (!fresh) return 0;\n  let minutes = 0;\n  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n  while (q.length) {\n    const size = q.length;\n    let infected = false;\n    for (let i = 0; i < size; i++) {\n      const [r, c] = q.shift();\n      for (const [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        if (grid[nr][nc] !== 1) continue;\n        grid[nr][nc] = 2;\n        fresh--;\n        infected = true;\n        q.push([nr, nc]);\n      }\n    }\n    if (infected) minutes++;\n  }\n  return fresh === 0 ? minutes : -1;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 743,
      lcSlug: "network-delay-time",
      title: "Network Delay Time",
      diff: "Medium",
      body: "Dijkstra — min-heap distances, max dist among reachable.\n\n[Network Delay Time](https://leetcode.com/problems/network-delay-time/)\n\n```js\n// Time: O(E log V) · Space: O(V+E)\nvar networkDelayTime = function(times, n, k) {\n  const adj = Array.from({ length: n + 1 }, () => []);\n  for (const [u, v, w] of times) adj[u].push([v, w]);\n  const dist = new Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n  const pq = [[0, k]]; // [dist, node]\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (d > dist[u]) continue;\n    for (const [v, w] of adj[u]) {\n      if (d + w < dist[v]) {\n        dist[v] = d + w;\n        pq.push([dist[v], v]);\n      }\n    }\n  }\n  let ans = 0;\n  for (let i = 1; i <= n; i++) {\n    if (dist[i] === Infinity) return -1;\n    ans = Math.max(ans, dist[i]);\n  }\n  return ans;\n};\n```",
    },
    {
      id: 787,
      lcSlug: "cheapest-flights-within-k-stops",
      title: "Cheapest Flights Within K Stops",
      diff: "Medium",
      body: "Bellman-Ford K+1 relaxations — at most k stops.\n\n[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)\n\n```js\n// Time: O(K·E) · Space: O(n)\nvar findCheapestPrice = function(n, flights, src, dst, k) {\n  let dist = new Array(n).fill(Infinity);\n  dist[src] = 0;\n  for (let i = 0; i <= k; i++) {\n    const next = dist.slice();\n    for (const [u, v, w] of flights) {\n      if (dist[u] === Infinity) continue;\n      next[v] = Math.min(next[v], dist[u] + w);\n    }\n    dist = next;\n  }\n  return dist[dst] === Infinity ? -1 : dist[dst];\n};\n```",
    },
    {
      id: 127,
      lcSlug: "word-ladder",
      title: "Word Ladder",
      diff: "Hard",
      body: "Each word is a node. Neighbors = same length, one letter off. BFS from beginWord. First time I hit endWord, that distance is the answer. (Build a map of `*ot` patterns so I do not compare every pair.)\n\n[Word Ladder](https://leetcode.com/problems/word-ladder/)\n\n```js\n// Time: O(n·L²) · Space: O(n·L)\n// Graph BFS — one letter at a time\nvar ladderLength = function(beginWord, endWord, wordList) {\n  let set = new Set(wordList);\n  let queue = [[beginWord, 1]];\n\n  while (queue.length) {\n    let [currWord, count] = queue.shift();\n\n    if (currWord === endWord) {\n      return count;\n    }\n\n    for (let i = 0; i < 26; i++) {\n      for (let j = 0; j < currWord.length; j++) {\n        let letter = String.fromCharCode(97 + i);\n        let newWord = currWord.slice(0, j) + letter + currWord.slice(j + 1);\n\n        if (set.has(newWord)) {\n          queue.push([newWord, count + 1]);\n          set.delete(newWord);\n        }\n      }\n    }\n  }\n\n  return 0;\n};\n```",
    },
      ],
    },
  ],
};
