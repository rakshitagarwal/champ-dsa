# Scope & closures

For experienced devs: closures are how JS implements **encapsulation** and **partial application**. Revisions = lexical scope rules + bundler behavior.

## Lexical scope

Inner functions close over **variables**, not values — unless you capture at call time:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3,3,3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0,1,2
}
```

## Temporal dead zone

`let`/`const` exist from block start but are unreadable until declaration:

```js
console.log(x); // ReferenceError
let x = 1;
```

## Module scope

ES modules are **strict** and **singleton** per URL. Bundlers may hoist or scope differently — don't rely on side-effect order across modules in large apps.

## Closure retention = memory leaks

A closure keeps its outer environment alive if **any** closed variable is reachable.

```js
function leak() {
  const huge = new Array(1e6);
  return () => huge.length; // holds huge until handler dies
}
```

Break retention: null out refs, narrow closure scope, use WeakMap for caches keyed by objects.

## Patterns you already use

- **Module pattern** → ES modules + private fields `#x`.
- **Debounced handlers** → closure over latest args.
- **React hooks** → closure over render props/state (stale closure bugs when deps wrong).

## `this` is separate

Arrow functions don't have own `this`; methods need regular functions or explicit bind. Mixing arrows as object methods is a common interview/production bug.
