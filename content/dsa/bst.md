# BST

**Definition:** Binary Search Tree me har node ke liye left subtree chhota aur right subtree bada hota hai (`left < node < right`). Isliye search/insert/delete `O(log n)` me hote hain (balanced ho to), aur inorder traversal sorted order deta hai.

**When to use:** Sorted data chahiye + insert/delete bhi ho (array sort baar-baar mehengi), BST validate karna ho, kth smallest nikalna ho, ya LCA dhoondhna ho.

**How it works:** Compare karke left/right jao — chhota hai to left, bada hai to right. Validate karne ke liye min/max bounds saath le jao (`lo < node.val < hi`). Inorder (left-node-right) hamesha sorted deta hai. Time `O(h)`, balanced me `O(log n)`.

```js
// BST skeleton — search
function searchBST(root, val) {
  let node = root;
  while (node) {
    if (val === node.val) return node; // target value found at this node
    node = val < node.val ? node.left : node.right; // move left or right child by comparison
  }
  return null;
}

// Validate skeleton — min/max bounds saath le jao
// each node must lie strictly inside (lo, hi)
function check(node, lo, hi) {
  if (!node) return true;
  if (node.val <= lo || node.val >= hi) return false; // value violates open interval bounds — invalid BST
  return check(node.left, lo, node.val) && check(node.right, node.val, hi);
}
```
## Validate Binary Search Tree

Har node `(lo, hi)` seema me hona chahiye. Left me jaao to `hi = node.val`, right me jaao to `lo = node.val`.

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

Inorder traversal sorted order deta hai — kth visit hi jawab hai. Iterative stack se karo, poora traverse mat karo.

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

## Lowest Common Ancestor of a BST

BST property use karo — dono chhote to left, dono bade to right, warna yehi node LCA hai.

[Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```js
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
```

## Delete Node in a BST

Node dhoondho, phir 3 cases: leaf (hatao), ek child (child jodo), do children (successor lao — right me sabse chhota — value copy karke successor delete karo).

[Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

```js
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
```
