# Stack

**Definition:** Stack LIFO hai (last-in, first-out) — plate ka dher, ek hi end se push/pop, `O(1)`. Nesting, undo aur "pichhla yaad rakho" wale kaam stack ke hain.

**When to use:** Valid brackets, min so far, RPN evaluate, DFS recursion, monotonic next greater (alag page), ya do stack se queue banana.

**How it works:** Open push, close par matching pop; empty/mismatch check. Min-stack ke liye parallel minima stack rakho. Time `O(n)`, space `O(n)`.

```js
// Stack skeleton — brackets / nesting
// stack: push openers; pop and match closers
const stack = [];
for (const ch of s) {
  if (isOpen(ch)) stack.push(ch);
  else {
    if (!stack.length || !matches(stack.pop(), ch)) return false; // mismatch
  }
}
if (stack.length) return false; // unmatched open brackets remain — invalid
```
## Valid Parentheses

Push every opener. On a closer, the top must be its match. Stack empty at the end means it nested cleanly.

[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

```js
// stack push opens; pop must match close
// Stack — match open/close
// LC: https://leetcode.com/problems/valid-parentheses/
var isValid = function(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      let prevVal = stack.pop();

      if (prevVal === "(" && char !== ")") return false;
      if (prevVal === "[" && char !== "]") return false;
      if (prevVal === "{" && char !== "}") return false;
      if (prevVal === undefined) return false;
    }
  }

  return stack.length === 0;
};
```

## Min Stack

I keep a second stack of the min after each push. Pop both together. `getMin` is just the top of the min stack.

[Min Stack](https://leetcode.com/problems/min-stack/)

```js
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

## Evaluate Reverse Polish Notation

Stack me number push, operator aaye to top 2 pop karke compute karke wapas push karo.

[Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

```js
// LC: https://leetcode.com/problems/evaluate-reverse-polish-notation/
function evalRPN(tokens) {
  // evaluate RPN with operand stack
  const st=[];
  for (const t of tokens) {
    if (["+","-","*","/"].includes(t)) {
      const b=st.pop(), a=st.pop(); // pop two operands for binary operator
      let v=0;
      if (t==='+') v=a+b; else if (t==='-') v=a-b; else if (t==='*') v=a*b; else v=Math.trunc(a/b); // integer division truncates toward zero
      st.push(v);
    } else st.push(Number(t)); // push numeric token onto stack
  }
  return st[0];
}
```

## Daily Temperatures (Stack)

Monotonic decreasing stack se next warmer day ka wait nikalo. (Monotonic page se link)

[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

```js
// LC: https://leetcode.com/problems/daily-temperatures/
function dailyTemperatures(temps) {
  // monotonic stack — keep decreasing values
  const n=temps.length, ans=Array(n).fill(0), st=[];
  for (let i=0;i<n;i++) {
    while(st.length && temps[i] > temps[st.at(-1)]) {
      const j=st.pop(); ans[j]=i-j; // warmer day found — record wait since index j
    }
    st.push(i);
  }
  return ans;
}
```

## Asteroid Collision

Asteroid left/right move karte hain. Stack me rakho, opposite direction aaye to takkar.

[Asteroid Collision](https://leetcode.com/problems/asteroid-collision/)

```js
// LC: https://leetcode.com/problems/asteroid-collision/
function asteroidCollision(asteroids) {
  // stack holds asteroids that survive so far
  const st=[];
  for (const a of asteroids) {
    let cur=a;
    while (st.length && cur<0 && st.at(-1)>0) {
      const top=st.at(-1);
      if (Math.abs(top) < Math.abs(cur)) { st.pop(); continue; } // smaller top destroyed by current
      else if (Math.abs(top) === Math.abs(cur)) { st.pop(); cur=0; break; } // equal magnitude — both annihilate
      else { cur=0; break; } // current smaller — it is destroyed
    }
    if (cur!==0) st.push(cur);
  }
  return st;
}
```

## Implement Queue using Stacks

Do stack lo — ek me push, doosre se pop. Pop/peek pe doosra khaali ho to pehle ka sab ulta daalo. Amortized `O(1)`.

[Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)

```js
// LC: https://leetcode.com/problems/implement-queue-using-stacks/
function MyQueue() {
  // inSt: enqueue side; outSt: dequeue side (FIFO at pop end)
  this.inSt = [];
  this.outSt = [];
}
MyQueue.prototype.push = function (x) {
  this.inSt.push(x);
};
MyQueue.prototype.pop = function () {
  // Lazy transfer: oldest elements land on outSt top
  if (!this.outSt.length) {
    while (this.inSt.length) this.outSt.push(this.inSt.pop());
  }
  return this.outSt.pop();
};
MyQueue.prototype.peek = function () {
  if (!this.outSt.length) {
    while (this.inSt.length) this.outSt.push(this.inSt.pop());
  }
  return this.outSt.at(-1);
};
MyQueue.prototype.empty = function () {
  return !this.inSt.length && !this.outSt.length;
};
```
