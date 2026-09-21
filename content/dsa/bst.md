# BST

*Sorted data with fast search.*

**Definition:** In a Binary Search Tree, every node’s left subtree holds smaller values and the right subtree holds larger ones (`left < node < right`). Search/insert/delete are `O(log n)` when balanced, and inorder traversal yields sorted order.

**When to use:** You need sorted data plus insert/delete (resorting an array each time is expensive), BST validation, kth smallest, or LCA in a BST.

**How it works:** Compare and go left/right — smaller → left, larger → right. To validate, carry min/max bounds (`lo < node.val < hi`). Inorder (left-node-right) is always sorted. Time `O(h)`; balanced → `O(log n)`.

**Structure:** An ordered binary tree — every left subtree < node < every right subtree. Balanced variants (AVL, red-black) rotate to keep height `O(log n)`. Inorder traversal reads the keys sorted.

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Search (BST) | `O(log n)` | Halve each step |
| Insert | `O(log n)` | Walk + attach |
| Delete | `O(log n)` | Complex cases |
| Inorder walk | `O(n)` | Visit every node |
| Height | `O(n)` | Worst (skewed) |

**Catch:** A plain BST degrades to `O(n)` on sorted input -- say "self-balancing" aloud (AVL/Red-Black fix it with rotations). Duplicates need an explicit policy. Wrong tool for prefix search (trie) or `O(1)` lookup (hash). Heap knows only the extreme; BST knows order. Nodes scatter, so cache locality suffers.

**Keywords:** validate, kth smallest, LCA, sorted, inorder, successor, predecessor, ceil, floor, range sum, delete node, balance, sorted array to BST.

## Study notes

- **Invariant:** all left < node < all right (strict for LC validate).
- **Validate:** pass `(lo, hi)` bounds, not only parent compare.
- **Kth smallest:** inorder count (or augment tree).
- **LCA in BST:** both sides → node; else go left or right.
- **Traps:** duplicates policy; skewed tree `O(n)`; confuse with heap.
- **See also:** Trees page for general DFS/BFS.

### Active revision
State the BST invariant in one line. For validate, why are bounds required? For LCA, when do you stop and return the node?

### Decision table

| Task | Approach |
|------|----------|
| Search / insert | Compare and walk left/right |
| Validate | Recurse with `(lo, hi)` |
| Kth smallest | Inorder until count = k |
| LCA | Both < → left; both > → right; else root |
| Delete | 0/1/2 children; successor if two |

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

Every node must lie in `(lo, hi)`. Going left sets `hi = node.val`; going right sets `lo = node.val`.

[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

```js
// Time: O(n) · Space: O(h)
// keep valid (low, high) range
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    
    function recurse(root, min, max){
        
        //base cases
        if(root === null) return true;
        
        if((root.val >= max || root.val <= min)){
            return false;
        }
        
        //recurrence relation
        return recurse(root.left, min, root.val) && recurse(root.right, root.val, max);
        
    }
    return recurse(root, -Infinity, Infinity)
    
};
```

## Kth Smallest Element in a BST

Inorder traversal is sorted — the kth visit is the answer. Prefer an iterative stack so you need not traverse the whole tree.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```js
// Time: O(h+k) · Space: O(h)
// inorder; count to k
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let arr = [];
    inOrder(root, arr);
    
    return findKth(arr, k)
};

function inOrder(root, arr){
    if(!root) return;
    
    inOrder(root.left, arr);
    arr.push(root.val);
    inOrder(root.right, arr);
}

function findKth(arr, k){
    for(let i = 0; i < arr.length; i++){
        if(i === k - 1) return arr[i];
    }
}
```

## Lowest Common Ancestor of a BST

Use the BST property — both smaller → left, both larger → right, otherwise this node is the LCA.

[Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```js
// Time: O(h) · Space: O(1)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    
    if(p.val < root.val && q.val < root.val){
        return lowestCommonAncestor(root.left, p, q);
    } else if(p.val > root.val && q.val > root.val){
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
    
};
```

## Delete Node in a BST

Find the node, then three cases: leaf (remove), one child (promote child), two children (copy inorder successor — min in right — then delete the successor).

[Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

```js
// Time: O(n) · Space: O(n)
// Recurse to target; three delete cases at match
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