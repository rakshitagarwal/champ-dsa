import type { SolutionGroup } from "../solutions/types";

export const HASHING_SOLUTIONS: SolutionGroup = {
  id: "hashing",
  title: "Hashing / Hash Maps",
  subs: [
    {
      title: "Foundation",
      topics: [
        {
          id: 217,
          lcSlug: "contains-duplicate",
          title: "Contains Duplicate",
          diff: "Easy",
          body: `"Pehle dekha hai kya?" — yahi HashSet ka sabse seedha use case.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

\`\`\`js
// Time: O(n) · Space: O(n)
var containsDuplicate = function (nums) {
  const seen = new Set();

  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }

  return false;
};
\`\`\``,
        },
        {
          id: 242,
          lcSlug: "valid-anagram",
          title: "Valid Anagram",
          diff: "Easy",
          body: `Do alag maps ki zaroorat nahi — ek hi count array me s ke liye ++ aur t ke liye --. Sab zero to anagram.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

\`\`\`js
// Time: O(n) · Space: O(1)
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const A = "a".charCodeAt(0);
  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - A]++;
    count[t.charCodeAt(i) - A]--;
  }

  return count.every((c) => c === 0);
};
\`\`\``,
        },
        {
          id: 1,
          lcSlug: "two-sum",
          title: "Two Sum",
          diff: "Easy",
          body: `Har number pe poochho "mujhe kiski zaroorat hai?" aur map me dhoondho. Ek pass me ho jata hai.

[Two Sum](https://leetcode.com/problems/two-sum/)

\`\`\`js
// Time: O(n) · Space: O(n)
var twoSum = function (nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) return [seen.get(need), i];

    seen.set(nums[i], i);
  }

  return [];
};
\`\`\``,
        },
      ],
    },
    {
      title: "Medium",
      topics: [
        {
          id: 49,
          lcSlug: "group-anagrams",
          title: "Group Anagrams",
          diff: "Medium",
          body: `Anagrams ka ek hi "signature" hota hai. Sort karne ki jagah 26-length count array ko key bana lo — O(n * k).

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

\`\`\`js
// Time: O(n * k) · Space: O(n * k)
var groupAnagrams = function (strs) {
  const groups = new Map();
  const A = "a".charCodeAt(0);

  for (const s of strs) {
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) count[s.charCodeAt(i) - A]++;

    const key = count.join("#");

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }

  return [...groups.values()];
};
\`\`\``,
        },
        {
          id: 347,
          lcSlug: "top-k-frequent-elements",
          title: "Top K Frequent Elements",
          diff: "Medium",
          body: `Bucket sort — frequency 1..n ke beech hi hogi, to frequency ko index bana lo. Pure O(n), heap se bhi tez. (Heap version Heap topic me hai.)

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

\`\`\`js
// Time: O(n) · Space: O(n)
var topKFrequent = function (nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  // buckets[c] = woh numbers jo exactly c baar aaye
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);

  const res = [];

  for (let c = buckets.length - 1; c >= 1 && res.length < k; c--) {
    for (const num of buckets[c]) {
      res.push(num);
      if (res.length === k) break;
    }
  }

  return res;
};
\`\`\``,
        },
        {
          id: 128,
          lcSlug: "longest-consecutive-sequence",
          title: "Longest Consecutive Sequence",
          diff: "Medium",
          body: `Set bana lo, phir sirf un numbers se count shuru karo jinka n-1 set me nahi hai. Har number max ek baar visit hota hai.

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

\`\`\`js
// Time: O(n) · Space: O(n)
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let best = 0;

  for (const n of set) {
    if (set.has(n - 1)) continue; // yeh start nahi hai, skip

    let len = 1;
    while (set.has(n + len)) len++;

    best = Math.max(best, len);
  }

  return best;
};
\`\`\``,
        },
      ],
    },
    {
      title: "Advanced",
      topics: [
        {
          id: 560,
          lcSlug: "subarray-sum-equals-k",
          title: "Subarray Sum Equals K",
          diff: "Medium",
          body: `Running sum rakho aur map me har prefix sum ka count. Har step pe poochho "kitni baar (sum - k) dekha hai?"

[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

\`\`\`js
// Time: O(n) · Space: O(n)
var subarraySum = function (nums, k) {
  const seen = new Map([[0, 1]]); // khaali prefix ek baar count hota hai

  let sum = 0;
  let count = 0;

  for (const n of nums) {
    sum += n;

    count += seen.get(sum - k) || 0;

    seen.set(sum, (seen.get(sum) || 0) + 1);
  }

  return count;
};
\`\`\``,
        },
        {
          id: 3,
          lcSlug: "longest-substring-without-repeating-characters",
          title: "Longest Substring Without Repeating Characters",
          diff: "Medium",
          body: `Har char ka last index map me rakho — duplicate mile to left ko ek hi jump me aage bhej do, one-by-one nahi. (Set version Sliding Window topic me hai.)

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

\`\`\`js
// Time: O(n) · Space: O(charset)
var lengthOfLongestSubstring = function (s) {
  const lastIndex = new Map();

  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // sirf tab jump karo jab duplicate current window ke andar ho
    if (lastIndex.has(c) && lastIndex.get(c) >= left) {
      left = lastIndex.get(c) + 1;
    }

    lastIndex.set(c, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
};
\`\`\``,
        },
      ],
    },
  ],
};
