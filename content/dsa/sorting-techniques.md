# Sorting

**Definition:** Sorting array ko order me lagata hai taaki binary search, two pointers aur greedy kaam karein. Teen speed groups yaad rakho — `O(n²)` wale (bubble, selection, insertion) chhote input ya teaching ke liye, `O(n log n)` wale (merge, quick, heap) real kaam ke liye, aur `O(n+k)` wala counting sort jab range chhoti ho.

**When to use:** "Sort karke" dekhte hi template nikalo — intervals merge, greedy scheduling, binary search se pehle, ya Top-K se pehle. Interview me sort khud likhne ko mile to input size dekh ke chuno: chhota `n` to insertion, bada to quick/merge.

**How it works:** Comparison sorts me ya to adjacent swap karo (bubble), ya sahi jagah pick karo (selection), ya sorted hisse me ghusao (insertion), ya todo-jodo (merge), ya pivot se baanto (quick). JS me `sort()` default lexicographic hai — numbers ke liye comparator farz hai.

```js
// Hinglish: JS built-in sort — comparator bhoolna mat
// Default sort strings ki tarah karta hai: [10, 9] galat lagega
nums.sort((a, b) => a - b); // Hinglish: ascending
nums.sort((a, b) => b - a); // Hinglish: descending
items.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // Hinglish: pehle start, phir end
```

## Bubble Sort — O(n²)

Paas-paas walo ko compare karke bada aage bhejo. Har pass me sabse bada aakhir me set hota hai. Sorted flag laga do to best case `O(n)`.

```js
// Hinglish: Bubble Sort template — paas walo ko swap karo
function bubbleSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // Hinglish: koi swap nahi to sorted
    for (let j = 0; j < n - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]; // Hinglish: bada aage bhejo
        swapped = true;
      }
    }
    if (!swapped) break; // Hinglish: pehle se sorted
  }
  return nums;
}
```

## Selection Sort — O(n²)

Har position ke liye baaki me se sabse chhota dhoondh ke lao. Swaps kam (`O(n)`), comparisons zyada. Stable nahi hai.

```js
// Hinglish: Selection Sort template — sabse chhota pick karo
function selectionSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i; // Hinglish: min ka index yaad rakho
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[min]) min = j;
    }
    [nums[i], nums[min]] = [nums[min], nums[i]]; // Hinglish: sahi jagah rakho
  }
  return nums;
}
```

## Insertion Sort — O(n²), Best O(n)

Ek-ek karke sorted hisse me ghusao — cards wali feel. Chhote ya almost-sorted input pe tez. Stable hai.

```js
// Hinglish: Insertion Sort template — sorted hisse me ghusao
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i]; // Hinglish: ye card lagana hai
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j]; // Hinglish: bade ko aage sarakao
      j--;
    }
    nums[j + 1] = key; // Hinglish: sahi jagah rakho
  }
  return nums;
}
```

## Merge Sort — O(n log n)

Todo aur jodo — stable hai, par `O(n)` extra space leta hai. Linked list pe best (space `O(1)` ho jaata hai slow/fast se).

```js
// Hinglish: Merge Sort template — todo, sort karo, jodo
function mergeSort(nums) {
  if (nums.length <= 1) return nums; // Hinglish: base case
  const mid = nums.length >> 1;
  const left = mergeSort(nums.slice(0, mid)); // Hinglish: left half
  const right = mergeSort(nums.slice(mid)); // Hinglish: right half
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]); // Hinglish: chhota pehle (stable)
    else out.push(right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j)); // Hinglish: bacha hua jodo
}
```

## Quick Sort — O(n log n) avg

Pivot chuno, chhote left — bade right, dono pe recurse. In-place hai, par sorted input + pehla pivot = worst `O(n²)`. Random/middle pivot se bacho.

```js
// Hinglish: Quick Sort template — pivot se baanto
function quickSort(nums, lo = 0, hi = nums.length - 1) {
  if (lo >= hi) return; // Hinglish: base case
  const p = partition(nums, lo, hi); // Hinglish: pivot sahi jagah
  quickSort(nums, lo, p - 1); // Hinglish: left todo
  quickSort(nums, p + 1, hi); // Hinglish: right todo
}
function partition(nums, lo, hi) {
  const mid = (lo + hi) >> 1; // Hinglish: middle pivot (sorted input safe)
  [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
  const pivot = nums[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (nums[j] < pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // Hinglish: chhota left me
      i++;
    }
  }
  [nums[i], nums[hi]] = [nums[hi], nums[i]]; // Hinglish: pivot sahi jagah
  return i;
}
```

## Counting Sort — O(n+k)

Range chhoti ho (0-100, ages, marks) to gino aur likh do. Comparison hi nahi hota, isliye `n log n` se tez. Stable version ke liye prefix sum use karo.

```js
// Hinglish: Counting Sort template — gino phir likho
function countingSort(nums, maxVal) {
  const cnt = Array(maxVal + 1).fill(0);
  for (const x of nums) cnt[x]++; // Hinglish: gino
  const out = [];
  for (let v = 0; v <= maxVal; v++) {
    while (cnt[v]-- > 0) out.push(v); // Hinglish: utni baar likho
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
