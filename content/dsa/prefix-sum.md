# Prefix Sum

**Definition:** Prefix sum `pref[i] = nums[0] + ... + nums[i-1]` (`pref[0]=0`) saare running totals pehle se bana leta hai taaki koi bhi range `[l..r]` ka sum `pref[r+1]-pref[l]` se `O(1)` me mile. Prefix frequencies ko hash karne se target sum wale subarrays gin sakte hain.

**When to use:** Bahut saare range-sum queries, subarray sum == K, product except self (prefix × suffix), ya 2D prefix se submatrix sums.

**How it works:** Ek pass me `pref` banao. "count subarrays sum == k" ke liye `seen` map rakho — `need = cur - k`, `ans += seen.get(need)`. Time `O(n)`, space `O(n)` (bare range ke liye `O(1)`).

```js
// Prefix skeleton — build and query
// Hinglish: running total banao, fir range O(1) me
const pref = [0];
for (const x of nums) pref.push(pref.at(-1) + x);
// [l..r] ka sum = pref[r+1] - pref[l]

// Count subarrays sum == k (hashing prefix)
// Hinglish: cur-k pehle dekha kya?
let cur = 0, ans = 0;
const seen = new Map([[0, 1]]);
for (const x of nums) {
  cur += x;
  ans += seen.get(cur - k) || 0; // need mila to count badhao
  seen.set(cur, (seen.get(cur) || 0) + 1);
}
```
## Product of Array Except Self

Left-to-right: product of everything before `i`. Right-to-left: product of everything after `i`. Multiply. No division, so zeros are fine.

[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

```js
// Hinglish: prefix jod — ek-ek step comment dekho
// Prefix / suffix products
// LC: https://leetcode.com/problems/product-of-array-except-self/
function productExceptSelf(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: prefix jod — ek-ek step comment dekho
// Prefix + map
// LC: https://leetcode.com/problems/subarray-sum-equals-k/
function subarraySum(nums, k) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: prefix jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/range-sum-query-immutable/
function NumArray(nums) {
  // Hinglish: prefix banao
  this.pref = [0];
  for (const x of nums) this.pref.push(this.pref.at(-1)+x);
}
NumArray.prototype.sumRange = function(l, r) {
  return this.pref[r+1] - this.pref[l]; // Hinglish: O(1) range
};
```

## Find Pivot Index

Pivot jahan left sum == right sum. Total sum se left nikalte jao.

[Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)

```js
// Hinglish: prefix jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-pivot-index/
function pivotIndex(nums) {
  // Hinglish: total sum
  const total = nums.reduce((a,b)=>a+b, 0);
  let left = 0;
  for (let i=0;i<nums.length;i++) {
    if (left === total - left - nums[i]) return i; // Hinglish: left == right?
    left += nums[i]; // Hinglish: left badhao
  }
  return -1;
}
```

## Contiguous Array

0 ko -1 banao, fir prefix sum zero wala longest. Hash map me pehli occurrence yaad rakho.

[Contiguous Array](https://leetcode.com/problems/contiguous-array/)

```js
// Hinglish: prefix jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/contiguous-array/
function findMaxLength(nums) {
  // Hinglish: 0 -> -1, sum 0 matlab equal 0/1
  const first = new Map([[0,-1]]); // Hinglish: sum 0 pehle -1 pe dekha
  let sum=0, best=0;
  for (let i=0;i<nums.length;i++) {
    sum += nums[i]===0 ? -1 : 1;
    if (first.has(sum)) best = Math.max(best, i - first.get(sum)); // Hinglish: pehle dekha to length nikalo
    else first.set(sum, i); // Hinglish: pehli baar dekha yaad rakho
  }
  return best;
}
```
