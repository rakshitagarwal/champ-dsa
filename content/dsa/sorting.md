# Intervals

Sort, then walk left to right. I only look at the last interval I kept. If the new one overlaps, stretch the end. If I am inserting, find the hole and merge whatever I swallow.

```js
// Interval skeleton
items.sort((a, b) => a[0] - b[0]);
const out = [items[0]];
for (const cur of items.slice(1)) {
  const last = out.at(-1);
  if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
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
