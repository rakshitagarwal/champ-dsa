/** Sync data/dsa-sheet/practice-map.json from practice/*.mjs sources. */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PRACTICE_P0_TO_P4 } from "../data/dsa-sheet/practice/p0-p4.mjs";
import { PRACTICE_P5_TO_P9 } from "../data/dsa-sheet/practice/p5-p9.mjs";
import { PRACTICE_P10_TO_P13 } from "../data/dsa-sheet/practice/p10-p13.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const all = {
  ...PRACTICE_P0_TO_P4,
  ...PRACTICE_P5_TO_P9,
  ...PRACTICE_P10_TO_P13,
};

const out = path.join(root, "data/dsa-sheet/practice-map.json");
writeFileSync(out, JSON.stringify(all, null, 2) + "\n");

let notes = 0;
let questionCats = 0;
let links = 0;
for (const entry of Object.values(all)) {
  if (entry.kind === "notes") notes++;
  else {
    questionCats++;
    links += entry.questions?.length ?? 0;
  }
}

console.log(
  `Wrote ${out} (${Object.keys(all).length} entries: ${questionCats} categories / ${links} links, ${notes} notes)`,
);
