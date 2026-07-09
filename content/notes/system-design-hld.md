# System Design — High-Level Design (HLD)

> **What seniors are evaluated on:** Trade-offs at architecture level — not class diagrams. Clarify scale, draw boxes, estimate capacity, deep-dive two components, defend choices.

For class-level design (SOLID, patterns, APIs), see [System Design — LLD](/notes/system-design-lld).

---

## 0. Senior HLD interview flow

Use this order in every round:

1. **Clarify requirements** — functional (must-have vs nice-to-have), non-functional (scale, latency, availability), constraints (budget, team size)
2. **Capacity estimate** — DAU, QPS, storage (see section 25)
3. **High-level diagram** — clients, LB, services, caches, DBs, queues — label read vs write paths
4. **Deep-dive 2 components** — usually storage + one hot path (feed, chat, shorten URL)
5. **Trade-offs** — consistency vs availability, sync vs async, build vs buy
6. **Failure modes** — what breaks first under 10x load; how you observe and recover

**Phrase to use:** *"I'd start simple with a monolith and clear schema, then extract services when we hit a scaling or team boundary — not before we have traffic data."*

---

## 0.1 Quick architecture sketches

### URL shortener (read-heavy)

Client → LB → API servers → Redis (hot URLs) → DB (shortId, longUrl). Hash or base62 ID generation. 301 vs 302 for analytics. Cache aside on read.

### News feed (write fan-out vs read fan-out)

**Fan-out on write:** Push to followers' feeds on post — good for small follower counts.
**Fan-out on read:** Merge on read — good for celebrities with millions of followers.
Hybrid: push for normal users, pull for celebrities.

### Chat (real-time)

WebSocket gateway → message service → queue (Kafka) for persistence → DB for history. Offline store-and-forward. Presence via heartbeat + Redis.

### Rate-limited public API

API gateway → token bucket in Redis per user/IP → backend services. 429 + Retry-After. Distributed Redis cluster for shared counters.

Class-level detail for these → [LLD notes](/notes/system-design-lld).

---

## 1. What is High-Level Design?

High-Level Design (HLD) defines the **architecture** of a system — the major components, how they communicate, data flow, storage choices, and scaling strategy. It answers *"What are the boxes and arrows?"* without diving into class diagrams or method signatures.

For component-level design (classes, APIs, schemas), see [System Design — LLD](/notes/system-design-lld).

| Aspect | High-Level Design (HLD) | Low-Level Design (LLD) |
|---|---|---|
| **Focus** | System architecture, components, data flow | Classes, APIs, database schemas, algorithms |
| **Audience** | Architects, senior engineers | Implementing engineers |
| **Questions answered** | What services? How do they scale? Where is data stored? | How is this class structured? What's the API contract? |
| **Artifacts** | Architecture diagrams, capacity estimates | Class diagrams, sequence diagrams, API specs |
| **Interview depth** | Trade-offs, bottlenecks, failure modes | SOLID, design patterns, code structure |

**Why HLD matters:**
- Ensures scalability, reliability, and maintainability at the architecture level
- Helps identify bottlenecks and trade-offs before implementation
- Critical for distributed systems handling large-scale traffic

---

## 2. Key Concepts & Terminology

| Term | Definition |
|---|---|
| **Scalability** | Ability to handle increased load by adding resources |
| **Latency** | Time taken for a request to be processed |
| **Throughput** | Number of requests processed per unit time |
| **Availability** | % of time the system is operational (uptime) |
| **Reliability** | Probability the system functions correctly over time |
| **Consistency** | All nodes see the same data at the same time |
| **Durability** | Data persists after writes are confirmed |
| **Fault Tolerance** | System continues operating despite component failures |

**Latency vs Throughput:** Low latency doesn't guarantee high throughput (e.g., single-lane road with fast cars vs multi-lane road with slower cars).

---

## 3. Vertical vs Horizontal Scaling

**Vertical Scaling (Scale Up):**
- Add more power to existing machine (CPU, RAM, disk)
- Limited by hardware capacity; single point of failure
- Simple but expensive; downtime during upgrade

**Horizontal Scaling (Scale Out):**
- Add more machines to the pool
- Virtually unlimited; better fault tolerance
- Requires load balancer, distributed coordination
- Preferred for large-scale systems

**Trade-off:** Vertical is simpler but has a ceiling. Horizontal is complex but elastic.

---

## 4. Load Balancing

A load balancer distributes incoming traffic across multiple servers to prevent any single server from becoming overwhelmed.

**Types:**
- **Layer 4 (Transport)** — routes based on IP + TCP ports (faster, no content inspection)
- **Layer 7 (Application)** — routes based on HTTP headers, cookies, URL paths (more intelligent)

**Algorithms:**
- Round Robin — simple, equal distribution
- Least Connections — sends request to server with fewest active connections
- Weighted Round Robin — based on server capacity
- IP Hash — consistent routing per client IP (useful for sticky sessions)
- Geographic — routes based on user location

**Health checks:** LB periodically pings servers; unhealthy servers are removed from rotation.

**Placement:** Between client and server (reverse proxy), between services (internal LB).

---

## 5. Caching

Caching stores frequently accessed data in a fast-access layer to reduce latency and database load.

**Caching layers:**
- **Client-side** — browser cache, local storage
- **CDN** — caches static assets at edge locations
- **Application cache** — in-memory (Redis, Memcached)
- **Database cache** — query cache, buffer pool

**Cache strategies:**

| Strategy | Description | Use case |
|---|---|---|
| **Cache Aside** | App checks cache first; on miss, loads from DB and populates cache | General purpose |
| **Read Through** | Cache is always in sync — cache layer loads from DB on miss | Consistent reads |
| **Write Through** | Write to cache first, then DB (always consistent, higher latency) | Write-heavy |
| **Write Behind** | Write to cache, async write to DB (fast, risk of data loss) | High throughput |
| **Write Around** | Write directly to DB; cache is populated on read | Rarely read data |

**Eviction policies:** LRU (most common), LFU, FIFO, TTL-based.

**Cache invalidation:** Hardest problem in caching — stale data must be updated or expired.

---

## 6. Content Delivery Network (CDN)

CDN is a geographically distributed network of proxy servers that deliver static (and sometimes dynamic) content from locations closer to the user.

**How it works:**
1. User requests content; DNS resolves to nearest CDN edge server
2. If edge has the content (cache hit), it serves immediately
3. If not (cache miss), edge fetches from origin server, caches, and serves

**Benefits:** Reduced latency, offloaded origin traffic, DDoS protection.

**Trade-offs:** Cache invalidation complexity, cost, not ideal for dynamic personalized content.

---

## 7. DNS (Domain Name System)

DNS translates human-readable domain names to IP addresses.

**Resolution flow:**
1. Browser checks local cache
2. Recursive resolver checks its cache
3. Root nameserver → TLD nameserver → Authoritative nameserver
4. Returns IP address; response is cached (TTL-based)

**DNS record types:** A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (arbitrary), NS (nameserver).

**DNS-based load balancing:** Multiple A records for same domain; clients pick randomly or round-robin.

---

## 8. Database Design

### 8.1 SQL vs NoSQL

| Factor | SQL (Relational) | NoSQL |
|---|---|---|
| **Schema** | Fixed, rigid | Flexible, dynamic |
| **Relations** | Foreign keys, JOINs | Denormalized, embedded docs |
| **Scaling** | Vertical (mostly) | Horizontal (sharding built-in) |
| **ACID** | Full support | Often BASE (eventual consistency) |
| **Use case** | Complex queries, transactions | High volume, flexible schema, rapid iteration |

### 8.2 Indexing

Indexes speed up read queries at the cost of slower writes and extra storage.

- **B-Tree index** — default in most DBs; good for range queries, equality
- **Hash index** — O(1) for equality lookups; no range support
- **Composite index** — multiple columns; order matters (leftmost prefix rule)
- **Covering index** — includes all columns needed by a query (no table access)
- **Full-text index** — for text search (LIKE, MATCH AGAINST)

**Rule of thumb:** Index columns used in WHERE, JOIN, ORDER BY. Avoid over-indexing on write-heavy tables.

### 8.3 Replication

Copying data from one DB server to another for redundancy and read scaling.

- **Leader-Follower (Single Leader):** One primary handles writes; replicas handle reads (async or sync)
- **Leader-Leader (Multi-Leader):** Multiple primaries accept writes; conflict resolution needed
- **Leaderless:** Any node can accept writes (Cassandra, Dynamo); read repair + hinted handoff

**Replication lag:** Delay between write on leader and propagation to followers. Can cause stale reads.

### 8.4 Sharding (Horizontal Partitioning)

Splitting a large database into smaller, independent databases (shards) across multiple servers.

**Sharding strategies:**
- **Range-based** — shard by key range (e.g., user_id 1-1000 → shard 1)
- **Hash-based** — hash of shard key determines shard (good distribution)
- **Directory-based** — lookup table maps key to shard (flexible, extra hop)
- **Geographic** — shard by region

**Challenges:** Resharding, hotspot shards, join queries across shards, distributed transactions.

### 8.5 CAP Theorem

A distributed data store can only guarantee **two** of the following three:

| Property | Meaning |
|---|---|
| **C — Consistency** | Every read receives the most recent write |
| **A — Availability** | Every request receives a (non-error) response |
| **P — Partition Tolerance** | System continues functioning despite network failures |

**In practice:** Network partitions are inevitable, so you choose between **CP** (sacrifice availability) and **AP** (sacrifice consistency). Examples: Banking → CP, Social media → AP.

### 8.6 Normalization & Denormalization

- **Normalization** — reducing data redundancy by splitting tables (3NF is typical)
  - Pros: No duplicate data, consistent updates, smaller storage
  - Cons: JOINs are expensive at scale
- **Denormalization** — intentionally adding redundant data to avoid JOINs
  - Pros: Faster reads, simpler queries
  - Cons: Data inconsistency risk, larger storage, complex writes

---

## 9. Message Queues & Event-Driven Architecture

Message queues decouple producers from consumers, enabling asynchronous, resilient communication.

**Common technologies:** RabbitMQ, Kafka, AWS SQS, Redis Streams, NATS.

**Key concepts:**
- **Producer** — sends messages
- **Consumer** — processes messages
- **Queue/Topic** — stores messages
- **Broker** — manages routing and delivery

**Delivery guarantees:**
- **At most once** — message may be lost, not retried (lowest overhead)
- **At least once** — message is retried until acknowledged (may duplicate)
- **Exactly once** — guaranteed unique delivery (hardest, highest overhead)

**Use cases:** Email/SMS sending, order processing, log aggregation, stream processing, task queues.

**Push vs Pull:**
- **Push** — broker sends messages to consumers (simple but can overwhelm)
- **Pull** — consumers poll for messages (better backpressure control)

---

## 10. Microservices vs Monolith

| Aspect | Monolith | Microservices |
|---|---|---|
| **Deployment** | Single unit | Independent services |
| **Scaling** | Scale entire app | Scale individual services |
| **Complexity** | Lower initially | Higher (network, coordination) |
| **Team autonomy** | Low | High |
| **Testing** | Easier (single process) | Harder (integration tests) |
| **Failure isolation** | Whole app goes down | Partial failure |

**When to start with monolith:** Small team, early-stage product, unknown domain. Extract microservices when cohesion boundaries become clear.

**When to go microservices:** Large team, independent deploy cycles, different scaling requirements for different features, polyglot tech stack.

---

## 11. REST API Design

### Key principles:
- **Stateless** — each request contains all information needed
- **Resource-based** — URLs represent nouns, not verbs
- **HTTP methods** — GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE

### Best practices:
- Use nouns for endpoints: `/users`, `/posts/:id`
- Use plural names consistently
- Version APIs: `/v1/users`
- Paginate list responses: `?page=1&limit=20`
- Return proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Include error details in response body
- Use HATEOAS links for discoverability (optional)

### Pagination approaches:
- **Offset-based:** `?offset=0&limit=20` — simple, inconsistent if data changes
- **Cursor-based:** `?cursor=abc123` — stable, preferred for real-time feeds

---

## 12. GraphQL

GraphQL is a query language and runtime that lets clients request exactly the data they need.

**Pros:**
- No over-fetching or under-fetching
- Strongly typed schema (self-documenting)
- Single endpoint (no versioning)
- Great for complex, nested data requirements

**Cons:**
- Complex caching (no automatic HTTP caching like REST)
- Query complexity abuse (deeply nested queries)
- N+1 problem (resolver per field can cause many DB queries)
- Steeper learning curve

**Typical stack:** Apollo Server (server), Apollo Client / Relay (client), combined with a data loader (e.g., DataLoader) to batch and cache DB queries.

---

## 13. Consistent Hashing

Used in distributed systems to distribute data across nodes with minimal reorganization when nodes are added or removed.

**How it works:**
1. Hash both keys and nodes onto the same ring (0 to 2^32 - 1)
2. Each key is assigned to the nearest node clockwise
3. When a node is added/removed, only keys in that node's range move

**Virtual nodes:** Each physical node is represented by multiple virtual nodes on the ring to improve distribution uniformity.

**Used in:** DynamoDB, Cassandra, Discord, Akamai CDN.

**Without consistent hashing:** Adding/removing a node would require rehashing most/all keys (hash % N breaks when N changes).

---

## 14. Rate Limiting

Rate limiting controls the number of requests a client can make in a given time window.

**Algorithms:**
- **Token Bucket** — tokens refill at a fixed rate; requests consume tokens
- **Leaky Bucket** — requests fill bucket; processed at a fixed rate (smoothing)
- **Fixed Window Counter** — count requests per time window; resets at window boundary (bursts at edges)
- **Sliding Window Log** — timestamp-based; precise but memory-heavy
- **Sliding Window Counter** — hybrid; approximate but efficient

**Where to implement:** API gateway, middleware, reverse proxy (Nginx, Envoy).

**Response:** HTTP 429 Too Many Requests + `Retry-After` header.

---

## 15. Proxies & Reverse Proxies

| | Forward Proxy | Reverse Proxy |
|---|---|---|
| **Role** | Sits between client and internet | Sits between internet and backend |
| **Purpose** | Anonymity, bypass restrictions, caching | Load balancing, caching, SSL termination, security |
| **Clients know** | About the proxy | About the server (proxy is transparent) |
| **Examples** | Corporate proxy, VPN | Nginx, HAProxy, Traefik |

**Reverse proxy benefits:**
- Hides internal server topology
- Centralized SSL termination
- Compression, request buffering
- Can serve static files directly

---

## 16. Blob Storage & Object Stores

Storage systems for unstructured data (images, videos, backups, logs).

**Characteristics:**
- Flat namespace (bucket/container → key)
- Highly durable and available
- Access via HTTP API (PUT, GET, DELETE)
- Eventually consistent (usually)

**Examples:** AWS S3, Google Cloud Storage, Azure Blob Storage, MinIO (self-hosted).

**Use cases:** File uploads, static assets, backups, data lakes, log archives.

---

## 17. Monitoring & Observability

| Pillar | What it tells you |
|---|---|
| **Logs** | What happened (line by line) |
| **Metrics** | What's happening now (aggregated numbers) |
| **Traces** | Where it happened (request flow across services) |

**Key metrics to track:**
- Latency (p50, p95, p99, p999)
- Error rate (5xx, 4xx)
- Traffic (requests/sec)
- Saturation (CPU, memory, disk, connections)
- Database query performance

**Tools:** Prometheus + Grafana (metrics), ELK/Loki (logs), Jaeger/OpenTelemetry (traces), Datadog (all-in-one).

---

## 18. Distributed System Patterns

### 18.1 Leader Election

Nodes in a cluster elect a leader to coordinate work.

**Algorithms:** Paxos, Raft, Zab (ZooKeeper).
**Tools:** ZooKeeper, etcd, Consul.

**Raft basics:**
- Nodes are in one of three states: Leader, Follower, Candidate
- Leader sends heartbeats; if followers don't hear from leader, they start election
- Leader gets a **term** number; only one leader per term
- Log entries are replicated to majority before committing

### 18.2 Quorum

Minimum number of nodes that must agree on an operation for it to be considered successful.

- **Write quorum (W):** Number of nodes that must acknowledge a write
- **Read quorum (R):** Number of nodes that must respond to a read

**Formula:** Quorum size = floor(N/2) + 1 (simple majority). For strong consistency: R + W > N.

### 18.3 Heartbeat

Periodic signals sent between nodes to indicate they're alive. Used for failure detection in distributed systems.

### 18.4 Circuit Breaker

Prevents cascading failures by detecting when a downstream service is unhealthy and failing fast.

**Three states:**
- **Closed** — normal operation; requests pass through
- **Open** — requests fail immediately (circuit is tripped)
- **Half-Open** — after timeout, a probe request is allowed; if successful, circuit closes

**Tools:** Hystrix (Netflix), Resilience4j, Sentinel.

### 18.5 Bulkhead

Isolates components into separate pools (thread pools, connection pools) so failure in one doesn't exhaust shared resources.

**Example:** Separate thread pools for different API endpoints; one slow endpoint can't starve others.

---

## 19. Design Problems — Common Patterns

### URL Shortener (e.g., TinyURL)
- **Requirement:** Shorten long URLs, redirect to original
- **Key operations:** `shorten(url) → shortId`, `access(shortId) → redirect`
- **Storage:** DB with id, shortId, originalUrl, createdAt, expiry
- **Hash function:** Base62 encoding of DB auto-increment ID or hash (MD5/SHA256) + collision check
- **Scaling:** Read-heavy; cache popular URLs in Redis; DB sharding by shortId hash
- **Redirection:** 301 (permanent) vs 302 (temporary) — 301 for cache, 302 for analytics

### WhatsApp / Chat System
- **Requirements:** 1:1 chat, group chat, real-time delivery, media sharing
- **Key challenges:** Low latency delivery, ordering, offline messages, end-to-end encryption
- **Architecture:** WebSocket persistent connections, message queue (Kafka) for async delivery, DB for history
- **Delivery semantics:** Store-and-forward: if recipient offline, store until delivery (fan-out on reconnect)
- **Groups:** For small groups, fan-out to each member; for large groups, pull model (one copy per group)

### YouTube / Video Streaming
- **Requirements:** Upload, transcode, stream, search
- **Key challenges:** Large file storage, transcoding latency, adaptive bitrate streaming
- **Architecture:**
  - Upload to blob storage (S3)
  - Async transcoding pipeline (multiple resolutions + formats)
  - CDN for distribution
  - Pre-signed URLs for secure uploads
  - DASH/HLS for adaptive streaming (client switches quality based on bandwidth)

### Rate Limiter (e.g., API Gateway)
- **Requirements:** Limit requests per user/IP per time window
- **Storage:** Redis (fast, TTL support)
- **Algorithm choice:** Sliding window counter (efficient, approximate) vs token bucket (smooth rate)
- **Distributed considerations:** Redis cluster for shared state; eventual consistency acceptable

### Design a Key-Value Store (e.g., Redis, Dynamo)
- **Requirements:** Get(key) → value, Put(key, value)
- **Components:** Hash-based sharding, replication (leaderless), consistent hashing for rebalancing
- **Consistency:** Configurable R + W quorum for tuning consistency vs latency
- **Failure handling:** Hinted handoff, read repair, Merkle trees for anti-entropy

---

## 20. Performance Metrics & SLOs

**SLA vs SLO vs SLI:**
- **SLI (Service Level Indicator)** — measured metric (e.g., latency p99 < 200ms)
- **SLO (Service Level Objective)** — target (e.g., 99.9% of requests < 200ms)
- **SLA (Service Level Agreement)** — contractual commitment (e.g., 99.9% uptime, with penalties)

**Common SLO targets:**
- **Availability:** 99% (two nines), 99.9% (three nines), 99.99% (four nines)
- **Latency:** p50 < 100ms, p99 < 500ms
- **Error rate:** < 0.1%

**Error budget:** (100% - SLO) = allowed downtime. E.g., 99.9% SLO allows ~8.76 hours of downtime per year.

---

## 21. Security

**Key security concepts for system design:**
- **Defense in depth** — multiple layers of security
- **Least privilege** — minimal access for each component
- **Encryption at rest** — data encrypted on disk (AES-256)
- **Encryption in transit** — TLS 1.3 for all communications
- **Authentication** — JWT, OAuth 2.0, SAML
- **Authorization** — RBAC (role-based), ABAC (attribute-based)
- **Rate limiting** — prevent abuse
- **Input validation** — prevent injection attacks
- **DDoS protection** — CDN, WAF, rate limiting, anycast

---

## 22. Real-World Architecture Patterns

| Pattern | Description | Example |
|---|---|---|
| **CQRS** | Separate read and write models | High-read apps |
| **Event Sourcing** | Store state changes as events | Audit logs |
| **Saga** | Distributed transaction via local + compensating transactions | Travel booking |
| **Strangler Fig** | Incrementally replace monolith parts | Migration |
| **Backend for Frontend (BFF)** | Dedicated API per client type | Mobile vs Web |
| **Sidecar** | Co-locate helper service with main service | Service mesh (Envoy) |
| **API Gateway** | Single entry point for all clients | Authentication, routing, rate limiting |

---

## 23. Trade-off Framework

When choosing between options, always evaluate:

1. **Read vs write patterns** — is the system read-heavy or write-heavy?
2. **Consistency vs availability** — can you tolerate stale reads?
3. **Latency vs throughput** — do you need fast individual requests or high volume?
4. **Synchronous vs asynchronous** — can the client wait?
5. **Simplicity vs flexibility** — will you need the extra complexity?
6. **Build vs buy** — is this a core differentiator?
7. **Cost vs performance** — what's the budget?

---

## 24. Common Interview Tips

- **Clarify requirements first** — ask about scale, features, constraints before diving in
- **Start with a high-level diagram** — boxes and arrows showing services and data flow
- **Identify bottlenecks** — where is the system likely to fail under load?
- **Discuss trade-offs** — show you understand why you chose one approach over another
- **Calculate estimates** — DAUs, QPS, storage requirements (back-of-the-envelope math)
- **Don't optimize prematurely** — start simple, then layer in optimizations

---

## 25. Estimation Cheatsheet

| Metric | Approximate value |
|---|---|
| DAUs (large app) | 100M - 1B |
| Active users/hour | ~10-20% of DAUs |
| Requests per user per day | ~10-100 depending on app |
| Read:Write ratio | Typically 90:10 or 80:20 |
| Average DB write | ~1-10ms |
| Average cache read | ~1-5ms |
| Average network round trip | ~0.5ms (same DC) to 100ms (cross-continent) |
| API response target | < 200ms (p99) |
| ASCII character | 1 byte |
| Average HTTP request | ~500 bytes - 2 KB |
| Image thumbnail | ~50-200 KB |
| Image full size | ~1-5 MB |
| Video per minute | ~10-30 MB (compressed) |

Examples:
- **100M DAU × 20 requests/day × 10% peak factor** → ~2300 QPS peak
- **100M users × 1 KB/user metadata** → ~100 GB storage
- **100M photos/day × 200 KB** → ~20 TB/day new photo storage

---
