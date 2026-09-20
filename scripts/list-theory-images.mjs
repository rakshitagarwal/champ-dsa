import fs from "node:fs";

const cat = fs.readFileSync("data/system-design/catalog.ts", "utf8");
for (const block of cat.split("},")) {
  const slug = block.match(/slug: "([^"]+)"/)?.[1];
  const group = block.match(/group: "([^"]+)"/)?.[1];
  if (!slug || !group || group === "questions") continue;
  const md = `content/system-design/${slug}.md`;
  if (!fs.existsSync(md)) {
    console.log(group.padEnd(14), slug.padEnd(32), "NOFILE");
    continue;
  }
  const text = fs.readFileSync(md, "utf8");
  const imgs = [...text.matchAll(/!\[[^\]]*\]\(\/images\/hld\/([^)]+)\)/g)].map(
    (m) => m[1],
  );
  console.log(
    group.padEnd(14),
    slug.padEnd(32),
    imgs.length ? imgs.join(", ") : "NONE",
  );
}
