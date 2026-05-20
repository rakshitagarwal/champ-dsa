import { LEETCODE_PRELUDE } from "./leetcode-prelude";

/** Shared sandbox helpers injected around instrumented user code. */
export function buildRunnerSandbox(maxSteps: number): string {
  return `
${LEETCODE_PRELUDE}
function __safeClone(v) {
  if (v === null || v === undefined) return v;
  if (typeof v === "number" || typeof v === "boolean" || typeof v === "string") return v;
  if (__isListNode(v)) return { __list: listToArray(v), __listStructured: listToStructured(v) };
  if (__isTreeNode(v)) return { __tree: treeToLevelArray(v), __treeStructured: treeToStructured(v) };
  try { return JSON.parse(JSON.stringify(v)); } catch (e) { return String(v); }
}
var __safe = { clone: __safeClone };
function __buildViz(vars) {
  var linkedLists = {};
  var structuredLists = {};
  var stacks = {};
  var trees = {};
  var structuredTrees = {};
  var graphs = {};
  var heaps = {};
  for (var k in vars) {
    if (!Object.prototype.hasOwnProperty.call(vars, k)) continue;
    if (k.indexOf("__") === 0 || k === "input") continue;
    var v = vars[k];
    if (__isListNode(v)) {
      linkedLists[k] = listToArray(v);
      structuredLists[k] = listToStructured(v);
    } else if (Array.isArray(v) && (k === "stack" || /stack/i.test(k))) {
      stacks[k] = v.slice();
    } else if (__isTreeNode(v)) {
      trees[k] = treeToLevelArray(v);
      structuredTrees[k] = treeToStructured(v);
    } else if (Array.isArray(v) && (k === "heap" || /heap/i.test(k))) {
      heaps[k] = v.slice();
    } else if (Array.isArray(v) && (k === "edges" || k === "edgeList")) {
      var n = vars.n || vars.numNodes || vars.nodes;
      graphs[k] = __buildGraphFromEdges(v, typeof n === "number" ? n : v.length + 1);
    } else if (Array.isArray(v) && v.length && Array.isArray(v[0]) && (k === "graph" || k === "adjList" || k === "adjacency")) {
      var gn = v.length;
      var gnodes = [];
      var gedges = [];
      for (var gi = 0; gi < gn; gi++) {
        gnodes.push({ id: "g" + gi, label: String(gi) });
        var neigh = v[gi];
        if (Array.isArray(neigh)) {
          for (var gj = 0; gj < neigh.length; gj++) {
            gedges.push({ from: "g" + gi, to: "g" + neigh[gj] });
          }
        }
      }
      graphs[k] = { nodes: gnodes, edges: gedges };
    } else if (Array.isArray(v) && v.length && Array.isArray(v[0]) && k === "grid") {
      var rows = v.length, cols = v[0] ? v[0].length : 0;
      var gridNodes = [];
      var gridEdges = [];
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var gid = "g" + r + "_" + c;
          gridNodes.push({ id: gid, label: r + "," + c });
          if (c + 1 < cols) gridEdges.push({ from: gid, to: "g" + r + "_" + (c + 1) });
          if (r + 1 < rows) gridEdges.push({ from: gid, to: "g" + (r + 1) + "_" + c });
        }
      }
      graphs[k] = { nodes: gridNodes, edges: gridEdges };
    } else if (Array.isArray(v) && (k === "list1" || k === "list2" || k === "l1" || k === "l2" || k === "head")) {
      linkedLists[k] = v.slice();
    }
  }
  var has = Object.keys(linkedLists).length || Object.keys(structuredLists).length ||
    Object.keys(stacks).length || Object.keys(trees).length || Object.keys(structuredTrees).length ||
    Object.keys(graphs).length || Object.keys(heaps).length;
  if (!has) return undefined;
  return {
    linkedLists: linkedLists,
    structuredLists: structuredLists,
    stacks: stacks,
    trees: trees,
    structuredTrees: structuredTrees,
    graphs: graphs,
    heaps: heaps
  };
}
function __detectHighlights(vars) {
  var pointerNames = ["i","j","left","right","low","high","mid","start","end"];
  for (var key in vars) {
    if (!Object.prototype.hasOwnProperty.call(vars, key)) continue;
    if (!Array.isArray(vars[key])) continue;
    var indices = [];
    for (var pi = 0; pi < pointerNames.length; pi++) {
      var p = pointerNames[pi];
      if (typeof vars[p] === "number") indices.push(vars[p]);
    }
    return { array: key, indices: indices };
  }
  return undefined;
}
function __cloneArgs(a) {
  if (!a || typeof a !== "object") return a;
  var out = {};
  for (var k in a) {
    if (Object.prototype.hasOwnProperty.call(a, k)) out[k] = __safeClone(a[k]);
  }
  return out;
}
function __snapshotStack() {
  return __callStack.map(function (f) {
    return {
      id: f.id,
      name: f.name,
      line: f.line,
      args: f.args,
      returnValue: f.returnValue,
      status: f.status
    };
  });
}
function __printResult(r) {
  if (r === undefined) return;
  if (__isListNode(r)) {
    console.log(JSON.stringify(listToArray(r)));
    return;
  }
  if (__isTreeNode(r)) {
    console.log(JSON.stringify(treeToLevelArray(r)));
    return;
  }
  if (typeof r === "object" && r !== null) {
    console.log(JSON.stringify(r));
    return;
  }
  console.log(r);
}
function __trace(evt) {
  if (__step >= ${maxSteps}) throw new Error("Max steps exceeded");
  var vars = {};
  for (var k in evt.variables) {
    if (Object.prototype.hasOwnProperty.call(evt.variables, k)) {
      vars[k] = evt.variables[k];
    }
  }
  var hi = __detectHighlights(vars);
  var viz = __buildViz(vars);
  var frameId;
  if (evt.type === "enter") {
    frameId = ++__frameSeq;
    __callStack.push({
      id: frameId,
      name: evt.name || "fn",
      line: evt.line,
      args: __cloneArgs(evt.args),
      status: "active"
    });
  }
  if (evt.type === "return" && __callStack.length) {
    var top = __callStack[__callStack.length - 1];
    top.returnValue = __safeClone(evt.returnValue);
    top.status = "returned";
  }
  var stackSnap = __snapshotStack();
  var ev = {
    step: __step++,
    line: evt.line,
    type: evt.type,
    variables: vars,
    callStack: stackSnap,
    highlights: hi,
    frameName: evt.name,
    frameId: frameId,
    returnValue: evt.type === "return" ? __safeClone(evt.returnValue) : undefined
  };
  if (viz) ev.viz = viz;
  __events.push(ev);
  if (evt.type === "exit" || evt.type === "return") {
    if (__callStack.length) __callStack.pop();
  }
}
var __events = [];
var __step = 0;
var __callStack = [];
var __frameSeq = 0;
`;
}
