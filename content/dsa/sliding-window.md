# Sliding Window

A contiguous range `[left, right]`. Expand right every step. Shrink left while the window is invalid. Each index enters and leaves at most once → O(n).

```js
// Sliding window skeleton
let left = 0;
for (let right = 0; right < n; right++) {
  // expand: add arr[right]
  while (windowInvalid) {
    // shrink: remove arr[left], left++
  }
  // record: best length / count / sum
}
```

## Fixed size k

Add right, drop left after k — [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/).

```js
// Sliding window — fixed size
// LC: https://leetcode.com/problems/maximum-average-subarray-i/
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i]; // first window
  let best = sum;
  for (let right = k; right < nums.length; right++) {
    // expand
    sum += nums[right];
    // shrink (lockstep with k)
    sum -= nums[right - k];
    // record
    best = Math.max(best, sum);
  }
  return best / k;
}
```

## Longest valid window

Shrink until unique — [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/).

```js
// Sliding window — longest valid
// LC: https://leetcode.com/problems/longest-substring-without-repeating-characters/
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    // expand: if ch already in window, jump left past it
    if (last.has(ch) && last.get(ch) >= left) left = last.get(ch) + 1;
    last.set(ch, right);
    // record
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

## Smallest covering window

Grow until valid, then shrink — [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/).

```js
// Sliding window — smallest that still covers the target
// LC: https://leetcode.com/problems/minimum-window-substring/
function minWindow(s, t) {
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = need.size, left = 0, best = "";
  for (let right = 0; right < s.length; right++) {
    const r = s[right];
    // expand
    if (need.has(r)) {
      need.set(r, need.get(r) - 1);
      if (need.get(r) === 0) missing--;
    }
    while (missing === 0) {
      // record (window is valid)
      if (!best || right - left + 1 < best.length) best = s.slice(left, right + 1);
      const l = s[left];
      // shrink
      if (need.has(l)) {
        need.set(l, need.get(l) + 1);
        if (need.get(l) > 0) missing++;
      }
      left++;
    }
  }
  return best;
}
```

**More:** [Permutation in String](https://leetcode.com/problems/permutation-in-string/), [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/), [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/).
