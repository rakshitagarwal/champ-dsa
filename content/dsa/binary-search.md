# Binary Search

Binary Search finds a target in a sorted array by repeatedly dividing the search space in half, eliminating the half that cannot contain the target.

## When to use
- Input is sorted or can be arranged in a monotonic order
- Need O(log n) search time
- Looking for a boundary or a specific value in a range

## How it works

Maintain `left` and `right` pointers that define the current search range. Compute `mid` and compare the middle element with the target, then narrow the range to either the left or right half accordingly.

```js
function binarySearch(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}
```

## Practice problems
- [Binary Search](https://leetcode.com/problems/binary-search/) — Classic application of the pattern
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) — Binary search on a rotated array with modified mid comparison
- [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) — Two binary searches for lower and upper bounds
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/) — Binary search on the integer range for the square root
