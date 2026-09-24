/**
 * Generates data/practice/leetcode-sheet.ts from risingbrain-sheet.json
 * Run: node scripts/generate-practice-sheet.mjs
 */
import fs from "fs";

const topics = JSON.parse(
  fs.readFileSync("data/practice/risingbrain-sheet.json", "utf8"),
);

/** Map RisingBrain topic → our /patterns slug (when one exists). */
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
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
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
lines.push(` * Pattern-wise DSA sheet — grouped like RisingBrain /sheet.`);
lines.push(` * Subsection titles + hints are the recognition cues.`);
lines.push(` * Source: https://risingbrain.org/sheet (Pattern Wise)`);
lines.push(` */`);
lines.push(`export const PRACTICE_SHEET: LcGroup[] = [`);

for (const topic of topics) {
  const groupId = slugify(topic.name);
  const patternSlug = PATTERN_SLUG[topic.name];
  lines.push(`  {`);
  lines.push(`    id: "${groupId}",`);
  lines.push(`    title: "${esc(topic.name)}",`);
  if (patternSlug) {
    lines.push(`    patternSlug: "${patternSlug}",`);
  }
  lines.push(`    blurb: "${esc(topic.description)}",`);
  lines.push(`    subsections: [`);

  for (const pattern of topic.patterns) {
    const subId = `${groupId}-${slugify(pattern.name)}`;
    lines.push(`      {`);
    lines.push(`        id: "${subId}",`);
    lines.push(`        title: "${esc(pattern.name)}",`);
    lines.push(`        hint: "${esc(pattern.identification)}",`);
    lines.push(`        problems: [`);
    const seen = new Set();
    for (const prob of pattern.problems) {
      if (seen.has(prob.slug)) continue;
      seen.add(prob.slug);
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
