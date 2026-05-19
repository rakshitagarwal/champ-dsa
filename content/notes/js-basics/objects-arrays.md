# Objects & arrays

Reference semantics, mutation, and the iteration APIs you pick in interviews and production.

## References

```js
const a = { x: 1 };
const b = a;
b.x = 2;
a.x; // 2
```

Shallow copy: `{ ...obj }`, `Array.from(arr)`, `arr.slice()`. Nested structures need deep clone (`structuredClone` in modern runtimes).

## Keys and order

String keys on plain objects iterate in **insertion order** (with integer-like keys sorted first). `Map` preserves insertion order for any key type — prefer for non-string keys or frequent add/delete.

## Array methods map

| Goal | Tool |
|------|------|
| Transform | `map` |
| Filter | `filter` |
| Reduce to one | `reduce` |
| Find one | `find` / `findIndex` |
| Existential | `some` / `every` |
| Side effect | `forEach` (can't break — use `for..of`) |

Mutating: `splice`, `sort` (in-place), `reverse`. Copy first if you need immutability for React state.

## `sort` comparator

```js
nums.sort((a, b) => a - b); // numeric
// omit comparator → string Unicode order
```

## `structuredClone` vs JSON

`structuredClone` handles `Date`, `Map`, `Set`, circular refs (within limits). `JSON.parse(JSON.stringify(x))` is faster but lossy.

## Optional chaining / nullish

```js
user?.address?.zip ?? "unknown";
```

`??` only replaces `null`/`undefined`, not `0` or `""` — use when that's what you want.

## Performance note

For hot paths, `for` loops beat chained methods (fewer allocations). Optimize after measurement, not by default.
