# Linked List

**Definition:** Linked list nodes ki chain hai — har node me value aur `next` (kabhi `random`) pointer hota hai jo agle node ko point karta hai. Random access nahi — i-th tak pahuchne ke liye i steps chalna padta hai. Fayda: pointer hai to `O(1)` me jod/tod sakte ho.

**When to use:** Pointer reverse karna, cycle detect, middle dhoondhna, sorted lists merge, ya end se N-th hatana — sab `O(1)` extra space me `next` rewiring se.

**How it works:** Tricks: (1) **Dummy node** `dummy.next = head` jab head badal sakta ho; (2) **Fast/slow** — fast 2 kadam, slow 1 — middle/cycle ke liye; (3) **`n` ka gap** do pointers me end se N-th ke liye. Time `O(n)`, space `O(1)`.

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
// Iterative reverse — three pointers rewire next links in one pass
// LC: https://leetcode.com/problems/reverse-linked-list/
function reverseList(head) {
  let prev = null, curr = head; // prev = reversed prefix tail
  while (curr) {
    const next = curr.next; // Save rest of original list before breaking link
    curr.next = prev; // Point current node backward
    prev = curr; // Reversed prefix grows by one
    curr = next; // Walk forward in original list
  }
  return prev; // New head is old tail
}
```

## Merge Two Sorted Lists

Dummy tail. Always take the smaller head. Stick the leftover list on the end.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
// Dummy head avoids special-casing the merged list's first node
// LC: https://leetcode.com/problems/merge-two-sorted-lists/
function mergeTwoLists(l1, l2) {
  const dummy = { val: 0, next: null };
  let tail = dummy; // tail builds the output list
  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1; // Attach smaller head
      l1 = l1.next; // Advance that list
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next; // Move output tail forward
  }
  tail.next = l1 || l2; // Append remaining sorted suffix
  return dummy.next;
}
```

## Linked List Cycle II

Fast and slow meet inside the cycle. Put one pointer back at the head. Walk both one step. They meet at the entrance. If fast hits null, no cycle.

[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)

```js
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
// LC: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head }; // Dummy handles deleting the head
  let front = dummy, back = dummy;
  for (let i = 0; i < n + 1; i++) front = front.next; // Create gap of n nodes between pointers
  while (front) {
    front = front.next; // Move both until front hits null
    back = back.next; // back ends at predecessor of target
  }
  back.next = back.next.next; // Skip nth-from-end node
  return dummy.next;
}
```

## Copy List with Random Pointer

Map old node → new node. First pass: copy values. Second pass: copy `.next` and `.random` through the map. Easy to remember. (Weaving copies into the list also works, more code.)

[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

```js
// Two-pass clone: allocate all nodes, then wire next and random via map
// LC: https://leetcode.com/problems/copy-list-with-random-pointer/
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

Fast 2x, slow 1x. Fast khatam to slow middle par.

[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

```js
// Fast/slow — when fast reaches end, slow is at middle (or second middle)
// LC: https://leetcode.com/problems/middle-of-the-linked-list/
function middleNode(head) {
  let slow=head, fast=head;
  while (fast && fast.next) {
    slow=slow.next; // One step per iteration
    fast=fast.next.next; // Two steps — fast hits end twice as fast
  }
  return slow; // Middle node for even length is second of the two middles
}
```

## Palindrome Linked List

Middle dhoondo, second half reverse karo, fir dono half compare karo.

[Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

```js
// O(n) time O(1) space — find mid, reverse second half, compare halves
// LC: https://leetcode.com/problems/palindrome-linked-list/
function isPalindrome(head) {
  let slow=head, fast=head;
  while (fast && fast.next) { slow=slow.next; fast=fast.next.next; } // slow at second half start
  let prev=null, cur=slow;
  while (cur) { const nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; } // Reverse from slow onward
  let p1=head, p2=prev; // p1 first half, p2 reversed second half
  while (p2) { if (p1.val!==p2.val) return false; p1=p1.next; p2=p2.next; } // Mirror compare
  return true;
}
```

## Intersection of Two Linked Lists

Do pointers, end par dusri list pe switch karo. Milenge to intersection.

[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

```js
// LC: https://leetcode.com/problems/intersection-of-two-linked-lists/
function getIntersectionNode(headA, headB) {
  let a=headA, b=headB;
  while (a!==b) {
    a = a ? a.next : headB; // Switch to B when A exhausts
    b = b ? b.next : headA; // Switch to A when B exhausts
  }
  return a; // Both null or both at intersection node
}
```
