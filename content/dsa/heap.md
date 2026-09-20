# Heap

**Definition:** A heap (priority queue) is a complete binary tree where parent ≤ children (min-heap) or ≥ (max-heap), so the extreme value is available in `O(1)` peek and `O(log n)` push/pop. JS has no built-in heap — the helpers below are copy-paste ready.

**When to use:** “Top K”, “K-th largest/smallest”, “always need the current best”, or “merge K sorted lists/arrays”. Keep heap size = K and drop what falls outside the top K.

**How it works:** Array binary heap with `heapPush` (bubble up) and `heapPop` (bubble down). For top-K smallest use a max-heap of size K. Merging K lists: push each head, pop the smallest, push its `next`. Time `O(n log K)`, space `O(K)`.

## Study notes

- **Min-heap:** parent ≤ kids; peek = smallest. **Max-heap:** opposite (or negate values).
- **Top K:** keep heap size K; throw away worse than Kth.
- **Two heaps:** running median — max-heap low half, min-heap high half.
- **JS:** no built-in PQ in interviews — bring push/pop helpers (this page) or library if allowed.
- **Traps:** wrong comparator; forget re-balance sizes for median.
- **Checklist:** K fixed? need min or max? merge streams?

### Active revision
Min or max heap? Fixed size K? Two-heap median balance rule?

### Decision table

| Need | Heap choice |
|------|-------------|
| Kth largest / top K large | Min-heap size K |
| Kth smallest / top K small | Max-heap size K |
| Always current min | Min-heap |
| Running median | Max low + min high |
| Merge K sorted streams | Min-heap of heads |

```js
// Heap skeleton — copy into interview (min-heap default)
// sift up after push; sift down after pop
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val); // place new leaf at end of array
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1; // parent index in binary heap
    if (!less(h[i], h[p])) break; // heap property satisfied
    [h[i], h[p]] = [h[p], h[i]]; // sift up — child smaller than parent
    i = p;
  }
}
function heapPop(h, less = (a, b) => a < b) {
  const top = h[0], last = h.pop(); // save min/max, remove last leaf
  if (!h.length) return top;
  h[0] = last; // promote last element to root
  let i = 0;
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1; // best child candidate
    if (l < h.length && less(h[l], h[m])) m = l;
    if (r < h.length && less(h[r], h[m])) m = r;
    if (m === i) break; // no child beats node — stop sift down
    [h[i], h[m]] = [h[m], h[i]]; // swap with smaller child
    i = m;
  }
  return top;
}

// Top-K skeleton
// if heap size exceeds K, pop the weakest candidate
const heap = [];
for (const x of nums) { heapPush(heap, x); if (heap.length > k) heapPop(heap); }
```
## MinHeap Class

Copy-paste class — parent always smaller than children, minimum on top. Useful for Kth largest, Top-K, merge K lists, Dijkstra.

```js
// MinHeap class — copy this template for any heap interview problem
class MinHeap {
  constructor() { this.h = []; } // backing array stores the heap
  size() { return this.h.length; } // number of elements in heap
  peek() { return this.h[0]; } // peek top in O(1) without pop
  push(val) {
    this.h.push(val); // append at end, then sift up
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1; // parent index
      if (this.h[i] >= this.h[p]) break; // heap property holds — stop sifting
      [this.h[i], this.h[p]] = [this.h[p], this.h[i]]; // sift toward root
      i = p;
    }
  }
  pop() {
    const top = this.h[0], last = this.h.pop(); // top extract
    if (!this.h.length) return top;
    this.h[0] = last; // promote last leaf to root, sift down
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1; // left/right child
      if (l < this.h.length && this.h[l] < this.h[m]) m = l;
      if (r < this.h.length && this.h[r] < this.h[m]) m = r;
      if (m === i) break; // heap property holds — stop sifting
      [this.h[i], this.h[m]] = [this.h[m], this.h[i]]; // sift toward leaves
      i = m;
    }
    return top;
  }
}

// usage example
// const mh = new MinHeap();
// mh.push(5); mh.push(2); mh.peek(); // 2
// mh.pop(); // 2 removed from heap
```

## MaxHeap Class

Same structure, reversed comparison — parent always larger than children, maximum on top. Useful for Kth smallest, Last Stone Weight, and one half of the median.

```js
// MaxHeap class — same structure as MinHeap with reversed comparisons
class MaxHeap {
  constructor() { this.h = []; } // backing array stores the heap
  size() { return this.h.length; } // number of elements in heap
  peek() { return this.h[0]; } // peek top in O(1) without pop
  push(val) {
    this.h.push(val); // append at end, then sift up
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1; // parent index
      if (this.h[i] <= this.h[p]) break; // heap property holds — stop sifting
      [this.h[i], this.h[p]] = [this.h[p], this.h[i]]; // sift toward root
      i = p;
    }
  }
  pop() {
    const top = this.h[0], last = this.h.pop(); // top extract
    if (!this.h.length) return top;
    this.h[0] = last; // promote last leaf to root, sift down
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1; // left/right child
      if (l < this.h.length && this.h[l] > this.h[m]) m = l;
      if (r < this.h.length && this.h[r] > this.h[m]) m = r;
      if (m === i) break; // heap property holds — stop sifting
      [this.h[i], this.h[m]] = [this.h[m], this.h[i]]; // sift toward leaves
      i = m;
    }
    return top;
  }
}

// usage example
// const xh = new MaxHeap();
// xh.push(5); xh.push(9); xh.peek(); // 9
// xh.pop(); // 9 removed from heap
```

## Kth Largest Element in an Array

Min-heap of size k. The top is the kth largest. Everything smaller got popped.

[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

```js
// Time: O(n) · Space: O(n)
// Min-heap of size k — root is the kth largest among seen elements
function findKthLargest(nums, k) {
  const h = [];
  for (const x of nums) {
    heapPush(h, x); // Add candidate to heap
    if (h.length > k) heapPop(h); // Drop smallest — heap holds k largest only
  }
  return h[0]; // Smallest among top k = kth largest overall
}
```

## Top K Frequent Elements

Count first. Then a min-heap of `[freq, num]` of size k.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```js
// Time: O(n log k) · Space: O(n)
// count → heap/bucket of size k
var topKFrequent = function(nums, k) {
  let map = {};
  let bucket = [];
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = 1;
    } else {
      map[nums[i]]++;
    }
  }

  for (let [num, freq] of Object.entries(map)) {
    if (!bucket[freq]) {
      bucket[freq] = new Set().add(num);
    } else {
      bucket[freq] = bucket[freq].add(num);
    }
  }

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) break;
  }

  return result;
};
```

## Find Median from Data Stream

Two heaps: max-heap for the smaller half, min-heap for the bigger half. Size differs by at most 1. Median is the middle top, or the average of both tops.

[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

```js
// Time: O(log n) · Space: O(n)
// two heaps: low max / high min
var MedianFinder = function() {
  this.arr = [];
};

MedianFinder.prototype.addNum = function(num) {
  let left = 0;
  let right = this.arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((right + left) / 2);

    if (this.arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  this.arr.splice(left, 0, num);
};

MedianFinder.prototype.findMedian = function() {
  if (this.arr.length % 2 === 0) {
    // even
    let mid = this.arr.length / 2;
    return (this.arr[mid] + this.arr[mid - 1]) / 2;
  } else {
    // odd
    let mid = Math.floor(this.arr.length / 2);
    return this.arr[mid];
  }
};
```

## Merge k Sorted Lists

Put every list head in a min-heap. Pop the smallest, push its `.next`. Dummy tail like merge two lists.

[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

```js
// Time: O(n log k) · Space: O(k)
var mergeKLists = function(lists) {
  while (lists.length > 1) {
    let list1 = lists.shift();
    let list2 = lists.shift();

    let merged = mergeLists(list1, list2);

    lists.push(merged);
  }

  return lists[0] || null;
};

function mergeLists(list1, list2) {
  let dummy = new ListNode(0);
  let head = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      dummy.next = list1;
      list1 = list1.next;
    } else {
      dummy.next = list2;
      list2 = list2.next;
    }
    dummy = dummy.next;
  }

  if (list1 === null) {
    dummy.next = list2;
  } else {
    dummy.next = list1;
  }

  return head.next;
}
```

## K Closest Points to Origin

Use distance with a min-heap (or sort by squared distance). Take the top K.

[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

```js
// Time: O(n) · Space: O(n)
// Sort by squared distance — avoids sqrt; interview shortcut vs size-k heap
function kClosest(points, k) {
  points.sort((a,b)=> (a[0]*a[0]+a[1]*a[1]) - (b[0]*b[0]+b[1]*b[1])); // Nearest points first
  return points.slice(0,k); // First k entries are answer
  // Heap variant: push [dist, point], pop when size > k
}
```

## Last Stone Weight

Always take the two heaviest, smash, put the remainder back if any. Max-heap.

[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

```js
// Time: O(n log n) · Space: O(n)
// max-heap smash until ≤1 stone
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    const heap = new MaxPriorityQueue();
    
    for(const stone of stones) heap.enqueue(stone);
    
    while(heap.size() > 1){
        let diff = heap.dequeue().element - heap.dequeue().element;
        if(diff > 0) heap.enqueue(diff);
    }
    
    return heap.size() === 0 ? 0 : heap.front().element;
};
```
