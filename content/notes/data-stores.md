# Redis, DynamoDB & Elasticsearch

> **Goal:** Know what each store is *for*, how it fails, and when Postgres is still the right answer. Seniors do not say "put it in Redis" — they say what is cached, how it dies, and who is the source of truth. Complements [HLD notes](/notes/system-design-hld) and [SQL & DBMS](/notes/sql).

---

## Why more than one database

A food-delivery app does not have one kind of data:

- **Orders** must not vanish and must stay consistent (card charged ⇔ order created). That is a **system of record** — usually **Postgres**.
- **The same restaurant page** is hit 10,000 times at lunch. Re-running the SQL every time is waste. That is a **cache** — usually **Redis**.
- **Search** "biryani near me, open now, 4+ stars" is not a SQL `LIKE`. That is a **search index** — usually **Elasticsearch**.
- **Session / huge key-value at AWS scale** with known lookup patterns can be **DynamoDB**.

Each tool is fast at **one access pattern**. Using the wrong one is how you get a 2 a.m. incident.

**Rule:** pick the **source of truth** first (almost always Postgres or Dynamo). Everything else is a **copy** you can rebuild.

---

## Redis

**Redis** is an in-memory data store. Think of a notebook on your desk: reading a page is ~1 ms. Postgres is a filing cabinet down the hall (~1–10 ms, more under load).

It is not "a faster Postgres." It is a **data structure server**: strings, hashes, lists, sets, sorted sets, streams. You talk in commands (`GET`, `HSET`, `ZADD`), not SQL joins.

### What Redis is good at

- **Cache** — hot reads: product pages, sessions, rendered feeds
- **Counters and rate limits** — `INCR` + TTL
- **Distributed locks** — "only one worker processes this order" (with care)
- **Short-lived coordination** — presence, job progress, feature-flag payloads
- **Pub/Sub** — shout in a room (if nobody listens, the shout is gone)
- **Streams / lists** — small job queues (BullMQ sits on Redis)

### What Redis is not

- Your **order ledger**. Memory + eviction means data can disappear unless you treat persistence as a first-class design (and even then, it is the wrong product for multi-row transactions and ad-hoc queries).
- A warehouse for 10 TB of history. RAM is expensive.

**Interview phrase:** *"Redis is a cache and a coordination tool. Postgres remains the source of truth for money and orders."*

### Data types (enough to design)

| Type | Picture | Example |
|------|---------|---------|
| **String** | One value | `user:42:session` → token, or cached JSON |
| **Hash** | Object with fields | `user:42` → `{ name, email }` without rewriting the whole blob |
| **List** | Queue / timeline | recent events, simple job lists |
| **Set** | Unique bag | "users currently online" |
| **Sorted set** | Set with a score | leaderboard, "next job by time" |
| **Stream** | Append-only log (small) | consumer groups for jobs |

**TTL** — every cache key should expire (`EXPIRE` / `SET … EX`). A key without TTL is how Redis fills the box and starts evicting **the wrong** data.

**Eviction:** when memory is full, Redis drops keys by policy (`allkeys-lru` is the usual cache choice: least recently used). If this box is a cache, that is fine. If you thought it was a database, you just lost rows.

### Persistence (so you do not lie in interviews)

Redis **can** write to disk:

- **RDB** — snapshot now and then. Fast restart, you can lose the last few minutes.
- **AOF** — log every write. Safer, slower, more disk.

Cache-only Redis: persistence is optional. Session store: at least AOF or accept "everyone logs in again." **Never** pretend snapshot + AOF makes Redis equal to Postgres ACID.

### Cache-aside (the default pattern)

```
1. Read Redis for key
2. Hit? return it
3. Miss? read Postgres → write Redis with TTL → return
```

On write: update Postgres, then **delete** (or update) the cache key. Deleting is simpler than trying to keep two writes in sync. Next read rebuilds.

Other names you will hear:

| Pattern | Who writes the cache | Risk |
|---------|----------------------|------|
| **Cache-aside** | App on read miss | Stale until TTL if you forget to invalidate |
| **Write-through** | App writes DB and cache together | Slower writes; still need failure handling |
| **Write-behind** | App writes cache; DB later | Fast, can lose data if Redis dies |

Seniors default to **cache-aside + TTL + delete-on-write**.

### Stampede (thundering herd)

A popular key expires. 2,000 requests miss at once and all hit Postgres. The database falls over because of **success**.

Mitigations (name one in an interview):

- **Lock / singleflight** — only one request rebuilds; others wait
- **Soft TTL** — serve stale for a few seconds while one worker refreshes
- **Random jitter** on TTL so keys do not expire in the same millisecond

### Other Redis jobs

**Sessions:** `session:{id}` → user id, TTL = idle timeout. All app servers share Redis. In-memory `Map` does **not** work behind two instances.

**Rate limit:** sliding window or counter per `userId` + minute. Return **429**. Details in [LLD rate limiter](/notes/system-design-lld).

**Lock:** `SET lock:order:9 NX EX 10` — set only if missing, auto-expire so a dead worker cannot lock forever. Unlock only if you still own the token. Locks are easy to get wrong; keep the critical section tiny.

**Pub/Sub:** good for "reload config" and live notifications if loss is OK. Not a durable queue. Durable work → [message brokers](/notes/message-brokers).

### Clustering and ops (interview level)

- **Replica** — extra read copy; failover if you set it up
- **Cluster / sharding** — split keys across nodes; a multi-key command can fail if keys hash to different slots
- **Hot key** — one celebrity key on one shard. Same problem as a hot Dynamo partition

Monitor: memory used, evictions, hit ratio, CPU. A 100% hit ratio is suspicious (maybe you never invalidate). A 0% hit ratio means Redis is decoration.

---

## DynamoDB

**DynamoDB** is AWS's managed **key-value / document** database. You do not manage servers. You **do** have to know your queries **before** you create the table.

Everyday picture: a huge wall of **labeled drawers**. Opening drawer `USER#42` is extremely fast. Asking "every user in Bangalore who ordered biryani last week" is slow **unless** you built a drawer label for that question in advance.

### Building blocks

| Word | Meaning |
|------|---------|
| **Table** | A collection of items (one table can hold several entity types) |
| **Item** | One JSON-like document, up to 400 KB |
| **Partition key (PK)** | Which drawer. Required. Determines which machine holds the item |
| **Sort key (SK)** | Order inside the drawer. Optional. Lets you query a range (`ORDERS#2024` …) |
| **Primary key** | PK, or PK + SK |

```
PK              SK                 attrs
USER#42         PROFILE            name, email
USER#42         ORDER#1001         total, status
USER#42         ORDER#1002         total, status
```

Query: `PK = USER#42 and SK begins_with ORDER#` → that user's orders. Fast.  
Query: `status = PAID` across all users → **full table scan** unless you added an index. Scans do not belong in the hot path.

### Indexes

**LSI (local secondary index)** — same PK, different SK. Rare in new designs; 10 GB cap per partition key.

**GSI (global secondary index)** — a **second** PK/SK you can query. Example: GSI PK = `email` so login can look up the user without knowing `userId`.

Every extra GSI is another copy to write. You pay in money and write latency.

### Capacity and consistency

| Idea | Meaning |
|------|---------|
| **On-demand** | Pay per request. Fine until the bill surprises you |
| **Provisioned RCU/WCU** | You reserve read/write units. Cheaper at steady load |
| **Eventually consistent read** | Default. May be a few ms behind a write |
| **Strongly consistent read** | Fresh, only on the base table, not on all GSIs, more cost |

**Hot partition:** if every write uses PK = `"global"` or PK = a celebrity `userId`, one drawer takes all the heat. Dynamo will throttle (**ProvisionedThroughputExceeded**). Spread keys (user id, hashed tenant, time buckets for time-series).

### Single-table design (what interviewers mean)

Instead of `Users` table + `Orders` table, you store several **entity types** in **one** table, distinguished by PK/SK prefixes (`USER#`, `ORDER#`). One `Query` can fetch a user and their recent orders in one round trip.

This is not magic. It is **denormalization with a naming convention**. You still model access patterns on paper first:

1. Get user by id
2. List orders for user
3. Get user by email (GSI)

If you cannot list the access patterns, you are not ready for Dynamo. Use **Postgres**.

### When Dynamo wins vs Postgres

| Choose Dynamo | Choose Postgres |
|---------------|-----------------|
| Access patterns are few and known | Ad-hoc queries, reports, joins |
| Huge scale, AWS-native, little ops | Strong multi-row transactions, flexible filters |
| Key lookup and time-ordered items per user | Relational integrity, SQL, ORMs your team knows |

**Dynamo Streams** — a change log you can pipe to Lambda / Elasticsearch / analytics. Same idea as Kafka CDC, smaller scope.

**TTL** — Dynamo can drop items at a timestamp (sessions, temp tokens).

**Interview phrase:** *"I would use Dynamo only if I can list the queries. Partition key must spread load. Postgres if we still need joins and unknown filters."*

---

## Elasticsearch

**Elasticsearch (ES)** is a **search engine**, not your source of truth. It answers "find documents that **match this text**, ranked by relevance."

Everyday picture: the **index at the back of a textbook**. The word "latency" points to pages 12, 48, 90. You do not reread the whole book. That index is an **inverted index**: token → list of document ids.

`LIKE '%biryani%'` in Postgres walks rows. ES walks an index of words. Different tool.

### How a search request flows

```
1. App writes Order to Postgres (source of truth)
2. Async (queue / listener) indexes a JSON document into ES
3. User types "biryani koramangala"
4. ES tokenizes, finds candidates, ranks, returns ids
5. App may hydrate full records from Postgres (or store enough fields in ES)
```

Step 2 is **eventually consistent**. A new restaurant can take seconds to become searchable. Say that out loud in interviews.

### Mapping and analysis (the schema ES actually has)

- **Mapping** — field types: `text` (analyzed, for search), `keyword` (exact: ids, enums, sort), `date`, `geo_point`
- **Analyzer** — lowercase, split on punctuation, maybe stemming (`running` → `run`)

Wrong mapping is the classic foot-gun: you stored `userId` as `text`, then `term` query for `"u_1"` misses because it was tokenized. Ids and statuses should be **keyword**.

### What ES is good at

- Product / job / log search with typos, relevance, facets (filters on brand, city)
- Autocomplete (completion suggester or prefix)
- Log analytics (ELK: Elasticsearch, Logstash/Fluent, Kibana)
- Geo filters ("within 5 km")

### What ES is not

- The database you charge cards against
- A SQL replacement (joins are awkward; parent/child exists but you will regret treating ES like Postgres)
- Instantly consistent with your write path unless you wait on refresh (usually you should not)

**Keep the source of truth in Postgres/Dynamo.** If ES dies, search is down; orders still work. Rebuild the index from the source.

### Cluster words (interview level)

| Word | Meaning |
|------|---------|
| **Index** | Like a table of documents |
| **Document** | One JSON object |
| **Shard** | Slice of an index on a node (parallel + size) |
| **Replica** | Copy of a shard for reads and failover |

More shards ≠ always faster. Too many small shards waste memory. You will not be asked to tune this on a whiteboard — know that shards exist and that **disk full** is a common outage.

### Sync patterns

- **On write** — API writes DB, publishes `OrderPlaced`, indexer upserts ES ([outbox](/notes/message-brokers) so you do not dual-write blindly)
- **Bulk reindex** — new mapping, replay from DB
- **CDC** — Dynamo Streams / Postgres WAL → indexer

Never "the API only writes ES." Restores and conflicts will hurt you.

---

## How they fit in one stack

A senior drawing:

```
Client
  → API
      → Postgres     (orders, users, money)
      → Redis        (hot reads, sessions, rate limits)
      → DynamoDB     (optional: huge key-value, sessions at AWS scale)
      → ES           (search box)
      → S3           (PDFs, images)
      → Queue        (index ES, send email)
```

**Example: job portal**

- Postgres: companies, applications (truth)
- Redis: cached job detail, "apply" rate limit
- ES: job search with filters
- S3: resumes
- Kafka/SQS: "application submitted" → email + ES update

You do not need every box on day one. **Postgres + Redis** ships most products. Add ES when `LIKE` search is embarrassing. Add Dynamo when a specific access pattern is huge and already known.

---

## Choosing quickly

| Need | Reach for |
|------|-----------|
| Money, relations, reports, unknown queries | **Postgres** |
| Hot read, session, rate limit, lock | **Redis** |
| AWS key lookup, huge scale, known queries | **DynamoDB** |
| Full-text, relevance, logs, geo search | **Elasticsearch** |
| Huge blobs | **S3**, not any of the above |
| "Search my SQL table a bit" | Postgres **full-text** (`tsvector`) before standing up ES |

**Decision questions:**

1. Is this the **source of truth** or a **copy**?
2. Do we know the queries **today**?
3. What happens if this store is **empty** for an hour?
4. How do we **rebuild** the copy (cache flush, ES reindex)?

If you cannot rebuild it, it was not a cache — it was an unbacked database.

---

## Interview checklist

- [ ] Named a **source of truth** (usually Postgres)
- [ ] Redis: cache-aside, TTL, invalidation, stampede in one sentence
- [ ] Did not put orders-only in Redis
- [ ] Dynamo: partition key, hot partition, "I listed access patterns"
- [ ] ES: inverted index, async index, mapping keyword vs text
- [ ] ES down ≠ payments down
- [ ] Rebuild story for cache and search

**Phrase:** *"Postgres holds truth. Redis makes hot reads cheap. Elasticsearch makes search usable. Dynamo is for known key-value at AWS scale — not for ad-hoc SQL."*

**Related:** [HLD](/notes/system-design-hld), [SQL](/notes/sql), [Performance](/notes/performance), [Message brokers](/notes/message-brokers).
