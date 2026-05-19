# Iterators & generators

## Iterator protocol

Any object with `next()` returning `{ value, done }` is iterable if it also has `[Symbol.iterator]()`.

```js
const range = {
  *[Symbol.iterator]() {
    for (let i = 0; i < 3; i++) yield i;
  },
};
```

## `for..of` vs `for..in`

- `for..of` — iterables (arrays, maps, sets, strings, generators).
- `for..in` — enumerable keys on objects (includes prototype chain) — avoid on arrays.

## Generators

Pause/resume with `yield`. Use for lazy sequences, pagination parsers, or bridging callbacks:

```js
function* ids() {
  let n = 0;
  while (true) yield ++n;
}
```

## Async iterators

```js
for await (const chunk of readable) { /* ... */ }
```

`AsyncGenerator` for streaming APIs; always use `try/finally` to release locks (`reader.releaseLock()`).

## When not to use

Don't replace simple `array.map` with generators for readability. Use when **lazy** or **infinite** streams matter.

## Interop

`Array.from(iterable)`, spread `[...iterable]` materialize — O(n) memory. Pipe streams instead for large data.
