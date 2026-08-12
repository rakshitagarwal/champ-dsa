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
      {
        title: "Combination Sum II",
        url: "https://leetcode.com/problems/combination-sum-ii/",
        source: "LeetCode",
        hint: "Branch on taking or skipping while controlling reuse and duplicates.",
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
      {
        title: "Combination Sum II",
        url: "https://leetcode.com/problems/combination-sum-ii/",
        source: "LeetCode",
        hint: "Branch on taking or skipping while controlling reuse and duplicates.",
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
      {
        title: "Letter Case Permutation",
        url: "https://leetcode.com/problems/letter-case-permutation/",
        source: "LeetCode",
        hint: "Branch over every valid choice for the current position.",
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
      {
        title: "Different Ways to Add Parentheses",
        url: "https://leetcode.com/problems/different-ways-to-add-parentheses/",
        source: "LeetCode",
        hint: "Split at each operator and combine results from recursive subtrees.",
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
      {
        title: "Palindrome Partitioning",
        url: "https://leetcode.com/problems/palindrome-partitioning/",
        source: "LeetCode",
        hint: "Carry the current partition, recurse, then undo the last choice.",
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
      {
        title: "Subsets II",
        url: "https://leetcode.com/problems/subsets-ii/",
        source: "LeetCode",
        hint: "Sort and skip equal choices at the same recursion depth.",
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
      {
        title: "Combination Sum II",
        url: "https://leetcode.com/problems/combination-sum-ii/",
        source: "LeetCode",
        hint: "Sort and skip duplicate candidates at each depth.",
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
      {
        title: "Non-decreasing Subsequences",
        url: "https://leetcode.com/problems/non-decreasing-subsequences/",
        source: "LeetCode",
        hint: "Backtrack while enforcing order and deduplicating choices per depth.",
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
      {
        title: "Target Sum",
        url: "https://leetcode.com/problems/target-sum/",
        source: "LeetCode",
        hint: "Assign each number a plus or minus branch and track the remaining target.",
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
      {
        title: "Combination Sum IV",
        url: "https://leetcode.com/problems/combination-sum-iv/",
        source: "LeetCode",
        hint: "Compare backtracking combinations with ordered-count dynamic programming.",
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
      {
        title: "Permutations II",
        url: "https://leetcode.com/problems/permutations-ii/",
        source: "LeetCode",
        hint: "Extend swap-based permutation generation with duplicate control.",
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
      {
        title: "Letter Tile Possibilities",
        url: "https://leetcode.com/problems/letter-tile-possibilities/",
        source: "LeetCode",
        hint: "Count frequencies and backtrack without generating duplicate sequences.",
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
      {
        title: "Permutations II",
        url: "https://leetcode.com/problems/permutations-ii/",
        source: "LeetCode",
        hint: "Extend swap-based permutation generation with duplicate control.",
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
      {
        title: "Permutation Sequence",
        url: "https://leetcode.com/problems/permutation-sequence/",
        source: "LeetCode",
        hint: "Use factorial blocks to select each next permutation digit.",
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
      {
        title: "Combination Sum III",
        url: "https://leetcode.com/problems/combination-sum-iii/",
        source: "LeetCode",
        hint: "Backtrack distinct choices while pruning by count and remaining sum.",
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
      {
        title: "N-Queens II",
        url: "https://leetcode.com/problems/n-queens-ii/",
        source: "LeetCode",
        hint: "Track attacked columns and diagonals while counting valid placements.",
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
      {
        title: "Valid Sudoku",
        url: "https://leetcode.com/problems/valid-sudoku/",
        source: "LeetCode",
        hint: "Validate row, column, and box constraints used by the solver.",
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
      {
        title: "Word Search II",
        url: "https://leetcode.com/problems/word-search-ii/",
        source: "LeetCode",
        hint: "Combine board backtracking with prefix pruning.",
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
      {
        title: "Unique Paths III",
        url: "https://leetcode.com/problems/unique-paths-iii/",
        source: "LeetCode",
        hint: "Backtrack through every walkable square exactly once before reaching the goal.",
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
      {
        title: "Matchsticks to Square",
        url: "https://leetcode.com/problems/matchsticks-to-square/",
        source: "LeetCode",
        hint: "Assign items to constrained buckets and prune symmetric states.",
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
      {
        title: "Count of Smaller Numbers After Self",
        url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
        source: "LeetCode",
        hint: "Count cross-half contributions while merging sorted indexed values.",
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
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Partition around a pivot and recursively sort both sides.",
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
      {
        title: "Count of Range Sum",
        url: "https://leetcode.com/problems/count-of-range-sum/",
        source: "LeetCode",
        hint: "Use merge sort to count valid cross-half prefix-sum pairs.",
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
      {
        title: "K Closest Points to Origin",
        url: "https://leetcode.com/problems/k-closest-points-to-origin/",
        source: "LeetCode",
        hint: "Quickselect partitions points by distance until k are on the desired side.",
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
      {
        title: "Search a 2D Matrix",
        url: "https://leetcode.com/problems/search-a-2d-matrix/",
        source: "LeetCode",
        hint: "Apply divide-and-conquer search to a virtually flattened sorted range.",
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
      {
        title: "N-ary Tree Preorder Traversal",
        url: "https://leetcode.com/problems/n-ary-tree-preorder-traversal/",
        source: "LeetCode",
        hint: "Visit the root before recursively traversing children left to right.",
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
      {
        title: "Kth Smallest Element in a BST",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        source: "LeetCode",
        hint: "Exploit sorted inorder visitation to stop at the kth node.",
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
      {
        title: "N-ary Tree Postorder Traversal",
        url: "https://leetcode.com/problems/n-ary-tree-postorder-traversal/",
        source: "LeetCode",
        hint: "Visit every child before recording the root.",
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
      {
        title: "Binary Tree Preorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
        source: "LeetCode",
        hint: "Use an explicit stack and push children in reverse visit order.",
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
      {
        title: "Recover Binary Search Tree",
        url: "https://leetcode.com/problems/recover-binary-search-tree/",
        source: "LeetCode",
        hint: "Morris inorder can detect swapped nodes with constant auxiliary space.",
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
      {
        title: "Binary Tree Zigzag Level Order Traversal",
        url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
        source: "LeetCode",
        hint: "Process BFS levels while alternating output direction.",
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
      {
        title: "Maximum Depth of N-ary Tree",
        url: "https://leetcode.com/problems/maximum-depth-of-n-ary-tree/",
        source: "LeetCode",
        hint: "Return one plus the maximum depth among all children.",
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
      {
        title: "Find Bottom Left Tree Value",
        url: "https://leetcode.com/problems/find-bottom-left-tree-value/",
        source: "LeetCode",
        hint: "A level-order traversal reaches and records the deepest level systematically.",
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
      {
        title: "Check Completeness of a Binary Tree",
        url: "https://leetcode.com/problems/check-completeness-of-a-binary-tree/",
        source: "LeetCode",
        hint: "Use level order to verify no non-null node follows a null position.",
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
      {
        title: "Diameter of N-Ary Tree",
        url: "https://leetcode.com/problems/diameter-of-n-ary-tree/",
        source: "LeetCode",
        hint: "Combine the two largest child heights at each node.",
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
      {
        title: "Path Sum III",
        url: "https://leetcode.com/problems/path-sum-iii/",
        source: "LeetCode",
        hint: "Use prefix sums along DFS paths to count target-sum subpaths.",
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
      {
        title: "Path Sum II",
        url: "https://leetcode.com/problems/path-sum-ii/",
        source: "LeetCode",
        hint: "Backtrack the current root-to-leaf path and remaining sum.",
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
      {
        title: "Path Sum III",
        url: "https://leetcode.com/problems/path-sum-iii/",
        source: "LeetCode",
        hint: "Track prefix information for paths ending at every visited node.",
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
      {
        title: "Path Sum III",
        url: "https://leetcode.com/problems/path-sum-iii/",
        source: "LeetCode",
        hint: "A path-prefix map counts downward paths with the target sum.",
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
      {
        title: "Smallest String Starting From Leaf",
        url: "https://leetcode.com/problems/smallest-string-starting-from-leaf/",
        source: "LeetCode",
        hint: "Enumerate root-to-leaf paths and compare their reversed strings.",
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
      {
        title: "Maximum Difference Between Node and Ancestor",
        url: "https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/",
        source: "LeetCode",
        hint: "Carry path minimum and maximum values down the tree.",
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
      {
        title: "Find Bottom Left Tree Value",
        url: "https://leetcode.com/problems/find-bottom-left-tree-value/",
        source: "LeetCode",
        hint: "Capture the first node at each BFS level.",
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
      {
        title: "Find Bottom Left Tree Value",
        url: "https://leetcode.com/problems/find-bottom-left-tree-value/",
        source: "LeetCode",
        hint: "Capture the first node at each BFS level.",
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
      {
        title: "Vertical Order Traversal of a Binary Tree",
        url: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
        source: "LeetCode",
        hint: "Group nodes by column while preserving required row and value ordering.",
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
      {
        title: "Find Bottom Left Tree Value",
        url: "https://leetcode.com/problems/find-bottom-left-tree-value/",
        source: "LeetCode",
        hint: "Level-order traversal makes the deepest visible candidate easy to retain.",
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
      {
        title: "Binary Tree Right Side View",
        url: "https://leetcode.com/problems/binary-tree-right-side-view/",
        source: "LeetCode",
        hint: "Practice selecting visible boundary nodes level by level.",
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
      {
        title: "Lowest Common Ancestor of Deepest Leaves",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/",
        source: "LeetCode",
        hint: "Return subtree depth with its deepest leaves' common ancestor.",
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
      {
        title: "All Nodes Distance K in Binary Tree",
        url: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
        source: "LeetCode",
        hint: "Add parent links, then BFS exactly k edges from the target.",
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
      {
        title: "All Nodes Distance K in Binary Tree",
        url: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
        source: "LeetCode",
        hint: "Parent links expose ancestors as graph neighbors.",
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
      {
        title: "Same Tree",
        url: "https://leetcode.com/problems/same-tree/",
        source: "LeetCode",
        hint: "Use a structural equality check as the subtree-matching primitive.",
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
      {
        title: "Serialize and Deserialize BST",
        url: "https://leetcode.com/problems/serialize-and-deserialize-bst/",
        source: "LeetCode",
        hint: "Use BST ordering to reconstruct compact preorder data.",
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
      {
        title: "Construct Binary Search Tree from Preorder Traversal",
        url: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
        source: "LeetCode",
        hint: "Use preorder with value bounds to rebuild without slicing.",
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
      {
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        source: "LeetCode",
        hint: "Contrast which end of the companion traversal identifies each root.",
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
      {
        title: "Flatten a Multilevel Doubly Linked List",
        url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
        source: "LeetCode",
        hint: "Splice each child chain into traversal order and preserve the saved successor.",
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
      {
        title: "Closest Binary Search Tree Value",
        url: "https://leetcode.com/problems/closest-binary-search-tree-value/",
        source: "LeetCode",
        hint: "Follow the BST search path while tracking the closest value seen.",
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
      {
        title: "Insert a Node in a BST",
        url: "https://www.geeksforgeeks.org/problems/insert-a-node-in-a-bst/1",
        source: "GFG",
        hint: "Follow BST comparisons until a null child can receive the new node.",
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
      {
        title: "Trim a Binary Search Tree",
        url: "https://leetcode.com/problems/trim-a-binary-search-tree/",
        source: "LeetCode",
        hint: "BST ordering lets recursion discard an entire invalid side.",
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
      {
        title: "Recover Binary Search Tree",
        url: "https://leetcode.com/problems/recover-binary-search-tree/",
        source: "LeetCode",
        hint: "Inorder order reveals the two nodes that violate BST monotonicity.",
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
      {
        title: "Kth Largest Sum in a Binary Tree",
        url: "https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/",
        source: "LeetCode",
        hint: "Contrast BST inorder selection with heap-based level aggregation.",
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
      {
        title: "Kth Largest Element in BST",
        url: "https://www.geeksforgeeks.org/problems/kth-largest-element-in-bst/1",
        source: "GFG",
        hint: "Use reverse inorder and stop after visiting k nodes.",
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
      {
        title: "Inorder Successor in BST II",
        url: "https://leetcode.com/problems/inorder-successor-in-bst-ii/",
        source: "LeetCode",
        hint: "Use a right-subtree minimum or climb parent links.",
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
      {
        title: "Inorder Successor in BST",
        url: "https://leetcode.com/problems/inorder-successor-in-bst/",
        source: "LeetCode",
        hint: "Mirror the successor search to reason about predecessor candidates.",
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
      {
        title: "Lowest Common Ancestor of a Binary Tree",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        source: "LeetCode",
        hint: "Compare the general recursive LCA with the BST-directed walk.",
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
      {
        title: "Two Sum BSTs",
        url: "https://leetcode.com/problems/two-sum-bsts/",
        source: "LeetCode",
        hint: "Traverse one BST while searching complements in the other.",
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
      {
        title: "Two Sum BSTs",
        url: "https://leetcode.com/problems/two-sum-bsts/",
        source: "LeetCode",
        hint: "Traverse one BST while searching complements in the other.",
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
      {
        title: "Kth Smallest Element in a BST",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        source: "LeetCode",
        hint: "A lazy inorder iterator naturally emits sorted values.",
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
      {
        title: "Convert Sorted List to Binary Search Tree",
        url: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/",
        source: "LeetCode",
        hint: "Choose successive middle elements to keep subtree heights balanced.",
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
      {
        title: "Convert Sorted List to Binary Search Tree",
        url: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/",
        source: "LeetCode",
        hint: "Use the sorted order and a midpoint strategy to build a balanced BST.",
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
      {
        title: "Seat Reservation Manager",
        url: "https://leetcode.com/problems/seat-reservation-manager/",
        source: "LeetCode",
        hint: "A min-heap returns the smallest available resource after each update.",
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
      {
        title: "Take Gifts From the Richest Pile",
        url: "https://leetcode.com/problems/take-gifts-from-the-richest-pile/",
        source: "LeetCode",
        hint: "Repeatedly extract and update the maximum heap element.",
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
      {
        title: "Seat Reservation Manager",
        url: "https://leetcode.com/problems/seat-reservation-manager/",
        source: "LeetCode",
        hint: "A min-heap returns the smallest available resource after each update.",
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
      {
        title: "Take Gifts From the Richest Pile",
        url: "https://leetcode.com/problems/take-gifts-from-the-richest-pile/",
        source: "LeetCode",
        hint: "Repeatedly extract and update the maximum heap element.",
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
      {
        title: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        source: "LeetCode",
        hint: "Build a heap and perform controlled extractions instead of fully sorting.",
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
      {
        title: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        source: "LeetCode",
        hint: "Build a heap and perform controlled extractions instead of fully sorting.",
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
      {
        title: "Kth Largest Element in a Stream",
        url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        source: "LeetCode",
        hint: "Maintain only the k largest values in a size-k min-heap.",
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
      {
        title: "Find K Pairs with Smallest Sums",
        url: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
        source: "LeetCode",
        hint: "Use a min-heap to enumerate the next smallest frontier candidate.",
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
      {
        title: "Top K Frequent Words",
        url: "https://leetcode.com/problems/top-k-frequent-words/",
        source: "LeetCode",
        hint: "Heap by frequency with the required lexical tie-breaker.",
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
      {
        title: "Find K Closest Elements",
        url: "https://leetcode.com/problems/find-k-closest-elements/",
        source: "LeetCode",
        hint: "Keep or identify the k values with smallest distance to the target.",
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
      {
        title: "Kth Smallest Prime Fraction",
        url: "https://leetcode.com/problems/k-th-smallest-prime-fraction/",
        source: "LeetCode",
        hint: "Use a heap frontier over sorted fraction pairs.",
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
      {
        title: "Sliding Window Median",
        url: "https://leetcode.com/problems/sliding-window-median/",
        source: "LeetCode",
        hint: "Maintain balanced lower and upper halves while values enter and leave.",
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
      {
        title: "Sliding Window Median",
        url: "https://leetcode.com/problems/sliding-window-median/",
        source: "LeetCode",
        hint: "Maintain balanced lower and upper halves while values enter and leave.",
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
      {
        title: "Find Median from Data Stream",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        source: "LeetCode",
        hint: "Master two-heap balancing before adding window deletions.",
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
      {
        title: "Merge Sorted Array",
        url: "https://leetcode.com/problems/merge-sorted-array/",
        source: "LeetCode",
        hint: "The two-way merge is the base operation generalized by a k-way heap.",
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
      {
        title: "Kth Smallest Prime Fraction",
        url: "https://leetcode.com/problems/k-th-smallest-prime-fraction/",
        source: "LeetCode",
        hint: "Advance a sorted frontier in a min-heap without materializing all pairs.",
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
      {
        title: "Find K Pairs with Smallest Sums",
        url: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
        source: "LeetCode",
        hint: "Maintain one frontier candidate per sorted sequence direction.",
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
      {
        title: "Reorganize String",
        url: "https://leetcode.com/problems/reorganize-string/",
        source: "LeetCode",
        hint: "Always choose the most frequent currently allowed character.",
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
      {
        title: "Maximum Performance of a Team",
        url: "https://leetcode.com/problems/maximum-performance-of-a-team/",
        source: "LeetCode",
        hint: "Sort by one constraint and keep the best k values of the other in a heap.",
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
      {
        title: "Minimum Cost to Connect Sticks",
        url: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
        source: "LeetCode",
        hint: "Repeatedly merging the two smallest items minimizes future repeated cost.",
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
      {
        title: "Kth Largest Element in a Stream",
        url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        source: "LeetCode",
        hint: "Bound memory by retaining only the stream's k largest values.",
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
      {
        title: "Number of Provinces",
        url: "https://leetcode.com/problems/number-of-provinces/",
        source: "LeetCode",
        hint: "Traverse an adjacency matrix to discover connected components.",
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
      {
        title: "Clone Graph",
        url: "https://leetcode.com/problems/clone-graph/",
        source: "LeetCode",
        hint: "Traverse adjacency lists while mapping originals to cloned nodes.",
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
      {
        title: "Redundant Connection",
        url: "https://leetcode.com/problems/redundant-connection/",
        source: "LeetCode",
        hint: "Process an edge list directly with disjoint-set union.",
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
      {
        title: "Find Eventual Safe States",
        url: "https://leetcode.com/problems/find-eventual-safe-states/",
        source: "LeetCode",
        hint: "Directed adjacency and node states expose cycles and safe nodes.",
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
      {
        title: "Keys and Rooms",
        url: "https://leetcode.com/problems/keys-and-rooms/",
        source: "LeetCode",
        hint: "Use a queue and visited set to traverse every reachable vertex.",
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
      {
        title: "Open the Lock",
        url: "https://leetcode.com/problems/open-the-lock/",
        source: "LeetCode",
        hint: "Model each combination as a node and use BFS for minimum moves.",
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
      {
        title: "Rotting Oranges",
        url: "https://leetcode.com/problems/rotting-oranges/",
        source: "LeetCode",
        hint: "Start BFS from every source so levels represent simultaneous spread.",
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
      {
        title: "Nearest Exit from Entrance in Maze",
        url: "https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/",
        source: "LeetCode",
        hint: "BFS grid states and stop at the first reachable boundary exit.",
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
      {
        title: "Minimum Genetic Mutation",
        url: "https://leetcode.com/problems/minimum-genetic-mutation/",
        source: "LeetCode",
        hint: "Each BFS level represents one additional mutation.",
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
      {
        title: "Number of Connected Components in an Undirected Graph",
        url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        source: "LeetCode",
        hint: "Launch DFS from each unvisited vertex and count launches.",
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
      {
        title: "Number of Connected Components in an Undirected Graph",
        url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        source: "LeetCode",
        hint: "Launch DFS from each unvisited vertex and count launches.",
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
      {
        title: "Number of Connected Components in an Undirected Graph",
        url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        source: "LeetCode",
        hint: "Launch DFS from each unvisited vertex and count launches.",
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
      {
        title: "Number of Enclaves",
        url: "https://leetcode.com/problems/number-of-enclaves/",
        source: "LeetCode",
        hint: "Flood boundary-connected land before counting remaining cells.",
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
      {
        title: "Number of Islands",
        url: "https://leetcode.com/problems/number-of-islands/",
        source: "LeetCode",
        hint: "Flood-fill each unvisited land component exactly once.",
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
      {
        title: "Number of Distinct Islands",
        url: "https://leetcode.com/problems/number-of-distinct-islands/",
        source: "LeetCode",
        hint: "Record each island's traversal shape relative to its origin.",
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
      {
        title: "01 Matrix",
        url: "https://leetcode.com/problems/01-matrix/",
        source: "LeetCode",
        hint: "Use multi-source BFS when many cells spread distance simultaneously.",
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
      {
        title: "Max Area of Island",
        url: "https://leetcode.com/problems/max-area-of-island/",
        source: "LeetCode",
        hint: "Aggregate component size during the flood-fill traversal.",
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
      {
        title: "Number of Enclaves",
        url: "https://leetcode.com/problems/number-of-enclaves/",
        source: "LeetCode",
        hint: "Boundary reachability separates protected cells from enclosed ones.",
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
      {
        title: "Shortest Path to Get Food",
        url: "https://leetcode.com/problems/shortest-path-to-get-food/",
        source: "LeetCode",
        hint: "BFS grid positions until the first target is reached.",
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
      {
        title: "Redundant Connection",
        url: "https://leetcode.com/problems/redundant-connection/",
        source: "LeetCode",
        hint: "An edge joining already-connected vertices closes an undirected cycle.",
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
      {
        title: "Redundant Connection",
        url: "https://leetcode.com/problems/redundant-connection/",
        source: "LeetCode",
        hint: "An edge joining already-connected vertices closes an undirected cycle.",
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
      {
        title: "Find Eventual Safe States",
        url: "https://leetcode.com/problems/find-eventual-safe-states/",
        source: "LeetCode",
        hint: "Directed cycle detection identifies nodes that cannot be eventually safe.",
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
      {
        title: "Find Eventual Safe States",
        url: "https://leetcode.com/problems/find-eventual-safe-states/",
        source: "LeetCode",
        hint: "Directed cycle detection identifies nodes that cannot be eventually safe.",
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
      {
        title: "Possible Bipartition",
        url: "https://leetcode.com/problems/possible-bipartition/",
        source: "LeetCode",
        hint: "Two-color each component and reject any same-color edge.",
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
      {
        title: "Possible Bipartition",
        url: "https://leetcode.com/problems/possible-bipartition/",
        source: "LeetCode",
        hint: "Two-color each component and reject any same-color edge.",
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
      {
        title: "Find Eventual Safe States",
        url: "https://leetcode.com/problems/find-eventual-safe-states/",
        source: "LeetCode",
        hint: "Reverse-graph indegrees or DFS states apply topological reasoning.",
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
      {
        title: "Find Eventual Safe States",
        url: "https://leetcode.com/problems/find-eventual-safe-states/",
        source: "LeetCode",
        hint: "Reverse-graph indegrees or DFS states apply topological reasoning.",
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
      {
        title: "Find Eventual Safe States",
        url: "https://leetcode.com/problems/find-eventual-safe-states/",
        source: "LeetCode",
        hint: "Reverse-graph indegrees or DFS states apply topological reasoning.",
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
      {
        title: "Sequence Reconstruction",
        url: "https://leetcode.com/problems/sequence-reconstruction/",
        source: "LeetCode",
        hint: "Build dependency edges and require a unique topological order.",
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
      {
        title: "Open the Lock",
        url: "https://leetcode.com/problems/open-the-lock/",
        source: "LeetCode",
        hint: "Unweighted state transitions make BFS levels shortest distances.",
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
      {
        title: "Path With Minimum Effort",
        url: "https://leetcode.com/problems/path-with-minimum-effort/",
        source: "LeetCode",
        hint: "Use a priority queue to finalize the smallest bottleneck effort.",
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
      {
        title: "Network Delay Time",
        url: "https://leetcode.com/problems/network-delay-time/",
        source: "LeetCode",
        hint: "Relax every edge repeatedly and compare with priority-queue shortest paths.",
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
      {
        title: "Course Schedule IV",
        url: "https://leetcode.com/problems/course-schedule-iv/",
        source: "LeetCode",
        hint: "Compute transitive reachability for every ordered pair.",
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
      {
        title: "Minimum Obstacle Removal to Reach Corner",
        url: "https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/",
        source: "LeetCode",
        hint: "Push zero-cost moves to the deque front and one-cost moves to the back.",
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
      {
        title: "Parallel Courses III",
        url: "https://leetcode.com/problems/parallel-courses-iii/",
        source: "LeetCode",
        hint: "Topological order lets each node accumulate its longest prerequisite time.",
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
      {
        title: "Optimize Water Distribution in a Village",
        url: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/",
        source: "LeetCode",
        hint: "Add a virtual source and compute an MST over all supply choices.",
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
      {
        title: "Optimize Water Distribution in a Village",
        url: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/",
        source: "LeetCode",
        hint: "Add a virtual source and compute an MST over all supply choices.",
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
      {
        title: "Optimize Water Distribution in a Village",
        url: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/",
        source: "LeetCode",
        hint: "Add a virtual source and compute an MST over all supply choices.",
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
      {
        title: "Accounts Merge",
        url: "https://leetcode.com/problems/accounts-merge/",
        source: "LeetCode",
        hint: "Path-compressed roots identify all records in the same component.",
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
      {
        title: "Graph Valid Tree",
        url: "https://leetcode.com/problems/graph-valid-tree/",
        source: "LeetCode",
        hint: "Union each edge and reject one that joins vertices already connected.",
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
      {
        title: "Satisfiability of Equality Equations",
        url: "https://leetcode.com/problems/satisfiability-of-equality-equations/",
        source: "LeetCode",
        hint: "Compress equality components before checking inequality conflicts.",
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
      {
        title: "Most Stones Removed with Same Row or Column",
        url: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
        source: "LeetCode",
        hint: "Union rows and columns while rank or size keeps trees shallow.",
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
      {
        title: "Largest Component Size by Common Factor",
        url: "https://leetcode.com/problems/largest-component-size-by-common-factor/",
        source: "LeetCode",
        hint: "Union values through shared factors and track component sizes.",
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
      {
        title: "Making A Large Island",
        url: "https://leetcode.com/problems/making-a-large-island/",
        source: "LeetCode",
        hint: "Build DSU components, then evaluate how activating one water cell joins neighboring sizes.",
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
      {
        title: "Bridge Edge in a Graph",
        url: "https://www.geeksforgeeks.org/problems/bridge-edge-in-graph/1",
        source: "GFG",
        hint: "Use DFS low-link values to test whether an edge is the only connection to a subtree.",
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
      {
        title: "Articulation Point - I",
        url: "https://www.geeksforgeeks.org/problems/articulation-point-1/1",
        source: "GFG",
        hint: "Use discovery and low-link values to test whether removing a vertex disconnects DFS children.",
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
      {
        title: "Strongly Connected Components",
        url: "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1",
        source: "GFG",
        hint: "Use finish order and the reversed graph to isolate strongly connected components.",
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
      {
        title: "Strongly Connected Components",
        url: "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1",
        source: "GFG",
        hint: "Compare Tarjan low-link states with Kosaraju's two-pass decomposition.",
      },
    ],
  },
};
