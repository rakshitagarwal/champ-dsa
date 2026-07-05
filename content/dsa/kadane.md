# Kadane's Algorithm

Find the maximum sum of a contiguous subarray in O(n) by deciding at each position whether to extend or start a new subarray.

## When to use
- Maximum subarray sum (contiguous sequence)
- Problems where you track a running "best so far" across a linear scan
- Circular array variations or stock-profit equivalents

## How it works

Iterate through the array, maintaining `currentMax` (the best sum ending at the current index) and `globalMax` (the best sum seen overall). At each step, `currentMax = max(nums[i], currentMax + nums[i])` — either start fresh or extend the existing subarray.

```js
function maxSubArray(nums) {
  let cur = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(max, cur);
  }
  return max;
}
```

## Practice problems
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — Standard Kadane's
- [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) — Kadane's on linear + total minus min
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) — Track min price, Kadane-like max difference
- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) — Track both max and min (sign flips)
