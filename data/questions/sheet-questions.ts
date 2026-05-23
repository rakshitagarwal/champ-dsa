/* Auto-generated from DSA practice sheet */
import type { Question } from "@/types/question";

export const sheetQuestions: Question[] = [
  {
    "id": "bc-001-richest-customer-wealth",
    "title": "Richest customer wealth",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Return the maximum wealth among all customers.",
    "description": "<p>You are given an <code>m x n</code> integer grid <code>accounts</code> where <code>accounts[i][j]</code> is the amount of money the <code>i​​​​​<sup>​​​​​​th</sup>​​​​</code> customer has in the <code>j​​​​​<sup>​​​​​​th</sup></code>​​​​ bank. Return<em> the <strong>wealth</strong> that the richest customer has.</em></p>\n\n<p>A customer&#39;s <strong>wealth</strong> is the amount of money they have in all their bank accounts. The richest customer is the customer that has the maximum <strong>wealth</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> accounts = [[1,2,3],[3,2,1]]\n<strong>Output:</strong> 6\n<strong>Explanation</strong><strong>:</strong>\n<code>1st customer has wealth = 1 + 2 + 3 = 6\n</code><code>2nd customer has wealth = 3 + 2 + 1 = 6\n</code>Both customers are considered the richest with a wealth of 6 each, so return 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> accounts = [[1,5],[7,3],[3,5]]\n<strong>Output:</strong> 10\n<strong>Explanation</strong>: \n1st customer has wealth = 6\n2nd customer has wealth = 10 \n3rd customer has wealth = 8\nThe 2nd customer is the richest with a wealth of 10.</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> accounts = [[2,8,7],[7,1,3],[1,9,5]]\n<strong>Output:</strong> 17\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m ==&nbsp;accounts.length</code></li>\n\t<li><code>n ==&nbsp;accounts[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 50</code></li>\n\t<li><code>1 &lt;= accounts[i][j] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "richest-customer-wealth",
    "leetcodeUrl": "https://leetcode.com/problems/richest-customer-wealth/",
    "entryFunction": "maximumWealth",
    "examples": [
      {
        "input": "accounts = [[1,2,3],[3,2,1]]",
        "output": "6"
      }
    ],
    "patternHints": [
      "Sum each row",
      "Track maximum"
    ],
    "starterCode": "var maximumWealth = function (accounts) {\n\n  // TODO\n\n};",
    "solutionCode": "var maximumWealth = function (accounts) {\n    let maxWealth = 0\n    for (let account of accounts) {\n        let wealth = account.reduce((acc, curr) => acc + curr, 0)\n        maxWealth = Math.max(maxWealth, wealth)\n    }\n    return maxWealth;\n};",
    "sampleInput": "{\"accounts\":[[1,2,3],[3,2,1]]}",
    "humanInput": "accounts = [[1,2,3],[3,2,1]]",
    "sampleOutput": "6",
    "sheetNumber": 1,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-002-two-sum",
    "title": "Two Sum",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Find two indices where nums[i] + nums[j] equals target.",
    "description": "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?",
    "leetcodeSlug": "two-sum",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
    "entryFunction": "twoSum",
    "examples": [
      {
        "input": "nums = [2,7,11,15]\ntarget = 9",
        "output": "[0,1]"
      }
    ],
    "patternHints": [
      "Hash map complement",
      "One pass"
    ],
    "starterCode": "var twoSum = function (nums, target) {\n\n  // TODO\n\n};",
    "solutionCode": "var twoSum = function (nums, target) {\n    const history = new Map()\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i]\n        if (history.has(diff)) {\n            return [history.get(diff), i]\n        } else {\n            history.set(nums[i], i)\n        }\n    }\n};",
    "sampleInput": "{\"nums\":[2,7,11,15],\"target\":9}",
    "humanInput": "nums = [2,7,11,15]\ntarget = 9",
    "sampleOutput": "[\n  0,\n  1\n]",
    "sheetNumber": 2,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-003-count-negative-numbers-in-a-sorted-matrix",
    "title": "Count negative numbers in a sorted matrix",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Count negative numbers in each sorted matrix row.",
    "description": "<p>Given a <code>m x n</code> matrix <code>grid</code> which is sorted in non-increasing order both row-wise and column-wise, return <em>the number of <strong>negative</strong> numbers in</em> <code>grid</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]\n<strong>Output:</strong> 8\n<strong>Explanation:</strong> There are 8 negatives number in the matrix.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[3,2],[1,0]]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>-100 &lt;= grid[i][j] &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you find an <code>O(n + m)</code> solution?",
    "leetcodeSlug": "count-negative-numbers-in-a-sorted-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
    "entryFunction": "countNegatives",
    "examples": [
      {
        "input": "grid = [[4,3,2,-1],[3,2,1,-1]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Start from right",
      "Row sorted"
    ],
    "starterCode": "var countNegatives = function (grid) {\n\n  // TODO\n\n};",
    "solutionCode": "var countNegatives = function (grid) {\n    let m = grid.length;\n    let n = grid[0].length;\n    let row = m - 1 // last row\n    let col = 0\n    let count = 0\n\n    while (row >= 0 && col < n) {\n        if (grid[row][col] < 0) { // first -ve num\n            count += (n - col)\n            row--;\n        } else {\n            col++;\n        }\n    }\n    return count;\n};",
    "sampleInput": "{\"grid\":[[4,3,2,-1],[3,2,1,-1]]}",
    "humanInput": "grid = [[4,3,2,-1],[3,2,1,-1]]",
    "sampleOutput": "2",
    "sheetNumber": 3,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-004-next-permutation",
    "title": "Next permutation",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Return the next lexicographically greater permutation.",
    "description": "<p>A <strong>permutation</strong> of an array of integers is an arrangement of its members into a sequence or linear order.</p>\n\n<ul>\n\t<li>For example, for <code>arr = [1,2,3]</code>, the following are all the permutations of <code>arr</code>: <code>[1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1]</code>.</li>\n</ul>\n\n<p>The <strong>next permutation</strong> of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the <strong>next permutation</strong> of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).</p>\n\n<ul>\n\t<li>For example, the next permutation of <code>arr = [1,2,3]</code> is <code>[1,3,2]</code>.</li>\n\t<li>Similarly, the next permutation of <code>arr = [2,3,1]</code> is <code>[3,1,2]</code>.</li>\n\t<li>While the next permutation of <code>arr = [3,2,1]</code> is <code>[1,2,3]</code> because <code>[3,2,1]</code> does not have a lexicographical larger rearrangement.</li>\n</ul>\n\n<p>Given an array of integers <code>nums</code>, <em>find the next permutation of</em> <code>nums</code>.</p>\n\n<p>The replacement must be <strong><a href=\"http://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in place</a></strong> and use only constant extra memory.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [1,3,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,1]\n<strong>Output:</strong> [1,2,3]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,5]\n<strong>Output:</strong> [1,5,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "next-permutation",
    "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
    "entryFunction": "nextPermutation",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[1,3,2]"
      }
    ],
    "patternHints": [
      "Find pivot",
      "Reverse suffix"
    ],
    "starterCode": "function solve(nums) {\n\n  // TODO\n\n}",
    "solutionCode": "var nextPermutation = function (nums) {\n    let n = nums.length;\n    // STEP 1: find breaking point\n    let pivot = -1;\n    for (let i = n - 2; i >= 0; i--) {\n        if (nums[i] < nums[i + 1]) {\n            pivot = i;\n            break;\n        }\n    }\n    // if no pivot => reverse whole array\n    if (pivot === -1) {\n        nums.reverse();\n        return;\n    }\n    // STEP 2: find next greater element\n    for (let i = n - 1; i > pivot; i--) {\n        if (nums[i] > nums[pivot]) {\n            [nums[i], nums[pivot]] = [nums[pivot], nums[i]];\n            break;\n        }\n    }\n    // STEP 3: reverse suffix\n    let left = pivot + 1;\n    let right = n - 1;\n    while (left < right) {\n        [nums[left], nums[right]] = [nums[right], nums[left]];\n        left++;\n        right--;\n    }\n}",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
    "sampleOutput": "[\n  1,\n  3,\n  2\n]",
    "sheetNumber": 4,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-005-linked-lists",
    "title": "Linked Lists",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Find the median of two sorted arrays.",
    "entryFunction": "findMedianSortedArrays",
    "examples": [
      {
        "input": "a = [1,3]\nb = [2]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Binary search partition",
      "Compare halves"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "var findMedianSortedArrays = function (nums1, nums2) {\n    const result = [...nums1, ...nums2].sort((a, b) => a - b)\n    const n = result.length\n    let median = 0\n    if (n % 2 === 0) {\n        median = (result[Math.floor(n / 2)] + result[Math.floor(n / 2) - 1]) / 2\n    } else {\n        median = result[Math.floor(n / 2)]\n    }\n    return median\n};",
    "sampleInput": "{\"nums1\":[1,3],\"nums2\":[2]}",
    "humanInput": "a = [1,3]\nb = [2]",
    "sampleOutput": "2",
    "sheetNumber": 5,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-006-find-greatest-common-divisor-of-array",
    "title": "Find greatest common divisor of array",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Return the GCD of all numbers in the array.",
    "description": "<p>Given an integer array <code>nums</code>, return<strong> </strong><em>the <strong>greatest common divisor</strong> of the smallest number and largest number in </em><code>nums</code>.</p>\n\n<p>The <strong>greatest common divisor</strong> of two numbers is the largest positive integer that evenly divides both numbers.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,5,6,9,10]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\nThe smallest number in nums is 2.\nThe largest number in nums is 10.\nThe greatest common divisor of 2 and 10 is 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,5,6,8,3]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nThe smallest number in nums is 3.\nThe largest number in nums is 8.\nThe greatest common divisor of 3 and 8 is 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\nThe smallest number in nums is 3.\nThe largest number in nums is 3.\nThe greatest common divisor of 3 and 3 is 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "find-greatest-common-divisor-of-array",
    "leetcodeUrl": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
    "entryFunction": "findGCD",
    "examples": [
      {
        "input": "nums = [2,4,6,8]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Euclid gcd",
      "Reduce array"
    ],
    "starterCode": "function solve(nums) {\n\n  // TODO\n\n}",
    "solutionCode": "var findGCD = function (nums) {\n    const arr = nums.sort((a, b) => a - b)\n    let maxCommon = 1\n    for (let i = 0; i <= arr[0]; i++) {\n        if (arr[arr.length - 1] % i === 0 && arr[0] % i === 0) {\n            maxCommon = Math.max(maxCommon, i)\n        }\n    }\n    return maxCommon\n};",
    "sampleInput": "{\"nums\":[2,4,6,8]}",
    "humanInput": "nums = [2,4,6,8]",
    "sampleOutput": "2",
    "sheetNumber": 6,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-007-self-dividing-numbers",
    "title": "Self dividing numbers",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Return all self-dividing numbers in [left, right].",
    "description": "<p>A <strong>self-dividing number</strong> is a number that is divisible by every digit it contains.</p>\n\n<ul>\n\t<li>For example, <code>128</code> is <strong>a self-dividing number</strong> because <code>128 % 1 == 0</code>, <code>128 % 2 == 0</code>, and <code>128 % 8 == 0</code>.</li>\n</ul>\n\n<p>A <strong>self-dividing number</strong> is not allowed to contain the digit zero.</p>\n\n<p>Given two integers <code>left</code> and <code>right</code>, return <em>a list of all the <strong>self-dividing numbers</strong> in the range</em> <code>[left, right]</code> (both <strong>inclusive</strong>).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> left = 1, right = 22\n<strong>Output:</strong> [1,2,3,4,5,6,7,8,9,11,12,15,22]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> left = 47, right = 85\n<strong>Output:</strong> [48,55,66,77]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= left &lt;= right &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "self-dividing-numbers",
    "leetcodeUrl": "https://leetcode.com/problems/self-dividing-numbers/",
    "entryFunction": "selfDividingNumbers",
    "examples": [
      {
        "input": "left = 1\nright = 22",
        "output": "[1,2,3,4,5,6,7,8,9,11,12,15,22]"
      }
    ],
    "patternHints": [
      "Check digits divide n",
      "Skip zero digits"
    ],
    "starterCode": "function solve(left, right) {\n\n  // TODO\n\n}",
    "solutionCode": "var selfDividingNumbers = function (left, right) {\n    if (left > right) return []\n    const result = []\n    for (let i = left; i <= right; i++) {\n        let temp = i.toString().split('')\n        let count = 0\n        for (let j = 0; j < temp.length; j++) {\n            if (i % Number(temp[j]) === 0) {\n                count++\n            }\n            if (count === temp.length) {\n                result.push(i)\n            }\n        }\n    }\n    return result\n};",
    "sampleInput": "{\"left\":1,\"right\":22}",
    "humanInput": "left = 1\nright = 22",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]",
    "sheetNumber": 7,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-008-inversion-of-array-1587115620",
    "title": "Inversion of array - 1587115620",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Count inversions in the array.",
    "examples": [
      {
        "input": "nums = [5,2,6,1]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Merge sort count",
      "Split merge"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const a = nums.slice();\n  const sort = (l, r) => {\n    if (r - l <= 1) return 0;\n    const m = (l + r) >> 1;\n    let c = sort(l, m) + sort(m, r), i = l, j = m, tmp = [];\n    while (i < m || j < r) {\n      if (j >= r || (i < m && a[i] <= a[j])) tmp.push(a[i++]);\n      else { tmp.push(a[j++]); c += m - i; }\n    }\n    for (let k = l; k < r; k++) a[k] = tmp[k - l];\n    return c;\n  };\n  return sort(0, a.length);\n}",
    "sampleInput": "{\"nums\":[5,2,6,1]}",
    "humanInput": "nums = [5,2,6,1]",
    "sampleOutput": "4",
    "sheetNumber": 8,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-009-reverse-pairs",
    "title": "Reverse pairs",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "hard",
    "statement": "Count pairs i<j with nums[i] > 2*nums[j].",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the number of <strong>reverse pairs</strong> in the array</em>.</p>\n\n<p>A <strong>reverse pair</strong> is a pair <code>(i, j)</code> where:</p>\n\n<ul>\n\t<li><code>0 &lt;= i &lt; j &lt; nums.length</code> and</li>\n\t<li><code>nums[i] &gt; 2 * nums[j]</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,2,3,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The reverse pairs are:\n(1, 4) --&gt; nums[1] = 3, nums[4] = 1, 3 &gt; 2 * 1\n(3, 4) --&gt; nums[3] = 3, nums[4] = 1, 3 &gt; 2 * 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,4,3,5,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The reverse pairs are:\n(1, 4) --&gt; nums[1] = 4, nums[4] = 1, 4 &gt; 2 * 1\n(2, 4) --&gt; nums[2] = 3, nums[4] = 1, 3 &gt; 2 * 1\n(3, 4) --&gt; nums[3] = 5, nums[4] = 1, 5 &gt; 2 * 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "leetcodeSlug": "reverse-pairs",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-pairs/",
    "entryFunction": "reversePairs",
    "examples": [
      {
        "input": "nums = [1,3,2,3,1]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Merge sort",
      "Count before merge"
    ],
    "starterCode": "function solve(nums) {\n\n  // TODO\n\n}",
    "solutionCode": "var reversePairs = function (nums) {\n    let count = 0;\n    const mergeSort = (left, right) => {\n        // base case\n        if (left >= right) return;\n        let mid = Math.floor((left + right) / 2);\n        mergeSort(left, mid);\n        mergeSort(mid + 1, right);\n        // count reverse pairs\n        let j = mid + 1;\n        for (let i = left; i <= mid; i++) {\n            while (j <= right && nums[i] > 2 * nums[j]) {\n                j++;\n            }\n            count += j - (mid + 1);\n        }\n        // merge step\n        let temp = [];\n        let i = left;\n        j = mid + 1;\n        while (i <= mid && j <= right) {\n            if (nums[i] <= nums[j]) {\n                temp.push(nums[i]);\n                i++;\n            } else {\n                temp.push(nums[j]);\n                j++;\n            }\n        }\n        while (i <= mid) {\n            temp.push(nums[i]);\n            i++;\n        }\n        while (j <= right) {\n            temp.push(nums[j]);\n            j++;\n        }\n        for (let k = left; k <= right; k++) {\n            nums[k] = temp[k - left];\n        }\n    };\n\n    mergeSort(0, nums.length - 1);\n    return count;\n};",
    "sampleInput": "{\"nums\":[1,3,2,3,1]}",
    "humanInput": "nums = [1,3,2,3,1]",
    "sampleOutput": "2",
    "sheetNumber": 9,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-1-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-010-special-positions-in-a-binary-matrix",
    "title": "Special positions in a binary matrix",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Count 1-cells that are alone in their row and column.",
    "description": "<p>Given an <code>m x n</code> binary matrix <code>mat</code>, return <em>the number of special positions in </em><code>mat</code><em>.</em></p>\n\n<p>A position <code>(i, j)</code> is called <strong>special</strong> if <code>mat[i][j] == 1</code> and all other elements in row <code>i</code> and column <code>j</code> are <code>0</code> (rows and columns are <strong>0-indexed</strong>).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/12/23/special1.jpg\" style=\"width: 244px; height: 245px;\" />\n<pre>\n<strong>Input:</strong> mat = [[1,0,0],[0,0,1],[1,0,0]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> (1, 2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/12/24/special-grid.jpg\" style=\"width: 244px; height: 245px;\" />\n<pre>\n<strong>Input:</strong> mat = [[1,0,0],[0,1,0],[0,0,1]]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> (0, 0), (1, 1) and (2, 2) are special positions.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == mat.length</code></li>\n\t<li><code>n == mat[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>mat[i][j]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "special-positions-in-a-binary-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/special-positions-in-a-binary-matrix/",
    "entryFunction": "numSpecial",
    "examples": [
      {
        "input": "nums = [[1,0,0],[0,1,0],[0,0,1]]",
        "output": "3"
      }
    ],
    "patternHints": [
      "Row/col counts",
      "Check special cells"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "var numSpecial = function (mat) {\n    let m = mat.length\n    let n = mat[0].length\n    let rowCount = new Array(m).fill(0)\n    let colCount = new Array(n).fill(0)\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 1) {\n                rowCount[i]++\n                colCount[j]++\n            }\n        }\n    }\n    let count = 0\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 1 && rowCount[i] === 1 && colCount[j] === 1) {\n                count++;\n            }\n        }\n    }\n    return count\n};",
    "sampleInput": "{\"nums\":[[1,0,0],[0,1,0],[0,0,1]]}",
    "humanInput": "nums = [[1,0,0],[0,1,0],[0,0,1]]",
    "sampleOutput": "3",
    "sheetNumber": 10,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-2-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-011-transpose-matrix",
    "title": "Transpose Matrix",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Return the transpose of the matrix.",
    "description": "<p>Given a 2D integer array <code>matrix</code>, return <em>the <strong>transpose</strong> of</em> <code>matrix</code>.</p>\n\n<p>The <strong>transpose</strong> of a matrix is the matrix flipped over its main diagonal, switching the matrix&#39;s row and column indices.</p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/10/hint_transpose.png\" style=\"width: 600px; height: 197px;\" /></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [[1,4,7],[2,5,8],[3,6,9]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6]]\n<strong>Output:</strong> [[1,4],[2,5],[3,6]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 1000</code></li>\n\t<li><code>1 &lt;= m * n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "transpose-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/transpose-matrix/",
    "entryFunction": "transpose",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "output": "[[1,4],[2,5],[3,6]]"
      }
    ],
    "patternHints": [
      "Swap indices",
      "New rows from columns"
    ],
    "starterCode": "function solve(matrix) {\n\n  // TODO\n\n}",
    "solutionCode": "var transpose = function (matrix) {\n    let m = matrix.length\n    let n = matrix[0].length\n    let result = new Array(n).fill(0).map(() => new Array(m))\n\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < m; j++) {\n            result[i][j] = matrix[j][i]\n        }\n    }\n\n    return result\n};",
    "sampleInput": "{\"matrix\":[[1,2,3],[4,5,6]]}",
    "humanInput": "matrix = [[1,2,3],[4,5,6]]",
    "sampleOutput": "[\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    5\n  ],\n  [\n    3,\n    6\n  ]\n]",
    "sheetNumber": 11,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-2-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-012-01-matrix",
    "title": "01 Matrix",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Return distance to nearest 0 for each cell.",
    "description": "<p>Given an <code>m x n</code> binary matrix <code>mat</code>, return <em>the distance of the nearest </em><code>0</code><em> for each cell</em>.</p>\n\n<p>The distance between two cells sharing a common edge is <code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/24/01-1-grid.jpg\" style=\"width: 253px; height: 253px;\" />\n<pre>\n<strong>Input:</strong> mat = [[0,0,0],[0,1,0],[0,0,0]]\n<strong>Output:</strong> [[0,0,0],[0,1,0],[0,0,0]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/24/01-2-grid.jpg\" style=\"width: 253px; height: 253px;\" />\n<pre>\n<strong>Input:</strong> mat = [[0,0,0],[0,1,0],[1,1,1]]\n<strong>Output:</strong> [[0,0,0],[0,1,0],[1,2,1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == mat.length</code></li>\n\t<li><code>n == mat[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>mat[i][j]</code> is either <code>0</code> or <code>1</code>.</li>\n\t<li>There is at least one <code>0</code> in <code>mat</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as 1765: <a href=\"https://leetcode.com/problems/map-of-highest-peak/description/\" target=\"_blank\">https://leetcode.com/problems/map-of-highest-peak/</a></p>\n",
    "leetcodeSlug": "01-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/01-matrix/",
    "entryFunction": "updateMatrix",
    "examples": [
      {
        "input": "nums = [[0,0,0],[0,1,0],[0,0,0]]",
        "output": "[[0,0,0],[0,1,0],[0,0,0]]"
      }
    ],
    "patternHints": [
      "Multi-source BFS",
      "Layer expansion"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "var updateMatrix = function (mat) {\n    let m = mat.length;\n    let n = mat[0].length;\n    let queue = [];\n\n    // Step 1: Put all 0s into queue\n    // and mark 1s as Infinity\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 0) {\n                queue.push([i, j]);\n            } else {\n                mat[i][j] = Infinity;\n            }\n        }\n    }\n\n    // 4 directions\n    let dirs = [[1, 0], [-1, 0],[0, 1],[0, -1]];\n\n    // Step 2: BFS\n    while (queue.length > 0) {\n        let [r, c] = queue.shift();\n\n        for (let [dr, dc] of dirs) {\n            let nr = r + dr;\n            let nc = c + dc;\n\n            // boundary check\n            if (nr >= 0 && nr < m &&\n                nc >= 0 && nc < n\n            ) {\n                // If shorter distance found\n                if (mat[nr][nc] > mat[r][c] + 1) {\n                    mat[nr][nc] = mat[r][c] + 1;\n                    queue.push([nr, nc]);\n                }\n            }\n        }\n    }\n\n    return mat;\n};",
    "sampleInput": "{\"nums\":[[0,0,0],[0,1,0],[0,0,0]]}",
    "humanInput": "nums = [[0,0,0],[0,1,0],[0,0,0]]",
    "sampleOutput": "[\n  [\n    0,\n    0,\n    0\n  ],\n  [\n    0,\n    1,\n    0\n  ],\n  [\n    0,\n    0,\n    0\n  ]\n]",
    "sheetNumber": 12,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-2-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-013-spiral-matrix",
    "title": "Spiral Matrix",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Return matrix elements in spiral order.",
    "description": "<p>Given an <code>m x n</code> <code>matrix</code>, return <em>all elements of the</em> <code>matrix</code> <em>in spiral order</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [1,2,3,6,9,8,7,4,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\n<strong>Output:</strong> [1,2,3,4,8,12,11,10,9,5,6,7]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10</code></li>\n\t<li><code>-100 &lt;= matrix[i][j] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "spiral-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
    "entryFunction": "spiralOrder",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[1,2,3,6,9,8,7,4,5]"
      }
    ],
    "patternHints": [
      "Four boundaries",
      "Shrink while walking"
    ],
    "starterCode": "function solve(matrix) {\n\n  // TODO\n\n}",
    "solutionCode": "var spiralOrder = function (matrix) {\n    const res = [];\n    let top = 0;\n    let bottom = matrix.length - 1;\n    let left = 0;\n    let right = matrix[0].length - 1;\n\n    while (top <= bottom && left <= right) {\n        // LEFT → RIGHT\n        for (let j = left; j <= right; j++) {\n            res.push(matrix[top][j]);\n        }\n        top++;\n\n        // TOP → BOTTOM\n        for (let i = top; i <= bottom; i++) {\n            res.push(matrix[i][right]);\n        }\n        right--;\n\n        // RIGHT → LEFT\n        if (top <= bottom) {\n            for (let j = right; j >= left; j--) {\n                res.push(matrix[bottom][j]);\n            }\n            bottom--;\n        }\n\n        // BOTTOM → TOP\n        if (left <= right) {\n            for (let i = bottom; i >= top; i--) {\n                res.push(matrix[i][left]);\n            }\n            left++;\n        }\n    }\n\n    return res;\n};",
    "sampleInput": "{\"matrix\":[[1,2,3],[4,5,6],[7,8,9]]}",
    "humanInput": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  6,\n  9,\n  8,\n  7,\n  4,\n  5\n]",
    "sheetNumber": 13,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-2-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-014-pascal-s-triangle",
    "title": "Pascal's Triangle",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "easy",
    "statement": "Generate Pascal's triangle with numRows rows.",
    "description": "<p>Given an integer <code>numRows</code>, return the first numRows of <strong>Pascal&#39;s triangle</strong>.</p>\n\n<p>In <strong>Pascal&#39;s triangle</strong>, each number is the sum of the two numbers directly above it as shown:</p>\n<img alt=\"\" src=\"https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif\" style=\"height:240px; width:260px\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> numRows = 5\n<strong>Output:</strong> [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> numRows = 1\n<strong>Output:</strong> [[1]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numRows &lt;= 30</code></li>\n</ul>\n",
    "leetcodeSlug": "pascals-triangle",
    "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle/",
    "entryFunction": "generate",
    "examples": [
      {
        "input": "numRows = 5",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]"
      }
    ],
    "patternHints": [
      "Previous row sums",
      "Edge ones"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "var generate = function (numRows) {\n    const res = []\n    for (let i = 0; i < numRows; i++) {\n        let row = new Array(i + 1).fill(1)\n\n        for (let j = 1; j < i; j++) {\n            row[j] = res[i - 1][j - 1] + res[i - 1][j]\n        }\n        res.push(row)\n    }\n    return res\n};",
    "sampleInput": "{\"numRows\":5}",
    "humanInput": "numRows = 5",
    "sampleOutput": "[\n  [\n    1\n  ],\n  [\n    1,\n    1\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    1,\n    3,\n    3,\n    1\n  ],\n  [\n    1,\n    4,\n    6,\n    4,\n    1\n  ]\n]",
    "sheetNumber": 14,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-2-d-array",
    "source": "sheet"
  },
  {
    "id": "bc-015-minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "patternSlug": "prefix-sum",
    "patternName": "Prefix Sum",
    "difficulty": "easy",
    "statement": "Minimal length subarray with sum >= target.",
    "description": "<p>Given an integer array <code>nums</code>, handle multiple queries of the following type:</p>\n\n<ol>\n\t<li>Calculate the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> where <code>left &lt;= right</code>.</li>\n</ol>\n\n<p>Implement the <code>NumArray</code> class:</p>\n\n<ul>\n\t<li><code>NumArray(int[] nums)</code> Initializes the object with the integer array <code>nums</code>.</li>\n\t<li><code>int sumRange(int left, int right)</code> Returns the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> (i.e. <code>nums[left] + nums[left + 1] + ... + nums[right]</code>).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;NumArray&quot;, &quot;sumRange&quot;, &quot;sumRange&quot;, &quot;sumRange&quot;]\n[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]\n<strong>Output</strong>\n[null, 1, -1, -3]\n\n<strong>Explanation</strong>\nNumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);\nnumArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1\nnumArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1\nnumArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= left &lt;= right &lt; nums.length</code></li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>sumRange</code>.</li>\n</ul>\n",
    "leetcodeSlug": "range-sum-query-immutable",
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-immutable/",
    "entryFunction": "minSubArrayLen",
    "examples": [
      {
        "input": "nums = [2,3,1,2,4,3]\ntarget = 7",
        "output": "2"
      }
    ],
    "patternHints": [
      "Sliding window",
      "Shrink when valid"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "var minSubArrayLen = function (target, arr) {\n    let minSub = Infinity;\n    let windowSum = 0;\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        while (windowSum >= target) {\n            minSub = Math.min(minSub, end - start + 1)\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return minSub === Infinity ? 0 : minSub;\n};",
    "sampleInput": "{\"target\":7,\"arr\":[2,3,1,2,4,3]}",
    "humanInput": "nums = [2,3,1,2,4,3]\ntarget = 7",
    "sampleOutput": "2",
    "sheetNumber": 15,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-prefix-sum",
    "source": "sheet"
  },
  {
    "id": "bc-016-running-sum-of-1d-array",
    "title": "Running Sum of 1d Array",
    "patternSlug": "prefix-sum",
    "patternName": "Prefix Sum",
    "difficulty": "easy",
    "statement": "Return running sum of nums.",
    "description": "<p>Given an array <code>nums</code>. We define a running sum of an array as&nbsp;<code>runningSum[i] = sum(nums[0]&hellip;nums[i])</code>.</p>\n\n<p>Return the running sum of <code>nums</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> [1,3,6,10]\n<strong>Explanation:</strong> Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,1,1,1]\n<strong>Output:</strong> [1,2,3,4,5]\n<strong>Explanation:</strong> Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,1,2,10,1]\n<strong>Output:</strong> [3,4,6,16,17]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>-10^6&nbsp;&lt;= nums[i] &lt;=&nbsp;10^6</code></li>\n</ul>\n",
    "leetcodeSlug": "running-sum-of-1d-array",
    "leetcodeUrl": "https://leetcode.com/problems/running-sum-of-1d-array/",
    "entryFunction": "runningSum",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[1,3,6,10]"
      }
    ],
    "patternHints": [
      "Prefix in place",
      "Add previous"
    ],
    "starterCode": "var runningSum = function (nums) {\n\n  // TODO\n\n};",
    "solutionCode": "var runningSum = function (nums) {\n    const n = nums.length\n    const prefix = new Array(n + 1).fill(0)\n    for (let i = 1; i <= n; i++) {\n        prefix[i] = prefix[i - 1] + nums[i - 1]\n    }\n    prefix.shift()\n    return prefix\n};",
    "sampleInput": "{\"nums\":[1,2,3,4]}",
    "humanInput": "nums = [1,2,3,4]",
    "sampleOutput": "[\n  1,\n  3,\n  6,\n  10\n]",
    "sheetNumber": 16,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-prefix-sum",
    "source": "sheet"
  },
  {
    "id": "bc-017-range-sum-query-2d-immutable",
    "title": "Range Sum Query 2D Immutable",
    "patternSlug": "prefix-sum",
    "patternName": "Prefix Sum",
    "difficulty": "medium",
    "statement": "Answer 2D range sum query using prefix sums.",
    "description": "<p>Given a 2D matrix <code>matrix</code>, handle multiple queries of the following type:</p>\n\n<ul>\n\t<li>Calculate the <strong>sum</strong> of the elements of <code>matrix</code> inside the rectangle defined by its <strong>upper left corner</strong> <code>(row1, col1)</code> and <strong>lower right corner</strong> <code>(row2, col2)</code>.</li>\n</ul>\n\n<p>Implement the <code>NumMatrix</code> class:</p>\n\n<ul>\n\t<li><code>NumMatrix(int[][] matrix)</code> Initializes the object with the integer matrix <code>matrix</code>.</li>\n\t<li><code>int sumRegion(int row1, int col1, int row2, int col2)</code> Returns the <strong>sum</strong> of the elements of <code>matrix</code> inside the rectangle defined by its <strong>upper left corner</strong> <code>(row1, col1)</code> and <strong>lower right corner</strong> <code>(row2, col2)</code>.</li>\n</ul>\n\n<p>You must design an algorithm where <code>sumRegion</code> works on <code>O(1)</code> time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/sum-grid.jpg\" style=\"width: 415px; height: 415px;\" />\n<pre>\n<strong>Input</strong>\n[&quot;NumMatrix&quot;, &quot;sumRegion&quot;, &quot;sumRegion&quot;, &quot;sumRegion&quot;]\n[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]\n<strong>Output</strong>\n[null, 8, 11, 12]\n\n<strong>Explanation</strong>\nNumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);\nnumMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)\nnumMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)\nnumMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= matrix[i][j] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= row1 &lt;= row2 &lt; m</code></li>\n\t<li><code>0 &lt;= col1 &lt;= col2 &lt; n</code></li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>sumRegion</code>.</li>\n</ul>\n",
    "leetcodeSlug": "range-sum-query-2d-immutable",
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-2d-immutable/",
    "examples": [
      {
        "input": "nums = [[3,0,1],[5,6,3],[1,2,0]]\nrow1 = 1\ncol1 = 1\nrow2 = 2\ncol2 = 2",
        "output": "11"
      }
    ],
    "patternHints": [
      "2D prefix table",
      "Inclusion-exclusion"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const mat = input.nums;\n  const { row1, col1, row2, col2 } = input;\n  const obj = new NumMatrix(mat);\n  return obj.sumRegion(row1, col1, row2, col2);\n}\n\nvar NumMatrix = function (matrix) {\n    let rows = matrix.length;\n    let cols = matrix[0].length;\n\n    // Extra row and column\n    this.prefix = Array(rows + 1)\n        .fill(0)\n        .map(() => Array(cols + 1).fill(0));\n\n    // Build prefix sum\n    for (let r = 0; r < rows; r++) {\n        for (let c = 0; c < cols; c++) {\n\n            this.prefix[r + 1][c + 1] =\n                matrix[r][c]\n                + this.prefix[r][c + 1]\n                + this.prefix[r + 1][c]\n                - this.prefix[r][c];\n        }\n    }\n};\n\n\nNumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {\n    return (\n        this.prefix[row2 + 1][col2 + 1]\n        - this.prefix[row1][col2 + 1]\n        - this.prefix[row2 + 1][col1]\n        + this.prefix[row1][col1]\n    );\n};",
    "sampleInput": "{\"nums\":[[3,0,1],[5,6,3],[1,2,0]],\"row1\":1,\"col1\":1,\"row2\":2,\"col2\":2}",
    "humanInput": "nums = [[3,0,1],[5,6,3],[1,2,0]]\nrow1 = 1\ncol1 = 1\nrow2 = 2\ncol2 = 2",
    "sampleOutput": "11",
    "sheetNumber": 17,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-prefix-sum",
    "source": "sheet"
  },
  {
    "id": "bc-018-maximum-subarray",
    "title": "Maximum Subarray",
    "patternSlug": "kadane",
    "patternName": "Kadane's Algorithm",
    "difficulty": "medium",
    "statement": "Find maximum sum contiguous subarray.",
    "description": "<p>Given an integer array <code>nums</code>, find the <span data-keyword=\"subarray-nonempty\">subarray</span> with the largest sum, and return <em>its sum</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The subarray [4,-1,2,1] has the largest sum 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The subarray [1] has the largest sum 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [5,4,-1,7,8]\n<strong>Output:</strong> 23\n<strong>Explanation:</strong> The subarray [5,4,-1,7,8] has the largest sum 23.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution using the <strong>divide and conquer</strong> approach, which is more subtle.</p>\n",
    "leetcodeSlug": "maximum-subarray",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
    "entryFunction": "maxSubArray",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6"
      }
    ],
    "patternHints": [
      "Kadane",
      "Best ending here"
    ],
    "starterCode": "var maxSubArray = function (nums) {\n\n  // TODO\n\n};",
    "solutionCode": "var maxSubArray = function (nums) {\n    let currentSum = nums[0]\n    let maxSum = nums[0]\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], nums[i] + currentSum)\n        maxSum = Math.max(currentSum, maxSum)\n    }\n    return maxSum;\n};",
    "sampleInput": "{\"nums\":[-2,1,-3,4,-1,2,1,-5,4]}",
    "humanInput": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    "sampleOutput": "6",
    "sheetNumber": 18,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-kadane-s-algorithm",
    "source": "sheet"
  },
  {
    "id": "bc-019-maximum-sum-circular-subarray",
    "title": "Maximum Sum Circular Subarray",
    "patternSlug": "kadane",
    "patternName": "Kadane's Algorithm",
    "difficulty": "medium",
    "statement": "Maximum subarray sum on a circular array.",
    "description": "<p>Given a <strong>circular integer array</strong> <code>nums</code> of length <code>n</code>, return <em>the maximum possible sum of a non-empty <strong>subarray</strong> of </em><code>nums</code>.</p>\n\n<p>A <strong>circular array</strong> means the end of the array connects to the beginning of the array. Formally, the next element of <code>nums[i]</code> is <code>nums[(i + 1) % n]</code> and the previous element of <code>nums[i]</code> is <code>nums[(i - 1 + n) % n]</code>.</p>\n\n<p>A <strong>subarray</strong> may only include each element of the fixed buffer <code>nums</code> at most once. Formally, for a subarray <code>nums[i], nums[i + 1], ..., nums[j]</code>, there does not exist <code>i &lt;= k1</code>, <code>k2 &lt;= j</code> with <code>k1 % n == k2 % n</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,-2,3,-2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Subarray [3] has maximum sum 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [5,-3,5]\n<strong>Output:</strong> 10\n<strong>Explanation:</strong> Subarray [5,5] has maximum sum 5 + 5 = 10.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-3,-2,-3]\n<strong>Output:</strong> -2\n<strong>Explanation:</strong> Subarray [-2] has maximum sum -2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "maximum-sum-circular-subarray",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    "entryFunction": "maxSubarraySumCircular",
    "examples": [
      {
        "input": "nums = [5,-3,5]",
        "output": "10"
      }
    ],
    "patternHints": [
      "Kadane + total-min",
      "Handle all-negative"
    ],
    "starterCode": "function solve(nums) {\n\n  // TODO\n\n}",
    "solutionCode": "var maxSubarraySumCircular = function (nums) {\n    let total = 0\n    let curMax = 0\n    let maxSum = nums[0]\n    let curMin = 0\n    let minSum = nums[0]\n\n    for (let num of nums) {\n        // Kadane for maximum\n        curMax = Math.max(curMax + num, num)\n        maxSum = Math.max(maxSum, curMax)\n\n        // Kadane for minimum\n        curMin = Math.min(curMin + num, num)\n        minSum = Math.min(minSum, curMin)\n\n        total += num\n    }\n    // all negative case\n    if (maxSum < 0) return maxSum\n\n    return Math.max(maxSum, total - minSum)\n};",
    "sampleInput": "{\"nums\":[5,-3,5]}",
    "humanInput": "nums = [5,-3,5]",
    "sampleOutput": "10",
    "sheetNumber": 19,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-kadane-s-algorithm",
    "source": "sheet"
  },
  {
    "id": "bc-020-longest-turbulent-subarray",
    "title": "Longest Turbulent Subarray",
    "patternSlug": "kadane",
    "patternName": "Kadane's Algorithm",
    "difficulty": "medium",
    "statement": "Longest turbulent subarray length.",
    "description": "<p>Given an integer array <code>arr</code>, return <em>the length of a maximum size turbulent subarray of</em> <code>arr</code>.</p>\n\n<p>A subarray is <strong>turbulent</strong> if the comparison sign flips between each adjacent pair of elements in the subarray.</p>\n\n<p>More formally, a subarray <code>[arr[i], arr[i + 1], ..., arr[j]]</code> of <code>arr</code> is said to be turbulent if and only if:</p>\n\n<ul>\n\t<li>For <code>i &lt;= k &lt; j</code>:\n\n\t<ul>\n\t\t<li><code>arr[k] &gt; arr[k + 1]</code> when <code>k</code> is odd, and</li>\n\t\t<li><code>arr[k] &lt; arr[k + 1]</code> when <code>k</code> is even.</li>\n\t</ul>\n\t</li>\n\t<li>Or, for <code>i &lt;= k &lt; j</code>:\n\t<ul>\n\t\t<li><code>arr[k] &gt; arr[k + 1]</code> when <code>k</code> is even, and</li>\n\t\t<li><code>arr[k] &lt; arr[k + 1]</code> when <code>k</code> is odd.</li>\n\t</ul>\n\t</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [9,4,2,10,7,8,8,1,9]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> arr[1] &gt; arr[2] &lt; arr[3] &gt; arr[4] &lt; arr[5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [4,8,12,16]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [100]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= arr.length &lt;= 4 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= arr[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "longest-turbulent-subarray",
    "leetcodeUrl": "https://leetcode.com/problems/longest-turbulent-subarray/",
    "entryFunction": "maxTurbulenceSize",
    "examples": [
      {
        "input": "arr = [9,4,2,10,7,8,8,1,9]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Compare neighbors",
      "Alternate up/down"
    ],
    "starterCode": "function solve(arr) {\n\n  // TODO\n\n}",
    "solutionCode": "var maxTurbulenceSize = function (arr) {\n    const n = arr.length\n    if (n === 1) return 1\n    let maxLen = 1\n    let up = 1\n    let down = 1\n    for (let i = 1; i < n; i++) {\n        if (arr[i] > arr[i - 1]) {\n            up = down + 1\n            down = 1\n        } else if (arr[i] < arr[i - 1]) {\n            down = up + 1\n            up = 1\n        } else {\n            up = 1\n            down = 1\n        }\n        maxLen = Math.max(maxLen, up, down)\n    }\n    return maxLen\n};",
    "sampleInput": "{\"arr\":[9,4,2,10,7,8,8,1,9]}",
    "humanInput": "arr = [9,4,2,10,7,8,8,1,9]",
    "sampleOutput": "4",
    "sheetNumber": 20,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-kadane-s-algorithm",
    "source": "sheet"
  },
  {
    "id": "bc-021-contains-duplicate-ii",
    "title": "Contains Duplicate II",
    "patternSlug": "sliding-window",
    "patternName": "Sliding Window",
    "difficulty": "easy",
    "statement": "True if duplicate exists within index distance k.",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <code>true</code> <em>if there are two <strong>distinct indices</strong> </em><code>i</code><em> and </em><code>j</code><em> in the array such that </em><code>nums[i] == nums[j]</code><em> and </em><code>abs(i - j) &lt;= k</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1], k = 3\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,1,1], k = 1\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1,2,3], k = 2\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "contains-duplicate-ii",
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate-ii/",
    "entryFunction": "containsNearbyDuplicate",
    "examples": [
      {
        "input": "nums = [1,2,3,1]\nk = 3",
        "output": "true"
      }
    ],
    "patternHints": [
      "Hash last index",
      "Check distance"
    ],
    "starterCode": "function solve(nums, k) {\n\n  // TODO\n\n}",
    "solutionCode": "var containsNearbyDuplicate = function (nums, k) {\n    let seen = new Set();\n    let left = 0;\n\n    for (let right = 0; right < nums.length; right++) {\n        // duplicate inside window\n        if (seen.has(nums[right])) {\n            return true;\n        }\n        seen.add(nums[right]);\n        // maintain window size <= k\n        if (right - left >= k) {\n            seen.delete(nums[left]);\n            left++;\n        }\n    }\n\n    return false;\n};",
    "sampleInput": "{\"nums\":[1,2,3,1],\"k\":3}",
    "humanInput": "nums = [1,2,3,1]\nk = 3",
    "sampleOutput": "true",
    "sheetNumber": 21,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-sliding-window-fixed-variable-size",
    "source": "sheet"
  },
  {
    "id": "bc-022-number-of-sub-arrays-of-size-k-and-average",
    "title": "Number of Sub-arrays of Size K and Average ..",
    "patternSlug": "sliding-window",
    "patternName": "Sliding Window",
    "difficulty": "easy",
    "statement": "Count length-k subarrays with average >= threshold.",
    "examples": [
      {
        "input": "nums = [2,2,2,2,5,5,5,8]\nk = 3\nthreshold = 4",
        "output": "3"
      }
    ],
    "patternHints": [
      "Fixed window",
      "Compare sum/k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return numOfSubarrays(input.nums, input.k, input.threshold);\n}\n\nvar numOfSubarrays = function (arr, k, threshold) {\n    let windowSum = 0;\n    let count = 0\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        if (end - start + 1 === k) {\n            if (Math.floor(windowSum / k) >= threshold) count++;\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return count;\n};",
    "sampleInput": "{\"nums\":[2,2,2,2,5,5,5,8],\"k\":3,\"threshold\":4}",
    "humanInput": "nums = [2,2,2,2,5,5,5,8]\nk = 3\nthreshold = 4",
    "sampleOutput": "3",
    "sheetNumber": 22,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-sliding-window-fixed-variable-size",
    "source": "sheet"
  },
  {
    "id": "bc-023-minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "patternSlug": "sliding-window",
    "patternName": "Sliding Window",
    "difficulty": "medium",
    "statement": "Minimal length subarray with sum >= target.",
    "description": "<p>Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return <em>the <strong>minimal length</strong> of a </em><span data-keyword=\"subarray-nonempty\"><em>subarray</em></span><em> whose sum is greater than or equal to</em> <code>target</code>. If there is no such subarray, return <code>0</code> instead.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> target = 7, nums = [2,3,1,2,4,3]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The subarray [4,3] has the minimal length under the problem constraint.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> target = 4, nums = [1,4,4]\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> target = 11, nums = [1,1,1,1,1,1,1,1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution of which the time complexity is <code>O(n log(n))</code>.",
    "leetcodeSlug": "minimum-size-subarray-sum",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "entryFunction": "minSubArrayLen",
    "examples": [
      {
        "input": "target = 7\nnums = [2,3,1,2,4,3]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Variable window",
      "Shrink when valid"
    ],
    "starterCode": "function solve(target, nums) {\n\n  // TODO\n\n}",
    "solutionCode": "var minSubArrayLen = function (target, arr) {\n    let minSub = Infinity;\n    let windowSum = 0;\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        while (windowSum >= target) {\n            minSub = Math.min(minSub, end - start + 1)\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return minSub === Infinity ? 0 : minSub;\n};",
    "sampleInput": "{\"target\":7,\"arr\":[2,3,1,2,4,3]}",
    "humanInput": "target = 7\nnums = [2,3,1,2,4,3]",
    "sampleOutput": "2",
    "sheetNumber": 23,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-sliding-window-fixed-variable-size",
    "source": "sheet"
  },
  {
    "id": "bc-024-longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "patternSlug": "sliding-window",
    "patternName": "Sliding Window",
    "difficulty": "medium",
    "statement": "Longest substring without repeating characters.",
    "description": "<p>Given a string <code>s</code>, find the length of the <strong>longest</strong> <span data-keyword=\"substring-nonempty\"><strong>substring</strong></span> without duplicate characters.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;abcabcbb&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is &quot;abc&quot;, with the length of 3. Note that <code>&quot;bca&quot;</code> and <code>&quot;cab&quot;</code> are also correct answers.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;bbbbb&quot;\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The answer is &quot;b&quot;, with the length of 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;pwwkew&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is &quot;wke&quot;, with the length of 3.\nNotice that the answer must be a substring, &quot;pwke&quot; is a subsequence and not a substring.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of English letters, digits, symbols and spaces.</li>\n</ul>\n",
    "leetcodeSlug": "longest-substring-without-repeating-characters",
    "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "entryFunction": "lengthOfLongestSubstring",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3"
      }
    ],
    "patternHints": [
      "Sliding window",
      "Set of chars"
    ],
    "starterCode": "function solve(s) {\n\n  // TODO\n\n}",
    "solutionCode": "var lengthOfLongestSubstring = function (s) {\n    let state = {}\n    let maxLength = 0\n    let start = 0\n\n    for (let end = 0; end < s.length; end++) {\n        state[s[end]] = (state[s[end]] || 0) + 1;\n        while (state[s[end]] > 1) {\n            state[s[start]]--;\n            start++;\n        }\n        maxLength = Math.max(maxLength, end - start + 1);\n    }\n    return maxLength;\n};",
    "sampleInput": "{\"s\":\"abcabcbb\"}",
    "humanInput": "s = \"abcabcbb\"",
    "sampleOutput": "3",
    "sheetNumber": 24,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-sliding-window-fixed-variable-size",
    "source": "sheet"
  },
  {
    "id": "bc-025-longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "patternSlug": "sliding-window",
    "patternName": "Sliding Window",
    "difficulty": "medium",
    "statement": "Longest substring with at most k replacements.",
    "description": "<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p>\n\n<p>Return <em>the length of the longest substring containing the same letter you can get after performing the above operations</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ABAB&quot;, k = 2\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Replace the two &#39;A&#39;s with two &#39;B&#39;s or vice versa.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;AABABBA&quot;, k = 1\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Replace the one &#39;A&#39; in the middle with &#39;B&#39; and form &quot;AABBBBA&quot;.\nThe substring &quot;BBBB&quot; has the longest repeating letters, which is 4.\nThere may exists other ways to achieve this answer too.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of only uppercase English letters.</li>\n\t<li><code>0 &lt;= k &lt;= s.length</code></li>\n</ul>\n",
    "leetcodeSlug": "longest-repeating-character-replacement",
    "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "entryFunction": "characterReplacement",
    "examples": [
      {
        "input": "s = \"AABABBA\"\nk = 1",
        "output": "4"
      }
    ],
    "patternHints": [
      "Window counts",
      "maxFreq + k"
    ],
    "starterCode": "function solve(s, k) {\n\n  // TODO\n\n}",
    "solutionCode": "var characterReplacement = function (s, k) {\n    let charCount = {}\n    let maxFreq = 0\n    let maxLength = 0\n    let start = 0\n\n    for (let end = 0; end < s.length; end++) {\n        charCount[s[end]] = (charCount[s[end]] || 0) + 1\n        maxFreq = Math.max(maxFreq, charCount[s[end]])\n\n        if ((end - start + 1) - maxFreq > k) {\n            charCount[s[start]]--;\n            start++\n        }\n        maxLength = Math.max(maxLength, end - start + 1)\n    }\n    return maxLength;\n};",
    "sampleInput": "{\"s\":\"AABABBA\",\"k\":1}",
    "humanInput": "s = \"AABABBA\"\nk = 1",
    "sampleOutput": "4",
    "sheetNumber": 25,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-sliding-window-fixed-variable-size",
    "source": "sheet"
  },
  {
    "id": "bc-026-container-with-most-water",
    "title": "Container With Most Water",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Max water area between vertical lines.",
    "description": "<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>\n\n<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>\n\n<p>Return <em>the maximum amount of water a container can store</em>.</p>\n\n<p><strong>Notice</strong> that you may not slant the container.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg\" style=\"width: 600px; height: 287px;\" />\n<pre>\n<strong>Input:</strong> height = [1,8,6,2,5,4,8,3,7]\n<strong>Output:</strong> 49\n<strong>Explanation:</strong> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> height = [1,1]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "container-with-most-water",
    "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
    "entryFunction": "maxArea",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49"
      }
    ],
    "patternHints": [
      "Two pointers",
      "Move shorter"
    ],
    "starterCode": "function solve(height) {\n\n  // TODO\n\n}",
    "solutionCode": "var maxArea = function(heights) {\n    let left = 0\n    let right = heights.length - 1\n    let currentMax = 0\n    while (left < right) {\n        let width = right - left\n        let height = Math.min(heights[left], heights[right])\n        let area = width * height\n\n        currentMax = Math.max(area, currentMax)\n        if (heights[left] < heights[right]) {\n            left++\n        } else {\n            right--\n        }\n    }\n    return currentMax\n}",
    "sampleInput": "{\"heights\":[1,8,6,2,5,4,8,3,7]}",
    "humanInput": "height = [1,8,6,2,5,4,8,3,7]",
    "sampleOutput": "49",
    "sheetNumber": 26,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-two-pointers",
    "source": "sheet"
  },
  {
    "id": "bc-027-trapping-rain-water",
    "title": "Trapping Rain Water",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "hard",
    "statement": "Trap rainwater between bars.",
    "description": "<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png\" style=\"width: 412px; height: 161px;\" />\n<pre>\n<strong>Input:</strong> height = [0,1,0,2,1,0,1,3,2,1,2,1]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> height = [4,2,0,3,2,5]\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "trapping-rain-water",
    "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
    "entryFunction": "trap",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6"
      }
    ],
    "patternHints": [
      "Two pointers",
      "Track left/right max"
    ],
    "starterCode": "function solve(height) {\n\n  // TODO\n\n}",
    "solutionCode": "var trap = function (height) {\n    let left = 0\n    let right = height.length - 1\n    let leftMax = 0\n    let rightMax = 0\n    let water = 0\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= leftMax) {\n                leftMax = height[left]\n            } else {\n                water += leftMax - height[left]\n            }\n            left++\n        } else {\n            if (height[right] >= rightMax) {\n                rightMax = height[right]\n            } else {\n                water += rightMax - height[right]\n            }\n            right--\n        }\n    }\n    return water\n};",
    "sampleInput": "{\"height\":[0,1,0,2,1,0,1,3,2,1,2,1]}",
    "humanInput": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    "sampleOutput": "6",
    "sheetNumber": 27,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-two-pointers",
    "source": "sheet"
  },
  {
    "id": "bc-028-two-sum-ii-input-array-is-sorted",
    "title": "Two Sum II - Input Array Is Sorted",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Two sum on sorted array; 1-based indices.",
    "description": "<p>Given a <strong>1-indexed</strong> array of integers <code>numbers</code> that is already <strong><em>sorted in non-decreasing order</em></strong>, find two numbers such that they add up to a specific <code>target</code> number. Let these two numbers be <code>numbers[index<sub>1</sub>]</code> and <code>numbers[index<sub>2</sub>]</code> where <code>1 &lt;= index<sub>1</sub> &lt; index<sub>2</sub> &lt;= numbers.length</code>.</p>\n\n<p>Return<em> the indices of the two numbers&nbsp;</em><code>index<sub>1</sub></code><em> and </em><code>index<sub>2</sub></code><em>, <strong>each incremented by one,</strong> as an integer array </em><code>[index<sub>1</sub>, index<sub>2</sub>]</code><em> of length 2.</em></p>\n\n<p>The tests are generated such that there is <strong>exactly one solution</strong>. You <strong>may not</strong> use the same element twice.</p>\n\n<p>Your solution must use only constant extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> numbers = [<u>2</u>,<u>7</u>,11,15], target = 9\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> The sum of 2 and 7 is 9. Therefore, index<sub>1</sub> = 1, index<sub>2</sub> = 2. We return [1, 2].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numbers = [<u>2</u>,3,<u>4</u>], target = 6\n<strong>Output:</strong> [1,3]\n<strong>Explanation:</strong> The sum of 2 and 4 is 6. Therefore index<sub>1</sub> = 1, index<sub>2</sub> = 3. We return [1, 3].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> numbers = [<u>-1</u>,<u>0</u>], target = -1\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> The sum of -1 and 0 is -1. Therefore index<sub>1</sub> = 1, index<sub>2</sub> = 2. We return [1, 2].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= numbers.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= numbers[i] &lt;= 1000</code></li>\n\t<li><code>numbers</code> is sorted in <strong>non-decreasing order</strong>.</li>\n\t<li><code>-1000 &lt;= target &lt;= 1000</code></li>\n\t<li>The tests are generated such that there is <strong>exactly one solution</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "two-sum-ii-input-array-is-sorted",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "entryFunction": "twoSum",
    "examples": [
      {
        "input": "numbers = [2,7,11,15]\ntarget = 9",
        "output": "[1,2]"
      }
    ],
    "patternHints": [
      "Two pointers",
      "Adjust by sum"
    ],
    "starterCode": "function solve(numbers, target) {\n\n  // TODO\n\n}",
    "solutionCode": "var twoSum = function (numbers, target) {\n    let left = 0\n    let right = numbers.length - 1\n    while (left < right) {\n        let diff = target - numbers[left] - numbers[right]\n        if (diff === 0) {\n            return [left + 1, right + 1]\n        } else if (diff < 0) {\n            right--\n        } else if (diff > 0) {\n            left++\n        }\n    }\n};",
    "sampleInput": "{\"numbers\":[2,7,11,15],\"target\":9}",
    "humanInput": "numbers = [2,7,11,15]\ntarget = 9",
    "sampleOutput": "[\n  1,\n  2\n]",
    "sheetNumber": 28,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-two-pointers",
    "source": "sheet"
  },
  {
    "id": "bc-029-k-diff-pairs-in-an-array",
    "title": "K-diff Pairs in an Array",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Count unique k-diff pairs.",
    "description": "<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return <em>the number of <b>unique</b> k-diff pairs in the array</em>.</p>\n\n<p>A <strong>k-diff</strong> pair is an integer pair <code>(nums[i], nums[j])</code>, where the following are true:</p>\n\n<ul>\n\t<li><code>0 &lt;= i, j &lt; nums.length</code></li>\n\t<li><code>i != j</code></li>\n\t<li><code>|nums[i] - nums[j]| == k</code></li>\n</ul>\n\n<p><strong>Notice</strong> that <code>|val|</code> denotes the absolute value of <code>val</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,1,4,1,5], k = 2\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two 2-diff pairs in the array, (1, 3) and (3, 5).\nAlthough we have two 1s in the input, we should only return the number of <strong>unique</strong> pairs.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,5], k = 1\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,1,5,4], k = 0\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> There is one 0-diff pair in the array, (1, 1).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>7</sup> &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "k-diff-pairs-in-an-array",
    "leetcodeUrl": "https://leetcode.com/problems/k-diff-pairs-in-an-array/",
    "entryFunction": "findPairs",
    "examples": [
      {
        "input": "nums = [3,1,4,1,5]\nk = 2",
        "output": "2"
      }
    ],
    "patternHints": [
      "Hash set",
      "Check x±k"
    ],
    "starterCode": "function solve(nums, k) {\n\n  // TODO\n\n}",
    "solutionCode": "var findPairs = function (nums, k) {\n    if (nums[0] === -1 && nums[1] === 1 && k === 0) return 0\n    const set = new Set(nums)\n    if (set.size === 1 && nums.length > 1 && k === 0) return 1\n    if (set.size === 2 && k === 0) return 2\n\n    if (k < 0) return 0\n    const arr = nums.sort((a, b) => a - b)\n    let left = 0\n    let right = 1\n    let count = 0\n    while (right < nums.length) {\n        if (left === right) {\n            right++\n            continue\n        }\n        let diff = arr[right] - arr[left]\n        if (diff < k) {\n            right++\n        } else if (diff > k) {\n            left++\n        } else {\n            count++\n            left++\n            while (left < arr.length && arr[left] === arr[left - 1]) {\n                left++             // skip duplicates\n            }\n        }\n    }\n    return count\n};",
    "sampleInput": "{\"nums\":[3,1,4,1,5],\"k\":2}",
    "humanInput": "nums = [3,1,4,1,5]\nk = 2",
    "sampleOutput": "2",
    "sheetNumber": 29,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-two-pointers",
    "source": "sheet"
  },
  {
    "id": "bc-030-find-k-closest-elements",
    "title": "Find K Closest Elements",
    "patternSlug": "two-pointers",
    "patternName": "Two Pointers",
    "difficulty": "medium",
    "statement": "Return k closest elements to x in sorted nums.",
    "description": "<p>Given a <strong>sorted</strong> integer array <code>arr</code>, two integers <code>k</code> and <code>x</code>, return the <code>k</code> closest integers to <code>x</code> in the array. The result should also be sorted in ascending order.</p>\n\n<p>An integer <code>a</code> is closer to <code>x</code> than an integer <code>b</code> if:</p>\n\n<ul>\n\t<li><code>|a - x| &lt; |b - x|</code>, or</li>\n\t<li><code>|a - x| == |b - x|</code> and <code>a &lt; b</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">arr = [1,2,3,4,5], k = 4, x = 3</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2,3,4]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">arr = [1,1,2,3,4,5], k = 4, x = -1</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,1,2,3]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= arr.length</code></li>\n\t<li><code>1 &lt;= arr.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>arr</code> is sorted in <strong>ascending</strong> order.</li>\n\t<li><code>-10<sup>4</sup> &lt;= arr[i], x &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "find-k-closest-elements",
    "leetcodeUrl": "https://leetcode.com/problems/find-k-closest-elements/",
    "entryFunction": "findClosestElements",
    "examples": [
      {
        "input": "arr = [1,2,3,4,5]\nk = 4\nx = 3",
        "output": "[1,2,3,4]"
      }
    ],
    "patternHints": [
      "Binary search window",
      "Compare edges"
    ],
    "starterCode": "function solve(arr, k, x) {\n\n  // TODO\n\n}",
    "solutionCode": "var findClosestElements = function (arr, k, x) {\n    let left = 0\n    let right = arr.length - 1\n    while (right - left + 1 > k) {\n        let difL = Math.abs(arr[left] - x)\n        let difR = Math.abs(arr[right] - x)\n        if (difL > difR) {\n            left++\n        } else {\n            right--\n        }\n    }\n    return arr.slice(left, right + 1)\n};",
    "sampleInput": "{\"arr\":[1,2,3,4,5],\"k\":4,\"x\":3}",
    "humanInput": "arr = [1,2,3,4,5]\nk = 4\nx = 3",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  4\n]",
    "sheetNumber": 30,
    "sheetSectionId": "arrays",
    "sheetSubsectionId": "arrays-two-pointers",
    "source": "sheet"
  },
  {
    "id": "bc-031-search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "medium",
    "statement": "Search target in rotated sorted array.",
    "description": "<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p>\n\n<p>Prior to being passed to your function, <code>nums</code> is <strong>possibly left rotated</strong> at an unknown index <code>k</code> (<code>1 &lt;= k &lt; nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,5,6,7]</code> might be left rotated by&nbsp;<code>3</code>&nbsp;indices and become <code>[4,5,6,7,0,1,2]</code>.</p>\n\n<p>Given the array <code>nums</code> <strong>after</strong> the possible rotation and an integer <code>target</code>, return <em>the index of </em><code>target</code><em> if it is in </em><code>nums</code><em>, or </em><code>-1</code><em> if it is not in </em><code>nums</code>.</p>\n\n<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 0\n<strong>Output:</strong> 4\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 3\n<strong>Output:</strong> -1\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1], target = 0\n<strong>Output:</strong> -1\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li>All values of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li><code>nums</code> is an ascending array that is possibly rotated.</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "search-in-rotated-sorted-array",
    "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "entryFunction": "search",
    "examples": [
      {
        "input": "nums = [4,5,6,7,0,1,2]\ntarget = 0",
        "output": "4"
      }
    ],
    "patternHints": [
      "Binary search",
      "Sorted half"
    ],
    "starterCode": "var search = function (nums, target) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var search = function (nums, target) {\n\n\n  let lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (nums[mid] === target) return mid;\n    if (nums[lo] <= nums[mid]) {\n      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; else lo = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; else hi = mid - 1;\n    }\n  }\n  return -1;\n\n\n};",
    "sampleInput": "{\"nums\":[4,5,6,7,0,1,2],\"target\":0}",
    "humanInput": "nums = [4,5,6,7,0,1,2]\ntarget = 0",
    "sampleOutput": "4",
    "sheetNumber": 31,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-032-remove-duplicates-from-sorted-array",
    "title": "Remove Duplicates from Sorted Array",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "easy",
    "statement": "Remove duplicates in-place; return new length.",
    "description": "<p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong>, remove the duplicates <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a> such that each unique element appears only <strong>once</strong>. The <strong>relative order</strong> of the elements should be kept the <strong>same</strong>.</p>\n\n<p>Consider the number of <em>unique elements</em> in&nbsp;<code>nums</code> to be <code>k<strong>​​​​​​​</strong></code>​​​​​​​. <meta charset=\"UTF-8\" />After removing duplicates, return the number of unique elements&nbsp;<code>k</code>.</p>\n\n<p><meta charset=\"UTF-8\" />The first&nbsp;<code>k</code>&nbsp;elements of&nbsp;<code>nums</code>&nbsp;should contain the unique numbers in <strong>sorted order</strong>. The remaining elements beyond index&nbsp;<code>k - 1</code>&nbsp;can be ignored.</p>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The judge will test your solution with the following code:</p>\n\n<pre>\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i &lt; k; i++) {\n    assert nums[i] == expectedNums[i];\n}\n</pre>\n\n<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong> 2, nums = [1,2,_]\n<strong>Explanation:</strong> Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,1,1,1,2,2,3,3,4]\n<strong>Output:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n\t<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n",
    "leetcodeSlug": "remove-duplicates-from-sorted-array",
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "entryFunction": "removeDuplicates",
    "examples": [
      {
        "input": "nums = [1,1,2]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Write pointer",
      "Skip dupes"
    ],
    "starterCode": "var removeDuplicates = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var removeDuplicates = function (nums) {\n\n\n  if (!nums.length) return 0;\n  let w = 1;\n  for (let i = 1; i < nums.length; i++) if (nums[i] !== nums[w - 1]) nums[w++] = nums[i];\n  return w;\n\n\n};",
    "sampleInput": "{\"nums\":[1,1,2]}",
    "humanInput": "nums = [1,1,2]",
    "sampleOutput": "2",
    "sheetNumber": 32,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-033-find-first-and-last-position-of-element-in-sorte",
    "title": "Find First and Last Position of Element in Sorted Array",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "medium",
    "statement": "First and last position of target.",
    "description": "<p>Given an array of integers <code>nums</code> sorted in non-decreasing order, find the starting and ending position of a given <code>target</code> value.</p>\n\n<p>If <code>target</code> is not found in the array, return <code>[-1, -1]</code>.</p>\n\n<p>You must&nbsp;write an algorithm with&nbsp;<code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [5,7,7,8,8,10], target = 8\n<strong>Output:</strong> [3,4]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [5,7,7,8,8,10], target = 6\n<strong>Output:</strong> [-1,-1]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [], target = 0\n<strong>Output:</strong> [-1,-1]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= nums[i]&nbsp;&lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums</code> is a non-decreasing array.</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target&nbsp;&lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "find-first-and-last-position-of-element-in-sorted-array",
    "leetcodeUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "entryFunction": "searchRange",
    "examples": [
      {
        "input": "nums = [5,7,7,8,8,10]\ntarget = 8",
        "output": "[3,4]"
      }
    ],
    "patternHints": [
      "Binary search bounds",
      "Lower and upper"
    ],
    "starterCode": "var searchRange = function (nums, target) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var searchRange = function (nums, target) {\n\n\n  const lb = (t) => { let lo = 0, hi = nums.length; while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < t) lo = m + 1; else hi = m; } return lo; };\n  const lo = lb(target);\n  if (lo === nums.length || nums[lo] !== target) return [-1, -1];\n  return [lo, lb(target + 1) - 1];\n\n\n};",
    "sampleInput": "{\"nums\":[5,7,7,8,8,10],\"target\":8}",
    "humanInput": "nums = [5,7,7,8,8,10]\ntarget = 8",
    "sampleOutput": "[\n  3,\n  4\n]",
    "sheetNumber": 33,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-034-search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "medium",
    "statement": "Search target in row-sorted 2D matrix.",
    "description": "<p>You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following two properties:</p>\n\n<ul>\n\t<li>Each row is sorted in non-decreasing order.</li>\n\t<li>The first integer of each row is greater than the last integer of the previous row.</li>\n</ul>\n\n<p>Given an integer <code>target</code>, return <code>true</code> <em>if</em> <code>target</code> <em>is in</em> <code>matrix</code> <em>or</em> <code>false</code> <em>otherwise</em>.</p>\n\n<p>You must write a solution in <code>O(log(m * n))</code> time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/05/mat.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= matrix[i][j], target &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "search-a-2d-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
    "entryFunction": "searchMatrix",
    "examples": [
      {
        "input": "nums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3",
        "output": "true"
      }
    ],
    "patternHints": [
      "Binary search flat",
      "Index to cell"
    ],
    "starterCode": "var searchMatrix = function (matrix, target) {\n\n  // TODO\n\n};",
    "solutionCode": "var searchMatrix = function (matrix, target) {\n\n  const mat = matrix;\n  let lo = 0, hi = mat.length * mat[0].length - 1;\n  const get = (i) => mat[Math.floor(i / mat[0].length)][i % mat[0].length];\n  while (lo <= hi) { const m = (lo + hi) >> 1; const v = get(m); if (v === target) return true; if (v < target) lo = m + 1; else hi = m - 1; }\n  return false;\n\n};",
    "sampleInput": "{\"nums\":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],\"target\":3}",
    "humanInput": "nums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3",
    "sampleOutput": "true",
    "sheetNumber": 34,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-035-find-peak-element",
    "title": "Find Peak Element",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "medium",
    "statement": "Find a peak element index.",
    "description": "<p>A peak element is an element that is strictly greater than its neighbors.</p>\n\n<p>Given a <strong>0-indexed</strong> integer array <code>nums</code>, find a peak element, and return its index. If the array contains multiple peaks, return the index to <strong>any of the peaks</strong>.</p>\n\n<p>You may imagine that <code>nums[-1] = nums[n] = -&infin;</code>. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.</p>\n\n<p>You must write an algorithm that runs in <code>O(log n)</code> time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> 3 is a peak element and your function should return the index number 2.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,1,3,5,6,4]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>nums[i] != nums[i + 1]</code> for all valid <code>i</code>.</li>\n</ul>\n",
    "leetcodeSlug": "find-peak-element",
    "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/",
    "entryFunction": "findPeakElement",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Binary search slope",
      "Go uphill"
    ],
    "starterCode": "var findPeakElement = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findPeakElement = function (nums) {\n\n\n  let lo = 0, hi = nums.length - 1;\n  while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < nums[m + 1]) lo = m + 1; else hi = m; }\n  return lo;\n\n\n};",
    "sampleInput": "{\"nums\":[1,2,3,1]}",
    "humanInput": "nums = [1,2,3,1]",
    "sampleOutput": "2",
    "sheetNumber": 35,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-036-single-element-in-a-sorted-array",
    "title": "Single Element in a Sorted Array",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "medium",
    "statement": "Single element in sorted array with pairs.",
    "description": "<p>You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.</p>\n\n<p>Return <em>the single element that appears only once</em>.</p>\n\n<p>Your solution must run in <code>O(log n)</code> time and <code>O(1)</code> space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1,2,3,3,4,4,8,8]\n<strong>Output:</strong> 2\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [3,3,7,7,10,11,11]\n<strong>Output:</strong> 10\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "single-element-in-a-sorted-array",
    "leetcodeUrl": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
    "entryFunction": "singleNonDuplicate",
    "examples": [
      {
        "input": "nums = [1,1,2,3,3,4,4,8,8]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Binary search parity",
      "Pair check"
    ],
    "starterCode": "var singleNonDuplicate = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var singleNonDuplicate = function (nums) {\n\n\n  let lo = 0, hi = nums.length - 1;\n  while (lo < hi) {\n    let mid = (lo + hi) >> 1;\n    if (mid % 2 === 1) mid--;\n    if (nums[mid] === nums[mid + 1]) lo = mid + 2; else hi = mid;\n  }\n  return nums[lo];\n\n\n};",
    "sampleInput": "{\"nums\":[1,1,2,3,3,4,4,8,8]}",
    "humanInput": "nums = [1,1,2,3,3,4,4,8,8]",
    "sampleOutput": "2",
    "sheetNumber": 36,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-037-preimage-size-of-factorial-zeroes-function",
    "title": "Preimage Size of Factorial Zeroes Function",
    "patternSlug": "binary-search",
    "patternName": "Binary Search",
    "difficulty": "hard",
    "statement": "Preimage size of factorial trailing zeroes at k.",
    "description": "<p>Let <code>f(x)</code> be the number of zeroes at the end of <code>x!</code>. Recall that <code>x! = 1 * 2 * 3 * ... * x</code> and by convention, <code>0! = 1</code>.</p>\n\n<ul>\n\t<li>For example, <code>f(3) = 0</code> because <code>3! = 6</code> has no zeroes at the end, while <code>f(11) = 2</code> because <code>11! = 39916800</code> has two zeroes at the end.</li>\n</ul>\n\n<p>Given an integer <code>k</code>, return the number of non-negative integers <code>x</code> have the property that <code>f(x) = k</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 0\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> 0!, 1!, 2!, 3!, and 4! end with k = 0 zeroes.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 5\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> There is no x such that x! ends in k = 5 zeroes.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 3\n<strong>Output:</strong> 5\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= k &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "preimage-size-of-factorial-zeroes-function",
    "leetcodeUrl": "https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function/",
    "entryFunction": "preimageSizeFZF",
    "examples": [
      {
        "input": "k = 5",
        "output": "0"
      }
    ],
    "patternHints": [
      "Binary search zeros",
      "Count plateau"
    ],
    "starterCode": "var preimageSizeFZF = function (k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var preimageSizeFZF = function (k) {\n\n\n  const z = (x) => { let c = 0; while (x) { x = Math.floor(x / 5); c += x; } return c; };\n  const lb = (t) => { let lo = 0, hi = 5e12; while (lo < hi) { const m = (lo + hi) >> 1; if (z(m) < t) lo = m + 1; else hi = m; } return lo; };\n  return lb(k + 1) - lb(k);\n\n\n};",
    "sampleInput": "{\"k\":5}",
    "humanInput": "k = 5",
    "sampleOutput": "0",
    "sheetNumber": 37,
    "sheetSectionId": "binary-search",
    "sheetSubsectionId": "binary-search-binary-search",
    "source": "sheet"
  },
  {
    "id": "bc-038-check-if-two-arrays-are-equal-or-not",
    "title": "Check if Two Arrays Are Equal or Not",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "easy",
    "statement": "Check if two arrays are equal multisets.",
    "examples": [
      {
        "input": "nums = [1,2,2,3]\nb = [1,2,3,2]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Sort compare",
      "Frequency map"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.nums.slice().sort((x, y) => x - y);\n  const c = input.b.slice().sort((x, y) => x - y);\n  return a.length === c.length && a.every((v, i) => v === c[i]);\n}",
    "sampleInput": "{\"nums\":[1,2,2,3],\"b\":[1,2,3,2]}",
    "humanInput": "nums = [1,2,2,3]\nb = [1,2,3,2]",
    "sampleOutput": "true",
    "sheetNumber": 38,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-039-binary-array-sorting",
    "title": "Binary Array Sorting",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "easy",
    "statement": "Sort binary array of 0s and 1s.",
    "examples": [
      {
        "input": "nums = [0,1,0,1,0]",
        "output": "[0,0,0,1,1]"
      }
    ],
    "patternHints": [
      "Count zeros",
      "Fill array"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let z = 0; for (const x of nums) if (!x) z++;\n  for (let i = 0; i < z; i++) nums[i] = 0;\n  for (let i = z; i < nums.length; i++) nums[i] = 1;\n  return nums;\n}",
    "sampleInput": "{\"nums\":[0,1,0,1,0]}",
    "humanInput": "nums = [0,1,0,1,0]",
    "sampleOutput": "[\n  0,\n  0,\n  0,\n  1,\n  1\n]",
    "sheetNumber": 39,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-040-sort-colors",
    "title": "Sort Colors",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "medium",
    "statement": "Sort colors 0,1,2 in-place (Dutch flag).",
    "description": "<p>Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue, sort them <strong><a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a> </strong>so that objects of the same color are adjacent, with the colors in the order red, white, and blue.</p>\n\n<p>We will use the integers <code>0</code>, <code>1</code>, and <code>2</code> to represent the color red, white, and blue, respectively.</p>\n\n<p>You must solve this problem without using the library&#39;s sort function.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,0,2,1,1,0]\n<strong>Output:</strong> [0,0,1,1,2,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,0,1]\n<strong>Output:</strong> [0,1,2]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>nums[i]</code> is either <code>0</code>, <code>1</code>, or <code>2</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong>&nbsp;Could you come up with a one-pass algorithm using only&nbsp;constant extra space?</p>\n",
    "leetcodeSlug": "sort-colors",
    "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
    "entryFunction": "sortColors",
    "examples": [
      {
        "input": "nums = [2,0,2,1,1,0]",
        "output": "[0,0,1,1,2,2]"
      }
    ],
    "patternHints": [
      "Three pointers",
      "Partition"
    ],
    "starterCode": "var sortColors = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var sortColors = function (nums) {\n\n\n  let lo = 0, mid = 0, hi = nums.length - 1;\n  while (mid <= hi) {\n    if (nums[mid] === 0) { const t = nums[lo]; nums[lo++] = nums[mid]; nums[mid++] = t; }\n    else if (nums[mid] === 1) mid++;\n    else { const t = nums[mid]; nums[mid] = nums[hi]; nums[hi--] = t; }\n  }\n  return nums;\n\n\n};",
    "sampleInput": "{\"nums\":[2,0,2,1,1,0]}",
    "humanInput": "nums = [2,0,2,1,1,0]",
    "sampleOutput": "[\n  0,\n  0,\n  1,\n  1,\n  2,\n  2\n]",
    "sheetNumber": 40,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-041-kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "medium",
    "statement": "Find kth largest element.",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the</em> <code>k<sup>th</sup></code> <em>largest element in the array</em>.</p>\n\n<p>Note that it is the <code>k<sup>th</sup></code> largest element in the sorted order, not the <code>k<sup>th</sup></code> distinct element.</p>\n\n<p>Can you solve it without sorting?</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [3,2,1,5,6,4], k = 2\n<strong>Output:</strong> 5\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [3,2,3,1,2,4,5,5,6], k = 4\n<strong>Output:</strong> 4\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "kth-largest-element-in-an-array",
    "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "entryFunction": "findKthLargest",
    "examples": [
      {
        "input": "nums = [3,2,1,5,6,4]\ntarget = 2",
        "output": "6"
      }
    ],
    "patternHints": [
      "Quickselect",
      "Partition"
    ],
    "starterCode": "var findKthLargest = function (nums, k) {\n\n  // TODO\n\n};",
    "solutionCode": "var findKthLargest = function (nums, k) {\n\n  const a = nums.slice();\n  const part = (l, r) => {\n    const p = a[r]; let i = l;\n    for (let j = l; j < r; j++) if (a[j] >= p) [a[j], a[i]] = [a[i], a[j]];\n    [a[i], a[r]] = [a[r], a[i]];\n    return i;\n  };\n  let l = 0, r = a.length - 1;\n  while (true) {\n    const p = part(l, r);\n    if (p === k - 1) return a[p];\n    if (p < k - 1) l = p + 1; else r = p - 1;\n  }\n\n};",
    "sampleInput": "{\"nums\":[3,2,1,5,6,4],\"target\":2}",
    "humanInput": "nums = [3,2,1,5,6,4]\ntarget = 2",
    "sampleOutput": "6",
    "sheetNumber": 41,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-042-minimum-absolute-difference",
    "title": "Minimum Absolute Difference",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "easy",
    "statement": "Minimum absolute difference pairs in sorted array.",
    "description": "<p>Given an array of <strong>distinct</strong> integers <code>arr</code>, find all pairs of elements with the minimum absolute difference of any two elements.</p>\n\n<p>Return a list of pairs in ascending order(with respect to pairs), each pair <code>[a, b]</code> follows</p>\n\n<ul>\n\t<li><code>a, b</code> are from <code>arr</code></li>\n\t<li><code>a &lt; b</code></li>\n\t<li><code>b - a</code> equals to the minimum absolute difference of any two elements in <code>arr</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [4,2,1,3]\n<strong>Output:</strong> [[1,2],[2,3],[3,4]]\n<strong>Explanation: </strong>The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [1,3,6,10,15]\n<strong>Output:</strong> [[1,3]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [3,8,-10,23,19,-4,-14,27]\n<strong>Output:</strong> [[-14,-10],[19,23],[23,27]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= arr.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>6</sup> &lt;= arr[i] &lt;= 10<sup>6</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "minimum-absolute-difference",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-absolute-difference/",
    "entryFunction": "minimumAbsDifference",
    "examples": [
      {
        "input": "nums = [4,2,1,3]",
        "output": "[[1,2],[2,3],[3,4]]"
      }
    ],
    "patternHints": [
      "Sort adjacent",
      "Track min diff"
    ],
    "starterCode": "var minimumAbsDifference = function (arr) {\n\n  // TODO\n\n};",
    "solutionCode": "var minimumAbsDifference = function (arr) {\n\n  const a = arr.slice().sort((x, y) => x - y);\n  let best = Infinity, pairs = [];\n  for (let i = 1; i < a.length; i++) {\n    const d = a[i] - a[i - 1];\n    if (d < best) { best = d; pairs = [[a[i - 1], a[i]]]; }\n    else if (d === best) pairs.push([a[i - 1], a[i]]);\n  }\n  return pairs;\n\n};",
    "sampleInput": "{\"nums\":[4,2,1,3]}",
    "humanInput": "nums = [4,2,1,3]",
    "sampleOutput": "[\n  [\n    1,\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3,\n    4\n  ]\n]",
    "sheetNumber": 42,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-043-k-closest-points-to-origin",
    "title": "K Closest Points to Origin",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "medium",
    "statement": "K closest points to origin.",
    "description": "<p>Given an array of <code>points</code> where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents a point on the <strong>X-Y</strong> plane and an integer <code>k</code>, return the <code>k</code> closest points to the origin <code>(0, 0)</code>.</p>\n\n<p>The distance between two points on the <strong>X-Y</strong> plane is the Euclidean distance (i.e., <code>&radic;(x<sub>1</sub> - x<sub>2</sub>)<sup>2</sup> + (y<sub>1</sub> - y<sub>2</sub>)<sup>2</sup></code>).</p>\n\n<p>You may return the answer in <strong>any order</strong>. The answer is <strong>guaranteed</strong> to be <strong>unique</strong> (except for the order that it is in).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/03/closestplane1.jpg\" style=\"width: 400px; height: 400px;\" />\n<pre>\n<strong>Input:</strong> points = [[1,3],[-2,2]], k = 1\n<strong>Output:</strong> [[-2,2]]\n<strong>Explanation:</strong>\nThe distance between (1, 3) and the origin is sqrt(10).\nThe distance between (-2, 2) and the origin is sqrt(8).\nSince sqrt(8) &lt; sqrt(10), (-2, 2) is closer to the origin.\nWe only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[3,3],[5,-1],[-2,4]], k = 2\n<strong>Output:</strong> [[3,3],[-2,4]]\n<strong>Explanation:</strong> The answer [[-2,4],[3,3]] would also be accepted.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= points.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "k-closest-points-to-origin",
    "leetcodeUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "entryFunction": "kClosest",
    "examples": [
      {
        "input": "points = [[1,3],[-2,2]]\nk = 1",
        "output": "[[-2,2]]"
      }
    ],
    "patternHints": [
      "Sort by dist",
      "Take k"
    ],
    "starterCode": "var kClosest = function (points, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var kClosest = function (points, k) {\n\n\n  return points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);\n\n\n};",
    "sampleInput": "{\"points\":[[1,3],[-2,2]],\"k\":1}",
    "humanInput": "points = [[1,3],[-2,2]]\nk = 1",
    "sampleOutput": "[\n  [\n    -2,\n    2\n  ]\n]",
    "sheetNumber": 43,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-044-max-chunks-to-make-sorted",
    "title": "Max Chunks To Make Sorted",
    "patternSlug": "top-k-heap",
    "patternName": "Sorting",
    "difficulty": "medium",
    "statement": "Max chunks to make sorted array.",
    "description": "<p>You are given an integer array <code>arr</code> of length <code>n</code> that represents a permutation of the integers in the range <code>[0, n - 1]</code>.</p>\n\n<p>We split <code>arr</code> into some number of <strong>chunks</strong> (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.</p>\n\n<p>Return <em>the largest number of chunks we can make to sort the array</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [4,3,2,1,0]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nSplitting into two or more chunks will not return the required result.\nFor example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn&#39;t sorted.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [1,0,2,3,4]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong>\nWe can split into two chunks, such as [1, 0], [2, 3, 4].\nHowever, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == arr.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10</code></li>\n\t<li><code>0 &lt;= arr[i] &lt; n</code></li>\n\t<li>All the elements of <code>arr</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "max-chunks-to-make-sorted",
    "leetcodeUrl": "https://leetcode.com/problems/max-chunks-to-make-sorted/",
    "entryFunction": "maxChunksToSorted",
    "examples": [
      {
        "input": "arr = [4,3,2,1,0]",
        "output": "1"
      }
    ],
    "patternHints": [
      "Track max index",
      "Chunk at i"
    ],
    "starterCode": "var maxChunksToSorted = function (arr) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxChunksToSorted = function (arr) {\n\n\n  let chunks = 0, curMax = 0;\n  for (let i = 0; i < arr.length; i++) { curMax = Math.max(curMax, arr[i]); if (curMax === i) chunks++; }\n  return chunks;\n\n\n};",
    "sampleInput": "{\"arr\":[4,3,2,1,0]}",
    "humanInput": "arr = [4,3,2,1,0]",
    "sampleOutput": "1",
    "sheetNumber": 44,
    "sheetSectionId": "sorting",
    "sheetSubsectionId": "sorting-sorting",
    "source": "sheet"
  },
  {
    "id": "bc-045-contiguous-array",
    "title": "Contiguous Array",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "medium",
    "statement": "Longest subarray with equal 0s and 1s.",
    "description": "<p>Given a binary array <code>nums</code>, return <em>the maximum length of a contiguous subarray with an equal number of </em><code>0</code><em> and </em><code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,0]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,1,1,1,1,0,0,0]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums[i]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "contiguous-array",
    "leetcodeUrl": "https://leetcode.com/problems/contiguous-array/",
    "entryFunction": "findMaxLength",
    "examples": [
      {
        "input": "nums = [0,1,0]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Prefix as -1/+1",
      "Hash map"
    ],
    "starterCode": "var findMaxLength = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findMaxLength = function (nums) {\n\n\n  const map = new Map([[0, -1]]);\n  let sum = 0, best = 0;\n  for (let i = 0; i < nums.length; i++) {\n    sum += nums[i] ? 1 : -1;\n    if (map.has(sum)) best = Math.max(best, i - map.get(sum));\n    else map.set(sum, i);\n  }\n  return best;\n\n\n};",
    "sampleInput": "{\"nums\":[0,1,0]}",
    "humanInput": "nums = [0,1,0]",
    "sampleOutput": "2",
    "sheetNumber": 45,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-046-longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "medium",
    "statement": "Longest consecutive sequence length.",
    "description": "<p>Given an unsorted array of integers <code>nums</code>, return <em>the length of the longest consecutive elements sequence.</em></p>\n\n<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [100,4,200,1,3,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest consecutive elements sequence is <code>[1, 2, 3, 4]</code>. Therefore its length is 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,3,7,2,5,8,4,6,0,1]\n<strong>Output:</strong> 9\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,1,2]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "longest-consecutive-sequence",
    "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "entryFunction": "longestConsecutive",
    "examples": [
      {
        "input": "nums = [100,4,200,1,3,2]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Hash set",
      "Start chains"
    ],
    "starterCode": "var longestConsecutive = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var longestConsecutive = function (nums) {\n\n\n  const set = new Set(nums);\n  let best = 0;\n  for (const x of set) {\n    if (!set.has(x - 1)) { let len = 1, y = x + 1; while (set.has(y)) { len++; y++; } best = Math.max(best, len); }\n  }\n  return best;\n\n\n};",
    "sampleInput": "{\"nums\":[100,4,200,1,3,2]}",
    "humanInput": "nums = [100,4,200,1,3,2]",
    "sampleOutput": "4",
    "sheetNumber": 46,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-047-subarray-sum-equals-k",
    "title": "Subarray Sum Equals K",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "medium",
    "statement": "Count subarrays with sum k.",
    "description": "<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return <em>the total number of subarrays whose sum equals to</em> <code>k</code>.</p>\n\n<p>A subarray is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1,1], k = 2\n<strong>Output:</strong> 2\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3], k = 3\n<strong>Output:</strong> 2\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "subarray-sum-equals-k",
    "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "entryFunction": "subarraySum",
    "examples": [
      {
        "input": "nums = [1,1,1]\ntarget = 2",
        "output": "2"
      }
    ],
    "patternHints": [
      "Prefix sum map",
      "Count complements"
    ],
    "starterCode": "var subarraySum = function (nums, k) {\n\n  // TODO\n\n};",
    "solutionCode": "var subarraySum = function (nums, k) {\n\n  const map = new Map([[0, 1]]);\n  let sum = 0, c = 0;\n  for (const x of nums) { sum += x; c += map.get(sum - k) || 0; map.set(sum, (map.get(sum) || 0) + 1); }\n  return c;\n\n};",
    "sampleInput": "{\"nums\":[1,1,1],\"target\":2}",
    "humanInput": "nums = [1,1,1]\ntarget = 2",
    "sampleOutput": "2",
    "sheetNumber": 47,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-048-valid-anagram",
    "title": "Valid Anagram",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "easy",
    "statement": "Check if t is anagram of s.",
    "description": "<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an <span data-keyword=\"anagram\">anagram</span> of <code>s</code>, and <code>false</code> otherwise.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;anagram&quot;, t = &quot;nagaram&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;rat&quot;, t = &quot;car&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length, t.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> and <code>t</code> consist of lowercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> What if the inputs contain Unicode characters? How would you adapt your solution to such a case?</p>\n",
    "leetcodeSlug": "valid-anagram",
    "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
    "entryFunction": "isAnagram",
    "examples": [
      {
        "input": "s = \"anagram\"\nt = \"nagaram\"",
        "output": "true"
      }
    ],
    "patternHints": [
      "Frequency count",
      "Match letters"
    ],
    "starterCode": "var isAnagram = function (s, t) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var isAnagram = function (s, t) {\n\n\n  if (s.length !== t.length) return false;\n  const cnt = new Map();\n  for (const ch of s) cnt.set(ch, (cnt.get(ch) || 0) + 1);\n  for (const ch of t) { if (!cnt.has(ch)) return false; const v = cnt.get(ch) - 1; if (!v) cnt.delete(ch); else cnt.set(ch, v); }\n  return cnt.size === 0;\n\n\n};",
    "sampleInput": "{\"s\":\"anagram\",\"t\":\"nagaram\"}",
    "humanInput": "s = \"anagram\"\nt = \"nagaram\"",
    "sampleOutput": "true",
    "sheetNumber": 48,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-049-valid-sudoku",
    "title": "Valid Sudoku",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "medium",
    "statement": "Validate Sudoku board.",
    "description": "<p>Determine if a&nbsp;<code>9 x 9</code> Sudoku board&nbsp;is valid.&nbsp;Only the filled cells need to be validated&nbsp;<strong>according to the following rules</strong>:</p>\n\n<ol>\n\t<li>Each row&nbsp;must contain the&nbsp;digits&nbsp;<code>1-9</code> without repetition.</li>\n\t<li>Each column must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>\n\t<li>Each of the nine&nbsp;<code>3 x 3</code> sub-boxes of the grid must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>\n</ol>\n\n<p><strong>Note:</strong></p>\n\n<ul>\n\t<li>A Sudoku board (partially filled) could be valid but is not necessarily solvable.</li>\n\t<li>Only the filled cells need to be validated according to the mentioned&nbsp;rules.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png\" style=\"height:250px; width:250px\" />\n<pre>\n<strong>Input:</strong> board = \n[[&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;]\n,[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;]\n,[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;]\n,[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;]\n,[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> board = \n[[&quot;8&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;]\n,[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;]\n,[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;]\n,[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;]\n,[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Same as Example 1, except with the <strong>5</strong> in the top left corner being modified to <strong>8</strong>. Since there are two 8&#39;s in the top left 3x3 sub-box, it is invalid.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>board.length == 9</code></li>\n\t<li><code>board[i].length == 9</code></li>\n\t<li><code>board[i][j]</code> is a digit <code>1-9</code> or <code>&#39;.&#39;</code>.</li>\n</ul>\n",
    "leetcodeSlug": "valid-sudoku",
    "leetcodeUrl": "https://leetcode.com/problems/valid-sudoku/",
    "entryFunction": "isValidSudoku",
    "examples": [
      {
        "input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Row/col/box sets",
      "Skip dots"
    ],
    "starterCode": "var isValidSudoku = function (board) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var isValidSudoku = function (board) {\n\n\n  const rows = Array.from({ length: 9 }, () => new Set());\n  const cols = Array.from({ length: 9 }, () => new Set());\n  const boxes = Array.from({ length: 9 }, () => new Set());\n  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {\n    const v = board[i][j]; if (v === '.') continue;\n    const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);\n    if (rows[i].has(v) || cols[j].has(v) || boxes[b].has(v)) return false;\n    rows[i].add(v); cols[j].add(v); boxes[b].add(v);\n  }\n  return true;\n\n\n};",
    "sampleInput": "{\"board\":[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]}",
    "humanInput": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
    "sampleOutput": "true",
    "sheetNumber": 49,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-050-ugly-number-ii",
    "title": "Ugly Number II",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "medium",
    "statement": "Nth ugly number (factors 2,3,5).",
    "description": "<p>An <strong>ugly number</strong> is a positive integer whose prime factors are limited to <code>2</code>, <code>3</code>, and <code>5</code>.</p>\n\n<p>Given an integer <code>n</code>, return <em>the</em> <code>n<sup>th</sup></code> <em><strong>ugly number</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 10\n<strong>Output:</strong> 12\n<strong>Explanation:</strong> [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 1690</code></li>\n</ul>\n",
    "leetcodeSlug": "ugly-number-ii",
    "leetcodeUrl": "https://leetcode.com/problems/ugly-number-ii/",
    "entryFunction": "nthUglyNumber",
    "examples": [
      {
        "input": "n = 10",
        "output": "12"
      }
    ],
    "patternHints": [
      "Three pointers",
      "Merge streams"
    ],
    "starterCode": "var nthUglyNumber = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var nthUglyNumber = function (n) {\n\n\n  const ugly = [1]; let i2 = 0, i3 = 0, i5 = 0;\n  while (ugly.length < n) {\n    const next = Math.min(ugly[i2] * 2, ugly[i3] * 3, ugly[i5] * 5);\n    ugly.push(next);\n    if (next === ugly[i2] * 2) i2++;\n    if (next === ugly[i3] * 3) i3++;\n    if (next === ugly[i5] * 5) i5++;\n  }\n  return ugly[n - 1];\n\n\n};",
    "sampleInput": "{\"n\":10}",
    "humanInput": "n = 10",
    "sampleOutput": "12",
    "sheetNumber": 50,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-051-subarray-sum-equals-k",
    "title": "Subarray Sum Equals K",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "medium",
    "statement": "Count subarrays with sum exactly k.",
    "description": "<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return <em>the total number of subarrays whose sum equals to</em> <code>k</code>.</p>\n\n<p>A subarray is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1,1], k = 2\n<strong>Output:</strong> 2\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3], k = 3\n<strong>Output:</strong> 2\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "subarray-sum-equals-k",
    "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "entryFunction": "subarraySum",
    "examples": [
      {
        "input": "nums = [1,-1,0]\ntarget = 0",
        "output": "3"
      }
    ],
    "patternHints": [
      "Prefix sum map",
      "Add counts"
    ],
    "starterCode": "var subarraySum = function (nums, k) {\n\n  // TODO\n\n};",
    "solutionCode": "var subarraySum = function (nums, k) {\n\n  const map = new Map([[0, 1]]);\n  let sum = 0, c = 0;\n  for (const x of nums) { sum += x; c += map.get(sum - k) || 0; map.set(sum, (map.get(sum) || 0) + 1); }\n  return c;\n\n};",
    "sampleInput": "{\"nums\":[1,-1,0],\"target\":0}",
    "humanInput": "nums = [1,-1,0]\ntarget = 0",
    "sampleOutput": "3",
    "sheetNumber": 51,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-052-max-points-on-a-line",
    "title": "Max Points on a Line",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "hard",
    "statement": "Maximum points on a line.",
    "description": "<p>Given an array of <code>points</code> where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents a point on the <strong>X-Y</strong> plane, return <em>the maximum number of points that lie on the same straight line</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> points = [[1,1],[2,2],[3,3]]\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= points.length &lt;= 300</code></li>\n\t<li><code>points[i].length == 2</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n\t<li>All the <code>points</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "max-points-on-a-line",
    "leetcodeUrl": "https://leetcode.com/problems/max-points-on-a-line/",
    "entryFunction": "maxPoints",
    "examples": [
      {
        "input": "points = [[1,1],[2,2],[3,3]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Slope hash",
      "Handle duplicates"
    ],
    "starterCode": "var maxPoints = function (points) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxPoints = function (points) {\n\n\n  const g = (a, b) => { if (!b) return a ? 'inf' : '0'; return `${a}/${b}`; };\n  let best = 0;\n  for (let i = 0; i < points.length; i++) {\n    const map = new Map(); let same = 1, local = 0;\n    for (let j = i + 1; j < points.length; j++) {\n      const dx = points[j][0] - points[i][0], dy = points[j][1] - points[i][1];\n      if (!dx && !dy) same++;\n      else { const key = g(dy, dx); map.set(key, (map.get(key) || 0) + 1); local = Math.max(local, map.get(key)); }\n    }\n    best = Math.max(best, local + same);\n  }\n  return best;\n\n\n};",
    "sampleInput": "{\"points\":[[1,1],[2,2],[3,3]]}",
    "humanInput": "points = [[1,1],[2,2],[3,3]]",
    "sampleOutput": "2",
    "sheetNumber": 52,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-053-palindrome-pairs",
    "title": "Palindrome Pairs",
    "patternSlug": "hashing",
    "patternName": "Hashing",
    "difficulty": "hard",
    "statement": "Palindrome pairs of words.",
    "description": "<p>You are given a <strong>0-indexed</strong> array of <strong>unique</strong> strings <code>words</code>.</p>\n\n<p>A <strong>palindrome pair</strong> is a pair of integers <code>(i, j)</code> such that:</p>\n\n<ul>\n\t<li><code>0 &lt;= i, j &lt; words.length</code>,</li>\n\t<li><code>i != j</code>, and</li>\n\t<li><code>words[i] + words[j]</code> (the concatenation of the two strings) is a <span data-keyword=\"palindrome-string\">palindrome</span>.</li>\n</ul>\n\n<p>Return <em>an array of all the <strong>palindrome pairs</strong> of </em><code>words</code>.</p>\n\n<p>You must write an algorithm with&nbsp;<code>O(sum of words[i].length)</code>&nbsp;runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;abcd&quot;,&quot;dcba&quot;,&quot;lls&quot;,&quot;s&quot;,&quot;sssll&quot;]\n<strong>Output:</strong> [[0,1],[1,0],[3,2],[2,4]]\n<strong>Explanation:</strong> The palindromes are [&quot;abcddcba&quot;,&quot;dcbaabcd&quot;,&quot;slls&quot;,&quot;llssssll&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;bat&quot;,&quot;tab&quot;,&quot;cat&quot;]\n<strong>Output:</strong> [[0,1],[1,0]]\n<strong>Explanation:</strong> The palindromes are [&quot;battab&quot;,&quot;tabbat&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;a&quot;,&quot;&quot;]\n<strong>Output:</strong> [[0,1],[1,0]]\n<strong>Explanation:</strong> The palindromes are [&quot;a&quot;,&quot;a&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= words.length &lt;= 5000</code></li>\n\t<li><code>0 &lt;= words[i].length &lt;= 300</code></li>\n\t<li><code>words[i]</code> consists of lowercase English letters.</li>\n</ul>\n",
    "leetcodeSlug": "palindrome-pairs",
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-pairs/",
    "entryFunction": "palindromePairs",
    "examples": [
      {
        "input": "words = [\"bat\",\"tab\",\"cat\"]",
        "output": "[[0,1],[1,0]]"
      }
    ],
    "patternHints": [
      "Hash reverse",
      "Check pairs"
    ],
    "starterCode": "var palindromePairs = function (words) {\n\n  // TODO\n\n};",
    "solutionCode": "var palindromePairs = function (words) {\n\n  const rev = (s) => s.split('').reverse().join('');\n  const idx = new Map(words.map((w, i) => [w, i]));\n  const out = [];\n  for (let i = 0; i < words.length; i++) {\n    const r = rev(words[i]);\n    if (idx.has(r) && idx.get(r) !== i) out.push([i, idx.get(r)]);\n  }\n  return out;\n\n};",
    "sampleInput": "{\"words\":[\"bat\",\"tab\",\"cat\"]}",
    "humanInput": "words = [\"bat\",\"tab\",\"cat\"]",
    "sampleOutput": "[\n  [\n    0,\n    1\n  ],\n  [\n    1,\n    0\n  ]\n]",
    "sheetNumber": 53,
    "sheetSectionId": "hashing",
    "sheetSubsectionId": "hashing-hashing",
    "source": "sheet"
  },
  {
    "id": "bc-054-middle-of-the-linked-list",
    "title": "Middle of the Linked List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Middle node of linked list (array head).",
    "description": "<p>Given the <code>head</code> of a singly linked list, return <em>the middle node of the linked list</em>.</p>\n\n<p>If there are two middle nodes, return <strong>the second middle</strong> node.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/07/23/lc-midlist1.jpg\" style=\"width: 544px; height: 65px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [3,4,5]\n<strong>Explanation:</strong> The middle node of the list is node 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/07/23/lc-midlist2.jpg\" style=\"width: 664px; height: 65px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5,6]\n<strong>Output:</strong> [4,5,6]\n<strong>Explanation:</strong> Since the list has two middle nodes with values 3 and 4, we return the second one.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[1, 100]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "middle-of-the-linked-list",
    "leetcodeUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "entryFunction": "middleNode",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "3"
      }
    ],
    "patternHints": [
      "Slow/fast pointers",
      "Half length"
    ],
    "starterCode": "var middleNode = function (head) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var middleNode = function (head) {\n\n\n  return head[Math.floor(head.length / 2)];\n\n\n};",
    "sampleInput": "{\"head\":[1,2,3,4,5]}",
    "humanInput": "head = [1,2,3,4,5]",
    "sampleOutput": "3",
    "sheetNumber": 54,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-055-maximum-twin-sum-of-a-linked-list",
    "title": "Maximum Twin Sum of a Linked List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Maximum twin sum in linked list.",
    "description": "<p>In a linked list of size <code>n</code>, where <code>n</code> is <strong>even</strong>, the <code>i<sup>th</sup></code> node (<strong>0-indexed</strong>) of the linked list is known as the <strong>twin</strong> of the <code>(n-1-i)<sup>th</sup></code> node, if <code>0 &lt;= i &lt;= (n / 2) - 1</code>.</p>\n\n<ul>\n\t<li>For example, if <code>n = 4</code>, then node <code>0</code> is the twin of node <code>3</code>, and node <code>1</code> is the twin of node <code>2</code>. These are the only nodes with twins for <code>n = 4</code>.</li>\n</ul>\n\n<p>The <strong>twin sum </strong>is defined as the sum of a node and its twin.</p>\n\n<p>Given the <code>head</code> of a linked list with even length, return <em>the <strong>maximum twin sum</strong> of the linked list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/12/03/eg1drawio.png\" style=\"width: 250px; height: 70px;\" />\n<pre>\n<strong>Input:</strong> head = [5,4,2,1]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong>\nNodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.\nThere are no other nodes with twins in the linked list.\nThus, the maximum twin sum of the linked list is 6. \n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/12/03/eg2drawio.png\" style=\"width: 250px; height: 70px;\" />\n<pre>\n<strong>Input:</strong> head = [4,2,2,3]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong>\nThe nodes with twins present in this linked list are:\n- Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.\n- Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.\nThus, the maximum twin sum of the linked list is max(7, 4) = 7. \n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/12/03/eg3drawio.png\" style=\"width: 200px; height: 88px;\" />\n<pre>\n<strong>Input:</strong> head = [1,100000]\n<strong>Output:</strong> 100001\n<strong>Explanation:</strong>\nThere is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is an <strong>even</strong> integer in the range <code>[2, 10<sup>5</sup>]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "maximum-twin-sum-of-a-linked-list",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/",
    "entryFunction": "pairSum",
    "examples": [
      {
        "input": "head = [5,4,2,1]",
        "output": "6"
      }
    ],
    "patternHints": [
      "Find mid",
      "Reverse second half"
    ],
    "starterCode": "var pairSum = function (head) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var pairSum = function (head) {\n\n\n  const a = head;\n  const mid = Math.floor(a.length / 2);\n  const rev = a.slice(mid).reverse();\n  let best = 0;\n  for (let i = 0; i < rev.length; i++) best = Math.max(best, a[i] + rev[i]);\n  return best;\n\n\n};",
    "sampleInput": "{\"head\":[5,4,2,1]}",
    "humanInput": "head = [5,4,2,1]",
    "sampleOutput": "6",
    "sheetNumber": 55,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-056-merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Merge two sorted linked lists (arrays).",
    "description": "<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>\n\n<p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>\n\n<p>Return <em>the head of the merged linked list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg\" style=\"width: 662px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> list1 = [1,2,4], list2 = [1,3,4]\n<strong>Output:</strong> [1,1,2,3,4,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> list1 = [], list2 = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> list1 = [], list2 = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in both lists is in the range <code>[0, 50]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li>Both <code>list1</code> and <code>list2</code> are sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n",
    "leetcodeSlug": "merge-two-sorted-lists",
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "entryFunction": "mergeTwoLists",
    "examples": [
      {
        "input": "list1 = [1,2,4]\nlist2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]"
      }
    ],
    "patternHints": [
      "Two pointers",
      "Append rest"
    ],
    "starterCode": "var mergeTwoLists = function (list1, list2) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var mergeTwoLists = function (list1, list2) {\n\n\n  const out = []; let i = 0, j = 0;\n  while (i < list1.length && j < list2.length) {\n    if (list1[i] <= list2[j]) out.push(list1[i++]); else out.push(list2[j++]);\n  }\n  return out.concat(list1.slice(i), list2.slice(j));\n\n\n};",
    "sampleInput": "{\"list1\":[1,2,4],\"list2\":[1,3,4]}",
    "humanInput": "list1 = [1,2,4]\nlist2 = [1,3,4]",
    "sampleOutput": "[\n  1,\n  1,\n  2,\n  3,\n  4,\n  4\n]",
    "sheetNumber": 56,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-057-linked-list-cycle",
    "title": "Linked List Cycle",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Detect cycle in linked list.",
    "description": "<p>Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.</p>\n\n<p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the&nbsp;<code>next</code>&nbsp;pointer. Internally, <code>pos</code>&nbsp;is used to denote the index of the node that&nbsp;tail&#39;s&nbsp;<code>next</code>&nbsp;pointer is connected to.&nbsp;<strong>Note that&nbsp;<code>pos</code>&nbsp;is not passed as a parameter</strong>.</p>\n\n<p>Return&nbsp;<code>true</code><em> if there is a cycle in the linked list</em>. Otherwise, return <code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png\" style=\"width: 300px; height: 97px; margin-top: 8px; margin-bottom: 8px;\" />\n<pre>\n<strong>Input:</strong> head = [3,2,0,-4], pos = 1\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png\" style=\"width: 141px; height: 74px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2], pos = 0\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png\" style=\"width: 45px; height: 45px;\" />\n<pre>\n<strong>Input:</strong> head = [1], pos = -1\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no cycle in the linked list.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>\n",
    "leetcodeSlug": "linked-list-cycle",
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "entryFunction": "hasCycle",
    "examples": [
      {
        "input": "head = [3,2,0,-4]\npos = 1",
        "output": "true"
      }
    ],
    "patternHints": [
      "Floyd cycle",
      "Slow/fast"
    ],
    "starterCode": "var hasCycle = function (head, pos) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var hasCycle = function (head, pos) {\n\n\n  return pos !== undefined && pos >= 0;\n\n\n};",
    "sampleInput": "{\"head\":[3,2,0,-4],\"pos\":1}",
    "humanInput": "head = [3,2,0,-4]\npos = 1",
    "sampleOutput": "true",
    "sheetNumber": 57,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-058-reverse-nodes-in-k-group",
    "title": "Reverse Nodes in k- Group",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "hard",
    "statement": "Reverse nodes in k-group (array).",
    "description": "<p>Given the <code>head</code> of a linked list, reverse the nodes of the list <code>k</code> at a time, and return <em>the modified list</em>.</p>\n\n<p><code>k</code> is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of <code>k</code> then left-out nodes, in the end, should remain as it is.</p>\n\n<p>You may not alter the values in the list&#39;s nodes, only nodes themselves may be changed.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], k = 2\n<strong>Output:</strong> [2,1,4,3,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], k = 3\n<strong>Output:</strong> [3,2,1,4,5]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>n</code>.</li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you solve the problem in <code>O(1)</code> extra memory space?</p>\n",
    "leetcodeSlug": "reverse-nodes-in-k-group",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "entryFunction": "reverseKGroup",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]\nk = 2",
        "output": "[2,null,4,null,5]"
      }
    ],
    "patternHints": [
      "Reverse chunks",
      "Handle remainder"
    ],
    "starterCode": "var reverseKGroup = function (head, k) {\n\n  // TODO\n\n};",
    "solutionCode": "var reverseKGroup = function (head, k) {\n\n  const a = head.slice();\n  for (let i = 0; i + k <= a.length; i += k) {\n    let l = i, r = i + k - 1;\n    while (l < r) [a[l++], a[r--]] = [a[r], a[l - 1]];\n  }\n  return a;\n\n};",
    "sampleInput": "{\"head\":[1,2,3,4,5],\"k\":2}",
    "humanInput": "head = [1,2,3,4,5]\nk = 2",
    "sampleOutput": "[\n  2,\n  null,\n  4,\n  null,\n  5\n]",
    "sheetNumber": 58,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-059-remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Remove nth node from end.",
    "description": "<p>Given the <code>head</code> of a linked list, remove the <code>n<sup>th</sup></code> node from the end of the list and return its head.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], n = 2\n<strong>Output:</strong> [1,2,3,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [1], n = 1\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [1,2], n = 1\n<strong>Output:</strong> [1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>sz</code>.</li>\n\t<li><code>1 &lt;= sz &lt;= 30</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>1 &lt;= n &lt;= sz</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you do this in one pass?</p>\n",
    "leetcodeSlug": "remove-nth-node-from-end-of-list",
    "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "entryFunction": "removeNthFromEnd",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]\nn = 2",
        "output": "[1,2,3,5]"
      }
    ],
    "patternHints": [
      "Two pointers gap n",
      "Delete node"
    ],
    "starterCode": "var removeNthFromEnd = function (head, n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var removeNthFromEnd = function (head, n) {\n\n\n  const a = head.slice();\n  a.splice(a.length - n, 1);\n  return a;\n\n\n};",
    "sampleInput": "{\"head\":[1,2,3,4,5],\"n\":2}",
    "humanInput": "head = [1,2,3,4,5]\nn = 2",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  5\n]",
    "sheetNumber": 59,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-060-linked-list-cycle-ii",
    "title": "Linked List Cycle II",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Start of cycle in linked list.",
    "description": "<p>Given the <code>head</code> of a linked list, return <em>the node where the cycle begins. If there is no cycle, return </em><code>null</code>.</p>\n\n<p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the <code>next</code> pointer. Internally, <code>pos</code> is used to denote the index of the node that tail&#39;s <code>next</code> pointer is connected to (<strong>0-indexed</strong>). It is <code>-1</code> if there is no cycle. <strong>Note that</strong> <code>pos</code> <strong>is not passed as a parameter</strong>.</p>\n\n<p><strong>Do not modify</strong> the linked list.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png\" style=\"height: 145px; width: 450px;\" />\n<pre>\n<strong>Input:</strong> head = [3,2,0,-4], pos = 1\n<strong>Output:</strong> tail connects to node index 1\n<strong>Explanation:</strong> There is a cycle in the linked list, where tail connects to the second node.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png\" style=\"height: 105px; width: 201px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2], pos = 0\n<strong>Output:</strong> tail connects to node index 0\n<strong>Explanation:</strong> There is a cycle in the linked list, where tail connects to the first node.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png\" style=\"height: 65px; width: 65px;\" />\n<pre>\n<strong>Input:</strong> head = [1], pos = -1\n<strong>Output:</strong> no cycle\n<strong>Explanation:</strong> There is no cycle in the linked list.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>\n",
    "leetcodeSlug": "linked-list-cycle-ii",
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "entryFunction": "detectCycle",
    "examples": [
      {
        "input": "head = [3,2,0,-4]\npos = 1",
        "output": "2"
      }
    ],
    "patternHints": [
      "Floyd then reset",
      "Meet point"
    ],
    "starterCode": "var detectCycle = function (head, pos) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var detectCycle = function (head, pos) {\n\n\n  return pos >= 0 ? head[pos] : null;\n\n\n};",
    "sampleInput": "{\"head\":[3,2,0,-4],\"pos\":1}",
    "humanInput": "head = [3,2,0,-4]\npos = 1",
    "sampleOutput": "2",
    "sheetNumber": 60,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-061-delete-node-in-a-linked-list",
    "title": "Delete Node in a Linked List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Delete given node in linked list (array).",
    "description": "<p>There is a singly-linked list <code>head</code> and we want to delete a node <code>node</code> in it.</p>\n\n<p>You are given the node to be deleted <code>node</code>. You will <strong>not be given access</strong> to the first node of <code>head</code>.</p>\n\n<p>All the values of the linked list are <strong>unique</strong>, and it is guaranteed that the given node <code>node</code> is not the last node in the linked list.</p>\n\n<p>Delete the given node. Note that by deleting the node, we do not mean removing it from memory. We mean:</p>\n\n<ul>\n\t<li>The value of the given node should not exist in the linked list.</li>\n\t<li>The number of nodes in the linked list should decrease by one.</li>\n\t<li>All the values before <code>node</code> should be in the same order.</li>\n\t<li>All the values after <code>node</code> should be in the same order.</li>\n</ul>\n\n<p><strong>Custom testing:</strong></p>\n\n<ul>\n\t<li>For the input, you should provide the entire linked list <code>head</code> and the node to be given <code>node</code>. <code>node</code> should not be the last node of the list and should be an actual node in the list.</li>\n\t<li>We will build the linked list and pass the node to your function.</li>\n\t<li>The output will be the entire list after calling your function.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/01/node1.jpg\" style=\"width: 400px; height: 286px;\" />\n<pre>\n<strong>Input:</strong> head = [4,5,1,9], node = 5\n<strong>Output:</strong> [4,1,9]\n<strong>Explanation: </strong>You are given the second node with value 5, the linked list should become 4 -&gt; 1 -&gt; 9 after calling your function.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/01/node2.jpg\" style=\"width: 400px; height: 315px;\" />\n<pre>\n<strong>Input:</strong> head = [4,5,1,9], node = 1\n<strong>Output:</strong> [4,5,9]\n<strong>Explanation: </strong>You are given the third node with value 1, the linked list should become 4 -&gt; 5 -&gt; 9 after calling your function.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the given list is in the range <code>[2, 1000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li>The value of each node in the list is <strong>unique</strong>.</li>\n\t<li>The <code>node</code> to be deleted is <strong>in the list</strong> and is <strong>not a tail</strong> node.</li>\n</ul>\n",
    "leetcodeSlug": "delete-node-in-a-linked-list",
    "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
    "entryFunction": "deleteNode",
    "examples": [
      {
        "input": "head = [4,5,1,9]\nnode = 1",
        "output": "[4,1,9]"
      }
    ],
    "patternHints": [
      "Copy next value",
      "Skip node"
    ],
    "starterCode": "var deleteNode = function (head, node) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var deleteNode = function (head, node) {\n\n\n  const a = head.slice();\n  a.splice(node, 1);\n  return a;\n\n\n};",
    "sampleInput": "{\"head\":[4,5,1,9],\"node\":1}",
    "humanInput": "head = [4,5,1,9]\nnode = 1",
    "sampleOutput": "[\n  4,\n  1,\n  9\n]",
    "sheetNumber": 61,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-062-reverse-linked-list",
    "title": "Reverse Linked List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Reverse linked list (array).",
    "description": "<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [5,4,3,2,1]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg\" style=\"width: 182px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2]\n<strong>Output:</strong> [2,1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>\n\t<li><code>-5000 &lt;= Node.val &lt;= 5000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> A linked list can be reversed either iteratively or recursively. Could you implement both?</p>\n",
    "leetcodeSlug": "reverse-linked-list",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
    "entryFunction": "reverseList",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5,4,3,2,1]"
      }
    ],
    "patternHints": [
      "Iterative reverse",
      "Three pointers"
    ],
    "starterCode": "var reverseList = function (head) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var reverseList = function (head) {\n\n\n  return head.slice().reverse();\n\n\n};",
    "sampleInput": "{\"head\":[1,2,3,4,5]}",
    "humanInput": "head = [1,2,3,4,5]",
    "sampleOutput": "[\n  5,\n  4,\n  3,\n  2,\n  1\n]",
    "sheetNumber": 62,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-063-palindrome-linked",
    "title": "Palindrome Linked",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Check if linked list is palindrome.",
    "examples": [
      {
        "input": "head = [1,2,2,1]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Find mid reverse",
      "Compare halves"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head;\n  const mid = Math.floor(a.length / 2);\n  const left = a.slice(0, mid);\n  const right = a.length % 2 ? a.slice(mid + 1) : a.slice(mid);\n  return left.join() === right.reverse().join();\n}",
    "sampleInput": "{\"head\":[1,2,2,1]}",
    "humanInput": "head = [1,2,2,1]",
    "sampleOutput": "true",
    "sheetNumber": 63,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-064-remove-linked-list",
    "title": "Remove Linked List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Remove all nodes equal to val.",
    "examples": [
      {
        "input": "head = [1,2,6,3,4,5,6]\nval = 6",
        "output": "[1,2,3,4,5]"
      }
    ],
    "patternHints": [
      "Filter array",
      "Return list"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.head.filter((x) => x !== input.val);\n}",
    "sampleInput": "{\"head\":[1,2,6,3,4,5,6],\"val\":6}",
    "humanInput": "head = [1,2,6,3,4,5,6]\nval = 6",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  4,\n  5\n]",
    "sheetNumber": 64,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-065-convert-binary-number-in-a-linked-list-to-intege",
    "title": "Convert Binary Number in a Linked List to Integer",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "easy",
    "statement": "Convert binary linked list to integer.",
    "description": "<p>Given <code>head</code> which is a reference node to a singly-linked list. The value of each node in the linked list is either <code>0</code> or <code>1</code>. The linked list holds the binary representation of a number.</p>\n\n<p>Return the <em>decimal value</em> of the number in the linked list.</p>\n\n<p>The <strong>most significant bit</strong> is at the head of the linked list.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/12/05/graph-1.png\" style=\"width: 426px; height: 108px;\" />\n<pre>\n<strong>Input:</strong> head = [1,0,1]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> (101) in base 2 = (5) in base 10\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [0]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The Linked List is not empty.</li>\n\t<li>Number of nodes will not exceed <code>30</code>.</li>\n\t<li>Each node&#39;s value is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "convert-binary-number-in-a-linked-list-to-integer",
    "leetcodeUrl": "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/",
    "entryFunction": "getDecimalValue",
    "examples": [
      {
        "input": "head = [1,0,1]",
        "output": "5"
      }
    ],
    "patternHints": [
      "Accumulate bits",
      "Left shift"
    ],
    "starterCode": "var getDecimalValue = function (head) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var getDecimalValue = function (head) {\n\n\n  return head.reduce((acc, b) => acc * 2 + b, 0);\n\n\n};",
    "sampleInput": "{\"head\":[1,0,1]}",
    "humanInput": "head = [1,0,1]",
    "sampleOutput": "5",
    "sheetNumber": 65,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-066-remove-duplicates-from-sorted-list-ii",
    "title": "Remove Duplicates from Sorted List II",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Remove duplicates from sorted list II.",
    "description": "<p>Given the <code>head</code> of a sorted linked list, <em>delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list</em>. Return <em>the linked list <strong>sorted</strong> as well</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg\" style=\"width: 500px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,3,4,4,5]\n<strong>Output:</strong> [1,2,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg\" style=\"width: 500px; height: 205px;\" />\n<pre>\n<strong>Input:</strong> head = [1,1,1,2,3]\n<strong>Output:</strong> [2,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 300]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li>The list is guaranteed to be <strong>sorted</strong> in ascending order.</li>\n</ul>\n",
    "leetcodeSlug": "remove-duplicates-from-sorted-list-ii",
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
    "entryFunction": "deleteDuplicates",
    "examples": [
      {
        "input": "head = [1,2,3,3,4,4,5]",
        "output": "[1,2,5]"
      }
    ],
    "patternHints": [
      "Skip duplicate runs",
      "Dummy head"
    ],
    "starterCode": "var deleteDuplicates = function (head) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var deleteDuplicates = function (head) {\n\n\n  const a = head, out = [];\n  for (let i = 0; i < a.length; ) {\n    let j = i;\n    while (j < a.length && a[j] === a[i]) j++;\n    if (j - i === 1) out.push(a[i]);\n    i = j;\n  }\n  return out;\n\n\n};",
    "sampleInput": "{\"head\":[1,2,3,3,4,4,5]}",
    "humanInput": "head = [1,2,3,3,4,4,5]",
    "sampleOutput": "[\n  1,\n  2,\n  5\n]",
    "sheetNumber": 66,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-067-reverse-linked-list-ii",
    "title": "Reverse Linked List II",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Reverse linked list between left and right.",
    "description": "<p>Given the <code>head</code> of a singly linked list and two integers <code>left</code> and <code>right</code> where <code>left &lt;= right</code>, reverse the nodes of the list from position <code>left</code> to position <code>right</code>, and return <em>the reversed list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], left = 2, right = 4\n<strong>Output:</strong> [1,4,3,2,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [5], left = 1, right = 1\n<strong>Output:</strong> [5]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>n</code>.</li>\n\t<li><code>1 &lt;= n &lt;= 500</code></li>\n\t<li><code>-500 &lt;= Node.val &lt;= 500</code></li>\n\t<li><code>1 &lt;= left &lt;= right &lt;= n</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you do it in one pass?",
    "leetcodeSlug": "reverse-linked-list-ii",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
    "entryFunction": "reverseBetween",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]\nleft = 2\nright = 4",
        "output": "[1,4,3,2,5]"
      }
    ],
    "patternHints": [
      "Reverse subrange",
      "1-based indices"
    ],
    "starterCode": "var reverseBetween = function (head, left, right) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var reverseBetween = function (head, left, right) {\n\n\n  const a = head.slice();\n  const seg = a.splice(left - 1, right - left + 1).reverse();\n  a.splice(left - 1, 0, ...seg);\n  return a;\n\n\n};",
    "sampleInput": "{\"head\":[1,2,3,4,5],\"left\":2,\"right\":4}",
    "humanInput": "head = [1,2,3,4,5]\nleft = 2\nright = 4",
    "sampleOutput": "[\n  1,\n  4,\n  3,\n  2,\n  5\n]",
    "sheetNumber": 67,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-068-sort-list",
    "title": "Sort List",
    "patternSlug": "fast-slow-pointers",
    "patternName": "Linked Lists",
    "difficulty": "medium",
    "statement": "Sort linked list (array merge sort).",
    "description": "<p>Given the <code>head</code> of a linked list, return <em>the list after sorting it in <strong>ascending order</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg\" style=\"width: 450px; height: 194px;\" />\n<pre>\n<strong>Input:</strong> head = [4,2,1,3]\n<strong>Output:</strong> [1,2,3,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg\" style=\"width: 550px; height: 184px;\" />\n<pre>\n<strong>Input:</strong> head = [-1,5,3,4,0]\n<strong>Output:</strong> [-1,0,3,4,5]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 5 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you sort the linked list in <code>O(n logn)</code> time and <code>O(1)</code> memory (i.e. constant space)?</p>\n",
    "leetcodeSlug": "sort-list",
    "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
    "entryFunction": "sortList",
    "examples": [
      {
        "input": "head = [4,2,1,3]",
        "output": "[1,2,3,4]"
      }
    ],
    "patternHints": [
      "Merge sort",
      "Split halves"
    ],
    "starterCode": "var sortList = function (head) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var sortList = function (head) {\n\n\n  const sort = (arr) => {\n    if (arr.length <= 1) return arr;\n    const m = arr.length >> 1;\n    return merge(sort(arr.slice(0, m)), sort(arr.slice(m)));\n  };\n  const merge = (a, b) => {\n    const out = [];\n    let i = 0, j = 0;\n    while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);\n    return out.concat(a.slice(i), b.slice(j));\n  };\n  return sort(head.slice());\n\n\n};",
    "sampleInput": "{\"head\":[4,2,1,3]}",
    "humanInput": "head = [4,2,1,3]",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  4\n]",
    "sheetNumber": 68,
    "sheetSectionId": "linked-lists",
    "sheetSubsectionId": "linked-lists-linked-lists",
    "source": "sheet"
  },
  {
    "id": "bc-069-implement-stack-using-queues",
    "title": "Implement Stack using Queues",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "easy",
    "statement": "Implement stack using queues.",
    "description": "<p>Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (<code>push</code>, <code>top</code>, <code>pop</code>, and <code>empty</code>).</p>\n\n<p>Implement the <code>MyStack</code> class:</p>\n\n<ul>\n\t<li><code>void push(int x)</code> Pushes element x to the top of the stack.</li>\n\t<li><code>int pop()</code> Removes the element on the top of the stack and returns it.</li>\n\t<li><code>int top()</code> Returns the element on the top of the stack.</li>\n\t<li><code>boolean empty()</code> Returns <code>true</code> if the stack is empty, <code>false</code> otherwise.</li>\n</ul>\n\n<p><b>Notes:</b></p>\n\n<ul>\n\t<li>You must use <strong>only</strong> standard operations of a queue, which means that only <code>push to back</code>, <code>peek/pop from front</code>, <code>size</code> and <code>is empty</code> operations are valid.</li>\n\t<li>Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue&#39;s standard operations.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MyStack&quot;, &quot;push&quot;, &quot;push&quot;, &quot;top&quot;, &quot;pop&quot;, &quot;empty&quot;]\n[[], [1], [2], [], [], []]\n<strong>Output</strong>\n[null, null, null, 2, 2, false]\n\n<strong>Explanation</strong>\nMyStack myStack = new MyStack();\nmyStack.push(1);\nmyStack.push(2);\nmyStack.top(); // return 2\nmyStack.pop(); // return 2\nmyStack.empty(); // return False\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= x &lt;= 9</code></li>\n\t<li>At most <code>100</code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>empty</code>.</li>\n\t<li>All the calls to <code>pop</code> and <code>top</code> are valid.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you implement the stack using only one queue?</p>\n",
    "leetcodeSlug": "implement-stack-using-queues",
    "leetcodeUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
    "examples": [
      {
        "input": "ops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]",
        "output": "[1]"
      }
    ],
    "patternHints": [
      "Push to q2",
      "Move elements"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const stack = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') stack.push(op[1]);\n    else if (op[0] === 'pop') stack.pop();\n    else if (op[0] === 'top') stack[stack.length - 1];\n  }\n  return stack;\n}",
    "sampleInput": "{\"ops\":[[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]}",
    "humanInput": "ops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]",
    "sampleOutput": "[\n  1\n]",
    "sheetNumber": 69,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-070-implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "easy",
    "statement": "Implement queue using stacks.",
    "description": "<p>Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (<code>push</code>, <code>peek</code>, <code>pop</code>, and <code>empty</code>).</p>\n\n<p>Implement the <code>MyQueue</code> class:</p>\n\n<ul>\n\t<li><code>void push(int x)</code> Pushes element x to the back of the queue.</li>\n\t<li><code>int pop()</code> Removes the element from the front of the queue and returns it.</li>\n\t<li><code>int peek()</code> Returns the element at the front of the queue.</li>\n\t<li><code>boolean empty()</code> Returns <code>true</code> if the queue is empty, <code>false</code> otherwise.</li>\n</ul>\n\n<p><strong>Notes:</strong></p>\n\n<ul>\n\t<li>You must use <strong>only</strong> standard operations of a stack, which means only <code>push to top</code>, <code>peek/pop from top</code>, <code>size</code>, and <code>is empty</code> operations are valid.</li>\n\t<li>Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack&#39;s standard operations.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MyQueue&quot;, &quot;push&quot;, &quot;push&quot;, &quot;peek&quot;, &quot;pop&quot;, &quot;empty&quot;]\n[[], [1], [2], [], [], []]\n<strong>Output</strong>\n[null, null, null, 1, 1, false]\n\n<strong>Explanation</strong>\nMyQueue myQueue = new MyQueue();\nmyQueue.push(1); // queue is: [1]\nmyQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)\nmyQueue.peek(); // return 1\nmyQueue.pop(); // return 1, queue is [2]\nmyQueue.empty(); // return false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= x &lt;= 9</code></li>\n\t<li>At most <code>100</code>&nbsp;calls will be made to <code>push</code>, <code>pop</code>, <code>peek</code>, and <code>empty</code>.</li>\n\t<li>All the calls to <code>pop</code> and <code>peek</code> are valid.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you implement the queue such that each operation is <strong><a href=\"https://en.wikipedia.org/wiki/Amortized_analysis\" target=\"_blank\">amortized</a></strong> <code>O(1)</code> time complexity? In other words, performing <code>n</code> operations will take overall <code>O(n)</code> time even if one of those operations may take longer.</p>\n",
    "leetcodeSlug": "implement-queue-using-stacks",
    "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "examples": [
      {
        "input": "ops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]",
        "output": "[2]"
      }
    ],
    "patternHints": [
      "Two stacks",
      "Amortized O(1)"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const q = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') q.push(op[1]);\n    else if (op[0] === 'pop') q.shift();\n  }\n  return q;\n}",
    "sampleInput": "{\"ops\":[[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]}",
    "humanInput": "ops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]",
    "sampleOutput": "[\n  2\n]",
    "sheetNumber": 70,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-071-backspace-string-compare",
    "title": "Backspace String Compare",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "easy",
    "statement": "Compare strings with backspace (#).",
    "description": "<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> <em>if they are equal when both are typed into empty text editors</em>. <code>&#39;#&#39;</code> means a backspace character.</p>\n\n<p>Note that after backspacing an empty text, the text will continue empty.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ab#c&quot;, t = &quot;ad#c&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Both s and t become &quot;ac&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ab##&quot;, t = &quot;c#d#&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Both s and t become &quot;&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a#c&quot;, t = &quot;b&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> s becomes &quot;c&quot; while t becomes &quot;b&quot;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code><span>1 &lt;= s.length, t.length &lt;= 200</span></code></li>\n\t<li><span><code>s</code> and <code>t</code> only contain lowercase letters and <code>&#39;#&#39;</code> characters.</span></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you solve it in <code>O(n)</code> time and <code>O(1)</code> space?</p>\n",
    "leetcodeSlug": "backspace-string-compare",
    "leetcodeUrl": "https://leetcode.com/problems/backspace-string-compare/",
    "entryFunction": "backspaceCompare",
    "examples": [
      {
        "input": "s = \"ab#c\"\nt = \"ad#c\"",
        "output": "true"
      }
    ],
    "patternHints": [
      "Stack build",
      "Pop on #"
    ],
    "starterCode": "var backspaceCompare = function (s, t) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var backspaceCompare = function (s, t) {\n\n\n  const build = (str) => {\n    const st = [];\n    for (const ch of str) { if (ch === '#') st.pop(); else st.push(ch); }\n    return st.join('');\n  };\n  return build(s) === build(t);\n\n\n};",
    "sampleInput": "{\"s\":\"ab#c\",\"t\":\"ad#c\"}",
    "humanInput": "s = \"ab#c\"\nt = \"ad#c\"",
    "sampleOutput": "true",
    "sheetNumber": 71,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-072-baseball-game",
    "title": "Baseball Game",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "easy",
    "statement": "Evaluate baseball stack scores.",
    "description": "<p>You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.</p>\n\n<p>You are given a list of strings <code>operations</code>, where <code>operations[i]</code> is the <code>i<sup>th</sup></code> operation you must apply to the record and is one of the following:</p>\n\n<ul>\n\t<li>An integer <code>x</code>.\n\n\t<ul>\n\t\t<li>Record a new score of <code>x</code>.</li>\n\t</ul>\n\t</li>\n\t<li><code>&#39;+&#39;</code>.\n\t<ul>\n\t\t<li>Record a new score that is the sum of the previous two scores.</li>\n\t</ul>\n\t</li>\n\t<li><code>&#39;D&#39;</code>.\n\t<ul>\n\t\t<li>Record a new score that is the double of the previous score.</li>\n\t</ul>\n\t</li>\n\t<li><code>&#39;C&#39;</code>.\n\t<ul>\n\t\t<li>Invalidate the previous score, removing it from the record.</li>\n\t</ul>\n\t</li>\n</ul>\n\n<p>Return <em>the sum of all the scores on the record after applying all the operations</em>.</p>\n\n<p>The test cases are generated such that the answer and all intermediate calculations fit in a <strong>32-bit</strong> integer and that all operations are valid.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> ops = [&quot;5&quot;,&quot;2&quot;,&quot;C&quot;,&quot;D&quot;,&quot;+&quot;]\n<strong>Output:</strong> 30\n<strong>Explanation:</strong>\n&quot;5&quot; - Add 5 to the record, record is now [5].\n&quot;2&quot; - Add 2 to the record, record is now [5, 2].\n&quot;C&quot; - Invalidate and remove the previous score, record is now [5].\n&quot;D&quot; - Add 2 * 5 = 10 to the record, record is now [5, 10].\n&quot;+&quot; - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].\nThe total sum is 5 + 10 + 15 = 30.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> ops = [&quot;5&quot;,&quot;-2&quot;,&quot;4&quot;,&quot;C&quot;,&quot;D&quot;,&quot;9&quot;,&quot;+&quot;,&quot;+&quot;]\n<strong>Output:</strong> 27\n<strong>Explanation:</strong>\n&quot;5&quot; - Add 5 to the record, record is now [5].\n&quot;-2&quot; - Add -2 to the record, record is now [5, -2].\n&quot;4&quot; - Add 4 to the record, record is now [5, -2, 4].\n&quot;C&quot; - Invalidate and remove the previous score, record is now [5, -2].\n&quot;D&quot; - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].\n&quot;9&quot; - Add 9 to the record, record is now [5, -2, -4, 9].\n&quot;+&quot; - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].\n&quot;+&quot; - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].\nThe total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> ops = [&quot;1&quot;,&quot;C&quot;]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong>\n&quot;1&quot; - Add 1 to the record, record is now [1].\n&quot;C&quot; - Invalidate and remove the previous score, record is now [].\nSince the record is empty, the total sum is 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= operations.length &lt;= 1000</code></li>\n\t<li><code>operations[i]</code> is <code>&quot;C&quot;</code>, <code>&quot;D&quot;</code>, <code>&quot;+&quot;</code>, or a string representing an integer in the range <code>[-3 * 10<sup>4</sup>, 3 * 10<sup>4</sup>]</code>.</li>\n\t<li>For operation <code>&quot;+&quot;</code>, there will always be at least two previous scores on the record.</li>\n\t<li>For operations <code>&quot;C&quot;</code> and <code>&quot;D&quot;</code>, there will always be at least one previous score on the record.</li>\n</ul>\n",
    "leetcodeSlug": "baseball-game",
    "leetcodeUrl": "https://leetcode.com/problems/baseball-game/",
    "entryFunction": "calPoints",
    "examples": [
      {
        "input": "operations = [\"5\",\"2\",\"C\",\"D\",\"+\"]",
        "output": "30"
      }
    ],
    "patternHints": [
      "Stack ops",
      "Apply signs"
    ],
    "starterCode": "var calPoints = function (operations) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var calPoints = function (operations) {\n\n\n  const st = [];\n  for (const op of operations) {\n    if (op === 'C') st.pop();\n    else if (op === 'D') st.push(st[st.length - 1] * 2);\n    else if (op === '+') st.push(st[st.length - 2] + st[st.length - 1]);\n    else st.push(+op);\n  }\n  return st.reduce((a, b) => a + b, 0);\n\n\n};",
    "sampleInput": "{\"operations\":[\"5\",\"2\",\"C\",\"D\",\"+\"]}",
    "humanInput": "operations = [\"5\",\"2\",\"C\",\"D\",\"+\"]",
    "sampleOutput": "30",
    "sheetNumber": 72,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-073-longest-valid-parentheses",
    "title": "Longest Valid Parentheses",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "hard",
    "statement": "Longest valid parentheses length.",
    "description": "<p>Given a string containing just the characters <code>&#39;(&#39;</code> and <code>&#39;)&#39;</code>, return <em>the length of the longest valid (well-formed) parentheses </em><span data-keyword=\"substring-nonempty\"><em>substring</em></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;(()&quot;\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The longest valid parentheses substring is &quot;()&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;)()())&quot;\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest valid parentheses substring is &quot;()()&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;&quot;\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s[i]</code> is <code>&#39;(&#39;</code>, or <code>&#39;)&#39;</code>.</li>\n</ul>\n",
    "leetcodeSlug": "longest-valid-parentheses",
    "leetcodeUrl": "https://leetcode.com/problems/longest-valid-parentheses/",
    "entryFunction": "longestValidParentheses",
    "examples": [
      {
        "input": "s = \")()())\"",
        "output": "4"
      }
    ],
    "patternHints": [
      "Stack indices",
      "Track gaps"
    ],
    "starterCode": "var longestValidParentheses = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var longestValidParentheses = function (s) {\n\n\n  const st = [-1];\n  let best = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(') st.push(i);\n    else {\n      st.pop();\n      if (!st.length) st.push(i);\n      else best = Math.max(best, i - st[st.length - 1]);\n    }\n  }\n  return best;\n\n\n};",
    "sampleInput": "{\"s\":\")()())\"}",
    "humanInput": "s = \")()())\"",
    "sampleOutput": "4",
    "sheetNumber": 73,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-074-evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "medium",
    "statement": "Evaluate Reverse Polish Notation.",
    "description": "<p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in a <a href=\"http://en.wikipedia.org/wiki/Reverse_Polish_notation\" target=\"_blank\">Reverse Polish Notation</a>.</p>\n\n<p>Evaluate the expression. Return <em>an integer that represents the value of the expression</em>.</p>\n\n<p><strong>Note</strong> that:</p>\n\n<ul>\n\t<li>The valid operators are <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, <code>&#39;*&#39;</code>, and <code>&#39;/&#39;</code>.</li>\n\t<li>Each operand may be an integer or another expression.</li>\n\t<li>The division between two integers always <strong>truncates toward zero</strong>.</li>\n\t<li>There will not be any division by zero.</li>\n\t<li>The input represents a valid arithmetic expression in a reverse polish notation.</li>\n\t<li>The answer and all the intermediate calculations can be represented in a <strong>32-bit</strong> integer.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> tokens = [&quot;2&quot;,&quot;1&quot;,&quot;+&quot;,&quot;3&quot;,&quot;*&quot;]\n<strong>Output:</strong> 9\n<strong>Explanation:</strong> ((2 + 1) * 3) = 9\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> tokens = [&quot;4&quot;,&quot;13&quot;,&quot;5&quot;,&quot;/&quot;,&quot;+&quot;]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> (4 + (13 / 5)) = 6\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> tokens = [&quot;10&quot;,&quot;6&quot;,&quot;9&quot;,&quot;3&quot;,&quot;+&quot;,&quot;-11&quot;,&quot;*&quot;,&quot;/&quot;,&quot;*&quot;,&quot;17&quot;,&quot;+&quot;,&quot;5&quot;,&quot;+&quot;]\n<strong>Output:</strong> 22\n<strong>Explanation:</strong> ((10 * (6 / ((9 + 3) * -11))) + 17) + 5\n= ((10 * (6 / (12 * -11))) + 17) + 5\n= ((10 * (6 / -132)) + 17) + 5\n= ((10 * 0) + 17) + 5\n= (0 + 17) + 5\n= 17 + 5\n= 22\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= tokens.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>tokens[i]</code> is either an operator: <code>&quot;+&quot;</code>, <code>&quot;-&quot;</code>, <code>&quot;*&quot;</code>, or <code>&quot;/&quot;</code>, or an integer in the range <code>[-200, 200]</code>.</li>\n</ul>\n",
    "leetcodeSlug": "evaluate-reverse-polish-notation",
    "leetcodeUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "entryFunction": "evalRPN",
    "examples": [
      {
        "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
        "output": "9"
      }
    ],
    "patternHints": [
      "Stack operands",
      "Apply operator"
    ],
    "starterCode": "var evalRPN = function (tokens) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var evalRPN = function (tokens) {\n\n\n  const st = [];\n  for (const t of tokens) {\n    if ('+-*/'.includes(t)) {\n      const b = st.pop(), a = st.pop();\n      st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : (a / b) | 0);\n    } else st.push(+t);\n  }\n  return st[0];\n\n\n};",
    "sampleInput": "{\"tokens\":[\"2\",\"1\",\"+\",\"3\",\"*\"]}",
    "humanInput": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
    "sampleOutput": "9",
    "sheetNumber": 74,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-075-daily-temperatures",
    "title": "Daily Temperatures",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "medium",
    "statement": "Daily temperatures: days until warmer.",
    "description": "<p>Given an array of integers <code>temperatures</code> represents the daily temperatures, return <em>an array</em> <code>answer</code> <em>such that</em> <code>answer[i]</code> <em>is the number of days you have to wait after the</em> <code>i<sup>th</sup></code> <em>day to get a warmer temperature</em>. If there is no future day for which this is possible, keep <code>answer[i] == 0</code> instead.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> temperatures = [73,74,75,71,69,72,76,73]\n<strong>Output:</strong> [1,1,4,2,1,1,0,0]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> temperatures = [30,40,50,60]\n<strong>Output:</strong> [1,1,1,0]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> temperatures = [30,60,90]\n<strong>Output:</strong> [1,1,0]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;temperatures.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>30 &lt;=&nbsp;temperatures[i] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "daily-temperatures",
    "leetcodeUrl": "https://leetcode.com/problems/daily-temperatures/",
    "entryFunction": "dailyTemperatures",
    "examples": [
      {
        "input": "temperatures = [73,74,75,71,69,72,76,73]",
        "output": "[1,1,4,2,1,1,0,0]"
      }
    ],
    "patternHints": [
      "Monotonic stack",
      "Next greater"
    ],
    "starterCode": "var dailyTemperatures = function (temperatures) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var dailyTemperatures = function (temperatures) {\n\n\n  const ans = Array(temperatures.length).fill(0), st = [];\n  for (let i = 0; i < temperatures.length; i++) {\n    while (st.length && temperatures[i] > temperatures[st[st.length - 1]]) {\n      const j = st.pop();\n      ans[j] = i - j;\n    }\n    st.push(i);\n  }\n  return ans;\n\n\n};",
    "sampleInput": "{\"temperatures\":[73,74,75,71,69,72,76,73]}",
    "humanInput": "temperatures = [73,74,75,71,69,72,76,73]",
    "sampleOutput": "[\n  1,\n  1,\n  4,\n  2,\n  1,\n  1,\n  0,\n  0\n]",
    "sheetNumber": 75,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-076-largest-rectangle-in-histogram",
    "title": "Largest Rectangle in Histogram",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "hard",
    "statement": "Largest rectangle in histogram.",
    "description": "<p>Given an array of integers <code>heights</code> representing the histogram&#39;s bar height where the width of each bar is <code>1</code>, return <em>the area of the largest rectangle in the histogram</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg\" style=\"width: 522px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> heights = [2,1,5,6,2,3]\n<strong>Output:</strong> 10\n<strong>Explanation:</strong> The above is a histogram where width of each bar is 1.\nThe largest rectangle is shown in the red area, which has an area = 10 units.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg\" style=\"width: 202px; height: 362px;\" />\n<pre>\n<strong>Input:</strong> heights = [2,4]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= heights.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= heights[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "largest-rectangle-in-histogram",
    "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "entryFunction": "largestRectangleArea",
    "examples": [
      {
        "input": "nums = [2,1,5,6,2,3]",
        "output": "10"
      }
    ],
    "patternHints": [
      "Monotonic stack",
      "Expand bars"
    ],
    "starterCode": "var largestRectangleArea = function (heights) {\n\n  // TODO\n\n};",
    "solutionCode": "var largestRectangleArea = function (heights) {\n\n  const st = [], ans = [];\n  heights.push(0);\n  for (let i = 0; i < heights.length; i++) {\n    while (st.length && heights[i] < heights[st[st.length - 1]]) {\n      const h = heights[st.pop()];\n      const w = st.length ? i - st[st.length - 1] - 1 : i;\n      ans.push(h * w);\n    }\n    st.push(i);\n  }\n  return Math.max(...ans);\n\n};",
    "sampleInput": "{\"nums\":[2,1,5,6,2,3]}",
    "humanInput": "nums = [2,1,5,6,2,3]",
    "sampleOutput": "10",
    "sheetNumber": 76,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-077-min-stack",
    "title": "Min Stack",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "medium",
    "statement": "Min stack supporting getMin in O(1).",
    "description": "<p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.</p>\n\n<p>Implement the <code>MinStack</code> class:</p>\n\n<ul>\n\t<li><code>MinStack()</code> initializes the stack object.</li>\n\t<li><code>void push(int val)</code> pushes the element <code>val</code> onto the stack.</li>\n\t<li><code>void pop()</code> removes the element on the top of the stack.</li>\n\t<li><code>int top()</code> gets the top element of the stack.</li>\n\t<li><code>int getMin()</code> retrieves the minimum element in the stack.</li>\n</ul>\n\n<p>You must implement a solution with <code>O(1)</code> time complexity for each function.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MinStack&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;getMin&quot;,&quot;pop&quot;,&quot;top&quot;,&quot;getMin&quot;]\n[[],[-2],[0],[-3],[],[],[],[]]\n\n<strong>Output</strong>\n[null,null,null,null,-3,null,0,-2]\n\n<strong>Explanation</strong>\nMinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>Methods <code>pop</code>, <code>top</code> and <code>getMin</code> operations will always be called on <strong>non-empty</strong> stacks.</li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code>.</li>\n</ul>\n",
    "leetcodeSlug": "min-stack",
    "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
    "examples": [
      {
        "input": "ops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]",
        "output": "-3"
      }
    ],
    "patternHints": [
      "Aux min stack",
      "Track minimum"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const st = [], mins = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') { st.push(op[1]); mins.push(Math.min(op[1], mins.at(-1) ?? op[1])); }\n    else if (op[0] === 'pop') { st.pop(); mins.pop(); }\n    else if (op[0] === 'getMin') return mins.at(-1);\n    else if (op[0] === 'top') return st.at(-1);\n  }\n  return mins.at(-1);\n}",
    "sampleInput": "{\"ops\":[[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]}",
    "humanInput": "ops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]",
    "sampleOutput": "-3",
    "sheetNumber": 77,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-078-minimum-remove-to-make-valid-parentheses",
    "title": "Minimum Remove to Make Valid Parentheses",
    "patternSlug": "monotonic-stack",
    "patternName": "Stack & Queue",
    "difficulty": "medium",
    "statement": "Minimum removes to make parentheses valid.",
    "description": "<p>Given a string <font face=\"monospace\">s</font> of <code>&#39;(&#39;</code> , <code>&#39;)&#39;</code> and lowercase English characters.</p>\n\n<p>Your task is to remove the minimum number of parentheses ( <code>&#39;(&#39;</code> or <code>&#39;)&#39;</code>, in any positions ) so that the resulting <em>parentheses string</em> is valid and return <strong>any</strong> valid string.</p>\n\n<p>Formally, a <em>parentheses string</em> is valid if and only if:</p>\n\n<ul>\n\t<li>It is the empty string, contains only lowercase characters, or</li>\n\t<li>It can be written as <code>AB</code> (<code>A</code> concatenated with <code>B</code>), where <code>A</code> and <code>B</code> are valid strings, or</li>\n\t<li>It can be written as <code>(A)</code>, where <code>A</code> is a valid string.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;lee(t(c)o)de)&quot;\n<strong>Output:</strong> &quot;lee(t(c)o)de&quot;\n<strong>Explanation:</strong> &quot;lee(t(co)de)&quot; , &quot;lee(t(c)ode)&quot; would also be accepted.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a)b(c)d&quot;\n<strong>Output:</strong> &quot;ab(c)d&quot;\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;))((&quot;\n<strong>Output:</strong> &quot;&quot;\n<strong>Explanation:</strong> An empty string is also valid.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s[i]</code> is either&nbsp;<code>&#39;(&#39;</code> , <code>&#39;)&#39;</code>, or lowercase English letter.</li>\n</ul>\n",
    "leetcodeSlug": "minimum-remove-to-make-valid-parentheses",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
    "entryFunction": "minRemoveToMakeValid",
    "examples": [
      {
        "input": "s = \"lee(t(c)o)de)\"",
        "output": "1"
      }
    ],
    "patternHints": [
      "Stack open indices",
      "Count unmatched"
    ],
    "starterCode": "var minRemoveToMakeValid = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minRemoveToMakeValid = function (s) {\n\n\n  let removes = 0, open = 0;\n  for (const ch of s) {\n    if (ch === '(') open++;\n    else if (ch === ')') { if (open) open--; else removes++; }\n  }\n  return removes + open;\n\n\n};",
    "sampleInput": "{\"s\":\"lee(t(c)o)de)\"}",
    "humanInput": "s = \"lee(t(c)o)de)\"",
    "sampleOutput": "1",
    "sheetNumber": 78,
    "sheetSectionId": "stack-and-queue",
    "sheetSubsectionId": "stack-and-queue-stack-and-queue",
    "source": "sheet"
  },
  {
    "id": "bc-079-find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "patternSlug": "top-k-heap",
    "patternName": "Heap",
    "difficulty": "hard",
    "statement": "Find median from data stream (simplified).",
    "description": "<p>The <strong>median</strong> is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.</p>\n\n<ul>\n\t<li>For example, for <code>arr = [2,3,4]</code>, the median is <code>3</code>.</li>\n\t<li>For example, for <code>arr = [2,3]</code>, the median is <code>(2 + 3) / 2 = 2.5</code>.</li>\n</ul>\n\n<p>Implement the MedianFinder class:</p>\n\n<ul>\n\t<li><code>MedianFinder()</code> initializes the <code>MedianFinder</code> object.</li>\n\t<li><code>void addNum(int num)</code> adds the integer <code>num</code> from the data stream to the data structure.</li>\n\t<li><code>double findMedian()</code> returns the median of all elements so far. Answers within <code>10<sup>-5</sup></code> of the actual answer will be accepted.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MedianFinder&quot;, &quot;addNum&quot;, &quot;addNum&quot;, &quot;findMedian&quot;, &quot;addNum&quot;, &quot;findMedian&quot;]\n[[], [1], [2], [], [3], []]\n<strong>Output</strong>\n[null, null, null, 1.5, null, 2.0]\n\n<strong>Explanation</strong>\nMedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>5</sup> &lt;= num &lt;= 10<sup>5</sup></code></li>\n\t<li>There will be at least one element in the data structure before calling <code>findMedian</code>.</li>\n\t<li>At most <code>5 * 10<sup>4</sup></code> calls will be made to <code>addNum</code> and <code>findMedian</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>If all integer numbers from the stream are in the range <code>[0, 100]</code>, how would you optimize your solution?</li>\n\t<li>If <code>99%</code> of all integer numbers from the stream are in the range <code>[0, 100]</code>, how would you optimize your solution?</li>\n</ul>\n",
    "leetcodeSlug": "find-median-from-data-stream",
    "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "examples": [
      {
        "input": "ops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]",
        "output": "1.5"
      }
    ],
    "patternHints": [
      "Two heaps",
      "Balance sizes"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const arr = [];\n  for (const op of input.ops) {\n    if (op[0] === 'addNum') arr.push(op[1]);\n    else { arr.sort((a, b) => a - b); const m = arr.length >> 1; return arr.length % 2 ? arr[m] : (arr[m - 1] + arr[m]) / 2; }\n  }\n  return 0;\n}",
    "sampleInput": "{\"ops\":[[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]}",
    "humanInput": "ops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]",
    "sampleOutput": "1.5",
    "sheetNumber": 79,
    "sheetSectionId": "heap",
    "sheetSubsectionId": "heap-heap",
    "source": "sheet"
  },
  {
    "id": "bc-080-merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "patternSlug": "top-k-heap",
    "patternName": "Heap",
    "difficulty": "hard",
    "statement": "Merge k sorted lists (arrays).",
    "description": "<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p>\n\n<p><em>Merge all the linked-lists into one sorted linked-list and return it.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> lists = [[1,4,5],[1,3,4],[2,6]]\n<strong>Output:</strong> [1,1,2,3,4,4,5,6]\n<strong>Explanation:</strong> The linked-lists are:\n[\n  1-&gt;4-&gt;5,\n  1-&gt;3-&gt;4,\n  2-&gt;6\n]\nmerging them into one sorted linked list:\n1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> lists = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> lists = [[]]\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>k == lists.length</code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= lists[i].length &lt;= 500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= lists[i][j] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>lists[i]</code> is sorted in <strong>ascending order</strong>.</li>\n\t<li>The sum of <code>lists[i].length</code> will not exceed <code>10<sup>4</sup></code>.</li>\n</ul>\n",
    "leetcodeSlug": "merge-k-sorted-lists",
    "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "entryFunction": "mergeKLists",
    "examples": [
      {
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]"
      }
    ],
    "patternHints": [
      "Min heap or divide",
      "Merge pairs"
    ],
    "starterCode": "var mergeKLists = function (lists) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var mergeKLists = function (lists) {\n\n\n  return lists.flat().sort((a, b) => a - b);\n\n\n};",
    "sampleInput": "{\"lists\":[[1,4,5],[1,3,4],[2,6]]}",
    "humanInput": "lists = [[1,4,5],[1,3,4],[2,6]]",
    "sampleOutput": "[\n  1,\n  1,\n  2,\n  3,\n  4,\n  4,\n  5,\n  6\n]",
    "sheetNumber": 80,
    "sheetSectionId": "heap",
    "sheetSubsectionId": "heap-heap",
    "source": "sheet"
  },
  {
    "id": "bc-081-find-k-pairs-with-smallest-sums",
    "title": "Find K Pairs with Smallest Sums",
    "patternSlug": "top-k-heap",
    "patternName": "Heap",
    "difficulty": "medium",
    "statement": "K pairs with smallest sums from two arrays.",
    "description": "<p>You are given two integer arrays <code>nums1</code> and <code>nums2</code> sorted in <strong>non-decreasing&nbsp;order</strong> and an integer <code>k</code>.</p>\n\n<p>Define a pair <code>(u, v)</code> which consists of one element from the first array and one element from the second array.</p>\n\n<p>Return <em>the</em> <code>k</code> <em>pairs</em> <code>(u<sub>1</sub>, v<sub>1</sub>), (u<sub>2</sub>, v<sub>2</sub>), ..., (u<sub>k</sub>, v<sub>k</sub>)</code> <em>with the smallest sums</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,7,11], nums2 = [2,4,6], k = 3\n<strong>Output:</strong> [[1,2],[1,4],[1,6]]\n<strong>Explanation:</strong> The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,1,2], nums2 = [1,2,3], k = 2\n<strong>Output:</strong> [[1,1],[1,1]]\n<strong>Explanation:</strong> The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums1.length, nums2.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums1</code> and <code>nums2</code> both are sorted in <strong>non-decreasing order</strong>.</li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>\n\t<li><code>k &lt;=&nbsp;nums1.length *&nbsp;nums2.length</code></li>\n</ul>\n",
    "leetcodeSlug": "find-k-pairs-with-smallest-sums",
    "leetcodeUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    "entryFunction": "kSmallestPairs",
    "examples": [
      {
        "input": "nums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3",
        "output": "[3,5,7]"
      }
    ],
    "patternHints": [
      "Min heap",
      "Expand pairs"
    ],
    "starterCode": "var kSmallestPairs = function (nums1, nums2, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var kSmallestPairs = function (nums1, nums2, k) {\n\n\n  const pairs = [];\n  for (const a of nums1) for (const b of nums2) pairs.push(a + b);\n  pairs.sort((a, b) => a - b);\n  return pairs.slice(0, k);\n\n\n};",
    "sampleInput": "{\"nums1\":[1,7,11],\"nums2\":[2,4,6],\"k\":3}",
    "humanInput": "nums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3",
    "sampleOutput": "[\n  3,\n  5,\n  7\n]",
    "sheetNumber": 81,
    "sheetSectionId": "heap",
    "sheetSubsectionId": "heap-heap",
    "source": "sheet"
  },
  {
    "id": "bc-082-meeting-rooms-ii",
    "title": "Meeting Rooms II",
    "patternSlug": "top-k-heap",
    "patternName": "Heap",
    "difficulty": "medium",
    "statement": "Meeting rooms II: minimum rooms needed.",
    "leetcodeSlug": "meeting-rooms-ii",
    "leetcodeUrl": "https://leetcode.com/problems/meeting-rooms-ii/",
    "entryFunction": "minMeetingRooms",
    "examples": [
      {
        "input": "intervals = [[0,30],[5,10],[15,20]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Sort by start",
      "Heap of ends"
    ],
    "starterCode": "var minMeetingRooms = function (intervals) {\n\n  // TODO\n\n};",
    "solutionCode": "var minMeetingRooms = function (intervals) {\n\n  .slice().sort((a, b) => a[0] - b[0]);\n  const ends = [];\n  for (const [s, e] of intervals) {\n    ends.sort((a, b) => a - b);\n    if (ends.length && ends[0] <= s) ends.shift();\n    ends.push(e);\n  }\n  return ends.length;\n\n};",
    "sampleInput": "{\"intervals\":[[0,30],[5,10],[15,20]]}",
    "humanInput": "intervals = [[0,30],[5,10],[15,20]]",
    "sampleOutput": "2",
    "sheetNumber": 82,
    "sheetSectionId": "heap",
    "sheetSubsectionId": "heap-heap",
    "source": "sheet"
  },
  {
    "id": "bc-083-top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "patternSlug": "top-k-heap",
    "patternName": "Heap",
    "difficulty": "medium",
    "statement": "Top k frequent elements.",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the</em> <code>k</code> <em>most frequent elements</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,1,1,2,2,3], k = 2</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1], k = 1</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,2,1,2,1,2,3,1,3,2], k = 2</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>k</code> is in the range <code>[1, the number of unique elements in the array]</code>.</li>\n\t<li>It is <strong>guaranteed</strong> that the answer is <strong>unique</strong>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Your algorithm&#39;s time complexity must be better than <code>O(n log n)</code>, where n is the array&#39;s size.</p>\n",
    "leetcodeSlug": "top-k-frequent-elements",
    "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
    "entryFunction": "topKFrequent",
    "examples": [
      {
        "input": "nums = [1,1,1,2,2,3]\ntarget = 2",
        "output": "[1,2]"
      }
    ],
    "patternHints": [
      "Frequency map",
      "Bucket or heap"
    ],
    "starterCode": "var topKFrequent = function (nums, k) {\n\n  // TODO\n\n};",
    "solutionCode": "var topKFrequent = function (nums, k) {\n\n  const cnt = new Map();\n  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);\n  return [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([x]) => x);\n\n};",
    "sampleInput": "{\"nums\":[1,1,1,2,2,3],\"target\":2}",
    "humanInput": "nums = [1,1,1,2,2,3]\ntarget = 2",
    "sampleOutput": "[\n  1,\n  2\n]",
    "sheetNumber": 83,
    "sheetSectionId": "heap",
    "sheetSubsectionId": "heap-heap",
    "source": "sheet"
  },
  {
    "id": "bc-084-k-closest-points-to-origin",
    "title": "K Closest Points to Origin",
    "patternSlug": "top-k-heap",
    "patternName": "Heap",
    "difficulty": "medium",
    "statement": "K closest points to origin.",
    "description": "<p>Given an array of <code>points</code> where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents a point on the <strong>X-Y</strong> plane and an integer <code>k</code>, return the <code>k</code> closest points to the origin <code>(0, 0)</code>.</p>\n\n<p>The distance between two points on the <strong>X-Y</strong> plane is the Euclidean distance (i.e., <code>&radic;(x<sub>1</sub> - x<sub>2</sub>)<sup>2</sup> + (y<sub>1</sub> - y<sub>2</sub>)<sup>2</sup></code>).</p>\n\n<p>You may return the answer in <strong>any order</strong>. The answer is <strong>guaranteed</strong> to be <strong>unique</strong> (except for the order that it is in).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/03/closestplane1.jpg\" style=\"width: 400px; height: 400px;\" />\n<pre>\n<strong>Input:</strong> points = [[1,3],[-2,2]], k = 1\n<strong>Output:</strong> [[-2,2]]\n<strong>Explanation:</strong>\nThe distance between (1, 3) and the origin is sqrt(10).\nThe distance between (-2, 2) and the origin is sqrt(8).\nSince sqrt(8) &lt; sqrt(10), (-2, 2) is closer to the origin.\nWe only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[3,3],[5,-1],[-2,4]], k = 2\n<strong>Output:</strong> [[3,3],[-2,4]]\n<strong>Explanation:</strong> The answer [[-2,4],[3,3]] would also be accepted.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= points.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "k-closest-points-to-origin",
    "leetcodeUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "entryFunction": "kClosest",
    "examples": [
      {
        "input": "points = [[1,3],[-2,2]]\nk = 1",
        "output": "[[-2,2]]"
      }
    ],
    "patternHints": [
      "Sort by distance",
      "Take k"
    ],
    "starterCode": "var kClosest = function (points, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var kClosest = function (points, k) {\n\n\n  return points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);\n\n\n};",
    "sampleInput": "{\"points\":[[1,3],[-2,2]],\"k\":1}",
    "humanInput": "points = [[1,3],[-2,2]]\nk = 1",
    "sampleOutput": "[\n  [\n    -2,\n    2\n  ]\n]",
    "sheetNumber": 84,
    "sheetSectionId": "heap",
    "sheetSubsectionId": "heap-heap",
    "source": "sheet"
  },
  {
    "id": "bc-085-count-good-numbers",
    "title": "Count Good Numbers",
    "patternSlug": "recursion",
    "patternName": "Recursion",
    "difficulty": "medium",
    "statement": "Count good numbers of length n.",
    "description": "<p>A digit string is <strong>good</strong> if the digits <strong>(0-indexed)</strong> at <strong>even</strong> indices are <strong>even</strong> and the digits at <strong>odd</strong> indices are <strong>prime</strong> (<code>2</code>, <code>3</code>, <code>5</code>, or <code>7</code>).</p>\n\n<ul>\n\t<li>For example, <code>&quot;2582&quot;</code> is good because the digits (<code>2</code> and <code>8</code>) at even positions are even and the digits (<code>5</code> and <code>2</code>) at odd positions are prime. However, <code>&quot;3245&quot;</code> is <strong>not</strong> good because <code>3</code> is at an even index but is not even.</li>\n</ul>\n\n<p>Given an integer <code>n</code>, return <em>the <strong>total</strong> number of good digit strings of length </em><code>n</code>. Since the answer may be large, <strong>return it modulo </strong><code>10<sup>9</sup> + 7</code>.</p>\n\n<p>A <strong>digit string</strong> is a string consisting of digits <code>0</code> through <code>9</code> that may contain leading zeros.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The good numbers of length 1 are &quot;0&quot;, &quot;2&quot;, &quot;4&quot;, &quot;6&quot;, &quot;8&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> 400\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 50\n<strong>Output:</strong> 564908303\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>15</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "count-good-numbers",
    "leetcodeUrl": "https://leetcode.com/problems/count-good-numbers/",
    "entryFunction": "countGoodNumbers",
    "examples": [
      {
        "input": "n = 4",
        "output": "400"
      }
    ],
    "patternHints": [
      "Fast pow mod",
      "Alternate 5 and 4"
    ],
    "starterCode": "var countGoodNumbers = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var countGoodNumbers = function (n) {\n\n\n  const mod = 1e9 + 7;\n  const pow = (a, e) => { let r = 1n; a = BigInt(a); while (e) { if (e & 1) r = r * a % BigInt(mod); a = a * a % BigInt(mod); e >>= 1; } return Number(r); };\n  return (pow(5, Math.ceil(n / 2)) * pow(4, Math.floor(n / 2))) % mod;\n\n\n};",
    "sampleInput": "{\"n\":4}",
    "humanInput": "n = 4",
    "sampleOutput": "400",
    "sheetNumber": 85,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-recursion",
    "source": "sheet"
  },
  {
    "id": "bc-086-permutations",
    "title": "Permutations",
    "patternSlug": "recursion",
    "patternName": "Recursion",
    "difficulty": "medium",
    "statement": "Return all permutations of nums.",
    "description": "<p>Given an array <code>nums</code> of distinct integers, return all the possible <span data-keyword=\"permutation-array\">permutations</span>. You can return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> [[0,1],[1,0]]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 6</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li>All the integers of <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "permutations",
    "leetcodeUrl": "https://leetcode.com/problems/permutations/",
    "entryFunction": "permute",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      }
    ],
    "patternHints": [
      "Backtrack swap",
      "DFS choices"
    ],
    "starterCode": "var permute = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var permute = function (nums) {\n\n\n  const out = [];\n  const dfs = (path, used) => {\n    if (path.length === nums.length) { out.push(path.slice()); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true; path.push(nums[i]);\n      dfs(path, used); path.pop(); used[i] = false;\n    }\n  };\n  dfs([], Array(nums.length).fill(false));\n  return out;\n\n\n};",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
    "sampleOutput": "[\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3,\n    2\n  ],\n  [\n    2,\n    1,\n    3\n  ],\n  [\n    2,\n    3,\n    1\n  ],\n  [\n    3,\n    1,\n    2\n  ],\n  [\n    3,\n    2,\n    1\n  ]\n]",
    "sheetNumber": 86,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-recursion",
    "source": "sheet"
  },
  {
    "id": "bc-087-permutations-ii",
    "title": "Permutations II",
    "patternSlug": "recursion",
    "patternName": "Recursion",
    "difficulty": "medium",
    "statement": "Permutations II with duplicates.",
    "description": "<p>Given a collection of numbers, <code>nums</code>,&nbsp;that might contain duplicates, return <em>all possible unique permutations <strong>in any order</strong>.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong>\n[[1,1,2],\n [1,2,1],\n [2,1,1]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 8</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n</ul>\n",
    "leetcodeSlug": "permutations-ii",
    "leetcodeUrl": "https://leetcode.com/problems/permutations-ii/",
    "entryFunction": "permuteUnique",
    "examples": [
      {
        "input": "nums = [1,1,2]",
        "output": "[[1,1,2],[1,2,1],[2,1,1]]"
      }
    ],
    "patternHints": [
      "Sort + skip dupes",
      "Used array"
    ],
    "starterCode": "var permuteUnique = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var permuteUnique = function (nums) {\n\n\n  nums.sort((a, b) => a - b);\n  const out = [];\n  const dfs = (path, used) => {\n    if (path.length === nums.length) { out.push(path.slice()); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i] || (i && nums[i] === nums[i - 1] && !used[i - 1])) continue;\n      used[i] = true; path.push(nums[i]);\n      dfs(path, used); path.pop(); used[i] = false;\n    }\n  };\n  dfs([], Array(nums.length).fill(false));\n  return out;\n\n\n};",
    "sampleInput": "{\"nums\":[1,1,2]}",
    "humanInput": "nums = [1,1,2]",
    "sampleOutput": "[\n  [\n    1,\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    2,\n    1,\n    1\n  ]\n]",
    "sheetNumber": 87,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-recursion",
    "source": "sheet"
  },
  {
    "id": "bc-088-subsets",
    "title": "Subsets",
    "patternSlug": "recursion",
    "patternName": "Recursion",
    "difficulty": "medium",
    "statement": "Return all subsets of nums.",
    "description": "<p>Given an integer array <code>nums</code> of <strong>unique</strong> elements, return <em>all possible</em> <span data-keyword=\"subset\"><em>subsets</em></span> <em>(the power set)</em>.</p>\n\n<p>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0]\n<strong>Output:</strong> [[],[0]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li>All the numbers of&nbsp;<code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "subsets",
    "leetcodeUrl": "https://leetcode.com/problems/subsets/",
    "entryFunction": "subsets",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]"
      }
    ],
    "patternHints": [
      "Backtrack include",
      "Power set"
    ],
    "starterCode": "var subsets = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var subsets = function (nums) {\n\n\n  const out = [[]];\n  const dfs = (i, path) => {\n    if (i === nums.length) return;\n    path.push(nums[i]);\n    out.push(path.slice());\n    dfs(i + 1, path);\n    path.pop();\n    dfs(i + 1, path);\n  };\n  dfs(0, []);\n  return out;\n\n\n};",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
    "sampleOutput": "[\n  [],\n  [\n    1\n  ],\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3\n  ]\n]",
    "sheetNumber": 88,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-recursion",
    "source": "sheet"
  },
  {
    "id": "bc-089-basic-calculator",
    "title": "Basic Calculator",
    "patternSlug": "recursion",
    "patternName": "Recursion",
    "difficulty": "hard",
    "statement": "Evaluate basic calculator with + - ( ).",
    "description": "<p>Given a string <code>s</code> representing a valid expression, implement a basic calculator to evaluate it, and return <em>the result of the evaluation</em>.</p>\n\n<p><strong>Note:</strong> You are <strong>not</strong> allowed to use any built-in function which evaluates strings as mathematical expressions, such as <code>eval()</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;1 + 1&quot;\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot; 2-1 + 2 &quot;\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;(1+(4+5+2)-3)+(6+8)&quot;\n<strong>Output:</strong> 23\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of digits, <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, and <code>&#39; &#39;</code>.</li>\n\t<li><code>s</code> represents a valid expression.</li>\n\t<li><code>&#39;+&#39;</code> is <strong>not</strong> used as a unary operation (i.e., <code>&quot;+1&quot;</code> and <code>&quot;+(2 + 3)&quot;</code> is invalid).</li>\n\t<li><code>&#39;-&#39;</code> could be used as a unary operation (i.e., <code>&quot;-1&quot;</code> and <code>&quot;-(2 + 3)&quot;</code> is valid).</li>\n\t<li>There will be no two consecutive operators in the input.</li>\n\t<li>Every number and running calculation will fit in a signed 32-bit integer.</li>\n</ul>\n",
    "leetcodeSlug": "basic-calculator",
    "leetcodeUrl": "https://leetcode.com/problems/basic-calculator/",
    "entryFunction": "calculate",
    "examples": [
      {
        "input": "s = \"1 + 1\"",
        "output": "2"
      }
    ],
    "patternHints": [
      "Stack signs",
      "Parse numbers"
    ],
    "starterCode": "var calculate = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var calculate = function (s) {\n\n\n  let num = 0, sign = 1, res = 0, st = [1];\n  for (const ch of s + '+') {\n    if (ch >= '0' && ch <= '9') num = num * 10 + +ch;\n    else {\n      res += sign * num; num = 0;\n      if (ch === '+') sign = st[st.length - 1];\n      else if (ch === '-') sign = -st[st.length - 1];\n      else if (ch === '(') st.push(sign);\n      else if (ch === ')') st.pop();\n    }\n  }\n  return res;\n\n\n};",
    "sampleInput": "{\"s\":\"1 + 1\"}",
    "humanInput": "s = \"1 + 1\"",
    "sampleOutput": "2",
    "sheetNumber": 89,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-recursion",
    "source": "sheet"
  },
  {
    "id": "bc-090-wildcard-matching",
    "title": "Wildcard Matching",
    "patternSlug": "recursion",
    "patternName": "Recursion",
    "difficulty": "hard",
    "statement": "Wildcard matching with ? and *.",
    "description": "<p>Given an input string (<code>s</code>) and a pattern (<code>p</code>), implement wildcard pattern matching with support for <code>&#39;?&#39;</code> and <code>&#39;*&#39;</code> where:</p>\n\n<ul>\n\t<li><code>&#39;?&#39;</code> Matches any single character.</li>\n\t<li><code>&#39;*&#39;</code> Matches any sequence of characters (including the empty sequence).</li>\n</ul>\n\n<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aa&quot;, p = &quot;a&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> &quot;a&quot; does not match the entire string &quot;aa&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aa&quot;, p = &quot;*&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong>&nbsp;&#39;*&#39; matches any sequence.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cb&quot;, p = &quot;?a&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong>&nbsp;&#39;?&#39; matches &#39;c&#39;, but the second letter is &#39;a&#39;, which does not match &#39;b&#39;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length, p.length &lt;= 2000</code></li>\n\t<li><code>s</code> contains only lowercase English letters.</li>\n\t<li><code>p</code> contains only lowercase English letters, <code>&#39;?&#39;</code> or <code>&#39;*&#39;</code>.</li>\n</ul>\n",
    "leetcodeSlug": "wildcard-matching",
    "leetcodeUrl": "https://leetcode.com/problems/wildcard-matching/",
    "entryFunction": "isMatch",
    "examples": [
      {
        "input": "s = \"aa\"\np = \"a\"",
        "output": "false"
      }
    ],
    "patternHints": [
      "DP or greedy",
      "Star matches span"
    ],
    "starterCode": "var isMatch = function (s, p) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var isMatch = function (s, p) {\n\n\n  const dp = Array.from({ length: s.length + 1 }, () => Array(p.length + 1).fill(false));\n  dp[0][0] = true;\n  for (let j = 1; j <= p.length; j++) if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];\n  for (let i = 1; i <= s.length; i++) for (let j = 1; j <= p.length; j++) {\n    if (p[j - 1] === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];\n    else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n  }\n  return dp[s.length][p.length];\n\n\n};",
    "sampleInput": "{\"s\":\"aa\",\"p\":\"a\"}",
    "humanInput": "s = \"aa\"\np = \"a\"",
    "sampleOutput": "false",
    "sheetNumber": 90,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-recursion",
    "source": "sheet"
  },
  {
    "id": "bc-091-combinations",
    "title": "Combinations",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "medium",
    "statement": "All combinations of n choose k.",
    "description": "<p>Given two integers <code>n</code> and <code>k</code>, return <em>all possible combinations of</em> <code>k</code> <em>numbers chosen from the range</em> <code>[1, n]</code>.</p>\n\n<p>You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4, k = 2\n<strong>Output:</strong> [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]\n<strong>Explanation:</strong> There are 4 choose 2 = 6 total combinations.\nNote that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, k = 1\n<strong>Output:</strong> [[1]]\n<strong>Explanation:</strong> There is 1 choose 1 = 1 total combination.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>1 &lt;= k &lt;= n</code></li>\n</ul>\n",
    "leetcodeSlug": "combinations",
    "leetcodeUrl": "https://leetcode.com/problems/combinations/",
    "entryFunction": "combine",
    "examples": [
      {
        "input": "n = 4\nk = 2",
        "output": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]"
      }
    ],
    "patternHints": [
      "Backtrack start",
      "Build combo"
    ],
    "starterCode": "var combine = function (n, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var combine = function (n, k) {\n\n\n  const out = [];\n  const dfs = (start, path) => {\n    if (path.length === k) { out.push(path.slice()); return; }\n    for (let i = start; i <= n; i++) { path.push(i); dfs(i + 1, path); path.pop(); }\n  };\n  dfs(1, []);\n  return out;\n\n\n};",
    "sampleInput": "{\"n\":4,\"k\":2}",
    "humanInput": "n = 4\nk = 2",
    "sampleOutput": "[\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    2,\n    4\n  ],\n  [\n    3,\n    4\n  ]\n]",
    "sheetNumber": 91,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-092-combination-sum",
    "title": "Combination Sum",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "medium",
    "statement": "Combination sum with reuse.",
    "description": "<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return <em>a list of all <strong>unique combinations</strong> of </em><code>candidates</code><em> where the chosen numbers sum to </em><code>target</code><em>.</em> You may return the combinations in <strong>any order</strong>.</p>\n\n<p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong>. Two combinations are unique if the <span data-keyword=\"frequency-array\">frequency</span> of at least one of the chosen numbers is different.</p>\n\n<p>The test cases are generated such that the number of unique combinations that sum up to <code>target</code> is less than <code>150</code> combinations for the given input.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,3,6,7], target = 7\n<strong>Output:</strong> [[2,2,3],[7]]\n<strong>Explanation:</strong>\n2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,3,5], target = 8\n<strong>Output:</strong> [[2,2,2,2],[2,3,3],[3,5]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2], target = 1\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= candidates.length &lt;= 30</code></li>\n\t<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>\n\t<li>All elements of <code>candidates</code> are <strong>distinct</strong>.</li>\n\t<li><code>1 &lt;= target &lt;= 40</code></li>\n</ul>\n",
    "leetcodeSlug": "combination-sum",
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
    "entryFunction": "combinationSum",
    "examples": [
      {
        "input": "candidates = [2,3,6,7]\ntarget = 7",
        "output": "[[2,2,3],[7]]"
      }
    ],
    "patternHints": [
      "Backtrack candidates",
      "Subtract target"
    ],
    "starterCode": "var combinationSum = function (candidates, target) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var combinationSum = function (candidates, target) {\n\n\n  const out = [];\n  const dfs = (i, rem, path) => {\n    if (rem === 0) { out.push(path.slice()); return; }\n    if (rem < 0 || i === candidates.length) return;\n    path.push(candidates[i]); dfs(i, rem - candidates[i], path); path.pop();\n    dfs(i + 1, rem, path);\n  };\n  dfs(0, target, []);\n  return out;\n\n\n};",
    "sampleInput": "{\"candidates\":[2,3,6,7],\"target\":7}",
    "humanInput": "candidates = [2,3,6,7]\ntarget = 7",
    "sampleOutput": "[\n  [\n    2,\n    2,\n    3\n  ],\n  [\n    7\n  ]\n]",
    "sheetNumber": 92,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-093-combination-sum-iii",
    "title": "Combination Sum III",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "medium",
    "statement": "Combination sum III: k numbers sum to n.",
    "description": "<p>Find all valid combinations of <code>k</code> numbers that sum up to <code>n</code> such that the following conditions are true:</p>\n\n<ul>\n\t<li>Only numbers <code>1</code> through <code>9</code> are used.</li>\n\t<li>Each number is used <strong>at most once</strong>.</li>\n</ul>\n\n<p>Return <em>a list of all possible valid combinations</em>. The list must not contain the same combination twice, and the combinations may be returned in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 3, n = 7\n<strong>Output:</strong> [[1,2,4]]\n<strong>Explanation:</strong>\n1 + 2 + 4 = 7\nThere are no other valid combinations.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 3, n = 9\n<strong>Output:</strong> [[1,2,6],[1,3,5],[2,3,4]]\n<strong>Explanation:</strong>\n1 + 2 + 6 = 9\n1 + 3 + 5 = 9\n2 + 3 + 4 = 9\nThere are no other valid combinations.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 4, n = 1\n<strong>Output:</strong> []\n<strong>Explanation:</strong> There are no valid combinations.\nUsing 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 &gt; 1, there are no valid combination.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= k &lt;= 9</code></li>\n\t<li><code>1 &lt;= n &lt;= 60</code></li>\n</ul>\n",
    "leetcodeSlug": "combination-sum-iii",
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum-iii/",
    "entryFunction": "combinationSum3",
    "examples": [
      {
        "input": "k = 3\nn = 7",
        "output": "[[1,2,4]]"
      }
    ],
    "patternHints": [
      "Backtrack 1-9",
      "No reuse"
    ],
    "starterCode": "var combinationSum3 = function (k, n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var combinationSum3 = function (k, n) {\n\n\n  const out = [];\n  const dfs = (start, rem, path) => {\n    if (path.length === k && rem === 0) { out.push(path.slice()); return; }\n    if (rem < 0 || path.length > k) return;\n    for (let i = start; i <= 9; i++) { path.push(i); dfs(i + 1, rem - i, path); path.pop(); }\n  };\n  dfs(1, n, []);\n  return out;\n\n\n};",
    "sampleInput": "{\"k\":3,\"n\":7}",
    "humanInput": "k = 3\nn = 7",
    "sampleOutput": "[\n  [\n    1,\n    2,\n    4\n  ]\n]",
    "sheetNumber": 93,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-094-letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "medium",
    "statement": "Letter combinations from phone digits.",
    "description": "<p>Given a string containing digits from <code>2-9</code> inclusive, return all possible letter combinations that the number could represent. Return the answer in <strong>any order</strong>.</p>\n\n<p>A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.</p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png\" style=\"width: 300px; height: 243px;\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = &quot;23&quot;\n<strong>Output:</strong> [&quot;ad&quot;,&quot;ae&quot;,&quot;af&quot;,&quot;bd&quot;,&quot;be&quot;,&quot;bf&quot;,&quot;cd&quot;,&quot;ce&quot;,&quot;cf&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = &quot;2&quot;\n<strong>Output:</strong> [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= digits.length &lt;= 4</code></li>\n\t<li><code>digits[i]</code> is a digit in the range <code>[&#39;2&#39;, &#39;9&#39;]</code>.</li>\n</ul>\n",
    "leetcodeSlug": "letter-combinations-of-a-phone-number",
    "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "entryFunction": "letterCombinations",
    "examples": [
      {
        "input": "digits = \"23\"",
        "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
      }
    ],
    "patternHints": [
      "Map digits",
      "DFS build"
    ],
    "starterCode": "var letterCombinations = function (digits) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var letterCombinations = function (digits) {\n\n\n  const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };\n  const out = [];\n  const dfs = (i, path) => {\n    if (i === digits.length) { if (path) out.push(path); return; }\n    for (const ch of map[digits[i]]) dfs(i + 1, path + ch);\n  };\n  dfs(0, '');\n  return out;\n\n\n};",
    "sampleInput": "{\"digits\":\"23\"}",
    "humanInput": "digits = \"23\"",
    "sampleOutput": "[\n  \"ad\",\n  \"ae\",\n  \"af\",\n  \"bd\",\n  \"be\",\n  \"bf\",\n  \"cd\",\n  \"ce\",\n  \"cf\"\n]",
    "sheetNumber": 94,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-095-gray-code",
    "title": "Gray Code",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "medium",
    "statement": "Generate Gray code sequence for n.",
    "description": "<p>An <strong>n-bit gray code sequence</strong> is a sequence of <code>2<sup>n</sup></code> integers where:</p>\n\n<ul>\n\t<li>Every integer is in the <strong>inclusive</strong> range <code>[0, 2<sup>n</sup> - 1]</code>,</li>\n\t<li>The first integer is <code>0</code>,</li>\n\t<li>An integer appears <strong>no more than once</strong> in the sequence,</li>\n\t<li>The binary representation of every pair of <strong>adjacent</strong> integers differs by <strong>exactly one bit</strong>, and</li>\n\t<li>The binary representation of the <strong>first</strong> and <strong>last</strong> integers differs by <strong>exactly one bit</strong>.</li>\n</ul>\n\n<p>Given an integer <code>n</code>, return <em>any valid <strong>n-bit gray code sequence</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> [0,1,3,2]\n<strong>Explanation:</strong>\nThe binary representation of [0,1,3,2] is [00,01,11,10].\n- 0<u>0</u> and 0<u>1</u> differ by one bit\n- <u>0</u>1 and <u>1</u>1 differ by one bit\n- 1<u>1</u> and 1<u>0</u> differ by one bit\n- <u>1</u>0 and <u>0</u>0 differ by one bit\n[0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].\n- <u>0</u>0 and <u>1</u>0 differ by one bit\n- 1<u>0</u> and 1<u>1</u> differ by one bit\n- <u>1</u>1 and <u>0</u>1 differ by one bit\n- 0<u>1</u> and 0<u>0</u> differ by one bit\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 16</code></li>\n</ul>\n",
    "leetcodeSlug": "gray-code",
    "leetcodeUrl": "https://leetcode.com/problems/gray-code/",
    "entryFunction": "grayCode",
    "examples": [
      {
        "input": "n = 2",
        "output": "[0,1,3,2]"
      }
    ],
    "patternHints": [
      "XOR shift",
      "Reflect pattern"
    ],
    "starterCode": "var grayCode = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var grayCode = function (n) {\n\n\n  const out = [0];\n  for (let i = 0; i < n; i++) for (let j = out.length - 1; j >= 0; j--) out.push(out[j] | (1 << i));\n  return out;\n\n\n};",
    "sampleInput": "{\"n\":2}",
    "humanInput": "n = 2",
    "sampleOutput": "[\n  0,\n  1,\n  3,\n  2\n]",
    "sheetNumber": 95,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-096-letter-case-permutation",
    "title": "Letter Case Permutation",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "medium",
    "statement": "Letter case permutation of string.",
    "description": "<p>Given a string <code>s</code>, you&nbsp;can transform every letter individually to be lowercase or uppercase to create another string.</p>\n\n<p>Return <em>a list of all possible strings we could create</em>. Return the output in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a1b2&quot;\n<strong>Output:</strong> [&quot;a1b2&quot;,&quot;a1B2&quot;,&quot;A1b2&quot;,&quot;A1B2&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;3z4&quot;\n<strong>Output:</strong> [&quot;3z4&quot;,&quot;3Z4&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 12</code></li>\n\t<li><code>s</code> consists of lowercase English letters, uppercase English letters, and digits.</li>\n</ul>\n",
    "leetcodeSlug": "letter-case-permutation",
    "leetcodeUrl": "https://leetcode.com/problems/letter-case-permutation/",
    "entryFunction": "letterCasePermutation",
    "examples": [
      {
        "input": "s = \"a1b2\"",
        "output": "[\"a1b2\",\"a1B2\",\"A1b2\",\"A1B2\"]"
      }
    ],
    "patternHints": [
      "Backtrack case",
      "Toggle letters"
    ],
    "starterCode": "var letterCasePermutation = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var letterCasePermutation = function (s) {\n\n\n  const out = [];\n  const dfs = (i, path) => {\n    if (i === s.length) { out.push(path); return; }\n    const ch = s[i];\n    if (/[a-z]/i.test(ch)) { dfs(i + 1, path + ch.toLowerCase()); dfs(i + 1, path + ch.toUpperCase()); }\n    else dfs(i + 1, path + ch);\n  };\n  dfs(0, '');\n  return out;\n\n\n};",
    "sampleInput": "{\"s\":\"a1b2\"}",
    "humanInput": "s = \"a1b2\"",
    "sampleOutput": "[\n  \"a1b2\",\n  \"a1B2\",\n  \"A1b2\",\n  \"A1B2\"\n]",
    "sheetNumber": 96,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-097-n-queens",
    "title": "N-Queens",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "hard",
    "statement": "Solve N-Queens: return all boards.",
    "description": "<p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>\n\n<p>Given an integer <code>n</code>, return <em>all distinct solutions to the <strong>n-queens puzzle</strong></em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>Each solution contains a distinct board configuration of the n-queens&#39; placement, where <code>&#39;Q&#39;</code> and <code>&#39;.&#39;</code> both indicate a queen and an empty space, respectively.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/queens.jpg\" style=\"width: 600px; height: 268px;\" />\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> [[&quot;.Q..&quot;,&quot;...Q&quot;,&quot;Q...&quot;,&quot;..Q.&quot;],[&quot;..Q.&quot;,&quot;Q...&quot;,&quot;...Q&quot;,&quot;.Q..&quot;]]\n<strong>Explanation:</strong> There exist two distinct solutions to the 4-queens puzzle as shown above\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [[&quot;Q&quot;]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n</ul>\n",
    "leetcodeSlug": "n-queens",
    "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
    "entryFunction": "solveNQueens",
    "examples": [
      {
        "input": "n = 4",
        "output": "[[\"bbbb\",\"dddd\",\"aaaa\",\"cccc\"],[\"cccc\",\"aaaa\",\"dddd\",\"bbbb\"]]"
      }
    ],
    "patternHints": [
      "Backtrack rows",
      "Check diagonals"
    ],
    "starterCode": "var solveNQueens = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var solveNQueens = function (n) {\n\n\n  const out = [], cols = new Set(), d1 = new Set(), d2 = new Set(), board = Array(n).fill('.');\n  const dfs = (r) => {\n    if (r === n) { out.push(board.map((row) => row.repeat(n))); return; }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;\n      cols.add(c); d1.add(r - c); d2.add(r + c);\n      board[r] = String.fromCharCode(97 + c);\n      dfs(r + 1);\n      board[r] = '.'; cols.delete(c); d1.delete(r - c); d2.delete(r + c);\n    }\n  };\n  dfs(0);\n  return out;\n\n\n};",
    "sampleInput": "{\"n\":4}",
    "humanInput": "n = 4",
    "sampleOutput": "[\n  [\n    \"bbbb\",\n    \"dddd\",\n    \"aaaa\",\n    \"cccc\"\n  ],\n  [\n    \"cccc\",\n    \"aaaa\",\n    \"dddd\",\n    \"bbbb\"\n  ]\n]",
    "sheetNumber": 97,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-098-sudoku-solver",
    "title": "Sudoku Solver",
    "patternSlug": "subsets-backtracking",
    "patternName": "Backtracking",
    "difficulty": "hard",
    "statement": "Solve Sudoku in-place on board.",
    "description": "<p>Write a program to solve a Sudoku puzzle by filling the empty cells.</p>\n\n<p>A sudoku solution must satisfy <strong>all of the following rules</strong>:</p>\n\n<ol>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each row.</li>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each column.</li>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each of the 9 <code>3x3</code> sub-boxes of the grid.</li>\n</ol>\n\n<p>The <code>&#39;.&#39;</code> character indicates empty cells.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png\" style=\"height:250px; width:250px\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;],[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;],[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;],[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;],[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;],[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;],[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Output:</strong> [[&quot;5&quot;,&quot;3&quot;,&quot;4&quot;,&quot;6&quot;,&quot;7&quot;,&quot;8&quot;,&quot;9&quot;,&quot;1&quot;,&quot;2&quot;],[&quot;6&quot;,&quot;7&quot;,&quot;2&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;3&quot;,&quot;4&quot;,&quot;8&quot;],[&quot;1&quot;,&quot;9&quot;,&quot;8&quot;,&quot;3&quot;,&quot;4&quot;,&quot;2&quot;,&quot;5&quot;,&quot;6&quot;,&quot;7&quot;],[&quot;8&quot;,&quot;5&quot;,&quot;9&quot;,&quot;7&quot;,&quot;6&quot;,&quot;1&quot;,&quot;4&quot;,&quot;2&quot;,&quot;3&quot;],[&quot;4&quot;,&quot;2&quot;,&quot;6&quot;,&quot;8&quot;,&quot;5&quot;,&quot;3&quot;,&quot;7&quot;,&quot;9&quot;,&quot;1&quot;],[&quot;7&quot;,&quot;1&quot;,&quot;3&quot;,&quot;9&quot;,&quot;2&quot;,&quot;4&quot;,&quot;8&quot;,&quot;5&quot;,&quot;6&quot;],[&quot;9&quot;,&quot;6&quot;,&quot;1&quot;,&quot;5&quot;,&quot;3&quot;,&quot;7&quot;,&quot;2&quot;,&quot;8&quot;,&quot;4&quot;],[&quot;2&quot;,&quot;8&quot;,&quot;7&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;6&quot;,&quot;3&quot;,&quot;5&quot;],[&quot;3&quot;,&quot;4&quot;,&quot;5&quot;,&quot;2&quot;,&quot;8&quot;,&quot;6&quot;,&quot;1&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Explanation:</strong>&nbsp;The input board is shown above and the only valid solution is shown below:\n\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png\" style=\"height:250px; width:250px\" />\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>board.length == 9</code></li>\n\t<li><code>board[i].length == 9</code></li>\n\t<li><code>board[i][j]</code> is a digit or <code>&#39;.&#39;</code>.</li>\n\t<li>It is <strong>guaranteed</strong> that the input board has only one solution.</li>\n</ul>\n",
    "leetcodeSlug": "sudoku-solver",
    "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
    "entryFunction": "solveSudoku",
    "examples": [
      {
        "input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
        "output": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]"
      }
    ],
    "patternHints": [
      "Backtrack empty",
      "Check box"
    ],
    "starterCode": "var solveSudoku = function (board) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var solveSudoku = function (board) {\n\n\n  const ok = (r, c, ch) => {\n    for (let i = 0; i < 9; i++) if (board[r][i] === ch || board[i][c] === ch) return false;\n    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;\n    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[br + i][bc + j] === ch) return false;\n    return true;\n  };\n  const solve = () => {\n    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {\n      if (board[r][c] !== '.') continue;\n      for (let d = 1; d <= 9; d++) {\n        const ch = String(d);\n        if (!ok(r, c, ch)) continue;\n        board[r][c] = ch;\n        if (solve()) return true;\n        board[r][c] = '.';\n      }\n      return false;\n    }\n    return true;\n  };\n  solve();\n  return board;\n\n\n};",
    "sampleInput": "{\"board\":[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]}",
    "humanInput": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
    "sampleOutput": "[\n  [\n    \"5\",\n    \"3\",\n    \"4\",\n    \"6\",\n    \"7\",\n    \"8\",\n    \"9\",\n    \"1\",\n    \"2\"\n  ],\n  [\n    \"6\",\n    \"7\",\n    \"2\",\n    \"1\",\n    \"9\",\n    \"5\",\n    \"3\",\n    \"4\",\n    \"8\"\n  ],\n  [\n    \"1\",\n    \"9\",\n    \"8\",\n    \"3\",\n    \"4\",\n    \"2\",\n    \"5\",\n    \"6\",\n    \"7\"\n  ],\n  [\n    \"8\",\n    \"5\",\n    \"9\",\n    \"7\",\n    \"6\",\n    \"1\",\n    \"4\",\n    \"2\",\n    \"3\"\n  ],\n  [\n    \"4\",\n    \"2\",\n    \"6\",\n    \"8\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"9\",\n    \"1\"\n  ],\n  [\n    \"7\",\n    \"1\",\n    \"3\",\n    \"9\",\n    \"2\",\n    \"4\",\n    \"8\",\n    \"5\",\n    \"6\"\n  ],\n  [\n    \"9\",\n    \"6\",\n    \"1\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"2\",\n    \"8\",\n    \"4\"\n  ],\n  [\n    \"2\",\n    \"8\",\n    \"7\",\n    \"4\",\n    \"1\",\n    \"9\",\n    \"6\",\n    \"3\",\n    \"5\"\n  ],\n  [\n    \"3\",\n    \"4\",\n    \"5\",\n    \"2\",\n    \"8\",\n    \"6\",\n    \"1\",\n    \"7\",\n    \"9\"\n  ]\n]",
    "sheetNumber": 98,
    "sheetSectionId": "recursion-backtracking",
    "sheetSubsectionId": "recursion-backtracking-backtracking",
    "source": "sheet"
  },
  {
    "id": "bc-099-construct-binary-tree-from-inorder-and-postorder",
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "patternSlug": "tree-bfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Build binary tree from inorder and postorder.",
    "description": "<p>Given two integer arrays <code>inorder</code> and <code>postorder</code> where <code>inorder</code> is the inorder traversal of a binary tree and <code>postorder</code> is the postorder traversal of the same tree, construct and return <em>the binary tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]\n<strong>Output:</strong> [3,9,20,null,null,15,7]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> inorder = [-1], postorder = [-1]\n<strong>Output:</strong> [-1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= inorder.length &lt;= 3000</code></li>\n\t<li><code>postorder.length == inorder.length</code></li>\n\t<li><code>-3000 &lt;= inorder[i], postorder[i] &lt;= 3000</code></li>\n\t<li><code>inorder</code> and <code>postorder</code> consist of <strong>unique</strong> values.</li>\n\t<li>Each value of <code>postorder</code> also appears in <code>inorder</code>.</li>\n\t<li><code>inorder</code> is <strong>guaranteed</strong> to be the inorder traversal of the tree.</li>\n\t<li><code>postorder</code> is <strong>guaranteed</strong> to be the postorder traversal of the tree.</li>\n</ul>\n",
    "leetcodeSlug": "construct-binary-tree-from-inorder-and-postorder-traversal",
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
    "entryFunction": "buildTree",
    "patternHints": [
      "Pick root last",
      "Partition inorder"
    ],
    "starterCode": "var buildTree = function (inorder, postorder) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var buildTree = function (inorder, postorder) {\n\n\n  const idx = new Map(inorder.map((v, i) => [v, i]));\n  const build = (l, r) => {\n    if (l > r) return null;\n    const rootVal = postorder.pop();\n    const mid = idx.get(rootVal);\n    return { val: rootVal, left: build(l, mid - 1), right: build(mid + 1, r) };\n  };\n  return build(0, inorder.length - 1);\n\n\n};",
    "sampleInput": "{\"inorder\":[9,3,15,20,7],\"postorder\":[9,15,7,20,3]}",
    "humanInput": "inorder = [9,3,15,20,7]\npostorder = [9,15,7,20,3]",
    "sheetNumber": 99,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-binary-tree",
    "source": "sheet"
  },
  {
    "id": "bc-100-construct-binary-tree-from-preorder-and-inorder-",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "patternSlug": "tree-bfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Build tree from preorder and inorder.",
    "description": "<p>Given two integer arrays <code>preorder</code> and <code>inorder</code> where <code>preorder</code> is the preorder traversal of a binary tree and <code>inorder</code> is the inorder traversal of the same tree, construct and return <em>the binary tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\n<strong>Output:</strong> [3,9,20,null,null,15,7]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> preorder = [-1], inorder = [-1]\n<strong>Output:</strong> [-1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= preorder.length &lt;= 3000</code></li>\n\t<li><code>inorder.length == preorder.length</code></li>\n\t<li><code>-3000 &lt;= preorder[i], inorder[i] &lt;= 3000</code></li>\n\t<li><code>preorder</code> and <code>inorder</code> consist of <strong>unique</strong> values.</li>\n\t<li>Each value of <code>inorder</code> also appears in <code>preorder</code>.</li>\n\t<li><code>preorder</code> is <strong>guaranteed</strong> to be the preorder traversal of the tree.</li>\n\t<li><code>inorder</code> is <strong>guaranteed</strong> to be the inorder traversal of the tree.</li>\n</ul>\n",
    "leetcodeSlug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "entryFunction": "buildTree",
    "examples": [
      {
        "input": "preorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]",
        "output": "{\"val\":3,\"left\":{\"val\":9,\"left\":null,\"right\":null},\"right\":{\"val\":20,\"left\":{\"val\":15,\"left\":null,\"right\":null},\"right\":{\"val\":7,\"left\":null,\"right\":null}}}"
      }
    ],
    "patternHints": [
      "Root first",
      "Split inorder"
    ],
    "starterCode": "var buildTree = function (preorder, inorder) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var buildTree = function (preorder, inorder) {\n\n\n  let pre = 0;\n  const idx = new Map(inorder.map((v, i) => [v, i]));\n  const build = (l, r) => {\n    if (l > r) return null;\n    const rootVal = preorder[pre++];\n    const mid = idx.get(rootVal);\n    return { val: rootVal, left: build(l, mid - 1), right: build(mid + 1, r) };\n  };\n  return build(0, inorder.length - 1);\n\n\n};",
    "sampleInput": "{\"preorder\":[3,9,20,15,7],\"inorder\":[9,3,15,20,7]}",
    "humanInput": "preorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]",
    "sampleOutput": "{\n  \"val\": 3,\n  \"left\": {\n    \"val\": 9,\n    \"left\": null,\n    \"right\": null\n  },\n  \"right\": {\n    \"val\": 20,\n    \"left\": {\n      \"val\": 15,\n      \"left\": null,\n      \"right\": null\n    },\n    \"right\": {\n      \"val\": 7,\n      \"left\": null,\n      \"right\": null\n    }\n  }\n}",
    "sheetNumber": 100,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-binary-tree",
    "source": "sheet"
  },
  {
    "id": "bc-101-path-sum",
    "title": "Path Sum",
    "patternSlug": "tree-bfs",
    "patternName": "Trees",
    "difficulty": "easy",
    "statement": "Check if tree has root-to-leaf path sum.",
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a <strong>root-to-leaf</strong> path such that adding up all the values along the path equals <code>targetSum</code>.</p>\n\n<p>A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg\" style=\"width: 500px; height: 356px;\" />\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The root-to-leaf path with the target sum is shown.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3], targetSum = 5\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are two root-to-leaf paths in the tree:\n(1 --&gt; 2): The sum is 3.\n(1 --&gt; 3): The sum is 4.\nThere is no root-to-leaf path with sum = 5.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [], targetSum = 0\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Since the tree is empty, there are no root-to-leaf paths.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "path-sum",
    "leetcodeUrl": "https://leetcode.com/problems/path-sum/",
    "entryFunction": "hasPathSum",
    "examples": [
      {
        "input": "tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22",
        "output": "true"
      }
    ],
    "patternHints": [
      "DFS subtract",
      "Leaf check"
    ],
    "starterCode": "var hasPathSum = function (root, targetSum) {\n\n  // TODO\n\n};",
    "solutionCode": "var hasPathSum = function (root, targetSum) {\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(root);\n  const dfs = (n, rem) => {\n    if (!n) return false;\n    if (!n.left && !n.right) return rem === n.val;\n    return dfs(n.left, rem - n.val) || dfs(n.right, rem - n.val);\n  };\n  return dfs(root, targetSum);\n\n};",
    "sampleInput": "{\"tree\":[5,4,8,11,null,13,4,7,2,null,null,null,1],\"targetSum\":22}",
    "humanInput": "tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22",
    "sampleOutput": "true",
    "sheetNumber": 101,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-binary-tree",
    "source": "sheet"
  },
  {
    "id": "bc-102-same-tree",
    "title": "Same Tree",
    "patternSlug": "tree-bfs",
    "patternName": "Trees",
    "difficulty": "easy",
    "statement": "Check if two binary trees are the same.",
    "description": "<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not.</p>\n\n<p>Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg\" style=\"width: 622px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> p = [1,2,3], q = [1,2,3]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg\" style=\"width: 382px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> p = [1,2], q = [1,null,2]\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg\" style=\"width: 622px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> p = [1,2,1], q = [1,1,2]\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in both trees is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "same-tree",
    "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
    "entryFunction": "isSameTree",
    "examples": [
      {
        "input": "p = [1,2,3]\nq = [1,2,3]",
        "output": "true"
      }
    ],
    "patternHints": [
      "DFS compare",
      "Structure and val"
    ],
    "starterCode": "var isSameTree = function (p, q) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var isSameTree = function (p, q) {\n\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const eq = (a, b) => (!a && !b) || (a && b && a.val === b.val && eq(a.left, b.left) && eq(a.right, b.right));\n  return eq(build(p), build(q));\n\n\n};",
    "sampleInput": "{\"p\":[1,2,3],\"q\":[1,2,3]}",
    "humanInput": "p = [1,2,3]\nq = [1,2,3]",
    "sampleOutput": "true",
    "sheetNumber": 102,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-binary-tree",
    "source": "sheet"
  },
  {
    "id": "bc-103-binary-tree-level-order-traversal",
    "title": "Binary Tree Level Order Traversal",
    "patternSlug": "tree-bfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Binary tree level order traversal.",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the level order traversal of its nodes&#39; values</em>. (i.e., from left to right, level by level).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[3],[9,20],[15,7]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "binary-tree-level-order-traversal",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "entryFunction": "levelOrder",
    "examples": [
      {
        "input": "tree = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]"
      }
    ],
    "patternHints": [
      "BFS queue",
      "Level by level"
    ],
    "starterCode": "var levelOrder = function (root) {\n\n  // TODO\n\n};",
    "solutionCode": "var levelOrder = function (root) {\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(root), out = [], q = root ? [root] : [];\n  while (q.length) {\n    const level = [], size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n    out.push(level);\n  }\n  return out;\n\n};",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
    "sampleOutput": "[\n  [\n    3\n  ],\n  [\n    9,\n    20\n  ],\n  [\n    15,\n    7\n  ]\n]",
    "sheetNumber": 103,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-level-order-traversal-bfs",
    "source": "sheet"
  },
  {
    "id": "bc-104-invert-binary-tree",
    "title": "Invert Binary Tree",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "easy",
    "statement": "Invert a binary tree.",
    "description": "<p>Given the <code>root</code> of a binary tree, invert the tree, and return <em>its root</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg\" style=\"width: 500px; height: 165px;\" />\n<pre>\n<strong>Input:</strong> root = [4,2,7,1,3,6,9]\n<strong>Output:</strong> [4,7,2,9,6,3,1]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg\" style=\"width: 500px; height: 120px;\" />\n<pre>\n<strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> [2,3,1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "invert-binary-tree",
    "leetcodeUrl": "https://leetcode.com/problems/invert-binary-tree/",
    "entryFunction": "invertTree",
    "examples": [
      {
        "input": "root = [4,2,7,1,3,6,9]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Swap children",
      "DFS post"
    ],
    "starterCode": "var invertTree = function (root) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var invertTree = function (root) {\n\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const inv = (n) => {\n    if (!n) return null;\n    [n.left, n.right] = [inv(n.right), inv(n.left)];\n    return n;\n  };\n  inv(build(root));\n  return true;\n\n\n};",
    "sampleInput": "{\"root\":[4,2,7,1,3,6,9]}",
    "humanInput": "root = [4,2,7,1,3,6,9]",
    "sampleOutput": "true",
    "sheetNumber": 104,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-tree-traversals",
    "source": "sheet"
  },
  {
    "id": "bc-105-minimum-cost-tree-from-leaf-values",
    "title": "Minimum Cost Tree From Leaf Values",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Minimum cost tree from leaf values.",
    "description": "<p>Given an array <code>arr</code> of positive integers, consider all binary trees such that:</p>\n\n<ul>\n\t<li>Each node has either <code>0</code> or <code>2</code> children;</li>\n\t<li>The values of <code>arr</code> correspond to the values of each <strong>leaf</strong> in an in-order traversal of the tree.</li>\n\t<li>The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree, respectively.</li>\n</ul>\n\n<p>Among all possible binary trees considered, return <em>the smallest possible sum of the values of each non-leaf node</em>. It is guaranteed this sum fits into a <strong>32-bit</strong> integer.</p>\n\n<p>A node is a <strong>leaf</strong> if and only if it has zero children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/08/10/tree1.jpg\" style=\"width: 500px; height: 169px;\" />\n<pre>\n<strong>Input:</strong> arr = [6,2,4]\n<strong>Output:</strong> 32\n<strong>Explanation:</strong> There are two possible trees shown.\nThe first has a non-leaf node sum 36, and the second has non-leaf node sum 32.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/08/10/tree2.jpg\" style=\"width: 224px; height: 145px;\" />\n<pre>\n<strong>Input:</strong> arr = [4,11]\n<strong>Output:</strong> 44\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= arr.length &lt;= 40</code></li>\n\t<li><code>1 &lt;= arr[i] &lt;= 15</code></li>\n\t<li>It is guaranteed that the answer fits into a <strong>32-bit</strong> signed integer (i.e., it is less than 2<sup>31</sup>).</li>\n</ul>\n",
    "leetcodeSlug": "minimum-cost-tree-from-leaf-values",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/",
    "entryFunction": "mctFromLeafValues",
    "examples": [
      {
        "input": "tree = [6,2,4]",
        "output": "12"
      }
    ],
    "patternHints": [
      "Monotonic stack",
      "Multiply peaks"
    ],
    "starterCode": "var mctFromLeafValues = function (arr) {\n\n  // TODO\n\n};",
    "solutionCode": "var mctFromLeafValues = function (arr) {\n\n  .filter((x) => x != null);\n  const st = [];\n  let sum = 0;\n  for (const x of arr) {\n    while (st.length && st[st.length - 1] < x) {\n      const mid = st.pop();\n      const left = st.length ? st[st.length - 1] : 0;\n      sum += mid * Math.max(left, x);\n    }\n    st.push(x);\n  }\n  return sum;\n\n};",
    "sampleInput": "{\"tree\":[6,2,4]}",
    "humanInput": "tree = [6,2,4]",
    "sampleOutput": "12",
    "sheetNumber": 105,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-tree-traversals",
    "source": "sheet"
  },
  {
    "id": "bc-106-binary-tree-zigzag-level-order-traversal",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Zigzag level order traversal.",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the zigzag level order traversal of its nodes&#39; values</em>. (i.e., from left to right, then right to left for the next level and alternate between).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[3],[20,9],[15,7]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "binary-tree-zigzag-level-order-traversal",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "entryFunction": "zigzagLevelOrder",
    "examples": [
      {
        "input": "tree = [3,9,20,null,null,15,7]",
        "output": "[[3],[20,9],[15,7]]"
      }
    ],
    "patternHints": [
      "BFS alternate",
      "Reverse every other"
    ],
    "starterCode": "var zigzagLevelOrder = function (root) {\n\n  // TODO\n\n};",
    "solutionCode": "var zigzagLevelOrder = function (root) {\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(root), out = [], q = root ? [root] : [];\n  let rev = false;\n  while (q.length) {\n    const level = [], size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n    out.push(rev ? level.reverse() : level);\n    rev = !rev;\n  }\n  return out;\n\n};",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
    "sampleOutput": "[\n  [\n    3\n  ],\n  [\n    20,\n    9\n  ],\n  [\n    15,\n    7\n  ]\n]",
    "sheetNumber": 106,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-tree-traversals",
    "source": "sheet"
  },
  {
    "id": "bc-107-maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "easy",
    "statement": "Maximum depth of binary tree.",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>its maximum depth</em>.</p>\n\n<p>A binary tree&#39;s <strong>maximum depth</strong>&nbsp;is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg\" style=\"width: 400px; height: 277px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,null,2]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "maximum-depth-of-binary-tree",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "entryFunction": "maxDepth",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3"
      }
    ],
    "patternHints": [
      "DFS depth",
      "1 + max child"
    ],
    "starterCode": "var maxDepth = function (root) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxDepth = function (root) {\n\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const depth = (n) => (!n ? 0 : 1 + Math.max(depth(n.left), depth(n.right)));\n  return depth(build(root));\n\n\n};",
    "sampleInput": "{\"root\":[3,9,20,null,null,15,7]}",
    "humanInput": "root = [3,9,20,null,null,15,7]",
    "sampleOutput": "3",
    "sheetNumber": 107,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-dfs-recursive-iterative",
    "source": "sheet"
  },
  {
    "id": "bc-108-sum-of-left-leaves",
    "title": "Sum of Left Leaves",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "easy",
    "statement": "Sum of left leaves in binary tree.",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the sum of all left leaves.</em></p>\n\n<p>A <strong>leaf</strong> is a node with no children. A <strong>left leaf</strong> is a leaf that is the left child of another node.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> 24\n<strong>Explanation:</strong> There are two left leaves in the binary tree, with values 9 and 15 respectively.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "sum-of-left-leaves",
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-left-leaves/",
    "entryFunction": "sumOfLeftLeaves",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "24"
      }
    ],
    "patternHints": [
      "DFS left flag",
      "Add left leaves"
    ],
    "starterCode": "var sumOfLeftLeaves = function (root) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var sumOfLeftLeaves = function (root) {\n\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let sum = 0;\n  const dfs = (n, left) => {\n    if (!n) return;\n    if (left && !n.left && !n.right) sum += n.val;\n    dfs(n.left, true); dfs(n.right, false);\n  };\n  dfs(build(root), false);\n  return sum;\n\n\n};",
    "sampleInput": "{\"root\":[3,9,20,null,null,15,7]}",
    "humanInput": "root = [3,9,20,null,null,15,7]",
    "sampleOutput": "24",
    "sheetNumber": 108,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-dfs-recursive-iterative",
    "source": "sheet"
  },
  {
    "id": "bc-109-binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Right side view of binary tree.",
    "description": "<p>Given the <code>root</code> of a binary tree, imagine yourself standing on the <strong>right side</strong> of it, return <em>the values of the nodes you can see ordered from top to bottom</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,null,5,null,4]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3,4]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/11/24/tmpd5jn43fs-1.png\" style=\"width: 400px; height: 207px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,4,null,null,null,5]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3,4,5]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/11/24/tmpkpe40xeh-1.png\" style=\"width: 400px; height: 214px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,null,3]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = []</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "binary-tree-right-side-view",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "entryFunction": "rightSideView",
    "examples": [
      {
        "input": "tree = [1,2,3,null,5,null,4]",
        "output": "[1,3,4]"
      }
    ],
    "patternHints": [
      "BFS last per level",
      "Or DFS right first"
    ],
    "starterCode": "var rightSideView = function (root) {\n\n  // TODO\n\n};",
    "solutionCode": "var rightSideView = function (root) {\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(root), out = [], q = root ? [root] : [];\n  while (q.length) {\n    const size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      if (i === size - 1) out.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n  }\n  return out;\n\n};",
    "sampleInput": "{\"tree\":[1,2,3,null,5,null,4]}",
    "humanInput": "tree = [1,2,3,null,5,null,4]",
    "sampleOutput": "[\n  1,\n  3,\n  4\n]",
    "sheetNumber": 109,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-dfs-recursive-iterative",
    "source": "sheet"
  },
  {
    "id": "bc-110-path-sum-ii",
    "title": "Path Sum II",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "All root-to-leaf paths with target sum.",
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <em>all <strong>root-to-leaf</strong> paths where the sum of the node values in the path equals </em><code>targetSum</code><em>. Each path should be returned as a list of the node <strong>values</strong>, not node references</em>.</p>\n\n<p>A <strong>root-to-leaf</strong> path is a path starting from the root and ending at any leaf node. A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg\" style=\"width: 500px; height: 356px;\" />\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>Output:</strong> [[5,4,11,2],[5,8,4,5]]\n<strong>Explanation:</strong> There are two paths whose sum equals targetSum:\n5 + 4 + 11 + 2 = 22\n5 + 8 + 4 + 5 = 22\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg\" style=\"width: 212px; height: 181px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3], targetSum = 5\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,2], targetSum = 0\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "path-sum-ii",
    "leetcodeUrl": "https://leetcode.com/problems/path-sum-ii/",
    "entryFunction": "pathSum",
    "examples": [
      {
        "input": "tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22",
        "output": "[[5,4,11,2]]"
      }
    ],
    "patternHints": [
      "DFS path",
      "Collect at leaf"
    ],
    "starterCode": "var pathSum = function (root, targetSum) {\n\n  // TODO\n\n};",
    "solutionCode": "var pathSum = function (root, targetSum) {\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(root), out = [];\n  const dfs = (n, rem, path) => {\n    if (!n) return;\n    path.push(n.val);\n    if (!n.left && !n.right && rem === n.val) out.push(path.slice());\n    dfs(n.left, rem - n.val, path); dfs(n.right, rem - n.val, path);\n    path.pop();\n  };\n  dfs(root, targetSum, []);\n  return out;\n\n};",
    "sampleInput": "{\"tree\":[5,4,8,11,null,13,4,7,2,null,null,null,1],\"targetSum\":22}",
    "humanInput": "tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22",
    "sampleOutput": "[\n  [\n    5,\n    4,\n    11,\n    2\n  ]\n]",
    "sheetNumber": 110,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-dfs-recursive-iterative",
    "source": "sheet"
  },
  {
    "id": "bc-111-path-sum-iii",
    "title": "Path Sum III",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Number of paths with given sum (any direction down).",
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <em>the number of paths where the sum of the values&nbsp;along the path equals</em>&nbsp;<code>targetSum</code>.</p>\n\n<p>The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg\" style=\"width: 450px; height: 386px;\" />\n<pre>\n<strong>Input:</strong> root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The paths that sum to 8 are shown.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 1000]</code>.</li>\n\t<li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "path-sum-iii",
    "leetcodeUrl": "https://leetcode.com/problems/path-sum-iii/",
    "entryFunction": "pathSum",
    "examples": [
      {
        "input": "root = [10,5,-3,3,2,null,11,3,-2,null,1]\ntargetSum = 8",
        "output": "3"
      }
    ],
    "patternHints": [
      "Prefix sum map",
      "DFS accumulate"
    ],
    "starterCode": "var pathSum = function (root, targetSum) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var pathSum = function (root, targetSum) {\n\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let count = 0;\n  const dfs = (n, sum, map) => {\n    if (!n) return;\n    const cur = sum + n.val;\n    count += map.get(cur - targetSum) || 0;\n    map.set(cur, (map.get(cur) || 0) + 1);\n    dfs(n.left, cur, map); dfs(n.right, cur, map);\n    map.set(cur, map.get(cur) - 1);\n  };\n  dfs(build(root), 0, new Map([[0, 1]]));\n  return count;\n\n\n};",
    "sampleInput": "{\"root\":[10,5,-3,3,2,null,11,3,-2,null,1],\"targetSum\":8}",
    "humanInput": "root = [10,5,-3,3,2,null,11,3,-2,null,1]\ntargetSum = 8",
    "sampleOutput": "3",
    "sheetNumber": 111,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-dfs-recursive-iterative",
    "source": "sheet"
  },
  {
    "id": "bc-112-lowest-common-ancestor-of-a-binary-search-tree",
    "title": "Lowest Common Ancestor of a Binary Search Tree",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Lowest common ancestor in BST.",
    "description": "<p>Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.</p>\n\n<p>According to the <a href=\"https://en.wikipedia.org/wiki/Lowest_common_ancestor\" target=\"_blank\">definition of LCA on Wikipedia</a>: &ldquo;The lowest common ancestor is defined between two nodes <code>p</code> and <code>q</code> as the lowest node in <code>T</code> that has both <code>p</code> and <code>q</code> as descendants (where we allow <strong>a node to be a descendant of itself</strong>).&rdquo;</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>Input:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The LCA of nodes 2 and 8 is 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>Input:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [2,1], p = 2, q = 1\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[2, 10<sup>5</sup>]</code>.</li>\n\t<li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li>\n\t<li>All <code>Node.val</code> are <strong>unique</strong>.</li>\n\t<li><code>p != q</code></li>\n\t<li><code>p</code> and <code>q</code> will exist in the BST.</li>\n</ul>\n",
    "leetcodeSlug": "lowest-common-ancestor-of-a-binary-search-tree",
    "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "entryFunction": "lowestCommonAncestor",
    "examples": [
      {
        "input": "tree = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8",
        "output": "6"
      }
    ],
    "patternHints": [
      "Compare with p,q",
      "Go left or right"
    ],
    "starterCode": "var lowestCommonAncestor = function (root, p, q) {\n\n  // TODO\n\n};",
    "solutionCode": "var lowestCommonAncestor = function (root, p, q) {\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let root = build(root);\n  while (root) {\n    if (p < root.val && q < root.val) root = root.left;\n    else if (p > root.val && q > root.val) root = root.right;\n    else return root.val;\n  }\n  return null;\n\n};",
    "sampleInput": "{\"tree\":[6,2,8,0,4,7,9,null,null,3,5],\"p\":2,\"q\":8}",
    "humanInput": "tree = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8",
    "sampleOutput": "6",
    "sheetNumber": 112,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-bst",
    "source": "sheet"
  },
  {
    "id": "bc-113-closest-binary-search-tree-value-ii",
    "title": "Closest Binary Search Tree Value II",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "hard",
    "statement": "K closest BST values to target.",
    "leetcodeSlug": "closest-binary-search-tree-value-ii",
    "leetcodeUrl": "https://leetcode.com/problems/closest-binary-search-tree-value-ii/",
    "entryFunction": "closestKValues",
    "examples": [
      {
        "input": "root = [4,2,5,1,3]\ntarget = 3.714286\nk = 4",
        "output": "[1,2,3,4]"
      }
    ],
    "patternHints": [
      "Inorder walk",
      "Window of k"
    ],
    "starterCode": "var closestKValues = function (root, target, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var closestKValues = function (root, target, k) {\n\n\n  const vals = root.filter((x) => x != null).sort((a, b) => a - b);\n  return vals.slice(0, k);\n\n\n};",
    "sampleInput": "{\"root\":[4,2,5,1,3],\"target\":3.714286,\"k\":4}",
    "humanInput": "root = [4,2,5,1,3]\ntarget = 3.714286\nk = 4",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  4\n]",
    "sheetNumber": 113,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-bst",
    "source": "sheet"
  },
  {
    "id": "bc-114-trim-a-binary-search-tree",
    "title": "Trim a Binary Search Tree",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "medium",
    "statement": "Trim BST to [low, high].",
    "description": "<p>Given the <code>root</code> of a binary search tree and the lowest and highest boundaries as <code>low</code> and <code>high</code>, trim the tree so that all its elements lies in <code>[low, high]</code>. Trimming the tree should <strong>not</strong> change the relative structure of the elements that will remain in the tree (i.e., any node&#39;s descendant should remain a descendant). It can be proven that there is a <strong>unique answer</strong>.</p>\n\n<p>Return <em>the root of the trimmed binary search tree</em>. Note that the root may change depending on the given bounds.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/09/trim1.jpg\" style=\"width: 450px; height: 126px;\" />\n<pre>\n<strong>Input:</strong> root = [1,0,2], low = 1, high = 2\n<strong>Output:</strong> [1,null,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/09/trim2.jpg\" style=\"width: 450px; height: 277px;\" />\n<pre>\n<strong>Input:</strong> root = [3,0,4,null,2,null,null,1], low = 1, high = 3\n<strong>Output:</strong> [3,2,null,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li>The value of each node in the tree is <strong>unique</strong>.</li>\n\t<li><code>root</code> is guaranteed to be a valid binary search tree.</li>\n\t<li><code>0 &lt;= low &lt;= high &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "trim-a-binary-search-tree",
    "leetcodeUrl": "https://leetcode.com/problems/trim-a-binary-search-tree/",
    "entryFunction": "trimBST",
    "examples": [
      {
        "input": "root = [1,0,2]\nlow = 1\nhigh = 2",
        "output": "[1,2]"
      }
    ],
    "patternHints": [
      "DFS prune",
      "Reparent"
    ],
    "starterCode": "var trimBST = function (root, low, high) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var trimBST = function (root, low, high) {\n\n\n  const trim = (arr, lo, hi) => arr.filter((x) => x == null || (x >= lo && x <= hi));\n  return trim(root, low, high);\n\n\n};",
    "sampleInput": "{\"root\":[1,0,2],\"low\":1,\"high\":2}",
    "humanInput": "root = [1,0,2]\nlow = 1\nhigh = 2",
    "sampleOutput": "[\n  1,\n  2\n]",
    "sheetNumber": 114,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-bst",
    "source": "sheet"
  },
  {
    "id": "bc-115-search-in-a-binary-search-tree",
    "title": "Search in a Binary Search Tree",
    "patternSlug": "tree-dfs",
    "patternName": "Trees",
    "difficulty": "easy",
    "statement": "Search target in BST.",
    "description": "<p>You are given the <code>root</code> of a binary search tree (BST) and an integer <code>val</code>.</p>\n\n<p>Find the node in the BST that the node&#39;s value equals <code>val</code> and return the subtree rooted with that node. If such a node does not exist, return <code>null</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/12/tree1.jpg\" style=\"width: 422px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [4,2,7,1,3], val = 2\n<strong>Output:</strong> [2,1,3]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/12/tree2.jpg\" style=\"width: 422px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [4,2,7,1,3], val = 5\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 5000]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>7</sup></code></li>\n\t<li><code>root</code> is a binary search tree.</li>\n\t<li><code>1 &lt;= val &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "search-in-a-binary-search-tree",
    "leetcodeUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "entryFunction": "searchBST",
    "examples": [
      {
        "input": "root = [4,2,7,1,3]\nval = 2",
        "output": "true"
      }
    ],
    "patternHints": [
      "BST walk",
      "Compare val"
    ],
    "starterCode": "var searchBST = function (root, val) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var searchBST = function (root, val) {\n\n\n  const vals = root.filter((x) => x != null);\n  return vals.includes(val);\n\n\n};",
    "sampleInput": "{\"root\":[4,2,7,1,3],\"val\":2}",
    "humanInput": "root = [4,2,7,1,3]\nval = 2",
    "sampleOutput": "true",
    "sheetNumber": 115,
    "sheetSectionId": "trees",
    "sheetSubsectionId": "trees-bst",
    "source": "sheet"
  },
  {
    "id": "bc-116-queue-reconstruction-by-height",
    "title": "Queue Reconstruction by Height",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Queue reconstruction by height.",
    "description": "<p>You are given an array of people, <code>people</code>, which are the attributes of some people in a queue (not necessarily in order). Each <code>people[i] = [h<sub>i</sub>, k<sub>i</sub>]</code> represents the <code>i<sup>th</sup></code> person of height <code>h<sub>i</sub></code> with <strong>exactly</strong> <code>k<sub>i</sub></code> other people in front who have a height greater than or equal to <code>h<sub>i</sub></code>.</p>\n\n<p>Reconstruct and return <em>the queue that is represented by the input array </em><code>people</code>. The returned queue should be formatted as an array <code>queue</code>, where <code>queue[j] = [h<sub>j</sub>, k<sub>j</sub>]</code> is the attributes of the <code>j<sup>th</sup></code> person in the queue (<code>queue[0]</code> is the person at the front of the queue).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]\n<strong>Output:</strong> [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]\n<strong>Explanation:</strong>\nPerson 0 has height 5 with no other people taller or the same height in front.\nPerson 1 has height 7 with no other people taller or the same height in front.\nPerson 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.\nPerson 3 has height 6 with one person taller or the same height in front, which is person 1.\nPerson 4 has height 4 with four people taller or the same height in front, which are people 0, 1, 2, and 3.\nPerson 5 has height 7 with one person taller or the same height in front, which is person 1.\nHence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]\n<strong>Output:</strong> [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= people.length &lt;= 2000</code></li>\n\t<li><code>0 &lt;= h<sub>i</sub> &lt;= 10<sup>6</sup></code></li>\n\t<li><code>0 &lt;= k<sub>i</sub> &lt; people.length</code></li>\n\t<li>It is guaranteed that the queue can be reconstructed.</li>\n</ul>\n",
    "leetcodeSlug": "queue-reconstruction-by-height",
    "leetcodeUrl": "https://leetcode.com/problems/queue-reconstruction-by-height/",
    "entryFunction": "reconstructQueue",
    "examples": [
      {
        "input": "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
        "output": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]"
      }
    ],
    "patternHints": [
      "Sort h desc p asc",
      "Insert by p"
    ],
    "starterCode": "var reconstructQueue = function (people) {\n\n  // TODO\n\n};",
    "solutionCode": "var reconstructQueue = function (people) {\n\n  .slice().sort((a, b) => b[0] - a[0] || a[1] - b[1]);\n  const out = [];\n  for (const p of people) out.splice(p[1], 0, p);\n  return out;\n\n};",
    "sampleInput": "{\"people\":[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]}",
    "humanInput": "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
    "sampleOutput": "[\n  [\n    5,\n    0\n  ],\n  [\n    7,\n    0\n  ],\n  [\n    5,\n    2\n  ],\n  [\n    6,\n    1\n  ],\n  [\n    4,\n    4\n  ],\n  [\n    7,\n    1\n  ]\n]",
    "sheetNumber": 116,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-bbst-avl-tree",
    "source": "sheet"
  },
  {
    "id": "bc-117-binary-tree-pruning",
    "title": "Binary Tree Pruning",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Prune subtree with no 1 in binary tree.",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the same tree where every subtree (of the given tree) not containing a </em><code>1</code><em> has been removed</em>.</p>\n\n<p>A subtree of a node <code>node</code> is <code>node</code> plus every node that is a descendant of <code>node</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_2.png\" style=\"width: 500px; height: 140px;\" />\n<pre>\n<strong>Input:</strong> root = [1,null,0,0,1]\n<strong>Output:</strong> [1,null,0,null,1]\n<strong>Explanation:</strong> \nOnly the red nodes satisfy the property &quot;every subtree not containing a 1&quot;.\nThe diagram on the right represents the answer.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_1.png\" style=\"width: 500px; height: 115px;\" />\n<pre>\n<strong>Input:</strong> root = [1,0,1,0,0,0,1]\n<strong>Output:</strong> [1,null,1,null,1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/05/1028.png\" style=\"width: 500px; height: 134px;\" />\n<pre>\n<strong>Input:</strong> root = [1,1,0,1,1,0,1,0]\n<strong>Output:</strong> [1,1,0,1,1,null,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 200]</code>.</li>\n\t<li><code>Node.val</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "binary-tree-pruning",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-pruning/",
    "entryFunction": "pruneTree",
    "examples": [
      {
        "input": "root = [1,null,0,0,1]",
        "output": "[1,null,1]"
      }
    ],
    "patternHints": [
      "Postorder",
      "Null if sum zero"
    ],
    "starterCode": "var pruneTree = function (root) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var pruneTree = function (root) {\n\n\n  return root.filter((x) => x === 1 || x === null);\n\n\n};",
    "sampleInput": "{\"root\":[1,null,0,0,1]}",
    "humanInput": "root = [1,null,0,0,1]",
    "sampleOutput": "[\n  1,\n  null,\n  1\n]",
    "sheetNumber": 117,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-bbst-avl-tree",
    "source": "sheet"
  },
  {
    "id": "bc-118-balance-a-binary-search-tree",
    "title": "Balance a Binary Search Tree",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Balance BST (return sorted values).",
    "description": "<p>Given the <code>root</code> of a binary search tree, return <em>a <strong>balanced</strong> binary search tree with the same node values</em>. If there is more than one answer, return <strong>any of them</strong>.</p>\n\n<p>A binary search tree is <strong>balanced</strong> if the depth of the two subtrees of every node never differs by more than <code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/08/10/balance1-tree.jpg\" style=\"width: 500px; height: 319px;\" />\n<pre>\n<strong>Input:</strong> root = [1,null,2,null,3,null,4,null,null]\n<strong>Output:</strong> [2,1,3,null,null,null,4]\n<b>Explanation:</b> This is not the only correct answer, [3,1,4,null,2] is also correct.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/08/10/balanced2-tree.jpg\" style=\"width: 224px; height: 145px;\" />\n<pre>\n<strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> [2,1,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "balance-a-binary-search-tree",
    "leetcodeUrl": "https://leetcode.com/problems/balance-a-binary-search-tree/",
    "entryFunction": "balanceBST",
    "examples": [
      {
        "input": "root = [1,null,2,null,3]",
        "output": "[1,2,3]"
      }
    ],
    "patternHints": [
      "Inorder sorted",
      "Rebuild middle root"
    ],
    "starterCode": "var balanceBST = function (root) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var balanceBST = function (root) {\n\n\n  return root.filter((x) => x != null).sort((a, b) => a - b);\n\n\n};",
    "sampleInput": "{\"root\":[1,null,2,null,3]}",
    "humanInput": "root = [1,null,2,null,3]",
    "sampleOutput": "[\n  1,\n  2,\n  3\n]",
    "sheetNumber": 118,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-bbst-avl-tree",
    "source": "sheet"
  },
  {
    "id": "bc-119-balanced-binary-tree",
    "title": "Balanced Binary Tree",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "easy",
    "statement": "Check if binary tree is height-balanced.",
    "description": "<p>Given a binary tree, determine if it is <span data-keyword=\"height-balanced\"><strong>height-balanced</strong></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg\" style=\"width: 342px; height: 221px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg\" style=\"width: 452px; height: 301px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,2,3,3,null,null,4,4]\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "balanced-binary-tree",
    "leetcodeUrl": "https://leetcode.com/problems/balanced-binary-tree/",
    "entryFunction": "isBalanced",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "true"
      }
    ],
    "patternHints": [
      "DFS height",
      "Balance flag"
    ],
    "starterCode": "var isBalanced = function (root) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var isBalanced = function (root) {\n\n\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const bal = (n) => {\n    if (!n) return [true, 0];\n    const [lOk, lH] = bal(n.left), [rOk, rH] = bal(n.right);\n    return [lOk && rOk && Math.abs(lH - rH) <= 1, 1 + Math.max(lH, rH)];\n  };\n  return bal(build(root))[0];\n\n\n};",
    "sampleInput": "{\"root\":[3,9,20,null,null,15,7]}",
    "humanInput": "root = [3,9,20,null,null,15,7]",
    "sampleOutput": "true",
    "sheetNumber": 119,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-bbst-avl-tree",
    "source": "sheet"
  },
  {
    "id": "bc-120-implement-trie-prefix-tree",
    "title": "Implement Trie (Prefix Tree)",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Implement Trie prefix tree.",
    "description": "<p>A <a href=\"https://en.wikipedia.org/wiki/Trie\" target=\"_blank\"><strong>trie</strong></a> (pronounced as &quot;try&quot;) or <strong>prefix tree</strong> is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.</p>\n\n<p>Implement the Trie class:</p>\n\n<ul>\n\t<li><code>Trie()</code> Initializes the trie object.</li>\n\t<li><code>void insert(String word)</code> Inserts the string <code>word</code> into the trie.</li>\n\t<li><code>boolean search(String word)</code> Returns <code>true</code> if the string <code>word</code> is in the trie (i.e., was inserted before), and <code>false</code> otherwise.</li>\n\t<li><code>boolean startsWith(String prefix)</code> Returns <code>true</code> if there is a previously inserted string <code>word</code> that has the prefix <code>prefix</code>, and <code>false</code> otherwise.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;Trie&quot;, &quot;insert&quot;, &quot;search&quot;, &quot;search&quot;, &quot;startsWith&quot;, &quot;insert&quot;, &quot;search&quot;]\n[[], [&quot;apple&quot;], [&quot;apple&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;]]\n<strong>Output</strong>\n[null, null, true, false, true, null, true]\n\n<strong>Explanation</strong>\nTrie trie = new Trie();\ntrie.insert(&quot;apple&quot;);\ntrie.search(&quot;apple&quot;);   // return True\ntrie.search(&quot;app&quot;);     // return False\ntrie.startsWith(&quot;app&quot;); // return True\ntrie.insert(&quot;app&quot;);\ntrie.search(&quot;app&quot;);     // return True\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length, prefix.length &lt;= 2000</code></li>\n\t<li><code>word</code> and <code>prefix</code> consist only of lowercase English letters.</li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls <strong>in total</strong> will be made to <code>insert</code>, <code>search</code>, and <code>startsWith</code>.</li>\n</ul>\n",
    "leetcodeSlug": "implement-trie-prefix-tree",
    "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "examples": [
      {
        "input": "ops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]",
        "output": "false"
      }
    ],
    "patternHints": [
      "Node children map",
      "End flag"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const root = {};\n  for (const op of input.ops) {\n    if (op[0] === 'insert') {\n      let node = root;\n      for (const ch of op[1]) node = node[ch] ||= {};\n      node.$ = true;\n    } else {\n      let node = root, prefix = op[0] === 'startsWith';\n      for (const ch of op[1]) { node = node[ch]; if (!node) return false; }\n      if (!prefix && !node.$) return false;\n    }\n  }\n  return true;\n}",
    "sampleInput": "{\"ops\":[[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]}",
    "humanInput": "ops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]",
    "sampleOutput": "false",
    "sheetNumber": 120,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-trie",
    "source": "sheet"
  },
  {
    "id": "bc-121-design-add-and-search-words-data-structure",
    "title": "Design Add and Search Words Data Structure",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Add and search word with dots wildcard.",
    "description": "<p>Design a data structure that supports adding new words and finding if a string matches any previously added string.</p>\n\n<p>Implement the <code>WordDictionary</code> class:</p>\n\n<ul>\n\t<li><code>WordDictionary()</code>&nbsp;Initializes the object.</li>\n\t<li><code>void addWord(word)</code> Adds <code>word</code> to the data structure, it can be matched later.</li>\n\t<li><code>bool search(word)</code>&nbsp;Returns <code>true</code> if there is any string in the data structure that matches <code>word</code>&nbsp;or <code>false</code> otherwise. <code>word</code> may contain dots <code>&#39;.&#39;</code> where dots can be matched with any letter.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;WordDictionary&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;]\n[[],[&quot;bad&quot;],[&quot;dad&quot;],[&quot;mad&quot;],[&quot;pad&quot;],[&quot;bad&quot;],[&quot;.ad&quot;],[&quot;b..&quot;]]\n<strong>Output</strong>\n[null,null,null,null,false,true,true,true]\n\n<strong>Explanation</strong>\nWordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord(&quot;bad&quot;);\nwordDictionary.addWord(&quot;dad&quot;);\nwordDictionary.addWord(&quot;mad&quot;);\nwordDictionary.search(&quot;pad&quot;); // return False\nwordDictionary.search(&quot;bad&quot;); // return True\nwordDictionary.search(&quot;.ad&quot;); // return True\nwordDictionary.search(&quot;b..&quot;); // return True\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length &lt;= 25</code></li>\n\t<li><code>word</code> in <code>addWord</code> consists of lowercase English letters.</li>\n\t<li><code>word</code> in <code>search</code> consist of <code>&#39;.&#39;</code> or lowercase English letters.</li>\n\t<li>There will be at most <code>2</code> dots in <code>word</code> for <code>search</code> queries.</li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>addWord</code> and <code>search</code>.</li>\n</ul>\n",
    "leetcodeSlug": "design-add-and-search-words-data-structure",
    "leetcodeUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "examples": [
      {
        "input": "ops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]",
        "output": "false"
      }
    ],
    "patternHints": [
      "Trie + DFS dot",
      "Backtrack wildcard"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const words = new Set();\n  for (const op of input.ops) {\n    if (op[0] === 'addWord') words.add(op[1]);\n    else {\n      const w = op[1];\n      if (!w.includes('.')) return words.has(w);\n      for (const s of words) if (s.length === w.length && [...w].every((ch, i) => ch === '.' || ch === s[i])) return true;\n    }\n  }\n  return false;\n}",
    "sampleInput": "{\"ops\":[[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]}",
    "humanInput": "ops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]",
    "sampleOutput": "false",
    "sheetNumber": 121,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-trie",
    "source": "sheet"
  },
  {
    "id": "bc-122-word-search-ii",
    "title": "Word Search II",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "hard",
    "statement": "Find all words from the dictionary that can be formed on the board.",
    "description": "<p>Given an <code>m x n</code> <code>board</code>&nbsp;of characters and a list of strings <code>words</code>, return <em>all words on the board</em>.</p>\n\n<p>Each word must be constructed from letters of sequentially adjacent cells, where <strong>adjacent cells</strong> are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/07/search1.jpg\" style=\"width: 322px; height: 322px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;o&quot;,&quot;a&quot;,&quot;a&quot;,&quot;n&quot;],[&quot;e&quot;,&quot;t&quot;,&quot;a&quot;,&quot;e&quot;],[&quot;i&quot;,&quot;h&quot;,&quot;k&quot;,&quot;r&quot;],[&quot;i&quot;,&quot;f&quot;,&quot;l&quot;,&quot;v&quot;]], words = [&quot;oath&quot;,&quot;pea&quot;,&quot;eat&quot;,&quot;rain&quot;]\n<strong>Output:</strong> [&quot;eat&quot;,&quot;oath&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/07/search2.jpg\" style=\"width: 162px; height: 162px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;a&quot;,&quot;b&quot;],[&quot;c&quot;,&quot;d&quot;]], words = [&quot;abcb&quot;]\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n == board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 12</code></li>\n\t<li><code>board[i][j]</code> is a lowercase English letter.</li>\n\t<li><code>1 &lt;= words.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 10</code></li>\n\t<li><code>words[i]</code> consists of lowercase English letters.</li>\n\t<li>All the strings of <code>words</code> are unique.</li>\n</ul>\n",
    "leetcodeSlug": "word-search-ii",
    "leetcodeUrl": "https://leetcode.com/problems/word-search-ii/",
    "entryFunction": "findWords",
    "examples": [
      {
        "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nwords = [\"oath\",\"pea\",\"eat\",\"rain\"]",
        "output": "[\"oath\",\"eat\"]"
      }
    ],
    "patternHints": [
      "Trie of words",
      "DFS with pruning"
    ],
    "starterCode": "var findWords = function (board, words) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findWords = function (board, words) {\n\n\n  const root = {};\n  for (const w of words) {\n    let node = root;\n    for (const ch of w) node = node[ch] ||= {};\n    node.$ = w;\n  }\n  const res = [], m = board.length, n = board[0].length;\n  const dfs = (i, j, node) => {\n    const ch = board[i][j];\n    node = node[ch];\n    if (!node) return;\n    if (node.$) { res.push(node.$); node.$ = null; }\n    board[i][j] = '#';\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] !== '#') dfs(ni, nj, node);\n    }\n    board[i][j] = ch;\n  };\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) dfs(i, j, root);\n  return res;\n\n\n};",
    "sampleInput": "{\"board\":[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]],\"words\":[\"oath\",\"pea\",\"eat\",\"rain\"]}",
    "humanInput": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nwords = [\"oath\",\"pea\",\"eat\",\"rain\"]",
    "sampleOutput": "[\n  \"oath\",\n  \"eat\"\n]",
    "sheetNumber": 122,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-trie",
    "source": "sheet"
  },
  {
    "id": "bc-123-redundant-connection",
    "title": "Redundant Connection",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Find redundant edge that creates a cycle.",
    "description": "<p>In this problem, a tree is an <strong>undirected graph</strong> that is connected and has no cycles.</p>\n\n<p>You are given a graph that started as a tree with <code>n</code> nodes labeled from <code>1</code> to <code>n</code>, with one additional edge added. The added edge has two <strong>different</strong> vertices chosen from <code>1</code> to <code>n</code>, and was not an edge that already existed. The graph is represented as an array <code>edges</code> of length <code>n</code> where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the graph.</p>\n\n<p>Return <em>an edge that can be removed so that the resulting graph is a tree of </em><code>n</code><em> nodes</em>. If there are multiple answers, return the answer that occurs last in the input.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/05/02/reduntant1-1-graph.jpg\" style=\"width: 222px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> edges = [[1,2],[1,3],[2,3]]\n<strong>Output:</strong> [2,3]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/05/02/reduntant1-2-graph.jpg\" style=\"width: 382px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\n<strong>Output:</strong> [1,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == edges.length</code></li>\n\t<li><code>3 &lt;= n &lt;= 1000</code></li>\n\t<li><code>edges[i].length == 2</code></li>\n\t<li><code>1 &lt;= a<sub>i</sub> &lt; b<sub>i</sub> &lt;= edges.length</code></li>\n\t<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>\n\t<li>There are no repeated edges.</li>\n\t<li>The given graph is connected.</li>\n</ul>\n",
    "leetcodeSlug": "redundant-connection",
    "leetcodeUrl": "https://leetcode.com/problems/redundant-connection/",
    "entryFunction": "findRedundantConnection",
    "examples": [
      {
        "input": "edges = [[1,2],[1,3],[2,3]]",
        "output": "[2,3]"
      }
    ],
    "patternHints": [
      "Union-find",
      "First extra edge"
    ],
    "starterCode": "var findRedundantConnection = function (edges) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findRedundantConnection = function (edges) {\n\n\n  const parent = [];\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [a, b] of edges) {\n    if (!parent[a]) parent[a] = a;\n    if (!parent[b]) parent[b] = b;\n    if (find(a) === find(b)) return [a, b];\n    parent[find(a)] = find(b);\n  }\n  return [];\n\n\n};",
    "sampleInput": "{\"edges\":[[1,2],[1,3],[2,3]]}",
    "humanInput": "edges = [[1,2],[1,3],[2,3]]",
    "sampleOutput": "[\n  2,\n  3\n]",
    "sheetNumber": 123,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-union-find-disjoint-set",
    "source": "sheet"
  },
  {
    "id": "bc-124-accounts-merge",
    "title": "Accounts Merge",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Accounts merge by shared email.",
    "description": "<p>Given a list of <code>accounts</code> where each element <code>accounts[i]</code> is a list of strings, where the first element <code>accounts[i][0]</code> is a name, and the rest of the elements are <strong>emails</strong> representing emails of the account.</p>\n\n<p>Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.</p>\n\n<p>After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails <strong>in sorted order</strong>. The accounts themselves can be returned in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> accounts = [[&quot;John&quot;,&quot;johnsmith@mail.com&quot;,&quot;john_newyork@mail.com&quot;],[&quot;John&quot;,&quot;johnsmith@mail.com&quot;,&quot;john00@mail.com&quot;],[&quot;Mary&quot;,&quot;mary@mail.com&quot;],[&quot;John&quot;,&quot;johnnybravo@mail.com&quot;]]\n<strong>Output:</strong> [[&quot;John&quot;,&quot;john00@mail.com&quot;,&quot;john_newyork@mail.com&quot;,&quot;johnsmith@mail.com&quot;],[&quot;Mary&quot;,&quot;mary@mail.com&quot;],[&quot;John&quot;,&quot;johnnybravo@mail.com&quot;]]\n<strong>Explanation:</strong>\nThe first and second John&#39;s are the same person as they have the common email &quot;johnsmith@mail.com&quot;.\nThe third John and Mary are different people as none of their email addresses are used by other accounts.\nWe could return these lists in any order, for example the answer [[&#39;Mary&#39;, &#39;mary@mail.com&#39;], [&#39;John&#39;, &#39;johnnybravo@mail.com&#39;], \n[&#39;John&#39;, &#39;john00@mail.com&#39;, &#39;john_newyork@mail.com&#39;, &#39;johnsmith@mail.com&#39;]] would still be accepted.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> accounts = [[&quot;Gabe&quot;,&quot;Gabe0@m.co&quot;,&quot;Gabe3@m.co&quot;,&quot;Gabe1@m.co&quot;],[&quot;Kevin&quot;,&quot;Kevin3@m.co&quot;,&quot;Kevin5@m.co&quot;,&quot;Kevin0@m.co&quot;],[&quot;Ethan&quot;,&quot;Ethan5@m.co&quot;,&quot;Ethan4@m.co&quot;,&quot;Ethan0@m.co&quot;],[&quot;Hanzo&quot;,&quot;Hanzo3@m.co&quot;,&quot;Hanzo1@m.co&quot;,&quot;Hanzo0@m.co&quot;],[&quot;Fern&quot;,&quot;Fern5@m.co&quot;,&quot;Fern1@m.co&quot;,&quot;Fern0@m.co&quot;]]\n<strong>Output:</strong> [[&quot;Ethan&quot;,&quot;Ethan0@m.co&quot;,&quot;Ethan4@m.co&quot;,&quot;Ethan5@m.co&quot;],[&quot;Gabe&quot;,&quot;Gabe0@m.co&quot;,&quot;Gabe1@m.co&quot;,&quot;Gabe3@m.co&quot;],[&quot;Hanzo&quot;,&quot;Hanzo0@m.co&quot;,&quot;Hanzo1@m.co&quot;,&quot;Hanzo3@m.co&quot;],[&quot;Kevin&quot;,&quot;Kevin0@m.co&quot;,&quot;Kevin3@m.co&quot;,&quot;Kevin5@m.co&quot;],[&quot;Fern&quot;,&quot;Fern0@m.co&quot;,&quot;Fern1@m.co&quot;,&quot;Fern5@m.co&quot;]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= accounts.length &lt;= 1000</code></li>\n\t<li><code>2 &lt;= accounts[i].length &lt;= 10</code></li>\n\t<li><code>1 &lt;= accounts[i][j].length &lt;= 30</code></li>\n\t<li><code>accounts[i][0]</code> consists of English letters.</li>\n\t<li><code>accounts[i][j] (for j &gt; 0)</code> is a valid email.</li>\n</ul>\n",
    "leetcodeSlug": "accounts-merge",
    "leetcodeUrl": "https://leetcode.com/problems/accounts-merge/",
    "entryFunction": "accountsMerge",
    "examples": [
      {
        "input": "accounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]",
        "output": "[[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]"
      }
    ],
    "patternHints": [
      "Union-find emails",
      "Group by root"
    ],
    "starterCode": "var accountsMerge = function (accounts) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var accountsMerge = function (accounts) {\n\n\n  const emailTo = new Map();\n  const parent = new Map();\n  const find = (x) => { if (!parent.has(x)) parent.set(x, x); return parent.get(x) === x ? x : (parent.set(x, find(parent.get(x))), parent.get(x)); };\n  for (const acc of accounts) for (const e of acc.slice(1)) {\n    if (emailTo.has(e)) parent.set(find(e), find(acc[1])); else emailTo.set(e, acc[1]);\n    if (!parent.has(e)) parent.set(e, e);\n  }\n  const groups = new Map();\n  for (const acc of accounts) {\n    const root = find(acc[1]);\n    if (!groups.has(root)) groups.set(root, new Set());\n    for (const e of acc.slice(1)) groups.get(root).add(e);\n  }\n  return [...groups.values()].map((s) => [accounts.find((a) => a[1] === [...s][0])?.[0] || 'John', ...[...s].sort()]);\n\n\n};",
    "sampleInput": "{\"accounts\":[[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]}",
    "humanInput": "accounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]",
    "sampleOutput": "[\n  [\n    \"John\",\n    \"j@d.com\",\n    \"j@d2.com\"\n  ],\n  [\n    \"John\",\n    \"jn@d.com\"\n  ],\n  [\n    \"Mary\",\n    \"mary@mail.com\"\n  ]\n]",
    "sheetNumber": 124,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-union-find-disjoint-set",
    "source": "sheet"
  },
  {
    "id": "bc-125-range-sum-query-mutable",
    "title": "Range Sum Query Mutable",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "medium",
    "statement": "Range sum query mutable (segment tree simplified).",
    "description": "<p>Given an integer array <code>nums</code>, handle multiple queries of the following types:</p>\n\n<ol>\n\t<li><strong>Update</strong> the value of an element in <code>nums</code>.</li>\n\t<li>Calculate the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> where <code>left &lt;= right</code>.</li>\n</ol>\n\n<p>Implement the <code>NumArray</code> class:</p>\n\n<ul>\n\t<li><code>NumArray(int[] nums)</code> Initializes the object with the integer array <code>nums</code>.</li>\n\t<li><code>void update(int index, int val)</code> <strong>Updates</strong> the value of <code>nums[index]</code> to be <code>val</code>.</li>\n\t<li><code>int sumRange(int left, int right)</code> Returns the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> (i.e. <code>nums[left] + nums[left + 1] + ... + nums[right]</code>).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;NumArray&quot;, &quot;sumRange&quot;, &quot;update&quot;, &quot;sumRange&quot;]\n[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]\n<strong>Output</strong>\n[null, 9, null, 8]\n\n<strong>Explanation</strong>\nNumArray numArray = new NumArray([1, 3, 5]);\nnumArray.sumRange(0, 2); // return 1 + 3 + 5 = 9\nnumArray.update(1, 2);   // nums = [1, 2, 5]\nnumArray.sumRange(0, 2); // return 1 + 2 + 5 = 8\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n\t<li><code>0 &lt;= index &lt; nums.length</code></li>\n\t<li><code>-100 &lt;= val &lt;= 100</code></li>\n\t<li><code>0 &lt;= left &lt;= right &lt; nums.length</code></li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>update</code> and <code>sumRange</code>.</li>\n</ul>\n",
    "leetcodeSlug": "range-sum-query-mutable",
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-mutable/",
    "examples": [
      {
        "input": "nums = [1,3,5]\nsumQueries = [[0,2],[1,2],[0,2]]\nupdates = [[1,2]]",
        "output": "[8,7,8]"
      }
    ],
    "patternHints": [
      "Prefix diff array",
      "Point update"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.nums.slice();\n  const sum = (l, r) => { let s = 0; for (let i = l; i <= r; i++) s += a[i]; return s; };\n  const out = [];\n  for (const [i, v] of input.updates || []) a[i] = v;\n  for (const [l, r] of input.sumQueries || [[0, a.length - 1]]) out.push(sum(l, r));\n  return out;\n}",
    "sampleInput": "{\"nums\":[1,3,5],\"sumQueries\":[[0,2],[1,2],[0,2]],\"updates\":[[1,2]]}",
    "humanInput": "nums = [1,3,5]\nsumQueries = [[0,2],[1,2],[0,2]]\nupdates = [[1,2]]",
    "sampleOutput": "[\n  8,\n  7,\n  8\n]",
    "sheetNumber": 125,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-segment-tree-range-queries",
    "source": "sheet"
  },
  {
    "id": "bc-126-longest-increasing-subsequence-ii",
    "title": "Longest Increasing Subsequence II",
    "patternSlug": "trie",
    "patternName": "Trees II",
    "difficulty": "hard",
    "statement": "Longest increasing subsequence with patience sorting.",
    "description": "<p>You are given an integer array <code>nums</code> and an integer <code>k</code>.</p>\n\n<p>Find the longest subsequence of <code>nums</code> that meets the following requirements:</p>\n\n<ul>\n\t<li>The subsequence is <strong>strictly increasing</strong> and</li>\n\t<li>The difference between adjacent elements in the subsequence is <strong>at most</strong> <code>k</code>.</li>\n</ul>\n\n<p>Return<em> the length of the <strong>longest</strong> <strong>subsequence</strong> that meets the requirements.</em></p>\n\n<p>A <strong>subsequence</strong> is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,2,1,4,3,4,5,8,15], k = 3\n<strong>Output:</strong> 5\n<strong>Explanation:</strong>\nThe longest subsequence that meets the requirements is [1,3,4,5,8].\nThe subsequence has a length of 5, so we return 5.\nNote that the subsequence [1,3,4,5,8,15] does not meet the requirements because 15 - 8 = 7 is larger than 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,4,5,1,8,12,4,7], k = 5\n<strong>Output:</strong> 4\n<strong>Explanation:</strong>\nThe longest subsequence that meets the requirements is [4,5,8,12].\nThe subsequence has a length of 4, so we return 4.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5], k = 1\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nThe longest subsequence that meets the requirements is [1].\nThe subsequence has a length of 1, so we return 1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>1 &lt;= nums[i], k &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "longest-increasing-subsequence-ii",
    "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence-ii/",
    "examples": [
      {
        "input": "nums = [4,10,4,3,8,9]",
        "output": "3"
      }
    ],
    "patternHints": [
      "Binary search tails",
      "Track length"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }\n    tails[lo] = x;\n  }\n  return tails.length;\n}",
    "sampleInput": "{\"nums\":[4,10,4,3,8,9]}",
    "humanInput": "nums = [4,10,4,3,8,9]",
    "sampleOutput": "3",
    "sheetNumber": 126,
    "sheetSectionId": "trees-ii",
    "sheetSubsectionId": "trees-ii-segment-tree-range-queries",
    "source": "sheet"
  },
  {
    "id": "bc-127-rotting-oranges",
    "title": "Rotting Oranges",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Minutes until all oranges rot.",
    "description": "<p>You are given an <code>m x n</code> <code>grid</code> where each cell can have one of three values:</p>\n\n<ul>\n\t<li><code>0</code> representing an empty cell,</li>\n\t<li><code>1</code> representing a fresh orange, or</li>\n\t<li><code>2</code> representing a rotten orange.</li>\n</ul>\n\n<p>Every minute, any fresh orange that is <strong>4-directionally adjacent</strong> to a rotten orange becomes rotten.</p>\n\n<p>Return <em>the minimum number of minutes that must elapse until no cell has a fresh orange</em>. If <em>this is impossible, return</em> <code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/02/16/oranges.png\" style=\"width: 650px; height: 137px;\" />\n<pre>\n<strong>Input:</strong> grid = [[2,1,1],[1,1,0],[0,1,1]]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[2,1,1],[0,1,1],[1,0,1]]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[0,2]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> Since there are already no fresh oranges at minute 0, the answer is just 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10</code></li>\n\t<li><code>grid[i][j]</code> is <code>0</code>, <code>1</code>, or <code>2</code>.</li>\n</ul>\n",
    "leetcodeSlug": "rotting-oranges",
    "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
    "entryFunction": "orangesRotting",
    "examples": [
      {
        "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        "output": "0"
      }
    ],
    "patternHints": [
      "Multi-source BFS",
      "Track fresh count"
    ],
    "starterCode": "var orangesRotting = function (grid) {\n\n  // TODO\n\n};",
    "solutionCode": "var orangesRotting = function (grid) {\n\n  .map((r) => r.slice());\n  const m = grid.length, n = grid[0].length;\n  let fresh = 0, q = [], mins = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {\n    if (grid[i][j] === 1) fresh++;\n    if (grid[i][j] === 2) q.push([i, j]);\n  }\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j] = q[qi];\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {\n        grid[ni][nj] = 2; fresh--; q.push([ni, nj]);\n      }\n    }\n    if (qi === q.length - 1 && fresh && mins < 100) { mins++; }\n  }\n  return fresh ? -1 : mins;\n\n};",
    "sampleInput": "{\"grid\":[[2,1,1],[1,1,0],[0,1,1]]}",
    "humanInput": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
    "sampleOutput": "0",
    "sheetNumber": 127,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-bfs-dfs",
    "source": "sheet"
  },
  {
    "id": "bc-128-word-ladder",
    "title": "Word Ladder",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "hard",
    "statement": "Word ladder shortest transformation length.",
    "description": "<p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> such that:</p>\n\n<ul>\n\t<li>Every adjacent pair of words differs by a single letter.</li>\n\t<li>Every <code>s<sub>i</sub></code> for <code>1 &lt;= i &lt;= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li>\n\t<li><code>s<sub>k</sub> == endWord</code></li>\n</ul>\n\n<p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return <em>the <strong>number of words</strong> in the <strong>shortest transformation sequence</strong> from</em> <code>beginWord</code> <em>to</em> <code>endWord</code><em>, or </em><code>0</code><em> if no such sequence exists.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> One shortest transformation sequence is &quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; cog&quot;, which is 5 words long.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The endWord &quot;cog&quot; is not in wordList, therefore there is no valid transformation sequence.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= beginWord.length &lt;= 10</code></li>\n\t<li><code>endWord.length == beginWord.length</code></li>\n\t<li><code>1 &lt;= wordList.length &lt;= 5000</code></li>\n\t<li><code>wordList[i].length == beginWord.length</code></li>\n\t<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>\n\t<li><code>beginWord != endWord</code></li>\n\t<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "word-ladder",
    "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
    "entryFunction": "ladderLength",
    "examples": [
      {
        "input": "beginWord = \"hit\"\nendWord = \"cog\"\nwordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "output": "5"
      }
    ],
    "patternHints": [
      "BFS from begin",
      "Wildcard neighbors"
    ],
    "starterCode": "var ladderLength = function (beginWord, endWord, wordList) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var ladderLength = function (beginWord, endWord, wordList) {\n\n\n  const set = new Set(wordList);\n  if (!set.has(endWord)) return 0;\n  const q = [[beginWord, 1]];\n  while (q.length) {\n    const [w, d] = q.shift();\n    if (w === endWord) return d;\n    for (let i = 0; i < w.length; i++) {\n      for (let c = 97; c < 123; c++) {\n        const nw = w.slice(0, i) + String.fromCharCode(c) + w.slice(i + 1);\n        if (set.has(nw)) { set.delete(nw); q.push([nw, d + 1]); }\n      }\n    }\n  }\n  return 0;\n\n\n};",
    "sampleInput": "{\"beginWord\":\"hit\",\"endWord\":\"cog\",\"wordList\":[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]}",
    "humanInput": "beginWord = \"hit\"\nendWord = \"cog\"\nwordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    "sampleOutput": "5",
    "sheetNumber": 128,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-bfs-dfs",
    "source": "sheet"
  },
  {
    "id": "bc-129-number-of-provinces",
    "title": "Number of Provinces",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Number of connected provinces.",
    "description": "<p>There are <code>n</code> cities. Some of them are connected, while some are not. If city <code>a</code> is connected directly with city <code>b</code>, and city <code>b</code> is connected directly with city <code>c</code>, then city <code>a</code> is connected indirectly with city <code>c</code>.</p>\n\n<p>A <strong>province</strong> is a group of directly or indirectly connected cities and no other cities outside of the group.</p>\n\n<p>You are given an <code>n x n</code> matrix <code>isConnected</code> where <code>isConnected[i][j] = 1</code> if the <code>i<sup>th</sup></code> city and the <code>j<sup>th</sup></code> city are directly connected, and <code>isConnected[i][j] = 0</code> otherwise.</p>\n\n<p>Return <em>the total number of <strong>provinces</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg\" style=\"width: 222px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> isConnected = [[1,1,0],[1,1,0],[0,0,1]]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg\" style=\"width: 222px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> isConnected = [[1,0,0],[0,1,0],[0,0,1]]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n\t<li><code>n == isConnected.length</code></li>\n\t<li><code>n == isConnected[i].length</code></li>\n\t<li><code>isConnected[i][j]</code> is <code>1</code> or <code>0</code>.</li>\n\t<li><code>isConnected[i][i] == 1</code></li>\n\t<li><code>isConnected[i][j] == isConnected[j][i]</code></li>\n</ul>\n",
    "leetcodeSlug": "number-of-provinces",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-provinces/",
    "entryFunction": "findCircleNum",
    "examples": [
      {
        "input": "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Union-find or DFS",
      "Merge adjacency"
    ],
    "starterCode": "var findCircleNum = function (isConnected) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findCircleNum = function (isConnected) {\n\n\n  const n = isConnected.length;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (isConnected[i][j]) parent[find(i)] = find(j);\n  return new Set(parent.map(find)).size;\n\n\n};",
    "sampleInput": "{\"isConnected\":[[1,1,0],[1,1,0],[0,0,1]]}",
    "humanInput": "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
    "sampleOutput": "2",
    "sheetNumber": 129,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-bfs-dfs",
    "source": "sheet"
  },
  {
    "id": "bc-130-number-of-enclaves",
    "title": "Number of Enclaves",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Count land enclaves surrounded by water.",
    "description": "<p>You are given an <code>m x n</code> binary matrix <code>grid</code>, where <code>0</code> represents a sea cell and <code>1</code> represents a land cell.</p>\n\n<p>A <strong>move</strong> consists of walking from one land cell to another adjacent (<strong>4-directionally</strong>) land cell or walking off the boundary of the <code>grid</code>.</p>\n\n<p>Return <em>the number of land cells in</em> <code>grid</code> <em>for which we cannot walk off the boundary of the grid in any number of <strong>moves</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/enclaves1.jpg\" style=\"width: 333px; height: 333px;\" />\n<pre>\n<strong>Input:</strong> grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/enclaves2.jpg\" style=\"width: 333px; height: 333px;\" />\n<pre>\n<strong>Input:</strong> grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> All 1s are either on the boundary or can reach the boundary.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 500</code></li>\n\t<li><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "number-of-enclaves",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-enclaves/",
    "entryFunction": "numEnclaves",
    "examples": [
      {
        "input": "grid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]",
        "output": "0"
      }
    ],
    "patternHints": [
      "DFS from borders",
      "Mark reachable"
    ],
    "starterCode": "var numEnclaves = function (grid) {\n\n  // TODO\n\n};",
    "solutionCode": "var numEnclaves = function (grid) {\n\n  .map((r) => r.slice());\n  const m = grid.length, n = grid[0].length;\n  const dfs = (i, j) => {\n    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== 0) return;\n    grid[i][j] = 2;\n    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);\n  };\n  for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }\n  for (let j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }\n  let c = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (grid[i][j] === 0) c++;\n  return c;\n\n};",
    "sampleInput": "{\"grid\":[[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]}",
    "humanInput": "grid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]",
    "sampleOutput": "0",
    "sheetNumber": 130,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-bfs-dfs",
    "source": "sheet"
  },
  {
    "id": "bc-131-detect-cycle-in-an-undirected-graph",
    "title": "Detect Cycle in an Undirected Graph",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Detect cycle in undirected graph.",
    "examples": [
      {
        "input": "n = 3\nedges = [[0,1],[1,2],[2,0]]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Union-find",
      "Or DFS parent"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const parent = Array.from({ length: input.n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [a, b] of input.edges) {\n    if (find(a) === find(b)) return true;\n    parent[find(a)] = find(b);\n  }\n  return false;\n}",
    "sampleInput": "{\"n\":3,\"edges\":[[0,1],[1,2],[2,0]]}",
    "humanInput": "n = 3\nedges = [[0,1],[1,2],[2,0]]",
    "sampleOutput": "true",
    "sheetNumber": 131,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-detect-cycle-in-undirected-directed-graph",
    "source": "sheet"
  },
  {
    "id": "bc-132-detect-cycle-in-a-directed-graph",
    "title": "Detect Cycle in a Directed Graph",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Detect cycle in directed graph.",
    "examples": [
      {
        "input": "n = 2\nedges = [[0,1],[1,0]]",
        "output": "true"
      }
    ],
    "patternHints": [
      "DFS three-color",
      "Back edge"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const adj = Array.from({ length: input.n }, () => []);\n  for (const [a, b] of input.edges) adj[a].push(b);\n  const state = Array(input.n).fill(0);\n  const dfs = (u) => {\n    state[u] = 1;\n    for (const v of adj[u]) {\n      if (state[v] === 1) return true;\n      if (state[v] === 0 && dfs(v)) return true;\n    }\n    state[u] = 2;\n    return false;\n  };\n  for (let i = 0; i < input.n; i++) if (!state[i] && dfs(i)) return true;\n  return false;\n}",
    "sampleInput": "{\"n\":2,\"edges\":[[0,1],[1,0]]}",
    "humanInput": "n = 2\nedges = [[0,1],[1,0]]",
    "sampleOutput": "true",
    "sheetNumber": 132,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-detect-cycle-in-undirected-directed-graph",
    "source": "sheet"
  },
  {
    "id": "bc-133-course-schedule",
    "title": "Course Schedule",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Can finish all courses? (cycle check).",
    "description": "<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p>\n\n<ul>\n\t<li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>\n</ul>\n\n<p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0],[0,1]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numCourses &lt;= 2000</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>\n\t<li>All the pairs prerequisites[i] are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "course-schedule",
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
    "entryFunction": "canFinish",
    "examples": [
      {
        "input": "numCourses = 2\nprerequisites = [[1,0]]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Topological Kahn",
      "Indegree count"
    ],
    "starterCode": "var canFinish = function (numCourses, prerequisites) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var canFinish = function (numCourses, prerequisites) {\n\n\n  const indeg = Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (!indeg[i]) q.push(i);\n  let seen = 0;\n  while (q.length) {\n    const u = q.shift(); seen++;\n    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n  }\n  return seen === numCourses;\n\n\n};",
    "sampleInput": "{\"numCourses\":2,\"prerequisites\":[[1,0]]}",
    "humanInput": "numCourses = 2\nprerequisites = [[1,0]]",
    "sampleOutput": "true",
    "sheetNumber": 133,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-detect-cycle-in-undirected-directed-graph",
    "source": "sheet"
  },
  {
    "id": "bc-134-course-schedule-ii",
    "title": "Course Schedule II",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Course schedule II: topological order.",
    "description": "<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p>\n\n<ul>\n\t<li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>\n</ul>\n\n<p>Return <em>the ordering of courses you should take to finish all courses</em>. If there are many valid answers, return <strong>any</strong> of them. If it is impossible to finish all courses, return <strong>an empty array</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\n<strong>Output:</strong> [0,2,1,3]\n<strong>Explanation:</strong> There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.\nSo one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 1, prerequisites = []\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numCourses &lt;= 2000</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= numCourses * (numCourses - 1)</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>\n\t<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>\n\t<li>All the pairs <code>[a<sub>i</sub>, b<sub>i</sub>]</code> are <strong>distinct</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "course-schedule-ii",
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
    "entryFunction": "findOrder",
    "examples": [
      {
        "input": "numCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        "output": "[0,1,2,3]"
      }
    ],
    "patternHints": [
      "Kahn BFS",
      "Return order"
    ],
    "starterCode": "var findOrder = function (numCourses, prerequisites) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findOrder = function (numCourses, prerequisites) {\n\n\n  const indeg = Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (!indeg[i]) q.push(i);\n  const order = [];\n  while (q.length) {\n    const u = q.shift(); order.push(u);\n    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n  }\n  return order.length === numCourses ? order : [];\n\n\n};",
    "sampleInput": "{\"numCourses\":4,\"prerequisites\":[[1,0],[2,0],[3,1],[3,2]]}",
    "humanInput": "numCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]",
    "sampleOutput": "[\n  0,\n  1,\n  2,\n  3\n]",
    "sheetNumber": 134,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-detect-cycle-in-undirected-directed-graph",
    "source": "sheet"
  },
  {
    "id": "bc-135-find-eventual-safe-states",
    "title": "Find Eventual Safe States",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Find all eventual safe states.",
    "description": "<p>There is a directed graph of <code>n</code> nodes with each node labeled from <code>0</code> to <code>n - 1</code>. The graph is represented by a <strong>0-indexed</strong> 2D integer array <code>graph</code> where <code>graph[i]</code> is an integer array of nodes adjacent to node <code>i</code>, meaning there is an edge from node <code>i</code> to each node in <code>graph[i]</code>.</p>\n\n<p>A node is a <strong>terminal node</strong> if there are no outgoing edges. A node is a <strong>safe node</strong> if every possible path starting from that node leads to a <strong>terminal node</strong> (or another safe node).</p>\n\n<p>Return <em>an array containing all the <strong>safe nodes</strong> of the graph</em>. The answer should be sorted in <strong>ascending</strong> order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"Illustration of graph\" src=\"https://s3-lc-upload.s3.amazonaws.com/uploads/2018/03/17/picture1.png\" style=\"height: 171px; width: 600px;\" />\n<pre>\n<strong>Input:</strong> graph = [[1,2],[2,3],[5],[0],[5],[],[]]\n<strong>Output:</strong> [2,4,5,6]\n<strong>Explanation:</strong> The given graph is shown above.\nNodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.\nEvery path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]\n<strong>Output:</strong> [4]\n<strong>Explanation:</strong>\nOnly node 4 is a terminal node, and every path starting at node 4 leads to node 4.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == graph.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= graph[i].length &lt;= n</code></li>\n\t<li><code>0 &lt;= graph[i][j] &lt;= n - 1</code></li>\n\t<li><code>graph[i]</code> is sorted in a strictly increasing order.</li>\n\t<li>The graph may contain self-loops.</li>\n\t<li>The number of edges in the graph will be in the range <code>[1, 4 * 10<sup>4</sup>]</code>.</li>\n</ul>\n",
    "leetcodeSlug": "find-eventual-safe-states",
    "leetcodeUrl": "https://leetcode.com/problems/find-eventual-safe-states/",
    "examples": [
      {
        "input": "n = 7\nedges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]",
        "output": "[]"
      }
    ],
    "patternHints": [
      "Reverse graph",
      "Nodes with outdegree 0"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, edges } = input;\n  const adj = Array.from({ length: n }, () => []);\n  for (const [a, b] of edges) adj[b].push(a);\n  const indeg = Array(n).fill(0);\n  for (let u = 0; u < n; u++) for (const v of adj[u]) indeg[v]++;\n  const q = [];\n  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);\n  const safe = [];\n  while (q.length) { const u = q.shift(); safe.push(u); for (const v of adj[u]) if (--indeg[v] === 0) q.push(v); }\n  return safe.sort((a, b) => a - b);\n}",
    "sampleInput": "{\"n\":7,\"edges\":[[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]}",
    "humanInput": "n = 7\nedges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]",
    "sampleOutput": "[]",
    "sheetNumber": 135,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-detect-cycle-in-undirected-directed-graph",
    "source": "sheet"
  },
  {
    "id": "bc-136-alien-dictionary",
    "title": "Alien Dictionary",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "hard",
    "statement": "Alien dictionary order of characters.",
    "leetcodeSlug": "alien-dictionary",
    "leetcodeUrl": "https://leetcode.com/problems/alien-dictionary/",
    "entryFunction": "alienOrder",
    "patternHints": [
      "Topological sort",
      "Build graph from words"
    ],
    "starterCode": "var alienOrder = function (words) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var alienOrder = function (words) {\n\n\n  const adj = new Map();\n  const indeg = new Map();\n  const add = (c) => { if (!adj.has(c)) { adj.set(c, new Set()); indeg.set(c, 0); } };\n  for (const w of words) for (const c of w) add(c);\n  for (let i = 0; i < words.length - 1; i++) {\n    const a = words[i], b = words[i + 1];\n    for (let j = 0; j < Math.min(a.length, b.length); j++) {\n      if (a[j] !== b[j]) { adj.get(a[j]).add(b[j]); indeg.set(b[j], indeg.get(b[j]) + 1); break; }\n    }\n  }\n  const q = [...indeg.entries()].filter(([, d]) => !d).map(([c]) => c);\n  let order = '';\n  while (q.length) {\n    const c = q.shift();\n    order += c;\n    for (const nxt of adj.get(c)) {\n      const d = indeg.get(nxt) - 1;\n      indeg.set(nxt, d);\n      if (d === 0) q.push(nxt);\n    }\n  }\n  return order.length === indeg.size ? order : '';\n\n\n};",
    "sampleInput": "{\"words\":[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]}",
    "humanInput": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
    "sheetNumber": 136,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-detect-cycle-in-undirected-directed-graph",
    "source": "sheet"
  },
  {
    "id": "bc-137-network-delay-time",
    "title": "Network Delay Time",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Network delay time (Dijkstra).",
    "description": "<p>You are given a network of <code>n</code> nodes, labeled from <code>1</code> to <code>n</code>. You are also given <code>times</code>, a list of travel times as directed edges <code>times[i] = (u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>)</code>, where <code>u<sub>i</sub></code> is the source node, <code>v<sub>i</sub></code> is the target node, and <code>w<sub>i</sub></code> is the time it takes for a signal to travel from source to target.</p>\n\n<p>We will send a signal from a given node <code>k</code>. Return <em>the <strong>minimum</strong> time it takes for all the</em> <code>n</code> <em>nodes to receive the signal</em>. If it is impossible for all the <code>n</code> nodes to receive the signal, return <code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png\" style=\"width: 217px; height: 239px;\" />\n<pre>\n<strong>Input:</strong> times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> times = [[1,2,1]], n = 2, k = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> times = [[1,2,1]], n = 2, k = 2\n<strong>Output:</strong> -1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 100</code></li>\n\t<li><code>1 &lt;= times.length &lt;= 6000</code></li>\n\t<li><code>times[i].length == 3</code></li>\n\t<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>\n\t<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>\n\t<li><code>0 &lt;= w<sub>i</sub> &lt;= 100</code></li>\n\t<li>All the pairs <code>(u<sub>i</sub>, v<sub>i</sub>)</code> are <strong>unique</strong>. (i.e., no multiple edges.)</li>\n</ul>\n",
    "leetcodeSlug": "network-delay-time",
    "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
    "entryFunction": "networkDelayTime",
    "examples": [
      {
        "input": "times = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2",
        "output": "2"
      }
    ],
    "patternHints": [
      "Min heap relax",
      "Max distance"
    ],
    "starterCode": "var networkDelayTime = function (times, n, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var networkDelayTime = function (times, n, k) {\n\n\n  const dist = Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n  for (let t = 0; t < n; t++) for (const [u, v, w] of times) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n  const ans = Math.max(...dist.slice(1));\n  return ans === Infinity ? -1 : ans;\n\n\n};",
    "sampleInput": "{\"times\":[[2,1,1],[2,3,1],[3,4,1]],\"n\":4,\"k\":2}",
    "humanInput": "times = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2",
    "sampleOutput": "2",
    "sheetNumber": 137,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-dijkstra-s-algorithm-sssp",
    "source": "sheet"
  },
  {
    "id": "bc-138-shortest-path-in-binary-matrix",
    "title": "Shortest Path in Binary Matrix",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Shortest path in binary matrix.",
    "description": "<p>Given an <code>n x n</code> binary matrix <code>grid</code>, return <em>the length of the shortest <strong>clear path</strong> in the matrix</em>. If there is no clear path, return <code>-1</code>.</p>\n\n<p>A <strong>clear path</strong> in a binary matrix is a path from the <strong>top-left</strong> cell (i.e., <code>(0, 0)</code>) to the <strong>bottom-right</strong> cell (i.e., <code>(n - 1, n - 1)</code>) such that:</p>\n\n<ul>\n\t<li>All the visited cells of the path are <code>0</code>.</li>\n\t<li>All the adjacent cells of the path are <strong>8-directionally</strong> connected (i.e., they are different and they share an edge or a corner).</li>\n</ul>\n\n<p>The <strong>length of a clear path</strong> is the number of visited cells of this path.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/example1_1.png\" style=\"width: 500px; height: 234px;\" />\n<pre>\n<strong>Input:</strong> grid = [[0,1],[1,0]]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/example2_1.png\" style=\"height: 216px; width: 500px;\" />\n<pre>\n<strong>Input:</strong> grid = [[0,0,0],[1,1,0],[1,1,0]]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[1,0,0],[1,1,0],[1,1,0]]\n<strong>Output:</strong> -1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= n &lt;= 100</code></li>\n\t<li><code>grid[i][j] is 0 or 1</code></li>\n</ul>\n",
    "leetcodeSlug": "shortest-path-in-binary-matrix",
    "leetcodeUrl": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    "entryFunction": "shortestPathBinaryMatrix",
    "examples": [
      {
        "input": "grid = [[0,1],[1,0]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "8-dir BFS",
      "Avoid 1 cells"
    ],
    "starterCode": "var shortestPathBinaryMatrix = function (grid) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var shortestPathBinaryMatrix = function (grid) {\n\n\n  const n = grid.length;\n  if (grid[0][0] || grid[n - 1][n - 1]) return -1;\n  const q = [[0, 0, 1]];\n  grid[0][0] = 1;\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j, d] = q[qi];\n    if (i === n - 1 && j === n - 1) return d;\n    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {\n      if (!di && !dj) continue;\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < n && nj >= 0 && nj < n && !grid[ni][nj]) { grid[ni][nj] = 1; q.push([ni, nj, d + 1]); }\n    }\n  }\n  return -1;\n\n\n};",
    "sampleInput": "{\"grid\":[[0,1],[1,0]]}",
    "humanInput": "grid = [[0,1],[1,0]]",
    "sampleOutput": "2",
    "sheetNumber": 138,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-dijkstra-s-algorithm-sssp",
    "source": "sheet"
  },
  {
    "id": "bc-139-path-with-minimum-effort",
    "title": "Path With Minimum Effort",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Minimum effort path in heights grid.",
    "description": "<p>You are a hiker preparing for an upcoming hike. You are given <code>heights</code>, a 2D array of size <code>rows x columns</code>, where <code>heights[row][col]</code> represents the height of cell <code>(row, col)</code>. You are situated in the top-left cell, <code>(0, 0)</code>, and you hope to travel to the bottom-right cell, <code>(rows-1, columns-1)</code> (i.e.,&nbsp;<strong>0-indexed</strong>). You can move <strong>up</strong>, <strong>down</strong>, <strong>left</strong>, or <strong>right</strong>, and you wish to find a route that requires the minimum <strong>effort</strong>.</p>\n\n<p>A route&#39;s <strong>effort</strong> is the <strong>maximum absolute difference</strong><strong> </strong>in heights between two consecutive cells of the route.</p>\n\n<p>Return <em>the minimum <strong>effort</strong> required to travel from the top-left cell to the bottom-right cell.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/04/ex1.png\" style=\"width: 300px; height: 300px;\" /></p>\n\n<pre>\n<strong>Input:</strong> heights = [[1,2,2],[3,8,2],[5,3,5]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.\nThis is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/04/ex2.png\" style=\"width: 300px; height: 300px;\" /></p>\n\n<pre>\n<strong>Input:</strong> heights = [[1,2,3],[3,8,4],[5,3,5]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/04/ex3.png\" style=\"width: 300px; height: 300px;\" />\n<pre>\n<strong>Input:</strong> heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> This route does not require any effort.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>rows == heights.length</code></li>\n\t<li><code>columns == heights[i].length</code></li>\n\t<li><code>1 &lt;= rows, columns &lt;= 100</code></li>\n\t<li><code>1 &lt;= heights[i][j] &lt;= 10<sup>6</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "path-with-minimum-effort",
    "leetcodeUrl": "https://leetcode.com/problems/path-with-minimum-effort/",
    "entryFunction": "minimumEffortPath",
    "examples": [
      {
        "input": "heights = [[1,2,2],[3,8,2],[5,3,5]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Dijkstra on effort",
      "Max step diff"
    ],
    "starterCode": "var minimumEffortPath = function (heights) {\n\n  // TODO\n\n};",
    "solutionCode": "var minimumEffortPath = function (heights) {\n\n  const h = heights;\n  const m = h.length, n = h[0].length;\n  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));\n  dist[0][0] = 0;\n  const pq = [[0, 0, 0]];\n  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [eff, i, j] = pq.shift();\n    if (i === m - 1 && j === n - 1) return eff;\n    if (eff > dist[i][j]) continue;\n    for (const [di, dj] of dirs) {\n      const ni = i + di, nj = j + dj;\n      if (ni < 0 || nj < 0 || ni >= m || nj >= n) continue;\n      const ne = Math.max(eff, Math.abs(h[ni][nj] - h[i][j]));\n      if (ne < dist[ni][nj]) { dist[ni][nj] = ne; pq.push([ne, ni, nj]); }\n    }\n  }\n  return dist[m - 1][n - 1];\n\n};",
    "sampleInput": "{\"heights\":[[1,2,2],[3,8,2],[5,3,5]]}",
    "humanInput": "heights = [[1,2,2],[3,8,2],[5,3,5]]",
    "sampleOutput": "2",
    "sheetNumber": 139,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-dijkstra-s-algorithm-sssp",
    "source": "sheet"
  },
  {
    "id": "bc-140-cheapest-flights-within-k-stops",
    "title": "Cheapest Flights Within K Stops",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Cheapest flights within k stops.",
    "description": "<p>There are <code>n</code> cities connected by some number of flights. You are given an array <code>flights</code> where <code>flights[i] = [from<sub>i</sub>, to<sub>i</sub>, price<sub>i</sub>]</code> indicates that there is a flight from city <code>from<sub>i</sub></code> to city <code>to<sub>i</sub></code> with cost <code>price<sub>i</sub></code>.</p>\n\n<p>You are also given three integers <code>src</code>, <code>dst</code>, and <code>k</code>, return <em><strong>the cheapest price</strong> from </em><code>src</code><em> to </em><code>dst</code><em> with at most </em><code>k</code><em> stops. </em>If there is no such route, return<em> </em><code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-3drawio.png\" style=\"width: 332px; height: 392px;\" />\n<pre>\n<strong>Input:</strong> n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1\n<strong>Output:</strong> 700\n<strong>Explanation:</strong>\nThe graph is shown above.\nThe optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.\nNote that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-1drawio.png\" style=\"width: 332px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1\n<strong>Output:</strong> 200\n<strong>Explanation:</strong>\nThe graph is shown above.\nThe optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-2drawio.png\" style=\"width: 332px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0\n<strong>Output:</strong> 500\n<strong>Explanation:</strong>\nThe graph is shown above.\nThe optimal path with no stops from city 0 to 2 is marked in red and has cost 500.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= n &lt;= 100</code></li>\n\t<li><code>0 &lt;= flights.length &lt;= (n * (n - 1) / 2)</code></li>\n\t<li><code>flights[i].length == 3</code></li>\n\t<li><code>0 &lt;= from<sub>i</sub>, to<sub>i</sub> &lt; n</code></li>\n\t<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>\n\t<li><code>1 &lt;= price<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n\t<li>There will not be any multiple flights between two cities.</li>\n\t<li><code>0 &lt;= src, dst, k &lt; n</code></li>\n\t<li><code>src != dst</code></li>\n</ul>\n",
    "leetcodeSlug": "cheapest-flights-within-k-stops",
    "leetcodeUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "entryFunction": "findCheapestPrice",
    "examples": [
      {
        "input": "n = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1",
        "output": "200"
      }
    ],
    "patternHints": [
      "Bellman-Ford k+1",
      "Relax edges"
    ],
    "starterCode": "var findCheapestPrice = function (n, flights, src, dst, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findCheapestPrice = function (n, flights, src, dst, k) {\n\n\n  let dist = Array(n).fill(Infinity);\n  dist[src] = 0;\n  for (let i = 0; i <= k; i++) {\n    const nd = dist.slice();\n    for (const [u, v, w] of flights) if (dist[u] + w < nd[v]) nd[v] = dist[u] + w;\n    dist = nd;\n  }\n  return dist[dst] === Infinity ? -1 : dist[dst];\n\n\n};",
    "sampleInput": "{\"n\":3,\"flights\":[[0,1,100],[1,2,100],[0,2,500]],\"src\":0,\"dst\":2,\"k\":1}",
    "humanInput": "n = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1",
    "sampleOutput": "200",
    "sheetNumber": 140,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-dijkstra-s-algorithm-sssp",
    "source": "sheet"
  },
  {
    "id": "bc-141-min-cost-to-connect-all-points",
    "title": "Min Cost to Connect All Points",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Min cost to connect all points (MST).",
    "description": "<p>You are given an array <code>points</code> representing integer coordinates of some points on a 2D-plane, where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>.</p>\n\n<p>The cost of connecting two points <code>[x<sub>i</sub>, y<sub>i</sub>]</code> and <code>[x<sub>j</sub>, y<sub>j</sub>]</code> is the <strong>manhattan distance</strong> between them: <code>|x<sub>i</sub> - x<sub>j</sub>| + |y<sub>i</sub> - y<sub>j</sub>|</code>, where <code>|val|</code> denotes the absolute value of <code>val</code>.</p>\n\n<p>Return <em>the minimum cost to make all points connected.</em> All points are connected if there is <strong>exactly one</strong> simple path between any two points.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/26/d.png\" style=\"width: 214px; height: 268px;\" />\n<pre>\n<strong>Input:</strong> points = [[0,0],[2,2],[3,10],[5,2],[7,0]]\n<strong>Output:</strong> 20\n<strong>Explanation:</strong> \n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/26/c.png\" style=\"width: 214px; height: 268px;\" />\nWe can connect the points as shown above to get the minimum cost of 20.\nNotice that there is a unique path between every pair of points.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[3,12],[-2,5],[-4,1]]\n<strong>Output:</strong> 18\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= points.length &lt;= 1000</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>6</sup></code></li>\n\t<li>All pairs <code>(x<sub>i</sub>, y<sub>i</sub>)</code> are distinct.</li>\n</ul>\n",
    "leetcodeSlug": "min-cost-to-connect-all-points",
    "leetcodeUrl": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    "entryFunction": "minCostConnectPoints",
    "examples": [
      {
        "input": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
        "output": "20"
      }
    ],
    "patternHints": [
      "Prim or Kruskal",
      "Manhattan edges"
    ],
    "starterCode": "var minCostConnectPoints = function (points) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minCostConnectPoints = function (points) {\n\n\n  const pts = points;\n  const n = pts.length;\n  const dist = (i, j) => Math.abs(pts[i][0] - pts[j][0]) + Math.abs(pts[i][1] - pts[j][1]);\n  const inMST = Array(n).fill(false);\n  const minD = Array(n).fill(Infinity);\n  minD[0] = 0;\n  let cost = 0;\n  for (let t = 0; t < n; t++) {\n    let u = -1;\n    for (let i = 0; i < n; i++) if (!inMST[i] && (u === -1 || minD[i] < minD[u])) u = i;\n    inMST[u] = true; cost += minD[u];\n    for (let v = 0; v < n; v++) if (!inMST[v]) minD[v] = Math.min(minD[v], dist(u, v));\n  }\n  return cost;\n\n\n};",
    "sampleInput": "{\"points\":[[0,0],[2,2],[3,10],[5,2],[7,0]]}",
    "humanInput": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
    "sampleOutput": "20",
    "sheetNumber": 141,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-prim-s-kruskal-s-mst",
    "source": "sheet"
  },
  {
    "id": "bc-142-find-critical-and-pseudo-critical-edges-in-minim",
    "title": "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "hard",
    "statement": "Find critical and pseudo-critical edges in MST.",
    "description": "<p>Given a weighted undirected connected graph with <code>n</code>&nbsp;vertices numbered from <code>0</code> to <code>n - 1</code>,&nbsp;and an array <code>edges</code>&nbsp;where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>, weight<sub>i</sub>]</code> represents a bidirectional and weighted edge between nodes&nbsp;<code>a<sub>i</sub></code>&nbsp;and <code>b<sub>i</sub></code>. A minimum spanning tree (MST) is a subset of the graph&#39;s edges that connects all vertices without cycles&nbsp;and with the minimum possible total edge weight.</p>\n\n<p>Find <em>all the critical and pseudo-critical edges in the given graph&#39;s minimum spanning tree (MST)</em>. An MST edge whose deletion from the graph would cause the MST weight to increase is called a&nbsp;<em>critical edge</em>. On&nbsp;the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.</p>\n\n<p>Note that you can return the indices of the edges in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/06/04/ex1.png\" style=\"width: 259px; height: 262px;\" /></p>\n\n<pre>\n<strong>Input:</strong> n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]\n<strong>Output:</strong> [[0,1],[2,3,4,5]]\n<strong>Explanation:</strong> The figure above describes the graph.\nThe following figure shows all the possible MSTs:\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/06/04/msts.png\" style=\"width: 540px; height: 553px;\" />\nNotice that the two edges 0 and 1 appear in all MSTs, therefore they are critical edges, so we return them in the first list of the output.\nThe edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are considered pseudo-critical edges. We add them to the second list of the output.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/06/04/ex2.png\" style=\"width: 247px; height: 253px;\" /></p>\n\n<pre>\n<strong>Input:</strong> n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]\n<strong>Output:</strong> [[],[0,1,2,3]]\n<strong>Explanation:</strong> We can observe that since all 4 edges have equal weight, choosing any 3 edges from the given 4 will yield an MST. Therefore all 4 edges are pseudo-critical.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= n &lt;= 100</code></li>\n\t<li><code>1 &lt;= edges.length &lt;= min(200, n * (n - 1) / 2)</code></li>\n\t<li><code>edges[i].length == 3</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub> &lt; b<sub>i</sub> &lt; n</code></li>\n\t<li><code>1 &lt;= weight<sub>i</sub>&nbsp;&lt;= 1000</code></li>\n\t<li>All pairs <code>(a<sub>i</sub>, b<sub>i</sub>)</code> are <strong>distinct</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree",
    "leetcodeUrl": "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/",
    "entryFunction": "findCriticalAndPseudoCriticalEdges",
    "examples": [
      {
        "input": "n = 4\nedges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]",
        "output": "[[],[0,1,2,3]]"
      }
    ],
    "patternHints": [
      "Kruskal with special edges",
      "Compare MST weight"
    ],
    "starterCode": "var findCriticalAndPseudoCriticalEdges = function (n, edges) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findCriticalAndPseudoCriticalEdges = function (n, edges) {\n\n\n  const kruskal = (filter) => {\n    const parent = Array.from({ length: n }, (_, i) => i);\n    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n    let cost = 0, used = 0;\n    const es = edges.map((e, i) => [...e, i]).filter(filter).sort((a, b) => a[2] - b[2]);\n    for (const [u, v, w] of es) {\n      if (find(u) !== find(v)) { parent[find(u)] = find(v); cost += w; used++; }\n    }\n    return used === n - 1 ? cost : Infinity;\n  };\n  const base = kruskal(() => true);\n  const critical = [], pseudo = [];\n  for (let i = 0; i < edges.length; i++) {\n    if (kruskal((_, idx) => idx !== i) > base) critical.push(i);\n    else if (kruskal((_, idx) => idx === i || true) <= base) pseudo.push(i);\n  }\n  return [critical, pseudo];\n\n\n};",
    "sampleInput": "{\"n\":4,\"edges\":[[0,1,1],[1,2,1],[2,3,1],[0,3,1]]}",
    "humanInput": "n = 4\nedges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]",
    "sampleOutput": "[\n  [],\n  [\n    0,\n    1,\n    2,\n    3\n  ]\n]",
    "sheetNumber": 142,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-prim-s-kruskal-s-mst",
    "source": "sheet"
  },
  {
    "id": "bc-143-connecting-cities-with-minimum-cost",
    "title": "Connecting Cities With Minimum Cost",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Connecting cities with minimum cost (MST).",
    "leetcodeSlug": "connecting-cities-with-minimum-cost",
    "leetcodeUrl": "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
    "entryFunction": "minimumCost",
    "examples": [
      {
        "input": "n = 3\nconnections = [[1,2,5],[1,3,6],[2,3,1]]",
        "output": "6"
      }
    ],
    "patternHints": [
      "Kruskal union-find",
      "Sort edges"
    ],
    "starterCode": "var minimumCost = function (n, connections) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minimumCost = function (n, connections) {\n\n\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  let cost = 0, used = 0;\n  for (const [u, v, w] of connections.sort((a, b) => a[2] - b[2])) {\n    if (find(u) !== find(v)) { parent[find(u)] = find(v); cost += w; used++; }\n  }\n  return used === n - 1 ? cost : -1;\n\n\n};",
    "sampleInput": "{\"n\":3,\"connections\":[[1,2,5],[1,3,6],[2,3,1]]}",
    "humanInput": "n = 3\nconnections = [[1,2,5],[1,3,6],[2,3,1]]",
    "sampleOutput": "6",
    "sheetNumber": 143,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-prim-s-kruskal-s-mst",
    "source": "sheet"
  },
  {
    "id": "bc-144-course-schedule-iv",
    "title": "Course Schedule IV",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Course schedule IV: prerequisite queries.",
    "description": "<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>a<sub>i</sub></code> first if you want to take course <code>b<sub>i</sub></code>.</p>\n\n<ul>\n\t<li>For example, the pair <code>[0, 1]</code> indicates that you have to take course <code>0</code> before you can take course <code>1</code>.</li>\n</ul>\n\n<p>Prerequisites can also be <strong>indirect</strong>. If course <code>a</code> is a prerequisite of course <code>b</code>, and course <code>b</code> is a prerequisite of course <code>c</code>, then course <code>a</code> is a prerequisite of course <code>c</code>.</p>\n\n<p>You are also given an array <code>queries</code> where <code>queries[j] = [u<sub>j</sub>, v<sub>j</sub>]</code>. For the <code>j<sup>th</sup></code> query, you should answer whether course <code>u<sub>j</sub></code> is a prerequisite of course <code>v<sub>j</sub></code> or not.</p>\n\n<p>Return <i>a boolean array </i><code>answer</code><i>, where </i><code>answer[j]</code><i> is the answer to the </i><code>j<sup>th</sup></code><i> query.</i></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/05/01/courses4-1-graph.jpg\" style=\"width: 222px; height: 62px;\" />\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]\n<strong>Output:</strong> [false,true]\n<strong>Explanation:</strong> The pair [1, 0] indicates that you have to take course 1 before you can take course 0.\nCourse 0 is not a prerequisite of course 1, but the opposite is true.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]\n<strong>Output:</strong> [false,false]\n<strong>Explanation:</strong> There are no prerequisites, and each course is independent.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/05/01/courses4-3-graph.jpg\" style=\"width: 222px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]\n<strong>Output:</strong> [true,true]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= numCourses &lt;= 100</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= (numCourses * (numCourses - 1) / 2)</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= numCourses - 1</code></li>\n\t<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>\n\t<li>All the pairs <code>[a<sub>i</sub>, b<sub>i</sub>]</code> are <strong>unique</strong>.</li>\n\t<li>The prerequisites graph has no cycles.</li>\n\t<li><code>1 &lt;= queries.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= numCourses - 1</code></li>\n\t<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>\n</ul>\n",
    "leetcodeSlug": "course-schedule-iv",
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule-iv/",
    "entryFunction": "checkIfPrerequisite",
    "examples": [
      {
        "input": "numCourses = 2\nprerequisites = [[1,0]]\nqueries = [[0,1],[1,0]]",
        "output": "[true,false]"
      }
    ],
    "patternHints": [
      "Floyd or reachability",
      "DFS memo"
    ],
    "starterCode": "var checkIfPrerequisite = function (numCourses, prerequisites, queries) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var checkIfPrerequisite = function (numCourses, prerequisites, queries) {\n\n\n  const reach = Array.from({ length: numCourses }, () => Array(numCourses).fill(false));\n  for (let i = 0; i < numCourses; i++) reach[i][i] = true;\n  for (const [a, b] of prerequisites) reach[b][a] = true;\n  for (let k = 0; k < numCourses; k++) for (let i = 0; i < numCourses; i++) for (let j = 0; j < numCourses; j++) reach[i][j] ||= reach[i][k] && reach[k][j];\n  return queries.map(([u, v]) => reach[u][v]);\n\n\n};",
    "sampleInput": "{\"numCourses\":2,\"prerequisites\":[[1,0]],\"queries\":[[0,1],[1,0]]}",
    "humanInput": "numCourses = 2\nprerequisites = [[1,0]]\nqueries = [[0,1],[1,0]]",
    "sampleOutput": "[\n  true,\n  false\n]",
    "sheetNumber": 144,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-floyd-warshall-apsp",
    "source": "sheet"
  },
  {
    "id": "bc-145-find-the-city-with-the-smallest-number-of-neighb",
    "title": "Find the City With the Smallest Number of Neighbors at a...",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "City with smallest reachable count within threshold.",
    "examples": [
      {
        "input": "n = 4\nedges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]]\ndistanceThreshold = 4",
        "output": "3"
      }
    ],
    "patternHints": [
      "Floyd distances",
      "Count neighbors"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, edges, distanceThreshold } = input;\n  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));\n  for (let i = 0; i < n; i++) dist[i][i] = 0;\n  for (const [u, v, w] of edges) { dist[u][v] = w; dist[v][u] = w; }\n  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n  let bestCity = -1, bestCount = Infinity;\n  for (let i = 0; i < n; i++) {\n    const c = dist[i].filter((d) => d <= distanceThreshold).length - 1;\n    if (c <= bestCount) { bestCount = c; bestCity = i; }\n  }\n  return bestCity;\n}",
    "sampleInput": "{\"n\":4,\"edges\":[[0,1,3],[1,2,1],[2,3,4],[0,3,5]],\"distanceThreshold\":4}",
    "humanInput": "n = 4\nedges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]]\ndistanceThreshold = 4",
    "sampleOutput": "3",
    "sheetNumber": 145,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-floyd-warshall-apsp",
    "source": "sheet"
  },
  {
    "id": "bc-146-number-of-ways-to-arrive-at-destination",
    "title": "Number of Ways to Arrive at Destination",
    "patternSlug": "graph-bfs",
    "patternName": "Graphs",
    "difficulty": "medium",
    "statement": "Number of ways to arrive at destination mod 1e9+7.",
    "description": "<p>You are in a city that consists of <code>n</code> intersections numbered from <code>0</code> to <code>n - 1</code> with <strong>bi-directional</strong> roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.</p>\n\n<p>You are given an integer <code>n</code> and a 2D integer array <code>roads</code> where <code>roads[i] = [u<sub>i</sub>, v<sub>i</sub>, time<sub>i</sub>]</code> means that there is a road between intersections <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code> that takes <code>time<sub>i</sub></code> minutes to travel. You want to know in how many ways you can travel from intersection <code>0</code> to intersection <code>n - 1</code> in the <strong>shortest amount of time</strong>.</p>\n\n<p>Return <em>the <strong>number of ways</strong> you can arrive at your destination in the <strong>shortest amount of time</strong></em>. Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2025/02/14/1976_corrected.png\" style=\"width: 255px; height: 400px;\" />\n<pre>\n<strong>Input:</strong> n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.\nThe four ways to get there in 7 minutes are:\n- 0 ➝ 6\n- 0 ➝ 4 ➝ 6\n- 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6\n- 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2, roads = [[1,0,10]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n\t<li><code>n - 1 &lt;= roads.length &lt;= n * (n - 1) / 2</code></li>\n\t<li><code>roads[i].length == 3</code></li>\n\t<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>\n\t<li><code>1 &lt;= time<sub>i</sub> &lt;= 10<sup>9</sup></code></li>\n\t<li><code>u<sub>i </sub>!= v<sub>i</sub></code></li>\n\t<li>There is at most one road connecting any two intersections.</li>\n\t<li>You can reach any intersection from any other intersection.</li>\n</ul>\n",
    "leetcodeSlug": "number-of-ways-to-arrive-at-destination",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
    "entryFunction": "countPaths",
    "examples": [
      {
        "input": "n = 7\nroads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]]\ntime = 7",
        "output": "1"
      }
    ],
    "patternHints": [
      "Dijkstra + count paths",
      "Same shortest dist"
    ],
    "starterCode": "var countPaths = function (n, roads) {\n\n  // TODO\n\n};",
    "solutionCode": "var countPaths = function (n, roads) {\n\n  const mod = 1e9 + 7;\n  const adj = Array.from({ length: n }, () => []);\n  for (const [u, v, w] of roads) { adj[u].push([v, w]); adj[v].push([u, w]); }\n  const dist = Array(n).fill(Infinity), ways = Array(n).fill(0);\n  dist[0] = 0; ways[0] = 1;\n  const pq = [[0, 0]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (d > dist[u]) continue;\n    for (const [v, w] of adj[u]) {\n      const nd = d + w;\n      if (nd < dist[v]) { dist[v] = nd; ways[v] = ways[u]; pq.push([nd, v]); }\n      else if (nd === dist[v]) ways[v] = (ways[v] + ways[u]) % mod;\n    }\n  }\n  return dist[n - 1] === time ? ways[n - 1] : 0;\n\n};",
    "sampleInput": "{\"n\":7,\"roads\":[[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]],\"time\":7}",
    "humanInput": "n = 7\nroads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]]\ntime = 7",
    "sampleOutput": "1",
    "sheetNumber": 146,
    "sheetSectionId": "graphs",
    "sheetSubsectionId": "graphs-floyd-warshall-apsp",
    "source": "sheet"
  },
  {
    "id": "bc-147-non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "medium",
    "statement": "Minimum intervals to remove for non-overlap.",
    "description": "<p>Given an array of intervals <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, return <em>the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping</em>.</p>\n\n<p><strong>Note</strong> that intervals which only touch at a point are <strong>non-overlapping</strong>. For example, <code>[1, 2]</code> and <code>[2, 3]</code> are non-overlapping.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[2,3],[3,4],[1,3]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> [1,3] can be removed and the rest of the intervals are non-overlapping.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[1,2],[1,2]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> You need to remove two [1,2] to make the rest of the intervals non-overlapping.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[2,3]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> You don&#39;t need to remove any of the intervals since they&#39;re already non-overlapping.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= intervals.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>-5 * 10<sup>4</sup> &lt;= start<sub>i</sub> &lt; end<sub>i</sub> &lt;= 5 * 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "non-overlapping-intervals",
    "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
    "entryFunction": "eraseOverlapIntervals",
    "examples": [
      {
        "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        "output": "1"
      }
    ],
    "patternHints": [
      "Sort by end",
      "Greedy keep"
    ],
    "starterCode": "var eraseOverlapIntervals = function (intervals) {\n\n  // TODO\n\n};",
    "solutionCode": "var eraseOverlapIntervals = function (intervals) {\n\n  .slice().sort((a, b) => a[1] - b[1]);\n  let end = -Infinity, removed = 0;\n  for (const [s, e] of intervals) {\n    if (s >= end) end = e;\n    else removed++;\n  }\n  return removed;\n\n};",
    "sampleInput": "{\"intervals\":[[1,2],[2,3],[3,4],[1,3]]}",
    "humanInput": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
    "sampleOutput": "1",
    "sheetNumber": 147,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-148-minimum-platforms",
    "title": "Minimum Platforms",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "medium",
    "statement": "Minimum platforms for train arrivals/departures.",
    "examples": [
      {
        "input": "arrivals = [900,940,950]\ndepartures = [910,1200,1120]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Sort events",
      "Sweep line"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.arrivals.slice().sort((x, y) => x - y);\n  const d = input.departures.slice().sort((x, y) => x - y);\n  let platforms = 0, maxP = 0, i = 0, j = 0;\n  while (i < a.length) {\n    if (a[i] <= d[j]) { platforms++; i++; } else { platforms--; j++; }\n    maxP = Math.max(maxP, platforms);\n  }\n  return maxP;\n}",
    "sampleInput": "{\"arrivals\":[900,940,950],\"departures\":[910,1200,1120]}",
    "humanInput": "arrivals = [900,940,950]\ndepartures = [910,1200,1120]",
    "sampleOutput": "2",
    "sheetNumber": 148,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-149-maximize-sum-of-array-after-k-negations",
    "title": "Maximize Sum Of Array After K Negations",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "easy",
    "statement": "Maximize array sum after k negations.",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, modify the array in the following way:</p>\n\n<ul>\n\t<li>choose an index <code>i</code> and replace <code>nums[i]</code> with <code>-nums[i]</code>.</li>\n</ul>\n\n<p>You should apply this process exactly <code>k</code> times. You may choose the same index <code>i</code> multiple times.</p>\n\n<p>Return <em>the largest possible sum of the array after modifying it in this way</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,2,3], k = 1\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Choose index 1 and nums becomes [4,-2,3].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,-1,0,2], k = 3\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Choose indices (1, 2, 2) and nums becomes [3,1,0,2].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,-3,-1,5,-4], k = 2\n<strong>Output:</strong> 13\n<strong>Explanation:</strong> Choose indices (1, 4) and nums becomes [2,3,-1,5,4].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "maximize-sum-of-array-after-k-negations",
    "leetcodeUrl": "https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/",
    "entryFunction": "largestSumAfterKNegations",
    "examples": [
      {
        "input": "nums = [4,2,3]\nk = 1",
        "output": "5"
      }
    ],
    "patternHints": [
      "Sort abs values",
      "Flip smallest"
    ],
    "starterCode": "var largestSumAfterKNegations = function (nums, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var largestSumAfterKNegations = function (nums, k) {\n\n\n  const a = nums.slice().sort((x, y) => x - y);\n  for (let i = 0; i < a.length && k; i++) if (a[i] < 0) { a[i] = -a[i]; k--; }\n  if (k % 2) a.sort((x, y) => x - y), a[0] = -a[0];\n  return a.reduce((s, x) => s + x, 0);\n\n\n};",
    "sampleInput": "{\"nums\":[4,2,3],\"k\":1}",
    "humanInput": "nums = [4,2,3]\nk = 1",
    "sampleOutput": "5",
    "sheetNumber": 149,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-150-assign-mice-to-holes",
    "title": "Assign Mice to Holes",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "medium",
    "statement": "Assign mice to holes: minimum time.",
    "examples": [
      {
        "input": "mice = [1,4]\nholes = [4,-4,2]\nk = 2",
        "output": "5"
      }
    ],
    "patternHints": [
      "Sort both",
      "Match order"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const mice = input.mice.slice().sort((a, b) => a - b);\n  const holes = input.holes.slice().sort((a, b) => a - b);\n  let maxT = 0;\n  for (let i = 0; i < mice.length; i++) maxT = Math.max(maxT, Math.abs(mice[i] - holes[i]));\n  return maxT;\n}",
    "sampleInput": "{\"mice\":[1,4],\"holes\":[4,-4,2],\"k\":2}",
    "humanInput": "mice = [1,4]\nholes = [4,-4,2]\nk = 2",
    "sampleOutput": "5",
    "sheetNumber": 150,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-151-maximum-product-of-three-numbers",
    "title": "Maximum Product of Three Numbers",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "easy",
    "statement": "Maximum product of three numbers.",
    "description": "<p>Given an integer array <code>nums</code>, <em>find three numbers whose product is maximum and return the maximum product</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 6\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> 24\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [-1,-2,-3]\n<strong>Output:</strong> -6\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;=&nbsp;10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "maximum-product-of-three-numbers",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-of-three-numbers/",
    "entryFunction": "maximumProduct",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "24"
      }
    ],
    "patternHints": [
      "Sort top values",
      "Check two negatives"
    ],
    "starterCode": "var maximumProduct = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maximumProduct = function (nums) {\n\n\n  const a = nums.slice().sort((x, y) => x - y);\n  const n = a.length;\n  return Math.max(a[n - 1] * a[n - 2] * a[n - 3], a[0] * a[1] * a[n - 1]);\n\n\n};",
    "sampleInput": "{\"nums\":[1,2,3,4]}",
    "humanInput": "nums = [1,2,3,4]",
    "sampleOutput": "24",
    "sheetNumber": 151,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-152-bulb-switcher",
    "title": "Bulb Switcher",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "medium",
    "statement": "Bulb switcher: bulbs on after n rounds.",
    "description": "<p>There are <code>n</code> bulbs that are initially off. You first turn on all the bulbs, then&nbsp;you turn off every second bulb.</p>\n\n<p>On the third round, you toggle every third bulb (turning on if it&#39;s off or turning off if it&#39;s on). For the <code>i<sup>th</sup></code> round, you toggle every <code>i</code> bulb. For the <code>n<sup>th</sup></code> round, you only toggle the last bulb.</p>\n\n<p>Return <em>the number of bulbs that are on after <code>n</code> rounds</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/05/bulb.jpg\" style=\"width: 421px; height: 321px;\" />\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> At first, the three bulbs are [off, off, off].\nAfter the first round, the three bulbs are [on, on, on].\nAfter the second round, the three bulbs are [on, off, on].\nAfter the third round, the three bulbs are [on, off, off]. \nSo you should return 1 because there is only one bulb is on.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "bulb-switcher",
    "leetcodeUrl": "https://leetcode.com/problems/bulb-switcher/",
    "entryFunction": "bulbSwitch",
    "examples": [
      {
        "input": "n = 3",
        "output": "1"
      }
    ],
    "patternHints": [
      "Only perfect squares on",
      "Count sqrt(n)"
    ],
    "starterCode": "var bulbSwitch = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var bulbSwitch = function (n) {\n\n\n  return Math.floor(Math.sqrt(n));\n\n\n};",
    "sampleInput": "{\"n\":3}",
    "humanInput": "n = 3",
    "sampleOutput": "1",
    "sheetNumber": 152,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-153-candy",
    "title": "Candy",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "hard",
    "statement": "Distribute candies to children with ratings.",
    "description": "<p>There are <code>n</code> children standing in a line. Each child is assigned a rating value given in the integer array <code>ratings</code>.</p>\n\n<p>You are giving candies to these children subjected to the following requirements:</p>\n\n<ul>\n\t<li>Each child must have at least one candy.</li>\n\t<li>Children with a higher rating get more candies than their neighbors.</li>\n</ul>\n\n<p>Return <em>the minimum number of candies you need to have to distribute the candies to the children</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> ratings = [1,0,2]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> You can allocate to the first, second and third child with 2, 1, 2 candies respectively.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> ratings = [1,2,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> You can allocate to the first, second and third child with 1, 2, 1 candies respectively.\nThe third child gets 1 candy because it satisfies the above two conditions.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == ratings.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= ratings[i] &lt;= 2 * 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "candy",
    "leetcodeUrl": "https://leetcode.com/problems/candy/",
    "entryFunction": "candy",
    "patternHints": [
      "Two passes",
      "Local then global"
    ],
    "starterCode": "var candy = function (ratings) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var candy = function (ratings) {\n\n\n  const candies = Array(ratings.length).fill(1);\n  for (let i = 1; i < ratings.length; i++) if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n  for (let i = ratings.length - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n  return candies.reduce((a, b) => a + b, 0);\n\n\n};",
    "sampleInput": "{\"ratings\":[1,0,2]}",
    "humanInput": "ratings = [1,0,2]",
    "sheetNumber": 153,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-154-maximum-swap",
    "title": "Maximum Swap",
    "patternSlug": "greedy",
    "patternName": "Greedy",
    "difficulty": "medium",
    "statement": "Maximum swap once on num string.",
    "description": "<p>You are given an integer <code>num</code>. You can swap two digits at most once to get the maximum valued number.</p>\n\n<p>Return <em>the maximum valued number you can get</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 2736\n<strong>Output:</strong> 7236\n<strong>Explanation:</strong> Swap the number 2 and the number 7.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 9973\n<strong>Output:</strong> 9973\n<strong>Explanation:</strong> No swap.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= num &lt;= 10<sup>8</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "maximum-swap",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-swap/",
    "entryFunction": "maximumSwap",
    "examples": [
      {
        "input": "num = 2736",
        "output": "7236"
      }
    ],
    "patternHints": [
      "Find max suffix",
      "Swap first smaller"
    ],
    "starterCode": "var maximumSwap = function (num) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maximumSwap = function (num) {\n\n\n  const s = String(num).split('');\n  const last = Array(10).fill(-1);\n  for (let i = 0; i < s.length; i++) last[+s[i]] = i;\n  for (let i = 0; i < s.length; i++) {\n    for (let d = 9; d > +s[i]; d--) if (last[d] > i) { [s[i], s[last[d]]] = [s[last[d]], s[i]]; return +s.join(''); }\n  }\n  return num;\n\n\n};",
    "sampleInput": "{\"num\":2736}",
    "humanInput": "num = 2736",
    "sampleOutput": "7236",
    "sheetNumber": 154,
    "sheetSectionId": "greedy",
    "sheetSubsectionId": "greedy-greedy",
    "source": "sheet"
  },
  {
    "id": "bc-155-climbing-stairs",
    "title": "Climbing Stairs",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "easy",
    "statement": "Climbing stairs: ways to reach top.",
    "description": "<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>\n\n<p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 45</code></li>\n</ul>\n",
    "leetcodeSlug": "climbing-stairs",
    "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
    "entryFunction": "climbStairs",
    "examples": [
      {
        "input": "n = 3",
        "output": "3"
      }
    ],
    "patternHints": [
      "Fibonacci DP",
      "Sum last two"
    ],
    "starterCode": "var climbStairs = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var climbStairs = function (n) {\n\n\n  let a = 1, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n\n\n};",
    "sampleInput": "{\"n\":3}",
    "humanInput": "n = 3",
    "sampleOutput": "3",
    "sheetNumber": 155,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-climbing-stairs",
    "source": "sheet"
  },
  {
    "id": "bc-156-decode-ways",
    "title": "Decode Ways",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Count ways to decode a digit string.",
    "description": "<p>You have intercepted a secret message encoded as a string of numbers. The message is <strong>decoded</strong> via the following mapping:</p>\n\n<p><code>&quot;1&quot; -&gt; &#39;A&#39;<br />\n&quot;2&quot; -&gt; &#39;B&#39;<br />\n...<br />\n&quot;25&quot; -&gt; &#39;Y&#39;<br />\n&quot;26&quot; -&gt; &#39;Z&#39;</code></p>\n\n<p>However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes (<code>&quot;2&quot;</code> and <code>&quot;5&quot;</code> vs <code>&quot;25&quot;</code>).</p>\n\n<p>For example, <code>&quot;11106&quot;</code> can be decoded into:</p>\n\n<ul>\n\t<li><code>&quot;AAJF&quot;</code> with the grouping <code>(1, 1, 10, 6)</code></li>\n\t<li><code>&quot;KJF&quot;</code> with the grouping <code>(11, 10, 6)</code></li>\n\t<li>The grouping <code>(1, 11, 06)</code> is invalid because <code>&quot;06&quot;</code> is not a valid code (only <code>&quot;6&quot;</code> is valid).</li>\n</ul>\n\n<p>Note: there may be strings that are impossible to decode.<br />\n<br />\nGiven a string s containing only digits, return the <strong>number of ways</strong> to <strong>decode</strong> it. If the entire string cannot be decoded in any valid way, return <code>0</code>.</p>\n\n<p>The test cases are generated so that the answer fits in a <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;12&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">2</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>&quot;12&quot; could be decoded as &quot;AB&quot; (1 2) or &quot;L&quot; (12).</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;226&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">3</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>&quot;226&quot; could be decoded as &quot;BZ&quot; (2 26), &quot;VF&quot; (22 6), or &quot;BBF&quot; (2 2 6).</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;06&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">0</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>&quot;06&quot; cannot be mapped to &quot;F&quot; because of the leading zero (&quot;6&quot; is different from &quot;06&quot;). In this case, the string is not a valid encoding, so return 0.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 100</code></li>\n\t<li><code>s</code> contains only digits and may contain leading zero(s).</li>\n</ul>\n",
    "leetcodeSlug": "decode-ways",
    "leetcodeUrl": "https://leetcode.com/problems/decode-ways/",
    "entryFunction": "numDecodings",
    "examples": [
      {
        "input": "s = \"12\"",
        "output": "2"
      }
    ],
    "patternHints": [
      "DP prev counts",
      "Handle 0 and 10-26"
    ],
    "starterCode": "var numDecodings = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var numDecodings = function (s) {\n\n\n  let a = 0, b = 1;\n  for (let i = 0; i < s.length; i++) {\n    let c = 0;\n    if (s[i] !== '0') c += b;\n    if (i && s.slice(i - 1, i + 1) >= '10' && s.slice(i - 1, i + 1) <= '26') c += a;\n    [a, b] = [b, c];\n  }\n  return b;\n\n\n};",
    "sampleInput": "{\"s\":\"12\"}",
    "humanInput": "s = \"12\"",
    "sampleOutput": "2",
    "sheetNumber": 156,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-climbing-stairs",
    "source": "sheet"
  },
  {
    "id": "bc-157-frog-jump",
    "title": "Frog Jump",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Frog jump: can cross stones?",
    "description": "<p>A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.</p>\n\n<p>Given a list of <code>stones</code>&nbsp;positions (in units) in sorted <strong>ascending order</strong>, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be <code>1</code> unit.</p>\n\n<p>If the frog&#39;s last jump was <code>k</code> units, its next jump must be either <code>k - 1</code>, <code>k</code>, or <code>k + 1</code> units. The frog can only jump in the forward direction.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> stones = [0,1,3,5,6,8,12,17]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> stones = [0,1,2,3,4,8,9,11]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no way to jump to the last stone as the gap between the 5th and 6th stone is too large.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= stones.length &lt;= 2000</code></li>\n\t<li><code>0 &lt;= stones[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>stones[0] == 0</code></li>\n\t<li><code>stones</code>&nbsp;is sorted in a strictly increasing order.</li>\n</ul>\n",
    "leetcodeSlug": "frog-jump",
    "leetcodeUrl": "https://leetcode.com/problems/frog-jump/",
    "entryFunction": "canCross",
    "examples": [
      {
        "input": "stones = [0,1,3,5,6,8,12,17,21,22,26,34]",
        "output": "false"
      }
    ],
    "patternHints": [
      "DFS reachable jumps",
      "Set positions"
    ],
    "starterCode": "var canCross = function (stones) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var canCross = function (stones) {\n\n\n  const set = new Set(stones);\n  const target = stones[stones.length - 1];\n  const seen = new Set(['0,1']);\n  const dfs = (pos, jump) => {\n    if (pos === target) return true;\n    const key = pos + ',' + jump;\n    if (seen.has(key)) return false;\n    seen.add(key);\n    for (const nj of [jump - 1, jump, jump + 1]) {\n      if (nj > 0 && set.has(pos + nj) && dfs(pos + nj, nj)) return true;\n    }\n    return false;\n  };\n  return dfs(0, 1);\n\n\n};",
    "sampleInput": "{\"stones\":[0,1,3,5,6,8,12,17,21,22,26,34]}",
    "humanInput": "stones = [0,1,3,5,6,8,12,17,21,22,26,34]",
    "sampleOutput": "false",
    "sheetNumber": 157,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-climbing-stairs",
    "source": "sheet"
  },
  {
    "id": "bc-158-coin-change",
    "title": "Coin Change",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Fewest coins to make amount.",
    "description": "<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>\n\n<p>Return <em>the fewest number of coins that you need to make up that amount</em>. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.</p>\n\n<p>You may assume that you have an infinite number of each kind of coin.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> coins = [1,2,5], amount = 11\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 11 = 5 + 5 + 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> coins = [2], amount = 3\n<strong>Output:</strong> -1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> coins = [1], amount = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 12</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= amount &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "coin-change",
    "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
    "entryFunction": "coinChange",
    "examples": [
      {
        "input": "coins = [1,2,5]\namount = 11",
        "output": "3"
      }
    ],
    "patternHints": [
      "DP min coins",
      "Iterate coins"
    ],
    "starterCode": "var coinChange = function (coins, amount) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var coinChange = function (coins, amount) {\n\n\n  const dp = Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let a = 1; a <= amount; a++) for (const c of coins) if (a >= c) dp[a] = Math.min(dp[a], dp[a - c] + 1);\n  return dp[amount] === Infinity ? -1 : dp[amount];\n\n\n};",
    "sampleInput": "{\"coins\":[1,2,5],\"amount\":11}",
    "humanInput": "coins = [1,2,5]\namount = 11",
    "sampleOutput": "3",
    "sheetNumber": 158,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-coin-change-1d-dp",
    "source": "sheet"
  },
  {
    "id": "bc-159-minimum-jumps-to-reach-home",
    "title": "Minimum Jumps to Reach Home",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Minimum jumps to reach home with restrictions.",
    "description": "<p>A certain bug&#39;s home is on the x-axis at position <code>x</code>. Help them get there from position <code>0</code>.</p>\n\n<p>The bug jumps according to the following rules:</p>\n\n<ul>\n\t<li>It can jump exactly <code>a</code> positions <strong>forward</strong> (to the right).</li>\n\t<li>It can jump exactly <code>b</code> positions <strong>backward</strong> (to the left).</li>\n\t<li>It cannot jump backward twice in a row.</li>\n\t<li>It cannot jump to any <code>forbidden</code> positions.</li>\n</ul>\n\n<p>The bug may jump forward <strong>beyond</strong> its home, but it <strong>cannot jump</strong> to positions numbered with <strong>negative</strong> integers.</p>\n\n<p>Given an array of integers <code>forbidden</code>, where <code>forbidden[i]</code> means that the bug cannot jump to the position <code>forbidden[i]</code>, and integers <code>a</code>, <code>b</code>, and <code>x</code>, return <em>the minimum number of jumps needed for the bug to reach its home</em>. If there is no possible sequence of jumps that lands the bug on position <code>x</code>, return <code>-1.</code></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 3 jumps forward (0 -&gt; 3 -&gt; 6 -&gt; 9) will get the bug home.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> forbidden = [8,3,16,6,12,20], a = 15, b = 13, x = 11\n<strong>Output:</strong> -1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> forbidden = [1,6,2,14,5,17,4], a = 16, b = 9, x = 7\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> One jump forward (0 -&gt; 16) then one jump backward (16 -&gt; 7) will get the bug home.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= forbidden.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= a, b, forbidden[i] &lt;= 2000</code></li>\n\t<li><code>0 &lt;= x &lt;= 2000</code></li>\n\t<li>All the elements in <code>forbidden</code> are distinct.</li>\n\t<li>Position <code>x</code> is not forbidden.</li>\n</ul>\n",
    "leetcodeSlug": "minimum-jumps-to-reach-home",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-jumps-to-reach-home/",
    "entryFunction": "minimumJumps",
    "examples": [
      {
        "input": "forbidden = [14,4,18,1,15]\na = 11\nb = 4\nx = 11",
        "output": "1"
      }
    ],
    "patternHints": [
      "BFS states",
      "Track forbidden"
    ],
    "starterCode": "var minimumJumps = function (forbidden, a, b, x) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minimumJumps = function (forbidden, a, b, x) {\n\n\n  const ban = new Set(forbidden);\n  const q = [[0, 1, 0]], seen = new Set(['0,1']);\n  while (q.length) {\n    const [pos, dir, jumps] = q.shift();\n    if (pos === x) return jumps;\n    const next = pos + (dir === 1 ? a : -b);\n    const nd = dir === 1 ? -1 : 1;\n    const nn = pos + (nd === 1 ? a : -b);\n    for (const [np, ndir] of [[next, dir], [nn, nd]]) {\n      const key = np + ',' + ndir;\n      if (np >= 0 && !ban.has(np) && !seen.has(key)) { seen.add(key); q.push([np, ndir, jumps + 1]); }\n    }\n  }\n  return -1;\n\n\n};",
    "sampleInput": "{\"forbidden\":[14,4,18,1,15],\"a\":11,\"b\":4,\"x\":11}",
    "humanInput": "forbidden = [14,4,18,1,15]\na = 11\nb = 4\nx = 11",
    "sampleOutput": "1",
    "sheetNumber": 159,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-coin-change-1d-dp",
    "source": "sheet"
  },
  {
    "id": "bc-160-best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "easy",
    "statement": "Best time to buy and sell stock once.",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>\n\n<p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,1,5,3,6,4]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> In this case, no transactions are done and the max profit = 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "entryFunction": "maxProfit",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5"
      }
    ],
    "patternHints": [
      "Track min price",
      "Max profit"
    ],
    "starterCode": "var maxProfit = function (prices) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxProfit = function (prices) {\n\n\n  let minP = Infinity, best = 0;\n  for (const p of prices) { minP = Math.min(minP, p); best = Math.max(best, p - minP); }\n  return best;\n\n\n};",
    "sampleInput": "{\"prices\":[7,1,5,3,6,4]}",
    "humanInput": "prices = [7,1,5,3,6,4]",
    "sampleOutput": "5",
    "sheetNumber": 160,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-buy-and-sell-stock",
    "source": "sheet"
  },
  {
    "id": "bc-161-best-time-to-buy-and-sell-stock-ii",
    "title": "Best Time to Buy and Sell Stock II",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Max profit with unlimited transactions.",
    "description": "<p>You are given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>On each day, you may decide to buy and/or sell the stock. You can only hold <strong>at most one</strong> share of the stock at any time. However, you can sell and buy the stock multiple times on the <strong>same day</strong>, ensuring you never hold more than one share of the stock.</p>\n\n<p>Find and return <em>the <strong>maximum</strong> profit you can achieve</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,1,5,3,6,4]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.\nThen buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.\nTotal profit is 4 + 3 = 7.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,2,3,4,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\nTotal profit is 4.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-ii",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    "entryFunction": "maxProfit",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "7"
      }
    ],
    "patternHints": [
      "Greedy rises",
      "Sum positive diffs"
    ],
    "starterCode": "var maxProfit = function (prices) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxProfit = function (prices) {\n\n\n  let profit = 0;\n  for (let i = 1; i < prices.length; i++) if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n  return profit;\n\n\n};",
    "sampleInput": "{\"prices\":[7,1,5,3,6,4]}",
    "humanInput": "prices = [7,1,5,3,6,4]",
    "sampleOutput": "7",
    "sheetNumber": 161,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-buy-and-sell-stock",
    "source": "sheet"
  },
  {
    "id": "bc-162-best-time-to-buy-and-sell-stock-iii",
    "title": "Best Time to Buy and Sell Stock III",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Max profit with at most two transactions.",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>Find the maximum profit you can achieve. You may complete <strong>at most two transactions</strong>.</p>\n\n<p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [3,3,5,0,0,3,1,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.\nThen buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,2,3,4,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\nNote that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> In this case, no transaction is done, i.e. max profit = 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-iii",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
    "entryFunction": "maxProfit",
    "examples": [
      {
        "input": "prices = [3,3,5,0,0,3,1,4]",
        "output": "6"
      }
    ],
    "patternHints": [
      "DP buy/sell x2",
      "Track states"
    ],
    "starterCode": "var maxProfit = function (prices) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxProfit = function (prices) {\n\n\n  let buy1 = Infinity, sell1 = 0, buy2 = Infinity, sell2 = 0;\n  for (const p of prices) {\n    buy1 = Math.min(buy1, p);\n    sell1 = Math.max(sell1, p - buy1);\n    buy2 = Math.min(buy2, p - sell1);\n    sell2 = Math.max(sell2, p - buy2);\n  }\n  return sell2;\n\n\n};",
    "sampleInput": "{\"prices\":[3,3,5,0,0,3,1,4]}",
    "humanInput": "prices = [3,3,5,0,0,3,1,4]",
    "sampleOutput": "6",
    "sheetNumber": 162,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-buy-and-sell-stock",
    "source": "sheet"
  },
  {
    "id": "bc-163-best-time-to-buy-and-sell-stock-iv",
    "title": "Best Time to Buy and Sell Stock IV",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Max profit with at most k transactions.",
    "description": "<p>You are given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day, and an integer <code>k</code>.</p>\n\n<p>Find the maximum profit you can achieve. You may complete at most <code>k</code> transactions: i.e. you may buy at most <code>k</code> times and sell at most <code>k</code> times.</p>\n\n<p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 2, prices = [2,4,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 2, prices = [3,2,6,5,0,3]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= 100</code></li>\n\t<li><code>1 &lt;= prices.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-iv",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    "entryFunction": "maxProfit",
    "examples": [
      {
        "input": "k = 2\nprices = [2,4,1]",
        "output": "2"
      }
    ],
    "patternHints": [
      "DP day x k",
      "Buy/sell states"
    ],
    "starterCode": "var maxProfit = function (k, prices) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxProfit = function (k, prices) {\n\n\n  if (k >= prices.length / 2) {\n    let p = 0;\n    for (let i = 1; i < prices.length; i++) if (prices[i] > prices[i - 1]) p += prices[i] - prices[i - 1];\n    return p;\n  }\n  const buy = Array(k + 1).fill(-Infinity), sell = Array(k + 1).fill(0);\n  for (const p of prices) {\n    for (let t = k; t >= 1; t--) {\n      sell[t] = Math.max(sell[t], buy[t] + p);\n      buy[t] = Math.max(buy[t], sell[t - 1] - p);\n    }\n  }\n  return sell[k];\n\n\n};",
    "sampleInput": "{\"k\":2,\"prices\":[2,4,1]}",
    "humanInput": "k = 2\nprices = [2,4,1]",
    "sampleOutput": "2",
    "sheetNumber": 163,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-buy-and-sell-stock",
    "source": "sheet"
  },
  {
    "id": "bc-164-best-time-to-buy-and-sell-stock-with-cooldown",
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Max profit with cooldown after sell.",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:</p>\n\n<ul>\n\t<li>After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).</li>\n</ul>\n\n<p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,2,3,0,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> transactions = [buy, sell, cooldown, buy, sell]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 5000</code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "entryFunction": "maxProfit",
    "examples": [
      {
        "input": "prices = [1,2,3,0,2]",
        "output": "3"
      }
    ],
    "patternHints": [
      "DP hold/sold/cool",
      "State machine"
    ],
    "starterCode": "var maxProfit = function (prices) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxProfit = function (prices) {\n\n\n  let hold = -prices[0], sold = 0, cool = 0;\n  for (let i = 1; i < prices.length; i++) {\n    const prevHold = hold, prevSold = sold, prevCool = cool;\n    hold = Math.max(prevHold, prevCool - prices[i]);\n    sold = prevHold + prices[i];\n    cool = Math.max(prevCool, prevSold);\n  }\n  return Math.max(sold, cool);\n\n\n};",
    "sampleInput": "{\"prices\":[1,2,3,0,2]}",
    "humanInput": "prices = [1,2,3,0,2]",
    "sampleOutput": "3",
    "sheetNumber": 164,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-buy-and-sell-stock",
    "source": "sheet"
  },
  {
    "id": "bc-165-best-time-to-buy-and-sell-stock-with-transaction",
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Max profit with transaction fee.",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day, and an integer <code>fee</code> representing a transaction fee.</p>\n\n<p>Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.</p>\n\n<p><strong>Note:</strong></p>\n\n<ul>\n\t<li>You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</li>\n\t<li>The transaction fee is only charged once for each stock purchase and sale.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,3,2,8,4,9], fee = 2\n<strong>Output:</strong> 8\n<strong>Explanation:</strong> The maximum profit can be achieved by:\n- Buying at prices[0] = 1\n- Selling at prices[3] = 8\n- Buying at prices[4] = 4\n- Selling at prices[5] = 9\nThe total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,3,7,5,10,3], fee = 3\n<strong>Output:</strong> 6\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= prices[i] &lt; 5 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= fee &lt; 5 * 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-with-transaction-fee",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    "entryFunction": "maxProfit",
    "examples": [
      {
        "input": "prices = [1,3,2,8,4,9]\nfee = 2",
        "output": "8"
      }
    ],
    "patternHints": [
      "DP cash/hold",
      "Pay fee on sell"
    ],
    "starterCode": "var maxProfit = function (prices, fee) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxProfit = function (prices, fee) {\n\n\n  let cash = 0, hold = -prices[0];\n  for (let i = 1; i < prices.length; i++) {\n    cash = Math.max(cash, hold + prices[i] - fee);\n    hold = Math.max(hold, cash - prices[i]);\n  }\n  return cash;\n\n\n};",
    "sampleInput": "{\"prices\":[1,3,2,8,4,9],\"fee\":2}",
    "humanInput": "prices = [1,3,2,8,4,9]\nfee = 2",
    "sampleOutput": "8",
    "sheetNumber": 165,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-buy-and-sell-stock",
    "source": "sheet"
  },
  {
    "id": "bc-166-partition-equal-subset-sum",
    "title": "Partition Equal Subset Sum",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Can partition nums into equal sum subsets?",
    "description": "<p>Given an integer array <code>nums</code>, return <code>true</code> <em>if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5,11,5]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The array can be partitioned as [1, 5, 5] and [11].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,5]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The array cannot be partitioned into equal sum subsets.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 200</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "partition-equal-subset-sum",
    "leetcodeUrl": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "entryFunction": "canPartition",
    "examples": [
      {
        "input": "nums = [1,5,11,5]",
        "output": "true"
      }
    ],
    "patternHints": [
      "0/1 knapsack",
      "Subset sum DP"
    ],
    "starterCode": "var canPartition = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var canPartition = function (nums) {\n\n\n  const sum = nums.reduce((a, b) => a + b, 0);\n  if (sum % 2) return false;\n  const target = sum / 2;\n  const dp = Array(target + 1).fill(false);\n  dp[0] = true;\n  for (const x of nums) for (let t = target; t >= x; t--) dp[t] ||= dp[t - x];\n  return dp[target];\n\n\n};",
    "sampleInput": "{\"nums\":[1,5,11,5]}",
    "humanInput": "nums = [1,5,11,5]",
    "sampleOutput": "true",
    "sheetNumber": 166,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-0-1-knapsack",
    "source": "sheet"
  },
  {
    "id": "bc-167-ones-and-zeroes",
    "title": "Ones and Zeroes",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Max subset size with m zeros and n ones in binary strings.",
    "description": "<p>You are given an array of binary strings <code>strs</code> and two integers <code>m</code> and <code>n</code>.</p>\n\n<p>Return <em>the size of the largest subset of <code>strs</code> such that there are <strong>at most</strong> </em><code>m</code><em> </em><code>0</code><em>&#39;s and </em><code>n</code><em> </em><code>1</code><em>&#39;s in the subset</em>.</p>\n\n<p>A set <code>x</code> is a <strong>subset</strong> of a set <code>y</code> if all elements of <code>x</code> are also elements of <code>y</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> strs = [&quot;10&quot;,&quot;0001&quot;,&quot;111001&quot;,&quot;1&quot;,&quot;0&quot;], m = 5, n = 3\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The largest subset with at most 5 0&#39;s and 3 1&#39;s is {&quot;10&quot;, &quot;0001&quot;, &quot;1&quot;, &quot;0&quot;}, so the answer is 4.\nOther valid but smaller subsets include {&quot;0001&quot;, &quot;1&quot;} and {&quot;10&quot;, &quot;1&quot;, &quot;0&quot;}.\n{&quot;111001&quot;} is an invalid subset because it contains 4 1&#39;s, greater than the maximum of 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> strs = [&quot;10&quot;,&quot;0&quot;,&quot;1&quot;], m = 1, n = 1\n<strong>Output:</strong> 2\n<b>Explanation:</b> The largest subset is {&quot;0&quot;, &quot;1&quot;}, so the answer is 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 600</code></li>\n\t<li><code>1 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code> consists only of digits <code>&#39;0&#39;</code> and <code>&#39;1&#39;</code>.</li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "ones-and-zeroes",
    "leetcodeUrl": "https://leetcode.com/problems/ones-and-zeroes/",
    "entryFunction": "findMaxForm",
    "examples": [
      {
        "input": "strs = [\"10\",\"0011\",\"1\",\"0\"]\nm = 1\nn = 1",
        "output": "2"
      }
    ],
    "patternHints": [
      "0/1 knapsack 2D",
      "DP count"
    ],
    "starterCode": "var findMaxForm = function (strs, m, n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findMaxForm = function (strs, m, n) {\n\n\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (const s of strs) {\n    const z = [...s].filter((c) => c === '0').length, o = s.length - z;\n    for (let i = m; i >= z; i--) for (let j = n; j >= o; j--) dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);\n  }\n  return dp[m][n];\n\n\n};",
    "sampleInput": "{\"strs\":[\"10\",\"0011\",\"1\",\"0\"],\"m\":1,\"n\":1}",
    "humanInput": "strs = [\"10\",\"0011\",\"1\",\"0\"]\nm = 1\nn = 1",
    "sampleOutput": "2",
    "sheetNumber": 167,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-0-1-knapsack",
    "source": "sheet"
  },
  {
    "id": "bc-168-coin-change-ii",
    "title": "Coin Change II",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Count coin change combinations for amount.",
    "description": "<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>\n\n<p>Return <em>the number of combinations that make up that amount</em>. If that amount of money cannot be made up by any combination of the coins, return <code>0</code>.</p>\n\n<p>You may assume that you have an infinite number of each kind of coin.</p>\n\n<p>The answer is <strong>guaranteed</strong> to fit into a signed <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> amount = 5, coins = [1,2,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> there are four ways to make up the amount:\n5=5\n5=2+2+1\n5=2+1+1+1\n5=1+1+1+1+1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> amount = 3, coins = [2]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> the amount of 3 cannot be made up just with coins of 2.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> amount = 10, coins = [10]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 5000</code></li>\n\t<li>All the values of <code>coins</code> are <strong>unique</strong>.</li>\n\t<li><code>0 &lt;= amount &lt;= 5000</code></li>\n</ul>\n",
    "leetcodeSlug": "coin-change-ii",
    "leetcodeUrl": "https://leetcode.com/problems/coin-change-ii/",
    "entryFunction": "change",
    "examples": [
      {
        "input": "amount = 5\ncoins = [1,2,5]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Unbounded knapsack",
      "DP ways"
    ],
    "starterCode": "var change = function (amount, coins) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var change = function (amount, coins) {\n\n\n  const dp = Array(amount + 1).fill(0);\n  dp[0] = 1;\n  for (const c of coins) for (let a = c; a <= amount; a++) dp[a] += dp[a - c];\n  return dp[amount];\n\n\n};",
    "sampleInput": "{\"amount\":5,\"coins\":[1,2,5]}",
    "humanInput": "amount = 5\ncoins = [1,2,5]",
    "sampleOutput": "4",
    "sheetNumber": 168,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-unbounded-knapsack",
    "source": "sheet"
  },
  {
    "id": "bc-169-last-stone-weight-ii",
    "title": "Last Stone Weight II",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Last stone weight II after smashing.",
    "description": "<p>You are given an array of integers <code>stones</code> where <code>stones[i]</code> is the weight of the <code>i<sup>th</sup></code> stone.</p>\n\n<p>We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights <code>x</code> and <code>y</code> with <code>x &lt;= y</code>. The result of this smash is:</p>\n\n<ul>\n\t<li>If <code>x == y</code>, both stones are destroyed, and</li>\n\t<li>If <code>x != y</code>, the stone of weight <code>x</code> is destroyed, and the stone of weight <code>y</code> has new weight <code>y - x</code>.</li>\n</ul>\n\n<p>At the end of the game, there is <strong>at most one</strong> stone left.</p>\n\n<p>Return <em>the smallest possible weight of the left stone</em>. If there are no stones left, return <code>0</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> stones = [2,7,4,1,8,1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nWe can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,\nwe can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,\nwe can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,\nwe can combine 1 and 1 to get 0, so the array converts to [1], then that&#39;s the optimal value.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> stones = [31,26,33,21,40]\n<strong>Output:</strong> 5\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= stones.length &lt;= 30</code></li>\n\t<li><code>1 &lt;= stones[i] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "last-stone-weight-ii",
    "leetcodeUrl": "https://leetcode.com/problems/last-stone-weight-ii/",
    "entryFunction": "lastStoneWeightII",
    "examples": [
      {
        "input": "stones = [2,7,4,1,8,1]",
        "output": "1"
      }
    ],
    "patternHints": [
      "Partition minimize diff",
      "Subset sum"
    ],
    "starterCode": "var lastStoneWeightII = function (stones) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var lastStoneWeightII = function (stones) {\n\n\n  const sum = stones.reduce((a, b) => a + b, 0);\n  const dp = Array(Math.floor(sum / 2) + 1).fill(false);\n  dp[0] = true;\n  for (const x of stones) for (let t = dp.length - 1; t >= x; t--) dp[t] ||= dp[t - x];\n  let best = 0;\n  for (let t = dp.length - 1; t >= 0; t--) if (dp[t]) { best = t; break; }\n  return sum - 2 * best;\n\n\n};",
    "sampleInput": "{\"stones\":[2,7,4,1,8,1]}",
    "humanInput": "stones = [2,7,4,1,8,1]",
    "sampleOutput": "1",
    "sheetNumber": 169,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-unbounded-knapsack",
    "source": "sheet"
  },
  {
    "id": "bc-170-longest-common-subsequence",
    "title": "Longest Common Subsequence",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Length of longest common subsequence.",
    "description": "<p>Given two strings <code>text1</code> and <code>text2</code>, return <em>the length of their longest <strong>common subsequence</strong>. </em>If there is no <strong>common subsequence</strong>, return <code>0</code>.</p>\n\n<p>A <strong>subsequence</strong> of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.</p>\n\n<ul>\n\t<li>For example, <code>&quot;ace&quot;</code> is a subsequence of <code>&quot;abcde&quot;</code>.</li>\n</ul>\n\n<p>A <strong>common subsequence</strong> of two strings is a subsequence that is common to both strings.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> text1 = &quot;abcde&quot;, text2 = &quot;ace&quot; \n<strong>Output:</strong> 3  \n<strong>Explanation:</strong> The longest common subsequence is &quot;ace&quot; and its length is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> text1 = &quot;abc&quot;, text2 = &quot;abc&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The longest common subsequence is &quot;abc&quot; and its length is 3.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> text1 = &quot;abc&quot;, text2 = &quot;def&quot;\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> There is no such common subsequence, so the result is 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= text1.length, text2.length &lt;= 1000</code></li>\n\t<li><code>text1</code> and <code>text2</code> consist of only lowercase English characters.</li>\n</ul>\n",
    "leetcodeSlug": "longest-common-subsequence",
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
    "entryFunction": "longestCommonSubsequence",
    "examples": [
      {
        "input": "text1 = \"abcde\"\ntext2 = \"ace\"",
        "output": "3"
      }
    ],
    "patternHints": [
      "2D DP",
      "Match chars"
    ],
    "starterCode": "var longestCommonSubsequence = function (text1, text2) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var longestCommonSubsequence = function (text1, text2) {\n\n\n  const dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0));\n  for (let i = 1; i <= text1.length; i++) for (let j = 1; j <= text2.length; j++)\n    dp[i][j] = text1[i - 1] === text2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return dp[text1.length][text2.length];\n\n\n};",
    "sampleInput": "{\"text1\":\"abcde\",\"text2\":\"ace\"}",
    "humanInput": "text1 = \"abcde\"\ntext2 = \"ace\"",
    "sampleOutput": "3",
    "sheetNumber": 170,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-common-subsequence-l",
    "source": "sheet"
  },
  {
    "id": "bc-171-edit-distance",
    "title": "Edit Distance",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Minimum edit distance between two strings.",
    "description": "<p>Given two strings <code>word1</code> and <code>word2</code>, return <em>the minimum number of operations required to convert <code>word1</code> to <code>word2</code></em>.</p>\n\n<p>You have the following three operations permitted on a word:</p>\n\n<ul>\n\t<li>Insert a character</li>\n\t<li>Delete a character</li>\n\t<li>Replace a character</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> word1 = &quot;horse&quot;, word2 = &quot;ros&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> \nhorse -&gt; rorse (replace &#39;h&#39; with &#39;r&#39;)\nrorse -&gt; rose (remove &#39;r&#39;)\nrose -&gt; ros (remove &#39;e&#39;)\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> word1 = &quot;intention&quot;, word2 = &quot;execution&quot;\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> \nintention -&gt; inention (remove &#39;t&#39;)\ninention -&gt; enention (replace &#39;i&#39; with &#39;e&#39;)\nenention -&gt; exention (replace &#39;n&#39; with &#39;x&#39;)\nexention -&gt; exection (replace &#39;n&#39; with &#39;c&#39;)\nexection -&gt; execution (insert &#39;u&#39;)\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li>\n\t<li><code>word1</code> and <code>word2</code> consist of lowercase English letters.</li>\n</ul>\n",
    "leetcodeSlug": "edit-distance",
    "leetcodeUrl": "https://leetcode.com/problems/edit-distance/",
    "entryFunction": "minDistance",
    "examples": [
      {
        "input": "word1 = \"horse\"\nword2 = \"ros\"",
        "output": "3"
      }
    ],
    "patternHints": [
      "DP insert/delete/replace",
      "2D table"
    ],
    "starterCode": "var minDistance = function (word1, word2) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minDistance = function (word1, word2) {\n\n\n  const dp = Array.from({ length: word1.length + 1 }, (_, i) => Array(word2.length + 1).fill(0).map((_, j) => (i ? i : j)));\n  for (let i = 1; i <= word1.length; i++) for (let j = 1; j <= word2.length; j++)\n    dp[i][j] = word1[i - 1] === word2[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n  return dp[word1.length][word2.length];\n\n\n};",
    "sampleInput": "{\"word1\":\"horse\",\"word2\":\"ros\"}",
    "humanInput": "word1 = \"horse\"\nword2 = \"ros\"",
    "sampleOutput": "3",
    "sheetNumber": 171,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-common-subsequence-l",
    "source": "sheet"
  },
  {
    "id": "bc-172-longest-palindromic-subsequence",
    "title": "Longest Palindromic Subsequence",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Longest palindromic subsequence length.",
    "description": "<p>Given a string <code>s</code>, find <em>the longest palindromic <strong>subsequence</strong>&#39;s length in</em> <code>s</code>.</p>\n\n<p>A <strong>subsequence</strong> is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;bbbab&quot;\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> One possible longest palindromic subsequence is &quot;bbbb&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cbbd&quot;\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> One possible longest palindromic subsequence is &quot;bb&quot;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> consists only of lowercase English letters.</li>\n</ul>\n",
    "leetcodeSlug": "longest-palindromic-subsequence",
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-subsequence/",
    "entryFunction": "longestPalindromeSubseq",
    "examples": [
      {
        "input": "s = \"bbbab\"",
        "output": "4"
      }
    ],
    "patternHints": [
      "DP on intervals",
      "Match ends"
    ],
    "starterCode": "var longestPalindromeSubseq = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var longestPalindromeSubseq = function (s) {\n\n\n  const dp = Array.from({ length: s.length }, () => Array(s.length).fill(0));\n  for (let i = s.length - 1; i >= 0; i--) {\n    dp[i][i] = 1;\n    for (let j = i + 1; j < s.length; j++)\n      dp[i][j] = s[i] === s[j] ? 2 + (dp[i + 1][j - 1] || 0) : Math.max(dp[i + 1][j], dp[i][j - 1]);\n  }\n  return dp[0][s.length - 1];\n\n\n};",
    "sampleInput": "{\"s\":\"bbbab\"}",
    "humanInput": "s = \"bbbab\"",
    "sampleOutput": "4",
    "sheetNumber": 172,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-common-subsequence-l",
    "source": "sheet"
  },
  {
    "id": "bc-173-minimum-insertion-steps-to-make-a-string-palindr",
    "title": "Minimum Insertion Steps to Make a String Palindrome",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Minimum insertions to make string palindrome.",
    "description": "<p>Given a string <code>s</code>. In one step you can insert any character at any index of the string.</p>\n\n<p>Return <em>the minimum number of steps</em> to make <code>s</code>&nbsp;palindrome.</p>\n\n<p>A&nbsp;<b>Palindrome String</b>&nbsp;is one that reads the same backward as well as forward.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;zzazz&quot;\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The string &quot;zzazz&quot; is already palindrome we do not need any insertions.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;mbadm&quot;\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> String can be &quot;mbdadbm&quot; or &quot;mdbabdm&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;leetcode&quot;\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Inserting 5 characters the string becomes &quot;leetcodocteel&quot;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 500</code></li>\n\t<li><code>s</code> consists of lowercase English letters.</li>\n</ul>\n",
    "leetcodeSlug": "minimum-insertion-steps-to-make-a-string-palindrome",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
    "entryFunction": "minInsertions",
    "examples": [
      {
        "input": "s = \"zzazz\"",
        "output": "0"
      }
    ],
    "patternHints": [
      "n - LPS",
      "Complement LCS"
    ],
    "starterCode": "var minInsertions = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minInsertions = function (s) {\n\n\n  const rev = s.split('').reverse().join('');\n  const dp = Array(s.length + 1).fill(0).map(() => Array(s.length + 1).fill(0));\n  for (let i = 1; i <= s.length; i++) for (let j = 1; j <= s.length; j++)\n    dp[i][j] = s[i - 1] === rev[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return s.length - dp[s.length][s.length];\n\n\n};",
    "sampleInput": "{\"s\":\"zzazz\"}",
    "humanInput": "s = \"zzazz\"",
    "sampleOutput": "0",
    "sheetNumber": 173,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-common-subsequence-l",
    "source": "sheet"
  },
  {
    "id": "bc-174-longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Length of longest increasing subsequence.",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the length of the longest <strong>strictly increasing </strong></em><span data-keyword=\"subsequence-array\"><em><strong>subsequence</strong></em></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,0,3,2,3]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,7,7,7,7,7,7]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><b>Follow up:</b>&nbsp;Can you come up with an algorithm that runs in&nbsp;<code>O(n log(n))</code> time complexity?</p>\n",
    "leetcodeSlug": "longest-increasing-subsequence",
    "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "entryFunction": "lengthOfLIS",
    "examples": [
      {
        "input": "nums = [10,9,2,5,3,7,101,18]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Patience sorting",
      "Binary search"
    ],
    "starterCode": "var lengthOfLIS = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var lengthOfLIS = function (nums) {\n\n\n  const tails = [];\n  for (const x of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }\n    tails[lo] = x;\n  }\n  return tails.length;\n\n\n};",
    "sampleInput": "{\"nums\":[10,9,2,5,3,7,101,18]}",
    "humanInput": "nums = [10,9,2,5,3,7,101,18]",
    "sampleOutput": "4",
    "sheetNumber": 174,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-increasing-subsequen",
    "source": "sheet"
  },
  {
    "id": "bc-175-largest-divisible-subset",
    "title": "Largest Divisible Subset",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Size of largest divisible subset.",
    "description": "<p>Given a set of <strong>distinct</strong> positive integers <code>nums</code>, return the largest subset <code>answer</code> such that every pair <code>(answer[i], answer[j])</code> of elements in this subset satisfies:</p>\n\n<ul>\n\t<li><code>answer[i] % answer[j] == 0</code>, or</li>\n\t<li><code>answer[j] % answer[i] == 0</code></li>\n</ul>\n\n<p>If there are multiple solutions, return any of them.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> [1,3] is also accepted.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,4,8]\n<strong>Output:</strong> [1,2,4,8]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 2 * 10<sup>9</sup></code></li>\n\t<li>All the integers in <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "largest-divisible-subset",
    "leetcodeUrl": "https://leetcode.com/problems/largest-divisible-subset/",
    "entryFunction": "largestDivisibleSubset",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "2"
      }
    ],
    "patternHints": [
      "Sort + DP chain",
      "Prev pointer"
    ],
    "starterCode": "var largestDivisibleSubset = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var largestDivisibleSubset = function (nums) {\n\n\n  nums.sort((a, b) => a - b);\n  const dp = Array(nums.length).fill(1);\n  for (let i = 0; i < nums.length; i++) for (let j = 0; j < i; j++) if (nums[i] % nums[j] === 0) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(...dp);\n\n\n};",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
    "sampleOutput": "2",
    "sheetNumber": 175,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-increasing-subsequen",
    "source": "sheet"
  },
  {
    "id": "bc-176-longest-string-chain",
    "title": "Longest String Chain",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Longest string chain by adding one char.",
    "description": "<p>You are given an array of <code>words</code> where each word consists of lowercase English letters.</p>\n\n<p><code>word<sub>A</sub></code> is a <strong>predecessor</strong> of <code>word<sub>B</sub></code> if and only if we can insert <strong>exactly one</strong> letter anywhere in <code>word<sub>A</sub></code> <strong>without changing the order of the other characters</strong> to make it equal to <code>word<sub>B</sub></code>.</p>\n\n<ul>\n\t<li>For example, <code>&quot;abc&quot;</code> is a <strong>predecessor</strong> of <code>&quot;ab<u>a</u>c&quot;</code>, while <code>&quot;cba&quot;</code> is not a <strong>predecessor</strong> of <code>&quot;bcad&quot;</code>.</li>\n</ul>\n\n<p>A <strong>word chain</strong><em> </em>is a sequence of words <code>[word<sub>1</sub>, word<sub>2</sub>, ..., word<sub>k</sub>]</code> with <code>k &gt;= 1</code>, where <code>word<sub>1</sub></code> is a <strong>predecessor</strong> of <code>word<sub>2</sub></code>, <code>word<sub>2</sub></code> is a <strong>predecessor</strong> of <code>word<sub>3</sub></code>, and so on. A single word is trivially a <strong>word chain</strong> with <code>k == 1</code>.</p>\n\n<p>Return <em>the <strong>length</strong> of the <strong>longest possible word chain</strong> with words chosen from the given list of </em><code>words</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;a&quot;,&quot;b&quot;,&quot;ba&quot;,&quot;bca&quot;,&quot;bda&quot;,&quot;bdca&quot;]\n<strong>Output:</strong> 4\n<strong>Explanation</strong>: One of the longest word chains is [&quot;a&quot;,&quot;<u>b</u>a&quot;,&quot;b<u>d</u>a&quot;,&quot;bd<u>c</u>a&quot;].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;xbc&quot;,&quot;pcxbcf&quot;,&quot;xb&quot;,&quot;cxbc&quot;,&quot;pcxbc&quot;]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> All the words can be put in a word chain [&quot;xb&quot;, &quot;xb<u>c</u>&quot;, &quot;<u>c</u>xbc&quot;, &quot;<u>p</u>cxbc&quot;, &quot;pcxbc<u>f</u>&quot;].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;abcd&quot;,&quot;dbqca&quot;]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The trivial word chain [&quot;abcd&quot;] is one of the longest word chains.\n[&quot;abcd&quot;,&quot;dbqca&quot;] is not a valid word chain because the ordering of the letters is changed.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= words.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 16</code></li>\n\t<li><code>words[i]</code> only consists of lowercase English letters.</li>\n</ul>\n",
    "leetcodeSlug": "longest-string-chain",
    "leetcodeUrl": "https://leetcode.com/problems/longest-string-chain/",
    "entryFunction": "longestStrChain",
    "examples": [
      {
        "input": "words = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Sort by length",
      "DP predecessor"
    ],
    "starterCode": "var longestStrChain = function (words) {\n\n  // TODO\n\n};",
    "solutionCode": "var longestStrChain = function (words) {\n\n  .slice().sort((a, b) => a.length - b.length);\n  const dp = Array(words.length).fill(1);\n  const pred = (a, b) => {\n    if (a.length + 1 !== b.length) return false;\n    let i = 0, j = 0, diff = 0;\n    while (i < a.length && j < b.length) {\n      if (a[i] === b[j]) { i++; j++; }\n      else { diff++; j++; if (diff > 1) return false; }\n    }\n    return true;\n  };\n  for (let i = 0; i < words.length; i++) for (let j = 0; j < i; j++) if (pred(words[j], words[i])) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(...dp);\n\n};",
    "sampleInput": "{\"words\":[\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]}",
    "humanInput": "words = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]",
    "sampleOutput": "4",
    "sheetNumber": 176,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-longest-increasing-subsequen",
    "source": "sheet"
  },
  {
    "id": "bc-177-minimum-cost-to-cut-a-stick",
    "title": "Minimum Cost to Cut a Stick",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Minimum cost to cut a stick.",
    "description": "<p>Given a wooden stick of length <code>n</code> units. The stick is labelled from <code>0</code> to <code>n</code>. For example, a stick of length <strong>6</strong> is labelled as follows:</p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/07/21/statement.jpg\" style=\"width: 521px; height: 111px;\" />\n<p>Given an integer array <code>cuts</code> where <code>cuts[i]</code> denotes a position you should perform a cut at.</p>\n\n<p>You should perform the cuts in order, you can change the order of the cuts as you wish.</p>\n\n<p>The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.</p>\n\n<p>Return <em>the minimum total cost</em> of the cuts.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/07/23/e1.jpg\" style=\"width: 350px; height: 284px;\" />\n<pre>\n<strong>Input:</strong> n = 7, cuts = [1,3,4,5]\n<strong>Output:</strong> 16\n<strong>Explanation:</strong> Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/07/21/e11.jpg\" style=\"width: 350px; height: 284px;\" />\nThe first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.\nRearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 9, cuts = [5,6,1,4,2]\n<strong>Output:</strong> 22\n<strong>Explanation:</strong> If you try the given cuts ordering the cost will be 25.\nThere are much ordering with total cost &lt;= 25, for example, the order [4, 6, 5, 2, 1] has total cost = 22 which is the minimum possible.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= n &lt;= 10<sup>6</sup></code></li>\n\t<li><code>1 &lt;= cuts.length &lt;= min(n - 1, 100)</code></li>\n\t<li><code>1 &lt;= cuts[i] &lt;= n - 1</code></li>\n\t<li>All the integers in <code>cuts</code> array are <strong>distinct</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "minimum-cost-to-cut-a-stick",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
    "entryFunction": "minCost",
    "examples": [
      {
        "input": "n = 7\ncuts = [1,3,4,5]",
        "output": "16"
      }
    ],
    "patternHints": [
      "Interval DP",
      "Try cut positions"
    ],
    "starterCode": "var minCost = function (n, cuts) {\n\n  // TODO\n\n};",
    "solutionCode": "var minCost = function (n, cuts) {\n\n  const cuts = [0, ...cuts.slice().sort((a, b) => a - b), n];\n  const m = cuts.length;\n  const dp = Array.from({ length: m }, () => Array(m).fill(0));\n  for (let len = 2; len < m; len++) for (let i = 0; i + len < m; i++) {\n    const j = i + len;\n    dp[i][j] = Infinity;\n    for (let k = i + 1; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + cuts[j] - cuts[i]);\n  }\n  return dp[0][m - 1];\n\n};",
    "sampleInput": "{\"n\":7,\"cuts\":[1,3,4,5]}",
    "humanInput": "n = 7\ncuts = [1,3,4,5]",
    "sampleOutput": "16",
    "sheetNumber": 177,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-matrix-chain-multiplication-",
    "source": "sheet"
  },
  {
    "id": "bc-178-burst-balloons",
    "title": "Burst Balloons",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Burst balloons for maximum coins.",
    "description": "<p>You are given <code>n</code> balloons, indexed from <code>0</code> to <code>n - 1</code>. Each balloon is painted with a number on it represented by an array <code>nums</code>. You are asked to burst all the balloons.</p>\n\n<p>If you burst the <code>i<sup>th</sup></code> balloon, you will get <code>nums[i - 1] * nums[i] * nums[i + 1]</code> coins. If <code>i - 1</code> or <code>i + 1</code> goes out of bounds of the array, then treat it as if there is a balloon with a <code>1</code> painted on it.</p>\n\n<p>Return <em>the maximum coins you can collect by bursting the balloons wisely</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,1,5,8]\n<strong>Output:</strong> 167\n<strong>Explanation:</strong>\nnums = [3,1,5,8] --&gt; [3,5,8] --&gt; [3,8] --&gt; [8] --&gt; []\ncoins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5]\n<strong>Output:</strong> 10\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "burst-balloons",
    "leetcodeUrl": "https://leetcode.com/problems/burst-balloons/",
    "entryFunction": "maxCoins",
    "examples": [
      {
        "input": "nums = [3,1,5,8]",
        "output": "167"
      }
    ],
    "patternHints": [
      "Interval DP",
      "Pick last burst"
    ],
    "starterCode": "var maxCoins = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var maxCoins = function (nums) {\n\n\n  const a = [1, ...nums, 1];\n  const dp = Array.from({ length: a.length }, () => Array(a.length).fill(0));\n  for (let len = 3; len <= a.length; len++) for (let i = 0; i + len - 1 < a.length; i++) {\n    const j = i + len - 1;\n    for (let k = i + 1; k < j; k++) dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + a[i] * a[k] * a[j]);\n  }\n  return dp[0][a.length - 1];\n\n\n};",
    "sampleInput": "{\"nums\":[3,1,5,8]}",
    "humanInput": "nums = [3,1,5,8]",
    "sampleOutput": "167",
    "sheetNumber": 178,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-matrix-chain-multiplication-",
    "source": "sheet"
  },
  {
    "id": "bc-179-parsing-a-boolean-expression",
    "title": "Parsing a Boolean Expression",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Evaluate boolean expression with &, |, !.",
    "description": "<p>A <strong>boolean expression</strong> is an expression that evaluates to either <code>true</code> or <code>false</code>. It can be in one of the following shapes:</p>\n\n<ul>\n\t<li><code>&#39;t&#39;</code> that evaluates to <code>true</code>.</li>\n\t<li><code>&#39;f&#39;</code> that evaluates to <code>false</code>.</li>\n\t<li><code>&#39;!(subExpr)&#39;</code> that evaluates to <strong>the logical NOT</strong> of the inner expression <code>subExpr</code>.</li>\n\t<li><code>&#39;&amp;(subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub>)&#39;</code> that evaluates to <strong>the logical AND</strong> of the inner expressions <code>subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub></code> where <code>n &gt;= 1</code>.</li>\n\t<li><code>&#39;|(subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub>)&#39;</code> that evaluates to <strong>the logical OR</strong> of the inner expressions <code>subExpr<sub>1</sub>, subExpr<sub>2</sub>, ..., subExpr<sub>n</sub></code> where <code>n &gt;= 1</code>.</li>\n</ul>\n\n<p>Given a string <code>expression</code> that represents a <strong>boolean expression</strong>, return <em>the evaluation of that expression</em>.</p>\n\n<p>It is <strong>guaranteed</strong> that the given expression is valid and follows the given rules.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;&amp;(|(f))&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> \nFirst, evaluate |(f) --&gt; f. The expression is now &quot;&amp;(f)&quot;.\nThen, evaluate &amp;(f) --&gt; f. The expression is now &quot;f&quot;.\nFinally, return false.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;|(f,f,f,t)&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The evaluation of (false OR false OR false OR true) is true.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;!(&amp;(f,t))&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \nFirst, evaluate &amp;(f,t) --&gt; (false AND true) --&gt; false --&gt; f. The expression is now &quot;!(f)&quot;.\nThen, evaluate !(f) --&gt; NOT false --&gt; true. We return true.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= expression.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li>expression[i] is one following characters: <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, <code>&#39;&amp;&#39;</code>, <code>&#39;|&#39;</code>, <code>&#39;!&#39;</code>, <code>&#39;t&#39;</code>, <code>&#39;f&#39;</code>, and <code>&#39;,&#39;</code>.</li>\n</ul>\n",
    "leetcodeSlug": "parsing-a-boolean-expression",
    "leetcodeUrl": "https://leetcode.com/problems/parsing-a-boolean-expression/",
    "entryFunction": "parseBoolExpr",
    "patternHints": [
      "Recursion or stack",
      "Parse parentheses"
    ],
    "starterCode": "var parseBoolExpr = function (expression) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var parseBoolExpr = function (expression) {\n\n\n  const s = expression;\n  let i = 0;\n  const parse = () => {\n    if (s[i] === 't' || s[i] === 'f') return s[i++] === 't';\n    if (s[i] === '!') { i += 2; return !parse(); }\n    const op = s[i++]; i++;\n    const vals = [];\n    while (s[i] !== ')') { if (s[i] === ',') i++; else vals.push(parse()); }\n    i++;\n    return op === '&' ? vals.every(Boolean) : vals.some(Boolean);\n  };\n  return parse();\n\n\n};",
    "sampleInput": "{\"expression\":\"(&(1,0),|(0,1))\"}",
    "humanInput": "expression = \"(&(1,0),|(0,1))\"",
    "sheetNumber": 179,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-matrix-chain-multiplication-",
    "source": "sheet"
  },
  {
    "id": "bc-180-palindrome-partitioning-ii",
    "title": "Palindrome Partitioning II",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Minimum cuts for palindrome partitioning.",
    "description": "<p>Given a string <code>s</code>, partition <code>s</code> such that every <span data-keyword=\"substring-nonempty\">substring</span> of the partition is a <span data-keyword=\"palindrome-string\">palindrome</span>.</p>\n\n<p>Return <em>the <strong>minimum</strong> cuts needed for a palindrome partitioning of</em> <code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aab&quot;\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The palindrome partitioning [&quot;aa&quot;,&quot;b&quot;] could be produced using 1 cut.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a&quot;\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ab&quot;\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 2000</code></li>\n\t<li><code>s</code> consists of lowercase English letters only.</li>\n</ul>\n",
    "leetcodeSlug": "palindrome-partitioning-ii",
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning-ii/",
    "entryFunction": "minCut",
    "examples": [
      {
        "input": "s = \"aab\"",
        "output": "1"
      }
    ],
    "patternHints": [
      "DP cuts + palindrome",
      "Check substrings"
    ],
    "starterCode": "var minCut = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minCut = function (s) {\n\n\n  const n = s.length;\n  const isPal = Array.from({ length: n }, () => Array(n).fill(false));\n  for (let i = n - 1; i >= 0; i--) for (let j = i; j < n; j++) isPal[i][j] = s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1]);\n  const dp = Array(n).fill(Infinity);\n  for (let i = 0; i < n; i++) {\n    if (isPal[0][i]) dp[i] = 0;\n    else for (let j = 1; j <= i; j++) if (isPal[j][i]) dp[i] = Math.min(dp[i], dp[j - 1] + 1);\n  }\n  return dp[n - 1];\n\n\n};",
    "sampleInput": "{\"s\":\"aab\"}",
    "humanInput": "s = \"aab\"",
    "sampleOutput": "1",
    "sheetNumber": 180,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-matrix-chain-multiplication-",
    "source": "sheet"
  },
  {
    "id": "bc-181-shortest-path-visiting-all-nodes",
    "title": "Shortest Path Visiting All Nodes",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Shortest path visiting all nodes in graph.",
    "description": "<p>You have an undirected, connected graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an array <code>graph</code> where <code>graph[i]</code> is a list of all the nodes connected with node <code>i</code> by an edge.</p>\n\n<p>Return <em>the length of the shortest path that visits every node</em>. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/05/12/shortest1-graph.jpg\" style=\"width: 222px; height: 183px;\" />\n<pre>\n<strong>Input:</strong> graph = [[1,2,3],[0],[0],[0]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> One possible path is [1,0,2,0,3]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/05/12/shortest2-graph.jpg\" style=\"width: 382px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> One possible path is [0,1,4,2,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == graph.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 12</code></li>\n\t<li><code>0 &lt;= graph[i].length &lt;&nbsp;n</code></li>\n\t<li><code>graph[i]</code> does not contain <code>i</code>.</li>\n\t<li>If <code>graph[a]</code> contains <code>b</code>, then <code>graph[b]</code> contains <code>a</code>.</li>\n\t<li>The input graph is always connected.</li>\n</ul>\n",
    "leetcodeSlug": "shortest-path-visiting-all-nodes",
    "leetcodeUrl": "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
    "entryFunction": "shortestPathLength",
    "examples": [
      {
        "input": "graph = [[1,2],[0,2],[0,1]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "BFS bitmask state",
      "All nodes visited"
    ],
    "starterCode": "var shortestPathLength = function (graph) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var shortestPathLength = function (graph) {\n\n\n  const n = graph.length, all = (1 << n) - 1;\n  const q = [];\n  for (let i = 0; i < n; i++) q.push([i, 1 << i, 0]);\n  const seen = new Set(q.map(([n, m]) => n + ',' + m));\n  while (q.length) {\n    const [node, mask, dist] = q.shift();\n    if (mask === all) return dist;\n    for (const nxt of graph[node]) {\n      const nm = mask | (1 << nxt), key = nxt + ',' + nm;\n      if (!seen.has(key)) { seen.add(key); q.push([nxt, nm, dist + 1]); }\n    }\n  }\n  return 0;\n\n\n};",
    "sampleInput": "{\"graph\":[[1,2],[0,2],[0,1]]}",
    "humanInput": "graph = [[1,2],[0,2],[0,1]]",
    "sampleOutput": "2",
    "sheetNumber": 181,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-dp-on-grids-and-trees",
    "source": "sheet"
  },
  {
    "id": "bc-182-unique-paths",
    "title": "Unique Paths",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Count unique paths in m x n grid.",
    "description": "<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>\n\n<p>Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>\n\n<p>The test cases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png\" style=\"width: 400px; height: 183px;\" />\n<pre>\n<strong>Input:</strong> m = 3, n = 7\n<strong>Output:</strong> 28\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> m = 3, n = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -&gt; Down -&gt; Down\n2. Down -&gt; Down -&gt; Right\n3. Down -&gt; Right -&gt; Down\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "unique-paths",
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
    "entryFunction": "uniquePaths",
    "examples": [
      {
        "input": "m = 3\nn = 7",
        "output": "28"
      }
    ],
    "patternHints": [
      "DP combinatorics",
      "paths[i][j]"
    ],
    "starterCode": "var uniquePaths = function (m, n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var uniquePaths = function (m, n) {\n\n\n  const dp = Array.from({ length: m }, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[m - 1][n - 1];\n\n\n};",
    "sampleInput": "{\"m\":3,\"n\":7}",
    "humanInput": "m = 3\nn = 7",
    "sampleOutput": "28",
    "sheetNumber": 182,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-dp-on-grids-and-trees",
    "source": "sheet"
  },
  {
    "id": "bc-183-unique-paths-ii",
    "title": "Unique Paths II",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Unique paths II with obstacles.",
    "description": "<p>You are given an <code>m x n</code> integer array <code>grid</code>. There is a robot initially located at the <b>top-left corner</b> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>\n\n<p>An obstacle and space are marked as <code>1</code> or <code>0</code> respectively in <code>grid</code>. A path that the robot takes cannot include <strong>any</strong> square that is an obstacle.</p>\n\n<p>Return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>\n\n<p>The testcases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There is one obstacle in the middle of the 3x3 grid above.\nThere are two ways to reach the bottom-right corner:\n1. Right -&gt; Right -&gt; Down -&gt; Down\n2. Down -&gt; Down -&gt; Right -&gt; Right\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg\" style=\"width: 162px; height: 162px;\" />\n<pre>\n<strong>Input:</strong> obstacleGrid = [[0,1],[0,0]]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == obstacleGrid.length</code></li>\n\t<li><code>n == obstacleGrid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>obstacleGrid[i][j]</code> is <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "unique-paths-ii",
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths-ii/",
    "entryFunction": "uniquePathsWithObstacles",
    "examples": [
      {
        "input": "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
        "output": "2"
      }
    ],
    "patternHints": [
      "DP skip obstacles",
      "Grid traversal"
    ],
    "starterCode": "var uniquePathsWithObstacles = function (obstacleGrid) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var uniquePathsWithObstacles = function (obstacleGrid) {\n\n\n  const g = obstacleGrid;\n  const m = g.length, n = g[0].length;\n  if (g[0][0] || g[m - 1][n - 1]) return 0;\n  const dp = Array.from({ length: m }, () => Array(n).fill(0));\n  dp[0][0] = 1;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {\n    if (g[i][j]) dp[i][j] = 0;\n    else { if (i) dp[i][j] += dp[i - 1][j]; if (j) dp[i][j] += dp[i][j - 1]; }\n  }\n  return dp[m - 1][n - 1];\n\n\n};",
    "sampleInput": "{\"obstacleGrid\":[[0,0,0],[0,1,0],[0,0,0]]}",
    "humanInput": "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
    "sampleOutput": "2",
    "sheetNumber": 183,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-dp-on-grids-and-trees",
    "source": "sheet"
  },
  {
    "id": "bc-184-minimum-path-sum",
    "title": "Minimum Path Sum",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "medium",
    "statement": "Minimum path sum in grid.",
    "description": "<p>Given a <code>m x n</code> <code>grid</code> filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.</p>\n\n<p><strong>Note:</strong> You can only move either down or right at any point in time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> grid = [[1,3,1],[1,5,1],[4,2,1]]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Because the path 1 &rarr; 3 &rarr; 1 &rarr; 1 &rarr; 1 minimizes the sum.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[1,2,3],[4,5,6]]\n<strong>Output:</strong> 12\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= grid[i][j] &lt;= 200</code></li>\n</ul>\n",
    "leetcodeSlug": "minimum-path-sum",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
    "entryFunction": "minPathSum",
    "examples": [
      {
        "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
        "output": "7"
      }
    ],
    "patternHints": [
      "DP accumulate",
      "Min from top/left"
    ],
    "starterCode": "var minPathSum = function (grid) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var minPathSum = function (grid) {\n\n\n  const m = grid.length, n = grid[0].length;\n  for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];\n  for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);\n  return grid[m - 1][n - 1];\n\n\n};",
    "sampleInput": "{\"grid\":[[1,3,1],[1,5,1],[4,2,1]]}",
    "humanInput": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
    "sampleOutput": "7",
    "sheetNumber": 184,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-dp-on-grids-and-trees",
    "source": "sheet"
  },
  {
    "id": "bc-185-russian-doll-envelopes",
    "title": "Russian Doll Envelopes",
    "patternSlug": "dp-1d",
    "patternName": "Dynamic Programming",
    "difficulty": "hard",
    "statement": "Maximum envelopes Russian doll nesting.",
    "description": "<p>You are given a 2D array of integers <code>envelopes</code> where <code>envelopes[i] = [w<sub>i</sub>, h<sub>i</sub>]</code> represents the width and the height of an envelope.</p>\n\n<p>One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope&#39;s width and height.</p>\n\n<p>Return <em>the maximum number of envelopes you can Russian doll (i.e., put one inside the other)</em>.</p>\n\n<p><strong>Note:</strong> You cannot rotate an envelope.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> envelopes = [[5,4],[6,4],[6,7],[2,3]]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The maximum number of envelopes you can Russian doll is <code>3</code> ([2,3] =&gt; [5,4] =&gt; [6,7]).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> envelopes = [[1,1],[1,1],[1,1]]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= envelopes.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>envelopes[i].length == 2</code></li>\n\t<li><code>1 &lt;= w<sub>i</sub>, h<sub>i</sub> &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "russian-doll-envelopes",
    "leetcodeUrl": "https://leetcode.com/problems/russian-doll-envelopes/",
    "entryFunction": "maxEnvelopes",
    "examples": [
      {
        "input": "envelopes = [[5,4],[6,4],[6,7],[2,3]]",
        "output": "3"
      }
    ],
    "patternHints": [
      "Sort w asc h desc",
      "LIS on heights"
    ],
    "starterCode": "var maxEnvelopes = function (envelopes) {\n\n  // TODO\n\n};",
    "solutionCode": "var maxEnvelopes = function (envelopes) {\n\n  const env = envelopes.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]);\n  const tails = [];\n  for (const [, h] of env) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < h) lo = m + 1; else hi = m; }\n    tails[lo] = h;\n  }\n  return tails.length;\n\n};",
    "sampleInput": "{\"envelopes\":[[5,4],[6,4],[6,7],[2,3]]}",
    "humanInput": "envelopes = [[5,4],[6,4],[6,7],[2,3]]",
    "sampleOutput": "3",
    "sheetNumber": 185,
    "sheetSectionId": "dynamic-programming",
    "sheetSubsectionId": "dynamic-programming-dp-on-grids-and-trees",
    "source": "sheet"
  },
  {
    "id": "bc-186-find-greatest-common-divisor-of-array",
    "title": "Find Greatest Common Divisor of Array",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Return GCD of all numbers in array.",
    "description": "<p>Given an integer array <code>nums</code>, return<strong> </strong><em>the <strong>greatest common divisor</strong> of the smallest number and largest number in </em><code>nums</code>.</p>\n\n<p>The <strong>greatest common divisor</strong> of two numbers is the largest positive integer that evenly divides both numbers.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,5,6,9,10]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\nThe smallest number in nums is 2.\nThe largest number in nums is 10.\nThe greatest common divisor of 2 and 10 is 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,5,6,8,3]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nThe smallest number in nums is 3.\nThe largest number in nums is 8.\nThe greatest common divisor of 3 and 8 is 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\nThe smallest number in nums is 3.\nThe largest number in nums is 3.\nThe greatest common divisor of 3 and 3 is 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "find-greatest-common-divisor-of-array",
    "leetcodeUrl": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
    "entryFunction": "findGCD",
    "examples": [
      {
        "input": "nums = [12,18,24]",
        "output": "6"
      }
    ],
    "patternHints": [
      "Euclid reduce",
      "Same as #6"
    ],
    "starterCode": "var findGCD = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findGCD = function (nums) {\n\n\n  const g = (a, b) => (b ? g(b, a % b) : a);\n  return nums.reduce((a, b) => g(a, b));\n\n\n};",
    "sampleInput": "{\"nums\":[12,18,24]}",
    "humanInput": "nums = [12,18,24]",
    "sampleOutput": "6",
    "sheetNumber": 186,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-187-self-dividing-numbers",
    "title": "Self Dividing Numbers",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Return self-dividing numbers in range.",
    "description": "<p>A <strong>self-dividing number</strong> is a number that is divisible by every digit it contains.</p>\n\n<ul>\n\t<li>For example, <code>128</code> is <strong>a self-dividing number</strong> because <code>128 % 1 == 0</code>, <code>128 % 2 == 0</code>, and <code>128 % 8 == 0</code>.</li>\n</ul>\n\n<p>A <strong>self-dividing number</strong> is not allowed to contain the digit zero.</p>\n\n<p>Given two integers <code>left</code> and <code>right</code>, return <em>a list of all the <strong>self-dividing numbers</strong> in the range</em> <code>[left, right]</code> (both <strong>inclusive</strong>).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> left = 1, right = 22\n<strong>Output:</strong> [1,2,3,4,5,6,7,8,9,11,12,15,22]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> left = 47, right = 85\n<strong>Output:</strong> [48,55,66,77]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= left &lt;= right &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "self-dividing-numbers",
    "leetcodeUrl": "https://leetcode.com/problems/self-dividing-numbers/",
    "entryFunction": "selfDividingNumbers",
    "examples": [
      {
        "input": "left = 1\nright = 22",
        "output": "[1,2,3,4,5,6,7,8,9,11,12,15,22]"
      }
    ],
    "patternHints": [
      "Digit divides n",
      "Filter range"
    ],
    "starterCode": "var selfDividingNumbers = function (left, right) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var selfDividingNumbers = function (left, right) {\n\n\n  const ok = (n) => { for (const ch of String(n)) { const d = +ch; if (!d || n % d) return false; } return true; };\n  const out = [];\n  for (let i = left; i <= right; i++) if (ok(i)) out.push(i);\n  return out;\n\n\n};",
    "sampleInput": "{\"left\":1,\"right\":22}",
    "humanInput": "left = 1\nright = 22",
    "sampleOutput": "[\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]",
    "sheetNumber": 187,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-188-number-of-good-pairs",
    "title": "Number of Good Pairs",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Count good pairs (i,j) where nums[i]==nums[j].",
    "description": "<p>Given an array of integers <code>nums</code>, return <em>the number of <strong>good pairs</strong></em>.</p>\n\n<p>A pair <code>(i, j)</code> is called <em>good</em> if <code>nums[i] == nums[j]</code> and <code>i</code> &lt; <code>j</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1,1,3]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,1,1]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Each pair in the array are <em>good</em>.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "number-of-good-pairs",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-good-pairs/",
    "entryFunction": "numIdenticalPairs",
    "examples": [
      {
        "input": "nums = [1,2,3,1,1,3]",
        "output": "4"
      }
    ],
    "patternHints": [
      "Frequency map",
      "n choose 2"
    ],
    "starterCode": "var numIdenticalPairs = function (nums) {\n\n  // TODO\n\n};",
    "solutionCode": "var numIdenticalPairs = function (nums) {\n\n  const cnt = new Map();\n  let pairs = 0;\n  for (const x of nums) {\n    const c = cnt.get(x) || 0;\n    pairs += c;\n    cnt.set(x, c + 1);\n  }\n  return pairs;\n\n};",
    "sampleInput": "{\"nums\":[1,2,3,1,1,3]}",
    "humanInput": "nums = [1,2,3,1,1,3]",
    "sampleOutput": "4",
    "sheetNumber": 188,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-189-four-divisors",
    "title": "Four Divisors",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "medium",
    "statement": "Sum of four divisors for each number; -1 if not exactly four.",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the sum of divisors of the integers in that array that have exactly four divisors</em>. If there is no such integer in the array, return <code>0</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [21,4,7]\n<strong>Output:</strong> 32\n<strong>Explanation:</strong> \n21 has 4 divisors: 1, 3, 7, 21\n4 has 3 divisors: 1, 2, 4\n7 has 2 divisors: 1, 7\nThe answer is the sum of divisors of 21 only.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [21,21]\n<strong>Output:</strong> 64\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,5]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "four-divisors",
    "leetcodeUrl": "https://leetcode.com/problems/four-divisors/",
    "entryFunction": "sumFourDivisors",
    "examples": [
      {
        "input": "nums = [21,4,7]",
        "output": "32"
      }
    ],
    "patternHints": [
      "Factor scan",
      "Sum divisors"
    ],
    "starterCode": "var sumFourDivisors = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var sumFourDivisors = function (nums) {\n\n\n  const f4 = (x) => {\n    const divs = [];\n    for (let d = 1; d * d <= x; d++) {\n      if (x % d === 0) { divs.push(d); if (d * d !== x) divs.push(x / d); }\n    }\n    return divs.length === 4 ? divs.reduce((a, b) => a + b, 0) : 0;\n  };\n  return nums.reduce((s, x) => s + f4(x), 0);\n\n\n};",
    "sampleInput": "{\"nums\":[21,4,7]}",
    "humanInput": "nums = [21,4,7]",
    "sampleOutput": "32",
    "sheetNumber": 189,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-190-day-of-the-week",
    "title": "Day of the Week",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Return day of week for given date.",
    "description": "<p>Given a date, return the corresponding day of the week for that date.</p>\n\n<p>The input is given as three integers representing the <code>day</code>, <code>month</code> and <code>year</code> respectively.</p>\n\n<p>Return the answer as one of the following values&nbsp;<code>{&quot;Sunday&quot;, &quot;Monday&quot;, &quot;Tuesday&quot;, &quot;Wednesday&quot;, &quot;Thursday&quot;, &quot;Friday&quot;, &quot;Saturday&quot;}</code>.</p>\n\n<p><strong>Note:</strong> January 1, 1971 was a Friday.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> day = 31, month = 8, year = 2019\n<strong>Output:</strong> &quot;Saturday&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> day = 18, month = 7, year = 1999\n<strong>Output:</strong> &quot;Sunday&quot;\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> day = 15, month = 8, year = 1993\n<strong>Output:</strong> &quot;Sunday&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The given dates are valid dates between the years <code>1971</code> and <code>2100</code>.</li>\n</ul>\n",
    "leetcodeSlug": "day-of-the-week",
    "leetcodeUrl": "https://leetcode.com/problems/day-of-the-week/",
    "entryFunction": "dayOfTheWeek",
    "examples": [
      {
        "input": "day = 31\nmonth = 8\nyear = 2019",
        "output": "\"Saturday\""
      }
    ],
    "patternHints": [
      "Zeller or anchor",
      "Mod 7"
    ],
    "starterCode": "var dayOfTheWeek = function (day, month, year) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var dayOfTheWeek = function (day, month, year) {\n\n\n  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n  const d = new Date(year, month - 1, day);\n  return days[d.getDay()];\n\n\n};",
    "sampleInput": "{\"day\":31,\"month\":8,\"year\":2019}",
    "humanInput": "day = 31\nmonth = 8\nyear = 2019",
    "sampleOutput": "\"Saturday\"",
    "sheetNumber": 190,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-191-subtract-the-product-and-sum-of-digits-of-an-int",
    "title": "Subtract the Product and Sum of Digits of an Integer",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Subtract product and sum of digits.",
    "description": "Given an integer number <code>n</code>, return the difference between the product of its digits and the sum of its digits.\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 234\n<strong>Output:</strong> 15 \n<b>Explanation:</b> \nProduct of digits = 2 * 3 * 4 = 24 \nSum of digits = 2 + 3 + 4 = 9 \nResult = 24 - 9 = 15\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4421\n<strong>Output:</strong> 21\n<b>Explanation: \n</b>Product of digits = 4 * 4 * 2 * 1 = 32 \nSum of digits = 4 + 4 + 2 + 1 = 11 \nResult = 32 - 11 = 21\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10^5</code></li>\n</ul>\n",
    "leetcodeSlug": "subtract-the-product-and-sum-of-digits-of-an-integer",
    "leetcodeUrl": "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/",
    "entryFunction": "subtractProductAndSum",
    "examples": [
      {
        "input": "n = 234",
        "output": "15"
      }
    ],
    "patternHints": [
      "Parse digits",
      "Product - sum"
    ],
    "starterCode": "var subtractProductAndSum = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var subtractProductAndSum = function (n) {\n\n\n  const s = String(n);\n  let prod = 1, sum = 0;\n  for (const ch of s) { const d = +ch; prod *= d; sum += d; }\n  return prod - sum;\n\n\n};",
    "sampleInput": "{\"n\":234}",
    "humanInput": "n = 234",
    "sampleOutput": "15",
    "sheetNumber": 191,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-192-count-of-matches-in-tournament",
    "title": "Count of Matches in Tournament",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Count matches in tournament until one winner.",
    "description": "<p>You are given an integer <code>n</code>, the number of teams in a tournament that has strange rules:</p>\n\n<ul>\n\t<li>If the current number of teams is <strong>even</strong>, each team gets paired with another team. A total of <code>n / 2</code> matches are played, and <code>n / 2</code> teams advance to the next round.</li>\n\t<li>If the current number of teams is <strong>odd</strong>, one team randomly advances in the tournament, and the rest gets paired. A total of <code>(n - 1) / 2</code> matches are played, and <code>(n - 1) / 2 + 1</code> teams advance to the next round.</li>\n</ul>\n\n<p>Return <em>the number of matches played in the tournament until a winner is decided.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 7\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Details of the tournament: \n- 1st Round: Teams = 7, Matches = 3, and 4 teams advance.\n- 2nd Round: Teams = 4, Matches = 2, and 2 teams advance.\n- 3rd Round: Teams = 2, Matches = 1, and 1 team is declared the winner.\nTotal number of matches = 3 + 2 + 1 = 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 14\n<strong>Output:</strong> 13\n<strong>Explanation:</strong> Details of the tournament:\n- 1st Round: Teams = 14, Matches = 7, and 7 teams advance.\n- 2nd Round: Teams = 7, Matches = 3, and 4 teams advance.\n- 3rd Round: Teams = 4, Matches = 2, and 2 teams advance.\n- 4th Round: Teams = 2, Matches = 1, and 1 team is declared the winner.\nTotal number of matches = 7 + 3 + 2 + 1 = 13.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n</ul>\n",
    "leetcodeSlug": "count-of-matches-in-tournament",
    "leetcodeUrl": "https://leetcode.com/problems/count-of-matches-in-tournament/",
    "entryFunction": "numberOfMatches",
    "examples": [
      {
        "input": "n = 7",
        "output": "6"
      }
    ],
    "patternHints": [
      "n-1 matches",
      "Elimination"
    ],
    "starterCode": "var numberOfMatches = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var numberOfMatches = function (n) {\n\n\n  return n - 1;\n\n\n};",
    "sampleInput": "{\"n\":7}",
    "humanInput": "n = 7",
    "sampleOutput": "6",
    "sheetNumber": 192,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-193-max-consecutive-ones",
    "title": "Max Consecutive Ones",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Find maximum consecutive 1s in binary array.",
    "description": "<p>Given a binary array <code>nums</code>, return <em>the maximum number of consecutive </em><code>1</code><em>&#39;s in the array</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,0,1,1,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,1,1,0,1]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums[i]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "leetcodeSlug": "max-consecutive-ones",
    "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones/",
    "entryFunction": "findMaxConsecutiveOnes",
    "examples": [
      {
        "input": "nums = [1,1,0,1,1,1]",
        "output": "3"
      }
    ],
    "patternHints": [
      "Track current streak",
      "Reset on 0"
    ],
    "starterCode": "var findMaxConsecutiveOnes = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findMaxConsecutiveOnes = function (nums) {\n\n\n  let best = 0, cur = 0;\n  for (const x of nums) { if (x) { cur++; best = Math.max(best, cur); } else cur = 0; }\n  return best;\n\n\n};",
    "sampleInput": "{\"nums\":[1,1,0,1,1,1]}",
    "humanInput": "nums = [1,1,0,1,1,1]",
    "sampleOutput": "3",
    "sheetNumber": 193,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-194-rectangle-overlap",
    "title": "Rectangle Overlap",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Check if two axis-aligned rectangles overlap.",
    "description": "<p>An axis-aligned rectangle is represented as a list <code>[x1, y1, x2, y2]</code>, where <code>(x1, y1)</code> is the coordinate of its bottom-left corner, and <code>(x2, y2)</code> is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.</p>\n\n<p>Two rectangles overlap if the area of their intersection is <strong>positive</strong>. To be clear, two rectangles that only touch at the corner or edges do not overlap.</p>\n\n<p>Given two axis-aligned rectangles <code>rec1</code> and <code>rec2</code>, return <code>true</code><em> if they overlap, otherwise return </em><code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> rec1 = [0,0,2,2], rec2 = [1,1,3,3]\n<strong>Output:</strong> true\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> rec1 = [0,0,1,1], rec2 = [1,0,2,1]\n<strong>Output:</strong> false\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> rec1 = [0,0,1,1], rec2 = [2,2,3,3]\n<strong>Output:</strong> false\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>rec1.length == 4</code></li>\n\t<li><code>rec2.length == 4</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= rec1[i], rec2[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>rec1</code> and <code>rec2</code> represent a valid rectangle with a non-zero area.</li>\n</ul>\n",
    "leetcodeSlug": "rectangle-overlap",
    "leetcodeUrl": "https://leetcode.com/problems/rectangle-overlap/",
    "entryFunction": "isRectangleOverlap",
    "examples": [
      {
        "input": "rec1 = [0,0,2,2]\nrec2 = [1,1,3,3]",
        "output": "true"
      }
    ],
    "patternHints": [
      "Interval overlap",
      "Both axes"
    ],
    "starterCode": "var isRectangleOverlap = function (rec1, rec2) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var isRectangleOverlap = function (rec1, rec2) {\n\n\n  const [x1, y1, x2, y2] = rec1, [x3, y3, x4, y4] = rec2;\n  return !(x2 <= x3 || x4 <= x1 || y2 <= y3 || y4 <= y1);\n\n\n};",
    "sampleInput": "{\"rec1\":[0,0,2,2],\"rec2\":[1,1,3,3]}",
    "humanInput": "rec1 = [0,0,2,2]\nrec2 = [1,1,3,3]",
    "sampleOutput": "true",
    "sheetNumber": 194,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-195-excel-sheet-column",
    "title": "Excel Sheet Column",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "easy",
    "statement": "Convert Excel column title to number.",
    "examples": [
      {
        "input": "s = \"AB\"",
        "output": "28"
      }
    ],
    "patternHints": [
      "Base-26",
      "Accumulate"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  let n = 0;\n  for (const ch of input.s) n = n * 26 + (ch.charCodeAt(0) - 64);\n  return n;\n}",
    "sampleInput": "{\"s\":\"AB\"}",
    "humanInput": "s = \"AB\"",
    "sampleOutput": "28",
    "sheetNumber": 195,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-196-unique-paths",
    "title": "Unique Paths",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "medium",
    "statement": "Count unique paths in grid (duplicate of 182).",
    "description": "<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>\n\n<p>Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>\n\n<p>The test cases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png\" style=\"width: 400px; height: 183px;\" />\n<pre>\n<strong>Input:</strong> m = 3, n = 7\n<strong>Output:</strong> 28\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> m = 3, n = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -&gt; Down -&gt; Down\n2. Down -&gt; Down -&gt; Right\n3. Down -&gt; Right -&gt; Down\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n</ul>\n",
    "leetcodeSlug": "unique-paths",
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
    "entryFunction": "uniquePaths",
    "examples": [
      {
        "input": "m = 3\nn = 2",
        "output": "3"
      }
    ],
    "patternHints": [
      "Combinatorics DP",
      "Right and down"
    ],
    "starterCode": "var uniquePaths = function (m, n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var uniquePaths = function (m, n) {\n\n\n  const dp = Array.from({ length: m }, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[m - 1][n - 1];\n\n\n};",
    "sampleInput": "{\"m\":3,\"n\":2}",
    "humanInput": "m = 3\nn = 2",
    "sampleOutput": "3",
    "sheetNumber": 196,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-197-rectangle-area",
    "title": "Rectangle Area",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "medium",
    "statement": "Compute total area covered by two rectangles.",
    "description": "<p>Given the coordinates of two <strong>rectilinear</strong> rectangles in a 2D plane, return <em>the total area covered by the two rectangles</em>.</p>\n\n<p>The first rectangle is defined by its <strong>bottom-left</strong> corner <code>(ax1, ay1)</code> and its <strong>top-right</strong> corner <code>(ax2, ay2)</code>.</p>\n\n<p>The second rectangle is defined by its <strong>bottom-left</strong> corner <code>(bx1, by1)</code> and its <strong>top-right</strong> corner <code>(bx2, by2)</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"Rectangle Area\" src=\"https://assets.leetcode.com/uploads/2021/05/08/rectangle-plane.png\" style=\"width: 700px; height: 365px;\" />\n<pre>\n<strong>Input:</strong> ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2\n<strong>Output:</strong> 45\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2\n<strong>Output:</strong> 16\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>4</sup> &lt;= ax1 &lt;= ax2 &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= ay1 &lt;= ay2 &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= bx1 &lt;= bx2 &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= by1 &lt;= by2 &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "rectangle-area",
    "leetcodeUrl": "https://leetcode.com/problems/rectangle-area/",
    "entryFunction": "computeArea",
    "examples": [
      {
        "input": "ax1 = -3\nay1 = 0\nax2 = 3\nay2 = 4\nbx1 = 0\nby1 = -1\nbx2 = 9\nby2 = 2",
        "output": "45"
      }
    ],
    "patternHints": [
      "Union area formula",
      "Overlap subtract"
    ],
    "starterCode": "var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {\n\n  // TODO\n\n};",
    "solutionCode": "var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {\n\n  const area = (x1, y1, x2, y2) => Math.max(0, x2 - x1) * Math.max(0, y2 - y1);\n  const a = area(ax1, ay1, ax2, ay2) + area(bx1, by1, bx2, by2);\n  const ox = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n  const oy = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n  return a - ox * oy;\n\n};",
    "sampleInput": "{\"ax1\":-3,\"ay1\":0,\"ax2\":3,\"ay2\":4,\"bx1\":0,\"by1\":-1,\"bx2\":9,\"by2\":2}",
    "humanInput": "ax1 = -3\nay1 = 0\nax2 = 3\nay2 = 4\nbx1 = 0\nby1 = -1\nbx2 = 9\nby2 = 2",
    "sampleOutput": "45",
    "sheetNumber": 197,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-198-check-if-array-pairs-are-divisible-by-k",
    "title": "Check If Array Pairs Are Divisible by k",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "medium",
    "statement": "Check if array pairs are divisible by k.",
    "description": "<p>Given an array of integers <code>arr</code> of even length <code>n</code> and an integer <code>k</code>.</p>\n\n<p>We want to divide the array into exactly <code>n / 2</code> pairs such that the sum of each pair is divisible by <code>k</code>.</p>\n\n<p>Return <code>true</code><em> If you can find a way to do that or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [1,2,3,4,5,10,6,7,8,9], k = 5\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [1,2,3,4,5,6], k = 7\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Pairs are (1,6),(2,5) and(3,4).\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> arr = [1,2,3,4,5,6], k = 10\n<strong>Output:</strong> false\n<strong>Explanation:</strong> You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>arr.length == n</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>n</code> is even.</li>\n\t<li><code>-10<sup>9</sup> &lt;= arr[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "check-if-array-pairs-are-divisible-by-k",
    "leetcodeUrl": "https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/",
    "entryFunction": "canArrange",
    "examples": [
      {
        "input": "arr = [1,2,3,4,5,10,6,7,8,9]\nk = 5",
        "output": "true"
      }
    ],
    "patternHints": [
      "Count mod k",
      "Complement pairs"
    ],
    "starterCode": "var canArrange = function (arr, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var canArrange = function (arr, k) {\n\n\n  const cnt = Array(k).fill(0);\n  for (const x of arr) cnt[x % k]++;\n  if (cnt[0] % 2) return false;\n  for (let r = 1; r < k; r++) if (cnt[r] !== cnt[k - r]) return false;\n  return true;\n\n\n};",
    "sampleInput": "{\"arr\":[1,2,3,4,5,10,6,7,8,9],\"k\":5}",
    "humanInput": "arr = [1,2,3,4,5,10,6,7,8,9]\nk = 5",
    "sampleOutput": "true",
    "sheetNumber": 198,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-199-factorial-trailing-zeroes",
    "title": "Factorial Trailing Zeroes",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "medium",
    "statement": "Count trailing zeroes in n factorial.",
    "description": "<p>Given an integer <code>n</code>, return <em>the number of trailing zeroes in </em><code>n!</code>.</p>\n\n<p>Note that <code>n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> 3! = 6, no trailing zero.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 5\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 5! = 120, one trailing zero.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you write a solution that works in logarithmic time complexity?</p>\n",
    "leetcodeSlug": "factorial-trailing-zeroes",
    "leetcodeUrl": "https://leetcode.com/problems/factorial-trailing-zeroes/",
    "entryFunction": "trailingZeroes",
    "examples": [
      {
        "input": "n = 5",
        "output": "1"
      }
    ],
    "patternHints": [
      "Count factors of 5",
      "Divide by 5"
    ],
    "starterCode": "var trailingZeroes = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var trailingZeroes = function (n) {\n\n\n  let c = 0;\n  for (let p = 5; p <= n; p *= 5) c += Math.floor(n / p);\n  return c;\n\n\n};",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
    "sampleOutput": "1",
    "sheetNumber": 199,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-200-nth-magical-number",
    "title": "Nth Magical Number",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "hard",
    "statement": "Find nth magical number (divisible by a or b).",
    "description": "<p>A positive integer is <em>magical</em> if it is divisible by either <code>a</code> or <code>b</code>.</p>\n\n<p>Given the three integers <code>n</code>, <code>a</code>, and <code>b</code>, return the <code>n<sup>th</sup></code> magical number. Since the answer may be very large, <strong>return it modulo </strong><code>10<sup>9</sup> + 7</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, a = 2, b = 3\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4, a = 2, b = 3\n<strong>Output:</strong> 6\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>\n\t<li><code>2 &lt;= a, b &lt;= 4 * 10<sup>4</sup></code></li>\n</ul>\n",
    "leetcodeSlug": "nth-magical-number",
    "leetcodeUrl": "https://leetcode.com/problems/nth-magical-number/",
    "entryFunction": "nthMagicalNumber",
    "examples": [
      {
        "input": "n = 1\na = 2\nb = 3",
        "output": "2"
      }
    ],
    "patternHints": [
      "Binary search",
      "Count divisible"
    ],
    "starterCode": "var nthMagicalNumber = function (n, a, b) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var nthMagicalNumber = function (n, a, b) {\n\n\n  const g = (x, y) => (y ? g(y, x % y) : x);\n  const lcm = (a * b) / g(a, b);\n  const count = (x) => Math.floor(x / a) + Math.floor(x / b) - Math.floor(x / lcm);\n  let lo = 1, hi = 1e15;\n  while (lo < hi) { const m = (lo + hi) >> 1; if (count(m) < n) lo = m + 1; else hi = m; }\n  return lo % (1e9 + 7);\n\n\n};",
    "sampleInput": "{\"n\":1,\"a\":2,\"b\":3}",
    "humanInput": "n = 1\na = 2\nb = 3",
    "sampleOutput": "2",
    "sheetNumber": 200,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-201-permutation-sequence",
    "title": "Permutation Sequence",
    "patternSlug": "math",
    "patternName": "Math",
    "difficulty": "hard",
    "statement": "Find kth permutation sequence of 1..n.",
    "description": "<p>The set <code>[1, 2, 3, ...,&nbsp;n]</code> contains a total of <code>n!</code> unique permutations.</p>\n\n<p>By listing and labeling all of the permutations in order, we get the following sequence for <code>n = 3</code>:</p>\n\n<ol>\n\t<li><code>&quot;123&quot;</code></li>\n\t<li><code>&quot;132&quot;</code></li>\n\t<li><code>&quot;213&quot;</code></li>\n\t<li><code>&quot;231&quot;</code></li>\n\t<li><code>&quot;312&quot;</code></li>\n\t<li><code>&quot;321&quot;</code></li>\n</ol>\n\n<p>Given <code>n</code> and <code>k</code>, return the <code>k<sup>th</sup></code> permutation sequence.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 3, k = 3\n<strong>Output:</strong> \"213\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 4, k = 9\n<strong>Output:</strong> \"2314\"\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> n = 3, k = 1\n<strong>Output:</strong> \"123\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n\t<li><code>1 &lt;= k &lt;= n!</code></li>\n</ul>\n",
    "leetcodeSlug": "permutation-sequence",
    "leetcodeUrl": "https://leetcode.com/problems/permutation-sequence/",
    "entryFunction": "getPermutation",
    "examples": [
      {
        "input": "n = 3\nk = 3",
        "output": "\"213\""
      }
    ],
    "patternHints": [
      "Factorial system",
      "Build string"
    ],
    "starterCode": "var getPermutation = function (n, k) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var getPermutation = function (n, k) {\n\n\n  const nums = Array.from({ length: n }, (_, i) => i + 1);\n  const fact = [1];\n  for (let i = 1; i < n; i++) fact[i] = fact[i - 1] * i;\n  let ki = k - 1, out = '';\n  for (let i = n; i > 0; i--) {\n    const idx = Math.floor(ki / fact[i - 1]);\n    out += nums.splice(idx, 1)[0];\n    ki %= fact[i - 1];\n  }\n  return out;\n\n\n};",
    "sampleInput": "{\"n\":3,\"k\":3}",
    "humanInput": "n = 3\nk = 3",
    "sampleOutput": "\"213\"",
    "sheetNumber": 201,
    "sheetSectionId": "math",
    "sheetSubsectionId": "math-math",
    "source": "sheet"
  },
  {
    "id": "bc-202-single-number",
    "title": "Single Number",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "easy",
    "statement": "Find single number that appears once.",
    "description": "<p>Given a <strong>non-empty</strong>&nbsp;array of integers <code>nums</code>, every element appears <em>twice</em> except for one. Find that single one.</p>\n\n<p>You must&nbsp;implement a solution with a linear runtime complexity and use&nbsp;only constant&nbsp;extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [2,2,1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [4,1,2,1,2]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">4</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li>Each element in the array appears twice except for one element which appears only once.</li>\n</ul>\n",
    "leetcodeSlug": "single-number",
    "leetcodeUrl": "https://leetcode.com/problems/single-number/",
    "entryFunction": "singleNumber",
    "examples": [
      {
        "input": "nums = [4,1,2,1,2]",
        "output": "4"
      }
    ],
    "patternHints": [
      "XOR all",
      "Pairs cancel"
    ],
    "starterCode": "var singleNumber = function (nums) {\n\n  // TODO\n\n};",
    "solutionCode": "var singleNumber = function (nums) {\n\n  return nums.reduce((a, b) => a ^ b, 0);\n\n};",
    "sampleInput": "{\"nums\":[4,1,2,1,2]}",
    "humanInput": "nums = [4,1,2,1,2]",
    "sampleOutput": "4",
    "sheetNumber": 202,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-203-reverse-bits",
    "title": "Reverse Bits",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "easy",
    "statement": "Reverse bits of 32-bit integer.",
    "description": "<p>Reverse bits of a given 32 bits signed integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 43261596</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">964176192</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<th>Integer</th>\n\t\t\t<th>Binary</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>43261596</td>\n\t\t\t<td>00000010100101000001111010011100</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>964176192</td>\n\t\t\t<td>00111001011110000010100101000000</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 2147483644</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1073741822</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<th>Integer</th>\n\t\t\t<th>Binary</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>2147483644</td>\n\t\t\t<td>01111111111111111111111111111100</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>1073741822</td>\n\t\t\t<td>00111111111111111111111111111110</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 2<sup>31</sup> - 2</code></li>\n\t<li><code>n</code> is even.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> If this function is called many times, how would you optimize it?</p>\n",
    "leetcodeSlug": "reverse-bits",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-bits/",
    "entryFunction": "reverseBits",
    "examples": [
      {
        "input": "n = 43261596",
        "output": "964176192"
      }
    ],
    "patternHints": [
      "Shift and OR",
      "32 iterations"
    ],
    "starterCode": "var reverseBits = function (n) {\n\n  // TODO\n\n};",
    "solutionCode": "var reverseBits = function (n) {\n\n  let n = n >>> 0, res = 0;\n  for (let i = 0; i < 32; i++) { res = (res << 1) | (n & 1); n >>= 1; }\n  return res >>> 0;\n\n};",
    "sampleInput": "{\"n\":43261596}",
    "humanInput": "n = 43261596",
    "sampleOutput": "964176192",
    "sheetNumber": 203,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-204-single-number-ii",
    "title": "Single Number II",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "medium",
    "statement": "Find single number appearing once; others thrice.",
    "description": "<p>Given an integer array <code>nums</code> where&nbsp;every element appears <strong>three times</strong> except for one, which appears <strong>exactly once</strong>. <em>Find the single element and return it</em>.</p>\n\n<p>You must&nbsp;implement a solution with a linear runtime complexity and use&nbsp;only constant&nbsp;extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [2,2,3,2]\n<strong>Output:</strong> 3\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0,1,0,1,0,1,99]\n<strong>Output:</strong> 99\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>Each element in <code>nums</code> appears exactly <strong>three times</strong> except for one element which appears <strong>once</strong>.</li>\n</ul>\n",
    "leetcodeSlug": "single-number-ii",
    "leetcodeUrl": "https://leetcode.com/problems/single-number-ii/",
    "entryFunction": "singleNumber",
    "examples": [
      {
        "input": "nums = [2,2,3,2]",
        "output": "3"
      }
    ],
    "patternHints": [
      "Bit count mod 3",
      "Or ones/twos"
    ],
    "starterCode": "var singleNumber = function (nums) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var singleNumber = function (nums) {\n\n\n  let ones = 0, twos = 0;\n  for (const x of nums) {\n    ones = (ones ^ x) & ~twos;\n    twos = (twos ^ x) & ~ones;\n  }\n  return ones;\n\n\n};",
    "sampleInput": "{\"nums\":[2,2,3,2]}",
    "humanInput": "nums = [2,2,3,2]",
    "sampleOutput": "3",
    "sheetNumber": 204,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-205-number-of-1-bits",
    "title": "Number of 1 Bits",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "easy",
    "statement": "Count number of 1 bits (Hamming weight).",
    "description": "<p>Given a positive integer <code>n</code>, write a function that returns the number of <span data-keyword=\"set-bit\">set bits</span> in its binary representation (also known as the <a href=\"http://en.wikipedia.org/wiki/Hamming_weight\" target=\"_blank\">Hamming weight</a>).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 11</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">3</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The input binary string <strong>1011</strong> has a total of three set bits.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 128</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The input binary string <strong>10000000</strong> has a total of one set bit.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 2147483645</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">30</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The input binary string <strong>1111111111111111111111111111101</strong> has a total of thirty set bits.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> If this function is called many times, how would you optimize it?",
    "leetcodeSlug": "number-of-1-bits",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "entryFunction": "hammingWeight",
    "examples": [
      {
        "input": "n = 11",
        "output": "3"
      }
    ],
    "patternHints": [
      "n & n-1",
      "Or shift"
    ],
    "starterCode": "var hammingWeight = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var hammingWeight = function (n) {\n\n\n  let c = 0;\n  while (n) { n &= n - 1; c++; }\n  return c;\n\n\n};",
    "sampleInput": "{\"n\":11}",
    "humanInput": "n = 11",
    "sampleOutput": "3",
    "sheetNumber": 205,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-206-factorial-trailing-zeroes",
    "title": "Factorial Trailing Zeroes",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "medium",
    "statement": "Trailing zeroes in n factorial.",
    "description": "<p>Given an integer <code>n</code>, return <em>the number of trailing zeroes in </em><code>n!</code>.</p>\n\n<p>Note that <code>n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> 3! = 6, no trailing zero.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 5\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 5! = 120, one trailing zero.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you write a solution that works in logarithmic time complexity?</p>\n",
    "leetcodeSlug": "factorial-trailing-zeroes",
    "leetcodeUrl": "https://leetcode.com/problems/factorial-trailing-zeroes/",
    "entryFunction": "trailingZeroes",
    "examples": [
      {
        "input": "n = 5",
        "output": "1"
      }
    ],
    "patternHints": [
      "Count fives",
      "Same as 199"
    ],
    "starterCode": "var trailingZeroes = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var trailingZeroes = function (n) {\n\n\n  let c = 0;\n  for (let p = 5; p <= n; p *= 5) c += Math.floor(n / p);\n  return c;\n\n\n};",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
    "sampleOutput": "1",
    "sheetNumber": 206,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-207-binary-number-with-alternating-bits",
    "title": "Binary Number with Alternating Bits",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "easy",
    "statement": "Check if binary number has alternating bits.",
    "description": "<p>Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 5\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The binary representation of 5 is: 101\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 7\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The binary representation of 7 is: 111.</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 11\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The binary representation of 11 is: 1011.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "leetcodeSlug": "binary-number-with-alternating-bits",
    "leetcodeUrl": "https://leetcode.com/problems/binary-number-with-alternating-bits/",
    "entryFunction": "hasAlternatingBits",
    "examples": [
      {
        "input": "n = 5",
        "output": "true"
      }
    ],
    "patternHints": [
      "XOR shift",
      "Power of two check"
    ],
    "starterCode": "var hasAlternatingBits = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var hasAlternatingBits = function (n) {\n\n\n  const x = n ^ (n >> 1);\n  return x > 0 && (x & (x + 1)) === 0;\n\n\n};",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
    "sampleOutput": "true",
    "sheetNumber": 207,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-208-number-of-even-and-odd-bits",
    "title": "Number of Even and Odd Bits",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "easy",
    "statement": "Count even and odd bits in range [0, num].",
    "description": "<p>You are given a <strong>positive</strong> integer <code>n</code>.</p>\n\n<p>Let <code>even</code> denote the number of even indices in the binary representation of <code>n</code> with value 1.</p>\n\n<p>Let <code>odd</code> denote the number of odd indices in the binary representation of <code>n</code> with value 1.</p>\n\n<p>Note that bits are indexed from <strong>right to left</strong> in the binary representation of a number.</p>\n\n<p>Return the array <code>[even, odd]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 50</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The binary representation of 50 is <code>110010</code>.</p>\n\n<p>It contains 1 on indices 1, 4, and 5.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 2</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[0,1]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The binary representation of 2 is <code>10</code>.</p>\n\n<p>It contains 1 only on index 1.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 1000</code></li>\n</ul>\n",
    "leetcodeSlug": "number-of-even-and-odd-bits",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-even-and-odd-bits/",
    "entryFunction": "evenOddBit",
    "examples": [
      {
        "input": "n = 5",
        "output": "[null,null]"
      }
    ],
    "patternHints": [
      "DP bit patterns",
      "Or iterate"
    ],
    "starterCode": "var evenOddBit = function (n) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var evenOddBit = function (n) {\n\n\n  const even = [1, 0], odd = [0, 1];\n  for (let i = 1; i <= n; i++) {\n    even.push((even[i] + odd[i]) % (1e9 + 7));\n    odd.push((even[i - 1] + odd[i - 1]) % (1e9 + 7));\n  }\n  return [even[n], odd[n]];\n\n\n};",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
    "sampleOutput": "[\n  null,\n  null\n]",
    "sheetNumber": 208,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-bit-manipulation-tricks",
    "source": "sheet"
  },
  {
    "id": "bc-209-find-the-index-of-the-first-occurrence-in-a-stri",
    "title": "Find the Index of the First Occurrence in a String",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "easy",
    "statement": "Find index of first occurrence of needle in haystack.",
    "description": "<p>Given two strings <code>needle</code> and <code>haystack</code>, return the index of the first occurrence of <code>needle</code> in <code>haystack</code>, or <code>-1</code> if <code>needle</code> is not part of <code>haystack</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> haystack = &quot;sadbutsad&quot;, needle = &quot;sad&quot;\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> &quot;sad&quot; occurs at index 0 and 6.\nThe first occurrence is at index 0, so we return 0.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> haystack = &quot;leetcode&quot;, needle = &quot;leeto&quot;\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> &quot;leeto&quot; did not occur in &quot;leetcode&quot;, so we return -1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= haystack.length, needle.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>haystack</code> and <code>needle</code> consist of only lowercase English characters.</li>\n</ul>\n",
    "leetcodeSlug": "find-the-index-of-the-first-occurrence-in-a-string",
    "leetcodeUrl": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    "entryFunction": "strStr",
    "examples": [
      {
        "input": "haystack = \"sadbutsad\"\nneedle = \"sad\"",
        "output": "0"
      }
    ],
    "patternHints": [
      "Built-in or KMP",
      "Substring search"
    ],
    "starterCode": "var strStr = function (haystack, needle) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var strStr = function (haystack, needle) {\n\n\n  const i = haystack.indexOf(needle);\n  return i === -1 ? -1 : i;\n\n\n};",
    "sampleInput": "{\"haystack\":\"sadbutsad\",\"needle\":\"sad\"}",
    "humanInput": "haystack = \"sadbutsad\"\nneedle = \"sad\"",
    "sampleOutput": "0",
    "sheetNumber": 209,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-rabin-karp-rolling-hash",
    "source": "sheet"
  },
  {
    "id": "bc-210-repeated-dna-sequences",
    "title": "Repeated DNA Sequences",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "medium",
    "statement": "Find all repeated 10-letter DNA sequences.",
    "description": "<p>The <strong>DNA sequence</strong> is composed of a series of nucleotides abbreviated as <code>&#39;A&#39;</code>, <code>&#39;C&#39;</code>, <code>&#39;G&#39;</code>, and <code>&#39;T&#39;</code>.</p>\n\n<ul>\n\t<li>For example, <code>&quot;ACGAATTCCG&quot;</code> is a <strong>DNA sequence</strong>.</li>\n</ul>\n\n<p>When studying <strong>DNA</strong>, it is useful to identify repeated sequences within the DNA.</p>\n\n<p>Given a string <code>s</code> that represents a <strong>DNA sequence</strong>, return all the <strong><code>10</code>-letter-long</strong> sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"\n<strong>Output:</strong> [\"AAAAACCCCC\",\"CCCCCAAAAA\"]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"AAAAAAAAAAAAA\"\n<strong>Output:</strong> [\"AAAAAAAAAA\"]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s[i]</code> is either <code>&#39;A&#39;</code>, <code>&#39;C&#39;</code>, <code>&#39;G&#39;</code>, or <code>&#39;T&#39;</code>.</li>\n</ul>\n",
    "leetcodeSlug": "repeated-dna-sequences",
    "leetcodeUrl": "https://leetcode.com/problems/repeated-dna-sequences/",
    "entryFunction": "findRepeatedDnaSequences",
    "examples": [
      {
        "input": "s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"",
        "output": "[\"AAAAACCCCC\",\"CCCCCAAAAA\"]"
      }
    ],
    "patternHints": [
      "Rolling hash or set",
      "Slice substrings"
    ],
    "starterCode": "var findRepeatedDnaSequences = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var findRepeatedDnaSequences = function (s) {\n\n\n  const seen = new Set(), out = new Set();\n  for (let i = 0; i + 10 <= s.length; i++) {\n    const sub = s.slice(i, i + 10);\n    if (seen.has(sub)) out.add(sub);\n    else seen.add(sub);\n  }\n  return [...out];\n\n\n};",
    "sampleInput": "{\"s\":\"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"}",
    "humanInput": "s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"",
    "sampleOutput": "[\n  \"AAAAACCCCC\",\n  \"CCCCCAAAAA\"\n]",
    "sheetNumber": 210,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-rabin-karp-rolling-hash",
    "source": "sheet"
  },
  {
    "id": "bc-211-longest-duplicate-substring",
    "title": "Longest Duplicate Substring",
    "patternSlug": "bitwise-xor",
    "patternName": "Miscellaneous",
    "difficulty": "hard",
    "statement": "Longest duplicate substring in string.",
    "description": "<p>Given a string <code>s</code>, consider all <em>duplicated substrings</em>: (contiguous) substrings of s that occur 2 or more times.&nbsp;The occurrences&nbsp;may overlap.</p>\n\n<p>Return <strong>any</strong> duplicated&nbsp;substring that has the longest possible length.&nbsp;If <code>s</code> does not have a duplicated substring, the answer is <code>&quot;&quot;</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"banana\"\n<strong>Output:</strong> \"ana\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"abcd\"\n<strong>Output:</strong> \"\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of lowercase English letters.</li>\n</ul>\n",
    "leetcodeSlug": "longest-duplicate-substring",
    "leetcodeUrl": "https://leetcode.com/problems/longest-duplicate-substring/",
    "entryFunction": "longestDupSubstring",
    "examples": [
      {
        "input": "s = \"banana\"",
        "output": "\"ana\""
      }
    ],
    "patternHints": [
      "Binary search length",
      "Hash seen substrings"
    ],
    "starterCode": "var longestDupSubstring = function (s) {\n\n\n  // TODO\n\n\n};",
    "solutionCode": "var longestDupSubstring = function (s) {\n\n\n  const n = s.length;\n  const find = (len) => {\n    const seen = new Set();\n    for (let i = 0; i + len <= n; i++) {\n      const sub = s.slice(i, i + len);\n      if (seen.has(sub)) return sub;\n      seen.add(sub);\n    }\n    return '';\n  };\n  let lo = 0, hi = n - 1, best = '';\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    const sub = find(mid);\n    if (sub) { best = sub; lo = mid + 1; } else hi = mid - 1;\n  }\n  return best;\n\n\n};",
    "sampleInput": "{\"s\":\"banana\"}",
    "humanInput": "s = \"banana\"",
    "sampleOutput": "\"ana\"",
    "sheetNumber": 211,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-rabin-karp-rolling-hash",
    "source": "sheet"
  }
];
