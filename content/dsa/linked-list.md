# Linked List

**Definition:** A linked list is a chain of nodes — each holds a value and a `next` pointer (sometimes also `random`) to the next node. No random access: reaching the i-th node takes i steps. Upside: with a pointer you can splice in or out in `O(1)`.

**When to use:** Reverse pointers, detect a cycle, find the middle, merge sorted lists, or delete the N-th from the end — all by rewiring `next` with `O(1)` extra space.

**How it works:** Core tricks: (1) **Dummy node** `dummy.next = head` when the head may change; (2) **Fast/slow** — fast moves 2 steps, slow 1 — for middle/cycle; (3) **Gap of n** between two pointers for N-th from end. Time `O(n)`, space `O(1)`.

## Study notes

- **Dummy** when head may change (delete first, merge).
- **Floyd:** slow/fast meet ⇒ cycle; reset one to head for the entrance.
- **Reverse:** `prev` / `curr` / `next` three pointers.
- **Traps:** lose `next` before rewiring; null checks; off-by-one on nth-from-end.
- **Checklist:** need dummy? cycle possible? modify in place?

### Active revision
Dummy needed? Fast/slow or gap-of-n? Did I save `next` before rewiring?

```js
// Linked list skeleton — traverse and rewire
// next save do, fir wire badlo
let prev = null, curr = head;
while (curr) {
  const next = curr.next; // save
  // curr.next = prev; // rewire (e.g. reverse)
  prev = curr;
  curr = next;
}

// Dummy node skeleton (head may change after operations)
// dummy from head change safe
const dummy = { val: 0, next: head };
let tail = dummy;
// ... tail.next = ...
// return dummy.next;

// Fast / slow skeleton (middle / cycle)
// Floyd: fast 2×, slow 1× per step
let slow = head, fast = head;
while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
```
## Reverse Linked List

Save next, point curr at prev, slide everyone forward. New head is the last `prev`.

[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

```js
// Time: O(n) · Space: O(1)
// prev/curr/next rewires
// Linked list — reverse
var reverseList = function(head) {
  let prev = null;

  while (head) {
    let nextNode = head.next;
    head.next = prev;
    prev = head;
    head = nextNode;
  }

  return prev;
};
```

## Merge Two Sorted Lists

Dummy tail. Always take the smaller head. Stick the leftover list on the end.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
// Time: O(n) · Space: O(1)
// dummy head; take smaller each step
// Linked list — merge with dummy
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

## Linked List Cycle II

Fast and slow meet inside the cycle. Put one pointer back at the head. Walk both one step. They meet at the entrance. If fast hits null, no cycle.

[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)

```js
// Time: O(n) · Space: O(n)
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
// Time: O(n) · Space: O(1)
// Linked list — gap of n
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let left = dummy;
  let right = head;

  while (right && n > 0) {
    right = right.next;
    n -= 1;
  }

  while (right) {
    left = left.next;
    right = right.next;
  }

  left.next = left.next.next;
  return dummy.next;
};
```

## Copy List with Random Pointer

Map old node → new node. First pass: copy values. Second pass: copy `.next` and `.random` through the map. Easy to remember. (Weaving copies into the list also works, more code.)

[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

```js
// Time: O(n) · Space: O(n)
// Two-pass clone: allocate all nodes, then wire next and random via map
function copyRandomList(head) {
  if (!head) return null;
  const map = new Map(); // Original node -> deep copy node
  let curr = head;
  while (curr) {
    map.set(curr, { val: curr.val, next: null, random: null }); // Pass 1: create copies
    curr = curr.next;
  }
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    copy.next = curr.next ? map.get(curr.next) : null; // Pass 2: link next pointers
    copy.random = curr.random ? map.get(curr.random) : null; // Wire random pointers
    curr = curr.next;
  }
  return map.get(head);
}
```

## Middle of the Linked List

Fast moves 2×, slow 1×. When fast ends, slow is at the middle.

[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

```js
// Time: O(n) · Space: O(1)
// slow/fast; slow lands mid
var middleNode = function(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
};
```

## Palindrome Linked List

Find the middle, reverse the second half, then compare both halves.

[Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

```js
// Time: O(n) · Space: O(1)
var isPalindrome = function(head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  fast = head;
  slow = reverse(slow);

  while (slow) {
    if (fast.val !== slow.val) {
      return false;
    }
    slow = slow.next;
    fast = fast.next;
  }

  return true;
};

function reverse(root) {
  let prev = null;

  while (root) {
    let ref = root.next;
    root.next = prev;
    prev = root;
    root = ref;
  }

  return prev;
}
```

## Intersection of Two Linked Lists

Two pointers; when one hits the end, switch to the other list. They meet at the intersection (or both become null).

[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

```js
// Time: O(n) · Space: O(n)
function getIntersectionNode(headA, headB) {
  let a=headA, b=headB;
  while (a!==b) {
    a = a ? a.next : headB; // Switch to B when A exhausts
    b = b ? b.next : headA; // Switch to A when B exhausts
  }
  return a; // Both null or both at intersection node
}
```
