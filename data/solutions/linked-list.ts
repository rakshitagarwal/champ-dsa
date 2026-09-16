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
// Two pointers n+1 apart — back stops before node to delete
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
\`\`\``,
    },
    {
      id: 876,
      lcSlug: "middle-of-the-linked-list",
      title: "Middle of the Linked List",
      diff: "Easy",
      body: `Fast moves two steps, slow one — when fast reaches the end, slow sits at the middle node.

[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 24,
      lcSlug: "swap-nodes-in-pairs",
      title: "Swap Nodes in Pairs",
      diff: "Medium",
      body: `Swap adjacent pairs by rewiring links — use a dummy node so the head swap needs no special case.

[Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

\`\`\`js
// Swap adjacent pairs by rewiring three links per pair
// LC: https://leetcode.com/problems/swap-nodes-in-pairs/
function swapPairs(head) {
  const dummy = { val: 0, next: head }; // prev can always be dummy's chain
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next, b = a.next; // Pair to swap: a then b
    a.next = b.next; // a skips past b
    b.next = a; // b points back to a
    prev.next = b; // Link previous chunk to new pair head b
    prev = a; // Next pair starts after swapped a
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
      body: `Walk to the node before \`left\`, reverse the sublist through \`right\`, then reconnect. Dummy protects head edits.

[Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)

\`\`\`js
// Reverse sublist in place — repeated head insertion after prev
// LC: https://leetcode.com/problems/reverse-linked-list-ii/
function reverseBetween(head, left, right) {
  const dummy = { val: 0, next: head };
  let prev = dummy;
  for (let i = 1; i < left; i++) prev = prev.next; // Node before sublist start
  let cur = prev.next; // First node inside sublist (will move right each step)
  for (let i = 0; i < right - left; i++) {
    const nxt = cur.next; // Node to pull to front of sublist
    cur.next = nxt.next; // Bypass nxt — cur stays as sublist tail candidate
    nxt.next = prev.next; // nxt becomes new sublist head
    prev.next = nxt; // Attach new head after prev
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
      body: `Find length, link tail to head, walk \`n - k % n\` steps, break the circle — mod \`k\` by length first.

[Rotate List](https://leetcode.com/problems/rotate-list/)

\`\`\`js
// Make circle, then break after (n-k) steps — new head is tail.next
// LC: https://leetcode.com/problems/rotate-list/
function rotateRight(head, k) {
  if (!head) return head;
  let n = 1, tail = head;
  while (tail.next) { tail = tail.next; n++; } // Find length and last node
  k = k % n; // Rotating n steps is identity
  if (k === 0) return head;
  tail.next = head; // Circular list
  let steps = n - k; // New head is k nodes from old tail
  while (steps-- > 0) tail = tail.next; // Walk to new tail position
  const out = tail.next; // New head
  tail.next = null; // Break cycle
  return out;
}
\`\`\``,
    },
    {
      id: 143,
      lcSlug: "reorder-list",
      title: "Reorder List",
      diff: "Medium",
      body: `Three steps: find middle, reverse second half, zip-merge the two halves alternately.

[Reorder List](https://leetcode.com/problems/reorder-list/)

\`\`\`js
// Find mid, reverse second half, zip-merge two halves
// LC: https://leetcode.com/problems/reorder-list/
function reorderList(head) {
  if (!head) return;
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; } // Mid of first half
  let prev = null, cur = slow.next;
  slow.next = null; // Split list into two halves
  while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; } // Reverse second half
  let a = head, b = prev; // a = first half, b = reversed second half
  while (b) {
    const ta = a.next, tb = b.next; // Save next pointers before overwrite
    a.next = b; b.next = ta; // Interleave one node from b
    a = ta; b = tb; // Advance both chains
  }
}
\`\`\``,
    },
    {
      id: 328,
      lcSlug: "odd-even-linked-list",
      title: "Odd Even Linked List",
      diff: "Medium",
      body: `Split into odd-index and even-index chains, then attach even list after odd — relative order preserved in each.

[Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)

\`\`\`js
// Split odd-index and even-index nodes into two lists, then concatenate
// LC: https://leetcode.com/problems/odd-even-linked-list/
function oddEvenList(head) {
  if (!head) return head;
  let odd = head, even = head.next, evenHead = even; // evenHead saves start of even chain
  while (even && even.next) {
    odd.next = even.next; // Link odd to next odd (skip even)
    odd = odd.next;
    even.next = odd.next; // Link even to next even
    even = even.next;
  }
  odd.next = evenHead; // Append even list after odd list
  return head;
}
\`\`\``,
    },
    {
      id: 83,
      lcSlug: "remove-duplicates-from-sorted-list",
      title: "Remove Duplicates from Sorted List",
      diff: "Easy",
      body: `On a sorted list duplicates are adjacent — skip nodes while \`next.val === cur.val\`.

[Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

\`\`\`js
// Sorted list — duplicates are adjacent; skip duplicate nodes
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-list/
function deleteDuplicates(head) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next; // Drop duplicate head
    else cur = cur.next; // Move on when values differ
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
      body: `Drop entire duplicate runs — dummy head, skip all nodes in a equal-value group, keep unique nodes only.

[Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

\`\`\`js
// Remove every node that appears in a duplicate run — keep unique values only
// LC: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
function deleteDuplicates(head) {
  const dummy = { val: 0, next: head };
  let prev = dummy; // Last node known to be kept
  while (head) {
    if (head.next && head.val === head.next.val) {
      const v = head.val;
      while (head && head.val === v) head = head.next; // Skip entire duplicate group
      prev.next = head; // Bypass group from prev
    } else { prev = head; head = head.next; } // Unique value — advance prev
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
      body: `Remove every node with the target value — dummy node handles deleting the head cleanly.

[Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/)

\`\`\`js
// Delete all nodes with target val — dummy handles head removal
// LC: https://leetcode.com/problems/remove-linked-list-elements/
function removeElements(head, val) {
  const dummy = { val: 0, next: head };
  let cur = dummy; // cur is always predecessor of node under test
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next; // Remove matching successor
    else cur = cur.next; // Keep node and move forward
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
\`\`\``,
    },
    {
      id: 146,
      lcSlug: "lru-cache",
      title: "LRU Cache",
      diff: "Medium",
      body: `Hash map for O(1) lookup plus doubly linked list for usage order — move touched nodes to the head (MRU), evict from tail (LRU).

[LRU Cache](https://leetcode.com/problems/lru-cache/)

\`\`\`js
// Hash map for O(1) lookup + doubly linked list for usage order (MRU near head)
// LC: https://leetcode.com/problems/lru-cache/
function LRUCache(capacity) {
  this.cap = capacity;
  this.map = new Map(); // key -> list node
  this.head = { key: 0, val: 0, prev: null, next: null }; // Sentinel before MRU side
  this.tail = { key: 0, val: 0, prev: null, next: null }; // Sentinel before LRU side
  this.head.next = this.tail; this.tail.prev = this.head; // Empty list between sentinels
}
LRUCache.prototype._add = function (node) {
  node.next = this.head.next; node.prev = this.head; // Insert right after head (most recent)
  this.head.next.prev = node; this.head.next = node;
};
LRUCache.prototype._drop = function (node) {
  node.prev.next = node.next; node.next.prev = node.prev; // Unlink from list
};
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const node = this.map.get(key);
  this._drop(node); this._add(node); // Touch moves entry to MRU
  return node.val;
};
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) { const n = this.map.get(key); n.val = value; this._drop(n); this._add(n); return; }
  const node = { key, val: value, prev: null, next: null };
  this.map.set(key, node); this._add(node);
  if (this.map.size > this.cap) {
    const old = this.tail.prev; // LRU node sits before tail sentinel
    this._drop(old); this.map.delete(old.key); // Evict least recently used
  }
};
\`\`\``,
    },
    {
      id: 460,
      lcSlug: "lfu-cache",
      title: "LFU Cache",
      diff: "Hard",
      body: `Like LRU but evict by lowest frequency — track \`minF\`, and on ties remove least recently used among that bucket.

[LFU Cache](https://leetcode.com/problems/lfu-cache/)

\`\`\`js
// Frequency buckets: minF tracks lowest freq; evict any key from minF bucket
// LC: https://leetcode.com/problems/lfu-cache/
function LFUCache(capacity) {
  this.cap = capacity;
  this.vals = new Map(); // key -> value
  this.freq = new Map(); // key -> frequency count
  this.buckets = new Map(); // freq -> Set of keys at that freq
  this.minF = 0; // Current minimum frequency among keys
}
LFUCache.prototype._touch = function (key) {
  const f = this.freq.get(key);
  this.buckets.get(f).delete(key); // Remove from old frequency set
  if (this.buckets.get(f).size === 0) {
    this.buckets.delete(f);
    if (this.minF === f) this.minF++; // No keys left at min freq — bump minF
  }
  this.freq.set(key, f + 1);
  if (!this.buckets.has(f + 1)) this.buckets.set(f + 1, new Set());
  this.buckets.get(f + 1).add(key); // Add to incremented frequency bucket
};
LFUCache.prototype.get = function (key) {
  if (!this.vals.has(key)) return -1;
  this._touch(key); // Access increases frequency
  return this.vals.get(key);
};
LFUCache.prototype.put = function (key, value) {
  if (this.cap === 0) return;
  if (this.vals.has(key)) { this.vals.set(key, value); this._touch(key); return; }
  if (this.vals.size === this.cap) {
    const out = this.buckets.get(this.minF).values().next().value; // Evict one LFU key
    this.buckets.get(this.minF).delete(out);
    this.vals.delete(out); this.freq.delete(out);
  }
  this.vals.set(key, value); this.freq.set(key, 1); this.minF = 1; // New key starts at freq 1
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
// Min-heap of list heads — same pattern as merge two sorted lists
// LC: https://leetcode.com/problems/merge-k-sorted-lists/
function mergeKLists(lists) {
  const h = [];
  const less = (a, b) => a.val < b.val;
  for (const node of lists) if (node) heapPush(h, node, less); // Seed heap with each list head
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (h.length) {
    const node = heapPop(h, less); // Smallest current head
    tail.next = node;
    tail = node;
    if (node.next) heapPush(h, node.next, less); // Push next node from that list
  }
  return dummy.next;
}

// Array-based min-heap helpers (default numeric compare)
function heapPush(h, val, less = (a, b) => a < b) {
  h.push(val);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!less(h[i], h[p])) break;
    [h[i], h[p]] = [h[p], h[i]]; // Bubble up while child is smaller
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
    [h[i], h[m]] = [h[m], h[i]]; // Bubble down with smaller child
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
      body: `If at least \`k\` nodes remain, reverse that block in place, then recurse on the rest and link.

[Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)

\`\`\`js
// Reverse first k nodes if k exist; recurse on remainder
// LC: https://leetcode.com/problems/reverse-nodes-in-k-group/
function reverseKGroup(head, k) {
  let cnt = 0, node = head;
  while (node && cnt < k) { node = node.next; cnt++; } // Check k nodes available
  if (cnt < k) return head; // Short tail — leave unchanged
  let prev = null, cur = head;
  for (let i = 0; i < k; i++) {
    const nxt = cur.next;
    cur.next = prev; // Standard iterative reverse step
    prev = cur; cur = nxt;
  }
  head.next = reverseKGroup(cur, k); // head is old group head — links to next reversed chunk
  return prev; // prev is new head of this k-block
}
\`\`\``,
    },
    {
      id: 430,
      lcSlug: "flatten-a-multilevel-doubly-linked-list",
      title: "Flatten a Multilevel Doubly Linked List",
      diff: "Medium",
      body: `When a node has a child, push the main-level \`next\` on a stack and dive into the child — DFS preorder flattening.

[Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)

\`\`\`js
// DFS preorder on multilevel list — stack saves main-level continuations
// LC: https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
function flatten(head) {
  let cur = head;
  const st = []; // Stack of next nodes after child subtrees
  while (cur) {
    if (cur.child) {
      if (cur.next) st.push(cur.next); // Resume main level after child chain
      cur.next = cur.child; // Dive into child list
      cur.next.prev = cur; // Maintain doubly linked property
      cur.child = null; // Child consumed into next chain
    }
    if (!cur.next && st.length) {
      const nxt = st.pop(); // End of child — attach saved sibling
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
      body: `Find the middle, reverse the second half, then compare values from both halves for a palindrome.

[Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 160,
      lcSlug: "intersection-of-two-linked-lists",
      title: "Intersection of Two Linked Lists",
      diff: "Easy",
      body: `Two pointers walk both lists and switch to the other head at end — they meet at the intersection or both become null.

[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

\`\`\`js
// Two pointers swap lists at end — equalizes walked length before intersection
// LC: https://leetcode.com/problems/intersection-of-two-linked-lists/
function getIntersectionNode(headA, headB) {
  let a=headA, b=headB;
  while (a!==b) {
    a = a ? a.next : headB; // Switch to B when A exhausts
    b = b ? b.next : headA; // Switch to A when B exhausts
  }
  return a; // Both null or both at intersection node
}
\`\`\``,
    },
    {
      id: 148,
      lcSlug: "sort-list",
      title: "Sort List",
      diff: "Medium",
      body: `Merge sort on a linked list — split with slow/fast, sort halves recursively, merge sorted runs. O(1) extra space besides recursion.

[Sort List](https://leetcode.com/problems/sort-list/)

\`\`\`js
// Merge sort on linked list — O(n log n) time, O(1) extra if ignoring recursion stack
// LC: https://leetcode.com/problems/sort-list/
function sortList(head) {
  if (!head || !head.next) return head; // Base: 0 or 1 node sorted
  let slow = head, fast = head.next;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; } // Mid before second half
  const mid = slow.next;
  slow.next = null; // Cut list in half
  const l = sortList(head), r = sortList(mid); // Recursively sort halves
  const dummy = { val: 0, next: null };
  let tail = dummy;
  let a = l, b = r;
  while (a && b) {
    if (a.val < b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a || b; // Attach leftover sorted run
  return dummy.next;
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "add-two-numbers",
      title: "Add Two Numbers",
      diff: "Medium",
      body: `Digits are LSB-first — add with carry, treat missing nodes as zero until both lists and carry are exhausted.

[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

\`\`\`js
// Digits stored LSB-first — simulate elementary addition with carry
// LC: https://leetcode.com/problems/add-two-numbers/
function addTwoNumbers(l1, l2) {
  const dummy = { val: 0, next: null };
  let tail = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const a = l1 ? l1.val : 0, b = l2 ? l2.val : 0; // Treat missing digits as 0
    const s = a + b + carry;
    tail.next = { val: s % 10, next: null }; // Append ones digit
    carry = Math.floor(s / 10); // Carry for next position
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
      body: `MSB-first lists — push digits onto stacks, pop and add with carry while prepending result nodes.

[Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/)

\`\`\`js
// MSB-first lists — stack digits then build result from front via prepend
// LC: https://leetcode.com/problems/add-two-numbers-ii/
function addTwoNumbers(l1, l2) {
  const s1 = [], s2 = [];
  while (l1) { s1.push(l1.val); l1 = l1.next; } // Push MSB...LSB then pop from LSB
  while (l2) { s2.push(l2.val); l2 = l2.next; }
  let carry = 0, head = null;
  while (s1.length || s2.length || carry) {
    const a = s1.length ? s1.pop() : 0, b = s2.length ? s2.pop() : 0;
    const s = a + b + carry;
    const node = { val: s % 10, next: head }; // Prepend digit — builds MSB-first result
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
