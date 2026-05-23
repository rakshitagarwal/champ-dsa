/**
 * README-style revision explanations for user-imported BossCoder sheet solutions.
 * Auto-generated — run: node scripts/generate-user-explanations.mjs
 * Keyed by sheet question number (not GeeksforGeeks extras).
 */
export const USER_EXPLANATIONS_BY_NUM = {
  "1": {
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
  "2": {
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
  "3": {
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
  "4": {
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
  "5": {
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
  "6": {
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
  "7": {
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
  "9": {
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
  "10": {
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
  "11": {
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
  "12": {
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
  "13": {
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
  "14": {
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
  "15": {
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
  "16": {
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
  "17": {
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
  "18": {
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
  "19": {
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
  "20": {
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
  "21": {
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
  "22": {
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
  "23": {
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
  "24": {
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
  "25": {
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
  "26": {
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
  "27": {
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
  "28": {
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
  "29": {
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
  "30": {
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
  "31": {
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
  "32": {
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
  "33": {
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
  "34": {
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
  "35": {
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
  "36": {
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
  "37": {
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
  "40": {
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
  "41": {
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
  "42": {
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
  "43": {
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
  "44": {
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
  "45": {
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
  "46": {
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
  "47": {
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
  "48": {
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
  "49": {
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
  "50": {
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
  "51": {
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
  "52": {
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
  "53": {
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
  "54": {
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
  "55": {
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
  "56": {
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
  "57": {
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
  "58": {
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
  "59": {
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
  "60": {
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
  "61": {
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
  "62": {
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
  "63": {
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
  "64": {
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
  "65": {
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
  "66": {
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
  "67": {
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
  "68": {
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
  "71": {
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
  }
};
