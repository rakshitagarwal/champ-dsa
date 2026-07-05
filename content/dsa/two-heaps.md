# Two Heaps

Maintain a max-heap for the smaller half and a min-heap for the larger half of data, giving O(1) access to the median and O(log n) insertion.

## When to use
- Running median or percentile of a stream
- Scheduling or selecting items where you need both the largest of the small and the smallest of the large
- Balancing two sets by count or value

## How it works

Insert each new element into one heap, then rebalance so the size difference never exceeds 1. The median is either the top of the larger heap or the average of both tops.

```js
class MedianFinder {
  constructor() {
    this.lo = []; // max-heap (negate values)
    this.hi = []; // min-heap
  }
  addNum(num) {
    // push to lo, then move lo's max to hi
    this.lo.push(-num);
    this.lo.sort((a, b) => b - a); // demo only — use binary heap in practice
    this.hi.push(-this.lo.pop());
    this.hi.sort((a, b) => a - b);
    if (this.hi.length > this.lo.length) this.lo.push(-this.hi.shift());
  }
  findMedian() {
    return this.lo.length > this.hi.length
      ? -this.lo[0]
      : (-this.lo[0] + this.hi[0]) / 2;
  }
}
```

## Practice problems
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) — Classic two-heap median tracking
- [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) — Two heaps over a sliding window
- [IPO](https://leetcode.com/problems/ipo/) — Pick most profitable project within capital constraint
- [Meeting Rooms III](https://leetcode.com/problems/meeting-rooms-iii/) — Assign rooms with two heaps for availability
