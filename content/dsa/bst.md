# BST

**Definition:** Binary Search Tree me har node ke liye left subtree chhota aur right subtree bada hota hai (`left < node < right`). Isliye search/insert/delete `O(log n)` me hote hain (balanced ho to), aur inorder traversal sorted order deta hai.

**When to use:** Sorted data chahiye + insert/delete bhi ho (array sort baar-baar mehengi), BST validate karna ho, kth smallest nikalna ho, ya LCA dhoondhna ho.

**How it works:** Compare karke left/right jao — chhota hai to left, bada hai to right. Validate karne ke liye min/max bounds saath le jao (`lo < node.val < hi`). Inorder (left-node-right) hamesha sorted deta hai. Time `O(h)`, balanced me `O(log n)`.

```js
// BST skeleton — search
// Hinglish: chhota to left, bada to right
function searchBST(root, val) {
  let node = root;
  while (node) {
    if (val === node.val) return node; // Hinglish: mil gaya
    node = val < node.val ? node.left : node.right; // Hinglish: disha chuno
  }
  return null;
}

// Validate skeleton — min/max bounds saath le jao
// Hinglish: har node apni seema me hona chahiye
function check(node, lo, hi) {
  if (!node) return true;
  if (node.val <= lo || node.val >= hi) return false; // Hinglish: seema tooti
  return check(node.left, lo, node.val) && check(node.right, node.val, hi);
}
```
## Validate Binary Search Tree

Har node `(lo, hi)` seema me hona chahiye. Left me jaao to `hi = node.val`, right me jaao to `lo = node.val`.

[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

```js
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
```

## Kth Smallest Element in a BST

Inorder traversal sorted order deta hai — kth visit hi jawab hai. Iterative stack se karo, poora traverse mat karo.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```js
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
```

## Lowest Common Ancestor of a BST

BST property use karo — dono chhote to left, dono bade to right, warna yehi node LCA hai.

[Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```js
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
```

## Delete Node in a BST

Node dhoondho, phir 3 cases: leaf (hatao), ek child (child jodo), do children (successor lao — right me sabse chhota — value copy karke successor delete karo).

[Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

```js
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
```
