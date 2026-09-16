import type { SolutionGroup } from "./types";

export const ADVANCED_INTERVIEW_EXTRAS_SOLUTIONS: SolutionGroup = {
  id: "advanced-interview-extras",
  title: "Advanced / Interview Extras",
  subs: [
    {
      title: "High-Value Hard Patterns",
      topics: [
    {
      id: 4,
      lcSlug: "median-of-two-sorted-arrays",
      title: "Median of Two Sorted Arrays",
      diff: "Hard",
      body: `I binary search the cut on the shorter array so left parts have the same count (or one extra). Left max <= right min on both arrays. Then median is from those four border numbers.

[Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

\`\`\`js
// Binary search — partition the shorter array
// LC: https://leetcode.com/problems/median-of-two-sorted-arrays/
function findMedianSortedArrays(a, b) {
  // Always binary search on the shorter array
  if (a.length > b.length) return findMedianSortedArrays(b, a);
  const m = a.length, n = b.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    // Left partition must hold (m+n+1)/2 elements total
    const j = ((m + n + 1) >> 1) - i;
    const aL = i ? a[i - 1] : -Infinity;
    const aR = i < m ? a[i] : Infinity;
    const bL = j ? b[j - 1] : -Infinity;
    const bR = j < n ? b[j] : Infinity;
    // Valid partition: every left elem <= every right elem
    if (aL <= bR && bL <= aR) {
      const left = Math.max(aL, bL);
      if ((m + n) % 2) return left;
      return (left + Math.min(aR, bR)) / 2;
    }
    if (aL > bR) hi = i - 1;
    else lo = i + 1;
  }
}
\`\`\``,
    },
    {
      id: 239,
      lcSlug: "sliding-window-maximum",
      title: "Sliding Window Maximum",
      diff: "Hard",
      body: `Deque of indexes, values decreasing. Front is always the max of the current window of size \`k\`. Drop indexes that left the window. Drop from the back anything smaller than the new number — they will never win.

[Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

\`\`\`js
// Sliding window — deque of useful max candidates
// LC: https://leetcode.com/problems/sliding-window-maximum/
function maxSlidingWindow(nums, k) {
  const q = []; // indexes, nums decreasing
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    // Drop back indices that can never be max again
    while (q.length && nums[q.at(-1)] <= nums[i]) q.pop();
    q.push(i);
    // Front index fell out of the window
    if (q[0] <= i - k) q.shift();
    // First full window starts at i === k - 1
    if (i >= k - 1) out.push(nums[q[0]]);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 493,
      lcSlug: "reverse-pairs",
      title: "Reverse Pairs",
      diff: "Hard",
      body: `Count pairs with \`i < j\` and \`nums[i] > 2 * nums[j]\` using merge sort inversion-style counting.

[Reverse Pairs](https://leetcode.com/problems/reverse-pairs/)

\`\`\`js
// LC: https://leetcode.com/problems/reverse-pairs/
function reversePairs(nums){
  let ans=0;
  const mergeSort=(l,r)=>{
    if(r-l<=1) return;
    const m=(l+r)>>1;
    mergeSort(l,m);
    mergeSort(m,r);
    // Count pairs with left index in [l,m) and right in [m,r)
    let j=m;
    for(let i=l;i<m;i++){
      while(j<r && nums[i] > 2*nums[j]) j++;
      ans += j-m;
    }
    // Standard merge keeps order for next levels
    const tmp=[]; let i=l, k=m;
    while(i<m && k<r) tmp.push(nums[i]<=nums[k]? nums[i++]: nums[k++]);
    while(i<m) tmp.push(nums[i++]); while(k<r) tmp.push(nums[k++]);
    for(let i=l;i<r;i++) nums[i]=tmp[i-l];
  };
  mergeSort(0, nums.length);
  return ans;
}
\`\`\``,
    },
    {
      id: 668,
      lcSlug: "kth-smallest-number-in-multiplication-table",
      title: "Kth Smallest Number in Multiplication Table",
      diff: "Hard",
      body: `Binary search \`mid\`: count values \`< mid\` in each row with \`min(mid/i, n)\` and sum.

[Kth Smallest Number in Multiplication Table](https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/)

\`\`\`js
// LC: https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/
function findKthNumber(m, n, k) {
  let lo = 1, hi = m * n;
  const count = (mid) => {
    let c = 0;
    for (let i = 1; i <= m; i++) c += Math.min(Math.floor(mid / i), n);
    return c;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (count(mid) >= k) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 871,
      lcSlug: "minimum-number-of-refueling-stops",
      title: "Minimum Number of Refueling Stops",
      diff: "Hard",
      body: `Max-heap of fuel at stations passed; when stuck, use the largest tankful (minimum refuels).

[Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/)

\`\`\`js
// LC: https://leetcode.com/problems/minimum-number-of-refueling-stops/
function minRefuelStops(target, startFuel, stations) {
  const h = [];
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
  let fuel = startFuel, stops = 0, i = 0;
  stations.sort((a, b) => a[0] - b[0]);
  while (fuel < target) {
    while (i < stations.length && stations[i][0] <= fuel) { push(stations[i][1]); i++; }
    if (!h.length) return -1;
    fuel += pop();
    stops++;
  }
  return stops;
}
\`\`\``,
    },
    {
      id: 895,
      lcSlug: "maximum-frequency-stack",
      title: "Maximum Frequency Stack",
      diff: "Hard",
      body: `Bucket by frequency stacks; pop highest freq, decrement \`maxFreq\` when that bucket empties.

[Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack/)

\`\`\`js
// LC: https://leetcode.com/problems/maximum-frequency-stack/
function FreqStack() {
  this.cnt = new Map();
  this.groups = new Map();
  this.maxF = 0;
}
FreqStack.prototype.push = function (val) {
  const f = (this.cnt.get(val) || 0) + 1;
  this.cnt.set(val, f);
  if (!this.groups.has(f)) this.groups.set(f, []);
  this.groups.get(f).push(val);
  if (f > this.maxF) this.maxF = f;
};
FreqStack.prototype.pop = function () {
  const st = this.groups.get(this.maxF);
  const val = st.pop();
  this.cnt.set(val, this.cnt.get(val) - 1);
  if (!st.length) this.maxF--;
  return val;
};
\`\`\``,
    },
    {
      id: 968,
      lcSlug: "binary-tree-cameras",
      title: "Binary Tree Cameras",
      diff: "Hard",
      body: `Postorder greedy: place cameras on parents when children need coverage; track covered / camera / need.

[Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/)

\`\`\`js
// LC: https://leetcode.com/problems/binary-tree-cameras/
function minCameraCover(root) {
  let ans = 0;
  // 0 = uncovered, 1 = covered by child, 2 = has camera
  const dfs = (node) => {
    if (!node) return 1;
    const l = dfs(node.left), r = dfs(node.right);
    if (l === 0 || r === 0) { ans++; return 2; }
    if (l === 2 || r === 2) return 1;
    return 0;
  };
  if (dfs(root) === 0) ans++;
  return ans;
}
\`\`\``,
    },
    {
      id: 1000,
      lcSlug: "minimum-cost-to-merge-stones",
      title: "Minimum Cost to Merge Stones",
      diff: "Hard",
      body: `Interval DP on multiples of \`k-1\`; unreachable states stay Infinity; return -1 if \`k\` piles impossible.

[Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/)

\`\`\`js
// LC: https://leetcode.com/problems/minimum-cost-to-merge-stones/
function mergeStones(stones, k) {
  const n = stones.length;
  if ((n - 1) % (k - 1) !== 0) return -1;
  const pre = [0];
  for (const x of stones) pre.push(pre[pre.length - 1] + x);
  const sum = (l, r) => pre[r + 1] - pre[l];
  const memo = new Map();
  const dfs = (l, r, piles) => {
    const key = l + "," + r + "," + piles;
    if (memo.has(key)) return memo.get(key);
    if (l === r) return piles === 1 ? 0 : Infinity;
    if (piles === 1) {
      let best = Infinity;
      for (let m = l; m < r; m += k - 1) {
        const cand = dfs(l, m, 1) + dfs(m + 1, r, k - 1);
        if (cand < best) best = cand;
      }
      const res = best + sum(l, r);
      memo.set(key, res);
      return res;
    }
    let best = Infinity;
    for (let m = l; m < r; m += k - 1) {
      const cand = dfs(l, m, 1) + dfs(m + 1, r, piles - 1);
      if (cand < best) best = cand;
    }
    memo.set(key, best);
    return best;
  };
  return dfs(0, n - 1, 1);
}
\`\`\``,
    },
    {
      id: 1235,
      lcSlug: "maximum-profit-in-job-scheduling",
      title: "Maximum Profit in Job Scheduling",
      diff: "Hard",
      body: `Sort jobs by end time; for each job, binary search last compatible job and take max DP.

[Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling/)

\`\`\`js
// LC: https://leetcode.com/problems/maximum-profit-in-job-scheduling/
function jobScheduling(startTime, endTime, profit) {
  const jobs = startTime.map((s, i) => [endTime[i], s, profit[i]]).sort((a, b) => a[0] - b[0]);
  const n = jobs.length;
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    const [e, s, p] = jobs[i - 1];
    let lo = 0, hi = i - 1;
    while (lo < hi) {
      const mid = ((lo + hi + 1) >> 1);
      if (jobs[mid - 1][0] <= s) lo = mid;
      else hi = mid - 1;
    }
    const take = p + (lo > 0 ? dp[lo] : 0);
    dp[i] = Math.max(dp[i - 1], take);
  }
  return dp[n];
}
\`\`\``,
    },
    {
      id: 1246,
      lcSlug: "palindrome-removal",
      title: "Palindrome Removal",
      diff: "Hard",
      body: `Interval DP: merge when endpoints match by removing middle; fill by increasing gap length.

[Palindrome Removal](https://leetcode.com/problems/palindrome-removal/)

\`\`\`js
// LC: https://leetcode.com/problems/palindrome-removal/
function palindromeRemoval(arr) {
  const n = arr.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = 1;
  for (let len = 2; len <= n; len++) {
    for (let l = 0; l + len - 1 < n; l++) {
      const r = l + len - 1;
      dp[l][r] = 1 + dp[l + 1][r];
      for (let k = l + 1; k <= r; k++) {
        if (arr[l] === arr[k]) {
          const mid = k === l + 1 ? 0 : dp[l + 1][k - 1];
          const cand = mid + dp[k][r];
          if (cand < dp[l][r]) dp[l][r] = cand;
        }
      }
    }
  }
  return dp[0][n - 1];
}
\`\`\``,
    },
    {
      id: 1340,
      lcSlug: "jump-game-v",
      title: "Jump Game V",
      diff: "Hard",
      body: `From each index jump up to \`d\` both ways; memoize best score on strictly smaller neighbors.

[Jump Game V](https://leetcode.com/problems/jump-game-v/)

\`\`\`js
// LC: https://leetcode.com/problems/jump-game-v/
function maxJumps(arr, d) {
  const n = arr.length, memo = Array(n).fill(0);
  const dfs = (i) => {
    if (memo[i]) return memo[i];
    let best = 1;
    for (let step = 1; step <= d; step++) {
      const j = i + step;
      if (j >= n || arr[j] >= arr[i]) break;
      const cand = 1 + dfs(j);
      if (cand > best) best = cand;
    }
    for (let step = 1; step <= d; step++) {
      const j = i - step;
      if (j < 0 || arr[j] >= arr[i]) break;
      const cand = 1 + dfs(j);
      if (cand > best) best = cand;
    }
    memo[i] = best;
    return best;
  };
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const v = dfs(i);
    if (v > ans) ans = v;
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 1383,
      lcSlug: "maximum-performance-of-a-team",
      title: "Maximum Performance of a Team",
      diff: "Hard",
      body: `Sort by efficiency ratio; each engineer as captain keeps a min-heap of size \`k\` for speeds.

[Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/)

\`\`\`js
// LC: https://leetcode.com/problems/maximum-performance-of-a-team/
function maxPerformance(n, speed, efficiency, k) {
  const order = speed.map((s, i) => [efficiency[i], s]).sort((a, b) => b[0] - a[0]);
  const h = [];
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i] >= h[p]) break;
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
      if (l < h.length && h[l] < h[m]) m = l;
      if (r < h.length && h[r] < h[m]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  const MOD = 1000000007;
  let sum = 0, best = 0;
  for (const [e, s] of order) {
    push(s); sum += s;
    if (h.length > k) sum -= pop();
    const perf = sum * e;
    if (perf > best) best = perf;
  }
  return best % MOD;
}
\`\`\``,
    },
    {
      id: 1547,
      lcSlug: "minimum-cost-to-cut-a-stick",
      title: "Minimum Cost to Cut a Stick",
      diff: "Hard",
      body: `Sort cut positions; interval DP adds cut cost plus best split inside each interval.

[Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/)

\`\`\`js
// LC: https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
function minCost(n, cuts) {
  cuts.sort((a, b) => a - b);
  const a = [0, ...cuts, n];
  const m = a.length;
  const dp = Array.from({ length: m }, () => Array(m).fill(0));
  for (let len = 2; len < m; len++) {
    for (let l = 0; l + len < m; l++) {
      const r = l + len;
      let best = Infinity;
      for (let k = l + 1; k < r; k++) {
        const cand = dp[l][k] + dp[k][r];
        if (cand < best) best = cand;
      }
      dp[l][r] = best + a[r] - a[l];
    }
  }
  return dp[0][m - 1];
}
\`\`\``,
    },
    {
      id: 1851,
      lcSlug: "minimum-interval-to-include-each-query",
      title: "Minimum Interval to Include Each Query",
      diff: "Hard",
      body: `Sort queries; sweep intervals into a min-heap by right end and assign smallest valid interval per query.

[Minimum Interval to Include Each Query](https://leetcode.com/problems/minimum-interval-to-include-each-query/)

\`\`\`js
// LC: https://leetcode.com/problems/minimum-interval-to-include-each-query/
function minInterval(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  const qs = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
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
  const ans = Array(queries.length);
  let j = 0;
  for (const [q, qi] of qs) {
    while (j < intervals.length && intervals[j][0] <= q) {
      push([intervals[j][1], intervals[j][1] - intervals[j][0] + 1]);
      j++;
    }
    while (h.length && h[0][0] < q) pop();
    ans[qi] = h.length ? h[0][1] : -1;
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};
