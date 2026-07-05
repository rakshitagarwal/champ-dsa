# Modified Binary Search

Binary search adapted for arrays that are rotated, have unknown bounds, or where the target is not directly comparable.

## When to use
- Search in a rotated sorted array
- Find a peak or minimum in a rotated/unknown array
- Search space is monotonic but not a simple sorted array
- "Find the boundary" problems (first bad version, etc.)

## How it works

Maintain `lo` and `hi` pointers. Compute `mid` and use a condition to decide which half to discard. For rotated arrays, check which side is sorted by comparing `nums[lo]` vs `nums[mid]`. Narrow the search space until `lo` passes `hi`.

```js
function searchRotated(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

## Practice problems
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) — Classic rotated array search
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) — Find pivot with modified binary search
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) — Binary search on a flattened 2D matrix
- [Find Peak Element](https://leetcode.com/problems/find-peak-element/) — Binary search on unsorted array using slope direction
