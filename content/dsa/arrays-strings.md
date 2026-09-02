# Arrays

**Definition:** An array (and a string, which is an array of characters) stores elements contiguously in memory with `O(1)` random access by index. Most array problems are about transforming the array *in place* without extra space — reordering, compacting, or scanning for an optimal subarray.

**When to use:** You need to reverse, rotate, remove duplicates/zeroes in place, or track a running best (Kadane's maximum subarray). If the task is "rearrange with `O(1)` extra space" or "one linear scan," it lives here. If you need to remember past values by key, use Hashing instead.

**How it works:** Use read/write pointers, two ends moving inward, or a running accumulator. Each element is visited once or twice. Time is `O(n)`, space `O(1)` extra.

```js
// Array skeleton — read / write pointers (in-place compact/filter)
let write = 0;
for (let read = 0; read < arr.length; read++) {
  if (shouldKeep(arr[read])) arr[write++] = arr[read];
}
// arr.length = write  (or fill tail)

// Two-ends skeleton (reverse / swap)
let l = 0, r = arr.length - 1;
while (l < r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
  l++; r--;
}

// Running best skeleton (Kadane)
let run = 0, best = -Infinity;
for (const x of arr) {
  run = Math.max(x, run + x);
  best = Math.max(best, run);
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
