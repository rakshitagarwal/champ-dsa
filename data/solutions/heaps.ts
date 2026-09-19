import type { SolutionGroup } from "./types";

export const HEAPS_SOLUTIONS: SolutionGroup = {
  id: "heaps",
  title: "Heaps",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "last-stone-weight",
      title: "Last Stone Weight",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=0ELCVIJhLy8&ab_channel=AlgoJS",
      body: `Har baar 2 sabse heavy lo, takrao, bacha to wapas daalo. Max-heap.

[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

\`\`\`js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    const heap = new MaxPriorityQueue();
    
    for(const stone of stones) heap.enqueue(stone);
    
    while(heap.size() > 1){
        let diff = heap.dequeue().element - heap.dequeue().element;
        if(diff > 0) heap.enqueue(diff);
    }
    
    return heap.size() === 0 ? 0 : heap.front().element;
};
\`\`\``,
    },
    {
      id: 0,
      lcSlug: "max-heap-concept",
      title: "Implement a Max Heap",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=hjEyHEGf4aI&t=242s&ab_channel=AlgoJS",
      body: `Heap banana seekho bina LeetCode ke — MinHeap class yaad karo, MaxHeap me tulna palto.

*Concept task — iska koi LeetCode link nahi hai.*

\`\`\`js
// Hinglish: MinHeap class yaad karo — ek-ek step comment dekho
// Concept task — iska koi LeetCode link nahi hai
class MinHeap {
  constructor() { this.h = []; } // Hinglish: array hi heap hai
  size() { return this.h.length; }
  peek() { return this.h[0]; } // Hinglish: top dekho — O(1)
  push(val) {
    this.h.push(val); // Hinglish: aakhir me daalo
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1; // Hinglish: parent nikalo
      if (this.h[i] >= this.h[p]) break; // Hinglish: jagah sahi hai
      const t = this.h[i]; this.h[i] = this.h[p]; this.h[p] = t; // Hinglish: upar bhejo
      i = p;
    }
  }
  pop() {
    const top = this.h[0], last = this.h.pop(); // Hinglish: top nikalo
    if (!this.h.length) return top;
    this.h[0] = last; // Hinglish: aakhri ko upar rakho
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1; // Hinglish: teeno me chhota dhoondo
      if (l < this.h.length && this.h[l] < this.h[m]) m = l;
      if (r < this.h.length && this.h[r] < this.h[m]) m = r;
      if (m === i) break; // Hinglish: jagah sahi hai
      const t = this.h[i]; this.h[i] = this.h[m]; this.h[m] = t; // Hinglish: neeche bhejo
      i = m;
    }
    return top;
  }
}
// MaxHeap ke liye tulna palto: har < ko > karo, bas itna farak hai
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "minimum-cost-to-connect-sticks",
      title: "Minimum Cost To Connect Sticks",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=SYcHZEnKX8M&ab_channel=AlgoJS",
      body: `Huffman jaisa — do sabse chhoti chhaden jodo, cost jodo, wapas daalo. Min-heap se nikalo.

[Minimum Cost To Connect Sticks](https://leetcode.com/problems/minimum-cost-to-connect-sticks/)

\`\`\`js
/**
 * @param {number[]} sticks
 * @return {number}
 */
var connectSticks = function(sticks) {
    let heap = new MinPriorityQueue();
    let total = 0;
    
    for(let stick of sticks){
        heap.enqueue(stick);
    }
    
    while(heap.size() > 1){
        let diff = heap.dequeue().element + heap.dequeue().element;
        total += diff;
        heap.enqueue(diff);
    }
    
    return total;
};
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "kth-smallest-element-in-a-sorted-matrix",
      title: "Kth Smallest Element in a Sorted Matrix",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=yy2rpWjKuXU&ab_channel=AlgoJS",
      body: `Har row ka pehla heap me daalo — sabse chhota nikalo, usi row ka agla daalo. K baar karo.

[Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)

\`\`\`js
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    
    let maxHeap = new MaxPriorityQueue();
    
    matrix.forEach((row) => {
        row.forEach((element) => {
            maxHeap.enqueue(element);
            if(maxHeap.size() > k){
                maxHeap.dequeue().element;
            }
        })
    })
    
    return maxHeap.front().element;
};
\`\`\``,
    },
      ],
    },
  ],
};
