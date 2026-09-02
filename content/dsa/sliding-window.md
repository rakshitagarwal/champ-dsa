# Sliding Window

**Definition:** A sliding window is a contiguous range `[left, right]` over an array/string that slides forward in `O(n)`. You expand `right` and shrink `left` to maintain an invariant (all unique, sum ≤ k, covers t). Each index enters and leaves at most once.

**When to use:** Longest/shortest *contiguous* subarray/substring under a constraint — no repeats, at most K distinct, minimum window covering t, or maximum of each window of size k (deque variant).

**How it works:** Variable-size: grow `right`, `while(invalid) shrink left`, record best. Fixed-size k: add `right`, remove `left-k` when `i ≥ k`, front of monotonic deque = max. Time `O(n)`, space `O(1)` plus frequency map/deque.

```js
// Sliding window skeleton — variable size
let left = 0;
for (let right = 0; right < n; right++) {
  // expand: add s[right]
  while (invalid(window)) {
    // shrink: remove s[left], left++
  }
  // record best
}

// Fixed-size k skeleton
for (let i = 0; i < n; i++) {
  // add nums[i]
  if (i >= k) { /* remove nums[i-k] */ }
  if (i >= k - 1) { /* window [i-k+1..i] ready */ }
}
```

## Longest Substring Without Repeating Characters

If I see a letter that is already inside the window, jump `left` just past the old copy. Then the window is unique again.

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

```js
// Sliding window — longest valid
// LC: https://leetcode.com/problems/longest-substring-without-repeating-characters/
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch) >= left) left = last.get(ch) + 1;
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

## Minimum Window Substring

Grow until `t` is fully covered (`missing === 0`). Then shrink from the left as long as it stays covered. Remember the smallest slice. If `t` never fits, return `""`.

[Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

```js
// Sliding window — smallest that still covers t
// LC: https://leetcode.com/problems/minimum-window-substring/
function minWindow(s, t) {
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = need.size, left = 0, best = "";
  for (let right = 0; right < s.length; right++) {
    const r = s[right];
    if (need.has(r)) {
      need.set(r, need.get(r) - 1);
      if (need.get(r) === 0) missing--;
    }
    while (missing === 0) {
      if (!best || right - left + 1 < best.length) best = s.slice(left, right + 1);
      const l = s[left];
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

## Sliding Window Maximum

Deque of indexes, values decreasing. Front is always the max of the current window of size `k`. Drop indexes that left the window. Drop from the back anything smaller than the new number — they will never win.

[Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

```js
// Sliding window — deque of useful max candidates
// LC: https://leetcode.com/problems/sliding-window-maximum/
function maxSlidingWindow(nums, k) {
  const q = []; // indexes, nums decreasing
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q.at(-1)] <= nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift(); // left the window
    if (i >= k - 1) out.push(nums[q[0]]);
  }
  return out;
}
```
