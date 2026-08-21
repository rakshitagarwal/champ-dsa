# Arrays

These are the “just walk the array” problems. Reverse, compact, rotate, or keep a running best sum. If I need a hash map, I am on the hashing page instead.

```js
// Array skeleton — read / write pointers
let write = 0;
for (let read = 0; read < arr.length; read++) {
  // maybe copy arr[read] into arr[write]
}
```

## Reverse String

Two ends, swap, walk in. Same as swapping two cups until they meet.

[Reverse String](https://leetcode.com/problems/reverse-string/)

```js
// Arrays — reverse in place
// LC: https://leetcode.com/problems/reverse-string/
function reverseString(s) {
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
// Arrays — compact then fill
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
// Arrays — reverse trick
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
// Arrays — Kadane
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
