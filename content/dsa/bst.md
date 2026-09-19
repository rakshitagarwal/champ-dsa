# BST

**Definition:** Binary Search Tree me har node ke liye left subtree chhota aur right subtree bada hota hai (`left < node < right`). Isliye search/insert/delete `O(log n)` me hote hain (balanced ho to), aur inorder traversal sorted order deta hai.

**When to use:** Sorted data chahiye + insert/delete bhi ho (array sort baar-baar mehengi), BST validate karna ho, kth smallest nikalna ho, ya LCA dhoondhna ho.

**How it works:** Compare karke left/right jao — chhota hai to left, bada hai to right. Validate karne ke liye min/max bounds saath le jao (`lo < node.val < hi`). Inorder (left-node-right) hamesha sorted deta hai. Time `O(h)`, balanced me `O(log n)`.

## Study notes

- **Invariant:** all left < node < all right (strict for LC validate).
- **Validate:** pass `(lo, hi)` bounds, not only parent compare.
- **Kth smallest:** inorder count (or augment tree).
- **LCA in BST:** both sides → node; else go left or right.
- **Traps:** duplicates policy; skewed tree `O(n)`; confuse with heap.
- **See also:** Trees page for general DFS/BFS.

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

Inorder traversal sorted order deta hai — kth visit hi jawab hai. Iterative stack se karo, poora traverse mat karo.

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

BST property use karo — dono chhote to left, dono bade to right, warna yehi node LCA hai.

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

Node dhoondho, phir 3 cases: leaf (hatao), ek child (child jodo), do children (successor lao — right me sabse chhota — value copy karke successor delete karo).

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
