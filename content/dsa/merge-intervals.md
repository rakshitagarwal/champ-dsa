# Merge Intervals

The merge intervals pattern solves problems where you are given a collection of ranges (intervals), each defined by a start and an end value, and you must combine overlapping intervals into a single contiguous range. Two intervals `[a, b]` and `[c, d]` overlap if `c <= b` (assuming they are sorted by start time) — that is, the second interval starts before or exactly when the first one ends. When they overlap, you can merge them into `[min(a, c), max(b, d)]`. This deceptively simple idea is the foundation for scheduling algorithms, calendar applications, and many geometry problems.

The key algorithmic insight is that sorting by the start time linearises the problem. Once intervals are sorted, any overlap must occur between adjacent intervals in the sorted order. This means you can process the list in a single pass: maintain a "current merged" interval and extend it as long as the next interval overlaps; when an interval does not overlap, you finalise the current one and begin a new merge. This two-step process of sorting then linear scanning is what makes the pattern so widely applicable — it turns an O(n²) pairwise check into an O(n log n) algorithm.

## When to use

- Input is a collection of intervals `[start, end]` that may overlap
- You need to produce a set of non-overlapping intervals covering the same range
- You are checking for free time slots between a set of busy intervals
- You need to find gaps, intersections, or unions of multiple ranges
- Problems involving meeting room scheduling, calendar events, or resource allocation
- Problems where inserting a new interval into an existing set of merged intervals is required

## How it works

### Core concept

The fundamental operation in this pattern is the overlap check. Given two intervals `A = [a1, a2]` and `B = [b1, b2]` (sorted such that `a1 <= b1`), they overlap if `b1 <= a2`. This condition says: the next interval starts before the current one ends. Since we sort by start time, we guarantee that `a1 <= b1`. The merge operation takes the minimum of the start times (which is just `a1` because of sorting) and the maximum of the end times (`Math.max(a2, b2)`).

After sorting, the problem reduces to a simple state machine. You iterate through the intervals and keep a "current" interval that represents the ongoing merge. For each new interval, if it overlaps with `current`, you extend `current`'s end time (and possibly its start time if unsorted, though sorting guarantees it is not needed). If it does not overlap, you push `current` onto the result list and set `current` to the new interval. This greedy approach produces the optimal minimal set of merged intervals.

### Step-by-step approach

1. **Sort the intervals by start time.** Use `intervals.sort((a, b) => a[0] - b[0])`. This ensures that any overlap will only occur between consecutive intervals in the sorted list.
2. **Initialise the result with the first interval.** Set `merged = [intervals[0]]`. This is the current merge candidate.
3. **Iterate over the remaining intervals.** For each interval, compare its start with the end of the last interval in `merged`. If `interval[0] <= last[1]`, an overlap exists — extend the last interval's end to `Math.max(last[1], interval[1])`.
4. **Handle non-overlapping intervals.** If the current interval starts after the last merged interval ends, push it as a new separate entry in `merged`.
5. **Return the merged list.** The result contains only non-overlapping intervals that cover the same span as the original set.

### Complexity

- **Time:** O(n log n) — dominated by the sorting step; the merge pass is O(n)
- **Space:** O(n) — for the output list (or O(1) if merging in-place by overwriting the input array)

```js
function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}

function insert(intervals, newInterval) {
  const result = [];
  let i = 0, [ns, ne] = newInterval;
  while (i < intervals.length && intervals[i][1] < ns) {
    result.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= ne) {
    ns = Math.min(ns, intervals[i][0]);
    ne = Math.max(ne, intervals[i][1]);
    i++;
  }
  result.push([ns, ne]);
  while (i < intervals.length) result.push(intervals[i++]);
  return result;
}
```

## Variations

- **Insert interval:** Given a sorted non-overlapping list of intervals, insert a new interval and merge any resulting overlaps. Process in three phases: add intervals ending before the new one, merge overlapping intervals into one, and then add the remaining intervals.
- **Interval intersection:** Given two lists of intervals, find their intersection. Use two pointers: advance the one whose interval ends earlier. Two intervals intersect if `max(start1, start2) <= min(end1, end2)`.
- **Non-overlapping intervals:** Find the minimum number of intervals to remove so that the remaining intervals are non-overlapping. Sort by end time, then greedily keep intervals that do not overlap with the last kept interval.
- **Minimum meeting rooms (meeting rooms II):** Determine the minimum number of conference rooms required. This is equivalent to finding the maximum overlap depth at any point in time. Use a chronological approach: sort all start and end events, then sweep through them, incrementing a counter on starts and decrementing on ends.

## Edge cases

- **Empty input:** Return an empty array. The merge loop should not crash on an empty list.
- **Single interval:** Return the interval as-is. The merge loop will not execute, and the result will contain the single interval.
- **Already non-overlapping intervals:** Each interval is pushed as a separate entry in the merged list. No merging occurs.
- **Identical intervals:** Multiple copies of `[1, 3]` will all be merged into a single `[1, 3]` because each subsequent interval starts at 1 which is <= 3, and the max end remains 3.
- **Negative values:** Intervals can contain negative start or end values; the algorithm works the same way because sorting and comparison use numerical order.
- **Unsorted input:** The sort step handles this. Without sorting, the algorithm would fail because overlaps could be non-adjacent.

## Practice problems

- [Merge Intervals](https://leetcode.com/problems/merge-intervals/) — Core merge logic with sorting
- [Insert Interval](https://leetcode.com/problems/insert-interval/) — Insert a new interval into a sorted non-overlapping list and merge
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) — Greedy removal to make intervals non-overlapping
- [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) — Minimum rooms using chronological sweeping
- [Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/) — Two-pointer intersection of two sorted interval lists
- [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) — Overlap-based greedy with interval end sorting
