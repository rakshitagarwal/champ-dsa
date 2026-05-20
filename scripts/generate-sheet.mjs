import fs from "fs";
import * as solutionsModule from "./sheet-solutions-data.mjs";
import { wrapLeetCodeEntry } from "./leetcode-entry.mjs";

let sampleOutputsByNum = {};
try {
  sampleOutputsByNum = JSON.parse(
    fs.readFileSync("scripts/sample-outputs.json", "utf8"),
  );
} catch {
  console.warn("scripts/sample-outputs.json missing — run node scripts/compute-sample-outputs.mjs");
}

let problemBodiesByNum = {};
try {
  problemBodiesByNum = JSON.parse(
    fs.readFileSync("data/questions/problem-bodies.json", "utf8"),
  );
} catch {
  console.warn(
    "data/questions/problem-bodies.json missing — run npm run resolve:leetcode && npm run fetch:leetcode",
  );
}

const SHEET_SOLUTIONS = solutionsModule.SHEET_SOLUTIONS;

const text = fs.readFileSync("scripts/sheet-extracted.txt", "utf8");
const lines = text.split("\n");

const SHEET_STRUCTURE = [
  {
    title: "ARRAYS",
    subsections: [
      { title: "1-D Array", from: 1, to: 9 },
      { title: "2-D Array", from: 10, to: 14 },
      { title: "Prefix Sum", from: 15, to: 17 },
      { title: "Kadane's Algorithm", from: 18, to: 20 },
      { title: "Sliding Window (Fixed/Variable Size)", from: 21, to: 25 },
      { title: "Two Pointers", from: 26, to: 30 },
    ],
  },
  {
    title: "Binary Search",
    subsections: [{ title: "Binary Search", from: 31, to: 37 }],
  },
  {
    title: "Sorting",
    subsections: [{ title: "Sorting", from: 38, to: 44 }],
  },
  {
    title: "Hashing",
    subsections: [{ title: "Hashing", from: 45, to: 53 }],
  },
  {
    title: "Linked Lists",
    subsections: [{ title: "Linked Lists", from: 54, to: 68 }],
  },
  {
    title: "Stack and Queue",
    subsections: [{ title: "Stack and Queue", from: 69, to: 78 }],
  },
  {
    title: "Heap",
    subsections: [{ title: "Heap", from: 79, to: 84 }],
  },
  {
    title: "Recursion & Backtracking",
    subsections: [
      { title: "Recursion", from: 85, to: 90 },
      { title: "Backtracking", from: 91, to: 98 },
    ],
  },
  {
    title: "Trees",
    subsections: [
      { title: "Binary Tree", from: 99, to: 102 },
      { title: "Level Order Traversal (BFS)", from: 103, to: 103 },
      { title: "Tree Traversals", from: 104, to: 106 },
      { title: "DFS (Recursive & Iterative)", from: 107, to: 111 },
      { title: "BST", from: 112, to: 115 },
    ],
  },
  {
    title: "Trees II",
    subsections: [
      { title: "BBST (AVL Tree)", from: 116, to: 119 },
      { title: "Trie", from: 120, to: 122 },
      { title: "Union-Find (Disjoint Set)", from: 123, to: 124 },
      { title: "Segment Tree (Range Queries)", from: 125, to: 126 },
    ],
  },
  {
    title: "Graphs",
    subsections: [
      { title: "BFS & DFS", from: 127, to: 130 },
      { title: "Detect Cycle in Undirected/Directed Graph", from: 131, to: 136 },
      { title: "Dijkstra's Algorithm (SSSP)", from: 137, to: 140 },
      { title: "Prim's & Kruskal's (MST)", from: 141, to: 143 },
      { title: "Floyd-Warshall (APSP)", from: 144, to: 146 },
    ],
  },
  {
    title: "Greedy",
    subsections: [{ title: "Greedy", from: 147, to: 154 }],
  },
  {
    title: "Dynamic Programming",
    subsections: [
      { title: "Climbing Stairs", from: 155, to: 157 },
      { title: "Coin Change (1D DP)", from: 158, to: 159 },
      { title: "Buy and Sell Stock", from: 160, to: 165 },
      { title: "0/1 Knapsack", from: 166, to: 167 },
      { title: "Unbounded Knapsack", from: 168, to: 169 },
      { title: "Longest Common Subsequence (LCS)", from: 170, to: 173 },
      { title: "Longest Increasing Subsequence (LIS)", from: 174, to: 176 },
      { title: "Matrix Chain Multiplication (MCM)", from: 177, to: 180 },
      { title: "DP on Grids and Trees", from: 181, to: 185 },
    ],
  },
  {
    title: "Math",
    subsections: [{ title: "Math", from: 186, to: 201 }],
  },
  {
    title: "Miscellaneous",
    subsections: [
      { title: "Bit Manipulation Tricks", from: 202, to: 208 },
      { title: "Rabin-Karp (Rolling Hash)", from: 209, to: 211 },
    ],
  },
];

function getPatternMeta(num) {
  if (num <= 14) return { slug: "two-pointers", name: "Two Pointers" };
  if (num <= 17) return { slug: "prefix-sum", name: "Prefix Sum" };
  if (num <= 20) return { slug: "kadane", name: "Kadane's Algorithm" };
  if (num <= 25) return { slug: "sliding-window", name: "Sliding Window" };
  if (num <= 30) return { slug: "two-pointers", name: "Two Pointers" };
  if (num <= 37) return { slug: "binary-search", name: "Binary Search" };
  if (num <= 44) return { slug: "top-k-heap", name: "Sorting" };
  if (num <= 53) return { slug: "hashing", name: "Hashing" };
  if (num <= 68) return { slug: "fast-slow-pointers", name: "Linked Lists" };
  if (num <= 78) return { slug: "monotonic-stack", name: "Stack & Queue" };
  if (num <= 84) return { slug: "top-k-heap", name: "Heap" };
  if (num <= 90) return { slug: "recursion", name: "Recursion" };
  if (num <= 98) return { slug: "subsets-backtracking", name: "Backtracking" };
  if (num <= 103) return { slug: "tree-bfs", name: "Trees" };
  if (num <= 115) return { slug: "tree-dfs", name: "Trees" };
  if (num <= 126) return { slug: "trie", name: "Trees II" };
  if (num <= 146) return { slug: "graph-bfs", name: "Graphs" };
  if (num <= 154) return { slug: "greedy", name: "Greedy" };
  if (num <= 185) return { slug: "dp-1d", name: "Dynamic Programming" };
  if (num <= 201) return { slug: "math", name: "Math" };
  return { slug: "bitwise-xor", name: "Miscellaneous" };
}

function slugify(t) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

const titleByNum = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const start = line.match(/^(\d{1,3})\s+(.+)/);
  if (!start) continue;
  const num = parseInt(start[1], 10);
  if (num > 211) continue;

  let title = start[2].replace(/\s+/g, " ").trim();
  let j = i + 1;
  let foundLink = /Link/i.test(line);
  while (j < lines.length && !foundLink) {
    const next = lines[j].trim();
    if (/^(\d{1,3})\s+/.test(next) && j > i) break;
    if (/Link\s*$/i.test(next)) {
      if (!/Link/i.test(title)) title += " " + next.replace(/\s*Link\s*$/i, "").trim();
      foundLink = true;
      break;
    }
    if (
      next &&
      !next.startsWith("#") &&
      !/^(A C A D E M Y|DSA Sheet|By )/i.test(next)
    ) {
      title += " " + next;
    }
    j++;
  }
  if (!foundLink) continue;

  title = title.replace(/\s+Link\s*$/i, "").replace(/\s+/g, " ").trim();
  if (title.length < 2) continue;
  titleByNum.set(num, title);
}

const numToSubsection = new Map();
for (const section of SHEET_STRUCTURE) {
  const sectionId = slugify(section.title);
  for (const sub of section.subsections) {
    const subId = slugify(`${sectionId}-${sub.title}`);
    for (let n = sub.from; n <= sub.to; n++) {
      numToSubsection.set(n, { sheetSectionId: sectionId, sheetSubsectionId: subId });
    }
  }
}

function questionIdForNum(num) {
  const sol = SHEET_SOLUTIONS[num];
  const title =
    titleByNum.get(num) ?? sol?.statement.split(".")[0].slice(0, 60) ?? `problem-${num}`;
  return `bc-${String(num).padStart(3, "0")}-${slugify(title)}`;
}

const sheetSections = SHEET_STRUCTURE.map((section) => {
  const sectionId = slugify(section.title);
  return {
    id: sectionId,
    title: section.title,
    subsections: section.subsections.map((sub) => {
      const subId = slugify(`${sectionId}-${sub.title}`);
      const questionIds = [];
      for (let n = sub.from; n <= sub.to; n++) {
        if (SHEET_SOLUTIONS[n]) questionIds.push(questionIdForNum(n));
      }
      return { id: subId, title: sub.title, questionIds };
    }),
  };
});

const out = [];
for (const numStr of Object.keys(SHEET_SOLUTIONS)) {
  const num = parseInt(numStr, 10);
  const sol = SHEET_SOLUTIONS[num];
  const pattern = getPatternMeta(num);
  const meta = numToSubsection.get(num);
  const title =
    titleByNum.get(num) ??
    sol.statement.split(".")[0].slice(0, 60) ??
    `Problem ${num}`;

  out.push({
    num,
    title,
    id: questionIdForNum(num),
    patternSlug: pattern.slug,
    patternName: pattern.name,
    sheetSectionId: meta?.sheetSectionId ?? "arrays",
    sheetSubsectionId: meta?.sheetSubsectionId ?? "arrays-problems",
    ...sol,
  });
}

out.sort((a, b) => a.num - b.num);

fs.writeFileSync(
  "data/questions/sheet-questions.ts",
  `/* Auto-generated from DSA practice sheet */
import type { Question } from "@/types/question";

export const sheetQuestions: Question[] = ${JSON.stringify(
    out.map((q) => {
      const body = problemBodiesByNum[String(q.num)];
      const sampleOut = sampleOutputsByNum[String(q.num)];
      let runExampleOutput = "";
      if (sampleOut) {
        try {
          runExampleOutput = JSON.stringify(JSON.parse(sampleOut));
        } catch {
          runExampleOutput = sampleOut.trim();
        }
      }
      const leetWrapped = body?.leetcodeSlug
        ? wrapLeetCodeEntry(
            q.starterCode,
            q.solutionCode,
            q.sampleInput,
            body.leetcodeSlug,
            q.entryFunction,
          )
        : {
            starterCode: q.starterCode,
            solutionCode: q.solutionCode,
            entryFunction: q.entryFunction ?? "solve",
          };
      return {
        id: q.id,
        title: q.title,
        patternSlug: q.patternSlug,
        patternName: q.patternName,
        difficulty: body?.difficulty ?? q.difficulty ?? "medium",
        statement: q.statement,
        ...(body?.description ? { description: body.description } : {}),
        ...(body?.leetcodeSlug ? { leetcodeSlug: body.leetcodeSlug } : {}),
        ...(body?.leetcodeUrl ? { leetcodeUrl: body.leetcodeUrl } : {}),
        ...(leetWrapped.entryFunction !== "solve"
          ? { entryFunction: leetWrapped.entryFunction }
          : {}),
        ...(q.humanInput && runExampleOutput
          ? {
              examples: [
                { input: q.humanInput, output: runExampleOutput },
              ],
            }
          : {}),
        ...(body?.constraints?.length ? { constraints: body.constraints } : {}),
        patternHints: q.patternHints,
        starterCode: leetWrapped.starterCode,
        solutionCode: leetWrapped.solutionCode,
        sampleInput: q.sampleInput,
        humanInput: q.humanInput,
        sampleOutput: sampleOutputsByNum[String(q.num)] ?? undefined,
        sheetNumber: q.num,
        sheetSectionId: q.sheetSectionId,
        sheetSubsectionId: q.sheetSubsectionId,
        source: "sheet",
      };
    }),
    null,
    2,
  )};
`,
);

fs.writeFileSync(
  "data/questions/sheet-meta.ts",
  `/* Auto-generated from DSA practice sheet */
export type SheetSubsection = {
  id: string;
  title: string;
  questionIds: string[];
};

export type SheetSection = {
  id: string;
  title: string;
  subsections: SheetSubsection[];
};

export const sheetSections: SheetSection[] = ${JSON.stringify(sheetSections, null, 2)};
`,
);

const counts = {};
for (const s of sheetSections) {
  for (const sub of s.subsections) {
    counts[sub.title] = sub.questionIds.length;
  }
}
console.log("Generated", out.length, "sheet questions");
console.log("Subsection counts:", counts);
