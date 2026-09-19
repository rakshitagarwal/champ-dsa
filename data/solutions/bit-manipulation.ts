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
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
    
    let map = {};
    
    for(let a of arr){
        let count = numberOfOnes(a);
        map[a] = count;
    }
    
    //sort based on map first otherwise sort based on ascending order of the integers
    return arr.sort((a,b) => map[a]-map[b] || a-b);
    
};

function numberOfOnes(n){
    let count = 0;
    
    while(n !== 0){
        count += n & 1;
        n = n >>> 1;
    }
    
    return count;
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "counting-bits",
      title: "Counting Bits",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=wFGzEve9woc&t=259s&ab_channel=AlgoJS",
      body: `Har number ke 1-bits \`&\` aur \`>>>\` se gino.

[Counting Bits](https://leetcode.com/problems/counting-bits/)

\`\`\`js
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
\`\`\``
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
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {

    let carry;

    while(b!==0){
        carry = a&b;
        a = a ^ b;
        b = carry << 1;
    }

    return a;


};
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
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    
    if(n <= 0) return false;
    return (n & (n-1)) === 0;


}
\`\`\``,
    },
      ],
    },
  ],
};
