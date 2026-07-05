# Bitwise XOR

XOR (^) is its own inverse — `a ^ a = 0` and `a ^ 0 = a`. This property lets you cancel out duplicates and isolate unique elements in a single pass.

## When to use
- Finding a missing or non-duplicate number in an array
- Problems where pairwise cancellation simplifies the answer
- Swapping values or detecting parity without extra space

## How it works

Iterate through the collection while XOR-ing every element. Pairs cancel to 0, leaving only the element that appears an odd number of times (or the missing/extra element when combined with the expected range).

```js
function findSingleNumber(nums) {
  let xor = 0;
  for (const n of nums) xor ^= n;
  return xor;
}
```

## Practice problems
- [Single Number](https://leetcode.com/problems/single-number/) — All numbers appear twice except one
- [Missing Number](https://leetcode.com/problems/missing-number/) — XOR index with value to find the gap
- [Find the Difference](https://leetcode.com/problems/find-the-difference/) — XOR characters of both strings
- [XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/) — Prefix XOR for range queries
