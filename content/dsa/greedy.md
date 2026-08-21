# Greedy

Sort or scan, take the locally best choice that you can prove is safe. If you cannot prove it, it is probably DP.

```js
// Greedy skeleton
items.sort(byKey);
let last = sentinel;
for (const x of items) {
  if (canTake(x, last)) last = take(x);
}
```

## Jump Game

Farthest reach so far — [Jump Game](https://leetcode.com/problems/jump-game/).

```js
// Greedy — running max reach
// LC: https://leetcode.com/problems/jump-game/
function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false; // stuck
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
```

## Non-overlapping Intervals

Earliest finish time — [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/).

```js
// Greedy — sort by end, take if no overlap
// LC: https://leetcode.com/problems/non-overlapping-intervals/
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let kept = 0, end = -Infinity;
  for (const [s, e] of intervals) {
    if (s >= end) {
      kept++;
      end = e;
    }
  }
  return intervals.length - kept;
}
```

## Gas Station

If total gas < total cost, impossible. Otherwise start after the worst deficit — [Gas Station](https://leetcode.com/problems/gas-station/).

```js
// Greedy — unique start if total is enough
// LC: https://leetcode.com/problems/gas-station/
function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i];
    total += d;
    tank += d;
    if (tank < 0) {
      start = i + 1; // cannot start anywhere in [old start..i]
      tank = 0;
    }
  }
  return total < 0 ? -1 : start;
}
```

**More:** [Jump Game II](https://leetcode.com/problems/jump-game-ii/), [Assign Cookies](https://leetcode.com/problems/assign-cookies/), [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (Kadane is greedy-shaped DP).
