"use client";

import { useMemo } from "react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";

type TreeNode = {
  name: string;
  line: number;
  children: TreeNode[];
};

export function RecursionTree() {
  const trace = useVisualizerStore((s) => s.trace);
  const stepIndex = useVisualizerStore((s) => s.stepIndex);

  const treeText = useMemo(() => {
    if (!trace) return null;
    const events = trace.events.slice(0, stepIndex + 1);
    const root: TreeNode = { name: "program", line: 0, children: [] };
    const stack: TreeNode[] = [root];

    for (const evt of events) {
      if (evt.type === "enter") {
        const frame = evt.callStack[evt.callStack.length - 1];
        const node: TreeNode = {
          name: frame?.name ?? "fn",
          line: evt.line,
          children: [],
        };
        stack[stack.length - 1].children.push(node);
        stack.push(node);
      } else if (evt.type === "exit" || evt.type === "return") {
        if (stack.length > 1) stack.pop();
      }
    }

    function render(node: TreeNode, prefix = "", isLast = true): string[] {
      if (node.name === "program" && node.children.length === 0) {
        return ["(no recursive calls yet)"];
      }
      if (node.name === "program") {
        return node.children.flatMap((c, i) =>
          render(c, "", i === node.children.length - 1),
        );
      }
      const branch = prefix + (isLast ? "└── " : "├── ");
      const lines = [`${branch}${node.name}()  L${node.line}`];
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      node.children.forEach((child, i) => {
        lines.push(
          ...render(child, childPrefix, i === node.children.length - 1),
        );
      });
      return lines;
    }

    return render(root).join("\n");
  }, [trace, stepIndex]);

  if (!treeText) {
    return (
      <p className="text-sm text-muted-foreground">
        Recursion tree builds as you step through recursive calls.
      </p>
    );
  }

  return (
    <pre className="overflow-auto rounded-md border border-border bg-muted/30 p-3 font-mono text-xs leading-relaxed">
      {treeText}
    </pre>
  );
}
