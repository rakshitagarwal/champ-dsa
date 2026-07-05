# Fast & Slow Pointers

Two pointers traverse a linked list at different speeds — the fast pointer moves two steps at a time while the slow moves one — to detect cycles and find middle nodes.

## When to use
- Detecting cycles in linked lists or arrays
- Finding the middle of a linked list
- Checking if a linked list is a palindrome

## How it works

Initialize `slow` and `fast` pointers at the head. Move `slow` by one step and `fast` by two steps. If they meet, a cycle exists. To find the cycle start, reset one pointer to head and advance both one step until they meet again.

```js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

## Practice problems
- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) — Direct cycle detection
- [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) — Treat array indices as linked list nodes to detect cycle
- [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) — When fast reaches end, slow is at the middle
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) — Find middle, reverse second half, compare
