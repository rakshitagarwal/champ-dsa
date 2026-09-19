const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "content", "dsa");
let fixed = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".md")) continue;
  const fp = path.join(dir, f);
  let text = fs.readFileSync(fp, "utf8");
  const next = text.replace(/```js\r?\n([\s\S]*?)```/g, (full, code, offset) => {
    const before = text.slice(Math.max(0, offset - 350), offset);
    const hasLc = /leetcode\.com\/problems\//i.test(before);
    if (hasLc) return full;
    const lines = code.replace(/\r\n/g, "\n").split("\n");
    if (lines[0] && /^\s*\/\/\s*Time:\s*O/i.test(lines[0])) {
      lines.shift();
      while (lines[0] && lines[0].trim() === "") lines.shift();
      fixed++;
      return "```js\n" + lines.join("\n").replace(/\s+$/, "") + "\n```";
    }
    return full;
  });
  if (next !== text) fs.writeFileSync(fp, next, "utf8");
}
console.log("skeleton time lines removed", fixed);
