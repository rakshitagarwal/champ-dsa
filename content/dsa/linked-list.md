# Linked List

**Definition:** A linked list is a chain of nodes where each node holds a value and a pointer `next` (sometimes `random`) to the next node. No random access — to reach position `i` you walk `i` steps. Strength: `O(1)` splice/insert if you have the pointer.

**When to use:** You must reverse pointers, detect a cycle, find the middle, merge sorted lists, or remove the N-th from the end — all with `O(1)` extra space and by rewiring `next`.

**How it works:** Key tricks: (1) **Dummy node** `dummy.next = head` when the head itself can change; (2) **Fast/slow pointers** — fast moves 2 steps, slow 1 — to find middle/cycle; (3) **Gap of `n`** between two pointers for "Nth from end." Time `O(n)`, space `O(1)`.

```js
// Linked list skeleton — traverse and rewire
let prev = null, curr = head;
while (curr) {
  const next = curr.next; // save
  // curr.next = prev;    // rewire (e.g. reverse)
  prev = curr;
  curr = next;
}

// Dummy skeleton (head may change)
const dummy = { val: 0, next: head };
let tail = dummy;
// ... tail.next = ...
// return dummy.next;

// Fast / slow skeleton (middle / cycle)
let slow = head, fast = head;
while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
```

## Reverse Linked List

Save next, point curr at prev, slide everyone forward. New head is the last `prev`.

[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

```js
// Linked list — reverse
// LC: https://leetcode.com/problems/reverse-linked-list/
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

## Merge Two Sorted Lists

Dummy tail. Always take the smaller head. Stick the leftover list on the end.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

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

## Linked List Cycle II

Fast and slow meet inside the cycle. Put one pointer back at the head. Walk both one step. They meet at the entrance. If fast hits null, no cycle.

[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)

```js
// Linked list — Floyd, then find entrance
// LC: https://leetcode.com/problems/linked-list-cycle-ii/
function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      return p;
    }
  }
  return null;
}
```

## Remove Nth Node From End

Dummy, then a gap of n between two pointers. When the front hits the end, the back is right before the node to drop.

[Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

```js
// Linked list — gap of n
// LC: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let front = dummy, back = dummy;
  for (let i = 0; i < n + 1; i++) front = front.next;
  while (front) {
    front = front.next;
    back = back.next;
  }
  back.next = back.next.next;
  return dummy.next;
}
```

## Copy List with Random Pointer

Map old node → new node. First pass: copy values. Second pass: copy `.next` and `.random` through the map. Easy to remember. (Weaving copies into the list also works, more code.)

[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

```js
// Linked list — copy with a map
// LC: https://leetcode.com/problems/copy-list-with-random-pointer/
function copyRandomList(head) {
  if (!head) return null;
  const map = new Map();
  let curr = head;
  while (curr) {
    map.set(curr, { val: curr.val, next: null, random: null });
    curr = curr.next;
  }
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    copy.next = curr.next ? map.get(curr.next) : null;
    copy.random = curr.random ? map.get(curr.random) : null;
    curr = curr.next;
  }
  return map.get(head);
}
```
