import type { SolutionGroup } from "./types";

export const TRIE_SOLUTIONS: SolutionGroup = {
  id: "trie",
  title: "Trie",
  subs: [
    {
      title: "Prefix / Word Search",
      topics: [
    {
      id: 208,
      lcSlug: "implement-trie-prefix-tree",
      title: "Implement Trie (Prefix Tree)",
      diff: "Medium",
      body: `\`insert\` walks/creates edges. \`search\` needs \`end\`. \`startsWith\` only needs the walk to succeed.

[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

\`\`\`js
// Hinglish: trie walk — ek-ek step comment dekho
// Trie — insert / search / prefix
// LC: https://leetcode.com/problems/implement-trie-prefix-tree/
function Trie() {
  // Hinglish: step 1 — base case check karo
  this.root = { kids: Object.create(null), end: false };
}
Trie.prototype.insert = function (word) {
  let cur = this.root;
  for (const ch of word) {
    if (!cur.kids[ch]) cur.kids[ch] = { kids: Object.create(null), end: false };
    cur = cur.kids[ch];
  }
  cur.end = true;
};
Trie.prototype.search = function (word) {
  let cur = this.root;
  for (const ch of word) {
    if (!cur.kids[ch]) return false;
    cur = cur.kids[ch];
  }
  return !!cur.end;
};
Trie.prototype.startsWith = function (prefix) {
  let cur = this.root;
  for (const ch of prefix) {
    if (!cur.kids[ch]) return false;
    cur = cur.kids[ch];
  }
  return true;
};
\`\`\``,
    },
    {
      id: 211,
      lcSlug: "design-add-and-search-words-data-structure",
      title: "Design Add and Search Words Data Structure",
      diff: "Medium",
      body: `Trie me \`.\` wildcard search bhi chahiye. DFS se har child try karo.

[Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

\`\`\`js
// Hinglish: trie walk — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-add-and-search-words-data-structure/
function WordDictionary(){ this.root={kids:{}, end:false}; }
WordDictionary.prototype.addWord=function(word){
  // Hinglish: insert
  let cur=this.root;
  for(const ch of word){ if(!cur.kids[ch]) cur.kids[ch]={kids:{}, end:false}; cur=cur.kids[ch]; }
  cur.end=true; // Hinglish: khatam
};
WordDictionary.prototype.search=function(word){
  // Hinglish: DFS
  const dfs=(node,i)=>{
    if(i===word.length) return node.end;
    const ch=word[i];
    if(ch==='.'){ for(const kid in node.kids) if(dfs(node.kids[kid], i+1)) return true; return false; } // Hinglish: har rasta try
    if(!node.kids[ch]) return false;
    return dfs(node.kids[ch], i+1);
  };
  return dfs(this.root,0);
};
\`\`\``,
    },
    {
      id: 212,
      lcSlug: "word-search-ii",
      title: "Word Search II",
      diff: "Hard",
      body: `Build a trie of all words. DFS the board. Follow trie edges. When \`end\` is set, I found a word — push it and clear \`end\` so I do not add twice. Unmark the cell when I backtrack.

[Word Search II](https://leetcode.com/problems/word-search-ii/)

\`\`\`js
// Hinglish: trie walk — ek-ek step comment dekho
// Trie + DFS on the grid
// LC: https://leetcode.com/problems/word-search-ii/
function findWords(board, words) {
  // Hinglish: step 1 — base case check karo
  const root = { kids: Object.create(null), word: null };
  for (const w of words) {
    let cur = root;
    for (const ch of w) {
      if (!cur.kids[ch]) cur.kids[ch] = { kids: Object.create(null), word: null };
      cur = cur.kids[ch];
    }
    cur.word = w;
  }
  const rows = board.length, cols = board[0].length, ans = [];
  const dfs = (r, c, node) => {
    const ch = board[r][c];
    const next = node.kids[ch];
    if (!next) return;
    if (next.word) {
      ans.push(next.word);
      next.word = null;
    }
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || board[nr][nc] === "#") continue;
      dfs(nr, nc, next);
    }
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dfs(r, c, root);
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 648,
      lcSlug: "replace-words",
      title: "Replace Words",
      diff: "Medium",
      body: `Trie me roots daalo — har word ka sabse chhota prefix dhoondo, mile to badlo.

[Replace Words](https://leetcode.com/problems/replace-words/)

\`\`\`js
// Hinglish: chhota prefix dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/replace-words/
function replaceWords(dictionary, sentence) {
  // Hinglish: step 1 — trie banao
  const root = {};
  for (const w of dictionary) {
    let node = root;
    for (const ch of w) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.end = true;
  }
  const out = [];
  for (const w of sentence.split(" ")) {
    let node = root, found = "";
    for (const ch of w) {
      if (!node[ch] || node.end) break; // Hinglish: rasta toota ya root mila
      node = node[ch];
      found += ch;
    }
    out.push(node.end ? found : w); // Hinglish: mila to badlo
  }
  return out.join(" ");
}
\`\`\``,
    },
    {
      id: 677,
      lcSlug: "map-sum-pairs",
      title: "Map Sum Pairs",
      diff: "Medium",
      body: `Trie me values jodo — prefix node ke neeche sab jod do. Simple DFS sum karo.

[Map Sum Pairs](https://leetcode.com/problems/map-sum-pairs/)

\`\`\`js
// Hinglish: neeche sab jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/map-sum-pairs/
function MapSum() {
  // Hinglish: step 1 — root lo
  this.root = {};
}
MapSum.prototype.insert = function (key, val) {
  let node = this.root;
  for (const ch of key) {
    if (!node[ch]) node[ch] = {};
    node = node[ch];
  }
  node.val = val; // Hinglish: overwrite ho jayega
};
MapSum.prototype.sum = function (prefix) {
  let node = this.root;
  for (const ch of prefix) {
    if (!node[ch]) return 0; // Hinglish: rasta hi nahi
    node = node[ch];
  }
  let ans = 0;
  const dfs = (nd) => {
    if (nd.val !== undefined) ans += nd.val; // Hinglish: value mili
    for (const k of Object.keys(nd)) {
      if (k !== "val") dfs(nd[k]);
    }
  };
  dfs(node);
  return ans;
};
\`\`\``,
    },
    {
      id: 1397,
      lcSlug: "search-suggestions-system",
      title: "Search Suggestions System",
      diff: "Medium",
      body: `Products sort karo — har prefix pe binary search se start dhoondo, 3 uthao.

[Search Suggestions System](https://leetcode.com/problems/search-suggestions-system/)

\`\`\`js
// Hinglish: prefix se 3 uthao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/search-suggestions-system/
function suggestedProducts(products, searchWord) {
  // Hinglish: step 1 — sort karo
  products.sort();
  const out = [];
  let lo = 0;
  for (let i = 0; i < searchWord.length; i++) {
    const pre = searchWord.slice(0, i + 1);
    while (lo < products.length && products[lo] < pre) lo++; // Hinglish: aage badhao
    const row = [];
    for (let j = lo; j < Math.min(lo + 3, products.length); j++) {
      if (products[j].startsWith(pre)) row.push(products[j]); // Hinglish: match wale lo
      else break;
    }
    out.push(row);
  }
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};
