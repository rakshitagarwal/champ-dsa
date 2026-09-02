# Range Queries

**Definition:** Range-query problems need both point updates ("add v at i") and range queries ("sum of [l..r]") in `O(log n)`. Prefix sums die on updates (`O(n)` rebuild). **Fenwick Tree (BIT)** and **Segment Tree** fix this; merge-sort counting handles "count smaller on right".

**When to use:** Frequent `update(i, delta)` + `query(l,r)` interleaved; count of smaller elements after self / reverse pairs; range minimum with updates.

**How it works:** Fenwick is a `bit[1..n]` where `add(i)` climbs `i += i&-i` and `sum(i)` descends `i -= i&-i`; range = `sum(r)-sum(l-1)`. Merge-sort count: when a right element is placed before remaining left elements, those left elements each gain. Time `O(log n)` per op, space `O(n)`.

```js
// Fenwick (BIT) skeleton — 1-based
function bitAdd(bit, i, v) { for (; i < bit.length; i += i & -i) bit[i] += v; }
function bitSum(bit, i) { let s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }
const bit = Array(n + 1).fill(0);
// range sum [l..r] = bitSum(bit, r) - bitSum(bit, l-1)

// Count smaller after self — merge-sort counting sketch
// during merge: if right[j] < left[i], count left.remaining += 1
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
