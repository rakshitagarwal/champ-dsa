# Greedy

**Definition:** A greedy algorithm builds a solution step-by-step by picking the *locally optimal* choice at each step (earliest finish time, farthest jump, largest gap) and never revisits it. It works only when a *greedy-choice property* holds — the local choice can be proven never to hurt the global optimum — and the problem has *optimal substructure*.

**When to use:** You can sort by a key (earliest end, smallest cost) and a single left-to-right pass yields the answer (Jump Game, Gas Station, Partition Labels, Task Scheduler). If you cannot prove the greedy choice is safe, it is probably DP/backtracking instead.

**How it works:** Sort by the decisive key, then scan once maintaining the best state so far (`reach`, `end`, `tank`, `last`). Time is `O(n log n)` for sort + `O(n)` scan; space `O(1)`.

```js
// Greedy skeleton — sort by key, then one pass
items.sort(byKey); // e.g. by end time, by position
let last = sentinel; // best state so far (reach, end, tank …)
for (const x of items) {
  if (canTake(x, last)) last = take(x); // take if safe
}

// Concrete example — farthest reach (Jump Game)
let reach = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > reach) break; // cannot get here
  reach = Math.max(reach, i + nums[i]);
}
```

## Jump Game

I track the farthest index I can still reach. If I walk past that, I am stuck.

[Jump Game](https://leetcode.com/problems/jump-game/)

```js
// Greedy — running max reach
// LC: https://leetcode.com/problems/jump-game/
function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
```

## Jump Game II

I jump in windows: current end of this jump, farthest I can see. When i hits the end, I must jump, and the new end is that farthest.

[Jump Game II](https://leetcode.com/problems/jump-game-ii/)

```js
// Greedy — jumps by window
// LC: https://leetcode.com/problems/jump-game-ii/
function jump(nums) {
  let jumps = 0, end = 0, far = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    if (i === end) {
      jumps++;
      end = far;
    }
  }
  return jumps;
}
```

## Gas Station

If total gas < total cost, impossible. Otherwise the unique start is the station after the worst prefix (tank went negative, reset).

[Gas Station](https://leetcode.com/problems/gas-station/)

```js
// Greedy — unique start if total works
// LC: https://leetcode.com/problems/gas-station/
function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i];
    total += d;
    tank += d;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total < 0 ? -1 : start;
}
```

## Partition Labels

Last index of each letter. Grow `end` to that last index while I scan. When i hits end, that is one part.

[Partition Labels](https://leetcode.com/problems/partition-labels/)

```js
// Greedy — last occurrence of each letter
// LC: https://leetcode.com/problems/partition-labels/
function partitionLabels(s) {
  const last = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i;
  const out = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]);
    if (i === end) {
      out.push(end - start + 1);
      start = i + 1;
    }
  }
  return out;
}
```

## Task Scheduler

Count the most frequent task. I need `(maxFreq - 1) * (n + 1) + howManyHaveMaxFreq` slots, or just tasks.length if that is bigger (the idle formula can undercount when the array is packed).

[Task Scheduler](https://leetcode.com/problems/task-scheduler/)

```js
// Greedy — idle from the most frequent task
// LC: https://leetcode.com/problems/task-scheduler/
function leastInterval(tasks, n) {
  const freq = Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const max = freq[0];
  let extra = 0;
  for (const f of freq) if (f === max) extra++;
  return Math.max(tasks.length, (max - 1) * (n + 1) + extra);
}
```
