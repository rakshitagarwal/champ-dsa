import type { SolutionGroup } from "./types";

export const ARRAYS_HASHING_SOLUTIONS: SolutionGroup = {
  id: "arrays-hashing",
  title: "Arrays & Hashing",
  subs: [
    {
      title: "Hash Map / Frequency",
      topics: [
    {
      id: 1,
      lcSlug: "two-sum",
      title: "Two Sum",
      diff: "Easy",
      body: `I would remember each number’s index. When \`target - nums[i]\` is already in the map, I am done.

[Two Sum](https://leetcode.com/problems/two-sum/)

\`\`\`js
// Hash map — complement lookup in one pass
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]; // partner we still need
    if (seen.has(need)) return [seen.get(need), i]; // found pair
    seen.set(nums[i], i); // remember index for later
  }
}
\`\`\``,
    },
    {
      id: 217,
      lcSlug: "contains-duplicate",
      title: "Contains Duplicate",
      diff: "Easy",
      body: `Track seen values in a set — if a number appears twice, return true. Classic O(n) duplicate check.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

\`\`\`js
// Set — O(n) duplicate detection
function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true; // second time seeing x
    seen.add(x);
  }
  return false;
}
\`\`\``,
    },
    {
      id: 242,
      lcSlug: "valid-anagram",
      title: "Valid Anagram",
      diff: "Easy",
      body: `Anagrams have equal letter counts — increment for \`s\`, decrement for \`t\`, all frequencies zero means match.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

\`\`\`js
// Frequency delta — +s, -t, all zero if anagram
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const f = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    f[s.charCodeAt(i) - 97]++; // count s letters
    f[t.charCodeAt(i) - 97]--; // cancel with t
  }
  return f.every((x) => x === 0);
}
\`\`\``,
    },
    {
      id: 49,
      lcSlug: "group-anagrams",
      title: "Group Anagrams",
      diff: "Medium",
      body: `Use sorted letters as the map key — anagrams share the same key; append each word to its bucket.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

\`\`\`js
// Map key = sorted letters (canonical anagram form)
function groupAnagrams(strs) {
  const map = new Map();
  for (const w of strs) {
    const key = [...w].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()];
}
\`\`\``,
    },
    {
      id: 347,
      lcSlug: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      diff: "Medium",
      body: `Count first. Then a min-heap of \`[freq, num]\` of size k.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

\`\`\`js
// Min-heap of size k on [freq, num]
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
  const h = [];
  const less = (a, b) => a[0] < b[0]; // min-heap by frequency
  for (const [num, f] of freq) {
    heapPush(h, [f, num], less);
    if (h.length > k) heapPop(h, less); // drop smallest freq
  }
  return h.map(([, num]) => num);
}

// Min-heap helpers (shared pattern)
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!less(h[i], h[p])) break;
    [h[i], h[p]] = [h[p], h[i]]; // bubble up
    i = p;
  }
}
function heapPop(h, less = (a, b) => a < b) {
  const top = h[0], last = h.pop();
  if (!h.length) return top;
  h[0] = last;
  let i = 0;
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1;
    if (l < h.length && less(h[l], h[m])) m = l;
    if (r < h.length && less(h[r], h[m])) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]]; // bubble down
    i = m;
  }
  return top;
}
\`\`\``,
    },
    {
      id: 380,
      lcSlug: "insert-delete-getrandom-o1",
      title: "Insert Delete GetRandom O(1)",
      diff: "Medium",
      body: `Array stores values, map stores index — O(1) insert/remove; delete swaps with last element then pops.

[Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)

\`\`\`js
// Array + map: O(1) insert/delete/random
function RandomizedSet() {
  this.a = []; // values for random pick
  this.pos = new Map(); // val -> index in a
}
RandomizedSet.prototype.insert = function (val) {
  if (this.pos.has(val)) return false;
  this.pos.set(val, this.a.length);
  this.a.push(val);
  return true;
};
RandomizedSet.prototype.remove = function (val) {
  if (!this.pos.has(val)) return false;
  const i = this.pos.get(val);
  const last = this.a.pop(); // swap-delete with tail
  if (i < this.a.length) {
    this.a[i] = last;
    this.pos.set(last, i);
  }
  this.pos.delete(val);
  return true;
};
RandomizedSet.prototype.getRandom = function () {
  return this.a[Math.floor(Math.random() * this.a.length)];
};
\`\`\``,
    },
    {
      id: 128,
      lcSlug: "longest-consecutive-sequence",
      title: "Longest Consecutive Sequence",
      diff: "Medium",
      body: `Put everything in a set. Only start counting at a number that has no \`n - 1\`. Then walk \`n + 1\`, \`n + 2\`, … That way each number is touched about twice, not n².

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

\`\`\`js
// Only start counting at streak left edge (no n-1 in set)
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue; // not a start
    let len = 1;
    while (set.has(n + len)) len++; // walk consecutive
    best = Math.max(best, len);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 169,
      lcSlug: "majority-element",
      title: "Majority Element",
      diff: "Easy",
      body: `Boyer–Moore majority vote — track a candidate and count; cancel mismatches; final candidate is the majority if one exists.

[Majority Element](https://leetcode.com/problems/majority-element/)

\`\`\`js
// Boyer-Moore majority vote — O(n), O(1) space
function majorityElement(nums) {
  let cand = 0, count = 0;
  for (const x of nums) {
    if (count === 0) cand = x; // new candidate
    count += (x === cand ? 1 : -1); // match +1 else cancel
  }
  return cand; // guaranteed majority exists
}
\`\`\``,
    },
    {
      id: 229,
      lcSlug: "majority-element-ii",
      title: "Majority Element II",
      diff: "Medium",
      body: `At most two elements appear more than n/3 times — run Boyer–Moore twice, then verify counts.

[Majority Element II](https://leetcode.com/problems/majority-element-ii/)

\`\`\`js
// Boyer-Moore for > n/3 — at most two candidates, then verify
function majorityElement(nums) {
  let c1 = 0, c2 = 0, v1 = 0, v2 = 0;
  for (const x of nums) {
    if (x === c1) v1++;
    else if (x === c2) v2++;
    else if (v1 === 0) { c1 = x; v1 = 1; }
    else if (v2 === 0) { c2 = x; v2 = 1; }
    else { v1--; v2--; } // cancel three distinct
  }
  const out = [];
  for (const c of [c1, c2]) {
    let cnt = 0;
    for (const x of nums) if (x === c) cnt++;
    if (cnt > nums.length / 3 && !out.includes(c)) out.push(c);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 36,
      lcSlug: "valid-sudoku",
      title: "Valid Sudoku",
      diff: "Medium",
      body: `Each row, column, and 3×3 box must contain 1–9 once — use hash sets (or bitmasks) while filling or validating.

[Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

\`\`\`js
// Track seen digits per row, col, 3x3 box
function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (v === ".") continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(v) || cols[c].has(v) || boxes[b].has(v)) return false;
      rows[r].add(v);
      cols[c].add(v);
      boxes[b].add(v);
    }
  }
  return true;
}
\`\`\``,
    },
    {
      id: 205,
      lcSlug: "isomorphic-strings",
      title: "Isomorphic Strings",
      diff: "Easy",
      body: `Bijection required — map \`s→t\` and \`t→s\`; any conflicting mapping breaks isomorphism.

[Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)

\`\`\`js
// Bijection: s->t and t->s must stay consistent
function isIsomorphic(s, t) {
  const m1 = new Map(), m2 = new Map();
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (m1.has(a) && m1.get(a) !== b) return false;
    if (m2.has(b) && m2.get(b) !== a) return false;
    m1.set(a, b);
    m2.set(b, a);
  }
  return true;
}
\`\`\``,
    },
    {
      id: 290,
      lcSlug: "word-pattern",
      title: "Word Pattern",
      diff: "Easy",
      body: `Same as isomorphic strings but map pattern characters to whole words — enforce both directions.

[Word Pattern](https://leetcode.com/problems/word-pattern/)

\`\`\`js
// Same as isomorphic — char maps to word bijectively
function wordPattern(pattern, s) {
  const words = s.split(" ");
  if (words.length !== pattern.length) return false;
  const m1 = new Map(), m2 = new Map();
  for (let i = 0; i < pattern.length; i++) {
    const a = pattern[i], b = words[i];
    if (m1.has(a) && m1.get(a) !== b) return false;
    if (m2.has(b) && m2.get(b) !== a) return false;
    m1.set(a, b);
    m2.set(b, a);
  }
  return true;
}
\`\`\``,
    },
    {
      id: 202,
      lcSlug: "happy-number",
      title: "Happy Number",
      diff: "Easy",
      body: `Replace n with sum of square digits until 1 (happy) or a cycle (unhappy). Use a set to detect revisits.

[Happy Number](https://leetcode.com/problems/happy-number/)

\`\`\`js
// Repeat digit-square sum — cycle detection with set
function isHappy(n) {
  const seen = new Set();
  const sq = (x) => {
    let s = 0;
    while (x > 0) {
      const d = x % 10;
      s += d * d;
      x = Math.floor(x / 10);
    }
    return s;
  };
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sq(n);
  }
  return n === 1;
}
\`\`\``,
    },
    {
      id: 383,
      lcSlug: "ransom-note",
      title: "Ransom Note",
      diff: "Easy",
      body: `Count magazine letters, subtract for each ransom note character — any deficit means impossible.

[Ransom Note](https://leetcode.com/problems/ransom-note/)

\`\`\`js
// Frequency budget from magazine, spend on ransom
function canConstruct(ransomNote, magazine) {
  const cnt = new Map();
  for (const ch of magazine) cnt.set(ch, (cnt.get(ch) || 0) + 1);
  for (const ch of ransomNote) {
    if (!cnt.get(ch)) return false; // out of letters
    cnt.set(ch, cnt.get(ch) - 1);
  }
  return true;
}
\`\`\``,
    },
    {
      id: 387,
      lcSlug: "first-unique-character-in-a-string",
      title: "First Unique Character in a String",
      diff: "Easy",
      body: `Two passes — count frequencies, then return the first value with count exactly one.

[First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)

\`\`\`js
// Count then scan for first count === 1
function firstUniqChar(s) {
  const cnt = new Map();
  for (const ch of s) cnt.set(ch, (cnt.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (cnt.get(s[i]) === 1) return i;
  }
  return -1;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Prefix Sum / Difference",
      topics: [
    {
      id: 303,
      lcSlug: "range-sum-query-immutable",
      title: "Range Sum Query - Immutable",
      diff: "Easy",
      body: `Many range-sum queries — build prefix sums, answer \`sum(l,r) = pref[r+1] - pref[l]\` in O(1).

[Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)

\`\`\`js
// Prefix sums — sumRange in O(1)
function NumArray(nums) {
  this.pref = [0];
  for (const x of nums) this.pref.push(this.pref.at(-1) + x);
}
NumArray.prototype.sumRange = function (l, r) {
  return this.pref[r + 1] - this.pref[l]; // exclusive pref[r+1] minus pref[l]
};
\`\`\``,
    },
    {
      id: 724,
      lcSlug: "find-pivot-index",
      title: "Find Pivot Index",
      diff: "Easy",
      body: `Find pivot where left sum equals right sum: track prefix sums against total minus prefix.

[Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)

\`\`\`js
// left sum == right sum at pivot
function pivotIndex(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    const right = total - left - nums[i];
    if (left === right) return i;
    left += nums[i];
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 238,
      lcSlug: "product-of-array-except-self",
      title: "Product of Array Except Self",
      diff: "Medium",
      body: `Left-to-right: product of everything before \`i\`. Right-to-left: product of everything after \`i\`. Multiply. No division, so zeros are fine.

[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

\`\`\`js
// Prefix products left, suffix products right — no division
function productExceptSelf(nums) {
  const n = nums.length, out = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    out[i] *= left; // product of nums[0..i-1]
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= right; // product of nums[i+1..n-1]
    right *= nums[i];
  }
  return out;
}
\`\`\``,
    },
    {
      id: 560,
      lcSlug: "subarray-sum-equals-k",
      title: "Subarray Sum Equals K",
      diff: "Medium",
      body: `Not on the PDF list, but this is the other half of prefix sums. \`count += how many times I have already seen (sum - k)\`.

[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

\`\`\`js
// Prefix sum + map: subarray ending here with sum k
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // empty prefix
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0; // prior prefix sum - k
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}
\`\`\``,
    },
    {
      id: 525,
      lcSlug: "contiguous-array",
      title: "Contiguous Array",
      diff: "Medium",
      body: `Treat 0 as -1 — longest subarray with equal 0s and 1s is longest prefix sum zero; store first index per sum.

[Contiguous Array](https://leetcode.com/problems/contiguous-array/)

\`\`\`js
// Treat 0 as -1 — balanced when prefix sum repeats
function findMaxLength(nums) {
  const first = new Map([[0, -1]]); // sum 0 before start
  let sum = 0, best = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 0 ? -1 : 1;
    if (first.has(sum)) best = Math.max(best, i - first.get(sum));
    else first.set(sum, i); // first time at this sum
  }
  return best;
}
\`\`\``,
    },
    {
      id: 974,
      lcSlug: "subarray-sums-divisible-by-k",
      title: "Subarray Sums Divisible by K",
      diff: "Medium",
      body: `Prefix sums mod K — equal remainders mean a subarray sum divisible by K; normalize negative mods.

[Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)

\`\`\`js
// Same prefix mod k => subarray divisible by k
function subarraysDivByK(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, ans = 0;
  for (const x of nums) {
    sum += x;
    const r = ((sum % k) + k) % k; // nonnegative mod
    ans += seen.get(r) || 0;
    seen.set(r, (seen.get(r) || 0) + 1);
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 930,
      lcSlug: "binary-subarrays-with-sum",
      title: "Binary Subarrays With Sum",
      diff: "Medium",
      body: `Binary subarrays summing to \`goal\` — prefix counts; at each index look for \`cur - goal\` seen before.

[Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/)

\`\`\`js
// Same as subarray sum equals k with sum = goal
function numSubarraysWithSum(nums, goal) {
  const seen = new Map([[0, 1]]);
  let cur = 0, ans = 0;
  for (const x of nums) {
    cur += x;
    ans += seen.get(cur - goal) || 0;
    seen.set(cur, (seen.get(cur) || 0) + 1);
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 523,
      lcSlug: "continuous-subarray-sum",
      title: "Continuous Subarray Sum",
      diff: "Medium",
      body: `Subarray length ≥ 2 and sum divisible by k — track prefix mod k and first index; matching remainders give valid length ≥ 2.

[Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)

\`\`\`js
// Prefix mod k with length >= 2 (store first index per remainder)
function checkSubarraySum(nums, k) {
  const first = new Map([[0, -1]]);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const r = k === 0 ? sum : sum % k;
    if (first.has(r)) {
      if (i - first.get(r) >= 2) return true;
    } else first.set(r, i);
  }
  return false;
}
\`\`\``,
    },
    {
      id: 437,
      lcSlug: "path-sum-iii",
      title: "Path Sum III",
      diff: "Medium",
      body: `Root-to-node prefix sums — if \`cur - k\` was seen on the path, add those paths; backtrack counts on return.

[Path Sum III](https://leetcode.com/problems/path-sum-iii/)

\`\`\`js
// Prefix sum on root-to-node paths (downward only)
function pathSum(root, targetSum) {
  const seen = new Map([[0, 1]]);
  let ans = 0;
  const dfs = (node, cur) => {
    if (!node) return;
    cur += node.val;
    ans += seen.get(cur - targetSum) || 0;
    seen.set(cur, (seen.get(cur) || 0) + 1);
    dfs(node.left, cur);
    dfs(node.right, cur);
    seen.set(cur, seen.get(cur) - 1); // backtrack prefix count
  };
  dfs(root, 0);
  return ans;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Array Manipulation",
      topics: [
    {
      id: 121,
      lcSlug: "best-time-to-buy-and-sell-stock",
      title: "Best Time to Buy and Sell Stock",
      diff: "Easy",
      body: `One buy and one sell — track the minimum price so far; update max profit when selling today.

[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

\`\`\`js
// One pass — min buy price so far, max profit if sell today
function maxProfit(prices) {
  let best = 0, minPrice = Infinity;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    best = Math.max(best, p - minPrice);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 53,
      lcSlug: "maximum-subarray",
      title: "Maximum Subarray",
      diff: "Medium",
      body: `Kadane: keep a running sum. If it goes negative, drop it and start at the next number. Track the best running sum. Negatives are allowed — start \`best\` at \`-Infinity\`.

[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

\`\`\`js
// Kadane — drop running sum when it hurts
function maxSubArray(nums) {
  let run = 0, best = -Infinity;
  for (const x of nums) {
    run = Math.max(x, run + x); // start fresh at x or extend
    best = Math.max(best, run);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 152,
      lcSlug: "maximum-product-subarray",
      title: "Maximum Product Subarray",
      diff: "Medium",
      body: `Like Kadane but negatives flip min/max product — track both running max and min product ending here.

[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

\`\`\`js
// Track max and min product — negative flips min/max
function maxProduct(nums) {
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const cand = [x, curMax * x, curMin * x];
    curMax = Math.max(...cand);
    curMin = Math.min(...cand);
    best = Math.max(best, curMax);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 189,
      lcSlug: "rotate-array",
      title: "Rotate Array",
      diff: "Medium",
      body: `\`k %= n\`. Reverse the whole array, reverse the first \`k\`, reverse the rest. That is rotate right.

[Rotate Array](https://leetcode.com/problems/rotate-array/)

\`\`\`js
// Reverse whole, reverse first k, reverse rest — rotate right
function rotate(nums, k) {
  k %= nums.length;
  const rev = (l, r) => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  };
  rev(0, nums.length - 1);
  rev(0, k - 1);
  rev(k, nums.length - 1);
}
\`\`\``,
    },
    {
      id: 283,
      lcSlug: "move-zeroes",
      title: "Move Zeroes",
      diff: "Easy",
      body: `Copy every non-zero forward. Then fill the tail with zeroes. Order of the real numbers stays.

[Move Zeroes](https://leetcode.com/problems/move-zeroes/)

\`\`\`js
// Compact non-zeros left, pad zeros at end
function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) nums[write++] = nums[read];
  }
  while (write < nums.length) nums[write++] = 0;
}
\`\`\``,
    },
    {
      id: 27,
      lcSlug: "remove-element",
      title: "Remove Element",
      diff: "Easy",
      body: `Remove all copies of \`val\` in place — slow pointer writes survivors, return new length.

[Remove Element](https://leetcode.com/problems/remove-element/)

\`\`\`js
// Slow pointer writes kept elements
function removeElement(nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}
\`\`\``,
    },
    {
      id: 26,
      lcSlug: "remove-duplicates-from-sorted-array",
      title: "Remove Duplicates from Sorted Array",
      diff: "Easy",
      body: `Sorted array — duplicates are adjacent; compact unique values with a write pointer and return new length.

[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

\`\`\`js
// Sorted — skip equal neighbors
function removeDuplicates(nums) {
  if (!nums.length) return 0;
  let write = 1;
  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[read - 1]) nums[write++] = nums[read];
  }
  return write;
}
\`\`\``,
    },
    {
      id: 88,
      lcSlug: "merge-sorted-array",
      title: "Merge Sorted Array",
      diff: "Easy",
      body: `Merge from the back of the buffer — write largest elements at \`m+n-1\` downward to avoid overwriting unmerged nums.

[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

\`\`\`js
// Merge from end — no overwrite of unread nums1
function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }
}
\`\`\``,
    },
    {
      id: 41,
      lcSlug: "first-missing-positive",
      title: "First Missing Positive",
      diff: "Hard",
      body: `Cyclic sort — place value \`v\` at index \`v-1\`; the index where \`nums[i] !== i+1\` is the missing number.

[First Missing Positive](https://leetcode.com/problems/first-missing-positive/)

\`\`\`js
// Cyclic sort — value v belongs at index v-1
function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      const tmp = nums[i];
      nums[i] = nums[j];
      nums[j] = tmp;
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
  return n + 1;
}
\`\`\``,
    },
    {
      id: 268,
      lcSlug: "missing-number",
      title: "Missing Number",
      diff: "Easy",
      body: `XOR all indexes with all values. The missing index never cancels. Or \`n*(n+1)/2 - sum\`.

[Missing Number](https://leetcode.com/problems/missing-number/)

\`\`\`js
// XOR all indices 0..n with all values — lone bit is missing
function missingNumber(nums) {
  let x = nums.length;
  for (let i = 0; i < nums.length; i++) x ^= i ^ nums[i];
  return x;
}
\`\`\``,
    },
    {
      id: 448,
      lcSlug: "find-all-numbers-disappeared-in-an-array",
      title: "Find All Numbers Disappeared in an Array",
      diff: "Easy",
      body: `Mark seen indices by negating \`nums[abs(x)-1]\` — the index still positive points to the missing value.

[Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)

\`\`\`js
// Mark seen indices negative — positive index+1 missing
function findDisappearedNumbers(nums) {
  for (const x of nums) {
    const i = Math.abs(x) - 1;
    if (nums[i] > 0) nums[i] = -nums[i];
  }
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) out.push(i + 1);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 442,
      lcSlug: "find-all-duplicates-in-an-array",
      title: "Find All Duplicates in an Array",
      diff: "Medium",
      body: `Same marking trick — if \`nums[abs(x)-1]\` is already negative, \`x\` is the duplicate.

[Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/)

\`\`\`js
// Second visit to index marks duplicate value i+1
function findDuplicates(nums) {
  const out = [];
  for (const x of nums) {
    const i = Math.abs(x) - 1;
    if (nums[i] < 0) out.push(i + 1);
    else nums[i] = -nums[i];
  }
  return out;
}
\`\`\``,
    },
    {
      id: 645,
      lcSlug: "set-mismatch",
      title: "Set Mismatch",
      diff: "Easy",
      body: `Find duplicate via marking or math — missing = expected sum minus actual sum (or XOR variant).

[Set Mismatch](https://leetcode.com/problems/set-mismatch/)

\`\`\`js
// Negative marking for dup; missing from sum arithmetic
function findErrorNums(nums) {
  let dup = -1;
  for (const x of nums) {
    const i = Math.abs(x) - 1;
    if (nums[i] < 0) dup = i + 1;
    else nums[i] = -nums[i];
  }
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  let actual = 0;
  for (const x of nums) actual += Math.abs(x);
  return [dup, expected - (actual - dup)];
}
\`\`\``,
    },
    {
      id: 75,
      lcSlug: "sort-colors",
      title: "Sort Colors",
      diff: "Medium",
      body: `Dutch national flag — one pass with low/mid/high pointers to partition 0s, 1s, and 2s.

[Sort Colors](https://leetcode.com/problems/sort-colors/)

\`\`\`js
// Dutch national flag — 0 | 1 | 2 partitions
function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) [nums[lo++], nums[mid++]] = [nums[mid], nums[lo]];
    else if (nums[mid] === 1) mid++;
    else [nums[mid], nums[hi--]] = [nums[hi], nums[mid]];
  }
}
\`\`\``,
    },
    {
      id: 54,
      lcSlug: "spiral-matrix",
      title: "Spiral Matrix",
      diff: "Medium",
      body: `Four boundaries — peel each side of the matrix in order, shrink bounds after each edge.

[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

\`\`\`js
// Layer peel: top row, right col, bottom row, left col — shrink bounds
function spiralOrder(matrix) {
  const out = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(matrix[r][left]);
      left++;
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 48,
      lcSlug: "rotate-image",
      title: "Rotate Image",
      diff: "Medium",
      body: `Rotate 90° clockwise in place — transpose then reverse each row.

[Rotate Image](https://leetcode.com/problems/rotate-image/)

\`\`\`js
// 90° clockwise = transpose then reverse each row
function rotate(matrix) {
  const n = matrix.length;
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  for (const row of matrix) row.reverse();
}
\`\`\``,
    },
    {
      id: 73,
      lcSlug: "set-matrix-zeroes",
      title: "Set Matrix Zeroes",
      diff: "Medium",
      body: `Zero a cell’s entire row and column — use first row/column as markers for O(1) extra space.

[Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

\`\`\`js
// Use first row/col as markers — O(1) extra space
function setZeroes(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRowZero = true;
  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColZero = true;
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    }
  }
  if (firstRowZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  if (firstColZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;
}
\`\`\``,
    },
    {
      id: 289,
      lcSlug: "game-of-life",
      title: "Game of Life",
      diff: "Medium",
      body: `Encode next state in-place (e.g. 2 = live→dead, -1 = dead→live); use absolute value when counting live neighbors.

[Game of Life](https://leetcode.com/problems/game-of-life/)

\`\`\`js
// In-place: 2 = was live dies, -1 = was dead lives; use abs for neighbor count
function gameOfLife(board) {
  const rows = board.length, cols = board[0].length;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const live = (r, c) => {
    let n = 0;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (Math.abs(board[nr][nc]) === 1) n++;
    }
    return n;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = live(r, c);
      if (board[r][c] === 1 && (n < 2 || n > 3)) board[r][c] = 2;
      if (board[r][c] === 0 && n === 3) board[r][c] = -1;
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 2) board[r][c] = 0;
      if (board[r][c] === -1) board[r][c] = 1;
    }
  }
}
\`\`\``,
    },
      ],
    },
  ],
};
