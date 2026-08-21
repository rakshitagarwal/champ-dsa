# Bit Manipulation

Bits are tiny flags. XOR cancels a pair (`a ^ a = 0`). `n & (n - 1)` drops the lowest 1-bit. I use this when the problem is “every number twice except one” or “how many 1s.”

```js
x ^= y;           // toggle / cancel pairs
n & (n - 1);      // clear lowest set bit
(n & (n - 1)) === 0; // power of two (n > 0)
```

## Single Number

XOR everything. Pairs die. The leftover is the single number.

[Single Number](https://leetcode.com/problems/single-number/)

```js
// Bits — XOR cancels pairs
// LC: https://leetcode.com/problems/single-number/
function singleNumber(nums) {
  let x = 0;
  for (const n of nums) x ^= n;
  return x;
}
```

## Number of 1 Bits

While n is not 0, drop the lowest 1 with `n &= n - 1` and count.

[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

```js
// Bits — count set bits
// LC: https://leetcode.com/problems/number-of-1-bits/
function hammingWeight(n) {
  let c = 0;
  while (n) {
    n &= n - 1;
    c++;
  }
  return c;
}
```

## Counting Bits

`dp[i] = dp[i >> 1] + (i & 1)`. Even is the same as i/2. Odd is one extra 1.

[Counting Bits](https://leetcode.com/problems/counting-bits/)

```js
// Bits — dp from half
// LC: https://leetcode.com/problems/counting-bits/
function countBits(n) {
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
```

## Missing Number

XOR all indexes with all values. The missing index never cancels. Or `n*(n+1)/2 - sum`.

[Missing Number](https://leetcode.com/problems/missing-number/)

```js
// Bits — XOR index with value
// LC: https://leetcode.com/problems/missing-number/
function missingNumber(nums) {
  let x = nums.length;
  for (let i = 0; i < nums.length; i++) x ^= i ^ nums[i];
  return x;
}
```

## Power of Two

Positive, and only one bit set: `n > 0 && (n & (n - 1)) === 0`.

[Power of Two](https://leetcode.com/problems/power-of-two/)

```js
// Bits — single bit
// LC: https://leetcode.com/problems/power-of-two/
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
```
