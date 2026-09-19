import type { SolutionGroup } from "./types";

export const ARRAY_HASH_TABLES_SOLUTIONS: SolutionGroup = {
  id: "array-hash-tables",
  title: "Array & Hash Tables",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "best-time-to-buy-and-sell-stock",
      title: "Best Time to Buy and Sell Stock",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=NEeqvv464k8&ab_channel=AlgoJS",
      body: `Ek baar kharido, ek baar becho. Sabse sasta kharido, sabse mehenga becho — ek scan me min price track karo.

[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

\`\`\`js
// Time: O(n) · Space: O(1)
var maxProfit = function(prices) {
  let curMin = prices[0];
  let curMax = 0;

  for (let i = 0; i < prices.length; i++) {
    curMin = Math.min(prices[i], curMin);
    curMax = Math.max(curMax, prices[i] - curMin);
  }

  return curMax;
};
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "contains-duplicate",
      title: "Contains Duplicate",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=hVSHKwTHkgY&ab_channel=AlgoJS",
      body: `Har number pehle dekha kya? Set me check karo. Interview ka sabse basic hashing check.

[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

\`\`\`js
// Time: O(n) · Space: O(n)
var containsDuplicate = function(nums) {
  let set = new Set(nums);
  return set.size !== nums.length;
};
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "pascals-triangle",
      title: "Pascal's Triangle",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=iakcznipu1M&ab_channel=AlgoJS",
      body: `Har row pichhli se banti hai — beech wale upar ke do jod ke aate hain, kinare 1 rehte hain.

[Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)

\`\`\`js
// Time: O(n²) · Space: O(n²)
var generate = function(numRows) {
  let res = [];

  if (numRows >= 1) res.push([1]);
  if (numRows >= 2) res.push([1, 1]);

  // logic
  for (let i = 2; i < numRows; i++) {
    let first = 1;
    let last = 1;

    let prevArr = res[i - 1];

    if (prevArr.length === 2) {
      res.push([first, first + last, last]);
    } else {
      let left = 0;
      let right = 1;
      let add = [];

      while (right < prevArr.length) {
        add.push(prevArr[left] + prevArr[right]);
        left++;
        right++;
      }

      res.push([first, ...add, last]);
    }
  }

  return res;
};
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "logger-rate-limiter",
      title: "Logger Rate Limiter",
      diff: "Easy",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=yC7UJOpbmK4&ab_channel=AlgoJS",
      body: `Har message ki aakhri time yaad rakho — 10 sec se pehle dobara aaye to mana karo.

[Logger Rate Limiter](https://leetcode.com/problems/logger-rate-limiter/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(1) · Space: O(n)
var Logger = function() {
  this.map = new Map();
};

Logger.prototype.shouldPrintMessage = function(timestamp, message) {
  if (this.map.has(message)) {
    if (timestamp < this.map.get(message) + 10) {
      return false;
    }
  }
  this.map.set(message, timestamp);
  return true;
};
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "monotonic-array",
      title: "Monotonic Array",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=oGKBhkzPATM&ab_channel=AlgoJS",
      body: `Badhta hai ya ghat-ta hai, dono me se ek hona chahiye — ek baar disha ulte to false.

[Monotonic Array](https://leetcode.com/problems/monotonic-array/)

\`\`\`js
// Time: O(n) · Space: O(1)
var isMonotonic = function(nums) {
  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      increasing = false;
    }
    if (nums[i] < nums[i + 1]) {
      decreasing = false;
    }
  }

  return increasing || decreasing;
};
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "roman-to-integer",
      title: "Roman to Integer",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=CwhpILAlfjg&ab_channel=AlgoJS",
      body: `Left se padho — agla bada ho to ghatao, nahi to jodo.

[Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

\`\`\`js
// Time: O(n) · Space: O(1)
var romanToInt = function(s) {
  const symbols = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    let curr = s[i];
    let next = s[i + 1];

    if (symbols[curr] < symbols[next]) {
      total -= symbols[curr];
    } else {
      total += symbols[curr];
    }
  }

  return total;
};
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "minimum-value-to-get-positive-step-by-step-sum",
      title: "Minimum Value to Get Positive Step by Step Sum",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=acIkZpmbiaA&ab_channel=AlgoJS",
      body: `Prefix sum ka minimum dekho — start utna rakho ki sabse neecha point bhi 1 se upar rahe.

[Minimum Value to Get Positive Step by Step Sum](https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/)

\`\`\`js
// Time: O(n) · Space: O(1)
var minStartValue = function(nums) {
  let sumUp = 0;
  let minSum = 1;

  for (let num of nums) {
    sumUp += num;
    minSum = Math.min(sumUp, minSum);
  }

  if (minSum > 0) return 1;

  return -1 * minSum + 1;
};
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "high-five",
      title: "High Five",
      diff: "Easy",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=H2l1DQk3yzY&ab_channel=AlgoJS",
      body: `Har id ke top 5 nikalo — sort karke pehle 5 ka average lo (integer division).

[High Five](https://leetcode.com/problems/high-five/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(n log n) · Space: O(n)
var highFive = function(items) {
  let scoresMap = {};

  for (let [id, score] of items) {
    if (!scoresMap[id]) {
      scoresMap[id] = [score];
    } else {
      scoresMap[id].push(score);
    }
  }

  let res = [];

  Object.keys(scoresMap).map((key) => {
    let values = scoresMap[key];
    values = values.sort((a, b) => b - a);

    let topFive = 0;
    for (let i = 0; i < 5; i++) {
      topFive += values[i];
    }

    let av = Math.floor(topFive / 5);
    res.push([key, av]);
  });

  return res;
};
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "two-sum",
      title: "Two Sum",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=lhbhk3dN10Q&ab_channel=AlgoJS",
      body: `I would remember each number’s index. When \`target - nums[i]\` is already in the map, I am done.

[Two Sum](https://leetcode.com/problems/two-sum/)

\`\`\`js
// Time: O(n) · Space: O(n)
// Hashing — complement
var twoSum = function(nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const compliment = target - nums[i];

    if (map.has(compliment)) {
      return [i, map.get(compliment)];
    } else {
      map.set(nums[i], i);
    }
  }
};
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "power-of-three",
      title: "Power of Three",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=JU0WpRP6YGQ&ab_channel=AlgoJS",
      body: `3 se divide karte jao — aakhir me 1 bache to power hai. Max power trick bhi chalti hai.

[Power of Three](https://leetcode.com/problems/power-of-three/)

\`\`\`js
// Time: O(log n) · Space: O(1)
var isPowerOfThree = function(n) {
  return n > 0 && (3 ** 19) % n === 0;
};
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "power-of-four",
      title: "Power of Four",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=m1Au_FuWSps&ab_channel=AlgoJS",
      body: `Power of two ho aur 1 odd position pe ho (mask 0x55555555) — dono shartein lagao.

[Power of Four](https://leetcode.com/problems/power-of-four/)

\`\`\`js
// Time: O(1) · Space: O(1)
var isPowerOfFour = function(n) {
  // log 2 is even return true;
  return n > 0 && Math.log2(n) % 2 === 0;
};
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "product-of-array-except-self",
      title: "Product of Array Except Self",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=vtgG0XFNUNM&ab_channel=AlgoJS",
      body: `Left-to-right: product of everything before \`i\`. Right-to-left: product of everything after \`i\`. Multiply. No division, so zeros are fine.

[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

\`\`\`js
// Time: O(n) · Space: O(1)
// Prefix / suffix products
var productExceptSelf = function(nums) {
  let res = [];
  let start = 1;

  for (let i = 0; i < nums.length; i++) {
    res.push(start);
    start = start * nums[i];
  }

  let start2 = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] = start2 * res[i];
    start2 = start2 * nums[i];
  }

  return res;
};
\`\`\``,
    },
    {
      id: 13,
      lcSlug: "best-time-to-buy-and-sell-stock-ii",
      title: "Best Time to Buy and Sell Stock II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Y0ql7woAZy8&ab_channel=AlgoJS",
      body: `Har chadhai becho — aaj kal se zyada ho to fark jod lo. Greedy yahin kaam karta hai.

[Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

\`\`\`js
// Time: O(n) · Space: O(1)
var maxProfit = function(prices) {
  let total = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      let diff = prices[i] - prices[i - 1];
      total += diff;
    }
  }

  return total;
};
\`\`\``,
    },
    {
      id: 14,
      lcSlug: "zigzag-conversion",
      title: "Zigzag Conversion",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=NH98IXTYyFU&ab_channel=AlgoJS",
      body: `Rows me upar-neeche chalao — direction disha badalte hi palto, aakhir me jod do.

[Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/)

\`\`\`js
// Time: O(n) · Space: O(n)
var convert = function(s, numRows) {
  if (numRows === 1 || s.length < numRows) return s;

  let direction = false;
  let count = 0;

  let arr = new Array(numRows).fill("");

  for (let i = 0; i < s.length; i++) {
    let curr = s[i];

    arr[count] += curr;
    if (count === 0 || count >= numRows - 1) direction = !direction;
    direction ? count++ : count--;
  }

  return arr.join("");
};
\`\`\``,
    },
    {
      id: 15,
      lcSlug: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=87f9RVChpzY&ab_channel=AlgoJS",
      body: `Count first. Then a min-heap of \`[freq, num]\` of size k.

[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

\`\`\`js
// Time: O(n log k) · Space: O(n)
var topKFrequent = function(nums, k) {
  let map = {};
  let bucket = [];
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = 1;
    } else {
      map[nums[i]]++;
    }
  }

  for (let [num, freq] of Object.entries(map)) {
    if (!bucket[freq]) {
      bucket[freq] = new Set().add(num);
    } else {
      bucket[freq] = bucket[freq].add(num);
    }
  }

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) break;
  }

  return result;
};
\`\`\``,
    },
    {
      id: 16,
      lcSlug: "can-place-flowers",
      title: "Can Place Flowers",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=FQDIUuWeukk&ab_channel=AlgoJS",
      body: `Khaali jagah dekho jiske dono padosi khaali hon — lagao, aage badho, n-1 pe ruko.

[Can Place Flowers](https://leetcode.com/problems/can-place-flowers/)

\`\`\`js
// Time: O(n) · Space: O(1)
var canPlaceFlowers = function(flowerbed, n) {
  let i = 0;
  while (i < flowerbed.length && n !== 0) {
    if (flowerbed[i] === 0 && flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1) {
      n--;
      i++;
    }
    i++;
  }
  return n === 0;
};
\`\`\``,
    },
    {
      id: 17,
      lcSlug: "find-the-winner-of-the-circular-game",
      title: "Find the Winner of the Circular Game",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=2XC_Va55d-w&ab_channel=AlgoJS",
      body: `Josephus problem — list se khatm karne ke bajaye formula lagao: f(n) = (f(n-1) + k) % n.

[Find the Winner of the Circular Game](https://leetcode.com/problems/find-the-winner-of-the-circular-game/)

\`\`\`js
// Time: O(n) · Space: O(n)
var findTheWinner = function(n, k) {
  let queue = [];

  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  while (queue.length > 1) {
    let toRemove = k - 1;
    while (toRemove > 0) {
      queue.push(queue.shift());
      toRemove--;
    }
    queue.shift();
  }

  return queue.shift();
};
\`\`\``,
    },
      ],
    },
  ],
};
