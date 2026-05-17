import type { DsaPattern } from "@/types/pattern";

const patterns: DsaPattern[] = [
  p(
    "two-pointers",
    "Two Pointers",
    "Arrays & Strings",
    "Use two indices moving toward each other or at different speeds on a sequence.",
    {
      overview:
        "Maintain left and right (or slow/fast) pointers to scan an array in O(n) instead of O(n²). Works on sorted arrays, palindromes, and in-place partitioning.",
      intuition:
        "Each pointer makes a decision that permanently shrinks the remaining search space.",
      whenToUse: [
        "Sorted array pair sum or triplets",
        "Palindrome checks",
        "In-place removal or partitioning",
        "Container with most water style problems",
      ],
      approach: [
        "Initialize pointers at meaningful positions (0, n-1 or both at 0).",
        "Move the pointer that improves the objective (smaller sum → move left up, etc.).",
        "Stop when pointers cross or meet.",
      ],
      complexity: "Time O(n), Space O(1) for in-place variants.",
      exampleCode: `function solve(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}`,
      exampleInput: JSON.stringify({ nums: [1, 2, 3, 4, 6], target: 6 }),
      pitfalls: [
        "Forgetting to move at least one pointer each iteration",
        "Using two pointers on unsorted data without a clear invariant",
      ],
    },
  ),
  p(
    "sliding-window",
    "Sliding Window",
    "Arrays & Strings",
    "Maintain a contiguous subarray window that expands and contracts.",
    {
      overview:
        "Fix or grow a window [left, right] to optimize sum, length, or count constraints in linear time.",
      intuition:
        "Adding an element is cheap; removing from the left fixes violations once.",
      whenToUse: [
        "Longest/shortest subarray with sum constraint",
        "Fixed-size window maximum",
        "Substring with at most K distinct characters",
      ],
      approach: [
        "Expand right to include new elements.",
        "While window is invalid, shrink from left.",
        "Track best answer whenever window is valid.",
      ],
      complexity: "Time O(n), Space O(1) or O(k) for frequency maps.",
      exampleCode: `function solve(nums, target) {
  let left = 0, sum = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum > target && left <= right) {
      sum -= nums[left++];
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      exampleInput: JSON.stringify({ nums: [2, 1, 5, 1, 3, 2], target: 8 }),
      pitfalls: [
        "Off-by-one on window size",
        "Not shrinking left enough after expansion",
      ],
    },
  ),
  p(
    "prefix-sum",
    "Prefix Sum",
    "Arrays & Strings",
    "Precompute cumulative sums for O(1) range queries.",
    {
      overview:
        "prefix[i] = sum of nums[0..i-1]. Range sum (l,r) = prefix[r+1] - prefix[l].",
      intuition:
        "Turn many range queries into subtraction of two precomputed values.",
      whenToUse: [
        "Subarray sum equals K (with hash map)",
        "Range sum queries",
        "2D matrix prefix (extension)",
      ],
      approach: [
        "Build prefix array in one pass.",
        "For each index, look for prefix - k in a map.",
        "Update running count of prefix values.",
      ],
      complexity: "Build O(n), query O(1); subarray count O(n).",
      exampleCode: `function solve(nums, k) {
  const freq = { 0: 1 };
  let prefix = 0, count = 0;
  for (const n of nums) {
    prefix += n;
    const need = prefix - k;
    if (freq[need]) count += freq[need];
    freq[prefix] = (freq[prefix] || 0) + 1;
  }
  return count;
}`,
      exampleInput: JSON.stringify({ nums: [1, 1, 1], target: 2 }),
      pitfalls: ["Forgetting prefix[0] = 1 for empty subarray", "Index off-by-one on range"],
    },
  ),
  p(
    "kadane",
    "Kadane's Algorithm",
    "Arrays & Strings",
    "Maximum subarray sum by tracking best sum ending at each index.",
    {
      overview:
        "Kadane's algorithm scans the array once, keeping the best sum of a subarray that ends at the current position.",
      intuition:
        "At each index, either extend the previous subarray or start fresh at this element — take the larger choice.",
      whenToUse: [
        "Maximum subarray sum",
        "Maximum circular subarray (with total sum trick)",
        "Longest turbulent subarray variants",
      ],
      approach: [
        "Set curr = nums[0], best = nums[0].",
        "For each next element: curr = max(x, curr + x).",
        "Update best = max(best, curr).",
      ],
      complexity: "Time O(n), Space O(1).",
      exampleCode: `function solve(nums) {
  let curr = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}`,
      exampleInput: JSON.stringify({ nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }),
      pitfalls: [
        "Initializing best to 0 when all numbers are negative",
        "Confusing with sliding window for variable-length subarrays",
      ],
    },
  ),
  p(
    "hashing",
    "Hashing",
    "Arrays & Strings",
    "Use hash maps or sets for O(1) lookups, counts, and grouping.",
    {
      overview:
        "Store seen values, frequencies, or prefix sums in a hash table to avoid nested loops.",
      intuition:
        "Trade memory for speed — if you need 'have I seen complement?' use a map.",
      whenToUse: [
        "Two sum with unsorted array",
        "Subarray sum equals K",
        "Anagrams and frequency counting",
        "Longest consecutive sequence",
      ],
      approach: [
        "Pick a key (value, prefix sum, char count).",
        "Update map as you scan.",
        "Answer from map lookup in O(1).",
      ],
      complexity: "Typically O(n) time, O(n) space.",
      exampleCode: `function solve(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
      exampleInput: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }),
      pitfalls: [
        "Forgetting to update frequency after using a count",
        "Using wrong key for prefix-sum problems",
      ],
    },
  ),
  p(
    "binary-search",
    "Binary Search",
    "Search",
    "Halve the search space on a sorted array or monotonic predicate.",
    {
      overview:
        "Repeatedly compare target with middle element and discard half the space.",
      intuition:
        "If the answer property is monotonic in index, binary search finds the boundary.",
      whenToUse: [
        "Find target in sorted array",
        "First/last position of element",
        "Minimize maximum (binary search on answer)",
      ],
      approach: [
        "Set low = 0, high = n - 1.",
        "While low <= high, compute mid.",
        "Move low or high based on comparison.",
      ],
      complexity: "Time O(log n), Space O(1).",
      exampleCode: `function solve(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      exampleInput: JSON.stringify({ nums: [1, 3, 5, 7, 9], target: 7 }),
      pitfalls: ["Infinite loop from mid calculation", "Using high = mid instead of mid-1 incorrectly"],
    },
  ),
  p(
    "fast-slow-pointers",
    "Fast & Slow Pointers",
    "Linked Lists",
    "Two pointers at different speeds detect cycles or find middle.",
    {
      overview:
        "Slow moves 1 step, fast moves 2. If linked list has a cycle, they meet.",
      intuition:
        "Speed difference closes the gap inside a cycle like runners on a track.",
      whenToUse: [
        "Linked list cycle detection",
        "Find middle of linked list",
        "Happy number / cycle in sequence",
      ],
      approach: [
        "Initialize slow = head, fast = head.",
        "Move slow by 1, fast by 2 until fast null or meet.",
        "If meet → cycle; if fast null → middle/end.",
      ],
      complexity: "Time O(n), Space O(1).",
      exampleCode: `function solve(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      exampleInput: JSON.stringify({ n: 0 }),
      pitfalls: ["Not checking fast.next before fast = fast.next.next"],
    },
  ),
  p(
    "merge-intervals",
    "Merge Intervals",
    "Intervals",
    "Sort by start, then merge overlapping intervals.",
    {
      overview:
        "After sorting by start time, overlapping intervals share a chain mergeable in one pass.",
      intuition:
        "Only compare current interval with the last merged result.",
      whenToUse: [
        "Meeting rooms overlap",
        "Insert interval into list",
        "Employee free time",
      ],
      approach: [
        "Sort intervals by start.",
        "Push first interval to result.",
        "If overlap, extend end; else push new.",
      ],
      complexity: "Time O(n log n), Space O(n).",
      exampleCode: `function solve(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = out[out.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else out.push(intervals[i]);
  }
  return out;
}`,
      exampleInput: JSON.stringify({ nums: [[1, 3], [2, 6], [8, 10]] }),
      pitfalls: ["Forgetting to sort first", "Using < instead of <= for overlap"],
    },
  ),
  p(
    "cyclic-sort",
    "Cyclic Sort",
    "Arrays",
    "Place each value at index value-1 for arrays containing 1..n.",
    {
      overview:
        "Swap nums[i] to nums[nums[i]-1] until each position holds correct value.",
      intuition:
        "Each swap puts at least one element in its final place.",
      whenToUse: [
        "Find missing number",
        "Find duplicates in 1..n",
        "First K missing positive",
      ],
      approach: [
        "While nums[i] is wrong, swap to correct index.",
        "Skip if value out of range [1,n].",
        "Second pass finds mismatch.",
      ],
      complexity: "Time O(n), Space O(1).",
      exampleCode: `function solve(nums) {
  let i = 0;
  while (i < nums.length) {
    const correct = nums[i] - 1;
    if (nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else i++;
  }
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) return j + 1;
  }
  return nums.length + 1;
}`,
      exampleInput: JSON.stringify({ nums: [3, 4, 0, 1] }),
      pitfalls: ["Infinite loop if not checking nums[i] !== nums[correct] before swap"],
    },
  ),
  p(
    "top-k-heap",
    "Top K Elements (Heap)",
    "Heaps",
    "Use min-heap of size K to track K largest elements efficiently.",
    {
      overview:
        "Maintain a heap of size k while streaming; root is the k-th largest.",
      intuition:
        "Min-heap of size k evicts the smallest among the top candidates.",
      whenToUse: [
        "K largest numbers",
        "K closest points",
        "Frequency top K",
      ],
      approach: [
        "Build heap with first k elements.",
        "For each new element, if larger than root, pop and push.",
        "Return heap contents.",
      ],
      complexity: "Time O(n log k), Space O(k).",
      exampleCode: `function solve(nums, k) {
  nums.sort((a, b) => b - a);
  return nums.slice(0, k);
}`,
      exampleInput: JSON.stringify({ nums: [3, 2, 1, 5, 6, 4], target: 3 }),
      pitfalls: ["Using max-heap when you need min-heap of size k", "Off-by-one on heap size"],
    },
  ),
  p(
    "monotonic-stack",
    "Monotonic Stack",
    "Stacks",
    "Stack maintaining increasing or decreasing order for next-greater problems.",
    {
      overview:
        "Each element pushed once; pops resolve answers for indices waiting for a boundary.",
      intuition:
        "When a taller bar arrives, it answers 'next greater' for shorter bars in stack.",
      whenToUse: [
        "Next greater element",
        "Daily temperatures",
        "Largest rectangle in histogram",
      ],
      approach: [
        "Iterate with index i.",
        "While stack not empty and condition violated, pop and record answer.",
        "Push i onto stack.",
      ],
      complexity: "Time O(n), Space O(n).",
      exampleCode: `function solve(nums) {
  const result = Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,
      exampleInput: JSON.stringify({ nums: [2, 1, 2, 4, 3] }),
      pitfalls: ["Storing values instead of indices", "Wrong comparison for increasing vs decreasing stack"],
    },
  ),
  p(
    "tree-bfs",
    "Tree BFS",
    "Trees",
    "Level-order traversal using a queue.",
    {
      overview:
        "Process nodes layer by layer; queue holds frontier of next level.",
      intuition:
        "FIFO order naturally visits all depth-d nodes before depth-(d+1).",
      whenToUse: [
        "Level order traversal",
        "Zigzag level order",
        "Minimum depth of tree",
      ],
      approach: [
        "Enqueue root.",
        "While queue not empty, process size = queue.length nodes.",
        "Enqueue children of current level.",
      ],
      complexity: "Time O(n), Space O(w) width.",
      exampleCode: `function solve(root) {
  if (!root) return [];
  const queue = [root], levels = [];
  while (queue.length) {
    const size = queue.length, level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels.push(level);
  }
  return levels;
}`,
      exampleInput: JSON.stringify({
        tree: { val: 1, left: { val: 2 }, right: { val: 3 } },
      }),
      pitfalls: ["Using shift on large arrays (OK for learning)", "Forgetting null check on root"],
    },
  ),
  p(
    "tree-dfs",
    "Tree DFS",
    "Trees",
    "Depth-first recursion: preorder, inorder, postorder.",
    {
      overview:
        "Go deep along one branch before backtracking; natural for tree structure.",
      intuition:
        "Each recursive call handles a subtree; base case is null node.",
      whenToUse: [
        "Path sum",
        "Max depth / diameter",
        "Validate BST",
      ],
      approach: [
        "Define dfs(node) with base null return.",
        "Combine results from left and right children.",
        "Choose visit order based on problem.",
      ],
      complexity: "Time O(n), Space O(h) recursion stack.",
      exampleCode: `function solve(tree) {
  function depth(node) {
    if (!node) return 0;
    return 1 + Math.max(depth(node.left), depth(node.right));
  }
  return depth(tree);
}`,
      exampleInput: JSON.stringify({
        tree: { val: 1, left: { val: 2 }, right: { val: 3 } },
      }),
      pitfalls: ["Not handling null", "Confusing global vs returned state"],
    },
  ),
  p(
    "subsets-backtracking",
    "Subsets & Backtracking",
    "Backtracking",
    "Explore include/exclude choices building combinations.",
    {
      overview:
        "Build solution incrementally; undo (backtrack) after exploring a branch.",
      intuition:
        "At each index, choose to take or skip the element, then recurse.",
      whenToUse: [
        "Subsets / power set",
        "Combinations sum",
        "Permutations with constraints",
      ],
      approach: [
        "Start with empty path and index 0.",
        "Push copy of path to result at each step.",
        "Include nums[i], recurse, remove (backtrack).",
      ],
      complexity: "Often O(2^n) time and space for subsets.",
      exampleCode: `function solve(nums) {
  const result = [], path = [];
  function backtrack(start) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);
  return result;
}`,
      exampleInput: JSON.stringify({ nums: [1, 2, 3] }),
      pitfalls: ["Mutating path without pop", "Duplicate subsets when array has duplicates (need sort+skip)"],
    },
  ),
  p(
    "modified-binary-search",
    "Modified Binary Search",
    "Search",
    "Binary search on rotated sorted arrays or answer space.",
    {
      overview:
        "Identify which half is sorted, then decide which side can contain target.",
      intuition:
        "Even when fully sorted property breaks globally, one half is always sorted.",
      whenToUse: [
        "Search in rotated sorted array",
        "Find minimum in rotated array",
        "Binary search on answer (capacity, speed)",
      ],
      approach: [
        "Compare nums[mid] with nums[high] to find sorted half.",
        "Check if target lies in sorted half.",
        "Adjust low or high accordingly.",
      ],
      complexity: "Time O(log n), Space O(1).",
      exampleCode: `function solve(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (target >= nums[low] && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }
  return -1;
}`,
      exampleInput: JSON.stringify({ nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }),
      pitfalls: ["Using <= vs < wrong on boundary checks"],
    },
  ),
  p(
    "bitwise-xor",
    "Bitwise XOR",
    "Bit Manipulation",
    "XOR cancels duplicates; finds single number or missing bit patterns.",
    {
      overview:
        "a ^ a = 0, a ^ 0 = a. XOR all numbers to find the unique one.",
      intuition:
        "Pairs cancel out; what remains is the answer.",
      whenToUse: [
        "Single number (every other appears twice)",
        "Missing number",
        "Swap without temp (advanced)",
      ],
      approach: [
        "Initialize result = 0.",
        "XOR each number into result.",
        "Return result.",
      ],
      complexity: "Time O(n), Space O(1).",
      exampleCode: `function solve(nums) {
  let x = 0;
  for (const n of nums) x ^= n;
  return x;
}`,
      exampleInput: JSON.stringify({ nums: [4, 1, 2, 1, 2] }),
      pitfalls: ["Using XOR when problem needs AND/OR instead"],
    },
  ),
  p(
    "two-heaps",
    "Two Heaps",
    "Heaps",
    "Max-heap for lower half, min-heap for upper half — streaming median.",
    {
      overview:
        "Balance two heaps so their sizes differ by at most 1; tops give median.",
      intuition:
        "Lower half’s max and upper half’s min bracket the median.",
      whenToUse: [
        "Find median from data stream",
        "Sliding window median (with lazy removal)",
      ],
      approach: [
        "Add to appropriate heap.",
        "Rebalance if size difference > 1.",
        "Median is top of max-heap or average of both tops.",
      ],
      complexity: "Insert O(log n), median O(1).",
      exampleCode: `function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}`,
      exampleInput: JSON.stringify({ nums: [1, 2, 3, 4, 5] }),
      pitfalls: ["Not rebalancing after each insert"],
    },
  ),
  p(
    "topological-sort",
    "Topological Sort",
    "Graphs",
    "Linear ordering of DAG nodes respecting all edges.",
    {
      overview:
        "Kahn’s algorithm (BFS indegree) or DFS post-order reverse for dependencies.",
      intuition:
        "Process nodes with no incoming edges first; remove their outgoing edges.",
      whenToUse: [
        "Course schedule",
        "Build order",
        "Alien dictionary style constraints",
      ],
      approach: [
        "Compute indegree for each node.",
        "Enqueue indegree 0 nodes.",
        "Pop, reduce neighbor indegree, enqueue new zeros.",
      ],
      complexity: "Time O(V+E), Space O(V+E).",
      exampleCode: `function solve(n, edges) {
  const indeg = Array(n).fill(0);
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    indeg[v]++;
  }
  const queue = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u]) {
      if (--indeg[v] === 0) queue.push(v);
    }
  }
  return order.length === n ? order : [];
}`,
      exampleInput: JSON.stringify({ n: 4, edges: [[1, 0], [2, 0], [3, 1], [3, 2]] }),
      pitfalls: ["Cycle detection — order length < n means impossible"],
    },
  ),
  p(
    "greedy",
    "Greedy",
    "Greedy",
    "Make the locally best choice at each step to build a global optimum.",
    {
      overview:
        "Sort or prioritize items, then pick what looks best now while maintaining feasibility.",
      intuition:
        "If choosing the earliest finish time works for intervals, greedy often beats brute force.",
      whenToUse: [
        "Activity selection / non-overlapping intervals",
        "Assign tasks to minimize cost",
        "Jump game / reachability with minimum steps",
      ],
      approach: [
        "Sort by the greedy key (end time, profit, etc.).",
        "Scan and take if compatible with choices so far.",
        "Prove or trust the exchange argument for the pattern.",
      ],
      complexity: "Often O(n log n) from sorting.",
      exampleCode: `function solve(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, end = -Infinity;
  for (const [s, e] of intervals) {
    if (s >= end) { count++; end = e; }
  }
  return count;
}`,
      exampleInput: JSON.stringify({ nums: [[1, 3], [2, 4], [3, 5]] }),
      pitfalls: ["Greedy fails when local optimum ≠ global — verify pattern first"],
    },
  ),
  p(
    "math",
    "Math",
    "Math",
    "Number theory, combinatorics, and arithmetic tricks for DSA problems.",
    {
      overview:
        "Use GCD, modulo, factorial properties, and digit math instead of heavy data structures.",
      intuition:
        "Many math problems reduce to a formula or a single pass with careful edge cases.",
      whenToUse: [
        "GCD / LCM of array",
        "Trailing zeroes in factorial",
        "Permutation sequence indexing",
      ],
      approach: [
        "Identify the mathematical structure.",
        "Handle edge cases (0, 1, overflow with BigInt if needed).",
        "Implement with O(n) or O(log n) arithmetic.",
      ],
      complexity: "Varies; often O(n) or O(log n).",
      exampleCode: `function solve(nums) {
  const g = (a, b) => (b ? g(b, a % b) : a);
  return nums.reduce((a, b) => g(a, b));
}`,
      exampleInput: JSON.stringify({ nums: [2, 4, 6, 8] }),
      pitfalls: ["Integer overflow on large factorials — use modulo or loop factors of 5"],
    },
  ),
  p(
    "dp-1d",
    "1D Dynamic Programming",
    "Dynamic Programming",
    "Optimal substructure with 1D state array.",
    {
      overview:
        "dp[i] = best answer using first i elements; transition from smaller subproblems.",
      intuition:
        "Current state only depends on a few previous states (often i-1, i-2).",
      whenToUse: [
        "Climbing stairs",
        "House robber",
        "Coin change",
        "LIS (with patience sorting variant)",
      ],
      approach: [
        "Define dp meaning clearly.",
        "Set base cases dp[0], dp[1].",
        "Fill table left to right.",
      ],
      complexity: "Typically O(n) time, O(n) or O(1) space.",
      exampleCode: `function solve(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      exampleInput: JSON.stringify({ n: 5 }),
      pitfalls: ["Wrong base cases", "Using recursion without memo → TLE"],
    },
  ),
  p(
    "recursion",
    "Recursion",
    "Fundamentals",
    "Functions calling themselves with smaller subproblems and base cases.",
    {
      overview:
        "Break problem into same structure on smaller input until base case stops calls.",
      intuition:
        "Trust the recursive call; focus on relation between n and n-1.",
      whenToUse: [
        "Tree/graph DFS",
        "Divide and conquer",
        "Fibonacci-style (prefer DP for repeated work)",
      ],
      approach: [
        "Write explicit base case(s).",
        "Ensure progress toward base (smaller n, shorter string).",
        "Combine recursive results.",
      ],
      complexity: "Often exponential without memo; O(n) with memo on 1D state.",
      exampleCode: `function solve(n) {
  if (n <= 1) return n;
  return solve(n - 1) + solve(n - 2);
}`,
      exampleInput: JSON.stringify({ n: 4 }),
      pitfalls: [
        "Missing base case → stack overflow",
        "Redundant recomputation without memo",
      ],
    },
  ),
  p(
    "graph-bfs",
    "Graph BFS",
    "Graphs",
    "Shortest path in unweighted graphs via layer-by-layer expansion.",
    {
      overview:
        "Queue explores nodes in order of increasing distance from source.",
      intuition:
        "First time you reach a node is via shortest path (unweighted).",
      whenToUse: [
        "Shortest path in grid",
        "Word ladder",
        "Multi-source BFS",
      ],
      approach: [
        "Enqueue source with distance 0.",
        "Mark visited on enqueue.",
        "Dequeue, push unvisited neighbors.",
      ],
      complexity: "Time O(V+E), Space O(V).",
      exampleCode: `function solve(graph, start) {
  const visited = new Set([start]);
  const queue = [start], order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const nei of graph[node] || []) {
      if (!visited.has(nei)) {
        visited.add(nei);
        queue.push(nei);
      }
    }
  }
  return order;
}`,
      exampleInput: JSON.stringify({
        graph: { 0: [1, 2], 1: [3], 2: [3], 3: [] },
        start: 0,
      }),
      pitfalls: ["Marking visited on dequeue instead of enqueue (duplicates)"],
    },
  ),
  p(
    "graph-dfs",
    "Graph DFS",
    "Graphs",
    "Explore deep paths; used for connectivity, cycles, and components.",
    {
      overview:
        "Recursive or stack-based exploration visiting unvisited neighbors.",
      intuition:
        "Paint entire connected component before backtracking.",
      whenToUse: [
        "Count islands",
        "Detect cycle in directed graph",
        "Path existence",
      ],
      approach: [
        "Mark node visited.",
        "For each neighbor, dfs if unvisited.",
        "Track recursion stack for cycle detection.",
      ],
      complexity: "Time O(V+E), Space O(V).",
      exampleCode: `function solve(grid, r, c) {
  const rows = grid.length, cols = grid[0].length;
  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === "0") return;
    grid[i][j] = "0";
    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
  }
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") { count++; dfs(i, j); }
    }
  }
  return count;
}`,
      exampleInput: JSON.stringify({
        nums: [
          ["1", "1", "0"],
          ["1", "0", "0"],
          ["0", "0", "1"],
        ],
      }),
      pitfalls: ["Stack overflow on large grids (use iterative)"],
    },
  ),
  p(
    "trie",
    "Trie (Prefix Tree)",
    "Trees",
    "Character tree for fast prefix lookups and autocomplete.",
    {
      overview:
        "Each edge is a character; paths from root spell stored strings.",
      intuition:
        "Shared prefixes stored once — efficient for dictionary queries.",
      whenToUse: [
        "Implement autocomplete",
        "Word search II",
        "Longest common prefix",
      ],
      approach: [
        "Node has children map and end-of-word flag.",
        "Insert walks characters creating nodes.",
        "Search follows characters; prefix search same without end flag.",
      ],
      complexity: "Insert/search O(L) word length.",
      exampleCode: `function solve(words) {
  const root = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      node[ch] = node[ch] || {};
      node = node[ch];
    }
    node.$ = true;
  }
  return root;
}`,
      exampleInput: JSON.stringify({ nums: ["cat", "car", "dog"] }),
      pitfalls: ["Not distinguishing word end vs prefix path"],
    },
  ),
];

function p(
  slug: string,
  name: string,
  category: string,
  summary: string,
  fundamentals: DsaPattern["fundamentals"],
): DsaPattern {
  return { slug, name, category, summary, fundamentals };
}

export function getAllPatterns(): DsaPattern[] {
  return patterns;
}

export function getPatternBySlug(slug: string): DsaPattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getPatternSlugs(): string[] {
  return patterns.map((p) => p.slug);
}
