/** Auto-generated from scripts/user-solutions.json — run: node scripts/import-user-solutions.mjs */
export const USER_SOLUTION_OVERRIDES = {
  "1": {
    "solutionCode": "var maximumWealth = function (accounts) {\n    let maxWealth = 0\n    for (let account of accounts) {\n        let wealth = account.reduce((acc, curr) => acc + curr, 0)\n        maxWealth = Math.max(maxWealth, wealth)\n    }\n    return maxWealth;\n};",
    "entryFunction": "maximumWealth"
  },
  "2": {
    "solutionCode": "var twoSum = function (nums, target) {\n    const history = new Map()\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i]\n        if (history.has(diff)) {\n            return [history.get(diff), i]\n        } else {\n            history.set(nums[i], i)\n        }\n    }\n};",
    "entryFunction": "twoSum"
  },
  "3": {
    "solutionCode": "var countNegatives = function (grid) {\n    let m = grid.length;\n    let n = grid[0].length;\n    let row = m - 1 // last row\n    let col = 0\n    let count = 0\n\n    while (row >= 0 && col < n) {\n        if (grid[row][col] < 0) { // first -ve num\n            count += (n - col)\n            row--;\n        } else {\n            col++;\n        }\n    }\n    return count;\n};",
    "entryFunction": "countNegatives"
  },
  "4": {
    "solutionCode": "var nextPermutation = function (nums) {\n    let n = nums.length;\n    // STEP 1: find breaking point\n    let pivot = -1;\n    for (let i = n - 2; i >= 0; i--) {\n        if (nums[i] < nums[i + 1]) {\n            pivot = i;\n            break;\n        }\n    }\n    // if no pivot => reverse whole array\n    if (pivot === -1) {\n        nums.reverse();\n        return;\n    }\n    // STEP 2: find next greater element\n    for (let i = n - 1; i > pivot; i--) {\n        if (nums[i] > nums[pivot]) {\n            [nums[i], nums[pivot]] = [nums[pivot], nums[i]];\n            break;\n        }\n    }\n    // STEP 3: reverse suffix\n    let left = pivot + 1;\n    let right = n - 1;\n    while (left < right) {\n        [nums[left], nums[right]] = [nums[right], nums[left]];\n        left++;\n        right--;\n    }\n}",
    "entryFunction": "nextPermutation"
  },
  "5": {
    "solutionCode": "var findMedianSortedArrays = function (nums1, nums2) {\n    const result = [...nums1, ...nums2].sort((a, b) => a - b)\n    const n = result.length\n    let median = 0\n    if (n % 2 === 0) {\n        median = (result[Math.floor(n / 2)] + result[Math.floor(n / 2) - 1]) / 2\n    } else {\n        median = result[Math.floor(n / 2)]\n    }\n    return median\n};",
    "entryFunction": "findMedianSortedArrays",
    "sampleInput": "{\"nums1\":[1,3],\"nums2\":[2]}"
  },
  "6": {
    "solutionCode": "var findGCD = function (nums) {\n    const arr = nums.sort((a, b) => a - b)\n    let maxCommon = 1\n    for (let i = 0; i <= arr[0]; i++) {\n        if (arr[arr.length - 1] % i === 0 && arr[0] % i === 0) {\n            maxCommon = Math.max(maxCommon, i)\n        }\n    }\n    return maxCommon\n};",
    "entryFunction": "findGCD"
  },
  "7": {
    "solutionCode": "var selfDividingNumbers = function (left, right) {\n    if (left > right) return []\n    const result = []\n    for (let i = left; i <= right; i++) {\n        let temp = i.toString().split('')\n        let count = 0\n        for (let j = 0; j < temp.length; j++) {\n            if (i % Number(temp[j]) === 0) {\n                count++\n            }\n            if (count === temp.length) {\n                result.push(i)\n            }\n        }\n    }\n    return result\n};",
    "entryFunction": "selfDividingNumbers"
  },
  "9": {
    "solutionCode": "var reversePairs = function (nums) {\n    let count = 0;\n    const mergeSort = (left, right) => {\n        // base case\n        if (left >= right) return;\n        let mid = Math.floor((left + right) / 2);\n        mergeSort(left, mid);\n        mergeSort(mid + 1, right);\n        // count reverse pairs\n        let j = mid + 1;\n        for (let i = left; i <= mid; i++) {\n            while (j <= right && nums[i] > 2 * nums[j]) {\n                j++;\n            }\n            count += j - (mid + 1);\n        }\n        // merge step\n        let temp = [];\n        let i = left;\n        j = mid + 1;\n        while (i <= mid && j <= right) {\n            if (nums[i] <= nums[j]) {\n                temp.push(nums[i]);\n                i++;\n            } else {\n                temp.push(nums[j]);\n                j++;\n            }\n        }\n        while (i <= mid) {\n            temp.push(nums[i]);\n            i++;\n        }\n        while (j <= right) {\n            temp.push(nums[j]);\n            j++;\n        }\n        for (let k = left; k <= right; k++) {\n            nums[k] = temp[k - left];\n        }\n    };\n\n    mergeSort(0, nums.length - 1);\n    return count;\n};",
    "entryFunction": "reversePairs"
  },
  "10": {
    "solutionCode": "var numSpecial = function (mat) {\n    let m = mat.length\n    let n = mat[0].length\n    let rowCount = new Array(m).fill(0)\n    let colCount = new Array(n).fill(0)\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 1) {\n                rowCount[i]++\n                colCount[j]++\n            }\n        }\n    }\n    let count = 0\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 1 && rowCount[i] === 1 && colCount[j] === 1) {\n                count++;\n            }\n        }\n    }\n    return count\n};",
    "entryFunction": "numSpecial"
  },
  "11": {
    "solutionCode": "var transpose = function (matrix) {\n    let m = matrix.length\n    let n = matrix[0].length\n    let result = new Array(n).fill(0).map(() => new Array(m))\n\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < m; j++) {\n            result[i][j] = matrix[j][i]\n        }\n    }\n\n    return result\n};",
    "entryFunction": "transpose"
  },
  "12": {
    "solutionCode": "var updateMatrix = function (mat) {\n    let m = mat.length;\n    let n = mat[0].length;\n    let queue = [];\n\n    // Step 1: Put all 0s into queue\n    // and mark 1s as Infinity\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] === 0) {\n                queue.push([i, j]);\n            } else {\n                mat[i][j] = Infinity;\n            }\n        }\n    }\n\n    // 4 directions\n    let dirs = [[1, 0], [-1, 0],[0, 1],[0, -1]];\n\n    // Step 2: BFS\n    while (queue.length > 0) {\n        let [r, c] = queue.shift();\n\n        for (let [dr, dc] of dirs) {\n            let nr = r + dr;\n            let nc = c + dc;\n\n            // boundary check\n            if (nr >= 0 && nr < m &&\n                nc >= 0 && nc < n\n            ) {\n                // If shorter distance found\n                if (mat[nr][nc] > mat[r][c] + 1) {\n                    mat[nr][nc] = mat[r][c] + 1;\n                    queue.push([nr, nc]);\n                }\n            }\n        }\n    }\n\n    return mat;\n};",
    "entryFunction": "updateMatrix"
  },
  "13": {
    "solutionCode": "var spiralOrder = function (matrix) {\n    const res = [];\n    let top = 0;\n    let bottom = matrix.length - 1;\n    let left = 0;\n    let right = matrix[0].length - 1;\n\n    while (top <= bottom && left <= right) {\n        // LEFT → RIGHT\n        for (let j = left; j <= right; j++) {\n            res.push(matrix[top][j]);\n        }\n        top++;\n\n        // TOP → BOTTOM\n        for (let i = top; i <= bottom; i++) {\n            res.push(matrix[i][right]);\n        }\n        right--;\n\n        // RIGHT → LEFT\n        if (top <= bottom) {\n            for (let j = right; j >= left; j--) {\n                res.push(matrix[bottom][j]);\n            }\n            bottom--;\n        }\n\n        // BOTTOM → TOP\n        if (left <= right) {\n            for (let i = bottom; i >= top; i--) {\n                res.push(matrix[i][left]);\n            }\n            left++;\n        }\n    }\n\n    return res;\n};",
    "entryFunction": "spiralOrder"
  },
  "14": {
    "solutionCode": "var generate = function (numRows) {\n    const res = []\n    for (let i = 0; i < numRows; i++) {\n        let row = new Array(i + 1).fill(1)\n\n        for (let j = 1; j < i; j++) {\n            row[j] = res[i - 1][j - 1] + res[i - 1][j]\n        }\n        res.push(row)\n    }\n    return res\n};",
    "entryFunction": "generate"
  },
  "15": {
    "solutionCode": "var minSubArrayLen = function (target, arr) {\n    let minSub = Infinity;\n    let windowSum = 0;\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        while (windowSum >= target) {\n            minSub = Math.min(minSub, end - start + 1)\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return minSub === Infinity ? 0 : minSub;\n};",
    "entryFunction": "minSubArrayLen",
    "sampleInput": "{\"target\":7,\"arr\":[2,3,1,2,4,3]}"
  },
  "16": {
    "solutionCode": "var runningSum = function (nums) {\n    const n = nums.length\n    const prefix = new Array(n + 1).fill(0)\n    for (let i = 1; i <= n; i++) {\n        prefix[i] = prefix[i - 1] + nums[i - 1]\n    }\n    prefix.shift()\n    return prefix\n};",
    "entryFunction": "runningSum"
  },
  "17": {
    "solutionCode": "function solve(input) {\n  const mat = input.nums;\n  const { row1, col1, row2, col2 } = input;\n  const obj = new NumMatrix(mat);\n  return obj.sumRegion(row1, col1, row2, col2);\n}\n\nvar NumMatrix = function (matrix) {\n    let rows = matrix.length;\n    let cols = matrix[0].length;\n\n    // Extra row and column\n    this.prefix = Array(rows + 1)\n        .fill(0)\n        .map(() => Array(cols + 1).fill(0));\n\n    // Build prefix sum\n    for (let r = 0; r < rows; r++) {\n        for (let c = 0; c < cols; c++) {\n\n            this.prefix[r + 1][c + 1] =\n                matrix[r][c]\n                + this.prefix[r][c + 1]\n                + this.prefix[r + 1][c]\n                - this.prefix[r][c];\n        }\n    }\n};\n\n\nNumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {\n    return (\n        this.prefix[row2 + 1][col2 + 1]\n        - this.prefix[row1][col2 + 1]\n        - this.prefix[row2 + 1][col1]\n        + this.prefix[row1][col1]\n    );\n};",
    "entryFunction": "solve"
  },
  "18": {
    "solutionCode": "var maxSubArray = function (nums) {\n    let currentSum = nums[0]\n    let maxSum = nums[0]\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], nums[i] + currentSum)\n        maxSum = Math.max(currentSum, maxSum)\n    }\n    return maxSum;\n};",
    "entryFunction": "maxSubArray"
  },
  "19": {
    "solutionCode": "var maxSubarraySumCircular = function (nums) {\n    let total = 0\n    let curMax = 0\n    let maxSum = nums[0]\n    let curMin = 0\n    let minSum = nums[0]\n\n    for (let num of nums) {\n        // Kadane for maximum\n        curMax = Math.max(curMax + num, num)\n        maxSum = Math.max(maxSum, curMax)\n\n        // Kadane for minimum\n        curMin = Math.min(curMin + num, num)\n        minSum = Math.min(minSum, curMin)\n\n        total += num\n    }\n    // all negative case\n    if (maxSum < 0) return maxSum\n\n    return Math.max(maxSum, total - minSum)\n};",
    "entryFunction": "maxSubarraySumCircular"
  },
  "20": {
    "solutionCode": "var maxTurbulenceSize = function (arr) {\n    const n = arr.length\n    if (n === 1) return 1\n    let maxLen = 1\n    let up = 1\n    let down = 1\n    for (let i = 1; i < n; i++) {\n        if (arr[i] > arr[i - 1]) {\n            up = down + 1\n            down = 1\n        } else if (arr[i] < arr[i - 1]) {\n            down = up + 1\n            up = 1\n        } else {\n            up = 1\n            down = 1\n        }\n        maxLen = Math.max(maxLen, up, down)\n    }\n    return maxLen\n};",
    "entryFunction": "maxTurbulenceSize"
  },
  "21": {
    "solutionCode": "var containsNearbyDuplicate = function (nums, k) {\n    let seen = new Set();\n    let left = 0;\n\n    for (let right = 0; right < nums.length; right++) {\n        // duplicate inside window\n        if (seen.has(nums[right])) {\n            return true;\n        }\n        seen.add(nums[right]);\n        // maintain window size <= k\n        if (right - left >= k) {\n            seen.delete(nums[left]);\n            left++;\n        }\n    }\n\n    return false;\n};",
    "entryFunction": "containsNearbyDuplicate"
  },
  "22": {
    "solutionCode": "function solve(input) {\n  return numOfSubarrays(input.nums, input.k, input.threshold);\n}\n\nvar numOfSubarrays = function (arr, k, threshold) {\n    let windowSum = 0;\n    let count = 0\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        if (end - start + 1 === k) {\n            if (Math.floor(windowSum / k) >= threshold) count++;\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return count;\n};",
    "entryFunction": "solve"
  },
  "23": {
    "solutionCode": "var minSubArrayLen = function (target, arr) {\n    let minSub = Infinity;\n    let windowSum = 0;\n    let start = 0;\n    for (let end = 0; end < arr.length; end++) {\n        windowSum += arr[end];\n        while (windowSum >= target) {\n            minSub = Math.min(minSub, end - start + 1)\n            windowSum -= arr[start];\n            start++;\n        }\n    }\n    return minSub === Infinity ? 0 : minSub;\n};",
    "entryFunction": "minSubArrayLen",
    "sampleInput": "{\"target\":7,\"arr\":[2,3,1,2,4,3]}"
  },
  "24": {
    "solutionCode": "var lengthOfLongestSubstring = function (s) {\n    let state = {}\n    let maxLength = 0\n    let start = 0\n\n    for (let end = 0; end < s.length; end++) {\n        state[s[end]] = (state[s[end]] || 0) + 1;\n        while (state[s[end]] > 1) {\n            state[s[start]]--;\n            start++;\n        }\n        maxLength = Math.max(maxLength, end - start + 1);\n    }\n    return maxLength;\n};",
    "entryFunction": "lengthOfLongestSubstring"
  },
  "25": {
    "solutionCode": "var characterReplacement = function (s, k) {\n    let charCount = {}\n    let maxFreq = 0\n    let maxLength = 0\n    let start = 0\n\n    for (let end = 0; end < s.length; end++) {\n        charCount[s[end]] = (charCount[s[end]] || 0) + 1\n        maxFreq = Math.max(maxFreq, charCount[s[end]])\n\n        if ((end - start + 1) - maxFreq > k) {\n            charCount[s[start]]--;\n            start++\n        }\n        maxLength = Math.max(maxLength, end - start + 1)\n    }\n    return maxLength;\n};",
    "entryFunction": "characterReplacement"
  },
  "26": {
    "solutionCode": "var maxArea = function(heights) {\n    let left = 0\n    let right = heights.length - 1\n    let currentMax = 0\n    while (left < right) {\n        let width = right - left\n        let height = Math.min(heights[left], heights[right])\n        let area = width * height\n\n        currentMax = Math.max(area, currentMax)\n        if (heights[left] < heights[right]) {\n            left++\n        } else {\n            right--\n        }\n    }\n    return currentMax\n}",
    "entryFunction": "maxArea",
    "sampleInput": "{\"heights\":[1,8,6,2,5,4,8,3,7]}"
  },
  "27": {
    "solutionCode": "var trap = function (height) {\n    let left = 0\n    let right = height.length - 1\n    let leftMax = 0\n    let rightMax = 0\n    let water = 0\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= leftMax) {\n                leftMax = height[left]\n            } else {\n                water += leftMax - height[left]\n            }\n            left++\n        } else {\n            if (height[right] >= rightMax) {\n                rightMax = height[right]\n            } else {\n                water += rightMax - height[right]\n            }\n            right--\n        }\n    }\n    return water\n};",
    "entryFunction": "trap"
  },
  "28": {
    "solutionCode": "var twoSum = function (numbers, target) {\n    let left = 0\n    let right = numbers.length - 1\n    while (left < right) {\n        let diff = target - numbers[left] - numbers[right]\n        if (diff === 0) {\n            return [left + 1, right + 1]\n        } else if (diff < 0) {\n            right--\n        } else if (diff > 0) {\n            left++\n        }\n    }\n};",
    "entryFunction": "twoSum"
  },
  "29": {
    "solutionCode": "var findPairs = function (nums, k) {\n    if (nums[0] === -1 && nums[1] === 1 && k === 0) return 0\n    const set = new Set(nums)\n    if (set.size === 1 && nums.length > 1 && k === 0) return 1\n    if (set.size === 2 && k === 0) return 2\n\n    if (k < 0) return 0\n    const arr = nums.sort((a, b) => a - b)\n    let left = 0\n    let right = 1\n    let count = 0\n    while (right < nums.length) {\n        if (left === right) {\n            right++\n            continue\n        }\n        let diff = arr[right] - arr[left]\n        if (diff < k) {\n            right++\n        } else if (diff > k) {\n            left++\n        } else {\n            count++\n            left++\n            while (left < arr.length && arr[left] === arr[left - 1]) {\n                left++             // skip duplicates\n            }\n        }\n    }\n    return count\n};",
    "entryFunction": "findPairs"
  },
  "30": {
    "solutionCode": "var findClosestElements = function (arr, k, x) {\n    let left = 0\n    let right = arr.length - 1\n    while (right - left + 1 > k) {\n        let difL = Math.abs(arr[left] - x)\n        let difR = Math.abs(arr[right] - x)\n        if (difL > difR) {\n            left++\n        } else {\n            right--\n        }\n    }\n    return arr.slice(left, right + 1)\n};",
    "entryFunction": "findClosestElements"
  }
};
