import type { SolutionGroup } from "./types";

export const TWO_POINTERS_SOLUTIONS: SolutionGroup = {
  id: "two-pointers",
  title: "Two Pointers",
  subs: [
    {
      title: "Opposite Ends",
      topics: [
    {
      id: 125,
      lcSlug: "valid-palindrome",
      title: "Valid Palindrome",
      diff: "Easy",
      body: `Two pointers from both ends — skip non-alphanumeric chars, compare case-insensitively.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

\`\`\`js
// Two pointers from both ends — skip non-alphanumeric
function isPalindrome(s) {
  const isAlphaNum = (c) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++; // skip left junk
    while (l < r && !isAlphaNum(s[r])) r--; // skip right junk
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}
\`\`\``,
    },
    {
      id: 167,
      lcSlug: "two-sum-ii-input-array-is-sorted",
      title: "Two Sum II - Input Array Is Sorted",
      diff: "Medium",
      body: `Sorted, so if the sum is too small I need a bigger left. Too big, smaller right. 1-based indexes on the return.

[Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

\`\`\`js
// Opposite ends on sorted array
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1]; // 1-indexed
    if (sum < target) left++; // need larger sum
    else right--; // need smaller sum
  }
}
\`\`\``,
    },
    {
      id: 15,
      lcSlug: "3sum",
      title: "3Sum",
      diff: "Medium",
      body: `Sort, fix index \`i\`, then two-pointer 2-sum on the rest. Skip duplicate \`i\` and duplicate pairs.

[3Sum](https://leetcode.com/problems/3sum/)

\`\`\`js
// Fix i, two-sum with l/r on sorted nums
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const ans = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip dup i
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        ans.push([nums[i], nums[l], nums[r]]);
        l++; r--;
        while (l < r && nums[l] === nums[l - 1]) l++; // skip dup l
        while (l < r && nums[r] === nums[r + 1]) r--; // skip dup r
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 18,
      lcSlug: "4sum",
      title: "4Sum",
      diff: "Medium",
      body: `Same as 3Sum with one more outer index — fix \`i\`, then \`j\`, then two-pointer sum with \`l,r\`. Skip duplicates at each level.

[4Sum](https://leetcode.com/problems/4sum/)

\`\`\`js
// Fix i and j, then two-pointer pair sum
function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const out = [], n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1, r = n - 1;
      while (l < r) {
        const s = nums[i] + nums[j] + nums[l] + nums[r];
        if (s === target) {
          out.push([nums[i], nums[j], nums[l], nums[r]]);
          l++; r--;
          while (l < r && nums[l] === nums[l - 1]) l++;
          while (l < r && nums[r] === nums[r + 1]) r--;
        } else if (s < target) l++;
        else r--;
      }
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "container-with-most-water",
      title: "Container With Most Water",
      diff: "Medium",
      body: `Opposite ends — always move the shorter height inward. Area is min heights times width; track the max.

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

\`\`\`js
// Move the shorter wall — only way to maybe increase area
function maxArea(height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    best = Math.max(best, area);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 42,
      lcSlug: "trapping-rain-water",
      title: "Trapping Rain Water",
      diff: "Hard",
      body: `Water at \`i\` is min(tallest on left, tallest on right) minus height[i]. Two pointers: I always move the shorter side, because that side’s bound is the one that limits water right now.

[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

\`\`\`js
// Two pointers — process the shorter side (its max caps water)
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left]; // trapped at left
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
\`\`\``,
    },
    {
      id: 977,
      lcSlug: "squares-of-a-sorted-array",
      title: "Squares of a Sorted Array",
      diff: "Easy",
      body: `Squares of negatives are largest at the ends — two pointers pick the bigger square and fill from the back.

[Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/)

\`\`\`js
// Merge largest squares from both ends into output
function sortedSquares(nums) {
  const n = nums.length, out = Array(n);
  let l = 0, r = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      out[i] = nums[l] * nums[l];
      l++;
    } else {
      out[i] = nums[r] * nums[r];
      r--;
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 345,
      lcSlug: "reverse-vowels-of-a-string",
      title: "Reverse Vowels of a String",
      diff: "Easy",
      body: `Two pointers find vowels from both ends and swap. Keep vowels in a set for O(1) checks.

[Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/)

\`\`\`js
// Swap vowels at l and r
function reverseVowels(s) {
  const a = [...s]; // mutable chars
  const vowels = new Set(["a","e","i","o","u","A","E","I","O","U"]);
  let l = 0, r = a.length - 1;
  while (l < r) {
    while (l < r && !vowels.has(a[l])) l++;
    while (l < r && !vowels.has(a[r])) r--;
    const tmp = a[l]; a[l] = a[r]; a[r] = tmp;
    l++; r--;
  }
  return a.join("");
}
\`\`\``,
    },
    {
      id: 680,
      lcSlug: "valid-palindrome-ii",
      title: "Valid Palindrome II",
      diff: "Easy",
      body: `Allow one deletion — on mismatch try skipping left or right with a helper that forbids further deletes.

[Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/)

\`\`\`js
// One skip allowed — branch on first mismatch
function validPalindrome(s) {
  const isPal = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++; r--;
    }
    return true;
  };
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return isPal(l + 1, r) || isPal(l, r - 1);
    l++; r--;
  }
  return true;
}
\`\`\``,
    },
    {
      id: 881,
      lcSlug: "boats-to-save-people",
      title: "Boats to Save People",
      diff: "Medium",
      body: `Sort by weight. Greedily pair lightest with heaviest — equal sum shares a boat, else the heavy one goes alone.

[Boats to Save People](https://leetcode.com/problems/boats-to-save-people/)

\`\`\`js
// Greedy pairing: lightest + heaviest if fits
function numRescueBoats(people, limit) {
  people.sort((a, b) => a - b);
  let l = 0, r = people.length - 1, boats = 0;
  while (l <= r) {
    if (people[l] + people[r] <= limit) l++; // pair light with heavy
    r--; // heavy always leaves in this boat
    boats++;
  }
  return boats;
}
\`\`\``,
    },
    {
      id: 1498,
      lcSlug: "number-of-subsequences-that-satisfy-the-given-sum-condition",
      title: "Number of Subsequences That Satisfy the Given Sum Condition",
      diff: "Medium",
      body: `Sort nums. For each left index, count valid right indices; each gap contributes 2^count subsequences. Apply mod.

[Number of Subsequences That Satisfy the Given Sum Condition](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/)

\`\`\`js
// Sorted + two pointers; middle elements free to pick (2^k)
function numSubseq(nums, target) {
  nums.sort((a, b) => a - b);
  const MOD = 1000000007;
  const pow2 = [1];
  for (let i = 1; i < nums.length; i++) pow2[i] = (pow2[i - 1] * 2) % MOD;
  let l = 0, r = nums.length - 1, ans = 0;
  while (l <= r) {
    if (nums[l] + nums[r] <= target) {
      ans = (ans + pow2[r - l]) % MOD; // pick any subset between l..r
      l++;
    } else r--; // sum too big, drop max
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Fast / Slow Pointer",
      topics: [
    {
      id: 141,
      lcSlug: "linked-list-cycle",
      title: "Linked List Cycle",
      diff: "Easy",
      body: `Floyd: slow moves 1 step, fast 2 — meeting implies a cycle; fast reaching null means no cycle.

[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

\`\`\`js
// Floyd cycle detection
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // cycle
  }
  return false; // fast hit null
}
\`\`\``,
    },
    {
      id: 142,
      lcSlug: "linked-list-cycle-ii",
      title: "Linked List Cycle II",
      diff: "Medium",
      body: `Fast and slow meet inside the cycle. Put one pointer back at the head. Walk both one step. They meet at the entrance. If fast hits null, no cycle.

[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)

\`\`\`js
// Floyd then reset one ptr to head — meet at entrance
function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next; // same speed from head and meet
      }
      return p;
    }
  }
  return null;
}
\`\`\``,
    },
    {
      id: 287,
      lcSlug: "find-the-duplicate-number",
      title: "Find the Duplicate Number",
      diff: "Medium",
      body: `Treat values as next pointers — Floyd finds cycle entry, which is the duplicate number.

[Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

\`\`\`js
// Treat nums[i] as next index — Floyd on implicit graph
function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]]; // phase 1: find meeting
  } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast]; // phase 2: entrance = duplicate
  }
  return slow;
}
\`\`\``,
    },
    {
      id: 457,
      lcSlug: "circular-array-loop",
      title: "Circular Array Loop",
      diff: "Medium",
      body: `From each start, run slow/fast in the same direction; a cycle means loop exists. Mark visited nodes to avoid repeats.

[Circular Array Loop](https://leetcode.com/problems/circular-array-loop/)

\`\`\`js
// Floyd per start index; mark nums[i]=0 when done
function circularArrayLoop(nums) {
  const n = nums.length;
  const nxt = (i) => ((i + nums[i]) % n + n) % n; // positive mod
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) continue; // already cleared
    let slow = i, fast = i;
    while (true) {
      slow = nxt(slow);
      fast = nxt(nxt(fast));
      if (nums[slow] * nums[i] <= 0 || nums[fast] * nums[i] <= 0) break; // direction flip
      if (slow === fast) {
        if (slow === nxt(slow)) break; // length-1 loop invalid
        return true;
      }
    }
    let j = i;
    while (nums[j] * nums[i] > 0) {
      const k = nxt(j);
      nums[j] = 0; // mark visited from this start
      j = k;
    }
  }
  return false;
}
\`\`\``,
    },
      ],
    },
  ],
};
