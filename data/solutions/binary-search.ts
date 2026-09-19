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
// LC: https://leetcode.com/problems/search-insert-position/
var searchInsert = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};
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
// Binary search — find target
// LC: https://leetcode.com/problems/binary-search/
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};
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
// LC: https://leetcode.com/problems/guess-number-higher-or-lower/
var guessNumber = function(n) {
  let left = 1;
  let right = n;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    let ans = guess(mid);
    if (ans === 0) return mid;
    if (ans === -1) {
      right = mid - 1;
    }
    if (ans === 1) {
      left = mid + 1;
    }
  }
};
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
// Binary search — min of rotated
// LC: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
var findMin = function(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((right + left) / 2);

    if (nums[right] < nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
};
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
// Binary search — rotated, pick the sorted side
// LC: https://leetcode.com/problems/search-in-rotated-sorted-array/
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // which side is sorted
    if (nums[right] > nums[mid]) {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (target < nums[mid] && target >= nums[left]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
};
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
// LC: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
var searchRange = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let leftBound = -1;
  let rightBound = -1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target && nums[mid - 1] !== target) {
      leftBound = mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  left = 0;
  right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target && nums[mid + 1] !== target) {
      rightBound = mid;
    }

    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return [leftBound, rightBound];
};
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
// LC: https://leetcode.com/problems/find-median-from-data-stream/
var MedianFinder = function() {
  this.arr = [];
};

MedianFinder.prototype.addNum = function(num) {
  let left = 0;
  let right = this.arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((right + left) / 2);

    if (this.arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  this.arr.splice(left, 0, num);
};

MedianFinder.prototype.findMedian = function() {
  if (this.arr.length % 2 === 0) {
    // even
    let mid = this.arr.length / 2;
    return (this.arr[mid] + this.arr[mid - 1]) / 2;
  } else {
    // odd
    let mid = Math.floor(this.arr.length / 2);
    return this.arr[mid];
  }
};
\`\`\``,
    },
      ],
    },
  ],
};
