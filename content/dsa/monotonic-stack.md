# Monotonic Stack

Keep a stack of indices whose values are strictly increasing or decreasing. When the new value breaks the order, pop — that pop is "next greater/smaller".

```js
// Monotonic stack skeleton (next greater to the right)
const stack = []; // indices, values decreasing
const ans = Array(n).fill(-1);
for (let i = 0; i < n; i++) {
  while (stack.length && nums[i] > nums[stack.at(-1)]) {
    ans[stack.pop()] = nums[i]; // i is next greater
  }
  stack.push(i);
}
```

## Daily Temperatures

Next warmer day — [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/).

```js
// Monotonic stack — next greater (distance)
// LC: https://leetcode.com/problems/daily-temperatures/
function dailyTemperatures(temps) {
  const n = temps.length, ans = Array(n).fill(0), stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && temps[i] > temps[stack.at(-1)]) {
      const j = stack.pop();
      ans[j] = i - j; // days until warmer
    }
    stack.push(i);
  }
  return ans;
}
```

## Next Greater Element I

Map from nums2, then lookup — [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/).

```js
// Monotonic stack — next greater, then map
// LC: https://leetcode.com/problems/next-greater-element-i/
function nextGreaterElement(nums1, nums2) {
  const next = new Map(), stack = [];
  for (const x of nums2) {
    while (stack.length && x > stack.at(-1)) next.set(stack.pop(), x);
    stack.push(x);
  }
  return nums1.map((x) => next.get(x) ?? -1);
}
```

## Largest Rectangle in Histogram

Nearest smaller left and right — [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/).

```js
// Monotonic stack — nearest smaller, then width * height
// LC: https://leetcode.com/problems/largest-rectangle-in-histogram/
function largestRectangleArea(heights) {
  const stack = [-1]; // sentinel
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.at(-1) !== -1 && h < heights[stack.at(-1)]) {
      const height = heights[stack.pop()];
      const width = i - stack.at(-1) - 1;
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}
```

**More:** [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/), [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/), [Online Stock Span](https://leetcode.com/problems/online-stock-span/).
