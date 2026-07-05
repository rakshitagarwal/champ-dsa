# Bitwise XOR

XOR (exclusive OR, `^`) is one of the most powerful bitwise operators in algorithmic problem-solving because it is its own inverse: `a ^ a = 0` and `a ^ 0 = a`. This seemingly simple property lets you cancel duplicate values, detect missing elements, and isolate odd-occurrence numbers in a single O(n) pass without any extra space. XOR is also commutative (`a ^ b = b ^ a`) and associative (`(a ^ b) ^ c = a ^ (b ^ c)`), which means the order of operations never matters — pairwise cancellation works regardless of how the array is arranged.

Beyond duplicate detection, XOR underpins several classic low-level tricks: swapping two integers without a temporary variable (`a ^= b; b ^= a; a ^= b`), toggling bits in a mask, and computing the parity of a binary number. Many LeetCode problems that seem unrelated at first glance are solvable in O(1) space purely through XOR cancellation, making it an indispensable pattern in your toolkit.

## When to use

- Finding the lone non-duplicate element in an array where every other element appears twice
- Finding a missing number in a range when the expected full set is known
- Detecting the extra or differing character between two strings
- Swapping integers without extra memory or temporary variables
- Computing parity (even/odd count of set bits) efficiently
- Solving problems where pairwise cancellation simplifies the answer to a single pass
- Range XOR queries using a prefix-XOR table

## How it works

### Core concept

The key invariant is that XOR-ing a number with itself yields zero, and XOR-ing any number with zero leaves it unchanged. When you XOR every element in a collection, paired duplicates cancel out to 0, and the single leftover value (or the XOR of the unpaired elements) remains. This works because XOR is both commutative and associative — the order of traversal is irrelevant.

For missing-number problems, you XOR the array values with their expected indices (or with the full range 0..n). Every matched pair cancels, leaving only the missing number. The same idea extends to strings: XOR the character codes of both strings, and the leftover code is the extra character.

### Step-by-step approach

1. Initialize a variable `xor = 0`. This will accumulate the XOR of all processed elements.
2. Iterate through the input array. For each element `n`, perform `xor ^= n`. Because XOR is associative, duplicates cancel as you go — you don't need to detect them explicitly.
3. If the problem involves a known range (e.g., a missing number in 0..n), also XOR the index or the full expected range into the same variable. The known values and array values cancel pairwise, leaving the missing one.
4. After the loop, `xor` holds the result. If the problem asks for two unique elements, find the rightmost set bit in `xor` to partition the array into two groups and XOR each group separately.
5. For range queries (subarray XOR), precompute a prefix-XOR array where `prefix[i] = nums[0] ^ nums[1] ^ ... ^ nums[i-1]`. Then `xorRange(l, r) = prefix[r+1] ^ prefix[l]`.

### Complexity

- **Time:** O(n) — single pass through the array
- **Space:** O(1) — only a single integer variable (O(n) for prefix XOR variant)

### XOR is vectorisable

Because XOR is a bitwise operation at the hardware level, modern CPUs can process 64, 128, or even 256 bits in a single instruction via SIMD. While JavaScript does not expose SIMD directly, the principle means that XOR-based solutions are typically among the fastest possible implementations on any architecture. This performance predictability makes XOR the algorithm of choice for embedded systems, networking code (CRC, checksums), and low-level data validation.

```js
// Find the single number that appears once; all others appear twice
function singleNumber(nums) {
  let xor = 0;
  for (const n of nums) xor ^= n;
  return xor;
}

// Find the missing number in [0, n]
function missingNumber(nums) {
  let xor = 0;
  for (let i = 0; i < nums.length; i++) xor ^= i ^ nums[i];
  return xor ^ nums.length;
}

// Find the extra character in string t vs string s
function findTheDifference(s, t) {
  let xor = 0;
  for (const ch of s) xor ^= ch.charCodeAt(0);
  for (const ch of t) xor ^= ch.charCodeAt(0);
  return String.fromCharCode(xor);
}

// Find two numbers that appear once while others appear twice
function singleNumberTwo(nums) {
  let xor = 0;
  for (const n of nums) xor ^= n;
  const rightmost = xor & -xor;
  let a = 0, b = 0;
  for (const n of nums) {
    if (n & rightmost) a ^= n;
    else b ^= n;
  }
  return [a, b];
}
```

## Variations

- **Two unique elements:** When two numbers appear once, XOR everything to get `a ^ b`. Find a differentiating bit (usually the rightmost set bit via `xor & -xor`) and partition the array into two groups — those with that bit set and those without. XOR each group separately to recover both numbers.
- **XOR Queries of a Subarray:** Build a prefix-XOR array where `prefix[i]` is the XOR of `nums[0..i-1]`. The XOR of subarray `[l, r]` is `prefix[r+1] ^ prefix[l]`, handling each query in O(1) after O(n) preprocessing. This mirrors the prefix-sum pattern but with XOR's invertibility instead of subtraction.
- **Repeated number (one missing, one duplicate):** XOR all array elements with 1..n. The result is `missing ^ duplicate`. Since the missing and duplicate are different, the XOR is non-zero. Use the rightmost-set-bit partitioning trick to separate them, then XOR each group to identify which is missing and which is duplicate.
- **Repeated number (one missing, one duplicate):** XOR all array elements with 1..n. The result is `missing ^ duplicate`. Use the partitioning trick above to separate them.
- **Swap without temp:** `a ^= b; b ^= a; a ^= b` — safe as long as `a` and `b` are distinct memory locations (not the same variable).

### Using XOR for toggle state

Another common use is toggling a boolean flag between two states without an if-else: `flag ^= 1` flips between 0 and 1. This pattern appears in applications like alternating row colours, blink states, or tracking which set a value belongs to in a partitioning algorithm.

## Edge cases

- **Single element array:** The XOR loop runs exactly once and returns that element, which is correct by definition.
- **All numbers cancel (xor = 0):** This means every number appears an even number of times, or the missing number is 0 in a missing-number setup. Handle by returning 0 or the expected fallback.
- **Very large numbers:** JavaScript's bitwise XOR operates on 32-bit signed integers. For numbers beyond 2^31 - 1, use `BigInt` or a manual bit-length approach.
- **Self-swap pitfall:** `a ^= b; b ^= a; a ^= b` sets `a` to 0 if `a` and `b` reference the same variable. Always ensure distinct references.

## Practice problems

- [Single Number](https://leetcode.com/problems/single-number/) — Classic XOR cancellation; every element appears twice except one
- [Missing Number](https://leetcode.com/problems/missing-number/) — XOR index with value to find the gap in 0..n
- [Find the Difference](https://leetcode.com/problems/find-the-difference/) — XOR character codes of both strings to find the extra letter
- [Single Number II](https://leetcode.com/problems/single-number-ii/) — Every element appears three times except one (requires bit counting, not plain XOR)
- [XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/) — Prefix XOR for O(1) range queries
- [Decode XORed Array](https://leetcode.com/problems/decode-xored-array/) — Reverse the XOR operation to recover the original array
- [Decode XORed Permutation](https://leetcode.com/problems/decode-xored-permutation/) — XOR the first element using the XOR of 1..n then reconstruct
- [Maximum XOR of Two Numbers in an Array](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) — Build a bitwise trie and greedily pick opposite bits for maximum XOR
