# Recursion

**Definition:** Recursion matlab function ka khud ko chhoti problem pe call karna — base case ruke, recursive step kaam baante. Sochne ka tareeka: "pehla kadam main lo, baaki recursion sambhal lega" (trust the recursion). Har recursive function me do hisse farz hain: base case (rukna kahan hai) aur progress (problem chhota ho raha hai ya nahi).

**When to use:** Problem khud jaisi chhoti problems me tute (factorial, power, tree traversal), backtracking/DP ki neev chahiye ho, ya linked list/tree naturally recursive ho. "Khud ko call" dikhe to recursion socho.

**How it works:** Base case check karo, chhota subproblem banao, uska answer use karke bada answer jodo. Call stack yaad rakhta hai kahan wapas aana hai — isliye deep recursion me stack overflow hota hai. Time aksar branches^depth, space recursion depth.

```js
// Recursion skeleton — base + chhota + jodo
// Hinglish: ruko kahan, chhota kya, jodo kaise
function solve(n) {
  if (isBase(n)) return baseVal; // Hinglish: rukne ki shart
  const smaller = solve(n - 1); // Hinglish: chhoti problem recursion kare
  return combine(n, smaller); // Hinglish: apna hissa jodo
}

// Hinglish: yaad rakho — har call apna frame rakhta hai (call stack)
```

## Pow(x, n)

Naive me n multiplications. Fast power me aadha karo: `x^n = (x^(n/2))^2`, odd ho to ek `x` extra. Negative `n` me `1/pow(x, -n)`.

[Pow(x, n)](https://leetcode.com/problems/powx-n/)

```js
// Hinglish: recursion — ek-ek step comment dekho
// LC: https://leetcode.com/problems/powx-n/
function myPow(x, n) {
  // Hinglish: step 1 — base case check karo
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n); // Hinglish: negative to ulta
  const half = myPow(x, Math.floor(n / 2)); // Hinglish: aadha recursion kare
  return n % 2 === 0 ? half * half : half * half * x; // Hinglish: jodo
}
```

## K-th Symbol in Grammar

Row `n` pichhli row se banti hai: `0 → 01`, `1 → 10`. Kth symbol ke liye parent dekho — parent `(k+1)/2` hai, agar k even to parent ka flip, odd to same.

[K-th Symbol in Grammar](https://leetcode.com/problems/k-th-symbol-in-grammar/)

```js
// Hinglish: recursion — ek-ek step comment dekho
// LC: https://leetcode.com/problems/k-th-symbol-in-grammar/
function kthGrammar(n, k) {
  // Hinglish: step 1 — base case check karo
  if (n === 1) return 0;
  const parent = kthGrammar(n - 1, Math.ceil(k / 2)); // Hinglish: parent nikalo
  if (k % 2 === 1) return parent; // Hinglish: odd to same
  return parent ^ 1; // Hinglish: even to flip
}
```

## Merge Two Sorted Lists (Recursive)

Dono heads me chhota lo, uska `next` baaki ka merge hai. Base: ek list khatm to doosri pakdao.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
// Hinglish: recursion — ek-ek step comment dekho
// LC: https://leetcode.com/problems/merge-two-sorted-lists/
function mergeTwoLists(l1, l2) {
  // Hinglish: step 1 — base case check karo
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2); // Hinglish: chhota lo, baaki recursion
    return l1;
  }
  l2.next = mergeTwoLists(l1, l2.next);
  return l2;
}
```
