# Two Pointers

**Definition:** Two pointers me sequence par do indices lagate hain aur unhe sirf aage (ya ek dusre ki taraf) badhate hain, bina extra space ke `O(n)` me scan.

**When to use:** Sorted array pair sum, container with most water, duplicate hatana, ya center se expand karke palindrome. Agar sort karke current sum/value se decide kar sake kaunsa pointer badhana hai to yehi pattern.

**How it works:** Opposite-ends sorted/pair ke liye (jo side behtar jawab nahi de sakti use hatao); same-direction / center-expand palindrome ke liye. Kabhi peeche nahi — `O(n)`, `O(1)` space.

```js
// Two pointers skeleton — opposite ends (sorted array)
// Hinglish: sum dekho, chhota hai to left badhao, bada hai to right ghatao
let left = 0, right = arr.length - 1;
while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum === target) break;
  else if (sum < target) left++;
  else right--;
}

// Center-expand skeleton (palindrome)
// Hinglish: center se bahar failo jab tak match
for (let center = 0; center < n; center++) {
  let l = center, r = center; // odd; even ke liye (center, center+1)
  while (l >= 0 && r < n && s[l] === s[r]) { l--; r++; }
}
```
## Two Sum II

Sorted, so if the sum is too small I need a bigger left. Too big, smaller right. 1-based indexes on the return.

[Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

```js
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
```

## Longest Palindromic Substring

Every palindrome has a center. I expand while left and right match. Do it for odd (`i,i`) and even (`i,i+1`) centers. Keep the longest slice.

[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

```js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// Two pointers — expand around center
// LC: https://leetcode.com/problems/longest-palindromic-substring/
function longestPalindrome(s) {
  // Hinglish: step 1 — base case check karo
  let best = "";
  const grow = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return s.slice(l + 1, r);
  };
  for (let i = 0; i < s.length; i++) {
    const odd = grow(i, i);
    const even = grow(i, i + 1);
    const cur = odd.length > even.length ? odd : even;
    if (cur.length > best.length) best = cur;
  }
  return best;
}
```

## Trapping Rain Water

Water at `i` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

```js
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
```

## Container With Most Water

Do pointer, jo height chhoti usko move karo. Area = min(h[l],h[r]) * width, best rakho.

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

```js
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
```

## 3Sum

Sort karke har `i` ko fix karo, fir `l,r` se 2-sum dhoondo. Duplicate skip karo.

[3Sum](https://leetcode.com/problems/3sum/)

```js
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
```

## Valid Palindrome

String ko alphanum karke lower case, do pointer se palindrome check karo.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

```js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-palindrome/
function isPalindrome(s) {
  // Hinglish: sirf alphanum, lower
  s = s.toLowerCase().replace(/[^a-z0-9]/g,"");
  let l=0, r=s.length-1;
  while (l<r) {
    if (s[l]!==s[r]) return false; // Hinglish: mismatch to false
    l++; r--;
  }
  return true;
}
```
