/** Injected before user code on every run (LeetCode-compatible helpers). */
export const LEETCODE_PRELUDE = `
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
function arrayToList(arr) {
  if (!arr || !arr.length) return null;
  var head = new ListNode(arr[0]);
  var cur = head;
  for (var i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}
function listToArray(head) {
  var out = [];
  while (head) {
    out.push(head.val);
    head = head.next;
  }
  return out;
}
function __isListNode(v) {
  return v && typeof v === "object" && "val" in v && "next" in v;
}
function __isTreeNode(v) {
  return v && typeof v === "object" && "val" in v && ("left" in v || "right" in v);
}
function treeToLevelArray(root) {
  if (!root) return [];
  var out = [];
  var q = [root];
  while (q.length) {
    var n = q.shift();
    if (!n) { out.push(null); continue; }
    out.push(n.val);
    q.push(n.left || null);
    q.push(n.right || null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
var __nodeIdSeq = 0;
var __listNodeIds = typeof WeakMap !== "undefined" ? new WeakMap() : null;
var __treeNodeIds = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function __listNodeId(node) {
  if (!node) return null;
  if (__listNodeIds) {
    if (__listNodeIds.has(node)) return __listNodeIds.get(node);
    var id = "ln" + (++__nodeIdSeq);
    __listNodeIds.set(node, id);
    return id;
  }
  return "ln" + (++__nodeIdSeq);
}
function __treeNodeId(node) {
  if (!node) return null;
  if (__treeNodeIds) {
    if (__treeNodeIds.has(node)) return __treeNodeIds.get(node);
    var tid = "tn" + (++__nodeIdSeq);
    __treeNodeIds.set(node, tid);
    return tid;
  }
  return "tn" + (++__nodeIdSeq);
}
function listToStructured(head) {
  var nodes = [];
  var seen = {};
  var cur = head;
  var rootId = __listNodeId(head);
  while (cur && !seen[__listNodeId(cur)]) {
    var id = __listNodeId(cur);
    seen[id] = true;
    nodes.push({
      id: id,
      val: cur.val,
      nextId: cur.next ? __listNodeId(cur.next) : null
    });
    cur = cur.next;
  }
  return { nodes: nodes, rootId: rootId };
}
function treeToStructured(root) {
  if (!root) return { nodes: [], rootId: null };
  var nodes = [];
  var q = [{ n: root, id: __treeNodeId(root) }];
  var seen = {};
  var rootId = __treeNodeId(root);
  while (q.length) {
    var item = q.shift();
    var n = item.n;
    var id = item.id;
    if (!n || seen[id]) continue;
    seen[id] = true;
    var leftId = n.left ? __treeNodeId(n.left) : null;
    var rightId = n.right ? __treeNodeId(n.right) : null;
    nodes.push({ id: id, val: n.val, leftId: leftId, rightId: rightId });
    if (n.left) q.push({ n: n.left, id: leftId });
    if (n.right) q.push({ n: n.right, id: rightId });
  }
  return { nodes: nodes, rootId: rootId };
}
function __buildGraphFromEdges(edges, n) {
  var nodes = [];
  var edgeList = [];
  var nodeSet = {};
  for (var i = 0; i < (n || 0); i++) {
    var nid = "g" + i;
    nodeSet[i] = nid;
    nodes.push({ id: nid, label: String(i) });
  }
  if (edges && edges.length) {
    for (var ei = 0; ei < edges.length; ei++) {
      var e = edges[ei];
      if (!e || e.length < 2) continue;
      var a = e[0], b = e[1];
      if (!(a in nodeSet)) {
        nodeSet[a] = "g" + a;
        nodes.push({ id: nodeSet[a], label: String(a) });
      }
      if (!(b in nodeSet)) {
        nodeSet[b] = "g" + b;
        nodes.push({ id: nodeSet[b], label: String(b) });
      }
      edgeList.push({ from: nodeSet[a], to: nodeSet[b] });
    }
  }
  return { nodes: nodes, edges: edgeList };
}
`;
