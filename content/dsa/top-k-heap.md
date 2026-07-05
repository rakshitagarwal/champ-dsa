# Top K Elements (Heap)

The top K elements pattern solves problems where you need to find the K largest, K smallest, or K most frequent items in a collection, either in a single batch or as a running set over a stream. The core data structure is a heap (priority queue): a min-heap for finding the K largest elements and a max-heap for finding the K smallest. By keeping the heap size bounded at K, you ensure that only the elements that belong in the "top K" set are retained — every other element is evicted as soon as it falls outside the K threshold.

Why does this work so efficiently? Maintaining a full sort of all `n` elements would cost O(n log n). A heap of size K, by contrast, requires O(log K) for each push and pop. Processing all `n` elements costs O(n log K), and since K is usually much smaller than n, this is a significant improvement. In the best case, when K is a small constant, the effective runtime approaches O(n). The heap pattern also generalises naturally to streaming data: you never have to store the entire dataset, only the K elements that matter. This makes it the algorithm of choice for leaderboards, real-time trending topics, and proximity queries.

## When to use

- The problem asks for the K largest, K smallest, or Kth largest/smallest element in a collection
- You need to find the K most frequent or K closest elements according to some distance metric
- Data is streaming, so you cannot store all elements and must maintain a running top K
- The problem mentions "top K," "closest K," "Kth largest," or "Kth smallest" explicitly
- A brute-force sort is too expensive and the input size is large
- You need to merge K sorted lists efficiently (use a min-heap on the heads of each list)

## How it works

### Core concept

The invariant for K largest elements is: maintain a min-heap that holds the K largest elements seen so far. For each new element, you push it onto the heap. If the heap size exceeds K, you pop the smallest element (the root of the min-heap). After processing all elements, the heap contains exactly the K largest items, and the root is the Kth largest. The min-heap acts as a sieve — small values fall through, large values are retained.

For K smallest elements, invert the logic: use a max-heap. Push each element, and when the size exceeds K, pop the largest element (the root of the max-heap). The heap ends up holding the K smallest elements. The key insight is that the heap's ordering is opposite to what you intuitively want: to keep the biggest items, use a min-heap so that the smallest of the big items is always at the root and easy to evict. For frequency-based problems, first build a frequency map (hash map from element to count), then feed the entries into the heap using frequency as the comparison key.

### Step-by-step approach

1. **Build a frequency map (if needed).** For problems involving frequency, iterate through the array and count occurrences using a hash map. This step is O(n).
2. **Initialise a heap with the correct ordering.** For K largest, create a min-heap. For K smallest, create a max-heap. For most languages, you need to provide a custom comparator.
3. **Iterate and maintain heap of size K.** For each element (or frequency entry), push it onto the heap. If the heap size exceeds K, pop the root.
4. **Extract the result.** When the iteration is complete, the heap contains the K desired elements. The root is the Kth element. If you need them sorted, you can pop all K elements (O(K log K)).
5. **Handle streaming input (variation).** Instead of iterating over a fixed array, process elements one at a time as they arrive, performing the same push-and-evict logic.

### Complexity

- **Time:** O(n log K) — processing each of the `n` elements with heap operations of size K
- **Space:** O(K) — the heap holds at most K elements (plus O(n) for the frequency map if needed)

```js
class MinHeap {
  constructor() { this.heap = []; }
  push(val) {
    this.heap.push(val);
    this.heap.sort((a, b) => a - b); // simplified; use a proper heapify in production
  }
  pop() { return this.heap.shift(); }
  top() { return this.heap[0]; }
  size() { return this.heap.length; }
}

function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (const n of nums) {
    minHeap.push(n);
    if (minHeap.size() > k) minHeap.pop();
  }
  return minHeap.top();
}

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  const minHeap = new MinHeap();
  for (const [num, count] of freq) {
    minHeap.push([count, num]);
    if (minHeap.size() > k) minHeap.pop();
  }
  return minHeap.heap.map(e => e[1]);
}
```

## Variations

- **K closest points to origin:** Compute the squared Euclidean distance `x² + y²` for each point. Use a max-heap of size K on the distance. After processing all points, the heap contains the K closest points.
- **Kth largest in a stream:** Maintain a min-heap of size K. As new elements arrive, push them and evict if size exceeds K. The root is always the Kth largest element in the stream so far. This is the classic "find median in a stream" pattern generalised.
- **Sort characters by frequency:** Build a frequency map, then use a max-heap (or bucket sort) to emit characters in descending order of frequency. This variant typically pops all elements rather than limiting to K.
- **Merge K sorted lists:** Push the head of each list onto a min-heap. Repeatedly pop the smallest head, append it to the result, and push the next node from that list. This runs in O(N log K) where N is the total number of elements.
- **K smallest pairs:** Given two sorted arrays, find the K pairs with the smallest sums. Use a min-heap initialised with the first K pairs from the first array and a pointer to track the second array's index.

## Edge cases

- **K equals array length:** The heap will never exceed size K, so every element is retained. The algorithm correctly returns all elements.
- **K equals 1:** The heap retains only one element. For Kth largest, this is simply the maximum element in the array. The algorithm works with no special logic.
- **K larger than array length:** Some problem constraints guarantee K <= n, but if not, the heap will contain fewer than K elements after processing. Handle by returning the entire heap.
- **All elements are identical:** The frequency map will have one entry with count `n`. The heap will contain a single element, and the Kth largest is that value (all values are the same).
- **Negative numbers or zero:** Heaps work on any comparable values. Negatives are handled correctly as long as the comparator uses numeric ordering.
- **Ties in frequency:** When two elements have the same frequency, either can appear in the result. Some problems specify tie-breaking rules; apply a secondary comparator if needed.

## Practice problems

- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) — Classic min-heap of size K; the root is the answer
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) — Build a frequency map, then maintain a min-heap on frequency counts
- [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) — Max-heap of size K using squared Euclidean distance
- [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) — Frequency map then a max-heap to emit characters in descending frequency order
- [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) — Maintain a min-heap of size K as elements arrive one by one
- [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) — Min-heap on pair sums from two sorted arrays
- [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) — Min-heap on the heads of K sorted linked lists
