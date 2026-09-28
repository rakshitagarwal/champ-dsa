import type { SolutionGroup } from "@/data/solutions/types";

export const SLIDING_WINDOW_SOLUTIONS: SolutionGroup = {
  id: "sliding-window",
  title: "Sliding Window",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 643,
      lcSlug: "maximum-average-subarray-i",
      title: "Maximum Average Subarray I",
      diff: "Easy",
      body: "Fixed window size k — pehle window sum, phir slide karke max average.\n\n[Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar findMaxAverage = function(nums, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  let best = sum;\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    best = Math.max(best, sum);\n  }\n  return best / k;\n};\n```",
    },
    {
      id: 209,
      lcSlug: "minimum-size-subarray-sum",
      title: "Minimum Size Subarray Sum",
      diff: "Medium",
      body: "Variable window — sum >= target hone tak expand, phir shrink for min length.\n\n[Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar minSubArrayLen = function(target, nums) {\n  let left = 0, sum = 0, best = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return best === Infinity ? 0 : best;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 3,
      lcSlug: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      diff: "Medium",
      body: "Variable sliding window + set/map — duplicate aaye to left shrink.\n\n[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)\n\n```js\n// Time: O(n) · Space: O(min(n, charset))\nvar lengthOfLongestSubstring = function(s) {\n  const seen = new Set();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (seen.has(s[right])) {\n      seen.delete(s[left]);\n      left++;\n    }\n    seen.add(s[right]);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n};\n```",
    },
    {
      id: 567,
      lcSlug: "permutation-in-string",
      title: "Permutation in String",
      diff: "Medium",
      body: "Fixed window + freq map — s1 ka count, s2 pe window slide, maps match = true.\n\n[Permutation in String](https://leetcode.com/problems/permutation-in-string/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar checkInclusion = function(s1, s2) {\n  if (s1.length > s2.length) return false;\n  const need = new Array(26).fill(0);\n  const win = new Array(26).fill(0);\n  for (const ch of s1) need[ch.charCodeAt(0) - 97]++;\n  for (let i = 0; i < s2.length; i++) {\n    win[s2.charCodeAt(i) - 97]++;\n    if (i >= s1.length) win[s2.charCodeAt(i - s1.length) - 97]--;\n    if (i >= s1.length - 1 && need.every((v, j) => v === win[j])) return true;\n  }\n  return false;\n};\n```",
    },
    {
      id: 424,
      lcSlug: "longest-repeating-character-replacement",
      title: "Longest Repeating Character Replacement",
      diff: "Medium",
      body: "Window me sabse zyada frequent char `maxF`, window size - maxF <= k to valid. Nahi to left shrink karo.\n\n[Longest Repeated Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar characterReplacement = function(s, k) {\n  let map = {};\n\n  let topFrequency = 0;\n  let longest = 0;\n\n  let left = 0;\n  let right = 0;\n\n  while (right < s.length) {\n    let rightChar = s[right];\n\n    map[rightChar] = map[rightChar] + 1 || 1;\n\n    topFrequency = Math.max(topFrequency, map[rightChar]);\n\n    while ((right - left + 1) - topFrequency > k) {\n      let leftChar = s[left];\n      map[leftChar]--;\n      left++;\n    }\n\n    longest = Math.max(longest, right - left + 1);\n\n    right++;\n  }\n\n  return longest;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 76,
      lcSlug: "minimum-window-substring",
      title: "Minimum Window Substring",
      diff: "Hard",
      body: "Grow until `t` is fully covered (`missing === 0`). Then shrink from the left as long as it stays covered. Remember the smallest slice. If `t` never fits, return `\"\"`.\n\n[Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)\n\n```js\n// Time: O(n) · Space: O(Σ)\n// Sliding window — smallest that still covers t\nvar minWindow = function(s, t) {\n  let map = new Map();\n\n  for (let letter of t) {\n    if (!map.has(letter)) {\n      map.set(letter, 1);\n    } else {\n      map.set(letter, map.get(letter) + 1);\n    }\n  }\n\n  let left = 0;\n  let right = 0;\n  let len = Infinity;\n  let count = map.size;\n  let minWindow = \"\";\n\n  while (right < s.length) {\n    let rLetter = s[right];\n    if (map.has(rLetter)) {\n      map.set(rLetter, map.get(rLetter) - 1);\n      if (map.get(rLetter) === 0) count--;\n    }\n\n    right++;\n\n    while (count === 0) {\n      if (right - left < len) {\n        len = right - left;\n        minWindow = s.slice(left, right);\n      }\n\n      let lLetter = s[left];\n      if (map.has(lLetter)) {\n        map.set(lLetter, map.get(lLetter) + 1);\n        if (map.get(lLetter) > 0) count++;\n      }\n      left++;\n    }\n  }\n\n  return minWindow;\n};\n```",
    },
    {
      id: 239,
      lcSlug: "sliding-window-maximum",
      title: "Sliding Window Maximum",
      diff: "Hard",
      body: "Monotonic decreasing deque — window ka max front pe, outdated indices pop.\n\n[Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)\n\n```js\n// Time: O(n) · Space: O(k)\nvar maxSlidingWindow = function(nums, k) {\n  const dq = []; // indices, values decreasing\n  const res = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (dq.length && dq[0] <= i - k) dq.shift();\n    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();\n    dq.push(i);\n    if (i >= k - 1) res.push(nums[dq[0]]);\n  }\n  return res;\n};\n```",
    },
      ],
    },
  ],
};
