# Greedy

**Definition:** Greedy har step pe jo sabse locally best lage wahi choice le leta hai (sabse jaldi khatam, sabse door jump, sabse bada gap) aur kabhi peeche mudke nahi sochta. Tabhi kaam karta hai jab ye local choice global optimum ko kharab na kare (greedy-choice property) aur problem me optimal substructure ho.

**When to use:** Ek key par sort karke single left-to-right pass me jawab mile — Jump Game, Gas Station, Partition Labels, Task Scheduler. Agar prove nahi kar pa rahe ki greedy safe hai, to shayad DP hai.

**How it works:** Decisive key par sort karo, fir ek scan me best state maintain karo (`reach`, `end`, `tank`, `last`). Time `O(n log n)` sort + `O(n)` scan; space `O(1)`.

```js
// Greedy skeleton — sort by key, then one pass
// sort once, then one greedy scan keeping the best
items.sort(byKey); // e.g. end time ya position se
let last = sentinel; // best-so-far state (reach, end, fuel, etc.)
for (const x of items) {
  if (canTake(x, last)) last = take(x); // greedy choice is valid — take it
}

// Concrete example — farthest reach (Jump Game)
// jahan tak pahuch sakte ho, wahi track do
let reach = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > reach) break; // cannot reach index i — stop early
  reach = Math.max(reach, i + nums[i]);
}
```
## Jump Game

I track the farthest index I can still reach. If I walk past that, I am stuck.

[Jump Game](https://leetcode.com/problems/jump-game/)

```js
// LC: https://leetcode.com/problems/jump-game/
// move target left when i can reach it
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let target = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (i + nums[i] >= target) {
            target = i;
        }
    }
    return target === 0;
};
```

## Jump Game II

I jump in windows: current end of this jump, farthest I can see. When i hits the end, I must jump, and the new end is that farthest.

[Jump Game II](https://leetcode.com/problems/jump-game-ii/)

```js
// BFS-style layers: each jump expands the window [0..end]
// LC: https://leetcode.com/problems/jump-game-ii/
function jump(nums) {
  let jumps = 0, end = 0, far = 0; // end = last index of current jump layer
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]); // Best reach seen inside this layer
    if (i === end) {
      jumps++; // Must consume one jump to leave this layer
      end = far; // Next layer ends at farthest we saw
    }
  }
  return jumps;
}
```

## Gas Station

If total gas < total cost, impossible. Otherwise the unique start is the station after the worst prefix (tank went negative, reset).

[Gas Station](https://leetcode.com/problems/gas-station/)

```js
// If total surplus >= 0, exactly one valid start exists
// LC: https://leetcode.com/problems/gas-station/
function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0; // tank = surplus on current candidate start
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i]; // Net at station i
    total += d; // Global feasibility check
    tank += d;
    if (tank < 0) {
      start = i + 1; // Cannot start at or before i — try next index
      tank = 0; // Reset partial circuit surplus
    }
  }
  return total < 0 ? -1 : start; // Negative total means impossible
}
```

## Partition Labels

Last index of each letter. Grow `end` to that last index while I scan. When i hits end, that is one part.

[Partition Labels](https://leetcode.com/problems/partition-labels/)

```js
// A partition must include every last occurrence of letters seen so far
// LC: https://leetcode.com/problems/partition-labels/
function partitionLabels(s) {
  const last = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i; // Rightmost index per letter
  const out = [];
  let start = 0, end = 0; // Current partition bounds
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]); // Extend end to cover this letter's last spot
    if (i === end) {
      out.push(end - start + 1); // Closed a valid partition
      start = i + 1; // Next partition starts after i
    }
  }
  return out;
}
```

## Task Scheduler

Count the most frequent task. I need `(maxFreq - 1) * (n + 1) + howManyHaveMaxFreq` slots, or just tasks.length if that is bigger (the idle formula can undercount when the array is packed).

[Task Scheduler](https://leetcode.com/problems/task-scheduler/)

```js
// Frame idle slots around the most frequent task — or tasks fill naturally
// LC: https://leetcode.com/problems/task-scheduler/
function leastInterval(tasks, n) {
  const freq = Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++; // Count each letter
  freq.sort((a, b) => b - a); // Descending frequencies
  const max = freq[0]; // Highest task count
  let extra = 0;
  for (const f of freq) if (f === max) extra++; // How many tasks tie for max freq
  return Math.max(tasks.length, (max - 1) * (n + 1) + extra); // Idle formula vs packed schedule
}
```

## Minimum Number of Arrows to Burst Balloons

Balloon = interval. End se sort karo, ek arrow jahan tak cover kare rakho.

[Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

```js
// Same greedy as non-overlapping intervals — arrow position = last end in a cluster
// LC: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
function findMinArrowShots(points) {
  points.sort((a,b)=>a[1]-b[1]); // Earliest finishing balloons first
  let arrows=0, last=-Infinity; // last = x-coordinate of last arrow placed
  for(const [s,e] of points){
    if(s>last){ arrows++; last=e; } // Balloon starts after last arrow — need new arrow at e
    // else balloon covered by arrow at last
  }
  return arrows;
}
```

## Lemonade Change

5,10,20 notes. Greedy: 20 aaye to 10+5 do, nahi to 5+5+5.

[Lemonade Change](https://leetcode.com/problems/lemonade-change/)

```js
// LC: https://leetcode.com/problems/lemonade-change/
function lemonadeChange(bills) {
  let five=0, ten=0; // Count of $5 and $10 bills in drawer
  for(const b of bills){
    if(b===5) five++; // Customer pays exact — no change
    else if(b===10){ if(!five) return false; five--; ten++; } // Need one $5 as change
    else { // $20 bill
      if(ten && five){ ten--; five--; } // Best: $10 + $5 change
      else if(five>=3) five-=3; // Fallback: three $5 bills
      else return false; // Cannot make $15 change
    }
  }
  return true;
}
```

## Valid Parenthesis String (with *)

`*` ko `(`, `)` ya empty maan sakte hain. Greedy range `low..high` open count ka.

[Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/)

```js
// LC: https://leetcode.com/problems/valid-parenthesis-string/
function checkValidString(s) {
  // low = min open, high = max open
  let low=0, high=0;
  for(const ch of s){
    if(ch==='('){ low++; high++; }
    else if(ch===')'){ low=Math.max(0, low-1); high--; }
    else { // *
      low=Math.max(0, low-1); high++; // '*' matches empty or one extra char
    }
    if(high<0) return false; // too many closing parentheses
  }
  return low===0;
}
```
