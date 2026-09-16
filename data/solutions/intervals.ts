import type { SolutionGroup } from "./types";

export const INTERVALS_SOLUTIONS: SolutionGroup = {
  id: "intervals",
  title: "Intervals",
  subs: [
    {
      title: "Merge / Overlap",
      topics: [
    {
      id: 56,
      lcSlug: "merge-intervals",
      title: "Merge Intervals",
      diff: "Medium",
      body: `Sort by start. Overlap means \`start <= lastEnd\`. Then the new end is the max of the two ends.

[Merge Intervals](https://leetcode.com/problems/merge-intervals/)

\`\`\`js
// Intervals — sort by start, merge overlaps in one pass
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
\`\`\``,
    },
    {
      id: 57,
      lcSlug: "insert-interval",
      title: "Insert Interval",
      diff: "Medium",
      body: `Walk existing intervals. Copy the ones that end before the new start. Merge everything that overlaps the new one. Copy the rest.

[Insert Interval](https://leetcode.com/problems/insert-interval/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 252,
      lcSlug: "meeting-rooms",
      title: "Meeting Rooms",
      diff: "Easy",
    premium: true,
      body: `Sort by start time. If any meeting starts before the previous one ends, double-booking makes attending all impossible.

[Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)

*Premium — requires LeetCode Premium.*

\`\`\`js
// Sort by start; any start before previous end means double-booking
// LC: https://leetcode.com/problems/meeting-rooms/ (premium, lintcode 920)
function canAttendMeetings(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]); // Earliest meetings first
  for (let i=1;i<intervals.length;i++) {
    if (intervals[i][0] < intervals[i-1][1]) return false; // Overlap: cannot attend all
  }
  return true; // No overlap found
}
\`\`\``,
    },
    {
      id: 435,
      lcSlug: "non-overlapping-intervals",
      title: "Non-overlapping Intervals",
      diff: "Medium",
      body: `Sort by end time and greedily keep non-overlapping intervals — removals equal total minus kept.

[Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

\`\`\`js
// Greedy: keep intervals that finish earliest — frees the timeline sooner
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
\`\`\``,
    },
    {
      id: 986,
      lcSlug: "interval-list-intersections",
      title: "Interval List Intersections",
      diff: "Medium",
      body: `Two sorted lists, two pointers: intersect current pair, then advance the interval that ends first.

[Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)

\`\`\`js
// Two sorted lists — merge-style walk without building a merged list
// LC: https://leetcode.com/problems/interval-list-intersections/
function intervalIntersection(firstList, secondList) {
  const out = [];
  let i = 0, j = 0; // Pointers into each list
  while (i < firstList.length && j < secondList.length) {
    const s = Math.max(firstList[i][0], secondList[j][0]); // Overlap start is later of two starts
    const e = Math.min(firstList[i][1], secondList[j][1]); // Overlap end is earlier of two ends
    if (s <= e) out.push([s, e]); // Non-empty intersection
    if (firstList[i][1] < secondList[j][1]) i++; // First interval ends first — advance i
    else j++; // Second ends first or tie — advance j
  }
  return out;
}
\`\`\``,
    },
    {
      id: 1288,
      lcSlug: "remove-covered-intervals",
      title: "Remove Covered Intervals",
      diff: "Medium",
      body: `Sort by start, then by descending end (longer first at same start). Track the farthest end seen; intervals ending inside it are covered.

[Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals/)

\`\`\`js
// Covered = some earlier interval already spans at least this end
// LC: https://leetcode.com/problems/remove-covered-intervals/
function removeCoveredIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]); // Same start: longer interval first
  let kept = 0, maxEnd = -1; // maxEnd = farthest right seen among kept starts
  for (const [s, e] of intervals) {
    if (e > maxEnd) { kept++; maxEnd = e; } // Extends coverage — count as uncovered
    // else e <= maxEnd: fully inside a prior interval — drop
  }
  return kept;
}
\`\`\``,
    },
    {
      id: 452,
      lcSlug: "minimum-number-of-arrows-to-burst-balloons",
      title: "Minimum Number of Arrows to Burst Balloons",
      diff: "Medium",
      body: `Each balloon is an interval. Sort by end and place arrows greedily at interval ends — same pattern as non-overlapping intervals.

[Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

\`\`\`js
// Same greedy as non-overlapping intervals — arrow position = last end in a cluster
// LC: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
function findMinArrowShots(points) {
  points.sort((a,b)=>a[1]-b[1]); // Earliest finishing balloons first
  let arrows=0, last=-Infinity; // last = x-coordinate of last arrow placed
  for(const [s,e] of points){
    if(s>last){ arrows++; last=e; } // Balloon starts after last arrow — need new arrow at e
    // else balloon covered by arrow at last
  }
  return arrows;
}
\`\`\``,
    },
    {
      id: 759,
      lcSlug: "employee-free-time",
      title: "Employee Free Time",
      diff: "Hard",
    premium: true,
      body: `Flatten all busy intervals, sort by start, and merge overlaps. Gaps between merged busy blocks are employee free time.

[Employee Free Time](https://leetcode.com/problems/employee-free-time/)

*Premium — requires LeetCode Premium.*

\`\`\`js
// Flatten all busy blocks, sort, merge mentally — gaps between merged busy are free
// LC: https://leetcode.com/problems/employee-free-time/ (Premium)
function employeeFreeTime(schedule) {
  const all = [];
  for (const emp of schedule) for (const iv of emp) all.push(iv); // Collect every busy interval
  all.sort((a, b) => a.start - b.start || a.start - b.start); // Order by start time
  const out = [];
  let end = all[0].end; // Running end of merged busy timeline
  for (let i = 1; i < all.length; i++) {
    if (all[i].start > end) out.push([end, all[i].start]); // Gap between busy blocks = free
    if (all[i].end > end) end = all[i].end; // Extend merged busy if this interval goes further
  }
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};
