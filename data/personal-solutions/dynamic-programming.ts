import type { SolutionGroup } from "../solutions/types";

export const DYNAMIC_PROGRAMMING_SOLUTIONS: SolutionGroup = {
  id: "dynamic-programming",
  title: "Dynamic Programming",
  subs: [
    {
      title: "Foundation",
      topics: [
        {
          id: 70,
          lcSlug: "climbing-stairs",
          title: "Climbing Stairs",
          diff: "Easy",
          body: `dp[i] = dp[i-1] + dp[i-2] — Fibonacci hi hai. Poora array rakhne ki zaroorat nahi, do variables kaafi.

[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

\`\`\`js
// Time: O(n) · Space: O(1)
var climbStairs = function (n) {
  let prev = 1; // dp[i - 2]
  let cur = 1; // dp[i - 1]

  for (let i = 2; i <= n; i++) {
    const next = prev + cur;
    prev = cur;
    cur = next;
  }

  return cur;
};
\`\`\``,
        },
        {
          id: 746,
          lcSlug: "min-cost-climbing-stairs",
          title: "Min Cost Climbing Stairs",
          diff: "Easy",
          body: `dp[i] = step i tak pahunchne ka min cost. Do neeche wale steps me se sasta chuno, uska cost jodo.

[Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

\`\`\`js
// Time: O(n) · Space: O(1)
var minCostClimbingStairs = function (cost) {
  let a = 0; // dp[i - 2]
  let b = 0; // dp[i - 1]

  for (let i = 2; i <= cost.length; i++) {
    const cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = cur;
  }

  return b;
};
\`\`\``,
        },
        {
          id: 198,
          lcSlug: "house-robber",
          title: "House Robber",
          diff: "Medium",
          body: `Har ghar pe do choice — loot lo (tab i-2 wala answer) ya chhod do (tab i-1 wala answer). Max le lo.

[House Robber](https://leetcode.com/problems/house-robber/)

\`\`\`js
// Time: O(n) · Space: O(1)
var rob = function (nums) {
  let prev2 = 0; // dp[i - 2]
  let prev1 = 0; // dp[i - 1]

  for (const n of nums) {
    const cur = Math.max(prev1, prev2 + n);
    prev2 = prev1;
    prev1 = cur;
  }

  return prev1;
};
\`\`\``,
        },
      ],
    },
    {
      title: "Medium",
      topics: [
        {
          id: 213,
          lcSlug: "house-robber-ii",
          title: "House Robber II",
          diff: "Medium",
          body: `Circle ka matlab pehla aur aakhri saath nahi le sakte. Do linear runs karo — ek bina last ke, ek bina first ke.

[House Robber II](https://leetcode.com/problems/house-robber-ii/)

\`\`\`js
// Time: O(n) · Space: O(1)
var rob = function (nums) {
  if (nums.length === 1) return nums[0];

  const robLine = (start, end) => {
    let prev2 = 0;
    let prev1 = 0;

    for (let i = start; i <= end; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = cur;
    }

    return prev1;
  };

  return Math.max(robLine(0, nums.length - 2), robLine(1, nums.length - 1));
};
\`\`\``,
        },
        {
          id: 322,
          lcSlug: "coin-change",
          title: "Coin Change",
          diff: "Medium",
          body: `Unbounded knapsack ka min version. dp[a] = amount a banane ke min coins; har amount pe saare coins try karo.

[Coin Change](https://leetcode.com/problems/coin-change/)

\`\`\`js
// Time: O(amount * coins) · Space: O(amount)
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};
\`\`\``,
        },
        {
          id: 300,
          lcSlug: "longest-increasing-subsequence",
          title: "Longest Increasing Subsequence",
          diff: "Medium",
          body: `\`tails[k]\` = length k+1 wali LIS ka sabse chhota possible end. Binary search se sahi jagah replace karo — O(n log n).

[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

\`\`\`js
// Time: O(n log n) · Space: O(n)
var lengthOfLIS = function (nums) {
  const tails = [];

  for (const n of nums) {
    // pehla index dhoondho jahan tails[i] >= n
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = (left + right) >> 1;
      if (tails[mid] < n) left = mid + 1;
      else right = mid;
    }

    tails[left] = n; // extend ya replace
  }

  return tails.length;
};
\`\`\``,
        },
        {
          id: 62,
          lcSlug: "unique-paths",
          title: "Unique Paths",
          diff: "Medium",
          body: `Grid DP ka hello-world: dp[r][c] = upar + baayein. Ek row rakho aur usi ko in-place update karte jao.

[Unique Paths](https://leetcode.com/problems/unique-paths/)

\`\`\`js
// Time: O(m * n) · Space: O(n)
var uniquePaths = function (m, n) {
  const dp = new Array(n).fill(1); // pehli row — sab 1

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      // dp[c] abhi upar wali row hai, dp[c - 1] isi row ka baayan
      dp[c] += dp[c - 1];
    }
  }

  return dp[n - 1];
};
\`\`\``,
        },
        {
          id: 416,
          lcSlug: "partition-equal-subset-sum",
          title: "Partition Equal Subset Sum",
          diff: "Medium",
          body: `Sawal ghuma do — "kya total/2 sum ka subset ban sakta hai?" 0/1 knapsack. Ulte loop se har item ek hi baar use hota hai.

[Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

\`\`\`js
// Time: O(n * sum) · Space: O(sum)
var canPartition = function (nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const n of nums) {
    // peeche se chalo warna ek number dobara use ho jayega
    for (let s = target; s >= n; s--) {
      if (dp[s - n]) dp[s] = true;
    }
  }

  return dp[target];
};
\`\`\``,
        },
      ],
    },
    {
      title: "Advanced",
      topics: [
        {
          id: 1143,
          lcSlug: "longest-common-subsequence",
          title: "Longest Common Subsequence",
          diff: "Medium",
          body: `Do strings ka grid DP. Characters match karein to diagonal + 1, warna upar/baayein me se max.

[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

\`\`\`js
// Time: O(m * n) · Space: O(n)
var longestCommonSubsequence = function (text1, text2) {
  const n = text2.length;

  let prev = new Array(n + 1).fill(0);
  let cur = new Array(n + 1).fill(0);

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) cur[j] = prev[j - 1] + 1;
      else cur[j] = Math.max(prev[j], cur[j - 1]);
    }

    [prev, cur] = [cur, prev]; // rows swap
  }

  return prev[n];
};
\`\`\``,
        },
        {
          id: 72,
          lcSlug: "edit-distance",
          title: "Edit Distance",
          diff: "Medium",
          body: `Teen operations = teen neighbours. Match hai to diagonal free, warna 1 + min(replace, delete, insert).

[Edit Distance](https://leetcode.com/problems/edit-distance/)

\`\`\`js
// Time: O(m * n) · Space: O(n)
var minDistance = function (word1, word2) {
  const n = word2.length;

  let prev = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j; // khaali word1 -> j inserts

  let cur = new Array(n + 1).fill(0);

  for (let i = 1; i <= word1.length; i++) {
    cur[0] = i; // khaali word2 -> i deletes

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        cur[j] = prev[j - 1];
      } else {
        // replace, delete, insert
        cur[j] = 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
      }
    }

    [prev, cur] = [cur, prev];
  }

  return prev[n];
};
\`\`\``,
        },
      ],
    },
  ],
};
