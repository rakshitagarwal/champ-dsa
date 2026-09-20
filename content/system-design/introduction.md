# Introduction

> Design the system on paper before writing code — HLD is what separates senior thinking from junior execution.

> High Level Design is the map of a system — which boxes exist (API, cache, queue, database, CDN), how data flows between them, and what happens under load or failure. It gets decided before code because a wrong architecture costs ten times more after code is written.

HLD matters in three places. First, big systems are never built in someone's head — 50M WhatsApp connections or a Ticketmaster flash sale cannot be handled without thinking. Boxes and data flow get proven on paper first. Second, HLD gives a team one language — frontend, backend, and DevOps all work from the same diagram, so assumptions stop hiding. Third, interviews hinge on the HLD round — after DSA, it is the round that hires or rejects for senior roles, because it reveals trade-off thinking, not memorization.

HLD versus LLD is simple: HLD talks about machines (servers, databases, load balancers), LLD talks about classes (Parking Lot models, SOLID, design patterns). Different interviews, different preparation. This section is HLD — concepts, technologies, and complete design breakdowns.

## How to use this section

1. **Building blocks** — theory behind every design ([fundamentals](/hld/fundamentals), [capacity](/hld/capacity-estimation), [networking](/hld/networking), [databases](/hld/sql-databases), [caching](/hld/caching-strategies), [queues](/hld/message-queue), [distributed systems](/hld/distributed-systems)). Each page folds in the tool deep-dives (Redis, Kafka, Postgres…) where they belong.
2. **Question Breakdowns** — most of your study time. Bitly, Uber, WhatsApp-style walkthroughs are where patterns stick.

Every design page follows the same shape: what the real question is, requirements, APIs, boxes, one deep dive the interviewer will probe, failures/scale, and a line you can say out loud.

**Say in the interview:** *"First a simple design that meets the APIs, then harden it for scale and failure."*

## Study order (suggested)

| Week focus | Read | Then practice aloud |
|------------|------|---------------------|
| Theory spine | [Fundamentals](/hld/fundamentals) ? [Capacity](/hld/capacity-estimation) ? [Networking](/hld/networking) ? [API design](/hld/api-design) ? [Caching](/hld/caching-strategies) ? [Load balancing](/hld/load-balancing) ? [Message queues](/hld/message-queue) ? [Distributed systems](/hld/distributed-systems) | Explain CAP + cache-aside without notes |
| Data & traffic | [SQL](/hld/sql-databases) ? [NoSQL](/hld/nosql-databases) ? [Storage](/hld/storage) ? [CDN](/hld/cdn) | Pick Postgres vs Cassandra for a chat app |
| Resilience & architecture | [Reliability](/hld/reliability-fault-tolerance) ? [Rate limiting](/hld/rate-limiting) ? [Microservices](/hld/microservices) ? [Security](/hld/security) ? [Observability](/hld/observability) ? [Cloud](/hld/cloud-architecture) | Name the fallback for every dependency |
| Classic designs | [Bitly](/hld/bitly) → [Rate limiter](/hld/rate-limiter) → [WhatsApp](/hld/whatsapp) → [Uber](/hld/uber) → [Ticketmaster](/hld/ticketmaster) → [FB News Feed](/hld/fb-news-feed) | Draw boxes from memory, then open the page |
| Harder / money | [Payment](/hld/payment-system), [Dropbox](/hld/dropbox), [YouTube](/hld/youtube), [Google Docs](/hld/google-docs) | Consistency + failure story for each |

## Blank interview checklist (use on every problem)

Copy this into a scratch pad before you open the answer page:

1. **Clarify** — actors, v1 scope, out of scope, read/write ratio, retention.
2. **NFRs with numbers** — p99 latency, availability nines, consistency (strong vs eventual) per path.
3. **Capacity** — DAU → QPS (×2–3 peak), storage, bandwidth — only if the number changes boxes.
4. **APIs** — 4–8 endpoints; errors (`409`, `429`, `404`).
5. **Boxes** — client → CDN/LB → gateway → services → cache / DB / queue / object store.
6. **Deep dive** — the one hard part (unique IDs, seat hold, geo match, fan-out…).
7. **Failure** — what dies, what degrades, what never loses data; RPO/RTO if multi-region.
8. **Close** — one phrase that captures the design.

## Theory map (where ideas live)

| If you need… | Open |
|--------------|------|
| CAP, PACELC, quorum, locks, saga, idempotency | [Distributed systems](/hld/distributed-systems), [API design](/hld/api-design) (idempotency keys) |
| Cache-aside, stampede, Redis patterns | [Caching](/hld/caching-strategies) (Redis + Bloom filters inside) |
| L4/L7, sticky sessions, consistent hashing | [Load balancing](/hld/load-balancing) |
| Split a database write path | [SQL databases](/hld/sql-databases) (sharding inside) |
| Fail fast when a dependency is down | [Reliability](/hld/reliability-fault-tolerance) (circuit breaker inside) |
| Geo nearby search | [Architecture concepts](/hld/architecture-concepts) (geo indexing), [Uber](/hld/uber) / [Yelp](/hld/yelp) |
| Dedup / "probably not in set" | [Caching](/hld/caching-strategies) (Bloom filters) |
| Core Web / CDN / object storage | [CDN](/hld/cdn), [Storage](/hld/storage) (S3 inside) |

## Name aliases (interview prompt → our page)

| They say | Study |
|----------|--------|
| Twitter / X timeline | [FB News Feed](/hld/fb-news-feed) (+ [Instagram](/hld/instagram)) |
| URL shortener / TinyURL | [Bitly](/hld/bitly) |
| Chat / Messenger | [WhatsApp](/hld/whatsapp) |
| Ride sharing / Lyft | [Uber](/hld/uber) |
| Ticket booking flash sale | [Ticketmaster](/hld/ticketmaster) |
| Video streaming | [YouTube](/hld/youtube) |
| Collaborative editing | [Google Docs](/hld/google-docs) |

## Full index — every page and what it covers

## Foundations (2)

- [System Design Fundamentals](/hld/fundamentals) � Functional vs non-functional requirements, scalability, availability, consistency and the core trade-offs. Covers: Functional Requirements, Non-Functional Requirements, Horizontal vs Vertical Scaling, Stateless vs Stateful Services.
- [Capacity Estimation](/hld/capacity-estimation) � QPS, DAU, storage and bandwidth math — back-of-the-envelope calculations with a worked example. Covers: The Core Metrics, Storage Estimation, Bandwidth Estimation, Worked Example — WhatsApp-like Chat.

## Networking & APIs (2)

- [Networking](/hld/networking) � HTTP versions, TCP vs UDP, DNS, TLS, WebSockets, SSE, REST, gRPC and connection reuse. Covers: TCP vs UDP, DNS, TLS / SSL, HTTP/1.1, HTTP/2, HTTP/3, WebSockets and SSE, REST and gRPC, Connection Pooling and Keep-Alive.
- [API Design](/hld/api-design) � REST design, versioning, pagination, gateway, validation, errors, idempotency and webhooks. Covers: REST API Design, API Versioning, Pagination, Filtering, Sorting, API Gateway, Request Validation and Error Handling, Idempotency and Idempotency Keys, Webhooks, API Composition.

## Traffic & CDN (2)

- [Load Balancing](/hld/load-balancing) � L4 vs L7, algorithms, consistent hashing, health checks, failover and sticky sessions. Covers: Algorithms, Consistent Hashing, Health Checks and Failover, Sticky Sessions, Reverse Proxy.
- [CDN](/hld/cdn) � Edge locations, origin, static caching, cache-control, invalidation and providers. Covers: CDN Fundamentals and Edge Locations, Origin Server, Static Content Caching, Cache-Control and TTL, Cache Invalidation, CloudFront and Cloudflare.

## Databases (2)

- [SQL Databases](/hld/sql-databases) � Postgres as default, indexes, transactions, sharding, and ClickHouse for analytics. Covers: Tables, Keys, and Normalization, Denormalization, Indexes, Query Optimization, Transactions and ACID, Isolation Levels and Locks, Deadlocks, Read Replicas and Replication, PostgreSQL: The Default, Partitioning, Sharding, Connection Pooling, Real-Time Analytics with ClickHouse.
- [NoSQL Databases](/hld/nosql-databases) � DynamoDB, MongoDB, Cassandra deep-dives, Elasticsearch for search, modeling and consistency. Covers: NoSQL vs SQL, Key-Value Stores, Document Databases, Wide-Column Databases, Data Modeling, Replication, Sharding, Eventual Consistency, DynamoDB Deep-Dive, MongoDB Deep-Dive, Cassandra Deep-Dive, Elasticsearch for Search.

## Caching (1)

- [Caching](/hld/caching-strategies) � Cache patterns, TTL, eviction, stampede, Redis deep-dive and Bloom filters. Covers: Why Caching, Cache-Aside (Lazy Loading), Read-Through and Write-Through, Write-Behind (Write-Back), Write-Around, TTL and Eviction, LRU in Brief, Cache Invalidation, Cache Stampede, Penetration, Avalanche, Distributed Cache, Redis, Bloom Filters.

## Messaging & Streaming (1)

- [Message Queues](/hld/message-queue) � Delivery guarantees, ordering, retries, DLQ, Kafka/RabbitMQ/NATS deep-dives and Flink. Covers: Message Queue Basics, Producer and Consumer Roles, Pub/Sub Model, Asynchronous Processing, Delivery Guarantees, Message Ordering, Retries, Dead Letter Queue, Backpressure, Consumer Groups, Kafka in Depth, RabbitMQ in Depth, NATS JetStream in Depth, Stream Processing with Flink, Brokers at a Glance.

## Distributed Systems (1)

- [Distributed Systems](/hld/distributed-systems) � CAP, quorum, replication, locks, ZooKeeper coordination, sagas and retries. Covers: Distributed Systems Fundamentals, CAP Theorem, PACELC Extension, Consistency Models and Availability, Replication and Leader/Follower, Quorum, Distributed Locks, Coordination with ZooKeeper (and etcd), Distributed Transactions, Idempotency, Fault Tolerance, Failover, Retry, Timeout, Exponential Backoff.

## Resilience (2)

- [Rate Limiting](/hld/rate-limiting) � Fixed and sliding windows, token and leaky buckets, distributed limits with Redis. Covers: Why Rate Limiting, Fixed Window, Sliding Window Log, Sliding Window Counter, Token Bucket, Leaky Bucket, Distributed Rate Limiting, Redis-based Rate Limiter.
- [Reliability & Fault Tolerance](/hld/reliability-fault-tolerance) � Health checks, retries, timeouts, circuit breaker, bulkhead, failover and RPO/RTO. Covers: Health Checks, Retries and Timeouts, Circuit Breaker, Bulkhead Pattern, Failover and Redundancy, Graceful Degradation, Replication, Backup, Disaster Recovery, RPO and RTO.

## Storage (1)

- [Storage](/hld/storage) � Object, block and file storage, S3, presigned URLs, multipart upload and lifecycle. Covers: Object Storage, Block Storage, File Storage, S3 Deep Dive, Blob Storage and Presigned URLs, Multipart and Large File Upload, Data Lifecycle, Backup and Recovery.

## Architecture (2)

- [Microservices](/hld/microservices) � Monolith to microservices, boundaries, discovery, sync vs async, saga, outbox, CQRS and tracing. Covers: Monolith and Modular Monolith, Microservices and Service Boundaries, Service Discovery, API Gateway, Sync vs Async Communication, Database per Service, Event-Driven Architecture, Saga Pattern, Outbox Pattern, CQRS and Event Sourcing Basics, Distributed Tracing.
- [Important Architecture Concepts](/hld/architecture-concepts) � Reverse proxy, service mesh, webhooks, polling vs push, batch vs stream, schedulers and geo indexing. Covers: Reverse Proxy and API Gateway, Service Discovery, Service Mesh Basics, Event-Driven Architecture and Pub/Sub, Webhooks, Long Polling, WebSockets, Batch and Stream Processing, Job Queues, Background Workers, Distributed Scheduler, Consistent Hashing, Geospatial Indexing (Geohashing & Quadtrees).

## Security (1)

- [Security](/hld/security) � AuthN vs AuthZ, JWT, OAuth 2.0, RBAC, encryption, CORS/CSRF/XSS/SQL injection and secrets. Covers: Authentication vs Authorization, JWT, OAuth 2.0, RBAC and API Keys, HTTPS, Encryption, Hashing, CORS, CSRF, XSS, SQL Injection, SSRF, Secrets Management.

## Observability (1)

- [Observability](/hld/observability) � Logs, metrics, traces, correlation IDs, alerting, Prometheus and Grafana. Covers: Logging, Metrics, Tracing and Distributed Tracing, Correlation IDs, Health Monitoring and Alerting, OpenTelemetry, Prometheus, Grafana.

## Cloud (1)

- [Cloud Architecture](/hld/cloud-architecture) � EC2, ECS/EKS, Lambda, RDS, DynamoDB, ElastiCache, SQS/SNS, CloudFront, Route 53, ALB and CloudWatch. Covers: EC2, ECS, EKS Basics, Lambda, S3, RDS, DynamoDB, ElastiCache, SQS, SNS, CloudFront, Route 53, ALB, API Gateway, CloudWatch.

## Question Breakdowns (31)

- [Bitly](/hld/bitly) — URL shortener — generate a short code, redirect fast, survive read-heavy traffic. Covers: generating codes, read-heavy redirect path, analytics off the hot path.
- [Dropbox](/hld/dropbox) — File storage and sync — chunk uploads, metadata, and conflict handling. Covers: conflicts and consistency, resumable uploads and delta sync, sharing and scale.
- [Local Delivery Service](/hld/local-delivery) — Match nearby couriers to orders, track live location, and keep ETAs honest. Covers: matching without double-assign, live location and ETA, order state machine durability.
- [Ticketmaster](/hld/ticketmaster) — Inventory under flash sales — hold seats, avoid double-booking, survive spikes. Covers: holds and expiry, waiting room and fairness, sharding and read scaling.
- [FB News Feed](/hld/fb-news-feed) — Fan-out timelines, rank posts, and keep the home feed fast at celebrity scale. Covers: hybrid fan-out, ranking and pagination, celebrity and hot user handling.
- [Tinder](/hld/tinder) — Geo matching, swipe queues, and a recommendation stack that stays cheap. Covers: making recs cheap, swipe ledger and match correctness, location and safety.
- [LeetCode](/hld/leetcode) — Online judge — isolate untrusted code, grade tests, and queue submissions. Covers: isolation and contests, hidden tests and cheating, fair scheduling and warm start.
- [WhatsApp](/hld/whatsapp) — 1:1 and group chat — WebSockets, receipts, media, and offline push. Covers: groups and fan-out, receipts, ordering, and exactly-once delivery, multi-device and offline catch-up.
- [Rate Limiter](/hld/rate-limiter) — Protect APIs with token buckets / sliding windows across many servers. Covers: distributed correctness, multi-DC and per-route / per-tier limits, placement and headers.
- [YouTube](/hld/youtube) — Upload, transcode, adaptive stream, and CDN the bytes — metadata stays in a DB. Covers: never block on transcode, view counts and hot videos, copyright, regions, and thumbnail hot path.
- [FB Live Comments](/hld/fb-live-comments) — Realtime comments on a live video without melting a single chat server. Covers: sampling vs total order, backpressure and catch-up on join, moderation and abuse without blocking writes.
- [YouTube Top K](/hld/youtube-top-k) — Trending / top videos — count views at scale and keep a cheap Top-K. Covers: Sliding windows, watermarks and late events, Hot keys, heavy hitters and approximate Top-K.
- [Uber](/hld/uber) — Ride matching with live location, geohash nearby search, and trip state. Covers: geo index (why not SQL?), surge and ETA without melting maps, exactly-once money.
- [Web Crawler](/hld/web-crawler) — Polite BFS of the web: URL frontier, robots.txt, dedup, and storage. Covers: Traps, canonicalization and infinite spaces, Recrawl, freshness and failure handling.
- [Ad Click Aggregator](/hld/ad-click-aggregator) — Ingest huge click streams, count with late events, and bill advertisers. Covers: Money vs dashboards (correctness tiers), Late events, fraud and exactly-once.
- [FB Post Search](/hld/fb-post-search) — Search friends' posts with privacy filters — not a naive Elasticsearch dump. Covers: Privacy vs recall (the hard trade-off), Unfriend, block, edits and ranking.
- [Yelp](/hld/yelp) — Local business search: geo + text + ratings, with hot city caches. Covers: geo + text together, open-now and hours, hot tiles, autocomplete, and spam.
- [Instagram](/hld/instagram) — Photo feed, follows, and fan-out — similar to news feed with heavier media. Covers: media vs feed ids, ranking without building an ML lab, stories and profile grid.
- [Strava](/hld/strava) — Activity tracking, GPS traces, segments, and a social feed of workouts. Covers: segments: from 5M to 50 candidates, leaderboards and hot keys, GPS pipeline, privacy, and feed.
- [Distributed Cache](/hld/distributed-cache) — Cache-aside, consistent hashing, stampede, and what happens when Redis dies. Covers: Invalidation is the hard part, Hot keys, stampede and thundering herd on node death.
- [Online Auction](/hld/online-auction) — Bids in the last seconds — consistency of the winning bid vs throughput. Covers: last-second bids, hot-path optimization & proxy bidding, closing, settlement, and notifications.
- [Job Scheduler](/hld/job-scheduler) — Cron at scale: durable jobs, workers, retries, and no double-run. Covers: exactly-once is a lie (and what to do), missed ticks and hot midnight, delayed jobs and DAGs.
- [News Aggregator](/hld/news-aggregator) — Ingest publishers, dedupe stories, rank a personalized newspaper. Covers: clustering, freshness vs load and politeness, ranking, personalization, and legal.
- [Price Tracking Service](/hld/price-tracking) — Watch product prices, scrape/poll sellers, alert when the number drops. Covers: shared watches and ban avoidance, wrong parses and price semantics, alert correctness without spam.
- [Notification System](/hld/notification-system) — Fan-out email / push / SMS with preferences, retries, and idempotency. Covers: Idempotency and storms, Per-channel reliability and cost control.
- [Robinhood](/hld/robinhood) — Trade orders with correctness first — matching, idempotency, and market hours. Covers: Money races and why cache is not truth, Venue as a flaky colleague and partial fills.
- [Google Docs](/hld/google-docs) — Collaborative editing — OT or CRDT, presence, and conflict-free cursors. Covers: Conflict handling (OT vs CRDT), Presence, history, and reconnect.
- [Payment System](/hld/payment-system) — Ledger, idempotent charges, webhooks, and never double-spend. Covers: The ledger (why append-only matters), Webhook and idempotency races.
- [Metrics Monitoring](/hld/metrics-monitoring) — Ingest time series, downsample, alert on SLOs — Prometheus-shaped thinking. Covers: Cardinality: how this design dies, Alert burn rate and grouping.
- [Online Chess](/hld/online-chess) — Matchmaking, game rooms, clocks, and cheating-resistant move validation. Covers: Authority, cheat, and why client is dumb, Disconnects, persistence, and fair pairing.
- [ChatGPT](/hld/chatgpt) — LLM product design — sessions, streaming tokens, rate limits, and RAG. Covers: context and cost, streaming, quotas, and queuing, RAG and tenancy.

## Keep in mind

- HLD is about machines, LLD is about classes — say this line first.
- Prove the design on paper, not in code — catch mistakes at the cheap stage.
- After the happy path, always ask about scale and failure — that is the deep dive.
- There is no single right answer — reason with trade-offs: "If X then Y, else Z."
- Apply non-functionals only where the product needs them — don't recite CAP for every app.
- Do capacity math only when the number changes the design — no theater.
- State consistency **per path** (payments strong, feed eventual) — one label for the whole product is usually wrong.