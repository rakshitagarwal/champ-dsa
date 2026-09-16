import type { SolutionGroup } from "./types";

export const BIT_MANIPULATION_SOLUTIONS: SolutionGroup = {
  id: "bit-manipulation",
  title: "Bit Manipulation",
  subs: [
    {
      title: "Core Bit Tricks",
      topics: [
    {
      id: 136,
      lcSlug: "single-number",
      title: "Single Number",
      diff: "Easy",
      body: `XOR everything. Pairs die. The leftover is the single number.

[Single Number](https://leetcode.com/problems/single-number/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 191,
      lcSlug: "number-of-1-bits",
      title: "Number of 1 Bits",
      diff: "Easy",
      body: `While n is not 0, drop the lowest 1 with \`n &= n - 1\` and count.

[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 338,
      lcSlug: "counting-bits",
      title: "Counting Bits",
      diff: "Easy",
      body: `\`dp[i] = dp[i >> 1] + (i & 1)\`. Even is the same as i/2. Odd is one extra 1.

[Counting Bits](https://leetcode.com/problems/counting-bits/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 190,
      lcSlug: "reverse-bits",
      title: "Reverse Bits",
      diff: "Easy",
      body: `Reverse all 32 bits of the unsigned input — shift result left and pull bits off the right of n each step.

[Reverse Bits](https://leetcode.com/problems/reverse-bits/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 371,
      lcSlug: "sum-of-two-integers",
      title: "Sum of Two Integers",
      diff: "Medium",
      body: `Add without \`+\`: XOR gives sum without carry; AND shifted left is carry — repeat until carry is zero.

[Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)

\`\`\`js
// LC: https://leetcode.com/problems/sum-of-two-integers/
function getSum(a, b) {
  while (b !== 0) {
    // Positions where both have 1 become carry
    const carry = (a & b) << 1;
    // XOR gives sum without carry
    a = a ^ b;
    b = carry;
  }
  return a;
}
\`\`\``,
    },
    {
      id: 201,
      lcSlug: "bitwise-and-of-numbers-range",
      title: "Bitwise AND of Numbers Range",
      diff: "Medium",
      body: `AND of a range equals the shared binary prefix of left and right — shift both right until equal, then shift back.

[Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range/)

\`\`\`js
// LC: https://leetcode.com/problems/bitwise-and-of-numbers-range/
function rangeBitwiseAnd(left, right) {
  let shift = 0;
  // AND of range equals common prefix of left and right in binary
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  // Restore prefix bits we shifted away
  return left << shift;
}
\`\`\``,
    },
    {
      id: 231,
      lcSlug: "power-of-two",
      title: "Power of Two",
      diff: "Easy",
      body: `Positive, and only one bit set: \`n > 0 && (n & (n - 1)) === 0\`.

[Power of Two](https://leetcode.com/problems/power-of-two/)

\`\`\`js
// Bits — single bit
// LC: https://leetcode.com/problems/power-of-two/
function isPowerOfTwo(n) {
  // Zero and negatives are not powers of two
  // Single-bit numbers have no other 1s after clearing lowest bit
  return n > 0 && (n & (n - 1)) === 0;
}
\`\`\``,
    },
    {
      id: 342,
      lcSlug: "power-of-four",
      title: "Power of Four",
      diff: "Easy",
      body: `Must be a power of two, and the set bit must sit on an even index — check \`(n & 0x55555555)\` after the usual power-of-two test.

[Power of Four](https://leetcode.com/problems/power-of-four/)

\`\`\`js
// LC: https://leetcode.com/problems/power-of-four/
function isPowerOfFour(n) {
  // Must be a single set bit (power of two)
  if (n <= 0 || (n & (n - 1)) !== 0) return false;
  // 0x55555555 = bits at even positions; power of 4 hits those
  return (n & 1431655765) !== 0;
}
\`\`\``,
    },
    {
      id: 137,
      lcSlug: "single-number-ii",
      title: "Single Number II",
      diff: "Medium",
      body: `Every value appears three times except one — rebuild the answer bit by bit using counts mod 3 per bit position.

[Single Number II](https://leetcode.com/problems/single-number-ii/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 260,
      lcSlug: "single-number-iii",
      title: "Single Number III",
      diff: "Medium",
      body: `XOR all numbers to get \`a ^ b\`. Isolate any set bit in that XOR to split into two groups; XOR each group for the two uniques.

[Single Number III](https://leetcode.com/problems/single-number-iii/)

\`\`\`js
// LC: https://leetcode.com/problems/single-number-iii/
function singleNumber(nums) {
  let x = 0;
  // XOR all — pairs vanish, x = u ^ v for the two uniques
  for (const v of nums) x ^= v;
  // Isolate one differing bit between u and v
  const diff = x & -x;
  let a = 0, b = 0;
  for (const v of nums) {
    // Partition by that bit; XOR within each group
    if (v & diff) a ^= v;
    else b ^= v;
  }
  return [a, b];
}
\`\`\``,
    },
      ],
    },
  ],
};
