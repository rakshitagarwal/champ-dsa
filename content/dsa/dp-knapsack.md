# Knapsack DP

**Definition:** For each item, decide **take or skip** (or how many times), under a limited capacity/target. Subset sum, coin change, and partition are one family.

**When to use:** Coins, partition equal subset, target sum (+/-), classic 0/1 knapsack. Open this page when you see "capacity + choice".

**How it works:** `dp[s]` = possible / min coins / ways for sum `s`. **0/1:** inner loop **downward** (each item once). **Unbounded:** inner loop **upward** (reuse). Ways (combinations): coin loop **outer**.

**See also:** Hub [DP](/patterns/dp). Linear sequence → [1D DP](/patterns/dp-linear). Grid/strings → [2D DP](/patterns/dp-2d).

## Active revision

1. Draw 0/1 vs unbounded loop direction.
2. Coin Change II: why coin-outer?
3. Target Sum → subset sum `(total+target)/2`.

**Blank checklist:** 0/1 or unbounded? min vs ways? target feasible (parity)?

## Study notes

**Spot it:** Each item is take/skip (or reuse), with a limited capacity/target. Subset sum, coin change, and partition all belong here.

**0/1 vs unbounded:** One use per item (0/1) vs unlimited reuse (unbounded) — one line changes the whole code. For 0/1, run the inner loop **downward** (from target) so the item is not reused. For unbounded, run the inner loop **upward** so reuse is allowed. Wrong direction turns 0/1 into unbounded — a classic interview bug.

**Ways vs min:** Counting combinations (Coin Change II) needs the coin loop **outer** — otherwise you count permutations. Min coins (Coin Change) does not care about order.

**State:** `dp[s]` = is target s possible? / min coins / number of ways. Partition target = total/2. Target Sum reduces to subset sum: from `sum(P) - sum(N) = target` get `sum(P) = (total + target)/2`.

**Complexity:** Time `O(n * target)`, space `O(target)`.

**Traps:** Loop direction (down vs up) is the #1 bug; Coin Change II coin-outer order; Target Sum returns 0 if `(total + target)` is odd or negative.

## Decision table

| If you see… | Loop / state |
|-------------|--------------|
| Each item at most once | 0/1 — inner loop downward |
| Coins reusable | Unbounded — inner loop upward |
| Number of combinations | Coin loop outer |
| Min coins to amount | `dp[a] = min coins for a` |
| Partition / Target Sum | Subset sum to `total/2` or `(total+target)/2` |

## Coin Change

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

## Coin Change II (Number of Ways)

How many ways to make the amount? Do not count order — keep the coin loop outer.

[Coin Change II](https://leetcode.com/problems/coin-change-2/)

```js
// Time: O(n·amount) · Space: O(amount)
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

## Partition Equal Subset Sum

Can I pick a subset that sums to total/2? 0/1 knapsack on a boolean array.

[Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

```js
// Time: O(n·sum) · Space: O(sum)
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

## Target Sum

Assign + or - before each number to hit target — how many ways? Reduce to subset sum: `sum(P) = (total + target) / 2`, then 0/1 counting knapsack.

[Target Sum](https://leetcode.com/problems/target-sum/)

```js
// Time: O(n·sum) · Space: O(sum)
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
