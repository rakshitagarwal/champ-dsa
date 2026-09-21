# Hashing

*Instant key -> value lookup -- the interview MVP.*

**Definition:** Hashing (hash map `Map` / hash set `Set` / plain `Object`) gives average `O(1)` lookup, insert, and delete — keys hash into buckets. Trade space for time: remember what you have already seen. This is the other half of **Arrays & Hashing**. Turns "nested loop O(n^2)" into "one pass O(n)".

**When to use:** Whenever you think “I wish I remembered what I saw earlier” — find a complement (Two Sum), group by signature (anagrams), count frequencies, dedupe, or the longest consecutive trick (only start a streak at a left edge).

**How it works:** One pass: check whether the partner/group already exists, then store the current element. For grouping, build a canonical key (e.g. sorted string). Time `O(n)` average, space `O(n)`.

**Structure:** A bucket array. `hash(key) % capacity` picks the bucket; collisions share a bucket via chaining (small list per bucket) or open addressing (probe next slot). When load factor grows, the table resizes and rehashes everything.

**Big-O:**

| Operation | Time | Why |
| --- | --- | --- |
| Insert (put) | `O(1)` avg | Hash to bucket |
| Lookup (get) | `O(1)` avg | Hash to bucket |
| Delete | `O(1)` avg | Hash to bucket |
| Contains key | `O(1)` avg | Hash to bucket |
| Worst case | `O(n)` | All keys collide |

**Catch:** No ordering — cannot iterate sorted or insertion order without extra work (`Map` keeps insertion, not sorted). Collisions degrade to `O(n)` worst case. Extra memory for the bucket array. Keys must be hashable (`Map` object keys compare by reference).

**Keywords:** frequency, count, seen, visited, memoize, cache, group by, anagram, complement, duplicate, two sum.

## Study notes

- **Recognition:** “already seen?”, frequency, group-by-key, complement `target - x`.
- **Map vs Object:** non-string keys / insertion order / `.size` → `Map`. Simple string keys → `{}` is fine.
- **Set vs Map:** existence only → `Set`; store a value → `Map`.
- **Traps:** `{}` with `hasOwn` vs prototype; Map object keys are by reference; forgetting to `set` after a freq `get` bump.
- **Checklist:** is the key hashable? average vs worst collision (LC usually OK with average)?

## Active revision

- Two Sum: look up complement **before** or **after** storing the current index — why?
- Longest Consecutive: why only start at numbers with no `n - 1`?
- When do you pick `Set` over `Map`?

## JS Object / Map / Set methods (interview cheatsheet)

### Object (`{}`)

| API | Notes |
| --- | --- |
| `obj[key] = v` / `obj.key` | set / get |
| `key in obj` / `Object.hasOwn(obj, key)` | existence (`hasOwn` safer) |
| `delete obj[key]` | remove |
| `Object.keys` / `values` / `entries` | iterate |
| `Object.assign` / `{...a, ...b}` | shallow merge |

Keys always strings/symbols. Prefer `Map` for integer-looking keys if you care about type.

### Map

| API | Notes |
| --- | --- |
| `new Map()` / `new Map([[k,v]])` | create |
| `set(k,v)` | chainable; upsert |
| `get(k)` | missing → `undefined` |
| `has(k)` | bool |
| `delete(k)` / `clear()` | remove |
| `size` | count |
| `keys()` / `values()` / `entries()` / `for...of` | iterate insertion order |
| `forEach((v,k) => ...)` | |

Freq bump: `map.set(k, (map.get(k) || 0) + 1)`.

### Set

| API | Notes |
| --- | --- |
| `new Set()` / `new Set(arr)` | create / dedupe |
| `add(x)` | chainable |
| `has(x)` | bool — `O(1)` avg |
| `delete(x)` / `clear()` | remove |
| `size` | count |
| `for...of` / `keys()` / `values()` | iterate |

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
// Time: O(n) · Space: O(n)
// map value → index; look for complement
// Hashing — complement
var twoSum = function(nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const compliment = target - nums[i];

    if (map.has(compliment)) {
      return [i, map.get(compliment)];
    } else {
      map.set(nums[i], i);
    }
  }
};
```

## Group Anagrams

Same letters sorted become the same key. Bucket words by that key.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

```js
// Time: O(n·k log k) · Space: O(n·k)
// key = sorted letters
var groupAnagrams = function(strs) {
  let sorted = strs.map((str) => str.split("").sort().join(""));

  let map = {};

  for (let i = 0; i < sorted.length; i++) {
    if (!map[sorted[i]]) {
      map[sorted[i]] = [strs[i]];
    } else {
      map[sorted[i]].push(strs[i]);
    }
  }

  return Object.values(map);
};
```

## Valid Anagram

Count letters of `s`, subtract letters of `t`. If anything is left, they are not anagrams.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

```js
// Time: O(n) · Space: O(1)
// count chars; must match
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;

  let map = {};

  for (let i = 0; i < s.length; i++) {
    let letter = s[i];

    if (!map[letter]) {
      map[letter] = 1;
    } else {
      map[letter]++;
    }
  }

  for (let i = 0; i < t.length; i++) {
    let letter = t[i];

    if (map[letter] === undefined) {
      return false;
    }
    if (map[letter] < 1) {
      return false;
    }
    map[letter]--;
  }

  return true;
};
```

## Longest Consecutive Sequence

Put everything in a set. Only start counting at a number that has no `n - 1`. Then walk `n + 1`, `n + 2`, … That way each number is touched about twice, not n².

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

```js
// Time: O(n) · Space: O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let set = new Set(nums);
    let streak = 0;
    
    for(let num of set){
        if(set.has(num-1)) continue;
        let currStreak = 1;
        
        while(set.has(num+1)){
            currStreak++;
            num++;
        }
        streak = Math.max(streak, currStreak);
    }
    
    return streak;
};
```

## Contains Duplicate

Has this number been seen before? Check with a Set. The most basic hashing interview check.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

```js
// Time: O(n) · Space: O(n)
// set: if already seen → duplicate
var containsDuplicate = function(nums) {
  let set = new Set(nums);
  return set.size !== nums.length;
};
```

## Valid Sudoku

Each row, column, and 3×3 box may contain 1–9 at most once. Check with hash sets.

[Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

```js
// Time: O(n) · Space: O(n)
// Row / col / 3×3 box sets — each digit once per unit
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

Count frequencies, then pull top K with a heap or buckets. Classic hashing + heap combo.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```js
// Time: O(n log k) · Space: O(n)
// count → heap/bucket of size k
var topKFrequent = function(nums, k) {
  let map = {};
  let bucket = [];
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = 1;
    } else {
      map[nums[i]]++;
    }
  }

  for (let [num, freq] of Object.entries(map)) {
    if (!bucket[freq]) {
      bucket[freq] = new Set().add(num);
    } else {
      bucket[freq] = bucket[freq].add(num);
    }
  }

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) break;
  }

  return result;
};
```