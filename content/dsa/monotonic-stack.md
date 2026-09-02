# Monotonic Stack

**Definition:** Monotonic stack me indices aise rakhte hain ki values strictly increasing (ya decreasing) rahen. Jab naya value monotonicity todta hai to pop karte hain — pop hua element ko uska next greater/smaller mil gaya. Har index ek baar push/pop → `O(n)`.

**When to use:** "Next greater/smaller left/right", daily temperatures, stock span, histogram largest rectangle, trapping rain water.

**How it works:** Ek scan. Jab `stack not empty && nums[i] > nums[stack.top]` (next greater ke liye) to pop karke `ans[popped] = nums[i]` record karo. Push `i`. Next smaller ke liye `>` ko `<` karo. Time `O(n)`, space `O(n)`.

```js
// Monotonic stack skeleton — next greater to the right
// Hinglish: bada mila to chhoto ka jawab mil gaya
const stack = []; // indices, values decreasing
const ans = Array(n).fill(-1);
for (let i = 0; i < n; i++) {
  while (stack.length && nums[i] > nums[stack.at(-1)]) {
    ans[stack.pop()] = nums[i]; // ya i
  }
  stack.push(i);
}

// Next smaller skeleton: while (stack.length && nums[i] < nums[stack.at(-1)])
```
## Daily Temperatures

When today is warmer than the day on the stack, that old day waited `i - j` days. Stack stays decreasing.

[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

```js
// Hinglish: stack se next greater — ek-ek step comment dekho
// Monotonic stack — next warmer
// LC: https://leetcode.com/problems/daily-temperatures/
function dailyTemperatures(temps) {
  // Hinglish: step 1 — base case check karo
  const n = temps.length, ans = Array(n).fill(0), stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && temps[i] > temps[stack.at(-1)]) {
      const j = stack.pop();
      ans[j] = i - j;
    }
    stack.push(i);
  }
  return ans;
}
```

## Largest Rectangle in Histogram

For each bar, I need the first shorter bar on the left and on the right — that is the width I can stretch. Stack of increasing heights. A sentinel 0 at the end flushes the stack.

[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

```js
// Hinglish: stack se next greater — ek-ek step comment dekho
// Monotonic stack — nearest smaller, then width * height
// LC: https://leetcode.com/problems/largest-rectangle-in-histogram/
function largestRectangleArea(heights) {
  // Hinglish: step 1 — base case check karo
  const stack = [-1];
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
