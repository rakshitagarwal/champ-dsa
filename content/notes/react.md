# React.js Interview Notes

---

## 1. What is React?

React is an open-source JavaScript **library** (not a framework) for building user interfaces, developed by Meta. It is based on the concept of **component-based architecture** and uses a **declarative** approach — you describe what the UI should look like for a given state, and React handles the DOM updates.

Key characteristics:
- **Component-based** — UI is split into reusable, independent pieces
- **Declarative** — describe UI, not steps to build it
- **Unidirectional data flow** — data flows from parent to child via props
- **Virtual DOM** — React maintains a virtual representation of the DOM for efficient updates

---

## 2. Virtual DOM

The **Virtual DOM (VDOM)** is a lightweight JavaScript object tree that mirrors the real DOM. React keeps a virtual copy of the UI in memory.

**How it works:**
1. When state/props change, React creates a new Virtual DOM tree
2. It **diffs** the new tree against the previous one (reconciliation)
3. Only the **changed parts** are updated in the real DOM (patching)

This makes DOM updates more efficient since direct DOM manipulation is expensive.

**React Fiber** is the reconciliation engine (introduced in React 16). It breaks rendering work into units and can pause, prioritize, and resume work — enabling features like Suspense and concurrent rendering.

---

## 3. JSX

**JSX (JavaScript XML)** is a syntax extension for JavaScript that looks like HTML and gets transpiled to `React.createElement()` calls by Babel.

```jsx
// JSX
const el = <h1 className="title">Hello</h1>;

// Transpiled to
const el = React.createElement("h1", { className: "title" }, "Hello");
```

- `class` → `className`, `for` → `htmlFor`
- Self-closing tags must be closed: `<img />`
- JavaScript expressions inside `{}`
- JSX must return a single root element (use `<>...</>` Fragment if needed)
- JSX is not HTML — it produces React elements (plain objects)

---

## 4. Components

A **component** is a reusable, independent piece of UI. It's a JavaScript function (or class) that optionally accepts **props** and returns React elements (JSX).

**Functional Component:**
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

**Class Component:**
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**Rules:**
- Component names must start with a capital letter
- Must return a single root element or null
- Should be pure with respect to props (don't modify props)

---

## 5. Props

**Props (properties)** are read-only inputs passed from a parent component to a child component. They make components reusable and configurable.

```jsx
<Button label="Submit" onClick={handleClick} disabled={false} />
```

- Props are **immutable** inside the component — a component must never modify its own props
- Can pass any JS value: strings, numbers, objects, arrays, functions, JSX
- `children` is a special prop — represents content between opening and closing tags
- **Default props:** `function Btn({ color = "blue" }) {}` or `Btn.defaultProps = { color: "blue" }`
- **Prop drilling:** Passing props through multiple intermediate components that don't need them (solved by Context or state management)

---

## 6. State

**State** is a built-in object that holds data that can change over time and affects what is rendered. Unlike props, state is managed **within** the component.

```jsx
const [count, setCount] = useState(0);
```

- State updates are **asynchronous** — React batches them for performance
- Calling the setter triggers a **re-render**
- Never mutate state directly — always use the setter function
- **Functional updates:** When new state depends on old state, pass a function: `setCount(prev => prev + 1)`

**State vs Props:**
| | State | Props |
|---|---|---|
| Managed by | Component itself | Parent component |
| Mutable | Yes (via setter) | No |
| Triggers re-render | Yes | Yes (when changed by parent) |

---

## 7. Component Lifecycle

**Class component lifecycle phases:**

**Mounting** (component added to DOM):
- `constructor()` — initialize state, bind methods
- `static getDerivedStateFromProps()` — sync state from props before render
- `render()` — returns JSX
- `componentDidMount()` — runs after first render, good for API calls, subscriptions

**Updating** (state or props change):
- `static getDerivedStateFromProps()`
- `shouldComponentUpdate(nextProps, nextState)` — return false to skip re-render
- `render()`
- `getSnapshotBeforeUpdate()` — capture info before DOM update
- `componentDidUpdate(prevProps, prevState)` — runs after re-render

**Unmounting** (component removed from DOM):
- `componentWillUnmount()` — cleanup: clear timers, cancel requests, remove listeners

**Functional component equivalents via hooks:**
- `componentDidMount` → `useEffect(() => {}, [])`
- `componentDidUpdate` → `useEffect(() => {}, [deps])`
- `componentWillUnmount` → cleanup function in `useEffect`

---

## 8. Hooks

**Hooks** are functions that let functional components use React features like state and lifecycle methods. Introduced in React 16.8.

**Rules of Hooks:**
1. Only call hooks at the **top level** — not inside loops, conditions, or nested functions
2. Only call hooks from **React functional components** or custom hooks

---

## 9. useState

Returns a state variable and a setter function.

```jsx
const [state, setState] = useState(initialValue);
```

- Initial value is used only on the first render
- For expensive initial computation, pass a function: `useState(() => computeExpensiveValue())`
- Setting state to same value (by `Object.is` comparison) skips re-render
- React batches multiple `setState` calls in event handlers (and in React 18, everywhere)

---

## 10. useEffect

Performs **side effects** in functional components (data fetching, subscriptions, DOM manipulation, timers).

```jsx
useEffect(() => {
  // side effect
  return () => {
    // cleanup (runs before next effect or on unmount)
  };
}, [dependencies]);
```

**Dependency array behavior:**
- `[]` — runs once after mount (like `componentDidMount`)
- `[a, b]` — runs after mount and whenever `a` or `b` changes
- No array — runs after every render

**Cleanup function:** Returned function runs before the effect re-runs or on unmount. Used to cancel subscriptions, clear timers, abort fetches.

> In React 18 Strict Mode (dev), effects run **twice** on mount to help detect side effects.

---

## 11. useContext

Consumes a React Context value without prop drilling.

```jsx
const value = useContext(MyContext);
```

- Component re-renders whenever the context value changes
- Must be used inside the corresponding `Context.Provider`

```jsx
const ThemeContext = React.createContext("light");

// Provider
<ThemeContext.Provider value="dark">
  <Child />
</ThemeContext.Provider>

// Consumer
function Child() {
  const theme = useContext(ThemeContext);
}
```

---

## 12. useReducer

Alternative to `useState` for **complex state logic** or when next state depends on previous state with multiple sub-values.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    default: return state;
  }
}
```

- `dispatch({ type: "increment" })` triggers the reducer
- Reducer must be a **pure function** — no side effects, returns new state
- Prefer over `useState` when state has multiple sub-values or complex transitions

---

## 13. useRef

Returns a mutable ref object whose `.current` property persists across renders without causing re-renders.

**Two main uses:**

1. **Accessing DOM elements:**
```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();
```

2. **Storing mutable values that don't trigger re-render:**
```jsx
const timerRef = useRef(null);
timerRef.current = setTimeout(...);
```

- `useRef` does NOT cause re-render when `.current` changes
- Value persists across renders (unlike a regular variable)
- `useRef(val)` vs `useState(val)`: ref = no re-render, state = triggers re-render

---

## 14. useMemo

Memoizes the **result of a computation** — recomputes only when dependencies change.

```jsx
const expensiveValue = useMemo(() => computeExpensive(a, b), [a, b]);
```

- Avoids re-running expensive calculations on every render
- Returns cached value if deps haven't changed
- Don't overuse — has its own cost (memory + comparison)

---

## 15. useCallback

Memoizes a **function reference** — returns the same function instance unless dependencies change.

```jsx
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- Prevents child components from re-rendering when they receive the same function as a prop (used with `React.memo`)
- Without `useCallback`, a new function reference is created on every render

**useMemo vs useCallback:**
- `useMemo(() => fn(), deps)` → memoizes the **return value**
- `useCallback(fn, deps)` → memoizes the **function itself**

---

## 16. useLayoutEffect

Identical signature to `useEffect` but fires **synchronously after all DOM mutations and before the browser paints**.

```jsx
useLayoutEffect(() => {
  // runs after DOM update, before paint
}, [deps]);
```

- Use for reading layout (element dimensions, scroll position) and synchronously re-rendering before paint
- Prefer `useEffect` by default; use `useLayoutEffect` only when you need to avoid visual flicker

---

## 17. Custom Hooks

A **custom hook** is a JavaScript function whose name starts with `use` and that calls other hooks. Used to extract and reuse stateful logic between components.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); });
  }, [url]);

  return { data, loading };
}
```

- Each call to a custom hook gets **isolated state** — not shared between components
- Follows rules of hooks
- Allows separating concerns without changing component hierarchy

---

## 18. React.memo

A **higher-order component** that memoizes a functional component — skips re-rendering if props haven't changed (shallow comparison).

```jsx
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});
```

- By default, does **shallow comparison** of props
- Pass a custom comparison function as second argument for deep comparison
- Useful when a component renders often with the same props and rendering is expensive
- Combine with `useCallback` for function props

---

## 19. Context API

Provides a way to pass data through the component tree without prop drilling.

```jsx
// 1. Create
const UserContext = React.createContext(defaultValue);

// 2. Provide
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>

// 3. Consume
const user = useContext(UserContext);
```

- All consumers re-render when context **value** changes (referential equality)
- Avoid putting frequently changing values in context (causes unnecessary re-renders)
- For complex state, combine Context with `useReducer`
- Not a replacement for state management libraries in large apps

---

## 20. React.lazy & Suspense (Code Splitting)

**React.lazy** lets you dynamically import a component — it's loaded only when needed.

```jsx
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
}
```

- `Suspense` shows the `fallback` UI while the lazy component loads
- Can wrap multiple lazy components in one `Suspense`
- Requires the dynamic import to export a default component

---

## 21. Controlled vs Uncontrolled Components

**Controlled Component:** Form element whose value is controlled by React state. Single source of truth.

```jsx
const [value, setValue] = useState("");
<input value={value} onChange={e => setValue(e.target.value)} />
```

**Uncontrolled Component:** Form element that manages its own state in the DOM. Access value via `ref`.

```jsx
const inputRef = useRef();
<input ref={inputRef} defaultValue="initial" />
inputRef.current.value; // read when needed
```

| | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | DOM |
| Access value | `state` | `ref` |
| Validation | Easy, on every change | On submit |

---

## 22. Higher-Order Components (HOC)

A **HOC** is a function that takes a component and returns a new enhanced component.

```jsx
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    if (!isLoggedIn) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
}
```

- Pattern for reusing component logic
- Does not modify the original component — returns a new one
- Common use cases: authentication, logging, theming, data fetching
- Modern alternative: custom hooks

---

## 23. Render Props

A pattern where a component's prop is a **function that returns JSX**. The component calls this function to delegate rendering.

```jsx
<DataFetcher url="/api/users" render={data => <UserList users={data} />} />
```

- Shares stateful logic between components
- Modern alternative: custom hooks

---

## 24. Error Boundaries

Class components that **catch JavaScript errors** in their child component tree, log them, and display a fallback UI instead of crashing the app.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

- Only class components can be error boundaries (no functional hook equivalent yet)
- Do NOT catch errors in: event handlers, async code, SSR, errors in the boundary itself
- `react-error-boundary` library provides a functional wrapper

---

## 25. Keys

**Keys** are special props that help React identify which items in a list have changed, been added, or removed during reconciliation.

```jsx
{items.map(item => <Item key={item.id} data={item} />)}
```

- Keys must be **unique among siblings**, not globally
- Use stable IDs — avoid using array index as key (causes bugs with reordering/deletion)
- Keys are not passed as props to the component — use a different prop name if needed
- React uses keys to match old tree nodes with new ones

---

## 26. Reconciliation

The process React uses to **diff two Virtual DOM trees** and determine the minimal set of DOM changes needed.

**Heuristics:**
1. Elements of different types → tear down old tree, build new one
2. Same type DOM elements → React updates changed attributes only
3. Same type component elements → instance is kept, props updated, re-render called
4. Lists → use `key` prop to match elements efficiently

Time complexity: O(n) with these heuristics (vs O(n³) for a general tree diff).

---

## 27. Batching

React **batches** multiple state updates into a single re-render for performance.

- React 17 and below: batching only in React event handlers
- **React 18:** automatic batching everywhere — event handlers, setTimeout, Promises, native events

```jsx
// React 18 — only one re-render despite two state updates
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // only one re-render
}, 1000);
```

To opt out of batching: `flushSync(() => setState(...))` forces synchronous re-render.

---

## 28. React 18 Concurrent Features

**Concurrent Mode** allows React to prepare multiple versions of the UI simultaneously and interrupt, pause, or resume rendering.

**`useTransition`:** Marks a state update as non-urgent — keeps UI responsive during expensive updates.
```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setSearchResults(results));
```

**`useDeferredValue`:** Defers a value update — similar to debouncing but React-aware.
```jsx
const deferredQuery = useDeferredValue(query);
```

**`Suspense` for data fetching:** In React 18, Suspense can be used with data fetching libraries that support it (React Query, Relay).

---

## 29. Portals

**Portals** render a child component into a DOM node that exists **outside the parent component's DOM hierarchy**.

```jsx
ReactDOM.createPortal(child, domNode)
```

```jsx
return ReactDOM.createPortal(
  <Modal />,
  document.getElementById("modal-root")
);
```

- Events still bubble up through the React tree (not the DOM tree)
- Use cases: modals, tooltips, dropdowns that need to escape overflow or z-index constraints

---

## 30. Refs & forwardRef

**`forwardRef`** allows a parent component to pass a `ref` to a child's DOM element.

```jsx
const Input = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

// Parent
const inputRef = useRef();
<Input ref={inputRef} />
inputRef.current.focus();
```

**`useImperativeHandle`** customizes what is exposed when a parent accesses a ref on the child.

```jsx
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
  clear: () => inputRef.current.value = ""
}));
```

---

## 31. Performance Optimization Summary

| Technique | Purpose |
|---|---|
| `React.memo` | Skip re-render if props unchanged |
| `useMemo` | Memoize expensive computed value |
| `useCallback` | Memoize function reference |
| `React.lazy` + `Suspense` | Code splitting — load components on demand |
| Virtualization | Render only visible list items (react-window) |
| `useTransition` | Mark updates as non-urgent |
| Keys in lists | Efficient reconciliation |
| Avoid inline objects/functions in JSX | Prevent unnecessary re-renders |

---

## 32. Prop Types & TypeScript

**PropTypes (runtime validation):**
```jsx
import PropTypes from "prop-types";
MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  onClick: PropTypes.func
};
```

**TypeScript (compile-time):**
```tsx
interface Props {
  name: string;
  age?: number;
  onClick: () => void;
}
function MyComponent({ name, age, onClick }: Props) {}
```

---

## 33. Fragment

Lets you group multiple elements without adding an extra DOM node.

```jsx
<React.Fragment>
  <td>Cell 1</td>
  <td>Cell 2</td>
</React.Fragment>

// Short syntax (doesn't support key prop)
<>
  <td>Cell 1</td>
  <td>Cell 2</td>
</>
```

Use `<React.Fragment key={id}>` when rendering lists and you need a key.

---

## 34. StrictMode

`<React.StrictMode>` is a development-only tool that highlights potential problems.

- Detects unexpected side effects (double-invokes render, state initializers, and effects in dev)
- Warns about deprecated lifecycle methods
- Warns about legacy `findDOMNode` usage
- Has **no effect in production**

---

## 35. Synthetic Events

React wraps native browser events in a **SyntheticEvent** — a cross-browser wrapper with the same interface as native events.

- Normalized across browsers
- In React 17+, events are attached to the **root DOM container** instead of `document`
- `e.stopPropagation()`, `e.preventDefault()` work as expected
- Access native event via `e.nativeEvent`

---

## 36. Lifting State Up

When multiple components need to share and synchronize state, **move the state up** to their closest common ancestor and pass it down via props.

```jsx
function Parent() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Display value={value} />
    </>
  );
}
```

This is the standard React pattern for component communication before reaching for Context or external state management.

---

## 37. Common Interview Patterns

**Re-render triggers:**
- State change in the component
- Props change from parent
- Parent re-renders (even if props are same, unless React.memo)
- Context value changes

**Avoid in renders:**
- Don't call hooks conditionally
- Don't create objects/arrays/functions inline in JSX if passed as props to memoized children
- Don't update state unconditionally inside `useEffect` (infinite loop)

**useEffect infinite loop causes:**
- Missing dependency array
- Object/array/function in dependency array (new reference every render) — use `useMemo`/`useCallback`
- Setting state inside effect without proper deps

**Stale closure in hooks:**
- When a callback captures an old value of state/prop — fix by adding it to deps array or using functional update

---
