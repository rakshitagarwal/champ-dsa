import fs from "fs";

function fixStackPanel(c) {
  return c
    .replace(
      /              <\/motion\.div>\n              \{frame\.args/s,
      "              </div>\n              {frame.args",
    )
    .replace(
      /<motion\.div className="mt-1\.5 flex flex-wrap gap-1\.5">/g,
      '<motion.div className="mt-1.5 flex flex-wrap gap-1.5">',
    )
    .replace(
      /<motion\.motion.div className="mt-1\.5 flex flex-wrap gap-1\.5">/g,
      '<motion.div className="mt-1.5 flex flex-wrap gap-1.5">',
    );
}

function fixTreeGraph(c) {
  return c.replace(/\n    <\/motion\.motion.div>\n  \);\n\}\n$/, "\n    </div>\n  );\n}\n");
}

function fixToolbar(c) {
  if (c.includes('<div className="flex flex-wrap items-center')) {
    return c.replace(/\n    <\/motion\.motion.div>\n  \);\n\}\n$/, "\n    </div>\n  );\n}\n");
  }
  return c;
}

const stack = fixStackPanel(
  fs.readFileSync("components/visualizer/stack-panel.tsx", "utf8"),
);
fs.writeFileSync(
  "components/visualizer/stack-panel.tsx",
  stack
    .replace(/<motion\.motion.div className="mt-1\.5/g, '<motion.div className="mt-1.5')
    .replace(/<motion\.div className="mt-1\.5 flex flex-wrap gap-1\.5">/g, '<div className="mt-1.5 flex flex-wrap gap-1.5">')
    .replace(/                <\/motion\.motion.div>\n              \)\}/g, "                </div>\n              )}"),
);

let tree = fs.readFileSync("components/visualizer/recursion-tree-graph.tsx", "utf8");
tree = tree.replace(/\n    <\/motion\.div>\n  \);\n\}\n$/, "\n    </div>\n  );\n}\n");
fs.writeFileSync("components/visualizer/recursion-tree-graph.tsx", tree);

let toolbar = fs.readFileSync("components/visualizer/visualizer-toolbar.tsx", "utf8");
toolbar = toolbar.replace(/\n    <\/motion\.div>\n  \);\n\}\n$/, "\n    </motion.div>\n  );\n}\n");
toolbar = toolbar.replace(/\n    <\/motion\.div>\n  \);\n\}\n$/, "\n    </motion.div>\n  );\n}\n");
fs.writeFileSync("components/visualizer/visualizer-toolbar.tsx", toolbar);

console.log("done");
