import type { SolutionGroup } from "@/data/solutions/types";

export const GREEDY_SOLUTIONS: SolutionGroup = {
  id: "greedy",
  title: "Greedy",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 122,
      lcSlug: "best-time-to-buy-and-sell-stock-ii",
      title: "Best Time to Buy and Sell Stock II",
      diff: "Medium",
      body: "Har chadhai becho — aaj kal se zyada ho to fark jod lo. Greedy yahin kaam karta hai.\n\n[Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar maxProfit = function(prices) {\n  let total = 0;\n\n  for (let i = 1; i < prices.length; i++) {\n    if (prices[i] > prices[i - 1]) {\n      let diff = prices[i] - prices[i - 1];\n      total += diff;\n    }\n  }\n\n  return total;\n};\n```",
    },
    {
      id: 455,
      lcSlug: "assign-cookies",
      title: "Assign Cookies",
      diff: "Easy",
      body: "Greedy — dono sort, chhote child ko pehle satisfy.\n\n[Assign Cookies](https://leetcode.com/problems/assign-cookies/)\n\n```js\n// Time: O(n log n) · Space: O(1)\nvar findContentChildren = function(g, s) {\n  g.sort((a, b) => a - b);\n  s.sort((a, b) => a - b);\n  let i = 0, j = 0;\n  while (i < g.length && j < s.length) {\n    if (s[j] >= g[i]) i++;\n    j++;\n  }\n  return i;\n};\n```",
    },
    {
      id: 55,
      lcSlug: "jump-game",
      title: "Jump Game",
      diff: "Medium",
      body: "I track the farthest index I can still reach. If I walk past that, I am stuck.\n\n[Jump Game](https://leetcode.com/problems/jump-game/)\n\n```js\n// Time: O(n) · Space: O(1)\n/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canJump = function(nums) {\n    let target = nums.length - 1;\n    for (let i = nums.length - 1; i >= 0; i--) {\n        if (i + nums[i] >= target) {\n            target = i;\n        }\n    }\n    return target === 0;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 45,
      lcSlug: "jump-game-ii",
      title: "Jump Game II",
      diff: "Medium",
      body: "Greedy BFS levels — current end pe jumps++, farthest track.\n\n[Jump Game II](https://leetcode.com/problems/jump-game-ii/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar jump = function(nums) {\n  let jumps = 0, end = 0, far = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    far = Math.max(far, i + nums[i]);\n    if (i === end) {\n      jumps++;\n      end = far;\n    }\n  }\n  return jumps;\n};\n```",
    },
    {
      id: 134,
      lcSlug: "gas-station",
      title: "Gas Station",
      diff: "Medium",
      body: "Total gas >= cost; unique start = jahan running tank pehle negative hua uske baad.\n\n[Gas Station](https://leetcode.com/problems/gas-station/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar canCompleteCircuit = function(gas, cost) {\n  let total = 0, tank = 0, start = 0;\n  for (let i = 0; i < gas.length; i++) {\n    const diff = gas[i] - cost[i];\n    total += diff;\n    tank += diff;\n    if (tank < 0) {\n      start = i + 1;\n      tank = 0;\n    }\n  }\n  return total >= 0 ? start : -1;\n};\n```",
    },
    {
      id: 763,
      lcSlug: "partition-labels",
      title: "Partition Labels",
      diff: "Medium",
      body: "Last index map — greedy expand end, jab i==end partition cut.\n\n[Partition Labels](https://leetcode.com/problems/partition-labels/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar partitionLabels = function(s) {\n  const last = new Array(26).fill(0);\n  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i;\n  const res = [];\n  let start = 0, end = 0;\n  for (let i = 0; i < s.length; i++) {\n    end = Math.max(end, last[s.charCodeAt(i) - 97]);\n    if (i === end) {\n      res.push(end - start + 1);\n      start = i + 1;\n    }\n  }\n  return res;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 621,
      lcSlug: "task-scheduler",
      title: "Task Scheduler",
      diff: "Medium",
      body: "Max freq tasks dominate — idle = (maxFreq-1)*(n+1) formula style.\n\n[Task Scheduler](https://leetcode.com/problems/task-scheduler/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar leastInterval = function(tasks, n) {\n  const freq = new Array(26).fill(0);\n  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;\n  freq.sort((a, b) => b - a);\n  const maxf = freq[0];\n  let idle = (maxf - 1) * n;\n  for (let i = 1; i < 26 && idle > 0; i++) {\n    idle -= Math.min(maxf - 1, freq[i]);\n  }\n  idle = Math.max(0, idle);\n  return tasks.length + idle;\n};\n```",
    },
    {
      id: 135,
      lcSlug: "candy",
      title: "Candy",
      diff: "Hard",
      body: "Do passes — left-to-right then right-to-left rating peaks.\n\n[Candy](https://leetcode.com/problems/candy/)\n\n```js\n// Time: O(n) · Space: O(n)\nvar candy = function(ratings) {\n  const n = ratings.length;\n  const candies = new Array(n).fill(1);\n  for (let i = 1; i < n; i++)\n    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n  for (let i = n - 2; i >= 0; i--)\n    if (ratings[i] > ratings[i + 1])\n      candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n  return candies.reduce((a, b) => a + b, 0);\n};\n```",
    },
      ],
    },
  ],
};
