# Binary Search

**Definition:** Binary search finds a target in a sorted or monotonic space by halving the interval each step — `O(log n)`. The general idea: find the first `x` where a monotonic predicate `good(x)` flips from false to true. Exact value search and “minimum feasible answer” share the same loop shape.

**When to use:** Lookup in a sorted array, search in a rotated sorted array, or “smallest speed/capacity that still works” (if `k` works, any larger `k` also works). Also appears in `Pow(x, n)` by repeatedly halving the exponent.

**How it works:** Keep a half-open `[lo, hi)` invariant. `mid = lo + ((hi-lo)>>1)`. If `good(mid)` then `hi = mid`, else `lo = mid+1`. For exact match use closed `lo <= hi` with equality checks. Time `O(log n)`, space `O(1)`.

## Study notes

- **Two uses:** (1) find a value in a sorted array, (2) binary search the **answer** (min speed/capacity) when `feasible(mid)` is monotonic.
- **Invariant:** pick closed `[l,r]` or half-open `[l,r)` and stick to it — bugs become infinite loops / off-by-one.
- **mid:** `lo + ((hi-lo)>>1)` — overflow-safe style.
- **Rotated array:** identify the sorted half; decide which half still holds the target.
- **Traps:** `hi = mid` vs `mid-1`; duplicate bounds; float answers are rare on LC ints.
- **Checklist:** is the predicate monotonic? what does `lo` mean when the loop ends?

### Active revision
Value search or answer search? Closed or half-open bounds? After the loop, what does `lo` (or `hi`) represent?

```js
// Binary search skeleton — first true (lower bound / answer search)
// halve search space; test monotonic predicate
let lo = 0, hi = n; // hi exclusive
while (lo < hi) { // binary search on half-open [lo, hi)
  const mid = lo + ((hi - lo) >> 1);
  if (good(mid)) hi = mid; // predicate true at mid — answer could be mid or left
  else lo = mid + 1; // smaller is true, right jao
}
return lo; // first index where good(x) is true, or n if none

// Exact value skeleton
// exact match return; else discard half
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
// Time: O(log n) · Space: O(1)
// mid; go left/right on sorted array
// Binary search — find target
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};
```

## Search in Rotated Sorted Array

One half is always sorted. If target lives in the sorted half, go there. Else the other half.

[Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

```js
// Time: O(log n) · Space: O(1)
// find sorted half; discard other
// Binary search — rotated, pick the sorted side
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // which side is sorted
    if (nums[right] > nums[mid]) {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (target < nums[mid] && target >= nums[left]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
};
```

## Find Minimum in Rotated Sorted Array

If mid is greater than the right end, the min is to the right of mid. Else min is at mid or left.

[Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

```js
// Time: O(log n) · Space: O(1)
// pivot = unsorted side
// Binary search — min of rotated
var findMin = function(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((right + left) / 2);

    if (nums[right] < nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
};
```

## Koko Eating Bananas

I binary search the speed. `hours(k)` = how long Koko needs at speed k. First k where hours <= h.

[Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

```js
// Time: O(n) · Space: O(n)
// Binary search — on the answer
function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) { // binary search on half-open [lo, hi)
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
// Time: O(n) · Space: O(n)
// Binary search — on capacity
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
  while (lo < hi) { // binary search on half-open [lo, hi)
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
// Time: O(n) · Space: O(n)
// Binary search — partition the shorter array
function findMedianSortedArrays(a, b) {
  // Always binary search on the shorter array
  if (a.length > b.length) return findMedianSortedArrays(b, a);
  const m = a.length, n = b.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    // Left partition must hold (m+n+1)/2 elements total
    const j = ((m + n + 1) >> 1) - i;
    const aL = i ? a[i - 1] : -Infinity;
    const aR = i < m ? a[i] : Infinity;
    const bL = j ? b[j - 1] : -Infinity;
    const bR = j < n ? b[j] : Infinity;
    // Valid partition: every left elem <= every right elem
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
// Time: O(log n) · Space: O(log n)
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
```

## Search Insert Position

The insert index for the target is a lower bound. After binary search, `lo` is the answer.

[Search Insert Position](https://leetcode.com/problems/search-insert-position/)

```js
// Time: O(log n) · Space: O(1)
// lower_bound via binary search
var searchInsert = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};
```

## Find First and Last Position of Element in Sorted Array

Find the lower bound and the upper bound with two binary searches.

[Find First and Last Position](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

```js
// Time: O(log n) · Space: O(1)
var searchRange = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let leftBound = -1;
  let rightBound = -1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target && nums[mid - 1] !== target) {
      leftBound = mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  left = 0;
  right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target && nums[mid + 1] !== target) {
      rightBound = mid;
    }

    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return [leftBound, rightBound];
};
```
