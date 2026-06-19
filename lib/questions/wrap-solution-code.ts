import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export type StarterShell =
  | { kind: "function"; name: string; params: string }
  | { kind: "var"; name: string; params: string };

export function stripLeadingJsDoc(code: string): string {
  return code.replace(/^\s*\/\*\*[\s\S]*?\*\/\s*/, "");
}

export function parseStarterShell(starterCode: string): StarterShell | null {
  const trimmed = starterCode.trim();
  const fnMatch = trimmed.match(/^function\s+(\w+)\s*\(([^)]*)\)\s*\{/);
  if (fnMatch) {
    return { kind: "function", name: fnMatch[1]!, params: fnMatch[2]! };
  }
  const varMatch = trimmed.match(
    /^var\s+(\w+)\s*=\s*function\s*\(([^)]*)\)\s*\{/,
  );
  if (varMatch) {
    return { kind: "var", name: varMatch[1]!, params: varMatch[2]! };
  }
  return null;
}

function blockBodySource(fn: t.Function): string | null {
  if (!t.isBlockStatement(fn.body)) return null;
  if (fn.body.body.length === 0) return "";
  return fn.body.body.map((stmt) => generate(stmt).code).join("\n");
}

/** Extract the main function body from LeetCode-style or solve()-wrapped solution code. */
export function extractSolutionBody(
  solutionCode: string,
  preferredEntry?: string,
): string | null {
  const code = stripLeadingJsDoc(solutionCode.trim());
  if (!code) return null;

  let chosen: { fn: t.Function; priority: number } | null = null;

  const consider = (name: string, fn: t.Function, priority: number) => {
    if (chosen && chosen.priority >= priority) return;
    chosen = { fn, priority };
  };

  try {
    const ast = parse(code, {
      sourceType: "script",
      plugins: ["typescript"],
      errorRecovery: true,
    });

    traverse(ast, {
      FunctionDeclaration(path) {
        const name = path.node.id?.name;
        if (!name) return;
        const priority =
          preferredEntry && name === preferredEntry
            ? 100
            : name === "solve"
              ? 50
              : 10;
        consider(name, path.node, priority);
      },
      VariableDeclarator(path) {
        if (!t.isIdentifier(path.node.id)) return;
        const name = path.node.id.name;
        const init = path.node.init;
        if (
          !init ||
          (!t.isFunctionExpression(init) && !t.isArrowFunctionExpression(init))
        ) {
          return;
        }
        const priority =
          preferredEntry && name === preferredEntry
            ? 100
            : name === "solve"
              ? 50
              : 10;
        consider(name, init, priority);
      },
    });
  } catch {
    return null;
  }

  if (!chosen) return null;
  return blockBodySource(chosen.fn);
}

/** Re-wrap solution logic to match the starter scaffold (same fn name, no JSDoc). */
export function solutionCodeForStarter(
  starterCode: string,
  solutionCode: string,
  preferredEntry?: string,
): string {
  const shell = parseStarterShell(starterCode);
  const body = extractSolutionBody(solutionCode, preferredEntry);
  if (!shell || body === null) return solutionCode;

  if (shell.kind === "function") {
    return `function ${shell.name}(${shell.params}) {\n${body}\n}`;
  }
  return `var ${shell.name} = function (${shell.params}) {\n${body}\n};`;
}
