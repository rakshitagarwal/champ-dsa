# Intervals

**Definition:** Sorting elements ko comparator se arrange karta hai (`O(n log n)`). Interviews me sabse common use **Intervals** pattern hai: intervals ko start (ya end) se sort karke left-to-right sweep me overlaps merge karna. Insert interval aur overlaps hatana bhi isi me.

**When to use:** Input `[start, end]` pairs ho (meetings, ranges) aur merge/insert/overlaps ginna ho. Unsorted hai to pehle sort zaroori — sweep sorted par hi kaam karta hai.

**How it works:** `a[0]-b[0]` se sort. Last merged interval `last` rakho. Har `cur` ke liye agar `cur[0] <= last[1]` to overlap → `last[1] = max(last[1], cur[1])`; warna push `cur`. Insert me "pehle wale" copy, "overlap wale" merge, "baad wale" copy. Time `O(n log n)` sort + `O(n)` sweep, space `O(n)`.

```js
// Sorting skeleton
// first sort do
nums.sort((a, b) => a - b); // O(n log n)

// Interval skeleton — sort then linear merge
// sort by start; merge overlapping intervals
items.sort((a, b) => a[0] - b[0]);
const out = [items[0]];
for (const cur of items.slice(1)) {
  const last = out.at(-1);
  if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]); // overlap — extend current interval end
  else out.push(cur);
}
```
## Merge Intervals

Sort by start. Overlap means `start <= lastEnd`. Then the new end is the max of the two ends.

[Merge Intervals](https://leetcode.com/problems/merge-intervals/)

```js
// LC: https://leetcode.com/problems/merge-intervals/
function merge(intervals) {
  // Empty input is handled by caller; we need at least one interval to seed output
  intervals.sort((a, b) => a[0] - b[0]); // Overlaps only matter after sorting by start
  const out = [intervals[0]]; // First interval starts the merged list
  for (let i = 1; i < intervals.length; i++) {
    const last = out[out.length - 1]; // Current merged interval at the tail
    const [s, e] = intervals[i]; // Candidate interval to place or merge
    if (s <= last[1]) last[1] = Math.max(last[1], e); // Overlap: extend end only
    else out.push([s, e]); // Disjoint: append as a new interval
  }
  return out;
}
```

## Insert Interval

Walk existing intervals. Copy the ones that end before the new start. Merge everything that overlaps the new one. Copy the rest.

[Insert Interval](https://leetcode.com/problems/insert-interval/)

```js
// Three phases: before, merge overlap, after — no full resort needed
// LC: https://leetcode.com/problems/insert-interval/
function insert(intervals, newInterval) {
  const out = [];
  let i = 0, n = intervals.length;
  let [ns, ne] = newInterval; // Mutable bounds while merging overlaps
  while (i < n && intervals[i][1] < ns) out.push(intervals[i++]); // Wholly before new interval
  while (i < n && intervals[i][0] <= ne) {
    ns = Math.min(ns, intervals[i][0]); // Expand merged start left if needed
    ne = Math.max(ne, intervals[i][1]); // Expand merged end right if needed
    i++; // Consume overlapping interval
  }
  out.push([ns, ne]); // Single merged block for new + overlaps
  while (i < n) out.push(intervals[i++]); // Remaining intervals after merged block
  return out;
}
```

## Non-overlapping Intervals

Kitne intervals hatane padenge taaki overlap na rahe? End se sort karo, greedy rakho.

[Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

```js
// LC: https://leetcode.com/problems/non-overlapping-intervals/
function eraseOverlapIntervals(intervals) {
  intervals.sort((a,b)=>a[1]-b[1]); // Sort by end time ascending
  let kept = 0, lastEnd = -Infinity; // lastEnd = end of last kept interval
  for (const [s,e] of intervals) {
    if (s >= lastEnd) { kept++; lastEnd = e; } // No overlap with kept set — keep it
    // else skip: this interval overlaps something we already kept
  }
  return intervals.length - kept; // Removals = total minus kept
}
```

## Meeting Rooms (Can Attend All Meetings)

Sab meetings attend kar sakte kya? Sort karke check karo overlap hai kya.

[Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)

```js
// Sort by start; any start before previous end means double-booking
// LC: https://leetcode.com/problems/meeting-rooms/ (premium, lintcode 920)
function canAttendMeetings(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]); // Earliest meetings first
  for (let i=1;i<intervals.length;i++) {
    if (intervals[i][0] < intervals[i-1][1]) return false; // Overlap: cannot attend all
  }
  return true; // No overlap found
}
```

## Sort Colors (Dutch Flag)

0,1,2 ko ek pass me sort karo. Low, mid, high pointer.

[Sort Colors](https://leetcode.com/problems/sort-colors/)

```js
// LC: https://leetcode.com/problems/sort-colors/
function sortColors(nums) {
  // 0 left, 2 right
  let lo=0, mid=0, hi=nums.length-1;
  while (mid <= hi) {
    if (nums[mid]===0) [nums[lo++], nums[mid++]] = [nums[mid], nums[lo]]; // Dutch flag: swap 0 toward low region
    else if (nums[mid]===1) mid++; // 1 stays in middle band — advance mid
    else [nums[mid], nums[hi--]] = [nums[hi], nums[mid]]; // swap 2 toward high region
  }
}
```
