import type { SolutionGroup } from "./types";

export const TREES_SOLUTIONS: SolutionGroup = {
  id: "trees",
  title: "Trees",
  subs: [
    {
      title: "DFS / Recursion",
      topics: [
    {
      id: 104,
      lcSlug: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      diff: "Easy",
      body: `Depth is 1 plus the deeper child. Empty tree is 0.

[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

\`\`\`js
// Post-order DFS — depth = 1 + max depth of subtrees
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  if (!root) return 0; // Empty tree has depth 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)); // Count edges path through root
}
\`\`\``,
    },
    {
      id: 100,
      lcSlug: "same-tree",
      title: "Same Tree",
      diff: "Easy",
      body: `Same tree iff both nodes are null, or both non-null with equal values and matching subtrees.

[Same Tree](https://leetcode.com/problems/same-tree/)

\`\`\`js
// Structural DFS compare — values and shape must match
// LC: https://leetcode.com/problems/same-tree/
function isSameTree(p, q) {
  if (!p && !q) return true; // Both absent — match
  if (!p || !q) return false; // One missing — mismatch
  if (p.val!==q.val) return false; // Value mismatch at this node
  return isSameTree(p.left,q.left) && isSameTree(p.right,q.right); // Recurse both subtrees
}
\`\`\``,
    },
    {
      id: 226,
      lcSlug: "invert-binary-tree",
      title: "Invert Binary Tree",
      diff: "Easy",
      body: `Swap left and right at every node after recursively inverting both subtrees.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

\`\`\`js
// Swap children at every node after recursively inverting subtrees
// LC: https://leetcode.com/problems/invert-binary-tree/
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]; // Mirror left/right
  return root;
}
\`\`\``,
    },
    {
      id: 101,
      lcSlug: "symmetric-tree",
      title: "Symmetric Tree",
      diff: "Easy",
      body: `Symmetric iff left.left mirrors right.right and left.right mirrors right.left.

[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

\`\`\`js
// Symmetry = left subtree mirrors right — compare mirrored pairs
// LC: https://leetcode.com/problems/symmetric-tree/
function isSymmetric(root) {
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return same(a.left, b.right) && same(a.right, b.left); // Cross-child mirror check
  };
  return same(root, root); // Compare left and right subtrees of root
}
\`\`\``,
    },
    {
      id: 112,
      lcSlug: "path-sum",
      title: "Path Sum",
      diff: "Easy",
      body: `Subtract node values along root-to-leaf paths; a leaf with remaining sum zero wins.

[Path Sum](https://leetcode.com/problems/path-sum/)

\`\`\`js
// Root-to-leaf only — subtract node value as you descend
// LC: https://leetcode.com/problems/path-sum/
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum; // Leaf must consume remaining sum
  const rest = targetSum - root.val; // Remaining sum for children
  return hasPathSum(root.left, rest) || hasPathSum(root.right, rest); // Either branch may work
}
\`\`\``,
    },
    {
      id: 110,
      lcSlug: "balanced-binary-tree",
      title: "Balanced Binary Tree",
      diff: "Easy",
      body: `Return height or -1 if unbalanced; any subtree with \`|left - right| > 1\` fails.

[Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

\`\`\`js
// Return height or -1 sentinel if any subtree unbalanced — one post-order pass
// LC: https://leetcode.com/problems/balanced-binary-tree/
function isBalanced(root) {
  const height = (node) => {
    if (!node) return 0;
    const l = height(node.left);
    if (l === -1) return -1; // Bubble up imbalance from left
    const r = height(node.right);
    if (r === -1) return -1;
    if (Math.abs(l - r) > 1) return -1; // Current node violates balance
    return Math.max(l, r) + 1; // Valid height at this node
  };
  return height(root) !== -1;
}
\`\`\``,
    },
    {
      id: 543,
      lcSlug: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      diff: "Easy",
      body: `Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

\`\`\`js
// Diameter at node = left height + right height (edges); track global max
// LC: https://leetcode.com/problems/diameter-of-binary-tree/
function diameterOfBinaryTree(root) {
  let best = 0; // Best diameter seen (in edges)
  const height = (node) => {
    if (!node) return 0;
    const L = height(node.left);
    const R = height(node.right);
    best = Math.max(best, L + R); // Path through this node as bend point
    return 1 + Math.max(L, R); // Height upward to parent
  };
  height(root);
  return best;
}
\`\`\``,
    },
    {
      id: 124,
      lcSlug: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      diff: "Hard",
      body: `A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

\`\`\`js
// At each node: best bending path vs one-sided gain returned to parent
// LC: https://leetcode.com/problems/binary-tree-maximum-path-sum/
function maxPathSum(root) {
  let best = -Infinity;
  const gain = (node) => {
    if (!node) return 0;
    const L = Math.max(0, gain(node.left)); // Ignore negative contributions
    const R = Math.max(0, gain(node.right));
    best = Math.max(best, node.val + L + R); // Path that turns at this node
    return node.val + Math.max(L, R); // Extend only one side upward
  };
  gain(root);
  return best;
}
\`\`\``,
    },
    {
      id: 572,
      lcSlug: "subtree-of-another-tree",
      title: "Subtree of Another Tree",
      diff: "Easy",
      body: `Is \`t\` a subtree of \`s\`? At each node of \`s\`, check whether the trees match from there.

[Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

\`\`\`js
// Try subRoot match at every node — sameTree check at each candidate root
// LC: https://leetcode.com/problems/subtree-of-another-tree/
function isSubtree(root, subRoot) {
  const same=(a,b)=>{
    if(!a&&!b) return true;
    if(!a||!b||a.val!==b.val) return false;
    return same(a.left,b.left) && same(a.right,b.right);
  };
  if (!root) return false;
  if (same(root, subRoot)) return true; // subRoot equals tree rooted here
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot); // Search other positions
}
\`\`\``,
    },
    {
      id: 617,
      lcSlug: "merge-two-binary-trees",
      title: "Merge Two Binary Trees",
      diff: "Easy",
      body: `Where both nodes exist, sum their values and merge children; otherwise return the non-null subtree.

[Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/)

\`\`\`js
// Overlay two trees — sum values where both exist, reuse single side otherwise
// LC: https://leetcode.com/problems/merge-two-binary-trees/
function mergeTrees(t1, t2) {
  if (!t1) return t2; // Only t2 subtree remains
  if (!t2) return t1; // Only t1 subtree remains
  t1.val += t2.val; // Combine values at overlapping node
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);
  return t1; // Reuse t1 nodes as merged result
}
\`\`\``,
    },
    {
      id: 814,
      lcSlug: "binary-tree-pruning",
      title: "Binary Tree Pruning",
      diff: "Medium",
      body: `Postorder: keep subtrees that contain 1, prune all-0 subtrees to null.

[Binary Tree Pruning](https://leetcode.com/problems/binary-tree-pruning/)

\`\`\`js
// Post-order prune — drop leaf zeros with no 1 in subtree
// LC: https://leetcode.com/problems/binary-tree-pruning/
function pruneTree(root) {
  if (!root) return null;
  root.left = pruneTree(root.left); // Prune left first
  root.right = pruneTree(root.right);
  if (!root.left && !root.right && root.val === 0) return null; // Remove useless zero leaf
  return root;
}
\`\`\``,
    },
    {
      id: 687,
      lcSlug: "longest-univalue-path",
      title: "Longest Univalue Path",
      diff: "Medium",
      body: `Longest path with equal values: at each node add left and right chain lengths; track global max.

[Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/)

\`\`\`js
// Longest path with equal values — bend at node uses left+right arms
// LC: https://leetcode.com/problems/longest-univalue-path/
function longestUnivaluePath(root) {
  let best = 0; // Global max path length (edges)
  const dfs = (node) => {
    if (!node) return 0;
    const l = dfs(node.left), r = dfs(node.right); // Arm lengths from children
    const left = node.left && node.left.val === node.val ? l + 1 : 0; // Extend left if same value
    const right = node.right && node.right.val === node.val ? r + 1 : 0;
    if (left + right > best) best = left + right; // Path through node as hub
    return Math.max(left, right); // Parent may extend one side only
  };
  dfs(root);
  return best;
}
\`\`\``,
    },
      ],
    },
    {
      title: "BFS / Level Order",
      topics: [
    {
      id: 102,
      lcSlug: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      diff: "Medium",
      body: `Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

\`\`\`js
// BFS with level size snapshot — each batch is one level
// LC: https://leetcode.com/problems/binary-tree-level-order-traversal/
function levelOrder(root) {
  if (!root) return [];
  const out = [], queue = [root];
  while (queue.length) {
    const level = [], n = queue.length; // Fix level width before processing
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
      id: 103,
      lcSlug: "binary-tree-zigzag-level-order-traversal",
      title: "Binary Tree Zigzag Level Order Traversal",
      diff: "Medium",
      body: `BFS level order, but reverse every other level using a direction flag.

[Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

\`\`\`js
// Level order with alternating reverse per level
// LC: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
function zigzagLevelOrder(root) {
  if (!root) return [];
  const out = [];
  let q = [root], flip = false; // flip toggles left-to-right vs right-to-left
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
    out.push(flip ? level.reverse() : level); // Reverse every other level
    flip = !flip;
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 199,
      lcSlug: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      diff: "Medium",
      body: `BFS each level and collect the last node seen at that depth.

[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

\`\`\`js
// Right side view = last node visited at each BFS level
// LC: https://leetcode.com/problems/binary-tree-right-side-view/
function rightSideView(root) {
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const n = q.length;
    const next = [];
    for (let i = 0; i < n; i++) {
      const node = q[i];
      if (i === n - 1) out.push(node.val); // Rightmost node on this level
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
      id: 515,
      lcSlug: "find-largest-value-in-each-tree-row",
      title: "Find Largest Value in Each Tree Row",
      diff: "Medium",
      body: `BFS per level and track the maximum value at each depth.

[Find Largest Value in Each Tree Row](https://leetcode.com/problems/find-largest-value-in-each-tree-row/)

\`\`\`js
// Scan each BFS level for maximum value
// LC: https://leetcode.com/problems/find-largest-value-in-each-tree-row/
function largestValues(root) {
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const n = q.length;
    const next = [];
    let mx = -Infinity;
    for (let i = 0; i < n; i++) {
      const node = q[i];
      if (node.val > mx) mx = node.val; // Track level max
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    out.push(mx);
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 116,
      lcSlug: "populating-next-right-pointers-in-each-node",
      title: "Populating Next Right Pointers in Each Node",
      diff: "Medium",
      body: `In a perfect tree, link \`left.next = right\` and \`right.next = parent.next.left\` for O(1) extra space.

[Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)

\`\`\`js
// Perfect tree — use existing next pointers to link next level in O(1) space
// LC: https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
function connect(root) {
  let level = root; // Start of current level
  while (level && level.left) {
    let cur = level;
    while (cur) {
      cur.left.next = cur.right; // Link siblings
      if (cur.next) cur.right.next = cur.next.left; // Link to cousin on right
      cur = cur.next; // Walk current level via next chain
    }
    level = level.left; // Descend to next level start
  }
  return root;
}
\`\`\``,
    },
    {
      id: 117,
      lcSlug: "populating-next-right-pointers-in-each-node-ii",
      title: "Populating Next Right Pointers in Each Node II",
      diff: "Medium",
      body: `Use a dummy head per level to wire \`next\` pointers left to right when the tree is not perfect.

[Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)

\`\`\`js
// Imperfect tree — build next level list with dummy tail while traversing current level
// LC: https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/
function connect(root) {
  let head = root; // Head of level being linked
  while (head) {
    const dummy = { val: 0, next: null };
    let tail = dummy, cur = head;
    while (cur) {
      if (cur.left) { tail.next = cur.left; tail = tail.next; } // Append left child to next level
      if (cur.right) { tail.next = cur.right; tail = tail.next; }
      cur = cur.next; // Follow horizontal next on current level
    }
    head = dummy.next; // Move to first node of next level
  }
  return root;
}
\`\`\``,
    },
    {
      id: 662,
      lcSlug: "maximum-width-of-binary-tree",
      title: "Maximum Width of Binary Tree",
      diff: "Medium",
      body: `Label nodes like a heap (\`2i\`, \`2i+1\`); level width is last index minus first plus one.

[Maximum Width of Binary Tree](https://leetcode.com/problems/maximum-width-of-binary-tree/)

\`\`\`js
// Index nodes like heap array: left=2*pos, right=2*pos+1 — level width from indices
// LC: https://leetcode.com/problems/maximum-width-of-binary-tree/
function widthOfBinaryTree(root) {
  if (!root) return 0;
  let q = [[root, 0]], best = 1;
  while (q.length) {
    const next = [];
    for (const [node, pos] of q) {
      if (node.left) next.push([node.left, pos * 2]); // Left child index
      if (node.right) next.push([node.right, pos * 2 + 1]); // Right child index
    }
    if (next.length) {
      const w = next[next.length - 1][1] - next[0][1] + 1; // Last minus first index + 1
      if (w > best) best = w;
    }
    q = next;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 958,
      lcSlug: "check-completeness-of-a-binary-tree",
      title: "Check Completeness of a Binary Tree",
      diff: "Medium",
      body: `Complete tree check: in level order, once null appears, no later node may be non-null.

[Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/)

\`\`\`js
// Complete tree: after first null in level order, only nulls may follow
// LC: https://leetcode.com/problems/check-completeness-of-a-binary-tree/
function isCompleteTree(root) {
  const q = [root];
  let seenNull = false;
  while (q.length) {
    const node = q.shift();
    if (!node) { seenNull = true; continue; } // Marker for missing child
    if (seenNull) return false; // Real node after gap — not complete
    q.push(node.left); q.push(node.right); // Always enqueue both slots
  }
  return true;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Build / Serialize / Views",
      topics: [
    {
      id: 105,
      lcSlug: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      diff: "Medium",
      body: `Preorder gives root first; inorder splits left/right subtrees — map values to indices for O(1) lookup.

[Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

\`\`\`js
// Preorder gives root order; inorder splits left/right ranges
// LC: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
function buildTree(preorder, inorder) {
  const pos = new Map();
  inorder.forEach((v, i) => pos.set(v, i)); // O(1) root index in inorder
  let pre = 0; // Global preorder pointer
  const build = (l, r) => {
    if (l > r) return null;
    const rootVal = preorder[pre++]; // Next preorder value is subtree root
    const m = pos.get(rootVal); // Split inorder at root
    const root = { val: rootVal, left: null, right: null };
    root.left = build(l, m - 1); // Values left of m in inorder
    root.right = build(m + 1, r);
    return root;
  };
  return build(0, inorder.length - 1);
}
\`\`\``,
    },
    {
      id: 106,
      lcSlug: "construct-binary-tree-from-inorder-and-postorder-traversal",
      title: "Construct Binary Tree from Inorder and Postorder Traversal",
      diff: "Medium",
      body: `Postorder's last element is root; partition inorder and build from the end.

[Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

\`\`\`js
// Postorder root is last; build right before left because post index walks backward
// LC: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
function buildTree(inorder, postorder) {
  const pos = new Map();
  inorder.forEach((v, i) => pos.set(v, i));
  let post = postorder.length - 1; // Consume postorder from end
  const build = (l, r) => {
    if (l > r) return null;
    const rootVal = postorder[post--]; // Root of current inorder range
    const m = pos.get(rootVal);
    const root = { val: rootVal, left: null, right: null };
    root.right = build(m + 1, r); // Right subtree built first (postorder ends with right chain)
    root.left = build(l, m - 1);
    return root;
  };
  return build(0, inorder.length - 1);
}
\`\`\``,
    },
    {
      id: 297,
      lcSlug: "serialize-and-deserialize-binary-tree",
      title: "Serialize and Deserialize Binary Tree",
      diff: "Hard",
      body: `Preorder with \`"#"\` for null. Split on commas. Recurse with a queue of tokens — same order I wrote.

[Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

\`\`\`js
// Preorder with "#" null tokens — deserialize reads same token order
// LC: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
function serialize(root) {
  const out = [];
  const walk = (node) => {
    if (!node) {
      out.push("#"); // Explicit null marker
      return;
    }
    out.push(String(node.val));
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return out.join(",");
}
function deserialize(data) {
  const q = data.split(","); // Queue of preorder tokens
  const walk = () => {
    const tok = q.shift();
    if (tok === "#") return null;
    const node = { val: Number(tok), left: null, right: null };
    node.left = walk(); // Rebuild left before right — preorder order
    node.right = walk();
    return node;
  };
  return walk();
}
\`\`\``,
    },
    {
      id: 889,
      lcSlug: "construct-binary-tree-from-preorder-and-postorder-traversal",
      title: "Construct Binary Tree from Preorder and Postorder Traversal",
      diff: "Medium",
      body: `First preorder node is root; size of left subtree from postorder bounds the split.

[Construct Binary Tree from Preorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

\`\`\`js
// Left subtree size from preorder[1] position in postorder segment
// LC: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
function constructFromPrePost(preorder, postorder) {
  const pos = new Map();
  postorder.forEach((v, i) => pos.set(v, i));
  const build = (preL, preR, postL, postR) => {
    if (preL > preR) return null;
    const root = { val: preorder[preL], left: null, right: null };
    if (preL === preR) return root; // Single node subtree
    const m = pos.get(preorder[preL + 1]); // Where left child subtree ends in postorder
    const leftSize = m - postL + 1; // Number of nodes in left subtree
    root.left = build(preL + 1, preL + leftSize, postL, m);
    root.right = build(preL + leftSize + 1, preR, m + 1, postR - 1);
    return root;
  };
  return build(0, preorder.length - 1, 0, postorder.length - 1);
}
\`\`\``,
    },
    {
      id: 114,
      lcSlug: "flatten-binary-tree-to-linked-list",
      title: "Flatten Binary Tree to Linked List",
      diff: "Medium",
      body: `Morris traversal: thread left subtree to right, visit in O(1) space, then flatten to a list.

[Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)

\`\`\`js
// Morris-style: splice left subtree between node and old right spine
// LC: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
function flatten(root) {
  let cur = root;
  while (cur) {
    if (cur.left) {
      let tail = cur.left;
      while (tail.right) tail = tail.right; // Rightmost node in left subtree
      tail.right = cur.right; // Attach original right chain after left tail
      cur.right = cur.left; // Rotate left subtree to right child
      cur.left = null; // Left pointer cleared per problem
    }
    cur = cur.right; // Preorder walk along new right spine
  }
}
\`\`\``,
    },
    {
      id: 236,
      lcSlug: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      diff: "Medium",
      body: `If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

\`\`\`js
// Post-order LCA — first ancestor where p and q split to different subtrees
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root; // Hit target or empty
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root; // p and q found in different subtrees — LCA is root
  return L || R; // Propagate the non-null side upward
}
\`\`\``,
    },
    {
      id: 863,
      lcSlug: "all-nodes-distance-k-in-binary-tree",
      title: "All Nodes Distance K in Binary Tree",
      diff: "Medium",
      body: `Build a parent map (tree as graph), BFS from target for exactly \`K\` steps away.

[All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

\`\`\`js
// Undirected graph via parent links — BFS k layers from target
// LC: https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
function distanceK(root, target, k) {
  const parent = new Map();
  const dfs = (node, par) => {
    if (!node) return;
    parent.set(node, par); // Record upward edge for later BFS
    dfs(node.left, node);
    dfs(node.right, node);
  };
  dfs(root, null);
  const seen = new Set([target]);
  let q = [target]; // BFS frontier at current distance
  for (let d = 0; d < k; d++) {
    const next = [];
    for (const node of q) {
      for (const nb of [node.left, node.right, parent.get(node)]) {
        if (nb && !seen.has(nb)) { seen.add(nb); next.push(nb); } // Walk down or up
      }
    }
    q = next; // Expand one hop
  }
  return q.map((n) => n.val); // All nodes exactly k away
}
\`\`\``,
    },
    {
      id: 652,
      lcSlug: "find-duplicate-subtrees",
      title: "Find Duplicate Subtrees",
      diff: "Medium",
      body: `Serialize each subtree; duplicate subtrees share the same string — count with a hash map.

[Find Duplicate Subtrees](https://leetcode.com/problems/find-duplicate-subtrees/)

\`\`\`js
// Canonical subtree string — collect roots when signature seen exactly twice
// LC: https://leetcode.com/problems/find-duplicate-subtrees/
function findDuplicateSubtrees(root) {
  const seen = new Map(), out = [];
  const code = (node) => {
    if (!node) return "#"; // Null placeholder in encoding
    const s = node.val + "," + code(node.left) + "," + code(node.right); // Post-order signature
    const c = (seen.get(s) || 0) + 1;
    seen.set(s, c);
    if (c === 2) out.push(node); // Second occurrence — duplicate subtree root
    return s;
  };
  code(root);
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};
