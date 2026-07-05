# Recursion

Solve a problem by reducing it to smaller instances of the same problem, relying on a base case to terminate.

## When to use
- Problem can be defined in terms of itself with smaller input
- Tree-like or nested structure traversal
- Divide-and-conquer approach applies
- Backtracking or combinatorial exploration needed

## How it works

Define a function that calls itself with a smaller or simpler input. Each call makes progress toward a base case that returns a direct answer. The recursion unwinds, combining results from sub-calls to produce the final answer.

```js
// Example: Fibonacci
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

## Practice problems
- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) — Recursively reverse tail, then fix pointer
- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) — Recursive backtracking with open/close counts
- [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) — Pure recursion with overlapping subproblems
- [Pow(x, n)](https://leetcode.com/problems/powx-n/) — Recursive exponentiation by squaring
