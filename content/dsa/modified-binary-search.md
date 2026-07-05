# Modified Binary Search

Standard binary search works on a sorted array: compare the mid element to the target and discard the half that cannot contain the target. Modified binary search adapts this core pattern to search spaces that are **rotated**, **have unknown bounds**, **non-uniformly monotonic**, or where the **comparison predicate is implicit** rather than a direct value equality. The same O(log n) spirit applies, but the decision rule for which half to discard becomes more creative.

Common scenarios include searching a rotated sorted array, finding a peak in an unsorted array, finding the first/last occurrence of a target, or searching in a 2D matrix where rows are sorted. The unifying idea is that the search space is partitioned by a condition that is monotonic—once the condition switches from false to true (or vice versa), it never switches back.

## When to use

- Search in a rotated sorted array (distinct or with duplicates)
- Find the minimum or maximum in a rotated sorted array
- Search space is monotonic but the array is not directly sorted (e.g., find peak element, find first bad version)
- Find the boundary where a predicate changes (first true, last false)
- Search in a 2D matrix where rows and columns are sorted independently
- Find the square root or other mathematical bounds with a monotonic predicate

## How it works

### Core concept

Maintain two pointers `lo` and `hi` that define the current search interval. Compute `mid` and use problem-specific logic to decide which half to discard. The key invariant is that the answer is guaranteed to lie within `[lo, hi]` at all times.

For rotated arrays, the trick is to identify which side of `mid` is "normally sorted" (by comparing `nums[lo]` to `nums[mid]`). If the left half is sorted, check if the target lies within that sorted range; if so, narrow left, otherwise go right. If the right half is sorted, do the symmetric check. This works because a rotated array is two sorted segments concatenated.

For "find boundary" problems (like First Bad Version), the condition is a function `isBad(mid)` that is false for all indices before the boundary and true after it. Binary search finds the first mid where the condition is true.

### Step-by-step approach

1. **Rotated array search:**
   - Set `lo = 0`, `hi = nums.length - 1`.
   - While `lo <= hi`:
     - Compute `mid = Math.floor((lo + hi) / 2)`.
     - If `nums[mid] === target`, return mid.
     - If `nums[lo] <= nums[mid]` (left half is sorted):
       - If `target >= nums[lo] && target < nums[mid]`, search left (`hi = mid - 1`).
       - Else search right (`lo = mid + 1`).
     - Else (right half is sorted):
       - If `target > nums[mid] && target <= nums[hi]`, search right (`lo = mid + 1`).
       - Else search left (`hi = mid - 1`).

2. **Find boundary (first true):**
   - Set `lo = 0`, `hi = n`.
   - While `lo < hi`:
     - `mid = Math.floor((lo + hi) / 2)`.
     - If `condition(mid)` is true, `hi = mid` (answer is at mid or to the left).
     - Else `lo = mid + 1` (answer is to the right).
   - Return `lo`.

3. **Find peak element:**
   - Compare `nums[mid]` with `nums[mid + 1]`.
   - If `nums[mid] < nums[mid + 1]`, the peak is to the right (`lo = mid + 1`).
   - Otherwise, the peak is to the left or at mid (`hi = mid`).

### Complexity

- **Time:** O(log n) — each iteration halves the search space.
- **Space:** O(1) — only a few integer variables.

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

## Variations

- **Find Minimum in Rotated Array:** Compare `nums[mid]` with `nums[hi]`. If `nums[mid] > nums[hi]`, the pivot is to the right; otherwise to the left.
- **First / Last Occurrence of Target (with duplicates):** Use standard binary search but don't return on match—narrow left (for first) or right (for last) and keep searching.
- **Search in a 2D Matrix:** Treat the matrix as a flattened sorted array (if rows are sorted and `matrix[i][0] <= matrix[i+1][0]`). Compute `mid`, map to `row = Math.floor(mid / cols)` and `col = mid % cols`.
- **Find Peak Element:** Binary search on an unsorted array using the slope of adjacent elements.
- **Search in Rotated Array with Duplicates:** When `nums[lo] === nums[mid] === nums[hi]`, you cannot determine which side is sorted; increment `lo` and decrement `hi` to shrink the search space.

## Edge cases

- **Empty array:** Return -1 immediately; lo > hi from the start.
- **Single element:** mid equals both lo and hi; check equality and return.
- **Array rotated by 0 (not rotated):** The `nums[lo] <= nums[mid]` branch fires every time; the algorithm degenerates to standard binary search.
- **Array of size n rotated n times (back to original):** Same as above.
- **All elements equal (with duplicates):** Cannot decide sorted side reliably; fall back to linear scan or the shrink-window strategy.
- **Target smaller than all elements or larger than all:** The search narrows to one side and eventually lo > hi, returning -1.

## Practice problems

- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) — The canonical rotated array search (distinct values)
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) — Locate the pivot point where rotation occurred
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) — Flatten a row-sorted 2D matrix and binary search
- [Find Peak Element](https://leetcode.com/problems/find-peak-element/) — O(log n) peak finding on an unsorted array using slope comparison
- [First Bad Version](https://leetcode.com/problems/first-bad-version/) — Binary search for the first true in a boolean predicate
- [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) — Handles duplicates with the shrink-window technique
