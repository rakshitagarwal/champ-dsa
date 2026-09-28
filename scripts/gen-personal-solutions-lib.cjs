/**
 * Generates data/personal-solutions/*.ts from the personal DSA sheet.
 * Reuses AlgoJS bodies when available; pattern-specific overrides for repeats.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "personal-solutions");
const BODIES = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".algojs-bodies.json"), "utf8"),
);

fs.mkdirSync(OUT, { recursive: true });

function lcLink(title, slug) {
  return `[${title}](https://leetcode.com/problems/${slug}/)`;
}

function wrap(tip, title, slug, code, premiumNote = false) {
  const prem = premiumNote
    ? `\n\n*Premium question — kholne ke liye LeetCode premium chahiye.*`
    : "";
  return `${tip}

${lcLink(title, slug)}${prem}

\`\`\`js
${code.trim()}
\`\`\``;
}

/** Pattern-specific / new solutions keyed by `${topicId}::${slug}` or just slug */
const OVERRIDES = {};

function setO(topicOrSlug, slugOrCode, maybeCode) {
  if (maybeCode !== undefined) {
    OVERRIDES[`${topicOrSlug}::${slugOrCode}`] = maybeCode;
  } else {
    OVERRIDES[topicOrSlug] = slugOrCode;
  }
}

// ——— Pattern-specific repeats ———
setO(
  "dfs",
  "maximum-depth-of-binary-tree",
  wrap(
    "DFS recursion — depth = 1 + max(left, right). Empty = 0.",
    "Maximum Depth of Binary Tree",
    "maximum-depth-of-binary-tree",
    `// Time: O(n) · Space: O(h)
var maxDepth = function(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`,
  ),
);

setO(
  "bfs",
  "flood-fill",
  wrap(
    "BFS flood — queue se same-color neighbors paint.",
    "Flood Fill",
    "flood-fill",
    `// Time: O(m·n) · Space: O(m·n)
var floodFill = function(image, sr, sc, color) {
  const original = image[sr][sc];
  if (original === color) return image;
  const rows = image.length, cols = image[0].length;
  const q = [[sr, sc]];
  image[sr][sc] = color;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (image[nr][nc] !== original) continue;
      image[nr][nc] = color;
      q.push([nr, nc]);
    }
  }
  return image;
};`,
  ),
);

setO(
  "bfs",
  "number-of-islands",
  wrap(
    "Grid pe BFS — har land se queue se flood karo, islands count badhao.",
    "Number of Islands",
    "number-of-islands",
    `// Time: O(m·n) · Space: O(m·n)
var numIslands = function(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  const bfs = (sr, sc) => {
    const q = [[sr, sc]];
    grid[sr][sc] = "0";
    while (q.length) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        if (grid[nr][nc] !== "1") continue;
        grid[nr][nc] = "0";
        q.push([nr, nc]);
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
};`,
  ),
);

setO(
  "dfs",
  "number-of-islands",
  wrap(
    "Grid pe DFS — land milte hi 4 directions me recurse, visited mark karo.",
    "Number of Islands",
    "number-of-islands",
    `// Time: O(m·n) · Space: O(m·n) recursion
var numIslands = function(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
};`,
  ),
);

setO(
  "graphs",
  "number-of-islands",
  wrap(
    "Graph view: har cell node, 4-neighbors edges — connected components = islands (DFS).",
    "Number of Islands",
    "number-of-islands",
    `// Time: O(m·n) · Space: O(m·n)
var numIslands = function(grid) {
  const rows = grid.length, cols = grid[0].length;
  let islands = 0;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === "1") { islands++; dfs(r, c); }

  return islands;
};`,
  ),
);

setO(
  "hashing",
  "top-k-frequent-elements",
  wrap(
    "Frequency map banao, phir bucket sort / sort se top K nikaalo — heap ki zarurat nahi.",
    "Top K Frequent Elements",
    "top-k-frequent-elements",
    `// Time: O(n) · Space: O(n)  (bucket sort)
var topKFrequent = function(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, f] of freq) buckets[f].push(num);

  const res = [];
  for (let f = buckets.length - 1; f >= 0 && res.length < k; f--) {
    for (const num of buckets[f]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
};`,
  ),
);

setO(
  "heap",
  "top-k-frequent-elements",
  wrap(
    "Freq map + min-heap of size K — heap me (freq, num), size > k pe pop.",
    "Top K Frequent Elements",
    "top-k-frequent-elements",
    `// Time: O(n log k) · Space: O(n)
class MinHeap {
  constructor() { this.a = []; }
  size() { return this.a.length; }
  peek() { return this.a[0]; }
  push(x) {
    this.a.push(x);
    let i = this.a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.a[p][0] <= this.a[i][0]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }
  pop() {
    const top = this.a[0];
    const last = this.a.pop();
    if (!this.a.length) return top;
    this.a[0] = last;
    let i = 0;
    while (true) {
      let s = i, l = i * 2 + 1, r = l + 1;
      if (l < this.a.length && this.a[l][0] < this.a[s][0]) s = l;
      if (r < this.a.length && this.a[r][0] < this.a[s][0]) s = r;
      if (s === i) break;
      [this.a[s], this.a[i]] = [this.a[i], this.a[s]];
      i = s;
    }
    return top;
  }
}

var topKFrequent = function(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const heap = new MinHeap();
  for (const [num, f] of freq) {
    heap.push([f, num]);
    if (heap.size() > k) heap.pop();
  }

  return heap.a.map(([, num]) => num);
};`,
  ),
);

setO(
  "hashing",
  "subarray-sum-equals-k",
  wrap(
    "Prefix sum + hashmap: kitni baar (prefix - k) pehle aaya — utne subarrays.",
    "Subarray Sum Equals K",
    "subarray-sum-equals-k",
    `// Time: O(n) · Space: O(n)
var subarraySum = function(nums, k) {
  const map = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    count += map.get(sum - k) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
};`,
  ),
);

setO(
  "prefix-sum",
  "subarray-sum-equals-k",
  wrap(
    "Prefix sum pattern: running sum track karo, map me frequency — sum(l..r)=k ⇒ prefix[r]-prefix[l-1]=k.",
    "Subarray Sum Equals K",
    "subarray-sum-equals-k",
    `// Time: O(n) · Space: O(n)
var subarraySum = function(nums, k) {
  const seen = new Map([[0, 1]]);
  let prefix = 0, ans = 0;
  for (const x of nums) {
    prefix += x;
    if (seen.has(prefix - k)) ans += seen.get(prefix - k);
    seen.set(prefix, (seen.get(prefix) || 0) + 1);
  }
  return ans;
};`,
  ),
);

setO(
  "sliding-window",
  "longest-substring-without-repeating-characters",
  wrap(
    "Variable sliding window + set/map — duplicate aaye to left shrink.",
    "Longest Substring Without Repeating Characters",
    "longest-substring-without-repeating-characters",
    `// Time: O(n) · Space: O(min(n, charset))
var lengthOfLongestSubstring = function(s) {
  const seen = new Set();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
};`,
  ),
);

setO(
  "hashing",
  "longest-substring-without-repeating-characters",
  wrap(
    "Last-seen index map — hash se window start jump, O(n) longest unique substring.",
    "Longest Substring Without Repeating Characters",
    "longest-substring-without-repeating-characters",
    `// Time: O(n) · Space: O(charset)
var lengthOfLongestSubstring = function(s) {
  const last = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    if (last.has(s[i]) && last.get(s[i]) >= start) {
      start = last.get(s[i]) + 1;
    }
    last.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
};`,
  ),
);

setO(
  "dfs",
  "course-schedule",
  wrap(
    "DFS cycle detection on prereq graph — visiting state pe cycle = false.",
    "Course Schedule",
    "course-schedule",
    `// Time: O(V+E) · Space: O(V+E)
var canFinish = function(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) adj[b].push(a);

  // 0=unseen, 1=visiting, 2=done
  const state = new Array(numCourses).fill(0);

  const dfs = (u) => {
    if (state[u] === 1) return false;
    if (state[u] === 2) return true;
    state[u] = 1;
    for (const v of adj[u]) if (!dfs(v)) return false;
    state[u] = 2;
    return true;
  };

  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return false;
  return true;
};`,
  ),
);

setO(
  "divide-conquer",
  "kth-largest-element-in-an-array",
  wrap(
    "Quickselect (divide & conquer) — average O(n) kth largest.",
    "Kth Largest Element in an Array",
    "kth-largest-element-in-an-array",
    `// Time: O(n) avg · Space: O(1)
var findKthLargest = function(nums, k) {
  const target = nums.length - k;

  const partition = (lo, hi) => {
    const pivot = nums[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (nums[j] <= pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    [nums[i], nums[hi]] = [nums[hi], nums[i]];
    return i;
  };

  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const p = partition(lo, hi);
    if (p === target) return nums[p];
    if (p < target) lo = p + 1;
    else hi = p - 1;
  }
  return -1;
};`,
  ),
);

// ——— New solutions not in AlgoJS bank ———
const NEW = {
  "climbing-stairs": wrap(
    "Ways to reach i = ways(i-1) + ways(i-2) — fibonacci DP.",
    "Climbing Stairs",
    "climbing-stairs",
    `// Time: O(n) · Space: O(1)
var climbStairs = function(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};`,
  ),
  "sum-of-two-integers": wrap(
    "XOR = sum without carry, AND<<1 = carry — loop until carry 0.",
    "Sum of Two Integers",
    "sum-of-two-integers",
    `// Time: O(1) · Space: O(1)
var getSum = function(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
};`,
  ),
  "reverse-string": wrap(
    "Do pointers — left/right swap jab tak mil na jaayein.",
    "Reverse String",
    "reverse-string",
    `// Time: O(n) · Space: O(1)
var reverseString = function(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};`,
  ),
  "sort-colors": wrap(
    "Dutch national flag — three pointers low/mid/high for 0/1/2.",
    "Sort Colors",
    "sort-colors",
    `// Time: O(n) · Space: O(1)
var sortColors = function(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) {
      [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
      lo++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
      hi--;
    }
  }
};`,
  ),
  "maximum-average-subarray-i": wrap(
    "Fixed window size k — pehle window sum, phir slide karke max average.",
    "Maximum Average Subarray I",
    "maximum-average-subarray-i",
    `// Time: O(n) · Space: O(1)
var findMaxAverage = function(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
};`,
  ),
  "minimum-size-subarray-sum": wrap(
    "Variable window — sum >= target hone tak expand, phir shrink for min length.",
    "Minimum Size Subarray Sum",
    "minimum-size-subarray-sum",
    `// Time: O(n) · Space: O(1)
var minSubArrayLen = function(target, nums) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
};`,
  ),
  "permutation-in-string": wrap(
    "Fixed window + freq map — s1 ka count, s2 pe window slide, maps match = true.",
    "Permutation in String",
    "permutation-in-string",
    `// Time: O(n) · Space: O(1)
var checkInclusion = function(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  for (const ch of s1) need[ch.charCodeAt(0) - 97]++;
  for (let i = 0; i < s2.length; i++) {
    win[s2.charCodeAt(i) - 97]++;
    if (i >= s1.length) win[s2.charCodeAt(i - s1.length) - 97]--;
    if (i >= s1.length - 1 && need.every((v, j) => v === win[j])) return true;
  }
  return false;
};`,
  ),
  "sliding-window-maximum": wrap(
    "Monotonic decreasing deque — window ka max front pe, outdated indices pop.",
    "Sliding Window Maximum",
    "sliding-window-maximum",
    `// Time: O(n) · Space: O(k)
var maxSlidingWindow = function(nums, k) {
  const dq = []; // indices, values decreasing
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
};`,
  ),
  "rotting-oranges": wrap(
    "Multi-source BFS — saare rotten se start, minutes = levels.",
    "Rotting Oranges",
    "rotting-oranges",
    `// Time: O(m·n) · Space: O(m·n)
var orangesRotting = function(grid) {
  const rows = grid.length, cols = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  if (!fresh) return 0;
  let minutes = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const size = q.length;
    let infected = false;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        if (grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        infected = true;
        q.push([nr, nc]);
      }
    }
    if (infected) minutes++;
  }
  return fresh === 0 ? minutes : -1;
};`,
  ),
  "generate-parentheses": wrap(
    "Backtracking — open < n pe '(', close < open pe ')'.",
    "Generate Parentheses",
    "generate-parentheses",
    `// Time: O(4^n / √n) · Space: O(n)
var generateParenthesis = function(n) {
  const res = [];
  const dfs = (path, open, close) => {
    if (path.length === 2 * n) {
      res.push(path);
      return;
    }
    if (open < n) dfs(path + "(", open + 1, close);
    if (close < open) dfs(path + ")", open, close + 1);
  };
  dfs("", 0, 0);
  return res;
};`,
  ),
  "palindrome-partitioning": wrap(
    "Backtracking + palindrome check — har cut pe partition try.",
    "Palindrome Partitioning",
    "palindrome-partitioning",
    `// Time: O(n · 2^n) · Space: O(n)
var partition = function(s) {
  const res = [];
  const isPal = (l, r) => {
    while (l < r) if (s[l++] !== s[r--]) return false;
    return true;
  };
  const dfs = (start, path) => {
    if (start === s.length) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (!isPal(start, end)) continue;
      path.push(s.slice(start, end + 1));
      dfs(end + 1, path);
      path.pop();
    }
  };
  dfs(0, []);
  return res;
};`,
  ),
  "kth-largest-element-in-a-stream": wrap(
    "Min-heap size k — stream me add, peek = kth largest.",
    "Kth Largest Element in a Stream",
    "kth-largest-element-in-a-stream",
    `// Time: O(log k) add · Space: O(k)
var KthLargest = function(k, nums) {
  this.k = k;
  this.heap = [];
  for (const n of nums) this.add(n);
};

KthLargest.prototype.add = function(val) {
  this.heap.push(val);
  this.heap.sort((a, b) => a - b);
  if (this.heap.length > this.k) this.heap.shift();
  return this.heap[0];
};`,
  ),
  "kth-largest-element-in-an-array": wrap(
    "Sort ya heap — yahan sort se kth largest (heap version heap topic me).",
    "Kth Largest Element in an Array",
    "kth-largest-element-in-an-array",
    `// Time: O(n log n) · Space: O(1)
var findKthLargest = function(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
};`,
  ),
  "k-closest-points-to-origin": wrap(
    "Max-heap size k on distance — ya sort by dist squared.",
    "K Closest Points to Origin",
    "k-closest-points-to-origin",
    `// Time: O(n log n) · Space: O(n)
var kClosest = function(points, k) {
  return points
    .sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]))
    .slice(0, k);
};`,
  ),
  "first-bad-version": wrap(
    "Binary search on answer space — pehla bad version find.",
    "First Bad Version",
    "first-bad-version",
    `// Time: O(log n) · Space: O(1)
var solution = function(isBadVersion) {
  return function(n) {
    let lo = 1, hi = n;
    while (lo < hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (isBadVersion(mid)) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };
};`,
  ),
  "koko-eating-bananas": wrap(
    "Binary search on answer — speed k pe hours check, min k find.",
    "Koko Eating Bananas",
    "koko-eating-bananas",
    `// Time: O(n log m) · Space: O(1)
var minEatingSpeed = function(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (hours(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};`,
  ),
  "median-of-two-sorted-arrays": wrap(
    "Binary search on partition — left max <= right min dono arrays me.",
    "Median of Two Sorted Arrays",
    "median-of-two-sorted-arrays",
    `// Time: O(log(min(m,n))) · Space: O(1)
var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    const L1 = i === 0 ? -Infinity : nums1[i - 1];
    const R1 = i === m ? Infinity : nums1[i];
    const L2 = j === 0 ? -Infinity : nums2[j - 1];
    const R2 = j === n ? Infinity : nums2[j];
    if (L1 <= R2 && L2 <= R1) {
      if ((m + n) % 2 === 0) return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
      return Math.max(L1, L2);
    }
    if (L1 > R2) hi = i - 1;
    else lo = i + 1;
  }
  return 0;
};`,
  ),
  "min-cost-climbing-stairs": wrap(
    "1D DP — har step pe min(cost[i]+dp[i+1], cost[i]+dp[i+2]) style bottom-up.",
    "Min Cost Climbing Stairs",
    "min-cost-climbing-stairs",
    `// Time: O(n) · Space: O(1)
var minCostClimbingStairs = function(cost) {
  let a = 0, b = 0;
  for (let i = 2; i <= cost.length; i++) {
    const cur = Math.min(a + cost[i - 2], b + cost[i - 1]);
    a = b;
    b = cur;
  }
  return b;
};`,
  ),
  "partition-equal-subset-sum": wrap(
    "0/1 knapsack DP — total/2 subset exist karta hai kya?",
    "Partition Equal Subset Sum",
    "partition-equal-subset-sum",
    `// Time: O(n·sum) · Space: O(sum)
var canPartition = function(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let s = target; s >= num; s--) {
      dp[s] = dp[s] || dp[s - num];
    }
  }
  return dp[target];
};`,
  ),
  "edit-distance": wrap(
    "2D DP — insert/delete/replace, dp[i][j] = min ops for word1[:i] → word2[:j].",
    "Edit Distance",
    "edit-distance",
    `// Time: O(m·n) · Space: O(m·n)
var minDistance = function(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
};`,
  ),
  "min-stack": wrap(
    "Do stacks / paired values — har push pe current min saath store.",
    "Min Stack",
    "min-stack",
    `// Time: O(1) · Space: O(n)
var MinStack = function() {
  this.stack = [];
  this.mins = [];
};
MinStack.prototype.push = function(val) {
  this.stack.push(val);
  const m = this.mins.length ? this.mins[this.mins.length - 1] : Infinity;
  this.mins.push(Math.min(m, val));
};
MinStack.prototype.pop = function() {
  this.stack.pop();
  this.mins.pop();
};
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};
MinStack.prototype.getMin = function() {
  return this.mins[this.mins.length - 1];
};`,
  ),
  "evaluate-reverse-polish-notation": wrap(
    "Stack — numbers push, operator pe 2 pop karke compute.",
    "Evaluate Reverse Polish Notation",
    "evaluate-reverse-polish-notation",
    `// Time: O(n) · Space: O(n)
var evalRPN = function(tokens) {
  const st = [];
  for (const t of tokens) {
    if (t === "+" || t === "-" || t === "*" || t === "/") {
      const b = st.pop(), a = st.pop();
      if (t === "+") st.push(a + b);
      else if (t === "-") st.push(a - b);
      else if (t === "*") st.push(a * b);
      else st.push(Math.trunc(a / b));
    } else st.push(Number(t));
  }
  return st[0];
};`,
  ),
  "daily-temperatures": wrap(
    "Monotonic decreasing stack of indices — next warmer day.",
    "Daily Temperatures",
    "daily-temperatures",
    `// Time: O(n) · Space: O(n)
var dailyTemperatures = function(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && temperatures[i] > temperatures[st[st.length - 1]]) {
      const j = st.pop();
      ans[j] = i - j;
    }
    st.push(i);
  }
  return ans;
};`,
  ),
  "next-greater-element-i": wrap(
    "Monotonic stack on nums2 — map next greater, phir nums1 lookup.",
    "Next Greater Element I",
    "next-greater-element-i",
    `// Time: O(n) · Space: O(n)
var nextGreaterElement = function(nums1, nums2) {
  const next = new Map();
  const st = [];
  for (const x of nums2) {
    while (st.length && x > st[st.length - 1]) next.set(st.pop(), x);
    st.push(x);
  }
  return nums1.map((x) => next.get(x) ?? -1);
};`,
  ),
  "car-fleet": wrap(
    "Sort by position desc, stack pe time-to-target — slower peeche fleet banata.",
    "Car Fleet",
    "car-fleet",
    `// Time: O(n log n) · Space: O(n)
var carFleet = function(target, position, speed) {
  const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
  let fleets = 0, lastTime = 0;
  for (const [p, s] of cars) {
    const time = (target - p) / s;
    if (time > lastTime) {
      fleets++;
      lastTime = time;
    }
  }
  return fleets;
};`,
  ),
  "largest-rectangle-in-histogram": wrap(
    "Monotonic increasing stack — har bar ke liye left/right smaller bounds.",
    "Largest Rectangle in Histogram",
    "largest-rectangle-in-histogram",
    `// Time: O(n) · Space: O(n)
var largestRectangleArea = function(heights) {
  const st = [-1];
  let best = 0;
  const hs = [...heights, 0];
  for (let i = 0; i < hs.length; i++) {
    while (st.length > 1 && hs[i] < hs[st[st.length - 1]]) {
      const h = hs[st.pop()];
      const w = i - st[st.length - 1] - 1;
      best = Math.max(best, h * w);
    }
    st.push(i);
  }
  return best;
};`,
  ),
  "basic-calculator": wrap(
    "Stack for signs/parens — running result + sign * number.",
    "Basic Calculator",
    "basic-calculator",
    `// Time: O(n) · Space: O(n)
var calculate = function(s) {
  const st = [];
  let res = 0, num = 0, sign = 1;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= "0" && ch <= "9") {
      num = num * 10 + (ch.charCodeAt(0) - 48);
    } else if (ch === "+" || ch === "-") {
      res += sign * num;
      num = 0;
      sign = ch === "+" ? 1 : -1;
    } else if (ch === "(") {
      st.push(res, sign);
      res = 0;
      sign = 1;
    } else if (ch === ")") {
      res += sign * num;
      num = 0;
      res *= st.pop();
      res += st.pop();
    }
  }
  return res + sign * num;
};`,
  ),
  "copy-list-with-random-pointer": wrap(
    "Hash map old→new, ya interweave copy nodes — random pointers fix.",
    "Copy List with Random Pointer",
    "copy-list-with-random-pointer",
    `// Time: O(n) · Space: O(n)
var copyRandomList = function(head) {
  if (!head) return null;
  const map = new Map();
  let cur = head;
  while (cur) {
    map.set(cur, new Node(cur.val));
    cur = cur.next;
  }
  cur = head;
  while (cur) {
    const copy = map.get(cur);
    copy.next = cur.next ? map.get(cur.next) : null;
    copy.random = cur.random ? map.get(cur.random) : null;
    cur = cur.next;
  }
  return map.get(head);
};`,
  ),
  "reverse-nodes-in-k-group": wrap(
    "Groups of k reverse — count check, then prev/curr reverse, reconnect.",
    "Reverse Nodes in k-Group",
    "reverse-nodes-in-k-group",
    `// Time: O(n) · Space: O(1)
var reverseKGroup = function(head, k) {
  let node = head, count = 0;
  while (node && count < k) { node = node.next; count++; }
  if (count < k) return head;

  let prev = null, curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  head.next = reverseKGroup(curr, k);
  return prev;
};`,
  ),
  "balanced-binary-tree": wrap(
    "DFS height — agar subtree unbalanced to -1 bubble up.",
    "Balanced Binary Tree",
    "balanced-binary-tree",
    `// Time: O(n) · Space: O(h)
var isBalanced = function(root) {
  const dfs = (node) => {
    if (!node) return 0;
    const L = dfs(node.left);
    if (L === -1) return -1;
    const R = dfs(node.right);
    if (R === -1) return -1;
    if (Math.abs(L - R) > 1) return -1;
    return 1 + Math.max(L, R);
  };
  return dfs(root) !== -1;
};`,
  ),
  "course-schedule-ii": wrap(
    "Topological sort (Kahn BFS) — indegree 0 queue, order build.",
    "Course Schedule II",
    "course-schedule-ii",
    `// Time: O(V+E) · Space: O(V+E)
var findOrder = function(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indeg = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of adj[u]) {
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return order.length === numCourses ? order : [];
};`,
  ),
  "network-delay-time": wrap(
    "Dijkstra — min-heap distances, max dist among reachable.",
    "Network Delay Time",
    "network-delay-time",
    `// Time: O(E log V) · Space: O(V+E)
var networkDelayTime = function(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq = [[0, k]]; // [dist, node]
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    ans = Math.max(ans, dist[i]);
  }
  return ans;
};`,
  ),
  "cheapest-flights-within-k-stops": wrap(
    "Bellman-Ford K+1 relaxations — at most k stops.",
    "Cheapest Flights Within K Stops",
    "cheapest-flights-within-k-stops",
    `// Time: O(K·E) · Space: O(n)
var findCheapestPrice = function(n, flights, src, dst, k) {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i <= k; i++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] === Infinity) continue;
      next[v] = Math.min(next[v], dist[u] + w);
    }
    dist = next;
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
};`,
  ),
  "running-sum-of-1d-array": wrap(
    "Prefix — har index pe running total overwrite/store.",
    "Running Sum of 1d Array",
    "running-sum-of-1d-array",
    `// Time: O(n) · Space: O(1) extra
var runningSum = function(nums) {
  for (let i = 1; i < nums.length; i++) nums[i] += nums[i - 1];
  return nums;
};`,
  ),
  "range-sum-query-immutable": wrap(
    "Prefix array — sumRange(l,r) = prefix[r+1] - prefix[l].",
    "Range Sum Query - Immutable",
    "range-sum-query-immutable",
    `// Time: O(1) query · Space: O(n)
var NumArray = function(nums) {
  this.prefix = [0];
  for (const n of nums) this.prefix.push(this.prefix[this.prefix.length - 1] + n);
};
NumArray.prototype.sumRange = function(left, right) {
  return this.prefix[right + 1] - this.prefix[left];
};`,
  ),
  "find-pivot-index": wrap(
    "Total sum jaano — left sum == right sum wala index.",
    "Find Pivot Index",
    "find-pivot-index",
    `// Time: O(n) · Space: O(1)
var pivotIndex = function(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (left === total - left - nums[i]) return i;
    left += nums[i];
  }
  return -1;
};`,
  ),
  "contiguous-array": wrap(
    "0 ko -1 treat — prefix 0 pehle kab aaya, max length.",
    "Contiguous Array",
    "contiguous-array",
    `// Time: O(n) · Space: O(n)
var findMaxLength = function(nums) {
  const map = new Map([[0, -1]]);
  let sum = 0, best = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 1 ? 1 : -1;
    if (map.has(sum)) best = Math.max(best, i - map.get(sum));
    else map.set(sum, i);
  }
  return best;
};`,
  ),
  "subarray-sums-divisible-by-k": wrap(
    "Prefix mod K — same remainder pehle aaya to subarray divisible.",
    "Subarray Sums Divisible by K",
    "subarray-sums-divisible-by-k",
    `// Time: O(n) · Space: O(k)
var subarraysDivByK = function(nums, k) {
  const map = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    let mod = ((sum % k) + k) % k;
    count += map.get(mod) || 0;
    map.set(mod, (map.get(mod) || 0) + 1);
  }
  return count;
};`,
  ),
  "minimum-number-of-arrows-to-burst-balloons": wrap(
    "Sort by end — greedy arrows, jab start > arrowEnd naya arrow.",
    "Minimum Number of Arrows to Burst Balloons",
    "minimum-number-of-arrows-to-burst-balloons",
    `// Time: O(n log n) · Space: O(1)
var findMinArrowShots = function(points) {
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1, end = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }
  return arrows;
};`,
  ),
  "employee-free-time": wrap(
    "Saare intervals flatten+sort — gaps between merged = free time.",
    "Employee Free Time",
    "employee-free-time",
    `// Time: O(n log n) · Space: O(n)
var employeeFreeTime = function(schedule) {
  const intervals = schedule.flat().sort((a, b) => a.start - b.start);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i].start <= last.end) {
      last.end = Math.max(last.end, intervals[i].end);
    } else merged.push(intervals[i]);
  }
  const free = [];
  for (let i = 1; i < merged.length; i++) {
    free.push(new Interval(merged[i - 1].end, merged[i].start));
  }
  return free;
};`,
    true,
  ),
  "assign-cookies": wrap(
    "Greedy — dono sort, chhote child ko pehle satisfy.",
    "Assign Cookies",
    "assign-cookies",
    `// Time: O(n log n) · Space: O(1)
var findContentChildren = function(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0, j = 0;
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) i++;
    j++;
  }
  return i;
};`,
  ),
  "jump-game-ii": wrap(
    "Greedy BFS levels — current end pe jumps++, farthest track.",
    "Jump Game II",
    "jump-game-ii",
    `// Time: O(n) · Space: O(1)
var jump = function(nums) {
  let jumps = 0, end = 0, far = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    if (i === end) {
      jumps++;
      end = far;
    }
  }
  return jumps;
};`,
  ),
  "gas-station": wrap(
    "Total gas >= cost; unique start = jahan running tank pehle negative hua uske baad.",
    "Gas Station",
    "gas-station",
    `// Time: O(n) · Space: O(1)
var canCompleteCircuit = function(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
};`,
  ),
  "partition-labels": wrap(
    "Last index map — greedy expand end, jab i==end partition cut.",
    "Partition Labels",
    "partition-labels",
    `// Time: O(n) · Space: O(1)
var partitionLabels = function(s) {
  const last = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i;
  const res = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]);
    if (i === end) {
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
};`,
  ),
  "task-scheduler": wrap(
    "Max freq tasks dominate — idle = (maxFreq-1)*(n+1) formula style.",
    "Task Scheduler",
    "task-scheduler",
    `// Time: O(n) · Space: O(1)
var leastInterval = function(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const maxf = freq[0];
  let idle = (maxf - 1) * n;
  for (let i = 1; i < 26 && idle > 0; i++) {
    idle -= Math.min(maxf - 1, freq[i]);
  }
  idle = Math.max(0, idle);
  return tasks.length + idle;
};`,
  ),
  "candy": wrap(
    "Do passes — left-to-right then right-to-left rating peaks.",
    "Candy",
    "candy",
    `// Time: O(n) · Space: O(n)
var candy = function(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  for (let i = 1; i < n; i++)
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  for (let i = n - 2; i >= 0; i--)
    if (ratings[i] > ratings[i + 1])
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
  return candies.reduce((a, b) => a + b, 0);
};`,
  ),
  "redundant-connection": wrap(
    "Union-Find — pehla edge jo already same parent me jode = redundant.",
    "Redundant Connection",
    "redundant-connection",
    `// Time: O(n) · Space: O(n)
var findRedundantConnection = function(edges) {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  for (const [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return [u, v];
    parent[pu] = pv;
  }
  return [];
};`,
  ),
  "accounts-merge": wrap(
    "Union emails via DSU, phir account name + sorted emails.",
    "Accounts Merge",
    "accounts-merge",
    `// Time: O(n·α(n) + n log n) · Space: O(n)
var accountsMerge = function(accounts) {
  const parent = new Map();
  const emailToName = new Map();
  const find = (x) => {
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));
    return parent.get(x);
  };
  const union = (a, b) => {
    const pa = find(a), pb = find(b);
    if (pa !== pb) parent.set(pa, pb);
  };

  for (const acc of accounts) {
    const name = acc[0];
    for (let i = 1; i < acc.length; i++) {
      const email = acc[i];
      if (!parent.has(email)) parent.set(email, email);
      emailToName.set(email, name);
      union(acc[1], email);
    }
  }

  const groups = new Map();
  for (const email of parent.keys()) {
    const root = find(email);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }

  const res = [];
  for (const [, emails] of groups) {
    emails.sort();
    res.push([emailToName.get(emails[0]), ...emails]);
  }
  return res;
};`,
  ),
  "most-stones-removed-with-same-row-or-column": wrap(
    "DSU on row/col — stones - components = removable.",
    "Most Stones Removed with Same Row or Column",
    "most-stones-removed-with-same-row-or-column",
    `// Time: O(n) · Space: O(n)
var removeStones = function(stones) {
  const parent = new Map();
  const find = (x) => {
    if (!parent.has(x)) parent.set(x, x);
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));
    return parent.get(x);
  };
  const union = (a, b) => {
    const pa = find(a), pb = find(b);
    if (pa !== pb) parent.set(pa, pb);
  };
  for (const [r, c] of stones) union(r, ~c);
  const roots = new Set();
  for (const [r, c] of stones) roots.add(find(r));
  return stones.length - roots.size;
};`,
  ),
  "min-cost-to-connect-all-points": wrap(
    "Kruskal + DSU on Manhattan edges, ya Prim.",
    "Min Cost to Connect All Points",
    "min-cost-to-connect-all-points",
    `// Time: O(n² log n) · Space: O(n²)
var minCostConnectPoints = function(points) {
  const n = points.length;
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d =
        Math.abs(points[i][0] - points[j][0]) +
        Math.abs(points[i][1] - points[j][1]);
      edges.push([d, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  let cost = 0, used = 0;
  for (const [d, u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) continue;
    parent[pu] = pv;
    cost += d;
    if (++used === n - 1) break;
  }
  return cost;
};`,
  ),
  "replace-words": wrap(
    "Trie of dictionary — sentence me pehla root prefix replace.",
    "Replace Words",
    "replace-words",
    `// Time: O(total chars) · Space: O(dict)
var replaceWords = function(dictionary, sentence) {
  const root = {};
  for (const w of dictionary) {
    let node = root;
    for (const ch of w) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.end = true;
  }
  const replace = (word) => {
    let node = root, pref = "";
    for (const ch of word) {
      if (!node[ch]) return word;
      node = node[ch];
      pref += ch;
      if (node.end) return pref;
    }
    return word;
  };
  return sentence.split(" ").map(replace).join(" ");
};`,
  ),
  "map-sum-pairs": wrap(
    "Trie with score on nodes — insert overwrite, prefix sum traverse.",
    "Map Sum Pairs",
    "map-sum-pairs",
    `// Time: O(L) · Space: O(total)
var MapSum = function() {
  this.root = {};
  this.map = new Map();
};
MapSum.prototype.insert = function(key, val) {
  const delta = val - (this.map.get(key) || 0);
  this.map.set(key, val);
  let node = this.root;
  for (const ch of key) {
    if (!node[ch]) node[ch] = { sum: 0 };
    node = node[ch];
    node.sum = (node.sum || 0) + delta;
  }
};
MapSum.prototype.sum = function(prefix) {
  let node = this.root;
  for (const ch of prefix) {
    if (!node[ch]) return 0;
    node = node[ch];
  }
  return node.sum || 0;
};`,
  ),
  "maximum-xor-of-two-numbers-in-an-array": wrap(
    "Bit Trie — har number insert, max XOR path prefer opposite bits.",
    "Maximum XOR of Two Numbers in an Array",
    "maximum-xor-of-two-numbers-in-an-array",
    `// Time: O(32n) · Space: O(32n)
var findMaximumXOR = function(nums) {
  const root = {};
  const insert = (num) => {
    let node = root;
    for (let b = 31; b >= 0; b--) {
      const bit = (num >> b) & 1;
      if (!node[bit]) node[bit] = {};
      node = node[bit];
    }
  };
  const query = (num) => {
    let node = root, xor = 0;
    for (let b = 31; b >= 0; b--) {
      const bit = (num >> b) & 1;
      const want = 1 - bit;
      if (node[want]) {
        xor |= 1 << b;
        node = node[want];
      } else node = node[bit];
    }
    return xor;
  };
  let best = 0;
  for (const n of nums) {
    insert(n);
    best = Math.max(best, query(n));
  }
  return best;
};`,
  ),
  "single-number": wrap(
    "XOR sab — duplicates cancel, leftover = single.",
    "Single Number",
    "single-number",
    `// Time: O(n) · Space: O(1)
var singleNumber = function(nums) {
  return nums.reduce((a, b) => a ^ b, 0);
};`,
  ),
  "single-number-ii": wrap(
    "Bit counts mod 3 — ya ones/twos bit masks.",
    "Single Number II",
    "single-number-ii",
    `// Time: O(n) · Space: O(1)
var singleNumber = function(nums) {
  let ones = 0, twos = 0;
  for (const n of nums) {
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
};`,
  ),
  "merge-sorted-array": wrap(
    "Do pointers peeche se — badi value nums1 ke end pe fill.",
    "Merge Sorted Array",
    "merge-sorted-array",
    `// Time: O(m+n) · Space: O(1)
var merge = function(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }
};`,
  ),
  "majority-element": wrap(
    "Boyer-Moore vote — divide & conquer bhi chalega, yahan linear vote.",
    "Majority Element",
    "majority-element",
    `// Time: O(n) · Space: O(1)
var majorityElement = function(nums) {
  let cand = null, count = 0;
  for (const n of nums) {
    if (count === 0) cand = n;
    count += n === cand ? 1 : -1;
  }
  return cand;
};`,
  ),
  "sort-an-array": wrap(
    "Merge sort — divide halves, merge sorted.",
    "Sort an Array",
    "sort-an-array",
    `// Time: O(n log n) · Space: O(n)
var sortArray = function(nums) {
  if (nums.length <= 1) return nums;
  const mid = nums.length >> 1;
  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  while (i < left.length) res.push(left[i++]);
  while (j < right.length) res.push(right[j++]);
  return res;
};`,
  ),
  "count-of-smaller-numbers-after-self": wrap(
    "Merge sort counting — merge pe right-half smaller count accumulate.",
    "Count of Smaller Numbers After Self",
    "count-of-smaller-numbers-after-self",
    `// Time: O(n log n) · Space: O(n)
var countSmaller = function(nums) {
  const n = nums.length;
  const counts = new Array(n).fill(0);
  const idx = nums.map((v, i) => [v, i]);

  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = arr.length >> 1;
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const merged = [];
    let i = 0, j = 0, rightTaken = 0;
    while (i < left.length || j < right.length) {
      if (j === right.length || (i < left.length && left[i][0] <= right[j][0])) {
        counts[left[i][1]] += rightTaken;
        merged.push(left[i++]);
      } else {
        rightTaken++;
        merged.push(right[j++]);
      }
    }
    return merged;
  };

  mergeSort(idx);
  return counts;
};`,
  ),
};

// Prefer NEW over BODIES when both exist for fresh tip+lc link consistency? Use NEW first.
function bodyFor(topicId, slug, title, premium) {
  const key = `${topicId}::${slug}`;
  if (OVERRIDES[key]) return OVERRIDES[key];
  if (OVERRIDES[slug]) return OVERRIDES[slug];
  if (NEW[slug]) return NEW[slug];
  if (BODIES[slug]) {
    // Ensure LC link present
    if (BODIES[slug].includes("leetcode.com/problems/")) return BODIES[slug];
    return `${BODIES[slug].split("\n")[0]}

${lcLink(title, slug)}
${premium ? "\n*Premium question — kholne ke liye LeetCode premium chahiye.*\n" : ""}
${BODIES[slug].includes("```") ? BODIES[slug].slice(BODIES[slug].indexOf("```")) : BODIES[slug]}`;
  }
  throw new Error(`Missing solution: ${topicId} / ${slug}`);
}

const TOPICS = [
  {
    id: "two-pointers",
    title: "Two Pointers",
    exportName: "TWO_POINTERS_SOLUTIONS",
    file: "two-pointers.ts",
    subs: [
      {
        title: "Foundation",
        topics: [
          { id: 125, slug: "valid-palindrome", title: "Valid Palindrome", diff: "Easy" },
          { id: 167, slug: "two-sum-ii-input-array-is-sorted", title: "Two Sum II - Input Array Is Sorted", diff: "Medium" },
          { id: 344, slug: "reverse-string", title: "Reverse String", diff: "Easy" },
        ],
      },
      {
        title: "Medium",
        topics: [
          { id: 15, slug: "3sum", title: "3Sum", diff: "Medium" },
          { id: 11, slug: "container-with-most-water", title: "Container With Most Water", diff: "Medium" },
          { id: 75, slug: "sort-colors", title: "Sort Colors", diff: "Medium" },
        ],
      },
      {
        title: "Advanced",
        topics: [
          { id: 42, slug: "trapping-rain-water", title: "Trapping Rain Water", diff: "Hard" },
        ],
      },
    ],
  },
];

// Continue topics in a second part to keep file manageable — actually put all in one array below via require of sheet meta

module.exports = { bodyFor, wrap, lcLink, OUT, TOPICS_PARTIAL: TOPICS };
