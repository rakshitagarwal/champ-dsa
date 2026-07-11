# Prefix Sum

The prefix-sum technique precomputes cumulative sums from the start of an array so that the sum of any contiguous subarray can be answered in O(1) time. It is one of the simplest preprocessing patterns, yet it unlocks efficient solutions to range-query problems and subarray-target problems that would otherwise require O(n²) brute force. The idea is to trade O(n) preprocessing and O(n) extra space for constant-time queries thereafter.

At its core, prefix-sum leverages the fact that subtraction undoes addition. If you know the sum of all elements from index 0 to index j (call it `prefix[j]`) and from index 0 to index i-1 (`prefix[i-1]`), then the sum of the subarray from i to j is simply `prefix[j] - prefix[i-1]`. This simple formula is incredibly powerful — it reduces any subarray sum query to a single subtraction. When combined with a hash map, prefix-sum can also count subarrays whose sum equals a given target in O(n) time.

To build intuition, consider an array `[3, 1, 4, 1, 5]`. The prefix array is `[0, 3, 4, 8, 9, 14]`. To find the sum of `[1..3]` (indices 1 to 3, which are 1+4+1 = 6), compute `pref[4] - pref[1] = 9 - 3 = 6`. This works because `pref[4]` includes everything from 0 to 3, and `pref[1]` includes everything from 0 to 0 — subtracting leaves elements 1 through 3. The same principle applies whether the elements are numbers, products, XOR values, or any other invertible operation.

A key intuition to develop is that prefix sums convert range-sum queries into point queries. Instead of summing across a range every time, you answer with a single subtraction. This shift in perspective — from iterative summation to direct lookup — is the hallmark of preprocessing techniques. The same idea reappears in many forms: prefix-XOR, prefix-product, 2D prefix sums for submatrix queries, and even prefix sums on trees (where the cumulative sum is computed along root-to-leaf paths).

![Prefix sum — O(1) range queries](/images/dsa/prefix-sum.svg)

## When to use

- Answering multiple range-sum queries over a static array (e.g., LeetCode's Range Sum Query — Immutable)
- Finding subarrays or submatrices that sum to a specific target value
- Checking whether the array can be partitioned into two parts with equal sum (pivot index problems)
- Computing the product or XOR of a range (using prefix-product or prefix-XOR, the same concept applied with different operations)
- Problems involving the sum of elements on one side of an index being equal to the sum on the other side
- Optimizing 2D range-sum queries by creating a 2D prefix-sum matrix

## How it works

### Core concept

Let `nums[0..n-1]` be the input array. Define a prefix array `pref` of length `n + 1` where `pref[0] = 0` and `pref[i] = pref[i-1] + nums[i-1]` for `i` from 1 to n. In other words, `pref[i]` is the sum of the first `i` elements of `nums`. The reason we use `n + 1` slots (starting with 0) is that it eliminates the need for special-case handling when `i = 0` — the formula `pref[j+1] - pref[i]` works uniformly for any `0 <= i <= j < n`.

The real power comes when you combine prefix sums with a hash map. Consider the problem of counting subarrays that sum to k. Let `currentSum` be the prefix sum ending at index `i`. If a subarray ending at `i` has sum `k`, then there must exist an earlier prefix sum equal to `currentSum - k`. By storing how many times each prefix sum has appeared, you can count all valid subarrays in a single pass without ever constructing the full prefix array. This is the pattern used in "Subarray Sum Equals K" and many similar problems.

The hash-map approach is especially elegant because it handles negative numbers, zero-sum targets, and large arrays without additional complexity. Each prefix sum is computed incrementally, and the map lookup tells you immediately how many subarrays ending at the current index satisfy the sum condition. The initial `{0: 1}` entry is critical — it accounts for subarrays that start at index 0 (i.e., when `currentSum == k` directly).

The prefix sum concept extends beyond addition. The same structure works for **prefix product** (for range product queries) and **prefix XOR** (for range XOR queries), though product requires care with zeros and overflow. For 2D arrays, you build a 2D prefix matrix where `pref[i][j]` represents the sum of the submatrix from `(0,0)` to `(i-1, j-1)`, and you compute any submatrix sum by combining four prefix values.

### Step-by-step approach

1. **Build the prefix array (if doing multiple queries):** Initialize `pref[0] = 0`. For `i = 1` to `n`, set `pref[i] = pref[i-1] + nums[i-1]`. Now `sum(l, r) = pref[r+1] - pref[l]`.
2. **For the single-pass hash-map variant:** Initialize `map = {0: 1}` (prefix sum 0 occurs once before any element). Set `currentSum = 0` and `count = 0`.
3. **Iterate through the array:** Add each element to `currentSum`. Check if `currentSum - target` exists in the map — if so, add its frequency to `count`.
4. **Record the current prefix sum:** Increment `map[currentSum]` by 1 (or set to 1 if first occurrence).
5. **Return count or maximum length or boolean** depending on the problem.

### Complexity

- **Time:** O(n) for building the prefix array or for the hash-map pass. Each element is visited exactly once, and map operations are O(1) amortized.
- **Space:** O(n) for the prefix array of length n+1, or O(n) for the hash map in the worst case (all prefix sums distinct). Some problems can reduce this to O(1) if only a running sum is needed and queries are not repeated.

```js
function rangeSum(nums, queries) {
  const pref = [0];
  for (const n of nums) pref.push(pref[pref.length - 1] + n);
  return queries.map(([l, r]) => pref[r + 1] - pref[l]);
}
```

## Variations

- **Prefix product:** Same structure but using multiplication. Handle zeros carefully (reset product after zero). Used in "Product of Array Except Self" by combining prefix and suffix products.
- **Prefix XOR:** XOR is its own inverse, so `xor(l, r) = pref[r+1] ^ pref[l]`. Useful for counting subarrays with a given XOR value or finding the subarray with maximum XOR (often paired with a trie).
- **2D prefix sum:** Build a matrix where `pref[i][j]` is the sum of elements `(0,0)` to `(i-1, j-1)`. A submatrix sum from `(r1, c1)` to `(r2, c2)` is `pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1]`.
- **Difference array (inverse of prefix sum):** Instead of answering sum queries, you apply multiple range updates efficiently. To add `val` to every element in `[l, r]`, increment `diff[l]` and decrement `diff[r+1]`, then compute the prefix sum to get the final array. This is extremely useful for problems involving multiple range updates followed by a single query (e.g., "Corporate Flight Bookings").
- **Modular prefix sum (counting subarrays divisible by k):** Store prefix sums modulo k in a hash map. Two prefix sums with the same remainder indicate a subarray divisible by k, because `(pref[j] - pref[i]) % k == 0` iff `pref[j] % k == pref[i] % k`. This is the pattern behind "Subarray Sums Divisible by K."

## Edge cases

- **Empty array:** The prefix array is just `[0]`. Queries should return 0. For hash-map counting, the answer is 0 because there are no elements.
- **Negative numbers:** The hash-map variant handles negatives naturally since prefix sums can decrease. The map still stores frequencies correctly.
- **Target sum of 0:** The initial map entry `{0: 1}` catches subarrays that sum to 0 from the start. Ensure this is not double-counted.
- **Large sums causing integer overflow:** In typed languages, use 64-bit integers (long in Java, i64 in Rust) for prefix sums when the input can exceed 32-bit range.
- **Out-of-bounds queries:** In range-sum problems, the caller must guarantee `0 <= l <= r < n`. Defensive programming could clamp indices or return 0 for invalid queries.
- **Modulo operation with negative numbers:** When computing `prefixSum % k` for "divisible by k" problems, the result may be negative in some languages (JavaScript, C++). Normalize with `((sum % k) + k) % k` to get a non-negative remainder.
- **Zeros in prefix product:** A single zero resets the product to 0, and subsequent elements will give zero until the prefix is rebuilt. For prefix-product problems, track prefix before and after each zero separately, or handle zeros as reset points with special logic.

## Practice problems

- [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) — Direct application: build prefix array in constructor, answer each query in O(1).
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) — The hash-map variant. Count subarrays whose sum equals target k. The key insight is storing prefix-sum frequencies.
- [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) — Compute prefix products from the left and suffix products from the right, then multiply them at each index.
- [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) — Compute total sum, then scan left-to-right checking if `leftSum == total - leftSum - nums[i]`.
- [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/) — Store prefix sums modulo k. Two prefix sums with the same remainder indicate a subarray divisible by k.
- [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) — 2D prefix sum with inclusion-exclusion principle for O(1) submatrix queries.
- [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/) — Store prefix sum modulo k in a map with earliest index. If the same remainder repeats at least 2 indices apart, a subarray of length >= 2 sums to a multiple of k.
- [Number of Ways to Split Array](https://leetcode.com/problems/number-of-ways-to-split-array/) — Prefix sum used to check if the left segment sum >= right segment sum at each split point.
