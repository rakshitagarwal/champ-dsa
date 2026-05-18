# React.js Interview Guide (up to v18)

## 1. React Basics & Virtual DOM

**Definition:** React is a JavaScript library for building user interfaces using components. The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates.

**Key Points:**

- Declarative UI based on state
- Component-based architecture
- Virtual DOM reconciliation for efficient updates
- One-way data flow (parent to child)
- React updates only changed parts of real DOM

**Example:**

```jsx
import React from "react";

function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}

export default App;
```

---

## 2. JSX (JavaScript XML)

**Definition:** JSX is a syntax extension that allows writing HTML-like code in JavaScript, which gets compiled to React.createElement() calls.

**Key Points:**

- Must return single parent element
- Use `className` instead of `class`
- Use `{}` for JavaScript expressions
- Self-closing tags required for empty elements
- CamelCase for attributes (onClick, onChange)

**Example:**

```jsx
function UserCard({ user }) {
  const isActive = user.status === "active";

  return (
    <div className={isActive ? "card active" : "card"}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      {isActive && <span>✓ Active</span>}
      <img src={user.avatar} alt="User avatar" />
    </div>
  );
}

// Usage
<UserCard
  user={{ name: "John", age: 25, status: "active", avatar: "pic.jpg" }}
/>;
```

---

## 3. Components (Functional vs Class)

**Definition:** Components are reusable, independent pieces of UI. Functional components are JavaScript functions; class components are ES6 classes.

**Key Points:**

- **Functional:** Simpler, use hooks for state/lifecycle
- **Class:** Legacy approach, uses lifecycle methods
- Functional components are now preferred (React 16.8+)
- Components must start with capital letter
- Props are read-only

**Example:**

```jsx
// Functional Component (Modern)
function Greeting({ name }) {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </div>
  );
}

// Class Component (Legacy)
class GreetingClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Clicked {this.state.count} times
        </button>
      </div>
    );
  }
}
```

---

## 4. Props

**Definition:** Props (properties) are read-only data passed from parent to child components.

**Key Points:**

- Unidirectional data flow (top-down)
- Immutable within receiving component
- Can be any JavaScript value (strings, objects, functions)
- Use destructuring for cleaner code
- PropTypes for type checking (or TypeScript)

**Example:**

```jsx
function Button({ text, onClick, variant = "primary", disabled = false }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

function App() {
  const handleClick = () => alert("Clicked!");

  return (
    <div>
      <Button text="Submit" onClick={handleClick} />
      <Button text="Cancel" variant="secondary" onClick={handleClick} />
      <Button text="Disabled" disabled={true} onClick={handleClick} />
    </div>
  );
}
```

---

## 5. State (useState Hook)

**Definition:** State is mutable data managed within a component that triggers re-renders when changed.

**Key Points:**

- Use `useState()` hook in functional components
- Returns [stateValue, setterFunction]
- State updates are asynchronous
- Use functional updates for state based on previous state
- Each `useState` is independent

**Example:**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "John", age: 25 });

  const increment = () => {
    // Functional update when depending on previous state
    setCount((prevCount) => prevCount + 1);
  };

  const updateAge = () => {
    // Update object state (must spread to avoid mutation)
    setUser((prevUser) => ({ ...prevUser, age: prevUser.age + 1 }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <p>
        {user.name} is {user.age} years old
      </p>
      <button onClick={updateAge}>Birthday</button>
    </div>
  );
}
```

---

## 6. useEffect Hook

**Definition:** `useEffect` lets you perform side effects in functional components (data fetching, subscriptions, DOM manipulation).

**Key Points:**

- Runs after render by default
- Dependency array controls when it runs
- Empty array `[]` = run once on mount
- No array = run after every render
- Return cleanup function for unmount/re-run
- Replaces componentDidMount, componentDidUpdate, componentWillUnmount

**Example:**

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Runs when userId changes
    let cancelled = false;

    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

---

## 7. useContext Hook

**Definition:** `useContext` provides a way to pass data through component tree without passing props manually at every level.

**Key Points:**

- Solves "prop drilling" problem
- Create context with `createContext()`
- Provide value with `<Context.Provider>`
- Consume with `useContext()` hook
- All consumers re-render when context value changes

**Example:**

```jsx
import { createContext, useContext, useState } from "react";

// Create context
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === "dark" ? "#333" : "#fff" }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Current theme: {theme}
    </button>
  );
}
```

---

## 8. useReducer Hook

**Definition:** `useReducer` is an alternative to `useState` for managing complex state logic with actions and reducers.

**Key Points:**

- Similar to Redux pattern
- Takes reducer function and initial state
- Returns [state, dispatch]
- Better for complex state with multiple sub-values
- Preferred when next state depends on previous

**Example:**

```jsx
import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({ type: "setStep", payload: +e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

---

## 9. useRef Hook

**Definition:** `useRef` creates a mutable reference that persists across re-renders without causing re-renders when changed.

**Key Points:**

- Access DOM elements directly
- Store mutable values that don't trigger re-render
- `.current` property holds the value
- Useful for timers, previous values, focus management
- Different from state (no re-render on change)

**Example:**

```jsx
import { useRef, useEffect, useState } from "react";

function TextInput() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [text, setText] = useState("");

  useEffect(() => {
    renderCount.current += 1;
  });

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={focusInput}>Focus Input</button>
      <p>Rendered {renderCount.current} times</p>
    </div>
  );
}
```

---

## 10. useMemo Hook

**Definition:** `useMemo` memoizes expensive computations and returns cached value until dependencies change.

**Key Points:**

- Performance optimization technique
- Prevents expensive recalculations on every render
- Takes computation function and dependency array
- Only recomputes when dependencies change
- Don't overuse - profile before optimizing

**Example:**

```jsx
import { useState, useMemo } from "react";

function ExpensiveComponent({ numbers }) {
  const [count, setCount] = useState(0);

  // Without useMemo, this runs on every render
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return numbers.reduce((acc, num) => {
      // Simulate expensive operation
      for (let i = 0; i < 100000000; i++) {}
      return acc + num;
    }, 0);
  }, [numbers]); // Only recalculate when numbers change

  return (
    <div>
      <h2>Sum: {expensiveCalculation}</h2>
      <button onClick={() => setCount(count + 1)}>
        Re-render (count: {count})
      </button>
    </div>
  );
}
```

---

## 11. useCallback Hook

**Definition:** `useCallback` memoizes function references to prevent unnecessary re-renders of child components.

**Key Points:**

- Returns memoized version of callback
- Only changes if dependencies change
- Useful when passing callbacks to optimized child components
- Works with React.memo to prevent re-renders
- Different from useMemo (memoizes function vs value)

**Example:**

```jsx
import { useState, useCallback, memo } from "react";

// Child component wrapped with React.memo
const Button = memo(({ onClick, children }) => {
  console.log("Button rendered:", children);
  return <button onClick={onClick}>{children}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Without useCallback, new function on every render
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // Function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <button onClick={() => setOtherState(otherState + 1)}>
        Other state: {otherState}
      </button>
    </div>
  );
}
```

---

## 12. React.memo (Component Memoization)

**Definition:** `React.memo` is a higher-order component that prevents re-rendering if props haven't changed.

**Key Points:**

- Shallow comparison of props by default
- Can provide custom comparison function
- Only for functional components
- Performance optimization for expensive renders
- Similar to PureComponent for class components

**Example:**

```jsx
import { useState, memo } from "react";

// Expensive component
const ExpensiveChild = memo(({ data, onAction }) => {
  console.log("ExpensiveChild rendered");

  // Simulate expensive render
  let i = 0;
  while (i < 100000000) i++;

  return (
    <div>
      <h3>{data.title}</h3>
      <button onClick={onAction}>Action</button>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [childData] = useState({ title: "Hello" });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent count: {count}</button>
      {/* Won't re-render when count changes */}
      <ExpensiveChild data={childData} onAction={() => console.log("Action")} />
    </div>
  );
}
```

---

## 13. Rendering Phases (Render & Commit)

**Definition:** React's rendering process has two phases: Render phase (calculating changes) and Commit phase (applying changes to DOM).

**Key Points:**

- **Render Phase:** React calls component functions, compares Virtual DOMs
- **Commit Phase:** React updates actual DOM with changes
- Render phase can be interrupted (React 18 concurrent features)
- Commit phase is synchronous and cannot be interrupted
- Understanding helps with performance optimization

**Example:**

```jsx
import { useState, useEffect } from "react";

function RenderPhaseExample() {
  const [count, setCount] = useState(0);

  // RENDER PHASE
  console.log("1. Render phase - component function executes");
  const doubled = count * 2;

  // COMMIT PHASE (runs after DOM updates)
  useEffect(() => {
    console.log("3. Commit phase - DOM updated, effects run");
    document.title = `Count: ${count}`;
  }, [count]);

  console.log("2. Still render phase - returning JSX");

  return (
    <div>
      <p>
        Count: {count}, Doubled: {doubled}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Execution order when button clicked:
// 1. Render phase - component re-executes
// 2. Still render phase - JSX returned
// 3. Commit phase - DOM updated, useEffect runs
```

---

## 14. Reconciliation & Diffing Algorithm

**Definition:** Reconciliation is the process where React compares the new Virtual DOM with the previous one to determine minimal DOM updates.

**Key Points:**

- Uses diffing algorithm to compare trees
- Keys help identify which items changed/added/removed
- Same element type = update props
- Different element type = unmount and mount new
- Optimized O(n) algorithm (not O(n³))

**Example:**

```jsx
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build App" },
  ]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: `Todo ${todos.length + 1}`,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {/* Key helps React identify which items changed */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {" "}
            {/* IMPORTANT: unique key */}
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ❌ Bad: using index as key (causes issues when reordering)
// {todos.map((todo, index) => <li key={index}>...</li>)}

// ✅ Good: using unique id
// {todos.map(todo => <li key={todo.id}>...</li>)}
```

---

## 15. Controlled vs Uncontrolled Components

**Definition:** Controlled components have form data handled by React state; uncontrolled components store data in DOM.

**Key Points:**

- **Controlled:** React state is "single source of truth"
- **Uncontrolled:** DOM is source of truth, use refs
- Controlled = more React-like, easier validation
- Uncontrolled = simpler for basic forms
- Controlled preferred for most cases

**Example:**

```jsx
import { useState, useRef } from "react";

function FormExample() {
  // Controlled component
  const [email, setEmail] = useState("");

  // Uncontrolled component
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email (controlled):", email);
    console.log("Name (uncontrolled):", nameRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (controlled)"
      />

      {/* Uncontrolled */}
      <input
        type="text"
        ref={nameRef}
        defaultValue="John"
        placeholder="Name (uncontrolled)"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 16. Lifecycle Methods (Class Components)

**Definition:** Lifecycle methods are special methods in class components that run at specific points in a component's life.

**Key Points:**

- **Mounting:** constructor, render, componentDidMount
- **Updating:** render, componentDidUpdate
- **Unmounting:** componentWillUnmount
- Deprecated: componentWillMount, componentWillReceiveProps, componentWillUpdate
- Functional components use hooks instead

**Example:**

```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }

  // Mounting: runs once after initial render
  componentDidMount() {
    console.log("Component mounted");
    fetch(`/api/users/${this.props.userId}`)
      .then((res) => res.json())
      .then((user) => this.setState({ user, loading: false }));
  }

  // Updating: runs after updates (not initial render)
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      console.log("userId changed, refetch data");
      this.setState({ loading: true });
      fetch(`/api/users/${this.props.userId}`)
        .then((res) => res.json())
        .then((user) => this.setState({ user, loading: false }));
    }
  }

  // Unmounting: cleanup before removal
  componentWillUnmount() {
    console.log("Component will unmount");
    // Cancel subscriptions, timers, etc.
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return <div>{this.state.user.name}</div>;
  }
}

// Equivalent with hooks:
function UserProfileFunc({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setLoading(false);
      });

    return () => console.log("Cleanup");
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

---

## 17. React Router (SPA Navigation)

**Definition:** React Router is the standard library for handling navigation and routing in React single-page applications.

**Key Points:**

- `BrowserRouter` wraps app for routing
- `Routes` and `Route` define path-component mapping
- `Link` and `NavLink` for navigation (no page reload)
- `useNavigate` hook for programmatic navigation
- `useParams` to access URL parameters
- v6 introduced simplified API

**Example:**

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User 123</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserProfile() {
  const { userId } = useParams(); // Get URL param
  const navigate = useNavigate(); // Programmatic navigation

  return (
    <div>
      <h1>User Profile: {userId}</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```

---

## 18. Redux (State Management)

**Definition:** Redux is a predictable state container for managing global application state with a single store.

**Key Points:**

- Single source of truth (one store)
- State is read-only (immutable)
- Changes via pure functions (reducers)
- Actions describe what happened
- Dispatch actions to update state
- Redux Toolkit (RTK) is modern approach

**Example:**

```jsx
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create slice (combines actions + reducer)
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // RTK uses Immer, allows "mutation"
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// App.jsx
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, increment, decrement, incrementByAmount } from "./store";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

---

## 19. React 18 Features

**Definition:** React 18 introduced concurrent rendering features for better performance and user experience.

**Key Points:**

- **Automatic Batching:** Multiple state updates batched together
- **Transitions:** Mark updates as non-urgent with `startTransition`
- **Suspense for Data Fetching:** Show fallback while loading
- **Concurrent Rendering:** Interrupt/resume rendering
- **useId:** Generate unique IDs for accessibility
- **useDeferredValue:** Defer updating non-urgent parts

**Example:**

```jsx
import { useState, useTransition, Suspense, useDeferredValue } from "react";

function React18Features() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Deferred value for non-urgent updates
  const deferredInput = useDeferredValue(input);

  const handleChange = (e) => {
    setInput(e.target.value);

    // Mark as low-priority update
    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 20000; i++) {
        newList.push(e.target.value);
      }
      setList(newList);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending ? <div>Loading...</div> : null}

      {/* Suspense for lazy loading */}
      <Suspense fallback={<div>Loading component...</div>}>
        <LazyComponent data={deferredInput} />
      </Suspense>

      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Automatic Batching Example
function AutoBatching() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    // React 18: Both updates batched = 1 re-render
    // React 17: In event handlers already batched, but not in timeouts
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
      // Only 1 re-render in React 18!
    }, 1000);
  };

  return <button onClick={handleClick}>Update</button>;
}
```

---

## 20. Custom Hooks

**Definition:** Custom hooks are JavaScript functions that use built-in hooks to encapsulate and reuse stateful logic.

**Key Points:**

- Must start with "use" prefix
- Can call other hooks inside
- Share logic, not state (each call has isolated state)
- Extract complex logic from components
- Better than HOCs and render props for reusability

**Example:**

```jsx
import { useState, useEffect } from "react";

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Using custom hooks
function UserProfile() {
  const { data: user, loading, error } = useFetch("/api/user");
  const [theme, setTheme] = useLocalStorage("theme", "light");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Theme: {theme}
      </button>
    </div>
  );
}
```

---

## 21. Error Boundaries

**Definition:** Error boundaries are React components that catch JavaScript errors in their child component tree and display fallback UI.

**Key Points:**

- Only available as class components (no hook yet)
- Catches errors during rendering, lifecycle, and constructors
- Does NOT catch errors in event handlers, async code, or SSR
- Use `componentDidCatch` for logging
- Use `static getDerivedStateFromError` for fallback UI

**Example:**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to service
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details>{this.state.error && this.state.error.toString()}</details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  );
}

function ProblematicComponent() {
  const [count, setCount] = React.useState(0);

  if (count === 5) {
    throw new Error("Crashed at 5!");
  }

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count} (crashes at 5)
    </button>
  );
}
```

---

## 22. Higher-Order Components (HOC)

**Definition:** HOCs are functions that take a component and return a new component with additional props or behavior.

**Key Points:**

- Pattern for reusing component logic
- Pure functions, don't modify original component
- Convention: prefix with "with" (withAuth, withLoading)
- Can be composed together
- Largely replaced by hooks for logic reuse

**Example:**

```jsx
// HOC that adds loading state
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// HOC that adds authentication check
function withAuth(Component) {
  return function WithAuthComponent(props) {
    const isAuthenticated = true; // Check auth status

    if (!isAuthenticated) {
      return <div>Please log in</div>;
    }

    return <Component {...props} />;
  };
}

// Original component
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Enhanced components
const UserListWithLoading = withLoading(UserList);
const UserListWithAuth = withAuth(UserListWithLoading);

// Usage
function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  return <UserListWithAuth users={users} isLoading={loading} />;
}
```

---

## 23. Portals

**Definition:** Portals provide a way to render children into a DOM node outside the parent component's DOM hierarchy.

**Key Points:**

- Created with `ReactDOM.createPortal(child, container)`
- Useful for modals, tooltips, dropdowns
- Events still bubble up through React tree (not DOM tree)
- Child appears outside parent in DOM but behaves as child in React

**Example:**

```jsx
import { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Render into #modal-root instead of parent component
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"), // Must exist in HTML
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <h1>My App</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Content</h2>
        <p>This is rendered outside the parent div!</p>
      </Modal>
    </div>
  );
}

// In index.html:
// <div id="root"></div>
// <div id="modal-root"></div>
```

---

## 24. Lazy Loading & Code Splitting

**Definition:** Lazy loading defers loading components until they're needed, reducing initial bundle size.

**Key Points:**

- Use `React.lazy()` for dynamic imports
- Must wrap with `<Suspense>` for fallback
- Reduces initial load time
- Split code at route level typically
- Works well with React Router

**Example:**

```jsx
import { lazy, Suspense, useState } from "react";

// Lazy load components
const HeavyComponent = lazy(() => import("./HeavyComponent"));
const Dashboard = lazy(() => import("./Dashboard"));
const Profile = lazy(() => import("./Profile"));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <h1>My App</h1>

      <button onClick={() => setShowHeavy(true)}>Load Heavy Component</button>

      {showHeavy && (
        <Suspense fallback={<div>Loading heavy component...</div>}>
          <HeavyComponent />
        </Suspense>
      )}

      {/* Route-based code splitting */}
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </div>
  );
}

// HeavyComponent.jsx
export default function HeavyComponent() {
  return <div>This is a heavy component loaded on demand!</div>;
}
```

---

## 25. Single Page Application (SPA) Concept

**Definition:** SPAs load a single HTML page and dynamically update content as user interacts, without full page reloads.

**Key Points:**

- Better user experience (faster, smoother)
- Client-side routing (React Router)
- Initial load slower, subsequent navigations faster
- SEO challenges (solved with SSR/SSG)
- State persists during navigation

**Example:**

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Shared state persists across "page" navigations
function App() {
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |<Link to="/about">About</Link> |
        <Link to="/products">Products</Link>
      </nav>

      <div>
        <h3>Shared State: {sharedCount}</h3>
        <button onClick={() => setSharedCount(sharedCount + 1)}>
          Increment (persists across navigation)
        </button>
      </div>

      {/* No page reload when navigating */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home - No page reload when you navigate!</h1>;
}

function About() {
  return <h1>About - Notice the shared state above persists</h1>;
}

function Products() {
  return <h1>Products - This is client-side routing</h1>;
}

// Benefits of SPA:
// ✅ Faster navigation after initial load
// ✅ Better UX (no white screen flashes)
// ✅ State persists across routes
// ✅ Mobile app-like experience
// ❌ Slower initial load
// ❌ SEO challenges (need SSR/SSG)
```

---

## Quick Interview Tips

1. **useState vs useReducer:** Use useState for simple state, useReducer for complex state with multiple sub-values
2. **When to use useEffect:** Data fetching, subscriptions, manual DOM changes, setting up timers
3. **Dependency Array Rules:**
   - No array = runs every render
   - Empty `[]` = runs once on mount
   - `[dep1, dep2]` = runs when dependencies change
4. **Keys in Lists:** Always use unique, stable IDs (not array index when reordering)
5. **React 18 Key Features:** Automatic batching, transitions, Suspense, concurrent rendering
6. **Performance Optimization:** React.memo, useMemo, useCallback, lazy loading, code splitting
7. **Controlled Components:** Preferred for forms - React state as single source of truth
8. **Redux Flow:** Action → Dispatch → Reducer → Store → View
9. **SPA vs MPA:** SPA = single HTML, client routing, better UX; MPA = multiple pages, server routing, better SEO
10. **Custom Hooks:** Extract reusable logic, must start with "use", can call other hooks

Good luck with your React interview! ⚛️
