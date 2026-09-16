# Bit Manipulation

**Definition:** Bit manipulation seedha binary par kaam karta hai. Har integer 32/64 flags hai. Main identities: `a ^ a = 0`, `a ^ 0 = a`, `n & (n - 1)` sabse neeche wala `1` hata deta hai, `n & -n` wahi bit nikalta hai.

**When to use:** "Har number do baar aaya bas ek single hai", set bits ginna, power-of-two check, missing number, ya `O(1)` space me flags/subsets ka khel.

**How it works:** XOR se pairs cancel hote hain; `n & (n-1)` loop `O(popcount)` me bits gin leta hai; bit DP `dp[i] = dp[i>>1] + (i&1)`. Time `O(n)` ya `O(1)` per op, space `O(1)`.

```js
// Bit skeleton — core identities
// XOR from duplicate cancel, & from Bit manipulation
x ^= y;                // toggle / pairs cancel
n & (n - 1);           // clear lowest set bit (Brian Kernighan)
(n & (n - 1)) === 0;   // power of two (n > 0)
n & -n;                // isolate lowest set bit with n & -n

// Bits ginna skeleton
// while n ≠ 0, clear lowest set bit and count iterations
let c = 0, m = n;
while (m) { m &= m - 1; c++; }

// Single number skeleton (pairs cancel)
// saare XOR, bachega single
let xor = 0;
for (const v of nums) xor ^= v; // XOR all values — duplicate pairs cancel
```
## Single Number

XOR everything. Pairs die. The leftover is the single number.

[Single Number](https://leetcode.com/problems/single-number/)

```js
// Bits — XOR cancels pairs
// LC: https://leetcode.com/problems/single-number/
function singleNumber(nums) {
  // Start at 0 — XOR identity element
  let x = 0;
  // XOR every value; duplicates cancel (a ^ a = 0)
  for (const n of nums) x ^= n;
  // Whatever survives is the lone element
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
  // Each iteration removes exactly one set bit
  while (n) {
    // n & (n-1) clears the lowest 1-bit
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
  for (let i = 1; i <= n; i++) {
    // Popcount(i) = popcount(i/2) plus last bit
    dp[i] = dp[i >> 1] + (i & 1);
  }
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
  // Zero and negatives are not powers of two
  // Single-bit numbers have no other 1s after clearing lowest bit
  return n > 0 && (n & (n - 1)) === 0;
}
```

## Single Number II

Har number 3 baar, ek single. Bits count mod 3 se nikalo.

[Single Number II](https://leetcode.com/problems/single-number-ii/)

```js
// LC: https://leetcode.com/problems/single-number-ii/
function singleNumberII(nums) {
  let ans=0;
  // Reconstruct answer bit-by-bit
  for(let b=0;b<32;b++){
    let cnt=0;
    for(const x of nums) if((x>>b)&1) cnt++;
    // Triplets contribute 0 mod 3; singleton contributes 1 mod 3
    if(cnt%3) ans |= (1<<b);
  }
  return ans;
}
```

## Reverse Bits

32-bit unsigned integer ke bits ulta karo.

[Reverse Bits](https://leetcode.com/problems/reverse-bits/)

```js
// LC: https://leetcode.com/problems/reverse-bits/
function reverseBits(n) {
  let res=0;
  for(let i=0;i<32;i++){
    // Shift result left and append n's LSB
    res = (res<<1) | (n & 1);
    // Drop processed bit from n
    n >>>= 1;
  }
  // Force unsigned 32-bit result
  return res >>> 0;
}
```

## Hamming Distance

Do numbers me kitne bits alag? XOR karke set bits gino.

[Hamming Distance](https://leetcode.com/problems/hamming-distance/)

```js
// LC: https://leetcode.com/problems/hamming-distance/
function hammingDistance(x, y) {
  // XOR in 1 = alag
  let z = x ^ y, cnt=0;
  while(z){ z &= z-1; cnt++; } // clear one set bit per iteration
  return cnt;
}
```
