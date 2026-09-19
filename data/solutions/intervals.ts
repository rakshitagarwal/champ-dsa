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
// Time: O(n log n) · Space: O(1)
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
// Time: O(n log n) · Space: O(n)
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
// Time: O(n) · Space: O(n)
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
// Time: O(n log n) · Space: O(1)
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
// Time: O(n log n) · Space: O(n)
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    
    if(!intervals || intervals.length < 1){
        return 0;
    }
    
    const starts = intervals.map((interval) => interval[0]).sort((a,b) => a-b);
    const ends = intervals.map((interval) => interval[1]).sort((a,b) => a-b);
    
    let rooms = 0;
    let end = 0;
    
    for(let i = 0; i<intervals.length; i++){
        if(starts[i] < ends[end]){
            rooms++;
        }else {
            end++;
        }
    }
    
    return rooms;
    
};
\`\`\``,
    },
      ],
    },
  ],
};
