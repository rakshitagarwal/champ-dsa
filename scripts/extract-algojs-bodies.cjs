const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "data", "solutions");
const map = {};

for (const f of fs.readdirSync(dir).filter(
  (x) => x.endsWith(".ts") && x !== "types.ts" && x !== "topics.ts",
)) {
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const re =
    /lcSlug:\s*"([^"]+)"[\s\S]*?body:\s*`([\s\S]*?)`,\s*\n\s*\}/g;
  let m;
  while ((m = re.exec(t))) {
    map[m[1]] = m[2];
  }
}

console.log("extracted", Object.keys(map).length);
fs.writeFileSync(
  path.join(__dirname, ".algojs-bodies.json"),
  JSON.stringify(map),
);
