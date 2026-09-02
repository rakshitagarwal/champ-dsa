# Trees (DFS/BFS)

**Definition:** Tree ek connected acyclic graph hai jiska root hota hai; har node ke `left`/`right` (ya children) pointers. Do traversal: **DFS** (depth-first, recursion/stack — gehrai tak) aur **BFS** (breadth-first, queue — level by level).

**When to use:** "Left dekho, right dekho, combine karo" (max depth, path sum, invert, diameter) → DFS recursion. "Level", "root ke sabse kareeb", "right side view", "unweighted me sabse kam steps" → BFS `queue.length` se level drain.

**How it works:** DFS `combine(node, dfs(left), dfs(right))` return karta hai `null → base`. BFS root push, fir jab tak queue hai `n = queue.length` nodes ek level ke. Time `O(n)`, space `O(h)` DFS / `O(w)` BFS.

```js
// Tree skeleton — DFS (post-order combine)
// Hinglish: null base, fir left-right combine
function dfs(node) {
  if (!node) return base;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return combine(node, left, right);
}

// Tree skeleton — BFS level order
// Hinglish: har level ka size snapshot lo
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
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  // Hinglish: step 1 — base case check karo
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

## Binary Tree Level Order Traversal

Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```js
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
```

## Diameter of Binary Tree

Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

```js
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
```

## Lowest Common Ancestor of a Binary Tree

If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```js
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
```

## Binary Tree Maximum Path Sum

A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

```js
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
```

## Serialize and Deserialize Binary Tree

Preorder with `"#"` for null. Split on commas. Recurse with a queue of tokens — same order I wrote.

[Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

```js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — preorder + null marks
// LC: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
function serialize(root) {
  // Hinglish: step 1 — base case check karo
  const out = [];
  const walk = (node) => {
    if (!node) {
      out.push("#");
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
  const q = data.split(",");
  const walk = () => {
    const tok = q.shift();
    if (tok === "#") return null;
    const node = { val: Number(tok), left: null, right: null };
    node.left = walk();
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
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — bounds
// LC: https://leetcode.com/problems/validate-binary-search-tree/
function isValidBST(root, min = -Infinity, max = Infinity) {
  // Hinglish: step 1 — base case check karo
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}
```

## Kth Smallest Element in a BST

Inorder of a BST is sorted. Walk left, then me (count++), then right. Stop at k.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree inorder — kth
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
function kthSmallest(root, k) {
  // Hinglish: step 1 — base case check karo
  let count = 0, ans = 0;
  const walk = (node) => {
    if (!node || count >= k) return;
    walk(node.left);
    count++;
    if (count === k) ans = node.val;
    walk(node.right);
  };
  walk(root);
  return ans;
}
```

## Invert Binary Tree

Har node ke left/right swap karo. Recursion se dono subtree invert.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

```js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/invert-binary-tree/
function invertTree(root) {
  // Hinglish: null to wapas
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]; // Hinglish: swap
  return root;
}
```

## Same Tree

Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.

[Same Tree](https://leetcode.com/problems/same-tree/)

```js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/same-tree/
function isSameTree(p, q) {
  // Hinglish: dono null to same
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val!==q.val) return false; // Hinglish: value alag to false
  return isSameTree(p.left,q.left) && isSameTree(p.right,q.right); // Hinglish: dono side check
}
```

## Subtree of Another Tree

`s` me `t` jaisa subtree hai kya? Har node ko root maan ke sameTree check.

[Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

```js
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
```
