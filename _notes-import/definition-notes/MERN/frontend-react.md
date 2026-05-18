## React Fundamentals

---

### 1. What is React and why use it?

**Answer:**
React is a JavaScript library for building user interfaces, particularly single-page applications.

**Key Benefits:**

- **Component-Based**: Reusable UI components
- **Virtual DOM**: Efficient updates and rendering
- **Declarative**: Describe what UI should look like
- **Large Ecosystem**: Rich library and tool support
- **Strong Community**: Extensive resources and support

### 2. What is JSX?

**Answer:**
JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code in JavaScript.

```jsx
// JSX
const element = <h1>Hello, {name}!</h1>;

// Transpiles to:
const element = React.createElement("h1", null, `Hello,${name}!`);
```

**Key Points:**

- Not valid JavaScript; requires transpilation (Babel)
- Can embed JavaScript expressions using `{}`
- Must return single parent element
- Use camelCase for attributes (className, onClick)

### 3. What is the Virtual DOM?

**Answer:**
The Virtual DOM is a lightweight copy of the actual DOM kept in memory.

**How it works:**

1. When state changes, React creates new Virtual DOM
2. Compares new Virtual DOM with previous (diffing)
3. Calculates minimal changes needed
4. Updates only changed parts in real DOM (reconciliation)

**Benefits:**

- Better performance than manipulating real DOM directly
- Batches updates for efficiency
- Cross-browser consistency

### 4. Difference between Class and Functional Components?

**Class Component:**

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <h1>Count: {this.state.count}</h1>;
  }
}
```

**Functional Component:**

```jsx
function Welcome() {
  const [count, setCount] = useState(0);
  return <h1>Count: {count}</h1>;
}
```

**Key Differences:**

- Functional components are simpler and more concise
- Hooks allow state/lifecycle in functional components
- Class components use `this`, functional don’t
- Functional components are the modern standard

### 5. What are Props?

**Answer:**
Props (properties) are read-only inputs passed from parent to child components.

```jsx
// Parent
<UserCard name="John" age={25} />;

// Child
function UserCard({ name, age }) {
  return (
    <div>
      {name} is {age} years old
    </div>
  );
}
```

**Key Points:**

- Immutable (read-only)
- Flow unidirectionally (parent to child)
- Can pass any data type
- Can pass functions as props

### 6. What is State in React?

**Answer:**
State is a built-in object that stores component’s dynamic data and determines component’s behavior.

```jsx
const [count, setCount] = useState(0);

// Update state
setCount(count + 1);
setCount((prev) => prev + 1); // Preferred for updates based on previous state
```

**Key Points:**

- Mutable and private to component
- Triggers re-render when updated
- Should be updated using setState/setter function
- Never mutate state directly

### 7. Controlled vs Uncontrolled Components?

**Controlled Component:**

```jsx
function Form() {
  const [value, setValue] = useState("");

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

**Uncontrolled Component:**

```jsx
function Form() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}
```

**When to use:**

- **Controlled**: Form validation, conditional rendering
- **Uncontrolled**: Simple forms, file inputs, integrating non-React code

### 8. What is Component Lifecycle?

**Answer:**
Lifecycle methods are hooks that run at specific points in a component’s life.

**Functional Component (Hooks):**

```jsx
useEffect(() => {
  // ComponentDidMount + ComponentDidUpdate
  console.log("Component mounted/updated");

  return () => {
    // ComponentWillUnmount
    console.log("Cleanup");
  };
}, [dependencies]);
```

**Common Lifecycle Phases:**

- **Mounting**: Component created and inserted into DOM
- **Updating**: Re-render due to props/state changes
- **Unmounting**: Component removed from DOM

### 9. What are Keys in React and why are they important?

**Answer:**
Keys help React identify which items have changed, added, or removed in lists.

```jsx
// Good - using unique id
items.map((item) => <Item key={item.id} {...item} />);

// Bad - using index
items.map((item, index) => <Item key={index} {...item} />);
```

**Why Important:**

- Improves rendering performance
- Maintains component state correctly
- Helps with list reordering

**Best Practices:**

- Use stable, unique IDs
- Avoid using array index unless list is static
- Keys must be unique among siblings

### 10. What are Fragments?

**Answer:**
Fragments let you group children without adding extra DOM nodes.

```jsx
// Verbose syntax
<React.Fragment>
  <Child1 />
  <Child2 />
</React.Fragment>

// Short syntax
<>
  <Child1 />
  <Child2 />
</>
```

**When to use:**

- Returning multiple elements
- Avoiding unnecessary wrapper divs
- Table rows, list items

---

## React Hooks

### 11. What are Hooks and their rules?

**Answer:**
Hooks are functions that let you use state and lifecycle features in functional components.

**Rules of Hooks:**

1. Only call at the top level (not in loops, conditions, nested functions)
2. Only call from React functions (components or custom hooks)
3. Custom hooks must start with “use”

### 12. Explain useState Hook

**Answer:**
useState adds state to functional components.

```jsx
const [state, setState] = useState(initialValue);

// With object
const [user, setUser] = useState({ name: "", age: 0 });
setUser({ ...user, name: "John" }); // Spread to preserve other properties

// With function (lazy initialization)
const [data, setData] = useState(() => {
  return expensiveComputation();
});
```

**Key Points:**

- Returns array: [currentState, updateFunction]
- State updates are asynchronous
- Functional updates for state based on previous state

### 13. Explain useEffect Hook

**Answer:**
useEffect performs side effects in functional components.

```jsx
// Runs after every render
useEffect(() => {
  console.log("Runs on every render");
});

// Runs only on mount
useEffect(() => {
  console.log("Runs once on mount");
}, []);

// Runs when dependencies change
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);

// With cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

**Common Use Cases:**

- Data fetching
- Subscriptions
- DOM manipulation
- Timers

### 14. What is useContext Hook?

**Answer:**
useContext accesses context values without Consumer component.

```jsx
// Create Context
const ThemeContext = React.createContext("light");

// Provider
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer using useContext
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

### 15. What is useRef Hook?

**Answer:**
useRef creates a mutable reference that persists across renders.

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// Storing mutable values without re-render
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {}, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
}
```

**Use Cases:**

- Accessing DOM elements
- Storing mutable values
- Previous state/props values

### 16. What is useMemo Hook?

**Answer:**
useMemo memoizes expensive computations.

```jsx
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) => item.includes(filter));
  }, [items, filter]);

  return <List items={filteredItems} />;
}
```

**When to use:**

- Expensive calculations
- Preventing unnecessary re-computations
- Optimizing child component rendering

**Don’t overuse:** Only use for actual performance issues.

### 17. What is useCallback Hook?

**Answer:**
useCallback memoizes function definitions.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback - new function on every render
  const handleClick = () => setCount((c) => c + 1);

  // With useCallback - same function reference
  const handleClickMemo = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <Child onClick={handleClickMemo} />;
}
```

**When to use:**

- Passing callbacks to optimized child components
- Dependencies in useEffect
- Preventing unnecessary re-renders

### 18. What is useReducer Hook?

**Answer:**
useReducer is alternative to useState for complex state logic.

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

**When to use:**

- Complex state logic
- Multiple sub-values
- State depends on previous state
- Redux-like pattern

### 19. What are Custom Hooks?

**Answer:**
Custom hooks extract reusable stateful logic.

```jsx
// Custom hook for fetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
function Component() {
  const { data, loading, error } = useFetch("/api/users");
  if (loading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

**Benefits:**

- Code reusability
- Cleaner components
- Separation of concerns
- Easier testing

### 20. Difference between useMemo and useCallback?

**Answer:**

- **useMemo**: Memoizes the **result** of a function
- **useCallback**: Memoizes the **function itself**

```jsx
// useMemo - returns computed value
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback - returns memoized function
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

// Equivalent to:
const memoizedCallback = useMemo(() => () => doSomething(a, b), [a, b]);
```

---

## State Management

### 21. What is Context API?

**Answer:**
Context provides a way to pass data through component tree without prop drilling.

```jsx
// Create Context
const UserContext = createContext();

// Provider
function App() {
  const [user, setUser] = useState({ name: "John" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// Consumer
function Profile() {
  const { user } = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

**When to use:**

- Theme data
- User authentication
- Language preferences
- Global UI state

### 22. What is Redux and its core principles?

**Answer:**
Redux is a predictable state container for JavaScript apps.

**Core Principles:**

1. **Single Source of Truth**: One store for entire app
2. **State is Read-Only**: Only changed via actions
3. **Changes via Pure Functions**: Reducers are pure functions

**Redux Flow:**

```jsx
// Action
const increment = () => ({ type: "INCREMENT" });

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}

// Store
const store = createStore(counter);

// Dispatch
store.dispatch(increment());
```

### 23. Redux vs Context API?

**Answer:**

**Context API:**

- Built into React
- Good for simple global state
- Less boilerplate
- Can cause performance issues with frequent updates

**Redux:**

- External library
- Better for complex state
- More boilerplate
- Better dev tools and middleware
- Time-travel debugging
- Better performance for large apps

**When to use Redux:**

- Large application
- Complex state logic
- Shared state across many components
- Need middleware (logging, async)

### 24. What is Redux Toolkit?

**Answer:**
Redux Toolkit is the official, opinionated, batteries-included toolset for Redux.

```jsx
import { createSlice, configureStore } from "@reduxjs/toolkit";

// Slice
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Actions
export const { increment, decrement } = counterSlice.actions;
```

**Benefits:**

- Less boilerplate
- Built-in Immer for immutable updates
- DevTools configured automatically
- createAsyncThunk for async logic

### 25. What are Redux Middleware?

**Answer:**
Middleware extends Redux with custom functionality between dispatching action and reducer.

**Common Middleware:**

- **redux-thunk**: Async actions
- **redux-saga**: Complex async flows
- **redux-logger**: Logging actions

```jsx
// Thunk example
const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_USER_REQUEST" });
  try {
    const user = await api.fetchUser(id);
    dispatch({ type: "FETCH_USER_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "FETCH_USER_FAILURE", error });
  }
};
```

### 26. What is Prop Drilling and how to avoid it?

**Answer:**
Prop drilling is passing props through multiple component layers.

**Problem:**

```jsx
<GrandParent data={data}>
  <Parent data={data}>
    <Child data={data} /> // Only Child needs data
  </Parent>
</GrandParent>
```

**Solutions:**

1. **Context API**: Share data without passing props
2. **Redux**: Global state management
3. **Component Composition**: Children as props
4. **Custom Hooks**: Encapsulate data fetching

---

## Performance Optimization

### 27. What is React.memo()?

**Answer:**
React.memo is a HOC that memoizes component rendering.

```jsx
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});

// With custom comparison
const MyComponent = React.memo(
  function MyComponent(props) {
    return <div>{props.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  },
);
```

**When to use:**

- Pure functional components
- Component renders often with same props
- Expensive render

**Don’t overuse:** Adds overhead for comparison.

### 28. Code Splitting and Lazy Loading

**Answer:**
Splitting code into smaller bundles loaded on demand.

```jsx
// Lazy loading component
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

**Benefits:**

- Smaller initial bundle
- Faster initial load
- Load code when needed

### 29. How to optimize React app performance?

**Answer:**

**Techniques:**

1. **Use React.memo()**: Prevent unnecessary re-renders
2. **useMemo/useCallback**: Memoize values and functions
3. **Code Splitting**: Lazy load components
4. **Virtualization**: Render only visible items (react-window)
5. **Avoid inline functions**: Define outside render
6. **Key optimization**: Use stable unique keys
7. **Production build**: Minified and optimized
8. **Image optimization**: Lazy loading, WebP format
9. **Debounce/Throttle**: Limit expensive operations
10. **Web Workers**: Offload heavy computations

### 30. What is React Profiler?

**Answer:**
Profiler measures rendering performance of React app.

```jsx
import { Profiler } from "react";

function onRenderCallback(
  id, // component id
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time without memoization
  startTime,
  commitTime,
  interactions,
) {
  console.log(`${id} took${actualDuration}ms to render`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Components />
    </Profiler>
  );
}
```

**Also use React DevTools Profiler** for visual analysis.

---

## React Router

### 31. What is React Router?

**Answer:**
Library for routing in React applications.

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 32. What are Route Parameters?

**Answer:**
Dynamic segments in URL path.

```jsx
// Define route
<Route path="/user/:id" element={<User />} />;

// Access in component
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

### 33. What are Navigation Hooks?

**Answer:**

```jsx
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function Component() {
  // Navigate programmatically
  const navigate = useNavigate();
  navigate("/home");
  navigate(-1); // Go back

  // Current location
  const location = useLocation();
  console.log(location.pathname);

  // Query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  setSearchParams({ query: "new value" });
}
```

### 34. Protected Routes in React Router

**Answer:**

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### 35. Difference between Link and NavLink?

**Answer:**

```jsx
// Link - basic navigation
<Link to="/about">About</Link>

// NavLink - adds active class
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```

**NavLink is useful for:**

- Navigation menus
- Highlighting active links
- Styling current route

---

## Forms & Validation

### 36. How to handle forms in React?

**Answer:**

**Controlled Component:**

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 37. What is Formik?

**Answer:**
Library for building forms in React with less code.

```jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="email" type="email" />
        <ErrorMessage name="email" component="div" />

        <Field name="password" type="password" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
```

### 38. What is React Hook Form?

**Answer:**
Performant form library with easy validation.

```jsx
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

**Benefits:**

- Less re-renders
- Smaller bundle size
- Built-in validation
- Easy integration with UI libraries

---

## API Integration

### 39. How to fetch data in React?

**Answer:**

**Using useEffect:**

```jsx
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 40. What is Axios?

**Answer:**
Promise-based HTTP client for browser and Node.js.

```jsx
import axios from "axios";

// GET request
const fetchUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// POST request
const createUser = async (userData) => {
  const response = await axios.post("/api/users", userData);
  return response.data;
};

// Interceptors
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  },
);
```

**Benefits over fetch:**

- Automatic JSON transformation
- Interceptors
- Request/response timeout
- CSRF protection
- Better error handling

### 41. What is React Query (TanStack Query)?

**Answer:**
Data fetching and state management library.

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch data
function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error.message;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Mutations
function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("/api/users", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "John" })}>
      Create User
    </button>
  );
}
```

**Benefits:**

- Automatic caching
- Background refetching
- Automatic retries
- Pagination and infinite scroll
- Optimistic updates

### 42. What is SWR?

**Answer:**
React Hooks library for data fetching by Vercel.

```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function Profile() {
  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>Hello {data.name}!</div>;
}

// With revalidation
const { data } = useSWR("/api/user", fetcher, {
  refreshInterval: 3000, // Revalidate every 3 seconds
  revalidateOnFocus: true,
});
```

**Features:**

- Stale-while-revalidate strategy
- Focus revalidation
- Real-time experience
- Lightweight

---

## Testing

### 43. What is React Testing Library?

**Answer:**
Testing library for React components focused on user behavior.

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments counter", () => {
  render(<Counter />);

  const button = screen.getByRole("button", { name: /increment/i });
  const count = screen.getByText(/count: 0/i);

  expect(count).toBeInTheDocument();

  fireEvent.click(button);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

**Key Principles:**

- Test user behavior, not implementation
- Query by accessibility
- Focus on what users see

### 44. Common Testing Queries

**Answer:**

```jsx
// By role (preferred)
screen.getByRole("button", { name: /submit/i });

// By label text
screen.getByLabelText("Email");

// By placeholder
screen.getByPlaceholderText("Enter email");

// By text
screen.getByText("Hello World");

// By test ID (last resort)
screen.getByTestId("custom-element");

// Async queries
await screen.findByText("Loaded");

// Query variants
getBy; // Throws error if not found
queryBy; // Returns null if not found
findBy; // Async, waits for element
```

### 45. How to test async code?

**Answer:**

```jsx
import { render, screen, waitFor } from "@testing-library/react";

test("loads and displays user", async () => {
  render(<UserProfile id="1" />);

  // Wait for async operation
  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  // Or use findBy (combines getBy + waitFor)
  const name = await screen.findByText("John Doe");
  expect(name).toBeInTheDocument();
});

// Mock API calls
jest.mock("axios");
axios.get.mockResolvedValue({ data: { name: "John" } });
```

### 46. What is Jest?

**Answer:**
JavaScript testing framework with test runner and assertion library.

```jsx
// Test suite
describe("Calculator", () => {
  // Individual test
  test("adds 1 + 2 to equal 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  // Setup and teardown
  beforeEach(() => {
    // Runs before each test
  });

  afterEach(() => {
    // Runs after each test
  });
});

// Matchers
expect(value).toBe(expected); // Strict equality
expect(value).toEqual(expected); // Deep equality
expect(value).toBeTruthy();
expect(value).toContain(item);
expect(fn).toThrow();
expect(fn).toHaveBeenCalled();
```

### 47. How to test components with Context?

**Answer:**

```jsx
import { render } from "@testing-library/react";
import { ThemeContext } from "./ThemeContext";

// Create wrapper
const wrapper = ({ children }) => (
  <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
);

test("uses theme from context", () => {
  render(<ThemedButton />, { wrapper });
  // assertions...
});
```

---

## JavaScript Fundamentals

### 48. What is the difference between let, const, and var?

**Answer:**

| Feature       | var             | let       | const     |
| ------------- | --------------- | --------- | --------- |
| Scope         | Function        | Block     | Block     |
| Hoisting      | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Redeclaration | Yes             | No        | No        |
| Reassignment  | Yes             | Yes       | No        |

```jsx
// var - function scoped
if (true) {
  var x = 5;
}
console.log(x); // 5 (accessible outside block)

// let - block scoped
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError

// const - block scoped, immutable binding
const z = 5;
z = 10; // TypeError
```

### 49. Explain Arrow Functions

**Answer:**

```jsx
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Key differences:
// 1. No 'this' binding
const obj = {
  value: 10,
  regular: function () {
    console.log(this.value);
  }, // 10
  arrow: () => {
    console.log(this.value);
  }, // undefined
};

// 2. No 'arguments' object
const func = () => {
  console.log(arguments); // ReferenceError
};

// 3. Cannot be used as constructor
const Person = () => {};
new Person(); // TypeError

// 4. No prototype
console.log(func.prototype); // undefined
```

### 50. What are Template Literals?

**Answer:**

```jsx
// String interpolation
const name = "John";
const greeting = `Hello,${name}!`;

// Multi-line strings
const html = `
  <div>
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`;

// Expression evaluation
const price = 10;
const message = `Total: $${price * 1.1}`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<mark>${values[i] || ""}</mark>`;
  }, "");
}
const result = highlight`Hello${name}, you have${count} messages`;
```

### 51. Explain Destructuring

**Answer:**

```jsx
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Object destructuring
const { name, age, city = "Unknown" } = user;

// Nested destructuring
const {
  address: { street, city },
} = user;

// Function parameters
function greet({ name, age }) {
  return `${name} is${age} years old`;
}

// Renaming
const { name: userName } = user;
```

### 52. What are Spread and Rest operators?

**Answer:**

```jsx
// Spread - expands array/object
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Rest - collects into array
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
sum(1, 2, 3, 4); // 10

const { a, ...rest } = { a: 1, b: 2, c: 3 };
// a = 1, rest = { b: 2, c: 3 }
```

### 53. Explain Promises and Async/Await

**Answer:**

```jsx
// Promise
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
  .finally(() => console.log("Done"));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Parallel execution
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

### 54. What is ‘this’ keyword?

**Answer:**

```jsx
// Global context
console.log(this); // window (browser)

// Object method
const obj = {
  name: "John",
  greet() {
    console.log(this.name); // 'John'
  },
};

// Arrow function (lexical this)
const obj2 = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined (this from outer scope)
  },
};

// Explicit binding
function greet() {
  console.log(this.name);
}
greet.call({ name: "John" }); // 'John'
greet.apply({ name: "Jane" }); // 'Jane'
const boundGreet = greet.bind({ name: "Bob" });
boundGreet(); // 'Bob'
```

### 55. What is Closure?

**Answer:**

```jsx
function outer() {
  const secret = "hidden";

  function inner() {
    console.log(secret); // Can access outer variable
  }

  return inner;
}

const getSecret = outer();
getSecret(); // 'hidden'

// Practical example: Private variables
function counter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const myCounter = counter();
myCounter.increment(); // 1
myCounter.increment(); // 2
myCounter.getCount(); // 2
```

---

## HTML & CSS

### 56. What is Semantic HTML?

**Answer:**
Using HTML elements that clearly describe their meaning.

```html
<!-- Semantic -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>
<footer>
  <p>Copyright 2024</p>
</footer>

<!-- Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>
```

**Benefits:**

- Better accessibility
- SEO improvement
- Code readability
- Screen reader support

### 57. What is Flexbox?

**Answer:**
One-dimensional layout method for arranging items.

```css
.container {
  display: flex;
  justify-content: center; /* Main axis */
  align-items: center; /* Cross axis */
  flex-direction: row; /* row, column */
  flex-wrap: wrap; /* wrap, nowrap */
  gap: 10px;
}

.item {
  flex: 1; /* flex-grow flex-shrink flex-basis */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}
```

### 58. What is CSS Grid?

**Answer:**
Two-dimensional layout system.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

### 59. What is CSS Specificity?

**Answer:**
Rules for determining which CSS styles are applied.

**Specificity hierarchy (high to low):**

1. Inline styles: `style="color: red"` (1000)
2. IDs: `#header` (100)
3. Classes, attributes, pseudo-classes: `.nav, [type="text"], :hover` (10)
4. Elements, pseudo-elements: `div, ::before` (1)

```css
/* Specificity: 1 */
div {
  color: blue;
}

/* Specificity: 10 */
.text {
  color: green;
}

/* Specificity: 100 */
#title {
  color: red;
}

/* Specificity: 111 */
#title div.text {
  color: purple;
}
```

### 60. What are CSS Preprocessors?

**Answer:**
Extend CSS with variables, nesting, mixins (SASS, LESS).

```scss
// Variables
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;

// Nesting
.nav {
  background: $primary-color;

  ul {
    list-style: none;

    li {
      display: inline-block;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

// Mixins
@mixin border-radius($radius) {
  border-radius: $radius;
}

.button {
  @include border-radius(5px);
}
```

---

## Browser & Web APIs

### 61. What is Local Storage vs Session Storage?

**Answer:**

| Feature  | LocalStorage  | SessionStorage   |
| -------- | ------------- | ---------------- |
| Lifetime | Until cleared | Tab/window close |
| Scope    | All tabs      | Single tab       |
| Size     | ~5-10MB       | ~5-10MB          |
| API      | Same          | Same             |

```jsx
// LocalStorage
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();

// SessionStorage
sessionStorage.setItem("key", "value");

// Store objects (convert to JSON)
localStorage.setItem("user", JSON.stringify({ name: "John" }));
const user = JSON.parse(localStorage.getItem("user"));
```

### 62. What are Cookies?

**Answer:**
Small pieces of data stored by browser, sent with every request.

```jsx
// Set cookie
document.cookie =
  "username=John; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";

// Read cookies
const cookies = document.cookie.split(";").reduce((acc, cookie) => {
  const [key, value] = cookie.split("=").map((c) => c.trim());
  acc[key] = value;
  return acc;
}, {});

// Delete cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

**LocalStorage vs Cookies:**

- Cookies sent with every HTTP request
- Cookies have expiration
- Cookies are smaller (4KB)
- LocalStorage is easier to use

### 63. What is CORS?

**Answer:**
Cross-Origin Resource Sharing - security feature restricting cross-origin requests.

**Problem:**

```jsx
// Frontend on http://localhost:3000
fetch("http://api.example.com/data"); // CORS error
```

**Solution (Backend):**

```jsx
// Node.js/Express
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Or use cors middleware
const cors = require("cors");
app.use(cors());
```

### 64. What is Event Delegation?

**Answer:**
Technique of handling events at parent level using event bubbling.

```jsx
// Instead of adding listener to each item
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", handleClick);
});

// Add single listener to parent
document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    handleClick(e);
  }
});
```

**Benefits:**

- Better performance
- Works with dynamically added elements
- Less memory usage

### 65. What is the Fetch API?

**Answer:**
Modern interface for making HTTP requests.

```jsx
// GET request
fetch("/api/users")
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// POST request
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  },
  body: JSON.stringify({ name: "John", email: "john@example.com" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// With async/await
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
```

---

## Build Tools & Deployment

### 66. What is npm and package.json?

**Answer:**
npm is Node Package Manager for JavaScript.

**package.json:**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}
```

**Common commands:**

```bash
npm install / npm i        # Install all dependencies
npm install package-name   # Install specific package
npm install --save-dev     # Install as dev dependency
npm uninstall package-name # Remove package
npm update                 # Update packages
npm run script-name        # Run script
```

### 67. What is Webpack?

**Answer:**
Module bundler that combines JavaScript files and assets.

**Key concepts:**

- **Entry**: Starting point for bundling
- **Output**: Where to emit bundles
- **Loaders**: Transform files (babel-loader, css-loader)
- **Plugins**: Extend functionality

```jsx
// webpack.config.js
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### 68. What is Babel?

**Answer:**
JavaScript compiler that transforms modern JS to backward-compatible versions.

```jsx
// .babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}

// Transforms:
const greeting = name => `Hello,${name}`;

// To:
var greeting = function(name) {
  return "Hello, " + name;
};
```

### 69. What is Vite?

**Answer:**
Next-generation frontend build tool (faster than Webpack).

**Benefits:**

- Instant server start
- Lightning-fast HMR
- Optimized builds
- Native ESM support

```bash
# Create Vite project
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### 70. What is ESLint?

**Answer:**
Static code analysis tool for identifying code quality issues.

```jsx
// .eslintrc.json
{
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "react/prop-types": "warn"
  },
  "env": {
    "browser": true,
    "es2021": true
  }
}
```

**Common commands:**

```bash
npx eslint src/          # Check files
npx eslint src/ --fix    # Auto-fix issues
```

---

## Bonus Questions

### 71. What is Progressive Web App (PWA)?

**Answer:**
Web apps with native app-like features.

**Key features:**

- Offline functionality (Service Workers)
- Installable (Add to home screen)
- Push notifications
- Fast and reliable

### 72. What are CSS-in-JS libraries?

**Answer:**
Write CSS within JavaScript.

**Popular libraries:**

- Styled Components
- Emotion
- CSS Modules

```jsx
// Styled Components
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.primary ? "blue" : "gray")};
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

<Button primary>Click me</Button>;
```

### 73. What is Server-Side Rendering (SSR)?

**Answer:**
Rendering React on server instead of client.

**Benefits:**

- Better SEO
- Faster initial load
- Better performance on slow devices

**Frameworks:**

- Next.js
- Remix
- Gatsby (Static Site Generation)

### 74. What is TypeScript?

**Answer:**
Superset of JavaScript with static typing.

```tsx
// Type annotations
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

// Interfaces
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}

// React with TypeScript
interface Props {
  title: string;
  count: number;
}

const Component: React.FC<Props> = ({ title, count }) => {
  return (
    <div>
      {title}: {count}
    </div>
  );
};
```

### 75. Common React Interview Coding Challenges

1. **Counter with increment/decrement**
2. **Todo list with CRUD operations**
3. **Fetch and display data from API**
4. **Search/filter functionality**
5. **Form with validation**
6. **Modal component**
7. **Infinite scroll**
8. **Debounced search**
9. **Dark mode toggle**
10. **Custom hooks implementation**

---

## Preparation Strategy

### Study Plan:

1. **Week 1**: React fundamentals, Hooks, State management
2. **Week 2**: Performance, Router, Forms, API integration
3. **Week 3**: Testing, JavaScript ES6+, HTML/CSS
4. **Week 4**: Practice coding challenges, Mock interviews

### Resources:

- **Official Docs**: react.dev
- **Courses**: Udemy, Frontend Masters
- **Practice**: LeetCode, Codewars, HackerRank
- **Projects**: Build 2-3 portfolio projects
- **GitHub**: Showcase your code

### Interview Tips:

- Explain your thought process
- Ask clarifying questions
- Consider edge cases
- Write clean, readable code
- Discuss trade-offs
- Know your resume projects deeply

---

## Good Luck! 🚀

**Remember**:

- Practice coding daily
- Build real projects
- Understand concepts deeply
- Be ready to explain your decisions
- Stay confident and communicate clearly
