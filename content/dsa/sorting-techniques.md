# Sorting

**Definition:** Sorting array ko order me lagata hai taaki binary search, two pointers aur greedy kaam karein. Teen speed groups yaad rakho — `O(n²)` wale (bubble, selection, insertion) chhote input ya teaching ke liye, `O(n log n)` wale (merge, quick, heap) real kaam ke liye, aur `O(n+k)` wala counting sort jab range chhoti ho.

**When to use:** "Sort karke" dekhte hi template nikalo — intervals merge, greedy scheduling, binary search se pehle, ya Top-K se pehle. Interview me sort khud likhne ko mile to input size dekh ke chuno: chhota `n` to insertion, bada to quick/merge.

**How it works:** Comparison sorts me ya to adjacent swap karo (bubble), ya sahi jagah pick karo (selection), ya sorted hisse me ghusao (insertion), ya todo-jodo (merge), ya pivot se baanto (quick). JS me `sort()` default lexicographic hai — numbers ke liye comparator farz hai.

```js
// Built-in sort — always pass a numeric comparator
// default sort is lexicographic — use numeric comparator for numbers
nums.sort((a, b) => a - b); // ascending numeric order
nums.sort((a, b) => b - a); // descending numeric order
items.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // tie-break: sort by start, then by end
```

## Bubble Sort — O(n²)

Paas-paas walo ko compare karke bada aage bhejo. Har pass me sabse bada aakhir me set hota hai. Sorted flag laga do to best case `O(n)`.

```js
// Bubble sort — swap adjacent out-of-order pairs
function bubbleSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // no swaps this pass — array already sorted
    for (let j = 0; j < n - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]; // bubble larger neighbor to the right
        swapped = true;
      }
    }
    if (!swapped) break; // early exit when a pass does no swaps
  }
  return nums;
}
```

## Selection Sort — O(n²)

Har position ke liye baaki me se sabse chhota dhoondh ke lao. Swaps kam (`O(n)`), comparisons zyada. Stable nahi hai.

```js
// Selection sort — pick minimum for each position
function selectionSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i; // track index of current minimum
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[min]) min = j;
    }
    [nums[i], nums[min]] = [nums[min], nums[i]]; // swap minimum into position i
  }
  return nums;
}
```

## Insertion Sort — O(n²), Best O(n)

Ek-ek karke sorted hisse me ghusao — cards wali feel. Chhote ya almost-sorted input pe tez. Stable hai.

```js
// Insertion sort — insert key into sorted prefix
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i]; // key = element to insert
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j]; // shift larger elements one slot right
      j--;
    }
    nums[j + 1] = key; // swap minimum into position i
  }
  return nums;
}
```

## Merge Sort — O(n log n)

Todo aur jodo — stable hai, par `O(n)` extra space leta hai. Linked list pe best (space `O(1)` ho jaata hai slow/fast se).

```js
// Merge sort — divide, sort halves, merge sorted runs
function mergeSort(nums) {
  if (nums.length <= 1) return nums; // base case: 0 or 1 element
  const mid = nums.length >> 1; // split near middle
  const left = mergeSort(nums.slice(0, mid)); // recurse on left subarray
  const right = mergeSort(nums.slice(mid)); // recurse on right subarray
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]); // take smaller front element (stable merge)
    else out.push(right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j)); // append remaining tail of left or right
}
```

## Quick Sort — O(n log n) avg

Pivot chuno, chhote left — bade right, dono pe recurse. In-place hai, par sorted input + pehla pivot = worst `O(n²)`. Random/middle pivot se bacho.

```js
// Quick sort — partition around pivot
function quickSort(nums, lo = 0, hi = nums.length - 1) {
  if (lo >= hi) return; // base case: 0 or 1 element
  const p = partition(nums, lo, hi); // pivot now sits at final partition index
  quickSort(nums, lo, p - 1); // sort left partition
  quickSort(nums, p + 1, hi); // sort right partition
}
function partition(nums, lo, hi) {
  const mid = (lo + hi) >> 1; // mid index pivot avoids worst case on sorted input
  [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
  const pivot = nums[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (nums[j] < pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // elements ≤ pivot go to the left region
      i++;
    }
  }
  [nums[i], nums[hi]] = [nums[hi], nums[i]]; // pivot now sits at final partition index
  return i;
}
```

## Counting Sort — O(n+k)

Range chhoti ho (0-100, ages, marks) to gino aur likh do. Comparison hi nahi hota, isliye `n log n` se tez. Stable version ke liye prefix sum use karo.

```js
// Counting sort — count then emit
function countingSort(nums, maxVal) {
  const cnt = Array(maxVal + 1).fill(0);
  for (const x of nums) cnt[x]++; // increment count for value x
  const out = [];
  for (let v = 0; v <= maxVal; v++) {
    while (cnt[v]-- > 0) out.push(v); // emit value v count[v] times
  }
  return out;
}
```

## Speed Map (Revision)

- **Bubble:** `O(n²)` time, `O(1)` space, stable — sirf teaching ya sorted-check.
- **Selection:** `O(n²)` time, `O(1)` space, unstable — swaps kam chahiye hon to.
- **Insertion:** `O(n²)` time (best `O(n)`), `O(1)` space, stable — chhota ya almost-sorted input.
- **Merge:** `O(n log n)` time, `O(n)` space, stable — stability chahiye ho ya linked list.
- **Quick:** `O(n log n)` avg time, `O(log n)` space, unstable — default fast choice, pivot dhyan se.
- **Counting:** `O(n+k)` time, `O(k)` space — range chhoti ho to sabse tez.
- **JS sort:** TimSort `O(n log n)`, stable — par comparator farz hai numbers ke liye.

## Sort an Array

Khud sort implement karo — merge sort likho (stable, pakka `O(n log n)`). Interview me technique poochhi jaati hai, built-in nahi.

[Sort an Array](https://leetcode.com/problems/sort-an-array/)

```js
// LC: https://leetcode.com/problems/sort-an-array/
function sortArray(nums) {
  if (nums.length <= 1) return nums;
  const mid = nums.length >> 1;
  const left = sortArray(nums.slice(0, mid)); // sort left partition
  const right = sortArray(nums.slice(mid)); // sort right partition
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]); // merge: smaller value first
    else out.push(right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j)); // concatenate leftover run
}
```

## Largest Number

Numbers ko aise jodo ki sabse bada number bane — comparator custom hai: `a` pehle aayega agar `a+b > b+a`. Sab zero hon to `"0"` lautao.

[Largest Number](https://leetcode.com/problems/largest-number/)

```js
// LC: https://leetcode.com/problems/largest-number/
function largestNumber(nums) {
  // compare concatenations a+b vs b+a
  const strs = nums.map(String);
  strs.sort((a, b) => {
    const ab = a + b, ba = b + a;
    if (ba === ab) return 0;
    return ba > ab ? 1 : -1; // larger concatenation should sort first
  });
  if (strs[0] === "0") return "0"; // edge case: all zeros → "0"
  return strs.join("");
}
```

## H-Index

Sort karke dekho kahaan `citations[i] >= n-i` hota hai — wahi h-index hai. Pehli baar milte hi ruko.

[H-Index](https://leetcode.com/problems/h-index/)

```js
// LC: https://leetcode.com/problems/h-index/
function hIndex(citations) {
  // sort citations descending for h-index scan
  citations.sort((a, b) => a - b);
  const n = citations.length;
  for (let i = 0; i < n; i++) {
    if (citations[i] >= n - i) return n - i; // h-index: h papers with at least h citations
  }
  return 0;
}
```
