# Sorting

**Definition:** Sorting array ko order me lagata hai taaki binary search, two pointers aur greedy / intervals kaam karein. Teen speed groups: `O(n²)` (bubble, selection, insertion), `O(n log n)` (merge, quick, heap), aur `O(n+k)` (counting) jab range chhoti ho.

**When to use:** "Sort karke" dikhe — intervals, greedy scheduling, binary search se pehle, custom order (Largest Number). Interview me algorithm likhne ko mile to `n` aur stability dekh ke chuno.

**How it works:** Adjacent swap (bubble), pick min (selection), insert into sorted prefix (insertion), divide-merge (merge), pivot partition (quick), count buckets (counting). JS `Array.sort` TimSort hai — **numbers pe comparator farz** `(a,b)=>a-b`.

## Study notes

- **Stable** = equal keys apna relative order rakhein (merge, insertion, TimSort). Quick/selection/heap usually **unstable**.
- **In-place** ≈ little extra memory (quick, heap, insertion). Merge needs `O(n)` buffer (array).
- **Pivot choice** quick pe matter: mid/random — sorted input + bad pivot = `O(n²)`.
- **Intervals** pattern alag page pe hai (merge/insert) — yahan algorithms + complexity.
- **Checklist:** need stable? memory tight? range small? just use built-in?

## Complexity cheat sheet

| Algorithm | Best | Avg | Worst | Extra space | Stable? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Bubble | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | Yes | early-exit if no swaps |
| Selection | `O(n²)` | `O(n²)` | `O(n²)` | `O(1)` | No | few swaps |
| Insertion | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | Yes | great if almost sorted |
| Merge | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | Yes | reliable; LL-friendly |
| Quick | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)` avg | No | default fast; watch pivot |
| Heap | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` | No | in-place guaranteed bound |
| Counting | `O(n+k)` | `O(n+k)` | `O(n+k)` | `O(k)` | Can be | only small integer range |
| JS `sort` | — | `O(n log n)` | `O(n log n)` | impl | Yes (TimSort) | always pass comparator for nums |

**Pick quickly:** teaching / tiny n → insertion; need stable guaranteed `n log n` → merge; in-place + avg fast → quick; in-place + worst-case `n log n` → heap; tiny ints → counting; production JS → `.sort((a,b)=>a-b)`.

```js
// Built-in sort — always pass a numeric comparator
nums.sort((a, b) => a - b); // ascending
nums.sort((a, b) => b - a); // descending
items.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // start, then end
```

## Bubble Sort — O(n²)

Paas-paas compare; bada bubble right. Har pass me largest settles at end. `swapped` flag → best `O(n)`.

```js
// Bubble sort — swap adjacent out-of-order pairs
function bubbleSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return nums;
}
```

## Selection Sort — O(n²)

Har `i` pe remaining me min dhoondh ke swap. Comparisons zyada, swaps ~`O(n)`. Unstable.

```js
// Selection sort — pick minimum for each position
function selectionSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[min]) min = j;
    }
    [nums[i], nums[min]] = [nums[min], nums[i]];
  }
  return nums;
}
```

## Insertion Sort — O(n²), Best O(n)

Sorted prefix me key insert (cards). Almost-sorted pe fast. Stable. Online (stream) friendly.

```js
// Insertion sort — insert key into sorted prefix
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = key;
  }
  return nums;
}
```

## Merge Sort — O(n log n)

Divide halves, merge sorted runs. Always `O(n log n)`. Stable. Array pe `O(n)` space; linked list me merge in-place pointers se.

```js
// Merge sort — divide, sort halves, merge sorted runs
function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const mid = nums.length >> 1;
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]); // <= keeps stable
    else out.push(right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}
```

## Quick Sort — O(n log n) avg

Partition around pivot; recurse. In-place, avg fast. Worst `O(n²)` — mid/random pivot. Unstable.

```js
// Quick sort — partition around pivot
function quickSort(nums, lo = 0, hi = nums.length - 1) {
  if (lo >= hi) return;
  const p = partition(nums, lo, hi);
  quickSort(nums, lo, p - 1);
  quickSort(nums, p + 1, hi);
}
function partition(nums, lo, hi) {
  const mid = (lo + hi) >> 1;
  [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
  const pivot = nums[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (nums[j] < pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[hi]] = [nums[hi], nums[i]];
  return i;
}
```

## Heap Sort — O(n log n)

Build max-heap, baar-baar root swap with end + sift down. Worst-case `O(n log n)`, extra `O(1)`, unstable. Interview me “guaranteed n log n in-place” bolne ke liye.

```js
// Heap sort — max-heap, then extract max to the end
function heapSort(nums) {
  const n = nums.length;
  const siftDown = (i, size) => {
    while (true) {
      let largest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < size && nums[l] > nums[largest]) largest = l;
      if (r < size && nums[r] > nums[largest]) largest = r;
      if (largest === i) break;
      [nums[i], nums[largest]] = [nums[largest], nums[i]];
      i = largest;
    }
  };
  for (let i = (n >> 1) - 1; i >= 0; i--) siftDown(i, n); // build heap
  for (let end = n - 1; end > 0; end--) {
    [nums[0], nums[end]] = [nums[end], nums[0]];
    siftDown(0, end);
  }
  return nums;
}
```

## Counting Sort — O(n+k)

Small non-neg int range → count then emit. Not comparison-based. Stable agar prefix cumulative use karo.

```js
// Counting sort — count then emit
function countingSort(nums, maxVal) {
  const cnt = Array(maxVal + 1).fill(0);
  for (const x of nums) cnt[x]++;
  const out = [];
  for (let v = 0; v <= maxVal; v++) {
    while (cnt[v]-- > 0) out.push(v);
  }
  return out;
}
```

## Sort an Array

LC pe khud implement — merge sort safe (stable, guaranteed `O(n log n)`).

[Sort an Array](https://leetcode.com/problems/sort-an-array/)

```js
// Time: O(n) · Space: O(n)
function sortArray(nums) {
  if (nums.length <= 1) return nums;
  const mid = nums.length >> 1;
  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}
```

## Largest Number

Custom comparator: `a` pehle iff `a+b > b+a`. All zeros → `"0"`.

[Largest Number](https://leetcode.com/problems/largest-number/)

```js
// Time: O(n) · Space: O(n)
function largestNumber(nums) {
  const strs = nums.map(String);
  strs.sort((a, b) => {
    const ab = a + b, ba = b + a;
    if (ba === ab) return 0;
    return ba > ab ? 1 : -1;
  });
  if (strs[0] === "0") return "0";
  return strs.join("");
}
```

## H-Index

Sort ascending; pehli `i` jahan `citations[i] >= n - i` → h-index `n - i`.

[H-Index](https://leetcode.com/problems/h-index/)

```js
// Time: O(n) · Space: O(n)
function hIndex(citations) {
  citations.sort((a, b) => a - b);
  const n = citations.length;
  for (let i = 0; i < n; i++) {
    if (citations[i] >= n - i) return n - i;
  }
  return 0;
}
```
