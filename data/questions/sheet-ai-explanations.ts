/* Auto-generated — run: npm run generate:explanations */
import type { AiExplainCommentary } from "@/types/ai-explain";

export const sheetAiExplanationsByQuestionId: Record<string, AiExplainCommentary> = {
  "bc-001-richest-customer-wealth": {
    "summary": "Sheet #1 — Richest customer wealth\n\nProblem: Return the maximum wealth among all customers.\nExample:\n\naccounts = [[1,2,3],[3,2,1]]\n\nOutput: 6\n\nYour solution uses **Sum each row**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar maximumWealth = function (accounts) {\n    let maxWealth = 0\n    for (let account of accounts) {\n        let wealth = account.reduce((acc, curr) => acc + curr, 0)\n        maxWealth = Math.max(maxWealth, wealth)\n    }\n    return maxWealth;\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\naccounts = [[1,2,3],[3,2,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Sum each row",
      "Time: O(n)",
      "Space: O(1)",
      "Sum each row",
      "Track maximum"
    ]
  },
  "bc-002-two-sum": {
    "summary": "Sheet #2 — Two Sum\n\nProblem: Find two indices where nums[i] + nums[j] equals target.\nExample:\n\nnums = [2,7,11,15]\ntarget = 9\n\nOutput: [\n  0,\n  1\n]\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar twoSum = function (nums, target) {\n    const history = new Map()\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i]\n        if (history.has(diff)) {\n            return [history.get(diff), i]\n        } else {\n            history.set(nums[i], i)\n        }\n    }\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,7,11,15]\ntarget = 9\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: [\n  0,\n  1\n]",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Hash map complement",
      "One pass"
    ]
  },
  "bc-003-count-negative-numbers-in-a-sorted-matrix": {
    "summary": "Sheet #3 — Count negative numbers in a sorted matrix\n\nProblem: Count negative numbers in each sorted matrix row.\nExample:\n\ngrid = [[4,3,2,-1],[3,2,1,-1]]\n\nOutput: 2\n\nYour solution uses **Start from right**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar countNegatives = function (grid) {\n    let m = grid.length;\n    let n = grid[0].length;\n    let row = m - 1 // last row\n    let col = 0\n    let count = 0\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nwhile (row >= 0 && col < n) {\n        if (grid[row][col] < 0) { // first -ve num\n            count += (n - col)\n            row--;\n        } else {\n            col++;\n        }\n    }\n    return count;\n};\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ngrid = [[4,3,2,-1],[3,2,1,-1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Start from right",
      "Time: O(n)",
      "Space: O(1)",
      "Start from right",
      "Row sorted"
    ]
  },
  "bc-004-next-permutation": {
    "summary": "Sheet #4 — Next permutation\n\nProblem: Return the next lexicographically greater permutation.\nExample:\n\nnums = [1,2,3]\n\nOutput: [\n  1,\n  3,\n  2\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar nextPermutation = function (nums) {\n    let n = nums.length;\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: STEP 1: find breaking point\n\n```js\nlet pivot = -1;\n    for (let i = n - 2; i >= 0; i--) {\n        if (nums[i] < nums[i + 1]) {\n            pivot = i;\n            break;\n        }\n    }\n```\n\nSTEP 1: find breaking point:\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 3: if no pivot => reverse whole array\n\n```js\nif (pivot === -1) {\n        nums.reverse();\n        return;\n    }\n```\n\nif no pivot => reverse whole array:\nReturn the final computed result.\n\n---\n\n## Step 4: STEP 2: find next greater element\n\n```js\nfor (let i = n - 1; i > pivot; i--) {\n        if (nums[i] > nums[pivot]) {\n            [nums[i], nums[pivot]] = [nums[pivot], nums[i]];\n            break;\n        }\n    }\n```\n\nSTEP 2: find next greater element:\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 5: STEP 3: reverse suffix\n\n```js\nlet left = pivot + 1;\n    let right = n - 1;\n    while (left < right) {\n        [nums[left], nums[right]] = [nums[right], nums[left]];\n        left++;\n        right--;\n    }\n}\n```\n\nSTEP 3: reverse suffix:\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  3,\n  2\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Find pivot",
      "Reverse suffix"
    ]
  },
  "bc-005-linked-lists": {
    "summary": "Sheet #5 — Linked Lists\n\nProblem: Find the median of two sorted arrays.\nExample:\n\na = [1,3]\nb = [2]\n\nOutput: 2\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar findMedianSortedArrays = function (nums1, nums2) {\n    const result = [...nums1, ...nums2].sort((a, b) => a - b)\n    const n = result.length\n    let median = 0\n    if (n % 2 === 0) {\n        median = (result[Math.floor(n / 2)] + result[Math.floor(n / 2) - 1]) / 2\n    } else {\n        median = result[Math.floor(n / 2)]\n    }\n    return median\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\na = [1,3]\nb = [2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Binary search partition",
      "Compare halves"
    ]
  },
  "bc-006-find-greatest-common-divisor-of-array": {
    "summary": "Sheet #6 — Find greatest common divisor of array\n\nProblem: Return the GCD of all numbers in the array.\nExample:\n\nnums = [2,4,6,8]\n\nOutput: 2\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar findGCD = function (nums) {\n    const arr = nums.sort((a, b) => a - b)\n    let maxCommon = 1\n    for (let i = 0; i <= arr[0]; i++) {\n        if (arr[arr.length - 1] % i === 0 && arr[0] % i === 0) {\n            maxCommon = Math.max(maxCommon, i)\n        }\n    }\n    return maxCommon\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,4,6,8]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Euclid gcd",
      "Reduce array"
    ]
  },
  "bc-007-self-dividing-numbers": {
    "summary": "Sheet #7 — Self dividing numbers\n\nProblem: Return all self-dividing numbers in [left, right].\nExample:\n\nleft = 1\nright = 22\n\nOutput: [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar selfDividingNumbers = function (left, right) {\n    if (left > right) return []\n    const result = []\n    for (let i = left; i <= right; i++) {\n        let temp = i.toString().split('')\n        let count = 0\n        for (let j = 0; j < temp.length; j++) {\n            if (i % Number(temp[j]) === 0) {\n                count++\n            }\n            if (count === temp.length) {\n                result.push(i)\n            }\n        }\n    }\n    return result\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nleft = 1\nright = 22\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Check digits divide n",
      "Skip zero digits"
    ]
  },
  "bc-008-inversion-of-array-1587115620": {
    "summary": "Sheet #8 — Inversion of array - 1587115620\n\nProblem: Count inversions in the array.\nExample:\n\nnums = [5,2,6,1]\n\nOutput: 4\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(nums) {\n  const a = nums.slice();\n  const sort = (l, r) => {\n    if (r - l <= 1) return 0;\n    const m = (l + r) >> 1;\n    let c = sort(l, m) + sort(m, r), i = l, j = m, tmp = [];\n    while (i < m || j < r) {\n      if (j >= r || (i < m && a[i] <= a[j])) tmp.push(a[i++]);\n      else { tmp.push(a[j++]); c += m - i; }\n    }\n    for (let k = l; k < r; k++) a[k] = tmp[k - l];\n    return c;\n  };\n  return sort(0, a.length);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [5,2,6,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Merge sort count",
      "Split merge"
    ]
  },
  "bc-009-reverse-pairs": {
    "summary": "Sheet #9 — Reverse pairs\n\nProblem: Count pairs i<j with nums[i] > 2*nums[j].\nExample:\n\nnums = [1,3,2,3,1]\n\nOutput: 2\n\nYour solution uses **Binary Search + Sorting + Merge Pattern**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar reversePairs = function (nums) {\n    let count = 0;\n    const mergeSort = (left, right) => {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: base case\n\n```js\nif (left >= right) return;\n        let mid = Math.floor((left + right) / 2);\n        mergeSort(left, mid);\n        mergeSort(mid + 1, right);\n```\n\nbase case:\nCompute `mid` as the middle index. Compare `nums[mid]` with the target and discard half the search space.\nReturn the final computed result.\n\n---\n\n## Step 3: count reverse pairs\n\n```js\nlet j = mid + 1;\n        for (let i = left; i <= mid; i++) {\n            while (j <= right && nums[i] > 2 * nums[j]) {\n                j++;\n            }\n            count += j - (mid + 1);\n        }\n```\n\ncount reverse pairs:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 4: merge step\n\n```js\nlet temp = [];\n        let i = left;\n        j = mid + 1;\n        while (i <= mid && j <= right) {\n            if (nums[i] <= nums[j]) {\n                temp.push(nums[i]);\n                i++;\n            } else {\n                temp.push(nums[j]);\n                j++;\n            }\n        }\n        while (i <= mid) {\n            temp.push(nums[i]);\n            i++;\n        }\n        while (j <= right) {\n            temp.push(nums[j]);\n            j++;\n        }\n        for (let k = left; k <= right; k++) {\n            nums[k] = temp[k - left];\n        }\n    };\n\n    mergeSort(0, nums.length - 1);\n    return count;\n};\n```\n\nmerge step:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,3,2,3,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Binary Search + Sorting + Merge Pattern",
      "Time: O(log n)",
      "Space: O(1)",
      "Merge sort",
      "Count before merge"
    ]
  },
  "bc-010-special-positions-in-a-binary-matrix": {
    "summary": "Sheet #10 — Special positions in a binary matrix\n\nProblem: Count 1-cells that are alone in their row and column.\nExample:\n\nnums = [[1,0,0],[0,1,0],[0,0,1]]\n\nOutput: 3\n\nYour solution uses **Row/col counts**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar numSpecial = function (mat) {\n    let m = mat.length\n    let n = mat[0].length\n    let rowCount = new Array(m).fill(0)\n    let colCount = new Array(n).fill(0)\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 1) {\n                rowCount[i]++\n                colCount[j]++\n            }\n        }\n    }\n    let count = 0\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 1 && rowCount[i] === 1 && colCount[j] === 1) {\n                count++;\n            }\n        }\n    }\n    return count\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [[1,0,0],[0,1,0],[0,0,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Row/col counts",
      "Time: O(n²)",
      "Space: O(1)",
      "Row/col counts",
      "Check special cells"
    ]
  },
  "bc-011-transpose-matrix": {
    "summary": "Sheet #11 — Transpose Matrix\n\nProblem: Return the transpose of the matrix.\nExample:\n\nmatrix = [[1,2,3],[4,5,6]]\n\nOutput: [\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    5\n  ],\n  [\n    3,\n    6\n  ]\n]\n\nYour solution uses **Swap indices**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar transpose = function (matrix) {\n    let m = matrix.length\n    let n = matrix[0].length\n    let result = new Array(n).fill(0).map(() => new Array(m))\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let i = 0; i < n; i++) {\n        for (let j = 0; j < m; j++) {\n            result[i][j] = matrix[j][i]\n        }\n    }\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 3: Step 3\n\n```js\nreturn result\n};\n```\n\nStep 3:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nmatrix = [[1,2,3],[4,5,6]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    5\n  ],\n  [\n    3,\n    6\n  ]\n]",
    "keyIdeas": [
      "Pattern: Swap indices",
      "Time: O(n²)",
      "Space: O(1)",
      "Swap indices",
      "New rows from columns"
    ]
  },
  "bc-012-01-matrix": {
    "summary": "Sheet #12 — 01 Matrix\n\nProblem: Return distance to nearest 0 for each cell.\nExample:\n\nnums = [[0,0,0],[0,1,0],[0,0,0]]\n\nOutput: [\n  [\n    0,\n    0,\n    0\n  ],\n  [\n    0,\n    1,\n    0\n  ],\n  [\n    0,\n    0,\n    0\n  ]\n]\n\nYour solution uses **BFS**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar updateMatrix = function (mat) {\n    let m = mat.length;\n    let n = mat[0].length;\n    let queue = [];\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: and mark 1s as Infinity\n\n```js\nfor (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 0) {\n                queue.push([i, j]);\n            } else {\n                mat[i][j] = Infinity;\n            }\n        }\n    }\n```\n\nand mark 1s as Infinity:\nScan elements one by one; body runs once per index/character/node.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: 4 directions\n\n```js\nlet dirs = [[1, 0], [-1, 0],[0, 1],[0, -1]];\n```\n\n4 directions:\nExecute the BFS logic in this block.\n\n---\n\n## Step 4: Step 2: BFS\n\n```js\nwhile (queue.length > 0) {\n        let [r, c] = queue.shift();\n\n        for (let [dr, dc] of dirs) {\n            let nr = r + dr;\n            let nc = c + dc;\n```\n\nStep 2: BFS:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 5: boundary check\n\n```js\nif (nr >= 0 && nr < m &&\n                nc >= 0 && nc < n\n            ) {\n```\n\nboundary check:\nExecute the BFS logic in this block.\n\n---\n\n## Step 6: If shorter distance found\n\n```js\nif (mat[nr][nc] > mat[r][c] + 1) {\n                    mat[nr][nc] = mat[r][c] + 1;\n                    queue.push([nr, nc]);\n                }\n            }\n        }\n    }\n\n    return mat;\n};\n```\n\nIf shorter distance found:\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [[0,0,0],[0,1,0],[0,0,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    0,\n    0,\n    0\n  ],\n  [\n    0,\n    1,\n    0\n  ],\n  [\n    0,\n    0,\n    0\n  ]\n]",
    "keyIdeas": [
      "Pattern: BFS",
      "Time: O(m×n)",
      "Space: O(m×n)",
      "Multi-source BFS",
      "Layer expansion"
    ]
  },
  "bc-013-spiral-matrix": {
    "summary": "Sheet #13 — Spiral Matrix\n\nProblem: Return matrix elements in spiral order.\nExample:\n\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\n\nOutput: [\n  1,\n  2,\n  3,\n  6,\n  9,\n  8,\n  7,\n  4,\n  5\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar spiralOrder = function (matrix) {\n    const res = [];\n    let top = 0;\n    let bottom = matrix.length - 1;\n    let left = 0;\n    let right = matrix[0].length - 1;\n\n    while (top <= bottom && left <= right) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 2: LEFT → RIGHT\n\n```js\nfor (let j = left; j <= right; j++) {\n            res.push(matrix[top][j]);\n        }\n        top++;\n```\n\nLEFT → RIGHT:\nScan elements one by one; body runs once per index/character/node.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: TOP → BOTTOM\n\n```js\nfor (let i = top; i <= bottom; i++) {\n            res.push(matrix[i][right]);\n        }\n        right--;\n```\n\nTOP → BOTTOM:\nScan elements one by one; body runs once per index/character/node.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 4: RIGHT → LEFT\n\n```js\nif (top <= bottom) {\n            for (let j = right; j >= left; j--) {\n                res.push(matrix[bottom][j]);\n            }\n            bottom--;\n        }\n```\n\nRIGHT → LEFT:\nScan elements one by one; body runs once per index/character/node.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 5: BOTTOM → TOP\n\n```js\nif (left <= right) {\n            for (let i = bottom; i >= top; i--) {\n                res.push(matrix[i][left]);\n            }\n            left++;\n        }\n    }\n\n    return res;\n};\n```\n\nBOTTOM → TOP:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3,\n  6,\n  9,\n  8,\n  7,\n  4,\n  5\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Four boundaries",
      "Shrink while walking"
    ]
  },
  "bc-014-pascal-s-triangle": {
    "summary": "Sheet #14 — Pascal's Triangle\n\nProblem: Generate Pascal's triangle with numRows rows.\nExample:\n\nnumRows = 5\n\nOutput: [\n  [\n    1\n  ],\n  [\n    1,\n    1\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    1,\n    3,\n    3,\n    1\n  ],\n  [\n    1,\n    4,\n    6,\n    4,\n    1\n  ]\n]\n\nYour solution uses **Previous row sums**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar generate = function (numRows) {\n    const res = []\n    for (let i = 0; i < numRows; i++) {\n        let row = new Array(i + 1).fill(1)\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let j = 1; j < i; j++) {\n            row[j] = res[i - 1][j - 1] + res[i - 1][j]\n        }\n        res.push(row)\n    }\n    return res\n};\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnumRows = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1\n  ],\n  [\n    1,\n    1\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    1,\n    3,\n    3,\n    1\n  ],\n  [\n    1,\n    4,\n    6,\n    4,\n    1\n  ]\n]",
    "keyIdeas": [
      "Pattern: Previous row sums",
      "Time: O(n²)",
      "Space: O(1)",
      "Previous row sums",
      "Edge ones"
    ]
  },
  "bc-015-minimum-size-subarray-sum": {
    "summary": "Sheet #15 — Minimum Size Subarray Sum\n\nProblem: Minimal length subarray with sum >= target.\nExample:\n\nnums = [2,3,1,2,4,3]\ntarget = 7\n\nOutput: 2\n\nYour solution uses **Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar minSubArrayLen = function (target, arr) {\n    let minSub = Infinity;\n    let windowSum = 0;\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        while (windowSum >= target) {\n            minSub = Math.min(minSub, end - start + 1)\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return minSub === Infinity ? 0 : minSub;\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack running sum of the current window; expand/shrink to maintain the invariant.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,3,1,2,4,3]\ntarget = 7\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sliding Window",
      "Time: O(n)",
      "Space: O(1)",
      "Sliding window",
      "Shrink when valid"
    ]
  },
  "bc-016-running-sum-of-1d-array": {
    "summary": "Sheet #16 — Running Sum of 1d Array\n\nProblem: Return running sum of nums.\nExample:\n\nnums = [1,2,3,4]\n\nOutput: [\n  1,\n  3,\n  6,\n  10\n]\n\nYour solution uses **Prefix Sum**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar runningSum = function (nums) {\n    const n = nums.length\n    const prefix = new Array(n + 1).fill(0)\n    for (let i = 1; i <= n; i++) {\n        prefix[i] = prefix[i - 1] + nums[i - 1]\n    }\n    prefix.shift()\n    return prefix\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nBuild a prefix table so any range sum query becomes O(1) via inclusion-exclusion.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  3,\n  6,\n  10\n]",
    "keyIdeas": [
      "Pattern: Prefix Sum",
      "Time: O(m×n) build, O(1) query",
      "Space: O(m×n)",
      "Prefix in place",
      "Add previous"
    ]
  },
  "bc-017-range-sum-query-2d-immutable": {
    "summary": "Sheet #17 — Range Sum Query 2D Immutable\n\nProblem: Answer 2D range sum query using prefix sums.\nExample:\n\nnums = [[3,0,1],[5,6,3],[1,2,0]]\nrow1 = 1\ncol1 = 1\nrow2 = 2\ncol2 = 2\n\nOutput: 11\n\nYour solution uses **Prefix Sum**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nfunction solve(input) {\n  const mat = input.nums;\n  const { row1, col1, row2, col2 } = input;\n  const obj = new NumMatrix(mat);\n  return obj.sumRegion(row1, col1, row2, col2);\n}\n\nvar NumMatrix = function (matrix) {\n    let rows = matrix.length;\n    let cols = matrix[0].length;\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nReturn the final computed result.\nBuild a prefix table so any range sum query becomes O(1) via inclusion-exclusion.\n\n---\n\n## Step 2: Extra row and column\n\n```js\nthis.prefix = Array(rows + 1)\n        .fill(0)\n        .map(() => Array(cols + 1).fill(0));\n```\n\nExtra row and column:\nBuild a prefix table so any range sum query becomes O(1) via inclusion-exclusion.\n\n---\n\n## Step 3: Build prefix sum\n\n```js\nfor (let r = 0; r < rows; r++) {\n        for (let c = 0; c < cols; c++) {\n\n            this.prefix[r + 1][c + 1] =\n                matrix[r][c]\n                + this.prefix[r][c + 1]\n                + this.prefix[r + 1][c]\n                - this.prefix[r][c];\n        }\n    }\n};\n\n\nNumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {\n    return (\n        this.prefix[row2 + 1][col2 + 1]\n        - this.prefix[row1][col2 + 1]\n        - this.prefix[row2 + 1][col1]\n        + this.prefix[row1][col1]\n    );\n};\n```\n\nBuild prefix sum:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nBuild a prefix table so any range sum query becomes O(1) via inclusion-exclusion.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [[3,0,1],[5,6,3],[1,2,0]]\nrow1 = 1\ncol1 = 1\nrow2 = 2\ncol2 = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 11",
    "keyIdeas": [
      "Pattern: Prefix Sum",
      "Time: O(m×n) build, O(1) query",
      "Space: O(m×n)",
      "2D prefix table",
      "Inclusion-exclusion"
    ]
  },
  "bc-018-maximum-subarray": {
    "summary": "Sheet #18 — Maximum Subarray\n\nProblem: Find maximum sum contiguous subarray.\nExample:\n\nnums = [-2,1,-3,4,-1,2,1,-5,4]\n\nOutput: 6\n\nYour solution uses **Kadane's Algorithm**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar maxSubArray = function (nums) {\n    let currentSum = nums[0]\n    let maxSum = nums[0]\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], nums[i] + currentSum)\n        maxSum = Math.max(currentSum, maxSum)\n    }\n    return maxSum;\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack running sum of the current window; expand/shrink to maintain the invariant.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [-2,1,-3,4,-1,2,1,-5,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Kadane's Algorithm",
      "Time: O(n)",
      "Space: O(1)",
      "Kadane",
      "Best ending here"
    ]
  },
  "bc-019-maximum-sum-circular-subarray": {
    "summary": "Sheet #19 — Maximum Sum Circular Subarray\n\nProblem: Maximum subarray sum on a circular array.\nExample:\n\nnums = [5,-3,5]\n\nOutput: 10\n\nYour solution uses **Kadane's Algorithm**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar maxSubarraySumCircular = function (nums) {\n    let total = 0\n    let curMax = 0\n    let maxSum = nums[0]\n    let curMin = 0\n    let minSum = nums[0]\n\n    for (let num of nums) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 2: Kadane for maximum\n\n```js\ncurMax = Math.max(curMax + num, num)\n        maxSum = Math.max(maxSum, curMax)\n```\n\nKadane for maximum:\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Kadane for minimum\n\n```js\ncurMin = Math.min(curMin + num, num)\n        minSum = Math.min(minSum, curMin)\n\n        total += num\n    }\n```\n\nKadane for minimum:\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 4: all negative case\n\n```js\nif (maxSum < 0) return maxSum\n\n    return Math.max(maxSum, total - minSum)\n};\n```\n\nall negative case:\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [5,-3,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 10",
    "keyIdeas": [
      "Pattern: Kadane's Algorithm",
      "Time: O(n²)",
      "Space: O(1)",
      "Kadane + total-min",
      "Handle all-negative"
    ]
  },
  "bc-020-longest-turbulent-subarray": {
    "summary": "Sheet #20 — Longest Turbulent Subarray\n\nProblem: Longest turbulent subarray length.\nExample:\n\narr = [9,4,2,10,7,8,8,1,9]\n\nOutput: 4\n\nYour solution uses **Compare neighbors**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar maxTurbulenceSize = function (arr) {\n    const n = arr.length\n    if (n === 1) return 1\n    let maxLen = 1\n    let up = 1\n    let down = 1\n    for (let i = 1; i < n; i++) {\n        if (arr[i] > arr[i - 1]) {\n            up = down + 1\n            down = 1\n        } else if (arr[i] < arr[i - 1]) {\n            down = up + 1\n            up = 1\n        } else {\n            up = 1\n            down = 1\n        }\n        maxLen = Math.max(maxLen, up, down)\n    }\n    return maxLen\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\narr = [9,4,2,10,7,8,8,1,9]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Compare neighbors",
      "Time: O(n)",
      "Space: O(1)",
      "Compare neighbors",
      "Alternate up/down"
    ]
  },
  "bc-021-contains-duplicate-ii": {
    "summary": "Sheet #21 — Contains Duplicate II\n\nProblem: True if duplicate exists within index distance k.\nExample:\n\nnums = [1,2,3,1]\nk = 3\n\nOutput: true\n\nYour solution uses **Two Pointers + Hash Map + Hash Set + Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar containsNearbyDuplicate = function (nums, k) {\n    let seen = new Set();\n    let left = 0;\n\n    for (let right = 0; right < nums.length; right++) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 2: duplicate inside window\n\n```js\nif (seen.has(nums[right])) {\n            return true;\n        }\n        seen.add(nums[right]);\n```\n\nduplicate inside window:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nReturn the final computed result.\n\n---\n\n## Step 3: maintain window size <= k\n\n```js\nif (right - left >= k) {\n            seen.delete(nums[left]);\n            left++;\n        }\n    }\n\n    return false;\n};\n```\n\nmaintain window size <= k:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3,1]\nk = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "Hash last index",
      "Check distance"
    ]
  },
  "bc-022-number-of-sub-arrays-of-size-k-and-average": {
    "summary": "Sheet #22 — Number of Sub-arrays of Size K and Average ..\n\nProblem: Count length-k subarrays with average >= threshold.\nExample:\n\nnums = [2,2,2,2,5,5,5,8]\nk = 3\nthreshold = 4\n\nOutput: 3\n\nYour solution uses **Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(input) {\n  return numOfSubarrays(input.nums, input.k, input.threshold);\n}\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n---\n\n## Step 2: Step 2\n\n```js\nvar numOfSubarrays = function (arr, k, threshold) {\n    let windowSum = 0;\n    let count = 0\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        if (end - start + 1 === k) {\n            if (Math.floor(windowSum / k) >= threshold) count++;\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return count;\n};\n```\n\nStep 2:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack running sum of the current window; expand/shrink to maintain the invariant.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,2,2,2,5,5,5,8]\nk = 3\nthreshold = 4\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Sliding Window",
      "Time: O(n)",
      "Space: O(1)",
      "Fixed window",
      "Compare sum/k"
    ]
  },
  "bc-023-minimum-size-subarray-sum": {
    "summary": "Sheet #23 — Minimum Size Subarray Sum\n\nProblem: Minimal length subarray with sum >= target.\nExample:\n\ntarget = 7\nnums = [2,3,1,2,4,3]\n\nOutput: 2\n\nYour solution uses **Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar minSubArrayLen = function (target, arr) {\n    let minSub = Infinity;\n    let windowSum = 0;\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        while (windowSum >= target) {\n            minSub = Math.min(minSub, end - start + 1)\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return minSub === Infinity ? 0 : minSub;\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack running sum of the current window; expand/shrink to maintain the invariant.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntarget = 7\nnums = [2,3,1,2,4,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sliding Window",
      "Time: O(n)",
      "Space: O(1)",
      "Variable window",
      "Shrink when valid"
    ]
  },
  "bc-024-longest-substring-without-repeating-characters": {
    "summary": "Sheet #24 — Longest Substring Without Repeating Characters\n\nProblem: Longest substring without repeating characters.\nExample:\n\ns = \"abcabcbb\"\n\nOutput: 3\n\nYour solution uses **Sliding window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar lengthOfLongestSubstring = function (s) {\n    let state = {}\n    let maxLength = 0\n    let start = 0\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let end = 0; end < s.length; end++) {\n        state[s[end]] = (state[s[end]] || 0) + 1;\n        while (state[s[end]] > 1) {\n            state[s[start]]--;\n            start++;\n        }\n        maxLength = Math.max(maxLength, end - start + 1);\n    }\n    return maxLength;\n};\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"abcabcbb\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Sliding window",
      "Time: O(n)",
      "Space: O(1)",
      "Sliding window",
      "Set of chars"
    ]
  },
  "bc-025-longest-repeating-character-replacement": {
    "summary": "Sheet #25 — Longest Repeating Character Replacement\n\nProblem: Longest substring with at most k replacements.\nExample:\n\ns = \"AABABBA\"\nk = 1\n\nOutput: 4\n\nYour solution uses **Window counts**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar characterReplacement = function (s, k) {\n    let charCount = {}\n    let maxFreq = 0\n    let maxLength = 0\n    let start = 0\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let end = 0; end < s.length; end++) {\n        charCount[s[end]] = (charCount[s[end]] || 0) + 1\n        maxFreq = Math.max(maxFreq, charCount[s[end]])\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\nif ((end - start + 1) - maxFreq > k) {\n            charCount[s[start]]--;\n            start++\n        }\n        maxLength = Math.max(maxLength, end - start + 1)\n    }\n    return maxLength;\n};\n```\n\nStep 3:\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"AABABBA\"\nk = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Window counts",
      "Time: O(n)",
      "Space: O(1)",
      "Window counts",
      "maxFreq + k"
    ]
  },
  "bc-026-container-with-most-water": {
    "summary": "Sheet #26 — Container With Most Water\n\nProblem: Max water area between vertical lines.\nExample:\n\nheight = [1,8,6,2,5,4,8,3,7]\n\nOutput: 49\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar maxArea = function(heights) {\n    let left = 0\n    let right = heights.length - 1\n    let currentMax = 0\n    while (left < right) {\n        let width = right - left\n        let height = Math.min(heights[left], heights[right])\n        let area = width * height\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 2: Step 2\n\n```js\ncurrentMax = Math.max(area, currentMax)\n        if (heights[left] < heights[right]) {\n            left++\n        } else {\n            right--\n        }\n    }\n    return currentMax\n}\n```\n\nStep 2:\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nheight = [1,8,6,2,5,4,8,3,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 49",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Two pointers",
      "Move shorter"
    ]
  },
  "bc-027-trapping-rain-water": {
    "summary": "Sheet #27 — Trapping Rain Water\n\nProblem: Trap rainwater between bars.\nExample:\n\nheight = [0,1,0,2,1,0,1,3,2,1,2,1]\n\nOutput: 6\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar trap = function (height) {\n    let left = 0\n    let right = height.length - 1\n    let leftMax = 0\n    let rightMax = 0\n    let water = 0\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= leftMax) {\n                leftMax = height[left]\n            } else {\n                water += leftMax - height[left]\n            }\n            left++\n        } else {\n            if (height[right] >= rightMax) {\n                rightMax = height[right]\n            } else {\n                water += rightMax - height[right]\n            }\n            right--\n        }\n    }\n    return water\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nheight = [0,1,0,2,1,0,1,3,2,1,2,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Two pointers",
      "Track left/right max"
    ]
  },
  "bc-028-two-sum-ii-input-array-is-sorted": {
    "summary": "Sheet #28 — Two Sum II - Input Array Is Sorted\n\nProblem: Two sum on sorted array; 1-based indices.\nExample:\n\nnumbers = [2,7,11,15]\ntarget = 9\n\nOutput: [\n  1,\n  2\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar twoSum = function (numbers, target) {\n    let left = 0\n    let right = numbers.length - 1\n    while (left < right) {\n        let diff = target - numbers[left] - numbers[right]\n        if (diff === 0) {\n            return [left + 1, right + 1]\n        } else if (diff < 0) {\n            right--\n        } else if (diff > 0) {\n            left++\n        }\n    }\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnumbers = [2,7,11,15]\ntarget = 9\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Two pointers",
      "Adjust by sum"
    ]
  },
  "bc-029-k-diff-pairs-in-an-array": {
    "summary": "Sheet #29 — K-diff Pairs in an Array\n\nProblem: Count unique k-diff pairs.\nExample:\n\nnums = [3,1,4,1,5]\nk = 2\n\nOutput: 2\n\nYour solution uses **Two Pointers + Hash Set + Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar findPairs = function (nums, k) {\n    if (nums[0] === -1 && nums[1] === 1 && k === 0) return 0\n    const set = new Set(nums)\n    if (set.size === 1 && nums.length > 1 && k === 0) return 1\n    if (set.size === 2 && k === 0) return 2\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nReturn the final computed result.\n\n---\n\n## Step 2: Step 2\n\n```js\nif (k < 0) return 0\n    const arr = nums.sort((a, b) => a - b)\n    let left = 0\n    let right = 1\n    let count = 0\n    while (right < nums.length) {\n        if (left === right) {\n            right++\n            continue\n        }\n        let diff = arr[right] - arr[left]\n        if (diff < k) {\n            right++\n        } else if (diff > k) {\n            left++\n        } else {\n            count++\n            left++\n            while (left < arr.length && arr[left] === arr[left - 1]) {\n                left++             // skip duplicates\n            }\n        }\n    }\n    return count\n};\n```\n\nStep 2:\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [3,1,4,1,5]\nk = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Set + Sorting",
      "Time: O(n²)",
      "Space: O(n)",
      "Hash set",
      "Check x±k"
    ]
  },
  "bc-030-find-k-closest-elements": {
    "summary": "Sheet #30 — Find K Closest Elements\n\nProblem: Return k closest elements to x in sorted nums.\nExample:\n\narr = [1,2,3,4,5]\nk = 4\nx = 3\n\nOutput: [\n  1,\n  2,\n  3,\n  4\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar findClosestElements = function (arr, k, x) {\n    let left = 0\n    let right = arr.length - 1\n    while (right - left + 1 > k) {\n        let difL = Math.abs(arr[left] - x)\n        let difR = Math.abs(arr[right] - x)\n        if (difL > difR) {\n            left++\n        } else {\n            right--\n        }\n    }\n    return arr.slice(left, right + 1)\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\narr = [1,2,3,4,5]\nk = 4\nx = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3,\n  4\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Binary search window",
      "Compare edges"
    ]
  },
  "bc-031-search-in-rotated-sorted-array": {
    "summary": "Sheet #31 — Search in Rotated Sorted Array\n\nProblem: Search target in rotated sorted array.\nExample:\n\nnums = [4,5,6,7,0,1,2]\ntarget = 0\n\nOutput: 4\n\nYour solution uses **Binary Search**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar search = function (nums, target) {\n    let left = 0;\n    let right = nums.length - 1;\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if (nums[mid] === target) {\n            return mid\n        }\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nCompute `mid` as the middle index. Compare `nums[mid]` with the target and discard half the search space.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nWhen target is found, return immediately or record the position.\n\n---\n\n## Step 2: LEFT HALF SORTED\n\n```js\nif (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) {\n                right = mid - 1\n            } else {\n                left = mid + 1\n            }\n```\n\nLEFT HALF SORTED:\nExecute the Binary Search logic in this block.\n\n---\n\n## Step 3: RIGHT HALF SORTED\n\n```js\n} else {\n            if (nums[mid] < target && target <= nums[right]) {\n                left = mid + 1\n            } else {\n                right = mid - 1\n            }\n        }\n    }\n    return -1;\n};\n```\n\nRIGHT HALF SORTED:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [4,5,6,7,0,1,2]\ntarget = 0\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search",
      "Sorted half"
    ]
  },
  "bc-032-remove-duplicates-from-sorted-array": {
    "summary": "Sheet #32 — Remove Duplicates from Sorted Array\n\nProblem: Remove duplicates in-place; return new length.\nExample:\n\nnums = [1,1,2]\n\nOutput: 2\n\nYour solution uses **Write pointer**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar removeDuplicates = function (nums) {\n    if (nums.length === 0) return 0;\n    let unique = 1;\n    for (let i = 1; i < nums.length; i++) {\n        if (nums[i] !== nums[i - 1]) {\n            nums[unique] = nums[i];\n            unique++;\n        }\n    }\n    return unique;\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,1,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Write pointer",
      "Time: O(n)",
      "Space: O(1)",
      "Write pointer",
      "Skip dupes"
    ]
  },
  "bc-033-find-first-and-last-position-of-element-in-sorte": {
    "summary": "Sheet #33 — Find First and Last Position of Element in Sorted Array\n\nProblem: First and last position of target.\nExample:\n\nnums = [5,7,7,8,8,10]\ntarget = 8\n\nOutput: [\n  3,\n  4\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar searchRange = function (nums, target) {\n    let left = 0\n    let right = nums.length - 1\n    let res = [-1, -1]\n    if (nums.length === 1 && target === nums[0]) return [0, 0]\n    while (left < right) {\n        if (nums[left] < target) {\n            left++\n        }\n        if (nums[right] > target) {\n            right--\n        }\n        if (nums[left] === target && nums[right] === target) {\n            return [left, right]\n        }\n    }\n    return res\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nWhen target is found, return immediately or record the position.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [5,7,7,8,8,10]\ntarget = 8\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  3,\n  4\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Binary search bounds",
      "Lower and upper"
    ]
  },
  "bc-034-search-a-2d-matrix": {
    "summary": "Sheet #34 — Search a 2D Matrix\n\nProblem: Search target in row-sorted 2D matrix.\nExample:\n\nnums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3\n\nOutput: true\n\nYour solution uses **Binary Search**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar searchMatrix = function (matrix, target) {\n    const arr = [...matrix.flat()]\n    let left = 0, right = arr.length - 1\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2)\n        if (arr[mid] === target) return true\n        if (arr[mid] < target) {\n            left = mid + 1\n        } else {\n            right = mid - 1\n        }\n    }\n    return false\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nCompute `mid` as the middle index. Compare `nums[mid]` with the target and discard half the search space.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nWhen target is found, return immediately or record the position.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search flat",
      "Index to cell"
    ]
  },
  "bc-035-find-peak-element": {
    "summary": "Sheet #35 — Find Peak Element\n\nProblem: Find a peak element index.\nExample:\n\nnums = [1,2,3,1]\n\nOutput: 2\n\nYour solution uses **Binary search slope**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar findPeakElement = function (nums) {\n    for (let i = 1; i < nums.length; i++) {\n        if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) return i\n        if (nums[i] > nums[i - 1] && (i + 1 === nums.length)) return i\n    }\n    return 0\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Binary search slope",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search slope",
      "Go uphill"
    ]
  },
  "bc-036-single-element-in-a-sorted-array": {
    "summary": "Sheet #36 — Single Element in a Sorted Array\n\nProblem: Single element in sorted array with pairs.\nExample:\n\nnums = [1,1,2,3,3,4,4,8,8]\n\nOutput: 2\n\nYour solution uses **Binary Search**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar singleNonDuplicate = function (nums) {\n    let left = 0, right = nums.length - 1\n    while (left < right) {\n        let mid = Math.floor((left + right) / 2)\n        if (mid % 2 === 1) {\n            mid--\n        }\n        if (nums[mid] === nums[mid + 1]) {\n            left = mid + 2\n        } else {\n            right = mid\n        }\n    }\n    return nums[left]\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nCompute `mid` as the middle index. Compare `nums[mid]` with the target and discard half the search space.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,1,2,3,3,4,4,8,8]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search parity",
      "Pair check"
    ]
  },
  "bc-037-preimage-size-of-factorial-zeroes-function": {
    "summary": "Sheet #37 — Preimage Size of Factorial Zeroes Function\n\nProblem: Preimage size of factorial trailing zeroes at k.\nExample:\n\nk = 5\n\nOutput: 0\n\nYour solution uses **Binary Search**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar preimageSizeFZF = function (k) {\n    function trailingZeroes(n) {\n        let count = 0n;\n        while (n > 0n) {\n            n /= BigInt(5);\n            count += n;\n        }\n        return count;\n    }\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet left = 0n;\n    let right = BigInt(5) * BigInt(k) + BigInt(5);\n```\n\nStep 2:\nInitialize two pointers — typically one at each end or both at the start.\n\n---\n\n## Step 3: Step 3\n\n```js\nwhile (left <= right) {\n        let mid = left + (right - left) / BigInt(2);\n        let zeroes = trailingZeroes(mid);\n```\n\nStep 3:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: Step 4\n\n```js\nif (zeroes === BigInt(k)) {\n            return 5;\n        } else if (zeroes < BigInt(k)) {\n            left = mid + BigInt(1);\n        } else {\n            right = mid - BigInt(1);\n        }\n    }\n```\n\nStep 4:\nReturn the final computed result.\n\n---\n\n## Step 5: Step 5\n\n```js\nreturn 0;\n};\n```\n\nStep 5:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nk = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: 0",
    "keyIdeas": [
      "Pattern: Binary Search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search zeros",
      "Count plateau"
    ]
  },
  "bc-038-check-if-two-arrays-are-equal-or-not": {
    "summary": "Sheet #38 — Check if Two Arrays Are Equal or Not\n\nProblem: Check if two arrays are equal multisets.\nExample:\n\nnums = [1,2,2,3]\nb = [1,2,3,2]\n\nOutput: true\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const a = input.nums.slice().sort((x, y) => x - y);\n  const c = input.b.slice().sort((x, y) => x - y);\n  return a.length === c.length && a.every((v, i) => v === c[i]);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,2,3]\nb = [1,2,3,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort compare",
      "Frequency map"
    ]
  },
  "bc-039-binary-array-sorting": {
    "summary": "Sheet #39 — Binary Array Sorting\n\nProblem: Sort binary array of 0s and 1s.\nExample:\n\nnums = [0,1,0,1,0]\n\nOutput: [\n  0,\n  0,\n  0,\n  1,\n  1\n]\n\nYour solution uses **Count zeros**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(nums) {\n  let z = 0; for (const x of nums) if (!x) z++;\n  for (let i = 0; i < z; i++) nums[i] = 0;\n  for (let i = z; i < nums.length; i++) nums[i] = 1;\n  return nums;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [0,1,0,1,0]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  0,\n  0,\n  0,\n  1,\n  1\n]",
    "keyIdeas": [
      "Pattern: Count zeros",
      "Time: O(n²)",
      "Space: O(1)",
      "Count zeros",
      "Fill array"
    ]
  },
  "bc-040-sort-colors": {
    "summary": "Sheet #40 — Sort Colors\n\nProblem: Sort colors 0,1,2 in-place (Dutch flag).\nExample:\n\nnums = [2,0,2,1,1,0]\n\nOutput: [\n  0,\n  0,\n  1,\n  1,\n  2,\n  2\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar sortColors = function (nums) {\n    let left = 0\n    let right = nums.length - 1\n    let i = 0\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\n\n---\n\n## Step 2: Step 2\n\n```js\nwhile (i <= right) {\n        if (nums[i] == 0) {\n            [nums[i], nums[left]] = [nums[left], nums[i]];\n            left++;\n            i++\n        } else if (nums[i] == 2) {\n            [nums[i], nums[right]] = [nums[right], nums[i]];\n            right--\n        } else {\n            i++\n        }\n    }\n    return nums\n};\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,0,2,1,1,0]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  0,\n  0,\n  1,\n  1,\n  2,\n  2\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Three pointers",
      "Partition"
    ]
  },
  "bc-041-kth-largest-element-in-an-array": {
    "summary": "Sheet #41 — Kth Largest Element in an Array\n\nProblem: Find kth largest element.\nExample:\n\nnums = [3,2,1,5,6,4]\ntarget = 2\n\nOutput: 6\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar findKthLargest = function (nums, k) {\n    const sorted = nums.sort((a, b) => b - a)\n    return sorted[k - 1]\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [3,2,1,5,6,4]\ntarget = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Quickselect",
      "Partition"
    ]
  },
  "bc-042-minimum-absolute-difference": {
    "summary": "Sheet #42 — Minimum Absolute Difference\n\nProblem: Minimum absolute difference pairs in sorted array.\nExample:\n\nnums = [4,2,1,3]\n\nOutput: [\n  [\n    1,\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3,\n    4\n  ]\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar minimumAbsDifference = function (arr) {\n    const sorted = arr.sort((a, b) => a - b)\n    let minDiff = Infinity\n    for (let i = 1; i < arr.length; i++) {\n        minDiff = Math.min(minDiff, arr[i] - arr[i - 1])\n    }\n    let res = []\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] - arr[i - 1] === minDiff) res.push([arr[i - 1], arr[i]])\n    }\n    return res\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [4,2,1,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1,\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3,\n    4\n  ]\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort adjacent",
      "Track min diff"
    ]
  },
  "bc-043-k-closest-points-to-origin": {
    "summary": "Sheet #43 — K Closest Points to Origin\n\nProblem: K closest points to origin.\nExample:\n\npoints = [[1,3],[-2,2]]\nk = 1\n\nOutput: [\n  [\n    -2,\n    2\n  ]\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar kClosest = function (points, k) {\n    const arr = points.map((item) => ({ sum: item[0] * item[0] + item[1] * item[1], pair: item }))\n    return arr.sort((a, b) => a.sum - b.sum).slice(0, k).map(item => item.pair)\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\npoints = [[1,3],[-2,2]]\nk = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    -2,\n    2\n  ]\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by dist",
      "Take k"
    ]
  },
  "bc-044-max-chunks-to-make-sorted": {
    "summary": "Sheet #44 — Max Chunks To Make Sorted\n\nProblem: Max chunks to make sorted array.\nExample:\n\narr = [4,3,2,1,0]\n\nOutput: 1\n\nYour solution uses **Track max index**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar maxChunksToSorted = function (arr) {\n    let maxSoFar = -1\n    let count = 0\n    for (let i = 0; i < arr.length; i++) {\n        maxSoFar = Math.max(maxSoFar, arr[i])\n        if (maxSoFar === i) count++\n    }\n    return count\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\narr = [4,3,2,1,0]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Track max index",
      "Time: O(n)",
      "Space: O(1)",
      "Track max index",
      "Chunk at i"
    ]
  },
  "bc-045-contiguous-array": {
    "summary": "Sheet #45 — Contiguous Array\n\nProblem: Longest subarray with equal 0s and 1s.\nExample:\n\nnums = [0,1,0]\n\nOutput: 2\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar findMaxLength = function (nums) {\n    let map = new Map()\n    map.set(0, -1)\n    let sum = 0\n    let maxLen = 0\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let i = 0; i < nums.length; i++) {\n        sum += (nums[i] === 0 ? -1 : 1)\n        if (map.has(sum)) {\n            let prevIndex = map.get(sum)\n            maxLen = Math.max(maxLen, i - prevIndex)\n        } else {\n            map.set(sum, i)\n        }\n    }\n    return maxLen\n};\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [0,1,0]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix as -1/+1",
      "Hash map"
    ]
  },
  "bc-046-longest-consecutive-sequence": {
    "summary": "Sheet #46 — Longest Consecutive Sequence\n\nProblem: Longest consecutive sequence length.\nExample:\n\nnums = [100,4,200,1,3,2]\n\nOutput: 4\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar longestConsecutive = function (nums) {\n    if (!nums.length) return 0\n    if (nums.length === 1) return 1\n    const arr = nums.sort((a, b) => a - b)\n    let maxLen = 1\n    let count = 1\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let i = 1; i < arr.length; i++) {\n        if (arr[i] - arr[i - 1] === 1) {\n            count++\n        } else if (arr[i] - arr[i - 1] === 0) {\n            continue\n        } else {\n            count = 1\n        }\n        maxLen = Math.max(maxLen, count)\n    }\n    return maxLen\n};\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [100,4,200,1,3,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Hash set",
      "Start chains"
    ]
  },
  "bc-047-subarray-sum-equals-k": {
    "summary": "Sheet #47 — Subarray Sum Equals K\n\nProblem: Count subarrays with sum k.\nExample:\n\nnums = [1,1,1]\ntarget = 2\n\nOutput: 2\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar subarraySum = function (nums, k) {\n    let map = new Map()\n    map.set(0, 1)\n    let sum = 0\n    let count = 0\n    for (let num of nums) {\n        sum += num\n        if (map.has(sum - k)) {\n            count += map.get(sum - k)\n        }\n        map.set(sum, (map.get(sum) || 0) + 1)\n    }\n    return count\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,1,1]\ntarget = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix sum map",
      "Count complements"
    ]
  },
  "bc-048-valid-anagram": {
    "summary": "Sheet #48 — Valid Anagram\n\nProblem: Check if t is anagram of s.\nExample:\n\ns = \"anagram\"\nt = \"nagaram\"\n\nOutput: true\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar isAnagram = function (s, t) {\n    if (s.length !== t.length) return false\n    let map = new Map()\n    for (let char of s) {\n        map.set(char, (map.get(char) || 0) + 1)\n    }\n    for (let char of t) {\n        if (!map.has(char)) return false\n        map.set(char, map.get(char) - 1)\n        if (map.get(char) === 0) {\n            map.delete(char)\n        }\n    }\n    return map.size === 0\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"anagram\"\nt = \"nagaram\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Frequency count",
      "Match letters"
    ]
  },
  "bc-049-valid-sudoku": {
    "summary": "Sheet #49 — Valid Sudoku\n\nProblem: Validate Sudoku board.\nExample:\n\nboard = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\n\nOutput: true\n\nYour solution uses **Hash Map + Hash Set**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar isValidSudoku = function (board) {\n    let rows = new Array(9).fill(0).map(() => new Set())\n    let cols = new Array(9).fill(0).map(() => new Set())\n    let boxes = new Array(9).fill(0).map(() => new Set())\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\n\n---\n\n## Step 2: Step 2\n\n```js\nfor (let i = 0; i < 9; i++) {\n        for (let j = 0; j < 9; j++) {\n            let val = board[i][j]\n            if (val === '.') continue\n            let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)\n            if (rows[i].has(val) || cols[i].has(val) || boxes[boxIndex].has(val)) {\n                return false\n            }\n            rows[i].add(val)\n            cols[i].add(val)\n            boxes[boxIndex].add(val)\n        }\n    }\n    return true\n};\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nboard = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "Row/col/box sets",
      "Skip dots"
    ]
  },
  "bc-050-ugly-number-ii": {
    "summary": "Sheet #50 — Ugly Number II\n\nProblem: Nth ugly number (factors 2,3,5).\nExample:\n\nn = 10\n\nOutput: 12\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar nthUglyNumber = function (n) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: dp[i] stores ith ugly number\n\n```js\nlet dp = new Array(n);\n```\n\ndp[i] stores ith ugly number:\nExecute the Dynamic Programming logic in this block.\n\n---\n\n## Step 3: first ugly number\n\n```js\ndp[0] = 1;\n```\n\nfirst ugly number:\nExecute the Dynamic Programming logic in this block.\n\n---\n\n## Step 4: pointers for multiples of 2, 3, 5\n\n```js\nlet i2 = 0, i3 = 0, i5 = 0;\n    for (let i = 1; i < n; i++) {\n```\n\npointers for multiples of 2, 3, 5:\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 5: next candidate from each pointer\n\n```js\nlet next2 = dp[i2] * 2;\n        let next3 = dp[i3] * 3;\n        let next5 = dp[i5] * 5;\n```\n\nnext candidate from each pointer:\nExecute the Dynamic Programming logic in this block.\n\n---\n\n## Step 6: choose smallest candidate\n\n```js\nlet nextUgly = Math.min(next2, next3, next5);\n```\n\nchoose smallest candidate:\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 7: store next ugly number\n\n```js\ndp[i] = nextUgly;\n```\n\nstore next ugly number:\nExecute the Dynamic Programming logic in this block.\n\n---\n\n## Step 8: move pointers that created this number\n\n```js\nif (nextUgly === next2) i2++;\n        if (nextUgly === next3) i3++;\n        if (nextUgly === next5) i5++;\n    }\n```\n\nmove pointers that created this number:\nExecute the Dynamic Programming logic in this block.\n\n---\n\n## Step 9: nth ugly number\n\n```js\nreturn dp[n - 1];\n};\n```\n\nnth ugly number:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 10\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 12",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Three pointers",
      "Merge streams"
    ]
  },
  "bc-051-subarray-sum-equals-k": {
    "summary": "Sheet #51 — Subarray Sum Equals K\n\nProblem: Count subarrays with sum exactly k.\nExample:\n\nnums = [1,-1,0]\ntarget = 0\n\nOutput: 3\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar subarraySum = function (nums, k) {\n    let map = new Map()\n    map.set(0, 1)\n    let sum = 0\n    let count = 0\n    for (let num of nums) {\n        sum += num\n        if (map.has(sum - k)) {\n            count += map.get(sum - k)\n        }\n        map.set(sum, (map.get(sum) || 0) + 1)\n    }\n    return count\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,-1,0]\ntarget = 0\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix sum map",
      "Add counts"
    ]
  },
  "bc-052-max-points-on-a-line": {
    "summary": "Sheet #52 — Max Points on a Line\n\nProblem: Maximum points on a line.\nExample:\n\npoints = [[1,1],[2,2],[3,3]]\n\nOutput: 2\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar maxPoints = function (points) {\n    if (points.length <= 2) return points.length\n    let result = 0\n```\n\nStep 1:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n---\n\n## Step 2: Step 2\n\n```js\nfunction gcd(a, b) {\n        while (b !== 0) {\n            let temp = b\n            b = a % b\n            a = temp\n        }\n        return Math.abs(a)\n    }\n```\n\nStep 2:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\nfor (let i = 0; i < points.length; i++) {\n        let map = new Map()\n        let max = 0\n```\n\nStep 3:\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 4: Step 4\n\n```js\nfor (let j = i + 1; j < points.length; j++) {\n            let dy = points[j][0] - points[i][0]\n            let dx = points[j][1] - points[i][1]\n            let g = gcd(dx, dy)\n            dx /= g\n            dy /= g\n            if (dx < 0) {\n                dx *= -1\n                dy *= -1\n            }\n            if (dx === 0) dy = 1\n            if (dy === 0) dx = 1\n            let slope = dy + '/' + dx\n            map.set(slope, (map.get(slope) || 0) + 1)\n            max = Math.max(max, map.get(slope))\n        }\n        result = Math.max(result, max + 1)\n    }\n    return result\n```\n\nStep 4:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 5: Step 5\n\n```js\n};\n```\n\nStep 5:\nExecute the Hash Map logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\npoints = [[1,1],[2,2],[3,3]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Slope hash",
      "Handle duplicates"
    ]
  },
  "bc-053-palindrome-pairs": {
    "summary": "Sheet #53 — Palindrome Pairs\n\nProblem: Palindrome pairs of words.\nExample:\n\nwords = [\"bat\",\"tab\",\"cat\"]\n\nOutput: [\n  [\n    0,\n    1\n  ],\n  [\n    1,\n    0\n  ]\n]\n\nYour solution uses **Two Pointers + Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar palindromePairs = function (words) {\n    let map = new Map();\n    let result = [];\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\n\n---\n\n## Step 2: store word -> index\n\n```js\nfor (let i = 0; i < words.length; i++) {\n        map.set(words[i], i);\n    }\n```\n\nstore word -> index:\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 3: palindrome checker\n\n```js\nfunction isPalindrome(str) {\n        let left = 0;\n        let right = str.length - 1;\n        while (left < right) {\n            if (str[left] !== str[right]) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n\n    for (let i = 0; i < words.length; i++) {\n        let word = words[i];\n        for (let j = 0; j <= word.length; j++) {\n\n            let left = word.substring(0, j);\n            let right = word.substring(j);\n```\n\npalindrome checker:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 4: left is palindrome\n\n```js\nif (isPalindrome(left)) {\n\n                let reversedRight =\n                    right.split(\"\").reverse().join(\"\");\n\n                if (\n                    map.has(reversedRight) &&\n                    map.get(reversedRight) !== i\n                ) {\n                    result.push([\n                        map.get(reversedRight),\n                        i\n                    ]);\n                }\n            }\n```\n\nleft is palindrome:\nPush adds the current element to the stack/array.\n\n---\n\n## Step 5: j !== word.length avoids duplicates\n\n```js\nif (\n                j !== word.length &&\n                isPalindrome(right)\n            ) {\n\n                let reversedLeft =\n                    left.split(\"\").reverse().join(\"\");\n\n                if (\n                    map.has(reversedLeft) &&\n                    map.get(reversedLeft) !== i\n                ) {\n                    result.push([\n                        i,\n                        map.get(reversedLeft)\n                    ]);\n                }\n            }\n        }\n    }\n\n    return result;\n};\n```\n\nj !== word.length avoids duplicates:\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nwords = [\"bat\",\"tab\",\"cat\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: [\n  [\n    0,\n    1\n  ],\n  [\n    1,\n    0\n  ]\n]",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Hash reverse",
      "Check pairs"
    ]
  },
  "bc-054-middle-of-the-linked-list": {
    "summary": "Sheet #54 — Middle of the Linked List\n\nProblem: Middle node of linked list (array head).\nExample:\n\nhead = [1,2,3,4,5]\n\nOutput: 3\n\nYour solution uses **Fast & Slow Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar middleNode = function (head) {\n    let slow = head, fast = head\n    while (fast && fast.next) {\n        slow = slow.next\n        fast = fast.next.next\n    }\n    return slow\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,3,4,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nFast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Slow/fast pointers",
      "Half length"
    ]
  },
  "bc-055-maximum-twin-sum-of-a-linked-list": {
    "summary": "Sheet #55 — Maximum Twin Sum of a Linked List\n\nProblem: Maximum twin sum in linked list.\nExample:\n\nhead = [5,4,2,1]\n\nOutput: 6\n\nYour solution uses **Fast & Slow Pointers + Kadane's Algorithm**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar pairSum = function (head) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: find middle\n\n```js\nlet slow = head, fast = head\n    while (fast && fast.next) {\n        slow = slow.next\n        fast = fast.next.next\n    }\n```\n\nfind middle:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 3: reverse second half\n\n```js\nlet prev = null\n    let curr = slow\n    while (curr) {\n        let next = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next\n    }\n```\n\nreverse second half:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: find max twin sum\n\n```js\nlet maxSum = 0\n    let first = head\n    let second = prev\n    while (second) {\n        maxSum = Math.max(maxSum, first.val + second.val)\n        first = first.next\n        second = second.next\n    }\n    return maxSum\n};\n```\n\nfind max twin sum:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [5,4,2,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nFast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers + Kadane's Algorithm",
      "Time: O(n²)",
      "Space: O(1)",
      "Find mid",
      "Reverse second half"
    ]
  },
  "bc-056-merge-two-sorted-lists": {
    "summary": "Sheet #56 — Merge Two Sorted Lists\n\nProblem: Merge two sorted linked lists (arrays).\nExample:\n\nlist1 = [1,2,4]\nlist2 = [1,3,4]\n\nOutput: [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4\n]\n\nYour solution uses **Dummy Head (Linked List) + Merge Pattern**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar mergeTwoLists = function (list1, list2) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: dummy node\n\n```js\nlet dummy = new ListNode(-1)\n```\n\ndummy node:\nDummy node before `head` avoids special-casing when the head itself changes.\n\n---\n\n## Step 3: tail builds merged list\n\n```js\nlet tail = dummy\n\n    while (list1 && list2) {\n        if (list1.val < list2.val) {\n            tail.next = list1\n            list1 = list1.next\n        } else {\n            tail.next = list2\n            list2 = list2.next\n        }\n```\n\ntail builds merged list:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: move tail forward\n\n```js\ntail = tail.next\n    }\n```\n\nmove tail forward:\nExecute the Dummy Head (Linked List) + Merge Pattern logic in this block.\n\n---\n\n## Step 5: attach remaining nodes\n\n```js\ntail.next = list1 || list2\n    return dummy.next\n};\n```\n\nattach remaining nodes:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nlist1 = [1,2,4]\nlist2 = [1,3,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4\n]",
    "keyIdeas": [
      "Pattern: Dummy Head (Linked List) + Merge Pattern",
      "Time: O(n log n)",
      "Space: O(1)",
      "Two pointers",
      "Append rest"
    ]
  },
  "bc-057-linked-list-cycle": {
    "summary": "Sheet #57 — Linked List Cycle\n\nProblem: Detect cycle in linked list.\nExample:\n\nhead = [3,2,0,-4]\npos = 1\n\nOutput: true\n\nYour solution uses **Fast & Slow Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar hasCycle = function (head) {\n    let slow = head, fast = head\n    while (fast && fast.next) {\n        slow = slow.next\n        fast = fast.next.next\n        if (slow === fast) return true\n    }\n    return false\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [3,2,0,-4]\npos = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nFast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Floyd cycle",
      "Slow/fast"
    ]
  },
  "bc-058-reverse-nodes-in-k-group": {
    "summary": "Sheet #58 — Reverse Nodes in k- Group\n\nProblem: Reverse nodes in k-group (array).\nExample:\n\nhead = [1,2,3,4,5]\nk = 2\n\nOutput: [\n  2,\n  null,\n  4,\n  null,\n  5\n]\n\nYour solution uses **Dummy Head (Linked List)**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar reverseKGroup = function(head, k) {\n    if (!head || k === 1) return head;\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n---\n\n## Step 2: Helper: find kth node from current\n\n```js\nconst getKth = (curr, k) => {\n        while (curr && k > 0) {\n            curr = curr.next;\n            k--;\n        }\n        return curr;\n    };\n    let dummy = new ListNode(0);\n    dummy.next = head;\n    let groupPrev = dummy;\n    while (true) {\n        let kth = getKth(groupPrev, k);\n        if (!kth) break;\n        let groupNext = kth.next;\n```\n\nHelper: find kth node from current:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nDummy node before `head` avoids special-casing when the head itself changes.\n\n---\n\n## Step 3: Step 2: Reverse group\n\n```js\nlet prev = groupNext;\n        let curr = groupPrev.next;\n        while (curr !== groupNext) {\n            let temp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = temp;\n        }\n```\n\nStep 2: Reverse group:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: Step 3: Connect with previous part\n\n```js\nlet temp = groupPrev.next; // will become end after reverse\n        groupPrev.next = kth;\n        groupPrev = temp;\n    }\n    return dummy.next;\n};\n```\n\nStep 3: Connect with previous part:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,3,4,5]\nk = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  2,\n  null,\n  4,\n  null,\n  5\n]",
    "keyIdeas": [
      "Pattern: Dummy Head (Linked List)",
      "Time: O(n²)",
      "Space: O(1)",
      "Reverse chunks",
      "Handle remainder"
    ]
  },
  "bc-059-remove-nth-node-from-end-of-list": {
    "summary": "Sheet #59 — Remove Nth Node From End of List\n\nProblem: Remove nth node from end.\nExample:\n\nhead = [1,2,3,4,5]\nn = 2\n\nOutput: [\n  1,\n  2,\n  3,\n  5\n]\n\nYour solution uses **Fast & Slow Pointers + Dummy Head (Linked List)**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar removeNthFromEnd = function (head, n) {\n    let dummy = new ListNode(-1)\n    dummy.next = head\n    let fast = dummy, slow = dummy\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nDummy node before `head` avoids special-casing when the head itself changes.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 2: move fast n+1 steps@\n\n```js\nfor (let i = 0; i <= n; i++) fast = fast.next\n```\n\nmove fast n+1 steps@:\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 3: move both pointers\n\n```js\nwhile (fast) {\n        fast = fast.next\n        slow = slow.next\n    }\n```\n\nmove both pointers:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 4: remove node\n\n```js\nslow.next = slow.next.next\n    return dummy.next\n};\n```\n\nremove node:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,3,4,5]\nn = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nFast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n\nExpected output: [\n  1,\n  2,\n  3,\n  5\n]",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers + Dummy Head (Linked List)",
      "Time: O(n)",
      "Space: O(1)",
      "Two pointers gap n",
      "Delete node"
    ]
  },
  "bc-060-linked-list-cycle-ii": {
    "summary": "Sheet #60 — Linked List Cycle II\n\nProblem: Start of cycle in linked list.\nExample:\n\nhead = [3,2,0,-4]\npos = 1\n\nOutput: 2\n\nYour solution uses **Fast & Slow Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar detectCycle = function (head) {\n    if (!head || !head.next) return null;\n    let slow = head, fast = head;\n\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 2: cycle found\n\n```js\nif (slow === fast) {\n```\n\ncycle found:\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 3: Find cycle start\n\n```js\nlet ptr1 = head;\n            let ptr2 = slow;\n            while (ptr1 !== ptr2) {\n                ptr1 = ptr1.next;\n                ptr2 = ptr2.next;\n            }\n            return ptr1; // start of cycle\n        }\n    }\n    return null; // no cycle\n};\n```\n\nFind cycle start:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [3,2,0,-4]\npos = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nFast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Floyd then reset",
      "Meet point"
    ]
  },
  "bc-061-delete-node-in-a-linked-list": {
    "summary": "Sheet #61 — Delete Node in a Linked List\n\nProblem: Delete given node in linked list (array).\nExample:\n\nhead = [4,5,1,9]\nnode = 1\n\nOutput: [\n  4,\n  1,\n  9\n]\n\nYour solution uses **Copy next value**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar deleteNode = function (node) {\n    node.val = node.next.val\n    node.next = node.next.next\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [4,5,1,9]\nnode = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  4,\n  1,\n  9\n]",
    "keyIdeas": [
      "Pattern: Copy next value",
      "Time: O(n)",
      "Space: O(1)",
      "Copy next value",
      "Skip node"
    ]
  },
  "bc-062-reverse-linked-list": {
    "summary": "Sheet #62 — Reverse Linked List\n\nProblem: Reverse linked list (array).\nExample:\n\nhead = [1,2,3,4,5]\n\nOutput: [\n  5,\n  4,\n  3,\n  2,\n  1\n]\n\nYour solution uses **Iterative reverse**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar reverseList = function (head) {\n    let prev = null\n    let curr = head\n    while (curr) {\n        let temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = temp\n    }\n    return prev\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,3,4,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  5,\n  4,\n  3,\n  2,\n  1\n]",
    "keyIdeas": [
      "Pattern: Iterative reverse",
      "Time: O(n)",
      "Space: O(1)",
      "Iterative reverse",
      "Three pointers"
    ]
  },
  "bc-063-palindrome-linked": {
    "summary": "Sheet #63 — Palindrome Linked\n\nProblem: Check if linked list is palindrome.\nExample:\n\nhead = [1,2,2,1]\n\nOutput: true\n\nYour solution uses **Fast & Slow Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar isPalindrome = function (head) {\n    if (!head || !head.next) return true\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n---\n\n## Step 2: find middle\n\n```js\nlet slow = head, fast = head\n    while (fast && fast.next) {\n        slow = slow.next\n        fast = fast.next.next\n    }\n```\n\nfind middle:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 3: reverse second half\n\n```js\nlet prev = null, curr = slow\n    while (curr) {\n        let temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = temp\n    }\n```\n\nreverse second half:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: compare is palindrome\n\n```js\nlet first = head, second = prev\n    while (second) {\n        if (first.val !== second.val) return false\n        first = first.next\n        second = second.next\n    }\n    return true\n};\n```\n\ncompare is palindrome:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,2,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nFast/slow: advance fast by 2 and slow by 1 each round until fast reaches end or meets slow.\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Fast & Slow Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Find mid reverse",
      "Compare halves"
    ]
  },
  "bc-064-remove-linked-list": {
    "summary": "Sheet #64 — Remove Linked List\n\nProblem: Remove all nodes equal to val.\nExample:\n\nhead = [1,2,6,3,4,5,6]\nval = 6\n\nOutput: [\n  1,\n  2,\n  3,\n  4,\n  5\n]\n\nYour solution uses **Dummy Head (Linked List)**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar removeElements = function (head, val) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: create dummy node before head\n\n```js\nlet dummy = new ListNode(0)\n    dummy.next = head\n```\n\ncreate dummy node before head:\nDummy node before `head` avoids special-casing when the head itself changes.\n\n---\n\n## Step 3: traverse from dummy\n\n```js\nlet curr = dummy\n    while (curr && curr.next) {\n        if (curr.next.val === val) {\n```\n\ntraverse from dummy:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: skip that node if val matches\n\n```js\ncurr.next = curr.next.next\n        } else {\n```\n\nskip that node if val matches:\nExecute the Dummy Head (Linked List) logic in this block.\n\n---\n\n## Step 5: go to next node\n\n```js\ncurr = curr.next\n        }\n    }\n    return dummy.next\n};\n```\n\ngo to next node:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,6,3,4,5,6]\nval = 6\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3,\n  4,\n  5\n]",
    "keyIdeas": [
      "Pattern: Dummy Head (Linked List)",
      "Time: O(n)",
      "Space: O(1)",
      "Filter array",
      "Return list"
    ]
  },
  "bc-065-convert-binary-number-in-a-linked-list-to-intege": {
    "summary": "Sheet #65 — Convert Binary Number in a Linked List to Integer\n\nProblem: Convert binary linked list to integer.\nExample:\n\nhead = [1,0,1]\n\nOutput: 5\n\nYour solution uses **Accumulate bits**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nvar getDecimalValue = function (head) {\n    let num = 0\n    while (head) {\n        num = num * 2 + head.val\n        head = head.next\n    }\n    return num\n};\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,0,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 5",
    "keyIdeas": [
      "Pattern: Accumulate bits",
      "Time: O(n)",
      "Space: O(1)",
      "Accumulate bits",
      "Left shift"
    ]
  },
  "bc-066-remove-duplicates-from-sorted-list-ii": {
    "summary": "Sheet #66 — Remove Duplicates from Sorted List II\n\nProblem: Remove duplicates from sorted list II.\nExample:\n\nhead = [1,2,3,3,4,4,5]\n\nOutput: [\n  1,\n  2,\n  5\n]\n\nYour solution uses **Dummy Head (Linked List)**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar deleteDuplicates = function (head) {\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: dummy before head\n\n```js\nlet dummy = new ListNode(0)\n    dummy.next = head\n    let prev = dummy\n```\n\ndummy before head:\nDummy node before `head` avoids special-casing when the head itself changes.\n\n---\n\n## Step 3: traverse to filter list\n\n```js\nwhile (head) {\n        if (head.next && head.val === head.next.val) {\n```\n\ntraverse to filter list:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 4: skip all duplicates\n\n```js\nwhile (head.next && head.val === head.next.val) {\n                head = head.next\n            }\n```\n\nskip all duplicates:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\n\n---\n\n## Step 5: remove duplicate group\n\n```js\nprev.next = head.next\n        } else {\n```\n\nremove duplicate group:\nExecute the Dummy Head (Linked List) logic in this block.\n\n---\n\n## Step 6: current node is unique\n\n```js\nprev = prev.next\n        }\n```\n\ncurrent node is unique:\nExecute the Dummy Head (Linked List) logic in this block.\n\n---\n\n## Step 7: move forward\n\n```js\nhead = head.next\n    }\n    return dummy.next\n};\n```\n\nmove forward:\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,3,3,4,4,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  5\n]",
    "keyIdeas": [
      "Pattern: Dummy Head (Linked List)",
      "Time: O(n²)",
      "Space: O(1)",
      "Skip duplicate runs",
      "Dummy head"
    ]
  },
  "bc-067-reverse-linked-list-ii": {
    "summary": "Sheet #67 — Reverse Linked List II\n\nProblem: Reverse linked list between left and right.\nExample:\n\nhead = [1,2,3,4,5]\nleft = 2\nright = 4\n\nOutput: [\n  1,\n  4,\n  3,\n  2,\n  5\n]\n\nYour solution uses **Two Pointers + Dummy Head (Linked List)**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar reverseBetween = function (head, left, right) {\n    if (!head || left === right) return head;\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n---\n\n## Step 2: Dummy node to handle edge case (left = 1)\n\n```js\nlet dummy = new ListNode(0);\n    dummy.next = head;\n```\n\nDummy node to handle edge case (left = 1):\nDummy node before `head` avoids special-casing when the head itself changes.\n\n---\n\n## Step 3: Step 1: Reach node before 'left'\n\n```js\nlet prev = dummy;\n    for (let i = 1; i < left; i++) {\n        prev = prev.next;\n    }\n```\n\nStep 1: Reach node before 'left':\nScan elements one by one; body runs once per index/character/node.\n\n---\n\n## Step 4: 'curr' will point to start of sublist\n\n```js\nlet curr = prev.next;\n```\n\n'curr' will point to start of sublist:\nExecute the Two Pointers + Dummy Head (Linked List) logic in this block.\n\n---\n\n## Step 5: Step 2: Reverse using head insertion\n\n```js\nfor (let i = 0; i < right - left; i++) {\n        let temp = curr.next;          // node to move\n        curr.next = temp.next;         // remove temp\n        temp.next = prev.next;         // insert temp at front\n        prev.next = temp;\n    }\n\n    return dummy.next;\n};\n```\n\nStep 2: Reverse using head insertion:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [1,2,3,4,5]\nleft = 2\nright = 4\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  4,\n  3,\n  2,\n  5\n]",
    "keyIdeas": [
      "Pattern: Two Pointers + Dummy Head (Linked List)",
      "Time: O(n²)",
      "Space: O(1)",
      "Reverse subrange",
      "1-based indices"
    ]
  },
  "bc-068-sort-list": {
    "summary": "Sheet #68 — Sort List\n\nProblem: Sort linked list (array merge sort).\nExample:\n\nhead = [4,2,1,3]\n\nOutput: [\n  1,\n  2,\n  3,\n  4\n]\n\nYour solution uses **Binary Search + Fast & Slow Pointers + Dummy Head (Linked List) + Merge Pattern**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Function setup\n\n```js\nvar sortList = function (head) {\n    if (!head || !head.next) return head;\n    let slow = head;\n    let fast = head.next;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n```\n\nFunction setup:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nFast pointer moves 2 steps, slow moves 1 — when they meet, you found middle/cycle.\n\n---\n\n## Step 2: split list\n\n```js\nlet mid = slow.next;\n    slow.next = null;\n```\n\nsplit list:\nExecute the Binary Search + Fast & Slow Pointers + Dummy Head (Linked List) + Merge Pattern logic in this block.\n\n---\n\n## Step 3: sort both halves\n\n```js\nlet left = sortList(head);\n    let right = sortList(mid);\n    return merge(left, right);\n};\nfunction merge(l1, l2) {\n    let dummy = new ListNode(0);\n    let tail = dummy;\n    while (l1 && l2) {\n        if (l1.val < l2.val) {\n            tail.next = l1;\n            l1 = l1.next;\n        } else {\n            tail.next = l2;\n            l2 = l2.next;\n        }\n        tail = tail.next;\n    }\n    tail.next = l1 || l2;\n    return dummy.next;\n}\n```\n\nsort both halves:\nDefine the entry function and read input parameters.\nInitialize two pointers — typically one at each end or both at the start.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nDummy node before `head` avoids special-casing when the head itself changes.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhead = [4,2,1,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: [\n  1,\n  2,\n  3,\n  4\n]",
    "keyIdeas": [
      "Pattern: Binary Search + Fast & Slow Pointers + Dummy Head (Linked List) + Merge Pattern",
      "Time: O(log n)",
      "Space: O(1)",
      "Merge sort",
      "Split halves"
    ]
  },
  "bc-069-implement-stack-using-queues": {
    "summary": "Sheet #69 — Implement Stack using Queues\n\nProblem: Implement stack using queues.\nExample:\n\nops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]\n\nOutput: [\n  1\n]\n\nYour solution uses **Push to q2**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const stack = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') stack.push(op[1]);\n    else if (op[0] === 'pop') stack.pop();\n    else if (op[0] === 'top') stack[stack.length - 1];\n  }\n  return stack;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1\n]",
    "keyIdeas": [
      "Pattern: Push to q2",
      "Time: O(n)",
      "Space: O(1)",
      "Push to q2",
      "Move elements"
    ]
  },
  "bc-070-implement-queue-using-stacks": {
    "summary": "Sheet #70 — Implement Queue using Stacks\n\nProblem: Implement queue using stacks.\nExample:\n\nops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]\n\nOutput: [\n  2\n]\n\nYour solution uses **Two stacks**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const q = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') q.push(op[1]);\n    else if (op[0] === 'pop') q.shift();\n  }\n  return q;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  2\n]",
    "keyIdeas": [
      "Pattern: Two stacks",
      "Time: O(n)",
      "Space: O(1)",
      "Two stacks",
      "Amortized O(1)"
    ]
  },
  "bc-071-backspace-string-compare": {
    "summary": "Sheet #71 — Backspace String Compare\n\nProblem: Given two strings where `#` means backspace, return true if both strings are equal after processing.\n\nExample:\n\ns = \"ab#c\"\nt = \"ad#c\"\n\nAfter processing:\ns → \"ac\"\nt → \"ac\"\n\nAnswer = true\n\nYour solution uses **Stack Simulation**.",
    "whyItWorks": "# Step-by-step Explanation\n\n```js\nvar backspaceCompare = function (s, t) {\n```\n\nFunction takes 2 strings.\n\n---\n\n## Step 1: Create stacks\n\n```js\nlet res1 = [], res2 = [];\n```\n\nThese arrays act like stacks.\n\nWhy stack? Backspace removes the **last typed character**.\n\nStack operations:\n- push() → type character\n- pop() → remove last character\n\n---\n\n## Step 2: Process first string\n\n```js\nfor (let char of s.split('')) {\n  if (char === \"#\") {\n    res1.pop();\n  } else {\n    res1.push(char);\n  }\n}\n```\n\nLoop through every character in `s`.\n\nIf `#` → pop last char. Else → push char.\n\nDry run on \"ab#c\":\n- 'a' → ['a']\n- 'b' → ['a','b']\n- '#' → ['a']\n- 'c' → ['a','c']\n\n---\n\n## Step 3: Convert stack to string\n\n```js\nlet str1 = res1.reduce((acc, curr) => acc + curr, '');\n```\n\nJoin stack chars into final processed string \"ac\".\n\n---\n\n## Step 4: Same for second string\n\nBuild `str2` from `t` with identical logic.\n\n---\n\n## Step 5: Compare\n\n```js\nreturn str1 === str2;\n```\n\nReturn true if processed strings match.",
    "howExamplesAreSatisfied": "Complete flow example:\n\ns = \"ab#c\"\nt = \"ad#c\"\n\nProcess s:\n[] → ['a'] → ['a','b'] → pop → ['a'] → ['a','c'] → \"ac\"\n\nProcess t:\n[] → ['a'] → ['a','d'] → pop → ['a'] → ['a','c'] → \"ac\"\n\nCompare: \"ac\" === \"ac\" → true",
    "keyIdeas": [
      "Stack Simulation",
      "String Processing",
      "Time: O(n + m)",
      "Space: O(n + m)",
      "Tip: use join('') instead of reduce for cleaner code"
    ]
  },
  "bc-072-baseball-game": {
    "summary": "Sheet #72 — Baseball Game\n\nProblem: Evaluate baseball stack scores.\nExample:\n\noperations = [\"5\",\"2\",\"C\",\"D\",\"+\"]\n\nOutput: 30\n\nYour solution uses **Stack ops**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(operations) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst st = [];\n  for (const op of operations) {\n    if (op === 'C') st.pop();\n    else if (op === 'D') st.push(st[st.length - 1] * 2);\n    else if (op === '+') st.push(st[st.length - 2] + st[st.length - 1]);\n    else st.push(+op);\n  }\n  return st.reduce((a, b) => a + b, 0);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Stack ops logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\noperations = [\"5\",\"2\",\"C\",\"D\",\"+\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 30",
    "keyIdeas": [
      "Pattern: Stack ops",
      "Time: O(n)",
      "Space: O(1)",
      "Stack ops",
      "Apply signs"
    ]
  },
  "bc-073-longest-valid-parentheses": {
    "summary": "Sheet #73 — Longest Valid Parentheses\n\nProblem: Longest valid parentheses length.\nExample:\n\ns = \")()())\"\n\nOutput: 4\n\nYour solution uses **Stack indices**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst st = [-1];\n  let best = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(') st.push(i);\n    else {\n      st.pop();\n      if (!st.length) st.push(i);\n      else best = Math.max(best, i - st[st.length - 1]);\n    }\n  }\n  return best;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Stack indices logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \")()())\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Stack indices",
      "Time: O(n)",
      "Space: O(1)",
      "Stack indices",
      "Track gaps"
    ]
  },
  "bc-074-evaluate-reverse-polish-notation": {
    "summary": "Sheet #74 — Evaluate Reverse Polish Notation\n\nProblem: Evaluate Reverse Polish Notation.\nExample:\n\ntokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]\n\nOutput: 9\n\nYour solution uses **Stack operands**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(tokens) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst st = [];\n  for (const t of tokens) {\n    if ('+-*/'.includes(t)) {\n      const b = st.pop(), a = st.pop();\n      st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : (a / b) | 0);\n    } else st.push(+t);\n  }\n  return st[0];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Stack operands logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 9",
    "keyIdeas": [
      "Pattern: Stack operands",
      "Time: O(n)",
      "Space: O(1)",
      "Stack operands",
      "Apply operator"
    ]
  },
  "bc-075-daily-temperatures": {
    "summary": "Sheet #75 — Daily Temperatures\n\nProblem: Daily temperatures: days until warmer.\nExample:\n\ntemperatures = [73,74,75,71,69,72,76,73]\n\nOutput: [\n  1,\n  1,\n  4,\n  2,\n  1,\n  1,\n  0,\n  0\n]\n\nYour solution uses **Monotonic stack**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(temperatures) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst ans = Array(temperatures.length).fill(0), st = [];\n  for (let i = 0; i < temperatures.length; i++) {\n    while (st.length && temperatures[i] > temperatures[st[st.length - 1]]) {\n      const j = st.pop();\n      ans[j] = i - j;\n    }\n    st.push(i);\n  }\n  return ans;\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Monotonic stack logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntemperatures = [73,74,75,71,69,72,76,73]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  1,\n  4,\n  2,\n  1,\n  1,\n  0,\n  0\n]",
    "keyIdeas": [
      "Pattern: Monotonic stack",
      "Time: O(n)",
      "Space: O(1)",
      "Monotonic stack",
      "Next greater"
    ]
  },
  "bc-076-largest-rectangle-in-histogram": {
    "summary": "Sheet #76 — Largest Rectangle in Histogram\n\nProblem: Largest rectangle in histogram.\nExample:\n\nnums = [2,1,5,6,2,3]\n\nOutput: 10\n\nYour solution uses **Monotonic stack**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(nums) {\n  const st = [], ans = [];\n  nums.push(0);\n  for (let i = 0; i < nums.length; i++) {\n    while (st.length && nums[i] < nums[st[st.length - 1]]) {\n      const h = nums[st.pop()];\n      const w = st.length ? i - st[st.length - 1] - 1 : i;\n      ans.push(h * w);\n    }\n    st.push(i);\n  }\n  return Math.max(...ans);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,1,5,6,2,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 10",
    "keyIdeas": [
      "Pattern: Monotonic stack",
      "Time: O(n)",
      "Space: O(1)",
      "Monotonic stack",
      "Expand bars"
    ]
  },
  "bc-077-min-stack": {
    "summary": "Sheet #77 — Min Stack\n\nProblem: Min stack supporting getMin in O(1).\nExample:\n\nops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]\n\nOutput: -3\n\nYour solution uses **Aux min stack**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const st = [], mins = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') { st.push(op[1]); mins.push(Math.min(op[1], mins.at(-1) ?? op[1])); }\n    else if (op[0] === 'pop') { st.pop(); mins.pop(); }\n    else if (op[0] === 'getMin') return mins.at(-1);\n    else if (op[0] === 'top') return st.at(-1);\n  }\n  return mins.at(-1);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: -3",
    "keyIdeas": [
      "Pattern: Aux min stack",
      "Time: O(n)",
      "Space: O(1)",
      "Aux min stack",
      "Track minimum"
    ]
  },
  "bc-078-minimum-remove-to-make-valid-parentheses": {
    "summary": "Sheet #78 — Minimum Remove to Make Valid Parentheses\n\nProblem: Minimum removes to make parentheses valid.\nExample:\n\ns = \"lee(t(c)o)de)\"\n\nOutput: 1\n\nYour solution uses **Stack open indices**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet removes = 0, open = 0;\n  for (const ch of s) {\n    if (ch === '(') open++;\n    else if (ch === ')') { if (open) open--; else removes++; }\n  }\n  return removes + open;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Stack open indices logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"lee(t(c)o)de)\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Stack open indices",
      "Time: O(n)",
      "Space: O(1)",
      "Stack open indices",
      "Count unmatched"
    ]
  },
  "bc-079-find-median-from-data-stream": {
    "summary": "Sheet #79 — Find Median from Data Stream\n\nProblem: Find median from data stream (simplified).\nExample:\n\nops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]\n\nOutput: 1.5\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const arr = [];\n  for (const op of input.ops) {\n    if (op[0] === 'addNum') arr.push(op[1]);\n    else { arr.sort((a, b) => a - b); const m = arr.length >> 1; return arr.length % 2 ? arr[m] : (arr[m - 1] + arr[m]) / 2; }\n  }\n  return 0;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1.5",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Two heaps",
      "Balance sizes"
    ]
  },
  "bc-080-merge-k-sorted-lists": {
    "summary": "Sheet #80 — Merge k Sorted Lists\n\nProblem: Merge k sorted lists (arrays).\nExample:\n\nlists = [[1,4,5],[1,3,4],[2,6]]\n\nOutput: [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4,\n  5,\n  6\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(lists) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn lists.flat().sort((a, b) => a - b);\n```\n\nStep 2:\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nlists = [[1,4,5],[1,3,4],[2,6]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  1,\n  2,\n  3,\n  4,\n  4,\n  5,\n  6\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Min heap or divide",
      "Merge pairs"
    ]
  },
  "bc-081-find-k-pairs-with-smallest-sums": {
    "summary": "Sheet #81 — Find K Pairs with Smallest Sums\n\nProblem: K pairs with smallest sums from two arrays.\nExample:\n\nnums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3\n\nOutput: [\n  3,\n  5,\n  7\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums1, nums2, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst pairs = [];\n  for (const a of nums1) for (const b of nums2) pairs.push(a + b);\n  pairs.sort((a, b) => a - b);\n  return pairs.slice(0, k);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  3,\n  5,\n  7\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Min heap",
      "Expand pairs"
    ]
  },
  "bc-082-meeting-rooms-ii": {
    "summary": "Sheet #82 — Meeting Rooms II\n\nProblem: Meeting rooms II: minimum rooms needed.\nExample:\n\nintervals = [[0,30],[5,10],[15,20]]\n\nOutput: 2\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const intervals = input.intervals.slice().sort((a, b) => a[0] - b[0]);\n  const ends = [];\n  for (const [s, e] of intervals) {\n    ends.sort((a, b) => a - b);\n    if (ends.length && ends[0] <= s) ends.shift();\n    ends.push(e);\n  }\n  return ends.length;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nintervals = [[0,30],[5,10],[15,20]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by start",
      "Heap of ends"
    ]
  },
  "bc-083-top-k-frequent-elements": {
    "summary": "Sheet #83 — Top K Frequent Elements\n\nProblem: Top k frequent elements.\nExample:\n\nnums = [1,1,1,2,2,3]\ntarget = 2\n\nOutput: [\n  1,\n  2\n]\n\nYour solution uses **Hash Map + Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(nums, target) {\n  const k = target, cnt = new Map();\n  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);\n  return [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([x]) => x);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,1,1,2,2,3]\ntarget = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: [\n  1,\n  2\n]",
    "keyIdeas": [
      "Pattern: Hash Map + Sorting",
      "Time: O(n log n)",
      "Space: O(n)",
      "Frequency map",
      "Bucket or heap"
    ]
  },
  "bc-084-k-closest-points-to-origin": {
    "summary": "Sheet #84 — K Closest Points to Origin\n\nProblem: K closest points to origin.\nExample:\n\npoints = [[1,3],[-2,2]]\nk = 1\n\nOutput: [\n  [\n    -2,\n    2\n  ]\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(points, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);\n```\n\nStep 2:\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\npoints = [[1,3],[-2,2]]\nk = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    -2,\n    2\n  ]\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by distance",
      "Take k"
    ]
  },
  "bc-085-count-good-numbers": {
    "summary": "Sheet #85 — Count Good Numbers\n\nProblem: Count good numbers of length n.\nExample:\n\nn = 4\n\nOutput: 400\n\nYour solution uses **Fast pow mod**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst mod = 1e9 + 7;\n  const pow = (a, e) => { let r = 1n; a = BigInt(a); while (e) { if (e & 1) r = r * a % BigInt(mod); a = a * a % BigInt(mod); e >>= 1; } return Number(r); };\n  return (pow(5, Math.ceil(n / 2)) * pow(4, Math.floor(n / 2))) % mod;\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Fast pow mod logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 4\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 400",
    "keyIdeas": [
      "Pattern: Fast pow mod",
      "Time: O(n)",
      "Space: O(1)",
      "Fast pow mod",
      "Alternate 5 and 4"
    ]
  },
  "bc-086-permutations": {
    "summary": "Sheet #86 — Permutations\n\nProblem: Return all permutations of nums.\nExample:\n\nnums = [1,2,3]\n\nOutput: [\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3,\n    2\n  ],\n  [\n    2,\n    1,\n    3\n  ],\n  [\n    2,\n    3,\n    1\n  ],\n  [\n    3,\n    1,\n    2\n  ],\n  [\n    3,\n    2,\n    1\n  ]\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [];\n  const dfs = (path, used) => {\n    if (path.length === nums.length) { out.push(path.slice()); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true; path.push(nums[i]);\n      dfs(path, used); path.pop(); used[i] = false;\n    }\n  };\n  dfs([], Array(nums.length).fill(false));\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3,\n    2\n  ],\n  [\n    2,\n    1,\n    3\n  ],\n  [\n    2,\n    3,\n    1\n  ],\n  [\n    3,\n    1,\n    2\n  ],\n  [\n    3,\n    2,\n    1\n  ]\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack swap",
      "DFS choices"
    ]
  },
  "bc-087-permutations-ii": {
    "summary": "Sheet #87 — Permutations II\n\nProblem: Permutations II with duplicates.\nExample:\n\nnums = [1,1,2]\n\nOutput: [\n  [\n    1,\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    2,\n    1,\n    1\n  ]\n]\n\nYour solution uses **DFS / Backtracking + Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nnums.sort((a, b) => a - b);\n  const out = [];\n  const dfs = (path, used) => {\n    if (path.length === nums.length) { out.push(path.slice()); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i] || (i && nums[i] === nums[i - 1] && !used[i - 1])) continue;\n      used[i] = true; path.push(nums[i]);\n      dfs(path, used); path.pop(); used[i] = false;\n    }\n  };\n  dfs([], Array(nums.length).fill(false));\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking + Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,1,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1,\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    1\n  ],\n  [\n    2,\n    1,\n    1\n  ]\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking + Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort + skip dupes",
      "Used array"
    ]
  },
  "bc-088-subsets": {
    "summary": "Sheet #88 — Subsets\n\nProblem: Return all subsets of nums.\nExample:\n\nnums = [1,2,3]\n\nOutput: [\n  [],\n  [\n    1\n  ],\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3\n  ]\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [[]];\n  const dfs = (i, path) => {\n    if (i === nums.length) return;\n    path.push(nums[i]);\n    out.push(path.slice());\n    dfs(i + 1, path);\n    path.pop();\n    dfs(i + 1, path);\n  };\n  dfs(0, []);\n  return out;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [],\n  [\n    1\n  ],\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    2,\n    3\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    2\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    3\n  ]\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack include",
      "Power set"
    ]
  },
  "bc-089-basic-calculator": {
    "summary": "Sheet #89 — Basic Calculator\n\nProblem: Evaluate basic calculator with + - ( ).\nExample:\n\ns = \"1 + 1\"\n\nOutput: 2\n\nYour solution uses **Stack signs**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet num = 0, sign = 1, res = 0, st = [1];\n  for (const ch of s + '+') {\n    if (ch >= '0' && ch <= '9') num = num * 10 + +ch;\n    else {\n      res += sign * num; num = 0;\n      if (ch === '+') sign = st[st.length - 1];\n      else if (ch === '-') sign = -st[st.length - 1];\n      else if (ch === '(') st.push(sign);\n      else if (ch === ')') st.pop();\n    }\n  }\n  return res;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Stack signs logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"1 + 1\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Stack signs",
      "Time: O(n)",
      "Space: O(1)",
      "Stack signs",
      "Parse numbers"
    ]
  },
  "bc-090-wildcard-matching": {
    "summary": "Sheet #90 — Wildcard Matching\n\nProblem: Wildcard matching with ? and *.\nExample:\n\ns = \"aa\"\np = \"a\"\n\nOutput: false\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s, p) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array.from({ length: s.length + 1 }, () => Array(p.length + 1).fill(false));\n  dp[0][0] = true;\n  for (let j = 1; j <= p.length; j++) if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];\n  for (let i = 1; i <= s.length; i++) for (let j = 1; j <= p.length; j++) {\n    if (p[j - 1] === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];\n    else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n  }\n  return dp[s.length][p.length];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"aa\"\np = \"a\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: false",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP or greedy",
      "Star matches span"
    ]
  },
  "bc-091-combinations": {
    "summary": "Sheet #91 — Combinations\n\nProblem: All combinations of n choose k.\nExample:\n\nn = 4\nk = 2\n\nOutput: [\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    2,\n    4\n  ],\n  [\n    3,\n    4\n  ]\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [];\n  const dfs = (start, path) => {\n    if (path.length === k) { out.push(path.slice()); return; }\n    for (let i = start; i <= n; i++) { path.push(i); dfs(i + 1, path); path.pop(); }\n  };\n  dfs(1, []);\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 4\nk = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1,\n    2\n  ],\n  [\n    1,\n    3\n  ],\n  [\n    1,\n    4\n  ],\n  [\n    2,\n    3\n  ],\n  [\n    2,\n    4\n  ],\n  [\n    3,\n    4\n  ]\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack start",
      "Build combo"
    ]
  },
  "bc-092-combination-sum": {
    "summary": "Sheet #92 — Combination Sum\n\nProblem: Combination sum with reuse.\nExample:\n\ncandidates = [2,3,6,7]\ntarget = 7\n\nOutput: [\n  [\n    2,\n    2,\n    3\n  ],\n  [\n    7\n  ]\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(candidates, target) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [];\n  const dfs = (i, rem, path) => {\n    if (rem === 0) { out.push(path.slice()); return; }\n    if (rem < 0 || i === candidates.length) return;\n    path.push(candidates[i]); dfs(i, rem - candidates[i], path); path.pop();\n    dfs(i + 1, rem, path);\n  };\n  dfs(0, target, []);\n  return out;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ncandidates = [2,3,6,7]\ntarget = 7\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    2,\n    2,\n    3\n  ],\n  [\n    7\n  ]\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack candidates",
      "Subtract target"
    ]
  },
  "bc-093-combination-sum-iii": {
    "summary": "Sheet #93 — Combination Sum III\n\nProblem: Combination sum III: k numbers sum to n.\nExample:\n\nk = 3\nn = 7\n\nOutput: [\n  [\n    1,\n    2,\n    4\n  ]\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(k, n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [];\n  const dfs = (start, rem, path) => {\n    if (path.length === k && rem === 0) { out.push(path.slice()); return; }\n    if (rem < 0 || path.length > k) return;\n    for (let i = start; i <= 9; i++) { path.push(i); dfs(i + 1, rem - i, path); path.pop(); }\n  };\n  dfs(1, n, []);\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nk = 3\nn = 7\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    1,\n    2,\n    4\n  ]\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack 1-9",
      "No reuse"
    ]
  },
  "bc-094-letter-combinations-of-a-phone-number": {
    "summary": "Sheet #94 — Letter Combinations of a Phone Number\n\nProblem: Letter combinations from phone digits.\nExample:\n\ndigits = \"23\"\n\nOutput: [\n  \"ad\",\n  \"ae\",\n  \"af\",\n  \"bd\",\n  \"be\",\n  \"bf\",\n  \"cd\",\n  \"ce\",\n  \"cf\"\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(digits) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };\n  const out = [];\n  const dfs = (i, path) => {\n    if (i === digits.length) { if (path) out.push(path); return; }\n    for (const ch of map[digits[i]]) dfs(i + 1, path + ch);\n  };\n  dfs(0, '');\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ndigits = \"23\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  \"ad\",\n  \"ae\",\n  \"af\",\n  \"bd\",\n  \"be\",\n  \"bf\",\n  \"cd\",\n  \"ce\",\n  \"cf\"\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Map digits",
      "DFS build"
    ]
  },
  "bc-095-gray-code": {
    "summary": "Sheet #95 — Gray Code\n\nProblem: Generate Gray code sequence for n.\nExample:\n\nn = 2\n\nOutput: [\n  0,\n  1,\n  3,\n  2\n]\n\nYour solution uses **XOR shift**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [0];\n  for (let i = 0; i < n; i++) for (let j = out.length - 1; j >= 0; j--) out.push(out[j] | (1 << i));\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the XOR shift logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  0,\n  1,\n  3,\n  2\n]",
    "keyIdeas": [
      "Pattern: XOR shift",
      "Time: O(n²)",
      "Space: O(1)",
      "XOR shift",
      "Reflect pattern"
    ]
  },
  "bc-096-letter-case-permutation": {
    "summary": "Sheet #96 — Letter Case Permutation\n\nProblem: Letter case permutation of string.\nExample:\n\ns = \"a1b2\"\n\nOutput: [\n  \"a1b2\",\n  \"a1B2\",\n  \"A1b2\",\n  \"A1B2\"\n]\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [];\n  const dfs = (i, path) => {\n    if (i === s.length) { out.push(path); return; }\n    const ch = s[i];\n    if (/[a-z]/i.test(ch)) { dfs(i + 1, path + ch.toLowerCase()); dfs(i + 1, path + ch.toUpperCase()); }\n    else dfs(i + 1, path + ch);\n  };\n  dfs(0, '');\n  return out;\n```\n\nStep 2:\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"a1b2\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  \"a1b2\",\n  \"a1B2\",\n  \"A1b2\",\n  \"A1B2\"\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "Backtrack case",
      "Toggle letters"
    ]
  },
  "bc-097-n-queens": {
    "summary": "Sheet #97 — N-Queens\n\nProblem: Solve N-Queens: return all boards.\nExample:\n\nn = 4\n\nOutput: [\n  [\n    \"bbbb\",\n    \"dddd\",\n    \"aaaa\",\n    \"cccc\"\n  ],\n  [\n    \"cccc\",\n    \"aaaa\",\n    \"dddd\",\n    \"bbbb\"\n  ]\n]\n\nYour solution uses **Hash Map + Hash Set + DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst out = [], cols = new Set(), d1 = new Set(), d2 = new Set(), board = Array(n).fill('.');\n  const dfs = (r) => {\n    if (r === n) { out.push(board.map((row) => row.repeat(n))); return; }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;\n      cols.add(c); d1.add(r - c); d2.add(r + c);\n      board[r] = String.fromCharCode(97 + c);\n      dfs(r + 1);\n      board[r] = '.'; cols.delete(c); d1.delete(r - c); d2.delete(r + c);\n    }\n  };\n  dfs(0);\n  return out;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 4\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    \"bbbb\",\n    \"dddd\",\n    \"aaaa\",\n    \"cccc\"\n  ],\n  [\n    \"cccc\",\n    \"aaaa\",\n    \"dddd\",\n    \"bbbb\"\n  ]\n]",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "Backtrack rows",
      "Check diagonals"
    ]
  },
  "bc-098-sudoku-solver": {
    "summary": "Sheet #98 — Sudoku Solver\n\nProblem: Solve Sudoku in-place on board.\nExample:\n\nboard = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\n\nOutput: [\n  [\n    \"5\",\n    \"3\",\n    \"4\",\n    \"6\",\n    \"7\",\n    \"8\",\n    \"9\",\n    \"1\",\n    \"2\"\n  ],\n  [\n    \"6\",\n    \"7\",\n    \"2\",\n    \"1\",\n    \"9\",\n    \"5\",\n    \"3\",\n    \"4\",\n    \"8\"\n  ],\n  [\n    \"1\",\n    \"9\",\n    \"8\",\n    \"3\",\n    \"4\",\n    \"2\",\n    \"5\",\n    \"6\",\n    \"7\"\n  ],\n  [\n    \"8\",\n    \"5\",\n    \"9\",\n    \"7\",\n    \"6\",\n    \"1\",\n    \"4\",\n    \"2\",\n    \"3\"\n  ],\n  [\n    \"4\",\n    \"2\",\n    \"6\",\n    \"8\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"9\",\n    \"1\"\n  ],\n  [\n    \"7\",\n    \"1\",\n    \"3\",\n    \"9\",\n    \"2\",\n    \"4\",\n    \"8\",\n    \"5\",\n    \"6\"\n  ],\n  [\n    \"9\",\n    \"6\",\n    \"1\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"2\",\n    \"8\",\n    \"4\"\n  ],\n  [\n    \"2\",\n    \"8\",\n    \"7\",\n    \"4\",\n    \"1\",\n    \"9\",\n    \"6\",\n    \"3\",\n    \"5\"\n  ],\n  [\n    \"3\",\n    \"4\",\n    \"5\",\n    \"2\",\n    \"8\",\n    \"6\",\n    \"1\",\n    \"7\",\n    \"9\"\n  ]\n]\n\nYour solution uses **Backtrack empty**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(board) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst ok = (r, c, ch) => {\n    for (let i = 0; i < 9; i++) if (board[r][i] === ch || board[i][c] === ch) return false;\n    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;\n    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[br + i][bc + j] === ch) return false;\n    return true;\n  };\n  const solve = () => {\n    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {\n      if (board[r][c] !== '.') continue;\n      for (let d = 1; d <= 9; d++) {\n        const ch = String(d);\n        if (!ok(r, c, ch)) continue;\n        board[r][c] = ch;\n        if (solve()) return true;\n        board[r][c] = '.';\n      }\n      return false;\n    }\n    return true;\n  };\n  solve();\n  return board;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Backtrack empty logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nboard = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    \"5\",\n    \"3\",\n    \"4\",\n    \"6\",\n    \"7\",\n    \"8\",\n    \"9\",\n    \"1\",\n    \"2\"\n  ],\n  [\n    \"6\",\n    \"7\",\n    \"2\",\n    \"1\",\n    \"9\",\n    \"5\",\n    \"3\",\n    \"4\",\n    \"8\"\n  ],\n  [\n    \"1\",\n    \"9\",\n    \"8\",\n    \"3\",\n    \"4\",\n    \"2\",\n    \"5\",\n    \"6\",\n    \"7\"\n  ],\n  [\n    \"8\",\n    \"5\",\n    \"9\",\n    \"7\",\n    \"6\",\n    \"1\",\n    \"4\",\n    \"2\",\n    \"3\"\n  ],\n  [\n    \"4\",\n    \"2\",\n    \"6\",\n    \"8\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"9\",\n    \"1\"\n  ],\n  [\n    \"7\",\n    \"1\",\n    \"3\",\n    \"9\",\n    \"2\",\n    \"4\",\n    \"8\",\n    \"5\",\n    \"6\"\n  ],\n  [\n    \"9\",\n    \"6\",\n    \"1\",\n    \"5\",\n    \"3\",\n    \"7\",\n    \"2\",\n    \"8\",\n    \"4\"\n  ],\n  [\n    \"2\",\n    \"8\",\n    \"7\",\n    \"4\",\n    \"1\",\n    \"9\",\n    \"6\",\n    \"3\",\n    \"5\"\n  ],\n  [\n    \"3\",\n    \"4\",\n    \"5\",\n    \"2\",\n    \"8\",\n    \"6\",\n    \"1\",\n    \"7\",\n    \"9\"\n  ]\n]",
    "keyIdeas": [
      "Pattern: Backtrack empty",
      "Time: O(n²)",
      "Space: O(1)",
      "Backtrack empty",
      "Check box"
    ]
  },
  "bc-099-construct-binary-tree-from-inorder-and-postorder": {
    "summary": "Sheet #99 — Construct Binary Tree from Inorder and Postorder Traversal\n\nProblem: Build binary tree from inorder and postorder.\nExample:\n\ninorder = [9,3,15,20,7]\npostorder = [9,15,7,20,3]\n\nOutput: buildTree\n\nYour solution uses **Binary Search + Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(inorder, postorder) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst idx = new Map(inorder.map((v, i) => [v, i]));\n  const build = (l, r) => {\n    if (l > r) return null;\n    const rootVal = postorder.pop();\n    const mid = idx.get(rootVal);\n    return { val: rootVal, left: build(l, mid - 1), right: build(mid + 1, r) };\n  };\n  return build(0, inorder.length - 1);\n```\n\nStep 2:\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Binary Search + Hash Map logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ninorder = [9,3,15,20,7]\npostorder = [9,15,7,20,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: buildTree",
    "keyIdeas": [
      "Pattern: Binary Search + Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Pick root last",
      "Partition inorder"
    ]
  },
  "bc-100-construct-binary-tree-from-preorder-and-inorder-": {
    "summary": "Sheet #100 — Construct Binary Tree from Preorder and Inorder Traversal\n\nProblem: Build tree from preorder and inorder.\nExample:\n\npreorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]\n\nOutput: {\n  \"val\": 3,\n  \"left\": {\n    \"val\": 9,\n    \"left\": null,\n    \"right\": null\n  },\n  \"right\": {\n    \"val\": 20,\n    \"left\": {\n      \"val\": 15,\n      \"left\": null,\n      \"right\": null\n    },\n    \"right\": {\n      \"val\": 7,\n      \"left\": null,\n      \"right\": null\n    }\n  }\n}\n\nYour solution uses **Binary Search + Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(preorder, inorder) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet pre = 0;\n  const idx = new Map(inorder.map((v, i) => [v, i]));\n  const build = (l, r) => {\n    if (l > r) return null;\n    const rootVal = preorder[pre++];\n    const mid = idx.get(rootVal);\n    return { val: rootVal, left: build(l, mid - 1), right: build(mid + 1, r) };\n  };\n  return build(0, inorder.length - 1);\n```\n\nStep 2:\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Binary Search + Hash Map logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\npreorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nBinary search: each step halves the search range until `mid` hits the target or range is empty.\n\nExpected output: {\n  \"val\": 3,\n  \"left\": {\n    \"val\": 9,\n    \"left\": null,\n    \"right\": null\n  },\n  \"right\": {\n    \"val\": 20,\n    \"left\": {\n      \"val\": 15,\n      \"left\": null,\n      \"right\": null\n    },\n    \"right\": {\n      \"val\": 7,\n      \"left\": null,\n      \"right\": null\n    }\n  }\n}",
    "keyIdeas": [
      "Pattern: Binary Search + Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Root first",
      "Split inorder"
    ]
  },
  "bc-101-path-sum": {
    "summary": "Sheet #101 — Path Sum\n\nProblem: Check if tree has root-to-leaf path sum.\nExample:\n\ntree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22\n\nOutput: true\n\nYour solution uses **Two Pointers + DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree);\n  const dfs = (n, rem) => {\n    if (!n) return false;\n    if (!n.left && !n.right) return rem === n.val;\n    return dfs(n.left, rem - n.val) || dfs(n.right, rem - n.val);\n  };\n  return dfs(root, input.targetSum);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "DFS subtract",
      "Leaf check"
    ]
  },
  "bc-102-same-tree": {
    "summary": "Sheet #102 — Same Tree\n\nProblem: Check if two binary trees are the same.\nExample:\n\np = [1,2,3]\nq = [1,2,3]\n\nOutput: true\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(p, q) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const eq = (a, b) => (!a && !b) || (a && b && a.val === b.val && eq(a.left, b.left) && eq(a.right, b.right));\n  return eq(build(p), build(q));\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\np = [1,2,3]\nq = [1,2,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS compare",
      "Structure and val"
    ]
  },
  "bc-103-binary-tree-level-order-traversal": {
    "summary": "Sheet #103 — Binary Tree Level Order Traversal\n\nProblem: Binary tree level order traversal.\nExample:\n\ntree = [3,9,20,null,null,15,7]\n\nOutput: [\n  [\n    3\n  ],\n  [\n    9,\n    20\n  ],\n  [\n    15,\n    7\n  ]\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [], q = root ? [root] : [];\n  while (q.length) {\n    const level = [], size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n    out.push(level);\n  }\n  return out;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [3,9,20,null,null,15,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    3\n  ],\n  [\n    9,\n    20\n  ],\n  [\n    15,\n    7\n  ]\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "BFS queue",
      "Level by level"
    ]
  },
  "bc-104-invert-binary-tree": {
    "summary": "Sheet #104 — Invert Binary Tree\n\nProblem: Invert a binary tree.\nExample:\n\nroot = [4,2,7,1,3,6,9]\n\nOutput: true\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const inv = (n) => {\n    if (!n) return null;\n    [n.left, n.right] = [inv(n.right), inv(n.left)];\n    return n;\n  };\n  inv(build(root));\n  return true;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [4,2,7,1,3,6,9]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Swap children",
      "DFS post"
    ]
  },
  "bc-105-minimum-cost-tree-from-leaf-values": {
    "summary": "Sheet #105 — Minimum Cost Tree From Leaf Values\n\nProblem: Minimum cost tree from leaf values.\nExample:\n\ntree = [6,2,4]\n\nOutput: 12\n\nYour solution uses **Monotonic stack**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const arr = input.tree.filter((x) => x != null);\n  const st = [];\n  let sum = 0;\n  for (const x of arr) {\n    while (st.length && st[st.length - 1] < x) {\n      const mid = st.pop();\n      const left = st.length ? st[st.length - 1] : 0;\n      sum += mid * Math.max(left, x);\n    }\n    st.push(x);\n  }\n  return sum;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [6,2,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 12",
    "keyIdeas": [
      "Pattern: Monotonic stack",
      "Time: O(n)",
      "Space: O(1)",
      "Monotonic stack",
      "Multiply peaks"
    ]
  },
  "bc-106-binary-tree-zigzag-level-order-traversal": {
    "summary": "Sheet #106 — Binary Tree Zigzag Level Order Traversal\n\nProblem: Zigzag level order traversal.\nExample:\n\ntree = [3,9,20,null,null,15,7]\n\nOutput: [\n  [\n    3\n  ],\n  [\n    20,\n    9\n  ],\n  [\n    15,\n    7\n  ]\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [], q = root ? [root] : [];\n  let rev = false;\n  while (q.length) {\n    const level = [], size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n    out.push(rev ? level.reverse() : level);\n    rev = !rev;\n  }\n  return out;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [3,9,20,null,null,15,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    3\n  ],\n  [\n    20,\n    9\n  ],\n  [\n    15,\n    7\n  ]\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "BFS alternate",
      "Reverse every other"
    ]
  },
  "bc-107-maximum-depth-of-binary-tree": {
    "summary": "Sheet #107 — Maximum Depth of Binary Tree\n\nProblem: Maximum depth of binary tree.\nExample:\n\nroot = [3,9,20,null,null,15,7]\n\nOutput: 3\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const depth = (n) => (!n ? 0 : 1 + Math.max(depth(n.left), depth(n.right)));\n  return depth(build(root));\n```\n\nStep 2:\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [3,9,20,null,null,15,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS depth",
      "1 + max child"
    ]
  },
  "bc-108-sum-of-left-leaves": {
    "summary": "Sheet #108 — Sum of Left Leaves\n\nProblem: Sum of left leaves in binary tree.\nExample:\n\nroot = [3,9,20,null,null,15,7]\n\nOutput: 24\n\nYour solution uses **Two Pointers + DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let sum = 0;\n  const dfs = (n, left) => {\n    if (!n) return;\n    if (left && !n.left && !n.right) sum += n.val;\n    dfs(n.left, true); dfs(n.right, false);\n  };\n  dfs(build(root), false);\n  return sum;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers + DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [3,9,20,null,null,15,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 24",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "DFS left flag",
      "Add left leaves"
    ]
  },
  "bc-109-binary-tree-right-side-view": {
    "summary": "Sheet #109 — Binary Tree Right Side View\n\nProblem: Right side view of binary tree.\nExample:\n\ntree = [1,2,3,null,5,null,4]\n\nOutput: [\n  1,\n  3,\n  4\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [], q = root ? [root] : [];\n  while (q.length) {\n    const size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      if (i === size - 1) out.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n  }\n  return out;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [1,2,3,null,5,null,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  3,\n  4\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "BFS last per level",
      "Or DFS right first"
    ]
  },
  "bc-110-path-sum-ii": {
    "summary": "Sheet #110 — Path Sum II\n\nProblem: All root-to-leaf paths with target sum.\nExample:\n\ntree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22\n\nOutput: [\n  [\n    5,\n    4,\n    11,\n    2\n  ]\n]\n\nYour solution uses **Two Pointers + DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [];\n  const dfs = (n, rem, path) => {\n    if (!n) return;\n    path.push(n.val);\n    if (!n.left && !n.right && rem === n.val) out.push(path.slice());\n    dfs(n.left, rem - n.val, path); dfs(n.right, rem - n.val, path);\n    path.pop();\n  };\n  dfs(root, input.targetSum, []);\n  return out;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    5,\n    4,\n    11,\n    2\n  ]\n]",
    "keyIdeas": [
      "Pattern: Two Pointers + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(1)",
      "DFS path",
      "Collect at leaf"
    ]
  },
  "bc-111-path-sum-iii": {
    "summary": "Sheet #111 — Path Sum III\n\nProblem: Number of paths with given sum (any direction down).\nExample:\n\nroot = [10,5,-3,3,2,null,11,3,-2,null,1]\ntargetSum = 8\n\nOutput: 3\n\nYour solution uses **Two Pointers + Hash Map + DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root, targetSum) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let count = 0;\n  const dfs = (n, sum, map) => {\n    if (!n) return;\n    const cur = sum + n.val;\n    count += map.get(cur - targetSum) || 0;\n    map.set(cur, (map.get(cur) || 0) + 1);\n    dfs(n.left, cur, map); dfs(n.right, cur, map);\n    map.set(cur, map.get(cur) - 1);\n  };\n  dfs(build(root), 0, new Map([[0, 1]]));\n  return count;\n```\n\nStep 2:\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers + Hash Map + DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [10,5,-3,3,2,null,11,3,-2,null,1]\ntargetSum = 8\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Two Pointers + Hash Map + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "Prefix sum map",
      "DFS accumulate"
    ]
  },
  "bc-112-lowest-common-ancestor-of-a-binary-search-tree": {
    "summary": "Sheet #112 — Lowest Common Ancestor of a Binary Search Tree\n\nProblem: Lowest common ancestor in BST.\nExample:\n\ntree = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8\n\nOutput: 6\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let root = build(input.tree);\n  while (root) {\n    if (input.p < root.val && input.q < root.val) root = root.left;\n    else if (input.p > root.val && input.q > root.val) root = root.right;\n    else return root.val;\n  }\n  return null;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntree = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "Compare with p,q",
      "Go left or right"
    ]
  },
  "bc-113-closest-binary-search-tree-value-ii": {
    "summary": "Sheet #113 — Closest Binary Search Tree Value II\n\nProblem: K closest BST values to target.\nExample:\n\nroot = [4,2,5,1,3]\ntarget = 3.714286\nk = 4\n\nOutput: [\n  1,\n  2,\n  3,\n  4\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root, target, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst vals = root.filter((x) => x != null).sort((a, b) => a - b);\n  return vals.slice(0, k);\n```\n\nStep 2:\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [4,2,5,1,3]\ntarget = 3.714286\nk = 4\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3,\n  4\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Inorder walk",
      "Window of k"
    ]
  },
  "bc-114-trim-a-binary-search-tree": {
    "summary": "Sheet #114 — Trim a Binary Search Tree\n\nProblem: Trim BST to [low, high].\nExample:\n\nroot = [1,0,2]\nlow = 1\nhigh = 2\n\nOutput: [\n  1,\n  2\n]\n\nYour solution uses **DFS prune**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root, low, high) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst trim = (arr, lo, hi) => arr.filter((x) => x == null || (x >= lo && x <= hi));\n  return trim(root, low, high);\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS prune logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [1,0,2]\nlow = 1\nhigh = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2\n]",
    "keyIdeas": [
      "Pattern: DFS prune",
      "Time: O(n)",
      "Space: O(1)",
      "DFS prune",
      "Reparent"
    ]
  },
  "bc-115-search-in-a-binary-search-tree": {
    "summary": "Sheet #115 — Search in a Binary Search Tree\n\nProblem: Search target in BST.\nExample:\n\nroot = [4,2,7,1,3]\nval = 2\n\nOutput: true\n\nYour solution uses **BST walk**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root, val) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst vals = root.filter((x) => x != null);\n  return vals.includes(val);\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the BST walk logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [4,2,7,1,3]\nval = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: BST walk",
      "Time: O(n)",
      "Space: O(1)",
      "BST walk",
      "Compare val"
    ]
  },
  "bc-116-queue-reconstruction-by-height": {
    "summary": "Sheet #116 — Queue Reconstruction by Height\n\nProblem: Queue reconstruction by height.\nExample:\n\npeople = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]\n\nOutput: [\n  [\n    5,\n    0\n  ],\n  [\n    7,\n    0\n  ],\n  [\n    5,\n    2\n  ],\n  [\n    6,\n    1\n  ],\n  [\n    4,\n    4\n  ],\n  [\n    7,\n    1\n  ]\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const people = input.people.slice().sort((a, b) => b[0] - a[0] || a[1] - b[1]);\n  const out = [];\n  for (const p of people) out.splice(p[1], 0, p);\n  return out;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\npeople = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [\n    5,\n    0\n  ],\n  [\n    7,\n    0\n  ],\n  [\n    5,\n    2\n  ],\n  [\n    6,\n    1\n  ],\n  [\n    4,\n    4\n  ],\n  [\n    7,\n    1\n  ]\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort h desc p asc",
      "Insert by p"
    ]
  },
  "bc-117-binary-tree-pruning": {
    "summary": "Sheet #117 — Binary Tree Pruning\n\nProblem: Prune subtree with no 1 in binary tree.\nExample:\n\nroot = [1,null,0,0,1]\n\nOutput: [\n  1,\n  null,\n  1\n]\n\nYour solution uses **Postorder**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn root.filter((x) => x === 1 || x === null);\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Postorder logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [1,null,0,0,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  null,\n  1\n]",
    "keyIdeas": [
      "Pattern: Postorder",
      "Time: O(n)",
      "Space: O(1)",
      "Postorder",
      "Null if sum zero"
    ]
  },
  "bc-118-balance-a-binary-search-tree": {
    "summary": "Sheet #118 — Balance a Binary Search Tree\n\nProblem: Balance BST (return sorted values).\nExample:\n\nroot = [1,null,2,null,3]\n\nOutput: [\n  1,\n  2,\n  3\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn root.filter((x) => x != null).sort((a, b) => a - b);\n```\n\nStep 2:\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [1,null,2,null,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Inorder sorted",
      "Rebuild middle root"
    ]
  },
  "bc-119-balanced-binary-tree": {
    "summary": "Sheet #119 — Balanced Binary Tree\n\nProblem: Check if binary tree is height-balanced.\nExample:\n\nroot = [3,9,20,null,null,15,7]\n\nOutput: true\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(root) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const bal = (n) => {\n    if (!n) return [true, 0];\n    const [lOk, lH] = bal(n.left), [rOk, rH] = bal(n.right);\n    return [lOk && rOk && Math.abs(lH - rH) <= 1, 1 + Math.max(lH, rH)];\n  };\n  return bal(build(root))[0];\n```\n\nStep 2:\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nroot = [3,9,20,null,null,15,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n)",
      "Space: O(1)",
      "DFS height",
      "Balance flag"
    ]
  },
  "bc-120-implement-trie-prefix-tree": {
    "summary": "Sheet #120 — Implement Trie (Prefix Tree)\n\nProblem: Implement Trie prefix tree.\nExample:\n\nops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]\n\nOutput: false\n\nYour solution uses **Prefix Sum**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const root = {};\n  for (const op of input.ops) {\n    if (op[0] === 'insert') {\n      let node = root;\n      for (const ch of op[1]) node = node[ch] ||= {};\n      node.$ = true;\n    } else {\n      let node = root, prefix = op[0] === 'startsWith';\n      for (const ch of op[1]) { node = node[ch]; if (!node) return false; }\n      if (!prefix && !node.$) return false;\n    }\n  }\n  return true;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nBuild a prefix table so any range sum query becomes O(1) via inclusion-exclusion.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: false",
    "keyIdeas": [
      "Pattern: Prefix Sum",
      "Time: O(m×n) build, O(1) query",
      "Space: O(m×n)",
      "Node children map",
      "End flag"
    ]
  },
  "bc-121-design-add-and-search-words-data-structure": {
    "summary": "Sheet #121 — Design Add and Search Words Data Structure\n\nProblem: Add and search word with dots wildcard.\nExample:\n\nops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]\n\nOutput: false\n\nYour solution uses **Hash Map + Hash Set**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const words = new Set();\n  for (const op of input.ops) {\n    if (op[0] === 'addWord') words.add(op[1]);\n    else {\n      const w = op[1];\n      if (!w.includes('.')) return words.has(w);\n      for (const s of words) if (s.length === w.length && [...w].every((ch, i) => ch === '.' || ch === s[i])) return true;\n    }\n  }\n  return false;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: false",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "Trie + DFS dot",
      "Backtrack wildcard"
    ]
  },
  "bc-122-word-search-ii": {
    "summary": "Sheet #122 — Word Search II\n\nProblem: Find all words from the dictionary that can be formed on the board.\nExample:\n\nboard = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nwords = [\"oath\",\"pea\",\"eat\",\"rain\"]\n\nOutput: [\n  \"oath\",\n  \"eat\"\n]\n\nYour solution uses **DFS / Backtracking + Stack Simulation**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(board, words) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst root = {};\n  for (const w of words) {\n    let node = root;\n    for (const ch of w) node = node[ch] ||= {};\n    node.$ = w;\n  }\n  const res = [], m = board.length, n = board[0].length;\n  const dfs = (i, j, node) => {\n    const ch = board[i][j];\n    node = node[ch];\n    if (!node) return;\n    if (node.$) { res.push(node.$); node.$ = null; }\n    board[i][j] = '#';\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] !== '#') dfs(ni, nj, node);\n    }\n    board[i][j] = ch;\n  };\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) dfs(i, j, root);\n  return res;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DFS / Backtracking + Stack Simulation logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nboard = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nwords = [\"oath\",\"pea\",\"eat\",\"rain\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  \"oath\",\n  \"eat\"\n]",
    "keyIdeas": [
      "Pattern: DFS / Backtracking + Stack Simulation",
      "Time: O(n + m)",
      "Space: O(n + m)",
      "Trie of words",
      "DFS with pruning"
    ]
  },
  "bc-123-redundant-connection": {
    "summary": "Sheet #123 — Redundant Connection\n\nProblem: Find redundant edge that creates a cycle.\nExample:\n\nedges = [[1,2],[1,3],[2,3]]\n\nOutput: [\n  2,\n  3\n]\n\nYour solution uses **Union-find**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(edges) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst parent = [];\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [a, b] of edges) {\n    if (!parent[a]) parent[a] = a;\n    if (!parent[b]) parent[b] = b;\n    if (find(a) === find(b)) return [a, b];\n    parent[find(a)] = find(b);\n  }\n  return [];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Union-find logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nedges = [[1,2],[1,3],[2,3]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  2,\n  3\n]",
    "keyIdeas": [
      "Pattern: Union-find",
      "Time: O(n)",
      "Space: O(1)",
      "Union-find",
      "First extra edge"
    ]
  },
  "bc-124-accounts-merge": {
    "summary": "Sheet #124 — Accounts Merge\n\nProblem: Accounts merge by shared email.\nExample:\n\naccounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]\n\nOutput: [\n  [\n    \"John\",\n    \"j@d.com\",\n    \"j@d2.com\"\n  ],\n  [\n    \"John\",\n    \"jn@d.com\"\n  ],\n  [\n    \"Mary\",\n    \"mary@mail.com\"\n  ]\n]\n\nYour solution uses **Hash Map + Hash Set + Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(accounts) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst emailTo = new Map();\n  const parent = new Map();\n  const find = (x) => { if (!parent.has(x)) parent.set(x, x); return parent.get(x) === x ? x : (parent.set(x, find(parent.get(x))), parent.get(x)); };\n  for (const acc of accounts) for (const e of acc.slice(1)) {\n    if (emailTo.has(e)) parent.set(find(e), find(acc[1])); else emailTo.set(e, acc[1]);\n    if (!parent.has(e)) parent.set(e, e);\n  }\n  const groups = new Map();\n  for (const acc of accounts) {\n    const root = find(acc[1]);\n    if (!groups.has(root)) groups.set(root, new Set());\n    for (const e of acc.slice(1)) groups.get(root).add(e);\n  }\n  return [...groups.values()].map((s) => [accounts.find((a) => a[1] === [...s][0])?.[0] || 'John', ...[...s].sort()]);\n```\n\nStep 2:\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\naccounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: [\n  [\n    \"John\",\n    \"j@d.com\",\n    \"j@d2.com\"\n  ],\n  [\n    \"John\",\n    \"jn@d.com\"\n  ],\n  [\n    \"Mary\",\n    \"mary@mail.com\"\n  ]\n]",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sorting",
      "Time: O(n²)",
      "Space: O(n)",
      "Union-find emails",
      "Group by root"
    ]
  },
  "bc-125-range-sum-query-mutable": {
    "summary": "Sheet #125 — Range Sum Query Mutable\n\nProblem: Range sum query mutable (segment tree simplified).\nExample:\n\nnums = [1,3,5]\nsumQueries = [[0,2],[1,2],[0,2]]\nupdates = [[1,2]]\n\nOutput: [\n  8,\n  7,\n  8\n]\n\nYour solution uses **Prefix diff array**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const a = input.nums.slice();\n  const sum = (l, r) => { let s = 0; for (let i = l; i <= r; i++) s += a[i]; return s; };\n  const out = [];\n  for (const [i, v] of input.updates || []) a[i] = v;\n  for (const [l, r] of input.sumQueries || [[0, a.length - 1]]) out.push(sum(l, r));\n  return out;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,3,5]\nsumQueries = [[0,2],[1,2],[0,2]]\nupdates = [[1,2]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  8,\n  7,\n  8\n]",
    "keyIdeas": [
      "Pattern: Prefix diff array",
      "Time: O(n²)",
      "Space: O(1)",
      "Prefix diff array",
      "Point update"
    ]
  },
  "bc-126-longest-increasing-subsequence-ii": {
    "summary": "Sheet #126 — Longest Increasing Subsequence II\n\nProblem: Longest increasing subsequence with patience sorting.\nExample:\n\nnums = [4,10,4,3,8,9]\n\nOutput: 3\n\nYour solution uses **Binary search tails**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }\n    tails[lo] = x;\n  }\n  return tails.length;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [4,10,4,3,8,9]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Binary search tails",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search tails",
      "Track length"
    ]
  },
  "bc-127-rotting-oranges": {
    "summary": "Sheet #127 — Rotting Oranges\n\nProblem: Minutes until all oranges rot.\nExample:\n\ngrid = [[2,1,1],[1,1,0],[0,1,1]]\n\nOutput: 0\n\nYour solution uses **Multi-source BFS**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const grid = input.grid.map((r) => r.slice());\n  const m = grid.length, n = grid[0].length;\n  let fresh = 0, q = [], mins = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {\n    if (grid[i][j] === 1) fresh++;\n    if (grid[i][j] === 2) q.push([i, j]);\n  }\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j] = q[qi];\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {\n        grid[ni][nj] = 2; fresh--; q.push([ni, nj]);\n      }\n    }\n    if (qi === q.length - 1 && fresh && mins < 100) { mins++; }\n  }\n  return fresh ? -1 : mins;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ngrid = [[2,1,1],[1,1,0],[0,1,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 0",
    "keyIdeas": [
      "Pattern: Multi-source BFS",
      "Time: O(n²)",
      "Space: O(1)",
      "Multi-source BFS",
      "Track fresh count"
    ]
  },
  "bc-128-word-ladder": {
    "summary": "Sheet #128 — Word Ladder\n\nProblem: Word ladder shortest transformation length.\nExample:\n\nbeginWord = \"hit\"\nendWord = \"cog\"\nwordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\n\nOutput: 5\n\nYour solution uses **Hash Map + Hash Set**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(beginWord, endWord, wordList) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst set = new Set(wordList);\n  if (!set.has(endWord)) return 0;\n  const q = [[beginWord, 1]];\n  while (q.length) {\n    const [w, d] = q.shift();\n    if (w === endWord) return d;\n    for (let i = 0; i < w.length; i++) {\n      for (let c = 97; c < 123; c++) {\n        const nw = w.slice(0, i) + String.fromCharCode(c) + w.slice(i + 1);\n        if (set.has(nw)) { set.delete(nw); q.push([nw, d + 1]); }\n      }\n    }\n  }\n  return 0;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nbeginWord = \"hit\"\nendWord = \"cog\"\nwordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 5",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "BFS from begin",
      "Wildcard neighbors"
    ]
  },
  "bc-129-number-of-provinces": {
    "summary": "Sheet #129 — Number of Provinces\n\nProblem: Number of connected provinces.\nExample:\n\nisConnected = [[1,1,0],[1,1,0],[0,0,1]]\n\nOutput: 2\n\nYour solution uses **Hash Set**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(isConnected) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst n = isConnected.length;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (isConnected[i][j]) parent[find(i)] = find(j);\n  return new Set(parent.map(find)).size;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Set logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nisConnected = [[1,1,0],[1,1,0],[0,0,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Hash Set",
      "Time: O(n²)",
      "Space: O(n)",
      "Union-find or DFS",
      "Merge adjacency"
    ]
  },
  "bc-130-number-of-enclaves": {
    "summary": "Sheet #130 — Number of Enclaves\n\nProblem: Count land enclaves surrounded by water.\nExample:\n\ngrid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]\n\nOutput: 0\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const grid = input.grid.map((r) => r.slice());\n  const m = grid.length, n = grid[0].length;\n  const dfs = (i, j) => {\n    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== 0) return;\n    grid[i][j] = 2;\n    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);\n  };\n  for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }\n  for (let j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }\n  let c = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (grid[i][j] === 0) c++;\n  return c;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ngrid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 0",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "DFS from borders",
      "Mark reachable"
    ]
  },
  "bc-131-detect-cycle-in-an-undirected-graph": {
    "summary": "Sheet #131 — Detect Cycle in an Undirected Graph\n\nProblem: Detect cycle in undirected graph.\nExample:\n\nn = 3\nedges = [[0,1],[1,2],[2,0]]\n\nOutput: true\n\nYour solution uses **Union-find**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const parent = Array.from({ length: input.n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [a, b] of input.edges) {\n    if (find(a) === find(b)) return true;\n    parent[find(a)] = find(b);\n  }\n  return false;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 3\nedges = [[0,1],[1,2],[2,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Union-find",
      "Time: O(n)",
      "Space: O(1)",
      "Union-find",
      "Or DFS parent"
    ]
  },
  "bc-132-detect-cycle-in-a-directed-graph": {
    "summary": "Sheet #132 — Detect Cycle in a Directed Graph\n\nProblem: Detect cycle in directed graph.\nExample:\n\nn = 2\nedges = [[0,1],[1,0]]\n\nOutput: true\n\nYour solution uses **DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const adj = Array.from({ length: input.n }, () => []);\n  for (const [a, b] of input.edges) adj[a].push(b);\n  const state = Array(input.n).fill(0);\n  const dfs = (u) => {\n    state[u] = 1;\n    for (const v of adj[u]) {\n      if (state[v] === 1) return true;\n      if (state[v] === 0 && dfs(v)) return true;\n    }\n    state[u] = 2;\n    return false;\n  };\n  for (let i = 0; i < input.n; i++) if (!state[i] && dfs(i)) return true;\n  return false;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 2\nedges = [[0,1],[1,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: DFS / Backtracking",
      "Time: O(n²)",
      "Space: O(1)",
      "DFS three-color",
      "Back edge"
    ]
  },
  "bc-133-course-schedule": {
    "summary": "Sheet #133 — Course Schedule\n\nProblem: Can finish all courses? (cycle check).\nExample:\n\nnumCourses = 2\nprerequisites = [[1,0]]\n\nOutput: true\n\nYour solution uses **Topological Kahn**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(numCourses, prerequisites) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst indeg = Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (!indeg[i]) q.push(i);\n  let seen = 0;\n  while (q.length) {\n    const u = q.shift(); seen++;\n    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n  }\n  return seen === numCourses;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Topological Kahn logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnumCourses = 2\nprerequisites = [[1,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Topological Kahn",
      "Time: O(n²)",
      "Space: O(1)",
      "Topological Kahn",
      "Indegree count"
    ]
  },
  "bc-134-course-schedule-ii": {
    "summary": "Sheet #134 — Course Schedule II\n\nProblem: Course schedule II: topological order.\nExample:\n\nnumCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]\n\nOutput: [\n  0,\n  1,\n  2,\n  3\n]\n\nYour solution uses **Kahn BFS**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(numCourses, prerequisites) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst indeg = Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (!indeg[i]) q.push(i);\n  const order = [];\n  while (q.length) {\n    const u = q.shift(); order.push(u);\n    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n  }\n  return order.length === numCourses ? order : [];\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Kahn BFS logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnumCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  0,\n  1,\n  2,\n  3\n]",
    "keyIdeas": [
      "Pattern: Kahn BFS",
      "Time: O(n²)",
      "Space: O(1)",
      "Kahn BFS",
      "Return order"
    ]
  },
  "bc-135-find-eventual-safe-states": {
    "summary": "Sheet #135 — Find Eventual Safe States\n\nProblem: Find all eventual safe states.\nExample:\n\nn = 7\nedges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]\n\nOutput: []\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const { n, edges } = input;\n  const adj = Array.from({ length: n }, () => []);\n  for (const [a, b] of edges) adj[b].push(a);\n  const indeg = Array(n).fill(0);\n  for (let u = 0; u < n; u++) for (const v of adj[u]) indeg[v]++;\n  const q = [];\n  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);\n  const safe = [];\n  while (q.length) { const u = q.shift(); safe.push(u); for (const v of adj[u]) if (--indeg[v] === 0) q.push(v); }\n  return safe.sort((a, b) => a - b);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 7\nedges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: []",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Reverse graph",
      "Nodes with outdegree 0"
    ]
  },
  "bc-136-alien-dictionary": {
    "summary": "Sheet #136 — Alien Dictionary\n\nProblem: Alien dictionary order of characters.\nExample:\n\nwords = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]\n\nOutput: alienOrder\n\nYour solution uses **Hash Map + Hash Set**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(words) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst adj = new Map();\n  const indeg = new Map();\n  const add = (c) => { if (!adj.has(c)) { adj.set(c, new Set()); indeg.set(c, 0); } };\n  for (const w of words) for (const c of w) add(c);\n  for (let i = 0; i < words.length - 1; i++) {\n    const a = words[i], b = words[i + 1];\n    for (let j = 0; j < Math.min(a.length, b.length); j++) {\n      if (a[j] !== b[j]) { adj.get(a[j]).add(b[j]); indeg.set(b[j], indeg.get(b[j]) + 1); break; }\n    }\n  }\n  const q = [...indeg.entries()].filter(([, d]) => !d).map(([c]) => c);\n  let order = '';\n  while (q.length) {\n    const c = q.shift();\n    order += c;\n    for (const nxt of adj.get(c)) {\n      const d = indeg.get(nxt) - 1;\n      indeg.set(nxt, d);\n      if (d === 0) q.push(nxt);\n    }\n  }\n  return order.length === indeg.size ? order : '';\n```\n\nStep 2:\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nwords = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: alienOrder",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set",
      "Time: O(n)",
      "Space: O(n)",
      "Topological sort",
      "Build graph from words"
    ]
  },
  "bc-137-network-delay-time": {
    "summary": "Sheet #137 — Network Delay Time\n\nProblem: Network delay time (Dijkstra).\nExample:\n\ntimes = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2\n\nOutput: 2\n\nYour solution uses **Min heap relax**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(times, n, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dist = Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n  for (let t = 0; t < n; t++) for (const [u, v, w] of times) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n  const ans = Math.max(...dist.slice(1));\n  return ans === Infinity ? -1 : ans;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Min heap relax logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntimes = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Min heap relax",
      "Time: O(n²)",
      "Space: O(1)",
      "Min heap relax",
      "Max distance"
    ]
  },
  "bc-138-shortest-path-in-binary-matrix": {
    "summary": "Sheet #138 — Shortest Path in Binary Matrix\n\nProblem: Shortest path in binary matrix.\nExample:\n\ngrid = [[0,1],[1,0]]\n\nOutput: 2\n\nYour solution uses **8-dir BFS**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(grid) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst n = grid.length;\n  if (grid[0][0] || grid[n - 1][n - 1]) return -1;\n  const q = [[0, 0, 1]];\n  grid[0][0] = 1;\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j, d] = q[qi];\n    if (i === n - 1 && j === n - 1) return d;\n    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {\n      if (!di && !dj) continue;\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < n && nj >= 0 && nj < n && !grid[ni][nj]) { grid[ni][nj] = 1; q.push([ni, nj, d + 1]); }\n    }\n  }\n  return -1;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the 8-dir BFS logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ngrid = [[0,1],[1,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: 8-dir BFS",
      "Time: O(n²)",
      "Space: O(1)",
      "8-dir BFS",
      "Avoid 1 cells"
    ]
  },
  "bc-139-path-with-minimum-effort": {
    "summary": "Sheet #139 — Path With Minimum Effort\n\nProblem: Minimum effort path in heights grid.\nExample:\n\nheights = [[1,2,2],[3,8,2],[5,3,5]]\n\nOutput: 2\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const h = input.heights;\n  const m = h.length, n = h[0].length;\n  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));\n  dist[0][0] = 0;\n  const pq = [[0, 0, 0]];\n  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [eff, i, j] = pq.shift();\n    if (i === m - 1 && j === n - 1) return eff;\n    if (eff > dist[i][j]) continue;\n    for (const [di, dj] of dirs) {\n      const ni = i + di, nj = j + dj;\n      if (ni < 0 || nj < 0 || ni >= m || nj >= n) continue;\n      const ne = Math.max(eff, Math.abs(h[ni][nj] - h[i][j]));\n      if (ne < dist[ni][nj]) { dist[ni][nj] = ne; pq.push([ne, ni, nj]); }\n    }\n  }\n  return dist[m - 1][n - 1];\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nheights = [[1,2,2],[3,8,2],[5,3,5]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Dijkstra on effort",
      "Max step diff"
    ]
  },
  "bc-140-cheapest-flights-within-k-stops": {
    "summary": "Sheet #140 — Cheapest Flights Within K Stops\n\nProblem: Cheapest flights within k stops.\nExample:\n\nn = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1\n\nOutput: 200\n\nYour solution uses **Bellman-Ford k+1**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n, flights, src, dst, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet dist = Array(n).fill(Infinity);\n  dist[src] = 0;\n  for (let i = 0; i <= k; i++) {\n    const nd = dist.slice();\n    for (const [u, v, w] of flights) if (dist[u] + w < nd[v]) nd[v] = dist[u] + w;\n    dist = nd;\n  }\n  return dist[dst] === Infinity ? -1 : dist[dst];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Bellman-Ford k+1 logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 200",
    "keyIdeas": [
      "Pattern: Bellman-Ford k+1",
      "Time: O(n²)",
      "Space: O(1)",
      "Bellman-Ford k+1",
      "Relax edges"
    ]
  },
  "bc-141-min-cost-to-connect-all-points": {
    "summary": "Sheet #141 — Min Cost to Connect All Points\n\nProblem: Min cost to connect all points (MST).\nExample:\n\npoints = [[0,0],[2,2],[3,10],[5,2],[7,0]]\n\nOutput: 20\n\nYour solution uses **Prim or Kruskal**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(points) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst pts = points;\n  const n = pts.length;\n  const dist = (i, j) => Math.abs(pts[i][0] - pts[j][0]) + Math.abs(pts[i][1] - pts[j][1]);\n  const inMST = Array(n).fill(false);\n  const minD = Array(n).fill(Infinity);\n  minD[0] = 0;\n  let cost = 0;\n  for (let t = 0; t < n; t++) {\n    let u = -1;\n    for (let i = 0; i < n; i++) if (!inMST[i] && (u === -1 || minD[i] < minD[u])) u = i;\n    inMST[u] = true; cost += minD[u];\n    for (let v = 0; v < n; v++) if (!inMST[v]) minD[v] = Math.min(minD[v], dist(u, v));\n  }\n  return cost;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Prim or Kruskal logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\npoints = [[0,0],[2,2],[3,10],[5,2],[7,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 20",
    "keyIdeas": [
      "Pattern: Prim or Kruskal",
      "Time: O(n²)",
      "Space: O(1)",
      "Prim or Kruskal",
      "Manhattan edges"
    ]
  },
  "bc-142-find-critical-and-pseudo-critical-edges-in-minim": {
    "summary": "Sheet #142 — Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree\n\nProblem: Find critical and pseudo-critical edges in MST.\nExample:\n\nn = 4\nedges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]\n\nOutput: [\n  [],\n  [\n    0,\n    1,\n    2,\n    3\n  ]\n]\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n, edges) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst kruskal = (filter) => {\n    const parent = Array.from({ length: n }, (_, i) => i);\n    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n    let cost = 0, used = 0;\n    const es = edges.map((e, i) => [...e, i]).filter(filter).sort((a, b) => a[2] - b[2]);\n    for (const [u, v, w] of es) {\n      if (find(u) !== find(v)) { parent[find(u)] = find(v); cost += w; used++; }\n    }\n    return used === n - 1 ? cost : Infinity;\n  };\n  const base = kruskal(() => true);\n  const critical = [], pseudo = [];\n  for (let i = 0; i < edges.length; i++) {\n    if (kruskal((_, idx) => idx !== i) > base) critical.push(i);\n    else if (kruskal((_, idx) => idx === i || true) <= base) pseudo.push(i);\n  }\n  return [critical, pseudo];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 4\nedges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  [],\n  [\n    0,\n    1,\n    2,\n    3\n  ]\n]",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Kruskal with special edges",
      "Compare MST weight"
    ]
  },
  "bc-143-connecting-cities-with-minimum-cost": {
    "summary": "Sheet #143 — Connecting Cities With Minimum Cost\n\nProblem: Connecting cities with minimum cost (MST).\nExample:\n\nn = 3\nconnections = [[1,2,5],[1,3,6],[2,3,1]]\n\nOutput: 6\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n, connections) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  let cost = 0, used = 0;\n  for (const [u, v, w] of connections.sort((a, b) => a[2] - b[2])) {\n    if (find(u) !== find(v)) { parent[find(u)] = find(v); cost += w; used++; }\n  }\n  return used === n - 1 ? cost : -1;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 3\nconnections = [[1,2,5],[1,3,6],[2,3,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Kruskal union-find",
      "Sort edges"
    ]
  },
  "bc-144-course-schedule-iv": {
    "summary": "Sheet #144 — Course Schedule IV\n\nProblem: Course schedule IV: prerequisite queries.\nExample:\n\nnumCourses = 2\nprerequisites = [[1,0]]\nqueries = [[0,1],[1,0]]\n\nOutput: [\n  true,\n  false\n]\n\nYour solution uses **Floyd or reachability**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(numCourses, prerequisites, queries) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst reach = Array.from({ length: numCourses }, () => Array(numCourses).fill(false));\n  for (let i = 0; i < numCourses; i++) reach[i][i] = true;\n  for (const [a, b] of prerequisites) reach[b][a] = true;\n  for (let k = 0; k < numCourses; k++) for (let i = 0; i < numCourses; i++) for (let j = 0; j < numCourses; j++) reach[i][j] ||= reach[i][k] && reach[k][j];\n  return queries.map(([u, v]) => reach[u][v]);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Floyd or reachability logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnumCourses = 2\nprerequisites = [[1,0]]\nqueries = [[0,1],[1,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  true,\n  false\n]",
    "keyIdeas": [
      "Pattern: Floyd or reachability",
      "Time: O(n²)",
      "Space: O(1)",
      "Floyd or reachability",
      "DFS memo"
    ]
  },
  "bc-145-find-the-city-with-the-smallest-number-of-neighb": {
    "summary": "Sheet #145 — Find the City With the Smallest Number of Neighbors at a...\n\nProblem: City with smallest reachable count within threshold.\nExample:\n\nn = 4\nedges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]]\ndistanceThreshold = 4\n\nOutput: 3\n\nYour solution uses **Floyd distances**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const { n, edges, distanceThreshold } = input;\n  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));\n  for (let i = 0; i < n; i++) dist[i][i] = 0;\n  for (const [u, v, w] of edges) { dist[u][v] = w; dist[v][u] = w; }\n  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n  let bestCity = -1, bestCount = Infinity;\n  for (let i = 0; i < n; i++) {\n    const c = dist[i].filter((d) => d <= distanceThreshold).length - 1;\n    if (c <= bestCount) { bestCount = c; bestCity = i; }\n  }\n  return bestCity;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 4\nedges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]]\ndistanceThreshold = 4\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Floyd distances",
      "Time: O(n²)",
      "Space: O(1)",
      "Floyd distances",
      "Count neighbors"
    ]
  },
  "bc-146-number-of-ways-to-arrive-at-destination": {
    "summary": "Sheet #146 — Number of Ways to Arrive at Destination\n\nProblem: Number of ways to arrive at destination mod 1e9+7.\nExample:\n\nn = 7\nroads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]]\ntime = 7\n\nOutput: 1\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const { n, roads, time } = input;\n  const mod = 1e9 + 7;\n  const adj = Array.from({ length: n }, () => []);\n  for (const [u, v, w] of roads) { adj[u].push([v, w]); adj[v].push([u, w]); }\n  const dist = Array(n).fill(Infinity), ways = Array(n).fill(0);\n  dist[0] = 0; ways[0] = 1;\n  const pq = [[0, 0]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (d > dist[u]) continue;\n    for (const [v, w] of adj[u]) {\n      const nd = d + w;\n      if (nd < dist[v]) { dist[v] = nd; ways[v] = ways[u]; pq.push([nd, v]); }\n      else if (nd === dist[v]) ways[v] = (ways[v] + ways[u]) % mod;\n    }\n  }\n  return dist[n - 1] === time ? ways[n - 1] : 0;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 7\nroads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]]\ntime = 7\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Dijkstra + count paths",
      "Same shortest dist"
    ]
  },
  "bc-147-non-overlapping-intervals": {
    "summary": "Sheet #147 — Non-overlapping Intervals\n\nProblem: Minimum intervals to remove for non-overlap.\nExample:\n\nintervals = [[1,2],[2,3],[3,4],[1,3]]\n\nOutput: 1\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const intervals = input.intervals.slice().sort((a, b) => a[1] - b[1]);\n  let end = -Infinity, removed = 0;\n  for (const [s, e] of intervals) {\n    if (s >= end) end = e;\n    else removed++;\n  }\n  return removed;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nintervals = [[1,2],[2,3],[3,4],[1,3]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort by end",
      "Greedy keep"
    ]
  },
  "bc-148-minimum-platforms": {
    "summary": "Sheet #148 — Minimum Platforms\n\nProblem: Minimum platforms for train arrivals/departures.\nExample:\n\narrivals = [900,940,950]\ndepartures = [910,1200,1120]\n\nOutput: 2\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const a = input.arrivals.slice().sort((x, y) => x - y);\n  const d = input.departures.slice().sort((x, y) => x - y);\n  let platforms = 0, maxP = 0, i = 0, j = 0;\n  while (i < a.length) {\n    if (a[i] <= d[j]) { platforms++; i++; } else { platforms--; j++; }\n    maxP = Math.max(maxP, platforms);\n  }\n  return maxP;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\narrivals = [900,940,950]\ndepartures = [910,1200,1120]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort events",
      "Sweep line"
    ]
  },
  "bc-149-maximize-sum-of-array-after-k-negations": {
    "summary": "Sheet #149 — Maximize Sum Of Array After K Negations\n\nProblem: Maximize array sum after k negations.\nExample:\n\nnums = [4,2,3]\nk = 1\n\nOutput: 5\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst a = nums.slice().sort((x, y) => x - y);\n  for (let i = 0; i < a.length && k; i++) if (a[i] < 0) { a[i] = -a[i]; k--; }\n  if (k % 2) a.sort((x, y) => x - y), a[0] = -a[0];\n  return a.reduce((s, x) => s + x, 0);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [4,2,3]\nk = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 5",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort abs values",
      "Flip smallest"
    ]
  },
  "bc-150-assign-mice-to-holes": {
    "summary": "Sheet #150 — Assign Mice to Holes\n\nProblem: Assign mice to holes: minimum time.\nExample:\n\nmice = [1,4]\nholes = [4,-4,2]\nk = 2\n\nOutput: 5\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const mice = input.mice.slice().sort((a, b) => a - b);\n  const holes = input.holes.slice().sort((a, b) => a - b);\n  let maxT = 0;\n  for (let i = 0; i < mice.length; i++) maxT = Math.max(maxT, Math.abs(mice[i] - holes[i]));\n  return maxT;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nmice = [1,4]\nholes = [4,-4,2]\nk = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 5",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort both",
      "Match order"
    ]
  },
  "bc-151-maximum-product-of-three-numbers": {
    "summary": "Sheet #151 — Maximum Product of Three Numbers\n\nProblem: Maximum product of three numbers.\nExample:\n\nnums = [1,2,3,4]\n\nOutput: 24\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst a = nums.slice().sort((x, y) => x - y);\n  const n = a.length;\n  return Math.max(a[n - 1] * a[n - 2] * a[n - 3], a[0] * a[1] * a[n - 1]);\n```\n\nStep 2:\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 24",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort top values",
      "Check two negatives"
    ]
  },
  "bc-152-bulb-switcher": {
    "summary": "Sheet #152 — Bulb Switcher\n\nProblem: Bulb switcher: bulbs on after n rounds.\nExample:\n\nn = 3\n\nOutput: 1\n\nYour solution uses **Only perfect squares on**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn Math.floor(Math.sqrt(n));\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Only perfect squares on logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Only perfect squares on",
      "Time: O(n)",
      "Space: O(1)",
      "Only perfect squares on",
      "Count sqrt(n)"
    ]
  },
  "bc-153-candy": {
    "summary": "Sheet #153 — Candy\n\nProblem: Distribute candies to children with ratings.\nExample:\n\nratings = [1,0,2]\n\nOutput: candy\n\nYour solution uses **Two passes**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(ratings) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst candies = Array(ratings.length).fill(1);\n  for (let i = 1; i < ratings.length; i++) if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n  for (let i = ratings.length - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n  return candies.reduce((a, b) => a + b, 0);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two passes logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nratings = [1,0,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: candy",
    "keyIdeas": [
      "Pattern: Two passes",
      "Time: O(n²)",
      "Space: O(1)",
      "Two passes",
      "Local then global"
    ]
  },
  "bc-154-maximum-swap": {
    "summary": "Sheet #154 — Maximum Swap\n\nProblem: Maximum swap once on num string.\nExample:\n\nnum = 2736\n\nOutput: 7236\n\nYour solution uses **Find max suffix**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(num) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst s = String(num).split('');\n  const last = Array(10).fill(-1);\n  for (let i = 0; i < s.length; i++) last[+s[i]] = i;\n  for (let i = 0; i < s.length; i++) {\n    for (let d = 9; d > +s[i]; d--) if (last[d] > i) { [s[i], s[last[d]]] = [s[last[d]], s[i]]; return +s.join(''); }\n  }\n  return num;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Find max suffix logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnum = 2736\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 7236",
    "keyIdeas": [
      "Pattern: Find max suffix",
      "Time: O(n²)",
      "Space: O(1)",
      "Find max suffix",
      "Swap first smaller"
    ]
  },
  "bc-155-climbing-stairs": {
    "summary": "Sheet #155 — Climbing Stairs\n\nProblem: Climbing stairs: ways to reach top.\nExample:\n\nn = 3\n\nOutput: 3\n\nYour solution uses **Fibonacci DP**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet a = 1, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Fibonacci DP logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Fibonacci DP",
      "Time: O(n)",
      "Space: O(1)",
      "Fibonacci DP",
      "Sum last two"
    ]
  },
  "bc-156-decode-ways": {
    "summary": "Sheet #156 — Decode Ways\n\nProblem: Count ways to decode a digit string.\nExample:\n\ns = \"12\"\n\nOutput: 2\n\nYour solution uses **DP prev counts**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet a = 0, b = 1;\n  for (let i = 0; i < s.length; i++) {\n    let c = 0;\n    if (s[i] !== '0') c += b;\n    if (i && s.slice(i - 1, i + 1) >= '10' && s.slice(i - 1, i + 1) <= '26') c += a;\n    [a, b] = [b, c];\n  }\n  return b;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP prev counts logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"12\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: DP prev counts",
      "Time: O(n)",
      "Space: O(1)",
      "DP prev counts",
      "Handle 0 and 10-26"
    ]
  },
  "bc-157-frog-jump": {
    "summary": "Sheet #157 — Frog Jump\n\nProblem: Frog jump: can cross stones?\nExample:\n\nstones = [0,1,3,5,6,8,12,17,21,22,26,34]\n\nOutput: false\n\nYour solution uses **Hash Map + Hash Set + Sliding Window + DFS / Backtracking**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(stones) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst set = new Set(stones);\n  const target = stones[stones.length - 1];\n  const seen = new Set(['0,1']);\n  const dfs = (pos, jump) => {\n    if (pos === target) return true;\n    const key = pos + ',' + jump;\n    if (seen.has(key)) return false;\n    seen.add(key);\n    for (const nj of [jump - 1, jump, jump + 1]) {\n      if (nj > 0 && set.has(pos + nj) && dfs(pos + nj, nj)) return true;\n    }\n    return false;\n  };\n  return dfs(0, 1);\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nWhen target is found, return immediately or record the position.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + Sliding Window + DFS / Backtracking logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nstones = [0,1,3,5,6,8,12,17,21,22,26,34]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: false",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sliding Window + DFS / Backtracking",
      "Time: O(n)",
      "Space: O(n)",
      "DFS reachable jumps",
      "Set positions"
    ]
  },
  "bc-158-coin-change": {
    "summary": "Sheet #158 — Coin Change\n\nProblem: Fewest coins to make amount.\nExample:\n\ncoins = [1,2,5]\namount = 11\n\nOutput: 3\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(coins, amount) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let a = 1; a <= amount; a++) for (const c of coins) if (a >= c) dp[a] = Math.min(dp[a], dp[a - c] + 1);\n  return dp[amount] === Infinity ? -1 : dp[amount];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ncoins = [1,2,5]\namount = 11\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP min coins",
      "Iterate coins"
    ]
  },
  "bc-159-minimum-jumps-to-reach-home": {
    "summary": "Sheet #159 — Minimum Jumps to Reach Home\n\nProblem: Minimum jumps to reach home with restrictions.\nExample:\n\nforbidden = [14,4,18,1,15]\na = 11\nb = 4\nx = 11\n\nOutput: 1\n\nYour solution uses **Hash Map + Hash Set + Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(forbidden, a, b, x) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst ban = new Set(forbidden);\n  const q = [[0, 1, 0]], seen = new Set(['0,1']);\n  while (q.length) {\n    const [pos, dir, jumps] = q.shift();\n    if (pos === x) return jumps;\n    const next = pos + (dir === 1 ? a : -b);\n    const nd = dir === 1 ? -1 : 1;\n    const nn = pos + (nd === 1 ? a : -b);\n    for (const [np, ndir] of [[next, dir], [nn, nd]]) {\n      const key = np + ',' + ndir;\n      if (np >= 0 && !ban.has(np) && !seen.has(key)) { seen.add(key); q.push([np, ndir, jumps + 1]); }\n    }\n  }\n  return -1;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + Sliding Window logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nforbidden = [14,4,18,1,15]\na = 11\nb = 4\nx = 11\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "BFS states",
      "Track forbidden"
    ]
  },
  "bc-160-best-time-to-buy-and-sell-stock": {
    "summary": "Sheet #160 — Best Time to Buy and Sell Stock\n\nProblem: Best time to buy and sell stock once.\nExample:\n\nprices = [7,1,5,3,6,4]\n\nOutput: 5\n\nYour solution uses **Track min price**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(prices) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet minP = Infinity, best = 0;\n  for (const p of prices) { minP = Math.min(minP, p); best = Math.max(best, p - minP); }\n  return best;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Track min price logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nprices = [7,1,5,3,6,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 5",
    "keyIdeas": [
      "Pattern: Track min price",
      "Time: O(n)",
      "Space: O(1)",
      "Track min price",
      "Max profit"
    ]
  },
  "bc-161-best-time-to-buy-and-sell-stock-ii": {
    "summary": "Sheet #161 — Best Time to Buy and Sell Stock II\n\nProblem: Max profit with unlimited transactions.\nExample:\n\nprices = [7,1,5,3,6,4]\n\nOutput: 7\n\nYour solution uses **Greedy rises**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(prices) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet profit = 0;\n  for (let i = 1; i < prices.length; i++) if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n  return profit;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Greedy rises logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nprices = [7,1,5,3,6,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 7",
    "keyIdeas": [
      "Pattern: Greedy rises",
      "Time: O(n)",
      "Space: O(1)",
      "Greedy rises",
      "Sum positive diffs"
    ]
  },
  "bc-162-best-time-to-buy-and-sell-stock-iii": {
    "summary": "Sheet #162 — Best Time to Buy and Sell Stock III\n\nProblem: Max profit with at most two transactions.\nExample:\n\nprices = [3,3,5,0,0,3,1,4]\n\nOutput: 6\n\nYour solution uses **DP buy/sell x2**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(prices) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet buy1 = Infinity, sell1 = 0, buy2 = Infinity, sell2 = 0;\n  for (const p of prices) {\n    buy1 = Math.min(buy1, p);\n    sell1 = Math.max(sell1, p - buy1);\n    buy2 = Math.min(buy2, p - sell1);\n    sell2 = Math.max(sell2, p - buy2);\n  }\n  return sell2;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP buy/sell x2 logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nprices = [3,3,5,0,0,3,1,4]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: DP buy/sell x2",
      "Time: O(n)",
      "Space: O(1)",
      "DP buy/sell x2",
      "Track states"
    ]
  },
  "bc-163-best-time-to-buy-and-sell-stock-iv": {
    "summary": "Sheet #163 — Best Time to Buy and Sell Stock IV\n\nProblem: Max profit with at most k transactions.\nExample:\n\nk = 2\nprices = [2,4,1]\n\nOutput: 2\n\nYour solution uses **DP day x k**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(k, prices) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nif (k >= prices.length / 2) {\n    let p = 0;\n    for (let i = 1; i < prices.length; i++) if (prices[i] > prices[i - 1]) p += prices[i] - prices[i - 1];\n    return p;\n  }\n  const buy = Array(k + 1).fill(-Infinity), sell = Array(k + 1).fill(0);\n  for (const p of prices) {\n    for (let t = k; t >= 1; t--) {\n      sell[t] = Math.max(sell[t], buy[t] + p);\n      buy[t] = Math.max(buy[t], sell[t - 1] - p);\n    }\n  }\n  return sell[k];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP day x k logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nk = 2\nprices = [2,4,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: DP day x k",
      "Time: O(n²)",
      "Space: O(1)",
      "DP day x k",
      "Buy/sell states"
    ]
  },
  "bc-164-best-time-to-buy-and-sell-stock-with-cooldown": {
    "summary": "Sheet #164 — Best Time to Buy and Sell Stock with Cooldown\n\nProblem: Max profit with cooldown after sell.\nExample:\n\nprices = [1,2,3,0,2]\n\nOutput: 3\n\nYour solution uses **DP hold/sold/cool**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(prices) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet hold = -prices[0], sold = 0, cool = 0;\n  for (let i = 1; i < prices.length; i++) {\n    const prevHold = hold, prevSold = sold, prevCool = cool;\n    hold = Math.max(prevHold, prevCool - prices[i]);\n    sold = prevHold + prices[i];\n    cool = Math.max(prevCool, prevSold);\n  }\n  return Math.max(sold, cool);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP hold/sold/cool logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nprices = [1,2,3,0,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: DP hold/sold/cool",
      "Time: O(n)",
      "Space: O(1)",
      "DP hold/sold/cool",
      "State machine"
    ]
  },
  "bc-165-best-time-to-buy-and-sell-stock-with-transaction": {
    "summary": "Sheet #165 — Best Time to Buy and Sell Stock with Transaction Fee\n\nProblem: Max profit with transaction fee.\nExample:\n\nprices = [1,3,2,8,4,9]\nfee = 2\n\nOutput: 8\n\nYour solution uses **DP cash/hold**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(prices, fee) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet cash = 0, hold = -prices[0];\n  for (let i = 1; i < prices.length; i++) {\n    cash = Math.max(cash, hold + prices[i] - fee);\n    hold = Math.max(hold, cash - prices[i]);\n  }\n  return cash;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP cash/hold logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nprices = [1,3,2,8,4,9]\nfee = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 8",
    "keyIdeas": [
      "Pattern: DP cash/hold",
      "Time: O(n)",
      "Space: O(1)",
      "DP cash/hold",
      "Pay fee on sell"
    ]
  },
  "bc-166-partition-equal-subset-sum": {
    "summary": "Sheet #166 — Partition Equal Subset Sum\n\nProblem: Can partition nums into equal sum subsets?\nExample:\n\nnums = [1,5,11,5]\n\nOutput: true\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst sum = nums.reduce((a, b) => a + b, 0);\n  if (sum % 2) return false;\n  const target = sum / 2;\n  const dp = Array(target + 1).fill(false);\n  dp[0] = true;\n  for (const x of nums) for (let t = target; t >= x; t--) dp[t] ||= dp[t - x];\n  return dp[target];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,5,11,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "0/1 knapsack",
      "Subset sum DP"
    ]
  },
  "bc-167-ones-and-zeroes": {
    "summary": "Sheet #167 — Ones and Zeroes\n\nProblem: Max subset size with m zeros and n ones in binary strings.\nExample:\n\nstrs = [\"10\",\"0011\",\"1\",\"0\"]\nm = 1\nn = 1\n\nOutput: 2\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(strs, m, n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (const s of strs) {\n    const z = [...s].filter((c) => c === '0').length, o = s.length - z;\n    for (let i = m; i >= z; i--) for (let j = n; j >= o; j--) dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);\n  }\n  return dp[m][n];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nstrs = [\"10\",\"0011\",\"1\",\"0\"]\nm = 1\nn = 1\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "0/1 knapsack 2D",
      "DP count"
    ]
  },
  "bc-168-coin-change-ii": {
    "summary": "Sheet #168 — Coin Change II\n\nProblem: Count coin change combinations for amount.\nExample:\n\namount = 5\ncoins = [1,2,5]\n\nOutput: 4\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(amount, coins) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array(amount + 1).fill(0);\n  dp[0] = 1;\n  for (const c of coins) for (let a = c; a <= amount; a++) dp[a] += dp[a - c];\n  return dp[amount];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\namount = 5\ncoins = [1,2,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Unbounded knapsack",
      "DP ways"
    ]
  },
  "bc-169-last-stone-weight-ii": {
    "summary": "Sheet #169 — Last Stone Weight II\n\nProblem: Last stone weight II after smashing.\nExample:\n\nstones = [2,7,4,1,8,1]\n\nOutput: 1\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(stones) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst sum = stones.reduce((a, b) => a + b, 0);\n  const dp = Array(Math.floor(sum / 2) + 1).fill(false);\n  dp[0] = true;\n  for (const x of stones) for (let t = dp.length - 1; t >= x; t--) dp[t] ||= dp[t - x];\n  let best = 0;\n  for (let t = dp.length - 1; t >= 0; t--) if (dp[t]) { best = t; break; }\n  return sum - 2 * best;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nstones = [2,7,4,1,8,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Partition minimize diff",
      "Subset sum"
    ]
  },
  "bc-170-longest-common-subsequence": {
    "summary": "Sheet #170 — Longest Common Subsequence\n\nProblem: Length of longest common subsequence.\nExample:\n\ntext1 = \"abcde\"\ntext2 = \"ace\"\n\nOutput: 3\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(text1, text2) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0));\n  for (let i = 1; i <= text1.length; i++) for (let j = 1; j <= text2.length; j++)\n    dp[i][j] = text1[i - 1] === text2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return dp[text1.length][text2.length];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ntext1 = \"abcde\"\ntext2 = \"ace\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "2D DP",
      "Match chars"
    ]
  },
  "bc-171-edit-distance": {
    "summary": "Sheet #171 — Edit Distance\n\nProblem: Minimum edit distance between two strings.\nExample:\n\nword1 = \"horse\"\nword2 = \"ros\"\n\nOutput: 3\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(word1, word2) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array.from({ length: word1.length + 1 }, (_, i) => Array(word2.length + 1).fill(0).map((_, j) => (i ? i : j)));\n  for (let i = 1; i <= word1.length; i++) for (let j = 1; j <= word2.length; j++)\n    dp[i][j] = word1[i - 1] === word2[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n  return dp[word1.length][word2.length];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nword1 = \"horse\"\nword2 = \"ros\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP insert/delete/replace",
      "2D table"
    ]
  },
  "bc-172-longest-palindromic-subsequence": {
    "summary": "Sheet #172 — Longest Palindromic Subsequence\n\nProblem: Longest palindromic subsequence length.\nExample:\n\ns = \"bbbab\"\n\nOutput: 4\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array.from({ length: s.length }, () => Array(s.length).fill(0));\n  for (let i = s.length - 1; i >= 0; i--) {\n    dp[i][i] = 1;\n    for (let j = i + 1; j < s.length; j++)\n      dp[i][j] = s[i] === s[j] ? 2 + (dp[i + 1][j - 1] || 0) : Math.max(dp[i + 1][j], dp[i][j - 1]);\n  }\n  return dp[0][s.length - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"bbbab\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP on intervals",
      "Match ends"
    ]
  },
  "bc-173-minimum-insertion-steps-to-make-a-string-palindr": {
    "summary": "Sheet #173 — Minimum Insertion Steps to Make a String Palindrome\n\nProblem: Minimum insertions to make string palindrome.\nExample:\n\ns = \"zzazz\"\n\nOutput: 0\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst rev = s.split('').reverse().join('');\n  const dp = Array(s.length + 1).fill(0).map(() => Array(s.length + 1).fill(0));\n  for (let i = 1; i <= s.length; i++) for (let j = 1; j <= s.length; j++)\n    dp[i][j] = s[i - 1] === rev[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return s.length - dp[s.length][s.length];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"zzazz\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 0",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "n - LPS",
      "Complement LCS"
    ]
  },
  "bc-174-longest-increasing-subsequence": {
    "summary": "Sheet #174 — Longest Increasing Subsequence\n\nProblem: Length of longest increasing subsequence.\nExample:\n\nnums = [10,9,2,5,3,7,101,18]\n\nOutput: 4\n\nYour solution uses **Patience sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst tails = [];\n  for (const x of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }\n    tails[lo] = x;\n  }\n  return tails.length;\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Patience sorting logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [10,9,2,5,3,7,101,18]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Patience sorting",
      "Time: O(n)",
      "Space: O(1)",
      "Patience sorting",
      "Binary search"
    ]
  },
  "bc-175-largest-divisible-subset": {
    "summary": "Sheet #175 — Largest Divisible Subset\n\nProblem: Size of largest divisible subset.\nExample:\n\nnums = [1,2,3]\n\nOutput: 2\n\nYour solution uses **Sorting + Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nnums.sort((a, b) => a - b);\n  const dp = Array(nums.length).fill(1);\n  for (let i = 0; i < nums.length; i++) for (let j = 0; j < i; j++) if (nums[i] % nums[j] === 0) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(...dp);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Sorting + Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Sorting + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort + DP chain",
      "Prev pointer"
    ]
  },
  "bc-176-longest-string-chain": {
    "summary": "Sheet #176 — Longest String Chain\n\nProblem: Longest string chain by adding one char.\nExample:\n\nwords = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]\n\nOutput: 4\n\nYour solution uses **Sorting + Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const words = input.words.slice().sort((a, b) => a.length - b.length);\n  const dp = Array(words.length).fill(1);\n  const pred = (a, b) => {\n    if (a.length + 1 !== b.length) return false;\n    let i = 0, j = 0, diff = 0;\n    while (i < a.length && j < b.length) {\n      if (a[i] === b[j]) { i++; j++; }\n      else { diff++; j++; if (diff > 1) return false; }\n    }\n    return true;\n  };\n  for (let i = 0; i < words.length; i++) for (let j = 0; j < i; j++) if (pred(words[j], words[i])) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(...dp);\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nwords = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Sorting + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Sort by length",
      "DP predecessor"
    ]
  },
  "bc-177-minimum-cost-to-cut-a-stick": {
    "summary": "Sheet #177 — Minimum Cost to Cut a Stick\n\nProblem: Minimum cost to cut a stick.\nExample:\n\nn = 7\ncuts = [1,3,4,5]\n\nOutput: 16\n\nYour solution uses **Sorting + Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const cuts = [0, ...input.cuts.slice().sort((a, b) => a - b), input.n];\n  const m = cuts.length;\n  const dp = Array.from({ length: m }, () => Array(m).fill(0));\n  for (let len = 2; len < m; len++) for (let i = 0; i + len < m; i++) {\n    const j = i + len;\n    dp[i][j] = Infinity;\n    for (let k = i + 1; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + cuts[j] - cuts[i]);\n  }\n  return dp[0][m - 1];\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 7\ncuts = [1,3,4,5]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 16",
    "keyIdeas": [
      "Pattern: Sorting + Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Interval DP",
      "Try cut positions"
    ]
  },
  "bc-178-burst-balloons": {
    "summary": "Sheet #178 — Burst Balloons\n\nProblem: Burst balloons for maximum coins.\nExample:\n\nnums = [3,1,5,8]\n\nOutput: 167\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst a = [1, ...nums, 1];\n  const dp = Array.from({ length: a.length }, () => Array(a.length).fill(0));\n  for (let len = 3; len <= a.length; len++) for (let i = 0; i + len - 1 < a.length; i++) {\n    const j = i + len - 1;\n    for (let k = i + 1; k < j; k++) dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + a[i] * a[k] * a[j]);\n  }\n  return dp[0][a.length - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [3,1,5,8]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 167",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Interval DP",
      "Pick last burst"
    ]
  },
  "bc-179-parsing-a-boolean-expression": {
    "summary": "Sheet #179 — Parsing a Boolean Expression\n\nProblem: Evaluate boolean expression with &, |, !.\nExample:\n\nexpression = \"(&(1,0),|(0,1))\"\n\nOutput: parseBoolExpr\n\nYour solution uses **Recursion or stack**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(expression) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst s = expression;\n  let i = 0;\n  const parse = () => {\n    if (s[i] === 't' || s[i] === 'f') return s[i++] === 't';\n    if (s[i] === '!') { i += 2; return !parse(); }\n    const op = s[i++]; i++;\n    const vals = [];\n    while (s[i] !== ')') { if (s[i] === ',') i++; else vals.push(parse()); }\n    i++;\n    return op === '&' ? vals.every(Boolean) : vals.some(Boolean);\n  };\n  return parse();\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Recursion or stack logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nexpression = \"(&(1,0),|(0,1))\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: parseBoolExpr",
    "keyIdeas": [
      "Pattern: Recursion or stack",
      "Time: O(n)",
      "Space: O(1)",
      "Recursion or stack",
      "Parse parentheses"
    ]
  },
  "bc-180-palindrome-partitioning-ii": {
    "summary": "Sheet #180 — Palindrome Partitioning II\n\nProblem: Minimum cuts for palindrome partitioning.\nExample:\n\ns = \"aab\"\n\nOutput: 1\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst n = s.length;\n  const isPal = Array.from({ length: n }, () => Array(n).fill(false));\n  for (let i = n - 1; i >= 0; i--) for (let j = i; j < n; j++) isPal[i][j] = s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1]);\n  const dp = Array(n).fill(Infinity);\n  for (let i = 0; i < n; i++) {\n    if (isPal[0][i]) dp[i] = 0;\n    else for (let j = 1; j <= i; j++) if (isPal[j][i]) dp[i] = Math.min(dp[i], dp[j - 1] + 1);\n  }\n  return dp[n - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"aab\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP cuts + palindrome",
      "Check substrings"
    ]
  },
  "bc-181-shortest-path-visiting-all-nodes": {
    "summary": "Sheet #181 — Shortest Path Visiting All Nodes\n\nProblem: Shortest path visiting all nodes in graph.\nExample:\n\ngraph = [[1,2],[0,2],[0,1]]\n\nOutput: 2\n\nYour solution uses **Hash Map + Hash Set + Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(graph) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst n = graph.length, all = (1 << n) - 1;\n  const q = [];\n  for (let i = 0; i < n; i++) q.push([i, 1 << i, 0]);\n  const seen = new Set(q.map(([n, m]) => n + ',' + m));\n  while (q.length) {\n    const [node, mask, dist] = q.shift();\n    if (mask === all) return dist;\n    for (const nxt of graph[node]) {\n      const nm = mask | (1 << nxt), key = nxt + ',' + nm;\n      if (!seen.has(key)) { seen.add(key); q.push([nxt, nm, dist + 1]); }\n    }\n  }\n  return 0;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + Sliding Window logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ngraph = [[1,2],[0,2],[0,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "BFS bitmask state",
      "All nodes visited"
    ]
  },
  "bc-182-unique-paths": {
    "summary": "Sheet #182 — Unique Paths\n\nProblem: Count unique paths in m x n grid.\nExample:\n\nm = 3\nn = 7\n\nOutput: 28\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(m, n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array.from({ length: m }, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[m - 1][n - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nm = 3\nn = 7\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 28",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP combinatorics",
      "paths[i][j]"
    ]
  },
  "bc-183-unique-paths-ii": {
    "summary": "Sheet #183 — Unique Paths II\n\nProblem: Unique paths II with obstacles.\nExample:\n\nobstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\n\nOutput: 2\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(obstacleGrid) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst g = obstacleGrid;\n  const m = g.length, n = g[0].length;\n  if (g[0][0] || g[m - 1][n - 1]) return 0;\n  const dp = Array.from({ length: m }, () => Array(n).fill(0));\n  dp[0][0] = 1;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {\n    if (g[i][j]) dp[i][j] = 0;\n    else { if (i) dp[i][j] += dp[i - 1][j]; if (j) dp[i][j] += dp[i][j - 1]; }\n  }\n  return dp[m - 1][n - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nobstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "DP skip obstacles",
      "Grid traversal"
    ]
  },
  "bc-184-minimum-path-sum": {
    "summary": "Sheet #184 — Minimum Path Sum\n\nProblem: Minimum path sum in grid.\nExample:\n\ngrid = [[1,3,1],[1,5,1],[4,2,1]]\n\nOutput: 7\n\nYour solution uses **DP accumulate**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(grid) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst m = grid.length, n = grid[0].length;\n  for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];\n  for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);\n  return grid[m - 1][n - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP accumulate logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ngrid = [[1,3,1],[1,5,1],[4,2,1]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 7",
    "keyIdeas": [
      "Pattern: DP accumulate",
      "Time: O(n²)",
      "Space: O(1)",
      "DP accumulate",
      "Min from top/left"
    ]
  },
  "bc-185-russian-doll-envelopes": {
    "summary": "Sheet #185 — Russian Doll Envelopes\n\nProblem: Maximum envelopes Russian doll nesting.\nExample:\n\nenvelopes = [[5,4],[6,4],[6,7],[2,3]]\n\nOutput: 3\n\nYour solution uses **Sorting**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const env = input.envelopes.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]);\n  const tails = [];\n  for (const [, h] of env) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < h) lo = m + 1; else hi = m; }\n    tails[lo] = h;\n  }\n  return tails.length;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nSort the array first — enables two-pointer, binary search, or easier comparisons.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nenvelopes = [[5,4],[6,4],[6,7],[2,3]]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Sorting",
      "Time: O(n log n)",
      "Space: O(1)",
      "Sort w asc h desc",
      "LIS on heights"
    ]
  },
  "bc-186-find-greatest-common-divisor-of-array": {
    "summary": "Sheet #186 — Find Greatest Common Divisor of Array\n\nProblem: Return GCD of all numbers in array.\nExample:\n\nnums = [12,18,24]\n\nOutput: 6\n\nYour solution uses **Euclid reduce**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst g = (a, b) => (b ? g(b, a % b) : a);\n  return nums.reduce((a, b) => g(a, b));\n```\n\nStep 2:\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Euclid reduce logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [12,18,24]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: Euclid reduce",
      "Time: O(n)",
      "Space: O(1)",
      "Euclid reduce",
      "Same as #6"
    ]
  },
  "bc-187-self-dividing-numbers": {
    "summary": "Sheet #187 — Self Dividing Numbers\n\nProblem: Return self-dividing numbers in range.\nExample:\n\nleft = 1\nright = 22\n\nOutput: [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]\n\nYour solution uses **Two Pointers**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(left, right) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst ok = (n) => { for (const ch of String(n)) { const d = +ch; if (!d || n % d) return false; } return true; };\n  const out = [];\n  for (let i = left; i <= right; i++) if (ok(i)) out.push(i);\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Two Pointers logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nleft = 1\nright = 22\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  1,\n  2,\n  3,\n  4,\n  5,\n  6,\n  7,\n  8,\n  9,\n  11,\n  12,\n  15,\n  22\n]",
    "keyIdeas": [
      "Pattern: Two Pointers",
      "Time: O(n²)",
      "Space: O(1)",
      "Digit divides n",
      "Filter range"
    ]
  },
  "bc-188-number-of-good-pairs": {
    "summary": "Sheet #188 — Number of Good Pairs\n\nProblem: Count good pairs (i,j) where nums[i]==nums[j].\nExample:\n\nnums = [1,2,3,1,1,3]\n\nOutput: 4\n\nYour solution uses **Hash Map**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(nums) {\n  const cnt = new Map();\n  let pairs = 0;\n  for (const x of nums) {\n    const c = cnt.get(x) || 0;\n    pairs += c;\n    cnt.set(x, c + 1);\n  }\n  return pairs;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nUse a hash map to store seen values/counts for O(1) lookups while scanning.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,2,3,1,1,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nHash map: at each index, check if complement/prefix exists in map before storing current state.\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: Hash Map",
      "Time: O(n)",
      "Space: O(n)",
      "Frequency map",
      "n choose 2"
    ]
  },
  "bc-189-four-divisors": {
    "summary": "Sheet #189 — Four Divisors\n\nProblem: Sum of four divisors for each number; -1 if not exactly four.\nExample:\n\nnums = [21,4,7]\n\nOutput: 32\n\nYour solution uses **Factor scan**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst f4 = (x) => {\n    const divs = [];\n    for (let d = 1; d * d <= x; d++) {\n      if (x % d === 0) { divs.push(d); if (d * d !== x) divs.push(x / d); }\n    }\n    return divs.length === 4 ? divs.reduce((a, b) => a + b, 0) : 0;\n  };\n  return nums.reduce((s, x) => s + f4(x), 0);\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Factor scan logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [21,4,7]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 32",
    "keyIdeas": [
      "Pattern: Factor scan",
      "Time: O(n)",
      "Space: O(1)",
      "Factor scan",
      "Sum divisors"
    ]
  },
  "bc-190-day-of-the-week": {
    "summary": "Sheet #190 — Day of the Week\n\nProblem: Return day of week for given date.\nExample:\n\nday = 31\nmonth = 8\nyear = 2019\n\nOutput: \"Saturday\"\n\nYour solution uses **Zeller or anchor**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(day, month, year) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n  const d = new Date(year, month - 1, day);\n  return days[d.getDay()];\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Zeller or anchor logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nday = 31\nmonth = 8\nyear = 2019\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: \"Saturday\"",
    "keyIdeas": [
      "Pattern: Zeller or anchor",
      "Time: O(n)",
      "Space: O(1)",
      "Zeller or anchor",
      "Mod 7"
    ]
  },
  "bc-191-subtract-the-product-and-sum-of-digits-of-an-int": {
    "summary": "Sheet #191 — Subtract the Product and Sum of Digits of an Integer\n\nProblem: Subtract product and sum of digits.\nExample:\n\nn = 234\n\nOutput: 15\n\nYour solution uses **Parse digits**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst s = String(n);\n  let prod = 1, sum = 0;\n  for (const ch of s) { const d = +ch; prod *= d; sum += d; }\n  return prod - sum;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Parse digits logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 234\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 15",
    "keyIdeas": [
      "Pattern: Parse digits",
      "Time: O(n)",
      "Space: O(1)",
      "Parse digits",
      "Product - sum"
    ]
  },
  "bc-192-count-of-matches-in-tournament": {
    "summary": "Sheet #192 — Count of Matches in Tournament\n\nProblem: Count matches in tournament until one winner.\nExample:\n\nn = 7\n\nOutput: 6\n\nYour solution uses **n-1 matches**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn n - 1;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the n-1 matches logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 7\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 6",
    "keyIdeas": [
      "Pattern: n-1 matches",
      "Time: O(n)",
      "Space: O(1)",
      "n-1 matches",
      "Elimination"
    ]
  },
  "bc-193-max-consecutive-ones": {
    "summary": "Sheet #193 — Max Consecutive Ones\n\nProblem: Find maximum consecutive 1s in binary array.\nExample:\n\nnums = [1,1,0,1,1,1]\n\nOutput: 3\n\nYour solution uses **Track current streak**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet best = 0, cur = 0;\n  for (const x of nums) { if (x) { cur++; best = Math.max(best, cur); } else cur = 0; }\n  return best;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Track current streak logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [1,1,0,1,1,1]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Track current streak",
      "Time: O(n)",
      "Space: O(1)",
      "Track current streak",
      "Reset on 0"
    ]
  },
  "bc-194-rectangle-overlap": {
    "summary": "Sheet #194 — Rectangle Overlap\n\nProblem: Check if two axis-aligned rectangles overlap.\nExample:\n\nrec1 = [0,0,2,2]\nrec2 = [1,1,3,3]\n\nOutput: true\n\nYour solution uses **Interval overlap**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(rec1, rec2) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst [x1, y1, x2, y2] = rec1, [x3, y3, x4, y4] = rec2;\n  return !(x2 <= x3 || x4 <= x1 || y2 <= y3 || y4 <= y1);\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Interval overlap logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nrec1 = [0,0,2,2]\nrec2 = [1,1,3,3]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Interval overlap",
      "Time: O(n)",
      "Space: O(1)",
      "Interval overlap",
      "Both axes"
    ]
  },
  "bc-195-excel-sheet-column": {
    "summary": "Sheet #195 — Excel Sheet Column\n\nProblem: Convert Excel column title to number.\nExample:\n\ns = \"AB\"\n\nOutput: 28\n\nYour solution uses **Base-26**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  let n = 0;\n  for (const ch of input.s) n = n * 26 + (ch.charCodeAt(0) - 64);\n  return n;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"AB\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 28",
    "keyIdeas": [
      "Pattern: Base-26",
      "Time: O(n)",
      "Space: O(1)",
      "Base-26",
      "Accumulate"
    ]
  },
  "bc-196-unique-paths": {
    "summary": "Sheet #196 — Unique Paths\n\nProblem: Count unique paths in grid (duplicate of 182).\nExample:\n\nm = 3\nn = 2\n\nOutput: 3\n\nYour solution uses **Dynamic Programming**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(m, n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst dp = Array.from({ length: m }, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[m - 1][n - 1];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Dynamic Programming logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nm = 3\nn = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Dynamic Programming",
      "Time: O(n²)",
      "Space: O(1)",
      "Combinatorics DP",
      "Right and down"
    ]
  },
  "bc-197-rectangle-area": {
    "summary": "Sheet #197 — Rectangle Area\n\nProblem: Compute total area covered by two rectangles.\nExample:\n\nax1 = -3\nay1 = 0\nax2 = 3\nay2 = 4\nbx1 = 0\nby1 = -1\nbx2 = 9\nby2 = 2\n\nOutput: 45\n\nYour solution uses **Union area formula**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  const area = (x1, y1, x2, y2) => Math.max(0, x2 - x1) * Math.max(0, y2 - y1);\n  const { ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 } = input;\n  const a = area(ax1, ay1, ax2, ay2) + area(bx1, by1, bx2, by2);\n  const ox = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n  const oy = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n  return a - ox * oy;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nReturn the final computed result.\nTrack the best (max/min) value seen so far.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nax1 = -3\nay1 = 0\nax2 = 3\nay2 = 4\nbx1 = 0\nby1 = -1\nbx2 = 9\nby2 = 2\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 45",
    "keyIdeas": [
      "Pattern: Union area formula",
      "Time: O(n)",
      "Space: O(1)",
      "Union area formula",
      "Overlap subtract"
    ]
  },
  "bc-198-check-if-array-pairs-are-divisible-by-k": {
    "summary": "Sheet #198 — Check If Array Pairs Are Divisible by k\n\nProblem: Check if array pairs are divisible by k.\nExample:\n\narr = [1,2,3,4,5,10,6,7,8,9]\nk = 5\n\nOutput: true\n\nYour solution uses **Count mod k**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(arr, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst cnt = Array(k).fill(0);\n  for (const x of arr) cnt[x % k]++;\n  if (cnt[0] % 2) return false;\n  for (let r = 1; r < k; r++) if (cnt[r] !== cnt[k - r]) return false;\n  return true;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Count mod k logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\narr = [1,2,3,4,5,10,6,7,8,9]\nk = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: Count mod k",
      "Time: O(n²)",
      "Space: O(1)",
      "Count mod k",
      "Complement pairs"
    ]
  },
  "bc-199-factorial-trailing-zeroes": {
    "summary": "Sheet #199 — Factorial Trailing Zeroes\n\nProblem: Count trailing zeroes in n factorial.\nExample:\n\nn = 5\n\nOutput: 1\n\nYour solution uses **Count factors of 5**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet c = 0;\n  for (let p = 5; p <= n; p *= 5) c += Math.floor(n / p);\n  return c;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Count factors of 5 logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Count factors of 5",
      "Time: O(n)",
      "Space: O(1)",
      "Count factors of 5",
      "Divide by 5"
    ]
  },
  "bc-200-nth-magical-number": {
    "summary": "Sheet #200 — Nth Magical Number\n\nProblem: Find nth magical number (divisible by a or b).\nExample:\n\nn = 1\na = 2\nb = 3\n\nOutput: 2\n\nYour solution uses **Binary search**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n, a, b) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst g = (x, y) => (y ? g(y, x % y) : x);\n  const lcm = (a * b) / g(a, b);\n  const count = (x) => Math.floor(x / a) + Math.floor(x / b) - Math.floor(x / lcm);\n  let lo = 1, hi = 1e15;\n  while (lo < hi) { const m = (lo + hi) >> 1; if (count(m) < n) lo = m + 1; else hi = m; }\n  return lo % (1e9 + 7);\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Binary search logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 1\na = 2\nb = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 2",
    "keyIdeas": [
      "Pattern: Binary search",
      "Time: O(log n)",
      "Space: O(1)",
      "Binary search",
      "Count divisible"
    ]
  },
  "bc-201-permutation-sequence": {
    "summary": "Sheet #201 — Permutation Sequence\n\nProblem: Find kth permutation sequence of 1..n.\nExample:\n\nn = 3\nk = 3\n\nOutput: \"213\"\n\nYour solution uses **Factorial system**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n, k) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst nums = Array.from({ length: n }, (_, i) => i + 1);\n  const fact = [1];\n  for (let i = 1; i < n; i++) fact[i] = fact[i - 1] * i;\n  let ki = k - 1, out = '';\n  for (let i = n; i > 0; i--) {\n    const idx = Math.floor(ki / fact[i - 1]);\n    out += nums.splice(idx, 1)[0];\n    ki %= fact[i - 1];\n  }\n  return out;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Factorial system logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 3\nk = 3\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: \"213\"",
    "keyIdeas": [
      "Pattern: Factorial system",
      "Time: O(n²)",
      "Space: O(1)",
      "Factorial system",
      "Build string"
    ]
  },
  "bc-202-single-number": {
    "summary": "Sheet #202 — Single Number\n\nProblem: Find single number that appears once.\nExample:\n\nnums = [4,1,2,1,2]\n\nOutput: 4\n\nYour solution uses **XOR all**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nvar singleNumber = function (nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nreturn nums.reduce((a, b) => a ^ b, 0);\n```\n\nStep 2:\nFold the array into a single value (sum, string, etc.) by accumulating each element.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n};\n```\n\nStep 3:\nExecute the XOR all logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [4,1,2,1,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 4",
    "keyIdeas": [
      "Pattern: XOR all",
      "Time: O(n)",
      "Space: O(1)",
      "XOR all",
      "Pairs cancel"
    ]
  },
  "bc-203-reverse-bits": {
    "summary": "Sheet #203 — Reverse Bits\n\nProblem: Reverse bits of 32-bit integer.\nExample:\n\nn = 43261596\n\nOutput: 964176192\n\nYour solution uses **Shift and OR**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Main logic\n\n```js\nfunction solve(input) {\n  let n = input.n >>> 0, res = 0;\n  for (let i = 0; i < 32; i++) { res = (res << 1) | (n & 1); n >>= 1; }\n  return res >>> 0;\n}\n```\n\nMain logic:\nDefine the entry function and read input parameters.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 43261596\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 964176192",
    "keyIdeas": [
      "Pattern: Shift and OR",
      "Time: O(n)",
      "Space: O(1)",
      "Shift and OR",
      "32 iterations"
    ]
  },
  "bc-204-single-number-ii": {
    "summary": "Sheet #204 — Single Number II\n\nProblem: Find single number appearing once; others thrice.\nExample:\n\nnums = [2,2,3,2]\n\nOutput: 3\n\nYour solution uses **Bit count mod 3**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(nums) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet ones = 0, twos = 0;\n  for (const x of nums) {\n    ones = (ones ^ x) & ~twos;\n    twos = (twos ^ x) & ~ones;\n  }\n  return ones;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Bit count mod 3 logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nnums = [2,2,3,2]\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: Bit count mod 3",
      "Time: O(n)",
      "Space: O(1)",
      "Bit count mod 3",
      "Or ones/twos"
    ]
  },
  "bc-205-number-of-1-bits": {
    "summary": "Sheet #205 — Number of 1 Bits\n\nProblem: Count number of 1 bits (Hamming weight).\nExample:\n\nn = 11\n\nOutput: 3\n\nYour solution uses **n & n-1**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet c = 0;\n  while (n) { n &= n - 1; c++; }\n  return c;\n```\n\nStep 2:\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the n & n-1 logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 11\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 3",
    "keyIdeas": [
      "Pattern: n & n-1",
      "Time: O(n)",
      "Space: O(1)",
      "n & n-1",
      "Or shift"
    ]
  },
  "bc-206-factorial-trailing-zeroes": {
    "summary": "Sheet #206 — Factorial Trailing Zeroes\n\nProblem: Trailing zeroes in n factorial.\nExample:\n\nn = 5\n\nOutput: 1\n\nYour solution uses **Count fives**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nlet c = 0;\n  for (let p = 5; p <= n; p *= 5) c += Math.floor(n / p);\n  return c;\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Count fives logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 1",
    "keyIdeas": [
      "Pattern: Count fives",
      "Time: O(n)",
      "Space: O(1)",
      "Count fives",
      "Same as 199"
    ]
  },
  "bc-207-binary-number-with-alternating-bits": {
    "summary": "Sheet #207 — Binary Number with Alternating Bits\n\nProblem: Check if binary number has alternating bits.\nExample:\n\nn = 5\n\nOutput: true\n\nYour solution uses **XOR shift**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst x = n ^ (n >> 1);\n  return x > 0 && (x & (x + 1)) === 0;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the XOR shift logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: true",
    "keyIdeas": [
      "Pattern: XOR shift",
      "Time: O(n)",
      "Space: O(1)",
      "XOR shift",
      "Power of two check"
    ]
  },
  "bc-208-number-of-even-and-odd-bits": {
    "summary": "Sheet #208 — Number of Even and Odd Bits\n\nProblem: Count even and odd bits in range [0, num].\nExample:\n\nn = 5\n\nOutput: [\n  null,\n  null\n]\n\nYour solution uses **DP bit patterns**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(n) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst even = [1, 0], odd = [0, 1];\n  for (let i = 1; i <= n; i++) {\n    even.push((even[i] + odd[i]) % (1e9 + 7));\n    odd.push((even[i - 1] + odd[i - 1]) % (1e9 + 7));\n  }\n  return [even[n], odd[n]];\n```\n\nStep 2:\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\nPush adds the current element to the stack/array.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the DP bit patterns logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nn = 5\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: [\n  null,\n  null\n]",
    "keyIdeas": [
      "Pattern: DP bit patterns",
      "Time: O(n)",
      "Space: O(1)",
      "DP bit patterns",
      "Or iterate"
    ]
  },
  "bc-209-find-the-index-of-the-first-occurrence-in-a-stri": {
    "summary": "Sheet #209 — Find the Index of the First Occurrence in a String\n\nProblem: Find index of first occurrence of needle in haystack.\nExample:\n\nhaystack = \"sadbutsad\"\nneedle = \"sad\"\n\nOutput: 0\n\nYour solution uses **Built-in or KMP**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(haystack, needle) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst i = haystack.indexOf(needle);\n  return i === -1 ? -1 : i;\n```\n\nStep 2:\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Built-in or KMP logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\nhaystack = \"sadbutsad\"\nneedle = \"sad\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\n\nExpected output: 0",
    "keyIdeas": [
      "Pattern: Built-in or KMP",
      "Time: O(n)",
      "Space: O(1)",
      "Built-in or KMP",
      "Substring search"
    ]
  },
  "bc-210-repeated-dna-sequences": {
    "summary": "Sheet #210 — Repeated DNA Sequences\n\nProblem: Find all repeated 10-letter DNA sequences.\nExample:\n\ns = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"\n\nOutput: [\n  \"AAAAACCCCC\",\n  \"CCCCCAAAAA\"\n]\n\nYour solution uses **Hash Map + Hash Set + Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst seen = new Set(), out = new Set();\n  for (let i = 0; i + 10 <= s.length; i++) {\n    const sub = s.slice(i, i + 10);\n    if (seen.has(sub)) out.add(sub);\n    else seen.add(sub);\n  }\n  return [...out];\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + Sliding Window logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: [\n  \"AAAAACCCCC\",\n  \"CCCCCAAAAA\"\n]",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "Rolling hash or set",
      "Slice substrings"
    ]
  },
  "bc-211-longest-duplicate-substring": {
    "summary": "Sheet #211 — Longest Duplicate Substring\n\nProblem: Longest duplicate substring in string.\nExample:\n\ns = \"banana\"\n\nOutput: \"ana\"\n\nYour solution uses **Hash Map + Hash Set + Sliding Window**.",
    "whyItWorks": "# Step-by-step walkthrough\n\n---\n\n## Step 1: Step 1\n\n```js\nfunction solve(s) {\n```\n\nStep 1:\nDefine the entry function and read input parameters.\n\n---\n\n## Step 2: Step 2\n\n```js\nconst n = s.length;\n  const find = (len) => {\n    const seen = new Set();\n    for (let i = 0; i + len <= n; i++) {\n      const sub = s.slice(i, i + len);\n      if (seen.has(sub)) return sub;\n      seen.add(sub);\n    }\n    return '';\n  };\n  let lo = 0, hi = n - 1, best = '';\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    const sub = find(mid);\n    if (sub) { best = sub; lo = mid + 1; } else hi = mid - 1;\n  }\n  return best;\n```\n\nStep 2:\nUse a set to track elements inside the current window — duplicates or membership checks are O(1).\nLoop until the stopping condition — each iteration moves pointers or updates state toward the answer.\nScan elements one by one; body runs once per index/character/node.\nReturn the final computed result.\n\n---\n\n## Step 3: Step 3\n\n```js\n}\n```\n\nStep 3:\nExecute the Hash Map + Hash Set + Sliding Window logic in this block.\n\n",
    "howExamplesAreSatisfied": "Walk through the sample input step by step:\n\nInput:\ns = \"banana\"\n\nTrace the key variables as your code runs — follow pointer moves, map updates, or window changes each iteration.\n\nSliding window: expand `right`, update sum/set; shrink `left` when window is valid/invalid.\n\nExpected output: \"ana\"",
    "keyIdeas": [
      "Pattern: Hash Map + Hash Set + Sliding Window",
      "Time: O(n)",
      "Space: O(n)",
      "Binary search length",
      "Hash seen substrings"
    ]
  }
};
