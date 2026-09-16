import type { SolutionGroup } from "./types";

export const DESIGN_DATA_STRUCTURES_SOLUTIONS: SolutionGroup = {
  id: "design-data-structures",
  title: "Design / Data Structures",
  subs: [
    {
      title: "Interview Design Classics",
      topics: [
    {
      id: 232,
      lcSlug: "implement-queue-using-stacks",
      title: "Implement Queue using Stacks",
      diff: "Easy",
      body: `Use two stacks: push on one, pop/peek from the other. When the output stack is empty, pour the input stack into it. Amortized \`O(1)\` per operation.

[Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 225,
      lcSlug: "implement-stack-using-queues",
      title: "Implement Stack using Queues",
      diff: "Easy",
      body: `Use one queue: after each push, rotate so the newest element is at the front. Pop and top stay \`O(1)\`.

[Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 622,
      lcSlug: "design-circular-queue",
      title: "Design Circular Queue",
      diff: "Medium",
      body: `Fixed capacity \`k\`: track head and count, wrap indices with \`% k\`. Distinguish full vs empty with count, not pointers alone.

[Design Circular Queue](https://leetcode.com/problems/design-circular-queue/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 641,
      lcSlug: "design-circular-deque",
      title: "Design Circular Deque",
      diff: "Medium",
      body: `Same idea as a circular queue, but insert and delete at both ends using modulo on head and count.

[Design Circular Deque](https://leetcode.com/problems/design-circular-deque/)

\`\`\`js
// LC: https://leetcode.com/problems/design-circular-deque/
function MyCircularDeque(k) {
  this.a = Array(k);
  this.head = 0; this.count = 0; this.k = k;
}
MyCircularDeque.prototype.insertFront = function (v) {
  if (this.isFull()) return false;
  this.head = (this.head - 1 + this.k) % this.k; // step head backward with wrap
  this.a[this.head] = v; this.count++;
  return true;
};
MyCircularDeque.prototype.insertLast = function (v) {
  if (this.isFull()) return false;
  this.a[(this.head + this.count) % this.k] = v; // tail slot after current items
  this.count++;
  return true;
};
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.k; this.count--; // drop front, advance head
  return true;
};
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false;
  this.count--; // tail moves back implicitly
  return true;
};
MyCircularDeque.prototype.getFront = function () {
  return this.isEmpty() ? -1 : this.a[this.head];
};
MyCircularDeque.prototype.getRear = function () {
  return this.isEmpty() ? -1 : this.a[(this.head + this.count - 1) % this.k];
};
MyCircularDeque.prototype.isEmpty = function () { return this.count === 0; };
MyCircularDeque.prototype.isFull = function () { return this.count === this.k; };
\`\`\``,
    },
    {
      id: 705,
      lcSlug: "design-hashset",
      title: "Design HashSet",
      diff: "Easy",
      body: `Separate chaining: hash to a bucket, search the bucket list. Simple and enough for interviews.

[Design HashSet](https://leetcode.com/problems/design-hashset/)

\`\`\`js
// LC: https://leetcode.com/problems/design-hashset/
function MyHashSet() {
  this.size = 1009;
  this.buckets = Array.from({ length: this.size }, () => []);
}
MyHashSet.prototype._h = function (key) { return key % this.size; };
MyHashSet.prototype.add = function (key) {
  const b = this.buckets[this._h(key)]; // chain in bucket
  if (!b.includes(key)) b.push(key); // ignore duplicate insert
};
MyHashSet.prototype.remove = function (key) {
  const b = this.buckets[this._h(key)];
  const i = b.indexOf(key); // linear scan in bucket
  if (i >= 0) b.splice(i, 1);
};
MyHashSet.prototype.contains = function (key) {
  return this.buckets[this._h(key)].includes(key); // search chain
};
\`\`\``,
    },
    {
      id: 706,
      lcSlug: "design-hashmap",
      title: "Design HashMap",
      diff: "Easy",
      body: `Same chaining design as HashSet, but store \`[key, value]\` pairs in each bucket.

[Design HashMap](https://leetcode.com/problems/design-hashmap/)

\`\`\`js
// LC: https://leetcode.com/problems/design-hashmap/
function MyHashMap() {
  this.size = 1009;
  this.buckets = Array.from({ length: this.size }, () => []);
}
MyHashMap.prototype._h = function (key) { return key % this.size; };
MyHashMap.prototype.put = function (key, value) {
  const b = this.buckets[this._h(key)];
  for (const p of b) {
    if (p[0] === key) { p[1] = value; return; }
  }
  b.push([key, value]);
};
MyHashMap.prototype.get = function (key) {
  const b = this.buckets[this._h(key)];
  for (const p of b) if (p[0] === key) return p[1];
  return -1;
};
MyHashMap.prototype.remove = function (key) {
  const b = this.buckets[this._h(key)];
  for (let i = 0; i < b.length; i++) {
    if (b[i][0] === key) { b.splice(i, 1); return; }
  }
};
\`\`\``,
    },
    {
      id: 981,
      lcSlug: "time-based-key-value-store",
      title: "Time Based Key-Value Store",
      diff: "Medium",
      body: `Append \`(timestamp, value)\` per key. On get, binary search for the latest timestamp \`<=\` query time.

[Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/)

\`\`\`js
// LC: https://leetcode.com/problems/time-based-key-value-store/
function TimeMap() {
  this.store = new Map();
}
TimeMap.prototype.set = function (key, value, timestamp) {
  if (!this.store.has(key)) this.store.set(key, []);
  this.store.get(key).push([timestamp, value]);
};
TimeMap.prototype.get = function (key, timestamp) {
  const arr = this.store.get(key) || [];
  let lo = 0, hi = arr.length - 1, ans = "";
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid][0] <= timestamp) { ans = arr[mid][1]; lo = mid + 1; }
    else hi = mid - 1;
  }
  return ans;
};
\`\`\``,
    },
      ],
    },
  ],
};
