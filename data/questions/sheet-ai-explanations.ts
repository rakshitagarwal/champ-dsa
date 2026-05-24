/* Auto-generated — run: npm run generate:explanations */
import type { AiExplainCommentary } from "@/types/ai-explain";

export const sheetAiExplanationsByQuestionId: Record<string, AiExplainCommentary> = {
  "bc-001-richest-customer-wealth": {
    "summary": "Sheet #1 — Richest customer wealth. Return the maximum wealth among all customers. Your `maximumWealth` solution follows the **Sum each row** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Sum each row** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Sum each row; Track maximum.",
    "howExamplesAreSatisfied": "For the sample input (accounts = [[1,2,3],[3,2,1]]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Sum each row",
      "Time: O(n)",
      "Space: O(1)",
      "Sum each row",
      "Track maximum"
    ]
  },
  "bc-002-two-sum": {
    "summary": "Sheet #2 — Two Sum. Find two indices where nums[i] + nums[j] equals target. Your `twoSum` solution follows the **Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,7,11,15], target = 9), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  0,\n  1\n].",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Hash map complement",
      "One pass"
    ]
  },
  "bc-003-count-negative-numbers-in-a-sorted-matrix": {
    "summary": "Sheet #3 — Count negative numbers in a sorted matrix. Count negative numbers in each sorted matrix row. Your `countNegatives` solution follows the **Start from right** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Start from right** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Start from right; Row sorted.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[4,3,2,-1],[3,2,1,-1]]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Start from right",
      "Time: O(n)",
      "Space: O(1)",
      "Start from right",
      "Row sorted"
    ]
  },
  "bc-004-next-permutation": {
    "summary": "Sheet #4 — Next permutation. Return the next lexicographically greater permutation. Your `nextPermutation` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Find pivot; Reverse suffix.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), follow your code with those values. Expected output: [\n  1,\n  3,\n  2\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Find pivot",
      "Reverse suffix"
    ]
  },
  "bc-005-linked-lists": {
    "summary": "Sheet #5 — Linked Lists. Find the median of two sorted arrays. Your `findMedianSortedArrays` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (a = [1,3], b = [2]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Binary search partition",
      "Compare halves"
    ]
  },
  "bc-006-find-greatest-common-divisor-of-array": {
    "summary": "Sheet #6 — Find greatest common divisor of array. Return the GCD of all numbers in the array. Your `findGCD` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,4,6,8]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Euclid gcd",
      "Reduce array"
    ]
  },
  "bc-007-self-dividing-numbers": {
    "summary": "Sheet #7 — Self dividing numbers. Return all self-dividing numbers in [left, right]. Your `selfDividingNumbers` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Check digits divide n; Skip zero digits.",
    "howExamplesAreSatisfied": "For the sample input (left = 1, right = 22), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Check digits divide n",
      "Skip zero digits"
    ]
  },
  "bc-008-inversion-of-array-1587115620": {
    "summary": "Sheet #8 — Inversion of array - 1587115620. Count inversions in the array. Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [5,2,6,1]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Merge sort count",
      "Split merge"
    ]
  },
  "bc-009-reverse-pairs": {
    "summary": "Sheet #9 — Reverse pairs. Count pairs i<j with nums[i] > 2*nums[j]. Your `reversePairs` solution follows the **Binary Search + Sorting + Merge Pattern** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,3,2,3,1]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Binary Search + Sorting + Merge Pattern",
      "Time: O(log n)",
      "Space: O(1)",
      "Merge sort",
      "Count before merge"
    ]
  },
  "bc-010-special-positions-in-a-binary-matrix": {
    "summary": "Sheet #10 — Special positions in a binary matrix. Count 1-cells that are alone in their row and column. Your `numSpecial` solution follows the **Row/col counts** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Row/col counts** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Row/col counts; Check special cells.",
    "howExamplesAreSatisfied": "For the sample input (nums = [[1,0,0],[0,1,0],[0,0,1]]), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Row/col counts",
      "Time: O(n²)",
      "Space: O(1)",
      "Row/col counts",
      "Check special cells"
    ]
  },
  "bc-011-transpose-matrix": {
    "summary": "Sheet #11 — Transpose Matrix. Return the transpose of the matrix. Your `transpose` solution follows the **Swap indices** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Swap indices** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Swap indices; New rows from columns.",
    "howExamplesAreSatisfied": "For the sample input (matrix = [[1,2,3],[4,5,6]]), follow your code with those values. Expected output: [\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    5\n  ],\n  [\n    3,\n    6\n  ]\n].",
    "keyIdeas": [
      "Pattern: Swap indices",
      "Time: O(n²)",
      "Space: O(1)",
      "Swap indices",
      "New rows from columns"
    ]
  },
  "bc-012-01-matrix": {
    "summary": "Sheet #12 — 01 Matrix. Return distance to nearest 0 for each cell. Your `updateMatrix` solution follows the **BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.\n\nYou enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    "howExamplesAreSatisfied": "For the sample input (nums = [[0,0,0],[0,1,0],[0,0,0]]), follow your code with those values. Expected output: [\n  [\n    0,\n    0,\n    0\n  ],\n  [\n    0,\n    1,\n    0\n  ],\n  [\n    0,\n    0,\n    0\n  ]\n].",
    "keyIdeas": [
      "Pattern: BFS",
      "Time: O(m×n)",
      "Space: O(m×n)",
      "Multi-source BFS",
      "Layer expansion"
    ]
  },
  "bc-013-spiral-matrix": {
    "summary": "Sheet #13 — Spiral Matrix. Return matrix elements in spiral order. Your `spiralOrder` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Four boundaries; Shrink while walking.",
    "howExamplesAreSatisfied": "For the sample input (matrix = [[1,2,3],[4,5,6],[7,8,9]]), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  6,\n  9,\n  8,\n  7,\n  4,\n  5\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Four boundaries",
      "Shrink while walking"
    ]
  },
  "bc-014-pascal-s-triangle": {
    "summary": "Sheet #14 — Pascal's Triangle. Generate Pascal's triangle with numRows rows. Your `generate` solution follows the **Previous row sums** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Previous row sums** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Previous row sums; Edge ones.",
    "howExamplesAreSatisfied": "For the sample input (numRows = 5), follow your code with those values. Expected output: [\n  [\n    1\n  ],\n  [\n    1,\n    1\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    1,\n    3,\n    3,\n    1\n  ],\n  [\n    1,\n    4,\n    6,\n    4,\n    1\n  ]\n].",
    "keyIdeas": [
      "Pattern: Previous row sums",
      "Time: O(n²)",
      "Space: O(1)",
      "Previous row sums",
      "Edge ones"
    ]
  },
  "bc-015-minimum-size-subarray-sum": {
    "summary": "Sheet #15 — Minimum Size Subarray Sum. Minimal length subarray with sum >= target. Your `NumArray` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Sliding window; Shrink when valid.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,3,1,2,4,3], target = 7), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Sliding window",
      "Shrink when valid"
    ]
  },
  "bc-016-running-sum-of-1d-array": {
    "summary": "Sheet #16 — Running Sum of 1d Array. Return running sum of nums. Your `runningSum` solution follows the **Prefix Sum** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Prefix sums precompute cumulative totals so any range sum is a subtraction of two prefix values. Building the prefix array once makes each query O(1).\n\nFor 2D grids the same idea extends with inclusion–exclusion on a padded prefix table.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,4]), follow your code with those values. Expected output: [\n  1,\n  3,\n  6,\n  10\n].",
    "keyIdeas": [
      "Pattern: Prefix Sum",
      "Time: O(m×n) build, O(1) query",
      "Space: O(m×n)",
      "Prefix in place",
      "Add previous"
    ]
  },
  "bc-017-range-sum-query-2d-immutable": {
    "summary": "Sheet #17 — Range Sum Query 2D Immutable. Answer 2D range sum query using prefix sums. Your `NumMatrix` solution follows the **Prefix Sum** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Prefix sums precompute cumulative totals so any range sum is a subtraction of two prefix values. Building the prefix array once makes each query O(1).\n\nFor 2D grids the same idea extends with inclusion–exclusion on a padded prefix table.",
    "howExamplesAreSatisfied": "For the sample input (nums = [[3,0,1],[5,6,3],[1,2,0]], row1 = 1, col1 = 1, row2 = 2, col2 = 2), follow your code with those values. Expected output: 11.",
    "keyIdeas": [
      "Pattern: Prefix Sum",
      "Time: O(m×n) build, O(1) query",
      "Space: O(m×n)",
      "2D prefix table",
      "Inclusion-exclusion"
    ]
  },
  "bc-018-maximum-subarray": {
    "summary": "Sheet #18 — Maximum Subarray. Find maximum sum contiguous subarray. Your `maxSubArray` solution follows the **Kadane's Algorithm** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Kadane's algorithm tracks the best subarray ending at the current index. At each position you either extend the previous subarray or start fresh from the current element—whichever gives the larger sum.\n\nA separate variable keeps the global maximum across all positions. That single pass captures the optimal subarray without trying every possible range.",
    "howExamplesAreSatisfied": "For the sample input (nums = [-2,1,-3,4,-1,2,1,-5,4]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Kadane's Algorithm",
      "Time: O(n)",
      "Space: O(1)",
      "Kadane",
      "Best ending here"
    ]
  },
  "bc-019-maximum-sum-circular-subarray": {
    "summary": "Sheet #19 — Maximum Sum Circular Subarray. Maximum subarray sum on a circular array. Your `maxSubarraySumCircular` solution follows the **Kadane's Algorithm** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Kadane's algorithm tracks the best subarray ending at the current index. At each position you either extend the previous subarray or start fresh from the current element—whichever gives the larger sum.\n\nA separate variable keeps the global maximum across all positions. That single pass captures the optimal subarray without trying every possible range.",
    "howExamplesAreSatisfied": "For the sample input (nums = [5,-3,5]), follow your code with those values. Expected output: 10.",
    "keyIdeas": [
      "Pattern: Kadane's Algorithm",
      "Time: O(n)",
      "Space: O(1)",
      "Kadane + total-min",
      "Handle all-negative"
    ]
  },
  "bc-020-longest-turbulent-subarray": {
    "summary": "Sheet #20 — Longest Turbulent Subarray. Longest turbulent subarray length. Your `maxTurbulenceSize` solution follows the **Compare neighbors** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Compare neighbors** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Compare neighbors; Alternate up/down.",
    "howExamplesAreSatisfied": "For the sample input (arr = [9,4,2,10,7,8,8,1,9]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Compare neighbors",
      "Time: O(n)",
      "Space: O(1)",
      "Compare neighbors",
      "Alternate up/down"
    ]
  },
  "bc-021-contains-duplicate-ii": {
    "summary": "Sheet #21 — Contains Duplicate II. True if duplicate exists within index distance k. Your `containsNearbyDuplicate` solution follows the **Two Pointers + Hash Map + Hash Set + Sliding Window** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,1], k = 3), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: true.",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "Hash last index",
      "Check distance"
    ]
  },
  "bc-022-number-of-sub-arrays-of-size-k-and-average": {
    "summary": "Sheet #22 — Number of Sub-arrays of Size K and Average ... Count length-k subarrays with average >= threshold. Your `numOfSubarrays` solution follows the **Sliding Window** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sliding window avoids re-summing or re-scanning the whole range on every step. You expand the window by moving the right boundary, update a running aggregate (sum, count, or set of characters), and shrink from the left when the window becomes invalid or when you want the smallest valid window.\n\nThe window always represents a contiguous subarray or substring. Invariants are maintained incrementally: add on expand, remove on shrink, and record the answer whenever the window satisfies the problem condition.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,2,2,2,5,5,5,8], k = 3, threshold = 4), follow your code with those values. Trace: expand `right`, update the window state, shrink `left` when the window rule requires it. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Sliding Window",
      "Time: O(n)",
      "Space: O(1)",
      "Fixed window",
      "Compare sum/k"
    ]
  },
  "bc-023-minimum-size-subarray-sum": {
    "summary": "Sheet #23 — Minimum Size Subarray Sum. Minimal length subarray with sum >= target. Your `minSubArrayLen` solution follows the **Sliding Window** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sliding window avoids re-summing or re-scanning the whole range on every step. You expand the window by moving the right boundary, update a running aggregate (sum, count, or set of characters), and shrink from the left when the window becomes invalid or when you want the smallest valid window.\n\nThe window always represents a contiguous subarray or substring. Invariants are maintained incrementally: add on expand, remove on shrink, and record the answer whenever the window satisfies the problem condition.",
    "howExamplesAreSatisfied": "For the sample input (target = 7, nums = [2,3,1,2,4,3]), follow your code with those values. Trace: expand `right`, update the window state, shrink `left` when the window rule requires it. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Sliding Window",
      "Time: O(n)",
      "Space: O(1)",
      "Variable window",
      "Shrink when valid"
    ]
  },
  "bc-024-longest-substring-without-repeating-characters": {
    "summary": "Sheet #24 — Longest Substring Without Repeating Characters. Longest substring without repeating characters. Your `lengthOfLongestSubstring` solution follows the **Sliding window** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sliding window avoids re-summing or re-scanning the whole range on every step. You expand the window by moving the right boundary, update a running aggregate (sum, count, or set of characters), and shrink from the left when the window becomes invalid or when you want the smallest valid window.\n\nThe window always represents a contiguous subarray or substring. Invariants are maintained incrementally: add on expand, remove on shrink, and record the answer whenever the window satisfies the problem condition.",
    "howExamplesAreSatisfied": "For the sample input (s = \"abcabcbb\"), follow your code with those values. Trace: expand `right`, update the window state, shrink `left` when the window rule requires it. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Sliding window",
      "Time: O(n)",
      "Space: O(1)",
      "Sliding window",
      "Set of chars"
    ]
  },
  "bc-025-longest-repeating-character-replacement": {
    "summary": "Sheet #25 — Longest Repeating Character Replacement. Longest substring with at most k replacements. Your `characterReplacement` solution follows the **Window counts** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Window counts** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Window counts; maxFreq + k.",
    "howExamplesAreSatisfied": "For the sample input (s = \"AABABBA\", k = 1), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Window counts",
      "Time: O(n)",
      "Space: O(1)",
      "Window counts",
      "maxFreq + k"
    ]
  },
  "bc-026-container-with-most-water": {
    "summary": "Sheet #26 — Container With Most Water. Max water area between vertical lines. Your `maxArea` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Two pointers; Move shorter.",
    "howExamplesAreSatisfied": "For the sample input (height = [1,8,6,2,5,4,8,3,7]), follow your code with those values. Expected output: 49.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Two pointers",
      "Move shorter"
    ]
  },
  "bc-027-trapping-rain-water": {
    "summary": "Sheet #27 — Trapping Rain Water. Trap rainwater between bars. Your `trap` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Two pointers; Track left/right max.",
    "howExamplesAreSatisfied": "For the sample input (height = [0,1,0,2,1,0,1,3,2,1,2,1]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Two pointers",
      "Track left/right max"
    ]
  },
  "bc-028-two-sum-ii-input-array-is-sorted": {
    "summary": "Sheet #28 — Two Sum II - Input Array Is Sorted. Two sum on sorted array; 1-based indices. Your `twoSum` solution follows the **Two Pointers + Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (numbers = [2,7,11,15], target = 9), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  1,\n  2\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Two pointers",
      "Adjust by sum"
    ]
  },
  "bc-029-k-diff-pairs-in-an-array": {
    "summary": "Sheet #29 — K-diff Pairs in an Array. Count unique k-diff pairs. Your `findPairs` solution follows the **Two Pointers + Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [3,1,4,1,5], k = 2), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Two Pointers + Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Hash set",
      "Check x±k"
    ]
  },
  "bc-030-find-k-closest-elements": {
    "summary": "Sheet #30 — Find K Closest Elements. Return k closest elements to x in sorted nums. Your `findClosestElements` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Binary search window; Compare edges.",
    "howExamplesAreSatisfied": "For the sample input (arr = [1,2,3,4,5], k = 4, x = 3), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  4\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Binary search window",
      "Compare edges"
    ]
  },
  "bc-031-search-in-rotated-sorted-array": {
    "summary": "Sheet #31 — Search in Rotated Sorted Array. Search target in rotated sorted array. Your `search` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,5,6,7,0,1,2], target = 0), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search",
      "Sorted half"
    ]
  },
  "bc-032-remove-duplicates-from-sorted-array": {
    "summary": "Sheet #32 — Remove Duplicates from Sorted Array. Remove duplicates in-place; return new length. Your `removeDuplicates` solution follows the **Write pointer** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Write pointer** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Write pointer; Skip dupes.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,2]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Write pointer",
      "Time: O(n)",
      "Space: O(1)",
      "Write pointer",
      "Skip dupes"
    ]
  },
  "bc-033-find-first-and-last-position-of-element-in-sorte": {
    "summary": "Sheet #33 — Find First and Last Position of Element in Sorted Array. First and last position of target. Your `searchRange` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Binary search bounds; Lower and upper.",
    "howExamplesAreSatisfied": "For the sample input (nums = [5,7,7,8,8,10], target = 8), follow your code with those values. Expected output: [\n  3,\n  4\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Binary search bounds",
      "Lower and upper"
    ]
  },
  "bc-034-search-a-2d-matrix": {
    "summary": "Sheet #34 — Search a 2D Matrix. Search target in row-sorted 2D matrix. Your `searchMatrix` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: true.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search flat",
      "Index to cell"
    ]
  },
  "bc-035-find-peak-element": {
    "summary": "Sheet #35 — Find Peak Element. Find a peak element index. Your `findPeakElement` solution follows the **Binary search slope** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,1]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Binary search slope",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search slope",
      "Go uphill"
    ]
  },
  "bc-036-single-element-in-a-sorted-array": {
    "summary": "Sheet #36 — Single Element in a Sorted Array. Single element in sorted array with pairs. Your `singleNonDuplicate` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,2,3,3,4,4,8,8]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search parity",
      "Pair check"
    ]
  },
  "bc-037-preimage-size-of-factorial-zeroes-function": {
    "summary": "Sheet #37 — Preimage Size of Factorial Zeroes Function. Preimage size of factorial trailing zeroes at k. Your `preimageSizeFZF` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (k = 5), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 0.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search zeros",
      "Count plateau"
    ]
  },
  "bc-038-check-if-two-arrays-are-equal-or-not": {
    "summary": "Sheet #38 — Check if Two Arrays Are Equal or Not. Check if two arrays are equal multisets. Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,2,3], b = [1,2,3,2]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort compare",
      "Frequency map"
    ]
  },
  "bc-039-binary-array-sorting": {
    "summary": "Sheet #39 — Binary Array Sorting. Sort binary array of 0s and 1s. Your `solve` solution follows the **Count zeros** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Count zeros** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Count zeros; Fill array.",
    "howExamplesAreSatisfied": "For the sample input (nums = [0,1,0,1,0]), follow your code with those values. Expected output: [\n  0,\n  0,\n  0,\n  1,\n  1\n].",
    "keyIdeas": [
      "Pattern: Count zeros",
      "Time: O(n²)",
      "Space: O(1)",
      "Count zeros",
      "Fill array"
    ]
  },
  "bc-040-sort-colors": {
    "summary": "Sheet #40 — Sort Colors. Sort colors 0,1,2 in-place (Dutch flag). Your `sortColors` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Three pointers; Partition.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,0,2,1,1,0]), follow your code with those values. Expected output: [\n  0,\n  0,\n  1,\n  1,\n  2,\n  2\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Three pointers",
      "Partition"
    ]
  },
  "bc-041-kth-largest-element-in-an-array": {
    "summary": "Sheet #41 — Kth Largest Element in an Array. Find kth largest element. Your `findKthLargest` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [3,2,1,5,6,4], target = 2), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Quickselect",
      "Partition"
    ]
  },
  "bc-042-minimum-absolute-difference": {
    "summary": "Sheet #42 — Minimum Absolute Difference. Minimum absolute difference pairs in sorted array. Your `minimumAbsDifference` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,2,1,3]), follow your code with those values. Expected output: [\n  [\n    1,\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3,\n    4\n  ]\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort adjacent",
      "Track min diff"
    ]
  },
  "bc-043-k-closest-points-to-origin": {
    "summary": "Sheet #43 — K Closest Points to Origin. K closest points to origin. Your `kClosest` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (points = [[1,3],[-2,2]], k = 1), follow your code with those values. Expected output: [\n  [\n    -2,\n    2\n  ]\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by dist",
      "Take k"
    ]
  },
  "bc-044-max-chunks-to-make-sorted": {
    "summary": "Sheet #44 — Max Chunks To Make Sorted. Max chunks to make sorted array. Your `maxChunksToSorted` solution follows the **Track max index** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Track max index** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Track max index; Chunk at i.",
    "howExamplesAreSatisfied": "For the sample input (arr = [4,3,2,1,0]), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Track max index",
      "Time: O(n)",
      "Space: O(1)",
      "Track max index",
      "Chunk at i"
    ]
  },
  "bc-045-contiguous-array": {
    "summary": "Sheet #45 — Contiguous Array. Longest subarray with equal 0s and 1s. Your `findMaxLength` solution follows the **Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (nums = [0,1,0]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix as -1/+1",
      "Hash map"
    ]
  },
  "bc-046-longest-consecutive-sequence": {
    "summary": "Sheet #46 — Longest Consecutive Sequence. Longest consecutive sequence length. Your `longestConsecutive` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [100,4,200,1,3,2]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Hash set",
      "Start chains"
    ]
  },
  "bc-047-subarray-sum-equals-k": {
    "summary": "Sheet #47 — Subarray Sum Equals K. Count subarrays with sum k. Your `subarraySum` solution follows the **Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,1], target = 2), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix sum map",
      "Count complements"
    ]
  },
  "bc-048-valid-anagram": {
    "summary": "Sheet #48 — Valid Anagram. Check if t is anagram of s. Your `isAnagram` solution follows the **Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (s = \"anagram\", t = \"nagaram\"), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: true.",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Frequency count",
      "Match letters"
    ]
  },
  "bc-049-valid-sudoku": {
    "summary": "Sheet #49 — Valid Sudoku. Validate Sudoku board. Your `isValidSudoku` solution follows the **Hash Map + Hash Set** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: true.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "Row/col/box sets",
      "Skip dots"
    ]
  },
  "bc-050-ugly-number-ii": {
    "summary": "Sheet #50 — Ugly Number II. Nth ugly number (factors 2,3,5). Your `nthUglyNumber` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (n = 10), follow your code with those values. Expected output: 12.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n)",
      "Space: O(1)",
      "Three pointers",
      "Merge streams"
    ]
  },
  "bc-051-subarray-sum-equals-k": {
    "summary": "Sheet #51 — Subarray Sum Equals K. Count subarrays with sum exactly k. Your `subarraySum` solution follows the **Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,-1,0], target = 0), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix sum map",
      "Add counts"
    ]
  },
  "bc-052-max-points-on-a-line": {
    "summary": "Sheet #52 — Max Points on a Line. Maximum points on a line. Your `maxPoints` solution follows the **Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (points = [[1,1],[2,2],[3,3]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Slope hash",
      "Handle duplicates"
    ]
  },
  "bc-053-palindrome-pairs": {
    "summary": "Sheet #53 — Palindrome Pairs. Palindrome pairs of words. Your `palindromePairs` solution follows the **Two Pointers + Hash Map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (words = [\"bat\",\"tab\",\"cat\"]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  [\n    0,\n    1\n  ],\n  [\n    1,\n    0\n  ]\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Hash reverse",
      "Check pairs"
    ]
  },
  "bc-054-middle-of-the-linked-list": {
    "summary": "Sheet #54 — Middle of the Linked List. Middle node of linked list (array head). Your `middleNode` solution follows the **Fast & Slow Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Fast & Slow Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Slow/fast pointers; Half length.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Slow/fast pointers",
      "Half length"
    ]
  },
  "bc-055-maximum-twin-sum-of-a-linked-list": {
    "summary": "Sheet #55 — Maximum Twin Sum of a Linked List. Maximum twin sum in linked list. Your `pairSum` solution follows the **Fast & Slow Pointers + Kadane's Algorithm** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Two pointers moving at different speeds (or from different starts) detect structure in linked lists—middle node, cycle detection, or comparing halves after reversal.\n\nThe slow pointer moves one step while the fast pointer moves two. When fast reaches the end you have the middle; when they meet you have a cycle. Your code follows that rhythm and then finishes with a comparison or pointer adjustment step.",
    "howExamplesAreSatisfied": "For the sample input (head = [5,4,2,1]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers + Kadane's Algorithm",
      "Time: O(n²)",
      "Space: O(1)",
      "Find mid",
      "Reverse second half"
    ]
  },
  "bc-056-merge-two-sorted-lists": {
    "summary": "Sheet #56 — Merge Two Sorted Lists. Merge two sorted linked lists (arrays). Your `mergeTwoLists` solution follows the **Dummy Head (Linked List) + Merge Pattern** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Dummy Head (Linked List) + Merge Pattern** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Two pointers; Append rest.",
    "howExamplesAreSatisfied": "For the sample input (list1 = [1,2,4], list2 = [1,3,4]), follow your code with those values. Expected output: [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4\n].",
    "keyIdeas": [
      "Pattern: Dummy Head (Linked List) + Merge Pattern",
      "Time: O(n log n)",
      "Space: O(1)",
      "Two pointers",
      "Append rest"
    ]
  },
  "bc-057-linked-list-cycle": {
    "summary": "Sheet #57 — Linked List Cycle. Detect cycle in linked list. Your `hasCycle` solution follows the **Fast & Slow Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Two pointers moving at different speeds (or from different starts) detect structure in linked lists—middle node, cycle detection, or comparing halves after reversal.\n\nThe slow pointer moves one step while the fast pointer moves two. When fast reaches the end you have the middle; when they meet you have a cycle. Your code follows that rhythm and then finishes with a comparison or pointer adjustment step.",
    "howExamplesAreSatisfied": "For the sample input (head = [3,2,0,-4], pos = 1), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Floyd cycle",
      "Slow/fast"
    ]
  },
  "bc-058-reverse-nodes-in-k-group": {
    "summary": "Sheet #58 — Reverse Nodes in k- Group. Reverse nodes in k-group (array). Your `reverseKGroup` solution follows the **Reverse chunks** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Reverse chunks** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Reverse chunks; Handle remainder.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5], k = 2), follow your code with those values. Expected output: [\n  2,\n  null,\n  4,\n  null,\n  5\n].",
    "keyIdeas": [
      "Pattern: Reverse chunks",
      "Time: O(n²)",
      "Space: O(1)",
      "Reverse chunks",
      "Handle remainder"
    ]
  },
  "bc-059-remove-nth-node-from-end-of-list": {
    "summary": "Sheet #59 — Remove Nth Node From End of List. Remove nth node from end. Your `removeNthFromEnd` solution follows the **Fast & Slow Pointers + Dummy Head (Linked List)** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Fast & Slow Pointers + Dummy Head (Linked List)** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Two pointers gap n; Delete node.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5], n = 2), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  5\n].",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers + Dummy Head (Linked List)",
      "Time: O(n²)",
      "Space: O(1)",
      "Two pointers gap n",
      "Delete node"
    ]
  },
  "bc-060-linked-list-cycle-ii": {
    "summary": "Sheet #60 — Linked List Cycle II. Start of cycle in linked list. Your `detectCycle` solution follows the **Fast & Slow Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Two pointers moving at different speeds (or from different starts) detect structure in linked lists—middle node, cycle detection, or comparing halves after reversal.\n\nThe slow pointer moves one step while the fast pointer moves two. When fast reaches the end you have the middle; when they meet you have a cycle. Your code follows that rhythm and then finishes with a comparison or pointer adjustment step.",
    "howExamplesAreSatisfied": "For the sample input (head = [3,2,0,-4], pos = 1), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Floyd then reset",
      "Meet point"
    ]
  },
  "bc-061-delete-node-in-a-linked-list": {
    "summary": "Sheet #61 — Delete Node in a Linked List. Delete given node in linked list (array). Your `deleteNode` solution follows the **Copy next value** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (head = [4,5,1,9], node = 1), follow your code with those values. Expected output: [\n  4,\n  1,\n  9\n].",
    "keyIdeas": [
      "Pattern: Copy next value",
      "Time: O(n)",
      "Space: O(1)",
      "Copy next value",
      "Skip node"
    ]
  },
  "bc-062-reverse-linked-list": {
    "summary": "Sheet #62 — Reverse Linked List. Reverse linked list (array). Your `reverseList` solution follows the **Iterative reverse** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Iterative reverse** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Iterative reverse; Three pointers.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]), follow your code with those values. Expected output: [\n  5,\n  4,\n  3,\n  2,\n  1\n].",
    "keyIdeas": [
      "Pattern: Iterative reverse",
      "Time: O(n)",
      "Space: O(1)",
      "Iterative reverse",
      "Three pointers"
    ]
  },
  "bc-063-palindrome-linked": {
    "summary": "Sheet #63 — Palindrome Linked. Check if linked list is palindrome. Your `solve` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,2,1]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: true.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Find mid reverse",
      "Compare halves"
    ]
  },
  "bc-064-remove-linked-list": {
    "summary": "Sheet #64 — Remove Linked List. Remove all nodes equal to val. Your `solve` solution follows the **Filter array** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Filter array** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Filter array; Return list.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,6,3,4,5,6], val = 6), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  4,\n  5\n].",
    "keyIdeas": [
      "Pattern: Filter array",
      "Time: O(n)",
      "Space: O(1)",
      "Filter array",
      "Return list"
    ]
  },
  "bc-065-convert-binary-number-in-a-linked-list-to-intege": {
    "summary": "Sheet #65 — Convert Binary Number in a Linked List to Integer. Convert binary linked list to integer. Your `getDecimalValue` solution follows the **Accumulate bits** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Accumulate bits** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Accumulate bits; Left shift.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,0,1]), follow your code with those values. Expected output: 5.",
    "keyIdeas": [
      "Pattern: Accumulate bits",
      "Time: O(n)",
      "Space: O(1)",
      "Accumulate bits",
      "Left shift"
    ]
  },
  "bc-066-remove-duplicates-from-sorted-list-ii": {
    "summary": "Sheet #66 — Remove Duplicates from Sorted List II. Remove duplicates from sorted list II. Your `deleteDuplicates` solution follows the **Dummy Head (Linked List)** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Dummy Head (Linked List)** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Skip duplicate runs; Dummy head.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,3,4,4,5]), follow your code with those values. Expected output: [\n  1,\n  2,\n  5\n].",
    "keyIdeas": [
      "Pattern: Dummy Head (Linked List)",
      "Time: O(n²)",
      "Space: O(1)",
      "Skip duplicate runs",
      "Dummy head"
    ]
  },
  "bc-067-reverse-linked-list-ii": {
    "summary": "Sheet #67 — Reverse Linked List II. Reverse linked list between left and right. Your `reverseBetween` solution follows the **Two Pointers + Dummy Head (Linked List)** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers + Dummy Head (Linked List)** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Reverse subrange; 1-based indices.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5], left = 2, right = 4), follow your code with those values. Expected output: [\n  1,\n  4,\n  3,\n  2,\n  5\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + Dummy Head (Linked List)",
      "Time: O(n²)",
      "Space: O(1)",
      "Reverse subrange",
      "1-based indices"
    ]
  },
  "bc-068-sort-list": {
    "summary": "Sheet #68 — Sort List. Sort linked list (array merge sort). Your `sortList` solution follows the **Binary Search + Fast & Slow Pointers + Dummy Head (Linked List) + Merge Pattern** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (head = [4,2,1,3]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: [\n  1,\n  2,\n  3,\n  4\n].",
    "keyIdeas": [
      "Pattern: Binary Search + Fast & Slow Pointers + Dummy Head (Linked List) + Merge Pattern",
      "Time: O(log n)",
      "Space: O(1)",
      "Merge sort",
      "Split halves"
    ]
  },
  "bc-069-implement-stack-using-queues": {
    "summary": "Sheet #69 — Implement Stack using Queues. Implement stack using queues. Your `MyStack` solution follows the **BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.\n\nYou enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]), follow your code with those values. Expected output: [\n  1\n].",
    "keyIdeas": [
      "Pattern: BFS",
      "Time: O(m×n)",
      "Space: O(m×n)",
      "Push to q2",
      "Move elements"
    ]
  },
  "bc-070-implement-queue-using-stacks": {
    "summary": "Sheet #70 — Implement Queue using Stacks. Implement queue using stacks. Your `MyQueue` solution follows the **BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.\n\nYou enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]), follow your code with those values. Expected output: [\n  2\n].",
    "keyIdeas": [
      "Pattern: BFS",
      "Time: O(n²)",
      "Space: O(1)",
      "Two stacks",
      "Amortized O(1)"
    ]
  },
  "bc-071-backspace-string-compare": {
    "summary": "Sheet #71 — Backspace String Compare. Compare strings with backspace (#). Your `backspaceCompare` solution follows the **Stack Simulation** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "A stack models last-in-first-out behavior—typing characters and undoing with backspace, matching brackets, or evaluating expressions.\n\nYou push on regular input and pop when the problem says to undo or cancel the previous item, then compare or join the stack for the final result.",
    "howExamplesAreSatisfied": "For the sample input (s = \"ab#c\", t = \"ad#c\"), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Stack Simulation",
      "Time: O(n + m)",
      "Space: O(n + m)",
      "Stack build",
      "Pop on #"
    ]
  },
  "bc-072-baseball-game": {
    "summary": "Sheet #72 — Baseball Game. Evaluate baseball stack scores. Your `calPoints` solution follows the **Stack ops** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Stack ops** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Stack ops; Apply signs.",
    "howExamplesAreSatisfied": "For the sample input (operations = [\"5\",\"2\",\"C\",\"D\",\"+\"]), follow your code with those values. Expected output: 30.",
    "keyIdeas": [
      "Pattern: Stack ops",
      "Time: O(n)",
      "Space: O(1)",
      "Stack ops",
      "Apply signs"
    ]
  },
  "bc-073-longest-valid-parentheses": {
    "summary": "Sheet #73 — Longest Valid Parentheses. Longest valid parentheses length. Your `longestValidParentheses` solution follows the **Stack indices** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Stack indices** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Stack indices; Track gaps.",
    "howExamplesAreSatisfied": "For the sample input (s = \")()())\"), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Stack indices",
      "Time: O(n)",
      "Space: O(1)",
      "Stack indices",
      "Track gaps"
    ]
  },
  "bc-074-evaluate-reverse-polish-notation": {
    "summary": "Sheet #74 — Evaluate Reverse Polish Notation. Evaluate Reverse Polish Notation. Your `evalRPN` solution follows the **Stack operands** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Stack operands** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Stack operands; Apply operator.",
    "howExamplesAreSatisfied": "For the sample input (tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]), follow your code with those values. Expected output: 9.",
    "keyIdeas": [
      "Pattern: Stack operands",
      "Time: O(n)",
      "Space: O(1)",
      "Stack operands",
      "Apply operator"
    ]
  },
  "bc-075-daily-temperatures": {
    "summary": "Sheet #75 — Daily Temperatures. Daily temperatures: days until warmer. Your `dailyTemperatures` solution follows the **Monotonic stack** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Monotonic stack** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Monotonic stack; Next greater.",
    "howExamplesAreSatisfied": "For the sample input (temperatures = [73,74,75,71,69,72,76,73]), follow your code with those values. Expected output: [\n  1,\n  1,\n  4,\n  2,\n  1,\n  1,\n  0,\n  0\n].",
    "keyIdeas": [
      "Pattern: Monotonic stack",
      "Time: O(n)",
      "Space: O(1)",
      "Monotonic stack",
      "Next greater"
    ]
  },
  "bc-076-largest-rectangle-in-histogram": {
    "summary": "Sheet #76 — Largest Rectangle in Histogram. Largest rectangle in histogram. Your `largestRectangleArea` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Monotonic stack; Expand bars.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,1,5,6,2,3]), follow your code with those values. Expected output: 10.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Monotonic stack",
      "Expand bars"
    ]
  },
  "bc-077-min-stack": {
    "summary": "Sheet #77 — Min Stack. Min stack supporting getMin in O(1). Your `MinStack` solution follows the **Aux min stack** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Aux min stack** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Aux min stack; Track minimum.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]), follow your code with those values. Expected output: -3.",
    "keyIdeas": [
      "Pattern: Aux min stack",
      "Time: O(n)",
      "Space: O(1)",
      "Aux min stack",
      "Track minimum"
    ]
  },
  "bc-078-minimum-remove-to-make-valid-parentheses": {
    "summary": "Sheet #78 — Minimum Remove to Make Valid Parentheses. Minimum removes to make parentheses valid. Your `minRemoveToMakeValid` solution follows the **Stack open indices** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Stack open indices** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Stack open indices; Count unmatched.",
    "howExamplesAreSatisfied": "For the sample input (s = \"lee(t(c)o)de)\"), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Stack open indices",
      "Time: O(n)",
      "Space: O(1)",
      "Stack open indices",
      "Count unmatched"
    ]
  },
  "bc-079-find-median-from-data-stream": {
    "summary": "Sheet #79 — Find Median from Data Stream. Find median from data stream (simplified). Your `MedianFinder` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Two heaps; Balance sizes.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]), follow your code with those values. Expected output: 1.5.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Two heaps",
      "Balance sizes"
    ]
  },
  "bc-080-merge-k-sorted-lists": {
    "summary": "Sheet #80 — Merge k Sorted Lists. Merge k sorted lists (arrays). Your `mergeKLists` solution follows the **Two Pointers + Dummy Head (Linked List) + Merge Pattern** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers + Dummy Head (Linked List) + Merge Pattern** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Min heap or divide; Merge pairs.",
    "howExamplesAreSatisfied": "For the sample input (lists = [[1,4,5],[1,3,4],[2,6]]), follow your code with those values. Expected output: [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4,\n  5,\n  6\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + Dummy Head (Linked List) + Merge Pattern",
      "Time: O(n log n)",
      "Space: O(1)",
      "Min heap or divide",
      "Merge pairs"
    ]
  },
  "bc-081-find-k-pairs-with-smallest-sums": {
    "summary": "Sheet #81 — Find K Pairs with Smallest Sums. K pairs with smallest sums from two arrays. Your `kSmallestPairs` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums1 = [1,7,11], nums2 = [2,4,6], k = 3), follow your code with those values. Expected output: [\n  3,\n  5,\n  7\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Min heap",
      "Expand pairs"
    ]
  },
  "bc-082-meeting-rooms-ii": {
    "summary": "Sheet #82 — Meeting Rooms II. Meeting rooms II: minimum rooms needed. Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (intervals = [[0,30],[5,10],[15,20]]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by start",
      "Heap of ends"
    ]
  },
  "bc-083-top-k-frequent-elements": {
    "summary": "Sheet #83 — Top K Frequent Elements. Top k frequent elements. Your `topKFrequent` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,1,2,2,3], target = 2), follow your code with those values. Expected output: [\n  1,\n  2\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Frequency map",
      "Bucket or heap"
    ]
  },
  "bc-084-k-closest-points-to-origin": {
    "summary": "Sheet #84 — K Closest Points to Origin. K closest points to origin. Your `kClosest` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (points = [[1,3],[-2,2]], k = 1), follow your code with those values. Expected output: [\n  [\n    -2,\n    2\n  ]\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by distance",
      "Take k"
    ]
  },
  "bc-085-count-good-numbers": {
    "summary": "Sheet #85 — Count Good Numbers. Count good numbers of length n. Your `countGoodNumbers` solution follows the **Fast pow mod** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (n = 4), follow your code with those values. Expected output: 400.",
    "keyIdeas": [
      "Pattern: Fast pow mod",
      "Time: O(n)",
      "Space: O(1)",
      "Fast pow mod",
      "Alternate 5 and 4"
    ]
  },
  "bc-086-permutations": {
    "summary": "Sheet #86 — Permutations. Return all permutations of nums. Your `permute` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), follow your code with those values. Expected output: [\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3,\n    2\n  ],\n  [\n    2,\n    1,\n    3\n  ],\n  [\n    2,\n    3,\n    1\n  ],\n  [\n    3,\n    1,\n    2\n  ],\n  [\n    3,\n    2,\n    1\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack swap",
      "DFS choices"
    ]
  },
  "bc-087-permutations-ii": {
    "summary": "Sheet #87 — Permutations II. Permutations II with duplicates. Your `permuteUnique` solution follows the **DFS / Backtracking + Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,2]), follow your code with those values. Expected output: [\n  [\n    1,\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    2,\n    1,\n    1\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking + Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort + skip dupes",
      "Used array"
    ]
  },
  "bc-088-subsets": {
    "summary": "Sheet #88 — Subsets. Return all subsets of nums. Your `subsets` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), follow your code with those values. Expected output: [\n  [],\n  [\n    1\n  ],\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack include",
      "Power set"
    ]
  },
  "bc-089-basic-calculator": {
    "summary": "Sheet #89 — Basic Calculator. Evaluate basic calculator with + - ( ). Your `calculate` solution follows the **Stack signs** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Stack signs** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Stack signs; Parse numbers.",
    "howExamplesAreSatisfied": "For the sample input (s = \"1 + 1\"), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Stack signs",
      "Time: O(n)",
      "Space: O(1)",
      "Stack signs",
      "Parse numbers"
    ]
  },
  "bc-090-wildcard-matching": {
    "summary": "Sheet #90 — Wildcard Matching. Wildcard matching with ? and *. Your `isMatch` solution follows the **Hash Map + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (s = \"aa\", p = \"a\"), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: false.",
    "keyIdeas": [
      "Pattern: Hash Map + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "DP or greedy",
      "Star matches span"
    ]
  },
  "bc-091-combinations": {
    "summary": "Sheet #91 — Combinations. All combinations of n choose k. Your `combine` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (n = 4, k = 2), follow your code with those values. Expected output: [\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    2,\n    4\n  ],\n  [\n    3,\n    4\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack start",
      "Build combo"
    ]
  },
  "bc-092-combination-sum": {
    "summary": "Sheet #92 — Combination Sum. Combination sum with reuse. Your `combinationSum` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (candidates = [2,3,6,7], target = 7), follow your code with those values. Expected output: [\n  [\n    2,\n    2,\n    3\n  ],\n  [\n    7\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack candidates",
      "Subtract target"
    ]
  },
  "bc-093-combination-sum-iii": {
    "summary": "Sheet #93 — Combination Sum III. Combination sum III: k numbers sum to n. Your `combinationSum3` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (k = 3, n = 7), follow your code with those values. Expected output: [\n  [\n    1,\n    2,\n    4\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack 1-9",
      "No reuse"
    ]
  },
  "bc-094-letter-combinations-of-a-phone-number": {
    "summary": "Sheet #94 — Letter Combinations of a Phone Number. Letter combinations from phone digits. Your `letterCombinations` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (digits = \"23\"), follow your code with those values. Expected output: [\n  \"ad\",\n  \"ae\",\n  \"af\",\n  \"bd\",\n  \"be\",\n  \"bf\",\n  \"cd\",\n  \"ce\",\n  \"cf\"\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Map digits",
      "DFS build"
    ]
  },
  "bc-095-gray-code": {
    "summary": "Sheet #95 — Gray Code. Generate Gray code sequence for n. Your `grayCode` solution follows the **Hash Map + Hash Set + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (n = 2), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  0,\n  1,\n  3,\n  2\n].",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "XOR shift",
      "Reflect pattern"
    ]
  },
  "bc-096-letter-case-permutation": {
    "summary": "Sheet #96 — Letter Case Permutation. Letter case permutation of string. Your `letterCasePermutation` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (s = \"a1b2\"), follow your code with those values. Expected output: [\n  \"a1b2\",\n  \"a1B2\",\n  \"A1b2\",\n  \"A1B2\"\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack case",
      "Toggle letters"
    ]
  },
  "bc-097-n-queens": {
    "summary": "Sheet #97 — N-Queens. Solve N-Queens: return all boards. Your `solveNQueens` solution follows the **Hash Map + Hash Set + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (n = 4), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  [\n    \"bbbb\",\n    \"dddd\",\n    \"aaaa\",\n    \"cccc\"\n  ],\n  [\n    \"cccc\",\n    \"aaaa\",\n    \"dddd\",\n    \"bbbb\"\n  ]\n].",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "Backtrack rows",
      "Check diagonals"
    ]
  },
  "bc-098-sudoku-solver": {
    "summary": "Sheet #98 — Sudoku Solver. Solve Sudoku in-place on board. Your `solveSudoku` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]), follow your code with those values. Expected output: [\n  [\n    \"5\",\n    \"3\",\n    \"4\",\n    \"6\",\n    \"7\",\n    \"8\",\n    \"9\",\n    \"1\",\n    \"2\"\n  ],\n  [\n    \"6\",\n    \"7\",\n    \"2\",\n    \"1\",\n    \"9\",\n    \"5\",\n    \"3\",\n    \"4\",\n    \"8\"\n  ],\n  [\n    \"1\",\n    \"9\",\n    \"8\",\n    \"3\",\n    \"4\",\n    \"2\",\n    \"5\",\n    \"6\",\n    \"7\"\n  ],\n  [\n    \"8\",\n    \"5\",\n    \"9\",\n    \"7\",\n    \"6\",\n    \"1\",\n    \"4\",\n    \"2\",\n    \"3\"\n  ],\n  [\n    \"4\",\n    \"2\",\n    \"6\",\n    \"8\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"9\",\n    \"1\"\n  ],\n  [\n    \"7\",\n    \"1\",\n    \"3\",\n    \"9\",\n    \"2\",\n    \"4\",\n    \"8\",\n    \"5\",\n    \"6\"\n  ],\n  [\n    \"9\",\n    \"6\",\n    \"1\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"2\",\n    \"8\",\n    \"4\"\n  ],\n  [\n    \"2\",\n    \"8\",\n    \"7\",\n    \"4\",\n    \"1\",\n    \"9\",\n    \"6\",\n    \"3\",\n    \"5\"\n  ],\n  [\n    \"3\",\n    \"4\",\n    \"5\",\n    \"2\",\n    \"8\",\n    \"6\",\n    \"1\",\n    \"7\",\n    \"9\"\n  ]\n].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "Backtrack empty",
      "Check box"
    ]
  },
  "bc-099-construct-binary-tree-from-inorder-and-postorder": {
    "summary": "Sheet #99 — Construct Binary Tree from Inorder and Postorder Traversal. Build binary tree from inorder and postorder. Your `buildTree` solution follows the **Binary Search + Hash Map + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: buildTree.",
    "keyIdeas": [
      "Pattern: Binary Search + Hash Map + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "Pick root last",
      "Partition inorder"
    ]
  },
  "bc-100-construct-binary-tree-from-preorder-and-inorder-": {
    "summary": "Sheet #100 — Construct Binary Tree from Preorder and Inorder Traversal. Build tree from preorder and inorder. Your `buildTree` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: {\n  \"val\": 3,\n  \"left\": {\n    \"val\": 9,\n    \"left\": null,\n    \"right\": null\n  },\n  \"right\": {\n    \"val\": 20,\n    \"left\": {\n      \"val\": 15,\n      \"left\": null,\n      \"right\": null\n    },\n    \"right\": {\n      \"val\": 7,\n      \"left\": null,\n      \"right\": null\n    }\n  }\n}.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Root first",
      "Split inorder"
    ]
  },
  "bc-101-path-sum": {
    "summary": "Sheet #101 — Path Sum. Check if tree has root-to-leaf path sum. Your `hasPathSum` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DFS subtract; Leaf check.",
    "howExamplesAreSatisfied": "For the sample input (tree = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS subtract",
      "Leaf check"
    ]
  },
  "bc-102-same-tree": {
    "summary": "Sheet #102 — Same Tree. Check if two binary trees are the same. Your `isSameTree` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DFS compare; Structure and val.",
    "howExamplesAreSatisfied": "For the sample input (p = [1,2,3], q = [1,2,3]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS compare",
      "Structure and val"
    ]
  },
  "bc-103-binary-tree-level-order-traversal": {
    "summary": "Sheet #103 — Binary Tree Level Order Traversal. Binary tree level order traversal. Your `levelOrder` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: BFS queue; Level by level.",
    "howExamplesAreSatisfied": "For the sample input (tree = [3,9,20,null,null,15,7]), follow your code with those values. Expected output: [\n  [\n    3\n  ],\n  [\n    9,\n    20\n  ],\n  [\n    15,\n    7\n  ]\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "BFS queue",
      "Level by level"
    ]
  },
  "bc-104-invert-binary-tree": {
    "summary": "Sheet #104 — Invert Binary Tree. Invert a binary tree. Your `invertTree` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Swap children; DFS post.",
    "howExamplesAreSatisfied": "For the sample input (root = [4,2,7,1,3,6,9]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Swap children",
      "DFS post"
    ]
  },
  "bc-105-minimum-cost-tree-from-leaf-values": {
    "summary": "Sheet #105 — Minimum Cost Tree From Leaf Values. Minimum cost tree from leaf values. Your `mctFromLeafValues` solution follows the **Monotonic stack** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Monotonic stack** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Monotonic stack; Multiply peaks.",
    "howExamplesAreSatisfied": "For the sample input (tree = [6,2,4]), follow your code with those values. Expected output: 12.",
    "keyIdeas": [
      "Pattern: Monotonic stack",
      "Time: O(n²)",
      "Space: O(1)",
      "Monotonic stack",
      "Multiply peaks"
    ]
  },
  "bc-106-binary-tree-zigzag-level-order-traversal": {
    "summary": "Sheet #106 — Binary Tree Zigzag Level Order Traversal. Zigzag level order traversal. Your `zigzagLevelOrder` solution follows the **Two Pointers + BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.\n\nYou enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    "howExamplesAreSatisfied": "For the sample input (tree = [3,9,20,null,null,15,7]), follow your code with those values. Expected output: [\n  [\n    3\n  ],\n  [\n    20,\n    9\n  ],\n  [\n    15,\n    7\n  ]\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + BFS",
      "Time: O(m×n)",
      "Space: O(m×n)",
      "BFS alternate",
      "Reverse every other"
    ]
  },
  "bc-107-maximum-depth-of-binary-tree": {
    "summary": "Sheet #107 — Maximum Depth of Binary Tree. Maximum depth of binary tree. Your `maxDepth` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DFS depth; 1 + max child.",
    "howExamplesAreSatisfied": "For the sample input (root = [3,9,20,null,null,15,7]), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS depth",
      "1 + max child"
    ]
  },
  "bc-108-sum-of-left-leaves": {
    "summary": "Sheet #108 — Sum of Left Leaves. Sum of left leaves in binary tree. Your `sumOfLeftLeaves` solution follows the **Two Pointers + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (root = [3,9,20,null,null,15,7]), follow your code with those values. Expected output: 24.",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "DFS left flag",
      "Add left leaves"
    ]
  },
  "bc-109-binary-tree-right-side-view": {
    "summary": "Sheet #109 — Binary Tree Right Side View. Right side view of binary tree. Your `rightSideView` solution follows the **Two Pointers + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (tree = [1,2,3,null,5,null,4]), follow your code with those values. Expected output: [\n  1,\n  3,\n  4\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "BFS last per level",
      "Or DFS right first"
    ]
  },
  "bc-110-path-sum-ii": {
    "summary": "Sheet #110 — Path Sum II. All root-to-leaf paths with target sum. Your `pathSum` solution follows the **Two Pointers + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (tree = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22), follow your code with those values. Expected output: [\n  [\n    5,\n    4,\n    11,\n    2\n  ]\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "DFS path",
      "Collect at leaf"
    ]
  },
  "bc-111-path-sum-iii": {
    "summary": "Sheet #111 — Path Sum III. Number of paths with given sum (any direction down). Your `pathSum` solution follows the **Two Pointers + Hash Map + Prefix Sum + DFS / Backtracking + Kadane's Algorithm** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map + Prefix Sum + DFS / Backtracking + Kadane's Algorithm",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix sum map",
      "DFS accumulate"
    ]
  },
  "bc-112-lowest-common-ancestor-of-a-binary-search-tree": {
    "summary": "Sheet #112 — Lowest Common Ancestor of a Binary Search Tree. Lowest common ancestor in BST. Your `lowestCommonAncestor` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "In a binary search tree, every node partitions the key space: everything in the left subtree is smaller, everything in the right subtree is larger. That ordering means there is only one plausible path from the root to any target value—you never need to search both sides.\n\nYour recursion visits the current node first. If the node is missing or its value equals the target, you stop and return that node (`null` means not found; a matching node is returned as the subtree root LeetCode expects). If the target is smaller you recurse left; otherwise you recurse right. Each call eliminates an entire subtree, so the walk is efficient and easy to reason about.",
    "howExamplesAreSatisfied": "For the sample input (tree = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Compare with p,q",
      "Go left or right"
    ]
  },
  "bc-113-closest-binary-search-tree-value-ii": {
    "summary": "Sheet #113 — Closest Binary Search Tree Value II. K closest BST values to target. Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (root = [4,2,5,1,3], target = 3.714286, k = 4), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  4\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Inorder walk",
      "Window of k"
    ]
  },
  "bc-114-trim-a-binary-search-tree": {
    "summary": "Sheet #114 — Trim a Binary Search Tree. Trim BST to [low, high]. Your `trimBST` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DFS prune; Reparent.",
    "howExamplesAreSatisfied": "For the sample input (root = [1,0,2], low = 1, high = 2), follow your code with those values. Expected output: [\n  1,\n  2\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS prune",
      "Reparent"
    ]
  },
  "bc-115-search-in-a-binary-search-tree": {
    "summary": "Sheet #115 — Search in a Binary Search Tree. You are given the root of a BST and an integer `val`; return the node whose value equals `val` (the whole subtree rooted there), or `null` if it does not exist. Your `searchBST` is the standard recursive BST lookup: compare at the current node, then go left or right using the BST ordering rule.",
    "whyItWorks": "A BST stores smaller keys in the left subtree and larger keys in the right subtree. That property means there is at most one valid search path from the root to any value—you never explore both sides at the same level.\n\nYour base case handles both outcomes cleanly: if `root` is `null`, the value is absent; if `root.val === val`, you found the node and return it (LeetCode wants that node as the answer subtree). Otherwise you compare `val` with `root.val` and recurse only into the left child when the target is smaller, or the right child when it is larger. Each recursive call works on a strictly smaller subtree, so the search stops after at most h steps where h is the tree height.",
    "howExamplesAreSatisfied": "For `root = [4,2,7,1,3]` and `val = 2`: start at 4. Since 2 < 4, recurse into the left child (2). At node 2, `root.val === val`, so return that node—the subtree `[2,1,3]`. For `val = 5` you would go right from 4 to 7, then right again into an empty child and return `null`.",
    "keyIdeas": [
      "BST ordering cuts the search space each level",
      "Base case: null (missing) or val match (found)",
      "Time O(h), space O(h) recursion depth",
      "Iterative while-loop variant is equivalent"
    ]
  },
  "bc-116-queue-reconstruction-by-height": {
    "summary": "Sheet #116 — Queue Reconstruction by Height. Queue reconstruction by height. Your `reconstructQueue` solution follows the **BFS + Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.\n\nYou enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    "howExamplesAreSatisfied": "For the sample input (people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]), follow your code with those values. Expected output: [\n  [\n    5,\n    0\n  ],\n  [\n    7,\n    0\n  ],\n  [\n    5,\n    2\n  ],\n  [\n    6,\n    1\n  ],\n  [\n    4,\n    4\n  ],\n  [\n    7,\n    1\n  ]\n].",
    "keyIdeas": [
      "Pattern: BFS + Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort h desc p asc",
      "Insert by p"
    ]
  },
  "bc-117-binary-tree-pruning": {
    "summary": "Sheet #117 — Binary Tree Pruning. Prune subtree with no 1 in binary tree. Your `pruneTree` solution follows the **Two Pointers + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (root = [1,null,0,0,1]), follow your code with those values. Expected output: [\n  1,\n  null,\n  1\n].",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Postorder",
      "Null if sum zero"
    ]
  },
  "bc-118-balance-a-binary-search-tree": {
    "summary": "Sheet #118 — Balance a Binary Search Tree. Balance BST (return sorted values). Your `balanceBST` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (root = [1,null,2,null,3]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: [\n  1,\n  2,\n  3\n].",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Inorder sorted",
      "Rebuild middle root"
    ]
  },
  "bc-119-balanced-binary-tree": {
    "summary": "Sheet #119 — Balanced Binary Tree. Check if binary tree is height-balanced. Your `isBalanced` solution follows the **Two Pointers + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (root = [3,9,20,null,null,15,7]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "DFS height",
      "Balance flag"
    ]
  },
  "bc-120-implement-trie-prefix-tree": {
    "summary": "Sheet #120 — Implement Trie (Prefix Tree). Implement Trie prefix tree. Your `Trie` solution follows the **Prefix Sum** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Prefix sums precompute cumulative totals so any range sum is a subtraction of two prefix values. Building the prefix array once makes each query O(1).\n\nFor 2D grids the same idea extends with inclusion–exclusion on a padded prefix table.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]), follow your code with those values. Expected output: false.",
    "keyIdeas": [
      "Pattern: Prefix Sum",
      "Time: O(m×n) build, O(1) query",
      "Space: O(m×n)",
      "Node children map",
      "End flag"
    ]
  },
  "bc-121-design-add-and-search-words-data-structure": {
    "summary": "Sheet #121 — Design Add and Search Words Data Structure. Add and search word with dots wildcard. Your `WordDictionary` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]), follow your code with those values. Expected output: false.",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "Trie + DFS dot",
      "Backtrack wildcard"
    ]
  },
  "bc-122-word-search-ii": {
    "summary": "Sheet #122 — Word Search II. Find all words from the dictionary that can be formed on the board. Your `findWords` solution follows the **Hash Set + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]), follow your code with those values. Expected output: [\n  \"oath\",\n  \"eat\"\n].",
    "keyIdeas": [
      "Pattern: Hash Set + DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(n)",
      "Trie of words",
      "DFS with pruning"
    ]
  },
  "bc-123-redundant-connection": {
    "summary": "Sheet #123 — Redundant Connection. Find redundant edge that creates a cycle. Your `solve` solution follows the **Union-find** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Union-find** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Union-find; First extra edge.",
    "howExamplesAreSatisfied": "For the sample input (edges = [[1,2],[1,3],[2,3]]), follow your code with those values. Expected output: [\n  2,\n  3\n].",
    "keyIdeas": [
      "Pattern: Union-find",
      "Time: O(n)",
      "Space: O(1)",
      "Union-find",
      "First extra edge"
    ]
  },
  "bc-124-accounts-merge": {
    "summary": "Sheet #124 — Accounts Merge. Accounts merge by shared email. Your `accountsMerge` solution follows the **Hash Map + Hash Set + DFS / Backtracking + Sorting + Merge Pattern** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (accounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  [\n    \"John\",\n    \"j@d.com\",\n    \"j@d2.com\"\n  ],\n  [\n    \"John\",\n    \"jn@d.com\"\n  ],\n  [\n    \"Mary\",\n    \"mary@mail.com\"\n  ]\n].",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + DFS / Backtracking + Sorting + Merge Pattern",
      "Time: O(n log n)",
      "Space: O(n)",
      "Union-find emails",
      "Group by root"
    ]
  },
  "bc-125-range-sum-query-mutable": {
    "summary": "Sheet #125 — Range Sum Query Mutable. Range sum query mutable (segment tree simplified). Your `NumArray` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,3,5], sumQueries = [[0,2],[1,2],[0,2]], updates = [[1,2]]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: [\n  8,\n  7,\n  8\n].",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Prefix diff array",
      "Point update"
    ]
  },
  "bc-126-longest-increasing-subsequence-ii": {
    "summary": "Sheet #126 — Longest Increasing Subsequence II. Longest increasing subsequence with patience sorting. Your `lengthOfLIS` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,10,4,3,8,9]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search tails",
      "Track length"
    ]
  },
  "bc-127-rotting-oranges": {
    "summary": "Sheet #127 — Rotting Oranges. Minutes until all oranges rot. Your `orangesRotting` solution follows the **BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.\n\nYou enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[2,1,1],[1,1,0],[0,1,1]]), follow your code with those values. Expected output: 0.",
    "keyIdeas": [
      "Pattern: BFS",
      "Time: O(m×n)",
      "Space: O(m×n)",
      "Multi-source BFS",
      "Track fresh count"
    ]
  },
  "bc-128-word-ladder": {
    "summary": "Sheet #128 — Word Ladder. Word ladder shortest transformation length. Your `ladderLength` solution follows the **Hash Map + Hash Set + BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 5.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + BFS",
      "Time: O(n)",
      "Space: O(n)",
      "BFS from begin",
      "Wildcard neighbors"
    ]
  },
  "bc-129-number-of-provinces": {
    "summary": "Sheet #129 — Number of Provinces. Number of connected provinces. Your `findCircleNum` solution follows the **Hash Map + Hash Set + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (isConnected = [[1,1,0],[1,1,0],[0,0,1]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "Union-find or DFS",
      "Merge adjacency"
    ]
  },
  "bc-130-number-of-enclaves": {
    "summary": "Sheet #130 — Number of Enclaves. Count land enclaves surrounded by water. Your `numEnclaves` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]), follow your code with those values. Expected output: 0.",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "DFS from borders",
      "Mark reachable"
    ]
  },
  "bc-131-detect-cycle-in-an-undirected-graph": {
    "summary": "Sheet #131 — Detect Cycle in an Undirected Graph. Detect cycle in undirected graph. Your `solve` solution follows the **Union-find** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Union-find** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Union-find; Or DFS parent.",
    "howExamplesAreSatisfied": "For the sample input (n = 3, edges = [[0,1],[1,2],[2,0]]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Union-find",
      "Time: O(n)",
      "Space: O(1)",
      "Union-find",
      "Or DFS parent"
    ]
  },
  "bc-132-detect-cycle-in-a-directed-graph": {
    "summary": "Sheet #132 — Detect Cycle in a Directed Graph. Detect cycle in directed graph. Your `solve` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (n = 2, edges = [[0,1],[1,0]]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "DFS three-color",
      "Back edge"
    ]
  },
  "bc-133-course-schedule": {
    "summary": "Sheet #133 — Course Schedule. Can finish all courses? (cycle check). Your `canFinish` solution follows the **Hash Map + BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (numCourses = 2, prerequisites = [[1,0]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: true.",
    "keyIdeas": [
      "Pattern: Hash Map + BFS",
      "Time: O(n)",
      "Space: O(n)",
      "Topological Kahn",
      "Indegree count"
    ]
  },
  "bc-134-course-schedule-ii": {
    "summary": "Sheet #134 — Course Schedule II. Course schedule II: topological order. Your `findOrder` solution follows the **Hash Map + BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  0,\n  1,\n  2,\n  3\n].",
    "keyIdeas": [
      "Pattern: Hash Map + BFS",
      "Time: O(n)",
      "Space: O(n)",
      "Kahn BFS",
      "Return order"
    ]
  },
  "bc-135-find-eventual-safe-states": {
    "summary": "Sheet #135 — Find Eventual Safe States. Find all eventual safe states. Your `eventualSafeNodes` solution follows the **DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (n = 7, edges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]), follow your code with those values. Expected output: [].",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "Reverse graph",
      "Nodes with outdegree 0"
    ]
  },
  "bc-136-alien-dictionary": {
    "summary": "Sheet #136 — Alien Dictionary. Alien dictionary order of characters. Your `solve` solution follows the **Hash Map + Hash Set** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: alienOrder.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "Topological sort",
      "Build graph from words"
    ]
  },
  "bc-137-network-delay-time": {
    "summary": "Sheet #137 — Network Delay Time. Network delay time (Dijkstra). Your `networkDelayTime` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Min heap relax; Max distance.",
    "howExamplesAreSatisfied": "For the sample input (times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Min heap relax",
      "Max distance"
    ]
  },
  "bc-138-shortest-path-in-binary-matrix": {
    "summary": "Sheet #138 — Shortest Path in Binary Matrix. Shortest path in binary matrix. Your `shortestPathBinaryMatrix` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: 8-dir BFS; Avoid 1 cells.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[0,1],[1,0]]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "8-dir BFS",
      "Avoid 1 cells"
    ]
  },
  "bc-139-path-with-minimum-effort": {
    "summary": "Sheet #139 — Path With Minimum Effort. Minimum effort path in heights grid. Your `minimumEffortPath` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Dijkstra on effort; Max step diff.",
    "howExamplesAreSatisfied": "For the sample input (heights = [[1,2,2],[3,8,2],[5,3,5]]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Dijkstra on effort",
      "Max step diff"
    ]
  },
  "bc-140-cheapest-flights-within-k-stops": {
    "summary": "Sheet #140 — Cheapest Flights Within K Stops. Cheapest flights within k stops. Your `findCheapestPrice` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Bellman-Ford k+1; Relax edges.",
    "howExamplesAreSatisfied": "For the sample input (n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1), follow your code with those values. Expected output: 200.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Bellman-Ford k+1",
      "Relax edges"
    ]
  },
  "bc-141-min-cost-to-connect-all-points": {
    "summary": "Sheet #141 — Min Cost to Connect All Points. Min cost to connect all points (MST). Your `minCostConnectPoints` solution follows the **Two Pointers + Hash Map + Hash Set** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (points = [[0,0],[2,2],[3,10],[5,2],[7,0]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 20.",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "Prim or Kruskal",
      "Manhattan edges"
    ]
  },
  "bc-142-find-critical-and-pseudo-critical-edges-in-minim": {
    "summary": "Sheet #142 — Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree. Find critical and pseudo-critical edges in MST. Your `findCriticalAndPseudoCriticalEdges` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]), follow your code with those values. Expected output: [\n  [],\n  [\n    0,\n    1,\n    2,\n    3\n  ]\n].",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Kruskal with special edges",
      "Compare MST weight"
    ]
  },
  "bc-143-connecting-cities-with-minimum-cost": {
    "summary": "Sheet #143 — Connecting Cities With Minimum Cost. Connecting cities with minimum cost (MST). Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Kruskal union-find",
      "Sort edges"
    ]
  },
  "bc-144-course-schedule-iv": {
    "summary": "Sheet #144 — Course Schedule IV. Course schedule IV: prerequisite queries. Your `checkIfPrerequisite` solution follows the **Floyd or reachability** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Floyd or reachability** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Floyd or reachability; DFS memo.",
    "howExamplesAreSatisfied": "For the sample input (numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]), follow your code with those values. Expected output: [\n  true,\n  false\n].",
    "keyIdeas": [
      "Pattern: Floyd or reachability",
      "Time: O(n²)",
      "Space: O(1)",
      "Floyd or reachability",
      "DFS memo"
    ]
  },
  "bc-145-find-the-city-with-the-smallest-number-of-neighb": {
    "summary": "Sheet #145 — Find the City With the Smallest Number of Neighbors at a.... City with smallest reachable count within threshold. Your `solve` solution follows the **Floyd distances** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Floyd distances** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Floyd distances; Count neighbors.",
    "howExamplesAreSatisfied": "For the sample input (n = 4, edges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]], distanceThreshold = 4), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Floyd distances",
      "Time: O(n²)",
      "Space: O(1)",
      "Floyd distances",
      "Count neighbors"
    ]
  },
  "bc-146-number-of-ways-to-arrive-at-destination": {
    "summary": "Sheet #146 — Number of Ways to Arrive at Destination. Number of ways to arrive at destination mod 1e9+7. Your `countPaths` solution follows the **Dijkstra + count paths** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Dijkstra + count paths** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Dijkstra + count paths; Same shortest dist.",
    "howExamplesAreSatisfied": "For the sample input (n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]], time = 7), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Dijkstra + count paths",
      "Time: O(n²)",
      "Space: O(1)",
      "Dijkstra + count paths",
      "Same shortest dist"
    ]
  },
  "bc-147-non-overlapping-intervals": {
    "summary": "Sheet #147 — Non-overlapping Intervals. Minimum intervals to remove for non-overlap. Your `eraseOverlapIntervals` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (intervals = [[1,2],[2,3],[3,4],[1,3]]), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by end",
      "Greedy keep"
    ]
  },
  "bc-148-minimum-platforms": {
    "summary": "Sheet #148 — Minimum Platforms. Minimum platforms for train arrivals/departures. Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (arrivals = [900,940,950], departures = [910,1200,1120]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort events",
      "Sweep line"
    ]
  },
  "bc-149-maximize-sum-of-array-after-k-negations": {
    "summary": "Sheet #149 — Maximize Sum Of Array After K Negations. Maximize array sum after k negations. Your `largestSumAfterKNegations` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,2,3], k = 1), follow your code with those values. Expected output: 5.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort abs values",
      "Flip smallest"
    ]
  },
  "bc-150-assign-mice-to-holes": {
    "summary": "Sheet #150 — Assign Mice to Holes. Assign mice to holes: minimum time. Your `solve` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (mice = [1,4], holes = [4,-4,2], k = 2), follow your code with those values. Expected output: 5.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort both",
      "Match order"
    ]
  },
  "bc-151-maximum-product-of-three-numbers": {
    "summary": "Sheet #151 — Maximum Product of Three Numbers. Maximum product of three numbers. Your `maximumProduct` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,4]), follow your code with those values. Expected output: 24.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort top values",
      "Check two negatives"
    ]
  },
  "bc-152-bulb-switcher": {
    "summary": "Sheet #152 — Bulb Switcher. Bulb switcher: bulbs on after n rounds. Your `bulbSwitch` solution follows the **Only perfect squares on** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Only perfect squares on** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Only perfect squares on; Count sqrt(n).",
    "howExamplesAreSatisfied": "For the sample input (n = 3), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Only perfect squares on",
      "Time: O(n)",
      "Space: O(1)",
      "Only perfect squares on",
      "Count sqrt(n)"
    ]
  },
  "bc-153-candy": {
    "summary": "Sheet #153 — Candy. Distribute candies to children with ratings. Your `candy` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Two passes; Local then global.",
    "howExamplesAreSatisfied": "For the sample input (ratings = [1,0,2]), follow your code with those values. Expected output: candy.",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Two passes",
      "Local then global"
    ]
  },
  "bc-154-maximum-swap": {
    "summary": "Sheet #154 — Maximum Swap. Maximum swap once on num string. Your `maximumSwap` solution follows the **Find max suffix** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Find max suffix** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Find max suffix; Swap first smaller.",
    "howExamplesAreSatisfied": "For the sample input (num = 2736), follow your code with those values. Expected output: 7236.",
    "keyIdeas": [
      "Pattern: Find max suffix",
      "Time: O(n²)",
      "Space: O(1)",
      "Find max suffix",
      "Swap first smaller"
    ]
  },
  "bc-155-climbing-stairs": {
    "summary": "Sheet #155 — Climbing Stairs. Climbing stairs: ways to reach top. Your `climbStairs` solution follows the **Fibonacci DP** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Fibonacci DP** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Fibonacci DP; Sum last two.",
    "howExamplesAreSatisfied": "For the sample input (n = 3), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Fibonacci DP",
      "Time: O(n)",
      "Space: O(1)",
      "Fibonacci DP",
      "Sum last two"
    ]
  },
  "bc-156-decode-ways": {
    "summary": "Sheet #156 — Decode Ways. Count ways to decode a digit string. Your `numDecodings` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (s = \"12\"), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n)",
      "Space: O(1)",
      "DP prev counts",
      "Handle 0 and 10-26"
    ]
  },
  "bc-157-frog-jump": {
    "summary": "Sheet #157 — Frog Jump. Frog jump: can cross stones? Your `canCross` solution follows the **Hash Map + Hash Set + DFS / Backtracking** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (stones = [0,1,3,5,6,8,12,17,21,22,26,34]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: false.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "DFS reachable jumps",
      "Set positions"
    ]
  },
  "bc-158-coin-change": {
    "summary": "Sheet #158 — Coin Change. Fewest coins to make amount. Your `coinChange` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (coins = [1,2,5], amount = 11), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP min coins",
      "Iterate coins"
    ]
  },
  "bc-159-minimum-jumps-to-reach-home": {
    "summary": "Sheet #159 — Minimum Jumps to Reach Home. Minimum jumps to reach home with restrictions. Your `minimumJumps` solution follows the **Hash Map + Hash Set + BFS** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (forbidden = [14,4,18,1,15], a = 11, b = 4, x = 11), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + BFS",
      "Time: O(n)",
      "Space: O(n)",
      "BFS states",
      "Track forbidden"
    ]
  },
  "bc-160-best-time-to-buy-and-sell-stock": {
    "summary": "Sheet #160 — Best Time to Buy and Sell Stock. Best time to buy and sell stock once. Your `maxProfit` solution follows the **Track min price** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Track min price** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Track min price; Max profit.",
    "howExamplesAreSatisfied": "For the sample input (prices = [7,1,5,3,6,4]), follow your code with those values. Expected output: 5.",
    "keyIdeas": [
      "Pattern: Track min price",
      "Time: O(n)",
      "Space: O(1)",
      "Track min price",
      "Max profit"
    ]
  },
  "bc-161-best-time-to-buy-and-sell-stock-ii": {
    "summary": "Sheet #161 — Best Time to Buy and Sell Stock II. Max profit with unlimited transactions. Your `maxProfit` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (prices = [7,1,5,3,6,4]), follow your code with those values. Expected output: 7.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n)",
      "Space: O(1)",
      "Greedy rises",
      "Sum positive diffs"
    ]
  },
  "bc-162-best-time-to-buy-and-sell-stock-iii": {
    "summary": "Sheet #162 — Best Time to Buy and Sell Stock III. Max profit with at most two transactions. Your `maxProfit` solution follows the **DP buy/sell x2** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **DP buy/sell x2** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DP buy/sell x2; Track states.",
    "howExamplesAreSatisfied": "For the sample input (prices = [3,3,5,0,0,3,1,4]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: DP buy/sell x2",
      "Time: O(n)",
      "Space: O(1)",
      "DP buy/sell x2",
      "Track states"
    ]
  },
  "bc-163-best-time-to-buy-and-sell-stock-iv": {
    "summary": "Sheet #163 — Best Time to Buy and Sell Stock IV. Max profit with at most k transactions. Your `maxProfit` solution follows the **DP day x k** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **DP day x k** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DP day x k; Buy/sell states.",
    "howExamplesAreSatisfied": "For the sample input (k = 2, prices = [2,4,1]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: DP day x k",
      "Time: O(n²)",
      "Space: O(1)",
      "DP day x k",
      "Buy/sell states"
    ]
  },
  "bc-164-best-time-to-buy-and-sell-stock-with-cooldown": {
    "summary": "Sheet #164 — Best Time to Buy and Sell Stock with Cooldown. Max profit with cooldown after sell. Your `maxProfit` solution follows the **DP hold/sold/cool** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **DP hold/sold/cool** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DP hold/sold/cool; State machine.",
    "howExamplesAreSatisfied": "For the sample input (prices = [1,2,3,0,2]), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: DP hold/sold/cool",
      "Time: O(n)",
      "Space: O(1)",
      "DP hold/sold/cool",
      "State machine"
    ]
  },
  "bc-165-best-time-to-buy-and-sell-stock-with-transaction": {
    "summary": "Sheet #165 — Best Time to Buy and Sell Stock with Transaction Fee. Max profit with transaction fee. Your `maxProfit` solution follows the **DP cash/hold** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **DP cash/hold** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DP cash/hold; Pay fee on sell.",
    "howExamplesAreSatisfied": "For the sample input (prices = [1,3,2,8,4,9], fee = 2), follow your code with those values. Expected output: 8.",
    "keyIdeas": [
      "Pattern: DP cash/hold",
      "Time: O(n)",
      "Space: O(1)",
      "DP cash/hold",
      "Pay fee on sell"
    ]
  },
  "bc-166-partition-equal-subset-sum": {
    "summary": "Sheet #166 — Partition Equal Subset Sum. Can partition nums into equal sum subsets? Your `canPartition` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,5,11,5]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "0/1 knapsack",
      "Subset sum DP"
    ]
  },
  "bc-167-ones-and-zeroes": {
    "summary": "Sheet #167 — Ones and Zeroes. Max subset size with m zeros and n ones in binary strings. Your `findMaxForm` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (strs = [\"10\",\"0011\",\"1\",\"0\"], m = 1, n = 1), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "0/1 knapsack 2D",
      "DP count"
    ]
  },
  "bc-168-coin-change-ii": {
    "summary": "Sheet #168 — Coin Change II. Count coin change combinations for amount. Your `change` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (amount = 5, coins = [1,2,5]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Unbounded knapsack",
      "DP ways"
    ]
  },
  "bc-169-last-stone-weight-ii": {
    "summary": "Sheet #169 — Last Stone Weight II. Last stone weight II after smashing. Your `lastStoneWeightII` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (stones = [2,7,4,1,8,1]), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Partition minimize diff",
      "Subset sum"
    ]
  },
  "bc-170-longest-common-subsequence": {
    "summary": "Sheet #170 — Longest Common Subsequence. Length of longest common subsequence. Your `longestCommonSubsequence` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (text1 = \"abcde\", text2 = \"ace\"), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "2D DP",
      "Match chars"
    ]
  },
  "bc-171-edit-distance": {
    "summary": "Sheet #171 — Edit Distance. Minimum edit distance between two strings. Your `minDistance` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (word1 = \"horse\", word2 = \"ros\"), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP insert/delete/replace",
      "2D table"
    ]
  },
  "bc-172-longest-palindromic-subsequence": {
    "summary": "Sheet #172 — Longest Palindromic Subsequence. Longest palindromic subsequence length. Your `longestPalindromeSubseq` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (s = \"bbbab\"), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP on intervals",
      "Match ends"
    ]
  },
  "bc-173-minimum-insertion-steps-to-make-a-string-palindr": {
    "summary": "Sheet #173 — Minimum Insertion Steps to Make a String Palindrome. Minimum insertions to make string palindrome. Your `minInsertions` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (s = \"zzazz\"), follow your code with those values. Expected output: 0.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "n - LPS",
      "Complement LCS"
    ]
  },
  "bc-174-longest-increasing-subsequence": {
    "summary": "Sheet #174 — Longest Increasing Subsequence. Length of longest increasing subsequence. Your `lengthOfLIS` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (nums = [10,9,2,5,3,7,101,18]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Patience sorting",
      "Binary search"
    ]
  },
  "bc-175-largest-divisible-subset": {
    "summary": "Sheet #175 — Largest Divisible Subset. Size of largest divisible subset. Your `largestDivisibleSubset` solution follows the **Sorting + Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Sorting + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort + DP chain",
      "Prev pointer"
    ]
  },
  "bc-176-longest-string-chain": {
    "summary": "Sheet #176 — Longest String Chain. Longest string chain by adding one char. Your `longestStrChain` solution follows the **Hash Map + Sorting + Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (words = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Hash Map + Sorting + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(n)",
      "Sort by length",
      "DP predecessor"
    ]
  },
  "bc-177-minimum-cost-to-cut-a-stick": {
    "summary": "Sheet #177 — Minimum Cost to Cut a Stick. Minimum cost to cut a stick. Your `minCost` solution follows the **Sorting + Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (n = 7, cuts = [1,3,4,5]), follow your code with those values. Expected output: 16.",
    "keyIdeas": [
      "Pattern: Sorting + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Interval DP",
      "Try cut positions"
    ]
  },
  "bc-178-burst-balloons": {
    "summary": "Sheet #178 — Burst Balloons. Burst balloons for maximum coins. Your `maxCoins` solution follows the **Two Pointers + Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (nums = [3,1,5,8]), follow your code with those values. Expected output: 167.",
    "keyIdeas": [
      "Pattern: Two Pointers + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Interval DP",
      "Pick last burst"
    ]
  },
  "bc-179-parsing-a-boolean-expression": {
    "summary": "Sheet #179 — Parsing a Boolean Expression. Evaluate boolean expression with &, |, !. Your `parseBoolExpr` solution follows the **Recursion or stack** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).\n\nYour function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    "howExamplesAreSatisfied": "For the sample input (expression = \"(&(1,0),|(0,1))\"), follow your code with those values. Expected output: parseBoolExpr.",
    "keyIdeas": [
      "Pattern: Recursion or stack",
      "Time: O(n)",
      "Space: O(1)",
      "Recursion or stack",
      "Parse parentheses"
    ]
  },
  "bc-180-palindrome-partitioning-ii": {
    "summary": "Sheet #180 — Palindrome Partitioning II. Minimum cuts for palindrome partitioning. Your `minCut` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (s = \"aab\"), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP cuts + palindrome",
      "Check substrings"
    ]
  },
  "bc-181-shortest-path-visiting-all-nodes": {
    "summary": "Sheet #181 — Shortest Path Visiting All Nodes. Shortest path visiting all nodes in graph. Your `shortestPathLength` solution follows the **Hash Map + Hash Set + BFS + Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (graph = [[1,2],[0,2],[0,1]]), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + BFS + Dynamic Programming",
      "Time: O(n)",
      "Space: O(n)",
      "BFS bitmask state",
      "All nodes visited"
    ]
  },
  "bc-182-unique-paths": {
    "summary": "Sheet #182 — Unique Paths. Count unique paths in m x n grid. Your `uniquePaths` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (m = 3, n = 7), follow your code with those values. Expected output: 28.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP combinatorics",
      "paths[i][j]"
    ]
  },
  "bc-183-unique-paths-ii": {
    "summary": "Sheet #183 — Unique Paths II. Unique paths II with obstacles. Your `uniquePathsWithObstacles` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]), follow your code with those values. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP skip obstacles",
      "Grid traversal"
    ]
  },
  "bc-184-minimum-path-sum": {
    "summary": "Sheet #184 — Minimum Path Sum. Minimum path sum in grid. Your `minPathSum` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[1,3,1],[1,5,1],[4,2,1]]), follow your code with those values. Expected output: 7.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP accumulate",
      "Min from top/left"
    ]
  },
  "bc-185-russian-doll-envelopes": {
    "summary": "Sheet #185 — Russian Doll Envelopes. Maximum envelopes Russian doll nesting. Your `maxEnvelopes` solution follows the **Binary Search + Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (envelopes = [[5,4],[6,4],[6,7],[2,3]]), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Binary Search + Sorting",
      "Time: O(log n)",
      "Space: O(1)",
      "Sort w asc h desc",
      "LIS on heights"
    ]
  },
  "bc-186-find-greatest-common-divisor-of-array": {
    "summary": "Sheet #186 — Find Greatest Common Divisor of Array. Return GCD of all numbers in array. Your `findGCD` solution follows the **Sorting** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.\n\nAfter sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    "howExamplesAreSatisfied": "For the sample input (nums = [12,18,24]), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Euclid reduce",
      "Same as #6"
    ]
  },
  "bc-187-self-dividing-numbers": {
    "summary": "Sheet #187 — Self Dividing Numbers. Return self-dividing numbers in range. Your `selfDividingNumbers` solution follows the **Two Pointers** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Two Pointers** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Digit divides n; Filter range.",
    "howExamplesAreSatisfied": "For the sample input (left = 1, right = 22), follow your code with those values. Expected output: [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n].",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Digit divides n",
      "Filter range"
    ]
  },
  "bc-188-number-of-good-pairs": {
    "summary": "Sheet #188 — Number of Good Pairs. Count good pairs (i,j) where nums[i]==nums[j]. Your `numIdenticalPairs` solution follows the **Frequency map** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Frequency map** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Frequency map; n choose 2.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,1,1,3]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: Frequency map",
      "Time: O(n²)",
      "Space: O(1)",
      "Frequency map",
      "n choose 2"
    ]
  },
  "bc-189-four-divisors": {
    "summary": "Sheet #189 — Four Divisors. Sum of four divisors for each number; -1 if not exactly four. Your `sumFourDivisors` solution follows the **Factor scan** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Factor scan** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Factor scan; Sum divisors.",
    "howExamplesAreSatisfied": "For the sample input (nums = [21,4,7]), follow your code with those values. Expected output: 32.",
    "keyIdeas": [
      "Pattern: Factor scan",
      "Time: O(n²)",
      "Space: O(1)",
      "Factor scan",
      "Sum divisors"
    ]
  },
  "bc-190-day-of-the-week": {
    "summary": "Sheet #190 — Day of the Week. Return day of week for given date. Your `dayOfTheWeek` solution follows the **Zeller or anchor** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Zeller or anchor** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Zeller or anchor; Mod 7.",
    "howExamplesAreSatisfied": "For the sample input (day = 31, month = 8, year = 2019), follow your code with those values. Expected output: \"Saturday\".",
    "keyIdeas": [
      "Pattern: Zeller or anchor",
      "Time: O(n²)",
      "Space: O(1)",
      "Zeller or anchor",
      "Mod 7"
    ]
  },
  "bc-191-subtract-the-product-and-sum-of-digits-of-an-int": {
    "summary": "Sheet #191 — Subtract the Product and Sum of Digits of an Integer. Subtract product and sum of digits. Your `subtractProductAndSum` solution follows the **Parse digits** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Parse digits** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Parse digits; Product - sum.",
    "howExamplesAreSatisfied": "For the sample input (n = 234), follow your code with those values. Expected output: 15.",
    "keyIdeas": [
      "Pattern: Parse digits",
      "Time: O(n)",
      "Space: O(1)",
      "Parse digits",
      "Product - sum"
    ]
  },
  "bc-192-count-of-matches-in-tournament": {
    "summary": "Sheet #192 — Count of Matches in Tournament. Count matches in tournament until one winner. Your `numberOfMatches` solution follows the **n-1 matches** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **n-1 matches** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: n-1 matches; Elimination.",
    "howExamplesAreSatisfied": "For the sample input (n = 7), follow your code with those values. Expected output: 6.",
    "keyIdeas": [
      "Pattern: n-1 matches",
      "Time: O(n)",
      "Space: O(1)",
      "n-1 matches",
      "Elimination"
    ]
  },
  "bc-193-max-consecutive-ones": {
    "summary": "Sheet #193 — Max Consecutive Ones. Find maximum consecutive 1s in binary array. Your `findMaxConsecutiveOnes` solution follows the **Track current streak** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Track current streak** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Track current streak; Reset on 0.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,0,1,1,1]), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Track current streak",
      "Time: O(n)",
      "Space: O(1)",
      "Track current streak",
      "Reset on 0"
    ]
  },
  "bc-194-rectangle-overlap": {
    "summary": "Sheet #194 — Rectangle Overlap. Check if two axis-aligned rectangles overlap. Your `isRectangleOverlap` solution follows the **Interval overlap** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Interval overlap** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Interval overlap; Both axes.",
    "howExamplesAreSatisfied": "For the sample input (rec1 = [0,0,2,2], rec2 = [1,1,3,3]), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Interval overlap",
      "Time: O(n)",
      "Space: O(1)",
      "Interval overlap",
      "Both axes"
    ]
  },
  "bc-195-excel-sheet-column": {
    "summary": "Sheet #195 — Excel Sheet Column. Convert Excel column title to number. Your `solve` solution follows the **Base-26** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Base-26** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Base-26; Accumulate.",
    "howExamplesAreSatisfied": "For the sample input (s = \"AB\"), follow your code with those values. Expected output: 28.",
    "keyIdeas": [
      "Pattern: Base-26",
      "Time: O(n)",
      "Space: O(1)",
      "Base-26",
      "Accumulate"
    ]
  },
  "bc-196-unique-paths": {
    "summary": "Sheet #196 — Unique Paths. Count unique paths in grid (duplicate of 182). Your `uniquePaths` solution follows the **Dynamic Programming** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.\n\nYour table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    "howExamplesAreSatisfied": "For the sample input (m = 3, n = 2), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Combinatorics DP",
      "Right and down"
    ]
  },
  "bc-197-rectangle-area": {
    "summary": "Sheet #197 — Rectangle Area. Compute total area covered by two rectangles. Your `computeArea` solution follows the **Union area formula** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Union area formula** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Union area formula; Overlap subtract.",
    "howExamplesAreSatisfied": "For the sample input (ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2), follow your code with those values. Expected output: 45.",
    "keyIdeas": [
      "Pattern: Union area formula",
      "Time: O(n)",
      "Space: O(1)",
      "Union area formula",
      "Overlap subtract"
    ]
  },
  "bc-198-check-if-array-pairs-are-divisible-by-k": {
    "summary": "Sheet #198 — Check If Array Pairs Are Divisible by k. Check if array pairs are divisible by k. Your `canArrange` solution follows the **Count mod k** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Count mod k** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Count mod k; Complement pairs.",
    "howExamplesAreSatisfied": "For the sample input (arr = [1,2,3,4,5,10,6,7,8,9], k = 5), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: Count mod k",
      "Time: O(n²)",
      "Space: O(1)",
      "Count mod k",
      "Complement pairs"
    ]
  },
  "bc-199-factorial-trailing-zeroes": {
    "summary": "Sheet #199 — Factorial Trailing Zeroes. Count trailing zeroes in n factorial. Your `trailingZeroes` solution follows the **Count factors of 5** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Count factors of 5** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Count factors of 5; Divide by 5.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Count factors of 5",
      "Time: O(n)",
      "Space: O(1)",
      "Count factors of 5",
      "Divide by 5"
    ]
  },
  "bc-200-nth-magical-number": {
    "summary": "Sheet #200 — Nth Magical Number. Find nth magical number (divisible by a or b). Your `nthMagicalNumber` solution follows the **Binary Search** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (n = 1, a = 2, b = 3), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: 2.",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search",
      "Count divisible"
    ]
  },
  "bc-201-permutation-sequence": {
    "summary": "Sheet #201 — Permutation Sequence. Find kth permutation sequence of 1..n. Your `getPermutation` solution follows the **Factorial system** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Factorial system** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Factorial system; Build string.",
    "howExamplesAreSatisfied": "For the sample input (n = 3, k = 3), follow your code with those values. Expected output: \"213\".",
    "keyIdeas": [
      "Pattern: Factorial system",
      "Time: O(n²)",
      "Space: O(1)",
      "Factorial system",
      "Build string"
    ]
  },
  "bc-202-single-number": {
    "summary": "Sheet #202 — Single Number. Find single number that appears once. Your `singleNumber` solution follows the **XOR all** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **XOR all** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: XOR all; Pairs cancel.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,1,2,1,2]), follow your code with those values. Expected output: 4.",
    "keyIdeas": [
      "Pattern: XOR all",
      "Time: O(n)",
      "Space: O(1)",
      "XOR all",
      "Pairs cancel"
    ]
  },
  "bc-203-reverse-bits": {
    "summary": "Sheet #203 — Reverse Bits. Reverse bits of 32-bit integer. Your `reverseBits` solution follows the **Shift and OR** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Shift and OR** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Shift and OR; 32 iterations.",
    "howExamplesAreSatisfied": "For the sample input (n = 43261596), follow your code with those values. Expected output: 964176192.",
    "keyIdeas": [
      "Pattern: Shift and OR",
      "Time: O(n)",
      "Space: O(1)",
      "Shift and OR",
      "32 iterations"
    ]
  },
  "bc-204-single-number-ii": {
    "summary": "Sheet #204 — Single Number II. Find single number appearing once; others thrice. Your `singleNumber` solution follows the **Bit count mod 3** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Bit count mod 3** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Bit count mod 3; Or ones/twos.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,2,3,2]), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: Bit count mod 3",
      "Time: O(n²)",
      "Space: O(1)",
      "Bit count mod 3",
      "Or ones/twos"
    ]
  },
  "bc-205-number-of-1-bits": {
    "summary": "Sheet #205 — Number of 1 Bits. Count number of 1 bits (Hamming weight). Your `hammingWeight` solution follows the **n & n-1** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **n & n-1** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: n & n-1; Or shift.",
    "howExamplesAreSatisfied": "For the sample input (n = 11), follow your code with those values. Expected output: 3.",
    "keyIdeas": [
      "Pattern: n & n-1",
      "Time: O(n)",
      "Space: O(1)",
      "n & n-1",
      "Or shift"
    ]
  },
  "bc-206-factorial-trailing-zeroes": {
    "summary": "Sheet #206 — Factorial Trailing Zeroes. Trailing zeroes in n factorial. Your `trailingZeroes` solution follows the **Count fives** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Count fives** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Count fives; Same as 199.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), follow your code with those values. Expected output: 1.",
    "keyIdeas": [
      "Pattern: Count fives",
      "Time: O(n)",
      "Space: O(1)",
      "Count fives",
      "Same as 199"
    ]
  },
  "bc-207-binary-number-with-alternating-bits": {
    "summary": "Sheet #207 — Binary Number with Alternating Bits. Check if binary number has alternating bits. Your `hasAlternatingBits` solution follows the **XOR shift** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **XOR shift** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: XOR shift; Power of two check.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), follow your code with those values. Expected output: true.",
    "keyIdeas": [
      "Pattern: XOR shift",
      "Time: O(n)",
      "Space: O(1)",
      "XOR shift",
      "Power of two check"
    ]
  },
  "bc-208-number-of-even-and-odd-bits": {
    "summary": "Sheet #208 — Number of Even and Odd Bits. Count even and odd bits in range [0, num]. Your `evenOddBit` solution follows the **DP bit patterns** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **DP bit patterns** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: DP bit patterns; Or iterate.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), follow your code with those values. Expected output: [\n  null,\n  null\n].",
    "keyIdeas": [
      "Pattern: DP bit patterns",
      "Time: O(n)",
      "Space: O(1)",
      "DP bit patterns",
      "Or iterate"
    ]
  },
  "bc-209-find-the-index-of-the-first-occurrence-in-a-stri": {
    "summary": "Sheet #209 — Find the Index of the First Occurrence in a String. Find index of first occurrence of needle in haystack. Your `strStr` solution follows the **Built-in or KMP** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "This problem fits the **Built-in or KMP** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.\n\nKey tactics here: Built-in or KMP; Substring search.",
    "howExamplesAreSatisfied": "For the sample input (haystack = \"sadbutsad\", needle = \"sad\"), follow your code with those values. Expected output: 0.",
    "keyIdeas": [
      "Pattern: Built-in or KMP",
      "Time: O(n)",
      "Space: O(1)",
      "Built-in or KMP",
      "Substring search"
    ]
  },
  "bc-210-repeated-dna-sequences": {
    "summary": "Sheet #210 — Repeated DNA Sequences. Find all repeated 10-letter DNA sequences. Your `findRepeatedDnaSequences` solution follows the **Hash Map + Hash Set + Sliding Window** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).\n\nYour code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    "howExamplesAreSatisfied": "For the sample input (s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"), follow your code with those values. Trace: at each index, check the map for the value you need before storing the current element. Expected output: [\n  \"AAAAACCCCC\",\n  \"CCCCCAAAAA\"\n].",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "Rolling hash or set",
      "Slice substrings"
    ]
  },
  "bc-211-longest-duplicate-substring": {
    "summary": "Sheet #211 — Longest Duplicate Substring. Longest duplicate substring in string. Your `longestDupSubstring` solution follows the **Binary Search + Hash Map + Sliding Window** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.",
    "whyItWorks": "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.\n\nEach step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    "howExamplesAreSatisfied": "For the sample input (s = \"banana\"), follow your code with those values. Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty. Expected output: \"ana\".",
    "keyIdeas": [
      "Pattern: Binary Search + Hash Map + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "Binary search length",
      "Hash seen substrings"
    ]
  }
};
