# Prefix Sum

Precompute running totals so a range becomes `pref[r] - pref[l - 1]`. With a map of prefix values you count subarrays whose sum is k in one pass.

```js
// Prefix sum skeleton
const pref = [0];
for (const x of nums) pref.push(pref.at(-1) + x);
// range i..j inclusive: pref[j + 1] - pref[i]
```

## Range sum

Build once, query O(1) — [Range Sum Query Immutable](https://leetcode.com/problems/range-sum-query-immutable/).

```js
// Prefix sum — build then query
// LC: https://leetcode.com/problems/range-sum-query-immutable/
function NumArray(nums) {
  this.pref = [0];
  for (const x of nums) this.pref.push(this.pref.at(-1) + x);
}
NumArray.prototype.sumRange = function (left, right) {
  // range left..right
  return this.pref[right + 1] - this.pref[left];
};
```

## Subarray sum equals k

Map of prefix counts — [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/).

```js
// Prefix sum — count prefixes that equal current - k
// LC: https://leetcode.com/problems/subarray-sum-equals-k/
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // prefix 0 seen once
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    // lookup: how many prefixes equal sum - k?
    count += seen.get(sum - k) || 0;
    // store this prefix
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}
```

## Product except self

Prefix from left, suffix from right — [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/).

```js
// Prefix / suffix products (same idea as prefix sums)
// LC: https://leetcode.com/problems/product-of-array-except-self/
function productExceptSelf(nums) {
  const n = nums.length, out = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    out[i] *= left; // product of everything before i
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= right; // product of everything after i
    right *= nums[i];
  }
  return out;
}
```

**More:** [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/), [Contiguous Array](https://leetcode.com/problems/contiguous-array/), [Running Sum](https://leetcode.com/problems/running-sum-of-1d-array/).
