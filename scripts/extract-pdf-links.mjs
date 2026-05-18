/**
 * Extract hyperlink URIs from the Bosscoder PDF (best-effort).
 * Usage: node scripts/extract-pdf-links.mjs [pdfPath]
 */
import fs from "fs";
import { PDFParse } from "pdf-parse";

const pdfPath =
  process.argv[2] ||
  "c:/Users/Rakshit/Documents/bosscoder notes/bosscoder-dsa-sheet.pdf";

const buf = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: buf });
const result = await parser.getText();
await parser.destroy();

const links = [];
if (result?.links) {
  for (const l of result.links) {
    if (l.url) links.push({ url: l.url, page: l.pageNumber });
  }
}

const leetcode = links.filter((l) =>
  /leetcode\.com\/problems\//i.test(l.url),
);

fs.writeFileSync(
  "scripts/pdf-extracted-links.json",
  JSON.stringify({ all: links.length, leetcode }, null, 2),
);
console.log(
  `Wrote scripts/pdf-extracted-links.json (${leetcode.length} LeetCode URLs of ${links.length} total)`,
);
