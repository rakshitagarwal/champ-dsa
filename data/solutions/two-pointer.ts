import type { SolutionGroup } from "./types";

export const TWO_POINTER_SOLUTIONS: SolutionGroup = {
  id: "two-pointer",
  title: "Two Pointer",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "palindrome-number",
      title: "Palindrome Number",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=S2oEie9eG1o&ab_channel=AlgoJS",
      body: `Aadha ulta karo — ulta aadha se bada-barabar ho to palindrome hai. Overflow ka dar nahi.

[Palindrome Number](https://leetcode.com/problems/palindrome-number/)

\`\`\`js
// Hinglish: aadha palto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/palindrome-number/
function isPalindrome(x) {
  // Hinglish: step 1 — negative aur zero-end hatao
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let rev = 0;
  while (x > rev) {
    rev = rev * 10 + (x % 10); // Hinglish: peeche jodo
    x = Math.floor(x / 10); // Hinglish: aage ghatao
  }
  return x === rev || x === Math.floor(rev / 10); // Hinglish: odd me beech wala extra
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "move-zeroes",
      title: "Move Zeroes",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=CKqh1MD2n-E&ab_channel=AlgoJS",
      body: `Copy every non-zero forward. Then fill the tail with zeroes. Order of the real numbers stays.

[Move Zeroes](https://leetcode.com/problems/move-zeroes/)

\`\`\`js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — compact then fill
// LC: https://leetcode.com/problems/move-zeroes/
function moveZeroes(nums) {
  // Hinglish: step 1 — base case check karo
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) nums[write++] = nums[read];
  }
  while (write < nums.length) nums[write++] = 0;
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "valid-palindrome-ii",
      title: "Valid Palindrome II",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=tPtuwzTJEJY&ab_channel=AlgoJS",
      body: `Ek delete ki chhoot hai — mismatch pe dono option try karo (left skip ya right skip), helper se check karo.

[Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/)

\`\`\`js
// Hinglish: ek delete allowed — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-palindrome-ii/
function validPalindrome(s) {
  // Hinglish: step 1 — range check helper
  const isPal = (l, r) => {
    while (l < r) { if (s[l] !== s[r]) return false; l++; r--; }
    return true;
  };
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return isPal(l + 1, r) || isPal(l, r - 1); // Hinglish: ek hatao
    l++; r--;
  }
  return true;
}
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "container-with-most-water",
      title: "Container With Most Water",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=-YdNcZIdJUo&t=88s&ab_channel=AlgoJS",
      body: `Do pointer, jo height chhoti usko move karo. Area = min(h[l],h[r]) * width, best rakho.

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

\`\`\`js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/container-with-most-water/
function maxArea(height) {
  // Hinglish: dono end se start
  let l=0, r=height.length-1, best=0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l); // Hinglish: current area
    best = Math.max(best, area);
    if (height[l] < height[r]) l++; // Hinglish: chhoti height hatayi, badi ka chance
    else r--;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "3sum",
      title: "3Sum",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=2sgT3XXdWEQ&t=1s&ab_channel=AlgoJS",
      body: `Sort karke har \`i\` ko fix karo, fir \`l,r\` se 2-sum dhoondo. Duplicate skip karo.

[3Sum](https://leetcode.com/problems/3sum/)

\`\`\`js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/3sum/
function threeSum(nums) {
  // Hinglish: pehle sort
  nums.sort((a,b)=>a-b);
  const ans=[];
  for (let i=0;i<nums.length-2;i++) {
    if (i>0 && nums[i]===nums[i-1]) continue; // Hinglish: duplicate i skip
    let l=i+1, r=nums.length-1;
    while (l<r) {
      const sum = nums[i]+nums[l]+nums[r];
      if (sum===0) { ans.push([nums[i],nums[l],nums[r]]); l++; r--; while(l<r && nums[l]===nums[l-1]) l++; while(l<r && nums[r]===nums[r+1]) r--; } // Hinglish: mila to dono move + duplicate skip
      else if (sum<0) l++; // Hinglish: chhota to left badhao
      else r--;
    }
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "two-sum-ii-input-array-is-sorted",
      title: "Two Sum II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=jTQYyMYcTxo&ab_channel=AlgoJS",
      body: `Sorted, so if the sum is too small I need a bigger left. Too big, smaller right. 1-based indexes on the return.

[Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

\`\`\`js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// Two pointers — opposite ends
// LC: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) { // Hinglish: do pointer chalao
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++; // Hinglish: left badhao
    else right--; // Hinglish: right ghatao
  }
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "4sum",
      title: "4Sum",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=fRJ7TitfanE&ab_channel=AlgoJS",
      body: `3Sum jaisa, ek loop aur — i fix, phir j fix, phir l,r se 2-sum. Duplicate har level pe skip karo.

[4Sum](https://leetcode.com/problems/4sum/)

\`\`\`js
// Hinglish: do fix + two pointers — ek-ek step comment dekho
// LC: https://leetcode.com/problems/4sum/
function fourSum(nums, target) {
  // Hinglish: step 1 — sort karo
  nums.sort((a, b) => a - b);
  const out = [], n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Hinglish: duplicate skip
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1, r = n - 1;
      while (l < r) {
        const s = nums[i] + nums[j] + nums[l] + nums[r];
        if (s === target) {
          out.push([nums[i], nums[j], nums[l], nums[r]]);
          l++; r--;
          while (l < r && nums[l] === nums[l - 1]) l++; // Hinglish: duplicate skip
          while (l < r && nums[r] === nums[r + 1]) r--;
        } else if (s < target) l++;
        else r--;
      }
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "trapping-rain-water",
      title: "Trapping Rain Water",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=8cqpkCreiwM&ab_channel=AlgoJS",
      body: `Water at \`i\` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

\`\`\`js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// Two pointers — water limited by the shorter wall
// LC: https://leetcode.com/problems/trapping-rain-water/
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) { // Hinglish: do pointer chalao
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++; // Hinglish: left badhao
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--; // Hinglish: right ghatao
    }
  }
  return water;
}
\`\`\``,
    },
      ],
    },
  ],
};
