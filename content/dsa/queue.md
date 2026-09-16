# Queue

**Definition:** Queue FIFO hai (first-in, first-out) — line, tail se enqueue head se dequeue, `O(1)`. Ordering aur levels sambhalta hai — BFS, task order, sliding window.

**When to use:** BFS levels, recent calls jaisa time window, task scheduling, ya do queue se stack banana. Fixed size ho to circular queue banao.

**How it works:** JS me array `push`/`shift` se queue banti hai (shift `O(n)` hai, bade input pe head pointer ya deque use karo). Circular queue me head + count + modulo se ghoomo. Time `O(n)`, space `O(n)`.

```js
// Queue skeleton — enqueue at back, dequeue from front (FIFO)
// queue: enqueue at back, dequeue from front
const q = [start];
while (q.length) {
  const x = q.shift(); // pop from outStack — amortized O(1) dequeue
  // ... kaam ...
  for (const nxt of neighbors(x)) q.push(nxt); // enqueue neighbor at back
}

// Circular queue skeleton — fixed size, modulo from ghoomo
// ring buffer: head index + count modulo capacity
const a = Array(k).fill(0);
let head = 0, count = 0;
const idx = (head + count) % k; // next enqueue slot at (head+count) % k
```
## Number of Recent Calls

3000ms window ke andar kitne ping aaye? Queue me time daalo, purane nikalo, length gin lo.

[Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/)

```js
// LC: https://leetcode.com/problems/number-of-recent-calls/
function RecentCounter() {
  // BFS uses a FIFO queue
  this.q = [];
}
RecentCounter.prototype.ping = function (t) {
  this.q.push(t); // enqueue new ping timestamp
  while (this.q[0] < t - 3000) this.q.shift(); // drop timestamps older than 3000ms window
  return this.q.length; // return count of requests in last 3000ms
};
```

## Implement Stack using Queues

Ek queue lo — push ke baad purane sab ghuma ke piche daal do, taaki naya aage rahe. Pop/shift `O(1)`.

[Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)

```js
// LC: https://leetcode.com/problems/implement-stack-using-queues/
function MyStack() {
  this.q = [];
}
MyStack.prototype.push = function (x) {
  this.q.push(x);
  // Rotate so newest element sits at front (stack top)
  for (let i = 1; i < this.q.length; i++) this.q.push(this.q.shift());
};
MyStack.prototype.pop = function () {
  return this.q.shift();
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
// LC: https://leetcode.com/problems/design-circular-queue/
function MyCircularQueue(k) {
  this.a = Array(k).fill(0);
  this.head = 0;
  this.count = 0;
  this.k = k;
}
MyCircularQueue.prototype.enQueue = function (v) {
  if (this.isFull()) return false;
  // Tail slot wraps with modulo capacity
  this.a[(this.head + this.count) % this.k] = v;
  this.count++;
  return true;
};
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.k;
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
