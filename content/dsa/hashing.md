# Hashing

Use hash maps or sets to store seen values, enabling O(1) average lookups and eliminating the need for nested loops.

## When to use
- Checking for duplicates or existence
- Counting frequencies of elements
- Grouping elements by a key (anagrams, mod values)
- Reducing O(n²) brute force to O(n)

## How it works

Choose a hashable key (the element itself, a transformed version, or a frequency signature) and store it in a `Map` or `Set`. On each iteration, check the hash table for a complementary value before inserting the current one.

```js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
```

## Practice problems
- [Two Sum](https://leetcode.com/problems/two-sum/) — Classic hash map complement lookup
- [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) — Set existence check
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/) — Sorted string as hash key
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) — Set for O(1) neighbor lookups
