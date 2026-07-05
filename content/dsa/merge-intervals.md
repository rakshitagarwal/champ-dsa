# Merge Intervals

Merge Intervals handles problems where you need to combine overlapping intervals into a single continuous range by sorting and then merging adjacent intervals.

## When to use
- Input is a collection of intervals [start, end]
- Need to find overlaps, gaps, or merge ranges
- Scheduling and meeting room problems

## How it works

Sort intervals by start time. Iterate through sorted intervals, merging the current interval with the previous one if they overlap (current.start <= previous.end). Otherwise, push the previous interval and start a new one.

```js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    if (intervals[i][0] <= prev[1]) {
      prev[1] = Math.max(prev[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}
```

## Practice problems
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/) — Core merge logic
- [Insert Interval](https://leetcode.com/problems/insert-interval/) — Insert then merge overlapping intervals
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) — Find minimum removals to make intervals non-overlapping
- [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) — Minimum meeting rooms using overlap counting
