import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

/** Ordered parameter names for the entry function (declaration or var fn = function). */
export function getEntryFunctionParams(
  code: string,
  entryName: string,
): string[] {
  try {
    const ast = parse(code, {
      sourceType: "script",
      plugins: ["typescript"],
      errorRecovery: true,
    });
    let params: string[] | null = null;

    traverse(ast, {
      FunctionDeclaration(path) {
        if (path.node.id?.name === entryName && !params) {
          params = paramNames(path.node.params);
        }
      },
      VariableDeclarator(path) {
        if (
          !params &&
          t.isIdentifier(path.node.id, { name: entryName }) &&
          (t.isFunctionExpression(path.node.init) ||
            t.isArrowFunctionExpression(path.node.init))
        ) {
          params = paramNames(path.node.init.params);
        }
      },
    });

    return params ?? [];
  } catch {
    return [];
  }
}

function paramNames(params: t.Function["params"]): string[] {
  const names: string[] = [];
  for (const p of params) {
    if (t.isIdentifier(p)) names.push(p.name);
    else if (t.isAssignmentPattern(p) && t.isIdentifier(p.left)) {
      names.push(p.left.name);
    }
  }
  return names;
}
