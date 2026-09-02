# Dynamic Programming

**Definition:** DP problem ko chhote overlapping subproblems me todta hai, `dp[state]` ka matlab pehle English me socho ("i tak ka best/ways/count"), fir saved answer reuse karo dobara compute karne ki jagah. Do tarike: top-down memo (recurse + cache) aur bottom-up tabulation (loop).

**When to use:** Jab same `(i, remain, index)` par baar-baar recurse hota ho — climbing stairs (Fibonacci), house robber (lu ya chhodo), coin change/knapsack, grid paths ("left + upar se aaya"), LIS/LCS, edit distance.

**How it works:** Meaning define karo, recurrence likho `dp[i] = f(pichhle states)`, base set karo, loop chalao. 2D me `dp[i][j]`. Agar recurrence local hai to space optimize karke last row hi rakho. Time aksar `O(n * choices)`, space `O(n)`.

```js
// DP skeleton — bottom-up tabulation
// Hinglish: dp[i] ka matlab pehle socho fir loop se bharo
const dp = Array(n + 1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++) {
  dp[i] = combine(dp[i-1], dp[i-2] /* ... pichhle states */);
}
return dp[n];

// Memo skeleton (top-down)
// Hinglish: yaad hai to wapas do, nahi to compute karke yaad rakho
const memo = new Map();
function solve(i, remain) {
  const key = i + "," + remain;
  if (memo.has(key)) return memo.get(key); // yaad hai
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — Fibonacci
// LC: https://leetcode.com/problems/climbing-stairs/
function climbStairs(n) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — take or skip
// LC: https://leetcode.com/problems/house-robber/
function rob(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — unbounded knapsack
// LC: https://leetcode.com/problems/coin-change/
function coinChange(coins, amount) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — 0/1 knapsack boolean
// LC: https://leetcode.com/problems/partition-equal-subset-sum/
function canPartition(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — grid paths
// LC: https://leetcode.com/problems/unique-paths/
function uniquePaths(m, n) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — LCS
// LC: https://leetcode.com/problems/longest-common-subsequence/
function longestCommonSubsequence(a, b) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — LIS O(n^2)
// LC: https://leetcode.com/problems/longest-increasing-subsequence/
function lengthOfLIS(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — insert / delete / replace
// LC: https://leetcode.com/problems/edit-distance/
function minDistance(a, b) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — prefix can be segmented
// LC: https://leetcode.com/problems/word-break/
function wordBreak(s, wordDict) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — 1 or 2 digits
// LC: https://leetcode.com/problems/decode-ways/
function numDecodings(s) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — interval, last balloon k
// LC: https://leetcode.com/problems/burst-balloons/
function maxCoins(nums) {
  // Hinglish: step 1 — base case check karo
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

## House Robber II (Circular)

Ghar gol me hain, pehla aur aakhri saath nahi loot sakte. Do cases: [0..n-2] aur [1..n-1] me se best.

[House Robber II](https://leetcode.com/problems/house-robber-ii/)

```js
// Hinglish: dp state bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/house-robber-ii/
function rob2(nums) {
  // Hinglish: single to wahi
  if(nums.length===1) return nums[0];
  const robRange=(l,r)=>{
    let prev2=0, prev1=0;
    for(let i=l;i<=r;i++){ const cur=Math.max(prev1, prev2+nums[i]); prev2=prev1; prev1=cur; } // Hinglish: loot ya chhodo
    return prev1;
  };
  return Math.max(robRange(0, nums.length-2), robRange(1, nums.length-1)); // Hinglish: pehla chhodo ya aakhri chhodo
}
```

## Longest Palindromic Subsequence

`dp` me LCS string aur uske reverse ka. Ya `dp[i][j]` interval DP.

[Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)

```js
// Hinglish: dp state bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-palindromic-subsequence/
function longestPalindromeSubseq(s) {
  // Hinglish: reverse se LCS
  const t=[...s].reverse().join("");
  const n=s.length, dp=Array.from({length:n+1},()=>Array(n+1).fill(0));
  for(let i=1;i<=n;i++) for(let j=1;j<=n;j++){
    if(s[i-1]===t[j-1]) dp[i][j]=dp[i-1][j-1]+1; // Hinglish: match to +1
    else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]); // Hinglish: ek chhodo
  }
  return dp[n][n];
}
```

## Coin Change II (Number of Ways)

Kitne tareeke se amount banao? Order nahi count karna, coin loop bahar.

[Coin Change II](https://leetcode.com/problems/coin-change-2/)

```js
// Hinglish: dp state bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/coin-change-2/
function change(amount, coins) {
  // Hinglish: dp[a] = tareeke
  const dp=Array(amount+1).fill(0); dp[0]=1; // Hinglish: 0 ka 1 tareeka
  for(const c of coins){
    for(let a=c;a<=amount;a++) dp[a]+=dp[a-c]; // Hinglish: c wala use karo
  }
  return dp[amount];
}
```
