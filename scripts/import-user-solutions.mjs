/**
 * Read scripts/user-solutions.json and write scripts/user-solution-overrides.mjs
 *
 * Usage: node scripts/import-user-solutions.mjs
 */
import fs from "fs";
import { parseUserSolutionsFile } from "./parse-user-solutions.mjs";

const WRAP_NUM_MATRIX = `function solve(input) {
  const mat = input.nums;
  const { row1, col1, row2, col2 } = input;
  const obj = new NumMatrix(mat);
  return obj.sumRegion(row1, col1, row2, col2);
}

`;

const WRAP_NUM_SUBARRAYS = `function solve(input) {
  return numOfSubarrays(input.nums, input.k, input.threshold);
}

`;

const SAMPLE_INPUT_PATCH = {
  5: JSON.stringify({ nums1: [1, 3], nums2: [2] }),
  15: JSON.stringify({ target: 7, arr: [2, 3, 1, 2, 4, 3] }),
  23: JSON.stringify({ target: 7, arr: [2, 3, 1, 2, 4, 3] }),
  26: JSON.stringify({ heights: [1, 8, 6, 2, 5, 4, 8, 3, 7] }),
};

function buildOverride(num, solution) {
  const n = Number(num);
  let solutionCode = solution;
  let entryFunction;
  let sampleInput = SAMPLE_INPUT_PATCH[n];

  if (n === 17 && solution.includes("NumMatrix")) {
    solutionCode = WRAP_NUM_MATRIX + solution;
  } else if (n === 22 && solution.includes("numOfSubarrays")) {
    solutionCode = WRAP_NUM_SUBARRAYS + solution;
  }

  if (n === 21) {
    // Tracer safety blocks `window.` — rename sliding-window set variable.
    solutionCode = solutionCode
      .replace(/\blet window\b/g, "let seen")
      .replace(/\bwindow\./g, "seen.");
  }

  if (n === 26 && solution.startsWith("function maxArea")) {
    solutionCode = "var " + solution.replace(/^function\s+maxArea/, "maxArea = function");
  }

  if (n === 17 || n === 22) {
    entryFunction = "solve";
  } else {
    const varFn = solutionCode.match(/var\s+(\w+)\s*=\s*function\s*\(/);
    const fnDecl = solutionCode.match(/function\s+(\w+)\s*\(/);
    if (varFn) entryFunction = varFn[1];
    else if (fnDecl && fnDecl[1] !== "solve") entryFunction = fnDecl[1];
  }

  const override = { solutionCode };
  if (entryFunction) override.entryFunction = entryFunction;
  if (sampleInput) override.sampleInput = sampleInput;
  return override;
}

const parsed = parseUserSolutionsFile();
const overrides = {};
for (const { questionNumber, solution } of parsed) {
  overrides[questionNumber] = buildOverride(questionNumber, solution);
}

const out = `/** Auto-generated from scripts/user-solutions.json — run: node scripts/import-user-solutions.mjs */
export const USER_SOLUTION_OVERRIDES = ${JSON.stringify(overrides, null, 2)};
`;

fs.writeFileSync("scripts/user-solution-overrides.mjs", out);
console.log(`Imported ${Object.keys(overrides).length} user solutions: ${Object.keys(overrides).join(", ")}`);
