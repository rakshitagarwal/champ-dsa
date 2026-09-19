# Arrays

**Definition:** Array ek contiguous memory structure hai — saare elements ek line me store hote hain aur index se `O(1)` me access milta hai. String bhi bas characters ka array hai. **Arrays & Hashing** me pehle ye page (in-place / scan), phir Hashing page (Map/Set) padho.

**When to use:** Jab array ko in-place badalna ho — reverse karna, rotate karna, zeroes/duplicate hatana, ya running sum / Kadane se best subarray nikalna ho. Agar key se yaad rakhna hai to Hashing wala page dekho.

**How it works:** Read/write pointer ya do-pointer (left-right) se ek hi scan me kaam ho jata hai, har element 1–2 baar visit hota hai. Time `O(n)`, extra space `O(1)`.

## Study notes

- **Pehchan:** in-place rewrite, contiguous best sum, swap/reverse/rotate, majority — bina Map ke.
- **Complexity:** almost always `O(n)` time, `O(1)` extra space (sort alag).
- **Traps:** off-by-one on `write` pointer; Kadane me all-negative — `best` ko `-Infinity` ya `nums[0]` se start; mutate vs copy.
- **Checklist:** kya in-place chahiye? kya order matter karta hai? hashing better to nahi?

## JS Array methods (interview cheatsheet)

Mutating (array badalte hain):

| Method | Kya karta hai | Notes |
| --- | --- | --- |
| `push(...x)` | end pe add | `O(1)` amortized |
| `pop()` | end se hatao | stack top |
| `unshift(...x)` | start pe add | `O(n)` — avoid in hot loops |
| `shift()` | start se hatao | queue front, `O(n)` |
| `splice(i, del, ...add)` | beech me cut/insert | `O(n)` |
| `sort(cmp)` | in-place sort | default = string sort! use `(a,b)=>a-b` |
| `reverse()` | ulta | in-place |
| `fill(v, s?, e?)` | range fill | DP init |
| `copyWithin(t, s, e?)` | copy inside self | rare |

Non-mutating / read:

| Method | Kya karta hai | Notes |
| --- | --- | --- |
| `slice(s?, e?)` | copy range | end exclusive; shallow copy |
| `concat(a)` / `[...a, ...b]` | jodna | new array |
| `includes(x)` | hai kya | `O(n)` |
| `indexOf` / `lastIndexOf` | pehli/aakhri index | `-1` if missing |
| `find` / `findIndex` | pehla match | callback |
| `filter` / `map` / `reduce` | transform / fold | new array (filter/map) |
| `every` / `some` | all / any | short-circuit |
| `flat(depth)` / `flatMap` | nest kholna | |
| `join(sep)` | string banao | |
| `at(i)` | negative index OK | `at(-1)` = last |
| `Array.from(x)` / `Array(n).fill(0)` | banao | `Array(n)` holes — prefer `fill` |
| `Array.isArray(x)` | type check | |

Handy patterns: `[...arr]`, `arr.toSorted?.(cmp)` (immutable sort), destructure `[a,b]=arr`, swap `[a[i],a[j]]=[a[j],a[i]]`.

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
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(1)
// write non-zeros forward; fill zeros
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
```

## Rotate Array

`k %= n`. Reverse the whole array, reverse the first `k`, reverse the rest. That is rotate right.

[Rotate Array](https://leetcode.com/problems/rotate-array/)

```js
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(1)
// Kadane: extend or restart at nums[i]
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {

    let currMax = nums[0];
    let maxima = nums[0];

    for(let i = 1; i < nums.length; i++){

        currMax = Math.max(nums[i], currMax + nums[i]);
        maxima = Math.max(maxima, currMax);

    }

    return maxima;

};
```

## Best Time to Buy and Sell Stock

Ek baar kharido, ek baar becho. Sabse sasta kharido, sabse mehenga becho — ek scan me min price track karo.

[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

```js
// Time: O(n) · Space: O(1)
// track min buy; max profit
var maxProfit = function(prices) {
  let curMin = prices[0];
  let curMax = 0;

  for (let i = 0; i < prices.length; i++) {
    curMin = Math.min(prices[i], curMin);
    curMax = Math.max(curMax, prices[i] - curMin);
  }

  return curMax;
};
```

## Remove Duplicates from Sorted Array

Sorted hai to duplicates bagal me honge. Write pointer se unique hi rakho, length return karo.

[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

```js
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(n)
function merge(nums1, m, nums2, n) {
  // merge from the back to avoid overwriting nums1
  let i=m-1, j=n-1, k=m+n-1;
  while (j>=0) {
    if (i>=0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--]; // place the larger tail element at the back
    else nums1[k--] = nums2[j--];
  }
}
```
