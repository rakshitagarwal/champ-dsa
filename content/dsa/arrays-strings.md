# Arrays

**Definition:** Array ek contiguous memory structure hai — saare elements ek line me store hote hain aur index se `O(1)` me access milta hai. String bhi bas characters ka array hai.

**When to use:** Jab array ko in-place badalna ho — reverse karna, rotate karna, zeroes/duplicate hatana, ya running sum / Kadane se best subarray nikalna ho. Agar key se yaad rakhna hai to ye page nahi, Hashing wala page dekho.

**How it works:** Read/write pointer ya do-pointer (left-right) se ek hi scan me kaam ho jata hai, har element 1-2 baar visit hota hai. Time `O(n)`, extra space `O(1)`.

```js
// Array skeleton — read / write pointer (in-place filter)
// advance write only when we keep the element
let write = 0;
for (let read = 0; read < arr.length; read++) {
  if (shouldKeep(arr[read])) arr[write++] = arr[read]; // rakhna is true to copy 
}
// arr.length = write (ya tail fill )

// Do-pointer skeleton (reverse / swap)
// swap from both ends until pointers meet
let l = 0, r = arr.length - 1;
while (l < r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]; // swap
  l++; r--;
}

// Running best skeleton (Kadane)
// restart subarray at x, or extend the running sum?
let run = 0, best = -Infinity;
for (const x of arr) {
  run = Math.max(x, run + x); // best ending here: fresh start vs extend
  best = Math.max(best, run);
}
```
## Reverse String

Two ends, swap, walk in. Same as swapping two cups until they meet.

[Reverse String](https://leetcode.com/problems/reverse-string/)

```js
// LC: https://leetcode.com/problems/reverse-string/
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) { // invariant: answer lies in [left, right]
    const tmp = s[left];
    s[left] = s[right];
    s[right] = tmp;
    left++; // shrink or move left pointer rightward
    right--; // move right pointer leftward
  }
}
```

## Move Zeroes

Copy every non-zero forward. Then fill the tail with zeroes. Order of the real numbers stays.

[Move Zeroes](https://leetcode.com/problems/move-zeroes/)

```js
// LC: https://leetcode.com/problems/move-zeroes/
function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) nums[write++] = nums[read];
  }
  while (write < nums.length) nums[write++] = 0;
}
```

## Rotate Array

`k %= n`. Reverse the whole array, reverse the first `k`, reverse the rest. That is rotate right.

[Rotate Array](https://leetcode.com/problems/rotate-array/)

```js
// LC: https://leetcode.com/problems/rotate-array/
function rotate(nums, k) {
  k %= nums.length;
  const rev = (l, r) => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  };
  rev(0, nums.length - 1);
  rev(0, k - 1);
  rev(k, nums.length - 1);
}
```

## Maximum Subarray

Kadane: keep a running sum. If it goes negative, drop it and start at the next number. Track the best running sum. Negatives are allowed — start `best` at `-Infinity`.

[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

```js
// LC: https://leetcode.com/problems/maximum-subarray/
function maxSubArray(nums) {
  let run = 0, best = -Infinity;
  for (const x of nums) {
    run = Math.max(x, run + x); // restart or continue
    best = Math.max(best, run);
  }
  return best;
}
```

## Best Time to Buy and Sell Stock

Ek baar kharido, ek baar becho. Sabse sasta kharido, sabse mehenga becho — ek scan me min price track karo.

[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

```js
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices) {
  // track cheapest buy price seen so far
  let best = 0, minPrice = Infinity;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p); // new minimum buy price
    best = Math.max(best, p - minPrice); // sell today — update best profit
  }
  return best;
}
```

## Remove Duplicates from Sorted Array

Sorted hai to duplicates bagal me honge. Write pointer se unique hi rakho, length return karo.

[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

```js
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
function removeDuplicates(nums) {
  // write marks end of unique prefix
  if (!nums.length) return 0;
  let write = 1;
  for (let read=1; read<nums.length; read++) {
    if (nums[read] !== nums[read-1]) nums[write++] = nums[read]; // append next distinct value
  }
  return write; // return new logical length
}
```

## Majority Element

Boyer-Moore voting — candidate rakho, count badhao/ghatao. End me candidate hi majority.

[Majority Element](https://leetcode.com/problems/majority-element/)

```js
// LC: https://leetcode.com/problems/majority-element/
function majorityElement(nums) {
  // Boyer–Moore majority voting
  let cand = 0, count = 0;
  for (const x of nums) {
    if (count===0) cand = x; // reset candidate when count hits zero
    count += (x===cand ? 1 : -1); // match candidate +1 else cancel one vote
  }
  return cand;
}
```

## Merge Sorted Array

Do sorted arrays, piche se bharo taaki overwrite na ho. `m+n` jagah pehle se hai.

[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

```js
// LC: https://leetcode.com/problems/merge-sorted-array/
function merge(nums1, m, nums2, n) {
  // merge from the back to avoid overwriting nums1
  let i=m-1, j=n-1, k=m+n-1;
  while (j>=0) {
    if (i>=0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--]; // place the larger tail element at the back
    else nums1[k--] = nums2[j--];
  }
}
```
