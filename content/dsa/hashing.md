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
// map value → index; look for complement
// Hashing — complement
// LC: https://leetcode.com/problems/two-sum/
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
// key = sorted letters
// LC: https://leetcode.com/problems/group-anagrams/
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
// count chars; must match
// LC: https://leetcode.com/problems/valid-anagram/
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
// LC: https://leetcode.com/problems/longest-consecutive-sequence/
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

Har number pehle dekha kya? Set me check karo. Interview ka sabse basic hashing check.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

```js
// set: if already seen → duplicate
// LC: https://leetcode.com/problems/contains-duplicate/
var containsDuplicate = function(nums) {
  let set = new Set(nums);
  return set.size !== nums.length;
};
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
// count → heap/bucket of size k
// LC: https://leetcode.com/problems/top-k-frequent-elements/
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
