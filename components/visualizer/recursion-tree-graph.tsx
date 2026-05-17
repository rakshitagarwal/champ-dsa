"use client";

import { motion } from "framer-motion";
import type { RecursionTreeNode } from "@/lib/viz/recursion-state";
import { cn } from "@/lib/utils";

type Props = {
  root: RecursionTreeNode;
  activeFrameId: number | null;
};

export function RecursionTreeGraph({ root, activeFrameId }: Props) {
  const children = root.name === "program" ? root.children : [root];

  if (children.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Recursion tree builds as you step through recursive calls.
      </p>
    );
  }

  return (
    <motion.div layout className="space-y-0.5 overflow-auto font-mono text-xs">
      {children.map((node, i) => (
        <TreeBranch
          key={node.frameId}
          node={node}
          activeFrameId={activeFrameId}
          prefix=""
          isLast={i === children.length - 1}
        />
      ))}
    </motion.div>
  );
}

function TreeBranch({
  node,
  activeFrameId,
  prefix,
  isLast,
}: {
  node: RecursionTreeNode;
  activeFrameId: number | null;
  prefix: string;
  isLast: boolean;
}) {
  const isActive = node.frameId === activeFrameId;
  const branch = prefix + (isLast ? "└── " : "├── ");
  const childPrefix = prefix + (isLast ? "    " : "│   ");

  return (
    <div>
      <motion.div
        layout
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "inline-flex flex-wrap items-center gap-1 rounded px-1 py-0.5",
          isActive && "bg-primary/20 font-semibold text-primary",
          node.status === "returned" && !isActive && "text-muted-foreground",
        )}
      >
        <span className="text-muted-foreground/70">{branch}</span>
        <span>{node.name}()</span>
        <span className="text-muted-foreground">L{node.line}</span>
        {node.args &&
          Object.entries(node.args).map(([k, v]) => (
            <span key={k} className="text-[10px] text-muted-foreground">
              {k}={String(v)}
            </span>
          ))}
        {node.returnValue !== undefined && (
          <span className="text-emerald-600 dark:text-emerald-400">
            → {String(node.returnValue)}
          </span>
        )}
      </motion.div>
      {node.children.map((child, i) => (
        <TreeBranch
          key={child.frameId}
          node={child}
          activeFrameId={activeFrameId}
          prefix={childPrefix}
          isLast={i === node.children.length - 1}
        />
      ))}
    </div>
  );
}
