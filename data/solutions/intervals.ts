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
\`\`\``,
    },
    {
      id: 252,
      lcSlug: "meeting-rooms",
      title: "Meeting Rooms",
      diff: "Easy",
    premium: true,
      body: `Sab meetings attend kar sakte kya? Sort karke check karo overlap hai kya.

[Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: sort karke merge — ek-ek step comment dekho
// LC: https://leetcode.com/problems/meeting-rooms/ (premium, lintcode 920)
function canAttendMeetings(intervals) {
  // Hinglish: start se sort
  intervals.sort((a,b)=>a[0]-b[0]);
  for (let i=1;i<intervals.length;i++) {
    if (intervals[i][0] < intervals[i-1][1]) return false; // Hinglish: overlap to nahi kar sakte
  }
  return true;
}
\`\`\``,
    },
    {
      id: 435,
      lcSlug: "non-overlapping-intervals",
      title: "Non-overlapping Intervals",
      diff: "Medium",
      body: `Kitne intervals hatane padenge taaki overlap na rahe? End se sort karo, greedy rakho.

[Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

\`\`\`js
// Hinglish: sort karke merge — ek-ek step comment dekho
// LC: https://leetcode.com/problems/non-overlapping-intervals/
function eraseOverlapIntervals(intervals) {
  // Hinglish: end se sort, jaldi khatam wala pehle
  intervals.sort((a,b)=>a[1]-b[1]);
  let kept = 0, lastEnd = -Infinity;
  for (const [s,e] of intervals) {
    if (s >= lastEnd) { kept++; lastEnd = e; } // Hinglish: overlap nahi to rakho
    // warna hatao
  }
  return intervals.length - kept; // Hinglish: hatane wale
}
\`\`\``,
    },
    {
      id: 986,
      lcSlug: "interval-list-intersections",
      title: "Interval List Intersections",
      diff: "Medium",
      body: `Dono lists sorted hain — do pointer se overlap nikalo, chhota khatm wala aage badhao.

[Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)

\`\`\`js
// Hinglish: overlap nikalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/interval-list-intersections/
function intervalIntersection(firstList, secondList) {
  // Hinglish: step 1 — do pointer lo
  const out = [];
  let i = 0, j = 0;
  while (i < firstList.length && j < secondList.length) {
    const s = Math.max(firstList[i][0], secondList[j][0]); // Hinglish: overlap start
    const e = Math.min(firstList[i][1], secondList[j][1]); // Hinglish: overlap end
    if (s <= e) out.push([s, e]); // Hinglish: overlap mila
    if (firstList[i][1] < secondList[j][1]) i++; // Hinglish: pehle khatm wala aage
    else j++;
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
      body: `Start se sort, end descending rakho (same start pe bada pehle) — max end track karo, chhota mile to covered hai.

[Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals/)

\`\`\`js
// Hinglish: bada pehle rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-covered-intervals/
function removeCoveredIntervals(intervals) {
  // Hinglish: step 1 — sort karo (start up, end down)
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let kept = 0, maxEnd = -1;
  for (const [s, e] of intervals) {
    if (e > maxEnd) { kept++; maxEnd = e; } // Hinglish: naya bada mila
    // warna covered hai — ginna chhodo
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
      body: `Balloon = interval. End se sort karo, ek arrow jahan tak cover kare rakho.

[Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

\`\`\`js
// Hinglish: local best lo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
function findMinArrowShots(points) {
  // Hinglish: end se sort
  points.sort((a,b)=>a[1]-b[1]);
  let arrows=0, last=-Infinity;
  for(const [s,e] of points){
    if(s>last){ arrows++; last=e; } // Hinglish: naya arrow chahiye
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
      body: `Sab busy mila ke merge karo — gaps hi free time hain. K-way merge heap se bhi hota hai.

[Employee Free Time](https://leetcode.com/problems/employee-free-time/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: busy jodo, gap nikalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/employee-free-time/ (Premium)
function employeeFreeTime(schedule) {
  // Hinglish: step 1 — sab intervals jama karo
  const all = [];
  for (const emp of schedule) for (const iv of emp) all.push(iv);
  all.sort((a, b) => a.start - b.start || a.start - b.start);
  const out = [];
  let end = all[0].end;
  for (let i = 1; i < all.length; i++) {
    if (all[i].start > end) out.push([end, all[i].start]); // Hinglish: gap mila = free
    if (all[i].end > end) end = all[i].end; // Hinglish: busy badhao
  }
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};
