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
      id: 9,
      lcSlug: "palindrome-number",
      title: "Palindrome Number",
      diff: "Easy",
      body: `Aadha ulta karo — ulta aadha se bada-barabar ho to palindrome hai. Overflow ka dar nahi.

[Palindrome Number](https://leetcode.com/problems/palindrome-number/)

\`\`\`js
// Hinglish: aadha palto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/palindrome-number/
function isPalindrome(x) {
  // Hinglish: step 1 — negative aur zero-end hatao
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let rev = 0;
  while (x > rev) {
    rev = rev * 10 + (x % 10); // Hinglish: peeche jodo
    x = Math.floor(x / 10); // Hinglish: aage ghatao
  }
  return x === rev || x === Math.floor(rev / 10); // Hinglish: odd me beech wala extra
}
\`\`\``,
    },
    {
      id: 647,
      lcSlug: "palindromic-substrings",
      title: "Palindromic Substrings",
      diff: "Medium",
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
      id: 214,
      lcSlug: "shortest-palindrome",
      title: "Shortest Palindrome",
      diff: "Hard",
      body: `Aage jodne ke liye sabse lamba palindromic prefix dhoondo (KMP) — baaki ulta karke aage lagao.

[Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)

\`\`\`js
// Hinglish: lamba prefix dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/shortest-palindrome/
function shortestPalindrome(s) {
  // Hinglish: step 1 — KMP table banao
  const t = s + "#" + [...s].reverse().join("");
  const lps = Array(t.length).fill(0);
  for (let i = 1; i < t.length; i++) {
    let j = lps[i - 1];
    while (j > 0 && t[i] !== t[j]) j = lps[j - 1]; // Hinglish: peeche jao
    if (t[i] === t[j]) j++;
    lps[i] = j;
  }
  const add = [...s.slice(lps[t.length - 1])].reverse().join(""); // Hinglish: bacha ulta karo
  return add + s;
}
\`\`\``,
    },
    {
      id: 28,
      lcSlug: "find-the-index-of-the-first-occurrence-in-a-string",
      title: "Find the Index of the First Occurrence in a String",
      diff: "Easy",
      body: `Seedha check karo har position se — KMP tez hai par interview me simple loop chalega.

[Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)

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
      id: 459,
      lcSlug: "repeated-substring-pattern",
      title: "Repeated Substring Pattern",
      diff: "Easy",
      body: `String ko khud se jod ke beech ka hissa dekho — original mile to repeat hai.

[Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)

\`\`\`js
// Hinglish: jod ke dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/repeated-substring-pattern/
function repeatedSubstringPattern(s) {
  // Hinglish: step 1 — double banao
  const t = s + s;
  const inner = t.slice(1, -1); // Hinglish: pehla-aakhri hatao
  return inner.includes(s); // Hinglish: mila to repeat hai
}
\`\`\``,
    },
    {
      id: 686,
      lcSlug: "repeated-string-match",
      title: "Repeated String Match",
      diff: "Medium",
      body: `A ko itna dohrao ki B sama jaye (+1 extra) — phir includes se check karo.

[Repeated String Match](https://leetcode.com/problems/repeated-string-match/)

\`\`\`js
// Hinglish: dohra ke dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/repeated-string-match/
function repeatedStringMatch(a, b) {
  // Hinglish: step 1 — dohrai hui banao
  let t = "", ans = 0;
  while (t.length < b.length) { t += a; ans++; } // Hinglish: sama jaye tab tak
  if (t.includes(b)) return ans;
  t += a; // Hinglish: ek extra try karo
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
      body: `Pehla word pakdo, baaki se ghis-te jao — prefix chhota hota jayega.

[Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)

\`\`\`js
// Hinglish: ghis-te jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-common-prefix/
function longestCommonPrefix(strs) {
  // Hinglish: step 1 — pehla uthao
  if (!strs.length) return "";
  let pre = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(pre)) pre = pre.slice(0, -1); // Hinglish: aakhir kaato
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
      body: `Words todo, khaali hatao, ulta jodo — split + filter + reverse + join.

[Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)

\`\`\`js
// Hinglish: todo ulta jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-words-in-a-string/
function reverseWords(s) {
  // Hinglish: step 1 — words nikalo
  const words = s.split(" ").filter((w) => w.length > 0); // Hinglish: khaali hatao
  return words.reverse().join(" "); // Hinglish: ulta jodo
}
\`\`\``,
    },
    {
      id: 557,
      lcSlug: "reverse-words-in-a-string-iii",
      title: "Reverse Words in a String III",
      diff: "Easy",
      body: `Har word alag ulta karo — order same rakho, letters palto.

[Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/)

\`\`\`js
// Hinglish: har word palto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-words-in-a-string-iii/
function reverseWords(s) {
  // Hinglish: step 1 — words todo
  return s.split(" ").map((w) => [...w].reverse().join("")).join(" "); // Hinglish: har ek ulta
}
\`\`\``,
    },
    {
      id: 43,
      lcSlug: "multiply-strings",
      title: "Multiply Strings",
      diff: "Medium",
      body: `Haath se guna karo — har digit pair ka result sahi jagah jodo, carry sambhalo.

[Multiply Strings](https://leetcode.com/problems/multiply-strings/)

\`\`\`js
// Hinglish: haath se guna — ek-ek step comment dekho
// LC: https://leetcode.com/problems/multiply-strings/
function multiply(num1, num2) {
  // Hinglish: step 1 — zero check karo
  if (num1 === "0" || num2 === "0") return "0";
  const m = num1.length, n = num2.length;
  const ans = Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = Number(num1[i]) * Number(num2[j]); // Hinglish: guna karo
      const p = i + j + 1;
      const sum = mul + ans[p];
      ans[p] = sum % 10; // Hinglish: digit rakho
      ans[p - 1] += Math.floor(sum / 10); // Hinglish: carry aage
    }
  }
  let s = ans.join("");
  let k = 0;
  while (s[k] === "0") k++; // Hinglish: aage ke zero hatao
  return s.slice(k);
}
\`\`\``,
    },
    {
      id: 415,
      lcSlug: "add-strings",
      title: "Add Strings",
      diff: "Easy",
      body: `Peeche se jodo carry ke saath — number me badle bina string hi rakho.

[Add Strings](https://leetcode.com/problems/add-strings/)

\`\`\`js
// Hinglish: peeche se jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/add-strings/
function addStrings(num1, num2) {
  // Hinglish: step 1 — peeche se chalo
  let i = num1.length - 1, j = num2.length - 1, carry = 0, out = "";
  while (i >= 0 || j >= 0 || carry) {
    const a = i >= 0 ? Number(num1[i--]) : 0;
    const b = j >= 0 ? Number(num2[j--]) : 0;
    const s = a + b + carry;
    out = String(s % 10) + out; // Hinglish: digit aage jodo
    carry = Math.floor(s / 10); // Hinglish: carry bachao
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
      body: `Space hatao, sign dekho, digits jodo — limit cross ho to clamp karo. Steps tartib se karo.

[String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

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
      id: 6,
      lcSlug: "zigzag-conversion",
      title: "Zigzag Conversion",
      diff: "Medium",
      body: `Rows me upar-neeche chalao — direction disha badalte hi palto, aakhir me jod do.

[Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/)

\`\`\`js
// Hinglish: upar-neeche chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/zigzag-conversion/
function convert(s, numRows) {
  // Hinglish: step 1 — ek row ho to wapas do
  if (numRows === 1) return s;
  const rows = Array.from({ length: numRows }, () => "");
  let r = 0, dir = 1;
  for (const ch of s) {
    rows[r] += ch; // Hinglish: is row me daalo
    if (r === 0) dir = 1;
    if (r === numRows - 1) dir = -1; // Hinglish: disha palto
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
      body: `Bade se chhota values ghatao — 900, 400 wale khaas cases list me rakho.

[Integer to Roman](https://leetcode.com/problems/integer-to-roman/)

\`\`\`js
// Hinglish: ghata-te jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/integer-to-roman/
function intToRoman(num) {
  // Hinglish: step 1 — value-symbol jodi banao
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let out = "";
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { out += syms[i]; num -= vals[i]; } // Hinglish: jitni baar sama sake
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
      body: `Left se padho — agla bada ho to ghatao, nahi to jodo.

[Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

\`\`\`js
// Hinglish: aage dekh ke jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/roman-to-integer/
function romanToInt(s) {
  // Hinglish: step 1 — map banao
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && v[s[i]] < v[s[i + 1]]) ans -= v[s[i]]; // Hinglish: chhota pehle to ghatao
    else ans += v[s[i]]; // Hinglish: nahi to jodo
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
      body: `Pichhli line padh ke agli banao — groups gino (count + digit), repeat karo.

[Count and Say](https://leetcode.com/problems/count-and-say/)

\`\`\`js
// Hinglish: padh ke banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/count-and-say/
function countAndSay(n) {
  // Hinglish: step 1 — pehli line lo
  let cur = "1";
  for (let round = 1; round < n; round++) {
    let next = "", i = 0;
    while (i < cur.length) {
      let j = i;
      while (j < cur.length && cur[j] === cur[i]) j++; // Hinglish: group gino
      next += String(j - i) + cur[i]; // Hinglish: gin ke likho
      i = j;
    }
    cur = next;
  }
  return cur;
}
\`\`\``,
    },
      ],
    },
  ],
};
