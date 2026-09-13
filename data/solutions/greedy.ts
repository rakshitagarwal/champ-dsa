import type { SolutionGroup } from "./types";

export const GREEDY_SOLUTIONS: SolutionGroup = {
  id: "greedy",
  title: "Greedy",
  subs: [
    {
      title: "Classic Greedy",
      topics: [
    {
      id: 55,
      lcSlug: "jump-game",
      title: "Jump Game",
      diff: "Medium",
      body: `I track the farthest index I can still reach. If I walk past that, I am stuck.

[Jump Game](https://leetcode.com/problems/jump-game/)

\`\`\`js
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — running max reach
// LC: https://leetcode.com/problems/jump-game/
function canJump(nums) {
  // Hinglish: step 1 — base case check karo
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
\`\`\``,
    },
    {
      id: 45,
      lcSlug: "jump-game-ii",
      title: "Jump Game II",
      diff: "Medium",
      body: `I jump in windows: current end of this jump, farthest I can see. When i hits the end, I must jump, and the new end is that farthest.

[Jump Game II](https://leetcode.com/problems/jump-game-ii/)

\`\`\`js
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — jumps by window
// LC: https://leetcode.com/problems/jump-game-ii/
function jump(nums) {
  // Hinglish: step 1 — base case check karo
  let jumps = 0, end = 0, far = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    if (i === end) {
      jumps++;
      end = far;
    }
  }
  return jumps;
}
\`\`\``,
    },
    {
      id: 134,
      lcSlug: "gas-station",
      title: "Gas Station",
      diff: "Medium",
      body: `If total gas < total cost, impossible. Otherwise the unique start is the station after the worst prefix (tank went negative, reset).

[Gas Station](https://leetcode.com/problems/gas-station/)

\`\`\`js
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — unique start if total works
// LC: https://leetcode.com/problems/gas-station/
function canCompleteCircuit(gas, cost) {
  // Hinglish: step 1 — base case check karo
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i];
    total += d;
    tank += d;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total < 0 ? -1 : start;
}
\`\`\``,
    },
    {
      id: 122,
      lcSlug: "best-time-to-buy-and-sell-stock-ii",
      title: "Best Time to Buy and Sell Stock II",
      diff: "Medium",
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
      id: 406,
      lcSlug: "queue-reconstruction-by-height",
      title: "Queue Reconstruction by Height",
      diff: "Medium",
      body: `Lambe pehle lagao, phir har banda apne k index pe ghuse — lamba pehle hone se ginati bigadti nahi.

[Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/)

\`\`\`js
// Hinglish: lamba pehle — ek-ek step comment dekho
// LC: https://leetcode.com/problems/queue-reconstruction-by-height/
function reconstructQueue(people) {
  // Hinglish: step 1 — lamba pehle, k chhota pehle
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  const out = [];
  for (const p of people) out.splice(p[1], 0, p); // Hinglish: k index pe ghusao
  return out;
}
\`\`\``,
    },
    {
      id: 763,
      lcSlug: "partition-labels",
      title: "Partition Labels",
      diff: "Medium",
      body: `Last index of each letter. Grow \`end\` to that last index while I scan. When i hits end, that is one part.

[Partition Labels](https://leetcode.com/problems/partition-labels/)

\`\`\`js
// Hinglish: local best lo — ek-ek step comment dekho
// Greedy — last occurrence of each letter
// LC: https://leetcode.com/problems/partition-labels/
function partitionLabels(s) {
  // Hinglish: step 1 — base case check karo
  const last = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i;
  const out = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]);
    if (i === end) {
      out.push(end - start + 1);
      start = i + 1;
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 1029,
      lcSlug: "two-city-scheduling",
      title: "Two City Scheduling",
      diff: "Medium",
      body: `Sabko A bhejo, phir fark (costB-costA) se saste N ko B bhejo. Saving greedy hai.

[Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/)

\`\`\`js
// Hinglish: fark se chuno — ek-ek step comment dekho
// LC: https://leetcode.com/problems/two-city-scheduling/
function twoCitySchedCost(costs) {
  // Hinglish: step 1 — fark se sort karo
  costs.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0])); // Hinglish: B sasta pehle
  let ans = 0;
  const n = costs.length / 2;
  for (let i = 0; i < costs.length; i++) {
    ans += i < n ? costs[i][1] : costs[i][0]; // Hinglish: pehle aadhe B, baaki A
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 860,
      lcSlug: "lemonade-change",
      title: "Lemonade Change",
      diff: "Easy",
      body: `5,10,20 notes. Greedy: 20 aaye to 10+5 do, nahi to 5+5+5.

[Lemonade Change](https://leetcode.com/problems/lemonade-change/)

\`\`\`js
// Hinglish: local best lo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/lemonade-change/
function lemonadeChange(bills) {
  // Hinglish: 5 aur 10 ka count
  let five=0, ten=0;
  for(const b of bills){
    if(b===5) five++; // Hinglish: 5 aaya
    else if(b===10){ if(!five) return false; five--; ten++; } // Hinglish: 5 do
    else { // 20
      if(ten && five){ ten--; five--; } // Hinglish: 10+5 best
      else if(five>=3) five-=3; // Hinglish: 5x3
      else return false;
    }
  }
  return true;
}
\`\`\``,
    },
    {
      id: 135,
      lcSlug: "candy",
      title: "Candy",
      diff: "Hard",
      body: `Do pass — left se badhao, right se badhao, max lo. Padosi rule dono taraf se lagta hai.

[Candy](https://leetcode.com/problems/candy/)

\`\`\`js
// Hinglish: dono taraf se baanto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/candy/
function candy(ratings) {
  // Hinglish: step 1 — sabko 1 do
  const n = ratings.length, give = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) give[i] = give[i - 1] + 1; // Hinglish: left se zyada
  }
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1] && give[i] <= give[i + 1]) {
      give[i] = give[i + 1] + 1; // Hinglish: right se zyada
    }
  }
  return give.reduce((a, b) => a + b, 0);
}
\`\`\``,
    },
    {
      id: 376,
      lcSlug: "wiggle-subsequence",
      title: "Wiggle Subsequence",
      diff: "Medium",
      body: `Up-down-up chalao — direction badle to count badhao. Barabar ignore karo.

[Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence/)

\`\`\`js
// Hinglish: direction gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/wiggle-subsequence/
function wiggleMaxLength(nums) {
  // Hinglish: step 1 — direction lo
  if (nums.length < 2) return nums.length;
  let dir = 0, ans = 1;
  for (let i = 1; i < nums.length; i++) {
    const d = nums[i] > nums[i - 1] ? 1 : nums[i] < nums[i - 1] ? -1 : 0;
    if (d !== 0 && d !== dir) { ans++; dir = d; } // Hinglish: muda to gino
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 1710,
      lcSlug: "maximum-units-on-a-truck",
      title: "Maximum Units on a Truck",
      diff: "Easy",
      body: `Units/box zyada wala pehle lo — truck bhare tab tak bharo. Sorting greedy hai.

[Maximum Units on a Truck](https://leetcode.com/problems/maximum-units-on-a-truck/)

\`\`\`js
// Hinglish: mehenga maal pehle — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-units-on-a-truck/
function maximumUnits(boxTypes, truckSize) {
  // Hinglish: step 1 — units se sort karo
  boxTypes.sort((a, b) => b[1] - a[1]);
  let ans = 0;
  for (const [boxes, units] of boxTypes) {
    const take = Math.min(boxes, truckSize); // Hinglish: jitna sama sake
    ans += take * units;
    truckSize -= take;
    if (truckSize === 0) break;
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};
