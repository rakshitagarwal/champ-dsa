/**
 * Fetch your latest LeetCode submissions per BossCoder sheet problem (LeetCode only).
 *
 * Requires LEETCODE_SESSION in .env.local
 *
 * Usage:
 *   node scripts/fetch-leetcode-submissions.mjs           # fetch + update user-solutions.json
 *   node scripts/fetch-leetcode-submissions.mjs --dry-run # preview only
 *   node scripts/fetch-leetcode-submissions.mjs --limit 5 # first N LC problems
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BODIES_PATH = path.join(ROOT, "data/questions/problem-bodies.json");
const USER_SOLUTIONS_PATH = path.join(ROOT, "scripts/user-solutions.json");
const REPORT_PATH = path.join(ROOT, "scripts/leetcode-submissions-report.json");

const GFG_ONLY_NUMS = new Set([5, 8, 22, 38, 39, 63, 64, 131, 132, 145, 148, 150, 195]);

const SUBMISSION_LIST_QUERY = `
query submissionList($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!) {
  submissionList(offset: $offset, limit: $limit, lastKey: $lastKey, questionSlug: $questionSlug) {
    lastKey
    hasNext
    submissions {
      id
      statusDisplay
      timestamp
    }
  }
}`;

const SUBMISSION_DETAIL_QUERY = `
query submissionDetails($submissionId: Int!) {
  submissionDetails(submissionId: $submissionId) {
    code
    lang {
      name
    }
  }
}`;

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) throw new Error(".env.local missing");
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  if (!process.env.LEETCODE_SESSION) {
    throw new Error("LEETCODE_SESSION missing in .env.local");
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function lcGraphql(session, query, variables) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `LEETCODE_SESSION=${session}`,
      Referer: "https://leetcode.com",
      Origin: "https://leetcode.com",
      "User-Agent": "champdsa-leetcode-sync/1.0",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data;
}

const JS_LANG = /javascript|typescript|node/i;

function preferSubmission(subs) {
  if (!subs?.length) return null;
  const pickFrom = (list) => {
    if (!list.length) return null;
    return (
      list.find((s) => s.statusDisplay === "Accepted") ??
      list.find((s) => s.statusDisplay?.includes("Wrong")) ??
      list[0]
    );
  };
  return pickFrom(subs);
}

async function fetchSubmissionList(session, slug) {
  const data = await lcGraphql(session, SUBMISSION_LIST_QUERY, {
    offset: 0,
    limit: 20,
    lastKey: null,
    questionSlug: slug,
  });
  return data?.submissionList?.submissions ?? [];
}

async function fetchLatestSubmissionCode(session, slug) {
  const subs = await fetchSubmissionList(session, slug);
  if (!subs.length) return null;

  for (const pick of subs) {
    const detail = await lcGraphql(session, SUBMISSION_DETAIL_QUERY, {
      submissionId: Number(pick.id),
    });
    const code = detail?.submissionDetails?.code?.trim();
    const lang = detail?.submissionDetails?.lang?.name ?? "";
    if (!code) continue;
    if (!JS_LANG.test(lang)) continue;
    return {
      code,
      lang,
      status: pick.statusDisplay,
      submissionId: pick.id,
    };
  }

  const fallback = preferSubmission(subs);
  if (!fallback) return null;
  const detail = await lcGraphql(session, SUBMISSION_DETAIL_QUERY, {
    submissionId: Number(fallback.id),
  });
  const code = detail?.submissionDetails?.code?.trim();
  if (!code) return null;
  const lang = detail?.submissionDetails?.lang?.name ?? "";
  return {
    code,
    lang,
    status: fallback.statusDisplay,
    submissionId: fallback.id,
    nonJs: !JS_LANG.test(lang),
  };
}

/** Read existing user-solutions.json (strict JSON or legacy multiline format). */
function readUserSolutionsFile() {
  const text = fs.readFileSync(USER_SOLUTIONS_PATH, "utf8");
  const entries = new Map();
  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr)) {
      for (const row of arr) {
        if (row?.questionNumber != null) {
          entries.set(String(row.questionNumber), row.solution ?? "");
        }
      }
      return { entries };
    }
  } catch {
    /* legacy multiline */
  }
  const numRe = /"questionNumber":\s*"(\d+)"/g;
  let m;
  while ((m = numRe.exec(text))) {
    const num = m[1];
    const solKey = text.indexOf('"solution":', m.index);
    if (solKey === -1) continue;
    const solStart = text.indexOf('"', solKey + 11) + 1;
    const endRe = /"\r?\n\s*\},?/g;
    endRe.lastIndex = solStart;
    const endM = endRe.exec(text);
    if (!endM) continue;
    entries.set(num, text.slice(solStart, endM.index));
  }
  return { entries };
}

function writeUserSolutionsFile(entries) {
  const arr = [];
  for (let n = 1; n <= 211; n++) {
    arr.push({
      questionNumber: String(n),
      solution: entries.get(String(n)) ?? "",
    });
  }
  fs.writeFileSync(USER_SOLUTIONS_PATH, JSON.stringify(arr, null, 2) + "\n");
}

function sheetProblems() {
  const bodies = JSON.parse(fs.readFileSync(BODIES_PATH, "utf8"));
  const out = [];
  for (let n = 1; n <= 211; n++) {
    if (GFG_ONLY_NUMS.has(n)) continue;
    const b = bodies[String(n)];
    if (!b?.leetcodeSlug) continue;
    out.push({
      num: n,
      slug: b.leetcodeSlug,
      title: b.title,
    });
  }
  return out;
}

const dryRun = process.argv.includes("--dry-run");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : undefined;

loadEnvLocal();
const session = process.env.LEETCODE_SESSION;
const problems = sheetProblems();
const slice = limit ? problems.slice(0, limit) : problems;

console.log(
  `Fetching latest submissions for ${slice.length} LeetCode sheet problems…`,
);

const report = { ok: [], skipped: [], failed: [] };
const { entries } = readUserSolutionsFile();

for (let i = 0; i < slice.length; i++) {
  const { num, slug, title } = slice[i];
  process.stdout.write(`[${i + 1}/${slice.length}] #${num} ${slug}… `);
  try {
    await sleep(280);
    const result = await fetchLatestSubmissionCode(session, slug);
    if (!result) {
      console.log("no submission");
      report.skipped.push({ num, slug, title, reason: "no submission" });
      continue;
    }
    if (!dryRun) entries.set(String(num), result.code);
    console.log(`${result.status} (${result.lang})`);
    report.ok.push({
      num,
      slug,
      title,
      lang: result.lang,
      status: result.status,
      chars: result.code.length,
    });
  } catch (err) {
    console.log(`ERR: ${err.message}`);
    report.failed.push({ num, slug, title, error: err.message });
  }
}

if (!dryRun) {
  if (report.ok.length === 0) {
    console.warn("\nNo submissions fetched — user-solutions.json not modified.");
  } else {
    writeUserSolutionsFile(entries);
    console.log(`\nUpdated ${USER_SOLUTIONS_PATH} (${report.ok.length} solutions)`);
  }
}

fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`Report: ${REPORT_PATH}`);
console.log(
  `Done: ${report.ok.length} updated, ${report.skipped.length} skipped, ${report.failed.length} failed`,
);
