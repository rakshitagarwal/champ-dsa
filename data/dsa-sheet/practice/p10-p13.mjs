/** Phases 10–13 practice questions (ChampDSA roadmap). */
export const PRACTICE_P10_TO_P13 = {
  // —— PHASE 10 ——
  "p10-basics-local": {
    kind: "questions",
    questions: [
      {
        title: "Jump Game",
        url: "https://leetcode.com/problems/jump-game/",
        source: "LeetCode",
        hint: "Track farthest reachable; greedily extend while i ≤ farthest.",
      },
    ],
  },
  "p10-basics-sort": {
    kind: "questions",
    questions: [
      {
        title: "Assign Cookies",
        url: "https://leetcode.com/problems/assign-cookies/",
        source: "LeetCode",
        hint: "Sort both arrays; greedily satisfy smallest greed first.",
      },
    ],
  },
  "p10-basics-proof": {
    kind: "questions",
    questions: [
      {
        title: "Gas Station",
        url: "https://leetcode.com/problems/gas-station/",
        source: "LeetCode",
        hint: "If total gas ≥ total cost a solution exists; start after the worst prefix.",
      },
    ],
  },
  "p10-int-activity": {
    kind: "questions",
    questions: [
      {
        title: "Non-overlapping Intervals",
        url: "https://leetcode.com/problems/non-overlapping-intervals/",
        source: "LeetCode",
        hint: "Activity selection: sort by end, keep next compatible interval.",
      },
    ],
  },
  "p10-int-meeting": {
    kind: "questions",
    questions: [
      {
        title: "Meeting Rooms II",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
        source: "LeetCode",
        hint: "Greedy rooms via min-heap of end times (or sweep line).",
      },
    ],
  },
  "p10-int-nonoverlap": {
    kind: "questions",
    questions: [
      {
        title: "Non-overlapping Intervals",
        url: "https://leetcode.com/problems/non-overlapping-intervals/",
        source: "LeetCode",
        hint: "Remove fewest = keep most; sort by end and count conflicts.",
      },
    ],
  },
  "p10-int-arrows": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Number of Arrows to Burst Balloons",
        url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
        source: "LeetCode",
        hint: "Sort by end; one arrow at current end covers overlapping balloons.",
      },
    ],
  },
  "p10-sched-job": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Profit in Job Scheduling",
        url: "https://leetcode.com/problems/maximum-profit-in-job-scheduling/",
        source: "LeetCode",
        hint: "Sort by end; DP + binary search previous non-overlapping job.",
      },
    ],
  },
  "p10-sched-task": {
    kind: "questions",
    questions: [
      {
        title: "Task Scheduler",
        url: "https://leetcode.com/problems/task-scheduler/",
        source: "LeetCode",
        hint: "Idle slots driven by most frequent task; formula or simulation.",
      },
    ],
  },
  "p10-sched-platforms": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Platforms",
        url: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
        source: "GFG",
        hint: "Sort arrivals & departures; sweep to track current platforms needed.",
      },
    ],
  },
  "p10-sched-cpu": {
    kind: "questions",
    questions: [
      {
        title: "Single-Threaded CPU",
        url: "https://leetcode.com/problems/single-threaded-cpu/",
        source: "LeetCode",
        hint: "Sort by enqueue time; min-heap by processing time for available jobs.",
      },
    ],
  },
  "p10-heap-task": {
    kind: "questions",
    questions: [
      {
        title: "Task Scheduler",
        url: "https://leetcode.com/problems/task-scheduler/",
        source: "LeetCode",
        hint: "Max-heap of remaining frequencies with cooldown queue.",
      },
    ],
  },
  "p10-heap-ipo": {
    kind: "questions",
    questions: [
      {
        title: "IPO",
        url: "https://leetcode.com/problems/ipo/",
        source: "LeetCode",
        hint: "Unlock affordable projects into a profit max-heap; pick k times.",
      },
    ],
  },
  "p10-heap-cost": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Cost to Connect Sticks",
        url: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
        source: "LeetCode",
        hint: "Always combine two smallest sticks (min-heap).",
      },
    ],
  },
  "p10-heap-resource": {
    kind: "questions",
    questions: [
      {
        title: "Process Tasks Using Servers",
        url: "https://leetcode.com/problems/process-tasks-using-servers/",
        source: "LeetCode",
        hint: "Two heaps: free servers by weight/index, busy by free time.",
      },
    ],
  },
  "p10-other-jump": {
    kind: "questions",
    questions: [
      {
        title: "Jump Game II",
        url: "https://leetcode.com/problems/jump-game-ii/",
        source: "LeetCode",
        hint: "Greedy BFS-like ranges: end of current jump, farthest in window.",
      },
    ],
  },
  "p10-other-gas": {
    kind: "questions",
    questions: [
      {
        title: "Gas Station",
        url: "https://leetcode.com/problems/gas-station/",
        source: "LeetCode",
        hint: "Reset start when tank goes negative; check total gas ≥ cost.",
      },
    ],
  },
  "p10-other-candy": {
    kind: "questions",
    questions: [
      {
        title: "Candy",
        url: "https://leetcode.com/problems/candy/",
        source: "LeetCode",
        hint: "Two passes: left-to-right then right-to-left for rating peaks.",
      },
    ],
  },
  "p10-other-frac": {
    kind: "questions",
    questions: [
      {
        title: "Fractional Knapsack",
        url: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
        source: "GFG",
        hint: "Sort by value/weight; take full items then a fraction of next.",
      },
    ],
  },
  "p10-other-huffman": {
    kind: "questions",
    questions: [
      {
        title: "Huffman Encoding",
        url: "https://www.geeksforgeeks.org/problems/huffman-encoding/1",
        source: "GFG",
        hint: "Min-heap merge two smallest frequencies repeatedly; codes from tree.",
      },
    ],
  },
  "p10-other-ropes": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Cost of Ropes",
        url: "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1",
        source: "GFG",
        hint: "Connect two smallest repeatedly; sum costs.",
      },
    ],
  },

  // —— PHASE 11 ——
  "p11-basics-and": {
    kind: "questions",
    questions: [
      {
        title: "Bitwise AND of Numbers Range",
        url: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
        source: "LeetCode",
        hint: "Right-shift left/right until equal; bits that differ become 0 in AND range.",
      },
    ],
  },
  "p11-basics-or": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Flips to Make a OR b Equal to c",
        url: "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/",
        source: "LeetCode",
        hint: "Per bit of c: decide flips on a/b to match OR result.",
      },
    ],
  },
  "p11-basics-xor": {
    kind: "questions",
    questions: [
      {
        title: "Single Number",
        url: "https://leetcode.com/problems/single-number/",
        source: "LeetCode",
        hint: "XOR all numbers; duplicates cancel, unique remains.",
      },
    ],
  },
  "p11-basics-not": {
    kind: "questions",
    questions: [
      {
        title: "Complement of Base 10 Integer",
        url: "https://leetcode.com/problems/complement-of-base-10-integer/",
        source: "LeetCode",
        hint: "Flip bits up to the highest set bit (mask), not infinite ~.",
      },
    ],
  },
  "p11-basics-lshift": {
    kind: "questions",
    questions: [
      {
        title: "Number of 1 Bits",
        url: "https://leetcode.com/problems/number-of-1-bits/",
        source: "LeetCode",
        hint: "Practice shifts: n & 1, then n >>= 1 (or Brian Kernighan).",
      },
    ],
  },
  "p11-basics-rshift": {
    kind: "questions",
    questions: [
      {
        title: "Reverse Bits",
        url: "https://leetcode.com/problems/reverse-bits/",
        source: "LeetCode",
        hint: "Build result by shifting left and appending n's low bit repeatedly.",
      },
    ],
  },
  "p11-ops-check": {
    kind: "questions",
    questions: [
      {
        title: "Number of 1 Bits",
        url: "https://leetcode.com/problems/number-of-1-bits/",
        source: "LeetCode",
        hint: "Check bit i with (n >> i) & 1.",
      },
    ],
  },
  "p11-ops-set": {
    kind: "questions",
    questions: [
      {
        title: "Single Number II",
        url: "https://leetcode.com/problems/single-number-ii/",
        source: "LeetCode",
        hint: "Bit counting / state machines to set bits of the unique number.",
      },
    ],
  },
  "p11-ops-clear": {
    kind: "questions",
    questions: [
      {
        title: "Power of Two",
        url: "https://leetcode.com/problems/power-of-two/",
        source: "LeetCode",
        hint: "n & (n−1) clears lowest set bit; power of two has one bit.",
      },
    ],
  },
  "p11-ops-toggle": {
    kind: "questions",
    questions: [
      {
        title: "Complement of Base 10 Integer",
        url: "https://leetcode.com/problems/complement-of-base-10-integer/",
        source: "LeetCode",
        hint: "Toggle relevant bits via XOR with a mask of 1s.",
      },
    ],
  },
  "p11-ops-remove": {
    kind: "questions",
    questions: [
      {
        title: "Number of 1 Bits",
        url: "https://leetcode.com/problems/number-of-1-bits/",
        source: "LeetCode",
        hint: "Brian Kernighan: n &= (n−1) removes lowest set bit; count iterations.",
      },
    ],
  },
  "p11-xor-single": {
    kind: "questions",
    questions: [
      {
        title: "Single Number",
        url: "https://leetcode.com/problems/single-number/",
        source: "LeetCode",
        hint: "XOR fold of the array.",
      },
    ],
  },
  "p11-xor-missing": {
    kind: "questions",
    questions: [
      {
        title: "Missing Number",
        url: "https://leetcode.com/problems/missing-number/",
        source: "LeetCode",
        hint: "XOR all indices and values (or with 0..n).",
      },
    ],
  },
  "p11-xor-two": {
    kind: "questions",
    questions: [
      {
        title: "Single Number III",
        url: "https://leetcode.com/problems/single-number-iii/",
        source: "LeetCode",
        hint: "XOR all → bitmask; split numbers by a differing bit into two groups.",
      },
    ],
  },
  "p11-xor-range": {
    kind: "questions",
    questions: [
      {
        title: "XOR Queries of a Subarray",
        url: "https://leetcode.com/problems/xor-queries-of-a-subarray/",
        source: "LeetCode",
        hint: "Prefix XOR for O(1) range XOR.",
      },
    ],
  },
  "p11-count-set": {
    kind: "questions",
    questions: [
      {
        title: "Counting Bits",
        url: "https://leetcode.com/problems/counting-bits/",
        source: "LeetCode",
        hint: "DP: bits[i] = bits[i>>1] + (i&1).",
      },
    ],
  },
  "p11-count-pow2": {
    kind: "questions",
    questions: [
      {
        title: "Power of Two",
        url: "https://leetcode.com/problems/power-of-two/",
        source: "LeetCode",
        hint: "n>0 && (n & (n−1)) === 0.",
      },
    ],
  },
  "p11-count-pow4": {
    kind: "questions",
    questions: [
      {
        title: "Power of Four",
        url: "https://leetcode.com/problems/power-of-four/",
        source: "LeetCode",
        hint: "Power of two AND set bit only in even positions (mask 0x5555...).",
      },
    ],
  },
  "p11-count-hamming": {
    kind: "questions",
    questions: [
      {
        title: "Hamming Distance",
        url: "https://leetcode.com/problems/hamming-distance/",
        source: "LeetCode",
        hint: "Popcount of x XOR y.",
      },
    ],
  },
  "p11-mask-subsets": {
    kind: "questions",
    questions: [
      {
        title: "Subsets",
        url: "https://leetcode.com/problems/subsets/",
        source: "LeetCode",
        hint: "For mask in 0..(1<<n)-1, include i if bit i set.",
      },
    ],
  },
  "p11-mask-submask": {
    kind: "questions",
    questions: [
      {
        title: "Count Number of Maximum Bitwise-OR Subsets",
        url: "https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/",
        source: "LeetCode",
        hint: "Enumerate subsets/submasks; track max OR and count.",
      },
    ],
  },
  "p11-mask-state": {
    kind: "questions",
    questions: [
      {
        title: "Shortest Path Visiting All Nodes",
        url: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
        source: "LeetCode",
        hint: "BFS state = (node, visitedMask).",
      },
    ],
  },
  "p11-mask-dp": {
    kind: "questions",
    questions: [
      {
        title: "Partition to K Equal Sum Subsets",
        url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
        source: "LeetCode",
        hint: "Bitmask DP or backtracking with used mask over subset sums.",
      },
    ],
  },

  // —— PHASE 12 ——
  "p12-basics-insert": {
    kind: "questions",
    questions: [
      {
        title: "Implement Trie (Prefix Tree)",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        source: "LeetCode",
        hint: "Children map/array per node; mark endOfWord on insert.",
      },
    ],
  },
  "p12-basics-search": {
    kind: "questions",
    questions: [
      {
        title: "Implement Trie (Prefix Tree)",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        source: "LeetCode",
        hint: "Walk chars; search succeeds only if endOfWord at last node.",
      },
    ],
  },
  "p12-basics-starts": {
    kind: "questions",
    questions: [
      {
        title: "Implement Trie (Prefix Tree)",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        source: "LeetCode",
        hint: "startsWith = path exists (endOfWord optional).",
      },
    ],
  },
  "p12-basics-delete": {
    kind: "questions",
    questions: [
      {
        title: "Implement Trie (Prefix Tree)",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        source: "LeetCode",
        hint: "Delete: clear end flag / prune nodes with no children (careful with shared prefixes).",
      },
    ],
  },
  "p12-apps-prefix": {
    kind: "questions",
    questions: [
      {
        title: "Replace Words",
        url: "https://leetcode.com/problems/replace-words/",
        source: "LeetCode",
        hint: "Trie of dictionary roots; replace each word with shortest root prefix.",
      },
    ],
  },
  "p12-apps-dict": {
    kind: "questions",
    questions: [
      {
        title: "Design Add and Search Words Data Structure",
        url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        source: "LeetCode",
        hint: "Trie + DFS when '.' matches any child.",
      },
    ],
  },
  "p12-apps-lcp": {
    kind: "questions",
    questions: [
      {
        title: "Longest Common Prefix",
        url: "https://leetcode.com/problems/longest-common-prefix/",
        source: "LeetCode",
        hint: "Vertical scan or Trie depth until a branch splits.",
      },
    ],
  },
  "p12-apps-word": {
    kind: "questions",
    questions: [
      {
        title: "Word Search II",
        url: "https://leetcode.com/problems/word-search-ii/",
        source: "LeetCode",
        hint: "Trie of words + board DFS; prune dead Trie branches.",
      },
    ],
  },
  "p12-apps-auto": {
    kind: "questions",
    questions: [
      {
        title: "Search Suggestions System",
        url: "https://leetcode.com/problems/search-suggestions-system/",
        source: "LeetCode",
        hint: "Sort products or Trie; collect up to 3 suggestions per prefix.",
      },
    ],
  },
  "p12-bin-max": {
    kind: "questions",
    questions: [
      {
        title: "Maximum XOR of Two Numbers in an Array",
        url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        source: "LeetCode",
        hint: "Binary Trie of bits; greedily prefer opposite bit for max XOR.",
      },
    ],
  },
  "p12-bin-min": {
    kind: "questions",
    questions: [
      {
        title: "Maximum XOR With an Element From Array",
        url: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
        source: "LeetCode",
        hint: "Offline queries + binary Trie inserted by increasing m limit.",
      },
    ],
  },
  "p12-bin-pair": {
    kind: "questions",
    questions: [
      {
        title: "Maximum XOR of Two Numbers in an Array",
        url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        source: "LeetCode",
        hint: "Insert then query each number against the Trie for best pair XOR.",
      },
    ],
  },

  // —— PHASE 13 ——
  "p13-fund-state": {
    kind: "questions",
    questions: [
      {
        title: "Climbing Stairs",
        url: "https://leetcode.com/problems/climbing-stairs/",
        source: "LeetCode",
        hint: "State = steps to reach i; practice defining dp[i] clearly first.",
      },
    ],
  },
  "p13-fund-transition": {
    kind: "questions",
    questions: [
      {
        title: "House Robber",
        url: "https://leetcode.com/problems/house-robber/",
        source: "LeetCode",
        hint: "Transition: dp[i] = max(dp[i−1], dp[i−2]+nums[i]).",
      },
    ],
  },
  "p13-fund-base": {
    kind: "questions",
    questions: [
      {
        title: "Fibonacci Number",
        url: "https://leetcode.com/problems/fibonacci-number/",
        source: "LeetCode",
        hint: "Base cases dp[0]/dp[1] (or F(0)/F(1)) unlock the recurrence.",
      },
    ],
  },
  "p13-fund-memo": {
    kind: "questions",
    questions: [
      {
        title: "Climbing Stairs",
        url: "https://leetcode.com/problems/climbing-stairs/",
        source: "LeetCode",
        hint: "Top-down recursion + memo map/array for overlapping subproblems.",
      },
    ],
  },
  "p13-fund-tab": {
    kind: "questions",
    questions: [
      {
        title: "House Robber",
        url: "https://leetcode.com/problems/house-robber/",
        source: "LeetCode",
        hint: "Bottom-up loop filling dp from base cases.",
      },
    ],
  },
  "p13-fund-space": {
    kind: "questions",
    questions: [
      {
        title: "Climbing Stairs",
        url: "https://leetcode.com/problems/climbing-stairs/",
        source: "LeetCode",
        hint: "Only last two states needed — O(1) rolling variables.",
      },
    ],
  },
  "p13-1d-fib": {
    kind: "questions",
    questions: [
      {
        title: "Fibonacci Number",
        url: "https://leetcode.com/problems/fibonacci-number/",
        source: "LeetCode",
        hint: "Classic 1D DP / two variables.",
      },
    ],
  },
  "p13-1d-stairs": {
    kind: "questions",
    questions: [
      {
        title: "Climbing Stairs",
        url: "https://leetcode.com/problems/climbing-stairs/",
        source: "LeetCode",
        hint: "Ways(i) = ways(i−1)+ways(i−2).",
      },
    ],
  },
  "p13-1d-frog": {
    kind: "questions",
    questions: [
      {
        title: "Frog Jump",
        url: "https://leetcode.com/problems/frog-jump/",
        source: "LeetCode",
        hint: "DP/BFS on (index, lastJump); try jump−1, jump, jump+1.",
      },
    ],
  },
  "p13-1d-robber": {
    kind: "questions",
    questions: [
      {
        title: "House Robber",
        url: "https://leetcode.com/problems/house-robber/",
        source: "LeetCode",
        hint: "Cannot take adjacent houses — choose take vs skip.",
      },
    ],
  },
  "p13-1d-nonadj": {
    kind: "questions",
    questions: [
      {
        title: "House Robber",
        url: "https://leetcode.com/problems/house-robber/",
        source: "LeetCode",
        hint: "Maximum non-adjacent sum is the house robber pattern.",
      },
    ],
  },
  "p13-1d-cost": {
    kind: "questions",
    questions: [
      {
        title: "Min Cost Climbing Stairs",
        url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
        source: "LeetCode",
        hint: "dp[i] = cost[i] + min(dp[i−1], dp[i−2]).",
      },
    ],
  },
  "p13-grid-unique": {
    kind: "questions",
    questions: [
      {
        title: "Unique Paths",
        url: "https://leetcode.com/problems/unique-paths/",
        source: "LeetCode",
        hint: "dp[i][j] = dp[i−1][j] + dp[i][j−1].",
      },
    ],
  },
  "p13-grid-unique2": {
    kind: "questions",
    questions: [
      {
        title: "Unique Paths II",
        url: "https://leetcode.com/problems/unique-paths-ii/",
        source: "LeetCode",
        hint: "Same as unique paths; obstacles force dp = 0.",
      },
    ],
  },
  "p13-grid-min": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Path Sum",
        url: "https://leetcode.com/problems/minimum-path-sum/",
        source: "LeetCode",
        hint: "dp[i][j] = grid + min(from top, from left).",
      },
    ],
  },
  "p13-grid-obs": {
    kind: "questions",
    questions: [
      {
        title: "Unique Paths II",
        url: "https://leetcode.com/problems/unique-paths-ii/",
        source: "LeetCode",
        hint: "Treat obstacles as blocked cells in grid DP.",
      },
    ],
  },
  "p13-grid-dungeon": {
    kind: "questions",
    questions: [
      {
        title: "Dungeon Game",
        url: "https://leetcode.com/problems/dungeon-game/",
        source: "LeetCode",
        hint: "DP backward from princess: min HP needed entering each cell.",
      },
    ],
  },
  "p13-knap-01": {
    kind: "questions",
    questions: [
      {
        title: "0-1 Knapsack Problem",
        url: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
        source: "GFG",
        hint: "Classic 0/1: dp[w] = max(dp[w], dp[w−wt]+val) reverse iterate.",
      },
    ],
  },
  "p13-knap-unbounded": {
    kind: "questions",
    questions: [
      {
        title: "Coin Change II",
        url: "https://leetcode.com/problems/coin-change-ii/",
        source: "LeetCode",
        hint: "Unbounded: outer coins, inner amounts forward.",
      },
    ],
  },
  "p13-knap-subset": {
    kind: "questions",
    questions: [
      {
        title: "Partition Equal Subset Sum",
        url: "https://leetcode.com/problems/partition-equal-subset-sum/",
        source: "LeetCode",
        hint: "Subset-sum DP toward total/2.",
      },
    ],
  },
  "p13-knap-partition": {
    kind: "questions",
    questions: [
      {
        title: "Partition Equal Subset Sum",
        url: "https://leetcode.com/problems/partition-equal-subset-sum/",
        source: "LeetCode",
        hint: "If total odd impossible; else knapsack reach total/2.",
      },
    ],
  },
  "p13-knap-coin": {
    kind: "questions",
    questions: [
      {
        title: "Coin Change",
        url: "https://leetcode.com/problems/coin-change/",
        source: "LeetCode",
        hint: "Min coins DP: dp[x] = min over coins of 1+dp[x−c].",
      },
    ],
  },
  "p13-knap-coin2": {
    kind: "questions",
    questions: [
      {
        title: "Coin Change II",
        url: "https://leetcode.com/problems/coin-change-ii/",
        source: "LeetCode",
        hint: "Count combinations (order doesn't matter) with coin-outer loop.",
      },
    ],
  },
  "p13-knap-target": {
    kind: "questions",
    questions: [
      {
        title: "Target Sum",
        url: "https://leetcode.com/problems/target-sum/",
        source: "LeetCode",
        hint: "Reduce to subset sum: partition into +/− sets.",
      },
    ],
  },
  "p13-sub-lcs": {
    kind: "questions",
    questions: [
      {
        title: "Longest Common Subsequence",
        url: "https://leetcode.com/problems/longest-common-subsequence/",
        source: "LeetCode",
        hint: "2D DP: match → 1+diag; else max(skip either char).",
      },
    ],
  },
  "p13-sub-lis": {
    kind: "questions",
    questions: [
      {
        title: "Longest Increasing Subsequence",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/",
        source: "LeetCode",
        hint: "O(n²) DP or patience sorting / tails binary search O(n log n).",
      },
    ],
  },
  "p13-sub-lps": {
    kind: "questions",
    questions: [
      {
        title: "Longest Palindromic Subsequence",
        url: "https://leetcode.com/problems/longest-palindromic-subsequence/",
        source: "LeetCode",
        hint: "LCS(s, reverse(s)), or interval DP on i..j.",
      },
    ],
  },
  "p13-sub-distinct": {
    kind: "questions",
    questions: [
      {
        title: "Distinct Subsequences",
        url: "https://leetcode.com/problems/distinct-subsequences/",
        source: "LeetCode",
        hint: "dp[i][j] ways s[:i] forms t[:j].",
      },
    ],
  },
  "p13-sub-count": {
    kind: "questions",
    questions: [
      {
        title: "Number of Longest Increasing Subsequence",
        url: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
        source: "LeetCode",
        hint: "Alongside LIS length DP, track count of ways to reach that length.",
      },
    ],
  },
  "p13-str-edit": {
    kind: "questions",
    questions: [
      {
        title: "Edit Distance",
        url: "https://leetcode.com/problems/edit-distance/",
        source: "LeetCode",
        hint: "dp insert/delete/replace; classic Levenshtein recurrence.",
      },
    ],
  },
  "p13-str-break": {
    kind: "questions",
    questions: [
      {
        title: "Word Break",
        url: "https://leetcode.com/problems/word-break/",
        source: "LeetCode",
        hint: "dp[i] true if some word ends at i and dp[start] true.",
      },
    ],
  },
  "p13-str-pal-part": {
    kind: "questions",
    questions: [
      {
        title: "Palindrome Partitioning",
        url: "https://leetcode.com/problems/palindrome-partitioning/",
        source: "LeetCode",
        hint: "Backtracking + isPalindrome checks (or DP cuts for min cuts variant).",
      },
    ],
  },
  "p13-str-wildcard": {
    kind: "questions",
    questions: [
      {
        title: "Wildcard Matching",
        url: "https://leetcode.com/problems/wildcard-matching/",
        source: "LeetCode",
        hint: "DP for '?' and '*'; '*' can match empty or extend previous.",
      },
    ],
  },
  "p13-stock-one": {
    kind: "questions",
    questions: [
      {
        title: "Best Time to Buy and Sell Stock",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        source: "LeetCode",
        hint: "Track min price so far; max profit = price − min.",
      },
    ],
  },
  "p13-stock-unlimited": {
    kind: "questions",
    questions: [
      {
        title: "Best Time to Buy and Sell Stock II",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
        source: "LeetCode",
        hint: "Sum all upward adjacent differences (or hold/cash DP).",
      },
    ],
  },
  "p13-stock-k": {
    kind: "questions",
    questions: [
      {
        title: "Best Time to Buy and Sell Stock IV",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
        source: "LeetCode",
        hint: "DP by transaction count k: hold vs cash states.",
      },
    ],
  },
  "p13-stock-cooldown": {
    kind: "questions",
    questions: [
      {
        title: "Best Time to Buy and Sell Stock with Cooldown",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
        source: "LeetCode",
        hint: "States: hold, sold (cooldown), rest — transition carefully.",
      },
    ],
  },
  "p13-stock-fee": {
    kind: "questions",
    questions: [
      {
        title: "Best Time to Buy and Sell Stock with Transaction Fee",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
        source: "LeetCode",
        hint: "Unlimited transactions DP; subtract fee when selling.",
      },
    ],
  },
  "p13-int-mcm": {
    kind: "questions",
    questions: [
      {
        title: "Burst Balloons",
        url: "https://leetcode.com/problems/burst-balloons/",
        source: "LeetCode",
        hint: "Interval DP cousin of MCM: decide last burst in (L,R).",
      },
    ],
  },
  "p13-int-burst": {
    kind: "questions",
    questions: [
      {
        title: "Burst Balloons",
        url: "https://leetcode.com/problems/burst-balloons/",
        source: "LeetCode",
        hint: "Pad 1s; dp[l][r] max coins bursting open interval.",
      },
    ],
  },
  "p13-int-pal": {
    kind: "questions",
    questions: [
      {
        title: "Palindrome Partitioning II",
        url: "https://leetcode.com/problems/palindrome-partitioning-ii/",
        source: "LeetCode",
        hint: "DP min cuts; precompute palindrome table for substrings.",
      },
    ],
  },
  "p13-int-partition": {
    kind: "questions",
    questions: [
      {
        title: "Partition Array for Maximum Sum",
        url: "https://leetcode.com/problems/partition-array-for-maximum-sum/",
        source: "LeetCode",
        hint: "dp[i] = max over last partition length ≤ k ending at i.",
      },
    ],
  },
  "p13-tree-binary": {
    kind: "questions",
    questions: [
      {
        title: "Binary Tree Maximum Path Sum",
        url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        source: "LeetCode",
        hint: "Tree DP: return gain upward; update global for path through node.",
      },
    ],
  },
  "p13-tree-robber": {
    kind: "questions",
    questions: [
      {
        title: "House Robber III",
        url: "https://leetcode.com/problems/house-robber-iii/",
        source: "LeetCode",
        hint: "Each node returns [rob, skip] pair from children.",
      },
    ],
  },
  "p13-tree-mis": {
    kind: "questions",
    questions: [
      {
        title: "House Robber III",
        url: "https://leetcode.com/problems/house-robber-iii/",
        source: "LeetCode",
        hint: "Maximum independent set on a tree ≈ rob/skip DP.",
      },
    ],
  },
  "p13-tree-reroot": {
    kind: "questions",
    questions: [
      {
        title: "Sum of Distances in Tree",
        url: "https://leetcode.com/problems/sum-of-distances-in-tree/",
        source: "LeetCode",
        hint: "Two DFS: subtree sizes, then reroot formula to all nodes.",
      },
    ],
  },
  "p13-bm-tsp": {
    kind: "questions",
    questions: [
      {
        title: "Find the Shortest Superstring",
        url: "https://leetcode.com/problems/find-the-shortest-superstring/",
        source: "LeetCode",
        hint: "Bitmask TSP-style DP over subsets of strings.",
      },
    ],
  },
  "p13-bm-assign": {
    kind: "questions",
    questions: [
      {
        title: "Shortest Path Visiting All Nodes",
        url: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
        source: "LeetCode",
        hint: "Assignment/TSP flavor: BFS on (node, mask).",
      },
    ],
  },
  "p13-bm-subset": {
    kind: "questions",
    questions: [
      {
        title: "Partition to K Equal Sum Subsets",
        url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
        source: "LeetCode",
        hint: "Subset DP / bitmask over filled buckets.",
      },
    ],
  },
  "p13-bm-compress": {
    kind: "questions",
    questions: [
      {
        title: "Shortest Path Visiting All Nodes",
        url: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
        source: "LeetCode",
        hint: "State compression = encode visited set in an int mask.",
      },
    ],
  },
  "p13-adv-digit": {
    kind: "questions",
    questions: [
      {
        title: "Numbers At Most N Given Digit Set",
        url: "https://leetcode.com/problems/numbers-at-most-n-given-digit-set/",
        source: "LeetCode",
        hint: "Digit DP by length and tight prefix vs N.",
      },
    ],
  },
  "p13-adv-dag": {
    kind: "questions",
    questions: [
      {
        title: "Longest Increasing Path in a Matrix",
        url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
        source: "LeetCode",
        hint: "Memoized DFS on DAG of increasing cells.",
      },
    ],
  },
  "p13-adv-mono": {
    kind: "questions",
    questions: [
      {
        title: "Jump Game VI",
        url: "https://leetcode.com/problems/jump-game-vi/",
        source: "LeetCode",
        hint: "DP + monotonic deque of best previous scores in window k.",
      },
    ],
  },
  "p13-adv-opt": {
    kind: "questions",
    questions: [
      {
        title: "Burst Balloons",
        url: "https://leetcode.com/problems/burst-balloons/",
        source: "LeetCode",
        hint: "Interval DP is the gateway to more advanced DP optimizations.",
      },
    ],
  },
  "p13-adv-dac": {
    kind: "questions",
    questions: [
      {
        title: "Split Array Largest Sum",
        url: "https://leetcode.com/problems/split-array-largest-sum/",
        source: "LeetCode",
        hint: "Binary search on answer (related family to D&C DP optimizations).",
      },
    ],
  },
  "p13-adv-knuth": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Cost to Cut a Stick",
        url: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
        source: "LeetCode",
        hint: "Interval DP on cuts; Knuth optimization applies to similar recurrences.",
      },
    ],
  },
  "p13-adv-cht": {
    kind: "questions",
    questions: [
      {
        title: "Funny Functions / CHT practice (GFG)",
        url: "https://www.geeksforgeeks.org/convex-hull-trick/",
        source: "GFG",
        hint: "When DP transition is min over lines mx+b, maintain a convex hull of lines.",
      },
    ],
  },
};
