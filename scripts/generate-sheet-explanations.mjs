/**
 * Generate pre-saved solution explanations for all 211 sheet questions.
 *
 * Usage:
 *   node scripts/generate-sheet-explanations.mjs          # offline (pattern-based copy)
 *   node scripts/generate-sheet-explanations.mjs --groq   # Groq API (requires GROQ_API_KEY in .env.local)
 */
import fs from "fs";
import * as solutionsModule from "./sheet-solutions-data.mjs";
import { USER_EXPLANATIONS_BY_NUM } from "./user-explanations-data.mjs";
import {
  buildReadmeExplanation,
  buildBackspaceCompareExplanation,
} from "./build-readme-explanation.mjs";

const SHEET_SOLUTIONS = solutionsModule.SHEET_SOLUTIONS;
const useGroq = process.argv.includes("--groq");

let sampleOutputsByNum = {};
try {
  sampleOutputsByNum = JSON.parse(
    fs.readFileSync("scripts/sample-outputs.json", "utf8"),
  );
} catch {
  console.warn("scripts/sample-outputs.json missing");
}

const text = fs.readFileSync("scripts/sheet-extracted.txt", "utf8");
const lines = text.split("\n");

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
      if (!/Link/i.test(title))
        title += " " + next.replace(/\s*Link\s*$/i, "").trim();
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

function questionIdForNum(num) {
  const sol = SHEET_SOLUTIONS[num];
  const title =
    titleByNum.get(num) ??
    sol?.statement.split(".")[0].slice(0, 60) ??
    `problem-${num}`;
  return `bc-${String(num).padStart(3, "0")}-${slugify(title)}`;
}

function buildOfflineExplanation(q) {
  const sol = SHEET_SOLUTIONS[q.num];
  if (!sol?.solutionCode?.trim()) {
    const hints = q.patternHints?.length ? q.patternHints : [q.patternName];
    return {
      summary: `Sheet #${q.num} — ${q.title}\n\nProblem: ${q.statement}`,
      whyItWorks: `Reference approach: ${q.patternName}. ${hints.join(". ")}.`,
      howExamplesAreSatisfied: q.humanInput
        ? `Sample input:\n${q.humanInput}`
        : "Walk through the problem examples.",
      keyIdeas: hints,
    };
  }
  if (q.num === 71) return buildBackspaceCompareExplanation();
  const sampleOut =
    sampleOutputsByNum[String(q.num)] ?? sol.expectedOutput ?? undefined;
  return buildReadmeExplanation({
    num: q.num,
    title: q.title,
    statement: q.statement,
    humanInput: q.humanInput ?? sol.humanInput ?? "",
    sampleOutput: sampleOut,
    patternHints: q.patternHints ?? sol.patternHints ?? [],
    solutionCode: sol.solutionCode.trim(),
  });
}

function loadEnvLocal() {
  try {
    const raw = fs.readFileSync(".env.local", "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* optional */
  }
}

async function buildGroqExplanation(q) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY missing in .env.local");

  const sampleOut = sampleOutputsByNum[String(q.num)]?.trim() ?? "";
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You explain DSA reference solutions clearly. Respond with JSON only: { summary, whyItWorks, howExamplesAreSatisfied, keyIdeas: string[] }",
        },
        {
          role: "user",
          content: `Problem: ${q.title}\nPattern: ${q.patternName}\nStatement: ${q.statement}\nSample input: ${q.humanInput}\nExpected output: ${sampleOut}\nHints: ${q.patternHints?.join("; ")}\n\nExplain the reference solution approach in plain English (no line-by-line trace).`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message ?? `Groq ${res.status}`);
  }
  const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
  return {
    summary: String(parsed.summary ?? ""),
    whyItWorks: String(parsed.whyItWorks ?? ""),
    howExamplesAreSatisfied: String(parsed.howExamplesAreSatisfied ?? ""),
    keyIdeas: Array.isArray(parsed.keyIdeas)
      ? parsed.keyIdeas.map(String)
      : q.patternHints ?? [],
  };
}

const questions = Object.keys(SHEET_SOLUTIONS)
  .map((n) => parseInt(n, 10))
  .sort((a, b) => a - b)
  .map((num) => {
    const sol = SHEET_SOLUTIONS[num];
    const pattern = getPatternMeta(num);
    const title =
      titleByNum.get(num) ??
      sol.statement.split(".")[0].slice(0, 60) ??
      `Problem ${num}`;
    return {
      num,
      id: questionIdForNum(num),
      title,
      statement: sol.statement,
      patternName: pattern.name,
      patternHints: sol.patternHints ?? [],
      humanInput: sol.humanInput ?? "",
    };
  });

if (useGroq) loadEnvLocal();

const explanations = {};
for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const userExpl = USER_EXPLANATIONS_BY_NUM[q.num];
  if (userExpl) {
    explanations[q.id] = userExpl;
    continue;
  }
  if (useGroq) {
    process.stdout.write(`Groq ${i + 1}/${questions.length} ${q.id}…\n`);
    try {
      explanations[q.id] = await buildGroqExplanation(q);
    } catch (err) {
      console.warn(`  fallback offline: ${err.message}`);
      explanations[q.id] = buildOfflineExplanation(q);
    }
    await new Promise((r) => setTimeout(r, 300));
  } else {
    explanations[q.id] = buildOfflineExplanation(q);
  }
}

fs.writeFileSync(
  "data/questions/sheet-ai-explanations.ts",
  `/* Auto-generated — run: npm run generate:explanations */
import type { AiExplainCommentary } from "@/types/ai-explain";

export const sheetAiExplanationsByQuestionId: Record<string, AiExplainCommentary> = ${JSON.stringify(explanations, null, 2)};
`,
);

console.log(`Generated ${Object.keys(explanations).length} saved explanations`);
