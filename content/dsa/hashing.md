# Hashing

**Definition:** Hashing (hash map `Map` / hash set `Set`) average `O(1)` me lookup, insert, delete deta hai — keys ko hash karke buckets me daalta hai. Space deke time bachate hain, jo dekha use yaad rakho.

**When to use:** Jab lage "kaash jo pehle dekha wo yaad hota" — complement dhoondhna (Two Sum), signature se group (anagrams), frequency ginna, dedup, ya longest consecutive trick (streak ke left edge se hi start).

**How it works:** Ek pass: pehle dekho saathi/group already hai kya, fir current element store karo. Grouping ke liye canonical key banao (sorted string). Time `O(n)` average, space `O(n)`.

```js
// Hashing skeleton — lookup then store (Two Sum / pair)
// check complement first, then store current element
const seen = new Map(); // ya Set
for (const x of nums) {
  if (seen.has(needFor(x))) return found; // complement already stored — pair found
  seen.set(keyFor(x), x);                 // store current element for future lookups
}

// Frequency skeleton
// count frequency of each character
const freq = new Map();
for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

// Group-by-key skeleton
// bucket strings sharing the same canonical key
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
// Complement lookup in one pass
// LC: https://leetcode.com/problems/two-sum/
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]; // partner we still need
    if (seen.has(need)) return [seen.get(need), i]; // found pair
    seen.set(nums[i], i); // remember index for later
  }
}
```

## Group Anagrams

Same letters sorted become the same key. Bucket words by that key.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

```js
// Map key = sorted letters (canonical anagram form)
// LC: https://leetcode.com/problems/group-anagrams/
function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = [...s].sort().join(""); // anagrams share the same key
    if (!groups.has(key)) groups.set(key, []); // start a new bucket
    groups.get(key).push(s); // append word to its anagram group
  }
  return [...groups.values()]; // one array per distinct key
}
```

## Valid Anagram

Count letters of `s`, subtract letters of `t`. If anything is left, they are not anagrams.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

```js
// Frequency map — increment s, decrement t
// LC: https://leetcode.com/problems/valid-anagram/
function isAnagram(s, t) {
  if (s.length !== t.length) return false; // different lengths cannot match
  const count = Object.create(null);
  for (const ch of s) count[ch] = (count[ch] || 0) + 1; // tally letters in s
  for (const ch of t) {
    if (!count[ch]) return false; // t uses a letter s did not have
    count[ch]--; // cancel one occurrence from s's count
  }
  return true; // all counts hit zero when counts match
}
```

## Longest Consecutive Sequence

Put everything in a set. Only start counting at a number that has no `n - 1`. Then walk `n + 1`, `n + 2`, … That way each number is touched about twice, not n².

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

```js
// Only start counting at streak left edge (no n-1 in set)
// LC: https://leetcode.com/problems/longest-consecutive-sequence/
function longestConsecutive(nums) {
  const set = new Set(nums); // O(1) membership for neighbors
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue; // not a streak start — skip
    let len = 1;
    while (set.has(n + len)) len++; // walk n+1, n+2, … while present
    best = Math.max(best, len); // track longest run seen
  }
  return best;
}
```

## Contains Duplicate

Har number pehle dekha kya? Set me check karo. Interview ka sabse basic hashing check.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

```js
// Set membership — duplicate on second sighting
// LC: https://leetcode.com/problems/contains-duplicate/
function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true; // already in set — duplicate exists
    seen.add(x); // first time seeing x
  }
  return false; // all elements unique
}
```

## Valid Sudoku

Har row, column, aur 3x3 box me 1-9 ek baar hi aana chahiye. Hash set se check karo.

[Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

```js
// Row / col / 3×3 box sets — each digit once per unit
// LC: https://leetcode.com/problems/valid-sudoku/
function isValidSudoku(board) {
  const rows = Array.from({length:9}, ()=> new Set());
  const cols = Array.from({length:9}, ()=> new Set());
  const boxes = Array.from({length:9}, ()=> new Set());
  for (let r=0; r<9; r++) {
    for (let c=0; c<9; c++) {
      const v = board[r][c];
      if (v === ".") continue; // empty cell — no constraint
      const b = Math.floor(r/3)*3 + Math.floor(c/3); // box id 0..8
      if (rows[r].has(v) || cols[c].has(v) || boxes[b].has(v)) return false; // duplicate in row/col/box
      rows[r].add(v); cols[c].add(v); boxes[b].add(v); // mark digit used in all three units
    }
  }
  return true;
}
```

## Top K Frequent Elements

Frequency gino, fir heap / bucket se top K nikalo. Hashing + heap combo ka classic.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```js
// Count freq, then bucket sort by frequency index
// LC: https://leetcode.com/problems/top-k-frequent-elements/
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x)||0)+1); // tally each value
  const bucket = Array(nums.length+1).fill(0).map(()=>[]); // index = frequency
  for (const [num, f] of freq) bucket[f].push(num); // all nums with freq f
  const ans = [];
  for (let f=bucket.length-1; f>=0 && ans.length < k; f--) { // highest freq first
    for (const n of bucket[f]) {
      ans.push(n);
      if (ans.length===k) break; // collected k elements
    }
  }
  return ans;
}
```
