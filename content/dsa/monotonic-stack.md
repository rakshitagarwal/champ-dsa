# Monotonic Stack

A stack that maintains elements in strictly increasing or decreasing order, used to efficiently find the next greater or smaller element in a sequence.

## When to use
- Need to find next greater/smaller element for each array element
- Processing elements with a "looking back" or "looking ahead" relationship
- Optimizing O(n²) brute-force to O(n)

## How it works

Iterate through the array, pushing indices onto the stack. Before pushing, pop all indices whose element is smaller (for next greater) or larger (for next smaller) than the current element — the popped element's answer is the current element. This ensures the stack stays monotonic.

```js
function nextGreaterElements(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
```

## Practice problems
- [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) — Direct application of monotonic stack
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) — Find days until a warmer temperature
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) — Monotonic stack tracks heights to compute max area
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Monotonic stack to calculate water trapped between bars
