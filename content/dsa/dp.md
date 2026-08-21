# DP (1D)

Answer at i is built from earlier answers. Define `dp[i]`, the transition, and the base case. Scan left to right.

```js
// 1D DP skeleton
const dp = Array(n + 1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++) {
  // dp[i] = f(dp[i - 1], dp[i - 2], ...)
}
return dp[n];
```

## House Robber

Take or skip — [House Robber](https://leetcode.com/problems/house-robber/).

```js
// 1D DP — take vs skip
// LC: https://leetcode.com/problems/house-robber/
function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const x of nums) {
    const take = prev2 + x;   // rob this, skip previous
    const skip = prev1;       // skip this
    const cur = Math.max(take, skip);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
```

## Coin Change

Unbounded knapsack on amount — [Coin Change](https://leetcode.com/problems/coin-change/).

```js
// 1D DP — min coins to make amount
// LC: https://leetcode.com/problems/coin-change/
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0; // base: 0 coins to make 0
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c > a) continue;
      // transition: use coin c
      dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Unique Paths

Grid DP, only right/down — [Unique Paths](https://leetcode.com/problems/unique-paths/).

```js
// 1D/2D DP — paths from left and above
// LC: https://leetcode.com/problems/unique-paths/
function uniquePaths(m, n) {
  const dp = Array(n).fill(1); // first row is all 1s
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[c] += dp[c - 1]; // from above (dp[c]) + from left (dp[c - 1])
    }
  }
  return dp[n - 1];
}
```

**More:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/), [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/), [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/), [Decode Ways](https://leetcode.com/problems/decode-ways/).
