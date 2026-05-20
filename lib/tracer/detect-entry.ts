import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

const PRIORITY_NAMES = [
  "mergeTwoLists",
  "solve",
  "mergeKLists",
  "reverseList",
  "hasCycle",
  "detectCycle",
  "middleNode",
  "removeNthFromEnd",
  "addTwoNumbers",
  "reverseKGroup",
  "maxDepth",
  "invertTree",
  "levelOrder",
  "lowestCommonAncestor",
  "twoSum",
  "threeSum",
];

/** Top-level function name to invoke when running user code. */
export function detectEntryFunction(
  code: string,
  preferred?: string | null,
): string {
  const found = new Set<string>();

  try {
    const ast = parse(code, {
      sourceType: "script",
      plugins: ["typescript"],
      errorRecovery: true,
    });

    traverse(ast, {
      FunctionDeclaration(path) {
        if (path.node.id?.name) found.add(path.node.id.name);
      },
      VariableDeclarator(path) {
        if (
          t.isIdentifier(path.node.id) &&
          (t.isFunctionExpression(path.node.init) ||
            t.isArrowFunctionExpression(path.node.init))
        ) {
          found.add(path.node.id.name);
        }
      },
    });
  } catch {
    /* fallback to regex below */
  }

  if (found.size === 0) {
    const re = /function\s+([a-zA-Z_$][\w$]*)\s*\(/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) {
      found.add(m[1]!);
    }
  }

  if (preferred && found.has(preferred)) return preferred;

  for (const name of PRIORITY_NAMES) {
    if (found.has(name)) return name;
  }

  const first = [...found].find((n) => n !== "ListNode" && n !== "TreeNode");
  return first ?? "solve";
}
