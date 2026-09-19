# Dynamic Programming

**Definition:** DP problem ko chhote overlapping subproblems me todta hai, `dp[state]` ka matlab pehle English me socho ("i tak ka best/ways/count"), fir saved answer reuse karo dobara compute karne ki jagah. Do tarike: top-down memo (recurse + cache) aur bottom-up tabulation (loop).

**When to use:** Jab same `(i, remain, index)` par baar-baar recurse hota ho — climbing stairs (Fibonacci), house robber (lu ya chhodo), coin change/knapsack, grid paths ("left + upar se aaya"), LIS/LCS, edit distance.

**How it works:** Meaning define karo, recurrence likho `dp[i] = f(pichhle states)`, base set karo, loop chalao. 2D me `dp[i][j]`. Agar recurrence local hai to space optimize karke last row hi rakho. Time aksar `O(n * choices)`, space `O(n)`.

## Study notes

- **Always:** write `dp[state]` in English first ("ways to reach i", "min coins for amount").
- **Top-down:** recurse + `memo[key]`. **Bottom-up:** loop in dependency order.
- **Families:** 1D (stairs/robber/decode), knapsack/coins, grid, LCS/LIS/edit, interval DP.
- **Vs greedy:** if local choice may fail → DP.
- **Traps:** wrong base; loop order (reuse coin: outer amount vs outer coin); Infinity sentinel.
- **Checklist:** overlapping subproblems? optimal substructure? state vars?

```js
// DP skeleton — bottom-up tabulation
// define dp[i] in English first, then fill the table in order
const dp = Array(n + 1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++) {
  dp[i] = combine(dp[i-1], dp[i-2] /* ... pichhle states */);
}
return dp[n];

// Memo skeleton (top-down)
// return memo hit; else compute, store, return
const memo = new Map();
function solve(i, remain) {
  const key = i + "," + remain;
  if (memo.has(key)) return memo.get(key); // cache hit
  if (isBase(i, remain)) return baseVal;
  let best = -Infinity;
  for (const choice of choices) best = Math.max(best, solve(next, remain-choice) + gain);
  memo.set(key, best); return best;
}
```

## 1. Linear & Fibonacci-like DP (1D DP)

**Pehchan:** Sequence pe ek direction me chalo, har position ka jawab pichhle 1-2 answers se banta hai. "i tak" ka matlab `dp[i]` me rakho — ways, min cost, max loot, ya possible/not-possible.

**State:** `dp[i]` = prefix `[0..i]` ka answer. Climbing stairs me ways, House Robber me max loot, Decode Ways me tareeke, Word Break me true/false.

**Recurrence:** Pichhle states jodo — stairs: `dp[i] = dp[i-1] + dp[i-2]`; robber: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])` (lu ya chhodo); decode: 1-digit wala plus 2-digit wala.

**Base:** `dp[0]`, `dp[1]` haath se bharo — yahi sabse zyada bug deta hai. Robber me `prev2 = 0, prev1 = 0` se start karo.

**Complexity:** Time `O(n)`, space `O(1)` tak optimize ho jaata hai (sirf pichhle 2 variable rakho).

**Traps:** Circular variant (House Robber II — gol ghar, do linear cases me todo); zero handling (Decode Ways me `'0'` akela kabhi valid nahi); Word Break me har `j < i` pe break try karo.

### Climbing Stairs

Ways to reach i = ways to i-1 + ways to i-2.

[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

```js
// Time: O(n) · Space: O(n)
// dp[i] = dp[i-1] + dp[i-2] (1 or 2 steps)
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let dp = [];
    dp[1] = 1;
    dp[2] = 2;

    for(let i = 3; i<=n; i++){

        //optimal substructure
        dp[i] = dp[i-1] + dp[i-2];

    }

    return dp[n];


};
```

### Min Cost Climbing Stairs

`dp[i]` = step i tak pahunchne ki min cost. Har step se 1 ya 2 aage ja sakte ho, top ke baad rukna hai.

[Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

```js
// Time: O(n) · Space: O(n)
// dp[i] = min cost to stand on step i (can start at 0 or 1 for free)
function minCostClimbingStairs(cost) {
  const n = cost.length;
  let a = 0, b = 0; // dp at i-2 and i-1
  for (let i = 2; i <= n; i++) {
    const c = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = c;
  }
  return b; // top beyond last index
}
```

### House Robber

At each house: rob it (then I skipped the previous) or skip it. Two variables are enough.

[House Robber](https://leetcode.com/problems/house-robber/)

```js
// Time: O(n) · Space: O(n)
// take nums[i]+dp[i-2], or skip → dp[i-1]
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {

    if(nums.length === 0) return 0;
    if(nums.length === 1) return nums[0];

    let dp = Array(nums + 1).fill(0);

    //base cases
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for(let i = 2; i < nums.length; i++){

        dp[i] = Math.max(nums[i]+dp[i-2], dp[i-1]);
    }

    return dp[dp.length-1];


};
```

### House Robber II (Circular)

Ghar gol me hain, pehla aur aakhri saath nahi loot sakte. Do cases: [0..n-2] aur [1..n-1] me se best.

[House Robber II](https://leetcode.com/problems/house-robber-ii/)

```js
// Time: O(n) · Space: O(n)
// circular: exclude first house vs exclude last
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {

    if(nums.length === 1) return nums[0];
    if(nums.length === 2) return Math.max(nums[0], nums[1]);

    let dp1 = new Array(nums.length);
    let dp2 = new Array(nums.length);

    robTwice(0, nums.length-2, dp1, nums);
    robTwice(1, nums.length-1, dp2, nums);

    function robTwice(i, numsLen, dp, nums){
        dp[i] = nums[i];
        dp[i+1] = Math.max(dp[i], nums[i+1]);

        for(let j = i+2; j<=numsLen; j++){
            dp[j] = Math.max(dp[j-1], dp[j-2]+nums[j]);
        }
    }

    //dp1 [1,2,4, _]
    //dp2 [_, 2,3,3]

    return Math.max(dp1[nums.length-2], dp2[nums.length-1]);
};
```

### Decode Ways

`dp[i]` = ways to decode first i chars. One digit 1-9, or two digits 10-26.

[Decode Ways](https://leetcode.com/problems/decode-ways/)

```js
// Time: O(n) · Space: O(n)
// try one digit (1-9) and two digits (10-26)
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {

    if(s[0] == '0') return 0;

    let dp = new Array(s.length+1).fill(0);

    dp[0] = 1;
    dp[1] = 1;

    for(let i = 2; i<=s.length; i++){

        let single = +s[i-1];
        let double = +(s[i-2] + s[i-1]);

        if(single >= 1 && single <= 9) dp[i] += dp[i-1];
        if(double >= 10 && double <= 26) dp[i] += dp[i-2];

    }

    return dp[s.length];

};
```

### Word Break

`dp[i]` = true if `s.slice(0, i)` can be split into dictionary words. Try every break j.

[Word Break](https://leetcode.com/problems/word-break/)

```js
// Time: O(n²) · Space: O(n)
var wordBreak = function(s, wordDict) {
  let visited = new Set();
  let set = new Set(wordDict);
  let queue = [0];

  while (queue.length) {
    let current = queue.shift();

    if (!visited.has(current)) {
      for (let i = current + 1; i <= s.length; i++) {
        if (set.has(s.slice(current, i))) {
          if (i === s.length) {
            return true;
          }
          queue.push(i);
        }
      }
      visited.add(current);
    }
  }

  return false;
};
```

## 2. Knapsack & Subset Problems (Choice-Based DP)

**Pehchan:** Har item ke liye "lu ya chhodo" ka faisla, capacity/target limited hai. Subset sum, coin change, partition — sab isi parivaar ke hain.

**0/1 vs unbounded:** Har item ek baar (0/1) ya baar-baar (unbounded) — ye ek line poora code badal deti hai. 0/1 me inner loop **ulta** chalao (target se neeche) taaki item dobara use na ho. Unbounded me inner loop **seedha** chalao taaki reuse ho sake. Loop direction galat to 0/1 unbounded ban jaata hai — ye classic bug hai, interview me pakda jaata hai.

**Ways vs min:** Tareeke ginne hon (Coin Change II) to coin loop **bahar** rakho — warna permutations count ho jayengi. Min coins (Coin Change) me order se farak nahi padta.

**State:** `dp[s]` = target s possible? / min coins / tareeke. Partition me target = total/2. Target Sum ko subset-sum me badlo: sum(P) - sum(N) = target se `sum(P) = (total + target)/2`.

**Complexity:** Time `O(n * target)`, space `O(target)`.

**Traps:** Loop direction (ulta vs seedha) sabse aam bug; Coin Change II me coin-outer order; Target Sum me `(total + target)` odd ya negative ho to answer 0.

### Coin Change

`dp[a]` = fewest coins to make amount a. Try each coin. Unbounded, so inner loop can reuse a coin.

[Coin Change](https://leetcode.com/problems/coin-change/)

```js
// Time: O(amount·coins) · Space: O(amount)
// dp[sum] = fewest coins to make sum
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let dp = Array(amount+1).fill(Infinity);
    
    //base case
    dp[0] = 0;
    
    for(let curAmount = 1; curAmount<=amount; curAmount++){
        for(let coin of coins){
            if(curAmount - coin >= 0){
                dp[curAmount] = Math.min(dp[curAmount], 1 + dp[curAmount - coin])
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
};
```

### Coin Change II (Number of Ways)

Kitne tareeke se amount banao? Order nahi count karna, coin loop bahar.

[Coin Change II](https://leetcode.com/problems/coin-change-2/)

```js
// Time: O(n) · Space: O(n)
// Count combos: outer coin loop avoids permutations of same multiset
function change(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  }
  return dp[amount];
}
```

### Partition Equal Subset Sum

Can I pick a subset that sums to total/2? 0/1 knapsack on a boolean array.

[Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

```js
// Time: O(n) · Space: O(n)
// Subset sum to target/2; reverse loop = each number used once
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

### Target Sum

Har number ke aage + ya - lagake target banao — kitne tareeke? Subset-sum me badlo: `sum(P) = (total + target) / 2`, fir 0/1 count wala knapsack.

[Target Sum](https://leetcode.com/problems/target-sum/)

```js
// Time: O(n) · Space: O(n)
// Subset sum count: P - N = target => sum(P) = (total + target) / 2
function findTargetSumWays(nums, target) {
  const total = nums.reduce((a, b) => a + b, 0);
  if ((total + target) % 2 !== 0 || total < Math.abs(target)) return 0;
  const t = (total + target) / 2;
  const dp = Array(t + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let s = t; s >= x; s--) dp[s] += dp[s - x];
  }
  return dp[t];
}
```

## 3. String & Sequence Problems (2D DP)

**Pehchan:** Do strings/sequences compare karni hain, prefix-by-prefix table bharo. `dp[i][j]` ka matlab rat lo: pehle i chars vs pehle j chars ka answer.

**Match vs skip:** Dono chars barabar hon to diagonal + 1 (LCS, LPS). Na hon to dono me se ek chhodo aur max lo. Edit distance me teeno operations: insert `dp[i][j-1]`, delete `dp[i-1][j]`, replace `dp[i-1][j-1]` — plus 1.

**Base:** Pehli row/col khaali-string cases hain. LCS me sab 0; Edit Distance me `dp[i][0] = i`, `dp[0][j] = j` (khaali se banane me itne ops).

**Complexity:** Time `O(m * n)`, space `O(m * n)` — sirf answer chahiye to 2 rows tak optimize ho jaata hai.

**Traps:** Table 1-indexed hai par strings 0-indexed — `a[i-1]` vs `dp[i]` ka off-by-one sabse aam bug hai. Longest Palindromic Subsequence string aur uske reverse ka LCS hai (ya interval DP).

### Longest Common Subsequence

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

### Edit Distance

`dp[i][j]` = min ops to turn first i of word1 into first j of word2. Insert, delete, replace.

[Edit Distance](https://leetcode.com/problems/edit-distance/)

```js
// Time: O(n) · Space: O(n)
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

### Longest Palindromic Subsequence

`dp` me LCS string aur uske reverse ka. Ya `dp[i][j]` interval DP.

[Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)

```js
// Time: O(n) · Space: O(n)
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

## 4. Grid & Matrix Problems

**Pehchan:** Cell tak sirf upar/left se aao (kabhi 4-direction memo ke saath). `dp[r][c]` = start `(0,0)` se cell `(r,c)` tak ka answer.

**Recurrence:** Unique Paths me `up + left`; Min Path Sum me `grid + min(up, left)`. Sirf do padosi dekhne hain, isliye poori table ki jagah 1D row kaafi hai: `dp[c] += dp[c - 1]`.

**Base:** Pehli row sirf left se bharti hai, pehla column sirf upar se. Obstacle wali cell (Unique Paths II) zero ho jaati hai.

**Complexity:** Time `O(m * n)`, space `O(n)` optimize karke (ek row).

**Traps:** Pehli row/col ka init bhoolna sabse aam bug hai. Obstacle check loop ke andar hona chahiye, bahar nahi.

### Unique Paths

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

### Minimum Path Sum

Har cell pe `grid + min(upar, left)`. Pehli row/col seedha accumulate hoti hai.

[Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

```js
// Time: O(n) · Space: O(n)
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

## 5. Longest Increasing Subsequence (LIS) Pattern

**Pehchan:** "Ending at i" wala state — har `i` ke liye saare `j < i` check karo. Subsequence (order maintain, gaps allowed) hai, subarray nahi.

**State:** `dp[i]` = `nums[i]` pe khatm hota longest increasing subsequence length. Har `dp[i]` kam se kam 1 (khud akela).

**Recurrence:** `nums[j] < nums[i]` ho to `dp[i] = max(dp[i], dp[j] + 1)`. Answer poore array ka max hai — aakhri cell nahi, ye sabse aam galti hai.

**Complexity:** O(n²) loop interview me samjhane layak hai. Patience sorting + binary search se length O(n log n) me nikalti hai (sequence reconstruct karna mushkil hota hai).

**Variations:** Russian Doll Envelopes (sort karke LIS), Maximum Length of Pair Chain, Number of LIS (count array saath chalao), non-decreasing chahiye to `<=` use karo.

### Longest Increasing Subsequence

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

    for(let i = 1; i<=nums.length; i++){
        for(let j=i; j>=0; j--){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);

};
```

## Beyond: Interval DP

Jab decision interval ke andar "aakhri kaun" ho, `dp[l][r]` banao aur gap order me bharo (chhote interval pehle). Burst Balloons me gap ke andar aakhri phoda balloon `k` score deta hai: `nums[l] * nums[k] * nums[r]`. Array ko 1s se pad karo, answer `dp[0][n-1]`.

### Burst Balloons

Interval DP. `dp[l][r]` = best coins bursting balloons strictly inside (l, r). Last balloon k in that gap scores `nums[l] * nums[k] * nums[r]`. Pad the array with 1s.

[Burst Balloons](https://leetcode.com/problems/burst-balloons/)

```js
// Time: O(n) · Space: O(n)
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
