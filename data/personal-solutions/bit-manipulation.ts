import type { SolutionGroup } from "@/data/solutions/types";

export const BIT_MANIPULATION_SOLUTIONS: SolutionGroup = {
  id: "bit-manipulation",
  title: "Bit Manipulation",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 136,
      lcSlug: "single-number",
      title: "Single Number",
      diff: "Easy",
      body: "XOR sab — duplicates cancel, leftover = single.\n\n[Single Number](https://leetcode.com/problems/single-number/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar singleNumber = function(nums) {\n  return nums.reduce((a, b) => a ^ b, 0);\n};\n```",
    },
    {
      id: 191,
      lcSlug: "number-of-1-bits",
      title: "Number of 1 Bits",
      diff: "Easy",
      body: "While n is not 0, drop the lowest 1 with `n &= n - 1` and count.\n\n[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)\n\n```js\n// Time: O(1) · Space: O(1)\n/**\n * @param {number} n - a positive integer\n * @return {number}\n */\nvar hammingWeight = function(n) {\n    let count = 0;\n    \n    while(n !== 0){\n        let isOne = n & 1;\n        if(isOne === 1) count++;\n        \n        n = n >>> 1;\n    }\n    \n    return count;\n};\n```",
    },
    {
      id: 338,
      lcSlug: "counting-bits",
      title: "Counting Bits",
      diff: "Easy",
      body: "Offset = last power of 2. `dp[i] = 1 + dp[i - offset]`.\n\n[Counting Bits](https://leetcode.com/problems/counting-bits/)\n\n```js\n// Time: O(n) · Space: O(n)\n/**\n * @param {number} n\n * @return {number[]}\n */\nvar countBits = function(n) {\n\n    let dp = new Array(n+1).fill(0);\n\n    let offset = 1;\n\n    for(let i = 1; i <= n; i++){\n\n        if(offset*2 === i) offset = i;\n\n        dp[i] = 1 + dp[i-offset];\n\n    }\n\n    return dp;\n\n};\n````\n    },\n    {\n      id: 1,\n      lcSlug: \"climbing-stairs\",\n      title: \"Climbing Stairs\",\n      diff: \"Easy\",\n    solutionUrl: \"https://www.youtube.com/watch?v=Ifek5h5VqJw&ab_channel=AlgoJS\",\n      body: `Ways to reach i = ways to i-1 + ways to i-2.\n\n[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)\n\n```js\n// Time: O(n) · Space: O(n)\n/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    let dp = [];\n    dp[1] = 1;\n    dp[2] = 2;\n\n    for(let i = 3; i<=n; i++){\n\n        //optimal substructure\n        dp[i] = dp[i-1] + dp[i-2];\n\n    }\n\n    return dp[n];\n\n\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 268,
      lcSlug: "missing-number",
      title: "Missing Number",
      diff: "Easy",
      body: "XOR all indexes with all values. The missing index never cancels. Or `n*(n+1)/2 - sum`.\n\n[Missing Number](https://leetcode.com/problems/missing-number/)\n\n```js\n// Time: O(n) · Space: O(1)\n/**\n * @param {number[]} nums\n * @return {number}\n */\nvar missingNumber = function(nums) {\n    let xor = nums.length;\n    \n    for(let i = 0; i < nums.length; i++){\n        xor = xor ^ i ^ nums[i];\n    }\n    \n    return xor;\n};\n```",
    },
    {
      id: 190,
      lcSlug: "reverse-bits",
      title: "Reverse Bits",
      diff: "Easy",
      body: "32-bit unsigned integer ke bits ulta karo.\n\n[Reverse Bits](https://leetcode.com/problems/reverse-bits/)\n\n```js\n// Time: O(1) · Space: O(1)\n/**\n * @param {number} n - a positive integer\n * @return {number} - a positive integer\n */\nvar reverseBits = function(n) {\n    let result = 0;\n    \n    for(let i = 0; i < 32; i++){\n        let lastBit = n & 1;\n        \n        let revBit = lastBit << (31-i);\n        \n        result = result | revBit;\n        \n        n = n >>> 1;\n        \n    }\n    \n    return result >>> 0;\n    \n};\n```",
    },
    {
      id: 371,
      lcSlug: "sum-of-two-integers",
      title: "Sum of Two Integers",
      diff: "Medium",
      body: "XOR = sum without carry, AND<<1 = carry — loop until carry 0.\n\n[Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)\n\n```js\n// Time: O(1) · Space: O(1)\nvar getSum = function(a, b) {\n  while (b !== 0) {\n    const carry = (a & b) << 1;\n    a = a ^ b;\n    b = carry;\n  }\n  return a;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 137,
      lcSlug: "single-number-ii",
      title: "Single Number II",
      diff: "Medium",
      body: "Bit counts mod 3 — ya ones/twos bit masks.\n\n[Single Number II](https://leetcode.com/problems/single-number-ii/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar singleNumber = function(nums) {\n  let ones = 0, twos = 0;\n  for (const n of nums) {\n    ones = (ones ^ n) & ~twos;\n    twos = (twos ^ n) & ~ones;\n  }\n  return ones;\n};\n```",
    },
      ],
    },
  ],
};
