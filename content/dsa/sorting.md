# Sorting

Sorting rearranges elements into a defined order (usually ascending). In interviews, sorting is rarely the final answer — it is a **preprocessing step** that unlocks simpler algorithms. Once data is sorted, two pointers, binary search, and greedy interval merging become possible. The trade-off is O(n log n) upfront versus simpler O(n) scans afterward.

Know when sorting is worth it: if the problem involves pairs, intervals, scheduling, or finding duplicates/kth elements, sorting first often beats clever unsorted tricks. For fixed-size alphabets, counting sort can beat comparison sort in O(n + k) time.

![Sorting — preprocessing for efficient algorithms](/images/dsa/sorting-visual.svg)

## When to use

- Pair or triplet problems where sorting enables two pointers (3Sum, container problems)
- Interval merging, meeting rooms, non-overlapping intervals
- Finding duplicates or the kth largest element (sort or partial sort with heap)
- Greedy scheduling by end time or ratio
- Anagram grouping via sorted string keys

## How it works

### Core concept

Comparison sorts (merge sort, quicksort, heapsort) run in O(n log n) average. Merge sort is stable and predictable O(n log n); quicksort is in-place average O(n log n) but O(n²) worst case without care; heapsort is O(n log n) in-place but not stable. JavaScript's `Array.sort` uses TimSort — stable, O(n log n) average.

**Sort first, then scan** is the pattern: sort the array, then apply a linear two-pointer or greedy pass. For intervals, sort by start (or end for scheduling). For 3Sum, sort then fix one index and two-pointer the rest.

### Step-by-step approach

1. **Ask if sorting simplifies the invariant** — can you move pointers monotonically after sorting?
2. **Pick the sort key** — start time, end time, value, or derived ratio.
3. **Sort** — O(n log n).
4. **Linear scan** — two pointers, greedy merge, or duplicate skip.
5. **Watch stability** — if equal elements must keep relative order, prefer stable sort.

### Complexity

- **Time:** O(n log n) for comparison sort + O(n) for follow-up scan
- **Space:** O(1) to O(n) depending on sort implementation

```js
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = out[out.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      out.push(intervals[i]);
    }
  }
  return out;
}
```

## Variations

- **Partial sort / heap for top K:** O(n log k) instead of full O(n log n) sort
- **Counting sort:** O(n + k) when values are in a small range
- **Sort + binary search:** find pair with target in sorted array via complement search

## Edge cases

- **Empty or single element:** return as-is
- **Duplicate values:** skip duplicates in 3Sum-style problems
- **Integer overflow in comparators:** use subtraction carefully or explicit compare

## Practice problems

- [Merge Intervals](https://leetcode.com/problems/merge-intervals/) — sort by start, merge overlapping
- [3Sum](https://leetcode.com/problems/3sum/) — sort, fix one index, two-pointer the rest
- [Sort Colors](https://leetcode.com/problems/sort-colors/) — Dutch National Flag, O(n) without full sort
- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) — quickselect or heap
