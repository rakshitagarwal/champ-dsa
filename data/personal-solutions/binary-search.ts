import type { SolutionGroup } from "@/data/solutions/types";

export const BINARY_SEARCH_SOLUTIONS: SolutionGroup = {
  id: "binary-search",
  title: "Binary Search",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 704,
      lcSlug: "binary-search",
      title: "Binary Search",
      diff: "Easy",
      body: "Classic. Mid too small, search right. Too big, search left.\n\n[Binary Search](https://leetcode.com/problems/binary-search/)\n\n```js\n// Time: O(log n) · Space: O(1)\n// Binary search — find target\nvar search = function(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (left <= right) {\n    let mid = left + Math.floor((right - left) / 2);\n\n    if (nums[mid] === target) return mid;\n\n    if (nums[mid] > target) {\n      right = mid - 1;\n    } else {\n      left = mid + 1;\n    }\n  }\n\n  return -1;\n};\n```",
    },
    {
      id: 35,
      lcSlug: "search-insert-position",
      title: "Search Insert Position",
      diff: "Easy",
      body: "Target kahan insert hoga wahi lower_bound hai. Binary search se `lo` hi answer.\n\n[Search Insert Position](https://leetcode.com/problems/search-insert-position/)\n\n```js\n// Time: O(log n) · Space: O(1)\nvar searchInsert = function(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (left <= right) {\n    let mid = left + Math.floor((right - left) / 2);\n\n    if (nums[mid] === target) {\n      return mid;\n    }\n\n    if (nums[mid] > target) {\n      right = mid - 1;\n    } else {\n      left = mid + 1;\n    }\n  }\n\n  return left;\n};\n```",
    },
    {
      id: 278,
      lcSlug: "first-bad-version",
      title: "First Bad Version",
      diff: "Easy",
      body: "Binary search on answer space — pehla bad version find.\n\n[First Bad Version](https://leetcode.com/problems/first-bad-version/)\n\n```js\n// Time: O(log n) · Space: O(1)\nvar solution = function(isBadVersion) {\n  return function(n) {\n    let lo = 1, hi = n;\n    while (lo < hi) {\n      const mid = lo + ((hi - lo) >> 1);\n      if (isBadVersion(mid)) hi = mid;\n      else lo = mid + 1;\n    }\n    return lo;\n  };\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 34,
      lcSlug: "find-first-and-last-position-of-element-in-sorted-array",
      title: "Find First and Last Position of Element in Sorted Array",
      diff: "Medium",
      body: "Lower bound aur upper bound ka khel. Do binary search.\n\n[Find First And Last Position Of Element In Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)\n\n```js\n// Time: O(log n) · Space: O(1)\nvar searchRange = function(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  let leftBound = -1;\n  let rightBound = -1;\n\n  while (left <= right) {\n    let mid = left + Math.floor((right - left) / 2);\n\n    if (nums[mid] === target && nums[mid - 1] !== target) {\n      leftBound = mid;\n    }\n\n    if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  left = 0;\n  right = nums.length - 1;\n\n  while (left <= right) {\n    let mid = left + Math.floor((right - left) / 2);\n\n    if (nums[mid] === target && nums[mid + 1] !== target) {\n      rightBound = mid;\n    }\n\n    if (nums[mid] <= target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  return [leftBound, rightBound];\n};\n```",
    },
    {
      id: 33,
      lcSlug: "search-in-rotated-sorted-array",
      title: "Search in Rotated Sorted Array",
      diff: "Medium",
      body: "One half is always sorted. If target lives in the sorted half, go there. Else the other half.\n\n[Search in Rotated Sorted Array ](https://leetcode.com/problems/search-in-rotated-sorted-array/)\n\n```js\n// Time: O(log n) · Space: O(1)\n// Binary search — rotated, pick the sorted side\nvar search = function(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (left <= right) {\n    let mid = left + Math.floor((right - left) / 2);\n\n    if (nums[mid] === target) {\n      return mid;\n    }\n\n    // which side is sorted\n    if (nums[right] > nums[mid]) {\n      if (target > nums[mid] && target <= nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    } else {\n      if (target < nums[mid] && target >= nums[left]) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n  }\n\n  return -1;\n};\n```",
    },
    {
      id: 153,
      lcSlug: "find-minimum-in-rotated-sorted-array",
      title: "Find Minimum in Rotated Sorted Array",
      diff: "Medium",
      body: "If mid is greater than the right end, the min is to the right of mid. Else min is at mid or left.\n\n[Find Minimum In Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)\n\n```js\n// Time: O(log n) · Space: O(1)\n// Binary search — min of rotated\nvar findMin = function(nums) {\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (left < right) {\n    let mid = Math.floor((right + left) / 2);\n\n    if (nums[right] < nums[mid]) {\n      left = mid + 1;\n    } else {\n      right = mid;\n    }\n  }\n\n  return nums[left];\n};\n```",
    },
    {
      id: 875,
      lcSlug: "koko-eating-bananas",
      title: "Koko Eating Bananas",
      diff: "Medium",
      body: "Binary search on answer — speed k pe hours check, min k find.\n\n[Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)\n\n```js\n// Time: O(n log m) · Space: O(1)\nvar minEatingSpeed = function(piles, h) {\n  let lo = 1, hi = Math.max(...piles);\n  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);\n  while (lo < hi) {\n    const mid = lo + ((hi - lo) >> 1);\n    if (hours(mid) <= h) hi = mid;\n    else lo = mid + 1;\n  }\n  return lo;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 4,
      lcSlug: "median-of-two-sorted-arrays",
      title: "Median of Two Sorted Arrays",
      diff: "Hard",
      body: "Binary search on partition — left max <= right min dono arrays me.\n\n[Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)\n\n```js\n// Time: O(log(min(m,n))) · Space: O(1)\nvar findMedianSortedArrays = function(nums1, nums2) {\n  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n  const m = nums1.length, n = nums2.length;\n  let lo = 0, hi = m;\n  while (lo <= hi) {\n    const i = (lo + hi) >> 1;\n    const j = ((m + n + 1) >> 1) - i;\n    const L1 = i === 0 ? -Infinity : nums1[i - 1];\n    const R1 = i === m ? Infinity : nums1[i];\n    const L2 = j === 0 ? -Infinity : nums2[j - 1];\n    const R2 = j === n ? Infinity : nums2[j];\n    if (L1 <= R2 && L2 <= R1) {\n      if ((m + n) % 2 === 0) return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;\n      return Math.max(L1, L2);\n    }\n    if (L1 > R2) hi = i - 1;\n    else lo = i + 1;\n  }\n  return 0;\n};\n```",
    },
      ],
    },
  ],
};
