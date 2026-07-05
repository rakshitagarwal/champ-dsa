# Top K Elements (Heap)

Top K Elements uses a min-heap (or max-heap) to efficiently track the K largest, smallest, or most frequent elements in a stream or array.

## When to use
- Need the K largest, K smallest, or K most frequent elements
- Processing a stream where you need to maintain a running top K
- Problem mentions "top K", "closest K", or "Kth largest/smallest"

## How it works

For K largest elements, maintain a min-heap of size K. Push each element; if heap exceeds K, pop the smallest. The heap ends up holding the K largest elements. For K smallest, use a max-heap instead.

```js
function findKthLargest(nums, k) {
  const minHeap = new MinPriorityQueue();
  for (const n of nums) {
    minHeap.push(n);
    if (minHeap.size() > k) minHeap.pop();
  }
  return minHeap.top();
}
```

## Practice problems
- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) — Classic top K using a min-heap of size K
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) — Build frequency map, then heap on frequency
- [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) — Max-heap of size K on squared distance
- [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) — Frequency map then heap or bucket sort
