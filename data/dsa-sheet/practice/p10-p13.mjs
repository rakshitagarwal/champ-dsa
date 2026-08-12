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
      {
        title: "Can Place Flowers",
        url: "https://leetcode.com/problems/can-place-flowers/",
        source: "LeetCode",
        hint: "Make each locally safe placement and update neighboring availability.",
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
      {
        title: "Boats to Save People",
        url: "https://leetcode.com/problems/boats-to-save-people/",
        source: "LeetCode",
        hint: "Sort first so the greedy extreme pairing is provably safe.",
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
      {
        title: "Jump Game",
        url: "https://leetcode.com/problems/jump-game/",
        source: "LeetCode",
        hint: "Prove that retaining only the farthest reachable index dominates earlier choices.",
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
      {
        title: "Minimum Number of Arrows to Burst Balloons",
        url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
        source: "LeetCode",
        hint: "Earliest finishing endpoints leave maximum room for later choices.",
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
      {
        title: "Meeting Rooms",
        url: "https://leetcode.com/problems/meeting-rooms/",
        source: "LeetCode",
        hint: "Sort starts and reject any meeting that begins before the previous one ends.",
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
      {
        title: "Minimum Number of Arrows to Burst Balloons",
        url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
        source: "LeetCode",
        hint: "Earliest finishing endpoints leave maximum room for later choices.",
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
      {
        title: "Non-overlapping Intervals",
        url: "https://leetcode.com/problems/non-overlapping-intervals/",
        source: "LeetCode",
        hint: "The same earliest-end greedy choice maximizes compatible intervals.",
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
      {
        title: "Minimum Difficulty of a Job Schedule",
        url: "https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/",
        source: "LeetCode",
        hint: "Partition jobs by day while tracking each segment's maximum difficulty.",
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
      {
        title: "Reorganize String",
        url: "https://leetcode.com/problems/reorganize-string/",
        source: "LeetCode",
        hint: "Schedule the most frequent available item while preventing adjacent reuse.",
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
      {
        title: "Meeting Rooms II",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
        source: "LeetCode",
        hint: "A sweep of starts and ends counts simultaneous resource demand.",
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
      {
        title: "Task Scheduler",
        url: "https://leetcode.com/problems/task-scheduler/",
        source: "LeetCode",
        hint: "Contrast arrival-time heap simulation with cooldown-constrained scheduling.",
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
      {
        title: "Reorganize String",
        url: "https://leetcode.com/problems/reorganize-string/",
        source: "LeetCode",
        hint: "Use a max-heap and delay the previously chosen character.",
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
      {
        title: "Maximum Performance of a Team",
        url: "https://leetcode.com/problems/maximum-performance-of-a-team/",
        source: "LeetCode",
        hint: "Sort by one dimension and retain the best feasible values in a heap.",
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
      {
        title: "Minimum Cost of Ropes",
        url: "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1",
        source: "GFG",
        hint: "Pop and combine the two smallest lengths until one rope remains.",
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
      {
        title: "Meeting Rooms III",
        url: "https://leetcode.com/problems/meeting-rooms-iii/",
        source: "LeetCode",
        hint: "Coordinate free-resource and busy-until heaps during simulation.",
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
      {
        title: "Jump Game",
        url: "https://leetcode.com/problems/jump-game/",
        source: "LeetCode",
        hint: "Track the farthest reachable boundary before minimizing jump count.",
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
      {
        title: "Maximum Sum Circular Subarray",
        url: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
        source: "LeetCode",
        hint: "Circular prefix reasoning helps identify a viable restart point.",
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
      {
        title: "Wiggle Subsequence",
        url: "https://leetcode.com/problems/wiggle-subsequence/",
        source: "LeetCode",
        hint: "Greedily keep useful peaks and valleys instead of every point.",
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
      {
        title: "Maximum Units on a Truck",
        url: "https://leetcode.com/problems/maximum-units-on-a-truck/",
        source: "LeetCode",
        hint: "Sort by value density and consume the best available capacity first.",
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
      {
        title: "Minimum Cost to Connect Sticks",
        url: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
        source: "LeetCode",
        hint: "Repeatedly combine the two least weights with a min-heap.",
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
      {
        title: "Minimum Cost to Connect Sticks",
        url: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
        source: "LeetCode",
        hint: "Repeatedly combine the two least weights with a min-heap.",
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
      {
        title: "Longest Subarray With Maximum Bitwise AND",
        url: "https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/",
        source: "LeetCode",
        hint: "The maximum AND equals the global maximum value; scan its longest run.",
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
      {
        title: "Count Number of Maximum Bitwise-OR Subsets",
        url: "https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/",
        source: "LeetCode",
        hint: "Accumulate OR through subset choices and count those reaching the maximum.",
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
      {
        title: "Find the Original Array of Prefix Xor",
        url: "https://leetcode.com/problems/find-the-original-array-of-prefix-xor/",
        source: "LeetCode",
        hint: "Adjacent prefix XOR values recover each original element.",
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
      {
        title: "Number Complement",
        url: "https://leetcode.com/problems/number-complement/",
        source: "LeetCode",
        hint: "Build a mask through the highest set bit before applying complement.",
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
      {
        title: "Power of Two",
        url: "https://leetcode.com/problems/power-of-two/",
        source: "LeetCode",
        hint: "A single set bit corresponds to one shifted power of two.",
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
      {
        title: "Bitwise AND of Numbers Range",
        url: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
        source: "LeetCode",
        hint: "Right-shift both endpoints until their common prefix remains.",
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
      {
        title: "Binary Number with Alternating Bits",
        url: "https://leetcode.com/problems/binary-number-with-alternating-bits/",
        source: "LeetCode",
        hint: "Inspect adjacent bits or transform the pattern with XOR.",
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
      {
        title: "Maximum XOR of Two Numbers in an Array",
        url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        source: "LeetCode",
        hint: "Build the answer bit by bit from most significant to least.",
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
      {
        title: "Minimum Bit Flips to Convert Number",
        url: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
        source: "LeetCode",
        hint: "Clear each differing set bit of start XOR goal.",
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
      {
        title: "Minimum Bit Flips to Convert Number",
        url: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
        source: "LeetCode",
        hint: "XOR reveals exactly which positions need toggling.",
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
      {
        title: "Counting Bits",
        url: "https://leetcode.com/problems/counting-bits/",
        source: "LeetCode",
        hint: "Relate each value to the number after removing its lowest set bit.",
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
      {
        title: "Single Number II",
        url: "https://leetcode.com/problems/single-number-ii/",
        source: "LeetCode",
        hint: "Generalize cancellation when every duplicate appears three times.",
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
      {
        title: "Find the Difference",
        url: "https://leetcode.com/problems/find-the-difference/",
        source: "LeetCode",
        hint: "XOR both strings so matching characters cancel.",
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
      {
        title: "Missing Number",
        url: "https://leetcode.com/problems/missing-number/",
        source: "LeetCode",
        hint: "Use XOR cancellation as the simpler one-missing-value case.",
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
      {
        title: "Find the Original Array of Prefix Xor",
        url: "https://leetcode.com/problems/find-the-original-array-of-prefix-xor/",
        source: "LeetCode",
        hint: "Invert prefix XOR by XORing adjacent cumulative values.",
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
      {
        title: "Number of 1 Bits",
        url: "https://leetcode.com/problems/number-of-1-bits/",
        source: "LeetCode",
        hint: "Remove the lowest set bit repeatedly to compute popcount.",
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
      {
        title: "Power of Four",
        url: "https://leetcode.com/problems/power-of-four/",
        source: "LeetCode",
        hint: "Add a position mask after verifying exactly one bit is set.",
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
      {
        title: "Power of Three",
        url: "https://leetcode.com/problems/power-of-three/",
        source: "LeetCode",
        hint: "Compare bit-position tests with arithmetic power recognition.",
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
      {
        title: "Total Hamming Distance",
        url: "https://leetcode.com/problems/total-hamming-distance/",
        source: "LeetCode",
        hint: "For each bit, count zero-one pairs across all numbers.",
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
      {
        title: "Beautiful Subsets",
        url: "https://leetcode.com/problems/the-number-of-beautiful-subsets/",
        source: "LeetCode",
        hint: "Enumerate include-exclude choices while tracking conflicts.",
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
      {
        title: "Maximum Product of Word Lengths",
        url: "https://leetcode.com/problems/maximum-product-of-word-lengths/",
        source: "LeetCode",
        hint: "Encode each word as a letter mask and test disjointness with AND.",
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
      {
        title: "Parallel Courses II",
        url: "https://leetcode.com/problems/parallel-courses-ii/",
        source: "LeetCode",
        hint: "Represent completed courses as a mask and transition through feasible subsets.",
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
      {
        title: "Can I Win",
        url: "https://leetcode.com/problems/can-i-win/",
        source: "LeetCode",
        hint: "Memoize win or loss by the mask of already chosen numbers.",
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
      {
        title: "Design Add and Search Words Data Structure",
        url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        source: "LeetCode",
        hint: "Extend basic Trie traversal with branching wildcard searches.",
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
      {
        title: "Design Add and Search Words Data Structure",
        url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        source: "LeetCode",
        hint: "Extend basic Trie traversal with branching wildcard searches.",
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
      {
        title: "Design Add and Search Words Data Structure",
        url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        source: "LeetCode",
        hint: "Extend basic Trie traversal with branching wildcard searches.",
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
      {
        title: "Map Sum Pairs",
        url: "https://leetcode.com/problems/map-sum-pairs/",
        source: "LeetCode",
        hint: "Maintain prefix aggregates while updates replace existing key values.",
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
      {
        title: "Map Sum Pairs",
        url: "https://leetcode.com/problems/map-sum-pairs/",
        source: "LeetCode",
        hint: "Aggregate values under every prefix path in a Trie.",
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
      {
        title: "Magic Dictionary",
        url: "https://leetcode.com/problems/implement-magic-dictionary/",
        source: "LeetCode",
        hint: "Traverse a dictionary Trie while allowing exactly one mismatch.",
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
      {
        title: "Longest Word in Dictionary",
        url: "https://leetcode.com/problems/longest-word-in-dictionary/",
        source: "LeetCode",
        hint: "A Trie can require every prefix on the path to be a complete word.",
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
      {
        title: "Word Break",
        url: "https://leetcode.com/problems/word-break/",
        source: "LeetCode",
        hint: "Use dictionary prefixes to prune candidate word boundaries.",
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
      {
        title: "Design Search Autocomplete System",
        url: "https://leetcode.com/problems/design-search-autocomplete-system/",
        source: "LeetCode",
        hint: "Store ranked sentences at prefix nodes for online suggestions.",
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
      {
        title: "Maximum XOR With an Element From Array",
        url: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
        source: "LeetCode",
        hint: "Query a binary Trie by preferring the opposite bit at every level.",
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
      {
        title: "Maximum XOR of Two Numbers in an Array",
        url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        source: "LeetCode",
        hint: "Master unrestricted binary-Trie pairing before adding query limits.",
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
      {
        title: "Count Pairs With XOR in a Range",
        url: "https://leetcode.com/problems/count-pairs-with-xor-in-a-range/",
        source: "LeetCode",
        hint: "Use a binary Trie to count prior values under XOR bounds.",
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
      {
        title: "Min Cost Climbing Stairs",
        url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
        source: "LeetCode",
        hint: "Define each state as the best cost to reach a step.",
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
      {
        title: "Delete and Earn",
        url: "https://leetcode.com/problems/delete-and-earn/",
        source: "LeetCode",
        hint: "Reduce values to a take-or-skip recurrence over adjacent numbers.",
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
      {
        title: "N-th Tribonacci Number",
        url: "https://leetcode.com/problems/n-th-tribonacci-number/",
        source: "LeetCode",
        hint: "Set every recurrence base case explicitly before iterating.",
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
      {
        title: "Decode Ways",
        url: "https://leetcode.com/problems/decode-ways/",
        source: "LeetCode",
        hint: "Memoize the number of valid decodings from each string index.",
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
      {
        title: "Unique Paths",
        url: "https://leetcode.com/problems/unique-paths/",
        source: "LeetCode",
        hint: "Fill states in dependency order from initialized boundaries.",
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
      {
        title: "Min Cost Climbing Stairs",
        url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
        source: "LeetCode",
        hint: "Keep only the previous two states needed by the recurrence.",
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
      {
        title: "N-th Tribonacci Number",
        url: "https://leetcode.com/problems/n-th-tribonacci-number/",
        source: "LeetCode",
        hint: "Extend rolling recurrence state from two previous values to three.",
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
      {
        title: "Min Cost Climbing Stairs",
        url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
        source: "LeetCode",
        hint: "Replace path counting with the minimum cost over one- and two-step transitions.",
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
      {
        title: "Minimum Jumps to Reach Home",
        url: "https://leetcode.com/problems/minimum-jumps-to-reach-home/",
        source: "LeetCode",
        hint: "Track position and movement state because the last jump constrains the next.",
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
      {
        title: "House Robber II",
        url: "https://leetcode.com/problems/house-robber-ii/",
        source: "LeetCode",
        hint: "Solve two linear non-adjacent ranges to handle the circular endpoint conflict.",
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
      {
        title: "House Robber II",
        url: "https://leetcode.com/problems/house-robber-ii/",
        source: "LeetCode",
        hint: "Solve two linear non-adjacent ranges to handle the circular endpoint conflict.",
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
      {
        title: "Minimum Cost For Tickets",
        url: "https://leetcode.com/problems/minimum-cost-for-tickets/",
        source: "LeetCode",
        hint: "At each travel day choose the pass whose future coverage gives minimum total cost.",
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
      {
        title: "Unique Paths II",
        url: "https://leetcode.com/problems/unique-paths-ii/",
        source: "LeetCode",
        hint: "Add blocked cells to the same top-plus-left path-count recurrence.",
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
      {
        title: "Minimum Path Sum",
        url: "https://leetcode.com/problems/minimum-path-sum/",
        source: "LeetCode",
        hint: "Replace path counts with a minimum-cost transition from top or left.",
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
      {
        title: "Triangle",
        url: "https://leetcode.com/problems/triangle/",
        source: "LeetCode",
        hint: "Collapse the grid recurrence bottom-up using adjacent choices.",
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
      {
        title: "Out of Boundary Paths",
        url: "https://leetcode.com/problems/out-of-boundary-paths/",
        source: "LeetCode",
        hint: "Count grid paths while treating boundary exits as terminal transitions.",
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
      {
        title: "Minimum Falling Path Sum",
        url: "https://leetcode.com/problems/minimum-falling-path-sum/",
        source: "LeetCode",
        hint: "Work backward or bottom-up to choose the minimum required continuation.",
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
      {
        title: "Ones and Zeroes",
        url: "https://leetcode.com/problems/ones-and-zeroes/",
        source: "LeetCode",
        hint: "Run a two-capacity 0/1 knapsack backward for each string.",
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
      {
        title: "Coin Change",
        url: "https://leetcode.com/problems/coin-change/",
        source: "LeetCode",
        hint: "Allow repeated use by iterating capacities forward.",
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
      {
        title: "Last Stone Weight II",
        url: "https://leetcode.com/problems/last-stone-weight-ii/",
        source: "LeetCode",
        hint: "Choose a subset sum nearest half the total to minimize the difference.",
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
      {
        title: "Last Stone Weight II",
        url: "https://leetcode.com/problems/last-stone-weight-ii/",
        source: "LeetCode",
        hint: "Choose a subset sum nearest half the total to minimize the difference.",
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
      {
        title: "Perfect Squares",
        url: "https://leetcode.com/problems/perfect-squares/",
        source: "LeetCode",
        hint: "Treat square numbers as reusable coins and minimize item count.",
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
      {
        title: "Combination Sum IV",
        url: "https://leetcode.com/problems/combination-sum-iv/",
        source: "LeetCode",
        hint: "Change loop order to see why permutations and combinations count differently.",
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
      {
        title: "Partition Equal Subset Sum",
        url: "https://leetcode.com/problems/partition-equal-subset-sum/",
        source: "LeetCode",
        hint: "Transform signed choices into a subset-sum target.",
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
      {
        title: "Uncrossed Lines",
        url: "https://leetcode.com/problems/uncrossed-lines/",
        source: "LeetCode",
        hint: "Recognize non-crossing matches as the longest common subsequence recurrence.",
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
      {
        title: "Russian Doll Envelopes",
        url: "https://leetcode.com/problems/russian-doll-envelopes/",
        source: "LeetCode",
        hint: "Sort one dimension carefully, then find LIS on the other.",
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
      {
        title: "Minimum Insertion Steps to Make a String Palindrome",
        url: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
        source: "LeetCode",
        hint: "Use string length minus its longest palindromic subsequence.",
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
      {
        title: "Interleaving String",
        url: "https://leetcode.com/problems/interleaving-string/",
        source: "LeetCode",
        hint: "Track how prefixes of two strings form a target prefix.",
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
      {
        title: "Count Number of Teams",
        url: "https://leetcode.com/problems/count-number-of-teams/",
        source: "LeetCode",
        hint: "Count increasing and decreasing subsequences through each middle index.",
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
      {
        title: "Delete Operation for Two Strings",
        url: "https://leetcode.com/problems/delete-operation-for-two-strings/",
        source: "LeetCode",
        hint: "Relate deletions to edit distance or the longest common subsequence.",
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
      {
        title: "Word Break II",
        url: "https://leetcode.com/problems/word-break-ii/",
        source: "LeetCode",
        hint: "Memoize valid sentence decompositions from each starting index.",
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
      {
        title: "Palindrome Partitioning II",
        url: "https://leetcode.com/problems/palindrome-partitioning-ii/",
        source: "LeetCode",
        hint: "Precompute palindromes and minimize cuts over valid suffixes.",
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
      {
        title: "Regular Expression Matching",
        url: "https://leetcode.com/problems/regular-expression-matching/",
        source: "LeetCode",
        hint: "Use 2D DP where star transitions either skip or extend a match.",
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
      {
        title: "Best Time to Buy and Sell Stock II",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
        source: "LeetCode",
        hint: "Extend one transaction to reusable hold and cash states.",
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
      {
        title: "Best Time to Buy and Sell Stock with Transaction Fee",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
        source: "LeetCode",
        hint: "Add a selling cost to the unlimited hold-cash recurrence.",
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
      {
        title: "Best Time to Buy and Sell Stock III",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
        source: "LeetCode",
        hint: "Use the k-transaction recurrence with exactly two transactions.",
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
      {
        title: "Best Time to Buy and Sell Stock with Transaction Fee",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
        source: "LeetCode",
        hint: "Compare cooldown state transitions with a transaction-cost variant.",
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
      {
        title: "Best Time to Buy and Sell Stock with Cooldown",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
        source: "LeetCode",
        hint: "Compare transaction fees with a temporal selling constraint.",
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
      {
        title: "Minimum Cost to Cut a Stick",
        url: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
        source: "LeetCode",
        hint: "Choose the first or last operation in each interval and combine both sides.",
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
      {
        title: "Minimum Cost to Cut a Stick",
        url: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
        source: "LeetCode",
        hint: "Choose the first or last operation in each interval and combine both sides.",
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
      {
        title: "Strange Printer",
        url: "https://leetcode.com/problems/strange-printer/",
        source: "LeetCode",
        hint: "Use interval DP and merge matching endpoint work when possible.",
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
      {
        title: "Largest Sum of Averages",
        url: "https://leetcode.com/problems/largest-sum-of-averages/",
        source: "LeetCode",
        hint: "Try every final partition boundary and combine with the best prefix state.",
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
      {
        title: "Longest ZigZag Path in a Binary Tree",
        url: "https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/",
        source: "LeetCode",
        hint: "Return direction-specific path states from each subtree.",
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
      {
        title: "Binary Tree Cameras",
        url: "https://leetcode.com/problems/binary-tree-cameras/",
        source: "LeetCode",
        hint: "Use postorder tree states to make locally optimal coverage decisions.",
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
      {
        title: "Binary Tree Cameras",
        url: "https://leetcode.com/problems/binary-tree-cameras/",
        source: "LeetCode",
        hint: "Use postorder tree states to make locally optimal coverage decisions.",
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
      {
        title: "Minimum Height Trees",
        url: "https://leetcode.com/problems/minimum-height-trees/",
        source: "LeetCode",
        hint: "Leaf peeling exposes tree centers and complements rerooting DP intuition.",
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
      {
        title: "Shortest Path Visiting All Nodes",
        url: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
        source: "LeetCode",
        hint: "Track visited subsets with the current endpoint.",
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
      {
        title: "Maximum Compatibility Score Sum",
        url: "https://leetcode.com/problems/maximum-compatibility-score-sum/",
        source: "LeetCode",
        hint: "Assign one item at a time while memoizing the used-partner mask.",
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
      {
        title: "Can I Win",
        url: "https://leetcode.com/problems/can-i-win/",
        source: "LeetCode",
        hint: "Memoize outcomes by the subset of choices already used.",
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
      {
        title: "Parallel Courses II",
        url: "https://leetcode.com/problems/parallel-courses-ii/",
        source: "LeetCode",
        hint: "Encode completed courses in a mask and transition through valid next subsets.",
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
      {
        title: "Number of Digit One",
        url: "https://leetcode.com/problems/number-of-digit-one/",
        source: "LeetCode",
        hint: "Count digit occurrences by position or with tight digit-DP states.",
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
      {
        title: "Parallel Courses III",
        url: "https://leetcode.com/problems/parallel-courses-iii/",
        source: "LeetCode",
        hint: "Process a DAG in topological order while relaxing longest completion times.",
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
      {
        title: "Constrained Subsequence Sum",
        url: "https://leetcode.com/problems/constrained-subsequence-sum/",
        source: "LeetCode",
        hint: "Maintain the maximum eligible previous DP value in a deque.",
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
      {
        title: "Minimum Cost to Merge Stones",
        url: "https://leetcode.com/problems/minimum-cost-to-merge-stones/",
        source: "LeetCode",
        hint: "Interval states expose repeated split transitions that motivate optimization.",
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
      {
        title: "Count of Range Sum",
        url: "https://leetcode.com/problems/count-of-range-sum/",
        source: "LeetCode",
        hint: "Use divide and conquer to count cross-half prefix-sum relationships.",
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
      {
        title: "Minimum Score Triangulation of Polygon",
        url: "https://leetcode.com/problems/minimum-score-triangulation-of-polygon/",
        source: "LeetCode",
        hint: "Practice the interval split recurrence underlying advanced range optimizations.",
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
      {
        title: "Max Value of Equation",
        url: "https://leetcode.com/problems/max-value-of-equation/",
        source: "LeetCode",
        hint: "Rearrange the expression into a best prior line-like term maintained over a window.",
      },
    ],
  },
};
