# Greedy

Make the locally optimal choice at each step, hoping it leads to the globally optimal solution. Greedy works when a problem has optimal substructure and the greedy choice property.

## When to use
- Interval scheduling, coin change (canonical systems), activity selection
- Problems where "more is better" and choices don't block better future options
- Minimum spanning tree, Huffman encoding, Dijkstra's algorithm

## How it works

Sort or iterate in a specific order and commit to the best immediate decision without backtracking. Prove correctness by exchange argument or induction — if a local swap never worsens the solution, the greedy is optimal.

```js
function canJump(nums) {
  let reachable = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reachable) return false;
    reachable = Math.max(reachable, i + nums[i]);
  }
  return true;
}
```

## Practice problems
- [Jump Game](https://leetcode.com/problems/jump-game/) — Greedy max-reach tracking
- [Jump Game II](https://leetcode.com/problems/jump-game-ii/) — BFS-like greedy for minimum jumps
- [Activity Selection](https://leetcode.com/problems/non-overlapping-intervals/) — Pick the interval that finishes earliest (sort by end)
- [Gas Station](https://leetcode.com/problems/gas-station/) — Greedy start-point selection with deficit tracking
