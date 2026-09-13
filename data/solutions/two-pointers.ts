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
      body: `Dono siron se aao, alphanumeric nahi to skip, case ignore karke compare.

[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

\`\`\`js
// Hinglish: string scan — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-palindrome/
function isPalindrome(s) {
  // Hinglish: step 1 — dono pointer lo
  const isAlphaNum = (c) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++; // Hinglish: kachra skip
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false; // Hinglish: mismatch
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
// Hinglish: do pointer chalao — ek-ek step comment dekho
// Two pointers — opposite ends
// LC: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) { // Hinglish: do pointer chalao
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++; // Hinglish: left badhao
    else right--; // Hinglish: right ghatao
  }
}
\`\`\``,
    },
    {
      id: 15,
      lcSlug: "3sum",
      title: "3Sum",
      diff: "Medium",
      body: `Sort karke har \`i\` ko fix karo, fir \`l,r\` se 2-sum dhoondo. Duplicate skip karo.

[3Sum](https://leetcode.com/problems/3sum/)

\`\`\`js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/3sum/
function threeSum(nums) {
  // Hinglish: pehle sort
  nums.sort((a,b)=>a-b);
  const ans=[];
  for (let i=0;i<nums.length-2;i++) {
    if (i>0 && nums[i]===nums[i-1]) continue; // Hinglish: duplicate i skip
    let l=i+1, r=nums.length-1;
    while (l<r) {
      const sum = nums[i]+nums[l]+nums[r];
      if (sum===0) { ans.push([nums[i],nums[l],nums[r]]); l++; r--; while(l<r && nums[l]===nums[l-1]) l++; while(l<r && nums[r]===nums[r+1]) r--; } // Hinglish: mila to dono move + duplicate skip
      else if (sum<0) l++; // Hinglish: chhota to left badhao
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
      body: `3Sum jaisa, ek loop aur — i fix, phir j fix, phir l,r se 2-sum. Duplicate har level pe skip karo.

[4Sum](https://leetcode.com/problems/4sum/)

\`\`\`js
// Hinglish: do fix + two pointers — ek-ek step comment dekho
// LC: https://leetcode.com/problems/4sum/
function fourSum(nums, target) {
  // Hinglish: step 1 — sort karo
  nums.sort((a, b) => a - b);
  const out = [], n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Hinglish: duplicate skip
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1, r = n - 1;
      while (l < r) {
        const s = nums[i] + nums[j] + nums[l] + nums[r];
        if (s === target) {
          out.push([nums[i], nums[j], nums[l], nums[r]]);
          l++; r--;
          while (l < r && nums[l] === nums[l - 1]) l++; // Hinglish: duplicate skip
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
      body: `Do pointer, jo height chhoti usko move karo. Area = min(h[l],h[r]) * width, best rakho.

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

\`\`\`js
// Hinglish: do pointer chalao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/container-with-most-water/
function maxArea(height) {
  // Hinglish: dono end se start
  let l=0, r=height.length-1, best=0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l); // Hinglish: current area
    best = Math.max(best, area);
    if (height[l] < height[r]) l++; // Hinglish: chhoti height hatayi, badi ka chance
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
// Hinglish: do pointer chalao — ek-ek step comment dekho
// Two pointers — water limited by the shorter wall
// LC: https://leetcode.com/problems/trapping-rain-water/
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) { // Hinglish: do pointer chalao
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++; // Hinglish: left badhao
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--; // Hinglish: right ghatao
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
      body: `Negative ke square bade hote hain — dono siron se bada uthao, aakhir se bharo.

[Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/)

\`\`\`js
// Hinglish: bada pehle uthao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/squares-of-a-sorted-array/
function sortedSquares(nums) {
  // Hinglish: step 1 — dono pointer lo
  const n = nums.length, out = Array(n);
  let l = 0, r = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) { out[i] = nums[l] * nums[l]; l++; } // Hinglish: left bada
    else { out[i] = nums[r] * nums[r]; r--; } // Hinglish: right bada
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
      body: `Vowels dhoondo dono taraf se, mile to swap karo. Set me vowels rakho.

[Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/)

\`\`\`js
// Hinglish: vowel swap — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-vowels-of-a-string/
function reverseVowels(s) {
  // Hinglish: step 1 — array banao (string immutable)
  const a = [...s];
  const vowels = new Set(["a","e","i","o","u","A","E","I","O","U"]);
  let l = 0, r = a.length - 1;
  while (l < r) {
    while (l < r && !vowels.has(a[l])) l++;
    while (l < r && !vowels.has(a[r])) r--;
    const tmp = a[l]; a[l] = a[r]; a[r] = tmp; // Hinglish: swap
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
      body: `Ek delete ki chhoot hai — mismatch pe dono option try karo (left skip ya right skip), helper se check karo.

[Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/)

\`\`\`js
// Hinglish: ek delete allowed — ek-ek step comment dekho
// LC: https://leetcode.com/problems/valid-palindrome-ii/
function validPalindrome(s) {
  // Hinglish: step 1 — range check helper
  const isPal = (l, r) => {
    while (l < r) { if (s[l] !== s[r]) return false; l++; r--; }
    return true;
  };
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return isPal(l + 1, r) || isPal(l, r - 1); // Hinglish: ek hatao
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
      body: `Sort karke sabse halka + sabse bhari jodo — sama gaye to ek boat, nahi to bhari akela jayega.

[Boats to Save People](https://leetcode.com/problems/boats-to-save-people/)

\`\`\`js
// Hinglish: halka + bhari jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/boats-to-save-people/
function numRescueBoats(people, limit) {
  // Hinglish: step 1 — sort karo
  people.sort((a, b) => a - b);
  let l = 0, r = people.length - 1, boats = 0;
  while (l <= r) {
    if (people[l] + people[r] <= limit) l++; // Hinglish: dono sama gaye
    r--; // Hinglish: bhari to jayega hi
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
      body: `Sort karo, har left ke liye right dhoondo — beech wale 2^(count) subsequences banate hain. Mod lagana mat bhoolo.

[Number of Subsequences That Satisfy the Given Sum Condition](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/)

\`\`\`js
// Hinglish: sort + powers — ek-ek step comment dekho
// LC: https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/
function numSubseq(nums, target) {
  // Hinglish: step 1 — sort karo
  nums.sort((a, b) => a - b);
  const MOD = 1000000007;
  const pow2 = [1];
  for (let i = 1; i < nums.length; i++) pow2[i] = (pow2[i - 1] * 2) % MOD; // Hinglish: powers pehle
  let l = 0, r = nums.length - 1, ans = 0;
  while (l <= r) {
    if (nums[l] + nums[r] <= target) {
      ans = (ans + pow2[r - l]) % MOD; // Hinglish: beech wale free hain
      l++;
    } else r--;
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
      id: 142,
      lcSlug: "linked-list-cycle-ii",
      title: "Linked List Cycle II",
      diff: "Medium",
      body: `Fast and slow meet inside the cycle. Put one pointer back at the head. Walk both one step. They meet at the entrance. If fast hits null, no cycle.

[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)

\`\`\`js
// Hinglish: pointer rewiring — ek-ek step comment dekho
// Linked list — Floyd, then find entrance
// LC: https://leetcode.com/problems/linked-list-cycle-ii/
function detectCycle(head) {
  // Hinglish: step 1 — base case check karo
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
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
      body: `Value ko index samjho — cycle banegi. Floyd se cycle ka start pakdo, wahi duplicate hai.

[Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

\`\`\`js
// Hinglish: cycle dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/find-the-duplicate-number/
function findDuplicate(nums) {
  // Hinglish: step 1 — race lagao
  let slow = nums[0], fast = nums[0];
  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
  slow = nums[0]; // Hinglish: ek ko start pe lao
  while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; } // Hinglish: milan = duplicate
  return slow;
}
\`\`\``,
    },
    {
      id: 457,
      lcSlug: "circular-array-loop",
      title: "Circular Array Loop",
      diff: "Medium",
      body: `Har index se slow/fast chalao — same direction cycle mile to true. Visited mark karke dobara mat chalao.

[Circular Array Loop](https://leetcode.com/problems/circular-array-loop/)

\`\`\`js
// Hinglish: har se race — ek-ek step comment dekho
// LC: https://leetcode.com/problems/circular-array-loop/
function circularArrayLoop(nums) {
  // Hinglish: step 1 — har index se try karo
  const n = nums.length;
  const nxt = (i) => ((i + nums[i]) % n + n) % n; // Hinglish: gol ghoomo
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) continue;
    let slow = i, fast = i;
    while (true) {
      slow = nxt(slow);
      fast = nxt(nxt(fast));
      if (nums[slow] * nums[i] <= 0 || nums[fast] * nums[i] <= 0) break; // Hinglish: direction badli
      if (slow === fast) {
        if (slow === nxt(slow)) break; // Hinglish: single wala cycle nahi
        return true;
      }
    }
    let j = i;
    while (nums[j] * nums[i] > 0) { const k = nxt(j); nums[j] = 0; j = k; } // Hinglish: dekha mark karo
  }
  return false;
}
\`\`\``,
    },
      ],
    },
  ],
};
