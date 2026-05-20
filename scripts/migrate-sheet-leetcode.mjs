/**
 * Bulk-migrate sheet-solutions-data.mjs to LeetCode param names + var fn = function(...)
 * Uses scripts/.cache/leetcode/*.json metaData (name + params).
 *
 * Usage: node scripts/migrate-sheet-leetcode.mjs [--dry-run]
 */
import fs from "fs";
import { spawnSync } from "child_process";
import { SHEET_SOLUTIONS as ORIGINAL_SOLUTIONS } from "./sheet-solutions-data.mjs";
import { migrateToLeetCodeParams } from "./leetcode-meta.mjs";

const bodies = JSON.parse(
  fs.readFileSync("data/questions/problem-bodies.json", "utf8"),
);

const dryRun = process.argv.includes("--dry-run");
const report = { migrated: [], skipped: [], reverted: [] };

const backupPath = "scripts/sheet-solutions-data.pre-migrate.mjs.bak";
if (!dryRun && !fs.existsSync(backupPath)) {
  fs.copyFileSync("scripts/sheet-solutions-data.mjs", backupPath);
}

const migratedSolutions = {};

for (const numStr of Object.keys(ORIGINAL_SOLUTIONS).sort(
  (a, b) => Number(a) - Number(b),
)) {
  const num = Number(numStr);
  const original = ORIGINAL_SOLUTIONS[num];
  const slug = bodies[numStr]?.leetcodeSlug;

  if (!slug) {
    report.skipped.push({ num, reason: "no slug" });
    migratedSolutions[num] = original;
    continue;
  }

  const result = migrateToLeetCodeParams(original, slug);
  if (!result) {
    report.skipped.push({ num, slug, reason: "could not map params" });
    migratedSolutions[num] = original;
    continue;
  }

  migratedSolutions[num] = {
    ...original,
    sampleInput: JSON.stringify(result.input),
    humanInput: Object.entries(result.input)
      .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
      .join("\n"),
    starterCode: `var ${result.fnName} = function (${result.sig}) {\n${result.starter}\n};`,
    solutionCode: `var ${result.fnName} = function (${result.sig}) {\n${result.solution}\n};`,
    entryFunction: result.fnName,
  };
  report.migrated.push({
    num,
    slug,
    fn: result.fnName,
    params: result.sig,
  });
}

console.log(
  `Migrated ${report.migrated.length}, skipped ${report.skipped.length}`,
);

if (dryRun) {
  console.log("\nSample migrations:");
  for (const row of report.migrated.slice(0, 8)) {
    console.log(`  #${row.num} ${row.fn}(${row.params}) [${row.slug}]`);
  }
  process.exit(0);
}

const header = `/** DSA practice sheet — solutions for problems 1–211 */
function human(obj) {
  return Object.entries(obj)
    .map(([k, v]) => \`\${k} = \${JSON.stringify(v)}\`)
    .join("\\n");
}

function mk(
  difficulty,
  statement,
  patternHints,
  input,
  sig,
  starter,
  solution,
  expectedOutput,
  entryFunction,
) {
  const params = sig;
  if (entryFunction) {
    return {
      solutionCode: \`var \${entryFunction} = function (\${params}) {\\n\${solution}\\n};\`,
      starterCode: \`var \${entryFunction} = function (\${params}) {\\n\${starter}\\n};\`,
      entryFunction,
      humanInput: human(input),
      sampleInput: JSON.stringify(input),
      statement,
      patternHints,
      difficulty,
      ...(expectedOutput !== undefined ? { expectedOutput } : {}),
    };
  }
  return {
    solutionCode: \`function solve(\${params}) {\\n\${solution}\\n}\`,
    starterCode: \`function solve(\${params}) {\\n\${starter}\\n}\`,
    humanInput: human(input),
    sampleInput: JSON.stringify(input),
    statement,
    patternHints,
    difficulty,
    ...(expectedOutput !== undefined ? { expectedOutput } : {}),
  };
}

export const SHEET_SOLUTIONS = {
`;

function serializeSolutions(solutions) {
  const lines = [header];
  for (const numStr of Object.keys(solutions).sort(
    (a, b) => Number(a) - Number(b),
  )) {
    const e = solutions[numStr];
    const input = JSON.parse(e.sampleInput);
    const sig =
      e.entryFunction && e.solutionCode.startsWith("var ")
        ? (e.solutionCode.match(/function\s*\(([^)]*)\)/)?.[1] ?? "input")
        : (e.starterCode.match(/function\s+solve\s*\(([^)]*)\)/)?.[1] ??
          "input");

    const starterBody = e.starterCode.includes("var ")
      ? e.starterCode
          .replace(/^var \w+ = function \([^)]*\) \{\n?/, "")
          .replace(/\n?};\s*$/, "")
      : e.starterCode
          .replace(/^function solve\([^)]*\) \{\n?/, "")
          .replace(/\n?}\s*$/, "");
    const solutionBody = e.solutionCode.includes("var ")
      ? e.solutionCode
          .replace(/^var \w+ = function \([^)]*\) \{\n?/, "")
          .replace(/\n?};\s*$/, "")
      : e.solutionCode
          .replace(/^function solve\([^)]*\) \{\n?/, "")
          .replace(/\n?}\s*$/, "");

    const parts = [
      `  ${numStr}: mk(`,
      `${JSON.stringify(e.difficulty ?? "medium")}, `,
      `${JSON.stringify(e.statement)}, `,
      `${JSON.stringify(e.patternHints)}, `,
      `${JSON.stringify(input)}, `,
      `${JSON.stringify(sig)}, `,
      `${JSON.stringify(starterBody)}, `,
      `${JSON.stringify(solutionBody)}`,
    ];
    if (e.expectedOutput !== undefined) {
      parts.push(`, ${JSON.stringify(e.expectedOutput)}`);
    }
    if (e.entryFunction) {
      parts.push(`, ${JSON.stringify(e.entryFunction)}`);
    }
    parts.push("),");
    lines.push(parts.join(""));
  }
  lines.push("};\n");
  return lines.join("");
}

fs.writeFileSync("scripts/sheet-solutions-data.mjs", serializeSolutions(migratedSolutions));

const test = spawnSync(
  "npx",
  ["vitest", "run", "lib/tracer/solutions-instrument.test.ts", "--maxWorkers", "1"],
  { encoding: "utf8", shell: true },
);

const failNums = new Set();
for (const line of `${test.stdout}\n${test.stderr}`.split("\n")) {
  const hit = line.match(/#(\d+):/);
  if (hit) failNums.add(Number(hit[1]));
}

if (failNums.size > 0) {
  for (const num of failNums) {
    if (ORIGINAL_SOLUTIONS[num]) {
      migratedSolutions[num] = ORIGINAL_SOLUTIONS[num];
      report.reverted.push(num);
    }
  }
  fs.writeFileSync(
    "scripts/sheet-solutions-data.mjs",
    serializeSolutions(migratedSolutions),
  );
  console.log(`Reverted ${failNums.size} failing migrations to solve()`);
}

fs.writeFileSync(
  "scripts/migrate-leetcode-report.json",
  JSON.stringify(report, null, 2),
);
console.log("Wrote scripts/sheet-solutions-data.mjs");
console.log("Report: scripts/migrate-leetcode-report.json");
