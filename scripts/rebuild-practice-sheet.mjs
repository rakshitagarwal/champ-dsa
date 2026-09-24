/**
 * Rebuild PRACTICE_SHEET:
 * - Keep ALL original problems (never remove)
 * - Use RisingBrain topic → pattern grouping + hints
 * - Only add RB LeetCode problems that are crucial and missing
 *
 * Run: node scripts/rebuild-practice-sheet.mjs
 */
import fs from "fs";

const originalSrc = fs.readFileSync(
  "data/practice/leetcode-sheet.original.ts",
  "utf8",
);
const rbTopics = JSON.parse(
  fs.readFileSync("data/practice/risingbrain-sheet.json", "utf8"),
);

/** Parse p("Title", "slug", "diff") from original sheet, with group/sub context. */
function parseOriginal(src) {
  const groups = [];
  let currentGroup = null;
  let currentSub = null;
  let pendingId = null;
  let pendingIdIndent = 0;

  for (const line of src.split(/\r?\n/)) {
    const idM = line.match(/^( +)id:\s*"([^"]+)",\s*$/);
    if (idM) {
      pendingId = idM[2];
      pendingIdIndent = idM[1].length;
      continue;
    }
    const titleM = line.match(/^( +)title:\s*"([^"]+)",\s*$/);
    if (titleM && pendingId != null) {
      const indent = titleM[1].length;
      // Group headers sit at 4 spaces; subsection headers at 8
      if (pendingIdIndent <= 4 && indent <= 4) {
        currentGroup = {
          id: pendingId,
          title: titleM[2],
          subsections: [],
        };
        groups.push(currentGroup);
        currentSub = null;
      } else if (currentGroup) {
        currentSub = {
          id: pendingId,
          title: titleM[2],
          problems: [],
        };
        currentGroup.subsections.push(currentSub);
      }
      pendingId = null;
      continue;
    }
    const pMatch = line.match(
      /p\("((?:\\.|[^"\\])*)",\s*"([^"]+)",\s*"(easy|medium|hard)"\)/,
    );
    if (pMatch && currentSub) {
      currentSub.problems.push({
        title: pMatch[1].replace(/\\"/g, '"'),
        slug: pMatch[2],
        difficulty: pMatch[3],
      });
    }
  }
  return groups;
}

const originalGroups = parseOriginal(originalSrc);

/** slug → { title, difficulty, oldGroupId, oldSubTitle } */
const bySlug = new Map();
for (const g of originalGroups) {
  for (const s of g.subsections) {
    for (const p of s.problems) {
      if (!bySlug.has(p.slug)) {
        bySlug.set(p.slug, {
          ...p,
          oldGroupId: g.id,
          oldSubTitle: s.title,
        });
      }
    }
  }
}

console.log("original unique slugs:", bySlug.size);

/**
 * Map old group/subsection → RisingBrain topic + pattern name.
 * Used to place original problems into the new hierarchy.
 */
function targetBucket(oldGroupId, oldSubTitle, slug) {
  const sub = oldSubTitle.toLowerCase();

  // Explicit slug overrides for classic misplaced items
  const SLUG_OVERRIDE = {
    "trapping-rain-water": ["Array", "Two-Pointer"],
    "container-with-most-water": ["Array", "Two-Pointer"],
    "sliding-window-maximum": ["Array", "Sliding Window"],
    "lru-cache": ["Double Linked List", "Basic DLL Operations"],
    "lfu-cache": ["Double Linked List", "Basic DLL Operations"],
    "best-time-to-buy-and-sell-stock": ["Dynamic Programming", "DP on Stocks"],
    "best-time-to-buy-and-sell-stock-ii": ["Dynamic Programming", "DP on Stocks"],
    "best-time-to-buy-and-sell-stock-iii": ["Dynamic Programming", "DP on Stocks"],
    "best-time-to-buy-and-sell-stock-iv": ["Dynamic Programming", "DP on Stocks"],
    "best-time-to-buy-and-sell-stock-with-cooldown": [
      "Dynamic Programming",
      "DP on Stocks",
    ],
    "best-time-to-buy-and-sell-stock-with-transaction-fee": [
      "Dynamic Programming",
      "DP on Stocks",
    ],
    "word-break": ["Trie", "Word Break / Segmentation"],
    "word-break-ii": ["Dynamic Programming", "DP on Strings"],
    "implement-trie-prefix-tree": ["Trie", "Basic Trie Operations"],
    "maximum-xor-of-two-numbers-in-an-array": ["Trie", "Bitwise Trie / XOR"],
    "house-robber-iii": ["Dynamic Programming", "DP on Trees / DAGs"],
    "burst-balloons": ["Dynamic Programming", "DP on Intervals"],
    "minimum-cost-to-cut-a-stick": ["Dynamic Programming", "DP on Intervals"],
    "course-schedule": ["Graph", "Topological Sort"],
    "course-schedule-ii": ["Graph", "Topological Sort"],
    "network-delay-time": ["Graph", "Dijkstra (Weighted)"],
    "cheapest-flights-within-k-stops": ["Graph", "Bellman-Ford"],
    "min-cost-to-connect-all-points": ["Graph", "MST / Union-Find"],
    "redundant-connection": ["Graph", "MST / Union-Find"],
    "accounts-merge": ["Graph", "MST / Union-Find"],
    "number-of-islands": ["Graph", "DFS (Connectivity)"],
    "flood-fill": ["Graph", "DFS (Connectivity)"],
    "01-matrix": ["Graph", "BFS Pattern"],
    "rotting-oranges": ["Graph", "BFS Pattern"],
    "word-ladder": ["Graph", "BFS Pattern"],
    "pacific-atlantic-water-flow": ["Graph", "DFS (Connectivity)"],
    "surrounded-regions": ["Graph", "DFS (Connectivity)"],
    "clone-graph": ["Graph", "DFS (Connectivity)"],
    "graph-valid-tree": ["Graph", "MST / Union-Find"],
    "number-of-connected-components-in-an-undirected-graph": [
      "Graph",
      "MST / Union-Find",
    ],
    "alien-dictionary": ["Graph", "Topological Sort"],
    "longest-consecutive-sequence": ["HashMap", "Frequency Map / Counting"],
    "subarray-sum-equals-k": ["HashMap", "Prefix-Sum with Map"],
    "contiguous-array": ["HashMap", "Prefix-Sum with Map"],
    "top-k-frequent-elements": ["Heap", "Top-K Elements"],
    "kth-largest-element-in-an-array": ["Heap", "Top-K Elements"],
    "find-median-from-data-stream": ["Heap", "Top-K Elements"],
    "merge-k-sorted-lists": ["Heap", "Merge K Sorted"],
    "task-scheduler": ["Heap", "Heap with Sliding Window"],
    "reorganize-string": ["Heap", "Huffman pattern"],
    "maximum-subarray": ["Array", "Kadane's Algorithm"],
    "maximum-product-subarray": ["Array", "Kadane's Algorithm"],
    "maximum-sum-circular-subarray": ["Array", "Kadane's Algorithm"],
    "next-greater-element-i": ["Stack", "Monotonic Stack"],
    "daily-temperatures": ["Stack", "Monotonic Stack"],
    "largest-rectangle-in-histogram": ["Stack", "Monotonic Stack"],
    "online-stock-span": ["Stack", "Monotonic Stack"],
    "valid-parentheses": ["Stack", "Parenthesis & Scoring"],
    "min-stack": ["Stack", "Stack-Based Design"],
    "implement-queue-using-stacks": ["Stack", "Stack-Based Design"],
    "decode-string": ["Stack", "Expression Evaluation"],
    "basic-calculator": ["Stack", "Expression Evaluation"],
    "basic-calculator-ii": ["Stack", "Expression Evaluation"],
    "evaluate-reverse-polish-notation": ["Stack", "Expression Evaluation"],
    "remove-k-digits": ["Stack", "Stack + Greedy"],
    "backspace-string-compare": ["Stack", "Stack Simulation / Undo Operation"],
    "jump-game": ["Greedy", "Intervals & Reach"],
    "jump-game-ii": ["Greedy", "Intervals & Reach"],
    "merge-intervals": ["Greedy", "Intervals & Reach"],
    "insert-interval": ["Greedy", "Intervals & Reach"],
    "non-overlapping-intervals": ["Greedy", "Intervals & Reach"],
    "meeting-rooms": ["Greedy", "Intervals & Reach"],
    "meeting-rooms-ii": ["Greedy", "Intervals & Reach"],
    "gas-station": ["Greedy", "Sorting / Local Choice"],
    "candy": ["Greedy", "Sorting / Local Choice"],
    "partition-labels": ["Greedy", "Sorting / Local Choice"],
    "assign-cookies": ["Greedy", "Sorting / Local Choice"],
    "n-queens": ["Backtracking", "Constraint-Based Backtracking"],
    "sudoku-solver": ["Backtracking", "Grid / Path Backtracking"],
    "word-search": ["Backtracking", "Grid / Path Backtracking"],
    "word-search-ii": ["Backtracking", "Grid / Path Backtracking"],
    "letter-combinations-of-a-phone-number": [
      "Backtracking",
      "Decision Tree / Sequence Generation",
    ],
    "expression-add-operators": [
      "Backtracking",
      "Decision Tree / Sequence Generation",
    ],
    "generate-parentheses": ["Backtracking", "Choice-Based Backtracking"],
    "subsets": ["Backtracking", "Choice-Based Backtracking"],
    "permutations": ["Backtracking", "Choice-Based Backtracking"],
    "combination-sum": ["Backtracking", "Choice-Based Backtracking"],
    "climbing-stairs": ["Dynamic Programming", "1D / Linear DP"],
    "house-robber": ["Dynamic Programming", "1D / Linear DP"],
    "house-robber-ii": ["Dynamic Programming", "1D / Linear DP"],
    "decode-ways": ["Dynamic Programming", "1D / Linear DP"],
    "coin-change": ["Dynamic Programming", "Knapsack / Subset Sum"],
    "coin-change-ii": ["Dynamic Programming", "Knapsack / Subset Sum"],
    "partition-equal-subset-sum": ["Dynamic Programming", "Knapsack / Subset Sum"],
    "target-sum": ["Dynamic Programming", "Knapsack / Subset Sum"],
    "unique-paths": ["Dynamic Programming", "2D / Grid DP"],
    "unique-paths-ii": ["Dynamic Programming", "2D / Grid DP"],
    "minimum-path-sum": ["Dynamic Programming", "2D / Grid DP"],
    "longest-common-subsequence": ["Dynamic Programming", "DP on Strings"],
    "edit-distance": ["Dynamic Programming", "DP on Strings"],
    "longest-palindromic-subsequence": ["Dynamic Programming", "DP on Strings"],
    "longest-palindromic-substring": ["Dynamic Programming", "DP on Strings"],
    "single-number": ["Bit Manipulation", "Basic Bit Operations"],
    "missing-number": ["Bit Manipulation", "Basic Bit Operations"],
    "number-of-1-bits": ["Bit Manipulation", "Basic Bit Operations"],
    "counting-bits": ["Bit Manipulation", "Basic Bit Operations"],
    "power-of-two": ["Bit Manipulation", "Basic Bit Operations"],
    "reverse-bits": ["Bit Manipulation", "Basic Bit Operations"],
    "koko-eating-bananas": ["Binary Search", "Binary Search on Answers"],
    "capacity-to-ship-packages-within-d-days": [
      "Binary Search",
      "Binary Search on Answers",
    ],
    "search-a-2d-matrix": ["Binary Search", "Search in 2D Matrix"],
    "search-a-2d-matrix-ii": ["Binary Search", "Search in 2D Matrix"],
    "find-first-and-last-position-of-element-in-sorted-array": [
      "Binary Search",
      "Lower / Upper Bound",
    ],
    "binary-search": ["Binary Search", "Classic Binary Search"],
    "search-in-rotated-sorted-array": ["Binary Search", "Classic Binary Search"],
    "find-minimum-in-rotated-sorted-array": [
      "Binary Search",
      "Classic Binary Search",
    ],
    "reverse-linked-list": ["Linked List", "Reversal Pattern"],
    "linked-list-cycle": ["Linked List", "Fast and Slow Pointers"],
    "linked-list-cycle-ii": ["Linked List", "Fast and Slow Pointers"],
    "middle-of-the-linked-list": ["Linked List", "Fast and Slow Pointers"],
    "merge-two-sorted-lists": ["Linked List", "Merge / Sort"],
    "sort-list": ["Linked List", "Merge / Sort"],
    "reorder-list": ["Linked List", "Reversal Pattern"],
    "add-two-numbers": ["Linked List", "LinkedList with Stack/HashMap"],
    "copy-list-with-random-pointer": ["Linked List", "Basic Operations"],
    "remove-nth-node-from-end-of-list": ["Linked List", "Basic Operations"],
    "lowest-common-ancestor-of-a-binary-tree": [
      "Binary Tree",
      "Lowest Common Ancestor",
    ],
    "lowest-common-ancestor-of-a-binary-search-tree": [
      "Binary Tree",
      "Lowest Common Ancestor",
    ],
    "binary-tree-level-order-traversal": ["Binary Tree", "BFS / Level-Order"],
    "binary-tree-zigzag-level-order-traversal": [
      "Binary Tree",
      "BFS / Level-Order",
    ],
    "serialize-and-deserialize-binary-tree": [
      "Binary Tree",
      "Serialization / Construction",
    ],
    "construct-binary-tree-from-preorder-and-inorder-traversal": [
      "Binary Tree",
      "Serialization / Construction",
    ],
    "validate-binary-search-tree": ["Binary Tree", "BST"],
    "insert-into-a-binary-search-tree": ["Binary Tree", "BST"],
    "delete-node-in-a-bst": ["Binary Tree", "BST"],
    "kth-smallest-element-in-a-bst": ["Binary Tree", "BST"],
    "invert-binary-tree": ["Binary Tree", "Serialization / Construction"],
    "maximum-depth-of-binary-tree": ["Binary Tree", "DFS Traversals"],
    "diameter-of-binary-tree": ["Binary Tree", "DFS Traversals"],
    "path-sum": ["Binary Tree", "DFS Traversals"],
    "path-sum-ii": ["Binary Tree", "DFS Traversals"],
    "path-sum-iii": ["Binary Tree", "DFS Traversals"],
    "flatten-a-multilevel-doubly-linked-list": [
      "Double Linked List",
      "Merge / Sort / Reorder",
    ],
    // Strings
    "valid-palindrome": ["Strings", "Two-Pointer (Palindrome)"],
    "valid-palindrome-ii": ["Strings", "Two-Pointer (Palindrome)"],
    "reverse-string": ["Strings", "Two-Pointer (Palindrome)"],
    "longest-substring-without-repeating-characters": [
      "Strings",
      "Sliding Window (String)",
    ],
    "minimum-window-substring": ["Strings", "Sliding Window (String)"],
    "longest-repeating-character-replacement": [
      "Strings",
      "Sliding Window (String)",
    ],
    "find-all-anagrams-in-a-string": ["Strings", "Sliding Window (String)"],
    "permutation-in-string": ["Strings", "Sliding Window (String)"],
    // Recursion staples
    "powx-n": ["Recursion", "Linear Recursion"],
    "fibonacci-number": ["Recursion", "Non-Linear Recursion"],
    "median-of-two-sorted-arrays": ["Recursion", "Divide & Conquer"],
  };
  if (SLUG_OVERRIDE[slug]) return SLUG_OVERRIDE[slug];

  // Group-level defaults
  const GROUP_DEFAULT = {
    hashing: ["HashMap", "Frequency Map / Counting"],
    arrays: ["Array", "Two-Pointer"],
    "prefix-sum": ["Array", "Prefix Sum"],
    "two-pointers": ["Array", "Two-Pointer"],
    "sliding-window": ["Array", "Sliding Window"],
    intervals: ["Greedy", "Intervals & Reach"],
    "stack-queue": ["Stack", "Stack-Based Design"],
    "monotonic-stack": ["Stack", "Monotonic Stack"],
    "linked-list": ["Linked List", "Basic Operations"],
    "binary-search": ["Binary Search", "Classic Binary Search"],
    trees: ["Binary Tree", "DFS Traversals"],
    heap: ["Heap", "Top-K Elements"],
    graphs: ["Graph", "DFS (Connectivity)"],
    "union-find": ["Graph", "MST / Union-Find"],
    backtracking: ["Backtracking", "Choice-Based Backtracking"],
    dp: ["Dynamic Programming", "1D / Linear DP"],
    greedy: ["Greedy", "Sorting / Local Choice"],
    bits: ["Bit Manipulation", "Basic Bit Operations"],
    trie: ["Trie", "Basic Trie Operations"],
    "range-queries": ["Array", "Prefix Sum"],
    strings: ["Strings", "Sliding Window (String)"],
  };

  // Refine by old subsection keywords
  if (oldGroupId === "arrays") {
    if (sub.includes("matrix")) return ["Array", "Two-Pointer"]; // keep matrix under Array (no Matrix topic on RB)
    if (sub.includes("subarray")) return ["Array", "Kadane's Algorithm"];
    if (sub.includes("inplace") || sub.includes("missing"))
      return ["Array", "Two-Pointer"];
  }
  if (oldGroupId === "two-pointers") {
    if (sub.includes("palindrome")) return ["Strings", "Two-Pointer (Palindrome)"];
    return ["Array", "Two-Pointer"];
  }
  if (oldGroupId === "sliding-window") {
    if (sub.includes("substring") || sub.includes("string"))
      return ["Strings", "Sliding Window (String)"];
    return ["Array", "Sliding Window"];
  }
  if (oldGroupId === "binary-search") {
    if (sub.includes("answer")) return ["Binary Search", "Binary Search on Answers"];
    return ["Binary Search", "Classic Binary Search"];
  }
  if (oldGroupId === "stack-queue") {
    if (sub.includes("paren") || sub.includes("string"))
      return ["Stack", "Parenthesis & Scoring"];
    if (sub.includes("eval") || sub.includes("calc"))
      return ["Stack", "Expression Evaluation"];
    return ["Stack", "Stack-Based Design"];
  }
  if (oldGroupId === "trees") {
    if (sub.includes("bfs") || sub.includes("level"))
      return ["Binary Tree", "BFS / Level-Order"];
    if (sub.includes("bst")) return ["Binary Tree", "BST"];
    if (sub.includes("path") || sub.includes("lca") || sub.includes("construct"))
      return ["Binary Tree", "DFS Traversals"];
    return ["Binary Tree", "DFS Traversals"];
  }
  if (oldGroupId === "graphs") {
    if (sub.includes("topo") || sub.includes("cycle"))
      return ["Graph", "Topological Sort"];
    if (sub.includes("shortest")) return ["Graph", "Dijkstra (Weighted)"];
    if (sub.includes("grid") || sub.includes("bfs")) return ["Graph", "BFS Pattern"];
    return ["Graph", "DFS (Connectivity)"];
  }
  if (oldGroupId === "heap") {
    if (sub.includes("merge")) return ["Heap", "Merge K Sorted"];
    if (sub.includes("schedule")) return ["Heap", "Huffman pattern"];
    return ["Heap", "Top-K Elements"];
  }
  if (oldGroupId === "dp") {
    if (sub.includes("grid")) return ["Dynamic Programming", "2D / Grid DP"];
    if (sub.includes("string")) return ["Dynamic Programming", "DP on Strings"];
    if (sub.includes("stock")) return ["Dynamic Programming", "DP on Stocks"];
    if (sub.includes("hard") || sub.includes("interval"))
      return ["Dynamic Programming", "DP on Intervals"];
    if (sub.includes("1-d") || sub.includes("1d"))
      return ["Dynamic Programming", "1D / Linear DP"];
    return ["Dynamic Programming", "1D / Linear DP"];
  }
  if (oldGroupId === "backtracking") {
    if (sub.includes("board") || sub.includes("hard"))
      return ["Backtracking", "Grid / Path Backtracking"];
    return ["Backtracking", "Choice-Based Backtracking"];
  }
  if (oldGroupId === "greedy") {
    if (sub.includes("jump") || sub.includes("gas"))
      return ["Greedy", "Intervals & Reach"];
    return ["Greedy", "Sorting / Local Choice"];
  }
  if (oldGroupId === "strings") {
    if (sub.includes("parse")) return ["Strings", "Two-Pointer (Palindrome)"];
    return ["Strings", "Sliding Window (String)"];
  }
  if (oldGroupId === "hashing") {
    if (sub.includes("cache") || sub.includes("design"))
      return ["Double Linked List", "Basic DLL Operations"];
    return ["HashMap", "Frequency Map / Counting"];
  }
  if (oldGroupId === "linked-list") {
    if (sub.includes("advanced") || sub.includes("hard"))
      return ["Linked List", "Reversal Pattern"];
    return ["Linked List", "Basic Operations"];
  }
  if (oldGroupId === "bits") {
    if (sub.includes("math")) return ["Bit Manipulation", "Basic Bit Operations"];
    return ["Bit Manipulation", "Basic Bit Operations"];
  }

  return GROUP_DEFAULT[oldGroupId] || ["Array", "Two-Pointer"];
}

/** Crucial RB problems to ADD only if missing from original. Keep this short. */
const CRUCIAL_ADD = new Set([
  // High-frequency interview staples often taught with these patterns
  "two-sum-ii-input-array-is-sorted",
  "find-all-anagrams-in-a-string",
  "permutation-in-string",
  "longest-repeating-character-replacement",
  "max-consecutive-ones-iii",
  "fruit-into-baskets",
  "minimum-size-subarray-sum",
  "asteroid-collision",
  "next-greater-element-ii",
  "remove-all-adjacent-duplicates-in-string",
  "longest-valid-parentheses",
  "remove-k-digits",
  "odd-even-linked-list",
  "palindrome-linked-list",
  "reverse-linked-list-ii",
  "sort-characters-by-frequency",
  "top-k-frequent-words",
  "keys-and-rooms",
  "number-of-provinces",
  "shortest-path-in-binary-matrix",
  "house-robber-iii",
  "unique-paths-iii",
  "largest-number",
  "powx-n",
  "search-insert-position",
  "find-pivot-index",
  "continuous-subarray-sum",
  "subarray-sums-divisible-by-k",
  "concatenated-words",
  "design-add-and-search-words-data-structure",
]);

// Cap additions: only from CRUCIAL_ADD ∩ RB \ original
const rbBySlug = new Map();
for (const topic of rbTopics) {
  for (const pattern of topic.patterns) {
    for (const p of pattern.problems) {
      if (!rbBySlug.has(p.slug)) {
        rbBySlug.set(p.slug, {
          ...p,
          topic: topic.name,
          pattern: pattern.name,
        });
      }
    }
  }
}

const toAdd = [];
for (const slug of CRUCIAL_ADD) {
  if (bySlug.has(slug)) continue;
  const rb = rbBySlug.get(slug);
  if (!rb) continue;
  toAdd.push(rb);
}

console.log("crucial adds:", toAdd.length);

// Build empty RB skeleton: topic → pattern → []
const skeleton = rbTopics.map((t) => ({
  name: t.name,
  description: t.description,
  patterns: t.patterns.map((p) => ({
    name: p.name,
    identification: p.identification,
    problems: [],
  })),
}));

function findPattern(topicName, patternName) {
  const topic = skeleton.find((t) => t.name === topicName);
  if (!topic) return null;
  return topic.patterns.find((p) => p.name === patternName) || null;
}

function place(problem, topicName, patternName) {
  let pat = findPattern(topicName, patternName);
  if (!pat) {
    // fallback: first pattern of topic
    const topic = skeleton.find((t) => t.name === topicName);
    pat = topic?.patterns[0];
  }
  if (!pat) {
    skeleton[0].patterns[0].problems.push(problem);
    return;
  }
  if (pat.problems.some((x) => x.slug === problem.slug)) return;
  pat.problems.push({
    title: problem.title,
    slug: problem.slug,
    difficulty: problem.difficulty,
  });
}

// Place all original problems
for (const [slug, info] of bySlug) {
  const [topic, pattern] = targetBucket(
    info.oldGroupId,
    info.oldSubTitle,
    slug,
  );
  place(info, topic, pattern);
}

// Place crucial adds into their RB pattern
for (const rb of toAdd) {
  place(rb, rb.topic, rb.pattern);
}

// Verify nothing lost
const placed = new Set();
for (const t of skeleton) {
  for (const p of t.patterns) {
    for (const prob of p.problems) placed.add(prob.slug);
  }
}
const missing = [...bySlug.keys()].filter((s) => !placed.has(s));
if (missing.length) {
  console.error("LOST PROBLEMS:", missing);
  process.exit(1);
}

console.log("final unique:", placed.size);
console.log(
  "per topic:",
  skeleton
    .map(
      (t) =>
        `${t.name}:${t.patterns.reduce((a, p) => a + p.problems.length, 0)}`,
    )
    .join(", "),
);

// --- Generate TS ---
const PATTERN_SLUG = {
  Array: "arrays-strings",
  Strings: "strings",
  "Binary Search": "binary-search",
  Stack: "stack",
  Recursion: "recursion",
  "Linked List": "linked-list",
  "Double Linked List": "linked-list",
  HashMap: "hashing",
  "Binary Tree": "trees",
  Graph: "graphs",
  Heap: "heap",
  Backtracking: "backtracking",
  Greedy: "greedy",
  "Dynamic Programming": "dp",
  Trie: "trie",
  "Bit Manipulation": "bits",
};

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const lines = [];
lines.push(`import { isPremiumLcSlug } from "@/data/practice/premium-slugs";`);
lines.push(`import { isStriverA2zSlug } from "@/data/practice/striver-a2z-slugs";`);
lines.push(`import { lcQuestionNumber } from "@/data/practice/leetcode-ids";`);
lines.push(``);
lines.push(`export type LcDifficulty = "easy" | "medium" | "hard";`);
lines.push(``);
lines.push(`export type LcProblem = {`);
lines.push(`  title: string;`);
lines.push(`  slug: string;`);
lines.push(`  difficulty: LcDifficulty;`);
lines.push(`  /** LeetCode frontend question number (e.g. 1 for Two Sum). */`);
lines.push(`  number?: number;`);
lines.push(`  premium?: boolean;`);
lines.push(`  /** Also on Striver A2Z — solving it advances that sheet too. */`);
lines.push(`  striver?: boolean;`);
lines.push(`};`);
lines.push(``);
lines.push(`export type LcSubsection = {`);
lines.push(`  id: string;`);
lines.push(`  title: string;`);
lines.push(`  /** Pattern identification hint (how to recognize this pattern). */`);
lines.push(`  hint?: string;`);
lines.push(`  problems: LcProblem[];`);
lines.push(`};`);
lines.push(``);
lines.push(`export type LcGroup = {`);
lines.push(`  id: string;`);
lines.push(`  title: string;`);
lines.push(`  patternSlug?: string;`);
lines.push(`  blurb: string;`);
lines.push(`  subsections: LcSubsection[];`);
lines.push(`};`);
lines.push(``);
lines.push(`function p(title: string, slug: string, difficulty: LcDifficulty): LcProblem {`);
lines.push(`  const number = lcQuestionNumber(slug);`);
lines.push(`  return {`);
lines.push(`    title,`);
lines.push(`    slug,`);
lines.push(`    difficulty,`);
lines.push(`    ...(number != null ? { number } : {}),`);
lines.push(`    ...(isPremiumLcSlug(slug) ? { premium: true } : {}),`);
lines.push(`    ...(isStriverA2zSlug(slug) ? { striver: true } : {}),`);
lines.push(`  };`);
lines.push(`}`);
lines.push(``);
lines.push(`/**`);
lines.push(` * Practice sheet — RisingBrain pattern grouping (hints as recognition cues).`);
lines.push(` * Keeps the original problem set; only adds a few crucial missing LC problems.`);
lines.push(` * Grouping inspired by https://risingbrain.org/sheet`);
lines.push(` */`);
lines.push(`export const PRACTICE_SHEET: LcGroup[] = [`);

for (const topic of skeleton) {
  const groupId = slugify(topic.name);
  const patternSlug = PATTERN_SLUG[topic.name];
  lines.push(`  {`);
  lines.push(`    id: "${groupId}",`);
  lines.push(`    title: "${esc(topic.name)}",`);
  if (patternSlug) lines.push(`    patternSlug: "${patternSlug}",`);
  lines.push(`    blurb: "${esc(topic.description)}",`);
  lines.push(`    subsections: [`);
  for (const pattern of topic.patterns) {
    const subId = `${groupId}-${slugify(pattern.name)}`;
    lines.push(`      {`);
    lines.push(`        id: "${subId}",`);
    lines.push(`        title: "${esc(pattern.name)}",`);
    lines.push(`        hint: "${esc(pattern.identification)}",`);
    lines.push(`        problems: [`);
    for (const prob of pattern.problems) {
      lines.push(
        `          p("${esc(prob.title)}", "${prob.slug}", "${prob.difficulty}"),`,
      );
    }
    lines.push(`        ],`);
    lines.push(`      },`);
  }
  lines.push(`    ],`);
  lines.push(`  },`);
}
lines.push(`];`);
lines.push(``);
lines.push(`export function leetcodeUrl(slug: string): string {`);
lines.push(`  return \`https://leetcode.com/problems/\${slug}/\`;`);
lines.push(`}`);
lines.push(``);
lines.push(`export function getAllPracticeProblems(): LcProblem[] {`);
lines.push(`  const seen = new Set<string>();`);
lines.push(`  const out: LcProblem[] = [];`);
lines.push(`  for (const group of PRACTICE_SHEET) {`);
lines.push(`    for (const sub of group.subsections) {`);
lines.push(`      for (const problem of sub.problems) {`);
lines.push(`        if (seen.has(problem.slug)) continue;`);
lines.push(`        seen.add(problem.slug);`);
lines.push(`        out.push(problem);`);
lines.push(`      }`);
lines.push(`    }`);
lines.push(`  }`);
lines.push(`  return out;`);
lines.push(`}`);
lines.push(``);
lines.push(`export function getPracticeProblemCount(): number {`);
lines.push(`  return getAllPracticeProblems().length;`);
lines.push(`}`);
lines.push(``);
lines.push(`export function findSubsectionIdForSlug(slug: string): string | null {`);
lines.push(`  for (const group of PRACTICE_SHEET) {`);
lines.push(`    for (const sub of group.subsections) {`);
lines.push(`      if (sub.problems.some((p) => p.slug === slug)) return sub.id;`);
lines.push(`    }`);
lines.push(`  }`);
lines.push(`  return null;`);
lines.push(`}`);
lines.push(``);

fs.writeFileSync("data/practice/leetcode-sheet.ts", lines.join("\n"));
console.log("wrote data/practice/leetcode-sheet.ts");
console.log(
  "added slugs:\n",
  toAdd.map((a) => a.slug).join("\n "),
);
