import { isPremiumLcSlug } from "@/data/practice/premium-slugs";
import { isStriverA2zSlug } from "@/data/practice/striver-a2z-slugs";
import { lcQuestionNumber } from "@/data/practice/leetcode-ids";

export type LcDifficulty = "easy" | "medium" | "hard";

export type LcProblem = {
  title: string;
  slug: string;
  difficulty: LcDifficulty;
  /** LeetCode frontend question number (e.g. 1 for Two Sum). */
  number?: number;
  premium?: boolean;
  /** Also on Striver A2Z ΓÇö solving it advances that sheet too. */
  striver?: boolean;
};

export type LcSubsection = {
  id: string;
  title: string;
  problems: LcProblem[];
};

export type LcGroup = {
  id: string;
  title: string;
  patternSlug?: string;
  blurb: string;
  subsections: LcSubsection[];
};

function p(title: string, slug: string, difficulty: LcDifficulty): LcProblem {
  const number = lcQuestionNumber(slug);
  return {
    title,
    slug,
    difficulty,
    ...(number != null ? { number } : {}),
    ...(isPremiumLcSlug(slug) ? { premium: true } : {}),
    ...(isStriverA2zSlug(slug) ? { striver: true } : {}),
  };
}

/**
 * Interview sheet grouped to match /patterns.
 * Subgroups keep large topics browsable; some problems appear in more than one pattern on purpose.
 */
export const PRACTICE_SHEET: LcGroup[] = [
  {
    id: "hashing",
    title: "Hashing",
    patternSlug: "hashing",
    blurb: "Seen it before? Map or set.",
    subsections: [
      {
        id: "hashing-maps",
        title: "Maps & frequency",
        problems: [
          p("Two Sum", "two-sum", "easy"),
          p("Contains Duplicate", "contains-duplicate", "easy"),
          p("Valid Anagram", "valid-anagram", "easy"),
          p("Group Anagrams", "group-anagrams", "medium"),
          p("Ransom Note", "ransom-note", "easy"),
          p("First Unique Character in a String", "first-unique-character-in-a-string", "easy"),
          p("Intersection of Two Arrays", "intersection-of-two-arrays", "easy"),
          p("Happy Number", "happy-number", "easy"),
          p("Isomorphic Strings", "isomorphic-strings", "easy"),
          p("Word Pattern", "word-pattern", "easy"),
          p("Longest Consecutive Sequence", "longest-consecutive-sequence", "medium"),
          p("Contiguous Array", "contiguous-array", "medium"),
          p("4Sum II", "4sum-ii", "medium"),
          p("Valid Sudoku", "valid-sudoku", "medium"),
          p("Longest Palindrome", "longest-palindrome", "easy"),
          p("Find All Duplicates in an Array", "find-all-duplicates-in-an-array", "medium"),
          p("Encode and Decode Strings", "encode-and-decode-strings", "medium"),
        ],
      },
      {
        id: "hashing-design",
        title: "Caches & design",
        problems: [
          p("Insert Delete GetRandom O(1)", "insert-delete-getrandom-o1", "medium"),
          p("LRU Cache", "lru-cache", "medium"),
          p("LFU Cache", "lfu-cache", "hard"),
          p("Time Based Key-Value Store", "time-based-key-value-store", "medium"),
          p("Logger Rate Limiter", "logger-rate-limiter", "easy"),
        ],
      }
    ],
  },
  {
    id: "arrays",
    title: "Arrays",
    patternSlug: "arrays-strings",
    blurb: "In-place scans, matrix, Kadane.",
    subsections: [
      {
        id: "arrays-inplace",
        title: "In-place & rearrange",
        problems: [
          p("Move Zeroes", "move-zeroes", "easy"),
          p("Rotate Array", "rotate-array", "medium"),
          p("Merge Sorted Array", "merge-sorted-array", "easy"),
          p("Sort Colors", "sort-colors", "medium"),
          p("Next Permutation", "next-permutation", "medium"),
          p("Plus One", "plus-one", "easy"),
          p("Rearrange Array Elements by Sign", "rearrange-array-elements-by-sign", "medium"),
          p("Check if Array Is Sorted and Rotated", "check-if-array-is-sorted-and-rotated", "easy"),
          p("Max Chunks To Make Sorted", "max-chunks-to-make-sorted", "medium"),
        ],
      },
      {
        id: "arrays-subarray",
        title: "Subarrays & scans",
        problems: [
          p("Product of Array Except Self", "product-of-array-except-self", "medium"),
          p("Maximum Subarray", "maximum-subarray", "medium"),
          p("Maximum Product Subarray", "maximum-product-subarray", "medium"),
          p("Maximum Sum Circular Subarray", "maximum-sum-circular-subarray", "medium"),
          p("Longest Subarray of 1's After Deleting One Element", "longest-subarray-of-1s-after-deleting-one-element", "medium"),
          p("Increasing Triplet Subsequence", "increasing-triplet-subsequence", "medium"),
          p("Shortest Unsorted Continuous Subarray", "shortest-unsorted-continuous-subarray", "medium"),
          p("Max Consecutive Ones", "max-consecutive-ones", "easy"),
        ],
      },
      {
        id: "arrays-find",
        title: "Missing, majority & ranges",
        problems: [
          p("Majority Element", "majority-element", "easy"),
          p("Majority Element II", "majority-element-ii", "medium"),
          p("Find All Numbers Disappeared in an Array", "find-all-numbers-disappeared-in-an-array", "easy"),
          p("Find the Duplicate Number", "find-the-duplicate-number", "medium"),
          p("First Missing Positive", "first-missing-positive", "hard"),
        ],
      },
      {
        id: "arrays-matrix",
        title: "Matrix",
        problems: [
          p("Set Matrix Zeroes", "set-matrix-zeroes", "medium"),
          p("Spiral Matrix", "spiral-matrix", "medium"),
          p("Spiral Matrix II", "spiral-matrix-ii", "medium"),
          p("Rotate Image", "rotate-image", "medium"),
          p("Pascal's Triangle", "pascals-triangle", "easy"),
          p("Search a 2D Matrix", "search-a-2d-matrix", "medium"),
          p("Search a 2D Matrix II", "search-a-2d-matrix-ii", "medium"),
          p("Game of Life", "game-of-life", "medium"),
          p("Transpose Matrix", "transpose-matrix", "easy"),
        ],
      }
    ],
  },
  {
    id: "prefix-sum",
    title: "Prefix Sum",
    patternSlug: "prefix-sum",
    blurb: "Running totals so a range is two lookups.",
    subsections: [
      {
        id: "prefix-sum-core",
        title: "Range & subarray sums",
        problems: [
          p("Running Sum of 1d Array", "running-sum-of-1d-array", "easy"),
          p("Find Pivot Index", "find-pivot-index", "easy"),
          p("Range Sum Query - Immutable", "range-sum-query-immutable", "easy"),
          p("Range Sum Query 2D - Immutable", "range-sum-query-2d-immutable", "medium"),
          p("Subarray Sum Equals K", "subarray-sum-equals-k", "medium"),
          p("Subarray Sums Divisible by K", "subarray-sums-divisible-by-k", "medium"),
          p("Continuous Subarray Sum", "continuous-subarray-sum", "medium"),
          p("Product of Array Except Self", "product-of-array-except-self", "medium"),
          p("Minimum Size Subarray Sum", "minimum-size-subarray-sum", "medium"),
        ],
      }
    ],
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    patternSlug: "two-pointers",
    blurb: "Two indices that only move forward.",
    subsections: [
      {
        id: "two-pointers-pairs",
        title: "Pairs & triplets",
        problems: [
          p("Two Sum II - Input Array Is Sorted", "two-sum-ii-input-array-is-sorted", "medium"),
          p("3Sum", "3sum", "medium"),
          p("4Sum", "4sum", "medium"),
          p("Boats to Save People", "boats-to-save-people", "medium"),
          p("K-diff Pairs in an Array", "k-diff-pairs-in-an-array", "medium"),
          p("Find K Closest Elements", "find-k-closest-elements", "medium"),
        ],
      },
      {
        id: "two-pointers-scan",
        title: "Palindrome, water & in-place",
        problems: [
          p("Valid Palindrome", "valid-palindrome", "easy"),
          p("Container With Most Water", "container-with-most-water", "medium"),
          p("Trapping Rain Water", "trapping-rain-water", "hard"),
          p("Remove Duplicates from Sorted Array", "remove-duplicates-from-sorted-array", "easy"),
          p("Remove Duplicates from Sorted Array II", "remove-duplicates-from-sorted-array-ii", "medium"),
          p("Sort Colors", "sort-colors", "medium"),
          p("Squares of a Sorted Array", "squares-of-a-sorted-array", "easy"),
          p("Longest Mountain in Array", "longest-mountain-in-array", "medium"),
        ],
      }
    ],
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    patternSlug: "sliding-window",
    blurb: "Grow right, shrink left.",
    subsections: [
      {
        id: "sliding-window-string",
        title: "Substring windows",
        problems: [
          p("Longest Substring Without Repeating Characters", "longest-substring-without-repeating-characters", "medium"),
          p("Longest Repeating Character Replacement", "longest-repeating-character-replacement", "medium"),
          p("Permutation in String", "permutation-in-string", "medium"),
          p("Find All Anagrams in a String", "find-all-anagrams-in-a-string", "medium"),
          p("Minimum Window Substring", "minimum-window-substring", "hard"),
          p("Longest Substring with At Most K Distinct Characters", "longest-substring-with-at-most-k-distinct-characters", "medium"),
          p("Fruit Into Baskets", "fruit-into-baskets", "medium"),
          p("Number of Substrings Containing All Three Characters", "number-of-substrings-containing-all-three-characters", "medium"),
          p("Minimum Window Subsequence", "minimum-window-subsequence", "hard"),
        ],
      },
      {
        id: "sliding-window-array",
        title: "Subarray windows",
        problems: [
          p("Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "easy"),
          p("Sliding Window Maximum", "sliding-window-maximum", "hard"),
          p("Contains Duplicate II", "contains-duplicate-ii", "easy"),
          p("Max Consecutive Ones III", "max-consecutive-ones-iii", "medium"),
          p("Subarray Product Less Than K", "subarray-product-less-than-k", "medium"),
          p("Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold", "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold", "easy"),
          p("Count Number of Nice Subarrays", "count-number-of-nice-subarrays", "medium"),
          p("Maximum Points You Can Obtain from Cards", "maximum-points-you-can-obtain-from-cards", "medium"),
          p("Subarrays with K Different Integers", "subarrays-with-k-different-integers", "medium"),
        ],
      }
    ],
  },
  {
    id: "intervals",
    title: "Intervals",
    patternSlug: "sorting",
    blurb: "Sort by start or end, then one pass.",
    subsections: [
      {
        id: "intervals-merge",
        title: "Merge & overlap",
        problems: [
          p("Merge Intervals", "merge-intervals", "medium"),
          p("Insert Interval", "insert-interval", "medium"),
          p("Non-overlapping Intervals", "non-overlapping-intervals", "medium"),
          p("Minimum Number of Arrows to Burst Balloons", "minimum-number-of-arrows-to-burst-balloons", "medium"),
          p("Minimum Interval to Include Each Query", "minimum-interval-to-include-each-query", "hard"),
        ],
      },
      {
        id: "intervals-meetings",
        title: "Meetings & calendar",
        problems: [
          p("Meeting Rooms", "meeting-rooms", "easy"),
          p("Meeting Rooms II", "meeting-rooms-ii", "medium"),
          p("Car Pooling", "car-pooling", "medium"),
          p("My Calendar I", "my-calendar-i", "medium"),
        ],
      }
    ],
  },
  {
    id: "stack-queue",
    title: "Stack & Queue",
    patternSlug: "stack-queue",
    blurb: "Match, undo, nest.",
    subsections: [
      {
        id: "stack-parentheses",
        title: "Parentheses & strings",
        problems: [
          p("Valid Parentheses", "valid-parentheses", "easy"),
          p("Remove All Adjacent Duplicates In String", "remove-all-adjacent-duplicates-in-string", "easy"),
          p("Backspace String Compare", "backspace-string-compare", "easy"),
          p("Minimum Remove to Make Valid Parentheses", "minimum-remove-to-make-valid-parentheses", "medium"),
          p("Longest Valid Parentheses", "longest-valid-parentheses", "hard"),
          p("Maximum Nesting Depth of the Parentheses", "maximum-nesting-depth-of-the-parentheses", "easy"),
          p("Minimum Add to Make Parentheses Valid", "minimum-add-to-make-parentheses-valid", "medium"),
          p("Remove Outermost Parentheses", "remove-outermost-parentheses", "easy"),
          p("Decode String", "decode-string", "medium"),
          p("Asteroid Collision", "asteroid-collision", "medium"),
        ],
      },
      {
        id: "stack-eval",
        title: "Eval & calculators",
        problems: [
          p("Evaluate Reverse Polish Notation", "evaluate-reverse-polish-notation", "medium"),
          p("Basic Calculator", "basic-calculator", "hard"),
          p("Basic Calculator II", "basic-calculator-ii", "medium"),
          p("Parsing A Boolean Expression", "parsing-a-boolean-expression", "hard"),
        ],
      },
      {
        id: "stack-design",
        title: "Design stack / queue",
        problems: [
          p("Min Stack", "min-stack", "medium"),
          p("Implement Queue using Stacks", "implement-queue-using-stacks", "easy"),
          p("Implement Stack using Queues", "implement-stack-using-queues", "easy"),
          p("Design Circular Queue", "design-circular-queue", "medium"),
          p("Number of Recent Calls", "number-of-recent-calls", "easy"),
        ],
      }
    ],
  },
  {
    id: "monotonic-stack",
    title: "Monotonic Stack",
    patternSlug: "monotonic-stack",
    blurb: "Next greater / next smaller in one scan.",
    subsections: [
      {
        id: "monotonic-stack-core",
        title: "Next greater & histogram",
        problems: [
          p("Daily Temperatures", "daily-temperatures", "medium"),
          p("Car Fleet", "car-fleet", "medium"),
          p("Next Greater Element I", "next-greater-element-i", "easy"),
          p("Next Greater Element II", "next-greater-element-ii", "medium"),
          p("Largest Rectangle in Histogram", "largest-rectangle-in-histogram", "hard"),
          p("Trapping Rain Water", "trapping-rain-water", "hard"),
          p("Online Stock Span", "online-stock-span", "medium"),
          p("Sum of Subarray Minimums", "sum-of-subarray-minimums", "medium"),
          p("Remove K Digits", "remove-k-digits", "medium"),
          p("Maximal Rectangle", "maximal-rectangle", "hard"),
          p("Sum of Subarray Ranges", "sum-of-subarray-ranges", "medium"),
        ],
      }
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    patternSlug: "linked-list",
    blurb: "Rewire next. Dummy node when the head can change.",
    subsections: [
      {
        id: "linked-list-basics",
        title: "Reverse, cycle & merge",
        problems: [
          p("Reverse Linked List", "reverse-linked-list", "easy"),
          p("Reverse Linked List II", "reverse-linked-list-ii", "medium"),
          p("Middle of the Linked List", "middle-of-the-linked-list", "easy"),
          p("Linked List Cycle", "linked-list-cycle", "easy"),
          p("Linked List Cycle II", "linked-list-cycle-ii", "medium"),
          p("Merge Two Sorted Lists", "merge-two-sorted-lists", "easy"),
          p("Remove Nth Node From End of List", "remove-nth-node-from-end-of-list", "medium"),
          p("Palindrome Linked List", "palindrome-linked-list", "easy"),
          p("Remove Duplicates from Sorted List", "remove-duplicates-from-sorted-list", "easy"),
          p("Intersection of Two Linked Lists", "intersection-of-two-linked-lists", "easy"),
          p("Swap Nodes in Pairs", "swap-nodes-in-pairs", "medium"),
          p("Delete Node in a Linked List", "delete-node-in-a-linked-list", "medium"),
          p("Delete the Middle Node of a Linked List", "delete-the-middle-node-of-a-linked-list", "medium"),
        ],
      },
      {
        id: "linked-list-advanced",
        title: "Reorder, copy & hard",
        problems: [
          p("Reorder List", "reorder-list", "medium"),
          p("Odd Even Linked List", "odd-even-linked-list", "medium"),
          p("Remove Duplicates from Sorted List II", "remove-duplicates-from-sorted-list-ii", "medium"),
          p("Add Two Numbers", "add-two-numbers", "medium"),
          p("Add Two Numbers II", "add-two-numbers-ii", "medium"),
          p("Copy List with Random Pointer", "copy-list-with-random-pointer", "medium"),
          p("Reverse Nodes in k-Group", "reverse-nodes-in-k-group", "hard"),
          p("Sort List", "sort-list", "medium"),
          p("Rotate List", "rotate-list", "medium"),
        ],
      }
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    patternSlug: "binary-search",
    blurb: "If the answer is monotonic, cut the range in half.",
    subsections: [
      {
        id: "binary-search-index",
        title: "On a sorted array",
        problems: [
          p("Binary Search", "binary-search", "easy"),
          p("Search Insert Position", "search-insert-position", "easy"),
          p("Find First and Last Position of Element in Sorted Array", "find-first-and-last-position-of-element-in-sorted-array", "medium"),
          p("Search in Rotated Sorted Array", "search-in-rotated-sorted-array", "medium"),
          p("Search in Rotated Sorted Array II", "search-in-rotated-sorted-array-ii", "medium"),
          p("Find Minimum in Rotated Sorted Array", "find-minimum-in-rotated-sorted-array", "medium"),
          p("Find Peak Element", "find-peak-element", "medium"),
          p("Single Element in a Sorted Array", "single-element-in-a-sorted-array", "medium"),
          p("Search a 2D Matrix", "search-a-2d-matrix", "medium"),
          p("Peak Index in a Mountain Array", "peak-index-in-a-mountain-array", "medium"),
          p("Count Negative Numbers in a Sorted Matrix", "count-negative-numbers-in-a-sorted-matrix", "easy"),
        ],
      },
      {
        id: "binary-search-answer",
        title: "Binary search the answer",
        problems: [
          p("Koko Eating Bananas", "koko-eating-bananas", "medium"),
          p("Capacity To Ship Packages Within D Days", "capacity-to-ship-packages-within-d-days", "medium"),
          p("Split Array Largest Sum", "split-array-largest-sum", "hard"),
          p("Median of Two Sorted Arrays", "median-of-two-sorted-arrays", "hard"),
          p("Find K Closest Elements", "find-k-closest-elements", "medium"),
          p("Time Based Key-Value Store", "time-based-key-value-store", "medium"),
          p("Pow(x, n)", "powx-n", "medium"),
          p("Sqrt(x)", "sqrtx", "easy"),
          p("Find the Smallest Divisor Given a Threshold", "find-the-smallest-divisor-given-a-threshold", "medium"),
          p("Minimize Max Distance to Gas Station", "minimize-max-distance-to-gas-station", "hard"),
          p("Minimum Number of Days to Make m Bouquets", "minimum-number-of-days-to-make-m-bouquets", "medium"),
          p("Kth Missing Positive Number", "kth-missing-positive-number", "easy"),
        ],
      }
    ],
  },
  {
    id: "trees",
    title: "Trees",
    patternSlug: "trees",
    blurb: "Recurse on kids, or queue one level at a time.",
    subsections: [
      {
        id: "trees-dfs-basics",
        title: "DFS basics & traversals",
        problems: [
          p("Invert Binary Tree", "invert-binary-tree", "easy"),
          p("Maximum Depth of Binary Tree", "maximum-depth-of-binary-tree", "easy"),
          p("Same Tree", "same-tree", "easy"),
          p("Subtree of Another Tree", "subtree-of-another-tree", "easy"),
          p("Balanced Binary Tree", "balanced-binary-tree", "easy"),
          p("Diameter of Binary Tree", "diameter-of-binary-tree", "easy"),
          p("Symmetric Tree", "symmetric-tree", "easy"),
          p("Binary Tree Preorder Traversal", "binary-tree-preorder-traversal", "easy"),
          p("Binary Tree Inorder Traversal", "binary-tree-inorder-traversal", "easy"),
          p("Binary Tree Postorder Traversal", "binary-tree-postorder-traversal", "easy"),
          p("Count Complete Tree Nodes", "count-complete-tree-nodes", "easy"),
          p("Boundary of Binary Tree", "boundary-of-binary-tree", "medium"),
          p("Find Leaves of Binary Tree", "find-leaves-of-binary-tree", "medium"),
        ],
      },
      {
        id: "trees-dfs-paths",
        title: "Paths, LCA & construct",
        problems: [
          p("Path Sum", "path-sum", "easy"),
          p("Path Sum II", "path-sum-ii", "medium"),
          p("Path Sum III", "path-sum-iii", "medium"),
          p("Sum Root to Leaf Numbers", "sum-root-to-leaf-numbers", "medium"),
          p("House Robber III", "house-robber-iii", "medium"),
          p("Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", "hard"),
          p("Lowest Common Ancestor of a Binary Tree", "lowest-common-ancestor-of-a-binary-tree", "medium"),
          p("Count Good Nodes in Binary Tree", "count-good-nodes-in-binary-tree", "medium"),
          p("Flatten Binary Tree to Linked List", "flatten-binary-tree-to-linked-list", "medium"),
          p("Serialize and Deserialize Binary Tree", "serialize-and-deserialize-binary-tree", "hard"),
          p("Construct Binary Tree from Preorder and Inorder Traversal", "construct-binary-tree-from-preorder-and-inorder-traversal", "medium"),
          p("Construct Binary Tree from Inorder and Postorder Traversal", "construct-binary-tree-from-inorder-and-postorder-traversal", "medium"),
          p("Binary Tree Longest Consecutive Sequence", "binary-tree-longest-consecutive-sequence", "medium"),
        ],
      },
      {
        id: "trees-bfs",
        title: "BFS / level order",
        problems: [
          p("Binary Tree Level Order Traversal", "binary-tree-level-order-traversal", "medium"),
          p("Binary Tree Zigzag Level Order Traversal", "binary-tree-zigzag-level-order-traversal", "medium"),
          p("Binary Tree Right Side View", "binary-tree-right-side-view", "medium"),
          p("Average of Levels in Binary Tree", "average-of-levels-in-binary-tree", "easy"),
          p("Populating Next Right Pointers in Each Node", "populating-next-right-pointers-in-each-node", "medium"),
          p("Populating Next Right Pointers in Each Node II", "populating-next-right-pointers-in-each-node-ii", "medium"),
          p("Maximum Width of Binary Tree", "maximum-width-of-binary-tree", "medium"),
          p("Binary Tree Vertical Order Traversal", "binary-tree-vertical-order-traversal", "medium"),
        ],
      },
      {
        id: "trees-bst",
        title: "BST",
        problems: [
          p("Validate Binary Search Tree", "validate-binary-search-tree", "medium"),
          p("Kth Smallest Element in a BST", "kth-smallest-element-in-a-bst", "medium"),
          p("Lowest Common Ancestor of a Binary Search Tree", "lowest-common-ancestor-of-a-binary-search-tree", "medium"),
          p("Search in a Binary Search Tree", "search-in-a-binary-search-tree", "easy"),
          p("Insert into a Binary Search Tree", "insert-into-a-binary-search-tree", "medium"),
          p("Delete Node in a BST", "delete-node-in-a-bst", "medium"),
          p("Convert Sorted Array to Binary Search Tree", "convert-sorted-array-to-binary-search-tree", "easy"),
          p("Trim a Binary Search Tree", "trim-a-binary-search-tree", "medium"),
          p("Binary Search Tree Iterator", "binary-search-tree-iterator", "medium"),
          p("Construct Binary Search Tree from Preorder Traversal", "construct-binary-search-tree-from-preorder-traversal", "medium"),
          p("Inorder Successor in BST", "inorder-successor-in-bst", "medium"),
          p("Maximum Sum BST in Binary Tree", "maximum-sum-bst-in-binary-tree", "hard"),
          p("Recover Binary Search Tree", "recover-binary-search-tree", "medium"),
          p("Two Sum IV - Input is a BST", "two-sum-iv-input-is-a-bst", "easy"),
        ],
      },
      ],
  },
  {
    id: "heap",
    title: "Heap",
    patternSlug: "heap",
    blurb: "Always grab the current smallest or largest.",
    subsections: [
      {
        id: "heap-topk",
        title: "Top-K & merge",
        problems: [
          p("Kth Largest Element in an Array", "kth-largest-element-in-an-array", "medium"),
          p("Top K Frequent Elements", "top-k-frequent-elements", "medium"),
          p("K Closest Points to Origin", "k-closest-points-to-origin", "medium"),
          p("Find Median from Data Stream", "find-median-from-data-stream", "hard"),
          p("Merge k Sorted Lists", "merge-k-sorted-lists", "hard"),
          p("Find K Pairs with Smallest Sums", "find-k-pairs-with-smallest-sums", "medium"),
          p("Last Stone Weight", "last-stone-weight", "easy"),
          p("Kth Largest Element in a Stream", "kth-largest-element-in-a-stream", "easy"),
          p("Ugly Number II", "ugly-number-ii", "medium"),
          p("Kth Smallest Element in a Sorted Matrix", "kth-smallest-element-in-a-sorted-matrix", "medium"),
          p("Smallest Range Covering Elements from K Lists", "smallest-range-covering-elements-from-k-lists", "hard"),
          p("Minimum Cost to Connect Sticks", "minimum-cost-to-connect-sticks", "medium"),
        ],
      },
      {
        id: "heap-schedule",
        title: "Scheduling & rearrange",
        problems: [
          p("Task Scheduler", "task-scheduler", "medium"),
          p("Reorganize String", "reorganize-string", "medium"),
          p("Design Twitter", "design-twitter", "medium"),
          p("Meeting Rooms III", "meeting-rooms-iii", "hard"),
        ],
      }
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    patternSlug: "graphs",
    blurb: "BFS for steps, DFS for components, topo for order.",
    subsections: [
      {
        id: "graphs-grid",
        title: "Grid BFS / DFS",
        problems: [
          p("Number of Islands", "number-of-islands", "medium"),
          p("Max Area of Island", "max-area-of-island", "medium"),
          p("Clone Graph", "clone-graph", "medium"),
          p("Rotting Oranges", "rotting-oranges", "medium"),
          p("01 Matrix", "01-matrix", "medium"),
          p("Surrounded Regions", "surrounded-regions", "medium"),
          p("Pacific Atlantic Water Flow", "pacific-atlantic-water-flow", "medium"),
          p("Word Search", "word-search", "medium"),
          p("Shortest Path in Binary Matrix", "shortest-path-in-binary-matrix", "medium"),
          p("Number of Enclaves", "number-of-enclaves", "medium"),
          p("Walls and Gates", "walls-and-gates", "medium"),
          p("Flood Fill", "flood-fill", "easy"),
        ],
      },
      {
        id: "graphs-topo",
        title: "Cycle & topological sort",
        problems: [
          p("Course Schedule", "course-schedule", "medium"),
          p("Course Schedule II", "course-schedule-ii", "medium"),
          p("Find Eventual Safe States", "find-eventual-safe-states", "medium"),
          p("Alien Dictionary", "alien-dictionary", "hard"),
          p("Is Graph Bipartite?", "is-graph-bipartite", "medium"),
          p("Reconstruct Itinerary", "reconstruct-itinerary", "hard"),
          p("Critical Connections in a Network", "critical-connections-in-a-network", "hard"),
          p("Evaluate Division", "evaluate-division", "medium"),
        ],
      },
      {
        id: "graphs-shortest",
        title: "Shortest path",
        problems: [
          p("Network Delay Time", "network-delay-time", "medium"),
          p("Cheapest Flights Within K Stops", "cheapest-flights-within-k-stops", "medium"),
          p("Path With Minimum Effort", "path-with-minimum-effort", "medium"),
          p("Word Ladder", "word-ladder", "hard"),
          p("Word Ladder II", "word-ladder-ii", "hard"),
          p("Min Cost to Connect All Points", "min-cost-to-connect-all-points", "medium"),
          p("Swim in Rising Water", "swim-in-rising-water", "hard"),
          p("Open the Lock", "open-the-lock", "medium"),
          p("Find the City With the Smallest Number of Neighbors at a Threshold Distance", "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance", "medium"),
          p("Number of Ways to Arrive at Destination", "number-of-ways-to-arrive-at-destination", "medium"),
          p("Minimum Knight Moves", "minimum-knight-moves", "medium"),
        ],
      }
    ],
  },
  {
    id: "union-find",
    title: "Union Find",
    patternSlug: "union-find",
    blurb: "Merge groups. Same root means connected.",
    subsections: [
      {
        id: "union-find-basics",
        title: "Components & cycles",
        problems: [
          p("Number of Provinces", "number-of-provinces", "medium"),
          p("Redundant Connection", "redundant-connection", "medium"),
          p("Accounts Merge", "accounts-merge", "medium"),
          p("Graph Valid Tree", "graph-valid-tree", "medium"),
          p("Number of Connected Components in an Undirected Graph", "number-of-connected-components-in-an-undirected-graph", "medium"),
          p("Longest Consecutive Sequence", "longest-consecutive-sequence", "medium"),
          p("Number of Operations to Make Network Connected", "number-of-operations-to-make-network-connected", "medium"),
        ],
      },
      {
        id: "union-find-hard",
        title: "Hard & premium",
        problems: [
          p("Min Cost to Connect All Points", "min-cost-to-connect-all-points", "medium"),
          p("Largest Component Size by Common Factor", "largest-component-size-by-common-factor", "hard"),
          p("Making A Large Island", "making-a-large-island", "hard"),
          p("Most Stones Removed with Same Row or Column", "most-stones-removed-with-same-row-or-column", "medium"),
          p("Number of Islands II", "number-of-islands-ii", "hard"),
        ],
      }
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    patternSlug: "backtracking",
    blurb: "Try it, recurse, undo.",
    subsections: [
      {
        id: "backtracking-combos",
        title: "Subsets, perms & combinations",
        problems: [
          p("Subsets", "subsets", "medium"),
          p("Subsets II", "subsets-ii", "medium"),
          p("Permutations", "permutations", "medium"),
          p("Permutations II", "permutations-ii", "medium"),
          p("Combination Sum", "combination-sum", "medium"),
          p("Combination Sum II", "combination-sum-ii", "medium"),
          p("Combination Sum III", "combination-sum-iii", "medium"),
          p("Combinations", "combinations", "medium"),
          p("Letter Combinations of a Phone Number", "letter-combinations-of-a-phone-number", "medium"),
          p("Palindrome Partitioning", "palindrome-partitioning", "medium"),
          p("Generate Parentheses", "generate-parentheses", "medium"),
          p("Letter Case Permutation", "letter-case-permutation", "medium"),
          p("Restore IP Addresses", "restore-ip-addresses", "medium"),
        ],
      },
      {
        id: "backtracking-boards",
        title: "Boards & hard search",
        problems: [
          p("Word Search", "word-search", "medium"),
          p("N-Queens", "n-queens", "hard"),
          p("Sudoku Solver", "sudoku-solver", "hard"),
          p("Expression Add Operators", "expression-add-operators", "hard"),
        ],
      }
    ],
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    patternSlug: "dp",
    blurb: "Same subproblem twice? Save the answer.",
    subsections: [
      {
        id: "dp-1d",
        title: "1-D",
        problems: [
          p("Climbing Stairs", "climbing-stairs", "easy"),
          p("Min Cost Climbing Stairs", "min-cost-climbing-stairs", "easy"),
          p("House Robber", "house-robber", "medium"),
          p("House Robber II", "house-robber-ii", "medium"),
          p("Decode Ways", "decode-ways", "medium"),
          p("Coin Change", "coin-change", "medium"),
          p("Coin Change II", "coin-change-ii", "medium"),
          p("Word Break", "word-break", "medium"),
          p("Longest Increasing Subsequence", "longest-increasing-subsequence", "medium"),
          p("Partition Equal Subset Sum", "partition-equal-subset-sum", "medium"),
          p("Minimum Cost For Tickets", "minimum-cost-for-tickets", "medium"),
          p("Perfect Squares", "perfect-squares", "medium"),
          p("Integer Break", "integer-break", "medium"),
          p("Partition to K Equal Sum Subsets", "partition-to-k-equal-sum-subsets", "medium"),
          p("Fibonacci Number", "fibonacci-number", "easy"),
          p("Number of Longest Increasing Subsequence", "number-of-longest-increasing-subsequence", "medium"),
        ],
      },
      {
        id: "dp-grid",
        title: "Grids",
        problems: [
          p("Unique Paths", "unique-paths", "medium"),
          p("Unique Paths II", "unique-paths-ii", "medium"),
          p("Minimum Path Sum", "minimum-path-sum", "medium"),
          p("Triangle", "triangle", "medium"),
          p("Dungeon Game", "dungeon-game", "hard"),
          p("Maximal Square", "maximal-square", "medium"),
          p("Cherry Pickup", "cherry-pickup", "hard"),
          p("Count Square Submatrices With All Ones", "count-square-submatrices-with-all-ones", "medium"),
        ],
      },
      {
        id: "dp-strings",
        title: "Strings",
        problems: [
          p("Longest Common Subsequence", "longest-common-subsequence", "medium"),
          p("Edit Distance", "edit-distance", "medium"),
          p("Longest Palindromic Subsequence", "longest-palindromic-subsequence", "medium"),
          p("Longest Palindromic Substring", "longest-palindromic-substring", "medium"),
          p("Palindromic Substrings", "palindromic-substrings", "medium"),
          p("Distinct Subsequences", "distinct-subsequences", "hard"),
          p("Regular Expression Matching", "regular-expression-matching", "hard"),
          p("Wildcard Matching", "wildcard-matching", "hard"),
          p("Interleaving String", "interleaving-string", "medium"),
          p("Word Break II", "word-break-ii", "hard"),
          p("Delete Operation for Two Strings", "delete-operation-for-two-strings", "medium"),
          p("Minimum Insertion Steps to Make a String Palindrome", "minimum-insertion-steps-to-make-a-string-palindrome", "hard"),
          p("Shortest Common Supersequence", "shortest-common-supersequence", "hard"),
        ],
      },
      {
        id: "dp-stocks",
        title: "Stocks & knapsack-shaped",
        problems: [
          p("Best Time to Buy and Sell Stock II", "best-time-to-buy-and-sell-stock-ii", "medium"),
          p("Best Time to Buy and Sell Stock III", "best-time-to-buy-and-sell-stock-iii", "hard"),
          p("Best Time to Buy and Sell Stock IV", "best-time-to-buy-and-sell-stock-iv", "hard"),
          p("Best Time to Buy and Sell Stock with Cooldown", "best-time-to-buy-and-sell-stock-with-cooldown", "medium"),
          p("Best Time to Buy and Sell Stock with Transaction Fee", "best-time-to-buy-and-sell-stock-with-transaction-fee", "medium"),
          p("Target Sum", "target-sum", "medium"),
          p("Ones and Zeroes", "ones-and-zeroes", "medium"),
          p("Last Stone Weight II", "last-stone-weight-ii", "medium"),
        ],
      },
      {
        id: "dp-hard",
        title: "Interval / hard",
        problems: [
          p("Burst Balloons", "burst-balloons", "hard"),
          p("Minimum Cost to Cut a Stick", "minimum-cost-to-cut-a-stick", "hard"),
          p("Palindrome Partitioning II", "palindrome-partitioning-ii", "hard"),
          p("Russian Doll Envelopes", "russian-doll-envelopes", "hard"),
          p("Largest Divisible Subset", "largest-divisible-subset", "medium"),
          p("Longest String Chain", "longest-string-chain", "medium"),
          p("Frog Jump", "frog-jump", "hard"),
        ],
      }
    ],
  },
  {
    id: "greedy",
    title: "Greedy",
    patternSlug: "greedy",
    blurb: "Take the locally safe choice, then prove it.",
    subsections: [
      {
        id: "greedy-jumps",
        title: "Jumps & gas",
        problems: [
          p("Jump Game", "jump-game", "medium"),
          p("Jump Game II", "jump-game-ii", "medium"),
          p("Gas Station", "gas-station", "medium"),
          p("Candy", "candy", "hard"),
          p("Valid Parenthesis String", "valid-parenthesis-string", "medium"),
        ],
      },
      {
        id: "greedy-partition",
        title: "Partitions & assignments",
        problems: [
          p("Partition Labels", "partition-labels", "medium"),
          p("Hand of Straights", "hand-of-straights", "medium"),
          p("Merge Triplets to Form Target Triplet", "merge-triplets-to-form-target-triplet", "medium"),
          p("Queue Reconstruction by Height", "queue-reconstruction-by-height", "medium"),
          p("Assign Cookies", "assign-cookies", "easy"),
          p("Lemonade Change", "lemonade-change", "easy"),
          p("Maximum Number of Events That Can Be Attended", "maximum-number-of-events-that-can-be-attended", "medium"),
          p("Partition Array for Maximum Sum", "partition-array-for-maximum-sum", "medium"),
        ],
      }
    ],
  },
  {
    id: "bits",
    title: "Bit Manipulation",
    patternSlug: "bits",
    blurb: "XOR cancels pairs. Bits are tiny flags.",
    subsections: [
      {
        id: "bits-xor",
        title: "XOR & bit tricks",
        problems: [
          p("Single Number", "single-number", "easy"),
          p("Single Number II", "single-number-ii", "medium"),
          p("Number of 1 Bits", "number-of-1-bits", "easy"),
          p("Counting Bits", "counting-bits", "easy"),
          p("Reverse Bits", "reverse-bits", "easy"),
          p("Missing Number", "missing-number", "easy"),
          p("Power of Two", "power-of-two", "easy"),
          p("Sum of Two Integers", "sum-of-two-integers", "medium"),
          p("Bitwise AND of Numbers Range", "bitwise-and-of-numbers-range", "medium"),
          p("Subsets", "subsets", "medium"),
          p("Maximum XOR for Each Query", "maximum-xor-for-each-query", "medium"),
          p("Minimum Bit Flips to Convert Number", "minimum-bit-flips-to-convert-number", "easy"),
        ],
      },
      {
        id: "bits-math",
        title: "Number tricks",
        problems: [
          p("Reverse Integer", "reverse-integer", "medium"),
          p("Armstrong Number", "armstrong-number", "easy"),
          p("Count Good Numbers", "count-good-numbers", "medium"),
          p("Count Primes", "count-primes", "medium"),
          p("Divide Two Integers", "divide-two-integers", "medium"),
        ],
      }
    ],
  },
  {
    id: "trie",
    title: "Trie",
    patternSlug: "trie",
    blurb: "A tree of prefixes.",
    subsections: [
      {
        id: "trie-prefix",
        title: "Prefix tree",
        problems: [
          p("Implement Trie (Prefix Tree)", "implement-trie-prefix-tree", "medium"),
          p("Design Add and Search Words Data Structure", "design-add-and-search-words-data-structure", "medium"),
          p("Word Search II", "word-search-ii", "hard"),
          p("Longest Word in Dictionary", "longest-word-in-dictionary", "medium"),
          p("Replace Words", "replace-words", "medium"),
          p("Maximum XOR of Two Numbers in an Array", "maximum-xor-of-two-numbers-in-an-array", "medium"),
        ],
      },
      ],
  },
  {
    id: "range-queries",
    title: "Range Queries",
    patternSlug: "range-queries",
    blurb: "Point updates + range sums.",
    subsections: [
      {
        id: "range-queries-core",
        title: "Fenwick / segment tree",
        problems: [
          p("Range Sum Query - Mutable", "range-sum-query-mutable", "medium"),
          p("Range Sum Query 2D - Mutable", "range-sum-query-2d-mutable", "hard"),
          p("Count of Smaller Numbers After Self", "count-of-smaller-numbers-after-self", "hard"),
          p("Count of Range Sum", "count-of-range-sum", "hard"),
          p("The Skyline Problem", "the-skyline-problem", "hard"),
          p("Reverse Pairs", "reverse-pairs", "hard"),
        ],
      }
    ],
  },
  {
    id: "strings",
    title: "Strings",
    blurb: "Classic string interview problems that don't sit in one pattern.",
    subsections: [
      {
        id: "strings-parse",
        title: "Parsing & conversion",
        problems: [
          p("String to Integer (atoi)", "string-to-integer-atoi", "medium"),
          p("Zigzag Conversion", "zigzag-conversion", "medium"),
          p("Roman to Integer", "roman-to-integer", "easy"),
          p("Integer to Roman", "integer-to-roman", "medium"),
          p("Count and Say", "count-and-say", "medium"),
          p("Simplify Path", "simplify-path", "medium"),
          p("Multiply Strings", "multiply-strings", "medium"),
          p("Palindrome Number", "palindrome-number", "easy"),
        ],
      },
      {
        id: "strings-match",
        title: "Match, edit & format",
        problems: [
          p("Longest Common Prefix", "longest-common-prefix", "easy"),
          p("Reverse Words in a String", "reverse-words-in-a-string", "medium"),
          p("Find the Index of the First Occurrence in a String", "find-the-index-of-the-first-occurrence-in-a-string", "easy"),
          p("Repeated DNA Sequences", "repeated-dna-sequences", "medium"),
          p("Text Justification", "text-justification", "hard"),
          p("Minimum Window Substring", "minimum-window-substring", "hard"),
          p("Largest Odd Number in String", "largest-odd-number-in-string", "easy"),
          p("Longest Happy Prefix", "longest-happy-prefix", "hard"),
          p("Rotate String", "rotate-string", "easy"),
          p("Sum of Beauty of All Substrings", "sum-of-beauty-of-all-substrings", "medium"),
        ],
      }
    ],
  }
];

export function leetcodeUrl(slug: string): string {
  return `https://leetcode.com/problems/${slug}/`;
}

export function getAllPracticeProblems(): LcProblem[] {
  const seen = new Set<string>();
  const out: LcProblem[] = [];
  for (const group of PRACTICE_SHEET) {
    for (const sub of group.subsections) {
      for (const problem of sub.problems) {
        if (seen.has(problem.slug)) continue;
        seen.add(problem.slug);
        out.push(problem);
      }
    }
  }
  return out;
}

export function getPracticeProblemCount(): number {
  return getAllPracticeProblems().length;
}

export function findSubsectionIdForSlug(slug: string): string | null {
  for (const group of PRACTICE_SHEET) {
    for (const sub of group.subsections) {
      if (sub.problems.some((p) => p.slug === slug)) return sub.id;
    }
  }
  return null;
}
