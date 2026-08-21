# Stack & Queue

A stack is a pile of plates — last one I put is the first I take. Brackets and “min so far” live here. A queue is a line — first in, first out. BFS uses a queue; that is on the trees/graphs pages.

```js
// Stack skeleton
const stack = [];
for (const ch of s) {
  // if this closes something, pop
  // else push
}
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
