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
// Time: O(n) · Space: O(1)
var isPalindrome = function(s) {
  let cleanStr = cleanUp(s);
  return isPal(cleanStr);
};

function cleanUp(str) {
  let char = "abcdefghijklmnopqrstuvwxyz0123456789";
  let newS = "";

  for (let i = 0; i < str.length; i++) {
    let lCase = str[i].toLowerCase();

    if (char.indexOf(lCase) !== -1) {
      newS += lCase;
    }
  }

  return newS;
}

function isPal(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
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
// Time: O(n) · Space: O(1)
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
// Time: O(n) · Space: O(1)
var judgeCircle = function(moves) {
  let x = 0;
  let y = 0;

  for (let move of moves) {
    switch (move) {
      case "U": y++; break;
      case "R": x++; break;
      case "D": y--; break;
      case "L": x--; break;
    }
  }

  return x === 0 && y === 0;
};
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
// Time: O(n) · Space: O(1)
var lengthOfLastWord = function(s) {
  // 2
  let i = s.length - 1;
  let count = 0;
  while (i >= 0) {
    if (s[i] == " " && count > 0) {
      return count;
    } else if (s[i] != " ") {
      count++;
    }
    i--;
  }
  return count;
};
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
// Time: O(n·k log k) · Space: O(n·k)
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
// Time: O(n²) · Space: O(1)
var longestPalindrome = function(s) {
  let longest = "";

  function isPal(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return s.slice(left + 1, right);
  }

  for (let i = 0; i < s.length; i++) {
    let oddPal = isPal(s, i, i);
    let evenPal = isPal(s, i, i + 1);

    let longestPal = oddPal.length > evenPal.length ? oddPal : evenPal;

    if (longestPal.length > longest.length) {
      longest = longestPal;
    }
  }

  return longest;
};
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
// Time: O(n²) · Space: O(1)
var countSubstrings = function(s) {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    let left = i;
    let right = i;

    // odd
    helper(left, right);
    // even
    helper(left, right + 1);
  }

  function helper(left, right) {
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }

  return count;
};
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
// Time: O(n) · Space: O(n)
var encode = function(strs) {
  if (!strs.length) return null;
  return strs.join("-encodeStr");
};

var decode = function(s) {
  if (s === null) return [];
  return s.split("-encodeStr");
};
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
// Time: O(n) · Space: O(min(n,Σ))
var lengthOfLongestSubstring = function(s) {
  let longestStr = 0;
  let set = new Set();

  let left = 0;
  let right = 0;

  while (right < s.length) {
    let letter = s[right];

    if (!set.has(letter)) {
      set.add(letter);
      longestStr = Math.max(longestStr, set.size);
      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }

  return longestStr;
};
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
// Time: O(n) · Space: O(1)
var characterReplacement = function(s, k) {
  let map = {};

  let topFrequency = 0;
  let longest = 0;

  let left = 0;
  let right = 0;

  while (right < s.length) {
    let rightChar = s[right];

    map[rightChar] = map[rightChar] + 1 || 1;

    topFrequency = Math.max(topFrequency, map[rightChar]);

    while ((right - left + 1) - topFrequency > k) {
      let leftChar = s[left];
      map[leftChar]--;
      left++;
    }

    longest = Math.max(longest, right - left + 1);

    right++;
  }

  return longest;
};
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
// Time: O(n²) · Space: O(n)
var wordBreak = function(s, wordDict) {
  let visited = new Set();
  let set = new Set(wordDict);
  let queue = [0];

  while (queue.length) {
    let current = queue.shift();

    if (!visited.has(current)) {
      for (let i = current + 1; i <= s.length; i++) {
        if (set.has(s.slice(current, i))) {
          if (i === s.length) {
            return true;
          }
          queue.push(i);
        }
      }
      visited.add(current);
    }
  }

  return false;
};
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
// Time: O(n) · Space: O(1)
var myAtoi = function(s) {
  let index = 0;
  let isNeg = false;
  let res = 0;

  for (let i = index; i < s.length; i++) {
    if (s[i] === " ") {
      index++;
    } else {
      break;
    }
  }

  if (s[index] === "-" || s[index] === "+") {
    isNeg = s[index] === "-";
    index++;
  }

  for (let i = index; i < s.length; i++) {
    let num = s.charCodeAt(i) - 48;
    if (num < 0 || num > 9) break;

    res *= 10;
    res += num;
  }

  if (isNeg) {
    res = -res;
  }

  let min = -(2 ** 31);
  let max = 2 ** 31 - 1;

  let minima = Math.min(max, res);
  return Math.max(minima, min);
};
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
// Time: O(n) · Space: O(n)
var breakPalindrome = function(palindrome) {
  if (palindrome.length === 1) return "";

  let arr = palindrome.split("");

  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    if (arr[i] !== "a") {
      arr[i] = "a";
      return arr.join("");
    }
  }

  arr[arr.length - 1] = "b";
  return arr.join("");
};
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
// Time: O(n·m) · Space: O(1)
var strStr = function(haystack, needle) {
  if (haystack === needle || needle === "") {
    return 0;
  }

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      let sub = haystack.substring(i, i + needle.length);
      if (sub === needle) {
        return i;
      }
    }
  }

  return -1;
};
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
// Time: O(n) · Space: O(Σ)
// Sliding window — smallest that still covers t
var minWindow = function(s, t) {
  let map = new Map();

  for (let letter of t) {
    if (!map.has(letter)) {
      map.set(letter, 1);
    } else {
      map.set(letter, map.get(letter) + 1);
    }
  }

  let left = 0;
  let right = 0;
  let len = Infinity;
  let count = map.size;
  let minWindow = "";

  while (right < s.length) {
    let rLetter = s[right];
    if (map.has(rLetter)) {
      map.set(rLetter, map.get(rLetter) - 1);
      if (map.get(rLetter) === 0) count--;
    }

    right++;

    while (count === 0) {
      if (right - left < len) {
        len = right - left;
        minWindow = s.slice(left, right);
      }

      let lLetter = s[left];
      if (map.has(lLetter)) {
        map.set(lLetter, map.get(lLetter) + 1);
        if (map.get(lLetter) > 0) count++;
      }
      left++;
    }
  }

  return minWindow;
};
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
// Time: O(n·L²) · Space: O(n·L)
// Graph BFS — one letter at a time
var ladderLength = function(beginWord, endWord, wordList) {
  let set = new Set(wordList);
  let queue = [[beginWord, 1]];

  while (queue.length) {
    let [currWord, count] = queue.shift();

    if (currWord === endWord) {
      return count;
    }

    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < currWord.length; j++) {
        let letter = String.fromCharCode(97 + i);
        let newWord = currWord.slice(0, j) + letter + currWord.slice(j + 1);

        if (set.has(newWord)) {
          queue.push([newWord, count + 1]);
          set.delete(newWord);
        }
      }
    }
  }

  return 0;
};
\`\`\``,
    },
      ],
    },
  ],
};
