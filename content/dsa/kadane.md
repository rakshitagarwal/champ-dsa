# Kadane's Algorithm

Kadane's algorithm finds the maximum sum of any contiguous subarray in O(n) time using only O(1) extra space. It works by making a single pass through the array while maintaining a running "best subarray ending here" and a global "best subarray seen so far." At each position, the algorithm decides whether it is better to extend the existing subarray (add the current element) or to start a new subarray from the current element alone. This elegant local decision produces a globally optimal result.

The algorithm is named after Joseph Born Kadane, who published it in the early 1980s. It solves the classic "Maximum Subarray" problem, which has a rich history in the field of algorithm design. The beauty of Kadane's algorithm lies in its simplicity and its use of dynamic programming principles without requiring explicit DP tables. The recurrence `dp[i] = max(nums[i], dp[i-1] + nums[i])` is the heart of the algorithm, where `dp[i]` represents the maximum subarray sum ending at index i.

What makes Kadane's algorithm so elegant is that it is essentially a dynamic programming problem compressed into a single pass with just two variables. The standard DP approach would allocate an array `dp` of size n, where `dp[i]` stores the max subarray sum ending at position i. Kadane noticed that `dp[i]` only ever depends on `dp[i-1]`, so you never need the full array — just the previous value. This insight reduces space from O(n) to O(1) while preserving the O(n) time complexity, making the algorithm both fast and memory-efficient.

## When to use

- Finding the maximum sum of a contiguous subarray (the classic problem)
- Problems that reduce to finding a "best contiguous segment" under additive scoring
- Stock-profit problems where you buy low and sell high on a single transaction (the max difference is equivalent to Kadane's on daily price changes)
- Circular-array variants where the best subarray can wrap around (requires combining Kadane's with total sum minus minimum subarray)
- Problems requiring not just the sum but also the subarray boundaries
- Maximum sum subarray in 2D matrices (reduced to 1D Kadane's by collapsing rows)

## How it works

### Core concept

Kadane's algorithm is fundamentally a dynamic programming approach compressed into two variables. The recurrence is: if the best subarray ending at index i-1 has sum `cur`, then the best subarray ending at index i is either just `nums[i]` by itself or the previous subarray extended by `nums[i]`. Why does this choice exist? Because if the previous subarray's sum is negative, extending it would only make things worse — you are better off discarding it and starting fresh.

The algorithm maintains two pieces of state: `currentMax` (the maximum sum of any subarray that ends at the current position) and `globalMax` (the maximum sum of any subarray seen anywhere so far). At each step, `currentMax` is updated using the recurrence, and `globalMax` is the max of itself and `currentMax`. This makes Kadane's a streaming algorithm — it processes elements one by one and never needs to revisit earlier elements or store the input.

A common subtle point is handling arrays where all elements are negative. In this case, Kadane's algorithm correctly returns the largest element (the least negative number) because the `max(nums[i], currentMax + nums[i])` recurrence will pick the larger of two negatives at each step, eventually converging on the maximum element. This differs from the variant where you initialize `currentMax` and `globalMax` to 0 — that variant would incorrectly return 0 for all-negative input, so it is only appropriate when you know at least one element must be included in the subarray summing to a positive value.

Another way to think about the recurrence is that Kadane's algorithm performs a greedy local optimization that provably yields a global optimum. At each position, the decision to reset or extend is irreversible and independent of future elements, yet the accumulated result captures the best subarray ending at any position. This property — that the optimal solution ending at i can be computed from the optimal solution ending at i-1 — is the hallmark of the optimal substructure in dynamic programming.

### Step-by-step approach

1. **Initialize `currentMax` and `globalMax` to `nums[0]`.** This handles the base case: the maximum subarray ending at index 0 is just `nums[0]` itself.
2. **Iterate from index 1 to n-1.** For each element, decide whether to extend the existing subarray or start a new one: `currentMax = Math.max(nums[i], currentMax + nums[i])`.
3. **Update the global maximum:** `globalMax = Math.max(globalMax, currentMax)`.
4. **Return `globalMax`** after the loop ends. It holds the maximum subarray sum across the entire array.
5. **(Optional) Track start and end indices:** When `nums[i]` is chosen over `currentMax + nums[i]`, record a new start. When `globalMax` updates, record the end index. This gives the actual subarray, not just the sum.

### Complexity

- **Time:** O(n) — the array is traversed exactly once with O(1) work per element. No nested loops, no recursion.
- **Space:** O(1) — only two integer variables (`currentMax` and `globalMax`) are required regardless of input size. This makes Kadane's algorithm extremely cache-friendly and suitable for embedded or memory-constrained environments.

```js
function maxSubarraySum(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}
```

## Variations

- **Maximum product subarray:** Track both maximum and minimum products ending at the current position because a negative number can flip a large negative product into a large positive one. The recurrence becomes `curMax = max(nums[i], curMax * nums[i], curMin * nums[i])` and similarly for `curMin`. Zeros reset the window, so every zero effectively forces a fresh start.
- **Maximum sum circular subarray:** Compute the standard Kadane's maximum, compute the total array sum minus the minimum subarray sum (Kadane's on negated array), then return the max of the two. Handle the edge case where all elements are negative separately — wrapped subarray would be empty, which should not be considered.
- **Kadane's with subarray bounds:** Maintain `start` and `end` variables. When `nums[i]` is chosen as the new start, set `tempStart = i`. When `globalMax` updates, set `start = tempStart` and `end = i`.
- **2D Kadane's (maximum sum rectangle):** For each pair of top and bottom rows, collapse those rows into a 1D array by summing column-wise, then run 1D Kadane's on the result. This solves the maximum sum submatrix problem in O(n² · m) time.
- **Best time to buy and sell stock (single transaction):** Track the minimum price seen so far and compute the maximum difference between the current price and that minimum. This is Kadane-like but tracks a running min rather than a running sum.

## Edge cases

- **All negative numbers:** The algorithm returns the largest (least negative) element. Initialize both `cur` and `best` to `nums[0]`, not 0. If initialized to 0, the algorithm would incorrectly return 0 for an all-negative array, which is wrong because 0 is not a valid subarray sum when all elements are negative.
- **Single-element array:** The loop from i=1 does not execute, so `nums[0]` is returned. This is correct — the only subarray is the element itself. No special handling is needed.
- **Empty array:** Return 0 or throw depending on the problem specification. Kadane's algorithm assumes at least one element. Defensively, check for empty input before running the algorithm.
- **Large numbers causing overflow:** In typed languages, use a 64-bit integer for the running sums if the input values or array length could cause 32-bit overflow.
- **Integer.MIN_VALUE initialization pitfalls:** If using `best = 0` as initial value, the algorithm fails on all-negative arrays. Always initialize with `nums[0]` or `-Infinity`.
- **Tracking the actual subarray:** When the problem asks for the subarray (not just the sum), maintain `tempStart`, `start`, and `end` variables. Reset `tempStart` when you start a new subarray. Update `start` and `end` whenever `globalMax` is updated.
- **Zeros in the array:** Zeros do not affect Kadane's algorithm directly — they are just another element. However, if the constraint requires positive product (as in max product subarray), zeros act as resets and must be handled separately.

## Practice problems

- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — The canonical Kadane's problem. Find the maximum sum of any contiguous subarray.
- [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) — Combines standard Kadane's with minimum-subarray Kadane's to handle wrap-around subarrays.
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) — Tracks minimum price and max profit. Kadane-like but operating on price differences.
- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) — Kadane's extended to products; track both max and min because a negative times a negative becomes positive.
- [Maximum Absolute Sum of Any Subarray](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) — Run Kadane's for max and min separately, then return the larger absolute value.
- [Maximum Sum of 3 Non-Overlapping Subarrays](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/) — Uses Kadane-like DP to track best single, double, and triple subarray sums in one pass.
- [Longest Turbulent Subarray](https://leetcode.com/problems/longest-turbulent-subarray/) — Kadane-like DP with two states (up and down) to track alternating increases and decreases.
