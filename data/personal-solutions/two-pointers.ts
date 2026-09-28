import type { SolutionGroup } from "@/data/solutions/types";

export const TWO_POINTERS_SOLUTIONS: SolutionGroup = {
  id: "two-pointers",
  title: "Two Pointers",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 125,
      lcSlug: "valid-palindrome",
      title: "Valid Palindrome",
      diff: "Easy",
      body: "Dono siron se aao, alphanumeric nahi to skip, case ignore karke compare.\n\n[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar isPalindrome = function(s) {\n  let cleanStr = cleanUp(s);\n  return isPal(cleanStr);\n};\n\nfunction cleanUp(str) {\n  let char = \"abcdefghijklmnopqrstuvwxyz0123456789\";\n  let newS = \"\";\n\n  for (let i = 0; i < str.length; i++) {\n    let lCase = str[i].toLowerCase();\n\n    if (char.indexOf(lCase) !== -1) {\n      newS += lCase;\n    }\n  }\n\n  return newS;\n}\n\nfunction isPal(str) {\n  let left = 0;\n  let right = str.length - 1;\n\n  while (left < right) {\n    if (str[left] !== str[right]) {\n      return false;\n    }\n    left++;\n    right--;\n  }\n\n  return true;\n}\n```",
    },
    {
      id: 167,
      lcSlug: "two-sum-ii-input-array-is-sorted",
      title: "Two Sum II - Input Array Is Sorted",
      diff: "Medium",
      body: "Sorted, so if the sum is too small I need a bigger left. Too big, smaller right. 1-based indexes on the return.\n\n[Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)\n\n```js\n// Time: O(n) · Space: O(1)\n// Two pointers — opposite ends\nvar twoSum = function(numbers, target) {\n  let left = 0;\n  let right = numbers.length - 1;\n\n  while (left < right) {\n    if (numbers[left] + numbers[right] === target) {\n      return [left + 1, right + 1];\n    } else if (numbers[left] + numbers[right] < target) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n};\n```",
    },
    {
      id: 344,
      lcSlug: "reverse-string",
      title: "Reverse String",
      diff: "Easy",
      body: "Do pointers — left/right swap jab tak mil na jaayein.\n\n[Reverse String](https://leetcode.com/problems/reverse-string/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar reverseString = function(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 15,
      lcSlug: "3sum",
      title: "3Sum",
      diff: "Medium",
      body: "Sort karke har `i` ko fix karo, fir `l,r` se 2-sum dhoondo. Duplicate skip karo.\n\n[3Sum](https://leetcode.com/problems/3sum/)\n\n```js\n// Time: O(n²) · Space: O(1)\nvar threeSum = function(nums) {\n  if (nums.length === 0) return [];\n\n  nums = nums.sort((a, b) => a - b);\n  let res = [];\n\n  for (let i = 0; i < nums.length - 2; i++) {\n    // stop duplicates from occuring\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n\n    let j = i + 1;\n    let k = nums.length - 1;\n\n    while (j < k) {\n      let sum = nums[i] + nums[j] + nums[k];\n      if (sum === 0) {\n        res.push([nums[i], nums[j], nums[k]]);\n        // stop duplicates\n        while (nums[j] === nums[j + 1]) j++;\n        while (nums[k] === nums[k + 1]) k--;\n        j++;\n        k--;\n      } else if (sum < 0) {\n        j++;\n      } else {\n        k--;\n      }\n    }\n  }\n\n  return res;\n};\n```",
    },
    {
      id: 11,
      lcSlug: "container-with-most-water",
      title: "Container With Most Water",
      diff: "Medium",
      body: "Do pointer, jo height chhoti usko move karo. Area = min(h[l],h[r]) * width, best rakho.\n\n[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar maxArea = function(height) {\n  let left = 0;\n  let right = height.length - 1;\n  let maxima = 0;\n\n  while (left < right) {\n    let width = right - left;\n    let maxArea = Math.min(height[left], height[right]) * width;\n    maxima = Math.max(maxima, maxArea);\n\n    if (height[left] <= height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n\n  return maxima;\n};\n```",
    },
    {
      id: 75,
      lcSlug: "sort-colors",
      title: "Sort Colors",
      diff: "Medium",
      body: "Dutch national flag — three pointers low/mid/high for 0/1/2.\n\n[Sort Colors](https://leetcode.com/problems/sort-colors/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar sortColors = function(nums) {\n  let lo = 0, mid = 0, hi = nums.length - 1;\n  while (mid <= hi) {\n    if (nums[mid] === 0) {\n      [nums[lo], nums[mid]] = [nums[mid], nums[lo]];\n      lo++; mid++;\n    } else if (nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[hi]] = [nums[hi], nums[mid]];\n      hi--;\n    }\n  }\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 42,
      lcSlug: "trapping-rain-water",
      title: "Trapping Rain Water",
      diff: "Hard",
      body: "Water at `i` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.\n\n[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)\n\n```js\n// Time: O(n) · Space: O(1)\n// Two pointers — water limited by the shorter wall\nvar trap = function(height) {\n  let left = 0;\n  let right = height.length - 1;\n  let leftMax = 0;\n  let rightMax = 0;\n  let trappedWater = 0;\n\n  while (left < right) {\n    leftMax = Math.max(leftMax, height[left]);\n    rightMax = Math.max(rightMax, height[right]);\n\n    if (height[left] < height[right]) {\n      trappedWater += leftMax - height[left];\n      left++;\n    } else {\n      trappedWater += rightMax - height[right];\n      right--;\n    }\n  }\n\n  return trappedWater;\n};\n```",
    },
      ],
    },
  ],
};
