# Two Pointers

The two-pointer technique uses two indices to traverse a data structure (usually an array or linked list) simultaneously, typically moving toward each other or at different speeds. By coordinating these two pointers strategically, you can solve a wide class of problems in O(n) time without needing nested loops. This is one of the most fundamental and widely applicable patterns in competitive programming and technical interviews.

The core idea is simple: instead of letting a single loop do all the work (often leading to O(n²) brute force), you employ two pointers that converge, diverge, or chase each other. Each pointer moves in a single direction and never backtracks, guaranteeing a linear pass. The pattern shines on **sorted arrays** (where ordering gives you a monotonic property to exploit) and on problems involving **contiguous sequences** or **paired elements**.

The technique can be traced back to basic algorithmic problems like searching in a sorted array, but it has since evolved into a versatile tool for solving everything from palindrome checking to linked-list cycle detection. What makes two pointers so effective is that each step eliminates one or more candidates from consideration without needing to revisit them. For opposite-direction pointers on a sorted array, each comparison lets you discard either the leftmost or rightmost element, cutting the search space in half with every move — not literally in half, but by at least one element per iteration, keeping the overall complexity linear.

## When to use

- Searching for a pair of elements that satisfy a target condition in a **sorted** array (e.g., Two Sum II, 3Sum, 4Sum)
- Reversing or rotating an array or linked list in-place with O(1) extra memory
- Detecting cycles in a linked list using the tortoise-and-hare (fast/slow) variant
- Removing duplicates from a sorted array or linked list in-place
- Partitioning problems where elements must be rearranged around a pivot (like Dutch National Flag)
- Checking if a string is a palindrome while ignoring certain characters (alphanumeric only, case-insensitive)
- Comparing strings that contain backspace characters or other editing operations
- Merging two sorted arrays into one (both from the end inward or from the start)
- Finding the intersection or union of two sorted arrays

## How it works

### Core concept

The two-pointer pattern comes in three main flavors. **Opposite-direction pointers** start at the two ends of the array and walk inward. Since the array is sorted, the sum of the two endpoints tells you which way to move: if the sum is too large, decrement the right pointer to reduce it; if too small, increment the left pointer to increase it. This monotonic property is what makes the technique work — each move eliminates an entire row or column of the search space. A good way to visualize this is to think of a 2D matrix where each row is sorted: the two-pointer approach walks a staircase path from the top-right to the bottom-left corner, eliminating one row or column at each step.

**Same-direction (slow/fast) pointers** start together, with one pointer running ahead. The gap between them encodes useful information. For example, in removing duplicates, the fast pointer explores new elements while the slow pointer marks where the next unique element should land. In cycle detection, the fast pointer laps the slow one if a cycle exists.

**Sliding window** (often treated separately) is a third flavor where two pointers define the boundaries of a window that expands and contracts — but that pattern is covered in its own guide. The key invariant across all variants is that each pointer moves monotonically (always left-to-right or right-to-left), ensuring each element is processed a constant number of times.

### Step-by-step approach

1. **Identify pointer roles.** Decide whether you need opposite-direction pointers (e.g., pair sum in sorted array), slow/fast (e.g., cycle detection), or a sliding window. Draw the array and mark where each pointer starts.
2. **Initialize pointers.** For opposite-direction, set `l = 0, r = n-1`. For slow/fast, set `slow = 0, fast = 0` (or `fast = 0, fast = 1` depending on the problem).
3. **Establish the move condition.** In opposite-direction, you typically compare `arr[l] + arr[r]` against a target and decide which pointer to shift. In slow/fast, the fast pointer always advances one step per iteration, and the slow pointer advances conditionally.
4. **Loop until pointers cross or fast reaches the end.** The loop invariant is that the pointers have not yet crossed (for opposite-direction) or that the fast pointer is still within bounds (for slow/fast).
5. **Process and record the result.** At each valid configuration, check if the current pair/subarray satisfies the condition. Update a running answer (max area, element count, boolean flag, etc.).
6. **Handle remaining elements if needed.** Some problems (like merging sorted arrays) require draining one pointer after the other exits.

### Complexity

- **Time:** O(n) — each pointer moves at most n steps total, and there are no nested loops. The pointers independently scan the array, visiting each element once (or at most twice for slow/fast variants).
- **Space:** O(1) — only two integer indices are stored. No auxiliary data structures proportional to input size are needed, making this an extremely memory-efficient technique.

```js
function pairSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return [-1, -1];
}
```

## Variations

- **Fast and slow pointers (tortoise-and-hare):** One pointer moves twice as fast as the other. Used for cycle detection in linked lists, finding the middle of a linked list, and finding the starting node of a cycle.
- **Three pointers (3Sum variant):** Fix one element with an outer loop, then use two pointers on the remaining subarray. This extends to k-sum problems where you fix (k-2) elements and two-pointer the rest.
- **Left and right partition pointers (Dutch National Flag):** Three-way partitioning with low, mid, and high pointers to sort arrays with three distinct values (like 0s, 1s, and 2s) in a single pass.
- **Two pointers from the same end (removing duplicates):** Both pointers start at index 0. The fast pointer scouts ahead, and the slow pointer stamps the position for the next unique value.

## Edge cases

- **Empty array or single element:** The loop condition `left < right` fails immediately — handle separately by returning a sentinel or early result.
- **No valid pair exists:** Ensure the function returns a well-defined failure sentinel (e.g., `[-1, -1]` or `null`). Don't crash on invalid index access.
- **Array with duplicate values:** When looking for unique pairs, decide whether duplicates are allowed in the output. For problems like 3Sum, skip duplicate values to avoid repeated triplets.
- **Integer overflow:** In languages like Java or C++, the sum of two large integers could overflow. Use `long` or compare differently (e.g., `arr[l] > target - arr[r]`).
- **Unsorted input and the two-pointer approach fails:** The opposite-direction variant depends on sorting. If you must preserve original indices, use a hash map instead.

## Practice problems

- [Two Sum II - Input Array is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) — The canonical opposite-direction two-pointer problem. Demonstrates how sorted order enables O(n) pair-finding.
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) — Move the pointer at the shorter line inward, tracking the maximum area seen. The proof relies on the fact that moving the taller line cannot yield a larger area.
- [3Sum](https://leetcode.com/problems/3sum/) — Sort the array, then for each element, two-pointer the remaining range. Must handle duplicate values by skipping identical elements.
- [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) — Same-direction slow/fast pointers. The slow pointer marks where each unique element should be placed.
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Left and right pointers track the maximum height seen from each side. Water trapped at any position is determined by the shorter of the two max boundaries.
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) — Use fast/slow to find the midpoint, reverse the second half, then compare with two pointers from both ends.
- [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) — Tortoise-and-hare detects the cycle, then a second phase finds the exact node where the cycle begins.
