# Two Pointers

The two-pointer technique uses two indices to traverse a data structure (usually an array or linked list) simultaneously, typically moving toward each other or at different speeds. By coordinating these two pointers strategically, you can solve a wide class of problems in O(n) time without needing nested loops. This is one of the most fundamental and widely applicable patterns in competitive programming and technical interviews.

The core idea is simple: instead of letting a single loop do all the work (often leading to O(n²) brute force), you employ two pointers that converge, diverge, or chase each other. Each pointer moves in a single direction and never backtracks, guaranteeing a linear pass. The pattern shines on **sorted arrays** (where ordering gives you a monotonic property to exploit) and on problems involving **contiguous sequences** or **paired elements**.

The technique can be traced back to basic algorithmic problems like searching in a sorted array, but it has since evolved into a versatile tool for solving everything from palindrome checking to linked-list cycle detection. What makes two pointers so effective is that each step eliminates one or more candidates from consideration without needing to revisit them. For opposite-direction pointers on a sorted array, each comparison lets you discard either the leftmost or rightmost element, cutting the search space in half with every move — not literally in half, but by at least one element per iteration, keeping the overall complexity linear.

![Two pointers — opposite direction and same direction](/images/dsa/two-pointers.svg)

## When to use

- Searching for a pair of elements that satisfy a target condition in a **sorted** array (e.g., Two Sum II, 3Sum, 4Sum)
- Reversing or rotating an array or linked list in-place with O(1) extra memory
- Detecting cycles in a linked list using the tortoise-and-hare (fast/slow) variant
- Finding the middle of a linked list in a single pass
- Removing duplicates from a sorted array or linked list in-place
- Partitioning problems where elements must be rearranged around a pivot (like Dutch National Flag)
- Checking if a string is a palindrome while ignoring certain characters
- Comparing strings that contain backspace characters or other editing operations
- Merging two sorted arrays into one (both from the end inward or from the start)
- Finding the intersection or union of two sorted arrays

## How it works

### Core concept

The two-pointer pattern comes in three main flavors. **Opposite-direction pointers** start at the two ends of the array and walk inward. Since the array is sorted, the sum of the two endpoints tells you which way to move: if the sum is too large, decrement the right pointer to reduce it; if too small, increment the left pointer to increase it. This monotonic property is what makes the technique work — each move eliminates an entire row or column of the search space.

**Same-direction (slow/fast) pointers** start together, with one pointer running ahead. The gap between them encodes useful information. For removing duplicates, the fast pointer explores new elements while the slow pointer marks where the next unique element should land. For cycle detection (Floyd's Tortoise and Hare), the fast pointer moves two steps at a time while the slow moves one — if they meet, a cycle exists. The mathematics behind cycle-start detection: when slow has traveled distance `d + k` (d to cycle start, k into the cycle), fast has traveled `2(d + k) = d + k + mC` for some integer m. Rearranging gives `d = mC - k`, so resetting one pointer to head and moving both one step at a time makes them meet at the cycle entrance.

**Sliding window** (often treated separately) is a third flavor where two pointers define the boundaries of a window that expands and contracts — but that pattern is covered in its own guide. The key invariant across all variants is that each pointer moves monotonically, ensuring each element is processed a constant number of times.

### Step-by-step approach

1. **Identify pointer roles.** Decide whether you need opposite-direction pointers (e.g., pair sum in sorted array), slow/fast (e.g., cycle detection), or a sliding window.
2. **Initialize pointers.** For opposite-direction, set `l = 0, r = n-1`. For slow/fast, set `slow = head, fast = head`.
3. **Establish the move condition.** In opposite-direction, compare `arr[l] + arr[r]` against a target and decide which pointer to shift. In slow/fast, the fast pointer always advances, and the slow pointer advances conditionally.
4. **Loop until pointers cross or fast reaches the end.** The loop invariant is that pointers have not crossed (opposite-direction) or fast is still within bounds (slow/fast).
5. **Process and record the result.** At each valid configuration, check if the pair/subarray satisfies the condition. Update a running answer.
6. **Handle remaining elements if needed.** Some problems (like merging sorted arrays) require draining one pointer after the other exits.

### Complexity

- **Time:** O(n) — each pointer moves at most n steps total, with no nested loops
- **Space:** O(1) — only two integer indices are stored

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

- **Fast and slow pointers (tortoise-and-hare):** One pointer moves twice as fast as the other. Used for cycle detection, finding the middle of a linked list, and cycle start detection. Also applicable to finding duplicate numbers in an array by treating indices as linked-list nodes.
- **Three pointers (3Sum variant):** Fix one element with an outer loop, then use two pointers on the remaining subarray. Extends to k-sum problems.
- **Left and right partition pointers (Dutch National Flag):** Three-way partitioning with low, mid, and high pointers to sort arrays with three distinct values in a single pass.
- **Two pointers from the same end (removing duplicates):** Both pointers start at index 0. The fast pointer scouts ahead, and the slow pointer stamps the position for the next unique value.

## Edge cases

- **Empty array or single element:** The loop condition `left < right` fails immediately — handle with an early return.
- **No valid pair exists:** Return a well-defined sentinel like `[-1, -1]` or `null`.
- **Array with duplicate values:** Decide whether duplicates are allowed in the output. For 3Sum, skip duplicate values to avoid repeated triplets.
- **Integer overflow:** In typed languages, use `arr[l] > target - arr[r]` to avoid overflow in sum comparison.
- **Unsorted input:** The opposite-direction variant depends on sorting. Use a hash map instead if original indices must be preserved.
- **List with no cycle (fast reaches null):** The loop terminates with `false` — standard safe behavior.
- **List with even number of nodes (finding middle):** The algorithm returns the second middle. Adjust if the first middle is needed.

## Practice problems

- [Two Sum II - Input Array is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) — The canonical opposite-direction two-pointer problem
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) — Move the pointer at the shorter line inward, tracking the maximum area
- [3Sum](https://leetcode.com/problems/3sum/) — Sort the array, then for each element, two-pointer the remaining range
- [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) — Same-direction pointers; slow marks position for next unique element
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Left and right pointers track max height from each side
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) — Fast/slow to find midpoint, reverse second half, compare halves
- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) — Direct cycle detection with fast-slow pointers
- [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) — Find the exact node where the cycle begins
- [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) — Treat array indices as linked-list nodes; detect cycle to find duplicate
- [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) — When fast reaches the end, slow is at the middle
