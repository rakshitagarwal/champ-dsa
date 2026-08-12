/** Phase 0 notes + Phases 1–4 practice questions (ChampDSA roadmap). */
export const PRACTICE_P0_TO_P4 = {
  // —— PHASE 0: NOTES ——
  "p0-complexity-time": {
    kind: "notes",
    notes:
      "Time complexity counts how operations grow with input size n. Focus on dominant term: O(n), O(n log n), O(n²). Nested loops usually multiply; sequential blocks add. Always state the worst case unless asked otherwise.",
  },
  "p0-complexity-space": {
    kind: "notes",
    notes:
      "Space complexity is extra memory beyond the input. Recursion depth counts as O(depth) stack space. In-place algorithms aim for O(1) extra (ignoring output). Clarify whether the answer array counts.",
  },
  "p0-complexity-big-o": {
    kind: "notes",
    notes:
      "Big-O = upper bound, Big-Omega = lower bound, Big-Theta = tight bound. Interviewers usually mean Big-O worst case. Prefer tight bounds when you know them (Θ(n) vs O(n²)).",
  },
  "p0-complexity-amortized": {
    kind: "notes",
    notes:
      "Amortized analysis spreads expensive rare ops over many cheap ones (e.g. dynamic array resize). Average cost per op can be O(1) even if one op is O(n).",
  },
  "p0-recursion-base": {
    kind: "notes",
    notes:
      "Every recursive function needs a base case that stops calling itself. Without it you get infinite recursion / stack overflow. Base cases are often empty input, n==0/1, or null node.",
  },
  "p0-recursion-case": {
    kind: "notes",
    notes:
      "The recursive case reduces the problem toward the base case (n−1, left/right half, smaller substring). Trust that the recursive call returns a correct answer for the smaller problem, then combine.",
  },
  "p0-recursion-stack": {
    kind: "notes",
    notes:
      "Each call pushes a frame (locals + return address). Deep recursion ≈ O(n) stack. Tail recursion is rarely optimized in JS — prefer iteration when depth is huge.",
  },
  "p0-recursion-param": {
    kind: "notes",
    notes:
      "Parameterized recursion passes running state as arguments (index, sum so far). Useful when you build answers while going down the call tree.",
  },
  "p0-recursion-func": {
    kind: "notes",
    notes:
      "Functional recursion returns a value and combines results on the way back (e.g. return left + right). Cleaner for tree/subproblem merges.",
  },
  "p0-recursion-multi": {
    kind: "notes",
    notes:
      "Multiple recursive calls (fibonacci, tree DFS) branch the call tree. Watch exponential blow-up — add memoization or convert to DP when overlapping subproblems appear.",
  },
  "p0-math-gcd": {
    kind: "notes",
    notes:
      "Euclidean GCD: gcd(a,b)=gcd(b,a%b). LCM(a,b)=|a*b|/gcd(a,b) (watch overflow). Used in fractions, cycles, and tiling problems.",
  },
  "p0-math-prime": {
    kind: "notes",
    notes:
      "Trial division up to √n checks primality. Factorization and prime checks show up in math-flavored interview warmups.",
  },
  "p0-math-sieve": {
    kind: "notes",
    notes:
      "Sieve of Eratosthenes marks multiples of each prime up to n in O(n log log n). Precompute primes when many queries share the same n.",
  },
  "p0-math-mod": {
    kind: "notes",
    notes:
      "Modular arithmetic: (a+b)%m, (a*b)%m with care for negatives in languages that differ. Fermat/modular inverse appear in combinatorics under prime moduli.",
  },
  "p0-math-pow": {
    kind: "notes",
    notes:
      "Binary exponentiation computes a^n in O(log n) by squaring. Same idea for modular pow and matrix exponentiation.",
  },
  "p0-math-combo": {
    kind: "notes",
    notes:
      "nCr, permutations, and Pascal identities underpin counting paths and DP transitions. Precompute factorials + inverse factorials for many queries mod p.",
  },

  // —— PHASE 1 ——
  "p1-array-traversal": {
    kind: "questions",
    questions: [
      {
        title: "Running Sum of 1d Array",
        url: "https://leetcode.com/problems/running-sum-of-1d-array/",
        source: "LeetCode",
        hint: "One pass left to right; keep a running total and write it into each index (or a new array).",
      },
      {
        title: "Remove Element",
        url: "https://leetcode.com/problems/remove-element/",
        source: "LeetCode",
        hint: "Use a write pointer to compact kept values during one in-place traversal.",
      },
    ],
  },
  "p1-array-inplace": {
    kind: "questions",
    questions: [
      {
        title: "Move Zeroes",
        url: "https://leetcode.com/problems/move-zeroes/",
        source: "LeetCode",
        hint: "Two pointers: write non-zeros forward, then fill the rest with zeros — no extra array.",
      },
      {
        title: "Remove Element",
        url: "https://leetcode.com/problems/remove-element/",
        source: "LeetCode",
        hint: "Use a write pointer to compact kept values during one in-place traversal.",
      },
    ],
  },
  "p1-array-freq": {
    kind: "questions",
    questions: [
      {
        title: "Majority Element",
        url: "https://leetcode.com/problems/majority-element/",
        source: "LeetCode",
        hint: "Boyer–Moore voting or a frequency map; majority appears more than ⌊n/2⌋ times.",
      },
      {
        title: "Find All Numbers Disappeared in an Array",
        url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
        source: "LeetCode",
        hint: "Use indices or counts to record which values occur.",
      },
    ],
  },
  "p1-array-minmax": {
    kind: "questions",
    questions: [
      {
        title: "Third Maximum Number",
        url: "https://leetcode.com/problems/third-maximum-number/",
        source: "LeetCode",
        hint: "Track top distinct values while scanning once; handle fewer than 3 distinct carefully.",
      },
      {
        title: "Maximum Product of Three Numbers",
        url: "https://leetcode.com/problems/maximum-product-of-three-numbers/",
        source: "LeetCode",
        hint: "Track the largest three and smallest two values while scanning.",
      },
    ],
  },
  "p1-array-rotation": {
    kind: "questions",
    questions: [
      {
        title: "Rotate Array",
        url: "https://leetcode.com/problems/rotate-array/",
        source: "LeetCode",
        hint: "Reverse whole array, then reverse first k and the rest (k %= n).",
      },
      {
        title: "Rotate List",
        url: "https://leetcode.com/problems/rotate-list/",
        source: "LeetCode",
        hint: "Normalize k and reconnect the tail so the rotation starts at the right split.",
      },
    ],
  },
  "p1-array-rearrange": {
    kind: "questions",
    questions: [
      {
        title: "Rearrange Array Elements by Sign",
        url: "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
        source: "LeetCode",
        hint: "Place positives on even indices and negatives on odd (or two-pointer write).",
      },
      {
        title: "Sort Array By Parity",
        url: "https://leetcode.com/problems/sort-array-by-parity/",
        source: "LeetCode",
        hint: "Partition values in place with pointers based on the required property.",
      },
    ],
  },
  "p1-array-matrix": {
    kind: "questions",
    questions: [
      {
        title: "Matrix Diagonal Sum",
        url: "https://leetcode.com/problems/matrix-diagonal-sum/",
        source: "LeetCode",
        hint: "Sum primary and secondary diagonals; if n is odd, subtract the center once.",
      },
      {
        title: "Toeplitz Matrix",
        url: "https://leetcode.com/problems/toeplitz-matrix/",
        source: "LeetCode",
        hint: "Traverse the matrix and compare each cell with its upper-left neighbor.",
      },
    ],
  },
  "p1-hash-map": {
    kind: "questions",
    questions: [
      {
        title: "Two Sum",
        url: "https://leetcode.com/problems/two-sum/",
        source: "LeetCode",
        hint: "Map value→index; for each num check if target−num was already seen.",
      },
      {
        title: "4Sum II",
        url: "https://leetcode.com/problems/4sum-ii/",
        source: "LeetCode",
        hint: "Hash pair sums and look up their negated complements.",
      },
    ],
  },
  "p1-hash-set": {
    kind: "questions",
    questions: [
      {
        title: "Contains Duplicate",
        url: "https://leetcode.com/problems/contains-duplicate/",
        source: "LeetCode",
        hint: "Insert into a HashSet; if insert fails, a duplicate exists.",
      },
      {
        title: "Longest Consecutive Sequence",
        url: "https://leetcode.com/problems/longest-consecutive-sequence/",
        source: "LeetCode",
        hint: "Use a set and only grow sequences from values with no predecessor.",
      },
    ],
  },
  "p1-hash-freq": {
    kind: "questions",
    questions: [
      {
        title: "Valid Anagram",
        url: "https://leetcode.com/problems/valid-anagram/",
        source: "LeetCode",
        hint: "Count character frequencies; compare two maps (or one map with +/−).",
      },
      {
        title: "Ransom Note",
        url: "https://leetcode.com/problems/ransom-note/",
        source: "LeetCode",
        hint: "Count available characters, then consume each required character.",
      },
    ],
  },
  "p1-hash-index": {
    kind: "questions",
    questions: [
      {
        title: "First Unique Character in a String",
        url: "https://leetcode.com/problems/first-unique-character-in-a-string/",
        source: "LeetCode",
        hint: "Frequency pass, then scan for the first char with count 1.",
      },
      {
        title: "Isomorphic Strings",
        url: "https://leetcode.com/problems/isomorphic-strings/",
        source: "LeetCode",
        hint: "Track the last index or mapping of each character in both directions.",
      },
    ],
  },
  "p1-hash-complement": {
    kind: "questions",
    questions: [
      {
        title: "Two Sum II - Input Array Is Sorted",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        source: "LeetCode",
        hint: "Complement idea still works; with sorted input prefer two pointers from both ends.",
      },
      {
        title: "Two Sum",
        url: "https://leetcode.com/problems/two-sum/",
        source: "LeetCode",
        hint: "Store seen values so each complement lookup is constant time.",
      },
    ],
  },
  "p1-hash-group": {
    kind: "questions",
    questions: [
      {
        title: "Group Anagrams",
        url: "https://leetcode.com/problems/group-anagrams/",
        source: "LeetCode",
        hint: "Key = sorted string (or count signature); group words under the same key.",
      },
      {
        title: "Group Shifted Strings",
        url: "https://leetcode.com/problems/group-shifted-strings/",
        source: "LeetCode",
        hint: "Group strings by a normalized difference signature.",
      },
    ],
  },
  "p1-hash-dedupe": {
    kind: "questions",
    questions: [
      {
        title: "Remove Duplicates from Sorted Array",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        source: "LeetCode",
        hint: "Slow/fast pointers: write unique values forward in the sorted array.",
      },
      {
        title: "Contains Duplicate II",
        url: "https://leetcode.com/problems/contains-duplicate-ii/",
        source: "LeetCode",
        hint: "Map each value to its latest index and test the allowed distance.",
      },
    ],
  },
  "p1-prefix-sum": {
    kind: "questions",
    questions: [
      {
        title: "Find Pivot Index",
        url: "https://leetcode.com/problems/find-pivot-index/",
        source: "LeetCode",
        hint: "Total sum + left running sum: left == total − left − nums[i].",
      },
      {
        title: "Left and Right Sum Differences",
        url: "https://leetcode.com/problems/left-and-right-sum-differences/",
        source: "LeetCode",
        hint: "Combine a total sum with a running left prefix.",
      },
    ],
  },
  "p1-prefix-product": {
    kind: "questions",
    questions: [
      {
        title: "Product of Array Except Self",
        url: "https://leetcode.com/problems/product-of-array-except-self/",
        source: "LeetCode",
        hint: "Prefix products left→right, then multiply by suffix products right→left (no division).",
      },
      {
        title: "Product of the Last K Numbers",
        url: "https://leetcode.com/problems/product-of-the-last-k-numbers/",
        source: "LeetCode",
        hint: "Store prefix products and reset after zeros.",
      },
    ],
  },
  "p1-prefix-range": {
    kind: "questions",
    questions: [
      {
        title: "Range Sum Query - Immutable",
        url: "https://leetcode.com/problems/range-sum-query-immutable/",
        source: "LeetCode",
        hint: "Build prefix[]; range sum = prefix[j+1] − prefix[i].",
      },
      {
        title: "Range Sum Query 2D - Immutable",
        url: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
        source: "LeetCode",
        hint: "Precompute cumulative sums so each range query uses subtraction.",
      },
    ],
  },
  "p1-prefix-hash": {
    kind: "questions",
    questions: [
      {
        title: "Subarray Sum Equals K",
        url: "https://leetcode.com/problems/subarray-sum-equals-k/",
        source: "LeetCode",
        hint: "Map prefixSum→count; for each prefix look up prefix−k.",
      },
      {
        title: "Contiguous Array",
        url: "https://leetcode.com/problems/contiguous-array/",
        source: "LeetCode",
        hint: "Map each balance prefix to its earliest index.",
      },
    ],
  },
  "p1-prefix-xor": {
    kind: "questions",
    questions: [
      {
        title: "XOR Queries of a Subarray",
        url: "https://leetcode.com/problems/xor-queries-of-a-subarray/",
        source: "LeetCode",
        hint: "Prefix XOR: range XOR = pref[r+1] ^ pref[l].",
      },
      {
        title: "Count Triplets That Can Form Two Arrays of Equal XOR",
        url: "https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/",
        source: "LeetCode",
        hint: "Equal prefix XOR values identify zero-XOR ranges.",
      },
    ],
  },
  "p1-prefix-2d": {
    kind: "questions",
    questions: [
      {
        title: "Range Sum Query 2D - Immutable",
        url: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
        source: "LeetCode",
        hint: "2D prefix sums; answer with inclusion–exclusion of four corners.",
      },
      {
        title: "Matrix Block Sum",
        url: "https://leetcode.com/problems/matrix-block-sum/",
        source: "LeetCode",
        hint: "Use a padded 2D prefix table and four-corner inclusion-exclusion.",
      },
    ],
  },
  "p1-diff-updates": {
    kind: "questions",
    questions: [
      {
        title: "Corporate Flight Bookings",
        url: "https://leetcode.com/problems/corporate-flight-bookings/",
        source: "LeetCode",
        hint: "Difference array: +seats at start, −seats after end; then prefix sum.",
      },
      {
        title: "Shifting Letters II",
        url: "https://leetcode.com/problems/shifting-letters-ii/",
        source: "LeetCode",
        hint: "Mark each range shift in a difference array, then prefix-sum the net shifts.",
      },
    ],
  },
  "p1-diff-increment": {
    kind: "questions",
    questions: [
      {
        title: "Range Addition",
        url: "https://leetcode.com/problems/range-addition/",
        source: "LeetCode",
        hint: "Same difference-array trick for many range increments, then one prefix pass.",
      },
      {
        title: "Shifting Letters II",
        url: "https://leetcode.com/problems/shifting-letters-ii/",
        source: "LeetCode",
        hint: "Mark each range shift in a difference array, then prefix-sum the net shifts.",
      },
    ],
  },
  "p1-diff-prefix": {
    kind: "questions",
    questions: [
      {
        title: "Car Pooling",
        url: "https://leetcode.com/problems/car-pooling/",
        source: "LeetCode",
        hint: "Diff along timeline (pickup +, drop −), prefix to track passengers vs capacity.",
      },
      {
        title: "Shifting Letters II",
        url: "https://leetcode.com/problems/shifting-letters-ii/",
        source: "LeetCode",
        hint: "Mark each range shift in a difference array, then prefix-sum the net shifts.",
      },
    ],
  },
  "p1-tp-opposite": {
    kind: "questions",
    questions: [
      {
        title: "Two Sum II - Input Array Is Sorted",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        source: "LeetCode",
        hint: "Left and right ends; move the side that makes the sum closer to target.",
      },
      {
        title: "Valid Palindrome",
        url: "https://leetcode.com/problems/valid-palindrome/",
        source: "LeetCode",
        hint: "Move pointers inward while skipping non-alphanumeric characters.",
      },
    ],
  },
  "p1-tp-same": {
    kind: "questions",
    questions: [
      {
        title: "Remove Duplicates from Sorted Array II",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
        source: "LeetCode",
        hint: "Same-direction write pointer; allow at most two copies of each value.",
      },
      {
        title: "Remove Element",
        url: "https://leetcode.com/problems/remove-element/",
        source: "LeetCode",
        hint: "Advance a read pointer and write only values that remain.",
      },
    ],
  },
  "p1-tp-fast-slow": {
    kind: "questions",
    questions: [
      {
        title: "Linked List Cycle",
        url: "https://leetcode.com/problems/linked-list-cycle/",
        source: "LeetCode",
        hint: "Floyd: slow +1, fast +2; meeting means a cycle (array version: happy number).",
      },
      {
        title: "Happy Number",
        url: "https://leetcode.com/problems/happy-number/",
        source: "LeetCode",
        hint: "Treat repeated digit-square sums as a cycle and use Floyd's pointers.",
      },
    ],
  },
  "p1-tp-sorted": {
    kind: "questions",
    questions: [
      {
        title: "Container With Most Water",
        url: "https://leetcode.com/problems/container-with-most-water/",
        source: "LeetCode",
        hint: "Opposite pointers; move the shorter height inward to seek a larger area.",
      },
      {
        title: "Boats to Save People",
        url: "https://leetcode.com/problems/boats-to-save-people/",
        source: "LeetCode",
        hint: "Sort, pair the lightest with the heaviest when possible, and move inward.",
      },
    ],
  },
  "p1-tp-3sum": {
    kind: "questions",
    questions: [
      {
        title: "3Sum",
        url: "https://leetcode.com/problems/3sum/",
        source: "LeetCode",
        hint: "Sort, fix one index, two-pointer the rest; skip duplicates carefully.",
      },
      {
        title: "3Sum Closest",
        url: "https://leetcode.com/problems/3sum-closest/",
        source: "LeetCode",
        hint: "Sort, fix one value, and sweep the remaining pair with two pointers.",
      },
    ],
  },
  "p1-tp-partition": {
    kind: "questions",
    questions: [
      {
        title: "Sort Colors",
        url: "https://leetcode.com/problems/sort-colors/",
        source: "LeetCode",
        hint: "Dutch national flag: low/mid/high pointers partition 0s, 1s, 2s in one pass.",
      },
      {
        title: "Sort Array By Parity",
        url: "https://leetcode.com/problems/sort-array-by-parity/",
        source: "LeetCode",
        hint: "Partition the array by swapping misplaced values from opposite sides.",
      },
    ],
  },
  "p1-tp-inplace": {
    kind: "questions",
    questions: [
      {
        title: "Squares of a Sorted Array",
        url: "https://leetcode.com/problems/squares-of-a-sorted-array/",
        source: "LeetCode",
        hint: "Largest squares are at ends; fill result from right using two pointers.",
      },
      {
        title: "Merge Sorted Array",
        url: "https://leetcode.com/problems/merge-sorted-array/",
        source: "LeetCode",
        hint: "Write backward from the largest values to avoid overwriting input.",
      },
    ],
  },
  "p1-sw-fixed": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Average Subarray I",
        url: "https://leetcode.com/problems/maximum-average-subarray-i/",
        source: "LeetCode",
        hint: "Fixed window of size k: slide by adding right and removing left.",
      },
      {
        title: "Maximum Number of Vowels in a Substring of Given Length",
        url: "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
        source: "LeetCode",
        hint: "Maintain the count while adding and removing one character per slide.",
      },
    ],
  },
  "p1-sw-variable": {
    kind: "questions",
    questions: [
      {
        title: "Longest Substring Without Repeating Characters",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        source: "LeetCode",
        hint: "Expand right; shrink left when a duplicate appears (set/map of last index).",
      },
      {
        title: "Longest Repeating Character Replacement",
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        source: "LeetCode",
        hint: "Shrink only when window size minus its highest frequency exceeds k.",
      },
    ],
  },
  "p1-sw-expand": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Size Subarray Sum",
        url: "https://leetcode.com/problems/minimum-size-subarray-sum/",
        source: "LeetCode",
        hint: "Expand until sum ≥ target, then shrink to minimize length.",
      },
      {
        title: "Fruit Into Baskets",
        url: "https://leetcode.com/problems/fruit-into-baskets/",
        source: "LeetCode",
        hint: "Expand while tracking types and shrink until at most two remain.",
      },
    ],
  },
  "p1-sw-freq": {
    kind: "questions",
    questions: [
      {
        title: "Find All Anagrams in a String",
        url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
        source: "LeetCode",
        hint: "Window size = p.length; maintain char counts and a 'matches' counter.",
      },
      {
        title: "Minimum Window Substring",
        url: "https://leetcode.com/problems/minimum-window-substring/",
        source: "LeetCode",
        hint: "Maintain needed frequencies and shrink once every requirement is covered.",
      },
    ],
  },
  "p1-sw-char": {
    kind: "questions",
    questions: [
      {
        title: "Permutation in String",
        url: "https://leetcode.com/problems/permutation-in-string/",
        source: "LeetCode",
        hint: "Same as anagram window: fixed length with frequency equality check.",
      },
      {
        title: "Minimum Window Substring",
        url: "https://leetcode.com/problems/minimum-window-substring/",
        source: "LeetCode",
        hint: "Maintain needed frequencies and shrink once every requirement is covered.",
      },
    ],
  },
  "p1-sw-maxmin": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Window Substring",
        url: "https://leetcode.com/problems/minimum-window-substring/",
        source: "LeetCode",
        hint: "Expand until all needed chars covered, then shrink for the minimum window.",
      },
      {
        title: "Longest Subarray of 1's After Deleting One Element",
        url: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/",
        source: "LeetCode",
        hint: "Keep a window containing at most one zero.",
      },
    ],
  },
  "p1-sw-deque": {
    kind: "questions",
    questions: [
      {
        title: "Sliding Window Maximum",
        url: "https://leetcode.com/problems/sliding-window-maximum/",
        source: "LeetCode",
        hint: "Monotonic decreasing deque of indices; front is max of current window.",
      },
      {
        title: "Jump Game VI",
        url: "https://leetcode.com/problems/jump-game-vi/",
        source: "LeetCode",
        hint: "Keep candidate window scores in a decreasing deque.",
      },
    ],
  },
  "p1-kadane-max": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Subarray",
        url: "https://leetcode.com/problems/maximum-subarray/",
        source: "LeetCode",
        hint: "Kadane: at each index choose nums[i] alone or extend previous best sum.",
      },
      {
        title: "Maximum Sum Circular Subarray",
        url: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
        source: "LeetCode",
        hint: "Combine ordinary Kadane with total sum minus the minimum subarray.",
      },
    ],
  },
  "p1-kadane-min": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Absolute Sum of Any Subarray",
        url: "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/",
        source: "LeetCode",
        hint: "Track both max and min subarray sums (Kadane variants); answer is max |sum|.",
      },
      {
        title: "Minimum Sum of Mountain Triplets I",
        url: "https://leetcode.com/problems/minimum-sum-of-mountain-triplets-i/",
        source: "LeetCode",
        hint: "Track useful prefix and suffix minima around each center.",
      },
    ],
  },
  "p1-kadane-circular": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Sum Circular Subarray",
        url: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
        source: "LeetCode",
        hint: "max(normal Kadane, totalSum − minSubarraySum); handle all-negative edge case.",
      },
      {
        title: "Maximum Subarray",
        url: "https://leetcode.com/problems/maximum-subarray/",
        source: "LeetCode",
        hint: "First master the non-circular best-ending-here recurrence.",
      },
    ],
  },
  "p1-kadane-product": {
    kind: "questions",
    questions: [
      {
        title: "Maximum Product Subarray",
        url: "https://leetcode.com/problems/maximum-product-subarray/",
        source: "LeetCode",
        hint: "Track max and min product ending here (negatives flip them).",
      },
      {
        title: "Maximum Product of Three Numbers",
        url: "https://leetcode.com/problems/maximum-product-of-three-numbers/",
        source: "LeetCode",
        hint: "Negative values make tracking both extremes essential.",
      },
    ],
  },
  "p1-kadane-sum": {
    kind: "questions",
    questions: [
      {
        title: "Continuous Subarray Sum",
        url: "https://leetcode.com/problems/continuous-subarray-sum/",
        source: "LeetCode",
        hint: "Prefix sums mod k; same remainder seen before ⇒ subarray multiple of k (length ≥ 2).",
      },
      {
        title: "Subarray Sum Equals K",
        url: "https://leetcode.com/problems/subarray-sum-equals-k/",
        source: "LeetCode",
        hint: "Store prefix sums because a matching difference identifies a target-sum range.",
      },
    ],
  },
  "p1-sort-bubble": {
    kind: "questions",
    questions: [
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Implement any O(n log n) sort; bubble is for learning swaps, not interviews.",
      },
      {
        title: "Sort Colors",
        url: "https://leetcode.com/problems/sort-colors/",
        source: "LeetCode",
        hint: "Exploit a small value range with counting or partitioning.",
      },
    ],
  },
  "p1-sort-selection": {
    kind: "questions",
    questions: [
      {
        title: "Sort Colors",
        url: "https://leetcode.com/problems/sort-colors/",
        source: "LeetCode",
        hint: "Selection-style thinking: repeatedly place the next correct value — here use 3-way partition.",
      },
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Implement the named sorting technique and compare its invariants and complexity.",
      },
    ],
  },
  "p1-sort-insertion": {
    kind: "questions",
    questions: [
      {
        title: "Insertion Sort List",
        url: "https://leetcode.com/problems/insertion-sort-list/",
        source: "LeetCode",
        hint: "Build a sorted list by inserting each node into the correct position.",
      },
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Implement the named sorting technique and compare its invariants and complexity.",
      },
    ],
  },
  "p1-sort-merge": {
    kind: "questions",
    questions: [
      {
        title: "Sort List",
        url: "https://leetcode.com/problems/sort-list/",
        source: "LeetCode",
        hint: "Merge sort on linked list: split mid, sort halves, merge.",
      },
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Implement the named sorting technique and compare its invariants and complexity.",
      },
    ],
  },
  "p1-sort-quick": {
    kind: "questions",
    questions: [
      {
        title: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        source: "LeetCode",
        hint: "Quickselect (partition like quicksort) for average O(n); or heap.",
      },
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Practice partitioning around a pivot before recursing on each side.",
      },
    ],
  },
  "p1-sort-counting": {
    kind: "questions",
    questions: [
      {
        title: "Sort Colors",
        url: "https://leetcode.com/problems/sort-colors/",
        source: "LeetCode",
        hint: "Counting sort works when values are few (0/1/2) — count then overwrite.",
      },
      {
        title: "Sort an Array",
        url: "https://leetcode.com/problems/sort-an-array/",
        source: "LeetCode",
        hint: "Implement the named sorting technique and compare its invariants and complexity.",
      },
    ],
  },
  "p1-sort-custom": {
    kind: "questions",
    questions: [
      {
        title: "Largest Number",
        url: "https://leetcode.com/problems/largest-number/",
        source: "LeetCode",
        hint: "Custom comparator: order A before B if AB > BA as strings.",
      },
      {
        title: "Queue Reconstruction by Height",
        url: "https://leetcode.com/problems/queue-reconstruction-by-height/",
        source: "LeetCode",
        hint: "Choose a comparator that makes greedy insertion preserve the ordering constraint.",
      },
    ],
  },
  "p1-sort-pattern-tp": {
    kind: "questions",
    questions: [
      {
        title: "3Sum Closest",
        url: "https://leetcode.com/problems/3sum-closest/",
        source: "LeetCode",
        hint: "Sort first, then fix one index and two-pointer for closest sum.",
      },
      {
        title: "4Sum",
        url: "https://leetcode.com/problems/4sum/",
        source: "LeetCode",
        hint: "Sort, fix two positions, then use two pointers while skipping duplicates.",
      },
    ],
  },
  "p1-sort-pattern-greedy": {
    kind: "questions",
    questions: [
      {
        title: "Assign Cookies",
        url: "https://leetcode.com/problems/assign-cookies/",
        source: "LeetCode",
        hint: "Sort greed and sizes; assign smallest cookie that satisfies each child.",
      },
      {
        title: "Boats to Save People",
        url: "https://leetcode.com/problems/boats-to-save-people/",
        source: "LeetCode",
        hint: "Sorting exposes the greedy lightest-heaviest pairing.",
      },
    ],
  },
  "p1-sort-pattern-intervals": {
    kind: "questions",
    questions: [
      {
        title: "Merge Intervals",
        url: "https://leetcode.com/problems/merge-intervals/",
        source: "LeetCode",
        hint: "Sort by start; merge when current overlaps the last kept interval.",
      },
      {
        title: "Non-overlapping Intervals",
        url: "https://leetcode.com/problems/non-overlapping-intervals/",
        source: "LeetCode",
        hint: "Sort intervals by end to greedily retain the most compatible ones.",
      },
    ],
  },
  "p1-int-merge": {
    kind: "questions",
    questions: [
      {
        title: "Merge Intervals",
        url: "https://leetcode.com/problems/merge-intervals/",
        source: "LeetCode",
        hint: "Sort by start time; extend end while overlapping.",
      },
      {
        title: "Interval List Intersections",
        url: "https://leetcode.com/problems/interval-list-intersections/",
        source: "LeetCode",
        hint: "Advance the interval whose end is smaller after recording each overlap.",
      },
    ],
  },
  "p1-int-insert": {
    kind: "questions",
    questions: [
      {
        title: "Insert Interval",
        url: "https://leetcode.com/problems/insert-interval/",
        source: "LeetCode",
        hint: "Add all before, merge overlaps with newInterval, then append the rest.",
      },
      {
        title: "Interval List Intersections",
        url: "https://leetcode.com/problems/interval-list-intersections/",
        source: "LeetCode",
        hint: "Advance the interval whose end is smaller after recording each overlap.",
      },
    ],
  },
  "p1-int-overlap": {
    kind: "questions",
    questions: [
      {
        title: "Meeting Rooms II",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
        source: "LeetCode",
        hint: "Sort starts/ends or use min-heap of end times to count concurrent meetings.",
      },
      {
        title: "My Calendar I",
        url: "https://leetcode.com/problems/my-calendar-i/",
        source: "LeetCode",
        hint: "Reject a booking when its half-open interval overlaps an existing one.",
      },
    ],
  },
  "p1-int-nonoverlap": {
    kind: "questions",
    questions: [
      {
        title: "Non-overlapping Intervals",
        url: "https://leetcode.com/problems/non-overlapping-intervals/",
        source: "LeetCode",
        hint: "Sort by end; greedily keep intervals that don't overlap the last kept.",
      },
      {
        title: "Minimum Number of Arrows to Burst Balloons",
        url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
        source: "LeetCode",
        hint: "Sort by end and greedily reuse one point across overlaps.",
      },
    ],
  },
  "p1-int-meeting": {
    kind: "questions",
    questions: [
      {
        title: "Meeting Rooms",
        url: "https://leetcode.com/problems/meeting-rooms/",
        source: "LeetCode",
        hint: "Sort by start; check if any meeting starts before the previous ends.",
      },
      {
        title: "Meeting Rooms II",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
        source: "LeetCode",
        hint: "Track the earliest finishing active meeting with a min-heap.",
      },
    ],
  },
  "p1-int-schedule": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Number of Arrows to Burst Balloons",
        url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
        source: "LeetCode",
        hint: "Sort by end; shoot at end of current balloon; skip all covered by that point.",
      },
      {
        title: "Maximum Number of Events That Can Be Attended",
        url: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/",
        source: "LeetCode",
        hint: "Sweep days and attend the available event that ends earliest.",
      },
    ],
  },
  "p1-int-sweep": {
    kind: "questions",
    questions: [
      {
        title: "The Skyline Problem",
        url: "https://leetcode.com/problems/the-skyline-problem/",
        source: "LeetCode",
        hint: "Sweep line on building edges with a multiset/heap of active heights.",
      },
      {
        title: "Car Pooling",
        url: "https://leetcode.com/problems/car-pooling/",
        source: "LeetCode",
        hint: "Convert starts and ends into timeline events and sweep the running load.",
      },
    ],
  },
  "p1-mat-traversal": {
    kind: "questions",
    questions: [
      {
        title: "Island Perimeter",
        url: "https://leetcode.com/problems/island-perimeter/",
        source: "LeetCode",
        hint: "Traverse grid; for each land cell add edges not shared with another land.",
      },
      {
        title: "Diagonal Traverse",
        url: "https://leetcode.com/problems/diagonal-traverse/",
        source: "LeetCode",
        hint: "Walk matrix diagonals while handling direction changes at boundaries.",
      },
    ],
  },
  "p1-mat-spiral": {
    kind: "questions",
    questions: [
      {
        title: "Spiral Matrix",
        url: "https://leetcode.com/problems/spiral-matrix/",
        source: "LeetCode",
        hint: "Simulate boundaries top/bottom/left/right and shrink after each side.",
      },
      {
        title: "Spiral Matrix II",
        url: "https://leetcode.com/problems/spiral-matrix-ii/",
        source: "LeetCode",
        hint: "Fill layers while shrinking four traversal boundaries.",
      },
    ],
  },
  "p1-mat-rotate": {
    kind: "questions",
    questions: [
      {
        title: "Rotate Image",
        url: "https://leetcode.com/problems/rotate-image/",
        source: "LeetCode",
        hint: "Transpose, then reverse each row (for 90° clockwise).",
      },
      {
        title: "Determine Whether Matrix Can Be Obtained By Rotation",
        url: "https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/",
        source: "LeetCode",
        hint: "Apply the rotate transform up to four times and compare.",
      },
    ],
  },
  "p1-mat-transpose": {
    kind: "questions",
    questions: [
      {
        title: "Transpose Matrix",
        url: "https://leetcode.com/problems/transpose-matrix/",
        source: "LeetCode",
        hint: "result[j][i] = matrix[i][j]; allocate m×n carefully when not square.",
      },
      {
        title: "Flipping an Image",
        url: "https://leetcode.com/problems/flipping-an-image/",
        source: "LeetCode",
        hint: "Combine row reversal with a per-cell transform.",
      },
    ],
  },
  "p1-mat-search": {
    kind: "questions",
    questions: [
      {
        title: "Search a 2D Matrix",
        url: "https://leetcode.com/problems/search-a-2d-matrix/",
        source: "LeetCode",
        hint: "Treat as a flattened sorted array and binary search, or start top-right.",
      },
      {
        title: "Search a 2D Matrix II",
        url: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
        source: "LeetCode",
        hint: "Start at a monotone corner and eliminate one row or column each step.",
      },
    ],
  },
  "p1-mat-zeroes": {
    kind: "questions",
    questions: [
      {
        title: "Set Matrix Zeroes",
        url: "https://leetcode.com/problems/set-matrix-zeroes/",
        source: "LeetCode",
        hint: "Mark rows/cols using first row & first column as flags (O(1) extra space).",
      },
      {
        title: "Game of Life",
        url: "https://leetcode.com/problems/game-of-life/",
        source: "LeetCode",
        hint: "Encode old and new cell states together to update the matrix in place.",
      },
    ],
  },
  "p1-mat-grid": {
    kind: "questions",
    questions: [
      {
        title: "Number of Islands",
        url: "https://leetcode.com/problems/number-of-islands/",
        source: "LeetCode",
        hint: "DFS/BFS flood-fill each unvisited land cell; count components.",
      },
      {
        title: "Max Area of Island",
        url: "https://leetcode.com/problems/max-area-of-island/",
        source: "LeetCode",
        hint: "Flood-fill each component and aggregate its cell count.",
      },
    ],
  },

  // —— PHASE 2 ——
  "p2-basic-standard": {
    kind: "questions",
    questions: [
      {
        title: "Binary Search",
        url: "https://leetcode.com/problems/binary-search/",
        source: "LeetCode",
        hint: "Classic mid = lo+(hi-lo)/2; move lo/hi based on comparison with target.",
      },
      {
        title: "Search in a Sorted Array of Unknown Size",
        url: "https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/",
        source: "LeetCode",
        hint: "Establish bounds, then apply the same binary-search boundary invariant.",
      },
    ],
  },
  "p2-basic-first": {
    kind: "questions",
    questions: [
      {
        title: "Find First and Last Position of Element in Sorted Array",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        source: "LeetCode",
        hint: "Two binary searches: lower_bound for first, then upper_bound−1 for last.",
      },
      {
        title: "Search in a Sorted Array of Unknown Size",
        url: "https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/",
        source: "LeetCode",
        hint: "Establish bounds, then apply the same binary-search boundary invariant.",
      },
    ],
  },
  "p2-basic-last": {
    kind: "questions",
    questions: [
      {
        title: "Find First and Last Position of Element in Sorted Array",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        source: "LeetCode",
        hint: "For last occurrence, bias the search to the right when nums[mid]==target.",
      },
      {
        title: "Search in a Sorted Array of Unknown Size",
        url: "https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/",
        source: "LeetCode",
        hint: "Establish bounds, then apply the same binary-search boundary invariant.",
      },
    ],
  },
  "p2-basic-lower": {
    kind: "questions",
    questions: [
      {
        title: "Search Insert Position",
        url: "https://leetcode.com/problems/search-insert-position/",
        source: "LeetCode",
        hint: "Lower bound: first index with value ≥ target.",
      },
      {
        title: "Search in a Sorted Array of Unknown Size",
        url: "https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/",
        source: "LeetCode",
        hint: "Establish bounds, then apply the same binary-search boundary invariant.",
      },
    ],
  },
  "p2-basic-upper": {
    kind: "questions",
    questions: [
      {
        title: "Count Negative Numbers in a Sorted Matrix",
        url: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
        source: "LeetCode",
        hint: "Per row, find first negative (upper/lower bound style) or staircase from top-right.",
      },
      {
        title: "Search in a Sorted Array of Unknown Size",
        url: "https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/",
        source: "LeetCode",
        hint: "Establish bounds, then apply the same binary-search boundary invariant.",
      },
    ],
  },
  "p2-basic-insert": {
    kind: "questions",
    questions: [
      {
        title: "Search Insert Position",
        url: "https://leetcode.com/problems/search-insert-position/",
        source: "LeetCode",
        hint: "Binary search until lo>hi; lo is the insert index.",
      },
      {
        title: "Search in a Sorted Array of Unknown Size",
        url: "https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/",
        source: "LeetCode",
        hint: "Establish bounds, then apply the same binary-search boundary invariant.",
      },
    ],
  },
  "p2-mod-rotated": {
    kind: "questions",
    questions: [
      {
        title: "Search in Rotated Sorted Array",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        source: "LeetCode",
        hint: "Decide which half is sorted; check if target lies in that half.",
      },
      {
        title: "Search in Rotated Sorted Array II",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
        source: "LeetCode",
        hint: "Handle equal endpoints before identifying the sorted half.",
      },
    ],
  },
  "p2-mod-min": {
    kind: "questions",
    questions: [
      {
        title: "Find Minimum in Rotated Sorted Array",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        source: "LeetCode",
        hint: "Compare mid with right; the unsorted side contains the minimum.",
      },
      {
        title: "Find Minimum in Rotated Sorted Array II",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
        source: "LeetCode",
        hint: "Compare mid with right and shrink cautiously when values tie.",
      },
    ],
  },
  "p2-mod-peak": {
    kind: "questions",
    questions: [
      {
        title: "Find Peak Element",
        url: "https://leetcode.com/problems/find-peak-element/",
        source: "LeetCode",
        hint: "Move toward the larger neighbor — a peak must exist that way.",
      },
      {
        title: "Find a Peak Element II",
        url: "https://leetcode.com/problems/find-a-peak-element-ii/",
        source: "LeetCode",
        hint: "Binary-search columns or rows and move toward a larger neighbor.",
      },
    ],
  },
  "p2-mod-bitonic": {
    kind: "questions",
    questions: [
      {
        title: "Peak Index in a Mountain Array",
        url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
        source: "LeetCode",
        hint: "Binary search the mountain peak where arr[mid] > arr[mid+1] flips.",
      },
      {
        title: "Find a Peak Element II",
        url: "https://leetcode.com/problems/find-a-peak-element-ii/",
        source: "LeetCode",
        hint: "Binary-search columns or rows and move toward a larger neighbor.",
      },
    ],
  },
  "p2-mod-nearly": {
    kind: "questions",
    questions: [
      {
        title: "Search in Rotated Sorted Array II",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
        source: "LeetCode",
        hint: "Duplicates blur halves; shrink lo/hi when nums[lo]==nums[mid]==nums[hi].",
      },
      {
        title: "Find Minimum in Rotated Sorted Array II",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
        source: "LeetCode",
        hint: "Duplicates require discarding ambiguous equal boundaries carefully.",
      },
    ],
  },
  "p2-ans-min": {
    kind: "questions",
    questions: [
      {
        title: "Koko Eating Bananas",
        url: "https://leetcode.com/problems/koko-eating-bananas/",
        source: "LeetCode",
        hint: "Binary search speed; feasible(mid) checks if hours ≤ h.",
      },
      {
        title: "Minimum Number of Days to Make m Bouquets",
        url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
        source: "LeetCode",
        hint: "Binary-search the smallest day whose feasibility check succeeds.",
      },
    ],
  },
  "p2-ans-max": {
    kind: "questions",
    questions: [
      {
        title: "Capacity To Ship Packages Within D Days",
        url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        source: "LeetCode",
        hint: "Search capacity; minimize the smallest capacity that finishes in ≤ days.",
      },
      {
        title: "Split Array Largest Sum",
        url: "https://leetcode.com/problems/split-array-largest-sum/",
        source: "LeetCode",
        hint: "Search the smallest capacity-like limit that permits enough partitions.",
      },
    ],
  },
  "p2-ans-feasibility": {
    kind: "questions",
    questions: [
      {
        title: "Split Array Largest Sum",
        url: "https://leetcode.com/problems/split-array-largest-sum/",
        source: "LeetCode",
        hint: "Binary search the max-sum limit; greedy count how many subarrays needed.",
      },
      {
        title: "Divide Chocolate",
        url: "https://leetcode.com/problems/divide-chocolate/",
        source: "LeetCode",
        hint: "Binary-search the answer and greedily count feasible pieces.",
      },
    ],
  },
  "p2-ans-capacity": {
    kind: "questions",
    questions: [
      {
        title: "Capacity To Ship Packages Within D Days",
        url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        source: "LeetCode",
        hint: "Low = max package, high = sum; check days needed for mid capacity.",
      },
      {
        title: "Split Array Largest Sum",
        url: "https://leetcode.com/problems/split-array-largest-sum/",
        source: "LeetCode",
        hint: "Search the smallest capacity-like limit that permits enough partitions.",
      },
    ],
  },
  "p2-ans-allocation": {
    kind: "questions",
    questions: [
      {
        title: "Split Array Largest Sum",
        url: "https://leetcode.com/problems/split-array-largest-sum/",
        source: "LeetCode",
        hint: "Same pattern as book allocation: minimize largest sum across m splits.",
      },
      {
        title: "Divide Chocolate",
        url: "https://leetcode.com/problems/divide-chocolate/",
        source: "LeetCode",
        hint: "Binary-search the answer and greedily count feasible pieces.",
      },
    ],
  },
  "p2-ans-koko": {
    kind: "questions",
    questions: [
      {
        title: "Koko Eating Bananas",
        url: "https://leetcode.com/problems/koko-eating-bananas/",
        source: "LeetCode",
        hint: "Minimize eating speed with a time-feasibility check.",
      },
      {
        title: "Minimum Number of Days to Make m Bouquets",
        url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
        source: "LeetCode",
        hint: "Binary-search the smallest day whose feasibility check succeeds.",
      },
    ],
  },
  "p2-ans-aggressive": {
    kind: "questions",
    questions: [
      {
        title: "Magnetic Force Between Two Balls",
        url: "https://leetcode.com/problems/magnetic-force-between-two-balls/",
        source: "LeetCode",
        hint: "Sort positions; binary search minimum distance; greedily place balls.",
      },
      {
        title: "Maximum Tastiness of Candy Basket",
        url: "https://leetcode.com/problems/maximum-tastiness-of-candy-basket/",
        source: "LeetCode",
        hint: "Sort and greedily test whether a candidate minimum gap is achievable.",
      },
    ],
  },
  "p2-combo-greedy": {
    kind: "questions",
    questions: [
      {
        title: "Minimum Number of Days to Make m Bouquets",
        url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
        source: "LeetCode",
        hint: "Binary search day; greedily count bouquets formable that day.",
      },
      {
        title: "Koko Eating Bananas",
        url: "https://leetcode.com/problems/koko-eating-bananas/",
        source: "LeetCode",
        hint: "Use a monotone greedy feasibility test inside binary search.",
      },
    ],
  },
  "p2-combo-prefix": {
    kind: "questions",
    questions: [
      {
        title: "Path With Minimum Effort",
        url: "https://leetcode.com/problems/path-with-minimum-effort/",
        source: "LeetCode",
        hint: "Binary search effort limit + BFS/DFS reachability (or Dijkstra).",
      },
      {
        title: "Swim in Rising Water",
        url: "https://leetcode.com/problems/swim-in-rising-water/",
        source: "LeetCode",
        hint: "Binary-search a threshold and test grid reachability under it.",
      },
    ],
  },
  "p2-combo-sort": {
    kind: "questions",
    questions: [
      {
        title: "Successful Pairs of Spells and Potions",
        url: "https://leetcode.com/problems/successful-pairs-of-spells-and-potions/",
        source: "LeetCode",
        hint: "Sort potions; for each spell binary search the first potion that works.",
      },
      {
        title: "Find K-th Smallest Pair Distance",
        url: "https://leetcode.com/problems/find-k-th-smallest-pair-distance/",
        source: "LeetCode",
        hint: "Sort, binary-search distance, and count valid pairs with two pointers.",
      },
    ],
  },
  "p2-combo-tp": {
    kind: "questions",
    questions: [
      {
        title: "Heaters",
        url: "https://leetcode.com/problems/heaters/",
        source: "LeetCode",
        hint: "Sort both; for each house binary search nearest heater (or two-pointer).",
      },
      {
        title: "Find K Closest Elements",
        url: "https://leetcode.com/problems/find-k-closest-elements/",
        source: "LeetCode",
        hint: "Binary-search the window start or converge pointers around the target.",
      },
    ],
  },

  // —— PHASE 3 ——
  "p3-basics-traversal": {
    kind: "questions",
    questions: [
      {
        title: "Middle of the Linked List",
        url: "https://leetcode.com/problems/middle-of-the-linked-list/",
        source: "LeetCode",
        hint: "Traverse with fast/slow, or count length then walk to mid.",
      },
      {
        title: "Convert Binary Number in a Linked List to Integer",
        url: "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/",
        source: "LeetCode",
        hint: "Traverse once while folding each node into the accumulated value.",
      },
    ],
  },
  "p3-basics-insert": {
    kind: "questions",
    questions: [
      {
        title: "Design Linked List",
        url: "https://leetcode.com/problems/design-linked-list/",
        source: "LeetCode",
        hint: "Dummy head helps insert at head/index without special cases.",
      },
      {
        title: "Insert Greatest Common Divisors in Linked List",
        url: "https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/",
        source: "LeetCode",
        hint: "Splice a new node between each adjacent pair without losing the next pointer.",
      },
    ],
  },
  "p3-basics-delete": {
    kind: "questions",
    questions: [
      {
        title: "Delete Node in a Linked List",
        url: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
        source: "LeetCode",
        hint: "Copy next's value into current, then bypass next (no head access).",
      },
      {
        title: "Remove Linked List Elements",
        url: "https://leetcode.com/problems/remove-linked-list-elements/",
        source: "LeetCode",
        hint: "Keep a predecessor pointer and bypass every matching node.",
      },
    ],
  },
  "p3-basics-dummy": {
    kind: "questions",
    questions: [
      {
        title: "Remove Linked List Elements",
        url: "https://leetcode.com/problems/remove-linked-list-elements/",
        source: "LeetCode",
        hint: "Dummy node before head simplifies deleting the real head.",
      },
      {
        title: "Merge Two Sorted Lists",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        source: "LeetCode",
        hint: "A dummy head removes special cases when building the result list.",
      },
    ],
  },
  "p3-fs-middle": {
    kind: "questions",
    questions: [
      {
        title: "Middle of the Linked List",
        url: "https://leetcode.com/problems/middle-of-the-linked-list/",
        source: "LeetCode",
        hint: "Slow moves 1, fast moves 2; slow lands on middle.",
      },
      {
        title: "Delete the Middle Node of a Linked List",
        url: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
        source: "LeetCode",
        hint: "Use fast and slow pointers while retaining the node before the middle.",
      },
    ],
  },
  "p3-fs-cycle": {
    kind: "questions",
    questions: [
      {
        title: "Linked List Cycle",
        url: "https://leetcode.com/problems/linked-list-cycle/",
        source: "LeetCode",
        hint: "Floyd cycle detection with slow/fast pointers.",
      },
      {
        title: "Happy Number",
        url: "https://leetcode.com/problems/happy-number/",
        source: "LeetCode",
        hint: "Apply Floyd's cycle detection to an implicit next-state sequence.",
      },
    ],
  },
  "p3-fs-start": {
    kind: "questions",
    questions: [
      {
        title: "Linked List Cycle II",
        url: "https://leetcode.com/problems/linked-list-cycle-ii/",
        source: "LeetCode",
        hint: "After meet, reset one pointer to head; advance both by 1 to find entrance.",
      },
      {
        title: "Find the Duplicate Number",
        url: "https://leetcode.com/problems/find-the-duplicate-number/",
        source: "LeetCode",
        hint: "Model values as next pointers and locate the cycle entrance.",
      },
    ],
  },
  "p3-fs-palindrome": {
    kind: "questions",
    questions: [
      {
        title: "Palindrome Linked List",
        url: "https://leetcode.com/problems/palindrome-linked-list/",
        source: "LeetCode",
        hint: "Find mid, reverse second half, compare both halves.",
      },
      {
        title: "Maximum Twin Sum of a Linked List",
        url: "https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/",
        source: "LeetCode",
        hint: "Find the middle, reverse one half, and compare paired nodes.",
      },
    ],
  },
  "p3-rev-entire": {
    kind: "questions",
    questions: [
      {
        title: "Reverse Linked List",
        url: "https://leetcode.com/problems/reverse-linked-list/",
        source: "LeetCode",
        hint: "Iterative: prev/curr/next rewiring; or recursive reverse of rest.",
      },
      {
        title: "Reverse Linked List II",
        url: "https://leetcode.com/problems/reverse-linked-list-ii/",
        source: "LeetCode",
        hint: "Reuse pointer reversal inside a bounded segment.",
      },
    ],
  },
  "p3-rev-between": {
    kind: "questions",
    questions: [
      {
        title: "Reverse Linked List II",
        url: "https://leetcode.com/problems/reverse-linked-list-ii/",
        source: "LeetCode",
        hint: "Locate segment, reverse left..right in place, reconnect ends.",
      },
      {
        title: "Reverse Nodes in Even Length Groups",
        url: "https://leetcode.com/problems/reverse-nodes-in-even-length-groups/",
        source: "LeetCode",
        hint: "Locate each group, reverse qualifying segments, and reconnect their boundaries.",
      },
    ],
  },
  "p3-rev-k": {
    kind: "questions",
    questions: [
      {
        title: "Reverse Nodes in k-Group",
        url: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
        source: "LeetCode",
        hint: "Only reverse a full group of k; recurse/iterate on the remainder.",
      },
      {
        title: "Swap Nodes in Pairs",
        url: "https://leetcode.com/problems/swap-nodes-in-pairs/",
        source: "LeetCode",
        hint: "Treat each pair as a complete reversal group of size two.",
      },
    ],
  },
  "p3-rev-alt": {
    kind: "questions",
    questions: [
      {
        title: "Swap Nodes in Pairs",
        url: "https://leetcode.com/problems/swap-nodes-in-pairs/",
        source: "LeetCode",
        hint: "Special case of k=2: swap pairs and advance.",
      },
      {
        title: "Odd Even Linked List",
        url: "https://leetcode.com/problems/odd-even-linked-list/",
        source: "LeetCode",
        hint: "Rewire alternating positions into two chains, then join them.",
      },
    ],
  },
  "p3-merge-two": {
    kind: "questions",
    questions: [
      {
        title: "Merge Two Sorted Lists",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        source: "LeetCode",
        hint: "Dummy tail; always attach the smaller head of the two lists.",
      },
      {
        title: "Merge In Between Linked Lists",
        url: "https://leetcode.com/problems/merge-in-between-linked-lists/",
        source: "LeetCode",
        hint: "Find splice boundaries and connect the inserted list's head and tail.",
      },
    ],
  },
  "p3-merge-k": {
    kind: "questions",
    questions: [
      {
        title: "Merge k Sorted Lists",
        url: "https://leetcode.com/problems/merge-k-sorted-lists/",
        source: "LeetCode",
        hint: "Min-heap of heads, or pairwise merge (divide & conquer).",
      },
      {
        title: "Merge Two Sorted Lists",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        source: "LeetCode",
        hint: "Use the two-list merge as the primitive for pairwise divide and conquer.",
      },
    ],
  },
  "p3-merge-sort": {
    kind: "questions",
    questions: [
      {
        title: "Sort List",
        url: "https://leetcode.com/problems/sort-list/",
        source: "LeetCode",
        hint: "Merge sort: mid split via slow/fast, merge sorted halves.",
      },
      {
        title: "Insertion Sort List",
        url: "https://leetcode.com/problems/insertion-sort-list/",
        source: "LeetCode",
        hint: "Contrast merge sort with incremental insertion into a sorted prefix.",
      },
    ],
  },
  "p3-design-intersection": {
    kind: "questions",
    questions: [
      {
        title: "Intersection of Two Linked Lists",
        url: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
        source: "LeetCode",
        hint: "Two pointers switch heads after end — they meet at intersection (or null).",
      },
      {
        title: "Find the Duplicate Number",
        url: "https://leetcode.com/problems/find-the-duplicate-number/",
        source: "LeetCode",
        hint: "Pointer path alignment and cycle structure avoid extra storage.",
      },
    ],
  },
  "p3-design-nth": {
    kind: "questions",
    questions: [
      {
        title: "Remove Nth Node From End of List",
        url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        source: "LeetCode",
        hint: "Fast ahead by n; when fast ends, slow is before the node to delete.",
      },
      {
        title: "Delete the Middle Node of a Linked List",
        url: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
        source: "LeetCode",
        hint: "Maintain a fixed pointer gap to identify a node relative to the end.",
      },
    ],
  },
  "p3-design-reorder": {
    kind: "questions",
    questions: [
      {
        title: "Reorder List",
        url: "https://leetcode.com/problems/reorder-list/",
        source: "LeetCode",
        hint: "Mid → reverse second half → weave the two halves.",
      },
      {
        title: "Odd Even Linked List",
        url: "https://leetcode.com/problems/odd-even-linked-list/",
        source: "LeetCode",
        hint: "Split nodes by position and reconnect the resulting chains.",
      },
    ],
  },
  "p3-design-clone": {
    kind: "questions",
    questions: [
      {
        title: "Copy List with Random Pointer",
        url: "https://leetcode.com/problems/copy-list-with-random-pointer/",
        source: "LeetCode",
        hint: "Map old→new nodes, or interleave clones then assign randoms.",
      },
      {
        title: "Clone Graph",
        url: "https://leetcode.com/problems/clone-graph/",
        source: "LeetCode",
        hint: "Map each original node to its clone before recursively copying links.",
      },
    ],
  },
  "p3-design-lru": {
    kind: "questions",
    questions: [
      {
        title: "LRU Cache",
        url: "https://leetcode.com/problems/lru-cache/",
        source: "LeetCode",
        hint: "HashMap + doubly linked list for O(1) get/put and eviction.",
      },
      {
        title: "LFU Cache",
        url: "https://leetcode.com/problems/lfu-cache/",
        source: "LeetCode",
        hint: "Combine key lookup with linked frequency buckets for constant-time updates.",
      },
    ],
  },
  "p3-design-dll": {
    kind: "questions",
    questions: [
      {
        title: "Design Browser History",
        url: "https://leetcode.com/problems/design-browser-history/",
        source: "LeetCode",
        hint: "Doubly linked nodes (or two stacks) for back/forward navigation.",
      },
      {
        title: "Design Linked List",
        url: "https://leetcode.com/problems/design-linked-list/",
        source: "LeetCode",
        hint: "Maintain predecessor and successor links carefully at both sentinels.",
      },
    ],
  },

  // —— PHASE 4 ——
  "p4-stack-basic": {
    kind: "questions",
    questions: [
      {
        title: "Implement Stack using Queues",
        url: "https://leetcode.com/problems/implement-stack-using-queues/",
        source: "LeetCode",
        hint: "Keep newest at front via rotate-on-push, or rotate-on-pop.",
      },
      {
        title: "Baseball Game",
        url: "https://leetcode.com/problems/baseball-game/",
        source: "LeetCode",
        hint: "Use a stack to model operations that depend on recent scores.",
      },
    ],
  },
  "p4-stack-parens": {
    kind: "questions",
    questions: [
      {
        title: "Valid Parentheses",
        url: "https://leetcode.com/problems/valid-parentheses/",
        source: "LeetCode",
        hint: "Push opens; on close, stack top must be the matching open.",
      },
      {
        title: "Minimum Remove to Make Valid Parentheses",
        url: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
        source: "LeetCode",
        hint: "Store unmatched opening indices and remove every unmatched bracket.",
      },
    ],
  },
  "p4-stack-min": {
    kind: "questions",
    questions: [
      {
        title: "Min Stack",
        url: "https://leetcode.com/problems/min-stack/",
        source: "LeetCode",
        hint: "Store pairs (val, minSoFar) or maintain a parallel min stack.",
      },
      {
        title: "Maximum Frequency Stack",
        url: "https://leetcode.com/problems/maximum-frequency-stack/",
        source: "LeetCode",
        hint: "Augment stack behavior with frequency groups and recency.",
      },
    ],
  },
  "p4-stack-expr": {
    kind: "questions",
    questions: [
      {
        title: "Basic Calculator II",
        url: "https://leetcode.com/problems/basic-calculator-ii/",
        source: "LeetCode",
        hint: "Stack numbers; apply * / immediately, + − push signed values, sum at end.",
      },
      {
        title: "Basic Calculator",
        url: "https://leetcode.com/problems/basic-calculator/",
        source: "LeetCode",
        hint: "Use a stack to preserve signs and partial results across parentheses.",
      },
    ],
  },
  "p4-stack-notation": {
    kind: "questions",
    questions: [
      {
        title: "Evaluate Reverse Polish Notation",
        url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        source: "LeetCode",
        hint: "Stack operands; on operator pop two, push result.",
      },
      {
        title: "Decode String",
        url: "https://leetcode.com/problems/decode-string/",
        source: "LeetCode",
        hint: "Push prior strings and repeat counts when entering nested brackets.",
      },
    ],
  },
  "p4-stack-design": {
    kind: "questions",
    questions: [
      {
        title: "Max Stack",
        url: "https://leetcode.com/problems/max-stack/",
        source: "LeetCode",
        hint: "Track max alongside values (two stacks or nodes with max links).",
      },
      {
        title: "Min Stack",
        url: "https://leetcode.com/problems/min-stack/",
        source: "LeetCode",
        hint: "Store an aggregate extreme alongside each pushed value.",
      },
    ],
  },
  "p4-ms-nge": {
    kind: "questions",
    questions: [
      {
        title: "Next Greater Element I",
        url: "https://leetcode.com/problems/next-greater-element-i/",
        source: "LeetCode",
        hint: "Monotonic decreasing stack over nums2; map each value to its next greater.",
      },
      {
        title: "Next Greater Element II",
        url: "https://leetcode.com/problems/next-greater-element-ii/",
        source: "LeetCode",
        hint: "Use a decreasing stack and scan twice for circular next-greater answers.",
      },
    ],
  },
  "p4-ms-nse": {
    kind: "questions",
    questions: [
      {
        title: "Next Greater Element II",
        url: "https://leetcode.com/problems/next-greater-element-ii/",
        source: "LeetCode",
        hint: "Circular array: iterate 2n with i%n and a decreasing stack.",
      },
      {
        title: "Final Prices With a Special Discount in a Shop",
        url: "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/",
        source: "LeetCode",
        hint: "A monotonic stack finds the next value that is smaller or equal.",
      },
    ],
  },
  "p4-ms-pge": {
    kind: "questions",
    questions: [
      {
        title: "Daily Temperatures",
        url: "https://leetcode.com/problems/daily-temperatures/",
        source: "LeetCode",
        hint: "Stack of indices waiting for a warmer day (previous greater pattern inverted).",
      },
      {
        title: "Online Stock Span",
        url: "https://leetcode.com/problems/online-stock-span/",
        source: "LeetCode",
        hint: "Compress previous less-or-equal prices into spans on a decreasing stack.",
      },
    ],
  },
  "p4-ms-pse": {
    kind: "questions",
    questions: [
      {
        title: "Sum of Subarray Minimums",
        url: "https://leetcode.com/problems/sum-of-subarray-minimums/",
        source: "LeetCode",
        hint: "For each element find previous/next smaller to count subarrays where it is min.",
      },
      {
        title: "Largest Rectangle in Histogram",
        url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        source: "LeetCode",
        hint: "Previous and next smaller boundaries determine each bar's maximal width.",
      },
    ],
  },
  "p4-ms-temp": {
    kind: "questions",
    questions: [
      {
        title: "Daily Temperatures",
        url: "https://leetcode.com/problems/daily-temperatures/",
        source: "LeetCode",
        hint: "Monotonic stack of unresolved colder days; answer[i]=j−i when warmer found.",
      },
      {
        title: "Next Greater Element I",
        url: "https://leetcode.com/problems/next-greater-element-i/",
        source: "LeetCode",
        hint: "Resolve waiting indices when the current value becomes their next greater element.",
      },
    ],
  },
  "p4-ms-span": {
    kind: "questions",
    questions: [
      {
        title: "Online Stock Span",
        url: "https://leetcode.com/problems/online-stock-span/",
        source: "LeetCode",
        hint: "Stack of (price, span); pop while price ≤ current and accumulate spans.",
      },
      {
        title: "Daily Temperatures",
        url: "https://leetcode.com/problems/daily-temperatures/",
        source: "LeetCode",
        hint: "Store unresolved indices in decreasing value order and measure their distance.",
      },
    ],
  },
  "p4-ms-histogram": {
    kind: "questions",
    questions: [
      {
        title: "Largest Rectangle in Histogram",
        url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        source: "LeetCode",
        hint: "Increasing stack of indices; when smaller bar appears, pop and compute width.",
      },
      {
        title: "Maximal Rectangle",
        url: "https://leetcode.com/problems/maximal-rectangle/",
        source: "LeetCode",
        hint: "Treat each matrix row as the base of a histogram.",
      },
    ],
  },
  "p4-ms-subarray-min": {
    kind: "questions",
    questions: [
      {
        title: "Sum of Subarray Minimums",
        url: "https://leetcode.com/problems/sum-of-subarray-minimums/",
        source: "LeetCode",
        hint: "Contribution technique with previous/next strictly smaller bounds.",
      },
      {
        title: "Sum of Subarray Ranges",
        url: "https://leetcode.com/problems/sum-of-subarray-ranges/",
        source: "LeetCode",
        hint: "Compute each value's contribution as a maximum and as a minimum.",
      },
    ],
  },
  "p4-ms-rain": {
    kind: "questions",
    questions: [
      {
        title: "Trapping Rain Water",
        url: "https://leetcode.com/problems/trapping-rain-water/",
        source: "LeetCode",
        hint: "Two pointers with leftMax/rightMax, or stack of bars for trapped width×height.",
      },
      {
        title: "Trapping Rain Water II",
        url: "https://leetcode.com/problems/trapping-rain-water-ii/",
        source: "LeetCode",
        hint: "Expand from the lowest boundary with a heap to trap water in two dimensions.",
      },
    ],
  },
  "p4-queue-basic": {
    kind: "questions",
    questions: [
      {
        title: "Implement Queue using Stacks",
        url: "https://leetcode.com/problems/implement-queue-using-stacks/",
        source: "LeetCode",
        hint: "Two stacks: in for push, out for pop/peek (transfer when out empty).",
      },
      {
        title: "Number of Recent Calls",
        url: "https://leetcode.com/problems/number-of-recent-calls/",
        source: "LeetCode",
        hint: "Queue timestamps and discard calls outside the active interval.",
      },
    ],
  },
  "p4-queue-circular": {
    kind: "questions",
    questions: [
      {
        title: "Design Circular Queue",
        url: "https://leetcode.com/problems/design-circular-queue/",
        source: "LeetCode",
        hint: "Array + front/rear indices with modulo wrapping; track size.",
      },
      {
        title: "Design Circular Deque",
        url: "https://leetcode.com/problems/design-circular-deque/",
        source: "LeetCode",
        hint: "Use modular front and rear indices with an explicit size.",
      },
    ],
  },
  "p4-queue-from-stack": {
    kind: "questions",
    questions: [
      {
        title: "Implement Queue using Stacks",
        url: "https://leetcode.com/problems/implement-queue-using-stacks/",
        source: "LeetCode",
        hint: "Amortized O(1): flush input stack into output only when needed.",
      },
      {
        title: "Number of Recent Calls",
        url: "https://leetcode.com/problems/number-of-recent-calls/",
        source: "LeetCode",
        hint: "Queue timestamps and discard calls outside the active interval.",
      },
    ],
  },
  "p4-stack-from-queue": {
    kind: "questions",
    questions: [
      {
        title: "Implement Stack using Queues",
        url: "https://leetcode.com/problems/implement-stack-using-queues/",
        source: "LeetCode",
        hint: "On push, enqueue then rotate older elements behind the new one.",
      },
      {
        title: "Baseball Game",
        url: "https://leetcode.com/problems/baseball-game/",
        source: "LeetCode",
        hint: "Practice pure LIFO operations before emulating them with a queue.",
      },
    ],
  },
  "p4-deque-max": {
    kind: "questions",
    questions: [
      {
        title: "Sliding Window Maximum",
        url: "https://leetcode.com/problems/sliding-window-maximum/",
        source: "LeetCode",
        hint: "Monotonic deque stores candidates in decreasing order.",
      },
      {
        title: "Constrained Subsequence Sum",
        url: "https://leetcode.com/problems/constrained-subsequence-sum/",
        source: "LeetCode",
        hint: "Keep the best recent DP values in a decreasing deque.",
      },
    ],
  },
  "p4-deque-min": {
    kind: "questions",
    questions: [
      {
        title: "Shortest Subarray with Sum at Least K",
        url: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
        source: "LeetCode",
        hint: "Prefix sums + increasing deque to find shortest valid window.",
      },
      {
        title: "Continuous Subarrays",
        url: "https://leetcode.com/problems/continuous-subarrays/",
        source: "LeetCode",
        hint: "Maintain min and max deques while shrinking invalid windows.",
      },
    ],
  },
  "p4-deque-neg": {
    kind: "questions",
    questions: [
      {
        title: "First Negative Integer in Every Window of Size K",
        url: "https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1",
        source: "GFG",
        hint: "Deque stores indices of negatives; drop those outside the window.",
      },
      {
        title: "First Negative in Every Window",
        url: "https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/",
        source: "GFG",
        hint: "Keep only negative indices that still belong to the current window.",
      },
    ],
  },
  "p4-deque-opt": {
    kind: "questions",
    questions: [
      {
        title: "Jump Game VI",
        url: "https://leetcode.com/problems/jump-game-vi/",
        source: "LeetCode",
        hint: "DP + monotonic deque of best scores within last k indices.",
      },
      {
        title: "Constrained Subsequence Sum",
        url: "https://leetcode.com/problems/constrained-subsequence-sum/",
        source: "LeetCode",
        hint: "Optimize the sliding DP maximum with a monotonic deque.",
      },
    ],
  },
};
