# Prefix Sum

**Definition:** Prefix sum `pref[i] = nums[0] + ... + nums[i-1]` (`pref[0]=0`) saare running totals pehle se bana leta hai taaki koi bhi range `[l..r]` ka sum `pref[r+1]-pref[l]` se `O(1)` me mile. Prefix frequencies ko hash karne se target sum wale subarrays gin sakte hain.

**When to use:** Bahut saare range-sum queries, subarray sum == K, product except self (prefix × suffix), ya 2D prefix se submatrix sums.

**How it works:** Ek pass me `pref` banao. "count subarrays sum == k" ke liye `seen` map rakho — `need = cur - k`, `ans += seen.get(need)`. Time `O(n)`, space `O(n)` (bare range ke liye `O(1)`).

## Study notes

- **Identity:** `sum(l..r) = pref[r+1] - pref[l]` with `pref[0]=0`.
- **Hash combo:** subarray sum = k → count prior prefixes `cur - k` (negatives OK; sliding window fails).
- **Product except self:** prefix × suffix, no division.
- **2D:** `sum(r1,c1,r2,c2)` inclusion-exclusion on 2D prefix.
- **Traps:** off-by-one on pref length `n+1`; forget `seen.set(0,1)`; mutate nums in place carefully.
- **Checklist:** many range queries? sum/product of contiguous? hashing needed?

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

Baar-baar range sum pucha jayega. Prefix banao, fir `sum(l,r)=pref[r+1]-pref[l]` O(1) me.

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

Pivot jahan left sum == right sum. Total sum se left nikalte jao.

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

0 ko -1 banao, fir prefix sum zero wala longest. Hash map me pehli occurrence yaad rakho.

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
