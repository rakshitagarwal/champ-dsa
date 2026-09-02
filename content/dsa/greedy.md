# Greedy

**Definition:** Greedy har step pe jo sabse locally best lage wahi choice le leta hai (sabse jaldi khatam, sabse door jump, sabse bada gap) aur kabhi peeche mudke nahi sochta. Tabhi kaam karta hai jab ye local choice global optimum ko kharab na kare (greedy-choice property) aur problem me optimal substructure ho.

**When to use:** Ek key par sort karke single left-to-right pass me jawab mile — Jump Game, Gas Station, Partition Labels, Task Scheduler. Agar prove nahi kar pa rahe ki greedy safe hai, to shayad DP hai.

**How it works:** Decisive key par sort karo, fir ek scan me best state maintain karo (`reach`, `end`, `tank`, `last`). Time `O(n log n)` sort + `O(n)` scan; space `O(1)`.

```js
// Greedy skeleton — sort by key, then one pass
// Hinglish: pehle sort, fir ek baar scan karke best rakho
items.sort(byKey); // e.g. end time ya position se
let last = sentinel; // ab tak ka best (reach, end, tank …)
for (const x of items) {
  if (canTake(x, last)) last = take(x); // safe hai to le lo
}

// Concrete example — farthest reach (Jump Game)
// Hinglish: jahan tak pahuch sakte ho, wahi track karo
let reach = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > reach) break; // yahan tak aa hi nahi sakte
  reach = Math.max(reach, i + nums[i]);
}
```
## Jump Game

I track the farthest index I can still reach. If I walk past that, I am stuck.

[Jump Game](https://leetcode.com/problems/jump-game/)

```js
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — running max reach
// LC: https://leetcode.com/problems/jump-game/
function canJump(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — jumps by window
// LC: https://leetcode.com/problems/jump-game-ii/
function jump(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — unique start if total works
// LC: https://leetcode.com/problems/gas-station/
function canCompleteCircuit(gas, cost) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — last occurrence of each letter
// LC: https://leetcode.com/problems/partition-labels/
function partitionLabels(s) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — idle from the most frequent task
// LC: https://leetcode.com/problems/task-scheduler/
function leastInterval(tasks, n) {
  // Hinglish: step 1 — base case check karo
  const freq = Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const max = freq[0];
  let extra = 0;
  for (const f of freq) if (f === max) extra++;
  return Math.max(tasks.length, (max - 1) * (n + 1) + extra);
}
```
