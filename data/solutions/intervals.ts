import type { SolutionGroup } from "./types";

export const INTERVALS_SOLUTIONS: SolutionGroup = {
  id: "intervals",
  title: "Intervals",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "meeting-rooms",
      title: "Meeting Rooms",
      diff: "Easy",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=VDIFkjYCkBE&ab_channel=AlgoJS",
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
      id: 1,
      lcSlug: "merge-intervals",
      title: "Merge Intervals",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=XK_T3ejbK2I&t=6s&ab_channel=AlgoJS",
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
      id: 2,
      lcSlug: "insert-interval",
      title: "Insert Interval",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=mUvCAk3_ms8&t=1s&ab_channel=AlgoJS",
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
      id: 3,
      lcSlug: "non-overlapping-intervals",
      title: "Non-Overlapping Intervals",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=y4VbQUAjIl0&t=281s&ab_channel=AlgoJS",
      body: `Kitne intervals hatane padenge taaki overlap na rahe? End se sort karo, greedy rakho.

[Non-Overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

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
      id: 4,
      lcSlug: "meeting-rooms-ii",
      title: "Meeting Rooms II",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=ATzqMCYXz0Q&t=309s&ab_channel=AlgoJS",
      body: `Starts aur ends alag sort karo. Nayi meeting purane khatm se pehle aaye to room badhao.

[Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: do pointer rooms — ek-ek step comment dekho
// LC: https://leetcode.com/problems/meeting-rooms-ii/ (Premium)
function minMeetingRooms(intervals) {
  // Hinglish: step 1 — starts/ends alag sort karo
  const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
  const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
  let rooms = 0, best = 0, e = 0;
  for (let s = 0; s < starts.length; s++) {
    if (starts[s] < ends[e]) { rooms++; best = Math.max(best, rooms); } // Hinglish: overlap to room badhao
    else e++; // Hinglish: ek khatm, room free
  }
  return best;
}
\`\`\``,
    },
      ],
    },
  ],
};
