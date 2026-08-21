# Stack & Queue

Stack = last in, first out (match, undo, nest). Queue = first in, first out (BFS order). Array `push`/`pop` is a stack; `push`/`shift` is a queue.

```js
// Stack skeleton
const stack = [];
for (const x of items) {
  // while top can be resolved, pop
  stack.push(x);
}
```

## Valid Parentheses

Push openers, pop on close — [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/).

```js
// Stack — match open/close
// LC: https://leetcode.com/problems/valid-parentheses/
function isValid(s) {
  const stack = [];
  const pair = { ")": "(", "]": "[", "}": "{" };
  for (const ch of s) {
    if (!pair[ch]) {
      stack.push(ch); // opener
      continue;
    }
    if (stack.pop() !== pair[ch]) return false; // mismatch
  }
  return stack.length === 0;
}
```

## Queue from two stacks

Inbox + outbox — [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/).

```js
// Queue — two stacks (in / out)
// LC: https://leetcode.com/problems/implement-queue-using-stacks/
function MyQueue() {
  this.inn = [];
  this.out = [];
}
MyQueue.prototype.push = function (x) {
  this.inn.push(x);
};
MyQueue.prototype._move = function () {
  if (this.out.length) return;
  while (this.inn.length) this.out.push(this.inn.pop());
};
MyQueue.prototype.pop = function () {
  this._move();
  return this.out.pop();
};
MyQueue.prototype.peek = function () {
  this._move();
  return this.out[this.out.length - 1];
};
MyQueue.prototype.empty = function () {
  return !this.inn.length && !this.out.length;
};
```

## Decode String

Stack of [count, string] — [Decode String](https://leetcode.com/problems/decode-string/).

```js
// Stack — nested repeat
// LC: https://leetcode.com/problems/decode-string/
function decodeString(s) {
  const stack = [];
  let cur = "", k = 0;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") {
      k = k * 10 + Number(ch);
    } else if (ch === "[") {
      stack.push([cur, k]); // save outer
      cur = "";
      k = 0;
    } else if (ch === "]") {
      const [prev, n] = stack.pop();
      cur = prev + cur.repeat(n); // close this nest
    } else {
      cur += ch;
    }
  }
  return cur;
}
```

**More:** [Min Stack](https://leetcode.com/problems/min-stack/), [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/), [Asteroid Collision](https://leetcode.com/problems/asteroid-collision/).
