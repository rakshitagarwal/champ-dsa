## For 2 Years Experience

---

## Table of Contents

1. [MongoDB Questions](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#mongodb-questions)
2. [Express.js Questions](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#expressjs-questions)
3. [React Questions](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#react-questions)
4. [Node.js Questions](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#nodejs-questions)
5. [General Full-Stack Questions](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#general-full-stack-questions)
6. [Coding Challenges](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#coding-challenges)

---

## MongoDB Questions

### Q1: What is MongoDB and why use it over SQL databases?

**Answer:**
MongoDB is a NoSQL document-oriented database that stores data in flexible, JSON-like documents (BSON).

**Advantages:**

- Flexible schema - documents can have different structures
- Horizontal scalability through sharding
- Better performance for certain use cases (read-heavy, unstructured data)
- Native JSON support makes it natural for JavaScript applications
- Embedded documents reduce joins

**When to use MongoDB:**

- Rapidly changing requirements
- Hierarchical data structures
- Large volumes of unstructured data
- Need for horizontal scaling

**When to use SQL:**

- Complex transactions with ACID requirements
- Complex relationships and joins
- Data integrity is critical
- Well-defined schema

---

### Q2: Explain the difference between embedded documents and references in MongoDB.

**Answer:**

**Embedded Documents:**

```jsx
// User with embedded address
{
  _id: ObjectId("..."),
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "New York",
    zipcode: "10001"
  }
}

```

**Pros:** Single query, atomic updates, better performance
**Cons:** Document size limit (16MB), data duplication

**References:**

```jsx
// User
{
  _id: ObjectId("user1"),
  name: "John Doe",
  addressId: ObjectId("addr1")
}

// Address
{
  _id: ObjectId("addr1"),
  street: "123 Main St",
  city: "New York"
}

```

**Pros:** No duplication, smaller documents, easier updates
**Cons:** Multiple queries (or $lookup), not atomic

**Rule of thumb:** Embed for one-to-one or one-to-few relationships. Reference for one-to-many or many-to-many relationships.

---

### Q3: What are indexes in MongoDB and why are they important?

**Answer:**
Indexes are special data structures that store a small portion of the collection's data in an easy-to-traverse form, improving query performance.

**Common Index Types:**

```jsx
// Single field index
db.users.createIndex({ email: 1 });

// Compound index
db.users.createIndex({ lastName: 1, firstName: 1 });

// Text index
db.articles.createIndex({ content: "text" });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });
```

**Benefits:**

- Dramatically faster queries
- Efficient sorting
- Enforcing uniqueness

**Drawbacks:**

- Slower writes (index must be updated)
- Extra storage space
- Memory usage

**Best Practices:**

- Index fields used in queries frequently
- Monitor with `explain()` method
- Avoid over-indexing
- Consider compound indexes for multiple field queries

---

### Q4: Explain MongoDB aggregation pipeline with an example.

**Answer:**
The aggregation pipeline processes documents through multiple stages, transforming data step by step.

```jsx
// Example: Get average order value by customer
db.orders.aggregate([
  // Stage 1: Filter orders from 2024
  {
    $match: {
      orderDate: { $gte: new Date("2024-01-01") },
    },
  },

  // Stage 2: Group by customer
  {
    $group: {
      _id: "$customerId",
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: "$amount" },
      avgOrderValue: { $avg: "$amount" },
    },
  },

  // Stage 3: Sort by total amount
  {
    $sort: { totalAmount: -1 },
  },

  // Stage 4: Limit to top 10
  {
    $limit: 10,
  },

  // Stage 5: Join with users collection
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "customerInfo",
    },
  },
]);
```

**Common Stages:**

- `$match` - Filter documents
- `$group` - Group and aggregate
- `$project` - Select/reshape fields
- `$sort` - Sort documents
- `$limit` / `$skip` - Pagination
- `$lookup` - Join collections
- `$unwind` - Deconstruct arrays

---

## Express.js Questions

### Q5: What is middleware in Express.js? Explain with examples.

**Answer:**
Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle.

```jsx
// Application-level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to next middleware
});

// Route-level middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  // Verify token
  next();
};

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected data" });
});

// Error-handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files
```

**Types:**

- Application-level: `app.use()`
- Router-level: `router.use()`
- Error-handling: 4 parameters
- Built-in: `express.json()`, `express.static()`
- Third-party: `cors`, `helmet`, `morgan`

---

### Q6: How do you handle errors in Express.js?

**Answer:**

**Synchronous Error Handling:**

```jsx
app.get("/user/:id", (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) {
    throw new Error("User not found"); // Caught by Express
  }
  res.json(user);
});
```

**Asynchronous Error Handling:**

```jsx
// Option 1: Try-catch with async/await
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error); // Pass to error middleware
  }
});

// Option 2: Wrapper function
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),
);
```

**Centralized Error Middleware:**

```jsx
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production: don't leak error details
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : "Something went wrong",
    });
  }
});
```

---

### Q7: Explain JWT authentication in Express.js.

**Answer:**
JSON Web Tokens (JWT) are a stateless authentication mechanism where the server creates a signed token and the client includes it in subsequent requests.

```jsx
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registration
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Protected route
app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});
```

**JWT Structure:**

- Header: Algorithm and token type
- Payload: Claims (user data)
- Signature: Verification signature

---

## React Questions

### Q8: Explain React Hooks. What are the most commonly used hooks?

**Answer:**
Hooks are functions that let you use state and other React features in functional components.

**useState:**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**useEffect:**

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Runs after render
    fetchUser(userId).then(setUser);

    // Cleanup function
    return () => {
      // Cancel requests, clear timers, etc.
    };
  }, [userId]); // Dependency array - re-run when userId changes

  return <div>{user?.name}</div>;
}
```

**useContext:**

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}
```

**useReducer:**

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </div>
  );
}
```

**useMemo & useCallback:**

```jsx
import { useMemo, useCallback } from "react";

function ExpensiveComponent({ data, onItemClick }) {
  // Memoize expensive calculation
  const processedData = useMemo(() => {
    return data.map((item) => expensiveOperation(item));
  }, [data]);

  // Memoize callback
  const handleClick = useCallback(
    (id) => {
      onItemClick(id);
    },
    [onItemClick],
  );

  return <div>{/* render */}</div>;
}
```

---

### Q9: What is the Virtual DOM and how does React use it?

**Answer:**
The Virtual DOM is a lightweight copy of the actual DOM kept in memory. React uses it to optimize updates.

**How it works:**

1. When state changes, React creates a new Virtual DOM tree
2. React compares (diffs) the new Virtual DOM with the previous one
3. React calculates the minimum changes needed
4. React updates only the changed parts in the real DOM (reconciliation)

**Benefits:**

- Batches multiple updates
- Minimizes expensive DOM operations
- Improves performance
- Enables declarative programming

**Example:**

```jsx
// When this component updates
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// React doesn't re-render the entire list
// It only updates the changed <li> elements
```

**Key Concept:** The `key` prop helps React identify which items have changed, been added, or removed.

---

### Q10: Explain state management in React. When would you use Context API vs Redux?

**Answer:**

**Context API:**

```jsx
// Create context
const UserContext = createContext();

// Provider
function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// Consumer
function Dashboard() {
  const { user } = useContext(UserContext);
  return <div>Welcome {user?.name}</div>;
}
```

**Redux:**

```jsx
// Action
const increment = () => ({ type: "INCREMENT" });

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Store
import { createStore } from "redux";
const store = createStore(counterReducer);

// Component
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(increment())}>Count: {count}</button>;
}
```

**When to use Context API:**

- Small to medium apps
- Simple state (theme, user auth, language)
- Few state updates
- State doesn't change frequently
- Prop drilling is the only problem

**When to use Redux:**

- Large-scale applications
- Complex state logic
- Many state updates
- State needs to be shared across many components
- Time-travel debugging needed
- Middleware needed (logging, async operations)

**Modern Alternatives:**

- Zustand (simpler than Redux)
- Jotai (atomic state)
- Recoil (Facebook's solution)

---

### Q11: How do you optimize React application performance?

**Answer:**

**1. Use React.memo for component memoization:**

```jsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive render */}</div>;
});
// Only re-renders if props change
```

**2. useMemo for expensive calculations:**

```jsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
```

**3. useCallback for function memoization:**

```jsx
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

**4. Code Splitting with React.lazy:**

```jsx
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**5. Virtualize long lists:**

```jsx
import { FixedSizeList } from "react-window";

function VirtualList({ items }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => <div style={style}>{items[index]}</div>}
    </FixedSizeList>
  );
}
```

**6. Avoid inline functions and objects:**

```jsx
// Bad
<Child onClick={() => doSomething()} style={{ margin: 10 }} />;

// Good
const handleClick = useCallback(() => doSomething(), []);
const style = useMemo(() => ({ margin: 10 }), []);
<Child onClick={handleClick} style={style} />;
```

**7. Use proper keys in lists:**

```jsx
// Bad - using index
{
  items.map((item, index) => <div key={index}>{item}</div>);
}

// Good - using unique id
{
  items.map((item) => <div key={item.id}>{item}</div>);
}
```

**8. Debounce expensive operations:**

```jsx
import { debounce } from "lodash";

const debouncedSearch = useMemo(
  () => debounce((query) => searchAPI(query), 300),
  [],
);
```

---

### Q12: What are React lifecycle methods and their hook equivalents?

**Answer:**

**Class Component Lifecycle:**

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    // Runs after first render
  }

  componentDidUpdate(prevProps, prevState) {
    // Runs after every update
  }

  componentWillUnmount() {
    // Cleanup before component is removed
  }
}
```

**Functional Component with Hooks:**

```jsx
function MyComponent() {
  // componentDidMount
  useEffect(() => {
    console.log("Component mounted");
  }, []); // Empty dependency array = run once

  // componentDidUpdate
  useEffect(() => {
    console.log("Component updated");
  }); // No dependency array = run after every render

  // componentDidUpdate with specific dependencies
  useEffect(() => {
    console.log("Prop changed");
  }, [prop]); // Run when prop changes

  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("Cleanup");
    };
  }, []);

  // Combined
  useEffect(() => {
    // Setup
    const subscription = subscribeToData();

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [dependency]);
}
```

**Lifecycle Phases:**

1. **Mounting:** Constructor → render → componentDidMount
2. **Updating:** render → componentDidUpdate
3. **Unmounting:** componentWillUnmount

---

## Node.js Questions

### Q13: Explain the Event Loop in Node.js.

**Answer:**
The Event Loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.

**How it works:**

1. **Call Stack:** Executes synchronous code
2. **Node APIs:** Handles async operations (timers, I/O, etc.)
3. **Callback Queue:** Stores callbacks from completed operations
4. **Event Loop:** Moves callbacks from queue to call stack when stack is empty

**Phases of Event Loop:**

```
   ┌───────────────────────────┐
┌─>│           timers          │ <- setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ <- I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ <- internal use
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ <- retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ <- setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ <- socket.on('close')
   └───────────────────────────┘

```

**Example:**

```jsx
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

// Output: 1, 4, 3, 2
// Microtasks (Promises) have priority over macrotasks (setTimeout)
```

---

### Q14: What is the difference between `setImmediate()` and `process.nextTick()`?

**Answer:**

**process.nextTick():**

- Executes callback immediately after the current operation
- Before the Event Loop continues
- Higher priority than I/O events

**setImmediate():**

- Executes callback in the next iteration of the Event Loop
- After I/O events in the 'check' phase

```jsx
console.log("Start");

setImmediate(() => {
  console.log("Immediate");
});

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("End");

// Output: Start, End, Next Tick, Immediate
```

**When to use:**

- `process.nextTick()`: When you need to execute something before Event Loop continues (use sparingly, can starve I/O)
- `setImmediate()`: When you want to execute after I/O events (safer for recursive operations)

---

### Q15: Explain Streams in Node.js.

**Answer:**
Streams are objects that let you read or write data in chunks rather than all at once, making them memory-efficient for large data.

**Types of Streams:**

**1. Readable Stream:**

```jsx
const fs = require("fs");
const readable = fs.createReadStream("large-file.txt", {
  encoding: "utf8",
  highWaterMark: 16 * 1024, // 16KB chunks
});

readable.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
});

readable.on("end", () => {
  console.log("Finished reading");
});

readable.on("error", (error) => {
  console.error("Error:", error);
});
```

**2. Writable Stream:**

```jsx
const writable = fs.createWriteStream("output.txt");

writable.write("Hello ");
writable.write("World");
writable.end("!\n");

writable.on("finish", () => {
  console.log("Finished writing");
});
```

**3. Pipe (connecting streams):**

```jsx
const readable = fs.createReadStream("input.txt");
const writable = fs.createWriteStream("output.txt");

readable.pipe(writable);

// Or with transform
const { Transform } = require("stream");
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

readable.pipe(upperCase).pipe(writable);
```

**4. Duplex & Transform Streams:**

```jsx
const { Duplex, Transform } = require("stream");

// Duplex - both readable and writable
const duplex = new Duplex({
  read(size) {
    this.push("data");
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

// Transform - modify data as it passes through
const gzip = require("zlib").createGzip();
fs.createReadStream("file.txt")
  .pipe(gzip)
  .pipe(fs.createWriteStream("file.txt.gz"));
```

**Benefits:**

- Memory efficient (don't load entire file)
- Time efficient (start processing before all data arrives)
- Composable (pipe multiple streams)

---

### Q16: How do you handle asynchronous operations in Node.js?

**Answer:**

**1. Callbacks (Old approach):**

```jsx
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Problem: Callback hell
getData((err, data) => {
  processData(data, (err, processed) => {
    saveData(processed, (err, result) => {
      // Nested callbacks - hard to read
    });
  });
});
```

**2. Promises:**

```jsx
const readFile = util.promisify(fs.readFile);

readFile("file.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// Chaining
getData()
  .then((data) => processData(data))
  .then((processed) => saveData(processed))
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

**3. Async/Await (Modern approach):**

```jsx
async function readAndProcess() {
  try {
    const data = await readFile("file.txt", "utf8");
    const processed = await processData(data);
    const result = await saveData(processed);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Parallel execution
async function fetchMultiple() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchComments(),
    ]);
    return { users, posts, comments };
  } catch (error) {
    console.error(error);
  }
}

// Sequential execution
async function processInOrder() {
  const result1 = await operation1();
  const result2 = await operation2(result1);
  const result3 = await operation3(result2);
  return result3;
}
```

**4. Error Handling:**

```jsx
// Try-catch for async/await
async function safeOperation() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.error("Operation failed:", error);
    return null; // or throw
  }
}

// Global error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
```

---

## General Full-Stack Questions

### Q17: How do you handle CORS in a MERN application?

**Answer:**
CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to a different domain.

**Server-side (Express):**

```jsx
const cors = require("cors");

// Option 1: Allow all origins (development only)
app.use(cors());

// Option 2: Specific origin
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Option 3: Multiple origins
const allowedOrigins = ["http://localhost:3000", "https://myapp.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Option 4: Manual CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
```

**Client-side (React with Axios):**

```jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### Q18: Explain RESTful API design principles.

**Answer:**

**REST Principles:**

**1. Resource-Based URLs:**

```jsx
// Good
GET    /api/users           // Get all users
GET    /api/users/:id       // Get specific user
POST   /api/users           // Create user
PUT    /api/users/:id       // Update user
DELETE /api/users/:id       // Delete user

// Nested resources
GET    /api/users/:id/posts // Get user's posts
POST   /api/users/:id/posts // Create post for user

// Bad
GET /api/getAllUsers
GET /api/getUserById?id=123
POST /api/createNewUser

```

**2. HTTP Methods:**

- GET: Retrieve (safe, idempotent)
- POST: Create (not idempotent)
- PUT: Update/Replace (idempotent)
- PATCH: Partial update (idempotent)
- DELETE: Remove (idempotent)

**3. Status Codes:**

```jsx
// Success
200 OK              // Successful GET, PUT, PATCH
201 Created         // Successful POST
204 No Content      // Successful DELETE

// Client Errors
400 Bad Request     // Invalid data
401 Unauthorized    // Not authenticated
403 Forbidden       // Not authorized
404 Not Found       // Resource doesn't exist
409 Conflict        // Duplicate resource

// Server Errors
500 Internal Server Error
503 Service Unavailable

```

**4. Response Format:**

```jsx
// Success response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}

// List response with pagination
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}

```

**5. Versioning:**

```jsx
// URL versioning (most common)
app.use("/api/v1/users", userRoutesV1);
app.use("/api/v2/users", userRoutesV2);

// Header versioning
app.use((req, res, next) => {
  const version = req.headers["api-version"];
  // Route based on version
});
```

**6. Filtering, Sorting, Pagination:**

```jsx
// GET /api/users?page=1&limit=10&sort=-createdAt&status=active

app.get("/users", async (req, res) => {
  const { page = 1, limit = 10, sort = "-createdAt", status } = req.query;

  const query = status ? { status } : {};

  const users = await User.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await User.countDocuments(query);

  res.json({
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count,
      pages: Math.ceil(count / limit),
    },
  });
});
```

---

### Q19: How do you implement authentication and authorization?

**Answer:**

**Authentication (Who are you?):**

```jsx
// Registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Authorization (What can you do?):**

```jsx
// Auth middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

// Usage
app.get("/api/users", authenticate, async (req, res) => {
  // Any authenticated user can access
  const users = await User.find();
  res.json(users);
});

app.delete(
  "/api/users/:id",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    // Only admins can delete users
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  },
);

// Resource ownership check
app.put("/api/posts/:id", authenticate, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Check if user owns the post or is admin
  if (
    post.author.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ error: "Not authorized" });
  }

  // Update post
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});
```

**React Client:**

```jsx
// Auth context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and get user
      fetchUser(token)
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { token, user } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected route
function ProtectedRoute({ children, roles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
```

---

### Q20: How do you deploy a MERN stack application?

**Answer:**

**Deployment Architecture:**

**1. Backend Deployment (Node.js/Express):**

**Heroku:**

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
heroku create myapp-backend
git push heroku main
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

```

**AWS EC2:**

```bash
# Install Node.js and PM2
sudo apt update
sudo apt install nodejs npm
sudo npm install -g pm2

# Clone and setup
git clone your-repo
cd your-repo
npm install

# Start with PM2
pm2 start server.js --name "api"
pm2 startup
pm2 save

# Nginx reverse proxy
sudo apt install nginx
# Configure nginx to proxy to localhost:5000

```

**Railway/Render:**

```yaml
# render.yaml
services:
  - type: web
    name: api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
```

**2. Frontend Deployment (React):**

**Vercel:**

```bash
npm install -g vercel
vercel login
vercel

```

**Netlify:**

```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=build

```

**3. Database (MongoDB):**

```jsx
// Use MongoDB Atlas (cloud)
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

**4. Environment Variables:**

```jsx
// Backend .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
CLIENT_URL=https://yourfrontend.com

// Frontend .env
REACT_APP_API_URL=https://yourbackend.com/api

```

**5. Production Best Practices:**

```jsx
// server.js
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();

// Security
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**6. CI/CD with GitHub Actions:**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

---

## Coding Challenges

### Challenge 1: Implement debounce function

```jsx
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage in React
function SearchComponent() {
  const [query, setQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        // API call
        searchAPI(value);
      }, 500),
    [],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

### Challenge 2: Implement throttle function

```jsx
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

// Usage: Scroll event
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("Scrolled!");
  }, 1000),
);
```

### Challenge 3: Deep clone an object

```jsx
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item, hash);
    });
    return arrCopy;
  }

  // Handle Object
  const objCopy = {};
  hash.set(obj, objCopy);
  Object.keys(obj).forEach((key) => {
    objCopy[key] = deepClone(obj[key], hash);
  });

  return objCopy;
}
```

### Challenge 4: Implement Promise.all

```jsx
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
```

### Challenge 5: Flatten nested array

```jsx
// Recursive
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// Iterative
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }

  return result;
}

// Using flat() (ES2019)
const flattened = arr.flat(Infinity);
```

---

## Behavioral Questions Preparation

### 1. Tell me about a challenging project you worked on.

**Structure your answer using STAR:**

- **Situation:** Describe the context
- **Task:** What was your responsibility?
- **Action:** What did you do?
- **Result:** What was the outcome?

**Example:**
"In my previous role, I worked on an e-commerce application that was experiencing slow page loads. I identified that inefficient MongoDB queries and lack of caching were the main issues. I implemented aggregation pipelines, added Redis caching for frequently accessed data, and optimized React components with lazy loading. This reduced page load times by 60% and improved conversion rates by 15%."

### 2. How do you handle disagreements with team members?

Focus on:

- Open communication
- Understanding different perspectives
- Finding compromise
- Keeping the team goal in mind

### 3. Describe a time you made a mistake and how you handled it.

Show:

- Accountability
- Problem-solving
- Learning from mistakes
- Communication with stakeholders

### 4. How do you stay updated with new technologies?

Mention:

- Tech blogs, documentation
- Online courses (Udemy, Coursera)
- Open source contributions
- Side projects
- Tech communities (Reddit, Dev.to)

---

## Tips for Interview Success

1. **Understand the fundamentals** - Don't just memorize, understand why things work
2. **Practice coding** - LeetCode, HackerRank for algorithms
3. **Build projects** - Have 2-3 solid projects to discuss
4. **Prepare questions** - Ask about tech stack, team culture, development process
5. **Communication** - Explain your thought process while coding
6. **Stay calm** - It's okay to say "I don't know" and explain how you'd find the answer

---

## Additional Resources

- **Documentation:** MDN, React Docs, Node.js Docs, MongoDB Manual
- **Practice:** LeetCode, HackerRank, CodeWars
- **System Design:** System Design Primer (GitHub)
- **Books:** "You Don't Know JS", "Eloquent JavaScript"
- **Videos:** Traversy Media, The Net Ninja, Academind

---

**Good luck with your interview! 🚀**
