import type { JsNoteTopic } from "@/types/js-note";

/** Topics sourced from DSA-JS notes (arrays, structures, algorithms). */
export const dsaJsNoteTopics: JsNoteTopic[] = [
  {
    slug: "loops-and-math",
    order: 19,
    title: "Loops and math patterns",
    summary: "Classic warm-ups: sums, digits, palindromes, Fibonacci, missing number.",
    category: "DSA Algorithms",
    content: {
      simple:
        "Before trees and graphs, get comfortable turning a problem into a loop or a few variables. Many DSA questions are really digit tricks, running totals, or formulas in disguise.",
      deepDive: [
        "Sum 1..n can be a loop or the formula n(n+1)/2 — know both; interviews may ask why the formula works.",
        "Digit problems use `% 10` to read the last digit and `Math.floor(n / 10)` to drop it.",
        "Missing number in [0..n] uses the same sum trick: expected sum minus actual sum.",
        "Fibonacci: recursive version is slow; iterative with two variables is O(n) and what you want in production.",
      ],
      teachBack: [
        "Walk through sum of digits on 1287: 7 + 8 + 2 + 1.",
        "Palindrome check: build reversed number in a loop, compare at the end.",
      ],
      examples: [
        {
          title: "Sum of digits",
          code: `function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}
sumOfDigits(1287); // 18`,
          explanation:
            "Modulo peels off the last digit; integer division removes it until nothing is left.",
        },
        {
          title: "Missing number (0..n)",
          code: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((acc, x) => acc + x, 0);
  return expected - actual;
}
missingNumber([3, 0, 1]); // 2`,
          explanation:
            "If every value from 0 to n appeared once, the sum would be n(n+1)/2. One gap means the sums differ.",
        },
      ],
      practiceLinks: [
        { title: "Fizz Buzz", url: "https://leetcode.com/problems/fizz-buzz/" },
        { title: "Power of Two", url: "https://leetcode.com/problems/power-of-two/" },
        { title: "Sqrt(x)", url: "https://leetcode.com/problems/sqrtx/" },
      ],
    },
  },
  {
    slug: "array-manipulation",
    order: 20,
    title: "Array manipulation",
    summary: "push/pop, splice vs slice, copies, sort, and two-pointer habits.",
    category: "Arrays",
    content: {
      simple:
        "Arrays are the default DSA container in JS. Know which methods change the array in place, which return new data, and the Big-O cost: push/pop at the end are cheap; shift/unshift at the front are expensive.",
      deepDive: [
        "`splice` mutates: delete/insert at an index. `slice` copies a range without touching the original.",
        "Assigning `const b = a` copies the reference — mutating b mutates a. Use spread, `Array.from`, or `concat` for a shallow copy.",
        "Default `sort()` compares as strings — pass `(a, b) => a - b` for numbers.",
        "`find` stops at the first match; `filter` returns all matches. `flat(depth)` flattens nested arrays.",
      ],
      teachBack: [
        "Say: splice = surgery on the array; slice = photograph a section.",
        "Two Sum pattern: often hash map or sort + two pointers — start with brute force, then optimize.",
      ],
      examples: [
        {
          title: "splice vs slice",
          code: `const nums = [1, 2, 3, 4, 5];
const removed = nums.splice(1, 2); // removes 2,3 — nums is [1,4,5]
const copy = [1, 2, 3, 4, 5];
const part = copy.slice(1, 4);     // [2,3,4] — copy unchanged`,
          explanation:
            "splice changes nums; slice returns a new array and leaves the source alone.",
        },
        {
          title: "Shallow copy",
          code: `const a = [1, [2, 3]];
const b = [...a];
b[0] = 99;
b[1][0] = 99;
// a[0] still 1, but a[1][0] is 99 — nested array shared`,
          explanation:
            "Spread copies one level. Deep nesting still shares inner references.",
        },
      ],
      practiceLinks: [
        { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
        { title: "Move Zeroes", url: "https://leetcode.com/problems/move-zeroes/" },
        { title: "Remove Duplicates (sorted)", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
        { title: "Find Pivot Index", url: "https://leetcode.com/problems/find-pivot-index/" },
      ],
    },
  },
  {
    slug: "strings-in-js",
    order: 21,
    title: "Strings in JavaScript",
    summary: "Search, slice, split/join, and normalize text for DSA problems.",
    category: "Fundamentals",
    content: {
      simple:
        "Strings behave like read-only arrays of characters. You can index with `[i]` or `charAt(i)`, search with `includes` / `indexOf`, and reshape text with `slice`, `split`, and `join`.",
      deepDive: [
        "`replace` changes only the first match; `replaceAll` changes every match (or use a global regex).",
        "Anagram problems often sort characters or count frequency in an object / Map.",
        "Trim and case helpers (`trim`, `toLowerCase`) matter for palindrome and compare problems.",
        "For objects as JSON strings use `JSON.stringify` — not the same as string algorithms on plain text.",
      ],
      teachBack: [
        "Reverse a string: `s.split('').reverse().join('')` or a two-pointer swap in an array.",
        "Prefix problems: compare character by character; stop early on mismatch.",
      ],
      examples: [
        {
          title: "split and join",
          code: `const sentence = "hello world from js";
const words = sentence.split(" ");
const title = words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");`,
          explanation:
            "split breaks on spaces; map transforms each word; join puts them back with spaces.",
        },
        {
          title: "Valid anagram check",
          code: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const norm = (s) => s.split("").sort().join("");
  return norm(a) === norm(b);
}`,
          explanation:
            "Sorting both strings is a simple O(n log n) check; counting characters is O(n) and scales better.",
        },
      ],
      practiceLinks: [
        { title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
        { title: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/" },
        { title: "Longest Common Prefix", url: "https://leetcode.com/problems/longest-common-prefix/" },
        { title: "Reverse Words in a String", url: "https://leetcode.com/problems/reverse-words-in-a-string/" },
      ],
    },
  },
  {
    slug: "set-and-map",
    order: 22,
    title: "Set and Map",
    summary: "Fast uniqueness and key–value lookups — core tools for many DSA patterns.",
    category: "DSA Structures",
    content: {
      simple:
        "A Set stores unique values. A Map stores key → value pairs (keys can be any type, unlike plain objects). Use them when you need O(1) average lookup instead of scanning an array.",
      deepDive: [
        "Contains Duplicate → add to a Set; if `has` already true, duplicate exists.",
        "Two Sum with a Map: store `target - num` → index while scanning once.",
        "WeakMap / WeakSet hold weak references — good for metadata on objects without blocking garbage collection.",
        "Do not confuse `Map` (built-in collection) with `Array.prototype.map` (transform array).",
      ],
      teachBack: [
        "Set = bag of unique items; Map = phone book from key to value.",
        "Longest substring without repeat: sliding window + Set of chars in window.",
      ],
      examples: [
        {
          title: "Two Sum with Map",
          code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
          explanation:
            "Each pass remembers earlier numbers. When the complement exists, you have the pair.",
        },
      ],
      practiceLinks: [
        { title: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
        { title: "Longest Consecutive Sequence", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
        { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      ],
    },
  },
  {
    slug: "stacks",
    order: 23,
    title: "Stacks",
    summary: "Last-in-first-out — parentheses, monotonic stacks, and undo patterns.",
    category: "DSA Structures",
    content: {
      simple:
        "A stack only lets you add or remove from the top. In JS you can use an array with `push` and `pop` (both O(1) at the end) or build a linked-list stack for learning.",
      deepDive: [
        "Valid parentheses: push opening brackets; on closing, pop and check they match.",
        "Monotonic stack: keep elements in sorted order to answer next greater / smaller in one pass.",
        "Call stack in recursion is literally a stack of function frames.",
      ],
      teachBack: [
        "Stack = stack of plates — you only touch the top.",
        "When you need the most recent item that still matters, think stack.",
      ],
      examples: [
        {
          title: "Stack class (array)",
          code: `class Stack {
  #items = [];
  push(x) { this.#items.push(x); }
  pop() { return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  get size() { return this.#items.length; }
}`,
          explanation:
            "Private array; push/pop at the end give stack behavior with simple code.",
        },
      ],
      practiceLinks: [
        { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
        { title: "Min Stack", url: "https://leetcode.com/problems/min-stack/" },
        { title: "Next Greater Element I", url: "https://leetcode.com/problems/next-greater-element-i/" },
      ],
    },
  },
  {
    slug: "queues",
    order: 24,
    title: "Queues",
    summary: "First-in-first-out — BFS, scheduling, and implementing with two stacks.",
    category: "DSA Structures",
    content: {
      simple:
        "A queue removes the oldest item first. `push` + `shift` on an array works but `shift` is O(n). For interviews, know array-based and linked-list queues, plus queue-from-two-stacks.",
      deepDive: [
        "BFS on trees/graphs uses a queue to visit level by level.",
        "Circular queue fixes wasted space when using a fixed-size buffer.",
        "Implement queue using stacks: costly push or costly pop — amortized tricks swap between two stacks.",
      ],
      teachBack: [
        "Queue = line at a ticket counter — front leaves first.",
        "BFS = explore neighbors layer by layer with a queue.",
      ],
      examples: [
        {
          title: "Queue with array",
          code: `class Queue {
  #q = [];
  enqueue(x) { this.#q.push(x); }
  dequeue() { return this.#q.shift(); }
  front() { return this.#q[0]; }
}`,
          explanation:
            "Simple and fine for small data; for heavy dequeue at scale prefer a linked-list tail pointer.",
        },
      ],
      practiceLinks: [
        { title: "Implement Queue using Stacks", url: "https://leetcode.com/problems/implement-queue-using-stacks/" },
        { title: "Design Circular Queue", url: "https://leetcode.com/problems/design-circular-queue/" },
        { title: "Number of Recent Calls", url: "https://leetcode.com/problems/number-of-recent-calls/" },
      ],
    },
  },
  {
    slug: "linked-lists",
    order: 25,
    title: "Linked lists",
    summary: "Nodes chained by pointers — insert, reverse, cycle detection, slow/fast.",
    category: "DSA Structures",
    content: {
      simple:
        "Each node holds data and a `next` pointer. Unlike arrays, you do not get O(1) random access, but inserting after a known node is cheap. Many list problems use two pointers (slow/fast) or in-place reversal.",
      deepDive: [
        "Reverse: three pointers `prev`, `curr`, `next` — rewire `next` one node at a time.",
        "Middle node: slow moves 1 step, fast moves 2 — when fast hits end, slow is middle.",
        "Cycle: if slow and fast meet, there is a cycle (Floyd algorithm).",
        "Dummy head node simplifies insert/delete at the front.",
      ],
      teachBack: [
        "Draw boxes and arrows — never trust the picture in your head alone.",
        "Remove nth from end: two pointers n+1 apart, then delete after moving to the end.",
      ],
      examples: [
        {
          title: "Reverse in place",
          code: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
          explanation:
            "Each step turns curr.next backward. prev becomes the new head when curr runs out.",
        },
        {
          title: "Slow / fast (middle)",
          code: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
          explanation:
            "When fast reaches the end, slow sits on the middle (or second middle if even length).",
        },
      ],
      practiceLinks: [
        { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
        { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
        { title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { title: "Remove Nth Node From End", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      ],
    },
  },
  {
    slug: "recursion-basics",
    order: 26,
    title: "Recursion basics",
    summary: "Base case, smaller subproblem, and when to prefer a loop.",
    category: "DSA Algorithms",
    content: {
      simple:
        "Recursion is a function that calls itself on a smaller piece of the problem until a base case stops it. Every recursive solution needs a clear base case and progress toward that base.",
      deepDive: [
        "Call stack depth limits recursion in JS (~thousands of frames) — deep input may need iteration.",
        "Fibonacci with pure recursion repeats work — use memoization or an iterative loop.",
        "Tree and graph traversals are natural recursive; arrays and digits are easy to loop.",
      ],
      teachBack: [
        "Template: if base case return answer; else return combine(current, recurse(smaller)).",
        "Factorial: base n===0 return 1; else n * factorial(n-1).",
      ],
      examples: [
        {
          title: "Factorial",
          code: `function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}`,
          explanation: "Base case 0; each call waits for a smaller n until 0, then results multiply back.",
        },
        {
          title: "Sum of array (recursive)",
          code: `function sumArray(arr, n = arr.length) {
  if (n === 0) return 0;
  return arr[n - 1] + sumArray(arr, n - 1);
}`,
          explanation:
            "Take last element plus sum of everything before it — classic divide-by-size pattern.",
        },
      ],
      practiceLinks: [
        { title: "Pow(x, n)", url: "https://leetcode.com/problems/powx-n/" },
        { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
      ],
    },
  },
  {
    slug: "sorting-algorithms",
    order: 27,
    title: "Sorting algorithms",
    summary: "Built-in sort, bubble, selection, insertion, merge, and quick sort in JS.",
    category: "DSA Algorithms",
    content: {
      simple:
        "JavaScript's `arr.sort(compareFn)` is implemented in the engine (typically O(n log n)). For interviews you should still know simple sorts and how merge/quick divide the problem.",
      deepDive: [
        "Bubble / selection / insertion are O(n²) — fine for tiny n, teaching only at scale.",
        "Merge sort: split in half, sort halves, merge — stable O(n log n), extra space for the merge array.",
        "Quick sort: pick pivot, partition smaller/larger — average O(n log n), in-place variants exist.",
        "Sort colors / intervals often use counting or custom compare, not only generic sort.",
      ],
      teachBack: [
        "Merge = divide and merge sorted pieces; quick = pivot and partition.",
        "Always pass numeric compare: `(a,b) => a - b`.",
      ],
      examples: [
        {
          title: "Merge sort (concept)",
          code: `function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
function merge(left, right) {
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}`,
          explanation:
            "Split until length 1, then merge two sorted arrays by always taking the smaller front.",
        },
      ],
      practiceLinks: [
        { title: "Sort Colors", url: "https://leetcode.com/problems/sort-colors/" },
        { title: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array/" },
        { title: "Sort an Array", url: "https://leetcode.com/problems/sort-an-array/" },
      ],
    },
  },
  {
    slug: "searching-algorithms",
    order: 28,
    title: "Searching algorithms",
    summary: "Linear scan vs binary search on sorted data.",
    category: "DSA Algorithms",
    content: {
      simple:
        "Linear search checks every element — O(n). Binary search halves a sorted range each step — O(log n). Binary search needs sorted order (or monotonic yes/no predicate).",
      deepDive: [
        "Use `includes`, `indexOf`, `find`, `findIndex` for linear search on small or unsorted data.",
        "Binary search invariant: answer lies in `[start, end]`; shrink by comparing `mid` to target.",
        "Variations: first/last position, rotated sorted array, sqrt via binary search on answer.",
      ],
      teachBack: [
        "Phone book analogy: open middle — too late? discard top half. Repeat.",
        "If array is not sorted, binary search does not apply without preprocessing.",
      ],
      examples: [
        {
          title: "Binary search (iterative)",
          code: `function binarySearch(arr, target) {
  let start = 0, end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] > target) end = mid - 1;
    else start = mid + 1;
  }
  return -1;
}`,
          explanation:
            "mid splits the range; discard the half that cannot contain target.",
        },
      ],
      practiceLinks: [
        { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
        { title: "Search Insert Position", url: "https://leetcode.com/problems/search-insert-position/" },
        { title: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      ],
    },
  },
  {
    slug: "binary-trees",
    order: 29,
    title: "Binary trees",
    summary: "Traversal orders, BFS levels, and the shape of most tree interview questions.",
    category: "DSA Structures",
    content: {
      simple:
        "Each node has at most two children: left and right. `root` is the top. You visit nodes in preorder (root first), inorder (left, root, right), or postorder (root last). Level-order uses a queue (BFS).",
      deepDive: [
        "BST property: left < node < right — inorder traversal prints sorted values.",
        "Height / depth / diameter problems usually recurse on children and combine results at the parent.",
        "Level-order: dequeue node, enqueue children — tracks rows for zigzag / right-side view variants.",
      ],
      teachBack: [
        "Inorder on BST = sorted list — memorize that mapping.",
        "Recursion template: do something at node, recurse left, recurse right, combine.",
      ],
      examples: [
        {
          title: "Traversals",
          code: `function inorder(node, out = []) {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.val);
  inorder(node.right, out);
  return out;
}`,
          explanation:
            "Left subtree, then current value, then right — for a BST this visits values in ascending order.",
        },
        {
          title: "Level order (BFS)",
          code: `function levelOrder(root) {
  if (!root) return [];
  const q = [root], levels = [];
  while (q.length) {
    const size = q.length, row = [];
    for (let i = 0; i < size; i++) {
      const node = q.shift();
      row.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    levels.push(row);
  }
  return levels;
}`,
          explanation:
            "Process queue in chunks of current length — each chunk is one level.",
        },
      ],
      practiceLinks: [
        { title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { title: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" },
        { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
        { title: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
      ],
    },
  },
];
