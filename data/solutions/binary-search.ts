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
// Binary search — find exact target in sorted array
function search(nums, target) {
  let lo = 0, hi = nums.length - 1; // inclusive search range
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1); // avoid overflow vs (lo+hi)/2
    if (nums[mid] === target) return mid; // found
    if (nums[mid] < target) lo = mid + 1; // target is in right half
    else hi = mid - 1; // target is in left half
  }
  return -1; // never matched
}
\`\`\``,
    },
    {
      id: 35,
      lcSlug: "search-insert-position",
      title: "Search Insert Position",
      diff: "Easy",
      body: `The insert position is lower bound: binary search until \`lo\` is the first index with \`nums[i] >= target\`.

[Search Insert Position](https://leetcode.com/problems/search-insert-position/)

\`\`\`js
// Lower bound — first index where nums[i] >= target
function searchInsert(nums, target) {
  let lo = 0, hi = nums.length; // half-open [lo, hi)
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] < target) lo = mid + 1; // still too small, go right
    else hi = mid; // mid might be answer, shrink right
  }
  return lo; // insertion index
}
\`\`\``,
    },
    {
      id: 34,
      lcSlug: "find-first-and-last-position-of-element-in-sorted-array",
      title: "Find First and Last Position of Element in Sorted Array",
      diff: "Medium",
      body: `Run lower bound for the first \`>= target\` and upper bound for the first \`> target\`; the range is between them.

[Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

\`\`\`js
// Two bounds: first >= target, first > target
function searchRange(nums, target) {
  const lower = () => {
    let lo = 0, hi = nums.length;
    while (lo < hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (nums[mid] < target) lo = mid + 1;
      else hi = mid; // keep first position with nums[mid] >= target
    }
    return lo;
  };
  const l = lower();
  if (l === nums.length || nums[l] !== target) return [-1, -1]; // absent
  // upper bound: first index with nums[mid] > target
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] <= target) lo = mid + 1; // still <=, move right
    else hi = mid;
  }
  return [l, lo - 1]; // last index is one before upper bound
}
\`\`\``,
    },
    {
      id: 69,
      lcSlug: "sqrtx",
      title: "Sqrt(x)",
      diff: "Easy",
      body: `Binary search the largest \`mid\` with \`mid * mid <= x\`; shrink left when the square is too big.

[Sqrt(x)](https://leetcode.com/problems/sqrtx/)

\`\`\`js
// BS on answer k where k*k <= x
function mySqrt(x) {
  let lo = 0, hi = x, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (mid * mid <= x) {
      ans = mid; // mid works, try larger
      lo = mid + 1;
    } else hi = mid - 1; // too big, go left
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
// Rotated sorted — min is where order breaks vs nums[hi]
function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[hi]) lo = mid + 1; // min in right part
    else hi = mid; // min at mid or left
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
// Pick the sorted half, then check if target lies there
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      // left half [lo..mid] is sorted
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half [mid..hi] is sorted
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
      body: `With duplicates, shrink both ends when \`lo\`, \`mid\`, and \`hi\` match; otherwise use the standard rotated search.

[Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)

\`\`\`js
// Rotated + duplicates — trim equal ends when stuck
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return true;
    if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) {
      lo++; hi--; // cannot tell which side, shrink
    } else if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
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
      body: `Move toward the larger neighbor: if \`nums[mid] < nums[mid+1]\`, search right; otherwise the peak is at \`mid\` or left.

[Find Peak Element](https://leetcode.com/problems/find-peak-element/)

\`\`\`js
// Walk uphill — peak exists somewhere in [lo, hi]
function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < nums[mid + 1]) lo = mid + 1; // climb right
    else hi = mid; // mid is peak or peak on left
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
      body: `Align \`mid\` to an even pair start; if the pair matches, the single element is on the right, else on the left.

[Single Element in a Sorted Array](https://leetcode.com/problems/single-element-in-a-sorted-array/)

\`\`\`js
// Pairs aligned before single; misalignment tells which side
function singleNonDuplicate(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    let mid = (lo + hi) >> 1;
    if (mid % 2 === 1) mid--; // pair starts at even index
    if (nums[mid] === nums[mid + 1]) lo = mid + 2; // single is right
    else hi = mid; // single is mid or left
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
// BS on speed k — monotonic: faster => fewer hours
function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  const hours = (k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (hours(mid) <= h) hi = mid; // fast enough, try slower
    else lo = mid + 1; // too slow
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
// BS on ship capacity — greedy count days for a cap
function shipWithinDays(weights, days) {
  let lo = Math.max(...weights), hi = weights.reduce((a, b) => a + b, 0);
  const need = (cap) => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) {
        d++; // new day
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
      body: `Binary search the maximum allowed segment sum; greedily count segments and raise the limit if more than \`k\` pieces are needed.

[Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)

\`\`\`js
// BS on max segment sum limit
function splitArray(nums, k) {
  let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b, 0);
  const pieces = (limit) => {
    let cnt = 1, sum = 0;
    for (const x of nums) {
      if (sum + x > limit) {
        cnt++; // start new segment
        sum = x;
      } else sum += x;
    }
    return cnt;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (pieces(mid) <= k) hi = mid; // feasible, tighten limit
    else lo = mid + 1; // need bigger limit
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
      body: `Binary search the maximum gap between gas stations and count how many insertions each segment needs.

[Minimize Max Distance to Gas Station](https://leetcode.com/problems/minimize-max-distance-to-gas-station/)

\`\`\`js
// BS on max gap — stations needed per segment
function minmaxGasDist(stations, k) {
  let lo = 0, hi = 100000000;
  for (let round = 0; round < 50; round++) {
    const mid = (lo + hi) / 2;
    let need = 0;
    for (let i = 1; i < stations.length; i++) {
      need += Math.floor((stations[i] - stations[i - 1]) / mid);
    }
    if (need <= k) hi = mid; // gap ok, try smaller
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
      body: `Binary search the bloom day and count \`k\`-flower bouquets; shrink the day when enough bouquets are possible.

[Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/)

\`\`\`js
// BS on day — count bouquets of k adjacent bloomed
function minDays(bloomDay, m, k) {
  if (m * k > bloomDay.length) return -1; // impossible
  let lo = 1, hi = Math.max(...bloomDay);
  const bouquets = (day) => {
    let cnt = 0, row = 0;
    for (const d of bloomDay) {
      if (d <= day) {
        row++;
        if (row === k) { cnt++; row = 0; } // one bouquet done
      } else row = 0; // streak broken
    }
    return cnt;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (bouquets(mid) >= m) hi = mid;
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
      body: `Binary search minimum separation (magnetic force / aggressive cows): check how many balls fit, then maximize force.

[Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/)

\`\`\`js
// BS on minimum distance — maximize force (aggressive cows)
function maxDistance(position, m) {
  position.sort((a, b) => a - b);
  let lo = 1, hi = position[position.length - 1] - position[0], ans = 1;
  const place = (force) => {
    let cnt = 1, last = position[0];
    for (let i = 1; i < position.length; i++) {
      if (position[i] - last >= force) {
        cnt++;
        last = position[i];
      }
    }
    return cnt;
  };
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (place(mid) >= m) { ans = mid; lo = mid + 1; } // works, push farther
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
      body: `Binary search the maximum bag size; splitting cost is \`sum floor((x-1)/size)\`; minimize size within the operation budget.

[Minimum Limit of Balls in a Bag](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/)

\`\`\`js
// BS on max bag size — ops to split down to size
function minimumSize(nums, maxOperations) {
  let lo = 1, hi = Math.max(...nums);
  const ops = (size) => {
    let c = 0;
    for (const x of nums) c += Math.floor((x - 1) / size); // splits per bag
    return c;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (ops(mid) <= maxOperations) hi = mid;
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
      body: `Binary search the minimum chunk sweetness and count whether at least \`k+1\` pieces can be formed.

[Divide Chocolate](https://leetcode.com/problems/divide-chocolate/)

\`\`\`js
// BS on min chunk sweetness — maximize (search high with +1 bias)
function maximizeSweetness(sweetness, k) {
  let lo = 1, hi = sweetness.reduce((a, b) => a + b, 0);
  const pieces = (val) => {
    let cnt = 0, sum = 0;
    for (const x of sweetness) {
      sum += x;
      if (sum >= val) { cnt++; sum = 0; } // cut here
    }
    return cnt;
  };
  const need = k + 1;
  while (lo < hi) {
    const mid = ((lo + hi) >> 1) + 1; // bias up for max minimum
    if (pieces(mid) >= need) lo = mid;
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
      body: `Binary search total time and sum \`floor(time / time[i])\` trips; minimize time when the quota is met.

[Minimum Time to Complete Trips](https://leetcode.com/problems/minimum-time-to-complete-trips/)

\`\`\`js
// BS on time — sum floor(t / time[i]) trips
function minimumTime(time, totalTrips) {
  let lo = 1, hi = Math.min(...time) * totalTrips;
  const trips = (t) => {
    let c = 0;
    for (const x of time) c += Math.floor(t / x);
    return c;
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (trips(mid) >= totalTrips) hi = mid;
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
