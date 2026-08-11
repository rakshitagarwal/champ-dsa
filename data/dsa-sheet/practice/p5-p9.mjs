/** Phases 5–9 practice questions (ChampDSA roadmap). */
export const PRACTICE_P5_TO_P9 = {
  // —— PHASE 5 ——
  "p5-pat-pick": {
    kind: "questions",
    questions: [
      {
        title: "Subsets",
        url: "https://leetcode.com/problems/subsets/",
        source: "LeetCode",
        hint: "At each index: pick or not pick, then recurse; collect when done.",
      },
    ],
  },
  "p5-pat-take": {
    kind: "questions",
    questions: [
      {
        title: "Combination Sum",
        url: "https://leetcode.com/problems/combination-sum/",
        source: "LeetCode",
        hint: "Take (reuse same index) or skip to next; prune when remaining < 0.",
      },
    ],
  },
  "p5-pat-multi": {
    kind: "questions",
    questions: [
      {
        title: "Letter Combinations of a Phone Number",
        url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        source: "LeetCode",
        hint: "For each digit, branch over its letters; build string along the path.",
      },
    ],
  },
  "p5-pat-tree": {
    kind: "questions",
    questions: [
      {
        title: "Generate Parentheses",
        url: "https://leetcode.com/problems/generate-parentheses/",
        source: "LeetCode",
        hint: "Recursive tree of '(' / ')'; only add if open/close counts stay valid.",
      },
    ],
  },
  "p5-pat-state": {
    kind: "questions",
    questions: [
      {
        title: "Word Search",
        url: "https://leetcode.com/problems/word-search/",
        source: "LeetCode",
        hint: "DFS with visited state on the board; backtrack after exploring.",
      },
    ],
  },
  "p5-sub-subsets": {
    kind: "questions",
    questions: [
      {
        title: "Subsets",
        url: "https://leetcode.com/problems/subsets/",
        source: "LeetCode",
        hint: "Backtracking or bit mask over all 2^n subsets.",
      },
    ],
  },
  "p5-sub-subsets2": {
    kind: "questions",
    questions: [
      {
        title: "Subsets II",
        url: "https://leetcode.com/problems/subsets-ii/",
        source: "LeetCode",
        hint: "Sort first; skip duplicate values at the same depth.",
      },
    ],
  },
  "p5-sub-seq": {
    kind: "questions",
    questions: [
      {
        title: "Distinct Subsequences",
        url: "https://leetcode.com/problems/distinct-subsequences/",
        source: "LeetCode",
        hint: "Count ways s forms t — DP/recursion with pick matching chars.",
      },
    ],
  },
  "p5-sub-target": {
    kind: "questions",
    questions: [
      {
        title: "Combination Sum III",
        url: "https://leetcode.com/problems/combination-sum-iii/",
        source: "LeetCode",
        hint: "Pick distinct 1–9; stop when count/k or sum constraints break.",
      },
    ],
  },
  "p5-sub-combo": {
    kind: "questions",
    questions: [
      {
        title: "Combination Sum",
        url: "https://leetcode.com/problems/combination-sum/",
        source: "LeetCode",
        hint: "Unlimited reuse; recurse with same start index after picking.",
      },
    ],
  },
  "p5-perm-basic": {
    kind: "questions",
    questions: [
      {
        title: "Permutations",
        url: "https://leetcode.com/problems/permutations/",
        source: "LeetCode",
        hint: "Swap-based or used[] boolean; build all orderings.",
      },
    ],
  },
  "p5-perm-ii": {
    kind: "questions",
    questions: [
      {
        title: "Permutations II",
        url: "https://leetcode.com/problems/permutations-ii/",
        source: "LeetCode",
        hint: "Sort; skip a duplicate if the previous identical wasn't used.",
      },
    ],
  },
  "p5-perm-swap": {
    kind: "questions",
    questions: [
      {
        title: "Permutations",
        url: "https://leetcode.com/problems/permutations/",
        source: "LeetCode",
        hint: "For i in [start..n): swap start with i, recurse start+1, swap back.",
      },
    ],
  },
  "p5-perm-next": {
    kind: "questions",
    questions: [
      {
        title: "Next Permutation",
        url: "https://leetcode.com/problems/next-permutation/",
        source: "LeetCode",
        hint: "Find pivot, swap with next greater to right, reverse suffix.",
      },
    ],
  },
  "p5-bt-combo": {
    kind: "questions",
    questions: [
      {
        title: "Combination Sum II",
        url: "https://leetcode.com/problems/combination-sum-ii/",
        source: "LeetCode",
        hint: "Each number once; sort and skip duplicates at the same level.",
      },
    ],
  },
  "p5-bt-nqueens": {
    kind: "questions",
    questions: [
      {
        title: "N-Queens",
        url: "https://leetcode.com/problems/n-queens/",
        source: "LeetCode",
        hint: "Place row by row; track cols and diagonals as forbidden sets.",
      },
    ],
  },
  "p5-bt-sudoku": {
    kind: "questions",
    questions: [
      {
        title: "Sudoku Solver",
        url: "https://leetcode.com/problems/sudoku-solver/",
        source: "LeetCode",
        hint: "Try digits 1–9 in empty cells; validate row/col/box; backtrack.",
      },
    ],
  },
  "p5-bt-word": {
    kind: "questions",
    questions: [
      {
        title: "Word Search",
        url: "https://leetcode.com/problems/word-search/",
        source: "LeetCode",
        hint: "Start DFS from each cell matching word[0]; mark visited then undo.",
      },
    ],
  },
  "p5-bt-maze": {
    kind: "questions",
    questions: [
      {
        title: "Rat in a Maze Problem - I",
        url: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
        source: "GFG",
        hint: "DFS four directions; mark path; collect strings of moves when goal reached.",
      },
    ],
  },
  "p5-bt-csp": {
    kind: "questions",
    questions: [
      {
        title: "Beautiful Arrangement",
        url: "https://leetcode.com/problems/beautiful-arrangement/",
        source: "LeetCode",
        hint: "Backtrack permutations with divisibility constraints pruned early.",
      },
    ],
  },
  "p5-dac-merge": {
    kind: "questions",
    questions: [
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Merge sort: split, sort halves, merge in O(n).",
      },
    ],
  },
  "p5-dac-quick": {
    kind: "questions",
    questions: [
      {
        title: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        source: "LeetCode",
        hint: "Quickselect partition until pivot index is n−k.",
      },
    ],
  },
  "p5-dac-inversions": {
    kind: "questions",
    questions: [
      {
        title: "Reverse Pairs",
        url: "https://leetcode.com/problems/reverse-pairs/",
        source: "LeetCode",
        hint: "During merge sort, count cross-half pairs before merging.",
      },
    ],
  },
  "p5-dac-select": {
    kind: "questions",
    questions: [
      {
        title: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        source: "LeetCode",
        hint: "QuickSelect: average O(n) selection via partitioning.",
      },
    ],
  },
  "p5-dac-bs": {
    kind: "questions",
    questions: [
      {
        title: "Binary Search",
        url: "https://leetcode.com/problems/binary-search/",
        source: "LeetCode",
        hint: "Recursive binary search on [lo, hi] mid split.",
      },
    ],
  },

  // —— PHASE 6 ——
  "p6-trav-pre": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Preorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
        source: "LeetCode",
        hint: "Root → left → right (recursive or stack).",
      },
    ],
  },
  "p6-trav-in": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Inorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        source: "LeetCode",
        hint: "Left → root → right; BST inorder is sorted.",
      },
    ],
  },
  "p6-trav-post": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Postorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
        source: "LeetCode",
        hint: "Left → right → root; two-stack or carefully ordered single stack.",
      },
    ],
  },
  "p6-trav-iter": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Inorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        source: "LeetCode",
        hint: "Explicit stack: go left, pop/visit, go right.",
      },
    ],
  },
  "p6-trav-morris": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Inorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        source: "LeetCode",
        hint: "Morris: thread predecessor→current, visit, then restore links (O(1) extra).",
      },
    ],
  },
  "p6-trav-level": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Level Order Traversal",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        source: "LeetCode",
        hint: "BFS queue; process level size each round.",
      },
    ],
  },
  "p6-prop-max-depth": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Depth of Binary Tree",
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        source: "LeetCode",
        hint: "1 + max(depth(left), depth(right)).",
      },
    ],
  },
  "p6-prop-min-depth": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Depth of Binary Tree",
        url: "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
        source: "LeetCode",
        hint: "BFS to first leaf is easiest; recursion must handle one-child nodes.",
      },
    ],
  },
  "p6-prop-balanced": {
    kind: "questions",
    questions: [
      {
        title: "Balanced Binary Tree",
        url: "https://leetcode.com/problems/balanced-binary-tree/",
        source: "LeetCode",
        hint: "Return height or −1 if unbalanced; check |lh−rh| ≤ 1 bottom-up.",
      },
    ],
  },
  "p6-prop-diameter": {
    kind: "questions",
    questions: [
      {
        title: "Diameter of Binary Tree",
        url: "https://leetcode.com/problems/diameter-of-binary-tree/",
        source: "LeetCode",
        hint: "At each node, path = leftHeight+rightHeight; track global max.",
      },
    ],
  },
  "p6-prop-path-sum": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Maximum Path Sum",
        url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        source: "LeetCode",
        hint: "Return max gain upward; update global with left+node+right as bend path.",
      },
    ],
  },
  "p6-path-root-leaf": {
    kind: "questions",
    questions: [
      {
        title: "Path Sum",
        url: "https://leetcode.com/problems/path-sum/",
        source: "LeetCode",
        hint: "DFS subtract node.val; true if leaf and remaining == 0.",
      },
    ],
  },
  "p6-path-root-node": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Paths",
        url: "https://leetcode.com/problems/binary-tree-paths/",
        source: "LeetCode",
        hint: "DFS build path string/list from root to each leaf.",
      },
    ],
  },
  "p6-path-sum": {
    kind: "questions",
    questions: [
      {
        title: "Path Sum II",
        url: "https://leetcode.com/problems/path-sum-ii/",
        source: "LeetCode",
        hint: "Backtrack collecting all root→leaf paths that sum to target.",
      },
    ],
  },
  "p6-path-all": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Paths",
        url: "https://leetcode.com/problems/binary-tree-paths/",
        source: "LeetCode",
        hint: "Enumerate every root-to-leaf path.",
      },
    ],
  },
  "p6-path-minmax": {
    kind: "questions",
    questions: [
      {
        title: "Sum Root to Leaf Numbers",
        url: "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
        source: "LeetCode",
        hint: "Pass running number 10*prev+val; add at leaves.",
      },
    ],
  },
  "p6-view-left": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Right Side View",
        url: "https://leetcode.com/problems/binary-tree-right-side-view/",
        source: "LeetCode",
        hint: "Left view = first node per level in BFS (mirror of right-side view).",
      },
    ],
  },
  "p6-view-right": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Right Side View",
        url: "https://leetcode.com/problems/binary-tree-right-side-view/",
        source: "LeetCode",
        hint: "BFS: last node of each level is the right side.",
      },
    ],
  },
  "p6-view-top": {
    kind: "questions",
    questions: [
      {
        title: "Top View of Binary Tree",
        url: "https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1",
        source: "GFG",
        hint: "BFS with horizontal distance; first node seen per HD is top view.",
      },
    ],
  },
  "p6-view-bottom": {
    kind: "questions",
    questions: [
      {
        title: "Bottom View of Binary Tree",
        url: "https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1",
        source: "GFG",
        hint: "BFS with HD; last node seen per HD is bottom view.",
      },
    ],
  },
  "p6-view-boundary": {
    kind: "questions",
    questions: [
      {
        title: "Boundary Traversal of Binary Tree",
        url: "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1",
        source: "GFG",
        hint: "Left boundary + leaves + reverse right boundary (avoid doubles).",
      },
    ],
  },
  "p6-rel-lca": {
    kind: "questions",
    questions: [
      {
        title: "Lowest Common Ancestor of a Binary Tree",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        source: "LeetCode",
        hint: "If node is p/q return it; if both sides return non-null, node is LCA.",
      },
    ],
  },
  "p6-rel-distance": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Distance Between BST Nodes",
        url: "https://leetcode.com/problems/minimum-distance-between-bst-nodes/",
        source: "LeetCode",
        hint: "For general tree: path via LCA; for BST, inorder adjacent diffs.",
      },
    ],
  },
  "p6-rel-ancestors": {
    kind: "questions",
    questions: [
      {
        title: "Lowest Common Ancestor of a Binary Tree",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        source: "LeetCode",
        hint: "DFS returning whether target found builds ancestor awareness.",
      },
    ],
  },
  "p6-rel-subtree": {
    kind: "questions",
    questions: [
      {
        title: "Subtree of Another Tree",
        url: "https://leetcode.com/problems/subtree-of-another-tree/",
        source: "LeetCode",
        hint: "For each node, check identical-tree match against subRoot.",
      },
    ],
  },
  "p6-con-ser": {
    kind: "questions",
    questions: [
      {
        title: "Serialize and Deserialize Binary Tree",
        url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        source: "LeetCode",
        hint: "Preorder/BFS with null markers; parse tokens back into tree.",
      },
    ],
  },
  "p6-con-pre-in": {
    kind: "questions",
    questions: [
      {
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        source: "LeetCode",
        hint: "Preorder[0] is root; split inorder by root; recurse on ranges.",
      },
    ],
  },
  "p6-con-in-post": {
    kind: "questions",
    questions: [
      {
        title: "Construct Binary Tree from Inorder and Postorder Traversal",
        url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
        source: "LeetCode",
        hint: "Postorder last is root; split inorder; build right then left carefully.",
      },
    ],
  },
  "p6-con-flatten": {
    kind: "questions",
    questions: [
      {
        title: "Flatten Binary Tree to Linked List",
        url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
        source: "LeetCode",
        hint: "Preorder weave: attach left chain then right, or reverse postorder linking.",
      },
    ],
  },

  // —— PHASE 7 ——
  "p7-basics-search": {
    kind: "questions",
    questions: [
      {
        title: "Search in a Binary Search Tree",
        url: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
        source: "LeetCode",
        hint: "Go left if target < node, else right — O(h).",
      },
    ],
  },
  "p7-basics-insert": {
    kind: "questions",
    questions: [
      {
        title: "Insert into a Binary Search Tree",
        url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
        source: "LeetCode",
        hint: "Walk to null child position and attach the new node.",
      },
    ],
  },
  "p7-basics-delete": {
    kind: "questions",
    questions: [
      {
        title: "Delete Node in a BST",
        url: "https://leetcode.com/problems/delete-node-in-a-bst/",
        source: "LeetCode",
        hint: "0/1 child: rewire; 2 children: replace with inorder successor then delete it.",
      },
    ],
  },
  "p7-basics-validate": {
    kind: "questions",
    questions: [
      {
        title: "Validate Binary Search Tree",
        url: "https://leetcode.com/problems/validate-binary-search-tree/",
        source: "LeetCode",
        hint: "Pass valid (min,max) bounds down, or check inorder is strictly increasing.",
      },
    ],
  },
  "p7-order-kth-small": {
    kind: "questions",
    questions: [
      {
        title: "Kth Smallest Element in a BST",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        source: "LeetCode",
        hint: "Inorder traversal; return the k-th visited node.",
      },
    ],
  },
  "p7-order-kth-large": {
    kind: "questions",
    questions: [
      {
        title: "Kth Smallest Element in a BST",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        source: "LeetCode",
        hint: "Kth largest = reverse inorder (right→root→left) for k visits.",
      },
    ],
  },
  "p7-order-succ": {
    kind: "questions",
    questions: [
      {
        title: "Inorder Successor in BST",
        url: "https://leetcode.com/problems/inorder-successor-in-bst/",
        source: "LeetCode",
        hint: "If right child exists, leftmost of right; else walk ancestors upward.",
      },
    ],
  },
  "p7-order-pred": {
    kind: "questions",
    questions: [
      {
        title: "Inorder Successor in BST II",
        url: "https://leetcode.com/problems/inorder-successor-in-bst-ii/",
        source: "LeetCode",
        hint: "Predecessor is mirror of successor: left subtree max or parent climb.",
      },
    ],
  },
  "p7-rel-lca": {
    kind: "questions",
    questions: [
      {
        title: "Lowest Common Ancestor of a Binary Search Tree",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        source: "LeetCode",
        hint: "Walk down until p and q split left/right of current node.",
      },
    ],
  },
  "p7-rel-two-sum": {
    kind: "questions",
    questions: [
      {
        title: "Two Sum IV - Input is a BST",
        url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
        source: "LeetCode",
        hint: "HashSet while DFS, or two iterators from smallest/largest.",
      },
    ],
  },
  "p7-rel-pair": {
    kind: "questions",
    questions: [
      {
        title: "Two Sum IV - Input is a BST",
        url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
        source: "LeetCode",
        hint: "Same as two-sum in BST: look for complement k−val.",
      },
    ],
  },
  "p7-design-iter": {
    kind: "questions",
    questions: [
      {
        title: "Binary Search Tree Iterator",
        url: "https://leetcode.com/problems/binary-search-tree-iterator/",
        source: "LeetCode",
        hint: "Stack of left spine; next pops and pushes left spine of right child.",
      },
    ],
  },
  "p7-design-balanced": {
    kind: "questions",
    questions: [
      {
        title: "Balance a Binary Search Tree",
        url: "https://leetcode.com/problems/balance-a-binary-search-tree/",
        source: "LeetCode",
        hint: "Inorder to sorted array, then build balanced BST from mid.",
      },
    ],
  },
  "p7-design-convert": {
    kind: "questions",
    questions: [
      {
        title: "Convert Sorted Array to Binary Search Tree",
        url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
        source: "LeetCode",
        hint: "Always pick mid as root for height balance.",
      },
    ],
  },

  // —— PHASE 8 ——
  "p8-basics-min": {
    kind: "questions",
    questions: [
      {
        title: "Kth Largest Element in a Stream",
        url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        source: "LeetCode",
        hint: "Min-heap of size k stores the k largest; root is kth largest.",
      },
    ],
  },
  "p8-basics-max": {
    kind: "questions",
    questions: [
      {
        title: "Last Stone Weight",
        url: "https://leetcode.com/problems/last-stone-weight/",
        source: "LeetCode",
        hint: "Max-heap: smash two heaviest until one (or zero) remains.",
      },
    ],
  },
  "p8-basics-insert": {
    kind: "questions",
    questions: [
      {
        title: "Kth Largest Element in a Stream",
        url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        source: "LeetCode",
        hint: "Each add: push then pop if size > k.",
      },
    ],
  },
  "p8-basics-delete": {
    kind: "questions",
    questions: [
      {
        title: "Last Stone Weight",
        url: "https://leetcode.com/problems/last-stone-weight/",
        source: "LeetCode",
        hint: "Repeated extract-max (delete) from heap until done.",
      },
    ],
  },
  "p8-basics-heapify": {
    kind: "questions",
    questions: [
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Heap sort: build-heap then repeatedly extract max.",
      },
    ],
  },
  "p8-basics-sort": {
    kind: "questions",
    questions: [
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Implement heap sort for practice (O(n log n) in-place-ish).",
      },
    ],
  },
  "p8-topk-largest": {
    kind: "questions",
    questions: [
      {
        title: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        source: "LeetCode",
        hint: "Min-heap of size k, or Quickselect.",
      },
    ],
  },
  "p8-topk-smallest": {
    kind: "questions",
    questions: [
      {
        title: "Kth Smallest Element in a Sorted Matrix",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
        source: "LeetCode",
        hint: "Min-heap merge of rows, or binary search on value.",
      },
    ],
  },
  "p8-topk-freq": {
    kind: "questions",
    questions: [
      {
        title: "Top K Frequent Elements",
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
        source: "LeetCode",
        hint: "Count frequencies, then heap or bucket by frequency.",
      },
    ],
  },
  "p8-topk-closest": {
    kind: "questions",
    questions: [
      {
        title: "K Closest Points to Origin",
        url: "https://leetcode.com/problems/k-closest-points-to-origin/",
        source: "LeetCode",
        hint: "Max-heap of size k by distance, or quickselect on distance.",
      },
    ],
  },
  "p8-topk-pairs": {
    kind: "questions",
    questions: [
      {
        title: "Find K Pairs with Smallest Sums",
        url: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
        source: "LeetCode",
        hint: "Min-heap of pairs (i,j); expand neighbors carefully to avoid dupes.",
      },
    ],
  },
  "p8-two-median": {
    kind: "questions",
    questions: [
      {
        title: "Find Median from Data Stream",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        source: "LeetCode",
        hint: "Max-heap (low half) + min-heap (high half); balance sizes.",
      },
    ],
  },
  "p8-two-running": {
    kind: "questions",
    questions: [
      {
        title: "Find Median from Data Stream",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        source: "LeetCode",
        hint: "Same two-heap structure for running median after each insert.",
      },
    ],
  },
  "p8-two-partition": {
    kind: "questions",
    questions: [
      {
        title: "Sliding Window Median",
        url: "https://leetcode.com/problems/sliding-window-median/",
        source: "LeetCode",
        hint: "Two heaps + lazy deletion to maintain window median.",
      },
    ],
  },
  "p8-kway-lists": {
    kind: "questions",
    questions: [
      {
        title: "Merge k Sorted Lists",
        url: "https://leetcode.com/problems/merge-k-sorted-lists/",
        source: "LeetCode",
        hint: "Min-heap of current heads across k lists.",
      },
    ],
  },
  "p8-kway-matrix": {
    kind: "questions",
    questions: [
      {
        title: "Kth Smallest Element in a Sorted Matrix",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
        source: "LeetCode",
        hint: "Heap starts with first column; pop and push next in row.",
      },
    ],
  },
  "p8-kway-range": {
    kind: "questions",
    questions: [
      {
        title: "Smallest Range Covering Elements from K Lists",
        url: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/",
        source: "LeetCode",
        hint: "Min-heap of current heads; track max; advance the min list.",
      },
    ],
  },
  "p8-greedy-sched": {
    kind: "questions",
    questions: [
      {
        title: "Task Scheduler",
        url: "https://leetcode.com/problems/task-scheduler/",
        source: "LeetCode",
        hint: "Max-heap by remaining count; cool-down with a queue of wait times.",
      },
    ],
  },
  "p8-greedy-task": {
    kind: "questions",
    questions: [
      {
        title: "IPO",
        url: "https://leetcode.com/problems/ipo/",
        source: "LeetCode",
        hint: "Sort by capital; unlock into max-heap of profits; pick best k times.",
      },
    ],
  },
  "p8-greedy-ropes": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Cost of Ropes",
        url: "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1",
        source: "GFG",
        hint: "Always connect two smallest (min-heap) to minimize total cost.",
      },
    ],
  },
  "p8-greedy-stream": {
    kind: "questions",
    questions: [
      {
        title: "Find Median from Data Stream",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        source: "LeetCode",
        hint: "Streaming + heap is the classic pattern for online statistics.",
      },
    ],
  },

  // —— PHASE 9 ——
  "p9-repr-matrix": {
    kind: "questions",
    questions: [
      {
        title: "Find the Town Judge",
        url: "https://leetcode.com/problems/find-the-town-judge/",
        source: "LeetCode",
        hint: "Degree arrays (or matrix): judge trusted by all, trusts nobody.",
      },
    ],
  },
  "p9-repr-list": {
    kind: "questions",
    questions: [
      {
        title: "Find if Path Exists in Graph",
        url: "https://leetcode.com/problems/find-if-path-exists-in-graph/",
        source: "LeetCode",
        hint: "Build adjacency list, then BFS/DFS from source to target.",
      },
    ],
  },
  "p9-repr-edge": {
    kind: "questions",
    questions: [
      {
        title: "Number of Provinces",
        url: "https://leetcode.com/problems/number-of-provinces/",
        source: "LeetCode",
        hint: "Matrix or edge list → components via DFS/Union-Find.",
      },
    ],
  },
  "p9-repr-dir": {
    kind: "questions",
    questions: [
      {
        title: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        source: "LeetCode",
        hint: "Directed edges = prerequisites; detect cycle / topo sort.",
      },
    ],
  },
  "p9-bfs-trav": {
    kind: "questions",
    questions: [
      {
        title: "Find if Path Exists in Graph",
        url: "https://leetcode.com/problems/find-if-path-exists-in-graph/",
        source: "LeetCode",
        hint: "Standard BFS traversal with visited set.",
      },
    ],
  },
  "p9-bfs-shortest": {
    kind: "questions",
    questions: [
      {
        title: "Word Ladder",
        url: "https://leetcode.com/problems/word-ladder/",
        source: "LeetCode",
        hint: "BFS on word graph (1-letter neighbors) for shortest transformation.",
      },
    ],
  },
  "p9-bfs-multi": {
    kind: "questions",
    questions: [
      {
        title: "01 Matrix",
        url: "https://leetcode.com/problems/01-matrix/",
        source: "LeetCode",
        hint: "Multi-source BFS from all 0s to compute distance for 1s.",
      },
    ],
  },
  "p9-bfs-grid": {
    kind: "questions",
    questions: [
      {
        title: "Shortest Path in Binary Matrix",
        url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
        source: "LeetCode",
        hint: "Grid BFS (8 directions); first time reaching end is shortest.",
      },
    ],
  },
  "p9-bfs-level": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Level Order Traversal",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        source: "LeetCode",
        hint: "Level-size BFS pattern transfers directly to graphs.",
      },
    ],
  },
  "p9-dfs-trav": {
    kind: "questions",
    questions: [
      {
        title: "Number of Provinces",
        url: "https://leetcode.com/problems/number-of-provinces/",
        source: "LeetCode",
        hint: "DFS mark entire component from each unvisited node.",
      },
    ],
  },
  "p9-dfs-cc": {
    kind: "questions",
    questions: [
      {
        title: "Number of Provinces",
        url: "https://leetcode.com/problems/number-of-provinces/",
        source: "LeetCode",
        hint: "Count connected components with DFS/Union-Find.",
      },
    ],
  },
  "p9-dfs-provinces": {
    kind: "questions",
    questions: [
      {
        title: "Number of Provinces",
        url: "https://leetcode.com/problems/number-of-provinces/",
        source: "LeetCode",
        hint: "IsConnected matrix: DFS/BFS or DSU.",
      },
    ],
  },
  "p9-dfs-grid": {
    kind: "questions",
    questions: [
      {
        title: "Max Area of Island",
        url: "https://leetcode.com/problems/max-area-of-island/",
        source: "LeetCode",
        hint: "DFS returns size of island; track global max.",
      },
    ],
  },
  "p9-dfs-flood": {
    kind: "questions",
    questions: [
      {
        title: "Flood Fill",
        url: "https://leetcode.com/problems/flood-fill/",
        source: "LeetCode",
        hint: "DFS/BFS recolor connected same-color cells.",
      },
    ],
  },
  "p9-grid-islands": {
    kind: "questions",
    questions: [
      {
        title: "Number of Islands",
        url: "https://leetcode.com/problems/number-of-islands/",
        source: "LeetCode",
        hint: "Flood each '1' to '0'/visited; count starts.",
      },
    ],
  },
  "p9-grid-oranges": {
    kind: "questions",
    questions: [
      {
        title: "Rotting Oranges",
        url: "https://leetcode.com/problems/rotting-oranges/",
        source: "LeetCode",
        hint: "Multi-source BFS from all rotten; minutes = levels.",
      },
    ],
  },
  "p9-grid-flood": {
    kind: "questions",
    questions: [
      {
        title: "Flood Fill",
        url: "https://leetcode.com/problems/flood-fill/",
        source: "LeetCode",
        hint: "Classic grid DFS recolor.",
      },
    ],
  },
  "p9-grid-surrounded": {
    kind: "questions",
    questions: [
      {
        title: "Surrounded Regions",
        url: "https://leetcode.com/problems/surrounded-regions/",
        source: "LeetCode",
        hint: "Mark O's connected to border as safe, then flip the rest.",
      },
    ],
  },
  "p9-grid-shortest": {
    kind: "questions",
    questions: [
      {
        title: "Shortest Path in Binary Matrix",
        url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
        source: "LeetCode",
        hint: "BFS on grid cells with clear path.",
      },
    ],
  },
  "p9-cycle-u-bfs": {
    kind: "questions",
    questions: [
      {
        title: "Detect Cycle in Undirected Graph",
        url: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
        source: "GFG",
        hint: "BFS with parent tracking: visit neighbor already visited ≠ parent ⇒ cycle.",
      },
    ],
  },
  "p9-cycle-u-dfs": {
    kind: "questions",
    questions: [
      {
        title: "Detect Cycle in Undirected Graph",
        url: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
        source: "GFG",
        hint: "DFS with parent; back-edge to visited non-parent ⇒ cycle.",
      },
    ],
  },
  "p9-cycle-d-dfs": {
    kind: "questions",
    questions: [
      {
        title: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        source: "LeetCode",
        hint: "DFS colors: visiting again on recursion stack ⇒ directed cycle.",
      },
    ],
  },
  "p9-cycle-d-kahn": {
    kind: "questions",
    questions: [
      {
        title: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        source: "LeetCode",
        hint: "Kahn's BFS: if processed < n nodes, a cycle remains.",
      },
    ],
  },
  "p9-bip-bfs": {
    kind: "questions",
    questions: [
      {
        title: "Is Graph Bipartite?",
        url: "https://leetcode.com/problems/is-graph-bipartite/",
        source: "LeetCode",
        hint: "BFS 2-coloring; conflict on same color edge ⇒ not bipartite.",
      },
    ],
  },
  "p9-bip-dfs": {
    kind: "questions",
    questions: [
      {
        title: "Is Graph Bipartite?",
        url: "https://leetcode.com/problems/is-graph-bipartite/",
        source: "LeetCode",
        hint: "DFS assign opposite color to neighbors; detect conflicts.",
      },
    ],
  },
  "p9-topo-dfs": {
    kind: "questions",
    questions: [
      {
        title: "Course Schedule II",
        url: "https://leetcode.com/problems/course-schedule-ii/",
        source: "LeetCode",
        hint: "DFS postorder push to stack; reverse for topo order (if no cycle).",
      },
    ],
  },
  "p9-topo-kahn": {
    kind: "questions",
    questions: [
      {
        title: "Course Schedule II",
        url: "https://leetcode.com/problems/course-schedule-ii/",
        source: "LeetCode",
        hint: "Indegree queue (Kahn); append nodes as indegree hits 0.",
      },
    ],
  },
  "p9-topo-course": {
    kind: "questions",
    questions: [
      {
        title: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        source: "LeetCode",
        hint: "Can finish all courses iff the prerequisite graph is a DAG.",
      },
    ],
  },
  "p9-topo-dep": {
    kind: "questions",
    questions: [
      {
        title: "Alien Dictionary",
        url: "https://leetcode.com/problems/alien-dictionary/",
        source: "LeetCode",
        hint: "Build char-order edges from sorted words; topo sort (handle cycles).",
      },
    ],
  },
  "p9-sp-bfs": {
    kind: "questions",
    questions: [
      {
        title: "Word Ladder",
        url: "https://leetcode.com/problems/word-ladder/",
        source: "LeetCode",
        hint: "Unweighted shortest path = BFS levels.",
      },
    ],
  },
  "p9-sp-dijkstra": {
    kind: "questions",
    questions: [
      {
        title: "Network Delay Time",
        url: "https://leetcode.com/problems/network-delay-time/",
        source: "LeetCode",
        hint: "Dijkstra from k; answer is max dist if all reachable.",
      },
    ],
  },
  "p9-sp-bellman": {
    kind: "questions",
    questions: [
      {
        title: "Cheapest Flights Within K Stops",
        url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        source: "LeetCode",
        hint: "Bellman-Ford style relax for k+1 iterations (or BFS+cost).",
      },
    ],
  },
  "p9-sp-floyd": {
    kind: "questions",
    questions: [
      {
        title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
        url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
        source: "LeetCode",
        hint: "Floyd-Warshall all-pairs, then count cities within threshold.",
      },
    ],
  },
  "p9-sp-01": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Cost to Make at Least One Valid Path in a Grid",
        url: "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/",
        source: "LeetCode",
        hint: "0-1 BFS (deque): cost 0 to front, cost 1 to back.",
      },
    ],
  },
  "p9-sp-dag": {
    kind: "questions",
    questions: [
      {
        title: "Cheapest Flights Within K Stops",
        url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        source: "LeetCode",
        hint: "On a DAG, topo order + one-pass edge relaxation gives shortest paths.",
      },
    ],
  },
  "p9-mst-prim": {
    kind: "questions",
    questions: [
      {
        title: "Min Cost to Connect All Points",
        url: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
        source: "LeetCode",
        hint: "Prim: grow MST with a min-heap of edges from the tree.",
      },
    ],
  },
  "p9-mst-kruskal": {
    kind: "questions",
    questions: [
      {
        title: "Min Cost to Connect All Points",
        url: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
        source: "LeetCode",
        hint: "Kruskal: sort all edges, Union-Find to add non-cycle edges.",
      },
    ],
  },
  "p9-mst-dsu": {
    kind: "questions",
    questions: [
      {
        title: "Connecting Cities With Minimum Cost",
        url: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
        source: "LeetCode",
        hint: "Kruskal + DSU until one component; fail if not fully connected.",
      },
    ],
  },
  "p9-dsu-find": {
    kind: "questions",
    questions: [
      {
        title: "Number of Provinces",
        url: "https://leetcode.com/problems/number-of-provinces/",
        source: "LeetCode",
        hint: "DSU find with path compression; count unique roots.",
      },
    ],
  },
  "p9-dsu-union": {
    kind: "questions",
    questions: [
      {
        title: "Redundant Connection",
        url: "https://leetcode.com/problems/redundant-connection/",
        source: "LeetCode",
        hint: "Union edges; the one whose ends already share a parent is redundant.",
      },
    ],
  },
  "p9-dsu-path": {
    kind: "questions",
    questions: [
      {
        title: "Number of Operations to Make Network Connected",
        url: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
        source: "LeetCode",
        hint: "DSU with path compression; need components−1 spare cables.",
      },
    ],
  },
  "p9-dsu-rank": {
    kind: "questions",
    questions: [
      {
        title: "Redundant Connection",
        url: "https://leetcode.com/problems/redundant-connection/",
        source: "LeetCode",
        hint: "Union by rank/size keeps trees shallow — same problem, clean DSU.",
      },
    ],
  },
  "p9-dsu-size": {
    kind: "questions",
    questions: [
      {
        title: "Accounts Merge",
        url: "https://leetcode.com/problems/accounts-merge/",
        source: "LeetCode",
        hint: "Union emails in an account; group by parent with size-aware union.",
      },
    ],
  },
  "p9-dsu-dynamic": {
    kind: "questions",
    questions: [
      {
        title: "Number of Islands II",
        url: "https://leetcode.com/problems/number-of-islands-ii/",
        source: "LeetCode",
        hint: "Add land dynamically; union with neighbors and track component count.",
      },
    ],
  },
  "p9-adv-bridges": {
    kind: "questions",
    questions: [
      {
        title: "Critical Connections in a Network",
        url: "https://leetcode.com/problems/critical-connections-in-a-network/",
        source: "LeetCode",
        hint: "Tarjan/DFS discovery & low-link; bridge if low[v] > disc[u].",
      },
    ],
  },
  "p9-adv-articulation": {
    kind: "questions",
    questions: [
      {
        title: "Critical Connections in a Network",
        url: "https://leetcode.com/problems/critical-connections-in-a-network/",
        source: "LeetCode",
        hint: "Articulation points use similar disc/low; different condition than bridges.",
      },
    ],
  },
  "p9-adv-scc": {
    kind: "questions",
    questions: [
      {
        title: "Critical Connections in a Network",
        url: "https://leetcode.com/problems/critical-connections-in-a-network/",
        source: "LeetCode",
        hint: "Practice Tarjan/Kosaraju for SCCs on directed graphs after bridges.",
      },
    ],
  },
  "p9-adv-tarjan": {
    kind: "questions",
    questions: [
      {
        title: "Critical Connections in a Network",
        url: "https://leetcode.com/problems/critical-connections-in-a-network/",
        source: "LeetCode",
        hint: "Single DFS with discovery times and low-link values (Tarjan-style).",
      },
    ],
  },
};
