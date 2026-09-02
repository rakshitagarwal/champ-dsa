# Heap

**Definition:** Heap (priority queue) ek complete binary tree hai jahan parent ≤ children (min-heap) ya ≥ (max-heap), isliye sabse chhota/bada `O(log n)` me push/pop aur `O(1)` me peek milta hai. JS me built-in heap nahi hai — neeche wale helpers copy-paste wale hain.

**When to use:** "Top K", "K-th largest/smallest", "hamesha current best chahiye", ya "K sorted lists/arrays merge". Heap size = K rakho aur jo kharab hai nikal do.

**How it works:** Array wala binary heap `heapPush` (upar bubble) aur `heapPop` (neeche bubble). Top-K smallest ke liye max-heap size K. K lists merge: har head push, sabse chhota pop karke uska `next` push. Time `O(n log K)`, space `O(K)`.

```js
// Heap skeleton — copy into interview (min-heap default)
// Hinglish: push karke upar bubble, pop karke neeche bubble
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
// Hinglish: K se zyada hue to sabse chhota nikal do
const heap = [];
for (const x of nums) { heapPush(heap, x); if (heap.length > k) heapPop(heap); }
```
## Kth Largest Element in an Array

Min-heap of size k. The top is the kth largest. Everything smaller got popped.

[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

```js
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — keep k largest
// LC: https://leetcode.com/problems/kth-largest-element-in-an-array/
function findKthLargest(nums, k) {
  const h = [];
  for (const x of nums) {
    heapPush(h, x); // Hinglish: heap me daalo
    if (h.length > k) heapPop(h); // Hinglish: sabse chhota nikala
  }
  return h[0];
}
```

## Top K Frequent Elements

Count first. Then a min-heap of `[freq, num]` of size k.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```js
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — by frequency
// LC: https://leetcode.com/problems/top-k-frequent-elements/
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
  const h = [];
  const less = (a, b) => a[0] < b[0];
  for (const [num, f] of freq) {
    heapPush(h, [f, num], less); // Hinglish: heap me daalo
    if (h.length > k) heapPop(h, less); // Hinglish: sabse chhota nikala
  }
  return h.map(([, num]) => num);
}
```

## Find Median from Data Stream

Two heaps: max-heap for the smaller half, min-heap for the bigger half. Size differs by at most 1. Median is the middle top, or the average of both tops.

[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

```js
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — two heaps
// LC: https://leetcode.com/problems/find-median-from-data-stream/
function MedianFinder() {
  this.lo = []; // max-heap of smaller half (store negated)
  this.hi = []; // min-heap of larger half
}
MedianFinder.prototype.addNum = function (num) {
  heapPush(this.lo, -num); // Hinglish: heap me daalo
  heapPush(this.hi, -heapPop(this.lo)); // Hinglish: sabse chhota nikala
  if (this.hi.length > this.lo.length) heapPush(this.lo, -heapPop(this.hi)); // Hinglish: sabse chhota nikala
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
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — k-way merge
// LC: https://leetcode.com/problems/merge-k-sorted-lists/
function mergeKLists(lists) {
  const h = [];
  const less = (a, b) => a.val < b.val;
  for (const node of lists) if (node) heapPush(h, node, less); // Hinglish: heap me daalo
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (h.length) {
    const node = heapPop(h, less); // Hinglish: sabse chhota nikala
    tail.next = node;
    tail = node;
    if (node.next) heapPush(h, node.next, less); // Hinglish: heap me daalo
  }
  return dummy.next;
}
```

## K Closest Points to Origin

Distance se min-heap. Top K nikal lo.

[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

```js
// Hinglish: heap push/pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/k-closest-points-to-origin/
function kClosest(points, k) {
  // Hinglish: distance = x*x + y*y
  points.sort((a,b)=> (a[0]*a[0]+a[1]*a[1]) - (b[0]*b[0]+b[1]*b[1])); // Hinglish: sort karke top K (quick)
  return points.slice(0,k);
  // Heap se bhi: heapPush distance, size>k to pop
}
```

## Last Stone Weight

Har baar 2 sabse heavy lo, takrao, bacha to wapas daalo. Max-heap.

[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

```js
// Hinglish: heap push/pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/last-stone-weight/
function lastStoneWeight(stones) {
  // Hinglish: max-heap banane ke liye sort + pop (ok for interview)
  stones.sort((a,b)=>a-b);
  while (stones.length>1) {
    const b=stones.pop(), a=stones.pop(); // Hinglish: 2 bade
    if (a!==b) {
      const diff = b-a;
      // Hinglish: insert sorted
      let i=0; while(i<stones.length && stones[i]<diff) i++;
      stones.splice(i,0,diff);
    }
  }
  return stones[0]||0;
}
```
