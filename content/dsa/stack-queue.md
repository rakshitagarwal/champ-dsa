# Stack & Queue

**Definition:** A **stack** is LIFO (last-in, first-out) — like a pile of plates; push/pop at one end, `O(1)`. A **queue** is FIFO (first-in, first-out) — like a line; enqueue at tail, dequeue at head. Stacks handle nesting/undo; queues handle ordering/levels.

**When to use:** Stack → valid brackets, min so far, evaluate RPN, DFS recursion, monotonic next greater (separate page). Queue → BFS levels, sliding window deque, task scheduling.

**How it works:** Stack: push opens, pop on matching close; check empty/mismatch. Queue in JS is array with `push`/`shift` (or deque pointer). For min-stack keep parallel stack of minima. Time `O(n)`, space `O(n)`.

```js
// Stack skeleton — brackets / nesting
const stack = [];
for (const ch of s) {
  if (isOpen(ch)) stack.push(ch);
  else {
    if (!stack.length || !matches(stack.pop(), ch)) return false;
  }
}
if (stack.length) return false;

// Queue skeleton — BFS uses queue (see Trees/Graphs)
const q = [start];
while (q.length) { const x = q.shift(); /* ... q.push(neighbors) */ }
```

## Valid Parentheses

Push every opener. On a closer, the top must be its match. Stack empty at the end means it nested cleanly.

[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

```js
// Stack — match open/close
// LC: https://leetcode.com/problems/valid-parentheses/
function isValid(s) {
  const stack = [];
  const pair = { ")": "(", "]": "[", "}": "{" };
  for (const ch of s) {
    if (!pair[ch]) {
      stack.push(ch);
      continue;
    }
    if (stack.pop() !== pair[ch]) return false;
  }
  return stack.length === 0;
}
```

## Min Stack

I keep a second stack of the min after each push. Pop both together. `getMin` is just the top of the min stack.

[Min Stack](https://leetcode.com/problems/min-stack/)

```js
// Stack — parallel min stack
// LC: https://leetcode.com/problems/min-stack/
function MinStack() {
  this.vals = [];
  this.mins = [];
}
MinStack.prototype.push = function (val) {
  this.vals.push(val);
  const m = this.mins.length ? this.mins.at(-1) : Infinity;
  this.mins.push(Math.min(m, val));
};
MinStack.prototype.pop = function () {
  this.vals.pop();
  this.mins.pop();
};
MinStack.prototype.top = function () {
  return this.vals.at(-1);
};
MinStack.prototype.getMin = function () {
  return this.mins.at(-1);
};
```
