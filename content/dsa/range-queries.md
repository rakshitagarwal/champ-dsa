# Range Queries

Prefix sums die when values keep changing. Fenwick (BIT) lets me add to one index and ask sum of 1..i in log time. Counting smaller numbers on the right is the same idea as “merge sort, and while I merge I know how many from the right went before me.”

```js
// Fenwick: add at i, prefix sum 1..i (1-based)
function bitAdd(bit, i, v) {
  for (; i < bit.length; i += i & -i) bit[i] += v;
}
function bitSum(bit, i) {
  let s = 0;
  for (; i > 0; i -= i & -i) s += bit[i];
  return s;
}
```

## Range Sum Query Mutable

Fenwick on the array. Update = delta at index. Range = prefix(right) - prefix(left - 1).

[Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/)

```js
// Fenwick — point add, range sum
// LC: https://leetcode.com/problems/range-sum-query-mutable/
function NumArray(nums) {
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
// Merge sort — count right-side smaller
// LC: https://leetcode.com/problems/count-of-smaller-numbers-after-self/
function countSmaller(nums) {
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
