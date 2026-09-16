import type { SolutionGroup } from "./types";

export const BST_SOLUTIONS: SolutionGroup = {
  id: "bst",
  title: "BST",
  subs: [
    {
      title: "BST Patterns",
      topics: [
    {
      id: 98,
      lcSlug: "validate-binary-search-tree",
      title: "Validate Binary Search Tree",
      diff: "Medium",
      body: `Each node must lie in \`(lo, hi)\`. Going left sets \`hi = node.val\`; going right sets \`lo = node.val\`.

[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

\`\`\`js
// BST = strict open interval (lo, hi) at every node — not just parent compare
// LC: https://leetcode.com/problems/validate-binary-search-tree/
function isValidBST(root) {
  const check = (node, lo, hi) => {
    if (!node) return true; // Empty subtree is valid
    if (node.val <= lo || node.val >= hi) return false; // Violates range bounds
    return check(node.left, lo, node.val) && check(node.right, node.val, hi); // Tighten bounds per side
  };
  return check(root, -Infinity, Infinity);
}
\`\`\``,
    },
    {
      id: 230,
      lcSlug: "kth-smallest-element-in-a-bst",
      title: "Kth Smallest Element in a BST",
      diff: "Medium",
      body: `Inorder visits BST in sorted order — stop at the kth pop. Use an iterative stack; no full traversal needed.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

\`\`\`js
// Inorder on BST yields sorted order — stop at kth pop
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
function kthSmallest(root, k) {
  const st = [];
  let node = root;
  while (node || st.length) {
    while (node) { st.push(node); node = node.left; } // Go to smallest unvisited in this branch
    node = st.pop(); // Next inorder node
    if (--k === 0) return node.val; // k exhausted — this is answer
    node = node.right; // Explore larger values
  }
}
\`\`\``,
    },
    {
      id: 235,
      lcSlug: "lowest-common-ancestor-of-a-binary-search-tree",
      title: "Lowest Common Ancestor of a Binary Search Tree",
      diff: "Medium",
      body: `Use BST ordering — both smaller go left, both larger go right; otherwise current node is the LCA.

[Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

\`\`\`js
// Walk down: first node where p and q split across subtrees is LCA
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) node = node.left; // Both strictly left
    else if (p.val > node.val && q.val > node.val) node = node.right; // Both strictly right
    else return node; // One on each side or equal to node — split here
  }
}
\`\`\``,
    },
    {
      id: 173,
      lcSlug: "binary-search-tree-iterator",
      title: "Binary Search Tree Iterator",
      diff: "Medium",
      body: `Push all left spine onto a stack. \`next()\` pops, then pushes left chain of that node’s right child.

[Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)

\`\`\`js
// Controlled inorder: stack holds path to next smallest
// LC: https://leetcode.com/problems/binary-search-tree-iterator/
function BSTIterator(root) {
  this.st = [];
  this.pushLeft = (node) => {
    while (node) { this.st.push(node); node = node.left; } // Push chain of left spines
  };
  this.pushLeft(root); // Prime with smallest path from root
}
BSTIterator.prototype.next = function () {
  const node = this.st.pop(); // Current smallest in stack
  this.pushLeft(node.right); // Next will be inorder successor in right subtree
  return node.val;
};
BSTIterator.prototype.hasNext = function () {
  return this.st.length > 0;
};
\`\`\``,
    },
    {
      id: 450,
      lcSlug: "delete-node-in-a-bst",
      title: "Delete Node in a BST",
      diff: "Medium",
      body: `Find the node, then three cases: leaf remove, one child link up, two children copy inorder successor value then delete successor.

[Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

\`\`\`js
// Recurse to target; three delete cases at match
// LC: https://leetcode.com/problems/delete-node-in-a-bst/
function deleteNode(root, key) {
  if (!root) return null; // Key not in tree
  if (key < root.val) root.left = deleteNode(root.left, key); // Search left subtree
  else if (key > root.val) root.right = deleteNode(root.right, key); // Search right subtree
  else {
    if (!root.left) return root.right; // 0 or 1 child: promote right child
    if (!root.right) return root.left; // Only left child
    let succ = root.right;
    while (succ.left) succ = succ.left; // Inorder successor = min in right subtree
    root.val = succ.val; // Copy successor value into this node
    root.right = deleteNode(root.right, succ.val); // Remove duplicate successor node
  }
  return root;
}
\`\`\``,
    },
    {
      id: 701,
      lcSlug: "insert-into-a-binary-search-tree",
      title: "Insert into a Binary Search Tree",
      diff: "Medium",
      body: `Walk down comparing values; attach a new node when you hit null. Iterative version is straightforward too.

[Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

\`\`\`js
// Standard BST insert — always at a null leaf position
// LC: https://leetcode.com/problems/insert-into-a-binary-search-tree/
function insertIntoBST(root, val) {
  if (!root) return { val, left: null, right: null }; // Found empty spot — attach here
  if (val < root.val) root.left = insertIntoBST(root.left, val); // Go left for smaller
  else root.right = insertIntoBST(root.right, val); // Go right for greater or equal
  return root;
}
\`\`\``,
    },
    {
      id: 700,
      lcSlug: "search-in-a-binary-search-tree",
      title: "Search in a Binary Search Tree",
      diff: "Easy",
      body: `Smaller values go left, larger go right — simple iterative walk.

[Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)

\`\`\`js
// Iterative BST search — O(height) time, O(1) space
// LC: https://leetcode.com/problems/search-in-a-binary-search-tree/
function searchBST(root, val) {
  let node = root;
  while (node) {
    if (val === node.val) return node; // Found target subtree root
    node = val < node.val ? node.left : node.right; // Discard half the tree each step
  }
  return null;
}
\`\`\``,
    },
    {
      id: 108,
      lcSlug: "convert-sorted-array-to-binary-search-tree",
      title: "Convert Sorted Array to Binary Search Tree",
      diff: "Easy",
      body: `Middle element becomes root; recurse on left and right halves for a height-balanced BST.

[Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

\`\`\`js
// Pick mid as root — balanced height by construction
// LC: https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
function sortedArrayToBST(nums) {
  const build = (l, r) => {
    if (l > r) return null; // Empty range
    const m = (l + r) >> 1; // Middle index is root value
    const root = { val: nums[m], left: null, right: null };
    root.left = build(l, m - 1); // Left half becomes left subtree
    root.right = build(m + 1, r); // Right half becomes right subtree
    return root;
  };
  return build(0, nums.length - 1);
}
\`\`\``,
    },
    {
      id: 1008,
      lcSlug: "construct-binary-search-tree-from-preorder-traversal",
      title: "Construct Binary Search Tree from Preorder Traversal",
      diff: "Medium",
      body: `First preorder value is root — recurse with bounds; values inside range go in subtree, advance index.

[Construct Binary Search Tree from Preorder Traversal](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

\`\`\`js
// Global index walks preorder; bounds decide left vs right placement
// LC: https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
function bstFromPreorder(preorder) {
  let i = 0; // Next value to consume from preorder
  const build = (lo, hi) => {
    if (i >= preorder.length) return null;
    const v = preorder[i];
    if (v < lo || v > hi) return null; // Value outside current BST range — backtrack
    i++; // Commit this value as a node
    const root = { val: v, left: null, right: null };
    root.left = build(lo, v); // Left subtree values must be < v
    root.right = build(v, hi); // Right subtree values must be > v
    return root;
  };
  return build(-Infinity, Infinity);
}
\`\`\``,
    },
    {
      id: 99,
      lcSlug: "recover-binary-search-tree",
      title: "Recover Binary Search Tree",
      diff: "Medium",
      body: `Two swapped nodes — inorder finds first and last out-of-order pair; swap their values.

[Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)

\`\`\`js
// Two swapped nodes appear as two inorder inversions
// LC: https://leetcode.com/problems/recover-binary-search-tree/
function recoverTree(root) {
  let first = null, second = null, prev = null; // prev = last inorder node
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    if (prev && prev.val > node.val) {
      if (!first) first = prev; // First time order breaks — earlier node is first swap
      second = node; // Keep updating — second swap is the later node
    }
    prev = node;
    dfs(node.right);
  };
  dfs(root);
  const t = first.val; first.val = second.val; second.val = t; // Swap values in place
}
\`\`\``,
    },
    {
      id: 938,
      lcSlug: "range-sum-of-bst",
      title: "Range Sum of BST",
      diff: "Easy",
      body: `Trim outside \`[low, high]\`: if node.val < low keep right only; if > high keep left only; else trim both sides.

[Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/)

\`\`\`js
// Prune search using BST ordering — skip whole subtrees
// LC: https://leetcode.com/problems/range-sum-of-bst/
function rangeSumBST(root, low, high) {
  if (!root) return 0;
  if (root.val < low) return rangeSumBST(root.right, low, high); // All left are too small
  if (root.val > high) return rangeSumBST(root.left, low, high); // All right are too large
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high); // Node in range — count and both sides
}
\`\`\``,
    },
      ],
    },
  ],
};
