# Two Pointers

**Definition:** Two pointers me sequence par do indices lagate hain aur unhe sirf aage (ya ek dusre ki taraf) badhate hain, bina extra space ke `O(n)` me scan.

**When to use:** Sorted array pair sum, container with most water, duplicate hatana, ya center se expand karke palindrome. Agar sort karke current sum/value se decide kar sake kaunsa pointer badhana hai to yehi pattern.

**How it works:** Opposite-ends sorted/pair ke liye (jo side behtar jawab nahi de sakti use hatao); same-direction / center-expand palindrome ke liye. Kabhi peeche nahi — `O(n)`, `O(1)` space.

## Study notes

- **3 flavors:** (1) opposite ends on sorted, (2) slow/fast same direction (remove dups / middle), (3) expand around center (palindrome).
- **Move rule:** sum too small → `left++`; too big → `right--`. Never both blindly.
- **Vs sliding window:** two pointers often *not* maintaining a "window validity" map — just a decision from ends/center.
- **Traps:** unsorted input for pair-sum (sort pehle, ya hashing); infinite loop if pointer na badhe; 3Sum me skip duplicates.
- **Checklist:** sorted? what makes left/right move? indices 0- or 1-based return?

```js
// Two pointers skeleton — opposite ends (sorted array)
// compare sum to target; move left if too small, right if too large
let left = 0, right = arr.length - 1;
while (left < right) { // invariant: answer lies in [left, right]
  const sum = arr[left] + arr[right];
  if (sum === target) break;
  else if (sum < target) left++;
  else right--;
}

// Center-expand skeleton (palindrome)
// expand outward while characters match
for (let center = 0; center < n; center++) {
  let l = center, r = center; // odd; even-length centers use (center, center+1)
  while (l >= 0 && r < n && s[l] === s[r]) { l--; r++; }
}
```
## Two Sum II

Sorted, so if the sum is too small I need a bigger left. Too big, smaller right. 1-based indexes on the return.

[Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

```js
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
```

## Longest Palindromic Substring

Every palindrome has a center. I expand while left and right match. Do it for odd (`i,i`) and even (`i,i+1`) centers. Keep the longest slice.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

```js
// Time: O(n²) · Space: O(1)
var longestPalindrome = function(s) {
  let longest = "";

  function isPal(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return s.slice(left + 1, right);
  }

  for (let i = 0; i < s.length; i++) {
    let oddPal = isPal(s, i, i);
    let evenPal = isPal(s, i, i + 1);

    let longestPal = oddPal.length > evenPal.length ? oddPal : evenPal;

    if (longestPal.length > longest.length) {
      longest = longestPal;
    }
  }

  return longest;
};
```

## Trapping Rain Water

Water at `i` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

```js
// Time: O(n) · Space: O(1)
// water = min(leftMax,rightMax) - height
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
```

## Container With Most Water

Move the pointer at the shorter wall — only that side can improve area. Track `min(h[l], h[r]) * width`.

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

```js
// Time: O(n) · Space: O(1)
// area = min(h)*width; move shorter side
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
```

## 3Sum

Sort, fix index `i`, then two-pointer 2-sum on the rest. Skip duplicate triplets.

[3Sum](https://leetcode.com/problems/3sum/)

```js
// Time: O(n²) · Space: O(1)
// sort + fix i; two pointers for the pair
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
```

## Valid Palindrome

Keep only letters and digits, lowercase, then two pointers from both ends.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

```js
// Time: O(n) · Space: O(1)
// two pointers; skip non-alnum
var isPalindrome = function(s) {
  let cleanStr = cleanUp(s);
  return isPal(cleanStr);
};

function cleanUp(str) {
  let char = "abcdefghijklmnopqrstuvwxyz0123456789";
  let newS = "";

  for (let i = 0; i < str.length; i++) {
    let lCase = str[i].toLowerCase();

    if (char.indexOf(lCase) !== -1) {
      newS += lCase;
    }
  }

  return newS;
}

function isPal(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```
