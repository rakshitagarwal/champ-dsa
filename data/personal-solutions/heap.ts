import type { SolutionGroup } from "@/data/solutions/types";

export const HEAP_SOLUTIONS: SolutionGroup = {
  id: "heap",
  title: "Heap / Priority Queue",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 703,
      lcSlug: "kth-largest-element-in-a-stream",
      title: "Kth Largest Element in a Stream",
      diff: "Easy",
      body: "Min-heap size k — stream me add, peek = kth largest.\n\n[Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)\n\n```js\n// Time: O(log k) add · Space: O(k)\nvar KthLargest = function(k, nums) {\n  this.k = k;\n  this.heap = [];\n  for (const n of nums) this.add(n);\n};\n\nKthLargest.prototype.add = function(val) {\n  this.heap.push(val);\n  this.heap.sort((a, b) => a - b);\n  if (this.heap.length > this.k) this.heap.shift();\n  return this.heap[0];\n};\n```",
    },
    {
      id: 1046,
      lcSlug: "last-stone-weight",
      title: "Last Stone Weight",
      diff: "Easy",
      body: "Har baar 2 sabse heavy lo, takrao, bacha to wapas daalo. Max-heap.\n\n[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)\n\n```js\n// Time: O(n log n) · Space: O(n)\n/**\n * @param {number[]} stones\n * @return {number}\n */\nvar lastStoneWeight = function(stones) {\n    const heap = new MaxPriorityQueue();\n    \n    for(const stone of stones) heap.enqueue(stone);\n    \n    while(heap.size() > 1){\n        let diff = heap.dequeue().element - heap.dequeue().element;\n        if(diff > 0) heap.enqueue(diff);\n    }\n    \n    return heap.size() === 0 ? 0 : heap.front().element;\n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 215,
      lcSlug: "kth-largest-element-in-an-array",
      title: "Kth Largest Element in an Array",
      diff: "Medium",
      body: "Sort ya heap — yahan sort se kth largest (heap version heap topic me).\n\n[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)\n\n```js\n// Time: O(n log n) · Space: O(1)\nvar findKthLargest = function(nums, k) {\n  nums.sort((a, b) => b - a);\n  return nums[k - 1];\n};\n```",
    },
    {
      id: 347,
      lcSlug: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      diff: "Medium",
      body: "Freq map + min-heap of size K — heap me (freq, num), size > k pe pop.\n\n[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)\n\n```js\n// Time: O(n log k) · Space: O(n)\nclass MinHeap {\n  constructor() { this.a = []; }\n  size() { return this.a.length; }\n  peek() { return this.a[0]; }\n  push(x) {\n    this.a.push(x);\n    let i = this.a.length - 1;\n    while (i > 0) {\n      const p = (i - 1) >> 1;\n      if (this.a[p][0] <= this.a[i][0]) break;\n      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];\n      i = p;\n    }\n  }\n  pop() {\n    const top = this.a[0];\n    const last = this.a.pop();\n    if (!this.a.length) return top;\n    this.a[0] = last;\n    let i = 0;\n    while (true) {\n      let s = i, l = i * 2 + 1, r = l + 1;\n      if (l < this.a.length && this.a[l][0] < this.a[s][0]) s = l;\n      if (r < this.a.length && this.a[r][0] < this.a[s][0]) s = r;\n      if (s === i) break;\n      [this.a[s], this.a[i]] = [this.a[i], this.a[s]];\n      i = s;\n    }\n    return top;\n  }\n}\n\nvar topKFrequent = function(nums, k) {\n  const freq = new Map();\n  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);\n\n  const heap = new MinHeap();\n  for (const [num, f] of freq) {\n    heap.push([f, num]);\n    if (heap.size() > k) heap.pop();\n  }\n\n  return heap.a.map(([, num]) => num);\n};\n```",
    },
    {
      id: 973,
      lcSlug: "k-closest-points-to-origin",
      title: "K Closest Points to Origin",
      diff: "Medium",
      body: "Max-heap size k on distance — ya sort by dist squared.\n\n[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)\n\n```js\n// Time: O(n log n) · Space: O(n)\nvar kClosest = function(points, k) {\n  return points\n    .sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]))\n    .slice(0, k);\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 295,
      lcSlug: "find-median-from-data-stream",
      title: "Find Median from Data Stream",
      diff: "Hard",
      body: "Two heaps: max-heap for the smaller half, min-heap for the bigger half. Size differs by at most 1. Median is the middle top, or the average of both tops.\n\n[Find Median From Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)\n\n```js\n// Time: O(log n) · Space: O(n)\nvar MedianFinder = function() {\n  this.arr = [];\n};\n\nMedianFinder.prototype.addNum = function(num) {\n  let left = 0;\n  let right = this.arr.length - 1;\n\n  while (left <= right) {\n    let mid = Math.floor((right + left) / 2);\n\n    if (this.arr[mid] < num) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  this.arr.splice(left, 0, num);\n};\n\nMedianFinder.prototype.findMedian = function() {\n  if (this.arr.length % 2 === 0) {\n    // even\n    let mid = this.arr.length / 2;\n    return (this.arr[mid] + this.arr[mid - 1]) / 2;\n  } else {\n    // odd\n    let mid = Math.floor(this.arr.length / 2);\n    return this.arr[mid];\n  }\n};\n```",
    },
    {
      id: 23,
      lcSlug: "merge-k-sorted-lists",
      title: "Merge k Sorted Lists",
      diff: "Hard",
      body: "Put every list head in a min-heap. Pop the smallest, push its `.next`. Dummy tail like merge two lists.\n\n[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)\n\n```js\n// Time: O(n log k) · Space: O(k)\nvar mergeKLists = function(lists) {\n  while (lists.length > 1) {\n    let list1 = lists.shift();\n    let list2 = lists.shift();\n\n    let merged = mergeLists(list1, list2);\n\n    lists.push(merged);\n  }\n\n  return lists[0] || null;\n};\n\nfunction mergeLists(list1, list2) {\n  let dummy = new ListNode(0);\n  let head = dummy;\n\n  while (list1 && list2) {\n    if (list1.val <= list2.val) {\n      dummy.next = list1;\n      list1 = list1.next;\n    } else {\n      dummy.next = list2;\n      list2 = list2.next;\n    }\n    dummy = dummy.next;\n  }\n\n  if (list1 === null) {\n    dummy.next = list2;\n  } else {\n    dummy.next = list1;\n  }\n\n  return head.next;\n}\n```",
    },
      ],
    },
  ],
};
