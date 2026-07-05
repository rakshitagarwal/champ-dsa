# Recursion

Recursion solves a problem by reducing it to smaller instances of the same problem. A function calls itself with a simpler or smaller input until it reaches a **base case** — a trivial instance that returns a direct answer without further recursion. This mirrors mathematical induction: prove the base case holds, assume the function works for smaller inputs, then combine those results to solve the original.

The power of recursion lies in its elegance. Complex problems like tree traversal, combinatorial generation, and divide-and-conquer algorithms become natural self-referential definitions. However, naive recursion can blow up exponentially (e.g., raw Fibonacci) due to overlapping subproblems — in those cases memoization or converting to iterative DP is needed. Understanding recursion is foundational for DFS, backtracking, dynamic programming, and divide-and-conquer.

## When to use

- Problem can be naturally defined in terms of itself with a smaller input (e.g., factorial, tree height)
- Data structure is recursive in nature (linked lists, trees, graphs)
- Need to explore all possibilities — backtracking for permutations, subsets, combinations
- Divide-and-conquer approach applies (merge sort, quick sort, binary search)
- Problem involves nested structures or unknown depth (file system traversal, JSON parsing)
- You can identify a clear base case and a way to shrink the problem toward it

## How it works

### Core concept

Every recursive function has two parts: the **base case(s)** that terminate recursion, and the **recursive case** that calls itself with modified arguments. The call stack maintains state — each invocation gets its own scope with parameters and local variables. When the base case is reached, return values propagate back up (stack unwinding), combining to produce the final result.

The key to designing recursion is the **leap of faith**: assume the function already works correctly for all smaller inputs, then figure out how to use those results. Draw the recursion tree for small inputs to verify your logic. For backtracking, the pattern is: make a choice, recurse, undo the choice — this explores the entire solution space.

### Step-by-step approach

1. **Identify the base case(s):** What is the smallest input where the answer is immediate? This prevents infinite recursion. Common bases: `n === 0`, `n === 1`, `null`, empty array/string.
2. **Define the recursive case:** How does a problem of size `n` reduce to one of size `n-1` or `n/2`? Express the answer in terms of the function called on the smaller input.
3. **Ensure progress:** Verify each recursive call moves toward a base case (e.g., decrementing `n`, removing a character, moving left/right in a tree).
4. **Combine results:** Decide how to aggregate return values — add them, pick min/max, concatenate, or build a structure.
5. **Test with small inputs:** Trace through manually for `n=0,1,2` to catch off-by-one or missing base cases.

### Complexity

- **Time:** O(branches^depth) for naive recursion (exponential); O(n) for linear recursion. Memoization reduces to O(number of unique states).
- **Space:** O(depth) for the call stack — worst-case O(n) for linear recursion, O(log n) for balanced divide-and-conquer. Stack overflow risk for deep recursion (>10^4 calls).

```js
// Generate all subsets (backtracking)
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}
```

## Variations

- **Linear recursion:** One recursive call per invocation (factorial, linked list reversal) — O(n) time, easily converted to iteration.
- **Tree recursion:** Multiple recursive calls (Fibonacci, tree traversal) — can explode exponentially if subproblems overlap.
- **Tail recursion:** Recursive call is the last operation, enabling compiler optimization (TCO) to reuse stack frame — not widely supported in JS engines.
- **Backtracking:** Recursion with state mutation and undo — used for permutations, N-Queens, Sudoku, constraint satisfaction.
- **Divide and Conquer:** Split input, recurse on halves, merge results — merge sort, quick sort, binary search.

## Edge cases

- **n = 0 or empty input:** Without a proper base case, recursion either returns undefined or throws (maximum call stack exceeded). Always handle zero-size input.
- **Negative input:** If your recursion decrements, ensure negative values hit a base case before infinite recursion.
- **Deep recursion:** JS call stack limit is ~10,000 frames — use iteration or explicit stack for large inputs (e.g., DFS on a graph with 10^5 nodes).
- **Mutable state:** Shared references (arrays, objects) passed through recursion can cause unintended mutation across branches — clone or copy when needed, or use immutable patterns.
- **Double counting in backtracking:** Ensure visited/pruned set prevents revisiting same states (e.g., permutations need a used-flag or start index).

## Practice problems

- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) — Recursively reverse tail, then fix pointer direction
- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) — Backtracking with open/close counts, pruning invalid paths
- [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) — Pure recursion with memoization to avoid exponential blowup
- [Pow(x, n)](https://leetcode.com/problems/powx-n/) — Recursive exponentiation by squaring, O(log n)
- [Permutations](https://leetcode.com/problems/permutations/) — Backtracking with used-element tracking
- [Subsets II](https://leetcode.com/problems/subsets-ii/) — Backtracking with duplicate handling via sorting and skipping
