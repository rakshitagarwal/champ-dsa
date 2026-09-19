/**
 * Strip // LC: comments; ensure first line is // Time: O(...) · Space: O(...)
 * Updates data/solutions/*.ts and content/dsa/*.md
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** slug → { time, space } */
const COMPLEXITY = {
  // arrays / hashing
  "two-sum": ["O(n)", "O(n)"],
  "contains-duplicate": ["O(n)", "O(n)"],
  "best-time-to-buy-and-sell-stock": ["O(n)", "O(1)"],
  "best-time-to-buy-and-sell-stock-ii": ["O(n)", "O(1)"],
  "product-of-array-except-self": ["O(n)", "O(1)"],
  "maximum-subarray": ["O(n)", "O(1)"],
  "top-k-frequent-elements": ["O(n log k)", "O(n)"],
  "group-anagrams": ["O(n·k log k)", "O(n·k)"],
  "valid-anagram": ["O(n)", "O(1)"],
  "valid-palindrome": ["O(n)", "O(1)"],
  "longest-consecutive-sequence": ["O(n)", "O(n)"],
  "roman-to-integer": ["O(n)", "O(1)"],
  "pascals-triangle": ["O(n²)", "O(n²)"],
  "logger-rate-limiter": ["O(1)", "O(n)"],
  "high-five": ["O(n log n)", "O(n)"],
  "monotonic-array": ["O(n)", "O(1)"],
  "minimum-value-to-get-positive-step-by-step-sum": ["O(n)", "O(1)"],
  "power-of-three": ["O(log n)", "O(1)"],
  "power-of-four": ["O(1)", "O(1)"],
  "zigzag-conversion": ["O(n)", "O(n)"],
  "can-place-flowers": ["O(n)", "O(1)"],
  "find-the-winner-of-the-circular-game": ["O(n)", "O(n)"],
  // two pointers
  "palindrome-number": ["O(log n)", "O(1)"],
  "move-zeroes": ["O(n)", "O(1)"],
  "valid-palindrome-ii": ["O(n)", "O(1)"],
  "container-with-most-water": ["O(n)", "O(1)"],
  "3sum": ["O(n²)", "O(1)"],
  "two-sum-ii-input-array-is-sorted": ["O(n)", "O(1)"],
  "4sum": ["O(n³)", "O(1)"],
  "trapping-rain-water": ["O(n)", "O(1)"],
  // sliding window / strings
  "longest-substring-without-repeating-characters": ["O(n)", "O(min(n,Σ))"],
  "longest-repeating-character-replacement": ["O(n)", "O(1)"],
  "minimum-window-substring": ["O(n)", "O(Σ)"],
  "longest-palindromic-substring": ["O(n²)", "O(1)"],
  "palindromic-substrings": ["O(n²)", "O(1)"],
  "encode-and-decode-strings": ["O(n)", "O(n)"],
  "word-break": ["O(n²)", "O(n)"],
  "string-to-integer-atoi": ["O(n)", "O(1)"],
  "break-a-palindrome": ["O(n)", "O(n)"],
  "find-the-index-of-the-first-occurrence-in-a-string": ["O(n·m)", "O(1)"],
  "word-ladder": ["O(n·L²)", "O(n·L)"],
  "robot-return-to-origin": ["O(n)", "O(1)"],
  "length-of-last-word": ["O(n)", "O(1)"],
  // stack
  "valid-parentheses": ["O(n)", "O(n)"],
  "remove-all-adjacent-duplicates-in-string": ["O(n)", "O(n)"],
  "remove-all-adjacent-duplicates-in-string-ii": ["O(n)", "O(n)"],
  "simplify-path": ["O(n)", "O(n)"],
  // binary search
  "binary-search": ["O(log n)", "O(1)"],
  "search-insert-position": ["O(log n)", "O(1)"],
  "guess-number-higher-or-lower": ["O(log n)", "O(1)"],
  "find-minimum-in-rotated-sorted-array": ["O(log n)", "O(1)"],
  "search-in-rotated-sorted-array": ["O(log n)", "O(1)"],
  "find-first-and-last-position-of-element-in-sorted-array": ["O(log n)", "O(1)"],
  "find-median-from-data-stream": ["O(log n)", "O(n)"],
  // linked list
  "reverse-linked-list": ["O(n)", "O(1)"],
  "merge-two-sorted-lists": ["O(n)", "O(1)"],
  "middle-of-the-linked-list": ["O(n)", "O(1)"],
  "palindrome-linked-list": ["O(n)", "O(1)"],
  "linked-list-cycle": ["O(n)", "O(1)"],
  "remove-nth-node-from-end-of-list": ["O(n)", "O(1)"],
  "swap-nodes-in-pairs": ["O(n)", "O(1)"],
  "add-two-numbers": ["O(max(m,n))", "O(1)"],
  "rotate-list": ["O(n)", "O(1)"],
  "reorder-list": ["O(n)", "O(1)"],
  "remove-duplicates-from-an-unsorted-linked-list": ["O(n)", "O(n)"],
  "merge-k-sorted-lists": ["O(n log k)", "O(k)"],
  // trees
  "same-tree": ["O(n)", "O(h)"],
  "maximum-depth-of-binary-tree": ["O(n)", "O(h)"],
  "minimum-depth-of-binary-tree": ["O(n)", "O(h)"],
  "invert-binary-tree": ["O(n)", "O(h)"],
  "diameter-of-binary-tree": ["O(n)", "O(h)"],
  "validate-binary-search-tree": ["O(n)", "O(h)"],
  "binary-tree-level-order-traversal": ["O(n)", "O(w)"],
  "binary-tree-right-side-view": ["O(n)", "O(w)"],
  "lowest-common-ancestor-of-a-binary-tree": ["O(n)", "O(h)"],
  "lowest-common-ancestor-of-a-binary-search-tree": ["O(h)", "O(1)"],
  "binary-tree-maximum-path-sum": ["O(n)", "O(h)"],
  "kth-smallest-element-in-a-bst": ["O(h+k)", "O(h)"],
  "subtree-of-another-tree": ["O(n·m)", "O(h)"],
  "path-sum": ["O(n)", "O(h)"],
  "path-sum-ii": ["O(n)", "O(h)"],
  "binary-tree-paths": ["O(n)", "O(h)"],
  "symmetric-tree": ["O(n)", "O(h)"],
  "range-sum-of-bst": ["O(n)", "O(h)"],
  "find-all-the-lonely-nodes": ["O(n)", "O(h)"],
  "sum-root-to-leaf-numbers": ["O(n)", "O(h)"],
  "deepest-leaves-sum": ["O(n)", "O(w)"],
  "balance-a-binary-search-tree": ["O(n)", "O(n)"],
  "find-leaves-of-binary-tree": ["O(n)", "O(n)"],
  "binary-tree-vertical-order-traversal": ["O(n)", "O(n)"],
  "n-ary-tree-level-order-traversal": ["O(n)", "O(w)"],
  "count-good-nodes-in-binary-tree": ["O(n)", "O(h)"],
  "binary-tree-longest-consecutive-sequence": ["O(n)", "O(h)"],
  "binary-tree-zigzag-level-order-traversal": ["O(n)", "O(w)"],
  "keys-and-rooms": ["O(n+e)", "O(n)"],
  "construct-binary-tree-from-preorder-and-inorder-traversal": ["O(n)", "O(n)"],
  // tries
  "implement-trie-prefix-tree": ["O(L)", "O(ΣL)"],
  "design-add-and-search-words-data-structure": ["O(L)", "O(ΣL)"],
  "word-search-ii": ["O(m·n·4^L)", "O(ΣL)"],
  // backtracking
  "permutations": ["O(n·n!)", "O(n)"],
  "combinations": ["O(C(n,k)·k)", "O(k)"],
  "subsets": ["O(n·2ⁿ)", "O(n)"],
  "subsets-ii": ["O(n·2ⁿ)", "O(n)"],
  "combination-sum": ["O(n·2ⁿ)", "O(target)"],
  "combination-sum-iii": ["O(C(9,k))", "O(k)"],
  "letter-combinations-of-a-phone-number": ["O(4ⁿ·n)", "O(n)"],
  "n-queens": ["O(n!)", "O(n)"],
  "n-queens-ii": ["O(n!)", "O(n)"],
  "sudoku-solver": ["O(9^(empty))", "O(1)"],
  "word-search": ["O(m·n·4^L)", "O(L)"],
  // graphs
  "number-of-islands": ["O(m·n)", "O(m·n)"],
  "clone-graph": ["O(n+e)", "O(n)"],
  "course-schedule": ["O(v+e)", "O(v+e)"],
  "number-of-provinces": ["O(n²)", "O(n)"],
  "pacific-atlantic-water-flow": ["O(m·n)", "O(m·n)"],
  "find-if-path-exists-in-graph": ["O(v+e)", "O(v)"],
  "number-of-connected-components-in-an-undirected-graph": ["O(v+e)", "O(v)"],
  "all-paths-from-source-to-target": ["O(2ⁿ·n)", "O(n)"],
  "graph-valid-tree": ["O(v+e)", "O(v)"],
  "open-the-lock": ["O(10⁴)", "O(10⁴)"],
  "alien-dictionary": ["O(C)", "O(1)"],
  "toeplitz-matrix": ["O(m·n)", "O(1)"],
  "flood-fill": ["O(m·n)", "O(m·n)"],
  "set-matrix-zeroes": ["O(m·n)", "O(1)"],
  "spiral-matrix": ["O(m·n)", "O(1)"],
  "rotate-image": ["O(n²)", "O(1)"],
  "walls-and-gates": ["O(m·n)", "O(m·n)"],
  "diagonal-traverse": ["O(m·n)", "O(1)"],
  "minimum-knight-moves": ["O(max(|x|,|y|)²)", "O(max(|x|,|y|)²)"],
  "shortest-path-in-binary-matrix": ["O(n²)", "O(n²)"],
  "01-matrix": ["O(m·n)", "O(m·n)"],
  // heaps
  "last-stone-weight": ["O(n log n)", "O(n)"],
  "kth-smallest-element-in-a-sorted-matrix": ["O(k log k)", "O(k)"],
  "minimum-cost-to-connect-sticks": ["O(n log n)", "O(n)"],
  // intervals
  "meeting-rooms": ["O(n log n)", "O(1)"],
  "meeting-rooms-ii": ["O(n log n)", "O(n)"],
  "merge-intervals": ["O(n log n)", "O(n)"],
  "insert-interval": ["O(n)", "O(n)"],
  "non-overlapping-intervals": ["O(n log n)", "O(1)"],
  // dp
  "climbing-stairs": ["O(n)", "O(n)"],
  "house-robber": ["O(n)", "O(n)"],
  "house-robber-ii": ["O(n)", "O(n)"],
  "coin-change": ["O(amount·coins)", "O(amount)"],
  "decode-ways": ["O(n)", "O(n)"],
  "unique-paths": ["O(m·n)", "O(m·n)"],
  "unique-paths-ii": ["O(m·n)", "O(m·n)"],
  "longest-common-subsequence": ["O(m·n)", "O(m·n)"],
  "longest-increasing-subsequence": ["O(n²)", "O(n)"],
  "delete-operation-for-two-strings": ["O(m·n)", "O(m·n)"],
  "maximum-product-subarray": ["O(n)", "O(1)"],
  "jump-game": ["O(n)", "O(1)"],
  "counting-bits": ["O(n)", "O(n)"],
  // bits
  "number-of-1-bits": ["O(1)", "O(1)"],
  "missing-number": ["O(n)", "O(1)"],
  "reverse-bits": ["O(1)", "O(1)"],
  "power-of-two": ["O(1)", "O(1)"],
  "sum-of-two-integers": ["O(1)", "O(1)"],
  "sort-integers-by-the-number-of-1-bits": ["O(n log n)", "O(n)"],
  // prefix / misc
  "subarray-sum-equals-k": ["O(n)", "O(n)"],
  "powx-n": ["O(log n)", "O(log n)"],
  "k-th-symbol-in-grammar": ["O(n)", "O(n)"],
};

const TOPIC_DEFAULT = {
  "array-hash-tables.ts": ["O(n)", "O(n)"],
  "two-pointer.ts": ["O(n)", "O(1)"],
  "stack.ts": ["O(n)", "O(n)"],
  "binary-search.ts": ["O(log n)", "O(1)"],
  "string.ts": ["O(n)", "O(n)"],
  "linked-list.ts": ["O(n)", "O(1)"],
  "matrix.ts": ["O(m·n)", "O(1)"],
  "trees.ts": ["O(n)", "O(h)"],
  "tries.ts": ["O(L)", "O(ΣL)"],
  "backtracking.ts": ["O(n·2ⁿ)", "O(n)"],
  "graphs.ts": ["O(v+e)", "O(v)"],
  "heaps.ts": ["O(n log n)", "O(n)"],
  "intervals.ts": ["O(n log n)", "O(n)"],
  "dynamic-programming.ts": ["O(n)", "O(n)"],
  "bit-manipulation.ts": ["O(1)", "O(1)"],
};

function complexityLine(slug, sourceFile) {
  const pair =
    COMPLEXITY[slug] ||
    TOPIC_DEFAULT[sourceFile] || ["O(n)", "O(n)"];
  return `// Time: ${pair[0]} · Space: ${pair[1]}`;
}

function transformCode(code, slug, sourceFile) {
  let lines = code.replace(/\r\n/g, "\n").split("\n");
  // drop LC link comments
  lines = lines.filter(
    (l) => !/^\s*\/\/\s*LC:\s*https?:\/\/leetcode\.com/i.test(l),
  );
  // drop existing Time/Space first-line style comments (we'll re-add one)
  while (
    lines.length &&
    /^\s*\/\/\s*Time:\s*O/i.test(lines[0])
  ) {
    lines.shift();
  }
  // drop leading blank lines
  while (lines.length && lines[0].trim() === "") lines.shift();
  const header = complexityLine(slug, sourceFile);
  return [header, ...lines].join("\n").replace(/\s+$/, "");
}

function slugFromNearby(text, blockStart) {
  const before = text.slice(Math.max(0, blockStart - 500), blockStart);
  const urls = [
    ...before.matchAll(/leetcode\.com\/problems\/([^/"'\s)`]+)/gi),
  ];
  if (urls.length) return urls[urls.length - 1][1].replace(/\/$/, "");
  const slugField = before.match(/lcSlug:\s*"([^"]+)"/);
  return slugField ? slugField[1] : null;
}

function processSolutionsFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const base = path.basename(filePath);
  let n = 0;
  text = text.replace(
    /\\`\\`\\`js\r?\n([\s\S]*?)\\`\\`\\`/g,
    (full, code, offset) => {
      const slug = slugFromNearby(text, offset) || "unknown";
      // unescape for transform then we work on raw source code (already unescaped in capture? No - capture is raw file with real newlines; backticks in code aren't escaped inside)
      // In TS source, code fences are \`\`\` but body content is raw JS lines
      const next = transformCode(code, slug, base);
      n++;
      return "\\`\\`\\`js\n" + next + "\n\\`\\`\\`";
    },
  );
  if (n) fs.writeFileSync(filePath, text, "utf8");
  return n;
}

function processMarkdownFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const base = path.basename(filePath);
  let n = 0;
  text = text.replace(/```js\r?\n([\s\S]*?)```/g, (full, code, offset) => {
    // skip pure skeleton blocks without LC context and without function/var
    const slug = slugFromNearby(text, offset);
    if (!slug && !/\b(function|var |const |let )\w+\s*[=(]/.test(code)) {
      // still strip LC if any
      const stripped = code
        .split("\n")
        .filter((l) => !/^\s*\/\/\s*LC:\s*https?:\/\/leetcode\.com/i.test(l))
        .join("\n");
      if (stripped === code) return full;
      n++;
      return "```js\n" + stripped.replace(/\s+$/, "") + "\n```";
    }
    const useSlug = slug || "unknown";
    const next = transformCode(code, useSlug, base);
    n++;
    return "```js\n" + next + "\n```";
  });
  if (n) fs.writeFileSync(filePath, text, "utf8");
  return n;
}

function main() {
  let sol = 0;
  const solDir = path.join(ROOT, "data", "solutions");
  for (const f of fs.readdirSync(solDir)) {
    if (!f.endsWith(".ts") || f === "types.ts" || f === "topics.ts") continue;
    sol += processSolutionsFile(path.join(solDir, f));
  }
  let md = 0;
  const mdDir = path.join(ROOT, "content", "dsa");
  for (const f of fs.readdirSync(mdDir)) {
    if (!f.endsWith(".md")) continue;
    md += processMarkdownFile(path.join(mdDir, f));
  }
  console.log(`solutions code blocks: ${sol}`);
  console.log(`pattern md code blocks: ${md}`);
}

main();
