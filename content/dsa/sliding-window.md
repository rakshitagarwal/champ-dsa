# Sliding Window

**Definition:** Sliding window array/string par ek contiguous range `[left, right]` hai jo `O(n)` me slide karta hai. `right` badhate hain aur invariant (all unique, sum ≤ k, t cover) banaye rakhne ke liye `left` shrink karte hain. Har index max ek baar andar-bahar.

**When to use:** Longest/shortest *contiguous* subarray/substring kisi constraint ke saath — no repeats, at most K distinct, minimum window jo t cover kare, ya size k ki har window ka max (deque variant).

**How it works:** Variable-size: `right` badhao, `while(invalid) left shrink`, best record. Fixed k: `right` add, `i ≥ k` par `left-k` hatao, monotonic deque ka front = max. Time `O(n)`, space `O(1)` + freq map/deque.

```js
// Sliding window skeleton — variable size
// expand right; shrink left while window invalid
let left = 0;
for (let right = 0; right < n; right++) { // expand window with right pointer
  // expand: include s[right] in window state
  while (invalid(window)) {
    // shrink: remove s[left] and advance left
  }
  // record best answer while window stays valid
}

// Fixed-size k skeleton
// k size banne par window ready
for (let i = 0; i < n; i++) {
  // nums[i] add
  if (i >= k) { /* nums[i-k] hatao */ }
  if (i >= k-1) { /* window [i-k+1..i] ready */ }
}
```
## Longest Substring Without Repeating Characters

If I see a letter that is already inside the window, jump `left` just past the old copy. Then the window is unique again.

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

```js
// window: shrink when char repeats
// LC: https://leetcode.com/problems/longest-substring-without-repeating-characters/
var lengthOfLongestSubstring = function(s) {
  let longestStr = 0;
  let set = new Set();

  let left = 0;
  let right = 0;

  while (right < s.length) {
    let letter = s[right];

    if (!set.has(letter)) {
      set.add(letter);
      longestStr = Math.max(longestStr, set.size);
      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }

  return longestStr;
};
```

## Minimum Window Substring

Grow until `t` is fully covered (`missing === 0`). Then shrink from the left as long as it stays covered. Remember the smallest slice. If `t` never fits, return `""`.

[Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

```js
// Sliding window — smallest that still covers t
// LC: https://leetcode.com/problems/minimum-window-substring/
var minWindow = function(s, t) {
  let map = new Map();

  for (let letter of t) {
    if (!map.has(letter)) {
      map.set(letter, 1);
    } else {
      map.set(letter, map.get(letter) + 1);
    }
  }

  let left = 0;
  let right = 0;
  let len = Infinity;
  let count = map.size;
  let minWindow = "";

  while (right < s.length) {
    let rLetter = s[right];
    if (map.has(rLetter)) {
      map.set(rLetter, map.get(rLetter) - 1);
      if (map.get(rLetter) === 0) count--;
    }

    right++;

    while (count === 0) {
      if (right - left < len) {
        len = right - left;
        minWindow = s.slice(left, right);
      }

      let lLetter = s[left];
      if (map.has(lLetter)) {
        map.set(lLetter, map.get(lLetter) + 1);
        if (map.get(lLetter) > 0) count++;
      }
      left++;
    }
  }

  return minWindow;
};
```

## Sliding Window Maximum

Deque of indexes, values decreasing. Front is always the max of the current window of size `k`. Drop indexes that left the window. Drop from the back anything smaller than the new number — they will never win.

[Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

```js
// LC: https://leetcode.com/problems/sliding-window-maximum/
function maxSlidingWindow(nums, k) {
  const q = []; // indexes, nums decreasing
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    // Drop back indices that can never be max again
    while (q.length && nums[q.at(-1)] <= nums[i]) q.pop();
    q.push(i);
    // Front index fell out of the window
    if (q[0] <= i - k) q.shift();
    // First full window starts at i === k - 1
    if (i >= k - 1) out.push(nums[q[0]]);
  }
  return out;
}
```

## Longest Repeating Character Replacement

Window me sabse zyada frequent char `maxF`, window size - maxF <= k to valid. Nahi to left shrink karo.

[Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)

```js
// LC: https://leetcode.com/problems/longest-repeating-character-replacement/
var characterReplacement = function(s, k) {
  let map = {};

  let topFrequency = 0;
  let longest = 0;

  let left = 0;
  let right = 0;

  while (right < s.length) {
    let rightChar = s[right];

    map[rightChar] = map[rightChar] + 1 || 1;

    topFrequency = Math.max(topFrequency, map[rightChar]);

    while ((right - left + 1) - topFrequency > k) {
      let leftChar = s[left];
      map[leftChar]--;
      left++;
    }

    longest = Math.max(longest, right - left + 1);

    right++;
  }

  return longest;
};
```

## Permutation in String

`s1` ka permutation `s2` me hai kya? Sliding window + frequency compare.

[Permutation in String](https://leetcode.com/problems/permutation-in-string/)

```js
// LC: https://leetcode.com/problems/permutation-in-string/
function checkInclusion(s1, s2) {
  // build frequency target from s1
  if (s1.length > s2.length) return false;
  const need=Array(26).fill(0), win=Array(26).fill(0);
  for (let i=0;i<s1.length;i++) { need[s1.charCodeAt(i)-97]++; win[s2.charCodeAt(i)-97]++; }
  const same=()=> need.every((v,i)=>v===win[i]);
  if (same()) return true;
  for (let i=s1.length;i<s2.length;i++) {
    win[s2.charCodeAt(i)-97]++; // slide window right — include new character
    win[s2.charCodeAt(i-s1.length)-97]--; // slide window — drop character leaving the left edge
    if (same()) return true;
  }
  return false;
}
```

## Maximum Average Subarray I

Size `k` ki window me max sum / k. Fixed sliding window.

[Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)

```js
// LC: https://leetcode.com/problems/maximum-average-subarray-i/
function findMaxAverage(nums, k) {
  // seed sum of the first fixed-size window
  let sum=0; for(let i=0;i<k;i++) sum+=nums[i];
  let best=sum;
  for(let i=k;i<nums.length;i++) {
    sum += nums[i] - nums[i-k]; // O(1) slide: add entering index, subtract leaving index
    best = Math.max(best, sum);
  }
  return best / k;
}
```
