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
// Hinglish: array ko in-place modify — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices) {
  // Hinglish: sabse kam price yaad rakho
  let best = 0, minPrice = Infinity;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p); // Hinglish: sasta mila to update
    best = Math.max(best, p - minPrice); // Hinglish: bech ke dekho profit
  }
  return best;
}
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
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/contains-duplicate/
function containsDuplicate(nums) {
  // Hinglish: set me pehle se hai kya?
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true; // Hinglish: duplicate mil gaya
    seen.add(x); // Hinglish: yaad rakho
  }
  return false;
}
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
// Hinglish: pichhli row se banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/pascals-triangle/
function generate(numRows) {
  // Hinglish: step 1 — pehli row lo
  const out = [[1]];
  for (let r = 1; r < numRows; r++) {
    const row = [1];
    for (let c = 1; c < r; c++) row.push(out[r - 1][c - 1] + out[r - 1][c]); // Hinglish: upar dono jodo
    row.push(1);
    out.push(row);
  }
  return out;
}
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
// Hinglish: time yaad rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/logger-rate-limiter/ (Premium)
function Logger() {
  // Hinglish: step 1 — map lo
  this.last = new Map();
}
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  if (this.last.has(message) && timestamp - this.last.get(message) < 10) {
    return false; // Hinglish: 10 sec nahi hue
  }
  this.last.set(message, timestamp); // Hinglish: time note karo
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
// Hinglish: disha check karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/monotonic-array/
function isMonotonic(nums) {
  // Hinglish: step 1 — flags lo
  let up = false, down = false;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = true; // Hinglish: upar gaya
    if (nums[i] < nums[i - 1]) down = true; // Hinglish: neeche gaya
    if (up && down) return false; // Hinglish: dono hue to gadbad
  }
  return true;
}
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
// Hinglish: aage dekh ke jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/roman-to-integer/
function romanToInt(s) {
  // Hinglish: step 1 — map banao
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && v[s[i]] < v[s[i + 1]]) ans -= v[s[i]]; // Hinglish: chhota pehle to ghatao
    else ans += v[s[i]]; // Hinglish: nahi to jodo
  }
  return ans;
}
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
// Hinglish: sabse neecha dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/
function minStartValue(nums) {
  // Hinglish: step 1 — prefix chalao
  let sum = 0, mn = 0;
  for (const x of nums) {
    sum += x;
    if (sum < mn) mn = sum; // Hinglish: sabse neecha yaad rakho
  }
  return 1 - mn; // Hinglish: itna start do ki 1 se neeche na jaye
}
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
// Hinglish: top 5 ka average — ek-ek step comment dekho
// LC: https://leetcode.com/problems/high-five/ (Premium)
function highFive(items) {
  // Hinglish: step 1 — id se jodo
  const map = new Map();
  for (const [id, score] of items) {
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(score);
  }
  const out = [];
  for (const [id, scores] of map) {
    scores.sort((a, b) => b - a); // Hinglish: bada pehle
    let s = 0;
    for (let i = 0; i < 5; i++) s += scores[i];
    out.push([id, Math.floor(s / 5)]); // Hinglish: average nikalo
  }
  return out;
}
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
// Hinglish: map me yaad rakho — ek-ek step comment dekho
// Hashing — complement
// LC: https://leetcode.com/problems/two-sum/
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i]; // Hinglish: saathi mila kya?
    seen.set(nums[i], i); // Hinglish: yaad rakho
  }
}
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
// Hinglish: divide karte jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/power-of-three/
function isPowerOfThree(n) {
  // Hinglish: step 1 — chhota ya zero hatao
  if (n < 1) return false;
  while (n % 3 === 0) n = Math.floor(n / 3); // Hinglish: 3 se kaato
  return n === 1; // Hinglish: 1 bacha to power hai
}
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
// Hinglish: do shart lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/power-of-four/
function isPowerOfFour(n) {
  // Hinglish: step 1 — power of two check karo
  if (n <= 0 || (n & (n - 1)) !== 0) return false; // Hinglish: single bit hona chahiye
  return (n & 1431655765) !== 0; // Hinglish: 1 odd position pe hona chahiye
}
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
// Hinglish: prefix jod — ek-ek step comment dekho
// Prefix / suffix products
// LC: https://leetcode.com/problems/product-of-array-except-self/
function productExceptSelf(nums) {
  // Hinglish: step 1 — base case check karo
  const n = nums.length, out = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    out[i] *= left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= right;
    right *= nums[i];
  }
  return out;
}
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
// Hinglish: chadhai becho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
function maxProfit(prices) {
  // Hinglish: step 1 — din gin lo
  let ans = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) ans += prices[i] - prices[i - 1]; // Hinglish: upar gaya to kamao
  }
  return ans;
}
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
// Hinglish: upar-neeche chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/zigzag-conversion/
function convert(s, numRows) {
  // Hinglish: step 1 — ek row ho to wapas do
  if (numRows === 1) return s;
  const rows = Array.from({ length: numRows }, () => "");
  let r = 0, dir = 1;
  for (const ch of s) {
    rows[r] += ch; // Hinglish: is row me daalo
    if (r === 0) dir = 1;
    if (r === numRows - 1) dir = -1; // Hinglish: disha palto
    r += dir;
  }
  return rows.join("");
}
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
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — by frequency
// LC: https://leetcode.com/problems/top-k-frequent-elements/
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
  const h = [];
  const less = (a, b) => a[0] < b[0];
  for (const [num, f] of freq) {
    heapPush(h, [f, num], less); // Hinglish: heap me daalo
    if (h.length > k) heapPop(h, less); // Hinglish: sabse chhota nikala
  }
  return h.map(([, num]) => num);
}

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
      id: 16,
      lcSlug: "can-place-flowers",
      title: "Can Place Flowers",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=FQDIUuWeukk&ab_channel=AlgoJS",
      body: `Khaali jagah dekho jiske dono padosi khaali hon — lagao, aage badho, n-1 pe ruko.

[Can Place Flowers](https://leetcode.com/problems/can-place-flowers/)

\`\`\`js
// Hinglish: padosi check karke lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/can-place-flowers/
function canPlaceFlowers(flowerbed, n) {
  // Hinglish: step 1 — har jagah check karo
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      const left = i === 0 || flowerbed[i - 1] === 0; // Hinglish: left khaali?
      const right = i === flowerbed.length - 1 || flowerbed[i + 1] === 0; // Hinglish: right khaali?
      if (left && right) {
        flowerbed[i] = 1; // Hinglish: lagao
        n--;
        if (n === 0) return true;
      }
    }
  }
  return n <= 0;
}
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
// Hinglish: formula lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-the-winner-of-the-circular-game/
function findTheWinner(n, k) {
  // Hinglish: step 1 — chhote se banao
  let winner = 0; // Hinglish: 1 bande me wahi jeetta (0-indexed)
  for (let i = 2; i <= n; i++) {
    winner = (winner + k) % i; // Hinglish: circle badhne pe jagah badlo
  }
  return winner + 1; // Hinglish: 1-indexed wapas do
}
\`\`\``,
    },
      ],
    },
  ],
};
