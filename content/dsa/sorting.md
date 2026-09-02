# Intervals

**Definition:** Sorting elements ko comparator se arrange karta hai (`O(n log n)`). Interviews me sabse common use **Intervals** pattern hai: intervals ko start (ya end) se sort karke left-to-right sweep me overlaps merge karna. Insert interval aur overlaps hatana bhi isi me.

**When to use:** Input `[start, end]` pairs ho (meetings, ranges) aur merge/insert/overlaps ginna ho. Unsorted hai to pehle sort zaroori — sweep sorted par hi kaam karta hai.

**How it works:** `a[0]-b[0]` se sort. Last merged interval `last` rakho. Har `cur` ke liye agar `cur[0] <= last[1]` to overlap → `last[1] = max(last[1], cur[1])`; warna push `cur`. Insert me "pehle wale" copy, "overlap wale" merge, "baad wale" copy. Time `O(n log n)` sort + `O(n)` sweep, space `O(n)`.

```js
// Sorting skeleton
// Hinglish: pehle sort karo
nums.sort((a, b) => a - b); // O(n log n)

// Interval skeleton — sort then linear merge
// Hinglish: sort karke pichhle se compare, overlap to stretch
items.sort((a, b) => a[0] - b[0]);
const out = [items[0]];
for (const cur of items.slice(1)) {
  const last = out.at(-1);
  if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]); // overlap → badhao
  else out.push(cur);
}
```
## Merge Intervals

Sort by start. Overlap means `start <= lastEnd`. Then the new end is the max of the two ends.

[Merge Intervals](https://leetcode.com/problems/merge-intervals/)

```js
// Hinglish: sort karke merge — ek-ek step comment dekho
// Intervals — merge overlaps
// LC: https://leetcode.com/problems/merge-intervals/
function merge(intervals) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: sort karke merge — ek-ek step comment dekho
// Intervals — insert then merge
// LC: https://leetcode.com/problems/insert-interval/
function insert(intervals, newInterval) {
  // Hinglish: step 1 — base case check karo
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
