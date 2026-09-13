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
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — keep k largest
// LC: https://leetcode.com/problems/kth-largest-element-in-an-array/
function findKthLargest(nums, k) {
  const h = [];
  for (const x of nums) {
    heapPush(h, x); // Hinglish: heap me daalo
    if (h.length > k) heapPop(h); // Hinglish: sabse chhota nikala
  }
  return h[0];
}
\`\`\``,
    },
    {
      id: 973,
      lcSlug: "k-closest-points-to-origin",
      title: "K Closest Points to Origin",
      diff: "Medium",
      body: `Distance se min-heap. Top K nikal lo.

[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

\`\`\`js
// Hinglish: heap push/pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/k-closest-points-to-origin/
function kClosest(points, k) {
  // Hinglish: distance = x*x + y*y
  points.sort((a,b)=> (a[0]*a[0]+a[1]*a[1]) - (b[0]*b[0]+b[1]*b[1])); // Hinglish: sort karke top K (quick)
  return points.slice(0,k);
  // Heap se bhi: heapPush distance, size>k to pop
}
\`\`\``,
    },
    {
      id: 703,
      lcSlug: "kth-largest-element-in-a-stream",
      title: "Kth Largest Element in a Stream",
      diff: "Easy",
      body: `Min-heap size k ka rakho — top hi kth largest hai. Naya aaye to daalo, zyada ho to nikalo.

[Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

\`\`\`js
// Hinglish: k size heap — ek-ek step comment dekho
// LC: https://leetcode.com/problems/kth-largest-element-in-a-stream/
function KthLargest(k, nums) {
  // Hinglish: step 1 — heap banao
  this.k = k;
  this.h = [];
  for (const x of nums) this.add(x);
}
KthLargest.prototype._up = function (i) {
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (this.h[i] >= this.h[p]) break;
    const t = this.h[i]; this.h[i] = this.h[p]; this.h[p] = t; i = p;
  }
};
KthLargest.prototype._down = function (i) {
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1;
    if (l < this.h.length && this.h[l] < this.h[m]) m = l;
    if (r < this.h.length && this.h[r] < this.h[m]) m = r;
    if (m === i) break;
    const t = this.h[i]; this.h[i] = this.h[m]; this.h[m] = t; i = m;
  }
};
KthLargest.prototype.add = function (val) {
  this.h.push(val); this._up(this.h.length - 1); // Hinglish: daalo
  if (this.h.length > this.k) {
    this.h[0] = this.h.pop(); this._down(0); // Hinglish: chhota nikalo
  }
  return this.h[0]; // Hinglish: top hi jawab
};
\`\`\``,
    },
    {
      id: 1046,
      lcSlug: "last-stone-weight",
      title: "Last Stone Weight",
      diff: "Easy",
      body: `Har baar 2 sabse heavy lo, takrao, bacha to wapas daalo. Max-heap.

[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

\`\`\`js
// Hinglish: heap push/pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/last-stone-weight/
function lastStoneWeight(stones) {
  // Hinglish: max-heap banane ke liye sort + pop (ok for interview)
  stones.sort((a,b)=>a-b);
  while (stones.length>1) {
    const b=stones.pop(), a=stones.pop(); // Hinglish: 2 bade
    if (a!==b) {
      const diff = b-a;
      // Hinglish: insert sorted
      let i=0; while(i<stones.length && stones[i]<diff) i++;
      stones.splice(i,0,diff);
    }
  }
  return stones[0]||0;
}
\`\`\``,
    },
    {
      id: 692,
      lcSlug: "top-k-frequent-words",
      title: "Top K Frequent Words",
      diff: "Medium",
      body: `Freq gino, heap me rakho — freq zyada ho to upar, barabar ho to chhota word pehle.

[Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)

\`\`\`js
// Hinglish: freq + word order — ek-ek step comment dekho
// LC: https://leetcode.com/problems/top-k-frequent-words/
function topKFrequent(words, k) {
  // Hinglish: step 1 — gino
  const cnt = new Map();
  for (const w of words) cnt.set(w, (cnt.get(w) || 0) + 1);
  const arr = [...cnt.entries()];
  arr.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]; // Hinglish: freq zyada pehle
    return a[0] < b[0] ? -1 : 1; // Hinglish: barabar to chhota word
  });
  return arr.slice(0, k).map((x) => x[0]);
}
\`\`\``,
    },
    {
      id: 378,
      lcSlug: "kth-smallest-element-in-a-sorted-matrix",
      title: "Kth Smallest Element in a Sorted Matrix",
      diff: "Medium",
      body: `Har row ka pehla heap me daalo — sabse chhota nikalo, usi row ka agla daalo. K baar karo.

[Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)

\`\`\`js
// Hinglish: row heads ka heap — ek-ek step comment dekho
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
function kthSmallest(matrix, k) {
  // Hinglish: step 1 — har row ka pehla daalo
  const n = matrix.length;
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
  for (let r = 0; r < n; r++) push([matrix[r][0], r, 0]); // Hinglish: [value, row, col]
  let ans = 0;
  for (let i = 0; i < k; i++) {
    const [v, r, c] = pop(); // Hinglish: sabse chhota nikalo
    ans = v;
    if (c + 1 < n) push([matrix[r][c + 1], r, c + 1]); // Hinglish: agli daalo
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
      body: `Pehli row ke pairs heap me daalo — nikalo, agla jodo. K baar me k smallest mil jayenge.

[Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/)

\`\`\`js
// Hinglish: row-wise nikalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
function kSmallestPairs(nums1, nums2, k) {
  // Hinglish: step 1 — pehli row daalo
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
  const out = [];
  const m = Math.min(nums1.length, k);
  for (let i = 0; i < m; i++) push([nums1[i] + nums2[0], i, 0]); // Hinglish: [sum, i, j]
  while (out.length < k && h.length) {
    const [s, i, j] = pop();
    out.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]); // Hinglish: agli jodo
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
      body: `Har list ka head heap me rakho — min nikalo, max track karo, range chhoti karo. Koi list khatm to ruko.

[Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/)

\`\`\`js
// Hinglish: heads ka heap — ek-ek step comment dekho
// LC: https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/
function smallestRange(nums) {
  // Hinglish: step 1 — har list ka pehla daalo
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
  let mx = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    push([nums[i][0], i, 0]); // Hinglish: [value, list, index]
    if (nums[i][0] > mx) mx = nums[i][0];
  }
  let best = [0, Infinity];
  while (true) {
    const [mn, i, j] = pop(); // Hinglish: sabse chhota nikalo
    if (mx - mn < best[1] - best[0]) best = [mn, mx]; // Hinglish: range chhoti mili
    if (j + 1 >= nums[i].length) break; // Hinglish: list khatm to ruko
    push([nums[i][j + 1], i, j + 1]);
    if (nums[i][j + 1] > mx) mx = nums[i][j + 1];
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
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — two heaps
// LC: https://leetcode.com/problems/find-median-from-data-stream/
function MedianFinder() {
  this.lo = []; // max-heap of smaller half (store negated)
  this.hi = []; // min-heap of larger half
}
MedianFinder.prototype.addNum = function (num) {
  heapPush(this.lo, -num); // Hinglish: heap me daalo
  heapPush(this.hi, -heapPop(this.lo)); // Hinglish: sabse chhota nikala
  if (this.hi.length > this.lo.length) heapPush(this.lo, -heapPop(this.hi)); // Hinglish: sabse chhota nikala
};
MedianFinder.prototype.findMedian = function () {
  if (this.lo.length > this.hi.length) return -this.lo[0];
  return (-this.lo[0] + this.hi[0]) / 2;
};

// Heap helpers — har solution ke saath (min-heap default)
// Hinglish: push karke upar bubble, pop karke neeche bubble
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
      body: `Capital se shuru karo — afford wale max-heap me daalo, sabse bada profit lo. K baar doharao.

[IPO](https://leetcode.com/problems/ipo/)

\`\`\`js
// Hinglish: afford karo profit lo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/ipo/
function findMaximizedCapital(k, w, profits, capital) {
  // Hinglish: step 1 — capital se sort karo
  const jobs = profits.map((p, i) => [capital[i], p]).sort((a, b) => a[0] - b[0]);
  const h = []; // Hinglish: max-heap profits ka
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
  let j = 0;
  for (let i = 0; i < k; i++) {
    while (j < jobs.length && jobs[j][0] <= w) { push(jobs[j][1]); j++; } // Hinglish: afford wale daalo
    if (!h.length) break;
    w += pop(); // Hinglish: sabse bada profit lo
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
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — idle from the most frequent task
// LC: https://leetcode.com/problems/task-scheduler/
function leastInterval(tasks, n) {
  // Hinglish: step 1 — base case check karo
  const freq = Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const max = freq[0];
  let extra = 0;
  for (const f of freq) if (f === max) extra++;
  return Math.max(tasks.length, (max - 1) * (n + 1) + extra);
}
\`\`\``,
    },
    {
      id: 767,
      lcSlug: "reorganize-string",
      title: "Reorganize String",
      diff: "Medium",
      body: `Sabse frequent pehle rakho — max-heap se nikalo, pichhle se alag ho to jodo.

[Reorganize String](https://leetcode.com/problems/reorganize-string/)

\`\`\`js
// Hinglish: frequent pehle — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reorganize-string/
function reorganizeString(s) {
  // Hinglish: step 1 — gino
  const cnt = new Map();
  for (const ch of s) cnt.set(ch, (cnt.get(ch) || 0) + 1);
  const h = [...cnt.entries()];
  const top = () => {
    let m = 0;
    for (let i = 1; i < h.length; i++) if (h[i][1] > h[m][1]) m = i;
    return h.splice(m, 1)[0];
  };
  let out = "", prev = "";
  while (h.length) {
    const [ch, c] = top(); // Hinglish: sabse zyada wala
    if (ch === prev) return ""; // Hinglish: paas-paas aayenge to namumkin
    out += ch; prev = ch;
    if (c - 1 > 0) h.push([ch, c - 1]); // Hinglish: bacha to wapas
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
      body: `Time pe aaye tasks me sabse chhota duration uthao — min-heap (duration, index) se chalao, khaali ho to jump karo.

[Single-Threaded CPU](https://leetcode.com/problems/single-threaded-cpu/)

\`\`\`js
// Hinglish: chhota kaam pehle — ek-ek step comment dekho
// LC: https://leetcode.com/problems/single-threaded-cpu/
function getOrder(tasks) {
  // Hinglish: step 1 — index jod ke sort karo
  const jobs = tasks.map((t, i) => [t[0], t[1], i]).sort((a, b) => a[0] - b[0]);
  const h = [];
  const less = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
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
  let t = 0, j = 0;
  while (out.length < tasks.length) {
    if (!h.length && t < jobs[j][0]) t = jobs[j][0]; // Hinglish: khaali ho to jump karo
    while (j < jobs.length && jobs[j][0] <= t) { push([jobs[j][1], jobs[j][2]]); j++; } // Hinglish: aaye hue daalo
    const [dur, idx] = pop();
    t += dur; // Hinglish: chalao
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
    {
      id: 355,
      lcSlug: "design-twitter",
      title: "Design Twitter",
      diff: "Medium",
      body: `Har user ki tweets time-stamp se jodo — news feed me followees ki latest 10 nikalo (merge jaise).

[Design Twitter](https://leetcode.com/problems/design-twitter/)

\`\`\`js
// Hinglish: time stamp se jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-twitter/
function Twitter() {
  // Hinglish: step 1 — maps lo
  this.tweets = new Map();
  this.follows = new Map();
  this.time = 0;
}
Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.tweets.has(userId)) this.tweets.set(userId, []);
  this.tweets.get(userId).push([this.time++, tweetId]); // Hinglish: time ke saath rakho
  if (!this.follows.has(userId)) this.follows.set(userId, new Set([userId]));
};
Twitter.prototype.getNewsFeed = function (userId) {
  const users = this.follows.get(userId) || new Set([userId]);
  const all = [];
  for (const u of users) {
    const tw = this.tweets.get(u) || [];
    for (const t of tw) all.push(t);
  }
  all.sort((a, b) => b[0] - a[0]); // Hinglish: naya pehle
  return all.slice(0, 10).map((t) => t[1]);
};
Twitter.prototype.follow = function (followerId, followeeId) {
  if (!this.follows.has(followerId)) this.follows.set(followerId, new Set([followerId]));
  this.follows.get(followerId).add(followeeId); // Hinglish: jodo
};
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (followerId === followeeId) return;
  if (this.follows.has(followerId)) this.follows.get(followerId).delete(followeeId); // Hinglish: hatao
};
\`\`\``,
    },
    {
      id: 857,
      lcSlug: "minimum-cost-to-hire-k-workers",
      title: "Minimum Cost to Hire K Workers",
      diff: "Hard",
      body: `Ratio (wage/quality) se sort karo — har worker ko captain banao, max-heap se quality budget me rakho.

[Minimum Cost to Hire K Workers](https://leetcode.com/problems/minimum-cost-to-hire-k-workers/)

\`\`\`js
// Hinglish: ratio captain — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-cost-to-hire-k-workers/
function mincostToHireWorkers(quality, wage, k) {
  // Hinglish: step 1 — ratio se sort karo
  const workers = quality.map((q, i) => [wage[i] / q, q]).sort((a, b) => a[0] - b[0]);
  const h = []; // Hinglish: max-heap quality ka
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
    push(q); sumQ += q; // Hinglish: jodo
    if (h.length > k) sumQ -= pop(); // Hinglish: zyada ho to bada nikalo
    if (h.length === k) {
      const cost = sumQ * ratio; // Hinglish: captain ke ratio se daam
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
