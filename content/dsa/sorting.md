# Sorting

Sort so the next pass is linear: merge overlaps, partition 3 colors, greedy intervals.

```js
// Sort-first skeleton
items.sort((a, b) => a.start - b.start);
for (const x of items) {
  // merge / pick / skip using the last kept item
}
```

## Merge Intervals

Sort by start, merge if overlap — [Merge Intervals](https://leetcode.com/problems/merge-intervals/).

```js
// Sort — then merge overlaps
// LC: https://leetcode.com/problems/merge-intervals/
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = out[out.length - 1];
    const [s, e] = intervals[i];
    if (s <= last[1]) last[1] = Math.max(last[1], e); // overlap → extend
    else out.push([s, e]);
  }
  return out;
}
```

## Sort Colors

Dutch flag: lo / mid / hi — [Sort Colors](https://leetcode.com/problems/sort-colors/).

```js
// Sort — three-way partition
// LC: https://leetcode.com/problems/sort-colors/
function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) {
      [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
      lo++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
      hi--;
    }
  }
}
```

## Non-overlapping Intervals

Sort by end, keep what finishes first — [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/).

```js
// Sort — greedy keep earliest finish
// LC: https://leetcode.com/problems/non-overlapping-intervals/
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let keep = 0, end = -Infinity;
  for (const [s, e] of intervals) {
    if (s >= end) {
      keep++;
      end = e; // take this interval
    }
  }
  return intervals.length - keep; // removals
}
```

**More:** [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/), [Sort an Array](https://leetcode.com/problems/sort-an-array/), [Largest Number](https://leetcode.com/problems/largest-number/).
