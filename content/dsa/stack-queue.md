# Stack & Queue

**Definition:** **Stack** LIFO hai (last-in, first-out) — plate ka dher, ek hi end se push/pop, `O(1)`. **Queue** FIFO hai (first-in, first-out) — line, tail se enqueue head se dequeue. Stack nesting/undo sambhalta hai; queue ordering/levels.

**When to use:** Stack → valid brackets, min so far, RPN evaluate, DFS recursion, monotonic next greater (alag page). Queue → BFS levels, sliding window deque, task order.

**How it works:** Stack: open push, close par matching pop; empty/mismatch check. Queue JS me array `push`/`shift` (ya deque pointer). Min-stack ke liye parallel minima stack. Time `O(n)`, space `O(n)`.

```js
// Stack skeleton — brackets / nesting
// Hinglish: open push, close par pop-match
const stack = [];
for (const ch of s) {
  if (isOpen(ch)) stack.push(ch);
  else {
    if (!stack.length || !matches(stack.pop(), ch)) return false; // mismatch
  }
}
if (stack.length) return false; // kuch bacha to invalid

// Queue skeleton — BFS me use (Trees/Graphs dekho)
// Hinglish: line me lagao, aage se nikalo
const q = [start];
while (q.length) { const x = q.shift(); /* ... q.push(neighbors) */ }
```
## Valid Parentheses

Push every opener. On a closer, the top must be its match. Stack empty at the end means it nested cleanly.

[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

```js
// Hinglish: stack push-pop — ek-ek step comment dekho
// Stack — match open/close
// LC: https://leetcode.com/problems/valid-parentheses/
function isValid(s) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: stack push-pop — ek-ek step comment dekho
// Stack — parallel min stack
// LC: https://leetcode.com/problems/min-stack/
function MinStack() {
  // Hinglish: step 1 — base case check karo
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
