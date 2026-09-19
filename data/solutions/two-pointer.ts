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
// Time: O(log n) · Space: O(1)
var isPalindrome = function(x) {
  if (x < 0) return false;

  x = x.toString();

  let left = 0;
  let right = x.length - 1;

  while (left < right) {
    if (x[left] !== x[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};
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
// Time: O(n) · Space: O(1)
// Arrays — compact then fill
var moveZeroes = function(nums) {
  let left = 0;
  let right = 0;

  while (right < nums.length) {
    if (nums[right] !== 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
    right++;
  }
};
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
// Time: O(n) · Space: O(1)
var validPalindrome = function(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return isPal(s, left + 1, right) || isPal(s, left, right - 1);
    }
    left++;
    right--;
  }

  return true;
};

function isPal(s, left, right) {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
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
// Time: O(n) · Space: O(1)
var maxArea = function(height) {
  let left = 0;
  let right = height.length - 1;
  let maxima = 0;

  while (left < right) {
    let width = right - left;
    let maxArea = Math.min(height[left], height[right]) * width;
    maxima = Math.max(maxima, maxArea);

    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxima;
};
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
// Time: O(n²) · Space: O(1)
var threeSum = function(nums) {
  if (nums.length === 0) return [];

  nums = nums.sort((a, b) => a - b);
  let res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // stop duplicates from occuring
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) {
        res.push([nums[i], nums[j], nums[k]]);
        // stop duplicates
        while (nums[j] === nums[j + 1]) j++;
        while (nums[k] === nums[k + 1]) k--;
        j++;
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        k--;
      }
    }
  }

  return res;
};
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
// Time: O(n) · Space: O(1)
// Two pointers — opposite ends
var twoSum = function(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1];
    } else if (numbers[left] + numbers[right] < target) {
      left++;
    } else {
      right--;
    }
  }
};
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
// Time: O(n³) · Space: O(1)
var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b);
  let res = [];

  if (nums.length < 4) return [];

  for (let i = 0; i < nums.length - 3; i++) {
    for (let j = i + 1; j < nums.length - 2; j++) {
      let k = j + 1;
      let l = nums.length - 1;

      while (k < l) {
        let sum = nums[i] + nums[j] + nums[k] + nums[l];

        if (sum === target) {
          res.push([nums[i], nums[j], nums[k], nums[l]]);
          while (nums[k] === nums[k + 1]) k++;
          while (nums[l] === nums[l - 1]) l--;
          k++;
          l--;
        } else if (sum < target) {
          k++;
        } else {
          l--;
        }
      }
      while (nums[j] === nums[j + 1]) j++;
    }
    while (nums[i] === nums[i + 1]) i++;
  }
  return res;
};
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
// Time: O(n) · Space: O(1)
// Two pointers — water limited by the shorter wall
var trap = function(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let trappedWater = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (height[left] < height[right]) {
      trappedWater += leftMax - height[left];
      left++;
    } else {
      trappedWater += rightMax - height[right];
      right--;
    }
  }

  return trappedWater;
};
\`\`\``,
    },
      ],
    },
  ],
};
