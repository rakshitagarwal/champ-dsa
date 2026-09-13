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
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — partition the shorter array
// LC: https://leetcode.com/problems/median-of-two-sorted-arrays/
function findMedianSortedArrays(a, b) {
  // Hinglish: step 1 — base case check karo
  if (a.length > b.length) return findMedianSortedArrays(b, a);
  const m = a.length, n = b.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    const aL = i ? a[i - 1] : -Infinity;
    const aR = i < m ? a[i] : Infinity;
    const bL = j ? b[j - 1] : -Infinity;
    const bR = j < n ? b[j] : Infinity;
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
// Hinglish: window slide karo — ek-ek step comment dekho
// Sliding window — deque of useful max candidates
// LC: https://leetcode.com/problems/sliding-window-maximum/
function maxSlidingWindow(nums, k) {
  // Hinglish: step 1 — base case check karo
  const q = []; // indexes, nums decreasing
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q.at(-1)] <= nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift(); // left the window
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
      body: `\`i<j\` aur \`nums[i] > 2*nums[j]\` kitne pairs? Merge sort count.

[Reverse Pairs](https://leetcode.com/problems/reverse-pairs/)

\`\`\`js
// Hinglish: BIT / merge count — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-pairs/
function reversePairs(nums){
  // Hinglish: merge sort count
  let ans=0;
  const mergeSort=(l,r)=>{
    if(r-l<=1) return;
    const m=(l+r)>>1; mergeSort(l,m); mergeSort(m,r);
    // Hinglish: count pairs l..m-1 se m..r-1
    let j=m;
    for(let i=l;i<m;i++){ while(j<r && nums[i] > 2*nums[j]) j++; ans += j-m; } // Hinglish: kitne satisfy
    // Hinglish: normal merge
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
      body: `Answer pe binary search — mid se chhote kitne hain gino (har row me min(mid/i, n)).

[Kth Smallest Number in Multiplication Table](https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/)

\`\`\`js
// Hinglish: answer pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/
function findKthNumber(m, n, k) {
  // Hinglish: step 1 — range lo
  let lo = 1, hi = m * n;
  const count = (mid) => {
    let c = 0;
    for (let i = 1; i <= m; i++) c += Math.min(Math.floor(mid / i), n); // Hinglish: har row me gino
    return c;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (count(mid) >= k) hi = mid; // Hinglish: kaafi hain, chhota karo
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
      body: `Jahan tak pahuche wahan ka fuel max-heap me daalo — phasne pe sabse bada nikalo. Greedy kaam karta hai.

[Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/)

\`\`\`js
// Hinglish: bada fuel bachao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-number-of-refueling-stops/
function minRefuelStops(target, startFuel, stations) {
  // Hinglish: step 1 — max-heap lo
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
    while (i < stations.length && stations[i][0] <= fuel) { push(stations[i][1]); i++; } // Hinglish: pahuche wale daalo
    if (!h.length) return -1; // Hinglish: phas gaye
    fuel += pop(); // Hinglish: sabse bada lo
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
      body: `Freq groups me stack rakho — sabse zyada freq wala nikalo, maxFreq ghatana mat bhoolo.

[Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack/)

\`\`\`js
// Hinglish: freq stacks — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-frequency-stack/
function FreqStack() {
  // Hinglish: step 1 — maps lo
  this.cnt = new Map();
  this.groups = new Map();
  this.maxF = 0;
}
FreqStack.prototype.push = function (val) {
  const f = (this.cnt.get(val) || 0) + 1;
  this.cnt.set(val, f);
  if (!this.groups.has(f)) this.groups.set(f, []);
  this.groups.get(f).push(val); // Hinglish: freq wali stack me daalo
  if (f > this.maxF) this.maxF = f;
};
FreqStack.prototype.pop = function () {
  const st = this.groups.get(this.maxF);
  const val = st.pop(); // Hinglish: top nikalo
  this.cnt.set(val, this.cnt.get(val) - 1);
  if (!st.length) this.maxF--; // Hinglish: khaali to neeche jao
  return val;
};
\`\`\``,
    },
    {
      id: 968,
      lcSlug: "binary-tree-cameras",
      title: "Binary Tree Cameras",
      diff: "Hard",
      body: `Neeche se greedy — bachche uncovered hon to camera lagao. States: covered, camera, need.

[Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/)

\`\`\`js
// Hinglish: neeche se lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-cameras/
function minCameraCover(root) {
  // Hinglish: step 1 — count lo (0=need, 1=covered, 2=camera)
  let ans = 0;
  const dfs = (node) => {
    if (!node) return 1; // Hinglish: khaali covered hai
    const l = dfs(node.left), r = dfs(node.right);
    if (l === 0 || r === 0) { ans++; return 2; } // Hinglish: bachcha needy to camera lagao
    if (l === 2 || r === 2) return 1; // Hinglish: camera paas hai to covered
    return 0; // Hinglish: parent se ummeed rakho
  };
  if (dfs(root) === 0) ans++; // Hinglish: root needy to lagao
  return ans;
}
\`\`\``,
    },
    {
      id: 1000,
      lcSlug: "minimum-cost-to-merge-stones",
      title: "Minimum Cost to Merge Stones",
      diff: "Hard",
      body: `Interval DP — k-1 ke multiples pe jodo, baaki Infinity rakho. K piles na bane to -1.

[Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/)

\`\`\`js
// Hinglish: interval jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-cost-to-merge-stones/
function mergeStones(stones, k) {
  // Hinglish: step 1 — ban sakta hai ya nahi
  const n = stones.length;
  if ((n - 1) % (k - 1) !== 0) return -1;
  const pre = [0];
  for (const x of stones) pre.push(pre[pre.length - 1] + x); // Hinglish: prefix jod
  const sum = (l, r) => pre[r + 1] - pre[l];
  const memo = new Map();
  const dfs = (l, r, piles) => {
    const key = l + "," + r + "," + piles;
    if (memo.has(key)) return memo.get(key); // Hinglish: yaad hai
    if (l === r) return piles === 1 ? 0 : Infinity;
    if (piles === 1) {
      let best = Infinity;
      for (let m = l; m < r; m += k - 1) {
        const cand = dfs(l, m, 1) + dfs(m + 1, r, k - 1); // Hinglish: todo phir jodo
        if (cand < best) best = cand;
      }
      const res = best + sum(l, r);
      memo.set(key, res);
      return res;
    }
    let best = Infinity;
    for (let m = l; m < r; m += k - 1) {
      const cand = dfs(l, m, 1) + dfs(m + 1, r, piles - 1); // Hinglish: piles banao
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
      body: `End time se sort karo — har job ya lo (binary search se pichhla compatible dhoondo) ya chhodo.

[Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling/)

\`\`\`js
// Hinglish: sort + binary search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-profit-in-job-scheduling/
function jobScheduling(startTime, endTime, profit) {
  // Hinglish: step 1 — end se sort karo
  const jobs = startTime.map((s, i) => [endTime[i], s, profit[i]]).sort((a, b) => a[0] - b[0]);
  const n = jobs.length;
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    const [e, s, p] = jobs[i - 1];
    let lo = 0, hi = i - 1;
    while (lo < hi) {
      const mid = ((lo + hi + 1) >> 1);
      if (jobs[mid - 1][0] <= s) lo = mid; // Hinglish: clash nahi karta
      else hi = mid - 1;
    }
    const take = p + (lo > 0 ? dp[lo] : 0); // Hinglish: lo ya chhodo
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
      body: `Interval DP — same ends mile to beech hata ke jodo, nahi to todo. Gap order me bharo.

[Palindrome Removal](https://leetcode.com/problems/palindrome-removal/)

\`\`\`js
// Hinglish: gap order bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/palindrome-removal/
function palindromeRemoval(arr) {
  // Hinglish: step 1 — table banao
  const n = arr.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = 1;
  for (let len = 2; len <= n; len++) {
    for (let l = 0; l + len - 1 < n; l++) {
      const r = l + len - 1;
      dp[l][r] = 1 + dp[l + 1][r]; // Hinglish: pehla alag hatao
      for (let k = l + 1; k <= r; k++) {
        if (arr[l] === arr[k]) {
          const mid = k === l + 1 ? 0 : dp[l + 1][k - 1]; // Hinglish: beech wala
          const cand = mid + dp[k][r];
          if (cand < dp[l][r]) dp[l][r] = cand; // Hinglish: saath hatao
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
      body: `Har index se dono taraf d tak koodo — chhota mile to aage badho, memo rakho.

[Jump Game V](https://leetcode.com/problems/jump-game-v/)

\`\`\`js
// Hinglish: dono taraf koodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/jump-game-v/
function maxJumps(arr, d) {
  // Hinglish: step 1 — memo lo
  const n = arr.length, memo = Array(n).fill(0);
  const dfs = (i) => {
    if (memo[i]) return memo[i]; // Hinglish: yaad hai
    let best = 1;
    for (let step = 1; step <= d; step++) {
      const j = i + step;
      if (j >= n || arr[j] >= arr[i]) break; // Hinglish: rukavat aayi
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
      body: `Efficiency se sort karo — har engineer captain bane, speed ka min-heap k size rakho.

[Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/)

\`\`\`js
// Hinglish: captain chuno — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-performance-of-a-team/
function maxPerformance(n, speed, efficiency, k) {
  // Hinglish: step 1 — efficiency se sort karo
  const order = speed.map((s, i) => [efficiency[i], s]).sort((a, b) => b[0] - a[0]);
  const h = []; // Hinglish: min-heap speed ka
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
    push(s); sum += s; // Hinglish: team me lo
    if (h.length > k) sum -= pop(); // Hinglish: zyada ho to chhota nikalo
    const perf = sum * e; // Hinglish: captain ki efficiency
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
      body: `Cuts sort karke interval DP chalao — har interval me cut lagao, cost jodo.

[Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/)

\`\`\`js
// Hinglish: cut lagate jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
function minCost(n, cuts) {
  // Hinglish: step 1 — sort karke kinare jodo
  cuts.sort((a, b) => a - b);
  const a = [0, ...cuts, n];
  const m = a.length;
  const dp = Array.from({ length: m }, () => Array(m).fill(0));
  for (let len = 2; len < m; len++) {
    for (let l = 0; l + len < m; l++) {
      const r = l + len;
      let best = Infinity;
      for (let k = l + 1; k < r; k++) {
        const cand = dp[l][k] + dp[k][r]; // Hinglish: pehle todo phir jodo
        if (cand < best) best = cand;
      }
      dp[l][r] = best + a[r] - a[l]; // Hinglish: is cut ki keemat jodo
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
      body: `Queries sort karo, intervals left se min-heap (right end) me daalo — sabse chhota valid uthao.

[Minimum Interval to Include Each Query](https://leetcode.com/problems/minimum-interval-to-include-each-query/)

\`\`\`js
// Hinglish: sweep line chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-interval-to-include-each-query/
function minInterval(intervals, queries) {
  // Hinglish: step 1 — dono sort karo
  intervals.sort((a, b) => a[0] - b[0]);
  const qs = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
  const h = []; // Hinglish: min-heap [right, size] ka
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
      push([intervals[j][1], intervals[j][1] - intervals[j][0] + 1]); // Hinglish: shuru hue daalo
      j++;
    }
    while (h.length && h[0][0] < q) pop(); // Hinglish: khatm hue nikalo
    ans[qi] = h.length ? h[0][1] : -1; // Hinglish: sabse chhota uthao
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};
