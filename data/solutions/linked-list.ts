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
// Hinglish: pointer rewiring — ek-ek step comment dekho
// LC: https://leetcode.com/problems/middle-of-the-linked-list/
function middleNode(head) {
  // Hinglish: fast double
  let slow=head, fast=head;
  while (fast && fast.next) { slow=slow.next; fast=fast.next.next; } // Hinglish: slow 1, fast 2
  return slow;
}
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
// Hinglish: pointer rewiring — ek-ek step comment dekho
// LC: https://leetcode.com/problems/palindrome-linked-list/
function isPalindrome(head) {
  // Hinglish: middle
  let slow=head, fast=head;
  while (fast && fast.next) { slow=slow.next; fast=fast.next.next; }
  // Hinglish: reverse second half
  let prev=null, cur=slow;
  while (cur) { const nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; }
  // Hinglish: compare
  let p1=head, p2=prev;
  while (p2) { if (p1.val!==p2.val) return false; p1=p1.next; p2=p2.next; }
  return true;
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
// Hinglish: race lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/linked-list-cycle/
function hasCycle(head) {
  // Hinglish: step 1 — dono head se
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next; // Hinglish: ek kadam
    fast = fast.next.next; // Hinglish: do kadam
    if (slow === fast) return true; // Hinglish: mile to cycle
  }
  return false;
}
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
// Hinglish: joda palto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/swap-nodes-in-pairs/
function swapPairs(head) {
  // Hinglish: step 1 — dummy lagao
  const dummy = { val: 0, next: head };
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next, b = a.next; // Hinglish: joda pakdo
    a.next = b.next;
    b.next = a;
    prev.next = b; // Hinglish: jod do
    prev = a;
  }
  return dummy.next;
}
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
// Hinglish: jodo carry rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/add-two-numbers/
function addTwoNumbers(l1, l2) {
  // Hinglish: step 1 — dummy lo
  const dummy = { val: 0, next: null };
  let tail = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const a = l1 ? l1.val : 0, b = l2 ? l2.val : 0; // Hinglish: na ho to zero
    const s = a + b + carry;
    tail.next = { val: s % 10, next: null }; // Hinglish: digit jodo
    carry = Math.floor(s / 10); // Hinglish: carry bachao
    tail = tail.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
}
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
// Hinglish: gol bana ke todo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/rotate-list/
function rotateRight(head, k) {
  // Hinglish: step 1 — lambai nikalo
  if (!head) return head;
  let n = 1, tail = head;
  while (tail.next) { tail = tail.next; n++; }
  k = k % n; // Hinglish: extra ghoomna hatao
  if (k === 0) return head;
  tail.next = head; // Hinglish: gol banao
  let steps = n - k;
  while (steps-- > 0) tail = tail.next; // Hinglish: nayi tail tak chalo
  const out = tail.next;
  tail.next = null; // Hinglish: todo
  return out;
}
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
// Hinglish: todo-palto-jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reorder-list/
function reorderList(head) {
  // Hinglish: step 1 — middle nikalo
  if (!head) return;
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  // Hinglish: second half reverse karo
  let prev = null, cur = slow.next;
  slow.next = null;
  while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; }
  // Hinglish: alternate merge karo
  let a = head, b = prev;
  while (b) {
    const ta = a.next, tb = b.next;
    a.next = b; b.next = ta;
    a = ta; b = tb;
  }
}
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
// Hinglish: dekha to skip karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/
function removeDuplicatesUnsorted(head) {
  // Hinglish: step 1 — dummy + set lo
  const dummy = { val: 0, next: head };
  const seen = new Set();
  let prev = dummy, cur = head;
  while (cur) {
    if (seen.has(cur.val)) prev.next = cur.next; // Hinglish: dobara dikha to hatao
    else { seen.add(cur.val); prev = cur; } // Hinglish: pehli baar to rakho
    cur = cur.next;
  }
  return dummy.next;
}
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
// Hinglish: heap push/pop — ek-ek step comment dekho
// Heap — k-way merge
// LC: https://leetcode.com/problems/merge-k-sorted-lists/
function mergeKLists(lists) {
  const h = [];
  const less = (a, b) => a.val < b.val;
  for (const node of lists) if (node) heapPush(h, node, less); // Hinglish: heap me daalo
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (h.length) {
    const node = heapPop(h, less); // Hinglish: sabse chhota nikala
    tail.next = node;
    tail = node;
    if (node.next) heapPush(h, node.next, less); // Hinglish: heap me daalo
  }
  return dummy.next;
}

// Heap helpers — har solution ke saath (min-heap default)
// Hinglish: push karke upar bubble, pop karke neeche bubble
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!less(h[i], h[p])) break;
    [h[i], h[p]] = [h[p], h[i]];
    i = p;
  }
}
function heapPop(h, less = (a, b) => a < b) {
  const top = h[0], last = h.pop();
  if (!h.length) return top;
  h[0] = last;
  let i = 0;
  while (true) {
    let m = i, l = i * 2 + 1, r = l + 1;
    if (l < h.length && less(h[l], h[m])) m = l;
    if (r < h.length && less(h[r], h[m])) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
  return top;
}
\`\`\``,
    },
      ],
    },
  ],
};
