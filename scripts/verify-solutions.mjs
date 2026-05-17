import * as solutionsModule from "./sheet-solutions-data.mjs";

const SOLUTIONS = solutionsModule.SHEET_SOLUTIONS;

function buildRunnerTail(input) {
  return `
  var input = ${JSON.stringify(input)};
  if (typeof solve !== "function") throw new Error("solve is not defined");
  if (input.tree !== undefined) {
    return solve(input.tree);
  }
  if (input.graph !== undefined) {
    return solve(input.graph, input.start);
  }
  if (Array.isArray(input.coins) && typeof input.amount === "number") {
    return solve(input.coins, input.amount);
  }
  if (Array.isArray(input.nums) && typeof input.target === "number") {
    return solve(input.nums, input.target);
  }
  if (Array.isArray(input.nums)) {
    return solve(input.nums);
  }
  if (typeof input.n === "number") {
    return solve(input.n);
  }
  return solve(input);
`;
}

function runSolution(entry) {
  const input = JSON.parse(entry.sampleInput);
  const body = `${entry.solutionCode}\n${buildRunnerTail(input)}`;
  const fn = new Function(body);
  return fn();
}

function stableStringify(v) {
  return JSON.stringify(v);
}

let passed = 0;
let failed = 0;
let skipped = 0;
const failures = [];

for (const [num, entry] of Object.entries(SOLUTIONS)) {
  if (entry.expectedOutput === undefined) {
    skipped++;
    continue;
  }
  try {
    const result = runSolution(entry);
    if (stableStringify(result) !== stableStringify(entry.expectedOutput)) {
      failed++;
      failures.push({
        num,
        expected: entry.expectedOutput,
        got: result,
      });
    } else {
      passed++;
    }
  } catch (err) {
    failed++;
    failures.push({ num, error: String(err) });
  }
}

console.log(`Verified: ${passed} passed, ${failed} failed, ${skipped} skipped (no expectedOutput)`);

if (failures.length > 0) {
  for (const f of failures) {
    console.error(`#${f.num}`, f.error ?? { expected: f.expected, got: f.got });
  }
  process.exit(1);
}
