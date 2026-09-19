# Backtracking

**Definition:** Backtracking ek systematic DFS technique hai state-space tree par — hum ek choice try karte hain, aage recurse karte hain, aur jaise hi pata chale ki ye rasta valid solution tak nahi ja sakta, wapas undo (backtrack) kar dete hain. Ye brute force hai par pruning se tez.

**When to use:** Jab saare subsets / permutations / combinations chahiye, ya N-Queens jaise placements, ya grid/word search jisme constraint check karna ho. Agar soch "ek choice try karo, kaam kare to rakho warna hatao" hai to yehi pattern hai.

**How it works:** Recursive `choose → explore → unchoose` (push → recurse → pop). Ek `path` rakho current partial solution ke liye aur `ans` me save karo. Har call me check karo — valid hai to record, invalid hai to prune/return, fir loop se next choices try karo. Time aksar exponential `O(k^n)` par pruning branches kaat deta hai; space `O(n)` depth + path.

## Study notes

- **Template:** `path.push` → recurse → `path.pop` (never forget undo).
- **Variants:** subsets (include/skip), permutations (used[]), combinations (start index), grid DFS (mark/unmark cell).
- **Prune early** when remain < 0 / placement illegal.
- **Duplicates:** sort + skip same value at same depth (`i>start && nums[i]===nums[i-1]`).
- **Traps:** mutate path into `ans` without `[...path]` copy; wrong start index (reuse vs not).
- **Checklist:** what is a choice? when is path complete? how undo?

```js
// Backtracking skeleton — choose / explore / unchoose
// take a choice, recurse forward, then undo (backtrack)
function backtrack(start, path) {
  ans.push([...path]); // ya: if (isSolution(path)) ans.push([...path]); return

  // prune — this branch cannot lead to a valid solution
  // if (!isValid(path)) return;

  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);      // choose — take nums[i] into current path
    backtrack(i + 1, path);  // explore — recurse (i+1 = no reuse; i = reuse allowed)
    path.pop();              // unchoose — undo choice before next branch
  }
}
const ans = [];
backtrack(0, []);
```
## Subsets

Every prefix of the path is a subset. Recurse with `i + 1` so I do not reuse an index.

[Subsets](https://leetcode.com/problems/subsets/)

```js
// Time: O(n·2ⁿ) · Space: O(n)
// include or skip each element
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — subsets
function subsets(nums) {
  const ans = [];
  const dfs = (start, path) => {
    ans.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // Hinglish: choice liya
      dfs(i + 1, path);
      path.pop(); // Hinglish: wapas hataya (backtrack)
    }
  };
  dfs(0, []);
  return ans;
}
```

## Combination Sum

I may reuse the same coin, so I recurse on `i` not `i + 1`. Stop when remain is 0 (save) or negative.

[Combination Sum](https://leetcode.com/problems/combination-sum/)

```js
// Time: O(n·2ⁿ) · Space: O(target)
// choose → explore → unchoose; reuse allowed via same index
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let result = [];
    
    function dfs(index, currentVal, arr){
        
        if(currentVal < 0) return;
        if(currentVal === 0){
            result.push([...arr]);
        }
        
        for(let i = index; i < candidates.length; i++){
            arr.push(candidates[i]);
            dfs(i, currentVal - candidates[i], arr);
            arr.pop();
        }
    }
    dfs(0, target, []);
    
    return result;
    
};
```

## Permutations

`used[i]` so I do not pick the same index twice. Path length === n → save.

[Permutations](https://leetcode.com/problems/permutations/)

```js
// Time: O(n·n!) · Space: O(n)
// choose → explore → unchoose every unused index
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums, arr = [], res = []) {
    
    //base case
    if(nums.length === 0) res.push([...arr]);
    
    for(let i = 0; i < nums.length; i++){
        let rest = nums.filter((n, index) => index !== i);
        arr.push(nums[i]);
        permute(rest, arr, res);
        arr.pop();
    }
    
    return res;
    
};
```

## Generate Parentheses

I can add `(` if I still have some. I can add `)` if closes < opens. When the string length is `2n`, save.

[Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

```js
// Time: O(n) · Space: O(n)
// Add '(' if budget left; add ')' only if it would close an unmatched '('
function generateParenthesis(n) {
  const ans = [];
  const dfs = (s, open, close) => {
    if (s.length === 2 * n) {
      ans.push(s); // balanced string of length 2n
      return;
    }
    if (open < n) dfs(s + "(", open + 1, close); // open another pair
    if (close < open) dfs(s + ")", open, close + 1); // close only when valid
  };
  dfs("", 0, 0);
  return ans;
}
```

## Word Search

DFS from every cell. Mark the cell, try 4 directions, unmark. If I consume the whole word, true.

[Word Search](https://leetcode.com/problems/word-search/)

```js
// Time: O(m·n·4^L) · Space: O(L)
// DFS from each cell; mark visited
// Backtracking — grid DFS
var exist = function(board, word) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) return true;
    }
  }
  return false;

  function dfs(r, c, i) {
    if (word.length === i) return true;
    if (
      r >= board.length ||
      r < 0 ||
      c < 0 ||
      c >= board[0].length ||
      board[r][c] !== word[i]
    )
      return false;

    board[r][c] = "#";

    if (
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1)
    )
      return true;

    board[r][c] = word[i];
    return false;
  }
};
```

## N-Queens

One queen per row. `cols`, `diag`, `anti` sets. Place, recurse next row, remove.

[N-Queens](https://leetcode.com/problems/n-queens/)

```js
// Time: O(n!) · Space: O(n)
var solveNQueens = function(n) {
    
    if(n.length === 1) return [["Q"]];
    
    let col = new Set();
    let posDiag = new Set();
    let negDiag = new Set();
    
    let res = [];
    let board = Array.from(Array(n), () => new Array(n).fill("."));
    
    //helper functions
    const isValid = (r, c) => !(col.has(c) || posDiag.has(r+c) || negDiag.has(r-c));
    
    const addQueen = (r, c) => {
        col.add(c);
        posDiag.add(r+c);
        negDiag.add(r-c);
        board[r][c] = "Q";
    }
    
    const removeQueen = (r, c) => {
        col.delete(c);
        posDiag.delete(r+c);
        negDiag.delete(r-c);
        board[r][c] = ".";
    }
    
    //recursive backtracking function
    function recurse(row){
        
        //base case
        if(row === n){
            res.push([...board].map((row) => row.join("")));
        }
        
        //recurrence relation
        for(let col = 0; col < n; col++){
            if(isValid(row, col)){
                addQueen(row, col);
                //recurse
                recurse(row+1);
                //backtrack
                removeQueen(row, col);
            }
        }
        
    }
    
    recurse(0);
    return res;
    
};
```

## Subsets II (Duplicates)

Duplicate numbers ke saath subsets, duplicate subsets avoid karo. Sort karke `i>start && nums[i]==nums[i-1]` skip karo.

[Subsets II](https://leetcode.com/problems/subsets-ii/)

```js
// Time: O(n·2ⁿ) · Space: O(n)
// skip duplicates after sort
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    let res = [[]];
    
    nums.sort((a,b) => a-b);
    
    function dfs(nums, res, currArr, start){
        for(let i = start; i < nums.length; i++){
            if(i === start || nums[i] !== nums[i-1]){
                currArr.push(nums[i]);
                res.push([...currArr]);
                dfs(nums, res, currArr, i+1);
                currArr.pop();
            }
        }
    }
    dfs(nums, res, [], 0);
    
    return res;
};
```

## Combination Sum II

Har coin ek baar, duplicate combos nahi. Sort + skip `i>start && same`.

[Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)

```js
// Time: O(n) · Space: O(n)
// Each number once; sort + skip dupes like subsets II
function combinationSum2(candidates, target) {
  candidates.sort((a,b)=>a-b);
  const ans=[];
  const dfs=(start, remain, path)=>{
    if(remain===0){ ans.push([...path]); return; }
    if(remain<0) return;
    for(let i=start;i<candidates.length;i++){
      if(i>start && candidates[i]===candidates[i-1]) continue;
      path.push(candidates[i]);
      dfs(i+1, remain-candidates[i], path); // i+1: each coin used at most once
      path.pop();
    }
  };
  dfs(0, target, []);
  return ans;
}
```

## Palindrome Partitioning

String ko tukdon me kaato jahan har tukda palindrome ho. Backtrack se cut try karo.

[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

```js
// Time: O(n) · Space: O(n)
// Try every palindrome prefix; recurse on the suffix
function partition(s) {
  const isPal=(l,r)=>{ while(l<r){ if(s[l++]!==s[r--]) return false; } return true; };
  const ans=[];
  const dfs=(start, path)=>{
    if(start===s.length){ ans.push([...path]); return; }
    for(let end=start; end<s.length; end++){
      if(!isPal(start,end)) continue; // cut [start..end] must be palindrome
      path.push(s.slice(start,end+1));
      dfs(end+1, path); // partition remainder
      path.pop();
    }
  };
  dfs(0, []);
  return ans;
}
```

## Letter Combinations of a Phone Number

Phone digits se saare letter combos. Har digit ke letters pe loop.

[Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

```js
// Time: O(4ⁿ·n) · Space: O(n)
// map digit → letters; build all suffixes
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits, start = 0) {
    
    const map = {
        '2': ['a','b','c'],
        '3': ['d','e','f'],
        '4': ['g','h','i'],
        '5': ['j','k','l'],
        '6': ['m','n','o'],
        '7': ['p','q','r', 's'],
        '8': ['t','u','v'],
        '9': ['w','x','y','z'],
    };
    
    if(digits === "") return [];
    if(start >= digits.length) return [''];
    
    const digit = digits[start];
    const letters = map[digit];
    const combinations = [];
    
    const suffixCombinations = letterCombinations(digits, start + 1);
    
    for(const letter of letters){
        for(const suffix of suffixCombinations){
            combinations.push(letter + suffix);
        }
    }
    
    return combinations;
    
};
```
