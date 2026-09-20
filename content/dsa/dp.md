# Dynamic Programming

**Definition:** DP problem ko chhote overlapping subproblems me todta hai, `dp[state]` ka matlab pehle English me socho ("i tak ka best/ways/count"), fir saved answer reuse karo. Do tarike: top-down memo (recurse + cache) aur bottom-up tabulation (loop).

**When to use:** Same `(i, remain, index)` par baar-baar recurse — stairs/robber, coins/knapsack, grid paths, LCS/LIS/edit, interval (burst).

**How it works:** Meaning define karo → recurrence `dp[i] = f(pichhle)` → base → loop. 2D me `dp[i][j]`. Local recurrence ho to last row se space optimize. Time aksar `O(n * choices)`, space `O(n)`.

## Study order (DP family)

| Step | Page | You can answer aloud |
|------|------|----------------------|
| 1 | **This page** — what DP is + skeletons | Define state in English; memo vs tabulation |
| 2 | [1D / Linear DP](/patterns/dp-linear) | Stairs, robber, decode, word break |
| 3 | [Knapsack DP](/patterns/dp-knapsack) | Coins, partition, target sum; 0/1 vs unbounded |
| 4 | [2D DP](/patterns/dp-2d) | LCS/edit, grid paths, LIS, interval |

Jaise Graphs → Topo / Shortest / MST / UF, waise DP → Linear → Knapsack → 2D.

## Active revision (3 passes)

1. **Learn:** Is page pe skeletons + decision table padho.
2. **Recall:** Bina notes — "lu ya chhodo + capacity"? "do strings"? "sirf pichhle 1–2"? → kaunsa page?
3. **Apply:** Type page kholo, ek problem pe state English me bolo, phir code.

**Blank checklist (har DP problem):**
1. `dp[state]` English me kya hai? (ways / min / max / true-false)
2. Transition — pichhle kaunse states?
3. Base cases?
4. Loop order (dependency) sahi hai?
5. 0/1 vs unbounded? (knapsack only)
6. Answer `dp` ki kaunsi cell / max over cells?

## Decision table (type pehchano)

| Agar dikhe… | Open |
|-------------|------|
| Sequence pe aage badho; answer pichhle 1–2 se | [1D / Linear](/patterns/dp-linear) |
| Item lu/chhodo; capacity / amount / subset | [Knapsack](/patterns/dp-knapsack) |
| Do strings compare; LCS / edit / LPS | [2D DP](/patterns/dp-2d) |
| Grid right/down paths | [2D DP](/patterns/dp-2d) (grid) |
| LIS ending at i; envelopes | [2D DP](/patterns/dp-2d) (LIS) |
| Interval me "aakhri kaun" (burst) | [2D DP](/patterns/dp-2d) (interval) |
| Local choice always safe | Greedy page — DP mat force karo |

## Study notes

- **Always:** `dp[state]` pehle English.
- **Top-down:** recurse + `memo`. **Bottom-up:** dependency order me loop.
- **Vs greedy:** local choice fail ho sakta hai → DP.
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

**Yaad rakho:** State English → recurrence → base → fill. Type galat page pe mat jao — pehle decision table.
