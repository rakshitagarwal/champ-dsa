# Introduction

> Design the system on paper before writing code - HLD is what separates senior thinking from junior execution.

> High Level Design is the map of a system - which boxes exist (API, cache, queue, database, CDN), how data flows between them, and what happens under load or failure. It gets decided before code because a wrong architecture costs ten times more after code is written.

HLD matters in three places. First, big systems are never built in someone's head - 50M WhatsApp connections or a Ticketmaster flash sale cannot be handled without thinking. Boxes and data flow get proven on paper first. Second, HLD gives a team one language - frontend, backend, and DevOps all work from the same diagram, so assumptions stop hiding. Third, interviews hinge on the HLD round - after DSA, it is the round that hires or rejects for senior roles, because it reveals trade-off thinking, not memorization.

HLD versus LLD is simple: HLD talks about machines (servers, databases, load balancers), LLD talks about classes (Parking Lot models, SOLID, design patterns). Different interviews, different preparation. This section is HLD - concepts, technologies, and complete design breakdowns.

## The request path (memorize this shape)

![Client → DNS → CDN → load balancer → app servers → cache / database / queue](/images/hld/request-path.svg)

Almost every interview design is a variation of this path. Know what each box does, what it costs, and how it fails. Before you invent new components, place the product on this spine.

Keep the [HLD cheat sheet](/hld/hld-cheatsheet) open while you practice: latency numbers, availability nines, estimation shortcuts, and the 45-minute split.

## How to use this section

1. **Building blocks** — theory behind every design ([fundamentals](/hld/fundamentals), [capacity](/hld/capacity-estimation), [networking](/hld/networking), [databases](/hld/sql-databases), [caching](/hld/caching-strategies), [queues](/hld/message-queue), [distributed systems](/hld/distributed-systems)). Each page folds in the tool deep-dives (Redis, Kafka, Postgres) where they belong.
2. **Question Breakdowns** — most of your study time. Start with the **Core 8** (Bitly, Rate limiter, News Feed, WhatsApp, Notifications, Uber, YouTube, Ticketmaster), then branch out.
3. **Cheat sheet** — [numbers and timing](/hld/hld-cheatsheet) you should say without opening notes.

Every design page is a short spine: what they ask → requirements → APIs → diagram → one deep dive → failures → a **Phrase** you can say out loud. Skip rereading whole pages — revise from the phrase.

**Say in the interview:** *"First a simple design that meets the APIs, then harden it for scale and failure."*

## Study order (suggested)

| Week focus | Read | Then practice aloud |
|------------|------|---------------------|
| Theory spine | [Fundamentals](/hld/fundamentals) → [Capacity](/hld/capacity-estimation) → [Networking](/hld/networking) → [API design](/hld/api-design) → [Caching](/hld/caching-strategies) → [Load balancing](/hld/load-balancing) → [Message queues](/hld/message-queue) → [Distributed systems](/hld/distributed-systems) | Explain CAP + cache-aside without notes |
| Data & traffic | [SQL](/hld/sql-databases) → [NoSQL](/hld/nosql-databases) → [Storage](/hld/storage) → [CDN](/hld/cdn) | Pick Postgres vs Cassandra for a chat app |
| Resilience & architecture | [Reliability](/hld/reliability-fault-tolerance) → [Rate limiting](/hld/rate-limiting) → [Microservices](/hld/microservices) → [Security](/hld/security) → [Observability](/hld/observability) → [Cloud](/hld/cloud-architecture) | Name the fallback for every dependency |
| **Core 8** designs | [Bitly](/hld/bitly) → [Rate limiter](/hld/rate-limiter) → [FB News Feed](/hld/fb-news-feed) → [WhatsApp](/hld/whatsapp) → [Notification](/hld/notification-system) → [Uber](/hld/uber) → [YouTube](/hld/youtube) → [Ticketmaster](/hld/ticketmaster) | Draw boxes from memory, then open the page |
| Harder / money | [Payment](/hld/payment-system), [Dropbox](/hld/dropbox), [Google Docs](/hld/google-docs), [Pastebin](/hld/pastebin), [Autocomplete](/hld/search-autocomplete), [Maps](/hld/google-maps) | Consistency + failure story for each |

## Note-taking habits

Do not copy pages into Anki dumps. Write **your** notes in the templates below so recall sticks.

1. After reading a concept page, fill the **concept template** once — then close the notes and re-explain from the template only.
2. After finishing a design page, fill the **design template** from memory; only peek to correct mistakes.
3. Keep one scratch pad of **trade-off lines** you actually said out loud ("strong on payment path, eventual on feed").
4. Revisit the [cheat sheet](/hld/hld-cheatsheet) weekly until latency and nines are automatic.

### Concept note template

```
Topic:
Problem it solves:
When NOT to use:
How it works (3–5 bullets):
Trade-offs (pick latency / consistency / availability / cost):
Failure modes:
30-second soundbite:
Related designs:
```

### Design note template

```
Prompt (one sentence):
Actors + v1 scope / out of scope:
NFRs with numbers:
Capacity that changes boxes:
APIs (4–8):
Boxes + data flow:
Deep dive (the hard part):
Failure + degrade story:
Closing phrase:
```

## Blank interview checklist (use on every problem)

Copy this into a scratch pad before you open the answer page:

1. **Clarify** - actors, v1 scope, out of scope, read/write ratio, retention.
2. **NFRs with numbers** - p99 latency, availability nines, consistency (strong vs eventual) per path.
3. **Capacity** - DAU -> QPS (2-3x peak), storage, bandwidth - only if the number changes boxes.
4. **APIs** - 4-8 endpoints; errors (`409`, `429`, `404`).
5. **Boxes** - client -> CDN/LB -> gateway -> services -> cache / DB / queue / object store.
6. **Deep dive** - the one hard part (unique IDs, seat hold, geo match, fan-out...).
7. **Failure** - what dies, what degrades, what never loses data; RPO/RTO if multi-region.
8. **Close** - one phrase that captures the design.

## Active revision method

Do not reread a page from top to bottom every time. Use three passes:

1. **Learn:** Read the page once and explain each box or trade-off in your own words.
2. **Recall:** Close the page and redraw the flow plus five key decisions from memory.
3. **Apply:** Open one Question Breakdown and justify every technology choice without copying its answer.

For a fast revision session, answer these five questions for any topic:

- What problem does it solve?
- When should I **not** use it?
- What is the source of truth?
- What fails first under scale or outage?
- Which trade-off did I accept: latency, consistency, availability, durability, or cost?

You are ready for a design when you can deliver the checklist in **35-45 minutes**, state consistency per data path, and handle one failure follow-up without opening the notes.

## Theory map (where ideas live)

| If you need... | Open |
|--------------|------|
| CAP, PACELC, quorum, locks, saga, idempotency | [Distributed systems](/hld/distributed-systems), [API design](/hld/api-design) (idempotency keys) |
| Cache-aside, stampede, Redis patterns | [Caching](/hld/caching-strategies) (Redis + Bloom filters inside) |
| L4/L7, sticky sessions, consistent hashing | [Load balancing](/hld/load-balancing) |
| Split a database write path | [SQL databases](/hld/sql-databases) (sharding inside) |
| Fail fast when a dependency is down | [Reliability](/hld/reliability-fault-tolerance) (circuit breaker inside) |
| Never lose a DB change before publishing an event | [Microservices](/hld/microservices) (transactional outbox + CDC) |
| Geo nearby search | [Architecture concepts](/hld/architecture-concepts) (geo indexing), [Uber](/hld/uber) / [Yelp](/hld/yelp) |
| Dedup / "probably not in set" | [Caching](/hld/caching-strategies) (Bloom filters) |
| Core Web / CDN / object storage | [CDN](/hld/cdn), [Storage](/hld/storage) (S3 inside) |

## Name aliases (interview prompt -> our page)

| They say | Study |
|----------|--------|
| Twitter / X timeline | [FB News Feed](/hld/fb-news-feed) (+ [Instagram](/hld/instagram)) |
| URL shortener / TinyURL | [Bitly](/hld/bitly) |
| Chat / Messenger | [WhatsApp](/hld/whatsapp) |
| Ride sharing / Lyft | [Uber](/hld/uber) |
| Ticket booking / BookMyShow / flash-sale inventory | [Ticketmaster](/hld/ticketmaster) |
| Hotel or flight seat hold under spike | [Ticketmaster](/hld/ticketmaster) (same hold + expiry pattern) |
| Video streaming | [YouTube](/hld/youtube) |
| Collaborative editing | [Google Docs](/hld/google-docs) |
| Paste service / hastebin | [Pastebin](/hld/pastebin) |
| Typeahead / search suggestions | [Search autocomplete](/hld/search-autocomplete) |
| Maps / routing / ETA | [Google Maps](/hld/google-maps) |

## Full index - every page and what it covers

## Start here

- [Introduction](/hld/introduction) - Request path, study order, note templates, checklist.
- [HLD Cheat Sheet](/hld/hld-cheatsheet) - Latency numbers, availability nines, estimation shortcuts, 45-minute split.

## Foundations (2)

- [System Design Fundamentals](/hld/fundamentals) - Functional vs non-functional requirements, scalability, availability, consistency, unique ID generation (Snowflake), and the core trade-offs.
- [Capacity Estimation](/hld/capacity-estimation) - QPS, DAU, storage and bandwidth math - back-of-the-envelope calculations with a worked example. Covers: The Core Metrics, Storage Estimation, Bandwidth Estimation, Worked Example - WhatsApp-like Chat.

## Networking & APIs (3)

- [Networking](/hld/networking) - HTTP versions, TCP vs UDP, DNS, TLS, WebSockets, SSE, REST, gRPC and connection reuse. Covers: TCP vs UDP, DNS, TLS / SSL, HTTP/1.1, HTTP/2, HTTP/3, WebSockets and SSE, REST and gRPC, Connection Pooling and Keep-Alive.
- [API Design](/hld/api-design) - REST design, versioning, pagination, gateway, validation, errors, idempotency and webhooks. Covers: REST API Design, API Versioning, Pagination, Filtering, Sorting, API Gateway, Request Validation and Error Handling, Idempotency and Idempotency Keys, Webhooks, API Composition.
- [REST vs GraphQL vs gRPC](/hld/api-paradigms) - When to pick REST, GraphQL, or gRPC — caching, mobile BFF, and internal streaming.

## Traffic & CDN (2)

- [Load Balancing](/hld/load-balancing) - L4 vs L7, algorithms, consistent hashing, health checks, failover and sticky sessions. Covers: Algorithms, Consistent Hashing, Health Checks and Failover, Sticky Sessions, Reverse Proxy.
- [CDN](/hld/cdn) - Edge locations, origin, static caching, cache-control, invalidation and providers. Covers: CDN Fundamentals and Edge Locations, Origin Server, Static Content Caching, Cache-Control and TTL, Cache Invalidation, CloudFront and Cloudflare.

## Databases (2)

- [SQL Databases](/hld/sql-databases) - Postgres as default, indexes, transactions, sharding, and ClickHouse for analytics. Covers: Tables, Keys, and Normalization, Denormalization, Indexes, Query Optimization, Transactions and ACID, Isolation Levels and Locks, Deadlocks, Read Replicas and Replication, PostgreSQL: The Default, Partitioning, Sharding, Connection Pooling, Real-Time Analytics with ClickHouse.
- [NoSQL Databases](/hld/nosql-databases) - DynamoDB, MongoDB, Cassandra deep-dives, Elasticsearch for search, modeling and consistency. Covers: NoSQL vs SQL, Key-Value Stores, Document Databases, Wide-Column Databases, Data Modeling, Replication, Sharding, Eventual Consistency, DynamoDB Deep-Dive, MongoDB Deep-Dive, Cassandra Deep-Dive, Elasticsearch for Search.

## Caching (1)

- [Caching](/hld/caching-strategies) - Cache patterns, TTL, eviction, stampede, Redis deep-dive and Bloom filters. Covers: Why Caching, Cache-Aside (Lazy Loading), Read-Through and Write-Through, Write-Behind (Write-Back), Write-Around, TTL and Eviction, LRU in Brief, Cache Invalidation, Cache Stampede, Penetration, Avalanche, Distributed Cache, Redis, Bloom Filters.

## Messaging & Streaming (1)

- [Message Queues](/hld/message-queue) - Delivery guarantees, ordering, retries, DLQ, Kafka/RabbitMQ/NATS deep-dives and Flink. Covers: Message Queue Basics, Producer and Consumer Roles, Pub/Sub Model, Asynchronous Processing, Delivery Guarantees, Message Ordering, Retries, Dead Letter Queue, Backpressure, Consumer Groups, Kafka in Depth, RabbitMQ in Depth, NATS JetStream in Depth, Stream Processing with Flink, Brokers at a Glance.

## Distributed Systems (1)

- [Distributed Systems](/hld/distributed-systems) - CAP, quorum, replication, locks, ZooKeeper coordination, sagas and retries. Covers: Distributed Systems Fundamentals, CAP Theorem, PACELC Extension, Consistency Models and Availability, Replication and Leader/Follower, Quorum, Distributed Locks, Coordination with ZooKeeper (and etcd), Distributed Transactions, Idempotency, Fault Tolerance, Failover, Retry, Timeout, Exponential Backoff.

## Resilience (2)

- [Rate Limiting](/hld/rate-limiting) - Fixed and sliding windows, token and leaky buckets, distributed limits with Redis. Covers: Why Rate Limiting, Fixed Window, Sliding Window Log, Sliding Window Counter, Token Bucket, Leaky Bucket, Distributed Rate Limiting, Redis-based Rate Limiter.
- [Reliability & Fault Tolerance](/hld/reliability-fault-tolerance) - Health checks, retries, timeouts, circuit breaker, bulkhead, failover and RPO/RTO. Covers: Health Checks, Retries and Timeouts, Circuit Breaker, Bulkhead Pattern, Failover and Redundancy, Graceful Degradation, Replication, Backup, Disaster Recovery, RPO and RTO.

## Storage (1)

- [Storage](/hld/storage) - Object, block and file storage, S3, presigned URLs, multipart upload and lifecycle. Covers: Object Storage, Block Storage, File Storage, S3 Deep Dive, Blob Storage and Presigned URLs, Multipart and Large File Upload, Data Lifecycle, Backup and Recovery.

## Architecture (2)

- [Microservices](/hld/microservices) - Monolith to microservices, boundaries, discovery, sync vs async, saga, outbox, CQRS and tracing. Covers: Monolith and Modular Monolith, Microservices and Service Boundaries, Service Discovery, API Gateway, Sync vs Async Communication, Database per Service, Event-Driven Architecture, Saga Pattern, Outbox Pattern, CQRS and Event Sourcing Basics, Distributed Tracing.
- [Important Architecture Concepts](/hld/architecture-concepts) - Reverse proxy, service mesh, webhooks, polling vs push, batch vs stream, schedulers and geo indexing. Covers: Reverse Proxy and API Gateway, Service Discovery, Service Mesh Basics, Event-Driven Architecture and Pub/Sub, Webhooks, Long Polling, WebSockets, Batch and Stream Processing, Job Queues, Background Workers, Distributed Scheduler, Consistent Hashing, Geospatial Indexing (Geohashing & Quadtrees).

## Security (1)

- [Security](/hld/security) - AuthN vs AuthZ, JWT, OAuth 2.0, RBAC, encryption, CORS/CSRF/XSS/SQL injection and secrets. Covers: Authentication vs Authorization, JWT, OAuth 2.0, RBAC and API Keys, HTTPS, Encryption, Hashing, CORS, CSRF, XSS, SQL Injection, SSRF, Secrets Management.

## Observability (1)

- [Observability](/hld/observability) - Logs, metrics, traces, correlation IDs, alerting, Prometheus and Grafana. Covers: Logging, Metrics, Tracing and Distributed Tracing, Correlation IDs, Health Monitoring and Alerting, OpenTelemetry, Prometheus, Grafana.

  Apply the theory next in [Metrics Monitoring](/hld/metrics-monitoring).

## Cloud (1)

- [Cloud Architecture](/hld/cloud-architecture) - EC2, ECS/EKS, Lambda, RDS, DynamoDB, ElastiCache, SQS/SNS, CloudFront, Route 53, ALB and CloudWatch. Covers: EC2, ECS, EKS Basics, Lambda, S3, RDS, DynamoDB, ElastiCache, SQS, SNS, CloudFront, Route 53, ALB, API Gateway, CloudWatch.

## Question Breakdowns (34)

Lean pages (~70–100 lines): ask → requirements → scale → APIs → diagram → deep dive → failures → phrase. Start with **Core 8**, then branch out.

**Core 8:** [Bitly](/hld/bitly) · [Rate limiter](/hld/rate-limiter) · [FB News Feed](/hld/fb-news-feed) · [WhatsApp](/hld/whatsapp) · [Notifications](/hld/notification-system) · [Uber](/hld/uber) · [YouTube](/hld/youtube) · [Ticketmaster](/hld/ticketmaster)

**Also:** [Dropbox](/hld/dropbox) · [Local delivery](/hld/local-delivery) · [Instagram](/hld/instagram) · [Tinder](/hld/tinder) · [Yelp](/hld/yelp) · [Google Docs](/hld/google-docs) · [Payment](/hld/payment-system) · [Pastebin](/hld/pastebin) · [Autocomplete](/hld/search-autocomplete) · [Google Maps](/hld/google-maps) · [Web crawler](/hld/web-crawler) · [Distributed cache](/hld/distributed-cache) · [Job scheduler](/hld/job-scheduler) · [Live comments](/hld/fb-live-comments) · [Top-K](/hld/youtube-top-k) · [Post search](/hld/fb-post-search) · [Ad clicks](/hld/ad-click-aggregator) · [Auction](/hld/online-auction) · [LeetCode](/hld/leetcode) · [Chess](/hld/online-chess) · [Robinhood](/hld/robinhood) · [Metrics](/hld/metrics-monitoring) · [News aggregator](/hld/news-aggregator) · [Price tracking](/hld/price-tracking) · [Strava](/hld/strava) · [ChatGPT](/hld/chatgpt)

## Keep in mind

- HLD is about machines, LLD is about classes — say this line first.
- Prove the design on paper first; deep-dive one hard part, then failure.
- Use each page’s **Phrase** for weekly recall — don’t reread LLD-level dumps (they’re gone).
- Consistency is **per path**; capacity math only when it changes boxes.
- Filter **Core 8** in the sidebar when you want the must-do set.