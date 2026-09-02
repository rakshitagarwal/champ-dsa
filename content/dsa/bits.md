# Bit Manipulation

**Definition:** Bit manipulation seedha binary par kaam karta hai. Har integer 32/64 flags hai. Main identities: `a ^ a = 0`, `a ^ 0 = a`, `n & (n - 1)` sabse neeche wala `1` hata deta hai, `n & -n` wahi bit nikalta hai.

**When to use:** "Har number do baar aaya bas ek single hai", set bits ginna, power-of-two check, missing number, ya `O(1)` space me flags/subsets ka khel.

**How it works:** XOR se pairs cancel hote hain; `n & (n-1)` loop `O(popcount)` me bits gin leta hai; bit DP `dp[i] = dp[i>>1] + (i&1)`. Time `O(n)` ya `O(1)` per op, space `O(1)`.

```js
// Bit skeleton — core identities
// Hinglish: XOR se duplicate cancel, & se bit hatana
x ^= y;                // toggle / pairs cancel
n & (n - 1);           // sabse neeche wala 1 hatao
(n & (n - 1)) === 0;   // power of two (n > 0)
n & -n;                // sabse neeche wala 1 ka value

// Bits ginna skeleton
// Hinglish: jab tak n zero nahi, ek 1 hatao aur gino
let c = 0, m = n;
while (m) { m &= m - 1; c++; }

// Single number skeleton (pairs cancel)
// Hinglish: saare XOR, bachega single
let xor = 0;
for (const v of nums) xor ^= v; // jawab xor me
```
## Single Number

XOR everything. Pairs die. The leftover is the single number.

[Single Number](https://leetcode.com/problems/single-number/)

```js
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — XOR cancels pairs
// LC: https://leetcode.com/problems/single-number/
function singleNumber(nums) {
  // Hinglish: step 1 — base case check karo
  let x = 0;
  for (const n of nums) x ^= n;
  return x;
}
```

## Number of 1 Bits

While n is not 0, drop the lowest 1 with `n &= n - 1` and count.

[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

```js
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — count set bits
// LC: https://leetcode.com/problems/number-of-1-bits/
function hammingWeight(n) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — dp from half
// LC: https://leetcode.com/problems/counting-bits/
function countBits(n) {
  // Hinglish: step 1 — base case check karo
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
```

## Missing Number

XOR all indexes with all values. The missing index never cancels. Or `n*(n+1)/2 - sum`.

[Missing Number](https://leetcode.com/problems/missing-number/)

```js
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — XOR index with value
// LC: https://leetcode.com/problems/missing-number/
function missingNumber(nums) {
  // Hinglish: step 1 — base case check karo
  let x = nums.length;
  for (let i = 0; i < nums.length; i++) x ^= i ^ nums[i];
  return x;
}
```

## Power of Two

Positive, and only one bit set: `n > 0 && (n & (n - 1)) === 0`.

[Power of Two](https://leetcode.com/problems/power-of-two/)

```js
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — single bit
// LC: https://leetcode.com/problems/power-of-two/
function isPowerOfTwo(n) {
  // Hinglish: step 1 — base case check karo
  return n > 0 && (n & (n - 1)) === 0;
}
```

## Single Number II

Har number 3 baar, ek single. Bits count mod 3 se nikalo.

[Single Number II](https://leetcode.com/problems/single-number-ii/)

```js
// Hinglish: bit hatana — ek-ek step comment dekho
// LC: https://leetcode.com/problems/single-number-ii/
function singleNumberII(nums) {
  // Hinglish: har bit 0..31 gin ke mod 3
  let ans=0;
  for(let b=0;b<32;b++){
    let cnt=0;
    for(const x of nums) if((x>>b)&1) cnt++; // Hinglish: b-th bit kitni baar 1
    if(cnt%3) ans |= (1<<b); // Hinglish: single ka bit
  }
  return ans;
}
```

## Reverse Bits

32-bit unsigned integer ke bits ulta karo.

[Reverse Bits](https://leetcode.com/problems/reverse-bits/)

```js
// Hinglish: bit hatana — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-bits/
function reverseBits(n) {
  // Hinglish: har bit utha ke result me aage daalo
  let res=0;
  for(let i=0;i<32;i++){
    res = (res<<1) | (n & 1); // Hinglish: last bit lo, left shift
    n >>>= 1; // Hinglish: unsigned shift
  }
  return res >>> 0;
}
```

## Hamming Distance

Do numbers me kitne bits alag? XOR karke set bits gino.

[Hamming Distance](https://leetcode.com/problems/hamming-distance/)

```js
// Hinglish: bit hatana — ek-ek step comment dekho
// LC: https://leetcode.com/problems/hamming-distance/
function hammingDistance(x, y) {
  // Hinglish: XOR me 1 = alag
  let z = x ^ y, cnt=0;
  while(z){ z &= z-1; cnt++; } // Hinglish: ek 1 hataya
  return cnt;
}
```
