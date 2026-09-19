import type { SolutionGroup } from "./types";

export const LINKED_LIST_SOLUTIONS: SolutionGroup = {
  id: "linked-list",
  title: "Linked List",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=cXxf46pbvOI&ab_channel=AlgoJS",
      body: `Dummy tail. Always take the smaller head. Stick the leftover list on the end.

[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

\`\`\`js
// Linked list — merge with dummy
// LC: https://leetcode.com/problems/merge-two-sorted-lists/
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
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "reverse-linked-list",
      title: "Reverse Linked List",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=PD13c2DCbYQ&ab_channel=AlgoJS",
      body: `Save next, point curr at prev, slide everyone forward. New head is the last \`prev\`.

[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

\`\`\`js
// Linked list — reverse
// LC: https://leetcode.com/problems/reverse-linked-list/
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
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "middle-of-the-linked-list",
      title: "Middle of Linked List",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=hJT189N6lqU&ab_channel=AlgoJS",
      body: `Fast 2x, slow 1x. Fast khatam to slow middle par.

[Middle of Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

\`\`\`js
// LC: https://leetcode.com/problems/middle-of-the-linked-list/
var middleNode = function(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
};
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "palindrome-linked-list",
      title: "Palindrome Linked List",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=vnhRI0gO_Gc&ab_channel=AlgoJS",
      body: `Middle dhoondo, second half reverse karo, fir dono half compare karo.

[Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

\`\`\`js
// LC: https://leetcode.com/problems/palindrome-linked-list/
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
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "linked-list-cycle",
      title: "Linked List Cycle",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=rOuDEYXKmro&t=1s&ab_channel=AlgoJS",
      body: `Slow 1 kadam, fast 2 kadam — mile to cycle hai. Fast null pe ruke to acyclic hai.

[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

\`\`\`js
// LC: https://leetcode.com/problems/linked-list-cycle/
var hasCycle = function(head) {
  if (!head) return false;

  let fast = head;
  let slow = head;

  while (fast) {
    if (!fast.next) {
      return false;
    } else {
      fast = fast.next.next;
      slow = slow.next;
    }
    if (fast === slow) return true;
  }

  return false;
};
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "remove-nth-node-from-end-of-list",
      title: "Remove Nth Node From End Of List",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=2CpZ3M3TN4s&t=89s&ab_channel=AlgoJS",
      body: `Dummy, then a gap of n between two pointers. When the front hits the end, the back is right before the node to drop.

[Remove Nth Node From End Of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

\`\`\`js
// Linked list — gap of n
// LC: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
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
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "swap-nodes-in-pairs",
      title: "Swap Nodes In Pairs",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=CVLoTGAWOFI&ab_channel=AlgoJS",
      body: `Do-do ka joda ulta karo — dummy se start karo taaki head sambhalna na pade.

[Swap Nodes In Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

\`\`\`js
// LC: https://leetcode.com/problems/swap-nodes-in-pairs/
var swapPairs = function(head) {
  let dummy = new ListNode(-1);
  dummy.next = head;
  let prev = dummy;

  while (head && head.next) {
    let p1 = head;
    let p2 = head.next;

    prev.next = p2;
    p1.next = p2.next;
    p2.next = p1;

    prev = p1;
    head = p1.next;
  }

  return dummy.next;
};
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "add-two-numbers",
      title: "Add Two Numbers",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=RRD_5UKs4tw&ab_channel=AlgoJS",
      body: `Ulte order me digits — jodte jao carry saath rakho, lambi list khatm ho to zero samjho.

[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

\`\`\`js
// LC: https://leetcode.com/problems/add-two-numbers/
var addTwoNumbers = function(l1, l2) {
  let List = new ListNode(0);
  let head = List;

  let sum = 0;
  let carry = 0;

  while (l1 !== null || l2 !== null || sum !== 0) {
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }

    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;
    }

    head.next = new ListNode(sum);
    head = head.next;
    sum = carry;
    carry = 0;
  }

  return List.next;
};
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "rotate-list",
      title: "Rotate List",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Has2REIOhlE&ab_channel=AlgoJS",
      body: `List gol banao, n-k steps chalo, todo — k ko length se mod karna mat bhoolo.

[Rotate List](https://leetcode.com/problems/rotate-list/)

\`\`\`js
// LC: https://leetcode.com/problems/rotate-list/
var rotateRight = function(head, k) {
  if (head === null) return head;

  let len = 1;
  let tail = head;

  while (tail.next !== null) {
    tail = tail.next;
    len++;
  }

  tail.next = head;

  let count = len - (k % len);

  while (count > 0) {
    head = head.next;
    tail = tail.next;
    count--;
  }

  tail.next = null;

  return head;
};
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "reorder-list",
      title: "Reorder List",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=B1SM38reP28&t=283s&ab_channel=AlgoJS",
      body: `Middle nikalo, second half reverse karo, dono ko alternate merge karo — teen steps.

[Reorder List](https://leetcode.com/problems/reorder-list/)

\`\`\`js
// LC: https://leetcode.com/problems/reorder-list/
var reorderList = function(head) {
  // find mid
  let slow = head;
  let fast = head;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // break linked list
  let curr = slow.next;
  slow.next = null;

  // reverse second linked list
  let prev = null;
  while (curr) {
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }

  // combine lists
  let h1 = head;
  let h2 = prev;
  while (h2) {
    let temp = h1.next;
    h1.next = h2;
    h1 = h2;
    h2 = temp;
  }
};
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "remove-duplicates-from-an-unsorted-linked-list",
      title: "Remove Duplicates from Unsorted Linked List",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=Mn9dN4ZuuIg&ab_channel=AlgoJS",
      body: `Sorted wali se alag hai — dekhe hue set me rakho, dobara dikhe to skip karo.

[Remove Duplicates from Unsorted Linked List](https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/)

\`\`\`js
// LC: https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/
var deleteDuplicatesUnsorted = function(head) {
  let clone = head;
  let freqMap = {};

  while (clone !== null) {
    if (!freqMap[clone.val]) {
      freqMap[clone.val] = 1;
    } else {
      freqMap[clone.val]++;
    }
    clone = clone.next;
  }

  let prev = new ListNode(-1, head);
  clone = prev;

  while (clone !== null) {
    // Check if have next node, and check if next node is a duplicate
    while (clone.next && freqMap[clone.next.val] > 1) {
      clone.next = clone.next.next;
    }
    clone = clone.next;
  }

  return prev.next;
};
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "merge-k-sorted-lists",
      title: "Merge k Sorted Lists",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=Ga32S0So-fM&t=1s&ab_channel=AlgoJS",
      body: `Put every list head in a min-heap. Pop the smallest, push its \`.next\`. Dummy tail like merge two lists.

[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

\`\`\`js
// LC: https://leetcode.com/problems/merge-k-sorted-lists/
var mergeKLists = function(lists) {
  while (lists.length > 1) {
    let list1 = lists.shift();
    let list2 = lists.shift();

    let merged = mergeLists(list1, list2);

    lists.push(merged);
  }

  return lists[0] || null;
};

function mergeLists(list1, list2) {
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

  if (list1 === null) {
    dummy.next = list2;
  } else {
    dummy.next = list1;
  }

  return head.next;
}
\`\`\``,
    },
      ],
    },
  ],
};
