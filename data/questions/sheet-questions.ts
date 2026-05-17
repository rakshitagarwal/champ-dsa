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
    "patternHints": [
      "Sum each row",
      "Track maximum"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let best = 0;\n  for (const row of nums) {\n    let s = 0;\n    for (const x of row) s += x;\n    best = Math.max(best, s);\n  }\n  return best;\n}",
    "sampleInput": "{\"nums\":[[1,2,3],[3,2,1]]}",
    "humanInput": "nums = [[1,2,3],[3,2,1]]",
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
    "patternHints": [
      "Hash map complement",
      "One pass"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const m = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (m.has(need)) return [m.get(need), i];\n    m.set(nums[i], i);\n  }\n  return [];\n}",
    "sampleInput": "{\"nums\":[2,7,11,15],\"target\":9}",
    "humanInput": "nums = [2,7,11,15]\ntarget = 9",
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
    "patternHints": [
      "Start from right",
      "Row sorted"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let c = 0;\n  for (const row of nums) {\n    let j = row.length - 1;\n    while (j >= 0 && row[j] < 0) { c++; j--; }\n  }\n  return c;\n}",
    "sampleInput": "{\"nums\":[[4,3,2,-1],[3,2,1,-1]]}",
    "humanInput": "nums = [[4,3,2,-1],[3,2,1,-1]]",
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
    "patternHints": [
      "Find pivot",
      "Reverse suffix"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let i = nums.length - 2;\n  while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n  if (i >= 0) {\n    let j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    [nums[i], nums[j]] = [nums[j], nums[i]];\n  }\n  for (let l = i + 1, r = nums.length - 1; l < r; l++, r--) [nums[l], nums[r]] = [nums[r], nums[l]];\n  return nums;\n}",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
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
    "patternHints": [
      "Binary search partition",
      "Compare halves"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.a, b = input.b;\n  if (a.length > b.length) return solve({ a: b, b: a });\n  const m = (a.length + b.length + 1) >> 1;\n  let lo = 0, hi = a.length;\n  while (lo <= hi) {\n    const i = (lo + hi) >> 1, j = m - i;\n    const l1 = i ? a[i - 1] : -Infinity, r1 = i < a.length ? a[i] : Infinity;\n    const l2 = j ? b[j - 1] : -Infinity, r2 = j < b.length ? b[j] : Infinity;\n    if (l1 <= r2 && l2 <= r1) return (a.length + b.length) % 2 ? Math.max(l1, l2) : (Math.max(l1, l2) + Math.min(r1, r2)) / 2;\n    if (l1 > r2) hi = i - 1; else lo = i + 1;\n  }\n  return 0;\n}",
    "sampleInput": "{\"a\":[1,3],\"b\":[2]}",
    "humanInput": "a = [1,3]\nb = [2]",
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
    "patternHints": [
      "Euclid gcd",
      "Reduce array"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const g = (a, b) => (b ? g(b, a % b) : a);\n  return nums.reduce((a, b) => g(a, b));\n}",
    "sampleInput": "{\"nums\":[2,4,6,8]}",
    "humanInput": "nums = [2,4,6,8]",
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
    "patternHints": [
      "Check digits divide n",
      "Skip zero digits"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { left, right } = input;\n  const ok = (n) => { for (const ch of String(n)) { const d = +ch; if (!d || n % d) return false; } return true; };\n  const out = [];\n  for (let i = left; i <= right; i++) if (ok(i)) out.push(i);\n  return out;\n}",
    "sampleInput": "{\"left\":1,\"right\":22}",
    "humanInput": "left = 1\nright = 22",
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
    "patternHints": [
      "Merge sort count",
      "Split merge"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const a = nums.slice();\n  const sort = (l, r) => {\n    if (r - l <= 1) return 0;\n    const m = (l + r) >> 1;\n    let c = sort(l, m) + sort(m, r), i = l, j = m, tmp = [];\n    while (i < m || j < r) {\n      if (j >= r || (i < m && a[i] <= a[j])) tmp.push(a[i++]);\n      else { tmp.push(a[j++]); c += m - i; }\n    }\n    for (let k = l; k < r; k++) a[k] = tmp[k - l];\n    return c;\n  };\n  return sort(0, a.length);\n}",
    "sampleInput": "{\"nums\":[5,2,6,1]}",
    "humanInput": "nums = [5,2,6,1]",
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
    "difficulty": "medium",
    "statement": "Count pairs i<j with nums[i] > 2*nums[j].",
    "patternHints": [
      "Merge sort",
      "Count before merge"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const a = nums.slice();\n  const sort = (l, r) => {\n    if (r - l <= 1) return 0;\n    const m = (l + r) >> 1;\n    let c = sort(l, m) + sort(m, r), j = m;\n    for (let i = l; i < m; i++) { while (j < r && a[i] > 2 * a[j]) j++; c += j - m; }\n    const tmp = []; let i2 = l, j2 = m;\n    while (i2 < m || j2 < r) tmp.push(i2 < m && (j2 >= r || a[i2] <= a[j2]) ? a[i2++] : a[j2++]);\n    for (let k = l; k < r; k++) a[k] = tmp[k - l];\n    return c;\n  };\n  return sort(0, a.length);\n}",
    "sampleInput": "{\"nums\":[1,3,2,3,1]}",
    "humanInput": "nums = [1,3,2,3,1]",
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
    "patternHints": [
      "Row/col counts",
      "Check special cells"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const m = nums.length, n = nums[0].length, row = Array(m).fill(0), col = Array(n).fill(0);\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (nums[i][j]) { row[i]++; col[j]++; }\n  let c = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (nums[i][j] && row[i] === 1 && col[j] === 1) c++;\n  return c;\n}",
    "sampleInput": "{\"nums\":[[1,0,0],[0,1,0],[0,0,1]]}",
    "humanInput": "nums = [[1,0,0],[0,1,0],[0,0,1]]",
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
    "patternHints": [
      "Swap indices",
      "New rows from columns"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  return nums[0].map((_, j) => nums.map((row) => row[j]));\n}",
    "sampleInput": "{\"nums\":[[1,2,3],[4,5,6]]}",
    "humanInput": "nums = [[1,2,3],[4,5,6]]",
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
    "patternHints": [
      "Multi-source BFS",
      "Layer expansion"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const m = nums.length, n = nums[0].length;\n  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));\n  const q = [];\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (!nums[i][j]) { dist[i][j] = 0; q.push([i, j]); }\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j] = q[qi];\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] === Infinity) { dist[ni][nj] = dist[i][j] + 1; q.push([ni, nj]); }\n    }\n  }\n  return dist;\n}",
    "sampleInput": "{\"nums\":[[0,0,0],[0,1,0],[0,0,0]]}",
    "humanInput": "nums = [[0,0,0],[0,1,0],[0,0,0]]",
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
    "patternHints": [
      "Four boundaries",
      "Shrink while walking"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const out = [];\n  let t = 0, b = nums.length - 1, l = 0, r = nums[0].length - 1;\n  while (t <= b && l <= r) {\n    for (let j = l; j <= r; j++) out.push(nums[t][j]);\n    t++;\n    for (let i = t; i <= b; i++) out.push(nums[i][r]);\n    r--;\n    if (t <= b) { for (let j = r; j >= l; j--) out.push(nums[b][j]); b--; }\n    if (l <= r) { for (let i = b; i >= t; i--) out.push(nums[i][l]); l++; }\n  }\n  return out;\n}",
    "sampleInput": "{\"nums\":[[1,2,3],[4,5,6],[7,8,9]]}",
    "humanInput": "nums = [[1,2,3],[4,5,6],[7,8,9]]",
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
    "patternHints": [
      "Previous row sums",
      "Edge ones"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const numRows = input.numRows ?? input.n;\n  const tri = [];\n  for (let i = 0; i < numRows; i++) {\n    const row = Array(i + 1).fill(1);\n    for (let j = 1; j < i; j++) row[j] = tri[i - 1][j - 1] + tri[i - 1][j];\n    tri.push(row);\n  }\n  return tri;\n}",
    "sampleInput": "{\"numRows\":5}",
    "humanInput": "numRows = 5",
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
    "difficulty": "medium",
    "statement": "Minimal length subarray with sum >= target.",
    "patternHints": [
      "Sliding window",
      "Shrink when valid"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  let left = 0, sum = 0, best = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) { best = Math.min(best, right - left + 1); sum -= nums[left++]; }\n  }\n  return best === Infinity ? 0 : best;\n}",
    "sampleInput": "{\"nums\":[2,3,1,2,4,3],\"target\":7}",
    "humanInput": "nums = [2,3,1,2,4,3]\ntarget = 7",
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
    "patternHints": [
      "Prefix in place",
      "Add previous"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  for (let i = 1; i < nums.length; i++) nums[i] += nums[i - 1];\n  return nums;\n}",
    "sampleInput": "{\"nums\":[1,2,3,4]}",
    "humanInput": "nums = [1,2,3,4]",
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
    "patternHints": [
      "2D prefix table",
      "Inclusion-exclusion"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const mat = input.nums, { row1, col1, row2, col2 } = input;\n  const m = mat.length, n = mat[0].length;\n  const p = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) p[i + 1][j + 1] = mat[i][j] + p[i][j + 1] + p[i + 1][j] - p[i][j];\n  return p[row2 + 1][col2 + 1] - p[row1][col2 + 1] - p[row2 + 1][col1] + p[row1][col1];\n}",
    "sampleInput": "{\"nums\":[[3,0,1],[5,6,3],[1,2,0]],\"row1\":1,\"col1\":1,\"row2\":2,\"col2\":2}",
    "humanInput": "nums = [[3,0,1],[5,6,3],[1,2,0]]\nrow1 = 1\ncol1 = 1\nrow2 = 2\ncol2 = 2",
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
    "difficulty": "easy",
    "statement": "Find maximum sum contiguous subarray.",
    "patternHints": [
      "Kadane",
      "Best ending here"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let best = nums[0], cur = nums[0];\n  for (let i = 1; i < nums.length; i++) { cur = Math.max(nums[i], cur + nums[i]); best = Math.max(best, cur); }\n  return best;\n}",
    "sampleInput": "{\"nums\":[-2,1,-3,4,-1,2,1,-5,4]}",
    "humanInput": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
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
    "patternHints": [
      "Kadane + total-min",
      "Handle all-negative"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let maxK = nums[0], minK = nums[0], curMax = nums[0], curMin = nums[0], sum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    sum += nums[i];\n    curMax = Math.max(nums[i], curMax + nums[i]);\n    curMin = Math.min(nums[i], curMin + nums[i]);\n    maxK = Math.max(maxK, curMax); minK = Math.min(minK, curMin);\n  }\n  return maxK > 0 ? Math.max(maxK, sum - minK) : maxK;\n}",
    "sampleInput": "{\"nums\":[5,-3,5]}",
    "humanInput": "nums = [5,-3,5]",
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
    "patternHints": [
      "Compare neighbors",
      "Alternate up/down"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let best = 1, i = 0;\n  while (i < nums.length) {\n    let j = i + 1;\n    if (j < nums.length && nums[j] === nums[i]) { i = j; continue; }\n    while (j < nums.length && (j === i + 1 || (nums[j] - nums[j - 1]) * (nums[j - 1] - nums[j - 2]) < 0)) j++;\n    best = Math.max(best, j - i);\n    i = j;\n  }\n  return best;\n}",
    "sampleInput": "{\"nums\":[9,4,2,10,7,8,8,1,9]}",
    "humanInput": "nums = [9,4,2,10,7,8,8,1,9]",
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
    "patternHints": [
      "Hash last index",
      "Check distance"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const k = target, m = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (m.has(nums[i]) && i - m.get(nums[i]) <= k) return true;\n    m.set(nums[i], i);\n  }\n  return false;\n}",
    "sampleInput": "{\"nums\":[1,2,3,1],\"target\":3}",
    "humanInput": "nums = [1,2,3,1]\ntarget = 3",
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
    "patternHints": [
      "Fixed window",
      "Compare sum/k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { nums, k, threshold } = input;\n  let sum = 0, c = 0;\n  for (let i = 0; i < nums.length; i++) {\n    sum += nums[i];\n    if (i >= k) sum -= nums[i - k];\n    if (i >= k - 1 && sum / k >= threshold) c++;\n  }\n  return c;\n}",
    "sampleInput": "{\"nums\":[2,2,2,2,5,5,5,8],\"k\":3,\"threshold\":4}",
    "humanInput": "nums = [2,2,2,2,5,5,5,8]\nk = 3\nthreshold = 4",
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
    "patternHints": [
      "Variable window",
      "Shrink when valid"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  let left = 0, sum = 0, best = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) { best = Math.min(best, right - left + 1); sum -= nums[left++]; }\n  }\n  return best === Infinity ? 0 : best;\n}",
    "sampleInput": "{\"nums\":[2,3,1,2,4,3],\"target\":7}",
    "humanInput": "nums = [2,3,1,2,4,3]\ntarget = 7",
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
    "patternHints": [
      "Sliding window",
      "Set of chars"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s, seen = new Set();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (seen.has(s[right])) seen.delete(s[left++]);\n    seen.add(s[right]);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}",
    "sampleInput": "{\"s\":\"abcabcbb\"}",
    "humanInput": "s = \"abcabcbb\"",
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
    "patternHints": [
      "Window counts",
      "maxFreq + k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s, k = input.k, cnt = new Map();\n  let left = 0, best = 0, maxF = 0;\n  for (let right = 0; right < s.length; right++) {\n    cnt.set(s[right], (cnt.get(s[right]) || 0) + 1);\n    maxF = Math.max(maxF, cnt.get(s[right]));\n    while (right - left + 1 - maxF > k) { cnt.set(s[left], cnt.get(s[left]) - 1); left++; }\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}",
    "sampleInput": "{\"s\":\"AABABBA\",\"k\":1}",
    "humanInput": "s = \"AABABBA\"\nk = 1",
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
    "patternHints": [
      "Two pointers",
      "Move shorter"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let l = 0, r = nums.length - 1, best = 0;\n  while (l < r) {\n    best = Math.max(best, Math.min(nums[l], nums[r]) * (r - l));\n    if (nums[l] < nums[r]) l++; else r--;\n  }\n  return best;\n}",
    "sampleInput": "{\"nums\":[1,8,6,2,5,4,8,3,7]}",
    "humanInput": "nums = [1,8,6,2,5,4,8,3,7]",
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
    "difficulty": "medium",
    "statement": "Trap rainwater between bars.",
    "patternHints": [
      "Two pointers",
      "Track left/right max"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let l = 0, r = nums.length - 1, lMax = 0, rMax = 0, water = 0;\n  while (l < r) {\n    if (nums[l] < nums[r]) { lMax = Math.max(lMax, nums[l]); water += lMax - nums[l++]; }\n    else { rMax = Math.max(rMax, nums[r]); water += rMax - nums[r--]; }\n  }\n  return water;\n}",
    "sampleInput": "{\"nums\":[0,1,0,2,1,0,1,3,2,1,2,1]}",
    "humanInput": "nums = [0,1,0,2,1,0,1,3,2,1,2,1]",
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
    "difficulty": "easy",
    "statement": "Two sum on sorted array; 1-based indices.",
    "patternHints": [
      "Two pointers",
      "Adjust by sum"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const s = nums[l] + nums[r];\n    if (s === target) return [l + 1, r + 1];\n    if (s < target) l++; else r--;\n  }\n  return [];\n}",
    "sampleInput": "{\"nums\":[2,7,11,15],\"target\":9}",
    "humanInput": "nums = [2,7,11,15]\ntarget = 9",
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
    "patternHints": [
      "Hash set",
      "Check x±k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { nums, k } = input;\n  if (k < 0) return 0;\n  const seen = new Set(), out = new Set();\n  for (const x of nums) {\n    if (seen.has(x - k)) out.add(x);\n    if (seen.has(x + k)) out.add(x + k);\n    seen.add(x);\n  }\n  return out.size;\n}",
    "sampleInput": "{\"nums\":[3,1,4,1,5],\"k\":2}",
    "humanInput": "nums = [3,1,4,1,5]\nk = 2",
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
    "patternHints": [
      "Binary search window",
      "Compare edges"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { nums, k, x } = input;\n  let lo = 0, hi = nums.length - k;\n  while (lo < hi) {\n    const mid = (lo + hi) >> 1;\n    if (nums[mid + k] - x < x - nums[mid]) lo = mid + 1; else hi = mid;\n  }\n  return nums.slice(lo, lo + k);\n}",
    "sampleInput": "{\"nums\":[1,2,3,4,5],\"k\":4,\"x\":3}",
    "humanInput": "nums = [1,2,3,4,5]\nk = 4\nx = 3",
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
    "patternHints": [
      "Binary search",
      "Sorted half"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  let lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (nums[mid] === target) return mid;\n    if (nums[lo] <= nums[mid]) {\n      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; else lo = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; else hi = mid - 1;\n    }\n  }\n  return -1;\n}",
    "sampleInput": "{\"nums\":[4,5,6,7,0,1,2],\"target\":0}",
    "humanInput": "nums = [4,5,6,7,0,1,2]\ntarget = 0",
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
    "patternHints": [
      "Write pointer",
      "Skip dupes"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  if (!nums.length) return 0;\n  let w = 1;\n  for (let i = 1; i < nums.length; i++) if (nums[i] !== nums[w - 1]) nums[w++] = nums[i];\n  return w;\n}",
    "sampleInput": "{\"nums\":[1,1,2]}",
    "humanInput": "nums = [1,1,2]",
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
    "patternHints": [
      "Binary search bounds",
      "Lower and upper"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const lb = (t) => { let lo = 0, hi = nums.length; while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < t) lo = m + 1; else hi = m; } return lo; };\n  const lo = lb(target);\n  if (lo === nums.length || nums[lo] !== target) return [-1, -1];\n  return [lo, lb(target + 1) - 1];\n}",
    "sampleInput": "{\"nums\":[5,7,7,8,8,10],\"target\":8}",
    "humanInput": "nums = [5,7,7,8,8,10]\ntarget = 8",
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
    "patternHints": [
      "Binary search flat",
      "Index to cell"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const mat = input.nums, target = input.target;\n  let lo = 0, hi = mat.length * mat[0].length - 1;\n  const get = (i) => mat[Math.floor(i / mat[0].length)][i % mat[0].length];\n  while (lo <= hi) { const m = (lo + hi) >> 1; const v = get(m); if (v === target) return true; if (v < target) lo = m + 1; else hi = m - 1; }\n  return false;\n}",
    "sampleInput": "{\"nums\":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],\"target\":3}",
    "humanInput": "nums = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3",
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
    "patternHints": [
      "Binary search slope",
      "Go uphill"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let lo = 0, hi = nums.length - 1;\n  while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < nums[m + 1]) lo = m + 1; else hi = m; }\n  return lo;\n}",
    "sampleInput": "{\"nums\":[1,2,3,1]}",
    "humanInput": "nums = [1,2,3,1]",
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
    "patternHints": [
      "Binary search parity",
      "Pair check"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let lo = 0, hi = nums.length - 1;\n  while (lo < hi) {\n    let mid = (lo + hi) >> 1;\n    if (mid % 2 === 1) mid--;\n    if (nums[mid] === nums[mid + 1]) lo = mid + 2; else hi = mid;\n  }\n  return nums[lo];\n}",
    "sampleInput": "{\"nums\":[1,1,2,3,3,4,4,8,8]}",
    "humanInput": "nums = [1,1,2,3,3,4,4,8,8]",
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
    "difficulty": "medium",
    "statement": "Preimage size of factorial trailing zeroes at k.",
    "patternHints": [
      "Binary search zeros",
      "Count plateau"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const k = input.k;\n  const z = (x) => { let c = 0; while (x) { x = Math.floor(x / 5); c += x; } return c; };\n  const lb = (t) => { let lo = 0, hi = 5e12; while (lo < hi) { const m = (lo + hi) >> 1; if (z(m) < t) lo = m + 1; else hi = m; } return lo; };\n  return lb(k + 1) - lb(k);\n}",
    "sampleInput": "{\"k\":5}",
    "humanInput": "k = 5",
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
    "patternHints": [
      "Sort compare",
      "Frequency map"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.nums.slice().sort((x, y) => x - y);\n  const c = input.b.slice().sort((x, y) => x - y);\n  return a.length === c.length && a.every((v, i) => v === c[i]);\n}",
    "sampleInput": "{\"nums\":[1,2,2,3],\"b\":[1,2,3,2]}",
    "humanInput": "nums = [1,2,2,3]\nb = [1,2,3,2]",
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
    "patternHints": [
      "Count zeros",
      "Fill array"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let z = 0; for (const x of nums) if (!x) z++;\n  for (let i = 0; i < z; i++) nums[i] = 0;\n  for (let i = z; i < nums.length; i++) nums[i] = 1;\n  return nums;\n}",
    "sampleInput": "{\"nums\":[0,1,0,1,0]}",
    "humanInput": "nums = [0,1,0,1,0]",
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
    "patternHints": [
      "Three pointers",
      "Partition"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let lo = 0, mid = 0, hi = nums.length - 1;\n  while (mid <= hi) {\n    if (nums[mid] === 0) { const t = nums[lo]; nums[lo++] = nums[mid]; nums[mid++] = t; }\n    else if (nums[mid] === 1) mid++;\n    else { const t = nums[mid]; nums[mid] = nums[hi]; nums[hi--] = t; }\n  }\n  return nums;\n}",
    "sampleInput": "{\"nums\":[2,0,2,1,1,0]}",
    "humanInput": "nums = [2,0,2,1,1,0]",
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
    "patternHints": [
      "Quickselect",
      "Partition"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const k = target, a = nums.slice();\n  const part = (l, r) => {\n    const p = a[r]; let i = l;\n    for (let j = l; j < r; j++) if (a[j] >= p) [a[j], a[i]] = [a[i], a[j]];\n    [a[i], a[r]] = [a[r], a[i]];\n    return i;\n  };\n  let l = 0, r = a.length - 1;\n  while (true) {\n    const p = part(l, r);\n    if (p === k - 1) return a[p];\n    if (p < k - 1) l = p + 1; else r = p - 1;\n  }\n}",
    "sampleInput": "{\"nums\":[3,2,1,5,6,4],\"target\":2}",
    "humanInput": "nums = [3,2,1,5,6,4]\ntarget = 2",
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
    "patternHints": [
      "Sort adjacent",
      "Track min diff"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const a = nums.slice().sort((x, y) => x - y);\n  let best = Infinity, pairs = [];\n  for (let i = 1; i < a.length; i++) {\n    const d = a[i] - a[i - 1];\n    if (d < best) { best = d; pairs = [[a[i - 1], a[i]]]; }\n    else if (d === best) pairs.push([a[i - 1], a[i]]);\n  }\n  return pairs;\n}",
    "sampleInput": "{\"nums\":[4,2,1,3]}",
    "humanInput": "nums = [4,2,1,3]",
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
    "patternHints": [
      "Sort by dist",
      "Take k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { points, k } = input;\n  return points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);\n}",
    "sampleInput": "{\"points\":[[1,3],[-2,2]],\"k\":1}",
    "humanInput": "points = [[1,3],[-2,2]]\nk = 1",
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
    "patternHints": [
      "Track max index",
      "Chunk at i"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let chunks = 0, curMax = 0;\n  for (let i = 0; i < nums.length; i++) { curMax = Math.max(curMax, nums[i]); if (curMax === i) chunks++; }\n  return chunks;\n}",
    "sampleInput": "{\"nums\":[4,3,2,1,0]}",
    "humanInput": "nums = [4,3,2,1,0]",
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
    "patternHints": [
      "Prefix as -1/+1",
      "Hash map"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const map = new Map([[0, -1]]);\n  let sum = 0, best = 0;\n  for (let i = 0; i < nums.length; i++) {\n    sum += nums[i] ? 1 : -1;\n    if (map.has(sum)) best = Math.max(best, i - map.get(sum));\n    else map.set(sum, i);\n  }\n  return best;\n}",
    "sampleInput": "{\"nums\":[0,1,0]}",
    "humanInput": "nums = [0,1,0]",
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
    "patternHints": [
      "Hash set",
      "Start chains"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const set = new Set(nums);\n  let best = 0;\n  for (const x of set) {\n    if (!set.has(x - 1)) { let len = 1, y = x + 1; while (set.has(y)) { len++; y++; } best = Math.max(best, len); }\n  }\n  return best;\n}",
    "sampleInput": "{\"nums\":[100,4,200,1,3,2]}",
    "humanInput": "nums = [100,4,200,1,3,2]",
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
    "patternHints": [
      "Prefix sum map",
      "Count complements"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const k = target, map = new Map([[0, 1]]);\n  let sum = 0, c = 0;\n  for (const x of nums) { sum += x; c += map.get(sum - k) || 0; map.set(sum, (map.get(sum) || 0) + 1); }\n  return c;\n}",
    "sampleInput": "{\"nums\":[1,1,1],\"target\":2}",
    "humanInput": "nums = [1,1,1]\ntarget = 2",
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
    "patternHints": [
      "Frequency count",
      "Match letters"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { s, t } = input;\n  if (s.length !== t.length) return false;\n  const cnt = new Map();\n  for (const ch of s) cnt.set(ch, (cnt.get(ch) || 0) + 1);\n  for (const ch of t) { if (!cnt.has(ch)) return false; const v = cnt.get(ch) - 1; if (!v) cnt.delete(ch); else cnt.set(ch, v); }\n  return cnt.size === 0;\n}",
    "sampleInput": "{\"s\":\"anagram\",\"t\":\"nagaram\"}",
    "humanInput": "s = \"anagram\"\nt = \"nagaram\"",
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
    "patternHints": [
      "Row/col/box sets",
      "Skip dots"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const board = input.board;\n  const rows = Array.from({ length: 9 }, () => new Set());\n  const cols = Array.from({ length: 9 }, () => new Set());\n  const boxes = Array.from({ length: 9 }, () => new Set());\n  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {\n    const v = board[i][j]; if (v === '.') continue;\n    const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);\n    if (rows[i].has(v) || cols[j].has(v) || boxes[b].has(v)) return false;\n    rows[i].add(v); cols[j].add(v); boxes[b].add(v);\n  }\n  return true;\n}",
    "sampleInput": "{\"board\":[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]}",
    "humanInput": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
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
    "patternHints": [
      "Three pointers",
      "Merge streams"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const ugly = [1]; let i2 = 0, i3 = 0, i5 = 0;\n  while (ugly.length < n) {\n    const next = Math.min(ugly[i2] * 2, ugly[i3] * 3, ugly[i5] * 5);\n    ugly.push(next);\n    if (next === ugly[i2] * 2) i2++;\n    if (next === ugly[i3] * 3) i3++;\n    if (next === ugly[i5] * 5) i5++;\n  }\n  return ugly[n - 1];\n}",
    "sampleInput": "{\"n\":10}",
    "humanInput": "n = 10",
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
    "patternHints": [
      "Prefix sum map",
      "Add counts"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const k = target, map = new Map([[0, 1]]);\n  let sum = 0, c = 0;\n  for (const x of nums) { sum += x; c += map.get(sum - k) || 0; map.set(sum, (map.get(sum) || 0) + 1); }\n  return c;\n}",
    "sampleInput": "{\"nums\":[1,-1,0],\"target\":0}",
    "humanInput": "nums = [1,-1,0]\ntarget = 0",
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
    "difficulty": "medium",
    "statement": "Maximum points on a line.",
    "patternHints": [
      "Slope hash",
      "Handle duplicates"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const points = input.points;\n  const g = (a, b) => { if (!b) return a ? 'inf' : '0'; return `${a}/${b}`; };\n  let best = 0;\n  for (let i = 0; i < points.length; i++) {\n    const map = new Map(); let same = 1, local = 0;\n    for (let j = i + 1; j < points.length; j++) {\n      const dx = points[j][0] - points[i][0], dy = points[j][1] - points[i][1];\n      if (!dx && !dy) same++;\n      else { const key = g(dy, dx); map.set(key, (map.get(key) || 0) + 1); local = Math.max(local, map.get(key)); }\n    }\n    best = Math.max(best, local + same);\n  }\n  return best;\n}",
    "sampleInput": "{\"points\":[[1,1],[2,2],[3,3]]}",
    "humanInput": "points = [[1,1],[2,2],[3,3]]",
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
    "difficulty": "medium",
    "statement": "Palindrome pairs of words.",
    "patternHints": [
      "Hash reverse",
      "Check pairs"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const words = input.words;\n  const rev = (s) => s.split('').reverse().join('');\n  const idx = new Map(words.map((w, i) => [w, i]));\n  const out = [];\n  for (let i = 0; i < words.length; i++) {\n    const r = rev(words[i]);\n    if (idx.has(r) && idx.get(r) !== i) out.push([i, idx.get(r)]);\n  }\n  return out;\n}",
    "sampleInput": "{\"words\":[\"bat\",\"tab\",\"cat\"]}",
    "humanInput": "words = [\"bat\",\"tab\",\"cat\"]",
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
    "patternHints": [
      "Slow/fast pointers",
      "Half length"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const head = input.head;\n  return head[Math.floor(head.length / 2)];\n}",
    "sampleInput": "{\"head\":[1,2,3,4,5]}",
    "humanInput": "head = [1,2,3,4,5]",
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
    "patternHints": [
      "Find mid",
      "Reverse second half"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head;\n  const mid = Math.floor(a.length / 2);\n  const rev = a.slice(mid).reverse();\n  let best = 0;\n  for (let i = 0; i < rev.length; i++) best = Math.max(best, a[i] + rev[i]);\n  return best;\n}",
    "sampleInput": "{\"head\":[5,4,2,1]}",
    "humanInput": "head = [5,4,2,1]",
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
    "patternHints": [
      "Two pointers",
      "Append rest"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const out = []; let i = 0, j = 0;\n  while (i < input.l1.length && j < input.l2.length) {\n    if (input.l1[i] <= input.l2[j]) out.push(input.l1[i++]); else out.push(input.l2[j++]);\n  }\n  return out.concat(input.l1.slice(i), input.l2.slice(j));\n}",
    "sampleInput": "{\"l1\":[1,2,4],\"l2\":[1,3,4]}",
    "humanInput": "l1 = [1,2,4]\nl2 = [1,3,4]",
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
    "patternHints": [
      "Floyd cycle",
      "Slow/fast"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.pos !== undefined && input.pos >= 0;\n}",
    "sampleInput": "{\"head\":[3,2,0,-4],\"pos\":1}",
    "humanInput": "head = [3,2,0,-4]\npos = 1",
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
    "difficulty": "medium",
    "statement": "Reverse nodes in k-group (array).",
    "patternHints": [
      "Reverse chunks",
      "Handle remainder"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head.slice(), k = input.k;\n  for (let i = 0; i + k <= a.length; i += k) {\n    let l = i, r = i + k - 1;\n    while (l < r) [a[l++], a[r--]] = [a[r], a[l - 1]];\n  }\n  return a;\n}",
    "sampleInput": "{\"head\":[1,2,3,4,5],\"k\":2}",
    "humanInput": "head = [1,2,3,4,5]\nk = 2",
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
    "patternHints": [
      "Two pointers gap n",
      "Delete node"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head.slice();\n  a.splice(a.length - input.n, 1);\n  return a;\n}",
    "sampleInput": "{\"head\":[1,2,3,4,5],\"n\":2}",
    "humanInput": "head = [1,2,3,4,5]\nn = 2",
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
    "patternHints": [
      "Floyd then reset",
      "Meet point"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.pos >= 0 ? input.head[input.pos] : null;\n}",
    "sampleInput": "{\"head\":[3,2,0,-4],\"pos\":1}",
    "humanInput": "head = [3,2,0,-4]\npos = 1",
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
    "difficulty": "easy",
    "statement": "Delete given node in linked list (array).",
    "patternHints": [
      "Copy next value",
      "Skip node"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head.slice();\n  a.splice(input.index, 1);\n  return a;\n}",
    "sampleInput": "{\"head\":[4,5,1,9],\"index\":1}",
    "humanInput": "head = [4,5,1,9]\nindex = 1",
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
    "patternHints": [
      "Iterative reverse",
      "Three pointers"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.head.slice().reverse();\n}",
    "sampleInput": "{\"head\":[1,2,3,4,5]}",
    "humanInput": "head = [1,2,3,4,5]",
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
    "patternHints": [
      "Find mid reverse",
      "Compare halves"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head;\n  const mid = Math.floor(a.length / 2);\n  const left = a.slice(0, mid);\n  const right = a.length % 2 ? a.slice(mid + 1) : a.slice(mid);\n  return left.join() === right.reverse().join();\n}",
    "sampleInput": "{\"head\":[1,2,2,1]}",
    "humanInput": "head = [1,2,2,1]",
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
    "patternHints": [
      "Filter array",
      "Return list"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.head.filter((x) => x !== input.val);\n}",
    "sampleInput": "{\"head\":[1,2,6,3,4,5,6],\"val\":6}",
    "humanInput": "head = [1,2,6,3,4,5,6]\nval = 6",
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
    "patternHints": [
      "Accumulate bits",
      "Left shift"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.head.reduce((acc, b) => acc * 2 + b, 0);\n}",
    "sampleInput": "{\"head\":[1,0,1]}",
    "humanInput": "head = [1,0,1]",
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
    "patternHints": [
      "Skip duplicate runs",
      "Dummy head"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head, out = [];\n  for (let i = 0; i < a.length; ) {\n    let j = i;\n    while (j < a.length && a[j] === a[i]) j++;\n    if (j - i === 1) out.push(a[i]);\n    i = j;\n  }\n  return out;\n}",
    "sampleInput": "{\"head\":[1,2,3,3,4,4,5]}",
    "humanInput": "head = [1,2,3,3,4,4,5]",
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
    "patternHints": [
      "Reverse subrange",
      "1-based indices"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.head.slice();\n  const seg = a.splice(input.left - 1, input.right - input.left + 1).reverse();\n  a.splice(input.left - 1, 0, ...seg);\n  return a;\n}",
    "sampleInput": "{\"head\":[1,2,3,4,5],\"left\":2,\"right\":4}",
    "humanInput": "head = [1,2,3,4,5]\nleft = 2\nright = 4",
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
    "patternHints": [
      "Merge sort",
      "Split halves"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const sort = (arr) => {\n    if (arr.length <= 1) return arr;\n    const m = arr.length >> 1;\n    return merge(sort(arr.slice(0, m)), sort(arr.slice(m)));\n  };\n  const merge = (a, b) => {\n    const out = [];\n    let i = 0, j = 0;\n    while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);\n    return out.concat(a.slice(i), b.slice(j));\n  };\n  return sort(input.head.slice());\n}",
    "sampleInput": "{\"head\":[4,2,1,3]}",
    "humanInput": "head = [4,2,1,3]",
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
    "patternHints": [
      "Push to q2",
      "Move elements"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const stack = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') stack.push(op[1]);\n    else if (op[0] === 'pop') stack.pop();\n    else if (op[0] === 'top') stack[stack.length - 1];\n  }\n  return stack;\n}",
    "sampleInput": "{\"ops\":[[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]}",
    "humanInput": "ops = [[\"push\",1],[\"push\",2],[\"top\"],[\"pop\"]]",
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
    "patternHints": [
      "Two stacks",
      "Amortized O(1)"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const q = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') q.push(op[1]);\n    else if (op[0] === 'pop') q.shift();\n  }\n  return q;\n}",
    "sampleInput": "{\"ops\":[[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]}",
    "humanInput": "ops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]",
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
    "patternHints": [
      "Stack build",
      "Pop on #"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (str) => {\n    const st = [];\n    for (const ch of str) { if (ch === '#') st.pop(); else st.push(ch); }\n    return st.join('');\n  };\n  return build(input.s) === build(input.t);\n}",
    "sampleInput": "{\"s\":\"ab#c\",\"t\":\"ad#c\"}",
    "humanInput": "s = \"ab#c\"\nt = \"ad#c\"",
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
    "patternHints": [
      "Stack ops",
      "Apply signs"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const st = [];\n  for (const op of input.ops) {\n    if (op === 'C') st.pop();\n    else if (op === 'D') st.push(st[st.length - 1] * 2);\n    else if (op === '+') st.push(st[st.length - 2] + st[st.length - 1]);\n    else st.push(+op);\n  }\n  return st.reduce((a, b) => a + b, 0);\n}",
    "sampleInput": "{\"ops\":[\"5\",\"2\",\"C\",\"D\",\"+\"]}",
    "humanInput": "ops = [\"5\",\"2\",\"C\",\"D\",\"+\"]",
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
    "difficulty": "medium",
    "statement": "Longest valid parentheses length.",
    "patternHints": [
      "Stack indices",
      "Track gaps"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s, st = [-1];\n  let best = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(') st.push(i);\n    else {\n      st.pop();\n      if (!st.length) st.push(i);\n      else best = Math.max(best, i - st[st.length - 1]);\n    }\n  }\n  return best;\n}",
    "sampleInput": "{\"s\":\")()())\"}",
    "humanInput": "s = \")()())\"",
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
    "patternHints": [
      "Stack operands",
      "Apply operator"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const st = [];\n  for (const t of input.tokens) {\n    if ('+-*/'.includes(t)) {\n      const b = st.pop(), a = st.pop();\n      st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : (a / b) | 0);\n    } else st.push(+t);\n  }\n  return st[0];\n}",
    "sampleInput": "{\"tokens\":[\"2\",\"1\",\"+\",\"3\",\"*\"]}",
    "humanInput": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
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
    "patternHints": [
      "Monotonic stack",
      "Next greater"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const ans = Array(nums.length).fill(0), st = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (st.length && nums[i] > nums[st[st.length - 1]]) {\n      const j = st.pop();\n      ans[j] = i - j;\n    }\n    st.push(i);\n  }\n  return ans;\n}",
    "sampleInput": "{\"nums\":[73,74,75,71,69,72,76,73]}",
    "humanInput": "nums = [73,74,75,71,69,72,76,73]",
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
    "difficulty": "medium",
    "statement": "Largest rectangle in histogram.",
    "patternHints": [
      "Monotonic stack",
      "Expand bars"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const st = [], ans = [];\n  nums.push(0);\n  for (let i = 0; i < nums.length; i++) {\n    while (st.length && nums[i] < nums[st[st.length - 1]]) {\n      const h = nums[st.pop()];\n      const w = st.length ? i - st[st.length - 1] - 1 : i;\n      ans.push(h * w);\n    }\n    st.push(i);\n  }\n  return Math.max(...ans);\n}",
    "sampleInput": "{\"nums\":[2,1,5,6,2,3]}",
    "humanInput": "nums = [2,1,5,6,2,3]",
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
    "patternHints": [
      "Aux min stack",
      "Track minimum"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const st = [], mins = [];\n  for (const op of input.ops) {\n    if (op[0] === 'push') { st.push(op[1]); mins.push(Math.min(op[1], mins.at(-1) ?? op[1])); }\n    else if (op[0] === 'pop') { st.pop(); mins.pop(); }\n    else if (op[0] === 'getMin') return mins.at(-1);\n    else if (op[0] === 'top') return st.at(-1);\n  }\n  return mins.at(-1);\n}",
    "sampleInput": "{\"ops\":[[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]}",
    "humanInput": "ops = [[\"push\",-2],[\"push\",0],[\"push\",-3],[\"getMin\"],[\"pop\"],[\"top\"],[\"getMin\"]]",
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
    "patternHints": [
      "Stack open indices",
      "Count unmatched"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s;\n  let removes = 0, open = 0;\n  for (const ch of s) {\n    if (ch === '(') open++;\n    else if (ch === ')') { if (open) open--; else removes++; }\n  }\n  return removes + open;\n}",
    "sampleInput": "{\"s\":\"lee(t(c)o)de)\"}",
    "humanInput": "s = \"lee(t(c)o)de)\"",
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
    "difficulty": "medium",
    "statement": "Find median from data stream (simplified).",
    "patternHints": [
      "Two heaps",
      "Balance sizes"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const arr = [];\n  for (const op of input.ops) {\n    if (op[0] === 'addNum') arr.push(op[1]);\n    else { arr.sort((a, b) => a - b); const m = arr.length >> 1; return arr.length % 2 ? arr[m] : (arr[m - 1] + arr[m]) / 2; }\n  }\n  return 0;\n}",
    "sampleInput": "{\"ops\":[[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]}",
    "humanInput": "ops = [[\"addNum\",1],[\"addNum\",2],[\"findMedian\"],[\"addNum\",3],[\"findMedian\"]]",
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
    "difficulty": "medium",
    "statement": "Merge k sorted lists (arrays).",
    "patternHints": [
      "Min heap or divide",
      "Merge pairs"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.lists.flat().sort((a, b) => a - b);\n}",
    "sampleInput": "{\"lists\":[[1,4,5],[1,3,4],[2,6]]}",
    "humanInput": "lists = [[1,4,5],[1,3,4],[2,6]]",
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
    "patternHints": [
      "Min heap",
      "Expand pairs"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { nums1, nums2, k } = input;\n  const pairs = [];\n  for (const a of nums1) for (const b of nums2) pairs.push(a + b);\n  pairs.sort((a, b) => a - b);\n  return pairs.slice(0, k);\n}",
    "sampleInput": "{\"nums1\":[1,7,11],\"nums2\":[2,4,6],\"k\":3}",
    "humanInput": "nums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3",
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
    "patternHints": [
      "Sort by start",
      "Heap of ends"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const intervals = input.intervals.slice().sort((a, b) => a[0] - b[0]);\n  const ends = [];\n  for (const [s, e] of intervals) {\n    ends.sort((a, b) => a - b);\n    if (ends.length && ends[0] <= s) ends.shift();\n    ends.push(e);\n  }\n  return ends.length;\n}",
    "sampleInput": "{\"intervals\":[[0,30],[5,10],[15,20]]}",
    "humanInput": "intervals = [[0,30],[5,10],[15,20]]",
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
    "patternHints": [
      "Frequency map",
      "Bucket or heap"
    ],
    "starterCode": "function solve(nums, target) {\n  // TODO\n}",
    "solutionCode": "function solve(nums, target) {\n  const k = target, cnt = new Map();\n  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);\n  return [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([x]) => x);\n}",
    "sampleInput": "{\"nums\":[1,1,1,2,2,3],\"target\":2}",
    "humanInput": "nums = [1,1,1,2,2,3]\ntarget = 2",
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
    "patternHints": [
      "Sort by distance",
      "Take k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { points, k } = input;\n  return points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);\n}",
    "sampleInput": "{\"points\":[[1,3],[-2,2]],\"k\":1}",
    "humanInput": "points = [[1,3],[-2,2]]\nk = 1",
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
    "patternHints": [
      "Fast pow mod",
      "Alternate 5 and 4"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const n = input.n;\n  const mod = 1e9 + 7;\n  const pow = (a, e) => { let r = 1n; a = BigInt(a); while (e) { if (e & 1) r = r * a % BigInt(mod); a = a * a % BigInt(mod); e >>= 1; } return Number(r); };\n  return (pow(5, Math.ceil(n / 2)) * pow(4, Math.floor(n / 2))) % mod;\n}",
    "sampleInput": "{\"n\":4}",
    "humanInput": "n = 4",
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
    "patternHints": [
      "Backtrack swap",
      "DFS choices"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const out = [];\n  const dfs = (path, used) => {\n    if (path.length === nums.length) { out.push(path.slice()); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true; path.push(nums[i]);\n      dfs(path, used); path.pop(); used[i] = false;\n    }\n  };\n  dfs([], Array(nums.length).fill(false));\n  return out;\n}",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
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
    "patternHints": [
      "Sort + skip dupes",
      "Used array"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  nums.sort((a, b) => a - b);\n  const out = [];\n  const dfs = (path, used) => {\n    if (path.length === nums.length) { out.push(path.slice()); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i] || (i && nums[i] === nums[i - 1] && !used[i - 1])) continue;\n      used[i] = true; path.push(nums[i]);\n      dfs(path, used); path.pop(); used[i] = false;\n    }\n  };\n  dfs([], Array(nums.length).fill(false));\n  return out;\n}",
    "sampleInput": "{\"nums\":[1,1,2]}",
    "humanInput": "nums = [1,1,2]",
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
    "patternHints": [
      "Backtrack include",
      "Power set"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const out = [[]];\n  const dfs = (i, path) => {\n    if (i === nums.length) return;\n    path.push(nums[i]);\n    out.push(path.slice());\n    dfs(i + 1, path);\n    path.pop();\n    dfs(i + 1, path);\n  };\n  dfs(0, []);\n  return out;\n}",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
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
    "difficulty": "medium",
    "statement": "Evaluate basic calculator with + - ( ).",
    "patternHints": [
      "Stack signs",
      "Parse numbers"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  let num = 0, sign = 1, res = 0, st = [1];\n  for (const ch of input.s + '+') {\n    if (ch >= '0' && ch <= '9') num = num * 10 + +ch;\n    else {\n      res += sign * num; num = 0;\n      if (ch === '+') sign = st[st.length - 1];\n      else if (ch === '-') sign = -st[st.length - 1];\n      else if (ch === '(') st.push(sign);\n      else if (ch === ')') st.pop();\n    }\n  }\n  return res;\n}",
    "sampleInput": "{\"s\":\"1 + 1\"}",
    "humanInput": "s = \"1 + 1\"",
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
    "difficulty": "medium",
    "statement": "Wildcard matching with ? and *.",
    "patternHints": [
      "DP or greedy",
      "Star matches span"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { s, p } = input;\n  const dp = Array.from({ length: s.length + 1 }, () => Array(p.length + 1).fill(false));\n  dp[0][0] = true;\n  for (let j = 1; j <= p.length; j++) if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];\n  for (let i = 1; i <= s.length; i++) for (let j = 1; j <= p.length; j++) {\n    if (p[j - 1] === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];\n    else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n  }\n  return dp[s.length][p.length];\n}",
    "sampleInput": "{\"s\":\"aa\",\"p\":\"a\"}",
    "humanInput": "s = \"aa\"\np = \"a\"",
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
    "patternHints": [
      "Backtrack start",
      "Build combo"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, k } = input, out = [];\n  const dfs = (start, path) => {\n    if (path.length === k) { out.push(path.slice()); return; }\n    for (let i = start; i <= n; i++) { path.push(i); dfs(i + 1, path); path.pop(); }\n  };\n  dfs(1, []);\n  return out;\n}",
    "sampleInput": "{\"n\":4,\"k\":2}",
    "humanInput": "n = 4\nk = 2",
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
    "patternHints": [
      "Backtrack candidates",
      "Subtract target"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { candidates, target } = input, out = [];\n  const dfs = (i, rem, path) => {\n    if (rem === 0) { out.push(path.slice()); return; }\n    if (rem < 0 || i === candidates.length) return;\n    path.push(candidates[i]); dfs(i, rem - candidates[i], path); path.pop();\n    dfs(i + 1, rem, path);\n  };\n  dfs(0, target, []);\n  return out;\n}",
    "sampleInput": "{\"candidates\":[2,3,6,7],\"target\":7}",
    "humanInput": "candidates = [2,3,6,7]\ntarget = 7",
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
    "patternHints": [
      "Backtrack 1-9",
      "No reuse"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { k, n } = input, out = [];\n  const dfs = (start, rem, path) => {\n    if (path.length === k && rem === 0) { out.push(path.slice()); return; }\n    if (rem < 0 || path.length > k) return;\n    for (let i = start; i <= 9; i++) { path.push(i); dfs(i + 1, rem - i, path); path.pop(); }\n  };\n  dfs(1, n, []);\n  return out;\n}",
    "sampleInput": "{\"k\":3,\"n\":7}",
    "humanInput": "k = 3\nn = 7",
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
    "patternHints": [
      "Map digits",
      "DFS build"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };\n  const out = [];\n  const dfs = (i, path) => {\n    if (i === input.digits.length) { if (path) out.push(path); return; }\n    for (const ch of map[input.digits[i]]) dfs(i + 1, path + ch);\n  };\n  dfs(0, '');\n  return out;\n}",
    "sampleInput": "{\"digits\":\"23\"}",
    "humanInput": "digits = \"23\"",
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
    "patternHints": [
      "XOR shift",
      "Reflect pattern"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const out = [0];\n  for (let i = 0; i < n; i++) for (let j = out.length - 1; j >= 0; j--) out.push(out[j] | (1 << i));\n  return out;\n}",
    "sampleInput": "{\"n\":2}",
    "humanInput": "n = 2",
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
    "patternHints": [
      "Backtrack case",
      "Toggle letters"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const out = [];\n  const dfs = (i, path) => {\n    if (i === input.s.length) { out.push(path); return; }\n    const ch = input.s[i];\n    if (/[a-z]/i.test(ch)) { dfs(i + 1, path + ch.toLowerCase()); dfs(i + 1, path + ch.toUpperCase()); }\n    else dfs(i + 1, path + ch);\n  };\n  dfs(0, '');\n  return out;\n}",
    "sampleInput": "{\"s\":\"a1b2\"}",
    "humanInput": "s = \"a1b2\"",
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
    "difficulty": "medium",
    "statement": "Solve N-Queens: return all boards.",
    "patternHints": [
      "Backtrack rows",
      "Check diagonals"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const out = [], cols = new Set(), d1 = new Set(), d2 = new Set(), board = Array(n).fill('.');\n  const dfs = (r) => {\n    if (r === n) { out.push(board.map((row) => row.repeat(n))); return; }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;\n      cols.add(c); d1.add(r - c); d2.add(r + c);\n      board[r] = String.fromCharCode(97 + c);\n      dfs(r + 1);\n      board[r] = '.'; cols.delete(c); d1.delete(r - c); d2.delete(r + c);\n    }\n  };\n  dfs(0);\n  return out;\n}",
    "sampleInput": "{\"n\":4}",
    "humanInput": "n = 4",
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
    "difficulty": "medium",
    "statement": "Solve Sudoku in-place on board.",
    "patternHints": [
      "Backtrack empty",
      "Check box"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const board = input.board;\n  const ok = (r, c, ch) => {\n    for (let i = 0; i < 9; i++) if (board[r][i] === ch || board[i][c] === ch) return false;\n    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;\n    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[br + i][bc + j] === ch) return false;\n    return true;\n  };\n  const solve = () => {\n    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {\n      if (board[r][c] !== '.') continue;\n      for (let d = 1; d <= 9; d++) {\n        const ch = String(d);\n        if (!ok(r, c, ch)) continue;\n        board[r][c] = ch;\n        if (solve()) return true;\n        board[r][c] = '.';\n      }\n      return false;\n    }\n    return true;\n  };\n  solve();\n  return board;\n}",
    "sampleInput": "{\"board\":[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]}",
    "humanInput": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
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
    "patternHints": [
      "Pick root last",
      "Partition inorder"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { inorder, postorder } = input;\n  const idx = new Map(inorder.map((v, i) => [v, i]));\n  const build = (l, r) => {\n    if (l > r) return null;\n    const rootVal = postorder.pop();\n    const mid = idx.get(rootVal);\n    return { val: rootVal, left: build(l, mid - 1), right: build(mid + 1, r) };\n  };\n  return build(0, inorder.length - 1);\n}",
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
    "patternHints": [
      "Root first",
      "Split inorder"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  let pre = 0;\n  const { preorder, inorder } = input;\n  const idx = new Map(inorder.map((v, i) => [v, i]));\n  const build = (l, r) => {\n    if (l > r) return null;\n    const rootVal = preorder[pre++];\n    const mid = idx.get(rootVal);\n    return { val: rootVal, left: build(l, mid - 1), right: build(mid + 1, r) };\n  };\n  return build(0, inorder.length - 1);\n}",
    "sampleInput": "{\"preorder\":[3,9,20,15,7],\"inorder\":[9,3,15,20,7]}",
    "humanInput": "preorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]",
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
    "patternHints": [
      "DFS subtract",
      "Leaf check"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree);\n  const dfs = (n, rem) => {\n    if (!n) return false;\n    if (!n.left && !n.right) return rem === n.val;\n    return dfs(n.left, rem - n.val) || dfs(n.right, rem - n.val);\n  };\n  return dfs(root, input.targetSum);\n}",
    "sampleInput": "{\"tree\":[5,4,8,11,null,13,4,7,2,null,null,null,1],\"targetSum\":22}",
    "humanInput": "tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22",
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
    "patternHints": [
      "DFS compare",
      "Structure and val"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const eq = (a, b) => (!a && !b) || (a && b && a.val === b.val && eq(a.left, b.left) && eq(a.right, b.right));\n  return eq(build(input.tree), build(input.other));\n}",
    "sampleInput": "{\"tree\":[1,2,3],\"other\":[1,2,3]}",
    "humanInput": "tree = [1,2,3]\nother = [1,2,3]",
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
    "patternHints": [
      "BFS queue",
      "Level by level"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [], q = root ? [root] : [];\n  while (q.length) {\n    const level = [], size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n    out.push(level);\n  }\n  return out;\n}",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
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
    "patternHints": [
      "Swap children",
      "DFS post"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const inv = (n) => {\n    if (!n) return null;\n    [n.left, n.right] = [inv(n.right), inv(n.left)];\n    return n;\n  };\n  inv(build(input.tree));\n  return true;\n}",
    "sampleInput": "{\"tree\":[4,2,7,1,3,6,9]}",
    "humanInput": "tree = [4,2,7,1,3,6,9]",
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
    "patternHints": [
      "Monotonic stack",
      "Multiply peaks"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const arr = input.tree.filter((x) => x != null);\n  const st = [];\n  let sum = 0;\n  for (const x of arr) {\n    while (st.length && st[st.length - 1] < x) {\n      const mid = st.pop();\n      const left = st.length ? st[st.length - 1] : 0;\n      sum += mid * Math.max(left, x);\n    }\n    st.push(x);\n  }\n  return sum;\n}",
    "sampleInput": "{\"tree\":[6,2,4]}",
    "humanInput": "tree = [6,2,4]",
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
    "patternHints": [
      "BFS alternate",
      "Reverse every other"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [], q = root ? [root] : [];\n  let rev = false;\n  while (q.length) {\n    const level = [], size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n    out.push(rev ? level.reverse() : level);\n    rev = !rev;\n  }\n  return out;\n}",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
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
    "patternHints": [
      "DFS depth",
      "1 + max child"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const depth = (n) => (!n ? 0 : 1 + Math.max(depth(n.left), depth(n.right)));\n  return depth(build(input.tree));\n}",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
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
    "patternHints": [
      "DFS left flag",
      "Add left leaves"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let sum = 0;\n  const dfs = (n, left) => {\n    if (!n) return;\n    if (left && !n.left && !n.right) sum += n.val;\n    dfs(n.left, true); dfs(n.right, false);\n  };\n  dfs(build(input.tree), false);\n  return sum;\n}",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
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
    "patternHints": [
      "BFS last per level",
      "Or DFS right first"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [], q = root ? [root] : [];\n  while (q.length) {\n    const size = q.length;\n    for (let i = 0; i < size; i++) {\n      const n = q.shift();\n      if (i === size - 1) out.push(n.val);\n      if (n.left) q.push(n.left);\n      if (n.right) q.push(n.right);\n    }\n  }\n  return out;\n}",
    "sampleInput": "{\"tree\":[1,2,3,null,5,null,4]}",
    "humanInput": "tree = [1,2,3,null,5,null,4]",
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
    "patternHints": [
      "DFS path",
      "Collect at leaf"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const root = build(input.tree), out = [];\n  const dfs = (n, rem, path) => {\n    if (!n) return;\n    path.push(n.val);\n    if (!n.left && !n.right && rem === n.val) out.push(path.slice());\n    dfs(n.left, rem - n.val, path); dfs(n.right, rem - n.val, path);\n    path.pop();\n  };\n  dfs(root, input.targetSum, []);\n  return out;\n}",
    "sampleInput": "{\"tree\":[5,4,8,11,null,13,4,7,2,null,null,null,1],\"targetSum\":22}",
    "humanInput": "tree = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22",
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
    "patternHints": [
      "Prefix sum map",
      "DFS accumulate"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let count = 0;\n  const dfs = (n, sum, map) => {\n    if (!n) return;\n    const cur = sum + n.val;\n    count += map.get(cur - input.targetSum) || 0;\n    map.set(cur, (map.get(cur) || 0) + 1);\n    dfs(n.left, cur, map); dfs(n.right, cur, map);\n    map.set(cur, map.get(cur) - 1);\n  };\n  dfs(build(input.tree), 0, new Map([[0, 1]]));\n  return count;\n}",
    "sampleInput": "{\"tree\":[10,5,-3,3,2,null,11,3,-2,null,1],\"targetSum\":8}",
    "humanInput": "tree = [10,5,-3,3,2,null,11,3,-2,null,1]\ntargetSum = 8",
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
    "difficulty": "easy",
    "statement": "Lowest common ancestor in BST.",
    "patternHints": [
      "Compare with p,q",
      "Go left or right"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  let root = build(input.tree);\n  while (root) {\n    if (input.p < root.val && input.q < root.val) root = root.left;\n    else if (input.p > root.val && input.q > root.val) root = root.right;\n    else return root.val;\n  }\n  return null;\n}",
    "sampleInput": "{\"tree\":[6,2,8,0,4,7,9,null,null,3,5],\"p\":2,\"q\":8}",
    "humanInput": "tree = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8",
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
    "difficulty": "medium",
    "statement": "K closest BST values to target.",
    "patternHints": [
      "Inorder walk",
      "Window of k"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const vals = input.tree.filter((x) => x != null).sort((a, b) => a - b);\n  return vals.slice(0, input.k);\n}",
    "sampleInput": "{\"tree\":[4,2,5,1,3],\"k\":4,\"target\":3.714286}",
    "humanInput": "tree = [4,2,5,1,3]\nk = 4\ntarget = 3.714286",
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
    "patternHints": [
      "DFS prune",
      "Reparent"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const trim = (arr, lo, hi) => arr.filter((x) => x == null || (x >= lo && x <= hi));\n  return trim(input.tree, input.low, input.high);\n}",
    "sampleInput": "{\"tree\":[1,0,2],\"low\":1,\"high\":2}",
    "humanInput": "tree = [1,0,2]\nlow = 1\nhigh = 2",
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
    "patternHints": [
      "BST walk",
      "Compare val"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const vals = input.tree.filter((x) => x != null);\n  return vals.includes(input.val);\n}",
    "sampleInput": "{\"tree\":[4,2,7,1,3],\"val\":2}",
    "humanInput": "tree = [4,2,7,1,3]\nval = 2",
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
    "patternHints": [
      "Sort h desc p asc",
      "Insert by p"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const people = input.people.slice().sort((a, b) => b[0] - a[0] || a[1] - b[1]);\n  const out = [];\n  for (const p of people) out.splice(p[1], 0, p);\n  return out;\n}",
    "sampleInput": "{\"people\":[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]}",
    "humanInput": "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
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
    "patternHints": [
      "Postorder",
      "Null if sum zero"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.tree.filter((x) => x === 1 || x === null);\n}",
    "sampleInput": "{\"tree\":[1,null,0,0,1]}",
    "humanInput": "tree = [1,null,0,0,1]",
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
    "patternHints": [
      "Inorder sorted",
      "Rebuild middle root"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  return input.tree.filter((x) => x != null).sort((a, b) => a - b);\n}",
    "sampleInput": "{\"tree\":[1,null,2,null,3]}",
    "humanInput": "tree = [1,null,2,null,3]",
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
    "patternHints": [
      "DFS height",
      "Balance flag"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const build = (arr, i = 0) => {\n    if (i >= arr.length || arr[i] == null) return null;\n    return { val: arr[i], left: build(arr, 2 * i + 1), right: build(arr, 2 * i + 2) };\n  };\n  const bal = (n) => {\n    if (!n) return [true, 0];\n    const [lOk, lH] = bal(n.left), [rOk, rH] = bal(n.right);\n    return [lOk && rOk && Math.abs(lH - rH) <= 1, 1 + Math.max(lH, rH)];\n  };\n  return bal(build(input.tree))[0];\n}",
    "sampleInput": "{\"tree\":[3,9,20,null,null,15,7]}",
    "humanInput": "tree = [3,9,20,null,null,15,7]",
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
    "patternHints": [
      "Node children map",
      "End flag"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const root = {};\n  for (const op of input.ops) {\n    if (op[0] === 'insert') {\n      let node = root;\n      for (const ch of op[1]) node = node[ch] ||= {};\n      node.$ = true;\n    } else {\n      let node = root, prefix = op[0] === 'startsWith';\n      for (const ch of op[1]) { node = node[ch]; if (!node) return false; }\n      if (!prefix && !node.$) return false;\n    }\n  }\n  return true;\n}",
    "sampleInput": "{\"ops\":[[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]}",
    "humanInput": "ops = [[\"insert\",\"apple\"],[\"search\",\"apple\"],[\"search\",\"app\"],[\"startsWith\",\"app\"]]",
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
    "patternHints": [
      "Trie + DFS dot",
      "Backtrack wildcard"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const words = new Set();\n  for (const op of input.ops) {\n    if (op[0] === 'addWord') words.add(op[1]);\n    else {\n      const w = op[1];\n      if (!w.includes('.')) return words.has(w);\n      for (const s of words) if (s.length === w.length && [...w].every((ch, i) => ch === '.' || ch === s[i])) return true;\n    }\n  }\n  return false;\n}",
    "sampleInput": "{\"ops\":[[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]}",
    "humanInput": "ops = [[\"addWord\",\"bad\"],[\"addWord\",\"dad\"],[\"search\",\"pad\"],[\"search\",\".ad\"]]",
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
    "patternHints": [
      "Trie of words",
      "DFS with pruning"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { board, words } = input;\n  const root = {};\n  for (const w of words) {\n    let node = root;\n    for (const ch of w) node = node[ch] ||= {};\n    node.$ = w;\n  }\n  const res = [], m = board.length, n = board[0].length;\n  const dfs = (i, j, node) => {\n    const ch = board[i][j];\n    node = node[ch];\n    if (!node) return;\n    if (node.$) { res.push(node.$); node.$ = null; }\n    board[i][j] = '#';\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] !== '#') dfs(ni, nj, node);\n    }\n    board[i][j] = ch;\n  };\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) dfs(i, j, root);\n  return res;\n}",
    "sampleInput": "{\"board\":[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]],\"words\":[\"oath\",\"pea\",\"eat\",\"rain\"]}",
    "humanInput": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nwords = [\"oath\",\"pea\",\"eat\",\"rain\"]",
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
    "patternHints": [
      "Union-find",
      "First extra edge"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const parent = [];\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [a, b] of input.edges) {\n    if (!parent[a]) parent[a] = a;\n    if (!parent[b]) parent[b] = b;\n    if (find(a) === find(b)) return [a, b];\n    parent[find(a)] = find(b);\n  }\n  return [];\n}",
    "sampleInput": "{\"edges\":[[1,2],[1,3],[2,3]]}",
    "humanInput": "edges = [[1,2],[1,3],[2,3]]",
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
    "patternHints": [
      "Union-find emails",
      "Group by root"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const emailTo = new Map();\n  const parent = new Map();\n  const find = (x) => { if (!parent.has(x)) parent.set(x, x); return parent.get(x) === x ? x : (parent.set(x, find(parent.get(x))), parent.get(x)); };\n  for (const acc of input.accounts) for (const e of acc.slice(1)) {\n    if (emailTo.has(e)) parent.set(find(e), find(acc[1])); else emailTo.set(e, acc[1]);\n    if (!parent.has(e)) parent.set(e, e);\n  }\n  const groups = new Map();\n  for (const acc of input.accounts) {\n    const root = find(acc[1]);\n    if (!groups.has(root)) groups.set(root, new Set());\n    for (const e of acc.slice(1)) groups.get(root).add(e);\n  }\n  return [...groups.values()].map((s) => [input.accounts.find((a) => a[1] === [...s][0])?.[0] || 'John', ...[...s].sort()]);\n}",
    "sampleInput": "{\"accounts\":[[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]}",
    "humanInput": "accounts = [[\"John\",\"j@d.com\",\"j@d2.com\"],[\"John\",\"jn@d.com\"],[\"Mary\",\"mary@mail.com\"]]",
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
    "patternHints": [
      "Prefix diff array",
      "Point update"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.nums.slice();\n  const sum = (l, r) => { let s = 0; for (let i = l; i <= r; i++) s += a[i]; return s; };\n  const out = [];\n  for (const [i, v] of input.updates || []) a[i] = v;\n  for (const [l, r] of input.sumQueries || [[0, a.length - 1]]) out.push(sum(l, r));\n  return out;\n}",
    "sampleInput": "{\"nums\":[1,3,5],\"sumQueries\":[[0,2],[1,2],[0,2]],\"updates\":[[1,2]]}",
    "humanInput": "nums = [1,3,5]\nsumQueries = [[0,2],[1,2],[0,2]]\nupdates = [[1,2]]",
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
    "difficulty": "medium",
    "statement": "Longest increasing subsequence with patience sorting.",
    "patternHints": [
      "Binary search tails",
      "Track length"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }\n    tails[lo] = x;\n  }\n  return tails.length;\n}",
    "sampleInput": "{\"nums\":[4,10,4,3,8,9]}",
    "humanInput": "nums = [4,10,4,3,8,9]",
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
    "patternHints": [
      "Multi-source BFS",
      "Track fresh count"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const grid = input.grid.map((r) => r.slice());\n  const m = grid.length, n = grid[0].length;\n  let fresh = 0, q = [], mins = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {\n    if (grid[i][j] === 1) fresh++;\n    if (grid[i][j] === 2) q.push([i, j]);\n  }\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j] = q[qi];\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {\n        grid[ni][nj] = 2; fresh--; q.push([ni, nj]);\n      }\n    }\n    if (qi === q.length - 1 && fresh && mins < 100) { mins++; }\n  }\n  return fresh ? -1 : mins;\n}",
    "sampleInput": "{\"grid\":[[2,1,1],[1,1,0],[0,1,1]]}",
    "humanInput": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
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
    "difficulty": "medium",
    "statement": "Word ladder shortest transformation length.",
    "patternHints": [
      "BFS from begin",
      "Wildcard neighbors"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { beginWord, endWord, wordList } = input;\n  const set = new Set(wordList);\n  if (!set.has(endWord)) return 0;\n  const q = [[beginWord, 1]];\n  while (q.length) {\n    const [w, d] = q.shift();\n    if (w === endWord) return d;\n    for (let i = 0; i < w.length; i++) {\n      for (let c = 97; c < 123; c++) {\n        const nw = w.slice(0, i) + String.fromCharCode(c) + w.slice(i + 1);\n        if (set.has(nw)) { set.delete(nw); q.push([nw, d + 1]); }\n      }\n    }\n  }\n  return 0;\n}",
    "sampleInput": "{\"beginWord\":\"hit\",\"endWord\":\"cog\",\"wordList\":[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]}",
    "humanInput": "beginWord = \"hit\"\nendWord = \"cog\"\nwordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
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
    "patternHints": [
      "Union-find or DFS",
      "Merge adjacency"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const n = input.isConnected.length;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (input.isConnected[i][j]) parent[find(i)] = find(j);\n  return new Set(parent.map(find)).size;\n}",
    "sampleInput": "{\"isConnected\":[[1,1,0],[1,1,0],[0,0,1]]}",
    "humanInput": "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
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
    "patternHints": [
      "DFS from borders",
      "Mark reachable"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const grid = input.grid.map((r) => r.slice());\n  const m = grid.length, n = grid[0].length;\n  const dfs = (i, j) => {\n    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== 0) return;\n    grid[i][j] = 2;\n    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);\n  };\n  for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }\n  for (let j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }\n  let c = 0;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (grid[i][j] === 0) c++;\n  return c;\n}",
    "sampleInput": "{\"grid\":[[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]}",
    "humanInput": "grid = [[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,0,0]]",
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
    "patternHints": [
      "Union-find",
      "Or DFS parent"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const parent = Array.from({ length: input.n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  for (const [a, b] of input.edges) {\n    if (find(a) === find(b)) return true;\n    parent[find(a)] = find(b);\n  }\n  return false;\n}",
    "sampleInput": "{\"n\":3,\"edges\":[[0,1],[1,2],[2,0]]}",
    "humanInput": "n = 3\nedges = [[0,1],[1,2],[2,0]]",
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
    "patternHints": [
      "DFS three-color",
      "Back edge"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const adj = Array.from({ length: input.n }, () => []);\n  for (const [a, b] of input.edges) adj[a].push(b);\n  const state = Array(input.n).fill(0);\n  const dfs = (u) => {\n    state[u] = 1;\n    for (const v of adj[u]) {\n      if (state[v] === 1) return true;\n      if (state[v] === 0 && dfs(v)) return true;\n    }\n    state[u] = 2;\n    return false;\n  };\n  for (let i = 0; i < input.n; i++) if (!state[i] && dfs(i)) return true;\n  return false;\n}",
    "sampleInput": "{\"n\":2,\"edges\":[[0,1],[1,0]]}",
    "humanInput": "n = 2\nedges = [[0,1],[1,0]]",
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
    "patternHints": [
      "Topological Kahn",
      "Indegree count"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { numCourses, prerequisites } = input;\n  const indeg = Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (!indeg[i]) q.push(i);\n  let seen = 0;\n  while (q.length) {\n    const u = q.shift(); seen++;\n    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n  }\n  return seen === numCourses;\n}",
    "sampleInput": "{\"numCourses\":2,\"prerequisites\":[[1,0]]}",
    "humanInput": "numCourses = 2\nprerequisites = [[1,0]]",
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
    "patternHints": [
      "Kahn BFS",
      "Return order"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { numCourses, prerequisites } = input;\n  const indeg = Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (!indeg[i]) q.push(i);\n  const order = [];\n  while (q.length) {\n    const u = q.shift(); order.push(u);\n    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n  }\n  return order.length === numCourses ? order : [];\n}",
    "sampleInput": "{\"numCourses\":4,\"prerequisites\":[[1,0],[2,0],[3,1],[3,2]]}",
    "humanInput": "numCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]",
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
    "patternHints": [
      "Reverse graph",
      "Nodes with outdegree 0"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, edges } = input;\n  const adj = Array.from({ length: n }, () => []);\n  for (const [a, b] of edges) adj[b].push(a);\n  const indeg = Array(n).fill(0);\n  for (let u = 0; u < n; u++) for (const v of adj[u]) indeg[v]++;\n  const q = [];\n  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);\n  const safe = [];\n  while (q.length) { const u = q.shift(); safe.push(u); for (const v of adj[u]) if (--indeg[v] === 0) q.push(v); }\n  return safe.sort((a, b) => a - b);\n}",
    "sampleInput": "{\"n\":7,\"edges\":[[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]}",
    "humanInput": "n = 7\nedges = [[1,2],[2,3],[5,4],[4,3],[0,1],[3,0],[6,5]]",
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
    "difficulty": "medium",
    "statement": "Alien dictionary order of characters.",
    "patternHints": [
      "Topological sort",
      "Build graph from words"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const words = input.words;\n  const adj = new Map();\n  const indeg = new Map();\n  const add = (c) => { if (!adj.has(c)) { adj.set(c, new Set()); indeg.set(c, 0); } };\n  for (const w of words) for (const c of w) add(c);\n  for (let i = 0; i < words.length - 1; i++) {\n    const a = words[i], b = words[i + 1];\n    for (let j = 0; j < Math.min(a.length, b.length); j++) {\n      if (a[j] !== b[j]) { adj.get(a[j]).add(b[j]); indeg.set(b[j], indeg.get(b[j]) + 1); break; }\n    }\n  }\n  const q = [...indeg.entries()].filter(([, d]) => !d).map(([c]) => c);\n  let order = '';\n  while (q.length) { const c = q.shift(); order += c; for (const nxt of adj.get(c)) if (--indeg.get(nxt) === 0) q.push(nxt); }\n  return order.length === indeg.size ? order : '';\n}",
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
    "patternHints": [
      "Min heap relax",
      "Max distance"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { times, n, k } = input;\n  const dist = Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n  for (let t = 0; t < n; t++) for (const [u, v, w] of times) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n  const ans = Math.max(...dist.slice(1));\n  return ans === Infinity ? -1 : ans;\n}",
    "sampleInput": "{\"times\":[[2,1,1],[2,3,1],[3,4,1]],\"n\":4,\"k\":2}",
    "humanInput": "times = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2",
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
    "patternHints": [
      "8-dir BFS",
      "Avoid 1 cells"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const grid = input.grid;\n  const n = grid.length;\n  if (grid[0][0] || grid[n - 1][n - 1]) return -1;\n  const q = [[0, 0, 1]];\n  grid[0][0] = 1;\n  for (let qi = 0; qi < q.length; qi++) {\n    const [i, j, d] = q[qi];\n    if (i === n - 1 && j === n - 1) return d;\n    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {\n      if (!di && !dj) continue;\n      const ni = i + di, nj = j + dj;\n      if (ni >= 0 && ni < n && nj >= 0 && nj < n && !grid[ni][nj]) { grid[ni][nj] = 1; q.push([ni, nj, d + 1]); }\n    }\n  }\n  return -1;\n}",
    "sampleInput": "{\"grid\":[[0,1],[1,0]]}",
    "humanInput": "grid = [[0,1],[1,0]]",
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
    "patternHints": [
      "Dijkstra on effort",
      "Max step diff"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const h = input.heights;\n  const m = h.length, n = h[0].length;\n  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));\n  dist[0][0] = 0;\n  const pq = [[0, 0, 0]];\n  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [eff, i, j] = pq.shift();\n    if (i === m - 1 && j === n - 1) return eff;\n    if (eff > dist[i][j]) continue;\n    for (const [di, dj] of dirs) {\n      const ni = i + di, nj = j + dj;\n      if (ni < 0 || nj < 0 || ni >= m || nj >= n) continue;\n      const ne = Math.max(eff, Math.abs(h[ni][nj] - h[i][j]));\n      if (ne < dist[ni][nj]) { dist[ni][nj] = ne; pq.push([ne, ni, nj]); }\n    }\n  }\n  return dist[m - 1][n - 1];\n}",
    "sampleInput": "{\"heights\":[[1,2,2],[3,8,2],[5,3,5]]}",
    "humanInput": "heights = [[1,2,2],[3,8,2],[5,3,5]]",
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
    "patternHints": [
      "Bellman-Ford k+1",
      "Relax edges"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, flights, src, dst, k } = input;\n  let dist = Array(n).fill(Infinity);\n  dist[src] = 0;\n  for (let i = 0; i <= k; i++) {\n    const nd = dist.slice();\n    for (const [u, v, w] of flights) if (dist[u] + w < nd[v]) nd[v] = dist[u] + w;\n    dist = nd;\n  }\n  return dist[dst] === Infinity ? -1 : dist[dst];\n}",
    "sampleInput": "{\"n\":3,\"flights\":[[0,1,100],[1,2,100],[0,2,500]],\"src\":0,\"dst\":2,\"k\":1}",
    "humanInput": "n = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1",
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
    "patternHints": [
      "Prim or Kruskal",
      "Manhattan edges"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const pts = input.points;\n  const n = pts.length;\n  const dist = (i, j) => Math.abs(pts[i][0] - pts[j][0]) + Math.abs(pts[i][1] - pts[j][1]);\n  const inMST = Array(n).fill(false);\n  const minD = Array(n).fill(Infinity);\n  minD[0] = 0;\n  let cost = 0;\n  for (let t = 0; t < n; t++) {\n    let u = -1;\n    for (let i = 0; i < n; i++) if (!inMST[i] && (u === -1 || minD[i] < minD[u])) u = i;\n    inMST[u] = true; cost += minD[u];\n    for (let v = 0; v < n; v++) if (!inMST[v]) minD[v] = Math.min(minD[v], dist(u, v));\n  }\n  return cost;\n}",
    "sampleInput": "{\"points\":[[0,0],[2,2],[3,10],[5,2],[7,0]]}",
    "humanInput": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
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
    "difficulty": "medium",
    "statement": "Find critical and pseudo-critical edges in MST.",
    "patternHints": [
      "Kruskal with special edges",
      "Compare MST weight"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, edges } = input;\n  const kruskal = (filter) => {\n    const parent = Array.from({ length: n }, (_, i) => i);\n    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n    let cost = 0, used = 0;\n    const es = edges.map((e, i) => [...e, i]).filter(filter).sort((a, b) => a[2] - b[2]);\n    for (const [u, v, w] of es) {\n      if (find(u) !== find(v)) { parent[find(u)] = find(v); cost += w; used++; }\n    }\n    return used === n - 1 ? cost : Infinity;\n  };\n  const base = kruskal(() => true);\n  const critical = [], pseudo = [];\n  for (let i = 0; i < edges.length; i++) {\n    if (kruskal((_, idx) => idx !== i) > base) critical.push(i);\n    else if (kruskal((_, idx) => idx === i || true) <= base) pseudo.push(i);\n  }\n  return [critical, pseudo];\n}",
    "sampleInput": "{\"n\":4,\"edges\":[[0,1,1],[1,2,1],[2,3,1],[0,3,1]]}",
    "humanInput": "n = 4\nedges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]",
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
    "patternHints": [
      "Kruskal union-find",
      "Sort edges"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, connections } = input;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));\n  let cost = 0, used = 0;\n  for (const [u, v, w] of connections.sort((a, b) => a[2] - b[2])) {\n    if (find(u) !== find(v)) { parent[find(u)] = find(v); cost += w; used++; }\n  }\n  return used === n - 1 ? cost : -1;\n}",
    "sampleInput": "{\"n\":3,\"connections\":[[1,2,5],[1,3,6],[2,3,1]]}",
    "humanInput": "n = 3\nconnections = [[1,2,5],[1,3,6],[2,3,1]]",
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
    "patternHints": [
      "Floyd or reachability",
      "DFS memo"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { numCourses, prerequisites, queries } = input;\n  const reach = Array.from({ length: numCourses }, () => Array(numCourses).fill(false));\n  for (let i = 0; i < numCourses; i++) reach[i][i] = true;\n  for (const [a, b] of prerequisites) reach[b][a] = true;\n  for (let k = 0; k < numCourses; k++) for (let i = 0; i < numCourses; i++) for (let j = 0; j < numCourses; j++) reach[i][j] ||= reach[i][k] && reach[k][j];\n  return queries.map(([u, v]) => reach[u][v]);\n}",
    "sampleInput": "{\"numCourses\":2,\"prerequisites\":[[1,0]],\"queries\":[[0,1],[1,0]]}",
    "humanInput": "numCourses = 2\nprerequisites = [[1,0]]\nqueries = [[0,1],[1,0]]",
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
    "patternHints": [
      "Floyd distances",
      "Count neighbors"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, edges, distanceThreshold } = input;\n  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));\n  for (let i = 0; i < n; i++) dist[i][i] = 0;\n  for (const [u, v, w] of edges) { dist[u][v] = w; dist[v][u] = w; }\n  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n  let bestCity = -1, bestCount = Infinity;\n  for (let i = 0; i < n; i++) {\n    const c = dist[i].filter((d) => d <= distanceThreshold).length - 1;\n    if (c <= bestCount) { bestCount = c; bestCity = i; }\n  }\n  return bestCity;\n}",
    "sampleInput": "{\"n\":4,\"edges\":[[0,1,3],[1,2,1],[2,3,4],[0,3,5]],\"distanceThreshold\":4}",
    "humanInput": "n = 4\nedges = [[0,1,3],[1,2,1],[2,3,4],[0,3,5]]\ndistanceThreshold = 4",
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
    "patternHints": [
      "Dijkstra + count paths",
      "Same shortest dist"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, roads, time } = input;\n  const mod = 1e9 + 7;\n  const adj = Array.from({ length: n }, () => []);\n  for (const [u, v, w] of roads) { adj[u].push([v, w]); adj[v].push([u, w]); }\n  const dist = Array(n).fill(Infinity), ways = Array(n).fill(0);\n  dist[0] = 0; ways[0] = 1;\n  const pq = [[0, 0]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (d > dist[u]) continue;\n    for (const [v, w] of adj[u]) {\n      const nd = d + w;\n      if (nd < dist[v]) { dist[v] = nd; ways[v] = ways[u]; pq.push([nd, v]); }\n      else if (nd === dist[v]) ways[v] = (ways[v] + ways[u]) % mod;\n    }\n  }\n  return dist[n - 1] === time ? ways[n - 1] : 0;\n}",
    "sampleInput": "{\"n\":7,\"roads\":[[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]],\"time\":7}",
    "humanInput": "n = 7\nroads = [[0,6,7],[0,1,2],[1,2,3],[2,3,3],[3,4,2],[4,5,2],[5,6,3]]\ntime = 7",
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
    "patternHints": [
      "Sort by end",
      "Greedy keep"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const intervals = input.intervals.slice().sort((a, b) => a[1] - b[1]);\n  let end = -Infinity, removed = 0;\n  for (const [s, e] of intervals) {\n    if (s >= end) end = e;\n    else removed++;\n  }\n  return removed;\n}",
    "sampleInput": "{\"intervals\":[[1,2],[2,3],[3,4],[1,3]]}",
    "humanInput": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
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
    "patternHints": [
      "Sort events",
      "Sweep line"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.arrivals.slice().sort((x, y) => x - y);\n  const d = input.departures.slice().sort((x, y) => x - y);\n  let platforms = 0, maxP = 0, i = 0, j = 0;\n  while (i < a.length) {\n    if (a[i] <= d[j]) { platforms++; i++; } else { platforms--; j++; }\n    maxP = Math.max(maxP, platforms);\n  }\n  return maxP;\n}",
    "sampleInput": "{\"arrivals\":[900,940,950],\"departures\":[910,1200,1120]}",
    "humanInput": "arrivals = [900,940,950]\ndepartures = [910,1200,1120]",
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
    "patternHints": [
      "Sort abs values",
      "Flip smallest"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const a = input.nums.slice().sort((x, y) => x - y);\n  let k = input.k;\n  for (let i = 0; i < a.length && k; i++) if (a[i] < 0) { a[i] = -a[i]; k--; }\n  if (k % 2) a.sort((x, y) => x - y), a[0] = -a[0];\n  return a.reduce((s, x) => s + x, 0);\n}",
    "sampleInput": "{\"nums\":[4,2,3],\"k\":1}",
    "humanInput": "nums = [4,2,3]\nk = 1",
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
    "patternHints": [
      "Sort both",
      "Match order"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const mice = input.mice.slice().sort((a, b) => a - b);\n  const holes = input.holes.slice().sort((a, b) => a - b);\n  let maxT = 0;\n  for (let i = 0; i < mice.length; i++) maxT = Math.max(maxT, Math.abs(mice[i] - holes[i]));\n  return maxT;\n}",
    "sampleInput": "{\"mice\":[1,4],\"holes\":[4,-4,2],\"k\":2}",
    "humanInput": "mice = [1,4]\nholes = [4,-4,2]\nk = 2",
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
    "patternHints": [
      "Sort top values",
      "Check two negatives"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const a = nums.slice().sort((x, y) => x - y);\n  const n = a.length;\n  return Math.max(a[n - 1] * a[n - 2] * a[n - 3], a[0] * a[1] * a[n - 1]);\n}",
    "sampleInput": "{\"nums\":[1,2,3,4]}",
    "humanInput": "nums = [1,2,3,4]",
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
    "patternHints": [
      "Only perfect squares on",
      "Count sqrt(n)"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  return Math.floor(Math.sqrt(n));\n}",
    "sampleInput": "{\"n\":3}",
    "humanInput": "n = 3",
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
    "difficulty": "medium",
    "statement": "Distribute candies to children with ratings.",
    "patternHints": [
      "Two passes",
      "Local then global"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const ratings = nums;\n  const candies = Array(ratings.length).fill(1);\n  for (let i = 1; i < ratings.length; i++) if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n  for (let i = ratings.length - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n  return candies.reduce((a, b) => a + b, 0);\n}",
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
    "patternHints": [
      "Find max suffix",
      "Swap first smaller"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const s = String(n).split('');\n  const last = Array(10).fill(-1);\n  for (let i = 0; i < s.length; i++) last[+s[i]] = i;\n  for (let i = 0; i < s.length; i++) {\n    for (let d = 9; d > +s[i]; d--) if (last[d] > i) { [s[i], s[last[d]]] = [s[last[d]], s[i]]; return +s.join(''); }\n  }\n  return n;\n}",
    "sampleInput": "{\"n\":2736}",
    "humanInput": "n = 2736",
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
    "patternHints": [
      "Fibonacci DP",
      "Sum last two"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  let a = 1, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}",
    "sampleInput": "{\"n\":3}",
    "humanInput": "n = 3",
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
    "patternHints": [
      "DP prev counts",
      "Handle 0 and 10-26"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s;\n  let a = 0, b = 1;\n  for (let i = 0; i < s.length; i++) {\n    let c = 0;\n    if (s[i] !== '0') c += b;\n    if (i && s.slice(i - 1, i + 1) >= '10' && s.slice(i - 1, i + 1) <= '26') c += a;\n    [a, b] = [b, c];\n  }\n  return b;\n}",
    "sampleInput": "{\"s\":\"12\"}",
    "humanInput": "s = \"12\"",
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
    "difficulty": "medium",
    "statement": "Frog jump: can cross stones?",
    "patternHints": [
      "DFS reachable jumps",
      "Set positions"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const stones = input.stones;\n  const set = new Set(stones);\n  const target = stones[stones.length - 1];\n  const seen = new Set(['0,1']);\n  const dfs = (pos, jump) => {\n    if (pos === target) return true;\n    const key = pos + ',' + jump;\n    if (seen.has(key)) return false;\n    seen.add(key);\n    for (const nj of [jump - 1, jump, jump + 1]) {\n      if (nj > 0 && set.has(pos + nj) && dfs(pos + nj, nj)) return true;\n    }\n    return false;\n  };\n  return dfs(0, 1);\n}",
    "sampleInput": "{\"stones\":[0,1,3,5,6,8,12,17,21,22,26,34]}",
    "humanInput": "stones = [0,1,3,5,6,8,12,17,21,22,26,34]",
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
    "patternHints": [
      "DP min coins",
      "Iterate coins"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { coins, amount } = input;\n  const dp = Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let a = 1; a <= amount; a++) for (const c of coins) if (a >= c) dp[a] = Math.min(dp[a], dp[a - c] + 1);\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
    "sampleInput": "{\"coins\":[1,2,5],\"amount\":11}",
    "humanInput": "coins = [1,2,5]\namount = 11",
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
    "patternHints": [
      "BFS states",
      "Track forbidden"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { forbidden, a, b, x } = input;\n  const ban = new Set(forbidden);\n  const q = [[0, 1, 0]], seen = new Set(['0,1']);\n  while (q.length) {\n    const [pos, dir, jumps] = q.shift();\n    if (pos === x) return jumps;\n    const next = pos + (dir === 1 ? a : -b);\n    const nd = dir === 1 ? -1 : 1;\n    const nn = pos + (nd === 1 ? a : -b);\n    for (const [np, ndir] of [[next, dir], [nn, nd]]) {\n      const key = np + ',' + ndir;\n      if (np >= 0 && !ban.has(np) && !seen.has(key)) { seen.add(key); q.push([np, ndir, jumps + 1]); }\n    }\n  }\n  return -1;\n}",
    "sampleInput": "{\"forbidden\":[14,4,18,1,15],\"a\":11,\"b\":4,\"x\":11}",
    "humanInput": "forbidden = [14,4,18,1,15]\na = 11\nb = 4\nx = 11",
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
    "patternHints": [
      "Track min price",
      "Max profit"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let minP = Infinity, best = 0;\n  for (const p of nums) { minP = Math.min(minP, p); best = Math.max(best, p - minP); }\n  return best;\n}",
    "sampleInput": "{\"nums\":[7,1,5,3,6,4]}",
    "humanInput": "nums = [7,1,5,3,6,4]",
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
    "patternHints": [
      "Greedy rises",
      "Sum positive diffs"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let profit = 0;\n  for (let i = 1; i < nums.length; i++) if (nums[i] > nums[i - 1]) profit += nums[i] - nums[i - 1];\n  return profit;\n}",
    "sampleInput": "{\"nums\":[7,1,5,3,6,4]}",
    "humanInput": "nums = [7,1,5,3,6,4]",
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
    "difficulty": "medium",
    "statement": "Max profit with at most two transactions.",
    "patternHints": [
      "DP buy/sell x2",
      "Track states"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let buy1 = Infinity, sell1 = 0, buy2 = Infinity, sell2 = 0;\n  for (const p of nums) {\n    buy1 = Math.min(buy1, p);\n    sell1 = Math.max(sell1, p - buy1);\n    buy2 = Math.min(buy2, p - sell1);\n    sell2 = Math.max(sell2, p - buy2);\n  }\n  return sell2;\n}",
    "sampleInput": "{\"nums\":[3,3,5,0,0,3,1,4]}",
    "humanInput": "nums = [3,3,5,0,0,3,1,4]",
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
    "difficulty": "medium",
    "statement": "Max profit with at most k transactions.",
    "patternHints": [
      "DP day x k",
      "Buy/sell states"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { k, nums } = input;\n  if (k >= nums.length / 2) {\n    let p = 0;\n    for (let i = 1; i < nums.length; i++) if (nums[i] > nums[i - 1]) p += nums[i] - nums[i - 1];\n    return p;\n  }\n  const buy = Array(k + 1).fill(-Infinity), sell = Array(k + 1).fill(0);\n  for (const p of nums) {\n    for (let t = k; t >= 1; t--) {\n      sell[t] = Math.max(sell[t], buy[t] + p);\n      buy[t] = Math.max(buy[t], sell[t - 1] - p);\n    }\n  }\n  return sell[k];\n}",
    "sampleInput": "{\"k\":2,\"nums\":[2,4,1]}",
    "humanInput": "k = 2\nnums = [2,4,1]",
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
    "patternHints": [
      "DP hold/sold/cool",
      "State machine"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let hold = -nums[0], sold = 0, cool = 0;\n  for (let i = 1; i < nums.length; i++) {\n    const prevHold = hold, prevSold = sold, prevCool = cool;\n    hold = Math.max(prevHold, prevCool - nums[i]);\n    sold = prevHold + nums[i];\n    cool = Math.max(prevCool, prevSold);\n  }\n  return Math.max(sold, cool);\n}",
    "sampleInput": "{\"nums\":[1,2,3,0,2]}",
    "humanInput": "nums = [1,2,3,0,2]",
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
    "patternHints": [
      "DP cash/hold",
      "Pay fee on sell"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { prices, fee } = input;\n  let cash = 0, hold = -prices[0];\n  for (let i = 1; i < prices.length; i++) {\n    cash = Math.max(cash, hold + prices[i] - fee);\n    hold = Math.max(hold, cash - prices[i]);\n  }\n  return cash;\n}",
    "sampleInput": "{\"prices\":[1,3,2,8,4,9],\"fee\":2}",
    "humanInput": "prices = [1,3,2,8,4,9]\nfee = 2",
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
    "patternHints": [
      "0/1 knapsack",
      "Subset sum DP"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const sum = nums.reduce((a, b) => a + b, 0);\n  if (sum % 2) return false;\n  const target = sum / 2;\n  const dp = Array(target + 1).fill(false);\n  dp[0] = true;\n  for (const x of nums) for (let t = target; t >= x; t--) dp[t] ||= dp[t - x];\n  return dp[target];\n}",
    "sampleInput": "{\"nums\":[1,5,11,5]}",
    "humanInput": "nums = [1,5,11,5]",
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
    "patternHints": [
      "0/1 knapsack 2D",
      "DP count"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { m, n, strs } = input;\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (const s of strs) {\n    const z = [...s].filter((c) => c === '0').length, o = s.length - z;\n    for (let i = m; i >= z; i--) for (let j = n; j >= o; j--) dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);\n  }\n  return dp[m][n];\n}",
    "sampleInput": "{\"m\":1,\"n\":1,\"strs\":[\"10\",\"0011\",\"1\",\"0\"]}",
    "humanInput": "m = 1\nn = 1\nstrs = [\"10\",\"0011\",\"1\",\"0\"]",
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
    "patternHints": [
      "Unbounded knapsack",
      "DP ways"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { coins, amount } = input;\n  const dp = Array(amount + 1).fill(0);\n  dp[0] = 1;\n  for (const c of coins) for (let a = c; a <= amount; a++) dp[a] += dp[a - c];\n  return dp[amount];\n}",
    "sampleInput": "{\"coins\":[1,2,5],\"amount\":5}",
    "humanInput": "coins = [1,2,5]\namount = 5",
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
    "patternHints": [
      "Partition minimize diff",
      "Subset sum"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const sum = input.stones.reduce((a, b) => a + b, 0);\n  const dp = Array(Math.floor(sum / 2) + 1).fill(false);\n  dp[0] = true;\n  for (const x of input.stones) for (let t = dp.length - 1; t >= x; t--) dp[t] ||= dp[t - x];\n  let best = 0;\n  for (let t = dp.length - 1; t >= 0; t--) if (dp[t]) { best = t; break; }\n  return sum - 2 * best;\n}",
    "sampleInput": "{\"stones\":[2,7,4,1,8,1]}",
    "humanInput": "stones = [2,7,4,1,8,1]",
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
    "patternHints": [
      "2D DP",
      "Match chars"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { text1, text2 } = input;\n  const dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0));\n  for (let i = 1; i <= text1.length; i++) for (let j = 1; j <= text2.length; j++)\n    dp[i][j] = text1[i - 1] === text2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return dp[text1.length][text2.length];\n}",
    "sampleInput": "{\"text1\":\"abcde\",\"text2\":\"ace\"}",
    "humanInput": "text1 = \"abcde\"\ntext2 = \"ace\"",
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
    "patternHints": [
      "DP insert/delete/replace",
      "2D table"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { word1, word2 } = input;\n  const dp = Array.from({ length: word1.length + 1 }, (_, i) => Array(word2.length + 1).fill(0).map((_, j) => (i ? i : j)));\n  for (let i = 1; i <= word1.length; i++) for (let j = 1; j <= word2.length; j++)\n    dp[i][j] = word1[i - 1] === word2[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n  return dp[word1.length][word2.length];\n}",
    "sampleInput": "{\"word1\":\"horse\",\"word2\":\"ros\"}",
    "humanInput": "word1 = \"horse\"\nword2 = \"ros\"",
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
    "patternHints": [
      "DP on intervals",
      "Match ends"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s;\n  const dp = Array.from({ length: s.length }, () => Array(s.length).fill(0));\n  for (let i = s.length - 1; i >= 0; i--) {\n    dp[i][i] = 1;\n    for (let j = i + 1; j < s.length; j++)\n      dp[i][j] = s[i] === s[j] ? 2 + (dp[i + 1][j - 1] || 0) : Math.max(dp[i + 1][j], dp[i][j - 1]);\n  }\n  return dp[0][s.length - 1];\n}",
    "sampleInput": "{\"s\":\"bbbab\"}",
    "humanInput": "s = \"bbbab\"",
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
    "difficulty": "medium",
    "statement": "Minimum insertions to make string palindrome.",
    "patternHints": [
      "n - LPS",
      "Complement LCS"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s;\n  const rev = s.split('').reverse().join('');\n  const dp = Array(s.length + 1).fill(0).map(() => Array(s.length + 1).fill(0));\n  for (let i = 1; i <= s.length; i++) for (let j = 1; j <= s.length; j++)\n    dp[i][j] = s[i - 1] === rev[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return s.length - dp[s.length][s.length];\n}",
    "sampleInput": "{\"s\":\"zzazz\"}",
    "humanInput": "s = \"zzazz\"",
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
    "patternHints": [
      "Patience sorting",
      "Binary search"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }\n    tails[lo] = x;\n  }\n  return tails.length;\n}",
    "sampleInput": "{\"nums\":[10,9,2,5,3,7,101,18]}",
    "humanInput": "nums = [10,9,2,5,3,7,101,18]",
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
    "patternHints": [
      "Sort + DP chain",
      "Prev pointer"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  nums.sort((a, b) => a - b);\n  const dp = Array(nums.length).fill(1);\n  for (let i = 0; i < nums.length; i++) for (let j = 0; j < i; j++) if (nums[i] % nums[j] === 0) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(...dp);\n}",
    "sampleInput": "{\"nums\":[1,2,3]}",
    "humanInput": "nums = [1,2,3]",
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
    "patternHints": [
      "Sort by length",
      "DP predecessor"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const words = input.words.slice().sort((a, b) => a.length - b.length);\n  const dp = Array(words.length).fill(1);\n  const pred = (a, b) => {\n    if (a.length + 1 !== b.length) return false;\n    let i = 0, j = 0, diff = 0;\n    while (i < a.length && j < b.length) {\n      if (a[i] === b[j]) { i++; j++; }\n      else { diff++; j++; if (diff > 1) return false; }\n    }\n    return true;\n  };\n  for (let i = 0; i < words.length; i++) for (let j = 0; j < i; j++) if (pred(words[j], words[i])) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(...dp);\n}",
    "sampleInput": "{\"words\":[\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]}",
    "humanInput": "words = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]",
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
    "difficulty": "medium",
    "statement": "Minimum cost to cut a stick.",
    "patternHints": [
      "Interval DP",
      "Try cut positions"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const cuts = [0, ...input.cuts.slice().sort((a, b) => a - b), input.n];\n  const m = cuts.length;\n  const dp = Array.from({ length: m }, () => Array(m).fill(0));\n  for (let len = 2; len < m; len++) for (let i = 0; i + len < m; i++) {\n    const j = i + len;\n    dp[i][j] = Infinity;\n    for (let k = i + 1; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + cuts[j] - cuts[i]);\n  }\n  return dp[0][m - 1];\n}",
    "sampleInput": "{\"n\":7,\"cuts\":[1,3,4,5]}",
    "humanInput": "n = 7\ncuts = [1,3,4,5]",
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
    "difficulty": "medium",
    "statement": "Burst balloons for maximum coins.",
    "patternHints": [
      "Interval DP",
      "Pick last burst"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const a = [1, ...nums, 1];\n  const dp = Array.from({ length: a.length }, () => Array(a.length).fill(0));\n  for (let len = 3; len <= a.length; len++) for (let i = 0; i + len - 1 < a.length; i++) {\n    const j = i + len - 1;\n    for (let k = i + 1; k < j; k++) dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + a[i] * a[k] * a[j]);\n  }\n  return dp[0][a.length - 1];\n}",
    "sampleInput": "{\"nums\":[3,1,5,8]}",
    "humanInput": "nums = [3,1,5,8]",
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
    "difficulty": "medium",
    "statement": "Evaluate boolean expression with &, |, !.",
    "patternHints": [
      "Recursion or stack",
      "Parse parentheses"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.expression;\n  let i = 0;\n  const parse = () => {\n    if (s[i] === 't' || s[i] === 'f') return s[i++] === 't';\n    if (s[i] === '!') { i += 2; return !parse(); }\n    const op = s[i++]; i++;\n    const vals = [];\n    while (s[i] !== ')') { if (s[i] === ',') i++; else vals.push(parse()); }\n    i++;\n    return op === '&' ? vals.every(Boolean) : vals.some(Boolean);\n  };\n  return parse();\n}",
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
    "difficulty": "medium",
    "statement": "Minimum cuts for palindrome partitioning.",
    "patternHints": [
      "DP cuts + palindrome",
      "Check substrings"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s, n = s.length;\n  const isPal = Array.from({ length: n }, () => Array(n).fill(false));\n  for (let i = n - 1; i >= 0; i--) for (let j = i; j < n; j++) isPal[i][j] = s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1]);\n  const dp = Array(n).fill(Infinity);\n  for (let i = 0; i < n; i++) {\n    if (isPal[0][i]) dp[i] = 0;\n    else for (let j = 1; j <= i; j++) if (isPal[j][i]) dp[i] = Math.min(dp[i], dp[j - 1] + 1);\n  }\n  return dp[n - 1];\n}",
    "sampleInput": "{\"s\":\"aab\"}",
    "humanInput": "s = \"aab\"",
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
    "difficulty": "medium",
    "statement": "Shortest path visiting all nodes in graph.",
    "patternHints": [
      "BFS bitmask state",
      "All nodes visited"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const graph = input.graph, n = graph.length, all = (1 << n) - 1;\n  const q = [];\n  for (let i = 0; i < n; i++) q.push([i, 1 << i, 0]);\n  const seen = new Set(q.map(([n, m]) => n + ',' + m));\n  while (q.length) {\n    const [node, mask, dist] = q.shift();\n    if (mask === all) return dist;\n    for (const nxt of graph[node]) {\n      const nm = mask | (1 << nxt), key = nxt + ',' + nm;\n      if (!seen.has(key)) { seen.add(key); q.push([nxt, nm, dist + 1]); }\n    }\n  }\n  return 0;\n}",
    "sampleInput": "{\"graph\":[[1,2],[0,2],[0,1]]}",
    "humanInput": "graph = [[1,2],[0,2],[0,1]]",
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
    "difficulty": "easy",
    "statement": "Count unique paths in m x n grid.",
    "patternHints": [
      "DP combinatorics",
      "paths[i][j]"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { m, n } = input;\n  const dp = Array.from({ length: m }, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[m - 1][n - 1];\n}",
    "sampleInput": "{\"m\":3,\"n\":7}",
    "humanInput": "m = 3\nn = 7",
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
    "patternHints": [
      "DP skip obstacles",
      "Grid traversal"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const g = input.obstacleGrid;\n  const m = g.length, n = g[0].length;\n  if (g[0][0] || g[m - 1][n - 1]) return 0;\n  const dp = Array.from({ length: m }, () => Array(n).fill(0));\n  dp[0][0] = 1;\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {\n    if (g[i][j]) dp[i][j] = 0;\n    else { if (i) dp[i][j] += dp[i - 1][j]; if (j) dp[i][j] += dp[i][j - 1]; }\n  }\n  return dp[m - 1][n - 1];\n}",
    "sampleInput": "{\"obstacleGrid\":[[0,0,0],[0,1,0],[0,0,0]]}",
    "humanInput": "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
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
    "patternHints": [
      "DP accumulate",
      "Min from top/left"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const grid = input.grid;\n  const m = grid.length, n = grid[0].length;\n  for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];\n  for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);\n  return grid[m - 1][n - 1];\n}",
    "sampleInput": "{\"grid\":[[1,3,1],[1,5,1],[4,2,1]]}",
    "humanInput": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
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
    "difficulty": "medium",
    "statement": "Maximum envelopes Russian doll nesting.",
    "patternHints": [
      "Sort w asc h desc",
      "LIS on heights"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const env = input.envelopes.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]);\n  const tails = [];\n  for (const [, h] of env) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < h) lo = m + 1; else hi = m; }\n    tails[lo] = h;\n  }\n  return tails.length;\n}",
    "sampleInput": "{\"envelopes\":[[5,4],[6,4],[6,7],[2,3]]}",
    "humanInput": "envelopes = [[5,4],[6,4],[6,7],[2,3]]",
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
    "patternHints": [
      "Euclid reduce",
      "Same as #6"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const g = (a, b) => (b ? g(b, a % b) : a);\n  return nums.reduce((a, b) => g(a, b));\n}",
    "sampleInput": "{\"nums\":[12,18,24]}",
    "humanInput": "nums = [12,18,24]",
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
    "patternHints": [
      "Digit divides n",
      "Filter range"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { left, right } = input;\n  const ok = (n) => { for (const ch of String(n)) { const d = +ch; if (!d || n % d) return false; } return true; };\n  const out = [];\n  for (let i = left; i <= right; i++) if (ok(i)) out.push(i);\n  return out;\n}",
    "sampleInput": "{\"left\":1,\"right\":22}",
    "humanInput": "left = 1\nright = 22",
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
    "patternHints": [
      "Frequency map",
      "n choose 2"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const cnt = new Map();\n  let pairs = 0;\n  for (const x of nums) {\n    const c = cnt.get(x) || 0;\n    pairs += c;\n    cnt.set(x, c + 1);\n  }\n  return pairs;\n}",
    "sampleInput": "{\"nums\":[1,2,3,1,1,3]}",
    "humanInput": "nums = [1,2,3,1,1,3]",
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
    "patternHints": [
      "Factor scan",
      "Sum divisors"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  const f4 = (x) => {\n    const divs = [];\n    for (let d = 1; d * d <= x; d++) {\n      if (x % d === 0) { divs.push(d); if (d * d !== x) divs.push(x / d); }\n    }\n    return divs.length === 4 ? divs.reduce((a, b) => a + b, 0) : 0;\n  };\n  return nums.reduce((s, x) => s + f4(x), 0);\n}",
    "sampleInput": "{\"nums\":[21,4,7]}",
    "humanInput": "nums = [21,4,7]",
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
    "patternHints": [
      "Zeller or anchor",
      "Mod 7"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n  const d = new Date(input.year, input.month - 1, input.day);\n  return days[d.getDay()];\n}",
    "sampleInput": "{\"day\":31,\"month\":8,\"year\":2019}",
    "humanInput": "day = 31\nmonth = 8\nyear = 2019",
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
    "patternHints": [
      "Parse digits",
      "Product - sum"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const s = String(n);\n  let prod = 1, sum = 0;\n  for (const ch of s) { const d = +ch; prod *= d; sum += d; }\n  return prod - sum;\n}",
    "sampleInput": "{\"n\":234}",
    "humanInput": "n = 234",
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
    "patternHints": [
      "n-1 matches",
      "Elimination"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  return n - 1;\n}",
    "sampleInput": "{\"n\":7}",
    "humanInput": "n = 7",
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
    "patternHints": [
      "Track current streak",
      "Reset on 0"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let best = 0, cur = 0;\n  for (const x of nums) { if (x) { cur++; best = Math.max(best, cur); } else cur = 0; }\n  return best;\n}",
    "sampleInput": "{\"nums\":[1,1,0,1,1,1]}",
    "humanInput": "nums = [1,1,0,1,1,1]",
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
    "patternHints": [
      "Interval overlap",
      "Both axes"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const [x1, y1, x2, y2] = input.rec1, [x3, y3, x4, y4] = input.rec2;\n  return !(x2 <= x3 || x4 <= x1 || y2 <= y3 || y4 <= y1);\n}",
    "sampleInput": "{\"rec1\":[0,0,2,2],\"rec2\":[1,1,3,3]}",
    "humanInput": "rec1 = [0,0,2,2]\nrec2 = [1,1,3,3]",
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
    "patternHints": [
      "Base-26",
      "Accumulate"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  let n = 0;\n  for (const ch of input.s) n = n * 26 + (ch.charCodeAt(0) - 64);\n  return n;\n}",
    "sampleInput": "{\"s\":\"AB\"}",
    "humanInput": "s = \"AB\"",
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
    "difficulty": "easy",
    "statement": "Count unique paths in grid (duplicate of 182).",
    "patternHints": [
      "Combinatorics DP",
      "Right and down"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { m, n } = input;\n  const dp = Array.from({ length: m }, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[m - 1][n - 1];\n}",
    "sampleInput": "{\"m\":3,\"n\":2}",
    "humanInput": "m = 3\nn = 2",
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
    "patternHints": [
      "Union area formula",
      "Overlap subtract"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const area = (x1, y1, x2, y2) => Math.max(0, x2 - x1) * Math.max(0, y2 - y1);\n  const { ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 } = input;\n  const a = area(ax1, ay1, ax2, ay2) + area(bx1, by1, bx2, by2);\n  const ox = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n  const oy = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n  return a - ox * oy;\n}",
    "sampleInput": "{\"ax1\":-3,\"ay1\":0,\"ax2\":3,\"ay2\":4,\"bx1\":0,\"by1\":-1,\"bx2\":9,\"by2\":2}",
    "humanInput": "ax1 = -3\nay1 = 0\nax2 = 3\nay2 = 4\nbx1 = 0\nby1 = -1\nbx2 = 9\nby2 = 2",
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
    "patternHints": [
      "Count mod k",
      "Complement pairs"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { nums, k } = input;\n  const cnt = Array(k).fill(0);\n  for (const x of nums) cnt[x % k]++;\n  if (cnt[0] % 2) return false;\n  for (let r = 1; r < k; r++) if (cnt[r] !== cnt[k - r]) return false;\n  return true;\n}",
    "sampleInput": "{\"nums\":[1,2,3,4,5,10,6,7,8,9],\"k\":5}",
    "humanInput": "nums = [1,2,3,4,5,10,6,7,8,9]\nk = 5",
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
    "difficulty": "easy",
    "statement": "Count trailing zeroes in n factorial.",
    "patternHints": [
      "Count factors of 5",
      "Divide by 5"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  let c = 0;\n  for (let p = 5; p <= n; p *= 5) c += Math.floor(n / p);\n  return c;\n}",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
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
    "difficulty": "medium",
    "statement": "Find nth magical number (divisible by a or b).",
    "patternHints": [
      "Binary search",
      "Count divisible"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, a, b } = input;\n  const g = (x, y) => (y ? g(y, x % y) : x);\n  const lcm = (a * b) / g(a, b);\n  const count = (x) => Math.floor(x / a) + Math.floor(x / b) - Math.floor(x / lcm);\n  let lo = 1, hi = 1e15;\n  while (lo < hi) { const m = (lo + hi) >> 1; if (count(m) < n) lo = m + 1; else hi = m; }\n  return lo % (1e9 + 7);\n}",
    "sampleInput": "{\"n\":1,\"a\":2,\"b\":3}",
    "humanInput": "n = 1\na = 2\nb = 3",
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
    "difficulty": "medium",
    "statement": "Find kth permutation sequence of 1..n.",
    "patternHints": [
      "Factorial system",
      "Build string"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const { n, k } = input;\n  const nums = Array.from({ length: n }, (_, i) => i + 1);\n  const fact = [1];\n  for (let i = 1; i < n; i++) fact[i] = fact[i - 1] * i;\n  let ki = k - 1, out = '';\n  for (let i = n; i > 0; i--) {\n    const idx = Math.floor(ki / fact[i - 1]);\n    out += nums.splice(idx, 1)[0];\n    ki %= fact[i - 1];\n  }\n  return out;\n}",
    "sampleInput": "{\"n\":3,\"k\":3}",
    "humanInput": "n = 3\nk = 3",
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
    "patternHints": [
      "XOR all",
      "Pairs cancel"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  return nums.reduce((a, b) => a ^ b, 0);\n}",
    "sampleInput": "{\"nums\":[4,1,2,1,2]}",
    "humanInput": "nums = [4,1,2,1,2]",
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
    "patternHints": [
      "Shift and OR",
      "32 iterations"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  let n = input.n >>> 0, res = 0;\n  for (let i = 0; i < 32; i++) { res = (res << 1) | (n & 1); n >>= 1; }\n  return res >>> 0;\n}",
    "sampleInput": "{\"n\":43261596}",
    "humanInput": "n = 43261596",
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
    "patternHints": [
      "Bit count mod 3",
      "Or ones/twos"
    ],
    "starterCode": "function solve(nums) {\n  // TODO\n}",
    "solutionCode": "function solve(nums) {\n  let ones = 0, twos = 0;\n  for (const x of nums) {\n    ones = (ones ^ x) & ~twos;\n    twos = (twos ^ x) & ~ones;\n  }\n  return ones;\n}",
    "sampleInput": "{\"nums\":[2,2,3,2]}",
    "humanInput": "nums = [2,2,3,2]",
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
    "patternHints": [
      "n & n-1",
      "Or shift"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  let c = 0;\n  while (n) { n &= n - 1; c++; }\n  return c;\n}",
    "sampleInput": "{\"n\":11}",
    "humanInput": "n = 11",
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
    "difficulty": "easy",
    "statement": "Trailing zeroes in n factorial.",
    "patternHints": [
      "Count fives",
      "Same as 199"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  let c = 0;\n  for (let p = 5; p <= n; p *= 5) c += Math.floor(n / p);\n  return c;\n}",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
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
    "patternHints": [
      "XOR shift",
      "Power of two check"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const x = n ^ (n >> 1);\n  return x > 0 && (x & (x + 1)) === 0;\n}",
    "sampleInput": "{\"n\":5}",
    "humanInput": "n = 5",
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
    "patternHints": [
      "DP bit patterns",
      "Or iterate"
    ],
    "starterCode": "function solve(n) {\n  // TODO\n}",
    "solutionCode": "function solve(n) {\n  const even = [1, 0], odd = [0, 1];\n  for (let i = 1; i <= n; i++) {\n    even.push((even[i] + odd[i]) % (1e9 + 7));\n    odd.push((even[i - 1] + odd[i - 1]) % (1e9 + 7));\n  }\n  return [even[n], odd[n]];\n}",
    "sampleInput": "{\"num\":5}",
    "humanInput": "num = 5",
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
    "patternHints": [
      "Built-in or KMP",
      "Substring search"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const i = input.haystack.indexOf(input.needle);\n  return i === -1 ? -1 : i;\n}",
    "sampleInput": "{\"haystack\":\"sadbutsad\",\"needle\":\"sad\"}",
    "humanInput": "haystack = \"sadbutsad\"\nneedle = \"sad\"",
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
    "patternHints": [
      "Rolling hash or set",
      "Slice substrings"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s, seen = new Set(), out = new Set();\n  for (let i = 0; i + 10 <= s.length; i++) {\n    const sub = s.slice(i, i + 10);\n    if (seen.has(sub)) out.add(sub);\n    else seen.add(sub);\n  }\n  return [...out];\n}",
    "sampleInput": "{\"s\":\"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"}",
    "humanInput": "s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"",
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
    "difficulty": "medium",
    "statement": "Longest duplicate substring in string.",
    "patternHints": [
      "Binary search length",
      "Hash seen substrings"
    ],
    "starterCode": "function solve(input) {\n  // TODO\n}",
    "solutionCode": "function solve(input) {\n  const s = input.s, n = s.length;\n  const find = (len) => {\n    const seen = new Set();\n    for (let i = 0; i + len <= n; i++) {\n      const sub = s.slice(i, i + len);\n      if (seen.has(sub)) return sub;\n      seen.add(sub);\n    }\n    return '';\n  };\n  let lo = 0, hi = n - 1, best = '';\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    const sub = find(mid);\n    if (sub) { best = sub; lo = mid + 1; } else hi = mid - 1;\n  }\n  return best;\n}",
    "sampleInput": "{\"s\":\"banana\"}",
    "humanInput": "s = \"banana\"",
    "sheetNumber": 211,
    "sheetSectionId": "miscellaneous",
    "sheetSubsectionId": "miscellaneous-rabin-karp-rolling-hash",
    "source": "sheet"
  }
];
