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
// Greedy reach — never need to simulate every jump path
// LC: https://leetcode.com/problems/jump-game/
function canJump(nums) {
  let reach = 0; // Farthest index reachable from index 0 so far
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false; // Stepped past what any prior jump could reach
    reach = Math.max(reach, i + nums[i]); // From i, extend furthest landing
  }
  return true; // Last index is within reach
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
// BFS-style layers: each jump expands the window [0..end]
// LC: https://leetcode.com/problems/jump-game-ii/
function jump(nums) {
  let jumps = 0, end = 0, far = 0; // end = last index of current jump layer
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]); // Best reach seen inside this layer
    if (i === end) {
      jumps++; // Must consume one jump to leave this layer
      end = far; // Next layer ends at farthest we saw
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
// If total surplus >= 0, exactly one valid start exists
// LC: https://leetcode.com/problems/gas-station/
function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0; // tank = surplus on current candidate start
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i]; // Net at station i
    total += d; // Global feasibility check
    tank += d;
    if (tank < 0) {
      start = i + 1; // Cannot start at or before i — try next index
      tank = 0; // Reset partial circuit surplus
    }
  }
  return total < 0 ? -1 : start; // Negative total means impossible
}
\`\`\``,
    },
    {
      id: 122,
      lcSlug: "best-time-to-buy-and-sell-stock-ii",
      title: "Best Time to Buy and Sell Stock II",
      diff: "Medium",
      body: `Capture every upward day’s profit — sum each \`prices[i] - prices[i-1]\` when price rises. Equivalent to buying before every rise.

[Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

\`\`\`js
// Capture every upward day — equivalent to buy low sell high on each rise
// LC: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
function maxProfit(prices) {
  let ans = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) ans += prices[i] - prices[i - 1]; // Add today's gain if price rose
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
      body: `Sort by height descending (then by \`k\`). Insert each person at index \`k\` in the built queue — taller people first so shorter inserts do not shift counts.

[Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/)

\`\`\`js
// Taller people first — shorter inserts do not shift taller people's k counts
// LC: https://leetcode.com/problems/queue-reconstruction-by-height/
function reconstructQueue(people) {
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]); // Height desc, then k asc
  const out = [];
  for (const p of people) out.splice(p[1], 0, p); // Insert at k-th position in current queue
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
// A partition must include every last occurrence of letters seen so far
// LC: https://leetcode.com/problems/partition-labels/
function partitionLabels(s) {
  const last = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i; // Rightmost index per letter
  const out = [];
  let start = 0, end = 0; // Current partition bounds
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]); // Extend end to cover this letter's last spot
    if (i === end) {
      out.push(end - start + 1); // Closed a valid partition
      start = i + 1; // Next partition starts after i
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
      body: `Pay city A for everyone first, then send the n people with largest \`(costB - costA)\` savings to city B instead.

[Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/)

\`\`\`js
// Pay everyone city A first; swap cheapest B-savings for half the people
// LC: https://leetcode.com/problems/two-city-scheduling/
function twoCitySchedCost(costs) {
  costs.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0])); // Largest B-minus-A discount first
  let ans = 0;
  const n = costs.length / 2; // Exactly n people must fly to B
  for (let i = 0; i < costs.length; i++) {
    ans += i < n ? costs[i][1] : costs[i][0]; // First half to B, rest stay on A pricing
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
      body: `Track $5 and $10 bills in the drawer. For a $20, prefer change as $10+$5; otherwise use three $5s.

[Lemonade Change](https://leetcode.com/problems/lemonade-change/)

\`\`\`js
// Greedy change: prefer giving one $10 when paying back $20
// LC: https://leetcode.com/problems/lemonade-change/
function lemonadeChange(bills) {
  let five=0, ten=0; // Count of $5 and $10 bills in drawer
  for(const b of bills){
    if(b===5) five++; // Customer pays exact — no change
    else if(b===10){ if(!five) return false; five--; ten++; } // Need one $5 as change
    else { // $20 bill
      if(ten && five){ ten--; five--; } // Best: $10 + $5 change
      else if(five>=3) five-=3; // Fallback: three $5 bills
      else return false; // Cannot make $15 change
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
      body: `Two passes: left-to-right enforce higher-than-left neighbor, then right-to-left for the right rule; take the max requirement at each index.

[Candy](https://leetcode.com/problems/candy/)

\`\`\`js
// Two-pass greedy satisfies both left and right neighbor constraints
// LC: https://leetcode.com/problems/candy/
function candy(ratings) {
  const n = ratings.length, give = Array(n).fill(1); // Everyone gets at least one
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) give[i] = give[i - 1] + 1; // Left neighbor rule
  }
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1] && give[i] <= give[i + 1]) {
      give[i] = give[i + 1] + 1; // Right neighbor rule — take max with left pass
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
      body: `Count turning points in the sequence — ignore flat steps; increment when the up/down direction changes.

[Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence/)

\`\`\`js
// Count turning points; flat steps do not change direction
// LC: https://leetcode.com/problems/wiggle-subsequence/
function wiggleMaxLength(nums) {
  if (nums.length < 2) return nums.length;
  let dir = 0, ans = 1; // dir: -1 down, +1 up, 0 unset
  for (let i = 1; i < nums.length; i++) {
    const d = nums[i] > nums[i - 1] ? 1 : nums[i] < nums[i - 1] ? -1 : 0;
    if (d !== 0 && d !== dir) { ans++; dir = d; } // New peak or valley extends subsequence
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
      body: `Sort box types by units per box descending. Take as many boxes as truck capacity allows from the best types first.

[Maximum Units on a Truck](https://leetcode.com/problems/maximum-units-on-a-truck/)

\`\`\`js
// Fractional knapsack on box types — take highest units-per-box first
// LC: https://leetcode.com/problems/maximum-units-on-a-truck/
function maximumUnits(boxTypes, truckSize) {
  boxTypes.sort((a, b) => b[1] - a[1]); // Sort by units per box descending
  let ans = 0;
  for (const [boxes, units] of boxTypes) {
    const take = Math.min(boxes, truckSize); // Use as many boxes as capacity allows
    ans += take * units;
    truckSize -= take;
    if (truckSize === 0) break; // Truck full — stop early
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};
