import fs from "node:fs";

const cat = fs.readFileSync("data/system-design/catalog.ts", "utf8");
const unique = [];
for (const block of cat.split("},")) {
  if (!block.includes('group: "questions"')) continue;
  const sm = block.match(/slug: "([^"]+)"/);
  if (sm) unique.push(sm[1]);
}

let ok = 0;
const fail = [];
for (const slug of unique) {
  const mdPath = `content/system-design/${slug}.md`;
  const svgPath = `public/images/hld/${slug}-architecture.svg`;
  const md = fs.readFileSync(mdPath, "utf8");
  const hasImg = md.includes(`/images/hld/${slug}-architecture.svg`);
  const hasFile = fs.existsSync(svgPath);
  if (hasImg && hasFile) ok++;
  else fail.push({ slug, hasImg, hasFile });
}
console.log("questions", unique.length, "ok", ok);
if (fail.length) console.log("fail", fail);

// spot-check google-docs gold
const gd = fs.readFileSync("content/system-design/google-docs.md", "utf8");
const hldIdx = gd.indexOf("## High-Level Design");
const imgIdx = gd.indexOf("google-docs-architecture.svg");
console.log("google-docs image before ASCII:", imgIdx > hldIdx && imgIdx < gd.indexOf("```", hldIdx + 10));
