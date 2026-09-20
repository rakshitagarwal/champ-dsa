# Intervals

**Definition:** Sorting arranges elements with a comparator (`O(n log n)`). In interviews the most common use is the **Intervals** pattern: sort intervals by start (or end), then sweep left-to-right to merge overlaps. Inserting an interval and erasing overlaps use the same idea.

**When to use:** Input is `[start, end]` pairs (meetings, ranges) and you must merge, insert, or count overlaps. If unsorted, sort first — the sweep only works on sorted data.

**How it works:** Sort by `a[0]-b[0]`. Keep the last merged interval `last`. For each `cur`, if `cur[0] <= last[1]` there is overlap → `last[1] = max(last[1], cur[1])`; else push `cur`. Insert: copy “before,” merge overlaps, copy “after.” Time `O(n log n)` sort + `O(n)` sweep, space `O(n)`.

## Study notes

- **Recognition:** list of `[start,end]`; merge / insert / erase overlaps / min rooms.
- **Sort key:** merge → by start; non-overlap count → often by **end**.
- **Overlap test:** `a.start <= b.end && b.start <= a.end` (closed); be careful with half-open ranges.
- **Meeting rooms II:** sort starts & ends; sweep line / min-heap of ends.
- **Traps:** forgetting to sort; mutating `last` incorrectly; inclusive ends.
- **Checklist:** sort by start or end? what counts as “overlap”?

## Active revision

- Merge vs erase-overlaps: which sort key (start vs end) and why?
- State the three phases of Insert Interval in order.
- Closed vs half-open: how does the overlap test change?

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
// Time: O(n log n) · Space: O(n)
// sort by start; merge when overlap
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    const start = 0;
    const end = 1;
    
    intervals = intervals.sort((a,b) => a[start] - b[start]);
    
    let previous = intervals[0];
    let res = [previous];
    
    for(let current of intervals){
        if(current[start] <= previous[end]){
            previous[end] = Math.max(previous[end], current[end]);
        } else {
            res.push(current);
            previous = current;
        }
    }
    
    return res;
};
```

## Insert Interval

Walk existing intervals. Copy the ones that end before the new start. Merge everything that overlaps the new one. Copy the rest.

[Insert Interval](https://leetcode.com/problems/insert-interval/)

```js
// Time: O(n) · Space: O(n)
// add non-overlap left/right; merge middle
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    let res = [];
    let i = 0;
    
    const start = 0;
    const end = 1;
    
    while(i < intervals.length && intervals[i][end] < newInterval[start]){
        res.push(intervals[i]);
        i++;
    }
    
    while(i < intervals.length && intervals[i][start] <= newInterval[end]){
        newInterval[start] = Math.min(newInterval[start], intervals[i][start]);
        newInterval[end] = Math.max(newInterval[end], intervals[i][end]);
        i++;
    }
    
    res.push(newInterval);
    
    while(i < intervals.length){
        res.push(intervals[i]);
        i++;
    }
    
    return res;
};
```

## Non-overlapping Intervals

How many intervals must you remove so none overlap? Sort by end and greedily keep.

[Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

```js
// Time: O(n log n) · Space: O(1)
// sort by end; greedily keep earliest end
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b) => a[1] - b[1]);
    
    let count = 0;
    let prev = 0;
    
    for(let i=1; i<intervals.length; i++){
        let current = intervals[i];
        if(current[0] < intervals[prev][1]){
            count++;
        } else {
            prev = i;
        }
    }
    
    return count;
};
```

## Meeting Rooms (Can Attend All Meetings)

Can you attend every meeting? Sort and check whether any adjacent pair overlaps.

[Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)

```js
// Time: O(n log n) · Space: O(1)
// sort starts/ends; check adjacent overlap
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function(intervals) {
    
    intervals.sort((a,b) => a[0] - b[0]);
    
    const start = 0;
    const end = 1;
    
    for(let i = 0; i < intervals.length-1; i++){
        if(intervals[i][end] > intervals[i+1][start]){
            return false;
        }
    }
    
    return true;
};
```

## Sort Colors (Dutch Flag)

Sort 0, 1, 2 in one pass. Low, mid, high pointers.

[Sort Colors](https://leetcode.com/problems/sort-colors/)

```js
// Time: O(n) · Space: O(n)
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
