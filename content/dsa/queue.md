# Queue

**Definition:** Queue **FIFO** hai (first-in, first-out) — line: peeche se enqueue, aage se dequeue, ideal `O(1)`. Ordering aur levels sambhalta hai — BFS, task order, sliding time windows. **Deque** (double-ended queue) dono ends se add/remove karta hai — sliding window maximum, monotonic queue.

**When to use:** BFS levels, recent-calls jaisa time window, task scheduling, stack-via-queues, circular buffer. Window ka max/min chahiye to **deque of indices**.

**How it works:** JS me `push` + `shift` se queue (shift `O(n)` — bade n pe head index ya proper deque). Circular queue: `head + count + % k`. Deque: back pe badhte indices, front se stale/chhote nikaalo.

## Study notes

### Queue vs Stack vs Deque
| Structure | Order | Typical use |
| --- | --- | --- |
| Stack | LIFO | brackets, DFS, undo |
| Queue | FIFO | BFS levels, order |
| Deque | both ends | window max, mono queue |

### BFS level loop (must memorize)
```js
const q = [start];
while (q.length) {
  const size = q.length; // current level width
  for (let i = 0; i < size; i++) {
    const node = q.shift();
    // visit neighbors → q.push
  }
  // steps++ here if counting levels
}
```

### Deque pattern (sliding window maximum)
- Store **indices**, not values.
- Back: while last index's value ≤ current, pop (monotonic decreasing).
- Front: if index out of window `i-k`, pop.
- Front = current max.

### Traps
- `shift()` in tight loops is `O(n)` — mention in interview; for LC often OK.
- Forget `visited` in BFS → infinite.
- Circular queue: confuse full vs empty without `count`.

```js
// Queue skeleton — enqueue at back, dequeue from front (FIFO)
const q = [start];
while (q.length) {
  const x = q.shift();
  for (const nxt of neighbors(x)) q.push(nxt);
}

// Deque skeleton — sliding window maximum (indices)
const dq = []; // indices, values decreasing toward front
for (let i = 0; i < n; i++) {
  while (dq.length && nums[dq.at(-1)] <= nums[i]) dq.pop();
  dq.push(i);
  if (dq[0] <= i - k) dq.shift(); // left of window
  if (i >= k - 1) ans.push(nums[dq[0]]);
}

// Circular queue skeleton — fixed size, modulo
const a = Array(k).fill(0);
let head = 0, count = 0;
const enqIdx = (head + count) % k;
```
## Number of Recent Calls

3000ms window ke andar kitne ping aaye? Queue me time daalo, purane nikalo, length gin lo.

[Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/)

```js
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(n)
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
