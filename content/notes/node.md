# Node.js Interview Notes

---

## 1. What is Node.js?

Node.js is an open-source, cross-platform **JavaScript runtime environment** built on Chrome's **V8 JavaScript engine**. It allows JavaScript to run outside the browser — on the server side.

Key characteristics:
- **Single-threaded** — one main thread handles all requests
- **Non-blocking I/O** — I/O operations don't block execution; results are handled via callbacks/promises
- **Event-driven** — uses events and callbacks to handle asynchronous operations
- **Asynchronous by default** — most APIs are async (file system, network, database)
- Uses **CommonJS** module system by default (also supports ESM)

Node.js is best suited for: I/O-heavy applications, REST APIs, real-time apps (chat, streaming), microservices. Not ideal for CPU-intensive tasks (heavy computation blocks the event loop).

---

## 2. Node.js Architecture

Node.js internally uses:
- **V8** — Google's JS engine, compiles JS to machine code
- **libuv** — C library that provides the event loop, thread pool, async I/O
- **Node.js Core APIs** — fs, http, path, crypto, etc., written in C++ and JS

**Thread Pool (libuv):** By default, libuv maintains a pool of **4 threads** for operations that can't be done asynchronously at the OS level (file I/O, DNS, crypto). Can be increased via `UV_THREADPOOL_SIZE`.

**Main thread** handles: JS execution, event loop
**Thread pool** handles: file system ops, DNS lookups, crypto, zlib

---

## 3. Event Loop

The event loop is what allows Node.js to perform non-blocking I/O despite being single-threaded. It offloads operations to the OS or thread pool and picks up the result when done.

**Phases of the event loop (in order):**

1. **timers** — executes `setTimeout` and `setInterval` callbacks whose threshold has elapsed
2. **pending callbacks** — I/O callbacks deferred from previous iteration
3. **idle, prepare** — internal use only
4. **poll** — retrieves new I/O events; executes I/O callbacks (most callbacks run here)
5. **check** — executes `setImmediate` callbacks
6. **close callbacks** — e.g., `socket.on("close", ...)`

Between each phase, Node checks for **microtasks:**
- `process.nextTick()` callbacks — run first, before any other microtask
- Promise callbacks (`.then`, `async/await`) — run after `nextTick`

**Priority order:**
`process.nextTick` → `Promise.then` → `setTimeout/setInterval` → `setImmediate` → I/O callbacks

```js
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));

// Output: nextTick → promise → setTimeout → setImmediate
// (setTimeout vs setImmediate order may vary outside I/O cycle)
```

---

## 4. process.nextTick vs setImmediate vs setTimeout

**`process.nextTick(cb)`**
- Not part of the event loop phases
- Callback runs after current operation, before the event loop continues
- Has highest priority among async callbacks
- Can starve the event loop if called recursively

**`setImmediate(cb)`**
- Runs in the **check phase** of the event loop (after I/O callbacks)
- Preferred over `setTimeout(fn, 0)` when you want to execute after I/O

**`setTimeout(cb, 0)`**
- Runs in the **timers phase**
- Minimum delay is ~1ms (not truly 0)
- Inside an I/O callback: `setImmediate` always runs before `setTimeout(fn, 0)`

---

## 5. Modules System

**CommonJS (CJS) — default in Node.js:**
```js
// Export
module.exports = { add, subtract };
exports.add = function() {};   // shorthand

// Import
const { add } = require("./math");
const fs = require("fs");      // built-in
```

**ES Modules (ESM):**
```js
// Export
export const add = () => {};
export default class App {}

// Import
import { add } from "./math.js";
import App from "./app.js";
```

To use ESM in Node: use `.mjs` extension OR set `"type": "module"` in `package.json`.

**Module caching:** Once a module is loaded, it's cached. Subsequent `require()` calls return the same instance — modules are singletons.

**Module wrapper function:** Before executing, Node wraps each module in:
```js
(function(exports, require, module, __filename, __dirname) {
  // module code
});
```
This gives each module its own scope and provides `__filename`, `__dirname`.

---

## 6. Built-in Modules

| Module | Purpose |
|---|---|
| `fs` | File system operations (read, write, delete, watch) |
| `path` | File path utilities (`join`, `resolve`, `basename`, `extname`) |
| `http` / `https` | Create HTTP/HTTPS servers and make requests |
| `os` | OS info (platform, CPU, memory, hostname) |
| `events` | EventEmitter class |
| `stream` | Readable, Writable, Duplex, Transform streams |
| `crypto` | Hashing, encryption, HMAC |
| `buffer` | Handle binary data |
| `child_process` | Spawn subprocesses (`exec`, `spawn`, `fork`) |
| `cluster` | Fork multiple Node processes to use multiple CPU cores |
| `worker_threads` | Run JS in parallel threads |
| `net` | TCP server/client |
| `url` | URL parsing and formatting |
| `util` | Utility functions (`promisify`, `inspect`, `format`) |

---

## 7. fs Module

```js
const fs = require("fs");
const fsPromises = require("fs").promises; // or require("fs/promises")

// Async (callback)
fs.readFile("file.txt", "utf8", (err, data) => {});
fs.writeFile("file.txt", "content", (err) => {});
fs.appendFile("file.txt", "more", (err) => {});
fs.unlink("file.txt", (err) => {});

// Sync (blocks event loop — avoid in production)
const data = fs.readFileSync("file.txt", "utf8");

// Promise-based
const data = await fsPromises.readFile("file.txt", "utf8");
```

`fs.watch(path, callback)` — watches for file/directory changes.
`fs.stat(path, callback)` — returns file info (size, isFile, isDirectory, etc.)

---

## 8. path Module

```js
const path = require("path");

path.join("/foo", "bar", "baz")         // "/foo/bar/baz"
path.resolve("foo", "bar")              // absolute path from cwd
path.basename("/foo/bar/file.txt")      // "file.txt"
path.basename("/foo/bar/file.txt", ".txt") // "file"
path.extname("file.txt")                // ".txt"
path.dirname("/foo/bar/file.txt")       // "/foo/bar"
path.parse("/foo/bar/file.txt")         // { root, dir, base, ext, name }

// Cross-platform path separator
path.sep    // "/" on Unix, "\\" on Windows
path.join(__dirname, "views", "index.html")
```

---

## 9. HTTP Module

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello" }));
});

server.listen(3000, () => console.log("Server running on port 3000"));
```

- `req` — `http.IncomingMessage`: `req.url`, `req.method`, `req.headers`
- `res` — `http.ServerResponse`: `res.statusCode`, `res.setHeader()`, `res.write()`, `res.end()`
- For routing and middleware, use **Express.js** on top of `http`

---

## 10. Streams

Streams are objects that let you **read or write data piece by piece** (chunks) instead of loading everything into memory at once. Ideal for large files, network data.

**Types:**
- **Readable** — data can be read from (e.g., `fs.createReadStream`, `http.IncomingMessage`)
- **Writable** — data can be written to (e.g., `fs.createWriteStream`, `http.ServerResponse`)
- **Duplex** — both readable and writable (e.g., TCP socket)
- **Transform** — duplex stream that transforms data (e.g., `zlib.createGzip()`)

```js
const readable = fs.createReadStream("big-file.txt");
const writable = fs.createWriteStream("output.txt");

readable.pipe(writable); // pipe connects readable to writable
```

**Events on Readable:** `data`, `end`, `error`, `close`
**Events on Writable:** `drain`, `finish`, `error`

**Backpressure:** When writable can't keep up with readable, `pipe()` automatically pauses the readable stream. Manually: check return value of `writable.write()` — if `false`, wait for `drain` event.

---

## 11. EventEmitter

The `events` module provides the `EventEmitter` class — the foundation of Node.js event-driven architecture.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("data", (msg) => console.log(msg));       // add listener
emitter.once("connect", () => console.log("once"));  // fires only once
emitter.emit("data", "Hello");                       // trigger event
emitter.off("data", handler);                        // remove listener
emitter.removeAllListeners("data");
```

- Default max listeners per event: **10** (warning if exceeded — change with `setMaxListeners()`)
- `error` event is special — if emitted with no listener, it throws
- Most Node.js core classes (streams, http server) extend `EventEmitter`

---

## 12. Buffer

A **Buffer** is a fixed-size allocation of memory outside the V8 heap used to handle binary data (images, files, network packets).

```js
const buf = Buffer.from("Hello", "utf8");  // create from string
buf.toString("utf8");                       // convert back to string
buf.toString("hex");
buf.toString("base64");

Buffer.alloc(10);         // 10 bytes, zero-filled
Buffer.allocUnsafe(10);   // 10 bytes, not zero-filled (faster, may contain old data)

Buffer.concat([buf1, buf2]);
buf.length;               // size in bytes
```

Buffers are essential when dealing with streams, file system, network operations.

---

## 13. Error Handling

**Callback pattern (error-first callbacks):**
```js
fs.readFile("file.txt", (err, data) => {
  if (err) return handleError(err);
  // use data
});
```

**Promise / async-await:**
```js
try {
  const data = await fsPromises.readFile("file.txt");
} catch (err) {
  console.error(err);
}
```

**Uncaught exceptions:**
```js
process.on("uncaughtException", (err) => {
  console.error("Uncaught:", err);
  process.exit(1); // always exit after uncaughtException
});
```

**Unhandled promise rejections:**
```js
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason);
});
```

**Custom Error classes:**
```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}
```

---

## 14. Child Processes

Node.js can spawn subprocesses to run shell commands or other Node scripts.

**`exec(command, callback)`** — runs command in a shell, buffers output, good for small output
```js
const { exec } = require("child_process");
exec("ls -la", (err, stdout, stderr) => console.log(stdout));
```

**`spawn(command, args)`** — streams output, good for large data, long-running processes
```js
const { spawn } = require("child_process");
const ls = spawn("ls", ["-la"]);
ls.stdout.on("data", data => console.log(data.toString()));
```

**`fork(modulePath)`** — spawns a new Node.js process, has built-in IPC channel for communication between parent and child
```js
const { fork } = require("child_process");
const child = fork("./worker.js");
child.send({ task: "compute" });
child.on("message", result => console.log(result));
```

---

## 15. Cluster Module

Node.js runs on a single thread, so it can't use multiple CPU cores by default. The **cluster module** allows forking multiple worker processes that share the same server port.

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork(); // create worker for each CPU core
  }
  cluster.on("exit", (worker) => cluster.fork()); // restart on crash
} else {
  require("./server"); // each worker runs the server
}
```

- Master process distributes incoming connections among workers
- Workers are independent processes — no shared memory
- Crashes in one worker don't affect others
- Use **PM2** in production for process management and clustering

---

## 16. Worker Threads

**Worker threads** allow running CPU-intensive JavaScript in parallel threads without blocking the event loop. Unlike cluster, workers share memory via `SharedArrayBuffer`.

```js
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: { num: 42 } });
  worker.on("message", result => console.log(result));
} else {
  const result = heavyComputation(workerData.num);
  parentPort.postMessage(result);
}
```

- Workers have their own V8 instance and event loop
- Communication via `postMessage` / `on("message")`
- Share memory with `SharedArrayBuffer` + `Atomics`
- Use for: image processing, data parsing, ML inference, heavy computations

**Cluster vs Worker Threads:**
| | Cluster | Worker Threads |
|---|---|---|
| Processes | Multiple OS processes | Multiple threads in one process |
| Memory | Separate | Can share via SharedArrayBuffer |
| Use case | Scale I/O (web servers) | CPU-intensive tasks |

---

## 17. npm & package.json

**npm (Node Package Manager)** — default package manager for Node.js.

```json
{
  "name": "app",
  "version": "1.0.0",
  "scripts": { "start": "node index.js", "dev": "nodemon index.js" },
  "dependencies": { "express": "^4.18.2" },
  "devDependencies": { "jest": "^29.0.0" }
}
```

**Key commands:**
```bash
npm init -y
npm install express          # install + add to dependencies
npm install jest --save-dev  # devDependency
npm install                  # install all from package.json
npm uninstall express
npm update
npm run <script>
npx <package>                # run without installing globally
```

**`package-lock.json`** — locks exact versions of all installed packages (including transitive). Always commit this file.

**Semantic versioning:** `MAJOR.MINOR.PATCH`
- `^1.2.3` — compatible with 1.x.x (minor + patch updates allowed)
- `~1.2.3` — approximately 1.2.x (only patch updates allowed)
- `1.2.3` — exact version

---

## 18. Environment Variables

```js
process.env.NODE_ENV   // "development" | "production" | "test"
process.env.PORT
process.env.DB_URL
```

Use **dotenv** package to load `.env` file:
```js
require("dotenv").config();
// Now process.env.MY_VAR is available
```

`.env` file:
```
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
```

Always add `.env` to `.gitignore`. Never commit secrets.

---

## 19. Express.js Basics

Express is the most popular Node.js web framework — minimal and unopinionated.

```js
const express = require("express");
const app = express();

app.use(express.json());           // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data

app.get("/users", (req, res) => {
  res.status(200).json({ users: [] });
});

app.post("/users", (req, res) => {
  const body = req.body;
  res.status(201).json(body);
});

app.listen(3000, () => console.log("Server on 3000"));
```

**`req` object:** `req.params`, `req.query`, `req.body`, `req.headers`, `req.cookies`, `req.ip`
**`res` object:** `res.json()`, `res.send()`, `res.status()`, `res.redirect()`, `res.render()`

---

## 20. Middleware

**Middleware** is a function that has access to `req`, `res`, and `next`. It runs between the request and the final route handler.

```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to next middleware
}

app.use(logger); // apply globally
app.use("/api", authMiddleware); // apply to route prefix
app.get("/protected", authMiddleware, handler); // apply to single route
```

**Types of middleware:**
- **Application-level** — `app.use()`
- **Router-level** — `router.use()`
- **Error-handling** — 4 arguments: `(err, req, res, next)`
- **Built-in** — `express.json()`, `express.static()`
- **Third-party** — `cors`, `helmet`, `morgan`, `cookie-parser`

**Error-handling middleware:**
```js
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});
```
Must be defined **after** all other middleware and routes.

---

## 21. Routing

```js
// Basic routing
app.get("/", handler);
app.post("/users", handler);
app.put("/users/:id", handler);
app.delete("/users/:id", handler);
app.all("/users", handler); // all HTTP methods

// Route params
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
});

// Query strings
// GET /search?q=node&limit=10
req.query.q;      // "node"
req.query.limit;  // "10"

// Router (modular routing)
const router = express.Router();
router.get("/", getAllUsers);
router.post("/", createUser);
app.use("/users", router);
```

---

## 22. REST API Design Principles

- Use **nouns** for resources, not verbs: `/users` not `/getUsers`
- Use HTTP methods correctly: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- Use proper **status codes:**

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content (successful delete) |
| 400 | Bad Request |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (authenticated but not authorized) |
| 404 | Not Found |
| 422 | Unprocessable Entity (validation error) |
| 500 | Internal Server Error |

- Use versioning: `/api/v1/users`
- Use plural nouns: `/users`, `/products`
- Nested resources: `/users/:id/posts`

---

## 23. Authentication & JWT

**JWT (JSON Web Token):** A compact, self-contained token for transmitting information securely.

Structure: `header.payload.signature` (Base64URL encoded)

```js
const jwt = require("jsonwebtoken");

// Sign
const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Verify
const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws if invalid
```

**Auth middleware:**
```js
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
```

- JWTs are **stateless** — server doesn't store sessions
- Store tokens in `httpOnly` cookies (XSS-safe) or memory (not localStorage)
- **Access token** (short-lived, 15min) + **Refresh token** (long-lived, stored securely)

---

## 24. Streams & Piping in HTTP

```js
// Stream a file as HTTP response
app.get("/file", (req, res) => {
  const stream = fs.createReadStream("large-file.mp4");
  res.setHeader("Content-Type", "video/mp4");
  stream.pipe(res);
});

// Upload: pipe request body to file
app.post("/upload", (req, res) => {
  const writeStream = fs.createWriteStream("upload.txt");
  req.pipe(writeStream);
  writeStream.on("finish", () => res.send("Done"));
});
```

---

## 25. Database Interaction

**MongoDB with Mongoose:**
```js
const mongoose = require("mongoose");
await mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true } });
const User = mongoose.model("User", UserSchema);

await User.create({ name: "Alice", email: "a@a.com" });
await User.findById(id);
await User.findByIdAndUpdate(id, { name: "Bob" }, { new: true });
await User.findByIdAndDelete(id);
```

**PostgreSQL with pg:**
```js
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DB_URL });

const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
result.rows; // array of row objects
```

**Connection pooling:** Reuse a pool of database connections instead of opening a new connection per request. Reduces overhead and limits max connections.

---

## 26. Caching

**In-memory caching (Node.js Map or node-cache):**
```js
const cache = new Map();
if (cache.has(key)) return cache.get(key);
const data = await fetchFromDB();
cache.set(key, data);
```

**Redis:**
```js
const redis = require("redis");
const client = redis.createClient();

await client.set("key", JSON.stringify(data), { EX: 3600 }); // 1hr TTL
const cached = await client.get("key");
```

Cache-aside pattern: check cache → on miss, hit DB → store in cache → return.

---

## 27. Security Best Practices

- **Helmet** — sets security-related HTTP headers: `app.use(helmet())`
- **CORS** — control which origins can access your API: `app.use(cors({ origin: "https://example.com" }))`
- **Rate limiting** — prevent abuse: `express-rate-limit`
- **Input validation** — validate and sanitize all inputs (`joi`, `express-validator`, `zod`)
- **SQL injection** — use parameterized queries, never string-concatenate user input into queries
- **NoSQL injection** — sanitize MongoDB queries (`express-mongo-sanitize`)
- **Password hashing** — always hash with bcrypt: `bcrypt.hash(password, 12)`
- **HTTPS** — use TLS in production, terminate at load balancer or use `https` module
- **Avoid `eval()`** and `new Function()` with user input
- **`process.env`** — never hardcode secrets, use environment variables

---

## 28. Testing

**Jest:**
```js
const { add } = require("./math");

describe("add function", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

**Supertest (HTTP testing):**
```js
const request = require("supertest");
const app = require("./app");

test("GET /users returns 200", async () => {
  const res = await request(app).get("/users");
  expect(res.status).toBe(200);
});
```

**Types of tests:**
- **Unit** — test individual functions/modules in isolation
- **Integration** — test modules working together (routes + DB)
- **E2E** — test full user flows

**Mocking:** `jest.fn()`, `jest.spyOn()`, `jest.mock("module")` — replace real dependencies with controlled stubs.

---

## 29. Logging

**console.log** — fine for development, not production.

**Winston (production logging):**
```js
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console()
  ]
});

logger.info("Server started");
logger.error("Something failed", { error: err.message });
```

**Morgan** — HTTP request logger middleware for Express:
```js
app.use(require("morgan")("combined")); // logs each request
```

Log levels: `error` > `warn` > `info` > `http` > `debug`

---

## 30. Performance & Scaling

**Event loop blocking** — avoid synchronous, CPU-heavy operations on the main thread. Offload to worker threads or child processes.

**`--inspect` flag** — enables Chrome DevTools debugger: `node --inspect app.js`

**`clinic.js`** — profiling tool to diagnose event loop lag, memory leaks, CPU bottlenecks.

**Scaling strategies:**
- **Vertical scaling** — more CPU/RAM on same machine
- **Horizontal scaling** — multiple Node instances behind a load balancer
- **Cluster module** — use all cores on one machine
- **PM2** — process manager: `pm2 start app.js -i max` (cluster mode), auto-restart, monitoring

**Memory leaks — common causes:**
- Global variables accumulating data
- Event listeners not removed
- Closures holding large objects
- Caches with no eviction policy

`process.memoryUsage()` — returns `rss`, `heapTotal`, `heapUsed`, `external`

---

## 31. Useful process Object Properties

```js
process.env          // environment variables
process.argv         // command line arguments array
process.cwd()        // current working directory
process.exit(code)   // exit process (0 = success, 1 = error)
process.pid          // process ID
process.platform     // "linux", "darwin", "win32"
process.version      // Node.js version e.g. "v20.0.0"
process.uptime()     // seconds process has been running
process.memoryUsage() // memory stats
process.nextTick(cb) // schedule cb before next event loop iteration
process.stdin / process.stdout / process.stderr
```

---

## 32. Common Interview Patterns

**Non-blocking file read with async/await:**
```js
async function readConfig() {
  const data = await fs.promises.readFile("config.json", "utf8");
  return JSON.parse(data);
}
```

**Promisify a callback-based function:**
```js
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const data = await readFile("file.txt", "utf8");
```

**Run async tasks in parallel:**
```js
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
```

**Graceful shutdown:**
```js
process.on("SIGTERM", () => {
  server.close(() => {
    db.disconnect();
    process.exit(0);
  });
});
```

**When to use what:**
- CPU-heavy task → `worker_threads`
- Scale across cores → `cluster` or PM2
- Run shell command → `child_process.exec`
- Large file transfer → streams + pipe
- Shared session/cache → Redis
- Reuse DB connections → connection pooling

---
