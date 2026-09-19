import type { SolutionGroup } from "./types";

export const BIT_MANIPULATION_SOLUTIONS: SolutionGroup = {
  id: "bit-manipulation",
  title: "Bit Manipulation",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "number-of-1-bits",
      title: "Number of 1 Bits",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=KksDoeDaTbk&ab_channel=AlgoJS",
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
      id: 1,
      lcSlug: "missing-number",
      title: "Missing Number",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=kv6c9X00aik&ab_channel=AlgoJS",
      body: `XOR all indexes with all values. The missing index never cancels. Or \`n*(n+1)/2 - sum\`.

[Missing Number](https://leetcode.com/problems/missing-number/)

\`\`\`js
// Hinglish: XOR / bit hatana — ek-ek step comment dekho
// Bits — XOR index with value
// LC: https://leetcode.com/problems/missing-number/
function missingNumber(nums) {
  // Hinglish: step 1 — base case check karo
  let x = nums.length;
  for (let i = 0; i < nums.length; i++) x ^= i ^ nums[i];
  return x;
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "reverse-bits",
      title: "Reverse Bits",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=dbqqDHtv_Ms&ab_channel=AlgoJS",
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
      id: 3,
      lcSlug: "sort-integers-by-the-number-of-1-bits",
      title: "Sort Integers By Number of 1 Bits",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=QTjeR1mPlS4&ab_channel=AlgoJS",
      body: `Bits gino, us se sort karo — barabar hon to value se todo.

[Sort Integers By Number of 1 Bits](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/)

\`\`\`js
// Hinglish: bits gin ke sort — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/
function sortByBits(arr) {
  // Hinglish: step 1 — bit counter lo
  const bits = (x) => {
    let c = 0;
    while (x > 0) { c += x & 1; x >>= 1; } // Hinglish: aakhri bit dekho
    return c;
  };
  arr.sort((a, b) => {
    const d = bits(a) - bits(b);
    return d !== 0 ? d : a - b; // Hinglish: pehle bits, phir value
  });
  return arr;
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "counting-bits",
      title: "Counting Bits",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=wFGzEve9woc&t=259s&ab_channel=AlgoJS",
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
      id: 5,
      lcSlug: "sum-of-two-integers",
      title: "Sum of Two Integers",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=6vETcY7qfEo&ab_channel=AlgoJS",
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
      id: 6,
      lcSlug: "power-of-two",
      title: "Power of Two",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Pd8tUeJw_TA&ab_channel=AlgoJS",
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
      ],
    },
  ],
};
