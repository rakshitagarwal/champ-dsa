# Dynamic Programming

**Definition:** Dynamic Programming solves a problem by breaking it into overlapping subproblems, defining `dp[state]` ("best/ways/count up to i") in English, and reusing saved answers instead of recomputing. Two forms: top-down memoization (recurse + cache) and bottom-up tabulation (loop).

**When to use:** You would recurse on the same `(i, remain, index)` twice — climbing stairs (Fibonacci), house robber (take/skip), coin change/knapsack, grid paths ("from left + from above"), LIS/LCS, edit distance.

**How it works:** Define meaning, write recurrence `dp[i] = f(earlier states)`, set base case, iterate. For 2D `dp[i][j]`. Optimize space if recurrence is local. Time often `O(n * choices)`, space `O(n)`.

```js
// DP skeleton — bottom-up tabulation
const dp = Array(n + 1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++) {
  dp[i] = combine(dp[i-1], dp[i-2] /* ... earlier states */);
}
return dp[n];

// Memo skeleton (top-down)
const memo = new Map();
function solve(i, remain) {
  const key = i + "," + remain;
  if (memo.has(key)) return memo.get(key);
  if (isBase(i, remain)) return baseVal;
  let best = -Infinity;
  for (const choice of choices) best = Math.max(best, solve(next, remain-choice) + gain);
  memo.set(key, best); return best;
}
```

## Climbing Stairs

Ways to reach i = ways to i-1 + ways to i-2.

[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

```js
// DP — Fibonacci
// LC: https://leetcode.com/problems/climbing-stairs/
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}
```

## House Robber

At each house: rob it (then I skipped the previous) or skip it. Two variables are enough.

[House Robber](https://leetcode.com/problems/house-robber/)

```js
// DP — take or skip
// LC: https://leetcode.com/problems/house-robber/
function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
```

## Coin Change

`dp[a]` = fewest coins to make amount a. Try each coin. Unbounded, so inner loop can reuse a coin.

[Coin Change](https://leetcode.com/problems/coin-change/)

```js
// DP — unbounded knapsack
// LC: https://leetcode.com/problems/coin-change/
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## Partition Equal Subset Sum

Can I pick a subset that sums to total/2? 0/1 knapsack on a boolean array.

[Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

```js
// DP — 0/1 knapsack boolean
// LC: https://leetcode.com/problems/partition-equal-subset-sum/
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
  }
  return dp[target];
}
```

## Unique Paths

Only right and down. `dp[c] += dp[c - 1]` while scanning a row.

[Unique Paths](https://leetcode.com/problems/unique-paths/)

```js
// DP — grid paths
// LC: https://leetcode.com/problems/unique-paths/
function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) dp[c] += dp[c - 1];
  }
  return dp[n - 1];
}
```

## Longest Common Subsequence

`dp[i][j]` = LCS of first i chars of text1 and first j of text2. Equal → diagonal + 1. Else max of skip either.

[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

```js
// DP — LCS
// LC: https://leetcode.com/problems/longest-common-subsequence/
function longestCommonSubsequence(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
```

## Longest Increasing Subsequence

`dp[i]` = LIS ending at i. Check all j < i. Patience-sort binary search is faster; the O(n²) loop is the one I can explain in an interview without sweating.

[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

```js
// DP — LIS O(n^2)
// LC: https://leetcode.com/problems/longest-increasing-subsequence/
function lengthOfLIS(nums) {
  const dp = Array(nums.length).fill(1);
  let best = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    best = Math.max(best, dp[i]);
  }
  return best;
}
```

## Edit Distance

`dp[i][j]` = min ops to turn first i of word1 into first j of word2. Insert, delete, replace.

[Edit Distance](https://leetcode.com/problems/edit-distance/)

```js
// DP — insert / delete / replace
// LC: https://leetcode.com/problems/edit-distance/
function minDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
```

## Word Break

`dp[i]` = true if `s.slice(0, i)` can be split into dictionary words. Try every break j.

[Word Break](https://leetcode.com/problems/word-break/)

```js
// DP — prefix can be segmented
// LC: https://leetcode.com/problems/word-break/
function wordBreak(s, wordDict) {
  const dict = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
```

## Decode Ways

`dp[i]` = ways to decode first i chars. One digit 1-9, or two digits 10-26.

[Decode Ways](https://leetcode.com/problems/decode-ways/)

```js
// DP — 1 or 2 digits
// LC: https://leetcode.com/problems/decode-ways/
function numDecodings(s) {
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    if (s[i - 1] !== "0") dp[i] += dp[i - 1];
    if (i >= 2) {
      const two = Number(s.slice(i - 2, i));
      if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
    }
  }
  return dp[n];
}
```

## Burst Balloons

Interval DP. `dp[l][r]` = best coins bursting balloons strictly inside (l, r). Last balloon k in that gap scores `nums[l] * nums[k] * nums[r]`. Pad the array with 1s.

[Burst Balloons](https://leetcode.com/problems/burst-balloons/)

```js
// DP — interval, last balloon k
// LC: https://leetcode.com/problems/burst-balloons/
function maxCoins(nums) {
  const a = [1, ...nums, 1];
  const n = a.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let len = 2; len < n; len++) {
    for (let l = 0; l + len < n; l++) {
      const r = l + len;
      for (let k = l + 1; k < r; k++) {
        dp[l][r] = Math.max(dp[l][r], a[l] * a[k] * a[r] + dp[l][k] + dp[k][r]);
      }
    }
  }
  return dp[0][n - 1];
}
```
