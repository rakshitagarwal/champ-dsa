# Prefix Sum

Precompute cumulative sums from the start so that any subarray sum can be answered in O(1).

## When to use
- Range sum queries over an array (multiple or repeated)
- Finding subarrays with a target sum (often combined with a hash map)
- Problems involving equality of left/right partitions

## How it works

Build an array `prefixSum` where `prefixSum[i]` is the sum of elements from index 0 to i-1. The sum of `nums[l..r]` is then `prefixSum[r+1] - prefixSum[l]`. For subarray target problems, use a hash map to store seen prefix sums.

```js
function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}
```

## Practice problems
- [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) — Direct prefix sum lookup
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) — Prefix sum with hash map
- [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) — Prefix and suffix products
- [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) — Left sum equals right sum via prefix
