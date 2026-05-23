/**
 * Generate README-style explanations for all imported user solutions.
 *
 * Usage:
 *   node scripts/generate-user-explanations.mjs
 *   node scripts/generate-user-explanations.mjs --groq   # optional LLM upgrade
 */
import fs from "fs";
import * as solutionsModule from "./sheet-solutions-data.mjs";
import { USER_SOLUTION_OVERRIDES } from "./user-solution-overrides.mjs";
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
  /* optional */
}

const text = fs.readFileSync("scripts/sheet-extracted.txt", "utf8");
const lines = text.split("\n");
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
  if (title.length >= 2) titleByNum.set(num, title);
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

async function buildGroqExplanation(meta) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY missing");

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
          content: `You write DSA revision notes like a detailed README tutorial.
Respond with JSON only: { summary, whyItWorks, howExamplesAreSatisfied, keyIdeas: string[] }

Rules:
- summary: problem statement + example + "Your solution uses **pattern**"
- whyItWorks: long step-by-step walkthrough with --- separators, ## Step N headers, code in \`\`\`js blocks, plain English after each snippet
- howExamplesAreSatisfied: full dry-run trace on the sample input
- keyIdeas: 4-6 bullets including time/space complexity and pattern name
- Explain THIS exact student code — do not rewrite or suggest a different algorithm`,
        },
        {
          role: "user",
          content: `Sheet #${meta.num} — ${meta.title}
Statement: ${meta.statement}
Sample input: ${meta.humanInput}
Expected output: ${meta.sampleOutput}
Hints: ${meta.patternHints?.join("; ")}
Student code:
${meta.solutionCode}`,
        },
      ],
      temperature: 0.25,
      response_format: { type: "json_object" },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? `Groq ${res.status}`);
  const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
  return {
    summary: String(parsed.summary ?? ""),
    whyItWorks: String(parsed.whyItWorks ?? ""),
    howExamplesAreSatisfied: String(parsed.howExamplesAreSatisfied ?? ""),
    keyIdeas: Array.isArray(parsed.keyIdeas)
      ? parsed.keyIdeas.map(String)
      : meta.patternHints ?? [],
  };
}

if (useGroq) loadEnvLocal();

const nums = Object.keys(USER_SOLUTION_OVERRIDES)
  .map(Number)
  .sort((a, b) => a - b);

const explanations = {};

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  const sol = SHEET_SOLUTIONS[num];
  const override = USER_SOLUTION_OVERRIDES[String(num)];
  if (!sol || !override?.solutionCode?.trim()) continue;

  const title =
    titleByNum.get(num) ??
    sol.statement.split(".")[0].slice(0, 80) ??
    `Problem ${num}`;
  const sampleOutput =
    sampleOutputsByNum[String(num)] ??
    sol.expectedOutput ??
    undefined;

  const meta = {
    num,
    title,
    statement: sol.statement,
    humanInput: sol.humanInput ?? "",
    sampleOutput,
    patternHints: sol.patternHints ?? [],
    solutionCode: override.solutionCode.trim(),
  };

  if (num === 71) {
    explanations[num] = buildBackspaceCompareExplanation();
    continue;
  }

  if (useGroq) {
    process.stdout.write(`Groq ${i + 1}/${nums.length} #${num}…\n`);
    try {
      explanations[num] = await buildGroqExplanation(meta);
    } catch (err) {
      console.warn(`  fallback offline #${num}: ${err.message}`);
      explanations[num] = buildReadmeExplanation(meta);
    }
    await new Promise((r) => setTimeout(r, 300));
  } else {
    explanations[num] = buildReadmeExplanation(meta);
  }
}

const fileBody = `/**
 * README-style revision explanations for user-imported BossCoder sheet solutions.
 * Auto-generated — run: node scripts/generate-user-explanations.mjs
 * Keyed by sheet question number (not GeeksforGeeks extras).
 */
export const USER_EXPLANATIONS_BY_NUM = ${JSON.stringify(explanations, null, 2)};
`;

fs.writeFileSync("scripts/user-explanations-data.mjs", fileBody);
console.log(`Generated ${Object.keys(explanations).length} README-style explanations`);
