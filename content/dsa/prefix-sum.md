# Prefix Sum

I precompute running totals so I do not keep re-adding the same slice. Range is `pref[right] - pref[left - 1]`. If I also store how many times each running total appeared, I can count subarrays that sum to k.

```js
// Prefix skeleton
const pref = [0];
for (const x of nums) pref.push(pref.at(-1) + x);
// sum of i..j = pref[j + 1] - pref[i]
```

## Product of Array Except Self

Left-to-right: product of everything before `i`. Right-to-left: product of everything after `i`. Multiply. No division, so zeros are fine.

[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

```js
// Prefix / suffix products
// LC: https://leetcode.com/problems/product-of-array-except-self/
function productExceptSelf(nums) {
  const n = nums.length, out = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    out[i] *= left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= right;
    right *= nums[i];
  }
  return out;
}
```

## Subarray Sum Equals K

Not on the PDF list, but this is the other half of prefix sums. `count += how many times I have already seen (sum - k)`.

[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

```js
// Prefix + map
// LC: https://leetcode.com/problems/subarray-sum-equals-k/
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}
```
