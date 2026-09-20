# Monotonic Stack

**Definition:** A monotonic stack stores indices so values stay strictly increasing (or decreasing). When a new value breaks that order, you pop — each popped index just found its next greater/smaller. Every index is pushed and popped at most once → `O(n)`.

**When to use:** “Next greater/smaller to the left/right”, daily temperatures, stock span, largest rectangle in histogram, trapping rain water.

**How it works:** One scan. While the stack is non-empty and `nums[i] > nums[stack.top]` (for next greater), pop and set `ans[popped] = nums[i]`. Then push `i`. For next smaller, flip `>` to `<`. Time `O(n)`, space `O(n)`.

## Study notes

- **Cue:** “next greater/smaller to the left/right”, temperatures, histogram, stock span.
- **Store indices** (not values) — distance `i - j` is easy.
- **Mono decreasing stack** (top = smallest among stack): next greater.
- **Mono increasing stack:** next smaller.
- **Traps:** wrong comparison `>` vs `>=` (duplicates); forget defaults for leftover stack (`-1` or `0`).
- **Related:** trapping rain / histogram often use mono stack; plain brackets → Stack page.

### Active revision
Next greater or next smaller? Decreasing or increasing stack? What default for indices that never resolve?

```js
// Monotonic stack skeleton — next greater to the right
// when a larger value arrives, popped indices get their answer
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
// Time: O(n) · Space: O(n)
// Monotonic stack — next warmer day to the right
function dailyTemperatures(temps) {
  const n = temps.length, ans = Array(n).fill(0), stack = []; // stack holds indices waiting for warmer day
  for (let i = 0; i < n; i++) {
    while (stack.length && temps[i] > temps[stack.at(-1)]) { // today is warmer — resolve older days
      const j = stack.pop();
      ans[j] = i - j; // days j waited until today
    }
    stack.push(i); // i still waiting for a warmer future day
  }
  return ans;
}
```

## Largest Rectangle in Histogram

For each bar, I need the first shorter bar on the left and on the right — that is the width I can stretch. Stack of increasing heights. A sentinel 0 at the end flushes the stack.

[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

```js
// Time: O(n) · Space: O(n)
// Increasing stack — width between previous smaller bars
function largestRectangleArea(heights) {
  const stack = [-1]; // sentinel — width extends to left edge
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // sentinel 0 flushes remaining bars
    while (stack.at(-1) !== -1 && h < heights[stack.at(-1)]) { // current bar is shorter — close popped bar
      const height = heights[stack.pop()];
      const width = i - stack.at(-1) - 1; // stretch between new top and i
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}
```

## Next Greater Element I

Build a next-greater map while scanning. Keep a decreasing stack; when you pop, the answer is the current value.

[Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)

```js
// Time: O(n) · Space: O(n)
function nextGreaterElement(nums1, nums2) {
  // build next-greater map for every value in nums2
  const mp=new Map(), st=[];
  for (const x of nums2) {
    while(st.length && x > st.at(-1)) { const y=st.pop(); mp.set(y, x); } // x is next greater for popped y
    st.push(x); // keep decreasing stack of unresolved indices/values
  }
  for (const y of st) mp.set(y, -1); // no greater element to the right
  return nums1.map(x=> mp.get(x));
}
```

## Online Stock Span

Span for today = how many consecutive previous days have price ≤ today. Stack stores `[price, span]` pairs.

[Online Stock Span](https://leetcode.com/problems/online-stock-span/)

```js
// Time: O(n) · Space: O(n)
function StockSpanner() { this.st=[]; } // [price, span]
StockSpanner.prototype.next = function(price) {
  // pop stack while current price is lower — discount days
  let span=1;
  while(this.st.length && this.st.at(-1)[0] <= price) { span += this.st.pop()[1]; } // combine span
  this.st.push([price, span]);
  return span;
};
```

## Trapping Rain Water (Monotonic Stack Variant)

Find bounded pits with a stack. After each pop, compute the trapped height and add water. (Solution below uses the two-pointer approach.)

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

```js
// Time: O(n) · Space: O(1)
// water = min(leftMax,rightMax) - height
// Two pointers — water limited by the shorter wall
var trap = function(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let trappedWater = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (height[left] < height[right]) {
      trappedWater += leftMax - height[left];
      left++;
    } else {
      trappedWater += rightMax - height[right];
      right--;
    }
  }

  return trappedWater;
};
```
