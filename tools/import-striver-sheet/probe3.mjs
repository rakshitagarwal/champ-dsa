import fs from "node:fs";
import path from "node:path";

const html = await fetch(
  "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
).then((r) => r.text());

// Parse RSC flight data chunks for problem info
const chunks = html.split('self.__next_f.push([1,"');
console.log("chunks", chunks.length);

const allText = chunks.join("");
const sectionHits = [];
const sectionNames = [
  "Learn the basics",
  "Learn Important Sorting Techniques",
  "Solve Problems on Arrays",
  "Binary Search [1D, 2D Arrays, Search Space]",
  "Strings [Basic and Medium]",
  "Learn LinkedList",
  "Recursion [PatternWise]",
  "Bit Manipulation",
  "Stack and Queues",
  "Sliding Window",
  "Heaps",
  "Greedy Algorithms",
  "Binary Trees",
  "Binary Search Trees",
  "Graphs",
  "Dynamic Programming",
  "Tries",
];
for (const name of sectionNames) {
  const idx = allText.indexOf(name);
  if (idx >= 0) sectionHits.push({ name, idx });
}
sectionHits.sort((a, b) => a.idx - b.idx);
console.log("sections found", sectionHits.length);
console.log(sectionHits.map((s) => s.name));

// Find leetcode slugs with position
const slugPositions = [];
const re = /leetcode\.com\/problems\/([a-z0-9-]+)/g;
let m;
while ((m = re.exec(allText))) {
  slugPositions.push({ slug: m[1], pos: m.index });
}
console.log("slug positions", slugPositions.length);

// Dedupe preserving order
const seen = new Set();
const ordered = [];
for (const { slug, pos } of slugPositions) {
  if (seen.has(slug)) continue;
  seen.add(slug);
  ordered.push({ slug, pos });
}
console.log("unique ordered", ordered.length);

// Assign section by position
function sectionForPos(pos) {
  let sec = sectionHits[0]?.name ?? "Other";
  for (const s of sectionHits) {
    if (pos >= s.idx) sec = s.name;
    else break;
  }
  return sec;
}

const bySection = {};
for (const item of ordered) {
  const sec = sectionForPos(item.pos);
  bySection[sec] = (bySection[sec] ?? 0) + 1;
}
console.log("by section", bySection);
