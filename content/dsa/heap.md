# Heap (Priority Queue)

Always pull min or max in O(log n). JS has no built-in heap — interviewers accept a sorted array for n ≤ a few thousand, or describe a binary heap. Below uses a tiny min-heap helper.

```js
// Heap skeleton (k smallest / k largest)
const heap = [];
for (const x of nums) {
  heapPush(heap, x);
  if (heap.length > k) heapPop(heap);
}
```

```js
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
```

## Kth Largest

Min-heap of size k — [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/).

```js
// Heap — keep k largest, top is kth
// LC: https://leetcode.com/problems/kth-largest-element-in-an-array/
function findKthLargest(nums, k) {
  const h = [];
  for (const x of nums) {
    heapPush(h, x);
    if (h.length > k) heapPop(h); // drop the smallest extra
  }
  return h[0];
}
```

## Top K Frequent

Count, then heap by frequency — [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/).

```js
// Heap — frequency then top k
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

## Merge K Sorted Lists

Min-heap of list heads — [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/).

```js
// Heap — always take the smallest current head
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

**More:** [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/), [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/), [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/).
