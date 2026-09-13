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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — Fibonacci
// LC: https://leetcode.com/problems/climbing-stairs/
function climbStairs(n) {
  // Hinglish: step 1 — base case check karo
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — take or skip
// LC: https://leetcode.com/problems/house-robber/
function rob(nums) {
  // Hinglish: step 1 — base case check karo
  let prev2 = 0, prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
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
      body: `Ghar gol me hain, pehla aur aakhri saath nahi loot sakte. Do cases: [0..n-2] aur [1..n-1] me se best.

[House Robber II](https://leetcode.com/problems/house-robber-ii/)

\`\`\`js
// Hinglish: dp state bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/house-robber-ii/
function rob2(nums) {
  // Hinglish: single to wahi
  if(nums.length===1) return nums[0];
  const robRange=(l,r)=>{
    let prev2=0, prev1=0;
    for(let i=l;i<=r;i++){ const cur=Math.max(prev1, prev2+nums[i]); prev2=prev1; prev1=cur; } // Hinglish: loot ya chhodo
    return prev1;
  };
  return Math.max(robRange(0, nums.length-2), robRange(1, nums.length-1)); // Hinglish: pehla chhodo ya aakhri chhodo
}
\`\`\``,
    },
    {
      id: 746,
      lcSlug: "min-cost-climbing-stairs",
      title: "Min Cost Climbing Stairs",
      diff: "Easy",
      body: `\`dp[i]\` = step i tak pahunchne ki min cost. Har step se 1 ya 2 aage ja sakte ho, top ke baad rukna hai.

[Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

\`\`\`js
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — cost jod ke min lo
// LC: https://leetcode.com/problems/min-cost-climbing-stairs/
function minCostClimbingStairs(cost) {
  // Hinglish: step 1 — base case check karo
  const n = cost.length;
  let a = 0, b = 0;
  for (let i = 2; i <= n; i++) {
    const c = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = c;
  }
  return b;
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — 1 or 2 digits
// LC: https://leetcode.com/problems/decode-ways/
function numDecodings(s) {
  // Hinglish: step 1 — base case check karo
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    if (s[i - 1] !== "0") dp[i] += dp[i - 1];
    if (i >= 2) {
      const two = Number(s.slice(i - 2, i));
      if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — prefix can be segmented
// LC: https://leetcode.com/problems/word-break/
function wordBreak(s, wordDict) {
  // Hinglish: step 1 — base case check karo
  const dict = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — unbounded knapsack
// LC: https://leetcode.com/problems/coin-change/
function coinChange(coins, amount) {
  // Hinglish: step 1 — base case check karo
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
      body: `Tareeke ginne hon to coin loop bahar rakho — order count nahi karna hai.

[Coin Change II](https://leetcode.com/problems/coin-change-ii/)

\`\`\`js
// Hinglish: coin bahar rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/coin-change-2/
function change(amount, coins) {
  // Hinglish: step 1 — dp banao
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1; // Hinglish: zero ka ek tareeka
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c]; // Hinglish: c use karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — LIS O(n^2)
// LC: https://leetcode.com/problems/longest-increasing-subsequence/
function lengthOfLIS(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — 0/1 knapsack boolean
// LC: https://leetcode.com/problems/partition-equal-subset-sum/
function canPartition(nums) {
  // Hinglish: step 1 — base case check karo
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
      body: `Target outer loop me — order matter karta hai (permutations), isliye Coin Change II se ulta loop hai.

[Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/)

\`\`\`js
// Hinglish: target bahar — ek-ek step comment dekho
// LC: https://leetcode.com/problems/combination-sum-iv/
function combinationSum4(nums, target) {
  // Hinglish: step 1 — dp banao
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const x of nums) {
      if (x <= t) dp[t] += dp[t - x]; // Hinglish: order matter, target bahar
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
      body: `Har number ko 1+j*j se banao — coin change jaisa, coins squares hain.

[Perfect Squares](https://leetcode.com/problems/perfect-squares/)

\`\`\`js
// Hinglish: squares ke coins — ek-ek step comment dekho
// LC: https://leetcode.com/problems/perfect-squares/
function numSquares(n) {
  // Hinglish: step 1 — dp banao
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      const cand = dp[i - j * j] + 1; // Hinglish: square ghatao
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
      body: `Din aage badhao — travel day ho to 1/7/30 me se sasta chuno, nahi to kal wala uthao.

[Minimum Cost For Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/)

\`\`\`js
// Hinglish: din aage badhao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-cost-for-tickets/
function mincostTickets(days, costs) {
  // Hinglish: step 1 — set banao
  const travel = new Set(days);
  const last = days[days.length - 1];
  const dp = Array(last + 1).fill(0);
  for (let d = 1; d <= last; d++) {
    if (!travel.has(d)) { dp[d] = dp[d - 1]; continue; } // Hinglish: safar nahi to kal wala
    const one = dp[d - 1] + costs[0];
    const seven = dp[Math.max(0, d - 7)] + costs[1]; // Hinglish: 7 din peeche
    const thirty = dp[Math.max(0, d - 30)] + costs[2];
    dp[d] = Math.min(one, seven, thirty); // Hinglish: sasta chuno
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
      body: `Same numbers jod ke house robber banao — points[i] lo to i-1 aur i+1 gaye.

[Delete and Earn](https://leetcode.com/problems/delete-and-earn/)

\`\`\`js
// Hinglish: house robber banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/delete-and-earn/
function deleteAndEarn(nums) {
  // Hinglish: step 1 — points jodo
  let mx = 0;
  for (const x of nums) if (x > mx) mx = x;
  const pts = Array(mx + 1).fill(0);
  for (const x of nums) pts[x] += x; // Hinglish: same number ke points
  let prev2 = 0, prev1 = 0;
  for (let i = 0; i <= mx; i++) {
    const cur = Math.max(prev1, prev2 + pts[i]); // Hinglish: lo ya chhodo
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
      body: `Lagatar farak gino — lambi chain me naye slices judte jaate hain, count badhao.

[Arithmetic Slices](https://leetcode.com/problems/arithmetic-slices/)

\`\`\`js
// Hinglish: chain badhao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/arithmetic-slices/
function numberOfArithmeticSlices(nums) {
  // Hinglish: step 1 — count lo
  let ans = 0, cur = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      cur++; // Hinglish: chain badi
      ans += cur; // Hinglish: naye slices jud gaye
    } else cur = 0; // Hinglish: toot gayi
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — grid paths
// LC: https://leetcode.com/problems/unique-paths/
function uniquePaths(m, n) {
  // Hinglish: step 1 — base case check karo
  const dp = Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) dp[c] += dp[c - 1];
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
      body: `Obstacle wali cell zero rakho — baaki upar+left jodo. Pehli row/col dhyan se bharo.

[Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)

\`\`\`js
// Hinglish: obstacle zero karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/unique-paths-ii/
function uniquePathsWithObstacles(grid) {
  // Hinglish: step 1 — rows/cols lo
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) { dp[r][c] = 0; continue; } // Hinglish: pathar hai
      if (r === 0 && c === 0) dp[r][c] = 1; // Hinglish: start
      else {
        const up = r > 0 ? dp[r - 1][c] : 0;
        const left = c > 0 ? dp[r][c - 1] : 0;
        dp[r][c] = up + left; // Hinglish: upar + left
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
      body: `Har cell pe \`grid + min(upar, left)\`. Pehli row/col seedha accumulate hoti hai.

[Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

\`\`\`js
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — grid min cost
// LC: https://leetcode.com/problems/minimum-path-sum/
function minPathSum(grid) {
  // Hinglish: step 1 — base case check karo
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
      body: `Neeche se upar aao — har cell apne do bachchon me chhota jod le. O(n) space me ho jata hai.

[Triangle](https://leetcode.com/problems/triangle/)

\`\`\`js
// Hinglish: neeche se jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/triangle/
function minimumTotal(triangle) {
  // Hinglish: step 1 — aakhri row uthao
  const dp = [...triangle[triangle.length - 1]];
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) {
      dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]); // Hinglish: chhota bachcha jodo
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
      body: `1 wali cell apne upar-left-uperleft me sabse chhota lekar +1 karo — wahi side banegi.

[Maximal Square](https://leetcode.com/problems/maximal-square/)

\`\`\`js
// Hinglish: teen padosi dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximal-square/
function maximalSquare(matrix) {
  // Hinglish: step 1 — rows/cols lo
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
  let best = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      if (matrix[r - 1][c - 1] === "1") {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]); // Hinglish: sabse chhota + 1
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
      body: `Har cell upar wali row ke teen padosiyon me sabse chhota jodta hai. Aakhir me min row uthao.

[Minimum Falling Path Sum](https://leetcode.com/problems/minimum-falling-path-sum/)

\`\`\`js
// Hinglish: teen upar dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-falling-path-sum/
function minFallingPathSum(matrix) {
  // Hinglish: step 1 — rows lo
  const n = matrix.length;
  const dp = matrix[0].slice();
  for (let r = 1; r < n; r++) {
    const next = Array(n);
    for (let c = 0; c < n; c++) {
      let best = dp[c];
      if (c > 0 && dp[c - 1] < best) best = dp[c - 1]; // Hinglish: left-upar
      if (c + 1 < n && dp[c + 1] < best) best = dp[c + 1]; // Hinglish: right-upar
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
      body: `Upar wala maximal square jaisa — har 1 cell apna side jodta hai, sab jod do.

[Count Square Submatrices with All Ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)

\`\`\`js
// Hinglish: side jod ke gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/count-square-submatrices-with-all-ones/
function countSquares(matrix) {
  // Hinglish: step 1 — rows/cols lo
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
  let ans = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      if (matrix[r - 1][c - 1] === 1) {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]);
        ans += dp[r][c]; // Hinglish: itne squares khatm hote hain
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
      body: `Probabilities aage badhao — 8 chaalon me baanto, board se bahar wala hissa gaya.

[Knight Probability in Chessboard](https://leetcode.com/problems/knight-probability-in-chessboard/)

\`\`\`js
// Hinglish: probability baanto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/knight-probability-in-chessboard/
function knightProbability(n, k, row, column) {
  // Hinglish: step 1 — dp banao
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
          if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue; // Hinglish: bahar gaya
          next[nr][nc] += dp[r][c] / 8; // Hinglish: baanto
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
      body: `Har step pe bahar nikle raste gino, MOD lagao — memo (r,c,moves) se dobara mat gino.

[Out of Boundary Paths](https://leetcode.com/problems/out-of-boundary-paths/)

\`\`\`js
// Hinglish: bahar niklo gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/out-of-boundary-paths/
function findPaths(m, n, maxMove, startRow, startColumn) {
  // Hinglish: step 1 — MOD lo
  const MOD = 1000000007;
  const memo = new Map();
  const dfs = (r, c, moves) => {
    if (r < 0 || c < 0 || r >= m || c >= n) return 1; // Hinglish: bahar nikal gaya
    if (moves === 0) return 0;
    const key = r + "," + c + "," + moves;
    if (memo.has(key)) return memo.get(key); // Hinglish: yaad hai
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
      body: `Neeche-right se ulta aao — har cell batata hai kitni health chahiye aage jeene ke liye. Kam se kam 1 rakho.

[Dungeon Game](https://leetcode.com/problems/dungeon-game/)

\`\`\`js
// Hinglish: ulta aao health jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/dungeon-game/
function calculateMinimumHP(dungeon) {
  // Hinglish: step 1 — rows/cols lo
  const rows = dungeon.length, cols = dungeon[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(Infinity));
  dp[rows][cols - 1] = 1; dp[rows - 1][cols] = 1; // Hinglish: manzil ke bahar 1
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = cols - 1; c >= 0; c--) {
      const need = Math.min(dp[r + 1][c], dp[r][c + 1]) - dungeon[r][c];
      dp[r][c] = need <= 0 ? 1 : need; // Hinglish: kam se kam 1
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — LCS
// LC: https://leetcode.com/problems/longest-common-subsequence/
function longestCommonSubsequence(a, b) {
  // Hinglish: step 1 — base case check karo
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
      body: `LCS hi hai kapde badal ke — same numbers jodo, lines cross nahi hongi.

[Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)

\`\`\`js
// Hinglish: LCS pehchano — ek-ek step comment dekho
// LC: https://leetcode.com/problems/uncrossed-lines/
function maxUncrossedLines(nums1, nums2) {
  // Hinglish: step 1 — table banao
  const m = nums1.length, n = nums2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1; // Hinglish: jod do
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Hinglish: ek chhodo
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
      body: `\`dp\` me LCS string aur uske reverse ka. Ya \`dp[i][j]\` interval DP.

[Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)

\`\`\`js
// Hinglish: dp state bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-palindromic-subsequence/
function longestPalindromeSubseq(s) {
  // Hinglish: reverse se LCS
  const t=[...s].reverse().join("");
  const n=s.length, dp=Array.from({length:n+1},()=>Array(n+1).fill(0));
  for(let i=1;i<=n;i++) for(let j=1;j<=n;j++){
    if(s[i-1]===t[j-1]) dp[i][j]=dp[i-1][j-1]+1; // Hinglish: match to +1
    else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]); // Hinglish: ek chhodo
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — insert / delete / replace
// LC: https://leetcode.com/problems/edit-distance/
function minDistance(a, b) {
  // Hinglish: step 1 — base case check karo
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
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
      body: `t banane ke tareeke gino — match ho to lo-plus-chhodo, nahi to chhodo. Badi sankhya aayegi.

[Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

\`\`\`js
// Hinglish: tareeke gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/distinct-subsequences/
function numDistinct(s, t) {
  // Hinglish: step 1 — table banao
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = 1; // Hinglish: khaali t ka 1 tareeka
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j]; // Hinglish: chhodo
      if (s[i - 1] === t[j - 1]) dp[i][j] += dp[i - 1][j - 1]; // Hinglish: lo bhi
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
      body: `s3 ka prefix s1+s2 ke prefix se bana hai ya nahi — aakhri char dekho kahan se aaya.

[Interleaving String](https://leetcode.com/problems/interleaving-string/)

\`\`\`js
// Hinglish: aakhri char dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/interleaving-string/
function isInterleave(s1, s2, s3) {
  // Hinglish: step 1 — lambai check karo
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) continue;
      const k = i + j - 1;
      if (i > 0 && s1[i - 1] === s3[k] && dp[i - 1][j]) dp[i][j] = true; // Hinglish: s1 se aaya
      if (j > 0 && s2[j - 1] === s3[k] && dp[i][j - 1]) dp[i][j] = true; // Hinglish: s2 se aaya
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
      body: `Do dimensional knapsack — zeros aur ones dono budget me rakho, strings gino.

[Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/)

\`\`\`js
// Hinglish: do budget sambhalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/ones-and-zeroes/
function findMaxForm(strs, m, n) {
  // Hinglish: step 1 — table banao
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (const s of strs) {
    let z = 0;
    for (const ch of s) if (ch === "0") z++; // Hinglish: zero gino
    const o = s.length - z;
    for (let i = m; i >= z; i--) {
      for (let j = n; j >= o; j--) {
        const cand = dp[i - z][j - o] + 1; // Hinglish: lo to +1
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
      body: `Har number ke aage + ya - lagake target banao — kitne tareeke? Subset-sum me badlo: \`sum(P) = (total + target) / 2\`, fir 0/1 count wala knapsack.

[Target Sum](https://leetcode.com/problems/target-sum/)

\`\`\`js
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — 0/1 knapsack count
// LC: https://leetcode.com/problems/target-sum/
function findTargetSumWays(nums, target) {
  // Hinglish: step 1 — base case check karo
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
      body: `Do dher barabar karo — subset sum target/2 tak bharo, baaki minus karo. Partition jaisa hai.

[Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/)

\`\`\`js
// Hinglish: aadha bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/last-stone-weight-ii/
function lastStoneWeightII(stones) {
  // Hinglish: step 1 — total nikalo
  const total = stones.reduce((a, b) => a + b, 0);
  const target = Math.floor(total / 2);
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of stones) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x]; // Hinglish: 0/1 ulta loop
  }
  let best = 0;
  for (let s = target; s >= 0; s--) {
    if (dp[s]) { best = s; break; } // Hinglish: sabse bhara aadha
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
      body: `LCS nikalo, baaki delete karo — m+n-2*LCS hi jawab hai.

[Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)

\`\`\`js
// Hinglish: LCS nikaal ke ghatao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/delete-operation-for-two-strings/
function minDistance(word1, word2) {
  // Hinglish: step 1 — LCS table banao
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return m + n - 2 * dp[m][n]; // Hinglish: jo common nahi wo delete
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
      body: `DP table me * matlab zero ya zyada — pichhle do (zero) ya same row (zyada) se aao.

[Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)

\`\`\`js
// Hinglish: star sambhalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/regular-expression-matching/
function isMatch(s, p) {
  // Hinglish: step 1 — table banao
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2]; // Hinglish: khaali se match
  }
  const same = (a, b) => b === "." || a === b;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2]; // Hinglish: zero baar lo
        if (same(s[i - 1], p[j - 2])) dp[i][j] = dp[i][j] || dp[i - 1][j]; // Hinglish: ek aur lo
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
      body: `Upar wala bhai — ? ek char, * kuch bhi (zero se zyada). Greedy bhi chalta hai par DP pakka hai.

[Wildcard Matching](https://leetcode.com/problems/wildcard-matching/)

\`\`\`js
// Hinglish: star kuch bhi kha jaye — ek-ek step comment dekho
// LC: https://leetcode.com/problems/wildcard-matching/
function isMatch(s, p) {
  // Hinglish: step 1 — table banao
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1]; // Hinglish: khaali se match
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j]; // Hinglish: zero ya ek aur khao
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
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — interval, last balloon k
// LC: https://leetcode.com/problems/burst-balloons/
function maxCoins(nums) {
  // Hinglish: step 1 — base case check karo
  const a = [1, ...nums, 1];
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
      body: `Har split pe do order try karo (swap ya seedha) — memo me (i1,i2,len) rakho.

[Scramble String](https://leetcode.com/problems/scramble-string/)

\`\`\`js
// Hinglish: split karke try karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/scramble-string/
function isScramble(s1, s2) {
  // Hinglish: step 1 — memo lo
  const memo = new Map();
  const dfs = (a, b, len) => {
    const key = a + "," + b + "," + len;
    if (memo.has(key)) return memo.get(key); // Hinglish: yaad hai
    if (s1.slice(a, a + len) === s2.slice(b, b + len)) { memo.set(key, true); return true; }
    const f1 = Array(26).fill(0), f2 = Array(26).fill(0);
    for (let i = 0; i < len; i++) {
      f1[s1.charCodeAt(a + i) - 97]++;
      f2[s2.charCodeAt(b + i) - 97]++;
    }
    for (let i = 0; i < 26; i++) {
      if (f1[i] !== f2[i]) { memo.set(key, false); return false; } // Hinglish: letters alag to na
    }
    for (let k = 1; k < len; k++) {
      if (dfs(a, b, k) && dfs(a + k, b + k, len - k)) { memo.set(key, true); return true; } // Hinglish: seedha mila
      if (dfs(a, b + len - k, k) && dfs(a + k, b, len - k)) { memo.set(key, true); return true; } // Hinglish: ulta mila
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
      body: `Same char ek saath print ho sakta hai — interval DP me jahan match mile wahan jodo.

[Strange Printer](https://leetcode.com/problems/strange-printer/)

\`\`\`js
// Hinglish: match pe jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/strange-printer/
function strangePrinter(s) {
  // Hinglish: step 1 — duplicate hatao
  let t = "";
  for (const ch of s) if (!t.length || t[t.length - 1] !== ch) t += ch;
  const n = t.length;
  if (!n) return 0;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = dp[i][j - 1] + 1; // Hinglish: alag print karo
      for (let k = i; k < j; k++) {
        if (t[k] === t[j]) {
          const cand = (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0) + dp[i][k]; // Hinglish: saath print karo
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
      body: `Har stone pe pahuchne wale jumps yaad rakho — aage k-1, k, k+1 phenko. Set se tez lookup karo.

[Frog Jump](https://leetcode.com/problems/frog-jump/)

\`\`\`js
// Hinglish: jump yaad rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/frog-jump/
function canCross(stones) {
  // Hinglish: step 1 — position map lo
  const pos = new Map();
  for (let i = 0; i < stones.length; i++) pos.set(stones[i], i);
  const memo = new Map();
  const dfs = (i, k) => {
    const key = i + "," + k;
    if (memo.has(key)) return memo.get(key); // Hinglish: yaad hai
    if (i === stones.length - 1) return true;
    for (const step of [k - 1, k, k + 1]) {
      if (step <= 0) continue;
      const np = stones[i] + step;
      if (pos.has(np) && dfs(pos.get(np), step)) { memo.set(key, true); return true; } // Hinglish: aage badho
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
      body: `Har cell se DFS + memo — badhte padosi me jao, 1 jod ke lao. Zyada se zyada uthao.

[Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)

\`\`\`js
// Hinglish: memo DFS chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
function longestIncreasingPath(matrix) {
  // Hinglish: step 1 — rows/cols lo
  const rows = matrix.length, cols = matrix[0].length;
  const memo = Array.from({ length: rows }, () => Array(cols).fill(0));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const dfs = (r, c) => {
    if (memo[r][c]) return memo[r][c]; // Hinglish: yaad hai
    let best = 1;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (matrix[nr][nc] <= matrix[r][c]) continue; // Hinglish: badhta hi jao
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
      body: `Do transactions — left se best ek, right se best ek, dono jodo. Har split pe max uthao.

[Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

\`\`\`js
// Hinglish: do hisse jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
function maxProfit(prices) {
  // Hinglish: step 1 — arrays lo
  const n = prices.length;
  if (!n) return 0;
  const left = Array(n).fill(0);
  let mn = prices[0];
  for (let i = 1; i < n; i++) {
    if (prices[i] < mn) mn = prices[i]; // Hinglish: sasta dhoondo
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
    if (left[i] + right[i] > ans) ans = left[i] + right[i]; // Hinglish: dono jodo
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
      body: `K transactions — buy/sell arrays rakho, har din update karo. K bada ho to unlimited samjho.

[Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

\`\`\`js
// Hinglish: k jodi sambhalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
function maxProfit(k, prices) {
  // Hinglish: step 1 — bada k ho to unlimited
  const n = prices.length;
  if (n < 2 || k === 0) return 0;
  if (k >= n / 2) {
    let ans = 0;
    for (let i = 1; i < n; i++) if (prices[i] > prices[i - 1]) ans += prices[i] - prices[i - 1];
    return ans; // Hinglish: har chadhai becho
  }
  const buy = Array(k + 1).fill(-Infinity), sell = Array(k + 1).fill(0);
  for (const p of prices) {
    for (let j = 1; j <= k; j++) {
      if (sell[j - 1] - p > buy[j]) buy[j] = sell[j - 1] - p; // Hinglish: kharido
      if (buy[j] + p > sell[j]) sell[j] = buy[j] + p; // Hinglish: becho
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
      body: `Bechne ke baad ek din aaram — hold/sold/rest states rakho, roz update karo.

[Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

\`\`\`js
// Hinglish: teen haalat rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
function maxProfit(prices) {
  // Hinglish: step 1 — states lo
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevHold = hold, prevSold = sold;
    hold = Math.max(prevHold, rest - p); // Hinglish: rakho ya kharido
    sold = prevHold + p; // Hinglish: becho
    rest = Math.max(rest, prevSold); // Hinglish: aaram karo
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
      body: `Har bechne pe fee kat-ti hai — cash/hold rakho, fee ke saath update karo.

[Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

\`\`\`js
// Hinglish: fee kaat ke jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
function maxProfit(prices, fee) {
  // Hinglish: step 1 — states lo
  let cash = 0, hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    const p = prices[i];
    const newCash = Math.max(cash, hold + p - fee); // Hinglish: becho (fee kaat ke)
    hold = Math.max(hold, cash - p); // Hinglish: rakho ya kharido
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
