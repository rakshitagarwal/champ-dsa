# Greedy

A greedy algorithm makes the locally optimal choice at each step, hoping that these local decisions lead to a globally optimal solution. Greedy works when a problem exhibits **optimal substructure** (the optimal solution contains optimal solutions to subproblems) and the **greedy choice property** (a locally optimal choice is always part of some globally optimal solution). Proving these two properties — often via an exchange argument or induction — is essential before using a greedy approach.

Greedy is appealing because it is usually simple to implement and runs in O(n log n) or less. Common greedy patterns include: always pick the interval that ends earliest (activity selection), always pick the largest coin denomination (canonical coin systems), always extend the furthest reachable point (jump games), and always serve the smallest/shortest task first (scheduling). However, greedy is not always correct — problems like the knapsack or non-canonical coin change require dynamic programming instead.

![Greedy — interval scheduling and patterns](/images/dsa/greedy.svg)

## When to use

- Interval scheduling and activity selection (sort by end time, pick non-overlapping)
- Problems where "more is better" and choices do not block better future options
- Finding minimum or maximum with a monotonic decision rule (e.g., always jump as far as possible)
- Minimum spanning tree (Kruskal, Prim), Huffman encoding, Dijkstra's shortest path
- Coin change **only when the coin system is canonical** (e.g., US denominations)
- Gas station / circular tour problems with cumulative deficit tracking

## How it works

### Core concept

The greedy paradigm differs from DP in that it never revisits or revises a decision. At every step, it evaluates the current state, selects the best immediate option according to a fixed criterion, and commits to it permanently. The correctness proof typically uses an **exchange argument**: show that if an optimal solution differs from the greedy solution at the first decision point, you can swap the greedy choice into the optimal solution without making it worse. By induction, the greedy solution is optimal.

For example, in interval scheduling, sorting by end time and always picking the earliest-finishing interval is optimal because any optimal solution can have its first interval swapped for the one that finishes earliest without reducing the total count.

### Step-by-step approach

1. **Identify the greedy choice:** Determine the local decision rule (e.g., "pick the smallest end time," "jump to the furthest index," "use the largest coin"). This is the most critical step — the wrong rule leads to a suboptimal result.
2. **Sort or preprocess:** Most greedy algorithms require sorting the input by the chosen criterion (end time, start time, ratio, etc.) in O(n log n).
3. **Iterate and commit:** Traverse the sorted data once, applying the greedy choice to build the solution. Track the state needed for future decisions (e.g., the current end time of the last selected interval, the furthest reachable index, the cumulative gas deficit).
4. **Validate optimality:** After implementation, test with edge cases — equal values, negative inputs, single elements — to ensure the greedy rule holds universally. If a counterexample exists, switch to DP.
5. **Return the result:** The accumulated state or the length of the selected set is the answer.

### Complexity

- **Time:** O(n log n) for sorting plus O(n) for the greedy pass; some problems are O(n) if the data is already ordered
- **Space:** O(1) or O(n) depending on whether sorting in-place or storing selections

```js
// Jump Game — greedy max-reach
function canJump(nums) {
  let reachable = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reachable) return false;
    reachable = Math.max(reachable, i + nums[i]);
  }
  return true;
}

// Activity Selection — maximum non-overlapping intervals
function eraseOverlapIntervals(intervals) {
  if (!intervals.length) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 1, end = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= end) {
      count++;
      end = intervals[i][1];
    }
  }
  return intervals.length - count;
}

// Gas Station — find start index for circular tour
function canCompleteCircuit(gas, cost) {
  let total = 0, cur = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    cur += diff;
    if (cur < 0) { start = i + 1; cur = 0; }
  }
  return total >= 0 ? start : -1;
}
```

## Variations

- **Interval Scheduling Maximization (Non-overlapping Intervals):** Sort by end time and greedily select intervals whose start >= the last selected end time. Minimise removals to make intervals non-overlapping.
- **Jump Game II (minimum jumps):** Track the current reach and the next reach in a BFS-like greedy pass. At each step, if `i` passes the current reach, increment the jump counter and set current reach = next reach.
- **Canonical Coin Change:** In the US coin system (1, 5, 10, 25), always using the largest coin ≤ remaining amount yields the optimal minimum coin count. Non-canonical systems (e.g., 1, 3, 4) require DP.
- **Assign Cookies:** Sort both greed factors and cookie sizes. Greedily assign the smallest cookie that satisfies each child's minimum greed factor. This minimises waste and maximises content children.
- **Two City Scheduling:** Compute the cost difference between sending to city A vs B for each person. Sort by this difference and send the first half to A, the second half to B. The greedy choice is the net gain per person.

## Edge cases

- **Empty input:** Return 0, false, or an empty array depending on the problem. Always guard against length-0 or null input.
- **Single element:** The greedy choice applies trivially — the result is either the element itself or a predefined value.
- **All elements equal / tie-breaking:** Greedy rules must handle ties deterministically. For interval problems, if two intervals have the same end time, any choice is equally valid.
- **No valid solution:** In Gas Station, if `total < 0`, no starting point works — return -1. The greedy start-point selection handles this by resetting at each deficit.
- **Negative or zero values:** Jump Game handles 0 values correctly (they terminate reachability). Activity Selection works fine with intervals of zero length.
- **Large n:** Greedy's O(n log n) sorting is usually acceptable, but if the data can be pre-sorted or if the key range is small, consider counting sort to achieve O(n).

## Practice problems

- [Jump Game](https://leetcode.com/problems/jump-game/) — Greedy max-reach tracking
- [Jump Game II](https://leetcode.com/problems/jump-game-ii/) — BFS-like greedy for minimum jumps
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) — Activity selection (sort by end, count removals)
- [Gas Station](https://leetcode.com/problems/gas-station/) — Greedy start-point selection with deficit tracking
- [Assign Cookies](https://leetcode.com/problems/assign-cookies/) — Greedy smallest-cookie assignment
- [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) — Sort by cost difference
- [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) — Sort by end, shoot arrows at the earliest possible overlap point
- [Candy](https://leetcode.com/problems/candy/) — Two-pass greedy giving more candies to higher-rated neighbours
- [Partition Labels](https://leetcode.com/problems/partition-labels/) — Greedy interval merging based on last occurrence of each character
