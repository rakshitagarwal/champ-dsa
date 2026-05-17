import fs from "fs";

const path = "components/visualizer/viz-workspace.tsx";
let c = fs.readFileSync(path, "utf8");

c = c.replace(
  /\{showRecursion && trace && \([\s\S]*?<RecursionTree \/>[\s\S]*?\)\}/,
  "{trace ? <RecursionPanel /> : null}",
);

const oldBlock = `            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Animation
              </p>
            </div>
            <div className="min-h-0 flex-1">`;

const newBlock = `            <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Animation
            </p>
            <div className="min-h-0 flex-1 overflow-hidden">`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
} else {
  console.warn("animation header block not found");
}

fs.writeFileSync(path, c);
console.log("done");
