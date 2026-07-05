# Binary Search

Binary search is one of the most fundamental algorithms in computer science. It solves the problem of finding a target value within a *sorted* sequence by repeatedly halving the search space. At each step, you compare the middle element to the target — if they match, you are done. If the middle element is smaller than the target, you discard the left half and continue searching on the right; if it is larger, you discard the right half. This divide-and-conquer approach gives you logarithmic time, which is exponentially faster than a linear scan on large inputs.

The core invariant that makes binary search correct is that the search range `[left, right]` is always kept in a state where the target could still be present inside it. Every comparison eliminates the half that *cannot* contain the target, preserving correctness. This invariant generalises well beyond simple value lookup: you can binary search on any monotonic predicate — that is, any function that transitions from `false` to `true` exactly once (or vice versa). That insight is what turns binary search into a versatile problem-solving pattern.

## When to use

- The input is sorted or can be arranged in a monotonic order (non-decreasing, non-increasing)
- You need O(log n) search time on a static or dynamic array
- You are looking for a specific value, a boundary, or the first/last occurrence of a condition
- The problem can be phrased as a decision problem: "Given a candidate answer, can we verify feasibility in polynomial time?"
- You need to find a peak, a pivot point, or a position where a property flips from false to true
- The search space is a continuous range of integers or real numbers (e.g., finding square roots)

## How it works

### Core concept

Binary search relies on the ability to probe the middle of the current range and use the result to discard half of the elements. For a standard sorted array, this works because the ordering guarantees that if `nums[mid] < target`, then every element to the left of `mid` is also less than `target`, so they can all be skipped. This property is called the *sorted invariant*.

The same logic extends to non-array settings. Suppose you are looking for the smallest integer `x` such that `f(x)` is `true`, and you know that `f` is monotonic — once it becomes `true`, it stays `true`. You can binary search over the integer range `[lo, hi]`. This pattern appears in problems like "capacity to ship packages within D days" or "find the smallest divisor given a threshold." The binary search does not care about the underlying data structure; it only needs a way to evaluate the predicate and a range to search over.

### Step-by-step approach

1. **Define the search space.** Set `left` to the smallest possible index (usually `0`) and `right` to the largest possible index (usually `n - 1` for arrays, or an upper bound for range searches). This interval must cover the answer.
2. **Compute the midpoint.** Use `mid = left + Math.floor((right - left) / 2)` to avoid integer overflow. This finds the middle element of the current range.
3. **Compare and halve.** If `nums[mid] === target`, return `mid` (or the mid-point in a range search). If `nums[mid] < target`, set `left = mid + 1` because the target must be in the right half. Otherwise, set `right = mid - 1` because the target must be in the left half.
4. **Repeat until convergence.** Continue steps 2-3 while `left <= right`. If the loop exits without finding the target, return `-1` (or the appropriate "not found" sentinel). For boundary searches, `left` will point to the first position where the predicate is true.

### Complexity

- **Time:** O(log n) — each iteration halves the search space
- **Space:** O(1) — only a few integer variables are used

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

function firstPosition(nums, target) {
  let left = 0, right = nums.length - 1, ans = -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) { ans = mid; right = mid - 1; }
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return ans;
}
```

## Variations

- **Lower bound / first occurrence:** When a match is found, continue searching on the left (`right = mid - 1`) to locate the earliest index where the value appears.
- **Upper bound / last occurrence:** When a match is found, continue searching on the right (`left = mid + 1`) to locate the latest index.
- **Binary search on answer (predicate binary search):** Search over a range of feasible answers, not array indices. Use a `feasible(mid)` function that returns `true`/`false` and adjust `left`/`right` accordingly.
- **Ternary search:** For unimodal functions (single peak), evaluate two midpoints to decide which side the peak lies on. Less common but useful for convex optimisation.
- **Exponential / galloping search:** Start with a small range and double it until the target is bracketed, then fall back to standard binary search. Useful for unbounded or infinite lists.

## Edge cases

- **Empty array:** Return `-1` immediately — the while condition `left <= right` will be false from the start.
- **Single element:** The loop runs exactly once; handle both match and mismatch correctly.
- **Duplicate values:** Standard binary search returns an arbitrary matching index. Use the first/last occurrence variation if a specific index is required.
- **Target smaller than all elements or larger than all elements:** The loop will narrow `right` below `left` or raise `left` above `right`, returning `-1`. The `left` pointer will indicate the insertion point.
- **Integer overflow:** Use `left + Math.floor((right - left) / 2)` instead of `(left + right) >> 1` to avoid overflow in languages with fixed-width integers (relevant when translating to C++/Java).
- **Real-number search:** Use a tolerance `eps` (e.g., `1e-7`) in the while condition `right - left > eps` and loop a fixed number of iterations (e.g., 60 for double precision) to guarantee accuracy.

## Practice problems

- [Binary Search](https://leetcode.com/problems/binary-search/) — Classic application of the pattern on a sorted array
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) — Binary search on a rotated array; determine which half is sorted before comparison
- [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) — Two passes of binary search for lower and upper bound
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/) — Binary search on the integer range `[0, x]` for the square root
- [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) — Binary search on the answer (ship capacity) with a greedy feasibility check
