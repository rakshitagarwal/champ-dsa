import type { SolutionGroup } from "./types";

export const STRINGS_SOLUTIONS: SolutionGroup = {
  id: "strings",
  title: "Strings",
  subs: [
    {
      title: "Palindromes / String Processing",
      topics: [
    {
      id: 5,
      lcSlug: "longest-palindromic-substring",
      title: "Longest Palindromic Substring",
      diff: "Medium",
      body: `Expand around each odd and even center and keep the longest palindrome. \`O(n²)\` time, \`O(1)\` space.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

\`\`\`js
// LC: https://leetcode.com/problems/longest-palindromic-substring/
function longestPalindrome(s) {
  // Expand while chars match; return start index and length
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return [l + 1, r - l - 1];
  };
  let start = 0, len = 0;
  for (let i = 0; i < s.length; i++) {
    // Try odd-length (i,i) and even-length (i,i+1) centers
    for (const [st, ln] of [expand(i, i), expand(i, i + 1)]) {
      if (ln > len) { start = st; len = ln; }
    }
  }
  return s.slice(start, start + len);
}
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "palindrome-number",
      title: "Palindrome Number",
      diff: "Easy",
      body: `Reverse only the second half of the digits; when the original half is gone, you have a palindrome. No overflow risk.

[Palindrome Number](https://leetcode.com/problems/palindrome-number/)

\`\`\`js
// LC: https://leetcode.com/problems/palindrome-number/
function isPalindrome(x) {
  // Negatives and numbers ending in 0 (except 0) cannot be palindromes
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let rev = 0;
  // Build reversed half; stop when x <= rev
  while (x > rev) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  // Even digits: x === rev; odd digits: middle digit dropped in rev
  return x === rev || x === Math.floor(rev / 10);
}
\`\`\``,
    },
    {
      id: 647,
      lcSlug: "palindromic-substrings",
      title: "Palindromic Substrings",
      diff: "Medium",
      body: `Expand from each odd and even center and increment the count for every palindrome found.

[Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

\`\`\`js
// LC: https://leetcode.com/problems/palindromic-substrings/
function countSubstrings(s) {
  let ans = 0;
  const expand = (l, r) => {
    // Each successful expand step is one palindromic substring
    while (l >= 0 && r < s.length && s[l] === s[r]) { ans++; l--; r++; }
  };
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return ans;
}
\`\`\``,
    },
    {
      id: 214,
      lcSlug: "shortest-palindrome",
      title: "Shortest Palindrome",
      diff: "Hard",
      body: `Use KMP on \`s + # + reverse(s)\` to find the longest palindromic prefix, then prepend the reverse of the leftover suffix.

[Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)

\`\`\`js
// LC: https://leetcode.com/problems/shortest-palindrome/
function shortestPalindrome(s) {
  // KMP on s + # + reverse(s) finds longest palindromic prefix of s
  const t = s + "#" + [...s].reverse().join("");
  const lps = Array(t.length).fill(0);
  for (let i = 1; i < t.length; i++) {
    let j = lps[i - 1];
    while (j > 0 && t[i] !== t[j]) j = lps[j - 1];
    if (t[i] === t[j]) j++;
    lps[i] = j;
  }
  // Prefix not in palindrome gets reversed and prepended
  const add = [...s.slice(lps[t.length - 1])].reverse().join("");
  return add + s;
}
\`\`\``,
    },
    {
      id: 28,
      lcSlug: "find-the-index-of-the-first-occurrence-in-a-string",
      title: "Find the Index of the First Occurrence in a String",
      diff: "Easy",
      body: `Brute-force every start index; KMP is faster, but the nested loop is fine in interviews.

[Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)

\`\`\`js
// LC: https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
function strStr(haystack, needle) {
  const n = haystack.length, m = needle.length;
  // Try every start index where needle fits
  for (let i = 0; i + m <= n; i++) {
    let ok = true;
    // Character-by-character match at offset i
    for (let j = 0; j < m; j++) {
      if (haystack[i + j] !== needle[j]) { ok = false; break; }
    }
    if (ok) return i;
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 459,
      lcSlug: "repeated-substring-pattern",
      title: "Repeated Substring Pattern",
      diff: "Easy",
      body: `If \`s\` repeats, it appears inside \`s + s\` with the first and last character removed.

[Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)

\`\`\`js
// LC: https://leetcode.com/problems/repeated-substring-pattern/
function repeatedSubstringPattern(s) {
  // s repeats iff s appears inside s+s with first/last char removed
  const t = s + s;
  const inner = t.slice(1, -1);
  return inner.includes(s);
}
\`\`\``,
    },
    {
      id: 686,
      lcSlug: "repeated-string-match",
      title: "Repeated String Match",
      diff: "Medium",
      body: `Repeat \`a\` until length covers \`b\`, then try one extra repeat to handle wrap-around matches.

[Repeated String Match](https://leetcode.com/problems/repeated-string-match/)

\`\`\`js
// LC: https://leetcode.com/problems/repeated-string-match/
function repeatedStringMatch(a, b) {
  let t = "", ans = 0;
  // Repeat a until length >= b (minimum copies needed)
  while (t.length < b.length) { t += a; ans++; }
  if (t.includes(b)) return ans;
  // One extra copy handles wrap-around matches
  t += a;
  if (t.includes(b)) return ans + 1;
  return -1;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Parsing / Transformation",
      topics: [
    {
      id: 14,
      lcSlug: "longest-common-prefix",
      title: "Longest Common Prefix",
      diff: "Easy",
      body: `Start from the first string and shorten the common prefix against each remaining word.

[Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)

\`\`\`js
// LC: https://leetcode.com/problems/longest-common-prefix/
function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let pre = strs[0];
  for (let i = 1; i < strs.length; i++) {
    // Shrink prefix until strs[i] starts with it
    while (!strs[i].startsWith(pre)) pre = pre.slice(0, -1);
    if (!pre) return "";
  }
  return pre;
}
\`\`\``,
    },
    {
      id: 151,
      lcSlug: "reverse-words-in-a-string",
      title: "Reverse Words in a String",
      diff: "Medium",
      body: `Split on spaces, drop empties, reverse the word list, and join with a single space.

[Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)

\`\`\`js
// LC: https://leetcode.com/problems/reverse-words-in-a-string/
function reverseWords(s) {
  // Split on spaces — may produce empty tokens
  const words = s.split(" ").filter((w) => w.length > 0);
  // Reverse word order, single space between
  return words.reverse().join(" ");
}
\`\`\``,
    },
    {
      id: 557,
      lcSlug: "reverse-words-in-a-string-iii",
      title: "Reverse Words in a String III",
      diff: "Easy",
      body: `Reverse the characters inside each word while keeping word order unchanged.

[Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/)

\`\`\`js
// LC: https://leetcode.com/problems/reverse-words-in-a-string-iii/
function reverseWords(s) {
  const words = s.split(" "); // preserve word boundaries
  const rev = words.map((w) => [...w].reverse().join("")); // reverse letters per word
  return rev.join(" "); // same spacing, reversed chars inside each word
}
\`\`\``,
    },
    {
      id: 43,
      lcSlug: "multiply-strings",
      title: "Multiply Strings",
      diff: "Medium",
      body: `Grade-school multiplication: accumulate each digit product at the correct indices and propagate carry.

[Multiply Strings](https://leetcode.com/problems/multiply-strings/)

\`\`\`js
// LC: https://leetcode.com/problems/multiply-strings/
function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  const m = num1.length, n = num2.length;
  // Grade-school multiply: digit i,j affects indices i+j and i+j+1
  const ans = Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = Number(num1[i]) * Number(num2[j]);
      const p = i + j + 1;
      const sum = mul + ans[p];
      ans[p] = sum % 10;
      ans[p - 1] += Math.floor(sum / 10);
    }
  }
  let s = ans.join("");
  let k = 0;
  while (s[k] === "0") k++;
  return s.slice(k);
}
\`\`\``,
    },
    {
      id: 415,
      lcSlug: "add-strings",
      title: "Add Strings",
      diff: "Easy",
      body: `Add from the least significant digit with carry, building the result as a string.

[Add Strings](https://leetcode.com/problems/add-strings/)

\`\`\`js
// LC: https://leetcode.com/problems/add-strings/
function addStrings(num1, num2) {
  let i = num1.length - 1, j = num2.length - 1, carry = 0, out = "";
  while (i >= 0 || j >= 0 || carry) {
    const a = i >= 0 ? Number(num1[i--]) : 0;
    const b = j >= 0 ? Number(num2[j--]) : 0;
    const s = a + b + carry;
    out = String(s % 10) + out;
    carry = Math.floor(s / 10);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "string-to-integer-atoi",
      title: "String to Integer (atoi)",
      diff: "Medium",
      body: `Skip leading spaces, read sign, parse digits, and clamp to 32-bit integer bounds in order.

[String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

\`\`\`js
// LC: https://leetcode.com/problems/string-to-integer-atoi/
function myAtoi(s) {
  let i = 0;
  while (i < s.length && s[i] === " ") i++;
  let sign = 1;
  if (s[i] === "+" || s[i] === "-") { sign = s[i] === "-" ? -1 : 1; i++; }
  let num = 0;
  const LIM = 2147483648;
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    num = num * 10 + Number(s[i]);
    if (sign * num <= -LIM) return -LIM;
    if (sign * num >= LIM - 1 && sign === 1) return LIM - 1;
    i++;
  }
  return sign * num;
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "zigzag-conversion",
      title: "Zigzag Conversion",
      diff: "Medium",
      body: `Simulate zigzag rows: bounce direction at the ends, append each character to its row, then join rows.

[Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/)

\`\`\`js
// LC: https://leetcode.com/problems/zigzag-conversion/
function convert(s, numRows) {
  if (numRows === 1) return s;
  const rows = Array.from({ length: numRows }, () => "");
  let r = 0, dir = 1;
  for (const ch of s) {
    rows[r] += ch;
    if (r === 0) dir = 1;
    if (r === numRows - 1) dir = -1;
    r += dir;
  }
  return rows.join("");
}
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "integer-to-roman",
      title: "Integer to Roman",
      diff: "Medium",
      body: `Greedy subtract from a table of values and symbols, including subtractive pairs like 900 and 400.

[Integer to Roman](https://leetcode.com/problems/integer-to-roman/)

\`\`\`js
// LC: https://leetcode.com/problems/integer-to-roman/
function intToRoman(num) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]; // descending value table
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let out = "";
  for (let i = 0; i < vals.length; i++) {
    // Greedy: take as many of this symbol as num allows
    while (num >= vals[i]) { out += syms[i]; num -= vals[i]; }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 13,
      lcSlug: "roman-to-integer",
      title: "Roman to Integer",
      diff: "Easy",
      body: `Scan left to right: subtract when the next symbol is larger, otherwise add.

[Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

\`\`\`js
// LC: https://leetcode.com/problems/roman-to-integer/
function romanToInt(s) {
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = v[s[i]], next = i + 1 < s.length ? v[s[i + 1]] : 0;
    if (cur < next) ans -= cur; // subtractive pair (e.g. IV, IX)
    else ans += cur; // normal additive symbol
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 38,
      lcSlug: "count-and-say",
      title: "Count and Say",
      diff: "Medium",
      body: `Each line describes the next: run-length encode the previous string (count + digit) and repeat.

[Count and Say](https://leetcode.com/problems/count-and-say/)

\`\`\`js
// LC: https://leetcode.com/problems/count-and-say/
function countAndSay(n) {
  let cur = "1"; // first term in the sequence
  for (let round = 1; round < n; round++) {
    let next = "", i = 0;
    while (i < cur.length) {
      let j = i;
      while (j < cur.length && cur[j] === cur[i]) j++; // run of same digit
      next += String(j - i) + cur[i]; // count + digit
      i = j; // advance to next run
    }
    cur = next; // line becomes input for next round
  }
  return cur;
}
\`\`\``,
    },
      ],
    },
  ],
};
