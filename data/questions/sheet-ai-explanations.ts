/* Auto-generated — run: npm run generate:explanations */
import type { AiExplainCommentary } from "@/types/ai-explain";

export const sheetAiExplanationsByQuestionId: Record<string, AiExplainCommentary> = {
  "bc-001-richest-customer-wealth": {
    "summary": "Sheet #1 — Richest Customer Wealth: for each customer (row), sum all bank balances, then return the largest row sum.",
    "whyItWorks": "Wealth is independent per customer, so you can scan rows one at a time. `reduce` on each row gives that customer's total; tracking `maxWealth` across rows is enough because there is no interaction between customers.",
    "howExamplesAreSatisfied": "For `accounts = [[1,2,3],[3,2,1]]`, row sums are 6 and 6, so the answer is 6. Pattern: row reduce + global max.",
    "keyIdeas": [
      "Row sum = customer wealth",
      "Single pass over all rows",
      "O(m×n) time, O(1) extra space"
    ]
  },
  "bc-002-two-sum": {
    "summary": "Sheet #2 — Two Sum: find two indices whose values add to `target` in one pass using a hash map of seen values.",
    "whyItWorks": "At index `i`, the partner you need is `target - nums[i]`. If that complement was stored earlier, you found the pair. Otherwise store `nums[i] → i` and continue.",
    "howExamplesAreSatisfied": "On `[2,7,11,15]` with target 9: at index 1, value 7 needs 2; index 0 already stored 2 → return `[0,1]`.",
    "keyIdeas": [
      "Map: value → index",
      "Check complement before inserting current",
      "O(n) time"
    ]
  },
  "bc-003-count-negative-numbers-in-a-sorted-matrix": {
    "summary": "Sheet #3 — Count Negative Numbers in a Sorted Matrix: walk from the bottom-left; each step counts negatives or moves right.",
    "whyItWorks": "Rows and columns are sorted non-increasing. From bottom-left, a negative cell means every cell to its right in that row is negative (add `n - col`, move up). A non-negative cell means move right to find negatives.",
    "howExamplesAreSatisfied": "On `[[4,3,2,-1],[3,2,1,-1]]`, the walk counts 2 negatives in O(m+n) time.",
    "keyIdeas": [
      "Start bottom-left",
      "One pointer, O(m+n)",
      "Uses row + column sort order"
    ]
  },
  "bc-004-next-permutation": {
    "summary": "Sheet #4 — Next Permutation: find rightmost ascent, swap with next larger on the right, reverse suffix.",
    "whyItWorks": "Pivot is the first position from the end where order can increase. Swapping with the smallest larger right value gives the minimal increase; reversing the suffix minimizes the rest.",
    "howExamplesAreSatisfied": "`[1,2,3]` → `[1,3,2]`. `[3,2,1]` has no pivot → reverse all → `[1,2,3]`.",
    "keyIdeas": [
      "Find pivot (rightmost ascent)",
      "Swap with next greater on right",
      "Reverse suffix after pivot"
    ]
  },
  "bc-005-linked-lists": {
    "summary": "Sheet #5 — Median of Two Sorted Arrays (your approach): merge both arrays, sort, pick middle value(s).",
    "whyItWorks": "Median is the middle of the combined sorted list. For even length, average the two central elements.",
    "howExamplesAreSatisfied": "`nums1=[1,3], nums2=[2]` → merged `[1,2,3]` → median 2.",
    "keyIdeas": [
      "Brute: concat + sort + middle",
      "Odd n → one middle; even n → average two middles",
      "Interview upgrade: binary search partition O(log(min(m,n)))"
    ]
  },
  "bc-006-find-greatest-common-divisor-of-array": {
    "summary": "Sheet #6 — Find GCD of Array: try divisors up to the minimum element; keep largest dividing min and max.",
    "whyItWorks": "GCD of all numbers equals GCD(min, max). Your loop checks each i dividing both sorted ends.",
    "howExamplesAreSatisfied": "`[2,4,6,8]` → GCD is 2.",
    "keyIdeas": [
      "Sort: min front, max back",
      "GCD(all) = GCD(min, max)",
      "Upgrade: Euclid algorithm"
    ]
  },
  "bc-007-self-dividing-numbers": {
    "summary": "Sheet #7 — Self-Dividing Numbers: each i in [left,right] must be divisible by every non-zero digit.",
    "whyItWorks": "Split digits; if every digit d (d≠0) satisfies i % d === 0, include i.",
    "howExamplesAreSatisfied": "1–9 always qualify. 12: both digits 1 and 2 divide 12.",
    "keyIdeas": [
      "Digit extraction via string",
      "Skip zero digits",
      "O(range × digits)"
    ]
  },
  "bc-008-inversion-of-array-1587115620": {
    "summary": "Inversion of array - 1587115620: Count inversions in the array.",
    "whyItWorks": "This solution uses the Two Pointers pattern. Merge sort count. Split merge.",
    "howExamplesAreSatisfied": "For the sample input (nums = [5,2,6,1]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Merge sort count",
      "Split merge"
    ]
  },
  "bc-009-reverse-pairs": {
    "summary": "Sheet #9 — Reverse Pairs: count i<j with nums[i] > 2×nums[j] using modified merge sort.",
    "whyItWorks": "Before merging halves, two-pointer count pairs across left/right. Recursion handles subarray pairs; merge step handles cross pairs.",
    "howExamplesAreSatisfied": "`[1,3,2,3,1]` → pairs at indices (1,4) and (3,4) → answer 2.",
    "keyIdeas": [
      "Merge sort with count step",
      "Cross pairs before merge",
      "O(n log n)"
    ]
  },
  "bc-010-special-positions-in-a-binary-matrix": {
    "summary": "Sheet #10 — Special Positions: count 1s that are alone in their row AND column.",
    "whyItWorks": "Tally row and column counts of 1s; a cell is special iff it is 1 and both tallies equal 1.",
    "howExamplesAreSatisfied": "Diagonal identity matrix → 3 special positions.",
    "keyIdeas": [
      "Two-pass counting",
      "Row + column tallies",
      "O(m×n)"
    ]
  },
  "bc-011-transpose-matrix": {
    "summary": "Sheet #11 — Transpose Matrix: result[i][j] = matrix[j][i].",
    "whyItWorks": "Swap row/column indices; output size is n×m when input is m×n.",
    "howExamplesAreSatisfied": "`[[1,2,3],[4,5,6]]` → `[[1,4],[2,5],[3,6]]`.",
    "keyIdeas": [
      "Index swap",
      "Allocate n×m grid",
      "O(m×n)"
    ]
  },
  "bc-012-01-matrix": {
    "summary": "Sheet #12 — 01 Matrix: multi-source BFS from all 0 cells for distance to nearest 0.",
    "whyItWorks": "All 0s enqueue at distance 0. BFS layers assign first-seen distance to each 1.",
    "howExamplesAreSatisfied": "Center 1 surrounded by 0s gets distance 1.",
    "keyIdeas": [
      "Multi-source BFS",
      "4 directions",
      "O(m×n)"
    ]
  },
  "bc-013-spiral-matrix": {
    "summary": "Sheet #13 — Spiral Matrix: walk top→right→bottom→left while shrinking boundaries.",
    "whyItWorks": "Four pointers top/bottom/left/right; each side consumes one boundary. Guard before left/up legs when rows or cols exhausted.",
    "howExamplesAreSatisfied": "3×3 → [1,2,3,6,9,8,7,4,5].",
    "keyIdeas": [
      "Four boundaries",
      "Shrink after each side",
      "O(m×n)"
    ]
  },
  "bc-014-pascal-s-triangle": {
    "summary": "Sheet #14 — Pascal's Triangle: each row starts with 1s; interior = sum of two cells above.",
    "whyItWorks": "Binomial recurrence: row[j] = prev[j-1] + prev[j].",
    "howExamplesAreSatisfied": "Row 4 → [1,4,6,4,1] from prior [1,3,3,1].",
    "keyIdeas": [
      "DP on previous row",
      "Edge ones",
      "O(numRows²)"
    ]
  },
  "bc-015-minimum-size-subarray-sum": {
    "summary": "Sheet #15 — Minimum Size Subarray Sum: smallest subarray with sum ≥ target (variable window).",
    "whyItWorks": "Expand right; while sum ≥ target, record length and shrink left. Minimum valid window wins.",
    "howExamplesAreSatisfied": "`[2,3,1,2,4,3]` target 7 → `[4,3]` length 2.",
    "keyIdeas": [
      "Variable sliding window",
      "Expand until valid, shrink while valid",
      "O(n)"
    ]
  },
  "bc-016-running-sum-of-1d-array": {
    "summary": "Sheet #16 — Running Sum: prefix[i] = sum of nums[0..i].",
    "whyItWorks": "Prefix array: each entry adds previous prefix plus current element.",
    "howExamplesAreSatisfied": "`[1,2,3,4]` → `[1,3,6,10]`.",
    "keyIdeas": [
      "Prefix sum",
      "Can do in-place",
      "O(n)"
    ]
  },
  "bc-017-range-sum-query-2d-immutable": {
    "summary": "Sheet #17 — Range Sum Query 2D: build 2D prefix table; rectangle sum in O(1).",
    "whyItWorks": "2D prefix with +1 padding; sumRegion uses inclusion-exclusion on four corners.",
    "howExamplesAreSatisfied": "Inner rectangle query returns sum via prefix corners.",
    "keyIdeas": [
      "2D prefix table",
      "Inclusion-exclusion query",
      "Preprocess O(m×n), query O(1)"
    ]
  },
  "bc-018-maximum-subarray": {
    "summary": "Sheet #18 — Maximum Subarray (Kadane): best sum ending at each index.",
    "whyItWorks": "`currentSum = max(nums[i], nums[i]+currentSum)` — extend or restart. Track global max.",
    "howExamplesAreSatisfied": "Classic array → max subarray sum 6 on segment [4,-1,2,1].",
    "keyIdeas": [
      "Kadane",
      "Extend or restart",
      "O(n)"
    ]
  },
  "bc-019-maximum-sum-circular-subarray": {
    "summary": "Sheet #19 — Maximum Sum Circular Subarray: max(normal Kadane, total − min subarray).",
    "whyItWorks": "Wrap-around max equals total sum minus minimum subarray sum. If all negative, return max Kadane only.",
    "howExamplesAreSatisfied": "`[5,-3,5]` → wrap [5,5] gives 10.",
    "keyIdeas": [
      "Kadane max + min",
      "Circular = total − minSub",
      "All-negative edge case"
    ]
  },
  "bc-020-longest-turbulent-subarray": {
    "summary": "Sheet #20 — Longest Turbulent Subarray: longest alternating up/down comparisons.",
    "whyItWorks": "Track `up` and `down` streak lengths; reset on equal neighbors. Answer is max streak seen.",
    "howExamplesAreSatisfied": "Alternating comparisons extend streak; equal values reset.",
    "keyIdeas": [
      "up/down streak DP",
      "Reset on flat",
      "O(n)"
    ]
  },
  "bc-021-contains-duplicate-ii": {
    "summary": "Sheet #21 — Contains Duplicate II: duplicate within index distance k using sliding set.",
    "whyItWorks": "Set holds window values; duplicate inside window → true. Remove left when size exceeds k.",
    "howExamplesAreSatisfied": "`[1,2,3,1]` k=3 → duplicate 1 within distance 3.",
    "keyIdeas": [
      "Set window size ≤ k",
      "O(n)"
    ]
  },
  "bc-022-number-of-sub-arrays-of-size-k-and-average": {
    "summary": "Sheet #22 — Count subarrays of size k with average ≥ threshold.",
    "whyItWorks": "Fixed window: slide k elements, compare sum/k to threshold.",
    "howExamplesAreSatisfied": "Each length-k window checked once.",
    "keyIdeas": [
      "Fixed window",
      "Sum then average",
      "O(n)"
    ]
  },
  "bc-023-minimum-size-subarray-sum": {
    "summary": "Sheet #23 — Minimum Size Subarray Sum (same pattern as #15).",
    "whyItWorks": "Variable window until sum ≥ target; shrink while valid; track minimum length.",
    "howExamplesAreSatisfied": "target=7, nums=[2,3,1,2,4,3] → answer 2.",
    "keyIdeas": [
      "Same as sheet #15",
      "Variable window",
      "O(n)"
    ]
  },
  "bc-024-longest-substring-without-repeating-characters": {
    "summary": "Sheet #24 — Longest Substring Without Repeating Characters.",
    "whyItWorks": "Expand end; shrink start while char frequency > 1. Track max window length.",
    "howExamplesAreSatisfied": "`abcabcbb` → length 3.",
    "keyIdeas": [
      "Sliding window + freq map",
      "Shrink on duplicate",
      "O(n)"
    ]
  },
  "bc-025-longest-repeating-character-replacement": {
    "summary": "Sheet #25 — Longest Repeating Character Replacement: window valid if len − maxFreq ≤ k.",
    "whyItWorks": "Track char counts and dominant frequency; shrink when too many replacements needed.",
    "howExamplesAreSatisfied": "`AABABBA` k=1 → length 4.",
    "keyIdeas": [
      "maxFreq trick",
      "Valid window rule",
      "O(n)"
    ]
  },
  "bc-026-container-with-most-water": {
    "summary": "Sheet #26 — Container With Most Water: two pointers; move shorter line inward.",
    "whyItWorks": "Area limited by shorter height; only moving shorter side can improve area.",
    "howExamplesAreSatisfied": "Classic heights → max area 49.",
    "keyIdeas": [
      "Two pointers",
      "Move shorter side",
      "O(n)"
    ]
  },
  "bc-027-trapping-rain-water": {
    "summary": "Sheet #27 — Trapping Rain Water: two pointers with leftMax/rightMax.",
    "whyItWorks": "Process shorter side; water += maxSide − height. Update max for that side.",
    "howExamplesAreSatisfied": "Valleys fill to min of surrounding peaks minus bar height.",
    "keyIdeas": [
      "Two pointers",
      "Running maxes",
      "O(n) O(1) space"
    ]
  },
  "bc-028-two-sum-ii-input-array-is-sorted": {
    "summary": "Sheet #28 — Two Sum II: sorted array, two pointers from ends.",
    "whyItWorks": "Sum too small → left++; too big → right--; match → 1-based indices.",
    "howExamplesAreSatisfied": "`[2,7,11,15]` target 9 → `[1,2]`.",
    "keyIdeas": [
      "Sorted two pointers",
      "1-based answer",
      "O(n)"
    ]
  },
  "bc-029-k-diff-pairs-in-an-array": {
    "summary": "Sheet #29 — K-diff Pairs: sort + two pointers; skip duplicate left values on match.",
    "whyItWorks": "Sorted array enables two-pointer scan for difference k. k<0 returns 0.",
    "howExamplesAreSatisfied": "`[3,1,4,1,5]` k=2 → pairs (1,3) and (3,5) → 2.",
    "keyIdeas": [
      "Sort + two pointers",
      "Skip duplicates after match",
      "Hash-set variant is interview-cleaner"
    ]
  },
  "bc-030-find-k-closest-elements": {
    "summary": "Sheet #30 — Find K Closest Elements: shrink window of size k from both ends.",
    "whyItWorks": "While window length > k, drop left or right whichever is farther from x (tie → drop right in your code when left diff ≤ right diff).",
    "howExamplesAreSatisfied": "`[1,2,3,4,5]` k=4 x=3 → drop 5 → `[1,2,3,4]`.",
    "keyIdeas": [
      "Two pointers on sorted array",
      "Shrink to width k",
      "Binary-search window is O(log n) alternative"
    ]
  },
  "bc-031-search-in-rotated-sorted-array": {
    "summary": "Search in Rotated Sorted Array: Search target in rotated sorted array.",
    "whyItWorks": "This solution uses the Binary Search pattern. Binary search. Sorted half.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,5,6,7,0,1,2]\ntarget = 0), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search",
      "Sorted half"
    ]
  },
  "bc-032-remove-duplicates-from-sorted-array": {
    "summary": "Remove Duplicates from Sorted Array: Remove duplicates in-place; return new length.",
    "whyItWorks": "This solution uses the Binary Search pattern. Write pointer. Skip dupes.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,2]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Write pointer",
      "Skip dupes"
    ]
  },
  "bc-033-find-first-and-last-position-of-element-in-sorte": {
    "summary": "Find First and Last Position of Element in Sorted Array: First and last position of target.",
    "whyItWorks": "This solution uses the Binary Search pattern. Binary search bounds. Lower and upper.",
    "howExamplesAreSatisfied": "For the sample input (nums = [5,7,7,8,8,10]\ntarget = 8), the reference solution returns [\n  3,\n  4\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search bounds",
      "Lower and upper"
    ]
  },
  "bc-034-search-a-2d-matrix": {
    "summary": "Search a 2D Matrix: Search target in row-sorted 2D matrix.",
    "whyItWorks": "This solution uses the Binary Search pattern. Binary search flat. Index to cell.",
    "howExamplesAreSatisfied": "For the sample input (nums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search flat",
      "Index to cell"
    ]
  },
  "bc-035-find-peak-element": {
    "summary": "Find Peak Element: Find a peak element index.",
    "whyItWorks": "This solution uses the Binary Search pattern. Binary search slope. Go uphill.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,1]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search slope",
      "Go uphill"
    ]
  },
  "bc-036-single-element-in-a-sorted-array": {
    "summary": "Single Element in a Sorted Array: Single element in sorted array with pairs.",
    "whyItWorks": "This solution uses the Binary Search pattern. Binary search parity. Pair check.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,2,3,3,4,4,8,8]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search parity",
      "Pair check"
    ]
  },
  "bc-037-preimage-size-of-factorial-zeroes-function": {
    "summary": "Preimage Size of Factorial Zeroes Function: Preimage size of factorial trailing zeroes at k.",
    "whyItWorks": "This solution uses the Binary Search pattern. Binary search zeros. Count plateau.",
    "howExamplesAreSatisfied": "For the sample input (k = 5), the reference solution returns 0. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search zeros",
      "Count plateau"
    ]
  },
  "bc-038-check-if-two-arrays-are-equal-or-not": {
    "summary": "Check if Two Arrays Are Equal or Not: Check if two arrays are equal multisets.",
    "whyItWorks": "This solution uses the Sorting pattern. Sort compare. Frequency map.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,2,3]\nb = [1,2,3,2]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort compare",
      "Frequency map"
    ]
  },
  "bc-039-binary-array-sorting": {
    "summary": "Binary Array Sorting: Sort binary array of 0s and 1s.",
    "whyItWorks": "This solution uses the Sorting pattern. Count zeros. Fill array.",
    "howExamplesAreSatisfied": "For the sample input (nums = [0,1,0,1,0]), the reference solution returns [\n  0,\n  0,\n  0,\n  1,\n  1\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Count zeros",
      "Fill array"
    ]
  },
  "bc-040-sort-colors": {
    "summary": "Sort Colors: Sort colors 0,1,2 in-place (Dutch flag).",
    "whyItWorks": "This solution uses the Sorting pattern. Three pointers. Partition.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,0,2,1,1,0]), the reference solution returns [\n  0,\n  0,\n  1,\n  1,\n  2,\n  2\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Three pointers",
      "Partition"
    ]
  },
  "bc-041-kth-largest-element-in-an-array": {
    "summary": "Kth Largest Element in an Array: Find kth largest element.",
    "whyItWorks": "This solution uses the Sorting pattern. Quickselect. Partition.",
    "howExamplesAreSatisfied": "For the sample input (nums = [3,2,1,5,6,4]\ntarget = 2), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Quickselect",
      "Partition"
    ]
  },
  "bc-042-minimum-absolute-difference": {
    "summary": "Minimum Absolute Difference: Minimum absolute difference pairs in sorted array.",
    "whyItWorks": "This solution uses the Sorting pattern. Sort adjacent. Track min diff.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,2,1,3]), the reference solution returns [\n  [\n    1,\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3,\n    4\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort adjacent",
      "Track min diff"
    ]
  },
  "bc-043-k-closest-points-to-origin": {
    "summary": "K Closest Points to Origin: K closest points to origin.",
    "whyItWorks": "This solution uses the Sorting pattern. Sort by dist. Take k.",
    "howExamplesAreSatisfied": "For the sample input (points = [[1,3],[-2,2]]\nk = 1), the reference solution returns [\n  [\n    -2,\n    2\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort by dist",
      "Take k"
    ]
  },
  "bc-044-max-chunks-to-make-sorted": {
    "summary": "Max Chunks To Make Sorted: Max chunks to make sorted array.",
    "whyItWorks": "This solution uses the Sorting pattern. Track max index. Chunk at i.",
    "howExamplesAreSatisfied": "For the sample input (arr = [4,3,2,1,0]), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Track max index",
      "Chunk at i"
    ]
  },
  "bc-045-contiguous-array": {
    "summary": "Contiguous Array: Longest subarray with equal 0s and 1s.",
    "whyItWorks": "This solution uses the Hashing pattern. Prefix as -1/+1. Hash map.",
    "howExamplesAreSatisfied": "For the sample input (nums = [0,1,0]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Prefix as -1/+1",
      "Hash map"
    ]
  },
  "bc-046-longest-consecutive-sequence": {
    "summary": "Longest Consecutive Sequence: Longest consecutive sequence length.",
    "whyItWorks": "This solution uses the Hashing pattern. Hash set. Start chains.",
    "howExamplesAreSatisfied": "For the sample input (nums = [100,4,200,1,3,2]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Hash set",
      "Start chains"
    ]
  },
  "bc-047-subarray-sum-equals-k": {
    "summary": "Subarray Sum Equals K: Count subarrays with sum k.",
    "whyItWorks": "This solution uses the Hashing pattern. Prefix sum map. Count complements.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,1]\ntarget = 2), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Prefix sum map",
      "Count complements"
    ]
  },
  "bc-048-valid-anagram": {
    "summary": "Valid Anagram: Check if t is anagram of s.",
    "whyItWorks": "This solution uses the Hashing pattern. Frequency count. Match letters.",
    "howExamplesAreSatisfied": "For the sample input (s = \"anagram\"\nt = \"nagaram\"), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Frequency count",
      "Match letters"
    ]
  },
  "bc-049-valid-sudoku": {
    "summary": "Valid Sudoku: Validate Sudoku board.",
    "whyItWorks": "This solution uses the Hashing pattern. Row/col/box sets. Skip dots.",
    "howExamplesAreSatisfied": "For the sample input (board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Row/col/box sets",
      "Skip dots"
    ]
  },
  "bc-050-ugly-number-ii": {
    "summary": "Ugly Number II: Nth ugly number (factors 2,3,5).",
    "whyItWorks": "This solution uses the Hashing pattern. Three pointers. Merge streams.",
    "howExamplesAreSatisfied": "For the sample input (n = 10), the reference solution returns 12. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Three pointers",
      "Merge streams"
    ]
  },
  "bc-051-subarray-sum-equals-k": {
    "summary": "Subarray Sum Equals K: Count subarrays with sum exactly k.",
    "whyItWorks": "This solution uses the Hashing pattern. Prefix sum map. Add counts.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,-1,0]\ntarget = 0), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Prefix sum map",
      "Add counts"
    ]
  },
  "bc-052-max-points-on-a-line": {
    "summary": "Max Points on a Line: Maximum points on a line.",
    "whyItWorks": "This solution uses the Hashing pattern. Slope hash. Handle duplicates.",
    "howExamplesAreSatisfied": "For the sample input (points = [[1,1],[2,2],[3,3]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Slope hash",
      "Handle duplicates"
    ]
  },
  "bc-053-palindrome-pairs": {
    "summary": "Palindrome Pairs: Palindrome pairs of words.",
    "whyItWorks": "This solution uses the Hashing pattern. Hash reverse. Check pairs.",
    "howExamplesAreSatisfied": "For the sample input (words = [\"bat\",\"tab\",\"cat\"]), the reference solution returns [\n  [\n    0,\n    1\n  ],\n  [\n    1,\n    0\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Hash reverse",
      "Check pairs"
    ]
  },
  "bc-054-middle-of-the-linked-list": {
    "summary": "Middle of the Linked List: Middle node of linked list (array head).",
    "whyItWorks": "This solution uses the Linked Lists pattern. Slow/fast pointers. Half length.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Slow/fast pointers",
      "Half length"
    ]
  },
  "bc-055-maximum-twin-sum-of-a-linked-list": {
    "summary": "Maximum Twin Sum of a Linked List: Maximum twin sum in linked list.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Find mid. Reverse second half.",
    "howExamplesAreSatisfied": "For the sample input (head = [5,4,2,1]), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Find mid",
      "Reverse second half"
    ]
  },
  "bc-056-merge-two-sorted-lists": {
    "summary": "Merge Two Sorted Lists: Merge two sorted linked lists (arrays).",
    "whyItWorks": "This solution uses the Linked Lists pattern. Two pointers. Append rest.",
    "howExamplesAreSatisfied": "For the sample input (list1 = [1,2,4]\nlist2 = [1,3,4]), the reference solution returns [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Two pointers",
      "Append rest"
    ]
  },
  "bc-057-linked-list-cycle": {
    "summary": "Linked List Cycle: Detect cycle in linked list.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Floyd cycle. Slow/fast.",
    "howExamplesAreSatisfied": "For the sample input (head = [3,2,0,-4]\npos = 1), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Floyd cycle",
      "Slow/fast"
    ]
  },
  "bc-058-reverse-nodes-in-k-group": {
    "summary": "Reverse Nodes in k- Group: Reverse nodes in k-group (array).",
    "whyItWorks": "This solution uses the Linked Lists pattern. Reverse chunks. Handle remainder.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]\nk = 2), the reference solution returns [\n  2,\n  null,\n  4,\n  null,\n  5\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Reverse chunks",
      "Handle remainder"
    ]
  },
  "bc-059-remove-nth-node-from-end-of-list": {
    "summary": "Remove Nth Node From End of List: Remove nth node from end.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Two pointers gap n. Delete node.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]\nn = 2), the reference solution returns [\n  1,\n  2,\n  3,\n  5\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Two pointers gap n",
      "Delete node"
    ]
  },
  "bc-060-linked-list-cycle-ii": {
    "summary": "Linked List Cycle II: Start of cycle in linked list.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Floyd then reset. Meet point.",
    "howExamplesAreSatisfied": "For the sample input (head = [3,2,0,-4]\npos = 1), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Floyd then reset",
      "Meet point"
    ]
  },
  "bc-061-delete-node-in-a-linked-list": {
    "summary": "Delete Node in a Linked List: Delete given node in linked list (array).",
    "whyItWorks": "This solution uses the Linked Lists pattern. Copy next value. Skip node.",
    "howExamplesAreSatisfied": "For the sample input (head = [4,5,1,9]\nnode = 1), the reference solution returns [\n  4,\n  1,\n  9\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Copy next value",
      "Skip node"
    ]
  },
  "bc-062-reverse-linked-list": {
    "summary": "Reverse Linked List: Reverse linked list (array).",
    "whyItWorks": "This solution uses the Linked Lists pattern. Iterative reverse. Three pointers.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]), the reference solution returns [\n  5,\n  4,\n  3,\n  2,\n  1\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Iterative reverse",
      "Three pointers"
    ]
  },
  "bc-063-palindrome-linked": {
    "summary": "Palindrome Linked: Check if linked list is palindrome.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Find mid reverse. Compare halves.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,2,1]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Find mid reverse",
      "Compare halves"
    ]
  },
  "bc-064-remove-linked-list": {
    "summary": "Remove Linked List: Remove all nodes equal to val.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Filter array. Return list.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,6,3,4,5,6]\nval = 6), the reference solution returns [\n  1,\n  2,\n  3,\n  4,\n  5\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Filter array",
      "Return list"
    ]
  },
  "bc-065-convert-binary-number-in-a-linked-list-to-intege": {
    "summary": "Convert Binary Number in a Linked List to Integer: Convert binary linked list to integer.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Accumulate bits. Left shift.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,0,1]), the reference solution returns 5. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Accumulate bits",
      "Left shift"
    ]
  },
  "bc-066-remove-duplicates-from-sorted-list-ii": {
    "summary": "Remove Duplicates from Sorted List II: Remove duplicates from sorted list II.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Skip duplicate runs. Dummy head.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,3,4,4,5]), the reference solution returns [\n  1,\n  2,\n  5\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Skip duplicate runs",
      "Dummy head"
    ]
  },
  "bc-067-reverse-linked-list-ii": {
    "summary": "Reverse Linked List II: Reverse linked list between left and right.",
    "whyItWorks": "This solution uses the Linked Lists pattern. Reverse subrange. 1-based indices.",
    "howExamplesAreSatisfied": "For the sample input (head = [1,2,3,4,5]\nleft = 2\nright = 4), the reference solution returns [\n  1,\n  4,\n  3,\n  2,\n  5\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Reverse subrange",
      "1-based indices"
    ]
  },
  "bc-068-sort-list": {
    "summary": "Sort List: Sort linked list (array merge sort).",
    "whyItWorks": "This solution uses the Linked Lists pattern. Merge sort. Split halves.",
    "howExamplesAreSatisfied": "For the sample input (head = [4,2,1,3]), the reference solution returns [\n  1,\n  2,\n  3,\n  4\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Merge sort",
      "Split halves"
    ]
  },
  "bc-069-implement-stack-using-queues": {
    "summary": "Implement Stack using Queues: Implement stack using queues.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Push to q2. Move elements.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]), the reference solution returns [\n  1\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Push to q2",
      "Move elements"
    ]
  },
  "bc-070-implement-queue-using-stacks": {
    "summary": "Implement Queue using Stacks: Implement queue using stacks.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Two stacks. Amortized O(1).",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]), the reference solution returns [\n  2\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Two stacks",
      "Amortized O(1)"
    ]
  },
  "bc-071-backspace-string-compare": {
    "summary": "Backspace String Compare: Compare strings with backspace (#).",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Stack build. Pop on #.",
    "howExamplesAreSatisfied": "For the sample input (s = \"ab#c\"\nt = \"ad#c\"), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Stack build",
      "Pop on #"
    ]
  },
  "bc-072-baseball-game": {
    "summary": "Baseball Game: Evaluate baseball stack scores.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Stack ops. Apply signs.",
    "howExamplesAreSatisfied": "For the sample input (operations = [\"5\",\"2\",\"C\",\"D\",\"+\"]), the reference solution returns 30. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Stack ops",
      "Apply signs"
    ]
  },
  "bc-073-longest-valid-parentheses": {
    "summary": "Longest Valid Parentheses: Longest valid parentheses length.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Stack indices. Track gaps.",
    "howExamplesAreSatisfied": "For the sample input (s = \")()())\"), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Stack indices",
      "Track gaps"
    ]
  },
  "bc-074-evaluate-reverse-polish-notation": {
    "summary": "Evaluate Reverse Polish Notation: Evaluate Reverse Polish Notation.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Stack operands. Apply operator.",
    "howExamplesAreSatisfied": "For the sample input (tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]), the reference solution returns 9. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Stack operands",
      "Apply operator"
    ]
  },
  "bc-075-daily-temperatures": {
    "summary": "Daily Temperatures: Daily temperatures: days until warmer.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Monotonic stack. Next greater.",
    "howExamplesAreSatisfied": "For the sample input (temperatures = [73,74,75,71,69,72,76,73]), the reference solution returns [\n  1,\n  1,\n  4,\n  2,\n  1,\n  1,\n  0,\n  0\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Monotonic stack",
      "Next greater"
    ]
  },
  "bc-076-largest-rectangle-in-histogram": {
    "summary": "Largest Rectangle in Histogram: Largest rectangle in histogram.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Monotonic stack. Expand bars.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,1,5,6,2,3]), the reference solution returns 10. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Monotonic stack",
      "Expand bars"
    ]
  },
  "bc-077-min-stack": {
    "summary": "Min Stack: Min stack supporting getMin in O(1).",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Aux min stack. Track minimum.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]), the reference solution returns -3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Aux min stack",
      "Track minimum"
    ]
  },
  "bc-078-minimum-remove-to-make-valid-parentheses": {
    "summary": "Minimum Remove to Make Valid Parentheses: Minimum removes to make parentheses valid.",
    "whyItWorks": "This solution uses the Stack & Queue pattern. Stack open indices. Count unmatched.",
    "howExamplesAreSatisfied": "For the sample input (s = \"lee(t(c)o)de)\"), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Stack open indices",
      "Count unmatched"
    ]
  },
  "bc-079-find-median-from-data-stream": {
    "summary": "Find Median from Data Stream: Find median from data stream (simplified).",
    "whyItWorks": "This solution uses the Heap pattern. Two heaps. Balance sizes.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]), the reference solution returns 1.5. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Two heaps",
      "Balance sizes"
    ]
  },
  "bc-080-merge-k-sorted-lists": {
    "summary": "Merge k Sorted Lists: Merge k sorted lists (arrays).",
    "whyItWorks": "This solution uses the Heap pattern. Min heap or divide. Merge pairs.",
    "howExamplesAreSatisfied": "For the sample input (lists = [[1,4,5],[1,3,4],[2,6]]), the reference solution returns [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4,\n  5,\n  6\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Min heap or divide",
      "Merge pairs"
    ]
  },
  "bc-081-find-k-pairs-with-smallest-sums": {
    "summary": "Find K Pairs with Smallest Sums: K pairs with smallest sums from two arrays.",
    "whyItWorks": "This solution uses the Heap pattern. Min heap. Expand pairs.",
    "howExamplesAreSatisfied": "For the sample input (nums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3), the reference solution returns [\n  3,\n  5,\n  7\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Min heap",
      "Expand pairs"
    ]
  },
  "bc-082-meeting-rooms-ii": {
    "summary": "Meeting Rooms II: Meeting rooms II: minimum rooms needed.",
    "whyItWorks": "This solution uses the Heap pattern. Sort by start. Heap of ends.",
    "howExamplesAreSatisfied": "For the sample input (intervals = [[0,30],[5,10],[15,20]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort by start",
      "Heap of ends"
    ]
  },
  "bc-083-top-k-frequent-elements": {
    "summary": "Top K Frequent Elements: Top k frequent elements.",
    "whyItWorks": "This solution uses the Heap pattern. Frequency map. Bucket or heap.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,1,2,2,3]\ntarget = 2), the reference solution returns [\n  1,\n  2\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Frequency map",
      "Bucket or heap"
    ]
  },
  "bc-084-k-closest-points-to-origin": {
    "summary": "K Closest Points to Origin: K closest points to origin.",
    "whyItWorks": "This solution uses the Heap pattern. Sort by distance. Take k.",
    "howExamplesAreSatisfied": "For the sample input (points = [[1,3],[-2,2]]\nk = 1), the reference solution returns [\n  [\n    -2,\n    2\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort by distance",
      "Take k"
    ]
  },
  "bc-085-count-good-numbers": {
    "summary": "Count Good Numbers: Count good numbers of length n.",
    "whyItWorks": "This solution uses the Recursion pattern. Fast pow mod. Alternate 5 and 4.",
    "howExamplesAreSatisfied": "For the sample input (n = 4), the reference solution returns 400. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Fast pow mod",
      "Alternate 5 and 4"
    ]
  },
  "bc-086-permutations": {
    "summary": "Permutations: Return all permutations of nums.",
    "whyItWorks": "This solution uses the Recursion pattern. Backtrack swap. DFS choices.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), the reference solution returns [\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3,\n    2\n  ],\n  [\n    2,\n    1,\n    3\n  ],\n  [\n    2,\n    3,\n    1\n  ],\n  [\n    3,\n    1,\n    2\n  ],\n  [\n    3,\n    2,\n    1\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack swap",
      "DFS choices"
    ]
  },
  "bc-087-permutations-ii": {
    "summary": "Permutations II: Permutations II with duplicates.",
    "whyItWorks": "This solution uses the Recursion pattern. Sort + skip dupes. Used array.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,2]), the reference solution returns [\n  [\n    1,\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    2,\n    1,\n    1\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort + skip dupes",
      "Used array"
    ]
  },
  "bc-088-subsets": {
    "summary": "Subsets: Return all subsets of nums.",
    "whyItWorks": "This solution uses the Recursion pattern. Backtrack include. Power set.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), the reference solution returns [\n  [],\n  [\n    1\n  ],\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack include",
      "Power set"
    ]
  },
  "bc-089-basic-calculator": {
    "summary": "Basic Calculator: Evaluate basic calculator with + - ( ).",
    "whyItWorks": "This solution uses the Recursion pattern. Stack signs. Parse numbers.",
    "howExamplesAreSatisfied": "For the sample input (s = \"1 + 1\"), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Stack signs",
      "Parse numbers"
    ]
  },
  "bc-090-wildcard-matching": {
    "summary": "Wildcard Matching: Wildcard matching with ? and *.",
    "whyItWorks": "This solution uses the Recursion pattern. DP or greedy. Star matches span.",
    "howExamplesAreSatisfied": "For the sample input (s = \"aa\"\np = \"a\"), the reference solution returns false. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP or greedy",
      "Star matches span"
    ]
  },
  "bc-091-combinations": {
    "summary": "Combinations: All combinations of n choose k.",
    "whyItWorks": "This solution uses the Backtracking pattern. Backtrack start. Build combo.",
    "howExamplesAreSatisfied": "For the sample input (n = 4\nk = 2), the reference solution returns [\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    2,\n    4\n  ],\n  [\n    3,\n    4\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack start",
      "Build combo"
    ]
  },
  "bc-092-combination-sum": {
    "summary": "Combination Sum: Combination sum with reuse.",
    "whyItWorks": "This solution uses the Backtracking pattern. Backtrack candidates. Subtract target.",
    "howExamplesAreSatisfied": "For the sample input (candidates = [2,3,6,7]\ntarget = 7), the reference solution returns [\n  [\n    2,\n    2,\n    3\n  ],\n  [\n    7\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack candidates",
      "Subtract target"
    ]
  },
  "bc-093-combination-sum-iii": {
    "summary": "Combination Sum III: Combination sum III: k numbers sum to n.",
    "whyItWorks": "This solution uses the Backtracking pattern. Backtrack 1-9. No reuse.",
    "howExamplesAreSatisfied": "For the sample input (k = 3\nn = 7), the reference solution returns [\n  [\n    1,\n    2,\n    4\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack 1-9",
      "No reuse"
    ]
  },
  "bc-094-letter-combinations-of-a-phone-number": {
    "summary": "Letter Combinations of a Phone Number: Letter combinations from phone digits.",
    "whyItWorks": "This solution uses the Backtracking pattern. Map digits. DFS build.",
    "howExamplesAreSatisfied": "For the sample input (digits = \"23\"), the reference solution returns [\n  \"ad\",\n  \"ae\",\n  \"af\",\n  \"bd\",\n  \"be\",\n  \"bf\",\n  \"cd\",\n  \"ce\",\n  \"cf\"\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Map digits",
      "DFS build"
    ]
  },
  "bc-095-gray-code": {
    "summary": "Gray Code: Generate Gray code sequence for n.",
    "whyItWorks": "This solution uses the Backtracking pattern. XOR shift. Reflect pattern.",
    "howExamplesAreSatisfied": "For the sample input (n = 2), the reference solution returns [\n  0,\n  1,\n  3,\n  2\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "XOR shift",
      "Reflect pattern"
    ]
  },
  "bc-096-letter-case-permutation": {
    "summary": "Letter Case Permutation: Letter case permutation of string.",
    "whyItWorks": "This solution uses the Backtracking pattern. Backtrack case. Toggle letters.",
    "howExamplesAreSatisfied": "For the sample input (s = \"a1b2\"), the reference solution returns [\n  \"a1b2\",\n  \"a1B2\",\n  \"A1b2\",\n  \"A1B2\"\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack case",
      "Toggle letters"
    ]
  },
  "bc-097-n-queens": {
    "summary": "N-Queens: Solve N-Queens: return all boards.",
    "whyItWorks": "This solution uses the Backtracking pattern. Backtrack rows. Check diagonals.",
    "howExamplesAreSatisfied": "For the sample input (n = 4), the reference solution returns [\n  [\n    \"bbbb\",\n    \"dddd\",\n    \"aaaa\",\n    \"cccc\"\n  ],\n  [\n    \"cccc\",\n    \"aaaa\",\n    \"dddd\",\n    \"bbbb\"\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack rows",
      "Check diagonals"
    ]
  },
  "bc-098-sudoku-solver": {
    "summary": "Sudoku Solver: Solve Sudoku in-place on board.",
    "whyItWorks": "This solution uses the Backtracking pattern. Backtrack empty. Check box.",
    "howExamplesAreSatisfied": "For the sample input (board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]), the reference solution returns [\n  [\n    \"5\",\n    \"3\",\n    \"4\",\n    \"6\",\n    \"7\",\n    \"8\",\n    \"9\",\n    \"1\",\n    \"2\"\n  ],\n  [\n    \"6\",\n    \"7\",\n    \"2\",\n    \"1\",\n    \"9\",\n    \"5\",\n    \"3\",\n    \"4\",\n    \"8\"\n  ],\n  [\n    \"1\",\n    \"9\",\n    \"8\",\n    \"3\",\n    \"4\",\n    \"2\",\n    \"5\",\n    \"6\",\n    \"7\"\n  ],\n  [\n    \"8\",\n    \"5\",\n    \"9\",\n    \"7\",\n    \"6\",\n    \"1\",\n    \"4\",\n    \"2\",\n    \"3\"\n  ],\n  [\n    \"4\",\n    \"2\",\n    \"6\",\n    \"8\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"9\",\n    \"1\"\n  ],\n  [\n    \"7\",\n    \"1\",\n    \"3\",\n    \"9\",\n    \"2\",\n    \"4\",\n    \"8\",\n    \"5\",\n    \"6\"\n  ],\n  [\n    \"9\",\n    \"6\",\n    \"1\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"2\",\n    \"8\",\n    \"4\"\n  ],\n  [\n    \"2\",\n    \"8\",\n    \"7\",\n    \"4\",\n    \"1\",\n    \"9\",\n    \"6\",\n    \"3\",\n    \"5\"\n  ],\n  [\n    \"3\",\n    \"4\",\n    \"5\",\n    \"2\",\n    \"8\",\n    \"6\",\n    \"1\",\n    \"7\",\n    \"9\"\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Backtrack empty",
      "Check box"
    ]
  },
  "bc-099-construct-binary-tree-from-inorder-and-postorder": {
    "summary": "Construct Binary Tree from Inorder and Postorder Traversal: Build binary tree from inorder and postorder.",
    "whyItWorks": "This solution uses the Trees pattern. Pick root last. Partition inorder.",
    "howExamplesAreSatisfied": "For the sample input (inorder = [9,3,15,20,7]\npostorder = [9,15,7,20,3]). Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Pick root last",
      "Partition inorder"
    ]
  },
  "bc-100-construct-binary-tree-from-preorder-and-inorder-": {
    "summary": "Construct Binary Tree from Preorder and Inorder Traversal: Build tree from preorder and inorder.",
    "whyItWorks": "This solution uses the Trees pattern. Root first. Split inorder.",
    "howExamplesAreSatisfied": "For the sample input (preorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]), the reference solution returns {\n  \"val\": 3,\n  \"left\": {\n    \"val\": 9,\n    \"left\": null,\n    \"right\": null\n  },\n  \"right\": {\n    \"val\": 20,\n    \"left\": {\n      \"val\": 15,\n      \"left\": null,\n      \"right\": null\n    },\n    \"right\": {\n      \"val\": 7,\n      \"left\": null,\n      \"right\": null\n    }\n  }\n}. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Root first",
      "Split inorder"
    ]
  },
  "bc-101-path-sum": {
    "summary": "Path Sum: Check if tree has root-to-leaf path sum.",
    "whyItWorks": "This solution uses the Trees pattern. DFS subtract. Leaf check.",
    "howExamplesAreSatisfied": "For the sample input (tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS subtract",
      "Leaf check"
    ]
  },
  "bc-102-same-tree": {
    "summary": "Same Tree: Check if two binary trees are the same.",
    "whyItWorks": "This solution uses the Trees pattern. DFS compare. Structure and val.",
    "howExamplesAreSatisfied": "For the sample input (p = [1,2,3]\nq = [1,2,3]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS compare",
      "Structure and val"
    ]
  },
  "bc-103-binary-tree-level-order-traversal": {
    "summary": "Binary Tree Level Order Traversal: Binary tree level order traversal.",
    "whyItWorks": "This solution uses the Trees pattern. BFS queue. Level by level.",
    "howExamplesAreSatisfied": "For the sample input (tree = [3,9,20,null,null,15,7]), the reference solution returns [\n  [\n    3\n  ],\n  [\n    9,\n    20\n  ],\n  [\n    15,\n    7\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BFS queue",
      "Level by level"
    ]
  },
  "bc-104-invert-binary-tree": {
    "summary": "Invert Binary Tree: Invert a binary tree.",
    "whyItWorks": "This solution uses the Trees pattern. Swap children. DFS post.",
    "howExamplesAreSatisfied": "For the sample input (root = [4,2,7,1,3,6,9]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Swap children",
      "DFS post"
    ]
  },
  "bc-105-minimum-cost-tree-from-leaf-values": {
    "summary": "Minimum Cost Tree From Leaf Values: Minimum cost tree from leaf values.",
    "whyItWorks": "This solution uses the Trees pattern. Monotonic stack. Multiply peaks.",
    "howExamplesAreSatisfied": "For the sample input (tree = [6,2,4]), the reference solution returns 12. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Monotonic stack",
      "Multiply peaks"
    ]
  },
  "bc-106-binary-tree-zigzag-level-order-traversal": {
    "summary": "Binary Tree Zigzag Level Order Traversal: Zigzag level order traversal.",
    "whyItWorks": "This solution uses the Trees pattern. BFS alternate. Reverse every other.",
    "howExamplesAreSatisfied": "For the sample input (tree = [3,9,20,null,null,15,7]), the reference solution returns [\n  [\n    3\n  ],\n  [\n    20,\n    9\n  ],\n  [\n    15,\n    7\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BFS alternate",
      "Reverse every other"
    ]
  },
  "bc-107-maximum-depth-of-binary-tree": {
    "summary": "Maximum Depth of Binary Tree: Maximum depth of binary tree.",
    "whyItWorks": "This solution uses the Trees pattern. DFS depth. 1 + max child.",
    "howExamplesAreSatisfied": "For the sample input (root = [3,9,20,null,null,15,7]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS depth",
      "1 + max child"
    ]
  },
  "bc-108-sum-of-left-leaves": {
    "summary": "Sum of Left Leaves: Sum of left leaves in binary tree.",
    "whyItWorks": "This solution uses the Trees pattern. DFS left flag. Add left leaves.",
    "howExamplesAreSatisfied": "For the sample input (root = [3,9,20,null,null,15,7]), the reference solution returns 24. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS left flag",
      "Add left leaves"
    ]
  },
  "bc-109-binary-tree-right-side-view": {
    "summary": "Binary Tree Right Side View: Right side view of binary tree.",
    "whyItWorks": "This solution uses the Trees pattern. BFS last per level. Or DFS right first.",
    "howExamplesAreSatisfied": "For the sample input (tree = [1,2,3,null,5,null,4]), the reference solution returns [\n  1,\n  3,\n  4\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BFS last per level",
      "Or DFS right first"
    ]
  },
  "bc-110-path-sum-ii": {
    "summary": "Path Sum II: All root-to-leaf paths with target sum.",
    "whyItWorks": "This solution uses the Trees pattern. DFS path. Collect at leaf.",
    "howExamplesAreSatisfied": "For the sample input (tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22), the reference solution returns [\n  [\n    5,\n    4,\n    11,\n    2\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS path",
      "Collect at leaf"
    ]
  },
  "bc-111-path-sum-iii": {
    "summary": "Path Sum III: Number of paths with given sum (any direction down).",
    "whyItWorks": "This solution uses the Trees pattern. Prefix sum map. DFS accumulate.",
    "howExamplesAreSatisfied": "For the sample input (root = [10,5,-3,3,2,null,11,3,-2,null,1]\ntargetSum = 8), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Prefix sum map",
      "DFS accumulate"
    ]
  },
  "bc-112-lowest-common-ancestor-of-a-binary-search-tree": {
    "summary": "Lowest Common Ancestor of a Binary Search Tree: Lowest common ancestor in BST.",
    "whyItWorks": "This solution uses the Trees pattern. Compare with p,q. Go left or right.",
    "howExamplesAreSatisfied": "For the sample input (tree = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Compare with p,q",
      "Go left or right"
    ]
  },
  "bc-113-closest-binary-search-tree-value-ii": {
    "summary": "Closest Binary Search Tree Value II: K closest BST values to target.",
    "whyItWorks": "This solution uses the Trees pattern. Inorder walk. Window of k.",
    "howExamplesAreSatisfied": "For the sample input (root = [4,2,5,1,3]\ntarget = 3.714286\nk = 4), the reference solution returns [\n  1,\n  2,\n  3,\n  4\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Inorder walk",
      "Window of k"
    ]
  },
  "bc-114-trim-a-binary-search-tree": {
    "summary": "Trim a Binary Search Tree: Trim BST to [low, high].",
    "whyItWorks": "This solution uses the Trees pattern. DFS prune. Reparent.",
    "howExamplesAreSatisfied": "For the sample input (root = [1,0,2]\nlow = 1\nhigh = 2), the reference solution returns [\n  1,\n  2\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS prune",
      "Reparent"
    ]
  },
  "bc-115-search-in-a-binary-search-tree": {
    "summary": "Search in a Binary Search Tree: Search target in BST.",
    "whyItWorks": "This solution uses the Trees pattern. BST walk. Compare val.",
    "howExamplesAreSatisfied": "For the sample input (root = [4,2,7,1,3]\nval = 2), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BST walk",
      "Compare val"
    ]
  },
  "bc-116-queue-reconstruction-by-height": {
    "summary": "Queue Reconstruction by Height: Queue reconstruction by height.",
    "whyItWorks": "This solution uses the Trees II pattern. Sort h desc p asc. Insert by p.",
    "howExamplesAreSatisfied": "For the sample input (people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]), the reference solution returns [\n  [\n    5,\n    0\n  ],\n  [\n    7,\n    0\n  ],\n  [\n    5,\n    2\n  ],\n  [\n    6,\n    1\n  ],\n  [\n    4,\n    4\n  ],\n  [\n    7,\n    1\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort h desc p asc",
      "Insert by p"
    ]
  },
  "bc-117-binary-tree-pruning": {
    "summary": "Binary Tree Pruning: Prune subtree with no 1 in binary tree.",
    "whyItWorks": "This solution uses the Trees II pattern. Postorder. Null if sum zero.",
    "howExamplesAreSatisfied": "For the sample input (root = [1,null,0,0,1]), the reference solution returns [\n  1,\n  null,\n  1\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Postorder",
      "Null if sum zero"
    ]
  },
  "bc-118-balance-a-binary-search-tree": {
    "summary": "Balance a Binary Search Tree: Balance BST (return sorted values).",
    "whyItWorks": "This solution uses the Trees II pattern. Inorder sorted. Rebuild middle root.",
    "howExamplesAreSatisfied": "For the sample input (root = [1,null,2,null,3]), the reference solution returns [\n  1,\n  2,\n  3\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Inorder sorted",
      "Rebuild middle root"
    ]
  },
  "bc-119-balanced-binary-tree": {
    "summary": "Balanced Binary Tree: Check if binary tree is height-balanced.",
    "whyItWorks": "This solution uses the Trees II pattern. DFS height. Balance flag.",
    "howExamplesAreSatisfied": "For the sample input (root = [3,9,20,null,null,15,7]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS height",
      "Balance flag"
    ]
  },
  "bc-120-implement-trie-prefix-tree": {
    "summary": "Implement Trie (Prefix Tree): Implement Trie prefix tree.",
    "whyItWorks": "This solution uses the Trees II pattern. Node children map. End flag.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]), the reference solution returns false. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Node children map",
      "End flag"
    ]
  },
  "bc-121-design-add-and-search-words-data-structure": {
    "summary": "Design Add and Search Words Data Structure: Add and search word with dots wildcard.",
    "whyItWorks": "This solution uses the Trees II pattern. Trie + DFS dot. Backtrack wildcard.",
    "howExamplesAreSatisfied": "For the sample input (ops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]), the reference solution returns false. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Trie + DFS dot",
      "Backtrack wildcard"
    ]
  },
  "bc-122-word-search-ii": {
    "summary": "Word Search II: Find all words from the dictionary that can be formed on the board.",
    "whyItWorks": "This solution uses the Trees II pattern. Trie of words. DFS with pruning.",
    "howExamplesAreSatisfied": "For the sample input (board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nwords = [\"oath\",\"pea\",\"eat\",\"rain\"]), the reference solution returns [\n  \"oath\",\n  \"eat\"\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Trie of words",
      "DFS with pruning"
    ]
  },
  "bc-123-redundant-connection": {
    "summary": "Redundant Connection: Find redundant edge that creates a cycle.",
    "whyItWorks": "This solution uses the Trees II pattern. Union-find. First extra edge.",
    "howExamplesAreSatisfied": "For the sample input (edges = [[1,2],[1,3],[2,3]]), the reference solution returns [\n  2,\n  3\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Union-find",
      "First extra edge"
    ]
  },
  "bc-124-accounts-merge": {
    "summary": "Accounts Merge: Accounts merge by shared email.",
    "whyItWorks": "This solution uses the Trees II pattern. Union-find emails. Group by root.",
    "howExamplesAreSatisfied": "For the sample input (accounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]), the reference solution returns [\n  [\n    \"John\",\n    \"j@d.com\",\n    \"j@d2.com\"\n  ],\n  [\n    \"John\",\n    \"jn@d.com\"\n  ],\n  [\n    \"Mary\",\n    \"mary@mail.com\"\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Union-find emails",
      "Group by root"
    ]
  },
  "bc-125-range-sum-query-mutable": {
    "summary": "Range Sum Query Mutable: Range sum query mutable (segment tree simplified).",
    "whyItWorks": "This solution uses the Trees II pattern. Prefix diff array. Point update.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,3,5]\nsumQueries = [[0,2],[1,2],[0,2]]\nupdates = [[1,2]]), the reference solution returns [\n  8,\n  7,\n  8\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Prefix diff array",
      "Point update"
    ]
  },
  "bc-126-longest-increasing-subsequence-ii": {
    "summary": "Longest Increasing Subsequence II: Longest increasing subsequence with patience sorting.",
    "whyItWorks": "This solution uses the Trees II pattern. Binary search tails. Track length.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,10,4,3,8,9]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search tails",
      "Track length"
    ]
  },
  "bc-127-rotting-oranges": {
    "summary": "Rotting Oranges: Minutes until all oranges rot.",
    "whyItWorks": "This solution uses the Graphs pattern. Multi-source BFS. Track fresh count.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[2,1,1],[1,1,0],[0,1,1]]), the reference solution returns 0. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Multi-source BFS",
      "Track fresh count"
    ]
  },
  "bc-128-word-ladder": {
    "summary": "Word Ladder: Word ladder shortest transformation length.",
    "whyItWorks": "This solution uses the Graphs pattern. BFS from begin. Wildcard neighbors.",
    "howExamplesAreSatisfied": "For the sample input (beginWord = \"hit\"\nendWord = \"cog\"\nwordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]), the reference solution returns 5. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BFS from begin",
      "Wildcard neighbors"
    ]
  },
  "bc-129-number-of-provinces": {
    "summary": "Number of Provinces: Number of connected provinces.",
    "whyItWorks": "This solution uses the Graphs pattern. Union-find or DFS. Merge adjacency.",
    "howExamplesAreSatisfied": "For the sample input (isConnected = [[1,1,0],[1,1,0],[0,0,1]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Union-find or DFS",
      "Merge adjacency"
    ]
  },
  "bc-130-number-of-enclaves": {
    "summary": "Number of Enclaves: Count land enclaves surrounded by water.",
    "whyItWorks": "This solution uses the Graphs pattern. DFS from borders. Mark reachable.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]), the reference solution returns 0. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS from borders",
      "Mark reachable"
    ]
  },
  "bc-131-detect-cycle-in-an-undirected-graph": {
    "summary": "Detect Cycle in an Undirected Graph: Detect cycle in undirected graph.",
    "whyItWorks": "This solution uses the Graphs pattern. Union-find. Or DFS parent.",
    "howExamplesAreSatisfied": "For the sample input (n = 3\nedges = [[0,1],[1,2],[2,0]]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Union-find",
      "Or DFS parent"
    ]
  },
  "bc-132-detect-cycle-in-a-directed-graph": {
    "summary": "Detect Cycle in a Directed Graph: Detect cycle in directed graph.",
    "whyItWorks": "This solution uses the Graphs pattern. DFS three-color. Back edge.",
    "howExamplesAreSatisfied": "For the sample input (n = 2\nedges = [[0,1],[1,0]]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS three-color",
      "Back edge"
    ]
  },
  "bc-133-course-schedule": {
    "summary": "Course Schedule: Can finish all courses? (cycle check).",
    "whyItWorks": "This solution uses the Graphs pattern. Topological Kahn. Indegree count.",
    "howExamplesAreSatisfied": "For the sample input (numCourses = 2\nprerequisites = [[1,0]]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Topological Kahn",
      "Indegree count"
    ]
  },
  "bc-134-course-schedule-ii": {
    "summary": "Course Schedule II: Course schedule II: topological order.",
    "whyItWorks": "This solution uses the Graphs pattern. Kahn BFS. Return order.",
    "howExamplesAreSatisfied": "For the sample input (numCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]), the reference solution returns [\n  0,\n  1,\n  2,\n  3\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Kahn BFS",
      "Return order"
    ]
  },
  "bc-135-find-eventual-safe-states": {
    "summary": "Find Eventual Safe States: Find all eventual safe states.",
    "whyItWorks": "This solution uses the Graphs pattern. Reverse graph. Nodes with outdegree 0.",
    "howExamplesAreSatisfied": "For the sample input (n = 7\nedges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]), the reference solution returns []. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Reverse graph",
      "Nodes with outdegree 0"
    ]
  },
  "bc-136-alien-dictionary": {
    "summary": "Alien Dictionary: Alien dictionary order of characters.",
    "whyItWorks": "This solution uses the Graphs pattern. Topological sort. Build graph from words.",
    "howExamplesAreSatisfied": "For the sample input (words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]). Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Topological sort",
      "Build graph from words"
    ]
  },
  "bc-137-network-delay-time": {
    "summary": "Network Delay Time: Network delay time (Dijkstra).",
    "whyItWorks": "This solution uses the Graphs pattern. Min heap relax. Max distance.",
    "howExamplesAreSatisfied": "For the sample input (times = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Min heap relax",
      "Max distance"
    ]
  },
  "bc-138-shortest-path-in-binary-matrix": {
    "summary": "Shortest Path in Binary Matrix: Shortest path in binary matrix.",
    "whyItWorks": "This solution uses the Graphs pattern. 8-dir BFS. Avoid 1 cells.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[0,1],[1,0]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "8-dir BFS",
      "Avoid 1 cells"
    ]
  },
  "bc-139-path-with-minimum-effort": {
    "summary": "Path With Minimum Effort: Minimum effort path in heights grid.",
    "whyItWorks": "This solution uses the Graphs pattern. Dijkstra on effort. Max step diff.",
    "howExamplesAreSatisfied": "For the sample input (heights = [[1,2,2],[3,8,2],[5,3,5]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Dijkstra on effort",
      "Max step diff"
    ]
  },
  "bc-140-cheapest-flights-within-k-stops": {
    "summary": "Cheapest Flights Within K Stops: Cheapest flights within k stops.",
    "whyItWorks": "This solution uses the Graphs pattern. Bellman-Ford k+1. Relax edges.",
    "howExamplesAreSatisfied": "For the sample input (n = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1), the reference solution returns 200. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Bellman-Ford k+1",
      "Relax edges"
    ]
  },
  "bc-141-min-cost-to-connect-all-points": {
    "summary": "Min Cost to Connect All Points: Min cost to connect all points (MST).",
    "whyItWorks": "This solution uses the Graphs pattern. Prim or Kruskal. Manhattan edges.",
    "howExamplesAreSatisfied": "For the sample input (points = [[0,0],[2,2],[3,10],[5,2],[7,0]]), the reference solution returns 20. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Prim or Kruskal",
      "Manhattan edges"
    ]
  },
  "bc-142-find-critical-and-pseudo-critical-edges-in-minim": {
    "summary": "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree: Find critical and pseudo-critical edges in MST.",
    "whyItWorks": "This solution uses the Graphs pattern. Kruskal with special edges. Compare MST weight.",
    "howExamplesAreSatisfied": "For the sample input (n = 4\nedges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]), the reference solution returns [\n  [],\n  [\n    0,\n    1,\n    2,\n    3\n  ]\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Kruskal with special edges",
      "Compare MST weight"
    ]
  },
  "bc-143-connecting-cities-with-minimum-cost": {
    "summary": "Connecting Cities With Minimum Cost: Connecting cities with minimum cost (MST).",
    "whyItWorks": "This solution uses the Graphs pattern. Kruskal union-find. Sort edges.",
    "howExamplesAreSatisfied": "For the sample input (n = 3\nconnections = [[1,2,5],[1,3,6],[2,3,1]]), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Kruskal union-find",
      "Sort edges"
    ]
  },
  "bc-144-course-schedule-iv": {
    "summary": "Course Schedule IV: Course schedule IV: prerequisite queries.",
    "whyItWorks": "This solution uses the Graphs pattern. Floyd or reachability. DFS memo.",
    "howExamplesAreSatisfied": "For the sample input (numCourses = 2\nprerequisites = [[1,0]]\nqueries = [[0,1],[1,0]]), the reference solution returns [\n  true,\n  false\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Floyd or reachability",
      "DFS memo"
    ]
  },
  "bc-145-find-the-city-with-the-smallest-number-of-neighb": {
    "summary": "Find the City With the Smallest Number of Neighbors at a...: City with smallest reachable count within threshold.",
    "whyItWorks": "This solution uses the Graphs pattern. Floyd distances. Count neighbors.",
    "howExamplesAreSatisfied": "For the sample input (n = 4\nedges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]]\ndistanceThreshold = 4), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Floyd distances",
      "Count neighbors"
    ]
  },
  "bc-146-number-of-ways-to-arrive-at-destination": {
    "summary": "Number of Ways to Arrive at Destination: Number of ways to arrive at destination mod 1e9+7.",
    "whyItWorks": "This solution uses the Graphs pattern. Dijkstra + count paths. Same shortest dist.",
    "howExamplesAreSatisfied": "For the sample input (n = 7\nroads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]]\ntime = 7), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Dijkstra + count paths",
      "Same shortest dist"
    ]
  },
  "bc-147-non-overlapping-intervals": {
    "summary": "Non-overlapping Intervals: Minimum intervals to remove for non-overlap.",
    "whyItWorks": "This solution uses the Greedy pattern. Sort by end. Greedy keep.",
    "howExamplesAreSatisfied": "For the sample input (intervals = [[1,2],[2,3],[3,4],[1,3]]), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort by end",
      "Greedy keep"
    ]
  },
  "bc-148-minimum-platforms": {
    "summary": "Minimum Platforms: Minimum platforms for train arrivals/departures.",
    "whyItWorks": "This solution uses the Greedy pattern. Sort events. Sweep line.",
    "howExamplesAreSatisfied": "For the sample input (arrivals = [900,940,950]\ndepartures = [910,1200,1120]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort events",
      "Sweep line"
    ]
  },
  "bc-149-maximize-sum-of-array-after-k-negations": {
    "summary": "Maximize Sum Of Array After K Negations: Maximize array sum after k negations.",
    "whyItWorks": "This solution uses the Greedy pattern. Sort abs values. Flip smallest.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,2,3]\nk = 1), the reference solution returns 5. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort abs values",
      "Flip smallest"
    ]
  },
  "bc-150-assign-mice-to-holes": {
    "summary": "Assign Mice to Holes: Assign mice to holes: minimum time.",
    "whyItWorks": "This solution uses the Greedy pattern. Sort both. Match order.",
    "howExamplesAreSatisfied": "For the sample input (mice = [1,4]\nholes = [4,-4,2]\nk = 2), the reference solution returns 5. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort both",
      "Match order"
    ]
  },
  "bc-151-maximum-product-of-three-numbers": {
    "summary": "Maximum Product of Three Numbers: Maximum product of three numbers.",
    "whyItWorks": "This solution uses the Greedy pattern. Sort top values. Check two negatives.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,4]), the reference solution returns 24. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort top values",
      "Check two negatives"
    ]
  },
  "bc-152-bulb-switcher": {
    "summary": "Bulb Switcher: Bulb switcher: bulbs on after n rounds.",
    "whyItWorks": "This solution uses the Greedy pattern. Only perfect squares on. Count sqrt(n).",
    "howExamplesAreSatisfied": "For the sample input (n = 3), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Only perfect squares on",
      "Count sqrt(n)"
    ]
  },
  "bc-153-candy": {
    "summary": "Candy: Distribute candies to children with ratings.",
    "whyItWorks": "This solution uses the Greedy pattern. Two passes. Local then global.",
    "howExamplesAreSatisfied": "For the sample input (ratings = [1,0,2]). Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Two passes",
      "Local then global"
    ]
  },
  "bc-154-maximum-swap": {
    "summary": "Maximum Swap: Maximum swap once on num string.",
    "whyItWorks": "This solution uses the Greedy pattern. Find max suffix. Swap first smaller.",
    "howExamplesAreSatisfied": "For the sample input (num = 2736), the reference solution returns 7236. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Find max suffix",
      "Swap first smaller"
    ]
  },
  "bc-155-climbing-stairs": {
    "summary": "Climbing Stairs: Climbing stairs: ways to reach top.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Fibonacci DP. Sum last two.",
    "howExamplesAreSatisfied": "For the sample input (n = 3), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Fibonacci DP",
      "Sum last two"
    ]
  },
  "bc-156-decode-ways": {
    "summary": "Decode Ways: Count ways to decode a digit string.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP prev counts. Handle 0 and 10-26.",
    "howExamplesAreSatisfied": "For the sample input (s = \"12\"), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP prev counts",
      "Handle 0 and 10-26"
    ]
  },
  "bc-157-frog-jump": {
    "summary": "Frog Jump: Frog jump: can cross stones?",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DFS reachable jumps. Set positions.",
    "howExamplesAreSatisfied": "For the sample input (stones = [0,1,3,5,6,8,12,17,21,22,26,34]), the reference solution returns false. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DFS reachable jumps",
      "Set positions"
    ]
  },
  "bc-158-coin-change": {
    "summary": "Coin Change: Fewest coins to make amount.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP min coins. Iterate coins.",
    "howExamplesAreSatisfied": "For the sample input (coins = [1,2,5]\namount = 11), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP min coins",
      "Iterate coins"
    ]
  },
  "bc-159-minimum-jumps-to-reach-home": {
    "summary": "Minimum Jumps to Reach Home: Minimum jumps to reach home with restrictions.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. BFS states. Track forbidden.",
    "howExamplesAreSatisfied": "For the sample input (forbidden = [14,4,18,1,15]\na = 11\nb = 4\nx = 11), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BFS states",
      "Track forbidden"
    ]
  },
  "bc-160-best-time-to-buy-and-sell-stock": {
    "summary": "Best Time to Buy and Sell Stock: Best time to buy and sell stock once.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Track min price. Max profit.",
    "howExamplesAreSatisfied": "For the sample input (prices = [7,1,5,3,6,4]), the reference solution returns 5. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Track min price",
      "Max profit"
    ]
  },
  "bc-161-best-time-to-buy-and-sell-stock-ii": {
    "summary": "Best Time to Buy and Sell Stock II: Max profit with unlimited transactions.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Greedy rises. Sum positive diffs.",
    "howExamplesAreSatisfied": "For the sample input (prices = [7,1,5,3,6,4]), the reference solution returns 7. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Greedy rises",
      "Sum positive diffs"
    ]
  },
  "bc-162-best-time-to-buy-and-sell-stock-iii": {
    "summary": "Best Time to Buy and Sell Stock III: Max profit with at most two transactions.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP buy/sell x2. Track states.",
    "howExamplesAreSatisfied": "For the sample input (prices = [3,3,5,0,0,3,1,4]), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP buy/sell x2",
      "Track states"
    ]
  },
  "bc-163-best-time-to-buy-and-sell-stock-iv": {
    "summary": "Best Time to Buy and Sell Stock IV: Max profit with at most k transactions.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP day x k. Buy/sell states.",
    "howExamplesAreSatisfied": "For the sample input (k = 2\nprices = [2,4,1]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP day x k",
      "Buy/sell states"
    ]
  },
  "bc-164-best-time-to-buy-and-sell-stock-with-cooldown": {
    "summary": "Best Time to Buy and Sell Stock with Cooldown: Max profit with cooldown after sell.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP hold/sold/cool. State machine.",
    "howExamplesAreSatisfied": "For the sample input (prices = [1,2,3,0,2]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP hold/sold/cool",
      "State machine"
    ]
  },
  "bc-165-best-time-to-buy-and-sell-stock-with-transaction": {
    "summary": "Best Time to Buy and Sell Stock with Transaction Fee: Max profit with transaction fee.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP cash/hold. Pay fee on sell.",
    "howExamplesAreSatisfied": "For the sample input (prices = [1,3,2,8,4,9]\nfee = 2), the reference solution returns 8. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP cash/hold",
      "Pay fee on sell"
    ]
  },
  "bc-166-partition-equal-subset-sum": {
    "summary": "Partition Equal Subset Sum: Can partition nums into equal sum subsets?",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. 0/1 knapsack. Subset sum DP.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,5,11,5]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "0/1 knapsack",
      "Subset sum DP"
    ]
  },
  "bc-167-ones-and-zeroes": {
    "summary": "Ones and Zeroes: Max subset size with m zeros and n ones in binary strings.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. 0/1 knapsack 2D. DP count.",
    "howExamplesAreSatisfied": "For the sample input (strs = [\"10\",\"0011\",\"1\",\"0\"]\nm = 1\nn = 1), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "0/1 knapsack 2D",
      "DP count"
    ]
  },
  "bc-168-coin-change-ii": {
    "summary": "Coin Change II: Count coin change combinations for amount.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Unbounded knapsack. DP ways.",
    "howExamplesAreSatisfied": "For the sample input (amount = 5\ncoins = [1,2,5]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Unbounded knapsack",
      "DP ways"
    ]
  },
  "bc-169-last-stone-weight-ii": {
    "summary": "Last Stone Weight II: Last stone weight II after smashing.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Partition minimize diff. Subset sum.",
    "howExamplesAreSatisfied": "For the sample input (stones = [2,7,4,1,8,1]), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Partition minimize diff",
      "Subset sum"
    ]
  },
  "bc-170-longest-common-subsequence": {
    "summary": "Longest Common Subsequence: Length of longest common subsequence.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. 2D DP. Match chars.",
    "howExamplesAreSatisfied": "For the sample input (text1 = \"abcde\"\ntext2 = \"ace\"), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "2D DP",
      "Match chars"
    ]
  },
  "bc-171-edit-distance": {
    "summary": "Edit Distance: Minimum edit distance between two strings.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP insert/delete/replace. 2D table.",
    "howExamplesAreSatisfied": "For the sample input (word1 = \"horse\"\nword2 = \"ros\"), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP insert/delete/replace",
      "2D table"
    ]
  },
  "bc-172-longest-palindromic-subsequence": {
    "summary": "Longest Palindromic Subsequence: Longest palindromic subsequence length.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP on intervals. Match ends.",
    "howExamplesAreSatisfied": "For the sample input (s = \"bbbab\"), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP on intervals",
      "Match ends"
    ]
  },
  "bc-173-minimum-insertion-steps-to-make-a-string-palindr": {
    "summary": "Minimum Insertion Steps to Make a String Palindrome: Minimum insertions to make string palindrome.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. n - LPS. Complement LCS.",
    "howExamplesAreSatisfied": "For the sample input (s = \"zzazz\"), the reference solution returns 0. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "n - LPS",
      "Complement LCS"
    ]
  },
  "bc-174-longest-increasing-subsequence": {
    "summary": "Longest Increasing Subsequence: Length of longest increasing subsequence.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Patience sorting. Binary search.",
    "howExamplesAreSatisfied": "For the sample input (nums = [10,9,2,5,3,7,101,18]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Patience sorting",
      "Binary search"
    ]
  },
  "bc-175-largest-divisible-subset": {
    "summary": "Largest Divisible Subset: Size of largest divisible subset.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Sort + DP chain. Prev pointer.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort + DP chain",
      "Prev pointer"
    ]
  },
  "bc-176-longest-string-chain": {
    "summary": "Longest String Chain: Longest string chain by adding one char.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Sort by length. DP predecessor.",
    "howExamplesAreSatisfied": "For the sample input (words = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort by length",
      "DP predecessor"
    ]
  },
  "bc-177-minimum-cost-to-cut-a-stick": {
    "summary": "Minimum Cost to Cut a Stick: Minimum cost to cut a stick.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Interval DP. Try cut positions.",
    "howExamplesAreSatisfied": "For the sample input (n = 7\ncuts = [1,3,4,5]), the reference solution returns 16. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Interval DP",
      "Try cut positions"
    ]
  },
  "bc-178-burst-balloons": {
    "summary": "Burst Balloons: Burst balloons for maximum coins.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Interval DP. Pick last burst.",
    "howExamplesAreSatisfied": "For the sample input (nums = [3,1,5,8]), the reference solution returns 167. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Interval DP",
      "Pick last burst"
    ]
  },
  "bc-179-parsing-a-boolean-expression": {
    "summary": "Parsing a Boolean Expression: Evaluate boolean expression with &, |, !.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Recursion or stack. Parse parentheses.",
    "howExamplesAreSatisfied": "For the sample input (expression = \"(&(1,0),|(0,1))\"). Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Recursion or stack",
      "Parse parentheses"
    ]
  },
  "bc-180-palindrome-partitioning-ii": {
    "summary": "Palindrome Partitioning II: Minimum cuts for palindrome partitioning.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP cuts + palindrome. Check substrings.",
    "howExamplesAreSatisfied": "For the sample input (s = \"aab\"), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP cuts + palindrome",
      "Check substrings"
    ]
  },
  "bc-181-shortest-path-visiting-all-nodes": {
    "summary": "Shortest Path Visiting All Nodes: Shortest path visiting all nodes in graph.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. BFS bitmask state. All nodes visited.",
    "howExamplesAreSatisfied": "For the sample input (graph = [[1,2],[0,2],[0,1]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "BFS bitmask state",
      "All nodes visited"
    ]
  },
  "bc-182-unique-paths": {
    "summary": "Unique Paths: Count unique paths in m x n grid.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP combinatorics. paths[i][j].",
    "howExamplesAreSatisfied": "For the sample input (m = 3\nn = 7), the reference solution returns 28. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP combinatorics",
      "paths[i][j]"
    ]
  },
  "bc-183-unique-paths-ii": {
    "summary": "Unique Paths II: Unique paths II with obstacles.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP skip obstacles. Grid traversal.",
    "howExamplesAreSatisfied": "For the sample input (obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP skip obstacles",
      "Grid traversal"
    ]
  },
  "bc-184-minimum-path-sum": {
    "summary": "Minimum Path Sum: Minimum path sum in grid.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. DP accumulate. Min from top/left.",
    "howExamplesAreSatisfied": "For the sample input (grid = [[1,3,1],[1,5,1],[4,2,1]]), the reference solution returns 7. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP accumulate",
      "Min from top/left"
    ]
  },
  "bc-185-russian-doll-envelopes": {
    "summary": "Russian Doll Envelopes: Maximum envelopes Russian doll nesting.",
    "whyItWorks": "This solution uses the Dynamic Programming pattern. Sort w asc h desc. LIS on heights.",
    "howExamplesAreSatisfied": "For the sample input (envelopes = [[5,4],[6,4],[6,7],[2,3]]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Sort w asc h desc",
      "LIS on heights"
    ]
  },
  "bc-186-find-greatest-common-divisor-of-array": {
    "summary": "Find Greatest Common Divisor of Array: Return GCD of all numbers in array.",
    "whyItWorks": "This solution uses the Math pattern. Euclid reduce. Same as #6.",
    "howExamplesAreSatisfied": "For the sample input (nums = [12,18,24]), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Euclid reduce",
      "Same as #6"
    ]
  },
  "bc-187-self-dividing-numbers": {
    "summary": "Self Dividing Numbers: Return self-dividing numbers in range.",
    "whyItWorks": "This solution uses the Math pattern. Digit divides n. Filter range.",
    "howExamplesAreSatisfied": "For the sample input (left = 1\nright = 22), the reference solution returns [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Digit divides n",
      "Filter range"
    ]
  },
  "bc-188-number-of-good-pairs": {
    "summary": "Number of Good Pairs: Count good pairs (i,j) where nums[i]==nums[j].",
    "whyItWorks": "This solution uses the Math pattern. Frequency map. n choose 2.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,2,3,1,1,3]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Frequency map",
      "n choose 2"
    ]
  },
  "bc-189-four-divisors": {
    "summary": "Four Divisors: Sum of four divisors for each number; -1 if not exactly four.",
    "whyItWorks": "This solution uses the Math pattern. Factor scan. Sum divisors.",
    "howExamplesAreSatisfied": "For the sample input (nums = [21,4,7]), the reference solution returns 32. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Factor scan",
      "Sum divisors"
    ]
  },
  "bc-190-day-of-the-week": {
    "summary": "Day of the Week: Return day of week for given date.",
    "whyItWorks": "This solution uses the Math pattern. Zeller or anchor. Mod 7.",
    "howExamplesAreSatisfied": "For the sample input (day = 31\nmonth = 8\nyear = 2019), the reference solution returns \"Saturday\". Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Zeller or anchor",
      "Mod 7"
    ]
  },
  "bc-191-subtract-the-product-and-sum-of-digits-of-an-int": {
    "summary": "Subtract the Product and Sum of Digits of an Integer: Subtract product and sum of digits.",
    "whyItWorks": "This solution uses the Math pattern. Parse digits. Product - sum.",
    "howExamplesAreSatisfied": "For the sample input (n = 234), the reference solution returns 15. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Parse digits",
      "Product - sum"
    ]
  },
  "bc-192-count-of-matches-in-tournament": {
    "summary": "Count of Matches in Tournament: Count matches in tournament until one winner.",
    "whyItWorks": "This solution uses the Math pattern. n-1 matches. Elimination.",
    "howExamplesAreSatisfied": "For the sample input (n = 7), the reference solution returns 6. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "n-1 matches",
      "Elimination"
    ]
  },
  "bc-193-max-consecutive-ones": {
    "summary": "Max Consecutive Ones: Find maximum consecutive 1s in binary array.",
    "whyItWorks": "This solution uses the Math pattern. Track current streak. Reset on 0.",
    "howExamplesAreSatisfied": "For the sample input (nums = [1,1,0,1,1,1]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Track current streak",
      "Reset on 0"
    ]
  },
  "bc-194-rectangle-overlap": {
    "summary": "Rectangle Overlap: Check if two axis-aligned rectangles overlap.",
    "whyItWorks": "This solution uses the Math pattern. Interval overlap. Both axes.",
    "howExamplesAreSatisfied": "For the sample input (rec1 = [0,0,2,2]\nrec2 = [1,1,3,3]), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Interval overlap",
      "Both axes"
    ]
  },
  "bc-195-excel-sheet-column": {
    "summary": "Excel Sheet Column: Convert Excel column title to number.",
    "whyItWorks": "This solution uses the Math pattern. Base-26. Accumulate.",
    "howExamplesAreSatisfied": "For the sample input (s = \"AB\"), the reference solution returns 28. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Base-26",
      "Accumulate"
    ]
  },
  "bc-196-unique-paths": {
    "summary": "Unique Paths: Count unique paths in grid (duplicate of 182).",
    "whyItWorks": "This solution uses the Math pattern. Combinatorics DP. Right and down.",
    "howExamplesAreSatisfied": "For the sample input (m = 3\nn = 2), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Combinatorics DP",
      "Right and down"
    ]
  },
  "bc-197-rectangle-area": {
    "summary": "Rectangle Area: Compute total area covered by two rectangles.",
    "whyItWorks": "This solution uses the Math pattern. Union area formula. Overlap subtract.",
    "howExamplesAreSatisfied": "For the sample input (ax1 = -3\nay1 = 0\nax2 = 3\nay2 = 4\nbx1 = 0\nby1 = -1\nbx2 = 9\nby2 = 2), the reference solution returns 45. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Union area formula",
      "Overlap subtract"
    ]
  },
  "bc-198-check-if-array-pairs-are-divisible-by-k": {
    "summary": "Check If Array Pairs Are Divisible by k: Check if array pairs are divisible by k.",
    "whyItWorks": "This solution uses the Math pattern. Count mod k. Complement pairs.",
    "howExamplesAreSatisfied": "For the sample input (arr = [1,2,3,4,5,10,6,7,8,9]\nk = 5), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Count mod k",
      "Complement pairs"
    ]
  },
  "bc-199-factorial-trailing-zeroes": {
    "summary": "Factorial Trailing Zeroes: Count trailing zeroes in n factorial.",
    "whyItWorks": "This solution uses the Math pattern. Count factors of 5. Divide by 5.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Count factors of 5",
      "Divide by 5"
    ]
  },
  "bc-200-nth-magical-number": {
    "summary": "Nth Magical Number: Find nth magical number (divisible by a or b).",
    "whyItWorks": "This solution uses the Math pattern. Binary search. Count divisible.",
    "howExamplesAreSatisfied": "For the sample input (n = 1\na = 2\nb = 3), the reference solution returns 2. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search",
      "Count divisible"
    ]
  },
  "bc-201-permutation-sequence": {
    "summary": "Permutation Sequence: Find kth permutation sequence of 1..n.",
    "whyItWorks": "This solution uses the Math pattern. Factorial system. Build string.",
    "howExamplesAreSatisfied": "For the sample input (n = 3\nk = 3), the reference solution returns \"213\". Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Factorial system",
      "Build string"
    ]
  },
  "bc-202-single-number": {
    "summary": "Single Number: Find single number that appears once.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. XOR all. Pairs cancel.",
    "howExamplesAreSatisfied": "For the sample input (nums = [4,1,2,1,2]), the reference solution returns 4. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "XOR all",
      "Pairs cancel"
    ]
  },
  "bc-203-reverse-bits": {
    "summary": "Reverse Bits: Reverse bits of 32-bit integer.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. Shift and OR. 32 iterations.",
    "howExamplesAreSatisfied": "For the sample input (n = 43261596), the reference solution returns 964176192. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Shift and OR",
      "32 iterations"
    ]
  },
  "bc-204-single-number-ii": {
    "summary": "Single Number II: Find single number appearing once; others thrice.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. Bit count mod 3. Or ones/twos.",
    "howExamplesAreSatisfied": "For the sample input (nums = [2,2,3,2]), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Bit count mod 3",
      "Or ones/twos"
    ]
  },
  "bc-205-number-of-1-bits": {
    "summary": "Number of 1 Bits: Count number of 1 bits (Hamming weight).",
    "whyItWorks": "This solution uses the Miscellaneous pattern. n & n-1. Or shift.",
    "howExamplesAreSatisfied": "For the sample input (n = 11), the reference solution returns 3. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "n & n-1",
      "Or shift"
    ]
  },
  "bc-206-factorial-trailing-zeroes": {
    "summary": "Factorial Trailing Zeroes: Trailing zeroes in n factorial.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. Count fives. Same as 199.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), the reference solution returns 1. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Count fives",
      "Same as 199"
    ]
  },
  "bc-207-binary-number-with-alternating-bits": {
    "summary": "Binary Number with Alternating Bits: Check if binary number has alternating bits.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. XOR shift. Power of two check.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), the reference solution returns true. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "XOR shift",
      "Power of two check"
    ]
  },
  "bc-208-number-of-even-and-odd-bits": {
    "summary": "Number of Even and Odd Bits: Count even and odd bits in range [0, num].",
    "whyItWorks": "This solution uses the Miscellaneous pattern. DP bit patterns. Or iterate.",
    "howExamplesAreSatisfied": "For the sample input (n = 5), the reference solution returns [\n  null,\n  null\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "DP bit patterns",
      "Or iterate"
    ]
  },
  "bc-209-find-the-index-of-the-first-occurrence-in-a-stri": {
    "summary": "Find the Index of the First Occurrence in a String: Find index of first occurrence of needle in haystack.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. Built-in or KMP. Substring search.",
    "howExamplesAreSatisfied": "For the sample input (haystack = \"sadbutsad\"\nneedle = \"sad\"), the reference solution returns 0. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Built-in or KMP",
      "Substring search"
    ]
  },
  "bc-210-repeated-dna-sequences": {
    "summary": "Repeated DNA Sequences: Find all repeated 10-letter DNA sequences.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. Rolling hash or set. Slice substrings.",
    "howExamplesAreSatisfied": "For the sample input (s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"), the reference solution returns [\n  \"AAAAACCCCC\",\n  \"CCCCCAAAAA\"\n]. Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Rolling hash or set",
      "Slice substrings"
    ]
  },
  "bc-211-longest-duplicate-substring": {
    "summary": "Longest Duplicate Substring: Longest duplicate substring in string.",
    "whyItWorks": "This solution uses the Miscellaneous pattern. Binary search length. Hash seen substrings.",
    "howExamplesAreSatisfied": "For the sample input (s = \"banana\"), the reference solution returns \"ana\". Each step preserves the invariant until the final answer is produced.",
    "keyIdeas": [
      "Binary search length",
      "Hash seen substrings"
    ]
  }
};
