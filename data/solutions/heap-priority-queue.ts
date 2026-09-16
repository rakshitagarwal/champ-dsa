import type { SolutionGroup } from "./types";

export const HEAP_PRIORITY_QUEUE_SOLUTIONS: SolutionGroup = {
  id: "heap-priority-queue",
  title: "Heap / Priority Queue",
  subs: [
    {
      title: "Top K / K-way",
      topics: [
    {
      id: 215,
      lcSlug: "kth-largest-element-in-an-array",
      title: "Kth Largest Element in an Array",
      diff: "Medium",
      body: `Min-heap of size k. The top is the kth largest. Everything smaller got popped.

[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

\`\`\`js
// Min-heap of size k — root is the kth largest among seen elements
// LC: https://leetcode.com/problems/kth-largest-element-in-an-array/
function findKthLargest(nums, k) {
  const h = [];
  for (const x of nums) {
    heapPush(h, x); // Add candidate to heap
    if (h.length > k) heapPop(h); // Drop smallest — heap holds k largest only
  }
  return h[0]; // Smallest among top k = kth largest overall
}
\`\`\``,
    },
    {
      id: 973,
      lcSlug: "k-closest-points-to-origin",
      title: "K Closest Points to Origin",
      diff: "Medium",
      body: `Min-heap by distance — keep the K closest points; pop extras when size exceeds K.

[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

\`\`\`js
// Sort by squared distance — avoids sqrt; interview shortcut vs size-k heap
// LC: https://leetcode.com/problems/k-closest-points-to-origin/
function kClosest(points, k) {
  points.sort((a,b)=> (a[0]*a[0]+a[1]*a[1]) - (b[0]*b[0]+b[1]*b[1])); // Nearest points first
  return points.slice(0,k); // First k entries are answer
  // Heap variant: push [dist, point], pop when size > k
}
\`\`\``,
    },
    {
      id: 703,
      lcSlug: "kth-largest-element-in-a-stream",
      title: "Kth Largest Element in a Stream",
      diff: "Easy",
      body: `Maintain a min-heap of size k — root is the kth largest; push new values and pop when size > k.

[Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

\`\`\`js
// Streaming version of size-k min-heap for kth largest
// LC: https://leetcode.com/problems/kth-largest-element-in-a-stream/
function KthLargest(k, nums) {
  this.k = k;
  this.h = []; // Min-heap of the k largest values seen so far
  for (const x of nums) this.add(x); // Seed from initial array
}
KthLargest.prototype._up = function (i) {
  while (i > 0) {
    const p = (i - 1) >> 1; // Parent index in array heap
    if (this.h[i] >= this.h[p]) break; // Min-heap property satisfied
    const t = this.h[i]; this.h[i] = this.h[p]; this.h[p] = t; i = p; // Bubble up
  }
};
KthLargest.prototype._down = function (i) {
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1; // Children indices
    if (l < this.h.length && this.h[l] < this.h[m]) m = l; // Prefer smaller child
    if (r < this.h.length && this.h[r] < this.h[m]) m = r;
    if (m === i) break; // Heap property restored
    const t = this.h[i]; this.h[i] = this.h[m]; this.h[m] = t; i = m; // Bubble down
  }
};
KthLargest.prototype.add = function (val) {
  this.h.push(val); this._up(this.h.length - 1); // Insert new stream value
  if (this.h.length > this.k) {
    this.h[0] = this.h.pop(); this._down(0); // Remove smallest — keep k elements
  }
  return this.h[0]; // Current kth largest
};
\`\`\``,
    },
    {
      id: 1046,
      lcSlug: "last-stone-weight",
      title: "Last Stone Weight",
      diff: "Easy",
      body: `Max-heap — repeatedly pop the two heaviest stones, smash them, push remainder if any.

[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

\`\`\`js
// Simulate collisions — sorted array + pop two largest (interview-friendly)
// LC: https://leetcode.com/problems/last-stone-weight/
function lastStoneWeight(stones) {
  stones.sort((a,b)=>a-b); // Ascending — pop from end for max
  while (stones.length>1) {
    const b=stones.pop(), a=stones.pop(); // Two heaviest stones
    if (a!==b) {
      const diff = b-a; // Smaller smashed; remainder re-enters pile
      let i=0; while(i<stones.length && stones[i]<diff) i++; // Binary search position
      stones.splice(i,0,diff); // Keep array sorted for next max pops
    }
  }
  return stones[0]||0; // Zero or one stone left
}
\`\`\``,
    },
    {
      id: 692,
      lcSlug: "top-k-frequent-words",
      title: "Top K Frequent Words",
      diff: "Medium",
      body: `Count frequencies, max-heap by freq (tie-break lexicographically smaller word) — pop k times for top k words.

[Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)

\`\`\`js
// Count then custom sort — freq desc, lexicographic asc on ties
// LC: https://leetcode.com/problems/top-k-frequent-words/
function topKFrequent(words, k) {
  const cnt = new Map();
  for (const w of words) cnt.set(w, (cnt.get(w) || 0) + 1); // Frequency table
  const arr = [...cnt.entries()];
  arr.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]; // Higher frequency first
    return a[0] < b[0] ? -1 : 1; // Same freq — smaller word wins
  });
  return arr.slice(0, k).map((x) => x[0]); // Words only
}
\`\`\``,
    },
    {
      id: 378,
      lcSlug: "kth-smallest-element-in-a-sorted-matrix",
      title: "Kth Smallest Element in a Sorted Matrix",
      diff: "Medium",
      body: `Seed heap with first element of each row — pop minimum K times, push that row’s next element each pop.

[Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)

\`\`\`js
// K-way merge on row heads — same idea as merge k sorted lists
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
function kthSmallest(matrix, k) {
  const n = matrix.length;
  const h = [];
  const less = (a, b) => a[0] < b[0]; // Compare by value in tuple
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(h[i], h[p])) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p; // Sift up
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && less(h[l], h[m])) m = l;
      if (r < h.length && less(h[r], h[m])) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m; // Sift down
    }
    return top;
  };
  for (let r = 0; r < n; r++) push([matrix[r][0], r, 0]); // Seed each row's first column
  let ans = 0;
  for (let i = 0; i < k; i++) {
    const [v, r, c] = pop(); // Global minimum among row fronts
    ans = v;
    if (c + 1 < n) push([matrix[r][c + 1], r, c + 1]); // Advance that row in heap
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 373,
      lcSlug: "find-k-pairs-with-smallest-sums",
      title: "Find K Pairs with Smallest Sums",
      diff: "Medium",
      body: `Start heap with pairs from the first row — each pop appends the next pair in that row; K pops yield K smallest sums.

[Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/)

\`\`\`js
// Expand (i,j) by increasing j only — each row of pairs is sorted by sum
// LC: https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
function kSmallestPairs(nums1, nums2, k) {
  const h = [];
  const less = (a, b) => a[0] < b[0]; // Min-heap on pair sum
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(h[i], h[p])) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && less(h[l], h[m])) m = l;
      if (r < h.length && less(h[r], h[m])) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  const out = [];
  const m = Math.min(nums1.length, k); // At most k distinct starting rows matter
  for (let i = 0; i < m; i++) push([nums1[i] + nums2[0], i, 0]); // Best pair per nums1[i]
  while (out.length < k && h.length) {
    const [s, i, j] = pop();
    out.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]); // Next in same row
  }
  return out;
}
\`\`\``,
    },
    {
      id: 632,
      lcSlug: "smallest-range-covering-elements-from-k-lists",
      title: "Smallest Range Covering Elements from K Lists",
      diff: "Hard",
      body: `Min-heap of list heads — track min/max of current window, shrink range; stop when a list is exhausted.

[Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/)

\`\`\`js
// Sliding window on k sorted lists via min-heap on current heads
// LC: https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/
function smallestRange(nums) {
  const h = [];
  const less = (a, b) => a[0] < b[0];
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(h[i], h[p])) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && less(h[l], h[m])) m = l;
      if (r < h.length && less(h[r], h[m])) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  let mx = -Infinity; // Max among current k head values
  for (let i = 0; i < nums.length; i++) {
    push([nums[i][0], i, 0]); // Tuple: value, list id, index
    if (nums[i][0] > mx) mx = nums[i][0];
  }
  let best = [0, Infinity];
  while (true) {
    const [mn, i, j] = pop(); // Shrink range from the minimum side
    if (mx - mn < best[1] - best[0]) best = [mn, mx]; // Tighter valid range
    if (j + 1 >= nums[i].length) break; // Cannot cover all lists if this one ends
    push([nums[i][j + 1], i, j + 1]); // Advance smallest list
    if (nums[i][j + 1] > mx) mx = nums[i][j + 1]; // Update window max
  }
  return best;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Two Heaps / Scheduling",
      topics: [
    {
      id: 295,
      lcSlug: "find-median-from-data-stream",
      title: "Find Median from Data Stream",
      diff: "Hard",
      body: `Two heaps: max-heap for the smaller half, min-heap for the bigger half. Size differs by at most 1. Median is the middle top, or the average of both tops.

[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

\`\`\`js
// Two heaps partition numbers — lo holds lower half, hi holds upper half
// LC: https://leetcode.com/problems/find-median-from-data-stream/
function MedianFinder() {
  this.lo = []; // Max-heap of smaller half (store negated values)
  this.hi = []; // Min-heap of larger half
}
MedianFinder.prototype.addNum = function (num) {
  heapPush(this.lo, -num); // Always push into lower half first
  heapPush(this.hi, -heapPop(this.lo)); // Balance: move max of lo to hi
  if (this.hi.length > this.lo.length) heapPush(this.lo, -heapPop(this.hi)); // lo must be >= hi size
};
MedianFinder.prototype.findMedian = function () {
  if (this.lo.length > this.hi.length) return -this.lo[0]; // Odd count — extra in lo
  return (-this.lo[0] + this.hi[0]) / 2; // Even count — average of both tops
};

// Shared min-heap helpers (default comparator)
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!less(h[i], h[p])) break;
    [h[i], h[p]] = [h[p], h[i]];
    i = p;
  }
}
function heapPop(h, less = (a, b) => a < b) {
  const top = h[0], last = h.pop();
  if (!h.length) return top;
  h[0] = last;
  let i = 0;
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1;
    if (l < h.length && less(h[l], h[m])) m = l;
    if (r < h.length && less(h[r], h[m])) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
  return top;
}
\`\`\``,
    },
    {
      id: 502,
      lcSlug: "ipo",
      title: "IPO",
      diff: "Hard",
      body: `Greedy with max-heap — push affordable projects by profit, pick max profit, repeat k times (capital grows).

[IPO](https://leetcode.com/problems/ipo/)

\`\`\`js
// Greedy rounds: unlock affordable projects, pick max profit each round
// LC: https://leetcode.com/problems/ipo/
function findMaximizedCapital(k, w, profits, capital) {
  const jobs = profits.map((p, i) => [capital[i], p]).sort((a, b) => a[0] - b[0]); // By capital requirement
  const h = []; // Max-heap of profits currently affordable
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i] <= h[p]) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && h[l] > h[m]) m = l;
      if (r < h.length && h[r] > h[m]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  let j = 0; // Next job index in sorted list
  for (let i = 0; i < k; i++) {
    while (j < jobs.length && jobs[j][0] <= w) { push(jobs[j][1]); j++; } // Add all affordable profits
    if (!h.length) break; // No project doable — stop
    w += pop(); // Take best profit this round
  }
  return w;
}
\`\`\``,
    },
    {
      id: 621,
      lcSlug: "task-scheduler",
      title: "Task Scheduler",
      diff: "Medium",
      body: `Count the most frequent task. I need \`(maxFreq - 1) * (n + 1) + howManyHaveMaxFreq\` slots, or just tasks.length if that is bigger (the idle formula can undercount when the array is packed).

[Task Scheduler](https://leetcode.com/problems/task-scheduler/)

\`\`\`js
// Frame idle slots around the most frequent task — or tasks fill naturally
// LC: https://leetcode.com/problems/task-scheduler/
function leastInterval(tasks, n) {
  const freq = Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++; // Count each letter
  freq.sort((a, b) => b - a); // Descending frequencies
  const max = freq[0]; // Highest task count
  let extra = 0;
  for (const f of freq) if (f === max) extra++; // How many tasks tie for max freq
  return Math.max(tasks.length, (max - 1) * (n + 1) + extra); // Idle formula vs packed schedule
}
\`\`\``,
    },
    {
      id: 767,
      lcSlug: "reorganize-string",
      title: "Reorganize String",
      diff: "Medium",
      body: `Max-heap by frequency — pop and append; if same as previous char, defer to stack then flush.

[Reorganize String](https://leetcode.com/problems/reorganize-string/)

\`\`\`js
// Greedy: always place most frequent char if it differs from previous
// LC: https://leetcode.com/problems/reorganize-string/
function reorganizeString(s) {
  const cnt = new Map();
  for (const ch of s) cnt.set(ch, (cnt.get(ch) || 0) + 1); // Char frequencies
  const h = [...cnt.entries()];
  const top = () => {
    let m = 0;
    for (let i = 1; i < h.length; i++) if (h[i][1] > h[m][1]) m = i; // Max count entry
    return h.splice(m, 1)[0];
  };
  let out = "", prev = ""; // prev = last char placed
  while (h.length) {
    const [ch, c] = top(); // Most frequent remaining
    if (ch === prev) return ""; // Would create adjacent duplicate — impossible
    out += ch; prev = ch;
    if (c - 1 > 0) h.push([ch, c - 1]); // Re-queue with decremented count
  }
  return out;
}
\`\`\``,
    },
    {
      id: 1834,
      lcSlug: "single-threaded-cpu",
      title: "Single-Threaded CPU",
      diff: "Medium",
      body: `Min-heap of available tasks by duration — run shortest job when CPU free; advance time to next arrival if idle.

[Single-Threaded CPU](https://leetcode.com/problems/single-threaded-cpu/)

\`\`\`js
// Event simulation: available tasks in min-heap by (duration, index)
// LC: https://leetcode.com/problems/single-threaded-cpu/
function getOrder(tasks) {
  const jobs = tasks.map((t, i) => [t[0], t[1], i]).sort((a, b) => a[0] - b[0]); // Sort by enqueue time
  const h = [];
  const less = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]); // Shorter task, then smaller index
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(h[i], h[p])) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && less(h[l], h[m])) m = l;
      if (r < h.length && less(h[r], h[m])) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  const out = [];
  let t = 0, j = 0; // Current time and next job to release
  while (out.length < tasks.length) {
    if (!h.length && t < jobs[j][0]) t = jobs[j][0]; // CPU idle — jump to next arrival
    while (j < jobs.length && jobs[j][0] <= t) { push([jobs[j][1], jobs[j][2]]); j++; } // Release ready tasks
    const [dur, idx] = pop(); // Run shortest available
    t += dur; // Advance clock
    out.push(idx);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 253,
      lcSlug: "meeting-rooms-ii",
      title: "Meeting Rooms II",
      diff: "Medium",
    premium: true,
      body: `Sort meeting starts and ends separately — sweep starts; if a start is before the earliest end, increment concurrent rooms.

[Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)

*Premium — requires LeetCode Premium.*

\`\`\`js
// Sweep line on starts vs ends — classic room allocation greedy
// LC: https://leetcode.com/problems/meeting-rooms-ii/ (Premium)
function minMeetingRooms(intervals) {
  const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
  const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
  let rooms = 0, best = 0, e = 0; // e indexes next ending meeting
  for (let s = 0; s < starts.length; s++) {
    if (starts[s] < ends[e]) { rooms++; best = Math.max(best, rooms); } // Overlap — need another room
    else e++; // Previous meeting freed a room before this start
  }
  return best; // Peak concurrent meetings
}
\`\`\``,
    },
    {
      id: 355,
      lcSlug: "design-twitter",
      title: "Design Twitter",
      diff: "Medium",
      body: `Merge k sorted tweet lists per user — keep a heap of heads, pop 10 newest for the news feed.

[Design Twitter](https://leetcode.com/problems/design-twitter/)

\`\`\`js
// Simple design — merge followees' tweets and sort by time for feed
// LC: https://leetcode.com/problems/design-twitter/
function Twitter() {
  this.tweets = new Map(); // userId -> list of [time, tweetId]
  this.follows = new Map(); // followerId -> Set of followeeIds
  this.time = 0; // Global monotonic timestamp
}
Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.tweets.has(userId)) this.tweets.set(userId, []);
  this.tweets.get(userId).push([this.time++, tweetId]); // Newest tweets have larger time
  if (!this.follows.has(userId)) this.follows.set(userId, new Set([userId])); // User follows self by default
};
Twitter.prototype.getNewsFeed = function (userId) {
  const users = this.follows.get(userId) || new Set([userId]);
  const all = [];
  for (const u of users) {
    const tw = this.tweets.get(u) || [];
    for (const t of tw) all.push(t); // Collect all visible tweets
  }
  all.sort((a, b) => b[0] - a[0]); // Most recent first
  return all.slice(0, 10).map((t) => t[1]); // Top 10 tweet ids
};
Twitter.prototype.follow = function (followerId, followeeId) {
  if (!this.follows.has(followerId)) this.follows.set(followerId, new Set([followerId]));
  this.follows.get(followerId).add(followeeId);
};
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (followerId === followeeId) return; // Cannot unfollow yourself
  if (this.follows.has(followerId)) this.follows.get(followerId).delete(followeeId);
};
\`\`\``,
    },
    {
      id: 857,
      lcSlug: "minimum-cost-to-hire-k-workers",
      title: "Minimum Cost to Hire K Workers",
      diff: "Hard",
      body: `Sort by wage/quality ratio — try each worker as captain; max-heap keeps total quality within budget for k workers.

[Minimum Cost to Hire K Workers](https://leetcode.com/problems/minimum-cost-to-hire-k-workers/)

\`\`\`js
// Captain sets wage/quality ratio — team cost = sum(quality) * captain ratio
// LC: https://leetcode.com/problems/minimum-cost-to-hire-k-workers/
function mincostToHireWorkers(quality, wage, k) {
  const workers = quality.map((q, i) => [wage[i] / q, q]).sort((a, b) => a[0] - b[0]); // Ascending ratio
  const h = []; // Max-heap of qualities in current team — cap size k
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i] <= h[p]) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && h[l] > h[m]) m = l;
      if (r < h.length && h[r] > h[m]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  let sumQ = 0, best = Infinity;
  for (const [ratio, q] of workers) {
    push(q); sumQ += q; // Add worker to candidate team
    if (h.length > k) sumQ -= pop(); // Drop largest quality to keep k workers
    if (h.length === k) {
      const cost = sumQ * ratio; // Captain is current worker (highest ratio in team)
      if (cost < best) best = cost;
    }
  }
  return best;
}
\`\`\``,
    },
      ],
    },
  ],
};
