import type { SolutionGroup } from "./types";

export const DYNAMIC_PROGRAMMING_SOLUTIONS: SolutionGroup = {
  id: "dynamic-programming",
  title: "Dynamic Programming",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "counting-bits",
      title: "Counting Bits",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=wFGzEve9woc&t=259s&ab_channel=AlgoJS",
      body: `Offset = last power of 2. \`dp[i] = 1 + dp[i - offset]\`.

[Counting Bits](https://leetcode.com/problems/counting-bits/)

\`\`\`js
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {

    let dp = new Array(n+1).fill(0);

    let offset = 1;

    for(let i = 1; i <= n; i++){

        if(offset*2 === i) offset = i;

        dp[i] = 1 + dp[i-offset];

    }

    return dp;

};
\`\`\``
    },
    {
      id: 1,
      lcSlug: "climbing-stairs",
      title: "Climbing Stairs",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Ifek5h5VqJw&ab_channel=AlgoJS",
      body: `Ways to reach i = ways to i-1 + ways to i-2.

[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

\`\`\`js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let dp = [];
    dp[1] = 1;
    dp[2] = 2;

    for(let i = 3; i<=n; i++){

        //optimal substructure
        dp[i] = dp[i-1] + dp[i-2];

    }

    return dp[n];


};
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "maximum-subarray",
      title: "Maximum Subarray",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=S-5nVIHXHv0&t=198s&ab_channel=AlgoJS",
      body: `Kadane: keep a running sum. If it goes negative, drop it and start at the next number. Track the best running sum. Negatives are allowed — start \`best\` at \`-Infinity\`.

[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

\`\`\`js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {

    let currMax = nums[0];
    let maxima = nums[0];

    for(let i = 1; i < nums.length; i++){

        currMax = Math.max(nums[i], currMax + nums[i]);
        maxima = Math.max(maxima, currMax);

    }

    return maxima;

};
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "coin-change",
      title: "Coin Change",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=mSdNNaG5oPc&ab_channel=AlgoJS",
      body: `\`dp[a]\` = fewest coins to make amount a. Try each coin. Unbounded, so inner loop can reuse a coin.

[Coin Change](https://leetcode.com/problems/coin-change/)

\`\`\`js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let dp = Array(amount+1).fill(Infinity);
    
    //base case
    dp[0] = 0;
    
    for(let curAmount = 1; curAmount<=amount; curAmount++){
        for(let coin of coins){
            if(curAmount - coin >= 0){
                dp[curAmount] = Math.min(dp[curAmount], 1 + dp[curAmount - coin])
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
};
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "house-robber",
      title: "House Robber",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Q_nBUVnfcD8&ab_channel=AlgoJS",
      body: `At each house: rob it (then I skipped the previous) or skip it. Two variables are enough.

[House Robber](https://leetcode.com/problems/house-robber/)

\`\`\`js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {

    if(nums.length === 0) return 0;
    if(nums.length === 1) return nums[0];

    let dp = Array(nums + 1).fill(0);

    //base cases
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for(let i = 2; i < nums.length; i++){

        dp[i] = Math.max(nums[i]+dp[i-2], dp[i-1]);
    }

    return dp[dp.length-1];


};
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "jump-game",
      title: "Jump Game",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=ckwPxNG9xeA&ab_channel=AlgoJS",
      body: `I track the farthest index I can still reach. If I walk past that, I am stuck.

[Jump Game](https://leetcode.com/problems/jump-game/)

\`\`\`js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let target = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (i + nums[i] >= target) {
            target = i;
        }
    }
    return target === 0;
};
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "unique-paths",
      title: "Unique Paths",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=1wkCYXtYtt4&ab_channel=AlgoJS",
      body: `Only right and down. \`dp[c] += dp[c - 1]\` while scanning a row.

[Unique Paths](https://leetcode.com/problems/unique-paths/)

\`\`\`js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let dp = Array.from(Array(m), () => new Array(n));
    
    for(let i = 0; i < dp.length; i++) dp[i][0] = 1;
    for(let i = 0; i < dp[0].length; i++) dp[0][i] = 1;
    
    for(let i = 1; i < dp.length; i++){
        for(let j = 1; j < dp[0].length; j++){
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
};
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "unique-paths-ii",
      title: "Unique Paths II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=zWVGgmwSY_o&ab_channel=AlgoJS",
      body: `Obstacle wali cell zero rakho — baaki upar+left jodo. Pehli row/col dhyan se bharo.

[Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)

\`\`\`js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    
    let dp = Array.from(Array(m), () => Array(n).fill(0));
    
    for(let i = 0; i < m; i++){
        if(obstacleGrid[i][0] === 1){
            dp[i][0] = 0;
            break;
        } else {
            dp[i][0] = 1;
        }
    }
    
    for(let j = 0; j < n; j++){
        if(obstacleGrid[0][j] === 1){
            dp[0][j] = 0;
            break;
        } else {
            dp[0][j] = 1;
        }
    }
    
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            if(obstacleGrid[i][j] === 1){
                dp[i][j] = 0;
            } else {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
    }
    
    return dp[m-1][n-1]
};
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "longest-common-subsequence",
      title: "Longest Common Subsequence",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=TvNXjAkVxT8&ab_channel=AlgoJS",
      body: `\`dp[i][j]\` = LCS of first i chars of text1 and first j of text2. Equal → diagonal + 1. Else max of skip either.

[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

\`\`\`js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    let m = text1.length;
    let n = text2.length;
    
    let dp = Array.from(Array(m+1), () => new Array(n+1).fill(0));
    
    for(let i = 1; i<=m; i++){
        for(let j = 1; j<=n; j++){
            
            if(text1[i-1] === text2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
};
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "combination-sum",
      title: "Combination Sum (DP)",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=ggorLkkuHcg&ab_channel=AlgoJS",
      body: `I may reuse the same coin, so I recurse on \`i\` not \`i + 1\`. Stop when remain is 0 (save) or negative.

[Combination Sum (DP)](https://leetcode.com/problems/combination-sum/)

\`\`\`js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {

    candidates.sort((a,b) => a-b);
    let dp = [[[]]];

    for(let sum = 0; sum <= target; sum++){
        dp[sum] = [];
        let combine = [];

        for(let i = 0; i < candidates.length && candidates[i] <= sum; i++){
            if(sum === candidates[i]){
                combine.push([candidates[i]]);
            } else {
                for(let prev of dp[sum-candidates[i]]){
                    if(candidates[i] >= prev[prev.length-1]){
                        combine.push([...prev, candidates[i]]);
                    }
                }
            }
        }
        dp[sum] = combine;
    }

    return dp[target];
};
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "longest-increasing-subsequence",
      title: "Longest Increasing Subsequence",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=IftXURT0kq4&ab_channel=AlgoJS",
      body: `\`dp[i]\` = LIS ending at i. Check all j < i. Patience-sort binary search is faster; the O(n²) loop is the one I can explain in an interview without sweating.

[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

\`\`\`js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {

    let dp = new Array(nums.length).fill(1);

    for(let i = 1; i<=nums.length; i++){
        for(let j=i; j>=0; j--){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);

};
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "delete-operation-for-two-strings",
      title: "Delete Operations For Two Strings",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=TI3DmfxXV2s&ab_channel=AlgoJS",
      body: `LCS nikalo, baaki delete karo — m+n-2*LCS hi jawab hai.

[Delete Operations For Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)

\`\`\`js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {

    let m = word1.length;
    let n = word2.length;

    let dp = Array.from(Array(m+1), () => new Array(n+1).fill(0));

    for(let i = 1; i<=word1.length; i++){
        for(let j = 1; j<=word2.length; j++){
            if(word1[i-1] === word2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    let commonChar = dp[m][n];

    return word1.length-commonChar + word2.length-commonChar

};
\`\`\``,
    },
    {
      id: 13,
      lcSlug: "maximum-product-subarray",
      title: "Maximum Product Subarray",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=tiglejZngzU&t=9s&ab_channel=AlgoJS",
      body: `Kadane jaisa, par negative palat deta hai — isliye max aur min dono track karo.

[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

\`\`\`js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    
    let prevMax = nums[0];
    let prevMin = nums[0];
    let result = nums[0];
    
    for(let i = 1; i < nums.length; i++){
        
        let currMax = Math.max(nums[i], nums[i]*prevMax, nums[i]*prevMin);
        let currMin = Math.min(nums[i], nums[i]*prevMax, nums[i]*prevMin);
        
        prevMax = currMax;
        prevMin = currMin;
        
        result = Math.max(result, currMax);
        
    }
    
    return result;
    
};
\`\`\``,
    },
    {
      id: 14,
      lcSlug: "decode-ways",
      title: "Decode Ways",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=-4CPPqI1-nA&ab_channel=AlgoJS",
      body: `\`dp[i]\` = ways to decode first i chars. One digit 1-9, or two digits 10-26.

[Decode Ways](https://leetcode.com/problems/decode-ways/)

\`\`\`js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {

    if(s[0] == '0') return 0;

    let dp = new Array(s.length+1).fill(0);

    dp[0] = 1;
    dp[1] = 1;

    for(let i = 2; i<=s.length; i++){

        let single = +s[i-1];
        let double = +(s[i-2] + s[i-1]);

        if(single >= 1 && single <= 9) dp[i] += dp[i-1];
        if(double >= 10 && double <= 26) dp[i] += dp[i-2];

    }

    return dp[s.length];

};
\`\`\``,
    },
    {
      id: 15,
      lcSlug: "house-robber-ii",
      title: "House Robber II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Wx0ola5-mJQ&ab_channel=AlgoJS",
      body: `Ghar gol me hain, pehla aur aakhri saath nahi loot sakte. Do cases: [0..n-2] aur [1..n-1] me se best.

[House Robber II](https://leetcode.com/problems/house-robber-ii/)

\`\`\`js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {

    if(nums.length === 1) return nums[0];
    if(nums.length === 2) return Math.max(nums[0], nums[1]);

    let dp1 = new Array(nums.length);
    let dp2 = new Array(nums.length);

    robTwice(0, nums.length-2, dp1, nums);
    robTwice(1, nums.length-1, dp2, nums);

    function robTwice(i, numsLen, dp, nums){
        dp[i] = nums[i];
        dp[i+1] = Math.max(dp[i], nums[i+1]);

        for(let j = i+2; j<=numsLen; j++){
            dp[j] = Math.max(dp[j-1], dp[j-2]+nums[j]);
        }
    }

    //dp1 [1,2,4, _]
    //dp2 [_, 2,3,3]

    return Math.max(dp1[nums.length-2], dp2[nums.length-1]);
};
\`\`\``,
    },
      ],
    },
  ],
};
