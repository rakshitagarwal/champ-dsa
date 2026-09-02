# Heap

**Definition:** A heap (priority queue) is a complete binary tree where parent ≤ children (min-heap) or ≥ (max-heap), giving `O(log n)` push/pop and `O(1)` peek of the smallest/largest. JS has no built-in heap — the helpers below are the copy-paste implementation.

**When to use:** "Top K", "K-th largest/smallest", "always pick current best", or "merge K sorted lists/arrays." Keep heap size = K and evict anything worse.

**How it works:** Array-backed binary heap with `heapPush` (bubble up) and `heapPop` (bubble down). For top-K smallest keep a max-heap of size K. Merge K lists: push each head, repeatedly pop min and push its `next`. Time `O(n log K)`, space `O(K)`.

```js
// Heap skeleton — copy into interview (min-heap by default)
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!less(h[i], h[p])) break;
    [h[i], h[p]] = [h[p], h[i]];
    i = p;
  }
}
function heapPop(h, less = (a, b) => a < b) {
  const top = h[0], last = h.pop();
  if (!h.length) return top;
  h[0] = last;
  let i = 0;
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1;
    if (l < h.length && less(h[l], h[m])) m = l;
    if (r < h.length && less(h[r], h[m])) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
  return top;
}

// Top-K skeleton
const heap = [];
for (const x of nums) { heapPush(heap, x); if (heap.length > k) heapPop(heap); }
```

## Kth Largest Element in an Array

Min-heap of size k. The top is the kth largest. Everything smaller got popped.

[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

```js
// Heap — keep k largest
// LC: https://leetcode.com/problems/kth-largest-element-in-an-array/
function findKthLargest(nums, k) {
  const h = [];
  for (const x of nums) {
    heapPush(h, x);
    if (h.length > k) heapPop(h);
  }
  return h[0];
}
```

## Top K Frequent Elements

Count first. Then a min-heap of `[freq, num]` of size k.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```js
// Heap — by frequency
// LC: https://leetcode.com/problems/top-k-frequent-elements/
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
  const h = [];
  const less = (a, b) => a[0] < b[0];
  for (const [num, f] of freq) {
    heapPush(h, [f, num], less);
    if (h.length > k) heapPop(h, less);
  }
  return h.map(([, num]) => num);
}
```

## Find Median from Data Stream

Two heaps: max-heap for the smaller half, min-heap for the bigger half. Size differs by at most 1. Median is the middle top, or the average of both tops.

[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

```js
// Heap — two heaps
// LC: https://leetcode.com/problems/find-median-from-data-stream/
function MedianFinder() {
  this.lo = []; // max-heap of smaller half (store negated)
  this.hi = []; // min-heap of larger half
}
MedianFinder.prototype.addNum = function (num) {
  heapPush(this.lo, -num);
  heapPush(this.hi, -heapPop(this.lo));
  if (this.hi.length > this.lo.length) heapPush(this.lo, -heapPop(this.hi));
};
MedianFinder.prototype.findMedian = function () {
  if (this.lo.length > this.hi.length) return -this.lo[0];
  return (-this.lo[0] + this.hi[0]) / 2;
};
```

## Merge k Sorted Lists

Put every list head in a min-heap. Pop the smallest, push its `.next`. Dummy tail like merge two lists.

[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

```js
// Heap — k-way merge
// LC: https://leetcode.com/problems/merge-k-sorted-lists/
function mergeKLists(lists) {
  const h = [];
  const less = (a, b) => a.val < b.val;
  for (const node of lists) if (node) heapPush(h, node, less);
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (h.length) {
    const node = heapPop(h, less);
    tail.next = node;
    tail = node;
    if (node.next) heapPush(h, node.next, less);
  }
  return dummy.next;
}
```
