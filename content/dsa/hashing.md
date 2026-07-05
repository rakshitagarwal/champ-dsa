# Hashing

Hashing uses a hash table (hash map or hash set) to store and retrieve data with O(1) average time per operation. In algorithmic problem-solving, hashing is not a specific algorithm but a fundamental technique for eliminating nested loops, detecting duplicates in linear time, and grouping elements by a computed key. It is arguably the single most important tool for reducing time complexity from O(n²) to O(n) in problems involving pair sums, frequency counts, and existence checks.

A hash table works by applying a hash function to a key, producing an integer index that maps to a bucket in an internal array. Good hash functions distribute keys uniformly to minimize collisions. Most modern languages provide built-in hash map implementations (JavaScript's `Map` and `Set`, Python's `dict` and `set`, Java's `HashMap`, C++'s `unordered_map`) that handle collision resolution internally. When solving problems, you generally do not need to implement the hash table yourself — you use the standard library and focus on choosing the right key and deciding what value to store.

The difference between a hash set and a hash map is simple: a set stores only keys (membership), while a map stores key-value pairs (association). Use a set when you only need to know if something exists. Use a map when you need to associate data with each key — the most recent index, the frequency count, or a list of grouped items. JavaScript's `Set` and `Map` are both well-optimized and maintain insertion order, which can be useful for problems requiring ordering (like finding the first non-repeating character).

## When to use

- Checking for duplicates or existence of an element in O(1) average time (e.g., "Contains Duplicate")
- Counting frequency of elements in a collection (e.g., character frequency in a string)
- Finding complements: for each element, check if a target minus the element has been seen before (e.g., "Two Sum")
- Grouping elements by a computed key such as a sorted string, character frequency signature, or modular value (e.g., "Group Anagrams")
- Caching or memoization results to avoid redundant computation (e.g., DP with memoization)
- Storing prefix sums to identify subarrays with a target sum or property (e.g., "Subarray Sum Equals K")

## How it works

### Core concept

The fundamental operation in hashing-based solutions is: **for each element, check whether a related value already exists in the hash table before inserting the current element.** This "check-then-insert" pattern is the basis for complement-based problems (Two Sum) and duplicate detection. The order matters: you must check before inserting to prevent an element from matching with itself (e.g., nums = [3], target = 6 would incorrectly return the same index twice if you inserted before checking).

The hashing pattern also generalizes beyond simple existence checks. You can store the frequency of elements (how many times has this value appeared), the first or last index of an element, the running sum at a given index, or even a derived key like the sorted version of a string. This flexibility makes hashing the go-to tool for problems involving: pair/triplet searches, frequency analysis, grouping by a computed property, and detecting patterns in sequences (like repeated prefix sums indicating a zero-sum subarray).

Consider the Two Sum problem: you need to find two numbers that add up to a target. Without hashing, you would use nested loops checking every pair (O(n²)). With hashing, you store each number's value and index as you iterate. For each number `nums[i]`, you compute `complement = target - nums[i]` and check if that complement is already in the map. If it is, you have found the pair. If not, you store `nums[i]` and continue. This works because the complement must appear somewhere in the array, and if it has already been processed, it will be in the map.

The selection of the hash key is often the most creative part of the solution. For "Group Anagrams," the key is the sorted version of each string (e.g., "eat" and "tea" both sort to "aet"). For "Longest Consecutive Sequence," you first insert all numbers into a set, then for each number that has no left neighbor (num-1), you expand rightward counting consecutive elements. For "Subarray Sum Equals K," the key is the running prefix sum, and the value is the count of how many times that prefix sum has been seen.

### Step-by-step approach

1. **Choose the hash structure.** Use a `Set` when you only need existence checks (duplicates, membership). Use a `Map` when you need to associate a key with a value (index, frequency, list of indices).
2. **Initialize the structure.** For complement problems, pre-populate if needed (e.g., `map = {0: 1}` for prefix-sum problems). For simple existence, start with an empty set.
3. **Iterate through the input.** For each element, compute a derived value (complement, transformed key, frequency update) and check the hash structure.
4. **Check before inserting.** Query the hash structure for the derived value. If found, return or record the result immediately. This prevents the current element from matching with itself.
5. **Insert the current element.** Store the current element (or its computed key) in the hash structure for future lookups.
6. **Return the result** after the loop completes, or a sentinel value (empty array, -1, etc.) if no match was found.

### Complexity

- **Time:** O(n) average, O(n²) worst case — each element is processed once with O(1) average hash operations. The worst case occurs if many hash collisions degrade lookup to O(n), but well-designed language runtimes make this exceedingly rare in practice.
- **Space:** O(n) — in the worst case, the hash table stores all n elements. For problems where the keys come from a small alphabet (e.g., 26 lowercase letters), space is O(1) because the number of distinct keys is bounded.

```js
function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}
```

## Variations

- **Two-pass hashing:** First pass builds the hash table (e.g., counting frequencies), second pass uses it (e.g., finding the first non-repeating character). This is useful when the answer depends on global information that must be gathered before making decisions.
- **Frequency map with character keys:** For anagram or permutation problems, count character frequencies in one string, then decrement while scanning the other. If all counts reach zero, the strings are anagrams. This is more efficient than sorting both strings.
- **Rolling hash (Rabin-Karp):** For substring search, compute a hash of the pattern and slide a window over the text, updating the hash incrementally. This combines sliding window with hashing for O(n) average string matching, though worst-case is O(n·m) if hash collisions are common.
- **Constant-space hashing with arrays (counting sort):** When the key space is small (e.g., lowercase letters, digits 0-9), replace the hash map with a simple array indexed by character code or digit. This avoids hash overhead while keeping O(1) access, and is faster in practice.
- **Chained hashing (hash map of lists):** Store a list of values for each key. Used for grouping problems like "Group Anagrams" where the value is an array of all strings sharing the same sorted key, or "Group Shifted Strings" where the key is the character distance pattern.

## Edge cases

- **Empty input:** Return false, empty array, or 0 depending on the problem. The hash structure starts empty, and the loop body never executes. Always handle this as an early return or let the natural termination handle it.
- **Single element input:** For complement problems like Two Sum, a single element cannot form a pair. The check-then-insert pattern handles this correctly: you check the map (it is empty), then insert. No match is found, and the function returns the failure sentinel.
- **Duplicate values with index tracking:** When storing indices, decide whether to overwrite or keep the old index. For Two Sum II (sorted array), you may need the earliest index — overwriting is usually fine since any valid pair works. For problems requiring all pairs, store a list of indices per value.
- **Self-matching:** Without the "check before insert" ordering, a single element could match with itself (e.g., target = 6, nums = [3], complement = 3, map has 3 from previous iteration). Always check the map before inserting to avoid this.
- **Collisions and performance:** In adversarial settings (e.g., if the hash function is known), an attacker could craft inputs that cause O(n²) behavior. For coding interviews, this is not a concern. For production systems, use a cryptographic-quality hash or a language that randomizes hash seeds.
- **Large number of distinct keys:** The hash table's memory usage grows linearly with the number of keys. If memory is constrained, consider whether an in-place sorting approach might be acceptable despite higher time complexity.

## Practice problems

- [Two Sum](https://leetcode.com/problems/two-sum/) — The quintessential hashing problem. Check complement existence before inserting each element.
- [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) — Simplest possible use of a Set. Return true if any element appears more than once.
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/) — Use the sorted string as the hash key. All anagrams share the same sorted form.
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) — Insert all numbers into a Set, then iterate, expanding only from numbers with no left neighbor (O(n) despite nested loops).
- [Valid Anagram](https://leetcode.com/problems/valid-anagram/) — Frequency map with an array of size 26 (or hash map). Increment for s, decrement for t, check all zeros.
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) — Hash map for frequencies, then use bucket sort or a heap to extract the top k.
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) — Hash map stores prefix-sum frequencies. The running sum minus k gives the complementary prefix sum to look up.
- [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) — Frequency hash map combined with sliding window to find all anagram start indices.
