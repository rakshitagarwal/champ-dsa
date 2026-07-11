import fs from "node:fs";
import path from "node:path";

const html = await fetch(
  "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
).then((r) => r.text());

// Save snippet for manual inspection
const out = path.join(import.meta.dirname, "page-snippet.html");
fs.writeFileSync(out, html.slice(0, 50000));
console.log("wrote", out);

// Try to find section titles in page
const sectionPatterns = [
  /Learn the basics/gi,
  /Binary Search/gi,
  /Dynamic Programming/gi,
  /### ([^\n<]+)/g,
];
for (const p of sectionPatterns) {
  const matches = html.match(p);
  console.log(p, matches?.length ?? 0);
}

// Extract all leetcode links with surrounding context
const linkRe =
  /(?:title|aria-label|>)([^<]{0,80})<[^>]*href="https:\/\/leetcode\.com\/problems\/([a-z0-9-]+)/gi;
const items = [];
let m;
while ((m = linkRe.exec(html))) {
  items.push({ title: m[1].trim(), slug: m[2] });
}
console.log("context links", items.length);
console.log(items.slice(0, 5));

// Alternative: find problem titles near slugs
const slugOrder = [];
const slugRe = /leetcode\.com\/problems\/([a-z0-9-]+)/gi;
while ((m = slugRe.exec(html))) {
  slugOrder.push(m[1]);
}
console.log("total slug occurrences", slugOrder.length);
