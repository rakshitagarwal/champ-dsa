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
// Hinglish: heap push/pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/last-stone-weight/
function lastStoneWeight(stones) {
  // Hinglish: max-heap banane ke liye sort + pop (ok for interview)
  stones.sort((a,b)=>a-b);
  while (stones.length>1) {
    const b=stones.pop(), a=stones.pop(); // Hinglish: 2 bade
    if (a!==b) {
      const diff = b-a;
      // Hinglish: insert sorted
      let i=0; while(i<stones.length && stones[i]<diff) i++;
      stones.splice(i,0,diff);
    }
  }
  return stones[0]||0;
}
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
// Hinglish: chhoti jodte jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-cost-to-connect-sticks/
function connectSticks(sticks) {
  // Hinglish: step 1 — min-heap banao
  const h = [...sticks];
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[i] >= h[p]) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const down = (i) => {
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && h[l] < h[m]) m = l;
      if (r < h.length && h[r] < h[m]) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (h.length) { h[0] = last; down(0); }
    return top;
  };
  for (let i = Math.floor(h.length / 2); i >= 0; i--) down(i); // Hinglish: heap banao
  let cost = 0;
  while (h.length > 1) {
    const s = pop() + pop(); // Hinglish: do chhoti nikalo
    cost += s;
    h.push(s); up(h.length - 1); // Hinglish: jod ke wapas daalo
  }
  return cost;
}
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
// Hinglish: row heads ka heap — ek-ek step comment dekho
// LC: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
function kthSmallest(matrix, k) {
  // Hinglish: step 1 — har row ka pehla daalo
  const n = matrix.length;
  const h = [];
  const less = (a, b) => a[0] < b[0];
  const push = (x) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(h[i], h[p])) break;
      const t = h[i]; h[i] = h[p]; h[p] = t; i = p;
    }
  };
  const pop = () => {
    const top = h[0], last = h.pop();
    if (!h.length) return top;
    h[0] = last;
    let i = 0;
    while (true) {
      let m = i, l = i * 2 + 1, r = l + 1;
      if (l < h.length && less(h[l], h[m])) m = l;
      if (r < h.length && less(h[r], h[m])) m = r;
      if (m === i) break;
      const t = h[i]; h[i] = h[m]; h[m] = t; i = m;
    }
    return top;
  };
  for (let r = 0; r < n; r++) push([matrix[r][0], r, 0]); // Hinglish: [value, row, col]
  let ans = 0;
  for (let i = 0; i < k; i++) {
    const [v, r, c] = pop(); // Hinglish: sabse chhota nikalo
    ans = v;
    if (c + 1 < n) push([matrix[r][c + 1], r, c + 1]); // Hinglish: agli daalo
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};
