import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const CACHE_DIR = path.join(ROOT, "scripts/.cache/leetcode");
const OUT_JSON = path.join(ROOT, "data/dsa-sheet/questions.json");
const OUT_MANIFEST = path.join(ROOT, "data/dsa-sheet/manifest.ts");

const SECTION_DEFS = [
  { id: "learn-basics", title: "Learn the basics", match: "Learn the basics" },
  {
    id: "sorting",
    title: "Learn Important Sorting Techniques",
    match: "Learn Important Sorting Techniques",
  },
  {
    id: "arrays",
    title: "Solve Problems on Arrays",
    match: "Solve Problems on Arrays",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    match: "Binary Search [1D, 2D Arrays, Search Space]",
  },
  {
    id: "strings",
    title: "Strings",
    match: "Strings [Basic and Medium]",
  },
  {
    id: "linked-list",
    title: "Learn LinkedList",
    match: "Learn LinkedList",
  },
  {
    id: "recursion",
    title: "Recursion",
    match: "Recursion [PatternWise]",
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    match: "Bit Manipulation",
  },
  {
    id: "stack-queue",
    title: "Stack and Queues",
    match: "Stack and Queues",
  },
  {
    id: "sliding-window",
    title: "Sliding Window & Two Pointer",
    match: "Sliding Window",
  },
  { id: "heaps", title: "Heaps", match: "Heaps" },
  { id: "greedy", title: "Greedy Algorithms", match: "Greedy Algorithms" },
  { id: "binary-trees", title: "Binary Trees", match: "Binary Trees" },
  { id: "bst", title: "Binary Search Trees", match: "Binary Search Trees" },
  { id: "graphs", title: "Graphs", match: "Graphs" },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    match: "Dynamic Programming",
  },
  { id: "tries", title: "Tries", match: "Tries" },
];

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function loadLeetcodeMeta(slug) {
  const file = path.join(CACHE_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      title: data.title,
      difficulty: data.difficulty?.toLowerCase(),
    };
  } catch {
    return null;
  }
}

function loadPracticeSlugMap() {
  const sheetPath = path.join(ROOT, "data/questions/sheet-questions.ts");
  const text = fs.readFileSync(sheetPath, "utf8");
  const map = new Map();
  const re =
    /"id":\s*"([^"]+)"[\s\S]*?"leetcodeSlug":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(text))) {
    if (!map.has(m[2])) map.set(m[2], m[1]);
  }
  return map;
}

function sectionIdForPosition(pos, markers) {
  let current = markers[0]?.id ?? "other";
  for (const marker of markers) {
    if (pos >= marker.idx) current = marker.id;
    else break;
  }
  return current;
}

async function main() {
  console.log("Fetching Striver A2Z sheet from takeuforward.org…");
  const html = await fetch(
    "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
  ).then((r) => r.text());

  const payload = html.split('self.__next_f.push([1,"').join("");

  const markers = [];
  for (const def of SECTION_DEFS) {
    const idx = payload.indexOf(def.match);
    if (idx >= 0) markers.push({ ...def, idx });
  }
  markers.sort((a, b) => a.idx - b.idx);
  console.log(`Found ${markers.length} section markers`);

  const slugPositions = [];
  const re = /leetcode\.com\/problems\/([a-z0-9-]+)/g;
  let m;
  while ((m = re.exec(payload))) {
    slugPositions.push({ slug: m[1], pos: m.index });
  }

  const seen = new Set();
  const ordered = [];
  for (const item of slugPositions) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    ordered.push(item);
  }
  console.log(`LeetCode-only problems: ${ordered.length}`);

  const practiceMap = loadPracticeSlugMap();
  const sectionTitleById = Object.fromEntries(
    SECTION_DEFS.map((s) => [s.id, s.title]),
  );

  const questions = ordered.map((item, index) => {
    const sectionId = sectionIdForPosition(item.pos, markers);
    const meta = loadLeetcodeMeta(item.slug);
    const practiceId = practiceMap.get(item.slug);
    return {
      id: `striver-${String(index + 1).padStart(3, "0")}`,
      sheetNumber: index + 1,
      title: meta?.title ?? slugToTitle(item.slug),
      leetcodeSlug: item.slug,
      leetcodeUrl: `https://leetcode.com/problems/${item.slug}/`,
      difficulty: meta?.difficulty ?? undefined,
      sectionId,
      sectionTitle: sectionTitleById[sectionId] ?? sectionId,
      ...(practiceId ? { practiceId } : {}),
    };
  });

  const sections = SECTION_DEFS.map((def) => ({
    id: def.id,
    title: def.title,
    questionIds: questions
      .filter((q) => q.sectionId === def.id)
      .map((q) => q.id),
  })).filter((s) => s.questionIds.length > 0);

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(questions, null, 2) + "\n");

  const manifestTs = `/* Auto-generated by tools/import-striver-sheet/generate.mjs — do not edit by hand */
import type { StriverSectionMeta } from "@/types/dsa-sheet";

export const STRIVER_SECTIONS: StriverSectionMeta[] = ${JSON.stringify(sections, null, 2)};
`;
  fs.writeFileSync(OUT_MANIFEST, manifestTs);

  const withPractice = questions.filter((q) => q.practiceId).length;
  console.log(`Wrote ${questions.length} questions → ${OUT_JSON}`);
  console.log(`Wrote ${sections.length} sections → ${OUT_MANIFEST}`);
  console.log(`ChampDSA practice overlap: ${withPractice}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
