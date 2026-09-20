# Strings

**Definition:** String problems ask you to scan, compare, count, or transform text. The main trick is treating the string like an array — two pointers, frequency counts, and sliding windows show up the most. In JS, strings are **immutable**, so do not loop with `+=`; push into an array and `join` at the end.

**When to use:** Palindrome checks, anagram compares, substring search, grouping, or string transforms. Spot “compare in sorted order” (anagram) and “longest without repeats” (sliding window).

**How it works:** Decide first — does order matter (two pointers / expand) or do counts matter (frequency map)? Clean case and non-alphanumeric (`toLowerCase`, regex), then run the pattern. Time is usually `O(n)`, space `O(1)` or `O(k)`.

## Study notes

- **Recognition:** palindrome, anagram, substring constraint, parse/build string.
- **Build tip:** `const out = []; out.push(ch); return out.join("")` — never `s += ch` in a hot loop.
- **Traps:** Unicode/surrogate pairs are rare on LC; empty string edge; off-by-one on `slice`.
- **Checklist:** case? only alnum? need indices or just a boolean?

## Active revision

- Why is `s += ch` in a loop dangerous in JS? What do you do instead?
- Anagram: when is a 26-slot freq array better than sorting?
- Palindrome: odd vs even expand-around-center — when do you need both?

## JS String methods (interview cheatsheet)

| Method | What it does | Notes |
| --- | --- | --- |
| `length` | length | read-only |
| `charAt(i)` / `s[i]` | char at i | out of range → `""` / `undefined` |
| `charCodeAt(i)` | UTF-16 code unit | `'a'.charCodeAt(0) === 97` |
| `at(i)` | index (negative OK) | `at(-1)` last char |
| `slice(s, e?)` | substring copy | end exclusive; negatives OK |
| `substring(s, e?)` | similar to slice | negatives → 0; prefer `slice` |
| `indexOf` / `lastIndexOf` | find substring | `-1` if missing |
| `includes` / `startsWith` / `endsWith` | bool checks | |
| `split(sep)` | → array | `""` sep = chars; watch empty parts |
| `replace` / `replaceAll` | substitute | `replace` only first unless `/g` |
| `toLowerCase` / `toUpperCase` | case | |
| `trim` / `trimStart` / `trimEnd` | whitespace | |
| `padStart` / `padEnd` | pad | |
| `repeat(n)` | repeat | |
| `match(re)` | regex match | |
| `localeCompare(other)` | sort compare | string sort |
| `[...s]` / `Array.from(s)` | char array | |

Static: `String.fromCharCode(97)` → `"a"`. Template: `` `${a}${b}` ``.

```js
// String skeleton — two pointers (palindrome / reverse)
// two pointers from ends toward center
function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++; // skip non-alphanumeric characters
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}

// String skeleton — frequency count (anagram)
// count frequencies, then compare the two strings
function freqCount(s) {
  const f = Array(26).fill(0); // a-z of dibbe
  for (const ch of s.toLowerCase()) {
    if (ch >= "a" && ch <= "z") f[ch.charCodeAt(0) - 97]++;
  }
  return f;
}

// String skeleton — expand around center (palindromic substring)
// for each center, expand outward while characters match
function expand(s, l, r) {
  while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
  return [l + 1, r - l - 1]; // start + length
}
```

## Tips & Tricks

- **Remember immutability:** `s += ch` in a loop is `O(n²)` — push into an array and `join("")`.
- **Normalize case once:** Call `toLowerCase()` up front, not on every compare.
- **Skip junk:** For palindromes, skip everything except letters/digits — regex `/[a-z0-9]/i` or a charCode check.
- **Anagram = sort or count:** Short strings — sort and compare; longer ones — a length-26 freq array is faster.
- **Use `charCodeAt`:** `'a'.charCodeAt(0)` gives a bucket index — often faster than a Map, `O(1)` space.
- **Split-reverse-join:** To reverse words, `split(" ").reverse().join(" ")` — filter empty parts if there are extra spaces.
- **Sliding window on strings:** Substring-with-constraint problems (repeats, counts) are often `O(n)` with a window + map.
- **Expand-center:** For palindromic substrings, try both odd centers (`i`) and even centers (`i, i+1`).

## Valid Palindrome

Walk from both ends; skip non-alphanumeric; compare ignoring case.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

```js
// Time: O(n) · Space: O(1)
// two pointers; skip non-alnum
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
```

## Valid Anagram

Same letter counts ⇒ anagram. +1 for `s`, −1 for `t` — all zeros means true.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

```js
// Time: O(n) · Space: O(1)
// count chars; must match
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

## Group Anagrams

The sorted word is the group key — anagrams sort to the same string. Bucket lists in a map by that key.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

```js
// Time: O(n·k log k) · Space: O(n·k)
// key = sorted letters
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

## Longest Substring Without Repeating Characters

Grow the window; on a repeat, shrink from the left. A map of last indices lets left jump ahead.

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

```js
// Time: O(n) · Space: O(min(n,Σ))
// window: shrink when char repeats
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
```

## Longest Palindromic Substring

Expand from every center (odd + even); keep the longest. `O(n²)` time, `O(1)` space.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

```js
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
```
