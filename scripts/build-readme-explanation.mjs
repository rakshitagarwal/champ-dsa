/**
 * Build README-style revision explanations from user solution code.
 * Style reference: step-by-step code walkthrough + dry run + complexity.
 */

export function detectApproach(code, hints = []) {
  const c = code.toLowerCase();
  const tags = [];
  if (/\bleft\b/.test(c) && /\bright\b/.test(c) && /mid/.test(c))
    tags.push("Binary Search");
  if (/\bleft\b/.test(c) && /\bright\b/.test(c) && !/mid/.test(c))
    tags.push("Two Pointers");
  if (/slow/.test(c) && /fast/.test(c)) tags.push("Fast & Slow Pointers");
  if (/new map|\.set\(|\.has\(/.test(c)) tags.push("Hash Map");
  if (/new set|\.add\(/.test(c)) tags.push("Hash Set");
  if (/dummy/.test(c) && /listnode/i.test(c)) tags.push("Dummy Head (Linked List)");
  if (/windowsum|seen\.|sliding/i.test(c)) tags.push("Sliding Window");
  if (/prefix|presum/i.test(c)) tags.push("Prefix Sum");
  if (/bfs|queue/.test(c)) tags.push("BFS");
  if (/dfs|backtrack/.test(c)) tags.push("DFS / Backtracking");
  if (/sort\(/.test(c)) tags.push("Sorting");
  if (/stack|\.pop\(\)|\.push\(/.test(c) && /#/.test(c))
    tags.push("Stack Simulation");
  if (/merge|mergetwo/i.test(c)) tags.push("Merge Pattern");
  if (/kadane|currentsum|maxsum/i.test(c)) tags.push("Kadane's Algorithm");
  if (/dp\[|dp\.|ugly/i.test(c)) tags.push("Dynamic Programming");
  if (tags.length === 0 && hints.length) return hints[0];
  return tags.length ? tags.join(" + ") : "Iterative Scan";
}

function splitCodeSteps(code) {
  const lines = code.trim().split("\n");
  const steps = [];
  let title = "Function setup";
  let buf = [];

  const flush = () => {
    const chunk = buf.join("\n").trim();
    if (chunk) steps.push({ title, code: chunk });
    buf = [];
  };

  for (const line of lines) {
    const cm = line.match(/^\s*\/\/\s*(.+)/);
    if (cm) {
      flush();
      title = cm[1].replace(/:$/, "").trim();
      continue;
    }
    buf.push(line);
  }
  flush();

  if (steps.length <= 1) {
    return splitByBlankLines(code);
  }
  return steps.map((s, i) => ({
    title: s.title || `Step ${i + 1}`,
    code: s.code,
  }));
}

function splitByBlankLines(code) {
  const parts = code
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length <= 1) return [{ title: "Main logic", code: code.trim() }];
  return parts.map((p, i) => ({
    title: `Step ${i + 1}`,
    code: p,
  }));
}

function explainStep(step, index, approach) {
  const { title, code } = step;
  const c = code;
  const lines = [];

  lines.push(`${title}:`);

  if (/var\s+\w+\s*=\s*function|function\s+\w+/.test(c)) {
    lines.push("Define the entry function and read input parameters.");
  }
  if (/let left|var left/.test(c) && /right/.test(c)) {
    lines.push(
      "Initialize two pointers — typically one at each end or both at the start.",
    );
  }
  if (/Math\.floor\(\(left \+ right\) \/ 2\)/.test(c)) {
    lines.push(
      "Compute `mid` as the middle index. Compare `nums[mid]` with the target and discard half the search space.",
    );
  }
  if (/new Map|Map\(\)/.test(c)) {
    lines.push(
      "Use a hash map to store seen values/counts for O(1) lookups while scanning.",
    );
  }
  if (/new Set|Set\(\)/.test(c) || /\bseen\b/.test(c)) {
    lines.push(
      "Use a set to track elements inside the current window — duplicates or membership checks are O(1).",
    );
  }
  if (/while\s*\(/.test(c)) {
    lines.push(
      "Loop until the stopping condition — each iteration moves pointers or updates state toward the answer.",
    );
  }
  if (/for\s*\(/.test(c)) {
    lines.push(
      "Scan elements one by one; body runs once per index/character/node.",
    );
  }
  if (/\.sort\(/.test(c)) {
    lines.push(
      "Sort the array first — enables two-pointer, binary search, or easier comparisons.",
    );
  }
  if (/reduce\(/.test(c)) {
    lines.push(
      "Fold the array into a single value (sum, string, etc.) by accumulating each element.",
    );
  }
  if (/return/.test(c)) {
    lines.push("Return the final computed result.");
  }
  if (/dummy/.test(c) && /ListNode/.test(c)) {
    lines.push(
      "Dummy node before `head` avoids special-casing when the head itself changes.",
    );
  }
  if (/slow/.test(c) && /fast/.test(c)) {
    lines.push(
      "Fast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.",
    );
  }
  if (/pop\(\)/.test(c) && /#/.test(c)) {
    lines.push(
      "`#` means backspace — pop the last typed character from the stack.",
    );
  }
  if (/push\(/.test(c) && !/pop/.test(c)) {
    lines.push("Push adds the current element to the stack/array.");
  }
  if (/NumMatrix|prefix/.test(c)) {
    lines.push(
      "Build a prefix table so any range sum query becomes O(1) via inclusion-exclusion.",
    );
  }
  if (/windowSum|currentSum/.test(c)) {
    lines.push(
      "Track running sum of the current window; expand/shrink to maintain the invariant.",
    );
  }
  if (/Math\.max|Math\.min/.test(c)) {
    lines.push("Track the best (max/min) value seen so far.");
  }
  if (/=== target|== target/.test(c)) {
    lines.push("When target is found, return immediately or record the position.");
  }
  if (lines.length === 1) {
    lines.push(`Execute the ${approach} logic in this block.`);
  }

  return lines.join("\n");
}

export function estimateComplexity(code, approach) {
  const n = "n";
  let time = "O(n)";
  let space = "O(1)";

  if (/sort\(/.test(code)) time = "O(n log n)";
  if (/new Map|new Set|Map\(\)|Set\(\)/.test(code)) space = "O(n)";
  if (/while.*while/.test(code.replace(/\s/g, ""))) time = "O(n²)";
  if (/for.*for/.test(code.replace(/\s/g, ""))) time = "O(n²)";
  if (/merge|sortList|mergeSort/i.test(code)) time = "O(n log n)";
  if (/BFS|queue/.test(code)) {
    time = "O(m×n)";
    space = "O(m×n)";
  }
  if (/prefix|NumMatrix/.test(code)) {
    time = "O(m×n) build, O(1) query";
    space = "O(m×n)";
  }
  if (/Binary Search/i.test(approach)) time = "O(log n)";
  if (/Stack Simulation/.test(approach)) {
    time = "O(n + m)";
    space = "O(n + m)";
  }
  if (/Hash Map/.test(approach) && !/sort/.test(code)) {
    time = "O(n)";
    space = "O(n)";
  }

  return { time, space };
}

function buildDryRun(humanInput, sampleOutput, code) {
  const example = humanInput
    ? humanInput.replace(/\n/g, "\n")
    : "Use the sample input from the problem.";
  const out = sampleOutput != null ? String(sampleOutput).trim() : "?";

  let trace =
    "Walk through the sample input step by step:\n\n" +
    `Input:\n${example}\n\n` +
    "Trace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n";

  if (/left/.test(code) && /right/.test(code) && /mid/.test(code)) {
    trace +=
      "Binary search: each step halves the search range until `mid` hits the target or range is empty.\n";
  } else if (/slow/.test(code) && /fast/.test(code)) {
    trace +=
      "Fast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n";
  } else if (/Map/.test(code)) {
    trace +=
      "Hash map: at each index, check if complement/prefix exists in map before storing current state.\n";
  } else if (/windowSum|seen/.test(code)) {
    trace +=
      "Sliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n";
  }

  trace += `\nExpected output: ${out}`;
  return trace;
}

/** @returns {{ summary: string, whyItWorks: string, howExamplesAreSatisfied: string, keyIdeas: string[] }} */
export function buildReadmeExplanation({
  num,
  title,
  statement,
  humanInput,
  sampleOutput,
  patternHints,
  solutionCode,
}) {
  const approach = detectApproach(solutionCode, patternHints ?? []);
  const steps = splitCodeSteps(solutionCode);
  const { time, space } = estimateComplexity(solutionCode, approach);

  const exampleBlock = humanInput
    ? `\nExample:\n\n${humanInput}${sampleOutput != null ? `\n\nOutput: ${sampleOutput}` : ""}`
    : "";

  const summary =
    `Sheet #${num} — ${title}\n\n` +
    `Problem: ${statement}${exampleBlock}\n\n` +
    `Your solution uses **${approach}**.`;

  let whyItWorks = "# Step-by-step walkthrough\n\n";
  steps.forEach((step, i) => {
    whyItWorks += `---\n\n## Step ${i + 1}: ${step.title}\n\n`;
    whyItWorks += "```js\n" + step.code + "\n```\n\n";
    whyItWorks += explainStep(step, i, approach) + "\n\n";
  });

  const howExamplesAreSatisfied = buildDryRun(
    humanInput,
    sampleOutput,
    solutionCode,
  );

  const keyIdeas = [
    `Pattern: ${approach}`,
    `Time: ${time}`,
    `Space: ${space}`,
    ...(patternHints?.slice(0, 2) ?? []),
  ].filter(Boolean);

  return { summary, whyItWorks, howExamplesAreSatisfied, keyIdeas };
}

/** Q71 — match user's angular-crud README style exactly */
export function buildBackspaceCompareExplanation() {
  return {
    summary:
      "Sheet #71 — Backspace String Compare\n\n" +
      "Problem: Given two strings where `#` means backspace, return true if both strings are equal after processing.\n\n" +
      "Example:\n\ns = \"ab#c\"\nt = \"ad#c\"\n\nAfter processing:\ns → \"ac\"\nt → \"ac\"\n\nAnswer = true\n\n" +
      "Your solution uses **Stack Simulation**.",
    whyItWorks:
      "# Step-by-step Explanation\n\n" +
      "```js\nvar backspaceCompare = function (s, t) {\n```\n\nFunction takes 2 strings.\n\n" +
      "---\n\n## Step 1: Create stacks\n\n```js\nlet res1 = [], res2 = [];\n```\n\n" +
      "These arrays act like stacks.\n\nWhy stack? Backspace removes the **last typed character**.\n\n" +
      "Stack operations:\n- push() → type character\n- pop() → remove last character\n\n" +
      "---\n\n## Step 2: Process first string\n\n```js\nfor (let char of s.split('')) {\n  if (char === \"#\") {\n    res1.pop();\n  } else {\n    res1.push(char);\n  }\n}\n```\n\n" +
      "Loop through every character in `s`.\n\nIf `#` → pop last char. Else → push char.\n\n" +
      "Dry run on \"ab#c\":\n- 'a' → ['a']\n- 'b' → ['a','b']\n- '#' → ['a']\n- 'c' → ['a','c']\n\n" +
      "---\n\n## Step 3: Convert stack to string\n\n```js\nlet str1 = res1.reduce((acc, curr) => acc + curr, '');\n```\n\n" +
      "Join stack chars into final processed string \"ac\".\n\n" +
      "---\n\n## Step 4: Same for second string\n\nBuild `str2` from `t` with identical logic.\n\n" +
      "---\n\n## Step 5: Compare\n\n```js\nreturn str1 === str2;\n```\n\nReturn true if processed strings match.",
    howExamplesAreSatisfied:
      "Complete flow example:\n\ns = \"ab#c\"\nt = \"ad#c\"\n\n" +
      "Process s:\n[] → ['a'] → ['a','b'] → pop → ['a'] → ['a','c'] → \"ac\"\n\n" +
      "Process t:\n[] → ['a'] → ['a','d'] → pop → ['a'] → ['a','c'] → \"ac\"\n\n" +
      "Compare: \"ac\" === \"ac\" → true",
    keyIdeas: [
      "Stack Simulation",
      "String Processing",
      "Time: O(n + m)",
      "Space: O(n + m)",
      "Tip: use join('') instead of reduce for cleaner code",
    ],
  };
}
