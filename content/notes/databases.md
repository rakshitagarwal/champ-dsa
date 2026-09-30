# Databases Interview Notes

> Frequently asked questions covering **MongoDB**, **MySQL**, and **PostgreSQL** in one place. SQL query deep dive → [SQL & DBMS](/notes/sql). Node integration → [Node](/notes/node). Hosting → [AWS](/notes/aws). Caching & stores → [system design](/system-design/postgresql).

---

## How to use this page

Interviewers often compare databases. Answer with **tradeoffs**, not religion:
- Relational (MySQL / PostgreSQL) when you need **strong schema, joins, transactions**
- MongoDB when you need **flexible documents, horizontal scale patterns, rapid iteration**
- Within SQL engines: **PostgreSQL** for features/standards; **MySQL** for simple, battle-tested web workloads (both are excellent)

---

# Part A — Cross-database fundamentals

## 1. SQL vs NoSQL

| | **SQL (MySQL / PostgreSQL)** | **NoSQL (MongoDB document)** |
|---|---|---|
| Data model | Tables, rows, fixed schema | Documents (BSON), flexible schema |
| Query | SQL, powerful joins | Query API / aggregation pipeline |
| Transactions | Mature ACID (InnoDB / Postgres) | Multi-doc ACID since 4.0 (with limits) |
| Scaling | Vertical + read replicas; sharding harder | Designed with horizontal scale in mind |
| Best for | Relational data, reporting, consistency | Variable shape docs, content, catalogs |

**Polyglot is normal:** Postgres for core ledger + Mongo for product content is a valid design.

## 2. ACID

| Property | Meaning |
|---|---|
| **Atomicity** | All-or-nothing transaction |
| **Consistency** | DB moves between valid states (constraints hold) |
| **Isolation** | Concurrent txns don't corrupt each other |
| **Durability** | Committed data survives crash (WAL / redo logs) |

## 3. CAP (distributed systems)

You pick tradeoffs under **partition**:
- **CP** — consistent, partition-tolerant (may refuse requests) — e.g. many relational primary setups
- **AP** — available, partition-tolerant (may serve stale) — e.g. eventual systems

CAP is about **network partitions**, not an excuse to ignore durability. Be precise in interviews.

## 4. Indexing (all three)

- Indexes speed **reads / filters / sorts**; slow **writes** (extra structures to maintain)
- **Selectivity** matters — indexing a boolean alone rarely helps
- **Covering index** — query answered from index alone
- Always verify with an explain plan (`EXPLAIN`, `explain()`)

## 5. Normalization vs denormalization

- **Normalize** (1NF–3NF/BCNF) — reduce duplication, protect integrity
- **Denormalize** — duplicate for read speed (caches, document embedding, summary tables)
- Mongo often **embeds** related data; SQL often **joins** normalized tables

---

# Part B — MongoDB FAQ

## 6. What is MongoDB?

**MongoDB** is a document-oriented NoSQL database. Data is stored as **BSON** documents (binary JSON) in **collections** (≈ tables), inside a **database**.

```js
// Document example
{
  _id: ObjectId("..."),
  name: "Ada",
  email: "ada@example.com",
  tags: ["admin", "beta"],
  address: { city: "London", zip: "E1" }
}
```

## 7. Database → collection → document

| SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Index | Index |
| Join | `$lookup` / embed / app-level |

**`_id`** is required and unique; auto `ObjectId` if omitted.

## 8. Why use MongoDB?

- Flexible / evolving schemas
- Nested documents & arrays map well to JSON APIs
- Horizontal scaling with **sharding**
- Rich **aggregation pipeline** for analytics-style transforms
- Secondary indexes, text search, geospatial, TTL indexes

**Not ideal when:** heavy multi-row relational constraints, complex multi-table transactions as the default pattern, or reporting that is naturally tabular with many joins.

## 9. Embedding vs referencing

**Embed** when data is read together and bounded in size (address on a user).

**Reference** (`ObjectId` to another collection) when:
- Data is shared many ways
- Arrays would grow unboundedly
- You need independent lifecycle / access patterns

Interview rule: **favor embed for 1:few; reference for 1:many unbounded or many:many.**

## 10. Common CRUD

```js
db.users.insertOne({ name: "Ada", age: 36 });
db.users.find({ age: { $gte: 30 } }).sort({ name: 1 }).limit(10);
db.users.updateOne({ _id: id }, { $set: { age: 37 }, $inc: { loginCount: 1 } });
db.users.deleteMany({ inactive: true });
```

Useful operators: `$set`, `$unset`, `$inc`, `$push`, `$pull`, `$in`, `$or`, `$elemMatch`.

## 11. Aggregation pipeline

Stages transform a stream of documents:

```js
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]);
```

Common stages: `$match`, `$group`, `$project`, `$sort`, `$limit`, `$lookup`, `$unwind`, `$addFields`.

Put **`$match` early** to cut documents before expensive stages.

## 12. Indexes in MongoDB

```js
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ "address.city": 1, age: -1 }); // compound
db.users.createIndex({ bio: "text" });
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // TTL
```

- **Compound index** order: equality → sort → range (ESR rule)
- **Multikey** indexes on arrays
- **Partial / sparse** indexes for subsets
- `explain("executionStats")` to confirm `IXSCAN` not `COLLSCAN`

## 13. Replica sets & sharding

**Replica set** — primary + secondaries for HA and read scaling (with caveats on consistency).

**Sharding** — partition data across shards by a **shard key**. Choose shard key carefully (high cardinality, even distribution, supports common queries). Avoid monotonically increasing keys without hashed sharding (hot shard).

## 14. Transactions in MongoDB

- Single-document updates are atomic
- **Multi-document ACID transactions** available (replica set / sharded) since 4.0/4.2
- Still costlier — design so most writes stay single-document when possible

## 15. Schema design tips

- Model for **read patterns** first
- Avoid unbounded arrays
- Use consistent field types
- Validate with **JSON Schema validation** when you need guardrails
- Store money as decimal/integer cents carefully (Binary Decimal / app-level)

## 16. MongoDB quick FAQ

**Is MongoDB schemaless?**  
Flexible schema — documents in a collection *can* differ. You usually still enforce a schema in the app or with validators.

**What is BSON?**  
Binary JSON — supports extra types (`ObjectId`, `Date`, `Decimal128`, BinData).

**`$lookup` vs embed?**  
`$lookup` is a left outer join-like stage — useful but not a reason to model everything relationally.

**WiredTiger?**  
Default storage engine — document-level concurrency, compression.

---

# Part C — MySQL FAQ

## 17. What is MySQL?

**MySQL** is an open-source **relational** database, widely used for web apps. Owned by Oracle; popular engines: **InnoDB** (default, transactional) and historically MyISAM (avoid for new transactional work).

## 18. Why InnoDB?

- Row-level locking
- **ACID** transactions
- Foreign keys
- Crash recovery via redo/undo logs
- MVCC-style consistent reads

MyISAM: table-level locks, no transactions — legacy.

## 19. Core SQL mental model

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

SELECT u.id, u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING order_count > 0
ORDER BY order_count DESC
LIMIT 20;
```

Know: `JOIN` types, `GROUP BY`, `HAVING` vs `WHERE`, indexes, transactions.

## 20. Keys & constraints

| Constraint | Role |
|---|---|
| `PRIMARY KEY` | Unique row identity |
| `FOREIGN KEY` | Referential integrity (InnoDB) |
| `UNIQUE` | No duplicate values |
| `NOT NULL` | Required |
| `CHECK` | Value rules (supported in modern MySQL) |

## 21. Indexes in MySQL

- **B-Tree** indexes (default) for `=`, `>`, `BETWEEN`, `LIKE 'abc%'`
- **Composite** — leftmost prefix rule: index `(a,b,c)` helps `a`, `a,b`, `a,b,c` — not `b` alone
- **Covering index** — `Using index` in `EXPLAIN`
- **Fulltext** for text search (InnoDB)
- Avoid functions on indexed columns in `WHERE` (`WHERE YEAR(col)=2024` can't use plain index well)

```sql
EXPLAIN SELECT * FROM users WHERE email = 'a@b.com';
```

Look for `type: ref/const`, `key` used, low `rows` estimate.

## 22. Transactions & isolation (MySQL)

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- or ROLLBACK
```

Isolation levels: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ` (**InnoDB default**), `SERIALIZABLE`.

Know phenomena: dirty read, non-repeatable read, phantom read. InnoDB RR uses MVCC + gap locks to reduce phantoms.

## 23. Locks

- **Shared (read)** vs **exclusive (write)**
- Row locks, gap locks, next-key locks (InnoDB)
- Long transactions hold locks → pile-up; keep txns short
- `SELECT ... FOR UPDATE` — lock rows to update

## 24. Replication (MySQL)

Typical: **primary–replica** (async or semi-sync).
- Writes → primary
- Reads → replicas (watch replication lag)
- Binlog streams changes

**Failover** — promote replica; tools like Orchestrator / managed RDS help.

## 25. MySQL vs PostgreSQL (short)

| | MySQL | PostgreSQL |
|---|---|---|
| Defaults | Simple, ubiquitous hosting | Feature-rich, standards-heavy |
| JSON | Supported; Postgres JSONB often richer | Excellent JSONB + indexing |
| Extensibility | Less | Extensions (PostGIS, etc.) |
| Windows functions / CTEs | Solid in modern versions | Long-time strength |
| Strictness | Historically more forgiving | Stricter types/SQL |

Both handle typical CRUD apps well. Pick based on team skill, hosting, and features (GIS, complex analytics → often Postgres).

## 26. MySQL quick FAQ

**`DELETE` vs `TRUNCATE` vs `DROP`?**  
`DELETE` — row removals (can `WHERE`, logged); `TRUNCATE` — empty table fast, resets AI; `DROP` — remove table.

**`VARCHAR` vs `CHAR`?**  
Variable vs fixed length. Prefer `VARCHAR` for most strings.

**Why is my query slow?**  
Missing index, bad cardinality, `SELECT *`, N+1 from app, lock waits, huge offset pagination (`LIMIT` large offset).

**Connection pooling?**  
Use pooler (app pool, ProxySQL) — opening a connection per request is expensive.

---

# Part D — PostgreSQL FAQ

## 27. What is PostgreSQL?

**PostgreSQL** is an open-source, highly standards-compliant **object-relational** database. Known for reliability, advanced types, extensibility, and strong SQL features.

## 28. Why teams choose Postgres

- Rich types: `JSONB`, `ARRAY`, `UUID`, `INET`, range types
- **JSONB** indexing (`GIN`) — document-like flexibility inside SQL
- Window functions, CTEs, `DISTINCT ON`, full-text search
- MVCC, strong ACID
- Extensions: **PostGIS**, `pg_trgm`, `uuid-ossp` / `pgcrypto`
- Partial indexes, expression indexes

## 29. Basic DDL / types

```sql
CREATE TABLE products (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  attrs      JSONB NOT NULL DEFAULT '{}',
  tags       TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX products_attrs_gin ON products USING GIN (attrs);
CREATE INDEX products_name_trgm ON products USING GIN (name gin_trgm_ops);
```

**`TEXT` vs `VARCHAR`:** in Postgres, prefer `TEXT` unless you have a real length constraint; `VARCHAR(n)` isn't faster.

**`TIMESTAMPTZ`** — store instants in UTC with timezone awareness; preferred over naive `TIMESTAMP`.

## 30. JSONB (frequent interview topic)

```sql
SELECT * FROM products WHERE attrs->>'brand' = 'Acme';
SELECT * FROM products WHERE attrs @> '{"color":"red"}';
```

- **`JSON`** — text storage, preserve formatting
- **`JSONB`** — binary, indexable, preferred for querying
- Operators: `->`, `->>`, `@>`, `?`, `JSONB_SET`

Use JSONB for semi-structured attrs; keep core relational columns for joins/constraints.

## 31. Indexes in PostgreSQL

| Type | Use |
|---|---|
| **B-Tree** | Default equality/range |
| **GIN** | JSONB, arrays, full-text |
| **GiST** | Geometric / full-text / ranges |
| **BRIN** | Very large append-only time-series-ish tables |
| **Hash** | Simple equality (less common) |

**Partial index:**
```sql
CREATE INDEX ON orders (user_id) WHERE status = 'open';
```

**Expression index:**
```sql
CREATE INDEX ON users (lower(email));
```

`EXPLAIN (ANALYZE, BUFFERS)` — gold standard for tuning.

## 32. MVCC & vacuum

Postgres uses **MVCC**: updates create new row versions; readers don't block writers the same way as lock-heavy designs.

**Dead tuples** accumulate → **VACUUM** reclaims. **Autovacuum** usually handles this; tune for write-heavy tables.

**VACUUM FULL** rewrites the table (locks) — rare, maintenance only.

**Transaction IDs** — extreme long-running txns can cause wraparound risk; don't leave idle-in-transaction connections forever.

## 33. Transactions & isolation (Postgres)

Default isolation: **READ COMMITTED**.

Also: `REPEATABLE READ`, `SERIALIZABLE` (true serializable via SSI).

```sql
BEGIN;
UPDATE ...;
SAVEPOINT sp1;
-- maybe ROLLBACK TO sp1;
COMMIT;
```

## 34. Locks & `FOR UPDATE`

```sql
SELECT * FROM seats WHERE id = 42 FOR UPDATE; -- lock row until txn ends
```

Know deadlocks: Postgres detects and aborts one txn — retry safely.

## 35. Replication & HA

- **Streaming replication** — primary → hot standbys
- **Logical replication** — table-level, upgrades, CDC-style flows
- Managed: RDS / Cloud SQL / Aurora / Neon / Supabase

**Failover** — promote standby; use connection poolers (**PgBouncer**) in front.

## 36. Connection pooling

Postgres process-per-connection is relatively heavy. Use:
- **PgBouncer** (transaction pooling common)
- App-side pools with sane caps

## 37. Full-text search (basic)

```sql
SELECT * FROM articles
WHERE to_tsvector('english', body) @@ plainto_tsquery('english', 'devops postgres');
```

For serious search, sometimes Elasticsearch — but Postgres FTS + `pg_trgm` covers many apps.

## 38. PostgreSQL quick FAQ

**MySQL or Postgres?**  
Postgres if you want JSONB, extensions, stricter SQL, advanced analytics features. MySQL if that's your org standard / hosting — both are production-proven.

**What is `NULL` behavior?**  
`NULL` means unknown; `NULL = NULL` is not true; use `IS NULL`. Unique constraints allow multiple `NULL`s (unless `UNIQUE NULLS NOT DISTINCT` in newer versions).

**Migrations?**  
Expand/contract pattern: add new column → backfill → switch reads/writes → drop old. Avoid long locks.

**`DELETE` vs soft delete?**  
Soft delete (`deleted_at`) for recoverability; index partial `WHERE deleted_at IS NULL`.

---

# Part E — Comparison cheat sheet

## 39. Side-by-side

| Topic | MongoDB | MySQL | PostgreSQL |
|---|---|---|---|
| Model | Documents | Relational | Relational (+ JSONB) |
| Schema | Flexible | Fixed (ALTER to change) | Fixed (flexible with JSONB) |
| Joins | `$lookup` / embed | First-class | First-class |
| Transactions | Multi-doc supported; single-doc natural | InnoDB ACID | ACID, strong |
| Horizontal scale | Sharding built-in | Sharding external / Vitess | Citus / sharding patterns |
| Full-text | Text indexes | FULLTEXT | FTS + trigram |
| Ideal fit | Variable docs, content, IoT events | Classic web OLTP | Complex queries, GIS, hybrid JSON |

## 40. "Which database would you choose?" framework

1. **Data shape** — tabular relations vs nested documents  
2. **Consistency** — money/ledger → relational + strong txns  
3. **Query patterns** — joins/reporting vs document fetch by key  
4. **Scale** — single primary enough? read replicas? shard?  
5. **Team & ops** — what can you run well at 3 a.m.?  
6. **Ecosystem** — ORMs, hosting, backups, point-in-time recovery  

Example answers:
- **Payments / inventory:** PostgreSQL or MySQL (InnoDB)
- **CMS product pages with varying attributes:** MongoDB or Postgres JSONB
- **High write event log with flexible payload:** MongoDB or Postgres + JSONB / partitioned tables
- **Geo queries:** PostgreSQL + PostGIS

## 41. Shared production checklist

- Backups + **restore drills** (backup alone is not a strategy)
- Point-in-time recovery where available
- Monitoring: connections, slow queries, replication lag, disk, bloat/vacuum
- Least-privilege DB users
- Migrations reviewed like code
- Pooling and timeouts set
- Never expose DB to the public internet

---

## 42. One-minute closing pitch

"I'd default to **PostgreSQL** for relational systems that may need JSONB and strong SQL, **MySQL** when the stack is already standardized on it, and **MongoDB** when the natural unit of data is a flexible document and access patterns favor embedding. I design indexes from real queries, keep transactions short, and verify plans with `EXPLAIN` — and I choose the store from consistency, query shape, and operational fit, not hype."

---

## 43. Node Full Stack JD — database interview Q&A

JDs that say *"Experience with MongoDB / MySQL / PostgreSQL"* usually ask **choice + practical CRUD + indexing + one production story**.

**Q: Which DB have you used professionally, and for what?**  
A: Prepare one sentence each. Example: "Postgres for orders (transactions/joins), Mongo for product catalog with varying attributes, MySQL on an older module we inherited." Honesty + tradeoffs beat claiming everything deeply.

**Q: How do you connect Node to these DBs?**  
A: **Mongo** — Mongoose or official driver. **MySQL** — `mysql2` pool or Sequelize/Knex/Prisma. **Postgres** — `pg` Pool or Prisma/Knex/TypeORM. Always pool; configure pool size to DB `max_connections`.

**Q: ORM vs query builder vs raw SQL?**  
A: ORM (Prisma/Mongoose) for speed and safety; raw/`$queryRaw` for complex reports; never concatenate user input into SQL strings.

**Q: How do you avoid N+1 in Node?**  
A: Mongo: careful `populate` / aggregation. SQL: JOINs or batched `WHERE id IN (...)`. Graph-like APIs: DataLoader pattern. Log query counts in dev.

**Q: Migrations in a team?**  
A: Expand/contract. PR includes migration + code. Run migrations in CI/staging first. Avoid irreversible data deletes without backup. Prisma migrate / Knex / Liquibase / Flyway — name yours.

**Q: Transactions example (transfer money / place order)?**  
A: Begin → debit stock + create order + payment row → commit; on error rollback. In Mongo use multi-doc txn only when needed; prefer single-document atomic updates when design allows.

**Q: Indexing for `GET /users?email=`?**  
A: Unique index on `email`. For `status + createdAt` filters/sorts → composite index matching filter order. Confirm with `EXPLAIN` / `explain()`.

**Q: Pagination — offset vs cursor?**  
A: Offset (`LIMIT/OFFSET`) simple but slow on deep pages. Cursor (`WHERE id > :last ORDER BY id LIMIT n`) stable for large feeds.

**Q: Soft delete?**  
A: `deleted_at` timestamp; default queries filter `NULL`; unique indexes often partial (`WHERE deleted_at IS NULL`).

**Q: How do you secure DB access from a Node app on AWS?**  
A: Private subnet RDS, SG only from app, credentials in Secrets Manager, least-privilege DB user, TLS to DB if required. See [AWS](/notes/aws).

**Q: Backup strategy one-liner?**  
A: Automated daily snapshots + tested restore drill; for prod prefer PITR (RDS). Backups that were never restored are wishful thinking.

**Q: Mongo embedding vs SQL join — same feature (user + addresses)?**  
A: Few addresses always loaded with user → embed in Mongo or JSONB. Shared addresses / query addresses alone → separate collection/table + reference/FK.

**Q: What causes "too many connections"?**  
A: New pool per request, Lambda concurrency without pooler, forgotten clients in tests. Fix: singleton pool, PgBouncer, cap app replicas × pool size.

---
