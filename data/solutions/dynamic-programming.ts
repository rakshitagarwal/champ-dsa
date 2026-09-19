import type { SolutionGroup } from "./types";

export const DYNAMIC_PROGRAMMING_SOLUTIONS: SolutionGroup = {
  id: "dynamic-programming",
  title: "Dynamic Programming",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "counting-bits",
      title: "Counting Bits",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=wFGzEve9woc&t=259s&ab_channel=AlgoJS",
      body: `\`dp[i] = dp[i >> 1] + (i & 1)\`. Even is the same as i/2. Odd is one extra 1.

[Counting Bits](https://leetcode.com/problems/counting-bits/)

\`\`\`js
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — dp from half
// LC: https://leetcode.com/problems/counting-bits/
function countBits(n) {
  // Hinglish: step 1 — base case check karo
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "climbing-stairs",
      title: "Climbing Stairs",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Ifek5h5VqJw&ab_channel=AlgoJS",
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
      id: 2,
      lcSlug: "maximum-subarray",
      title: "Maximum Subarray",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=S-5nVIHXHv0&t=198s&ab_channel=AlgoJS",
      body: `Kadane: keep a running sum. If it goes negative, drop it and start at the next number. Track the best running sum. Negatives are allowed — start \`best\` at \`-Infinity\`.

[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

\`\`\`js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — Kadane
// LC: https://leetcode.com/problems/maximum-subarray/
function maxSubArray(nums) {
  // Hinglish: step 1 — base case check karo
  let run = 0, best = -Infinity;
  for (const x of nums) {
    run = Math.max(x, run + x); // restart or continue
    best = Math.max(best, run);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "coin-change",
      title: "Coin Change",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=mSdNNaG5oPc&ab_channel=AlgoJS",
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
      id: 5,
      lcSlug: "house-robber",
      title: "House Robber",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Q_nBUVnfcD8&ab_channel=AlgoJS",
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
      id: 6,
      lcSlug: "jump-game",
      title: "Jump Game",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=ckwPxNG9xeA&ab_channel=AlgoJS",
      body: `I track the farthest index I can still reach. If I walk past that, I am stuck.

[Jump Game](https://leetcode.com/problems/jump-game/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "unique-paths",
      title: "Unique Paths",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=1wkCYXtYtt4&ab_channel=AlgoJS",
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
      id: 8,
      lcSlug: "unique-paths-ii",
      title: "Unique Paths II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=zWVGgmwSY_o&ab_channel=AlgoJS",
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
      id: 9,
      lcSlug: "longest-common-subsequence",
      title: "Longest Common Subsequence",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=TvNXjAkVxT8&ab_channel=AlgoJS",
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
      id: 10,
      lcSlug: "combination-sum",
      title: "Combination Sum (DP)",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=ggorLkkuHcg&ab_channel=AlgoJS",
      body: `I may reuse the same coin, so I recurse on \`i\` not \`i + 1\`. Stop when remain is 0 (save) or negative.

[Combination Sum (DP)](https://leetcode.com/problems/combination-sum/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — reuse allowed
// LC: https://leetcode.com/problems/combination-sum/
function combinationSum(candidates, target) {
  const ans = [];
  const dfs = (start, remain, path) => {
    if (remain === 0) {
      ans.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]); // Hinglish: choice liya
      dfs(i, remain - candidates[i], path);
      path.pop(); // Hinglish: wapas hataya (backtrack)
    }
  };
  dfs(0, target, []);
  return ans;
}
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "longest-increasing-subsequence",
      title: "Longest Increasing Subsequence",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=IftXURT0kq4&ab_channel=AlgoJS",
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
      id: 12,
      lcSlug: "delete-operation-for-two-strings",
      title: "Delete Operations For Two Strings",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=TI3DmfxXV2s&ab_channel=AlgoJS",
      body: `LCS nikalo, baaki delete karo — m+n-2*LCS hi jawab hai.

[Delete Operations For Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)

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
    {
      id: 13,
      lcSlug: "maximum-product-subarray",
      title: "Maximum Product Subarray",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=tiglejZngzU&t=9s&ab_channel=AlgoJS",
      body: `Kadane jaisa, par negative palat deta hai — isliye max aur min dono track karo.

[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

\`\`\`js
// Hinglish: max-min dono track — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-product-subarray/
function maxProduct(nums) {
  // Hinglish: step 1 — pehle se start karo
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const cand = [x, curMax * x, curMin * x]; // Hinglish: teen options
    curMax = Math.max(...cand); // Hinglish: sabse bada
    curMin = Math.min(...cand); // Hinglish: sabse chhota (negative kaam ayega)
    best = Math.max(best, curMax);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 14,
      lcSlug: "decode-ways",
      title: "Decode Ways",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=-4CPPqI1-nA&ab_channel=AlgoJS",
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
      id: 15,
      lcSlug: "house-robber-ii",
      title: "House Robber II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Wx0ola5-mJQ&ab_channel=AlgoJS",
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
      ],
    },
  ],
};
