# Prefix Sum

**Definition:** A prefix sum `pref[i] = nums[0] + ... + nums[i-1]` (with `pref[0]=0`) precomputes running totals so any range sum `[l..r]` is `pref[r+1]-pref[l]` in `O(1)`. Hashing prefix frequencies counts subarrays with a target sum.

**When to use:** Many range-sum queries, subarray sum equals K, product except self (prefix × suffix), or 2D prefix for submatrix sums.

**How it works:** Build `pref` in one pass. For "count subarrays sum == k": scan once with `seen` map of prefix frequencies — `need = cur - k`, `ans += seen.get(need)`. Time `O(n)`, space `O(n)` (or `O(1)` for bare range).

```js
// Prefix skeleton — build and query
const pref = [0];
for (const x of nums) pref.push(pref.at(-1) + x);
// sum of [l..r] inclusive = pref[r+1] - pref[l]

// Count subarrays sum == k (hashing prefix)
let cur = 0, ans = 0;
const seen = new Map([[0, 1]]);
for (const x of nums) {
  cur += x;
  ans += seen.get(cur - k) || 0;
  seen.set(cur, (seen.get(cur) || 0) + 1);
}
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
