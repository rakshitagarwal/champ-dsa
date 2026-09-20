# Dynamic Programming

**Definition:** DP breaks a problem into smaller overlapping subproblems. First say in English what `dp[state]` means ("best / ways / count up to i"), then reuse the saved answer. Two styles: top-down memo (recurse + cache) and bottom-up tabulation (loops).

**When to use:** The same `(i, remain, index)` is reached many times — stairs/robber, coins/knapsack, grid paths, LCS/LIS/edit, interval (burst).

**How it works:** Define meaning → write recurrence `dp[i] = f(earlier states)` → set base → fill by loop. Use `dp[i][j]` in 2D. If the recurrence is local, optimize space with the last row or a few variables. Time often `O(n * choices)`; space `O(n)`.

## Study order (DP family)

| Step | Page | You can answer aloud |
|------|------|----------------------|
| 1 | **This page** — what DP is + skeletons | Define state in English; memo vs tabulation |
| 2 | [1D / Linear DP](/patterns/dp-linear) | Stairs, robber, decode, word break |
| 3 | [Knapsack DP](/patterns/dp-knapsack) | Coins, partition, target sum; 0/1 vs unbounded |
| 4 | [2D DP](/patterns/dp-2d) | LCS/edit, grid paths, LIS, interval |

Like Graphs → Topo / Shortest / MST / UF, the DP family is Linear → Knapsack → 2D.

## Active revision (3 passes)

1. **Learn:** Read skeletons + decision table on this page.
2. **Recall:** Without notes — "take/skip + capacity"? "two strings"? "only previous 1–2"? → which page?
3. **Apply:** Open the type page, say the state in English, then code.

**Blank checklist (every DP problem):**
1. What is `dp[state]` in English? (ways / min / max / true-false)
2. Transition — which earlier states?
3. Base cases?
4. Is loop order (dependency) correct?
5. 0/1 vs unbounded? (knapsack only)
6. Answer is which cell / max over cells?

## Decision table (pick the type)

| If you see… | Open |
|-------------|------|
| Walk a sequence; answer from previous 1–2 cells | [1D / Linear](/patterns/dp-linear) |
| Take/skip an item; capacity / amount / subset | [Knapsack](/patterns/dp-knapsack) |
| Compare two strings; LCS / edit / LPS | [2D DP](/patterns/dp-2d) |
| Grid paths right/down | [2D DP](/patterns/dp-2d) (grid) |
| LIS ending at i; envelopes | [2D DP](/patterns/dp-2d) (LIS) |
| Interval "who is last" (burst) | [2D DP](/patterns/dp-2d) (interval) |
| Local choice always safe | Greedy page — do not force DP |

## Study notes

- **Always:** define `dp[state]` in English first.
- **Top-down:** recurse + `memo`. **Bottom-up:** loop in dependency order.
- **Vs greedy:** local choice can fail → DP.
- **Traps:** wrong base; knapsack loop direction; Infinity sentinel; 2D off-by-one (`s[i-1]` vs `dp[i]`).
- **Complexity cheat:** 1D often `O(n)`; knapsack `O(n·W)`; 2D string/grid `O(m·n)`; LIS `O(n²)` (or `O(n log n)` length); interval `O(n³)`.

```js
// DP skeleton — bottom-up tabulation
const dp = Array(n + 1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++) {
  dp[i] = combine(dp[i - 1], dp[i - 2] /* ... */);
}
return dp[n];

// Memo skeleton (top-down)
const memo = new Map();
function solve(i, remain) {
  const key = i + "," + remain;
  if (memo.has(key)) return memo.get(key);
  if (isBase(i, remain)) return baseVal;
  let best = -Infinity;
  for (const choice of choices) {
    best = Math.max(best, solve(next, remain - choice) + gain);
  }
  memo.set(key, best);
  return best;
}
```

**Remember:** State in English → recurrence → base → fill. Pick the right page from the decision table first.
