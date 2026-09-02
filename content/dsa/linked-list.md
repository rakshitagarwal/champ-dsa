# Linked List

**Definition:** Linked list nodes ki chain hai — har node me value aur `next` (kabhi `random`) pointer hota hai jo agle node ko point karta hai. Random access nahi — i-th tak pahuchne ke liye i steps chalna padta hai. Fayda: pointer hai to `O(1)` me jod/tod sakte ho.

**When to use:** Pointer reverse karna, cycle detect, middle dhoondhna, sorted lists merge, ya end se N-th hatana — sab `O(1)` extra space me `next` rewiring se.

**How it works:** Tricks: (1) **Dummy node** `dummy.next = head` jab head badal sakta ho; (2) **Fast/slow** — fast 2 kadam, slow 1 — middle/cycle ke liye; (3) **`n` ka gap** do pointers me end se N-th ke liye. Time `O(n)`, space `O(1)`.

```js
// Linked list skeleton — traverse and rewire
// Hinglish: next save karo, fir wire badlo
let prev = null, curr = head;
while (curr) {
  const next = curr.next; // save
  // curr.next = prev;    // rewire (e.g. reverse)
  prev = curr;
  curr = next;
}

// Dummy skeleton (head badal sakta hai)
// Hinglish: dummy se head change safe
const dummy = { val: 0, next: head };
let tail = dummy;
// ... tail.next = ...
// return dummy.next;

// Fast / slow skeleton (middle / cycle)
// Hinglish: fast double, slow single
let slow = head, fast = head;
while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
```
## Reverse Linked List

Save next, point curr at prev, slide everyone forward. New head is the last `prev`.

[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

```js
// Hinglish: pointer rewiring — ek-ek step comment dekho
// Linked list — reverse
// LC: https://leetcode.com/problems/reverse-linked-list/
function reverseList(head) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: pointer rewiring — ek-ek step comment dekho
// Linked list — merge with dummy
// LC: https://leetcode.com/problems/merge-two-sorted-lists/
function mergeTwoLists(l1, l2) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: pointer rewiring — ek-ek step comment dekho
// Linked list — Floyd, then find entrance
// LC: https://leetcode.com/problems/linked-list-cycle-ii/
function detectCycle(head) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: pointer rewiring — ek-ek step comment dekho
// Linked list — gap of n
// LC: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
function removeNthFromEnd(head, n) {
  // Hinglish: step 1 — base case check karo
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
// Hinglish: pointer rewiring — ek-ek step comment dekho
// Linked list — copy with a map
// LC: https://leetcode.com/problems/copy-list-with-random-pointer/
function copyRandomList(head) {
  // Hinglish: step 1 — base case check karo
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
