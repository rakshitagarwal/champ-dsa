/**
 * Map Bosscoder sheet numbers (1–211) to LeetCode slugs.
 * Usage: node scripts/resolve-leetcode-slugs.mjs
 */
import fs from "fs";
import {
  fetchLeetcodeCatalog,
  matchTitleToSlug,
} from "./leetcode-utils.mjs";

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

const overrides = JSON.parse(
  fs.readFileSync("scripts/leetcode-slug-overrides.json", "utf8"),
);

console.log("Fetching LeetCode problem catalog…");
const catalog = await fetchLeetcodeCatalog();

const links = {};
const report = { matched: 0, missing: [] };

for (let num = 1; num <= 211; num++) {
  const title = titleByNum.get(num);
  if (!title) {
    report.missing.push({ num, reason: "no title in sheet extract" });
    continue;
  }
  const slug =
    overrides[String(num)] ?? matchTitleToSlug(title, catalog, overrides);
  if (!slug) {
    report.missing.push({ num, title });
    continue;
  }
  links[String(num)] = {
    sheetNumber: num,
    title,
    leetcodeSlug: slug,
    leetcodeUrl: `https://leetcode.com/problems/${slug}/`,
  };
  report.matched++;
}

fs.writeFileSync(
  "scripts/leetcode-links.json",
  JSON.stringify(links, null, 2),
);
fs.writeFileSync(
  "scripts/leetcode-resolve-report.json",
  JSON.stringify(report, null, 2),
);
console.log(
  `Wrote scripts/leetcode-links.json (${report.matched} matched, ${report.missing.length} missing)`,
);
