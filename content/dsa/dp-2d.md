# 2D DP (Grid, Strings, LIS, Interval)

**Definition:** The state uses **two indices** (or an interval `[l,r]`) — `dp[i][j]` / `dp[r][c]` / `dp[l][r]`. Used for string compare, grid paths, LIS endings, and interval "last choice".

**When to use:** LCS, edit distance, LPS, unique paths, min path sum, LIS, burst balloons.

**How it works:** Fill the table in dependency order (by rows, or by gap length for interval). Match → diagonal; else skip/ops. Grid: usually only up + left.

**See also:** Hub [DP](/patterns/dp). 1D sequence → [Linear](/patterns/dp-linear). Coins/subset → [Knapsack](/patterns/dp-knapsack).

## Active revision

1. LCS recurrence + base row/col.
2. Edit: insert/delete/replace.
3. LIS: answer = max(dp), not dp[n-1].
4. Interval: fill by increasing gap.

**Blank checklist:** two sequences or grid? 1-index table vs 0-index string? LIS ending-at-i?

## Decision table

| If you see… | Open section / state |
|-------------|----------------------|
| Two strings — LCS / edit / LPS | Strings & sequences |
| Grid right/down paths | Grid & matrix |
| Longest increasing subsequence | LIS — `dp[i]` ending at i |
| "Last choice" inside `[l,r]` | Interval DP |

## Strings & sequences

**Spot it:** Compare two strings/sequences; fill a prefix-by-prefix table. Memorize: `dp[i][j]` = answer for first i chars vs first j chars.

**Match vs skip:** Equal chars → diagonal + 1 (LCS, LPS). Else take max of skipping either side. Edit distance uses all three ops: insert `dp[i][j-1]`, delete `dp[i-1][j]`, replace `dp[i-1][j-1]` — plus 1.

**Base:** First row/col are empty-string cases. LCS: all 0. Edit Distance: `dp[i][0] = i`, `dp[0][j] = j` (ops to build from empty).

**Complexity:** Time `O(m * n)`, space `O(m * n)` — if only the answer is needed, can optimize to 2 rows.

**Traps:** Table is 1-indexed but strings are 0-indexed — `a[i-1]` vs `dp[i]` off-by-one is the #1 bug. Longest Palindromic Subsequence = LCS of the string and its reverse (or interval DP).

## Longest Common Subsequence

`dp[i][j]` = LCS of first i chars of text1 and first j of text2. Equal → diagonal + 1. Else max of skip either.

[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

```js
// Time: O(m·n) · Space: O(m·n)
// match → diag+1; else max(up, left)
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    let m = text1.length;
    let n = text2.length;
    
    let dp = Array.from(Array(m+1), () => new Array(n+1).fill(0));
    
    for(let i = 1; i<=m; i++){
        for(let j = 1; j<=n; j++){
            
            if(text1[i-1] === text2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
};
```

## Edit Distance

`dp[i][j]` = min ops to turn first i of word1 into first j of word2. Insert, delete, replace.

[Edit Distance](https://leetcode.com/problems/edit-distance/)

```js
// Time: O(m·n) · Space: O(m·n)
// dp[i][j] = edit distance between a[0..i-1] and b[0..j-1]
function minDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i; // delete all from a
  for (let j = 0; j <= n; j++) dp[0][j] = j; // insert all into a
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
```

## Longest Palindromic Subsequence

`dp` via LCS of the string and its reverse. Or `dp[i][j]` interval DP.

[Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)

```js
// Time: O(n²) · Space: O(n²)
// LPS length = LCS(s, reverse(s))
function longestPalindromeSubseq(s) {
  const t=[...s].reverse().join("");
  const n=s.length, dp=Array.from({length:n+1},()=>Array(n+1).fill(0));
  for(let i=1;i<=n;i++) for(let j=1;j<=n;j++){
    if(s[i-1]===t[j-1]) dp[i][j]=dp[i-1][j-1]+1;
    else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
  }
  return dp[n][n];
}
```


## Grid & matrix

**Spot it:** Reach a cell only from up/left (sometimes 4-direction memo). `dp[r][c]` = answer from start `(0,0)` to cell `(r,c)`.

**Recurrence:** Unique Paths = `up + left`; Min Path Sum = `grid + min(up, left)`. Only two neighbors matter, so one 1D row often suffices: `dp[c] += dp[c - 1]`.

**Base:** First row fills only from the left; first column only from above. Obstacle cells (Unique Paths II) become zero.

**Complexity:** Time `O(m * n)`, space `O(n)` after optimizing to one row.

**Traps:** Forgetting first row/col init is the #1 bug. Obstacle checks belong inside the loop, not outside.

## Unique Paths

Only right and down. `dp[c] += dp[c - 1]` while scanning a row.

[Unique Paths](https://leetcode.com/problems/unique-paths/)

```js
// Time: O(m·n) · Space: O(m·n)
// only right/down; cell = above + left
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let dp = Array.from(Array(m), () => new Array(n));
    
    for(let i = 0; i < dp.length; i++) dp[i][0] = 1;
    for(let i = 0; i < dp[0].length; i++) dp[0][i] = 1;
    
    for(let i = 1; i < dp.length; i++){
        for(let j = 1; j < dp[0].length; j++){
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
};
```

## Minimum Path Sum

At each cell: `grid + min(up, left)`. First row/col accumulate in a straight line.

[Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

```js
// Time: O(m·n) · Space: O(m·n)
// dp[r][c] = min path sum to (r,c) moving only right/down
function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];
  for (let c = 1; c < n; c++) dp[0][c] = dp[0][c - 1] + grid[0][c];
  for (let r = 1; r < m; r++) dp[r][0] = dp[r - 1][0] + grid[r][0];
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = grid[r][c] + Math.min(dp[r - 1][c], dp[r][c - 1]);
    }
  }
  return dp[m - 1][n - 1];
}
```


## LIS pattern

**Spot it:** State is "ending at i" — for each `i`, check all `j < i`. This is a subsequence (order kept, gaps allowed), not a subarray.

**State:** `dp[i]` = length of the longest increasing subsequence ending at `nums[i]`. Each `dp[i]` starts at least 1 (the element alone).

**Recurrence:** If `nums[j] < nums[i]`, set `dp[i] = max(dp[i], dp[j] + 1)`. The answer is the **max over the whole array** — not the last cell. That is the most common mistake.

**Complexity:** The O(n²) loop is interview-explainable. Patience sorting + binary search gets length in O(n log n) (reconstructing the sequence is harder).

**Variations:** Russian Doll Envelopes (sort then LIS), Maximum Length of Pair Chain, Number of LIS (run a count array alongside), non-decreasing → use `<=`.

## Longest Increasing Subsequence

`dp[i]` = LIS ending at i. Check all j < i. Patience-sort binary search is faster; the O(n²) loop is the one I can explain in an interview without sweating.

[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

```js
// Time: O(n²) · Space: O(n)
// dp[i] = LIS ending at i
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {

    let dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);

};
```


## Interval DP

When the decision is "who is last" inside an interval, use `dp[l][r]` and fill by increasing gap (small intervals first). In Burst Balloons, the last balloon `k` burst inside the gap scores `nums[l] * nums[k] * nums[r]`. Pad the array with 1s; answer is `dp[0][n-1]`.

## Burst Balloons

Interval DP. `dp[l][r]` = best coins bursting balloons strictly inside (l, r). Last balloon k in that gap scores `nums[l] * nums[k] * nums[r]`. Pad the array with 1s.

[Burst Balloons](https://leetcode.com/problems/burst-balloons/)

```js
// Time: O(n³) · Space: O(n²)
// dp[l][r] = max coins bursting balloons strictly between l and r (exclusive)
function maxCoins(nums) {
  const a = [1, ...nums, 1]; // boundary sentinels
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
