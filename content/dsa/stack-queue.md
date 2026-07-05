# Stack & Queue

A **stack** is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (the top). A **queue** is a First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front. Both are linear abstract data types fundamental to countless algorithms — stacks model function calls, parsing, and backtracking; queues model processing pipelines, breadth-first traversal, and scheduling. They can be implemented using arrays (efficient but bounded) or linked lists (dynamic but more overhead).

Beyond their textbook definitions, stacks and queues serve as the scaffolding for more advanced patterns like monotonic stacks, sliding window maximums (via deques), and breadth-first search. Understanding their internal mechanics — and the tradeoffs between array-backed vs. pointer-based implementations — is critical for writing correct, performant code in both interviews and production systems.

## When to use

- Parenthesis or bracket matching — push opening brackets, pop on closing; mismatched top means invalid
- Expression evaluation (infix to postfix, postfix evaluation) — stack holds operands and operators, pop on evaluation
- Undo/redo in editors — two stacks track state history (undo pops one, redo pops the other)
- Breadth-first search (BFS) on graphs/trees — queue holds nodes to visit level by level
- Sliding window maximum — deque stores candidate indices, popping expired and smaller elements in O(n)
- Depth-first search (DFS) and backtracking — implicit stack from recursion or an explicit stack for tree/graph traversal
- Call stack simulation — detecting balanced tags in HTML/XML or tracking nested scopes in a parser
- Print spooling / task scheduling — queue holds jobs in the order they arrive for FIFO processing
- Implementing a cache using LRU — doubly-linked list with a hash map (FIFO eviction with queue-like behavior)
- Validating palindrome with a stack — push first half, pop and compare with second half

## How it works

### Core concept

A stack exposes three core operations: **push** (add to top), **pop** (remove from top), and **peek** (view top without removal). The invariant is that the element most recently pushed is always the first one popped. An array-backed stack uses a single pointer (the top index); pushing increments it, popping decrements it. A linked-list stack pushes by inserting at the head and pops by removing the head — both O(1). The array approach is cache-friendly and fast but may need resizing; the linked-list approach never resizes but incurs per-node allocation overhead.

A queue provides **enqueue** (add at rear), **dequeue** (remove from front), and **peek** (view front). An array-based circular queue uses two indices (front and rear) modulo capacity to avoid shifting elements. A linked-list queue maintains head and tail pointers — enqueue appends at the tail, dequeue removes the head. The circular array avoids the O(n) shift cost of a naive array queue but requires capacity planning; the linked-list queue is truly dynamic and each operation is still O(1).

### Step-by-step approach

1. **Choose your structure.** Ask: does the problem need LIFO (stack) or FIFO (queue)? For LIFO, consider using the native array with push/pop. For queue in JavaScript, use an array with push/shift (O(n) shift) or maintain a proper linked-list queue.
2. **Initialize.** For stack: `const stack = []`. For queue: `const queue = []` or use a custom class with head/tail pointers.
3. **Iterate and process.** For valid parentheses: scan the string; if opening bracket `([{`, push onto the stack. If closing bracket, check if the stack is non-empty and the top matches — if so, pop; otherwise, return false.
4. **Final check.** After the loop, if the stack is empty, all brackets were matched; otherwise, there are unmatched open brackets.
5. **Handle edge inputs.** Empty string is trivially valid. Single opening bracket should return false.

### Complexity

- **Time:** O(n) — each element is pushed and popped at most once, so the total work across all stack/queue operations is linear in input size.
- **Space:** O(n) — in the worst case the stack or queue holds all elements (e.g., all opening brackets before any closing bracket, or all nodes at the widest level of a BFS).

```js
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
```

## Variations

- **Deque (double-ended queue):** Supports push/pop at both ends. Useful for sliding window problems where you need to remove from both the front (expired elements) and the back (maintain order).
- **Circular queue:** Fixed-size array with front/rear pointers that wrap around using modulo. Ubiquitous in embedded systems and low-level I/O buffers where dynamic allocation is undesirable.
- **Priority queue (heap):** Elements are dequeued by priority, not insertion order. Implemented with a binary heap; used in Dijkstra's algorithm, Huffman coding, and A* search.
- **Monotonic stack:** A stack whose elements remain in increasing or decreasing order by popping violating elements before each push. Used for next greater element, histogram area, and trapping rain water.
- **Stack using queues / Queue using stacks:** Classic interview exercises that demonstrate how one ADT can simulate the other by reversing the order of operations (e.g., two stacks make a queue by reversing twice).
- **Min/Max stack:** Augments a standard stack with a second stack (or pair) tracking the minimum or maximum element so you can query it in O(1) at any point.

## Edge cases

- **Empty stack/queue:** Calling pop, dequeue, or peek on an empty structure — always guard with a length check before access.
- **Single element:** Works trivially for both structures but reveals whether the implementation correctly handles front == rear for queues.
- **Large push/pop sequences:** Array-based stacks may need resizing (amortized O(1)); linked-list stacks handle arbitrarily many pushes but consume per-node memory.
- **Underflow:** Attempting to pop from an empty stack (or dequeue from an empty queue) should return null or throw a meaningful error, not crash.
- **Overflow in bounded implementations:** A fixed-size circular queue must distinguish full from empty — typically by wasting one slot or tracking count separately.
- **Bracket-like patterns with interleaved types:** Test `([)]` which is invalid even though counts match — the stack catches the mismatch because the top doesn't pair.
- **Null/undefined input:** Check the input type before iterating; return false or throw for non-string/non-array inputs.

## Practice problems

- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) — Canonical stack problem checking bracket balance
- [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) — Two stacks simulate FIFO using amortized O(1) transfers
- [Min Stack](https://leetcode.com/problems/min-stack/) — Design a stack that supports push, pop, top, and retrieving the minimum in O(1)
- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) — Deque maintains candidate indices for O(n) window max queries
- [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) — Stack-driven postfix expression evaluation
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) — BFS queue processes tree nodes level by level
- [Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/) — Queue of timestamps with sliding window eviction
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) — Monotonic stack computes maximum rectangle area in O(n)
