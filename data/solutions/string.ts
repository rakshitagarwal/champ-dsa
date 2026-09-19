import type { SolutionGroup } from "./types";

export const STRING_SOLUTIONS: SolutionGroup = {
  id: "string",
  title: "String",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "valid-palindrome",
      title: "Valid Palindrome",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Jc036bXmch4&ab_channel=AlgoJS",
      body: `Dono siron se aao, alphanumeric nahi to skip, case ignore karke compare.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

\`\`\`js
// Hinglish: string scan — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-palindrome/
function isPalindrome(s) {
  // Hinglish: step 1 — dono pointer lo
  const isAlphaNum = (c) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++; // Hinglish: kachra skip
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false; // Hinglish: mismatch
    l++; r--;
  }
  return true;
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "valid-anagram",
      title: "Valid Anagram",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=_ZBkBn57JJI&t=3s&ab_channel=AlgoJS",
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
      id: 2,
      lcSlug: "robot-return-to-origin",
      title: "Robot Return to Origin",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=SYDBzahNWxk&ab_channel=AlgoJS",
      body: `U/D aur L/R gin lo — barabar hon to wapas origin pe ho.

[Robot Return to Origin](https://leetcode.com/problems/robot-return-to-origin/)

\`\`\`js
// Hinglish: disha gin lo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/robot-return-to-origin/
function judgeCircle(moves) {
  // Hinglish: step 1 — counters lo
  let x = 0, y = 0;
  for (const ch of moves) {
    if (ch === "U") y++;
    else if (ch === "D") y--; // Hinglish: upar-neeche
    else if (ch === "L") x--;
    else x++; // Hinglish: left-right
  }
  return x === 0 && y === 0; // Hinglish: dono zero to wapas
}
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "length-of-last-word",
      title: "Length of Last Word",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=9IWSGkJJF24&ab_channel=AlgoJS",
      body: `Peeche se chalo — space skip karo, phir word gino, space mile to ruko.

[Length of Last Word](https://leetcode.com/problems/length-of-last-word/)

\`\`\`js
// Hinglish: peeche se gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/length-of-last-word/
function lengthOfLastWord(s) {
  // Hinglish: step 1 — aakhir se chalo
  let i = s.length - 1;
  while (i >= 0 && s[i] === " ") i--; // Hinglish: peeche ke space hatao
  let len = 0;
  while (i >= 0 && s[i] !== " ") { len++; i--; } // Hinglish: word gino
  return len;
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "group-anagrams",
      title: "Group Anagrams",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=WalLC8nlrPk&ab_channel=AlgoJS",
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
      id: 5,
      lcSlug: "longest-palindromic-substring",
      title: "Longest Palindromic Substring",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=hrtX0P2Q0Mo&ab_channel=AlgoJS",
      body: `Har center (odd + even) se expand karo, sabse lamba rakho. \`O(n²)\` time, \`O(1)\` space.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

\`\`\`js
// Hinglish: string scan — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-palindromic-substring/
function longestPalindrome(s) {
  // Hinglish: step 1 — expand helper
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return [l + 1, r - l - 1]; // Hinglish: start + length
  };
  let start = 0, len = 0;
  for (let i = 0; i < s.length; i++) {
    for (const [st, ln] of [expand(i, i), expand(i, i + 1)]) { // Hinglish: odd + even
      if (ln > len) { start = st; len = ln; } // Hinglish: lamba mila
    }
  }
  return s.slice(start, start + len);
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "palindromic-substrings",
      title: "Palindromic Substrings",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=l0rJqiFTVIY&ab_channel=AlgoJS",
      body: `Har center (odd + even) se expand karo, match mile to count badhao.

[Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

\`\`\`js
// Hinglish: expand karke gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/palindromic-substrings/
function countSubstrings(s) {
  // Hinglish: step 1 — counter lo
  let ans = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { ans++; l--; r++; } // Hinglish: mila to gino
  };
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); } // Hinglish: odd + even
  return ans;
}
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "encode-and-decode-strings",
      title: "Encode and Decode Strings",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=nn15nIlVNbs&ab_channel=AlgoJS",
      body: `Length prefix lagao (len#str) — delimiter kabhi confuse nahi hota, # andar bhi ho to chalega.

[Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: lambai likh ke jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/encode-and-decode-strings/ (Premium)
function encode(strs) {
  // Hinglish: step 1 — len#str jodo
  let out = "";
  for (const s of strs) out += s.length + "#" + s;
  return out;
}
function decode(s) {
  // Hinglish: step 1 — len padho, utna kaato
  const out = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== "#") j++;
    const len = Number(s.slice(i, j));
    out.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=i1edO6FkGm0&t=326s&ab_channel=AlgoJS",
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
      id: 9,
      lcSlug: "longest-repeating-character-replacement",
      title: "Longest Repeated Character Replacement",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=yoEC3ZjYiko&ab_channel=AlgoJS",
      body: `Window me sabse zyada frequent char \`maxF\`, window size - maxF <= k to valid. Nahi to left shrink karo.

[Longest Repeated Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)

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
      id: 10,
      lcSlug: "word-break",
      title: "Word Break",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=UY0VxSzpuN0&t=391s&ab_channel=AlgoJS",
      body: `\`dp[i]\` = true if \`s.slice(0, i)\` can be split into dictionary words. Try every break j.

[Word Break](https://leetcode.com/problems/word-break/)

\`\`\`js
// Hinglish: dp state bharo — ek-ek step comment dekho
// DP — prefix can be segmented
// LC: https://leetcode.com/problems/word-break/
function wordBreak(s, wordDict) {
  // Hinglish: step 1 — base case check karo
  const dict = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "string-to-integer-atoi",
      title: "String To Integer (atoi)",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=e1D2r_SpP9M&ab_channel=AlgoJS",
      body: `Space hatao, sign dekho, digits jodo — limit cross ho to clamp karo. Steps tartib se karo.

[String To Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

\`\`\`js
// Hinglish: tartib se padho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/string-to-integer-atoi/
function myAtoi(s) {
  // Hinglish: step 1 — space hatao
  let i = 0;
  while (i < s.length && s[i] === " ") i++;
  let sign = 1;
  if (s[i] === "+" || s[i] === "-") { sign = s[i] === "-" ? -1 : 1; i++; } // Hinglish: sign dekho
  let num = 0;
  const LIM = 2147483648;
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    num = num * 10 + Number(s[i]); // Hinglish: jodte jao
    if (sign * num <= -LIM) return -LIM; // Hinglish: neeche clamp
    if (sign * num >= LIM - 1 && sign === 1) return LIM - 1; // Hinglish: upar clamp
    i++;
  }
  return sign * num;
}
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "break-a-palindrome",
      title: "Break A Palindrome",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=6hih7JUiwRo&ab_channel=AlgoJS",
      body: `Sabse pehle non-'a' ko 'a' banao — sab 'a' hon to aakhri ko 'b' banao. Length 1 ho to khaali do.

[Break A Palindrome](https://leetcode.com/problems/break-a-palindrome/)

\`\`\`js
// Hinglish: pehla badlo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/break-a-palindrome/
function breakPalindrome(palindrome) {
  // Hinglish: step 1 — chhota check karo
  if (palindrome.length === 1) return "";
  const a = [...palindrome];
  for (let i = 0; i < Math.floor(a.length / 2); i++) {
    if (a[i] !== "a") { a[i] = "a"; return a.join(""); } // Hinglish: pehla non-a badlo
  }
  a[a.length - 1] = "b"; // Hinglish: sab a hain to aakhri badlo
  return a.join("");
}
\`\`\``,
    },
    {
      id: 13,
      lcSlug: "find-the-index-of-the-first-occurrence-in-a-string",
      title: "Find the Index of First Occurrence in a String",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=vw1ITfb8DjQ&ab_channel=AlgoJS",
      body: `Seedha check karo har position se — KMP tez hai par interview me simple loop chalega.

[Find the Index of First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)

\`\`\`js
// Hinglish: har jagah try karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
function strStr(haystack, needle) {
  // Hinglish: step 1 — lambai lo
  const n = haystack.length, m = needle.length;
  for (let i = 0; i + m <= n; i++) {
    let ok = true;
    for (let j = 0; j < m; j++) {
      if (haystack[i + j] !== needle[j]) { ok = false; break; } // Hinglish: mismatch
    }
    if (ok) return i; // Hinglish: mil gaya
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 14,
      lcSlug: "minimum-window-substring",
      title: "Minimum Window Substring",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=z9e-tGD7Z8g&ab_channel=AlgoJS",
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
      id: 15,
      lcSlug: "word-ladder",
      title: "Word Ladder",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=-wfwmzznzHQ&t=5s&ab_channel=AlgoJS",
      body: `Each word is a node. Neighbors = same length, one letter off. BFS from beginWord. First time I hit endWord, that distance is the answer. (Build a map of \`*ot\` patterns so I do not compare every pair.)

[Word Ladder](https://leetcode.com/problems/word-ladder/)

\`\`\`js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph BFS — one letter at a time
// LC: https://leetcode.com/problems/word-ladder/
function ladderLength(beginWord, endWord, wordList) {
  const set = new Set(wordList);
  if (!set.has(endWord)) return 0;
  const q = [[beginWord, 1]];
  const seen = new Set([beginWord]);
  while (q.length) {
    const [word, d] = q.shift();
    if (word === endWord) return d;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (!set.has(next) || seen.has(next)) continue;
        seen.add(next); // Hinglish: visit mark
        q.push([next, d + 1]);
      }
    }
  }
  return 0;
}
\`\`\``,
    },
      ],
    },
  ],
};
