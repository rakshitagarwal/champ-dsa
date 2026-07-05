# Cyclic Sort

Cyclic Sort places each element at its correct index by swapping, ideal for problems where values are in a fixed range (e.g., 1 to n).

## When to use
- Array contains numbers in a given range (0 to n or 1 to n)
- Need to find missing, duplicate, or disappeared numbers
- In-place O(n) solution required

## How it works

Iterate through the array. For each element, swap it to its correct position (value - 1 for 1-indexed, value for 0-indexed) until the current position holds the right number. Then move to the next index.

```js
function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const correct = nums[i] - 1;
    if (nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  return nums;
}
```

## Practice problems
- [Missing Number](https://leetcode.com/problems/missing-number/) — After sorting, the index with wrong value is the missing number
- [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) — After sorting, collect indices where value is wrong
- [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) — Cyclic sort detects the duplicate when you try to place it
- [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) — Place positives at correct indices, first mismatch is answer
