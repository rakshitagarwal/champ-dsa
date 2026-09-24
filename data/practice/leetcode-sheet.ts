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
  /** Also on Striver A2Z — solving it advances that sheet too. */
  striver?: boolean;
};

export type LcSubsection = {
  id: string;
  title: string;
  /** Pattern identification hint (how to recognize this pattern). */
  hint?: string;
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
 * Practice sheet — RisingBrain pattern grouping (hints as recognition cues).
 * Keeps the original problem set; only adds a few crucial missing LC problems.
 * Grouping inspired by https://risingbrain.org/sheet
 */
export const PRACTICE_SHEET: LcGroup[] = [
  {
    id: "array",
    title: "Array",
    patternSlug: "arrays-strings",
    blurb: "Fundamental collection of elements stored at contiguous memory locations.",
    subsections: [
      {
        id: "array-two-pointer",
        title: "Two-Pointer",
        hint: "Problem involves pairs, sorted arrays, triplets, or opposite-end traversal.",
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
          p("Majority Element", "majority-element", "easy"),
          p("Majority Element II", "majority-element-ii", "medium"),
          p("Find All Numbers Disappeared in an Array", "find-all-numbers-disappeared-in-an-array", "easy"),
          p("Find the Duplicate Number", "find-the-duplicate-number", "medium"),
          p("First Missing Positive", "first-missing-positive", "hard"),
          p("Set Matrix Zeroes", "set-matrix-zeroes", "medium"),
          p("Spiral Matrix", "spiral-matrix", "medium"),
          p("Spiral Matrix II", "spiral-matrix-ii", "medium"),
          p("Rotate Image", "rotate-image", "medium"),
          p("Pascal's Triangle", "pascals-triangle", "easy"),
          p("Game of Life", "game-of-life", "medium"),
          p("Transpose Matrix", "transpose-matrix", "easy"),
          p("Two Sum II - Input Array Is Sorted", "two-sum-ii-input-array-is-sorted", "medium"),
          p("3Sum", "3sum", "medium"),
          p("4Sum", "4sum", "medium"),
          p("Boats to Save People", "boats-to-save-people", "medium"),
          p("K-diff Pairs in an Array", "k-diff-pairs-in-an-array", "medium"),
          p("Find K Closest Elements", "find-k-closest-elements", "medium"),
          p("Container With Most Water", "container-with-most-water", "medium"),
          p("Trapping Rain Water", "trapping-rain-water", "hard"),
        ],
      },
      {
        id: "array-sliding-window",
        title: "Sliding Window",
        hint: "Problem uses words like “window of size k”, “longest”, “shortest”, or “at most K”.",
        problems: [
          p("Sliding Window Maximum", "sliding-window-maximum", "hard"),
          p("Contains Duplicate II", "contains-duplicate-ii", "easy"),
          p("Max Consecutive Ones III", "max-consecutive-ones-iii", "medium"),
          p("Subarray Product Less Than K", "subarray-product-less-than-k", "medium"),
          p("Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold", "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold", "easy"),
          p("Count Number of Nice Subarrays", "count-number-of-nice-subarrays", "medium"),
          p("Maximum Points You Can Obtain from Cards", "maximum-points-you-can-obtain-from-cards", "medium"),
          p("Subarrays with K Different Integers", "subarrays-with-k-different-integers", "medium"),
        ],
      },
      {
        id: "array-prefix-sum",
        title: "Prefix Sum",
        hint: "Problem talks about range sum, subarray sum, cumulative sum, or prefix-based queries.",
        problems: [
          p("Running Sum of 1d Array", "running-sum-of-1d-array", "easy"),
          p("Find Pivot Index", "find-pivot-index", "easy"),
          p("Range Sum Query - Immutable", "range-sum-query-immutable", "easy"),
          p("Range Sum Query 2D - Immutable", "range-sum-query-2d-immutable", "medium"),
          p("Subarray Sums Divisible by K", "subarray-sums-divisible-by-k", "medium"),
          p("Continuous Subarray Sum", "continuous-subarray-sum", "medium"),
          p("Minimum Size Subarray Sum", "minimum-size-subarray-sum", "medium"),
          p("Range Sum Query - Mutable", "range-sum-query-mutable", "medium"),
          p("Range Sum Query 2D - Mutable", "range-sum-query-2d-mutable", "hard"),
          p("Count of Smaller Numbers After Self", "count-of-smaller-numbers-after-self", "hard"),
          p("Count of Range Sum", "count-of-range-sum", "hard"),
          p("The Skyline Problem", "the-skyline-problem", "hard"),
          p("Reverse Pairs", "reverse-pairs", "hard"),
        ],
      },
      {
        id: "array-kadanes-algorithm",
        title: "Kadane's Algorithm",
        hint: "Problem asks for maximum/minimum sum or product of a contiguous subarray.",
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
    ],
  },
  {
    id: "strings",
    title: "Strings",
    patternSlug: "strings",
    blurb: "Sequence of characters and common string manipulation patterns.",
    subsections: [
      {
        id: "strings-two-pointer-palindrome",
        title: "Two-Pointer (Palindrome)",
        hint: "Problem talks about palindrome checks, symmetric comparison, or reversing from both ends.",
        problems: [
          p("Valid Palindrome", "valid-palindrome", "easy"),
          p("Remove Duplicates from Sorted Array", "remove-duplicates-from-sorted-array", "easy"),
          p("Remove Duplicates from Sorted Array II", "remove-duplicates-from-sorted-array-ii", "medium"),
          p("Squares of a Sorted Array", "squares-of-a-sorted-array", "easy"),
          p("Longest Mountain in Array", "longest-mountain-in-array", "medium"),
        ],
      },
      {
        id: "strings-sliding-window-string",
        title: "Sliding Window (String)",
        hint: "Problem uses words like longest, shortest, substring, at most K, exactly K.",
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
          p("String to Integer (atoi)", "string-to-integer-atoi", "medium"),
          p("Zigzag Conversion", "zigzag-conversion", "medium"),
          p("Roman to Integer", "roman-to-integer", "easy"),
          p("Integer to Roman", "integer-to-roman", "medium"),
          p("Count and Say", "count-and-say", "medium"),
          p("Simplify Path", "simplify-path", "medium"),
          p("Multiply Strings", "multiply-strings", "medium"),
          p("Palindrome Number", "palindrome-number", "easy"),
          p("Longest Common Prefix", "longest-common-prefix", "easy"),
          p("Reverse Words in a String", "reverse-words-in-a-string", "medium"),
          p("Find the Index of the First Occurrence in a String", "find-the-index-of-the-first-occurrence-in-a-string", "easy"),
          p("Repeated DNA Sequences", "repeated-dna-sequences", "medium"),
          p("Text Justification", "text-justification", "hard"),
          p("Largest Odd Number in String", "largest-odd-number-in-string", "easy"),
          p("Longest Happy Prefix", "longest-happy-prefix", "hard"),
          p("Rotate String", "rotate-string", "easy"),
          p("Sum of Beauty of All Substrings", "sum-of-beauty-of-all-substrings", "medium"),
        ],
      },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    patternSlug: "binary-search",
    blurb: "Efficient search algorithm that divides the search interval in half.",
    subsections: [
      {
        id: "binary-search-classic-binary-search",
        title: "Classic Binary Search",
        hint: "Problem mentions a sorted array or “find element efficiently.”",
        problems: [
          p("Binary Search", "binary-search", "easy"),
          p("Search Insert Position", "search-insert-position", "easy"),
          p("Search in Rotated Sorted Array", "search-in-rotated-sorted-array", "medium"),
          p("Search in Rotated Sorted Array II", "search-in-rotated-sorted-array-ii", "medium"),
          p("Find Minimum in Rotated Sorted Array", "find-minimum-in-rotated-sorted-array", "medium"),
          p("Find Peak Element", "find-peak-element", "medium"),
          p("Single Element in a Sorted Array", "single-element-in-a-sorted-array", "medium"),
          p("Peak Index in a Mountain Array", "peak-index-in-a-mountain-array", "medium"),
          p("Count Negative Numbers in a Sorted Matrix", "count-negative-numbers-in-a-sorted-matrix", "easy"),
        ],
      },
      {
        id: "binary-search-lower-upper-bound",
        title: "Lower / Upper Bound",
        hint: "Problem mentions first/last occurrence, bounds, or constraints on index.",
        problems: [
          p("Find First and Last Position of Element in Sorted Array", "find-first-and-last-position-of-element-in-sorted-array", "medium"),
        ],
      },
      {
        id: "binary-search-binary-search-on-answers",
        title: "Binary Search on Answers",
        hint: "Problem mentions minimum/maximum feasible value or optimization over a range.",
        problems: [
          p("Koko Eating Bananas", "koko-eating-bananas", "medium"),
          p("Capacity To Ship Packages Within D Days", "capacity-to-ship-packages-within-d-days", "medium"),
          p("Split Array Largest Sum", "split-array-largest-sum", "hard"),
          p("Sqrt(x)", "sqrtx", "easy"),
          p("Find the Smallest Divisor Given a Threshold", "find-the-smallest-divisor-given-a-threshold", "medium"),
          p("Minimize Max Distance to Gas Station", "minimize-max-distance-to-gas-station", "hard"),
          p("Minimum Number of Days to Make m Bouquets", "minimum-number-of-days-to-make-m-bouquets", "medium"),
          p("Kth Missing Positive Number", "kth-missing-positive-number", "easy"),
        ],
      },
      {
        id: "binary-search-search-in-2d-matrix",
        title: "Search in 2D Matrix",
        hint: "Problem mentions 2D matrix, row/column sorted, or kth smallest element.",
        problems: [
          p("Search a 2D Matrix", "search-a-2d-matrix", "medium"),
          p("Search a 2D Matrix II", "search-a-2d-matrix-ii", "medium"),
        ],
      },
    ],
  },
  {
    id: "stack",
    title: "Stack",
    patternSlug: "stack",
    blurb: "LIFO (Last In First Out) data structure patterns.",
    subsections: [
      {
        id: "stack-monotonic-stack",
        title: "Monotonic Stack",
        hint: "Problem mentions “next greater/smaller element,” spans, or trapping area.",
        problems: [
          p("Daily Temperatures", "daily-temperatures", "medium"),
          p("Car Fleet", "car-fleet", "medium"),
          p("Next Greater Element I", "next-greater-element-i", "easy"),
          p("Next Greater Element II", "next-greater-element-ii", "medium"),
          p("Largest Rectangle in Histogram", "largest-rectangle-in-histogram", "hard"),
          p("Online Stock Span", "online-stock-span", "medium"),
          p("Sum of Subarray Minimums", "sum-of-subarray-minimums", "medium"),
          p("Maximal Rectangle", "maximal-rectangle", "hard"),
          p("Sum of Subarray Ranges", "sum-of-subarray-ranges", "medium"),
        ],
      },
      {
        id: "stack-expression-evaluation",
        title: "Expression Evaluation",
        hint: "Problem involves evaluating arithmetic expressions, parentheses, or decoding strings.",
        problems: [
          p("Decode String", "decode-string", "medium"),
          p("Evaluate Reverse Polish Notation", "evaluate-reverse-polish-notation", "medium"),
          p("Basic Calculator", "basic-calculator", "hard"),
          p("Basic Calculator II", "basic-calculator-ii", "medium"),
          p("Parsing A Boolean Expression", "parsing-a-boolean-expression", "hard"),
        ],
      },
      {
        id: "stack-stack-simulation-undo-operation",
        title: "Stack Simulation / Undo Operation",
        hint: "Problem mentions “undo,” “remove duplicates,” or “backspace string” operations.",
        problems: [
          p("Backspace String Compare", "backspace-string-compare", "easy"),
        ],
      },
      {
        id: "stack-parenthesis-scoring",
        title: "Parenthesis & Scoring",
        hint: "Problem mentions parentheses, balanced brackets, scoring, or generation.",
        problems: [
          p("Valid Parentheses", "valid-parentheses", "easy"),
          p("Remove All Adjacent Duplicates In String", "remove-all-adjacent-duplicates-in-string", "easy"),
          p("Minimum Remove to Make Valid Parentheses", "minimum-remove-to-make-valid-parentheses", "medium"),
          p("Longest Valid Parentheses", "longest-valid-parentheses", "hard"),
          p("Maximum Nesting Depth of the Parentheses", "maximum-nesting-depth-of-the-parentheses", "easy"),
          p("Minimum Add to Make Parentheses Valid", "minimum-add-to-make-parentheses-valid", "medium"),
          p("Remove Outermost Parentheses", "remove-outermost-parentheses", "easy"),
          p("Asteroid Collision", "asteroid-collision", "medium"),
        ],
      },
      {
        id: "stack-stack-based-design",
        title: "Stack-Based Design",
        hint: "Problem mentions designing stack/queue systems or custom operations.",
        problems: [
          p("Min Stack", "min-stack", "medium"),
          p("Implement Queue using Stacks", "implement-queue-using-stacks", "easy"),
          p("Implement Stack using Queues", "implement-stack-using-queues", "easy"),
          p("Design Circular Queue", "design-circular-queue", "medium"),
          p("Number of Recent Calls", "number-of-recent-calls", "easy"),
        ],
      },
      {
        id: "stack-stack-greedy",
        title: "Stack + Greedy",
        hint: "Problems asking for smallest/largest sequence, removing k elements",
        problems: [
          p("Remove K Digits", "remove-k-digits", "medium"),
        ],
      },
      {
        id: "stack-recursive-stack",
        title: "Recursive Stack",
        hint: "Problem mentions reverse/insert/delete recursively, sort stack, merge lists, or check palindrome recursively.",
        problems: [
        ],
      },
    ],
  },
  {
    id: "recursion",
    title: "Recursion",
    patternSlug: "recursion",
    blurb: "Solving problems by breaking them down into smaller, self-similar subproblems.",
    subsections: [
      {
        id: "recursion-linear-recursion",
        title: "Linear Recursion",
        hint: "Problems requiring repetitive smaller tasks without splitting into multiple branches.",
        problems: [
          p("Pow(x, n)", "powx-n", "medium"),
        ],
      },
      {
        id: "recursion-non-linear-recursion",
        title: "Non-Linear Recursion",
        hint: "Problems where each step leads to multiple possibilities, such as Fibonacci sequences or finding unique paths on a grid.",
        problems: [
          p("Fibonacci Number", "fibonacci-number", "easy"),
        ],
      },
      {
        id: "recursion-divide-conquer",
        title: "Divide & Conquer",
        hint: "Sorting, searching in structured data, reducing complexity logarithmically.",
        problems: [
          p("Median of Two Sorted Arrays", "median-of-two-sorted-arrays", "hard"),
        ],
      },
      {
        id: "recursion-recursion-on-linkedlist-stack",
        title: "Recursion on LinkedList/Stack",
        hint: "Problems asking to reverse, delete, or merge standard linear data structures.",
        problems: [
        ],
      },
      {
        id: "recursion-subsequences",
        title: "Subsequences",
        hint: "Problems asking for subsets, combinations, or subsequences.",
        problems: [
        ],
      },
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    patternSlug: "linked-list",
    blurb: "Linear data structure where elements are not stored at contiguous memory locations.",
    subsections: [
      {
        id: "linked-list-basic-operations",
        title: "Basic Operations",
        hint: "Problem mentions insertion, deletion at head/tail/Nth node or traversal.",
        problems: [
          p("Reverse Linked List II", "reverse-linked-list-ii", "medium"),
          p("Remove Nth Node From End of List", "remove-nth-node-from-end-of-list", "medium"),
          p("Palindrome Linked List", "palindrome-linked-list", "easy"),
          p("Remove Duplicates from Sorted List", "remove-duplicates-from-sorted-list", "easy"),
          p("Intersection of Two Linked Lists", "intersection-of-two-linked-lists", "easy"),
          p("Swap Nodes in Pairs", "swap-nodes-in-pairs", "medium"),
          p("Delete Node in a Linked List", "delete-node-in-a-linked-list", "medium"),
          p("Delete the Middle Node of a Linked List", "delete-the-middle-node-of-a-linked-list", "medium"),
          p("Copy List with Random Pointer", "copy-list-with-random-pointer", "medium"),
        ],
      },
      {
        id: "linked-list-fast-and-slow-pointers",
        title: "Fast and Slow Pointers",
        hint: "Problem involves loops, cycle detection, or middle node operations.",
        problems: [
          p("Middle of the Linked List", "middle-of-the-linked-list", "easy"),
          p("Linked List Cycle", "linked-list-cycle", "easy"),
          p("Linked List Cycle II", "linked-list-cycle-ii", "medium"),
        ],
      },
      {
        id: "linked-list-reversal-pattern",
        title: "Reversal Pattern",
        hint: "Problem mentions reversing nodes or rearranging linked list order.",
        problems: [
          p("Reverse Linked List", "reverse-linked-list", "easy"),
          p("Reorder List", "reorder-list", "medium"),
          p("Odd Even Linked List", "odd-even-linked-list", "medium"),
          p("Remove Duplicates from Sorted List II", "remove-duplicates-from-sorted-list-ii", "medium"),
          p("Add Two Numbers II", "add-two-numbers-ii", "medium"),
          p("Reverse Nodes in k-Group", "reverse-nodes-in-k-group", "hard"),
          p("Rotate List", "rotate-list", "medium"),
        ],
      },
      {
        id: "linked-list-merge-sort",
        title: "Merge / Sort",
        hint: "Problem mentions merging, sorting, or reordering linked lists.",
        problems: [
          p("Merge Two Sorted Lists", "merge-two-sorted-lists", "easy"),
          p("Sort List", "sort-list", "medium"),
        ],
      },
      {
        id: "linked-list-linkedlist-with-stack-hashmap",
        title: "LinkedList with Stack/HashMap",
        hint: "Problem mentions reverse order processing or “next greater” style operations.",
        problems: [
          p("Add Two Numbers", "add-two-numbers", "medium"),
        ],
      },
    ],
  },
  {
    id: "double-linked-list",
    title: "Double Linked List",
    patternSlug: "linked-list",
    blurb: "Linked List with navigation in both forward and backward directions.",
    subsections: [
      {
        id: "double-linked-list-basic-dll-operations",
        title: "Basic DLL Operations",
        hint: "Problem mentions insertion/deletion in DLL, printing forwards/backwards, or caching (LRU/MRU/frequency-based).",
        problems: [
          p("Insert Delete GetRandom O(1)", "insert-delete-getrandom-o1", "medium"),
          p("LRU Cache", "lru-cache", "medium"),
          p("LFU Cache", "lfu-cache", "hard"),
          p("Time Based Key-Value Store", "time-based-key-value-store", "medium"),
          p("Logger Rate Limiter", "logger-rate-limiter", "easy"),
        ],
      },
      {
        id: "double-linked-list-merge-sort-reorder",
        title: "Merge / Sort / Reorder",
        hint: "Problem involves multi-level DLL, sorting, alternating nodes, palindrome check, conversions, or pair sums.",
        problems: [
        ],
      },
    ],
  },
  {
    id: "hashmap",
    title: "HashMap",
    patternSlug: "hashing",
    blurb: "Key-value pair data structure for O(1) average time complexity lookups.",
    subsections: [
      {
        id: "hashmap-frequency-map-counting",
        title: "Frequency Map / Counting",
        hint: "Problem mentions frequency, duplicates, top-k, or counting occurrences.",
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
          p("4Sum II", "4sum-ii", "medium"),
          p("Valid Sudoku", "valid-sudoku", "medium"),
          p("Longest Palindrome", "longest-palindrome", "easy"),
          p("Find All Duplicates in an Array", "find-all-duplicates-in-an-array", "medium"),
          p("Encode and Decode Strings", "encode-and-decode-strings", "medium"),
          p("Sort Characters By Frequency", "sort-characters-by-frequency", "medium"),
        ],
      },
      {
        id: "hashmap-prefix-sum-with-map",
        title: "Prefix-Sum with Map",
        hint: "Problem involves subarray sums, cumulative sums, or “sum equals K”.",
        problems: [
          p("Contiguous Array", "contiguous-array", "medium"),
          p("Subarray Sum Equals K", "subarray-sum-equals-k", "medium"),
        ],
      },
    ],
  },
  {
    id: "binary-tree",
    title: "Binary Tree",
    patternSlug: "trees",
    blurb: "Hierarchical data structure with a root value and subtrees of children.",
    subsections: [
      {
        id: "binary-tree-dfs-traversals",
        title: "DFS Traversals",
        hint: "Problem mentions “visit all nodes recursively, max depth/path/subtree sum.”",
        problems: [
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
          p("Path Sum", "path-sum", "easy"),
          p("Path Sum II", "path-sum-ii", "medium"),
          p("Path Sum III", "path-sum-iii", "medium"),
          p("Sum Root to Leaf Numbers", "sum-root-to-leaf-numbers", "medium"),
          p("Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", "hard"),
          p("Count Good Nodes in Binary Tree", "count-good-nodes-in-binary-tree", "medium"),
          p("Flatten Binary Tree to Linked List", "flatten-binary-tree-to-linked-list", "medium"),
          p("Construct Binary Tree from Inorder and Postorder Traversal", "construct-binary-tree-from-inorder-and-postorder-traversal", "medium"),
          p("Binary Tree Longest Consecutive Sequence", "binary-tree-longest-consecutive-sequence", "medium"),
        ],
      },
      {
        id: "binary-tree-bfs-level-order",
        title: "BFS / Level-Order",
        hint: "Problem mentions “level-order, breadth-first, zigzag, right-side view, or level sum/average.”",
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
        id: "binary-tree-lowest-common-ancestor",
        title: "Lowest Common Ancestor",
        hint: "Problem mentions “find common ancestor, distance between nodes, or lowest node covering two nodes.”",
        problems: [
          p("Lowest Common Ancestor of a Binary Tree", "lowest-common-ancestor-of-a-binary-tree", "medium"),
          p("Lowest Common Ancestor of a Binary Search Tree", "lowest-common-ancestor-of-a-binary-search-tree", "medium"),
        ],
      },
      {
        id: "binary-tree-serialization-construction",
        title: "Serialization / Construction",
        hint: "Problem mentions “serialize tree, flatten tree to list, next pointers, or reconstruct tree.”",
        problems: [
          p("Invert Binary Tree", "invert-binary-tree", "easy"),
          p("Serialize and Deserialize Binary Tree", "serialize-and-deserialize-binary-tree", "hard"),
          p("Construct Binary Tree from Preorder and Inorder Traversal", "construct-binary-tree-from-preorder-and-inorder-traversal", "medium"),
        ],
      },
      {
        id: "binary-tree-bst",
        title: "BST",
        hint: "Problem mentions “BST operations, validate BST, insert/delete nodes, or sum/range queries.”",
        problems: [
          p("Validate Binary Search Tree", "validate-binary-search-tree", "medium"),
          p("Kth Smallest Element in a BST", "kth-smallest-element-in-a-bst", "medium"),
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
    id: "graph",
    title: "Graph",
    patternSlug: "graphs",
    blurb: "Non-linear data structure consisting of nodes and edges.",
    subsections: [
      {
        id: "graph-dfs-connectivity",
        title: "DFS (Connectivity)",
        hint: "Problem mentions “connected components, islands, cycles, safe states, bipartite check, bridges, articulation points, or connectivity check”.",
        problems: [
          p("Number of Islands", "number-of-islands", "medium"),
          p("Clone Graph", "clone-graph", "medium"),
          p("Surrounded Regions", "surrounded-regions", "medium"),
          p("Pacific Atlantic Water Flow", "pacific-atlantic-water-flow", "medium"),
          p("Flood Fill", "flood-fill", "easy"),
        ],
      },
      {
        id: "graph-bfs-pattern",
        title: "BFS Pattern",
        hint: "Problem mentions “shortest path, level-order traversal, or unweighted distance”.",
        problems: [
          p("Max Area of Island", "max-area-of-island", "medium"),
          p("Rotting Oranges", "rotting-oranges", "medium"),
          p("01 Matrix", "01-matrix", "medium"),
          p("Shortest Path in Binary Matrix", "shortest-path-in-binary-matrix", "medium"),
          p("Number of Enclaves", "number-of-enclaves", "medium"),
          p("Walls and Gates", "walls-and-gates", "medium"),
          p("Word Ladder", "word-ladder", "hard"),
          p("Keys and Rooms", "keys-and-rooms", "medium"),
        ],
      },
      {
        id: "graph-topological-sort",
        title: "Topological Sort",
        hint: "Problem mentions “ordering tasks, course prerequisites, dependency chains, build order, or cycle in directed graph”.",
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
        id: "graph-mst-union-find",
        title: "MST / Union-Find",
        hint: "Problem mentions “minimum cost to connect all nodes, redundant connections, union-find required”.",
        problems: [
          p("Min Cost to Connect All Points", "min-cost-to-connect-all-points", "medium"),
          p("Number of Provinces", "number-of-provinces", "medium"),
          p("Redundant Connection", "redundant-connection", "medium"),
          p("Accounts Merge", "accounts-merge", "medium"),
          p("Graph Valid Tree", "graph-valid-tree", "medium"),
          p("Number of Connected Components in an Undirected Graph", "number-of-connected-components-in-an-undirected-graph", "medium"),
          p("Number of Operations to Make Network Connected", "number-of-operations-to-make-network-connected", "medium"),
          p("Largest Component Size by Common Factor", "largest-component-size-by-common-factor", "hard"),
          p("Making A Large Island", "making-a-large-island", "hard"),
          p("Most Stones Removed with Same Row or Column", "most-stones-removed-with-same-row-or-column", "medium"),
          p("Number of Islands II", "number-of-islands-ii", "hard"),
        ],
      },
      {
        id: "graph-dijkstra-weighted",
        title: "Dijkstra (Weighted)",
        hint: "Problem mentions “weighted edges, shortest path, or minimum distance in weighted graph”.",
        problems: [
          p("Network Delay Time", "network-delay-time", "medium"),
          p("Path With Minimum Effort", "path-with-minimum-effort", "medium"),
          p("Word Ladder II", "word-ladder-ii", "hard"),
          p("Swim in Rising Water", "swim-in-rising-water", "hard"),
          p("Open the Lock", "open-the-lock", "medium"),
          p("Find the City With the Smallest Number of Neighbors at a Threshold Distance", "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance", "medium"),
          p("Number of Ways to Arrive at Destination", "number-of-ways-to-arrive-at-destination", "medium"),
          p("Minimum Knight Moves", "minimum-knight-moves", "medium"),
        ],
      },
      {
        id: "graph-bellman-ford",
        title: "Bellman-Ford",
        hint: "Problem mentions “negative weights, cycles, or cost minimization with negative edges”.",
        problems: [
          p("Cheapest Flights Within K Stops", "cheapest-flights-within-k-stops", "medium"),
        ],
      },
      {
        id: "graph-floyd-warshall",
        title: "Floyd-Warshall",
        hint: "Problem mentions “all-pairs shortest paths, matrix, or city connectivity between any two nodes”.",
        problems: [
        ],
      },
    ],
  },
  {
    id: "heap",
    title: "Heap",
    patternSlug: "heap",
    blurb: "Priority Queue data structure for efficient retrieval of highest/lowest priority elements.",
    subsections: [
      {
        id: "heap-top-k-elements",
        title: "Top-K Elements",
        hint: "Problem mentions top k, kth largest/smallest, median, or maintaining running extremes.",
        problems: [
          p("Kth Largest Element in an Array", "kth-largest-element-in-an-array", "medium"),
          p("Top K Frequent Elements", "top-k-frequent-elements", "medium"),
          p("Find Median from Data Stream", "find-median-from-data-stream", "hard"),
          p("Design Twitter", "design-twitter", "medium"),
          p("Meeting Rooms III", "meeting-rooms-iii", "hard"),
          p("K Frequent Words", "top-k-frequent-words", "medium"),
        ],
      },
      {
        id: "heap-merge-k-sorted",
        title: "Merge K Sorted",
        hint: "Problem mentions merging sorted arrays/lists or finding K smallest/largest pairs across arrays.",
        problems: [
          p("K Closest Points to Origin", "k-closest-points-to-origin", "medium"),
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
        id: "heap-heap-with-sliding-window",
        title: "Heap with Sliding Window",
        hint: "Problem mentions sliding window maximum/minimum or frequency-based window queries.",
        problems: [
          p("Task Scheduler", "task-scheduler", "medium"),
        ],
      },
      {
        id: "heap-implementation-of-heap",
        title: "Implementation of Heap",
        hint: "Design Priority Queue",
        problems: [
        ],
      },
      {
        id: "heap-huffman-pattern",
        title: "Huffman pattern",
        hint: "Repeatedly combine the two smallest elements to minimize the total cost.",
        problems: [
          p("Reorganize String", "reorganize-string", "medium"),
        ],
      },
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    patternSlug: "backtracking",
    blurb: "Algorithmic technique for solving problems recursively by trying to build a solution incrementally.",
    subsections: [
      {
        id: "backtracking-choice-based-backtracking",
        title: "Choice-Based Backtracking",
        hint: "This approach forms a recursion tree and is the backbone of backtracking problems.",
        problems: [
          p("Subsets", "subsets", "medium"),
          p("Subsets II", "subsets-ii", "medium"),
          p("Permutations", "permutations", "medium"),
          p("Permutations II", "permutations-ii", "medium"),
          p("Combination Sum", "combination-sum", "medium"),
          p("Combination Sum II", "combination-sum-ii", "medium"),
          p("Combination Sum III", "combination-sum-iii", "medium"),
          p("Combinations", "combinations", "medium"),
          p("Palindrome Partitioning", "palindrome-partitioning", "medium"),
          p("Generate Parentheses", "generate-parentheses", "medium"),
          p("Letter Case Permutation", "letter-case-permutation", "medium"),
          p("Restore IP Addresses", "restore-ip-addresses", "medium"),
        ],
      },
      {
        id: "backtracking-constraint-based-backtracking",
        title: "Constraint-Based Backtracking",
        hint: "Problem mentions “generate all subsets, combinations, parentheses, letters from digits, or selection without rearranging order.”",
        problems: [
          p("N-Queens", "n-queens", "hard"),
        ],
      },
      {
        id: "backtracking-grid-path-backtracking",
        title: "Grid / Path Backtracking",
        hint: "Problem mentions “maze, grid, pathfinding, sudoku, word search in grid, Hamiltonian path, or max path gold.”",
        problems: [
          p("Word Search", "word-search", "medium"),
          p("Sudoku Solver", "sudoku-solver", "hard"),
          p("Word Search II", "word-search-ii", "hard"),
          p("Unique Paths III", "unique-paths-iii", "hard"),
        ],
      },
      {
        id: "backtracking-decision-tree-sequence-generation",
        title: "Decision Tree / Sequence Generation",
        hint: "Problems where you recursively build sequences, combinations of digits/letters, or expressions.",
        problems: [
          p("Letter Combinations of a Phone Number", "letter-combinations-of-a-phone-number", "medium"),
          p("Expression Add Operators", "expression-add-operators", "hard"),
        ],
      },
    ],
  },
  {
    id: "greedy",
    title: "Greedy",
    patternSlug: "greedy",
    blurb: "Algorithm paradigm that follows the problem solving heuristic of making the locally optimal choice.",
    subsections: [
      {
        id: "greedy-intervals-reach",
        title: "Intervals & Reach",
        hint: "Problem mentions “maximum non-overlapping intervals, tasks, meetings, jump to end, minimum steps, or cover intervals”.",
        problems: [
          p("Merge Intervals", "merge-intervals", "medium"),
          p("Insert Interval", "insert-interval", "medium"),
          p("Non-overlapping Intervals", "non-overlapping-intervals", "medium"),
          p("Minimum Number of Arrows to Burst Balloons", "minimum-number-of-arrows-to-burst-balloons", "medium"),
          p("Minimum Interval to Include Each Query", "minimum-interval-to-include-each-query", "hard"),
          p("Meeting Rooms", "meeting-rooms", "easy"),
          p("Meeting Rooms II", "meeting-rooms-ii", "medium"),
          p("Car Pooling", "car-pooling", "medium"),
          p("My Calendar I", "my-calendar-i", "medium"),
          p("Jump Game", "jump-game", "medium"),
          p("Jump Game II", "jump-game-ii", "medium"),
          p("Valid Parenthesis String", "valid-parenthesis-string", "medium"),
        ],
      },
      {
        id: "greedy-sorting-local-choice",
        title: "Sorting / Local Choice",
        hint: "Problem mentions “maximize/minimize sum, select elements optimally, assign/distribute resources, or custom order”.",
        problems: [
          p("Gas Station", "gas-station", "medium"),
          p("Candy", "candy", "hard"),
          p("Partition Labels", "partition-labels", "medium"),
          p("Hand of Straights", "hand-of-straights", "medium"),
          p("Merge Triplets to Form Target Triplet", "merge-triplets-to-form-target-triplet", "medium"),
          p("Queue Reconstruction by Height", "queue-reconstruction-by-height", "medium"),
          p("Assign Cookies", "assign-cookies", "easy"),
          p("Lemonade Change", "lemonade-change", "easy"),
          p("Maximum Number of Events That Can Be Attended", "maximum-number-of-events-that-can-be-attended", "medium"),
          p("Partition Array for Maximum Sum", "partition-array-for-maximum-sum", "medium"),
          p("Largest Number", "largest-number", "medium"),
        ],
      },
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    patternSlug: "dp",
    blurb: "Optimization method involving breaking down problems into simpler subproblems and storing their solutions.",
    subsections: [
      {
        id: "dynamic-programming-1d-linear-dp",
        title: "1D / Linear DP",
        hint: "Problem mentions “subarrays, sequences, max/min sum/product, or linear decisions”.",
        problems: [
          p("Climbing Stairs", "climbing-stairs", "easy"),
          p("Min Cost Climbing Stairs", "min-cost-climbing-stairs", "easy"),
          p("House Robber", "house-robber", "medium"),
          p("House Robber II", "house-robber-ii", "medium"),
          p("Decode Ways", "decode-ways", "medium"),
          p("Longest Increasing Subsequence", "longest-increasing-subsequence", "medium"),
          p("Minimum Cost For Tickets", "minimum-cost-for-tickets", "medium"),
          p("Perfect Squares", "perfect-squares", "medium"),
          p("Integer Break", "integer-break", "medium"),
          p("Partition to K Equal Sum Subsets", "partition-to-k-equal-sum-subsets", "medium"),
          p("Number of Longest Increasing Subsequence", "number-of-longest-increasing-subsequence", "medium"),
        ],
      },
      {
        id: "dynamic-programming-2d-grid-dp",
        title: "2D / Grid DP",
        hint: "Problem mentions “grids, movement from start to end, paths, or matrix-based sums”.",
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
        id: "dynamic-programming-dp-on-strings",
        title: "DP on Strings",
        hint: "Problem mentions “subsequence, substring, longest common, palindrome, or string edit operations”.",
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
        id: "dynamic-programming-dp-on-intervals",
        title: "DP on Intervals",
        hint: "Problem mentions “intervals, subarray partitions, merging cost, or burst balloons”.",
        problems: [
          p("Burst Balloons", "burst-balloons", "hard"),
          p("Minimum Cost to Cut a Stick", "minimum-cost-to-cut-a-stick", "hard"),
          p("Palindrome Partitioning II", "palindrome-partitioning-ii", "hard"),
          p("Russian Doll Envelopes", "russian-doll-envelopes", "hard"),
          p("Largest Divisible Subset", "largest-divisible-subset", "medium"),
          p("Longest String Chain", "longest-string-chain", "medium"),
          p("Frog Jump", "frog-jump", "hard"),
        ],
      },
      {
        id: "dynamic-programming-dp-on-trees-dags",
        title: "DP on Trees / DAGs",
        hint: "Problem mentions “trees, DAGs, path sums, node coverage, or ways to traverse dependent nodes”.",
        problems: [
          p("House Robber III", "house-robber-iii", "medium"),
        ],
      },
      {
        id: "dynamic-programming-knapsack-subset-sum",
        title: "Knapsack / Subset Sum",
        hint: "Problem mentions “choose subset under constraints, maximize value, target sum, or weight limit”.",
        problems: [
          p("Coin Change", "coin-change", "medium"),
          p("Coin Change II", "coin-change-ii", "medium"),
          p("Partition Equal Subset Sum", "partition-equal-subset-sum", "medium"),
          p("Target Sum", "target-sum", "medium"),
        ],
      },
      {
        id: "dynamic-programming-dp-on-stocks",
        title: "DP on Stocks",
        hint: "Problems involving buying and selling stocks to maximize profit with varying constraints.",
        problems: [
          p("Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "easy"),
          p("Best Time to Buy and Sell Stock II", "best-time-to-buy-and-sell-stock-ii", "medium"),
          p("Best Time to Buy and Sell Stock III", "best-time-to-buy-and-sell-stock-iii", "hard"),
          p("Best Time to Buy and Sell Stock IV", "best-time-to-buy-and-sell-stock-iv", "hard"),
          p("Best Time to Buy and Sell Stock with Cooldown", "best-time-to-buy-and-sell-stock-with-cooldown", "medium"),
          p("Best Time to Buy and Sell Stock with Transaction Fee", "best-time-to-buy-and-sell-stock-with-transaction-fee", "medium"),
          p("Ones and Zeroes", "ones-and-zeroes", "medium"),
          p("Last Stone Weight II", "last-stone-weight-ii", "medium"),
        ],
      },
    ],
  },
  {
    id: "trie",
    title: "Trie",
    patternSlug: "trie",
    blurb: "Tree-based data structure used for efficiently storing and retrieving keys in a dataset of strings.",
    subsections: [
      {
        id: "trie-basic-trie-operations",
        title: "Basic Trie Operations",
        hint: "Problem mentions “dictionary, prefix search, word lookup, autocomplete, or predictive text”.",
        problems: [
          p("Implement Trie (Prefix Tree)", "implement-trie-prefix-tree", "medium"),
          p("Design Add and Search Words Data Structure", "design-add-and-search-words-data-structure", "medium"),
          p("Longest Word in Dictionary", "longest-word-in-dictionary", "medium"),
          p("Replace Words", "replace-words", "medium"),
        ],
      },
      {
        id: "trie-word-break-segmentation",
        title: "Word Break / Segmentation",
        hint: "Problem mentions “word segmentation, dictionary words, concatenated words, or string break”.",
        problems: [
          p("Word Break", "word-break", "medium"),
          p("Concatenated Words", "concatenated-words", "hard"),
        ],
      },
      {
        id: "trie-bitwise-trie-xor",
        title: "Bitwise Trie / XOR",
        hint: "Problem mentions “maximize XOR, XOR queries, bit-level optimization, or subsets”.",
        problems: [
          p("Maximum XOR of Two Numbers in an Array", "maximum-xor-of-two-numbers-in-an-array", "medium"),
        ],
      },
    ],
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    patternSlug: "bits",
    blurb: "Techniques that perform operations on data at the bit level.",
    subsections: [
      {
        id: "bit-manipulation-basic-bit-operations",
        title: "Basic Bit Operations",
        hint: "Problem mentions “unique element, missing number, or bit counting”.",
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
          p("Maximum XOR for Each Query", "maximum-xor-for-each-query", "medium"),
          p("Minimum Bit Flips to Convert Number", "minimum-bit-flips-to-convert-number", "easy"),
          p("Reverse Integer", "reverse-integer", "medium"),
          p("Armstrong Number", "armstrong-number", "easy"),
          p("Count Good Numbers", "count-good-numbers", "medium"),
          p("Count Primes", "count-primes", "medium"),
          p("Divide Two Integers", "divide-two-integers", "medium"),
        ],
      },
      {
        id: "bit-manipulation-subsets-bitmask",
        title: "Subsets / Bitmask",
        hint: "Problem mentions “generate subsets, combinations, or mask enumeration”.",
        problems: [
        ],
      },
      {
        id: "bit-manipulation-advanced-xor",
        title: "Advanced XOR",
        hint: "Problem mentions “maximize XOR, XOR queries, pairs, or range XOR”.",
        problems: [
        ],
      },
    ],
  },
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
