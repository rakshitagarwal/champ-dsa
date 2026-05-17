import fs from "fs";
import path from "path";

const root = path.join(import.meta.dirname, "..");
const targets = [
  "components/bank/pattern-concept-view.tsx",
  "app/js-notes/page.tsx",
];

for (const rel of targets) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, "utf8");
  if (c.includes("framer-motion")) continue;
  c = c.replace(/<motion\.div/g, "<motion.div");
  c = c.replace(/<\/motion\.motion.div>/g, "</motion.div>");
  c = c.replace(/<motion\.div/g, "<div");
  c = c.replace(/<\/motion\.div>/g, "</motion.div>");
  fs.writeFileSync(p, c);
}
