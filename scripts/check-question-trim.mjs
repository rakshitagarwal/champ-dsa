import fs from "node:fs";

const cat = fs.readFileSync("data/system-design/catalog.ts", "utf8");
const questions = [];
for (const block of cat.split("},")) {
  if (!block.includes('group: "questions"')) continue;
  const sm = block.match(/slug: "([^"]+)"/);
  if (sm) questions.push(sm[1]);
}

const rows = questions.map((s) => {
  const t = fs.readFileSync(`content/system-design/${s}.md`, "utf8");
  return {
    s,
    n: t.split(/\n/).length,
    lld: /## Low-Level/.test(t),
    ex: /## Extra probes/.test(t),
    phrase: /\*\*Phrase:\*\*/.test(t),
    img: t.includes(`${s}-architecture.svg`),
  };
});
rows.sort((a, b) => b.n - a.n);
for (const r of rows) {
  console.log(
    `${r.s.padEnd(24)}${String(r.n).padStart(4)}${r.lld ? " LLD" : ""}${r.ex ? " EXTRA" : ""}${r.phrase ? "" : " NO_PHRASE"}${r.img ? "" : " NO_IMG"}`,
  );
}
const avg = Math.round(rows.reduce((a, r) => a + r.n, 0) / rows.length);
console.log(`\nmax=${rows[0].n} min=${rows[rows.length - 1].n} avg=${avg}`);
console.log(
  "problems",
  rows.filter((r) => r.n > 140 || r.lld || r.ex || !r.phrase || !r.img).length,
);
