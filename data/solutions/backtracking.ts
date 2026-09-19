import type { SolutionGroup } from "./types";

export const BACKTRACKING_SOLUTIONS: SolutionGroup = {
  id: "backtracking",
  title: "Backtracking",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "permutations",
      title: "Permutations",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=42NUMtEj51g&ab_channel=AlgoJS",
      body: `\`used[i]\` so I do not pick the same index twice. Path length === n → save.

[Permutations](https://leetcode.com/problems/permutations/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "combinations",
      title: "Combinations",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=APn_6BwzCPw&t=4s&ab_channel=AlgoJS",
      body: `Start index se aage badho — wapas peeche mat jao, size k hote hi pakdo.

[Combinations](https://leetcode.com/problems/combinations/)

\`\`\`js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let result = [];
    
    function dfs(index, current){
        //base case
        if(current.length === k){
            result.push([...current]);
        }
        
        for(let i = index; i<=n; i++){
            current.push(i);
            //recurse
            dfs(i+1, current);
            //backtrack
            current.pop();
        }
    }
    
    dfs(1, []);
    
    return result;
};
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "subsets",
      title: "Subsets",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=CfneJequgxg&ab_channel=AlgoJS",
      body: `Every prefix of the path is a subset. Recurse with \`i + 1\` so I do not reuse an index.

[Subsets](https://leetcode.com/problems/subsets/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — subsets
// LC: https://leetcode.com/problems/subsets/
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
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "combination-sum-iii",
      title: "Combination Sum III",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=q2erhUSztxo&ab_channel=AlgoJS",
      body: `1-9 se k numbers jod ke n banao — start index badhao taaki repeat na ho.

[Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)

\`\`\`js
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */

var combinationSum3 = function(k, n) {
    
    let result = [];
    
    function dfs(index, current, total){
        
        if(total < 0 || current.length > k) return;
        
        if(total === 0 && current.length === k){
            result.push([...current])
        }
        
        for(let i = index; i<=9; i++){
            current.push(i);
            dfs(i+1, current, total-i);
            current.pop();
        }
        
    }
    dfs(1, [], n);
    
    return result;
    
    
};
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "subsets-ii",
      title: "Subsets II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=LchF4SUbajg&ab_channel=AlgoJS",
      body: `Duplicate numbers ke saath subsets, duplicate subsets avoid karo. Sort karke \`i>start && nums[i]==nums[i-1]\` skip karo.

[Subsets II](https://leetcode.com/problems/subsets-ii/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "combination-sum",
      title: "Combination Sum",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=2u_l4GM6dKw&ab_channel=AlgoJS",
      body: `I may reuse the same coin, so I recurse on \`i\` not \`i + 1\`. Stop when remain is 0 (save) or negative.

[Combination Sum](https://leetcode.com/problems/combination-sum/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "n-queens",
      title: "N-Queens",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=OYQMjTCSgDM&ab_channel=AlgoJS",
      body: `One queen per row. \`cols\`, \`diag\`, \`anti\` sets. Place, recurse next row, remove.

[N-Queens](https://leetcode.com/problems/n-queens/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "n-queens-ii",
      title: "N-Queens II",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=kJtv0x1kV8g&ab_channel=AlgoJS",
      body: `Sirf ginti chahiye — board mat banao, columns/diagonals sets rakho, count badhao.

[N-Queens II](https://leetcode.com/problems/n-queens-ii/)

\`\`\`js
var totalNQueens = function(n) {
    
    let col = new Set();
    let posDiag = new Set();
    let negDiag = new Set();
    
    let count = 0;
    
    //helper functions
    const isValid = (r, c) => !(col.has(c) || posDiag.has(r+c) || negDiag.has(r-c));
    
    const addQueen = (r, c) => {
        col.add(c);
        posDiag.add(r+c);
        negDiag.add(r-c);
    }
    
    const removeQueen = (r, c) => {
        col.delete(c);
        posDiag.delete(r+c);
        negDiag.delete(r-c);
    }
    
    //backtracking function
    
    function recurse(row){
        //base case
        if(row === n){
            count++;
        }
        
        for(let col = 0; col < n; col++){
            if(isValid(row, col)){
                addQueen(row, col);
                count = recurse(row + 1, count);
                removeQueen(row, col);
            }
        }
        return count;
    }
    return recurse(0);
    
};
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "sudoku-solver",
      title: "Sudoku Solver",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=3nZ45g5yhG0&ab_channel=AlgoJS",
      body: `Khaali cell dhoondo, 1-9 try karo — row/col/box me valid ho to aage badho, nahi to wapas.

[Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)

\`\`\`js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

const EMPTY = ".";

const possibleNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

var solveSudoku = function(board) {
    let emptySpaces = [];
    
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            if(board[i][j] === EMPTY){
                emptySpaces.push({row: i, col: j})
            }
        }
    }
    
    function recurse(emptySpaceIndex){
        
        //base case - end
        if(emptySpaceIndex >= emptySpaces.length){
            return true;
        }
        
        const {row, col} = emptySpaces[emptySpaceIndex];
        
        for(let i = 0; i < possibleNumbers.length; i++){
            let num = possibleNumbers[i];
            
            if(isValid(num, row, col, board)){
                board[row][col] = num;
                
                if(recurse(emptySpaceIndex + 1)){
                    return true;
                }
                
                board[row][col] = EMPTY;
            }
        }
        
        return false;
        
    }
    
    recurse(0);
}

function isValid(number, row, col, board){
    
    //check col, row, 3x3 matrix
    
    for(let i = 0; i < board.length; i++){
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + (i % 3);
        
        if(board[row][i] === number || board[i][col] === number || board[boxRow][boxCol] === number){
            return false;
        }
    }
    
    return true;
}
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "letter-combinations-of-a-phone-number",
      title: "Letter Combinations of a Phone Number",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=40L6LFHeaIs&ab_channel=AlgoJS",
      body: `Phone digits se saare letter combos. Har digit ke letters pe loop.

[Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

\`\`\`js
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
\`\`\``,
    },
      ],
    },
  ],
};
