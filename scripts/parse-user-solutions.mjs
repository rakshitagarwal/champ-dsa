/** Parse scripts/user-solutions.json (multiline solution strings, not strict JSON). */
import fs from "fs";

export function parseUserSolutionsFile(path = "scripts/user-solutions.json") {
  const text = fs.readFileSync(path, "utf8");
  const entries = [];
  const numRe = /"questionNumber":\s*"(\d+)"/g;
  let m;
  while ((m = numRe.exec(text))) {
    const num = m[1];
    const solKey = text.indexOf('"solution":', m.index);
    if (solKey === -1) continue;
    const solStart = text.indexOf('"', solKey + 11) + 1;
    const solEnd = text.indexOf('"\n  }', solStart);
    if (solEnd === -1) continue;
    const solution = text.slice(solStart, solEnd);
    if (solution.trim()) entries.push({ questionNumber: num, solution: solution.trim() });
  }
  return entries;
}
