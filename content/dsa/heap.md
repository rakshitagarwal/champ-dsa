# Heap (Priority Queue)

A heap is a specialized tree-based data structure that satisfies the **heap property**: in a max-heap, every parent node is greater than or equal to its children (so the maximum is at the root); in a min-heap, every parent is smaller than or equal to its children (so the minimum is at the root). Heaps are typically implemented as complete binary trees stored in a flat array, which makes them compact and cache-friendly. A priority queue is an abstract data type backed by a heap that supports efficient insertion and extraction of the highest-priority element (the min or max, depending on the comparator). The heap is the go-to structure whenever you need repeated access to the smallest or largest element in a dynamic collection.

Priority queues appear across domains: scheduling tasks by urgency, merging K sorted streams, running Dijkstra's shortest-path algorithm, and countless "top K" queries. The array-based binary heap (the most common implementation) uses the index arithmetic `parent = (i - 1) / 2`, `left = 2*i + 1`, `right = 2*i + 2` to navigate the tree without pointer overhead. While heaps are not sorted structures (no full ordering like BSTs), they guarantee that the root is always the extreme element, which is all you need for many algorithms.

The canonical operations are **push** (insert at the bottom and sift-up), **pop** (swap root with last element, remove it, then sift-down the new root), and **peek** (read the root). Building a heap from scratch (heapify) runs in O(n) by sifting-down each non-leaf node from bottom to top, which is surprisingly linear and faster than inserting n elements one at a time (O(n log n)).

## When to use

- Finding the **top K largest / smallest / most frequent** elements in a stream or array — a min-heap of size K keeps the K largest so far; a max-heap of size K keeps the K smallest
- **K-way merge:** merging K sorted lists or arrays by pushing the head of each list into a heap and repeatedly extracting the smallest element, advancing the pointer in the source list
- **Median finding:** maintain two heaps — a max-heap for the lower half and a min-heap for the upper half — to track the running median of a data stream
- **Task scheduling / CPU scheduling:** selecting the next job with the highest priority or the shortest remaining time from a dynamic queue
- **Dijkstra's shortest path / Prim's MST:** extracting the node with the smallest tentative distance from the frontier of unvisited nodes
- **Kth largest/smallest element in an array or stream** without fully sorting — a heap of size K reduces memory to O(K)
- **Sliding window median / maximum:** combining a heap with lazy deletion to track order statistics over a moving window
- **Meeting rooms / interval partitioning:** finding the minimum number of resources (rooms) needed by processing start/end times with a min-heap of end times
- **Sorting nearly sorted (K-sorted) arrays:** insertion into a heap of size K+1 yields a sorted stream in O(n log K)
- **Huffman coding:** repeatedly merging the two smallest frequency nodes to build an optimal prefix code tree

## How it works

### Core concept

A binary heap is always a **complete binary tree**: every level except possibly the last is fully filled, and the last level is filled from left to right. This shape invariant is what lets you store the heap in a flat array without explicit pointers. The logical parent-child relationships are derived from array indices, so no memory is wasted on left/right references.

The heap property is maintained by two internal operations. **Sift-up (bubble-up)** is used when inserting: you place the new element at the first available leaf (end of the array), then repeatedly swap it with its parent while it violates the heap property (e.g., in a min-heap, while the new node is smaller than its parent). **Sift-down (bubble-down)** is used when extracting the root: you replace the root with the last leaf, remove that leaf, then repeatedly swap the new root with its smaller (min-heap) or larger (max-heap) child until the heap property is restored. Both operations run in O(log n) because the height of a complete binary tree with n nodes is ⌊log₂ n⌋.

Building a heap from an unsorted array (heapify) is done by calling sift-down on every non-leaf node starting from the last parent (index `Math.floor(n/2) - 1`) and moving upward. The total cost of heapify is O(n) — not O(n log n) — because nodes near the bottom of the tree (which are the majority) sift down only a short distance. This is a classic amortized analysis result that surprises most people the first time they see it.

### Step-by-step approach

1. **Choose the heap type.** Decide if you need a min-heap (track largest) or max-heap (track smallest). For "top K largest" you use a min-heap of size K; the root is the smallest of the K so far, so any larger element can kick it out.
2. **Initialize the heap.** In JavaScript with no built-in heap, you can use an array and manually implement push/pop, or use a third-party / custom `MinHeap` / `MaxHeap` class.
3. **Insert the first K elements.** Push elements into the heap unconditionally until it reaches size K.
4. **Process remaining elements.** For each subsequent element, compare it with the root. If it is larger (min-heap) or smaller (max-heap) than the root, pop the root and push the new element. The heap retains the K extreme elements.
5. **Extract results.** At the end, the heap contains the K largest (or smallest) elements. The root is the Kth largest/smallest. If all K are needed, pop them one by one (yields sorted order in reverse for min-heap).
6. **Generalize to frequency / custom ordering.** For "top K frequent", first build a frequency map, then apply the same size-K heap pattern using frequencies as the comparison key.

### Complexity

- **Insert (push):** O(log n) — one sift-up from the bottom
- **Extract (pop):** O(log n) — one sift-down from the root
- **Peek (root access):** O(1) — direct array access at index 0
- **Heapify (build from array):** O(n) — linear-time sift-down on non-leaf nodes
- **Space:** O(n) for the array backing the heap; O(K) if you only keep a sliding window of K elements

```js
// Min-heap to find Kth largest element in an array
class MinHeap {
  constructor() { this.data = []; }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      let i = 0, n = this.data.length;
      while (true) {
        let smallest = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && this.data[l] < this.data[smallest]) smallest = l;
        if (r < n && this.data[r] < this.data[smallest]) smallest = r;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      }
    }
    return top;
  }
  size() { return this.data.length; }
  peek() { return this.data[0]; }
}

function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const n of nums) {
    heap.push(n);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}
```

## Variations

- **Two heaps (median tracking):** A max-heap for the lower half and a min-heap for the upper half. Rebalance after every insertion (difference in size ≤ 1). The median is either the root of the larger heap or the average of both roots.
- **Min-heap for max results by negation:** Push negative values into a min-heap to simulate a max-heap. Useful in languages or libraries that only provide a min-heap (like Python's heapq).
- **K-way merge with heap of iterators:** Push the head element of each sorted list along with its list index. After extracting the min, advance the corresponding iterator and push its new head back.
- **Lazy deletion:** Instead of removing arbitrary elements from the heap (which is expensive), mark them as deleted and skip them when they appear at the root. Used in sliding window median and Dijkstra with edge relaxations.
- **Heap with custom comparator:** Store objects or tuples and compare by a specific key (e.g., `{val, freq}` sorted by `freq`). In JavaScript this requires a custom heap or using a comparator wrapper.
- **Fibonacci heap:** A more advanced heap variant with O(1) amortized insert and O(log n) extract-min. Useful in dense graph algorithms (Dijkstra, Prim) but has high constants and is rarely needed in interviews.

## Edge cases

- **Empty heap:** Calling `peek()` or `pop()` on an empty heap should return a sentinel or throw. Guard with a size check before accessing index 0.
- **Single element:** Sift-up and sift-down loops won't execute. After a single pop, the heap becomes empty — handle accordingly.
- **Duplicate values:** Duplicates are fine; the heap property only requires comparability. However, for problems like "top K distinct", you may need to deduplicate before inserting.
- **Heap of large size (k near n):** If K is close to the array length, the heap degenerates into a near-full sorted structure. Consider sorting directly instead for O(n log n) vs O(n log K) where log K ≈ log n.
- **Negative values and floating-point:** Comparisons work normally. For non-ordinal data (like objects), ensure the comparator defines total order.
- **Custom objects without natural ordering:** The comparison must be explicit. In JavaScript, you cannot use `<` on objects — you must compare a numeric property or use a wrapper.
- **Streaming input (unknown size):** A size-K heap is still fine; memory stays O(K) regardless of how many elements arrive.

## Practice problems

- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) — Classic size-K min-heap problem (or QuickSelect). Find the Kth largest, not the Kth distinct.
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) — Build a frequency map, then use a size-K min-heap keyed by frequency.
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) — Two-heap (max + min) median tracking in a live stream. A quintessential heap design problem.
- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) — K-way merge with a min-heap of list heads. Tests your ability to work with heap of iterators/custom objects.
- [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) — Maintain a size-K min-heap as elements arrive one at a time.
- [Task Scheduler](https://leetcode.com/problems/task-scheduler/) — Max-heap for task frequencies; simulate CPU cycles with a cooldown period.
- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) — Deque-based (not heap), but a heap + lazy deletion approach is also a valid solution for this problem.
- [Reorganize String](https://leetcode.com/problems/reorganize-string/) — Max-heap of character frequencies; repeatedly extract the two most frequent to avoid adjacent duplicates.
