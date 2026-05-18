## HTML Questions

---

### 1. What is the difference between HTML and HTML5?

HTML5 is the latest version of HTML with new features like semantic elements (header, footer, article, section), multimedia support (audio, video), canvas for graphics, local storage, and new form input types. It also removes deprecated elements and focuses on better mobile support.

### 2. What are semantic HTML elements?

Semantic elements clearly describe their meaning to both the browser and developer. Examples include `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. They improve SEO and accessibility.

### 3. What is the difference between `<div>` and `<span>`?

- `<div>` is a block-level element that starts on a new line and takes full width
- `<span>` is an inline element that doesn’t start on a new line and only takes necessary width

### 4. What are data attributes in HTML?

Data attributes (`data-*`) allow you to store custom data on HTML elements. Example: `<div data-user-id="123">`. Access via JavaScript using `element.dataset.userId`.

### 5. What is the difference between `<script>`, `<script async>`, and `<script defer>`?

- `<script>`: Blocks HTML parsing, executes immediately
- `<script async>`: Downloads in parallel, executes as soon as available
- `<script defer>`: Downloads in parallel, executes after HTML parsing completes

### 6. What is the purpose of the `alt` attribute in images?

The `alt` attribute provides alternative text for images when they cannot be displayed. It’s crucial for accessibility (screen readers) and SEO.

### 7. What are void elements in HTML?

Void elements are self-closing tags that don’t have closing tags. Examples: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`.

### 8. What is the difference between `localStorage` and `sessionStorage`?

- `localStorage`: Persists data with no expiration time (until manually cleared)
- `sessionStorage`: Stores data for one session (cleared when browser tab is closed)

### 9. What are meta tags and why are they important?

Meta tags provide metadata about the HTML document. They’re used for SEO, responsive design (`viewport`), character encoding, and social media sharing (Open Graph tags).

### 10. What is the purpose of the `DOCTYPE` declaration?

`<!DOCTYPE html>` tells the browser which HTML version the page is written in, ensuring the page is rendered in standards mode rather than quirks mode.

### 11. What is the difference between inline, internal, and external CSS?

- Inline: Style attribute on elements (`<p style="color: red;">`)
- Internal: `<style>` tag in the `<head>` section
- External: Separate CSS file linked via `<link>` tag

### 12. What are HTML5 form validation attributes?

Attributes like `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"`, etc., provide built-in client-side validation.

### 13. What is the difference between `<section>` and `<article>`?

- `<article>`: Independent, self-contained content (blog post, news article)
- `<section>`: Thematic grouping of content, typically with a heading

### 14. What are accessibility (a11y) best practices in HTML?

Use semantic HTML, provide `alt` text for images, use ARIA attributes when needed, ensure proper heading hierarchy, make forms accessible with labels, and ensure keyboard navigation works.

### 15. What is the purpose of the `viewport` meta tag?

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

It controls the page’s dimensions and scaling on mobile devices for responsive design.

---

## CSS Questions

### 16. What is the CSS Box Model?

The box model consists of four parts:

- **Content**: The actual content (text, images)
- **Padding**: Space between content and border
- **Border**: Surrounds the padding
- **Margin**: Space outside the border

```css
.box {
  width: 100px; /* content width */
  padding: 10px; /* 10px on all sides */
  border: 2px solid black;
  margin: 20px; /* 20px on all sides */
  box-sizing: border-box; /* includes padding and border in width */
}
```

### 17. What is the difference between `display: none` and `visibility: hidden`?

- `display: none`: Removes element from layout (doesn’t take up space)
- `visibility: hidden`: Hides element but still takes up space in layout

```css
.hidden-display {
  display: none;
} /* Removed from flow */
.hidden-visibility {
  visibility: hidden;
} /* Invisible but present */
```

### 18. What are CSS selectors and their specificity?

Specificity determines which CSS rule applies when multiple rules target the same element.

**Specificity hierarchy** (highest to lowest):

1. Inline styles: `style="color: red"` (1000)
2. IDs: `#header` (100)
3. Classes, attributes, pseudo-classes: `.class`, `[type="text"]`, `:hover` (10)
4. Elements, pseudo-elements: `div`, `::before` (1)

```css
/* Specificity: 1 */
p {
  color: black;
}

/* Specificity: 10 */
.text {
  color: blue;
}

/* Specificity: 100 */
#main {
  color: green;
}

/* Specificity: 111 */
#main p.text {
  color: red;
} /* This wins */
```

### 19. What is Flexbox and how does it work?

Flexbox is a one-dimensional layout model for arranging items in rows or columns.

```css
.container {
  display: flex;
  flex-direction: row; /* row | column */
  justify-content: center; /* main axis alignment */
  align-items: center; /* cross axis alignment */
  flex-wrap: wrap; /* allows wrapping */
  gap: 10px; /* space between items */
}

.item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  flex-basis: 200px; /* initial size */
}
```

### 20. What is CSS Grid and how is it different from Flexbox?

- **Grid**: Two-dimensional layout (rows AND columns)
- **Flexbox**: One-dimensional layout (row OR column)

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: 100px auto;
  gap: 20px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
}
```

### 21. What is the difference between `absolute`, `relative`, `fixed`, and `sticky` positioning?

- **Static** (default): Normal document flow
- **Relative**: Positioned relative to its normal position
- **Absolute**: Positioned relative to nearest positioned ancestor
- **Fixed**: Positioned relative to viewport (stays on scroll)
- **Sticky**: Toggles between relative and fixed based on scroll position

```css
.relative {
  position: relative;
  top: 10px; /* moves down 10px from normal position */
}

.absolute {
  position: absolute;
  top: 0;
  right: 0; /* positioned relative to parent */
}

.fixed {
  position: fixed;
  bottom: 0; /* stays at bottom of viewport */
}

.sticky {
  position: sticky;
  top: 0; /* sticks to top when scrolling */
}
```

### 21. What are pseudo-classes and pseudo-elements?

- **Pseudo-classes**: Define special states (`:hover`, `:focus`, `:nth-child()`)
- **Pseudo-elements**: Style specific parts (`:before`, `::after`, `::first-letter`)

```css
/* Pseudo-classes (single colon) */
a:hover {
  color: red;
}
input:focus {
  border-color: blue;
}
li:nth-child(odd) {
  background: gray;
}
p:first-child {
  font-weight: bold;
}

/* Pseudo-elements (double colon) */
p::first-letter {
  font-size: 2em;
}
.box::before {
  content: "★";
  color: gold;
}
```

### 22. What is the `z-index` property?

`z-index` controls the stacking order of positioned elements (only works on positioned elements: relative, absolute, fixed, sticky).

```css
.modal {
  position: fixed;
  z-index: 1000; /* appears above other elements */
}

.overlay {
  position: fixed;
  z-index: 999; /* below modal */
}
```

### 23. What are CSS variables (Custom Properties)?

CSS variables allow you to store and reuse values throughout your stylesheet.

```css
:root {
  --primary-color: #3498db;
  --spacing: 16px;
  --border-radius: 4px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
  border-radius: var(--border-radius);
}

/* Can be changed with JavaScript */
element.style.setProperty('--primary-color', '#e74c3c');
```

### 24. What is the difference between `em`, `rem`, `px`, `%`, `vh`, and `vw`?

- **px**: Absolute pixels
- **em**: Relative to parent element’s font size
- **rem**: Relative to root element’s font size
- **%**: Relative to parent element
- **vh**: 1% of viewport height
- **vw**: 1% of viewport width

```css
html {
  font-size: 16px;
}

.parent {
  font-size: 20px;
  padding: 1em; /* 20px (1 * 20px) */
}

.child {
  font-size: 1rem; /* 16px (1 * root 16px) */
  width: 50%; /* 50% of parent width */
  height: 50vh; /* 50% of viewport height */
}
```

### 25. What is a CSS reset and normalize.css?

- **CSS Reset**: Removes all browser default styles
- **Normalize.css**: Makes default styles consistent across browsers while preserving useful defaults

```css
/* Simple reset example */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 26. What are media queries and responsive design?

Media queries apply styles based on device characteristics (width, height, orientation).

```css
/* Mobile first approach */
.container {
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}

/* Orientation */
@media (orientation: landscape) {
  .sidebar {
    display: none;
  }
}
```

### 27. What is the difference between `inline`, `block`, and `inline-block`?

- **Block**: Takes full width, starts on new line (`<div>`, `<p>`)
- **Inline**: Takes only necessary width, no line break (`<span>`, `<a>`)
- **Inline-block**: Like inline but can have width/height

```css
.block {
  display: block;
  width: 200px; /* works */
  height: 100px; /* works */
}

.inline {
  display: inline;
  width: 200px; /* ignored */
  height: 100px; /* ignored */
}

.inline-block {
  display: inline-block;
  width: 200px; /* works */
  height: 100px; /* works */
}
```

### 28. What is the CSS cascade and inheritance?

**Cascade**: The order in which CSS rules are applied based on specificity, source order, and importance.

**Inheritance**: Some properties (like `color`, `font-family`) are inherited by child elements.

```css
/* Inheritance example */
.parent {
  color: blue; /* inherited by children */
  border: 1px solid; /* NOT inherited */
}

/* Force inheritance */
.child {
  border: inherit;
}
```

### 29. What are CSS transitions and animations?

**Transitions**: Smooth changes between states

**Animations**: More complex, multi-step animations

```css
/* Transition */
.button {
  background: blue;
  transition:
    background 0.3s ease,
    transform 0.3s;
}

.button:hover {
  background: red;
  transform: scale(1.1);
}

/* Animation */
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease-in-out forwards;
}
```

### 30. What is the `!important` rule and when should you use it?

`!important` overrides all other declarations. Use sparingly as it makes debugging difficult.

```css
.text {
  color: blue !important; /* Overrides all other color rules */
}

/* Valid use cases: */
/* - Overriding third-party CSS */
/* - Utility classes */
.hidden {
  display: none !important;
}
```

### 31. What is the difference between `overflow: hidden`, `overflow: scroll`, and `overflow: auto`?

- **hidden**: Clips overflow content (no scrollbar)
- **scroll**: Always shows scrollbar
- **auto**: Shows scrollbar only when needed

```css
.container-hidden {
  overflow: hidden; /* content clipped */
}

.container-scroll {
  overflow: scroll; /* always scrollable */
}

.container-auto {
  overflow: auto; /* scrollable if needed */
}

.container-x {
  overflow-x: scroll; /* horizontal only */
  overflow-y: hidden; /* vertical hidden */
}
```

### 32. What are CSS preprocessors (Sass, LESS)?

Preprocessors extend CSS with features like variables, nesting, mixins, and functions.

```scss
/* SCSS (Sass) example */
$primary-color: #3498db;
$spacing: 16px;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
  padding: $spacing;

  .header {
    background: $primary-color;

    &:hover {
      background: darken($primary-color, 10%);
    }
  }
}
```

### 33. What is BEM (Block Element Modifier) methodology?

BEM is a naming convention for CSS classes to make code more maintainable.

```css
/* Block */
.card {
}

/* Element (part of block) */
.card__header {
}
.card__body {
}
.card__footer {
}

/* Modifier (variation of block/element) */
.card--featured {
}
.card__header--large {
}
```

```html
<div class="card card--featured">
  <div class="card__header card__header--large">Title</div>
  <div class="card__body">Content</div>
</div>
```

### 34. What is the `calc()` function?

`calc()` performs calculations to determine CSS property values.

```css
.element {
  width: calc(100% - 50px);
  height: calc(100vh - 80px);
  margin: calc(1rem + 5px);
  font-size: calc(1rem + 2vw);
}
```

### 35. What are vendor prefixes?

Vendor prefixes are used for experimental CSS features.

```css
.element {
  -webkit-transform: rotate(45deg); /* Chrome, Safari */
  -moz-transform: rotate(45deg); /* Firefox */
  -ms-transform: rotate(45deg); /* IE */
  -o-transform: rotate(45deg); /* Opera */
  transform: rotate(45deg); /* Standard */
}

/* Modern approach: use autoprefixer */
```

### 36. What is the difference between `opacity` and `rgba()`?

- **opacity**: Affects entire element including children
- **rgba()**: Affects only the specific property (background, color)

```css
.parent {
  opacity: 0.5; /* Makes everything 50% transparent, including children */
}

.child {
  background: rgba(255, 0, 0, 0.5); /* Only background is 50% transparent */
  color: rgba(0, 0, 0, 0.8); /* Text is 80% opaque */
}
```

### 37. What are CSS counters?

CSS counters let you automatically number elements.

```css
body {
  counter-reset: section;
}

h2::before {
  counter-increment: section;
  content: "Section " counter(section) ": ";
}
```

### 38. What is the `:nth-child()` selector?

Selects elements based on their position among siblings.

```css
/* Select odd rows */
tr:nth-child(odd) {
  background: #f0f0f0;
}

/* Select even rows */
tr:nth-child(even) {
  background: white;
}

/* Select every 3rd element */
li:nth-child(3n) {
  color: blue;
}

/* Select first 3 elements */
p:nth-child(-n + 3) {
  font-weight: bold;
}

/* Select last element */
div:nth-child(1) {
  margin-top: 0;
}
```

### 39. What is the difference between `min-width`, `max-width`, and `width`?

- **width**: Sets exact width
- **min-width**: Sets minimum width (can grow larger)
- **max-width**: Sets maximum width (can be smaller)

```css
.responsive-container {
  width: 100%;
  max-width: 1200px; /* Won't exceed 1200px */
  min-width: 320px; /* Won't go below 320px */
  margin: 0 auto; /* Center it */
}
```

### 40. What are CSS Grid areas?

Grid areas allow you to name sections of your grid layout.

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

### 41. What is the `object-fit` property?

Controls how replaced elements (like `<img>` or `<video>`) fit into their container.

```css
.image {
  width: 300px;
  height: 200px;
  object-fit: cover; /* Crops to fill, maintains aspect ratio */
  /* object-fit: contain;  /* Fits inside, maintains aspect ratio */
  /* object-fit: fill;     /* Stretches to fill */
  /* object-fit: none;     /* Original size */
  object-position: center; /* Position within container */
}
```

### 42. What are CSS transforms?

Transforms allow you to rotate, scale, skew, or translate elements.

```css
.element {
  /* 2D transforms */
  transform: translate(50px, 100px);
  transform: rotate(45deg);
  transform: scale(1.5);
  transform: skew(10deg, 5deg);

  /* 3D transforms */
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: perspective(500px) rotateY(45deg);

  /* Multiple transforms */
  transform: translate(50px, 50px) rotate(45deg) scale(1.2);
}
```

### 43. What is the `filter` property?

Applies graphical effects like blur, brightness, and contrast.

```css
.image {
  filter: blur(5px);
  filter: brightness(150%);
  filter: contrast(200%);
  filter: grayscale(100%);
  filter: hue-rotate(90deg);
  filter: invert(100%);
  filter: saturate(200%);
  filter: sepia(100%);

  /* Multiple filters */
  filter: brightness(110%) contrast(120%) saturate(130%);
}
```

### 44. What is the difference between `content-box` and `border-box`?

Controls how width/height are calculated.

```css
/* content-box (default) */
.content-box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* Total width: 200 + 20*2 + 5*2 = 250px */
}

/* border-box (recommended) */
.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* Total width: 200px (includes padding and border) */
}

/* Apply to all elements */
* {
  box-sizing: border-box;
}
```

### 45. What are attribute selectors?

Select elements based on attributes and their values.

```css
/* Has attribute */
[disabled] {
  opacity: 0.5;
}

/* Exact match */
[type="text"] {
  border: 1px solid blue;
}

/* Contains word */
[class~="button"] {
  padding: 10px;
}

/* Starts with */
[href^="https"] {
  color: green;
}

/* Ends with */
[href$=".pdf"] {
  background: url(pdf-icon.png);
}

/* Contains substring */
[href*="example"] {
  font-weight: bold;
}
```

### 46. What is the `clip-path` property?

Creates clipping regions to show only parts of an element.

```css
.circle {
  clip-path: circle(50%);
}

.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
```

### 47. What is CSS Grid `auto-fit` vs `auto-fill`?

Both create responsive grid columns, but behave differently with extra space.

```css
/* auto-fill: Creates empty columns */
.grid-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* auto-fit: Stretches items to fill space */
.grid-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

### 48. What are CSS logical properties?

Logical properties adapt to writing direction (useful for internationalization).

```css
/* Traditional */
.element {
  margin-left: 10px;
  margin-right: 20px;
}

/* Logical (adapts to RTL/LTR) */
.element {
  margin-inline-start: 10px; /* left in LTR, right in RTL */
  margin-inline-end: 20px; /* right in LTR, left in RTL */
  margin-block-start: 10px; /* top */
  margin-block-end: 20px; /* bottom */
}
```

### 49. What is the `:has()` pseudo-class?

The “parent selector” - selects elements that contain specific children.

```css
/* Select div that has a paragraph */
div:has(p) {
  background: yellow;
}

/* Select form with invalid input */
form:has(input:invalid) {
  border: 2px solid red;
}

/* Select card with image */
.card:has(img) {
  display: grid;
}
```

### 50. What is the `aspect-ratio` property?

Sets the preferred aspect ratio for an element.

```css
.video-container {
  aspect-ratio: 16 / 9; /* Maintains 16:9 ratio */
}

.square {
  aspect-ratio: 1; /* Square */
}

.portrait {
  aspect-ratio: 3 / 4;
}
```

### 51. What is the difference between `transition` and `animation`?

- **Transition**: Requires trigger (hover, focus), goes from A to B
- **Animation**: Can run automatically, multiple keyframes, loops

```css
/* Transition - needs trigger */
.button {
  transition: all 0.3s;
}
.button:hover {
  transform: scale(1.1);
}

/* Animation - runs automatically */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.element {
  animation: bounce 1s infinite;
}
```

### 52. What are CSS container queries?

Allow styling based on container size (not viewport size).

```css
.container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-title {
    font-size: 2rem;
  }
}
```

### 53. What is the `will-change` property?

Hints to the browser about upcoming changes for optimization.

```css
.element {
  will-change: transform, opacity;
}

/* Remove after animation */
.element.animated {
  will-change: auto;
}

/* Don't overuse - can harm performance */
```

### 54. What is the difference between CSS Grid and Flexbox use cases?

**Use Flexbox when:**

- Single row or column layout
- Content-driven sizing
- Aligning items
- Navigation menus, toolbars

**Use Grid when:**

- Two-dimensional layouts
- Complex layouts with rows AND columns
- Precise control over placement
- Page layouts, dashboards

```css
/* Flexbox - for navigation */
.nav {
  display: flex;
  justify-content: space-between;
}

/* Grid - for page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
```

---

## JavaScript Questions

### 56. What is the difference between `var`, `let`, and `const`?

- `var`: Function-scoped, hoisted, can be redeclared
- `let`: Block-scoped, hoisted but not initialized, cannot be redeclared
- `const`: Block-scoped, hoisted but not initialized, cannot be reassigned (but objects/arrays can be mutated)

### 57. What is hoisting in JavaScript?

Hoisting is JavaScript’s behavior of moving declarations to the top of their scope before code execution. Variables declared with `var` and function declarations are hoisted.

```jsx
console.log(x); // undefined (hoisted but not initialized)
var x = 5;

sayHi(); // Works! (function declaration hoisted)
function sayHi() {
  console.log("Hi");
}
```

### 58. What is the difference between `==` and `===`?

- `==`: Loose equality, performs type coercion
- `===`: Strict equality, checks both value and type

```jsx
5 == "5"; // true
5 === "5"; // false
```

### 59. What are closures in JavaScript?

A closure is a function that has access to variables in its outer (enclosing) function’s scope, even after the outer function has returned.

```jsx
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

### 60. What is the difference between `null` and `undefined`?

- `undefined`: Variable declared but not assigned a value
- `null`: Explicitly assigned to represent “no value”

```jsx
let x;
console.log(x); // undefined

let y = null;
console.log(y); // null
```

### 61. What are arrow functions and how do they differ from regular functions?

Arrow functions have shorter syntax and don’t have their own `this`, `arguments`, `super`, or `new.target`. They cannot be used as constructors.

```jsx
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```

### 62. What is the `this` keyword in JavaScript?

`this` refers to the object that is executing the current function. Its value depends on how the function is called (method, regular function, arrow function, event handler, etc.).

### 63. What is event delegation?

Event delegation involves attaching an event listener to a parent element instead of individual child elements, using event bubbling to handle events from children.

```jsx
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.matches(".child")) {
    console.log("Child clicked!");
  }
});
```

### 64. What is the Event Loop in JavaScript?

The Event Loop is a mechanism that handles asynchronous operations. It continuously checks the call stack and task queue, executing callback functions when the call stack is empty.

### 65. What are Promises in JavaScript?

Promises represent the eventual completion (or failure) of an asynchronous operation. They have three states: pending, fulfilled, or rejected.

```jsx
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise.then((result) => console.log(result));
```

### 66. What is async/await?

`async`/`await` is syntactic sugar for Promises, making asynchronous code look synchronous and easier to read.

```jsx
async function fetchData() {
  try {
    const response = await fetch("api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### 67. What is the difference between `call()`, `apply()`, and `bind()`?

All three methods set the `this` context:

- `call()`: Invokes function with specified `this` and arguments passed individually
- `apply()`: Same as call but arguments passed as an array
- `bind()`: Returns a new function with bound `this` (doesn’t invoke immediately)

```jsx
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "John" };

greet.call(person, "Hello", "!"); // Hello, John!
greet.apply(person, ["Hello", "!"]); // Hello, John!
const boundGreet = greet.bind(person);
boundGreet("Hello", "!"); // Hello, John!
```

### 68. What is destructuring in JavaScript?

Destructuring allows unpacking values from arrays or properties from objects into distinct variables.

```jsx
// Array destructuring
const [a, b] = [1, 2];

// Object destructuring
const { name, age } = { name: "John", age: 30 };

// With default values
const { city = "Unknown" } = {};
```

### 69. What is the spread operator and rest parameter?

- Spread (`...`): Expands iterables into individual elements
- Rest (`...`): Collects multiple elements into an array

```jsx
// Spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
```

### 70. What are Higher-Order Functions?

Functions that take other functions as arguments or return functions.

```jsx
// map, filter, reduce are higher-order functions
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);
```

### 71. What is prototype and prototypal inheritance?

Every JavaScript object has a prototype. Prototypal inheritance allows objects to inherit properties and methods from other objects.

```jsx
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log("Hello, " + this.name);
};

const john = new Person("John");
john.greet(); // Hello, John
```

### 72. What are ES6 Classes?

ES6 classes are syntactic sugar over JavaScript’s prototype-based inheritance.

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello,${this.name}`);
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
```

### 73. What is the difference between deep copy and shallow copy?

- Shallow copy: Copies only the first level of properties
- Deep copy: Recursively copies all nested properties

```jsx
// Shallow copy
const obj1 = { a: 1, b: { c: 2 } };
const shallow = { ...obj1 };

// Deep copy
const deep = JSON.parse(JSON.stringify(obj1));
// Or use structuredClone() in modern browsers
const deep2 = structuredClone(obj1);
```

### 74. What is event bubbling and capturing?

- Bubbling: Events propagate from target element up to root
- Capturing: Events propagate from root down to target element

```jsx
element.addEventListener("click", handler, false); // Bubbling (default)
element.addEventListener("click", handler, true); // Capturing
```

### 75. What is `setTimeout()` and `setInterval()`?

- `setTimeout()`: Executes code once after a delay
- `setInterval()`: Executes code repeatedly at specified intervals

```jsx
setTimeout(() => console.log("After 2s"), 2000);

const interval = setInterval(() => console.log("Every 1s"), 1000);
clearInterval(interval); // To stop
```

### 76. What are template literals?

Template literals use backticks and allow embedded expressions and multi-line strings.

```jsx
const name = "John";
const greeting = `Hello,${name}!
Welcome to our site.`;
```

### 77. What is the difference between `map()`, `filter()`, and `reduce()`?

- `map()`: Transforms each element and returns new array
- `filter()`: Returns new array with elements that pass a test
- `reduce()`: Reduces array to single value

```jsx
const nums = [1, 2, 3, 4, 5];

const doubled = nums.map((n) => n * 2); // [2, 4, 6, 8, 10]
const evens = nums.filter((n) => n % 2 === 0); // [2, 4]
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
```

### 78. What is currying in JavaScript?

Currying transforms a function with multiple arguments into a sequence of functions each taking a single argument.

```jsx
function curry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

const result = curry(1)(2)(3); // 6

// Or with arrow functions
const curriedAdd = (a) => (b) => (c) => a + b + c;
```

### 79. What is memoization?

Memoization is an optimization technique that caches function results for the same inputs.

```jsx
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}
```

### 80. What is the difference between synchronous and asynchronous code?

- Synchronous: Code executes line by line, blocking subsequent operations
- Asynchronous: Code can execute later, allowing other operations to continue

```jsx
// Synchronous
console.log("1");
console.log("2");
console.log("3");

// Asynchronous
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2
```

### 81. What are JavaScript modules (ES6 modules)?

Modules allow you to split code into reusable pieces using `import` and `export`.

```jsx
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from "./math.js";
```

### 82. What is the `typeof` operator?

`typeof` returns a string indicating the type of a variable.

```jsx
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" (known bug)
typeof {}; // "object"
typeof []; // "object"
typeof function () {}; // "function"
```

### 83. What is the difference between `for...in` and `for...of`?

- `for...in`: Iterates over enumerable property names (keys)
- `for...of`: Iterates over iterable values

```jsx
const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key); // "a", "b"
}

const arr = [1, 2, 3];
for (let value of arr) {
  console.log(value); // 1, 2, 3
}
```

### 84. What is strict mode in JavaScript?

Strict mode (`'use strict';`) enforces stricter parsing and error handling, catching common coding mistakes.

```jsx
"use strict";
x = 10; // Error: x is not defined
```

### 85. What is the difference between `slice()` and `splice()`?

- `slice()`: Returns a shallow copy of a portion (doesn’t modify original)
- `splice()`: Changes array by removing/replacing/adding elements (modifies original)

```jsx
const arr = [1, 2, 3, 4, 5];

const sliced = arr.slice(1, 3); // [2, 3], arr unchanged
const spliced = arr.splice(1, 2); // [2, 3], arr is now [1, 4, 5]
```

### 86. What are JavaScript data types?

Primitive types: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, `BigInt`
Reference type: `Object` (including Arrays, Functions, Dates, etc.)

### 87. What is NaN and how do you check for it?

`NaN` (Not-a-Number) is a special value representing an invalid number. Check using `isNaN()` or `Number.isNaN()`.

```jsx
console.log(isNaN("hello")); // true
console.log(Number.isNaN("hello")); // false (more accurate)
console.log(Number.isNaN(NaN)); // true
```

### 88. What is the difference between function declaration and function expression?

- Function declaration: Hoisted, can be called before definition
- Function expression: Not hoisted, must be defined before calling

```jsx
// Declaration (hoisted)
sayHi();
function sayHi() {
  console.log("Hi");
}

// Expression (not hoisted)
const sayBye = function () {
  console.log("Bye");
};
sayBye();
```

### 89. What is optional chaining (`?.`)?

Optional chaining safely accesses nested object properties without errors if a reference is null or undefined.

```jsx
const user = { name: "John" };

console.log(user?.address?.city); // undefined (no error)
console.log(user.profile.bio); // Error: Cannot read property 'bio'
```

### 90. What is the nullish coalescing operator (`??`)?

The `??` operator returns the right-hand operand when the left is `null` or `undefined`, but not for other falsy values.

```jsx
const value1 = null ?? "default"; // "default"
const value2 = undefined ?? "default"; // "default"
const value3 = 0 ?? "default"; // 0 (not "default")
const value4 = "" ?? "default"; // "" (not "default")
```

### 91. What is the `Object.freeze()` method?

`Object.freeze()` makes an object immutable (prevents adding, removing, or modifying properties).

```jsx
const obj = { name: "John" };
Object.freeze(obj);
obj.name = "Jane"; // Fails silently (or throws error in strict mode)
console.log(obj.name); // "John"
```

### 92. What is the difference between `Object.seal()` and `Object.freeze()`?

- `Object.seal()`: Prevents adding/removing properties but allows modifying existing ones
- `Object.freeze()`: Prevents all modifications

### 93. What is debouncing and throttling?

- **Debouncing**: Delays function execution until after a specified time has passed since the last call
- **Throttling**: Ensures function executes at most once in a specified time period

```jsx
// Debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

### 94. What is the DOM and how do you manipulate it?

The DOM (Document Object Model) is a programming interface for HTML documents. JavaScript can manipulate it to change content, structure, and styling.

```jsx
// Selecting elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");

// Modifying elements
element.textContent = "New text";
element.style.color = "red";
element.classList.add("active");

// Creating elements
const div = document.createElement("div");
div.innerHTML = "<p>Hello</p>";
document.body.appendChild(div);
```

### 95. What are JavaScript Promises methods?

- `Promise.all()`: Waits for all promises to resolve
- `Promise.race()`: Returns when first promise settles
- `Promise.allSettled()`: Waits for all promises to settle (resolve or reject)
- `Promise.any()`: Returns when first promise resolves

```jsx
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject("Error");

Promise.all([p1, p2]).then(console.log); // [1, 2]
Promise.race([p1, p2]).then(console.log); // 1
Promise.allSettled([p1, p2, p3]).then(console.log);
Promise.any([p3, p1]).then(console.log); // 1
```

---

## Bonus Tips for Interviews

1. **Understand the fundamentals**: Focus on core concepts in HTML (semantics, accessibility), CSS (box model, flexbox, grid, specificity), and JavaScript (closures, scope, hoisting, event loop)
2. **Practice coding**: Solve algorithm problems on platforms like LeetCode, HackerRank, and build small projects
3. **Know responsive design**: Understand mobile-first approach, media queries, and modern CSS layouts
4. **Master the MERN stack specifics**: Be ready to discuss React hooks, Express middleware, MongoDB queries, and Node.js event-driven architecture
5. **Prepare examples**: Have real project examples ready to discuss your approach to solving problems
6. **Understand browser compatibility**: Know common cross-browser issues and how to handle them
7. **Performance matters**: Be aware of CSS performance (repaints, reflows), JavaScript optimization, and loading strategies
8. **Ask questions**: Show interest in the role, tech stack, and team dynamics

**Quick Review Checklist:**

- ✅ HTML5 semantic elements and accessibility
- ✅ CSS Box Model, Flexbox, and Grid
- ✅ JavaScript ES6+ features (arrow functions, destructuring, promises, async/await)
- ✅ DOM manipulation and event handling
- ✅ Responsive design principles
- ✅ Version control (Git)
- ✅ Common algorithms and data structures

Good luck with your interviews! 🚀
