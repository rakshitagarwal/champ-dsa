# MongoDB & DBMS Concepts Interview Guide

## 1. Database Management System (DBMS)

**Definition:** A DBMS is software that manages, stores, retrieves, and manipulates data in databases while ensuring data integrity, security, and consistency.

**Key Points:**

- Organizes and manages data efficiently
- Provides data security and access control
- Ensures data integrity and consistency
- Supports concurrent access by multiple users
- Types: Relational (SQL) and Non-relational (NoSQL)
- Examples: MySQL, PostgreSQL, MongoDB, Oracle

**Example:**

```
Traditional File System (Problems):
- Data redundancy
- Data inconsistency
- Difficult data access
- No concurrent access control

DBMS Benefits:
✅ Eliminates redundancy
✅ Maintains consistency
✅ Easy data access (queries)
✅ Supports multiple users
✅ Backup and recovery
✅ Data security

```

---

## 2. SQL vs NoSQL

**Definition:** SQL databases are relational with structured schemas; NoSQL databases are non-relational with flexible schemas.

**Key Points:**

- **SQL:** Structured, table-based, ACID compliant, vertical scaling
- **NoSQL:** Flexible schema, document/key-value/graph, horizontal scaling
- **SQL Use Case:** Complex queries, transactions, structured data
- **NoSQL Use Case:** Big data, real-time apps, unstructured data
- SQL: MySQL, PostgreSQL; NoSQL: MongoDB, Cassandra, Redis

**Example:**

```
SQL (Relational):
Users Table:
+----+-------+-------------------+
| id | name  | email             |
+----+-------+-------------------+
| 1  | John  | john@example.com  |
| 2  | Jane  | jane@example.com  |
+----+-------+-------------------+

NoSQL (Document-based):
{
  "_id": "1",
  "name": "John",
  "email": "john@example.com",
  "address": {
    "city": "NYC",
    "zip": "10001"
  },
  "hobbies": ["reading", "coding"]
}

Key Differences:
| Feature        | SQL            | NoSQL          |
|----------------|----------------|----------------|
| Schema         | Fixed          | Flexible       |
| Scalability    | Vertical       | Horizontal     |
| Transactions   | ACID           | BASE           |
| Data Structure | Tables/Rows    | Documents/K-V  |
| Relationships  | JOINs          | Embedded/Refs  |

```

---

## 3. ACID Properties

**Definition:** ACID ensures reliability of database transactions through Atomicity, Consistency, Isolation, and Durability.

**Key Points:**

- **Atomicity:** All or nothing (transaction completes fully or not at all)
- **Consistency:** Database remains in valid state before and after transaction
- **Isolation:** Concurrent transactions don't interfere with each other
- **Durability:** Committed data persists even after system failure
- Critical for financial systems, banking applications

**Example:**

```
Bank Transfer Example:

Transaction: Transfer $100 from Account A to Account B

1. Atomicity:
   - Deduct $100 from Account A
   - Add $100 to Account B
   - If either fails, ROLLBACK both (all or nothing)

2. Consistency:
   - Total money before = Total money after
   - Account A: $500 → $400
   - Account B: $300 → $400
   - Total: $800 (before and after)

3. Isolation:
   - Transaction 1: A → B ($100)
   - Transaction 2: C → A ($50)
   - Both execute independently without interference

4. Durability:
   - After commit, data persists
   - Even if system crashes, changes are permanent

Without ACID:
❌ Money could be deducted but not added (Atomicity)
❌ Total balance could change (Consistency)
❌ Concurrent transfers could corrupt data (Isolation)
❌ Committed data could be lost (Durability)

```

---

## 4. MongoDB Basics

**Definition:** MongoDB is a popular NoSQL document-oriented database that stores data in flexible, JSON-like documents (BSON format).

**Key Points:**

- Document-based (not table-based)
- Schema-less/flexible schema
- Horizontal scalability (sharding)
- High performance for read/write operations
- Supports indexing, aggregation, replication
- Query language similar to JavaScript

**Example:**

```jsx
// MongoDB Document (BSON)
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "coding", "gaming"],
  "createdAt": ISODate("2024-01-31T00:00:00Z")
}

// Flexible Schema - Different documents can have different fields
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "name": "Jane Smith",
  "age": 25,
  "email": "jane@example.com",
  "company": "Tech Corp",        // Extra field
  "skills": ["JavaScript", "Python"]  // Different structure
}

// Hierarchy:
Database → Collections → Documents → Fields

Example:
myDatabase
  ├── users (collection)
  │   ├── { _id: 1, name: "John" } (document)
  │   └── { _id: 2, name: "Jane" }
  └── posts (collection)
      └── { _id: 1, title: "Hello" }

```

---

## 5. CRUD Operations in MongoDB

**Definition:** CRUD stands for Create, Read, Update, Delete - the four basic database operations.

**Key Points:**

- **Create:** Insert new documents
- **Read:** Query/find documents
- **Update:** Modify existing documents
- **Delete:** Remove documents
- MongoDB provides rich query operators
- Methods: insertOne, insertMany, find, updateOne, deleteOne

**Example:**

```jsx
// CREATE
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
});

db.users.insertMany([
  { name: "Jane", email: "jane@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 35 },
]);

// READ
// Find all
db.users.find();

// Find with filter
db.users.find({ age: { $gte: 25 } }); // age >= 25

// Find one
db.users.findOne({ email: "john@example.com" });

// Projection (select specific fields)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Sorting
db.users.find().sort({ age: -1 }); // Descending

// Limiting
db.users.find().limit(10);

// UPDATE
// Update one
db.users.updateOne(
  { email: "john@example.com" }, // Filter
  { $set: { age: 31 } }, // Update
);

// Update many
db.users.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } });

// Replace document
db.users.replaceOne(
  { email: "john@example.com" },
  { name: "John Smith", email: "john@example.com", age: 31 },
);

// DELETE
// Delete one
db.users.deleteOne({ email: "john@example.com" });

// Delete many
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all
db.users.deleteMany({});
```

---

## 6. MongoDB Query Operators

**Definition:** Query operators are special keywords that enable complex filtering, comparison, and logical operations in MongoDB queries.

**Key Points:**

- **Comparison:** $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin
- **Logical:** $and, $or, $not, $nor
- **Element:** $exists, $type
- **Array:** $all, $elemMatch, $size
- Case-sensitive by default (use $regex for case-insensitive)

**Example:**

```jsx
// Comparison Operators
db.users.find({ age: { $gt: 25 } }); // age > 25
db.users.find({ age: { $gte: 25, $lte: 35 } }); // 25 <= age <= 35
db.users.find({ status: { $ne: "inactive" } }); // status != "inactive"
db.users.find({ role: { $in: ["admin", "moderator"] } }); // role in array

// Logical Operators
db.users.find({
  $and: [{ age: { $gte: 25 } }, { status: "active" }],
});

db.users.find({
  $or: [{ age: { $lt: 18 } }, { age: { $gt: 65 } }],
});

// Element Operators
db.users.find({ phone: { $exists: true } }); // Has phone field
db.users.find({ age: { $type: "number" } }); // age is number type

// Array Operators
db.users.find({ hobbies: "coding" }); // Array contains "coding"
db.users.find({ hobbies: { $all: ["coding", "reading"] } }); // Has both
db.users.find({ hobbies: { $size: 3 } }); // Array length = 3

// Regular Expressions
db.users.find({ name: { $regex: /^john/i } }); // Starts with "john" (case-insensitive)
db.users.find({ email: { $regex: /@gmail\.com$/ } }); // Ends with @gmail.com

// Complex Query
db.users.find({
  $and: [
    { age: { $gte: 18, $lte: 65 } },
    { status: "active" },
    { $or: [{ role: "admin" }, { experience: { $gte: 5 } }] },
  ],
});
```

---

## 7. Indexing

**Definition:** Indexes are special data structures that improve query performance by allowing faster data retrieval.

**Key Points:**

- Speeds up queries significantly
- Trade-off: Faster reads, slower writes (index must be updated)
- Default index on `_id` field
- Types: Single field, Compound, Multikey, Text, Geospatial
- Use indexes on frequently queried fields
- Check query performance with `.explain()`

**Example:**

```jsx
// Create single field index
db.users.createIndex({ email: 1 }); // 1 = ascending, -1 = descending

// Compound index (multiple fields)
db.users.createIndex({ lastName: 1, firstName: 1 });

// Unique index (enforces uniqueness)
db.users.createIndex({ email: 1 }, { unique: true });

// Text index (for text search)
db.articles.createIndex({ title: "text", content: "text" });

// Search using text index
db.articles.find({ $text: { $search: "mongodb tutorial" } });

// Multikey index (for arrays)
db.users.createIndex({ hobbies: 1 });

// List all indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex("email_1");

// Query performance analysis
db.users.find({ email: "john@example.com" }).explain("executionStats");

// Output shows:
// - executionTimeMillis: Time taken
// - totalDocsExamined: Documents scanned
// - nReturned: Documents returned
// - Index used or collection scan

// Without index:
// totalDocsExamined: 1000000 (scans all)
// executionTimeMillis: 500ms

// With index:
// totalDocsExamined: 1 (uses index)
// executionTimeMillis: 2ms

// When to use indexes:
✅ Frequently queried fields
✅ Sort operations
✅ Unique constraints
❌ Small collections
❌ Fields with low cardinality (few unique values)
❌ Fields that change frequently

```

---

## 8. Aggregation Pipeline

**Definition:** Aggregation pipeline processes data through multiple stages to perform complex data transformations and computations.

**Key Points:**

- Processes documents in stages
- Each stage transforms documents
- Common stages: $match, $group, $sort, $project, $limit
- More powerful than simple queries
- Can perform joins, calculations, reshaping
- Similar to SQL GROUP BY, JOIN operations

**Example:**

```jsx
// Sample data
db.orders.insertMany([
  { _id: 1, customer: "John", amount: 100, status: "completed" },
  { _id: 2, customer: "Jane", amount: 200, status: "completed" },
  { _id: 3, customer: "John", amount: 150, status: "pending" },
  { _id: 4, customer: "Bob", amount: 300, status: "completed" },
]);

// Simple aggregation - Total sales by customer
db.orders.aggregate([
  { $match: { status: "completed" } }, // Filter
  {
    $group: {
      // Group by customer
      _id: "$customer",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 },
    },
  },
  { $sort: { totalAmount: -1 } }, // Sort by total
]);

// Output:
// [
//   { _id: "Bob", totalAmount: 300, orderCount: 1 },
//   { _id: "Jane", totalAmount: 200, orderCount: 1 },
//   { _id: "John", totalAmount: 100, orderCount: 1 }
// ]

// Complex aggregation with multiple stages
db.orders.aggregate([
  // Stage 1: Match completed orders
  { $match: { status: "completed" } },

  // Stage 2: Group by customer
  {
    $group: {
      _id: "$customer",
      total: { $sum: "$amount" },
      avgOrder: { $avg: "$amount" },
      count: { $sum: 1 },
    },
  },

  // Stage 3: Filter groups
  { $match: { count: { $gte: 2 } } },

  // Stage 4: Project (reshape)
  {
    $project: {
      customer: "$_id",
      total: 1,
      avgOrder: { $round: ["$avgOrder", 2] },
      _id: 0,
    },
  },

  // Stage 5: Sort
  { $sort: { total: -1 } },

  // Stage 6: Limit
  { $limit: 10 },
]);

// Common aggregation operators:
// $sum, $avg, $min, $max, $first, $last
// $push (add to array), $addToSet (unique array)

// Date aggregation
db.sales.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" },
      },
      totalSales: { $sum: "$amount" },
    },
  },
]);

// Lookup (JOIN)
db.orders.aggregate([
  {
    $lookup: {
      from: "customers", // Join with customers collection
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails",
    },
  },
]);
```

---

## 9. Schema Design & Data Modeling

**Definition:** Schema design in MongoDB involves deciding how to structure documents, whether to embed or reference related data.

**Key Points:**

- **Embedded Documents:** Nest related data within document
- **References:** Store related data in separate collections (like foreign keys)
- Embed for: One-to-one, one-to-few relationships, data accessed together
- Reference for: One-to-many, many-to-many, large subdocuments
- MongoDB favors embedding over normalization
- Design based on access patterns (how data is queried)

**Example:**

```jsx
// EMBEDDED APPROACH (Denormalized)
// Good for: One-to-few, data accessed together

// Blog post with embedded comments
{
  _id: 1,
  title: "MongoDB Tutorial",
  content: "Learn MongoDB...",
  author: "John Doe",
  comments: [                    // Embedded array
    {
      user: "Jane",
      text: "Great post!",
      date: ISODate("2024-01-31")
    },
    {
      user: "Bob",
      text: "Very helpful",
      date: ISODate("2024-02-01")
    }
  ]
}

// Advantages:
✅ Single query to get post + comments
✅ Better performance (no joins)
✅ Atomic updates

// Disadvantages:
❌ Document size limit (16MB)
❌ Duplicate data if comments used elsewhere
❌ Hard to query comments independently

// REFERENCE APPROACH (Normalized)
// Good for: One-to-many, many-to-many, large documents

// Posts collection
{
  _id: 1,
  title: "MongoDB Tutorial",
  content: "Learn MongoDB...",
  author_id: ObjectId("507f1f77bcf86cd799439011")  // Reference
}

// Authors collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com"
}

// Comments collection
{
  _id: 101,
  post_id: 1,              // Reference to post
  user: "Jane",
  text: "Great post!",
  date: ISODate("2024-01-31")
}

// Advantages:
✅ No duplication
✅ Smaller documents
✅ Can query comments independently
✅ No 16MB limit issues

// Disadvantages:
❌ Multiple queries needed
❌ Application-level joins (or $lookup)

// HYBRID APPROACH
// Store most frequently accessed data embedded, reference the rest

{
  _id: 1,
  title: "MongoDB Tutorial",
  author: {
    name: "John Doe",     // Embedded for quick access
    id: ObjectId("...")   // Reference for full profile
  },
  commentCount: 245,      // Denormalized count
  recentComments: [       // Embed recent 3
    { user: "Jane", text: "Great!" }
  ],
  tags: ["mongodb", "database", "nosql"]
}

// Design Patterns:

// 1. One-to-One: Embed
{
  name: "John",
  address: { street: "123 Main", city: "NYC" }
}

// 2. One-to-Few: Embed
{
  name: "John",
  phones: ["555-1234", "555-5678"]
}

// 3. One-to-Many: Reference
// Product → Reviews (thousands of reviews)
// Store references to review IDs

// 4. Many-to-Many: Reference both ways
// Students ↔ Courses
students: [{ courses: [id1, id2] }]
courses: [{ students: [id1, id2] }]

```

---

## 10. Normalization

**Definition:** Normalization is the process of organizing data to reduce redundancy and improve data integrity through normal forms.

**Key Points:**

- Primarily for SQL databases
- Eliminates duplicate data
- Normal forms: 1NF, 2NF, 3NF, BCNF
- **1NF:** Atomic values, no repeating groups
- **2NF:** 1NF + No partial dependencies
- **3NF:** 2NF + No transitive dependencies
- MongoDB often uses denormalization for performance

**Example:**

```
// UNNORMALIZED TABLE
+----+-------+------------------+------------+------------+
| ID | Name  | Email            | Course1    | Course2    |
+----+-------+------------------+------------+------------+
| 1  | John  | john@example.com | Math, 90   | Science, 85|
| 2  | Jane  | jane@example.com | Math, 95   | NULL       |
+----+-------+------------------+------------+------------+
Problems: Repeating groups, non-atomic values

// 1NF (First Normal Form) - Atomic values
+----+-------+------------------+---------+-------+
| ID | Name  | Email            | Course  | Grade |
+----+-------+------------------+---------+-------+
| 1  | John  | john@example.com | Math    | 90    |
| 1  | John  | john@example.com | Science | 85    |
| 2  | Jane  | jane@example.com | Math    | 95    |
+----+-------+------------------+---------+-------+
Rule: No repeating groups, all values atomic

// 2NF (Second Normal Form) - Remove partial dependencies
Students Table:
+----+-------+------------------+
| ID | Name  | Email            |
+----+-------+------------------+
| 1  | John  | john@example.com |
| 2  | Jane  | jane@example.com |
+----+-------+------------------+

Enrollments Table:
+------------+-----------+-------+
| StudentID  | CourseID  | Grade |
+------------+-----------+-------+
| 1          | 101       | 90    |
| 1          | 102       | 85    |
| 2          | 101       | 95    |
+------------+-----------+-------+

Courses Table:
+-----------+---------+
| CourseID  | Name    |
+-----------+---------+
| 101       | Math    |
| 102       | Science |
+-----------+---------+
Rule: 1NF + No partial dependencies (all non-key attributes depend on entire primary key)

// 3NF (Third Normal Form) - Remove transitive dependencies
Before 3NF:
+----+-------+-----------+-------------+
| ID | Name  | DeptID    | DeptName    |
+----+-------+-----------+-------------+
| 1  | John  | D1        | Engineering |
| 2  | Jane  | D1        | Engineering |
+----+-------+-----------+-------------+
Problem: DeptName depends on DeptID (transitive dependency)

After 3NF:
Employees:
+----+-------+-----------+
| ID | Name  | DeptID    |
+----+-------+-----------+
| 1  | John  | D1        |
| 2  | Jane  | D1        |
+----+-------+-----------+

Departments:
+-----------+-------------+
| DeptID    | DeptName    |
+-----------+-------------+
| D1        | Engineering |
+-----------+-------------+
Rule: 2NF + No transitive dependencies

// MongoDB (Denormalized) - Opposite approach for performance
{
  _id: 1,
  name: "John",
  email: "john@example.com",
  department: {          // Embedded (denormalized)
    id: "D1",
    name: "Engineering"
  },
  courses: [
    { name: "Math", grade: 90 },
    { name: "Science", grade: 85 }
  ]
}

Trade-off:
SQL (Normalized): Less storage, data integrity, complex joins
NoSQL (Denormalized): More storage, faster reads, data duplication

```

---

## 11. Relationships in MongoDB

**Definition:** Relationships define how documents in different collections are related, similar to foreign keys in SQL.

**Key Points:**

- **One-to-One:** User ↔ Profile
- **One-to-Many:** User → Posts
- **Many-to-Many:** Students ↔ Courses
- Implement with: Embedding or Referencing
- Use `$lookup` for joins (aggregation)
- Design based on cardinality and access patterns

**Example:**

```jsx
// ONE-TO-ONE (Embed or Reference)
// User ↔ Address

// Embedded (Preferred for 1:1)
{
  _id: 1,
  name: "John",
  email: "john@example.com",
  address: {                    // Embedded document
    street: "123 Main St",
    city: "NYC",
    zip: "10001"
  }
}

// Referenced (If address is large or rarely accessed)
// Users collection
{ _id: 1, name: "John", addressId: ObjectId("...") }

// Addresses collection
{ _id: ObjectId("..."), street: "123 Main St", city: "NYC" }

// ONE-TO-MANY
// User → Posts (User has many posts)

// Reference (Preferred for 1:many)
// Users collection
{ _id: 1, name: "John" }

// Posts collection
{
  _id: 101,
  title: "My First Post",
  content: "...",
  authorId: 1           // Reference to user
}

// Query: Get user's posts
db.posts.find({ authorId: 1 });

// Using $lookup (JOIN)
db.users.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "authorId",
      as: "userPosts"
    }
  }
]);

// MANY-TO-MANY
// Students ↔ Courses

// Two-way referencing
// Students collection
{
  _id: 1,
  name: "John",
  enrolledCourses: [101, 102, 103]  // Array of course IDs
}

// Courses collection
{
  _id: 101,
  name: "MongoDB Basics",
  enrolledStudents: [1, 2, 3, 4]    // Array of student IDs
}

// Or use junction collection (like SQL)
// Enrollments collection
{
  studentId: 1,
  courseId: 101,
  enrollmentDate: ISODate("2024-01-31"),
  grade: "A"
}

// Query: Find student's courses
db.courses.find({ _id: { $in: [101, 102, 103] } });

// Query: Find course's students
db.students.find({ _id: { $in: [1, 2, 3, 4] } });

// Parent-Child Relationship
// Categories → Subcategories (Tree structure)

{
  _id: 1,
  name: "Electronics",
  parentId: null        // Root category
}

{
  _id: 2,
  name: "Laptops",
  parentId: 1           // Child of Electronics
}

{
  _id: 3,
  name: "Gaming Laptops",
  parentId: 2           // Child of Laptops
}

// Find all children of a category
db.categories.find({ parentId: 1 });

// Find root categories
db.categories.find({ parentId: null });

```

---

## 12. Replication

**Definition:** Replication is the process of synchronizing data across multiple MongoDB servers for high availability and redundancy.

**Key Points:**

- **Replica Set:** Group of MongoDB instances with same data
- **Primary:** Accepts all write operations
- **Secondary:** Replicates primary's data, can serve reads
- Automatic failover (if primary fails, secondary becomes primary)
- Minimum 3 members recommended
- Provides data redundancy and high availability

**Example:**

```jsx
// Replica Set Architecture
                    ┌─────────────┐
                    │   PRIMARY   │ ◄── All writes
                    │   (Node 1)  │
                    └──────┬──────┘
                           │ Replicates
                ┌──────────┴──────────┐
                │                     │
        ┌───────▼──────┐      ┌──────▼───────┐
        │  SECONDARY   │      │  SECONDARY   │ ◄── Optional reads
        │   (Node 2)   │      │   (Node 3)   │
        └──────────────┘      └──────────────┘

// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongodb0.example.com:27017" },
    { _id: 1, host: "mongodb1.example.com:27017" },
    { _id: 2, host: "mongodb2.example.com:27017" }
  ]
});

// Check replica set status
rs.status();

// Add member
rs.add("mongodb3.example.com:27017");

// Remove member
rs.remove("mongodb3.example.com:27017");

// Replica Set Benefits:
✅ High Availability (automatic failover)
✅ Data Redundancy (copies on multiple servers)
✅ Read Scalability (read from secondaries)
✅ Disaster Recovery (geographic distribution)
✅ Zero Downtime Maintenance

// Failover Process:
1. Primary fails
2. Remaining members detect failure (heartbeat)
3. Election starts
4. Secondary becomes new Primary
5. Applications automatically reconnect

// Read Preference Options:
// - primary (default): Read from primary only
// - primaryPreferred: Primary if available, else secondary
// - secondary: Read from secondary only
// - secondaryPreferred: Secondary if available, else primary
// - nearest: Read from nearest member (lowest latency)

// Connection string with replica set
mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=myReplicaSet

```

---

## 13. Sharding

**Definition:** Sharding is a horizontal partitioning strategy that distributes data across multiple machines for scalability.

**Key Points:**

- Handles large datasets by splitting across servers (shards)
- Each shard is independent replica set
- **Shard Key:** Determines how data is distributed
- **Config Servers:** Store metadata and configuration
- **mongos:** Query router that directs operations
- Enables horizontal scaling (add more machines)

**Example:**

```jsx
// Sharding Architecture

         ┌─────────────┐
         │   mongos    │ ◄── Application connects here
         │ (Router)    │
         └──────┬──────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│Shard 1│   │Shard 2│   │Shard 3│
│(US)   │   │(EU)   │   │(Asia) │
└───────┘   └───────┘   └───────┘
Each shard is a replica set

// Enable sharding on database
sh.enableSharding("myDatabase");

// Choose shard key and shard collection
sh.shardCollection("myDatabase.users", { country: 1 });

// Data distribution based on shard key
// Shard 1: { country: "USA" }
// Shard 2: { country: "UK", "France" }
// Shard 3: { country: "India", "China" }

// Example documents distributed across shards
// Shard 1 (USA):
{ _id: 1, name: "John", country: "USA" }
{ _id: 2, name: "Jane", country: "USA" }

// Shard 2 (Europe):
{ _id: 3, name: "Pierre", country: "France" }
{ _id: 4, name: "Emma", country: "UK" }

// Shard 3 (Asia):
{ _id: 5, name: "Raj", country: "India" }
{ _id: 6, name: "Li", country: "China" }

// Query routing
// Query: db.users.find({ country: "USA" })
// mongos routes ONLY to Shard 1 (targeted query)

// Query: db.users.find({ name: "John" })
// mongos queries ALL shards (scatter-gather)

// Good shard keys:
✅ High cardinality (many unique values)
✅ Evenly distributed
✅ Used in queries frequently
✅ Non-monotonically increasing

// Bad shard keys:
❌ _id (monotonically increasing)
❌ timestamp (monotonically increasing)
❌ boolean fields (low cardinality)

// Shard key types:
// 1. Hashed: sh.shardCollection("db.users", { _id: "hashed" })
//    - Ensures even distribution
//    - Random placement
//
// 2. Range-based: sh.shardCollection("db.users", { age: 1 })
//    - Groups similar values
//    - Can cause hotspots

// Benefits:
✅ Horizontal scalability
✅ No single point of failure
✅ Handles massive datasets (TBs/PBs)
✅ Improved performance for large collections

// Challenges:
❌ Complexity in setup and management
❌ Choosing right shard key is critical
❌ Difficult to change shard key later
❌ Some queries scan all shards

```

---

## 14. Transactions

**Definition:** Transactions allow multiple operations to be executed as a single, atomic unit with ACID guarantees.

**Key Points:**

- Multi-document transactions (MongoDB 4.0+)
- ACID guarantees across multiple documents/collections
- Use for operations that must succeed or fail together
- Slower than single-document operations
- Requires replica set or sharded cluster
- Syntax similar to SQL BEGIN/COMMIT/ROLLBACK

**Example:**

```jsx
// Without transactions (NOT ATOMIC)
// Transfer money between accounts
db.accounts.updateOne(
  { _id: 1 },
  { $inc: { balance: -100 } }
);
// ⚠️ If crash happens here, money is lost!
db.accounts.updateOne(
  { _id: 2 },
  { $inc: { balance: 100 } }
);

// With transactions (ATOMIC)
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const accountsCollection = session.getDatabase("bank").accounts;

  // Deduct from Account 1
  accountsCollection.updateOne(
    { _id: 1 },
    { $inc: { balance: -100 } },
    { session }
  );

  // Add to Account 2
  accountsCollection.updateOne(
    { _id: 2 },
    { $inc: { balance: 100 } },
    { session }
  );

  // If we get here, commit the transaction
  session.commitTransaction();
  console.log("Transaction committed");

} catch (error) {
  // If any error, rollback everything
  session.abortTransaction();
  console.log("Transaction aborted:", error);
} finally {
  session.endSession();
}

// E-commerce order example
session.startTransaction();

try {
  // 1. Create order
  db.orders.insertOne({
    userId: 123,
    items: [{ productId: 1, qty: 2 }],
    total: 200
  }, { session });

  // 2. Reduce inventory
  db.products.updateOne(
    { _id: 1 },
    { $inc: { stock: -2 } },
    { session }
  );

  // 3. Create payment record
  db.payments.insertOne({
    orderId: 456,
    amount: 200,
    status: "completed"
  }, { session });

  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
}

// Transaction with retry logic
async function runTransactionWithRetry(txnFunc, session) {
  while (true) {
    try {
      await txnFunc(session);
      await session.commitTransaction();
      break;
    } catch (error) {
      if (error.hasErrorLabel("TransientTransactionError")) {
        // Retry transaction
        console.log("TransientTransactionError, retrying...");
        continue;
      } else {
        throw error;
      }
    }
  }
}

// When to use transactions:
✅ Multi-document updates that must be atomic
✅ Financial operations (payments, transfers)
✅ Inventory management
✅ Order processing

// When NOT to use:
❌ Single document updates (already atomic)
❌ High-throughput operations (slower)
❌ Simple CRUD operations
❌ When eventual consistency is acceptable

```

---

## 15. Backup and Restore

**Definition:** Backup creates copies of database for disaster recovery; restore recovers data from backups.

**Key Points:**

- **mongodump:** Export data to BSON format
- **mongorestore:** Import data from backup
- **Point-in-time backups:** Capture data at specific time
- **Incremental backups:** Only changed data
- Regular backups critical for production
- Test restore process regularly

**Example:**

```bash
# ===== BACKUP (mongodump) =====

# Backup entire database
mongodump --db myDatabase --out /backup/path

# Backup specific collection
mongodump --db myDatabase --collection users --out /backup/path

# Backup with authentication
mongodump --uri="mongodb://username:password@localhost:27017/myDatabase" --out /backup

# Compressed backup
mongodump --db myDatabase --archive=/backup/mydb.archive --gzip

# Backup from remote server
mongodump --host mongodb.example.com --port 27017 --db myDatabase --out /backup

# Backup with query filter
mongodump --db myDatabase --collection users --query '{"active": true}' --out /backup

# ===== RESTORE (mongorestore) =====

# Restore entire database
mongorestore --db myDatabase /backup/path/myDatabase

# Restore specific collection
mongorestore --db myDatabase --collection users /backup/path/myDatabase/users.bson

# Restore with different name
mongorestore --db newDatabase /backup/path/myDatabase

# Restore from compressed archive
mongorestore --archive=/backup/mydb.archive --gzip

# Drop existing data before restore
mongorestore --drop --db myDatabase /backup/path/myDatabase

# Restore to remote server
mongorestore --host mongodb.example.com --port 27017 /backup/path

# ===== EXPORT/IMPORT (JSON/CSV) =====

# Export to JSON
mongoexport --db myDatabase --collection users --out users.json

# Export to CSV
mongoexport --db myDatabase --collection users --type=csv --fields name,email --out users.csv

# Import from JSON
mongoimport --db myDatabase --collection users --file users.json

# Import from CSV
mongoimport --db myDatabase --collection users --type=csv --headerline --file users.csv

# ===== AUTOMATED BACKUP SCRIPT =====
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
DB_NAME="myDatabase"

# Create backup
mongodump --db $DB_NAME --out $BACKUP_DIR/$DATE

# Compress
tar -czf $BACKUP_DIR/$DATE.tar.gz $BACKUP_DIR/$DATE
rm -rf $BACKUP_DIR/$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"

# Schedule with cron
# 0 2 * * * /path/to/backup.sh  # Daily at 2 AM

# ===== REPLICA SET BACKUPS =====
# Always backup from SECONDARY (not primary) to avoid impact on production

mongodump --host secondary-host:27017 --db myDatabase --out /backup

# Cloud backups (MongoDB Atlas)
# - Automatic continuous backups
# - Point-in-time recovery
# - Snapshot backups

# Best practices:
✅ Regular automated backups
✅ Test restore process
✅ Store backups off-site
✅ Encrypt backups
✅ Monitor backup success/failure
✅ Document restore procedures

```

---

## 16. Performance Optimization

**Definition:** Techniques to improve MongoDB query performance, reduce latency, and optimize resource usage.

**Key Points:**

- Create indexes on queried fields
- Use projections (select only needed fields)
- Avoid $where and JavaScript expressions
- Use covered queries (index-only)
- Implement pagination
- Monitor with explain() and profiler

**Example:**

```jsx
// 1. CREATE INDEXES
// ❌ Bad: No index (collection scan)
db.users.find({ email: "john@example.com" });
// Scans all documents

// ✅ Good: With index
db.users.createIndex({ email: 1 });
db.users.find({ email: "john@example.com" });
// Uses index (much faster)

// 2. USE PROJECTIONS
// ❌ Bad: Fetch all fields
db.users.find({ age: { $gte: 25 } });
// Returns entire documents

// ✅ Good: Fetch only needed fields
db.users.find(
  { age: { $gte: 25 } },
  { name: 1, email: 1, _id: 0 }  // Projection
);
// Smaller data transfer

// 3. COVERED QUERIES (Index-only, no document access)
db.users.createIndex({ email: 1, name: 1 });

db.users.find(
  { email: "john@example.com" },
  { email: 1, name: 1, _id: 0 }
).explain("executionStats");
// totalDocsExamined: 0 (covered by index!)

// 4. AVOID $where
// ❌ Bad: JavaScript execution (slow)
db.users.find({ $where: "this.age > 25" });

// ✅ Good: Use query operators
db.users.find({ age: { $gt: 25 } });

// 5. COMPOUND INDEXES
// Query: Find active users in NYC, sorted by age
db.users.createIndex({ status: 1, city: 1, age: 1 });

db.users.find({ status: "active", city: "NYC" })
  .sort({ age: 1 });
// Efficiently uses compound index

// 6. PAGINATION (Don't skip large offsets)
// ❌ Bad: Skip becomes slow for large offsets
db.users.find().skip(10000).limit(10);

// ✅ Good: Range-based pagination
db.users.find({ _id: { $gt: lastSeenId } })
  .limit(10)
  .sort({ _id: 1 });

// 7. AGGREGATION OPTIMIZATION
// ❌ Bad: $match after $sort
db.orders.aggregate([
  { $sort: { date: -1 } },
  { $match: { status: "completed" } }  // Sorts everything first!
]);

// ✅ Good: $match early, $sort on indexed field
db.orders.aggregate([
  { $match: { status: "completed" } },  // Filter first
  { $sort: { date: -1 } }
]);

// 8. USE .explain() FOR ANALYSIS
db.users.find({ email: "john@example.com" })
  .explain("executionStats");

// Check:
// - executionTimeMillis (lower is better)
// - totalDocsExamined (should be close to nReturned)
// - executionStages.stage: "IXSCAN" (index) vs "COLLSCAN" (collection scan)

// 9. ENABLE DATABASE PROFILER
// Level 0: Off
// Level 1: Log slow operations (> threshold)
// Level 2: Log all operations

db.setProfilingLevel(1, { slowms: 100 });  // Log queries > 100ms

// View profiler data
db.system.profile.find().limit(5).sort({ ts: -1 });

// 10. CONNECTION POOLING
// Reuse connections instead of creating new ones
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(uri, {
  maxPoolSize: 50,      // Max connections
  minPoolSize: 10       // Min connections
});

// 11. USE LEAN QUERIES (Mongoose)
// ❌ Returns full Mongoose documents (slower)
const users = await User.find({ age: { $gte: 25 } });

// ✅ Returns plain JavaScript objects (faster)
const users = await User.find({ age: { $gte: 25 } }).lean();

// 12. BATCH OPERATIONS
// ❌ Bad: Multiple individual inserts
for (let i = 0; i < 1000; i++) {
  db.users.insertOne({ name: `User${i}` });
}

// ✅ Good: Bulk insert
db.users.insertMany([
  { name: "User0" },
  { name: "User1" },
  // ... 1000 documents
]);

// 13. MONITOR SERVER STATUS
db.serverStatus();
db.currentOp();  // See current operations
db.killOp(opId); // Kill long-running operation

// Performance checklist:
✅ Create indexes on frequently queried fields
✅ Use projections to limit returned data
✅ Avoid $where and JavaScript
✅ Put $match early in aggregation
✅ Use explain() to analyze queries
✅ Implement proper pagination
✅ Enable slow query logging
✅ Monitor and optimize regularly

```

---

## 17. Data Types in MongoDB

**Definition:** MongoDB supports various data types including strings, numbers, dates, arrays, and embedded documents.

**Key Points:**

- **String:** UTF-8 text
- **Number:** Integer (32/64-bit), Double, Decimal128
- **Boolean:** true/false
- **Date:** ISODate format
- **ObjectId:** Unique identifier (12-byte)
- **Array:** Ordered list of values
- **Object/Document:** Nested document
- **Null, Binary, RegEx, etc.**

**Example:**

```jsx
// MongoDB Document with various data types
{
  // String
  name: "John Doe",
  email: "john@example.com",

  // Numbers
  age: 30,                              // Integer
  salary: 75000.50,                     // Double
  balance: NumberDecimal("1234.56"),    // Decimal128 (precise)
  views: NumberLong("9876543210"),      // 64-bit integer

  // Boolean
  isActive: true,
  isVerified: false,

  // Date
  createdAt: ISODate("2024-01-31T10:30:00Z"),
  updatedAt: new Date(),

  // ObjectId (unique identifier, auto-generated)
  _id: ObjectId("507f1f77bcf86cd799439011"),

  // Array
  hobbies: ["reading", "coding", "gaming"],
  scores: [85, 90, 78, 92],
  tags: ["mongodb", "database", "nosql"],

  // Embedded Document (Object)
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001",
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },

  // Array of Documents
  contacts: [
    { type: "email", value: "john@example.com" },
    { type: "phone", value: "555-1234" }
  ],

  // Null
  middleName: null,

  // Binary Data
  profilePicture: BinData(0, "base64encodeddata..."),

  // Regular Expression
  pattern: /^john/i,

  // Timestamp (internal use, for replication)
  timestamp: Timestamp(1627384729, 1),

  // Min/Max Key (special comparison)
  minValue: MinKey,
  maxValue: MaxKey
}

// ObjectId structure (12 bytes)
// ObjectId("507f1f77bcf86cd799439011")
//          |-------|--|--|----|
//          timestamp|MC|PID|Cnt
// - 4 bytes: Unix timestamp
// - 3 bytes: Machine identifier
// - 2 bytes: Process ID
// - 3 bytes: Counter

// Working with ObjectIds
const ObjectId = require('mongodb').ObjectId;

// Create new ObjectId
const id = new ObjectId();
console.log(id);  // ObjectId("...")

// Get timestamp from ObjectId
const timestamp = id.getTimestamp();
console.log(timestamp);  // Date object

// Convert string to ObjectId
const objectId = ObjectId("507f1f77bcf86cd799439011");

// Check if valid ObjectId
ObjectId.isValid("507f1f77bcf86cd799439011");  // true
ObjectId.isValid("invalid");                    // false

// Date operations
db.users.find({
  createdAt: {
    $gte: ISODate("2024-01-01"),
    $lt: ISODate("2024-02-01")
  }
});

// Type checking in queries
db.users.find({ age: { $type: "number" } });
db.users.find({ age: { $type: 16 } });  // 16 = 32-bit integer

// BSON types numbers:
// 1: Double
// 2: String
// 3: Object
// 4: Array
// 7: ObjectId
// 8: Boolean
// 9: Date
// 10: Null
// 16: 32-bit integer
// 18: 64-bit integer

```

---

## 18. CAP Theorem

**Definition:** CAP theorem states that a distributed database can only guarantee two out of three: Consistency, Availability, and Partition Tolerance.

**Key Points:**

- **Consistency:** All nodes see the same data at the same time
- **Availability:** Every request receives a response (success/failure)
- **Partition Tolerance:** System continues despite network partitions
- Must choose 2 of 3 (usually CP or AP)
- MongoDB is CP (Consistency + Partition Tolerance)
- Trade-offs based on application needs

**Example:**

```
CAP THEOREM TRIANGLE

        Consistency (C)
            /\
           /  \
          /    \
         /  CP  \
        /        \
       /          \
      /     CA     \
     /              \
    /       AP       \
   /                  \
  /__________________  \
Availability (A)  Partition Tolerance (P)

Can only achieve 2 of 3!

// CONSISTENCY (C)
// All nodes return same data
// If update happens, all reads get latest data

Node 1: balance = $100
Node 2: balance = $100  ✅ Consistent
Node 3: balance = $100

// AVAILABILITY (A)
// System always responds (even if data is stale)
Request → Response (always, even if not latest)

// PARTITION TOLERANCE (P)
// System works despite network splits
Node 1 ←--X Network Partition X--→ Node 2
Still operational on both sides

// DATABASE EXAMPLES:

// CP Systems (Consistency + Partition Tolerance)
// MongoDB, HBase, Redis
- Sacrifices: Availability
- During partition: Some nodes unavailable
- Guarantees: Latest data always

Example: Banking system
User: Transfer $100
✅ All nodes show updated balance OR
❌ System unavailable (better than wrong balance)

// AP Systems (Availability + Partition Tolerance)
// Cassandra, CouchDB, DynamoDB
- Sacrifices: Consistency
- During partition: All nodes available
- Guarantees: Always responds (might be stale)

Example: Social media likes
User: Likes post
✅ System always responds
❌ Like count might be slightly off (eventual consistency)

// CA Systems (Consistency + Availability)
// Traditional RDBMS (single node)
- Sacrifices: Partition Tolerance
- No distributed system
- Not realistic for distributed databases

// MongoDB's Approach (CP)

Replica Set during Network Partition:

    Primary      ← Partition →    Secondary
      |                              |
  Can't reach                    Can't reach
   secondary                      primary
      |                              |
  Stays Primary                  Becomes read-only
  (Accepts writes)               (Rejects writes)

// Write Concern (tune consistency vs availability)

// Majority (Strong consistency)
db.users.insertOne(
  { name: "John" },
  { writeConcern: { w: "majority" } }
);
// Waits for majority of nodes to acknowledge
// Slower, but guaranteed consistent

// w: 1 (Faster, less consistent)
db.users.insertOne(
  { name: "John" },
  { writeConcern: { w: 1 } }
);
// Acknowledges after primary write
// Faster, risk of data loss if primary fails

// Read Preference (tune consistency vs performance)

// primary (Strong consistency)
db.users.find().readPref("primary");
// Always reads from primary
// Latest data guaranteed

// secondary (Eventual consistency, better performance)
db.users.find().readPref("secondary");
// Reads from secondary
// Might be slightly stale

// REAL-WORLD TRADE-OFFS:

// Financial App (Choose CP - MongoDB):
✅ Consistency critical (account balance must be accurate)
✅ Partition tolerance needed (distributed)
❌ Can sacrifice availability temporarily

// Social Media (Choose AP - Cassandra):
✅ Availability critical (users hate downtime)
✅ Partition tolerance needed
❌ Can accept eventual consistency (likes update eventually)

// Single Server App (Choose CA):
✅ Consistency needed
✅ Availability needed
❌ No distribution (no partition tolerance needed)

```

---

## 19. BASE vs ACID

**Definition:** BASE is an alternative to ACID for NoSQL databases, prioritizing availability over strong consistency.

**Key Points:**

- **ACID:** Atomicity, Consistency, Isolation, Durability (SQL)
- **BASE:** Basically Available, Soft state, Eventually consistent (NoSQL)
- ACID: Strong consistency, immediate
- BASE: Weak consistency, eventual
- Trade-off: Consistency vs Availability & Performance

**Example:**

```
// ACID (SQL - PostgreSQL, MySQL)

Properties:
1. Atomicity: All or nothing
2. Consistency: Valid state always
3. Isolation: Transactions don't interfere
4. Durability: Permanent after commit

Example: Bank Transfer
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

✅ Both updates succeed, or both fail (Atomicity)
✅ Total balance unchanged (Consistency)
✅ Other transactions don't see partial state (Isolation)
✅ Changes persist after commit (Durability)

// BASE (NoSQL - MongoDB, Cassandra)

Properties:
1. Basically Available: System available (might return stale data)
2. Soft state: State may change over time (even without input)
3. Eventually consistent: System becomes consistent over time

Example: Social Media Likes
User clicks like on post
→ Like recorded on Node 1 (instant)
→ Replicates to Node 2 (few milliseconds later)
→ Replicates to Node 3 (few milliseconds later)

Time 0ms:  Node1: 100 likes ✅
           Node2: 99 likes  ❌ (stale)
           Node3: 99 likes  ❌ (stale)

Time 50ms: Node1: 100 likes ✅
           Node2: 100 likes ✅
           Node3: 99 likes  ❌ (stale)

Time 100ms: Node1: 100 likes ✅
            Node2: 100 likes ✅
            Node3: 100 likes ✅ (Eventually consistent!)

// COMPARISON

| Property          | ACID                    | BASE                     |
|-------------------|-------------------------|--------------------------|
| Consistency       | Strong/Immediate        | Weak/Eventual            |
| Availability      | Lower (locks, blocks)   | Higher (always responds) |
| Partition Tol.    | Lower                   | Higher                   |
| Performance       | Slower (strict rules)   | Faster (relaxed)         |
| Use Case          | Banking, Financial      | Social Media, IoT        |
| Example           | PostgreSQL, MySQL       | MongoDB, Cassandra       |

// WHEN TO USE ACID

✅ Financial transactions
✅ Inventory management
✅ E-commerce orders
✅ Booking systems
✅ Data integrity critical

Example: E-commerce order
- Reduce inventory
- Create order
- Process payment
Must be atomic (all or nothing)

// WHEN TO USE BASE

✅ Social media (likes, comments)
✅ Real-time analytics
✅ IoT sensor data
✅ Logging systems
✅ High throughput required

Example: Twitter timeline
- Tweet posted
- Replicated to followers' timelines
- Small delay acceptable
- High availability needed

// EVENTUAL CONSISTENCY PATTERNS

// 1. Read-Your-Writes
User posts comment → Immediately sees their own comment
(Even if not yet replicated everywhere)

// 2. Monotonic Reads
User reads data → Always sees same or newer version
(Never sees older version after newer)

// 3. Monotonic Writes
User's writes are applied in order
(Write 1, then Write 2 → Never Write 2, then Write 1)

// MONGODB'S APPROACH (Configurable)

// Strong Consistency (ACID-like)
db.users.insertOne(
  { name: "John" },
  {
    writeConcern: { w: "majority" },
    readConcern: { level: "majority" }
  }
);

// Eventual Consistency (BASE-like)
db.users.insertOne(
  { name: "John" },
  {
    writeConcern: { w: 1 },
    readPreference: "secondary"
  }
);

// Best of both worlds: Configure per operation!

```

---

## 20. Denormalization

**Definition:** Denormalization is intentionally introducing redundancy by storing related data together to improve read performance.

**Key Points:**

- Opposite of normalization
- Duplicates data for faster reads
- Common in NoSQL (MongoDB)
- Trade-off: Faster reads vs slower writes, more storage
- Reduces need for joins
- Must keep duplicates in sync

**Example:**

```jsx
// NORMALIZED (SQL approach - avoid redundancy)

// Users table
{
  id: 1,
  name: "John Doe",
  email: "john@example.com"
}

// Posts table
{
  id: 101,
  title: "My Post",
  content: "...",
  authorId: 1  // Reference to user
}

// To get post with author:
// SELECT posts.*, users.name
// FROM posts
// JOIN users ON posts.authorId = users.id

// DENORMALIZED (MongoDB approach - embed data)

{
  _id: 101,
  title: "My Post",
  content: "...",
  author: {                    // Embedded (duplicated)
    id: 1,
    name: "John Doe",
    email: "john@example.com"
  }
}

// To get post with author:
// db.posts.findOne({ _id: 101 })
// Single query, no join!

// REAL-WORLD EXAMPLE: E-commerce

// Normalized (Multiple Collections)
// Products
{
  _id: 1,
  name: "Laptop",
  price: 999,
  categoryId: 10
}

// Categories
{
  _id: 10,
  name: "Electronics"
}

// Orders
{
  _id: 201,
  userId: 5,
  items: [
    { productId: 1, qty: 1 }
  ]
}

// Problem: Need 3 queries to display order with details!

// Denormalized (Single Collection)
{
  _id: 201,
  user: {
    id: 5,
    name: "Jane Doe",
    email: "jane@example.com"
  },
  items: [
    {
      productId: 1,
      name: "Laptop",           // Duplicated!
      price: 999,               // Duplicated!
      category: "Electronics",  // Duplicated!
      qty: 1
    }
  ],
  total: 999,
  createdAt: ISODate("2024-01-31")
}

// Benefits:
✅ Single query for complete order
✅ Fast reads
✅ Historical accuracy (price at purchase time)

// Challenges:
❌ Product name change → Must update all orders (or don't)
❌ More storage (duplicated data)
❌ Harder to ensure consistency

// DENORMALIZATION STRATEGIES

// 1. Embed Frequently Accessed Data
{
  _id: 1,
  title: "Blog Post",
  author: {
    name: "John",  // Embed name (read often)
    id: 123        // Reference for full profile
  }
}

// 2. Duplicate for Historical Accuracy
{
  _id: 201,
  productName: "Laptop",
  price: 999  // Price at purchase time, not current price
}

// 3. Pre-calculate Aggregations
{
  _id: 1,
  title: "Post",
  commentCount: 45,      // Denormalized count
  likesCount: 230,       // Updated on each like
  viewsCount: 1520
}

// Instead of: db.comments.count({ postId: 1 })

// 4. Hybrid Approach
{
  _id: 1,
  title: "Product",
  price: 999,
  reviews: [              // Embed recent 5 reviews
    { user: "John", rating: 5, text: "Great!" }
  ],
  reviewCount: 1240,     // Total count
  avgRating: 4.5         // Pre-calculated
}
// Full reviews in separate collection

// UPDATE PATTERNS

// Updating denormalized data

// When user changes name:
// Update user collection
db.users.updateOne(
  { _id: 1 },
  { $set: { name: "John Smith" } }
);

// Update all posts by this user
db.posts.updateMany(
  { "author.id": 1 },
  { $set: { "author.name": "John Smith" } }
);

// Update all comments by this user
db.comments.updateMany(
  { "user.id": 1 },
  { $set: { "user.name": "John Smith" } }
);

// WHEN TO DENORMALIZE

✅ Data read much more than written
✅ Embedded data rarely changes
✅ Need fast queries
✅ Acceptable to have slightly stale data
✅ Historical accuracy needed

// WHEN NOT TO DENORMALIZE

❌ Data changes frequently
❌ Need strong consistency
❌ Storage is limited
❌ Update complexity is too high

```

---

## Quick Interview Tips

1. **SQL vs NoSQL:**
   - SQL: Structured, ACID, vertical scaling, complex queries
   - NoSQL: Flexible, BASE, horizontal scaling, simple queries
2. **ACID Properties:** Atomicity (all/nothing), Consistency (valid state), Isolation (no interference), Durability (permanent)
3. **MongoDB Basics:**
   - Document-based (JSON-like BSON)
   - Collections → Documents → Fields
   - Flexible schema
4. **When to Embed vs Reference:**
   - Embed: One-to-one, one-to-few, data accessed together
   - Reference: One-to-many, many-to-many, frequently changing
5. **Indexing:** Create on frequently queried fields. Use explain() to check query performance.
6. **Aggregation Pipeline:** Stages like $match, $group, $sort, $project for complex queries
7. **Replication:** Multiple copies for high availability. Primary handles writes, secondaries replicate.
8. **Sharding:** Horizontal partitioning across machines. Choose good shard key (high cardinality, evenly distributed).
9. **CAP Theorem:**
   - Can only have 2 of 3: Consistency, Availability, Partition Tolerance
   - MongoDB is CP (Consistency + Partition Tolerance)
10. **Normalization:** Reduce redundancy (SQL). Denormalization: Duplicate for performance (NoSQL)
11. **Performance Tips:**
    - Create indexes
    - Use projections
    - Implement pagination
    - Put $match early in aggregation
    - Use explain()
12. **ObjectId:** 12-byte unique identifier. Contains timestamp, machine ID, process ID, counter.

Good luck with your MongoDB & DBMS interview! 🚀
