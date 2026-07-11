# Binary Search

Binary search is one of the most fundamental algorithms in computer science. It solves the problem of finding a target value within a *sorted* sequence by repeatedly halving the search space. At each step, you compare the middle element to the target — if they match, you are done. If the middle element is smaller than the target, you discard the left half and continue searching on the right; if it is larger, you discard the right half. This divide-and-conquer approach gives you logarithmic time, which is exponentially faster than a linear scan on large inputs.

The core invariant that makes binary search correct is that the search range `[left, right]` is always kept in a state where the target could still be present inside it. Every comparison eliminates the half that *cannot* contain the target, preserving correctness. This invariant generalises well beyond simple value lookup: you can binary search on any monotonic predicate — that is, any function that transitions from `false` to `true` exactly once (or vice versa). That insight is what turns binary search into a versatile problem-solving pattern.

Binary search also extends to non-standard search spaces. Arrays that are **rotated** (e.g., `[4,5,6,7,0,1,2]`) consist of two sorted segments. By checking which half is normally sorted, you can decide where to search. Arrays that are **not sorted at all** but have a defined slope (e.g., finding a peak element) can also be searched in O(log n) time by comparing adjacent elements. The unifying thread is that binary search works whenever you can make a deterministic decision to discard half the remaining space.

![Binary search — halving the search space](/images/dsa/binary-search.svg)

## When to use

- The input is sorted or can be arranged in a monotonic order (non-decreasing, non-increasing)
- You need O(log n) search time on a static or dynamic array
- You are looking for a specific value, a boundary, or the first/last occurrence of a condition
- The problem can be phrased as a decision problem: "Given a candidate answer, can we verify feasibility in polynomial time?"
- You need to find a peak, a pivot point, or a position where a property flips from false to true
- The search space is a continuous range of integers or real numbers (e.g., finding square roots)
- Search in a rotated sorted array (distinct or with duplicates)
- Search in a 2D matrix where rows and columns are sorted

## How it works

### Core concept

Binary search relies on the ability to probe the middle of the current range and use the result to discard half of the elements. For a standard sorted array, this works because the ordering guarantees that if `nums[mid] < target`, then every element to the left of `mid` is also less than `target`, so they can all be skipped. This property is called the *sorted invariant*.

The same logic extends to non-array settings. Suppose you are looking for the smallest integer `x` such that `f(x)` is `true`, and you know that `f` is monotonic — once it becomes `true`, it stays `true`. You can binary search over the integer range `[lo, hi]`. This pattern appears in problems like "capacity to ship packages within D days" or "find the smallest divisor given a threshold."

For rotated arrays, the trick is to identify which side of `mid` is "normally sorted" (by comparing `nums[lo]` to `nums[mid]`). If the left half is sorted, check if the target lies within that sorted range; if so, narrow left, otherwise go right. If the right half is sorted, do the symmetric check. For arrays with duplicates where `nums[lo] === nums[mid] === nums[hi]`, you cannot decide which side is sorted — shrink both ends by incrementing `lo` and decrementing `hi`.

### Step-by-step approach

1. **Define the search space.** Set `left` to the smallest possible index (usually `0`) and `right` to the largest possible index (usually `n - 1` for arrays, or an upper bound for range searches).
2. **Compute the midpoint.** Use `mid = left + Math.floor((right - left) / 2)` to avoid integer overflow.
3. **Compare and halve.** If `nums[mid] === target`, return `mid`. If `nums[mid] < target`, set `left = mid + 1`. Otherwise, set `right = mid - 1`.
4. **Repeat until convergence.** Continue while `left <= right`. If the loop exits, return `-1`. For boundary searches, `left` points to the first position where the predicate is true.

### Complexity

- **Time:** O(log n) — each iteration halves the search space
- **Space:** O(1) — only a few integer variables

```js
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

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

- **Lower bound / first occurrence:** When a match is found, continue searching on the left (`right = mid - 1`) to locate the earliest index where the value appears.
- **Upper bound / last occurrence:** When a match is found, continue searching on the right (`left = mid + 1`) to locate the latest index.
- **Binary search on answer (predicate binary search):** Search over a range of feasible answers, not array indices. Use a `feasible(mid)` function that returns `true`/`false`.
- **Rotated array search:** Determine which half is sorted by comparing `nums[lo]` to `nums[mid]`. Search within the sorted half if the target lies in its range.
- **Find Minimum in Rotated Array:** Compare `nums[mid]` with `nums[hi]`. If `nums[mid] > nums[hi]`, the pivot is to the right; otherwise to the left.
- **Find Peak Element:** Binary search on an unsorted array using slope comparison (`nums[mid]` vs `nums[mid + 1]`).
- **Search in a 2D Matrix:** Treat the matrix as a flattened sorted array; map `mid` to `row = Math.floor(mid / cols)` and `col = mid % cols`.
- **Search in Rotated Array with Duplicates:** When `nums[lo] === nums[mid] === nums[hi]`, shrink both ends instead of halving.

## Edge cases

- **Empty array:** Return `-1` immediately — the while condition `left <= right` is false from the start.
- **Single element:** The loop runs exactly once; handle both match and mismatch correctly.
- **Duplicate values:** Standard binary search returns an arbitrary matching index. Use first/last occurrence if a specific index is needed.
- **Target out of range:** The loop narrows to one side and exits, returning `-1`. The `left` pointer indicates the insertion point.
- **Integer overflow:** Use `left + Math.floor((right - left) / 2)` instead of `(left + right) >> 1`.
- **Real-number search:** Use a tolerance `eps` (e.g., `1e-7`) in the while condition and loop a fixed number of iterations for double precision.
- **Array rotated by 0 (not rotated):** The standard sorted branch fires every time; algorithm degrades to normal binary search correctly.
- **All elements equal (with duplicates):** Cannot decide sorted side reliably; use the shrink-window strategy.

## Practice problems

- [Binary Search](https://leetcode.com/problems/binary-search/) — Classic application on a sorted array
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) — Binary search on a rotated array with distinct values
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) — Locate the pivot point where rotation occurred
- [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) — Two passes for lower and upper bound
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/) — Binary search on integer range `[0, x]` for the square root
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) — Flatten a row-sorted 2D matrix and binary search
- [Find Peak Element](https://leetcode.com/problems/find-peak-element/) — O(log n) peak finding on an unsorted array using slope comparison
- [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) — Binary search on the answer with a greedy feasibility check
- [First Bad Version](https://leetcode.com/problems/first-bad-version/) — Binary search for the first true in a boolean predicate
- [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) — Handles duplicates with the shrink-window technique
