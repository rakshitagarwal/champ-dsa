# Hashing

Map or set for O(1) lookup. Scan once, store what you will need later.

```js
// Hashing skeleton
const seen = new Map(); // or Set
for (const x of nums) {
  // lookup: have we seen the complement / key?
  // store: record x (or its group)
}
```

## Two Sum

Complement lookup — [Two Sum](https://leetcode.com/problems/two-sum/).

```js
// Hashing — complement lookup
// LC: https://leetcode.com/problems/two-sum/
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    // lookup
    if (seen.has(need)) return [seen.get(need), i];
    // store
    seen.set(nums[i], i);
  }
}
```

## Group Anagrams

Group by a computed key — [Group Anagrams](https://leetcode.com/problems/group-anagrams/).

```js
// Hashing — group by signature
// LC: https://leetcode.com/problems/group-anagrams/
function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    // key: sorted letters (or 26-count string)
    const key = [...s].sort().join("");
    // store into bucket
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}
```

## Longest Consecutive Sequence

Set membership, then only start a streak at the left edge — [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/).

```js
// Hashing — existence then grow a streak
// LC: https://leetcode.com/problems/longest-consecutive-sequence/
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    // skip if n is not a streak start
    if (set.has(n - 1)) continue;
    let len = 1;
    // grow while next exists
    while (set.has(n + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}
```

**More:** [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/), [Valid Anagram](https://leetcode.com/problems/valid-anagram/), [First Unique Character](https://leetcode.com/problems/first-unique-character-in-a-string/).
