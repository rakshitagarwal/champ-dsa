# Javascript core concepts

---

## 1. Scope in JS

**Scope** determines where variables and functions are accessible in your code.

### Global Scope

Variables declared outside any function or block are in the global scope. They are accessible everywhere.

```jsx
var globalVar = "I'm global";

function greet() {
  console.log(globalVar); // accessible
}
greet(); // "I'm global"
```

### Function (Local) Scope

Variables declared inside a function are accessible only within that function.

```jsx
function sayHello() {
  var message = "Hello!";
  console.log(message); // accessible
}
sayHello();
console.log(message); // ❌ ReferenceError: message is not defined
```

### Block Scope

Introduced with `let` and `const` in ES6. Variables declared inside `{}` are limited to that block.

```jsx
{
  let blockVar = "I'm block-scoped";
  const blockConst = "Me too";
  console.log(blockVar); // ✅ works
}
console.log(blockVar); // ❌ ReferenceError
```

> **Note:** `var` does NOT respect block scope — it leaks out of blocks but not functions.

---

## 2. Scope Chaining

When a variable is referenced, JavaScript looks for it in the **current scope** first, then moves **outward** through parent scopes until it reaches the global scope. This chain of scopes is called the **scope chain**.

```jsx
const globalVar = "global";

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";
    console.log(innerVar); // "inner" — found in own scope
    console.log(outerVar); // "outer" — found in parent scope
    console.log(globalVar); // "global" — found in global scope
  }

  inner();
}

outer();
```

JavaScript keeps searching up the chain until it finds the variable or throws a `ReferenceError`.

---

## 3. Primitive vs Non-Primitive

### Primitive Types (7 total)

Stored by **value**. Immutable.

| Type        | Example             |
| ----------- | ------------------- |
| `string`    | `"hello"`           |
| `number`    | `42`, `3.14`        |
| `boolean`   | `true`, `false`     |
| `undefined` | `undefined`         |
| `null`      | `null`              |
| `symbol`    | `Symbol('id')`      |
| `bigint`    | `9007199254740991n` |

```jsx
let a = 10;
let b = a; // copy of value
b = 20;
console.log(a); // 10 — unchanged
```

### Non-Primitive (Reference) Types

Stored by **reference**. Mutable.

- `Object`
- `Array`
- `Function`

```jsx
let obj1 = { name: "Alice" };
let obj2 = obj1; // copy of reference
obj2.name = "Bob";
console.log(obj1.name); // "Bob" — both point to same object
```

---

## 4. Var, Let, and Const

| Feature         | `var`           | `let`     | `const`   |
| --------------- | --------------- | --------- | --------- |
| Scope           | Function        | Block     | Block     |
| Hoisted         | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declarable   | Yes             | No        | No        |
| Re-assignable   | Yes             | Yes       | No        |
| Global property | Yes             | No        | No        |

```jsx
// var — function scoped, hoisted
var x = 1;
if (true) {
  var x = 2; // same variable!
}
console.log(x); // 2

// let — block scoped
let y = 1;
if (true) {
  let y = 2; // different variable
}
console.log(y); // 1

// const — must be initialized, cannot be reassigned
const z = 42;
// z = 50; // ❌ TypeError

const obj = { a: 1 };
obj.a = 2; // ✅ object contents can change
```

---

## 5. Temporal Dead Zone

The **Temporal Dead Zone (TDZ)** is the period between the start of a block scope and the point where a `let` or `const` variable is declared. Accessing the variable during this window throws a `ReferenceError`.

```jsx
console.log(myVar); // ✅ undefined (var is hoisted with value)
console.log(myLet); // ❌ ReferenceError: Cannot access 'myLet' before initialization

var myVar = "hello";
let myLet = "world";
```

Both `var` and `let`/`const` are hoisted, but:

- `var` is initialized to `undefined` at hoist time.
- `let`/`const` are hoisted but **not initialized** — they sit in the TDZ until the declaration line is reached.

---

## 6. Hoisting

Hoisting is JavaScript’s behavior of **moving declarations to the top** of their scope during the compilation phase (before code executes).

### Variable Hoisting

```jsx
console.log(a); // undefined (not ReferenceError)
var a = 5;

// Interpreted as:
var a; // declaration hoisted
console.log(a); // undefined
a = 5; // assignment stays
```

### Function Hoisting

Function **declarations** are fully hoisted (both name and body).

```jsx
greet(); // ✅ "Hello!" — works before declaration

function greet() {
  console.log("Hello!");
}
```

Function **expressions** are NOT fully hoisted:

```jsx
greet(); // ❌ TypeError: greet is not a function

var greet = function () {
  console.log("Hello!");
};
```

---

## 7. Prototypes in JS

Every JavaScript object has an internal property called `[[Prototype]]` (accessible via `__proto__`). This links objects together for property/method lookup — this is called **prototypal inheritance**.

```jsx
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hi, I'm${this.name}`);
};

const alice = new Person("Alice");
alice.greet(); // "Hi, I'm Alice"

// greet is on Person.prototype, not on alice directly
console.log(alice.hasOwnProperty("greet")); // false
console.log(alice.hasOwnProperty("name")); // true
```

---

## 8. Prototype Object

Every function in JavaScript has a `prototype` property — an object that becomes the `[[Prototype]]` of instances created via `new`.

```jsx
function Animal(type) {
  this.type = type;
}

Animal.prototype.describe = function () {
  return `I am a${this.type}`;
};

const dog = new Animal("dog");

console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.constructor === Animal); // true
```

The prototype object has a `constructor` property pointing back to the constructor function.

---

## 9. Prototype Chaining

When you access a property/method on an object, JavaScript:

1. Checks the object itself.
2. Checks `[[Prototype]]` (i.e., parent).
3. Keeps going up the chain until `null` is reached.

```jsx
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  return `${this.name} eats`;
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.bark = function () {
  return `${this.name} barks`;
};

const rex = new Dog("Rex");

console.log(rex.bark()); // "Rex barks"   — found on Dog.prototype
console.log(rex.eat()); // "Rex eats"    — found on Animal.prototype
console.log(rex.toString()); // found on Object.prototype
```

Chain: `rex` → `Dog.prototype` → `Animal.prototype` → `Object.prototype` → `null`

---

## 10. Closures

A **closure** is a function that **remembers and accesses** its lexical scope even when executed outside of it.

```jsx
function makeCounter() {
  let count = 0; // enclosed variable

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

`count` is not destroyed after `makeCounter()` returns because the inner function holds a reference to it.

**Practical use cases:**

- Data encapsulation / private variables
- Factory functions
- Event handlers
- Memoization / caching

---

## 11. Pass by Reference vs Pass by Value

### Pass by Value (Primitives)

A **copy** of the value is passed. Changes don’t affect the original.

```jsx
function change(x) {
  x = 100;
}
let num = 5;
change(num);
console.log(num); // 5 — unchanged
```

### Pass by Reference (Objects/Arrays)

A **copy of the reference (memory address)** is passed. Mutations affect the original.

```jsx
function updateName(person) {
  person.name = "Bob";
}
let user = { name: "Alice" };
updateName(user);
console.log(user.name); // "Bob" — changed!
```

> **Important:** Reassigning the parameter itself does NOT affect the original:
>
> ```jsx
> function replace(obj) {
>   obj = { name: "Charlie" }; // new reference, doesn't affect original
> }
> replace(user);
> console.log(user.name); // "Bob" — unchanged
> ```

---

## 12. Currying in JS

**Currying** transforms a function with multiple arguments into a sequence of functions, each taking one argument at a time.

```jsx
// Normal function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Using arrow functions
const curriedArrow = (a) => (b) => (c) => a + b + c;
console.log(curriedArrow(1)(2)(3)); // 6
```

**Generic curry helper:**

```jsx
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

---

## 13. Infinite Currying Problem

How to sum an unknown number of arguments using currying?

The trick: when called with no arguments (or a sentinel), return the accumulated result.

```jsx
function infiniteSum(a) {
  return function (b) {
    if (b === undefined) return a; // terminal condition
    return infiniteSum(a + b);
  };
}

console.log(infiniteSum(1)(2)(3)(4)()); // 10
console.log(infiniteSum(5)(10)()); // 15
```

**Using toString trick (no terminal call needed):**

```jsx
function sum(a) {
  let total = a;
  function inner(b) {
    total += b;
    return inner;
  }
  inner.toString = () => total;
  return inner;
}

console.log(+sum(1)(2)(3)(4)); // 10
```

---

## 14. Memoization in JS

**Memoization** is an optimization technique that caches the result of expensive function calls so repeated calls with the same arguments return instantly.

```jsx
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("From cache");
      return cache[key];
    }
    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}

function slowSquare(n) {
  // simulate expensive computation
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // computes → 25
console.log(fastSquare(5)); // from cache → 25
console.log(fastSquare(6)); // computes → 36
```

**Memoized Fibonacci:**

```jsx
const fib = memoize(function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // fast!
```

---

## 15. Rest Parameter

The **rest parameter** (`...args`) collects all remaining function arguments into an array.

```jsx
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

**With named params:**

```jsx
function log(first, second, ...rest) {
  console.log(first); // "a"
  console.log(second); // "b"
  console.log(rest); // ["c", "d", "e"]
}

log("a", "b", "c", "d", "e");
```

> **Rest must always be the last parameter.**

---

## 16. Spread Operator

The **spread operator** (`...`) expands an iterable (array, string, object) into individual elements.

```jsx
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copying arrays (shallow)
const copy = [...arr1];

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }

// Function calls
function add(x, y, z) {
  return x + y + z;
}
const nums = [1, 2, 3];
console.log(add(...nums)); // 6

// Strings
const chars = [..."hello"];
console.log(chars); // ["h","e","l","l","o"]
```

**Rest vs Spread:**

- **Rest**: collects items _into_ an array (in function params).
- **Spread**: expands items _from_ an array/object.

---

## 17. How Many Ways You Can Create an Object in JS

```jsx
// 1. Object literal
const obj1 = { name: "Alice", age: 25 };

// 2. new Object()
const obj2 = new Object();
obj2.name = "Bob";

// 3. Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj3 = new Person("Charlie", 30);

// 4. Object.create()
const proto = {
  greet() {
    return `Hi, I'm${this.name}`;
  },
};
const obj4 = Object.create(proto);
obj4.name = "Dave";
console.log(obj4.greet()); // "Hi, I'm Dave"

// 5. ES6 Class
class Animal {
  constructor(type) {
    this.type = type;
  }
}
const obj5 = new Animal("dog");

// 6. Factory Function
function createUser(name) {
  return {
    name,
    greet() {
      return `Hello,${name}`;
    },
  };
}
const obj6 = createUser("Eve");

// 7. Object.assign()
const obj7 = Object.assign({}, { x: 1 }, { y: 2 });
console.log(obj7); // { x: 1, y: 2 }

// 8. Destructuring + spread to clone
const obj8 = { ...obj1 };
```

---

## 18. Generator Functions in JS

Generator functions can **pause and resume** their execution using `yield`. They return an **iterator** object.

```jsx
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = count();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**Infinite sequence with generator:**

```jsx
function* infiniteId() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = infiniteId();
console.log(idGen.next().value); // 1
console.log(idGen.next().value); // 2
// ...never exhausts
```

**Use cases:** lazy evaluation, infinite sequences, async control flow.

---

## 19. JavaScript Single-Threaded Language

JavaScript has **one call stack** and **one thread of execution** — it can only do one thing at a time.

This means:

- No parallel code execution.
- Long-running tasks (e.g., network requests, timers) would block the UI if handled synchronously.

To handle async work without blocking, JavaScript uses:

- The **Event Loop**
- **Web APIs** (browser environment)
- **Callback Queue / Microtask Queue**

```jsx
console.log("Start");

setTimeout(() => {
  console.log("Timeout"); // async, goes to callback queue
}, 0);

console.log("End");

// Output:
// Start
// End
// Timeout
```

Even though `setTimeout` is 0ms, it runs AFTER all synchronous code because the main thread must be free first.

---

## 20. Callbacks — Why We Need Them

A **callback** is a function passed as an argument to another function, to be called later (often after an async operation completes).

```jsx
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Alice" };
    callback(data);
  }, 1000);
}

fetchData(function (result) {
  console.log("Got data:", result);
});
```

**Why we need callbacks:**

- JavaScript is single-threaded and non-blocking.
- We can’t `return` from async operations.
- Callbacks let us say “do this **when** that is done.”

**Problem:** Callbacks can lead to **Callback Hell** (deeply nested, hard-to-read code). Promises and async/await were introduced to solve this.

---

## 21. Event Loop

The **Event Loop** is the mechanism that allows JavaScript to perform non-blocking I/O despite being single-threaded.

**How it works:**

1. JavaScript executes code on the **Call Stack**.
2. Async operations (timers, fetch, etc.) are offloaded to **Web APIs**.
3. When complete, their callbacks go to the **Callback Queue** (or Microtask Queue).
4. The Event Loop constantly checks: **is the call stack empty?**
5. If yes, it picks the next task from the queues and pushes it to the call stack.

```jsx
console.log("1"); // sync → call stack
setTimeout(() => {
  console.log("2"); // async → callback queue
}, 0);
Promise.resolve().then(() => {
  console.log("3"); // async → microtask queue (priority!)
});
console.log("4"); // sync → call stack

// Output: 1, 4, 3, 2
// Microtask queue is drained before callback queue
```

---

## 22. Callback Queue

Also called the **Macrotask Queue** or **Task Queue**. It holds callbacks from:

- `setTimeout`
- `setInterval`
- `setImmediate` (Node.js)
- UI events (click, keypress)
- `fetch` response handlers (in some cases)

The event loop picks **one** task from the callback queue per cycle, **after** draining the microtask queue completely.

```jsx
setTimeout(() => console.log("Macrotask 1"), 0);
setTimeout(() => console.log("Macrotask 2"), 0);
Promise.resolve().then(() => console.log("Microtask 1"));

// Output:
// Microtask 1
// Macrotask 1
// Macrotask 2
```

---

## 23. Microtask Queue

The **Microtask Queue** has **higher priority** than the callback queue. It is processed **completely** after each task, before the next macrotask.

Sources of microtasks:

- `Promise.then / .catch / .finally`
- `queueMicrotask()`
- `MutationObserver`

```jsx
console.log("Script start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

console.log("Script end");

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
```

---

## 24. Promises

A **Promise** represents the eventual completion (or failure) of an asynchronous operation.

**States:**

- `pending` — initial state
- `fulfilled` — operation succeeded
- `rejected` — operation failed

```jsx
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Data received!");
  else reject("Something went wrong.");
});

promise
  .then((result) => console.log(result)) // "Data received!"
  .catch((err) => console.error(err));
```

**Promise combinators:**

```jsx
// Promise.all — waits for ALL, fails if any fail
Promise.all([p1, p2, p3]).then((values) => console.log(values));

// Promise.allSettled — waits for ALL, never rejects
Promise.allSettled([p1, p2, p3]).then((results) => console.log(results));

// Promise.race — resolves/rejects with the FIRST settled
Promise.race([p1, p2, p3]).then((first) => console.log(first));

// Promise.any — resolves with the FIRST fulfilled, rejects if ALL fail
Promise.any([p1, p2, p3]).then((first) => console.log(first));
```

---

## 25. Event Propagation

**Event propagation** describes the order in which event handlers are called when an event occurs on a nested DOM element.

There are 3 phases:

1. **Capturing phase** — event travels from root → target
2. **Target phase** — event reaches the target element
3. **Bubbling phase** — event travels from target → root

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```jsx
document.getElementById("parent").addEventListener(
  "click",
  () => {
    console.log("Parent clicked");
  },
  false,
); // false = bubbling (default)

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});

// Output on button click:
// Child clicked
// Parent clicked
```

---

## 26. Event Bubbling

**Bubbling** is when an event on a child element propagates **upward** through its ancestors.

```jsx
document.getElementById("child").addEventListener("click", () => {
  console.log("Child");
});
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent");
});
document.body.addEventListener("click", () => {
  console.log("Body");
});

// Click on child → Child → Parent → Body
```

Most events bubble by default. Some do not (e.g., `focus`, `blur`).

---

## 27. Event Capturing

**Capturing** (also called trickling) is the opposite — the event travels **down** from root to the target first.

Set `true` as the third argument to `addEventListener` to listen during the capture phase:

```jsx
document.getElementById("parent").addEventListener(
  "click",
  () => {
    console.log("Parent (capture)");
  },
  true,
); // capture = true

document.getElementById("child").addEventListener("click", () => {
  console.log("Child (bubble)");
});

// Click on child → Parent (capture) → Child (bubble)
```

---

## 28. Event stopPropagation

`event.stopPropagation()` prevents the event from traveling further up or down the DOM tree.

```jsx
document.getElementById("child").addEventListener("click", (e) => {
  e.stopPropagation(); // stops bubbling
  console.log("Child clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked"); // ❌ never called
});
```

**stopImmediatePropagation()** also prevents other listeners on the **same element** from being called.

---

## 29. Event Delegation

**Event delegation** leverages bubbling to attach a **single event listener to a parent** that handles events for all current and future children.

```jsx
// Without delegation — must add listener to each button
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

// With delegation — one listener on the parent
document.getElementById("list").addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});
```

**Benefits:**

- Better performance (fewer event listeners).
- Works for dynamically added elements.

---

## 30. Type Coercion vs Conversion

### Type Conversion (Explicit)

You explicitly convert a type using functions like `Number()`, `String()`, `Boolean()`.

```jsx
Number("42"); // 42
String(100); // "100"
Boolean(0); // false
parseInt("3.5"); // 3
```

### Type Coercion (Implicit)

JavaScript **automatically** converts types when operators or conditions require it.

```jsx
"5" + 3; // "53"  — number coerced to string
"5" - 3; // 2     — string coerced to number
true + 1; // 2     — true → 1
false + 1; // 1     — false → 0
null + 1; // 1     — null → 0
undefined + 1; // NaN
"5" == 5; // true  — == allows coercion
"5" === 5; // false — === no coercion
```

**Falsy values:** `0`, `""`, `null`, `undefined`, `NaN`, `false`**Truthy:** everything else

---

## 31. Throttle

**Throttling** ensures a function is called **at most once** in a given time window, no matter how many times the event fires.

```jsx
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scroll event handled");
}, 1000);

window.addEventListener("scroll", throttledScroll);
// Fires at most once per second
```

**Use cases:** scroll handlers, resize events, API rate limiting.

---

## 32. Debounce

**Debouncing** delays the execution of a function until **after** a specified time has passed since the last invocation.

```jsx
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 500);

// Will only fire 500ms after user stops typing
input.addEventListener("input", (e) => debouncedSearch(e.target.value));
```

**Throttle vs Debounce:**

- **Throttle**: Execute every N ms (rate-limit).
- **Debounce**: Execute only after N ms of inactivity.

---

## 33. How JavaScript Parses and Compiles Your Code

JavaScript engines (like V8) process code in several phases:

### Step 1: Tokenization / Lexical Analysis

Source code is broken into **tokens** (keywords, identifiers, operators, literals).

```
let x = 5 + 3;
→ [let] [x] [=] [5] [+] [3] [;]
```

### Step 2: Parsing → AST

Tokens are arranged into an **Abstract Syntax Tree (AST)** — a tree representation of the code’s structure.

### Step 3: Compilation (JIT)

Modern engines use **Just-In-Time (JIT) compilation**:

- **Ignition** (V8’s interpreter) generates bytecode.
- **TurboFan** (V8’s compiler) optimizes hot code paths to machine code.

### Step 4: Execution

The optimized machine code is executed. The engine also does:

- **Inline caching** — fast property lookups.
- **Hidden classes** — optimized object shapes.
- **Garbage collection** — memory cleanup.

### Step 5: Optimization & Deoptimization

If assumptions made during optimization are violated (e.g., type changes), the engine **deoptimizes** back to interpreted mode.

---

## 34. Infinite Microtask Queue Problem

**Problem:** If a Promise `.then()` callback keeps scheduling new microtasks infinitely, the call stack never clears and the page freezes.

```jsx
// ⚠️ This will FREEZE the browser
function infiniteMicrotask() {
  Promise.resolve().then(infiniteMicrotask);
}
infiniteMicrotask();
```

**Why:** Microtasks run before the next macrotask. An infinite microtask loop starves the event loop — no UI updates, no setTimeout callbacks, nothing.

**How to handle:**

1. **Use macrotasks instead** — break the loop with `setTimeout`:

```jsx
function safeLongTask() {
  setTimeout(() => {
    // do chunk of work
    safeLongTask(); // reschedule as macrotask
  }, 0);
}
```

1. **Use `queueMicrotask` carefully** — always have an exit condition.
2. **Use Web Workers** for heavy computation off the main thread.
3. **Code Review / Linting** to catch accidental infinite microtask patterns.

---

## 35. First Class Functions

In JavaScript, functions are **first-class citizens** — they can be:

- Stored in variables
- Passed as arguments
- Returned from other functions
- Stored in data structures

```jsx
// Stored in variable
const greet = function (name) {
  return `Hello,${name}!`;
};

// Passed as argument
function callWith(fn, value) {
  return fn(value);
}
console.log(callWith(greet, "Alice")); // "Hello, Alice!"

// Returned from function
function multiplier(x) {
  return function (y) {
    return x * y;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10

// Stored in array
const funcs = [Math.sqrt, Math.abs, Math.floor];
funcs.forEach((fn) => console.log(fn(-4)));
```

---

## 36. Immediately Invoked Function Expressions (IIFE)

An **IIFE** is a function that is **defined and called immediately**. Useful for creating a private scope.

```jsx
(function () {
  const secret = "I'm private";
  console.log(secret); // "I'm private"
})();

// console.log(secret); // ❌ ReferenceError

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE");
})();

// With parameters
(function (name) {
  console.log(`Hello,${name}!`);
})("World");
```

**Use cases:**

- Avoid polluting global scope.
- Module pattern (before ES modules).
- One-time initialization code.

---

## 37. Call, Apply, and Bind

All three let you **explicitly set `this`** for a function.

### `call` — invoke immediately with individual args

```jsx
function greet(greeting, punctuation) {
  return `${greeting},${this.name}${punctuation}`;
}

const user = { name: "Alice" };
console.log(greet.call(user, "Hello", "!")); // "Hello, Alice!"
```

### `apply` — invoke immediately with args as array

```jsx
console.log(greet.apply(user, ["Hi", "?"])); // "Hi, Alice?"
```

### `bind` — returns a NEW function with `this` bound

```jsx
const boundGreet = greet.bind(user, "Hey");
console.log(boundGreet(".")); // "Hey, Alice."
```

**Memory trick:** Call → Comma-separated, Apply → Array, Bind → doesn’t call immediately (returns function).

---

## 38. Maplimit

`maplimit` runs async tasks concurrently but limits the number running at the same time (like a semaphore).

```jsx
async function mapLimit(array, limit, asyncFn) {
  const results = [];
  let index = 0;

  async function runNext() {
    if (index >= array.length) return;
    const currentIndex = index++;
    results[currentIndex] = await asyncFn(array[currentIndex]);
    await runNext();
  }

  const workers = Array.from(
    { length: Math.min(limit, array.length) },
    runNext,
  );
  await Promise.all(workers);
  return results;
}

// Usage
const urls = [1, 2, 3, 4, 5, 6];
const fetchData = (n) =>
  new Promise((res) => setTimeout(() => res(n * 2), 200));

mapLimit(urls, 2, fetchData).then(console.log); // [2, 4, 6, 8, 10, 12]
// Only 2 run at a time
```

---

## 39. Async and Await

`async/await` is syntactic sugar over Promises, making async code look and behave like synchronous code.

```jsx
// Promise-based
function fetchUser() {
  return fetch("/api/user")
    .then((res) => res.json())
    .then((data) => data);
}

// async/await equivalent
async function fetchUser() {
  const res = await fetch("/api/user");
  const data = await res.json();
  return data; // implicitly wraps in Promise
}
```

**Error handling with try/catch:**

```jsx
async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed:", error.message);
  } finally {
    console.log("Always runs");
  }
}
```

**Parallel execution:**

```jsx
// Sequential (slow) ❌
const a = await fetchA();
const b = await fetchB();

// Parallel (fast) ✅
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

---

## 40. Then and Catch

`.then()` and `.catch()` are Promise prototype methods for handling resolved and rejected states.

```jsx
fetch("/api/data")
  .then((response) => response.json()) // handle success
  .then((data) => console.log(data)) // chain more
  .catch((error) => console.error(error)) // handle any error in chain
  .finally(() => console.log("Done")); // always runs
```

**.then() signature:**

```jsx
promise.then(onFulfilled, onRejected);
// second arg is less common — .catch() is preferred
```

**Error propagation:**

```jsx
Promise.resolve("start")
  .then((val) => {
    throw new Error("oops");
  })
  .then((val) => console.log("never reaches here"))
  .catch((err) => console.log("Caught:", err.message)); // "Caught: oops"
```

---

## 41. Variable Shadowing

**Variable shadowing** occurs when a variable in an inner scope has the **same name** as a variable in an outer scope, effectively hiding the outer one.

```jsx
let x = "global";

function outer() {
  let x = "outer"; // shadows global x

  function inner() {
    let x = "inner"; // shadows outer x
    console.log(x); // "inner"
  }

  inner();
  console.log(x); // "outer"
}

outer();
console.log(x); // "global"
```

**Illegal shadowing:** `let` cannot shadow `var` in the same or outer scope in a block:

```jsx
var a = 1;
{
  let a = 2; // ✅ valid — let inside block can shadow outer var
}

let b = 1;
{
  var b = 2; // ❌ SyntaxError — var cannot shadow let from outer scope
}
```

---

## 42. What Does `static` Mean in a JavaScript Class?

A `static` method or property belongs to the **class itself**, not to instances. You call it on the class, not on an object.

```jsx
class MathUtils {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(2, 3)); // 5

const m = new MathUtils();
console.log(m.PI); // ❌ undefined — not on instance
console.log(m.add(2, 3)); // ❌ TypeError
```

**Use cases:** utility/helper methods, factory methods, counters, constants.

```jsx
class User {
  static count = 0;

  constructor(name) {
    this.name = name;
    User.count++;
  }

  static getCount() {
    return User.count;
  }
}

new User("Alice");
new User("Bob");
console.log(User.getCount()); // 2
```

---

## 43. Undefined vs Not-Defined vs Null

|         | `undefined`           | not-defined      | `null`                 |
| ------- | --------------------- | ---------------- | ---------------------- |
| Type    | `"undefined"`         | ReferenceError   | `"object"`             |
| Meaning | Declared but no value | Never declared   | Intentionally no value |
| Example | `let x;`              | `console.log(y)` | `let x = null;`        |

```jsx
let a;
console.log(a); // undefined
console.log(typeof a); // "undefined"

console.log(typeof b); // "undefined" (typeof doesn't throw)
console.log(b); // ❌ ReferenceError: b is not defined

let c = null;
console.log(c); // null
console.log(typeof c); // "object" (historical JS bug)

// Comparisons
console.log(null == undefined); // true (loose equality)
console.log(null === undefined); // false (strict equality)
```

---

## 44. Higher Order Functions

A **Higher Order Function (HOF)** is a function that either:

1. Takes a function as an argument, OR
2. Returns a function as a result.

```jsx
// Takes function as argument
function applyTwice(fn, value) {
  return fn(fn(value));
}

const double = (x) => x * 2;
console.log(applyTwice(double, 3)); // 12

// Returns a function
function multiplier(x) {
  return (y) => x * y;
}
const triple = multiplier(3);
console.log(triple(5)); // 15

// Built-in HOFs:
[1, 2, 3].map((x) => x * 2); // [2, 4, 6]
[1, 2, 3].filter((x) => x > 1); // [2, 3]
[1, 2, 3].reduce((acc, x) => acc + x, 0); // 6
```

---

## 45. Callback Hell

**Callback Hell** (a.k.a. “Pyramid of Doom”) is when multiple nested callbacks make code extremely hard to read and maintain.

```jsx
// ❌ Callback Hell
getUser(userId, function (user) {
  getOrders(user.id, function (orders) {
    getOrderDetails(orders[0].id, function (details) {
      getShipping(details.shippingId, function (shipping) {
        console.log(shipping); // deeply nested
      });
    });
  });
});

// ✅ Fixed with Promises
getUser(userId)
  .then((user) => getOrders(user.id))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => getShipping(details.shippingId))
  .then((shipping) => console.log(shipping))
  .catch((err) => console.error(err));

// ✅ Even better with async/await
async function loadShipping(userId) {
  const user = await getUser(userId);
  const orders = await getOrders(user.id);
  const details = await getOrderDetails(orders[0].id);
  const shipping = await getShipping(details.shippingId);
  console.log(shipping);
}
```

---

## 46. `this` Concept in JS

`this` refers to the **object that is currently executing the function**. Its value depends on **how the function is called**.

```jsx
// 1. Global context
console.log(this); // Window (browser) / global (Node.js)

// 2. Object method
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice" — this = obj
  },
};
obj.greet();

// 3. Regular function (non-strict)
function show() {
  console.log(this); // Window (non-strict)
}

// 4. Arrow function — inherits this from lexical scope
const person = {
  name: "Bob",
  greet: () => {
    console.log(this.name); // undefined — arrow functions don't have own this
  },
  greetCorrect() {
    const inner = () => console.log(this.name); // "Bob" — lexical this
    inner();
  },
};

// 5. Constructor
function User(name) {
  this.name = name; // this = new object being created
}

// 6. call/apply/bind — explicitly set this
function sayHi() {
  console.log(this.name);
}
sayHi.call({ name: "Charlie" }); // "Charlie"
```

---

## 47. Function Declaration, Expression, Anonymous, Arrow Functions

### Function Declaration

```jsx
function greet(name) {
  return `Hello,${name}!`;
}
// Hoisted — can be called before declaration
greet("Alice"); // ✅
```

### Function Expression

```jsx
const greet = function (name) {
  return `Hello,${name}!`;
};
// NOT hoisted (TDZ if let/const, undefined if var)
```

### Anonymous Function

```jsx
const greet = function (name) {
  // no name after 'function'
  return `Hello,${name}!`;
};

// Also used in callbacks:
setTimeout(function () {
  console.log("anonymous");
}, 1000);
```

### Named Function Expression

```jsx
const greet = function sayHello(name) {
  // 'sayHello' only accessible inside the function
  return `Hello,${name}!`;
};
```

### Arrow Function

```jsx
const greet = (name) => `Hello,${name}!`;

// Key differences:
// 1. No own 'this' — inherits from surrounding scope
// 2. Cannot be used as constructors
// 3. No 'arguments' object
// 4. Cannot use 'yield' (not a generator)
```

---

## 48. Async vs Defer

These are HTML script tag attributes that control when a script is downloaded and executed.

|                  | `normal`            | `async`               | `defer`           |
| ---------------- | ------------------- | --------------------- | ----------------- |
| Download         | Blocks HTML parsing | Parallel              | Parallel          |
| Execution        | Immediately         | As soon as downloaded | After HTML parsed |
| Order guaranteed | Yes                 | No                    | Yes               |
| DOMContentLoaded | Before              | Not guaranteed        | Before            |

```html
<!-- Blocks parsing — bad for performance -->
<script src="app.js"></script>

<!-- Downloads in parallel, executes immediately when ready — order not guaranteed -->
<script async src="analytics.js"></script>

<!-- Downloads in parallel, executes after DOM is ready — order preserved -->
<script defer src="app.js"></script>
```

**When to use:**

- `defer` — for scripts that depend on the DOM or each other.
- `async` — for independent scripts (analytics, ads).

---

## 49. Execution Context

An **Execution Context** is the environment in which JavaScript code is evaluated and executed.

**Types:**

1. **Global Execution Context (GEC)** — created when the script starts.
2. **Function Execution Context (FEC)** — created for every function call.
3. **Eval Execution Context** — inside `eval()`.

**Each context has two phases:**

### Creation Phase

- Creates `this` binding.
- Creates **Lexical Environment** (scope chain).
- Hoists variables (`var` → `undefined`, `let/const` → TDZ, functions → fully hoisted).

### Execution Phase

- Code runs line by line.
- Variables are assigned values.

```jsx
var x = 10;

function outer() {
  var y = 20;

  function inner() {
    var z = 30;
    console.log(x, y, z); // 10, 20, 30
  }

  inner(); // Creates new execution context
}

outer(); // Creates new execution context
```

Each function call pushes a new FEC onto the **Call Stack**.

---

## 50. Call Stack

The **Call Stack** is a LIFO (Last In, First Out) data structure that tracks the currently executing function.

- When a function is called → pushed onto the stack.
- When a function returns → popped off the stack.

```jsx
function first() {
  console.log("first starts");
  second();
  console.log("first ends");
}

function second() {
  console.log("second starts");
  third();
  console.log("second ends");
}

function third() {
  console.log("third");
}

first();

// Call Stack progression:
// [first] → [first, second] → [first, second, third]
// → [first, second] → [first] → []
```

**Stack Overflow:** If recursion is too deep (or infinite), the call stack exceeds its limit:

```jsx
function infinite() {
  infinite();
}
infinite(); // ❌ RangeError: Maximum call stack size exceeded
```

---

## 51. Garbage Collection

JavaScript has **automatic memory management**. The garbage collector frees memory that is no longer reachable.

**Algorithm: Mark-and-Sweep**

1. Start from **roots** (global variables, current call stack).
2. **Mark** all reachable objects.
3. **Sweep** (free) everything that is unreachable.

```jsx
let obj = { data: "hello" }; // obj referenced → not garbage collected
obj = null; // obj no longer referenced → eligible for GC
```

**Memory Leaks (common causes):**

```jsx
// 1. Accidental globals
function leak() {
  leakyVar = "I'm global!"; // missing var/let/const
}

// 2. Closures holding large data
function createLeak() {
  const bigArray = new Array(1000000);
  return () => bigArray.length; // bigArray never freed
}

// 3. Detached DOM nodes
let el = document.getElementById("btn");
el.addEventListener("click", handler);
document.body.removeChild(el);
// el still referenced → not GC'd
el = null; // ✅ fix

// 4. Forgotten timers
const timer = setInterval(() => {}, 1000);
// clearInterval(timer) when done
```

---

## 52. Equality — `===` vs `==`

### Strict Equality (`===`)

Compares **value AND type**. No coercion.

```jsx
5 === 5; // true
5 === "5"; // false — different types
null === null; // true
null === undefined; // false
```

### Loose Equality (`==`)

Compares **value after type coercion**.

```jsx
5 == "5"; // true  — string coerced to number
0 == false; // true  — false → 0
null == undefined; // true
null == 0; // false
NaN == NaN; // false — NaN is never equal to anything

[] == false; // true  — [] → "" → 0; false → 0
[] == ![]; // true  — weird JS coercion!
```

**Best practice:** Always use `===` unless you specifically need type coercion.

---

## 53. Strict Mode

Strict mode (`"use strict"`) makes JavaScript enforce stricter parsing and error handling.

```jsx
"use strict";

x = 10; // ❌ ReferenceError — undeclared variable

function test() {
  "use strict"; // can also be scoped to a function
  this; // undefined in strict mode (not global object)
}

delete Object.prototype; // ❌ TypeError — can't delete
arguments.caller; // ❌ TypeError — not allowed
```

**What strict mode prevents:**

- Undeclared variables
- Deleting undeletable properties
- Duplicate parameter names
- `with` statement
- `this` defaulting to global object in functions
- Writing to read-only / getter-only properties

**ES6 Modules are in strict mode by default.**

---

## 54. Lexical Environment

A **Lexical Environment** is a data structure that holds the mapping of identifiers (variable/function names) to their values, along with a reference to the **outer (parent) environment**.

It has two parts:

1. **Environment Record** — stores identifier bindings.
2. **Reference to outer lexical environment** — enables scope chaining.

```jsx
let globalVar = "global";

function outer() {
  let outerVar = "outer";

  function inner() {
    let innerVar = "inner";

    // inner's lexical env:
    // { innerVar: "inner", outer: outer's env }

    // outer's lexical env:
    // { outerVar: "outer", outer: global env }

    // global env:
    // { globalVar: "global", outer: null }

    console.log(globalVar); // found via chain
  }

  inner();
}

outer();
```

Lexical environments are created at the time of **writing** (lexical = where you write it), not at call time. This is what makes **closures** work — a function retains access to the lexical environment in which it was defined.

---

# POLYFILLS

---

## Polyfill 1: Map, Filter, Reduce, forEach, Find

```jsx
// Array.prototype.myMap
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Array.prototype.myFilter
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

// Array.prototype.myReduce
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  const start = initialValue !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

// Array.prototype.myForEach
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

// Array.prototype.myFind
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return this[i];
  }
  return undefined;
};

// Usage
const nums = [1, 2, 3, 4, 5];
console.log(nums.myMap((x) => x * 2)); // [2,4,6,8,10]
console.log(nums.myFilter((x) => x % 2 === 0)); // [2,4]
console.log(nums.myReduce((acc, x) => acc + x, 0)); // 15
console.log(nums.myFind((x) => x > 3)); // 4
```

---

## Polyfill 2: Call, Apply, Bind

```jsx
// Function.prototype.myCall
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

// Function.prototype.myApply
Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

// Function.prototype.myBind
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.myCall(context, ...boundArgs, ...callArgs);
  };
};

// Usage
function greet(greeting, punctuation) {
  return `${greeting},${this.name}${punctuation}`;
}
const user = { name: "Alice" };
console.log(greet.myCall(user, "Hello", "!")); // "Hello, Alice!"
console.log(greet.myApply(user, ["Hi", "?"])); // "Hi, Alice?"
const bound = greet.myBind(user, "Hey");
console.log(bound(".")); // "Hey, Alice."
```

---

## Polyfill 3: Promise, Promise.all, Promise.any, Promise.allSettled, Promise.race

```jsx
// Promise.all
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          results[i] = val;
          if (++completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};

// Promise.allSettled
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          if (++completed === promises.length) resolve(results);
        });
    });
  });
};

// Promise.race
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve).catch(reject));
  });
};

// Promise.any
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejected = 0;
    if (promises.length === 0)
      return reject(new AggregateError([], "All promises rejected"));
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          if (++rejected === promises.length)
            reject(new AggregateError(errors, "All promises rejected"));
        });
    });
  });
};
```

---

## Polyfill 4: Maplimit

```jsx
async function mapLimit(array, limit, asyncFn) {
  const results = new Array(array.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < array.length) {
      const index = nextIndex++;
      results[index] = await asyncFn(array[index]);
    }
  }

  const concurrentWorkers = Array.from(
    { length: Math.min(limit, array.length) },
    worker,
  );

  await Promise.all(concurrentWorkers);
  return results;
}

// Usage
const items = [1, 2, 3, 4, 5, 6];
const slowDouble = (n) =>
  new Promise((res) => setTimeout(() => res(n * 2), 100));
mapLimit(items, 2, slowDouble).then(console.log); // [2,4,6,8,10,12]
```

---

## Polyfill 5: Debounce

```jsx
function debounce(fn, delay) {
  let timerId;

  function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }

  debounced.cancel = function () {
    clearTimeout(timerId);
  };

  return debounced;
}

// Usage
const onSearch = debounce((query) => {
  console.log("Searching:", query);
}, 500);

onSearch("j");
onSearch("ja");
onSearch("jav"); // Only this one fires after 500ms gap
```

---

## Polyfill 6: Throttle

```jsx
function throttle(fn, delay) {
  let lastTime = 0;
  let timerId;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);

    if (remaining <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        lastTime = Date.now();
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// Usage
const onScroll = throttle(() => {
  console.log("Scrolled at", Date.now());
}, 1000);

window.addEventListener("scroll", onScroll);
```

---

## Polyfill 7: Event Emitter

```jsx
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((l) => l !== listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach((listener) => listener(...args));
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on("data", (msg) => console.log("Got:", msg));
emitter.once("connect", () => console.log("Connected!")); // fires once

emitter.emit("data", "hello"); // "Got: hello"
emitter.emit("connect"); // "Connected!"
emitter.emit("connect"); // nothing — already removed
```

---

## Polyfill 8: setInterval

```jsx
function mySetInterval(fn, delay, ...args) {
  let active = true;
  let timerId;

  function repeat() {
    if (!active) return;
    timerId = setTimeout(() => {
      fn(...args);
      repeat();
    }, delay);
  }

  repeat();

  return {
    clear: function () {
      active = false;
      clearTimeout(timerId);
    },
  };
}

// Usage
const interval = mySetInterval(() => {
  console.log("Tick:", Date.now());
}, 1000);

setTimeout(() => interval.clear(), 4000); // stops after ~4 seconds
```

---

## Polyfill 9: Parallel Limit Function

```jsx
function parallelLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = [];
    let started = 0;
    let completed = 0;
    const total = tasks.length;

    if (total === 0) return resolve([]);

    function runNext() {
      if (started >= total) return;
      const index = started++;

      Promise.resolve(tasks[index]())
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === total) {
            resolve(results);
          } else {
            runNext();
          }
        })
        .catch(reject);
    }

    for (let i = 0; i < Math.min(limit, total); i++) {
      runNext();
    }
  });
}

// Usage
const tasks = [1, 2, 3, 4, 5].map(
  (n) => () =>
    new Promise((res) => setTimeout(() => res(n * 10), Math.random() * 500)),
);

parallelLimit(tasks, 2).then(console.log); // [10, 20, 30, 40, 50]
```

---

## Polyfill 10: Deep vs Shallow Copy

```jsx
// Shallow Copy (only top level is copied)
const shallow1 = Object.assign({}, original);
const shallow2 = { ...original };
const shallow3 = original.slice(); // arrays

// Deep Copy — Method 1: JSON (simple, limited)
const deep1 = JSON.parse(JSON.stringify(obj));
// ⚠️ Loses: functions, undefined, Symbol, Date, RegExp, circular refs

// Deep Copy — Method 2: structuredClone (modern)
const deep2 = structuredClone(obj);
// ✅ Handles: Date, RegExp, Map, Set, circular refs
// ❌ Doesn't handle: functions, symbols

// Deep Copy — Method 3: Custom recursive
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value); // handle circular refs

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Map) {
    const mapClone = new Map();
    seen.set(value, mapClone);
    value.forEach((v, k) => mapClone.set(k, deepClone(v, seen)));
    return mapClone;
  }
  if (value instanceof Set) {
    const setClone = new Set();
    seen.set(value, setClone);
    value.forEach((v) => setClone.add(deepClone(v, seen)));
    return setClone;
  }

  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);
  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key], seen);
  }
  return clone;
}
```

---

## Polyfill 11: Flatten Deeply Nested Object

```jsx
// Flatten array
function flattenArray(arr, depth = Infinity) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      acc.push(...flattenArray(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

// Flatten nested object (key paths like "a.b.c")
function flattenObject(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], fullKey, result);
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

// Usage
console.log(flattenArray([1, [2, [3, [4]]]])); // [1,2,3,4]

const nested = { a: { b: { c: 1 }, d: 2 }, e: 3 };
console.log(flattenObject(nested));
// { "a.b.c": 1, "a.d": 2, "e": 3 }
```

---

## Polyfill 12: Memoization / Caching

```jsx
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// With TTL (Time to Live) cache
function memoizeWithTTL(fn, ttl) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn.apply(this, args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };
}

// Usage
const expensiveCalc = memoize((n) => {
  console.log("Computing...");
  return n * n;
});

console.log(expensiveCalc(5)); // Computing... 25
console.log(expensiveCalc(5)); // 25 (from cache)
```

---

## Polyfill 13: Promise.finally

```jsx
Promise.prototype.myFinally = function (callback) {
  return this.then(
    (value) => Promise.resolve(callback()).then(() => value),
    (reason) =>
      Promise.resolve(callback()).then(() => {
        throw reason;
      }),
  );
};

// Usage
fetch("/api/data")
  .then((res) => res.json())
  .catch((err) => console.error(err))
  .myFinally(() => console.log("Request complete — hide loader"));
```

---

## Polyfill 14: Retry

```jsx
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(remaining) {
      fn()
        .then(resolve)
        .catch((err) => {
          if (remaining <= 0) {
            return reject(err);
          }
          console.log(`Retrying... (${remaining} left)`);
          setTimeout(() => attempt(remaining - 1), delay);
        });
    }
    attempt(retries);
  });
}

// With exponential backoff
function retryWithBackoff(fn, retries = 3, baseDelay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(remaining, delay) {
      fn()
        .then(resolve)
        .catch((err) => {
          if (remaining <= 0) return reject(err);
          console.log(`Retrying in${delay}ms...`);
          setTimeout(() => attempt(remaining - 1, delay * 2), delay);
        });
    }
    attempt(retries, baseDelay);
  });
}

// Usage
const unreliableFetch = () =>
  new Promise((res, rej) => {
    Math.random() > 0.7 ? res("success") : rej(new Error("failed"));
  });

retry(unreliableFetch, 5, 500)
  .then(console.log)
  .catch((err) => console.error("All retries failed:", err.message));
```

---

## 📚 Recommended Resources

| Resource                                                                        | Use Case                                       |
| ------------------------------------------------------------------------------- | ---------------------------------------------- |
| [Leetcode 30 Days of JS](https://leetcode.com/studyplan/30-days-of-javascript/) | Practice JS coding questions                   |
| [Road Side Coder (YouTube)](https://www.youtube.com/@RoadsideCoder)             | Polyfills and interview questions              |
| [Namaste JavaScript (YouTube)](https://www.youtube.com/@akshaymarch7)           | Deep understanding of each concept             |
| [JavaScript.info](https://javascript.info/)                                     | Documentation, fundamentals, data types        |
| ChatGPT                                                                         | Understanding concepts in depth with curiosity |

---

_Happy Coding! 🚀_
