# Arrays

**Definition:** Array ek contiguous memory structure hai — saare elements ek line me store hote hain aur index se `O(1)` me access milta hai. String bhi bas characters ka array hai.

**When to use:** Jab array ko in-place badalna ho — reverse karna, rotate karna, zeroes/duplicate hatana, ya running sum / Kadane se best subarray nikalna ho. Agar key se yaad rakhna hai to ye page nahi, Hashing wala page dekho.

**How it works:** Read/write pointer ya do-pointer (left-right) se ek hi scan me kaam ho jata hai, har element 1-2 baar visit hota hai. Time `O(n)`, extra space `O(1)`.

```js
// Array skeleton — read / write pointer (in-place filter)
// Hinglish: write tabhi badhao jab element rakhna hai
let write = 0;
for (let read = 0; read < arr.length; read++) {
  if (shouldKeep(arr[read])) arr[write++] = arr[read]; // rakhna hai to copy karo
}
// arr.length = write  (ya tail fill karo)

// Do-pointer skeleton (reverse / swap)
// Hinglish: dono end se beech tak swap karo
let l = 0, r = arr.length - 1;
while (l < r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]; // swap
  l++; r--;
}

// Running best skeleton (Kadane)
// Hinglish: naya start karu ya purana sum continue karu?
let run = 0, best = -Infinity;
for (const x of arr) {
  run = Math.max(x, run + x); // naya ya continue
  best = Math.max(best, run);
}
```
## Reverse String

Two ends, swap, walk in. Same as swapping two cups until they meet.

[Reverse String](https://leetcode.com/problems/reverse-string/)

```js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — reverse in place
// LC: https://leetcode.com/problems/reverse-string/
function reverseString(s) {
  // Hinglish: step 1 — base case check karo
  let left = 0, right = s.length - 1;
  while (left < right) {
    const tmp = s[left];
    s[left] = s[right];
    s[right] = tmp;
    left++;
    right--;
  }
}
```

## Move Zeroes

Copy every non-zero forward. Then fill the tail with zeroes. Order of the real numbers stays.

[Move Zeroes](https://leetcode.com/problems/move-zeroes/)

```js
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
```

## Rotate Array

`k %= n`. Reverse the whole array, reverse the first `k`, reverse the rest. That is rotate right.

[Rotate Array](https://leetcode.com/problems/rotate-array/)

```js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — reverse trick
// LC: https://leetcode.com/problems/rotate-array/
function rotate(nums, k) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// Arrays — Kadane
// LC: https://leetcode.com/problems/maximum-subarray/
function maxSubArray(nums) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices) {
  // Hinglish: sabse kam price yaad rakho
  let best = 0, minPrice = Infinity;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p); // Hinglish: sasta mila to update
    best = Math.max(best, p - minPrice); // Hinglish: bech ke dekho profit
  }
  return best;
}
```

## Remove Duplicates from Sorted Array

Sorted hai to duplicates bagal me honge. Write pointer se unique hi rakho, length return karo.

[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

```js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
function removeDuplicates(nums) {
  // Hinglish: write = unique ka end
  if (!nums.length) return 0;
  let write = 1;
  for (let read=1; read<nums.length; read++) {
    if (nums[read] !== nums[read-1]) nums[write++] = nums[read]; // Hinglish: naya unique mila to copy
  }
  return write; // Hinglish: naya length
}
```

## Majority Element

Boyer-Moore voting — candidate rakho, count badhao/ghatao. End me candidate hi majority.

[Majority Element](https://leetcode.com/problems/majority-element/)

```js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/majority-element/
function majorityElement(nums) {
  // Hinglish: vote karo
  let cand = 0, count = 0;
  for (const x of nums) {
    if (count===0) cand = x; // Hinglish: naya candidate
    count += (x===cand ? 1 : -1); // Hinglish: same to +1 warna -1
  }
  return cand;
}
```

## Merge Sorted Array

Do sorted arrays, piche se bharo taaki overwrite na ho. `m+n` jagah pehle se hai.

[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

```js
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/merge-sorted-array/
function merge(nums1, m, nums2, n) {
  // Hinglish: piche se bharo
  let i=m-1, j=n-1, k=m+n-1;
  while (j>=0) {
    if (i>=0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--]; // Hinglish: bada wala piche
    else nums1[k--] = nums2[j--];
  }
}
```
