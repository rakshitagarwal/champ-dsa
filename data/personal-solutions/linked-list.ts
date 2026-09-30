import type { SolutionGroup } from "../solutions/types";

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
          body: `prev → cur → next ka teen-variable dance. Har linked list problem ka building block yahi hai.

[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

\`\`\`js
// Time: O(n) · Space: O(1)
var reverseList = function (head) {
  let prev = null;
  let cur = head;

  while (cur) {
    const next = cur.next; // link todne se pehle bacha lo
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};
\`\`\``,
        },
        {
          id: 21,
          lcSlug: "merge-two-sorted-lists",
          title: "Merge Two Sorted Lists",
          diff: "Easy",
          body: `Dummy node se shuru karo — head ke special case ki tension khatam. Chhota wala uthao, tail aage badhao.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

\`\`\`js
// Time: O(n + m) · Space: O(1)
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 || list2; // bacha hua poora attach

  return dummy.next;
};
\`\`\``,
        },
        {
          id: 141,
          lcSlug: "linked-list-cycle",
          title: "Linked List Cycle",
          diff: "Easy",
          body: `Floyd's slow + fast. Cycle hai to fast slow ko laap maar ke pakad hi lega; nahi hai to fast null pe khatam.

[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

\`\`\`js
// Time: O(n) · Space: O(1)
var hasCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
};
\`\`\``,
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
          body: `fast ko n steps aage bhejo, phir dono saath chalao. fast end pe pahunche to slow delete wale ke theek pehle hoga.

[Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

\`\`\`js
// Time: O(n) · Space: O(1)
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head); // head delete hone ka case cover

  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < n; i++) fast = fast.next;

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return dummy.next;
};
\`\`\``,
        },
        {
          id: 143,
          lcSlug: "reorder-list",
          title: "Reorder List",
          diff: "Medium",
          body: `Teen chhote problems ka combo — beech dhoondho (slow/fast), doosra half reverse karo, phir alternate merge.

[Reorder List](https://leetcode.com/problems/reorder-list/)

\`\`\`js
// Time: O(n) · Space: O(1)
var reorderList = function (head) {
  // 1) middle dhoondho
  let slow = head;
  let fast = head;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2) doosra half reverse karo aur list ko kaat do
  let second = slow.next;
  slow.next = null;

  let prev = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }

  // 3) ek-ek karke merge
  let first = head;
  second = prev;

  while (second) {
    const n1 = first.next;
    const n2 = second.next;

    first.next = second;
    second.next = n1;

    first = n1;
    second = n2;
  }
};
\`\`\``,
        },
        {
          id: 2,
          lcSlug: "add-two-numbers",
          title: "Add Two Numbers",
          diff: "Medium",
          body: `School wala addition — digit jodo, carry aage le jao. Loop tab tak jab tak koi list ya carry bacha hai.

[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

\`\`\`js
// Time: O(max(n, m)) · Space: O(max(n, m))
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;

    carry = Math.floor(sum / 10);

    tail.next = new ListNode(sum % 10);
    tail = tail.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
};
\`\`\``,
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
          body: `Do pass — pehle sab nodes ka clone bana ke map me rakho, phir dusre pass me next aur random wire karo.

[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

\`\`\`js
// Time: O(n) · Space: O(n)
var copyRandomList = function (head) {
  const map = new Map(); // original -> copy

  let cur = head;
  while (cur) {
    map.set(cur, new Node(cur.val));
    cur = cur.next;
  }

  cur = head;
  while (cur) {
    const copy = map.get(cur);
    copy.next = map.get(cur.next) || null;
    copy.random = map.get(cur.random) || null;
    cur = cur.next;
  }

  return map.get(head) || null;
};
\`\`\``,
        },
        {
          id: 25,
          lcSlug: "reverse-nodes-in-k-group",
          title: "Reverse Nodes in k-Group",
          diff: "Hard",
          body: `Har group ke liye pehle k-th node dhoondho (nahi mila to ruk jao), phir us group ko reverse karke dono taraf se dobara jodo.

[Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)

\`\`\`js
// Time: O(n) · Space: O(1)
var reverseKGroup = function (head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    // group ka k-th node dhoondho
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break; // k se kam nodes bache — chhod do

    const groupNext = kth.next;

    // group ko reverse karo, prev groupNext se shuru
    let prev = groupNext;
    let cur = groupPrev.next;

    while (cur !== groupNext) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }

    const newGroupPrev = groupPrev.next; // reverse ke baad yeh tail hai
    groupPrev.next = kth;
    groupPrev = newGroupPrev;
  }

  return dummy.next;
};
\`\`\``,
        },
      ],
    },
  ],
};
