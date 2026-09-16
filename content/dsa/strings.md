# Strings

**Definition:** String questions me text ko scan, compare, count ya transform karna hota hai. Asli trick ye hai ki string ko array jaisa treat karo — two pointers, frequency counting aur sliding window yahi sabse zyada lagte hain. JS me strings immutable hain, isliye baar-baar `+=` mat karo, array me jodke `join` karo.

**When to use:** Palindrome check, anagram compare, substring search, grouping, ya string transform dikhe. "Sorted order me compare" (anagram) aur "bina repeat sabse lamba" (sliding window) pehchano.

**How it works:** Pehle decide karo — order matter karta hai (two pointers/expand) ya count matter karta hai (frequency map). Case aur non-alphanumeric saaf karo (`toLowerCase`, regex), fir pattern chalao. Time aksar `O(n)`, space `O(1)` ya `O(k)`.

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
// LC: https://leetcode.com/problems/valid-palindrome/
function isPalindrome(s) {
  // two pointers from both ends toward center
  const isAlphaNum = (c) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++; // skip non-alphanumeric characters
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false; // mismatch
    l++; r--;
  }
  return true;
}
```

## Valid Anagram

Dono ke letter counts barabar hon to anagram. Ek ka +1, doosre ka -1 — sab zero to true.

[Valid Anagram](https://leetcode.com/problems/valid-anagram/)

```js
// LC: https://leetcode.com/problems/valid-anagram/
function isAnagram(s, t) {
  // lengths must match for an anagram
  if (s.length !== t.length) return false;
  const f = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    f[s.charCodeAt(i) - 97]++; // first of +1
    f[t.charCodeAt(i) - 97]--; // doosre of -1
  }
  return f.every((x) => x === 0); // sab zero to anagram
}
```

## Group Anagrams

Sorted word hi group ki key hai — anagram sort karke same bante hain. Map me key se list jodo.

[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

```js
// LC: https://leetcode.com/problems/group-anagrams/
function groupAnagrams(strs) {
  // step 1 — build the map
  const map = new Map();
  for (const w of strs) {
    const key = [...w].sort().join(""); // sort = group key
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w); // group in push into heap
  }
  return [...map.values()];
}
```

## Longest Substring Without Repeating Characters

Window badhao, repeat aaye to left se hatao. Map me last index rakho taaki left seedha jump kare.

[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

```js
// LC: https://leetcode.com/problems/longest-substring-without-repeating-characters/
function lengthOfLongestSubstring(s) {
  // step 1 — window + map lo
  const last = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    if (last.has(s[r]) && last.get(s[r]) >= l) {
      l = last.get(s[r]) + 1; // repeat remove, jump do
    }
    last.set(s[r], r);
    best = Math.max(best, r - l + 1); // window is valid — track longest length
  }
  return best;
}
```

## Longest Palindromic Substring

Har center (odd + even) se expand karo, sabse lamba rakho. `O(n²)` time, `O(1)` space.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

```js
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
```
