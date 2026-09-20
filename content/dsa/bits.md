# Bit Manipulation

**Definition:** Bit manipulation works directly on binary. Each integer is a pack of 32/64 flags. Core identities: `a ^ a = 0`, `a ^ 0 = a`, `n & (n - 1)` clears the lowest set bit, `n & -n` isolates that bit.

**When to use:** "Every number appears twice except one", counting set bits, power-of-two checks, missing number, or `O(1)` space flags / subsets.

**How it works:** XOR cancels pairs; a `n & (n-1)` loop counts bits in `O(popcount)`; bit DP often uses `dp[i] = dp[i>>1] + (i&1)`. Time `O(n)` or `O(1)` per op; space often `O(1)`.

## Study notes

- **Cheat identities:** `x^x=0`, `x^0=x`, `n&(n-1)` clear lowest 1, `(n&(n-1))===0` (+ `n>0`) ⇒ power of two.
- **JS:** `>>>` unsigned right shift; `|0` / `>>>0` for 32-bit.
- **XOR trick:** single number, missing number (index^value).
- **Traps:** signed `>>` vs `>>>`; forget `n>0` for power of two.
- **Checklist:** need count bits, cancel pairs, or flags?

## Active revision

1. Recite XOR / clear-lowest-1 / power-of-two checks from memory.
2. Explain Single Number and Missing Number with one XOR pass.
3. Reconstruct Single Number II bit-by-bit with counts mod 3.

**Blank checklist:** pairs cancel? need popcount? signed shift trap?

## Decision table

| If you see… | Likely move |
|-------------|-------------|
| One unique among duplicates | XOR all |
| Count / list set bits | `n&(n-1)` or shift loop |
| Exactly one bit set | `n>0 && (n&(n-1))===0` |
| Missing in `0..n` | XOR index^value or sum formula |
| Every value ×3 except one | Count each bit mod 3 |

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
// Time: O(n) · Space: O(n)
// Bits — XOR cancels pairs
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
// Time: O(1) · Space: O(1)
// count set bits with & / >>>
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0;
    
    while(n !== 0){
        let isOne = n & 1;
        if(isOne === 1) count++;
        
        n = n >>> 1;
    }
    
    return count;
};
```

## Counting Bits

`dp[i] = dp[i >> 1] + (i & 1)`. Even is the same as i/2. Odd is one extra 1.

[Counting Bits](https://leetcode.com/problems/counting-bits/)

```js
// Time: O(n) · Space: O(n)
// for each i, count 1-bits with & 1 and >>>
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {

    let result = [];

    for(let i = 0; i <= n; i++){
        result.push(numberOfOnes(i));
    }

    return result;

};

function numberOfOnes(n){
    let count = 0;

    while(n !== 0){
        count += n & 1;
        n = n >>> 1;
    }

    return count;
}
```

## Missing Number

XOR all indexes with all values. The missing index never cancels. Or `n*(n+1)/2 - sum`.

[Missing Number](https://leetcode.com/problems/missing-number/)

```js
// Time: O(n) · Space: O(1)
// XOR index^value; missing index remains
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let xor = nums.length;
    
    for(let i = 0; i < nums.length; i++){
        xor = xor ^ i ^ nums[i];
    }
    
    return xor;
};
```

## Power of Two

Positive, and only one bit set: `n > 0 && (n & (n - 1)) === 0`.

[Power of Two](https://leetcode.com/problems/power-of-two/)

```js
// Time: O(1) · Space: O(1)
// exactly one bit set (and n > 0)
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    
    if(n <= 0) return false;
    return (n & (n-1)) === 0;


}
```

## Single Number II

Every number appears three times except one. Rebuild the answer from bit counts mod 3.

[Single Number II](https://leetcode.com/problems/single-number-ii/)

```js
// Time: O(n) · Space: O(n)
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

Reverse all 32 bits of an unsigned integer.

[Reverse Bits](https://leetcode.com/problems/reverse-bits/)

```js
// Time: O(1) · Space: O(1)
// take LSB, place toward MSB side
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let result = 0;
    
    for(let i = 0; i < 32; i++){
        let lastBit = n & 1;
        
        let revBit = lastBit << (31-i);
        
        result = result | revBit;
        
        n = n >>> 1;
        
    }
    
    return result >>> 0;
    
};
```

## Hamming Distance

How many bits differ between two numbers? XOR, then count set bits.

[Hamming Distance](https://leetcode.com/problems/hamming-distance/)

```js
// Time: O(n) · Space: O(n)
function hammingDistance(x, y) {
  // XOR in 1 = alag
  let z = x ^ y, cnt=0;
  while(z){ z &= z-1; cnt++; } // clear one set bit per iteration
  return cnt;
}
```
