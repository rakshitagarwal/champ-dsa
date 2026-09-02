# Two Pointers

**Definition:** Two pointers places two indices on a sequence and moves them only forward (or toward each other) to scan in `O(n)` without extra space.

**When to use:** Sorted array pair sum, container with most water, removing duplicates in place, or expanding around a center for palindromes. If sorting first would help and you can decide which pointer to move from the current sum/value, think two pointers.

**How it works:** Opposite-ends for sorted/pair problems (move the side that cannot be in a better answer); same-direction / center-expand for palindromes. Never rewind → `O(n)`, `O(1)` space.

```js
// Two pointers skeleton — opposite ends (sorted array)
let left = 0, right = arr.length - 1;
while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum === target) break;
  else if (sum < target) left++;
  else right--;
}

// Center-expand skeleton (palindrome)
for (let center = 0; center < n; center++) {
  let l = center, r = center; // odd; use (center, center+1) for even
  while (l >= 0 && r < n && s[l] === s[r]) { l--; r++; }
}
```

## Two Sum II

Sorted, so if the sum is too small I need a bigger left. Too big, smaller right. 1-based indexes on the return.

[Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

```js
// Two pointers — opposite ends
// LC: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
}
```

## Longest Palindromic Substring

Every palindrome has a center. I expand while left and right match. Do it for odd (`i,i`) and even (`i,i+1`) centers. Keep the longest slice.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

```js
// Two pointers — expand around center
// LC: https://leetcode.com/problems/longest-palindromic-substring/
function longestPalindrome(s) {
  let best = "";
  const grow = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return s.slice(l + 1, r);
  };
  for (let i = 0; i < s.length; i++) {
    const odd = grow(i, i);
    const even = grow(i, i + 1);
    const cur = odd.length > even.length ? odd : even;
    if (cur.length > best.length) best = cur;
  }
  return best;
}
```

## Trapping Rain Water

Water at `i` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

```js
// Two pointers — water limited by the shorter wall
// LC: https://leetcode.com/problems/trapping-rain-water/
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
```
