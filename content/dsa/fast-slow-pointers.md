# Fast & Slow Pointers

The fast and slow pointers pattern (also called Floyd's Tortoise and Hare) uses two pointers that traverse a linked list at different speeds — the "fast" pointer moves two steps at a time while the "slow" pointer moves one step at a time. This speed differential creates a relative motion that reveals structural properties of the list, most famously whether it contains a cycle. If a cycle exists, the fast pointer will eventually lap the slow pointer inside the loop, exactly like a faster runner overtaking a slower runner on a circular track.

What makes this pattern elegant is that it requires only O(1) extra memory and runs in linear time. Beyond cycle detection, the same pointer-speed trick can locate the middle of a list (when fast reaches the end, slow is at the midpoint), determine whether a linked list is a palindrome (find the middle, reverse the second half, and compare), or even find the duplicate number in an array when the array is interpreted as a linked list through its index-value mapping. The key insight is that the distance between the two pointers changes predictably with each step, and at the moment they meet inside a cycle, a simple mathematical relationship pinpoints the cycle's entry point.

## When to use

- Detecting cycles in linked lists or in array-index interpretations of a linked list
- Finding the middle node of a linked list in a single pass
- Checking if a linked list is a palindrome (find middle, reverse tail, compare halves)
- Finding the start of a cycle (the node where the cycle originates)
- Determining the length of a cycle in a linked list
- Identifying duplicate numbers in an array where values are in the range `[1, n]` and the array acts as a functional graph

## How it works

### Core concept

Imagine two runners on a circular track. The faster runner will eventually lap the slower one from behind. In a linked list, the "track" is the sequence of `next` pointers. If there is no cycle, the fast pointer reaches the end (null) before the slow pointer, and you know the list is acyclic. If there is a cycle, the fast pointer enters the loop first and starts circling; when the slow pointer finally enters the loop, the fast pointer is already inside, and the distance between them shrinks by one every step until they meet.

The mathematics behind cycle-start detection is subtle but critical. Suppose the distance from the head to the cycle start is `d`, and the slow pointer has travelled `d + k` steps when the two meet inside the cycle (where `k` is the distance from the cycle start to the meeting point). The fast pointer has travelled `2(d + k) = d + k + mC` for some integer `m` (number of full cycles lapped). Rearranging gives `d + k = mC`, meaning `d = mC - k`. If you reset one pointer to the head and advance both one step at a time, they will meet exactly at the cycle start after `d` steps. This derivation is the heart of Floyd's algorithm.

### Step-by-step approach

1. **Initialise both pointers at the head.** Set `slow = head` and `fast = head`. They will both start from the same node.
2. **Advance the pointers.** Move `slow` by one step (`slow = slow.next`) and `fast` by two steps (`fast = fast.next.next`). Stop if `fast` reaches `null` (no cycle) or if `slow === fast` (cycle detected).
3. **Locate the cycle start (optional).** If a cycle was found, reset `slow` (or `fast`) to `head`. Then advance both pointers one step at a time. The node where they meet again is the cycle's entry point.
4. **Find the middle (variation).** To find the middle of a list, move `slow` one step and `fast` two steps. When `fast` reaches the end, `slow` will be at the middle.

### Complexity

- **Time:** O(n) — each pointer traverses at most `n` nodes before termination
- **Space:** O(1) — only two pointer variables, no auxiliary data structures

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

function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
}

function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
```

## Variations

- **Cycle length detection:** After finding the meeting point, keep the slow pointer stationary and advance the fast pointer one step at a time, counting steps until they meet again. The count equals the cycle length.
- **Palindrome linked list:** Use the middle-node technique to find the halfway point, reverse the second half in-place, then compare the first and reversed second halves node by node.
- **Happy number detection:** Interpret the "next" operation as summing the squares of digits. Use fast-slow pointers to detect if the sequence enters a cycle (which means the number is not happy).
- **Find the duplicate number:** Treat the array as a functional graph where `i` points to `nums[i]`. Since values are in `[1, n]` and there are `n+1` elements, a cycle must exist. Use fast-slow pointers to find the cycle entry, which is the duplicate.

## Edge cases

- **Empty list:** Return `false` or `null` immediately — the head is `null`, so both pointers are `null`.
- **Single node with no cycle:** The fast pointer cannot take the second step (`fast.next` is `null`), so the loop terminates with `false`.
- **Single node with self-loop:** If `head.next === head`, the fast pointer stays on the same node and will meet the slow pointer on the second iteration. Works correctly.
- **Full cycle (tail connects to head):** Both pointers enter the cycle immediately. The algorithm still works — they meet after a few iterations of lapping.
- **List with an even number of nodes:** When finding the middle, there are two valid middle nodes. Usually, the algorithm returns the second middle (the slow pointer ends up at the `(n/2)+1`-th node). Adjust by checking `fast.next` vs `fast.next.next` if the first middle is needed.

## Practice problems

- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) — Direct cycle detection with fast-slow pointers
- [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) — Find the exact node where the cycle begins
- [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) — Treat array indices as linked-list nodes to detect the duplicate via cycle detection
- [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) — When fast reaches the end, slow is at the middle
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) — Find the middle, reverse the second half, and compare halves
- [Happy Number](https://leetcode.com/problems/happy-number/) — Use fast-slow pointers to detect the unhappy cycle in digit-square sums
