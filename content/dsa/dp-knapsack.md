# Knapsack DP

**Definition:** Har item pe **lu ya chhodo** (ya kitni baar lu), capacity/target limited. Subset sum, coin change, partition — ek family.

**When to use:** Coins, partition equal subset, target sum (+/-), 0/1 knapsack. "Capacity + choice" dikhe to yahan.

**How it works:** `dp[s]` = possible / min coins / ways for sum `s`. **0/1:** inner loop **ulta** (item ek baar). **Unbounded:** inner **seedha** (reuse). Ways (combinations): coin loop **bahar**.

**See also:** Hub [DP](/patterns/dp). Linear sequence → [1D DP](/patterns/dp-linear).

## Active revision

1. Draw 0/1 vs unbounded loop direction.
2. Coin Change II: why coin-outer?
3. Target Sum → subset sum `(total+target)/2`.

**Blank checklist:** 0/1 or unbounded? min vs ways? target feasible (parity)?

## Study notes

**Pehchan:** Har item ke liye "lu ya chhodo" ka faisla, capacity/target limited hai. Subset sum, coin change, partition — sab isi parivaar ke hain.

**0/1 vs unbounded:** Har item ek baar (0/1) ya baar-baar (unbounded) — ye ek line poora code badal deti hai. 0/1 me inner loop **ulta** chalao (target se neeche) taaki item dobara use na ho. Unbounded me inner loop **seedha** chalao taaki reuse ho sake. Loop direction galat to 0/1 unbounded ban jaata hai — ye classic bug hai, interview me pakda jaata hai.

**Ways vs min:** Tareeke ginne hon (Coin Change II) to coin loop **bahar** rakho — warna permutations count ho jayengi. Min coins (Coin Change) me order se farak nahi padta.

**State:** `dp[s]` = target s possible? / min coins / tareeke. Partition me target = total/2. Target Sum ko subset-sum me badlo: sum(P) - sum(N) = target se `sum(P) = (total + target)/2`.

**Complexity:** Time `O(n * target)`, space `O(target)`.

**Traps:** Loop direction (ulta vs seedha) sabse aam bug; Coin Change II me coin-outer order; Target Sum me `(total + target)` odd ya negative ho to answer 0.

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

Kitne tareeke se amount banao? Order nahi count karna, coin loop bahar.

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

Har number ke aage + ya - lagake target banao — kitne tareeke? Subset-sum me badlo: `sum(P) = (total + target) / 2`, fir 0/1 count wala knapsack.

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

