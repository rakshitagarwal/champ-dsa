# Intervals

**Definition:** Sorting arranges elements by a comparator (`O(n log n)`). The *Intervals* pattern is the most common use of sorting in interviews: sort intervals by start (or end), then sweep left-to-right merging overlaps. It also covers insert-interval and erase-overlaps.

**When to use:** Input is `[start, end]` pairs (meetings, ranges) and you need to merge, insert, or count overlaps/removals. Sort first if the input is unsorted — the sweep only works on sorted order.

**How it works:** Sort by `a[0] - b[0]`. Keep the last merged interval `last`. For each `cur`, if `cur[0] <= last[1]` it overlaps → `last[1] = max(last[1], cur[1])`; else push `cur`. For insert, copy "before", merge "overlapping", copy "after". Time `O(n log n)` for sort + `O(n)` sweep, space `O(n)` for output.

```js
// Sorting skeleton
nums.sort((a, b) => a - b); // O(n log n)

// Interval skeleton — sort then linear merge
items.sort((a, b) => a[0] - b[0]);
const out = [items[0]];
for (const cur of items.slice(1)) {
  const last = out.at(-1);
  if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]); // overlap → stretch
  else out.push(cur);
}
```

## Merge Intervals

Sort by start. Overlap means `start <= lastEnd`. Then the new end is the max of the two ends.

[Merge Intervals](https://leetcode.com/problems/merge-intervals/)

```js
// Intervals — merge overlaps
// LC: https://leetcode.com/problems/merge-intervals/
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = out[out.length - 1];
    const [s, e] = intervals[i];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return out;
}
```

## Insert Interval

Walk existing intervals. Copy the ones that end before the new start. Merge everything that overlaps the new one. Copy the rest.

[Insert Interval](https://leetcode.com/problems/insert-interval/)

```js
// Intervals — insert then merge
// LC: https://leetcode.com/problems/insert-interval/
function insert(intervals, newInterval) {
  const out = [];
  let i = 0, n = intervals.length;
  let [ns, ne] = newInterval;
  while (i < n && intervals[i][1] < ns) out.push(intervals[i++]); // before
  while (i < n && intervals[i][0] <= ne) {
    ns = Math.min(ns, intervals[i][0]);
    ne = Math.max(ne, intervals[i][1]);
    i++;
  }
  out.push([ns, ne]);
  while (i < n) out.push(intervals[i++]); // after
  return out;
}
```
