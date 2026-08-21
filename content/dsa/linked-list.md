# Linked List

Rewire `.next`. Keep a dummy node when the head might change. Slow/fast for mid and cycles.

```js
// Linked list skeleton
let prev = null, curr = head;
while (curr) {
  const next = curr.next;
  // rewire curr.next
  prev = curr;
  curr = next;
}
```

## Reverse Linked List

Flip pointers — [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/).

```js
// Linked list — reverse
// LC: https://leetcode.com/problems/reverse-linked-list/
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next; // save
    curr.next = prev;       // reverse
    prev = curr;            // advance
    curr = next;
  }
  return prev;
}
```

## Merge Two Sorted Lists

Dummy + tail — [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/).

```js
// Linked list — merge with dummy
// LC: https://leetcode.com/problems/merge-two-sorted-lists/
function mergeTwoLists(l1, l2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
```

## Linked List Cycle

Slow + fast — [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/).

```js
// Linked list — Floyd slow/fast
// LC: https://leetcode.com/problems/linked-list-cycle/
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // met inside a cycle
  }
  return false;
}
```

**More:** [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/), [Remove Nth Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/), [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/).
