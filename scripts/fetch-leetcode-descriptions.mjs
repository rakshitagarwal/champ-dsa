/**
 * Fetch full problem bodies from LeetCode GraphQL into problem-bodies.json.
 * Usage: node scripts/fetch-leetcode-descriptions.mjs [--limit N] [--only 23,24]
 */
import fs from "fs";
import path from "path";
import {
  fetchQuestionBySlug,
  parseExamples,
  difficultyFromLc,
} from "./leetcode-utils.mjs";

const args = process.argv.slice(2);
const limitIdx = args.indexOf("--limit");
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : Infinity;
const onlyIdx = args.indexOf("--only");
const onlySet =
  onlyIdx >= 0
    ? new Set(args[onlyIdx + 1].split(",").map((s) => s.trim()))
    : null;

const linksPath = "scripts/leetcode-links.json";
if (!fs.existsSync(linksPath)) {
  console.error("Run node scripts/resolve-leetcode-slugs.mjs first");
  process.exit(1);
}

const links = JSON.parse(fs.readFileSync(linksPath, "utf8"));
const outPath = "data/questions/problem-bodies.json";
const cacheDir = "scripts/.cache/leetcode";
fs.mkdirSync(cacheDir, { recursive: true });

let existing = {};
if (fs.existsSync(outPath)) {
  existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
}

const report = { ok: [], failed: [], skipped: [] };
const bodies = { ...existing };

const entries = Object.entries(links).sort(
  (a, b) => a[1].sheetNumber - b[1].sheetNumber,
);

let count = 0;
for (const [num, meta] of entries) {
  if (onlySet && !onlySet.has(num)) continue;
  if (count >= limit) break;

  const slug = meta.leetcodeSlug;
  const cacheFile = path.join(cacheDir, `${slug}.json`);

  if (bodies[num]?.description && bodies[num].leetcodeSlug === slug) {
    report.skipped.push(num);
    continue;
  }

  try {
    let question;
    if (fs.existsSync(cacheFile)) {
      question = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    } else {
      await new Promise((r) => setTimeout(r, 400));
      question = await fetchQuestionBySlug(slug);
      if (!question) throw new Error("empty question");
      fs.writeFileSync(cacheFile, JSON.stringify(question, null, 2));
    }

    const examples = parseExamples(question);
    bodies[num] = {
      sheetNumber: meta.sheetNumber,
      title: meta.title,
      leetcodeSlug: slug,
      leetcodeUrl: meta.leetcodeUrl,
      description: question.content ?? "",
      difficulty: difficultyFromLc(question.difficulty),
      examples:
        examples.length > 0
          ? examples.map((ex) => ({
              input: ex.input,
              output: ex.output || undefined,
            }))
          : undefined,
    };
    report.ok.push(num);
    count++;
    if (count % 10 === 0) console.log(`Fetched ${count}…`);
  } catch (e) {
    report.failed.push({ num, slug, error: e.message });
    console.warn(`#${num} ${slug}: ${e.message}`);
  }
}

fs.mkdirSync("data/questions", { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(bodies, null, 2));
fs.writeFileSync(
  "scripts/fetch-report.json",
  JSON.stringify(report, null, 2),
);
console.log(
  `Wrote ${outPath} (${report.ok.length} ok, ${report.failed.length} failed, ${report.skipped.length} skipped)`,
);
