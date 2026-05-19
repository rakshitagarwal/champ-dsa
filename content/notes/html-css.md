# HTML & CSS Interview Notes

---

# HTML

---

## 1. What is HTML?

**HTML (HyperText Markup Language)** is the standard markup language for creating web pages. It describes the structure and content of a webpage using **elements** represented by **tags**.

- Current version: **HTML5**
- HTML is not a programming language — it's a markup language
- Parsed by the browser to construct the **DOM (Document Object Model)**

---

## 2. HTML Document Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- visible content -->
    <script src="app.js" defer></script>
  </body>
</html>
```

- `<!DOCTYPE html>` — tells the browser to use HTML5 standard mode (not quirks mode)
- `<html lang="en">` — root element; `lang` helps screen readers and SEO
- `<head>` — metadata, not visible on page (title, links, scripts, meta tags)
- `<body>` — all visible page content

---

## 3. Important Meta Tags

```html
<meta charset="UTF-8" />                          <!-- character encoding -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" /> <!-- responsive -->
<meta name="description" content="Page description" /> <!-- SEO -->
<meta name="robots" content="index, follow" />    <!-- SEO crawling -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta property="og:title" content="Title" />      <!-- Open Graph (social sharing) -->
```

The `viewport` meta tag is essential for responsive design — without it, mobile browsers render the page at desktop width and scale it down.

---

## 4. Semantic HTML Tags

**Semantic tags** clearly describe their meaning and content — both to the developer and the browser/search engine.

**Layout / Structural:**
| Tag | Purpose |
|---|---|
| `<header>` | Introductory content, nav links, logo |
| `<nav>` | Navigation links |
| `<main>` | Main content of the page (only one per page) |
| `<section>` | Thematic grouping of content with a heading |
| `<article>` | Self-contained content (blog post, news article) |
| `<aside>` | Sidebar, tangentially related content |
| `<footer>` | Footer of page or section |
| `<figure>` | Self-contained media (image, diagram, code) |
| `<figcaption>` | Caption for `<figure>` |
| `<details>` | Disclosure widget (collapsible content) |
| `<summary>` | Visible heading for `<details>` |
| `<mark>` | Highlighted/marked text |
| `<time>` | Machine-readable date/time |
| `<address>` | Contact info for nearest article or body |

**Why semantic HTML matters:**
- Better SEO (search engines understand content structure)
- Accessibility (screen readers navigate by landmarks)
- Readable, maintainable code

---

## 5. Commonly Used HTML Tags

**Text:**
```html
<h1> to <h6>   <!-- headings, h1 is most important, only one h1 per page -->
<p>            <!-- paragraph -->
<span>         <!-- inline container, no semantic meaning -->
<strong>       <!-- bold + semantic importance -->
<em>           <!-- italic + semantic emphasis -->
<b>            <!-- bold, no semantic meaning -->
<i>            <!-- italic, no semantic meaning -->
<br>           <!-- line break (self-closing) -->
<hr>           <!-- horizontal rule / thematic break -->
<blockquote>   <!-- quoted content from external source -->
<code>         <!-- inline code -->
<pre>          <!-- preformatted text (preserves whitespace) -->
<abbr title="HyperText Markup Language">HTML</abbr>
<sup> <sub>    <!-- superscript, subscript -->
```

**Links & Media:**
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
<img src="image.jpg" alt="description" width="300" height="200" loading="lazy" />
<video src="video.mp4" controls autoplay muted loop></video>
<audio src="audio.mp3" controls></audio>
<iframe src="https://example.com" title="Embed"></iframe>
```

- `target="_blank"` opens in new tab; always add `rel="noopener noreferrer"` for security
- `alt` on images: required for accessibility and SEO; empty `alt=""` for decorative images
- `loading="lazy"` defers loading of off-screen images

**Lists:**
```html
<ul>  <!-- unordered list -->
<ol>  <!-- ordered list -->
  <li>Item</li>
</ol>
<dl>  <!-- description list -->
  <dt>Term</dt>
  <dd>Description</dd>
</dl>
```

**Containers:**
```html
<div>   <!-- block-level container, no semantic meaning -->
<span>  <!-- inline container, no semantic meaning -->
```

---

## 6. Forms

```html
<form action="/submit" method="POST" enctype="multipart/form-data">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" placeholder="John" required />

  <input type="email" name="email" />
  <input type="password" name="password" minlength="8" />
  <input type="number" name="age" min="0" max="120" />
  <input type="checkbox" name="terms" value="yes" />
  <input type="radio" name="gender" value="male" />
  <input type="file" name="avatar" accept="image/*" />
  <input type="hidden" name="token" value="abc123" />
  <input type="date" name="dob" />
  <input type="range" name="volume" min="0" max="100" />

  <select name="country">
    <option value="">Select</option>
    <option value="in" selected>India</option>
  </select>

  <textarea name="message" rows="4" cols="50"></textarea>

  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
  <button type="button" onclick="handler()">Click</button>
</form>
```

**Form attributes:**
- `action` — URL where form data is sent
- `method` — `GET` (data in URL) or `POST` (data in body)
- `enctype="multipart/form-data"` — required for file uploads
- `novalidate` — disables browser validation

**Input validation attributes:** `required`, `minlength`, `maxlength`, `min`, `max`, `pattern`, `type`

---

## 7. Tables

```html
<table>
  <caption>Monthly Sales</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$1000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$12000</td>
    </tr>
  </tfoot>
</table>
```

- `colspan` / `rowspan` — merge cells across columns/rows
- `<th scope="col/row">` — helps screen readers associate headers with cells
- Use tables for **tabular data**, not for page layout

---

## 8. script Tag — Loading Strategies

```html
<!-- Normal: blocks HTML parsing, fetches and executes immediately -->
<script src="app.js"></script>

<!-- async: fetches in parallel, executes as soon as downloaded (blocks parsing during execution) -->
<script src="app.js" async></script>

<!-- defer: fetches in parallel, executes after HTML is fully parsed, in order -->
<script src="app.js" defer></script>
```

- **`defer`** is preferred for most scripts — doesn't block parsing, executes in order
- **`async`** for independent scripts (analytics) — order not guaranteed
- Place scripts at bottom of `<body>` or use `defer`

---

## 9. Accessibility (a11y)

- Use semantic HTML — screen readers navigate by landmarks (`<header>`, `<nav>`, `<main>`)
- Every `<img>` must have `alt` text; decorative images use `alt=""`
- Form inputs must have associated `<label>` (via `for`/`id` or wrapping)
- Use `aria-label`, `aria-labelledby`, `aria-describedby` when semantic HTML isn't enough
- `role` attribute overrides implicit ARIA role: `role="button"`, `role="dialog"`
- `tabindex="0"` makes element focusable; `tabindex="-1"` removes from tab order
- Maintain sufficient color contrast (WCAG: 4.5:1 for normal text)
- Use `<button>` for clickable actions, `<a>` for navigation

---

## 10. Block vs Inline Elements

**Block elements:** Take up full width, start on new line.
`<div>`, `<p>`, `<h1-h6>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>`, `<blockquote>`, `<hr>`

**Inline elements:** Take up only as much width as needed, don't start new line.
`<span>`, `<a>`, `<img>`, `<strong>`, `<em>`, `<input>`, `<label>`, `<button>`, `<code>`, `<br>`

**Inline-block:** Behaves like inline but respects width/height/margin/padding.

---

## 11. HTML5 APIs (Important)

- **Local Storage** — `localStorage.setItem(key, val)` / `getItem` / `removeItem` — persistent, ~5MB
- **Session Storage** — same API, clears when tab closes
- **Canvas** — `<canvas>` + JS API for 2D drawing
- **Geolocation** — `navigator.geolocation.getCurrentPosition(cb)`
- **Web Workers** — background threads in browser
- **Drag and Drop** — `draggable="true"`, `ondragstart`, `ondrop` events
- **History API** — `history.pushState()`, `history.replaceState()` — SPA routing
- **Custom Data Attributes** — `data-*`: `<div data-id="123">` → `el.dataset.id`

---

---

# CSS

---

## 12. What is CSS?

**CSS (Cascading Style Sheets)** is a stylesheet language used to describe the presentation of HTML documents — layout, colors, fonts, spacing, animations.

**Three ways to apply CSS:**
- **Inline:** `<div style="color: red">` — highest specificity, avoid for maintainability
- **Internal:** `<style>` block in `<head>` — scoped to one page
- **External:** `<link rel="stylesheet" href="style.css">` — preferred, reusable

---

## 13. Selectors

```css
*              { }   /* universal */
div            { }   /* element/type */
.class         { }   /* class */
#id            { }   /* id */
div, p         { }   /* grouping */
div p          { }   /* descendant (any level) */
div > p        { }   /* direct child */
div + p        { }   /* adjacent sibling (immediately after) */
div ~ p        { }   /* general sibling (all after) */
a[href]        { }   /* attribute exists */
a[href="url"]  { }   /* attribute equals */
a[href^="htt"] { }   /* attribute starts with */
a[href$=".pdf"]{ }   /* attribute ends with */
a[href*="ex"]  { }   /* attribute contains */
```

**Pseudo-classes:**
```css
:hover   :focus   :active   :visited
:first-child   :last-child   :nth-child(2)   :nth-child(odd/even)
:not(.disabled)   :checked   :disabled   :placeholder-shown
:root   /* <html> element, used for CSS variables */
```

**Pseudo-elements:**
```css
::before   ::after       /* inject content before/after element */
::first-line   ::first-letter
::placeholder   ::selection
```

---

## 14. Specificity

Determines which CSS rule wins when multiple rules target the same element.

**Specificity hierarchy (highest to lowest):**
1. `!important` — overrides everything (avoid overusing)
2. Inline styles — `style="..."` → specificity: 1,0,0,0
3. ID selectors — `#id` → 0,1,0,0
4. Class, pseudo-class, attribute selectors → 0,0,1,0
5. Element, pseudo-element selectors → 0,0,0,1
6. Universal selector `*`, combinators → 0,0,0,0

**Calculation:** Count each type, compare left to right.
- `#nav .item a` → 0,1,1,1 (1 ID + 1 class + 1 element)
- `div p.highlight` → 0,0,1,2 (1 class + 2 elements)

When specificity is equal, the **last rule in source order** wins (cascade).

---

## 15. The Cascade

CSS stands for **Cascading** Style Sheets. The cascade determines which styles apply when there are conflicts.

**Order of priority (highest to lowest):**
1. User agent `!important` (browser)
2. Author `!important` (your CSS)
3. Author normal styles
4. User normal styles
5. User agent defaults (browser defaults)

Within the same origin, specificity wins. Same specificity → source order (last wins).

---

## 16. Box Model

Every HTML element is a rectangular box. The **CSS Box Model** defines how the box is sized.

```
┌─────────────────────────────────┐
│             margin              │
│  ┌───────────────────────────┐  │
│  │          border           │  │
│  │  ┌─────────────────────┐  │  │
│  │  │       padding       │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │    content    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

- **content** — actual text/image area
- **padding** — space between content and border (inside the element)
- **border** — surrounds padding
- **margin** — space outside the border (between elements)

**`box-sizing`:**
- `content-box` (default) — `width`/`height` applies to content only. Padding and border add to total size.
- `border-box` — `width`/`height` includes padding + border. Easier to work with.

```css
*, *::before, *::after {
  box-sizing: border-box; /* recommended global reset */
}
```

**Margin collapse:** Vertical margins between adjacent block elements collapse to the larger of the two values (doesn't happen with flex/grid children or horizontal margins).

---

## 17. Display Property

```css
display: block;         /* full width, starts new line */
display: inline;        /* content width, no width/height */
display: inline-block;  /* inline flow, but respects width/height/margin/padding */
display: none;          /* removes from layout (not visible, not in flow) */
display: flex;          /* flex container */
display: inline-flex;
display: grid;          /* grid container */
display: inline-grid;
display: contents;      /* element itself doesn't generate a box; children do */
```

`display: none` vs `visibility: hidden`:
- `none` — element removed from flow, takes no space
- `hidden` — element invisible but still takes up space

---

## 18. Position Property

```css
position: static;    /* default, normal flow, top/left/etc. have no effect */
position: relative;  /* offset from its normal position; still in flow */
position: absolute;  /* removed from flow, positioned relative to nearest positioned ancestor */
position: fixed;     /* removed from flow, positioned relative to viewport, stays on scroll */
position: sticky;    /* relative until it hits a threshold, then fixed within scroll container */
```

- **Positioned element** = any element with `position` other than `static`
- `absolute` child looks up the DOM tree for the nearest `position: relative/absolute/fixed/sticky` ancestor
- `z-index` only works on positioned elements (and flex/grid items)
- `top`, `right`, `bottom`, `left` set offsets for non-static elements

---

## 19. Flexbox

A one-dimensional layout model (row OR column).

**Container properties:**
```css
.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch; /* multi-line */
  gap: 16px;      /* space between items */
  row-gap: 8px;
  column-gap: 16px;
}
```

**Item properties:**
```css
.item {
  flex-grow: 1;      /* how much item grows relative to others */
  flex-shrink: 1;    /* how much item shrinks */
  flex-basis: auto;  /* initial size before grow/shrink */
  flex: 1;           /* shorthand: grow=1, shrink=1, basis=0 */
  align-self: center; /* override align-items for this item */
  order: 2;          /* visual order (default 0) */
}
```

- `justify-content` → main axis
- `align-items` → cross axis
- `flex: 1` makes all items share space equally
- `margin: auto` on a flex item absorbs extra space (useful for pushing items)

---

## 20. CSS Grid

A two-dimensional layout model (rows AND columns).

**Container properties:**
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;         /* 3 equal columns */
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: 200px auto 1fr;
  grid-template-rows: 100px auto;
  gap: 16px;
  row-gap: 8px;
  column-gap: 16px;
  justify-items: start | end | center | stretch;   /* align items in column axis */
  align-items: start | end | center | stretch;     /* align items in row axis */
  justify-content: center;   /* align grid tracks inside container */
  align-content: center;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
```

**Item properties:**
```css
.item {
  grid-column: 1 / 3;           /* span from line 1 to line 3 */
  grid-column: span 2;          /* span 2 columns */
  grid-row: 1 / 2;
  grid-area: header;            /* assign to named area */
  justify-self: center;         /* override justify-items */
  align-self: center;           /* override align-items */
}
```

**`fr` unit** — fractional unit, represents a fraction of the available space.
**`minmax(min, max)`** — defines a size range for a grid track.
**`auto-fill` vs `auto-fit`:**
- `auto-fill` — fills row with as many columns as possible, leaving empty columns
- `auto-fit` — collapses empty columns and stretches filled ones

```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* responsive grid */
```

---

## 21. CSS Units

**Absolute:**
- `px` — pixels (most common for screens)
- `pt`, `cm`, `mm` — print units

**Relative:**
- `%` — relative to parent's dimension
- `em` — relative to current element's font-size (1em = current font-size)
- `rem` — relative to root (`<html>`) font-size (default 16px) — preferred for scalable design
- `vw` — 1% of viewport width
- `vh` — 1% of viewport height
- `vmin` — 1% of smaller viewport dimension
- `vmax` — 1% of larger viewport dimension
- `ch` — width of "0" character
- `fr` — fraction unit (Grid only)

**`em` vs `rem`:** `rem` is more predictable — always relative to root, not compounding like `em`.

---

## 22. CSS Variables (Custom Properties)

```css
:root {
  --primary-color: #3498db;
  --font-size-base: 16px;
  --spacing: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing) * 2);
  font-size: var(--font-size-base, 16px); /* fallback value */
}
```

- Defined with `--name`, accessed with `var(--name)`
- Scoped to the element and its descendants
- `:root` = global scope
- Can be changed with JavaScript: `el.style.setProperty("--color", "red")`
- Unlike Sass variables, CSS variables are live in the browser and can cascade

---

## 23. Responsive Design & Media Queries

```css
/* Mobile-first approach (recommended) */
.container { width: 100%; }

@media (min-width: 768px) {
  .container { width: 750px; }
}

@media (min-width: 1024px) {
  .container { width: 960px; }
}

/* Other media features */
@media (max-width: 600px) { }
@media (orientation: landscape) { }
@media (prefers-color-scheme: dark) { }
@media (prefers-reduced-motion: reduce) { }
@media print { }
```

**Mobile-first:** Start with styles for small screens, add complexity for larger screens using `min-width`. Better performance on mobile.

**Common breakpoints:** 480px (mobile), 768px (tablet), 1024px (desktop), 1280px (large desktop)

---

## 24. Typography

```css
font-family: "Roboto", Arial, sans-serif; /* font stack, fallbacks */
font-size: 1rem;
font-weight: 400 | 700 | bold | normal;
font-style: normal | italic;
line-height: 1.5;          /* unitless preferred — relative to font-size */
letter-spacing: 0.05em;
text-align: left | center | right | justify;
text-decoration: none | underline | line-through;
text-transform: none | uppercase | lowercase | capitalize;
white-space: normal | nowrap | pre | pre-wrap;
overflow: hidden;
text-overflow: ellipsis;   /* requires overflow:hidden and white-space:nowrap */
word-break: break-word;
```

**Web fonts with Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

---

## 25. Colors & Backgrounds

```css
color: red;
color: #3498db;
color: rgb(52, 152, 219);
color: rgba(52, 152, 219, 0.5);
color: hsl(204, 70%, 53%);
color: hsla(204, 70%, 53%, 0.5);

background-color: #fff;
background-image: url("bg.jpg");
background-size: cover | contain | auto | 100%;
background-position: center | top left | 50% 50%;
background-repeat: no-repeat | repeat | repeat-x | repeat-y;
background-attachment: scroll | fixed | local;

/* Shorthand */
background: #fff url("bg.jpg") no-repeat center/cover;

/* Gradient */
background: linear-gradient(to right, #3498db, #2ecc71);
background: radial-gradient(circle, #fff, #000);
```

---

## 26. Transitions & Animations

**Transitions:** Smooth change between two states.
```css
.button {
  background: blue;
  transition: background 0.3s ease, transform 0.2s ease-in-out;
}
.button:hover {
  background: darkblue;
  transform: scale(1.05);
}
```

`transition: property duration timing-function delay`

**Timing functions:** `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()`

**Animations:** Multi-step animations with `@keyframes`.
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.box {
  animation: fadeIn 0.5s ease forwards;
  /* animation: name duration timing fill-mode */
}

animation-iteration-count: infinite | 2;
animation-direction: normal | reverse | alternate;
animation-play-state: running | paused;
```

---

## 27. Transform

```css
transform: translateX(50px);
transform: translateY(-20px);
transform: translate(50px, -20px);
transform: scale(1.5);
transform: scaleX(2);
transform: rotate(45deg);
transform: skew(10deg, 5deg);

/* Multiple transforms */
transform: translate(-50%, -50%) rotate(45deg) scale(1.2);

transform-origin: center | top left | 50% 50%;
```

- Transforms don't affect document flow — element keeps its space
- GPU-accelerated: `translate`, `scale`, `rotate`, `opacity` — prefer these for animations
- Use `translate(-50%, -50%)` + `position: absolute; top: 50%; left: 50%` for perfect centering

---

## 28. Overflow

```css
overflow: visible; /* default, content spills out */
overflow: hidden;  /* clips content, no scrollbar */
overflow: scroll;  /* always shows scrollbar */
overflow: auto;    /* scrollbar only when needed (preferred) */

overflow-x: hidden;
overflow-y: auto;
```

`overflow: hidden` on a parent also:
- Clears floats (creates BFC)
- Clips `position: absolute` children (if parent is positioned)

---

## 29. Z-index & Stacking Context

`z-index` controls the stacking order of positioned elements (higher = on top).

```css
.modal    { position: fixed; z-index: 1000; }
.overlay  { position: fixed; z-index: 999; }
.dropdown { position: absolute; z-index: 100; }
```

**Stacking context** is created by:
- `position: relative/absolute/fixed/sticky` + `z-index` not `auto`
- `opacity` < 1
- `transform`, `filter`, `will-change`
- `isolation: isolate` (explicitly creates new context)

Within a stacking context, `z-index` only competes with siblings in the same context — not across contexts.

---

## 30. Centering Techniques

**Horizontal center (block):**
```css
margin: 0 auto; /* fixed width required */
```

**Flexbox centering:**
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Grid centering:**
```css
.parent {
  display: grid;
  place-items: center; /* shorthand for align-items + justify-items */
}
```

**Absolute centering:**
```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Inline/text centering:**
```css
text-align: center;
line-height: 100px; /* equal to height for single line */
```

---

## 31. Pseudo-elements: ::before & ::after

Inject content before or after an element's content — don't add to the DOM.

```css
.button::before {
  content: "→ "; /* required, even if empty string "" */
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

- Must have `content` property (can be empty string `""`)
- Used for: decorative icons, tooltips, clearfix, counters, overlays

---

## 32. CSS Reset vs Normalize

**Reset (e.g., Eric Meyer's Reset):** Removes all browser default styles — margins, paddings, headings sizes. You style everything from scratch.

**Normalize.css:** Preserves useful browser defaults while fixing inconsistencies across browsers. Less aggressive than a full reset.

**Modern minimal reset:**
```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
```

---

## 33. CSS Specificity Tricks & Common Patterns

**Override without `!important`:**
```css
/* Add more specific selector instead of !important */
body .card .title { color: red; } /* more specific than .card .title */
```

**CSS custom property theming:**
```css
:root { --bg: white; --text: black; }
[data-theme="dark"] { --bg: #111; --text: white; }
```

**Responsive image:**
```css
img { max-width: 100%; height: auto; }
```

**Visually hidden (accessible, not display:none):**
```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}
```

**Aspect ratio:**
```css
.video { aspect-ratio: 16 / 9; }
```

**Clamp (fluid typography):**
```css
font-size: clamp(1rem, 2.5vw, 2rem); /* min, preferred, max */
```

---

## 34. BFC — Block Formatting Context

A **BFC** is an isolated region of the page where block boxes are laid out. Elements inside don't affect elements outside.

**A BFC is created by:**
- `overflow` other than `visible`
- `display: flex`, `display: grid`
- `position: absolute` or `fixed`
- `float` elements
- `display: flow-root` (modern, explicit way)

**BFC use cases:**
- Contain floats (parent collapses without BFC)
- Prevent margin collapse between parent and child
- Prevent content wrapping around floats

---

## 35. Common Interview Patterns

**Flexbox vs Grid:**
- Flexbox → 1D layouts, component-level (navbar, card contents, buttons)
- Grid → 2D layouts, page-level structure (overall page layout, complex grids)

**`em` vs `rem`:** Use `rem` for font sizes (consistent, not compounding), `em` for component-specific spacing that should scale with its font.

**Why `border-box`:** Total element size = width value — no mental math adding padding and border.

**Performance tips:**
- Prefer `transform` and `opacity` for animations (GPU-accelerated, no reflow)
- Avoid animating `width`, `height`, `top`, `left` — cause layout reflow
- Use `will-change: transform` to hint browser to promote element to compositor layer (use sparingly)

**Reflow vs Repaint:**
- **Reflow (layout):** Recalculates positions and sizes. Triggered by: changing width, height, font-size, adding/removing elements.
- **Repaint:** Redraws pixels without changing layout. Triggered by: changing color, background, visibility.
- Reflow is more expensive than repaint.

---
