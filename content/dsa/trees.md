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
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
// 1 + max(left, right)
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
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) {
        return 0;
    }
    
    let depth = 0;
    let queue = [root];
    
    while(queue.length){
        let len = queue.length;
        
        for(let i = 0; i < len; i++){
            let current = queue.shift();
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
        
        depth++
    }
    
    return depth;
};
```

## Binary Tree Level Order Traversal

Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```js
// LC: https://leetcode.com/problems/binary-tree-level-order-traversal/
// BFS queue by levels
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(root === null) return [];
    
    let res = [];
    let queue = [root];
    
    while(queue.length){
        let levelArr = [];
        let levelSize = queue.length;
        while(levelSize){
            let current = queue.shift();
            
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            
            levelArr.push(current.val);
            levelSize--;
        }
        res.push(levelArr);
    }
    
    return res;
};
```

## Diameter of Binary Tree

Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

```js
// LC: https://leetcode.com/problems/diameter-of-binary-tree/
// longest path through a node
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
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let maxD = 0;
    
    function dfs(node){
        
        if(!node) return 0;
        
        let left = dfs(node.left);
        let right = dfs(node.right);
        let currD = left + right;
        
        maxD = Math.max(currD, maxD);
        
        return Math.max(left+1, right+1)
        
    }
    dfs(root);
    
    return maxD;
    
};
```

## Lowest Common Ancestor of a Binary Tree

If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```js
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
// if split across sides → node is LCA
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
    
    function dfs(node){
        
        //base cases
        if(node === null) return null;
        if(node === p || node === q) return node;
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        if(left && right) return node;
        return left || right;
        
    }
    
    return dfs(root);
    
};
```

## Binary Tree Maximum Path Sum

A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

```js
// LC: https://leetcode.com/problems/binary-tree-maximum-path-sum/
// gain = val + max(0, child gain)
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
 * @return {number}
 */
var maxPathSum = function(root) {
    
    let max = -Infinity;
    
    function dfs(root){
        
        if(!root) return 0;
        
        let left = Math.max(0,dfs(root.left));
        let right = Math.max(0,dfs(root.right));
        let curMax = left + root.val + right;
        
        max = Math.max(curMax, max);
        
        return root.val + Math.max(left, right);
        
    }
    
    dfs(root);
    return max;
    
};
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

Inorder of a BST is sorted. Walk left, then me (count++), then right. Stop at k.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```js
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
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

## Invert Binary Tree

Har node ke left/right swap karo. Recursion se dono subtree invert.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

```js
// LC: https://leetcode.com/problems/invert-binary-tree/
// swap children; recurse
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    
    if(root) {
        [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    }
    
    return root;
    
};
```

## Same Tree

Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.

[Same Tree](https://leetcode.com/problems/same-tree/)

```js
// LC: https://leetcode.com/problems/same-tree/
// both null / values equal / recurse kids
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    
    //base cases
    if(p === null && q === null) return true;
    if(p === null || q === null) return false;
    
    if(p.val === q.val){
        
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        
    }
    
    return false;
    
};
```

## Subtree of Another Tree

`s` me `t` jaisa subtree hai kya? Har node ko root maan ke sameTree check.

[Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

```js
// LC: https://leetcode.com/problems/subtree-of-another-tree/
// isSame at every node of root
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    
    function isSame(root1, root2){
        if(!root1 && !root2) return true;
        if(!root1 || !root2 || root1.val !== root2.val) return false;
        
        return isSame(root1.left, root2.left) && isSame(root1.right, root2.right);
    }
    
    function dfs(node){
        if(!node) return false;
        
        if(isSame(node, subRoot)){
            return true;
        }
        
        return dfs(node.left) || dfs(node.right);
    }
    
    return dfs(root);
};
```
