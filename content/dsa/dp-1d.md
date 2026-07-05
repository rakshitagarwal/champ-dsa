# 1D Dynamic Programming

Break a problem into overlapping subproblems and combine their solutions, storing results to avoid recomputation.

## When to use
- Problem asks for count/min/max of ways to do something
- Decision at each step depends on previous decisions
- Brute force recursion yields repeating subproblems
- Can define a recurrence relation over a single integer state

## How it works

Define a 1D array `dp` where `dp[i]` represents the optimal solution for the subproblem of size `i`. Iterate from base cases upward, computing each entry from earlier ones using a recurrence relation. The answer is typically `dp[n]` or the max/min over the array.

```js
// Example: Fibonacci-style DP
function fib(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
```

## Practice problems
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — Classic linear DP, `dp[i] = dp[i-1] + dp[i-2]`
- [House Robber](https://leetcode.com/problems/house-robber/) — Adjacent constraint; `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])`
- [Coin Change](https://leetcode.com/problems/coin-change/) — Unbounded knapsack; minimize coins to reach amount
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) — `dp[i]` = LIS ending at index `i`
