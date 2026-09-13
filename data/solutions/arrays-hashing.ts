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
\`\`\``,
    },
    {
      id: 217,
      lcSlug: "contains-duplicate",
      title: "Contains Duplicate",
      diff: "Easy",
      body: `Har number pehle dekha kya? Set me check karo. Interview ka sabse basic hashing check.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

\`\`\`js
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/contains-duplicate/
function containsDuplicate(nums) {
  // Hinglish: set me pehle se hai kya?
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true; // Hinglish: duplicate mil gaya
    seen.add(x); // Hinglish: yaad rakho
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
      body: `Dono ke letter counts barabar hon to anagram. Ek ka +1, doosre ka -1 — sab zero to true.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

\`\`\`js
// Hinglish: string scan — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-anagram/
function isAnagram(s, t) {
  // Hinglish: step 1 — lambai check karo
  if (s.length !== t.length) return false;
  const f = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    f[s.charCodeAt(i) - 97]++; // Hinglish: pehle ka +1
    f[t.charCodeAt(i) - 97]--; // Hinglish: doosre ka -1
  }
  return f.every((x) => x === 0); // Hinglish: sab zero to anagram
}
\`\`\``,
    },
    {
      id: 49,
      lcSlug: "group-anagrams",
      title: "Group Anagrams",
      diff: "Medium",
      body: `Sorted word hi group ki key hai — anagram sort karke same bante hain. Map me key se list jodo.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

\`\`\`js
// Hinglish: string scan — ek-ek step comment dekho
// LC: https://leetcode.com/problems/group-anagrams/
function groupAnagrams(strs) {
  // Hinglish: step 1 — map banao
  const map = new Map();
  for (const w of strs) {
    const key = [...w].sort().join(""); // Hinglish: sort = group key
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w); // Hinglish: group me daalo
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
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — by frequency
// LC: https://leetcode.com/problems/top-k-frequent-elements/
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
  const h = [];
  const less = (a, b) => a[0] < b[0];
  for (const [num, f] of freq) {
    heapPush(h, [f, num], less); // Hinglish: heap me daalo
    if (h.length > k) heapPop(h, less); // Hinglish: sabse chhota nikala
  }
  return h.map(([, num]) => num);
}

// Heap helpers — har solution ke saath (min-heap default)
// Hinglish: push karke upar bubble, pop karke neeche bubble
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!less(h[i], h[p])) break;
    [h[i], h[p]] = [h[p], h[i]];
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
    [h[i], h[m]] = [h[m], h[i]];
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
      body: `Array plus map jodo — array random deta hai, map index batata hai. Delete me aakhri se swap karo.

[Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)

\`\`\`js
// Hinglish: array + map combo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/insert-delete-getrandom-o1/
function RandomizedSet() {
  // Hinglish: step 1 — dono banao
  this.a = [];
  this.pos = new Map();
}
RandomizedSet.prototype.insert = function (val) {
  if (this.pos.has(val)) return false;
  this.pos.set(val, this.a.length); // Hinglish: index yaad rakho
  this.a.push(val);
  return true;
};
RandomizedSet.prototype.remove = function (val) {
  if (!this.pos.has(val)) return false;
  const i = this.pos.get(val);
  const last = this.a.pop(); // Hinglish: aakhri nikalo
  if (i < this.a.length) {
    this.a[i] = last; // Hinglish: khaali jagah bharo
    this.pos.set(last, i);
  }
  this.pos.delete(val);
  return true;
};
RandomizedSet.prototype.getRandom = function () {
  return this.a[Math.floor(Math.random() * this.a.length)]; // Hinglish: random index
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
\`\`\``,
    },
    {
      id: 169,
      lcSlug: "majority-element",
      title: "Majority Element",
      diff: "Easy",
      body: `Boyer-Moore voting — candidate rakho, count badhao/ghatao. End me candidate hi majority.

[Majority Element](https://leetcode.com/problems/majority-element/)

\`\`\`js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/majority-element/
function majorityElement(nums) {
  // Hinglish: vote karo
  let cand = 0, count = 0;
  for (const x of nums) {
    if (count===0) cand = x; // Hinglish: naya candidate
    count += (x===cand ? 1 : -1); // Hinglish: same to +1 warna -1
  }
  return cand;
}
\`\`\``,
    },
    {
      id: 229,
      lcSlug: "majority-element-ii",
      title: "Majority Element II",
      diff: "Medium",
      body: `n/3 se zyada matlab max 2 answer — Boyer-Moore do candidate ke saath chalao.

[Majority Element II](https://leetcode.com/problems/majority-element-ii/)

\`\`\`js
// Hinglish: do candidate vote — ek-ek step comment dekho
// LC: https://leetcode.com/problems/majority-element-ii/
function majorityElement(nums) {
  // Hinglish: step 1 — do candidate lo
  let c1 = 0, c2 = 0, v1 = 0, v2 = 0;
  for (const x of nums) {
    if (x === c1) v1++;
    else if (x === c2) v2++;
    else if (v1 === 0) { c1 = x; v1 = 1; } // Hinglish: naya candidate 1
    else if (v2 === 0) { c2 = x; v2 = 1; } // Hinglish: naya candidate 2
    else { v1--; v2--; } // Hinglish: dono ke vote ghatao
  }
  const out = [];
  for (const c of [c1, c2]) {
    let cnt = 0;
    for (const x of nums) if (x === c) cnt++;
    if (cnt > nums.length / 3 && !out.includes(c)) out.push(c); // Hinglish: verify karo
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
      body: `Har row, column, aur 3x3 box me 1-9 ek baar hi aana chahiye. Hash set se check karo.

[Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

\`\`\`js
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-sudoku/
function isValidSudoku(board) {
  // Hinglish: 3 tarah ke set — row, col, box
  const rows = Array.from({length:9}, ()=> new Set());
  const cols = Array.from({length:9}, ()=> new Set());
  const boxes = Array.from({length:9}, ()=> new Set());
  for (let r=0; r<9; r++) {
    for (let c=0; c<9; c++) {
      const v = board[r][c];
      if (v === ".") continue;
      const b = Math.floor(r/3)*3 + Math.floor(c/3); // Hinglish: box index
      if (rows[r].has(v) || cols[c].has(v) || boxes[b].has(v)) return false; // Hinglish: pehle se hai to invalid
      rows[r].add(v); cols[c].add(v); boxes[b].add(v); // Hinglish: yaad rakho
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
      body: `Dono taraf mapping pakki honi chahiye — s se t aur t se s, ek bhi tooti to false.

[Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)

\`\`\`js
// Hinglish: dono taraf map — ek-ek step comment dekho
// LC: https://leetcode.com/problems/isomorphic-strings/
function isIsomorphic(s, t) {
  // Hinglish: step 1 — do map lo
  const m1 = new Map(), m2 = new Map();
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (m1.has(a) && m1.get(a) !== b) return false; // Hinglish: a pehle kuch aur tha
    if (m2.has(b) && m2.get(b) !== a) return false; // Hinglish: b pehle kuch aur tha
    m1.set(a, b); m2.set(b, a);
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
      body: `Isomorphic wala khel words pe — pattern char aur word dono taraf map karo.

[Word Pattern](https://leetcode.com/problems/word-pattern/)

\`\`\`js
// Hinglish: char-word map — ek-ek step comment dekho
// LC: https://leetcode.com/problems/word-pattern/
function wordPattern(pattern, s) {
  // Hinglish: step 1 — words todo
  const words = s.split(" ");
  if (words.length !== pattern.length) return false;
  const m1 = new Map(), m2 = new Map();
  for (let i = 0; i < pattern.length; i++) {
    const a = pattern[i], b = words[i];
    if (m1.has(a) && m1.get(a) !== b) return false;
    if (m2.has(b) && m2.get(b) !== a) return false;
    m1.set(a, b); m2.set(b, a);
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
      body: `Sum of squares loop me 1 pe ruke to happy, cycle me phase to unhappy. Cycle pakadne ke liye set rakho.

[Happy Number](https://leetcode.com/problems/happy-number/)

\`\`\`js
// Hinglish: cycle pakdo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/happy-number/
function isHappy(n) {
  // Hinglish: step 1 — dekhe hue yaad rakho
  const seen = new Set();
  const sq = (x) => {
    let s = 0;
    while (x > 0) { const d = x % 10; s += d * d; x = Math.floor(x / 10); } // Hinglish: digits square jodo
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
      body: `Magazine ke letters gin lo, note ka har letter maango — kam pada to false.

[Ransom Note](https://leetcode.com/problems/ransom-note/)

\`\`\`js
// Hinglish: gin ke kharch karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/ransom-note/
function canConstruct(ransomNote, magazine) {
  // Hinglish: step 1 — magazine gino
  const cnt = new Map();
  for (const ch of magazine) cnt.set(ch, (cnt.get(ch) || 0) + 1);
  for (const ch of ransomNote) {
    if (!cnt.get(ch)) return false; // Hinglish: khatm to mana
    cnt.set(ch, cnt.get(ch) - 1); // Hinglish: ek kharch
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
      body: `Do pass — pehle gino, phir pehla count-1 wala dhoondo.

[First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)

\`\`\`js
// Hinglish: gino phir dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/first-unique-character-in-a-string/
function firstUniqChar(s) {
  // Hinglish: step 1 — frequency banao
  const cnt = new Map();
  for (const ch of s) cnt.set(ch, (cnt.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (cnt.get(s[i]) === 1) return i; // Hinglish: pehla akela
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
      body: `Baar-baar range sum pucha jayega. Prefix banao, fir \`sum(l,r)=pref[r+1]-pref[l]\` O(1) me.

[Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)

\`\`\`js
// Hinglish: prefix jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/range-sum-query-immutable/
function NumArray(nums) {
  // Hinglish: prefix banao
  this.pref = [0];
  for (const x of nums) this.pref.push(this.pref.at(-1)+x);
}
NumArray.prototype.sumRange = function(l, r) {
  return this.pref[r+1] - this.pref[l]; // Hinglish: O(1) range
};
\`\`\``,
    },
    {
      id: 724,
      lcSlug: "find-pivot-index",
      title: "Find Pivot Index",
      diff: "Easy",
      body: `Pivot jahan left sum == right sum. Total sum se left nikalte jao.

[Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)

\`\`\`js
// Hinglish: prefix jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-pivot-index/
function pivotIndex(nums) {
  // Hinglish: total sum
  const total = nums.reduce((a,b)=>a+b, 0);
  let left = 0;
  for (let i=0;i<nums.length;i++) {
    if (left === total - left - nums[i]) return i; // Hinglish: left == right?
    left += nums[i]; // Hinglish: left badhao
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
// Hinglish: prefix jod — ek-ek step comment dekho
// Prefix / suffix products
// LC: https://leetcode.com/problems/product-of-array-except-self/
function productExceptSelf(nums) {
  // Hinglish: step 1 — base case check karo
  const n = nums.length, out = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    out[i] *= left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= right;
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
// Hinglish: prefix jod — ek-ek step comment dekho
// Prefix + map
// LC: https://leetcode.com/problems/subarray-sum-equals-k/
function subarraySum(nums, k) {
  // Hinglish: step 1 — base case check karo
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
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
      body: `0 ko -1 banao, fir prefix sum zero wala longest. Hash map me pehli occurrence yaad rakho.

[Contiguous Array](https://leetcode.com/problems/contiguous-array/)

\`\`\`js
// Hinglish: prefix jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/contiguous-array/
function findMaxLength(nums) {
  // Hinglish: 0 -> -1, sum 0 matlab equal 0/1
  const first = new Map([[0,-1]]); // Hinglish: sum 0 pehle -1 pe dekha
  let sum=0, best=0;
  for (let i=0;i<nums.length;i++) {
    sum += nums[i]===0 ? -1 : 1;
    if (first.has(sum)) best = Math.max(best, i - first.get(sum)); // Hinglish: pehle dekha to length nikalo
    else first.set(sum, i); // Hinglish: pehli baar dekha yaad rakho
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
      body: `Prefix mod gino — same remainder matlab beech wala hissa K se divisible. Negative mod sambhal ke rakho.

[Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)

\`\`\`js
// Hinglish: remainder gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/subarray-sums-divisible-by-k/
function subarraysDivByK(nums, k) {
  // Hinglish: step 1 — remainder map lo
  const seen = new Map([[0, 1]]);
  let sum = 0, ans = 0;
  for (const x of nums) {
    sum += x;
    const r = ((sum % k) + k) % k; // Hinglish: negative sambhalo
    ans += seen.get(r) || 0; // Hinglish: same remainder mila
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
      body: `Binary array me sum==goal wale subarrays — prefix sum gino, need = cur-goal dekho.

[Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/)

\`\`\`js
// Hinglish: prefix need dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-subarrays-with-sum/
function numSubarraysWithSum(nums, goal) {
  // Hinglish: step 1 — prefix map lo
  const seen = new Map([[0, 1]]);
  let cur = 0, ans = 0;
  for (const x of nums) {
    cur += x;
    ans += seen.get(cur - goal) || 0; // Hinglish: need pehle dekha?
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
      body: `Size kam se kam 2 ho aur sum k ka multiple ho — remainder map me index yaad rakho, gap 2+ chahiye.

[Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)

\`\`\`js
// Hinglish: remainder + index — ek-ek step comment dekho
// LC: https://leetcode.com/problems/continuous-subarray-sum/
function checkSubarraySum(nums, k) {
  // Hinglish: step 1 — pehli occurrence yaad rakho
  const first = new Map([[0, -1]]);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const r = k === 0 ? sum : sum % k;
    if (first.has(r)) {
      if (i - first.get(r) >= 2) return true; // Hinglish: size 2+ mila
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
      body: `Tree me neeche jaate prefix sum gino — cur-k pehle dikha to utne paths mile. Wapas aate count ghatao.

[Path Sum III](https://leetcode.com/problems/path-sum-iii/)

\`\`\`js
// Hinglish: prefix tree me — ek-ek step comment dekho
// LC: https://leetcode.com/problems/path-sum-iii/
function pathSum(root, targetSum) {
  // Hinglish: step 1 — prefix map lo
  const seen = new Map([[0, 1]]);
  let ans = 0;
  const dfs = (node, cur) => {
    if (!node) return;
    cur += node.val;
    ans += seen.get(cur - targetSum) || 0; // Hinglish: need mila?
    seen.set(cur, (seen.get(cur) || 0) + 1);
    dfs(node.left, cur); dfs(node.right, cur);
    seen.set(cur, seen.get(cur) - 1); // Hinglish: wapas aate ghatao
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
      body: `Ek baar kharido, ek baar becho. Sabse sasta kharido, sabse mehenga becho — ek scan me min price track karo.

[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

\`\`\`js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices) {
  // Hinglish: sabse kam price yaad rakho
  let best = 0, minPrice = Infinity;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p); // Hinglish: sasta mila to update
    best = Math.max(best, p - minPrice); // Hinglish: bech ke dekho profit
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
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — Kadane
// LC: https://leetcode.com/problems/maximum-subarray/
function maxSubArray(nums) {
  // Hinglish: step 1 — base case check karo
  let run = 0, best = -Infinity;
  for (const x of nums) {
    run = Math.max(x, run + x); // restart or continue
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
      body: `Kadane jaisa, par negative palat deta hai — isliye max aur min dono track karo.

[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

\`\`\`js
// Hinglish: max-min dono track — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-product-subarray/
function maxProduct(nums) {
  // Hinglish: step 1 — pehle se start karo
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const cand = [x, curMax * x, curMin * x]; // Hinglish: teen options
    curMax = Math.max(...cand); // Hinglish: sabse bada
    curMin = Math.min(...cand); // Hinglish: sabse chhota (negative kaam ayega)
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
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — reverse trick
// LC: https://leetcode.com/problems/rotate-array/
function rotate(nums, k) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — compact then fill
// LC: https://leetcode.com/problems/move-zeroes/
function moveZeroes(nums) {
  // Hinglish: step 1 — base case check karo
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
      body: `Val hatana hai order ki parwah nahi — aage se overwrite karo, slow pointer length batayega.

[Remove Element](https://leetcode.com/problems/remove-element/)

\`\`\`js
// Hinglish: overwrite karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-element/
function removeElement(nums, val) {
  // Hinglish: step 1 — slow pointer lo
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) { nums[k] = nums[i]; k++; } // Hinglish: kaam ka aage rakho
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
      body: `Sorted hai to duplicates bagal me honge. Write pointer se unique hi rakho, length return karo.

[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

\`\`\`js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
function removeDuplicates(nums) {
  // Hinglish: write = unique ka end
  if (!nums.length) return 0;
  let write = 1;
  for (let read=1; read<nums.length; read++) {
    if (nums[read] !== nums[read-1]) nums[write++] = nums[read]; // Hinglish: naya unique mila to copy
  }
  return write; // Hinglish: naya length
}
\`\`\``,
    },
    {
      id: 88,
      lcSlug: "merge-sorted-array",
      title: "Merge Sorted Array",
      diff: "Easy",
      body: `Do sorted arrays, piche se bharo taaki overwrite na ho. \`m+n\` jagah pehle se hai.

[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

\`\`\`js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/merge-sorted-array/
function merge(nums1, m, nums2, n) {
  // Hinglish: piche se bharo
  let i=m-1, j=n-1, k=m+n-1;
  while (j>=0) {
    if (i>=0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--]; // Hinglish: bada wala piche
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
      body: `1..n ko sahi jagah bithao (cyclic sort) — jo index khaali mile wahi jawab.

[First Missing Positive](https://leetcode.com/problems/first-missing-positive/)

\`\`\`js
// Hinglish: sahi jagah bithao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/first-missing-positive/
function firstMissingPositive(nums) {
  // Hinglish: step 1 — har number apni jagah
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      const tmp = nums[i]; nums[i] = nums[j]; nums[j] = tmp; // Hinglish: swap
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1; // Hinglish: pehli khaali jagah
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
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — XOR index with value
// LC: https://leetcode.com/problems/missing-number/
function missingNumber(nums) {
  // Hinglish: step 1 — base case check karo
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
      body: `Dikhe number ki jagah negative karo — jo positive bacha wo missing hai. O(1) space trick.

[Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)

\`\`\`js
// Hinglish: nishan lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
function findDisappearedNumbers(nums) {
  // Hinglish: step 1 — dikhe to negative karo
  for (const x of nums) {
    const i = Math.abs(x) - 1;
    if (nums[i] > 0) nums[i] = -nums[i]; // Hinglish: yahan aaye the
  }
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) out.push(i + 1); // Hinglish: positive matlab missing
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
      body: `Upar wala hi pattern — jo jagah dobara negative karni pade wahi duplicate hai.

[Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/)

\`\`\`js
// Hinglish: dobara nishan = duplicate — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-all-duplicates-in-an-array/
function findDuplicates(nums) {
  // Hinglish: step 1 — nishan lagao
  const out = [];
  for (const x of nums) {
    const i = Math.abs(x) - 1;
    if (nums[i] < 0) out.push(i + 1); // Hinglish: pehle se negative = duplicate
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
      body: `Duplicate dhoondo (upar wala trick), missing nikalo sum se — total minus actual sum.

[Set Mismatch](https://leetcode.com/problems/set-mismatch/)

\`\`\`js
// Hinglish: duplicate + missing — ek-ek step comment dekho
// LC: https://leetcode.com/problems/set-mismatch/
function findErrorNums(nums) {
  // Hinglish: step 1 — duplicate dhoondo
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
  return [dup, expected - (actual - dup)]; // Hinglish: missing nikalo
}
\`\`\``,
    },
    {
      id: 75,
      lcSlug: "sort-colors",
      title: "Sort Colors",
      diff: "Medium",
      body: `0,1,2 ko ek pass me sort karo. Low, mid, high pointer.

[Sort Colors](https://leetcode.com/problems/sort-colors/)

\`\`\`js
// Hinglish: sort karke merge — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sort-colors/
function sortColors(nums) {
  // Hinglish: 0 left, 2 right
  let lo=0, mid=0, hi=nums.length-1;
  while (mid <= hi) {
    if (nums[mid]===0) [nums[lo++], nums[mid++]] = [nums[mid], nums[lo]]; // Hinglish: 0 ko aage bhejo
    else if (nums[mid]===1) mid++; // Hinglish: 1 to sahi jagah
    else [nums[mid], nums[hi--]] = [nums[hi], nums[mid]]; // Hinglish: 2 ko piche bhejo
  }
}
\`\`\``,
    },
    {
      id: 54,
      lcSlug: "spiral-matrix",
      title: "Spiral Matrix",
      diff: "Medium",
      body: `Boundaries rakho (top/bottom/left/right), ek-ek layer nikalo, har side ke baad shrink karo.

[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

\`\`\`js
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/spiral-matrix/
function spiralOrder(matrix) {
  // Hinglish: step 1 — boundaries lo
  const out = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]); // Hinglish: upar row
    top++;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]); // Hinglish: right col
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(matrix[bottom][c]); // Hinglish: neeche row
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(matrix[r][left]); // Hinglish: left col
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
      body: `Transpose karo (r,c) ↔ (c,r), phir har row reverse. In-place, extra space nahi.

[Rotate Image](https://leetcode.com/problems/rotate-image/)

\`\`\`js
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/rotate-image/
function rotate(matrix) {
  // Hinglish: step 1 — transpose karo
  const n = matrix.length;
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]]; // Hinglish: adla-badli
    }
  }
  for (const row of matrix) row.reverse(); // Hinglish: har row ulta
}
\`\`\``,
    },
    {
      id: 73,
      lcSlug: "set-matrix-zeroes",
      title: "Set Matrix Zeroes",
      diff: "Medium",
      body: `Jis cell me 0 ho, uski poori row+col zero karo. O(1) space ke liye pehli row/col me nishan lagao.

[Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

\`\`\`js
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/set-matrix-zeroes/
function setZeroes(matrix) {
  // Hinglish: step 1 — rows/cols lo
  const rows = matrix.length, cols = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRowZero = true;
  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColZero = true;
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; } // Hinglish: nishan lagao
    }
  }
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0; // Hinglish: nishan to zero
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
      body: `In-place states encode karo — 2 matlab zinda tha marega, -1 matlab mara tha jeeyega. Padosi ginte time abs lo.

[Game of Life](https://leetcode.com/problems/game-of-life/)

\`\`\`js
// Hinglish: state encode karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/game-of-life/
function gameOfLife(board) {
  // Hinglish: step 1 — padosi gino
  const rows = board.length, cols = board[0].length;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const live = (r, c) => {
    let n = 0;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (Math.abs(board[nr][nc]) === 1) n++; // Hinglish: purani haalat dekho
    }
    return n;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = live(r, c);
      if (board[r][c] === 1 && (n < 2 || n > 3)) board[r][c] = 2; // Hinglish: marega
      if (board[r][c] === 0 && n === 3) board[r][c] = -1; // Hinglish: jeeyega
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
