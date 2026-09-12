# Queue

**Definition:** Queue FIFO hai (first-in, first-out) — line, tail se enqueue head se dequeue, `O(1)`. Ordering aur levels sambhalta hai — BFS, task order, sliding window.

**When to use:** BFS levels, recent calls jaisa time window, task scheduling, ya do queue se stack banana. Fixed size ho to circular queue banao.

**How it works:** JS me array `push`/`shift` se queue banti hai (shift `O(n)` hai, bade input pe head pointer ya deque use karo). Circular queue me head + count + modulo se ghoomo. Time `O(n)`, space `O(n)`.

```js
// Queue skeleton — line me lagao, aage se nikalo
// Hinglish: piche jodo, aage se lo
const q = [start];
while (q.length) {
  const x = q.shift(); // Hinglish: aage wala nikala
  // ... kaam karo ...
  for (const nxt of neighbors(x)) q.push(nxt); // Hinglish: piche jodo
}

// Circular queue skeleton — fixed size, modulo se ghoomo
// Hinglish: head + count, index % k
const a = Array(k).fill(0);
let head = 0, count = 0;
const idx = (head + count) % k; // Hinglish: pichhli khaali jagah
```
## Number of Recent Calls

3000ms window ke andar kitne ping aaye? Queue me time daalo, purane nikalo, length gin lo.

[Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/)

```js
// Hinglish: queue push-shift — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-recent-calls/
function RecentCounter() {
  // Hinglish: step 1 — queue lo
  this.q = [];
}
RecentCounter.prototype.ping = function (t) {
  this.q.push(t); // Hinglish: naya time jodo
  while (this.q[0] < t - 3000) this.q.shift(); // Hinglish: purane nikalo
  return this.q.length; // Hinglish: window me kitne
};
```

## Implement Stack using Queues

Ek queue lo — push ke baad purane sab ghuma ke piche daal do, taaki naya aage rahe. Pop/shift `O(1)`.

[Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)

```js
// Hinglish: queue push-shift — ek-ek step comment dekho
// LC: https://leetcode.com/problems/implement-stack-using-queues/
function MyStack() {
  // Hinglish: step 1 — queue lo
  this.q = [];
}
MyStack.prototype.push = function (x) {
  this.q.push(x); // Hinglish: piche jodo
  for (let i = 1; i < this.q.length; i++) this.q.push(this.q.shift()); // Hinglish: purane ghumao
};
MyStack.prototype.pop = function () {
  return this.q.shift(); // Hinglish: aage wala = top
};
MyStack.prototype.top = function () {
  return this.q[0];
};
MyStack.prototype.empty = function () {
  return !this.q.length;
};
```

## Design Circular Queue

Fixed size `k` — head + count rakho, index `% k` se ghoomo. Full/empty ka farak count se karo.

[Design Circular Queue](https://leetcode.com/problems/design-circular-queue/)

```js
// Hinglish: queue push-shift — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-circular-queue/
function MyCircularQueue(k) {
  // Hinglish: step 1 — array + head + count
  this.a = Array(k).fill(0);
  this.head = 0;
  this.count = 0;
  this.k = k;
}
MyCircularQueue.prototype.enQueue = function (v) {
  if (this.isFull()) return false;
  this.a[(this.head + this.count) % this.k] = v; // Hinglish: pichhli jagah
  this.count++;
  return true;
};
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.k; // Hinglish: aage badho
  this.count--;
  return true;
};
MyCircularQueue.prototype.Front = function () {
  return this.isEmpty() ? -1 : this.a[this.head];
};
MyCircularQueue.prototype.Rear = function () {
  return this.isEmpty() ? -1 : this.a[(this.head + this.count - 1) % this.k];
};
MyCircularQueue.prototype.isEmpty = function () {
  return this.count === 0;
};
MyCircularQueue.prototype.isFull = function () {
  return this.count === this.k;
};
```
