# Range Queries

**Definition:** Range-query problems me point update ("i par v add") aur range query ("[l..r] ka sum") dono `O(log n)` me chahiye. Prefix sums update par fail (`O(n)` rebuild). **Fenwick Tree (BIT)** aur **Segment Tree** ye fix karte hain; merge-sort counting "right me kitne chhote" gin leta hai.

**When to use:** Baar-baar `update(i, delta)` + `query(l,r)` mix ho; after self smaller count / reverse pairs; updates ke saath range min.

**How it works:** Fenwick `bit[1..n]` me `add(i)` `i += i&-i` se upar jata hai aur `sum(i)` `i -= i&-i` se neeche; range = `sum(r)-sum(l-1)`. Merge-sort count: jab right ka element baaki left se pehle place ho to wo unse chhota hai. Time `O(log n)` per op, space `O(n)`.

```js
// Fenwick (BIT) skeleton — 1-based
// Hinglish: add upar jao, sum neeche aao
function bitAdd(bit, i, v) { for (; i < bit.length; i += i & -i) bit[i] += v; }
function bitSum(bit, i) { let s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }
const bit = Array(n + 1).fill(0);
// range [l..r] = bitSum(bit, r) - bitSum(bit, l-1)

// Count smaller after self — merge-sort sketch
// Hinglish: right wala chhota to left ke baaki sabse chhota
// during merge: if right[j] < left[i], count left.remaining += 1
```
## Range Sum Query Mutable

Fenwick on the array. Update = delta at index. Range = prefix(right) - prefix(left - 1).

[Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/)

```js
// Hinglish: BIT / merge count — ek-ek step comment dekho
// Fenwick — point add, range sum
// LC: https://leetcode.com/problems/range-sum-query-mutable/
function NumArray(nums) {
  // Hinglish: step 1 — base case check karo
  this.n = nums.length;
  this.nums = nums.slice();
  this.bit = Array(this.n + 1).fill(0);
  for (let i = 0; i < this.n; i++) this._add(i + 1, nums[i]);
}
NumArray.prototype._add = function (i, v) {
  for (; i <= this.n; i += i & -i) this.bit[i] += v;
};
NumArray.prototype._sum = function (i) {
  let s = 0;
  for (; i > 0; i -= i & -i) s += this.bit[i];
  return s;
};
NumArray.prototype.update = function (index, val) {
  this._add(index + 1, val - this.nums[index]);
  this.nums[index] = val;
};
NumArray.prototype.sumRange = function (left, right) {
  return this._sum(right + 1) - this._sum(left);
};
```

## Count of Smaller Numbers After Self

Merge sort the indexes. When I take a value from the right half, it is smaller than whatever is still waiting on the left — those left indexes each gain +1. I count while merging.

[Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)

```js
// Hinglish: BIT / merge count — ek-ek step comment dekho
// Merge sort — count right-side smaller
// LC: https://leetcode.com/problems/count-of-smaller-numbers-after-self/
function countSmaller(nums) {
  // Hinglish: step 1 — base case check karo
  const n = nums.length;
  const idx = Array.from({ length: n }, (_, i) => i);
  const ans = Array(n).fill(0);
  const merge = (l, r) => {
    if (r - l <= 1) return;
    const m = (l + r) >> 1;
    merge(l, m);
    merge(m, r);
    const tmp = [];
    let i = l, j = m, rightTaken = 0;
    while (i < m && j < r) {
      if (nums[idx[j]] < nums[idx[i]]) {
        tmp.push(idx[j++]);
        rightTaken++;
      } else {
        ans[idx[i]] += rightTaken;
        tmp.push(idx[i++]);
      }
    }
    while (i < m) {
      ans[idx[i]] += rightTaken;
      tmp.push(idx[i++]);
    }
    while (j < r) tmp.push(idx[j++]);
    for (let k = 0; k < tmp.length; k++) idx[l + k] = tmp[k];
  };
  merge(0, n);
  return ans;
}
```

## Range Sum Query 2D - Immutable

2D prefix sum `pref[i+1][j+1]`. Range sum inclusion-exclusion se O(1).

[Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)

```js
// Hinglish: BIT / merge count — ek-ek step comment dekho
// LC: https://leetcode.com/problems/range-sum-query-2d-immutable/
function NumMatrix(matrix){
  // Hinglish: 2D prefix banao
  const R=matrix.length, C=matrix[0].length;
  this.pref=Array.from({length:R+1},()=>Array(C+1).fill(0));
  for(let i=0;i<R;i++) for(let j=0;j<C;j++){
    this.pref[i+1][j+1]=matrix[i][j]+this.pref[i][j+1]+this.pref[i+1][j]-this.pref[i][j]; // Hinglish: 2D jod
  }
}
NumMatrix.prototype.sumRegion=function(r1,c1,r2,c2){
  // Hinglish: inclusion-exclusion
  return this.pref[r2+1][c2+1]-this.pref[r1][c2+1]-this.pref[r2+1][c1]+this.pref[r1][c1];
};
```

## Reverse Pairs

`i<j` aur `nums[i] > 2*nums[j]` kitne pairs? Merge sort count.

[Reverse Pairs](https://leetcode.com/problems/reverse-pairs/)

```js
// Hinglish: BIT / merge count — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-pairs/
function reversePairs(nums){
  // Hinglish: merge sort count
  let ans=0;
  const mergeSort=(l,r)=>{
    if(r-l<=1) return;
    const m=(l+r)>>1; mergeSort(l,m); mergeSort(m,r);
    // Hinglish: count pairs l..m-1 se m..r-1
    let j=m;
    for(let i=l;i<m;i++){ while(j<r && nums[i] > 2*nums[j]) j++; ans += j-m; } // Hinglish: kitne satisfy
    // Hinglish: normal merge
    const tmp=[]; let i=l, k=m;
    while(i<m && k<r) tmp.push(nums[i]<=nums[k]? nums[i++]: nums[k++]);
    while(i<m) tmp.push(nums[i++]); while(k<r) tmp.push(nums[k++]);
    for(let i=l;i<r;i++) nums[i]=tmp[i-l];
  };
  mergeSort(0, nums.length);
  return ans;
}
```
