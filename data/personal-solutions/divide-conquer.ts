import type { SolutionGroup } from "@/data/solutions/types";

export const DIVIDE_CONQUER_SOLUTIONS: SolutionGroup = {
  id: "divide-conquer",
  title: "Divide & Conquer",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 88,
      lcSlug: "merge-sorted-array",
      title: "Merge Sorted Array",
      diff: "Easy",
      body: "Do pointers peeche se — badi value nums1 ke end pe fill.\n\n[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)\n\n```js\n// Time: O(m+n) · Space: O(1)\nvar merge = function(nums1, m, nums2, n) {\n  let i = m - 1, j = n - 1, k = m + n - 1;\n  while (j >= 0) {\n    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];\n    else nums1[k--] = nums2[j--];\n  }\n};\n```",
    },
    {
      id: 169,
      lcSlug: "majority-element",
      title: "Majority Element",
      diff: "Easy",
      body: "Boyer-Moore vote — divide & conquer bhi chalega, yahan linear vote.\n\n[Majority Element](https://leetcode.com/problems/majority-element/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar majorityElement = function(nums) {\n  let cand = null, count = 0;\n  for (const n of nums) {\n    if (count === 0) cand = n;\n    count += n === cand ? 1 : -1;\n  }\n  return cand;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 912,
      lcSlug: "sort-an-array",
      title: "Sort an Array",
      diff: "Medium",
      body: "Merge sort — divide halves, merge sorted.\n\n[Sort an Array](https://leetcode.com/problems/sort-an-array/)\n\n```js\n// Time: O(n log n) · Space: O(n)\nvar sortArray = function(nums) {\n  if (nums.length <= 1) return nums;\n  const mid = nums.length >> 1;\n  const left = sortArray(nums.slice(0, mid));\n  const right = sortArray(nums.slice(mid));\n  const res = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) res.push(left[i++]);\n    else res.push(right[j++]);\n  }\n  while (i < left.length) res.push(left[i++]);\n  while (j < right.length) res.push(right[j++]);\n  return res;\n};\n```",
    },
    {
      id: 215,
      lcSlug: "kth-largest-element-in-an-array",
      title: "Kth Largest Element in an Array",
      diff: "Medium",
      body: "Quickselect (divide & conquer) — average O(n) kth largest.\n\n[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)\n\n```js\n// Time: O(n) avg · Space: O(1)\nvar findKthLargest = function(nums, k) {\n  const target = nums.length - k;\n\n  const partition = (lo, hi) => {\n    const pivot = nums[hi];\n    let i = lo;\n    for (let j = lo; j < hi; j++) {\n      if (nums[j] <= pivot) {\n        [nums[i], nums[j]] = [nums[j], nums[i]];\n        i++;\n      }\n    }\n    [nums[i], nums[hi]] = [nums[hi], nums[i]];\n    return i;\n  };\n\n  let lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    const p = partition(lo, hi);\n    if (p === target) return nums[p];\n    if (p < target) lo = p + 1;\n    else hi = p - 1;\n  }\n  return -1;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 315,
      lcSlug: "count-of-smaller-numbers-after-self",
      title: "Count of Smaller Numbers After Self",
      diff: "Hard",
      body: "Merge sort counting — merge pe right-half smaller count accumulate.\n\n[Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)\n\n```js\n// Time: O(n log n) · Space: O(n)\nvar countSmaller = function(nums) {\n  const n = nums.length;\n  const counts = new Array(n).fill(0);\n  const idx = nums.map((v, i) => [v, i]);\n\n  const mergeSort = (arr) => {\n    if (arr.length <= 1) return arr;\n    const mid = arr.length >> 1;\n    const left = mergeSort(arr.slice(0, mid));\n    const right = mergeSort(arr.slice(mid));\n    const merged = [];\n    let i = 0, j = 0, rightTaken = 0;\n    while (i < left.length || j < right.length) {\n      if (j === right.length || (i < left.length && left[i][0] <= right[j][0])) {\n        counts[left[i][1]] += rightTaken;\n        merged.push(left[i++]);\n      } else {\n        rightTaken++;\n        merged.push(right[j++]);\n      }\n    }\n    return merged;\n  };\n\n  mergeSort(idx);\n  return counts;\n};\n```",
    },
    {
      id: 53,
      lcSlug: "maximum-subarray",
      title: "Maximum Subarray",
      diff: "Medium",
      body: "Kadane: keep a running sum. If it goes negative, drop it and start at the next number. Track the best running sum. Negatives are allowed — start `best` at `-Infinity`.\n\n[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)\n\n```js\n// Time: O(n) · Space: O(1)\n/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n\n    let currMax = nums[0];\n    let maxima = nums[0];\n\n    for(let i = 1; i < nums.length; i++){\n\n        currMax = Math.max(nums[i], currMax + nums[i]);\n        maxima = Math.max(maxima, currMax);\n\n    }\n\n    return maxima;\n\n};\n```",
    },
      ],
    },
  ],
};
