# Dynamic Programming

Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems indexed by a single integer state, storing results in an array `dp` to avoid recomputation. The core idea is to identify a recurrence relation where `dp[i]` depends on one or more previous entries (`dp[i-1]`, `dp[i-2]`, etc.) and compute iteratively from base cases upward. This transforms exponential recursive solutions into polynomial-time ones.

The key insight is **optimal substructure**: the optimal solution for problem size `i` can be built from optimal solutions of smaller subproblems. Combined with **overlapping subproblems** (the same subproblems are solved repeatedly in a naive recursion), memoization or tabulation yields dramatic speedups. 1D DP appears in counting problems (how many ways), optimization (min/max cost), and decision problems (is it possible). The state typically represents a prefix of the input, the remaining capacity, or the current position.

Kadane's algorithm is a special case of DP where the state is compressed to a single variable. The recurrence `dp[i] = max(nums[i], dp[i-1] + nums[i])` finds the maximum subarray sum in O(n) time with O(1) space — the classic "Maximum Subarray" problem. The algorithm decides at each position whether to extend the existing subarray (add the current element) or start a new subarray from the current element alone. If the previous subarray's sum is negative, extending it would only make things worse, so starting fresh is better.

## When to use

- Problem asks for count, min, or max of ways to achieve something with sequential decisions
- A brute-force recursion produces a tree that revisits the same subproblems repeatedly
- You can define a recurrence relation over a single integer parameter (index, amount, length)
- The decision at step `i` depends only on a bounded window of previous steps (e.g., last 1, 2, or k states)
- Input size is moderate (n up to 10^5) so O(n) or O(n log n) is feasible
- Finding the maximum sum of a contiguous subarray
- Stock-profit problems where you buy low and sell high on a single transaction
- Problems requiring not just the sum but also the subarray boundaries

## How it works

### Core concept

Define a 1D array `dp` where `dp[i]` represents the optimal solution for a subproblem of size `i`. The recurrence expresses `dp[i]` in terms of earlier entries. For counting problems, `dp[i]` sums the ways to reach `i` from all valid previous states. For optimization, `dp[i]` takes a min or max over choices. The base case(s) are initialized first, then iteration fills the array forward. The answer is either `dp[n]` or an aggregate over the array.

The intuition mirrors real-world decision-making: "if I know the best outcome for every smaller version of this problem, I can combine those to solve the current version." Space optimization often applies — if the recurrence only looks back a constant number of steps, you can replace the full array with rolling variables. Kadane's algorithm takes this to the extreme: only two variables are needed (`currentMax` and `globalMax`).

A common subtle point is handling arrays where all elements are negative. In this case, Kadane's algorithm correctly returns the largest element (the least negative number) because the `max(nums[i], currentMax + nums[i])` recurrence will pick the larger of two negatives at each step. This differs from the variant initialized to 0, which would incorrectly return 0 for all-negative input.

### Step-by-step approach

1. **Define the state**: Decide what `dp[i]` represents — e.g., "maximum sum we can get from the first `i` elements" or "number of ways to reach step `i`". The state must be complete (no additional information needed to compute future states).
2. **Establish the recurrence**: Write how `dp[i]` relates to smaller indices. Draw decision trees for small `n` to spot the pattern.
3. **Initialize base cases**: Set `dp[0]`, `dp[1]`, etc. according to the problem definition. These terminate the recurrence so it doesn't index out of bounds.
4. **Iterate and compute**: Loop from the smallest non-base index up to `n`, applying the recurrence. Choose between bottom-up tabulation (iterative) or top-down memoization (recursive with cache).
5. **Extract the answer**: Return `dp[n]` or the relevant aggregate. Sometimes you need `Math.max(...dp)` or to reconstruct the path by storing choices.

### Complexity

- **Time:** O(n) for standard linear DP, O(n^2) for LIS-style nested loops
- **Space:** O(n) for the dp array, can often be reduced to O(1) (rolling variables) or O(k) when only k previous states are needed

```js
// House Robber: maximum sum with no two adjacent elements
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let prev2 = nums[0], prev1 = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// Kadane's: maximum subarray sum
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

- **Unbounded Knapsack (Coin Change):** `dp[i] = Math.min(dp[i], dp[i - coin] + 1)` — each item can be reused any number of times
- **0/1 Knapsack:** Each item used at most once — iterate target backward to prevent reuse
- **Longest Increasing Subsequence:** O(n^2) DP or O(n log n) patience sorting
- **Palindromic Substrings:** 1D DP with expanding centers or 2D DP for longest palindromic subsequence
- **Decode Ways:** `dp[i] = dp[i-1] (+ dp[i-2] if two-char code valid)` — mapping digits to letters
- **Maximum product subarray:** Track both max and min products ending at current position because a negative can flip a large negative into a large positive
- **Maximum sum circular subarray:** Standard Kadane's plus total sum minus minimum subarray sum
- **2D Kadane's (maximum sum rectangle):** Collapse rows into 1D array for each pair of top/bottom rows, then run 1D Kadane's

## Edge cases

- **Empty input:** Return 0, null, or `[]` depending on problem. Always guard `nums.length === 0`.
- **Single element:** Base case often differs from recurrence — handle separately.
- **All negative numbers (Kadane's):** Initialize both `cur` and `best` to `nums[0]`, not 0, to return the largest element.
- **Zero values in counting problems:** If a step contributes 0 ways, it shouldn't break the recurrence — initialize dp with 0.
- **Negative numbers in optimization:** Initialize dp with -Infinity (for max) or Infinity (for min) rather than 0.
- **Integer overflow:** Use `BigInt` in JS or modulo if the problem specifies it (e.g., `% (10**9 + 7)`).

## Practice problems

- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — Classic 1D DP, `dp[i] = dp[i-1] + dp[i-2]`
- [House Robber](https://leetcode.com/problems/house-robber/) — Adjacent constraint; `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])`
- [Coin Change](https://leetcode.com/problems/coin-change/) — Unbounded knapsack; minimize coins to reach amount
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) — LIS ending at index i
- [Decode Ways](https://leetcode.com/problems/decode-ways/) — Linear DP with two-digit decoding constraints
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — Kadane's algorithm, `dp[i] = max(nums[i], dp[i-1] + nums[i])`
- [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) — Kadane's plus minimum subarray for wrap-around
- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) — Kadane's extended to products; track max and min
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) — Kadane-like on price differences
