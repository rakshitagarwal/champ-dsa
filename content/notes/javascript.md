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

```js runnable
console.log("var hoisted:", a);
var a = 5;

try {
  console.log(b);
} catch (e) {
  console.log("let TDZ:", e.name);
}
let b = 5;

function greet() {
  return "hi";
}
console.log("function decl:", greet());

var sayHi = function () {
  return "hi";
};
console.log("var + expr:", typeof sayHi);
```

---

## 4. Scope & Closures

**Scope:** Region where a variable is accessible.
- Global → Script → Function → Block

**Scope Chain:** When a variable is not found locally, JS looks up the outer lexical environment chain until global.

**Closure:** A function that remembers variables from its outer lexical environment even after the outer function has returned.

```js runnable
function counter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const inc = counter();
console.log(inc());
console.log(inc());
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

```js runnable
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;
console.log("via prototype:", dog.eats);
console.log("own prop:", dog.barks);
```

`F.prototype` — when you use `new F()`, the new object's `[[Prototype]]` is set to `F.prototype`.

**Prototype chain end:** `Object.prototype` → `null`

---

## 7. Classes

Syntactic sugar over prototypal inheritance. Under the hood, methods are on the prototype.

```js runnable
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${super.speak()} (woof)`;
  }
}

const d = new Dog("Rex");
console.log(d.speak());
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

```js runnable
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

> Microtasks always run before the next macrotask, even if macrotask has 0ms delay.

---

## 9. Promises

A `Promise` is an object representing the eventual completion or failure of an async operation.

**States:** `pending` → `fulfilled` | `rejected` (state is immutable once settled)

```js runnable
const p = new Promise((resolve) => {
  resolve(42);
});

p.then((val) => console.log("fulfilled:", val))
  .catch((err) => console.log("rejected:", err))
  .finally(() => console.log("finally"));
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

```js runnable
async function fetchData() {
  const data = await Promise.resolve({ ok: true, user: "Ada" });
  return data;
}

fetchData().then((result) => console.log(result));
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

```js runnable
function curry(f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

const add = curry((a, b) => a + b);
console.log(add(2)(3));
```

Use case: Partial application, reusable specialized functions.

---

## 14. Debounce & Throttle

**Debounce:** Delays function execution until after a specified time has passed since the last call. Used for search inputs, resize events.

```js runnable
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const log = debounce((msg) => console.log("debounced:", msg), 50);
log("first");
log("second");
```

**Throttle:** Ensures function is called at most once in a specified time period. Used for scroll events, API rate limiting.

```js runnable
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

const log = throttle((n) => console.log("throttled:", n), 200);
log(1);
log(2);
log(3);
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

```js runnable
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function slowSquare(n) {
  return n * n;
}

const fastSquare = memoize(slowSquare);
console.log("First call:", fastSquare(5));
console.log("Cached call:", fastSquare(5));
```

---

## 17. Spread & Rest

**Spread (`...`):** Expands iterable into individual elements.
```js runnable
const arr = [1, 2, 3];
const arr1 = [1, 2];
const arr2 = [3, 4];
console.log("Math.max:", Math.max(...arr));
const copy = [...arr];
const merged = [...arr1, ...arr2];
console.log("copy:", copy);
console.log("merged:", merged);
```

**Rest (`...`):** Collects remaining arguments into an array.
```js runnable
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log("sum(1,2,3):", sum(1, 2, 3));
const [first, second, ...rest] = [10, 20, 30, 40];
console.log({ first, second, rest });
```

---

## 18. Destructuring

**Array destructuring:**
```js runnable
const [a, b, ...rest] = [1, 2, 3, 4];
console.log({ a, b, rest });
```

**Object destructuring:**
```js runnable
const user = { name: "Ada", age: 30, address: { city: "BLR" } };
const { name, age = 25, address: { city } } = user;
console.log({ name, age, city });
```

**In function params:**
```js runnable
function greet({ name, role = "user" }) {
  return `Hi ${name} (${role})`;
}
console.log(greet({ name: "Rakshit" }));
```

---

## 19. Generators

Functions that can be paused and resumed. Return an iterator.

```js runnable
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
```

- `function*` syntax
- `yield` pauses execution and returns value
- `next(val)` resumes and can pass a value back in

---

## 20. Symbol

A primitive type. Each `Symbol()` is unique. Used as unique object property keys to avoid name collisions.

```js runnable
const id = Symbol("id");
const user = { [id]: 123, name: "Ada" };
console.log(user[id]);
console.log(Object.keys(user));
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

```js runnable
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    const last = this.to;
    return {
      next() {
        return cur <= last
          ? { value: cur++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

for (const n of range) {
  console.log(n);
}
```

---

## 23. Error Handling

```js runnable
try {
  throw new Error("Something went wrong");
} catch (err) {
  console.log(err.name, err.message);
} finally {
  console.log("finally runs");
}
```

**Custom errors:**
```js runnable
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid email");
} catch (err) {
  console.log(err.name, err.message);
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

```js runnable
const obj = { a: 1, b: 2 };
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));
const merged = Object.assign({}, obj, { c: 3 });
console.log(merged);
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

```js runnable
console.log("5" + 2);
console.log("5" - 2);
console.log(true + 1);
console.log(null + 1);
console.log(undefined + 1);
console.log(0 == false, 0 === false);
```

**`==` vs `===`:**
- `==` allows type coercion
- `===` strict equality, no coercion

**Falsy values:** `false`, `0`, `""`, `null`, `undefined`, `NaN`, `0n`
Everything else is truthy, including `[]`, `{}`, `"0"`.

---

## 30. Optional Chaining & Nullish Coalescing

**Optional chaining (`?.`):** Short-circuits and returns `undefined` if left side is `null`/`undefined`.
```js runnable
const user = { address: { city: "BLR" }, scores: [90, 85] };
console.log(user?.address?.city);
console.log(user?.getAge?.());
console.log(user?.scores?.[0]);
```

**Nullish coalescing (`??`):** Returns right side only if left is `null` or `undefined` (not for `0`, `""`, `false`).
```js runnable
const user = { name: "", age: 0 };
console.log(user.name ?? "Anonymous");
console.log(user.age ?? 25);
console.log(user.role ?? "guest");
```

**`||` vs `??`:** `||` triggers on any falsy; `??` triggers only on nullish.

---

## 31. Proxy & Reflect

**Proxy:** Wraps an object and intercepts operations (get, set, delete, etc.) via traps.

```js runnable
const target = { x: 1 };
const proxy = new Proxy(target, {
  get(obj, prop) {
    return prop in obj ? obj[prop] : `Property ${String(prop)} not found`;
  },
  set(obj, prop, value) {
    if (typeof value !== "number") throw new TypeError("Only numbers");
    obj[prop] = value;
    return true;
  },
});

console.log(proxy.x);
console.log(proxy.y);
proxy.z = 10;
console.log(proxy.z);
```

**Reflect:** Provides methods corresponding to Proxy traps. Cleaner way to forward operations.
`Reflect.get(target, prop)`, `Reflect.set(target, prop, value)`, etc.

---

## 32. JSON

```js runnable
const value = { name: "Ada", skills: ["JS", "TS"], active: true };
const json = JSON.stringify(value, null, 2);
console.log(json);
console.log(JSON.parse(json));
```

- `undefined`, functions, and Symbols are omitted in stringify
- `toJSON()` method on an object is called automatically by stringify
- Circular references throw error

---

## 33. setTimeout / setInterval

```js runnable
const id = setTimeout(() => console.log("setTimeout fired"), 30);
console.log("scheduled id:", id);
clearTimeout(id);
console.log("cleared before fire");
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

```js runnable
function greet(greeting, name) {
  return `${greeting}, ${name} from ${this.team}`;
}

const ctx = { team: "Engineering" };
console.log(greet.call(ctx, "Hello", "Ada"));
console.log(greet.apply(ctx, ["Hi", "Bob"]));

const bound = greet.bind(ctx, "Hey");
console.log(bound("Rakshit"));
```

`bind` creates a permanent `this` binding. Arrow functions cannot have `this` overridden by these methods.

---
