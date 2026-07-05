# Cyclic Sort

Cyclic sort is an in-place sorting algorithm designed for arrays where the elements are integers in a contiguous range — typically `[0, n]` or `[1, n]` — and the array length matches the range length (possibly with some missing or duplicated values). Instead of comparing elements like comparison-based sorts, cyclic sort exploits the fact that each element has a known "correct" position: if a value equals `v`, and the range is `1` to `n`, then `v` belongs at index `v - 1`. By repeatedly swapping each element into its correct spot, the array can be sorted in O(n) time with O(1) extra space, assuming the range constraint is satisfied.

The beauty of cyclic sort is that it solves more than just sorting. Because it places every element at its correct index, the positions that still hold wrong values after the sorting pass are precisely the indices corresponding to missing or duplicate numbers. This makes cyclic sort an indispensable pattern for coding-interview problems that ask you to find missing numbers, duplicated numbers, or numbers that disappeared from an array — all without using a hash set or extra array. The name "cyclic" comes from the fact that each swap breaks a cycle in a permutation graph: an element at index `i` points to its correct position `correctIndex`, and the element there points to another position, forming a cycle. The algorithm "unwinds" these cycles one swap at a time.

## When to use

- Array contains numbers in a fixed range like `[0, n]`, `[1, n]`, or `[1, n-1]`
- You need to find missing, duplicate, or disappeared numbers in such an array
- An in-place O(n) time and O(1) space solution is required
- The problem restricts the values to be positive integers (or non-negative)
- You are asked to find the only duplicate, the only missing, or all missing/duplicate numbers
- The interview explicitly forbids using a hash map or additional arrays for counting

## How it works

### Core concept

The algorithm maintains the invariant that after processing index `i`, the value at `i` equals `i + 1` (for a 1-indexed range) or `i` (for a 0-indexed range). It achieves this by walking through the array from left to right, but not immediately advancing the index. Instead, for each position `i`, it checks whether `nums[i]` is already in the correct place. If not, it swaps `nums[i]` with the element at `nums[i] - 1` (or `nums[i]` for 0-indexed). After the swap, the new element that arrives at position `i` is checked again — this repeats until the correct value is in place, or until the current element is out of range. Only then does the index advance.

This "stay-in-place" loop is what gives cyclic sort its O(n) runtime. Even though an element might be swapped multiple times, each swap places at least one element into its final correct position, and no element is ever moved more than twice. The total number of swaps is bounded by `n`, making the algorithm linear. Compare this to counting sort, which also runs in O(n) but requires a frequency array of size O(k) — cyclic sort avoids that auxiliary space by using the input array itself as the frequency table.

### Step-by-step approach

1. **Initialise the index pointer.** Start at `i = 0`. The array lives in a known range; for concreteness, assume `nums[i]` should be `i + 1` (range `1` to `n`).
2. **Check the current element.** If `nums[i]` is not in the range `[1, n]`, skip it by incrementing `i`. Otherwise, compute its correct index: `correct = nums[i] - 1`.
3. **Swap if misplaced.** If `nums[i] !== nums[correct]`, swap the two elements. Do *not* increment `i` yet — the new element at position `i` also needs to be placed correctly.
4. **Advance when correct.** If `nums[i]` is already at its correct position (or is out of range), increment `i` and repeat.
5. **Process results.** After the sort pass, iterate through the array. Any index `j` where `nums[j] !== j + 1` indicates a missing or duplicate number, depending on the problem.

### Complexity

- **Time:** O(n) — each swap places one element in its correct position, and each index is visited at most a constant number of times
- **Space:** O(1) — sorts in-place with only a few integer variables

```js
function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const correct = nums[i] - 1;
    if (nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  return nums;
}

function findMissingNumber(nums) {
  let i = 0, n = nums.length;
  while (i < n) {
    const correct = nums[i];
    if (nums[i] < n && nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  for (let j = 0; j < n; j++) {
    if (nums[j] !== j) return j;
  }
  return n;
}

function findAllMissing(nums) {
  let i = 0;
  while (i < nums.length) {
    const correct = nums[i] - 1;
    if (nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  const missing = [];
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) missing.push(j + 1);
  }
  return missing;
}
```

## Variations

- **Range 0 to n (missing number):** Use `correct = nums[i]` instead of `nums[i] - 1`. After sorting, the index whose value does not match the index is the missing number. The value `n` has no valid index and acts as a sentinel.
- **Find the duplicate number:** Cyclic sort will attempt to swap a duplicate with another copy of the same value at its "correct" position — the swap succeeds, but when you encounter the duplicate again, the check `nums[i] !== nums[correct]` will fail because the correct spot already holds the same value, so `i` advances. The duplicate can be identified by checking which index has a wrong value after sorting.
- **Find all duplicates:** After the sort pass, iterate through the array. Any index where `nums[i] !== i + 1` and where `nums[nums[i] - 1] === nums[i]` indicates a duplicate at position `nums[i] - 1`.
- **First missing positive:** This extends cyclic sort to handle out-of-range values (negatives, zeros, or numbers greater than `n`). These are ignored during the sort (the index is simply advanced) because they have no valid position. After sorting, the first index where `nums[i] !== i + 1` is the answer.

## Edge cases

- **Values outside the range:** Ignore them by advancing `i` without swapping. For a 1-to-n sort, if `nums[i] <= 0` or `nums[i] > n`, skip it.
- **Duplicate values:** When swapping, the duplicate stops the "stay-in-place" loop because `nums[i] === nums[correct]` becomes true, causing `i` to advance. The duplicate ends up at an index that does not match its value.
- **All elements already in correct positions:** The while loop will immediately increment `i` each time because the condition `nums[i] !== nums[correct]` is false. The sort completes in O(n) with no swaps.
- **Single element:** With one element and range `[1, n]`, the element `[1]` is already correct and `i` advances. The algorithm terminates without any swaps.
- **Empty array:** The while condition `i < 0` fails immediately. The result is empty.
- **Large n with sparse distribution:** Cyclic sort still works in O(n) as long as the range matches the array size. The swaps only involve indices that exist.

## Practice problems

- [Missing Number](https://leetcode.com/problems/missing-number/) — After cyclic sort, the index with the wrong value (or the sentinel `n`) is the missing number
- [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) — After sorting, collect indices where the value does not match `j + 1`
- [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) — Cyclic sort detects the duplicate when the correct spot already holds the same value
- [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) — Place positive values at correct indices; the first mismatch is the answer
- [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) — After sorting, indices where the value does not match the index but the correct spot holds the same value indicate duplicates
- [Set Mismatch](https://leetcode.com/problems/set-mismatch/) — One number is duplicated, one is missing; cyclic sort identifies both in one pass
