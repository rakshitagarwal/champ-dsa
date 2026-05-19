# JavaScript Interview Notes

---

## 1. Data Types

**Primitive types (7):** `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`
**Non-primitive:** `object` (arrays, functions, objects)

- `typeof null === "object"` → historical bug
- `typeof function(){}  === "function"` → special case
- Primitives are copied by value; objects by reference

---

## 2. var / let / const

| | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisted | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |

**TDZ (Temporal Dead Zone):** Period between entering scope and the declaration line. Accessing a `let`/`const` variable in TDZ throws `ReferenceError`.

---

## 3. Hoisting

The JS engine moves **declarations** to the top of their scope during compilation phase.

- `var` declarations are hoisted and initialized as `undefined`
- `function` declarations are fully hoisted (both declaration + body)
- `let` / `const` are hoisted but NOT initialized → TDZ
- `class` declarations are hoisted but NOT initialized → TDZ

```js
console.log(a); // undefined (var hoisted)
var a = 5;

console.log(b); // ReferenceError (TDZ)
let b = 5;

greet(); // works — function declaration fully hoisted
function greet() { return "hi"; }

sayHi(); // TypeError — variable hoisted as undefined, not the function
var sayHi = function() { return "hi"; };
```

---

## 4. Scope & Closures

**Scope:** Region where a variable is accessible.
- Global → Script → Function → Block

**Scope Chain:** When a variable is not found locally, JS looks up the outer lexical environment chain until global.

**Closure:** A function that remembers variables from its outer lexical environment even after the outer function has returned.

```js
function counter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const inc = counter();
inc(); // 1
inc(); // 2 — count is "closed over"
```

> Closure is created at function creation time, not call time.

---

## 5. `this` Keyword

`this` refers to the execution context — determined by **how** a function is called, not where it's defined.

| Call type | `this` value |
|---|---|
| Regular function call | `undefined` (strict) / global object |
| Method call `obj.fn()` | `obj` |
| `new` call | newly created object |
| `call/apply/bind` | explicitly set |
| Arrow function | inherits from enclosing lexical scope |

Arrow functions **do not have their own `this`**. They capture `this` from the surrounding context at definition time.

---

## 6. Prototype & Prototype Chain

Every object has an internal `[[Prototype]]` link (accessible via `__proto__` or `Object.getPrototypeOf()`).

When a property is accessed, JS looks on the object first, then walks the prototype chain until `null`.

```js
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

dog.eats; // true — found via prototype chain
```

`F.prototype` — when you use `new F()`, the new object's `[[Prototype]]` is set to `F.prototype`.

**Prototype chain end:** `Object.prototype` → `null`

---

## 7. Classes

Syntactic sugar over prototypal inheritance. Under the hood, methods are on the prototype.

```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  speak() {
    return super.speak() + " (woof)";
  }
}
```

- `extends` sets up prototype chain between classes
- `super()` must be called in child constructor before using `this`
- Class body is always in strict mode
- Classes are NOT hoisted (TDZ applies)

---

## 8. Event Loop

JavaScript is **single-threaded** but handles async via the event loop.

**Components:**
- **Call Stack** — executes synchronous code (LIFO)
- **Web APIs** — handle async operations (setTimeout, fetch, DOM events) off the main thread
- **Microtask Queue** — holds Promise callbacks (`.then`, `.catch`, `async/await`, `queueMicrotask`)
- **Macrotask Queue (Task Queue)** — holds setTimeout, setInterval, I/O callbacks

**Order of execution:**
1. Run all synchronous code (empty the call stack)
2. Run **all** microtasks (drain microtask queue completely)
3. Render (browser)
4. Run **one** macrotask
5. Repeat from step 2

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
```

> Microtasks always run before the next macrotask, even if macrotask has 0ms delay.

---

## 9. Promises

A `Promise` is an object representing the eventual completion or failure of an async operation.

**States:** `pending` → `fulfilled` | `rejected` (state is immutable once settled)

```js
const p = new Promise((resolve, reject) => {
  // async work
  resolve(value);  // or reject(error)
});

p.then(val => ...)
 .catch(err => ...)
 .finally(() => ...);
```

**Key methods:**

| Method | Behavior |
|---|---|
| `Promise.all([...])` | Resolves when ALL resolve; rejects if ANY rejects |
| `Promise.allSettled([...])` | Waits for ALL, returns array of `{status, value/reason}` |
| `Promise.race([...])` | Resolves/rejects with the FIRST settled promise |
| `Promise.any([...])` | Resolves with FIRST fulfilled; rejects only if ALL reject |

**Promise chaining:** Each `.then()` returns a new promise. Returning a value passes it to the next `.then()`. Throwing inside `.then()` triggers `.catch()`.

---

## 10. async / await

`async` functions always return a Promise. `await` pauses execution inside the async function until the promise settles. It does NOT block the main thread.

```js
async function fetchData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

- `await` can only be used inside `async` functions (or top-level modules)
- Under the hood, `async/await` is syntactic sugar over Promises + generators
- Error handling via `try/catch` or `.catch()` on the returned promise

---

## 11. Callbacks & Callback Hell

A **callback** is a function passed as an argument to another function to be executed later.

**Callback hell:** Deeply nested callbacks making code hard to read and maintain.

```js
getData(function(a) {
  getMore(a, function(b) {
    getEvenMore(b, function(c) {
      // callback hell
    });
  });
});
```

Solution: Promises → async/await

---

## 12. Execution Context & Call Stack

**Execution Context** is the environment in which JS code is evaluated and executed.

**Types:**
- **Global Execution Context** — created first, sets up global object (`window`/`global`) and `this`
- **Function Execution Context** — created each time a function is called
- **Eval Execution Context** — inside `eval()`

Each context has:
- Variable Environment (stores vars/functions)
- Lexical Environment (scope chain)
- `this` binding

**Creation phase:** Hoisting happens here (vars initialized to `undefined`, functions fully stored).
**Execution phase:** Code runs line by line.

---

## 13. Currying

Transforming a function that takes multiple arguments into a sequence of functions each taking a single argument.

```js
function curry(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

const add = curry((a, b) => a + b);
add(2)(3); // 5
```

Use case: Partial application, reusable specialized functions.

---

## 14. Debounce & Throttle

**Debounce:** Delays function execution until after a specified time has passed since the last call. Used for search inputs, resize events.

```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**Throttle:** Ensures function is called at most once in a specified time period. Used for scroll events, API rate limiting.

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
```

---

## 15. Event Delegation & Propagation

**Event Propagation phases:**
1. **Capturing phase** — event travels from `document` down to the target
2. **Target phase** — event reaches the target element
3. **Bubbling phase** — event bubbles up from target to `document`

`addEventListener(event, handler, true)` → capturing phase
`addEventListener(event, handler, false)` → bubbling phase (default)

**`event.stopPropagation()`** — stops further propagation (up or down)
**`event.preventDefault()`** — prevents default browser behavior

**Event Delegation:** Attach one listener to a parent instead of many listeners on children. Leverages bubbling.

```js
document.getElementById("list").addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }
});
```

---

## 16. Memoization

Caching the result of expensive function calls and returning the cached result on repeated calls with same inputs.

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

---

## 17. Spread & Rest

**Spread (`...`):** Expands iterable into individual elements.
```js
const arr = [1, 2, 3];
Math.max(...arr); // 3
const copy = [...arr];
const merged = [...arr1, ...arr2];
```

**Rest (`...`):** Collects remaining arguments into an array.
```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

---

## 18. Destructuring

**Array destructuring:**
```js
const [a, b, ...rest] = [1, 2, 3, 4];
```

**Object destructuring:**
```js
const { name, age = 25, address: { city } } = user;
```

**In function params:**
```js
function greet({ name, role = "user" }) { ... }
```

---

## 19. Generators

Functions that can be paused and resumed. Return an iterator.

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }
```

- `function*` syntax
- `yield` pauses execution and returns value
- `next(val)` resumes and can pass a value back in

---

## 20. Symbol

A primitive type. Each `Symbol()` is unique. Used as unique object property keys to avoid name collisions.

```js
const id = Symbol("id");
const user = { [id]: 123 };
user[id]; // 123
```

**Well-known Symbols:** `Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`, etc.
Symbols are not enumerable in `for...in` or `Object.keys()`.

---

## 21. WeakMap & WeakSet

- **WeakMap:** Keys must be objects. Keys are held weakly (don't prevent GC). Not iterable.
- **WeakSet:** Values must be objects. Held weakly. Not iterable.

Use case: Storing metadata about objects without preventing garbage collection.

---

## 22. Iterators & Iterables

**Iterator:** Object with a `next()` method returning `{ value, done }`.

**Iterable:** Object with `[Symbol.iterator]()` method that returns an iterator.

Built-in iterables: `Array`, `String`, `Map`, `Set`, `arguments`, generators.

```js
const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    const last = this.to;
    return {
      next() {
        return cur <= last
          ? { value: cur++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (let n of range) console.log(n); // 1, 2, 3
```

---

## 23. Error Handling

```js
try {
  // code
} catch (err) {
  // err.name, err.message, err.stack
} finally {
  // always runs
}
```

**Custom errors:**
```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

**Unhandled promise rejections:** Listen via `window.addEventListener("unhandledrejection", e => ...)`

---

## 24. Strict Mode

`"use strict"` — enables strict mode for a script or function.

Changes:
- Undeclared variables throw `ReferenceError`
- `this` is `undefined` in regular function calls (not global)
- Duplicate parameter names are forbidden
- `with` statement is forbidden
- Silent errors become thrown errors

Classes and modules are always in strict mode.

---

## 25. Modules (ESM)

```js
// Named export
export const name = "JS";
export function greet() {}

// Default export
export default class App {}

// Import
import App, { name, greet } from "./module.js";
import * as mod from "./module.js";
```

- Modules are always in strict mode
- Top-level `this` is `undefined`
- Each module has its own scope
- Modules are singletons — same instance imported anywhere
- Support top-level `await`

**CommonJS (Node.js):** `module.exports = ...` / `require()`

---

## 26. Garbage Collection

JS uses **mark-and-sweep** algorithm.

- GC marks all "reachable" objects (those accessible from roots: global, call stack)
- Everything not marked is swept (collected)

**Memory leaks common causes:**
- Global variables holding references
- Detached DOM nodes still referenced in JS
- Uncleaned timers / event listeners
- Closures holding large objects unnecessarily

---

## 27. Object Methods

```js
Object.keys(obj)        // array of own enumerable keys
Object.values(obj)      // array of own enumerable values
Object.entries(obj)     // array of [key, value] pairs
Object.assign(target, ...sources)  // shallow copy/merge
Object.freeze(obj)      // makes object immutable (shallow)
Object.create(proto)    // creates object with given prototype
Object.defineProperty(obj, key, descriptor)
```

**Property descriptor:** `{ value, writable, enumerable, configurable }`

---

## 28. Array Methods (Important)

| Method | Returns | Mutates |
|---|---|---|
| `map(fn)` | new array | No |
| `filter(fn)` | new array | No |
| `reduce(fn, init)` | single value | No |
| `forEach(fn)` | undefined | No |
| `find(fn)` | first match or undefined | No |
| `findIndex(fn)` | index or -1 | No |
| `some(fn)` | boolean | No |
| `every(fn)` | boolean | No |
| `flat(depth)` | new array | No |
| `flatMap(fn)` | new array | No |
| `splice(start, del, ...items)` | removed items | **Yes** |
| `sort(fn)` | sorted array | **Yes** |

---

## 29. Type Coercion

**Implicit coercion** happens in comparisons and operations.

```js
"5" + 2      // "52" (number coerced to string)
"5" - 2      // 3 (string coerced to number)
true + 1     // 2
null + 1     // 1
undefined + 1 // NaN
```

**`==` vs `===`:**
- `==` allows type coercion
- `===` strict equality, no coercion

**Falsy values:** `false`, `0`, `""`, `null`, `undefined`, `NaN`, `0n`
Everything else is truthy, including `[]`, `{}`, `"0"`.

---

## 30. Optional Chaining & Nullish Coalescing

**Optional chaining (`?.`):** Short-circuits and returns `undefined` if left side is `null`/`undefined`.
```js
user?.address?.city
user?.getAge?.()
arr?.[0]
```

**Nullish coalescing (`??`):** Returns right side only if left is `null` or `undefined` (not for `0`, `""`, `false`).
```js
const name = user.name ?? "Anonymous";
```

**`||` vs `??`:** `||` triggers on any falsy; `??` triggers only on nullish.

---

## 31. Proxy & Reflect

**Proxy:** Wraps an object and intercepts operations (get, set, delete, etc.) via traps.

```js
const proxy = new Proxy(target, {
  get(target, prop) {
    return prop in target ? target[prop] : `Property ${prop} not found`;
  },
  set(target, prop, value) {
    if (typeof value !== "number") throw new TypeError("Only numbers");
    target[prop] = value;
    return true;
  }
});
```

**Reflect:** Provides methods corresponding to Proxy traps. Cleaner way to forward operations.
`Reflect.get(target, prop)`, `Reflect.set(target, prop, value)`, etc.

---

## 32. JSON

```js
JSON.stringify(value, replacer, space) // JS → JSON string
JSON.parse(string, reviver)            // JSON string → JS
```

- `undefined`, functions, and Symbols are omitted in stringify
- `toJSON()` method on an object is called automatically by stringify
- Circular references throw error

---

## 33. setTimeout / setInterval

```js
const id = setTimeout(fn, delay, ...args)   // runs once after delay
clearTimeout(id)

const id = setInterval(fn, delay, ...args)  // runs repeatedly
clearInterval(id)
```

- Both are **macrotasks**
- `setTimeout(fn, 0)` schedules fn after current sync code + all microtasks
- Minimum delay in nested setTimeout is clamped to 4ms in browsers

---

## 34. `new` Operator — What happens

When `new Foo()` is called:
1. A new empty object is created
2. Its `[[Prototype]]` is set to `Foo.prototype`
3. `Foo` is called with `this` = new object
4. If `Foo` returns an object, that is returned; otherwise the new object is returned

---

## 35. `call`, `apply`, `bind`

```js
fn.call(thisArg, arg1, arg2)       // invokes immediately
fn.apply(thisArg, [arg1, arg2])    // invokes immediately, args as array
const bound = fn.bind(thisArg, arg1) // returns new function, does not invoke
```

`bind` creates a permanent `this` binding. Arrow functions cannot have `this` overridden by these methods.

---
