/**
 * Run each sheet solution against sampleInput to produce sampleOutput strings.
 * Usage: node scripts/compute-sample-outputs.mjs
 */
import { SHEET_SOLUTIONS } from "./sheet-solutions-data.mjs";
import fs from "fs";

function isPassableArg(v) {
  if (v === null) return true;
  const t = typeof v;
  return t === "string" || t === "number" || t === "boolean" || Array.isArray(v);
}

function buildSolveCallFromSignature(sig) {
  const params = sig
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (params.length === 0) return "solve(input)";
  if (params.length === 1 && params[0] === "input") return "solve(input)";
  return `solve(${params.map((p) => `input.${p}`).join(", ")})`;
}

function parseSolveSignature(solutionCode) {
  const m = solutionCode.match(/function solve\s*\(([^)]*)\)/);
  return m ? m[1].trim() : "input";
}

function formatOutput(value) {
  if (value === undefined) return "undefined";
  return JSON.stringify(value, null, 2);
}

function runSolution(sol) {
  if (sol.expectedOutput !== undefined) {
    return sol.expectedOutput;
  }
  const input = JSON.parse(sol.sampleInput);
  const sig = parseSolveSignature(sol.solutionCode);
  const solveCall = buildSolveCallFromSignature(sig);
  const fn = new Function(
    "input",
    `${sol.solutionCode}\nreturn ${solveCall};`,
  );
  return fn(input);
}

const results = {};
let failed = 0;

for (const numStr of Object.keys(SHEET_SOLUTIONS)) {
  const num = parseInt(numStr, 10);
  const sol = SHEET_SOLUTIONS[num];
  try {
    const out = runSolution(sol);
    results[num] = formatOutput(out);
  } catch (e) {
    failed++;
    results[num] = null;
    console.warn(`#${num} failed:`, e.message);
  }
}

fs.writeFileSync(
  "scripts/sample-outputs.json",
  JSON.stringify(results, null, 2),
);
console.log(
  `Wrote scripts/sample-outputs.json (${Object.keys(results).length} entries, ${failed} failed)`,
);
