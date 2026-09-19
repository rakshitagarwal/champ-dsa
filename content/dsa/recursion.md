# Recursion

**Definition:** Recursion matlab function ka khud ko **chhoti problem** pe call karna. Do hisse farz hain: **base case** (rukna kahan) aur **progress** (har call problem chhoti karti hai). Soch: "pehla kadam main lo, baaki recursion sambhal lega" — *trust the recursion*.

**When to use:** Problem khud-jaisi subproblems me tute (pow, factorial), trees/linked lists naturally recursive hon, ya backtracking/DP ki neev chahiye ho. "Khud ko call" dikhe to recursion socho.

**How it works:** Base check → chhota subproblem banao → uska answer combine karke return. Call stack frames yaad rakhta hai. Deep recursion → stack overflow; kabhi iterative/stack se simulate. Time aksar `branches^depth`, space = recursion depth.

## Study notes

### Mental model
1. **Base case pehle likho** — empty, `n===0`, `node===null`.
2. **Assume** recursive call sahi jawab laati hai (induction).
3. **Combine** — current step + sub-answer.
4. **Guarantee progress** — `n-1`, `i+1`, `node.left` — warna infinite loop.

### Recursion vs iteration
- Recursion: clear for trees/divide-conquer; hidden `O(depth)` stack.
- Iteration: explicit stack/queue; often same idea (DFS with stack = recursion).

### Tail vs tree recursion
- **Linear / tail-ish:** ek recursive call (pow half, list walk).
- **Tree recursion:** do+ calls (fib, tree left+right) — overlapping → socho memo/DP.

### Complexity
- Time: kitni leaves / nodes visit × kaam per call.
- Space: max call-stack depth (balanced tree `O(log n)`, skewed `O(n)`).

### Traps
- Base case missing / wrong.
- Mutating shared array without undo (backtracking need `pop`).
- Returning wrong type (`undefined` leak).
- Negative `n` / empty input.

### Checklist before coding
- Base cases list (null, 0, 1, empty).
- What shrinks each call?
- What do I return upward?
- Need memo? (same args dubara)

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

Naive me n multiplications. Fast power me aadha karo: `x^n = (x^(n/2))^2`, odd ho to ek `x` extra. Negative `n` me `1/pow(x, -n)`.

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

Row `n` pichhli row se banti hai: `0 → 01`, `1 → 10`. Kth symbol ke liye parent dekho — parent `(k+1)/2` hai, agar k even to parent ka flip, odd to same.

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

Dono heads me chhota lo, uska `next` baaki ka merge hai. Base: ek list khatm to doosri pakdao. (Neeche iterative version bhi — same idea.)

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
