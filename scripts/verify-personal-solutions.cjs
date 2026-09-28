const fs = require("fs");
const path = require("path");

require("./gen-personal-solutions.cjs");

const dir = path.join(__dirname, "..", "data", "personal-solutions");
let bad = 0;
let ok = 0;

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts") && x !== "topics.ts")) {
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const bodies = [...t.matchAll(/body: ("(?:\\.|[^"])*")/g)].map((m) =>
    JSON.parse(m[1]),
  );
  for (const b of bodies) {
    if (!b.includes("```js")) {
      console.log("no fence in", f, b.slice(0, 80));
      bad++;
    } else if (!b.includes("leetcode.com/problems/")) {
      console.log("no lc link in", f);
      bad++;
    } else {
      ok++;
    }
  }
}

console.log({ ok, bad });
