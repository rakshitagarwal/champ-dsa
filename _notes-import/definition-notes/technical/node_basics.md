# Node.js Interview Preparation Notes

## 1. Node.js Fundamentals

### What is Node.js?

- JavaScript runtime built on Chrome's V8 engine
- Executes JavaScript outside the browser
- Non-blocking, event-driven architecture
- Single-threaded with event loop for async operations

**Example:**

```jsx
// Simple Node.js server
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node.js!");
});

server.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 2. Event Loop

### Definition

- Mechanism that handles async operations
- Continuously checks callback queue and call stack
- Phases: timers, pending callbacks, idle, poll, check, close callbacks
- Enables non-blocking I/O despite single thread

**Example:**

```jsx
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

// Output: 1 - Start, 4 - End, 3 - Promise, 2 - Timeout
// (Microtasks like Promises execute before macrotasks like setTimeout)
```

---

## 3. Express.js

### Definition

- Minimal and flexible Node.js web framework
- Simplifies routing, middleware, and HTTP utilities
- De facto standard for building REST APIs
- Built on top of Node's HTTP module

**Example:**

```jsx
const express = require("express");
const app = express();

app.use(express.json()); // Built-in middleware for JSON parsing

app.get("/api/users", (req, res) => {
  res.json({ users: ["Alice", "Bob"] });
});

app.listen(3000, () => console.log("Express server running"));
```

---

## 4. Middleware

### Definition

- Functions that execute during request-response cycle
- Have access to req, res, and next objects
- Can modify request/response or end the cycle
- Types: application-level, router-level, error-handling, built-in, third-party

**Example:**

```jsx
// Custom logging middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to next middleware
};

app.use(logger); // Applied to all routes

// Route-specific middleware
app.get("/protected", authenticate, (req, res) => {
  res.send("Protected content");
});
```

---

## 5. Controllers

### Definition

- Handle business logic for specific routes
- Separate concerns from routing
- Process requests and return responses
- Keep code organized and maintainable

**Example:**

```jsx
// userController.js
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// routes.js
const userController = require("./userController");
app.get("/users", userController.getUsers);
app.post("/users", userController.createUser);
```

---

## 6. Database Operations

### MongoDB with Mongoose

- ODM (Object Data Modeling) library for MongoDB
- Provides schema-based solution
- Built-in validation and type casting
- Query building and middleware hooks

**Example:**

```jsx
const mongoose = require("mongoose");

// Define Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, min: 0 },
  },
  { timestamps: true },
);

// Create Model
const User = mongoose.model("User", userSchema);

// Connect to DB
mongoose.connect("mongodb://localhost:27017/myapp");

// CRUD Operations
const createUser = async () => {
  const user = await User.create({
    name: "John",
    email: "john@example.com",
    age: 25,
  });
};

const findUsers = async () => {
  const users = await User.find({ age: { $gte: 18 } });
};

const updateUser = async () => {
  await User.findByIdAndUpdate(userId, { age: 26 }, { new: true });
};

const deleteUser = async () => {
  await User.findByIdAndDelete(userId);
};
```

---

## 7. Error Handling

### Definition

- Centralized way to catch and process errors
- Prevents app crashes and provides meaningful responses
- Types: synchronous (try-catch), asynchronous (promises, async-await)
- Express has built-in error handling middleware

**Example:**

```jsx
// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Using the wrapper
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found"); // Will be caught by error handler
    }
    res.json(user);
  }),
);

// Centralized error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
```

---

## 8. RESTful API Design

### Definition

- Architectural style for web services
- Uses HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- Stateless communication
- Resource-based URLs

**Example:**

```jsx
const express = require("express");
const router = express.Router();

// GET all resources
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single resource
router.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// POST create resource
router.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// PUT/PATCH update resource
router.patch("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
});

// DELETE resource
router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
```

---

## 9. WebSockets

### Definition

- Full-duplex communication protocol over single TCP connection
- Real-time bidirectional data exchange
- Persistent connection (unlike HTTP request-response)
- Common libraries: Socket.IO, ws

**Example:**

```jsx
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for custom events
  socket.on("chat-message", (data) => {
    // Broadcast to all clients
    io.emit("chat-message", {
      user: data.user,
      message: data.message,
      timestamp: Date.now(),
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3000);
```

---

## 10. Authentication & Authorization

### JWT (JSON Web Tokens)

- Stateless authentication mechanism
- Token contains encoded user info and signature
- Sent in Authorization header: `Bearer <token>`
- Three parts: header, payload, signature

**Example:**

```jsx
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register/Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  res.json({ token });
});

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Protected route
app.get("/profile", authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});
```

---

## 11. Environment Variables

### Definition

- Configuration values stored outside codebase
- Keeps sensitive data secure (API keys, DB credentials)
- Different configs for dev, staging, production
- Common library: dotenv

**Example:**

```jsx
// .env file
PORT=3000
DB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your_secret_key_here
NODE_ENV=development

// app.js
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;

mongoose.connect(dbUri);

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});

```

---

## 12. Validation

### Definition

- Ensures incoming data meets requirements
- Prevents invalid data from entering database
- Common libraries: Joi, express-validator
- Can be done at schema level or middleware level

**Example:**

```jsx
const { body, validationResult } = require("express-validator");

// Validation middleware
const validateUser = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
  body("age").optional().isInt({ min: 0, max: 120 }).withMessage("Invalid age"),
];

app.post("/register", validateUser, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with registration
  const user = await User.create(req.body);
  res.status(201).json(user);
});
```

---

## 13. File Upload

### Definition

- Handling multipart/form-data for file uploads
- Common library: Multer
- Can save to disk or memory
- Important: validate file type and size

**Example:**

```jsx
const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const isValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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
    message: "Files uploaded",
    files: req.files,
  });
});
```

---

## 14. Promises & Async/Await

### Definition

- Handle asynchronous operations
- Promises: object representing eventual completion/failure
- Async/Await: syntactic sugar over promises
- Better than callbacks (avoids callback hell)

**Example:**

```jsx
// Promise approach
function getUserData(userId) {
  return User.findById(userId)
    .then((user) => {
      return Order.find({ userId: user._id });
    })
    .then((orders) => {
      return { user, orders };
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Async/Await approach (cleaner)
async function getUserData(userId) {
  try {
    const user = await User.findById(userId);
    const orders = await Order.find({ userId: user._id });
    return { user, orders };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Parallel execution
async function getMultipleUsers() {
  const [user1, user2, user3] = await Promise.all([
    User.findById(id1),
    User.findById(id2),
    User.findById(id3),
  ]);
  return [user1, user2, user3];
}
```

---

## 15. CORS (Cross-Origin Resource Sharing)

### Definition

- Security mechanism to control resource access from different origins
- Browser blocks requests to different domains by default
- CORS headers allow cross-origin requests
- Common library: cors middleware

**Example:**

```jsx
const cors = require("cors");

// Allow all origins (not recommended for production)
app.use(cors());

// Configure specific origins
app.use(
  cors({
    origin: ["http://localhost:3000", "https://myapp.com"],
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Manual CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
```

---

## 16. Rate Limiting

### Definition

- Prevents abuse by limiting number of requests
- Protects against DDoS and brute-force attacks
- Can be applied globally or per route
- Common library: express-rate-limit

**Example:**

```jsx
const rateLimit = require("express-rate-limit");

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Stricter limit for login endpoint
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: "Too many login attempts, please try again later",
});

app.post("/login", loginLimiter, loginController);
```

---

## 17. Caching

### Definition

- Store frequently accessed data for faster retrieval
- Reduces database load and improves performance
- Types: in-memory (Redis), HTTP caching
- Common library: node-cache, Redis

**Example:**

```jsx
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 }); // 10 min default TTL

// Caching middleware
const cacheMiddleware = (duration) => (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.json(cachedData);
  }

  // Store original res.json
  res.originalJson = res.json;
  res.json = (data) => {
    cache.set(key, data, duration);
    res.originalJson(data);
  };
  next();
};

// Use in routes
app.get("/products", cacheMiddleware(300), async (req, res) => {
  const products = await Product.find();
  res.json(products); // Will be cached for 5 minutes
});

// Clear cache
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  cache.del("/products"); // Invalidate cache
  res.status(201).json(product);
});
```

---

## 18. Streams

### Definition

- Handle large data in chunks instead of loading all at once
- Memory efficient for file operations
- Types: Readable, Writable, Duplex, Transform
- Event-driven: 'data', 'end', 'error'

**Example:**

```jsx
const fs = require("fs");

// Reading large file with streams (memory efficient)
const readStream = fs.createReadStream("large-file.txt", { encoding: "utf8" });

readStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.length, "bytes");
});

readStream.on("end", () => {
  console.log("Finished reading file");
});

readStream.on("error", (error) => {
  console.error("Error:", error);
});

// Piping streams (copy file)
const writeStream = fs.createWriteStream("output.txt");
readStream.pipe(writeStream);

// HTTP response with stream
app.get("/download", (req, res) => {
  const fileStream = fs.createReadStream("video.mp4");
  fileStream.pipe(res);
});
```

---

## 19. Child Processes

### Definition

- Execute system commands or run separate Node processes
- Useful for CPU-intensive tasks (don't block event loop)
- Methods: exec, execFile, spawn, fork
- Communicate via IPC (Inter-Process Communication)

**Example:**

```jsx
const { spawn, exec } = require("child_process");

// exec - for simple commands (buffers output)
exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("Output:", stdout);
});

// spawn - for streaming output
const process = spawn("python", ["script.py"]);

process.stdout.on("data", (data) => {
  console.log(`Output: ${data}`);
});

process.stderr.on("data", (data) => {
  console.error(`Error: ${data}`);
});

process.on("close", (code) => {
  console.log(`Process exited with code ${code}`);
});

// fork - for running Node.js scripts in parallel
const { fork } = require("child_process");
const child = fork("heavy-computation.js");

child.on("message", (result) => {
  console.log("Result from child:", result);
});

child.send({ task: "compute", data: [1, 2, 3] });
```

---

## 20. Testing

### Definition

- Ensures code works as expected
- Types: unit tests, integration tests, E2E tests
- Common frameworks: Jest, Mocha, Chai, Supertest
- TDD (Test-Driven Development) approach

**Example:**

```jsx
// Using Jest and Supertest
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("User API", () => {
  // Runs before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
  });

  // Runs after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Runs before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("POST /users - should create new user", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/users")
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.email).toBe(userData.email);
  });

  test("GET /users/:id - should return user", async () => {
    const user = await User.create({ name: "Jane", email: "jane@example.com" });

    const response = await request(app).get(`/users/${user._id}`).expect(200);

    expect(response.body.name).toBe("Jane");
  });

  test("GET /users/invalid-id - should return 404", async () => {
    await request(app).get("/users/invalid-id").expect(404);
  });
});
```

---

## 21. Logging

### Definition

- Track application behavior and errors
- Different levels: error, warn, info, debug
- Helps debugging and monitoring in production
- Common libraries: Winston, Morgan, Pino

**Example:**

```jsx
const winston = require("winston");

// Create logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Add console logging in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Use in application
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    logger.info("Users fetched successfully");
    res.json(users);
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});
```

---

## 22. Security Best Practices

### Definition

- Protect application from common vulnerabilities
- Use helmet middleware for HTTP headers
- Sanitize user input, prevent XSS and injection attacks
- Keep dependencies updated

**Example:**

```jsx
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

// Set security HTTP headers
app.use(helmet());

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Sanitize user input
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

app.use(sanitizeInput);

// Hash passwords before storing
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json(user);
});
```

---

## 23. Clustering

### Definition

- Utilize multiple CPU cores by running multiple Node instances
- Each instance (worker) handles requests independently
- Master process manages workers
- Improves performance and availability

**Example:**

```jsx
const cluster = require("cluster");
const os = require("os");
const express = require("express");

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Starting a new worker...");
    cluster.fork(); // Restart worker
  });
} else {
  // Worker processes
  const app = express();

  app.get("/", (req, res) => {
    res.send(`Handled by worker ${process.pid}`);
  });

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
```

---

## 24. Pagination

### Definition

- Split large datasets into smaller pages
- Improves performance and user experience
- Common approach: skip/limit or cursor-based
- Include metadata: total count, page info

**Example:**

```jsx
// Skip/Limit pagination
app.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cursor-based pagination (better for large datasets)
app.get("/posts", async (req, res) => {
  const cursor = req.query.cursor;
  const limit = 20;

  const query = cursor ? { _id: { $lt: cursor } } : {};

  const posts = await Post.find(query)
    .limit(limit + 1)
    .sort({ _id: -1 });

  const hasMore = posts.length > limit;
  const results = hasMore ? posts.slice(0, -1) : posts;
  const nextCursor = hasMore ? results[results.length - 1]._id : null;

  res.json({
    posts: results,
    nextCursor,
    hasMore,
  });
});
```

---

## 25. Module System

### Definition

- CommonJS (require/module.exports) - default in Node.js
- ES6 Modules (import/export) - modern JavaScript
- Modules encapsulate code and prevent global scope pollution
- Built-in modules: fs, path, http, crypto, etc.

**Example:**

```jsx
// CommonJS (Node.js default)
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// app.js
const { add, subtract } = require("./math");
console.log(add(5, 3)); // 8

// ES6 Modules (need "type": "module" in package.json or .mjs extension)
// math.mjs
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// app.mjs
import Calculator, { add, subtract } from "./math.mjs";
const calc = new Calculator();
console.log(calc.multiply(4, 5)); // 20
```

---

## Quick Reference: Common Interview Questions

### 1. What is the difference between Node.js and JavaScript?

JavaScript is a programming language; Node.js is a runtime environment that executes JavaScript outside browsers.

### 2. Explain callback hell and how to avoid it?

Nested callbacks creating pyramid of doom. Avoid using: Promises, async/await, modularization.

### 3. What is package.json?

Metadata file containing project info, dependencies, scripts, version, etc.

### 4. Difference between dependencies and devDependencies?

Dependencies: required in production. DevDependencies: only needed for development (testing, build tools).

### 5. What is npm vs npx?

npm: package manager for installing packages. npx: executes packages without installing globally.

### 6. Explain req, res, next in Express?

req: request object, res: response object, next: function to pass control to next middleware.

### 7. What is the purpose of next() in middleware?

Passes control to the next middleware in the stack. Without it, request hangs.

### 8. Difference between PUT and PATCH?

PUT: replace entire resource. PATCH: partial update of resource.

### 9. What are status codes?

200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error).

### 10. How to handle uncaught exceptions?

```jsx
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1); // Exit gracefully
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});
```

---

## Essential NPM Packages Cheatsheet

| Package            | Purpose                   |
| ------------------ | ------------------------- |
| express            | Web framework             |
| mongoose           | MongoDB ODM               |
| dotenv             | Environment variables     |
| jsonwebtoken       | JWT authentication        |
| bcrypt             | Password hashing          |
| cors               | Handle CORS               |
| helmet             | Security headers          |
| express-validator  | Input validation          |
| multer             | File uploads              |
| socket.io          | WebSockets                |
| nodemon            | Auto-restart server (dev) |
| winston            | Logging                   |
| express-rate-limit | Rate limiting             |
| node-cache         | Caching                   |
| axios              | HTTP client               |

---

## Best Practices Summary

1. **Always use async/await** with try-catch for async operations
2. **Validate input** before processing (never trust user input)
3. **Use environment variables** for config and secrets
4. **Implement error handling** - centralized middleware
5. **Keep routes thin** - move logic to controllers/services
6. **Use middleware** for reusable functionality
7. **Hash passwords** - never store plain text
8. **Implement authentication** for protected routes
9. **Add logging** for debugging and monitoring
10. **Write tests** for critical functionality
11. **Use HTTPS** in production
12. **Keep dependencies updated** (npm audit)
13. **Follow RESTful conventions** for API design
14. **Use status codes correctly**
15. **Document your API** (Swagger/Postman)

---

**Good luck with your interview! 🚀**
