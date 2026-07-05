# Monotonic Stack

A monotonic stack is a stack whose elements are kept in strictly increasing or strictly decreasing order. When you push a new element, you first pop all elements that violate the desired ordering before inserting the new one. This simple discipline unlocks O(n) solutions to problems that naively require O(n²)—specifically, problems where each element needs to find the "next greater element," "previous smaller element," or similar relationship to its neighbors.

The key insight is that the stack holds a sequence of "candidates" who are still waiting for their answer. When the current element satisfies the condition for a candidate, that candidate gets its answer and is removed. The stack never stores elements that have already been matched, so each element is pushed once and popped at most once.

This makes monotonic stacks a powerful tool for problems involving **range queries with nearest-neighbor comparisons**, such as computing the span of a stock price (consecutive days where the price was ≤ the current price), finding the largest rectangle under a histogram, or trapping rainwater between elevations. In each case, the stack eliminates redundant comparisons by remembering only the relevant elements that have not yet found their match.

## When to use

- Need to find the next greater / next smaller element for each position in an array
- Problems involving "looking back" or "looking ahead" in a sequence with a comparison predicate
- Computing span, area, or distance based on nearest smaller/greater neighbors
- Optimizing a brute-force O(n²) nested loop to O(n) single pass
- Problems like stock span, sliding window maximum, or histogram area
- Any problem where the relationship depends on the nearest element satisfying a comparison

## How it works

### Core concept

Maintain a stack (typically of indices, not values). As you iterate left to right, before pushing the current index, pop every index from the stack whose value is smaller (for "next greater") or larger (for "next smaller") than the current element's value. For each popped index, the current element is its answer. After popping, push the current index. This invariant guarantees the stack always stays monotonic.

The choice of monotonic direction depends on the problem:
- **Increasing stack** (bottom → top): used for "next smaller element" problems, because you pop when you see a smaller value, meaning the popped element just found its next smaller.
- **Decreasing stack** (bottom → top): used for "next greater element" problems; you pop when you see a greater value.

### Step-by-step approach

1. Initialize a result array filled with a default (-1 for next greater, or 0, etc.) and an empty stack.
2. Iterate through the array (left to right). For each index i:
   - While the stack is not empty AND the condition holds (e.g., `nums[stack.top] < nums[i]` for next greater), pop the top. Set `result[popped] = nums[i]` (or the index i, depending on what the problem asks).
   - Push the current index i onto the stack.
3. After the loop, any remaining indices in the stack have no satisfying element to their right. The default value in the result already handles this.
4. Return the result array.

If you need the "previous" (left side) relationship instead of "next" (right side), either reverse the iteration or adjust the condition.

### Complexity

- **Time:** O(n) — each element is pushed once and popped at most once.
- **Space:** O(n) — the stack grows up to n in the worst case (e.g., strictly decreasing array for next greater element).

```js
function nextGreaterElements(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
```

## Variations

- **Next Smaller Element:** Flip the comparison to `nums[stack.top] > nums[i]` before popping.
- **Previous Greater / Smaller:** Iterate the array in reverse (right to left) and apply the same logic.
- **Circular Arrays:** Run the loop for `2 * n` and index with `i % n` to let elements wrap around (used in Next Greater Element II).
- **Monotonic Queue (Deque):** For sliding window problems, use a deque instead of a stack so you can also remove from the front when elements leave the window.

## Edge cases

- **Empty array:** Return an empty array. No iterations, stack stays empty.
- **Strictly decreasing array (for NGE):** No element has a next greater; stack holds all indices. Each result stays at its default -1.
- **Strictly increasing array:** Every element except the last finds its next greater immediately on the next iteration.
- **Duplicate values:** For strictly monotonic stacks, use `<=` or `>=` instead of `<` / `>` to decide whether to pop duplicates. Use non-strict inequalities if the problem considers equal values as valid answers.
- **Single element:** Stack pushes it; result defaults remain since no further element arrives.

## Practice problems

- [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) — Direct application of monotonic stack with a subset query
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) — Find number of days until a warmer temperature (next greater with index distance)
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) — Monotonic increasing stack tracks heights to compute the maximum rectangle area
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Monotonic decreasing stack calculates water trapped between taller bars
- [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) — Circular array handled by iterating 2n
- [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) — Counts contributions using previous and next smaller elements
