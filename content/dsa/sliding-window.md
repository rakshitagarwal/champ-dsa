# Sliding Window

The sliding window technique maintains a contiguous segment (a window) over an array or string and updates it incrementally as it slides across the data. Instead of recomputing from scratch every time the window moves, you adjust only the elements that enter and leave the window. This transforms many O(n²) brute-force subarray problems into efficient O(n) solutions. It is one of the most common patterns for substring and subarray problems in coding interviews.

The intuition behind sliding window comes from the observation that many problems ask for an optimal contiguous segment — the longest substring without repeating characters, the smallest window containing all target characters, or the maximum sum of any subarray of size k. In each case, a naive approach would examine every possible start and end index (O(n²) subarrays). The sliding window avoids this by recognizing that when the right boundary expands, the window's state changes incrementally, and when the left boundary shrinks, the reverse happens. By maintaining running aggregates — a sum, a frequency map, or a set — you can update the window in O(1) per step rather than O(k) per step.

There are two major variants: **fixed-size windows** (where you always keep exactly k elements) and **dynamic-size windows** (where you expand and shrink based on a condition). In both cases, the core invariant is that you maintain a data structure — a sum, a hash map of character frequencies, or a set of unique elements — that stays consistent with the current window. Each element enters the window exactly once (when the right pointer passes over it) and leaves at most once (when the left pointer passes over it), giving a total of O(n) operations.

![Sliding window — fixed and dynamic](/images/dsa/sliding-window.svg)

## When to use

- Problems asking for the maximum or minimum value of a subarray that satisfies a constraint (size k, unique characters, sum threshold, etc.)
- Substring problems requiring a contiguous sequence meeting a condition (e.g., longest substring without repeating characters, smallest window containing all target characters)
- Finding the number of subarrays that satisfy a given property (where the window property is monotonic)
- Array averaging over a fixed window (e.g., maximum average subarray of size k)
- Problems where a brute-force solution would be O(n²) because you would check every possible subarray

## How it works

### Core concept

Imagine a physical window that sits over the array. The window has a left edge and a right edge. Initially, the window covers no elements (left = 0, right = -1). You then expand the right edge to include new elements one by one. Whenever the window violates some constraint (too many characters, sum exceeds limit, etc.), you shrink the left edge until the window becomes valid again.

A useful way to reason about sliding window problems is to think in terms of **validity** and **optimality**. For dynamic windows, you are usually trying to find the largest window that stays valid (e.g., longest substring with at most k distinct characters) or the smallest window that satisfies a condition (e.g., minimum window that contains all target characters). The window starts valid (empty), becomes invalid as you expand, and is restored to validity by shrinking. The answer is recorded at the moments when the window is valid.

The key insight is that **every move of the right pointer adds exactly one element**, and **every move of the left pointer removes exactly one element**. By maintaining an aggregate (sum, frequency map, set) incrementally instead of recomputing it, you keep each window update to O(1) amortized time. For fixed-size windows, the left and right pointers move in lockstep once the window reaches size k: each iteration adds one element on the right and removes one on the left.

The decision to expand or shrink depends on the problem's constraint. For example, in "Longest Substring Without Repeating Characters," you expand the right pointer and, if a duplicate appears, you shrink from the left until the duplicate is removed. In "Minimum Window Substring," you first expand until all target characters are covered, then shrink to minimize the window length while still covering them.

A common mistake is thinking the outer `for` loop and inner `while` loop make it O(n²). But each element moves into the window exactly once (via the right pointer) and out of the window at most once (via the left pointer). The total number of operations across the entire run is at most 2n, which is O(n). This amortized analysis is essential to understanding why sliding window is efficient.

### Step-by-step approach

1. **Initialize pointers and tracking structures.** Set `left = 0` and iterate `right` from 0 to n-1. Initialize a hash map, set, or numeric aggregate to represent the window's current state.
2. **Expand the window.** For each `right` index, add `arr[right]` to the window and update the aggregate (e.g., increase character count in a frequency map, or add to running sum).
3. **Shrink while the window is invalid.** Use a `while` loop that checks whether the window violates the constraint. If it does, remove `arr[left]` from the aggregate and increment `left`. Continue shrinking until the window is valid again (or until `left > right`).
4. **Update the answer.** After ensuring the window is valid, check whether the current window is better than the best seen so far. For longest-substring problems, compute `right - left + 1`. For smallest-window problems, compare window length.
5. **Return the result.** The tracking variable holds the optimal value after the loop completes.

### Complexity

- **Time:** O(n) — each element is processed by the right pointer exactly once and by the left pointer at most once. The total work across all iterations is linear even though there is a nested `while` loop, because the inner loop's total iterations across the entire run cannot exceed n.
- **Space:** O(k) where k is the size of the character set or the number of distinct keys being tracked. For character-frequency maps, k is at most 26 (lowercase letters) or 256 (ASCII), so space is effectively O(1). For arbitrary integer arrays where you may store many distinct values, space could be O(n) in the worst case.

```js
function maxSumSubarray(arr, k) {
  let windowSum = 0, maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k + 1];
    }
  }
  return maxSum;
}
```

## Variations

- **Fixed-size window:** The window length is constant (k). You compute the aggregate once for the first k elements, then slide by adding `arr[right]` and subtracting `arr[left]`. Used for maximum average subarray, anagram substring checks, and permutation-in-string problems.
- **Dynamic-size window with constraint:** The window grows and shrinks based on a condition. The constraint could be "at most k distinct characters," "sum <= target," or "all target characters are included." This variant requires a `while` loop for shrinking.
- **Two hash maps (target vs. window):** For substring problems like "Minimum Window Substring," you maintain one map for the target frequency and one for the current window. A `have` counter tracks how many characters have met their required count, avoiding an O(k) comparison on every iteration.
- **Monotonic queue + sliding window:** In problems like "Sliding Window Maximum," a deque stores candidate indices in decreasing order of value. This keeps the window's maximum always at the front of the deque and achieves O(n) time overall.

## Edge cases

- **k larger than array length:** Return 0 or throw an error depending on the problem. The window cannot be formed because there are not enough elements to fill size k.
- **Empty string or array:** Handle with an early return. No window can exist, so the answer is 0, null, or an empty string depending on the problem's return type.
- **All elements satisfy the constraint:** The window may expand to cover the entire input. Ensure your algorithm handles cases where the window never needs to shrink and correctly records the maximum possible window.
- **Window never becomes valid (e.g., target characters not present):** For minimum-window problems, the initial answer should be an empty string or similar sentinel. Check validity before returning.
- **Negative numbers in fixed-size window:** The sum-based approach still works, but note that "maximum sum" might be negative. Initialize `maxSum` to `-Infinity`, not 0, if all elements could be negative.

## Practice problems

- [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) — A pure fixed-size window. Compute the sum of the first k elements, then slide, tracking the maximum.
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — Dynamic-size window with a Set. Shrink from the left until the duplicate character is removed.
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) — Two hash maps (target and window). Use a `have` vs. `need` counter to track when all target chars are covered, then shrink.
- [Permutation in String](https://leetcode.com/problems/permutation-in-string/) — Fixed-size frequency window. Compare the window's frequency array against the target's frequency array, sliding one character at a time.
- [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/) — Dynamic window with "at most 2 distinct types." Shrink when a third type appears.
- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) — Uses a deque (monotonic queue) to keep candidate maximums. The front of the deque is always the max of the current window.
- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) — Dynamic window where validity depends on whether replacements needed = window size - max frequency <= k.
