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
`;
