import type { SolutionGroup } from "@/data/solutions/types";

export const PREFIX_SUM_SOLUTIONS: SolutionGroup = {
  id: "prefix-sum",
  title: "Prefix Sum",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 1480,
      lcSlug: "running-sum-of-1d-array",
      title: "Running Sum of 1d Array",
      diff: "Easy",
      body: "Prefix — har index pe running total overwrite/store.\n\n[Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/)\n\n```js\n// Time: O(n) · Space: O(1) extra\nvar runningSum = function(nums) {\n  for (let i = 1; i < nums.length; i++) nums[i] += nums[i - 1];\n  return nums;\n};\n```",
    },
    {
      id: 303,
      lcSlug: "range-sum-query-immutable",
      title: "Range Sum Query - Immutable",
      diff: "Easy",
      body: "Prefix array — sumRange(l,r) = prefix[r+1] - prefix[l].\n\n[Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)\n\n```js\n// Time: O(1) query · Space: O(n)\nvar NumArray = function(nums) {\n  this.prefix = [0];\n  for (const n of nums) this.prefix.push(this.prefix[this.prefix.length - 1] + n);\n};\nNumArray.prototype.sumRange = function(left, right) {\n  return this.prefix[right + 1] - this.prefix[left];\n};\n```",
    },
    {
      id: 724,
      lcSlug: "find-pivot-index",
      title: "Find Pivot Index",
      diff: "Easy",
      body: "Total sum jaano — left sum == right sum wala index.\n\n[Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar pivotIndex = function(nums) {\n  const total = nums.reduce((a, b) => a + b, 0);\n  let left = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (left === total - left - nums[i]) return i;\n    left += nums[i];\n  }\n  return -1;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 560,
      lcSlug: "subarray-sum-equals-k",
      title: "Subarray Sum Equals K",
      diff: "Medium",
      body: "Prefix sum pattern: running sum track karo, map me frequency — sum(l..r)=k ⇒ prefix[r]-prefix[l-1]=k.\n\n[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)\n\n```js\n// Time: O(n) · Space: O(n)\nvar subarraySum = function(nums, k) {\n  const seen = new Map([[0, 1]]);\n  let prefix = 0, ans = 0;\n  for (const x of nums) {\n    prefix += x;\n    if (seen.has(prefix - k)) ans += seen.get(prefix - k);\n    seen.set(prefix, (seen.get(prefix) || 0) + 1);\n  }\n  return ans;\n};\n```",
    },
    {
      id: 525,
      lcSlug: "contiguous-array",
      title: "Contiguous Array",
      diff: "Medium",
      body: "0 ko -1 treat — prefix 0 pehle kab aaya, max length.\n\n[Contiguous Array](https://leetcode.com/problems/contiguous-array/)\n\n```js\n// Time: O(n) · Space: O(n)\nvar findMaxLength = function(nums) {\n  const map = new Map([[0, -1]]);\n  let sum = 0, best = 0;\n  for (let i = 0; i < nums.length; i++) {\n    sum += nums[i] === 1 ? 1 : -1;\n    if (map.has(sum)) best = Math.max(best, i - map.get(sum));\n    else map.set(sum, i);\n  }\n  return best;\n};\n```",
    },
    {
      id: 238,
      lcSlug: "product-of-array-except-self",
      title: "Product of Array Except Self",
      diff: "Medium",
      body: "Left-to-right: product of everything before `i`. Right-to-left: product of everything after `i`. Multiply. No division, so zeros are fine.\n\n[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)\n\n```js\n// Time: O(n) · Space: O(1)\n// Prefix / suffix products\nvar productExceptSelf = function(nums) {\n  let res = [];\n  let start = 1;\n\n  for (let i = 0; i < nums.length; i++) {\n    res.push(start);\n    start = start * nums[i];\n  }\n\n  let start2 = 1;\n\n  for (let i = nums.length - 1; i >= 0; i--) {\n    res[i] = start2 * res[i];\n    start2 = start2 * nums[i];\n  }\n\n  return res;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 974,
      lcSlug: "subarray-sums-divisible-by-k",
      title: "Subarray Sums Divisible by K",
      diff: "Medium",
      body: "Prefix mod K — same remainder pehle aaya to subarray divisible.\n\n[Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)\n\n```js\n// Time: O(n) · Space: O(k)\nvar subarraysDivByK = function(nums, k) {\n  const map = new Map([[0, 1]]);\n  let sum = 0, count = 0;\n  for (const n of nums) {\n    sum += n;\n    let mod = ((sum % k) + k) % k;\n    count += map.get(mod) || 0;\n    map.set(mod, (map.get(mod) || 0) + 1);\n  }\n  return count;\n};\n```",
    },
      ],
    },
  ],
};
