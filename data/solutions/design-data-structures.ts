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
      body: `Do stack lo — ek me push, doosre se pop. Pop/peek pe doosra khaali ho to pehle ka sab ulta daalo. Amortized \`O(1)\`.

[Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)

\`\`\`js
// Hinglish: stack push-pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/implement-queue-using-stacks/
function MyQueue() {
  // Hinglish: in me push, out se pop
  this.inSt = [];
  this.outSt = [];
}
MyQueue.prototype.push = function (x) {
  this.inSt.push(x); // Hinglish: andar daalo
};
MyQueue.prototype.pop = function () {
  if (!this.outSt.length) {
    while (this.inSt.length) this.outSt.push(this.inSt.pop()); // Hinglish: ulta daalo
  }
  return this.outSt.pop(); // Hinglish: aage wala nikala
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
      body: `Ek queue lo — push ke baad purane sab ghuma ke piche daal do, taaki naya aage rahe. Pop/shift \`O(1)\`.

[Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 622,
      lcSlug: "design-circular-queue",
      title: "Design Circular Queue",
      diff: "Medium",
      body: `Fixed size \`k\` — head + count rakho, index \`% k\` se ghoomo. Full/empty ka farak count se karo.

[Design Circular Queue](https://leetcode.com/problems/design-circular-queue/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 641,
      lcSlug: "design-circular-deque",
      title: "Design Circular Deque",
      diff: "Medium",
      body: `Circular queue jaisa, dono taraf se jodo-nikalo — head/tail modulo se ghoomo.

[Design Circular Deque](https://leetcode.com/problems/design-circular-deque/)

\`\`\`js
// Hinglish: dono taraf ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-circular-deque/
function MyCircularDeque(k) {
  // Hinglish: step 1 — array lo
  this.a = Array(k);
  this.head = 0; this.count = 0; this.k = k;
}
MyCircularDeque.prototype.insertFront = function (v) {
  if (this.isFull()) return false;
  this.head = (this.head - 1 + this.k) % this.k; // Hinglish: peeche ghoomo
  this.a[this.head] = v; this.count++;
  return true;
};
MyCircularDeque.prototype.insertLast = function (v) {
  if (this.isFull()) return false;
  this.a[(this.head + this.count) % this.k] = v; // Hinglish: aakhir me jodo
  this.count++;
  return true;
};
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.k; this.count--; // Hinglish: aage badho
  return true;
};
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false;
  this.count--; // Hinglish: peeche ghatao
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
      body: `Buckets me chains rakho — hash se bucket nikalo, list me dhoondo. Simple chaining kaafi hai.

[Design HashSet](https://leetcode.com/problems/design-hashset/)

\`\`\`js
// Hinglish: bucket me chain — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-hashset/
function MyHashSet() {
  // Hinglish: step 1 — buckets lo
  this.size = 1009;
  this.buckets = Array.from({ length: this.size }, () => []);
}
MyHashSet.prototype._h = function (key) { return key % this.size; }; // Hinglish: bucket nikalo
MyHashSet.prototype.add = function (key) {
  const b = this.buckets[this._h(key)];
  if (!b.includes(key)) b.push(key); // Hinglish: naya ho to jodo
};
MyHashSet.prototype.remove = function (key) {
  const b = this.buckets[this._h(key)];
  const i = b.indexOf(key);
  if (i >= 0) b.splice(i, 1); // Hinglish: mila to hatao
};
MyHashSet.prototype.contains = function (key) {
  return this.buckets[this._h(key)].includes(key); // Hinglish: dhoondo
};
\`\`\``,
    },
    {
      id: 706,
      lcSlug: "design-hashmap",
      title: "Design HashMap",
      diff: "Easy",
      body: `Upar wala hi, value ke saath — key-value jode chains me rakho.

[Design HashMap](https://leetcode.com/problems/design-hashmap/)

\`\`\`js
// Hinglish: jode chains me — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-hashmap/
function MyHashMap() {
  // Hinglish: step 1 — buckets lo
  this.size = 1009;
  this.buckets = Array.from({ length: this.size }, () => []);
}
MyHashMap.prototype._h = function (key) { return key % this.size; }; // Hinglish: bucket nikalo
MyHashMap.prototype.put = function (key, value) {
  const b = this.buckets[this._h(key)];
  for (const p of b) {
    if (p[0] === key) { p[1] = value; return; } // Hinglish: mila to update karo
  }
  b.push([key, value]); // Hinglish: naya jodo
};
MyHashMap.prototype.get = function (key) {
  const b = this.buckets[this._h(key)];
  for (const p of b) if (p[0] === key) return p[1]; // Hinglish: dhoondo
  return -1;
};
MyHashMap.prototype.remove = function (key) {
  const b = this.buckets[this._h(key)];
  for (let i = 0; i < b.length; i++) {
    if (b[i][0] === key) { b.splice(i, 1); return; } // Hinglish: mila to hatao
  }
};
\`\`\``,
    },
    {
      id: 981,
      lcSlug: "time-based-key-value-store",
      title: "Time Based Key-Value Store",
      diff: "Medium",
      body: `Har key ki history rakho — get pe binary search se sahi time wala nikalo.

[Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/)

\`\`\`js
// Hinglish: history + binary search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/time-based-key-value-store/
function TimeMap() {
  // Hinglish: step 1 — map lo
  this.store = new Map();
}
TimeMap.prototype.set = function (key, value, timestamp) {
  if (!this.store.has(key)) this.store.set(key, []);
  this.store.get(key).push([timestamp, value]); // Hinglish: time order me aata hai
};
TimeMap.prototype.get = function (key, timestamp) {
  const arr = this.store.get(key) || [];
  let lo = 0, hi = arr.length - 1, ans = "";
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid][0] <= timestamp) { ans = arr[mid][1]; lo = mid + 1; } // Hinglish: ye chalega, aur naya dekho
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
