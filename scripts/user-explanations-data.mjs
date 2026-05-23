/**
 * Revision-focused explanations for user-imported BossCoder sheet solutions (Q1–30).
 * Keyed by sheet question number — not GeeksforGeeks extras.
 */
export const USER_EXPLANATIONS_BY_NUM = {
  1: {
    summary:
      "Sheet #1 — Richest Customer Wealth: for each customer (row), sum all bank balances, then return the largest row sum.",
    whyItWorks:
      "Wealth is independent per customer, so you can scan rows one at a time. `reduce` on each row gives that customer's total; tracking `maxWealth` across rows is enough because there is no interaction between customers.",
    howExamplesAreSatisfied:
      "For `accounts = [[1,2,3],[3,2,1]]`, row sums are 6 and 6, so the answer is 6. Pattern: row reduce + global max.",
    keyIdeas: [
      "Row sum = customer wealth",
      "Single pass over all rows",
      "O(m×n) time, O(1) extra space",
    ],
  },
  2: {
    summary:
      "Sheet #2 — Two Sum: find two indices whose values add to `target` in one pass using a hash map of seen values.",
    whyItWorks:
      "At index `i`, the partner you need is `target - nums[i]`. If that complement was stored earlier, you found the pair. Otherwise store `nums[i] → i` and continue.",
    howExamplesAreSatisfied:
      "On `[2,7,11,15]` with target 9: at index 1, value 7 needs 2; index 0 already stored 2 → return `[0,1]`.",
    keyIdeas: [
      "Map: value → index",
      "Check complement before inserting current",
      "O(n) time",
    ],
  },
  3: {
    summary:
      "Sheet #3 — Count Negative Numbers in a Sorted Matrix: walk from the bottom-left; each step counts negatives or moves right.",
    whyItWorks:
      "Rows and columns are sorted non-increasing. From bottom-left, a negative cell means every cell to its right in that row is negative (add `n - col`, move up). A non-negative cell means move right to find negatives.",
    howExamplesAreSatisfied:
      "On `[[4,3,2,-1],[3,2,1,-1]]`, the walk counts 2 negatives in O(m+n) time.",
    keyIdeas: [
      "Start bottom-left",
      "One pointer, O(m+n)",
      "Uses row + column sort order",
    ],
  },
  4: {
    summary:
      "Sheet #4 — Next Permutation: find rightmost ascent, swap with next larger on the right, reverse suffix.",
    whyItWorks:
      "Pivot is the first position from the end where order can increase. Swapping with the smallest larger right value gives the minimal increase; reversing the suffix minimizes the rest.",
    howExamplesAreSatisfied:
      "`[1,2,3]` → `[1,3,2]`. `[3,2,1]` has no pivot → reverse all → `[1,2,3]`.",
    keyIdeas: [
      "Find pivot (rightmost ascent)",
      "Swap with next greater on right",
      "Reverse suffix after pivot",
    ],
  },
  5: {
    summary:
      "Sheet #5 — Median of Two Sorted Arrays (your approach): merge both arrays, sort, pick middle value(s).",
    whyItWorks:
      "Median is the middle of the combined sorted list. For even length, average the two central elements.",
    howExamplesAreSatisfied:
      "`nums1=[1,3], nums2=[2]` → merged `[1,2,3]` → median 2.",
    keyIdeas: [
      "Brute: concat + sort + middle",
      "Odd n → one middle; even n → average two middles",
      "Interview upgrade: binary search partition O(log(min(m,n)))",
    ],
  },
  6: {
    summary:
      "Sheet #6 — Find GCD of Array: try divisors up to the minimum element; keep largest dividing min and max.",
    whyItWorks:
      "GCD of all numbers equals GCD(min, max). Your loop checks each i dividing both sorted ends.",
    howExamplesAreSatisfied:
      "`[2,4,6,8]` → GCD is 2.",
    keyIdeas: [
      "Sort: min front, max back",
      "GCD(all) = GCD(min, max)",
      "Upgrade: Euclid algorithm",
    ],
  },
  7: {
    summary:
      "Sheet #7 — Self-Dividing Numbers: each i in [left,right] must be divisible by every non-zero digit.",
    whyItWorks:
      "Split digits; if every digit d (d≠0) satisfies i % d === 0, include i.",
    howExamplesAreSatisfied:
      "1–9 always qualify. 12: both digits 1 and 2 divide 12.",
    keyIdeas: [
      "Digit extraction via string",
      "Skip zero digits",
      "O(range × digits)",
    ],
  },
  9: {
    summary:
      "Sheet #9 — Reverse Pairs: count i<j with nums[i] > 2×nums[j] using modified merge sort.",
    whyItWorks:
      "Before merging halves, two-pointer count pairs across left/right. Recursion handles subarray pairs; merge step handles cross pairs.",
    howExamplesAreSatisfied:
      "`[1,3,2,3,1]` → pairs at indices (1,4) and (3,4) → answer 2.",
    keyIdeas: [
      "Merge sort with count step",
      "Cross pairs before merge",
      "O(n log n)",
    ],
  },
  10: {
    summary:
      "Sheet #10 — Special Positions: count 1s that are alone in their row AND column.",
    whyItWorks:
      "Tally row and column counts of 1s; a cell is special iff it is 1 and both tallies equal 1.",
    howExamplesAreSatisfied:
      "Diagonal identity matrix → 3 special positions.",
    keyIdeas: ["Two-pass counting", "Row + column tallies", "O(m×n)"],
  },
  11: {
    summary: "Sheet #11 — Transpose Matrix: result[i][j] = matrix[j][i].",
    whyItWorks:
      "Swap row/column indices; output size is n×m when input is m×n.",
    howExamplesAreSatisfied:
      "`[[1,2,3],[4,5,6]]` → `[[1,4],[2,5],[3,6]]`.",
    keyIdeas: ["Index swap", "Allocate n×m grid", "O(m×n)"],
  },
  12: {
    summary:
      "Sheet #12 — 01 Matrix: multi-source BFS from all 0 cells for distance to nearest 0.",
    whyItWorks:
      "All 0s enqueue at distance 0. BFS layers assign first-seen distance to each 1.",
    howExamplesAreSatisfied:
      "Center 1 surrounded by 0s gets distance 1.",
    keyIdeas: ["Multi-source BFS", "4 directions", "O(m×n)"],
  },
  13: {
    summary:
      "Sheet #13 — Spiral Matrix: walk top→right→bottom→left while shrinking boundaries.",
    whyItWorks:
      "Four pointers top/bottom/left/right; each side consumes one boundary. Guard before left/up legs when rows or cols exhausted.",
    howExamplesAreSatisfied:
      "3×3 → [1,2,3,6,9,8,7,4,5].",
    keyIdeas: ["Four boundaries", "Shrink after each side", "O(m×n)"],
  },
  14: {
    summary:
      "Sheet #14 — Pascal's Triangle: each row starts with 1s; interior = sum of two cells above.",
    whyItWorks:
      "Binomial recurrence: row[j] = prev[j-1] + prev[j].",
    howExamplesAreSatisfied:
      "Row 4 → [1,4,6,4,1] from prior [1,3,3,1].",
    keyIdeas: ["DP on previous row", "Edge ones", "O(numRows²)"],
  },
  15: {
    summary:
      "Sheet #15 — Minimum Size Subarray Sum: smallest subarray with sum ≥ target (variable window).",
    whyItWorks:
      "Expand right; while sum ≥ target, record length and shrink left. Minimum valid window wins.",
    howExamplesAreSatisfied:
      "`[2,3,1,2,4,3]` target 7 → `[4,3]` length 2.",
    keyIdeas: [
      "Variable sliding window",
      "Expand until valid, shrink while valid",
      "O(n)",
    ],
  },
  16: {
    summary: "Sheet #16 — Running Sum: prefix[i] = sum of nums[0..i].",
    whyItWorks:
      "Prefix array: each entry adds previous prefix plus current element.",
    howExamplesAreSatisfied: "`[1,2,3,4]` → `[1,3,6,10]`.",
    keyIdeas: ["Prefix sum", "Can do in-place", "O(n)"],
  },
  17: {
    summary:
      "Sheet #17 — Range Sum Query 2D: build 2D prefix table; rectangle sum in O(1).",
    whyItWorks:
      "2D prefix with +1 padding; sumRegion uses inclusion-exclusion on four corners.",
    howExamplesAreSatisfied:
      "Inner rectangle query returns sum via prefix corners.",
    keyIdeas: [
      "2D prefix table",
      "Inclusion-exclusion query",
      "Preprocess O(m×n), query O(1)",
    ],
  },
  18: {
    summary:
      "Sheet #18 — Maximum Subarray (Kadane): best sum ending at each index.",
    whyItWorks:
      "`currentSum = max(nums[i], nums[i]+currentSum)` — extend or restart. Track global max.",
    howExamplesAreSatisfied:
      "Classic array → max subarray sum 6 on segment [4,-1,2,1].",
    keyIdeas: ["Kadane", "Extend or restart", "O(n)"],
  },
  19: {
    summary:
      "Sheet #19 — Maximum Sum Circular Subarray: max(normal Kadane, total − min subarray).",
    whyItWorks:
      "Wrap-around max equals total sum minus minimum subarray sum. If all negative, return max Kadane only.",
    howExamplesAreSatisfied:
      "`[5,-3,5]` → wrap [5,5] gives 10.",
    keyIdeas: ["Kadane max + min", "Circular = total − minSub", "All-negative edge case"],
  },
  20: {
    summary:
      "Sheet #20 — Longest Turbulent Subarray: longest alternating up/down comparisons.",
    whyItWorks:
      "Track `up` and `down` streak lengths; reset on equal neighbors. Answer is max streak seen.",
    howExamplesAreSatisfied:
      "Alternating comparisons extend streak; equal values reset.",
    keyIdeas: ["up/down streak DP", "Reset on flat", "O(n)"],
  },
  21: {
    summary:
      "Sheet #21 — Contains Duplicate II: duplicate within index distance k using sliding set.",
    whyItWorks:
      "Set holds window values; duplicate inside window → true. Remove left when size exceeds k.",
    howExamplesAreSatisfied:
      "`[1,2,3,1]` k=3 → duplicate 1 within distance 3.",
    keyIdeas: ["Set window size ≤ k", "O(n)"],
  },
  22: {
    summary:
      "Sheet #22 — Count subarrays of size k with average ≥ threshold.",
    whyItWorks:
      "Fixed window: slide k elements, compare sum/k to threshold.",
    howExamplesAreSatisfied:
      "Each length-k window checked once.",
    keyIdeas: ["Fixed window", "Sum then average", "O(n)"],
  },
  23: {
    summary:
      "Sheet #23 — Minimum Size Subarray Sum (same pattern as #15).",
    whyItWorks:
      "Variable window until sum ≥ target; shrink while valid; track minimum length.",
    howExamplesAreSatisfied:
      "target=7, nums=[2,3,1,2,4,3] → answer 2.",
    keyIdeas: ["Same as sheet #15", "Variable window", "O(n)"],
  },
  24: {
    summary:
      "Sheet #24 — Longest Substring Without Repeating Characters.",
    whyItWorks:
      "Expand end; shrink start while char frequency > 1. Track max window length.",
    howExamplesAreSatisfied:
      "`abcabcbb` → length 3.",
    keyIdeas: ["Sliding window + freq map", "Shrink on duplicate", "O(n)"],
  },
  25: {
    summary:
      "Sheet #25 — Longest Repeating Character Replacement: window valid if len − maxFreq ≤ k.",
    whyItWorks:
      "Track char counts and dominant frequency; shrink when too many replacements needed.",
    howExamplesAreSatisfied:
      "`AABABBA` k=1 → length 4.",
    keyIdeas: ["maxFreq trick", "Valid window rule", "O(n)"],
  },
  26: {
    summary:
      "Sheet #26 — Container With Most Water: two pointers; move shorter line inward.",
    whyItWorks:
      "Area limited by shorter height; only moving shorter side can improve area.",
    howExamplesAreSatisfied:
      "Classic heights → max area 49.",
    keyIdeas: ["Two pointers", "Move shorter side", "O(n)"],
  },
  27: {
    summary:
      "Sheet #27 — Trapping Rain Water: two pointers with leftMax/rightMax.",
    whyItWorks:
      "Process shorter side; water += maxSide − height. Update max for that side.",
    howExamplesAreSatisfied:
      "Valleys fill to min of surrounding peaks minus bar height.",
    keyIdeas: ["Two pointers", "Running maxes", "O(n) O(1) space"],
  },
  28: {
    summary:
      "Sheet #28 — Two Sum II: sorted array, two pointers from ends.",
    whyItWorks:
      "Sum too small → left++; too big → right--; match → 1-based indices.",
    howExamplesAreSatisfied:
      "`[2,7,11,15]` target 9 → `[1,2]`.",
    keyIdeas: ["Sorted two pointers", "1-based answer", "O(n)"],
  },
  29: {
    summary:
      "Sheet #29 — K-diff Pairs: sort + two pointers; skip duplicate left values on match.",
    whyItWorks:
      "Sorted array enables two-pointer scan for difference k. k<0 returns 0.",
    howExamplesAreSatisfied:
      "`[3,1,4,1,5]` k=2 → pairs (1,3) and (3,5) → 2.",
    keyIdeas: [
      "Sort + two pointers",
      "Skip duplicates after match",
      "Hash-set variant is interview-cleaner",
    ],
  },
  30: {
    summary:
      "Sheet #30 — Find K Closest Elements: shrink window of size k from both ends.",
    whyItWorks:
      "While window length > k, drop left or right whichever is farther from x (tie → drop right in your code when left diff ≤ right diff).",
    howExamplesAreSatisfied:
      "`[1,2,3,4,5]` k=4 x=3 → drop 5 → `[1,2,3,4]`.",
    keyIdeas: [
      "Two pointers on sorted array",
      "Shrink to width k",
      "Binary-search window is O(log n) alternative",
    ],
  },
};
