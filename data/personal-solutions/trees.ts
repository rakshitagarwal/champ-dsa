import type { SolutionGroup } from "@/data/solutions/types";

export const TREES_SOLUTIONS: SolutionGroup = {
  id: "trees",
  title: "Trees / BST",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 104,
      lcSlug: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      diff: "Easy",
      body: "Depth is 1 plus the deeper child. Empty tree is 0.\n\n[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function(root) {\n    if(!root) {\n        return 0;\n    }\n    \n    let depth = 0;\n    let queue = [root];\n    \n    while(queue.length){\n        let len = queue.length;\n        \n        for(let i = 0; i < len; i++){\n            let current = queue.shift();\n            if(current.left) queue.push(current.left);\n            if(current.right) queue.push(current.right);\n        }\n        \n        depth++\n    }\n    \n    return depth;\n};\n```",
    },
    {
      id: 226,
      lcSlug: "invert-binary-tree",
      title: "Invert Binary Tree",
      diff: "Easy",
      body: "Har node ke left/right swap karo. Recursion se dono subtree invert.\n\n[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar invertTree = function(root) {\n    \n    if(root) {\n        [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];\n    }\n    \n    return root;\n    \n};\n```",
    },
    {
      id: 102,
      lcSlug: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      diff: "Medium",
      body: "Queue. Snapshot length. Those nodes are one level.\n\n[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)\n\n```js\n// Time: O(n) · Space: O(w)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar levelOrder = function(root) {\n    if(root === null) return [];\n    \n    let res = [];\n    let queue = [root];\n    \n    while(queue.length){\n        let levelArr = [];\n        let levelSize = queue.length;\n        while(levelSize){\n            let current = queue.shift();\n            \n            if(current.left) queue.push(current.left);\n            if(current.right) queue.push(current.right);\n            \n            levelArr.push(current.val);\n            levelSize--;\n        }\n        res.push(levelArr);\n    }\n    \n    return res;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 543,
      lcSlug: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      diff: "Easy",
      body: "Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.\n\n[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar diameterOfBinaryTree = function(root) {\n    let maxD = 0;\n    \n    function dfs(node){\n        \n        if(!node) return 0;\n        \n        let left = dfs(node.left);\n        let right = dfs(node.right);\n        let currD = left + right;\n        \n        maxD = Math.max(currD, maxD);\n        \n        return Math.max(left+1, right+1)\n        \n    }\n    dfs(root);\n    \n    return maxD;\n    \n};\n```",
    },
    {
      id: 110,
      lcSlug: "balanced-binary-tree",
      title: "Balanced Binary Tree",
      diff: "Easy",
      body: "DFS height — agar subtree unbalanced to -1 bubble up.\n\n[Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\nvar isBalanced = function(root) {\n  const dfs = (node) => {\n    if (!node) return 0;\n    const L = dfs(node.left);\n    if (L === -1) return -1;\n    const R = dfs(node.right);\n    if (R === -1) return -1;\n    if (Math.abs(L - R) > 1) return -1;\n    return 1 + Math.max(L, R);\n  };\n  return dfs(root) !== -1;\n};\n```",
    },
    {
      id: 236,
      lcSlug: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      diff: "Medium",
      body: "If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.\n\n[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nvar lowestCommonAncestor = function(root, p, q) {\n    \n    function dfs(node){\n        \n        //base cases\n        if(node === null) return null;\n        if(node === p || node === q) return node;\n        \n        const left = dfs(node.left);\n        const right = dfs(node.right);\n        \n        if(left && right) return node;\n        return left || right;\n        \n    }\n    \n    return dfs(root);\n    \n};\n```",
    },
    {
      id: 199,
      lcSlug: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      diff: "Medium",
      body: "Har level ka aakhri node dikhta hai — level order me last wala uthao.\n\n[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)\n\n```js\n// Time: O(n) · Space: O(w)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[]}\n */\nvar rightSideView = function(root) {\n    \n    if(root === null) return [];\n    \n    let res = [];\n    let queue = [root];\n    \n    while(queue.length){\n        let level = [];\n        let levelSize = queue.length;\n        while(levelSize){\n            let current = queue.shift();\n            if(current.left) queue.push(current.left);\n            if(current.right) queue.push(current.right);\n            \n            level.push(current.val);\n            levelSize--;\n        }\n        res.push(level[level.length-1]);\n    }\n    \n    return res;\n    \n};\n```",
    },
      ],
    },
    {
      title: "BST",
      topics: [
    {
      id: 98,
      lcSlug: "validate-binary-search-tree",
      title: "Validate Binary Search Tree",
      diff: "Medium",
      body: "Har node `(lo, hi)` seema me hona chahiye. Left me jaao to `hi = node.val`, right me jaao to `lo = node.val`.\n\n[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)\n\n```js\n// Time: O(n) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isValidBST = function(root) {\n    \n    function recurse(root, min, max){\n        \n        //base cases\n        if(root === null) return true;\n        \n        if((root.val >= max || root.val <= min)){\n            return false;\n        }\n        \n        //recurrence relation\n        return recurse(root.left, min, root.val) && recurse(root.right, root.val, max);\n        \n    }\n    return recurse(root, -Infinity, Infinity)\n    \n};\n```",
    },
    {
      id: 230,
      lcSlug: "kth-smallest-element-in-a-bst",
      title: "Kth Smallest Element in a BST",
      diff: "Medium",
      body: "Inorder traversal sorted order deta hai — kth visit hi jawab hai. Iterative stack se karo, poora traverse mat karo.\n\n[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)\n\n```js\n// Time: O(h+k) · Space: O(h)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @param {number} k\n * @return {number}\n */\nvar kthSmallest = function(root, k) {\n    let arr = [];\n    inOrder(root, arr);\n    \n    return findKth(arr, k)\n};\n\nfunction inOrder(root, arr){\n    if(!root) return;\n    \n    inOrder(root.left, arr);\n    arr.push(root.val);\n    inOrder(root.right, arr);\n}\n\nfunction findKth(arr, k){\n    for(let i = 0; i < arr.length; i++){\n        if(i === k - 1) return arr[i];\n    }\n}\n```",
    },
    {
      id: 105,
      lcSlug: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      diff: "Medium",
      body: "Preorder ka pehla root hai, inorder me uski position left/right baant-ti hai. Map se O(1) lookup rakho.\n\n[Construct Binary Tree From Preorder And Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)\n\n```js\n// Time: O(n) · Space: O(n)\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {number[]} preorder\n * @param {number[]} inorder\n * @return {TreeNode}\n */\nvar buildTree = function(preorder, inorder) {\n    \n    function recurse(pStart, pEnd, inStart, inEnd){\n        \n        //base case\n        if(pStart > pEnd || inStart > inEnd) return null;\n        \n        let rootVal = preorder[pStart];\n        let inIndex = inorder.indexOf(rootVal);\n        let nLeft = inIndex - inStart;\n        \n        let root = new TreeNode(rootVal);\n        \n        root.left = recurse(pStart+1, pStart+nLeft, inStart, inIndex-1);\n        root.right = recurse(pStart+1+nLeft, pEnd, inIndex+1, inEnd);\n        \n        return root;\n        \n    }\n    \n    return recurse(0, preorder.length-1, 0, inorder.length-1);\n    \n};\n```",
    },
      ],
    },
  ],
};
