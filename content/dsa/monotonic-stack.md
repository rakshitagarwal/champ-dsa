# Monotonic Stack

**Definition:** Monotonic stack me indices aise rakhte hain ki values strictly increasing (ya decreasing) rahen. Jab naya value monotonicity todta hai to pop karte hain — pop hua element ko uska next greater/smaller mil gaya. Har index ek baar push/pop → `O(n)`.

**When to use:** "Next greater/smaller left/right", daily temperatures, stock span, histogram largest rectangle, trapping rain water.

**How it works:** Ek scan. Jab `stack not empty && nums[i] > nums[stack.top]` (next greater ke liye) to pop karke `ans[popped] = nums[i]` record karo. Push `i`. Next smaller ke liye `>` ko `<` karo. Time `O(n)`, space `O(n)`.

## Study notes

- **Pehchan:** "next greater/smaller to the left/right", temperatures, histogram, stock span.
- **Store indices** (not values) — distance `i - j` easy.
- **Mono decreasing stack** (top = smallest among stack): next greater.
- **Mono increasing stack:** next smaller.
- **Traps:** wrong comparison `>` vs `>=` (duplicates); forget remaining stack defaults (`-1` or `0`).
- **Related:** trapping rain / histogram often mono stack; plain brackets → Stack page.

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

Map se next greater nikalo. Stack decreasing rakho, pop hote hi answer pata chalta hai.

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

Har din ka span = kitne consecutive peeche wale days price <= aaj. Stack me [price, span] rakho.

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

Stack se pits dhoondo. Har pop ke baad bounded height nikal ke water jodo.

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
