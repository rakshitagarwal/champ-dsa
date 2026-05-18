# JavaScript Interview Guide - Key Topics

## 1. Promises

**Definition:** A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled, or rejected.

**Key Points:**

- Chainable using `.then()`, `.catch()`, `.finally()`
- Avoids callback hell

**Example:**

- Returns a value that will be available in the future

```jsx
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("Data loaded");
    else reject("Error occurred");
  }, 1000);
});

fetchData
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

---

## 2. Async/Await

**Definition:** Syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.

**Key Points:**

- `async` function always returns a Promise
- `await` pauses execution until Promise resolves
- Must use `await` inside `async` functions only
- Better error handling with try-catch

**Example:**

```jsx
async function getUserData() {
  try {
    const response = await fetch("https://api.example.com/user");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}
```

---

## 3. Event Loop

**Definition:** JavaScript's mechanism for handling asynchronous operations using a single-threaded, non-blocking model.

**Key Points:**

- Call Stack: Executes synchronous code
- Task Queue (Macrotasks): setTimeout, setInterval, I/O
- Microtask Queue: Promises, queueMicrotask, MutationObserver
- Microtasks execute before macrotasks
- Event loop checks if call stack is empty, then processes queues

**Example:**

```jsx
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
// Sync code first, then microtasks (Promise), then macrotasks (setTimeout)
```

---

## 4. Closures

**Definition:** A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has returned.

**Key Points:**

- Functions remember their lexical scope
- Enables data privacy and encapsulation
- Used in callbacks, event handlers, functional programming

**Example:**

```jsx
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
// 'count' is private and persists between calls
```

---

## 5. `this` Keyword

**Definition:** `this` refers to the context in which a function is called, not where it's defined.

**Key Points:**

- In methods: refers to the object
- In functions: refers to global object (or undefined in strict mode)
- Arrow functions: inherit `this` from parent scope
- Can be explicitly set with `.call()`, `.apply()`, `.bind()`

**Example:**

```jsx
const person = {
  name: "Alice",
  greet: function () {
    console.log(`Hi, I'm ${this.name}`);
  },
  greetArrow: () => {
    console.log(`Hi, I'm ${this.name}`); // 'this' is from outer scope
  },
};

person.greet(); // "Hi, I'm Alice"
person.greetArrow(); // "Hi, I'm undefined"
```

---

## 6. Prototypes and Prototypal Inheritance

**Definition:** JavaScript objects inherit properties and methods from a prototype object, forming a prototype chain.

**Key Points:**

- Every object has a `__proto__` property
- Functions have a `prototype` property
- `Object.create()` creates objects with specific prototype
- Chain ends at `Object.prototype`

**Example:**

```jsx
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound"
console.log(dog.__proto__ === Animal.prototype); // true
```

---

## 7. Classes (ES6+)

**Definition:** Syntactic sugar over prototypal inheritance providing cleaner syntax for creating objects and inheritance.

**Key Points:**

- `constructor` method for initialization
- `extends` for inheritance
- `super` to call parent class methods
- Class declarations are not hoisted

**Example:**

```jsx
class Vehicle {
  constructor(type) {
    this.type = type;
  }

  describe() {
    return `This is a ${this.type}`;
  }
}

class Car extends Vehicle {
  constructor(brand) {
    super("car");
    this.brand = brand;
  }
}

const myCar = new Car("Toyota");
console.log(myCar.describe()); // "This is a car"
```

---

## 8. Arrow Functions

**Definition:** Concise syntax for writing functions with lexical `this` binding.

**Key Points:**

- No own `this`, `arguments`, `super`, or `new.target`
- Cannot be used as constructors
- Implicit return for single expressions
- Cannot be used as methods when you need dynamic `this`

**Example:**

```jsx
// Traditional
const add = function (a, b) {
  return a + b;
};

// Arrow with implicit return
const addArrow = (a, b) => a + b;

// Lexical 'this'
const obj = {
  value: 10,
  method: function () {
    setTimeout(() => {
      console.log(this.value); // 10 (inherits 'this' from method)
    }, 100);
  },
};
```

---

## 9. Destructuring

**Definition:** Syntax for extracting values from arrays or properties from objects into distinct variables.

**Key Points:**

- Works with arrays and objects
- Supports default values
- Can rename variables in object destructuring
- Useful in function parameters

**Example:**

```jsx
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [3, 4, 5]

// Object destructuring
const user = { name: "Bob", age: 25, city: "NYC" };
const { name, age: userAge = 18 } = user;
console.log(name); // "Bob"
console.log(userAge); // 25
```

---

## 10. Spread and Rest Operators

**Definition:** The `...` operator either spreads elements (spread) or collects them (rest).

**Key Points:**

- **Spread:** Expands iterables into individual elements
- **Rest:** Collects multiple elements into an array
- Works with arrays, objects, and function arguments

**Example:**

```jsx
// Spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const obj = { a: 1, ...{ b: 2, c: 3 } }; // {a: 1, b: 2, c: 3}

// Rest
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

---

## 11. Map, Filter, Reduce

**Definition:** Higher-order array methods for functional programming.

**Key Points:**

- **Map:** Transforms each element, returns new array
- **Filter:** Selects elements based on condition, returns new array
- **Reduce:** Accumulates array into single value
- Do not mutate original array

**Example:**

```jsx
const numbers = [1, 2, 3, 4, 5];

// Map: double each number
const doubled = numbers.map((n) => n * 2); // [2, 4, 6, 8, 10]

// Filter: only even numbers
const evens = numbers.filter((n) => n % 2 === 0); // [2, 4]

// Reduce: sum all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
```

---

## 12. let, const, var

**Definition:** Variable declaration keywords with different scoping and mutability rules.

**Key Points:**

- **var:** Function-scoped, hoisted, can redeclare
- **let:** Block-scoped, hoisted but not initialized, no redeclaration
- **const:** Block-scoped, must initialize, cannot reassign (but objects/arrays are mutable)
- Prefer `const` by default, use `let` when reassignment needed

**Example:**

```jsx
// var: function-scoped
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10
}

// let: block-scoped
function testLet() {
  if (true) {
    let y = 20;
  }
  // console.log(y); // ReferenceError
}

// const: cannot reassign
const PI = 3.14;
// PI = 3; // TypeError
const arr = [1, 2];
arr.push(3); // OK, object is mutable
```

---

## 13. Template Literals

**Definition:** String literals allowing embedded expressions and multi-line strings using backticks.

**Key Points:**

- Use backticks ```
- Embed expressions with `${}`
- Support multi-line strings
- Tagged templates for custom string processing

**Example:**

```jsx
const name = "World";
const age = 5;

// Expression interpolation
const greeting = `Hello, ${name}!`;

// Multi-line
const message = `
  You are ${age} years old.
  Welcome to JavaScript!
`;

console.log(greeting); // "Hello, World!"
```

---

## 14. Hoisting

**Definition:** JavaScript's behavior of moving declarations to the top of their scope during compilation.

**Key Points:**

- `var` declarations hoisted and initialized with `undefined`
- `let`/`const` hoisted but in Temporal Dead Zone (TDZ)
- Function declarations fully hoisted
- Function expressions and arrow functions not hoisted

**Example:**

```jsx
console.log(a); // undefined (hoisted)
var a = 5;

// console.log(b); // ReferenceError (TDZ)
let b = 10;

sayHi(); // "Hello" (function hoisted)
function sayHi() {
  console.log("Hello");
}

// greet(); // TypeError (variable hoisted, not function)
var greet = function () {
  console.log("Hi");
};
```

---

## 15. Modules (ES6)

**Definition:** A way to organize and reuse code by exporting and importing between files.

**Key Points:**

- `export` to expose values from a module
- `import` to consume exported values
- Default exports vs named exports
- Modules are in strict mode by default
- Each module has its own scope

**Example:**

```jsx
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) {
  return a * b;
}

// app.js
import multiply, { add, subtract } from "./math.js";
console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
```

---

## 16. Optional Chaining (?.)

**Definition:** Safely access nested object properties without checking if each reference is valid.

**Key Points:**

- Returns `undefined` if reference is nullish
- Works with properties, methods, and arrays
- Short-circuits evaluation
- Introduced in ES2020

**Example:**

```jsx
const user = {
  name: "Alice",
  address: {
    city: "NYC",
  },
};

console.log(user.address?.city); // "NYC"
console.log(user.contact?.email); // undefined
console.log(user.getPhone?.()); // undefined
console.log(user.orders?.[0]?.total); // undefined
```

---

## 17. Nullish Coalescing (??)

**Definition:** Returns the right operand when left operand is `null` or `undefined`, otherwise returns left operand.

**Key Points:**

- Different from `||` which checks for falsy values
- Only treats `null` and `undefined` as nullish
- Useful for default values
- Introduced in ES2020

**Example:**

```jsx
const value1 = 0;
const value2 = null;

// Using ||
console.log(value1 || 10); // 10 (0 is falsy)

// Using ??
console.log(value1 ?? 10); // 0 (0 is not nullish)
console.log(value2 ?? 10); // 10 (null is nullish)

const config = { timeout: 0 };
const timeout = config.timeout ?? 3000; // 0
```

---

## 18. Call, Apply, Bind

**Definition:** Methods to explicitly set the `this` context when calling functions.

**Key Points:**

- **call:** Invokes function with specified `this` and arguments
- **apply:** Like call but takes arguments as array
- **bind:** Returns new function with bound `this` (doesn't invoke)
- All methods available on function objects

**Example:**

```jsx
const person = { name: "John" };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

// call: arguments individually
greet.call(person, "Hello", "!"); // "Hello, John!"

// apply: arguments as array
greet.apply(person, ["Hi", "."]); // "Hi, John."

// bind: returns new function
const greetJohn = greet.bind(person, "Hey");
greetJohn("!!!"); // "Hey, John!!!"
```

---

## 19. Set and Map

**Definition:** Collection types for storing unique values (Set) and key-value pairs (Map).

**Key Points:**

- **Set:** Stores unique values, any type
- **Map:** Stores key-value pairs, keys can be any type
- Both are iterable
- Better performance than arrays/objects for certain operations

**Example:**

```jsx
// Set
const uniqueNumbers = new Set([1, 2, 2, 3, 4, 4]);
console.log(uniqueNumbers); // Set {1, 2, 3, 4}
uniqueNumbers.add(5);
console.log(uniqueNumbers.has(3)); // true

// Map
const userRoles = new Map();
userRoles.set("alice", "admin");
userRoles.set("bob", "user");
console.log(userRoles.get("alice")); // "admin"
console.log(userRoles.size); // 2
```

---

## 20. Generator Functions

**Definition:** Functions that can pause execution and resume later, yielding multiple values over time.

**Key Points:**

- Declared with `function*`
- Use `yield` to pause and return values
- Return an iterator object
- Useful for lazy evaluation and infinite sequences

**Example:**

```jsx
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done); // true

// Infinite sequence
function* infiniteCounter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
```

---

## Quick Interview Tips

1. **Promise vs Async/Await:** Async/await is cleaner for sequential operations; Promises better for parallel operations with `Promise.all()`
2. **Event Loop Order:** Synchronous → Microtasks (Promises) → Macrotasks (setTimeout)
3. **Arrow Functions:** Cannot be constructors, no `arguments` object, lexical `this`
4. **Closures Use Cases:** Callbacks, data privacy, factory functions, currying
5. **const Objects:** The reference is constant, but object properties can change
6. **Hoisting Difference:** `var` initialized to `undefined`, `let`/`const` in TDZ
7. **Map vs Object:** Map allows any key type, maintains insertion order, has size property
8. **?? vs ||:** `??` only checks null/undefined, `||` checks all falsy values
