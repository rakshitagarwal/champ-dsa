# Prefix Sum

**Definition:** A prefix sum `pref[i] = nums[0] + ... + nums[i-1]` (`pref[0]=0`) precomputes running totals so any range `[l..r]` sums to `pref[r+1]-pref[l]` in `O(1)`. Hashing prefix frequencies lets you count subarrays with a target sum.

**When to use:** Many range-sum queries, subarray sum == K, product except self (prefix × suffix), or 2D prefix for submatrix sums.

**How it works:** Build `pref` in one pass. To count subarrays with sum == k, keep a `seen` map — `need = cur - k`, then `ans += seen.get(need)`. Time `O(n)`, space `O(n)` (bare range queries can be `O(1)` extra after the build).

## Study notes

- **Identity:** `sum(l..r) = pref[r+1] - pref[l]` with `pref[0]=0`.
- **Hash combo:** subarray sum = k → count prior prefixes `cur - k` (negatives OK; sliding window fails).
- **Product except self:** prefix × suffix, no division.
- **2D:** `sum(r1,c1,r2,c2)` inclusion-exclusion on a 2D prefix.
- **Traps:** off-by-one on pref length `n+1`; forget `seen.set(0,1)`; mutate nums in place carefully.
- **Checklist:** many range queries? sum/product of a contiguous range? hashing needed?

## Active revision

- Write the range identity with `pref[0]=0` from memory.
- Why does subarray sum == k need a hash map when negatives exist?
- Product except self: what do left and right passes each store?

```js
// Prefix skeleton — build and query
// build running totals, then answer ranges in O(1)
const pref = [0];
for (const x of nums) pref.push(pref.at(-1) + x);
// range sum [l..r] = pref[r+1] − pref[l]

// Count subarrays sum == k (hashing prefix)
// have we seen prefix sum cur − k before?
let cur = 0, ans = 0;
const seen = new Map([[0, 1]]);
for (const x of nums) {
  cur += x;
  ans += seen.get(cur - k) || 0; // prefix existed — increment subarray count
  seen.set(cur, (seen.get(cur) || 0) + 1);
}
```
## Product of Array Except Self

Left-to-right: product of everything before `i`. Right-to-left: product of everything after `i`. Multiply. No division, so zeros are fine.

[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

```js
// Time: O(n) · Space: O(1)
// prefix * suffix without division
// Prefix / suffix products
var productExceptSelf = function(nums) {
  let res = [];
  let start = 1;

  for (let i = 0; i < nums.length; i++) {
    res.push(start);
    start = start * nums[i];
  }

  let start2 = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] = start2 * res[i];
    start2 = start2 * nums[i];
  }

  return res;
};
```

## Subarray Sum Equals K

Not on the PDF list, but this is the other half of prefix sums. `count += how many times I have already seen (sum - k)`.

[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

```js
// Time: O(n) · Space: O(n)
// Prefix + map
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

## Range Sum Query - Immutable

Many range-sum queries coming. Build a prefix, then `sum(l,r)=pref[r+1]-pref[l]` in O(1).

[Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)

```js
// Time: O(n) · Space: O(n)
function NumArray(nums) {
  // build prefix array
  this.pref = [0];
  for (const x of nums) this.pref.push(this.pref.at(-1)+x);
}
NumArray.prototype.sumRange = function(l, r) {
  return this.pref[r+1] - this.pref[l]; // O(1) range
};
```

## Find Pivot Index

Pivot where left sum equals right sum. Walk left sum against the total.

[Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)

```js
// Time: O(n) · Space: O(n)
function pivotIndex(nums) {
  // total sum
  const total = nums.reduce((a,b)=>a+b, 0);
  let left = 0;
  for (let i=0;i<nums.length;i++) {
    if (left === total - left - nums[i]) return i; // left == right?
    left += nums[i]; // sum too small — move left inward for a larger value
  }
  return -1;
}
```

## Contiguous Array

Map 0 → −1, then find the longest span whose prefix sum returns to a seen value. Store the first index of each prefix in a hash map.

[Contiguous Array](https://leetcode.com/problems/contiguous-array/)

```js
// Time: O(n) · Space: O(n)
function findMaxLength(nums) {
  // prefix 0 at index −1 — empty prefix has equal 0s and 1s
  const first = new Map([[0,-1]]); // prefix sum 0 seen at index −1 (empty prefix)
  let sum=0, best=0;
  for (let i=0;i<nums.length;i++) {
    sum += nums[i]===0 ? -1 : 1;
    if (first.has(sum)) best = Math.max(best, i - first.get(sum)); // same prefix sum — update longest span
    else first.set(sum, i); // first time seeing this prefix — store index
  }
  return best;
}
```
