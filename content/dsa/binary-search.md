# Binary Search

If I can ask a yes/no that only flips once (too small → too big), I can cut the range in half. Same loop for “find this value” and “what is the smallest speed that still works.” Pow(x, n) is the same idea: halve n.

```js
// Binary search skeleton (first true)
let lo = 0, hi = n;
while (lo < hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (good(mid)) hi = mid;
  else lo = mid + 1;
}
return lo;
```

## Binary Search

Classic. Mid too small, search right. Too big, search left.

[Binary Search](https://leetcode.com/problems/binary-search/)

```js
// Binary search — find target
// LC: https://leetcode.com/problems/binary-search/
function search(nums, target) {
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
// Binary search — rotated, pick the sorted side
// LC: https://leetcode.com/problems/search-in-rotated-sorted-array/
function search(nums, target) {
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
// Binary search — min of rotated
// LC: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
function findMin(nums) {
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
// Binary search — on the answer
// LC: https://leetcode.com/problems/koko-eating-bananas/
function minEatingSpeed(piles, h) {
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
// Binary search — on capacity
// LC: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
function shipWithinDays(weights, days) {
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
// Binary search — partition the shorter array
// LC: https://leetcode.com/problems/median-of-two-sorted-arrays/
function findMedianSortedArrays(a, b) {
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
// Binary exponentiation
// LC: https://leetcode.com/problems/powx-n/
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
```
