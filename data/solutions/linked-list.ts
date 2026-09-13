import type { SolutionGroup } from "./types";

export const LINKED_LIST_SOLUTIONS: SolutionGroup = {
  id: "linked-list",
  title: "Linked List",
  subs: [
    {
      title: "Core Manipulation",
      topics: [
    {
      id: 206,
      lcSlug: "reverse-linked-list",
      title: "Reverse Linked List",
      diff: "Easy",
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
      id: 21,
      lcSlug: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      diff: "Easy",
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
      id: 19,
      lcSlug: "remove-nth-node-from-end-of-list",
      title: "Remove Nth Node From End of List",
      diff: "Medium",
      body: `Dummy, then a gap of n between two pointers. When the front hits the end, the back is right before the node to drop.

[Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

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
      id: 876,
      lcSlug: "middle-of-the-linked-list",
      title: "Middle of the Linked List",
      diff: "Easy",
      body: `Fast 2x, slow 1x. Fast khatam to slow middle par.

[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

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
      id: 24,
      lcSlug: "swap-nodes-in-pairs",
      title: "Swap Nodes in Pairs",
      diff: "Medium",
      body: `Do-do ka joda ulta karo — dummy se start karo taaki head sambhalna na pade.

[Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

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
      id: 92,
      lcSlug: "reverse-linked-list-ii",
      title: "Reverse Linked List II",
      diff: "Medium",
      body: `Left tak jao, right tak reverse karo, dono siron se jod do. Dummy se head safe rakho.

[Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)

\`\`\`js
// Hinglish: hissa palto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-linked-list-ii/
function reverseBetween(head, left, right) {
  // Hinglish: step 1 — dummy lagao
  const dummy = { val: 0, next: head };
  let prev = dummy;
  for (let i = 1; i < left; i++) prev = prev.next; // Hinglish: left tak jao
  let cur = prev.next;
  for (let i = 0; i < right - left; i++) {
    const nxt = cur.next; // Hinglish: ek aage wala uthao
    cur.next = nxt.next;
    nxt.next = prev.next; // Hinglish: aage lagao
    prev.next = nxt;
  }
  return dummy.next;
}
\`\`\``,
    },
    {
      id: 61,
      lcSlug: "rotate-list",
      title: "Rotate List",
      diff: "Medium",
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
      id: 143,
      lcSlug: "reorder-list",
      title: "Reorder List",
      diff: "Medium",
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
      id: 328,
      lcSlug: "odd-even-linked-list",
      title: "Odd Even Linked List",
      diff: "Medium",
      body: `Odd aur even alag chains banao, aakhir me jod do. Order dono me same rehta hai.

[Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)

\`\`\`js
// Hinglish: do chain banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/odd-even-linked-list/
function oddEvenList(head) {
  // Hinglish: step 1 — dono head lo
  if (!head) return head;
  let odd = head, even = head.next, evenHead = even;
  while (even && even.next) {
    odd.next = even.next; // Hinglish: odd aage badhao
    odd = odd.next;
    even.next = odd.next; // Hinglish: even aage badhao
    even = even.next;
  }
  odd.next = evenHead; // Hinglish: jod do
  return head;
}
\`\`\``,
    },
    {
      id: 83,
      lcSlug: "remove-duplicates-from-sorted-list",
      title: "Remove Duplicates from Sorted List",
      diff: "Easy",
      body: `Sorted hai to duplicate paas me milega — same dikhe to skip karo.

[Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

\`\`\`js
// Hinglish: same skip karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-list/
function deleteDuplicates(head) {
  // Hinglish: step 1 — traverse karo
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next; // Hinglish: duplicate udao
    else cur = cur.next;
  }
  return head;
}
\`\`\``,
    },
    {
      id: 82,
      lcSlug: "remove-duplicates-from-sorted-list-ii",
      title: "Remove Duplicates from Sorted List II",
      diff: "Medium",
      body: `Duplicate wala poora group udana hai — dummy lo, same values skip karo, alag mile to jodo.

[Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

\`\`\`js
// Hinglish: poora group udao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
function deleteDuplicates(head) {
  // Hinglish: step 1 — dummy lagao
  const dummy = { val: 0, next: head };
  let prev = dummy;
  while (head) {
    if (head.next && head.val === head.next.val) {
      const v = head.val;
      while (head && head.val === v) head = head.next; // Hinglish: poora group skip
      prev.next = head;
    } else { prev = head; head = head.next; } // Hinglish: alag hai to rakho
  }
  return dummy.next;
}
\`\`\``,
    },
    {
      id: 203,
      lcSlug: "remove-linked-list-elements",
      title: "Remove Linked List Elements",
      diff: "Easy",
      body: `Val wale nodes hatao — dummy se head edge case khatam.

[Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/)

\`\`\`js
// Hinglish: val wale hatao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-linked-list-elements/
function removeElements(head, val) {
  // Hinglish: step 1 — dummy lagao
  const dummy = { val: 0, next: head };
  let cur = dummy;
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next; // Hinglish: hatao
    else cur = cur.next;
  }
  return dummy.next;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Advanced / Design",
      topics: [
    {
      id: 138,
      lcSlug: "copy-list-with-random-pointer",
      title: "Copy List with Random Pointer",
      diff: "Medium",
      body: `Map old node → new node. First pass: copy values. Second pass: copy \`.next\` and \`.random\` through the map. Easy to remember. (Weaving copies into the list also works, more code.)

[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 146,
      lcSlug: "lru-cache",
      title: "LRU Cache",
      diff: "Medium",
      body: `Map plus doubly linked list — Map se O(1) pahunch, list se order. Head fresh, tail purana.

[LRU Cache](https://leetcode.com/problems/lru-cache/)

\`\`\`js
// Hinglish: map + list combo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/lru-cache/
function LRUCache(capacity) {
  // Hinglish: step 1 — map + khaali list
  this.cap = capacity;
  this.map = new Map();
  this.head = { key: 0, val: 0, prev: null, next: null };
  this.tail = { key: 0, val: 0, prev: null, next: null };
  this.head.next = this.tail; this.tail.prev = this.head;
}
LRUCache.prototype._add = function (node) {
  node.next = this.head.next; node.prev = this.head; // Hinglish: head pe lagao
  this.head.next.prev = node; this.head.next = node;
};
LRUCache.prototype._drop = function (node) {
  node.prev.next = node.next; node.next.prev = node.prev; // Hinglish: nikaalo
};
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const node = this.map.get(key);
  this._drop(node); this._add(node); // Hinglish: fresh banao
  return node.val;
};
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) { const n = this.map.get(key); n.val = value; this._drop(n); this._add(n); return; }
  const node = { key, val: value, prev: null, next: null };
  this.map.set(key, node); this._add(node);
  if (this.map.size > this.cap) {
    const old = this.tail.prev;
    this._drop(old); this.map.delete(old.key); // Hinglish: purana udao
  }
};
\`\`\``,
    },
    {
      id: 460,
      lcSlug: "lfu-cache",
      title: "LFU Cache",
      diff: "Hard",
      body: `LRU jaisa, par frequency se nikalo — min freq track karo, tie me LRU todo.

[LFU Cache](https://leetcode.com/problems/lfu-cache/)

\`\`\`js
// Hinglish: freq buckets — ek-ek step comment dekho
// LC: https://leetcode.com/problems/lfu-cache/
function LFUCache(capacity) {
  // Hinglish: step 1 — maps lo
  this.cap = capacity;
  this.vals = new Map();
  this.freq = new Map();
  this.buckets = new Map();
  this.minF = 0;
}
LFUCache.prototype._touch = function (key) {
  const f = this.freq.get(key);
  this.buckets.get(f).delete(key); // Hinglish: purani bucket se nikalo
  if (this.buckets.get(f).size === 0) {
    this.buckets.delete(f);
    if (this.minF === f) this.minF++; // Hinglish: min aage badhao
  }
  this.freq.set(key, f + 1);
  if (!this.buckets.has(f + 1)) this.buckets.set(f + 1, new Set());
  this.buckets.get(f + 1).add(key); // Hinglish: nayi bucket me daalo
};
LFUCache.prototype.get = function (key) {
  if (!this.vals.has(key)) return -1;
  this._touch(key);
  return this.vals.get(key);
};
LFUCache.prototype.put = function (key, value) {
  if (this.cap === 0) return;
  if (this.vals.has(key)) { this.vals.set(key, value); this._touch(key); return; }
  if (this.vals.size === this.cap) {
    const out = this.buckets.get(this.minF).values().next().value; // Hinglish: sabse kam freq wala
    this.buckets.get(this.minF).delete(out);
    this.vals.delete(out); this.freq.delete(out);
  }
  this.vals.set(key, value); this.freq.set(key, 1); this.minF = 1;
  if (!this.buckets.has(1)) this.buckets.set(1, new Set());
  this.buckets.get(1).add(key);
};
\`\`\``,
    },
    {
      id: 23,
      lcSlug: "merge-k-sorted-lists",
      title: "Merge k Sorted Lists",
      diff: "Hard",
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
    {
      id: 25,
      lcSlug: "reverse-nodes-in-k-group",
      title: "Reverse Nodes in k-Group",
      diff: "Hard",
      body: `K-k nodes ulto — pehle k hain ya nahi dekho, phir palto, aage jodo.

[Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)

\`\`\`js
// Hinglish: k-k palto — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-nodes-in-k-group/
function reverseKGroup(head, k) {
  // Hinglish: step 1 — k hain ya nahi
  let cnt = 0, node = head;
  while (node && cnt < k) { node = node.next; cnt++; }
  if (cnt < k) return head; // Hinglish: kam hain to waise hi
  let prev = null, cur = head;
  for (let i = 0; i < k; i++) {
    const nxt = cur.next;
    cur.next = prev; // Hinglish: palto
    prev = cur; cur = nxt;
  }
  head.next = reverseKGroup(cur, k); // Hinglish: baaki recursion kare
  return prev;
}
\`\`\``,
    },
    {
      id: 430,
      lcSlug: "flatten-a-multilevel-doubly-linked-list",
      title: "Flatten a Multilevel Doubly Linked List",
      diff: "Medium",
      body: `Child mile to stack me next rakho, child pe jao — DFS order me seedha karo.

[Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)

\`\`\`js
// Hinglish: child me ghuso — ek-ek step comment dekho
// LC: https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
function flatten(head) {
  // Hinglish: step 1 — traverse karo
  let cur = head;
  const st = [];
  while (cur) {
    if (cur.child) {
      if (cur.next) st.push(cur.next); // Hinglish: wapas aane ke liye rakho
      cur.next = cur.child; // Hinglish: child pe jao
      cur.next.prev = cur;
      cur.child = null;
    }
    if (!cur.next && st.length) {
      const nxt = st.pop(); // Hinglish: rakha hua uthao
      cur.next = nxt; nxt.prev = cur;
    }
    cur = cur.next;
  }
  return head;
}
\`\`\``,
    },
    {
      id: 234,
      lcSlug: "palindrome-linked-list",
      title: "Palindrome Linked List",
      diff: "Easy",
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
      id: 160,
      lcSlug: "intersection-of-two-linked-lists",
      title: "Intersection of Two Linked Lists",
      diff: "Easy",
      body: `Do pointers, end par dusri list pe switch karo. Milenge to intersection.

[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

\`\`\`js
// Hinglish: pointer rewiring — ek-ek step comment dekho
// LC: https://leetcode.com/problems/intersection-of-two-linked-lists/
function getIntersectionNode(headA, headB) {
  // Hinglish: dono switch karte hain
  let a=headA, b=headB;
  while (a!==b) { a = a ? a.next : headB; b = b ? b.next : headA; } // Hinglish: end par dusri list
  return a;
}
\`\`\``,
    },
    {
      id: 148,
      lcSlug: "sort-list",
      title: "Sort List",
      diff: "Medium",
      body: `Merge sort linked list pe — slow/fast se todo, dono sort karke merge karo. O(1) space.

[Sort List](https://leetcode.com/problems/sort-list/)

\`\`\`js
// Hinglish: todo-sort-merge — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sort-list/
function sortList(head) {
  // Hinglish: step 1 — base case
  if (!head || !head.next) return head;
  let slow = head, fast = head.next;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; } // Hinglish: middle dhoondo
  const mid = slow.next;
  slow.next = null; // Hinglish: todo
  const l = sortList(head), r = sortList(mid); // Hinglish: dono sort karo
  const dummy = { val: 0, next: null };
  let tail = dummy;
  let a = l, b = r;
  while (a && b) {
    if (a.val < b.val) { tail.next = a; a = a.next; } // Hinglish: chhota jodo
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "add-two-numbers",
      title: "Add Two Numbers",
      diff: "Medium",
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
      id: 445,
      lcSlug: "add-two-numbers-ii",
      title: "Add Two Numbers II",
      diff: "Medium",
      body: `Seedhe order me digits — stack me daal ke ulta karo, phir upar wala tareeka lagao.

[Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/)

\`\`\`js
// Hinglish: ulta karke jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/add-two-numbers-ii/
function addTwoNumbers(l1, l2) {
  // Hinglish: step 1 — stacks bharo
  const s1 = [], s2 = [];
  while (l1) { s1.push(l1.val); l1 = l1.next; }
  while (l2) { s2.push(l2.val); l2 = l2.next; }
  let carry = 0, head = null;
  while (s1.length || s2.length || carry) {
    const a = s1.length ? s1.pop() : 0, b = s2.length ? s2.pop() : 0;
    const s = a + b + carry;
    const node = { val: s % 10, next: head }; // Hinglish: aage jodo
    head = node;
    carry = Math.floor(s / 10);
  }
  return head;
}
\`\`\``,
    },
      ],
    },
  ],
};
