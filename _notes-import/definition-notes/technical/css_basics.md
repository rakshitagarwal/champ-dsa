# CSS Interview Preparation Notes

## 1. CSS Fundamentals

### What is CSS?

- Cascading Style Sheets - language for styling HTML documents
- Defines presentation, layout, and design
- Separates content (HTML) from presentation
- Three types: Inline, Internal (embedded), External

**Example:**

```css
/* External CSS (styles.css) */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
  text-align: center;
  font-size: 2rem;
}

/* Internal CSS (in HTML <style> tag) */
/* Inline CSS: <div style="color: red;"> */
```

---

## 2. CSS Selectors

### Definition

- Patterns to select and target HTML elements
- Types: element, class, ID, attribute, pseudo-class, pseudo-element
- Specificity determines which styles apply
- Can combine selectors for precision

**Example:**

```css
/* Element selector */
p {
  color: black;
}

/* Class selector */
.highlight {
  background-color: yellow;
}

/* ID selector */
#header {
  position: fixed;
}

/* Attribute selector */
input[type="text"] {
  border: 1px solid gray;
}

/* Descendant selector */
div p {
  margin: 10px;
}

/* Child selector */
ul > li {
  list-style: none;
}

/* Adjacent sibling */
h1 + p {
  font-weight: bold;
}

/* Pseudo-class */
a:hover {
  color: blue;
}

/* Pseudo-element */
p::first-line {
  text-transform: uppercase;
}

/* Multiple selectors */
h1,
h2,
h3 {
  font-family: Georgia;
}

/* Combining selectors */
div.container p.text {
  color: red;
}
```

---

## 3. CSS Specificity

### Definition

- Determines which CSS rule applies when multiple rules target same element
- Hierarchy: Inline styles > IDs > Classes/Attributes/Pseudo-classes > Elements
- Calculated as (inline, IDs, classes, elements)
- !important overrides everything (use sparingly)

**Example:**

```css
/* Specificity: 0,0,0,1 */
p {
  color: black;
}

/* Specificity: 0,0,1,0 */
.text {
  color: blue;
}

/* Specificity: 0,1,0,0 */
#content {
  color: green;
}

/* Specificity: 0,1,1,1 */
div#content .text {
  color: red;
}

/* Highest specificity - will apply */
div#content p.text {
  color: purple;
}

/* Override everything (avoid in production) */
p {
  color: orange !important;
}

/* HTML: <div id="content"><p class="text">Hello</p></div> */
/* Final color: purple (specificity 0,1,1,1 wins) */
```

---

## 4. Box Model

### Definition

- Foundation of CSS layout - every element is a rectangular box
- Four parts: Content, Padding, Border, Margin
- box-sizing property controls how width/height calculated
- Default: content-box, Recommended: border-box

**Example:**

```css
/* Standard box model (content-box) */
.box1 {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
/* Total width = 200 + 40 (padding) + 10 (border) = 250px */
/* Total height = 100 + 40 + 10 = 150px */

/* Border-box (width includes padding and border) */
.box2 {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
/* Total width = 200px (includes padding and border) */
/* Content width = 200 - 40 - 10 = 150px */

/* Apply to all elements (best practice) */
* {
  box-sizing: border-box;
}
```

---

## 5. Display Property

### Definition

- Controls how element is displayed in layout
- Common values: block, inline, inline-block, none, flex, grid
- Block: full width, new line. Inline: content width, same line
- Display none removes element from flow

**Example:**

```css
/* Block - takes full width, starts on new line */
div,
p,
h1 {
  display: block;
  width: 100%; /* can set width */
}

/* Inline - only takes content width, same line */
span,
a,
strong {
  display: inline;
  /* width and height don't apply */
}

/* Inline-block - inline flow, but can set dimensions */
.button {
  display: inline-block;
  width: 150px;
  height: 40px;
  padding: 10px;
}

/* Hide element completely */
.hidden {
  display: none; /* removes from document flow */
}

/* Visibility hidden vs display none */
.invisible {
  visibility: hidden; /* takes space but not visible */
}

/* Modern layout systems */
.flex-container {
  display: flex;
}

.grid-container {
  display: grid;
}
```

---

## 6. Position Property

### Definition

- Controls element positioning in document
- Values: static (default), relative, absolute, fixed, sticky
- top, right, bottom, left work with positioned elements
- Stacking context controlled by z-index

**Example:**

```css
/* Static - normal flow (default) */
.static {
  position: static;
}

/* Relative - offset from normal position */
.relative {
  position: relative;
  top: 20px;
  left: 30px;
  /* Still takes original space in layout */
}

/* Absolute - positioned relative to nearest positioned ancestor */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Removed from normal flow */
}

/* Fixed - positioned relative to viewport */
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  z-index: 1000;
  /* Stays in place when scrolling */
}

/* Sticky - hybrid of relative and fixed */
.sticky-nav {
  position: sticky;
  top: 0;
  /* Acts relative until threshold, then fixed */
}

/* Parent must be positioned for absolute child */
.parent {
  position: relative;
}

.child {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
```

---

## 7. Flexbox

### Definition

- One-dimensional layout system (row or column)
- Container properties: display, flex-direction, justify-content, align-items
- Item properties: flex-grow, flex-shrink, flex-basis, align-self
- Perfect for responsive layouts and component alignment

**Example:**

```css
/* Flex Container */
.container {
  display: flex;
  flex-direction: row; /* row | column | row-reverse | column-reverse */
  justify-content: space-between; /* main axis alignment */
  align-items: center; /* cross axis alignment */
  flex-wrap: wrap; /* allow items to wrap */
  gap: 20px; /* spacing between items */
}

/* Flex Items */
.item {
  flex: 1; /* shorthand for flex-grow, flex-shrink, flex-basis */
  /* flex: 1 1 0 - grow, shrink, basis */
}

.item-1 {
  flex-grow: 2; /* take 2x more space */
}

.item-2 {
  flex-shrink: 0; /* don't shrink */
}

.item-3 {
  align-self: flex-end; /* override align-items */
}

/* Common Flexbox Patterns */

/* Center content */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Equal width columns */
.columns {
  display: flex;
}

.columns > div {
  flex: 1;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 8. CSS Grid

### Definition

- Two-dimensional layout system (rows and columns)
- Define grid with grid-template-columns/rows
- Place items with grid-column/row or grid-area
- Powerful for complex page layouts

**Example:**

```css
/* Grid Container */
.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr; /* 3 columns */
  grid-template-rows: 100px auto 50px; /* 3 rows */
  gap: 20px; /* row and column gap */

  /* Alternative: repeat function */
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* responsive */
}

/* Grid Items */
.item-1 {
  grid-column: 1 / 3; /* span from column 1 to 3 */
  grid-row: 1 / 2;
}

.item-2 {
  grid-column: span 2; /* span 2 columns */
}

/* Named Grid Areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px 1fr 60px;
  gap: 10px;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.content {
  grid-area: content;
}
.footer {
  grid-area: footer;
}

/* Responsive Grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
```

---

## 9. Responsive Design & Media Queries

### Definition

- Adapt layout to different screen sizes
- Media queries apply styles based on device characteristics
- Mobile-first approach: design for mobile, scale up
- Common breakpoints: 320px, 768px, 1024px, 1200px

**Example:**

```css
/* Mobile-first approach (default styles for mobile) */
.container {
  width: 100%;
  padding: 10px;
}

.grid {
  display: block;
}

/* Tablet and up (768px+) */
@media screen and (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media screen and (min-width: 1024px) {
  .container {
    width: 960px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large desktop (1200px+) */
@media screen and (min-width: 1200px) {
  .container {
    width: 1140px;
  }

  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none;
  }
}

/* Orientation */
@media (orientation: landscape) {
  /* Landscape specific styles */
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background: #222;
    color: #fff;
  }
}
```

---

## 10. Typography

### Definition

- Styling text for readability and aesthetics
- Properties: font-family, font-size, font-weight, line-height, letter-spacing
- Web fonts: Google Fonts, custom @font-face
- Relative units (em, rem) better for responsive design

**Example:**

```css
/* Font basics */
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px; /* base size */
  font-weight: 400; /* normal */
  line-height: 1.6; /* 1.5-1.6 ideal for readability */
  color: #333;
}

/* Headings */
h1 {
  font-size: 2.5rem; /* 40px if base is 16px */
  font-weight: 700; /* bold */
  line-height: 1.2;
  letter-spacing: -0.5px; /* tighter for large text */
  margin-bottom: 1rem;
}

/* Using rem for scalability */
h2 {
  font-size: 2rem;
} /* 32px */
h3 {
  font-size: 1.5rem;
} /* 24px */
p {
  font-size: 1rem;
} /* 16px */
small {
  font-size: 0.875rem;
} /* 14px */

/* Custom web fonts */
@font-face {
  font-family: "CustomFont";
  src:
    url("customfont.woff2") format("woff2"),
    url("customfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* prevent FOIT */
}

/* Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

/* Advanced typography */
.text {
  text-align: justify;
  text-transform: uppercase;
  text-decoration: underline;
  word-spacing: 2px;
  text-indent: 2em; /* first line indent */
  hyphens: auto; /* auto hyphenation */
}

/* Truncate text with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

/* Multi-line truncation */
.multiline-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 11. Colors & Backgrounds

### Definition

- Multiple ways to define colors: hex, rgb, rgba, hsl, hsla
- Background properties: color, image, size, position, repeat
- Gradients: linear and radial
- Modern: CSS variables for color management

**Example:**

```css
/* Color formats */
.colors {
  /* Hexadecimal */
  color: #ff5733;

  /* RGB */
  color: rgb(255, 87, 51);

  /* RGBA (with alpha/opacity) */
  color: rgba(255, 87, 51, 0.8);

  /* HSL (Hue, Saturation, Lightness) */
  color: hsl(9, 100%, 60%);

  /* HSLA */
  color: hsla(9, 100%, 60%, 0.8);

  /* Named colors */
  color: tomato;
}

/* Background properties */
.background {
  background-color: #f0f0f0;
  background-image: url("image.jpg");
  background-size: cover; /* cover | contain | 100% 100% */
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* parallax effect */

  /* Shorthand */
  background: #f0f0f0 url("image.jpg") center/cover no-repeat;
}

/* Gradients */
.gradient-linear {
  background: linear-gradient(to right, #ff6b6b, #4ecdc4);
  background: linear-gradient(45deg, red, blue, green);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}

.gradient-radial {
  background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}

/* CSS Variables for color management */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #333;
  --background: #fff;
}

.button {
  background-color: var(--primary-color);
  color: var(--background);
}

/* Dark mode with variables */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #fff;
    --background: #1a1a1a;
  }
}
```

---

## 12. Transitions & Animations

### Definition

- Transitions: smooth change between states (hover, focus)
- Animations: complex keyframe-based animations
- Properties: duration, timing-function, delay
- Hardware accelerated: transform and opacity

**Example:**

```css
/* Transitions */
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  transition: all 0.3s ease;
  /* transition: property duration timing-function delay */
}

.button:hover {
  background-color: darkblue;
  transform: scale(1.05);
}

/* Multiple transitions */
.box {
  transition:
    background-color 0.3s ease,
    transform 0.5s ease-in-out;
}

/* Timing functions */
.ease {
  transition-timing-function: ease;
}
.linear {
  transition-timing-function: linear;
}
.ease-in-out {
  transition-timing-function: ease-in-out;
}
.cubic {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Keyframe Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

/* Complex animation */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.bouncing {
  animation: bounce 2s infinite;
  /* animation: name duration timing-function delay iteration-count direction */
}

/* Loading spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Multiple animations */
.element {
  animation:
    fadeIn 1s ease-out,
    slideIn 0.5s ease-out 0.5s;
}
```

---

## 13. Transforms

### Definition

- Modify element's shape, size, position without affecting layout
- 2D: translate, rotate, scale, skew
- 3D: translateZ, rotateX/Y/Z, perspective
- Hardware accelerated (better performance)

**Example:**

```css
/* 2D Transforms */
.translate {
  transform: translate(50px, 100px); /* x, y */
  transform: translateX(50px);
  transform: translateY(100px);
}

.rotate {
  transform: rotate(45deg);
}

.scale {
  transform: scale(1.5); /* 150% size */
  transform: scale(2, 0.5); /* width, height */
}

.skew {
  transform: skew(10deg, 5deg);
}

/* Combining transforms */
.combined {
  transform: translate(50px, 50px) rotate(45deg) scale(1.2);
}

/* Transform origin */
.corner-rotate {
  transform: rotate(45deg);
  transform-origin: top left; /* default: center center */
}

/* 3D Transforms */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* 3D cube */
.cube {
  transform: rotateX(45deg) rotateY(45deg);
  transform-style: preserve-3d;
}

/* Performance tip: use transform instead of top/left */
/* Bad for performance */
.slide-bad {
  position: relative;
  left: 100px;
}

/* Good for performance */
.slide-good {
  transform: translateX(100px);
}
```

---

## 14. Pseudo-classes & Pseudo-elements

### Definition

- Pseudo-classes: select elements in specific state (:hover, :focus, :nth-child)
- Pseudo-elements: style specific parts of element (::before, ::after, ::first-line)
- Single colon for pseudo-classes, double for pseudo-elements
- Powerful for dynamic styling without JavaScript

**Example:**

```css
/* Pseudo-classes */
a:link {
  color: blue;
}
a:visited {
  color: purple;
}
a:hover {
  color: red;
}
a:active {
  color: orange;
}

input:focus {
  outline: 2px solid blue;
  border-color: blue;
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Structural pseudo-classes */
li:first-child {
  font-weight: bold;
}
li:last-child {
  border-bottom: none;
}
li:nth-child(odd) {
  background: #f0f0f0;
} /* zebra striping */
li:nth-child(even) {
  background: white;
}
li:nth-child(3n) {
  color: red;
} /* every 3rd item */

p:first-of-type {
  font-size: 1.2em;
}
p:last-of-type {
  margin-bottom: 0;
}

div:not(.excluded) {
  border: 1px solid black;
}

/* Pseudo-elements */
p::first-line {
  font-weight: bold;
  font-size: 1.2em;
}

p::first-letter {
  font-size: 2em;
  float: left;
  margin-right: 5px;
}

/* ::before and ::after for decorative content */
.icon::before {
  content: "→ ";
  color: blue;
}

.quote::before {
  content: open-quote;
}

.quote::after {
  content: close-quote;
}

/* Creative use cases */
.tooltip {
  position: relative;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.tooltip:hover::after {
  opacity: 1;
}

/* Clearfix using ::after */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Selection styling */
::selection {
  background-color: yellow;
  color: black;
}
```

---

## 15. CSS Variables (Custom Properties)

### Definition

- Store reusable values throughout stylesheet
- Defined with -- prefix, accessed with var()
- Can be scoped (global :root or local)
- Cascade and inherit like normal CSS properties

**Example:**

```css
/* Global variables */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #333;
  --spacing-unit: 8px;
  --border-radius: 4px;
  --font-main: "Arial", sans-serif;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Using variables */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  font-family: var(--font-main);
  box-shadow: var(--shadow);
}

/* Fallback values */
.element {
  color: var(--undefined-color, red); /* falls back to red */
}

/* Local scope variables */
.card {
  --card-padding: 20px;
  padding: var(--card-padding);
}

.card .content {
  padding: calc(var(--card-padding) / 2);
}

/* Dynamic theming */
.light-theme {
  --bg-color: white;
  --text-color: #333;
}

.dark-theme {
  --bg-color: #1a1a1a;
  --text-color: #fff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

/* Responsive variables */
:root {
  --container-width: 1200px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
  }
}

/* Calculations with variables */
.grid {
  --columns: 3;
  --gap: 20px;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}

/* JavaScript can modify CSS variables */
/* document.documentElement.style.setProperty('--primary-color', 'red'); */
```

---

## 16. Z-Index & Stacking Context

### Definition

- Controls vertical stacking order of overlapping elements
- Only works on positioned elements (relative, absolute, fixed, sticky)
- Higher z-index appears on top
- Stacking contexts created by certain properties (position + z-index, opacity, transform)

**Example:**

```css
/* Basic z-index */
.bottom {
  position: relative;
  z-index: 1;
}

.middle {
  position: relative;
  z-index: 5;
}

.top {
  position: relative;
  z-index: 10;
}

/* Modal overlay pattern */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 1001;
}

/* Stacking context example */
.parent {
  position: relative;
  z-index: 1;
}

.child {
  position: absolute;
  z-index: 999; /* Won't go above parent's stacking context */
}

/* Dropdown menu */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

/* Common z-index scale */
:root {
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

---

## 17. Overflow & Scrolling

### Definition

- Controls what happens when content exceeds element's box
- Values: visible (default), hidden, scroll, auto
- Can control horizontal and vertical separately
- Useful for creating scrollable containers

**Example:**

```css
/* Basic overflow */
.hidden {
  overflow: hidden; /* clip overflow */
}

.scroll {
  overflow: scroll; /* always show scrollbars */
}

.auto {
  overflow: auto; /* scrollbars only when needed */
}

/* Separate x and y */
.horizontal-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.vertical-scroll {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
}

/* Scrollable container */
.chat-messages {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}

/* Hide scrollbar but keep functionality */
.no-scrollbar {
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Custom scrollbar styling (Webkit) */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Text overflow ellipsis */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Sticky scroll */
.sticky-scroll {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.sticky-scroll section {
  scroll-snap-align: start;
  height: 100vh;
}
```

---

## 18. Centering Techniques

### Definition

- Multiple methods to center elements horizontally and vertically
- Different techniques for different scenarios
- Modern: Flexbox and Grid are easiest
- Legacy: margin auto, absolute positioning

**Example:**

```css
/* Horizontal centering - block element */
.center-block {
  width: 50%;
  margin: 0 auto;
}

/* Horizontal centering - text/inline */
.center-text {
  text-align: center;
}

/* Flexbox - horizontal and vertical center */
.flex-center {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center; /* vertical */
  height: 100vh;
}

/* Grid - center */
.grid-center {
  display: grid;
  place-items: center; /* shorthand for align-items + justify-items */
  height: 100vh;
}

/* Absolute positioning - classic method */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Absolute with margins (requires known dimensions) */
.absolute-margin {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 200px;
  height: 100px;
}

/* Vertical center - line-height (single line text) */
.line-height-center {
  height: 100px;
  line-height: 100px;
}

/* Table display method (legacy) */
.table-center {
  display: table;
  width: 100%;
  height: 100vh;
}

.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

/* Modern: place-items for grid items */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  display: grid;
  place-items: center;
}
```

---

## 19. Units & Measurements

### Definition

- Absolute units: px (pixels), pt (points), cm, mm
- Relative units: %, em, rem, vh, vw, vmin, vmax
- em: relative to parent font-size, rem: relative to root
- Viewport units: vh (viewport height), vw (viewport width)

**Example:**

```css
/* Pixels - absolute */
.pixel {
  width: 300px;
  font-size: 16px;
}

/* Percentage - relative to parent */
.percent {
  width: 50%; /* 50% of parent width */
  padding: 10%; /* 10% of parent width (not height!) */
}

/* em - relative to parent font-size */
.parent {
  font-size: 16px;
}

.child-em {
  font-size: 1.5em; /* 24px (16 * 1.5) */
  padding: 1em; /* 24px (relative to own font-size) */
  margin: 2em; /* 48px */
}

/* rem - relative to root font-size (html) */
html {
  font-size: 16px; /* base size */
}

.rem-example {
  font-size: 1.5rem; /* 24px (16 * 1.5) */
  padding: 1rem; /* 16px */
  margin: 2rem; /* 32px */
}
/* rem is more predictable than em */

/* Viewport units */
.hero {
  height: 100vh; /* 100% of viewport height */
  width: 100vw; /* 100% of viewport width */
}

.sidebar {
  width: 20vw; /* 20% of viewport width */
}

/* vmin/vmax */
.responsive-square {
  width: 50vmin; /* 50% of smaller viewport dimension */
  height: 50vmin;
}

/* ch - width of "0" character */
.optimal-reading {
  max-width: 60ch; /* ~60 characters wide */
}

/* Calc function */
.calculated {
  width: calc(100% - 200px);
  padding: calc(1rem + 10px);
  font-size: calc(1rem + 0.5vw); /* responsive typography */
}

/* Modern: clamp for responsive sizing */
.responsive-heading {
  font-size: clamp(1.5rem, 2vw + 1rem, 3rem);
  /* min: 1.5rem, preferred: 2vw + 1rem, max: 3rem */
}

/* Best practice for responsive font-size */
html {
  font-size: 16px;
}

@media (max-width: 768px) {
  html {
    font-size: 14px; /* all rem values scale proportionally */
  }
}
```

---

## 20. Float & Clear

### Definition

- Float removes element from normal flow, wraps text around it
- Values: left, right, none
- Clear prevents elements from wrapping around floated elements
- Legacy layout method (Flexbox/Grid preferred now)

**Example:**

```css
/* Basic float */
.image-left {
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
  width: 200px;
}

.image-right {
  float: right;
  margin-left: 20px;
  margin-bottom: 10px;
  width: 200px;
}

/* Text wraps around floated elements */

/* Clear float */
.clear-left {
  clear: left; /* no floating elements on left */
}

.clear-right {
  clear: right;
}

.clear-both {
  clear: both; /* no floating elements on either side */
}

/* Clearfix - contain floats within parent */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Modern clearfix */
.container {
  overflow: auto; /* simple clearfix alternative */
}

/* Float layout example (legacy) */
.column {
  float: left;
  width: 33.33%;
  padding: 15px;
}

.row::after {
  content: "";
  display: table;
  clear: both;
}

/* Problem: parent collapses without clearfix */
.parent {
  /* Without clearfix, height would be 0 */
}

.parent .floated {
  float: left;
}

/* Modern alternative: use Flexbox instead */
.modern-columns {
  display: flex;
  gap: 15px;
}

.modern-columns .column {
  flex: 1; /* much cleaner than float */
}
```

---

## 21. Opacity & Visibility

### Definition

- Opacity: transparency level (0 = invisible, 1 = opaque)
- Visibility: hidden hides element but reserves space
- Display none removes element completely
- Opacity affects entire element including children

**Example:**

```css
/* Opacity */
.transparent {
  opacity: 0.5; /* 50% transparent */
}

.invisible {
  opacity: 0; /* invisible but still takes space, clickable */
}

.opaque {
  opacity: 1; /* fully visible (default) */
}

/* Visibility */
.hidden {
  visibility: hidden; /* invisible, takes space, not clickable */
}

.visible {
  visibility: visible;
}

/* Display none */
.removed {
  display: none; /* removed from layout completely */
}

/* Comparison */
.opacity-test {
  opacity: 0;
  /* Takes space, not visible, still receives events */
}

.visibility-test {
  visibility: hidden;
  /* Takes space, not visible, doesn't receive events */
}

.display-test {
  display: none;
  /* No space, not visible, doesn't receive events */
}

/* Fade effect with transition */
.fade {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fade.show {
  opacity: 1;
}

/* Semi-transparent overlay */
.overlay {
  background-color: rgba(0, 0, 0, 0.7); /* better than black with opacity */
}

/* Children inherit opacity */
.parent {
  opacity: 0.5;
}

.child {
  /* Will also be 0.5 opaque, can't override */
}

/* Solution: use rgba instead */
.parent-fixed {
  background-color: rgba(255, 255, 255, 0.5);
  /* Children not affected */
}

/* Pointer events */
.non-clickable {
  opacity: 0.3;
  pointer-events: none; /* disable all mouse events */
}
```

---

## 22. Shadows & Effects

### Definition

- box-shadow: shadow around element's box
- text-shadow: shadow on text
- Multiple shadows possible (comma-separated)
- Values: x-offset, y-offset, blur, spread, color

**Example:**

```css
/* Box shadow */
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* x-offset y-offset blur spread color */
}

/* Multiple shadows */
.multi-shadow {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
}

/* Inset shadow (inner shadow) */
.inset {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Elevation levels (Material Design) */
.elevation-1 {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
}

.elevation-2 {
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
}

.elevation-3 {
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

/* Hover effect */
.card-hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card-hover:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Text shadow */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 3D text effect */
.text-3d {
  text-shadow:
    1px 1px 0 #ccc,
    2px 2px 0 #c9c9c9,
    3px 3px 0 #bbb,
    4px 4px 0 #b9b9b9,
    5px 5px 0 #aaa,
    6px 6px 5px rgba(0, 0, 0, 0.5);
}

/* Glow effect */
.glow {
  box-shadow:
    0 0 10px #00f,
    0 0 20px #00f,
    0 0 30px #00f;
}

/* Neumorphism style */
.neumorphism {
  background: #e0e5ec;
  box-shadow:
    9px 9px 16px rgba(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
}

/* Drop shadow on images/SVG */
.image-shadow {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}
```

---

## 23. Borders & Outlines

### Definition

- Border: part of box model, affects element size
- Outline: drawn outside border, doesn't affect layout
- Border-radius for rounded corners
- Can style individual sides differently

**Example:**

```css
/* Basic border */
.border {
  border: 2px solid black;
  /* width style color */
}

/* Individual sides */
.custom-border {
  border-top: 1px solid red;
  border-right: 2px dashed blue;
  border-bottom: 3px dotted green;
  border-left: 4px double orange;
}

/* Shorthand properties */
.border-shorthand {
  border-width: 1px 2px 3px 4px; /* top right bottom left */
  border-style: solid;
  border-color: red blue green orange;
}

/* Border radius */
.rounded {
  border-radius: 8px;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* creates circle */
}

.pill {
  border-radius: 25px;
}

/* Individual corners */
.custom-radius {
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;
}

/* Elliptical corners */
.elliptical {
  border-radius: 50px / 25px; /* horizontal / vertical */
}

/* Outline */
.outline {
  outline: 2px solid blue;
  outline-offset: 2px; /* space between element and outline */
}

/* Focus outline (accessibility important!) */
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Remove default outline (provide alternative!) */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}

/* Border styles */
.border-styles {
  border-style: solid; /* ──── */
  border-style: dashed; /* ╌╌╌╌ */
  border-style: dotted; /* ···· */
  border-style: double; /* ════ */
  border-style: groove; /* 3D grooved */
  border-style: ridge; /* 3D ridged */
  border-style: inset; /* 3D inset */
  border-style: outset; /* 3D outset */
}

/* Border image */
.border-image {
  border: 10px solid transparent;
  border-image: url("border.png") 30 round;
}

/* Creative borders */
.gradient-border {
  border: 3px solid;
  border-image: linear-gradient(45deg, red, blue) 1;
}
```

---

## 24. CSS Filters

### Definition

- Apply visual effects to elements
- Common filters: blur, brightness, contrast, grayscale, hue-rotate
- Can combine multiple filters
- Works on images, backgrounds, and any element

**Example:**

```css
/* Blur */
.blur {
  filter: blur(5px);
}

/* Brightness */
.bright {
  filter: brightness(1.5); /* 150% brightness */
}

.dark {
  filter: brightness(0.5); /* 50% brightness */
}

/* Contrast */
.high-contrast {
  filter: contrast(2);
}

/* Grayscale */
.grayscale {
  filter: grayscale(100%);
}

.partial-grayscale {
  filter: grayscale(50%);
}

/* Sepia tone */
.sepia {
  filter: sepia(100%);
}

/* Hue rotation */
.hue-shift {
  filter: hue-rotate(90deg);
}

/* Invert colors */
.invert {
  filter: invert(100%);
}

/* Saturate */
.saturated {
  filter: saturate(200%);
}

.desaturated {
  filter: saturate(0%);
}

/* Multiple filters */
.combined {
  filter: blur(2px) brightness(1.2) contrast(1.5);
}

/* Hover effects */
img {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

img:hover {
  filter: grayscale(0%);
}

/* Drop shadow (alternative to box-shadow) */
.drop-shadow {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  /* Works better with transparent PNGs */
}

/* Backdrop filter (blur background) */
.frosted-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* Disabled/loading state */
.disabled {
  filter: grayscale(100%) opacity(0.5);
  pointer-events: none;
}
```

---

## 25. Object-fit & Object-position

### Definition

- object-fit: controls how replaced element (img, video) fits in container
- Values: fill, contain, cover, none, scale-down
- object-position: positions content within element
- Prevents image distortion in responsive layouts

**Example:**

```css
/* Image container */
.image-container {
  width: 300px;
  height: 200px;
  border: 2px solid black;
}

/* Fill - default, stretches to fill (may distort) */
.fill {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

/* Contain - entire image visible, may have empty space */
.contain {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Cover - fills container, may crop image */
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* None - original size, may overflow or have empty space */
.none {
  width: 100%;
  height: 100%;
  object-fit: none;
}

/* Scale-down - smaller of none or contain */
.scale-down {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}

/* Object position */
.positioned {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* default */
}

.top-positioned {
  object-fit: cover;
  object-position: top; /* focus on top of image */
}

.bottom-right {
  object-fit: cover;
  object-position: bottom right;
}

.custom-position {
  object-fit: cover;
  object-position: 25% 75%; /* x% y% */
}

/* Common use case: responsive images */
.responsive-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

/* Avatar/profile picture */
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

/* Video thumbnail */
.video-thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
```

---

## Quick Reference: Common Interview Questions

### 1. What is the difference between class and ID selectors?

Class (.class): reusable, can be applied to multiple elements, specificity 0,0,1,0
ID (#id): unique per page, higher specificity 0,1,0,0

### 2. Explain the box model

Content → Padding → Border → Margin (from inside out)
Total width = content + padding + border (+ margin for spacing)
box-sizing: border-box includes padding and border in width

### 3. What is specificity?

Weight given to CSS selectors to determine which rule applies
Inline (1000) > ID (100) > Class/Attribute/Pseudo-class (10) > Element (1)

### 4. Difference between display: none and visibility: hidden?

display: none - removes from layout, no space taken
visibility: hidden - invisible but space reserved

### 5. What is Flexbox?

One-dimensional layout system (row or column)
Controls alignment, distribution, and order of items

### 6. What is CSS Grid?

Two-dimensional layout system (rows and columns)
Better for complex page layouts

### 7. What are pseudo-classes?

Select elements based on state: :hover, :focus, :nth-child
Single colon syntax

### 8. What are pseudo-elements?

Style specific parts of elements: ::before, ::after, ::first-line
Double colon syntax (:: vs :)

### 9. Difference between absolute and relative positioning?

Relative: offset from normal position, space reserved
Absolute: positioned relative to nearest positioned ancestor, removed from flow

### 10. What is z-index?

Controls stacking order of positioned elements
Higher values appear on top

### 11. What are CSS variables?

Custom properties defined with -- and accessed with var()
Reusable values throughout stylesheet

### 12. Explain em vs rem

em: relative to parent font-size
rem: relative to root (html) font-size - more predictable

### 13. What is mobile-first design?

Design for mobile first, then scale up with media queries
Uses min-width media queries

### 14. How to vertically center an element?

Flexbox: align-items: center
Grid: place-items: center
Absolute: top: 50%, transform: translateY(-50%)

### 15. What is the cascade in CSS?

Order matters: later rules override earlier ones (same specificity)
Specificity > Order > Inheritance

---

## CSS Best Practices

1. **Use meaningful class names** (BEM methodology)
2. **Mobile-first approach** with min-width media queries
3. **Use Flexbox and Grid** over floats
4. **Avoid !important** - indicates specificity problems
5. **Use rem for font-sizes** - better scalability
6. **DRY principle** - use CSS variables for repeated values
7. **Organize CSS** - logical sections, consistent formatting
8. **Use shorthand properties** when appropriate
9. **Optimize selectors** - avoid deep nesting
10. **Add vendor prefixes** for browser compatibility
11. **Validate CSS** - catch errors early
12. **Comment your code** - explain complex solutions
13. **Use CSS reset/normalize** for consistency
14. **Minimize use of IDs** - prefer classes for styling
15. **Test across browsers** - ensure compatibility

---

## Common CSS Methodologies

### BEM (Block Element Modifier)

```css
/* Block */
.card {
}

/* Element */
.card__title {
}
.card__image {
}

/* Modifier */
.card--featured {
}
.card__title--large {
}
```

### OOCSS (Object-Oriented CSS)

Separate structure from skin, separate container from content

### SMACSS

Base, Layout, Module, State, Theme organization

---

## Useful CSS Properties Cheatsheet

| Property        | Purpose                                                      |
| --------------- | ------------------------------------------------------------ |
| display         | How element is displayed (block, flex, grid)                 |
| position        | Positioning type (static, relative, absolute, fixed, sticky) |
| flex            | Flexbox shorthand                                            |
| grid-template   | Define grid structure                                        |
| margin, padding | Spacing outside/inside element                               |
| width, height   | Element dimensions                                           |
| background      | Background styles                                            |
| color           | Text color                                                   |
| font            | Typography properties                                        |
| border          | Border styles                                                |
| border-radius   | Rounded corners                                              |
| box-shadow      | Element shadow                                               |
| transform       | 2D/3D transformations                                        |
| transition      | Smooth property changes                                      |
| animation       | Keyframe animations                                          |
| opacity         | Transparency                                                 |
| overflow        | Handle overflow content                                      |
| z-index         | Stacking order                                               |

---

**Good luck with your CSS interview! 🎨**
