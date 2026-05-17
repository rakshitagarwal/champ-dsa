import { parse } from "@babel/parser";
import traverse, { type NodePath } from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import type { Node, Statement } from "@babel/types";
import { validateCodeSafety } from "./safety";

function getLine(node: Node): number {
  return node.loc?.start.line ?? 1;
}

function isTraceStatement(node: Statement): boolean {
  if (!t.isExpressionStatement(node)) return false;
  const expr = node.expression;
  return (
    t.isCallExpression(expr) &&
    t.isIdentifier(expr.callee, { name: "__trace" })
  );
}

function functionName(path: NodePath<t.Function>): string {
  if ("id" in path.node && path.node.id && "name" in path.node.id) {
    return path.node.id.name;
  }
  const parent = path.parent;
  if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) {
    return parent.id.name;
  }
  return "anonymous";
}

function collectBindings(path: NodePath, atLine?: number): string[] {
  const line = atLine ?? getLine(path.node);
  const names = new Set<string>();
  for (const [name, binding] of Object.entries(path.scope.getAllBindings())) {
    if (name === "arguments" || name.startsWith("__")) continue;
    const declLine = binding.path.node.loc?.start.line ?? 0;
    if (declLine <= line) names.add(name);
  }
  return [...names].sort();
}

function captureVarsExpr(bindingNames: string[]) {
  if (bindingNames.length === 0) {
    return t.objectExpression([]);
  }
  const props = bindingNames.map((name) =>
    t.objectProperty(
      t.identifier(name),
      t.conditionalExpression(
        t.binaryExpression(
          "!==",
          t.unaryExpression("typeof", t.identifier(name)),
          t.stringLiteral("undefined"),
        ),
        t.callExpression(
          t.memberExpression(t.identifier("__safe"), t.identifier("clone")),
          [t.identifier(name)],
        ),
        t.identifier("undefined"),
      ),
    ),
  );
  return t.objectExpression(props);
}

function captureArgsExpr(path: NodePath<t.Function>) {
  const params: string[] = [];
  for (const param of path.node.params) {
    if (t.isIdentifier(param)) params.push(param.name);
    else if (t.isAssignmentPattern(param) && t.isIdentifier(param.left)) {
      params.push(param.left.name);
    }
  }
  if (params.length === 0) return t.objectExpression([]);
  const props = params.map((name) =>
    t.objectProperty(
      t.identifier(name),
      t.callExpression(
        t.memberExpression(t.identifier("__safe"), t.identifier("clone")),
        [t.identifier(name)],
      ),
    ),
  );
  return t.objectExpression(props);
}

function traceCall(
  line: number,
  type: string,
  bindingNames: string[],
  extra?: Record<string, t.Expression>,
) {
  const props: t.ObjectProperty[] = [
    t.objectProperty(t.identifier("line"), t.numericLiteral(line)),
    t.objectProperty(t.identifier("type"), t.stringLiteral(type)),
    t.objectProperty(
      t.identifier("variables"),
      captureVarsExpr(bindingNames),
    ),
  ];
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      props.push(t.objectProperty(t.identifier(k), v));
    }
  }
  return t.expressionStatement(
    t.callExpression(t.identifier("__trace"), [t.objectExpression(props)]),
  );
}

function wrapStatement(
  stmtPath: NodePath<Statement>,
  bindingNames: string[],
) {
  if (isTraceStatement(stmtPath.node)) return;
  const line = getLine(stmtPath.node);
  stmtPath.insertBefore(traceCall(line, "statement", bindingNames));
}

export type InstrumentResult =
  | { ok: true; code: string; lineMap: Record<number, number> }
  | { ok: false; error: string };

export function instrumentCode(source: string): InstrumentResult {
  const safety = validateCodeSafety(source);
  if (safety) return { ok: false, error: safety };

  let ast;
  try {
    ast = parse(source, { sourceType: "script" });
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Parse error",
    };
  }

  const lineMap: Record<number, number> = {};

  traverse(ast, {
    Function(path) {
      const name = functionName(path);
      const line = getLine(path.node);
      const bindings = collectBindings(path, line);
      const body = path.get("body");
      if (!body.isBlockStatement()) return;

      body.unshiftContainer(
        "body",
        traceCall(line, "enter", bindings, {
          name: t.stringLiteral(name),
          args: captureArgsExpr(path),
        }),
      );

      const exitLine = path.node.body.loc?.end.line ?? line;
      body.pushContainer(
        "body",
        traceCall(exitLine, "exit", bindings, {
          name: t.stringLiteral(name),
        }),
      );
    },
    ReturnStatement(path) {
      if (isTraceStatement(path.node)) return;
      const line = getLine(path.node);
      const bindings = collectBindings(path.getFunctionParent() ?? path);
      const arg = path.node.argument;
      const returnValue = arg
        ? t.callExpression(
            t.memberExpression(t.identifier("__safe"), t.identifier("clone")),
            [arg],
          )
        : t.identifier("undefined");
      path.insertBefore(
        traceCall(line, "return", bindings, { returnValue }),
      );
    },
    "ForStatement|WhileStatement|DoWhileStatement|ForOfStatement|ForInStatement"(
      path,
    ) {
      wrapStatement(path as NodePath<Statement>, collectBindings(path));
    },
    IfStatement(path) {
      wrapStatement(path as NodePath<Statement>, collectBindings(path));
    },
    VariableDeclaration(path) {
      if (
        path.parentPath?.isProgram() ||
        path.parentPath?.isBlockStatement()
      ) {
        const line = getLine(path.node);
        const bindings = collectBindings(path);
        path.insertAfter(traceCall(line, "statement", bindings));
      }
    },
    ExpressionStatement(path) {
      if (
        path.parentPath?.isProgram() ||
        path.parentPath?.isBlockStatement()
      ) {
        wrapStatement(path, collectBindings(path));
      }
    },
  });

  const { code: full } = generate(ast, { retainLines: true });

  source.split("\n").forEach((_, i) => {
    lineMap[i + 1] = i + 1;
  });

  return { ok: true, code: full, lineMap };
}
