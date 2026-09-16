import type { SolutionGroup } from "./types";

export const DYNAMIC_PROGRAMMING_SOLUTIONS: SolutionGroup = {
  id: "dynamic-programming",
  title: "Dynamic Programming",
  subs: [
    {
      title: "1D DP",
      topics: [
    {
      id: 70,
      lcSlug: "climbing-stairs",
      title: "Climbing Stairs",
      diff: "Easy",
      body: `Ways to reach i = ways to i-1 + ways to i-2.

[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

\`\`\`js
// dp[i] = ways to reach step i; recurrence dp[i]=dp[i-1]+dp[i-2]
function climbStairs(n) {
  if (n <= 2) return n; // 1→1 way, 2→2 ways
  let a = 1, b = 2; // ways for i-2 and i-1
  for (let i = 3; i <= n; i++) {
    const c = a + b; // ways to reach i
    a = b; // slide window forward
    b = c;
  }
  return b; // ways to reach n
}
\`\`\``,
    },
    {
      id: 198,
      lcSlug: "house-robber",
      title: "House Robber",
      diff: "Medium",
      body: `At each house: rob it (then I skipped the previous) or skip it. Two variables are enough.

[House Robber](https://leetcode.com/problems/house-robber/)

\`\`\`js
// prev1 = best if we end at prev house; prev2 = best two houses back
// LC: https://leetcode.com/problems/house-robber/
function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x); // rob x vs skip x
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
\`\`\``,
    },
    {
      id: 213,
      lcSlug: "house-robber-ii",
      title: "House Robber II",
      diff: "Medium",
      body: `Houses are circular, so first and last cannot both be robbed. Take the max of robbing \`[0..n-2]\` or \`[1..n-1]\`.

[House Robber II](https://leetcode.com/problems/house-robber-ii/)

\`\`\`js
// Circular: max of robbing [0..n-2] or [1..n-1] (one end excluded)
// LC: https://leetcode.com/problems/house-robber-ii/
function rob2(nums) {
  if(nums.length===1) return nums[0];
  const robRange=(l,r)=>{
    let prev2=0, prev1=0; // rolling max excluding prev house
    for(let i=l;i<=r;i++){
      const cur=Math.max(prev1, prev2+nums[i]); // rob i or skip i
      prev2=prev1; prev1=cur; // shift window
    }
    return prev1;
  };
  // Cannot rob both ends — best of excluding first or last house
  return Math.max(robRange(0, nums.length-2), robRange(1, nums.length-1));
}
\`\`\``,
    },
    {
      id: 746,
      lcSlug: "min-cost-climbing-stairs",
      title: "Min Cost Climbing Stairs",
      diff: "Easy",
      body: `\`dp[i]\` is min cost to reach step \`i\`; each step you may advance 1 or 2 stairs, but you cannot step past the top.

[Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

\`\`\`js
// dp[i] = min cost to stand on step i (can start at 0 or 1 for free)
// LC: https://leetcode.com/problems/min-cost-climbing-stairs/
function minCostClimbingStairs(cost) {
  const n = cost.length;
  let a = 0, b = 0; // dp at i-2 and i-1
  for (let i = 2; i <= n; i++) {
    const c = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = c;
  }
  return b; // top beyond last index
}
\`\`\``,
    },
    {
      id: 91,
      lcSlug: "decode-ways",
      title: "Decode Ways",
      diff: "Medium",
      body: `\`dp[i]\` = ways to decode first i chars. One digit 1-9, or two digits 10-26.

[Decode Ways](https://leetcode.com/problems/decode-ways/)

\`\`\`js
// dp[i] = ways to decode prefix s[0..i-1]
// LC: https://leetcode.com/problems/decode-ways/
function numDecodings(s) {
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1; // empty prefix
  for (let i = 1; i <= n; i++) {
    if (s[i - 1] !== "0") dp[i] += dp[i - 1]; // single digit 1-9
    if (i >= 2) {
      const two = Number(s.slice(i - 2, i));
      if (two >= 10 && two <= 26) dp[i] += dp[i - 2]; // two digit 10-26
    }
  }
  return dp[n];
}
\`\`\``,
    },
    {
      id: 139,
      lcSlug: "word-break",
      title: "Word Break",
      diff: "Medium",
      body: `\`dp[i]\` = true if \`s.slice(0, i)\` can be split into dictionary words. Try every break j.

[Word Break](https://leetcode.com/problems/word-break/)

\`\`\`js
// dp[i] = can s[0..i-1] be segmented into dictionary words
// LC: https://leetcode.com/problems/word-break/
function wordBreak(s, wordDict) {
  const dict = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true; // last word is s[j..i-1]
        break;
      }
    }
  }
  return dp[s.length];
}
\`\`\``,
    },
    {
      id: 322,
      lcSlug: "coin-change",
      title: "Coin Change",
      diff: "Medium",
      body: `\`dp[a]\` = fewest coins to make amount a. Try each coin. Unbounded, so inner loop can reuse a coin.

[Coin Change](https://leetcode.com/problems/coin-change/)

\`\`\`js
// dp[a] = min coins to make amount a (unbounded coin reuse)
// LC: https://leetcode.com/problems/coin-change/
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
\`\`\``,
    },
    {
      id: 518,
      lcSlug: "coin-change-ii",
      title: "Coin Change II",
      diff: "Medium",
      body: `To count combinations (not order), put the coin loop outside the amount loop.

[Coin Change II](https://leetcode.com/problems/coin-change-ii/)

\`\`\`js
// Count combos: outer coin loop avoids permutations of same multiset
// LC: https://leetcode.com/problems/coin-change-2/
function change(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  }
  return dp[amount];
}
\`\`\``,
    },
    {
      id: 300,
      lcSlug: "longest-increasing-subsequence",
      title: "Longest Increasing Subsequence",
      diff: "Medium",
      body: `\`dp[i]\` = LIS ending at i. Check all j < i. Patience-sort binary search is faster; the O(n²) loop is the one I can explain in an interview without sweating.

[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

\`\`\`js
// dp[i] = LIS length ending at index i
// LC: https://leetcode.com/problems/longest-increasing-subsequence/
function lengthOfLIS(nums) {
  const dp = Array(nums.length).fill(1);
  let best = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    best = Math.max(best, dp[i]);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 416,
      lcSlug: "partition-equal-subset-sum",
      title: "Partition Equal Subset Sum",
      diff: "Medium",
      body: `Can I pick a subset that sums to total/2? 0/1 knapsack on a boolean array.

[Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

\`\`\`js
// Subset sum to target/2; reverse loop = each number used once
// LC: https://leetcode.com/problems/partition-equal-subset-sum/
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
\`\`\``,
    },
    {
      id: 377,
      lcSlug: "combination-sum-iv",
      title: "Combination Sum IV",
      diff: "Medium",
      body: `Order matters here: outer loop over target, inner over coins (opposite of combination counting).

[Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/)

\`\`\`js
// Permutation count: outer target loop (order of coins matters)
// LC: https://leetcode.com/problems/combination-sum-iv/
function combinationSum4(nums, target) {
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const x of nums) {
      if (x <= t) dp[t] += dp[t - x];
    }
  }
  return dp[target];
}
\`\`\``,
    },
    {
      id: 279,
      lcSlug: "perfect-squares",
      title: "Perfect Squares",
      diff: "Medium",
      body: `Each number is built from squares \`1 + j*j\`; same DP as coin change with square coin values.

[Perfect Squares](https://leetcode.com/problems/perfect-squares/)

\`\`\`js
// dp[i] = min squares summing to i (unbounded square "coins")
// LC: https://leetcode.com/problems/perfect-squares/
function numSquares(n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      const cand = dp[i - j * j] + 1;
      if (cand < dp[i]) dp[i] = cand;
    }
  }
  return dp[n];
}
\`\`\``,
    },
    {
      id: 983,
      lcSlug: "minimum-cost-for-tickets",
      title: "Minimum Cost For Tickets",
      diff: "Medium",
      body: `Walk days forward: on travel days pick the cheapest of 1/7/30-day passes; otherwise carry yesterday's cost.

[Minimum Cost For Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/)

\`\`\`js
// dp[d] = min cost to cover travel through day d
// LC: https://leetcode.com/problems/minimum-cost-for-tickets/
function mincostTickets(days, costs) {
  const travel = new Set(days);
  const last = days[days.length - 1];
  const dp = Array(last + 1).fill(0);
  for (let d = 1; d <= last; d++) {
    if (!travel.has(d)) { dp[d] = dp[d - 1]; continue; } // no ticket needed today
    const one = dp[d - 1] + costs[0];
    const seven = dp[Math.max(0, d - 7)] + costs[1];
    const thirty = dp[Math.max(0, d - 30)] + costs[2];
    dp[d] = Math.min(one, seven, thirty);
  }
  return dp[last];
}
\`\`\``,
    },
    {
      id: 740,
      lcSlug: "delete-and-earn",
      title: "Delete and Earn",
      diff: "Medium",
      body: `Aggregate points by value, then run house robber on adjacent values (cannot take value \`i-1\` and \`i+1\`).

[Delete and Earn](https://leetcode.com/problems/delete-and-earn/)

\`\`\`js
// Reduce to house robber on value counts (cannot take adjacent values)
// LC: https://leetcode.com/problems/delete-and-earn/
function deleteAndEarn(nums) {
  let mx = 0;
  for (const x of nums) if (x > mx) mx = x;
  const pts = Array(mx + 1).fill(0);
  for (const x of nums) pts[x] += x;
  let prev2 = 0, prev1 = 0;
  for (let i = 0; i <= mx; i++) {
    const cur = Math.max(prev1, prev2 + pts[i]);
    prev2 = prev1; prev1 = cur;
  }
  return prev1;
}
\`\`\``,
    },
    {
      id: 413,
      lcSlug: "arithmetic-slices",
      title: "Arithmetic Slices",
      diff: "Medium",
      body: `Count consecutive differences of 1; each extension of a valid chain adds new arithmetic slices.

[Arithmetic Slices](https://leetcode.com/problems/arithmetic-slices/)

\`\`\`js
// cur = length of arithmetic run ending at i-1; adds cur new slices at i
// LC: https://leetcode.com/problems/arithmetic-slices/
function numberOfArithmeticSlices(nums) {
  let ans = 0, cur = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      cur++;
      ans += cur;
    } else cur = 0;
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
    {
      title: "2D / Grid DP",
      topics: [
    {
      id: 62,
      lcSlug: "unique-paths",
      title: "Unique Paths",
      diff: "Medium",
      body: `Only right and down. \`dp[c] += dp[c - 1]\` while scanning a row.

[Unique Paths](https://leetcode.com/problems/unique-paths/)

\`\`\`js
// dp[c] = paths to cell in current row; only right/down moves
// LC: https://leetcode.com/problems/unique-paths/
function uniquePaths(m, n) {
  const dp = Array(n).fill(1); // first row all 1
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) dp[c] += dp[c - 1]; // from left + from above
  }
  return dp[n - 1];
}
\`\`\``,
    },
    {
      id: 63,
      lcSlug: "unique-paths-ii",
      title: "Unique Paths II",
      diff: "Medium",
      body: `Obstacle cells stay 0; others sum paths from top and left. Seed the first row and column carefully.

[Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)

\`\`\`js
// dp[r][c] = paths to (r,c); obstacle cells contribute 0
// LC: https://leetcode.com/problems/unique-paths-ii/
function uniquePathsWithObstacles(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) { dp[r][c] = 0; continue; }
      if (r === 0 && c === 0) dp[r][c] = 1;
      else {
        const up = r > 0 ? dp[r - 1][c] : 0;
        const left = c > 0 ? dp[r][c - 1] : 0;
        dp[r][c] = up + left;
      }
    }
  }
  return dp[m - 1][n - 1];
}
\`\`\``,
    },
    {
      id: 64,
      lcSlug: "minimum-path-sum",
      title: "Minimum Path Sum",
      diff: "Medium",
      body: `Each cell adds \`grid[r][c]\` to the min of the cell above and left; accumulate the first row and column directly.

[Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

\`\`\`js
// dp[r][c] = min path sum to (r,c) moving only right/down
// LC: https://leetcode.com/problems/minimum-path-sum/
function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];
  for (let c = 1; c < n; c++) dp[0][c] = dp[0][c - 1] + grid[0][c];
  for (let r = 1; r < m; r++) dp[r][0] = dp[r - 1][0] + grid[r][0];
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = grid[r][c] + Math.min(dp[r - 1][c], dp[r][c - 1]);
    }
  }
  return dp[m - 1][n - 1];
}
\`\`\``,
    },
    {
      id: 120,
      lcSlug: "triangle",
      title: "Triangle",
      diff: "Medium",
      body: `Bottom-up: each cell takes the min of its two children below; one row of DP is enough.

[Triangle](https://leetcode.com/problems/triangle/)

\`\`\`js
// Bottom-up: dp[c] = min sum from (r,c) to base
// LC: https://leetcode.com/problems/triangle/
function minimumTotal(triangle) {
  const dp = [...triangle[triangle.length - 1]];
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) {
      dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]);
    }
  }
  return dp[0];
}
\`\`\``,
    },
    {
      id: 221,
      lcSlug: "maximal-square",
      title: "Maximal Square",
      diff: "Medium",
      body: `For each 1 cell, side length is 1 plus the min of top, left, and top-left neighbors.

[Maximal Square](https://leetcode.com/problems/maximal-square/)

\`\`\`js
// dp[r][c] = side length of largest square ending at (r,c)
// LC: https://leetcode.com/problems/maximal-square/
function maximalSquare(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
  let best = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      if (matrix[r - 1][c - 1] === "1") {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]);
        if (dp[r][c] > best) best = dp[r][c];
      }
    }
  }
  return best * best;
}
\`\`\``,
    },
    {
      id: 931,
      lcSlug: "minimum-falling-path-sum",
      title: "Minimum Falling Path Sum",
      diff: "Medium",
      body: `Each cell adds the min of three neighbors in the row above; answer is the min of the last row.

[Minimum Falling Path Sum](https://leetcode.com/problems/minimum-falling-path-sum/)

\`\`\`js
// dp[c] = min falling sum ending row r at column c
// LC: https://leetcode.com/problems/minimum-falling-path-sum/
function minFallingPathSum(matrix) {
  const n = matrix.length;
  const dp = matrix[0].slice();
  for (let r = 1; r < n; r++) {
    const next = Array(n);
    for (let c = 0; c < n; c++) {
      let best = dp[c];
      if (c > 0 && dp[c - 1] < best) best = dp[c - 1];
      if (c + 1 < n && dp[c + 1] < best) best = dp[c + 1];
      next[c] = matrix[r][c] + best;
    }
    for (let c = 0; c < n; c++) dp[c] = next[c];
  }
  return Math.min(...dp);
}
\`\`\``,
    },
    {
      id: 1277,
      lcSlug: "count-square-submatrices-with-all-ones",
      title: "Count Square Submatrices with All Ones",
      diff: "Medium",
      body: `Same as maximal square: each 1 extends side length; sum all side lengths for total count.

[Count Square Submatrices with All Ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)

\`\`\`js
// Same recurrence as maximal square; dp[r][c] counts squares ending here
// LC: https://leetcode.com/problems/count-square-submatrices-with-all-ones/
function countSquares(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
  let ans = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      if (matrix[r - 1][c - 1] === 1) {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]);
        ans += dp[r][c];
      }
    }
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 688,
      lcSlug: "knight-probability-in-chessboard",
      title: "Knight Probability in Chessboard",
      diff: "Medium",
      body: `Propagate probabilities over 8 knight moves; discard mass that leaves the board.

[Knight Probability in Chessboard](https://leetcode.com/problems/knight-probability-in-chessboard/)

\`\`\`js
// dp[r][c] = probability knight is on (r,c) after t moves
// LC: https://leetcode.com/problems/knight-probability-in-chessboard/
function knightProbability(n, k, row, column) {
  const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  let dp = Array.from({ length: n }, () => Array(n).fill(0));
  dp[row][column] = 1;
  for (let step = 0; step < k; step++) {
    const next = Array.from({ length: n }, () => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (dp[r][c] === 0) continue;
        for (const [dr, dc] of moves) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue; // probability leaves board
          next[nr][nc] += dp[r][c] / 8;
        }
      }
    }
    dp = next;
  }
  let ans = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) ans += dp[r][c];
  return ans;
}
\`\`\``,
    },
    {
      id: 576,
      lcSlug: "out-of-boundary-paths",
      title: "Out of Boundary Paths",
      diff: "Medium",
      body: `Count outbound paths per step with mod; memoize \`(row, col, moves left)\` to avoid recomputation.

[Out of Boundary Paths](https://leetcode.com/problems/out-of-boundary-paths/)

\`\`\`js
// Count paths that exit grid within maxMove steps (memo on state)
// LC: https://leetcode.com/problems/out-of-boundary-paths/
function findPaths(m, n, maxMove, startRow, startColumn) {
  const MOD = 1000000007;
  const memo = new Map();
  const dfs = (r, c, moves) => {
    if (r < 0 || c < 0 || r >= m || c >= n) return 1; // stepped out = success
    if (moves === 0) return 0;
    const key = r + "," + c + "," + moves;
    if (memo.has(key)) return memo.get(key);
    let ans = 0;
    ans += dfs(r + 1, c, moves - 1);
    ans += dfs(r - 1, c, moves - 1);
    ans += dfs(r, c + 1, moves - 1);
    ans += dfs(r, c - 1, moves - 1);
    ans %= MOD;
    memo.set(key, ans);
    return ans;
  };
  return dfs(startRow, startColumn, maxMove);
}
\`\`\``,
    },
    {
      id: 174,
      lcSlug: "dungeon-game",
      title: "Dungeon Game",
      diff: "Hard",
      body: `From bottom-right, each cell stores minimum health needed ahead; clamp to at least 1.

[Dungeon Game](https://leetcode.com/problems/dungeon-game/)

\`\`\`js
// dp[r][c] = min HP entering (r,c) to survive to princess
// LC: https://leetcode.com/problems/dungeon-game/
function calculateMinimumHP(dungeon) {
  const rows = dungeon.length, cols = dungeon[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(Infinity));
  dp[rows][cols - 1] = 1; dp[rows - 1][cols] = 1; // boundary padding
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = cols - 1; c >= 0; c--) {
      const need = Math.min(dp[r + 1][c], dp[r][c + 1]) - dungeon[r][c];
      dp[r][c] = need <= 0 ? 1 : need; // knight must stay alive (min 1 HP)
    }
  }
  return dp[0][0];
}
\`\`\``,
    },
      ],
    },
    {
      title: "Knapsack / Subsequences",
      topics: [
    {
      id: 1143,
      lcSlug: "longest-common-subsequence",
      title: "Longest Common Subsequence",
      diff: "Medium",
      body: `\`dp[i][j]\` = LCS of first i chars of text1 and first j of text2. Equal → diagonal + 1. Else max of skip either.

[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

\`\`\`js
// dp[i][j] = LCS length of a[0..i-1] and b[0..j-1]
// LC: https://leetcode.com/problems/longest-common-subsequence/
function longestCommonSubsequence(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 1035,
      lcSlug: "uncrossed-lines",
      title: "Uncrossed Lines",
      diff: "Medium",
      body: `Longest common subsequence on pairs of equal numbers; non-crossing lines require matching values in order.

[Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)

\`\`\`js
// Identical to LCS on the two arrays
// LC: https://leetcode.com/problems/uncrossed-lines/
function maxUncrossedLines(nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 516,
      lcSlug: "longest-palindromic-subsequence",
      title: "Longest Palindromic Subsequence",
      diff: "Medium",
      body: `Longest palindromic subsequence: LCS of the string and its reverse, or interval DP on \`dp[i][j]\`.

[Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)

\`\`\`js
// LPS length = LCS(s, reverse(s))
// LC: https://leetcode.com/problems/longest-palindromic-subsequence/
function longestPalindromeSubseq(s) {
  const t=[...s].reverse().join("");
  const n=s.length, dp=Array.from({length:n+1},()=>Array(n+1).fill(0));
  for(let i=1;i<=n;i++) for(let j=1;j<=n;j++){
    if(s[i-1]===t[j-1]) dp[i][j]=dp[i-1][j-1]+1;
    else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
  }
  return dp[n][n];
}
\`\`\``,
    },
    {
      id: 72,
      lcSlug: "edit-distance",
      title: "Edit Distance",
      diff: "Medium",
      body: `\`dp[i][j]\` = min ops to turn first i of word1 into first j of word2. Insert, delete, replace.

[Edit Distance](https://leetcode.com/problems/edit-distance/)

\`\`\`js
// dp[i][j] = edit distance between a[0..i-1] and b[0..j-1]
// LC: https://leetcode.com/problems/edit-distance/
function minDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i; // delete all from a
  for (let j = 0; j <= n; j++) dp[0][j] = j; // insert all into a
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 115,
      lcSlug: "distinct-subsequences",
      title: "Distinct Subsequences",
      diff: "Hard",
      body: `Count ways to build \`t\`: on match, add skip and take; use big integers or mod as required.

[Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

\`\`\`js
// dp[i][j] = ways to form t[0..j-1] as subsequence of s[0..i-1]
// LC: https://leetcode.com/problems/distinct-subsequences/
function numDistinct(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = 1; // empty t always once
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j]; // skip s[i-1]
      if (s[i - 1] === t[j - 1]) dp[i][j] += dp[i - 1][j - 1]; // use s[i-1]
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 97,
      lcSlug: "interleaving-string",
      title: "Interleaving String",
      diff: "Medium",
      body: `DP checks whether each prefix of \`s3\` comes from prefixes of \`s1\` and \`s2\`; extend from either string when chars match.

[Interleaving String](https://leetcode.com/problems/interleaving-string/)

\`\`\`js
// dp[i][j] = can s3[0..i+j-1] come from s1[0..i-1] and s2[0..j-1]
// LC: https://leetcode.com/problems/interleaving-string/
function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) continue;
      const k = i + j - 1;
      if (i > 0 && s1[i - 1] === s3[k] && dp[i - 1][j]) dp[i][j] = true;
      if (j > 0 && s2[j - 1] === s3[k] && dp[i][j - 1]) dp[i][j] = true;
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 474,
      lcSlug: "ones-and-zeroes",
      title: "Ones and Zeroes",
      diff: "Medium",
      body: `2D knapsack on counts of zeros and ones; maximize strings that fit both budgets.

[Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/)

\`\`\`js
// 2D 0/1 knapsack: dp[i][j] = max strings with i zeros and j ones used
// LC: https://leetcode.com/problems/ones-and-zeroes/
function findMaxForm(strs, m, n) {
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (const s of strs) {
    let z = 0;
    for (const ch of s) if (ch === "0") z++;
    const o = s.length - z;
    for (let i = m; i >= z; i--) {
      for (let j = n; j >= o; j--) {
        const cand = dp[i - z][j - o] + 1;
        if (cand > dp[i][j]) dp[i][j] = cand;
      }
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 494,
      lcSlug: "target-sum",
      title: "Target Sum",
      diff: "Medium",
      body: `Assign +/- signs: reduce to subset sum \`(total + target) / 2\`, then count 0/1 knapsack ways.

[Target Sum](https://leetcode.com/problems/target-sum/)

\`\`\`js
// Subset sum count: P - N = target => sum(P) = (total + target) / 2
// LC: https://leetcode.com/problems/target-sum/
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
\`\`\``,
    },
    {
      id: 1049,
      lcSlug: "last-stone-weight-ii",
      title: "Last Stone Weight II",
      diff: "Medium",
      body: `Split into two equal sums: subset sum to \`target/2\`, same as partition equal subset sum.

[Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/)

\`\`\`js
// Max subset sum <= total/2 minimizes collision remainder
// LC: https://leetcode.com/problems/last-stone-weight-ii/
function lastStoneWeightII(stones) {
  const total = stones.reduce((a, b) => a + b, 0);
  const target = Math.floor(total / 2);
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of stones) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
  }
  let best = 0;
  for (let s = target; s >= 0; s--) {
    if (dp[s]) { best = s; break; }
  }
  return total - 2 * best;
}
\`\`\``,
    },
    {
      id: 583,
      lcSlug: "delete-operation-for-two-strings",
      title: "Delete Operation for Two Strings",
      diff: "Medium",
      body: `Minimum deletions to make strings equal: \`m + n - 2 * LCS\`.

[Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)

\`\`\`js
// Min deletes = len1 + len2 - 2 * LCS (keep common subsequence)
// LC: https://leetcode.com/problems/delete-operation-for-two-strings/
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return m + n - 2 * dp[m][n];
}
\`\`\``,
    },
      ],
    },
    {
      title: "Advanced DP",
      topics: [
    {
      id: 10,
      lcSlug: "regular-expression-matching",
      title: "Regular Expression Matching",
      diff: "Hard",
      body: `For regex \`*\`, zero matches skip a char; one-or-more continues on the same row in the DP table.

[Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)

\`\`\`js
// dp[i][j] = s[0..i-1] matches p[0..j-1]; * repeats previous pattern char
// LC: https://leetcode.com/problems/regular-expression-matching/
function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2]; // a* matches empty
  }
  const same = (a, b) => b === "." || a === b;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2]; // take zero repeats
        if (same(s[i - 1], p[j - 2])) dp[i][j] = dp[i][j] || dp[i - 1][j]; // one more repeat
      } else if (same(s[i - 1], p[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 44,
      lcSlug: "wildcard-matching",
      title: "Wildcard Matching",
      diff: "Hard",
      body: `Same as wildcard matching: \`?\` is one char, \`*\` is zero or more; DP is the safe interview approach.

[Wildcard Matching](https://leetcode.com/problems/wildcard-matching/)

\`\`\`js
// dp[i][j] = prefix match; * eats any sequence including empty
// LC: https://leetcode.com/problems/wildcard-matching/
function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1];
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  return dp[m][n];
}
\`\`\``,
    },
    {
      id: 312,
      lcSlug: "burst-balloons",
      title: "Burst Balloons",
      diff: "Hard",
      body: `Interval DP. \`dp[l][r]\` = best coins bursting balloons strictly inside (l, r). Last balloon k in that gap scores \`nums[l] * nums[k] * nums[r]\`. Pad the array with 1s.

[Burst Balloons](https://leetcode.com/problems/burst-balloons/)

\`\`\`js
// dp[l][r] = max coins bursting balloons strictly between l and r (exclusive)
// LC: https://leetcode.com/problems/burst-balloons/
function maxCoins(nums) {
  const a = [1, ...nums, 1]; // boundary sentinels
  const n = a.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let len = 2; len < n; len++) {
    for (let l = 0; l + len < n; l++) {
      const r = l + len;
      for (let k = l + 1; k < r; k++) {
        dp[l][r] = Math.max(dp[l][r], a[l] * a[k] * a[r] + dp[l][k] + dp[k][r]);
      }
    }
  }
  return dp[0][n - 1];
}
\`\`\``,
    },
    {
      id: 87,
      lcSlug: "scramble-string",
      title: "Scramble String",
      diff: "Hard",
      body: `At each split try both merge orders; memoize \`(i1, i2, len)\` for interleaving strings.

[Scramble String](https://leetcode.com/problems/scramble-string/)

\`\`\`js
// Try every split: no swap or swap halves of scramble
// LC: https://leetcode.com/problems/scramble-string/
function isScramble(s1, s2) {
  const memo = new Map();
  const dfs = (a, b, len) => {
    const key = a + "," + b + "," + len;
    if (memo.has(key)) return memo.get(key);
    if (s1.slice(a, a + len) === s2.slice(b, b + len)) { memo.set(key, true); return true; }
    const f1 = Array(26).fill(0), f2 = Array(26).fill(0);
    for (let i = 0; i < len; i++) {
      f1[s1.charCodeAt(a + i) - 97]++;
      f2[s2.charCodeAt(b + i) - 97]++;
    }
    for (let i = 0; i < 26; i++) {
      if (f1[i] !== f2[i]) { memo.set(key, false); return false; }
    }
    for (let k = 1; k < len; k++) {
      if (dfs(a, b, k) && dfs(a + k, b + k, len - k)) { memo.set(key, true); return true; }
      if (dfs(a, b + len - k, k) && dfs(a + k, b, len - k)) { memo.set(key, true); return true; }
    }
    memo.set(key, false);
    return false;
  };
  return dfs(0, 0, s1.length);
}
\`\`\``,
    },
    {
      id: 664,
      lcSlug: "strange-printer",
      title: "Strange Printer",
      diff: "Hard",
      body: `Interval DP: when ends match, merge inner intervals; runs of the same char can print together.

[Strange Printer](https://leetcode.com/problems/strange-printer/)

\`\`\`js
// dp[i][j] = min turns to print s[i..j]; merge same char at ends
// LC: https://leetcode.com/problems/strange-printer/
function strangePrinter(s) {
  let t = "";
  for (const ch of s) if (!t.length || t[t.length - 1] !== ch) t += ch;
  const n = t.length;
  if (!n) return 0;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = dp[i][j - 1] + 1;
      for (let k = i; k < j; k++) {
        if (t[k] === t[j]) {
          const cand = (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0) + dp[i][k];
          if (cand < dp[i][j]) dp[i][j] = cand;
        }
      }
    }
  }
  return dp[0][n - 1];
}
\`\`\``,
    },
    {
      id: 403,
      lcSlug: "frog-jump",
      title: "Frog Jump",
      diff: "Hard",
      body: `From each stone, track reachable jumps; next stones are at \`last ± 1\` with a set for O(1) lookup.

[Frog Jump](https://leetcode.com/problems/frog-jump/)

\`\`\`js
// State (stone index, last jump k); next jump in {k-1,k,k+1}
// LC: https://leetcode.com/problems/frog-jump/
function canCross(stones) {
  const pos = new Map();
  for (let i = 0; i < stones.length; i++) pos.set(stones[i], i);
  const memo = new Map();
  const dfs = (i, k) => {
    const key = i + "," + k;
    if (memo.has(key)) return memo.get(key);
    if (i === stones.length - 1) return true;
    for (const step of [k - 1, k, k + 1]) {
      if (step <= 0) continue;
      const np = stones[i] + step;
      if (pos.has(np) && dfs(pos.get(np), step)) { memo.set(key, true); return true; }
    }
    memo.set(key, false);
    return false;
  };
  return dfs(0, 0);
}
\`\`\``,
    },
    {
      id: 329,
      lcSlug: "longest-increasing-path-in-a-matrix",
      title: "Longest Increasing Path in a Matrix",
      diff: "Hard",
      body: `DFS with memo on strictly increasing neighbors; add 1 to the best child path.

[Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)

\`\`\`js
// DAG on increasing edges; memo DFS from each cell
// LC: https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
function longestIncreasingPath(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const memo = Array.from({ length: rows }, () => Array(cols).fill(0));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const dfs = (r, c) => {
    if (memo[r][c]) return memo[r][c];
    let best = 1;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (matrix[nr][nc] <= matrix[r][c]) continue;
      const cand = 1 + dfs(nr, nc);
      if (cand > best) best = cand;
    }
    memo[r][c] = best;
    return best;
  };
  let ans = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = dfs(r, c);
      if (v > ans) ans = v;
    }
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 123,
      lcSlug: "best-time-to-buy-and-sell-stock-iii",
      title: "Best Time to Buy and Sell Stock III",
      diff: "Hard",
      body: `At most two trades: prefix best buy-sell plus suffix best; try every split and take the max.

[Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

\`\`\`js
// left[i] = best profit with one txn in [0..i]; right[i] in [i..n-1]
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
function maxProfit(prices) {
  const n = prices.length;
  if (!n) return 0;
  const left = Array(n).fill(0);
  let mn = prices[0];
  for (let i = 1; i < n; i++) {
    if (prices[i] < mn) mn = prices[i];
    if (prices[i] - mn > left[i - 1]) left[i] = prices[i] - mn;
    else left[i] = left[i - 1];
  }
  const right = Array(n).fill(0);
  let mx = prices[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    if (prices[i] > mx) mx = prices[i];
    if (mx - prices[i] > right[i + 1]) right[i] = mx - prices[i];
    else right[i] = right[i + 1];
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (left[i] + right[i] > ans) ans = left[i] + right[i];
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 188,
      lcSlug: "best-time-to-buy-and-sell-stock-iv",
      title: "Best Time to Buy and Sell Stock IV",
      diff: "Hard",
      body: `Track \`k\` buy/sell states per day; if \`k\` is large enough, treat as unlimited transactions.

[Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

\`\`\`js
// buy[j]/sell[j] = best after j transactions; large k => greedy upticks
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
function maxProfit(k, prices) {
  const n = prices.length;
  if (n < 2 || k === 0) return 0;
  if (k >= n / 2) {
    let ans = 0;
    for (let i = 1; i < n; i++) if (prices[i] > prices[i - 1]) ans += prices[i] - prices[i - 1];
    return ans;
  }
  const buy = Array(k + 1).fill(-Infinity), sell = Array(k + 1).fill(0);
  for (const p of prices) {
    for (let j = 1; j <= k; j++) {
      if (sell[j - 1] - p > buy[j]) buy[j] = sell[j - 1] - p;
      if (buy[j] + p > sell[j]) sell[j] = buy[j] + p;
    }
  }
  return sell[k];
}
\`\`\``,
    },
    {
      id: 309,
      lcSlug: "best-time-to-buy-and-sell-stock-with-cooldown",
      title: "Best Time to Buy and Sell Stock with Cooldown",
      diff: "Medium",
      body: `Cooldown after sell: maintain hold, sold, and rest cash states and update daily.

[Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

\`\`\`js
// hold/sold/rest: after sell must cooldown before next buy
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
function maxProfit(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevHold = hold, prevSold = sold;
    hold = Math.max(prevHold, rest - p);
    sold = prevHold + p;
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}
\`\`\``,
    },
    {
      id: 714,
      lcSlug: "best-time-to-buy-and-sell-stock-with-transaction-fee",
      title: "Best Time to Buy and Sell Stock with Transaction Fee",
      diff: "Medium",
      body: `Subtract transaction fee on each sell while updating cash and hold states.

[Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

\`\`\`js
// cash = not holding; hold = holding; pay fee on each sell
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
function maxProfit(prices, fee) {
  let cash = 0, hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    const p = prices[i];
    const newCash = Math.max(cash, hold + p - fee);
    hold = Math.max(hold, cash - p);
    cash = newCash;
  }
  return cash;
}
\`\`\``,
    },
      ],
    },
  ],
};
