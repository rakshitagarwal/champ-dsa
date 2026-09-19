import type { SolutionGroup } from "./types";

export const TREES_SOLUTIONS: SolutionGroup = {
  id: "trees",
  title: "Trees",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "same-tree",
      title: "Same Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=b3Gt9UZ_Ufw&ab_channel=AlgoJS",
      body: `Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.

[Same Tree](https://leetcode.com/problems/same-tree/)

\`\`\`js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    
    //base cases
    if(p === null && q === null) return true;
    if(p === null || q === null) return false;
    
    if(p.val === q.val){
        
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        
    }
    
    return false;
    
};
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=vT2ySdkTn0k&ab_channel=AlgoJS",
      body: `Depth is 1 plus the deeper child. Empty tree is 0.

[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  // Hinglish: step 1 — base case check karo
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "minimum-depth-of-binary-tree",
      title: "Minimum Depth of Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=hmvao4o22-w&t=160s&ab_channel=AlgoJS",
      body: `Leaf tak sabse chhota rasta — ek bachcha missing ho to doosre se jao, min mat lo blindly.

[Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

\`\`\`js
// Hinglish: leaf tak chhota rasta — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-depth-of-binary-tree/
function minDepth(root) {
  // Hinglish: step 1 — base case
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right); // Hinglish: ek taraf hi hai
  if (!root.right) return 1 + minDepth(root.left);
  const l = minDepth(root.left), r = minDepth(root.right);
  return 1 + (l < r ? l : r); // Hinglish: chhota uthao
}
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "path-sum",
      title: "Path Sum",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=BKCxvtVxDrQ&ab_channel=AlgoJS",
      body: `Root se leaf tak sum ghatate jao — leaf pe zero bache to rasta mil gaya.

[Path Sum](https://leetcode.com/problems/path-sum/)

\`\`\`js
// Hinglish: sum ghatate jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/path-sum/
function hasPathSum(root, targetSum) {
  // Hinglish: step 1 — base case
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum; // Hinglish: leaf pe check
  const rest = targetSum - root.val; // Hinglish: bacha hua
  return hasPathSum(root.left, rest) || hasPathSum(root.right, rest);
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "binary-tree-paths",
      title: "Binary Tree Paths",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=J8ZJfz8CqRo&t=184s&ab_channel=AlgoJS",
      body: `Root se leaf tak rasta string me jodte jao — leaf pe pakdo, wapas aao.

[Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)

\`\`\`js
// Hinglish: rasta likhte jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-paths/
function binaryTreePaths(root) {
  // Hinglish: step 1 — answer lo
  const out = [];
  const dfs = (node, path) => {
    if (!node) return;
    const cur = path === "" ? String(node.val) : path + "->" + node.val; // Hinglish: jodte jao
    if (!node.left && !node.right) { out.push(cur); return; } // Hinglish: leaf pe pakdo
    dfs(node.left, cur);
    dfs(node.right, cur);
  };
  dfs(root, "");
  return out;
}
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "invert-binary-tree",
      title: "Invert Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Wz-5PlBYGhA&ab_channel=AlgoJS",
      body: `Har node ke left/right swap karo. Recursion se dono subtree invert.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/invert-binary-tree/
function invertTree(root) {
  // Hinglish: null to wapas
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]; // Hinglish: swap
  return root;
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "lowest-common-ancestor-of-a-binary-search-tree",
      title: "Lowest Common Ancestor of a BST",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=fehixeGZY9k&ab_channel=AlgoJS",
      body: `BST property use karo — dono chhote to left, dono bade to right, warna yehi node LCA hai.

[Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

\`\`\`js
// Hinglish: compare karke disha — ek-ek step comment dekho
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
function lowestCommonAncestor(root, p, q) {
  // Hinglish: step 1 — node lo
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) node = node.left; // Hinglish: dono chhote
    else if (p.val > node.val && q.val > node.val) node = node.right; // Hinglish: dono bade
    else return node; // Hinglish: beech me phas gaya = LCA
  }
}
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "symmetric-tree",
      title: "Symmetric Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=L8S1Ij93NY4&ab_channel=AlgoJS",
      body: `Mirror check karo — left ka left, right ke right se mile to symmetric hai.

[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

\`\`\`js
// Hinglish: aaina check — ek-ek step comment dekho
// LC: https://leetcode.com/problems/symmetric-tree/
function isSymmetric(root) {
  // Hinglish: step 1 — jodi compare karo
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return same(a.left, b.right) && same(a.right, b.left); // Hinglish: cross compare
  };
  return same(root, root);
}
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Q2M9GYs_kuM&t=286s&ab_channel=AlgoJS",
      body: `Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — height down, diameter across
// LC: https://leetcode.com/problems/diameter-of-binary-tree/
function diameterOfBinaryTree(root) {
  // Hinglish: step 1 — base case check karo
  let best = 0;
  const height = (node) => {
    if (!node) return 0;
    const L = height(node.left);
    const R = height(node.right);
    best = Math.max(best, L + R);
    return 1 + Math.max(L, R);
  };
  height(root);
  return best;
}
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "range-sum-of-bst",
      title: "Range Sum of BST",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=AdX9Gd7GJYs&t=41s&ab_channel=AlgoJS",
      body: `Range se bahar wala hissa kaato — low se chhota ho to sirf right, high se bada ho to sirf left.

[Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/)

\`\`\`js
// Hinglish: bekaar hissa kaato — ek-ek step comment dekho
// LC: https://leetcode.com/problems/range-sum-of-bst/
function rangeSumBST(root, low, high) {
  // Hinglish: step 1 — base case
  if (!root) return 0;
  if (root.val < low) return rangeSumBST(root.right, low, high); // Hinglish: left bekaar
  if (root.val > high) return rangeSumBST(root.left, low, high); // Hinglish: right bekaar
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "find-all-the-lonely-nodes",
      title: "Find All Lonely Nodes",
      diff: "Easy",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=YATikdLWwsw&ab_channel=AlgoJS",
      body: `Jis node ka bhai-behen na ho (single child) wo lonely hai — DFS me pakadte jao.

[Find All Lonely Nodes](https://leetcode.com/problems/find-all-the-lonely-nodes/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: akela bachcha pakdo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-all-the-lonely-nodes/ (Premium)
function getLonelyNodes(root) {
  // Hinglish: step 1 — answer lo
  const out = [];
  const dfs = (node) => {
    if (!node) return;
    if (node.left && !node.right) out.push(node.left.val); // Hinglish: right nahi to left akela
    if (node.right && !node.left) out.push(node.right.val); // Hinglish: left nahi to right akela
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return out;
}
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "subtree-of-another-tree",
      title: "Subtree of Another Subtree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=amZ7QmuIIII&ab_channel=AlgoJS",
      body: `\`s\` me \`t\` jaisa subtree hai kya? Har node ko root maan ke sameTree check.

[Subtree of Another Subtree](https://leetcode.com/problems/subtree-of-another-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/subtree-of-another-tree/
function isSubtree(root, subRoot) {
  // Hinglish: same tree helper
  const same=(a,b)=>{
    if(!a&&!b) return true;
    if(!a||!b||a.val!==b.val) return false;
    return same(a.left,b.left) && same(a.right,b.right);
  };
  if (!root) return false;
  if (same(root, subRoot)) return true; // Hinglish: yahan se match?
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot); // Hinglish: left/right me dhoondo
}
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "validate-binary-search-tree",
      title: "Validate Binary Search Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=i1m-rywzw68&t=8s&ab_channel=AlgoJS",
      body: `Har node \`(lo, hi)\` seema me hona chahiye. Left me jaao to \`hi = node.val\`, right me jaao to \`lo = node.val\`.

[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

\`\`\`js
// Hinglish: bounds check — ek-ek step comment dekho
// LC: https://leetcode.com/problems/validate-binary-search-tree/
function isValidBST(root) {
  // Hinglish: step 1 — bounds helper lo
  const check = (node, lo, hi) => {
    if (!node) return true;
    if (node.val <= lo || node.val >= hi) return false; // Hinglish: seema tooti
    return check(node.left, lo, node.val) && check(node.right, node.val, hi);
  };
  return check(root, -Infinity, Infinity);
}
\`\`\``,
    },
    {
      id: 13,
      lcSlug: "sum-root-to-leaf-numbers",
      title: "Sum Root to Leaf Numbers",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=9p32QQ3DuR0&ab_channel=AlgoJS",
      body: `Number aage badhate jao (x10 + digit) — leaf pe jod do.

[Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)

\`\`\`js
// Hinglish: number banate jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sum-root-to-leaf-numbers/
function sumNumbers(root) {
  // Hinglish: step 1 — total lo
  let ans = 0;
  const dfs = (node, cur) => {
    if (!node) return;
    cur = cur * 10 + node.val; // Hinglish: digit jodo
    if (!node.left && !node.right) { ans += cur; return; } // Hinglish: leaf pe jodo
    dfs(node.left, cur);
    dfs(node.right, cur);
  };
  dfs(root, 0);
  return ans;
}
\`\`\``,
    },
    {
      id: 14,
      lcSlug: "path-sum-ii",
      title: "Path Sum II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=_fvGemi7ao8&t=1s&ab_channel=AlgoJS",
      body: `Path Sum jaisa, par raste bhi chahiye — path array saath le jao, leaf pe copy rakho.

[Path Sum II](https://leetcode.com/problems/path-sum-ii/)

\`\`\`js
// Hinglish: rasta saath le jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/path-sum-ii/
function pathSum(root, targetSum) {
  // Hinglish: step 1 — answer lo
  const out = [];
  const dfs = (node, rest, path) => {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right && rest === node.val) out.push([...path]); // Hinglish: mil gaya
    else {
      dfs(node.left, rest - node.val, path);
      dfs(node.right, rest - node.val, path);
    }
    path.pop(); // Hinglish: wapas aao
  };
  dfs(root, targetSum, []);
  return out;
}
\`\`\``,
    },
    {
      id: 15,
      lcSlug: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Uub7EVnp0P8&ab_channel=AlgoJS",
      body: `Har level ka aakhri node dikhta hai — level order me last wala uthao.

[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

\`\`\`js
// Hinglish: har level ka aakhri — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-right-side-view/
function rightSideView(root) {
  // Hinglish: step 1 — queue lo
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const n = q.length;
    const next = [];
    for (let i = 0; i < n; i++) {
      const node = q[i];
      if (i === n - 1) out.push(node.val); // Hinglish: aakhri dikhega
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 16,
      lcSlug: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=oI42cbNqzwA&ab_channel=AlgoJS",
      body: `Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree BFS — by level
// LC: https://leetcode.com/problems/binary-tree-level-order-traversal/
function levelOrder(root) {
  // Hinglish: step 1 — base case check karo
  if (!root) return [];
  const out = [], queue = [root];
  while (queue.length) {
    const level = [], n = queue.length;
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    out.push(level);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 17,
      lcSlug: "kth-smallest-element-in-a-bst",
      title: "Kth Smallest Element in a BST",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=za9OrjpbaCs&ab_channel=AlgoJS",
      body: `Inorder traversal sorted order deta hai — kth visit hi jawab hai. Iterative stack se karo, poora traverse mat karo.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

\`\`\`js
// Hinglish: inorder walk — ek-ek step comment dekho
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
function kthSmallest(root, k) {
  // Hinglish: step 1 — stack lo
  const st = [];
  let node = root;
  while (node || st.length) {
    while (node) { st.push(node); node = node.left; } // Hinglish: left dabao
    node = st.pop();
    if (--k === 0) return node.val; // Hinglish: kth mila
    node = node.right;
  }
}
\`\`\``,
    },
    {
      id: 18,
      lcSlug: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=6B6xk-ZqWN8&ab_channel=AlgoJS",
      body: `If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — first node that sees both
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
function lowestCommonAncestor(root, p, q) {
  // Hinglish: step 1 — base case check karo
  if (!root || root === p || root === q) return root;
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root;
  return L || R;
}
\`\`\``,
    },
    {
      id: 19,
      lcSlug: "deepest-leaves-sum",
      title: "Deepest Leaves Sum",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Z0q319GTuDE&ab_channel=AlgoJS",
      body: `Level order me aakhri level ka sum uthao — BFS me har level overwrite karta jao.

[Deepest Leaves Sum](https://leetcode.com/problems/deepest-leaves-sum/)

\`\`\`js
// Hinglish: aakhri level jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/deepest-leaves-sum/
function deepestLeavesSum(root) {
  // Hinglish: step 1 — queue lo
  let q = [root], ans = 0;
  while (q.length) {
    const next = [];
    ans = 0; // Hinglish: naya level, naya sum
    for (const node of q) {
      ans += node.val; // Hinglish: is level ka jodo
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    q = next;
  }
  return ans; // Hinglish: aakhri level ka sum bacha
}
\`\`\``,
    },
    {
      id: 20,
      lcSlug: "balance-a-binary-search-tree",
      title: "Balance a Binary Search Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=-z4g2qW-d3M&ab_channel=AlgoJS",
      body: `Inorder nikalo (sorted milega), phir beech se ped banao — Convert Sorted Array wala tareeka.

[Balance a Binary Search Tree](https://leetcode.com/problems/balance-a-binary-search-tree/)

\`\`\`js
// Hinglish: nikalo phir banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/balance-a-binary-search-tree/
function balanceBST(root) {
  // Hinglish: step 1 — inorder nikalo
  const vals = [];
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    vals.push(node.val);
    inorder(node.right);
  };
  inorder(root);
  const build = (l, r) => {
    if (l > r) return null;
    const m = (l + r) >> 1; // Hinglish: beech root banao
    const node = { val: vals[m], left: null, right: null };
    node.left = build(l, m - 1);
    node.right = build(m + 1, r);
    return node;
  };
  return build(0, vals.length - 1);
}
\`\`\``,
    },
    {
      id: 21,
      lcSlug: "find-leaves-of-binary-tree",
      title: "Find Leaves of a Binary Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=sWRmUgjRFoY&ab_channel=AlgoJS",
      body: `Height nikalo — same height wale same round me jhadte hain. Postorder me group karo.

[Find Leaves of a Binary Tree](https://leetcode.com/problems/find-leaves-of-binary-tree/)

\`\`\`js
// Hinglish: height se group karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-leaves-of-binary-tree/
function findLeaves(root) {
  // Hinglish: step 1 — groups lo
  const out = [];
  const dfs = (node) => {
    if (!node) return -1;
    const h = 1 + Math.max(dfs(node.left), dfs(node.right)); // Hinglish: height nikalo
    if (out.length === h) out.push([]);
    out[h - 1].push(node.val); // Hinglish: height wale group me daalo
    return h;
  };
  dfs(root);
  return out;
}
\`\`\``,
    },
    {
      id: 22,
      lcSlug: "binary-tree-vertical-order-traversal",
      title: "Binary Tree Vertical Order Traversal",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=f4T35dCZi-0&ab_channel=AlgoJS",
      body: `Column number do (left -1, right +1) — BFS order me column map bharo, sort karke nikalo.

[Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: column number do — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-vertical-order-traversal/ (Premium)
function verticalOrder(root) {
  // Hinglish: step 1 — khaali ho to khaali do
  if (!root) return [];
  const cols = new Map();
  const q = [[root, 0]];
  let mn = 0, mx = 0;
  while (q.length) {
    const [node, c] = q.shift();
    if (!cols.has(c)) cols.set(c, []);
    cols.get(c).push(node.val); // Hinglish: BFS order me daalo
    if (c < mn) mn = c;
    if (c > mx) mx = c;
    if (node.left) q.push([node.left, c - 1]); // Hinglish: left column kam
    if (node.right) q.push([node.right, c + 1]);
  }
  const out = [];
  for (let c = mn; c <= mx; c++) out.push(cols.get(c)); // Hinglish: left se right nikalo
  return out;
}
\`\`\``,
    },
    {
      id: 23,
      lcSlug: "n-ary-tree-level-order-traversal",
      title: "N Array Tree Level Order Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=0UYmdpvG_Gg&ab_channel=AlgoJS",
      body: `Binary wala hi funda — bas children loop me daalo, level-wise nikalo.

[N Array Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

\`\`\`js
// Hinglish: level dar level — ek-ek step comment dekho
// LC: https://leetcode.com/problems/n-ary-tree-level-order-traversal/
function levelOrder(root) {
  // Hinglish: step 1 — khaali check karo
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const next = [], level = [];
    for (const node of q) {
      level.push(node.val);
      for (const ch of node.children) next.push(ch); // Hinglish: saare bachche daalo
    }
    out.push(level);
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 24,
      lcSlug: "count-good-nodes-in-binary-tree",
      title: "Count Good Nodes In Binary Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=UwhjCzvBB8Y&ab_channel=AlgoJS",
      body: `Ab tak ka max saath le jao — node usse kam nahi to good hai, max update karke aage badho.

[Count Good Nodes In Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)

\`\`\`js
// Hinglish: max saath le jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/count-good-nodes-in-binary-tree/
function goodNodes(root) {
  // Hinglish: step 1 — count lo
  let ans = 0;
  const dfs = (node, mx) => {
    if (!node) return;
    if (node.val >= mx) { ans++; mx = node.val; } // Hinglish: record toda to good
    dfs(node.left, mx);
    dfs(node.right, mx);
  };
  dfs(root, -Infinity);
  return ans;
}
\`\`\``,
    },
    {
      id: 25,
      lcSlug: "binary-tree-longest-consecutive-sequence",
      title: "Binary Tree Longest Consecutive Sequence",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=Bna4S8Auomc&ab_channel=AlgoJS",
      body: `Parent se +1 hai to chain badhao, nahi to 1 se restart karo — max yaad rakho.

[Binary Tree Longest Consecutive Sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: chain badhao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/ (Premium)
function longestConsecutive(root) {
  // Hinglish: step 1 — best lo
  let best = 0;
  const dfs = (node, parentVal, len) => {
    if (!node) return;
    const cur = node.val === parentVal + 1 ? len + 1 : 1; // Hinglish: jude to badhao
    if (cur > best) best = cur;
    dfs(node.left, node.val, cur);
    dfs(node.right, node.val, cur);
  };
  dfs(root, null, 0);
  return best;
}
\`\`\``,
    },
    {
      id: 26,
      lcSlug: "binary-tree-zigzag-level-order-traversal",
      title: "Binary Tree Zigzag Level Order Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=fq9bj4qOp30&ab_channel=AlgoJS",
      body: `Level order jaisa, bas alternate level ulti — flag se direction badlo.

[Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

\`\`\`js
// Hinglish: ek seedha ek ulta — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
function zigzagLevelOrder(root) {
  // Hinglish: step 1 — queue lo
  if (!root) return [];
  const out = [];
  let q = [root], flip = false;
  while (q.length) {
    const level = [];
    const n = q.length;
    const next = [];
    for (let i = 0; i < n; i++) {
      const node = q[i];
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    out.push(flip ? level.reverse() : level); // Hinglish: alternate ulta
    flip = !flip;
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 27,
      lcSlug: "keys-and-rooms",
      title: "Keys and Rooms",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Ro-QwE-5fio&ab_channel=AlgoJS",
      body: `0 se DFS chalao — mili key se naya kamra kholo. Sab khule to true.

[Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)

\`\`\`js
// Hinglish: chaabi se kamra — ek-ek step comment dekho
// LC: https://leetcode.com/problems/keys-and-rooms/
function canVisitAllRooms(rooms) {
  // Hinglish: step 1 — dekhe hue yaad rakho
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const r = stack.pop();
    for (const k of rooms[r]) {
      if (!seen.has(k)) { seen.add(k); stack.push(k); } // Hinglish: nayi chaabi naya kamra
    }
  }
  return seen.size === rooms.length;
}
\`\`\``,
    },
    {
      id: 28,
      lcSlug: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree From Preorder And Inorder Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Zr2NDgOPsTE&ab_channel=AlgoJS",
      body: `Preorder ka pehla root hai, inorder me uski position left/right baant-ti hai. Map se O(1) lookup rakho.

[Construct Binary Tree From Preorder And Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

\`\`\`js
// Hinglish: root pakdo, baanto, recurse — ek-ek step comment dekho
// LC: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
function buildTree(preorder, inorder) {
  // Hinglish: step 1 — inorder positions yaad rakho
  const pos = new Map();
  inorder.forEach((v, i) => pos.set(v, i));
  let pre = 0;
  const build = (l, r) => {
    if (l > r) return null;
    const rootVal = preorder[pre++]; // Hinglish: pehla root hai
    const m = pos.get(rootVal); // Hinglish: inorder me baantne ki jagah
    const root = { val: rootVal, left: null, right: null };
    root.left = build(l, m - 1);
    root.right = build(m + 1, r);
    return root;
  };
  return build(0, inorder.length - 1);
}
\`\`\``,
    },
    {
      id: 29,
      lcSlug: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=EK0A__Ri2Ms&ab_channel=AlgoJS",
      body: `A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — gain I can offer my parent vs path that bends here
// LC: https://leetcode.com/problems/binary-tree-maximum-path-sum/
function maxPathSum(root) {
  // Hinglish: step 1 — base case check karo
  let best = -Infinity;
  const gain = (node) => {
    if (!node) return 0;
    const L = Math.max(0, gain(node.left));
    const R = Math.max(0, gain(node.right));
    best = Math.max(best, node.val + L + R);
    return node.val + Math.max(L, R);
  };
  gain(root);
  return best;
}
\`\`\``,
    },
      ],
    },
  ],
};
