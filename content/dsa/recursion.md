# Recursion

**Definition:** Recursion matlab function ka khud ko chhoti problem pe call karna — base case ruke, recursive step kaam baante. Sochne ka tareeka: "pehla kadam main lo, baaki recursion sambhal lega" (trust the recursion). Har recursive function me do hisse farz hain: base case (rukna kahan hai) aur progress (problem chhota ho raha hai ya nahi).

**When to use:** Problem khud jaisi chhoti problems me tute (factorial, power, tree traversal), backtracking/DP ki neev chahiye ho, ya linked list/tree naturally recursive ho. "Khud ko call" dikhe to recursion socho.

**How it works:** Base case check karo, chhota subproblem banao, uska answer use karke bada answer jodo. Call stack yaad rakhta hai kahan wapas aana hai — isliye deep recursion me stack overflow hota hai. Time aksar branches^depth, space recursion depth.

```js
// Recursion skeleton — base case, smaller subproblem, combine
// define base case, smaller subproblem, and how to combine results
function solve(n) {
  if (isBase(n)) return baseVal; // base case — stop Recursion here
  const smaller = solve(n - 1); // delegate to smaller subproblem
  return combine(n, smaller); // combine subproblem result with current work
}

// memo table — each call has its own stack frame
```

## Pow(x, n)

Naive me n multiplications. Fast power me aadha karo: `x^n = (x^(n/2))^2`, odd ho to ek `x` extra. Negative `n` me `1/pow(x, -n)`.

[Pow(x, n)](https://leetcode.com/problems/powx-n/)

```js
// LC: https://leetcode.com/problems/powx-n/
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
// LC: https://leetcode.com/problems/k-th-symbol-in-grammar/
function kthGrammar(n, k) {
  if (n === 1) return 0;
  const parent = kthGrammar(n - 1, Math.ceil(k / 2)); // find parent bit in row above
  if (k % 2 === 1) return parent; // odd index — same bit as parent
  return parent ^ 1; // even index — flipped bit from parent
}
```

## Merge Two Sorted Lists (Recursive)

Dono heads me chhota lo, uska `next` baaki ka merge hai. Base: ek list khatm to doosri pakdao.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
// dummy head; take smaller each step
// Linked list — merge with dummy
// LC: https://leetcode.com/problems/merge-two-sorted-lists/
var mergeTwoLists = function(list1, list2) {
  let dummy = new ListNode(0);
  let head = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      dummy.next = list1;
      list1 = list1.next;
    } else {
      dummy.next = list2;
      list2 = list2.next;
    }
    dummy = dummy.next;
  }

  if (list1 !== null) {
    dummy.next = list1;
  } else {
    dummy.next = list2;
  }

  return head.next;
};
```
