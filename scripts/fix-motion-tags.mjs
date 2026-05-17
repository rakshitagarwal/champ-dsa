import fs from "fs";
import path from "path";

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".tsx")) fix(full);
  }
}

function fix(file) {
  let c = fs.readFileSync(file, "utf8");
  if (!c.includes("motion.div") && !c.includes("</motion.div>")) return;
  const next = c
    .replace(/<motion\.div /g, "<div ")
    .replace(/<motion\.motion.div /g, "<motion.div ")
    .replace(/<\/motion\.div>/g, "</div>");
  if (next !== c) {
    fs.writeFileSync(file, next);
    console.log("fixed", file);
  }
}

["components/home", "components/learn", "components/practice", "app"].forEach(
  (d) => {
    if (fs.existsSync(d)) walk(d);
  },
);
