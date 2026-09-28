import type { SolutionGroup } from "@/data/solutions/types";

export const INTERVALS_SOLUTIONS: SolutionGroup = {
  id: "intervals",
  title: "Intervals",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 56,
      lcSlug: "merge-intervals",
      title: "Merge Intervals",
      diff: "Medium",
      body: "Sort by start. Overlap means `start <= lastEnd`. Then the new end is the max of the two ends.\n\n[Merge Intervals](https://leetcode.com/problems/merge-intervals/)\n\n```js\n// Time: O(n log n) · Space: O(n)\n/**\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nvar merge = function(intervals) {\n    const start = 0;\n    const end = 1;\n    \n    intervals = intervals.sort((a,b) => a[start] - b[start]);\n    \n    let previous = intervals[0];\n    let res = [previous];\n    \n    for(let current of intervals){\n        if(current[start] <= previous[end]){\n            previous[end] = Math.max(previous[end], current[end]);\n        } else {\n            res.push(current);\n            previous = current;\n        }\n    }\n    \n    return res;\n};\n```",
    },
    {
      id: 57,
      lcSlug: "insert-interval",
      title: "Insert Interval",
      diff: "Medium",
      body: "Walk existing intervals. Copy the ones that end before the new start. Merge everything that overlaps the new one. Copy the rest.\n\n[Insert Interval](https://leetcode.com/problems/insert-interval/)\n\n```js\n// Time: O(n) · Space: O(n)\n/**\n * @param {number[][]} intervals\n * @param {number[]} newInterval\n * @return {number[][]}\n */\nvar insert = function(intervals, newInterval) {\n    let res = [];\n    let i = 0;\n    \n    const start = 0;\n    const end = 1;\n    \n    while(i < intervals.length && intervals[i][end] < newInterval[start]){\n        res.push(intervals[i]);\n        i++;\n    }\n    \n    while(i < intervals.length && intervals[i][start] <= newInterval[end]){\n        newInterval[start] = Math.min(newInterval[start], intervals[i][start]);\n        newInterval[end] = Math.max(newInterval[end], intervals[i][end]);\n        i++;\n    }\n    \n    res.push(newInterval);\n    \n    while(i < intervals.length){\n        res.push(intervals[i]);\n        i++;\n    }\n    \n    return res;\n};\n```",
    },
    {
      id: 435,
      lcSlug: "non-overlapping-intervals",
      title: "Non-overlapping Intervals",
      diff: "Medium",
      body: "Kitne intervals hatane padenge taaki overlap na rahe? End se sort karo, greedy rakho.\n\n[Non-Overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)\n\n```js\n// Time: O(n log n) · Space: O(1)\n/**\n * @param {number[][]} intervals\n * @return {number}\n */\nvar eraseOverlapIntervals = function(intervals) {\n    intervals.sort((a,b) => a[1] - b[1]);\n    \n    let count = 0;\n    let prev = 0;\n    \n    for(let i=1; i<intervals.length; i++){\n        let current = intervals[i];\n        if(current[0] < intervals[prev][1]){\n            count++;\n        } else {\n            prev = i;\n        }\n    }\n    \n    return count;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 252,
      lcSlug: "meeting-rooms",
      title: "Meeting Rooms",
      diff: "Easy",
      premium: true,
      body: "Sab meetings attend kar sakte kya? Sort karke check karo overlap hai kya.\n\n[Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)\n\n*Premium question — kholne ke liye LeetCode premium chahiye.*\n\n```js\n// Time: O(n log n) · Space: O(1)\n/**\n * @param {number[][]} intervals\n * @return {boolean}\n */\nvar canAttendMeetings = function(intervals) {\n    \n    intervals.sort((a,b) => a[0] - b[0]);\n    \n    const start = 0;\n    const end = 1;\n    \n    for(let i = 0; i < intervals.length-1; i++){\n        if(intervals[i][end] > intervals[i+1][start]){\n            return false;\n        }\n    }\n    \n    return true;\n};\n```",
    },
    {
      id: 253,
      lcSlug: "meeting-rooms-ii",
      title: "Meeting Rooms II",
      diff: "Medium",
      premium: true,
      body: "Starts aur ends alag sort karo. Nayi meeting purane khatm se pehle aaye to room badhao.\n\n[Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)\n\n*Premium question — kholne ke liye LeetCode premium chahiye.*\n\n```js\n// Time: O(n log n) · Space: O(n)\n/**\n * @param {number[][]} intervals\n * @return {number}\n */\nvar minMeetingRooms = function(intervals) {\n    \n    if(!intervals || intervals.length < 1){\n        return 0;\n    }\n    \n    const starts = intervals.map((interval) => interval[0]).sort((a,b) => a-b);\n    const ends = intervals.map((interval) => interval[1]).sort((a,b) => a-b);\n    \n    let rooms = 0;\n    let end = 0;\n    \n    for(let i = 0; i<intervals.length; i++){\n        if(starts[i] < ends[end]){\n            rooms++;\n        }else {\n            end++;\n        }\n    }\n    \n    return rooms;\n    \n};\n```",
    },
    {
      id: 452,
      lcSlug: "minimum-number-of-arrows-to-burst-balloons",
      title: "Minimum Number of Arrows to Burst Balloons",
      diff: "Medium",
      body: "Sort by end — greedy arrows, jab start > arrowEnd naya arrow.\n\n[Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)\n\n```js\n// Time: O(n log n) · Space: O(1)\nvar findMinArrowShots = function(points) {\n  points.sort((a, b) => a[1] - b[1]);\n  let arrows = 1, end = points[0][1];\n  for (let i = 1; i < points.length; i++) {\n    if (points[i][0] > end) {\n      arrows++;\n      end = points[i][1];\n    }\n  }\n  return arrows;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 759,
      lcSlug: "employee-free-time",
      title: "Employee Free Time",
      diff: "Hard",
      premium: true,
      body: "Saare intervals flatten+sort — gaps between merged = free time.\n\n[Employee Free Time](https://leetcode.com/problems/employee-free-time/)\n\n*Premium question — kholne ke liye LeetCode premium chahiye.*\n\n```js\n// Time: O(n log n) · Space: O(n)\nvar employeeFreeTime = function(schedule) {\n  const intervals = schedule.flat().sort((a, b) => a.start - b.start);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = merged[merged.length - 1];\n    if (intervals[i].start <= last.end) {\n      last.end = Math.max(last.end, intervals[i].end);\n    } else merged.push(intervals[i]);\n  }\n  const free = [];\n  for (let i = 1; i < merged.length; i++) {\n    free.push(new Interval(merged[i - 1].end, merged[i].start));\n  }\n  return free;\n};\n```",
    },
      ],
    },
  ],
};
