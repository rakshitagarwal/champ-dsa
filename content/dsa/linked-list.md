# Linked List

A linked list is a linear data structure where elements (nodes) are stored non-contiguously, each pointing to the next via a pointer. Unlike arrays, linked lists support O(1) insertions and deletions at known positions but lack random access — finding the kth element requires O(k) traversal. The **singly linked list** has nodes with a `next` pointer; the **doubly linked list** adds a `prev` pointer for bidirectional traversal at the cost of extra memory per node.

The power of linked list problems lies in pointer manipulation. By reassigning a few `.next` references you can reverse a list, split it, merge two lists, or detect a cycle — all in O(n) time and O(1) space. Dummy (sentinel) nodes eliminate special-case handling for head operations, and the two-pointer (slow/fast) technique is the go-to for middle-of-list, cycle detection, and nth-from-end problems.

Common operations include traversal (walking until null), insertion (at head, tail, or after a given node), deletion (by value or by pointer), reversal (iterative or recursive), and merging two sorted lists. Many coding-interview problems reduce to mastering these handful of pointer-rewiring patterns — once you can reverse and merge, you can solve most linked-list challenges.

![Linked list reversal — pointer rewiring](/images/dsa/linked-list-reversal.svg)

## When to use

- Reversing a linked list in-place (iterative or recursive) without extra array storage
- Detecting a cycle (tortoise-and-hare) and finding the cycle's starting node
- Merging two sorted linked lists into a single sorted list
- Removing the n-th node from the end of a linked list using slow/fast with a gap of n
- Implementing an LRU cache using a doubly linked list with a hash map for O(1) operations
- Checking whether a linked list is a palindrome (find middle, reverse second half, compare)
- Adding two numbers represented as linked lists (digit-by-digit with carry)
- Flattening a multi-level doubly linked list (DFS traversal rewiring child pointers)
- Reordering a list (e.g., `L0 → Ln → L1 → Ln-1 → ...`) by splitting, reversing, and interleaving
- Rotating a linked list to the right by k positions

## How it works

### Core concept

Every linked-list operation boils down to **pointer reassignment**. A node is just an object with a `next` (and possibly `prev`) field; changing what those fields point to changes the structure of the list. The key insight is that you must always keep a reference to the nodes you need later — if you overwrite a `.next` without saving the old value first, you lose the rest of the list.

**Dummy nodes** (sentinel heads) are a critical simplification technique. By prepending a dummy node that never moves, you avoid writing separate logic for head insertion, head deletion, and empty-list handling. The real head is always `dummy.next` at the end. This is especially useful for problems that modify the head (reverse, merge, remove).

**Two-pointer traversal** is the second pillar. Slow/fast pointers solve mid-point finding, cycle detection, and nth-from-end removal with clean O(n) single-pass code. The invariant: when fast reaches the end, slow is at the desired position.

### Step-by-step approach

1. **Draw the list.** Before writing code, sketch the nodes and arrows. Identify which pointers need to change and in what order.
2. **Set up a dummy node if the head may change.** Create `let dummy = new ListNode(0, head)`. Operate on `dummy` and return `dummy.next`.
3. **Reverse a linked list (iterative):** Use three pointers — `prev` (null), `curr` (head), `next` (curr.next). In a loop, save `next`, point `curr.next` to `prev`, advance `prev` to `curr`, advance `curr` to `next`. Stop when `curr` is null; `prev` is the new head.
4. **Merge two sorted lists:** Use a dummy head, then compare `l1.val` and `l2.val` at each step. Attach the smaller node, advance that pointer. When one list exhausts, attach the remainder of the other.
5. **Remove n-th from end:** Advance `fast` n steps ahead. Then move `slow` (starting at dummy) and `fast` together until `fast.next` is null. `slow.next` now points to the node to skip.
6. **Detect cycle (tortoise-and-hare):** Move `slow` one step, `fast` two steps. If they meet, a cycle exists. To find the cycle start, reset one pointer to head and advance both at the same speed until they meet again.

### Complexity

- **Time:** O(n) — each node is visited a constant number of times per pass. Reversal, merging, nth-from-end, and cycle detection all require a single linear traversal.
- **Space:** O(1) — only a handful of pointer variables are used. Recursive reversal uses O(n) stack space; iterative reversal keeps it O(1).

```js
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

## Variations

- **Doubly linked list:** Each node stores `prev` and `next`. Enables O(1) deletion of a known node and backward traversal, but doubles memory per node. Used in LRU caches and browser history.
- **Circular linked list:** The tail's `next` points back to the head (or any node). Useful for round-robin scheduling, Josephus problem, and queue implementations where traversal wraps around.
- **Skip list:** A multi-level linked list with express lanes for O(log n) search, insertion, and deletion. Combines linked-list simplicity with balanced-tree performance.
- **Recursive reversal:** Reverse the rest of the list, then point `head.next.next = head` and `head.next = null`. Elegant but uses O(n) call-stack space.
- **Dummy head technique:** Use a sentinel node so that operations that modify the head (insert, delete, reverse) don't need special-case null checks. The result is always `dummy.next`.
- **Flatten (child pointers):** A multi-level linked list where nodes have an additional `child` pointer. Solve with DFS stacking the `next` nodes while recursing the child chain.

## Edge cases

- **Empty list (head is null):** Return null immediately for reversal, merging, or removal. The dummy-head pattern handles this gracefully.
- **Single node:** Reversal returns the same node. Cycle detection: slow/fast don't move together — no cycle. Nth-from-end with n=1 removes the only node, leaving null.
- **Cycle in the list:** An infinite loop will occur if traversal doesn't detect cycles. Always consider fast/slow or a visited set when cycles are possible.
- **Two-node list:** Reversal swaps the two nodes. Merging two single-node lists is straightforward. Removal of the second-to-last node should correctly rewire.
- **k larger than list length:** For rotate or nth-from-end problems, normalize k modulo the length. For removal, k may be out of range — handle with an early return.
- **Large list (memory constraints):** Prefer iterative over recursive solutions to avoid stack overflow from deep recursion. O(1) space is often a requirement.
- **Node value equality vs. reference equality:** When deleting nodes by value, decide whether to remove all occurrences or just the first. For palindrome checks, compare values, not references.

## Practice problems

- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) — The foundational iterative reversal using three-pointer technique.
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) — Combine two sorted lists with a dummy head and compare-at-each-step approach.
- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) — Tortoise-and-hare cycle detection with O(1) space.
- [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) — Slow/fast with a gap of n, using a dummy node to handle head removal.
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) — Find middle (slow/fast), reverse second half, then compare halves.
- [LRU Cache](https://leetcode.com/problems/lru-cache/) — Doubly linked list + hash map for O(1) get/put with eviction.
- [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) — Walk two lists digit-by-digit with a carry, building the result list.
- [Reorder List](https://leetcode.com/problems/reorder-list/) — Find middle, reverse second half, then interleave the two halves.
