# Recursion

**Definition:** Recursion means a function calls itself on a **smaller problem**. Two parts are required: a **base case** (when to stop) and **progress** (each call shrinks the problem). Mindset: take the current step; trust recursion for the rest.

**When to use:** The problem splits into the same shape of subproblems (pow, factorial), trees/linked lists are naturally recursive, or you need a base for backtracking/DP. If the work looks like “call yourself on a smaller piece,” think recursion.

**How it works:** Check base → build a smaller subproblem → combine its answer and return. The call stack stores frames. Too deep → stack overflow; sometimes simulate with an explicit stack. Time is often `branches^depth`; space is recursion depth.

## Study notes

### Mental model
1. **Write the base case first** — empty, `n===0`, `node===null`.
2. **Assume** the recursive call returns the correct answer (induction).
3. **Combine** — current step + sub-answer.
4. **Guarantee progress** — `n-1`, `i+1`, `node.left` — otherwise infinite recursion.

### Recursion vs iteration
- Recursion: clear for trees/divide-and-conquer; hidden `O(depth)` stack.
- Iteration: explicit stack/queue; often the same idea (DFS with a stack = recursion).

### Tail vs tree recursion
- **Linear / tail-ish:** one recursive call (pow half, list walk).
- **Tree recursion:** two or more calls (fib, tree left+right) — overlapping work → consider memo/DP.

### Complexity
- Time: how many leaves/nodes you visit × work per call.
- Space: max call-stack depth (balanced tree `O(log n)`, skewed `O(n)`).

### Traps
- Base case missing / wrong.
- Mutating a shared array without undo (backtracking needs `pop`).
- Returning the wrong type (`undefined` leak).
- Negative `n` / empty input.

### Checklist before coding
- Base cases list (null, 0, 1, empty).
- What shrinks each call?
- What do I return upward?
- Need memo? (same args again)

### Active revision
Can you state base + shrink + combine in one sentence? Would an iterative stack solve the same problem?

```js
// Recursion skeleton — base, smaller problem, combine
function solve(n) {
  if (isBase(n)) return baseVal; // stop
  const smaller = solve(shrink(n)); // trust recursion
  return combine(n, smaller);
}

// Tree recursion skeleton
function dfs(node) {
  if (!node) return base;
  const L = dfs(node.left);
  const R = dfs(node.right);
  return combine(node.val, L, R);
}

// Backtracking-shaped recursion (choose / explore / undo)
function bt(path) {
  if (done(path)) { ans.push([...path]); return; }
  for (const x of choices) {
    path.push(x);      // choose
    bt(path);          // explore
    path.pop();        // undo
  }
}
```

## Pow(x, n)

Naive: `n` multiplications. Fast power halves: `x^n = (x^(n/2))^2`; if `n` is odd, multiply one extra `x`. For negative `n`, return `1/pow(x, -n)`.

[Pow(x, n)](https://leetcode.com/problems/powx-n/)

```js
// Time: O(log n) · Space: O(log n)
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
```

## K-th Symbol in Grammar

Row `n` is built from row `n-1`: `0 → 01`, `1 → 10`. For the k-th symbol, look at the parent at index `ceil(k/2)`. If `k` is odd, same as parent; if even, flipped.

[K-th Symbol in Grammar](https://leetcode.com/problems/k-th-symbol-in-grammar/)

```js
// Time: O(n) · Space: O(n)
function kthGrammar(n, k) {
  if (n === 1) return 0;
  const parent = kthGrammar(n - 1, Math.ceil(k / 2)); // find parent bit in row above
  if (k % 2 === 1) return parent; // odd index — same bit as parent
  return parent ^ 1; // even index — flipped bit from parent
}
```

## Merge Two Sorted Lists (Recursive)

Take the smaller head; its `next` is the merge of the rest. Base: if one list is empty, return the other.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
// Time: O(n) · Space: O(1)
// Recursive idea: smaller head.next = merge(rest)
function mergeTwoLists(a, b) {
  if (!a) return b;
  if (!b) return a;
  if (a.val <= b.val) {
    a.next = mergeTwoLists(a.next, b);
    return a;
  }
  b.next = mergeTwoLists(a, b.next);
  return b;
}
```
