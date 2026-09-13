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
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — XOR cancels pairs
// LC: https://leetcode.com/problems/single-number/
function singleNumber(nums) {
  // Hinglish: step 1 — base case check karo
  let x = 0;
  for (const n of nums) x ^= n;
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
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — dp from half
// LC: https://leetcode.com/problems/counting-bits/
function countBits(n) {
  // Hinglish: step 1 — base case check karo
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
\`\`\``,
    },
    {
      id: 190,
      lcSlug: "reverse-bits",
      title: "Reverse Bits",
      diff: "Easy",
      body: `32-bit unsigned integer ke bits ulta karo.

[Reverse Bits](https://leetcode.com/problems/reverse-bits/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 371,
      lcSlug: "sum-of-two-integers",
      title: "Sum of Two Integers",
      diff: "Medium",
      body: `Bina + ke jodo — XOR jodta hai, AND carry nikalta hai, shift karke aage badhao.

[Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)

\`\`\`js
// Hinglish: bits se jod — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sum-of-two-integers/
function getSum(a, b) {
  // Hinglish: step 1 — carry jab tak hai chalao
  while (b !== 0) {
    const carry = (a & b) << 1; // Hinglish: dono 1 to carry
    a = a ^ b; // Hinglish: bina carry jod
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
      body: `Common prefix nikalo — dono ko right shift karte jao jab tak barabar na hon, phir wapas shift karo.

[Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range/)

\`\`\`js
// Hinglish: common prefix nikalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/bitwise-and-of-numbers-range/
function rangeBitwiseAnd(left, right) {
  // Hinglish: step 1 — shift gino
  let shift = 0;
  while (left < right) { left >>= 1; right >>= 1; shift++; } // Hinglish: farak mitate jao
  return left << shift; // Hinglish: wapas lagao
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
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — single bit
// LC: https://leetcode.com/problems/power-of-two/
function isPowerOfTwo(n) {
  // Hinglish: step 1 — base case check karo
  return n > 0 && (n & (n - 1)) === 0;
}
\`\`\``,
    },
    {
      id: 342,
      lcSlug: "power-of-four",
      title: "Power of Four",
      diff: "Easy",
      body: `Power of two ho aur 1 odd position pe ho (mask 0x55555555) — dono shartein lagao.

[Power of Four](https://leetcode.com/problems/power-of-four/)

\`\`\`js
// Hinglish: do shart lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/power-of-four/
function isPowerOfFour(n) {
  // Hinglish: step 1 — power of two check karo
  if (n <= 0 || (n & (n - 1)) !== 0) return false; // Hinglish: single bit hona chahiye
  return (n & 1431655765) !== 0; // Hinglish: 1 odd position pe hona chahiye
}
\`\`\``,
    },
    {
      id: 137,
      lcSlug: "single-number-ii",
      title: "Single Number II",
      diff: "Medium",
      body: `Har number 3 baar, ek single. Bits count mod 3 se nikalo.

[Single Number II](https://leetcode.com/problems/single-number-ii/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 260,
      lcSlug: "single-number-iii",
      title: "Single Number III",
      diff: "Medium",
      body: `XOR se alag bit nikalo — jahan farak hai wahan do groups banao, har group ka XOR jawab hai.

[Single Number III](https://leetcode.com/problems/single-number-iii/)

\`\`\`js
// Hinglish: farak se baanto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/single-number-iii/
function singleNumber(nums) {
  // Hinglish: step 1 — sabka XOR lo
  let x = 0;
  for (const v of nums) x ^= v;
  const diff = x & -x; // Hinglish: pehla alag bit pakdo
  let a = 0, b = 0;
  for (const v of nums) {
    if (v & diff) a ^= v; // Hinglish: group 1
    else b ^= v; // Hinglish: group 2
  }
  return [a, b];
}
\`\`\``,
    },
      ],
    },
  ],
};
