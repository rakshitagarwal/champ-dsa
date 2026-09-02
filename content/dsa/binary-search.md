# Binary Search

**Definition:** Binary Search sorted / monotonic space me target dhoondhne ki technique hai — har step me search interval aadha kar dete hain, `O(log n)`. General soch: sabse pehla `x` dhoondo jahan monotonic predicate `good(x)` `false → true` flip hota hai. Value search aur "minimum feasible answer" same loop hai.

**When to use:** Sorted array me dhoondhna, rotated array me search, ya "sabse chhota speed/capacity jo kaam kar jaye" (agar `k` kaam karta hai to bada `k` bhi karega). Power `Pow(x,n)` me bhi n ko half karte hain.

**How it works:** Half-open `[lo, hi)` invariant rakho. `mid = lo + ((hi-lo)>>1)`. Agar `good(mid)` to `hi = mid` warna `lo = mid+1`. Exact value ke liye `lo <= hi` wala equality check. Time `O(log n)`, space `O(1)`.

```js
// Binary search skeleton — first true (lower bound / answer search)
// Hinglish: aadha kaato, check karo good hai kya
let lo = 0, hi = n; // hi exclusive
while (lo < hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (good(mid)) hi = mid; // ye wala bhi chalega, left dekho
  else lo = mid + 1; // chhota hai, right jao
}
return lo; // pehla good, ya n agar koi nahi

// Exact value skeleton
// Hinglish: barabar mila to return, nahi to side choose karo
let l = 0, r = nums.length - 1;
while (l <= r) {
  const m = l + ((r - l) >> 1);
  if (nums[m] === target) return m;
  else if (nums[m] < target) l = m + 1;
  else r = m - 1;
}
return -1;
```
## Binary Search

Classic. Mid too small, search right. Too big, search left.

[Binary Search](https://leetcode.com/problems/binary-search/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — find target
// LC: https://leetcode.com/problems/binary-search/
function search(nums, target) {
  // Hinglish: step 1 — base case check karo
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

## Search in Rotated Sorted Array

One half is always sorted. If target lives in the sorted half, go there. Else the other half.

[Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — rotated, pick the sorted side
// LC: https://leetcode.com/problems/search-in-rotated-sorted-array/
function search(nums, target) {
  // Hinglish: step 1 — base case check karo
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

## Find Minimum in Rotated Sorted Array

If mid is greater than the right end, the min is to the right of mid. Else min is at mid or left.

[Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — min of rotated
// LC: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
function findMin(nums) {
  // Hinglish: step 1 — base case check karo
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}
```

## Koko Eating Bananas

I binary search the speed. `hours(k)` = how long Koko needs at speed k. First k where hours <= h.

[Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — on the answer
// LC: https://leetcode.com/problems/koko-eating-bananas/
function minEatingSpeed(piles, h) {
  // Hinglish: step 1 — base case check karo
  let lo = 1, hi = Math.max(...piles);
  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (hours(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

## Capacity To Ship Packages Within D Days

Same as Koko. Smallest capacity such that I can ship in `days` days. Greedy: fill the boat until the next package does not fit, that starts a new day.

[Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — on capacity
// LC: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
function shipWithinDays(weights, days) {
  // Hinglish: step 1 — base case check karo
  let lo = Math.max(...weights), hi = weights.reduce((a, b) => a + b, 0);
  const need = (cap) => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) {
        d++;
        load = 0;
      }
      load += w;
    }
    return d;
  };
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (need(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

## Median of Two Sorted Arrays

I binary search the cut on the shorter array so left parts have the same count (or one extra). Left max <= right min on both arrays. Then median is from those four border numbers.

[Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — partition the shorter array
// LC: https://leetcode.com/problems/median-of-two-sorted-arrays/
function findMedianSortedArrays(a, b) {
  // Hinglish: step 1 — base case check karo
  if (a.length > b.length) return findMedianSortedArrays(b, a);
  const m = a.length, n = b.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    const aL = i ? a[i - 1] : -Infinity;
    const aR = i < m ? a[i] : Infinity;
    const bL = j ? b[j - 1] : -Infinity;
    const bR = j < n ? b[j] : Infinity;
    if (aL <= bR && bL <= aR) {
      const left = Math.max(aL, bL);
      if ((m + n) % 2) return left;
      return (left + Math.min(aR, bR)) / 2;
    }
    if (aL > bR) hi = i - 1;
    else lo = i + 1;
  }
}
```

## Pow(x, n)

Halve n. If n is odd, multiply by x one extra time. Negative n → 1 / pow(x, -n). Watch `n = -2^31`.

[Pow(x, n)](https://leetcode.com/problems/powx-n/)

```js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary exponentiation
// LC: https://leetcode.com/problems/powx-n/
function myPow(x, n) {
  // Hinglish: step 1 — base case check karo
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
```
