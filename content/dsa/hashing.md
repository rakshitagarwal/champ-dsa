# Hashing

**Definition:** Hashing (hash map `Map` / hash set `Set`) gives average `O(1)` lookup, insert, and delete by hashing keys to buckets. It trades space for time by remembering what was already seen.

**When to use:** You think "I wish I could remember what I already saw" — complement search (Two Sum), grouping by signature (anagrams), frequency counts, dedup, or longest consecutive trick (only start at streak left edge).

**How it works:** One pass: look up whether the needed partner/group exists, then store the current element. For grouping, build a canonical key (sorted string). Time `O(n)` average, space `O(n)`.

```js
// Hashing skeleton — lookup then store (Two Sum / pair)
const seen = new Map(); // or Set
for (const x of nums) {
  if (seen.has(needFor(x))) return found; // lookup partner/group
  seen.set(keyFor(x), x);                 // store current
}

// Frequency skeleton
const freq = new Map();
for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

// Group-by-key skeleton
const groups = new Map();
for (const s of strs) {
  const key = [...s].sort().join("");
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(s);
}
```

## Two Sum

I would remember each number’s index. When `target - nums[i]` is already in the map, I am done.

[Two Sum](https://leetcode.com/problems/two-sum/)

```js
// Hashing — complement
// LC: https://leetcode.com/problems/two-sum/
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}
```

## Group Anagrams

Same letters sorted become the same key. Bucket words by that key.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

```js
// Hashing — group by signature
// LC: https://leetcode.com/problems/group-anagrams/
function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = [...s].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}
```

## Valid Anagram

Count letters of `s`, subtract letters of `t`. If anything is left, they are not anagrams.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

```js
// Hashing — frequency cancel
// LC: https://leetcode.com/problems/valid-anagram/
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = Object.create(null);
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (const ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
```

## Longest Consecutive Sequence

Put everything in a set. Only start counting at a number that has no `n - 1`. Then walk `n + 1`, `n + 2`, … That way each number is touched about twice, not n².

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

```js
// Hashing — only start a streak at the left edge
// LC: https://leetcode.com/problems/longest-consecutive-sequence/
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue;
    let len = 1;
    while (set.has(n + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}
```
