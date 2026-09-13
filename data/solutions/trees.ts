import type { SolutionGroup } from "./types";

export const TREES_SOLUTIONS: SolutionGroup = {
  id: "trees",
  title: "Trees",
  subs: [
    {
      title: "DFS / Recursion",
      topics: [
    {
      id: 104,
      lcSlug: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      diff: "Easy",
      body: `Depth is 1 plus the deeper child. Empty tree is 0.

[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS
// LC: https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root) {
  // Hinglish: step 1 — base case check karo
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\``,
    },
    {
      id: 100,
      lcSlug: "same-tree",
      title: "Same Tree",
      diff: "Easy",
      body: `Dono trees ka structure aur value same hai kya? Dono null to true, ek null to false.

[Same Tree](https://leetcode.com/problems/same-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/same-tree/
function isSameTree(p, q) {
  // Hinglish: dono null to same
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val!==q.val) return false; // Hinglish: value alag to false
  return isSameTree(p.left,q.left) && isSameTree(p.right,q.right); // Hinglish: dono side check
}
\`\`\``,
    },
    {
      id: 226,
      lcSlug: "invert-binary-tree",
      title: "Invert Binary Tree",
      diff: "Easy",
      body: `Har node ke left/right swap karo. Recursion se dono subtree invert.

[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/invert-binary-tree/
function invertTree(root) {
  // Hinglish: null to wapas
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]; // Hinglish: swap
  return root;
}
\`\`\``,
    },
    {
      id: 101,
      lcSlug: "symmetric-tree",
      title: "Symmetric Tree",
      diff: "Easy",
      body: `Mirror check karo — left ka left, right ke right se mile to symmetric hai.

[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

\`\`\`js
// Hinglish: aaina check — ek-ek step comment dekho
// LC: https://leetcode.com/problems/symmetric-tree/
function isSymmetric(root) {
  // Hinglish: step 1 — jodi compare karo
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return same(a.left, b.right) && same(a.right, b.left); // Hinglish: cross compare
  };
  return same(root, root);
}
\`\`\``,
    },
    {
      id: 112,
      lcSlug: "path-sum",
      title: "Path Sum",
      diff: "Easy",
      body: `Root se leaf tak sum ghatate jao — leaf pe zero bache to rasta mil gaya.

[Path Sum](https://leetcode.com/problems/path-sum/)

\`\`\`js
// Hinglish: sum ghatate jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/path-sum/
function hasPathSum(root, targetSum) {
  // Hinglish: step 1 — base case
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum; // Hinglish: leaf pe check
  const rest = targetSum - root.val; // Hinglish: bacha hua
  return hasPathSum(root.left, rest) || hasPathSum(root.right, rest);
}
\`\`\``,
    },
    {
      id: 110,
      lcSlug: "balanced-binary-tree",
      title: "Balanced Binary Tree",
      diff: "Easy",
      body: `Har node ki height nikalo — left-right ka farak 1 se zyada ho to unbalanced. -1 bhejo matlab gadbad.

[Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

\`\`\`js
// Hinglish: height + check ek saath — ek-ek step comment dekho
// LC: https://leetcode.com/problems/balanced-binary-tree/
function isBalanced(root) {
  // Hinglish: step 1 — height nikalo, gadbad pe -1
  const height = (node) => {
    if (!node) return 0;
    const l = height(node.left);
    if (l === -1) return -1;
    const r = height(node.right);
    if (r === -1) return -1;
    if (Math.abs(l - r) > 1) return -1; // Hinglish: farak zyada to gadbad
    return Math.max(l, r) + 1;
  };
  return height(root) !== -1;
}
\`\`\``,
    },
    {
      id: 543,
      lcSlug: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      diff: "Easy",
      body: `Longest path (edges) between any two nodes. At each node I take left height + right height, and I return height to my parent.

[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — height down, diameter across
// LC: https://leetcode.com/problems/diameter-of-binary-tree/
function diameterOfBinaryTree(root) {
  // Hinglish: step 1 — base case check karo
  let best = 0;
  const height = (node) => {
    if (!node) return 0;
    const L = height(node.left);
    const R = height(node.right);
    best = Math.max(best, L + R);
    return 1 + Math.max(L, R);
  };
  height(root);
  return best;
}
\`\`\``,
    },
    {
      id: 124,
      lcSlug: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      diff: "Hard",
      body: `A path can bend at a node (left + node + right). I return to my parent only a one-sided gain (node + best child, or 0 if negative).

[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — gain I can offer my parent vs path that bends here
// LC: https://leetcode.com/problems/binary-tree-maximum-path-sum/
function maxPathSum(root) {
  // Hinglish: step 1 — base case check karo
  let best = -Infinity;
  const gain = (node) => {
    if (!node) return 0;
    const L = Math.max(0, gain(node.left));
    const R = Math.max(0, gain(node.right));
    best = Math.max(best, node.val + L + R);
    return node.val + Math.max(L, R);
  };
  gain(root);
  return best;
}
\`\`\``,
    },
    {
      id: 572,
      lcSlug: "subtree-of-another-tree",
      title: "Subtree of Another Tree",
      diff: "Easy",
      body: `\`s\` me \`t\` jaisa subtree hai kya? Har node ko root maan ke sameTree check.

[Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// LC: https://leetcode.com/problems/subtree-of-another-tree/
function isSubtree(root, subRoot) {
  // Hinglish: same tree helper
  const same=(a,b)=>{
    if(!a&&!b) return true;
    if(!a||!b||a.val!==b.val) return false;
    return same(a.left,b.left) && same(a.right,b.right);
  };
  if (!root) return false;
  if (same(root, subRoot)) return true; // Hinglish: yahan se match?
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot); // Hinglish: left/right me dhoondo
}
\`\`\``,
    },
    {
      id: 617,
      lcSlug: "merge-two-binary-trees",
      title: "Merge Two Binary Trees",
      diff: "Easy",
      body: `Dono ped saath chalao — dono hon to jodo, ek na ho to doosra pakdao.

[Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/)

\`\`\`js
// Hinglish: saath chalao jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/merge-two-binary-trees/
function mergeTrees(t1, t2) {
  // Hinglish: step 1 — base case
  if (!t1) return t2;
  if (!t2) return t1;
  t1.val += t2.val; // Hinglish: jodo
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);
  return t1;
}
\`\`\``,
    },
    {
      id: 814,
      lcSlug: "binary-tree-pruning",
      title: "Binary Tree Pruning",
      diff: "Medium",
      body: `1 wala subtree rakho, bina 1 wala kaato — neeche se check karke upar faisla lo (postorder).

[Binary Tree Pruning](https://leetcode.com/problems/binary-tree-pruning/)

\`\`\`js
// Hinglish: neeche se kaato — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-pruning/
function pruneTree(root) {
  // Hinglish: step 1 — base case
  if (!root) return null;
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);
  if (!root.left && !root.right && root.val === 0) return null; // Hinglish: bekaar patta kaato
  return root;
}
\`\`\``,
    },
    {
      id: 687,
      lcSlug: "longest-univalue-path",
      title: "Longest Univalue Path",
      diff: "Medium",
      body: `Same value ki sabse lambi chain — har node pe left+right jodo, answer global rakho.

[Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/)

\`\`\`js
// Hinglish: same value jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-univalue-path/
function longestUnivaluePath(root) {
  // Hinglish: step 1 — global answer lo
  let best = 0;
  const dfs = (node) => {
    if (!node) return 0;
    const l = dfs(node.left), r = dfs(node.right);
    const left = node.left && node.left.val === node.val ? l + 1 : 0; // Hinglish: left mila?
    const right = node.right && node.right.val === node.val ? r + 1 : 0;
    if (left + right > best) best = left + right; // Hinglish: dono taraf jod ke dekho
    return Math.max(left, right); // Hinglish: upar ek taraf jayega
  };
  dfs(root);
  return best;
}
\`\`\``,
    },
      ],
    },
    {
      title: "BFS / Level Order",
      topics: [
    {
      id: 102,
      lcSlug: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      diff: "Medium",
      body: `Queue. Snapshot length. Those nodes are one level.

[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree BFS — by level
// LC: https://leetcode.com/problems/binary-tree-level-order-traversal/
function levelOrder(root) {
  // Hinglish: step 1 — base case check karo
  if (!root) return [];
  const out = [], queue = [root];
  while (queue.length) {
    const level = [], n = queue.length;
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    out.push(level);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 103,
      lcSlug: "binary-tree-zigzag-level-order-traversal",
      title: "Binary Tree Zigzag Level Order Traversal",
      diff: "Medium",
      body: `Level order jaisa, bas alternate level ulti — flag se direction badlo.

[Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

\`\`\`js
// Hinglish: ek seedha ek ulta — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
function zigzagLevelOrder(root) {
  // Hinglish: step 1 — queue lo
  if (!root) return [];
  const out = [];
  let q = [root], flip = false;
  while (q.length) {
    const level = [];
    const n = q.length;
    const next = [];
    for (let i = 0; i < n; i++) {
      const node = q[i];
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    out.push(flip ? level.reverse() : level); // Hinglish: alternate ulta
    flip = !flip;
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 199,
      lcSlug: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      diff: "Medium",
      body: `Har level ka aakhri node dikhta hai — level order me last wala uthao.

[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

\`\`\`js
// Hinglish: har level ka aakhri — ek-ek step comment dekho
// LC: https://leetcode.com/problems/binary-tree-right-side-view/
function rightSideView(root) {
  // Hinglish: step 1 — queue lo
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const n = q.length;
    const next = [];
    for (let i = 0; i < n; i++) {
      const node = q[i];
      if (i === n - 1) out.push(node.val); // Hinglish: aakhri dikhega
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 515,
      lcSlug: "find-largest-value-in-each-tree-row",
      title: "Find Largest Value in Each Tree Row",
      diff: "Medium",
      body: `Har level ka max nikalo — level order me max track karo.

[Find Largest Value in Each Tree Row](https://leetcode.com/problems/find-largest-value-in-each-tree-row/)

\`\`\`js
// Hinglish: har level ka max — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-largest-value-in-each-tree-row/
function largestValues(root) {
  // Hinglish: step 1 — queue lo
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const n = q.length;
    const next = [];
    let mx = -Infinity;
    for (let i = 0; i < n; i++) {
      const node = q[i];
      if (node.val > mx) mx = node.val; // Hinglish: max yaad rakho
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    out.push(mx);
    q = next;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 116,
      lcSlug: "populating-next-right-pointers-in-each-node",
      title: "Populating Next Right Pointers in Each Node",
      diff: "Medium",
      body: `Perfect tree me left ka next right hai, right ka next parent ke next ka left hai — O(1) space me jodo.

[Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)

\`\`\`js
// Hinglish: next jodte jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
function connect(root) {
  // Hinglish: step 1 — level ke start se chalo
  let level = root;
  while (level && level.left) {
    let cur = level;
    while (cur) {
      cur.left.next = cur.right; // Hinglish: bhai se jodo
      if (cur.next) cur.right.next = cur.next.left; // Hinglish: padosi ke bachche se jodo
      cur = cur.next;
    }
    level = level.left;
  }
  return root;
}
\`\`\``,
    },
    {
      id: 117,
      lcSlug: "populating-next-right-pointers-in-each-node-ii",
      title: "Populating Next Right Pointers in Each Node II",
      diff: "Medium",
      body: `Perfect nahi to dummy se agli level banao — har level pe left-to-right jodte jao.

[Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)

\`\`\`js
// Hinglish: dummy se agli level — ek-ek step comment dekho
// LC: https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/
function connect(root) {
  // Hinglish: step 1 — level head lo
  let head = root;
  while (head) {
    const dummy = { val: 0, next: null };
    let tail = dummy, cur = head;
    while (cur) {
      if (cur.left) { tail.next = cur.left; tail = tail.next; } // Hinglish: jodte jao
      if (cur.right) { tail.next = cur.right; tail = tail.next; }
      cur = cur.next;
    }
    head = dummy.next; // Hinglish: agli level pe jao
  }
  return root;
}
\`\`\``,
    },
    {
      id: 662,
      lcSlug: "maximum-width-of-binary-tree",
      title: "Maximum Width of Binary Tree",
      diff: "Medium",
      body: `Har node ko position number do (heap jaisa: 2*i, 2*i+1) — level ki chaudaai = aakhri minus pehla + 1.

[Maximum Width of Binary Tree](https://leetcode.com/problems/maximum-width-of-binary-tree/)

\`\`\`js
// Hinglish: position number do — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximum-width-of-binary-tree/
function widthOfBinaryTree(root) {
  // Hinglish: step 1 — queue me node+pos rakho
  if (!root) return 0;
  let q = [[root, 0]], best = 1;
  while (q.length) {
    const next = [];
    for (const [node, pos] of q) {
      if (node.left) next.push([node.left, pos * 2]); // Hinglish: left double
      if (node.right) next.push([node.right, pos * 2 + 1]); // Hinglish: right double+1
    }
    if (next.length) {
      const w = next[next.length - 1][1] - next[0][1] + 1;
      if (w > best) best = w; // Hinglish: chaudaai nikalo
    }
    q = next;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 958,
      lcSlug: "check-completeness-of-a-binary-tree",
      title: "Check Completeness of a Binary Tree",
      diff: "Medium",
      body: `Level order me null ke baad koi node aaya to incomplete hai. Null dekho, phir node dikhe to false.

[Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/)

\`\`\`js
// Hinglish: null ke baad node nahi — ek-ek step comment dekho
// LC: https://leetcode.com/problems/check-completeness-of-a-binary-tree/
function isCompleteTree(root) {
  // Hinglish: step 1 — queue lo
  const q = [root];
  let seenNull = false;
  while (q.length) {
    const node = q.shift();
    if (!node) { seenNull = true; continue; } // Hinglish: khaali dekha
    if (seenNull) return false; // Hinglish: khaali ke baad node = adhura
    q.push(node.left); q.push(node.right);
  }
  return true;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Build / Serialize / Views",
      topics: [
    {
      id: 105,
      lcSlug: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      diff: "Medium",
      body: `Preorder ka pehla root hai, inorder me uski position left/right baant-ti hai. Map se O(1) lookup rakho.

[Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

\`\`\`js
// Hinglish: root pakdo, baanto, recurse — ek-ek step comment dekho
// LC: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
function buildTree(preorder, inorder) {
  // Hinglish: step 1 — inorder positions yaad rakho
  const pos = new Map();
  inorder.forEach((v, i) => pos.set(v, i));
  let pre = 0;
  const build = (l, r) => {
    if (l > r) return null;
    const rootVal = preorder[pre++]; // Hinglish: pehla root hai
    const m = pos.get(rootVal); // Hinglish: inorder me baantne ki jagah
    const root = { val: rootVal, left: null, right: null };
    root.left = build(l, m - 1);
    root.right = build(m + 1, r);
    return root;
  };
  return build(0, inorder.length - 1);
}
\`\`\``,
    },
    {
      id: 106,
      lcSlug: "construct-binary-tree-from-inorder-and-postorder-traversal",
      title: "Construct Binary Tree from Inorder and Postorder Traversal",
      diff: "Medium",
      body: `Postorder ka aakhri root hai — inorder me uski jagah left/right baant-ti hai. Peeche se banao.

[Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

\`\`\`js
// Hinglish: peeche se root pakdo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
function buildTree(inorder, postorder) {
  // Hinglish: step 1 — positions yaad rakho
  const pos = new Map();
  inorder.forEach((v, i) => pos.set(v, i));
  let post = postorder.length - 1;
  const build = (l, r) => {
    if (l > r) return null;
    const rootVal = postorder[post--]; // Hinglish: aakhri root hai
    const m = pos.get(rootVal);
    const root = { val: rootVal, left: null, right: null };
    root.right = build(m + 1, r); // Hinglish: pehle right (ulta order)
    root.left = build(l, m - 1);
    return root;
  };
  return build(0, inorder.length - 1);
}
\`\`\``,
    },
    {
      id: 297,
      lcSlug: "serialize-and-deserialize-binary-tree",
      title: "Serialize and Deserialize Binary Tree",
      diff: "Hard",
      body: `Preorder with \`"#"\` for null. Split on commas. Recurse with a queue of tokens — same order I wrote.

[Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — preorder + null marks
// LC: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
function serialize(root) {
  // Hinglish: step 1 — base case check karo
  const out = [];
  const walk = (node) => {
    if (!node) {
      out.push("#");
      return;
    }
    out.push(String(node.val));
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return out.join(",");
}
function deserialize(data) {
  const q = data.split(",");
  const walk = () => {
    const tok = q.shift();
    if (tok === "#") return null;
    const node = { val: Number(tok), left: null, right: null };
    node.left = walk();
    node.right = walk();
    return node;
  };
  return walk();
}
\`\`\``,
    },
    {
      id: 889,
      lcSlug: "construct-binary-tree-from-preorder-and-postorder-traversal",
      title: "Construct Binary Tree from Preorder and Postorder Traversal",
      diff: "Medium",
      body: `Preorder ka pehla root, postorder se left subtree ka size nikalo — wahan se todo.

[Construct Binary Tree from Preorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

\`\`\`js
// Hinglish: left ka size nikalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
function constructFromPrePost(preorder, postorder) {
  // Hinglish: step 1 — post positions yaad rakho
  const pos = new Map();
  postorder.forEach((v, i) => pos.set(v, i));
  const build = (preL, preR, postL, postR) => {
    if (preL > preR) return null;
    const root = { val: preorder[preL], left: null, right: null };
    if (preL === preR) return root;
    const m = pos.get(preorder[preL + 1]); // Hinglish: left child kahan khatm
    const leftSize = m - postL + 1;
    root.left = build(preL + 1, preL + leftSize, postL, m);
    root.right = build(preL + leftSize + 1, preR, m + 1, postR - 1);
    return root;
  };
  return build(0, preorder.length - 1, 0, postorder.length - 1);
}
\`\`\``,
    },
    {
      id: 114,
      lcSlug: "flatten-binary-tree-to-linked-list",
      title: "Flatten Binary Tree to Linked List",
      diff: "Medium",
      body: `Morris jaisa — left ko right banao, purana right sabse neeche jodo. O(1) space me seedha karo.

[Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)

\`\`\`js
// Hinglish: left ko right banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
function flatten(root) {
  // Hinglish: step 1 — traverse karo
  let cur = root;
  while (cur) {
    if (cur.left) {
      let tail = cur.left;
      while (tail.right) tail = tail.right; // Hinglish: left ka aakhri dhoondo
      tail.right = cur.right; // Hinglish: purana right wahan jodo
      cur.right = cur.left; // Hinglish: left ko right banao
      cur.left = null;
    }
    cur = cur.right;
  }
}
\`\`\``,
    },
    {
      id: 236,
      lcSlug: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      diff: "Medium",
      body: `If the node is p or q, return it. Recurse. If both sides return something, I am the LCA. If only one side, pass it up.

[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

\`\`\`js
// Hinglish: DFS/BFS tree — ek-ek step comment dekho
// Tree DFS — first node that sees both
// LC: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
function lowestCommonAncestor(root, p, q) {
  // Hinglish: step 1 — base case check karo
  if (!root || root === p || root === q) return root;
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root;
  return L || R;
}
\`\`\``,
    },
    {
      id: 863,
      lcSlug: "all-nodes-distance-k-in-binary-tree",
      title: "All Nodes Distance K in Binary Tree",
      diff: "Medium",
      body: `Pehle parent map banao (ped ko graph banao), phir target se BFS K steps chalao.

[All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

\`\`\`js
// Hinglish: ped ko graph banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
function distanceK(root, target, k) {
  // Hinglish: step 1 — parent map banao
  const parent = new Map();
  const dfs = (node, par) => {
    if (!node) return;
    parent.set(node, par);
    dfs(node.left, node);
    dfs(node.right, node);
  };
  dfs(root, null);
  const seen = new Set([target]);
  let q = [target];
  for (let d = 0; d < k; d++) {
    const next = [];
    for (const node of q) {
      for (const nb of [node.left, node.right, parent.get(node)]) {
        if (nb && !seen.has(nb)) { seen.add(nb); next.push(nb); } // Hinglish: teen taraf jao
      }
    }
    q = next;
  }
  return q.map((n) => n.val);
}
\`\`\``,
    },
    {
      id: 652,
      lcSlug: "find-duplicate-subtrees",
      title: "Find Duplicate Subtrees",
      diff: "Medium",
      body: `Har subtree ko string banao (val,left,right) — dobara dikhe to duplicate hai. Map me gino.

[Find Duplicate Subtrees](https://leetcode.com/problems/find-duplicate-subtrees/)

\`\`\`js
// Hinglish: ped ko string banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-duplicate-subtrees/
function findDuplicateSubtrees(root) {
  // Hinglish: step 1 — map lo
  const seen = new Map(), out = [];
  const code = (node) => {
    if (!node) return "#"; // Hinglish: khaali ka nishan
    const s = node.val + "," + code(node.left) + "," + code(node.right);
    const c = (seen.get(s) || 0) + 1;
    seen.set(s, c);
    if (c === 2) out.push(node); // Hinglish: doosri baar dikha
    return s;
  };
  code(root);
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};
