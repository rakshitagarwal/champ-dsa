# Arrays & Strings

> **Foundation — skim if revising.** This page covers basics that overlap with later patterns (Two Pointers, Sliding Window, Prefix Sum, Hashing). If you already know those, read the recognition cues and jump ahead.

Arrays and strings form the foundation of nearly every technical interview problem. An array is a contiguous block of memory storing elements of the same type, offering O(1) index-based access at the cost of O(n) insertion and deletion in the worst case. Strings are essentially arrays of characters with their own set of immutable vs. mutable semantics across languages. Mastering this pattern means understanding how to traverse, rearrange, and transform these sequences efficiently using techniques like in-place mutation, two-pass processing, and auxiliary frequency maps.

The pattern is deceptively broad — it covers everything from simple linear scans to multi-pass algorithms that build temporary structures before a final assembly. What unifies these problems is the sequential nature of the data: you can iterate, partition, and accumulate information about the elements by exploiting their positional relationships. Many array-and-string problems are building blocks for harder patterns (sliding window, two pointers, prefix sum), so a strong grasp here is essential before moving to more advanced topics.

A key insight is that strings are often converted to arrays (e.g., `.split('')`) to enable in-place mutation, then re-joined. Similarly, problems involving character counting, ordering, or anagram detection typically use a fixed-size integer array (size 26 for lowercase letters, 128 for ASCII, 256 for extended ASCII) as a frequency table. This bounded auxiliary space is a recurring trick that keeps solutions simple and fast.

![Arrays and strings — structure and operations](/images/dsa/arrays-strings.svg)

## When to use

- Reversing a string or array in-place using two-pointer swapping
- Rotating an array by k positions (using three reversals or modular arithmetic)
- Building a new string from a character array (e.g., URL encoding, string compression)
- Checking if two strings are anagrams via character frequency counting
- Removing or filtering elements from an array in-place (slow/fast pointer)
- Flattening a 2D array or matrix into a 1D traversal (row-major, spiral order)
- Problems involving string transformations like `atoi`, `strstr`, or pattern matching
- Computing running sums, cumulative products, or other prefix-based aggregations
- Dutch National Flag partitioning of an array with three distinct values
- Simulating a linear process like merging two sorted arrays backward

## How it works

### Core concept

The fundamental operation on arrays is indexed access. Most array-and-string algorithms use a single loop that walks through the array from left to right, maintaining some invariant or building an output. Two common sub-patterns are **in-place mutation** (where the output overwrites the input to avoid extra space) and **two-pass processing** (where a first pass collects metadata like frequencies or ranges, and a second pass uses that metadata to construct the result).

In-place mutation typically uses a slow/fast pointer pair: the fast pointer reads each element, and the slow pointer writes the next valid output element. This is how you remove duplicates, compress strings, or partition arrays without allocating a new array. Two-pass processing is used when the answer for each position depends on values from both sides — for example, computing the product of all elements except the current one (a problem that requires a left-to-right pass and a right-to-left pass).

### Step-by-step approach

1. **Determine traversal direction and number of passes.** Ask whether the answer can be built in a single left-to-right scan or if you need a reverse pass or precomputed frequency table.
2. **Decide on in-place vs. auxiliary storage.** If space is constrained, plan to overwrite the input using a write pointer. Otherwise, decide what auxiliary structure — a map, set, or array — will hold intermediate data.
3. **Initialize pointers and accumulators.** Set up read/write indices, running sums, counters, or frequency arrays. Define sentinel values where needed.
4. **Define the loop invariant.** Specify what is true at the start of each iteration — e.g., all elements before the write pointer are final; all elements between write and read pointers are yet to be processed.
5. **Iterate, updating state at each step.** For each element, apply the transformation (swap, count, build, compare) and advance the relevant pointers. Break early if a condition is met.
6. **Handle post-processing.** If the problem requires a trailing operation (e.g., padding, truncation, or a final join of characters), perform it after the loop.
7. **Convert result to the required output type.** If working on a string, join the character array. If working on an array, return the relevant slice or the modified input.

### Complexity

- **Time:** O(n) for single-pass or two-pass algorithms; O(n log n) if sorting is required before processing; O(n · k) for problems involving nested operations per element.
- **Space:** O(1) for in-place mutations (only index variables); O(k) for fixed-size frequency tables (k = 26, 128, 256) which counts as O(1); O(n) when building a new array or string.

```js
function reverseString(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }
  return s;
}

function productExceptSelf(nums) {
  const n = nums.length, res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}
```

## Variations

- **In-place array reversal:** Swap elements symmetrically from both ends. Extends to reversing subarrays, reversing words in a string, and rotating arrays via three reversals.
- **Running sum / prefix products:** Accumulate a value as you scan left to right. Used for range-sum queries, equilibrium index, and cumulative statistics.
- **Array rotation:** Shift elements by k positions using modular replacement (juggle algorithm) or three reversals. Both achieve O(n) time with O(1) extra space.
- **String building / joining:** Use a mutable character array or string builder (rather than immutable concatenation) when constructing output incrementally in a loop.
- **Character frequency counting:** Map each character to its count in a fixed-size array. Enables O(n) anagram, duplicate-character, and substitution-cipher solutions.
- **Dutch National Flag (three-way partition):** Use low, mid, high pointers to sort an array with three distinct values in a single pass without extra space.

## Edge cases

- **Empty array or string:** Return the input, an empty result, or a well-defined sentinel. Ensure no index access is attempted.
- **Single-element array:** Most loops handle this naturally when the condition is set up correctly (e.g., `l < r` fails immediately).
- **All elements identical:** Verify partitioning or removal logic doesn't infinite-loop. Duplicate-skipping conditions should handle this gracefully.
- **Negative numbers or zero values:** Running products and prefix sums must account for sign changes and zero values — consider edge behavior in `productExceptSelf` or `maxSubarray`.
- **Unicode and non-ASCII characters:** In JavaScript, `string.length` counts UTF-16 code units, not characters. Use `Array.from(str)` or the spread operator for proper character-level processing.
- **Integer overflow in cumulative operations:** Sums, products, and rotations modulo k should use safe arithmetic (e.g., `BigInt`, or modular arithmetic with `(num % k + k) % k`).
- **Spaces and punctuation in strings:** Decide whether whitespace and non-alphanumeric characters are significant. Problems like palindrome checking often require sanitizing the input first.

## Practice problems

- [Reverse String](https://leetcode.com/problems/reverse-string/) — Classic in-place array reversal using two-pointer swapping. The most direct application of the pattern.
- [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) — Two-pass prefix/suffix algorithm without division. Tests understanding of cumulative operations.
- [Rotate Array](https://leetcode.com/problems/rotate-array/) — Rotate by k positions in O(1) space using three reversals or cyclic replacements.
- [Valid Anagram](https://leetcode.com/problems/valid-anagram/) — Fixed-size frequency table over 26 characters. Demonstrates the character-counting technique.
- [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) — State-machine string parsing with edge cases for sign, overflow, and whitespace.
- [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/) — String serialization with a delimiter or length prefix. Tests string-building and parsing discipline.
- [Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors/) — Three-way partition of 0s, 1s, and 2s in a single pass using three pointers.
- [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) — Sliding window combined with a fixed-size frequency array for character matching.
