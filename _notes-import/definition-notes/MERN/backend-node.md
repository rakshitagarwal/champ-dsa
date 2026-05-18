## Node.js Fundamentals

---

### 1. What is Node.js? How is it different from JavaScript in the browser?

**Answer:**
Node.js is a JavaScript runtime built on Chrome’s V8 engine that allows running JavaScript on the server.

**Key Differences:**

| Browser JavaScript          | Node.js                                 |
| --------------------------- | --------------------------------------- |
| DOM, Window object          | No DOM, has global object               |
| Limited file system access  | Full file system access (fs module)     |
| HTTP requests via Fetch/XHR | HTTP via http/https modules             |
| ES6 modules (import/export) | CommonJS (require/module.exports) + ES6 |
| Single environment          | Cross-platform                          |

**Node.js Features:**

- Event-driven, non-blocking I/O
- Single-threaded with event loop
- NPM ecosystem
- Built-in modules (fs, http, path, etc.)

### 2. Explain the Node.js Event Loop in detail

**Answer:**
The event loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.

**Event Loop Phases:**

```
   ┌───────────────────────────┐
┌─>│           timers          │ <- setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ <- I/O callbacks deferred
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ <- Internal use only
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ <- Retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ <- setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ <- socket.on('close', ...)
   └───────────────────────────┘
```

**Microtasks (Higher Priority):**

- process.nextTick()
- Promise callbacks

**Example:**

```jsx
console.log("1");

setTimeout(() => console.log("2"), 0);

setImmediate(() => console.log("3"));

process.nextTick(() => console.log("4"));

Promise.resolve().then(() => console.log("5"));

console.log("6");

// Output: 1, 6, 4, 5, 2, 3
```

### 3. What is the difference between process.nextTick() and setImmediate()?

**Answer:**

```jsx
// process.nextTick - executes before next event loop phase
process.nextTick(() => {
  console.log("nextTick");
});

// setImmediate - executes in check phase
setImmediate(() => {
  console.log("immediate");
});

// Output: nextTick, immediate
```

**Key Differences:**

- **nextTick**: Fires before entering next phase (microtask queue)
- **setImmediate**: Fires in check phase (macrotask)
- nextTick has higher priority
- setImmediate is better for I/O-heavy operations

**Use Cases:**

- **nextTick**: When you need callback to run after current operation but before I/O
- **setImmediate**: When you want to execute after I/O events

### 4. Explain module.exports vs exports

**Answer:**

```jsx
// Both reference the same object initially
console.log(module.exports === exports); // true

// ✅ Correct - Adding properties
exports.hello = function () {
  return "Hello";
};
module.exports.world = function () {
  return "World";
};

// ✅ Correct - Replacing entire export
module.exports = function () {
  return "Hello World";
};

// ❌ Wrong - This breaks the reference
exports = function () {
  return "Hello World";
};
// Only module.exports is returned by require()

// Best Practice: Use module.exports for clarity
module.exports = {
  hello: function () {
    return "Hello";
  },
  world: function () {
    return "World";
  },
};
```

**Key Points:**

- `exports` is a shorthand for `module.exports`
- `require()` returns `module.exports`, not `exports`
- Reassigning `exports` breaks the reference
- Use `module.exports` when exporting single function/class

### 5. What are Streams in Node.js? Explain different types.

**Answer:**
Streams are objects for handling streaming data (reading/writing data piece by piece).

**Types of Streams:**

**1. Readable Stream:**

```jsx
const fs = require("fs");
const readStream = fs.createReadStream("large-file.txt");

readStream.on("data", (chunk) => {
  console.log(`Received${chunk.length} bytes`);
});

readStream.on("end", () => {
  console.log("Finished reading");
});

readStream.on("error", (err) => {
  console.error(err);
});
```

**2. Writable Stream:**

```jsx
const writeStream = fs.createWriteStream("output.txt");
writeStream.write("Hello ");
writeStream.write("World\n");
writeStream.end();
```

**3. Duplex Stream (both readable and writable):**

```jsx
const { Duplex } = require("stream");
const net = require("net");
// TCP socket is duplex
const socket = net.connect(8080);
```

**4. Transform Stream (modify data as it’s written/read):**

```jsx
const { Transform } = require("stream");

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```

**Piping Streams:**

```jsx
// Copy file efficiently
const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");
readStream.pipe(writeStream);

// Chain multiple streams
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));
```

**Benefits:**

- Memory efficient (don’t load entire file)
- Time efficient (start processing immediately)
- Composable (pipe streams together)

### 6. What is Buffer in Node.js?

**Answer:**
Buffer is a temporary storage for binary data (outside V8 heap).

```jsx
// Create buffers
const buf1 = Buffer.alloc(10); // Filled with zeros
const buf2 = Buffer.allocUnsafe(10); // Uninitialized (faster)
const buf3 = Buffer.from("Hello", "utf8");
const buf4 = Buffer.from([72, 101, 108, 108, 111]);

// Reading/Writing
buf1.write("Hello");
console.log(buf1.toString()); // 'Hello'
console.log(buf1.toString("hex")); // Hex representation

// Concatenation
const combined = Buffer.concat([buf3, buf4]);

// Comparison
console.log(buf3.equals(buf4)); // true/false

// JSON
const json = JSON.stringify(buf3);
// {"type":"Buffer","data":[72,101,108,108,111]}
```

**Use Cases:**

- File I/O operations
- Network protocols (TCP/UDP)
- Image/video processing
- Cryptography
- Binary data manipulation

**Important:**

- Fixed size once created
- More efficient than strings for binary data
- Be careful with allocUnsafe (may contain old data)

### 7. What is package.json and package-lock.json?

**Answer:**

**package.json:**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

**Key sections:**

- **dependencies**: Required in production
- **devDependencies**: Only for development
- **scripts**: Custom commands
- **engines**: Node version requirements

**package-lock.json:**

- Locks exact versions of dependencies
- Ensures consistent installs across environments
- Generated automatically by npm
- Should be committed to version control
- Contains integrity hashes for security

- _Semantic Versioning (^, ~, _):\*\*

```json
"express": "4.18.2"   // Exact version
"express": "^4.18.2"  // Compatible (minor/patch updates)
"express": "~4.18.2"  // Patch updates only
"express": "*"        // Latest version (not recommended)
```

### 8. What is the difference between dependencies and devDependencies?

**Answer:**

```json
{
  "dependencies": {
    "express": "^4.18.2", // Needed in production
    "mongoose": "^7.0.0", // Needed in production
    "dotenv": "^16.0.0" // Needed in production
  },
  "devDependencies": {
    "nodemon": "^2.0.20", // Development only
    "jest": "^29.0.0", // Testing only
    "eslint": "^8.36.0" // Linting only
  }
}
```

**Installation:**

```bash
# Install all dependencies
npm install

# Install only production dependencies
npm install --production

# Add to dependencies
npm install express

# Add to devDependencies
npm install --save-dev jest
```

**When to use devDependencies:**

- Testing frameworks (Jest, Mocha)
- Build tools (Webpack, Babel)
- Linters (ESLint)
- Development servers (Nodemon)
- Type definitions (@types/\*)

### 9. Explain CommonJS vs ES6 Modules

**Answer:**

**CommonJS (Node.js default):**

```jsx
// Exporting
module.exports = function hello() {
  return "Hello";
};

// Or multiple exports
module.exports = {
  hello: () => "Hello",
  world: () => "World",
};

// Importing
const hello = require("./hello");
const { hello, world } = require("./utils");

// Dynamic imports
const moduleName = "./module";
const module = require(moduleName);
```

**ES6 Modules:**

```jsx
// Exporting
export function hello() {
  return "Hello";
}

export const world = () => "World";

export default function greet() {
  return "Hello World";
}

// Importing
import greet from "./greet.js";
import { hello, world } from "./utils.js";
import * as utils from "./utils.js";

// Dynamic imports (async)
const module = await import("./module.js");
```

**Key Differences:**

| CommonJS        | ES6 Modules               |
| --------------- | ------------------------- |
| require()       | import/export             |
| Synchronous     | Asynchronous              |
| Dynamic         | Static                    |
| Runtime loading | Compile-time optimization |
| module.exports  | export/default            |

**Using ES6 in Node.js:**

```json
// package.json
{
  "type": "module"
}
```

Or use `.mjs` extension for ES6 modules.

### 10. What are Node.js built-in modules you commonly use?

**Answer:**

**File System (fs):**

```jsx
const fs = require("fs");
const fsPromises = require("fs").promises;

// Sync
const data = fs.readFileSync("file.txt", "utf8");

// Async (callback)
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Async (promises)
const data = await fsPromises.readFile("file.txt", "utf8");
```

**Path:**

```jsx
const path = require("path");

path.join(__dirname, "uploads", "file.txt");
path.resolve("uploads", "file.txt");
path.basename("/foo/bar/file.txt"); // 'file.txt'
path.dirname("/foo/bar/file.txt"); // '/foo/bar'
path.extname("file.txt"); // '.txt'
```

**HTTP/HTTPS:**

```jsx
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(3000);
```

**OS:**

```jsx
const os = require("os");

os.platform(); // 'linux', 'darwin', 'win32'
os.cpus(); // CPU info
os.totalmem(); // Total memory
os.freemem(); // Free memory
os.homedir(); // Home directory
```

**Crypto:**

```jsx
const crypto = require("crypto");

// Hash
const hash = crypto.createHash("sha256").update("password").digest("hex");

// Random bytes
crypto.randomBytes(16, (err, buf) => {
  const token = buf.toString("hex");
});
```

**Other useful modules:**

- **util**: Utility functions
- **events**: Event emitter
- **stream**: Stream interfaces
- **child_process**: Spawn processes
- **cluster**: Multi-process support
- **url**: URL parsing
- **querystring**: Query string parsing

---

## Asynchronous Programming

### 11. Explain Callbacks, Promises, and Async/Await

**Answer:**

**1. Callbacks (oldest pattern):**

```jsx
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Callback Hell
getData((a) => {
  getMoreData(a, (b) => {
    getMoreData(b, (c) => {
      getMoreData(c, (d) => {
        // Too nested!
      });
    });
  });
});
```

**2. Promises:**

```jsx
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFile("file.txt")
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log("Done"));

// Chaining
getData()
  .then((a) => getMoreData(a))
  .then((b) => getMoreData(b))
  .then((c) => console.log(c))
  .catch((err) => console.error(err));

// Promise.all - parallel execution
Promise.all([promise1, promise2, promise3]).then(
  ([result1, result2, result3]) => {
    console.log(result1, result2, result3);
  },
);

// Promise.race - first to settle
Promise.race([promise1, promise2]).then((result) => console.log(result));
```

**3. Async/Await (modern, cleanest):**

```jsx
async function processFile() {
  try {
    const data = await readFile("file.txt");
    const processed = await processData(data);
    const saved = await saveData(processed);
    return saved;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Parallel execution with async/await
async function parallelTasks() {
  const [result1, result2, result3] = await Promise.all([
    task1(),
    task2(),
    task3(),
  ]);
  return { result1, result2, result3 };
}

// Sequential execution
async function sequentialTasks() {
  const result1 = await task1();
  const result2 = await task2(result1);
  const result3 = await task3(result2);
  return result3;
}
```

**Best Practices:**

- Use async/await for cleaner code
- Handle errors with try-catch
- Use Promise.all() for parallel operations
- Avoid mixing patterns

### 12. What is Callback Hell and how to avoid it?

**Answer:**

**Callback Hell (Pyramid of Doom):**

```jsx
// Bad ❌
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getShippingInfo(details.shippingId, (shipping) => {
        console.log(shipping);
      });
    });
  });
});
```

**Solutions:**

**1. Use Promises:**

```jsx
getUser(userId)
  .then((user) => getOrders(user.id))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => getShippingInfo(details.shippingId))
  .then((shipping) => console.log(shipping))
  .catch((err) => console.error(err));
```

**2. Use Async/Await:**

```jsx
async function getUserShipping(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const shipping = await getShippingInfo(details.shippingId);
    return shipping;
  } catch (err) {
    console.error(err);
  }
}
```

**3. Modularization:**

```jsx
async function fetchUserData(userId) {
  const user = await getUser(userId);
  return user;
}

async function fetchOrderData(userId) {
  const orders = await getOrders(userId);
  return orders[0];
}

async function main(userId) {
  const user = await fetchUserData(userId);
  const order = await fetchOrderData(user.id);
  // Clean and readable
}
```

### 13. How do you handle errors in asynchronous code?

**Answer:**

**1. Callbacks (error-first pattern):**

```jsx
fs.readFile("file.txt", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log(data);
});
```

**2. Promises:**

```jsx
fetchData()
  .then((data) => processData(data))
  .catch((err) => {
    console.error("Error:", err);
    // Handle error
  })
  .finally(() => {
    // Cleanup
  });

// Catch specific errors
fetchData()
  .then((data) => processData(data))
  .catch(NetworkError, (err) => {
    // Handle network errors
  })
  .catch((err) => {
    // Handle all other errors
  });
```

**3. Async/Await:**

```jsx
async function fetchAndProcess() {
  try {
    const data = await fetchData();
    const processed = await processData(data);
    return processed;
  } catch (err) {
    console.error("Error:", err);
    throw err; // Re-throw if needed
  } finally {
    // Cleanup
  }
}

// Multiple try-catch for specific handling
async function complexOperation() {
  let data;
  try {
    data = await fetchData();
  } catch (err) {
    console.error("Fetch failed:", err);
    return null;
  }

  try {
    return await processData(data);
  } catch (err) {
    console.error("Processing failed:", err);
    return data; // Return unprocessed data
  }
}
```

**4. Global Error Handlers:**

```jsx
// Unhandled Promise Rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Log to error tracking service
  // Optionally exit: process.exit(1);
});

// Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit is recommended
});
```

**5. Custom Error Classes:**

```jsx
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
    this.statusCode = 500;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

// Usage
try {
  throw new ValidationError("Invalid email");
} catch (err) {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ error: err.message });
  }
}
```

### 14. Explain Promise.all(), Promise.race(), Promise.allSettled()

**Answer:**

**1. Promise.all() - Wait for all:**

```jsx
// All must succeed
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments(),
]);

// If any fails, entire operation fails
Promise.all([promise1, promise2, promise3])
  .then(([result1, result2, result3]) => {
    console.log("All succeeded");
  })
  .catch((err) => {
    console.error("At least one failed:", err);
  });
```

**Use case:** When you need all results and all operations must succeed.

**2. Promise.race() - First to settle:**

```jsx
// Returns first promise to settle (resolve or reject)
const result = await Promise.race([
  fetchFromAPI1(),
  fetchFromAPI2(),
  timeout(5000), // Timeout after 5 seconds
]);

// Timeout implementation
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms),
  );
}

// Request with timeout
const data = await Promise.race([fetch("/api/data"), timeout(3000)]);
```

**Use case:** Timeouts, fastest response from multiple sources.

**3. Promise.allSettled() - Wait for all, no fail:**

```jsx
// Returns all results regardless of success/failure
const results = await Promise.allSettled([
  fetchUsers(),
  fetchPosts(),
  fetchComments(),
]);

results.forEach((result) => {
  if (result.status === "fulfilled") {
    console.log("Success:", result.value);
  } else {
    console.log("Failed:", result.reason);
  }
});

// Example output:
// [
//   { status: 'fulfilled', value: [...users] },
//   { status: 'rejected', reason: Error },
//   { status: 'fulfilled', value: [...comments] }
// ]
```

**Use case:** When you want results from all operations, even if some fail.

**4. Promise.any() - First to succeed:**

```jsx
// Returns first promise to fulfill (ignores rejections)
const first = await Promise.any([
  fetch("https://api1.com/data"),
  fetch("https://api2.com/data"),
  fetch("https://api3.com/data"),
]);

// Fails only if all promises reject
Promise.any([promise1, promise2, promise3])
  .then((result) => console.log("First success:", result))
  .catch((err) => console.log("All failed"));
```

**Use case:** Fallback APIs, first successful response.

**Comparison:**

| Method       | Resolves When  | Rejects When  |
| ------------ | -------------- | ------------- |
| all()        | All succeed    | Any rejects   |
| race()       | First settles  | First rejects |
| allSettled() | All settle     | Never         |
| any()        | First succeeds | All reject    |

---

## Express.js Framework

### 15. What is Express.js and why use it?

**Answer:**
Express is a minimal and flexible Node.js web application framework.

**Benefits:**

- Simplifies routing
- Middleware support
- Template engine integration
- Robust routing
- Large ecosystem
- Easy to learn

**Basic Server:**

```jsx
const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  res.status(201).json(user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### 16. What is Middleware in Express?

**Answer:**
Functions that have access to request, response, and next middleware function.

**Types of Middleware:**

**1. Application-level:**

```jsx
// Executed for all routes
app.use((req, res, next) => {
  console.log(`${req.method}${req.url}`);
  next(); // Pass control to next middleware
});

// Executed for specific routes
app.use("/api", (req, res, next) => {
  console.log("API request");
  next();
});
```

**2. Router-level:**

```jsx
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router middleware");
  next();
});

router.get("/users", (req, res) => {
  res.json(users);
});

app.use("/api", router);
```

**3. Error-handling (4 parameters):**

```jsx
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

**4. Built-in:**

```jsx
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
app.use(express.static("public")); // Serve static files
```

**5. Third-party:**

```jsx
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(cors());
app.use(helmet());
app.use(morgan("dev")); // Logging
```

**Custom Middleware:**

```jsx
// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Usage
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});
```

**Middleware Order Matters:**

```jsx
// Correct order
app.use(express.json()); // Parse body first
app.use(authenticate); // Then authenticate
app.use("/api", routes); // Then routes
app.use(errorHandler); // Error handler last
```

### 17. Explain Request and Response objects

**Answer:**

**Request Object (req):**

```jsx
app.post("/api/users/:id", (req, res) => {
  // URL parameters
  const userId = req.params.id;

  // Query string: /api/users?page=1&limit=10
  const page = req.query.page;
  const limit = req.query.limit;

  // Request body (POST/PUT)
  const userData = req.body;

  // Headers
  const contentType = req.get("Content-Type");
  const auth = req.headers.authorization;

  // HTTP method
  const method = req.method; // GET, POST, etc.

  // Full URL
  const url = req.url;
  const originalUrl = req.originalUrl;
  const path = req.path;

  // IP address
  const ip = req.ip;

  // Cookies
  const cookies = req.cookies;

  // Check content type
  const isJson = req.is("json");
});
```

**Response Object (res):**

```jsx
app.get("/api/users", (req, res) => {
  // Send JSON
  res.json({ users: [] });

  // Send text
  res.send("Hello");

  // Status code
  res.status(404).json({ error: "Not found" });
  res.sendStatus(200); // Equivalent to res.status(200).send('OK')

  // Set headers
  res.set("Content-Type", "application/json");
  res.setHeader("X-Custom-Header", "value");

  // Redirect
  res.redirect("/login");
  res.redirect(301, "/new-url"); // Permanent redirect

  // Send file
  res.sendFile("/path/to/file.pdf");
  res.download("/path/to/file.pdf", "filename.pdf");

  // Render template
  res.render("index", { title: "Home" });

  // Set cookies
  res.cookie("token", "xyz123", { httpOnly: true, maxAge: 900000 });
  res.clearCookie("token");

  // Chain methods
  res.status(201).set("X-Custom", "value").json({ success: true });
});
```

### 18. How to handle errors in Express?

**Answer:**

**1. Synchronous Error Handling:**

```jsx
app.get("/users/:id", (req, res, next) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error; // Express catches this
  }

  res.json(user);
});
```

**2. Asynchronous Error Handling:**

```jsx
// Wrong ❌ - Error not caught
app.get("/users", async (req, res) => {
  const users = await User.find(); // If this throws, app crashes
  res.json(users);
});

// Correct ✅ - Use try-catch
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// Better ✅ - Wrapper function
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

**3. Error Handling Middleware (must have 4 parameters):**

```jsx
// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

// Advanced error handler
app.use((err, req, res, next) => {
  // Log error
  logger.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      error: "Duplicate key error",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});
```

**4. Custom Error Classes:**

```jsx
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

// Usage
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError("User not found");
    res.json(user);
  } catch (err) {
    next(err);
  }
});
```

**5. 404 Handler:**

```jsx
// Must be after all other routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});
```

### 19. How to validate request data in Express?

**Answer:**

**1. Using express-validator:**

```jsx
const { body, param, query, validationResult } = require("express-validator");

// Validation middleware
app.post(
  "/users",
  [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("age")
      .optional()
      .isInt({ min: 18 })
      .withMessage("Must be 18 or older"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validation passed
    const user = req.body;
    res.json(user);
  },
);

// Reusable validation chains
const validateUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

app.post("/users", validateUser, createUser);
```

**2. Using Joi:**

```jsx
const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(18).optional(),
});

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  req.body = value; // Use validated data
  next();
};

app.post("/users", validate(userSchema), (req, res) => {
  const user = req.body;
  res.json(user);
});
```

**3. Custom Validation:**

```jsx
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  next();
};

app.post("/users", validateEmail, (req, res) => {
  // Email is valid
});
```

### 20. What is CORS and how to handle it in Express?

**Answer:**
Cross-Origin Resource Sharing - security feature restricting cross-origin HTTP requests.

**Problem:**

```jsx
// Frontend at http://localhost:3000
fetch("http://localhost:5000/api/users")
  .then((res) => res.json())
  .catch((err) => console.error(err));
// Error: CORS policy blocked
```

**Solution 1: Simple CORS (allow all):**

```jsx
const cors = require("cors");
app.use(cors()); // Allow all origins
```

**Solution 2: Specific Origins:**

```jsx
const corsOptions = {
  origin: "http://localhost:3000", // Single origin
  // Or multiple origins
  origin: ["http://localhost:3000", "https://example.com"],
  // Or function
  origin: (origin, callback) => {
    const whitelist = ["http://localhost:3000", "https://example.com"];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

**Solution 3: Manual CORS:**

```jsx
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
```

**Solution 4: Route-specific CORS:**

```jsx
// Enable CORS for specific route
app.get("/api/public", cors(), (req, res) => {
  res.json({ data: "public" });
});

// Different CORS settings for different routes
app.get(
  "/api/admin",
  cors({ origin: "https://admin.example.com" }),
  (req, res) => {
    res.json({ data: "admin" });
  },
);
```

---

## MongoDB & Mongoose

### 21. What is MongoDB and why use it with Node.js?

**Answer:**
MongoDB is a NoSQL document database.

**Why MongoDB with Node.js:**

- Both use JavaScript/JSON
- Flexible schema
- Horizontal scaling
- Fast development
- Large community

**Comparison:**

| SQL             | MongoDB               |
| --------------- | --------------------- |
| Tables          | Collections           |
| Rows            | Documents             |
| Columns         | Fields                |
| Joins           | Embedded docs/$lookup |
| Schema required | Schema optional       |

### 22. How to connect MongoDB with Node.js?

**Answer:**

**Using Mongoose:**

```jsx
const mongoose = require("mongoose");

// Connection
mongoose
  .connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

// With environment variable
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
mongoose.connect(MONGO_URI);

// Connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
```

**Using Native MongoDB Driver:**

```jsx
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("mydb");
    const collection = db.collection("users");

    // Operations
    await collection.insertOne({ name: "John" });
    const users = await collection.find().toArray();
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
```

### 23. What is Mongoose Schema and Model?

**Answer:**

**Schema - Structure Definition:**

```jsx
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // Basic types
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name too short"],
      maxlength: [50, "Name too long"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: "Invalid email format",
      },
    },

    age: {
      type: Number,
      min: [18, "Must be 18+"],
      max: 120,
      default: 18,
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    // Reference to another model
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    // Embedded document
    address: {
      street: String,
      city: String,
      zipCode: Number,
    },

    // Array
    hobbies: [String],

    // Mixed type
    metadata: Schema.Types.Mixed,

    // Date
    createdAt: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false, // Removes __v
  },
);

// Virtual (not stored in DB)
userSchema.virtual("fullName").get(function () {
  return `${this.firstName}${this.lastName}`;
});

// Instance method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Middleware (hooks)
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.post("save", function (doc) {
  console.log("User saved:", doc._id);
});

// Create Model
const User = mongoose.model("User", userSchema);

module.exports = User;
```

**Using the Model:**

```jsx
// Create
const user = new User({
  name: "John Doe",
  email: "john@example.com",
  age: 25,
});
await user.save();

// Or
const user = await User.create({
  name: "John Doe",
  email: "john@example.com",
});

// Read
const users = await User.find(); // All users
const user = await User.findById(id);
const user = await User.findOne({ email: "john@example.com" });

// Update
await User.findByIdAndUpdate(id, { age: 26 }, { new: true });
await User.updateOne({ _id: id }, { age: 26 });
await User.updateMany({ role: "user" }, { isActive: true });

// Delete
await User.findByIdAndDelete(id);
await User.deleteOne({ _id: id });
await User.deleteMany({ isActive: false });
```

### 24. Explain Mongoose queries and population

**Answer:**

**Basic Queries:**

```jsx
// Find with conditions
const users = await User.find({ age: { $gte: 18 } });

// Select specific fields
const users = await User.find().select("name email -_id");

// Sort
const users = await User.find().sort({ createdAt: -1 }); // Descending
const users = await User.find().sort("name"); // Ascending

// Limit and skip (pagination)
const users = await User.find().limit(10).skip(20); // Skip first 20

// Count
const count = await User.countDocuments({ isActive: true });

// Exists
const exists = await User.exists({ email: "john@example.com" });

// Query operators
const users = await User.find({
  age: { $gte: 18, $lte: 65 },
  role: { $in: ["user", "admin"] },
  name: { $regex: /john/i },
  $or: [{ isActive: true }, { role: "admin" }],
});
```

**Population (Joins):**

```jsx
// Schema with reference
const postSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
    },
  ],
});

// Populate single reference
const post = await Post.findById(id).populate("author");
// post.author is now full user object

// Populate multiple references
const post = await Post.findById(id)
  .populate("author")
  .populate("comments.user");

// Selective populate
const post = await Post.findById(id).populate("author", "name email"); // Only name and email

// Nested populate
const post = await Post.findById(id).populate({
  path: "comments",
  populate: {
    path: "user",
    select: "name",
  },
});

// Conditional populate
const post = await Post.findById(id).populate({
  path: "author",
  match: { isActive: true },
  select: "name email",
});
```

**Query Building:**

```jsx
// Chaining
const users = await User.find({ age: { $gte: 18 } })
  .where("role")
  .equals("user")
  .where("isActive")
  .equals(true)
  .select("name email")
  .sort("-createdAt")
  .limit(10)
  .exec();

// Query object
const query = User.find();
if (filters.age) query.where("age").gte(filters.age);
if (filters.role) query.where("role").equals(filters.role);
const users = await query.exec();
```

### 25. How to handle validation in Mongoose?

**Answer:**

**Built-in Validators:**

```jsx
const userSchema = new Schema({
  // Required
  name: {
    type: String,
    required: true,
  },

  // Custom message
  email: {
    type: String,
    required: [true, "Email is required"],
  },

  // Min/Max
  age: {
    type: Number,
    min: [18, "Must be 18 or older"],
    max: 120,
  },

  // Min/Max length
  password: {
    type: String,
    minlength: 6,
    maxlength: 128,
  },

  // Enum
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not supported",
    },
  },

  // Match (regex)
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, "Invalid phone number"],
  },

  // Custom validator
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  // Async validator
  username: {
    type: String,
    validate: {
      validator: async function (v) {
        const count = await mongoose.model("User").countDocuments({
          username: v,
          _id: { $ne: this._id },
        });
        return count === 0;
      },
      message: "Username already taken",
    },
  },
});
```

**Handling Validation Errors:**

```jsx
try {
  const user = new User({ name: "Jo", age: 15 }); // Invalid
  await user.save();
} catch (err) {
  if (err.name === "ValidationError") {
    // Get all errors
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    console.log(errors);
    // [
    //   { field: 'name', message: 'Name too short' },
    //   { field: 'age', message: 'Must be 18 or older' }
    // ]
  }
}
```

**Manual Validation:**

```jsx
// Validate before saving
const user = new User({ name: "John" });
const error = user.validateSync(); // Synchronous
if (error) {
  console.log(error);
}

// Async validation
try {
  await user.validate();
} catch (err) {
  console.error(err);
}
```

---

## Authentication & Security

### 26. How to implement JWT authentication?

**Answer:**

**Setup:**

```bash
npm install jsonwebtoken bcryptjs
```

**User Model:**

```jsx
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
```

**Register:**

```jsx
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create user (password hashed by pre-save hook)
    const user = await User.create({ email, password });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Login:**

```jsx
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Authentication Middleware:**

```jsx
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Protected route
app.get("/api/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

**Refresh Token:**

```jsx
// Generate both access and refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "15m" }, // Short-lived
  );

  const refreshToken = jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }, // Long-lived
  );

  return { accessToken, refreshToken };
};

// Refresh endpoint
app.post("/api/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const tokens = generateTokens(decoded.userId);

    res.json(tokens);
  } catch (err) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
});
```

### 27. What security best practices should you follow in Node.js?

**Answer:**

**1. Use Helmet.js (Security Headers):**

```jsx
const helmet = require("helmet");
app.use(helmet());

// Configure specific headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
  }),
);
```

**2. Rate Limiting:**

```jsx
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests",
});

app.use("/api/", limiter);

// Stricter for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

app.use("/api/login", authLimiter);
```

**3. Input Validation & Sanitization:**

```jsx
const { body, validationResult } = require("express-validator");
const mongoSanitize = require("express-mongo-sanitize");

// Prevent NoSQL injection
app.use(mongoSanitize());

// Validate and sanitize inputs
app.post(
  "/users",
  body("email").isEmail().normalizeEmail(),
  body("name").trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process...
  },
);
```

**4. Prevent XSS:**

```jsx
const xss = require("xss-clean");
app.use(xss());

// Or manual sanitization
const sanitize = (str) => {
  return str.replace(/[<>]/g, "");
};
```

**5. SQL Injection Prevention:**

```jsx
// Use parameterized queries
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);

// OR use ORM (Mongoose, Sequelize)
const user = await User.findById(userId);
```

**6. Environment Variables:**

```jsx
require("dotenv").config();

// Never hardcode secrets
const JWT_SECRET = process.env.JWT_SECRET;
const DB_URI = process.env.MONGODB_URI;

// Validate required env variables
const requiredEnvVars = ["JWT_SECRET", "MONGODB_URI"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Missing${varName} environment variable`);
    process.exit(1);
  }
});
```

**7. Secure Cookies:**

```jsx
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // HTTPS only
      httpOnly: true, // No client-side access
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "strict", // CSRF protection
    },
  }),
);

// Setting cookies
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

**8. HTTPS in Production:**

```jsx
// Redirect HTTP to HTTPS
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}
```

**9. Dependency Security:**

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update dependencies
npm update

# Use tools
npm install -g snyk
snyk test
```

**10. Error Handling:**

```jsx
// Don't expose stack traces in production
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});
```

---

## RESTful APIs

### 28. What is REST? Explain REST principles.

**Answer:**
REST (Representational State Transfer) is an architectural style for designing networked applications.

**REST Principles:**

**1. Client-Server Separation:**

- Client and server are independent
- Server doesn’t store client state

**2. Stateless:**

- Each request contains all information needed
- No session state on server

**3. Cacheable:**

- Responses should indicate if cacheable

**4. Uniform Interface:**

- Consistent naming and structure

**5. Layered System:**

- Client can’t tell if connected directly to server

**6. Code on Demand (Optional):**

- Server can send executable code

**HTTP Methods:**

```jsx
// GET - Read/Retrieve
app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getUserById);

// POST - Create
app.post("/api/users", createUser);

// PUT - Update/Replace entire resource
app.put("/api/users/:id", updateUser);

// PATCH - Partial update
app.patch("/api/users/:id", partialUpdateUser);

// DELETE - Remove
app.delete("/api/users/:id", deleteUser);
```

**Status Codes:**

```jsx
// 2xx Success
200; // OK - Success
201; // Created - Resource created
204; // No Content - Deleted successfully

// 3xx Redirection
301; // Moved Permanently
304; // Not Modified - Use cached version

// 4xx Client Error
400; // Bad Request - Invalid input
401; // Unauthorized - Not authenticated
403; // Forbidden - Authenticated but no permission
404; // Not Found
409; // Conflict - Duplicate resource
422; // Unprocessable Entity - Validation failed

// 5xx Server Error
500; // Internal Server Error
503; // Service Unavailable
```

**REST API Best Practices:**

```jsx
// ✅ Good
GET    /api/users          // Get all users
GET    /api/users/123      // Get specific user
POST   /api/users          // Create user
PUT    /api/users/123      // Update user
DELETE /api/users/123      // Delete user

// Nested resources
GET    /api/users/123/posts     // Get user's posts
POST   /api/users/123/posts     // Create post for user

// Query parameters for filtering/sorting
GET    /api/users?role=admin&sort=name&page=2&limit=10

// ❌ Bad
GET    /api/getAllUsers
POST   /api/createUser
GET    /api/user/delete/123
```

### 29. How to structure a RESTful API in Express?

**Answer:**

**Project Structure:**

```
src/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   └── Post.js
├── controllers/
│   ├── userController.js
│   └── postController.js
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
├── middleware/
│   ├── auth.js
│   ├── validate.js
│   └── errorHandler.js
├── utils/
│   └── helpers.js
└── app.js
```

**Model (User.js):**

```jsx
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
```

**Controller (userController.js):**

```jsx
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

**Routes (userRoutes.js):**

```jsx
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");
const { validateUser } = require("../middleware/validate");

// Public routes
router.post("/register", validateUser, userController.createUser);

// Protected routes
router.use(authenticate);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
```

**Main App (app.js):**

```jsx
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
```

### 30. How to implement pagination, filtering, and sorting?

**Answer:**

```jsx
// GET /api/users?page=2&limit=10&sort=-createdAt&role=admin&search=john

exports.getAllUsers = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    // Sorting
    const sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(",");
      sortFields.forEach((field) => {
        if (field.startsWith("-")) {
          sort[field.substring(1)] = -1; // Descending
        } else {
          sort[field] = 1; // Ascending
        }
      });
    } else {
      sort.createdAt = -1; // Default sort
    }

    // Select fields
    const select = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : "-password"; // Exclude password by default

    // Execute query
    const users = await User.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const total = await User.countDocuments(filter);

    // Response
    res.json({
      success: true,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

**Reusable API Features Class:**

```jsx
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// Usage
exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await features.query;

    res.json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

## Error Handling

### 31. What are best practices for error handling in Express?

**Answer:**

**1. Centralized Error Handler:**

```jsx
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Development error response
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // Production error response
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or unknown error: don't leak details
  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

module.exports = { AppError, errorHandler };
```

**2. Async Error Wrapper:**

```jsx
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),
);
```

**3. Specific Error Handlers:**

```jsx
// Handle specific MongoDB errors
const handleCastErrorDB = (err) => {
  const message = `Invalid${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value:${value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data.${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Token expired. Please log in again", 401);

// Enhanced error handler
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // MongoDB errors
  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") error = handleValidationErrorDB(err);

  // JWT errors
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Internal server error",
  });
};
```

**4. Unhandled Rejections & Exceptions:**

```jsx
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
```

**5. HTTP Status Codes Reference:**

```jsx
// 2xx Success
200; // OK
201; // Created
204; // No Content

// 4xx Client Errors
400; // Bad Request - Invalid input
401; // Unauthorized - Not authenticated
403; // Forbidden - Authenticated but no access
404; // Not Found
409; // Conflict - Duplicate resource
422; // Unprocessable Entity - Validation failed
429; // Too Many Requests - Rate limit

// 5xx Server Errors
500; // Internal Server Error
503; // Service Unavailable
```

### 32. How to log errors effectively?

**Answer:**

**Using Winston:**

```jsx
const winston = require("winston");

// Create logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

// If not production, log to console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

// Usage
logger.info("Server started");
logger.error("Error occurred", { error: err.message });
logger.warn("Warning message");
logger.debug("Debug info");

// HTTP request logging middleware
const httpLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
};

app.use(httpLogger);
```

**Using Morgan:**

```jsx
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Create write stream
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

// Setup morgan
app.use(morgan("combined", { stream: accessLogStream }));

// Custom format
morgan.format(
  "custom",
  ":method :url :status :response-time ms - :res[content-length]",
);
app.use(morgan("custom"));

// Conditional logging
app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400, // Only log errors
  }),
);
```

---

## Testing

### 33. How to test Node.js applications?

**Answer:**

**Testing Frameworks:**

- **Test Runners**: Jest, Mocha
- **Assertion**: Chai, expect (Jest)
- **Mocking**: Sinon, jest.mock()
- **API Testing**: Supertest
- **Coverage**: Istanbul, nyc

**Setup with Jest:**

```bash
npm install --save-dev jest supertest
```

**package.json:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"]
  }
}
```

### 34. How to write unit tests?

**Answer:**

**Testing Utilities:**

```jsx
// utils/calculateTotal.js
function calculateTotal(items) {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  return items.reduce((sum, item) => sum + item.price, 0);
}

module.exports = calculateTotal;
```

**Test File:**

```jsx
// utils/calculateTotal.test.js
const calculateTotal = require("./calculateTotal");

describe("calculateTotal", () => {
  test("should calculate total of items", () => {
    const items = [
      { name: "Item 1", price: 10 },
      { name: "Item 2", price: 20 },
      { name: "Item 3", price: 30 },
    ];

    expect(calculateTotal(items)).toBe(60);
  });

  test("should return 0 for empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });

  test("should throw error for non-array input", () => {
    expect(() => calculateTotal("invalid")).toThrow("Items must be an array");
  });
});
```

**Testing Async Functions:**

```jsx
// services/userService.js
const User = require("../models/User");

async function createUser(userData) {
  const user = await User.create(userData);
  return user;
}

module.exports = { createUser };
```

**Test with Mocking:**

```jsx
// services/userService.test.js
const { createUser } = require("./userService");
const User = require("../models/User");

// Mock the User model
jest.mock("../models/User");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create user", async () => {
    const userData = { name: "John", email: "john@example.com" };
    const mockUser = { _id: "123", ...userData };

    // Mock implementation
    User.create.mockResolvedValue(mockUser);

    const result = await createUser(userData);

    expect(User.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mockUser);
  });

  test("should handle errors", async () => {
    User.create.mockRejectedValue(new Error("Database error"));

    await expect(createUser({})).rejects.toThrow("Database error");
  });
});
```

### 35. How to write integration tests for APIs?

**Answer:**

**Using Supertest:**

```jsx
// app.test.js
const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");
const User = require("./models/User");

// Setup and teardown
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User API", () => {
  describe("POST /api/users", () => {
    test("should create a new user", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201)
        .expect("Content-Type", /json/);

      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty("password");
    });

    test("should return 400 for invalid email", async () => {
      const userData = {
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });

    test("should return 409 for duplicate email", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      await User.create(userData);

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain("already exists");
    });
  });

  describe("GET /api/users", () => {
    test("should return all users", async () => {
      await User.create([
        { name: "User 1", email: "user1@example.com", password: "pass" },
        { name: "User 2", email: "user2@example.com", password: "pass" },
      ]);

      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toHaveLength(2);
    });
  });

  describe("GET /api/users/:id", () => {
    test("should return user by id", async () => {
      const user = await User.create({
        name: "John",
        email: "john@example.com",
        password: "pass",
      });

      const response = await request(app)
        .get(`/api/users/${user._id}`)
        .expect(200);

      expect(response.body.name).toBe(user.name);
    });

    test("should return 404 for non-existent user", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      await request(app).get(`/api/users/${fakeId}`).expect(404);
    });
  });

  describe("Authentication", () => {
    test("should login with valid credentials", async () => {
      const userData = {
        email: "john@example.com",
        password: "password123",
      };

      await request(app)
        .post("/api/register")
        .send({ name: "John", ...userData });

      const response = await request(app)
        .post("/api/login")
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
    });

    test("should protect routes with authentication", async () => {
      await request(app).get("/api/protected").expect(401);
    });

    test("should access protected route with valid token", async () => {
      const user = await User.create({
        name: "John",
        email: "john@example.com",
        password: "password123",
      });

      const loginResponse = await request(app)
        .post("/api/login")
        .send({ email: "john@example.com", password: "password123" });

      const token = loginResponse.body.token;

      const response = await request(app)
        .get("/api/protected")
        .set("Authorization", `Bearer${token}`)
        .expect(200);

      expect(response.body).toHaveProperty("user");
    });
  });
});
```

**Test Coverage:**

```bash
npm test -- --coverage

# Output:
# File      | % Stmts | % Branch | % Funcs | % Lines |
# ----------|---------|----------|---------|---------|
# All files |   85.71 |    66.67 |     100 |   85.71 |
```

---

## Performance & Scalability

### 36. How to optimize Node.js application performance?

**Answer:**

**1. Use Clustering:**

```jsx
const cluster = require("cluster");
const os = require("os");
const express = require("express");

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  console.log(`Master${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker${worker.process.pid} died`);
    cluster.fork(); // Replace dead worker
  });
} else {
  const app = express();

  app.get("/", (req, res) => {
    res.send(`Handled by process${process.pid}`);
  });

  app.listen(3000, () => {
    console.log(`Worker${process.pid} started`);
  });
}
```

**2. Caching with Redis:**

```jsx
const redis = require("redis");
const client = redis.createClient();

// Cache middleware
const cache = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await client.get(key);

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // Store original res.json
      res.originalJson = res.json;

      // Override res.json
      res.json = function (data) {
        // Cache the response
        client.setEx(key, duration, JSON.stringify(data));
        // Send response
        res.originalJson(data);
      };

      next();
    } catch (err) {
      next();
    }
  };
};

// Usage
app.get("/api/users", cache(300), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Clear cache
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);

  // Invalidate cache
  await client.del("cache:/api/users");

  res.status(201).json(user);
});
```

**3. Database Optimization:**

```jsx
// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ name: 1, createdAt: -1 });

// Lean queries (returns plain objects, faster)
const users = await User.find().lean();

// Select only needed fields
const users = await User.find().select("name email");

// Limit results
const users = await User.find().limit(100);

// Use aggregation for complex queries
const stats = await User.aggregate([
  { $match: { isActive: true } },
  { $group: { _id: "$role", count: { $sum: 1 } } },
]);

// Connection pooling
mongoose.connect(MONGO_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
});
```

**4. Compression:**

```jsx
const compression = require("compression");

// Compress all responses
app.use(compression());

// Conditional compression
app.use(
  compression({
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);
```

**5. Async Operations:**

```jsx
// Bad - Sequential
const user = await User.findById(userId);
const posts = await Post.find({ author: userId });
const comments = await Comment.find({ author: userId });

// Good - Parallel
const [user, posts, comments] = await Promise.all([
  User.findById(userId),
  Post.find({ author: userId }),
  Comment.find({ author: userId }),
]);
```

**6. Optimize Response Size:**

```jsx
// Pagination
app.get("/api/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const users = await User.find().select("name email").limit(limit).skip(skip);

  res.json(users);
});

// Field filtering
app.get("/api/users", async (req, res) => {
  const fields = req.query.fields?.split(",").join(" ");
  const users = await User.find().select(fields || "name email");
  res.json(users);
});
```

**7. Use Streams for Large Data:**

```jsx
app.get("/api/export", (req, res) => {
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=users.csv");

  const stream = User.find().cursor();

  stream.on("data", (doc) => {
    res.write(`${doc.name},${doc.email}\n`);
  });

  stream.on("end", () => {
    res.end();
  });
});
```

**8. Monitor Performance:**

```jsx
// APM tools: New Relic, DataDog, AppDynamics

// Custom timing
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method}${req.url} -${duration}ms`);
  });

  next();
});
```

### 37. What is load balancing and how to implement it?

**Answer:**

**Concept:**
Load balancing distributes incoming traffic across multiple servers.

**Types:**

- **Round Robin**: Distributes requests sequentially
- **Least Connections**: Sends to server with fewest connections
- **IP Hash**: Routes based on client IP
- **Weighted**: Distributes based on server capacity

**Using Nginx:**

```
# nginx.conf
upstream backend {
    least_conn;
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Using Node.js Cluster:**

```jsx
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require("./app");
}
```

**Using PM2:**

```bash
# Start in cluster mode
pm2 start app.js -i max

# Or specific number of instances
pm2 start app.js -i 4

# Configuration file
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};

pm2 start ecosystem.config.js
```

### 38. How to handle file uploads efficiently?

**Answer:**

**Using Multer:**

```jsx
const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Single file upload
app.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

// Multiple files
app.post("/upload-multiple", upload.array("photos", 5), (req, res) => {
  res.json({
    message: `${req.files.length} files uploaded`,
    files: req.files,
  });
});

// Multiple fields
app.post(
  "/upload-fields",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  (req, res) => {
    res.json({
      avatar: req.files.avatar,
      gallery: req.files.gallery,
    });
  },
);
```

**Upload to Cloud (AWS S3):**

```jsx
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "my-bucket",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: req.file.location,
  });
});
```

**Stream Large Files:**

```jsx
const fs = require("fs");
const stream = require("stream");

app.post("/upload-stream", (req, res) => {
  const writeStream = fs.createWriteStream("uploads/large-file.bin");

  req.pipe(writeStream);

  writeStream.on("finish", () => {
    res.json({ message: "File uploaded" });
  });

  writeStream.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
});
```

---

## System Design

### 39. How to design a RESTful API with proper architecture?

**Answer:**

**Project Structure:**

```
src/
├── config/
│   ├── database.js
│   ├── redis.js
│   └── env.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── controllers/
│   ├── userController.js
│   ├── postController.js
│   └── authController.js
├── services/
│   ├── userService.js
│   ├── emailService.js
│   └── uploadService.js
├── routes/
│   ├── index.js
│   ├── userRoutes.js
│   └── postRoutes.js
├── middleware/
│   ├── auth.js
│   ├── validate.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── utils/
│   ├── helpers.js
│   ├── constants.js
│   └── logger.js
├── validators/
│   ├── userValidator.js
│   └── postValidator.js
└── app.js
```

**Layered Architecture:**

**1. Routes Layer:**

```jsx
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/auth");
const { validateUser } = require("../validators/userValidator");

router.post("/", validateUser, userController.createUser);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, validateUser, userController.updateUser);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.deleteUser,
);

module.exports = router;
```

**2. Controller Layer:**

```jsx
// controllers/userController.js
const userService = require("../services/userService");
const { AppError } = require("../utils/errors");

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
```

**3. Service Layer:**

```jsx
// services/userService.js
const User = require("../models/User");
const emailService = require("./emailService");
const { AppError } = require("../utils/errors");

exports.createUser = async (userData) => {
  // Check if user exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Create user
  const user = await User.create(userData);

  // Send welcome email
  await emailService.sendWelcomeEmail(user.email, user.name);

  return user;
};

exports.getAllUsers = async (query) => {
  const { page = 1, limit = 10, sort = "-createdAt", ...filters } = query;

  const users = await User.find(filters)
    .select("-password")
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  return users;
};
```

**4. Model Layer:**

```jsx
// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
```

### 40. Explain microservices architecture

**Answer:**

**Monolithic vs Microservices:**

**Monolithic:**

```
┌─────────────────────────────┐
│      Single Application     │
│  ┌────────────────────────┐ │
│  │  User Service          │ │
│  ├────────────────────────┤ │
│  │  Order Service         │ │
│  ├────────────────────────┤ │
│  │  Payment Service       │ │
│  └────────────────────────┘ │
│      Single Database        │
└─────────────────────────────┘
```

**Microservices:**

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  User    │  │  Order   │  │ Payment  │
│ Service  │  │ Service  │  │ Service  │
├──────────┤  ├──────────┤  ├──────────┤
│   DB     │  │   DB     │  │   DB     │
└──────────┘  └──────────┘  └──────────┘
      │            │             │
      └────────────┴─────────────┘
           API Gateway / Message Queue
```

**Implementation Example:**

**User Service:**

```jsx
// user-service/app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost/user-db");

app.use(express.json());

// User routes
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  // Publish event
  publishEvent("user.created", { userId: user._id, email: user.email });

  res.status(201).json(user);
});

app.listen(3001);
```

**Order Service:**

```jsx
// order-service/app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost/order-db");

// Listen to user events
subscribeToEvent("user.created", async (data) => {
  console.log("New user created:", data.userId);
  // Initialize user in order service
});

app.post("/orders", async (req, res) => {
  // Verify user exists (call user service)
  const userResponse = await fetch(
    `http://user-service:3001/users/${req.body.userId}`,
  );

  if (!userResponse.ok) {
    return res.status(404).json({ error: "User not found" });
  }

  const order = await Order.create(req.body);
  res.status(201).json(order);
});

app.listen(3002);
```

**API Gateway:**

```jsx
// gateway/app.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Route to services
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://user-service:3001",
    changeOrigin: true,
  }),
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://order-service:3002",
    changeOrigin: true,
  }),
);

app.listen(3000);
```

**Benefits:**

- Independent deployment
- Technology diversity
- Scalability
- Fault isolation

**Challenges:**

- Distributed system complexity
- Data consistency
- Network latency
- Testing complexity

---

## DevOps & Deployment

### 41. How to use environment variables?

**Answer:**

**Using dotenv:**

```bash
npm install dotenv
```

**.env file:**

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
REDIS_HOST=localhost
REDIS_PORT=6379
AWS_ACCESS_KEY=your-aws-key
AWS_SECRET_KEY=your-aws-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password
```

**Load in app:**

```jsx
// config/env.js
require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
```

**Validate environment variables:**

```jsx
const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "EMAIL_HOST",
  "EMAIL_USER",
  "EMAIL_PASS",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error:${envVar} is not defined`);
    process.exit(1);
  }
});
```

**Different environments:**

```bash
# Development
NODE_ENV=development npm start

# Production
NODE_ENV=production npm start
```

```jsx
if (process.env.NODE_ENV === "production") {
  // Production-specific code
  app.use(helmet());
} else {
  // Development-specific code
  app.use(morgan("dev"));
}
```

### 42. What is Docker and how to containerize Node.js app?

**Answer:**

**Dockerfile:**

```docker
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start app
CMD ["node", "server.js"]
```

**.dockerignore:**

```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
.vscode
coverage
.DS_Store
```

**docker-compose.yml:**

```yaml
version:'3.8'

services:
app:
build: .
ports:
-"5000:5000"
environment:
- NODE_ENV=production
- MONGODB_URI=mongodb://mongo:27017/mydb
- REDIS_HOST=redis
depends_on:
- mongo
- redis
volumes:
- ./:/app
- /app/node_modules
networks:
- app-network

mongo:
image: mongo:6
ports:
-"27017:27017"
volumes:
- mongo-data:/data/db
networks:
- app-network

redis:
image: redis:alpine
ports:
-"6379:6379"
networks:
- app-network

volumes:
mongo-data:

networks:
app-network:
driver: bridge
```

**Commands:**

```bash
# Build image
docker build -t my-app .

# Run container
docker run -p 5000:5000 my-app

# Using docker-compose
docker-compose up
docker-compose up -d  # Detached mode
docker-compose down
docker-compose logs -f app
```

### 43. What is PM2 and how to use it?

**Answer:**

**Installation:**

```bash
npm install -g pm2
```

**Basic Usage:**

```bash
# Start app
pm2 start app.js

# Start with name
pm2 start app.js --name my-app

# Start in cluster mode
pm2 start app.js -i max

# List processes
pm2 list

# Monitor
pm2 monit

# Logs
pm2 logs
pm2 logs my-app

# Restart
pm2 restart my-app

# Stop
pm2 stop my-app

# Delete
pm2 delete my-app

# Save process list
pm2 save

# Startup script (auto-restart on reboot)
pm2 startup
```

**ecosystem.config.js:**

```jsx
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      instance_var: "INSTANCE_ID",
    },
  ],
};
```

**Usage:**

```bash
# Development
pm2 start ecosystem.config.js

# Production
pm2 start ecosystem.config.js --env production

# Reload without downtime
pm2 reload my-app

# Update PM2
pm2 update
```

### 44. How to deploy Node.js app to cloud?

**Answer:**

**Deploy to Heroku:**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create my-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongo-uri
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Scale
heroku ps:scale web=2
```

**Procfile:**

```
web: node server.js
```

**Deploy to AWS EC2:**

```bash
# SSH into EC2
ssh -i key.pem ec2-user@your-ip

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repo
git clone your-repo
cd your-repo
npm install

# Install PM2
sudo npm install -g pm2

# Start app
pm2 start server.js
pm2 startup
pm2 save

# Setup Nginx
sudo yum install nginx
sudo systemctl start nginx
```

**Nginx Configuration:**

```
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Deploy to Vercel:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**vercel.json:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

---

## Advanced Topics

### 45. What are WebSockets and how to implement them?

**Answer:**

**Using Socket.io:**

```jsx
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Connection event
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  // Send message
  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", {
      userId: socket.id,
      message: data.message,
      timestamp: new Date(),
    });
  });

  // Typing indicator
  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("user-typing", socket.id);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000);
```

**Client-side:**

```jsx
const socket = io("http://localhost:5000");

// Connect
socket.on("connect", () => {
  console.log("Connected to server");
});

// Join room
socket.emit("join-room", "room-123");

// Send message
socket.emit("send-message", {
  roomId: "room-123",
  message: "Hello!",
});

// Receive message
socket.on("receive-message", (data) => {
  console.log(data.message);
});

// Disconnect
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
```

**Real-time Chat Application:**

```jsx
// Server
const users = {};

io.on("connection", (socket) => {
  socket.on("user-login", (username) => {
    users[socket.id] = username;
    io.emit("user-list", Object.values(users));
  });

  socket.on("send-message", (message) => {
    io.emit("new-message", {
      user: users[socket.id],
      message: message,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("user-list", Object.values(users));
  });
});
```

### 46. How to implement real-time notifications?

**Answer:**

**Server-Sent Events (SSE):**

```jsx
// Server
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial message
  res.write("data: Connected\n\n");

  // Send notification every 5 seconds
  const intervalId = setInterval(() => {
    res.write(
      `data:${JSON.stringify({
        message: "New notification",
        timestamp: new Date(),
      })}\n\n`,
    );
  }, 5000);

  // Cleanup on close
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Client
const eventSource = new EventSource("/events");

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Notification:", data);
};
```

**Push Notifications with Socket.io:**

```jsx
// Notification service
class NotificationService {
  constructor(io) {
    this.io = io;
  }

  async sendToUser(userId, notification) {
    // Save to database
    await Notification.create({
      userId,
      message: notification.message,
      type: notification.type,
    });

    // Send via socket
    this.io.to(userId).emit("notification", notification);
  }

  async sendToMultiple(userIds, notification) {
    await Promise.all(
      userIds.map((userId) => this.sendToUser(userId, notification)),
    );
  }

  async broadcast(notification) {
    await Notification.create({
      message: notification.message,
      type: notification.type,
      broadcast: true,
    });

    this.io.emit("notification", notification);
  }
}

// Usage
const notificationService = new NotificationService(io);

app.post("/api/posts", authenticate, async (req, res) => {
  const post = await Post.create({
    ...req.body,
    author: req.user._id,
  });

  // Notify followers
  const followers = await User.find({ following: req.user._id });
  const followerIds = followers.map((f) => f._id.toString());

  await notificationService.sendToMultiple(followerIds, {
    message: `${req.user.name} created a new post`,
    type: "new-post",
    postId: post._id,
  });

  res.status(201).json(post);
});
```

### 47. How to implement background jobs?

**Answer:**

**Using Bull (Redis-based queue):**

```jsx
const Queue = require("bull");
const nodemailer = require("nodemailer");

// Create queue
const emailQueue = new Queue("email", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

// Process jobs
emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  return { sent: true };
});

// Add job to queue
app.post("/api/register", async (req, res) => {
  const user = await User.create(req.body);

  // Add email job
  await emailQueue.add(
    {
      to: user.email,
      subject: "Welcome!",
      html: `<h1>Welcome${user.name}!</h1>`,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    },
  );

  res.status(201).json(user);
});

// Monitor queue
emailQueue.on("completed", (job, result) => {
  console.log(`Job${job.id} completed`);
});

emailQueue.on("failed", (job, err) => {
  console.error(`Job${job.id} failed:`, err);
});
```

**Scheduled Jobs with node-cron:**

```jsx
const cron = require("node-cron");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily cleanup");

  // Delete old logs
  await Log.deleteMany({
    createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });

  // Send daily report
  const stats = await generateDailyStats();
  await sendReportEmail(stats);
});

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Checking for pending tasks");
  await processPendingTasks();
});
```

### 48. How to implement rate limiting?

**Answer:**

**Using express-rate-limit:**

```jsx
const rateLimit = require("express-rate-limit");

// General limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// Strict limiter for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: "Too many login attempts",
});

app.use("/api/login", authLimiter);

// Custom key generator (per user)
const userLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },
});

app.use("/api/posts", authenticate, userLimiter);
```

**Redis-based Rate Limiting:**

```jsx
const redis = require("redis");
const client = redis.createClient();

const rateLimiter = async (req, res, next) => {
  const key = `rate-limit:${req.ip}`;
  const limit = 10;
  const window = 60; // seconds

  try {
    const current = await client.incr(key);

    if (current === 1) {
      await client.expire(key, window);
    }

    if (current > limit) {
      return res.status(429).json({
        error: "Rate limit exceeded",
      });
    }

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", limit - current);

    next();
  } catch (err) {
    next(err);
  }
};

app.use("/api/", rateLimiter);
```

### 49. How to implement pagination with cursor-based pagination?

**Answer:**

**Offset-based Pagination (traditional):**

```jsx
app.get("/api/posts", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Post.countDocuments();

  res.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
```

**Cursor-based Pagination (better for large datasets):**

```jsx
app.get("/api/posts", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const cursor = req.query.cursor; // ID of last item

  const query = cursor ? { _id: { $lt: cursor } } : {};

  const posts = await Post.find(query)
    .sort({ _id: -1 })
    .limit(limit + 1);

  const hasMore = posts.length > limit;
  const results = hasMore ? posts.slice(0, -1) : posts;

  res.json({
    posts: results,
    pagination: {
      nextCursor: hasMore ? results[results.length - 1]._id : null,
      hasMore,
    },
  });
});

// Client usage:
// First request: GET /api/posts?limit=10
// Next request: GET /api/posts?limit=10&cursor=<last-id>
```

### 50. How to implement search functionality?

**Answer:**

**Basic Text Search:**

```jsx
// Create text index
postSchema.index({ title: "text", content: "text" });

// Search
app.get("/api/search", async (req, res) => {
  const { q } = req.query;

  const results = await Post.find(
    { $text: { $search: q } },
    { score: { $meta: "textScore" } },
  ).sort({ score: { $meta: "textScore" } });

  res.json(results);
});
```

**Advanced Search with Filters:**

```jsx
app.get("/api/posts/search", async (req, res) => {
  const {
    q, // Search query
    category, // Filter by category
    author, // Filter by author
    minPrice, // Price range
    maxPrice,
    sortBy, // Sort field
    page = 1,
    limit = 10,
  } = req.query;

  // Build query
  const query = {};

  // Text search
  if (q) {
    query.$text = { $search: q };
  }

  // Filters
  if (category) {
    query.category = category;
  }

  if (author) {
    query.author = author;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  // Execute query
  const posts = await Post.find(query)
    .sort(sortBy || "-createdAt")
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("author", "name email");

  const total = await Post.countDocuments(query);

  res.json({
    posts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
```

**Using Elasticsearch:**

```jsx
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

// Index document
app.post("/api/posts", async (req, res) => {
  const post = await Post.create(req.body);

  // Index in Elasticsearch
  await client.index({
    index: "posts",
    id: post._id.toString(),
    document: {
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
    },
  });

  res.status(201).json(post);
});

// Search
app.get("/api/search", async (req, res) => {
  const { q } = req.query;

  const { hits } = await client.search({
    index: "posts",
    query: {
      multi_match: {
        query: q,
        fields: ["title^2", "content"],
        fuzziness: "AUTO",
      },
    },
  });

  const results = hits.hits.map((hit) => ({
    id: hit._id,
    score: hit._score,
    ...hit._source,
  }));

  res.json(results);
});
```

---

## Bonus Questions

### 51. What is GraphQL and how does it differ from REST?

**Answer:**

**REST:**

```
GET    /api/users/1
GET    /api/users/1/posts
GET    /api/posts/1/comments
```

**GraphQL (single endpoint):**

```graphql
query {
  user(id: 1) {
    name
    email
    posts {
      title
      comments {
        text
        author {
          name
        }
      }
    }
  }
}
```

**Implementation with Express:**

```jsx
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(title: String!, content: String!, authorId: ID!): Post
  }
`);

// Resolvers
const root = {
  user: async ({ id }) => {
    return await User.findById(id);
  },
  users: async () => {
    return await User.find();
  },
  post: async ({ id }) => {
    return await Post.findById(id).populate("author");
  },
  createUser: async ({ name, email }) => {
    return await User.create({ name, email });
  },
  createPost: async ({ title, content, authorId }) => {
    return await Post.create({ title, content, author: authorId });
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // GraphQL playground
  }),
);
```

### 52. How to handle transactions in MongoDB?

**Answer:**

```jsx
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Deduct from sender
  await Account.findByIdAndUpdate(
    senderId,
    { $inc: { balance: -amount } },
    { session },
  );

  // Add to receiver
  await Account.findByIdAndUpdate(
    receiverId,
    { $inc: { balance: amount } },
    { session },
  );

  // Create transaction record
  await Transaction.create(
    [
      {
        from: senderId,
        to: receiverId,
        amount: amount,
      },
    ],
    { session },
  );

  // Commit transaction
  await session.commitTransaction();

  res.json({ success: true });
} catch (err) {
  // Rollback on error
  await session.abortTransaction();
  res.status(500).json({ error: err.message });
} finally {
  session.endSession();
}
```

### 53. What are design patterns commonly used in Node.js?

**Answer:**

**1. Singleton Pattern:**

```jsx
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }

  connect() {
    if (!this.connection) {
      this.connection = mongoose.connect(MONGO_URI);
    }
    return this.connection;
  }
}

module.exports = new Database();
```

**2. Factory Pattern:**

```jsx
class UserFactory {
  static createUser(type, data) {
    switch (type) {
      case "admin":
        return new AdminUser(data);
      case "customer":
        return new CustomerUser(data);
      default:
        return new GuestUser(data);
    }
  }
}
```

**3. Observer Pattern (EventEmitter):**

```jsx
const EventEmitter = require("events");

class OrderEmitter extends EventEmitter {}
const orderEmitter = new OrderEmitter();

// Listeners
orderEmitter.on("order-placed", (order) => {
  console.log("Sending confirmation email");
});

orderEmitter.on("order-placed", (order) => {
  console.log("Updating inventory");
});

// Emit event
orderEmitter.emit("order-placed", order);
```

**4. Middleware Pattern:**

```jsx
const middleware = [];

const use = (fn) => {
  middleware.push(fn);
};

const execute = async (req, res) => {
  for (const fn of middleware) {
    await fn(req, res);
  }
};
```

### 54. How to implement API versioning?

**Answer:**

**URL Versioning:**

```jsx
// v1/userRoutes.js
const router = express.Router();
router.get("/users", (req, res) => {
  res.json({ version: "v1", users: [] });
});

// v2/userRoutes.js
const router = express.Router();
router.get("/users", (req, res) => {
  res.json({ version: "v2", users: [], meta: {} });
});

// app.js
app.use("/api/v1", require("./routes/v1/userRoutes"));
app.use("/api/v2", require("./routes/v2/userRoutes"));
```

**Header Versioning:**

```jsx
const versionMiddleware = (req, res, next) => {
  const version = req.headers["api-version"] || "v1";
  req.apiVersion = version;
  next();
};

app.use(versionMiddleware);

app.get("/api/users", (req, res) => {
  if (req.apiVersion === "v1") {
    // v1 response
  } else if (req.apiVersion === "v2") {
    // v2 response
  }
});
```

### 55. Common Node.js Interview Coding Challenges

**1. Reverse a string without built-in methods2. Find duplicate values in array3. Implement debounce/throttle function4. Create middleware chain5. Implement simple event emitter6. Build rate limiter7. Create simple promise implementation8. Implement async.waterfall9. Build simple router10. Create request retry logic**

---

## Summary & Interview Tips

### Key Topics to Master:

1. ✅ **Node.js Core**: Event loop, modules, streams, buffers
2. ✅ **Async Programming**: Callbacks, promises, async/await
3. ✅ **Express.js**: Middleware, routing, error handling
4. ✅ **MongoDB**: CRUD, queries, indexing, transactions
5. ✅ **Security**: JWT, bcrypt, validation, CORS, rate limiting
6. ✅ **Testing**: Jest, Supertest, unit & integration tests
7. ✅ **Performance**: Caching, clustering, optimization
8. ✅ **DevOps**: Docker, PM2, environment variables

### Preparation Strategy:

**Week 1-2: Fundamentals**

- Node.js core concepts
- Async programming patterns
- Express.js basics

**Week 3-4: Advanced Topics**

- Database operations
- Authentication & security
- Testing strategies

**Week 5-6: Practice**

- Build 2-3 projects
- Practice coding challenges
- Mock interviews

### Interview Day Tips:

1. **Explain your thought process** - Talk through your approach
2. **Ask clarifying questions** - Don’t make assumptions
3. **Consider edge cases** - Error handling, validation
4. **Optimize step by step** - Start simple, then optimize
5. **Know your resume projects** - Be ready to discuss in depth
6. **Practice whiteboard coding** - Without IDE assistance
7. **Study system design basics** - Scalability, trade-offs

### Resources:

- **Documentation**: nodejs.org, expressjs.com, mongoosejs.com
- **Books**: “Node.js Design Patterns”, “You Don’t Know Node”
- **Practice**: LeetCode, HackerRank, Codewars
- **Projects**: Build REST API, Real-time chat, E-commerce backend
- **Communities**: Reddit r/node, Stack Overflow, Dev.to

---

## Good Luck! 🚀

**Remember:**

- Understand concepts deeply, don’t just memorize
- Build projects to apply knowledge
- Practice explaining technical concepts clearly
- Be honest about what you don’t know
- Stay calm and confident

**You’ve got this!** 💪
