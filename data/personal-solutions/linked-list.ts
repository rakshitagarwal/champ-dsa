import type { SolutionGroup } from "@/data/solutions/types";

export const LINKED_LIST_SOLUTIONS: SolutionGroup = {
  id: "linked-list",
  title: "Linked List",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 206,
      lcSlug: "reverse-linked-list",
      title: "Reverse Linked List",
      diff: "Easy",
      body: "Save next, point curr at prev, slide everyone forward. New head is the last `prev`.\n\n[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)\n\n```js\n// Time: O(n) · Space: O(1)\n// Linked list — reverse\nvar reverseList = function(head) {\n  let prev = null;\n\n  while (head) {\n    let nextNode = head.next;\n    head.next = prev;\n    prev = head;\n    head = nextNode;\n  }\n\n  return prev;\n};\n```",
    },
    {
      id: 21,
      lcSlug: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      diff: "Easy",
      body: "Dummy tail. Always take the smaller head. Stick the leftover list on the end.\n\n[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)\n\n```js\n// Time: O(n) · Space: O(1)\n// Linked list — merge with dummy\nvar mergeTwoLists = function(list1, list2) {\n  let dummy = new ListNode(0);\n  let head = dummy;\n\n  while (list1 && list2) {\n    if (list1.val <= list2.val) {\n      dummy.next = list1;\n      list1 = list1.next;\n    } else {\n      dummy.next = list2;\n      list2 = list2.next;\n    }\n    dummy = dummy.next;\n  }\n\n  if (list1 !== null) {\n    dummy.next = list1;\n  } else {\n    dummy.next = list2;\n  }\n\n  return head.next;\n};\n```",
    },
    {
      id: 141,
      lcSlug: "linked-list-cycle",
      title: "Linked List Cycle",
      diff: "Easy",
      body: "Slow 1 kadam, fast 2 kadam — mile to cycle hai. Fast null pe ruke to acyclic hai.\n\n[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar hasCycle = function(head) {\n  if (!head) return false;\n\n  let fast = head;\n  let slow = head;\n\n  while (fast) {\n    if (!fast.next) {\n      return false;\n    } else {\n      fast = fast.next.next;\n      slow = slow.next;\n    }\n    if (fast === slow) return true;\n  }\n\n  return false;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 19,
      lcSlug: "remove-nth-node-from-end-of-list",
      title: "Remove Nth Node From End of List",
      diff: "Medium",
      body: "Dummy, then a gap of n between two pointers. When the front hits the end, the back is right before the node to drop.\n\n[Remove Nth Node From End Of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)\n\n```js\n// Time: O(n) · Space: O(1)\n// Linked list — gap of n\nvar removeNthFromEnd = function(head, n) {\n  let dummy = new ListNode(0);\n  dummy.next = head;\n  let left = dummy;\n  let right = head;\n\n  while (right && n > 0) {\n    right = right.next;\n    n -= 1;\n  }\n\n  while (right) {\n    left = left.next;\n    right = right.next;\n  }\n\n  left.next = left.next.next;\n  return dummy.next;\n};\n```",
    },
    {
      id: 143,
      lcSlug: "reorder-list",
      title: "Reorder List",
      diff: "Medium",
      body: "Middle nikalo, second half reverse karo, dono ko alternate merge karo — teen steps.\n\n[Reorder List](https://leetcode.com/problems/reorder-list/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar reorderList = function(head) {\n  // find mid\n  let slow = head;\n  let fast = head;\n\n  while (fast.next && fast.next.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n\n  // break linked list\n  let curr = slow.next;\n  slow.next = null;\n\n  // reverse second linked list\n  let prev = null;\n  while (curr) {\n    let temp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = temp;\n  }\n\n  // combine lists\n  let h1 = head;\n  let h2 = prev;\n  while (h2) {\n    let temp = h1.next;\n    h1.next = h2;\n    h1 = h2;\n    h2 = temp;\n  }\n};\n```",
    },
    {
      id: 2,
      lcSlug: "add-two-numbers",
      title: "Add Two Numbers",
      diff: "Medium",
      body: "Ulte order me digits — jodte jao carry saath rakho, lambi list khatm ho to zero samjho.\n\n[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)\n\n```js\n// Time: O(max(m,n)) · Space: O(1)\nvar addTwoNumbers = function(l1, l2) {\n  let List = new ListNode(0);\n  let head = List;\n\n  let sum = 0;\n  let carry = 0;\n\n  while (l1 !== null || l2 !== null || sum !== 0) {\n    if (l1 !== null) {\n      sum += l1.val;\n      l1 = l1.next;\n    }\n\n    if (l2 !== null) {\n      sum += l2.val;\n      l2 = l2.next;\n    }\n\n    if (sum >= 10) {\n      carry = 1;\n      sum = sum - 10;\n    }\n\n    head.next = new ListNode(sum);\n    head = head.next;\n    sum = carry;\n    carry = 0;\n  }\n\n  return List.next;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 138,
      lcSlug: "copy-list-with-random-pointer",
      title: "Copy List with Random Pointer",
      diff: "Medium",
      body: "Hash map old→new, ya interweave copy nodes — random pointers fix.\n\n[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)\n\n```js\n// Time: O(n) · Space: O(n)\nvar copyRandomList = function(head) {\n  if (!head) return null;\n  const map = new Map();\n  let cur = head;\n  while (cur) {\n    map.set(cur, new Node(cur.val));\n    cur = cur.next;\n  }\n  cur = head;\n  while (cur) {\n    const copy = map.get(cur);\n    copy.next = cur.next ? map.get(cur.next) : null;\n    copy.random = cur.random ? map.get(cur.random) : null;\n    cur = cur.next;\n  }\n  return map.get(head);\n};\n```",
    },
    {
      id: 25,
      lcSlug: "reverse-nodes-in-k-group",
      title: "Reverse Nodes in k-Group",
      diff: "Hard",
      body: "Groups of k reverse — count check, then prev/curr reverse, reconnect.\n\n[Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)\n\n```js\n// Time: O(n) · Space: O(1)\nvar reverseKGroup = function(head, k) {\n  let node = head, count = 0;\n  while (node && count < k) { node = node.next; count++; }\n  if (count < k) return head;\n\n  let prev = null, curr = head;\n  for (let i = 0; i < k; i++) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  head.next = reverseKGroup(curr, k);\n  return prev;\n};\n```",
    },
      ],
    },
  ],
};
