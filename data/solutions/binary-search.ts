import type { SolutionGroup } from "./types";

export const BINARY_SEARCH_SOLUTIONS: SolutionGroup = {
  id: "binary-search",
  title: "Binary Search",
  subs: [
    {
      title: "Classic / Boundaries",
      topics: [
    {
      id: 704,
      lcSlug: "binary-search",
      title: "Binary Search",
      diff: "Easy",
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
      id: 35,
      lcSlug: "search-insert-position",
      title: "Search Insert Position",
      diff: "Easy",
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
      id: 34,
      lcSlug: "find-first-and-last-position-of-element-in-sorted-array",
      title: "Find First and Last Position of Element in Sorted Array",
      diff: "Medium",
      body: `Lower bound aur upper bound ka khel. Do binary search.

[Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

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
      id: 69,
      lcSlug: "sqrtx",
      title: "Sqrt(x)",
      diff: "Easy",
      body: `Answer monotonic hai — mid ka square bada ho to left jao, nahi to right. Integer part chahiye.

[Sqrt(x)](https://leetcode.com/problems/sqrtx/)

\`\`\`js
// Hinglish: answer pe binary search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sqrtx/
function mySqrt(x) {
  // Hinglish: step 1 — range lo
  let lo = 0, hi = x, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (mid * mid <= x) { ans = mid; lo = mid + 1; } // Hinglish: aur bada try karo
    else hi = mid - 1; // Hinglish: chhota karo
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 153,
      lcSlug: "find-minimum-in-rotated-sorted-array",
      title: "Find Minimum in Rotated Sorted Array",
      diff: "Medium",
      body: `If mid is greater than the right end, the min is to the right of mid. Else min is at mid or left.

[Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

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
      id: 33,
      lcSlug: "search-in-rotated-sorted-array",
      title: "Search in Rotated Sorted Array",
      diff: "Medium",
      body: `One half is always sorted. If target lives in the sorted half, go there. Else the other half.

[Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

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
      id: 81,
      lcSlug: "search-in-rotated-sorted-array-ii",
      title: "Search in Rotated Sorted Array II",
      diff: "Medium",
      body: `Duplicate wala rotation — lo, mid, hi barabar hon to dono shrink karo, baaki same logic.

[Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)

\`\`\`js
// Hinglish: duplicate sambhalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
function search(nums, target) {
  // Hinglish: step 1 — range lo
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return true;
    if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) { lo++; hi--; } // Hinglish: teeno same to shrink
    else if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; // Hinglish: left sorted
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; // Hinglish: right sorted
      else hi = mid - 1;
    }
  }
  return false;
}
\`\`\``,
    },
    {
      id: 162,
      lcSlug: "find-peak-element",
      title: "Find Peak Element",
      diff: "Medium",
      body: `Padosi se bada hai to peak ki taraf jao — mid chhota aur right bada ho to right jao, warna left.

[Find Peak Element](https://leetcode.com/problems/find-peak-element/)

\`\`\`js
// Hinglish: chadhai ki taraf jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-peak-element/
function findPeakElement(nums) {
  // Hinglish: step 1 — range lo
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < nums[mid + 1]) lo = mid + 1; // Hinglish: chadhai right me
    else hi = mid; // Hinglish: peak yahin ya left me
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 540,
      lcSlug: "single-element-in-a-sorted-array",
      title: "Single Element in a Sorted Array",
      diff: "Medium",
      body: `Pairs me akela dhoondo — mid even banao, partner check karo. Jodi tooti jahan, akela wahan.

[Single Element in a Sorted Array](https://leetcode.com/problems/single-element-in-a-sorted-array/)

\`\`\`js
// Hinglish: jodi todo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/single-element-in-a-sorted-array/
function singleNonDuplicate(nums) {
  // Hinglish: step 1 — range lo
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    let mid = (lo + hi) >> 1;
    if (mid % 2 === 1) mid--; // Hinglish: even banao
    if (nums[mid] === nums[mid + 1]) lo = mid + 2; // Hinglish: jodi sahi, aage dekho
    else hi = mid; // Hinglish: yahin tooti hai
  }
  return nums[lo];
}
\`\`\``,
    },
      ],
    },
    {
      title: "Answer / Feasibility",
      topics: [
    {
      id: 875,
      lcSlug: "koko-eating-bananas",
      title: "Koko Eating Bananas",
      diff: "Medium",
      body: `I binary search the speed. \`hours(k)\` = how long Koko needs at speed k. First k where hours <= h.

[Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — on the answer
// LC: https://leetcode.com/problems/koko-eating-bananas/
function minEatingSpeed(piles, h) {
  // Hinglish: step 1 — base case check karo
  let lo = 1, hi = Math.max(...piles);
  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (hours(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 1011,
      lcSlug: "capacity-to-ship-packages-within-d-days",
      title: "Capacity To Ship Packages Within D Days",
      diff: "Medium",
      body: `Same as Koko. Smallest capacity such that I can ship in \`days\` days. Greedy: fill the boat until the next package does not fit, that starts a new day.

[Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)

\`\`\`js
// Hinglish: aadha kaat ke dhoondo — ek-ek step comment dekho
// Binary search — on capacity
// LC: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
function shipWithinDays(weights, days) {
  // Hinglish: step 1 — base case check karo
  let lo = Math.max(...weights), hi = weights.reduce((a, b) => a + b, 0);
  const need = (cap) => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) {
        d++;
        load = 0;
      }
      load += w;
    }
    return d;
  };
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (need(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 410,
      lcSlug: "split-array-largest-sum",
      title: "Split Array Largest Sum",
      diff: "Hard",
      body: `Answer pe binary search — mid = max subarray sum ki limit. Kitne tukde lage gino, zyada lage to limit badhao.

[Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)

\`\`\`js
// Hinglish: answer pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/split-array-largest-sum/
function splitArray(nums, k) {
  // Hinglish: step 1 — range lo (max se total tak)
  let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b, 0);
  const pieces = (limit) => {
    let cnt = 1, sum = 0;
    for (const x of nums) {
      if (sum + x > limit) { cnt++; sum = x; } // Hinglish: naya tukda
      else sum += x;
    }
    return cnt;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (pieces(mid) <= k) hi = mid; // Hinglish: ho gaya, aur chhota try karo
    else lo = mid + 1; // Hinglish: tukde zyada, limit badhao
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 774,
      lcSlug: "minimize-max-distance-to-gas-station",
      title: "Minimize Max Distance to Gas Station",
      diff: "Hard",
      body: `Answer (max gap) pe binary search — itne gap me kitne station lagenge gino.

[Minimize Max Distance to Gas Station](https://leetcode.com/problems/minimize-max-distance-to-gas-station/)

\`\`\`js
// Hinglish: gap pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimize-max-distance-to-gas-station/
function minmaxGasDist(stations, k) {
  // Hinglish: step 1 — range lo
  let lo = 0, hi = 100000000;
  for (let round = 0; round < 50; round++) {
    const mid = (lo + hi) / 2;
    let need = 0;
    for (let i = 1; i < stations.length; i++) {
      need += Math.floor((stations[i] - stations[i - 1]) / mid); // Hinglish: kitne station lagenge
    }
    if (need <= k) hi = mid; // Hinglish: ho gaya, gap ghatao
    else lo = mid;
  }
  return hi;
}
\`\`\``,
    },
    {
      id: 1482,
      lcSlug: "minimum-number-of-days-to-make-m-bouquets",
      title: "Minimum Number of Days to Make m Bouquets",
      diff: "Medium",
      body: `Din fix karo, gin lo kitne bouquets banenge — kaafi bane to din ghatao.

[Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/)

\`\`\`js
// Hinglish: din pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/
function minDays(bloomDay, m, k) {
  // Hinglish: step 1 — ho sakta hai ya nahi
  if (m * k > bloomDay.length) return -1;
  let lo = 1, hi = Math.max(...bloomDay);
  const bouquets = (day) => {
    let cnt = 0, row = 0;
    for (const d of bloomDay) {
      if (d <= day) { row++; if (row === k) { cnt++; row = 0; } } // Hinglish: bouquet bana
      else row = 0;
    }
    return cnt;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (bouquets(mid) >= m) hi = mid; // Hinglish: ho gaya, din ghatao
    else lo = mid + 1;
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 1552,
      lcSlug: "magnetic-force-between-two-balls",
      title: "Magnetic Force Between Two Balls",
      diff: "Medium",
      body: `Force fix karo, balls rakho — jitni chahiye utni lagi to force badhao. Aggressive cows wala pattern.

[Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/)

\`\`\`js
// Hinglish: force pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/magnetic-force-between-two-balls/
function maxDistance(position, m) {
  // Hinglish: step 1 — sort karo
  position.sort((a, b) => a - b);
  let lo = 1, hi = position[position.length - 1] - position[0], ans = 1;
  const place = (force) => {
    let cnt = 1, last = position[0];
    for (let i = 1; i < position.length; i++) {
      if (position[i] - last >= force) { cnt++; last = position[i]; } // Hinglish: ball rakho
    }
    return cnt;
  };
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (place(mid) >= m) { ans = mid; lo = mid + 1; } // Hinglish: ho gaya, force badhao
    else hi = mid - 1;
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 1760,
      lcSlug: "minimum-limit-of-balls-in-a-bag",
      title: "Minimum Limit of Balls in a Bag",
      diff: "Medium",
      body: `Max size fix karo, operations gino (x-1)/mid — budget me ho to size ghatao.

[Minimum Limit of Balls in a Bag](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/)

\`\`\`js
// Hinglish: size pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/
function minimumSize(nums, maxOperations) {
  // Hinglish: step 1 — range lo
  let lo = 1, hi = Math.max(...nums);
  const ops = (size) => {
    let c = 0;
    for (const x of nums) c += Math.floor((x - 1) / size); // Hinglish: kitne cut lagenge
    return c;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (ops(mid) <= maxOperations) hi = mid; // Hinglish: ho gaya, size ghatao
    else lo = mid + 1;
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 1231,
      lcSlug: "divide-chocolate",
      title: "Divide Chocolate",
      diff: "Hard",
      body: `Sweetness fix karo, tukde gino — k+1 tukde bane to sweetness badhao.

[Divide Chocolate](https://leetcode.com/problems/divide-chocolate/)

\`\`\`js
// Hinglish: sweetness pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/divide-chocolate/
function maximizeSweetness(sweetness, k) {
  // Hinglish: step 1 — range lo
  let lo = 1, hi = sweetness.reduce((a, b) => a + b, 0);
  const pieces = (val) => {
    let cnt = 0, sum = 0;
    for (const x of sweetness) {
      sum += x;
      if (sum >= val) { cnt++; sum = 0; } // Hinglish: tukda bana
    }
    return cnt;
  };
  const need = k + 1;
  while (lo < hi) {
    const mid = ((lo + hi) >> 1) + 1;
    if (pieces(mid) >= need) lo = mid; // Hinglish: ho gaya, aur badhao
    else hi = mid - 1;
  }
  return lo;
}
\`\`\``,
    },
    {
      id: 2187,
      lcSlug: "minimum-time-to-complete-trips",
      title: "Minimum Time to Complete Trips",
      diff: "Medium",
      body: `Time fix karo, trips gino (time/bus) — kaafi hon to time ghatao.

[Minimum Time to Complete Trips](https://leetcode.com/problems/minimum-time-to-complete-trips/)

\`\`\`js
// Hinglish: time pe search — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-time-to-complete-trips/
function minimumTime(time, totalTrips) {
  // Hinglish: step 1 — range lo
  let lo = 1, hi = Math.min(...time) * totalTrips;
  const trips = (t) => {
    let c = 0;
    for (const x of time) c += Math.floor(t / x); // Hinglish: har bus kitne chakkar
    return c;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (trips(mid) >= totalTrips) hi = mid; // Hinglish: ho gaya, time ghatao
    else lo = mid + 1;
  }
  return lo;
}
\`\`\``,
    },
      ],
    },
  ],
};
