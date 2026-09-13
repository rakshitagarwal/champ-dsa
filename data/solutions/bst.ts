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
      id: 230,
      lcSlug: "kth-smallest-element-in-a-bst",
      title: "Kth Smallest Element in a BST",
      diff: "Medium",
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
      id: 235,
      lcSlug: "lowest-common-ancestor-of-a-binary-search-tree",
      title: "Lowest Common Ancestor of a Binary Search Tree",
      diff: "Medium",
      body: `BST property use karo — dono chhote to left, dono bade to right, warna yehi node LCA hai.

[Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

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
      id: 173,
      lcSlug: "binary-search-tree-iterator",
      title: "Binary Search Tree Iterator",
      diff: "Medium",
      body: `Stack me left dabate jao — next() me nikalo, right ka left dabao. Average O(1) time.

[Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)

\`\`\`js
// Hinglish: left dabate jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-search-tree-iterator/
function BSTIterator(root) {
  // Hinglish: step 1 — stack lo
  this.st = [];
  this.pushLeft = (node) => {
    while (node) { this.st.push(node); node = node.left; } // Hinglish: left dabao
  };
  this.pushLeft(root);
}
BSTIterator.prototype.next = function () {
  const node = this.st.pop();
  this.pushLeft(node.right); // Hinglish: right ka left dabao
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
      body: `Node dhoondho, phir 3 cases: leaf (hatao), ek child (child jodo), do children (successor lao — right me sabse chhota — value copy karke successor delete karo).

[Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

\`\`\`js
// Hinglish: dhoondho phir 3 cases — ek-ek step comment dekho
// LC: https://leetcode.com/problems/delete-node-in-a-bst/
function deleteNode(root, key) {
  // Hinglish: step 1 — dhoondho
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right; // Hinglish: ek child
    if (!root.right) return root.left;
    let succ = root.right;
    while (succ.left) succ = succ.left; // Hinglish: sabse chhota bada
    root.val = succ.val; // Hinglish: value copy
    root.right = deleteNode(root.right, succ.val); // Hinglish: successor hatao
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
      body: `Compare karke neeche jao — khaali jagah mile to naya node lagao. Iterative bhi aasan hai.

[Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

\`\`\`js
// Hinglish: jagah dhoondh ke lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/insert-into-a-binary-search-tree/
function insertIntoBST(root, val) {
  // Hinglish: step 1 — khaali mile to banao
  if (!root) return { val, left: null, right: null };
  if (val < root.val) root.left = insertIntoBST(root.left, val); // Hinglish: left jao
  else root.right = insertIntoBST(root.right, val); // Hinglish: right jao
  return root;
}
\`\`\``,
    },
    {
      id: 700,
      lcSlug: "search-in-a-binary-search-tree",
      title: "Search in a Binary Search Tree",
      diff: "Easy",
      body: `Chhota hai to left, bada hai to right — seedha loop me chalao.

[Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)

\`\`\`js
// Hinglish: disha chuno — ek-ek step comment dekho
// LC: https://leetcode.com/problems/search-in-a-binary-search-tree/
function searchBST(root, val) {
  // Hinglish: step 1 — traverse karo
  let node = root;
  while (node) {
    if (val === node.val) return node; // Hinglish: mil gaya
    node = val < node.val ? node.left : node.right; // Hinglish: disha chuno
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
      body: `Sorted array ka beech root banao — left half left, right half right. Balanced pakka.

[Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

\`\`\`js
// Hinglish: beech se todo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
function sortedArrayToBST(nums) {
  // Hinglish: step 1 — range lo
  const build = (l, r) => {
    if (l > r) return null;
    const m = (l + r) >> 1; // Hinglish: beech root hai
    const root = { val: nums[m], left: null, right: null };
    root.left = build(l, m - 1);
    root.right = build(m + 1, r);
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
      body: `Preorder me pehla root hai — bounds (lo,hi) me jo aaye wo andar, baaki bahar. Index aage badhao.

[Construct Binary Search Tree from Preorder Traversal](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

\`\`\`js
// Hinglish: bounds me baanto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
function bstFromPreorder(preorder) {
  // Hinglish: step 1 — index lo
  let i = 0;
  const build = (lo, hi) => {
    if (i >= preorder.length) return null;
    const v = preorder[i];
    if (v < lo || v > hi) return null; // Hinglish: seema bahar to nahi
    i++;
    const root = { val: v, left: null, right: null };
    root.left = build(lo, v);
    root.right = build(v, hi);
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
      body: `Do nodes galat jagah hain — inorder me pehla ulta joda aur aakhri ulta joda pakdo, values swap karo.

[Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)

\`\`\`js
// Hinglish: ulti jodi pakdo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/recover-binary-search-tree/
function recoverTree(root) {
  // Hinglish: step 1 — inorder me ghalti dhoondo
  let first = null, second = null, prev = null;
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    if (prev && prev.val > node.val) {
      if (!first) first = prev; // Hinglish: pehli ghalti
      second = node; // Hinglish: doosri (update hoti rahegi)
    }
    prev = node;
    dfs(node.right);
  };
  dfs(root);
  const t = first.val; first.val = second.val; second.val = t; // Hinglish: swap karo
}
\`\`\``,
    },
    {
      id: 938,
      lcSlug: "range-sum-of-bst",
      title: "Range Sum of BST",
      diff: "Easy",
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
      ],
    },
  ],
};
