# Trees (DFS/BFS)

**Definition:** Tree ek connected acyclic graph hai jiska root hota hai; har node ke `left`/`right` (ya children) pointers. Do traversal: **DFS** (depth-first, recursion/stack — gehrai tak) aur **BFS** (breadth-first, queue — level by level).

**When to use:** "Left dekho, right dekho, combine karo" (max depth, path sum, invert, diameter) → DFS recursion. "Level", "root ke sabse kareeb", "right side view", "unweighted me sabse kam steps" → BFS `queue.length` se level drain.

**How it works:** DFS `combine(node, dfs(left), dfs(right))` return karta hai `null → base`. BFS root push, fir jab tak queue hai `n = queue.length` nodes ek level ke. Time `O(n)`, space `O(h)` DFS / `O(w)` BFS.

```js
// Tree skeleton — DFS (post-order combine)
// null base, fir left-right combine
function dfs(node) {
  if (!node) return base;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return combine(node, left, right);
}

// Tree skeleton — BFS level order
// snapshot queue size each level for level-order traversal
const queue = [root];
let depth = 0;
while (queue.length) {
  const n = queue.length; // ek level
  for (let i = 0; i < n; i++) {
    const node = queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  depth++;
}
```
## Maximum Depth of Binary Tree

Depth is 1 plus the deeper child. Empty tree is 0.

[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```js
// Post-order DFS — depth = 1 + max depth of subtrees
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  if (!root) return 0; // Empty tree has depth 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)); // Count edges path through root
}
```

## Binary Tree Level Order Traversal

Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```js
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
```

## Diameter of Binary Tree

Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

```js
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
```

## Lowest Common Ancestor of a Binary Tree

If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```js
// Post-order LCA — first ancestor where p and q split to different subtrees
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root; // Hit target or empty
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root; // p and q found in different subtrees — LCA is root
  return L || R; // Propagate the non-null side upward
}
```

## Binary Tree Maximum Path Sum

A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

```js
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
```

## Serialize and Deserialize Binary Tree

Preorder with `"#"` for null. Split on commas. Recurse with a queue of tokens — same order I wrote.

[Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

```js
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
```

## Validate Binary Search Tree

Not “left < me < right” only on kids — the whole left subtree must stay in (min, me) and right in (me, max).

[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

```js
// LC: https://leetcode.com/problems/validate-binary-search-tree/
function isValidBST(root) {
  const check = (node, lo, hi) => {
    if (!node) return true; // Empty subtree is valid
    if (node.val <= lo || node.val >= hi) return false; // Violates range bounds
    return check(node.left, lo, node.val) && check(node.right, node.val, hi); // Tighten bounds per side
  };
  return check(root, -Infinity, Infinity);
}
```

## Kth Smallest Element in a BST

Inorder of a BST is sorted. Walk left, then me (count++), then right. Stop at k.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```js
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
```

## Invert Binary Tree

Har node ke left/right swap karo. Recursion se dono subtree invert.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

```js
// Swap children at every node after recursively inverting subtrees
// LC: https://leetcode.com/problems/invert-binary-tree/
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]; // Mirror left/right
  return root;
}
```

## Same Tree

Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.

[Same Tree](https://leetcode.com/problems/same-tree/)

```js
// Structural DFS compare — values and shape must match
// LC: https://leetcode.com/problems/same-tree/
function isSameTree(p, q) {
  if (!p && !q) return true; // Both absent — match
  if (!p || !q) return false; // One missing — mismatch
  if (p.val!==q.val) return false; // Value mismatch at this node
  return isSameTree(p.left,q.left) && isSameTree(p.right,q.right); // Recurse both subtrees
}
```

## Subtree of Another Tree

`s` me `t` jaisa subtree hai kya? Har node ko root maan ke sameTree check.

[Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

```js
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
```
