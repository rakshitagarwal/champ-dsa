# Two Pointers

**Definition:** Two pointers me sequence par do indices lagate hain aur unhe sirf aage (ya ek dusre ki taraf) badhate hain, bina extra space ke `O(n)` me scan.

**When to use:** Sorted array pair sum, container with most water, duplicate hatana, ya center se expand karke palindrome. Agar sort karke current sum/value se decide kar sake kaunsa pointer badhana hai to yehi pattern.

**How it works:** Opposite-ends sorted/pair ke liye (jo side behtar jawab nahi de sakti use hatao); same-direction / center-expand palindrome ke liye. Kabhi peeche nahi — `O(n)`, `O(1)` space.

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
// Sorted array → two pointers from both ends
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1; // start at extremes
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1]; // 1-based answer
    if (sum < target) left++; // need a larger value — move left rightward
    else right--; // need a smaller value — move right leftward
  }
}
```

## Longest Palindromic Substring

Every palindrome has a center. I expand while left and right match. Do it for odd (`i,i`) and even (`i,i+1`) centers. Keep the longest slice.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

```js
// LC: https://leetcode.com/problems/longest-palindromic-substring/
function longestPalindrome(s) {
  // Expand while chars match; return start index and length
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return [l + 1, r - l - 1];
  };
  let start = 0, len = 0;
  for (let i = 0; i < s.length; i++) {
    // Try odd-length (i,i) and even-length (i,i+1) centers
    for (const [st, ln] of [expand(i, i), expand(i, i + 1)]) {
      if (ln > len) { start = st; len = ln; }
    }
  }
  return s.slice(start, start + len);
}
```

## Trapping Rain Water

Water at `i` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

```js
// LC: https://leetcode.com/problems/trapping-rain-water/
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) { // Main two-pointer loop
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++; // shorter left wall — its max is binding; advance left
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--; // shorter right wall — process right side; advance right
    }
  }
  return water;
}
```

## Container With Most Water

Move the pointer at the shorter wall — only that side can improve area. Track `min(h[l], h[r]) * width`.

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

```js
// LC: https://leetcode.com/problems/container-with-most-water/
function maxArea(height) {
  // Start pointers at both ends of the array
  let l=0, r=height.length-1, best=0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l); // width × shorter height = water held now
    best = Math.max(best, area);
    if (height[l] < height[r]) l++; // drop the shorter wall — only that side can improve area
    else r--;
  }
  return best;
}
```

## 3Sum

Sort, fix index `i`, then two-pointer 2-sum on the rest. Skip duplicate triplets.

[3Sum](https://leetcode.com/problems/3sum/)

```js
// LC: https://leetcode.com/problems/3sum/
function threeSum(nums) {
  // sort so two-pointer / duplicate skip works
  nums.sort((a,b)=>a-b);
  const ans=[];
  for (let i=0;i<nums.length-2;i++) {
    if (i>0 && nums[i]===nums[i-1]) continue; // skip duplicate fixed first index
    let l=i+1, r=nums.length-1;
    while (l<r) {
      const sum = nums[i]+nums[l]+nums[r];
      if (sum===0) { ans.push([nums[i],nums[l],nums[r]]); l++; r--; while(l<r && nums[l]===nums[l-1]) l++; while(l<r && nums[r]===nums[r+1]) r--; } // found triplet — shrink both sides and skip duplicate l/r
      else if (sum<0) l++; // sum below zero — need a larger middle value
      else r--;
    }
  }
  return ans;
}
```

## Valid Palindrome

Keep only letters and digits, lowercase, then two pointers from both ends.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

```js
// LC: https://leetcode.com/problems/valid-palindrome/
function isPalindrome(s) {
  // normalize: lowercase letters and digits only
  s = s.toLowerCase().replace(/[^a-z0-9]/g,"");
  let l=0, r=s.length-1;
  while (l<r) {
    if (s[l]!==s[r]) return false; // characters differ — not a palindrome
    l++; r--;
  }
  return true;
}
```
