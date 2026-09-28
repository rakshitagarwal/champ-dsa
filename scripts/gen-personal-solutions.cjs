const fs = require("fs");
const path = require("path");
const { bodyFor, OUT } = require("./gen-personal-solutions-lib.cjs");

/** @typedef {{ id: number, slug: string, title: string, diff: 'Easy'|'Medium'|'Hard', premium?: boolean }} Prob */

/** @type {{ id: string, title: string, file: string, exportName: string, subs: { title: string, topics: Prob[] }[] }[]} */
const TOPICS = [
  {
    id: "two-pointers",
    title: "Two Pointers",
    file: "two-pointers.ts",
    exportName: "TWO_POINTERS_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 125, slug: "valid-palindrome", title: "Valid Palindrome", diff: "Easy" },
        { id: 167, slug: "two-sum-ii-input-array-is-sorted", title: "Two Sum II - Input Array Is Sorted", diff: "Medium" },
        { id: 344, slug: "reverse-string", title: "Reverse String", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 15, slug: "3sum", title: "3Sum", diff: "Medium" },
        { id: 11, slug: "container-with-most-water", title: "Container With Most Water", diff: "Medium" },
        { id: 75, slug: "sort-colors", title: "Sort Colors", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 42, slug: "trapping-rain-water", title: "Trapping Rain Water", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    file: "sliding-window.ts",
    exportName: "SLIDING_WINDOW_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 643, slug: "maximum-average-subarray-i", title: "Maximum Average Subarray I", diff: "Easy" },
        { id: 209, slug: "minimum-size-subarray-sum", title: "Minimum Size Subarray Sum", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 3, slug: "longest-substring-without-repeating-characters", title: "Longest Substring Without Repeating Characters", diff: "Medium" },
        { id: 567, slug: "permutation-in-string", title: "Permutation in String", diff: "Medium" },
        { id: 424, slug: "longest-repeating-character-replacement", title: "Longest Repeating Character Replacement", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 76, slug: "minimum-window-substring", title: "Minimum Window Substring", diff: "Hard" },
        { id: 239, slug: "sliding-window-maximum", title: "Sliding Window Maximum", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "bfs",
    title: "BFS",
    file: "bfs.ts",
    exportName: "BFS_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 102, slug: "binary-tree-level-order-traversal", title: "Binary Tree Level Order Traversal", diff: "Medium" },
        { id: 733, slug: "flood-fill", title: "Flood Fill", diff: "Easy" },
        { id: 200, slug: "number-of-islands", title: "Number of Islands", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 994, slug: "rotting-oranges", title: "Rotting Oranges", diff: "Medium" },
        { id: 542, slug: "01-matrix", title: "01 Matrix", diff: "Medium" },
        { id: 133, slug: "clone-graph", title: "Clone Graph", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 127, slug: "word-ladder", title: "Word Ladder", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "dfs",
    title: "DFS",
    file: "dfs.ts",
    exportName: "DFS_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 104, slug: "maximum-depth-of-binary-tree", title: "Maximum Depth of Binary Tree", diff: "Easy" },
        { id: 100, slug: "same-tree", title: "Same Tree", diff: "Easy" },
        { id: 226, slug: "invert-binary-tree", title: "Invert Binary Tree", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 112, slug: "path-sum", title: "Path Sum", diff: "Easy" },
        { id: 200, slug: "number-of-islands", title: "Number of Islands", diff: "Medium" },
        { id: 236, slug: "lowest-common-ancestor-of-a-binary-tree", title: "Lowest Common Ancestor of a Binary Tree", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 207, slug: "course-schedule", title: "Course Schedule", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    file: "backtracking.ts",
    exportName: "BACKTRACKING_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 78, slug: "subsets", title: "Subsets", diff: "Medium" },
        { id: 39, slug: "combination-sum", title: "Combination Sum", diff: "Medium" },
        { id: 46, slug: "permutations", title: "Permutations", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 17, slug: "letter-combinations-of-a-phone-number", title: "Letter Combinations of a Phone Number", diff: "Medium" },
        { id: 22, slug: "generate-parentheses", title: "Generate Parentheses", diff: "Medium" },
        { id: 131, slug: "palindrome-partitioning", title: "Palindrome Partitioning", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 51, slug: "n-queens", title: "N-Queens", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "heap",
    title: "Heap / Priority Queue",
    file: "heap.ts",
    exportName: "HEAP_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 703, slug: "kth-largest-element-in-a-stream", title: "Kth Largest Element in a Stream", diff: "Easy" },
        { id: 1046, slug: "last-stone-weight", title: "Last Stone Weight", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 215, slug: "kth-largest-element-in-an-array", title: "Kth Largest Element in an Array", diff: "Medium" },
        { id: 347, slug: "top-k-frequent-elements", title: "Top K Frequent Elements", diff: "Medium" },
        { id: 973, slug: "k-closest-points-to-origin", title: "K Closest Points to Origin", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 295, slug: "find-median-from-data-stream", title: "Find Median from Data Stream", diff: "Hard" },
        { id: 23, slug: "merge-k-sorted-lists", title: "Merge k Sorted Lists", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    file: "binary-search.ts",
    exportName: "BINARY_SEARCH_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 704, slug: "binary-search", title: "Binary Search", diff: "Easy" },
        { id: 35, slug: "search-insert-position", title: "Search Insert Position", diff: "Easy" },
        { id: 278, slug: "first-bad-version", title: "First Bad Version", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 34, slug: "find-first-and-last-position-of-element-in-sorted-array", title: "Find First and Last Position of Element in Sorted Array", diff: "Medium" },
        { id: 33, slug: "search-in-rotated-sorted-array", title: "Search in Rotated Sorted Array", diff: "Medium" },
        { id: 153, slug: "find-minimum-in-rotated-sorted-array", title: "Find Minimum in Rotated Sorted Array", diff: "Medium" },
        { id: 875, slug: "koko-eating-bananas", title: "Koko Eating Bananas", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 4, slug: "median-of-two-sorted-arrays", title: "Median of Two Sorted Arrays", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    file: "dynamic-programming.ts",
    exportName: "DYNAMIC_PROGRAMMING_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 70, slug: "climbing-stairs", title: "Climbing Stairs", diff: "Easy" },
        { id: 746, slug: "min-cost-climbing-stairs", title: "Min Cost Climbing Stairs", diff: "Easy" },
        { id: 198, slug: "house-robber", title: "House Robber", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 213, slug: "house-robber-ii", title: "House Robber II", diff: "Medium" },
        { id: 322, slug: "coin-change", title: "Coin Change", diff: "Medium" },
        { id: 300, slug: "longest-increasing-subsequence", title: "Longest Increasing Subsequence", diff: "Medium" },
        { id: 62, slug: "unique-paths", title: "Unique Paths", diff: "Medium" },
        { id: 416, slug: "partition-equal-subset-sum", title: "Partition Equal Subset Sum", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 1143, slug: "longest-common-subsequence", title: "Longest Common Subsequence", diff: "Medium" },
        { id: 72, slug: "edit-distance", title: "Edit Distance", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "hashing",
    title: "Hashing / Hash Maps",
    file: "hashing.ts",
    exportName: "HASHING_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 217, slug: "contains-duplicate", title: "Contains Duplicate", diff: "Easy" },
        { id: 242, slug: "valid-anagram", title: "Valid Anagram", diff: "Easy" },
        { id: 1, slug: "two-sum", title: "Two Sum", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 49, slug: "group-anagrams", title: "Group Anagrams", diff: "Medium" },
        { id: 347, slug: "top-k-frequent-elements", title: "Top K Frequent Elements", diff: "Medium" },
        { id: 128, slug: "longest-consecutive-sequence", title: "Longest Consecutive Sequence", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 560, slug: "subarray-sum-equals-k", title: "Subarray Sum Equals K", diff: "Medium" },
        { id: 3, slug: "longest-substring-without-repeating-characters", title: "Longest Substring Without Repeating Characters", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "stack",
    title: "Stack",
    file: "stack.ts",
    exportName: "STACK_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 20, slug: "valid-parentheses", title: "Valid Parentheses", diff: "Easy" },
        { id: 155, slug: "min-stack", title: "Min Stack", diff: "Medium" },
        { id: 150, slug: "evaluate-reverse-polish-notation", title: "Evaluate Reverse Polish Notation", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 739, slug: "daily-temperatures", title: "Daily Temperatures", diff: "Medium" },
        { id: 496, slug: "next-greater-element-i", title: "Next Greater Element I", diff: "Easy" },
        { id: 853, slug: "car-fleet", title: "Car Fleet", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 84, slug: "largest-rectangle-in-histogram", title: "Largest Rectangle in Histogram", diff: "Hard" },
        { id: 224, slug: "basic-calculator", title: "Basic Calculator", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    file: "linked-list.ts",
    exportName: "LINKED_LIST_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 206, slug: "reverse-linked-list", title: "Reverse Linked List", diff: "Easy" },
        { id: 21, slug: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", diff: "Easy" },
        { id: 141, slug: "linked-list-cycle", title: "Linked List Cycle", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 19, slug: "remove-nth-node-from-end-of-list", title: "Remove Nth Node From End of List", diff: "Medium" },
        { id: 143, slug: "reorder-list", title: "Reorder List", diff: "Medium" },
        { id: 2, slug: "add-two-numbers", title: "Add Two Numbers", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 138, slug: "copy-list-with-random-pointer", title: "Copy List with Random Pointer", diff: "Medium" },
        { id: 25, slug: "reverse-nodes-in-k-group", title: "Reverse Nodes in k-Group", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "trees",
    title: "Trees / BST",
    file: "trees.ts",
    exportName: "TREES_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 104, slug: "maximum-depth-of-binary-tree", title: "Maximum Depth of Binary Tree", diff: "Easy" },
        { id: 226, slug: "invert-binary-tree", title: "Invert Binary Tree", diff: "Easy" },
        { id: 102, slug: "binary-tree-level-order-traversal", title: "Binary Tree Level Order Traversal", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 543, slug: "diameter-of-binary-tree", title: "Diameter of Binary Tree", diff: "Easy" },
        { id: 110, slug: "balanced-binary-tree", title: "Balanced Binary Tree", diff: "Easy" },
        { id: 236, slug: "lowest-common-ancestor-of-a-binary-tree", title: "Lowest Common Ancestor of a Binary Tree", diff: "Medium" },
        { id: 199, slug: "binary-tree-right-side-view", title: "Binary Tree Right Side View", diff: "Medium" },
      ]},
      { title: "BST", topics: [
        { id: 98, slug: "validate-binary-search-tree", title: "Validate Binary Search Tree", diff: "Medium" },
        { id: 230, slug: "kth-smallest-element-in-a-bst", title: "Kth Smallest Element in a BST", diff: "Medium" },
        { id: 105, slug: "construct-binary-tree-from-preorder-and-inorder-traversal", title: "Construct Binary Tree from Preorder and Inorder Traversal", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    file: "graphs.ts",
    exportName: "GRAPHS_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 200, slug: "number-of-islands", title: "Number of Islands", diff: "Medium" },
        { id: 133, slug: "clone-graph", title: "Clone Graph", diff: "Medium" },
        { id: 733, slug: "flood-fill", title: "Flood Fill", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 207, slug: "course-schedule", title: "Course Schedule", diff: "Medium" },
        { id: 210, slug: "course-schedule-ii", title: "Course Schedule II", diff: "Medium" },
        { id: 417, slug: "pacific-atlantic-water-flow", title: "Pacific Atlantic Water Flow", diff: "Medium" },
        { id: 994, slug: "rotting-oranges", title: "Rotting Oranges", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 743, slug: "network-delay-time", title: "Network Delay Time", diff: "Medium" },
        { id: 787, slug: "cheapest-flights-within-k-stops", title: "Cheapest Flights Within K Stops", diff: "Medium" },
        { id: 127, slug: "word-ladder", title: "Word Ladder", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "prefix-sum",
    title: "Prefix Sum",
    file: "prefix-sum.ts",
    exportName: "PREFIX_SUM_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 1480, slug: "running-sum-of-1d-array", title: "Running Sum of 1d Array", diff: "Easy" },
        { id: 303, slug: "range-sum-query-immutable", title: "Range Sum Query - Immutable", diff: "Easy" },
        { id: 724, slug: "find-pivot-index", title: "Find Pivot Index", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 560, slug: "subarray-sum-equals-k", title: "Subarray Sum Equals K", diff: "Medium" },
        { id: 525, slug: "contiguous-array", title: "Contiguous Array", diff: "Medium" },
        { id: 238, slug: "product-of-array-except-self", title: "Product of Array Except Self", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 974, slug: "subarray-sums-divisible-by-k", title: "Subarray Sums Divisible by K", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "intervals",
    title: "Intervals",
    file: "intervals.ts",
    exportName: "INTERVALS_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 56, slug: "merge-intervals", title: "Merge Intervals", diff: "Medium" },
        { id: 57, slug: "insert-interval", title: "Insert Interval", diff: "Medium" },
        { id: 435, slug: "non-overlapping-intervals", title: "Non-overlapping Intervals", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 252, slug: "meeting-rooms", title: "Meeting Rooms", diff: "Easy", premium: true },
        { id: 253, slug: "meeting-rooms-ii", title: "Meeting Rooms II", diff: "Medium", premium: true },
        { id: 452, slug: "minimum-number-of-arrows-to-burst-balloons", title: "Minimum Number of Arrows to Burst Balloons", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 759, slug: "employee-free-time", title: "Employee Free Time", diff: "Hard", premium: true },
      ]},
    ],
  },
  {
    id: "greedy",
    title: "Greedy",
    file: "greedy.ts",
    exportName: "GREEDY_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 122, slug: "best-time-to-buy-and-sell-stock-ii", title: "Best Time to Buy and Sell Stock II", diff: "Medium" },
        { id: 455, slug: "assign-cookies", title: "Assign Cookies", diff: "Easy" },
        { id: 55, slug: "jump-game", title: "Jump Game", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 45, slug: "jump-game-ii", title: "Jump Game II", diff: "Medium" },
        { id: 134, slug: "gas-station", title: "Gas Station", diff: "Medium" },
        { id: 763, slug: "partition-labels", title: "Partition Labels", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 621, slug: "task-scheduler", title: "Task Scheduler", diff: "Medium" },
        { id: 135, slug: "candy", title: "Candy", diff: "Hard" },
      ]},
    ],
  },
  {
    id: "union-find",
    title: "Union Find / DSU",
    file: "union-find.ts",
    exportName: "UNION_FIND_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 547, slug: "number-of-provinces", title: "Number of Provinces", diff: "Medium" },
        { id: 684, slug: "redundant-connection", title: "Redundant Connection", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 721, slug: "accounts-merge", title: "Accounts Merge", diff: "Medium" },
        { id: 947, slug: "most-stones-removed-with-same-row-or-column", title: "Most Stones Removed with Same Row or Column", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 323, slug: "number-of-connected-components-in-an-undirected-graph", title: "Number of Connected Components in an Undirected Graph", diff: "Medium", premium: true },
        { id: 1584, slug: "min-cost-to-connect-all-points", title: "Min Cost to Connect All Points", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "trie",
    title: "Trie",
    file: "trie.ts",
    exportName: "TRIE_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 208, slug: "implement-trie-prefix-tree", title: "Implement Trie (Prefix Tree)", diff: "Medium" },
        { id: 211, slug: "design-add-and-search-words-data-structure", title: "Design Add and Search Words Data Structure", diff: "Medium" },
      ]},
      { title: "Medium", topics: [
        { id: 648, slug: "replace-words", title: "Replace Words", diff: "Medium" },
        { id: 677, slug: "map-sum-pairs", title: "Map Sum Pairs", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 212, slug: "word-search-ii", title: "Word Search II", diff: "Hard" },
        { id: 421, slug: "maximum-xor-of-two-numbers-in-an-array", title: "Maximum XOR of Two Numbers in an Array", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    file: "bit-manipulation.ts",
    exportName: "BIT_MANIPULATION_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 136, slug: "single-number", title: "Single Number", diff: "Easy" },
        { id: 191, slug: "number-of-1-bits", title: "Number of 1 Bits", diff: "Easy" },
        { id: 338, slug: "counting-bits", title: "Counting Bits", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 268, slug: "missing-number", title: "Missing Number", diff: "Easy" },
        { id: 190, slug: "reverse-bits", title: "Reverse Bits", diff: "Easy" },
        { id: 371, slug: "sum-of-two-integers", title: "Sum of Two Integers", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 137, slug: "single-number-ii", title: "Single Number II", diff: "Medium" },
      ]},
    ],
  },
  {
    id: "divide-conquer",
    title: "Divide & Conquer",
    file: "divide-conquer.ts",
    exportName: "DIVIDE_CONQUER_SOLUTIONS",
    subs: [
      { title: "Foundation", topics: [
        { id: 88, slug: "merge-sorted-array", title: "Merge Sorted Array", diff: "Easy" },
        { id: 169, slug: "majority-element", title: "Majority Element", diff: "Easy" },
      ]},
      { title: "Medium", topics: [
        { id: 912, slug: "sort-an-array", title: "Sort an Array", diff: "Medium" },
        { id: 215, slug: "kth-largest-element-in-an-array", title: "Kth Largest Element in an Array", diff: "Medium" },
      ]},
      { title: "Advanced", topics: [
        { id: 315, slug: "count-of-smaller-numbers-after-self", title: "Count of Smaller Numbers After Self", diff: "Hard" },
        { id: 53, slug: "maximum-subarray", title: "Maximum Subarray", diff: "Medium" },
      ]},
    ],
  },
];

function emitEntry(topicId, p) {
  let body = bodyFor(topicId, p.slug, p.title, !!p.premium);
  // Unescape template escapes that came from AlgoJS .ts sources
  body = body
    .replace(/\\`/g, "`")
    .replace(/\\\$\{/g, "${")
    .replace(/\\\\/g, "\\")
    .replace(/\r\n/g, "\n");
  const prem = p.premium ? `\n      premium: true,` : "";
  return `    {
      id: ${p.id},
      lcSlug: ${JSON.stringify(p.slug)},
      title: ${JSON.stringify(p.title)},
      diff: ${JSON.stringify(p.diff)},${prem}
      body: ${JSON.stringify(body)},
    }`;
}

let total = 0;
const exportNames = [];

for (const topic of TOPICS) {
  const subs = topic.subs
    .map((sub) => {
      const entries = sub.topics.map((p) => {
        total++;
        return emitEntry(topic.id, p);
      });
      return `    {
      title: ${JSON.stringify(sub.title)},
      topics: [
${entries.join(",\n")},
      ],
    }`;
    })
    .join(",\n");

  const content = `import type { SolutionGroup } from "@/data/solutions/types";

export const ${topic.exportName}: SolutionGroup = {
  id: ${JSON.stringify(topic.id)},
  title: ${JSON.stringify(topic.title)},
  subs: [
${subs},
  ],
};
`;
  fs.writeFileSync(path.join(OUT, topic.file), content);
  exportNames.push({ exportName: topic.exportName, file: topic.file.replace(/\.ts$/, "") });
  console.log("wrote", topic.file);
}

const topicsTs = `import type { SolutionGroup } from "@/data/solutions/types";
${exportNames.map((e) => `import { ${e.exportName} } from "./${e.file}";`).join("\n")}

export const PERSONAL_SOLUTION_GROUPS: SolutionGroup[] = [
${exportNames.map((e) => `  ${e.exportName},`).join("\n")}
];

export const PERSONAL_SOLUTION_COUNT = PERSONAL_SOLUTION_GROUPS.reduce(
  (n, g) => n + g.subs.reduce((m, s) => m + s.topics.length, 0),
  0,
);
`;

fs.writeFileSync(path.join(OUT, "topics.ts"), topicsTs);
console.log("done, total problems:", total);
