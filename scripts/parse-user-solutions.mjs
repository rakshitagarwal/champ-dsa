/** Parse scripts/user-solutions.json (multiline solution strings, not strict JSON). */
import fs from "fs";

function findSolutionStringEnd(text, solStart) {
  const re = /"\r?\n\s*\},?/g;
  re.lastIndex = solStart;
  const m = re.exec(text);
  return m ? m.index : -1;
}

export function parseUserSolutionsFile(path = "scripts/user-solutions.json") {
  const text = fs.readFileSync(path, "utf8");
  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr)) {
      return arr
        .filter((row) => String(row?.solution ?? "").trim())
        .map((row) => ({
          questionNumber: String(row.questionNumber),
          solution: String(row.solution).trim(),
        }));
    }
  } catch {
    /* legacy multiline format */
  }
  const entries = [];
  const numRe = /"questionNumber":\s*"(\d+)"/g;
  let m;
  while ((m = numRe.exec(text))) {
    const num = m[1];
    const solKey = text.indexOf('"solution":', m.index);
    if (solKey === -1) continue;
    const solStart = text.indexOf('"', solKey + 11) + 1;
    const solEnd = findSolutionStringEnd(text, solStart);
    if (solEnd === -1) continue;
    const solution = text.slice(solStart, solEnd);
    if (solution.trim()) entries.push({ questionNumber: num, solution: solution.trim() });
  }
  return entries;
}
