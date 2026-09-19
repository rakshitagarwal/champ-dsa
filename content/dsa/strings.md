# Strings

**Definition:** String questions me text ko scan, compare, count ya transform karna hota hai. Asli trick ye hai ki string ko array jaisa treat karo — two pointers, frequency counting aur sliding window yahi sabse zyada lagte hain. JS me strings **immutable** hain, isliye baar-baar `+=` mat karo, array me jodke `join` karo.

**When to use:** Palindrome check, anagram compare, substring search, grouping, ya string transform dikhe. "Sorted order me compare" (anagram) aur "bina repeat sabse lamba" (sliding window) pehchano.

**How it works:** Pehle decide karo — order matter karta hai (two pointers/expand) ya count matter karta hai (frequency map). Case aur non-alphanumeric saaf karo (`toLowerCase`, regex), fir pattern chalao. Time aksar `O(n)`, space `O(1)` ya `O(k)`.

## Study notes

- **Pehchan:** palindrome, anagram, substring constraint, parse/build string.
- **Build tip:** `const out = []; out.push(ch); return out.join("")` — kabhi loop me `s += ch` nahi.
- **Traps:** Unicode/surrogate pairs rare in LC; empty string edge; off-by-one on `slice`.
- **Checklist:** case? only alnum? need indices or just bool?

## JS String methods (interview cheatsheet)

| Method | Kya karta hai | Notes |
| --- | --- | --- |
| `length` | length | read-only |
| `charAt(i)` / `s[i]` | char at i | out of range → `""` / `undefined` |
| `charCodeAt(i)` | UTF-16 code unit | `'a'.charCodeAt(0) === 97` |
| `at(i)` | index (negative OK) | `at(-1)` last char |
| `slice(s, e?)` | substring copy | end exclusive; negatives OK |
| `substring(s, e?)` | similar slice | negatives → 0; prefer `slice` |
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

- **Immutable yaad rakho:** `s += ch` loop me `O(n²)` banata hai — array me push karke `join("")` karo.
- **Case pehle fix karo:** Compare se pehle `toLowerCase()` kar lo, har baar nahi.
- **Kachra skip karo:** Palindrome me letters/digits ke alawa sab skip — regex `/[a-z0-9]/i` ya charCode check.
- **Anagram = sorted ya count:** Chhoti strings sort karke compare karo, lambi ke liye 26-length freq array tez hai.
- **charCodeAt ka use:** `'a'.charCodeAt(0)` se index nikalo — Map se tez, `O(1)` space.
- **Split-reverse-join:** Words reverse karne hon to `split(" ").reverse().join(" ")` — par extra spaces ke liye filter karo.
- **Sliding window strings pe:** Repeat/condition wale substring sawal window + map se `O(n)` me hote hain.
- **Expand-center:** Palindromic substring me odd (center i) aur even (center i,i+1) dono try karo.

## Valid Palindrome

Dono siron se aao, alphanumeric nahi to skip, case ignore karke compare.

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

Dono ke letter counts barabar hon to anagram. Ek ka +1, doosre ka -1 — sab zero to true.

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

Sorted word hi group ki key hai — anagram sort karke same bante hain. Map me key se list jodo.

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

Window badhao, repeat aaye to left se hatao. Map me last index rakho taaki left seedha jump kare.

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

Har center (odd + even) se expand karo, sabse lamba rakho. `O(n²)` time, `O(1)` space.

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
