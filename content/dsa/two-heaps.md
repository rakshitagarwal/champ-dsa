# Two Heaps

The Two Heaps pattern maintains two priority queues — a max-heap for the smaller half of the data and a min-heap for the larger half — to give O(1) access to the median and O(log n) insertion. The invariant is that the two heaps differ in size by at most 1, and every element in the max-heap is less than or equal to every element in the min-heap. This makes the median trivially computable as either the top of the larger heap or the average of both tops.

This pattern extends far beyond median tracking. Whenever a problem requires simultaneous access to the "largest of the small" and the "smallest of the large" — such as scheduling, load balancing, or constrained selection — the two-heap structure elegantly keeps both extremes available. The trade-off is that we trade O(n) space for fast inserts and lookups, which is acceptable for streaming or dynamic data scenarios.

A common implementation question is: why not just keep a sorted array? Because inserting into a sorted array is O(n) (shifting elements), whereas a heap insert is O(log n). A balanced BST (like `std::multiset` in C++ or `TreeMap` in Java) would also work, but heaps have lower constants and are simpler to implement from scratch. JavaScript does not have a native binary heap, so in interviews you either use an array with a library heap, or you hand-roll `siftUp` and `siftDown` — either approach is acceptable as long as you explain the O(log n) guarantee.

## When to use

- Computing the running median or any percentile of a data stream
- Scheduling problems where you need the most profitable project you can afford (IPO pattern)
- Assigning resources (rooms, servers) where you track both available and occupied resources
- Sliding window median — two heaps over a moving window with lazy deletions
- Any problem where you need to repeatedly query both the minimum of the upper half and the maximum of the lower half
- Balancing two groups by count or cumulative value

## How it works

### Core concept

Two heaps maintain a split of the data at the median. The max-heap (usually implemented by negating values pushed into a min-heap) holds the lower half; its root is the largest value in that half. The min-heap holds the upper half; its root is the smallest value there. The invariant `maxHeap.size() >= minHeap.size() >= maxHeap.size() - 1` ensures the median is always at the top of one heap.

Every insertion follows a two-step process: push the new element into one heap, then pop its root and push it into the other. This automatically enforces the ordering invariant without explicit comparisons. After that, rebalance if the size difference exceeds 1.

### Why two phases per insert?

The two-step "push then pop-and-push" may seem wasteful, but it serves a critical purpose: it guarantees that the largest element of `lo` ends up in `hi` and the smallest element of `hi` ends up in `lo` (during rebalance). Without this, the ordering invariant — all elements in `lo` ≤ all elements in `hi` — could be violated by a single out-of-place number. The two-phase approach makes the implementation bulletproof with no manual comparisons needed.

Two heaps maintain a split of the data at the median. The max-heap (usually implemented by negating values pushed into a min-heap) holds the lower half; its root is the largest value in that half. The min-heap holds the upper half; its root is the smallest value there. The invariant `maxHeap.size() >= minHeap.size() >= maxHeap.size() - 1` ensures the median is always at the top of one heap.

Every insertion follows a two-step process: push the new element into one heap, then pop its root and push it into the other. This automatically enforces the ordering invariant without explicit comparisons. After that, rebalance if the size difference exceeds 1.

### Step-by-step approach

1. Create a max-heap `lo` (store negatives) and a min-heap `hi`. Optionally include a lazy-deletion map for sliding-window variants.
2. On each insertion, push the value into `lo` (as `-value`). Pop the largest value from `lo` (i.e., `-(lo.pop())`) and push it into `hi`. If `hi` now has more elements than `lo`, pop the smallest from `hi` and push it back into `lo`. This keeps the size invariant.
3. To find the median, if `lo` has more elements, return the top of `lo` (negated back). Otherwise return the average of the tops of `lo` (negated) and `hi`.
4. For sliding windows, also track elements leaving the window. Use a hash map to mark deletions with a counter (since duplicates may exist). When a heap's top is marked deleted, pop it and decrement its count; continue until the top is valid. Then rebalance by moving elements between heaps to restore the size invariant. This lazy-deletion approach keeps the amortised cost per operation at O(log n).
5. For problems like IPO or scheduling, the two heaps track different keys — e.g., capital (max-heap) and profit (min-heap) — and you alternate between them: pick all affordable projects into the profit heap, then take the most profitable.

### Complexity

- **Time:** O(log n) per insertion (heap push/pop); O(1) for median lookup
- **Space:** O(n) for storing all elements across both heaps

```js
class MedianFinder {
  constructor() {
    this.lo = [];  // max-heap — store negatives
    this.hi = [];  // min-heap
  }

  addNum(num) {
    this.lo.push(-num);
    this.lo.sort((a, b) => b - a);
    this.hi.push(-this.lo.pop());
    this.hi.sort((a, b) => a - b);
    if (this.hi.length > this.lo.length) {
      this.lo.push(-this.hi.shift());
      this.lo.sort((a, b) => b - a);
    }
  }

  findMedian() {
    if (this.lo.length > this.hi.length) return -this.lo[0];
    return (-this.lo[0] + this.hi[0]) / 2;
  }
}
```

> ⚠️ The code above uses `sort`/`shift` for clarity. In production, use a proper binary heap (`push`/`pop` with `siftUp`/`siftDown`) so each operation is O(log n) instead of O(n log n).

### Proper binary heap implementation sketch

A binary heap is an array where `heap[i]`'s children are at `heap[2*i+1]` and `heap[2*i+2]`. `siftUp` swims a node up until the heap property is restored; `siftDown` sinks a node down. For a min-heap, `siftUp` swaps a node with its parent if the parent is larger; `siftDown` swaps with the smaller child. For a max-heap (storing negatives), the comparisons are reversed. Implement `push` by appending to the array and calling `siftUp` on the last index; implement `pop` by swapping the root with the last element, removing it, and calling `siftDown` on the new root.

### Time-space trade-off

If you have memory constraints and the stream length is known in advance, you can use a reservoir sampling or a order-statistic tree (e.g., a Fenwick tree over a compressed value domain) to track the median in O(log m) space where m is the number of distinct values rather than the total count. Two heaps always require O(n) space.

## Variations

- **Sliding Window Median:** Maintain two heaps over a window of size `k`. When the window slides, mark the outgoing element as deleted in a hash map. Before computing the median, lazily evict any deleted elements from the tops of both heaps, then rebalance.
- **IPO (Maximize Capital):** Use a max-heap for profits and a min-heap for capital. Sort projects by capital; while the top project's capital is within your budget, move it to the profit heap. Always pick the most profitable project from the profit heap.
- **Meeting Rooms III:** Track available rooms with a min-heap (by room index) and occupied rooms with a min-heap (by end time). When a meeting starts, release all rooms whose end time has passed, then assign the smallest available room.
- **Find Right Interval:** For each interval, use a min-heap of start points to binary-search for the rightmost interval whose start >= the current interval's end.

### When to use a different data structure

If you only need the `k`th largest (not the median), a single min-heap of size `k` suffices — never store more than `k` elements. If the data is static (not streaming), a quick-select or sorting-based approach is simpler and uses O(1) extra space. The two-heap pattern shines specifically when the workload is interleaved inserts and median queries on an unbounded stream.

## Edge cases

- **Empty stream:** `findMedian` should either throw or return `null`/`undefined`. Guard with a size check.
- **Single element:** The lone element sits in `lo`; `findMedian` returns it directly.
- **Duplicate values:** Both heaps handle duplicates correctly. The size invariant may allow both heaps to have equal values at their tops, and the average is computed normally.
- **Large streaming data:** Heap-based approach handles infinite streams gracefully since each element inserts in O(log n) and only the two heap roots are needed.
- **Integer overflow on average:** `(lo + hi) / 2` can overflow if both numbers are very large. Use `lo + (hi - lo) / 2` or BigInt.
- **Floating-point values:** The two-heap pattern works with any comparable type, including floats. Be mindful of floating-point precision when averaging two nearly-equal numbers.
- **Odd vs even counts:** With an odd total count, exactly one heap has one extra element (by convention, `lo`). The median is that heap's root. With an even count, both heaps are equal-sized and the median is the average of both roots.
- **Concurrent modifications:** If elements can be removed arbitrarily (not just from the window edge), a lazy-deletion map alone is insufficient — you need a balanced BST or a skip list that supports arbitrary deletion in O(log n).

## Practice problems

- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) — Classic two-heap median tracking
- [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) — Two heaps with lazy deletions over a moving window
- [IPO](https://leetcode.com/problems/ipo/) — Pick most profitable projects within capital constraints
- [Meeting Rooms III](https://leetcode.com/problems/meeting-rooms-iii/) — Assign rooms using two heaps (available + occupied)
- [Find Right Interval](https://leetcode.com/problems/find-right-interval/) — Binary search on sorted starts or two-heap approach
- [Maximum Number of Events That Can Be Attended](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/) — Sort by start, use min-heap of end times to greedily attend the earliest-ending event
- [Minimum Cost to Hire K Workers](https://leetcode.com/problems/minimum-cost-to-hire-k-workers/) — Two-heap approach with wage-to-quality ratio
- [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/) — Sweep line with a max-heap tracking building heights (conceptually related heap usage)
- [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) — Single-heap variant: maintain a min-heap of size k
