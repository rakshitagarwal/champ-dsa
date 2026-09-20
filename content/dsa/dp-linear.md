# 1D / Linear DP

**Definition:** Walk a sequence in one direction; each position's answer comes from the **previous 1–2** answers. `dp[i]` = ways / min cost / max loot / possible for prefix `[0..i]`.

**When to use:** Climbing stairs, house robber, decode ways, word break, min cost climb — a linear "up to i" scan.

**How it works:** Recurrence from nearby states — stairs `dp[i]=dp[i-1]+dp[i-2]`; robber `max(skip, take+dp[i-2])`. Set `dp[0]`/`dp[1]` by hand. Space often `O(1)` (two variables).

**See also:** Hub [Dynamic Programming](/patterns/dp). Capacity/subset → [Knapsack](/patterns/dp-knapsack). Grid/strings → [2D DP](/patterns/dp-2d).

## Active revision

1. Write stairs + robber recurrence from memory.
2. Circular robber = two linear ranges.
3. Decode: 1-digit + 2-digit; leading zero trap.

**Blank checklist:** state `dp[i]`? need last 1 or 2? circular? zeros in string?

## Study notes

- **Spot it:** one array/string; answer grows left → right from nearby cells.
- **Base bugs** are the most common — robber empty/1-element; decode `'0'`.
- **Word Break:** `dp[i]` = `s[0..i)` breakable; try every `j < i` (or BFS on indices).
- **Complexity:** usually `O(n)` or `O(n²)` (word break).

## Decision table

| If you see… | Likely state |
|-------------|--------------|
| Ways with 1 or 2 steps | `dp[i] = dp[i-1] + dp[i-2]` |
| Take/skip adjacent constraint | Robber: `max(take+dp[i-2], skip)` |
| Circular houses | Best of two linear ranges |
| Decode string digits | 1-digit + valid 2-digit |
| Split into dict words | `dp[i]` breakable prefix |

## Climbing Stairs

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

## Min Cost Climbing Stairs

`dp[i]` = min cost to stand on step i. From each step you can go 1 or 2 ahead; stop once past the top.

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

## House Robber

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

    let dp = Array(nums.length).fill(0);

    //base cases
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for(let i = 2; i < nums.length; i++){

        dp[i] = Math.max(nums[i]+dp[i-2], dp[i-1]);
    }

    return dp[nums.length - 1];


};
```

## House Robber II (Circular)

Houses form a circle — first and last cannot both be robbed. Best of two ranges: `[0..n-2]` and `[1..n-1]`.

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

## Decode Ways

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

## Word Break

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
