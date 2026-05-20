import fs from "fs";
import path from "path";

const sheetPath = path.join(process.cwd(), "data/questions/sheet-questions.ts");
const raw = fs.readFileSync(sheetPath, "utf8");

/** @type {{ id: string, num: number, param: string, match: string }[]} */
const hits = [];

const blockRe = /"id": "([^"]+)"[\s\S]*?"sheetNumber": (\d+)[\s\S]*?"solutionCode": "((?:\\.|[^"\\])*)"/g;
let m;
while ((m = blockRe.exec(raw))) {
  const id = m[1];
  const num = Number(m[2]);
  const code = m[3].replace(/\\n/g, "\n").replace(/\\"/g, '"');
  const fn = code.match(/function\s*\(([^)]*)\)/);
  if (!fn) continue;
  const params = fn[1]
    .split(",")
    .map((p) => p.trim().split("=")[0].trim())
    .filter(Boolean);
  for (const p of params) {
    const re = new RegExp(`\\b(const|let)\\s+(${p})\\s*=\\s*\\2\\b`);
    const hit = code.match(re);
    if (hit) hits.push({ id, num, param: p, match: hit[0] });
  }
}

console.log(JSON.stringify(hits, null, 2));
console.error("total", hits.length);
