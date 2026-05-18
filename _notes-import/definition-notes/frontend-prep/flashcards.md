Quick reference cards for last-minute review. Read the question, try to answer, then check the answer.

---

## HTML5 Flashcards

**Q: What's the difference between `<section>` and `<article>`?**
A: `<section>` groups related content thematically. `<article>` represents independent, self-contained content that could be distributed separately.

**Q: Name 5 semantic HTML5 elements**
A: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`

**Q: How do you make an image accessible?**
A: Use descriptive `alt` text, proper `width` and `height` attributes, and consider using `<figure>` with `<figcaption>` for complex images.

**Q: What are data attributes used for?**
A: Store custom data on HTML elements. Format: `data-*`. Access via JS: `element.dataset.customName`

**Q: List 3 new HTML5 form input types**
A: `email`, `tel`, `url`, `number`, `date`, `color`, `range`, `search`, `time`, `datetime-local`

---

## CSS Flashcards

**Q: Explain the CSS box model (from inside out)**
A: Content → Padding → Border → Margin

**Q: What does `box-sizing: border-box` do?**
A: Includes padding and border in the element's width/height calculations.

**Q: 3 ways to center a div**
A:

1. Flexbox: `display: flex; justify-content: center; align-items: center;`
2. Grid: `display: grid; place-items: center;`
3. Absolute: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`

**Q: CSS Specificity order (highest to lowest)**
A: !important > Inline styles (1000) > IDs (100) > Classes/attributes/pseudo-classes (10) > Elements (1)

**Q: What's the difference between `display: none` and `visibility: hidden`?**
A: `display: none` removes element from layout flow. `visibility: hidden` hides element but keeps its space.

**Q: Flexbox: justify-content vs align-items**
A: `justify-content` - main axis alignment. `align-items` - cross axis alignment.

**Q: What's CSS Grid's `fr` unit?**
A: Fractional unit - represents a fraction of available space. `1fr 2fr` = 1/3 and 2/3 width.

**Q: Mobile-first vs Desktop-first approach**
A: Mobile-first uses `min-width` media queries (scale up). Desktop-first uses `max-width` (scale down).

**Q: Purpose of CSS variables/custom properties?**
A: Reusable values, dynamic theming, easier maintenance. Define with `--name: value`, use with `var(--name)`.

**Q: What's the cascade in CSS?**
A: Order of precedence: User agent → User styles → Author styles → !important

**Q: position: relative vs absolute vs fixed vs sticky**
A:

- `relative`: offset from normal position, keeps space
- `absolute`: offset from nearest positioned ancestor, removes from flow
- `fixed`: offset from viewport, stays on scroll
- `sticky`: toggles between relative and fixed based on scroll position

**Q: What's z-index and when does it work?**
A: Controls stacking order. Only works on positioned elements (not static).

---

## JavaScript Flashcards

**Q: var vs let vs const**
A:

- `var`: function-scoped, hoisted, can redeclare
- `let`: block-scoped, hoisted but not initialized, no redeclaration
- `const`: block-scoped, must initialize, cannot reassign

**Q: == vs ===**
A: `==` performs type coercion. `===` strict equality (no coercion). Always prefer `===`.

**Q: What's hoisting?**
A: Variable and function declarations are moved to top of scope during compilation. `var` initialized as undefined, `let/const` in temporal dead zone.

**Q: What's a closure?**
A: Function that has access to outer function's variables even after outer function returns.

**Q: Explain `this` keyword**
A: Refers to execution context. In methods: the object. In functions: global/undefined. Arrow functions: lexical `this`.

**Q: What's event delegation?**
A: Attaching single listener to parent instead of multiple to children. Uses event bubbling.

**Q: What's the difference between `null` and `undefined`?**
A: `undefined` - declared but not assigned. `null` - intentionally empty value.

**Q: Explain Promise states**
A: Pending (initial) → Fulfilled (success) → Rejected (error). Once settled, cannot change.

**Q: What's the event loop?**
A: Mechanism that handles async operations. Call stack → Microtask queue → Callback queue.

**Q: array.map() vs array.forEach()**
A: `map()` returns new array. `forEach()` returns undefined (side effects only).

**Q: What's the spread operator used for?**
A: Copy/merge arrays and objects, function arguments. `...arr`, `...obj`

**Q: Difference between Promise.all() and Promise.race()?**
A: `Promise.all()` waits for all, fails if any fails. `Promise.race()` returns first settled.

**Q: What's destructuring?**
A: Extract values from arrays/objects into variables. `const {name, age} = person`

**Q: Explain arrow functions**
A: Shorter syntax, lexical `this`, no `arguments` object, can't be constructors.

**Q: What's optional chaining?**
A: Safe property access. `user?.address?.city` returns undefined if any property is null/undefined.

**Q: What's nullish coalescing (??)?**
A: Returns right side if left is `null` or `undefined`. Different from `||` which checks falsy.

---

## React Flashcards

**Q: What's the Virtual DOM?**
A: Lightweight copy of real DOM. React compares (diff), then updates only changed parts (reconciliation).

**Q: Props vs State**
A: Props: passed from parent, immutable in child. State: internal to component, mutable.

**Q: Controlled vs Uncontrolled components**
A: Controlled: form data handled by React state. Uncontrolled: form data handled by DOM (refs).

**Q: When do components re-render?**
A: When state changes, props change, parent re-renders, or context changes.

**Q: What's the purpose of keys in lists?**
A: Help React identify which items changed/added/removed. Must be stable and unique.

**Q: useEffect cleanup function - when and why?**
A: Runs before next effect and on unmount. Clean up subscriptions, timers, listeners to prevent memory leaks.

**Q: useEffect dependency array rules**
A: Empty `[]` - run once. No array - run every render. `[dep]` - run when dep changes.

**Q: useCallback vs useMemo**
A: `useCallback` memoizes functions. `useMemo` memoizes values. Both prevent unnecessary re-renders.

**Q: When to use useCallback?**
A: Passing callbacks to optimized child components, dependency in other hooks, expensive function creation.

**Q: What's React.memo()?**
A: HOC that prevents re-renders if props haven't changed (shallow comparison).

**Q: Lifting state up - what and why?**
A: Move state to common ancestor when siblings need to share data.

**Q: What's prop drilling and how to avoid it?**
A: Passing props through many levels. Avoid with Context API, composition, or state management.

**Q: Purpose of useRef?**
A: Access DOM elements, store mutable values that don't trigger re-renders, persist values across renders.

**Q: Class components vs Functional components**
A: Functional: simpler, use hooks, easier to test. Class: more verbose, use lifecycle methods.

**Q: React lifecycle methods (Class components)**
A: Mount: constructor → getDerivedStateFromProps → render → componentDidMount
Update: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
Unmount: componentWillUnmount

**Q: useEffect equivalent to componentDidMount?**
A: `useEffect(() => { /* code */ }, [])`

**Q: useEffect equivalent to componentDidUpdate?**
A: `useEffect(() => { /* code */ })` (no dependency array) or `useEffect(() => { /* code */ }, [dep])`

**Q: useEffect equivalent to componentWillUnmount?**
A: `useEffect(() => { return () => { /* cleanup */ } }, [])`

**Q: What's React Context?**
A: Way to pass data through component tree without prop drilling. For global state.

**Q: When NOT to use Context?**
A: When prop drilling is only 2-3 levels, when you need optimized re-renders, for frequently changing data.

**Q: What's React.Fragment?**
A: Wrapper that doesn't add extra DOM nodes. `<></>` or `<React.Fragment>`

**Q: What are portals?**
A: Render children outside parent DOM hierarchy. `ReactDOM.createPortal(child, container)`

**Q: Synthetic events in React?**
A: Cross-browser wrapper around native events. Normalized interface.

---

## React Hooks Flashcards

**Q: Rules of Hooks**
A:

1. Only call at top level (not in loops/conditions/nested functions)
2. Only call from React functions (components/custom hooks)

**Q: What's useState initial value function?**
A: Lazy initialization. `useState(() => expensiveComputation())` runs only once.

**Q: useState updater function vs direct value?**
A: Use function `setState(prev => prev + 1)` when new state depends on previous state.

**Q: useReducer vs useState?**
A: useReducer: complex state logic, multiple sub-values, next state depends on previous.

**Q: useContext pattern**
A: `const value = useContext(MyContext)` - access context without Consumer component.

**Q: Custom hook naming convention?**
A: Must start with "use" (e.g., `useForm`, `useFetch`). Allows React to enforce hook rules.

**Q: Why create custom hooks?**
A: Reuse stateful logic, extract complex logic, share between components.

**Q: useLayoutEffect vs useEffect?**
A: useLayoutEffect fires synchronously after DOM mutations, before paint. Use for DOM measurements.

**Q: useImperativeHandle use case?**
A: Customize ref instance value exposed to parent. Used with forwardRef.

---

## TailwindCSS Flashcards

**Q: Utility-first CSS approach?**
A: Style directly in HTML with small, single-purpose classes instead of writing custom CSS.

**Q: Tailwind responsive prefix order**
A: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)

**Q: Tailwind spacing scale**
A: Based on 0.25rem (4px). `p-4` = 1rem = 16px, `m-8` = 2rem = 32px

**Q: How to use custom colors in Tailwind?**
A: Extend theme in `tailwind.config.js` or use arbitrary values: `bg-[#1da1f2]`

**Q: Tailwind dark mode setup?**
A: Add `dark:` prefix: `bg-white dark:bg-gray-800`. Configure in config: `darkMode: 'class'`

**Q: What's @apply directive?**
A: Extract repeated utilities into custom CSS classes. `@apply bg-blue-500 text-white;`

**Q: Tailwind group modifier?**
A: Apply styles to child based on parent state: `group group-hover:text-blue-500`

**Q: How does Tailwind reduce bundle size?**
A: PurgeCSS removes unused classes in production build.

**Q: Tailwind arbitrary values syntax?**
A: Square brackets: `w-[347px]`, `top-[117px]`, `text-[#1da1f2]`

**Q: Common Tailwind layout utilities?**
A: `flex`, `grid`, `container`, `mx-auto`, `gap-4`, `space-y-2`

---

## Performance Flashcards

**Q: Ways to optimize React performance**
A: React.memo, useCallback, useMemo, lazy loading, code splitting, virtualization, debouncing.

**Q: What's code splitting?**
A: Breaking bundle into smaller chunks, loaded on demand. `React.lazy()` and dynamic `import()`.

**Q: What's lazy loading?**
A: Loading components/resources only when needed. `const Component = lazy(() => import('./Component'))`

**Q: What's tree shaking?**
A: Removing unused code from final bundle. Works with ES6 modules.

**Q: Debouncing vs Throttling?**
A: Debounce: delay execution until after quiet period. Throttle: execute at most once per time period.

**Q: When to use debouncing?**
A: Search input, resize/scroll handlers, auto-save forms.

**Q: When to use throttling?**
A: Scroll events, mouse movement, window resize.

**Q: What causes memory leaks in React?**
A: Not cleaning up timers, subscriptions, event listeners in useEffect. Not canceling async operations.

**Q: How to prevent unnecessary re-renders?**
A: React.memo, useCallback, useMemo, proper state structure, avoid inline objects/functions in JSX.

---

## Browser & Web Flashcards

**Q: LocalStorage vs SessionStorage?**
A: localStorage persists until cleared. sessionStorage cleared when tab closes. Both ~5-10MB limit.

**Q: What's CORS?**
A: Cross-Origin Resource Sharing. Security feature preventing requests to different origin without permission.

**Q: What's HTTP vs HTTPS?**
A: HTTPS is encrypted version of HTTP using SSL/TLS. Secure data transmission.

**Q: REST API HTTP methods?**
A: GET (read), POST (create), PUT (update/replace), PATCH (partial update), DELETE (remove)

**Q: What's a SPA?**
A: Single Page Application. Loads single HTML page, dynamically updates content via JavaScript.

**Q: What's CSR vs SSR?**
A: CSR (Client-Side Rendering): JS renders in browser. SSR (Server-Side Rendering): HTML generated on server.

**Q: What's a JWT?**
A: JSON Web Token. Secure way to transmit information. Format: header.payload.signature

**Q: What's XSS attack?**
A: Cross-Site Scripting. Injecting malicious scripts. Prevent: sanitize input, use textContent, CSP headers.

**Q: What's CSRF attack?**
A: Cross-Site Request Forgery. Unauthorized commands from trusted user. Prevent: CSRF tokens, SameSite cookies.

---

## Git Flashcards

**Q: git merge vs git rebase?**
A: merge: creates merge commit, preserves history. rebase: rewrites history, linear history.

**Q: Common git workflow?**
A: `git pull` → make changes → `git add .` → `git commit -m "message"` → `git push`

**Q: What's a git branch?**
A: Pointer to specific commit. Allows parallel development.

**Q: How to undo last commit (keep changes)?**
A: `git reset --soft HEAD~1`

**Q: How to undo last commit (discard changes)?**
A: `git reset --hard HEAD~1`

---

## Testing Flashcards

**Q: Unit test vs Integration test vs E2E test?**
A: Unit: single component/function. Integration: multiple components working together. E2E: entire application flow.

**Q: Jest - common matchers?**
A: `expect(x).toBe(y)`, `.toEqual()`, `.toBeTruthy()`, `.toContain()`, `.toHaveBeenCalled()`

**Q: React Testing Library - query types?**
A: getBy (throws), queryBy (null), findBy (async). All, ByRole, ByText, ByLabelText, ByTestId

**Q: What to test in React components?**
A: User interactions, rendering output, edge cases, accessibility. Not implementation details.

---

## Quick Review Lists

### Must-Know Array Methods

- `map()` - transform
- `filter()` - select
- `reduce()` - accumulate
- `find()` - first match
- `some()` - at least one
- `every()` - all match
- `forEach()` - iterate
- `includes()` - contains
- `slice()` - copy portion
- `splice()` - modify array

### Must-Know String Methods

- `split()`, `join()`
- `substring()`, `slice()`
- `toLowerCase()`, `toUpperCase()`
- `trim()`, `trimStart()`, `trimEnd()`
- `replace()`, `replaceAll()`
- `includes()`, `startsWith()`, `endsWith()`
- `charAt()`, `charCodeAt()`
- `padStart()`, `padEnd()`

### Must-Know Object Methods

- `Object.keys()`, `Object.values()`, `Object.entries()`
- `Object.assign()`
- `Object.freeze()`, `Object.seal()`
- `hasOwnProperty()`

### Common Flexbox Properties

```css
/* Container */
display: flex;
flex-direction: row | column;
justify-content: flex-start | center | space-between | space-around;
align-items: flex-start | center | stretch;
flex-wrap: nowrap | wrap;
gap: 1rem;

/* Items */
flex: 1 1 auto; /* grow | shrink | basis */
align-self: auto | flex-start | center;
order: 0;
```

### Common Grid Properties

```css
/* Container */
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto;
gap: 1rem;
grid-auto-flow: row | column;

/* Items */
grid-column: 1 / 3;
grid-row: 1 / 2;
```

### Common Tailwind Classes

```
Layout: flex, grid, container, mx-auto
Spacing: p-4, m-2, px-6, py-3, space-y-4
Sizing: w-full, h-screen, max-w-md
Text: text-lg, font-bold, text-center
Colors: bg-blue-500, text-white
Borders: border, rounded-lg, shadow-md
States: hover:, focus:, active:, disabled:
Responsive: sm:, md:, lg:, xl:

```

---

## Interview Day Checklist

✅ Review useState, useEffect, useContext patterns
✅ Practice map, filter, reduce on paper
✅ Memorize Flexbox justify-content vs align-items
✅ Know difference between == and ===
✅ Understand closure with example
✅ Know when components re-render
✅ Understand Virtual DOM concept
✅ Review async/await syntax
✅ Know difference between null and undefined
✅ Understand event delegation

---

## Common "Gotchas" to Remember

🔴 **React State**

- Don't mutate state directly: `setState([...arr, item])` not `arr.push(item)`
- State updates may be async: use updater function for dependent updates

🔴 **useEffect**

- Always include cleanup for subscriptions/timers
- Dependencies must include all values used inside effect

🔴 **JavaScript**

- `this` in arrow functions is lexically bound
- `==` performs type coercion, always use `===`
- Array methods don't mutate: map, filter, reduce return new arrays

🔴 **CSS**

- `position: absolute` requires positioned ancestor
- Flexbox gap vs margin (gap is better for spacing)
- z-index only works on positioned elements

🔴 **Performance**

- Inline functions/objects in JSX cause re-renders
- useCallback dependencies matter for memoization
- Keys in lists should be stable (not array index)

---

Print these flashcards or keep them on your phone for quick review! 📱
