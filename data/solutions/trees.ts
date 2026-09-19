import type { SolutionGroup } from "./types";

export const TREES_SOLUTIONS: SolutionGroup = {
  id: "trees",
  title: "Trees",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "same-tree",
      title: "Same Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=b3Gt9UZ_Ufw&ab_channel=AlgoJS",
      body: `Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.

[Same Tree](https://leetcode.com/problems/same-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=vT2ySdkTn0k&ab_channel=AlgoJS",
      body: `Depth is 1 plus the deeper child. Empty tree is 0.

[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "minimum-depth-of-binary-tree",
      title: "Minimum Depth of Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=hmvao4o22-w&t=160s&ab_channel=AlgoJS",
      body: `Leaf tak sabse chhota rasta — ek bachcha missing ho to doosre se jao, min mat lo blindly.

[Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
var minDepth = function(root) {
    if(root === null) return 0;
    
    let minDepth = 1;
    
    let queue = [root];
    
    //bfs
    while(queue.length){
        let levelSize = queue.length;
        while(levelSize){
            
            let current = queue.shift();
            if(current.left === null && current.right === null){
                return minDepth;
            }else {
                if(current.left)queue.push(current.left);
                if(current.right)queue.push(current.right);
            }
            levelSize--;
            
        }
        minDepth++;
    }
    return minDepth;
};
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "path-sum",
      title: "Path Sum",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=BKCxvtVxDrQ&ab_channel=AlgoJS",
      body: `Root se leaf tak sum ghatate jao — leaf pe zero bache to rasta mil gaya.

[Path Sum](https://leetcode.com/problems/path-sum/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    
    function recurse(root, currSum){
        
        if(root === null) return false;
        
        currSum += root.val;
        
        if(!root.left && !root.right){
            return currSum === targetSum;
        }
        
        return recurse(root.left, currSum) || recurse(root.right, currSum);
        
    }
    
    return recurse(root, 0);
    
};
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "binary-tree-paths",
      title: "Binary Tree Paths",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=J8ZJfz8CqRo&t=184s&ab_channel=AlgoJS",
      body: `Root se leaf tak rasta string me jodte jao — leaf pe pakdo, wapas aao.

[Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    
    if(!root) return [];
    
    let res = [];
    
    function dfs(root, path){
        
        path.push(root.val);
        
        if(!root.left && !root.right){
            res.push(path.join("->"))
        }
        
        if(root.left) dfs(root.left, path);
        if(root.right) dfs(root.right, path);
        
        path.pop();
        
    }
    dfs(root, [])
    
    return res;
    
};
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "invert-binary-tree",
      title: "Invert Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Wz-5PlBYGhA&ab_channel=AlgoJS",
      body: `Har node ke left/right swap karo. Recursion se dono subtree invert.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "lowest-common-ancestor-of-a-binary-search-tree",
      title: "Lowest Common Ancestor of a BST",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=fehixeGZY9k&ab_channel=AlgoJS",
      body: `BST property use karo — dono chhote to left, dono bade to right, warna yehi node LCA hai.

[Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "symmetric-tree",
      title: "Symmetric Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=L8S1Ij93NY4&ab_channel=AlgoJS",
      body: `Mirror check karo — left ka left, right ke right se mile to symmetric hai.

[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
var isSymmetric = function(root) {
    
    function recurse(l, r){
        
        if(!l && !r) return true;
        
        if(!l || !r || l.val !== r.val) return false;
        
        return recurse(l.left, r.right) && recurse(l.right, r.left);
        
    }
    return recurse(root.left, root.right);
    
};
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Q2M9GYs_kuM&t=286s&ab_channel=AlgoJS",
      body: `Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "range-sum-of-bst",
      title: "Range Sum of BST",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=AdX9Gd7GJYs&t=41s&ab_channel=AlgoJS",
      body: `Range se bahar wala hissa kaato — low se chhota ho to sirf right, high se bada ho to sirf left.

[Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {
    //base case
    if(!root) return 0;
    
    if(root.val > high){
        return rangeSumBST(root.left, low, high);
    } else if(root.val < low){
        return rangeSumBST(root.right, low, high);
    } else {
        return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
    }
};
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "find-all-the-lonely-nodes",
      title: "Find All Lonely Nodes",
      diff: "Easy",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=YATikdLWwsw&ab_channel=AlgoJS",
      body: `Jis node ka bhai-behen na ho (single child) wo lonely hai — DFS me pakadte jao.

[Find All Lonely Nodes](https://leetcode.com/problems/find-all-the-lonely-nodes/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(n) · Space: O(h)
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
 * @return {number[]}
 */
var getLonelyNodes = function(root) {
    let res = [];
    
    function dfs(root){
        if(!root) return;
        if(root.left && !root.right) res.push(root.left.val);
        if(root.right && !root.left) res.push(root.right.val);
        
        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    
    return res;
};
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "subtree-of-another-tree",
      title: "Subtree of Another Subtree",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=amZ7QmuIIII&ab_channel=AlgoJS",
      body: `\`s\` me \`t\` jaisa subtree hai kya? Har node ko root maan ke sameTree check.

[Subtree of Another Subtree](https://leetcode.com/problems/subtree-of-another-tree/)

\`\`\`js
// Time: O(n·m) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "validate-binary-search-tree",
      title: "Validate Binary Search Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=i1m-rywzw68&t=8s&ab_channel=AlgoJS",
      body: `Har node \`(lo, hi)\` seema me hona chahiye. Left me jaao to \`hi = node.val\`, right me jaao to \`lo = node.val\`.

[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 13,
      lcSlug: "sum-root-to-leaf-numbers",
      title: "Sum Root to Leaf Numbers",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=9p32QQ3DuR0&ab_channel=AlgoJS",
      body: `Number aage badhate jao (x10 + digit) — leaf pe jod do.

[Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)

\`\`\`js
// Time: O(n) · Space: O(h)
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

var sumNumbers = function(root) {
    let res = [];
    
    function recurse(root, currArr){
        if(root === null) return 0;
        
        currArr.push(root.val);
        
        if(!root.left && !root.right){
            let newNum = Number(currArr.join(""));
            res.push(newNum);
        }
        
        recurse(root.left, currArr);
        recurse(root.right, currArr);
        currArr.pop();
        
    }
    recurse(root, []);
    
    let nums = 0;
    for(let i = 0; i < res.length; i++){
        nums += res[i];
    }
    
    return nums;
};
\`\`\``,
    },
    {
      id: 14,
      lcSlug: "path-sum-ii",
      title: "Path Sum II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=_fvGemi7ao8&t=1s&ab_channel=AlgoJS",
      body: `Path Sum jaisa, par raste bhi chahiye — path array saath le jao, leaf pe copy rakho.

[Path Sum II](https://leetcode.com/problems/path-sum-ii/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    let res = [];
    
    function dfs(root, currSum, currArr){
        if(root === null) return [];
        
        currSum += root.val;
        currArr.push(root.val);
        
        if(!root.left && !root.right && currSum === targetSum){
            res.push([...currArr]);
        }
        
        dfs(root.left, currSum, currArr);
        dfs(root.right, currSum, currArr);
        
        //backtrack
        currArr.pop();
    }
    
    dfs(root, 0, [])
    
    return res;
};
\`\`\``,
    },
    {
      id: 15,
      lcSlug: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Uub7EVnp0P8&ab_channel=AlgoJS",
      body: `Har level ka aakhri node dikhta hai — level order me last wala uthao.

[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

\`\`\`js
// Time: O(n) · Space: O(w)
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    
    if(root === null) return [];
    
    let res = [];
    let queue = [root];
    
    while(queue.length){
        let level = [];
        let levelSize = queue.length;
        while(levelSize){
            let current = queue.shift();
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            
            level.push(current.val);
            levelSize--;
        }
        res.push(level[level.length-1]);
    }
    
    return res;
    
};
\`\`\``,
    },
    {
      id: 16,
      lcSlug: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=oI42cbNqzwA&ab_channel=AlgoJS",
      body: `Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

\`\`\`js
// Time: O(n) · Space: O(w)
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
\`\`\``,
    },
    {
      id: 17,
      lcSlug: "kth-smallest-element-in-a-bst",
      title: "Kth Smallest Element in a BST",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=za9OrjpbaCs&ab_channel=AlgoJS",
      body: `Inorder traversal sorted order deta hai — kth visit hi jawab hai. Iterative stack se karo, poora traverse mat karo.

[Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

\`\`\`js
// Time: O(h+k) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 18,
      lcSlug: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=6B6xk-ZqWN8&ab_channel=AlgoJS",
      body: `If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
    {
      id: 19,
      lcSlug: "deepest-leaves-sum",
      title: "Deepest Leaves Sum",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Z0q319GTuDE&ab_channel=AlgoJS",
      body: `Level order me aakhri level ka sum uthao — BFS me har level overwrite karta jao.

[Deepest Leaves Sum](https://leetcode.com/problems/deepest-leaves-sum/)

\`\`\`js
// Time: O(n) · Space: O(w)
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
var deepestLeavesSum = function(root) {
    let sum = 0;
    let deepestLevel = 0;
    
    function dfs(root, level){
        if(!root) return;
        
        if(level === deepestLevel){
            sum += root.val;
        } else if(level > deepestLevel){
            deepestLevel = level;
            sum = root.val;
        }
        
        dfs(root.left, level+1);
        dfs(root.right, level+1);
    }
    
    dfs(root, 0);
    return sum;
};
\`\`\``,
    },
    {
      id: 20,
      lcSlug: "balance-a-binary-search-tree",
      title: "Balance a Binary Search Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=-z4g2qW-d3M&ab_channel=AlgoJS",
      body: `Inorder nikalo (sorted milega), phir beech se ped banao — Convert Sorted Array wala tareeka.

[Balance a Binary Search Tree](https://leetcode.com/problems/balance-a-binary-search-tree/)

\`\`\`js
// Time: O(n) · Space: O(n)
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
var balanceBST = function(root) {
    let arr = [];
    inOrder(root, arr);
    return buildTree(arr);
};

function inOrder(root, arr){
    if(!root) return;
    
    inOrder(root.left, arr);
    arr.push(root.val);
    inOrder(root.right, arr);
}

function buildTree(arr){
    if(arr.length === 0) return null;
    
    let mid = Math.floor(arr.length / 2);
    let head = new TreeNode(arr[mid]);
    
    let left = arr.slice(0, mid);
    let right = arr.slice(mid+1);
    
    head.left = buildTree(left);
    head.right = buildTree(right);
    
    return head;
}
\`\`\``,
    },
    {
      id: 21,
      lcSlug: "find-leaves-of-binary-tree",
      title: "Find Leaves of a Binary Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=sWRmUgjRFoY&ab_channel=AlgoJS",
      body: `Height nikalo — same height wale same round me jhadte hain. Postorder me group karo.

[Find Leaves of a Binary Tree](https://leetcode.com/problems/find-leaves-of-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(n)
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
var findLeaves = function(root) {
    let res = {};
    
    function dfs(root){
        if(!root) return 0;
        
        let left = dfs(root.left);
        let right = dfs(root.right);
        let depth = Math.max(left, right);
        
        if(!res[depth]){
            res[depth] = [root.val];
        } else {
            res[depth].push(root.val);
        }
        
        return depth + 1;
    }
    dfs(root);
    
    return Object.values(res);
};
\`\`\``,
    },
    {
      id: 22,
      lcSlug: "binary-tree-vertical-order-traversal",
      title: "Binary Tree Vertical Order Traversal",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=f4T35dCZi-0&ab_channel=AlgoJS",
      body: `Column number do (left -1, right +1) — BFS order me column map bharo, sort karke nikalo.

[Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(n) · Space: O(n)
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
var verticalOrder = function(root) {
    if(!root) return [];
    let queue = [[root, 0]];
    let map = {};
    
    while(queue.length){
        const [node, level] = queue.shift();
        
        if(!map[level]){
            map[level] = [node.val];
        } else {
            map[level].push(node.val);
        }
        
        if(node.left) queue.push([node.left, level-1]);
        if(node.right) queue.push([node.right, level+1]);
    }
    
    return Object.keys(map).sort((a,b) => a-b).map((k) => map[k]);
};
\`\`\``,
    },
    {
      id: 23,
      lcSlug: "n-ary-tree-level-order-traversal",
      title: "N Array Tree Level Order Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=0UYmdpvG_Gg&ab_channel=AlgoJS",
      body: `Binary wala hi funda — bas children loop me daalo, level-wise nikalo.

[N Array Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

\`\`\`js
// Time: O(n) · Space: O(w)
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    
    if(!root) return [];
    
    let queue = [root];
    
    let res = [];
    
    while(queue.length){
        let level = [];
        let levelSize = queue.length;
        while(levelSize){
            let current = queue.shift();
            
            for(let i = 0; i < current.children.length; i++){
                if(current.children[i]) queue.push(current.children[i]);
            }
            
            level.push(current.val);
            levelSize--;
        }
        res.push(level);
    }
    
    return res;
    
};
\`\`\``,
    },
    {
      id: 24,
      lcSlug: "count-good-nodes-in-binary-tree",
      title: "Count Good Nodes In Binary Tree",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=UwhjCzvBB8Y&ab_channel=AlgoJS",
      body: `Ab tak ka max saath le jao — node usse kam nahi to good hai, max update karke aage badho.

[Count Good Nodes In Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
var goodNodes = function(root) {
    let count = 0;
    let max = root.val;
    
    function dfs(root, max){
        if(root === null) return;
        
        if(root.val >= max){
            max = Math.max(max, root.val);
            count++;
        }
        
        dfs(root.left, max);
        dfs(root.right, max);
    }
    dfs(root, max);
    
    return count;
};
\`\`\``,
    },
    {
      id: 25,
      lcSlug: "binary-tree-longest-consecutive-sequence",
      title: "Binary Tree Longest Consecutive Sequence",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=Bna4S8Auomc&ab_channel=AlgoJS",
      body: `Parent se +1 hai to chain badhao, nahi to 1 se restart karo — max yaad rakho.

[Binary Tree Longest Consecutive Sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(n) · Space: O(h)
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
var longestConsecutive = function(root) {
    let max = -Infinity;
    let prev = -Infinity;
    let count = 0;
    
    function dfs(root, count, prev){
        if(root === null) return;
        
        if(root.val-1 === prev){
            count++;
        } else {
            count = 1;
        }
        
        max = Math.max(max, count);
        dfs(root.left, count, root.val);
        dfs(root.right, count, root.val);
    }
    dfs(root, count, prev);
    
    return max === -Infinity ? 0 : max;
};
\`\`\``,
    },
    {
      id: 26,
      lcSlug: "binary-tree-zigzag-level-order-traversal",
      title: "Binary Tree Zigzag Level Order Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=fq9bj4qOp30&ab_channel=AlgoJS",
      body: `Level order jaisa, bas alternate level ulti — flag se direction badlo.

[Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

\`\`\`js
// Time: O(n) · Space: O(w)
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
var zigzagLevelOrder = function(root) {
    if(!root) return [];
    const queue = [root];
    
    const res = [];
    let depth = 0;
    
    while(queue.length){
        const level = [];
        let levelSize = queue.length;
        while(levelSize){
            const current = queue.shift();
            
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            
            if(depth % 2 === 0){
                level.push(current.val);
            } else {
                level.unshift(current.val);
            }
            levelSize--;
        }
        res.push(level);
        depth++;
    }
    return res;
};
\`\`\``,
    },
    {
      id: 27,
      lcSlug: "keys-and-rooms",
      title: "Keys and Rooms",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Ro-QwE-5fio&ab_channel=AlgoJS",
      body: `0 se DFS chalao — mili key se naya kamra kholo. Sab khule to true.

[Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)

\`\`\`js
// Time: O(n+e) · Space: O(n)
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    let visited = new Set();
    let keyList = new Set();
    
    function dfs(currRoom, currKeys){
        if(visited.has(currRoom)) return;
        visited.add(currRoom);
        
        for(let key of rooms[currRoom]){
            currKeys.add(key);
        }
        
        for(let key of currKeys){
            dfs(key, currKeys);
        }
    }
    dfs(0, keyList);
    
    return visited.size === rooms.length;
};
\`\`\``,
    },
    {
      id: 28,
      lcSlug: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree From Preorder And Inorder Traversal",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Zr2NDgOPsTE&ab_channel=AlgoJS",
      body: `Preorder ka pehla root hai, inorder me uski position left/right baant-ti hai. Map se O(1) lookup rakho.

[Construct Binary Tree From Preorder And Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

\`\`\`js
// Time: O(n) · Space: O(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    
    function recurse(pStart, pEnd, inStart, inEnd){
        
        //base case
        if(pStart > pEnd || inStart > inEnd) return null;
        
        let rootVal = preorder[pStart];
        let inIndex = inorder.indexOf(rootVal);
        let nLeft = inIndex - inStart;
        
        let root = new TreeNode(rootVal);
        
        root.left = recurse(pStart+1, pStart+nLeft, inStart, inIndex-1);
        root.right = recurse(pStart+1+nLeft, pEnd, inIndex+1, inEnd);
        
        return root;
        
    }
    
    return recurse(0, preorder.length-1, 0, inorder.length-1);
    
};
\`\`\``,
    },
    {
      id: 29,
      lcSlug: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=EK0A__Ri2Ms&ab_channel=AlgoJS",
      body: `A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

\`\`\`js
// Time: O(n) · Space: O(h)
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
\`\`\``,
    },
      ],
    },
  ],
};
