# 1D Dynamic Programming

1D Dynamic Programming solves problems by breaking them into overlapping subproblems indexed by a single integer state, storing results in a 1D array `dp` to avoid recomputation. The core idea is to identify a recurrence relation where `dp[i]` depends on one or more previous entries (`dp[i-1]`, `dp[i-2]`, etc.) and compute iteratively from base cases upward. This transforms exponential recursive solutions into linear-time ones — the classic "fibonacci" pattern extended to arbitrary decision problems.

The key insight is **optimal substructure**: the optimal solution for problem size `i` can be built from optimal solutions of smaller subproblems. Combined with **overlapping subproblems** (the same subproblems are solved repeatedly in a naive recursion), memoization or tabulation yields dramatic speedups. 1D DP appears in counting problems (how many ways), optimization (min/max cost), and decision problems (is it possible). The state typically represents a prefix of the input, the remaining capacity, or the current position.

## When to use

- Problem asks for count, min, or max of ways to achieve something with sequential decisions
- A brute-force recursion produces a tree that revisits the same subproblems repeatedly
- You can define a recurrence relation over a single integer parameter (index, amount, length)
- The decision at step `i` depends only on a bounded window of previous steps (e.g., last 1, 2, or k states)
- Input size is moderate (n up to 10^5) so O(n) or O(n log n) is feasible
- Examples: "how many ways to climb stairs", "maximum sum with no adjacent elements"

## How it works

### Core concept

Define a 1D array `dp` where `dp[i]` represents the optimal solution for a subproblem of size `i`. The recurrence expresses `dp[i]` in terms of earlier entries. For counting problems, `dp[i]` sums the ways to reach `i` from all valid previous states. For optimization, `dp[i]` takes a min or max over choices. The base case(s) are initialized first (`dp[0]`, sometimes `dp[1]`), then iteration fills the array forward. The answer is either `dp[n]` or an aggregate over the array.

The intuition mirrors real-world decision-making: "if I know the best outcome for every smaller version of this problem, I can combine those to solve the current version." Space optimization often applies — if the recurrence only looks back a constant number of steps, you can replace the full array with rolling variables.

### Step-by-step approach

1. **Define the state**: Decide what `dp[i]` represents. For example, "maximum sum we can get from the first `i` elements" or "number of ways to reach step `i`". The state must be complete (no additional information needed to compute future states).
2. **Establish the recurrence**: Write how `dp[i]` relates to smaller indices. This is the hardest step — ask: "if I know answers for all sizes < i, how do I compute size i?" Draw decision trees for small `n` to spot the pattern.
3. **Initialize base cases**: Set `dp[0]`, `dp[1]`, etc. according to the problem definition. These terminate the recurrence so it doesn't index out of bounds.
4. **Iterate and compute**: Loop from the smallest non-base index up to `n`, applying the recurrence. Choose between bottom-up tabulation (iterative) or top-down memoization (recursive with cache).
5. **Extract the answer**: Return `dp[n]` or the relevant aggregate. Sometimes you need `Math.max(...dp)` or to reconstruct the path by storing choices.

### Complexity

- **Time:** O(n) for standard linear DP, O(n^2) for LIS-style nested loops — determined by number of states × work per state
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
```

## Variations

- **Unbounded Knapsack (Coin Change):** `dp[i] = Math.min(dp[i], dp[i - coin] + 1)` — each item can be reused any number of times, iterate amount from coin to target
- **0/1 Knapsack:** Each item used at most once — iterate target backward to prevent reuse
- **Longest Increasing Subsequence:** O(n^2) DP `dp[i] = 1 + max(dp[j])` for `j < i && nums[j] < nums[i]`, or O(n log n) patience sorting
- **Palindromic Substrings:** 1D DP with expanding centers (Manacher-adjacent) or 2D DP for longest palindromic subsequence
- **Decode Ways:** `dp[i] = dp[i-1] (+ dp[i-2] if two-char code valid)` — mapping digits to letters with edge cases around zero

## Edge cases

- **Empty input:** Return 0, null, or `[]` depending on problem. Always guard `nums.length === 0`.
- **Single element:** Base case often differs from recurrence — handle separately.
- **All elements equal / descending / ascending:** Ensure recurrence doesn't assume a particular ordering.
- **Zero values in counting problems:** If a step contributes 0 ways, it shouldn't break the recurrence — initialize dp with 0 and start from correct base.
- **Negative numbers in optimization:** Initialize dp with -Infinity (for max) or Infinity (for min) rather than 0.
- **Integer overflow:** Use `BigInt` in JS or modulo if the problem specifies it (e.g., `% (10**9 + 7)`).

## Practice problems

- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — Classic 1D DP, `dp[i] = dp[i-1] + dp[i-2]`
- [House Robber](https://leetcode.com/problems/house-robber/) — Adjacent constraint; `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])`
- [Coin Change](https://leetcode.com/problems/coin-change/) — Unbounded knapsack; minimize coins to reach amount
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) — `dp[i]` = LIS ending at index i
- [Decode Ways](https://leetcode.com/problems/decode-ways/) — Linear DP with two-digit decoding constraints
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — Kadane's algorithm, `dp[i] = max(nums[i], dp[i-1] + nums[i])`
