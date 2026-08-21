# Arrays & Strings

Scan, swap in place, or count a fixed alphabet. No fancy structure — just indices.

```js
// Array scan skeleton
let write = 0;
for (let read = 0; read < arr.length; read++) {
  // maybe copy / swap arr[read] into arr[write]
}
```

## Reverse String

Two ends swap inward — [Reverse String](https://leetcode.com/problems/reverse-string/).

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

Slow write pointer, fast reader — [Move Zeroes](https://leetcode.com/problems/move-zeroes/).

```js
// Arrays — compact non-zeros then fill
// LC: https://leetcode.com/problems/move-zeroes/
function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read];
      write++;
    }
  }
  while (write < nums.length) nums[write++] = 0;
}
```

## Rotate Array

Reverse whole, then each part — [Rotate Array](https://leetcode.com/problems/rotate-array/).

```js
// Arrays — reverse trick for rotate
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
  rev(0, nums.length - 1); // reverse all
  rev(0, k - 1);           // reverse first k
  rev(k, nums.length - 1); // reverse rest
}
```

**More:** [Remove Element](https://leetcode.com/problems/remove-element/), [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/), [Valid Anagram](https://leetcode.com/problems/valid-anagram/).
