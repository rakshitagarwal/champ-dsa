# Sliding Window

A window of dynamic or fixed size slides over the array, maintaining a running aggregate so each element is visited at most twice.

## When to use
- Subarray or substring problems asking for maximum/minimum/specific value
- Contiguous sequence constraints (size k, unique chars, sum conditions)
- Problems solvable in O(n) where brute force is O(n²)

## How it works

Expand the right boundary to include new elements, then shrink the left boundary when the window becomes invalid. Track the desired metric (sum, count, frequency map) incrementally to avoid recomputation.

```js
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) set.delete(s[l++]);
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}
```

## Practice problems
- [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) — Fixed-size window sum
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — Expand/shrink with character set
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) — Shrink when all target chars are covered
- [Permutation in String](https://leetcode.com/problems/permutation-in-string/) — Fixed-size frequency window
