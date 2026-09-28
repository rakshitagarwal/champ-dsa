import type { SolutionGroup } from "@/data/solutions/types";

export const BFS_SOLUTIONS: SolutionGroup = {
  id: "bfs",
  title: "BFS",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 102,
      lcSlug: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      diff: "Medium",
      body: "Queue. Snapshot length. Those nodes are one level.\n\n[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)\n\n```js\n// Time: O(n) · Space: O(w)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar levelOrder = function(root) {\n    if(root === null) return [];\n    \n    let res = [];\n    let queue = [root];\n    \n    while(queue.length){\n        let levelArr = [];\n        let levelSize = queue.length;\n        while(levelSize){\n            let current = queue.shift();\n            \n            if(current.left) queue.push(current.left);\n            if(current.right) queue.push(current.right);\n            \n            levelArr.push(current.val);\n            levelSize--;\n        }\n        res.push(levelArr);\n    }\n    \n    return res;\n};\n```",
    },
    {
      id: 733,
      lcSlug: "flood-fill",
      title: "Flood Fill",
      diff: "Easy",
      body: "BFS flood — queue se same-color neighbors paint.\n\n[Flood Fill](https://leetcode.com/problems/flood-fill/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\nvar floodFill = function(image, sr, sc, color) {\n  const original = image[sr][sc];\n  if (original === color) return image;\n  const rows = image.length, cols = image[0].length;\n  const q = [[sr, sc]];\n  image[sr][sc] = color;\n  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n  while (q.length) {\n    const [r, c] = q.shift();\n    for (const [dr, dc] of dirs) {\n      const nr = r + dr, nc = c + dc;\n      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n      if (image[nr][nc] !== original) continue;\n      image[nr][nc] = color;\n      q.push([nr, nc]);\n    }\n  }\n  return image;\n};\n```",
    },
    {
      id: 200,
      lcSlug: "number-of-islands",
      title: "Number of Islands",
      diff: "Medium",
      body: "Grid pe BFS — har land se queue se flood karo, islands count badhao.\n\n[Number of Islands](https://leetcode.com/problems/number-of-islands/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\nvar numIslands = function(grid) {\n  if (!grid.length) return 0;\n  const rows = grid.length, cols = grid[0].length;\n  let count = 0;\n  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n\n  const bfs = (sr, sc) => {\n    const q = [[sr, sc]];\n    grid[sr][sc] = \"0\";\n    while (q.length) {\n      const [r, c] = q.shift();\n      for (const [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        if (grid[nr][nc] !== \"1\") continue;\n        grid[nr][nc] = \"0\";\n        q.push([nr, nc]);\n      }\n    }\n  };\n\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === \"1\") {\n        count++;\n        bfs(r, c);\n      }\n    }\n  }\n  return count;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 994,
      lcSlug: "rotting-oranges",
      title: "Rotting Oranges",
      diff: "Medium",
      body: "Multi-source BFS — saare rotten se start, minutes = levels.\n\n[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\nvar orangesRotting = function(grid) {\n  const rows = grid.length, cols = grid[0].length;\n  const q = [];\n  let fresh = 0;\n  for (let r = 0; r < rows; r++)\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === 2) q.push([r, c]);\n      if (grid[r][c] === 1) fresh++;\n    }\n  if (!fresh) return 0;\n  let minutes = 0;\n  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n  while (q.length) {\n    const size = q.length;\n    let infected = false;\n    for (let i = 0; i < size; i++) {\n      const [r, c] = q.shift();\n      for (const [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        if (grid[nr][nc] !== 1) continue;\n        grid[nr][nc] = 2;\n        fresh--;\n        infected = true;\n        q.push([nr, nc]);\n      }\n    }\n    if (infected) minutes++;\n  }\n  return fresh === 0 ? minutes : -1;\n};\n```",
    },
    {
      id: 542,
      lcSlug: "01-matrix",
      title: "01 Matrix",
      diff: "Medium",
      body: "Saare zero queue me daalo, BFS chalao — pehli baar pahuche wahi nearest distance hai.\n\n[0 1 Matrix](https://leetcode.com/problems/01-matrix/)\n\n```js\n// Time: O(m·n) · Space: O(m·n)\n/**\n * @param {number[][]} mat\n * @return {number[][]}\n */\nvar updateMatrix = function(mat) {\n    let dirs = [[0,-1],[0,1],[1,0],[-1,0]];\n    let queue = [];\n    \n    for(let i = 0; i < mat.length; i++){\n        for(let j = 0; j < mat[0].length; j++){\n            if(mat[i][j] === 0){\n                queue.push([i, j, 0]);\n            } else {\n                mat[i][j] = Infinity;\n            }\n        }\n    }\n    \n    //bfs\n    \n    while(queue.length){\n        let [currX, currY, dist] = queue.shift();\n        \n        if(mat[currX][currY] > dist){\n            mat[currX][currY] = dist;\n        }\n        \n        for(let [x, y] of dirs){\n            let [nextX, nextY, nextVal] = [currX+x, currY+y, dist+1];\n            \n            if(nextX < 0 || nextX > mat.length-1 || nextY < 0 || nextY > mat[0].length-1) continue;\n            \n            if(mat[nextX][nextY] === Infinity){\n                mat[nextX][nextY] = nextVal;\n                queue.push([nextX, nextY, nextVal])\n            }\n        }\n    }\n    \n    return mat;\n};\n```",
    },
    {
      id: 133,
      lcSlug: "clone-graph",
      title: "Clone Graph",
      diff: "Medium",
      body: "Map old node → new node. DFS: if I already cloned it, return that. Else create, then clone neighbors.\n\n[Clone Graph](https://leetcode.com/problems/clone-graph/)\n\n```js\n// Time: O(n+e) · Space: O(n)\n/**\n * // Definition for a Node.\n * function Node(val, neighbors) {\n *    this.val = val === undefined ? 0 : val;\n *    this.neighbors = neighbors === undefined ? [] : neighbors;\n * };\n */\n\n/**\n * @param {Node} node\n * @return {Node}\n */\nvar cloneGraph = function(node) {\n    let visited = {};\n    \n    function dfs(node){\n        //base cases\n        if(!node) return node;\n        if(!!visited[node.val]) return visited[node.val];\n        \n        let root = new Node(node.val);\n        visited[node.val] = root;\n        \n        //recurrence relation\n        for(let neighbor of node.neighbors){\n            root.neighbors.push(dfs(neighbor))\n        }\n        \n        return root;\n    }\n    \n    return dfs(node);\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
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
