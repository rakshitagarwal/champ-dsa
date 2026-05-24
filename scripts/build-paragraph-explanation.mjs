/**
 * Revision explanations in 3–4 short paragraphs (plain prose, not step-by-step README).
 */
import { detectApproach, estimateComplexity } from "./build-readme-explanation.mjs";

function extractFnName(code) {
  const stripped = code.replace(/\/\*[\s\S]*?\*\//g, "");
  const varFn = stripped.match(/var\s+(\w+)\s*=\s*function\s*\(/);
  if (varFn) return varFn[1];
  const fnDecl = stripped.match(/function\s+(\w+)\s*\(/);
  if (fnDecl && fnDecl[1] !== "solve") return fnDecl[1];
  return "solve";
}

function codeBody(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").trim();
}

function buildSummary({ num, title, statement, approach, fnName }) {
  return (
    `Sheet #${num} — ${title}. ${statement} ` +
    `Your \`${fnName}\` solution follows the **${approach}** approach: it reads the input, applies that pattern directly, and returns the answer the problem asks for.`
  );
}

function buildWhyParagraphs(approach, code, hints) {
  const c = codeBody(code);
  const paras = [];

  if (/searchBST|searchbst/i.test(c) || (/\broot\b/.test(c) && /val\s*<\s*root\.val/.test(c))) {
    paras.push(
      "In a binary search tree, every node partitions the key space: everything in the left subtree is smaller, everything in the right subtree is larger. That ordering means there is only one plausible path from the root to any target value—you never need to search both sides.",
      "Your recursion visits the current node first. If the node is missing or its value equals the target, you stop and return that node (`null` means not found; a matching node is returned as the subtree root LeetCode expects). If the target is smaller you recurse left; otherwise you recurse right. Each call eliminates an entire subtree, so the walk is efficient and easy to reason about.",
    );
  } else if (/Binary Search/i.test(approach)) {
    paras.push(
      "Binary search works because the data is ordered: comparing against the middle element tells you which half can still contain the answer. Your loop (or recursion) keeps shrinking that range until the target is found or the range is empty.",
      "Each step discards half the remaining search space, so the number of comparisons grows slowly even on large inputs. The implementation tracks `left` and `right` (and often `mid`) and moves the boundaries based on whether the middle value is too small or too large.",
    );
  } else if (/Hash Map/i.test(approach)) {
    paras.push(
      "The core idea is to trade memory for speed: while scanning the array (or string), you store information you might need later in a hash map so lookups are O(1).",
      "Your code checks the map before or after updating state—whether that is a complement for Two Sum, a prefix sum count, or a seen character index. One pass over the input is usually enough because each element is processed once and map operations are constant time.",
    );
  } else if (/Sliding Window/i.test(approach) || /windowsum|seen\./i.test(c)) {
    paras.push(
      "Sliding window avoids re-summing or re-scanning the whole range on every step. You expand the window by moving the right boundary, update a running aggregate (sum, count, or set of characters), and shrink from the left when the window becomes invalid or when you want the smallest valid window.",
      "The window always represents a contiguous subarray or substring. Invariants are maintained incrementally: add on expand, remove on shrink, and record the answer whenever the window satisfies the problem condition.",
    );
  } else if (/Fast & Slow|slow.*fast/i.test(c)) {
    paras.push(
      "Two pointers moving at different speeds (or from different starts) detect structure in linked lists—middle node, cycle detection, or comparing halves after reversal.",
      "The slow pointer moves one step while the fast pointer moves two. When fast reaches the end you have the middle; when they meet you have a cycle. Your code follows that rhythm and then finishes with a comparison or pointer adjustment step.",
    );
  } else if (/Kadane/i.test(approach)) {
    paras.push(
      "Kadane's algorithm tracks the best subarray ending at the current index. At each position you either extend the previous subarray or start fresh from the current element—whichever gives the larger sum.",
      "A separate variable keeps the global maximum across all positions. That single pass captures the optimal subarray without trying every possible range.",
    );
  } else if (/DFS|Backtracking|recursion/i.test(approach) || /function\s+\w+[\s\S]*return\s+\w+\(/.test(c)) {
    paras.push(
      "Recursion breaks the problem into smaller instances of the same task. Base cases handle the smallest inputs; the recursive step combines results from subproblems (tree children, smaller ranges, or next choices).",
      "Your function trusts that recursive calls on smaller inputs return correct results, then combines them. For trees that often means processing left and right subtrees; for backtracking it means trying a choice, recursing, and undoing if needed.",
    );
  } else if (/BFS|queue/i.test(approach)) {
    paras.push(
      "Breadth-first search explores level by level using a queue. Nodes are processed in the order they were discovered, which is ideal for shortest path in unweighted graphs or level-order tree traversal.",
      "You enqueue starting positions, then repeatedly dequeue, process, and enqueue unvisited neighbors. Visited tracking prevents cycles from causing infinite loops.",
    );
  } else if (/Dynamic Programming/i.test(approach)) {
    paras.push(
      "Dynamic programming stores answers to subproblems so each state is computed once. The recurrence usually comes from choosing to include or skip an element, or from splitting a range.",
      "Your table (or rolling variables) is filled in an order that guarantees dependencies are ready before they are used—often forward in the array or by increasing interval length.",
    );
  } else if (/Sorting/i.test(approach) && /\.sort\(/.test(c)) {
    paras.push(
      "Sorting reorganizes the input so a simpler scan can answer the question—pairs with a given difference, closest elements, or merging sorted sequences.",
      "After sort, many problems reduce to two pointers or a single linear pass because order is guaranteed.",
    );
  } else if (/Prefix Sum/i.test(approach)) {
    paras.push(
      "Prefix sums precompute cumulative totals so any range sum is a subtraction of two prefix values. Building the prefix array once makes each query O(1).",
      "For 2D grids the same idea extends with inclusion–exclusion on a padded prefix table.",
    );
  } else if (/Stack Simulation/i.test(approach)) {
    paras.push(
      "A stack models last-in-first-out behavior—typing characters and undoing with backspace, matching brackets, or evaluating expressions.",
      "You push on regular input and pop when the problem says to undo or cancel the previous item, then compare or join the stack for the final result.",
    );
  } else {
    paras.push(
      `This problem fits the **${approach}** pattern from the sheet. The solution scans the input and updates a small amount of state (variables, pointers, or a helper structure) on each step.`,
      hints?.length
        ? `Key tactics here: ${hints.join("; ")}.`
        : "Focus on what changes each iteration and what condition triggers the final return.",
    );
  }

  return paras.join("\n\n");
}

function buildExampleParagraph({ humanInput, sampleOutput, approach, code }) {
  const c = codeBody(code);
  if (!humanInput?.trim()) {
    return sampleOutput != null
      ? `On the sample input, the expected result is ${sampleOutput}. Walk through your code with those values and check that each branch matches the pattern above.`
      : "Trace the provided examples by hand: write down the main variables after each loop iteration or recursive call.";
  }

  let extra = "";
  if (/searchBST/i.test(c)) {
    extra =
      " Trace: start at the root, compare `val` with `root.val`, go left if smaller and right if larger, until you hit a match or `null`.";
  } else if (/Binary Search/i.test(approach)) {
    extra = " Trace: update `left`/`right` after each comparison with `mid` until the target is found or the range is empty.";
  } else if (/Hash Map/i.test(approach)) {
    extra = " Trace: at each index, check the map for the value you need before storing the current element.";
  } else if (/Sliding Window/i.test(approach)) {
    extra = " Trace: expand `right`, update the window state, shrink `left` when the window rule requires it.";
  }

  const out =
    sampleOutput != null && String(sampleOutput).trim()
      ? ` Expected output: ${String(sampleOutput).trim()}.`
      : "";

  return (
    `For the sample input (${humanInput.replace(/\n/g, ", ")}), follow your code with those values.${extra}${out}`
  );
}

function buildKeyIdeas(approach, code, hints, complexity) {
  const ideas = [
    `Pattern: ${approach}`,
    `Time: ${complexity.time}`,
    `Space: ${complexity.space}`,
  ];
  if (hints?.length) ideas.push(hints[0]);
  if (hints?.length > 1) ideas.push(hints[1]);
  return ideas.filter(Boolean).slice(0, 5);
}

/** @returns import("@/types/ai-explain").AiExplainCommentary shape */
export function buildParagraphExplanation(meta) {
  const { solutionCode, patternHints = [] } = meta;
  const approach = detectApproach(solutionCode, patternHints);
  const fnName = extractFnName(solutionCode);
  const complexity = estimateComplexity(solutionCode, approach);

  return {
    summary: buildSummary({ ...meta, approach, fnName }),
    whyItWorks: buildWhyParagraphs(approach, solutionCode, patternHints),
    howExamplesAreSatisfied: buildExampleParagraph({
      humanInput: meta.humanInput,
      sampleOutput: meta.sampleOutput,
      approach,
      code: solutionCode,
    }),
    keyIdeas: buildKeyIdeas(approach, solutionCode, patternHints, complexity),
  };
}

/** Hand-tuned explanation for sheet #115 */
export function buildSearchBSTExplanation() {
  return {
    summary:
      "Sheet #115 — Search in a Binary Search Tree. You are given the root of a BST and an integer `val`; return the node whose value equals `val` (the whole subtree rooted there), or `null` if it does not exist. Your `searchBST` is the standard recursive BST lookup: compare at the current node, then go left or right using the BST ordering rule.",
    whyItWorks:
      "A BST stores smaller keys in the left subtree and larger keys in the right subtree. That property means there is at most one valid search path from the root to any value—you never explore both sides at the same level.\n\nYour base case handles both outcomes cleanly: if `root` is `null`, the value is absent; if `root.val === val`, you found the node and return it (LeetCode wants that node as the answer subtree). Otherwise you compare `val` with `root.val` and recurse only into the left child when the target is smaller, or the right child when it is larger. Each recursive call works on a strictly smaller subtree, so the search stops after at most h steps where h is the tree height.",
    howExamplesAreSatisfied:
      "For `root = [4,2,7,1,3]` and `val = 2`: start at 4. Since 2 < 4, recurse into the left child (2). At node 2, `root.val === val`, so return that node—the subtree `[2,1,3]`. For `val = 5` you would go right from 4 to 7, then right again into an empty child and return `null`.",
    keyIdeas: [
      "BST ordering cuts the search space in half each level",
      "Two base cases: null (not found) or value match (found)",
      "Time O(h), space O(h) for recursion stack",
      "Same logic works iteratively with a while loop",
    ],
  };
}
