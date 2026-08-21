# Two Pointers

Two indices move toward each other, or one chases the other. Each step throws away a candidate. Sorted input (or a palindrome / in-place rewrite) is the usual tell.

```js
// Two pointers skeleton — opposite ends
let left = 0, right = arr.length - 1;
while (left < right) {
  // compare arr[left] and arr[right]
  // move the pointer that cannot be in the answer
}
```

## Pair sum on a sorted array

Opposite ends — [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/).

```js
// Two pointers — opposite ends
// LC: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    // too small → need a bigger left
    if (sum < target) left++;
    // too big → need a smaller right
    else right--;
  }
}
```

## Container With Most Water

Move the shorter wall — [Container With Most Water](https://leetcode.com/problems/container-with-most-water/).

```js
// Two pointers — opposite ends, drop the worse side
// LC: https://leetcode.com/problems/container-with-most-water/
function maxArea(height) {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    // record area
    best = Math.max(best, h * (right - left));
    // move the shorter line (width will shrink anyway)
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}
```

## 3Sum

Fix one index, two-pointer the rest — [3Sum](https://leetcode.com/problems/3sum/).

```js
// Two pointers — outer fix + inner opposite pair
// LC: https://leetcode.com/problems/3sum/
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < nums.length - 2; i++) {
    // skip duplicate anchors
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        out.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        // skip duplicate inner values
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return out;
}
```

**More:** [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/), [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/), [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/).
