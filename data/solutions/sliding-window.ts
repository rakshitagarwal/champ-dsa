import type { SolutionGroup } from "./types";

export const SLIDING_WINDOW_SOLUTIONS: SolutionGroup = {
  id: "sliding-window",
  title: "Sliding Window",
  subs: [
    {
      title: "Fixed Window",
      topics: [
    {
      id: 643,
      lcSlug: "maximum-average-subarray-i",
      title: "Maximum Average Subarray I",
      diff: "Easy",
      body: `Fixed window of size \`k\` — track the maximum sum (or average) over every consecutive k-element slice.

[Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)

\`\`\`js
// Fixed window size k — slide by add right, subtract left
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i]; // seed first window
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k]; // slide one step
    best = Math.max(best, sum);
  }
  return best / k;
}
\`\`\``,
    },
    {
      id: 1456,
      lcSlug: "maximum-number-of-vowels-in-a-substring-of-given-length",
      title: "Maximum Number of Vowels in a Substring of Given Length",
      diff: "Medium",
      body: `Count vowels in a fixed window: add the right char, drop the left, track the maximum.

[Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

\`\`\`js
// Count vowels in window of length k
function maxVowels(s, k) {
  const vowels = new Set(["a","e","i","o","u"]);
  let cnt = 0;
  for (let i = 0; i < k; i++) if (vowels.has(s[i])) cnt++;
  let best = cnt;
  for (let i = k; i < s.length; i++) {
    if (vowels.has(s[i])) cnt++; // enter window
    if (vowels.has(s[i - k])) cnt--; // leave window
    if (cnt > best) best = cnt;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 438,
      lcSlug: "find-all-anagrams-in-a-string",
      title: "Find All Anagrams in a String",
      diff: "Medium",
      body: `Fix window size to \`|p|\`, compare letter frequencies, and record start indices when they match.

[Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

\`\`\`js
// Window freq matches p when all 26 counts equal
function findAnagrams(s, p) {
  if (p.length > s.length) return [];
  const need = Array(26).fill(0), win = Array(26).fill(0);
  for (const ch of p) need[ch.charCodeAt(0) - 97]++;
  const out = [];
  for (let i = 0; i < s.length; i++) {
    win[s.charCodeAt(i) - 97]++; // expand
    if (i >= p.length) win[s.charCodeAt(i - p.length) - 97]--; // shrink
    let ok = true;
    for (let j = 0; j < 26; j++) if (win[j] !== need[j]) { ok = false; break; }
    if (ok) out.push(i - p.length + 1); // window start
  }
  return out;
}
\`\`\``,
    },
    {
      id: 567,
      lcSlug: "permutation-in-string",
      title: "Permutation in String",
      diff: "Medium",
      body: `Check whether any length-\`|s1|\` window of \`s2\` is an anagram of \`s1\` via sliding window and frequency counts.

[Permutation in String](https://leetcode.com/problems/permutation-in-string/)

\`\`\`js
// Same as anagram check on sliding window |s1|
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = Array(26).fill(0), win = Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    need[s1.charCodeAt(i) - 97]++;
    win[s2.charCodeAt(i) - 97]++;
  }
  const same = () => need.every((v, i) => v === win[i]);
  if (same()) return true;
  for (let i = s1.length; i < s2.length; i++) {
    win[s2.charCodeAt(i) - 97]++;
    win[s2.charCodeAt(i - s1.length) - 97]--;
    if (same()) return true;
  }
  return false;
}
\`\`\``,
    },
    {
      id: 1052,
      lcSlug: "grumpy-bookstore-owner",
      title: "Grumpy Bookstore Owner",
      diff: "Medium",
      body: `Sum satisfied customers when not grumpy, then find the best fixed-size window of extra grumpy-minute customers.

[Grumpy Bookstore Owner](https://leetcode.com/problems/grumpy-bookstore-owner/)

\`\`\`js
// Base = happy minutes; window = extra from grumpy minutes
function maxSatisfied(customers, grumpy, minutes) {
  let base = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) base += customers[i];
  }
  let extra = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) extra += customers[i];
  }
  let best = extra;
  for (let i = minutes; i < customers.length; i++) {
    if (grumpy[i] === 1) extra += customers[i];
    if (grumpy[i - minutes] === 1) extra -= customers[i - minutes];
    if (extra > best) best = extra;
  }
  return base + best;
}
\`\`\``,
    },
    {
      id: 1343,
      lcSlug: "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold",
      title: "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold",
      diff: "Medium",
      body: `Avoid floating averages: a window qualifies iff its sum is at least \`threshold * k\`.

[Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/)

\`\`\`js
// Compare sum to threshold*k (avoid floats)
function numOfSubarrays(arr, k, threshold) {
  const need = threshold * k;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let ans = sum >= need ? 1 : 0;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    if (sum >= need) ans++;
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Variable Window",
      topics: [
    {
      id: 3,
      lcSlug: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      diff: "Medium",
      body: `Expand the window; on a repeat, move the left bound past the previous occurrence using a last-index map.

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

\`\`\`js
// last index map — jump left past duplicate
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    if (last.has(s[r]) && last.get(s[r]) >= l) {
      l = last.get(s[r]) + 1; // shrink past old occurrence
    }
    last.set(s[r], r);
    best = Math.max(best, r - l + 1);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 424,
      lcSlug: "longest-repeating-character-replacement",
      title: "Longest Repeating Character Replacement",
      diff: "Medium",
      body: `Let \`maxF\` be the top frequency in the window. It is valid when \`windowLen - maxF <= k\`; otherwise shrink from the left.

[Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)

\`\`\`js
// Valid when (len - maxFreq) <= k replacements needed
function characterReplacement(s, k) {
  const freq = {};
  let left = 0, maxF = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    freq[ch] = (freq[ch] || 0) + 1;
    maxF = Math.max(maxF, freq[ch]);
    while ((right - left + 1) - maxF > k) {
      freq[s[left]]--;
      left++; // too many replacements
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 76,
      lcSlug: "minimum-window-substring",
      title: "Minimum Window Substring",
      diff: "Hard",
      body: `Grow until \`t\` is fully covered (\`missing === 0\`). Then shrink from the left as long as it stays covered. Remember the smallest slice. If \`t\` never fits, return \`""\`.

[Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

\`\`\`js
// Expand until cover t, shrink while still covered
function minWindow(s, t) {
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = need.size, left = 0, best = "";
  for (let right = 0; right < s.length; right++) {
    const r = s[right];
    if (need.has(r)) {
      need.set(r, need.get(r) - 1);
      if (need.get(r) === 0) missing--; // this char satisfied
    }
    while (missing === 0) {
      if (!best || right - left + 1 < best.length) best = s.slice(left, right + 1);
      const l = s[left];
      if (need.has(l)) {
        need.set(l, need.get(l) + 1);
        if (need.get(l) > 0) missing++; // lost coverage
      }
      left++;
    }
  }
  return best;
}
\`\`\``,
    },
    {
      id: 209,
      lcSlug: "minimum-size-subarray-sum",
      title: "Minimum Size Subarray Sum",
      diff: "Medium",
      body: `Expand until the sum reaches the target, then shrink from the left while keeping the sum valid and track the minimum length.

[Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)

\`\`\`js
// Expand r until sum >= target, then shrink l
function minSubArrayLen(target, nums) {
  let l = 0, sum = 0, best = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      if (r - l + 1 < best) best = r - l + 1;
      sum -= nums[l];
      l++;
    }
  }
  return best === Infinity ? 0 : best;
}
\`\`\``,
    },
    {
      id: 1004,
      lcSlug: "max-consecutive-ones-iii",
      title: "Max Consecutive Ones III",
      diff: "Medium",
      body: `You may flip at most \`k\` zeros. Count zeros in the window and shrink when the budget is exceeded.

[Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)

\`\`\`js
// k = budget of zeros in window
function longestOnes(nums, k) {
  let l = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) k--;
    while (k < 0) {
      if (nums[l] === 0) k++; // refund flip
      l++;
    }
    if (r - l + 1 > best) best = r - l + 1;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 904,
      lcSlug: "fruit-into-baskets",
      title: "Fruit Into Baskets",
      diff: "Medium",
      body: `At most two distinct values: when a third appears, advance the left bound until only two types remain; track last index per type.

[Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/)

\`\`\`js
// At most 2 distinct types — track last index per type
function totalFruit(fruits) {
  const last = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < fruits.length; r++) {
    last.set(fruits[r], r);
    while (last.size > 2) {
      if (last.get(fruits[l]) === l) last.delete(fruits[l]); // type leaves window
      l++;
    }
    if (r - l + 1 > best) best = r - l + 1;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 1695,
      lcSlug: "maximum-erasure-value",
      title: "Maximum Erasure Value",
      diff: "Medium",
      body: `Maximum sum of a subarray with all distinct elements: shrink from the left when a duplicate appears.

[Maximum Erasure Value](https://leetcode.com/problems/maximum-erasure-value/)

\`\`\`js
// Longest unique subarray sum
function maximumUniqueSubarray(nums) {
  const seen = new Set();
  let l = 0, sum = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    while (seen.has(nums[r])) {
      seen.delete(nums[l]);
      sum -= nums[l];
      l++;
    }
    seen.add(nums[r]);
    sum += nums[r];
    if (sum > best) best = sum;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 1493,
      lcSlug: "longest-subarray-of-1s-after-deleting-one-element",
      title: "Longest Subarray of 1's After Deleting One Element",
      diff: "Medium",
      body: `Allow deleting one element: count zeros, shrink when more than one zero, answer is window length minus one deletion.

[Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)

\`\`\`js
// At most one zero removed — answer is window length minus that zero
function longestSubarray(nums) {
  let l = 0, zeroes = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeroes++;
    while (zeroes > 1) {
      if (nums[l] === 0) zeroes--;
      l++;
    }
    if (r - l > best) best = r - l; // one delete implied
  }
  return best;
}
\`\`\``,
    },
    {
      id: 713,
      lcSlug: "subarray-product-less-than-k",
      title: "Subarray Product Less Than K",
      diff: "Medium",
      body: `Sliding product window: divide out the left when the product is too large. Each valid \`r\` adds \`r - l + 1\` subarrays.

[Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/)

\`\`\`js
// Each valid window ending at r adds (r-l+1) subarrays
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;
  let l = 0, prod = 1, ans = 0;
  for (let r = 0; r < nums.length; r++) {
    prod *= nums[r];
    while (prod >= k) {
      prod /= nums[l];
      l++;
    }
    ans += r - l + 1;
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 1208,
      lcSlug: "get-equal-substrings-within-budget",
      title: "Get Equal Substrings Within Budget",
      diff: "Medium",
      body: `Build per-index costs \`|s[i] - t[i]|\`, then find the longest window whose total cost is at most \`maxCost\`.

[Get Equal Substrings Within Budget](https://leetcode.com/problems/get-equal-substrings-within-budget/)

\`\`\`js
// Window on per-index change cost
function equalSubstring(s, t, maxCost) {
  const cost = (i) => Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
  let l = 0, spent = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    spent += cost(r);
    while (spent > maxCost) {
      spent -= cost(l);
      l++;
    }
    if (r - l + 1 > best) best = r - l + 1;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 1838,
      lcSlug: "frequency-of-the-most-frequent-element",
      title: "Frequency of the Most Frequent Element",
      diff: "Medium",
      body: `Sort the array, slide a window, and track the cost to raise every element to the window maximum; shrink when cost exceeds \`k\`.

[Frequency of the Most Frequent Element](https://leetcode.com/problems/frequency-of-the-most-frequent-element/)

\`\`\`js
// Sorted window — cost to raise all to nums[r]
function maxFrequency(nums, k) {
  nums.sort((a, b) => a - b);
  let l = 0, spent = 0, best = 1;
  for (let r = 1; r < nums.length; r++) {
    spent += (nums[r] - nums[r - 1]) * (r - l); // incremental cost
    while (spent > k) {
      spent -= nums[r] - nums[l];
      l++;
    }
    if (r - l + 1 > best) best = r - l + 1;
  }
  return best;
}
\`\`\``,
    },
      ],
    },
  ],
};
