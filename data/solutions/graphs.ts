import type { SolutionGroup } from "./types";

export const GRAPHS_SOLUTIONS: SolutionGroup = {
  id: "graphs",
  title: "Graphs",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "toeplitz-matrix",
      title: "Toeplitz Matrix",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=8fwKTxlBDsE&ab_channel=AlgoJS",
      body: `Har diagonal ek jaisi honi chahiye — har cell apne upar-left se milao.

[Toeplitz Matrix](https://leetcode.com/problems/toeplitz-matrix/)

\`\`\`js
// Time: O(m·n) · Space: O(1)
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function(matrix) {
    for(let i = 0; i < matrix.length - 1; i++){
        for(let j = 0; j < matrix[0].length - 1; j++){
            if(matrix[i][j] !== matrix[i+1][j+1]){
                return false;
            }
        }
    }
    
    return true;
};
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "clone-graph",
      title: "Clone Graph",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=RhyF7kGcHbw&ab_channel=AlgoJS",
      body: `Map old node → new node. DFS: if I already cloned it, return that. Else create, then clone neighbors.

[Clone Graph](https://leetcode.com/problems/clone-graph/)

\`\`\`js
// Time: O(n+e) · Space: O(n)
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    let visited = {};
    
    function dfs(node){
        //base cases
        if(!node) return node;
        if(!!visited[node.val]) return visited[node.val];
        
        let root = new Node(node.val);
        visited[node.val] = root;
        
        //recurrence relation
        for(let neighbor of node.neighbors){
            root.neighbors.push(dfs(neighbor))
        }
        
        return root;
    }
    
    return dfs(node);
};
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "course-schedule",
      title: "Course Schedule",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=FN9Q9DmVH_Y&t=230s&ab_channel=AlgoJS",
      body: `Edge \`b → a\` means b before a. Count in-degree. Queue everyone at 0. Each taken course unlocks neighbors. If I took all, no cycle.

[Course Schedule](https://leetcode.com/problems/course-schedule/)

\`\`\`js
// Time: O(v+e) · Space: O(v+e)
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    
    let adjList = {};
    let visited = new Set();
    
    for(let [a,b] of prerequisites){
        if(!adjList[a]){
            adjList[a] = [b];
        } else {
            adjList[a].push(b);
        }
    }
    
    function dfs(curr){
        
        if(visited.has(curr)) return false;
        
        if(adjList[curr] === []) return true;
        
        visited.add(curr);
        
        if(adjList[curr]){
            for(let neigh of adjList[curr]){
                if(!dfs(neigh)){
                    return false;
                }
            }
        }
        
        visited.delete(curr);
        adjList[curr] = [];
        return true;
        
    }
    
    for(let key in adjList){
        
        if(!dfs(key)){
            return false;
        }
    }
    
    return true;
};
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "longest-consecutive-sequence",
      title: "Longest Consecutive Sequence",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=W61fIEQ9KhE&ab_channel=AlgoJS",
      body: `Put everything in a set. Only start counting at a number that has no \`n - 1\`. Then walk \`n + 1\`, \`n + 2\`, … That way each number is touched about twice, not n².

[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

\`\`\`js
// Time: O(n) · Space: O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let set = new Set(nums);
    let streak = 0;
    
    for(let num of set){
        if(set.has(num-1)) continue;
        let currStreak = 1;
        
        while(set.has(num+1)){
            currStreak++;
            num++;
        }
        streak = Math.max(streak, currStreak);
    }
    
    return streak;
};
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "find-if-path-exists-in-graph",
      title: "Find If Path Exists in Graph",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=qhmdBndZnk0&t=3s&ab_channel=AlgoJS",
      body: `Graph banao, source se DFS/BFS chalao — destination mile to true.

[Find If Path Exists in Graph](https://leetcode.com/problems/find-if-path-exists-in-graph/)

\`\`\`js
// Time: O(v+e) · Space: O(v)
var validPath = function(n, edges, source, destination) {
    let graph = new Map();
    let visited = new Set();
    
    for(let [v,e] of edges){
        if(graph.has(v)){
            graph.get(v).push(e);
        }else {
            graph.set(v, [e]);
        }
        if(graph.has(e)){
            graph.get(e).push(v);
        }else {
            graph.set(e, [v]);
        }
    }
    
    function dfs(vertex){
        visited.add(vertex);
        
        let neighbours = graph.get(vertex);
        
        if(neighbours && neighbours.length > 0){
            for(let i = 0; i<neighbours.length; i++){
                if(!visited.has(neighbours[i])){
                    dfs(neighbours[i])
                }
            }
        }
    }
    
    dfs(source);
    return visited.has(destination)
};
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "number-of-connected-components-in-an-undirected-graph",
      title: "Number of Connected Components in an Undirected Graph",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=DRwgXbE1ZSk&ab_channel=AlgoJS",
      body: `DSU se jodo, groups gino. Har successful union ek component kam karta hai.

[Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(v+e) · Space: O(v)
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    let count = 0;
    let graph = {};
    
    for(let i = 0; i < n; i++){
        graph[i] = [];
    }
    
    for(let [u, v] of edges){
        graph[u].push(v);
        graph[v].push(u);
    }
    
    let visited = new Set();
    
    function dfs(node){
        if(visited.has(node)) return 0;
        visited.add(node);
        
        for(let n of graph[node]){
            dfs(n);
        }
        
        return 1;
    }
    
    for(let key in graph){
        key = parseInt(key);
        count += dfs(key);
    }
    
    return count;
};
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "all-paths-from-source-to-target",
      title: "All Paths From Source To Target",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=UBtG3KQJ-zk&ab_channel=AlgoJS",
      body: `DAG me saare raste nikalo — path saath le jao, target pe copy rakho, wapas aao.

[All Paths From Source To Target](https://leetcode.com/problems/all-paths-from-source-to-target/)

\`\`\`js
// Time: O(2ⁿ·n) · Space: O(n)
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
    let res = [];
    
    function backtrack(currNode, currArr){
        currArr.push(currNode);
        
        if(currNode === graph.length-1){
            res.push([...currArr]);
        }
        
        let neighbours = graph[currNode];
        
        for(let n of neighbours){
            backtrack(n, currArr);
        }
        
        currArr.pop();
    }
    backtrack(0, []);
    
    return res;
};
\`\`\``,
    },
    {
      id: 7,
      lcSlug: "number-of-provinces",
      title: "Number of Provinces",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=LMxTM4QaCgM&ab_channel=AlgoJS",
      body: `Union-Find se bhi provinces gin sakte hain. Connected cities ko union karo.

[Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

\`\`\`js
// Time: O(n²) · Space: O(n)
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    
    let adj = {};
    
    for(let i = 0; i < isConnected.length; i++){
        for(let j = 0; j < isConnected[0].length; j++){
            
            let val = isConnected[i][j];
            
            if(val === 1){
                if(!adj[i]){
                    adj[i] = [j];
                } else {
                    adj[i].push(j);
                }
            }
            
        }
    }
    
    let visited = new Set();
    let count = 0;
    
    for(let key in adj){
        let keyNum = parseInt(key);
        count += dfs(keyNum);
    }
    
    function dfs(currNode){
        if(visited.has(currNode)) return 0;
        visited.add(currNode);
        
        let neighbours = adj[currNode];
        
        for(let n of neighbours){
            dfs(n);
        }
        
        return 1;
    }
    
    return count;
    
};
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "graph-valid-tree",
      title: "Graph Valid Tree",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=o53e36VSBSo&t=358s&ab_channel=AlgoJS",
      body: `Tree ke do niyam — edges exactly n-1 hon, aur sab connected hon. Pehle gino, phir DFS se check karo.

[Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Time: O(v+e) · Space: O(v)
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    let adjList = {};
    
    for(let i = 0; i < n; i++){
        adjList[i] = [];
    }
    
    for(let [a,b] of edges){
        adjList[a].push(b);
        adjList[b].push(a);
    }
    
    let visited = new Set();
    
    function checkCycle(current, parent){
        
        visited.add(current);
        let neighbours = adjList[current];
        
        if(neighbours.length){
            for(let neigh of neighbours){
                if(visited.has(neigh)){
                    if(neigh !== parent) return true; //there is a cycle
                } else {
                    if(checkCycle(neigh, current)){
                        return true;
                    }
                }
            }
        }
        
        return false;
        
    }
    
    if(checkCycle(0, -1)) return false;
    
    for(let i = 0; i < n; i++){
        if(!visited.has(i)){
            return false;
        }
    }
    
    return true;
    
};
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "open-the-lock",
      title: "Open The Lock",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=0YNzXi_bnl4&ab_channel=AlgoJS",
      body: `0000 se BFS chalao — har wheel aage-peeche ghumao, deadends skip karo, target mile to steps lao.

[Open The Lock](https://leetcode.com/problems/open-the-lock/)

\`\`\`js
// Time: O(10⁴) · Space: O(10⁴)
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    let deadendSet = new Set(deadends);
    let visited = new Set(["0000"]);
    let queue = [["0000", 0]];
    
    while(queue.length){
        let [current, count] = queue.shift();
        
        if(current === target) return count;
        
        if(deadendSet.has(current)) continue;
        
        // create all possible combinations
        for(let combo of possibleCombo(current)){
            if(!visited.has(combo)){
                visited.add(combo);
                queue.push([combo, count+1]);
            }
        }
    }
    
    return -1;
};

const possibleCombo = (str) => {
    // Possible turns 1000, 0100, 0010, 0001, 9000, 0900, 0090, 0009
    let ans = [];
    
    for(let i = 0; i < str.length; i++){
        ans.push(str.slice(0,i) + ((+str[i] + 1) % 10) + str.slice(i+1));
        ans.push(str.slice(0,i) + ((+str[i] + 9) % 10) + str.slice(i+1));
    }
    
    return ans;
}
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "alien-dictionary",
      title: "Alien Dictionary",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=Dwxu9fA7NJ0",
      body: `Padosi words se order nikalo (pehla alag char), phir Kahn topo sort. Galat prefix order mile to invalid.

[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)

\`\`\`js
// Time: O(C) · Space: O(1)
function findOrder(dict, N, K) {
    let adj = {};
    
    dict.forEach(word => {
        for(let char of word){
            if(!adj[char]){
                adj[char] = new Set();
            }
        }
    });
    
    // build graph
    for(let i = 0; i < dict.length-1; i++){
        let w1 = dict[i];
        let w2 = dict[i+1];
        let minLen = Math.min(w1.length, w2.length);
        for(let j = 0; j < minLen; j++){
            if(w1[j] !== w2[j]){
                adj[w1[j]].add(w2[j]);
                break;
            }
        }
    }
    
    let state = {};
    let res = [];
    const VISIT_STATE = {
        VISITING: 1,
        VISITED: 2,
    }
    
    // Perform topological sort
    function dfs(char) {
        
        if(state[char] === VISIT_STATE.VISITING) {
            return true; // cycle
        }
        
        if(state[char] === VISIT_STATE.VISITED){
            return false;
        }
        
        state[char] = VISIT_STATE.VISITING;
        
        for(let neighChar of adj[char]){
            if(dfs(neighChar)){
                // cycle
                return true;
            }
        }
        
        state[char] = VISIT_STATE.VISITED;
        res.push(char);
        return false;
        
    }
    
    for(let char in adj){
        if(!state[char] && dfs(char)){
            return "";
        }
    }
    
    res.reverse();
    return res.join('');
}
\`\`\``,
    },
      ],
    },
  ],
};
