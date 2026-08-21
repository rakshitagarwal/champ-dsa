# Trees (DFS/BFS)

A tree question is almost always: look at left, look at right, combine. That is DFS. If the problem says “level” or “closest to the root in steps,” I use a queue and drain `queue.length` — that is one level.

```js
function dfs(node) {
  if (!node) return base;
  return combine(node, dfs(node.left), dfs(node.right));
}

const queue = [root];
while (queue.length) {
  const n = queue.length;
  for (let i = 0; i < n; i++) {
    const node = queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

## Maximum Depth of Binary Tree

Depth is 1 plus the deeper child. Empty tree is 0.

[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```js
// Tree DFS
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

## Binary Tree Level Order Traversal

Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```js
// Tree BFS — by level
// LC: https://leetcode.com/problems/binary-tree-level-order-traversal/
function levelOrder(root) {
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
// Tree DFS — height down, diameter across
// LC: https://leetcode.com/problems/diameter-of-binary-tree/
function diameterOfBinaryTree(root) {
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
// Tree DFS — first node that sees both
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
function lowestCommonAncestor(root, p, q) {
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
// Tree DFS — gain I can offer my parent vs path that bends here
// LC: https://leetcode.com/problems/binary-tree-maximum-path-sum/
function maxPathSum(root) {
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
// Tree DFS — preorder + null marks
// LC: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
function serialize(root) {
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
// Tree DFS — bounds
// LC: https://leetcode.com/problems/validate-binary-search-tree/
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}
```

## Kth Smallest Element in a BST

Inorder of a BST is sorted. Walk left, then me (count++), then right. Stop at k.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```js
// Tree inorder — kth
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
function kthSmallest(root, k) {
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
