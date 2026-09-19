/**
 * Sync solution bodies into content/dsa/*.md pattern examples.
 * Does NOT modify data/solutions.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOLUTIONS_DIR = path.join(ROOT, "data", "solutions");
const CONTENT_DIR = path.join(ROOT, "content", "dsa");

/** Short teaching comments prepended when the solution has almost none. */
const EXTRA_COMMENTS = {
  "climbing-stairs": ["// dp[i] = dp[i-1] + dp[i-2] (1 or 2 steps)"],
  "house-robber": ["// take nums[i]+dp[i-2], or skip → dp[i-1]"],
  "house-robber-ii": ["// circular: exclude first house vs exclude last"],
  "decode-ways": ["// try one digit (1-9) and two digits (10-26)"],
  "coin-change": ["// dp[sum] = fewest coins to make sum"],
  "unique-paths": ["// only right/down; cell = above + left"],
  "unique-paths-ii": ["// obstacles force cell to 0"],
  "longest-common-subsequence": ["// match → diag+1; else max(up, left)"],
  "combination-sum": ["// build combos per sum; keep sorted to avoid dupes"],
  "longest-increasing-subsequence": ["// dp[i] = LIS ending at i"],
  "delete-operation-for-two-strings": ["// answer = m + n - 2*LCS"],
  "maximum-product-subarray": ["// track running max and min (sign flips)"],
  "maximum-subarray": ["// Kadane: extend or restart at nums[i]"],
  "jump-game": ["// move target left when i can reach it"],
  "counting-bits": ["// popcount for every value 0..n"],
  "number-of-1-bits": ["// count set bits with & / >>>"],
  "missing-number": ["// XOR index^value; missing index remains"],
  "reverse-bits": ["// take LSB, place toward MSB side"],
  "power-of-two": ["// exactly one bit set (and n > 0)"],
  "sum-of-two-integers": ["// XOR sum, AND<<1 carry, loop"],
  "sort-integers-by-the-number-of-1-bits": [
    "// primary key: popcount; tie-break: value",
  ],
  "two-sum": ["// map value → index; look for complement"],
  "contains-duplicate": ["// set: if already seen → duplicate"],
  "valid-parentheses": ["// stack push opens; pop must match close"],
  "3sum": ["// sort + fix i; two pointers for the pair"],
  "container-with-most-water": ["// area = min(h)*width; move shorter side"],
  "trapping-rain-water": ["// water = min(leftMax,rightMax) - height"],
  "merge-intervals": ["// sort by start; merge when overlap"],
  "insert-interval": ["// add non-overlap left/right; merge middle"],
  "non-overlapping-intervals": ["// sort by end; greedily keep earliest end"],
  "meeting-rooms": ["// sort starts/ends; check adjacent overlap"],
  "meeting-rooms-ii": ["// track rooms with start/end sweep"],
  "permutations": ["// choose → explore → unchoose every unused index"],
  "combinations": ["// pick k numbers; start index avoids dupes"],
  "subsets": ["// include or skip each element"],
  "subsets-ii": ["// skip duplicates after sort"],
  "n-queens": ["// place one queen per row; block col/diags"],
  "letter-combinations-of-a-phone-number": [
    "// map digit → letters; build all suffixes",
  ],
  "course-schedule": ["// cycle in prereq graph ⇒ false"],
  "number-of-islands": ["// flood-fill each unvisited land"],
  "clone-graph": ["// BFS/DFS + map old node → clone"],
  "valid-palindrome": ["// two pointers; skip non-alnum"],
  "valid-anagram": ["// count chars; must match"],
  "group-anagrams": ["// key = sorted letters"],
  "longest-substring-without-repeating-characters": [
    "// window: shrink when char repeats",
  ],
  "binary-search": ["// mid; go left/right on sorted array"],
  "search-insert-position": ["// lower_bound via binary search"],
  "search-in-rotated-sorted-array": ["// find sorted half; discard other"],
  "find-minimum-in-rotated-sorted-array": ["// pivot = unsorted side"],
  "reverse-linked-list": ["// prev/curr/next rewires"],
  "merge-two-sorted-lists": ["// dummy head; take smaller each step"],
  "linked-list-cycle": ["// Floyd: slow/fast meet ⇒ cycle"],
  "middle-of-the-linked-list": ["// slow/fast; slow lands mid"],
  "implement-trie-prefix-tree": ["// children map; end flag"],
  "design-add-and-search-words-data-structure": [
    "// '.' branches to every child",
  ],
  "same-tree": ["// both null / values equal / recurse kids"],
  "maximum-depth-of-binary-tree": ["// 1 + max(left, right)"],
  "invert-binary-tree": ["// swap children; recurse"],
  "diameter-of-binary-tree": ["// longest path through a node"],
  "validate-binary-search-tree": ["// keep valid (low, high) range"],
  "binary-tree-level-order-traversal": ["// BFS queue by levels"],
  "lowest-common-ancestor-of-a-binary-tree": [
    "// if split across sides → node is LCA",
  ],
  "binary-tree-maximum-path-sum": ["// gain = val + max(0, child gain)"],
  "kth-smallest-element-in-a-bst": ["// inorder; count to k"],
  "subtree-of-another-tree": ["// isSame at every node of root"],
  "last-stone-weight": ["// max-heap smash until ≤1 stone"],
  "top-k-frequent-elements": ["// count → heap/bucket of size k"],
  "find-median-from-data-stream": ["// two heaps: low max / high min"],
  "product-of-array-except-self": ["// prefix * suffix without division"],
  "best-time-to-buy-and-sell-stock": ["// track min buy; max profit"],
  "spiral-matrix": ["// peel layers: right→down→left→up"],
  "rotate-image": ["// transpose then reverse each row"],
  "set-matrix-zeroes": ["// mark zeros; second pass write"],
  "word-search": ["// DFS from each cell; mark visited"],
  "flood-fill": ["// DFS/BFS same color → newColor"],
  "move-zeroes": ["// write non-zeros forward; fill zeros"],
  "palindrome-number": ["// reverse half / two-pointer digits"],
  "valid-palindrome-ii": ["// one skip allowed on mismatch"],
};

function readTemplateLiteral(text, startIdx) {
  // startIdx points at opening `
  let i = startIdx + 1;
  let out = "";
  while (i < text.length) {
    const c = text[i];
    if (c === "\\") {
      const n = text[i + 1];
      if (n === "`") {
        out += "`";
        i += 2;
        continue;
      }
      if (n === "$") {
        out += "$";
        i += 2;
        continue;
      }
      if (n === "\\") {
        out += "\\";
        i += 2;
        continue;
      }
      if (n === "n") {
        out += "\n";
        i += 2;
        continue;
      }
      out += n;
      i += 2;
      continue;
    }
    if (c === "`") return { value: out, end: i + 1 };
    out += c;
    i++;
  }
  throw new Error("unclosed template");
}

/** Prefer matching solution topic file when a slug exists in multiple topics. */
const CONTENT_SOURCE_PREF = {
  "bits.md": "bit-manipulation.ts",
  "dp.md": "dynamic-programming.ts",
  "backtracking.md": "backtracking.ts",
  "graphs.md": "graphs.ts",
  "trees.md": "trees.ts",
  "bst.md": "trees.ts",
  "trie.md": "tries.ts",
  "linked-list.md": "linked-list.ts",
  "matrix.md": "matrix.ts",
  "heap.md": "heaps.ts",
  "sorting.md": "intervals.ts",
  "stack.md": "stack.ts",
  "two-pointers.md": "two-pointer.ts",
  "binary-search.md": "binary-search.ts",
  "strings.md": "string.ts",
  "hashing.md": "array-hash-tables.ts",
  "arrays-strings.md": "array-hash-tables.ts",
  "prefix-sum.md": "array-hash-tables.ts",
  "sliding-window.md": "string.ts",
  "greedy.md": "dynamic-programming.ts",
  "topological-sort.md": "graphs.ts",
  "union-find.md": "graphs.ts",
  "recursion.md": "linked-list.ts",
  "monotonic-stack.md": "two-pointer.ts",
};

function extractSolutionBodies() {
  /** @type {Map<string, Map<string, string>>} */
  const map = new Map();
  for (const file of fs.readdirSync(SOLUTIONS_DIR)) {
    if (!file.endsWith(".ts") || file === "types.ts" || file === "topics.ts")
      continue;
    const text = fs.readFileSync(path.join(SOLUTIONS_DIR, file), "utf8");
    let i = 0;
    while (i < text.length) {
      const slugMatch = text.slice(i).match(/lcSlug:\s*"([^"]+)"/);
      if (!slugMatch) break;
      const slug = slugMatch[1];
      i += slugMatch.index + slugMatch[0].length;
      const bodyKey = text.indexOf("body:", i);
      if (bodyKey < 0) continue;
      const tick = text.indexOf("`", bodyKey);
      if (tick < 0) continue;
      const { value: body, end } = readTemplateLiteral(text, tick);
      i = end;
      const codeMatch = body.match(/```js\r?\n([\s\S]*?)```/);
      if (!codeMatch) continue;
      const code = codeMatch[1].replace(/\r\n/g, "\n").replace(/\s+$/, "");
      if (!map.has(slug)) map.set(slug, new Map());
      map.get(slug).set(file, code);
    }
  }
  return map;
}

function pickSolution(bodiesBySlug, slug, contentFile) {
  const variants = bodiesBySlug.get(slug);
  if (!variants || variants.size === 0) return null;
  const preferred = CONTENT_SOURCE_PREF[contentFile];
  if (preferred && variants.has(preferred)) return variants.get(preferred);
  // Prefer non-DP for backtracking-named pages if still ambiguous
  if (contentFile === "backtracking.md" && variants.has("backtracking.ts")) {
    return variants.get("backtracking.ts");
  }
  if (contentFile === "bits.md" && variants.has("bit-manipulation.ts")) {
    return variants.get("bit-manipulation.ts");
  }
  // Fall back to any (stable: sort keys)
  const key = [...variants.keys()].sort()[0];
  return variants.get(key);
}

function countLineComments(code) {
  return (code.match(/^\s*\/\//gm) || []).length;
}

function withTeachingComments(slug, code, lcUrl, contentFile) {
  const header = [];
  if (!code.includes("leetcode.com/problems/")) {
    header.push(`// LC: ${lcUrl}`);
  }
  let extras = EXTRA_COMMENTS[slug] || [];
  // Topic-specific insight overrides for shared slugs
  if (slug === "combination-sum" && contentFile === "backtracking.md") {
    extras = ["// choose → explore → unchoose; reuse allowed via same index"];
  }
  if (slug === "counting-bits" && contentFile === "bits.md") {
    extras = ["// for each i, count 1-bits with & 1 and >>>"];
  }
  if (slug === "counting-bits" && contentFile === "dp.md") {
    extras = ["// offset = last power of 2; dp[i] = 1 + dp[i-offset]"];
  }
  if (countLineComments(code) < 2) {
    for (const c of extras) {
      if (!code.includes(c.slice(3))) header.push(c);
    }
  } else if (extras[0] && countLineComments(code) < 4) {
    const insight = extras[0];
    if (!code.includes(insight.slice(3))) header.push(insight);
  }
  const prefix = header.filter((l) => !code.split("\n").includes(l)).join("\n");
  return prefix ? `${prefix}\n${code}` : code;
}

function syncFile(filePath, bodiesBySlug) {
  const contentFile = path.basename(filePath);
  let text = fs.readFileSync(filePath, "utf8");
  let replacements = 0;

  text = text.replace(/```js\r?\n([\s\S]*?)```/g, (full, code) => {
    let slug = null;
    const urlInCode = code.match(
      /https:\/\/leetcode\.com\/problems\/([^/"'\s)`]+)/,
    );
    if (urlInCode) {
      slug = urlInCode[1].replace(/\/$/, "");
    } else {
      const idx = text.indexOf(full);
      const before = text.slice(Math.max(0, idx - 400), idx);
      const urlAbove = before.match(
        /https:\/\/leetcode\.com\/problems\/([^/"'\s)]+)/g,
      );
      if (urlAbove) {
        slug = urlAbove[urlAbove.length - 1]
          .split("/problems/")[1]
          .replace(/\/$/, "");
      }
    }
    if (!slug) return full;
    const solution = pickSolution(bodiesBySlug, slug, contentFile);
    if (!solution) return full;

    const lcUrl = `https://leetcode.com/problems/${slug}/`;
    const next = withTeachingComments(slug, solution, lcUrl, contentFile);
    replacements++;
    return "```js\n" + next + "\n```";
  });

  if (replacements > 0) fs.writeFileSync(filePath, text, "utf8");
  return replacements;
}

function main() {
  const bodies = extractSolutionBodies();
  let nCodes = 0;
  for (const v of bodies.values()) nCodes += v.size;
  console.log(`Loaded ${bodies.size} slugs (${nCodes} code variants)`);

  let total = 0;
  for (const file of fs.readdirSync(CONTENT_DIR).sort()) {
    if (!file.endsWith(".md")) continue;
    const n = syncFile(path.join(CONTENT_DIR, file), bodies);
    if (n > 0) {
      total += n;
      console.log(`  ${file}: ${n}`);
    }
  }
  console.log(`Updated ${total} example blocks`);
}

main();
