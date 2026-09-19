import type { SolutionGroup } from "./types";

export const BINARY_SEARCH_SOLUTIONS: SolutionGroup = {
  id: "binary-search",
  title: "Binary Search",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "search-insert-position",
      title: "Search Insert Position",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=_GuSAPmgl48&ab_channel=AlgoJS",
      body: `Target kahan insert hoga wahi lower_bound hai. Binary search se \`lo\` hi answer.

[Search Insert Position](https://leetcode.com/problems/search-insert-position/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/search-insert-position/
function searchInsert(nums, target) {
  // Hinglish: lower bound
  let lo=0, hi=nums.length;
  while (lo<hi) {
    const mid = lo + ((hi-lo)>>1);
    if (nums[mid] < target) lo=mid+1; // Hinglish: chhota to right
    else hi=mid; // Hinglish: bada/equal to left me rakho
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "binary-search",
      title: "Binary Search",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=t3svuOuBGRI&t=11s&ab_channel=AlgoJS",
      body: `Classic. Mid too small, search right. Too big, search left.

[Binary Search](https://leetcode.com/problems/binary-search/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — find target
// LC: https://leetcode.com/problems/binary-search/
function search(nums, target) {
  // Hinglish: step 1 — base case check karo
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "guess-number-higher-or-lower",
      title: "Guess Number Higher or Lower",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=H-LwQhwvvWs&ab_channel=AlgoJS",
      body: `Classic binary search — guess API batayegi upar ya neeche jana hai.

[Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower/)

\`\`\`js
// Hinglish: guess pe disha — ek-ek step comment dekho
// LC: https://leetcode.com/problems/guess-number-higher-or-lower/
function guessNumber(n) {
  // Hinglish: step 1 — range lo
  let lo = 1, hi = n;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const g = guess(mid); // Hinglish: -1 chhota, 1 bada, 0 mil gaya
    if (g === 0) return mid;
    if (g < 0) hi = mid - 1; // Hinglish: guess bada tha
    else lo = mid + 1; // Hinglish: guess chhota tha
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "find-minimum-in-rotated-sorted-array",
      title: "Find Minimum In Rotated Sorted Array",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=xGbGYLFwNyg&t=105s&ab_channel=AlgoJS",
      body: `If mid is greater than the right end, the min is to the right of mid. Else min is at mid or left.

[Find Minimum In Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — min of rotated
// LC: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
function findMin(nums) {
  // Hinglish: step 1 — base case check karo
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "search-in-rotated-sorted-array",
      title: "Search in Rotated Sorted Array ",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=2bJLNgYrHR8&ab_channel=AlgoJS",
      body: `One half is always sorted. If target lives in the sorted half, go there. Else the other half.

[Search in Rotated Sorted Array ](https://leetcode.com/problems/search-in-rotated-sorted-array/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — rotated, pick the sorted side
// LC: https://leetcode.com/problems/search-in-rotated-sorted-array/
function search(nums, target) {
  // Hinglish: step 1 — base case check karo
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "find-first-and-last-position-of-element-in-sorted-array",
      title: "Find First And Last Position Of Element In Sorted Array",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=I59W7DfEyiY&ab_channel=AlgoJS",
      body: `Lower bound aur upper bound ka khel. Do binary search.

[Find First And Last Position Of Element In Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
function searchRange(nums, target) {
  // Hinglish: first >= target
  const lower = ()=>{
    let lo=0, hi=nums.length;
    while(lo<hi){ const mid=lo+((hi-lo)>>1); if(nums[mid]<target) lo=mid+1; else hi=mid; }
    return lo;
  };
  const l = lower();
  if (l===nums.length || nums[l]!==target) return [-1,-1]; // Hinglish: mila hi nahi
  // Hinglish: first > target -1 = last
  let lo=0, hi=nums.length;
  while(lo<hi){ const mid=lo+((hi-lo)>>1); if(nums[mid]<=target) lo=mid+1; else hi=mid; }
  return [l, lo-1];
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "find-median-from-data-stream",
      title: "Find Median From Data Stream",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=xYZHlJW3PLY&ab_channel=AlgoJS",
      body: `Two heaps: max-heap for the smaller half, min-heap for the bigger half. Size differs by at most 1. Median is the middle top, or the average of both tops.

[Find Median From Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

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
      ],
    },
  ],
};
