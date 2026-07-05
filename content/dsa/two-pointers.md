# Two Pointers

Two pointers traverse the array from opposite ends (or at different speeds) to solve problems with a minimal time complexity of O(n).

## When to use
- Searching for a pair of elements that satisfy a condition in a sorted array
- Reversing or rotating arrays/linked lists
- Detecting cycles (fast and slow pointers)
- Removing duplicates in-place

## How it works

Maintain two indices scanning the array — either moving toward each other (left/right) or at different paces (slow/fast). By comparing values at both pointers, you eliminate candidates and narrow the search space without nested loops.

```js
function twoSumSorted(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l + 1, r + 1];
    sum < target ? l++ : r--;
  }
  return [-1, -1];
}
```

## Practice problems
- [Two Sum II - Input Array is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) — Classic left/right pointer on sorted array
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) — Move pointers inward, keep max area
- [3Sum](https://leetcode.com/problems/3sum/) — Fix one element, two-sum the rest with two pointers
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Left/right pointers track max boundaries
