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
