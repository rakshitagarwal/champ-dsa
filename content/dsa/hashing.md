# Hashing

**Definition:** Hashing (hash map `Map` / hash set `Set`) average `O(1)` me lookup, insert, delete deta hai — keys ko hash karke buckets me daalta hai. Space deke time bachate hain, jo dekha use yaad rakho.

**When to use:** Jab lage "kaash jo pehle dekha wo yaad hota" — complement dhoondhna (Two Sum), signature se group (anagrams), frequency ginna, dedup, ya longest consecutive trick (streak ke left edge se hi start).

**How it works:** Ek pass: pehle dekho saathi/group already hai kya, fir current element store karo. Grouping ke liye canonical key banao (sorted string). Time `O(n)` average, space `O(n)`.

```js
// Hashing skeleton — lookup then store (Two Sum / pair)
// Hinglish: pehle dekho saathi hai kya, fir khud ko yaad rakho
const seen = new Map(); // ya Set
for (const x of nums) {
  if (seen.has(needFor(x))) return found; // saathi mil gaya
  seen.set(keyFor(x), x);                 // khud ko store
}

// Frequency skeleton
// Hinglish: har char kitni baar aaya gino
const freq = new Map();
for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

// Group-by-key skeleton
// Hinglish: same key wale ek bucket me
const groups = new Map();
for (const s of strs) {
  const key = [...s].sort().join(""); // sorted = canonical
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(s);
}
```
## Two Sum

I would remember each number’s index. When `target - nums[i]` is already in the map, I am done.

[Two Sum](https://leetcode.com/problems/two-sum/)

```js
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// Hashing — complement
// LC: https://leetcode.com/problems/two-sum/
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i]; // Hinglish: saathi mila kya?
    seen.set(nums[i], i); // Hinglish: yaad rakho
  }
}
```

## Group Anagrams

Same letters sorted become the same key. Bucket words by that key.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

```js
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// Hashing — group by signature
// LC: https://leetcode.com/problems/group-anagrams/
function groupAnagrams(strs) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// Hashing — frequency cancel
// LC: https://leetcode.com/problems/valid-anagram/
function isAnagram(s, t) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// Hashing — only start a streak at the left edge
// LC: https://leetcode.com/problems/longest-consecutive-sequence/
function longestConsecutive(nums) {
  // Hinglish: step 1 — base case check karo
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
