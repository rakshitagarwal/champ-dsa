import { parse } from "@babel/parser";
import traverse, { type Binding, type NodePath } from "@babel/traverse";
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

function traceEventType(node: Statement): string | null {
  if (!isTraceStatement(node)) return null;
  const expr = (node as t.ExpressionStatement).expression;
  if (!t.isCallExpression(expr) || !expr.arguments[0]) return null;
  const arg = expr.arguments[0];
  if (!t.isObjectExpression(arg)) return null;
  for (const prop of arg.properties) {
    if (
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key, { name: "type" }) &&
      t.isStringLiteral(prop.value)
    ) {
      return prop.value.value;
    }
  }
  return null;
}

function blockHasLeadingTrace(
  bodyPath: NodePath<t.BlockStatement>,
  type: string,
): boolean {
  const first = bodyPath.node.body[0];
  return first ? traceEventType(first) === type : false;
}

/** True only inside helpers (arrows, inner functions) declared within the entry function. */
function isInsideNestedFunction(path: NodePath): boolean {
  const fn = path.getFunctionParent();
  if (!fn) return false;
  return !!fn.getFunctionParent();
}

function isInsideTraceCall(path: NodePath): boolean {
  let p: NodePath | null = path.parentPath;
  while (p) {
    if (p.isCallExpression()) {
      const callee = p.node.callee;
      if (t.isIdentifier(callee, { name: "__trace" })) return true;
    }
    p = p.parentPath;
  }
  return false;
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

function bindingDeclLine(binding: Binding): number {
  const p = binding.path;
  if (p.isVariableDeclarator()) {
    return p.node.loc?.start.line ?? 0;
  }
  return p.node.loc?.start.line ?? 0;
}

function positionBefore(
  a: { line: number; column: number },
  b: { line: number; column: number },
): boolean {
  return a.line < b.line || (a.line === b.line && a.column < b.column);
}

/** Avoid capturing let/const before initialization (TDZ). */
function isBindingReadable(
  binding: Binding,
  tracePath: NodePath,
  afterDeclaration = false,
): boolean {
  if (binding.kind === "param" || binding.kind === "module") return true;
  const declLine = bindingDeclLine(binding);
  const traceLine = getLine(tracePath.node);
  if (binding.kind === "var") return declLine <= traceLine;

  const declStart = binding.path.node.loc?.start;
  const traceStart = tracePath.node.loc?.start;
  if (declStart && traceStart) {
    if (positionBefore(declStart, traceStart)) return true;
    if (afterDeclaration && declStart.line === traceStart.line) {
      return declStart.column <= traceStart.column;
    }
    return false;
  }

  if (declLine < traceLine) return true;
  return afterDeclaration && declLine === traceLine;
}

function collectBindings(
  path: NodePath,
  options?: { afterDeclaration?: boolean },
): string[] {
  const names = new Set<string>();
  for (const [name, binding] of Object.entries(path.scope.getAllBindings())) {
    if (name === "arguments" || name.startsWith("__")) continue;
    if (isBindingReadable(binding, path, options?.afterDeclaration)) {
      names.add(name);
    }
  }
  return [...names].sort();
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

function captureVarsExpr(bindingNames: string[]) {
  if (bindingNames.length === 0) return t.objectExpression([]);
  const props = bindingNames.map((name) =>
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
): Statement {
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

function insertTraceBefore(
  stmtPath: NodePath<Statement>,
  line: number,
  type: string,
  bindingNames: string[],
  extra?: Record<string, t.Expression>,
) {
  stmtPath.insertBefore(traceCall(line, type, bindingNames, extra));
}

function wrapStatement(
  stmtPath: NodePath<Statement>,
  bindingNames: string[],
) {
  if (isTraceStatement(stmtPath.node)) return;
  const line = getLine(stmtPath.node);
  insertTraceBefore(stmtPath, line, "statement", bindingNames);
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
      if (isInsideTraceCall(path)) return;
      const enclosing = path.getFunctionParent();
      if (enclosing && enclosing !== path) return;
      const name = functionName(path);
      const line = getLine(path.node);
      const bindings = collectBindings(path);
      const body = path.get("body");
      if (!body.isBlockStatement()) return;

      body.unshiftContainer("body", [
        traceCall(line, "enter", bindings, {
          name: t.stringLiteral(name),
          args: captureArgsExpr(path),
        }),
      ]);

      const exitLine = path.node.body.loc?.end.line ?? line;
      body.pushContainer("body", [
        traceCall(exitLine, "exit", bindings, {
          name: t.stringLiteral(name),
        }),
      ]);
    },
    ReturnStatement(path) {
      if (isInsideNestedFunction(path)) return;
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
      insertTraceBefore(path, line, "return", bindings, { returnValue });
    },
    "ForStatement|WhileStatement|DoWhileStatement"(path) {
      if (isInsideNestedFunction(path)) return;
      if (path.findParent((p) => p.isForStatement() || p.isWhileStatement())) {
        return;
      }
      const line = getLine(path.node);
      insertTraceBefore(
        path as NodePath<Statement>,
        line,
        "loop",
        collectBindings(path),
      );
    },
    IfStatement(path) {
      if (isInsideNestedFunction(path)) return;
      const line = getLine(path.node);
      const bindings = collectBindings(path);
      let hasUpdate = false;
      path.get("test").traverse({
        UpdateExpression(p) {
          hasUpdate = true;
          p.stop();
        },
      });
      if (hasUpdate) return;
      insertTraceBefore(
        path as NodePath<Statement>,
        line,
        "condition",
        bindings,
      );
    },
    VariableDeclaration(path) {
      if (isInsideNestedFunction(path)) return;
      if (
        path.node.declarations.some(
          (d) => t.isIdentifier(d.id) && d.id.name.startsWith("__"),
        )
      ) {
        return;
      }
      if (
        path.parentPath?.isProgram() ||
        path.parentPath?.isBlockStatement()
      ) {
        const line = getLine(path.node);
        const bindings = collectBindings(path, { afterDeclaration: true });
        path.insertAfter([traceCall(line, "statement", bindings)]);
      }
    },
    BlockStatement(path) {
      if (isInsideNestedFunction(path)) return;
      const parent = path.parent;
      if (!t.isIfStatement(parent)) return;
      if (parent.consequent !== path.node && parent.alternate !== path.node) {
        return;
      }
      if (blockHasLeadingTrace(path, "branch")) return;
      const line = getLine(parent);
      path.unshiftContainer(
        "body",
        traceCall(line, "branch", collectBindings(path.parentPath!), {
          branch: t.stringLiteral(
            parent.consequent === path.node ? "then" : "else",
          ),
        }),
      );
    },
    ExpressionStatement(path) {
      if (isInsideNestedFunction(path)) return;
      if (isTraceStatement(path.node)) return;
      if (t.isUpdateExpression(path.node.expression)) return;
      const block = path.parentPath;
      const loopParent = block?.parentPath;
      if (
        loopParent?.isForStatement() ||
        loopParent?.isWhileStatement() ||
        loopParent?.isDoWhileStatement() ||
        loopParent?.isForInStatement() ||
        loopParent?.isForOfStatement()
      ) {
        return;
      }
      if (
        block?.isBlockStatement() &&
        (block.parentPath?.isProgram() ||
          block.parentPath?.isBlockStatement())
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
