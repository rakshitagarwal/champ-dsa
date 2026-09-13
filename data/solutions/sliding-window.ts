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
      body: `Size \`k\` ki window me max sum / k. Fixed sliding window.

[Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)

\`\`\`js
// Hinglish: window slide karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-average-subarray-i/
function findMaxAverage(nums, k) {
  // Hinglish: pehle k ka sum
  let sum=0; for(let i=0;i<k;i++) sum+=nums[i];
  let best=sum;
  for(let i=k;i<nums.length;i++) {
    sum += nums[i] - nums[i-k]; // Hinglish: slide — add naya, hatao purana
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
      body: `Fixed window me vowels gino — aage jodo, peeche hatao, max yaad rakho.

[Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

\`\`\`js
// Hinglish: fixed window gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
function maxVowels(s, k) {
  // Hinglish: step 1 — vowel set lo
  const vowels = new Set(["a","e","i","o","u"]);
  let cnt = 0;
  for (let i = 0; i < k; i++) if (vowels.has(s[i])) cnt++; // Hinglish: pehli window
  let best = cnt;
  for (let i = k; i < s.length; i++) {
    if (vowels.has(s[i])) cnt++; // Hinglish: naya jodo
    if (vowels.has(s[i - k])) cnt--; // Hinglish: purana hatao
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
      body: `Window size p fix karo, freq compare karo — match mile to index jodo.

[Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

\`\`\`js
// Hinglish: window freq match — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-all-anagrams-in-a-string/
function findAnagrams(s, p) {
  // Hinglish: step 1 — need gino
  if (p.length > s.length) return [];
  const need = Array(26).fill(0), win = Array(26).fill(0);
  for (const ch of p) need[ch.charCodeAt(0) - 97]++;
  const out = [];
  for (let i = 0; i < s.length; i++) {
    win[s.charCodeAt(i) - 97]++; // Hinglish: jodo
    if (i >= p.length) win[s.charCodeAt(i - p.length) - 97]--; // Hinglish: hatao
    let ok = true;
    for (let j = 0; j < 26; j++) if (win[j] !== need[j]) { ok = false; break; }
    if (ok) out.push(i - p.length + 1); // Hinglish: anagram mila
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
      body: `\`s1\` ka permutation \`s2\` me hai kya? Sliding window + frequency compare.

[Permutation in String](https://leetcode.com/problems/permutation-in-string/)

\`\`\`js
// Hinglish: window slide karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/permutation-in-string/
function checkInclusion(s1, s2) {
  // Hinglish: s1 ka freq
  if (s1.length > s2.length) return false;
  const need=Array(26).fill(0), win=Array(26).fill(0);
  for (let i=0;i<s1.length;i++) { need[s1.charCodeAt(i)-97]++; win[s2.charCodeAt(i)-97]++; }
  const same=()=> need.every((v,i)=>v===win[i]);
  if (same()) return true;
  for (let i=s1.length;i<s2.length;i++) {
    win[s2.charCodeAt(i)-97]++; // Hinglish: naya add
    win[s2.charCodeAt(i-s1.length)-97]--; // Hinglish: purana hatao
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
      body: `Grumpy minutes ka best window dhoondo (fixed size), usko base satisfied me jod do.

[Grumpy Bookstore Owner](https://leetcode.com/problems/grumpy-bookstore-owner/)

\`\`\`js
// Hinglish: best window dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/grumpy-bookstore-owner/
function maxSatisfied(customers, grumpy, minutes) {
  // Hinglish: step 1 — bina technique wale jodo
  let base = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) base += customers[i];
  }
  let extra = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) extra += customers[i]; // Hinglish: pehli window
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
      body: `Sum compare karne ke liye average mat nikalo — threshold*k se seedha compare karo.

[Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/)

\`\`\`js
// Hinglish: sum se kaam chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
function numOfSubarrays(arr, k, threshold) {
  // Hinglish: step 1 — pehli window ka sum
  const need = threshold * k;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let ans = sum >= need ? 1 : 0;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k]; // Hinglish: slide karo
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
      body: `Window badhao, repeat aaye to left se hatao. Map me last index rakho taaki left seedha jump kare.

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

\`\`\`js
// Hinglish: string scan — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-substring-without-repeating-characters/
function lengthOfLongestSubstring(s) {
  // Hinglish: step 1 — window + map lo
  const last = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    if (last.has(s[r]) && last.get(s[r]) >= l) {
      l = last.get(s[r]) + 1; // Hinglish: repeat hatao, jump karo
    }
    last.set(s[r], r);
    best = Math.max(best, r - l + 1); // Hinglish: best update
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
      body: `Window me sabse zyada frequent char \`maxF\`, window size - maxF <= k to valid. Nahi to left shrink karo.

[Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)

\`\`\`js
// Hinglish: window slide karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-repeating-character-replacement/
function characterReplacement(s, k) {
  // Hinglish: freq map + max count
  const freq={}; let left=0, maxF=0, best=0;
  for (let right=0; right<s.length; right++) {
    const ch=s[right];
    freq[ch]=(freq[ch]||0)+1;
    maxF = Math.max(maxF, freq[ch]); // Hinglish: ab tak ka max freq
    while ((right-left+1) - maxF > k) { // Hinglish: zyada replacement lage to shrink
      freq[s[left]]--; left++;
    }
    best = Math.max(best, right-left+1);
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
// Hinglish: window slide karo — ek-ek step comment dekho
// Sliding window — smallest that still covers t
// LC: https://leetcode.com/problems/minimum-window-substring/
function minWindow(s, t) {
  // Hinglish: step 1 — base case check karo
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = need.size, left = 0, best = "";
  for (let right = 0; right < s.length; right++) {
    const r = s[right];
    if (need.has(r)) {
      need.set(r, need.get(r) - 1);
      if (need.get(r) === 0) missing--;
    }
    while (missing === 0) {
      if (!best || right - left + 1 < best.length) best = s.slice(left, right + 1);
      const l = s[left];
      if (need.has(l)) {
        need.set(l, need.get(l) + 1);
        if (need.get(l) > 0) missing++;
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
      body: `Window badhao jab tak sum kam hai, target pe pahuche to shrink karke min rakho.

[Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)

\`\`\`js
// Hinglish: badhao-shrink karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-size-subarray-sum/
function minSubArrayLen(target, nums) {
  // Hinglish: step 1 — window lo
  let l = 0, sum = 0, best = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r]; // Hinglish: badhao
    while (sum >= target) {
      if (r - l + 1 < best) best = r - l + 1; // Hinglish: min yaad rakho
      sum -= nums[l]; l++; // Hinglish: shrink karo
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
      body: `K zeroes flip kar sakte ho — window me zeroes gino, k se zyada hon to left badhao.

[Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)

\`\`\`js
// Hinglish: zero budget — ek-ek step comment dekho
// LC: https://leetcode.com/problems/max-consecutive-ones-iii/
function longestOnes(nums, k) {
  // Hinglish: step 1 — window lo
  let l = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) k--; // Hinglish: ek flip kharch
    while (k < 0) {
      if (nums[l] === 0) k++; // Hinglish: wapas jama
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
      body: `Sirf 2 types allowed — teesri aaye to left se hatao jab tak 2 na bachein. Map me last index rakho.

[Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/)

\`\`\`js
// Hinglish: 2 type ki limit — ek-ek step comment dekho
// LC: https://leetcode.com/problems/fruit-into-baskets/
function totalFruit(fruits) {
  // Hinglish: step 1 — type map lo
  const last = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < fruits.length; r++) {
    last.set(fruits[r], r); // Hinglish: aakhri jagah yaad rakho
    while (last.size > 2) {
      if (last.get(fruits[l]) === l) last.delete(fruits[l]); // Hinglish: purani type nikalo
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
      body: `Unique subarray ka max sum — repeat aaye to left ko repeat tak le jao, sum saath update rakho.

[Maximum Erasure Value](https://leetcode.com/problems/maximum-erasure-value/)

\`\`\`js
// Hinglish: unique sum window — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-erasure-value/
function maximumUniqueSubarray(nums) {
  // Hinglish: step 1 — set + sum lo
  const seen = new Set();
  let l = 0, sum = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    while (seen.has(nums[r])) { seen.delete(nums[l]); sum -= nums[l]; l++; } // Hinglish: repeat hatao
    seen.add(nums[r]); sum += nums[r];
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
      body: `Ek delete ki chhoot — zeroes gino, 2 hue to left badhao. Answer window-1 hai.

[Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)

\`\`\`js
// Hinglish: ek delete window — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
function longestSubarray(nums) {
  // Hinglish: step 1 — window lo
  let l = 0, zeroes = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeroes++;
    while (zeroes > 1) {
      if (nums[l] === 0) zeroes--;
      l++;
    }
    if (r - l > best) best = r - l; // Hinglish: ek delete hoga
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
      body: `Product window — bada ho to left se divide karo. Har r pe r-l+1 naye subarrays bante hain.

[Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/)

\`\`\`js
// Hinglish: product window — ek-ek step comment dekho
// LC: https://leetcode.com/problems/subarray-product-less-than-k/
function numSubarrayProductLessThanK(nums, k) {
  // Hinglish: step 1 — k<=1 to zero
  if (k <= 1) return 0;
  let l = 0, prod = 1, ans = 0;
  for (let r = 0; r < nums.length; r++) {
    prod *= nums[r]; // Hinglish: jodo
    while (prod >= k) { prod /= nums[l]; l++; } // Hinglish: chhota karo
    ans += r - l + 1; // Hinglish: r pe khatm hone wale sab valid
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
      body: `Cost array banao (|s-t|), phir maxCost budget wali longest window nikalo.

[Get Equal Substrings Within Budget](https://leetcode.com/problems/get-equal-substrings-within-budget/)

\`\`\`js
// Hinglish: cost window — ek-ek step comment dekho
// LC: https://leetcode.com/problems/get-equal-substrings-within-budget/
function equalSubstring(s, t, maxCost) {
  // Hinglish: step 1 — window lo
  const cost = (i) => Math.abs(s.charCodeAt(i) - t.charCodeAt(i)); // Hinglish: badlav ki keemat
  let l = 0, spent = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    spent += cost(r);
    while (spent > maxCost) { spent -= cost(l); l++; } // Hinglish: budget se bahar to shrink
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
      body: `Sort karke window badhao — sabko max banane ki cost nikalo, k se zyada ho to left badhao.

[Frequency of the Most Frequent Element](https://leetcode.com/problems/frequency-of-the-most-frequent-element/)

\`\`\`js
// Hinglish: sort + cost window — ek-ek step comment dekho
// LC: https://leetcode.com/problems/frequency-of-the-most-frequent-element/
function maxFrequency(nums, k) {
  // Hinglish: step 1 — sort karo
  nums.sort((a, b) => a - b);
  let l = 0, spent = 0, best = 1;
  for (let r = 1; r < nums.length; r++) {
    spent += (nums[r] - nums[r - 1]) * (r - l); // Hinglish: sabko r jitna banao
    while (spent > k) { spent -= nums[r] - nums[l]; l++; } // Hinglish: budget khatm to shrink
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
