# Binary Search

Cut the search space in half while a monotonic condition holds. Same loop for "find a value" and "search on the answer."

```js
// Binary search skeleton
let lo = 0, hi = n; // hi exclusive, or last index — pick one and stay consistent
while (lo < hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (good(mid)) hi = mid; // first true
  else lo = mid + 1;
}
return lo;
```

## Find a value

Classic mid compare — [Binary Search](https://leetcode.com/problems/binary-search/).

```js
// Binary search — find target
// LC: https://leetcode.com/problems/binary-search/
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    // drop the half that cannot contain target
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

## Insertion point

First index where nums[i] >= target — [Search Insert Position](https://leetcode.com/problems/search-insert-position/).

```js
// Binary search — lower bound
// LC: https://leetcode.com/problems/search-insert-position/
function searchInsert(nums, target) {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    // first index that is not less than target
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

## Search on the answer

Binary search speeds, not the array — [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/).

```js
// Binary search — on the answer (minimum feasible speed)
// LC: https://leetcode.com/problems/koko-eating-bananas/
function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    // can we finish at speed mid?
    if (hours(mid) <= h) hi = mid; // try slower
    else lo = mid + 1;             // too slow
  }
  return lo;
}
```

**More:** [First Bad Version](https://leetcode.com/problems/first-bad-version/), [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/), [Capacity To Ship Packages](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/).
