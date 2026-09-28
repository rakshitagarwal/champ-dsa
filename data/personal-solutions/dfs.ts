import type { SolutionGroup } from "@/data/solutions/types";

export const DFS_SOLUTIONS: SolutionGroup = {
  id: "dfs",
  title: "DFS",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 104,
      lcSlug: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      diff: "Easy",
      body: "DFS recursion — depth = 1 + max(left, right). Empty = 0.\n\n[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\nvar maxDepth = function(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n};\n```",
    },
    {
      id: 100,
      lcSlug: "same-tree",
      title: "Same Tree",
      diff: "Easy",
      body: "Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.\n\n[Same Tree](https://leetcode.com/problems/same-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {boolean}\n */\nvar isSameTree = function(p, q) {\n    \n    //base cases\n    if(p === null && q === null) return true;\n    if(p === null || q === null) return false;\n    \n    if(p.val === q.val){\n        \n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n        \n    }\n    \n    return false;\n    \n};\n```",
    },
    {
      id: 226,
      lcSlug: "invert-binary-tree",
      title: "Invert Binary Tree",
      diff: "Easy",
      body: "Har node ke left/right swap karo. Recursion se dono subtree invert.\n\n[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar invertTree = function(root) {\n    \n    if(root) {\n        [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];\n    }\n    \n    return root;\n    \n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 112,
      lcSlug: "path-sum",
      title: "Path Sum",
      diff: "Easy",
      body: "Root se leaf tak sum ghatate jao — leaf pe zero bache to rasta mil gaya.\n\n[Path Sum](https://leetcode.com/problems/path-sum/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @param {number} targetSum\n * @return {boolean}\n */\nvar hasPathSum = function(root, targetSum) {\n    \n    function recurse(root, currSum){\n        \n        if(root === null) return false;\n        \n        currSum += root.val;\n        \n        if(!root.left && !root.right){\n            return currSum === targetSum;\n        }\n        \n        return recurse(root.left, currSum) || recurse(root.right, currSum);\n        \n    }\n    \n    return recurse(root, 0);\n    \n};\n```",
    },
    {
      id: 200,
      lcSlug: "number-of-islands",
      title: "Number of Islands",
      diff: "Medium",
      body: "Grid pe DFS — land milte hi 4 directions me recurse, visited mark karo.\n\n[Number of Islands](https://leetcode.com/problems/number-of-islands/)\n\n```js\n// Time: O(m·n) · Space: O(m·n) recursion\nvar numIslands = function(grid) {\n  if (!grid.length) return 0;\n  const rows = grid.length, cols = grid[0].length;\n  let count = 0;\n\n  const dfs = (r, c) => {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== \"1\") return;\n    grid[r][c] = \"0\";\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  };\n\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === \"1\") {\n        count++;\n        dfs(r, c);\n      }\n    }\n  }\n  return count;\n};\n```",
    },
    {
      id: 236,
      lcSlug: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      diff: "Medium",
      body: "If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.\n\n[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nvar lowestCommonAncestor = function(root, p, q) {\n    \n    function dfs(node){\n        \n        //base cases\n        if(node === null) return null;\n        if(node === p || node === q) return node;\n        \n        const left = dfs(node.left);\n        const right = dfs(node.right);\n        \n        if(left && right) return node;\n        return left || right;\n        \n    }\n    \n    return dfs(root);\n    \n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 207,
      lcSlug: "course-schedule",
      title: "Course Schedule",
      diff: "Medium",
      body: "DFS cycle detection on prereq graph — visiting state pe cycle = false.\n\n[Course Schedule](https://leetcode.com/problems/course-schedule/)\n\n```js\n// Time: O(V+E) · Space: O(V+E)\nvar canFinish = function(numCourses, prerequisites) {\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) adj[b].push(a);\n\n  // 0=unseen, 1=visiting, 2=done\n  const state = new Array(numCourses).fill(0);\n\n  const dfs = (u) => {\n    if (state[u] === 1) return false;\n    if (state[u] === 2) return true;\n    state[u] = 1;\n    for (const v of adj[u]) if (!dfs(v)) return false;\n    state[u] = 2;\n    return true;\n  };\n\n  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return false;\n  return true;\n};\n```",
    },
      ],
    },
  ],
};
